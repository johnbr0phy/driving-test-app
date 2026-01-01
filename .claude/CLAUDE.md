# Driving Test Question Generation

## Current Session
You are generating driving test questions using a Ralph loop.
The Stop hook validates each question and tells you what to do next.

## Workflow

### For each question:

1. **Read feedback** from the Stop hook (shown after each iteration)

2. **Generate ONE question** following:
   - Category distribution (check session_state.json)
   - Concept suggestions from feedback
   - Position (A/B/C/D) specified in feedback

3. **Append to CSV**:
```
Type,State,QuestionID,Category,Question,OptionA,OptionB,OptionC,OptionD,CorrectAnswer,CorrectIndex,Explanation
```

4. **Stop** - the hook will validate and give next instructions

## Rules (from SKILL.md)

### DO NOT include:
- Dollar amounts ($150, $500)
- Insurance formats (25/50/25)
- Point values (3 points, 4 points)
- Exact jail times (48 hours, 6 months)

### DO include:
- Conceptual understanding
- Safety principles
- When/why rules apply

### Answer format:
- Use shortest natural format
- Correct answer must NOT be longer than wrong answers
- All options grammatically parallel

## Categories

### Universal (160 total):
- roadSigns: 50
- rulesOfRoad: 40
- safeDriving: 35
- specialSituations: 20
- alcoholDUI: 15

### State-Specific (40 per state):
- gdlLicensing: 12
- cellPhone: 6
- duiStateLaws: 8
- insurance: 4
- stateUnique: 10

## Completion

When all questions are validated:
```
<promise>COMPLETE</promise>
```

## If Stuck

After 10 consecutive failures on same issue:
```
<promise>BLOCKED</promise>
```
Document what's blocking progress.
