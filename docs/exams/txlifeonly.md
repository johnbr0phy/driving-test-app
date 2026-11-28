# Texas Life Agent Licensing Examination

Pearson VUE administers the Texas Department of Insurance Life Agent examination. English exam code InsTX-Life01 allows 120 minutes for 50 scored general knowledge questions, 30 scored Texas law questions and 10 unscored questions. Pearson VUE reports a scaled passing score of 70.

Four English-language v1 forms contain 50 single-answer questions each. A raw score of 35/50 meets the Tigertest practice target. Pearson VUE uses its own score scale. This bank follows the Life Agent outline, a separate qualification from General Lines Life, Accident and Health.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Life Policies and Annuities | 9 | 36 |
| Riders, Provisions and Options | 9 | 36 |
| Underwriting and Policy Delivery | 8 | 32 |
| Retirement and Other Insurance Concepts | 5 | 20 |
| Texas Laws Common to Life and Health | 13 | 52 |
| Texas Life Insurance Law | 6 | 24 |

The app slug is `/txlifeonly` and the landing is `/texas-life-agent-practice-test`. The bank is `data/txlifeonly-questions.json`, state code `TXLIFEONLY`, question prefix `TXLO-`. Test IDs range from 54801 to 54804 and the topic sets use IDs 54801 to 54805. The catalog group is Real estate, insurance, securities & notary licenses in the US region. The theme is HSL 238, 6%, 40% with the `insurance` mascot.

Sources and question material live in `tools/practice/txlifeonly/`. Rebuild with `python3 -I tools/practice/build_bank.py txlifeonly`.

See the [official outline](https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124401.pdf) and [candidate information](https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124400.pdf).
