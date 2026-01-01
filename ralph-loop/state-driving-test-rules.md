# State-Specific Driving Test Question Generator - Ralph Loop

## How to Use (2-Step Process)

### Step 1: Generate Questions

Replace `[STATE]` and `[STATE_DMV]` with your state info:

```
/ralph-loop "Generate 50 [STATE] driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use [STATE]-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done." --max-iterations 12 --completion-promise "50 STATE QUESTIONS COMPLETE"
```

### Step 2: Verify Against Current State Manual

```
/ralph-loop "Verify all questions in [state]-driving-questions.md against the CURRENT [STATE_DMV] Driver Manual using web search. For each factual claim, search to confirm accuracy. Fix any incorrect answers. Say <promise>ALL STATE FACTS VERIFIED</promise> when confirmed." --max-iterations 15 --completion-promise "ALL STATE FACTS VERIFIED"
```

### Examples by State

**New Jersey:**
```
/ralph-loop "Generate 50 New Jersey driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use NJ-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done."
```

**California:**
```
/ralph-loop "Generate 50 California driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use CA-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done."
```

**Texas:**
```
/ralph-loop "Generate 50 Texas driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use TX-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done."
```

---

## Output File

Save questions to: `[state]-driving-questions.md`

Examples:
- `nj-driving-questions.md`
- `ca-driving-questions.md`
- `tx-driving-questions.md`

---

## Required Fields Per Question

```
## Question [NUMBER]: [TOPIC]

**[QUESTION TEXT]?**

A) [Option A]
B) [Option B]
C) [Option C]
D) [Option D]

**Correct Answer:** [LETTER]) [Answer text]
**Correct Index:** [1-4]
**Explanation:** [Why this answer is correct - cite state law if applicable]
```

---

## STATE-SPECIFIC Topics to INCLUDE

These topics typically VARY by state and should be researched for each state:

### Speed Limits
- Default residential speed limit
- Default school zone speed limit
- Maximum highway speed limit
- Speed limits in business districts
- Speed limits near playgrounds

### Parking Distances
- Distance from fire hydrant
- Distance from stop sign
- Distance from crosswalk
- Distance from railroad crossing
- Distance from fire station
- Distance from intersection

### Passing & Following
- Bicycle/cyclist passing distance
- Following distance requirements
- Passing zone rules

### Licensing
- GDL/graduated license restrictions
- Passenger limits for new drivers
- Nighttime driving restrictions
- License renewal period
- Permit requirements

### Alcohol & Impairment
- BAC limit for drivers 21+
- BAC limit for drivers under 21
- Zero tolerance laws
- Implied consent rules

### Cell Phone & Electronics
- Handheld phone restrictions
- Texting laws
- Hands-free requirements
- Exceptions for emergencies

### Required Equipment & Documents
- Required documents to carry
- Insurance requirements
- Registration requirements
- Inspection requirements

### School Buses
- Stopping rules on divided highways
- Stopping distance from bus
- When to stop vs proceed

### Turn Signals
- Signal distance before turn
- Signal requirements

### Headlights
- When headlights required
- High beam dimming distance
- Headlight use in rain/wipers

### Move Over Law
- Which vehicles covered
- Required actions

### Right of Way
- Right turn on red rules
- U-turn restrictions
- Pedestrian crosswalk rules

### Parking
- Uphill/downhill wheel position
- Parallel parking rules
- Handicap parking rules

---

## THE 17 RULES

### Content Rules (4)

| # | Rule | Example Violation |
|---|------|-------------------|
| 1 | No dollar amounts | "The fine is $150" |
| 2 | No insurance X/Y/Z format | "15/30/5 coverage" |
| 3 | No point values | "You will receive 4 points" |
| 4 | No exact jail times | "Up to 6 months in jail" |

### Uniqueness Rules (2)

| # | Rule | Description |
|---|------|-------------|
| 5 | No >80% similarity | Each question must be distinct from all others |
| 6 | Max 3 questions per concept | E.g., max 3 about stop signs, max 3 about BAC, etc. |

### Answer Balance Rules (3)

| # | Rule | Description |
|---|------|-------------|
| 7 | Length balance | Correct answer must NOT be >40% longer than average of wrong answers |
| 8 | No giveaway qualifiers | Don't put "always"/"never" only in the correct answer |
| 9 | Position distribution | 12-13 each of A, B, C, D (totaling 50) |

### Format Rules (4)

| # | Rule | Description |
|---|------|-------------|
| 10 | Question punctuation | Every question must end with ? |
| 11 | All fields present | Question, Options A-D, CorrectAnswer, CorrectIndex, Explanation |
| 12 | Letter/Index match | If answer is B, CorrectIndex must be 2 |
| 13 | Consistent time format | Use AM/PM format throughout (not 24-hour) |

### Style Rules (2)

| # | Rule | Description |
|---|------|-------------|
| 14 | No repetition | Don't repeat the question stem in the answers |
| 15 | Similar answer lengths | All 4 options should be roughly the same length |

### Accuracy Rules (2)

| # | Rule | Description |
|---|------|-------------|
| 16 | Quality check | No spelling errors, no grammar issues, clear wording |
| 17 | State accuracy | All facts verified against current state driver manual |

---

## Validation Checklist

Before outputting the completion promise, verify:

- [ ] Exactly 50 questions
- [ ] Count A answers = 12 or 13
- [ ] Count B answers = 12 or 13
- [ ] Count C answers = 12 or 13
- [ ] Count D answers = 12 or 13
- [ ] Total A+B+C+D = 50
- [ ] No dollar amounts anywhere
- [ ] No insurance formats anywhere
- [ ] No point values anywhere
- [ ] No jail times anywhere
- [ ] No two questions >80% similar
- [ ] No concept appears >3 times
- [ ] No correct answer >40% longer than wrong answer average
- [ ] No "always/never" giveaways
- [ ] All questions end with ?
- [ ] All fields present for each question
- [ ] CorrectIndex matches CorrectAnswer letter
- [ ] Time format consistent (AM/PM)
- [ ] No question stem repeated in answers
- [ ] Answer lengths balanced per question
- [ ] Spelling correct
- [ ] Grammar correct
- [ ] All answers accurate for the specified state

---

## Letter to Index Mapping

| Letter | Index |
|--------|-------|
| A | 1 |
| B | 2 |
| C | 3 |
| D | 4 |

---

## Version

- Created: 2026-01-01
- Rules: 17
- Questions: 50 per state
- Scope: State-specific (use for any US state)
