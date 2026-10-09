#!/usr/bin/env bash
# Smoke check of a landing deployment, run by release.yml, produccion.yml and rollback.yml
# after each Cloudflare Pages deploy.
#
#   scripts/smoke-check.sh <url> <canonical origin> [<index.html of the build>]
#
# Passes when <url>/ answers 200 and its HTML carries <link rel="canonical" href="<origin>/">. With a
# third argument the served page must also be byte for byte that file: Pages serves the uploaded HTML
# unchanged, so this proves the URL is serving this very build and not the previous deployment.
# Retries for a while because a new deployment can take a few seconds to reach every edge.
# SMOKE_ATTEMPTS (default 12) and SMOKE_DELAY (seconds, default 5) tune the retries.
set -euo pipefail

if [ $# -lt 2 ]; then
  echo "usage: $0 <url> <canonical origin> [<expected index.html>]" >&2
  exit 2
fi
url=${1%/}/
origin=${2%/}
expected=${3:-}
canonical="<link rel=\"canonical\" href=\"${origin}/\">"
attempts=${SMOKE_ATTEMPTS:-12}
delay=${SMOKE_DELAY:-5}

if [ -n "$expected" ] && [ ! -f "$expected" ]; then
  echo "::error title=Smoke check::$expected does not exist."
  exit 2
fi

body=$(mktemp)
trap 'rm -f "$body"' EXIT

problem=""
for attempt in $(seq 1 "$attempts"); do
  # A query string skips any cached copy; Pages serves the same file for it.
  status=$(curl -sS -o "$body" -w '%{http_code}' --max-time 20 \
    -H 'Cache-Control: no-cache' "${url}?smoke=${GITHUB_RUN_ID:-local}-${attempt}" || true)
  if [ "$status" != 200 ]; then
    problem="HTTP ${status:-no answer}"
  elif ! grep -qF "$canonical" "$body"; then
    problem="no canonical link to ${origin}/"
  elif [ -n "$expected" ] && ! cmp -s "$body" "$expected"; then
    problem="the page is not the HTML of this build (previous deployment still served, or changed by Cloudflare)"
  else
    echo "Smoke check passed: ${url} → 200, canonical ${origin}/${expected:+, identical to this build}."
    exit 0
  fi
  echo "Attempt ${attempt}/${attempts}: ${problem}."
  if [ "$attempt" -lt "$attempts" ]; then sleep "$delay"; fi
done

echo "::error title=Smoke check failed::${url}: ${problem}."
exit 1
