# CCT (CCI) bank sources

All 200 questions are original, written for Tigertest from CCI's own outline and the primary
clinical sources below. None is copied, adapted or reworded from CCI's sample questions or
self-assessment exams, or from any review book, course or prep site. Rhythm strips and 12-lead
findings are described in words (rate, regularity, P waves, PR, QRS, ST); every rate and interval
calculation is recomputed and asserted in `build.py`.

## Outline and format (Cardiovascular Credentialing International)

- CCI, Certified Cardiographic Technician (CCT) credential page, fetched 2026-11-19:
  https://cci-online.org/credentials/certified-cardiographic-technician/
  Two-hour computer-based exam, 130 questions (110 scored, 20 unscored and not identified);
  1 hour 50 minutes for questions plus 10 minutes for the tutorial and survey. Item types:
  single best answer of four, multiple response, hot spot, drag and place. Content (approximate
  share of the score): A Pre-procedural activities 10%, B Resting ECG (12-lead, 15-lead, etc.)
  14%, C Analyzing 12-lead ECG 22%, D Stress tests 10%, E Ambulatory monitoring (Holter, remote
  event, telemetry) 4%, F Rhythm analysis 40%. Scores 0 to 900, 650 to pass; scaled scores are
  not percentages. Fee $175 (including a $100 nonrefundable fee). Eligibility pathways CCT1
  (student or graduate of a cardiovascular or allied health program), CCT2 (employed in
  cardiovascular technology or an AMA-recognized allied health field), CCT3 (science or health
  degree), plus a high school diploma or GED. Pearson VUE; 90-day eligibility window, one 90-day
  extension. Renewal: first renewal with fee and signed Code of Ethics, then every three years
  with 16 CEUs. The blueprint follows these six weights (the newest CCI publishes).
- CCI, CCT Examination Overview, publication date June 2022 (PDF), fetched 2026-11-19:
  https://cci-online.org/wp-content/uploads/2022/12/CCI_CCT_Exam_Overview_112018-1.pdf
  The task list every question links to: A1-A10 (orders, identifiers, consent, precautions,
  transfer, landmarks, skin prep and positioning, calibration and cleaning, safety hazards,
  patient education); B1-B10 (supplies, troubleshooting, standard 12-lead, modified ECG for
  dextrocardia, posterior and right-sided, 15-lead and pediatric, axis, bundle branch blocks,
  hypertrophy, morphology and anatomy, ischemia and infarction); C1-C4 (stress supplies,
  treadmill and bicycle, Bruce, modified Bruce and Naughton protocols, pharmacological and
  nuclear stress); D1-D4 (ambulatory supplies, function checks, lead attachment with stress
  loops, troubleshooting); E1-E11 (sinus, atrial, junctional, heart block, ventricular and
  pacemaker rhythms, reporting, waveforms and intervals, life-threatening arrhythmias, artifact,
  cardiovascular medication classes). Its older matrix (resting and analyzing combined at 39%,
  rhythm 37%) is superseded by the credential page's six weights.
- CCI, Applicant Handbook (December 2022), listed on the credential page:
  https://cci-online.org/wp-content/uploads/2022/12/CCI-Applicant-Handbook-Dec2022.pdf
  Not read in full; nothing in the bank rests on it.

## Clinical standards used in questions

The ahajournals.org pages block automated reads (HTTP 403), so the AHA/ACC/HRS documents were
read from their Internet Archive captures of the same ahajournals.org pages, fetched 2026-11-19.

- AHA/ACCF/HRS Recommendations for the Standardization and Interpretation of the ECG, Part I:
  The Electrocardiogram and Its Technology (Kligfield et al., Circulation 2007):
  https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.106.180200
  Precordial placement (V1 and V2 fourth intercostal space at the right and left sternal
  borders, V3 midway, V4 fifth space midclavicular, V5 anterior axillary, V6 midaxillary at V4's
  level), superior misplacement of V1 and V2 causing poor R-wave progression, lead wire
  transposition simulating infarction, Wilson central terminal and augmented leads, frequency
  response (0.05 Hz low cutoff, at least 150 Hz high cutoff for adults, 250 Hz for infants; a
  40 Hz filter distorts amplitudes and the machine should warn and restore the standard filter).
- Part III: Intraventricular Conduction Disturbances (Surawicz et al., 2009):
  https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.191095
  Normal adult axis -30 to +90, left axis deviation beyond -30, marked LAD -45 to -90 with LAFB,
  right axis 90 to 180; complete RBBB and LBBB criteria (QRS 120 ms or more in adults, rsR' in
  V1-V2, wide S in I and V6 for RBBB; broad notched R in I, aVL, V5, V6, absent q in I, V5, V6,
  R peak time over 60 ms in V5-V6 for LBBB; ST-T opposite the QRS); incomplete RBBB 110 to
  120 ms; LAFB (-45 to -90, qR in aVL, QRS under 120 ms); LPFB (90 to 180, rS in I and aVL, qR in
  III and aVF); WPW pattern (PR under 120 ms, delta wave, QRS over 120 ms).
- Part IV: The ST Segment, T and U Waves, and the QT Interval (Rautaharju et al., 2009):
  https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.191096
  Prolonged corrected QT 450 ms or more in men and 460 ms or more in women, short QT 390 ms or
  less; QT prolongs with ventricular conduction defects (JT interval).
- Part V: ECG Changes Associated With Cardiac Chamber Hypertrophy (Hancock et al., 2009):
  https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.191097
  Sokolow-Lyon S V1 + R V5 over 35 mm, Cornell S V3 + R aVL over 28 mm men and 20 mm women,
  R aVL over 11 mm; RVH signs (R:S in V1 over 1, tall R V1, deep S V5-V6, right axis); right
  atrial abnormality P over 2.5 mm in lead II; LVH diagnosis not attempted with LBBB.
- Part VI: Acute Ischemia/Infarction (Wagner et al., 2009):
  https://www.ahajournals.org/doi/10.1161/CIRCULATIONAHA.108.191098
  Reciprocal ST depression; V3R and V4R (V4R the most used right-sided lead) for right
  ventricular involvement in inferior infarction; J-point thresholds by sex and age.
- Fourth Universal Definition of Myocardial Infarction (Thygesen et al., 2018):
  https://www.ahajournals.org/doi/10.1161/CIR.0000000000000617
  ST elevation at the J point in two contiguous leads: 1 mm or more except V2-V3 (2 mm men 40
  and over, 2.5 mm men under 40, 1.5 mm women); new horizontal or downsloping ST depression
  0.5 mm or more; posterior leads V7 (posterior axillary), V8 (midscapular), V9 (paraspinal) at
  the fifth intercostal space with a 0.5 mm cutoff; V3R and V4R 0.5 mm (1 mm men under 30);
  prior-MI Q wave criteria (any Q over 0.02 s in V2-V3; 0.03 s and 1 mm deep elsewhere in two
  contiguous leads); QS in V1 normal; lead reversal can create new Q waves.
- Exercise Standards for Testing and Training (Fletcher et al., Circulation 2013):
  https://www.ahajournals.org/doi/10.1161/CIR.0b013e31829b5b44
  Absolute and relative indications to stop (ST elevation over 1 mm in leads without Q waves
  other than aVR, aVL and V1; systolic drop over 10 mm Hg with ischemia; moderate to severe
  angina; CNS symptoms; sustained VT; second- or third-degree block; technical difficulty;
  patient request; ST depression over 2 mm; SBP over 250 or DBP over 115; new BBB not told from
  VT); absolute contraindications (MI within 2 days, unstable angina, symptomatic severe aortic
  stenosis, acute PE, myocarditis, aortic dissection, decompensated heart failure); positive
  test horizontal or downsloping ST depression 1 mm or more 60 to 80 ms after the J point;
  upsloping equivocal; Bruce stage 4 is 4.2 mph at 16%, 3-minute stages, zero and half stages
  1.7 mph at 0% and 5%; Naughton and Balke for elderly and deconditioned; 8 to 12 minutes;
  1 MET 3.5 mL/kg/min; HR rises about 10 bpm per MET; 220 minus age with 85% not a stop rule
  on its own; Borg 6 to 20; double product; torso (Mason-Likar) leads not equal to a standard
  ECG; supine resting ECG first; skin prep by shaving, alcohol and light abrasion; vasodilators
  (adenosine, dipyridamole, regadenoson) and dobutamine; beta blockers reduce peak HR and ST
  depression; HR recovery.
- 2018 ACC/AHA/HRS Guideline on Bradycardia and Cardiac Conduction Delay (Kusumoto et al.):
  https://www.ahajournals.org/doi/10.1161/CIR.0000000000000628
  Definitions: first-degree AV block PR over 200 ms with 1:1 conduction; Mobitz I and II;
  2:1 block not classed as either; high-grade block 2 or more consecutive nonconducted P waves;
  complete heart block; sinus pause over 3 s; sinoatrial exit block; tachy-brady syndrome;
  chronotropic incompetence; medications that cause bradycardia (beta blockers including eye
  drops, nondihydropyridine calcium channel blockers, digoxin, amiodarone, sotalol, etc.);
  pacing modes AAI, VVI, DDD and pacemaker syndrome.
- 2015 ACC/AHA/HRS Guideline for Adult Supraventricular Tachycardia (Page et al.):
  https://www.ahajournals.org/doi/10.1161/CIR.0000000000000311
  Definitions: focal AT, MAT (3 or more P-wave morphologies, always irregular), typical flutter
  with negative sawtooth waves in II, III, aVF near 300 bpm, AVNRT, accessory pathways,
  junctional tachycardia, inappropriate sinus tachycardia.
- 2017 AHA/ACC/HRS Guideline for Ventricular Arrhythmias (Al-Khatib et al.):
  https://www.ahajournals.org/doi/10.1161/CIR.0000000000000549
  VT 3 or more beats over 100 bpm; sustained over 30 s; nonsustained; monomorphic,
  polymorphic, bidirectional (digitalis toxicity); torsades in a long QT; ventricular flutter
  about 300 bpm; VF.
- 2023 ACC/AHA/ACCP/HRS Guideline for Atrial Fibrillation (Joglar et al.):
  https://www.ahajournals.org/doi/10.1161/CIR.0000000000001193
  Rate control with beta blockers and nondihydropyridine calcium channel blockers (diltiazem,
  verapamil) in the absence of preexcitation; antiarrhythmics (amiodarone, sotalol, dofetilide).
- 2017 ISHNE-HRS expert consensus statement on ambulatory ECG and external cardiac
  monitoring/telemetry (Steinberg et al.), PMC full text, fetched 2026-11-19:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC6931745/
  Holter recorders worn 24 to 48 hours (newer up to 30 days) with diary or event button; patch
  monitors; event and loop recorders; implantable loop recorders up to 36 months; mobile
  cardiac telemetry; artifacts that mimic pauses or arrhythmia; skin prep and electrode placement.
- NICE TA88 Appendix B, Pacemaker nomenclature (NBG code, 2002 revision), Internet Archive
  capture fetched 2026-11-19 (nice.org.uk returns 403 to automated reads):
  https://www.nice.org.uk/guidance/ta88/chapter/Appendix-B-Pacemaker-nomenclature
  First letter chamber paced, second chamber sensed, third response (I inhibited, T triggered,
  D both), fourth R rate modulation, fifth multisite pacing.

## Safety, privacy and medications

- OSHA Bloodborne Pathogens standard, 29 CFR 1910.1030, fetched 2026-11-19:
  https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.1030
  Hand washing after glove removal, no recapping or bending, sharps containers, no eating in
  work areas, hepatitis B vaccine at no cost, post-exposure evaluation.
- CDC, Standard Precautions for All Patient Care, fetched 2026-11-19:
  https://www.cdc.gov/infection-control/hcp/basics/standard-precautions.html
  PPE whenever exposure is expected; clean and disinfect equipment and the environment.
- 45 CFR 164.502(b), minimum necessary standard (Cornell LII text), fetched 2026-11-19:
  https://www.law.cornell.edu/cfr/text/45/164.502
  Minimum necessary does not apply to disclosures to a provider for treatment or to the
  individual. (hhs.gov and ecfr.gov blocked automated reads.)
- MedlinePlus, ACE inhibitors, fetched 2026-11-19:
  https://medlineplus.gov/ency/patientinstructions/000087.htm
  Lower blood pressure; dry cough and dizziness as side effects.

## Could not be loaded or left out

- hrsonline.org, the Joint Commission NPSG page and hhs.gov returned 403; patient
  identification follows the CCI task list's own example (name and date of birth).
- The NASPE/BPEG 2002 article itself is paywalled; the code is taken from NICE's appendix.
- Left out: fees and renewal costs in questions, anything about the CCI exam itself, drug doses,
  the CCI sample questions, electrolyte patterns (the cet bank covers them), the 2018 brady
  guideline's research cutoff of 50 bpm for sinus node dysfunction (questions give clearly slow
  rates instead of asking for a cutoff), state scope-of-practice rules.
- Overlap with the `cet` (NHA CET) bank was checked item by item: no fact-and-answer pair from
  it is repeated; this bank leans on what CCT adds (12-lead axis, blocks, hypertrophy and
  infarction criteria, stress protocols and termination rules, ambulatory devices, pacemaker
  codes and malfunctions, and a much larger rhythm share).
