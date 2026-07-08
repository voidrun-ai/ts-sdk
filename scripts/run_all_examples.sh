#!/usr/bin/env bash
# Run every script under example/ with env from .env (Node loads VR_API_KEY / VR_API_URL for VoidRun({})).
# Override path: VOIDRUN_TS_SDK_ENV_FILE=/path/to.env bash scripts/run_all_examples.sh

set -uo pipefail

cd "$(dirname "$0")/.."

ENV_FILE="${VOIDRUN_TS_SDK_ENV_FILE:-.env}"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Missing env file: $ENV_FILE (cwd: $(pwd))" >&2
  echo "Create it with VR_API_KEY and VR_API_URL (see README Configuration)." >&2
  exit 1
fi

mapfile -t EXAMPLES < <(
  find example -maxdepth 1 \( -name '*.ts' -o -name '*.cjs' -o -name '*.mjs' \) -type f | sort
)

if [[ ${#EXAMPLES[@]} -eq 0 ]]; then
  echo "No examples found in example/ directory."
  exit 1
fi

echo "Using env file: $ENV_FILE"
echo "Found ${#EXAMPLES[@]} example(s)."
echo ""

FAILED=0
FAILED_LIST=()
for EX in "${EXAMPLES[@]}"; do
  echo "=================================================="
  echo "Running example: $EX"
  echo "=================================================="
  if npx tsx --env-file="$ENV_FILE" "$EX"; then
    echo "--------------------------------------------------"
    echo "✅ SUCCESS: $EX"
    echo "--------------------------------------------------"
  else
    FAILED=$((FAILED + 1))
    FAILED_LIST+=("$EX")
    echo "--------------------------------------------------"
    echo "❌ FAILED: $EX"
    echo "--------------------------------------------------"
  fi
  echo ""
done

if [[ "$FAILED" -gt 0 ]]; then
  echo "$FAILED example(s) failed:"
  for f in "${FAILED_LIST[@]}"; do
    echo "  - $f"
  done
  exit 1
fi

echo "All examples passed."
