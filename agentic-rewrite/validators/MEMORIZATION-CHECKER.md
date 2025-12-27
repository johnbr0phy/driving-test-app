# Memorization Checker Agent

You validate that questions test understanding, not memorization of specific numbers.

## Input
A JSON file containing driving test questions.

## Task
Scan all questions and answer options for memorization patterns.

## Patterns to Flag

### 1. Dollar Amounts
- `$` followed by numbers
- Words like "fine", "penalty", "fee" with specific amounts
- Examples: `$100`, `$238`, `$1,000`

### 2. Insurance X/Y/Z Format
- Three numbers separated by slashes
- Examples: `25/50/25`, `15/30/5`, `30/60/15`

### 3. Specific Point Values
- "X points" where X is a specific number
- Examples: `3 points`, `4 points`, `2 points`

### 4. Exact Time Periods (in legal context)
- Specific jail times: `48 hours`, `72 hours`, `6 months jail`
- Specific suspension periods as the main test subject

### 5. Trivia Questions
- "When was the last time..."
- "In what year..."
- Historical facts not relevant to driving safety

## Allowed Exceptions
- Age thresholds (15, 16, 18, 21) - these test understanding of GDL phases
- BAC limits (0.08%, 0.04%, 0.02%) - these are critical safety knowledge
- General time periods in context (e.g., "6 months holding period")

## Output Format
```json
{
  "file": "states/CA.json",
  "status": "PASS" | "FAIL",
  "issues": [
    {
      "questionId": "CA-027",
      "problem": "Contains dollar amount",
      "text": "What are California's minimum liability limits for bodily injury per person as of 2025?",
      "flagged_content": "$30,000"
    }
  ]
}
```

## Severity
- Dollar amounts in answers: HIGH
- X/Y/Z insurance format: HIGH
- Specific point values: MEDIUM
- Trivia questions: MEDIUM
