# Sources for `cobit` (ISACA COBIT 2019 Foundation)

All questions are original, written by Tigertest from ISACA's public COBIT 2019 material listed
below. No ISACA sample question, review manual item, course quiz, past exam question or
commercial practice question was used, and no prep provider is named. Checked 2026-11-19.

## Which exam is current (checked 2026-11-19)
- ISACA, "COBIT Foundation" certificate page,
  https://www.isaca.org/credentialing/cobit/cobit-foundation (fetched 2026-11-19): the COBIT
  Foundation certificate for COBIT 2019 "will be replaced by the COBIT 7 Foundation Certificate on
  19 November 2026"; to earn the COBIT 2019 certificate, the last day to buy the exam or exam prep
  is 30 June 2027. This build is the COBIT 2019 Foundation exam, which stays on sale until then.
- ISACA, "COBIT 7 Foundation" page, https://www.isaca.org/credentialing/cobit-7-foundation
  (fetched 2026-11-19): same format (75 multiple-choice questions, 2 hours, 65% to pass), domain
  weights Framework Introduction 10%, Principles 8%, Governance System and Components 31%,
  Governance and Management Objectives 25%, Performance Management 10%, Designing a Tailored
  Governance System 5%, Business Case 1%, Implementation 8% (as printed; they add to 98%). ISACA
  has published no COBIT 7 framework text we could read: https://www.isaca.org/resources/cobit
  (fetched 2026-11-19) lists only COBIT 2019 publications; the COBIT 7 Foundation page sells it as
  "COBIT 7 Premium Access" (rechecked by the second reviewer, 2026-11-19). COBIT 7 content is therefore NOT
  modelled; a freshness event (lib/examFreshness.json) asks for a COBIT 7 build when ISACA
  publishes its material, and the landing says so.

## Exam format and domain weights (COBIT 2019 Foundation, official)
- ISACA COBIT Foundation page (above, fetched 2026-11-19): computer-based, remotely proctored,
  online; 75 multiple-choice questions in 2 hours; "a score of 65% or higher" to pass; no
  prerequisites; continuous registration, testing from 48 hours after payment, six-month
  eligibility, appointments up to 90 days ahead, free rescheduling 48 hours before. Domains:
  Governance System and Components 30%, Governance and Management Objectives 23%, Principles 13%,
  Framework Introduction 12%, Implementation 8%, Designing a Tailored Governance System 7%,
  Performance Management 4%, Business Case 3%. Fee US$175 (members and non-members), not used.
- The number of options per question is not stated by ISACA; ours have four.

## COBIT 2019 content (ISACA's own public material)
- ISACA white paper, "Leveraging COBIT for Effective AI System Governance" (2025),
  https://www.isaca.org/-/media/files/isacadp/project/isaca/resources/white-papers/leveraging_cobit_for_effective_ai_system_governance_and_management__0125.pdf
  (fetched 2026-11-19): the five domains and what each covers; the full COBIT Core Model, all 40
  objective IDs and names (figure 2, from COBIT 2019 Framework: Introduction and Methodology); the
  seven component types; the goals cascade (stakeholder drivers and needs, 13 enterprise goals
  across financial, customer, internal and growth dimensions, alignment goals as the primary link
  to objectives, 40 objectives); the goals cascade embedded in the 11 design factors.
- ISACA Industry News, "COBIT 2019 and COBIT 5 Comparison" (2020),
  https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-2019-and-cobit-5-comparison
  (fetched 2026-11-19): 6 governance system principles (5 in COBIT 5) and 3 new governance
  framework principles; 37 to 40 processes; "Manage" to "Managed", "Ensure" to "Ensured"; new
  APO14, BAI11, MEA04; APO10 supplier to vendor; CMMI-based performance management, 0 to 5;
  enablers renamed components; 11 design factors grouped into initial scope, refined scope and
  concluding the design.
- ISACA Industry News, "Introducing COBIT 2019: The Motivation for the Update" (2018),
  https://www.isaca.org/resources/news-and-trends/industry-news/2018/introducing-cobit-2019-the-motivation-for-the-update
  (fetched 2026-11-19): what COBIT is and is not; components listed; focus areas (definition,
  examples, "virtually unlimited"); design factors; future updates dated rather than numbered.
- ISACA Industry News, "A New COBIT Is in Town and I Really Like How It Looks" (2018),
  https://www.isaca.org/resources/news-and-trends/industry-news/2018/a-new-cobit-is-in-town-and-i-really-like-how-it-looks
  (fetched 2026-11-19): four key publications; COBIT Core Model (formerly process reference
  model); each objective relates to one process; alignment goals formerly IT-related goals; RACI
  guidance gives only responsible and accountable roles; services, infrastructure and applications
  guidance is generic; capability level per activity; related guidance per component.
- ISACA Industry News, "Transitioning an Enterprise From COBIT 5 to COBIT 2019" (2019),
  https://www.isaca.org/resources/news-and-trends/industry-news/2019/transitioning-an-enterprise-from-cobit-5-to-cobit-2019
  (fetched 2026-11-19): the seven implementation phases by name and what each covers; the names
  of the 11 design factors; Ensure transparency became Ensured stakeholder engagement; program
  and project management split; enterprise and IT goals 17 to 13; COBIT 4.1 Risk IT and Val IT
  integrated in COBIT 5; business case created in phase 1 and updated in phase 2.
- ISACA Industry News, "COBIT Design Factors" (2019),
  https://www.isaca.org/resources/news-and-trends/industry-news/2019/cobit-design-factors
  (fetched 2026-11-19): contextual, strategic and tactical design factors with examples; design
  factors prioritise objectives, set target capability levels and select component variants;
  the Design Guide Tool Kit; not every design factor must be used.
- ISACA Industry News, "Designing Your Organization's Custom COBIT" (2019),
  https://www.isaca.org/resources/news-and-trends/industry-news/2019/designing-your-organizations-custom-cobit
  (fetched 2026-11-19): design starts from the core model; iterative; design covers phases 1 to 4
  of the seven-phase implementation; DF6 Compliance Requirements values High, Normal, Low.
- ISACA Journal 2019 vol. 3, "Developing the IT Audit Plan Using COBIT 2019",
  https://www.isaca.org/-/media/files/isacadp/project/isaca/articles/journal/2019/volume-3/developing-the-it-audit-plan-using-cobit-2019_joa_eng_0519
  (fetched 2026-11-19): the four enterprise strategy archetypes from the Design Guide; the design
  workflow steps (understand context and strategy; initial scope; refine; resolve conflicts and
  conclude); the 11 design factors figure with "future factors"; I&T-related issues as pain points.
- ISACA Journal 2021 vol. 6, "Building a Maturity Model for COBIT 2019 Based on CMMI",
  https://www.isaca.org/-/media/files/isacadp/project/isaca/articles/journal/2021/volume-6/building-a-maturity-model-for-cobit-2019-based-on-cmmi-joa-spa-1221.pdf
  (fetched 2026-11-19): 1,202 activities and 231 practices; EDM01.01 and EDM01.02 practice names.
  The capability level definitions 0 to 5 are figure 2 of the English article,
  https://www.isaca.org/resources/isaca-journal/issues/2021/volume-6/building-a-maturity-model-for-cobit-2019-based-on-cmmi
  (image 21v6-building-a-maturity-model-2.png, read 2026-11-19 by the second reviewer).
- ISACA Now blog, "A COBIT 2019 Use Case: Financial Institutions in Georgia" (2022),
  https://www.isaca.org/resources/news-and-trends/isaca-now-blog/2022/a-cobit-2019-use-case-financial-institutions-in-georgia
  (fetched 2026-11-19): governance versus management definitions; rating scale Fully over 85%,
  Largely 50 to 85%, Partially 15 to 50%, Not under 15%; a capability level is reached when its
  activities are rated Largely or Fully; maturity levels apply to focus areas.
- ISACA Industry News, "A Systematic Approach to Implementing a Governance System Using COBIT
  2019" (2021),
  https://www.isaca.org/resources/news-and-trends/industry-news/2021/a-systematic-approach-to-implementing-a-governance-system-using-cobit-2019
  (fetched 2026-11-19): EG06, AG07, AG02, AG05 names; DSS04 practices; primary objectives for AG07;
  KGI, KPI and KRI.
- ISACA Industry News, "Employing COBIT 2019 for Enterprise Governance Strategy" (2019),
  https://www.isaca.org/resources/news-and-trends/industry-news/2019/employing-cobit-2019-for-enterprise-governance-strategy
  (fetched 2026-11-19): domain purposes; 13 enterprise and 13 alignment goals; AG09 wording;
  APO14 restores COBIT 4.1's Manage Data; executive sponsorship and attainable scope.
- ISACA, "Seven Key Features, Lessons and Tips From a COBIT Journey of 27 Years" (@ISACA 2023),
  https://www.isaca.org/resources/news-and-trends/newsletters/atisaca/2023/volume-46/seven-key-features-lessons-and-tips-from-a-cobit-journey-of-27-years
  (fetched 2026-11-19): the names of the six governance system principles; internal and external
  stakeholders; the business case should include regulatory and management requirements.
- ISACA COBIT Fact Sheet (2020),
  https://www.isaca.org/-/media/files/isacadp/project/isaca/why-isaca/fact-sheets/cobit-fact-sheet_0420.pdf
  (fetched 2026-11-19): COBIT 2019 is the first update since COBIT 5 (2012); all four publications
  listed as complimentary downloads (in 2020); benefits, including a common language.
- ISACA Industry News, "Effective Capability and Maturity Assessment Using COBIT 2019" (2020),
  https://www.isaca.org/resources/news-and-trends/industry-news/2020/effective-capability-and-maturity-assessment-using-cobit-2019
  (fetched 2026-11-19): capability measures how well a process is implemented and performing;
  maturity relates to focus areas.

## Not confirmed, so left out
- The full lists of the 13 enterprise goals and 13 alignment goals: only a few IDs are named in
  ISACA's public pages (EG06, AG02, AG05, AG07, AG08, AG09). Questions use only those. (A drill item on
  EG01 was replaced by the second reviewer: no public ISACA page we read names EG01.)
- The values of most design factors (role of IT, sourcing model, technology adoption, threat
  landscape, enterprise size): not in a page we could read. Only the strategy archetypes,
  compliance High/Normal/Low and the Agile/DevOps/Traditional methods are asked.
- Names of focus area maturity levels (one ISACA blog lists them only in a figure).
- The COBIT 2019 publications themselves are complimentary downloads that need an ISACA login;
  copies on third-party sites were not used.
- Anything about COBIT 7, the exam fee, delivery or retakes (never asked in questions).
