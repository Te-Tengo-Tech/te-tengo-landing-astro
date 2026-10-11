// Generates public/og.png (1200 × 630) in the brand kit from the built site: the logotype is taken
// from dist/index.html, the photo is the hero's hug photo (Pexels, credited in the footer) and the
// copy is the hero's. Needs `pnpm build` first and Google Chrome (or CHROME_PATH).
// Usage: pnpm build && pnpm og
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const html = readFileSync(join(root, "dist/index.html"), "utf8");

const logo = html.match(/<svg viewBox="0 0 470 122"[\s\S]*?<\/svg>/)?.[0];
if (!logo) throw new Error("Logo SVG not found in dist/index.html; run pnpm build first.");

const file = (path) => pathToFileURL(join(root, path)).href;
const page = readFileSync(join(root, "scripts/og/template.html"), "utf8")
  .replace("FONT_400", file("public/fonts/poppins-400.woff2"))
  .replace("FONT_700", file("public/fonts/poppins-700.woff2"))
  .replace("PHOTO_URL", file("src/assets/photos/bienvenida.jpg"))
  .replace("LOGO_SVG", logo.replace(/class="[^"]*"/, 'class="logo"'));

const dir = mkdtempSync(join(tmpdir(), "tt-og-"));
const htmlFile = join(dir, "og.html");
writeFileSync(htmlFile, page);

const chrome =
  process.env.CHROME_PATH ??
  [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].find(existsSync);
if (!chrome) throw new Error("Chrome not found. Set CHROME_PATH.");

const out = join(root, "public/og.png");
execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--allow-file-access-from-files",
    "--virtual-time-budget=2000",
    `--screenshot=${out}`,
    pathToFileURL(htmlFile).href,
  ],
  { stdio: "ignore" },
);
console.log(`og: wrote ${out}`);
