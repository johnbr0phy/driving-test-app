# VidyaGyan authoring validation — 2026-11-17

- 160 unique original items; four pools of 40. Each has 10 questions per test and 20 drill-only.
- Two 40-question, 60-minute skills tests. Equal weights and timing are explicitly practice choices; test 2 held out.
- Eight independently written English reading passages; other items cover language, maths, everyday science/community knowledge and text reasoning.
- `validate_v2_bank.py vidyagyan`: 160 questions, zero problems.
- `check_sources.py vidyagyan`: seven primary pages, seven dated reads.
- Meaningful answer-pattern check using the temporary adapter from v2 `correct` to the checker's expected `answer`: no patterns.
- Correct option uniquely longest: 27/160 (16.9%); over 20% longer than distractor mean: 27/160 (16.9%).
- Search, no-repeats and free-to-start tests: 322/322 pass, including new Vidya Gyan / UP VidyaGyan entrance / VidyaGyan Class6 aliases.
- Targeted ESLint on all new TS/TSX files: pass.
- Light brand contrast against white: 8.49:1.
- Borrowed the existing times-tables tiger set used by JNVST. No extra image-generation or paid-model calls.

Fresh blind review files are under `/tmp/vidyagyan-review/`, with opaque IDs and separately shuffled question orders. The independent content/options-only review is pending. Screenshots and combined application verification remain with the coordinating task. No commit, push, heavy production build or merge performed.

Full TypeScript `tsc --noEmit --incremental`, with a 4096 MB heap ceiling: pass.

Independent review passed: 160/160 key agreement and 10/40 options-only guesses correct in each domain (25% overall). Official-source review accepted the stated scope limitations. One India-specific ambiguity was corrected after review: SCIENCE-016 now uses a fire station instead of a post office as a distractor, since Indian post offices also offer savings. Key and explanation unchanged; rebuilt structural validator passes. See `review.md` for the independent record.
