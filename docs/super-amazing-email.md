# Super Amazing celebration email

The daily 17:00 UTC campaign now covers DMV, registry exams (including state
variants), and v2 exams. It remains a once-per-account celebration, not a new
email for each exam a person completes. There is no purchase requirement.

## Audience and identity

- The existing shared audience still requires an email, consent under the
  configured consent policy, no unsubscribe, no internal account, and recent
  activity. Existing send-time unsubscribe checking and campaign quotas remain.
- The campaign still requires a four-hour gap since the last email and no
  `superAmazingUnlocked` sent marker. The marker is written by the existing
  sender only after an accepted send.
- The oldest valid entry in `superAmazingUnlocks` identifies the dashboard that
  earned the reward: `dmv`, a registry exam/variant ID, or `v2:<examId>`.
- Its timestamp must not be in the future. The achievement must be no more than
  seven days old. An older account-wide `superAmazingUnlockedAt` (or its legacy
  `superAmazing.firstEnabledAt` fallback) keeps that original freshness ceiling;
  writing a dashboard latch later cannot restart the window.
- The email uses that dashboard's name and URL, even if `primaryExam` changed.
  Unknown dashboard IDs do not fall back to DMV.
- Accounts with only an unscoped legacy timestamp are skipped. Repository
  history documents that this field can exist without an all-green dashboard,
  so it cannot establish an achievement or its exam. This patch does not
  backfill achievements, reset campaign markers, or mail a historical backlog.

## Copy

Subject: **You unlocked Super Amazing Mode 🎉**

You completed every step on your [exam short name] dashboard and unlocked Super
Amazing Mode. **You did the work.**

So we turned on the fireworks. You earned them, and retaking a test or practising
again will not take them away.

You can switch them on or off from the Super Amazing Mode card on your completed
dashboard.

**Go See The Fireworks** links to the earned dashboard, with the existing
`super_amazing` campaign tracking. The sign-off and unsubscribe footer remain.

The copy no longer assumes eight steps, training sets rather than v2 drills,
an exam-specific answer count from an account-wide total, or a DMV visit. It
does not compare readiness with other learners or promise fireworks on every
page forever. Exam-specific tiger/colour branding is a separate design follow-up;
this change keeps the existing shared email shell.

## Verification and rollout

Tests cover every registered dashboard, state-variant URLs, changed current exam,
old/future/missing/invalid timestamps, unknown IDs, legacy-only records,
backfills, the once-account marker, four-hour gap, route authorization, and
exam-specific template links. Route tests replace audience and send functions:
they do not query real accounts or send mail.

This change requires normal review and deployment before production behavior
changes. Opening a draft PR does not activate it. No emails or production data
changes are needed to test it. Other DMV-only campaigns are unchanged.
