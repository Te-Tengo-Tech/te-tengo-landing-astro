// Prints the Lighthouse CI scores as a Markdown table (used for the CI run summary and the PR).
import { existsSync, readFileSync, readdirSync } from "node:fs";

const dir = ".lighthouseci/reports";
if (!existsSync(dir)) process.exit(0);
const rows = readdirSync(dir)
  .filter((f) => f.endsWith(".report.json"))
  .map((f) => JSON.parse(readFileSync(`${dir}/${f}`, "utf8")))
  .map((r) => {
    const s = (k) => Math.round(r.categories[k].score * 100);
    const path = new URL(r.finalDisplayedUrl).pathname;
    return `| ${path} | ${r.configSettings.formFactor} | ${s("performance")} | ${s("accessibility")} | ${s("best-practices")} | ${s("seo")} |`;
  })
  .sort();
console.log(
  [
    "| Page | Device | Performance | Accessibility | Best practices | SEO |",
    "|---|---|---|---|---|---|",
    ...new Set(rows),
  ].join("\n"),
);
