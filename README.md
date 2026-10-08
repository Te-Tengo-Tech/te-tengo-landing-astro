# te-tengo-landing-astro

[![CI](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/ci.yml)
[![Deploy](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/Te-Tengo-Tech/te-tengo-landing-astro/actions/workflows/deploy.yml)

The public landing page of **Te Tengo**, a system that detects falls of older adults at home and alerts the family. It also hosts the downloads: the Android APK and the Windows installer (from Cloudflare R2) and the iPhone/web app (the Flutter PWA, served under `/app/` of the same site).

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
| Hosting         | Cloudflare Pages (site + PWA) and Cloudflare R2 (binaries), deployed by GitHub Actions                                                              |
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

Other routes: `/validacion/` (methodology and results), `/404`, `/app/` (the PWA, deployed by `publicar.yml`). `/descargas`, `/descargar` and `/download` redirect to `/#descargas`.

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
| `SITE_URL`                  | Canonical origin. Default `https://te-tengo.pages.dev` until the domain is decided                                            |
| `PUBLIC_DESCARGAS_BASE_URL` | Public URL of the R2 bucket with `te-tengo.apk` and `te-tengo-captura-setup.exe`. Empty → those downloads show «Próximamente» |

`DESCARGAS_DISPONIBLES` in [`src/config/site.ts`](src/config/site.ts) switches every download to «Próximamente» at once.

## Deploy

- **CI** ([`ci.yml`](.github/workflows/ci.yml)): install, lint, `astro check`, build and Lighthouse CI on every push to `main`/`develop` and every pull request.
- **Deploy** ([`deploy.yml`](.github/workflows/deploy.yml)): `wrangler pages deploy` to the Pages project `te-tengo`: production on `main`, preview aliases on pull requests. Without the Cloudflare secrets it builds, explains what is missing and succeeds.
- **Publicar** ([`publicar.yml`](.github/workflows/publicar.yml)): manual, owner only. Builds the APK (through the mobile repository's reusable workflow), the Windows installer and the PWA from the private repositories, uploads the binaries to R2 and deploys the site with the PWA under `/app/`.

One-time Cloudflare and GitHub setup: [docs/DEPLOY.md](docs/DEPLOY.md). Open questions (domain, contact e-mail, legal pages): [docs/BLOCKERS.md](docs/BLOCKERS.md).

## Contributing

Git flow and commit rules: [CONTRIBUTING.md](CONTRIBUTING.md). Rules for coding agents: [AGENTS.md](AGENTS.md). Security: [SECURITY.md](SECURITY.md).

---

Thesis project of the Universidad Peruana de Ciencias Aplicadas (UPC). Authors: Jhosepmyr Gutierrez Soto and Elmer Riva Rodriguez.
