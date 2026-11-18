# FRVTC author self-review, 17 November 2026

This is a model author review, not an independent, native-speaker or human review. All 200 stems, all 800 options, all keys and all explanations were read in category order and compared across the complete bank before wiring. All 200 source-map entries resolve to the source catalog. The initial broad blueprint is reconciled with the final per-item objectives in item-source-map.json.

Revisions removed an exam-progression question, differentiated adjacent objectives, replaced obvious or unrelated distractors, clarified law-specific circumstances, and reduced stem-echo cues. Language items use original independent texts; English answers depend on the dialogue context. Commercial calculations were recomputed and neighbouring values represent identified calculation errors. Regulatory text uses current operative law where guidance summaries disagree.

Final category validation (`--lang fr`, expected category row count) and full-bank validation pass. Full bank: 200 items, exactly 50 A/B/C/D keys each, average option length 37 characters, key uniquely longest 13%, key over 1.2 times distractor average 3%. Answer-pattern checks pass. Option reuse: zero shared option sets; echo gain −0.6 marks/50, reverse-echo gain +0.2. Every category has echo gain below 2 marks/50. English has only 12 items, so the CLI's under-20 skip was supplemented with direct `analyse(load_items(...))`: no patterns, repeats, runs or shared sets; echo −1.04, reverse +0.35 marks/50.

Exact option reuse is confined to seven ordinary numerical answer texts: 60 €, 110 km/h, 25 %, 30 €, 80 %, 10 €, 75 €. There are no repeated textual option families. The validator's non-failing warning that “client” is rarely the key (1/19 appearances) is retained transparently; keys were not changed to force a keyword distribution.

These checks do not establish factual or pedagogical perfection. Independent options-only, blind-facts, French-language and pedagogical review remain pending with the parent orchestrator. Official QCM multi-answer instructions could not be confirmed; the landing states the app's single-answer format without claiming the official format is single-answer. Written answers, written-expression marking, official weighted minima and practical/oral assessment are explicitly outside this app format.

Repository integration checks completed successfully; results follow. No production build, preview, screenshot, commit, PR, human review or approval is claimed here.

## Reproduction

```sh
python3 tools/next20/frvtc/build.py --output data/france-vtc-questions.json --source-map tools/next20/frvtc/item-source-map.json
python3 .claude/skills/exam-bank/scripts/validate_bank.py data/france-vtc-questions.json --lang fr
python3 tools/check_answer_patterns.py data/france-vtc-questions.json
python3 tools/check_option_reuse.py data/france-vtc-questions.json --list
python3 tools/check_sources.py frvtc
```

Use Python 3.10+ for repository source/check scripts. Add `--category t3p` (or gestion, securite, francais, anglais, commercial, reglementation) and an external output path to reproduce an individual pool. All category outputs must be validated with their actual row count and `--lang fr`.

## Integration verification

The complete `scripts/automerge-checks.sh` sequence passed with Python 3.12 on the final wiring: TypeScript, ESLint (zero errors), all 957 repository tests, training-part/bank-size generation checks, state fact generation check, question review, all-bank schema/key/uniqueness checks, answer-pattern and option-reuse baselines, freshness and generated source registry. The first run identified missing generated email-palette and launch-date entries; they were generated before the successful final run. Unrelated historical landing-date changes produced by local history were not retained.

A runtime smoke check confirmed four disjoint 50-question slices covering all 200 IDs, exact 9/6/9/6/3/9/8 counts in each test, all five training-set sizes, nine dashboard steps and the normal v1 Premium locks on training set 5 and test 4. Source validation reports 55 primary pages and 55 dated reads. `git diff --check` passes. The canonical Python source reproduces the bank and item map exactly.

Full logs are outside the repository under `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/`: `validation-final.log` and `automerge-checks-final.log`. Independent review and parent-orchestrated preview/screenshots remain pending. No commit or PR has been made.
