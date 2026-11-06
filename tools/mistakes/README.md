# Mistake explainers: the verification workflow

Healthcare explainers (any `medical: true` storyboard in `lib/mistakeExplainers`)
teach people who will treat patients, so nothing is said or drawn that an
official source does not say. Every step below is required.

## 1. Pick the question
- Only from the exam's open Common Mistakes list (`/api/community-stats?exam=<id>`).
- Start with stable facts (anatomy, mechanisms, drug classes). Leave doses,
  local protocols and state law for later.
- A hook never claims a miss rate; use an approved hook ("Here's a tricky one.").

## 2. Save the sources first
- Official, public-domain or openly licensed sources only: CDC, NIH (NHLBI, NCI,
  NLM MeSH, DailyMed FDA labels), WHO, FDA, standards bodies' free text.
- **Never** MedlinePlus Medical Encyclopedia (`medlineplus.gov/ency/*`): it is
  A.D.A.M. content whose terms forbid AI use and automated extraction.
  MedlinePlus health topic pages are NLM's own and fine.
- Save each as verbatim text in `tools/mistakes/sources/<name>.txt` with a
  `URL:`, `TITLE:` (name the publisher) and `RETRIEVED:` header. Do not get
  around a site that blocks automated downloads; find another official source.
- If no source says it, it does not go in the video. (The phlebotomy EDTA
  question was dropped for this reason: no open source says "preserves cell
  morphology".)

## 3. Write the claim ledger
`tools/mistakes/claims/<id>.json`: the bank question and key, the sources,
every spoken line with the exact quotes it rests on, every on-screen label
with its quote, open `notes` for the human reviewer, and `review`.
Mirror the lines into the storyboard in `lib/mistakeExplainers/index.ts`.

## 4. Run the checker
`npx tsx scripts/check-mistake-claims.ts` fails on: a quote not in its source
word for word, a line with no quote, a number, absolute word (always, never,
only...) or content word that no quote, the bank question or the generic list
supports, a wrong answer key, or a ledger that differs from the storyboard.
`npm test` runs it for every medical explainer.

## 5. Independent AI review
- **Blind:** a fresh agent answers the question from the saved sources without
  seeing the key or the ledger. It must agree with the key.
- **Adversarial:** one agent per video tries to break the script line by line:
  meaning drift, dropped qualifiers, harmful omissions, out-of-date guidance,
  licence problems, pronunciation, drawing accuracy. Fix, then send it back
  until it returns `VERDICT: pass`. Record each round in `review.ai`.

## 6. Voice and drawing
- eleven_v4 with audio tags; hard names get IPA (or a respelling such as
  "bundle of Hiss") in the voice text only, never in `say`.
- The transcript only aligns the voice text, so it cannot prove pronunciation:
  a person listens.
- Every drawn label is in the ledger's `visuals`. Check still frames
  (`node scripts/film-mistake-explainers.mjs --design 3 --at <s> <id>`).

## 7. Qualified human review (the gate)
A medical explainer shows **DRAFT · NOT REVIEWED** and is never linked from the
site until someone qualified in that field (for example a phlebotomist, nurse,
pharmacist or CST/CRCST educator) has watched it, read the ledger's notes and
signed off. Record `review.human` as `{ "name", "credential", "date" }`.

## 8. Keep it current
Not wired yet: each source URL should join the source watch
(`lib/examSources.json` via `tools/build_exam_sources.py`) so that when a
source changes, the video goes back to step 4.
