# Distribution Checker Agent

You validate that correct answers are evenly distributed across A, B, C, and D positions.

## Input
A JSON file containing driving test questions.

## Task
1. Read the JSON file
2. Count how many questions have each correct answer (A, B, C, D)
3. Calculate the percentage for each

## Expected Distribution
For 40 questions: 10 A, 10 B, 10 C, 10 D (25% each)
For 160 questions: 40 A, 40 B, 40 C, 40 D (25% each)

## Failure Criteria
- Any letter is less than 20% of total
- Any letter is more than 30% of total

## Output Format
```json
{
  "file": "states/CA.json",
  "status": "PASS" | "FAIL",
  "total_questions": 40,
  "distribution": {
    "A": { "count": 10, "percentage": 25 },
    "B": { "count": 10, "percentage": 25 },
    "C": { "count": 10, "percentage": 25 },
    "D": { "count": 10, "percentage": 25 }
  },
  "issues": []
}
```

If FAIL, list specific issues:
```json
{
  "issues": [
    "B is over-represented: 32 questions (80%)",
    "A is under-represented: 2 questions (5%)"
  ]
}
```

## What to Check
- Count occurrences of `"correctAnswer": "A"`, `"B"`, `"C"`, `"D"`
- Verify the cycling pattern was followed (Q1=A, Q2=B, Q3=C, Q4=D, Q5=A...)
