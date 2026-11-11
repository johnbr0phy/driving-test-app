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
9. **Double arrow: one correct action, not two.** Both sides are legal, so I staged it with you in the left lane and a car beside you. "Stay in my lane" is then the only sensible action, and the wrong options carry their reasoning in the label ("Move right: I must keep right of the island") so the misreading is what gets corrected.
10. **Parking wrong choices are always closer than the limit.** Parking further back than required is legal, so it is never offered as a wrong answer.
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
31. **The scene fills the screen on Start** by scrolling itself to the top, instead of hiding the site header. Less code than a new runner path, and the way out stays visible on arrival.
32. **Nothing in Premium, pricing or locks was touched.**

## Verification

33. **Screenshots are not committed** (`/shots/` is gitignored, about 20 MB a run). Five small JPEGs for the PR live in `docs/drive/`.
34. **fps is measured in headless Chrome with software WebGL**, which is slower than a phone GPU. I could not measure on a real mid-range phone from this session and say so in the PR.
35. **The harness uses `CHROME_PATH`** when the project's Playwright has no browser of its own, which is the case in cloud sessions.
