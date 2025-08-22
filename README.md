# 🚀 Portfolio v2 - Modern Web Development Showcase

A cutting-edge portfolio built with Next.js 15, TypeScript, and modern web technologies. Features a cross-posting system, SEO optimization, and Core Web Vitals monitoring.

## ✨ Features

### 🎨 **Modern UI/UX**
- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety and developer experience
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Responsive Design** optimized for all devices

### 📝 **Content Management**
- **Markdown-based** blog system
- **Structured content** with flexible components
- **Content validation** and error handling
- **Dynamic routing** for blog posts

### 🔗 **Cross-Posting System**
- **Multi-platform publishing** (Hashnode)
- **Canonical URL support** for SEO optimization
- **Content transformation** for platform-specific formats
- **GitHub Actions** for automated publishing
- **Comprehensive error handling** and validation

### 🔍 **SEO & Performance**
- **Structured data** (Schema.org) markup
- **Core Web Vitals** monitoring
- **RSS feeds** and sitemaps
- **Open Graph** and Twitter Card support
- **Performance optimization** and lazy loading

### 🛠️ **Developer Experience**
- **ESLint** configuration for code quality
- **TypeScript** strict mode enabled
- **Comprehensive testing** with Playwright
- **GitHub Actions** for CI/CD
- **Detailed documentation** and examples

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-v2.git
cd portfolio-v2

# Install dependencies
yarn install

# Start development server
yarn dev
```

### Environment Setup
Create a `.env.local` file:
```bash
# Cross-posting configuration
HASHNODE_API_TOKEN=your_hashnode_token
HASHNODE_PUBLICATION_ID=your_publication_id

# Site configuration
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_TITLE=Your Site Title
NEXT_PUBLIC_SITE_DESCRIPTION=Your site description
```

## 📚 Documentation

### 📖 **Setup Guides**
- [Cross-Posting Setup](SETUP.md) - Complete setup guide
- [Implementation Details](docs/IMPLEMENTATION.md) - Technical implementation
- [SEO & Vitals Guide](docs/SEO_AND_VITALS.md) - SEO optimization

### 🔧 **Scripts & Tools**
- [Cross-Posting Scripts](scripts/README.md) - Script documentation
- [Content Management](lib/blogs/README.md) - Blog system guide

## 🎯 Cross-Posting System

### Overview
The cross-posting system automatically publishes your blog content to multiple platforms while maintaining proper SEO with canonical URLs.

### Supported Platforms
- ✅ **Hashnode** - GraphQL API with Markdown support

### Usage
```bash
# Publish to all platforms
yarn cross-post my-post https://yoursite.com/posts/my-post draft

# Publish to specific platform
yarn publish-hashnode my-post https://yoursite.com/posts/my-post

# Test setup
yarn test-setup
```

### GitHub Actions
Automated cross-posting workflows:
- Manual trigger with customizable options
- Automatic triggering on content changes
- Multi-platform publishing support
- Detailed logging and error reporting

## 🧪 Testing

### Run Tests
```bash
# SEO and performance tests
yarn test:seo

# Linting
yarn lint

# Type checking
npx tsc --noEmit
```

### Test Coverage
- **SEO endpoints** (RSS, sitemap, robots.txt)
- **Cross-posting functionality**
- **Content validation**
- **Performance monitoring**

## 🏗️ Project Structure

```
portfolio-v2/
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── ui/               # UI components
│   ├── seo/              # SEO components
│   └── analytics/        # Performance monitoring
├── scripts/               # Cross-posting scripts
├── lib/                   # Utilities and content management
├── docs/                  # Documentation
├── test/                  # Playwright tests
└── .github/               # GitHub Actions workflows
```

## 🔧 Configuration

### Cross-Posting
- Platform-specific API credentials
- Content transformation rules
- Publishing preferences
- Error handling strategies

### SEO & Performance
- Structured data markup
- Core Web Vitals thresholds
- Performance monitoring
- Search engine optimization

### Content Management
- Markdown parsing rules
- Content validation
- Component mapping
- Error recovery

## 🚨 Troubleshooting

### Common Issues
1. **API Credentials** - Verify environment variables
2. **Content Format** - Check markdown syntax
3. **Network Issues** - Verify API endpoints
4. **Type Errors** - Run TypeScript compiler

### Debug Mode
```bash
DEBUG=true yarn dev
DEBUG=true yarn cross-post my-post https://yoursite.com/posts/my-post
```

### Getting Help
- Check the [troubleshooting guides](docs/IMPLEMENTATION.md#troubleshooting)
- Review error logs and stack traces
- Validate configuration with `yarn test-setup`
- Check platform API status pages

## 🔮 Roadmap

### Upcoming Features

- **Content Scheduling** - Time-based publishing
- **Advanced Analytics** - Performance insights
- **A/B Testing** - Performance optimization
- **Webhook Support** - Real-time notifications

### Performance Goals
- **Core Web Vitals** - All metrics in "Good" range
- **Lighthouse Score** - 90+ across all categories
- **SEO Score** - 100% optimization
- **Accessibility** - WCAG 2.1 AA compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Development Guidelines
- Follow TypeScript strict mode
- Maintain ESLint compliance
- Add comprehensive error handling
- Include proper documentation
- Test all functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Vercel** for hosting and deployment
- **Tailwind CSS** for utility-first CSS
- **Framer Motion** for smooth animations
- **Web Vitals** for performance monitoring

---

**Built with ❤️ and modern web technologies**

For questions and support, check the documentation or open an issue on GitHub.
