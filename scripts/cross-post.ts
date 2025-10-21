#!/usr/bin/env tsx

import "dotenv/config";
import { HashnodePublisher } from "./publish-hashnode";
import { readFileSync } from "fs";
import { join } from "path";

interface CrossPostConfig {
  platforms: {
    hashnode?: boolean;
  };
  postSlug: string;
  canonicalUrl: string;
  publishStatus?: "draft" | "unlisted" | "public";
}

interface PostData {
  title: string;
  content: string | Array<Record<string, unknown>>;
  tags: string[];
  excerpt?: string;
  publishedAt?: string;
}

interface CrossPostResult {
  platform: string;
  success: boolean;
  url?: string;
  error?: string;
  postId?: string;
}

class CrossPoster {
  private readonly hashnodePublisher?: HashnodePublisher;
  private readonly contentDirectory: string;

  constructor(contentDirectory = "content/posts") {
    this.contentDirectory = contentDirectory;

    // Initialize Hashnode publisher if credentials are available
    if (process.env.HASHNODE_API_TOKEN && process.env.HASHNODE_PUBLICATION_ID) {
      try {
        this.hashnodePublisher = new HashnodePublisher(
          process.env.HASHNODE_API_TOKEN,
          process.env.HASHNODE_PUBLICATION_ID
        );
      } catch (error) {
        console.warn("Failed to initialize Hashnode publisher:", error);
      }
    }
  }

  /**
   * Loads post data from markdown file with comprehensive error handling
   */
  private async loadPostData(slug: string): Promise<PostData> {
    try {
      if (!slug?.trim()) {
        throw new Error("Post slug is required");
      }

      const postPath = join(process.cwd(), this.contentDirectory, `${slug}.md`);

      try {
        const content = readFileSync(postPath, "utf-8");

        if (!content.trim()) {
          throw new Error("Post file is empty");
        }

        // Parse markdown and extract frontmatter
        const lines = content.split("\n");
        const frontmatter: Record<string, unknown> = {};
        let contentStart = 0;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line === "---") {
            if (contentStart === 0) {
              contentStart = i + 1;
            } else {
              contentStart = i;
              break;
            }
          } else if (contentStart > 0 && line.includes(":")) {
            const [key, ...valueParts] = line.split(":");
            const value = valueParts.join(":").trim();
            if (key?.trim() && value) {
              const keyName = key.trim();
              // Try to parse as JSON for arrays/objects, fallback to string
              try {
                if (value.startsWith("[") || value.startsWith("{")) {
                  frontmatter[keyName] = JSON.parse(value);
                } else {
                  frontmatter[keyName] = value;
                }
              } catch {
                frontmatter[keyName] = value;
              }
            }
          }
        }

        const postContent = lines.slice(contentStart).join("\n").trim();

        if (!postContent) {
          throw new Error("Post content is empty");
        }

        // Validate required fields
        if (!frontmatter.title) {
          throw new Error("Post title is required in frontmatter");
        }
        if (!frontmatter.date) {
          throw new Error("Post date is required in frontmatter");
        }
        if (!frontmatter.tags) {
          throw new Error("Post tags are required in frontmatter");
        }

        return {
          title: frontmatter.title as string,
          content: postContent,
          tags: Array.isArray(frontmatter.tags)
            ? (frontmatter.tags as string[])
            : (frontmatter.tags as string)
                .split(",")
                .map((t: string) => t.trim())
                .filter(Boolean),
          excerpt: (frontmatter.excerpt as string) || "",
          publishedAt: frontmatter.date as string,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Could not load post file for ${slug}: ${errorMessage}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Error loading post data: ${errorMessage}`);
    }
  }

  /**
   * Cross-posts content to multiple platforms with comprehensive error handling
   */
  async crossPost(config: CrossPostConfig): Promise<CrossPostResult[]> {
    const results: CrossPostResult[] = [];

    try {
      // Validate configuration
      if (!config.postSlug?.trim()) {
        throw new Error("Post slug is required");
      }
      if (!config.canonicalUrl?.trim()) {
        throw new Error("Canonical URL is required");
      }

      // Load post data
      const postData = await this.loadPostData(config.postSlug);

      // Prepare canonical URL
      const canonicalUrl = config.canonicalUrl.trim();

      // Publish to Hashnode
      if (config.platforms.hashnode && this.hashnodePublisher) {
        try {
          const result = await this.hashnodePublisher.publishPost({
            title: postData.title,
            content:
              typeof postData.content === "string"
                ? postData.content
                : JSON.stringify(postData.content),
            tags: postData.tags,
            canonicalUrl,
            publishedAt: postData.publishedAt,
          });

          results.push({
            platform: "Hashnode",
            success: result.success,
            url: result.url,
            error: result.error,
            postId: result.postId,
          });
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          results.push({
            platform: "Hashnode",
            success: false,
            error: `Hashnode publishing failed: ${errorMessage}`,
          });
        }
      } else if (config.platforms.hashnode) {
        results.push({
          platform: "Hashnode",
          success: false,
          error: "Hashnode publisher not initialized - check API credentials",
        });
      }

      return results;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Cross-posting failed: ${errorMessage}`);
    }
  }

  /**
   * Publishes to all available platforms
   */
  async publishToAll(
    slug: string,
    canonicalUrl: string,
    publishStatus: "draft" | "unlisted" | "public" = "draft"
  ): Promise<CrossPostResult[]> {
    return this.crossPost({
      platforms: {
        hashnode: true,
      },
      postSlug: slug,
      canonicalUrl,
      publishStatus,
    });
  }

  /**
   * Gets the status of available publishers
   */
  getPublisherStatus(): { hashnode: boolean } {
    return {
      hashnode: !!this.hashnodePublisher,
    };
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Usage: tsx scripts/cross-post.ts <post-slug> <canonical-url> [publish-status]");
    console.error(
      "Example: tsx scripts/cross-post.ts my-awesome-post https://yoursite.com/posts/my-awesome-post draft"
    );
    console.error("Publish status options: draft, unlisted, public (default: draft)");
    process.exit(1);
  }

  const [postSlug, canonicalUrl, publishStatus = "draft"] = args;

  // Validate publish status
  if (!["draft", "unlisted", "public"].includes(publishStatus)) {
    console.error("Invalid publish status. Must be one of: draft, unlisted, public");
    process.exit(1);
  }

  const crossPoster = new CrossPoster();

  // Show publisher status
  const status = crossPoster.getPublisherStatus();
  console.log("📊 Publisher Status:");
  console.log(`  Hashnode: ${status.hashnode ? "✅ Available" : "❌ Not configured"}`);
  console.log("");

  crossPoster
    .publishToAll(postSlug, canonicalUrl, publishStatus as "draft" | "unlisted" | "public")
    .then((results) => {
      console.log("\n📝 Cross-posting results:");
      console.log("========================");

      let allSuccess = true;
      let hasErrors = false;

      results.forEach((result) => {
        if (result.success) {
          console.log(`✅ ${result.platform}: ${result.url}`);
          if (result.postId) {
            console.log(`   📝 Post ID: ${result.postId}`);
          }
        } else {
          console.log(`❌ ${result.platform}: ${result.error}`);
          allSuccess = false;
          hasErrors = true;
        }
      });

      console.log("");
      if (allSuccess) {
        console.log("🎉 All platforms published successfully!");
      } else if (hasErrors) {
        console.log("⚠️  Some platforms failed to publish. Check the errors above.");
        process.exit(1);
      } else {
        console.log("ℹ️  No platforms were configured for publishing.");
      }
    })
    .catch((error) => {
      console.error("❌ Cross-posting failed:", error);
      process.exit(1);
    });
}

export { CrossPoster };
export type { CrossPostConfig, PostData, CrossPostResult };
