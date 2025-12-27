# Question Generation Agent Prompt

You are generating multiple-choice driving test questions. Your goal: questions that test **understanding**, not memorization.

---

## CRITICAL: Answer Position Distribution

**You MUST cycle through correct answer positions to ensure even distribution.**

| Question # | Correct Answer |
|------------|----------------|
| 1, 5, 9, 13, 17, 21, 25, 29, 33, 37 | A |
| 2, 6, 10, 14, 18, 22, 26, 30, 34, 38 | B |
| 3, 7, 11, 15, 19, 23, 27, 31, 35, 39 | C |
| 4, 8, 12, 16, 20, 24, 28, 32, 36, 40 | D |

This ensures exactly 25% for each position. **DO NOT deviate from this pattern.**

When writing each question, FIRST determine which position (A/B/C/D) must be correct based on the question number, THEN write the question with the correct answer in that position.

---

## Output Format

Output valid JSON array:

```json
[
  {
    "type": "Universal",
    "state": "ALL",
    "questionId": "U-001",
    "category": "roadSigns",
    "question": "What shape is a stop sign?",
    "optionA": "Octagon",
    "optionB": "Triangle",
    "optionC": "Circle",
    "optionD": "Diamond",
    "correctAnswer": "A",
    "correctIndex": 0,
    "explanation": "Stop signs are octagonal so they're recognizable even when faded or snow-covered."
  }
]
```

### Field Rules
- `type`: "Universal" or "State-Specific"
- `state`: "ALL" for universal, or 2-letter state code (CA, TX, etc.)
- `questionId`: "U-001" format for universal, "CA-001" format for states
- `question`: Must end with `?`
- `correctAnswer`: "A", "B", "C", or "D" (follows cycling pattern above)
- `correctIndex`: 0, 1, 2, or 3 (must match: A=0, B=1, C=2, D=3)
- `explanation`: 1-2 sentences, explains why answer is correct

---

## Answer Length Rules

**Match answer length to question type:**

### Type 1: Simple Facts (1-3 words)
Colors, shapes, ages, single values.

```
Q: What color is a yield sign?
A) Red and white
B) Yellow and black
C) Green and white
D) Orange and black
```

### Type 2: Short Actions (3-6 words)
"What should you do" or "when" questions.

```
Q: When must you use headlights?
A) Only at night
B) 30 minutes after sunset
C) When visibility is reduced
D) Only in rain
```

### Type 3: Brief Explanations (6-12 words)
Consequences, conditions, or "why" questions.

```
Q: What happens if you refuse a breathalyzer?
A) Warning for first offense
B) Automatic license suspension
C) No penalty until convicted
D) Fine but no suspension
```

---

## Critical Rules

### DO
- Test understanding of concepts
- Use the **shortest natural answer** that works
- **Follow the A/B/C/D cycling pattern strictly**
- Make all wrong answers plausible
- Keep explanations brief and useful

### DO NOT
- Ask exact dollar amounts ("What is the fine for...")
- Ask specific point values ("How many points for...")
- Ask insurance minimums in X/Y/Z format (like 25/50/25)
- Pad answers to equal length artificially
- Make correct answer longer/more detailed than others
- Use "All of the above" or "None of the above"
- Put "always" or "never" only on the correct answer

---

## Bad vs Good Examples

### Bad: Verbose Padding
```
Q: What does a green sign indicate?
A) Green signs typically indicate a warning ahead
B) Green signs provide guidance and directions
C) Green signs indicate a regulation requirement
D) Green signs indicate construction zones
```

### Good: Concise
```
Q: What does a green sign indicate?
A) Warning
B) Guidance and directions
C) Regulation
D) Construction
```

### Bad: Memorization Question
```
Q: What is the fine for running a red light in California?
A) $100
B) $238
C) $490
D) $750
```

### Good: Conceptual Question
```
Q: What can result from running a red light?
A) Warning only
B) Fine and points on license
C) License suspension
D) No penalty if no accident
```

---

## Insurance Questions (IMPORTANT)

Insurance questions often lead to memorization. Here's how to avoid it:

### BAD - Tests Memorization
```
Q: What are the minimum liability limits in California?
A) 15/30/5
B) 25/50/10
C) 30/60/15
D) 50/100/25
```

### GOOD - Tests Understanding
```
Q: What type of insurance system does California use?
A) No-fault
B) At-fault/tort
C) Hybrid
D) Choice system

Q: What does liability insurance primarily cover?
A) Damage to your own vehicle
B) Damage you cause to others
C) Theft of your vehicle
D) Your own medical bills

Q: What happens if you drive without required insurance?
A) Warning for first offense
B) Fine and possible license suspension
C) No penalty unless in accident
D) Points on license only

Q: Why do states require liability insurance?
A) To generate revenue
B) To protect other drivers from uninsured losses
C) To reduce traffic
D) To limit vehicle ownership
```

**Never ask about specific dollar amounts, X/Y/Z formats, or exact minimums.**

---

## Validation Checklist

Before submitting, verify:
- [ ] Answer positions follow the cycling pattern (Q1=A, Q2=B, Q3=C, Q4=D, Q5=A...)
- [ ] All questions end with `?`
- [ ] `correctAnswer` letter matches `correctIndex` number
- [ ] No empty fields
- [ ] Answers follow length rules for question type
- [ ] Correct answer is NOT systematically longer
- [ ] No exact fines, points, dollar amounts, or insurance X/Y/Z numbers
- [ ] All wrong answers are plausible

---

## Categories

### Universal (160 total)
| Category | Count | Slug |
|----------|-------|------|
| Road Signs | 50 | `roadSigns` |
| Rules of the Road | 40 | `rulesOfRoad` |
| Safe Driving | 35 | `safeDriving` |
| Special Situations | 20 | `specialSituations` |
| Alcohol/DUI Basics | 15 | `alcoholDUI` |

### State-Specific (40 per state)
| Category | Count | Slug |
|----------|-------|------|
| GDL/Licensing | 12 | `gdlLicensing` |
| Cell Phone Laws | 6 | `cellPhone` |
| DUI State Laws | 8 | `duiStateLaws` |
| Insurance | 4 | `insurance` |
| State Unique | 10 | `stateUnique` |
