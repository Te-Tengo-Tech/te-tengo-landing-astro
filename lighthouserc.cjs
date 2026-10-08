// Lighthouse CI on the built site (pnpm build && pnpm lhci). Budgets: every category ≥ 0.95.
module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["http://localhost/", "http://localhost/validacion/"],
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--no-sandbox --headless=new",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 0.95 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./.lighthouseci/reports",
    },
  },
};
