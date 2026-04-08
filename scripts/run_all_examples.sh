#!/usr/bin/env bash
# Run every script under example/ with ts-sdk/.env (same idea as py-sdk/scripts/run_all_examples.sh).

set -uo pipefail

cd "$(dirname "$0")/.."

mapfile -t EXAMPLES < <(
  find example -maxdepth 1 \( -name '*.ts' -o -name '*.cjs' -o -name '*.mjs' \) -type f | sort
)

if [[ ${#EXAMPLES[@]} -eq 0 ]]; then
  echo "No examples found in example/ directory."
  exit 1
fi

FAILED=0
for EX in "${EXAMPLES[@]}"; do
  echo "=================================================="
  echo "Running example: $EX"
  echo "=================================================="
  if npx tsx --env-file=.env "$EX"; then
    echo "--------------------------------------------------"
    echo "✅ SUCCESS: $EX"
    echo "--------------------------------------------------"
  else
    FAILED=$((FAILED + 1))
    echo "--------------------------------------------------"
    echo "❌ FAILED: $EX"
    echo "--------------------------------------------------"
  fi
  echo ""
done

if [[ "$FAILED" -gt 0 ]]; then
  echo "$FAILED example(s) failed."
  exit 1
fi

echo "All examples passed."
