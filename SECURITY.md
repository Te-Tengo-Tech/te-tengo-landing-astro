# Security Policy — te-tengo-landing-astro

This repository holds the public landing page of Te Tengo and the workflows that publish it. It handles no personal data itself, but its workflows hold the Cloudflare credentials.

## Supported branches

| Branch         | Supported                                         |
| -------------- | ------------------------------------------------- |
| `main`         | Yes — production; fixes arrive through `hotfix/*` |
| `develop`      | Yes — fixes land here first                       |
| Other branches | No                                                |

## Reporting a vulnerability

**Do not open an issue or pull request** for a vulnerability or an exposed secret (Cloudflare token or account ID).

E-mail the maintainer, **Jhosepmyr Orlando Gutiérrez Soto** — `jhosepmyrgutierrezsoto@gmail.com`, with a description, the impact and the steps to reproduce (with tokens removed). We acknowledge reports within **72 hours** and aim to fix confirmed issues within **7 days**. An exposed secret is **rotated immediately**.

## Practices

- **Strict headers** (`public/_headers`): CSP without `unsafe-inline` scripts (hashes are generated at build time), `frame-ancestors 'none'`, HSTS, `nosniff`, a restrictive Permissions-Policy and COOP. The Flutter PWA is served from its own origin (`https://app.tetengo.reqsai.tech`) with its own policy (`deploy/app/_headers`).
- **No third-party requests**: fonts, icons and images are self-hosted; there are no analytics or cookies.
- **Workflows**: actions pinned to commit SHAs, `persist-credentials: false`, minimal `permissions` per job, values passed through `env`. Only `GITHUB_TOKEN` is used besides the Cloudflare secrets: the `candidate` job of `release.yml` gets `contents: write` to create the pre-release `vX.Y.Z-rc.N`, `release-pr` gets `pull-requests: write`, and the `release` job of `produccion.yml` gets `contents: write` and `pull-requests: write` to create `vX.Y.Z` and the back-merge pull request.
- **Build once, verify everywhere**: the site is built only by the `candidate` job of `release.yml`, without an environment and without Cloudflare secrets. Staging, production and rollback download the bundle from its GitHub Release and refuse it unless its SHA-256 equals the recorded one and GitHub's upload digest, and the fingerprint of the unpacked `dist/` matches. Production only deploys a candidate whose recorded git tree equals the tree of the `main` commit, so what reaches users is exactly what passed staging.
- **Approval before every stage**: `staging` (only `release/*`, `hotfix/*`) and `produccion` (only `main`) are environments with required reviewers; `rollback.yml` also needs the `produccion` approval. Pull requests and pushes to `develop` deploy nothing; they only run CI, without any Cloudflare secret.
- **Tag at the end**: `vX.Y.Z` is created only after production succeeded; candidates stay pre-releases and are never modified.
- **Switches**: each stage deploys only while its organization variable (`ENABLE_STAGING`, `ENABLE_LANDING_PRODUCCION`) is `true`; unset means off ([docs/DEPLOY.md](docs/DEPLOY.md#switches)).
- **Rollback**: `rollback.yml` redeploys the verified bundle of an earlier final release; the landing has no database to restore.
- **Secrets never in git**: the Cloudflare credentials are repository secrets.
- **Published binaries** (APK, Windows installer, Mac `.dmg`) are uploaded to R2 by the app repositories' own release pipelines, with their checks; this repository only links to them.

## Limitations of the current plan

The organization uses the GitHub **Free** plan. The repositories are public, so the rulesets on `main` and `develop` (pull request with one approval and the CI check, no force-push or deletion) and the `produccion` environment with required reviewers are enforced; code review, those approvals and the rules above are the guards.
