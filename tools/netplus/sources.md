# CompTIA Network+ (netplus) sources

- CompTIA Network+ certification page (https://www.comptia.org/en-us/certifications/network/),
  checked 2026-10-30: exam code N10-009 (launched June 2024), maximum 90 questions, multiple choice and
  performance-based, 90 minutes, 720 on a 100 to 900 scale to pass, retirement "usually three years
  after launch, estimated 2027". No successor (N10-010) is announced on CompTIA's page.
  Domains: 1.0 Networking Concepts 23%, 2.0 Network Implementation 20%, 3.0 Network Operations 19%,
  4.0 Network Security 14%, 5.0 Network Troubleshooting 24%.
- CompTIA Network+ N10-009 exam objectives (2024), the objective list 1.1 to 5.5 and its acronym and
  port list (FTP 20/21, SSH/SFTP 22, Telnet 23, SMTP 25, DNS 53, DHCP 67/68, TFTP 69, HTTP 80, NTP 123,
  SNMP 161/162, LDAP 389, HTTPS 443, SMB 445, syslog 514, LDAPS 636, SQL Server 1433, RDP 3389,
  SIP 5060/5061). Items avoid keying on CompTIA's listing of SMTPS as 587, which is disputed.
- Standards and RFCs for facts: RFC 1918 (private IPv4), RFC 6598 (100.64.0.0/10 shared space),
  RFC 3927 (IPv4 link-local), RFC 7348 (VXLAN, UDP 4789, 24-bit VNI), RFC 8915 (NTS),
  RFC 6146/6147 (NAT64/DNS64), IEEE 1588 (PTP), IEEE 802.1Q, 802.1X, 802.3 (100 m twisted pair),
  802.11a/b/g/n/ac/ax and Wi-Fi 6E (6 GHz), TIA-568 (Cat 6a rated for 10GBASE-T to 100 m; Cat 6 about 55 m).

Fee: not used in items. CompTIA's own page does not list it; third-party sources quote about 390 USD
(US store, 2026) with resellers lower, so the facts block says "about 390 USD" only if the integrator
confirms it on store.comptia.org.

Blueprint per 90-item test: netModels 11 and netInfra 10 (1.0, 21), netSwitchRoute 11 and netWireless 7
(2.0, 18), netOps 17 (3.0), netSecurity 13 (4.0), netTroubleMethod 10 and netTroubleServices 11 (5.0, 21).
3 drill-only items per domain (24). 204 items in all. PBQs approximated by matrix (9) and order (3)
items; 6 typed numeric items (ports, subnet, MTBF, transfer time); 13 "Choose two".

Originality: written for Tigertest from the objectives. Scanned against the Security+, A+, CCNA and
AWS SAA banks by token overlap; the closest A+ items (methodology order, connector matrix, toner,
plenum, RFC 1918, hybrid cloud) were rewritten from a different angle, and the top remaining overlap
is topic-level only.
