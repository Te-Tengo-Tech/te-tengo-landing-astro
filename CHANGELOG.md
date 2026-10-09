# Changelog

Format based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/); the project uses [semantic versioning](https://semver.org/).

## [Unreleased]

### Added

- Release flow in `deploy.yml` ("build once, deploy many", promoted from the release branch), with only two stages, staging and produccion: a push to `release/*` or `hotfix/*` builds once, deploys the same `landing-dist` artifact to the alias `staging` (environment `staging`, switch `ENABLE_STAGING`, smoke check), then to the Pages production branch `main` = `https://tetengo.reqsai.tech` (environment `produccion`, switch `ENABLE_LANDING_PRODUCCION`, smoke check, the release commit's hash and message attached), then opens the pull request `release/x.y.z → main` with `GITHUB_TOKEN`. Every deploy job runs the new composite action `.github/actions/pages-deploy` (fingerprint check, Wrangler deploy) and deploys nothing when a newer push superseded its commit; no deploying job is cancelled.
- `etiquetar.yml`: on a push to `main`, the tag `vX.Y.Z` from `package.json` with a GitHub Release whose notes are the CHANGELOG section (skipped if the tag exists), and the back-merge pull request `main → develop`.
- Downloads: **Mac (beta)** option for Te Tengo Captura (`te-tengo-captura.dmg` on `DESCARGAS_BASE_URL`), with «Próximamente» while downloads are off, platform detection for macOS and Apple's steps to open an app from an unidentified developer (source in `src/content/es.ts`). The section shows two columns from 48rem.

### Changed

- `deploy.yml` only runs on pushes to `release/*` and `hotfix/*`. Nothing deploys on a push to `main` or `develop`, and pull requests only run CI (`ci.yml`).
- `ci.yml` also runs on pushes to `release/*` and `hotfix/*`, so the release pull request opened by `GITHUB_TOKEN` has its checks.

### Removed

- The dev stage and the pull request previews: no `develop` alias, no `pr-preview` job, no `pull_request` or `workflow_dispatch` trigger in `deploy.yml`. The `dev` environment and the `ENABLE_DEV` variable were deleted; the `preview` environment, the `release-candidate` alias and `ENABLE_LANDING_PREVIEW` are no longer used.
- `publicar.yml` and the `repository_dispatch` flow from the app repositories: the APK, the Windows installer, the Mac `.dmg` and the PWA are published by the release pipelines of `te-tengo-mobile-flutter` and `te-tengo-desktop-pywebview`.

## [0.2.0] - 2026-10-08

### Changed

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
