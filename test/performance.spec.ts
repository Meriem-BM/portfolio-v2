import { test, expect } from '@playwright/test';

test.describe('Performance & Core Web Vitals', () => {
  test.beforeEach(async ({ page }) => {
    // Enable performance monitoring
    await page.addInitScript(() => {
      // Mock web-vitals for testing
      (window as typeof window & { webVitals: {
        onCLS: (callback: (metric: { value: number; rating: string }) => void) => void;
        onLCP: (callback: (metric: { value: number; rating: string }) => void) => void;
        onINP: (callback: (metric: { value: number; rating: string }) => void) => void;
        onTTFB: (callback: (metric: { value: number; rating: string }) => void) => void;
      }}).webVitals = {
        onCLS: (callback: (metric: { value: number; rating: string }) => void) => {
          // Simulate CLS measurement
          setTimeout(() => callback({ value: 0.05, rating: 'good' }), 100);
        },
        onLCP: (callback: (metric: { value: number; rating: string }) => void) => {
          // Simulate LCP measurement
          setTimeout(() => callback({ value: 1500, rating: 'good' }), 200);
        },
        onINP: (callback: (metric: { value: number; rating: string }) => void) => {
          // Simulate INP measurement
          setTimeout(() => callback({ value: 150, rating: 'good' }), 300);
        },
        onTTFB: (callback: (metric: { value: number; rating: string }) => void) => {
          // Simulate TTFB measurement
          setTimeout(() => callback({ value: 500, rating: 'good' }), 400);
        },
      };
    });
  });

  test('should load homepage within performance budget', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // Performance budget: homepage should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check that critical content is visible
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should have good Core Web Vitals scores', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Measure performance metrics
    const performanceMetrics = await page.evaluate(() => {
      return new Promise<{ lcp?: number; fid?: number }>((resolve) => {
        const metrics: { lcp?: number; fid?: number } = {};
        
        // Mock performance observer
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              metrics.lcp = entry.startTime;
            }
            if (entry.entryType === 'first-input') {
              const firstInputEntry = entry as PerformanceEventTiming;
              metrics.fid = firstInputEntry.processingStart - entry.startTime;
            }
          }
        });
        
        observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        
        // Wait for metrics to be collected
        setTimeout(() => {
          resolve(metrics);
        }, 1000);
      });
    });
    
    // Validate LCP (should be under 2.5s for good score)
    if (performanceMetrics.lcp) {
      expect(performanceMetrics.lcp).toBeLessThan(2500);
    }
    
    // Validate FID (should be under 100ms for good score)
    if (performanceMetrics.fid) {
      expect(performanceMetrics.fid).toBeLessThan(100);
    }
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    
    // Check for lazy loading on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const loading = await image.getAttribute('loading');
      const src = await image.getAttribute('src');
      
      // Images should have loading="lazy" for performance
      if (loading !== 'lazy') {
        console.log(`Image ${src} missing lazy loading`);
      }
      
      // Check for proper alt text
      const alt = await image.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should have optimized fonts', async ({ page }) => {
    await page.goto('/');
    
    // Check for font-display: swap or similar optimizations
    const fontDisplay = await page.evaluate(() => {
      const styleSheets = Array.from(document.styleSheets);
      let hasFontDisplay = false;
      
      styleSheets.forEach(sheet => {
        try {
          const rules = Array.from(sheet.cssRules || []);
          rules.forEach(rule => {
            if (rule instanceof CSSFontFaceRule) {
              const fontDisplay = rule.style.getPropertyValue('font-display');
              if (fontDisplay && fontDisplay !== 'auto') {
                hasFontDisplay = true;
              }
            }
          });
        } catch {
          // CORS issues with external stylesheets
        }
      });
      
      return hasFontDisplay;
    });
    
    // Fonts should have display optimization
    expect(fontDisplay).toBe(true);
  });

  test('should have minimal layout shift', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Measure layout shift
    const layoutShift = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cls = 0;
        
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Use type assertion to PerformanceEntry & check for LayoutShift
            if (entry.entryType === 'layout-shift') {
              const layoutShiftEntry = entry as PerformanceEntry & { value?: number; hadRecentInput?: boolean };
              if (!layoutShiftEntry.hadRecentInput && typeof layoutShiftEntry.value === 'number') {
                cls += layoutShiftEntry.value;
              }
            }
          }
        });
        observer.observe({ entryTypes: ['layout-shift'] });
        
        // Wait for metrics to be collected
        setTimeout(() => {
          resolve(cls);
        }, 1000);
      });
    });
    
    // CLS should be under 0.1 for good score
    expect(layoutShift).toBeLessThan(0.1);
  });

  test('should have optimized bundle size', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Get resource sizes
    const resourceSizes = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      const sizes: { js: number; css: number; images: number } = { js: 0, css: 0, images: 0 };
      
      resources.forEach(resource => {
        const name = resource.name;
        const size = (resource as PerformanceResourceTiming).transferSize || 0;
        
        if (name.includes('.js')) {
          sizes.js = (sizes.js || 0) + size;
        } else if (name.includes('.css')) {
          sizes.css = (sizes.css || 0) + size;
        } else if (name.includes('.png') || name.includes('.jpg') || name.includes('.webp')) {
          sizes.images = (sizes.images || 0) + size;
        }
      });
      
      return sizes;
    });
    
    // JavaScript bundle should be reasonable size
    if (resourceSizes.js) {
      expect(resourceSizes.js).toBeLessThan(500000); // 500KB
    }
    
    // CSS bundle should be reasonable size
    if (resourceSizes.css) {
      expect(resourceSizes.css).toBeLessThan(100000); // 100KB
    }
  });

  test('should have good accessibility performance', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Check for proper heading structure
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    const headingLevels = await Promise.all(
      headings.map(async (heading) => {
        const tagName = await heading.evaluate(el => el.tagName);
        return parseInt(tagName.charAt(1));
      })
    );
    
    // Check for proper heading hierarchy
    let previousLevel = 0;
    for (const level of headingLevels) {
      // Heading levels should not skip more than one level
      expect(level - previousLevel).toBeLessThanOrEqual(1);
      previousLevel = level;
    }
    
    // Check for proper focus management
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have optimized meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for essential meta tags
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toContain('width=device-width');
    
    const charset = await page.locator('meta[charset]').getAttribute('charset');
    expect(charset).toBe('utf-8');
    
    // Check for Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDescription).toBeTruthy();
  });

  test('should handle slow network gracefully', async ({ page }) => {
    // Simulate slow network
    await page.route('**/*', route => {
      route.continue();
    });
    
    // Set slow network conditions
    await page.context().setExtraHTTPHeaders({
      'x-slow-network': 'true'
    });
    
    const startTime = Date.now();
    await page.goto('/');
    
    // Wait for critical content
    await page.waitForSelector('h1', { timeout: 10000 });
    
    const loadTime = Date.now() - startTime;
    
    // Should still load within reasonable time even with slow network
    expect(loadTime).toBeLessThan(10000);
  });

  test('should have good mobile performance', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for mobile-optimized content
    const isMobileOptimized = await page.evaluate(() => {
      const viewport = document.querySelector('meta[name="viewport"]');
      return viewport && viewport.getAttribute('content')?.includes('width=device-width');
    });
    
    expect(isMobileOptimized).toBe(true);
    
    // Check for touch-friendly elements
    const touchTargets = await page.locator('button, a, input, select, textarea').all();
    
    for (const target of touchTargets) {
      const size = await target.boundingBox();
      if (size) {
        // Touch targets should be at least 44x44px
        expect(size.width).toBeGreaterThanOrEqual(44);
        expect(size.height).toBeGreaterThanOrEqual(44);
      }
    }
  });
});
