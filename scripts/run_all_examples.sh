#!/bin/bash
# /root/workspace/vr-work/ts-sdk/scripts/run_all_examples.sh

# Ensure we are in the ts-sdk directory
cd "$(dirname "$0")/.."

# Get all files in the example directory
EXAMPLES=$(ls example/*.ts example/*.cjs example/*.mjs 2>/dev/null)

if [ -z "$EXAMPLES" ]; then
  echo "No examples found in example/ directory."
  exit 1
fi

for EX in $EXAMPLES; do
  echo "=================================================="
  echo "Running example: $EX"
  echo "=================================================="
  
  # Run the example using tsx and the .env file
  npx tsx --env-file=.env "$EX"
  
  if [ $? -ne 0 ]; then
    echo "--------------------------------------------------"
    echo "❌ FAILED: $EX"
    echo "--------------------------------------------------"
  else
    echo "--------------------------------------------------"
    echo "✅ SUCCESS: $EX"
    echo "--------------------------------------------------"
  fi
  echo ""
done
