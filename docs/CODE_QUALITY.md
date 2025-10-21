# Code Quality Setup

This document describes the code quality tools and configurations used in this project.

## Tools

### 1. **Prettier** - Code Formatter

Prettier is configured to automatically format code for consistency.

**Configuration**: `.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Commands**:

- `yarn format` - Format all files
- `yarn format:check` - Check if files are formatted

### 2. **ESLint** - Linter

ESLint is configured with Next.js and TypeScript rules, plus Prettier integration.

**Configuration**: `eslint.config.mjs`

**Rules**:

- Next.js core web vitals
- TypeScript recommended
- Prettier integration
- Custom rules for `any` types and unused variables

**Commands**:

- `yarn lint` - Check for linting errors
- `yarn lint:fix` - Fix auto-fixable linting errors

### 3. **Husky** - Git Hooks

Husky manages Git hooks to ensure code quality before commits.

**Hooks**:

#### Pre-commit Hook

Runs `lint-staged` on staged files before commit.

**Location**: `.husky/pre-commit`

**What it does**:

- Runs ESLint with auto-fix on `.js`, `.jsx`, `.ts`, `.tsx` files
- Runs Prettier on all staged files

#### Commit Message Hook

Validates commit messages follow conventional commit format or emoji format.

**Location**: `.husky/commit-msg`

**Allowed formats**:

```
# Conventional Commits
feat(scope): description
fix: description
docs: description
style: description
refactor: description
perf: description
test: description
build: description
ci: description
chore: description
revert: description

# Emoji Commits
🎨 description  (style)
♻️ description  (refactor)
✨ description  (feat)
🐛 description  (fix)
📝 description  (docs)
🚀 description  (deploy)
⚡ description  (perf)
🧪 description  (test)
🔧 description  (config)
👷 description  (ci)
🔖 description  (release)
⏪ description  (revert)
```

### 4. **lint-staged**

Runs linters on staged files only (much faster than linting the entire project).

**Configuration**: `package.json`

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,scss,md}": ["prettier --write"]
  }
}
```

## VS Code Integration

The project includes VS Code settings to automatically format and lint on save.

**Configuration**: `.vscode/settings.json`

Features:

- Format on save with Prettier
- ESLint auto-fix on save
- Consistent EOL (LF)

## Ignored Files

Files/directories ignored by Prettier: `.prettierignore`

- `node_modules`
- `.next`
- `out`
- `build`
- `dist`
- `public`
- Lock files
- Environment files

## Workflow

### Daily Development

1. Write code
2. VS Code automatically formats and lints on save
3. Stage changes: `git add .`
4. Commit: `git commit -m "feat: add new feature"`
5. Pre-commit hook runs automatically:
   - Formats staged files
   - Fixes linting issues
   - Re-stages fixed files
6. Commit-msg hook validates message format
7. Commit succeeds ✅

### Manual Checks

```bash
# Format entire codebase
yarn format

# Check formatting
yarn format:check

# Lint entire codebase
yarn lint

# Fix linting issues
yarn lint:fix

# Type check
yarn type-check
```

## Best Practices

1. **Never skip hooks**: Don't use `--no-verify` unless absolutely necessary
2. **Write meaningful commit messages**: Follow conventional commit format
3. **Fix warnings**: Don't let ESLint warnings accumulate
4. **Use type safety**: Avoid `any` types when possible
5. **Format before committing**: Let tools handle code style

## Troubleshooting

### Hook not running?

```bash
# Reinstall hooks
yarn prepare
```

### Formatting conflicts?

```bash
# Clear cache and re-format
rm -rf .eslintcache
yarn format
```

### VS Code not formatting?

1. Install "Prettier - Code formatter" extension
2. Install "ESLint" extension
3. Reload VS Code
4. Check settings.json is loaded

## CI/CD Integration

These tools are also integrated into the CI/CD pipeline:

- GitHub Actions runs `yarn lint` and `yarn format:check`
- Pull requests must pass all checks before merging
- Type checking is enforced in the build process
