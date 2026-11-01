# CUET (UG) General Aptitude Test sources

Checked 1 November 2026 (build), rechecked at review the same day.

- National Testing Agency, "CUET (UG) 2026 Information Bulletin", official copy on NTA's CUET site:
  https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2026/01/202601031633478370.pdf
  (linked as "Information Bulletin" from https://cuet.nta.nic.in/information-bulletin/ , page last updated
  12 October 2026; read on 1 November 2026 at review, when cuet.nta.nic.in loaded; at build time it reset
  the connection and the bulletin was read from the identical copy at
  https://clsite-file1.s3.amazonaws.com/8132_CUET-2026-Notification.pdf). It confirms:
  - Important dates: online application 03-30 January 2026; date of examination 11-31 May 2026
    (tentative); website https://cuet.nta.nic.in . The 2026 FAQ (same site,
    .../uploads/2026/01/2026011697237004.pdf) repeats 11-31 May 2026 in CBT mode (tentatively).
  - Section 4, Broad features, and 2.3 Scheme of Examination: 37 subjects (13 languages + 23
    domain-specific subjects + 01 General Aptitude Test); "Candidates may choose upto a maximum of five (05)
    subjects including languages and General Aptitude Test"; "50 questions for each test papers. All
    Question are compulsory."; "Duration for each test paper would be 60 minutes" (compensatory time for
    PwBD candidates, 20 minutes an hour); Computer Based Test mode; multiple shifts; "Correct Answer: 05
    marks (Five). There will be negative marking for each incorrect answer of 01 (one) mark."
  - Syllabus (section 4): "General Aptitude Test: general knowledge, current affairs, general mental
    ability, numerical ability, quantitative reasoning (Simple application of basic mathematical concepts
    arithmetic/algebra geometry/mensuration/statistics), Logical and Analytical Reasoning".
  - 2.1, 2.2: CBT only; 13 mediums (English, Hindi, Assamese, Bengali, Gujarati, Kannada, Malayalam, Marathi,
    Odia, Punjabi, Tamil, Telugu, Urdu); the question paper is in English and the chosen language, and the
    English version prevails.
  - 2.4: objective type multiple choice questions.
  - 12.1 Marking scheme: correct +5, incorrect -1, unanswered 0.
  - 12.2: raw marks from multi-shift papers are converted to NTA scores (normalisation by the percentile
    and equi-percentile method, Appendix); the NTA score of CUET (UG) 2026 is valid for admission in
    2026-27 only.
  - Appendix II: subject code 501, General Aptitude Test.
- NTA, "Syllabus for CUET(UG) For The Year 2026, General Test- 501", linked from
  https://cuet.nta.nic.in/cuetug-2026-syllabus/ :
  https://cdnbbsr.s3waas.gov.in/s3d1a21da7bca4abff8b0b61b87597de73/uploads/2025/12/20251227140287889.pdf
  (read 1 November 2026). It lists: General Knowledge, Current Affairs; General Mental Ability, Numerical
  Ability; Reasoning (simple application of basic mathematical concepts, quantitative arithmetic / algebra
  geometry / mensuration / statistics); Logical and Analytical Reasoning; and General Science and
  Environment Literacy. The bank's science domain covers general science, with some environment items.
- No CUET (UG) 2027 bulletin: the information-bulletin page lists only the 2025 and 2026 bulletins
  (checked 1 November 2026).
- No section-wise split of the 50 questions is published, so the per-test blueprint in
  `lib/v2/exams/cuet.ts` (GK 18, mental ability 7, numerical ability 7, quantitative reasoning 8, logical 5,
  analytical 5) is Tigertest's own and is labelled as such on the landing.
- Coaching and news sites (searched 1 November 2026, e.g. https://university.careers360.com/articles/cuet-marking-scheme-2026 ,
  https://zollege.in/news/e-970-cuet-ug-2026-exam-pattern-changes-explained-all-50-questions-now-compulsory-plus-marking-scheme )
  report that NTA released the revised pattern with the bulletin on 3 January 2026 and that the earlier
  choice of attempting 40 of 50 questions is gone. They also report the 2026 exam ran from 11 May into early
  June 2026; that is not used anywhere.

## Question content
All 202 questions are original. General knowledge is static only (no current affairs, no office-holders,
no figures that change yearly); reasoning is text only; numbers in rupees and metric units. Every item was
compared (normalised stems, number sets, same key with shared content words) against all India v2 banks on
disk on 1 November 2026: ssccgl, rrbntpc, ibpspo, ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice,
ibpsclerk, jnvst, sbiclerk, sbipo, ibpsrrb, biharpolice, rajpolice, delhipolice, mppolice, upscse, nda,
agniveer, agniveervayu, rrbalp, rpfconst, ssccpo, phcse and the batch-4 banks then present (neet, jeemain,
mhtcet, ugcnet, reet, uptet, aissee). About 50 first-draft items that shared numbers or a fact and answer
were rewritten. At review (1 November 2026) the bank was compared again against every India bank, the
US school banks (appsych, apush, apbio, apworld, aplang, apcalcab, aphug, sat, act, psat, ged, praxis) and the
Philippines banks (phcse, phlet, LTO); 25 more items that shared a fact and answer, a number set or a worked
example with another bank were rewritten.
