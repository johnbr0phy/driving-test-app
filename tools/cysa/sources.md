# CompTIA CySA+ (cysa) sources

- CompTIA CySA+ certification page (https://www.comptia.org/en-us/certifications/cybersecurity-analyst/)
  and published summaries of the CS0-004 objectives, checked 2026-11-03: CS0-004 launched June 23, 2026;
  English CS0-003 retires December 22, 2026 (Japanese, Portuguese and Spanish March 23, 2027).
  Maximum 85 questions, multiple choice and performance-based, 165 minutes, 750 on a 100 to 900 scale.
  Domains: 1.0 Security Operations 34%, 2.0 Vulnerability Management 26%, 3.0 Incident Response and
  Management 24%, 4.0 Reporting and Communication 16% (CS0-003 was 33/30/20/17).
  Third-party summaries used: pocketprep.com, certinstructor.org, examsdigest.com, getcertified4less.com.
- Standards for facts: FIRST CVSS v4.0 (Nov 2023) and v3.1, FIRST EPSS, CISA Known Exploited
  Vulnerabilities catalog, NIST SP 800-61 Rev. 3 (April 2025, mapped to CSF 2.0), NIST SP 800-86,
  RFC 3227 (order of volatility), MITRE ATT&CK, the Diamond Model, Lockheed Martin Cyber Kill Chain,
  OWASP Top 10 and Testing Guide, OSSTMM, STIX 2.1 and TAXII 2.1, RFC 7208 (SPF), 6376 (DKIM), 7489 (DMARC).

Fee: not used in items or the facts block.

Blueprint per 85-item test: cysaSecArch 15 and cysaThreat 14 (1.0, 29), cysaVulnScan 11 and
cysaVulnPrior 11 (2.0, 22), cysaIrFrame 10 and cysaIrHandle 10 (3.0, 20), cysaVulnReport 7 and
cysaIrReport 7 (4.0, 14). 3 drill-only items per domain (24). 194 items in all. PBQs approximated by
matrix and order items and log excerpts in monospace.

Originality: written for Tigertest from the objectives; each writer checked its stems against the
Security+ sources (tools/secplus) and took the analyst's angle where a topic overlaps.

Writers: tools/cysa/BRIEF.md. Rebuild with `python3 -I tools/cysa/build.py`, validate with
`python3 -I tools/validate_v2_bank.py cysa '{"1": {"cysa": {"1": 85}}, "2": {"cysa": {"1": 85}}}'`.
