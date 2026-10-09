# te-tengo-landing-astro

[![CI](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/ci.yml)
[![Deploy](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/deploy.yml/badge.svg?branch=develop)](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/deploy.yml)

The public landing page of **Te Tengo**, a system that detects falls of older adults at home and alerts the family. It also hosts the downloads: the Android APK, the Windows installer and the Mac beta (from Cloudflare R2) and the iPhone/web app (the Flutter PWA, served from its own Cloudflare Pages project at `https://app.tetengo.reqsai.tech`).

All copy is in **Spanish (Peru)** and every product claim comes from a project document (see [AGENTS.md](AGENTS.md)). There are no testimonials, logos or user counts: privacy and the published validation results take that place.

## Stack

| Part            | Choice                                                                                                                                              |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework       | [Astro](https://astro.build) 7, static output, **zero client JS by default**                                                                        |
| Styling         | Tailwind CSS v4 (CSS-first, tokens in `src/styles/global.css` under `@theme`)                                                                       |
| Language        | TypeScript (strictest), `.astro` components                                                                                                         |
| Fonts           | Atkinson Hyperlegible Next and Mono, self-hosted WOFF2 (Latin subset, OFL)                                                                          |
| Quality         | ESLint (typescript-eslint, eslint-plugin-astro + jsx-a11y), Prettier (prettier-plugin-astro), `astro check`, Lighthouse CI (≥ 95 in every category) |
| SEO             | Canonical URLs, Open Graph/Twitter cards with a brand OG image, `robots.txt`, `@astrojs/sitemap`, JSON-LD `SoftwareApplication`                     |
| Hosting         | Cloudflare Pages (`te-tengo-landing` for the site, `te-tengo-app` for the PWA) and Cloudflare R2 (binaries), deployed by GitHub Actions             |
| Package manager | pnpm                                                                                                                                                |

Client JavaScript is limited to two small islands: the mobile navigation and the platform detection of the downloads section. Both are progressive enhancements; the page works without them.

## Page

| Section              | Anchor           | Content                                                                                                                                                                |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                 | —                | «Cuida a tu familiar aunque no estés en casa.», **Descargar** and **Ver cómo funciona**, the stylised room with the pose skeleton                                      |
| Problem              | —                | Three sourced figures from the project charter (INEI, Fleming & Brayne)                                                                                                |
| How it works         | `#como-funciona` | Webcam at home → the PC detects the fall (video stays home) → alert on the phone; live view with consent and «Solo postura»                                            |
| Features             | `#funciones`     | The alert and its timeline (unstable movement, fall, confirmation on the floor, recovery, escalation), 6 s clip, live view access log, family and notice order, pauses |
| Privacy and trust    | `#privacidad`    | Video processed on the PC (ADR 0007), consent, Ley N.° 29733, access log, validation results with a link to `/validacion/`                                             |
| For whom             | `#para-quien`    | Family member, older adult, project team                                                                                                                               |
| Downloads            | `#descargas`     | Android APK, iPhone PWA (3 Safari steps, iOS 16.4+), Windows agent, Mac agent (beta, Apple's steps to open an unsigned app); the visitor's platform is highlighted     |
| FAQ                  | `#preguntas`     | Recording, who can see, no internet, hardware, bathroom, reliability, medical use                                                                                      |
| Final call to action | —                | «Cerca de los tuyos, aunque estés lejos.» with the symbol assembling itself                                                                                            |

Other routes: `/validacion/` (methodology and results), `/404`. `/descargas`, `/descargar` and `/download` redirect to `/#descargas`; `/app` and `/app/*` (where the PWA used to live) redirect with a `301` to `https://app.tetengo.reqsai.tech/`.

## Getting started

```bash
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # static site in dist/ (also writes the CSP hashes into dist/_headers)
pnpm preview        # serve dist/
pnpm lint           # ESLint + Prettier check
pnpm format         # Prettier write
pnpm check          # astro check (types)
pnpm lhci           # Lighthouse CI on dist/ (needs Chrome)
pnpm og             # regenerate public/og.png from the built page (needs Chrome)
```

To test the Cloudflare `_headers` and `_redirects` locally: `npx wrangler pages dev dist`.

### Configuration

| Variable (build time)       | Purpose                                                                                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`                  | Canonical origin. Default `https://tetengo.reqsai.tech`                                                                                               |
| `PUBLIC_DESCARGAS_BASE_URL` | Public URL of the R2 bucket with `te-tengo.apk`, `te-tengo-captura-setup.exe` and `te-tengo-captura.dmg`. Empty → those downloads show «Próximamente» |
| `PUBLIC_APP_URL`            | URL of the Flutter PWA that the iPhone and web links open. Default `https://app.tetengo.reqsai.tech/`                                                 |

`DESCARGAS_DISPONIBLES` in [`src/config/site.ts`](src/config/site.ts) switches every download to «Próximamente» at once.

## Deploy

Gitflow with "build once, deploy many": environments are promoted from the **release branch**, and `main` and the tag come last, after production.

- **CI** ([`ci.yml`](.github/workflows/ci.yml)): install, lint, `astro check`, build and Lighthouse CI on every pull request and every push to `main`, `develop`, `release/*` and `hotfix/*`.
- **Deploy** ([`deploy.yml`](.github/workflows/deploy.yml)): builds once and promotes that same artifact with `wrangler pages deploy` through the Pages project `te-tengo-landing` (custom domain `tetengo.reqsai.tech`). A push to `develop` deploys the `develop` alias (environment `dev`). A push to `release/*` or `hotfix/*` deploys the `staging` alias (environment `staging`, smoke check), then the same artifact to production (environment `produccion`, smoke check of `https://tetengo.reqsai.tech`), then opens the pull request `release/x.y.z → main`. Pull requests get a preview alias without an environment. Nothing deploys on a push to `main`. Without the Cloudflare secrets it builds, explains what is missing and succeeds.
- **Etiquetar** ([`etiquetar.yml`](.github/workflows/etiquetar.yml)): on a push to `main` (the merged release pull request) it creates the tag `vX.Y.Z` from `package.json` with a GitHub Release (the CHANGELOG section as notes) and opens the back-merge pull request `main → develop`.

The apps publish themselves: the APK, the Windows installer and the Mac `.dmg` go to the R2 bucket, and the PWA to the Pages project `te-tengo-app` (`app.tetengo.reqsai.tech`), from the release pipelines of `te-tengo-mobile-flutter` and `te-tengo-desktop-pywebview`. This repository only links to them.

| Pages project      | Custom domain             | DNS record at the registrar (Namify)             |
| ------------------ | ------------------------- | ------------------------------------------------ |
| `te-tengo-landing` | `tetengo.reqsai.tech`     | `CNAME` `tetengo` → `te-tengo-landing.pages.dev` |
| `te-tengo-app`     | `app.tetengo.reqsai.tech` | `CNAME` `app.tetengo` → `te-tengo-app.pages.dev` |

The older `te-tengo` Pages project (Git-connected to the thesis repository, serving the prototypes) is not touched by these workflows.

### Release flow

```text
push to develop          ─ Build ─▶ dev [approval] ─▶ https://develop.te-tengo-landing.pages.dev
push to release/x.y.z    ─ Build ─▶ staging [approval] ─▶ https://staging.te-tengo-landing.pages.dev (smoke check)
  (or hotfix/x.y.z)              └─▶ produccion [approval] ─▶ https://tetengo.reqsai.tech (smoke check)
                                       └─▶ pull request release/x.y.z → main (merged by a person)
push to main             ─ etiquetar.yml ─▶ tag vX.Y.Z + GitHub Release ─▶ pull request main → develop
pull request             ─ Build ─▶ branch alias, no environment, no approval
```

| Environment  | Required reviewers    | Branches                        | Used by                                    |
| ------------ | --------------------- | ------------------------------- | ------------------------------------------ |
| `dev`        | jhosepmyr, elmer-riva | `develop`                       | `deploy.yml` → `dev` (alias `develop`)     |
| `staging`    | jhosepmyr, elmer-riva | `release/*`, `hotfix/*`, `main` | `deploy.yml` → `staging` (alias `staging`) |
| `produccion` | jhosepmyr, elmer-riva | `release/*`, `hotfix/*`, `main` | `deploy.yml` → `produccion`                |

Each stage also has an on/off switch, an organization Actions variable that must be exactly `true` (unset = off, the job shows as skipped and the run summary says why):

| Variable                    | Stage                                                             |
| --------------------------- | ----------------------------------------------------------------- |
| `ENABLE_DEV`                | `dev` (alias `develop`) and the pull request previews             |
| `ENABLE_STAGING`            | `staging` (alias `staging`); off: production only needs the build |
| `ENABLE_LANDING_PRODUCCION` | `produccion` (`https://tetengo.reqsai.tech`)                      |

Details, the job graph per event and the one-time Cloudflare and GitHub setup: [docs/DEPLOY.md](docs/DEPLOY.md). Open questions (domain, contact e-mail, legal pages, the unsigned Mac build): [docs/BLOCKERS.md](docs/BLOCKERS.md).

## Contributing

Git flow and commit rules: [CONTRIBUTING.md](CONTRIBUTING.md). Rules for coding agents: [AGENTS.md](AGENTS.md). Security: [SECURITY.md](SECURITY.md).

---

Thesis project of the Universidad Peruana de Ciencias Aplicadas (UPC). Authors: Jhosepmyr Gutierrez Soto and Elmer Riva Rodriguez.
