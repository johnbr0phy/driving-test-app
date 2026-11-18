# EPA 609 independent-review handoff

Date: 2026-11-18. Worktree: `/Users/johnbrophy/tigertest-next20-epa609`.
Branch: `codex/next20-epa609`. No commits, push, PR, preview, screenshots or merge.

## Frozen candidate

`data/epa609-questions.json`: 100 original items.
SHA256: `f6ec41e703f3b3c26900ce00c5bbad9ffdc1f5488abcc1202896542cbaffe8a7`.

Source: `items.py` contains the reviewed sample source; `more_items.py` contains the additional 72. `build.py` regenerates the production bank, the local review copy and `source-map.json`. Historical `sample-questions.json` and `sample-source-map.json` record the 28-item sample gate, not the complete candidate.

Source map has 100 entries and 100 named objectives, each with a fetched primary URL and a page, heading or regulatory locator. This mechanical count is not proof against semantic duplication. The independent reviewer must judge that separately.

## Coverage and cognitive demand

Four 25-question tests, 100 distinct test questions, pools 28/24/32/16, editorial counts 7/6/8/4. MACS online/home supplies the 25-item format and 84% target; neither is asserted to be universal across EPA-approved programs. The 100-row validator exception documents this real format choice. Thresholds and baselines are unchanged.

The bank mixes regulatory classifications, procedure order, equipment choice, physical cause and effect, and measurement interpretation. Supporting recall includes refrigerant classifications and several equipment-standard identifiers. It is not a hands-on assessment or a general vehicle diagnosis exam.

Potentially adjacent objectives deliberately separated:

- REG005 processing before reuse versus SRV014 inability to separate mixtures versus SRV015 contaminants from stationary systems. These concern different acceptance decisions, not three variants of the same reuse question.
- EQP005 desiccant exhaustion lockout versus SRV031 vacuum-pump oil maintenance.
- SRV001 trapped cold refrigerant mechanism versus SRV011 action after pressure returns.
- SRV004 unit conversion, SRV007 resolution versus accuracy and SRV030 one-sided tolerance.
- YF002 identifier integration, YF009 dual-refrigerant equipment approval, YF011 contaminated recovery equipment, YF010 leak-location tool and YF016 sensitivity are separate equipment capabilities. These remain relatively easy recognition items; review for excessive standard-name recall.
- YF003 partial-charge purpose, YF012 failed vacuum check, YF013 cabin probe placement and YF014 post-leak machine lockout are distinct stages/decisions. No further variants were added to fill a larger R-1234yf quota.

The writer revised remote distractors throughout the first pass and corrected explanations against the offered options. This is not an independent blind review or an options-only success claim. The sample was accepted for expansion, not final quality approval.

## Validation completed

- Bank validator with registered 100-row design and all four pools: PASS.
- Answer-pattern checker: no answer patterns.
- Option references: no findings.
- Whole-bank echo gain: -0.125 marks per 50; shared option sets: zero.
- Category echo gains: Rules 0.446, Equipment -0.521, Service -0.781, R-1234yf 0.781.
- The CLI skips groups below 20. The R-1234yf result was calculated directly with the same analyse function on all 16 items: unique echo fired on seven, hit two; no shared sets. No thresholds were altered.
- Median stem: 14 words. Article openings: zero percent. Average option: 34 characters. Key uniquely longest: 15 percent; key over 1.2 times distractor average: 6 percent.
- Source checker: PASS using in-memory postponed annotations for the local Python 3.9 runtime; 11 primary pages, no secondary pages. No repository checker modifications.
- Full TypeScript check: PASS, serial Node heap limit 4096 MB, no incremental output.
- Scoped lint on landing, wrappers and changed core wiring: PASS, no warnings or errors.
- Existing landing-template, free-to-start and v2 held-out tests: six PASS.
- Shared-generator smoke: four tests of 25, 100 distinct IDs, training pools 28/24/32/16. Premium locks training set 4 and test 4. An initial smoke call used a stored set ID where the function expects a set number; corrected invocation passed without app changes.
- `git diff --check`: PASS.

## Wiring

VTNE landing structure and classes retained, content replaced. Canonical `/epa-609-practice-test`; app `/epa609`; shared test/practice routes only. Four topic sets, catalog/search aliases, facts, teacher-led hooks, source registry and bank-size registry updated. Existing automotive technician mascot is reused.

Light theme HSL 112/30/38, dark button 112/30/39. No hue-rule clash with current main themes; pending hue distances from 240/276/176 are 128/164/64 degrees. White text contrast: light 4.806, dark 4.602. Dark brand text against gray-900: 8.598. Both modes are present; details in `theme-audit.json`.

## Remaining work

Independent blind answers for all 100, category options-only assessment and full stem/options pedagogy review. Correct findings in Python sources and rebuild. Only after content review, run full prescribed checks and arrange preview/screenshots as authorized by the parent. Landing screenshot paths are prepared but the four images have not been generated. No claim is made that the unreviewed candidate is ready to publish.
