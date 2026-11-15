# Sources for `fortinse` (Fortinet NSE 1 - Cybersecurity and Cloud Fundamentals, formerly FCF)

All 200 questions are original, written by Tigertest from the published course agendas and
objectives below and from the primary standards they rest on (NIST, FIPS, OWASP). No Fortinet
course quiz, exam item, dump, official sample or commercial practice question was used.
Checked 2026-11-15.

## What the exam is today (watch first)
- Fortinet, "NSE Certification Program Updates 2026", https://www.fortinet.com/nse-training-update
  (fetched 2026-11-15): effective July 15, 2026 the NSE program moved from five levels to eight.
  NSE 1 requirement: "Complete the online course Cybersecurity and Cloud Fundamentals". NSE 2:
  "Complete the online course Introduction to Next Generation Firewall". Transition: "FCF active
  certifications: You will be awarded NSE 1 and 2 certifications". NSE 1 renews by completing the
  course. All certifications valid two years. So Fortinet Certified Fundamentals (FCF) in
  Cybersecurity no longer exists as a certification to earn; NSE 1 is its successor.
- Fortinet Training Institute, "NSE 1 in Cybersecurity",
  https://training.fortinet.com/local/staticpage/view.php?page=nse_1 (fetched 2026-11-15):
  "To achieve this certification, you must pass the NSE 1 - Cybersecurity and Cloud Fundamentals
  online exam presented at the end of the course." Active for 2 years from the course date. The
  description repeats FCF's: validates the knowledge "required for any entry-level job role in
  cybersecurity". No question count, time limit or pass mark is given.
- Fortinet Training Institute, "Cybersecurity and Cloud Fundamentals" course page,
  https://training.fortinet.com/local/staticpage/view.php?page=library_cybersecurity-and-cloud-fundamentals
  (fetched 2026-11-15). Agenda, the outline this bank follows module for module: Intro to
  Cybersecurity; Threat Landscape; Social Engineering; Malware; Cryptography and the Public Key
  Infrastructure; Secure Networking; Authentication and Access Control; Endpoint Security; Secure
  Data and Applications; Cloud Security and Virtualization. Objectives: bad actors, methods and
  countermeasures; securing a network with cryptography and endpoint security; authentication and
  host hardening; firewalls, web application firewalls and network access control; securing
  on-premises, virtual and cloud networks. Self-paced, about 11 hours, free. Its PDF brochure
  (nseti-pdfs.s3.us-west-2.amazonaws.com/Cybersecurity_and_Cloud_Fundamentals.pdf) returned 403.
- Fortinet Training Institute, "Introduction to Next Generation Firewall" course page (NSE 2),
  https://training.fortinet.com/local/staticpage/view.php?page=library_introduction-to-next-generation-firewall
  (fetched 2026-11-15): agenda NGFW, firewall policies, user authentication, blocking malware, web
  filtering, IPS and application control, connecting locations, secure SD-WAN, SASE, about 2 hours.
  Not modelled as its own exam (Tigertest's `fortigate` bank covers FortiGate in depth); the
  landing says so.

## The FCF it replaced (for the landing's history line)
- Fortinet Training Institute, "Fortinet Certified Fundamentals Cybersecurity",
  https://training.fortinet.com/local/staticpage/view.php?page=fcf_cybersecurity (fetched
  2026-11-15): banner "As of July 15, 2026, the Fortinet NSE Certification program will change from
  five to eight certification levels"; FCF required the Introduction to the Threat Landscape exam
  plus either Getting Started in Cybersecurity or Technical Introduction to Cybersecurity, "online
  exams presented at the end of the course"; active two years.
- Fortinet course descriptions dated 4/24/2025, fetched 2026-11-15:
  https://nseti-pdfs.s3.us-west-2.amazonaws.com/Introduction_to_the_Threat_Landscape.pdf
  (3.0: Introduction to Cybersecurity, The Threat Landscape, Social Engineering, Malware),
  https://nseti-pdfs.s3.us-west-2.amazonaws.com/Technical_Introduction_to_Cybersecurity.pdf
  (2.0: Cryptography and PKI, Secure Network, Authentication and Access Control, Secure Remote
  Access, Endpoint Security, Secure Data and Applications, Cloud Security and Virtualization),
  https://nseti-pdfs.s3.us-west-2.amazonaws.com/Getting_Started_in_Cybersecurity.pdf
  (3.0: firewall, NAC, sandbox, WAF, SEG, content filters, secure Wi-Fi, endpoint hardening and
  monitoring, SOAR, SIEM, SD-WAN, ZTNA, cloud service models, SASE). The NSE 1 agenda is the
  Threat Landscape course plus the Technical Introduction, so FCF learners meet the same topics.

## Standards the facts were written from
- NIST SP 800-145, The NIST Definition of Cloud Computing, https://csrc.nist.gov/pubs/sp/800/145/final
  (fetched 2026-11-15): five essential characteristics, IaaS/PaaS/SaaS, private, community, public
  and hybrid clouds.
- NIST SP 800-63B-4, Authentication and Authenticator Management,
  https://csrc.nist.gov/pubs/sp/800/63/b/4/final (fetched 2026-11-15): length over composition, no
  forced periodic changes, screening against compromised passwords, phishing-resistant
  authenticators.
- NIST SP 800-83 Rev. 1, Guide to Malware Incident Prevention and Handling,
  https://csrc.nist.gov/pubs/sp/800/83/r1/final (fetched 2026-11-15): malware categories.
- FIPS 197, Advanced Encryption Standard, https://csrc.nist.gov/pubs/fips/197/final (fetched
  2026-11-15): 128, 192 and 256-bit keys.
- NIST SP 800-207, Zero Trust Architecture, https://csrc.nist.gov/pubs/sp/800/207/final (fetched
  2026-11-15).
- NIST SP 800-41 Rev. 1, Guidelines on Firewalls and Firewall Policy,
  https://csrc.nist.gov/pubs/sp/800/41/r1/final (fetched 2026-11-15): packet filters, stateful
  inspection, application firewalls, default deny.
- NIST SP 800-88 Rev. 2, Guidelines for Media Sanitization,
  https://csrc.nist.gov/pubs/sp/800/88/r2/final (fetched 2026-11-15): clear, purge, destroy.
- NIST SP 800-52 Rev. 2, TLS guidelines, https://csrc.nist.gov/pubs/sp/800/52/r2/final (fetched
  2026-11-15).
- NIST SP 800-125, Full Virtualization Technologies, https://csrc.nist.gov/pubs/sp/800/125/final
  (fetched 2026-11-15): hypervisors, VM isolation, VM escape and sprawl.
- NIST glossary, confidentiality, https://csrc.nist.gov/glossary/term/confidentiality (fetched
  2026-11-15), for the CIA definitions.
- OWASP Top 10, https://owasp.org/www-project-top-ten/ (fetched 2026-11-15): broken access control,
  injection, cross-site scripting.

## Could not be confirmed, and how the copy words it
- Question count, time limit, question format and pass mark of the NSE 1 online exam (and of the
  old FCF course exams): Fortinet publishes none. The 40 questions in 60 minutes and the 80 percent
  goal are Tigertest's, said so in `scoreNote`, the landing and the facts block.
- The new NSE 1 course brochure PDF returned 403; the agenda and objectives come from the course
  page itself.

## Left out on purpose
- Fortinet product configuration (FortiGate, FortiSASE settings), which belongs to `fortigate`.
- Fees, prices, CVE numbers, named breaches and current affairs.
- Anything about the exam itself.

## Overlap checks
- Stems compared with data/fortigate-questions.json, data/v2/secplus/questions.json and
  data/v2/cysa/questions.json by sequence similarity; the four closest (NAC health check,
  tokenization, an emailed spreadsheet, a bank fraud-team call) were rewritten from another angle.

## Blueprint
Per 40-question test: 4 from each of the ten modules (Tigertest's even split; Fortinet publishes
no weights). 12 drill-only items per module, 200 in all. Seven drills: Security Basics and Threats
(Intro + Threat Landscape), Social Engineering and Malware, Cryptography and PKI, Secure
Networking, Authentication and Access, Endpoint Security, Data, Apps and Cloud.

Rebuild with `python3 -I tools/next100/fortinse/build.py`; validate with
`python3 -I tools/validate_v2_bank.py fortinse '{"1": {"fcf": {"1": 40}}, "2": {"fcf": {"1": 40}}}'`.
