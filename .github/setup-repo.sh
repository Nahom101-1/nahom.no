#!/usr/bin/env bash
set -euo pipefail

if ! command -v gh >/dev/null 2>&1; then
  echo "gh CLI is required. Install from https://cli.github.com/"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in. Run: gh auth login"
  exit 1
fi

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
RULESET_NAME="Protect main"

echo "Updating repository settings on ${REPO}..."

gh api --method PATCH "repos/${REPO}" \
  -f delete_branch_on_merge=true \
  -f allow_auto_merge=true \
  --silent

gh api --method PUT "repos/${REPO}/vulnerability-alerts" --silent 2>/dev/null || true
gh api --method PUT "repos/${REPO}/automated-security-fixes" --silent 2>/dev/null || true

payload=$(cat <<'EOF'
{
  "name": "Protect main",
  "target": "branch",
  "enforcement": "active",
  "conditions": {
    "ref_name": {
      "include": ["~DEFAULT_BRANCH"],
      "exclude": []
    }
  },
  "rules": [
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": false
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": true,
        "do_not_enforce_on_create": false,
        "required_status_checks": [
          {"context": "Lint"},
          {"context": "Format"},
          {"context": "Test"},
          {"context": "Audit"},
          {"context": "Build"}
        ]
      }
    },
    {
      "type": "non_fast_forward",
      "parameters": {}
    }
  ]
}
EOF
)

existing_id=$(gh api "repos/${REPO}/rulesets" --jq ".[] | select(.name == \"${RULESET_NAME}\") | .id" 2>/dev/null || true)

if [[ -n "${existing_id}" ]]; then
  echo "Updating ruleset ${RULESET_NAME} (id ${existing_id})..."
  gh api --method PUT "repos/${REPO}/rulesets/${existing_id}" --input - <<<"${payload}"
else
  echo "Creating ruleset ${RULESET_NAME}..."
  gh api --method POST "repos/${REPO}/rulesets" --input - <<<"${payload}"
fi

echo "Done."
echo "  - Delete branch on merge: enabled"
echo "  - Auto-merge: enabled"
echo "  - Dependabot security updates: enabled"
echo "  - Branch protection: PR + Lint, Format, Test, Audit, Build"
