# PMP (`pmp`) sources

## Outline followed

**PMI, Project Management Professional (PMP) Examination Content Outline, July 2026** ("July 2026 PMP
Certification Exam Update", (c) 2026 PMI), the outline live as of October 2026. It replaced the January 2021
outline; PMI's own page says the exam was updated in July 2026, and secondary prep providers give the first
test date as 9 July 2026 (not stated in the PDF itself).

- PDF: https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/new-pmp-examination-content-outline-2026.pdf
- Overview: https://www.pmi.org/certifications/project-management-pmp/new-exam

Facts taken from the ECO PDF (read 2026-10-30):

- Domains: People 33%, Process 41%, Business Environment 26%.
- 26 tasks: People 8 (common vision; conflicts; lead the team; engage stakeholders; align stakeholder
  expectations; manage stakeholder expectations; knowledge transfer; plan and manage communication),
  Process 10 (integrated plan and delivery approach; scope; value-based delivery; resources; procurement;
  finance; quality; schedule; evaluate status; closure), Business Environment 8 (governance; compliance;
  change control; impediments and issues; risk; continuous improvement; organizational change; external
  business environment). Enablers name AI, sustainability, security and compliance explicitly.
- "Approximately 40% of the items will represent predictive project management approaches, whereas the
  remaining 60% will be divided between adaptive/agile and hybrid." (The brief said roughly half; the
  official figure is 40/60 and the bank follows it.)
- 180 questions (170 scored, 10 pretest), 240 minutes, two 10-minute breaks: the first after the
  case-study section, the second about midway through the independent questions.
- Item types: case or scenario (new), enhanced matching, graphic-based (new), multiple choice single
  response, multiple response, point and click (hotspot), matching, pull-down list.
- Pass mark: not published. Results are pass/fail with domain-level performance ratings (Above Target,
  Target, Below Target, Needs Improvement), per PMI's certification handbook and score report.
- Retakes: up to three attempts within the one-year eligibility period.

## How the bank models it

- 210 original items (PMP-T1-001.., PMP-T2-001.., PMP-D-001..), two 90-item tests in 120 minutes (the real
  pace of 240 minutes per 180), Test 2 held out, 30 drill-only items.
- Seven drill domains that group the 26 tasks: `pmpTeam` (People 1-3), `pmpStakeholders` (People 4-8),
  `pmpPlanning` (Process 1-3), `pmpScheduleCost` (Process 6, 8, 9), `pmpDelivery` (Process 4, 5, 7, 10),
  `pmpGovernance` (Business Environment 1, 2, 3, 6, 7, 8), `pmpRisk` (Business Environment 4, 5).
  Per test 15/15/13/14/10/14/9 = People 30 (33%), Process 37 (41%), Business Environment 23 (26%).
- Each test opens with a five-item case study (shared stimulus with a data table, `tools/pmp/stimuli.json`):
  PMP-CS1 warehouse system replacement (hybrid, EVM table), PMP-CS2 smart water meter rollout (hybrid,
  privacy regulation, sustainability, EVM table).
- Formats: single answer; multiple response ("Choose two"); matching as `matrix` grids; typed
  `numeric` items for calculations (the ECO lists no fill-in-the-blank type; on the real exam these are
  multiple choice) (EVM: CPI, SPI, SV, CV, EAC, TCPI, VAC; PERT; float; critical path;
  communication channels; EMV; velocity), digits only, every stem says "Type the number only".
  Hotspot, pull-down and drag-and-drop items are not modelled (pull-down is close to single answer).
- Approach tags in the sources (P, A, H) give Test 1 42% predictive, Test 2 40% predictive.
- Every item is original. Nothing is quoted from the PMBOK Guide, the Agile Practice Guide, PMI sample
  questions or the ECO beyond task names. Formulas and terms (EVM, PERT, Tuckman, power/interest grid,
  push/pull/interactive communication, contract types, PDCA, PESTLE, MoSCoW, WSJF) are standard
  professional knowledge.

## Not verified

- The exact first test date (9 July 2026) comes from prep providers, not the PMI PDF.
- The July 2026 ECO PDF was re-read by the reviewer on 2026-10-30: 180/170/10, 240 minutes, two 10-minute
  breaks (first after the case-study section), 40% predictive, up to three attempts in one year all confirmed.
  Rating names (Above Target, Target, Below Target, Needs Improvement) are from PMI score reports as described
  by prep providers; pmi.org pages returned 403 to automated fetches.
- Exam fees were not checked for 2026 and are not stated anywhere in the bank, config or landing.
