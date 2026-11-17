# First-batch remote preview verification — 2026-11-17

Deployment: https://driving-test-kg2bzbhj5-johnbr0phys-projects.vercel.app
Commit: `a1c14063`; deployment `dpl_EKkks5WsF5FytcK73CMRaLnvRS9Z`, READY.

## HTTP checks

All 16 checks passed. The five social-image routes returned image content types. The directory response contains all five landing paths.

| Exam | Check | Path | HTTP |
|---|---|---|---:|
| jamblit | landing | `/jamb-literature-practice-test` | 200 |
| jamblit | dashboard | `/jamb-literature/dashboard` | 200 |
| jamblit | og | `/og/jamblit` | 200 |
| apcsp | landing | `/ap-computer-science-principles-practice-test` | 200 |
| apcsp | dashboard | `/ap-computer-science-principles/dashboard` | 200 |
| apcsp | og | `/og/apcsp` | 200 |
| vidyagyan | landing | `/vidyagyan-class-6-practice-test` | 200 |
| vidyagyan | dashboard | `/vidyagyan/dashboard` | 200 |
| vidyagyan | og | `/og/vidyagyan` | 200 |
| osssc | landing | `/osssc-cre-practice-test` | 200 |
| osssc | dashboard | `/osssc/dashboard` | 200 |
| osssc | og | `/og/osssc` | 200 |
| nccco | landing | `/nccco-mobile-crane-core-practice-test` | 200 |
| nccco | dashboard | `/nccco/dashboard` | 200 |
| nccco | og | `/og/nccco` | 200 |
| all | directory | `/tests` | 200 |

## Browser screenshots

20 PNGs captured in `public/landing`: each of jamblit, apcsp, vidyagyan, osssc and nccco has desktop/mobile and light/dark versions. Desktop 1215×790; mobile 384×640 CSS pixels at2× (768×1280 file). One browser with sequential contexts; no local development or production server.

Desktop captures show the first practice-test question. Mobile captures show the first topic practice question: drama, creative development, English, maths and site respectively. All screenshots were visually inspected: actual question text and all four answer choices render legibly, with correct light/dark surfaces and no login page, missing text or horizontal clipping. The NCCCO test and practice screens use the existing v1 layout; the others use shared v2 components.

Preview protection initially redirected to login because a share-link token was mistakenly presented as an automation header. Correct share-link bootstrap established the preview cookie, after which clean URLs worked. No protection setting was changed; no credential is in repository files, screenshots or this report.

One first-pass VidyaGyan dark navigation emitted recoverable React hydration warning418; the app recovered and displayed the question. A fresh dark desktop/mobile recapture completed without any page error and replaced those images. No persistent defect reproduced and no unrelated shared-runtime code was changed.

These screenshots are new assets captured against this revision; the coordinator must commit and deploy them before the preview landing heroes can serve the new files. No claim is made that the pre-asset deployment already contains them.
