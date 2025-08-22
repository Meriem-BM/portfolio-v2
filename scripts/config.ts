import 'dotenv/config';

export interface CrossPostConfig {
  platforms: {
    hashnode?: PlatformConfig;
  };
  defaultPublishStatus: 'draft' | 'unlisted' | 'public';
  contentDirectory: string;
  canonicalBaseUrl: string;
}

export interface PlatformConfig {
  enabled: boolean;
  apiKey?: string;
  publicationId?: string;
  defaultTags?: string[];
  contentTransform?: 'markdown' | 'html' | 'custom';
}

export const defaultConfig: CrossPostConfig = {
  platforms: {
    hashnode: {
      enabled: false,
      apiKey: process.env.HASHNODE_API_TOKEN,
      publicationId: process.env.HASHNODE_PUBLICATION_ID,
      defaultTags: ['webdev', 'javascript', 'react'],
      contentTransform: 'markdown',
    },
  },
  defaultPublishStatus: 'draft',
  contentDirectory: 'content/posts',
  canonicalBaseUrl: 'https://mac-portfolio.vercel.app',
};

export function loadConfig(): CrossPostConfig {
  // You can extend this to load from a config file
  const config = { ...defaultConfig };
  
  // Enable platforms that have the required credentials
  if (config.platforms.hashnode?.apiKey && config.platforms.hashnode?.publicationId) {
    config.platforms.hashnode.enabled = true;
  }
  
  return config;
}

export function validateConfig(config: CrossPostConfig): string[] {
  const errors: string[] = [];
  
  if (!config.canonicalBaseUrl || config.canonicalBaseUrl === 'https://yoursite.com') {
    errors.push('Please set a valid canonicalBaseUrl in your configuration');
  }
  
  const enabledPlatforms = Object.entries(config.platforms)
    .filter(([, platform]) => platform.enabled)
    .map(([name]) => name);
    
  if (enabledPlatforms.length === 0) {
    errors.push('No platforms are enabled. Please check your API credentials.');
  }
  
  return errors;
}
