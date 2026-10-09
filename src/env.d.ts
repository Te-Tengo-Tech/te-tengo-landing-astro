interface ImportMetaEnv {
  /** Public base URL of the R2 bucket that serves the binaries, without a trailing slash. */
  readonly PUBLIC_DESCARGAS_BASE_URL?: string;
  /** URL of the Flutter PWA (default https://app.tetengo.reqsai.tech/). */
  readonly PUBLIC_APP_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
