# Security Policy — te-tengo-landing-astro

This repository holds the public landing page of Te Tengo and the workflow that publishes its apps. It handles no personal data itself, but its workflows hold credentials for Cloudflare, the private repositories and the Android release key.

## Supported branches

| Branch         | Supported                                         |
| -------------- | ------------------------------------------------- |
| `main`         | Yes — production; fixes arrive through `hotfix/*` |
| `develop`      | Yes — fixes land here first                       |
| Other branches | No                                                |

## Reporting a vulnerability

**Do not open an issue or pull request** for a vulnerability or an exposed secret (Cloudflare token or account ID).

The repository is private, so GitHub's private vulnerability reporting is not available. E-mail the maintainer, **Jhosepmyr Orlando Gutiérrez Soto** — `jhosepmyrgutierrezsoto@gmail.com`, with a description, the impact and the steps to reproduce (with tokens removed). We acknowledge reports within **72 hours** and aim to fix confirmed issues within **7 days**. An exposed secret is **rotated immediately**.

## Practices

- **Strict headers** (`public/_headers`): CSP without `unsafe-inline` scripts (hashes are generated at build time), `frame-ancestors 'none'`, HSTS, `nosniff`, a restrictive Permissions-Policy and COOP. The Flutter PWA is served from its own origin (`https://app.tetengo.reqsai.tech`) with its own policy (`deploy/app/_headers`).
- **No third-party requests**: fonts, icons and images are self-hosted; there are no analytics or cookies.
- **Workflows**: actions pinned to commit SHAs, `persist-credentials: false`, minimal `permissions` per job, values passed through `env`. Only `GITHUB_TOKEN` is used besides the Cloudflare secrets: `release-pr` (deploy.yml) gets `pull-requests: write` to open the release pull request, and `etiquetar.yml` gets `contents: write` and `pull-requests: write` to tag main and open the back-merge.
- **Approval before every stage**: the only two stages, `staging` and `produccion`, are environments with required reviewers that only accept `release/*`, `hotfix/*` and `main`. The build runs before, without an environment, and both stages deploy that same artifact (fingerprint checked). Pull requests and pushes to `develop` deploy nothing; they only run CI, without any Cloudflare secret.
- **Switches**: each stage deploys only while its organization variable (`ENABLE_STAGING`, `ENABLE_LANDING_PRODUCCION`) is `true`; unset means off ([docs/DEPLOY.md](docs/DEPLOY.md#switches)).
- **Secrets never in git**: the Cloudflare credentials are repository secrets.
- **Published binaries** (APK, Windows installer, Mac `.dmg`) are uploaded to R2 by the app repositories' own release pipelines, with their checks; this repository only links to them.

## Limitations of the current plan

The organization uses the GitHub **Free** plan. The repositories are public, so the rulesets on `main` and `develop` (pull request with one approval and the CI check, no force-push or deletion) and the `produccion` environment with required reviewers are enforced; code review, those approvals and the rules above are the guards.
