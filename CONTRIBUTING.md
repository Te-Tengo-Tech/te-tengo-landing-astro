# How to contribute

## Branches (git flow)

| Branch              | From      | Merges into              | Use                                             |
| ------------------- | --------- | ------------------------ | ----------------------------------------------- |
| `feature/<topic>`   | `develop` | `develop`                | New work, e.g. `feature/landing-english`        |
| `bugfix/<topic>`    | `develop` | `develop`                | Fixes found during development                  |
| `hotfix/<version>`  | `main`    | `main` **and** `develop` | Urgent fixes to production, e.g. `hotfix/0.4.1` |
| `release/<version>` | `develop` | `main` and `develop`     | Release preparation                             |

`main` is what is in production: it only receives the release and hotfix pull requests that `release.yml` opens after staging, and the push to it deploys the tested candidate and then tags it ([docs/DEPLOY.md](docs/DEPLOY.md)). Branch prefixes follow git flow (never `feat/`, `fix/`, `ci/` or `docs/`); commit messages keep their Conventional Commit types.

### Releases and hotfixes

1. Create `release/x.y.z` from `develop` (or `hotfix/x.y.z` from `main`, with the patch bumped). The branch name must equal `version` in `package.json`; set it and add the `## [x.y.z] - date` section to `CHANGELOG.md` on that branch.
2. Each push builds a candidate `x.y.z-rc.N` (a GitHub pre-release) and, after the `staging` approval, deploys it to `https://staging.te-tengo-landing.pages.dev`.
3. A bug found in staging is fixed on the release branch (directly or through `bugfix/*` into it); the push builds `rc.N+1`. The version does not change.
4. Merge the pull request `release: x.y.z` into `main` once staging is right. `main` must not have anything the release branch lacks, or production refuses to deploy (merge `main` into the release branch first).
5. Approve `produccion`; the tag `vX.Y.Z` and the back-merge pull request `main → develop` follow automatically. Merge the back-merge with a merge commit.

## Workflow

1. Create a branch from `develop` with one of the prefixes above.
2. `pnpm install`, then work with `pnpm dev`.
3. Before pushing: `pnpm lint`, `pnpm check`, `pnpm build` and, for visual changes, `pnpm lhci`.
4. Open a pull request to `develop` with the template. Pull requests only run CI: there are no Pages previews, and nothing deploys until a `release/*` or `hotfix/*` branch is pushed ([docs/DEPLOY.md](docs/DEPLOY.md)).
5. **CI must be green before merging.** The rulesets `proteger-develop` and `proteger-main` require a pull request with one approval and the checks `ci-ok` (every CI job passed) and `pr-title` (Conventional Commits title); `main` also requires `release-gate`. They block force-pushes and deletions.

## Continuous integration

| Workflow                                       | Trigger                                        | What it does                                                                                                                                                                     |
| ---------------------------------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [CI](.github/workflows/ci.yml)                 | Every PR, push to `develop`; called by Release | Lint (ESLint + Prettier), `astro check`, build, Lighthouse CI (fails under 95 in any category), then `ci-ok`. PRs into `main` only run `ci-ok` (the candidate was tested)        |
| [Release](.github/workflows/release.yml)       | Push to `release/*`, `hotfix/*`                | Build once → pre-release `vX.Y.Z-rc.N` (bundle + SHA-256 + tree hash) → `staging` alias (approval on `staging`, smoke check) → opens or updates the PR to `main`                 |
| [Produccion](.github/workflows/produccion.yml) | Push to `main`                                 | Finds the candidate whose tree equals `main`'s → production (approval on `produccion`, same bytes, smoke check) → tag `vX.Y.Z` + GitHub Release → back-merge PR `main → develop` |
| [Rollback](.github/workflows/rollback.yml)     | Manual, on `main`                              | Redeploys the bundle of an earlier `vX.Y.Z` to production (approval on `produccion`)                                                                                             |

[PR title](.github/workflows/pr-title.yml) checks that the pull request title is a Conventional Commit, and [Release gate](.github/workflows/release-gate.yml) that a pull request into `main` carries a candidate that passed staging (docs/DEPLOY.md). Dependabot opens weekly update PRs to `develop` for npm and GitHub Actions.

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
