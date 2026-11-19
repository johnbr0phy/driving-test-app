# sfai (Salesforce Certified AI Associate): not built

Checked 2026-11-18. Stopped at step 0 (research): the exam no longer exists, and Salesforce names
no exam at the same level to replace it.

## What the official pages say
- Trailhead credential page, https://trailhead.salesforce.com/en/credentials/aiassociate
  (fetched with curl 2026-11-18): "Salesforce launched Agentblazer Status, a new program designed
  to build and recognize your AI and Agentforce skills. As a result, we are evolving our exam
  catalog and retired the AI Associate certification in February 2026."
- Salesforce Help, "AI Associate Certification Retirement FAQ", article 005298766,
  https://help.salesforce.com/s/articleView?id=005298766&type=1&language=en_US: a JavaScript app
  that does not render for our fetchers (like every Help exam guide, see sfappbuilder/sources.md).
  Its indexed text (search, 2026-11-18) gives retirement on February 2, 2026, registration closed
  March 31, 2025, and Agentblazer Status as the way to show these skills.
- The old exam guide, Help article 005298930, is still indexed but describes a retired exam.

## Why not build a successor instead
- Agentblazer Status is a points-based Trailhead recognition track, not an exam. There is nothing
  to model.
- Salesforce Certified Agentforce Specialist (formerly AI Specialist) is the AI exam Salesforce
  now points people to, but it is not a rename of AI Associate: it existed alongside it since
  2024 and is a specialist-level exam (Salesforce recommends the Administrator and Platform App
  Builder certifications first). Building it under the id `sfai` would mislabel it, and its
  content (Agentforce Builder, Agent Script, prompt templates, Data Cloud grounding, testing and
  observability) is a different bank, not an AI Associate refresh.

## Suggestion for the queue
- Drop `sfai` from `tools/queue/backlog.json` (or mark it skipped: retired 2026-02-02).
- Add `sfagentforce` (Salesforce Certified Agentforce Specialist, v2, GLOBAL, Premium, siblings
  sfadmin, sfappbuilder, sfpd1, ccaf) as its own candidate. Its exam guide is a Help article that
  will not render, so a builder needs the Trailhead cert prep module with the current section
  weights (search shows a Summer '26 maintenance module) before starting. Secondary coverage says
  60 multiple-choice questions in 90 minutes; not confirmed on an official page here.

No bank, config, wrappers or landing were written for this id.
