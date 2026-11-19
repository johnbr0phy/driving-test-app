# Sources for `linuxplus` (CompTIA Linux+ XK0-006)

All 204 questions are original, written by Tigertest from the XK0-006 exam objectives and the
primary documentation of the tools they name. No CompTIA sample question, CertMaster item, past
exam question, brain dump or commercial practice question was used, and no prep provider is named.
Checked 2026-11-18.

## Exam and version (official, confirmed)
- CompTIA, "CompTIA Linux+ certification", https://www.comptia.org/en-us/certifications/linux/
  (fetched 2026-11-18): Linux+ V8, exam code XK0-006, launched July 15, 2025; retirement "usually
  three years after launch (estimated 2028)". Maximum of 90 questions, multiple choice and
  performance-based, 90 minutes, passing score 720 on a scale of 100 to 900, language English;
  recommended 12 months of hands-on experience with Linux servers and A+, Network+ or Server+ (or
  comparable knowledge). Taken at Pearson VUE test centers or online with remote proctoring.
  The page's FAQ accordion (its answers are in the page's HTML source and may not show in a
  text-only fetch; re-read 2026-11-18 with curl) says, verbatim: "Your Linux+ certification is
  valid for three years. You can renew it by earning 50 Continuing Education Units (CEUs)...";
  "You can take the CompTIA Linux+ exam at Pearson VUE testing centers or online with remote
  proctoring."; and, under "When does CompTIA Linux+ V7 retire?": "If you are preparing for the V7 exam (XK0-005), the English version retires January 13,
  2026. The Japanese, Portuguese, and Spanish versions retire on April 14, 2026." Both dates have
  passed, so XK0-006 is the exam in force for every candidate on the build date; the bank is built
  to XK0-006 only.

## Exam objectives (official, confirmed)
- CompTIA Linux+ XK0-006 V8 Certification Exam Objectives, Exam Objectives Document Version 5.0,
  Copyright 2024 CompTIA (official PDF on CompTIA's Optimizely file host,
  https://lecbyo.files.cmp.optimizely.com/download/90b9ac985c0e11f0b004a2a93c999a21, fetched
  2026-11-18; Version 3.0 of the same document is at
  https://lecbyo.files.cmp.optimizely.com/download/4ae79a48529711f08baa4a1390fb0d85, same domains
  and weights). Test details: XK0-006, maximum of 90 questions, multiple choice and
  performance-based, 90 minutes. Domains: 1.0 System Management 23%, 2.0 Services and User
  Management 20%, 3.0 Security 18%, 4.0 Automation, Orchestration, and Scripting 17%, 5.0
  Troubleshooting 22%. Every item is written to an objective (1.1 to 5.5) and the acronym list in
  that document. Its typos ("nmconnect", "vit-manager", "systemd-blame") were not used as
  commands; virt-manager and systemd-analyze blame are the real tools.

## Primary documentation used for facts (fetched 2026-11-18)
- Netplan, netplan try: https://netplan.readthedocs.io/en/stable/netplan-try/ (rolls back unless
  confirmed; timeout defaults to 120 seconds).
- PEP 8, Style Guide for Python Code: https://peps.python.org/pep-0008/ (4 spaces per
  indentation level).
- crontab(5): https://man7.org/linux/man-pages/man5/crontab.5.html (field order; 0 or 7 is
  Sunday).
- chage(1): https://man7.org/linux/man-pages/man1/chage.1.html (last day 0 forces a change at
  next login).
- nice(1): https://man7.org/linux/man-pages/man1/nice.1.html (niceness -20 most favorable to 19
  least).
- umask(2): https://man7.org/linux/man-pages/man2/umask.2.html (file mode creation mask).
- systemctl(1): https://www.freedesktop.org/software/systemd/man/latest/systemctl.html (mask links
  the unit to /dev/null; unmask).
- Dockerfile reference: https://docs.docker.com/reference/dockerfile/ (CMD defaults, ENTRYPOINT).
- Kubernetes, Secrets: https://kubernetes.io/docs/concepts/configuration/secret/ (Secret holds
  passwords, tokens or keys).
- git-pull: https://git-scm.com/docs/git-pull (runs git fetch, then integrates into the current
  branch).
- OpenTofu, State: https://opentofu.org/docs/language/state/ (state maps real resources to the
  configuration).
- firewall-cmd(1): https://firewalld.org/documentation/man-pages/firewall-cmd.html (runtime and
  permanent configuration are separate).
- Filesystem Hierarchy Standard 3.0, /var: https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch05.html
- General Linux behavior in the other items (LVM, ext4 and XFS resizing, mount options, SELinux
  tools, sudoers, SSH options, journalctl, ss, ip, ethtool, vmstat fields, load average, OOM
  killer, /proc/mdstat, /proc/net/bonding) follows the upstream man pages for each tool.

## Not confirmed or left out
- Exam fee, voucher prices and the CE program details beyond the three-year validity: not used.
- pam_tally2 is listed in the objectives but is deprecated upstream in favor of pam_faillock, so
  no item keys on it.
- No item asks about the test itself.

## Blueprint (Tigertest)
Two 90-item tests in 90 minutes (the real length and pace), Test 2 held out of the drills.
Per test: linuxSystem 10 (1.1, 1.2, 1.4, 1.7) and linuxStorage 11 (1.3, 1.5, 1.6) = 21 (23%);
linuxFiles 9 (2.1 to 2.3) and linuxServices 9 (2.4 to 2.6) = 18 (20%); linuxSecurity 16 (18%);
linuxAutomation 15 (17%); linuxTroubleSystem 10 (5.1, 5.2) and linuxTroubleNetSec 10 (5.3 to 5.5)
= 20 (22%). Three drill-only items per domain (24). 204 items. Performance-based questions are
approximated by matrix, ordering, choose-two and typed-number items, with commands in monospace.
Pass line 80% here is Tigertest's readiness target; CompTIA reports a scaled score.

## Originality
Stems and key facts were checked against the A+, Network+, Security+, CySA+, PenTest+ and CCNA
banks; items that repeated a fact and answer there (169.254 means no DHCP, default gateway for
off-subnet failures, name resolution when IPs ping, IP conflicts, MTU mismatch, PXE for media-free
installs, SLA as the contract, jitter for choppy voice, dig for record lookups) were rewritten to
Linux-specific tasks.

Rebuild with `python3 -I tools/build-run-2026-11-18/linuxplus/build.py`, validate with
`python3 -I tools/validate_v2_bank.py linuxplus '{"1": {"linux": {"1": 90}}, "2": {"linux": {"1": 90}}}'`.
