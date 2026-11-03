# Sources for `sfadmin` (Salesforce Certified Platform Administrator)

All 200 questions are original, written from the exam guide's section list and Salesforce's own
product behaviour. No Salesforce sample question, Trailmix quiz, past exam item or commercial
practice question was copied, and no prep provider is named. Checked 2026-11-03.

## Credential name (official)
- Trailhead credential page, title "Certification - Salesforce Certified Platform Administrator",
  canonical https://trailhead.salesforce.com/credentials/platformadministrator (the older
  /credentials/administrator URL serves the same page). Checked 2026-11-03. The credential was
  formerly "Salesforce Certified Administrator"; people still search for "Salesforce admin
  certification" and "ADM 201", so the landing uses both names.

## Exam format and section weights
The official exam guide (Salesforce Help article 005298966,
https://help.salesforce.com/s/articleView?id=005298966&type=1&language=en_US, linked from the
Trailhead page) and Salesforce's admin blog post "What the Salesforce Certified Platform
Administrator Exam Update Means for Admins"
(https://admin.salesforce.com/blog/2026/what-the-salesforce-certified-platform-administrator-exam-update-means-for-admins)
did not render for our fetcher on 2026-11-03 (JavaScript page / 403). The figures below come from
guides that quote the exam guide, and they agree with each other:
- open-exam-prep.com, "Salesforce Administrator Exam Guide 2026"
  (https://open-exam-prep.com/blog/salesforce-administrator-exam-guide-2026), checked 2026-11-03.
- Salesforce-Study-Hub study guide README on GitHub
  (https://github.com/Salesforce-Study-Hub/Salesforce-Platform-Administrator-201-Study-Guide),
  checked 2026-11-03; links the official guide and the admin blog.
- Search summaries of salesforceben.com ("Salesforce Platform Admin Exam Updated for 2026: More
  Agentforce, Less Configuration") and apexhours.com ("exam refreshing on December 15, 2025").

Guides say (label as such on the landing where not confirmed):
- Refreshed blueprint effective December 15, 2025 (guides; Salesforce admin blog post title
  confirms a 2026 exam update).
- 60 scored multiple-choice / multiple-select questions plus up to 5 unscored items; 105 minutes.
- Passing score 68% (English exam guide; 65% quoted for Japanese). Older guides say 65%.
- Sections: Configuration and Setup 15%, Object Manager and Lightning App Builder 15%, Sales and
  Marketing Applications 10%, Service and Support Applications 10%, Productivity and Collaboration
  10%, Data and Analytics Management 17%, Automation 15%, Agentforce 8% (total 100). One search
  snippet gave Productivity and Collaboration 7%, which does not sum to 100; we use 10% as the
  guides that list all eight do.
- Fee and retake fee exist; deliberately not used in copy. Delivered proctored onsite or online
  (Salesforce certification programme; not in the bank).

## Product names as of November 2026
- Agentforce: "topics" were renamed "subagents" in April 2026 with no change in function
  (Salesforce developer docs, "Get Started with Agent Script",
  https://developer.salesforce.com/docs/einstein/genai/guide/agent-script.html, per search
  summary 2026-11-03; page returned 403 to our fetcher). Agent Script is the scripting language
  of the new Agentforce Builder; creation moved to the new builder from the week of July 13,
  2026 (same source and https://www.salesforce.com/agentforce/agent-builder/migration/). The bank
  says "subagent (formerly a topic)" in explanations and avoids dated launch facts.
- Workflow rules and Process Builder: retired in favour of Flow, with the Migrate to Flow tool.
  The bank states only that Salesforce recommends moving to Flow; no end-of-support date.
- Einstein Trust Layer, Prompt Builder, Testing Center, Omni-Channel, Messaging for In-App and
  Web: current Salesforce product names.

## Product facts used in explanations (stable platform behaviour)
Recycle Bin and Deleted Fields keep items 15 days; Data Import Wizard up to 50,000 records and
no opportunities; merge up to three records; one active lead / case assignment, escalation and
auto-response rule; Grant Access Using Hierarchies can be cleared only on custom objects;
multiple currencies, custom fiscal years and person accounts cannot be turned off once enabled;
new sandboxes default email deliverability to System email only; before-save flows run before
custom validation rules in the order of execution. All from Salesforce Help and Trailhead.

## Blueprint (Tigertest)
60 per test like the real scored count: 9/9/6/6/6/10/9/5 (largest remainder of
15/15/10/10/10/17/15/8 percent of 60). Three tests; pools 30/30/20/20/20/33/30/17 = 200, so 20
items (the last of each pool) are training-only. Pass line 68%, 41 of 60.
