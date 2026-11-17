# Second-batch remote preview validation — 2026-11-17

Deployment: `dpl_9hoAFnsPXHY7NxX4EBFMmNkzFDjJ`, commit `9cee1a68`, READY. Preview: https://driving-test-52ko7rkck-johnbr0phys-projects.vercel.app

Access used the temporary share-link cookie flow, scoped to this exact preview origin. Credentials stayed in a private temporary file and were not printed, saved in the repository or embedded in screenshots. Project protection was not changed.

## Results

- All 16 HTTP checks PASS: each of five landings, dashboards and OG endpoints returned 200; OG responses have image content types; `/tests` returned 200 and lists all five new landing routes. No authentication/protection document was mistaken for an app page.
- All 20 landing assets captured in `public/landing/`: `<id>-desktop.png`, `<id>-mobile.png`, and both `-dark.png` variants for appraiser, zafirearm, securityx, sscp and servicenowcsa.
- Desktop: 1215×790, Test 1 after starting the module where applicable. Appraiser test 33801; ZA firearm test 33901; each v2 test 1.
- Mobile: 384×640 at 2× density. V1 practice set 1; SecurityX governance, SSCP concepts and CSA navigation drills.
- Visually inspected all 20 captures in five contact sheets. Question text, all choices, navigation/progress and light/dark surfaces are readable. No clipped question content, wrong exam, blank view or protection screen observed. Test timers show the configured 165/120/90 minutes for SecurityX/SSCP/CSA.
- The bundled Playwright Chromium executable was absent. Used the installed Chrome channel; no browser download or local server/build.

## Runtime warning follow-up

Two minified React #418 hydration warnings appeared during the initial Appraiser captures. Both contexts rendered usable question screens, and no screenshot failed. No such warnings appeared for the other four exams. Rechecked Appraiser in four fresh contexts (two light and two dark), visiting dashboard, Test 1 and Practice 1 in each: all 12 navigations passed with zero page errors. The transient warning did not reproduce. This is recorded rather than claimed fixed; no shared runtime source was changed without a reproducible defect.

The screenshots were captured against the compiled exam code before these new image files were committed. Their final landing-hero delivery therefore still requires the parent's asset commit and final preview. All screenshot and validation changes are local for that commit; this subtask did not commit, push or merge.
