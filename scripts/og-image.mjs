// Generates public/og.png (1200 × 630) in the brand colours from the built site:
// the logotype and the hero's room illustration are taken from dist/index.html, the copy is the
// prototype's welcome text. Needs `pnpm build` first and Google Chrome (or CHROME_PATH).
// Usage: pnpm build && pnpm og
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const html = readFileSync(join(root, "dist/index.html"), "utf8");

const room = html.match(/<svg viewBox="0 0 320 200"[\s\S]*?<\/svg>/)?.[0];
const logo = html.match(/<svg viewBox="15\.5 27 387\.45 75\.5"[\s\S]*?<\/svg>/)?.[0];
if (!room || !logo) throw new Error("Room or logo SVG not found in dist/index.html; run pnpm build first.");

const font = pathToFileURL(join(root, "public/fonts/atkinson-hyperlegible-next.woff2")).href;
const page = readFileSync(join(root, "scripts/og/template.html"), "utf8")
  .replace("FONT_URL", font)
  .replace(
    "LOGO_SVG",
    logo.replace("<svg", '<svg class="logo"').replace(/class="tt-mark[^"]*"/, 'class="logo"'),
  )
  .replace("ROOM_SVG", room.replace(/class="skel-sway"/g, ""));

const dir = mkdtempSync(join(tmpdir(), "tt-og-"));
const file = join(dir, "og.html");
writeFileSync(file, page);

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
    pathToFileURL(file).href,
  ],
  { stdio: "ignore" },
);
console.log(`og: wrote ${out}`);
