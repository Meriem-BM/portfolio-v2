import { IDetailBlogPost, IBlogPost } from "@/types";
import { createBlogPost, validateContent, getContentStats } from "./contentBuilder";
import { parseMarkdown } from "./markdownParser";

export interface BlogPostMetadata {
  id: number;
  title: string;
  excerpt?: string;
  date: string;
  tags: string[];
  readTime?: string;
  heroGradient?: string;
  reactions?: number;
}

/**
 * Content Manager - Centralized system for managing blog content
 */
export class ContentManager {
  private static posts: Map<string, IDetailBlogPost> = new Map();
  private static summaryPosts: IBlogPost[] = [];

  // Initialize with example content
  static {
    this.loadExampleContent();
  }

  /**
   * Add a new blog post
   */
  static addPost(slug: string, post: IDetailBlogPost): void {
    this.posts.set(slug, post);
    this.updateSummaryPosts();
  }

  /**
   * Get a blog post by slug
   */
  static getPost(slug: string): IDetailBlogPost | null {
    return this.posts.get(slug) || null;
  }

  /**
   * Get all blog post summaries
   */
  static getAllPosts(): IBlogPost[] {
    return [...this.summaryPosts];
  }

  /**
   * Add post from markdown content
   */
  static addPostFromMarkdown(
    slug: string,
    metadata: BlogPostMetadata,
    markdownContent: string
  ): IDetailBlogPost {
    const content = parseMarkdown(markdownContent);
    const stats = getContentStats(content);
    
    const post = createBlogPost()
      .id(metadata.id)
      .title(metadata.title)
      .excerpt(metadata.excerpt || "")
      .date(metadata.date)
      .tags(metadata.tags)
      .readTime(metadata.readTime || stats.estimatedReadTime)
      .heroGradient(metadata.heroGradient || "from-blue-500 via-purple-500 to-cyan-500")
      .reactions(metadata.reactions || 0)
      .content(content)
      .build();

    this.addPost(slug, post);
    return post;
  }

  /**
   * Validate post content
   */
  static validatePost(post: IDetailBlogPost): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Basic validation
    if (!post.title?.trim()) errors.push("Title is required");
    if (!post.date) errors.push("Date is required");
    if (!post.tags?.length) errors.push("At least one tag is required");
    if (!post.content?.length) errors.push("Content is required");

    // Content validation
    const contentValidation = validateContent(post.content);
    if (!contentValidation.isValid) {
      errors.push(...contentValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get posts by tag
   */
  static getPostsByTag(tag: string): IBlogPost[] {
    return this.summaryPosts.filter(post => post.tags.includes(tag));
  }

  /**
   * Search posts by content
   */
  static searchPosts(query: string): IBlogPost[] {
    const lowercaseQuery = query.toLowerCase();
    return this.summaryPosts.filter(post => 
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  /**
   * Get available tags
   */
  static getAllTags(): string[] {
    const tagSet = new Set<string>();
    this.summaryPosts.forEach(post => {
      post.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }

  /**
   * Export post as JSON
   */
  static exportPost(slug: string): string | null {
    const post = this.getPost(slug);
    return post ? JSON.stringify(post, null, 2) : null;
  }

  /**
   * Import post from JSON
   */
  static importPost(slug: string, jsonData: string): boolean {
    try {
      const post = JSON.parse(jsonData) as IDetailBlogPost;
      const validation = this.validatePost(post);
      
      if (validation.isValid) {
        this.addPost(slug, post);
        return true;
      } else {
        console.error("Invalid post data:", validation.errors);
        return false;
      }
    } catch (error) {
      console.error("Failed to import post:", error);
      return false;
    }
  }

  /**
   * Update summary posts from full posts
   */
  private static updateSummaryPosts(): void {
    this.summaryPosts = Array.from(this.posts.entries()).map(([slug, post]) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || "",
      date: post.date,
      tags: post.tags,
      reactions: post.reactions,
      readTime: post.readTime,
      slug,
      summary: post.summary || "",
      author: post.author || { name: "", url: "" },
      cover: post.cover || "",
      updated: post.updated || "",
    })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  /**
   * Load example content
   */
  private static loadExampleContent(): void {
    // Example: Building with Viem
    const viemMarkdown = `# Building with Viem: A Web3 Developer's Journey

Web3 development has evolved rapidly, and with it, the tools we use to build decentralized applications. Today, I want to share my experience with viem, a TypeScript interface for Ethereum that's changing how we interact with the blockchain.

## Why Viem?

Coming from ethers.js, I was initially skeptical about switching to a new library. However, viem's approach to type safety and developer experience quickly won me over.

\`\`\`typescript[file:client.ts]
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({
  chain: mainnet,
  transport: http()
})
\`\`\`

> [!INFO] Type Safety
> Viem provides excellent TypeScript support out of the box. No more guessing what parameters a function expects.

## Key Benefits

- Type Safety - Full TypeScript support
- Tree Shaking - Smaller bundle sizes  
- Modern API - Intuitive design patterns

\`\`\`typescript[file:balance.ts,highlight:1,8-10]
import { formatUnits } from 'viem'

async function getTokenBalance(address: string, tokenAddress: string) {
  const balance = await client.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [address]
  })
  
  return formatUnits(balance, 18)
}
\`\`\`

> [!SUCCESS] Migration Complete
> The migration wasn't without challenges, but the improved developer experience made it worthwhile.`;

    this.addPostFromMarkdown("building-with-viem", {
      id: 1,
      title: "Building with Viem: A Web3 Developer's Journey",
      excerpt: "Exploring the new paradigms in Web3 development and why viem is changing the game...",
      date: "2024-01-15",
      tags: ["frontend", "blockchain", "learning"],
      reactions: 24,
      heroGradient: "from-blue-500 via-purple-500 to-cyan-500",
    }, viemMarkdown);

    // Example: Experimental UI
    const uiMarkdown = `# The Art of Experimental UI

In the world of interface design, there's a constant tension between innovation and usability. How do we push boundaries while ensuring our users can still accomplish their goals?

## Breaking Conventions

Traditional UI patterns exist for good reasons, but they can also limit our creative expression. The key is knowing when and how to break them effectively.

> [!WARNING] User Experience First
> Remember: Innovation should enhance, not hinder, the user experience.

## Design Principles

1. Start with solid fundamentals
2. Identify opportunities for enhancement
3. Test with real users
4. Iterate based on feedback

> [!METRICS]
> User Satisfaction | 4.8/5 | +0.3 | up
> Task Completion | 94% | +12% | up  
> Time on Page | 3:24 | +45s | up`;

    this.addPostFromMarkdown("experimental-ui-art", {
      id: 2,
      title: "The Art of Experimental UI",
      excerpt: "How to push boundaries in interface design while maintaining usability...",
      date: "2024-01-08",
      tags: ["design", "frontend", "ideas"],
      reactions: 18,
      heroGradient: "from-pink-500 via-purple-500 to-indigo-500",
    }, uiMarkdown);

    // Example: Hackathon Chronicles
    const hackathonMarkdown = `# Hackathon Chronicles: 48 Hours of Chaos

Hackathons are intense. 48 hours to go from idea to working prototype, with minimal sleep and maximum caffeine. Here's what I learned from my latest adventure.

## The Challenge

Build a DeFi protocol that solves real problems in the space. Our team decided to tackle cross-chain liquidity aggregation.

> [!TIMELINE]
> Hours 0-6 | Planning and Setup | Defined MVP, set up environment, created wireframes
> Hours 6-24 | Core Development | Smart contracts, frontend scaffolding, API integration  
> Hours 24-42 | Integration Hell | Connecting pieces, cross-chain bridges, bug fixes
> Hours 42-48 | Polish and Presentation | UI improvements, demo prep, pitch deck

## Key Learnings

- **Scope creep is real** - Stay focused on the MVP
- **Sleep matters** - Even 2-3 hours makes a difference
- **Team communication** - Regular check-ins prevent conflicts

> [!SUCCESS] Mission Accomplished
> We didn't win, but we built something amazing and learned a ton. Sometimes that's more valuable than any prize.`;

    this.addPostFromMarkdown("hackathon-chronicles", {
      id: 3,
      title: "Hackathon Chronicles: 48 Hours of Chaos", 
      excerpt: "Lessons learned from building a DeFi protocol in a weekend...",
      date: "2024-01-01",
      tags: ["hackathon", "blockchain", "learning"],
      reactions: 31,
      heroGradient: "from-green-500 via-teal-500 to-blue-500",
    }, hackathonMarkdown);
  }
}

// Easy access functions
export const getBlogPost = (slug: string) => ContentManager.getPost(slug);
export const getAllBlogPosts = () => ContentManager.getAllPosts();
export const getBlogTags = () => ContentManager.getAllTags();
export const addBlogPost = (slug: string, post: IDetailBlogPost) => ContentManager.addPost(slug, post);
export const addBlogPostFromMarkdown = (slug: string, metadata: BlogPostMetadata, markdown: string) => 
  ContentManager.addPostFromMarkdown(slug, metadata, markdown);
