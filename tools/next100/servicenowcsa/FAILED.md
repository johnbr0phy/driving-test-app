# servicenowcsa: FAILED (2026-11-16)

Stop rule applied: the exam owner's current blueprint could not be read, so no questions were
written. Nothing else was created for this exam.

## What is known from ServiceNow's own site
- The blueprint is ServiceNow University KB article KB0011554, "Certified System Administrator
  (CSA) Mainline Exam Blueprint". Its public meta description (from
  `https://learning.servicenow.com/api/now/sp/page?id=kb_article_view&sysparm_article=KB0011554`,
  read 2026-11-16) says "Credentials - Exam Blueprint Mainline Certifications - Updated January
  2026". That proves a January 2026 revision exists, but the description holds no domains,
  weights, question count, time or release.

## URLs tried (2026-11-16)
1. https://learning.servicenow.com/lxp/en/pages/certifications?id=kb_article_view&sysparm_article=KB0011554
   (WebFetch): only the title and "loading" text; the body is rendered by JavaScript.
2. https://learning.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0011554 (WebFetch and
   curl): same, title only.
3. https://learning.servicenow.com/api/now/sp/page?id=kb_article_view&sysparm_article=KB0011554
   (curl): page layout JSON with the meta description above; the kb-article-content widget's data
   is empty.
4. https://learning.servicenow.com/api/sn_km_api/knowledge/articles/KB0011554 (curl): "User is not
   authenticated".
5. https://learning.servicenow.com/api/now/sp/rectangle/<widget instance>?... (curl): "invalid_token";
   getting a session token to read the widget was refused by the permission system, so not pursued.
6. https://learning.servicenow.com/kb_view.do?sysparm_article=KB0011554 (curl): UI shell only.
7. https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/doc-type/other-document/csa-exam-blueprint.pdf
   and six other guessed names in that folder: 403 (WebFetch) / no connection (curl). No official
   public CSA PDF found by search.
8. Searches for the exam specification found only third-party pages, Udemy courses, a 2019-era
   Scribd upload (https://www.scribd.com/document/434471577/Blueprint-CSA-Exam, older domain names
   such as "User Interface & Navigation 20%") and ServiceNow Community posts by community members
   (https://www.servicenow.com/community/training-and-certifications/servicenow-csa-exam-study-guide/td-p/3528191,
   https://www.servicenow.com/community/training-and-certifications/current-csa-exam-is-on-which-version-xanadu-zurich/m-p/3443289),
   none of them ServiceNow staff or the blueprint itself.

## Why this is a stop
Third-party figures for the January 2026 blueprint disagree: Database Management and Platform
Security 27% or 30%, Instance Configuration 10% or 11%, Data Migration and Integration 13% or 15%;
the release tested is reported as Yokohama by one community member and is otherwise unconfirmed.
The brief forbids building a bank from prep sites or memory.

## To unblock
Someone signed in to ServiceNow University (free account) opens KB0011554 and saves the page as
PDF (or pastes its text) into `tools/next100/servicenowcsa/blueprint-KB0011554.pdf`; the build can
then start from the official domains, weights, question count, time and release.
