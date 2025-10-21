# 🚀 Performance Monitoring & Testing Guide

This document explains the comprehensive performance monitoring system implemented in your portfolio, including Lighthouse CI, Core Web Vitals testing, and automated performance validation.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Lighthouse CI Setup](#lighthouse-ci-setup)
3. [Performance Testing](#performance-testing)
4. [GitHub Actions Workflows](#github-actions-workflows)
5. [Bundle Analysis](#bundle-analysis)
6. [Core Web Vitals Monitoring](#core-web-vitals-monitoring)
7. [Performance Budgets](#performance-budgets)
8. [Troubleshooting](#troubleshooting)

## 🎯 Overview

Your portfolio includes a comprehensive performance monitoring system that ensures:

- **Lighthouse CI**: Automated performance audits on every commit
- **Core Web Vitals**: Real-time monitoring of user experience metrics
- **Bundle Analysis**: Size optimization and dependency tracking
- **Automated Testing**: Performance regression detection
- **SEO Validation**: Sitemap, RSS, and meta tag verification

## 🔍 Lighthouse CI Setup

### Configuration

The `.lighthouserc.js` file configures automated performance audits:

```javascript
module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:3000",
        "http://localhost:3000/logs",
        "http://localhost:3000/loops",
        "http://localhost:3000/ping",
        "http://localhost:3000/trace",
      ],
      startServerCommand: "yarn dev",
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
        },
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
  },
};
```

### Performance Thresholds

- **Performance**: 80% minimum (warning)
- **Accessibility**: 90% minimum (error)
- **Best Practices**: 80% minimum (warning)
- **SEO**: 90% minimum (error)

### Core Web Vitals Targets

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 200ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)
- **INP**: < 200ms (Interaction to Next Paint)
- **TTFB**: < 800ms (Time to First Byte)

## 🧪 Performance Testing

### Playwright Performance Tests

The `test/performance.spec.ts` file includes comprehensive performance validation:

```typescript
test("should load homepage within performance budget", async ({ page }) => {
  const startTime = Date.now();
  await page.goto("/");
  await page.waitForLoadState("networkidle");

  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000); // 3 second budget
});
```

### Test Categories

#### 1. **Load Performance**

- Page load time validation
- Network resource optimization
- Bundle size monitoring

#### 2. **Core Web Vitals**

- LCP measurement and validation
- FID performance testing
- CLS calculation and verification

#### 3. **Resource Optimization**

- Image lazy loading validation
- Font optimization checking
- CSS/JS bundle size limits

#### 4. **Accessibility Performance**

- Heading hierarchy validation
- Focus management testing
- Touch target sizing

#### 5. **Mobile Performance**

- Viewport optimization
- Touch-friendly elements
- Mobile-specific optimizations

### Running Performance Tests

```bash
# Run all performance tests
yarn test:performance

# Run specific test category
yarn test:performance --grep "Core Web Vitals"

# Run with specific browser
yarn test:performance --project=chromium

# Run with performance tracing
yarn test:performance --trace on
```

## 🔄 GitHub Actions Workflows

### Performance & SEO Monitoring

The `.github/workflows/performance-seo.yml` workflow provides:

#### **Automated Triggers**

- Push to main/develop branches
- Pull request creation
- Manual workflow dispatch

#### **Job Categories**

##### 1. **Lighthouse Performance Audit**

```yaml
lighthouse:
  name: 🔍 Lighthouse Performance Audit
  runs-on: ubuntu-latest
  steps:
    - name: 🏗️ Build application
      run: yarn build
    - name: 🧪 Run Lighthouse CI
      run: npx lhci autorun
```

##### 2. **SEO & Accessibility Tests**

```yaml
seo-tests:
  name: 🔍 SEO & Accessibility Tests
  steps:
    - name: 🧪 Install Playwright
      run: npx playwright install --with-deps
    - name: 🧪 Run SEO tests
      run: yarn test:seo
```

##### 3. **Sitemap & RSS Validation**

```yaml
sitemap-validation:
  name: 🗺️ Sitemap & RSS Validation
  steps:
    - name: 🔍 Validate sitemap
      run: |
        curl -f http://localhost:3000/sitemap.xml
        curl -f http://localhost:3000/rss.xml
        curl -f http://localhost:3000/robots.txt
```

##### 4. **Bundle Analysis**

```yaml
bundle-analysis:
  name: 📦 Bundle Analysis
  if: github.event_name == 'pull_request'
  steps:
    - name: 🏗️ Build with bundle analysis
      run: yarn analyze
```

##### 5. **Performance Dashboard**

```yaml
performance-dashboard:
  name: 📊 Performance Dashboard
  needs: [lighthouse, seo-tests, sitemap-validation]
  steps:
    - name: 📊 Generate performance report
      run: |
        echo "## 🚀 Performance & SEO Report" >> $GITHUB_STEP_SUMMARY
        # Generate comprehensive report
```

##### 6. **Security & Code Quality**

```yaml
security-scan:
  name: 🔒 Security Scan
  steps:
    - name: 🔒 Run security audit
      run: yarn security-audit
    - name: 🔒 Run Snyk security scan
      uses: snyk/actions/node@master

code-quality:
  name: 🧹 Code Quality
  steps:
    - name: 🔍 Type checking
      run: npx tsc --noEmit
    - name: 🧹 Linting
      run: yarn lint
```

## 📦 Bundle Analysis

### Configuration

Bundle analysis is enabled with the `ANALYZE=true` environment variable:

```bash
# Run bundle analysis
yarn analyze

# Build with analysis
ANALYZE=true yarn build
```

### Analysis Output

The analysis generates detailed reports in `.next/analyze/`:

- **Bundle size breakdown**
- **Dependency tree visualization**
- **Chunk splitting analysis**
- **Tree shaking effectiveness**

### Bundle Size Targets

- **JavaScript**: < 500KB total
- **CSS**: < 100KB total
- **Images**: Optimized formats (WebP, AVIF)
- **Fonts**: Display swap optimization

## 📊 Core Web Vitals Monitoring

### Real-Time Monitoring

The `Vitals` component tracks performance metrics:

```typescript
export default function Vitals() {
  useEffect(() => {
    import("web-vitals").then(({ onCLS, onLCP, onINP, onTTFB }) => {
      const send = (metric: Metric) => {
        // Send metrics to analytics endpoint
        navigator.sendBeacon?.("/vitals", blob) || fetch("/vitals", { method: "POST", body });
      };

      onCLS(send); // Cumulative Layout Shift
      onLCP(send); // Largest Contentful Paint
      onINP(send); // Interaction to Next Paint
      onTTFB(send); // Time to First Byte
    });
  }, []);

  return null;
}
```

### Metric Collection

- **Path tracking**: Associates metrics with specific pages
- **Timestamp recording**: Precise timing information
- **Non-blocking transmission**: Uses Beacon API when available
- **Fallback handling**: Graceful degradation for older browsers

## 🎯 Performance Budgets

### Page Load Budgets

- **Homepage**: < 3 seconds
- **Blog posts**: < 2 seconds
- **Dynamic pages**: < 1.5 seconds

### Resource Budgets

- **JavaScript**: < 500KB
- **CSS**: < 100KB
- **Images**: < 2MB total
- **Fonts**: < 200KB

### Core Web Vitals Budgets

- **LCP**: < 2.5s (Good), < 4s (Needs Improvement)
- **FID**: < 100ms (Good), < 300ms (Needs Improvement)
- **CLS**: < 0.1 (Good), < 0.25 (Needs Improvement)
- **INP**: < 200ms (Good), < 500ms (Needs Improvement)
- **TTFB**: < 800ms (Good), < 1800ms (Needs Improvement)

## 🚨 Troubleshooting

### Common Issues

#### 1. **Lighthouse CI Failures**

**Cause**: Performance scores below thresholds
**Solution**:

- Review bundle sizes
- Optimize images and fonts
- Implement code splitting
- Add lazy loading

#### 2. **Core Web Vitals Failures**

**Cause**: Metrics above acceptable thresholds
**Solution**:

- Optimize LCP with image optimization
- Reduce CLS with proper sizing
- Improve INP with event handling
- Optimize TTFB with server performance

#### 3. **Bundle Size Issues**

**Cause**: JavaScript/CSS bundles too large
**Solution**:

- Implement code splitting
- Use dynamic imports
- Optimize dependencies
- Enable tree shaking

#### 4. **Test Failures**

**Cause**: Performance tests timing out
**Solution**:

- Check network conditions
- Verify test environment
- Review performance budgets
- Debug specific metrics

### Debug Commands

```bash
# Run Lighthouse locally
yarn lighthouse

# Debug performance tests
yarn test:performance --debug

# Check bundle sizes
yarn analyze

# Validate configuration
yarn type-check

# Run security audit
yarn security-audit
```

### Performance Monitoring Tools

#### **Browser DevTools**

- Performance tab for detailed analysis
- Network tab for resource timing
- Lighthouse tab for local audits

#### **Lighthouse CI**

- Automated performance testing
- Historical performance tracking
- Regression detection

#### **Playwright**

- Automated performance testing
- Cross-browser validation
- CI/CD integration

## 🔮 Future Enhancements

### Planned Features

- **Performance Dashboard**: Visual performance metrics
- **Regression Detection**: Automated performance monitoring
- **A/B Testing**: Performance optimization testing
- **Real-time Alerts**: Performance degradation notifications

### Integration Opportunities

- **Google Analytics**: Performance correlation
- **Search Console**: Core Web Vitals data
- **PageSpeed Insights**: Detailed optimization
- **Web Vitals Dashboard**: Visual performance tracking

## 📚 Additional Resources

- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Core Web Vitals](https://web.dev/vitals/)
- [Playwright Performance Testing](https://playwright.dev/docs/performance)
- [Next.js Performance](https://nextjs.org/docs/advanced-features/measuring-performance)
- [Web Vitals Library](https://github.com/GoogleChrome/web-vitals)

---

**Need Help?** Check the troubleshooting section above or review the performance metrics for specific guidance.
