# AGENTS.md

Guide for coding agents and contributors. Read it before changing anything.

## Purpose

The public landing page of **Te Tengo** (a system that detects falls of older adults at home and alerts the family) and the place where its apps are downloaded. It is a persuasion page for a **new product in a pilot**: there are no testimonials, client logos or user counts, and there must never be. Trust comes from privacy commitments and the published validation results.

## Non-negotiable rules

1. **Never invent product facts or numbers.** Every claim on the page comes from a source document, named in the comment block at the top of [`src/content/es.ts`](src/content/es.ts) and next to each section. If a fact has no source (price of the pilot, contact e-mail, legal entity, social links, store links), leave it out and record it in [`docs/BLOCKERS.md`](docs/BLOCKERS.md).
2. **Validation figures are quoted exactly** from `te-tengo-desktop-pywebview/docs/validation.md`: 81,2 % sensitivity and 81,1 % specificity, leaving one group out, on URFD + CAUCAFall (170 videos), with its limitations. `/validacion/` summarises the methodology; keep both in sync with that document.
3. **The video is processed on the household PC** (ADR 0007 of the desktop repository): only the event clip and the live view, when a family member opens it, leave the house. Do not describe cloud processing.
4. **Demo data is labelled.** Names (Rosa, Carmen, Luis Huamán) and times come from the prototype and always carry an «Ejemplo» note.
5. **All copy is Spanish (Peru)** and lives in `src/content/es.ts`. Components never hardcode visible text. Docs, comments and commits are English.
6. **Brand:** `--morado #4A2A85` is the brand and the primary action. Coral `#E8765A` and durazno `#FFB59C` are brand colours only (the symbol's dot and «Tengo»): never text, buttons or states. Red (caída), amber (movimiento inestable) and green (calma) appear only for those states. Nothing may look like surveillance: no camera lenses, eyes or CCTV imagery next to the symbol. Brand rules: `Alba-docs/05-prototipos/marca/README.md`.

## Sources

| Topic                           | Document                                                                                                                         |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Brand, symbol geometry, colours | `Alba-docs/05-prototipos/marca/README.md` and its SVGs (copied to `src/assets/brand/`)                                           |
| Wording, users, flows, rules    | `te-tengo-mobile-flutter/docs/references/` (`PRODUCT.md`, `DESIGN.md`, `prototype/prototipo.html`)                               |
| Desktop agent                   | `te-tengo-desktop-pywebview/docs/references/desktop-prototype/` (`PRODUCT.md`, `DESIGN.md`), `README.md`, `docs/INSTALLATION.md` |
| Acceptance criteria             | `…/docs/references/PRODUCT_BACKLOG.md`                                                                                           |
| Validation                      | `te-tengo-desktop-pywebview/docs/validation.md`                                                                                  |
| Processing on the PC            | `te-tengo-desktop-pywebview/docs/adr/0007-processing-on-household-pc.md`                                                         |
| Problem figures                 | `Alba-docs/01-project-charter/PLANTEAMIENTO_PROBLEMA.md` and `REFERENCIAS.md`                                                    |
| PWA (iPhone)                    | `te-tengo-mobile-flutter/docs/WEB_PWA.md`                                                                                        |
| APK distribution                | `te-tengo-mobile-flutter/docs/RELEASE_ANDROID.md`                                                                                |

## Layout

```
src/
  config/site.ts        switches and URLs (DESCARGAS_BASE_URL, DESCARGAS_DISPONIBLES, APP_URL)
  content/es.ts         every visible string, with its source; add en.ts with the same shape later
  styles/global.css     Tailwind entry, @theme tokens, @font-face, type scale, buttons, symbol animation
  layouts/Base.astro    <head> (SEO, OG, JSON-LD slot, icons), skip link, header, footer
  components/           Header, Footer, Logo, Mark (animated symbol), Room (room + pose skeleton), Icon
  components/sections/  one file per section, composed in pages/index.astro
  pages/                index, validacion, 404, robots.txt
public/                 fonts (+ OFL), icons, og.png, _headers, _redirects, site.webmanifest
scripts/                csp.mjs (post-build CSP hashes), og-image.mjs, lhci-summary.mjs
deploy/app/             _headers and robots.txt of the Flutter PWA's own Pages project (te-tengo-app)
```

## Conventions

- **Zero JS by default.** A `<script>` is allowed only for real interactivity (today: mobile menu, platform detection) and must be a progressive enhancement. FAQ and install steps use `<details>`.
- **Tailwind v4 is CSS-first**: there is no `tailwind.config.*`; tokens live in `@theme`. Component styles go in the component's scoped `<style>`. Scoped (unlayered) CSS beats Tailwind utilities, so do not set `margin`/`padding` in scoped CSS on elements that also take spacing utilities; Tailwind's preflight already resets them.
- **Illustrations** are the prototype's stylised room and pose skeleton (`Room.astro`, ported from `roomSVG()` and `skeleton()`), never photos of people.
- **Motion:** one orchestrated entrance in the hero, the symbol assembling itself (header on load, final CTA on scroll with `animation-timeline: view()`), the skeleton's slight sway. Only `transform`, `opacity` and `stroke-dashoffset`. Everything stops under `prefers-reduced-motion`. The hero headline never animates opacity (it is the LCP element).
- **Accessibility:** WCAG AA contrast, landmarks, skip link, visible focus (`:focus-visible`), 44 px minimum targets, `role="list"` on unstyled lists, decorative SVGs `aria-hidden`, informative ones `role="img"` with a label.
- **Security headers** live in `public/_headers`. `pnpm build` runs `scripts/csp.mjs`, which writes the hashes of the inline scripts into the CSP. The Flutter PWA is a separate Pages project (`te-tengo-app`, `https://app.tetengo.reqsai.tech`) with its own headers in `deploy/app/_headers`; link to it only through `APP_URL`. The landing's `_redirects` sends the old `/app/*` paths there.

## Commands

| Command                     | Purpose                                                     |
| --------------------------- | ----------------------------------------------------------- |
| `pnpm dev`                  | Dev server                                                  |
| `pnpm build`                | Static build + CSP hashes                                   |
| `pnpm lint` / `pnpm format` | ESLint + Prettier                                           |
| `pnpm check`                | `astro check`                                               |
| `pnpm lhci`                 | Lighthouse CI (≥ 95 in every category)                      |
| `pnpm og`                   | Regenerate `public/og.png` after visual changes to the hero |

## Definition of done

`pnpm lint`, `pnpm check`, `pnpm build` and `pnpm lhci` pass; checked at 375 px and desktop, by keyboard and with reduced motion; every new claim has a source; `CHANGELOG.md` updated; Conventional Commits in English with **no co-author or AI attribution lines**; pull request to `develop` from a `feature/*` or `bugfix/*` branch.
