# SC-200 sources

Every question in `data/v2/sc200/questions.json` is original, written for Tigertest from the
Microsoft Learn pages below. No Microsoft practice assessment item, exam sandbox item, past exam
item, prep provider question or leaked material was used or reworded.

## Exam outline (skills measured)

- Study guide for Exam SC-200: Microsoft Security Operations Analyst
  https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-200
  fetched 2026-11-16 (page updated 2026-11-05). No retirement banner. "Skills measured as of
  October 21, 2026": Manage a security operations environment 40-45% (configure automation for
  Defender XDR and Sentinel; configure the Sentinel SIEM and platform; ingest data into the
  Sentinel SIEM and platform; configure detections), Respond to security incidents 35-40%
  (respond in Defender XDR; respond in Defender for Endpoint; investigate Microsoft 365
  activities), Perform threat hunting 20-25% (detect threats by using Defender XDR; detect threats
  by using the Sentinel platform). Every bullet under these nine areas was read and mapped to the
  nine drill domains. Also gives: 700 or greater to pass; renewal is a free online assessment;
  English is updated first and localized versions about eight weeks later; most questions cover
  GA features, Preview features only when commonly used.

## Exam format

- Microsoft Certified: Security Operations Analyst Associate (certification page)
  https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst/
  fetched 2026-11-16 (last updated 10/21/2026). No retirement banner. 100 minutes; proctored; may
  have interactive components; retake after 24 hours for the first retry; languages English,
  Japanese, Chinese (Simplified), Korean, French, German, Spanish, Portuguese (Brazil), Chinese
  (Traditional), Italian; scheduled through Pearson VUE; price varies by country; renewal every
  12 months.
- Exam duration and exam experience
  https://learn.microsoft.com/en-us/credentials/support/exam-duration-exam-experience
  fetched 2026-11-16. Most Microsoft certification exams have 40-60 questions; associate role-based
  exams without labs 100 minutes (120 seat), with labs 120 minutes; question types (active screen,
  build list, case studies, drag and drop, hot area, multiple choice, labs); Microsoft Learn is
  open during role-based exams; breaks do not stop the clock.

What is not published: the number of questions on SC-200 and whether a given sitting has labs.
The landing and facts say "Microsoft does not publish a fixed number" and quote the 40-60
general figure as Microsoft's own wording. Labs and case studies are not modelled (scoreNote,
sourceLine, landing FAQ).

## Product documentation (Microsoft Learn), all fetched 2026-11-16

Defender XDR and Defender for Endpoint
- https://learn.microsoft.com/en-us/defender-xdr/automatic-attack-disruption (actions table,
  Attack Disruption tag, yellow banner, "(attack disruption)" title suffix, undo, exclusions)
- https://learn.microsoft.com/en-us/defender-xdr/configure-attack-disruption (prerequisites,
  device discovery Standard)
- https://learn.microsoft.com/en-us/defender-xdr/custom-detection-rules (required columns,
  frequencies and fixed lookbacks, Continuous (NRT) limits and tables, 150 alerts per run,
  dynamic titles up to three columns, response actions and their columns, device scope)
- https://learn.microsoft.com/en-us/defender-xdr/security-copilot-in-microsoft-365-defender
  (incident summary, guided responses, script and file analysis, device and identity summary,
  incident report, query assistant)
- https://learn.microsoft.com/en-us/defender-xdr/m365d-notifications-incidents
- https://learn.microsoft.com/en-us/defender-xdr/investigate-alerts (alert tuning)
- https://learn.microsoft.com/en-us/defender-xdr/manage-incidents
- https://learn.microsoft.com/en-us/defender-endpoint/automation-levels (levels, defaults, 7-day
  pending timeout; note that from September 1, 2026 AIR no longer runs as a separate investigation
  experience: no item asks about starting AIR by hand)
- https://learn.microsoft.com/en-us/defender-endpoint/machine-groups
- https://learn.microsoft.com/en-us/defender-endpoint/custom-data-collection
- https://learn.microsoft.com/en-us/defender-endpoint/advanced-features
- https://learn.microsoft.com/en-us/defender-endpoint/attack-surface-reduction-rules-reference
  (rule names, Warn support, advanced hunting action types, LSA protection note)
- https://learn.microsoft.com/en-us/defender-endpoint/respond-machine-alerts (isolation,
  selective isolation, contain device, restrict app execution, investigation package contents)
- https://learn.microsoft.com/en-us/defender-endpoint/live-response (basic and advanced
  commands, size limits, 30-minute idle timeout, session limits, unsigned scripts setting)
- https://learn.microsoft.com/en-us/defender-office-365/zero-hour-auto-purge
- https://learn.microsoft.com/en-us/defender-office-365/threat-explorer-real-time-detections-about
- https://learn.microsoft.com/en-us/defender-for-identity/alerts-mdi-classic
- https://learn.microsoft.com/en-us/defender-cloud-apps/investigate-anomaly-alerts
- https://learn.microsoft.com/en-us/entra/id-protection/howto-identity-protection-investigate-risk

Microsoft Sentinel
- https://learn.microsoft.com/en-us/azure/sentinel/manage-data-overview (Analytics, Data lake
  and XDR default tiers, retention limits, effects of changing tier and retention)
- https://learn.microsoft.com/en-us/azure/sentinel/roles (built-in roles, playbook roles, data
  lake Entra roles)
- https://learn.microsoft.com/en-us/azure/sentinel/threat-detection (rule types, Azure portal
  support ends after March 31, 2027)
- https://learn.microsoft.com/en-us/azure/sentinel/automate-incident-handling-with-automation-rules
- https://learn.microsoft.com/en-us/azure/sentinel/automation/automate-responses-with-playbooks
- https://learn.microsoft.com/en-us/azure/sentinel/soc-optimization/soc-optimization-access
- https://learn.microsoft.com/en-us/azure/sentinel/connect-services-windows-based (AMA, DCRs,
  XPath, Azure Arc, Windows Forwarded Events to WindowsEvent)
- https://learn.microsoft.com/en-us/azure/sentinel/windows-security-event-id-reference (All,
  Common with a full user audit trail, Minimal for threats without a full audit trail, Custom)
- https://learn.microsoft.com/en-us/azure/sentinel/connect-cef-syslog-ama (forwarder, port 514,
  facilities and minimum log level, duplicate ingestion)
- https://learn.microsoft.com/en-us/azure/sentinel/understand-threat-intelligence (connectors,
  upload API, ingestion rules, ThreatIntelIndicators and ThreatIntelObjects, legacy table
  stopped after July 31, 2025)
- https://learn.microsoft.com/en-us/azure/sentinel/summary-rules
- https://learn.microsoft.com/en-us/azure/sentinel/datalake/kql-jobs (suffixes, 30-minute start,
  limits, unsupported operators, 15-minute latency)
- https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-graph-overview
- https://learn.microsoft.com/en-us/azure/sentinel/datalake/sentinel-mcp-overview
- https://learn.microsoft.com/en-us/azure/sentinel/hunting (redirect of /livestream: hunting
  queries, bookmarks, notebooks; "Microsoft Sentinel livestreams are no longer available", so no
  item keys livestream)

Microsoft 365 and Purview
- https://learn.microsoft.com/en-us/purview/audit-solutions-overview (Standard 180 days,
  Premium one year for Entra, Exchange, OneDrive and SharePoint, 10-year add-on, intelligent
  insights, access methods)
- https://learn.microsoft.com/en-us/purview/edisc
- https://learn.microsoft.com/en-us/purview/edisc-search-mailbox-data (KeyQL, Search And Purge
  role, 10 items per mailbox per purge action, soft delete to Recoverable Items)
- https://learn.microsoft.com/en-us/graph/microsoft-graph-activity-logs-overview (Entra P1 or
  P2, diagnostic settings, MicrosoftGraphActivityLogs columns, up to 2 hours delivery,
  SignInActivityId join)

## Could not confirm word for word, and how it is worded

- The dedicated eDiscovery Content search page returned 404; Content search items were written
  from purview/edisc and edisc-search-mailbox-data.
- Purview DLP alerts reaching the Defender portal queue and Defender for Cloud suppression rules
  are stated in general terms only.

## Left out on purpose

- Exam fees, retake waits beyond the first, and any question about the exam itself.
- Prices, licence costs and SLA figures.
- Starting automated investigation by hand (changed September 1, 2026) and Sentinel livestream
  (no longer available).
- Labs, case studies and hot-area images.
- Facts already asked in `az900`, `secplus`, `cysa` and the sibling `sc900` bank (checked by stem
  similarity against all four on 2026-11-16).
