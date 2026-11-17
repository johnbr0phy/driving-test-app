# EC-Council Certified Ethical Hacker (ceh) sources

All 200 questions are original, written for Tigertest from the official CEH
exam blueprint and from primary standards. No EC-Council courseware, sample
questions, practice tests or prep-book items were read or reworded.

## Outline (the official blueprint)

- EC-Council, CEH Exam Blueprint v5.0
  (https://cert.eccouncil.org/wp-content/uploads/2024/04/CEH-Exam-Blueprint-v5.pdf),
  fetched 2026-11-16 and read in full. Nine domains with weights and question
  counts per sub-domain (125 in all): 1 Information Security and Ethical
  Hacking Overview 6% (Introduction to Ethical Hacking 7); 2 Reconnaissance
  Techniques 17% (Footprinting and Reconnaissance 7, Scanning Networks 7,
  Enumeration 7); 3 System Hacking Phases and Attack Techniques 15%
  (Vulnerability Analysis 6, System Hacking 6, Malware Threats 7); 4 Network
  and Perimeter Hacking 24% (Sniffing, Social Engineering, Denial-of-Service,
  Session Hijacking, Evading IDS, Firewalls and Honeypots, 6 each); 5 Web
  Application Hacking 14% (Hacking Web Servers, Hacking Web Applications, SQL
  Injection, 6 each); 6 Wireless Network Hacking 5% (6); 7 Mobile Platform,
  IoT, and OT Hacking 10% (Hacking Mobile Platforms 6, IoT and OT Hacking 6);
  8 Cloud Computing 5% (6); 9 Cryptography 5% (6). Every item is written to
  a bullet on this blueprint.
- EC-Council, Certified Ethical Hacker certification page
  (https://cert.eccouncil.org/certified-ethical-hacker.html), fetched
  2026-11-16: exam title Certified Ethical Hacker, code 312-50, 125
  questions, 4 hours, multiple choice, not open book, ECC Exam Centre and
  Pearson VUE delivery, cut scores 60% to 85% depending on the exam form;
  links the blueprint above and the handbook below.
- EC-Council, CEH course page
  (https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/),
  fetched 2026-11-16: "Currently on Version 13" (CEH v13, branded CEH AI),
  new versions every 12 to 18 months, no successor version or date announced;
  knowledge exam 125 MCQ in 4 hours, pass 60% to 85%; the optional CEH
  Practical (20 challenges, 6 hours, iLabs) leads to CEH Master.

## Format and policy (candidate handbook)

- EC-Council, CEH Candidate Handbook (file CEH-Handbook-v7.1.pdf, pages headed
  Candidate Handbook v7.3)
  (https://cert.eccouncil.org/images/doc/CEH-Handbook-v7.1.pdf), fetched
  2026-11-16: 4 hours, 125 multiple choice questions, ANAB-accredited under
  ISO 17024, the nine domains listed above; cut scores set per form by a
  standard-setting panel ("Scores vary from one exam to another"); eligibility
  by official training or two years of InfoSec experience; credential valid
  three years, renewed with 120 ECE/CPE credits; retake policy (no wait for
  the first retake, 14 days before the second, third and fourth, then 12
  months after the fifth attempt); vouchers valid one year.

## Standards and primary references for facts

- NIST SP 800-115, Technical Guide to Information Security Testing and
  Assessment (https://csrc.nist.gov/pubs/sp/800/115/final), checked
  2026-11-16: testing phases, scanning, vulnerability validation, rules of
  engagement.
- OWASP Top 10 2021 (https://top10.owasp.org/2021), fetched 2026-11-16:
  A01 Broken Access Control, A02 Cryptographic Failures, A03 Injection (a
  2025 edition is published as a release candidate; items name the 2021 list).
- OWASP Mobile Top 10 2024
  (https://raw.githubusercontent.com/OWASP/www-project-mobile-top-10/master/index.md),
  fetched 2026-11-16: M1 Improper Credential Usage through M10 Insufficient
  Cryptography.
- RFC 9293 (TCP, replacing RFC 793) for handshake, flags and the RST answer of
  a closed port (https://www.rfc-editor.org/rfc/rfc9293); RFC 768 (UDP) and
  RFC 792 (ICMP, port unreachable type 3 code 3); IANA service names and port
  numbers registry for every port asked
  (https://www.iana.org/assignments/service-names-port-numbers/).
- MITRE ATT&CK (https://attack.mitre.org/) for tactics and techniques, the
  Lockheed Martin Cyber Kill Chain phases (lockheedmartin.com returned 403 to
  automated reads; the seven phases are the published model's), and the
  Diamond Model of intrusion analysis (Caltagirone, Pendergast and Betz, 2013).
- Wi-Fi Alliance WPA3 specification (SAE) and Wi-Fi Enhanced Open (OWE, RFC 8110), the KRACK disclosure
  (https://www.krackattacks.com/), and IEEE 802.11 for wireless items.
- NIST FIPS 197 (AES), FIPS 46-3 (DES, withdrawn), RFC 6960 (OCSP) and RFC 6066
  (TLS certificate status request, the basis of OCSP stapling) for
  cryptography items.

## Not modelled or left out

- The CEH Practical (hands-on, 20 challenges) is not modelled.
- No fees, voucher prices, eligibility fees or exam-admin facts in questions.
- No working exploit payloads or injection strings: every item asks what a
  technique is, what a result means or which defence fits, framed as
  authorised testing.
- EC-Council publishes no fixed pass mark (60% to 85% by form), so the app's
  80% goal is Tigertest's readiness line.

## Originality and overlap

Each stem was checked against the pentestplus, secplus, cysa and cissp v2
banks (and netplus, aplus, sc900, fortinse) for a repeated fact and answer
with a similar stem; about 30 items were rewritten to a different fact or angle.

Rebuild: `python3 -I tools/next100/ceh/build.py`. Validate:
`python3 -I tools/validate_v2_bank.py ceh '{"1": {"ceh": {"1": 80}}, "2": {"ceh": {"1": 80}}}'`.
