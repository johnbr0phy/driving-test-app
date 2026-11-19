# Sources for `sfappbuilder` (Salesforce Certified Platform App Builder)

All 200 questions are original, written by Tigertest from the exam guide's section and objective
list and Salesforce's own documentation and Trailhead content. No Salesforce practice question,
Trailhead cert prep scenario or flashcard, past exam item, brain dump or commercial practice
question was used, and no prep provider is named in the bank. Checked 2026-11-18.

## Exam guide and outline (official)
- Salesforce Help, "Salesforce Certified Platform App Builder Exam Guide", article 005298964,
  https://help.salesforce.com/s/articleView?id=005298964&type=1&language=en_US (the target of
  https://trailhead.salesforce.com/help?article=Salesforce-Certified-Platform-App-Builder-Exam-Guide,
  a 302 redirect seen 2026-11-18). The page is a JavaScript app: WebFetch and curl got only the
  "Sorry to interrupt / CSS Error" shell on 2026-11-18, as for the Administrator and Developer
  guides (see tools/next100/sfadmin/sources.md and tools/build-run-2026-11-18/sfpd1/sources.md).
  Its text as indexed by web search on 2026-11-18 (help.salesforce.com results only) gave: exam
  questions align to the SU '26 (Summer '26) release; 60 multiple-choice questions, 105 minutes,
  73% passing score; Salesforce Fundamentals 18% (boundaries of declarative customization and
  programmatic use cases, extending the org with AgentExchange, object, record and field access,
  sharing solutions, reports, report types and dashboards); Data Modeling and Management 20%
  (appropriate data model, relationship types and their impact on record access, UI and
  reporting, changing field data types, importing and exporting data including external data);
  Business Logic and Process Automation 32% (formula fields, roll-up summary fields, validation
  rules, Flow Builder, flow approval processes, choosing a flow type, maintaining and
  troubleshooting flows, Agentforce to automate business processes); User Interface 17% (UI
  customization options, custom buttons, links and actions, declarative and programmatic
  Lightning components, global and object-specific actions and layouts for mobile); App
  Deployment 13% (application lifecycle management, sandbox types, change sets, managed and
  unmanaged packages, deployment plans). The landing labels the format as the exam guide's,
  confirmed by the two guides below.
- Trailhead trail "Prepare for Your Salesforce Platform App Builder Certification",
  https://trailhead.salesforce.com/content/learn/trails/prepare-for-your-salesforce-platform-app-builder-certification
  (fetched 2026-11-18): links the exam guide above and groups study modules under the five
  sections Salesforce Fundamentals, Data Modeling and Management, Business Logic and Process
  Automation, User Interface, and App Deployment. It names AgentExchange Basics (formerly
  AppExchange) and Lifecycle Center: Quick Look (slug devops-center-quick-look, so formerly DevOps
  Center), which is how the bank names both.
- Trailhead Document "Study for the Platform App Builder Exam", modules 1 and 2 printable PDFs,
  https://dfc-data-production.s3.amazonaws.com/files/ti/thi/THI-000265/PAB_Mod_1_Printable.pdf and
  https://dfc-data-production.s3.amazonaws.com/files/ti/thi/THI-000265/PAB_Mod_2_Printable.pdf
  (fetched 2026-11-18; created January 2021). Used only for each section's topic list. Its
  weights (23/17/22/28/10) and 63% pass mark are the pre-2026 exam and are not used. Its practice
  scenarios and flashcards were not used for questions.

## Exam format and the August 2026 refresh (guides confirm the exam guide)
- Certifyforce, "Platform App Builder Certification: 2026 Exam Guide",
  https://www.certifyforce.com/blog/platform-app-builder-certification-guide (fetched 2026-11-18,
  dated October 25, 2026): 60 scored multiple-choice/multiple-select questions plus up to 5
  unscored, 105 minutes, 73%, Summer '26 release; weights 32/20/18/17/13 as above.
- Salesforce Ben, "The Salesforce Platform App Builder Exam Just Got Harder",
  https://www.salesforceben.com/the-salesforce-platform-app-builder-exam-just-got-harder/
  (fetched 2026-11-18, dated November 2, 2026): the exam was refreshed on August 21, 2026,
  aligned to Summer '26; pass mark rose from 63% to 73%; Business Logic and Process Automation is
  32%; deeper Flow (choosing a flow type, troubleshooting, maintaining and monitoring) and
  Agentforce framed as an automation tool.
- Salesforce Admins podcast page, https://admin.salesforce.com/blog/2026/what-does-the-salesforce-platform-app-builder-certification-prove-today-podcast:
  403 to our fetcher on 2026-11-18; not used.
Not used: fees, retake fees and maintenance-module dates.

## Primary documentation used for facts (fetched 2026-11-18)
Salesforce Help pages did not render, so facts come from Salesforce's own PDFs on
resources.docs.salesforce.com and Trailhead units, and from long-standing Help behaviour that
these support:
- Data Loader Guide, Winter '27,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_data_loader.pdf:
  Data Loader up to 150,000,000 records, objects the wizard does not support, scheduled loads,
  exports; Data Import Wizard under 50,000 records, duplicate matching by account name and site,
  contact email and lead email; hard delete wizard; Use Bulk API setting.
- Examples of Validation Rules,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_useful_validation_formulas.pdf:
  REGEX postal codes, VLOOKUP, ISPICKVAL, ISCHANGED and PRIORVALUE examples.
- Examples of Advanced Formula Fields,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_useful_formula_fields.pdf:
  HYPERLINK, IMAGE, CASE, TEXT and date arithmetic.
- Salesforce Developer Limits and Allocations Quick Reference,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_app_limits_cheatsheet.pdf
  (change sets up to 10,000 files; sandbox types).
- Second-Generation Managed Packaging Developer Guide and ISV packaging guide, Winter '27,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/pkg2_dev.pdf and
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_packaging_guide.pdf
  (namespaces, managed package upgrades and IP protection).
- Trailhead units (fetched 2026-11-18): Data Modeling, Object Relationships
  (https://trailhead.salesforce.com/content/learn/modules/data_modeling/object_relationships:
  lookup, master-detail, hierarchical only on User); Formulas and Validations, Roll-Up Summary
  Fields (https://trailhead.salesforce.com/content/learn/modules/point_click_business_logic/roll_up_summary_fields:
  master-detail required, COUNT, SUM, MIN, MAX and the field types each takes), Formula Fields
  and Validation Rules units of the same module (formula returns, cross-object formulas, error
  when the formula is true); Data Security units
  (https://trailhead.salesforce.com/content/learn/modules/data_security/data_security_overview and
  the _records, _objects and _fields units: four levels of access, org-wide default options,
  Grant Access Using Hierarchies, sharing rules only grant access, manual sharing, one profile per
  user, permission sets and groups, muting, field permissions over page layouts, Field
  Accessibility); Lightning Experience Customization, actions unit
  (https://trailhead.salesforce.com/content/learn/modules/lex_customization/lex_customization_actions:
  global and object-specific actions, action types, required fields on new action layouts, the
  Salesforce Mobile and Lightning Experience Actions section); Record-Triggered Flows, Get Started
  (https://trailhead.salesforce.com/content/learn/modules/record-triggered-flows/get-started-with-triggered-flows:
  trigger options created, updated, deleted, no undelete; Fast Field Updates, Actions and Related
  Records, Run Asynchronously and scheduled paths; screen, autolaunched and triggered flow types).

## Conflicts and what was left out
- Weights: the 2021 Trailhead document and many guides still show 23/22/28/17/10; the current
  guide (August 21, 2026 refresh) is 18/20/32/17/13, which the bank follows.
- Pass mark: older guides say 63% or 68%; the current guide says 73%.
- Product names: AgentExchange (formerly AppExchange) and Lifecycle Center (formerly DevOps
  Center) follow the Trailhead trail; Agentforce "subagents" (formerly topics) follow
  tools/next100/sfadmin/sources.md.
- Not asked: compact layout field counts, formula size limits, roll-up and relationship counts
  per object (they have changed between releases), Schema Builder page-layout behaviour, inbound
  change set expiry, unlocked package edits in production, flow error email recipients, fees,
  and anything about the test itself.

## Sibling banks checked for repeats
`data/salesforce-admin-questions.json` (sfadmin) and `data/v2/sfpd1/questions.json` (sfpd1,
built at the same time): about 30 items that shared a fact and answer with sfadmin (activation by
app, record type and profile; compact layout and highlights panel; Path; Kanban; joined and
matrix formats; cross filter WITHOUT; Data Export Service; Export All; hard delete; Data Loader
for 400,000 records; reporting snapshot; field history; delegated administration; delegated
approver; implicit sharing; Testing Center; escalation and auto-response rules; Dynamic Forms and
Dynamic Actions visibility) were rewritten to other facts on the same objectives.
