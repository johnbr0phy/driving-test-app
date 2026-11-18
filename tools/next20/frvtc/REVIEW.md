# French VTC bank review, Nov 18 2026

Repaired and reviewed under the cue-based options-only rule (PR #889).

## What changed from Codex's draft

- About 75 items rewritten or replaced across all seven sections. A first blind options-only
  pass found the key by its form in 52 of 200 items (the one sensible option among obviously
  bad ones), and about ten items were logic puzzles, e.g. which event withdraws consent after
  "je ne veux plus continuer". Replacements test syllabus content: Code des transports rules
  (REVTC, carte professionnelle, signalétique, booking proof), Code de la route figures,
  accounting and invoicing, CNIL prospection rules, consumer mediation, market-study concepts.
- The Français section is grammar, vocabulary and short-text comprehension; Anglais is A2
  English for passengers, with wrong options that are real learner errors.
- Facts come only from the saved official texts (Code des transports, Code de la route pages,
  arrêtés, Service Public, Bpifrance, CNIL); see `sources.md`.

## Reviews (fresh agents that never saw the keys; files in `review/`)

1. Blind key and French review of the draft: 200/200 agreed; 11 flags (logic puzzles, wording).
2. Options-only pass on the draft: 139/200, 52 surface-cue hits. All rewritten.
3. After the rewrite: blind key and French review 200/200 agreed, no factual, second-answer
   or language problems; four minor puzzle flags, of which T3P-027 was replaced (licence held
   3 years) and the rest kept. Options-only 130/200 (65%), 16 surface-cue hits; 12 rewritten.
4. Options-only recheck of the 13 changed or flagged items: 3 hits, two of them then reworded
   again (COM-007, T3P-016); REG-027 kept (it rests on knowing the Imprimerie nationale sends
   the file). Bank estimate about 6 surface-cue hits, the 3% limit. Not re-reviewed after
   those last two edits.

All language review is model review (Claude), not a native French human reviewer.

## Checks

`scripts/automerge-checks.sh` passed on the branch merged with main; validator (`--lang fr`),
option reuse and stem echo, stem length (median 16) and answer patterns pass on the final
bank. Landing `/fr/examen-vtc` previewed on the dev server (status 200, no page errors);
screenshots `public/landing/frvtc-*-fr*.png`, light and dark.
