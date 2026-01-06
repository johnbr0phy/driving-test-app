#!/bin/bash
set -e

# Ralph Loop - Run coding agent in a loop until PRD is complete
# Usage: ./ralph.sh <max_iterations>

MAX_ITERATIONS=${1:?Please provide max iterations as first argument}

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

for ((i=1; i<=MAX_ITERATIONS; i++)); do
    echo ""
    echo "============================================"
    echo "Ralph Loop - Iteration $i of $MAX_ITERATIONS"
    echo "============================================"
    echo ""

    OUTPUT=$(claude --print \
        "$SCRIPT_DIR/prd.json" \
        "$SCRIPT_DIR/progress.txt" \
        "$SCRIPT_DIR/validation.txt" \
        -p "You are working through a PRD to generate driving test questions.

FILES:
- prd.json: Rules (18), workflow, tasks, output format
- progress.txt: Your notes from previous iterations
- validation.txt: Log of rule failures (append to this)

WORKFLOW FOR EACH QUESTION:

┌─────────────────────────────────────────────┐
│ Generate Question N                         │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ Check Rule 1: No dollar amounts             │
│ PASS → Go to Rule 2                         │
│ FAIL → Log to validation.txt, fix, Rule 1   │
└─────────────────┬───────────────────────────┘
                  ▼
┌─────────────────────────────────────────────┐
│ Check Rule 2: No insurance format           │
│ PASS → Go to Rule 3                         │
│ FAIL → Log to validation.txt, fix, Rule 1   │
└─────────────────┬───────────────────────────┘
                  ▼
        ... Rules 3-17 ...
                  ▼
┌─────────────────────────────────────────────┐
│ Check Rule 18: Universal truth              │
│ PASS → Save question, go to Question N+1    │
│ FAIL → Log to validation.txt, fix, Rule 1   │
└─────────────────────────────────────────────┘

WHEN A RULE FAILS:
1. Append to validation.txt:
   'Q[N] | Rule [X] FAILED | [what went wrong] | [how you fixed it]'
2. Fix the question
3. Restart validation from Rule 1 (not where you left off)

WHEN ALL 18 RULES PASS:
- Save question to the JSON file
- Move to next question

WHEN TASK IS COMPLETE:
- Update prd.json: passes: true
- Append summary to progress.txt
- Git commit

If ALL tasks have passes: true, output:
<promise>COMPLETE</promise>")

    echo "$OUTPUT"

    if [[ "$OUTPUT" == *"<promise>COMPLETE</promise>"* ]]; then
        echo ""
        echo "============================================"
        echo "All PRD tasks complete!"
        echo "============================================"
        exit 0
    fi
done

echo ""
echo "============================================"
echo "Reached max iterations ($MAX_ITERATIONS)"
echo "============================================"
