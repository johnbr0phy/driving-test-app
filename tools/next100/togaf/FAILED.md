# togaf: FAILED (stop rule)

Build-tests run 2026-11-15. TOGAF Standard, 10th Edition, Enterprise Architecture Part 1
(Foundation, OGEA-101). Checked 2026-11-15.

## What could be read (exam format only)

- TOGAF Examinations, The Open Group, https://certification.opengroup.org/docs/datasheets/togaf-exams.pdf
  (Copyright 2023-2025). OGEA-101 (English), OGEA-F101 (French), OGEA-C101 (Simplified Chinese);
  40 simple multiple-choice questions, one point each, covering the Level 1 learning outcomes;
  pass 60% (24 of 40); 60 minutes, extra time possible for ESL candidates; supervised; not open
  book; Pearson VUE test centres or OnVUE; no prerequisites.
- TOGAF Enterprise Architecture Foundation datasheet,
  https://certification.opengroup.org/docs/datasheets/datasheet_togaf_ea_foundation.pdf: the same
  format, plus the competency list (concepts and terminology, ADM phases and objectives, adapting
  and scoping the ADM, techniques, iteration and partitioning, Architecture Governance,
  architecture content). Certification does not expire.
- TOGAF Certification Portfolio page, https://www.opengroup.org/certifications/togaf-certification-portfolio:
  names X2202 as the document that defines the Level 1 learning outcomes.

## What could not be read (the content to write questions from)

- X2202 TOGAF Certification Program Conformance Requirements (the Level 1 learning outcomes):
  https://www.opengroup.org/library/x2202 redirects to https://publications.opengroup.org/x2202,
  "Login to Download". Not readable without an account.
- The TOGAF Standard, 10th Edition text on pubs.opengroup.org: every page tried returns HTTP 302
  to identity.opengroup.org sign-in:
  https://pubs.opengroup.org/togaf-standard/,
  https://pubs.opengroup.org/togaf-standard/adm/index.html,
  https://pubs.opengroup.org/togaf-standard/adm/chap01.html,
  https://pubs.opengroup.org/togaf-standard/introduction/chap01.html,
  https://pubs.opengroup.org/togaf-standard/fundamental-content.html,
  https://pubs.opengroup.org/architecture/togaf10-doc/arch/,
  https://pubs.opengroup.org/architecture/togaf92-doc/arch/ (the 9.2 text, also gated).
- https://www.opengroup.org/togaf/10thedition: redirects to the sign-in page.
- certification.opengroup.org exam pages (/node/14, /node/712, /node/714): HTTP 404 (site
  reorganised).
- help.opengroup.org exam plan article
  (https://help.opengroup.org/hc/en-us/articles/32158230604050-What-Is-the-Exam-Plan-for-the-OGEA-101-TOGAF-Enterprise-Architecture-Part-1-Exam):
  HTTP 403 bot challenge.
- Wayback Machine copies of pubs.opengroup.org (snapshot of 2024-12-07 exists): the fetch tool
  cannot reach web.archive.org and curl's connection was reset.
- Publisher preview PDFs of the Standard's volumes (Van Haren, download.boekhuis.nl): not
  fetched; the session's permission check refused it as getting round The Open Group's sign-in.

## Why stop

The format is confirmed, but the Standard text and the learning outcomes behind the 40
questions are only available to signed-in users. Writing 200 questions from prep sites or memory
would break the stop rule. To build it: sign in to a free Open Group account, download X2202 and
the TOGAF Standard, 10th Edition (Fundamental Content: Introduction and Core Concepts, ADM, ADM
Techniques, Applying the ADM, Architecture Content, Enterprise Architecture Capability and
Governance), put them where a builder can read them, and re-run this row.

No other files were written for togaf.
