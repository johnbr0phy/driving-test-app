# NCMHCE bank sources

Every question in `data/ncmhce-questions.json` is original, written by Tigertest from the rules and
references below. No NBCC sample case study (the handbook's Appendix B and the "Sample Case Studies"
tab were deliberately not read), no past exam item and no prep company's or app's case or question
was used or reworded.

## Content outline (the bank's blueprint)

- NBCC, "Content Outline: The National Clinical Mental Health Counseling Examination (NCMHCE)",
  revised October 8, 2025, https://www.nbcc.org/assets/exam/ncmhce_content_outline.pdf , fetched
  2026-11-23 and read as PDF text. Table 1 gives the scored-item weights: 1 Professional Practice
  and Ethics 15%, 2 Intake, Assessment, and Diagnosis 25%, 3 Areas of Clinical Focus (no item weight:
  the diagnoses and presenting problems the cases are built on), 4 Treatment Planning 15%,
  5 Counseling Skills and Interventions 30%, 6 Core Counseling Attributes 15%. Table 2 lists the
  tasks under each domain (informed consent, limits of confidentiality, group rules, MSE, level of
  care, co-occurring diagnoses, assessing risk, SMART-style goals, referral and termination, linking
  and blocking, group stages, crisis intervention, safety plans, telemental health, empathy,
  genuineness, congruence, positive regard). The last page gives the format: 11 case studies (one
  unscored), each one narrative in three sections (intake summary and two sessions) with 9 to 15
  four-option questions, 100 scored items, passing score by standard setting and equating.
- Tigertest's split of 50 questions a test: ethics 8, intake/risk/level of care 6, DSM-5-TR diagnosis
  6, treatment planning 7, theory-based interventions 8, group/family/crisis work 7, core counseling
  attributes 8 (16/24/14/30/16%, the outline's 15/25/15/30/15 rounded to whole items). Areas of
  Clinical Focus is carried by the vignettes themselves, as on the real exam.

## Format, scoring and the 2027 change

- NBCC, "Candidate Handbook for State Licensure: NCMHCE", revised Nov. 20, 2025,
  https://www.nbcc.org/assets/exam/handbooks/ncmhce.pdf , fetched 2026-11-23: 11 case studies,
  100 scored items, 225 minutes of testing with one 15-minute break after the fifth case study,
  255-minute session; Pearson VUE test center or OnVUE online; a 30-day wait before a retest, the
  number of attempts set by the state board. Fees are in the handbook and deliberately not used.
- NBCC, "NCMHCE Examination Specifications, Effective July 1, 2027",
  https://www.cce-global.org/Assets/exams/NCMHCE_exam_spec_2027.pdf , fetched 2026-11-23: a new
  blueprint from the 2024-2025 work analysis (Professional Development & Counselor Self-Awareness 15,
  Intake & Assessment 18, Treatment Planning & Continuity of Care 15, Provision of Counseling
  Interventions 20, Indirect Client Care 12, Legal & Ethical Compliance 20), 10 case studies,
  130 to 150 questions of which 30 to 50 are field-test items, 3 hours 45 minutes with an optional
  15-minute break and no return to the first half, scaled scores 100 to 500 with 360 to pass. Used for
  the landing, examFacts and the freshness event only; the bank follows the outline in force now. Most
  of the 2027 content (ethics, telemental health, documentation, levels of care, relapse prevention,
  discharge planning) is already in the current bank.
- NBCC NCMHCE page, https://www.nbcc.org/exams/ncmhce , found 2026-11-23 (search result only): links
  the outline, handbook, sample case studies and the 2027 specifications.

## Law, ethics and clinical references (facts in items)

- American Counseling Association, "2014 ACA Code of Ethics",
  https://www.counseling.org/docs/default-source/default-document-library/ethics/2014-aca-code-of-ethics.pdf ,
  fetched 2026-11-23 and read as text: A.5.c (no sexual or romantic relationship with former clients
  for five years), A.5.e (no personal virtual relationships with current clients), A.6.e
  (nonprofessional roles), A.8 (multiple clients), A.9.a (screening group members), A.11 (termination
  and referral; values within referral), B.1.c, B.2.a (serious and foreseeable harm), B.2.c
  (contagious, life-threatening diseases), B.4 (groups and families), B.5 (clients lacking capacity),
  B.6 (records, client access, permission to record and observe), C.2 (boundaries of competence,
  new specialty areas, continuing education), H (distance counseling: verification of identity,
  permitted laws of both locations, emergency procedures).
- HIPAA Privacy Rule, 45 CFR 164.508 (authorizations; psychotherapy notes need their own
  authorization) and 164.524 (right of access, with psychotherapy notes excluded), Cornell LII text,
  https://www.law.cornell.edu/cfr/text/45/164.508 and https://www.law.cornell.edu/cfr/text/45/164.524 ,
  fetched 2026-11-23 (hhs.gov returned 403).
- American Psychiatric Association, DSM-5-TR (2022) criteria as summarized on
  https://www.psychiatry.org/psychiatrists/practice/dsm , checked 2026-11-23 (durations and
  specifiers used in diagnosis items: adjustment disorder onset within 3 months; persistent depressive
  disorder 2 years; acute stress disorder 3 days to 1 month; cyclothymic disorder; prolonged grief
  disorder 12 months for adults; insomnia 3 nights a week for 3 months; illness anxiety; binge-eating
  disorder; brief psychotic disorder under 1 month; schizophreniform 1 to 6 months).
- 988 Suicide & Crisis Lifeline, https://988lifeline.org/ , fetched 2026-11-23 (call, text or chat
  988; samhsa.gov returned 403). Stanley and Brown safety planning steps and lethal means counseling
  are named as standard practice, not from this page.
- Other standard references named in explanations: Yalom's therapeutic factors, Tuckman's group
  stages, Prochaska and DiClemente's stages of change, Miller and Rollnick's motivational interviewing,
  Rogers's core conditions, Beck's cognitive therapy, Ellis's REBT, solution-focused brief therapy,
  narrative therapy, Bowen, Minuchin, Satir and strategic family therapy, ASAM levels of care.

## Not modelled or left out

- The case-study format (a narrative in three sections with 9 to 15 linked questions) is not
  modelled: each question is a short self-contained vignette. The landing says so.
- State law (duty-to-warn statutes, mandated-reporting timelines, license requirements, record
  retention periods) varies by state and is not asserted; items say "state law" where it matters.
- Fees, pass rates and the scaled passing score of a given form are not asked.

## Repeats checked

Every key and fact was checked against `data/nce-questions.json`, `data/aswb-clinical-questions.json`,
`data/aswb-masters-questions.json`, `data/adc-questions.json`,
`data/philippines-psychometrician-questions.json` and the EPPP bank in progress (wt-eppp) by
normalized key text and stem words (script in the build notes); matches were rewritten to a different
fact or angle.
