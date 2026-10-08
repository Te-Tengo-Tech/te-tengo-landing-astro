# Deploy: Cloudflare Pages, R2 and GitHub Actions

The site and the Flutter PWA are served by **one Cloudflare Pages project** (`te-tengo`): the landing at `/`, the PWA at `/app/`. The binaries are too large for Pages (25 MiB per file; the Windows installer is about 105 MB), so they live in a **Cloudflare R2 bucket** with public read access, under stable keys:

| Key in R2                                                         | What                                                                 |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| `te-tengo.apk`, `te-tengo.apk.sha256`                             | Android universal APK                                                |
| `te-tengo-captura-setup.exe`, `te-tengo-captura-setup.exe.sha256` | Te Tengo Captura installer for Windows                               |
| `te-tengo-web.tar.gz`, `te-tengo-web.tar.gz.sha256`               | The latest PWA build, unpacked into `/app/` by every site deployment |

Why the PWA tarball: a Pages deployment replaces the whole site. `publicar.yml` builds the PWA, but `deploy.yml` (every push to `main`) must also ship `/app/`, so it downloads the latest published PWA from R2 before deploying.

## Workflows

| Workflow       | Trigger                                                   | Needs                                                                                                  |
| -------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ci.yml`       | push to `main`/`develop`, PRs                             | nothing                                                                                                |
| `deploy.yml`   | push to `main` (production), `develop` and PRs (previews) | `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; variables `DESCARGAS_BASE_URL`, `SITE_URL` (optional) |
| `publicar.yml` | **manual, from `main`, owner only**                       | everything below                                                                                       |

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

### 4. Pages project

Nothing to do: the workflows create the project `te-tengo` (production branch `main`) on the first deploy. To create it by hand: `npx wrangler pages project create te-tengo --production-branch main`. Its default URL is `https://te-tengo.pages.dev`; a custom domain is added under _Workers & Pages_ → `te-tengo` → _Custom domains_ (then set `SITE_URL`).

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
| `SITE_URL`                                                                                          | variable  | Optional: the canonical origin when a custom domain exists                                                                                                                                                                                                                                                                                           |
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
3. The run builds the APK (signed), the Windows installer (smoke-tested, install/uninstall-tested) and the PWA, uploads them to R2 and deploys the site with `/app/`. The summary shows the APK signing certificate fingerprint: it must be the same in every release.
4. With `publicar: false` everything stays as run artifacts for 7 days, for checking.

## Headers and caching

- `public/_headers`: security headers for the landing, `immutable` cache for `/_astro/*`, `no-cache` for `/app/*` (the PWA's own service worker, scope `/app/`, handles its cache). The landing's CSP, COOP and Permissions-Policy are detached for `/app/*`.
- R2 objects are uploaded with `Cache-Control: no-cache`, so a new upload under the same key is served at once.
- The PWA uses hash URLs (`/app/#/inicio`), so no rewrite is needed under `/app/`. Never add a splat rule there: Pages applies `_redirects` before static files.

## Local checks

```bash
pnpm build && npx wrangler pages dev dist      # serves dist/ with _headers and _redirects
```
