# DMV Handbook Update Plan - 2026

## Overview

Update the question bank with 1-10 questions per state reflecting recent DMV handbook changes. Focus on:
1. Replacing poorly written existing questions
2. Adding questions for significant new laws

**Total scope: 8-80 questions across 8 states**

---

## States Requiring Updates

| Priority | State | Code | Update Source | Current Qs |
|----------|-------|------|---------------|------------|
| 1 | Florida | FL | January 2026 (driving-tests.org) | 40 |
| 2 | Texas | TX | Revised December 2024 | 40 |
| 3 | Utah | UT | 2025-2026 edition | 40 |
| 4 | Tennessee | TN | 2026 handbook | 40 |
| 5 | Oregon | OR | 2026 handbook | 40 |
| 6 | North Carolina | NC | 2026 handbook | 40 |
| 7 | Colorado | CO | 2026 handbook | 40 |
| 8 | Illinois | IL | 2026 handbook | 40 |

---

## Question Quality Rules (18 Rules)

All new/updated questions MUST pass these validation rules from `/ralph-loop/prd.json`:

### Content Rules (Avoid Frequently Changing Values)

| Rule | Check | Fail Example |
|------|-------|--------------|
| **1. No dollar amounts** | No specific fines or fees | "The fine is $150" |
| **2. No insurance X/Y/Z format** | No coverage numbers | "15/30/5 coverage" |
| **3. No point values** | No license points mentioned | "You will receive 4 points" |
| **4. No jail times** | No specific imprisonment | "Up to 6 months in jail" |

### Uniqueness Rules

| Rule | Check | Fail Example |
|------|-------|--------------|
| **5. No >80% similarity** | Each question must be distinct | Two questions both asking about school zone speed |
| **6. Max 3 per concept** | Don't over-test one topic | 4th question about stop signs |

### Answer Balance Rules

| Rule | Check | Fail Example |
|------|-------|--------------|
| **7. Length balance** | Correct answer NOT >40% longer than avg wrong answers | Correct: "Stop and wait for pedestrians" vs Wrong: "Go", "Honk", "Speed up" |
| **8. No giveaway qualifiers** | Don't put "always"/"never" only in correct answer | Correct: "Always stop" when others don't use qualifiers |
| **9. A/B/C/D distribution** | Even distribution across questions | After 20 Qs: A=8, B=2, C=5, D=5 |

### Format Rules

| Rule | Check | Fail Example |
|------|-------|--------------|
| **10. Ends with ?** | Question text ends with question mark | "What you should do at a stop sign." |
| **11. All fields present** | question, A-D, correctAnswer, correctIndex, explanation | Missing explanation field |
| **12. Index matches letter** | A=0, B=1, C=2, D=3 | correctAnswer: "C" but correctIndex: 1 |
| **13. AM/PM time format** | Use 12-hour format | "between 14:00 and 16:00" |

### Style Rules

| Rule | Check | Fail Example |
|------|-------|--------------|
| **14. Stem not in answers** | Don't repeat question in answers | Q: "What is the speed limit?" A: "The speed limit is 25" |
| **15. Options similar length** | All 4 options roughly same length | A: "Stop" B: "Go" C: "Slow down and prepare to stop if necessary" D: "Yield" |

### Accuracy Rules

| Rule | Check | Fail Example |
|------|-------|--------------|
| **16. Spelling/grammar** | No errors | "Wat is the spead limit" |
| **17. Fact verified** | Web search to confirm accuracy | Guessing school zone is 20mph without verifying |
| **18. State accuracy** | True for specific state | Using federal law when state differs |

---

## Phase 1: Audit Existing Questions

### Task 1.1: Identify Poorly Written Questions

For each state, review all 40 existing questions and flag those that:

- [ ] Violate any of the 18 quality rules above
- [ ] Contain outdated information
- [ ] Have answer length bias (Rule 7)
- [ ] Use giveaway qualifiers (Rule 8)
- [ ] Have unclear or ambiguous wording
- [ ] Include dollar amounts, points, or jail times (Rules 1-4)

**Output:** List of question IDs to replace per state

### Task 1.2: Research Handbook Changes

For each state, identify 2025-2026 law changes in:

| Category | What to Look For |
|----------|------------------|
| **Cell Phone** | New hands-free requirements, texting penalties |
| **DUI** | BAC limit changes, implied consent updates |
| **GDL** | Permit age, supervised hours, passenger limits |
| **Move Over** | Expanded vehicle coverage |
| **Insurance** | Minimum coverage changes |
| **Speed** | School zone, work zone updates |

**Official Handbook URLs:**

| State | URL |
|-------|-----|
| TN | https://www.tn.gov/safety/driver-services/classd/dlhandbook.html |
| OR | https://www.oregon.gov/odot/dmv/pages/driverid/manual.aspx |
| NC | https://www.ncdot.gov/dmv/license-id/driver-licenses/new-drivers/Pages/driver-handbook.aspx |
| CO | https://dmv.colorado.gov/driver-s-handbook |
| IL | https://www.ilsos.gov/publications/pdf_publications/dsd_a112.pdf |
| FL | https://www.flhsmv.gov/driver-licenses-id-cards/handbooks-manuals/ |
| UT | https://dld.utah.gov/handbooks-and-manuals/ |
| TX | https://www.dps.texas.gov/section/driver-license/texas-driver-handbook |

---

## Phase 2: Question Updates (1-10 per state)

### Update Strategy

For each state, select **1-10 questions** to update based on:

1. **Priority 1:** Replace questions violating Rules 1-4 (dollar amounts, points, jail time)
2. **Priority 2:** Replace questions with answer length bias (Rule 7)
3. **Priority 3:** Add questions for significant new laws
4. **Priority 4:** Replace questions with giveaway qualifiers (Rule 8)

### Question Format

```json
{
  "type": "State-Specific",
  "state": "FL",
  "questionId": "FL-015",
  "category": "cellPhone",
  "question": "Question text ending with question mark?",
  "optionA": "Similar length option",
  "optionB": "Similar length option",
  "optionC": "Similar length option",
  "optionD": "Similar length option",
  "correctAnswer": "B",
  "correctIndex": 1,
  "explanation": "Clear explanation citing handbook section."
}
```

### Per-State Checklist

For each of the 8 states:

- [ ] Review 40 existing questions against 18 rules
- [ ] List questions to replace (max 10)
- [ ] Research handbook for new/changed laws
- [ ] Write replacement questions
- [ ] Validate each new question against all 18 rules
- [ ] Verify facts via web search (Rule 17)

---

## Phase 3: Validation Workflow

### For Each New/Updated Question

```
1. Generate the question
2. Start at Rule 1
3. Check the rule
4. If PASS → go to next rule
5. If FAIL → log failure, fix, restart at Rule 1
6. After all 18 rules pass → save question
7. Move to next question
```

### Validation Log Format

Log all failures to track patterns:

```
Q[state-number] | Rule [id] FAILED | [what went wrong] | [how fixed]
```

Example:
```
FL-015 | Rule 7 FAILED | Answer D (28 chars) >40% longer than avg (18 chars) | Shortened all answers to 15-20 chars
```

### Answer Distribution Check

After updates, verify A/B/C/D distribution remains balanced:
- Each letter should appear ~10 times per 40 questions (25%)
- Acceptable range: 8-12 per letter

---

## Phase 4: Implementation

### Task 4.1: Update questions.json

```bash
# Location
/data/questions.json

# Find state questions
jq '.[] | select(.state == "FL")' data/questions.json
```

### Task 4.2: Validation Commands

```bash
# Check JSON validity
node -e "JSON.parse(require('fs').readFileSync('data/questions.json'))"

# Count questions per state
cat data/questions.json | jq '[.[] | .state] | group_by(.) | map({state: .[0], count: length})'

# Check answer distribution for a state
cat data/questions.json | jq '[.[] | select(.state == "FL") | .correctAnswer] | group_by(.) | map({answer: .[0], count: length})'
```

### Task 4.3: Run Tests

```bash
npm test
npm run build
```

---

## State-Specific Topics to Cover

When writing new questions, focus on these state-variable topics:

### High-Value Topics (Often Change)

- Cell phone/hands-free laws
- GDL restrictions (hours, passengers)
- DUI/BAC limits
- Move Over law coverage
- School bus stopping rules

### Topics to Avoid (Use Rules 1-4)

- Specific fine amounts
- Insurance coverage numbers (X/Y/Z)
- License point values
- Exact jail sentences

### Good Question Patterns

```
✓ "What is required when passing a cyclist in [STATE]?"
✓ "During what hours are GDL nighttime restrictions in effect?"
✓ "What should you do when approaching an emergency vehicle?"
✓ "What is the BAC limit for drivers under 21 in [STATE]?"

✗ "What is the fine for speeding in a school zone?"
✗ "How many points will you receive for running a red light?"
✗ "What is the minimum insurance coverage required?"
```

---

## Deliverables

### Per State (8 total)

- [ ] Audit report: questions flagged for replacement
- [ ] 1-10 new/updated questions passing all 18 rules
- [ ] Validation log of any rule failures during creation

### Final

- [ ] Updated `data/questions.json`
- [ ] All tests passing
- [ ] PR with change summary

---

## Estimated Scope

| State | Est. Questions | Focus Areas |
|-------|----------------|-------------|
| FL | 5-10 | January 2026 changes, cell phone laws |
| TX | 5-8 | December 2024 revision |
| UT | 3-6 | 2025-2026 edition updates |
| TN | 3-6 | GDL updates |
| OR | 3-6 | Cell phone, Move Over |
| NC | 3-6 | DUI law changes |
| CO | 3-5 | Insurance, GDL |
| IL | 3-5 | Cell phone, GDL |

**Total: ~30-60 questions**

---

## References

- Quality rules: `/ralph-loop/prd.json`
- State rules guide: `/ralph-loop/archive/state-driving-test-rules.md`
- Validation log format: `/ralph-loop/validation.txt`
