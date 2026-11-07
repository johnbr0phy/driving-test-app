# Sources for `fortigate` (Fortinet FCP - FortiGate 7.6 Administrator, FCP_FGT_AD-7.6)

All 200 questions are original, written by Tigertest from FortiOS 7.6 behavior and Fortinet's
public course topics. No exam dump, Fortinet course quiz or commercial practice question was used.
Checked 2026-11-07.

## Official (watch first)
- Fortinet Training Institute, "FortiGate Administrator" course page,
  https://training.fortinet.com/local/staticpage/view.php?page=library_fortigate-administrator
  (fetched 2026-11-07): agenda (system and network settings, firewall policies and NAT, routing,
  firewall authentication, FSSO, certificate operations, antivirus, web filtering, IPS and
  application control, SSL VPN, IPsec VPN, SD-WAN, Security Fabric, HA, diagnostics). The page
  still listed FortiOS 7.4.1 as the product version when fetched.
- Fortinet, "Training and certification for cybersecurity professionals",
  https://www.fortinet.com/training/cybersecurity-professionals
- Fortinet Document Library, FortiOS 7.6 Administration Guide, https://docs.fortinet.com/product/fortigate/7.6
  (feature behavior: HA election, SD-WAN rules, central NAT, inspection modes, IPsec).

## Exam format (third party; Fortinet's exam description PDF returned 404)
- open-exam-prep.com, "About the Fortinet FCP FortiGate Administrator Exam (FCP_FGT_AD-7.6)",
  https://open-exam-prep.com/study-guides/fortinet-fcp-fgt/introduction/about-fcp-fgt
  (updated July 2026): 50 questions, 90 minutes, pass/fail, Pearson VUE or OnVUE, FortiOS 7.6.0,
  counts toward FCP in Network Security. Guides disagree on length (50 to 60 questions).

## Scope decisions
- SSL VPN is left out: FortiOS 7.6.3 removed SSL VPN tunnel mode, and Fortinet moves remote
  access to IPsec dial-up with FortiClient.
- Per-test split (6/6/6/4/3/4/9/7/5) is Tigertest's; Fortinet publishes no topic weights.
