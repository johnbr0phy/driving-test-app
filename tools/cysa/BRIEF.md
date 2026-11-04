# CySA+ CS0-004 source-writing brief (for the domain writers)

Write `tools/cysa/<domain>.py`, each defining `ITEMS = [...]` built with `tools/cysa/helpers.py`
(`single`, `multi`, `numeric`, `order`, `matrix`; read its docstring). Model: `tools/netplus/netOps.py`.
Exam: CompTIA CySA+ CS0-004 (launched June 23, 2026; up to 85 questions in 165 minutes, 750/900),
domains 1.0 Security Operations 34%, 2.0 Vulnerability Management 26%, 3.0 Incident Response and
Management 24%, 4.0 Reporting and Communication 16%. Analyst-level, scenario-first items.

## Counts per domain file (test 1 / test 2 / drill-only test 0)
- cysaSecArch 15/15/3: system and network architecture for security ops (log ingestion, time sync,
  OS/registry/file system concepts, segmentation, zero trust, SASE, cloud/hybrid/serverless/containers,
  IAM, MFA, SSO, PAM, CASB, encryption/PKI basics, data loss prevention, SOAR and automation
  (scripting, APIs, JSON/regex reading at concept level), AI/ML use and risks in the SOC).
- cysaThreat 14/14/3: indicators of malicious activity (network: beaconing, unusual ports, scans,
  rogue devices, bandwidth; host: processor/memory/drive anomalies, unauthorized software or
  privileges, registry changes, scheduled tasks; application: anomalous activity, new accounts,
  service interruption; social engineering, obfuscated links), tools (SIEM, EDR, packet capture with
  Wireshark/tcpdump, DNS/IP reputation, WHOIS, sandboxing, file hashing, email header analysis: SPF,
  DKIM, DMARC), threat intelligence (actor types, TTPs, confidence, collection, sources: OSINT,
  ISACs, STIX/TAXII), and threat hunting.
- cysaVulnScan 11/11/3: scanning methods and concepts (asset discovery, credentialed vs not, agent vs
  agentless, active vs passive, internal/external, static vs dynamic analysis, fuzzing, OT/ICS/SCADA
  considerations, PCI and CIS benchmarks), tools (Nmap, Nessus, OpenVAS, Burp Suite, ZAP, Nikto,
  Metasploit, Prowler/ScoutSuite, debuggers), and analyzing output (false positives/negatives).
- cysaVulnPrior 11/11/3: CVSS v4.0 and v3.1 metrics, EPSS, CISA KEV, prioritization (exploitability,
  asset value, zero-day), web/app vulnerabilities and fixes (XSS, SQLi, CSRF, SSRF, overflow, IDOR,
  broken access control, insecure deserialization, LFI/RFI, path traversal, race condition,
  misconfiguration, data poisoning/prompt injection for AI apps), controls (compensating, preventive,
  detective...), patching, change management, risk responses (accept, transfer, avoid, mitigate),
  SDLC, threat modeling, attack surface management, bug bounty.
- cysaIrFrame 10/10/3: attack methodology frameworks (Cyber Kill Chain, Diamond Model, MITRE ATT&CK,
  OSSTMM, OWASP Testing Guide), IR lifecycle (NIST SP 800-61 Rev. 3, April 2025, maps IR to CSF 2.0
  Govern/Identify/Protect/Detect/Respond/Recover; also the classic preparation, detection and
  analysis, containment/eradication/recovery, post-incident phases), preparation (playbooks, IR plan,
  tabletop exercises, training, BCP/DR), roles.
- cysaIrHandle 10/10/3: detection and analysis (IoCs, evidence acquisition, chain of custody,
  order of volatility, legal hold, data integrity with hashes, preservation), containment
  (isolation, segmentation), eradication and recovery (reimaging, sanitization, restoring, compensating
  controls), scope and impact, cloud and container incident specifics.
- cysaVulnReport 7/7/3: vulnerability management reporting (prioritized findings, affected hosts,
  risk score, mitigation, recurrence, compliance reports, action plans), metrics and KPIs (time to
  remediate, SLA, top 10), stakeholder identification and communication, inhibitors to remediation
  (MOUs, SLAs, organizational governance, business process interruption, degrading functionality,
  legacy and proprietary systems).
- cysaIrReport 7/7/3: IR reporting (executive summary, who/what/when/where/why, timeline, impact,
  recommendations), communication (legal, PR, customers, media, regulators, law enforcement), lessons
  learned and root cause analysis, metrics (MTTD, MTTR, mean time to respond, alert volume).

Every file needs the right counts: the build checks them. Spread difficulty 1 to 3 (mostly 2).

## Formats (per domain file, roughly)
Mostly `single`, four options. About 1 in 8 items `multi` with `(Choose two.)` in the stem
(n=2). One or two `matrix` items per test where it fits (classify findings, map tool to task, map
IoC to type) and one `order` per two files (order of volatility, IR phases). `numeric` only where a
single whole number is natural (e.g. hours to SLA deadline, count of hosts); stem ends
"Type the number only." Logs, headers and command output: use `cli(...)` (monospace block, no single
quotes or backticks inside) on its own line in the stem, `cmd(...)` inline.

## House style (strict)
- Key listed first in the options (build shuffles). Write the key short, then three wrong options of
  the SAME shape and length. The key may be the strictly longest option in at most 1 in 5 single
  items in your file; aim for under 15%. When a key needs a qualifier, give distractors one too.
- Options are phrases, not sentences, usually 2 to 10 words. No "all/none of the above", no
  "both", no options referring to other options, no letter references in explanations.
- Distractors are plausible analyst mistakes (wrong phase, the adjacent tool, the control of the
  wrong type), never jokes.
- Stems self-contained, end in "?" or ":". Scenario first ("An analyst sees..."), then the ask.
- Explanations 1 to 3 sentences: why the key is right, why the most tempting wrong option is wrong.
- Plain ASCII apostrophes and quotes only: no em dashes, en dashes or curly quotes anywhere.
- Never ask about the exam itself (length, pass mark, booking). No prices.
- Facts current as of November 2026. Do not invent CVE numbers or real company incidents; use
  fictional hosts (10.x addresses, example.com, contoso-style names are fine).
- Original: before finishing, grep `tools/secplus/*.json` for your topics and make sure no stem is a
  near copy of a Security+ item; take a different angle (CySA+ is the analyst's view).

## Check
`cd tools/cysa && python3 -I build.py --check <domain>` must print no ERROR and a key-longest share
under 20%. Then report: file name, item count, format mix, key-longest %, and any facts you were
unsure of. Do not run the full build and do not edit other files.
