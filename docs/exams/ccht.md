# Certified Clinical Hemodialysis Technician

The Nephrology Nursing Certification Commission (NNCC) awards the entry-level CCHT credential. The real exam has 150 questions in three hours, including about 25 unscored pilot questions. NNCC reports a passing standard score of 95, which corresponds to about 74% correct on scored items.

Four untimed v1 practice tests each contain 50 single-answer questions. All questions count toward the practice target of 37/50. The Clinical domain accounts for 25 questions, split into two study topics. Technical has its own set. Environment and Role Responsibilities share a 56-question set.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Patient Preparation and Vascular Access | 12 | 48 |
| Treatment Monitoring and Completion | 13 | 52 |
| Technical | 11 | 44 |
| Environment | 8 | 32 |
| Role Responsibilities | 6 | 24 |

The app slug is `/ccht` and the landing is `/ccht-practice-test`. The bank is `data/ccht-questions.json`, state code `CCHT`, question prefix `CCHT-`. Test IDs range from 54701 to 54704 and the topic sets use IDs 54701 to 54704. The catalog group is Healthcare certification exams in the US region. The theme is HSL 280, 24%, 46% with a dedicated `ccht` mascot in teal scrubs holding a dialyzer.

Sources and question material live in `tools/practice/ccht/`. Rebuild with `python3 -I tools/practice/build_bank.py ccht`.

See the [official outline](https://www.nncc-exam.org/sites/default/files/cchtSpecifications_2021_08272021.pdf) and [candidate information](https://www.nncc-exam.org/certification/ccht).
