---
name: generate-questions
description: Start question generation Ralph loop
arguments:
  - name: scope
    description: "universal or state codes (e.g., 'CA,CO,CT')"
    required: true
  - name: count
    description: "Number of questions (default: 160 for universal, 40 per state)"
    required: false
---

# Initialize session

```bash
python3 scripts/init-session.py "$ARGUMENTS"
```

# Start Ralph loop

Read CLAUDE.md for instructions. Generate questions one at a time.
The Stop hook will validate each question and tell you what to do next.

When complete, output:
<promise>COMPLETE</promise>
