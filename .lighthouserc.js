module.exports = {
  ci: {
    collect: {
      url: [
        'https://meoumi.dev',
        'https://meoumi.dev/logs',
        'https://meoumi.dev/loops',
        'https://meoumi.dev/ping',
        'https://meoumi.dev/trace',
      ],
      startServerCommand: 'yarn dev',
      startServerReadyPattern: 'ready - started server on',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
        preset: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'interaction-to-next-paint': ['warn', { maxNumericValue: 200 }],
        'time-to-first-byte': ['warn', { maxNumericValue: 800 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
