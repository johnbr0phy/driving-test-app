# Sources for `accafa` (ACCA Applied Knowledge, Financial Accounting (FA))

All 200 questions are original, written by Tigertest from ACCA's published FA/FFA syllabus and study
guide and the IFRS Accounting Standards it names. No ACCA past paper, specimen exam, practice platform
question or commercial (approved learning partner) question was copied. Checked 2026-11-03.

## Exam format (official)
- ACCA, "Financial Accounting (FA/FFA) essentials on one page":
  https://accaglobal.com/gb/en/student/exam-support-resources/fundamentals-exams-study-resources/f3/session-cbe-introduction/financial-accounting-fa-essentials-on-one-page.html
  (checked 2026-11-03): two-hour exam, two sections, all questions compulsory. Section A: 35 objective
  test questions of two marks each. Section B: two multi-task questions of 15 marks each (100 marks in all).
- ACCA, "Financial Accounting (FA/FFA) syllabus and study guide, September 2025 to August 2026" (PDF):
  https://www.accaglobal.com/content/dam/acca/global/PDF-students/fia/studyguides/FA.FFA%20S25-A26%20syllabus%20and%20study%20guide.pdf
  (checked 2026-11-03):
  - Section 8: "assessed by a two-hour computer-based examination"; Section A 35 two-mark OT questions;
    Section B two 15-mark MTQs that "test consolidations and accounts preparation"; the accounts
    preparation question can be set for a sole trader or a limited company.
  - Section 10: "The pass mark for all FIA examinations is 50%." (ACCA's pass mark for its own exams is
    also 50%.)
  - Syllabus areas A to I: A context and purpose of financial reporting; B accounting principles,
    concepts and qualitative characteristics; C double-entry bookkeeping and accounting systems;
    D recording transactions and events (sales and purchases, cash, inventories, tangible non-current
    assets, depreciation, intangibles, accruals and prepayments, receivables and payables, provisions
    and contingencies, capital structure and finance costs); E reconciliations; F trial balance,
    errors and suspense accounts; G preparing financial statements (incl. events after the reporting
    period, statement of cash flows, incomplete records); H basic consolidated financial statements
    (subsidiaries, associates); I interpretation (ratios). ACCA publishes no weighting by area.
  - Section 7 (summary of changes for 2025-26): IFRS 18 Presentation and Disclosure in Financial
    Statements formats are examinable for all statements, including the statement of cash flows;
    IAS 1 is no longer examinable; management-defined performance measures are not examined.
    G2a now requires operating profit, profit before financing and income taxes, profit before income
    taxes and profit (for the year). G5e: "calculating cash from operating activities before income taxes".
  - Consolidation scope (H1): NCI at fair value only; fair value adjustments on PPE (no depreciation
    adjustments); consideration in cash and shares (no deferred or contingent); intra-group balances
    (no items in transit); unrealised profit; mid-year acquisitions. Associates: definition and the
    principle of the equity method.
- ACCA, "Syllabus changes for ACCA Qualification exams 2025/26 - 2026/27, guidance for students" (PDF):
  https://www.accaglobal.com/content/dam/ACCA_Global/Students/resourceFinder/acca-syllabus-changes.pdf
  (checked 2026-11-03): Financial Accounting (FA) "NO" change for 2026/27; "Applied Knowledge exams are
  available on demand with a syllabus year of September 2026 - August 2027." So the 2025-26 study guide
  content (above) applies to FA exams sat from September 2026 to August 2027. The 2026-27 FA study guide
  PDF was not found at the expected URL (404) on 2026-11-03.

## Not modelled
- Section B multi-task questions (30 of 100 marks). Only Section A style single-answer objective test
  questions are written. Real Section A OT questions also include multiple-response, number-entry and
  fill-in formats; here every item is four-option single answer.
- Fees, exemptions and pass rates: left out of the bank and the landing.

## Standards used in the questions (current as of 2026-11-03)
- Conceptual Framework for Financial Reporting (2018): definitions of asset, liability, equity;
  fundamental (relevance, faithful representation) and enhancing qualitative characteristics.
- IFRS 18 Presentation and Disclosure in Financial Statements (issued April 2024, effective 1 January
  2027, examinable in FA): operating, investing, financing, income taxes and discontinued operations
  categories; required subtotals operating profit and profit before financing and income taxes;
  income from equity-accounted investments in the investing category; interest on borrowings in
  financing.
- IAS 7 as amended by IFRS 18: indirect method starts from operating profit; for entities without a
  specified main business activity, interest paid is financing, interest and dividends received are
  investing.
- IAS 2 (lower of cost and NRV; FIFO and weighted average, LIFO prohibited; cost formula disclosure),
  IAS 16 (cost, revaluation, excess depreciation transfer, changes in estimates per IAS 8),
  IAS 38 (research expensed, development criteria, internally generated brands prohibited),
  IAS 37 (provisions, contingent liabilities and assets, no provision for future operating losses),
  IAS 10 (adjusting and non-adjusting events; dividends declared after the reporting date),
  IAS 32 (redeemable preference shares as liabilities), IFRS 15 (settlement discounts as variable
  consideration, as taught in FA), IFRS 10 (control), IFRS 3 (goodwill with NCI at fair value),
  IAS 28 (associates, significant influence, equity method).
- Regulatory bodies (A4): IFRS Foundation, IASB, IFRS Advisory Council, IFRS Interpretations Committee, ISSB.

## Terminology
International English as used by ACCA: receivables, payables, inventory, non-current assets,
statement of financial position, statement of profit or loss, irrecoverable debts, allowance for
receivables, sales tax, $ amounts (ACCA's international exams use $).

## Overlap checks (2026-11-03)
Numbers and stems compared against `data/cpa-far-questions.json`, `data/cpa-reg-questions.json`,
`tools/next100/aatl2/q_*.py` (written at the same time), `tools/next100/cfal1`, `tools/next100/cpaaud`.
Ten items had their figures changed to avoid shared number sets (INV-004, NCA-010, NCA-015,
NCA-021, ACR-011, FST-023, CON-004, CON-005, INT-001, INT-008), and REC-012's scenario was changed
away from aatl2's similarly named customers.
