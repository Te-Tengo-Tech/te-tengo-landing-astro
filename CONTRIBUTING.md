# How to contribute

## Branches (git flow)

| Branch              | From      | Merges into              | Use                                      |
| ------------------- | --------- | ------------------------ | ---------------------------------------- |
| `feature/<topic>`   | `develop` | `develop`                | New work, e.g. `feature/landing-english` |
| `bugfix/<topic>`    | `develop` | `develop`                | Fixes found during development           |
| `hotfix/<topic>`    | `main`    | `main` **and** `develop` | Urgent fixes to production               |
| `release/<version>` | `develop` | `main` and `develop`     | Release preparation                      |

`main` is production (Cloudflare Pages deploys it); it only receives releases and hotfixes. Branch prefixes follow git flow (never `feat/`, `fix/`, `ci/` or `docs/`); commit messages keep their Conventional Commit types.

## Workflow

1. Create a branch from `develop` with one of the prefixes above.
2. `pnpm install`, then work with `pnpm dev`.
3. Before pushing: `pnpm lint`, `pnpm check`, `pnpm build` and, for visual changes, `pnpm lhci`.
4. Open a pull request to `develop` with the template. Every pull request gets a Cloudflare Pages preview (once the secrets exist, [docs/DEPLOY.md](docs/DEPLOY.md)).
5. **CI must be green before merging.** The rulesets `proteger-develop` and `proteger-main` require a pull request with one approval and the `Lint, types and build` check, and block force-pushes and deletions.

## Continuous integration

| Workflow                                   | Trigger                                                                                                 | What it does                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [CI](.github/workflows/ci.yml)             | Push to `main`/`develop`, every PR                                                                      | Lint (ESLint + Prettier), `astro check`, build, Lighthouse CI (fails under 95 in any category) with the scores in the run summary                                                    |
| [Deploy](.github/workflows/deploy.yml)     | Push to `main` (production), PRs (previews)                                                             | Build and `wrangler pages deploy`; production waits for an approval on the `produccion` environment; without Cloudflare secrets, a notice and success                                |
| [Publicar](.github/workflows/publicar.yml) | `repository_dispatch` from the app repositories when a release reaches their `main`; manual from `main` | Builds the APK and the PWA, or the Windows installer, and after an approval on `produccion` publishes them to R2 and Pages ([docs/DEPLOY.md](docs/DEPLOY.md#release--approval-flow)) |

Dependabot opens weekly update PRs to `develop` for npm and GitHub Actions.

## Commit messages

**Conventional Commits 1.0.0** in English: `type(scope): description in the imperative mood`, with `feat`, `fix`, `docs`, `refactor`, `build`, `ci`, `chore`, `test`. No co-author lines and no AI attribution.

```
feat(sections): add the downloads section with platform detection
fix(header): close the mobile menu with Escape
docs(deploy): describe the R2 bucket setup
```

## Content rules

- Copy is Spanish (Peru) and lives in `src/content/es.ts`.
- Every claim needs a source document (see [AGENTS.md](AGENTS.md)). Use the _Content change_ issue template to propose copy.
- No testimonials, client logos, invented figures or user counts.

## Community

- [Security policy](SECURITY.md)
