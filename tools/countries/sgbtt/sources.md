# Sources for `sgbtt` (Singapore Basic Theory Test)

All 200 questions are original. They were written from the rule text of the Traffic Police handbook
and do not copy any official practice set (police.gov.sg also hosts BTT practice questions; those were
not opened) or any commercial app. Signs and markings are described in words (no images).

## Primary source (checked 2026-10-31)
- Singapore Traffic Police, "Basic Theory of Driving: The Official Handbook", "Last updated on 2.1.2026",
  90 pages. Served at https://www.police.gov.sg/-/media/SPF/Knowledge-Hub/Traffic/BT-ENG-24126.pdf
  (the brief calls it BT-ENG-2126.pdf; that file name returns an HTML page, the PDF above carries the
  2.1.2026 date on its imprint page). The contents page marks Part B "to be tested during Basic Theory
  Test"; every question comes from Part B. Part A (licence classes, PDL, probation, DIPS, medicals) is
  not tested and is used only for landing facts.
- Handbook Part A, para 4(a): the BTT "is designed to test your knowledge of the traffic rules, traffic
  regulations, traffic signs and signals as well as general road safety"; BTT must be passed before the
  FTT (car) or RTT (motorcycle). Para 2: licence applicants must be at least 18. Para 6-7: PDL after the
  BTT, valid 2 years, L plates front and back, drive only under a licensed driving instructor.

## Test format
- Traffic Police, "Provisional Driving Licence" (checked 2026-10-31): "Pass the eyesight test & Basic
  Theory Test at any of the 3 Driving Centres"; eyesight test done when registering to book the theory
  test; PDL valid for 2 years. The page gives no question count, time or pass mark.
  https://www.police.gov.sg/Knowledge-Hub/Traffic/Traffic-Matters/Provisional-Driving-Licence
- 50 questions, 50 minutes, 45 to pass: only third-party guides state these (drivelah.sg BTT guide,
  basictheorytestsg.com, waerfa.com, checked 2026-10-31). Per the brief, the landing labels them as what
  guides say and `lib/examFacts.ts` labels them the same way. passPct 90 gives ceil(0.90 x 50) = 45.
- The Traffic Police publish no per-topic counts. The blueprint (10/9/8/7/4/5/7 per 50) follows the
  sections of Part B, weighted toward signs, markings and signals, which fill about half of Part B.

## Numbers used (all from the 2.1.2026 handbook)
- Speed: 50 km/h default (para 79); vehicle or road limit, whichever lower; 40 km/h in Friendly
  Streets (sign text); do not drive more than 15 km/h below the limit (para 161a); vehicles limited to
  60 km/h or below use the left lane on expressways (para 92); lorries carrying workers 60 km/h (para 123).
- Signs: width 2.3 m, height 4.5 m (police escort above), weight 10 t laden or unladen (examples on the
  signs); breakdown sign at least 20 m behind; work zone signs orange, diamond for warning; directional
  signs white on green, tourist white on brown, facility black on white; EMAS colour bands (green up to
  50% more, yellow 50-125%, red over 125%); EMAS lanes numbered from the fast lane.
- Markings: single yellow line no parking 7 am-7 pm except Sundays and public holidays; double yellow
  no parking at all times except immediate pick-up/drop-off; single yellow zig-zag no parking; double
  yellow zig-zag no stopping; normal bus lane Mon-Fri 7.30-9.30 am and 5-8 pm; full-day bus lane Mon-Sat
  7.30 am-11 pm (yellow plus red line); bus lanes open to buses, bicycles, emergency and police vehicles.
- Signals: amber, flashing amber (out of order, give way to the right), flickering green arrow, red
  arrow, green B, all-red, advanced warning lights, intelligent road studs; police signals take
  precedence (para 60).
- Junctions (paras 81-90, 94): uncontrolled junction give way rules; right-turn positions; yellow box
  offence and its three exceptions; 2 m gap and 2 s wait at lights (para 208).
- Parking (para 97-101): 6 m from a junction, 9 m from a bus stop, 3 m from a hydrant; reverse gear
  downhill; hazard lights and triangle 20 m behind on breakdown.
- Vehicle (paras 102-114, 125-128, 209): everyone belted, booster or adjustable belt under 1.35 m;
  headlights 7 pm-7 am; mobile device offence needs a hand holding it, a function used and the vehicle
  in motion; tyres replaced below 1.6 mm; worker seated height 1.1 m.
- Safety (paras 130-201, 236-245): three-second rule (previously two); mirrors every 5 to 10 s; signal
  at least 3 s; 1 m / 1.5 m from pedestrians; 1.5 m when passing cyclists where practicable; wet
  stopping distance about twice; 80% of information through the eyes; tunnel do's and don'ts; AV on
  trial shows a blinking yellow beacon.

## Deliberately avoided
- The alcohol limits (the handbook still prints 80 mg/100 ml blood and 35 ug/100 ml breath, but the
  limit changes under the 2026 Act).
- DIPS demerit thresholds (13 for new drivers, 24 in 24 months; changing to 12/18 on 1 January 2027).
- All fines and fees, including the seat belt composition fine and the drink-driving and phone penalties.
- Part C material (URA/HDB car parks, lane use signs, eco-driving, theft prevention, the Motor Claims
  Framework), which the handbook does not mark as tested.
