# Garda Trainee assessment (Stage 1 verbal and numerical reasoning) sources

All 200 questions are original, written for Tigertest from the test descriptions below. None is taken
or reworded from publicjobs familiarisation material, a Pre-Test Information Booklet, any test
provider's practice items (SHL, Talogy, Cubiks or others) or any prep site or app. The passages and
tables are invented; the people, places, figures and organisations in them are fictional.

## Selection process (the owners: publicjobs and An Garda Síochána)

- publicjobs, "Garda Trainee Recruitment 2026 Competition":
  https://publicjobs.ie/en/garda-trainee (fetched 2026-11-23). Stage 1 assessments for the 2026
  competition closed on 21 July 2026, results were issued on 11 August through the Application Centre,
  and Stage 2 is an interview and a roleplay held remotely on Zoom for the candidates placed highest
  on the order of merit after Stage 1, expected from 24 August 2026. The page does not name the Stage 1
  tests.
- An Garda Síochána, "How do I join An Garda Síochána?" (one-page selection flowchart):
  https://garda.ie/!NMQGI6 (fetched 2026-11-23). Selection process run by publicjobs: online
  application, then "Online Verbal & Numerical Reasoning tests & Written exercise", then an online
  interview; names of eligible candidates passed to An Garda Síochána for the appointments process
  (Physical Competency Assessment, vetting, Substance Misuse Test, medical), then the Foundation
  Training Programme at the Garda College, Templemore, leading to a BA in Applied Policing from the
  University of Limerick. This is the source for which tests the bank models.
- An Garda Síochána, "Garda Trainee Recruitment 2026: Frequently Asked Questions":
  https://www.garda.ie/en/careers/garda-trainee-recruitment-it-s-a-job-worth-doing-campaign/frequently-asked-questions-2026.pdf
  (fetched 2026-11-23). The aptitude tests are only available in English; those who score highest at
  Stage 1 online testing are called to interview first; age 18 to under 50 on the closing date;
  Leaving Certificate (five subjects at D3 or O6, Ordinary Level) or NFQ Level 5 Major award;
  proficiency in Irish or English; €354 a week in training; the process takes 6 to 18 months.
- publicjobs, Candidate Information Booklet, Garda Trainee 2024:
  https://garda.ie/!FZP7RQ (fetched 2026-11-23). Stage 1 is a number of online assessments taken at
  any time in the testing window, remotely proctored via webcam; candidates are ranked on their
  assessment scores and the highest on the order of merit go to the next stage; familiarisation
  material with practice examples is provided before the tests; past papers are not available; the
  selection methods "may include" language, reasoning and ability tests. Used only for how Stage 1 is
  run; the 2026 booklet itself could not be found on publicjobs or garda.ie.
- publicjobs, "Our Recruitment Process": https://www.publicjobs.ie/en/information-hub/our-recruitment-process
  (fetched 2026-11-23). Describes the Verbal Reasoning Assessment (understand, analyse and evaluate
  information in written passages, judging statements against the information, choosing the answer
  from a number of options) and the Numerical Reasoning Assessment (finding relevant details and
  drawing logical conclusions from complex numerical information, typically multiple choice).
- publicjobs, "Test Advice": https://www.publicjobs.ie/en/information-hub/our-recruitment-process/test-advice
  (fetched 2026-11-23). Scores at the testing stages decide the order of merit; candidates should
  check the familiarisation material for what they need, such as pen, paper and a calculator.

## How the bank follows it

Two sections, the two reasoning tests the Garda flowchart names. Verbal reasoning: short passages on
policing, community and public-service topics, each followed by statements judged True, False or
Cannot say on the passage alone, and by single-answer questions (main point, best supported
conclusion, assumption, meaning in context). Numerical reasoning: tables of invented figures with
questions on percentages, percentage change, ratios, averages, rates and totals, every answer
computed in build.py. publicjobs publishes no question counts or times for these tests, so the split
(verbal 30 in 25 minutes, numerical 20 in 25 minutes) is Tigertest's own. The on-screen calculator is
on for numerical reasoning, since publicjobs lists a calculator among things a candidate may need.

## Could not be confirmed, and how the copy words it

- No 2026 candidate information booklet could be read, so question counts, times, item formats and
  the test provider are not stated. The copy says only that publicjobs provides familiarisation material before Stage 1 (2024 booklet).
  Review 2026-11-23: the publicjobs 2026 page was re-read; it names no Stage 1 tests, so the landing
  attributes remote webcam proctoring to the 2024 booklet and the test names to the Garda flowchart.
- No pass mark is published: candidates are ranked on an order of merit and the highest go forward.
  Tigertest reports percent correct and never calls a score passing.
- The written exercise, the 2026 roleplay and the interview are not modelled. No situational
  judgement items are written, because the Garda flowchart does not list such a test for Garda
  Trainee.

## Left out on purpose

- No Garda law, powers or procedure: Stage 1 tests reasoning, not knowledge of policing. Passages
  state everything a question needs, and no question asks for outside facts.
- No fees, pay figures, ages or eligibility rules as questions (they are on the landing only).

## Copyright and repeat checks (2026-11-23)

- No official question catalogue or past paper exists for these tests (publicjobs says past papers are
  not available, and its familiarisation material goes only to candidates), so there was nothing to
  compare item by item. No familiarisation or provider practice material was read.
- Every stem and passage was scanned for shared 8-word runs against every bank in `data/` and
  `data/v2/`: the only matches were stock phrases ("what is the main point of the passage", "at the
  start and end of the day").
- Every numerical key is computed in `numerical.py`; build.py checks the formatted key appears in its
  explanation, that the five options differ, and sorts and locks them. Key positions after sorting
  are spread over all five slots (16/12/13/14/16).
