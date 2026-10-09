# te-tengo-landing-astro

[![CI](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/ci.yml)
[![Deploy](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/deploy.yml)

The public landing page of **Te Tengo**, a system that detects falls of older adults at home and alerts the family. It also hosts the downloads: the Android APK and the Windows installer (from Cloudflare R2) and the iPhone/web app (the Flutter PWA, served from its own Cloudflare Pages project at `https://app.tetengo.reqsai.tech`).

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
| Downloads            | `#descargas`     | Android APK, iPhone PWA (3 Safari steps, iOS 16.4+), Windows agent; the visitor's platform is highlighted                                                              |
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

| Variable (build time)       | Purpose                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`                  | Canonical origin. Default `https://tetengo.reqsai.tech`                                                                       |
| `PUBLIC_DESCARGAS_BASE_URL` | Public URL of the R2 bucket with `te-tengo.apk` and `te-tengo-captura-setup.exe`. Empty → those downloads show «Próximamente» |
| `PUBLIC_APP_URL`            | URL of the Flutter PWA that the iPhone and web links open. Default `https://app.tetengo.reqsai.tech/`                         |

`DESCARGAS_DISPONIBLES` in [`src/config/site.ts`](src/config/site.ts) switches every download to «Próximamente» at once.

## Deploy

- **CI** ([`ci.yml`](.github/workflows/ci.yml)): install, lint, `astro check`, build and Lighthouse CI on every push to `main`/`develop` and every pull request.
- **Deploy** ([`deploy.yml`](.github/workflows/deploy.yml)): builds once and promotes that same artifact with `wrangler pages deploy` through the Pages project `te-tengo-landing` (custom domain `tetengo.reqsai.tech`). A push to `develop` deploys the `develop` alias after an approval on the `preview` environment; a push to `main` deploys the `release-candidate` alias (approval on `preview`, smoke check), then the same artifact to production (approval on `produccion`, smoke check). Pull requests get a preview alias without approval. Without the Cloudflare secrets it builds, explains what is missing and succeeds.
- **Publicar** ([`publicar.yml`](.github/workflows/publicar.yml)): started by the app repositories when a release reaches their `main` (`repository_dispatch` `publicar-movil` or `publicar-escritorio`), or by hand from `main`. Builds the APK (through the mobile repository's reusable workflow) and the PWA (base href `/`), or the Windows installer, at the released commit; after an approval on `produccion` it uploads the binaries to R2 and deploys the PWA to the Pages project `te-tengo-app` (custom domain `app.tetengo.reqsai.tech`, with the headers in [`deploy/app/`](deploy/app/)).

| Pages project      | Custom domain             | DNS record at the registrar (Namify)             |
| ------------------ | ------------------------- | ------------------------------------------------ |
| `te-tengo-landing` | `tetengo.reqsai.tech`     | `CNAME` `tetengo` → `te-tengo-landing.pages.dev` |
| `te-tengo-app`     | `app.tetengo.reqsai.tech` | `CNAME` `app.tetengo` → `te-tengo-app.pages.dev` |

The older `te-tengo` Pages project (Git-connected to the thesis repository, serving the prototypes) is not touched by these workflows.

### Release → approval

Nobody configures or runs anything by hand to publish: merging a release into `main` is enough, and the run then waits for one of the required reviewers of the `produccion` environment (jhosepmyr, elmer-riva) to approve it on its page (_Review deployments_), like a pull request.

The landing is promoted in stages, always with the artifact of one build ([docs/DEPLOY.md](docs/DEPLOY.md#landing-promotion-build-once-deploy-many)):

```text
push to develop ─ Build ─▶ preview [approval] ─▶ https://develop.te-tengo-landing.pages.dev
push to main    ─ Build ─▶ preview [approval] ─▶ https://release-candidate.te-tengo-landing.pages.dev (smoke check)
                                 └─▶ produccion [approval] ─▶ https://tetengo.reqsai.tech (smoke check)
pull request    ─ Build ─▶ branch alias, no environment, no approval
```

| Environment  | Required reviewers    | Branches | Used by                                                                                                    |
| ------------ | --------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `preview`    | jhosepmyr, elmer-riva | any      | `deploy.yml` → `deploy-preview` (`develop` and `release-candidate` aliases)                                |
| `produccion` | jhosepmyr, elmer-riva | `main`   | `deploy.yml` → `deploy-production`; `publicar.yml` → R2 uploads, the PWA and the manual landing deployment |

Each channel also has an on/off switch, an organization Actions variable that must be exactly `true` (unset = off, the job shows as skipped):

| Variable                    | Channel                                                           |
| --------------------------- | ----------------------------------------------------------------- |
| `ENABLE_LANDING_PREVIEW`    | Landing previews: `develop`, `release-candidate`, pull requests   |
| `ENABLE_LANDING_PRODUCCION` | Landing production (`deploy.yml`, and manual `publicar.yml` runs) |
| `ENABLE_PWA`                | PWA → `app.tetengo.reqsai.tech`                                   |
| `ENABLE_APK`                | `te-tengo.apk` → R2                                               |
| `ENABLE_WINDOWS_INSTALLER`  | `te-tengo-captura-setup.exe` → R2                                 |

| Released to `main` in…       | Builds (no approval)                                                                 | Waits for approval, then publishes                        |
| ---------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------- |
| this repository              | `deploy.yml` → `Build`, then the `release-candidate` preview (approval on `preview`) | the landing → `https://tetengo.reqsai.tech`               |
| `te-tengo-mobile-flutter`    | `publicar.yml` (`publicar-movil`) → APK and PWA                                      | `te-tengo.apk` in R2, the PWA → `app.tetengo.reqsai.tech` |
| `te-tengo-desktop-pywebview` | `publicar.yml` (`publicar-escritorio`) → Windows installer                           | `te-tengo-captura-setup.exe` in R2                        |

The app repositories send the dispatch with their `DISPATCH_TOKEN` secret once their CI passes on `main`. Details, tokens and the manual fallback: [docs/DEPLOY.md](docs/DEPLOY.md#release--approval-flow).

One-time Cloudflare and GitHub setup: [docs/DEPLOY.md](docs/DEPLOY.md). Open questions (domain, contact e-mail, legal pages): [docs/BLOCKERS.md](docs/BLOCKERS.md).

## Contributing

Git flow and commit rules: [CONTRIBUTING.md](CONTRIBUTING.md). Rules for coding agents: [AGENTS.md](AGENTS.md). Security: [SECURITY.md](SECURITY.md).

---

Thesis project of the Universidad Peruana de Ciencias Aplicadas (UPC). Authors: Jhosepmyr Gutierrez Soto and Elmer Riva Rodriguez.
