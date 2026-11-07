# Notes on the Swedish (sv-SE) translation of `setrafik`

- Machine translation by Claude (review status `machine`), pending review by a native speaker
  who knows Trafikverket's and Transportstyrelsen's wording.
- Terms follow `glossary.md` (trafikförordningen 1998:1276, Transportstyrelsen's vägmärken
  pages, körkortsboken vocabulary). Register is "du" everywhere, as Trafikverket and
  Transportstyrelsen write to learners.
- The English bank keeps Swedish terms in brackets ("the right-hand rule (högerregeln)"). In
  Swedish the term stands alone, so a few stems and explanations are shorter than the base;
  validate_translation.py warns on SETRF-JNC-028 and SETRF-VEH-010 for that reason only.
- Every questionId, category, correctAnswer, correctIndex and option order is copied from the
  English bank by `build.py`; only text comes from the `t_*.py` sources. Edit those and rebuild,
  never the JSON.
- Numbers: decimal comma (0,2 promille, 3,5 t), space as thousands separator (3 500 kg),
  kl. 18 for times, ”…” quotes. No em or en dashes.
- No option refers to other options, so the shuffle guard is off for every row in both banks.
- Kept from the English, as facts (not re-checked here): the 80 km/h trailer limit with the
  consultation note, 1 Dec to 31 Mar winter tyres, 1 Oct to 15 Apr studs, 0,2 and 1,0 promille,
  the 2018 handheld phone ban, the handledare rules (24 years, five of the last ten), two years'
  prövotid, trafikförordningen 3 kap. 45 § and 53 §.
- SETRF-SGN-003 was rephrased so all four options fit the stem ("innebär oftast: Ett påbud /
  En varning för fara / Ett förbud / Vägvisning"); the key and order are unchanged.
- SETRF-PER-012 option B reads "Eleven och handledaren lika mycket" (English "Both of them
  equally"), because an option starting "Båda" trips the Swedish shuffle-guard list.

Rebuild and check:

    python3 -I tools/next100/setrafik/sv/build.py
    python3 -I .claude/skills/exam-bank/scripts/validate_translation.py \
      data/sweden-driving-theory-questions.json data/sweden-driving-theory-questions_sv.json --lang sv
