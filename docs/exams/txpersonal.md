# Texas Personal Lines Property and Casualty Agent

Pearson VUE administers the Texas Department of Insurance Personal Lines Property and Casualty Agent exam in English and Spanish. The English exam code is InsTX-PersPC55. The exam allows 120 minutes for 75 scored general-knowledge questions, 25 scored Texas questions and 10 unscored questions. The official scaled passing score is 70.

Four English-language, untimed v1 forms each contain 50 single-answer questions. A raw score of 35/50 meets the Tigertest practice target. The official score scale and unscored items are omitted. Coverage focuses on personal lines.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Property Policies | 5 | 20 |
| Casualty Policies | 7 | 28 |
| Insurance Terms and Concepts | 14 | 56 |
| Policy Provisions and Contract Law | 12 | 48 |
| Texas Laws Common to All Lines | 7 | 28 |
| Texas Personal Lines Rules | 5 | 20 |

The app slug is `/txpersonal` and the landing is `/texas-personal-lines-insurance-practice-test`. The bank is `data/txpersonal-questions.json`, state code `TXPERSONAL`, question prefix `TXPER-`. Test IDs range from 54601 to 54604 and the topic sets use IDs 54601 to 54604. The catalog group is Real estate, insurance, securities & notary licenses in the US region. The theme is HSL 174, 8%, 30% with the `pnc` mascot.

Sources and question material live in `tools/practice/txpersonal/`. Rebuild with `python3 -I tools/practice/build_bank.py txpersonal`.

See the [official outline](https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124401.pdf) and [candidate information](https://www.pearsonvue.com/content/dam/VUE/vue/en/documents/publications/124400.pdf).
