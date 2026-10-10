# Changelog

Format based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/); the project uses [semantic versioning](https://semver.org/).

## [Unreleased]

## [0.4.2] - 2026-10-10

### Added

- A weekly `branch-cleanup.yml` (Mondays 04:00 UTC, or by hand with a dry run) deletes branches merged 7+ days ago and unmerged branches with no commits for 30+ days; it never touches `main`, `develop`, `release/*`, `hotfix/*`, branches with an open pull request or pull requests labelled `do-not-delete`, and `BRANCH_CLEANUP_ENABLED=false` turns it off.

### Fixed

- The back-merge job of `produccion.yml` runs whenever the release job succeeded, even if a switched-off job earlier in its chain was skipped (GitHub skips a job whose implicit `success()` sees a skipped ancestor; te-tengo-mobile-flutter 0.3.2 lost its back-merge that way).

## [0.4.1] - 2026-10-10

### Changed

- CI tests each commit once: `ci.yml` runs on pull requests, on pushes to `develop` and when `release.yml` calls it (`workflow_call`) on the release commit; it no longer runs on pushes to `main`, `release/*` or `hotfix/*`. Pull requests into `main` skip the test jobs (their head is the tested candidate). The candidate packs the `dist/` that CI built and Lighthouse checked, instead of building a second time.
- The release pull request (`release: x.y.z`) and the back-merge pull request are opened by the GitHub App te-tengo-release-bot instead of `GITHUB_TOKEN`, so their `pull_request` checks run. The back-merge turns on auto-merge with a merge commit and, after a hotfix, also opens `main → release/*` for newer open release branches (`.github/scripts/back-merge.sh`).
- The candidate record has a `staging` line (`pending`, `passed`, or `skipped` when `ENABLE_STAGING` is off); `produccion.yml` only deploys a candidate whose staging passed or was switched off (`.github/scripts/find-candidate.sh`).
- The Cloudflare token is read only by the jobs of the `staging` and `produccion` environments; a missing one fails those jobs with an error instead of skipping them with a notice.
- The production and rollback smoke checks also require `version.json` to name the deployed candidate's version and build.

### Added

- `ci-ok`: the last job of `ci.yml`, the single required check of the rulesets.
- `release-gate.yml`: required check `release-gate` of pull requests into `main`; only a `release/x.y.z` or `hotfix/x.y.z` pull request whose merge puts into `main` the tree of a candidate that passed staging can be merged.
- `pr-title.yml`: required check `pr-title`, the pull request title must be a Conventional Commit.
- SBOM (SPDX) of every candidate as a release asset, with build provenance and SBOM attestations of the bundle.
- Dependabot also updates the actions pinned in `.github/actions/*`.
- docs/DEPLOY.md: release gate, required checks, release bot and a rollback rehearsal procedure.

### Security

- Least-privilege `permissions:` per job in every workflow (none at workflow level).

## [0.4.0] - 2026-10-09

### Changed

- Production deploys from `main` (the merged release pull request), no longer from the release branch, and the tag `vX.Y.Z` is created only after production succeeded.
- `.github/actions/pages-deploy` downloads the bundle from a GitHub Release and checks its SHA-256 (against the candidate record and GitHub's upload digest) and its `dist/` fingerprint before deploying, instead of using an Actions artifact that expires.
- The release branch name must equal `version` in `package.json` and `vX.Y.Z` must not exist yet; the candidate job fails otherwise (it only warned before). Hotfix branches are named `hotfix/x.y.z`.

### Added

- Release candidates, "model C + tag at the end" (docs/DEPLOY.md): `release.yml` runs on a push to `release/x.y.z` or `hotfix/x.y.z`, builds `dist/` once and stores it durably as the GitHub pre-release `vX.Y.Z-rc.N` (asset `te-tengo-landing-X.Y.Z.tar.gz` + `SHA256SUMS`; notes with the commit, the git tree hash, the SHA-256 of every asset, the `dist/` fingerprint and the build number), deploys that bundle to the alias `staging` (environment `staging`, switch `ENABLE_STAGING`, smoke check) and opens or updates the pull request `release: x.y.z` to `main`.
- `produccion.yml`: on a push to `main` it finds the candidate whose recorded tree equals the tree of `main` (none → the run fails), deploys its bundle without rebuilding to `https://tetengo.reqsai.tech` (environment `produccion`, switch `ENABLE_LANDING_PRODUCCION`, smoke check) and only then creates the GitHub Release `vX.Y.Z` with the same assets and opens the back-merge pull request `main → develop`.
- `rollback.yml`: manual, puts the bundle of an earlier final release back in production after the `produccion` approval.
- `dist/version.json` (version, build, commit) in every bundle: `https://tetengo.reqsai.tech/version.json` tells what is live.

### Removed

- `deploy.yml` and `etiquetar.yml`, replaced by `release.yml` and `produccion.yml`.

## [0.3.0] - 2026-10-09

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
