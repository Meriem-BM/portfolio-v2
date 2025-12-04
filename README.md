# Portfolio v2

Modern portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features blog management, automated cross-posting to Hashnode, comprehensive SEO optimization, and AI-powered contact form validation.

## Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** for type safety
- **Tailwind CSS** + Framer Motion for modern UI
- **Markdown-based** blog system
- **Cross-posting** to Hashnode
- **AI-powered** contact form validation with spam detection
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
cd portfolio-v2
yarn install

# Start development
yarn dev
```

### Environment Variables

Create a `.env.local` file:

```bash
# Required for cross-posting
HASHNODE_API_TOKEN=your_hashnode_token
HASHNODE_PUBLICATION_ID=your_publication_id

# Site configuration
SITE=http://localhost:3000
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_TITLE=Your Site Title
NEXT_PUBLIC_SITE_DESCRIPTION=Your site description

# Email configuration
EMAILJS_USER_ID=your_emailjs_user_id
EMAILJS_PASSWORD=your_emailjs_password

# AI validation (Optional - for contact form)
OPENAI_API_KEY=your_openai_api_key

# GitHub configuration (Optional)
NEXT_PUBLIC_GITHUB_ACCESS_TOKEN=your_github_token
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
├── hooks/           # Custom React hooks
│   └── useContactForm.ts # Contact form with AI validation
├── scripts/         # Cross-posting scripts
├── docs/            # Documentation
└── test/            # Playwright tests
```

## Key Features

### AI-Powered Contact Form

The contact form includes AI validation using OpenAI's GPT-4o-mini to:

- Detect spam and invalid messages
- Check message clarity and coherence
- Provide helpful suggestions
- Block spam submissions automatically

**Note:** AI validation is optional and works without the API key.

### SEO & Performance

- Automatic sitemap generation
- RSS feed
- Open Graph and Twitter Cards
- Structured data (JSON-LD)
- Core Web Vitals monitoring
- Lighthouse CI integration

### Code Quality

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

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass and code is formatted
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with Next.js
