# Cisco CCST Networking (ccst) sources

Every question in `data/v2/ccst/questions.json` is original, written for Tigertest from the exam
objectives and the standards pages below. No Cisco sample question, Networking Academy quiz,
Packet Tracer activity, Official Cert Guide item, past exam item, prep provider question or leaked
material was used or reworded. The objective documents list topics only (no questions). Cisco publishes no public question
catalogue for CCST Networking, so there was nothing to run a catalogue similarity check against.
The bank was checked by stem token overlap and shared key against the ccna, netplus, aplus,
techplus, jncia, isc2cc, secplus, linuxplus and ccnpencor banks; 27 items that repeated a fact and
answer there (IPv6 length, /20 mask, /21 and /28 host counts, DNS name resolution, WAN, ipconfig /all,
phishing email, single-mode distance, OSI order, unknown-unicast flooding, VLAN purpose and others)
were rewritten from a different angle.

## Exam outline (objectives)

- Cisco: 100-150 CCST Networking exam page
  https://www.cisco.com/site/us/en/learn/training-certifications/exams/ccst-networking.html
  fetched 2026-11-23. Exam code 100-150, 50 minutes, languages English, Arabic, Chinese, Spanish,
  French, Japanese, Portuguese; "validates an individual's skills and knowledge of entry-level
  networking concepts and topics"; a first step toward CCNA. Links the exam topics on the Cisco
  Learning Network (https://learningnetwork.cisco.com/s/ccst-networking-exam-topics), which did not
  render for an automated reader (client-side page). No newer version or retirement announced.
- Cisco training overview: Cisco Certified Support Technician (CCST) Networking (PDF, (c) 2024 Cisco)
  https://www.cisco.com/c/dam/en_us/training-events/training/courses/ccst-networking.pdf
  fetched 2026-11-23, read in full. Lists the 23 objectives, word for word the exam topic headings:
  building blocks of networks, bandwidth and throughput, LAN/WAN/MAN/CAN/PAN/WLAN, cloud and
  on-premises, common applications and protocols, private and public addresses, IPv4 addresses and
  subnet formats, IPv6 addresses and prefix formats, cables and connectors, Wi-Fi, cellular and wired,
  endpoint devices, connectivity on Windows, Linux, Mac OS, Android and iOS, status lights, cabling
  from a diagram, ports on network devices, basic routing, basic switching, troubleshooting and help
  desk practice, Wireshark capture, diagnostic commands, ways to access devices, show commands,
  firewalls, foundational security concepts, home router wireless security (WPAx). States the exam
  is 50 minutes.
- Certiport: Cisco Certified Support Technician Networking objective domains (Spanish edition, (c) 2023
  Certiport, Inc., 3 pages), as hosted by a Certiport partner
  https://www.pue.es/pue-academy/certiport/examenes/objetivos/ccst-networking/es
  fetched 2026-11-23, read in full. Gives the numbering and the bullet detail under each objective:
  1. Standards and Concepts (1.1 to 1.5: TCP/IP and OSI models, frames and packets, addressing;
  latency, delay and speed test vs iperf; physical and logical topologies; public, private, hybrid,
  SaaS, PaaS, IaaS, remote and hybrid work; TCP vs UDP, FTP, SFTP, TFTP, HTTP, HTTPS, DHCP, DNS, ICMP,
  NTP), 2. Addressing and Subnet Formats (2.1 to 2.3: address classes, NAT; subnet concepts, subnet
  calculator, slash notation, subnet mask, broadcast domain; IPv6 address types and prefixes),
  3. Endpoints and Media Types (3.1 to 3.4: fiber, copper, twisted pair, coaxial, RJ-45, RJ-11, fiber
  connectors; interference, 802.11 unlicensed 2.4, 5 and 6 GHz, licensed cellular; IoT, computers,
  mobile, IP phones, printers, servers; OS network utilities and wireless client settings SSID,
  authentication, WPA mode), 4. Infrastructure (4.1 to 4.5: link light colour and blinking or solid;
  patch cables, switches and routers, small topologies, power, rack layout; console, serial, fiber,
  Ethernet, SFP, USB, PoE ports; default gateway, layer 2 vs layer 3 switches, local vs remote network;
  MAC address tables, MAC address filtering, VLANs), 5. Diagnosing Problems (5.1 to 5.5: policies and
  procedures, accurate documentation, prioritisation; packet analyser purpose, saving and opening a
  .pcap; ping, ipconfig/ifconfig/ip, tracert/traceroute, nslookup and how firewalls affect output;
  RDP, SSH, Telnet, VPN, terminal emulators, console, network management systems, cloud-managed
  networks (Meraki), scripts; show running-config, show cdp neighbors, show ip interface brief, show
  ip route, show version, show inventory, show switch, show mac address-table, show interfaces, show
  interface status, privilege levels, command help and completion), 6. Security (6.1 to 6.3: firewall
  rules permit or deny by port and protocol; CIA, AAA, MFA, encryption, certificates, password
  complexity, identity stores such as Active Directory, threats and vulnerabilities, spam, phishing,
  malware, denial of service; WPA, WPA2, WPA3, Personal vs Enterprise). Candidate profile: high school
  and early post-secondary students and IT and networking professionals, with at least 150 hours of
  instruction and hands-on experience. No domain weights are published, so the per-test split is
  Tigertest's.

## Exam format and policy

- Cisco: CCST certifications FAQ
  https://www.cisco.com/site/us/en/learn/training-certifications/certifications/support-technician/faq.html
  fetched 2026-11-23. Number of questions varies; 50 minutes; Pass or Fail score report right after
  the exam; delivered by Certiport and Pearson VUE (test centre or online proctored); no
  prerequisites; unlimited attempts; certifications earned on or after July 15, 2025 are valid for
  5 years (earlier ones for life); free self-paced Network Technician Career Path of about 70 hours.
  Cisco publishes no passing score, so the 80% goal here is Tigertest's readiness target. The
  question count (45 per practice test here) is Tigertest's choice for a 50-minute exam.
- Indiana Department of Workforce Development credential summary (a state government page)
  https://www.in.gov/dwd/files/industry-certifications/Certified-Support-Technician-CISCO-Networking.pdf
  fetched 2026-11-23. Says "Requires 70% to pass" and lists the six domains. Not used as a fact on
  the landing, because Cisco itself reports only Pass or Fail.

## Standards behind the facts

- RFC 4291 IP Version 6 Addressing Architecture
  https://www.rfc-editor.org/rfc/rfc4291.html
  fetched 2026-11-23: unspecified ::/128, loopback ::1/128, multicast FF00::/8, link-local FE80::/10,
  global unicast everything else; :: replaces one run of zero groups and may appear only once.
- RFC 1918 Address Allocation for Private Internets
  https://www.rfc-editor.org/rfc/rfc1918.html
  checked 2026-11-23: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.
- Wi-Fi Alliance: Wi-Fi security
  https://www.wi-fi.org/discover-wi-fi/security
  fetched 2026-11-23: WPA3 required for Wi-Fi CERTIFIED devices, Personal vs Enterprise, Protected
  Management Frames, protection against password guessing.
- Wireshark User's Guide: saving captured packets
  https://www.wireshark.org/docs/wsug_html_chunked/ChIOSaveSection.html
  fetched 2026-11-23: pcapng is the default save format since 1.8; pcap is the libpcap format.
- Well-known ports from the IANA Service Name and Transport Protocol Port Number Registry
  https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml
  checked 2026-11-23 for FTP 20/21, SSH 22, Telnet 23, DNS 53, DHCP 67/68, TFTP 69, HTTP 80, NTP 123,
  HTTPS 443, RDP 3389.

## Left out

- Fees, regional prices and voucher rules (they change).
- Cisco IOS output beyond the show commands the objectives name; no configuration mode work
  except reading what a command shows.
- Status-light colours of one specific Cisco model as fact: items describe the general Cisco
  convention (steady green link, blinking green activity, amber for a problem or blocked port) and
  say "on many Cisco switches".
- The real exam's drag-and-drop and simulation tasks are modelled by order and matrix items.
