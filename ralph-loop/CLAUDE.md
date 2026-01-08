# Ralph Loop - AI Agent Instructions

## Overview
You are generating driving test questions. Read `kanban.json` to find your tasks.

## Output Location
**TEST MODE**: Save all output to `test-output/` folder (not the main questions folder)

## Question Format
```json
{
  "id": 1,
  "topic": "Parking",
  "question": "How far from a fire hydrant must you park in New Jersey?",
  "options": {
    "A": "At least 5 feet",
    "B": "At least 10 feet",
    "C": "At least 15 feet",
    "D": "At least 20 feet"
  },
  "correctAnswer": "B",
  "correctIndex": 2,
  "explanation": "New Jersey law prohibits parking within 10 feet of a fire hydrant."
}
```

## The 18 Validation Rules

**CRITICAL**: Check EACH rule. If ANY fails, fix it before saving.

| # | Rule | Check | Fail Example |
|---|------|-------|--------------|
| 1 | No dollar amounts | No specific $ amounts | "The fine is $150" |
| 2 | No insurance X/Y/Z | No coverage numbers | "15/30/5 coverage" |
| 3 | No point values | No license points | "4 points on your license" |
| 4 | No jail times | No prison durations | "Up to 6 months in jail" |
| 5 | No >80% similarity | Not too similar to others | Two school zone speed questions |
| 6 | Max 3 per concept | ≤3 questions per topic | 4th stop sign question |
| 7 | Answer length balance | Correct ≤40% longer than avg | Correct: long sentence, Wrong: "Go", "Honk" |
| 8 | No giveaway qualifiers | Don't only use always/never in correct | Only correct has "always" |
| 9 | A/B/C/D distribution | Even spread of correct answers | 8 A's, 2 B's after 20 questions |
| 10 | Ends with ? | Question mark at end | "What you should do." |
| 11 | All fields present | Has all required fields | Missing explanation |
| 12 | Index matches letter | A=1, B=2, C=3, D=4 | correctAnswer: C, correctIndex: 2 |
| 13 | AM/PM time format | Use 12-hour clock | "between 14:00 and 16:00" |
| 14 | Stem not in answers | Don't repeat question in answer | Q: "speed limit?" A: "The speed limit is..." |
| 15 | Options similar length | All 4 options ~same length | A: "Stop" vs C: "Slow down and prepare..." |
| 16 | Spelling/grammar | No typos | "Wat is the spead limit" |
| 17 | Fact verified | Web search to confirm | Guessing NJ school zone is 20mph |
| 18 | Universal truth | True in all 50 states (if universal) | "Right on red always allowed" |

## Workflow

1. Pick a task from `kanban.json` TODO
2. Move it to IN_PROGRESS (update the json)
3. Generate questions one at a time
4. Validate each against ALL 18 rules
5. Log any failures to `validation.txt`
6. Save valid questions to `test-output/{filename}.json`
7. Move task to DONE (update the json)

## Files
- `kanban.json` - Your task board
- `prd.json` - Full rule details
- `validation.txt` - Log failures here
- `test-output/` - Save questions here
