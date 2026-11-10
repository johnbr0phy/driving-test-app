# Tigertest inbox copy review

Reviewed 8 November 2026 against the implementation branch, the V2 journey cards and the updated question-review renderer. This is a copy and implementation review, not an experiment result. No emails were sent. No campaign, schedule, cohort, provider template or deployment was activated.

## Recommendation

Make each inbox line explain the useful next step. Name the exam only when the event proves it. Keep purchase, security and school service messages literal. Use the preview line to add information rather than repeat the subject.

The previous shared templates had no deliberate preview line. Clients could show the brand label, generic greeting or first body text instead. The patch supplies one escaped, hidden preheader before the artwork. Inbox display varies by client; delivered Gmail/Outlook tests remain necessary.

Subject length is a check, not a promise about mobile display. All shared subject definitions render within 70 characters across the current registry; most CCMA examples below are 23–37 characters. Long exam names remain recognizable. Names and question text are not used as clickbait.

## Current implementation changes

`{Exam}` means the verified event exam's short name, with neutral copy when identity is unknown. It does not mean the account's mutable selected exam. Shared definitions live in `lib/email-inbox.ts`. Delivery routes and HTML previews use those definitions.

| Campaign | Previous inbox subject | New subject | New preheader | Reason and boundary |
| --- | --- | --- | --- | --- |
| Learner welcome | Start your CCMA practice, or Welcome to Tigertest | Start your {Exam} practice | Take a practice test, review your answers, and choose what to study next. | Retain the useful existing subject; add a concrete preview. Signup identity only. No fixed test count, free-tier promise or official-score implication. |
| Unknown learner welcome | Welcome to Tigertest | Welcome to Tigertest | Take a practice test, review your answers, and choose what to study next. | Neutral identity and test chooser. Never guess DMV. |
| Teacher welcome | Welcome to Tigertest | Set up your first Tigertest class | Choose a test, share your class link, and follow your students' practice. | State the account setup action. Current signup does not prove a class exam, so do not advertise CCMA here. This is the working `/teach/new` class flow, not the legacy school-invite flow. |
| First-test reminder | Quick check-in from Tigertest | Try a {Exam} practice test | Use a practice result to choose your next study topic. | A specific study action, not a vague check-in. Deliberately omit “full-length”: a 50-question CCMA practice test is not the official exam length. No new V2 eligibility. |
| Second-test nudge | Nice work on your practice test | Your next {Exam} study step | Review your answers, then choose a topic or another practice test. | Adds a reason to open beyond congratulations. Does not assume there were errors or promise free full stats. |
| DMV paywall recovery | {Feature} is still waiting | Revisit {Feature} | Review the Premium features and current price before you decide. | Uses the verified viewed feature without pressure or an unlock claim. Example: “Revisit State Laws.” CTA now says “Open DMV Practice,” because it opens a dashboard rather than the exact locked feature. |
| DMV upgrade | You're doing the work 💪 | What DMV Premium includes | See the extra training sets, practice tests, and full stats. | Clear product value and sales intent. DMV-only eligibility stays unchanged. CTA says “Open DMV Practice,” not an implied checkout/modal. |
| Purchase confirmation | You're in - here's what just unlocked | Tigertest Premium: purchase confirmed | Known paid v1 stats: Your Premium access is active. Open your full {Exam} stats. | Make a transaction easy to recognize and find later. Verified paid checkout and activated access only. |
| Purchase, V2/unknown context | Same generic sales-style subject | Tigertest Premium: purchase confirmed | Your account-wide Premium access is active. See what your purchase includes. | Does not sell SAT/other V2 study plans, drills or mistake notebook as new paid access. |
| Return without a question | Test coming up soon? | Continue your {Exam} practice | Choose one small study step when you are ready. | No guessed exam date or urgency. Existing return audience and timing remain unchanged. |
| Last question, incorrect | A question worth another look | A {Exam} question worth another look | Review your last question and the correct answer, then try another session. | Matches the recorded wrong answer and actual question card. Never says it caused the learner to leave. |
| Last question, correct | Keep your practice going | Keep your {Exam} practice going | Revisit your last question and its answer before your next session. | Positive branch without presenting a correct answer as a mistake. The preheader works even when no explanation exists. |
| Super Amazing | You unlocked Super Amazing Mode 🎉 | {Exam}: Super Amazing Mode unlocked | Open your completed dashboard to see the fireworks. | Preserve the earned achievement and add its exam. No official-pass claim. Uses the dashboard that earned the unlock. |
| Inactive feedback/share | Did you pass? | How was your {Exam} practice? | Reply with your feedback, or share Tigertest with a friend. | Inactivity cannot prove they sat or passed the real exam. Body now asks what helped and what could improve. Homepage CTA is “Visit Tigertest,” not a claimed share action. No held CCMA feedback campaign is newly enabled. |
| Non-DMV catalog branch | SAT and ACT are on Tigertest, and a question for you | Free SAT and ACT practice on Tigertest | Explore practice tests and drills, then tell us what to build next. | Lead with the actual product information and put the feedback ask second. This does not prove broader catalog interest or authorize additional enrollment. Campaign remains subject to its existing switch. |
| Create-your-own quiz | Turn anything into a practice test | Turn your notes into a practice quiz | Use Tigertest with your own ChatGPT or Claude account. | “Notes” is specific and “anything” overpromises. Explains the external account requirement. Existing paused state is untouched. |
| School enquiry acknowledgement | Thanks for your interest in Tigertest | We received your Tigertest school enquiry | Your enquiry is saved. Thank you for telling us about your school. | Confirm what happened. Remove the unverified one-business-day quote promise. No exam-specific claim without an enquiry exam. Legacy dedupe/rate limiting still need repair. |
| Legacy school invitation | {School} invited you to Tigertest | {School} invited you to Tigertest | Create a Tigertest account with the email address that received this invitation. | The sender identity is already useful. Preserve it, sanitize header text and escape school names in HTML. Signup is not verified class enrollment: body directs the reader to ask their instructor how to join, and CTA is “Open Tigertest signup.” |
| Legacy school completion | 🎉 {Student} passed all 8 sections on Tigertest! | {Student} completed all 8 practice sections | A practice milestone was recorded for your school, not an official exam result. | Describes the recorded eight-section event. Remove official-readiness implications. The old dashboard redirects to teaching tools; CTA now says “Open teaching tools.” This is not a new CCMA milestone, nor a repaired student dashboard. |
| Branded password-reset endpoint | Reset Your Tigertest Password | Reset your Tigertest password | Use the reset link to choose a new password for your account. | Direct service action. Remove the unverified one-hour expiry statement and marketing footer. Does not replace the active Firebase reset path or fix this endpoint's separate security/rate-limit issues. |

The learner, service and question subjects are copy improvements within the existing paths. A revised subject is not a reason to resend a previously delivered message or reset a permanent campaign marker.

## Launch variants: preserve history, hold new copy

Current sendable launch IDs remain **v4 and v5**. They were not rewritten or reassigned. A historical comment claims earlier open rates, but underlying observations, denominators and randomization were not verified here. Do not present that comment as a current measured winner.

| Variant | Existing subject | Finding | Treatment |
| --- | --- | --- | --- |
| v1, retired | Permit test: done. SAT: next. | Assumes the learner completed a permit test and plans SAT next. | Remain retired. Preserve historical text and records. |
| v3, retired | SAT and ACT prep. $9.99. Once. | Stale price/access framing and unnecessary payment claims. | Remain retired. Do not revive. |
| v4, currently sendable if campaign enabled | What would you score on the SAT today? | The subject and “scored like the real thing” body can imply an official or predictive SAT score. | Preserve history; do not treat this as approved copy for a future launch. |
| v5, currently sendable if campaign enabled | I built the SAT and ACT | Reads as a claim to have built the official exams. Body also assumes the next exam. | Preserve history; replace only through an explicitly approved new experiment. |
| v6, proposed only | Try a free SAT practice test | Direct action and verified free practice. | Held in `PROPOSED_LAUNCH_VARIANTS`; not in the sender's allowed variants. |
| v7, proposed only | Your next SAT study step starts here | Tests a study-benefit angle without a predictive-score claim. | Held in the same proposal list. |

Both held variants use this preheader: **Full-length SAT practice, short drills, and an ACT option.** Their body and layout are the same, with “Open SAT practice” and “Open ACT practice” links, and an explicit practice-score distinction. No legacy click tokens or new experiment enrollment is generated for a preview. Before any new experiment, use a new campaign key, record exposure, choose a relevant audience and verify eligibility/consent. Do not silently add v6/v7 to the old hash pool.

## Held V2 concepts and provider-controlled mail

These are recommendations, not new senders. The latest V2 canvas supplies the intended purpose; implementation still needs the evidence below.

| Concept | Recommended subject | Recommended preheader | Required before use |
| --- | --- | --- | --- |
| Firebase verification | Verify your Tigertest email address | Confirm this address to finish setting up your account. | Inspect the actual provider template and supported customization. No expiry claim, test promotion or security-flow replacement. |
| Active Firebase password reset | Reset your Tigertest password | Use the reset link to choose a new password for your account. | Verify the provider console template. The custom API edit does not change Firebase's live email. |
| CCMA full-stats recovery | Review your CCMA stats options | See what full stats include and check the current price. | A verified CCMA full-stats view, no existing Premium/class entitlement, and a working target. Do not imply stats are already unlocked or extend the DMV pitch. |
| Eight unresolved misses | Give your missed CCMA questions another try | Choose one missed question to review before your next session. | Verified unresolved records and accessible review route. Prefer a module inside an existing message until incremental benefit is tested. |
| Deliberate finished/feedback signal | How was your CCMA practice? | Tell us what helped and what could improve. | Explicit finished-studying or feedback signal, not inactivity. |
| Material content release | New {specific content} for CCMA practice | {One verified change and the useful next action.} | A real release and matching interest. Do not send “An update” with no concrete news. Do not invent counts, availability or launch date. |
| Explicit broader-catalog interest | Explore more practice tests on Tigertest | Find another test to practise and tell us what to build next. | Broader news permission and relevance, outside the core study sequence. |
| Exam-specific teacher welcome | Set up your CCMA class | Choose a practice activity and share your class link. | Signup/class event explicitly names a supported CCMA class. Current teacher welcome stays neutral. |
| Exam-specific enquiry | We received your CCMA school enquiry | Your enquiry is saved. Thank you for telling us about your class. | Explicit enquiry exam. No invented response deadline. |
| Verified class invitation | {School}: your CCMA class invitation | Join your class using the link from your instructor. | A valid class invitation and actual enrollment link. Do not use for the legacy signup-only invitation. |
| Verified CCMA class milestone | {Student} reached a CCMA practice milestone | See the completed milestone in your class progress view. | Defined class-specific milestone and a working student progress destination. Do not reuse eight DMV sections. |

Five legacy Firebase functions were found in the audited source: welcome, first-test reminder, second-test nudge, upgrade and reengagement. Their subjects duplicate the old lines above. Deployment status is unknown. Audit deployment and retire duplicates before changing their copy; updating both send paths without deduplication could double-send. Historical `render-emails.mjs` / `build-email-preview.mjs` also contain old literal copy and stale operational notes; they are not proof of current sends. Use the implementation definitions and current branding preview script for review.

Internal operator notices (“Test request: {details}”, “New school lead: {school}”, and school-referral analytics subjects) serve routing/triage, not learner engagement. Keep their descriptive prefixes; do not run open-rate experiments on them. Their subject labels remain separately reviewable for header hygiene.

## How to measure improvement

These recommendations should improve relevance and clarity, but no open-rate lift is claimed.

1. Confirm delivery, bounce/complaint handling and baseline volumes before testing copy. A subject cannot repair poor placement or a blocked sender. Current postal-address/unsubscribe configuration and final rollout checks still apply.
2. Run one campaign experiment at a time. Randomize eligible recipients concurrently and keep exam, audience, sender identity, local send timing, body and preheader constant when testing only subjects. If the subject and preheader change together, label it an inbox-package test.
3. Use a new experiment/version identifier and stable user assignment. Record assigned variant, immutable rendered copy, delivery time and eligible event. Never reset a “sent” marker, re-email a past recipient, or mix old v4/v5 results with new copy.
4. Treat provider-reported unique open rate as a diagnostic. Mail privacy prefetching can inflate opens; image blocking can hide them. Compare consistent, usable subsets if the provider supports them. Do not present opens as a count of people who read the message.
5. Primary success is the useful action: a study session/test start for learning mail; the relevant feature view for recovery; an intentional reply for feedback. Track completion and purchases as downstream outcomes where appropriate. Use complaints, unsubscribes and bounce rates as guardrails. Exclude identifiable scanner clicks; no filter guarantees all remaining clicks are human.
6. Current launch click tracking records variant and timestamp. It does not itself prove an open, a real study session or a conversion. Verify downstream attribution before using these measures to choose a winner.
7. Choose the minimum useful effect and sample size from the observed baseline before launch. A small list may need weeks or may not support a reliable test. Do not invent a sample target or stop at the first favorable result. If evidence remains weak, retain the clearest accurate copy.
8. Do not A/B-test security, receipt or critical service instructions to maximize opens. Verify recognition and successful completion instead. Keep rare Super Amazing mail clear; low volume may not support an informative experiment.

Suggested first comparison: **“Try a CCMA practice test”** versus **“Choose your next CCMA study topic”**, with the same honest preheader and body. This tests action-led against study-benefit framing. It is a proposal only. Confirm audience volume and the practice-start event before scheduling it.

## Verification completed for these edits

- Shared preheaders and safe HTML escaped across every registry voice, with neutral identity fallback.
- Known event identity included in study subjects; correct/incorrect question branches remain distinct.
- Paid v1 stats and free V2 study tools distinguished in purchase previews.
- Dynamic header input strips control characters and has bounded length. School names, student names and student email values are escaped in the touched HTML templates; hostile inputs cannot add links.
- Route subject wiring, recorded question exam, purchase context, preserved historical launch subjects, and held proposal exclusion are tested.
- Focused inbox tests: 10 passed. Existing branding/question/milestone tests: 19 passed. Updated milestone route test passed. TypeScript check passed before the final service escaping test; final integrated checks belong to the implementation handoff.
- No real provider delivery or inbox-client rendering was performed. Open rates and deliverability improvement remain unmeasured.
