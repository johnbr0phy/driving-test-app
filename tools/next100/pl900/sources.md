# PL-900 sources

All 198 items are original, written from Microsoft's public PL-900 study guide and Microsoft Learn product documentation. No item is copied from Microsoft's practice assessment (AI Skills Navigator or the legacy Learn assessment), the exam sandbox, any prep provider or any other bank. All pages fetched 2026-11-19.

Build: `python3 -I tools/next100/pl900/build.py` (local python3 is 3.9, so the builder carries a `from __future__ import annotations` shim, like ai901's).

## Outline
- **Study guide for Exam PL-900: Microsoft Power Platform Fundamentals**, Microsoft Learn (ms.date 2026-05-31, updated 2026-11-19), "Skills measured as of July 24, 2026", fetched 2026-11-19. https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/pl-900
  Skills at a glance: Describe the business value of Microsoft Power Platform 5-10%; Manage the Microsoft Power Platform environment 20-25% (Describe Microsoft Dataverse; Describe administration and governance); Demonstrate the capabilities of Power Apps 20-25% (canvas, model-driven, Plan designer, code apps; AI to create canvas and model-driven apps; the vibe experience); Demonstrate the capabilities of Power Automate 20-25% (cloud and desktop flows; approvals, Teams, Outlook, SharePoint, Forms and document automation; connector triggers and actions; AI to create and modify cloud and desktop flows); Describe features and capabilities of agents in Microsoft Copilot Studio 20-25% (use cases, topics, knowledge sources, tools including MCP servers and agent flows, channels; Microsoft Agent 365, monitoring usage and adoption, agent evaluations). Change log: Power Pages and canvas/model-driven build skills removed as their own areas; Copilot Studio area new. Power BI is no longer measured. "A score of 700 or greater is required to pass." Most questions on GA features; preview features may appear if commonly used.

## Format and status
- **Microsoft Certified: Power Platform Fundamentals** certification page (last updated 07/24/2026), fetched 2026-11-19. https://learn.microsoft.com/en-us/credentials/certifications/power-platform-fundamentals/
  "You will have 45 minutes to complete this assessment." Proctored; may have interactive components. Retake after 24 hours for a first failure. Languages: English, Spanish, German, Chinese (Simplified), French, Korean, Japanese, Portuguese (Brazil), Russian, Arabic (Saudi Arabia), Chinese (Traditional), Italian. Pearson VUE, or Certiport for students and educators. Price by country. No retirement notice. Important: "The English language version of this certification will be updated on December 18, 2026." The study guide did not yet list the new skills when read, so the bank follows the July 24, 2026 outline and a freshness event marks December 18, 2026.
- Question count: Microsoft publishes none for PL-900. Tigertest's tests are 50 in 45 minutes.

## Product docs used for facts (Microsoft Learn, all fetched 2026-11-19)
- What is Microsoft Dataverse? (ms.date 2026-03-31): tables, rows, columns, standard and custom tables, role-based security, business rules, business process flows (model-driven apps only), workflows, Power Query import, terminology changes (table, column, row, choice). https://learn.microsoft.com/en-us/power-apps/maker/data-platform/data-platform-intro
- Types of tables (ms.date 2026-08-31): standard, activity, virtual, elastic (Azure Cosmos DB); activity tables owned only by user or team, primary field Subject; ownership Organization, User or team, Filtered; ownership can't change after creation. https://learn.microsoft.com/en-us/power-apps/maker/data-platform/types-of-entities
- Create and edit tables using Power Apps (ms.date 2026-08-31): Start with Copilot, Set advanced properties, Create with external data (Excel/.CSV, SharePoint list, first 20 rows previewed), Create a virtual table, table designer can create a model-driven app. https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-edit-entities-portal
- About table relationships (ms.date 2026-09-14): 1:N, N:N with intersect table, N:1 as the child view, lookup creates 1:N, behaviors Cascade All, Cascade Active, Cascade User Owned, Cascade None, Remove Link, Restrict. https://learn.microsoft.com/en-us/power-apps/maker/data-platform/create-edit-entity-relationships
- Work with Dataverse formula columns (ms.date 2026-01-09): Power Fx, formula suggestions (preview). https://learn.microsoft.com/en-us/power-apps/maker/data-platform/formula-columns
- Create and design model-driven app forms (ms.date 2026-03-12): main, quick create, quick view, card. https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/create-design-forms
- Create or edit a model-driven app view (ms.date 2026-04-03): personal, system, public views; Quick Find, Advanced Find, Associated, Lookup; system views not in the view selector. https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/create-edit-views
- Power Platform environments overview (ms.date 2026-10-08): zero or one Dataverse database, geography, same-environment data sources, Environment Admin and Environment Maker, types (production, default, sandbox, trial 30 days one per user, developer, Dataverse for Teams deprecated), default environment facts. https://learn.microsoft.com/en-us/power-platform/admin/environments-overview
- Security in Microsoft Dataverse (updated 2026-08-14): Entra ID authentication, licensing, canvas apps shared with users or groups, model-driven apps shared through security roles. https://learn.microsoft.com/en-us/power-platform/admin/wp-security
- Security roles and privileges (ms.date 2025-12-09): Create, Read, Write, Delete, Append, Append to, Assign, Share; access levels Organization, Parent: Child Business Unit, Business Unit, User, None. https://learn.microsoft.com/en-us/power-platform/admin/security-roles-privileges
- Data policies (ms.date 2026-10-14) and Connector classification (ms.date 2026-04-07): Business, Non-Business, Blocked; Non-Business default; connectors in different groups can't be combined; non-blockable connectors (Dataverse, Approvals, Notifications, Microsoft 365 standard connectors). https://learn.microsoft.com/en-us/power-platform/admin/wp-data-loss-prevention and https://learn.microsoft.com/en-us/power-platform/admin/dlp-connector-classification
- Managed environments overview (ms.date 2026-10-08): limit sharing, weekly usage insights, data policies, pipelines, maker welcome content, solution checker, IP firewall, CMK, Lockbox and more. https://learn.microsoft.com/en-us/power-platform/admin/managed-environment-overview
- Overview of pipelines in Power Platform (ms.date 2026-11-06): solutions plus connections and environment variables, no Dataverse data, managed solutions to targets, delegated deployments, same artifact through stages, no cross-tenant. https://learn.microsoft.com/en-us/power-platform/alm/pipelines
- Monitor the health of your resources (ms.date 2026-11-05): Monitor area, tenant-level analytics required, managed environment for recommendations, metrics 28 days. https://learn.microsoft.com/en-us/power-platform/admin/monitoring/monitoring-overview
- Review a canvas app for accessibility (updated 2026-10-13): Accessibility checker in App checker, errors, warnings and tips. https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessibility-checker
- FAQ for Copilot data security and privacy (updated 2026-08-14): data not used to train OpenAI models, permissions respected, data movement across geographies, Service Trust Portal. https://learn.microsoft.com/en-us/power-platform/faqs-copilot-data-security-privacy
- Complete guide to building canvas applications (ms.date 2026-04-15). https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/getting-started
- Overview of building a model-driven app (ms.date 2026-01-09): Dataverse only, component-focused design, comparison table, minimum requirements (table, site map, view, form). https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/model-driven-app-overview
- Build your first modern model-driven app (updated 2026-11-14): solutions, app designer, Add page. https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/build-first-model-driven-app
- Use plans to create AI-powered business solutions (ms.date 2026-08-07): GA, Dataverse required, generates tables, canvas and model-driven apps, Power Pages sites, flows and agents; roles; turned off only through Support. https://learn.microsoft.com/en-us/power-apps/maker/plan-designer/plan-designer
- Power Apps code apps overview (ms.date 2026-09-23): React and Vue, Entra auth, 1,500+ connectors, Node.js, npm, Git, Power Apps CLI, enable in environment Features, Power Apps Premium, limitations. https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview
- Build apps through conversation with Copilot (ms.date 2026-04-10): Start with data, Create new data, system customizer role, Create / Import data / Change. https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/ai-conversations-create-app
- Overview of the new Power Apps vibe experience (ms.date 2026-09-08): preview, not in a default environment, Copilot in Power Apps tenant setting, vibe.powerapps.com, Plan mode. https://learn.microsoft.com/en-us/power-apps/vibe/overview
- What is Power Automate? (ms.date 2026-10-29): cloud flows, desktop flows, generative actions (preview). https://learn.microsoft.com/en-us/power-automate/flow-types
- Triggers (ms.date 2026-09-18): automated, instant, scheduled; Recurrence; When a new email arrives (V3). https://learn.microsoft.com/en-us/power-automate/triggers-introduction
- Get started with approvals (ms.date 2026-04-29): approval types, Dataverse prerequisite, Approvals User role, respond in Outlook, Teams or the action center. https://learn.microsoft.com/en-us/power-automate/get-started-approvals
- Introduction to desktop flows (ms.date 2026-08-23) and Trigger desktop flows from cloud flows (ms.date 2026-05-05): RPA, legacy apps, recording, machines and machine groups, attended and unattended runs. https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction and https://learn.microsoft.com/en-us/power-automate/desktop-flows/trigger-desktop-flows
- Use the invoice processing prebuilt model in Power Automate (ms.date 2026-01-14): Extract information from invoices, confidence 0 to 1, page ranges. https://learn.microsoft.com/en-us/ai-builder/flow-invoice-processing
- Create your first cloud flow using Copilot (ms.date 2026-09-18) and Copilot in Power Automate for desktop (ms.date 2026-08-23). https://learn.microsoft.com/en-us/power-automate/create-cloud-flow-using-copilot and https://learn.microsoft.com/en-us/power-automate/desktop-flows/copilot-in-power-automate-for-desktop
- Connectors overview (ms.date 2026-06-03). https://learn.microsoft.com/en-us/connectors/overview
- Copilot Studio: Create and edit topics (ms.date 2026-11-17), Knowledge sources summary (ms.date 2026-07-21), Add tools to custom agents (ms.date 2026-11-16), Extend your agent with MCP (ms.date 2026-08-26), Agent flows overview (ms.date 2026-11-03), Publish and deploy your agent (ms.date 2026-09-16), Monitor agent performance (ms.date 2026-10-21), About agent evaluation (ms.date 2026-10-05). https://learn.microsoft.com/en-us/microsoft-copilot-studio/authoring-create-edit-topics https://learn.microsoft.com/en-us/microsoft-copilot-studio/knowledge-copilot-studio https://learn.microsoft.com/en-us/microsoft-copilot-studio/add-tools-custom-agent https://learn.microsoft.com/en-us/microsoft-copilot-studio/agent-extend-action-mcp https://learn.microsoft.com/en-us/microsoft-copilot-studio/flows-overview https://learn.microsoft.com/en-us/microsoft-copilot-studio/publication-fundamentals-publish-channels https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-overview https://learn.microsoft.com/en-us/microsoft-copilot-studio/analytics-agent-evaluation-intro
- Microsoft Agent 365 overview (ms.date 2026-11-11): four pillars, agent registry in the Microsoft 365 admin center, Agent Map, Purview, Defender, Entra, block risky agents, Copilot Credits cost management, GA for commercial per user. https://learn.microsoft.com/en-us/microsoft-agent-365/overview
- What is Power Pages? (ms.date 2026-04-23). https://learn.microsoft.com/en-us/power-pages/introduction

## Left out on purpose
- No prices, licence costs or quota numbers beyond documented limits; no Power BI content (removed from the outline).
- Preview features (vibe experience, generative actions, formula suggestions, desktop flow creation with Copilot) appear only where Microsoft documents them as commonly used, never as the only key of an item that depends on preview status.
- Region lists for Copilot features are left out (they change often).
- Interactive and lab item types are not modelled beyond yes/no statement sets, matching and choose-two.

## Blueprint (per 50-item test)
| Domain key | Study-guide area | Per test | Drill-only | Pool |
|---|---|---|---|---|
| pl900Value | Business value of Power Platform | 4 | 12 | 20 |
| pl900Dataverse | Describe Microsoft Dataverse | 6 | 12 | 24 |
| pl900Admin | Administration and governance | 5 | 12 | 22 |
| pl900Apps | Power Apps capabilities and building basic apps | 11 | 14 | 36 |
| pl900FlowsUse | Power Automate use cases and capabilities | 6 | 12 | 24 |
| pl900FlowsBuild | Building basic flows | 6 | 12 | 24 |
| pl900AgentBuild | Building agents in Copilot Studio | 8 | 12 | 28 |
| pl900AgentManage | Managing agents in Copilot Studio | 4 | 12 | 20 |

Areas 4 / 11 / 11 / 12 / 12 of 50 (8% / 22% / 22% / 24% / 24%), inside Microsoft's ranges. The split inside each area is Tigertest's.

## Formats
Single, multi "Choose two", yes/no statement sets as `matrix` with columns Yes/No (balanced 34 Yes rows, 34 No rows), matching as `matrix`.

## Overlap check
Stems and key-answer pairs checked against the az900, ai901, sc900, gcdl and Salesforce admin banks on disk; none covers Power Platform facts.
