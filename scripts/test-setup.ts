#!/usr/bin/env tsx

import { loadConfig, validateConfig } from './config';
import { HashnodePublisher } from './publish-hashnode';

async function testSetup() {
  console.log('🧪 Testing Cross-Posting Setup\n');
  
  // Load and validate configuration
  const config = loadConfig();
  const errors = validateConfig(config);
  
  if (errors.length > 0) {
    console.error('❌ Configuration errors found:');
    errors.forEach(error => console.error(`  - ${error}`));
    console.log('\nPlease fix these issues before proceeding.');
    return;
  }
  
  console.log('✅ Configuration is valid\n');
  
  // Test Hashnode connection
  if (config.platforms.hashnode?.enabled) {
    console.log('🔗 Testing Hashnode connection...');
    try {
      const hashnodePublisher = new HashnodePublisher(
        config.platforms.hashnode.apiKey!,
        config.platforms.hashnode.publicationId!
      );
      
      // Test with a simple introspection query
      const testQuery = `
        query {
          publication(id: "${config.platforms.hashnode.publicationId}") {
            id
            title
            url
          }
        }
      `;
      
      const response = await hashnodePublisher['makeGraphQLRequest'](testQuery, {});
      if (response.data?.publication) {
        console.log(`✅ Hashnode: Connected to "${(response.data as { publication: { title: string } }).publication.title}"`);
      } else {
        console.log('⚠️  Hashnode: Connection successful but no publication data');
      }
    } catch (error) {
      console.error(`❌ Hashnode: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  } else {
    console.log('⏭️  Hashnode: Skipped (not configured)');
  }
  

  
  // Summary
  console.log('\n📊 Setup Summary');
  console.log('================');
  
  const enabledPlatforms = Object.entries(config.platforms)
    .filter(([, platform]) => platform.enabled)
    .map(([name]) => name);
    
  console.log(`Enabled platforms: ${enabledPlatforms.length > 0 ? enabledPlatforms.join(', ') : 'None'}`);
  console.log(`Content directory: ${config.contentDirectory}`);
  console.log(`Canonical base URL: ${config.canonicalBaseUrl}`);
  console.log(`Default publish status: ${config.defaultPublishStatus}`);
  
  if (enabledPlatforms.length === 0) {
    console.log('\n⚠️  No platforms are enabled. Please check your API credentials.');
  } else {
    console.log('\n🎉 Setup is ready! You can now use the cross-posting scripts.');
    console.log('\nExample usage:');
    console.log('  yarn cross-post my-post https://yoursite.com/posts/my-post draft');
  }
}

// CLI usage
if (require.main === module) {
  testSetup()
    .catch(error => {
      console.error('❌ Test failed:', error);
      process.exit(1);
    });
}

export { testSetup };
