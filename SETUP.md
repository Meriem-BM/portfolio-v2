# 🚀 Cross-Posting Setup Guide

Your portfolio now has a powerful cross-posting system that can automatically publish blog content to multiple platforms while maintaining proper SEO with canonical URLs.

## ✨ What's Been Added

- **Hashnode Integration**: GraphQL-based publishing with canonical URL support

- **GitHub Actions**: Automated workflows for cross-posting
- **Content Management**: Markdown-based content system with frontmatter
- **Configuration Management**: Centralized settings and validation

## 🔑 Required API Keys

### 1. Hashnode Setup

1. Go to [Hashnode](https://hashnode.com) and log in
2. Navigate to your publication settings
3. Go to the "API" section
4. Generate a new API token
5. Note your publication ID from the URL (e.g., `https://hashnode.com/@username` → publication ID)

## 🛠️ Configuration Steps

### Step 1: Add Environment Variables

Create a `.env.local` file in your project root:

```bash
# Hashnode
HASHNODE_API_TOKEN=your_hashnode_api_token_here
HASHNODE_PUBLICATION_ID=your_publication_id_here



# Site Configuration
CANONICAL_BASE_URL=https://mac-portfolio.vercel.app
```

### Step 2: Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

- `HASHNODE_API_TOKEN`
- `HASHNODE_PUBLICATION_ID`

### Step 3: Test Your Setup

```bash
yarn test-setup
```

This will validate your configuration and test API connections.

## 📝 Content Structure

Your blog posts should be in `content/posts/` with this structure:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
tags: ["webdev", "javascript", "react"]
excerpt: "Brief description of your post"
---

# Your Post Content

Your markdown content here...
```

## 🚀 Usage

### Command Line

#### Cross-post to all platforms:

```bash
yarn cross-post my-awesome-post https://mac-portfolio.vercel.app/posts/my-awesome-post draft
```

#### Publish to specific platform:

```bash
yarn publish-hashnode my-awesome-post https://mac-portfolio.vercel.app/posts/my-awesome-post
```

### GitHub Actions

1. **Manual trigger**: Go to Actions → Cross-Post Blog Content → Run workflow
2. **Automatic trigger**: Push changes to `content/posts/` directory

## 🔄 How It Works

1. **Content Loading**: Scripts read markdown files with frontmatter
2. **Content Transformation**: Convert to platform-specific formats (markdown/HTML)
3. **API Publishing**: Send to each platform's API with canonical URLs
4. **SEO Optimization**: Maintains proper attribution and prevents duplicate content

## 📊 Platform Features

| Platform | Content Format | Canonical URL | API Type |
| -------- | -------------- | ------------- | -------- |
| Hashnode | Markdown       | ✅ Supported  | GraphQL  |

## 🚨 Troubleshooting

### Common Issues

1. **"No platforms are enabled"**
   - Check your environment variables
   - Ensure API keys are valid
   - Run `yarn test-setup` to diagnose

2. **Content parsing errors**
   - Verify markdown syntax
   - Check frontmatter format
   - Ensure proper file encoding

3. **API errors**
   - Verify API credentials
   - Check platform status pages
   - Review API rate limits

### Debug Mode

Add `DEBUG=true` to your environment variables for verbose logging.

## 🔮 Next Steps

1. **Test with a draft post** before publishing live content
2. **Customize content transformation** for your specific needs
3. **Set up automated workflows** for regular publishing
4. **Monitor performance** and adjust as needed

## 📚 Resources

- [Hashnode GraphQL API](https://gql.hashnode.com)

- [Cross-Posting Scripts README](scripts/README.md)

## 🎉 You're All Set!

Your cross-posting system is ready to go! Start by testing with a draft post, then gradually automate your workflow. The system will handle all the technical details while you focus on creating great content.

---

**Need help?** Check the [scripts/README.md](scripts/README.md) for detailed technical documentation, or review the GitHub Actions workflow in `.github/workflows/cross-post.yml`.
