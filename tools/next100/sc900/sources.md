# SC-900 sources

All 201 items are original, written from Microsoft's public study guide and Microsoft Learn product documentation. No item is copied from Microsoft's practice assessment, the exam sandbox, any prep provider or any other bank. All pages fetched 2026-11-16.

## Outline
- **Study guide for Exam SC-900: Microsoft Security, Compliance, and Identity Fundamentals**, Microsoft Learn, "Skills measured as of October 21, 2026" (page ms.date 2026-08-16, updated 2026-09-21), fetched 2026-11-16. https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/sc-900
  Skill areas: Describe the concepts of security, compliance, and identity 10-15%; Describe the capabilities of Microsoft Entra 25-30%; Describe the capabilities of Microsoft security solutions 35-40%; Describe the capabilities of Microsoft compliance solutions 20-25%; 14 sub-areas and their bullets. Change log: only minor changes to "function and identity types of Microsoft Entra ID" and "threat protection with Microsoft Defender XDR". Passing score 700.

## Format
- **Microsoft Certified: Security, Compliance, and Identity Fundamentals** certification page (Last Updated 10/21/2026, page updated 2026-10-27), fetched 2026-11-16. https://learn.microsoft.com/en-us/credentials/certifications/security-compliance-and-identity-fundamentals/
  45 minutes, proctored, interactive components possible, first retake after 24 hours, 13 languages (English, Japanese, Chinese Simplified, Korean, French, Spanish, Portuguese (Brazil), Russian, Arabic (Saudi Arabia), Indonesian, German, Chinese Traditional, Italian), Pearson VUE or Certiport, price by country.
- **Credential retirement**, Microsoft Learn (updated 2026-11-13), fetched 2026-11-16. https://learn.microsoft.com/en-us/credentials/support/credential-retirement
  SC-900 is not listed as retiring in the next 12 months (only Microsoft 365 Administrator Expert, November 30, 2026, and D365 Supply Chain Management Functional Consultant Associate, February 1, 2027). The Azure Security Engineer Associate (AZ-500) is listed as retired on August 31, 2026.
- Question count: Microsoft publishes none. "40 to 60" is labelled "guides report" on the landing and in examFacts. Tigertest's tests are 50 in 45 minutes.

## Product docs used for facts (Microsoft Learn)
- Microsoft Sentinel, "Transition your Microsoft Sentinel environment to the Defender portal" (updated 2026-11-01): Sentinel available in the Defender portal, unified incident queue, Log Analytics back end, playbooks on Logic Apps, Fusion replaced by Defender XDR correlation. https://learn.microsoft.com/en-us/azure/sentinel/move-to-defender
- Microsoft Purview, "Learn about auditing solutions" (updated 2026-07-08): Audit (Standard) on by default, 180-day retention; Audit (Premium) retention policies, one year by default for Entra, Exchange, OneDrive, SharePoint, 10 years with add-on license (not retroactive), intelligent insights, higher API bandwidth. https://learn.microsoft.com/en-us/purview/audit-solutions-overview
- Microsoft Purview, "Learn about eDiscovery" (updated 2026-10-15): cases, holds, search statistics; premium features review sets, analytics, near-duplicate detection; retired compliance portal. https://learn.microsoft.com/en-us/purview/edisc
- Microsoft Purview, "Learn about retention policies and retention labels" (updated 2026-07-23): one retention label per item, labels can declare records and be auto-applied, principles of retention (retention wins over deletion, longest retention wins, explicit wins over implicit for deletions, shortest deletion period wins). https://learn.microsoft.com/en-us/purview/retention
- Microsoft Purview, "Compliance Manager scoring" (updated 2026-06-25): data protection baseline initial score, Microsoft actions vs improvement actions, point values 27/9/3/1/3/1, not a guarantee of compliance. https://learn.microsoft.com/en-us/purview/compliance-manager-scoring
- "Get started with the Microsoft Service Trust Portal" (updated 2026-04-06): audit reports, whitepapers, My Library notifications, restricted documents. https://learn.microsoft.com/en-us/compliance/assurance/stp-get-started
- Training unit "Describe Microsoft's privacy principles" (SC-900 learning path, updated 2026-10-28): four areas, you control your data, know where it is located, secured at rest and in transit (TLS, IPsec, up to AES-256), Microsoft defends your data and directs government requests to the customer. https://learn.microsoft.com/en-us/training/modules/describe-compliance-management-capabilities-microsoft/3-describe-microsofts-privacy-principles
- "Privacy and data management overview", Microsoft Service Assurance (updated 2026-09-01): no profiling or advertising use, no direct government access. https://learn.microsoft.com/en-us/compliance/assurance/assurance-privacy
- Microsoft Entra ID Protection, "What are risk detections?" (updated 2026-10-21): sign-in and user risk detections, real-time vs offline (leaked credentials offline; anonymous IP, atypical travel, unfamiliar sign-in properties real time), password spray, P2 for details. https://learn.microsoft.com/en-us/entra/id-protection/concept-identity-protection-risks
- Microsoft Entra ID Governance, "What is Privileged Identity Management?" (updated 2026-04-24): just-in-time, time-bound, approval, MFA, justification, notifications, access reviews, audit history, eligible vs active. https://learn.microsoft.com/en-us/entra/id-governance/privileged-identity-management/pim-configure
- "Password protection in Microsoft Entra ID" (updated 2026-02-13): global banned list (can't be disabled), custom list up to 1,000 terms, normalization, fuzzy matching, 5-point score, checked on change or reset, P1/P2 for custom list. https://learn.microsoft.com/en-us/entra/identity/authentication/concept-password-ban-bad
- "Workload identities", Microsoft Entra Workload ID (updated 2026-05-08): applications, service principals (local instance in a tenant), managed identities. https://learn.microsoft.com/en-us/entra/workload-id/workload-identities-overview
- "Azure DDoS Protection overview" (updated 2026-08-13): Network Protection and IP Protection tiers, IP Protection needs no plan and lacks rapid response, cost protection and WAF discounts; layers 3 and 4; layer 7 needs a WAF; default infrastructure protection. https://learn.microsoft.com/en-us/azure/ddos-protection/ddos-protection-overview
- Microsoft Defender for Cloud, "What is Cloud Security Posture Management (CSPM)" (updated 2026-09-30): Foundational CSPM free (asset inventory, MCSB, secure score, recommendations, workflow automation), Defender CSPM paid (attack path analysis, cloud security explorer, regulatory compliance assessments), Azure, AWS, GCP, Arc. https://learn.microsoft.com/en-us/azure/defender-for-cloud/concept-cloud-security-posture-management
- "Why do I need Microsoft Defender for Office 365?" (updated 2026-06-17): built-in protection (ZAP), Plan 1 (Safe Links, Safe Attachments, impersonation protection), Plan 2 (attack simulation training, Threat Explorer, campaigns, AIR). https://learn.microsoft.com/en-us/defender-office-365/mdo-about
- "Threat intelligence in Microsoft Defender" (updated 2026-09-23): Overview, Intel explorer, threat analytics reports, entity enrichment. https://learn.microsoft.com/en-us/defender-xdr/defender-threat-intelligence
- Further Microsoft Learn docs for standing product facts: Conditional Access overview, Microsoft Entra built-in roles (Password Administrator, Global Administrator, Global Reader), hybrid identity authentication methods (PHS, PTA, federation), Microsoft Entra Cloud Sync, Temporary Access Pass, network security groups (priority, default rules, stateful), Azure Bastion, Azure Firewall rule types and threat intelligence filtering, Azure Web Application Firewall, Azure Key Vault, Microsoft Defender for Endpoint, Defender for Cloud Apps, Defender for Identity, Defender Vulnerability Management, Purview sensitivity labels, DLP, records management, insider risk management.

## Left out on purpose
- No prices, licence costs or item counts that change. Licence tiers are stated only where Microsoft's page states them (custom banned list P1/P2, Conditional Access P1 or higher, ID Protection details P2, Audit Premium 10-year add-on).
- No date for the end of Microsoft Sentinel in the Azure portal: the transition page fetched does not state one.
- Microsoft's older six-item privacy principles list is not used; the current Learn unit uses four areas.
- Preview features are not asked.

## Blueprint (per 50-item test)
| Domain key | Study-guide sub-area(s) | Per test | Drill-only | Pool |
|---|---|---|---|---|
| sc900Concepts | Security and compliance concepts; identity concepts | 6 | 14 | 26 |
| sc900Identity | Entra ID function and identity types; authentication | 7 | 12 | 26 |
| sc900Access | Access management; identity protection and governance | 7 | 12 | 26 |
| sc900Infra | Core infrastructure security services in Azure | 6 | 13 | 25 |
| sc900CloudSec | Security management in Azure; Microsoft Sentinel | 6 | 13 | 25 |
| sc900Xdr | Threat protection with Microsoft Defender XDR | 7 | 12 | 26 |
| sc900Compliance | Service Trust Portal and privacy; compliance management; insider risk, eDiscovery and audit | 5 | 12 | 22 |
| sc900InfoProt | Information protection, data lifecycle management and data governance | 6 | 13 | 25 |

Concepts 6/50 (12%), Entra 14/50 (28%), security solutions 19/50 (38%), compliance solutions 11/50 (22%).

## Formats
Single (170), multi "Choose two" (8), yes/no statement sets as `matrix` with columns Yes/No (18, 36 Yes rows and 36 No rows), matching as `matrix` (5).
