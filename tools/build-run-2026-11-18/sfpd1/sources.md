# Sources for `sfpd1` (Salesforce Certified Platform Developer, formerly Platform Developer I)

All 201 questions are original, written by Tigertest from the Trailhead certification prep
outline and Salesforce's own developer documentation. No Salesforce practice question, Trailhead
cert prep scenario or flashcard, past exam item, brain dump or commercial practice question was
used, and no prep provider is named. Checked 2026-11-18.

## Credential name (official, confirmed)
- Trailhead credential page, https://trailhead.salesforce.com/credentials/platformdeveloperi
  (fetched 2026-11-18): page title "Certification - Salesforce Certified Platform Developer";
  "Certified Platform Developers understand how to develop and deploy custom business logic and
  custom interfaces using the programmatic capabilities of the Lightning Platform." The URL still
  says platformdeveloperi and the Trailmix is "Prepare for Your Salesforce Platform Developer I
  Credential", so the landing uses both names (formerly Platform Developer I, PDI). The page links
  the exam registration on Trailhead Academy
  (https://trailheadacademy.salesforce.com/certificate/exam-platform-dev1---Plat-Dev-201), which
  is a JavaScript app and did not render for our fetcher.

## Exam outline and weights (official, confirmed)
- Trailhead module "Cert Prep: Platform Developer: Developer Fundamentals", unit "Get Started
  with Platform Developer I",
  https://trailhead.salesforce.com/content/learn/modules/platform-developer-i-certification-prep-fundamentals-and-database-modeling/pd1-1-get-started
  (fetched 2026-11-18): Developer Fundamentals 27%, Process Automation and Logic 28%, User
  Interface 25%, Testing, Debugging, and Deployment 20%. Logistics are left to the exam guide.
- Same module, unit "Review Fundamentals",
  https://trailhead.salesforce.com/content/learn/modules/platform-developer-i-certification-prep-fundamentals-and-database-modeling/pd1-1-review-fundamentals
  (fetched 2026-11-18): section 27%; key topics multitenant concepts and design frameworks (MVC,
  Lightning Component Framework); declarative versus programmatic use cases and best practices
  (governor limits, formula fields, roll-up summaries); data models (objects, fields,
  relationships, external IDs); use cases and limitations of Agentforce for Developers.
- "Cert Prep: Platform Developer: Automation and Logic",
  https://trailhead.salesforce.com/content/learn/modules/platform-developer-i-certification-prep-logic-and-process-automation
  and its units pd1-2-apex-formulas-rollupsummary (28%; declarative process automation, Apex
  variables, constants and methods, control flow), pd1-2-soql-sosl-dml (SOQL, SOSL, DML,
  exceptions and governor limits) and pd1-2-classes-triggers (Apex classes, triggers, save order
  of execution, recursion and cascading), fetched 2026-11-18.
- "Cert Prep: Platform Developer: User Interface",
  https://trailhead.salesforce.com/content/learn/modules/platform-developer-i-certification-prep-user-interfaces
  and units pd1-3-ui-visualforce (user interface and data access security vulnerabilities; custom
  UI components including Lightning Components, Flow and Visualforce) and pd1-3-ui-lcf (LWC
  framework, benefits and events; Apex for LWC, Flow and Agentforce), fetched 2026-11-18.
- "Cert Prep: Platform Developer: Testing, Debugging, and Deployment",
  https://trailhead.salesforce.com/content/learn/modules/platform-developer-i-certification-prep-testing-debugging-and-deployment
  and units pd1-4-testing (20%; testing frameworks and requirements, test data, executing tests,
  test considerations; tests for triggers, controllers, classes and flows) and
  pd1-4-debug-deploy-tools (deployment, debugging, Salesforce DX, Salesforce CLI, Developer
  Console; monitoring flows, processes, asynchronous and batch jobs), fetched 2026-11-18.
  The units' practice scenarios and flashcards were not read for questions.

## Exam format (guides say; the official exam guide did not render)
The official exam guide is Salesforce Help article 005298965
(https://help.salesforce.com/s/articleView?id=005298965&type=1&language=en_US, the target of
https://trailhead.salesforce.com/help?article=Salesforce-Certified-Platform-Developer-Exam-Guide).
On 2026-11-18 it returned a JavaScript shell ("Sorry to interrupt / CSS Error") to WebFetch and
"Access Denied" to curl, the same as the Platform Administrator guide (see
tools/next100/sfadmin/sources.md). The format below comes from two independent guides that quote
the exam guide and agree; the landing and examFacts label it "guides say" where needed:
- Open Exam Prep, "Salesforce Developer exam facts",
  https://open-exam-prep.com/study-guides/salesforce-developer/introduction/exam-facts
  (fetched 2026-11-18): 60 scored multiple-choice/multiple-select questions plus up to 5 unscored,
  105 minutes, 68% to pass; registration through Trailhead Academy since July 21, 2025 (replacing
  Webassessor), delivered by Pearson VUE at a test center or online proctored; older sources with
  110 minutes or 65% are out of date.
- Fast Lane certification listing, https://www.fastlanetraining.ca/certification/sfcpdi (fetched
  2026-11-18): 60 multiple-choice/multiple-select questions, up to five non-scored, 105 minutes,
  68%; it says the questions align to the Winter '25 release.
Not used: fees, retake fees and maintenance-module dates (all change and none could be confirmed).

## Primary documentation used for facts (fetched 2026-11-18)
Developer docs on developer.salesforce.com return 403 to automated fetchers, so the full guides
were read as Salesforce's own PDFs on resources.docs.salesforce.com:
- Apex Developer Guide, Version 68.0, Winter '27, last updated October 23, 2026,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf:
  per-transaction limits table (SOQL 100 sync / 200 async, 50,000 rows, 20 SOSL, 2,000 SOSL rows,
  150 DML, 10,000 DML rows, 100 callouts, 50 future calls (0 in batch and future), enqueueJob 50
  sync / 1 async, CPU 10,000 / 60,000 ms; scheduled Apex uses synchronous limits; parent-child
  subqueries count as extra queries; custom metadata queries do not count); LimitException cannot
  be handled; 50% limit email warnings; Apex cannot spawn threads, create temporary files, render
  UI other than errors or change standard functionality; Apex is compiled and stored as metadata;
  no Apex development directly in production; trigger context variables and considerations
  (Trigger.new editable only in before triggers, Trigger.old in update and delete, newMap
  availability, operationType, batches of 200); triggers and order of execution (before-save
  flows, before triggers, validation, duplicate rules, after triggers, workflow re-fires update
  triggers once, post-commit async); cascading deletes do not fire triggers; trigger order not
  guaranteed; callouts from triggers must be asynchronous, @future(callout=true); future method
  parameters primitive only; Queueable job Ids and chaining; Batch start/execute/finish, default
  scope 200, QueryLocator scope up to 2,000; Schedulable; @InvocableMethod rules (static, public
  or global, one per class, list input and output); @AuraEnabled, cacheable=true read only, no
  overloads from API 55.0; exception classes must end with Exception; methods and classes final by
  default; String == case-insensitive; primitives passed by value; safe navigation ?. and null
  coalescing ??; upsert matching rules and case sensitivity; relating records by external ID;
  formula field values as of the query, read-only; merge up to three records; savepoints count
  toward the DML statement limit; ALL ROWS; FOR UPDATE; mixed DML; QueryException on no rows;
  escapeSingleQuotes; with sharing / without sharing / inherited sharing, default with sharing and
  user context from API 67.0 (system mode in 66.0 and earlier), WITH SECURITY_ENFORCED not allowed
  from API 67.0 (use WITH USER_MODE); stripInaccessible; testing (75% coverage, every use case,
  startTest/stopTest new limits and async run at stopTest, @TestSetup rollback, SeeAllData from
  API 24.0, Test.loadData, setFixedSearchResults, @TestVisible, test classes outside the code size
  limit, runAs only in tests); Developer Console tasks; debug log limits (20 MB, 24 hours,
  1,000 MB in 15 minutes disables trace flags); Full sandbox for staging; Design Managed Apex for
  Agentforce (global members, InvocableMethod label and description).
- SOQL and SOSL Reference, Winter '27,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_soql_sosl.pdf:
  relationship names (__r), five levels child-to-parent, five levels of parent-to-child from API
  58.0, 20 parent-to-child relationships per query, TYPEOF.
- Visualforce Developer Guide, Version 68.0, Winter '27,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_pages_developers_guide.pdf:
  standard controllers in user mode, custom controllers and extensions, extension constructor,
  recordSetVar, view state limit 170 KB and transient, XSS (escape="false", custom JavaScript not
  protected), Test.setCurrentPage.
- Salesforce DX Developer Guide, Version 68.0, Winter '27,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/sfdx_dev.pdf: scratch org
  definition file, 1 to 30 days with a default of 7, Dev Hub, sfdx-project.json
  packageDirectories, sf project deploy start / retrieve start, sf apex run test, test levels and
  the default for production deployments, junction objects (two master-detail relationships),
  Apex Replay Debugger.
- Lightning Aura Components Developer Guide, Version 68.0, Winter '27,
  https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/lightning.pdf: always choose
  LWC unless a feature is unsupported; LWC built on web standards; Lightning Message Service
  communicates across the DOM.
- Trailhead, Lightning Web Components Basics and Lightning Web Components and Salesforce Data
  (fetched 2026-11-18):
  https://trailhead.salesforce.com/content/learn/modules/lightning-web-components-basics/create-lightning-web-components
  (all fields reactive, @track for object and array internals, @api public and reactive, one
  decorator per property, connectedCallback and disconnectedCallback, lwc:if and lwc:else),
  https://trailhead.salesforce.com/content/learn/modules/lightning-web-components-basics/handle-events-in-lightning-web-components
  (CustomEvent and dispatchEvent, on prefix, event naming, @api methods via querySelector, kebab
  case attributes),
  https://trailhead.salesforce.com/content/learn/modules/lightning-web-components-basics/add-styles-and-data-to-a-lightning-web-component
  (@wire syntax, data and error),
  https://trailhead.salesforce.com/content/learn/modules/lightning-web-components-and-salesforce-data/use-lightning-data-service-to-work-with-data
  (record forms, LDS shared cache, single-record LDS functions in their own transactions),
  https://trailhead.salesforce.com/content/learn/modules/lightning-web-components-and-salesforce-data/use-apex-to-work-with-data
  (static public/global @AuraEnabled, cacheable no DML, wired methods cacheable, imperative
  promises, refreshApex, $ reactive parameters, @salesforce/apex imports).
- LWC Developer Guide, "Render Lists" (https://developer.salesforce.com/docs/platform/lwc/guide/create-lists.html):
  403 to our fetcher; its sentence that for:each and iterator items need a key with a unique Id
  was read from a search result quoting the page (2026-11-18).
- Trailhead "Get to know Agentforce Vibes" unit,
  https://trailhead.salesforce.com/content/learn/modules/einstein-for-developers/get-to-know-einstein-for-developers
  (fetched 2026-11-18): Agentforce Vibes extension, formerly Agentforce for Developers; VS Code
  Salesforce Extension Pack with Salesforce DX projects; output can be inaccurate and is often
  nondeterministic, so review it; telemetry must be enabled.
- Trailhead "Data Modeling", https://trailhead.salesforce.com/content/learn/modules/data_modeling/object_relationships
  (master-detail deletes details, detail depends on master, master controls viewing; hierarchical
  only on User), "Formulas & Validations" roll-up unit
  https://trailhead.salesforce.com/content/learn/modules/point_click_business_logic/roll_up_summary_fields
  (master-detail required, COUNT, SUM, MIN, MAX), and "Record-Triggered Flows"
  https://trailhead.salesforce.com/content/learn/modules/record-triggered-flows/get-started-with-triggered-flows
  (Fast Field Updates before save, Actions and Related Records after save), all fetched 2026-11-18.

## Conflicts and what was left out
- API 67.0 (Summer '26) changed Apex defaults: classes without a sharing keyword run with sharing
  and Apex runs in user context; earlier versions defaulted to system mode. The Visualforce guide
  still says custom controllers run in system mode. Questions on these defaults name the API
  version; no question asks the unversioned default, and none asks whether a custom controller
  enforces field-level security.
- Heap size: the Winter '27 limits table says 10 MB / 25 MB while the same guide elsewhere says
  6 MB; no heap figure is asked.
- Agentforce Vibes test generation: Salesforce pages disagree on what it generates, so it is not
  asked.
- Junction object primary relationship, lookup delete options, field types and record type rules
  come from Salesforce Help, which did not load, so they are not asked.
- Fees, retakes, maintenance modules, and anything about the test itself are not asked.

## Sibling bank checked for repeats
`data/salesforce-admin-questions.json` (sfadmin): items sharing a fact and answer with it
(many-to-many model, before-save flow for same-record updates, Close Date validation rule,
roll-up calculations, Full sandbox copy, upsert on an external ID, master-detail cascade delete,
before-save flow before validation) were rewritten from the developer's side.
