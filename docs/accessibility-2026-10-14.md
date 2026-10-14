# Accessibility review — 14 October 2026

Target: [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/). This change fixes shared interaction barriers across TigerTest. It is not a claim that every page and state conforms to WCAG. Actual assistive-technology testing and the coverage gaps below remain release-review work.

## Changes and scope

- DMV and shared legacy exam answers use native buttons, selected/locked state, visible keyboard focus, question focus after advancing, and accessible answer feedback. Pointer and touch activation keep the existing callbacks and answer timing. Both usages of each card were checked: `app/training/page.tsx`, `components/exam/ExamTrainingPage.tsx`, `app/test/[id]/page.tsx`, and `components/exam/ExamTestPage.tsx`.
- V2 single choice, multiple choice, numeric, ordering, matrix, bowtie, highlight, and cloze inputs expose labels, selection and correctness. Reordering preserves focus. Numeric errors are associated with the field. KaTeX retains MathML. Calculator results and timer thresholds use status announcements.
- Custom overlays use Radix focus containment, Escape dismissal and focus restoration. Desktop side tools remain nonmodal. Covered page chrome is inert during full-screen practice. Keyboard shortcuts operate only inside the question area and do not intercept input or control activation.
- Navigation has a skip link, labelled icon links, and single semantic links instead of nested link/button controls. Collapsed quiz answers leave the tab order. Account form fields have labels, autocomplete and associated error/status text. Appearance controls expose their selected state.
- Sign alternatives describe visible sign content without supplying the answer. Attempt charts provide a text summary and keyboard-accessible data points.
- Contrast corrections retain the existing brand hues and layout. Focus indicators and reduced-motion handling apply across shared controls. Dialogs can scroll in short viewports.

The welcome-email endpoint, progress synchronization and unrelated audit recommendations are outside this change. No merge or deployment is included.

## Timing accommodation

Before starting the first timed module, the user can choose untimed practice. Existing and new attempts remain timed by default. The choice is stored as an optional session/result field; no persistence schema migration or synchronization logic changes. Untimed sessions do not start or resume a countdown, and results explicitly identify the accommodation. Question selection, scoring, adaptive routing and linear/no-backtracking restrictions are unchanged. Exams with no timed modules do not show the option.

Regression checks cover default timer startup, untimed storage/reload, unchanged scoring and adaptive variant/question selection, and a single expiration callback. An untimed accommodation is practice and does not claim to simulate the official exam limit.

## Verification

Run `npm ci`, install Playwright Chromium with `npx playwright install chromium`, then `npm run test:a11y`. The suite starts a local server on port 3100. To use installed Chrome, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to its executable path. The regression fixture bundles real production components into an intercepted test-only route; no fixture route is shipped by Next.js.

The browser suite uses axe WCAG A/AA tags through 2.2 and headless desktop Chrome, including mobile viewport/touch emulation. It covers:

- Native Tab, Enter, Space, mouse click and touch tap on both legacy answer cards; repeat activation cannot submit twice.
- All eight V2 question formats before and after checking an answer.
- Figure modal focus containment, Escape and restoration; paywall naming/close; password reset label/focus/close, without submitting.
- Collapsed quiz, timer, calculator and full-screen exam focus/shortcuts.
- A complete 50-question DMV attempt through its results page.
- Guest route scans: `/`, `/tests`, `/login`, `/signup`, `/dashboard`, `/training?set=1`, `/test/1`, `/sat`, `/sat/test/1`, `/nclex`, and the empty `/sat/test/1/results` state.
- 320px and 390px reflow without horizontal document overflow on `/`, `/tests`, `/login`, `/sat` and `/nclex`.
- Dark-mode scans on `/`, `/tests`, `/login`, `/dashboard`, `/sat` and `/nclex`, plus keyboard appearance switching.

Before/after screenshots at 1280px and 390px were captured for home, login and SAT against main `267b79976c50ba5066ae080f7ccfedc3730bbc33`. After waiting for hydration, all six comparisons had identical measured main heading/form geometry. Inspected screenshots retained layout, typography and brand treatment; expected differences are stronger text/button contrast. This is sampled comparison, not a pixel-perfect audit of every page.

## Recorded check results

- 33 browser scenarios passed in the complete run. The separate scoring/adaptive regression passed on rerun after fixing its test-only JSON import resolution (34 scenarios verified in total).
- `tsc --noEmit --incremental false` passed.
- `npm run lint` passed with existing hook/image warnings, including the existing generated social-image alt warning.
- `npm run build` passed, generating all 407 pages, in a separate checkout of the production changes. The later test-only JSON loading correction does not affect the production bundle.
- `node --test tests/nclex-copy.test.cjs`: 5 passed.
- `git diff --check` passed.

## Remaining coverage gaps

- No actual VoiceOver, NVDA or JAWS speech/navigation run. Browser roles, focus assertions and axe do not substitute for that test.
- No authenticated settings/account-conflict flows, account creation, sign-in/reset submissions, destructive account actions, or Stripe checkout/payment. No transaction was performed. Guest paywall UI was tested without purchasing.
- No Safari, Firefox, physical touch device, switch-control or braille-device testing.
- Not an exhaustive review of all generated routes, translated copy, content, diagrams or question variants. V2 figure records have nonempty alternatives, but their complete semantic accuracy remains to be reviewed. New shared accessibility strings are English; localisation remains incomplete.
- Audio/explainer caption/transcript equivalence, all contrast states, 200% text resizing, 400% browser zoom, focus obscuration and target spacing across every flow need manual review.
- The populated V2 results view, all Basics overlays, and every exam-specific end-to-end path are not fully exercised by this suite.

These gaps prevent a site-wide WCAG conformance claim. The draft PR is a reviewable accessibility improvement with regression evidence, not certification.
