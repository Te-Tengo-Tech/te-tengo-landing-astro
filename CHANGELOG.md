# Changelog

Format based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/); the project uses [semantic versioning](https://semver.org/).

## [Unreleased]

### Added

- Landing promotion in `deploy.yml` ("build once, deploy many"): a push to `develop` deploys the build to the Pages alias `develop` in the `preview` environment; a push to `main` deploys it to the alias `release-candidate` (`deploy-preview`, `preview` environment) and then, with `needs: deploy-preview`, the same `landing-dist` artifact to production (`deploy-production`, `produccion` environment). Both stages wait for their environment's required reviewers, verify the artifact's fingerprint against the build job and end with `scripts/smoke-check.sh` (HTTP 200, canonical URL, byte-identical `index.html`). Pull request previews keep no environment, never deploy pull requests from forks, and use `pr-<number>` when the head branch is `develop` or `main`.
- On/off switches for every deploy channel, as organization Actions variables that must be `true`: `ENABLE_LANDING_PREVIEW`, `ENABLE_LANDING_PRODUCCION`, `ENABLE_PWA`, `ENABLE_APK` and `ENABLE_WINDOWS_INSTALLER`. A switched-off job shows as skipped and asks for no approval.

### Changed

- `publicar.yml` uploads the APK and the Windows installer to R2 in two jobs, `descargas-apk` and `descargas-windows`, so each has its own switch; `revisar` lists which destinations are switched off.

- Publishing waits for an approval on the `produccion` environment (required reviewers jhosepmyr and elmer-riva, `main` only) instead of depending on who starts a manual run. `deploy.yml` builds once, deploys previews without approval and deploys production, on push to `main`, after approval. `publicar.yml` also starts on `repository_dispatch` from the app repositories when a release reaches their `main`: `publicar-movil` builds the APK and the PWA, `publicar-escritorio` the Windows installer, at the `client_payload.ref` commit, with `client_payload.version` in the run name. Builds and the new `revisar` check run without an environment; the R2 upload, the PWA deployment and the landing deployment (now only on manual runs of every part) are separate `produccion` jobs that wait together, so one approval covers the run. The manual run gains `partes` (`todo`, `movil`, `escritorio`), its refs default to `main`, and the artifacts of publishing runs are kept 30 days.

## [0.1.0] - 2026-10-08

### Changed

- The Flutter PWA moved from `/app/` of the landing to its own Cloudflare Pages project, `te-tengo-app`, on `https://app.tetengo.reqsai.tech` (root path, hash routing). `publicar.yml` builds it with base href `/` and deploys it in a separate `app` job with `deploy/app/_headers` and `robots.txt`; the landing links to it through `APP_URL` (`PUBLIC_APP_URL`), and `/app/*` redirects there with a `301`. The PWA is no longer packed into R2 and `deploy.yml` no longer ships it.

### Added

- Landing page in Astro 7 + Tailwind CSS v4, static, zero client JS by default: hero, problem (sourced figures), how it works, features, privacy and trust (with the validation results), for whom, downloads, FAQ, final call to action and footer. All copy in Spanish (Peru) in `src/content/es.ts`, each section tied to its source document.
- `/validacion/`: methodology and results of the classifier validation on URFD and CAUCAFall (81,2 % sensitivity, 81,1 % specificity, leaving one group out), with its limitations and references.
- Brand: self-hosted Atkinson Hyperlegible Next/Mono (Latin subset, OFL), «La T que sostiene» logotype and symbol with the splash animation, the prototype's stylised room and pose skeleton, favicon, app icons, web manifest and a generated Open Graph image (`pnpm og`).
- Downloads: Android APK and Windows installer from Cloudflare R2 (`PUBLIC_DESCARGAS_BASE_URL`), iPhone PWA on `https://app.tetengo.reqsai.tech`, platform detection island, «Próximamente» state (`DESCARGAS_DISPONIBLES`).
- SEO and security: canonical URLs, Open Graph/Twitter cards, JSON-LD `SoftwareApplication`, sitemap, `robots.txt`, `_headers` with a hashed CSP (`scripts/csp.mjs`) and long cache for hashed assets, `_redirects` for `/descargas`, `/descargar` and `/download`.
- CI (lint, `astro check`, build, Lighthouse CI ≥ 95), Cloudflare Pages deploy (production on `main`, previews on pull requests) and the manual `publicar.yml` (APK via the mobile repository's reusable workflow, Windows installer, PWA, upload to R2, production deploy).
- Repository governance: README, AGENTS.md, CLAUDE.md, CONTRIBUTING.md, SECURITY.md, CODEOWNERS, pull request and issue templates, Dependabot, `docs/DEPLOY.md`, `docs/BLOCKERS.md`.
