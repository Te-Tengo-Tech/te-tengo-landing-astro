/**
 * Site-wide configuration. Copy lives in `src/content/`; this file only holds switches and URLs.
 */

/**
 * Public base URL of the Cloudflare R2 bucket that serves the binaries (`te-tengo.apk`,
 * `te-tengo-captura-setup.exe`), without a trailing slash: an `r2.dev` URL or a custom domain.
 * Set it at build time with `PUBLIC_DESCARGAS_BASE_URL` (a repository variable in CI, docs/DEPLOY.md).
 * While it is empty, the Android and Windows downloads show «Próximamente».
 */
export const DESCARGAS_BASE_URL: string = (import.meta.env.PUBLIC_DESCARGAS_BASE_URL ?? "")
  .trim()
  .replace(/\/+$/, "");

/**
 * Master switch for the downloads section. `false` shows every option as «Próximamente»
 * (for example before the first build has been published to R2).
 */
export const DESCARGAS_DISPONIBLES = true;

/**
 * The Flutter PWA, deployed by `publicar.yml` to its own Cloudflare Pages project (`te-tengo-app`)
 * and served at the root of its own origin. Override it at build time with `PUBLIC_APP_URL`
 * (for example a `*.te-tengo-app.pages.dev` preview). Old `/app/*` links of this site redirect there
 * (`public/_redirects`).
 */
export const APP_URL: string =
  (import.meta.env.PUBLIC_APP_URL ?? "").trim() || "https://app.tetengo.reqsai.tech/";

export const DESCARGAS = {
  android: DESCARGAS_BASE_URL ? `${DESCARGAS_BASE_URL}/te-tengo.apk` : null,
  windows: DESCARGAS_BASE_URL ? `${DESCARGAS_BASE_URL}/te-tengo-captura-setup.exe` : null,
  iphone: APP_URL,
} as const;

export const SITE = {
  name: "Te Tengo",
  locale: "es-PE",
  lang: "es",
  themeColor: "#4A2A85",
} as const;
