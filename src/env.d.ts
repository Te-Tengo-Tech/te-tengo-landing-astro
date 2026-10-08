interface ImportMetaEnv {
  /** Public base URL of the R2 bucket that serves the binaries, without a trailing slash. */
  readonly PUBLIC_DESCARGAS_BASE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
