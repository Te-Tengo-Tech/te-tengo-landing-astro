# Security Policy — te-tengo-landing-astro

This repository holds the public landing page of Te Tengo and the workflow that publishes its apps. It handles no personal data itself, but its workflows hold credentials for Cloudflare, the private repositories and the Android release key.

## Supported branches

| Branch         | Supported                                         |
| -------------- | ------------------------------------------------- |
| `main`         | Yes — production; fixes arrive through `hotfix/*` |
| `develop`      | Yes — fixes land here first                       |
| Other branches | No                                                |

## Reporting a vulnerability

**Do not open an issue or pull request** for a vulnerability or an exposed secret (Cloudflare token, `TT_REPOS_TOKEN`, keystore or its passwords).

The repository is private, so GitHub's private vulnerability reporting is not available. E-mail the maintainer, **Jhosepmyr Orlando Gutiérrez Soto** — `jhosepmyrgutierrezsoto@gmail.com`, with a description, the impact and the steps to reproduce (with tokens removed). We acknowledge reports within **72 hours** and aim to fix confirmed issues within **7 days**. An exposed secret is **rotated immediately**.

## Practices

- **Strict headers** (`public/_headers`): CSP without `unsafe-inline` scripts (hashes are generated at build time), `frame-ancestors 'none'`, HSTS, `nosniff`, a restrictive Permissions-Policy and COOP. The Flutter PWA under `/app/` has its own policy.
- **No third-party requests**: fonts, icons and images are self-hosted; there are no analytics or cookies.
- **Workflows**: actions pinned to commit SHAs, `persist-credentials: false`, minimal `permissions` per job, inputs passed through `env`. `publicar.yml` only runs by manual dispatch from `main`; it never runs on pull requests, so no fork code can reach its secrets.
- **Secrets never in git**: the Firebase web values are public but are stored as repository variables, not committed; the keystore, tokens and Cloudflare credentials are repository secrets.
- **Published binaries** go to R2 with a `.sha256` file next to each one; the publish job refuses a debug-signed APK unless explicitly allowed.

## Limitations of the current plan

The organization uses the GitHub **Free** plan with private repositories: no CodeQL, no secret scanning or push protection, no branch protection and no environments with required reviewers. Code review and the rules above are the guards; the manual dispatch of `publicar.yml` by the owner is its approval.
