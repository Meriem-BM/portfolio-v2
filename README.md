# 🚀 Portfolio v2 - Modern Web Development Showcase

<<<<<<< HEAD
<<<<<<< Updated upstream
A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.
=======
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
  > > > > > > > b3bd72db69838a95185236e95e029bffa1e8cf72

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

````bash
# Clone the repository
<<<<<<< HEAD
git clone https://github.com/Meriem-BM/portfolio-v2.git
=======
Modern portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features blog management, automated cross-posting to Hashnode, and comprehensive SEO optimization.
=======
git clone https://github.com/yourusername/portfolio-v2.git
cd portfolio-v2
>>>>>>> b3bd72db69838a95185236e95e029bffa1e8cf72

## Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** + Framer Motion for modern UI
- **Markdown-based** blog system
- **Cross-posting** to Hashnode
- **SEO optimized** with sitemap, RSS, and Open Graph
- **Performance monitoring** with Core Web Vitals
- **Code quality** with Prettier, ESLint, and Husky

## Quick Start

### Prerequisites

- Node.js 18+
- Yarn

### Installation

```bash
# Clone and install
git clone https://github.com/yourusername/portfolio-v2.git
>>>>>>> Stashed changes
cd portfolio-v2
yarn install

# Start development
yarn dev
````

<<<<<<< HEAD
<<<<<<< Updated upstream
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
=======

### Environment Variables

> > > > > > > # Stashed changes

### Environment Setup

> > > > > > > b3bd72db69838a95185236e95e029bffa1e8cf72

Create a `.env.local` file:

<<<<<<< HEAD
<<<<<<< Updated upstream

- **Node.js** 18.0 or higher
- **Yarn** package manager
- # Modern web browser

```bash
# Cross-posting configuration
HASHNODE_API_TOKEN=your_hashnode_token
HASHNODE_PUBLICATION_ID=your_publication_id
>>>>>>> b3bd72db69838a95185236e95e029bffa1e8cf72

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

# <<<<<<< HEAD

```bash
# Required for cross-posting
NEXT_PUBLIC_GITHUB_ACCESS_TOKEN=
EMAILJS_USER_ID=
EMAILJS_PASSWORD=

HASHNODE_API_TOKEN=
HASHNODE_PUBLICATION_ID=

SITE=http://localhost:3000
SNYK_TOKEN=

NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_TITLE=
NEXT_PUBLIC_SITE_DESCRIPTION=
CANONICAL_BASE_URL=

OPENAI_API_KEY=
```

## Available Scripts

### Development

```bash
yarn dev          # Start dev server with Turbopack
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run ESLint
yarn lint:fix     # Fix linting issues
yarn format       # Format code with Prettier
yarn type-check   # Run TypeScript compiler
```

### Cross-Posting

```bash
yarn cross-post <slug> <canonical-url> [draft|published]
yarn publish-hashnode <slug> <canonical-url>
yarn test-setup   # Test API credentials
```

Example:

```bash
yarn cross-post my-post https://yoursite.com/logs/my-post draft
```

### Testing

```bash
yarn test:seo         # Run SEO tests
yarn test:performance # Run performance tests
yarn test:all         # Run all tests
```

## Project Structure

```
portfolio-v2/
├── app/              # Next.js app router pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── posts/       # Blog-related components
│   └── ping/        # Contact page components
├── content/posts/    # Markdown blog posts
├── lib/             # Utilities and helpers
│   ├── blogs/       # Blog system
│   └── social-links.ts # Centralized social links
├── scripts/         # Cross-posting scripts
├── docs/            # Documentation
└── test/            # Playwright tests
```

## SEO & Performance

- Automatic sitemap generation
- RSS feed
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- Core Web Vitals monitoring
- Lighthouse CI integration

## Code Quality

Pre-commit hooks automatically:

- Format code with Prettier
- Fix linting issues with ESLint
- Validate commit messages (conventional commits)
- Sort Tailwind classes

## Documentation

- [Code Quality Guide](docs/CODE_QUALITY.md) - Prettier, ESLint, Husky setup
- [Implementation Details](docs/IMPLEMENTATION.md) - Technical documentation
- [SEO & Vitals](docs/SEO_AND_VITALS.md) - SEO optimization guide

## Contributing

=======

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

> > > > > > > b3bd72db69838a95185236e95e029bffa1e8cf72

1. Fork the repository
2. Create a feature branch
3. Make your changes
   <<<<<<< HEAD
4. Ensure tests pass and code is formatted
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with Next.js

> > > > > > > # Stashed changes
> > > > > > >
> > > > > > > 4. Add tests if applicable
> > > > > > > 5. Submit a pull request

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

> > > > > > > b3bd72db69838a95185236e95e029bffa1e8cf72
