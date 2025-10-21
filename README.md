# Portfolio v2

<<<<<<< Updated upstream
A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Meriem-BM/portfolio-v2.git
=======
Modern portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features blog management, automated cross-posting to Hashnode, and comprehensive SEO optimization.

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
```

<<<<<<< Updated upstream
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
=======
### Environment Variables
>>>>>>> Stashed changes

## 📋 Requirements

<<<<<<< Updated upstream
- **Node.js** 18.0 or higher
- **Yarn** package manager
- Modern web browser

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server with Turbopack |
| `yarn build` | Build the application for production |
| `yarn start` | Start the production server |
| `yarn lint` | Run ESLint to check for issues |
| `yarn lint:fix` | Automatically fix ESLint issues |

## 🎨 Tech Stack & Styling

### Core Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **React 19** - Latest React features

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark/light mode support

### Form & Validation
- **React Hook Form** - Performant forms with validation
- **Zod** - TypeScript-first schema validation
- **Input OTP** - One-time password input component

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🌐 Deployment

This portfolio is deployed on [Vercel](https://vercel.com) and can be accessed at [meoumi.dev](https://meoumi.dev).

## 📁 Project Structure

```
portfolio-v2/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/              # Utility functions and constants
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── styles/           # Global CSS styles
└── public/           # Static assets
```
=======
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

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass and code is formatted
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with Next.js
>>>>>>> Stashed changes
