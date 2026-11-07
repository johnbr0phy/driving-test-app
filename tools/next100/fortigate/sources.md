# Sources for `fortigate` (Fortinet NSE 4 - FortiOS 7.6 Administrator, formerly FCP - FortiGate 7.6 Administrator)

All 200 questions are original, written by Tigertest from Fortinet's published exam topics and
FortiOS 7.6 behavior. No exam dump, Fortinet course quiz or commercial practice question was used.
Checked 2026-11-07.

## Official (watch first)
- Fortinet Training Institute, "FortiOS Administrator Exam",
  https://training.fortinet.com/local/staticpage/view.php?page=fortios_administrator_exam
  (fetched 2026-11-07): "Fortinet NSE 4 - FortiOS 7.6 Administrator", status Available, 100
  minutes, 50-55 questions, pass or fail (score report from Pearson), English and Japanese,
  FortiOS 7.6.0. Weights: deployment and system configuration 20-25% (initial configuration,
  logging, FGCP HA, diagnosing resource and connectivity problems, FortiGate CNF and VMs in the
  public cloud, FortiSASE), firewall policies and authentication 20-25% (policies, SNAT and DNAT,
  LDAP/RADIUS, active and passive authentication, FSSO), content inspection 25-30% (SSL inspection,
  inspection modes and web filtering, application control, antivirus, IPS), routing 10-15% (static
  routes, SD-WAN), VPNs 10-15% (IPsec only). The same page lists "Fortinet NSE 4 - FortiOS 8.0
  Administrator" as Coming Soon (100 minutes, 50-60 questions, English, FortiOS 8.0.0, deployment
  25-35%). Rebuild against that outline when it goes live.
- Fortinet, "FCP - FortiGate 7.6 Administrator Exam Description" (dated 6/10/2025),
  https://nseti-pdfs.s3.us-west-2.amazonaws.com/desc/FortiGate_7.6_Administrator_Exam_Description.pdf
  (the fortinet.com copy returns 404): FCP_FGT_AD-7.6, 90 minutes, 50 multiple-choice questions,
  pass or fail, English and Japanese, FortiOS 7.6.0, counts toward FCP Network Security, Public Cloud
  Security and Security Operations. Its topic list included SSL VPN; the NSE 4 outline dropped it.
- Fortinet Training Institute, "FortiGate Administrator" course page,
  https://training.fortinet.com/local/staticpage/view.php?page=library_fortigate-administrator
- Fortinet Document Library, FortiOS 7.6 Administration Guide, https://docs.fortinet.com/product/fortigate/7.6

## Third party
- Guides give the NSE 4 exam code as NSE4_FGT_AD-7.6 and say FCP_FGT_AD-7.6 retired on
  31 December 2025; Fortinet's page shows no code, so the copy does not state one.

## Scope decisions
- SSL VPN left out (not in the NSE 4 outline; FortiOS 7.6.3 removed tunnel mode).
- Per test: system 5, HA/Fabric/logs 5, cloud and FortiSASE 2 (24%); policy 5, NAT 4, auth 3
  (24%); SSL 4, profiles 10 (28%); routing 7 (14%); IPsec 5 (10%).
