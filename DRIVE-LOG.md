# Drive the Question: verification log

How the scenes were checked. Screenshots come from `tools/drive-shoot.mjs` (headless Chrome, phone portrait 390 x 844), which plays all 23 decision branches of the 5 scenes plus two parking variants (hydrant, Oregon) and saves each decision point, the moment of the consequence and the result card.

Grades are 1 to 5 on four questions: **R** is the situation readable in 2 seconds, **A** is the correct action unambiguous, **C** does the consequence teach the rule, **P** does it fit a phone screen. Anything under 4 gets fixed.

## Round 1

First run that played end to end. All 23 branches reached a result.

| Scene | R | A | C | P | What was wrong |
|---|---|---|---|---|---|
| no-passing-zone | 3 | 4 | 3 | 4 | Pennant tiny and far away. Half the picture was sky. The consequence shot missed the near miss. |
| double-arrow | 4 | 4 | 3 | 3 | Camera flew through the sign at the island nose. "Take the full test" was cut off below the result card. |
| rough-road | 3 | 5 | 4 | 4 | Sign small, sky filling the top half, rough patch drawn as a few huge slabs. |
| flashing-signals | 2 | 4 | 3 | 4 | Signal head a few pixels tall and sometimes caught in its dark phase. Cross traffic hidden behind buildings. Police car out of frame. Camera clipped the signal. |
| parking-clearance | 3 | 3 | 3 | 4 | Distance marks unreadable at the decision, so the choice was a guess at numbers, not a place on the curb. |

Also found: the stage was only 480 px tall (a `calc()` class that produced invalid CSS), focusing the prompt scrolled the page, and the cookie banner sat on every shot.

Fixes: camera pitched down (more on tall screens) so the road fills the frame; roadside signs enlarged to 4.4 to 4.6 m (stylised on purpose) and moved closer to the decision point; signal head raised and enlarged, lens kept faintly coloured in its dark phase, lit 60% of each second; junction corners opened up; police car moved onto the cross street; camera follows the car sideways so it passes beside the island sign; result panel allowed more height; harness shoots just after the near-miss cue and answers the cookie banner first; stage is the full screen height and scrolls itself into place on Start; focus no longer scrolls.

## Round 2

| Scene | R | A | C | P | Notes |
|---|---|---|---|---|---|
| no-passing-zone | 4 | 4 | 4 | 4 | Pennant, truck and solid lines all in the decision frame. Near miss shows the red car on the shoulder beside you. |
| double-arrow | 4 | 4 | 4 | 4 | Sign, island and the car beside you read at a glance. |
| rough-road | 4 | 5 | 4 | 4 | BUMP is legible in the world. Patch reads as broken road. |
| flashing-signals | 3 | 4 | 4 | 4 | Better, but the signal was still 45 m away at the first decision. |
| parking-clearance | 3 | 4 | 4 | 4 | Marks nearer, labels still soft at the decision. |

Fixes: flashing-signals decision moved 10 m closer (timings of all three red branches reworked to match); parking camera now glides ahead to the curb marks as you roll up, labels widened to 4.2 m and moved onto a wider sidewalk, police car moved beside the crosswalk.

## Round 3

| Scene | R | A | C | P | Notes |
|---|---|---|---|---|---|
| no-passing-zone | 4 | 4 | 4 | 4 | Unchanged from round 2. |
| double-arrow | 4 | 4 | 4 | 4 | Unchanged. |
| rough-road | 4 | 5 | 4 | 4 | Unchanged. |
| flashing-signals | 4 | 4 | 4 | 4 | Flashing red is clear at the decision; the skidding car and the signal overhead are in the consequence shot. |
| parking-clearance | 4 | 4 | 4 | 4 | "5 ft", "10 ft", "20 ft" readable on the curb at the decision. Hydrant and Oregon variants checked the same way. |

Nothing under 4. Stopped after three rounds as planned.

Honest limits of these grades: they are mine, from still frames. Nobody outside has played the scenes, and motion (does the slow-down feel right, is 4 seconds enough to read three options) can only be judged by playing.

## Other checks

- **Landscape** (844 x 390): panel sits beside the picture, all three states of no-passing-zone fit without scrolling the choices.
- **No WebGL** (`?webgl=off` forces it): the bank's multiple-choice question appears with the same rule and source after answering.
- **Reduced motion**: Start jumps to the still frame at the decision, a choice jumps to the still frame of its outcome. No slow motion, no shake.
- **Keyboard only**: Enter on Start, number keys or Tab and Enter on the choices, focus lands on each new prompt and on the result heading.
- **Analytics**: with `window.gtag` stubbed, one wrong try then a right one fired `drive_start`, `drive_decision` (choice and correct), `drive_complete`, `drive_retry`, `drive_decision`, `drive_complete`, `drive_to_test_click`, in that order.
- **Flag off**: `NEXT_PUBLIC_DRIVE_ENABLED=off` makes `/drive` and `/drive/double-arrow` return 404.
- **Determinism**: `describe(record)` is compared with itself in the tests; option order and scenery come from a seed built from rule, question and state.

## Measurements

From the final harness run (software WebGL, 390 x 844, device scale 1), 23 branches:

| Measure | Result | Budget |
|---|---|---|
| Draw calls, worst frame sampled | 13 | under 100 |
| Triangles, worst scene | 5,990 | none set |
| Textures | 3 at most, 256 px | none over 512 px |
| fps, average across branches | 55 | target 60 |
| fps, lowest one-second window | 32 | floor 30 |

The fps numbers are a CPU rasteriser on a cloud machine, not a phone. Draw calls and triangles are exact and small enough that a mid-range phone GPU should hold 60, but that has not been measured. 

Bundle, from a production compile (`next build`, gzip -9 of each chunk):

| Chunk | Gzipped | Loaded |
|---|---|---|
| `/drive/[rule]` page (player, panel, rule list) | 5.1 KB | on the scene page |
| Drive runtime (machine, world kit, stage, signs, audio) | 8.2 KB | lazily, on the scene page |
| One builder | 3.1 to 3.5 KB | lazily, the scene being played |
| **Drive code for one scene** | **about 17 KB** | budget 300 KB |
| three.js | 170 KB | lazily, drive pages only |
| `/drive` index page | 0.3 KB | |

Existing question pages gain only the link component and its 17-entry map, under 1 KB.

The production build compiled and type-checked. Its static page generation (2,525 pages for the whole site) was cut off at page 2,043 by this session's 10-minute command limit, not by an error, so `next start` was not exercised here; the Vercel preview build is the real check. Two hydration warnings appeared in the dev server during harness runs right after code edits and did not reproduce on six clean page loads.

## Tests and lint

- `npm test`: see the PR description for the count. New: `tests/drive-runtime.test.cjs` (9 tests: state machine, slow window, cues, reduced motion, motion helpers, seeded randomness) and `tests/drive-scenes.test.cjs` (11 tests: one smoke test per scene that builds the world and plays every branch frame by frame, plus records against the question bank, links, `?state=` selection, the flag).
- `npm run typecheck`: clean.
- `next lint` on the changed files: clean.
