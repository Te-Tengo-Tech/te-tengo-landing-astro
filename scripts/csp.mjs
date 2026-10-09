// Post-build step: writes dist/_headers with the SHA-256 hashes of the inline scripts in dist/**/*.html.
// Run by `pnpm build`. Keeps the Content-Security-Policy strict without 'unsafe-inline' for scripts.
import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const dist = new URL("../dist/", import.meta.url).pathname;

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await htmlFiles(path)));
    } else if (entry.name.endsWith(".html")) out.push(path);
  }
  return out;
}

const hashes = new Set();
const scriptRe = /<script(?![^>]*\bsrc=)(?![^>]*type="application\/ld\+json")[^>]*>([\s\S]*?)<\/script>/g;
for (const file of await htmlFiles(dist)) {
  const html = await readFile(file, "utf8");
  for (const [, body] of html.matchAll(scriptRe)) {
    if (body.trim()) hashes.add(`'sha256-${createHash("sha256").update(body).digest("base64")}'`);
  }
}

const template = await readFile(join(dist, "_headers"), "utf8");
await writeFile(join(dist, "_headers"), template.replaceAll("SCRIPT_HASHES", [...hashes].join(" ")));
console.log(`csp: ${hashes.size} inline script hash(es) written to dist/_headers`);
