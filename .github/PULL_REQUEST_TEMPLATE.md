## What and why

<!-- What does this pull request change, and why? -->

**Area:** <!-- content | sections | design | seo | deploy | ci | docs -->

## Type of change

- [ ] `feat` — new section or behaviour
- [ ] `fix` — bug fix
- [ ] `refactor` — no visible change
- [ ] `docs` — documentation only
- [ ] `build` / `ci` / `chore` — dependencies, CI or maintenance

## Definition of done

- [ ] The pull request targets `develop` (not `main`), from a `feature/*` or `bugfix/*` branch (`hotfix/*` targets `main`)
- [ ] Every new or changed claim on the page comes from a source document named in `src/content/es.ts`; no invented numbers, testimonials, logos or user counts
- [ ] All copy lives in `src/content/` (Spanish, Peru); nothing is hardcoded in components
- [ ] `pnpm lint`, `pnpm check` and `pnpm build` pass locally
- [ ] Checked at 375 px and at desktop width, keyboard only, and with `prefers-reduced-motion`
- [ ] Lighthouse CI is green (≥ 95 in every category); scores pasted below
- [ ] Conventional Commits in English, with no co-author or AI attribution lines
- [ ] `CHANGELOG.md` is updated
- [ ] CI is green (branch protection is not enforced on our plan: reviewers check it before merging)

## Lighthouse

<!-- pnpm build && pnpm lhci && node scripts/lhci-summary.mjs -->

## Screenshots

<!-- Desktop and 375 px, for visual changes -->
