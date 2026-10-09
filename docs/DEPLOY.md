# Deploy: Cloudflare Pages, R2 and GitHub Actions

The landing and the Flutter PWA are **two Cloudflare Pages projects**, each on its own custom domain:

| Pages project      | Custom domain                     | Content                                 | Deployed by                                                   |
| ------------------ | --------------------------------- | --------------------------------------- | ------------------------------------------------------------- |
| `te-tengo-landing` | `https://tetengo.reqsai.tech`     | This Astro site                         | `deploy.yml` (push to `main`, PR previews) and `publicar.yml` |
| `te-tengo-app`     | `https://app.tetengo.reqsai.tech` | The Flutter PWA, at the root path (`/`) | `publicar.yml` only (built from `te-tengo-mobile-flutter`)    |

The older `te-tengo` project is Git-connected to the thesis repository and serves the prototypes; these workflows never touch it.

The PWA used to live under `/app/` of the landing. Old links keep working: `public/_redirects` sends `/app`, `/app/` and `/app/*` to `https://app.tetengo.reqsai.tech/:splat` with a `301`. Cloudflare Pages accepts an absolute URL with a splat as a redirect target (the [redirects docs](https://developers.cloudflare.com/pages/configuration/redirects/) show `/blog/* https://blog.my.domain/:splat`), and redirects run before static assets. The browser keeps the `#fragment` across the redirect, so e-mailed hash links such as `/app/#/nueva-contrasena?token=…` still open the right screen.

The binaries are too large for Pages (25 MiB per file; the Windows installer is about 105 MB), so they live in a **Cloudflare R2 bucket** with public read access, under stable keys:

| Key in R2                                                         | What                                   |
| ----------------------------------------------------------------- | -------------------------------------- |
| `te-tengo.apk`, `te-tengo.apk.sha256`                             | Android universal APK                  |
| `te-tengo-captura-setup.exe`, `te-tengo-captura-setup.exe.sha256` | Te Tengo Captura installer for Windows |

Since the PWA has its own project, a landing deployment no longer has to ship it, and the PWA is no longer packed into R2 (`te-tengo-web.tar.gz`). An old copy of that object in the bucket is unused and can be deleted by hand.

## Workflows

| Workflow       | Trigger                                        | Needs                                                                                                  |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ci.yml`       | push to `main`/`develop`, PRs                  | nothing                                                                                                |
| `deploy.yml`   | push to `main` (production) and PRs (previews) | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; variables `DESCARGAS_BASE_URL`, `SITE_URL` (optional) |
| `publicar.yml` | **manual, from `main`, owner only**            | everything below; deploys `te-tengo-landing` and `te-tengo-app`                                        |

Every step whose secret or variable is missing prints a `::notice` with what to set and is skipped, so the workflows stay green before the setup is done.

**Who runs `publicar.yml`.** Only the repository owner. The organization is on GitHub Free with private repositories, where environments with required reviewers are not available: the manual dispatch from `main` is the approval. It never runs on push or pull requests.

## One-time setup (owner)

### 1. Cloudflare account

1. Create or use a Cloudflare account (the free plan covers Pages and R2's free tier).
2. Copy the **Account ID**: dashboard → _Workers & Pages_ → right column, _Account ID_.

### 2. Enable R2 and create the bucket

1. Dashboard → **R2 Object Storage** → _Purchase R2 / Enable_. R2 asks for a payment method even on the free tier (10 GB storage and egress-free reads included).
2. _Create bucket_: name `te-tengo-descargas` (any name; it goes in `DESCARGAS_R2_BUCKET`), location _Automatic_.
3. **Public access**, one of:
   - **r2.dev subdomain** (quick, rate-limited, fine for the pilot): bucket → _Settings_ → _Public access_ → _R2.dev subdomain_ → _Allow_. Copy the URL, e.g. `https://pub-xxxxxxxx.r2.dev`.
   - **Custom domain** (recommended once a domain exists): bucket → _Settings_ → _Custom Domains_ → _Connect Domain_, e.g. `descargas.<domain>`. The domain must be on Cloudflare.

### 3. API token

Dashboard → _My Profile_ → _API Tokens_ → _Create Token_ → _Create Custom Token_:

| Field             | Value                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------- |
| Permissions       | _Account_ · **Cloudflare Pages** · _Edit_ and _Account_ · **Workers R2 Storage** · _Edit_ |
| Account resources | _Include_ · your account                                                                  |
| TTL               | optional; renew before it expires                                                         |

### 4. Pages projects and custom domains

Both projects already exist with production branch `main`; the workflows create them if they are missing. To create one by hand:

```bash
npx wrangler@4.149.0 pages project create te-tengo-landing --production-branch main --force
npx wrangler@4.149.0 pages project create te-tengo-app --production-branch main --force
```

(`--force` makes recent Wrangler versions create a Pages project instead of delegating to Workers; it is only needed when creating.) Their default URLs are `https://te-tengo-landing.pages.dev` and `https://te-tengo-app.pages.dev`.

The zone `reqsai.tech` is at the registrar (Namify), not on Cloudflare, so each custom domain is a `CNAME` at Namify's DNS plus a _Custom domains_ entry in its Pages project:

| Pages project      | Custom domain             | DNS record at Namify                             |
| ------------------ | ------------------------- | ------------------------------------------------ |
| `te-tengo-landing` | `tetengo.reqsai.tech`     | `CNAME` `tetengo` → `te-tengo-landing.pages.dev` |
| `te-tengo-app`     | `app.tetengo.reqsai.tech` | `CNAME` `app.tetengo` → `te-tengo-app.pages.dev` |

For each project:

1. _Workers & Pages_ → the project → _Custom domains_ → _Set up a custom domain_ → the domain above → _Continue_. Pages shows the `CNAME` it expects.
2. At Namify's DNS: add the `CNAME` record of the table (host `tetengo` or `app.tetengo`, value `<project>.pages.dev`). Do step 1 first: a `CNAME` to `*.pages.dev` for a domain the project does not know yet answers with Cloudflare error 522.
3. Wait until Pages shows the domain as _Active_ (it validates the `CNAME` and issues the certificate).

`SITE_URL` defaults to `https://tetengo.reqsai.tech` and the landing's app links (`APP_URL` in `src/config/site.ts`) default to `https://app.tetengo.reqsai.tech/`; both can be overridden with repository variables (below). The API is already configured for the app origin: `TT_PWA_URL=https://app.tetengo.reqsai.tech/`, `TT_ENLACE_BASE=https://app.tetengo.reqsai.tech/#` and the origin in its CORS list.

### 5. GitHub secrets and variables

_Settings → Secrets and variables → Actions_ of this repository:

| Name                                                                                                | Kind      | Value                                                                                                                                                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`                                                                              | secret    | The token of step 3                                                                                                                                                                                                                                                                                                                                  |
| `CLOUDFLARE_ACCOUNT_ID`                                                                             | secret    | The Account ID of step 1                                                                                                                                                                                                                                                                                                                             |
| `TT_REPOS_TOKEN`                                                                                    | secret    | Fine-grained personal access token: resource owner **Te-Tengo-Tech**, repositories **te-tengo-mobile-flutter** and **te-tengo-desktop-pywebview**, permission **Contents: Read-only**, expiration at most one year. If the organization requires approval for fine-grained tokens, approve it under _Organization settings → Personal access tokens_ |
| `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD` | secrets   | The **same** release key as in the mobile repository (`base64 -i upload-keystore.jks \| gh secret set ANDROID_KEYSTORE_BASE64`)                                                                                                                                                                                                                      |
| `GOOGLE_SERVICES_JSON`                                                                              | secret    | `base64 -i google-services.json` (push on Android)                                                                                                                                                                                                                                                                                                   |
| `TT_API_URL`                                                                                        | variable  | HTTPS URL of the production API                                                                                                                                                                                                                                                                                                                      |
| `DESCARGAS_R2_BUCKET`                                                                               | variable  | Bucket name, e.g. `te-tengo-descargas`                                                                                                                                                                                                                                                                                                               |
| `DESCARGAS_BASE_URL`                                                                                | variable  | Public URL of the bucket, without a trailing slash                                                                                                                                                                                                                                                                                                   |
| `SITE_URL`                                                                                          | variable  | Optional: the canonical origin of the landing (default `https://tetengo.reqsai.tech`)                                                                                                                                                                                                                                                                |
| `APP_URL`                                                                                           | variable  | Optional: the PWA URL the landing links to, passed as `PUBLIC_APP_URL` (default `https://app.tetengo.reqsai.tech/`)                                                                                                                                                                                                                                  |
| `TT_FIREBASE_WEB_*`, `TT_FCM_VAPID_KEY`                                                             | variables | Firebase web config of the PWA. Already set from `~/.config/te-tengo/firebase-web.env` (public values, never committed)                                                                                                                                                                                                                              |

```bash
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
gh secret set TT_REPOS_TOKEN
gh variable set DESCARGAS_R2_BUCKET --body te-tengo-descargas
gh variable set DESCARGAS_BASE_URL --body https://pub-xxxxxxxx.r2.dev
gh variable set TT_API_URL --body https://<api host>
```

**One token name.** This repository uses `TT_REPOS_TOKEN` for every private checkout. The mobile repository's reusable workflow calls the same token `MOBILE_REPO_TOKEN`; `publicar.yml` passes `TT_REPOS_TOKEN` under that name.

### 6. Allow the mobile repository's reusable workflow

`publicar.yml` builds the APK with `Te-Tengo-Tech/te-tengo-mobile-flutter/.github/workflows/build-apk.yml@develop` (mobile PR #8, branch `feature/mobile-signed-apk`; it must be merged into `develop` first). In **te-tengo-mobile-flutter**: _Settings → Actions → General → Access_ → «Accessible from repositories in the 'Te-Tengo-Tech' organization». The owner changes this setting.

## Publishing a version

1. Bump the version in the mobile repository (`pubspec.yaml`, `+N` must grow) or pass `build_number`.
2. _Actions → Publicar → Run workflow_, **branch `main`**: refs of the mobile and desktop repositories, `publicar: true`.
3. The run builds the APK (signed), the Windows installer (smoke-tested, install/uninstall-tested) and the PWA (`flutter build web --base-href /`). The `publicar` job uploads the binaries to R2 and deploys the landing to `te-tengo-landing`; then the `app` job adds `deploy/app/_headers` and `deploy/app/robots.txt` to the PWA build and deploys it to `te-tengo-app` (production, branch `main`). A run whose mobile ref has no `web/` folder leaves the current PWA deployment as it is. The summary shows the APK signing certificate fingerprint: it must be the same in every release.
4. With `publicar: false` everything stays as run artifacts for 7 days, for checking.

## Headers and caching

- `public/_headers` (landing): security headers with a hashed CSP, `immutable` cache for `/_astro/*`.
- `deploy/app/_headers` (PWA): `nosniff`, `Referrer-Policy`, HSTS, `X-Frame-Options` and `Cache-Control: no-cache` for everything, `no-store` for Flutter's unused `flutter_service_worker.js`. No CSP, COOP or Permissions-Policy: Flutter and Firebase need their own policy. `deploy/app/robots.txt` keeps the app out of search engines.
- The PWA's only service worker, `firebase-messaging-sw.js`, is at the root of the app origin, so its scope is `/`; it caches network first and receives FCM web push. The Firebase web config and `TT_FCM_VAPID_KEY` are `--dart-define` values of the `web` job (repository variables), passed to the worker in its registration URL by the app; nothing in this repository injects them.
- R2 objects are uploaded with `Cache-Control: no-cache`, so a new upload under the same key is served at once.
- The PWA uses hash URLs (`https://app.tetengo.reqsai.tech/#/inicio`), so the app project needs no `_redirects`.

## Local checks

```bash
pnpm build && npx wrangler pages dev dist      # serves dist/ with _headers and _redirects
```
