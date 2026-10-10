#!/usr/bin/env bash
# Finds the approved release candidate of the landing for a git tree (docs/DEPLOY.md): the newest
# published pre-release vX.Y.Z-rc.N whose candidate record (the ```text block of its notes, written by
# release.yml) has `version: X.Y.Z`, `tree: <tree>` and `staging: passed` or `staging: skipped` (staging
# switched off when it was built), and whose tag points at a commit with that same tree. Used by
# produccion.yml (the tree of main) and release-gate.yml (the tree of the pull request's test merge), so
# both accept exactly the same candidates.
#
#   find-candidate.sh <version x.y.z> <git tree sha>
#
# Exit 0 when found, with tag, candidate, build, archive, archive-sha256, dist-sha256 and staging written
# to $GITHUB_OUTPUT; exit 1 with a ::error and the list of candidates otherwise.
# Environment: GH_TOKEN, GITHUB_REPOSITORY, GITHUB_OUTPUT, GITHUB_STEP_SUMMARY.
set -euo pipefail

version=${1:?usage: find-candidate.sh <version> <tree>}
tree=${2:?usage: find-candidate.sh <version> <tree>}
: "${GITHUB_REPOSITORY:?}"
repo=$GITHUB_REPOSITORY
out=${GITHUB_OUTPUT:-/dev/null}
summary=${GITHUB_STEP_SUMMARY:-/dev/null}
[[ "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "::error title=Invalid version::'$version' is not X.Y.Z."; exit 1; }

field() { printf '%s\n' "$2" | sed -n "s/^$1: //p" | head -n1; }

mapfile -t tags < <(gh api --paginate "repos/$repo/releases?per_page=100" \
  --jq '.[] | select(.prerelease and (.draft | not)) | .tag_name' |
  { grep -E "^v${version//./\\.}-rc\.[0-9]+$" || true; } | sort -Vr)
checked=()
for tag in "${tags[@]}"; do
  body=$(gh api "repos/$repo/releases/tags/$tag" --jq .body | tr -d '\r')
  recorded=$(field tree "$body")
  staging=$(field staging "$body")
  checked+=("\`$tag\`: tree \`${recorded:0:12}\`, staging ${staging:-not recorded}")
  [ "$recorded" = "$tree" ] || continue
  [ "$(field version "$body")" = "$version" ] || continue
  if [ "$staging" != passed ] && [ "$staging" != skipped ]; then
    continue # built from this tree but not through staging (pending, rejected or failed)
  fi
  # The record is in the notes; the tag itself must point at a commit with that same tree.
  if [ "$(gh api "repos/$repo/commits/$tag" --jq .commit.tree.sha)" != "$tree" ]; then
    echo "::warning title=Candidate record mismatch::$tag records the tree ${tree:0:12}, but its tag points at a commit with another tree; ignored."
    continue
  fi
  for key in candidate build archive archive-sha256 dist-sha256; do
    value=$(field "$key" "$body")
    if [ -z "$value" ]; then
      echo "::error title=Incomplete candidate record::$tag has no '$key:' line in its notes."
      exit 1
    fi
    echo "$key=$value" >> "$out"
  done
  {
    echo "tag=$tag"
    echo "staging=$staging"
  } >> "$out"
  echo "- Candidate \`$tag\` (build \`$version+$(field build "$body")\`, staging $staging, built from \`$(field commit "$body" | cut -c1-12)\`) has the tree \`${tree:0:12}\`" >> "$summary"
  echo "$tag (staging $staging) has the tree $tree"
  exit 0
done

echo "::error title=No approved candidate for this tree::No candidate of $version records the tree ${tree:0:12} with staging passed (or switched off). Candidates of $version: ${#checked[@]}; the run summary lists them."
{
  echo "### No approved candidate of $version has the tree \`${tree:0:12}\`"
  if [ ${#checked[@]} -eq 0 ]; then
    echo "- none yet"
  else
    printf -- '- %s\n' "${checked[@]}"
  fi
} >> "$summary"
exit 1
