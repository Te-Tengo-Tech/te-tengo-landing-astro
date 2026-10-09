// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Production URL. Override with SITE_URL until the custom domain is decided (docs/BLOCKERS.md).
const site = process.env.SITE_URL || "https://tetengo.reqsai.tech";

export default defineConfig({
  site,
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  compressHTML: true,
});
