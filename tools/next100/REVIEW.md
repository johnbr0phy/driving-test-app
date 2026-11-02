# Reviewer brief: fact and quality pass on one new bank

You review ONE bank built in this wave. Its builder's files are in `tools/next100/<id>/` (sources,
`build.py`, `sources.md`, `WIRING.md`), the bank in `data/v2/<id>/questions.json` (v2) or
`data/<name>-questions.json` (v1), the config in `lib/v2/exams/<id>.ts` (v2) or the ExamConfig block
in `tools/next100/<id>/WIRING.md` (v1), and the landing `app/<landing>/page.tsx`. Another agent is
wiring shared files at the same time: touch ONLY your exam's files listed above. No git, no npm.

## 1. Read every item
For each question ask: is the key right, is anything in the stem or explanation factually wrong or
out of date (as of October 2026), could a well-prepared candidate defend a different option, is it
too easy because the key stands out by length or tone? Does it ask about the test itself (its
length, pass mark, time, languages, booking, retakes, how long a pass is valid, who may sit it)?
Rewrite those as real subject questions in the same category: no real test asks them, however
accurate the fact. Recompute every number, every arithmetic and
data item, every unit conversion. For language items, check grammar and idiom in the language used
(Hindi items in `uppolice` need a careful Hindi read: spelling, matras, the grammar rule tested).
Use web search (ToolSearch `select:WebSearch`) for any fact you are not sure of.

## 2. Fix in the sources, then rebuild
Fix items in the Python sources (never hand-edit the JSON), keep the item count and every
`questionId` the same, rebuild with `python3 -I tools/next100/<id>/build.py`, and validate:
- v1: `python3 -I .claude/skills/exam-bank/scripts/validate_bank.py <file> --pool k=n ...` (pools
  from the spec) must print PASS.
- v2: run the validator from a copy that does not write `lib/v2/bankSizes.ts`
  (`sed '/bankSizes/...'` or copy `tools/validate_v2_bank.py` to /tmp and stub the write), with the
  plan in the builder's `WIRING.md`; it must report 0 problems. Key strictly longest under 25%.

## 2b. Sorted number options must not give the key away
Items whose options are all numbers are sorted ascending and locked. If distractors are written
around the key, the key lands in a middle slot almost every time and a test-wise candidate can drop
the smallest and largest. Count your bank: across all locked all-number items the key should sit in
the lowest or highest slot about as often as chance (4 options: about half the time in an end slot;
5 options: about 40%). Fix by choosing plausible distractors so the key is sometimes the smallest or
largest value (common errors that overshoot, or that undershoot), never by unlocking the order.

## 2c. Number keys match their explanations
For every item whose options are all numbers, confirm the marked key equals the value the
explanation arrives at (one bank had 12 items where the build marked the smallest value instead).

## 3. Duplicates across the wave
Compare against every bank in your family: all India banks in `data/v2/` (ssccgl, rrbntpc, ibpspo,
ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst, sbiclerk, sbipo, ibpsrrb,
biharpolice, rajpolice, delhipolice, mppolice, upscse, nda, agniveer, agniveervayu, rrbalp, rpfconst,
ssccpo, neet, jeemain, cuet, mhtcet, ugcnet, reet, uptet, aissee), the Nigeria banks (jambeng, jambmath, jambbio, jambchem, jambphys, data/nigeria-frsc-questions.json and the v1 banks of ngpolice, cdcfib, ngarmy, ngcustoms, trcnpqe in data/), the US school banks (appsych, apush, apbio, apworld, aplang, apcalcab, aphug, apgov, sat, act, psat, ged, praxis), and
the Philippines banks (phcse, phlet, and `data/philippines-lto-questions.json`). Compare your stems against all of them (normalised text,
same numbers, same key fact). Rewrite YOUR item when it duplicates or near-duplicates another bank's
item with the same numbers or the same fact and answer. Generic templates with different content
are fine.

## 3a. EU driving family
EU batch: compare against every EU driving bank (esdgt, ptimt, rodrpciv, setrafik, grdriving, dkteori, hukresz, bedriving, fitheory, mttheory) and the UK, Ireland and other v1 driving banks in data/. Rewrite items with the same scenario and answer as another bank.

## 3b. Passages and theme
Every item that reads a shared passage, cloze, table or puzzle carries `stimulusId`. Do not change the config's theme; the integrator owns hues.

## 3c. Native-language banks
For a bank written in (or translated into) another language, read it in that language:
- Grammar, spelling and register: questions neutral or formal like the official catalogues
  (German "Sie" or impersonal), UI copy in the consumer-app register (German "du", French "vous",
  Italian "tu", Polish "ty", Dutch "je", European Portuguese without pronouns).
- Official terms: the authority's own words for the test and the rules (StVO, Vorfahrt,
  permiso B, glorieta, Código da Estrada, rotunda), consistent with `glossary.md`.
- Typography: decimal comma, German „ “ and Polish „ ” quotes, French « » and a non-breaking space
  before ? ! : ;, km/h and m, dates DD.MM.YYYY.
- Every key against the cited article of the law or manual, as for any bank.
- Translations: run `validate_translation.py <base> <translation> --lang <lang>` (same ids, order,
  categories and keys; every text translated; the shuffle guard agrees per row) and fix the
  translation, never the key. Native banks: `validate_bank.py --lang <lang>`.

## 4. Landing and facts
Check every claim about the real exam on the landing, in the config's `scoreNote`/copy and in the
examFacts block of `WIRING.md` against `sources.md`. Fix anything unsupported or label it ("guides
say"). Try once more to reach the official notice or syllabus (direct PDF links on the exam body's
site often work when the HTML page does not, e.g. `ssc.gov.in/api/attachment/uploads/...`); if you
confirm or correct a figure, update `sources.md` with URL and date, and the landing, config and
WIRING.md examFacts block to match. No em-dashes. Plain apostrophes in metadata and JSON-LD,
`&apos;` in JSX text.

## Report
A short list: items changed (count and the questionIds with severity: wrong-key, factual,
ambiguous, weak, duplicate), facts confirmed or corrected with source, validator output, anything
still unconfirmed.
