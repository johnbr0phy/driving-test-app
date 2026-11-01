# Agniveer Army CEE, General Duty (`agniveer`) sources

All checked 2026-11-01.

## Pattern followed

The Indian Army publishes the Agniveer notification and the CEE details on https://joinindianarmy.nic.in. The site
returned HTTP 503 from this environment, so the notification PDF itself was not read. What could be confirmed from
official or government sources:

- **Army Recruiting Office (Headquarters), Chennai, press release for recruiting year 2025-26** (dated 1 April 2025,
  hosted by the Puducherry government: https://www.py.gov.in/sites/default/files/indianarmy01042025pr.pdf, read as a
  PDF). Confirms: Agniveer categories (General Duty, Technical, Clerk/Store Keeper Technical, Tradesman 10th and 8th
  pass, GD Women Military Police); "The Agniveer candidates can apply for any two categories"; "CEE will be conducted in
  13 languages"; bonus marks for ITI/Diploma and NCC qualified candidates; online application only; online written exam
  from June 2025.
- **DIPR Nagaland notice "Army Recruitment (Agniveer) 2027"** (https://ipr.nagaland.gov.in/node/19730, fetched):
  online registration 13 February to 1 April 2026, online entrance test tentatively 1 to 15 June 2026, fee of rupees
  250 (not stated in the copy), details at joinindianarmy.nic.in.
- Registration extension (reviewer, 2026-11-01, via search): news reports (Sentinel Assam, "Agniveer Recruitment 2027:
  Online Registration Extended to April 10", https://www.sentinelassam.com/north-east-india-news/assam-news/agniveer-recruitment-2027-online-registration-extended-to-april-10-for-assam-districts;
  Telangana Today, https://telanganatoday.com/last-date-to-apply-for-agniveer-registrations-ends-on-april-10) say the
  1 April 2026 closing date was extended to 10 April 2026. joinindianarmy.nic.in was tried again the same day and the
  connection was reset, so the notification PDF and the GD paper pattern remain unconfirmed from the Army itself.
- News reports of the 2026 notice (The Hans India, Morung Express, punekarnews, via search, 2026-11-01): registration
  from 13 February 2026, CEE from June 2026; selection by the online CEE, then the recruitment rally (physical tests
  and an adaptability test), then a medical examination.

**From guides (labelled "guides say" in the copy):** the GD paper is 50 multiple-choice questions for 100 marks in 60
minutes: General Knowledge 15, General Science 15, Mathematics 15, Logical Reasoning 5; 2 marks per question; 0.5
mark deducted per wrong answer; pass mark 35 for GD.

- Physics Wallah, Indian Army Agniveer syllabus 2026, https://www.pw.live/defence/exams/indian-army-agniveer-syllabus
  (fetched): 15/15/15/5, 2 marks each, -0.5 per wrong answer, pass 35; GK, Science (class 10 level), Maths and
  Reasoning topic lists.
- Aglasem, https://career.aglasem.com/defence/agniveer-cee/syllabus and Adda247,
  https://www.adda247.com/exams/defence/indian-army-agniveer-syllabus/ (search summaries): 50 questions, 100 marks,
  60 minutes, pass 35.
- Disagreements: one site (syllabus4u) gives -0.25; one cut-off site gives a pass mark of 32 and claims no negative
  marking; Testbook's page contradicts itself. The copy uses the majority figures and says "guides say".

Not used: ages, educational qualification, physical standards and rally events, which vary by category and year; the
Agniveer service terms. The copy never states a fee or salary.

## What the bank covers and leaves out

- Two full 50-question tests (15/15/15/5, in the order GK, Science, Maths, Reasoning; the real paper's order is not
  confirmed) plus 131 drill-only items, 231 in all, four-option single answer.
- GK is static facts only: history, the freedom struggle, culture, the Army's battles, awards, days, training
  establishments and mottos, the Constitution, economy, sports, national symbols and geography. No current affairs, no
  office-holders, no award winners of a given year.
- Science to NCERT class 10. Reasoning is text only (no figures).
- Indian English, rupees, metric units, Indian names.
- Every item is original. The bank was checked by script against every India bank in `data/v2/` (ssccgl, rrbntpc,
  ibpspo, ctet, rrbgroupd, sscgd, sscchsl, sscmts, uppolice, ibpsclerk, jnvst, sbiclerk, sbipo, ibpsrrb, biharpolice,
  rajpolice, delhipolice, mppolice) and the batch 3 banks present at the time (nda, agniveervayu, upscse, rrbalp,
  rpfconst, ssccpo), by stem similarity, keyed fact and numbers. About 150 items were rewritten in two passes; what
  remains shares only generic templates with different numbers (an LCM, a series rule, a clock angle at another time).

## Facts checked

Defence facts against standard references: Longewala (23 Punjab, December 1971), Rezang La (C Company 13 Kumaon, Major
Shaitan Singh PVC), Operation Meghdoot (13 April 1984), Operation Vijay (Goa, December 1961; Kargil, 1999), Operation
Polo (Hyderabad, September 1948), Kargil Vijay Diwas 26 July, Vijay Diwas 16 December, Army Day 15 January (Cariappa,
1949), Infantry Day 27 October (1 Sikh at Srinagar, 1947), Saragarhi Day 12 September (36th Sikhs, now 4 Sikh), Major
Somnath Sharma (Badgam, 1947), Field Marshals Manekshaw (1973) and Cariappa (1986), HAWS Gulmarg, NCC motto "Unity and
Discipline", Army motto "Service Before Self", Department of Military Affairs headed by the CDS. Constitution Articles
19, 33, 51A(d), 56, 93, 368 and the Fourth Schedule against the Constitution of India text (legislative.gov.in). Every
arithmetic and maths answer recomputed.

Reviewer pass (2026-11-01): every item re-read and every number recomputed; added facts checked: Silambam (Tamil
Nadu), the Mehrauli Iron Pillar (Gupta period, inscription linked to Chandragupta II), RBI operations from 1 April 1935
(nationalised 1949, 14 banks nationalised 1969), argon-40 and calcium-40 as isobars. 17 items rewritten that repeated a
fact and answer, or the same numbers, in another wave bank (rajpolice Kalbelia, mppolice xylem, Operation Flood and
cornea, rrbgroupd Allahabad pillar and isotopes, sscchsl rickets, biharpolice universal recipient, jnvst small
intestine, ibpsclerk 24/40-day painting, delhipolice +10%/-10%, uppolice 240 m train at 72 km/h, psat triangle angles,
sscgd 41/17th ranking and prime 89, rrbalp x - 1/x = 6, delhipolice BAG = 10 coding).
