# CompTIA Project+ sources

All questions in `data/v2/projectplus/questions.json` are original, written for Tigertest from the
exam objectives and the reference pages below. No CompTIA CertMaster item, official sample
question, past exam item, prep provider question, "brain dump" or leaked material was used or
reworded. The objectives document lists topics only (no questions), and the bank was written from
those topic bullets. CompTIA publishes no public question catalogue for Project+, so there was
nothing to run a similarity check against beyond the sibling Tigertest banks (see the end).

## Exam outline (objectives)

- CompTIA Project+ PK0-005 V5 Certification Exam Objectives, Document Version 7.0 (PDF, printed Dec 2024,
  hosted on CompTIA's own content CDN)
  https://lecbyo.files.cmp.optimizely.com/download/1e3fdde6bef111ef9a101a9f1320ff57
  fetched 2026-11-23 (read in full). Domains: 1.0 Project Management Concepts 33%, 2.0 Project Life
  Cycle Phases 30%, 3.0 Tools and Documentation 19%, 4.0 Basics of IT and Governance 18%.
  Objectives 1.1 to 1.11 (project characteristics and methodologies, Agile vs Waterfall, change
  control, risk, issues, scheduling, quality and performance, communication, meetings, team and
  resources, procurement), 2.1 to 2.5 (discovery, initiation, planning, execution, closing), 3.1 to
  3.3 (tracking charts and logs, productivity tools, quality and performance charts), 4.1 to 4.5
  (ESG, information security, compliance and privacy, basic IT concepts, operational change
  control), plus the acronym list. Its test details say "Maximum of 95" questions, multiple choice
  and performance-based, 90 minutes, 6 to 12 months of experience recommended.
- CompTIA Project+ certification page
  https://www.comptia.org/en-us/certifications/project/
  fetched 2026-11-23. Exam V5, series code PK0-005, launched November 8, 2022, no retirement date
  shown and no PK0-006 announced; "maximum of 90 questions", multiple choice and performance-based,
  90 minutes, passing score 710 on a scale of 100 to 900, English, Japanese and Thai, 6 to 12 months
  of hands-on experience managing projects in a tech environment recommended; domain weights as in
  the objectives.
- CompTIA blog, The New CompTIA Project+: Your Questions Answered (December 18, 2024)
  https://www.comptia.org/en-us/blog/the-new-comptia-project-your-questions-answered/
  fetched 2026-11-23. Project+ is "considered good for life and does not need to be renewed"; no
  prerequisites; aimed at entry-level project management for IT professionals (project
  coordinator, junior project manager, business analyst and similar roles).

What disagrees, and how the copy words it: the certification page says a maximum of 90 questions,
the objectives PDF (document version 7.0) says a maximum of 95. The landing and facts say "up to
90 questions (the objectives document says up to 95)". Each practice test here is 90 questions in
90 minutes. Performance-based questions are modelled only by a few ordering, matching and
typed-number items.

## Reference pages used for facts

- The 2020 Scrum Guide (Schwaber and Sutherland)
  https://scrumguides.org/scrum-guide.html
  fetched 2026-11-23: product owner, scrum master and developers; sprint of one month or less;
  daily scrum 15 minutes; sprint review and retrospective; product backlog, sprint backlog and
  increment with the Definition of Done. Used for the Scrum items in objectives 1.1, 1.2, 1.6, 1.7
  and 1.10.
- NIST SP 800-145, The NIST Definition of Cloud Computing (September 2011)
  https://csrc.nist.gov/pubs/sp/800/145/final
  fetched 2026-11-23: the three service models (SaaS, PaaS, IaaS) for objective 4.4. The
  definitions in the questions are the standard ones (the customer manages applications on IaaS,
  only its own data and settings on SaaS).
- NIST SP 800-122, Guide to Protecting the Confidentiality of Personally Identifiable Information
  https://csrc.nist.gov/pubs/sp/800/122/final
  fetched 2026-11-23: PII must be protected from inappropriate access, use and disclosure; used for
  objective 4.3 (PII, need-to-know, data classification).

Earned value terms (cost variance = EV minus AC, schedule variance = EV minus PV, negative meaning
over budget or behind schedule), critical path, Tuckman's team stages and the five conflict
approaches are the standard definitions named in objectives 1.6, 1.7, 1.10 and 2.4; every number
in a calculation item is worked in its explanation.

## Left out on purpose

- Anything about the exam itself (question count, time, score, booking, retakes): landing and
  facts only.
- Exam fees and voucher prices.
- One country's or state's privacy law by name and its figures: objective 4.3 asks only for
  awareness that country, state and province privacy rules differ, so the bank says that.
- Product names other than generic tool types (the objectives' hardware and software list names
  Microsoft and Atlassian tools as examples only).

## Repeats checked

Stems and key answers were compared with the capm, pmp, psm, pspo, itil, pmiacp, safe, cssgb and
cssyb banks (normalised stem similarity and shared key text); see the run note at the end of the
build log in the PR.
