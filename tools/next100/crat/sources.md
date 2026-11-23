# CRAT (CCI) bank sources

All 200 questions are original, written for Tigertest from CCI's own CRAT task list and the
clinical sources below. None is copied, adapted or reworded from CCI's sample questions (the five
in the Examination Overview) or its self-assessment exams, or from any review book, course, app or
prep site. Rhythm strips are described in words (rate, regularity, P waves, PR, QRS, QT); every rate
and interval calculation is recomputed and asserted in `build.py`.

## Outline and format (Cardiovascular Credentialing International)

- CCI, Certified Rhythm Analysis Technician (CRAT) credential page, fetched 2026-11-23:
  https://cci-online.org/credentials/certified-rhythm-analysis-technician/
  Two-hour computer-based exam at Pearson VUE (Pearson Professional Centers and authorized
  centers abroad), 130 questions, 110 scored and 20 unscored and not identified; 1 hour 50 minutes
  for questions plus 10 minutes for the tutorial and survey. Item types: single best answer of
  four, multiple response (two or three of four to six), hot spot, drag and place. Content "as of
  July 1, 2023" (approximate share of the score): A Initiating Cardiac Monitoring Services 9%,
  B Administering Cardiac Tests 9%, C Analyzing Normal Rhythms 16%, D Analyzing Abnormal Rhythms
  60%, E Processing Cardiac Test Findings 6%. Scaled scores 0 to 900, 650 to pass; scaled scores
  are not percentages. Fee $175 including a $100 nonrefundable processing fee. Eligibility: high
  school diploma or GED plus CRAT1 (student or graduate of a cardiovascular or allied health
  program), CRAT2 (current or past employment in cardiovascular technology or an AMA-recognized
  allied health field) or CRAT3 (science or health degree). Authorization to Test starts a 90-day
  window, one 90-day extension. Renewal: first renewal with fee and signed Code of Ethics, then
  every three years with 16 CEUs. No 2026 change is announced on the page (checked 2026-11-23).
- CCI, CRAT Examination Overview, publication date June 2022 (PDF), fetched 2026-11-23:
  https://cci-online.org/wp-content/uploads/2022/12/2022-CRAT-Overview-Jun2022.pdf
  Matrix and task list for exams after July 1, 2023: A1-A3 (verify patient identification;
  review diagnosis, history or reason for monitoring; educate patients and the care team on the
  service, device, placement, safety and care); B1-B4 (place the device; evaluate ECG quality,
  minimizing interference and troubleshooting; correlate symptoms to events and rhythms; recognize
  standard ECG settings); C1-C4 (normal ECG components; cardiac anatomy and physiology; correlate
  morphology with A&P; sinus rhythms, rates, regularity and wave morphology); D1-D12 (atrial
  fibrillation, atrial flutter, atrial arrhythmias, junctional arrhythmias, ventricular
  arrhythmias, asystole, ventricular tachycardia, ventricular fibrillation, paced rhythms,
  intraventricular conduction delays, AV conduction defects, artifacts); E1-E3 (triage ECG
  results, compile findings, follow-up). Knowledge list: regulatory and compliance (OSHA, HIPAA,
  informed consent, records), ethics, communication, patient safety, emergency response, A&P,
  rhythm interpretation, troubleshooting, documentation, terminology. The PDF prints E as 5% where
  the credential page says 6%; the bank uses the credential page.
  The five sample questions in this PDF were read only to avoid them: no item asks their facts
  with their answer (somatic tremor from a cold room, ventricular fibrillation as the lethal
  rhythm without a shock, the T wave as repolarization, a wide QRS meaning bundle branch block,
  measuring an asystolic pause).

## Clinical sources read for this bank

- 2017 ISHNE-HRS expert consensus statement on ambulatory ECG and external cardiac
  monitoring/telemetry (Steinberg et al.), PMC full text, fetched 2026-11-23:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC6931745/
  Event recorders, Holter 24 to 48 hours with diary and event marker, patch monitors over the left
  pectoral region (water resistant), external loop recorders 1 to 4 weeks, implantable loop
  recorders up to 36 months, mobile cardiac telemetry with reading-center technicians and alarms;
  syncope precludes patient activation; artifact from motion, poor contact, loose connections and
  myopotentials mimicking AF, flutter or VT; intermittent contact producing pseudo-pauses;
  comparing simultaneous channels; skin prep (shave if needed, light abrasion, sealed fresh
  electrodes, check expiry); Mason-Likar placement; EASI; QTc over 500 ms concerning.
- Zègre-Hemsey, Garvey, Carey, Cardiac Monitoring in the Emergency Department, Crit Care Nurs
  Clin North Am 2016, PMC full text, fetched 2026-11-23:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC5630152
  QTc normal under 0.46 s in women and 0.45 s in men; QTc over 0.50 s linked to torsades risk;
  QT measured at baseline and at least every 8 hours on QT-prolonging drugs; a true V lead (V1)
  in a 5-lead system improves arrhythmia detection.
- Safavi-Naeini and Saeed, Pacemaker Troubleshooting: Common Clinical Scenarios, Tex Heart Inst J
  2016, PMC full text, fetched 2026-11-23:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC5067035
  Failure to pace (rate below the lower rate with no spike), failure to capture (spike with no
  P or QRS), undersensing (spikes regardless of intrinsic beats), oversensing (pacing inhibited by
  T waves, myopotentials or interference), fusion and pseudofusion as normal function,
  pacemaker Wenckebach above the upper tracking rate.

## Clinical standards read for the sibling CCT bank (same repo, 2026-11-19)

The AHA/ACC/HRS guideline pages on ahajournals.org and jacc.org returned 403 to automated reads
again on 2026-11-23, and NCBI Bookshelf returned a browser check. Their definitions were read for
the CCT bank on 2026-11-19 (see `tools/next100/cct/sources.md`) and are used here unchanged:
the 2018 bradycardia and conduction delay guideline (sinus pause over 3 s, first-degree block
PR over 200 ms, Mobitz I and II, 2:1 block not classed as either, high-grade block, complete block,
escape rhythms, isorhythmic dissociation), the 2015 SVT guideline (focal AT, MAT with 3 or more P
morphologies, typical flutter near 300 with negative sawtooth waves in II, III, aVF, AVNRT,
accessory pathways), the 2017 ventricular arrhythmia guideline (VT 3 or more beats over 100,
sustained over 30 s, polymorphic, torsades, VF), the 2023 AF guideline, AHA/ACCF/HRS ECG
standardization Parts I, III and IV (lead placement, filters, 25 mm/s and 10 mm/mV, bundle branch
block criteria with QRS 120 ms or more, QTc limits) and the NBG pacemaker code (NICE TA88
appendix B):
https://www.ahajournals.org/doi/10.1161/CIR.0000000000000628
https://www.ahajournals.org/doi/10.1161/CIR.0000000000000311
https://www.ahajournals.org/doi/10.1161/CIR.0000000000000549
https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.106.180200
https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.191095
https://www.nice.org.uk/guidance/ta88/chapter/Appendix-B-Pacemaker-nomenclature

Basic ECG paper arithmetic (1 small box 0.04 s at 25 mm/s, 1 large box 0.20 s, 1500 divided by
small boxes, 300 divided by large boxes, a 6-second strip times 10) is the standard method in
every reference above and is computed in `build.py`.

## Safety and privacy

- CDC, Standard Precautions for All Patient Care, fetched 2026-11-19 for CCT and reused:
  https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html
- 45 CFR 164.502 (minimum necessary; disclosures for treatment), Cornell LII, fetched 2026-11-19
  for CCT and reused: https://www.law.cornell.edu/cfr/text/45/164.502

## Left out on purpose

- Anything about the CCI exam itself (count, time, score, fees, eligibility) in questions; those
  facts are on the landing and in `lib/examFacts.ts` only.
- Drug doses, defibrillation energies, ACLS algorithms (the acls bank covers them) and treatment
  decisions: the CRAT watches, measures, documents and reports; nurses and physicians treat.
- Facility-specific alarm limits and notification times: questions say "per facility policy".
- Hot spot and drag-and-place items are not modelled; multiple-response items are written as
  single best answer.
- Overlap: checked by script against the cct, cet, cen, ccrn, acls and pals banks and the v2
  nclex, nclexpn, paramedic and emt banks for repeated stems and number-and-answer pairs; matches
  were rewritten (method and result at the end of this file once run).
