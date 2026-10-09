# Changelog

Format based on [Keep a Changelog 1.1.0](https://keepachangelog.com/en/1.1.0/); the project uses [semantic versioning](https://semver.org/).

## [Unreleased]

### Changed

- The Flutter PWA moved from `/app/` of the landing to its own Cloudflare Pages project, `te-tengo-app`, on `https://app.tetengo.reqsai.tech` (root path, hash routing). `publicar.yml` builds it with base href `/` and deploys it in a separate `app` job with `deploy/app/_headers` and `robots.txt`; the landing links to it through `APP_URL` (`PUBLIC_APP_URL`), and `/app/*` redirects there with a `301`. The PWA is no longer packed into R2 and `deploy.yml` no longer ships it.

### Added

- Landing page in Astro 7 + Tailwind CSS v4, static, zero client JS by default: hero, problem (sourced figures), how it works, features, privacy and trust (with the validation results), for whom, downloads, FAQ, final call to action and footer. All copy in Spanish (Peru) in `src/content/es.ts`, each section tied to its source document.
- `/validacion/`: methodology and results of the classifier validation on URFD and CAUCAFall (81,2 % sensitivity, 81,1 % specificity, leaving one group out), with its limitations and references.
- Brand: self-hosted Atkinson Hyperlegible Next/Mono (Latin subset, OFL), «La T que sostiene» logotype and symbol with the splash animation, the prototype's stylised room and pose skeleton, favicon, app icons, web manifest and a generated Open Graph image (`pnpm og`).
- Downloads: Android APK and Windows installer from Cloudflare R2 (`PUBLIC_DESCARGAS_BASE_URL`), iPhone PWA at `/app/`, platform detection island, «Próximamente» state (`DESCARGAS_DISPONIBLES`).
- SEO and security: canonical URLs, Open Graph/Twitter cards, JSON-LD `SoftwareApplication`, sitemap, `robots.txt`, `_headers` with a hashed CSP (`scripts/csp.mjs`) and long cache for hashed assets, `_redirects` for `/descargas`, `/descargar` and `/download`.
- CI (lint, `astro check`, build, Lighthouse CI ≥ 95), Cloudflare Pages deploy (production on `main`, previews on `develop` and PRs) and the manual `publicar.yml` (APK via the mobile repository's reusable workflow, Windows installer, PWA, upload to R2, production deploy).
- Repository governance: README, AGENTS.md, CLAUDE.md, CONTRIBUTING.md, SECURITY.md, CODEOWNERS, pull request and issue templates, Dependabot, `docs/DEPLOY.md`, `docs/BLOCKERS.md`.
