# Cross-Posting Scripts

This directory contains scripts for automatically publishing blog content to multiple platforms while maintaining proper canonical URLs for SEO.

## 🚀 Features

- **Multi-platform publishing**: Hashnode
- **Canonical URL support**: Ensures proper SEO attribution
- **Content transformation**: Automatically converts your content format to platform-specific requirements
- **GitHub Actions integration**: Automated publishing workflows
- **Flexible configuration**: Choose which platforms to publish to

## 📋 Prerequisites

### Required Environment Variables

Add these to your `.env.local` file or GitHub Secrets:

```bash
# Hashnode
HASHNODE_API_TOKEN=your_hashnode_token_here
HASHNODE_PUBLICATION_ID=your_publication_id_here


```

### How to Get API Keys

#### Hashnode
1. Go to [Hashnode](https://hashnode.com) and log in
2. Navigate to your publication settings
3. Go to the "API" section
4. Generate a new API token
5. Note your publication ID from the URL



## 🛠️ Installation

1. Install dependencies:
```bash
yarn install
```

2. The scripts will be available as npm scripts:
```bash
yarn cross-post <slug> <canonical-url> [publish-status]
yarn publish-hashnode <slug> <canonical-url>
```

## 📝 Usage

### Command Line

#### Cross-post to all platforms:
```bash
yarn cross-post my-awesome-post https://yoursite.com/posts/my-awesome-post draft
```

#### Publish to specific platform:
```bash
yarn publish-hashnode my-awesome-post https://yoursite.com/posts/my-awesome-post
```

### GitHub Actions

The workflow can be triggered manually or automatically:

1. **Manual trigger**: Go to Actions → Cross-Post Blog Content → Run workflow
2. **Automatic trigger**: Push changes to `content/posts/` directory

## 🔧 Configuration

### Content Structure

The scripts expect your blog posts to be in markdown format with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
tags: ["webdev", "javascript", "react"]
excerpt: "Brief description of your post"
---

Your post content here...
```

### Platform-Specific Settings

Each platform has different requirements:

- **Hashnode**: Uses GraphQL API, supports markdown

## 📁 File Structure

```
scripts/
├── publish-hashnode.ts    # Hashnode publishing logic
├── cross-post.ts          # Unified cross-posting
├── config.ts              # Configuration management
└── README.md              # This file

.github/workflows/
└── cross-post.yml         # GitHub Actions workflow
```

## 🔄 Content Transformation

The scripts automatically transform your content:

- **Text blocks** → Paragraphs
- **Code blocks** → Syntax-highlighted code
- **Images** → Platform-optimized image tags
- **Lists** → Ordered/unordered lists
- **Quotes** → Blockquotes with attribution

## 🚨 Troubleshooting

### Common Issues

1. **Missing API credentials**: Ensure all required environment variables are set
2. **Content parsing errors**: Check your markdown syntax
3. **Platform-specific errors**: Check the platform's API documentation

### Debug Mode

Add `DEBUG=true` to your environment variables for verbose logging.

### Testing

Test with a draft post first:
```bash
yarn cross-post test-post https://yoursite.com/posts/test-post draft
```

## 🔮 Future Enhancements


- [ ] Content scheduling
- [ ] Analytics tracking
- [ ] A/B testing support
- [ ] Social media cross-posting

## 📚 API References

- [Hashnode GraphQL API](https://gql.hashnode.com)


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
