# Corrective revision status

The first independent pedagogy review did **not pass**: options-only selection reached 174/200. Its 200/200 agreement after reading stems, keys and explanations established factual alignment for that version, not pedagogical approval. A second independent model review subsequently scored 163/200 options-only; the gate remains unresolved. See `draft-checkpoint.md` for the latest findings and selective fixes. No human review is claimed.

The corrective pass kept all 200 IDs, category counts and keyed positions. It rebuilt weak legal and administrative choices around competing documents, records, dates and roles, preserved sound numerical questions, and varied the 24 original French reading tasks. English location, object and time distinctions were retained. The booking-contact exception now identifies the reserving client rather than necessarily the passenger; vignette removal is explained as impossible without destruction.

After the user updated the workflow, the author read the current build-tests skill, exam-bank skill, wiring reference, landing-template test and v2-held-out test on base 0a24381b. A checkpoint commit made by the parent preserves the earlier draft; it is not approval. No fresh review or heavy check was started before the shortening pass.

## Short stems

Actual `check_stem_length.py` output: median **32 → 17 words**, against site median 14 and French driving-theory peer 13. Excluding the 24 genuine French reading items, the median is 16. The all-bank baseline command passes without adding FRVTC to the baseline. Passages remain in the v1 question field and are counted by the checker; no prose was relabelled to bypass it.

Examples:

- Formation: “Quelle durée et quelle périodicité s'appliquent à la formation continue obligatoire des conducteurs VTC ?”
- Reservation: “Réservation lundi à 14 h, prise en charge mardi à 9 h. Quelles mentions temporelles inscrire ?”
- Vehicle identification: “Quel montage respecte les exigences de fixation des vignettes VTC définitives ?”

The author reread all stems, four choices and explanations across the corrective pass and shortening reconciliation. Fixes included pronoun ambiguity, grammatical mismatches after shortening, missing actors for paired comparisons, a dangling name, and preserving cash timing needed to explain numerical distractors. Calculations and required conditions were retained. This author check is not a substitute for the requested independent review.

## Current automated evidence

All seven category validators (`--lang fr`, actual row count) and the full 200-item validator pass. Key positions remain 50 per letter. Full-bank average option length is 36 characters; uniquely longest keys 18%; keys exceeding 1.2 times the distractor average 4%.

No shared option sets. Echo gain is +0.3 marks per 50 for the full bank; per category T3P 0.0, management +1.6, road safety +0.7, French +0.5, English +1.04, commercial +0.3, VTC regulation −1.2. English has only 12 items, so direct `analyse(load_items(...))` supplements the CLI's under-20 exclusion. Its direct answer-pattern result has no tells, repeats or runs.

Exact repeated choices are only ordinary numerical answers: 60 €, 110 km/h, 25 %, 30 €, 80 %, 10 €, 75 €. No textual choice is repeated exactly. The non-failing validator warning for the fragment “hicule” (rarely keyed) is retained; correct answers were not changed to force a keyword distribution. The option-reference check reports zero positional references.

All 200 source labels resolve. The Python bank and source map reproduce exactly. Source validation reports 55 dated primary pages. No new legal facts were inferred from an unread source. The official QCM multi-answer instruction remains unconfirmed and is not asserted; the app's single-answer format and other official-format limitations remain disclosed.

## Landing and integration

The native French wrapper still uses shared `TranslatedExamLanding` with samples and related exams, as required by the native-language wiring instructions. Its shared structure has the centred gradient hero, facts, two How It Works cards, topics, four tips, samples, FAQ, related tests and gradient CTA. No compact custom layout or local component fork was introduced. The v2 held-out rule is understood but does not apply to this v1 bank.

The full sequential `scripts/automerge-checks.sh` completed with exit 0 after the bank stabilized: TypeScript, lint (existing warnings), all 963 tests, bank/schema/parity checks, option-reuse and stem-length baselines, freshness and generated source-manifest checks passed. No PR, preview or screenshots have been produced for this revision. The original checkout and CDM were not modified.

Logs: `/Users/johnbrophy/tigertest-next20-progress/frvtc-research/validation-v3-final.log` and `automerge-v3-final.log`.
