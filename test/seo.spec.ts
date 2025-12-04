import { test, expect } from "@playwright/test";

async function getPostUrls(request: import("@playwright/test").APIRequestContext, base: string) {
  const res = await request.get(`${base}/sitemap.xml`);
  expect(res.status()).toBe(200);
  const xml = await res.text();
  const urls = Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g)).map(
    (m) => (m as RegExpMatchArray)[1]
  );
  // Convert absolute URLs to relative URLs for local testing
  return urls
    .filter((u) => /\/logs\//.test(u))
    .map((u) => {
      if (u.startsWith("http")) {
        const url = new URL(u);
        return url.pathname;
      }
      return u;
    });
}

const MAX_TESTED = parseInt(process.env.MAX_POSTS || "10", 10);

test.describe("SEO surface", () => {
  test("feeds & robots respond", async ({ request, baseURL }) => {
    const base = baseURL!;
    for (const path of ["/rss.xml", "/sitemap.xml", "/robots.txt"]) {
      const r = await request.get(`${base}${path}`);
      expect(r.status(), path).toBe(200);
    }
  });

  test("posts have canonical, meta, OG/Twitter, JSON-LD, OG image", async ({
    request,
    baseURL,
  }) => {
    const base = baseURL!;
    const urls = (await getPostUrls(request, base)).slice(0, MAX_TESTED);
    expect(urls.length).toBeGreaterThan(0);

    for (const url of urls) {
      const res = await request.get(url);
      expect(res.status(), url).toBe(200);
      const html = await res.text();

      // canonical
      const canonical = url.replace(/\/$/, "");
      // The canonical URL in HTML is absolute, so we need to check for the full URL
      const expectedCanonical = canonical.startsWith("http")
        ? canonical
        : `https://meoumi.dev${canonical}`;
      expect(html).toContain(`<link rel="canonical" href="${expectedCanonical}"`);

      // meta description ~ 50-200 chars
      expect(html).toMatch(/<meta name="description" content=".{50,200}"/);

      // Open Graph + Twitter
      expect(html).toMatch(/<meta property="og:title" content=".+?"/);
      expect(html).toMatch(/<meta property="og:image" content="https?:\/\/.+"/);
      expect(html).toMatch(/<meta name="twitter:card" content="summary_large_image"/);

      // JSON-LD BlogPosting
      expect(html).toMatch(/"@type"\s*:\s*"BlogPosting"/);

      // OG image endpoint
      const slug = url.split("/").filter(Boolean).pop();
      const og = await request.get(`${base}/api/og/${slug}`);
      expect(og.status(), `${url} OG`).toBe(200);
      expect(og.headers()["content-type"] || "").toContain("image/png");
    }
  });
});
