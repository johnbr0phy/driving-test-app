# CompTIA Tech+ sources

Every question in `data/v2/techplus/questions.json` is original, written for Tigertest from the
exam objectives and the standards pages below. No CompTIA CertMaster item, official sample
question, past exam item, prep provider question, "brain dump" or leaked material was used or
reworded. The objectives document lists topics only (no questions), and the bank was written
from those topic bullets.

## Exam outline (objectives)

- CompTIA Tech+ FC0-U71 V6 Certification Exam Objectives, Document Version 4.0 (PDF, printed Dec 2024)
  https://lecbyo.files.cmp.optimizely.com/download/1e77e02ebef111efbcf946d2fe8fe33a
  fetched 2026-11-23 (16 pages, read in full). Domains: 1.0 IT Concepts and Terminology 13%,
  2.0 Infrastructure 24%, 3.0 Applications and Software 18%, 4.0 Software Development Concepts
  13%, 5.0 Data and Database Fundamentals 13%, 6.0 Security 19%. Objectives 1.1 to 1.5 (basics
  of computing, notational systems, units of measure, troubleshooting methodology, computing
  devices), 2.1 to 2.9 (internal components, storage types, peripherals, I/O interfaces,
  virtualization and cloud, internet service types, networking concepts, small wireless
  networks), 3.1 to 3.5 (OS components, purpose of operating systems, software, web browser
  features, uses of AI), 4.1 to 4.4 (language categories, data types, programming concepts,
  organizational techniques and logic), 5.1 to 5.4 (value of data, database concepts,
  database structures, backups), 6.1 to 6.5 (CIA, privacy, AAA and non-repudiation, securing
  devices and best practices, passwords, encryption use cases, small wireless network
  security). Every bullet was read and mapped to the nine drill domains. Also gives the test
  details: maximum of 70 questions, multiple choice, 60 minutes, passing score 650, recommended
  for high school students or non-IT professionals, plus the acronym list.
- CompTIA Tech+ certification page
  https://www.comptia.org/en-us/certifications/tech/
  fetched 2026-11-23. Exam codes FC0-U71 (no expiration) and FC0-U71-CE (valid for 5 years), maximum of 70 questions,
  multiple choice, 60 minutes, passing score 650 on a scale of 900, English and Japanese,
  domain weights as in the objectives, "no prior experience necessary". No retirement date or
  newer version announced on the page.

## Exam history

- CompTIA IT Fundamentals (ITF+) page
  https://www.comptia.org/certifications/it-fundamentals
  checked 2026-11-23 via search extract: ITF+ FC0-U61 launched September 4, 2018 and retired
  July 31, 2025 for English, Vietnamese and Chinese (Japanese November 24, 2025); Tech+
  (FC0-U71) replaced it, launched July 16, 2024 (the certification page lists V6 with that
  launch date). The landing says ITF+ was retired and replaced by Tech+.

## Standards and primary references used for facts

- IEEE 802.11 Working Group, Official IEEE 802.11 Working Group Project Timelines
  https://www.ieee802.org/11/Reports/802.11_Timelines.htm
  fetched 2026-11-23: 802.11n "High Throughput" (2009), 802.11ac "Very High Throughput < 6 GHz"
  (2013), 802.11ax "High Efficiency WLAN" (2021), 802.11be (2024). Used for older vs newer
  standards and that 802.11ac is below 6 GHz.
- Wi-Fi Alliance, Wi-Fi CERTIFIED 6
  https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-6
  fetched 2026-11-23: Wi-Fi 6 added operation in the 6 GHz band to the 2.4 GHz and 5 GHz bands
  of earlier generations; OFDMA shares channels for efficiency.
- Wi-Fi Alliance, Security
  https://www.wi-fi.org/discover-wi-fi/security
  fetched 2026-11-23: WPA3 is mandatory for Wi-Fi CERTIFIED devices, WPA3-Personal adds
  protection from password guessing, WPA3 networks disallow outdated legacy protocols, Wi-Fi
  Enhanced Open encrypts open networks with no passphrase.
- NIST SP 800-63B-4, Digital Identity Guidelines: Authentication and Authenticator Management
  https://pages.nist.gov/800-63-4/sp800-63b.html
  fetched 2026-11-23: passwords of at least 15 characters as a single factor (8 when used with
  MFA), allow at least 64, no composition rules, no periodic expiration without evidence of
  compromise, blocklists of common and breached passwords, allow password managers and paste,
  no hints or security questions. Password items follow these rules; the bank never asserts
  forced expiration or composition rules as best practice.
- NIST CSRC Glossary, non-repudiation
  https://csrc.nist.gov/glossary/term/non_repudiation
  fetched 2026-11-23: protection against an individual falsely denying having performed an
  action; digital signatures provide it.

## What could not be confirmed and how the copy words it

- Exam price: not shown on the certification page; left out.
- Validity: the certification page gives FC0-U71 "no expiration" and FC0-U71-CE five years;
  the landing repeats only that.
- The Wi-Fi Alliance generational naming guide PDF needs a sign-in; Wi-Fi 4/5/6 naming is not
  asked beyond what the Wi-Fi 6 page states.

## Left out on purpose

- Storage unit questions never rely on 1,000 versus 1,024 (both are in use); they ask only
  bits versus bytes and the order of the units.
- No prices, vendor product versions, or features that change often.
- No question about the test itself (count, time, pass mark).
