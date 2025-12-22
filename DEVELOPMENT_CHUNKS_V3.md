# Driving Test App - Revised Development Chunks

## Summary of Changes
- State selection moves to signup flow (one-time, permanent)
- Practice tests: forward-only navigation, unlimited retakes, track first vs best score
- New training mode with instant feedback
- Dashboard shows improvement metrics

---

## Chunk R1: State Selection During Signup

### Goal
Move state selection into the signup flow so users pick their state once during account creation.

### Files to Modify

**`app/signup/page.tsx`** (or `app/auth/signup/page.tsx`)
- Add state selection as step 2 after email/password
- Two-step signup flow:
  1. Email + Password + Name
  2. Select Your State (required before completing signup)
- Save state to Firestore user document on completion

**`lib/firebase/auth.ts`** (or wherever auth functions live)
- Update `createUser` function to require `selectedState` parameter
- User document structure:
```typescript
{
  email: string;
  displayName: string;
  selectedState: string;  // Required, set at signup
  createdAt: Timestamp;
}
```

**`components/StateSelector.tsx`** (new component)
- Reusable state dropdown/grid (extract from existing state selection page)
- Props: `onSelect: (stateCode: string) => void`
- Include search filter

### UI Flow
```
[Sign Up Form]
  Email: ___________
  Password: ___________
  
  [Continue]
      ↓
[Select Your State]
  "Which state are you preparing for?"
  [Search states...]
  [Grid of 50 states]
  
  [Complete Signup]
```

### Acceptance Criteria
- [ ] Cannot complete signup without selecting state
- [ ] State saved to Firestore user document
- [ ] Redirect to dashboard after signup complete
- [ ] Google sign-in also prompts for state selection (if new user)

---

## Chunk R2: Handle Google Sign-In State Selection

### Goal
When a user signs in with Google for the first time, they need to select their state before accessing the app.

### Files to Modify

**`app/auth/callback/route.ts`** (or auth callback handler)
- After Google auth, check if user document exists
- If new user: redirect to `/onboarding/select-state`
- If existing user: redirect to `/dashboard`

**`app/onboarding/select-state/page.tsx`** (new)
- Simple page with StateSelector component
- Save state to Firestore
- Redirect to dashboard after selection
- Protected: only accessible if user has no state set

**`middleware.ts`**
- Add logic: if authenticated but no `selectedState`, redirect to onboarding

### Acceptance Criteria
- [ ] New Google users must select state before dashboard
- [ ] Existing users skip state selection
- [ ] Cannot access dashboard without state set

---

## Chunk R3: Remove Previous Button, Forward-Only Navigation

### Goal
Practice tests are forward-only - no going back to previous questions.

### Files to Modify

**`app/test/[id]/page.tsx`**
- Remove "Previous" button entirely
- Remove quick-nav grid (or make it view-only, showing answered questions)
- Keep "Next" button (or auto-advance on answer selection)
- Show answer feedback ONLY at end (results page), not during test

**`components/QuestionCard.tsx`**
- Remove any back navigation
- On answer selection: immediately advance to next question
- Add subtle transition/animation between questions

**`store/useStore.ts`**
- Remove ability to change previous answers
- `currentQuestionIndex` only increments, never decrements

### UI Flow
```
Question 15 of 50

What does a red octagonal sign mean?

○ A) Stop completely
○ B) Yield to traffic
○ C) Slow down  
○ D) Road closed

[Select answer → auto-advance to Q16]

Progress: ██████████████░░░░░░░░░░░░░░ 30%
```

### Acceptance Criteria
- [ ] No previous button visible
- [ ] Clicking answer advances to next question
- [ ] Cannot modify previous answers
- [ ] Test completes when Q50 answered

---

## Chunk R4: Track First Score vs Best Score

### Goal
Store first attempt score separately from best score to show improvement.

### Files to Modify

**`types/index.ts`**
- Update TestResult type:
```typescript
interface TestResult {
  testNumber: number;
  firstScore: number | null;    // Locked after first attempt
  bestScore: number;
  attempts: number;
  scores: number[];             // History of all attempts
  lastAttemptAt: Date;
  firstAttemptAt: Date | null;
}
```

**`store/useStore.ts`**
- Update `completeTest` action:
```typescript
completeTest: (testNumber, score) => {
  const existing = state.testResults[testNumber];
  
  if (!existing) {
    // First attempt
    return {
      firstScore: score,
      bestScore: score,
      attempts: 1,
      scores: [score],
      firstAttemptAt: new Date(),
      lastAttemptAt: new Date(),
    };
  } else {
    // Subsequent attempt
    return {
      ...existing,
      bestScore: Math.max(existing.bestScore, score),
      attempts: existing.attempts + 1,
      scores: [...existing.scores, score],
      lastAttemptAt: new Date(),
    };
  }
}
```

**`lib/firebase/firestore.ts`**
- Update sync logic to handle new data structure

### Acceptance Criteria
- [ ] First score locked after initial attempt
- [ ] Best score updates when improved
- [ ] Attempt count increments each retake
- [ ] All scores stored in history array

---

## Chunk R5: Dashboard Redesign with Improvement Metrics

### Goal
Dashboard shows mastery progress and improvement for each test.

### Files to Modify

**`app/dashboard/page.tsx`**
- New layout with:
  - Overall mastery percentage (average of best scores)
  - Individual test cards showing improvement
  - Training mode CTA

**`components/TestCard.tsx`**
- Redesign to show:
  - Test number
  - First score → Best score (with arrow and delta)
  - Attempts count
  - Retake button

**`components/MasteryProgress.tsx`** (new)
- Circular or bar progress showing overall mastery
- Calculate: `(sum of best scores) / (4 * 50) * 100`

**`components/ImprovementBadge.tsx`** (new)
- Shows improvement delta: `↑24%` in green
- Or `--` if no improvement yet

### UI Design
```
┌─────────────────────────────────────────────────┐
│  🎯 Overall Mastery                             │
│  ████████████████░░░░░░░░░░░░░░░░ 62%          │
│  124 of 200 questions mastered                  │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────┐  ┌─────────────┐              │
│  │ Test 1      │  │ Test 2      │              │
│  │ 68% → 92%   │  │ 44% → 78%   │              │
│  │ ↑24%        │  │ ↑34%        │              │
│  │ 5 attempts  │  │ 3 attempts  │              │
│  │ [Retake]    │  │ [Retake]    │              │
│  └─────────────┘  └─────────────┘              │
│                                                 │
│  ┌─────────────┐  ┌─────────────┐              │
│  │ Test 3      │  │ Test 4      │              │
│  │ 56%         │  │ Not started │              │
│  │ 1 attempt   │  │             │              │
│  │ [Retake]    │  │ [Start]     │              │
│  └─────────────┘  └─────────────┘              │
│                                                 │
├─────────────────────────────────────────────────┤
│  📚 Training Mode                               │
│  Practice with instant feedback                 │
│  [Start Training]                               │
└─────────────────────────────────────────────────┘
```

### Acceptance Criteria
- [ ] Overall mastery % calculated from best scores
- [ ] Each test shows first → best with improvement delta
- [ ] Attempt count displayed
- [ ] Clear visual distinction between started/not started tests

---

## Chunk R6: Training Mode Page

### Goal
Create training mode where users answer questions and get immediate feedback.

### Files to Create

**`app/training/page.tsx`**
- Training session interface
- Questions served one at a time
- Immediate feedback after each answer

**`components/TrainingCard.tsx`**
- Similar to QuestionCard but with feedback state
- States: `unanswered` → `answered` (show correct/incorrect + explanation)
- "Next Question" button appears after answering

### Files to Modify

**`store/useStore.ts`**
- Add training state:
```typescript
training: {
  questionsAnswered: string[];  // Question IDs
  correctCount: number;
  incorrectCount: number;
  currentStreak: number;
  bestStreak: number;
}
```

**`lib/testGenerator.ts`**
- Add function to get random question (excluding recently seen)
```typescript
function getTrainingQuestion(
  state: string, 
  excludeIds: string[]
): Question
```

### UI Flow
```
Training Mode                    Q: 47 answered

What is the blood alcohol limit for drivers 
under 21 in California?

○ A) 0.08%
○ B) 0.05%
○ C) 0.01%  ← [User selects]
○ D) 0.00%

[User clicks C]
      ↓

✓ Correct!

The zero tolerance law in California means 
drivers under 21 cannot have any measurable 
alcohol (0.01% accounts for measurement error).

Current streak: 🔥 5
Session: 32/47 correct (68%)

[Next Question]  [End Training]
```

### Acceptance Criteria
- [ ] Random questions from user's state pool
- [ ] Immediate feedback on answer
- [ ] Explanation shown after answering
- [ ] Track session stats (correct/incorrect/streak)
- [ ] Can end training anytime

---

## Chunk R7: Training Mode Progress Tracking

### Goal
Persist training progress and show stats.

### Files to Modify

**`store/useStore.ts`**
- Persist training stats to Firestore
- Track which questions user has seen
- Track per-question accuracy (optional: know weak questions)

**`lib/firebase/firestore.ts`**
- Sync training progress:
```typescript
training: {
  totalAnswered: number;
  totalCorrect: number;
  questionsSeenIds: string[];
  questionStats: {
    [questionId: string]: {
      attempts: number;
      correct: number;
    }
  }
}
```

**`app/training/page.tsx`**
- Show cumulative stats:
  - Total questions practiced
  - Overall accuracy
  - Questions remaining (200 - seen)

### UI Addition to Training
```
Training Stats
─────────────────
Total practiced: 127 of 200
Overall accuracy: 71%
Questions remaining: 73
Best streak: 12 🔥
```

### Acceptance Criteria
- [ ] Training progress persists across sessions
- [ ] Stats sync to Firestore
- [ ] Show how many questions left to see
- [ ] Track question-level performance

---

## Chunk R8: Remove Old State Selection Page

### Goal
Clean up old standalone state selection page and flows.

### Files to Delete
- `app/select-state/page.tsx`

### Files to Modify

**`middleware.ts`**
- Remove `/select-state` from routes
- Update redirect logic

**`components/Header.tsx`**
- Remove any "Change State" link
- Show current state as static text (non-clickable)

**`app/dashboard/page.tsx`**
- Display state name in header: "California Practice Tests"
- No option to change (admin only)

### Acceptance Criteria
- [ ] `/select-state` route removed
- [ ] No UI to change state
- [ ] State displayed but not editable
- [ ] Old bookmarks to `/select-state` redirect to dashboard

---

## Chunk R9: Results Page Update

### Goal
Update results page to show improvement context.

### Files to Modify

**`app/test/[id]/results/page.tsx`**
- Show score in context of previous attempts
- Celebrate improvements
- Show first score vs this attempt vs best score

### UI Design
```
┌─────────────────────────────────────────────────┐
│  Test 2 Complete!                               │
│                                                 │
│        🎉 42/50 (84%)                          │
│                                                 │
│  First attempt:  22/50 (44%)                   │
│  This attempt:   42/50 (84%)  ← NEW BEST!      │
│  Improvement:    ↑40% 🚀                        │
│                                                 │
│  Attempt #4                                     │
├─────────────────────────────────────────────────┤
│  [Review Answers]  [Retake Test]  [Dashboard]  │
└─────────────────────────────────────────────────┘
```

### Acceptance Criteria
- [ ] Show first score for context
- [ ] Highlight if new best score
- [ ] Show improvement from first attempt
- [ ] Retake button prominent

---

## Chunk R10: Polish & Edge Cases

### Goal
Handle edge cases and polish the experience.

### Tasks

**Auto-advance timing**
- Add 300ms delay before advancing to next question
- Brief highlight of selected answer

**Empty states**
- Dashboard with no tests started
- Training with all questions seen

**Confirmations**
- "End training?" confirmation
- "Start test?" confirmation (can't pause)

**Error handling**
- Network errors during test (queue answers, retry)
- Session recovery if browser closes mid-test

### Acceptance Criteria
- [ ] Smooth transitions between questions
- [ ] All empty states have helpful messaging
- [ ] Confirmations prevent accidental exits
- [ ] Robust error handling

---

## Implementation Order

```
R1 → R2 → R3 → R4 → R5 → R6 → R7 → R8 → R9 → R10
 │    │    │    │    │    │    │    │    │    │
 └────┴────┴────┴────┴────┴────┴────┴────┴────┘
           Can deploy after each chunk
```

| Chunk | Time Est | Depends On |
|-------|----------|------------|
| R1 | 20 min | - |
| R2 | 15 min | R1 |
| R3 | 15 min | - |
| R4 | 20 min | - |
| R5 | 30 min | R4 |
| R6 | 30 min | - |
| R7 | 20 min | R6 |
| R8 | 10 min | R1, R2 |
| R9 | 20 min | R4 |
| R10 | 30 min | All |

**Total: ~3.5 hours**

---

## Testing Checklist

After all chunks:

- [ ] New user signup → state selection → dashboard
- [ ] Google sign-in → state selection → dashboard
- [ ] Take test → forward only → results with improvement
- [ ] Retake test → best score updates
- [ ] Training mode → immediate feedback → stats persist
- [ ] Cannot change state from UI
- [ ] All data syncs to Firestore
- [ ] Works on mobile
