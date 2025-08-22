import { ILogContent, IDetailBlogPost } from "@/types";

/**
 * Content Builder - Easy-to-use utilities for creating blog content
 */
export class ContentBuilder {
  private content: ILogContent[] = [];

  // Text content builders
  hero(content: string): ContentBuilder {
    this.content.push({ type: "hero", content });
    return this;
  }

  heading(content: string): ContentBuilder {
    this.content.push({ type: "heading", content });
    return this;
  }

  subheading(content: string): ContentBuilder {
    this.content.push({ type: "subheading", content });
    return this;
  }

  text(content: string): ContentBuilder {
    this.content.push({ type: "text", content });
    return this;
  }

  markdown(content: string): ContentBuilder {
    this.content.push({ type: "markdown", content });
    return this;
  }

  // Interactive content
  interactive(content: string): ContentBuilder {
    this.content.push({ type: "interactive", content });
    return this;
  }

  // Code blocks
  code(
    content: string,
    language: string = "typescript",
    options?: { fileName?: string; highlightLines?: number[] }
  ): ContentBuilder {
    this.content.push({
      type: "code",
      content,
      language,
      fileName: options?.fileName,
      highlightLines: options?.highlightLines,
    });
    return this;
  }

  // Lists
  list(items: string[], ordered: boolean = false): ContentBuilder {
    this.content.push({ type: "list", items, ordered });
    return this;
  }

  // Callouts
  callout(
    content: string,
    variant: "info" | "warning" | "danger" | "success" = "info",
    title?: string
  ): ContentBuilder {
    this.content.push({ type: "callout", content, variant, title });
    return this;
  }

  info(content: string, title?: string): ContentBuilder {
    return this.callout(content, "info", title);
  }

  warning(content: string, title?: string): ContentBuilder {
    return this.callout(content, "warning", title);
  }

  success(content: string, title?: string): ContentBuilder {
    return this.callout(content, "success", title);
  }

  danger(content: string, title?: string): ContentBuilder {
    return this.callout(content, "danger", title);
  }

  // Media content
  image(
    src: string,
    alt: string,
    options?: { caption?: string; width?: number; height?: number }
  ): ContentBuilder {
    this.content.push({
      type: "image",
      src,
      alt,
      caption: options?.caption,
      width: options?.width,
      height: options?.height,
    });
    return this;
  }

  video(
    src: string,
    options?: { poster?: string; caption?: string }
  ): ContentBuilder {
    this.content.push({
      type: "video",
      src,
      poster: options?.poster,
      caption: options?.caption,
    });
    return this;
  }

  // Quote
  quote(content: string, author?: string, source?: string): ContentBuilder {
    this.content.push({ type: "quote", content, author, source });
    return this;
  }

  // Table
  table(headers: string[], rows: string[][], caption?: string): ContentBuilder {
    this.content.push({ type: "table", headers, rows, caption });
    return this;
  }

  // Timeline
  timeline(
    items: Array<{ time: string; title: string; description: string }>
  ): ContentBuilder {
    this.content.push({ type: "timeline", items });
    return this;
  }

  // Metrics
  metrics(
    items: Array<{
      label: string;
      value: string | number;
      change?: string;
      trend?: "up" | "down" | "neutral";
    }>
  ): ContentBuilder {
    this.content.push({ type: "metrics", items });
    return this;
  }

  // Separators
  separator(style: "line" | "dots" | "gradient" = "line"): ContentBuilder {
    this.content.push({ type: "separator", style });
    return this;
  }

  // Layout components
  twoColumn(
    leftContent: ILogContent[],
    rightContent: ILogContent[]
  ): ContentBuilder {
    this.content.push({
      type: "two-column",
      left: leftContent,
      right: rightContent,
    });
    return this;
  }

  tabs(tabs: Array<{ label: string; content: ILogContent[] }>): ContentBuilder {
    this.content.push({ type: "tabs", tabs });
    return this;
  }

  accordion(
    items: Array<{ title: string; content: ILogContent[] }>
  ): ContentBuilder {
    this.content.push({ type: "accordion", items });
    return this;
  }

  // Embed external content
  embed(
    url: string,
    options?: { title?: string; description?: string; provider?: string }
  ): ContentBuilder {
    this.content.push({
      type: "embed",
      url,
      title: options?.title,
      description: options?.description,
      provider: options?.provider,
    });
    return this;
  }

  // Build the final content array
  build(): ILogContent[] {
    return [...this.content];
  }

  // Clear content for reuse
  clear(): ContentBuilder {
    this.content = [];
    return this;
  }
}

// Helper functions for quick content creation
export const createContent = () => new ContentBuilder();

// Pre-built content templates
export const templates = {
  // Technical tutorial template
  tutorial: (title: string, description: string) =>
    createContent()
      .hero(description)
      .heading("Overview")
      .text("This tutorial will guide you through...")
      .heading("Prerequisites")
      .list(["Basic knowledge of...", "Familiarity with..."])
      .separator()
      .heading("Getting Started"),

  // Project showcase template
  showcase: (title: string, description: string, demoUrl?: string) =>
    createContent()
      .hero(description)
      .heading("Project Overview")
      .embed(demoUrl || "", {
        title: "Demo",
        description: "View the demo",
        provider: "Vercel",
      })
      .text("In this post, I'll walk you through...")
      .metrics([
        { label: "Development Time", value: "2 weeks" },
        { label: "Technologies", value: "5" },
        { label: "Features", value: "12" },
      ])
      .separator(),

  // Learning log template
  learningLog: (title: string, description: string) =>
    createContent()
      .hero(description)
      .heading("What I Learned")
      .text("Key takeaways from this experience...")
      .timeline([
        {
          time: "Week 1",
          title: "Discovery",
          description: "Initial exploration and setup",
        },
        {
          time: "Week 2",
          title: "Implementation",
          description: "Building the core features",
        },
        {
          time: "Week 3",
          title: "Optimization",
          description: "Performance improvements and testing",
        },
      ])
      .separator(),
};

// Blog post builder with metadata
export class BlogPostBuilder {
  private post: Partial<IDetailBlogPost> = {};

  id(id: number): BlogPostBuilder {
    this.post.id = id;
    return this;
  }

  title(title: string): BlogPostBuilder {
    this.post.title = title;
    return this;
  }

  excerpt(excerpt: string): BlogPostBuilder {
    this.post.excerpt = excerpt;
    return this;
  }

  date(date: string): BlogPostBuilder {
    this.post.date = date;
    return this;
  }

  tags(tags: string[]): BlogPostBuilder {
    this.post.tags = tags;
    return this;
  }

  readTime(readTime: string): BlogPostBuilder {
    this.post.readTime = readTime;
    return this;
  }

  heroGradient(gradient: string): BlogPostBuilder {
    this.post.heroGradient = gradient;
    return this;
  }

  reactions(reactions: number): BlogPostBuilder {
    this.post.reactions = reactions;
    return this;
  }

  content(content: ILogContent[]): BlogPostBuilder {
    this.post.content = content;
    return this;
  }

  build(): IDetailBlogPost {
    if (
      !this.post.id ||
      !this.post.title ||
      !this.post.date ||
      !this.post.tags ||
      !this.post.content
    ) {
      throw new Error(
        "Missing required fields: id, title, date, tags, content"
      );
    }

    return {
      id: this.post.id,
      title: this.post.title,
      excerpt: this.post.excerpt || "",
      date: this.post.date,
      tags: this.post.tags,
      reactions: this.post.reactions || 0,
      readTime: this.post.readTime || "5 min",
      heroGradient:
        this.post.heroGradient || "from-blue-500 via-purple-500 to-cyan-500",
      content: this.post.content,
      author: this.post.author || { name: "", url: "" },
      slug: this.post.slug || "",
      summary: this.post.summary || "",
      cover: this.post.cover || "",
      updated: this.post.updated || "",
    };
  }
}

export const createBlogPost = () => new BlogPostBuilder();

// Content validation utilities
export const validateContent = (
  content: ILogContent[]
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  content.forEach((item, index) => {
    switch (item.type) {
      case "code":
        if (!item.content.trim()) {
          errors.push(`Code block at index ${index} has empty content`);
        }
        break;
      case "image":
        if (!item.src || !item.alt) {
          errors.push(
            `Image at index ${index} missing required src or alt text`
          );
        }
        break;
      case "table":
        if (!item.headers.length || !item.rows.length) {
          errors.push(`Table at index ${index} missing headers or rows`);
        }
        break;
      case "timeline":
        if (!item.items.length) {
          errors.push(`Timeline at index ${index} has no items`);
        }
        break;
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Content statistics
export const getContentStats = (content: ILogContent[]) => {
  const stats = {
    totalBlocks: content.length,
    wordCount: 0,
    codeBlocks: 0,
    images: 0,
    videos: 0,
    tables: 0,
    estimatedReadTime: "0 min",
  };

  content.forEach((item) => {
    switch (item.type) {
      case "text":
      case "hero":
      case "heading":
      case "subheading":
        stats.wordCount += item.content.split(" ").length;
        break;
      case "code":
        stats.codeBlocks++;
        break;
      case "image":
        stats.images++;
        break;
      case "video":
        stats.videos++;
        break;
      case "table":
        stats.tables++;
        break;
      case "markdown":
        stats.wordCount += item.content.split(" ").length;
        break;
    }
  });

  // Rough estimate: 200 words per minute
  const readTimeMinutes = Math.max(1, Math.ceil(stats.wordCount / 200));
  stats.estimatedReadTime = `${readTimeMinutes} min`;

  return stats;
};
