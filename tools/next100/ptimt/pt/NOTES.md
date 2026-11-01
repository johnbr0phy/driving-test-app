# ptimt pt-PT translation notes

- Source: `t01.json`..`t04.json`, questionId -> [question, optionA, optionB, optionC, optionD,
  explanation]. Build and validate with `python3 -I tools/next100/ptimt/pt/build_pt.py`, which writes
  `data/portugal-imt-questions_pt.json` (ids, order, type, state, category, correctAnswer and
  correctIndex copied from the English bank). Edit the t0N files, not the built JSON.
- Machine translation (by a model), November 2026, pending native review (`review: { pt: "machine" }`).
- Translation choices that a reviewer may want to check:
  - PTIMT-MRK-003 C "Only you" -> "Apenas quem circula no seu sentido" (avoids gendered "o senhor").
  - PTIMT-MRK-017: the English stem asks which lights on reversible lanes; options use the CE names
    with the colloquial in brackets: "Luzes de cruzamento (médios)".
  - PTIMT-SIN-006/007: the English stem "You must:" with descriptive options was recast as "O sinal
    indica:" / "O sinal dá-lhe:" so the options read naturally; meaning and key unchanged.
  - PTIMT-SIN-033 B "Police check point" -> "Operação STOP da polícia" (the Portuguese term for a
    roadside police check).
  - PTIMT-SPD-021: "single-lane road" rendered as "via com uma só via de trânsito em cada sentido"
    (CE art. 18 wording).
  - Sign names follow the RST where a name exists (sentido proibido, trânsito proibido, cruz de Santo
    André, passagem de nível com/sem guarda, fim de todas as proibições).
- Key-is-longest rate: 38/200 (English 31/200). No "A e B", "Ambas", "Todas/Nenhuma das anteriores"
  options, so the shuffle guard never locks a row.
