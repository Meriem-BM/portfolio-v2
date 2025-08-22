import 'dotenv/config';

interface HashnodePost {
  title: string;
  content: string;
  tags: string[];
  canonicalUrl?: string;
  publishedAt?: string;
}

interface HashnodeResponse {
  data?: {
    createDraft?: {
      draft?: {
        id: string;
        slug: string;
      };
    };
    publication?: {
      id: string;
      title: string;
      url: string;
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
  }>;
}

interface HashnodeError extends Error {
  code?: string;
  statusCode?: number;
}

class HashnodePublisher {
  private readonly apiToken: string;
  private readonly publicationId: string;
  private readonly endpoint = 'https://gql.hashnode.com';
  private readonly timeout = 30000; // 30 seconds

  constructor(apiToken: string, publicationId: string) {
    if (!apiToken?.trim()) {
      throw new Error('Hashnode API token is required');
    }
    if (!publicationId?.trim()) {
      throw new Error('Hashnode publication ID is required');
    }
    
    this.apiToken = apiToken.trim();
    this.publicationId = publicationId.trim();
  }

  /**
   * Makes a GraphQL request to Hashnode API with proper error handling
   */
  private async makeGraphQLRequest(query: string, variables: Record<string, unknown>): Promise<HashnodeResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiToken,
          'User-Agent': 'CrossPoster/1.0',
        },
        body: JSON.stringify({ query, variables }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        const error: HashnodeError = new Error(`HTTP ${response.status}: ${errorText}`);
        error.statusCode = response.status;
        throw error;
      }

      const result = await response.json();
      
      if (!result || typeof result !== 'object') {
        throw new Error('Invalid response format from Hashnode API');
      }

      return result as HashnodeResponse;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request to Hashnode API timed out');
        }
        throw error;
      }
      throw new Error('Unknown error occurred while making GraphQL request');
    }
  }

  /**
   * Converts structured content to markdown format
   */
  private convertContentToMarkdown(content: Array<{
    type: string;
    content?: string;
    language?: string;
    items?: string[];
    author?: string;
    alt?: string;
    src?: string;
    caption?: string;
    variant?: string;
    ordered?: boolean;
  }>): string {
    if (!Array.isArray(content)) {
      throw new Error('Content must be an array');
    }

    return content
      .map(item => {
        if (!item || typeof item !== 'object' || !item.type) {
          return '';
        }

        try {
          switch (item.type) {
            case 'text':
              return item.content || '';
            case 'heading':
              return `# ${item.content || ''}`;
            case 'subheading':
              return `## ${item.content || ''}`;
            case 'code':
              return `\`\`\`${item.language || ''}\n${item.content || ''}\n\`\`\``;
            case 'list':
              const prefix = item.ordered ? '1.' : '-';
              return item.items?.map(listItem => `${prefix} ${listItem}`).join('\n') || '';
            case 'quote':
              return `> ${item.content || ''}${item.author ? `\n\n— ${item.author}` : ''}`;
            case 'image':
              return `![${item.alt || ''}](${item.src || ''})${item.caption ? `\n\n*${item.caption}*` : ''}`;
            case 'callout':
              return `> **${item.variant?.toUpperCase() || 'INFO'}**: ${item.content || ''}`;
            case 'separator':
              return '---';
            case 'markdown':
              return item.content || '';
            default:
              console.warn(`Unknown content type: ${item.type}`);
              return '';
          }
        } catch (contentError) {
          console.error(`Error processing content item:`, contentError);
          return '';
        }
      })
      .filter(Boolean)
      .join('\n\n');
  }

  /**
   * Publishes a post to Hashnode with comprehensive error handling
   */
  async publishPost(post: HashnodePost): Promise<{ success: boolean; url?: string; error?: string; postId?: string }> {
    try {
      // Validate input
      if (!post.title?.trim()) {
        throw new Error('Post title is required');
      }
      if (!post.content?.trim()) {
        throw new Error('Post content is required');
      }
      if (!Array.isArray(post.tags) || post.tags.length === 0) {
        throw new Error('At least one tag is required');
      }

      // Convert content to markdown
      const markdownContent = typeof post.content === 'string' 
        ? post.content 
        : this.convertContentToMarkdown(post.content);

      const mutation = `
        mutation CreateDraft($input: CreateDraftInput!) {
          createDraft(input: $input) {
            draft {
              id
              slug
            }
          }
        }
      `;

      const variables = {
        input: {
          title: post.title.trim(),
          contentMarkdown: markdownContent,
          tags: post.tags.map(tag => ({ slug: tag.trim().toLowerCase().replace(/\s+/g, '-'), name: tag.trim() })).filter(tag => tag.name),
          publicationId: this.publicationId,
          ...(post.publishedAt && { publishedAt: new Date(post.publishedAt).toISOString() }),
        },
      };

      const result = await this.makeGraphQLRequest(mutation, variables);

      if (result.errors && result.errors.length > 0) {
        const errorMessages = result.errors.map(e => e.message).join('; ');
        console.error('GraphQL errors from Hashnode:', result.errors);
        return {
          success: false,
          error: `Hashnode API errors: ${errorMessages}`,
        };
      }

      if (result.data?.createDraft?.draft) {
        const draftData = result.data.createDraft.draft;
        return {
          success: true,
          url: `https://hashnode.com/draft/${draftData.id}`,
          postId: draftData.id,
        };
      }

      return {
        success: false,
        error: 'No post data returned from Hashnode API',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Error publishing to Hashnode:', error);
      
      return {
        success: false,
        error: `Failed to publish to Hashnode: ${errorMessage}`,
      };
    }
  }

  /**
   * Tests the connection to Hashnode API
   */
  async testConnection(): Promise<{ success: boolean; publication?: { title: string; url: string }; error?: string }> {
    try {
      const testQuery = `
        query {
          publication(id: "${this.publicationId}") {
            id
            title
            domain
          }
        }
      `;
      
      const response = await this.makeGraphQLRequest(testQuery, {});
      
      if (response.data?.publication) {
        return {
          success: true,
          publication: response.data.publication,
        };
      }
      
      return {
        success: false,
        error: 'No publication data returned',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        error: `Connection test failed: ${errorMessage}`,
      };
    }
  }
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: tsx scripts/publish-hashnode.ts <post-slug> <canonical-url>');
    console.error('Example: tsx scripts/publish-hashnode.ts my-post https://yoursite.com/posts/my-post');
    process.exit(1);
  }

  const [postSlug, canonicalUrl] = args;
  
  // Load environment variables
  const apiToken = process.env.HASHNODE_API_TOKEN;
  const publicationId = process.env.HASHNODE_PUBLICATION_ID;

  if (!apiToken || !publicationId) {
    console.error('Missing required environment variables: HASHNODE_API_TOKEN, HASHNODE_PUBLICATION_ID');
    process.exit(1);
  }

  // Sample post data for testing
  const postData = {
    title: `Sample Post: ${postSlug}`,
    content: `This is a sample post content for ${postSlug}. Replace this with your actual content loading logic.`,
    tags: ['sample', 'post'],
    canonicalUrl,
  };

  const publisher = new HashnodePublisher(apiToken, publicationId);
  
  publisher.publishPost(postData)
    .then(result => {
      if (result.success) {
        console.log(`✅ Successfully published to Hashnode: ${result.url}`);
        if (result.postId) {
          console.log(`📝 Post ID: ${result.postId}`);
        }
      } else {
        console.error(`❌ Failed to publish to Hashnode: ${result.error}`);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Error:', error);
      process.exit(1);
    });
}

export { HashnodePublisher };
export type { HashnodePost, HashnodeResponse };
