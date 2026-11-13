# Drive the Question: what next

Ranked by what I would do first.

1. **Measure on real phones before launch.** fps here is from software WebGL. Play all five on a mid-range Android and an older iPhone, portrait and landscape.
2. **Curve signs scene** (curve, winding road, chevron, advisory speed: 3,023 wrong answers together). Pick a speed into a bend. It would have made the top five under a looser clustering.
3. **Right turn on red** (1,915 wrong answers, rank 8). Stop, look for the sign, turn or wait. Needs a working three-colour signal, which the beacon almost is.
4. **School bus.** Rank 13 on universal data, but 79 state questions in 38 states ask it, and stopping distance and the divided-highway exception are exactly the kind of state data the record contract carries. New York's stricter rule alone justifies it.
5. **Wisconsin and Massachusetts parking records**, once someone reads the official statute pages. One JSON file each.
6. **Per-state parking records for every state.** The universal 20 and 15 feet are wrong for some states that have no bank question on it. A table of all 51 from the statutes would make `?state=` trustworthy everywhere.
7. **Launch plumbing**: sitemap segment, llms.txt lines, a card on the DMV dashboard, an Open Graph image per scene, a `dateModified`.
8. **A drive funnel on /admin**: starts, first-choice accuracy per scene, retries, clicks to the test. The GA4 events are already there; a Firestore counter would make it visible next to the other cards.
9. **Use the per-option pick counts** (`questionPicks/dmv`) to choose wrong actions. The most-picked wrong option is the misreading the scene should stage.
10. **Translations.** Spanish first: the DMV runs in Spanish in every state. Records hold all the copy, so it is a second record file per question plus panel strings.
11. **Reword two bank questions** the check flagged: U-025 ("a sign with bumps" has no picture version in the MUTCD) and U-056 (a single solid yellow center line is not a standard two-way marking).
12. **Polish**: turn signals, wheels that turn, a brake squeal, a night variant for headlight rules, a replay of the near miss from the other driver's seat.
13. **Tests in a real browser in CI.** The harness could run on PRs that touch `src/drive/` and fail on a branch that does not reach a result.
