# CCNA 200-301 sources

Checked 2026-10-30.

- **Cisco CCNA 200-301 exam topics v1.1** (Implementing and Administering Cisco Solutions). The live blueprint
  since August 20, 2024 and through **February 2, 2027**. Six domains: 1.0 Network Fundamentals 20%,
  2.0 Network Access 20%, 3.0 IP Connectivity 25%, 4.0 IP Services 10%, 5.0 Security Fundamentals 15%,
  6.0 Automation and Programmability 10%. v1.1 added 6.4 AI (generative and predictive) and machine learning in
  network operations and replaced Puppet and Chef with Ansible and Terraform (6.6).
  https://learningnetwork.cisco.com/s/ccna-exam-topics
- **Cisco CCNA 200-301 v2.0 exam topics** (PDF dated May 14, 2026; announced at Cisco Live, May 2026):
  https://learningcontent.cisco.com/documents/marketing/exam-topics/200-301_CCNA_v2.0_Exam_Topics_PDF.pdf
  First test date **February 3, 2027** (Cisco Learning blog, "Stay on track: get certified before the CCNA refresh",
  https://blogs.cisco.com/learning/stay-on-track-get-certified-before-the-ccna-refresh). Same code and 120 minutes,
  five domains: 1.0 Network Infrastructure and Connectivity 25%, 2.0 Switching and Network Access 25%,
  3.0 IP Routing 20% (adds OSPFv3, drops GLBP), 4.0 Network Services and Security 20% (adds SFTP/SCP, storm control,
  RA guard), 5.0 AI, and Network Operations and Management 10% (agentic AI, prompt selection, Ansible, SNMP, syslog).
  Terraform, QoS, NTP, TFTP/FTP and WPA3 detail are not listed. This bank follows v1.1; most items (subnetting,
  VLANs, STP, routing tables, OSPFv2, NAT, ACLs, L2 security, DHCP, DNS, syslog, SNMP, Ansible) are in both.
  When v2.0 goes live, re-weight to its five domains and retire or replace the v1.1-only items (QoS, NTP,
  Terraform, GLBP).
- Exam format: 120 minutes; Cisco does not publish the item count or a passing score (candidates report about
  100 to 120 items); items are multiple choice single and multiple answer, drag-and-drop, and simulations; no going
  back to a previous item. Certification valid 3 years.
- Protocol facts were written from the RFCs and Cisco IOS behavior: RFC 1918 (private IPv4), RFC 4291 (IPv6
  addressing, modified EUI-64), RFC 4862 (SLAAC), RFC 2328 (OSPFv2), RFC 5798 (VRRP v3), RFC 5424 (syslog
  severities), RFC 2474/3246/2597 (DSCP, EF, AF), IEEE 802.1Q, 802.1w, 802.1AB (LLDP), 802.3ad/802.1AX (LACP),
  802.1X, Wi-Fi Alliance WPA3 (SAE).

All 224 items are original. Monospace CLI output is rendered with KaTeX `\texttt` (helpers `cmd()` and `cli()` in
`tools/ccna/helpers.py`), since RichText has no code block.
