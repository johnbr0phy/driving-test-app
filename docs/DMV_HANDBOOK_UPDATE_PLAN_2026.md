# DMV Handbook Update Plan - 2026

## Overview

Update the question bank with improved questions reflecting recent DMV handbook changes.
- **Maintain exactly 40 questions per state**
- **Replace 1-10 poorly written questions per state**

---

## Audit Results

### Quality Summary by State

| State | Generic Explanations | Jail Mentions | Other Issues | Quality |
|-------|---------------------|---------------|--------------|---------|
| **FL** | 0/40 | 0 | None | Good |
| **CO** | 0/40 | 0 | None | Good |
| **IL** | 0/40 | 1 (IL-022) | None | Good |
| **NC** | 40/40 | 0 | All explanations generic | Poor |
| **OR** | 40/40 | 0 | All explanations generic | Poor |
| **TN** | 40/40 | 1 (TN-022) | All explanations generic | Poor |
| **TX** | 40/40 | 1 (TX-025) | All explanations generic | Poor |
| **UT** | 39/40 | 1 (UT-023) | Almost all explanations generic | Poor |

### Critical Finding

**5 states have ALL questions with generic placeholder explanations:**
```
"This is the correct answer based on [XX] driving laws."
```

This provides no educational value to users.

---

## Questions to Replace

### Tier 1: Good Quality States (minimal changes)

#### Florida (FL) - 0-2 questions
Current quality is good. Review for 2026 handbook changes only.
- Check if any laws changed in January 2026 update
- No questions currently flagged for replacement

#### Colorado (CO) - 0-2 questions
Current quality is good. Review for 2026 handbook changes only.
- No questions currently flagged for replacement

#### Illinois (IL) - 1-3 questions
Current quality is good except:
- **IL-022**: Mentions "Mandatory jail time" as answer option (Rule 4 violation)

```
Replace: IL-022
Reason: Answer option mentions jail time
```

---

### Tier 2: Poor Quality States (need 5-10 replacements each)

These states have ALL 40 questions with useless generic explanations. Priority is to replace the worst questions with high-quality ones that have proper explanations.

#### Tennessee (TN) - Replace 10 questions

| Question ID | Issue | Priority |
|-------------|-------|----------|
| TN-022 | Asks about jail time (Rule 4) | High |
| TN-001 to TN-010 | Generic explanations, review content | Medium |

**Recommended replacements:** TN-001, TN-005, TN-010, TN-015, TN-020, TN-022, TN-025, TN-030, TN-035, TN-040

#### Oregon (OR) - Replace 10 questions

| Question ID | Issue | Priority |
|-------------|-------|----------|
| All 40 | Generic explanations | Medium |

**Recommended replacements:** OR-001, OR-005, OR-010, OR-015, OR-020, OR-025, OR-030, OR-035, OR-038, OR-040

#### North Carolina (NC) - Replace 10 questions

| Question ID | Issue | Priority |
|-------------|-------|----------|
| All 40 | Generic explanations | Medium |

**Recommended replacements:** NC-001, NC-005, NC-010, NC-015, NC-020, NC-025, NC-030, NC-035, NC-038, NC-040

#### Texas (TX) - Replace 10 questions

| Question ID | Issue | Priority |
|-------------|-------|----------|
| TX-025 | Mentions jail sentence (Rule 4) | High |
| All 40 | Generic explanations | Medium |

**Recommended replacements:** TX-001, TX-005, TX-010, TX-015, TX-020, TX-025, TX-030, TX-035, TX-038, TX-040

#### Utah (UT) - Replace 10 questions

| Question ID | Issue | Priority |
|-------------|-------|----------|
| UT-023 | Mentions jail time as option (Rule 4) | High |
| 39/40 | Generic explanations | Medium |

**Recommended replacements:** UT-001, UT-005, UT-010, UT-015, UT-020, UT-023, UT-030, UT-035, UT-038, UT-040

---

## Questions Flagged for Jail Time (Rule 4)

These must be replaced:

### IL-022
```
Q: What happens if an Illinois driver refuses chemical testing after a first DUI arrest?
D: Mandatory jail time required  ← VIOLATION
```

### TN-022
```
Q: At what BAC level does Tennessee require mandatory minimum jail time?  ← VIOLATION
```

### TX-025
```
Q: What enhanced penalty applies for DWI with a child passenger in Texas?
B: Doubled jail sentence  ← VIOLATION
```

### UT-023
```
Q: What happens if you refuse a BAC test in Utah under implied consent law?
D: Mandatory jail time  ← VIOLATION
```

---

## Replacement Summary

| State | Questions to Replace | IDs |
|-------|---------------------|-----|
| FL | 0-2 | (review only) |
| CO | 0-2 | (review only) |
| IL | 1-3 | IL-022 + review |
| TN | 10 | TN-001,005,010,015,020,022,025,030,035,040 |
| OR | 10 | OR-001,005,010,015,020,025,030,035,038,040 |
| NC | 10 | NC-001,005,010,015,020,025,030,035,038,040 |
| TX | 10 | TX-001,005,010,015,020,025,030,035,038,040 |
| UT | 10 | UT-001,005,010,015,020,023,030,035,038,040 |

**Total: ~53-57 questions to replace**

---

## Question Quality Rules (18 Rules)

All replacement questions MUST pass these validation rules:

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

## Question Format

```json
{
  "type": "State-Specific",
  "state": "TN",
  "questionId": "TN-001",
  "category": "gdlLicensing",
  "question": "Question text ending with question mark?",
  "optionA": "Similar length option",
  "optionB": "Similar length option",
  "optionC": "Similar length option",
  "optionD": "Similar length option",
  "correctAnswer": "B",
  "correctIndex": 1,
  "explanation": "Detailed explanation of why this is correct, citing the specific law or handbook section. Example: Tennessee requires learner's permit holders to complete 50 hours of supervised driving practice, including 10 hours at night, before applying for a Class D license."
}
```

**Explanation requirements:**
- Explain WHY the answer is correct
- Reference specific state law or handbook section when possible
- Provide educational context
- NO generic phrases like "This is the correct answer based on..."

---

## Official Handbook URLs

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

## Execution Order

1. **IL** - Replace IL-022 (jail time violation)
2. **TN** - Replace 10 questions including TN-022
3. **TX** - Replace 10 questions including TX-025
4. **UT** - Replace 10 questions including UT-023
5. **OR** - Replace 10 questions
6. **NC** - Replace 10 questions
7. **FL** - Review for 2026 changes (replace if needed)
8. **CO** - Review for 2026 changes (replace if needed)

---

## Validation Commands

```bash
# Check JSON validity
node -e "JSON.parse(require('fs').readFileSync('data/questions.json'))"

# Count questions per state
cat data/questions.json | jq '[.[] | .state] | group_by(.) | map({state: .[0], count: length})'

# Find generic explanations
cat data/questions.json | jq '.[] | select(.explanation | test("This is the correct answer based on")) | .questionId'

# Check answer distribution
cat data/questions.json | jq '[.[] | select(.state == "TN") | .correctAnswer] | group_by(.) | map({answer: .[0], count: length})'

# Verify no jail mentions
cat data/questions.json | jq '.[] | select(.question + .optionA + .optionB + .optionC + .optionD | test("jail|prison"; "i")) | .questionId'
```

---

## References

- Quality rules: `/ralph-loop/prd.json`
- State rules guide: `/ralph-loop/archive/state-driving-test-rules.md`
- Validation log format: `/ralph-loop/validation.txt`
