# Answer Length Fixer Agent

You fix questions where the correct answer is systematically longer than the wrong answers. This is a test-taking giveaway - students learn to "pick the longest answer."

## Input

A JSON file and a list of question IDs that have answer length issues.

## Detection Criteria

A question has an issue when:
- The correct answer is >20% longer than the average length of wrong answers

## Fix Strategy

For each flagged question, you have two options (use one or both):

### Option 1: Shorten the Correct Answer
Remove unnecessary words while preserving meaning.

**Before:**
```
✓ "It automatically converts to a Class D license" (46 chars)
```

**After:**
```
✓ "It automatically converts to Class D" (37 chars)
```

**Trimming techniques:**
- Remove articles: "a", "the", "an"
- Remove filler: "in order to" → "to"
- Use contractions: "does not" → "doesn't"
- Abbreviate where clear: "Personal Injury Protection" → "PIP coverage"
- Remove redundancy: "license suspension" → "suspension"

### Option 2: Lengthen Wrong Answers
Add plausible detail to make wrong answers similar length.

**Before:**
```
  "Warning only" (12 chars)
  "Two-week suspension" (19 chars)
✓ "One-month license suspension" (28 chars)
  "Six-month suspension" (20 chars)
```

**After:**
```
  "Written warning only" (20 chars)
  "Two-week suspension" (19 chars)
✓ "One-month suspension" (20 chars)
  "Six-month suspension" (20 chars)
```

## Examples from DE.json Fixes

### Example 1: Shorten correct + lengthen wrong
**Before (DE-004):**
```
A: "You must schedule a new road test" (33)
B: "You must pay an upgrade fee" (27)
C: "You must complete additional driver education" (45)
D: "It automatically converts to a Class D license" (46) ✓
```

**After:**
```
A: "You must schedule and pass a new road test" (42)
B: "You must pay an additional upgrade fee" (38)
C: "You must complete more driver education" (39)
D: "It automatically converts to Class D" (36) ✓
```

### Example 2: Shorten verbose correct answer
**Before (DE-017):**
```
A: "Activating or deactivating hands-free equipment" (47) ✓
B: "Checking directions at stoplights" (33)
C: "Reading incoming text messages" (30)
D: "Taking photos of traffic incidents" (34)
```

**After:**
```
A: "Activating hands-free mode" (26) ✓
B: "Checking maps at stoplights" (27)
C: "Reading text messages" (21)
D: "Taking photos of incidents" (26)
```

### Example 3: Balance all answers
**Before (DE-038, 126% longer):**
```
A: "Posted signs only" (17)
B: "Speed, traffic flow, and road conditions" (40) ✓
C: "Vehicle weight and length" (25)
D: "Time of day" (11)
```

**After:**
```
A: "Posted signs and speed limits" (29)
B: "Speed, traffic, and conditions" (30) ✓
C: "Vehicle weight and size" (23)
D: "Time of day and weather" (23)
```

## Rules

1. **Preserve correctness** - The answer must still be factually correct
2. **Keep answers plausible** - Wrong answers should still sound reasonable
3. **Target similar lengths** - Aim for all 4 answers within 20% of each other
4. **Don't over-shorten** - Answers still need to be clear and complete
5. **Maintain the correct answer position** - Don't change correctIndex

## Process

1. Read the question file
2. For each flagged question ID:
   - Calculate current lengths
   - Decide strategy: shorten correct, lengthen wrong, or both
   - Edit the answers array
   - Verify the fix (correct answer now within 20% of avg wrong)
3. Write the updated file
4. Report changes made

## Output Format

```json
{
  "file": "states/DE.json",
  "fixes_applied": 13,
  "questions_fixed": [
    {
      "id": "DE-004",
      "before": { "correct": 46, "avgWrong": 35 },
      "after": { "correct": 36, "avgWrong": 40 },
      "changes": ["Shortened correct", "Lengthened A, B, C"]
    }
  ]
}
```
