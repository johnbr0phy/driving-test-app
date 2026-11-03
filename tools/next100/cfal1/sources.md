# Sources for `cfal1` (CFA Program Level I)

All 200 questions are original, written by Tigertest from the CFA Institute Level I topic outline
and the standard finance it names. No CFA Institute curriculum text, sample or mock exam, practice
question, or commercial question bank was copied. Checked 2026-11-03.

## Exam format (official)
- CFA Institute, "Level I exam" (candidate resources):
  https://www.cfainstitute.org/programs/cfa-program/candidate-resources/level-i-exam (checked 2026-11-03)
  - 180 multiple-choice questions in two sessions of 90 questions, each session 135 minutes
    (about 90 seconds a question), with an optional break between them.
  - Each question has three choices (A, B, C), as a sentence completion or a direct question.
  - All questions are equally weighted; no penalty for wrong answers.
  - Topic weights, 2026 curriculum (exams through November 2026) and 2027 curriculum:
    | Topic | 2026 | 2027 |
    |---|---|---|
    | Ethical and Professional Standards | 15-20% | 10-15% |
    | Quantitative Methods | 6-9% | 11-14% |
    | Economics | 6-9% | 6-9% |
    | Financial Statement Analysis | 11-14% | 11-14% |
    | Corporate Issuers / Corporate Finance (2027 name) | 6-9% | 6-9% |
    | Equity Investments / Equities | 11-14% | 11-14% |
    | Fixed Income | 11-14% | 11-14% |
    | Derivatives / Derivatives and Risk Management | 5-8% | 6-9% |
    | Alternative Investments | 7-10% | 6-9% |
    | Portfolio Management / Portfolio Construction | 8-12% | 8-12% |
    Session 1 holds Ethics, Quant, Economics, FSA and Corporate Finance; session 2 the rest.
  - One Practical Skills Module must be completed at each level to receive the exam result.
- CFA Institute, "Exam results" (Level I and II):
  https://www.cfainstitute.org/programs/cfa-program/candidate-resources/exam-results (via search, checked 2026-11-03):
  the Board of Governors sets the minimum passing score after each administration; results are
  pass or do not pass with a breakdown by topic. The minimum passing score is not published.
  Guides estimate it at roughly 60 to 70% (not used in copy beyond "not published").

## Labelled as from guides (CFA Institute pages could not be opened)
- The 2027 curriculum applies to exams from February 2027; August and November 2026 sit the 2026
  curriculum (CFA Institute press release of 22 May 2026 on Business Wire, which returned 403;
  reported by prep sites such as https://soleadea.org/cfa-exam/curriculum-changes-2027 and
  https://300hours.com/cfa-exam-curriculum-and-topic-weight-changes, checked 2026-11-03).
  The 2027 Quantitative Methods and Equities topics were rewritten (financial data science and AI
  added to Quant); Ethics splits the seven Standards into separate learning modules.
- Level I is offered in February, May, August and November (https://soleadea.org/cfa-2027-dates-schedule,
  checked 2026-11-03). The dates/fees page on cfainstitute.org returned 404.
- Exams are computer-based and scheduled through Prometric after registering with CFA Institute
  (third-party guides). Not used in copy beyond "computer-based".

## Blueprint used
Weighted to the 2027 outline, which applies to every window from February 2027, the first a
candidate studying from November 2026 can sit. Per 50-question test: Ethics 6, Quant 6, Economics 4,
FSA 6, Corporate Finance 4, Equities 6, Fixed Income 6, Derivatives 4, Alternatives 4, Portfolio 4
(12/12/8/12/8/12/12/8/8/8%, every one inside its 2027 range). Under the 2026 weights Ethics would
be 15-20%; the landing says so.

## Content references (concepts only, nothing quoted)
- CFA Institute Code of Ethics and Standards of Professional Conduct (Standards I to VII) and the
  Standards of Practice Handbook; GIPS (firm-wide compliance, composites of all actual fee-paying
  discretionary portfolios).
- IFRS: IAS 2 (inventories, LIFO prohibited, write-down reversals), IAS 7 (interest and dividend
  classification), IAS 16 (revaluation model), IAS 36 (recoverable amount, goodwill not amortised),
  IAS 38 (development costs), IFRS 16 (lessee single model). US GAAP contrasts only where IFRS differs.
- Standard formulas (time value of money, Bayes, portfolio variance, CAPM, WACC, Gordon growth,
  justified P/E, duration and convexity, put-call parity, binomial pricing, Treynor, M-squared,
  mean-variance utility). Every number in the bank was recomputed in Python when written.

## Format differences (on the landing)
- Real items have three options; ours have four.
- Real exam: 180 questions in two 135-minute sessions. Here: four 50-question tests weighted like
  the 2027 outline, plus seven topic training sets. 70% is Tigertest's readiness line, not an
  official pass mark.
- Item sets and vignettes are a Level II and III format; Level I is stand-alone items, as here.

## Duplicate checks
Grepped `data/series-65-questions.json`, `data/series-7-questions.json`, `data/sie-questions.json`
and `data/cpa-far-questions.json` (and `data/cpa-reg-questions.json`) for Sharpe, duration, CAPM,
beta, DDM, yield to maturity, current yield, REIT, margin, EPS, inventory and cash-flow items.
Where a topic overlaps (CAPM, Gordon growth, duration, Sharpe-type measures), this bank uses a
different measure or different numbers: CAPM from an equity risk premium, Gordon from D0, modified
duration with convexity, Treynor and M-squared instead of Sharpe and alpha, IFRS rather than US GAAP
for financial statements, no current-yield or REIT-payout items.
