# UPSC Civil Services Prelims, GS Paper I (`upscse`) sources

All checked 2026-11-01.

## Pattern followed

**Union Public Service Commission, Examination Notice No. 05/2026-CSE, dated 04.02.2026** (Civil Services
Examination, 2026; last date for applications 24.02.2026). upsc.gov.in reset every connection from this environment
(HTTP 403 to WebFetch, connection reset to curl), so the notice was read as a PDF copy hosted by a coaching site,
https://www.insightsonindia.com/wp-content/uploads/2026/02/UPSC-EXAM-Notification-2026.pdf (2.9 MB, text extracted with
pdftotext; its header, notice number and wording are UPSC's). The notice states:

- Section I, para 2: the Preliminary Examination has two papers of objective type (multiple choice) carrying a
  maximum of 400 marks; it is a screening test only, and its marks are not counted for the final order of merit. About
  12 to 13 times the number of vacancies are admitted to the Main examination.
- Section I, Note I: the list for the Main examination is drawn on the minimum qualifying marks of 33% in GS Paper II
  and the total qualifying marks of GS Paper I as determined by the Commission.
- Section I, Note II (negative marking): four alternatives for every question; for each wrong answer one-third (0.33)
  of the marks assigned to that question is deducted; more than one answer is treated as wrong; a blank carries no
  penalty.
- Section II (A): two compulsory papers of 200 marks each, each of two hours; Paper II qualifying at 33%; papers set
  in both Hindi and English.
- Section III, Part A: Paper I syllabus (current events; history of India and the Indian National Movement; Indian and
  world geography; Indian polity and governance; economic and social development; environmental ecology, biodiversity
  and climate change; general science). Paper II syllabus (comprehension; interpersonal skills including communication;
  logical reasoning and analytical ability; decision making and problem solving; general mental ability; basic numeracy
  and data interpretation at Class X level).
- About 933 vacancies for CSE 2026 (not used in the copy).

**Question counts are not in the notice.** 100 questions in Paper I (2 marks each) and 80 in Paper II (2.5 marks each)
come from guides, which agree: Careerlauncher (https://www.careerlauncher.com/upsc/upsc-exam-pattern.html), PW
(https://store.pw.live/blogs/upsc-exams/upsc-exam-pattern), Careerpower (https://www.careerpower.in/upsc-exam-pattern.html)
and the Vision IAS analysis of the 2026 GS Paper I
(https://visionias.in/blog/english/upsc-prelims-2026-detailed-analysis-of-gs1-with-answer-key), seen in search results.
The landing labels them "guides list".

**Dates.** Preliminary 2026 held on 24 May 2026 (UPSC exam page as quoted in search results and the Insights page,
https://www.insightsonindia.com/2026/02/04/upsc-2026-notification/). The UPSC calendar for 2027, released in May 2026,
puts the CSE 2027 Preliminary on 23 May 2027, notification 13 January 2027 (secondary reports: Drishti IAS
https://www.drishtiias.com/blog/upsc-calendar-2027-exam-dates, Business Today, Careers360, Free Press Journal; the
calendar PDF itself was not opened). Used only for "2027" in the landing title.

## What is modelled

- Two full GS Paper I mocks: 100 single-answer, four-option questions in 120 minutes, subjects mixed.
- Subject split per test is Tigertest's own (UPSC publishes none): ancient and medieval history and culture 14, modern
  history 14, geography 16, polity 16, economy 14, environment 14, science 12.
- CSAT as one drill-only domain (20 items: 8 comprehension on four original passages, 6 reasoning, 6 numeracy).
- Statement formats ("1 only / 2 only / Both / Neither", "How many of the above...", "How many pairs...") with
  fixed option order (`lockedOrder`).
- Not modelled: current events (dated within a year), maps and figures, Hindi versions, negative marking in the score
  (explained in copy instead).

## Content references (facts checked against standard sources while writing)

- Constitution of India (Articles and Schedules cited in explanations), as amended to 2026.
- NCERT history, geography and economics texts; RBI and Ministry of Finance glossaries for monetary and fiscal terms.
- IUCN Red List categories; Ramsar, CMS, CITES and Montreal Protocol texts for conventions.
- No officeholders, no prices, no yearly figures. All questions are original; none is copied from UPSC papers or
  commercial question banks. Checked against every India bank in `data/v2/` (stems, keys and numbers) and rewritten
  where an item repeated another bank's fact and answer.

## Review pass (2026-11-01)

upsc.gov.in still resets connections from this environment. The notice copy above was re-read: Notice No.
05/2026-CSE; two compulsory papers of 200 marks and two hours each; 33% qualifying in Paper II; one-third (0.33) of
a question's marks deducted per wrong answer. All landing, config and examFacts figures match it. Question counts
(100 and 80) remain "as guides list".
