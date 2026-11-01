# RRB ALP CBT 1 (`rrbalp`) sources

All checked 2026-11-01; reviewer re-check the same day (see "Review" at the end).

## Pattern followed

**Railway Recruitment Boards, Centralised Employment Notice CEN 01/2026, Assistant Loco Pilot (Level 2, 7th CPC),
11,127 posts.** Official copies of the detailed notice are on the RRB sites, for example
https://www.rrbcdg.gov.in/uploads/2026/01-ALP/012026ALP-CEN.pdf and
https://rrbajmer.gov.in/Upload_PDF/CEN%2001-2026%20Eng-639143539720035538.pdf (search-result extract of the Ajmer copy:
"Assistant Loco Pilot (ALP) Level-2 19900 A-1 18 to 30 years 11127"). Both hosts reset connections or answered 503 from
this environment, so the PDFs themselves were **not read**; the CBT 1 pattern below comes from secondary summaries,
which agree with each other.

- **75 questions, 75 marks, 60 minutes**, multiple choice. Guides: https://www.indiangovtnews.com/rrb-alp-exam-pattern-changed-2026-general-awareness-removed-from-cbt-1/
  (fetched), https://rrbrailway.com/rrb-alp-syllabus-2026/ (fetched), testbook, prepp, freejobalert, careerpower
  summaries in search results.
- **Subjects (CEN 01/2026): Mathematics, General Intelligence and Reasoning (Mental Ability), General Science**
  (physics, chemistry and life sciences of 10th standard CBSE level). **General Awareness and Current Affairs was
  removed** from CBT 1 in CEN 01/2026 (it was in CBT 1 of CEN 01/2024 and 01/2025, about 10 of the 75 questions). Same
  guides (indiangovtnews, fetched: "General Awareness and Current Affairs have been removed from CBT 1").
- **Questions per subject: not fixed by the notice.** Guides warn that the split often quoted (Maths 20, Reasoning 25,
  Science 20, GA 10, or 20/25/30 without GA) comes from earlier cycles or coaching estimates. Tigertest's mock tests
  use 25/25/25 and say so on the landing, in the section directions and in the config.
- **Negative marking: 1/3 mark per wrong answer**, none for an unanswered question (all guides).
- **Minimum qualifying percentages: UR 40, EWS 40, OBC (non-creamy layer) 30, SC 30, ST 25** (rrbrailway.com, fetched,
  quoting "UR-40%, EWS40%, OBC (Non creamy layer) -30%, SC-30%, ST-25%"; indiangovtnews calls them "reported" figures;
  the same figures appear for CEN 01/2025 in the IIT Kanpur SATHEE summary and others). Labelled on the landing as
  "reported for the notice". Note that the Group D notice (CEN 09/2025) uses 30% for ST; the ALP figure is 25%.
- **Role of CBT 1:** screening only; its marks do not count in the final merit. Candidates are shortlisted for CBT 2
  (Part A, plus the qualifying trade Part B), then the Computer Based Aptitude Test (CBAT) (rrbrailway.com, prepp and
  testbook summaries). CBT 2 and CBAT details are mentioned only generally in the copy.
- **Dates:** applications 15 May to 14 June 2026 (several summaries, e.g. https://www.karmasandhan.com/rrb-alp-cen-01-2026/
  in search results); CBT 1 reported for 3, 4 and 5 November 2026 (careerpower, testbook, sreedharscce summaries in
  search results, not confirmed on an RRB page). Only the application window is in the config comment; the landing
  gives no dates.
- **Earlier cycle for context:** CEN 01/2025 (9,970 posts, later reported as 10,970) held CBT 1 on 13 to 18 February
  2026 with a rescheduled sitting on 11 March 2026; result 12 June 2026 (careers360 and other summaries in search
  results). Not used in the copy.
- Not stated in the copy (unconfirmed): exam languages, PwBD compensatory time, the CBT 2 shortlisting ratio.

## What the bank covers and leaves out

- Two full 75-question tests (25 Maths, 25 Reasoning, 25 Science, grouped in that order) plus 50 drill-only items,
  200 in all, four-option single answer like the real CBT.
- No General Awareness or current affairs (dropped from CBT 1).
- Reasoning is text only: no mirror images, paper folding, embedded figures or Venn figures; Venn relationships are
  asked in words. The landing tells candidates to practise figure items separately.
- Science to NCERT class 9 and 10 (motion, laws of motion, gravitation, work and energy, sound, light, electricity,
  magnetic effects of current; chemical reactions, acids and bases, metals and non-metals, carbon compounds,
  periodic classification, atomic structure; life processes, control and coordination, reproduction, heredity and
  evolution, health, environment). One railway-flavoured item: the thermit reaction for joining rails.
- Indian English, rupee amounts, Indian names.
- Every item is original. All-number options are sorted and locked (98 items); the key sits in an end slot on 48 of
  them (49%) after review. Conclusion and assumption sets are locked in their usual order.
- Duplicate check (2026-11-01) by script against every India bank in `data/v2` (ssccgl, rrbntpc, ibpspo, ctet,
  rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst, sbiclerk, sbipo, ibpsrrb, biharpolice, rajpolice,
  delhipolice, mppolice) and the batch 3 banks present at the time (nda, agniveer, agniveervayu, rpfconst, ssccpo,
  upscse): same stem numbers, or the same non-numeric key with a similar stem. About 50 items were rewritten (new
  numbers, new series, new facts). What remains shares only generic templates (a syllogism with the same conclusion
  label, a seating puzzle whose answer letter matches).

## Facts checked

Calendar items computed with Python: 15 August 2025 Friday, 15 August 2026 Saturday; 1 January 2021 and 1 January
2027 both Friday (2027 is not a leap year, so the 2021 calendar repeats). Every arithmetic and science calculation was
recomputed while writing; the build asserts that each sorted numeric key is the value authored as the key.

## Review (2026-11-01)

- Official notice still unreachable: rrbcdg.gov.in and rrbajmer.gov.in PDFs (connection reset, then HTTP 503),
  rrbchennai, rrbbnc, rrbpatna, rrbguwahati, rrbsecunderabad, rrbkolkata, rrbranchi, rrbmumbai, rrbbhopal and
  rrb.gov.in (reset or proxy 502); rrbapply.gov.in answered 404 at the root. Pattern and qualifying marks stay
  labelled "reported".
- Re-confirmed from secondary sources: 75 questions, 60 minutes, 1/3 mark negative, GA not in CBT 1, UR/EWS 40,
  OBC/SC 30, ST 25 (https://www.competitivecracker.com/blog/rrb-alp-exam-pattern-2026, fetched; testbook
  https://testbook.com/news/rrb-alp-notification-2026-pdf-out/, fetched: subjects Mathematics, Reasoning and
  General Science, GA only in CBT 2 Part A, no per-subject split). CBT 1 on 3, 4 and 5 November 2026
  "tentatively" (https://www.careerindia.com/news/rrb-alp-exam-2026-schedule-released-check-cbt-1-dates-admit-card-066023.html,
  fetched). Conflict noted: that careerindia article still lists General Awareness/Current Affairs in CBT 1, and
  oliveboard does too, apparently from older cycles; most guides (testbook, competitivecracker, indiangovtnews,
  rrbrailway) say it was removed. CompetitiveCracker's 20/25/20 split adds up to 65, not 75, so it is not used.
