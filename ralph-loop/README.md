# Driving Test Question Generator

Monthly regeneration of driving test questions using Claude Code's Ralph Loop technique.

## Overview

This system generates two types of questions:
- **State-specific questions** (50 per state) - Topics that vary by state law
- **Universal questions** (150 total) - Topics that are the same in all 50 US states

## Monthly Regeneration Process

### Step 1: Check for New DMV Handbooks

Run this command first to check if any state has updated their driver manual:

```
/ralph-loop "Search the web for the latest DMV driver manual versions for [STATE]. Compare against handbook-versions.md. If a newer version exists, update handbook-versions.md with the new version date and set needs_regeneration: true. Say <promise>VERSION CHECK COMPLETE</promise> when done." --max-iterations 5 --completion-promise "VERSION CHECK COMPLETE"
```

### Step 2: Generate State Questions (if needed)

For each state that needs regeneration:

```
/ralph-loop "Generate 50 [STATE] driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use [STATE]-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done." --max-iterations 12 --completion-promise "50 STATE QUESTIONS COMPLETE"
```

### Step 3: Verify State Questions

```
/ralph-loop "Verify all questions in [state]-driving-questions.md against the CURRENT [STATE_DMV] Driver Manual using web search. For each factual claim, search to confirm accuracy. Fix any incorrect answers. Say <promise>ALL STATE FACTS VERIFIED</promise> when confirmed." --max-iterations 15 --completion-promise "ALL STATE FACTS VERIFIED"
```

### Step 4: Generate Universal Questions (if needed)

Only regenerate if significant changes to traffic laws nationwide:

```
/ralph-loop "Generate 150 universal driving test questions following ALL rules in universal-driving-test-rules.md. These must work in ANY US state. Say <promise>150 UNIVERSAL QUESTIONS COMPLETE</promise> when done." --max-iterations 20 --completion-promise "150 UNIVERSAL QUESTIONS COMPLETE"
```

### Step 5: Verify Universal Questions

```
/ralph-loop "Verify all questions in universal-driving-questions.md are universally true across all 50 US states. Web search any fact that could vary by state. Fix any state-specific content. Say <promise>ALL UNIVERSAL FACTS VERIFIED</promise> when confirmed." --max-iterations 15 --completion-promise "ALL UNIVERSAL FACTS VERIFIED"
```

## Quick Commands by State

### New Jersey
```
/ralph-loop "Generate 50 New Jersey driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use NJ-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done." --max-iterations 12 --completion-promise "50 STATE QUESTIONS COMPLETE"
```

### California
```
/ralph-loop "Generate 50 California driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use CA-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done." --max-iterations 12 --completion-promise "50 STATE QUESTIONS COMPLETE"
```

### Texas
```
/ralph-loop "Generate 50 Texas driving knowledge test questions following ALL rules in state-driving-test-rules.md. Use TX-specific laws, limits, and distances. Say <promise>50 STATE QUESTIONS COMPLETE</promise> when done." --max-iterations 12 --completion-promise "50 STATE QUESTIONS COMPLETE"
```

## Files in This Folder

| File | Purpose |
|------|---------|
| `state-driving-test-rules.md` | Rules template for generating state-specific questions |
| `universal-driving-test-rules.md` | Rules for generating universal questions |
| `handbook-versions.md` | Tracks which DMV handbook versions were used |
| `README.md` | This file |

## Output Files

Generated questions are saved to the `/questions` folder:
- `questions/[state]-driving-questions.md` (e.g., `nj-driving-questions.md`)
- `questions/universal-driving-questions.md`

## Version Tracking

Before regenerating questions, always check `handbook-versions.md` to see:
- Which handbook version was used for each state
- When questions were last generated
- Whether regeneration is needed

## No Duplicate Guarantee

The system prevents duplicates by design:
- **STATE questions** = Topics where the answer differs by state (speed limits, distances, BAC, etc.)
- **UNIVERSAL questions** = Topics where the answer is the same everywhere (sign shapes, vehicle operation, etc.)

## Rules Summary

Both question sets follow 17-18 rules including:
- No dollar amounts, point values, or jail times
- Answer distribution: 25% each for A, B, C, D
- Correct answer not >40% longer than wrong answers
- Max 3 questions per concept
- All facts verified via web search
