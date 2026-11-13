# Drive the Question: decisions

Every call I made without asking, newest concerns last. Each has the reason and what to change if you disagree.

## Data and picks

1. **Answer data came from the public `/api/community-stats` endpoint.** No Firestore credential was available, and that endpoint is the site's own read-only view of the nightly aggregate. One GET, no writes.
2. **"Common DMV questions" means the 160 universal questions.** They are the ones every state gets, and the only ones with public answer counts.
3. **States = 51 for every rule.** A universal question is asked in every jurisdiction, so the states factor does not separate the rules; the score is in effect wrong answers x 51. State-specific questions on the same rule (79 school bus questions across 38 states, 10 parking questions across 7) could not be scored because they have no public counts.
4. **Tight clustering.** Questions share a rule only when they test the same fact from the same source rule. A looser grouping of all curve signs would outrank three picks; see DRIVE-PICKS.md.
5. **Sign-shape and sign-colour questions are not stageable**, though they are the biggest cluster by far. Naming a pentagon is not a driving decision. This is why the picks start at rank 3.
6. **The school bus rule was not built.** It was the example in the brief, but it ranks 13th on the data. The builder contract would suit it well (stopping distance in feet and the divided-highway exception are state data).

## Rules and records

7. **Wisconsin and Massachusetts records were left out** because their numbers could only be confirmed from secondary copies. A wrong rule is a release blocker, so unverified means not shipped.
8. **The bump sign reads BUMP.** The MUTCD has no picture version; I did not invent one even though the bank question says "a sign with bumps".
9. **Double arrow: one correct action, not two.** Both sides are legal, so I staged it with you in the left lane and a car beside you; the right answer ("Traffic may pass on either side of obstruction") then plays "hold your lane", and the wrong answers play the misreading (merge right, stop).
10. **Parking answers that are farther than the limit are legal but still wrong.** The bank's answers include 25 and 30 feet. The scene parks there safely (the person crossing is in view) and the card says so plainly: safe and legal, but the limit is 20 feet, so 25 is marked wrong on the test. No invented danger.
11. **One record can cover sibling questions** (`alsoCovers`): U-012 also covers U-056 and U-081, U-009 covers U-010. Crosswalk (U-080) and hydrant (U-079) are separate records on the same builder, which is the contract working as intended.
12. **`?state=XX` falls back to the universal record** when a state has none. For four of the five rules that is correct everywhere (MUTCD signs and signals are national). For parking, the universal rule text says some states differ.
13. **`?q=<questionId>` was added** next to `?state=` so a question link can open its exact record (the hydrant variant).
14. **I did not edit the question bank**, though the check suggests U-025 and U-056 could be reworded.

## Architecture

15. **`src/drive/` in plain `.js`**, as the brief specified, in a repo that is otherwise TypeScript at the root. React wrappers are `.tsx` in `components/drive/` and `app/drive/`.
16. **Builders do not import three.js.** They get a `world` kit and return an `update(view)` function; `describe(record)` is pure. That is what lets the smoke tests build and play every scene in Node without a GPU.
17. **Every motion is a pure function of segment time** (`drive()` speed profiles, `track()` keyframes). No physics, no accumulated state. That gives determinism and makes reduced motion a jump to still frames.
18. **Static scenery is one merged, vertex-coloured mesh.** Result: 3 to 10 draw calls a scene against a budget of 100, and three small canvas textures at most (256 px).
19. **Decisions and results are HTML beside the canvas, not drawn in it.** Real buttons, real focus, an `aria-live` caption. Portrait puts the panel under the picture, landscape beside it, so targets never cover the road.
20. **Slow motion is 0.5 scene seconds stretched to about 4 real seconds, then a freeze.** A choice made early still plays the last half second at full speed so nothing jumps.
21. **Wrong at decision 1 ends the scene.** No partial credit path through decision 2.
22. **Sound is four synthesized effects** (horn, thump, ding, buzz), no audio files, with a Sound on/off button. "Ticket lights" are a police light bar; there is no siren.
23. **three.js is pinned at 0.170.0** and imported only by `runtime/world.js` and `runtime/stage.js`, both reached only through `import()`.

## Product

24. **The flag is `NEXT_PUBLIC_DRIVE_ENABLED`.** Unset: on in development, on in Vercel preview deployments (so this PR can be tried), off in production. Set it to `on` in production to launch, `off` anywhere to kill. It is build-time, so a change needs a deploy.
25. **Flag off means the routes 404** and the link component renders nothing.
26. **Drive pages are not in the sitemap or llms.txt yet.** They would be 404s in production. Adding them is a launch step, listed in DRIVE-NEXT.md.
27. **English only.** "Drive this question" is hidden for other interface languages.
28. **The link appears in three places**: the training explanation box, the results debrief and the miss drill. Not on the stats page or Common Mistakes tab, which I left alone to keep the diff small.
29. **Analytics is GA4 only**, through the existing `window.gtag`, so consent rules apply unchanged. No new Firestore counter and no /admin card.
30. **"Take the full test" goes to `/dmv/dashboard`**, carrying `?state=` when present.
31. **The scene is exactly one phone screen** (changed Nov 12 after review; it used to scroll the site header away on Start). Scene pages are runner paths, so the site header is hidden and the shared `FocusBar` (✕ to `/drive`, title, sound) takes its place; the panel never scrolls. The SEO text about the rule stays below the scene, reached by scrolling the page, because the brief asks for a static text version for search engines.
32. **Nothing in Premium, pricing or locks was touched.**

## Verification

33. **Screenshots are not committed** (`/shots/` is gitignored, about 20 MB a run). Five small JPEGs for the PR live in `docs/drive/`.
34. **fps is measured in headless Chrome with software WebGL**, which is slower than a phone GPU. I could not measure on a real mid-range phone from this session and say so in the PR.
35. **The harness uses `CHROME_PATH`** when the project's Playwright has no browser of its own, which is the case in cloud sessions.
36. **A short citation on the card, the full one below.** A full citation ("FHWA Manual on Uniform Traffic Control Devices, 11th Edition, Section 2C.53 ...") takes three lines on a phone. Each record now carries `citation.short` (at most 40 characters, checked by `validateRecord`), shown as the link on the result card with the full source as its tooltip; the page text under the scene keeps the full citation.
37. **The parking card no longer tells you to edit the address.** "Add your state to the address to see its rule" was an instruction, not a rule, and cost two lines. The universal record says "In most states" instead; `?state=` still works for the five states with records.
38. **The decision is the test question, word for word, with its four answers** (Nov 12, after review). Each decision in a record names its bank `questionId` and carries the bank's prompt and options A to D as written; `tests/drive-scenes.test.cjs` fails if a word or the key drifts from `data/questions.json`. Answers are shuffled with the record's seed and lettered A to D by position, as the test shuffles them. The situation lines I had written ("The truck is slow...") are gone from the decision; the scene's opening caption still sets it up.
39. **Every answer plays the action its belief leads to.** Each option names an `action` (a choreography) and, when wrong, its own consequence sentence explaining that belief. Several answers can share one action ("School zone" and "Yield ahead" both mean you did not know passing was banned, so you pass); an action is never both right and wrong (the machine and `validateRecord` both refuse it). "Merge lane" plays the shoulder run, "Signal is broken" plays speeding through the yellow, "Stop then proceed" plays stopping at the yellow.
40. **U-056 and U-081 have their own records** on the no-passing scene, so their "Drive this question" links ask their own questions instead of the pennant one. U-010 (flashing yellow) is the second decision of the flashing-signals record. The bump scene's "fast" choreography is no longer used by any bank answer and stays in the builder for a future record.
