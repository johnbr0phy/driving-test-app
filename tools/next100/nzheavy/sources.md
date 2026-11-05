# Sources for `nzheavy` (New Zealand Class 2 heavy vehicle learner licence theory test)

Checked 2026-11-05. All 200 questions are original. NZTA's own Road Code questions and any
commercial question bank were not opened or copied. Signs are described in words.

## What could and could not be checked this session (read this first)
- nzta.govt.nz (licence classes, heavy vehicle licences, the Road Code for heavy vehicle drivers,
  work time and logbooks pages) answers automated requests with an Incapsula bot wall (HTTP 200 with
  an empty challenge page) to both curl and WebFetch, 2026-11-05.
- legislation.govt.nz (Land Transport (Driver Licensing) Rule 1999, Land Transport Rule: Work Time
  and Logbooks 2007, Vehicle Dimensions and Mass Rule 2016) returned 202 with an empty body to curl
  and 403 to WebFetch, 2026-11-05.
- drive.govt.nz covers car licences only; no heavy vehicle page was found
  (`/heavy-vehicle-licence`, `/get-your-licence/heavy-vehicle-licences/` are 404).
- The session's shared web search budget was used up before this builder's first search, so no
  search-snippet confirmation was possible either.
- Result: NO fact specific to the Class 2 test or to heavy vehicles was confirmed against an
  official source this session. Every such fact is listed under "unconfirmed" in the builder's
  report and below, and the integrator or a reviewer should check them on nzta.govt.nz (in a
  normal browser) before shipping.

## Fact-check pass, 2026-11-05 (second session)
Official sources were still unreachable: nzta.govt.nz licence-classes and heavy vehicle Road Code
pages returned an empty bot-wall page to WebFetch, an NZTA work time PDF looped redirects, and
legislation.govt.nz (Work Time and Logbooks Rule 2007) returned 403. The shared web search budget
was used up before this pass's first search. One reputable secondary source was readable:

- Wikipedia, "Driving licence in New Zealand",
  https://en.wikipedia.org/wiki/Driving_licence_in_New_Zealand (read 2026-11-05). Confirms:
  - Class 1 up to 6,000 kg GCW (LIC-001).
  - Class 2 (medium rigid): needs a full Class 1 licence; rigid vehicles up to 18,000 kg GLW;
    combinations up to 12,000 kg GCW (LIC-002, LIC-003, LIC-004, LIC-009; landing, examFacts).
  - Class 3 (medium combination): combinations up to 25,000 kg GCW (LIC-006).
  - Class 4 (heavy rigid): needs a full Class 2 licence; rigid vehicles above Class 2
    (LIC-005, LIC-010).
  - Endorsements: D dangerous goods, F forklifts, P commercial passenger, V vehicle recovery
    (LIC-007, LIC-008).
  - The heavy vehicle learner test (classes 2, 3, 5; class 4 the same as class 2) needs "at least
    33 out of 35" on a multiple-choice Road Code test. The bank's target was raised from 32 to 33
    of 35 (passPct 91 to 94) and the landing and examFacts say "reported, check with NZTA".
- Not confirmed by that article and removed: "a rigid vehicle over 18,000 kg with no more than two
  axles is Class 2" (old LIC-004, LIC-002 and LIC-005 explanations, landing, examFacts); the heavy
  learner supervisor rules (old LIC-009 "full Class 2 holder", LIC-010 "beside you"), replaced by
  the confirmed Class 1 before Class 2 and Class 2 before Class 4 prerequisites; the 3,500 kg
  aside in the LIC-001 explanation.
- Wikipedia "Speed limits in New Zealand" (read 2026-11-05) does not state the 90 km/h heavy
  motor vehicle limit or the 80 km/h school bus limit, so ROD-001 to ROD-004 stay unconfirmed.

Still unconfirmed after this pass (left as written, from long-standing rules; check on
nzta.govt.nz in a normal browser before shipping): every Work Time and Logbooks Rule figure and
logbook rule (q_work.py), the fatigue facts, the 3,500 kg heavy motor vehicle definition and the
90/80 km/h limits (ROD-001 to ROD-004), 2.55 m and 4.3 m and HPMV permits (MAS-003, MAS-004,
MAS-027), Truck Loading Code 0.8/0.5/0.2 (MAS-014, MAS-015), weighbridge direction (MAS-024),
the yellow no-passing line exception (ROD-025), DG documents in the cab (SAF-011), certificate of
fitness and RUC (LIC-021 to LIC-023), and the facts reused from nzroad (1 October 2026 cyclist and
bus rules, oral fluid testing, under-20 zero alcohol, phone ban, restraints under 15).

## Test format (as first written; see the fact-check pass above)
- The real Class 2 theory test's question count, time and pass mark could not be read. The bank
  models five 35-question tests with 32 to pass (passPct 91), which is the car learner licence
  test's confirmed format (drive.govt.nz "Doing the learner licence test", checked 2026-10-30 by the
  `nzroad` builder, see `tools/next30/nzroad/sources.md`). The landing, FAQ and examFacts call this
  Tigertest's target and tell the reader to check NZTA, as `zak53` does.
- No per-topic counts are published that we know of; the blueprint (4/6/6/6/5/5/3 per 35) is
  Tigertest's, weighted to what a heavy vehicle driver needs beyond the car Road Code.
- Eligibility "full Class 1 licence first" is long-standing NZ graduated heavy licensing; the
  minimum time held (often cited as 6 months) was NOT checked and is not asserted anywhere.

## Facts reused from `tools/next30/nzroad/sources.md` (checked 2026-10-30 by that builder)
- Alcohol: under 20 zero; 20+ 250 mcg/L breath, 50 mg/100 mL blood (not asked as bare limits here).
- Hand-held phone ban while driving, including in queues and at lights.
- Driver responsible for passengers under 15 wearing restraints.
- Roadside oral fluid drug testing began 15 December 2025 (NZ Police).
- From 1 October 2026: 1.5 m minimum when passing cyclists and other non-motorised users; give
  way to a bus pulling out after signalling at least 3 seconds on roads of 60 km/h or less (NZTA
  "New lane use rules" via search, 1News 12 Sep 2026; rule text not read).
- Carry your licence whenever you drive.

## Long-standing NZ heavy vehicle rules used (from memory of the rules, NOT re-read this session)
- Licence classes by gross laden weight (Land Transport (Driver Licensing) Rule 1999): Class 1 up
  to 6,000 kg; Class 2 rigid over 6,000 kg up to 18,000 kg, combinations up to 12,000 kg GCW, rigid
  over 18,000 kg with no more than two axles; Class 3 combinations 12,001 to 25,000 kg; Class 4
  heavy rigid; Class 5 heavy combination.
- Endorsements: P passenger, D dangerous goods, V vehicle recovery, F forklift.
- Supervisor for a heavy learner holds a full licence for the class (the 2-year minimum used for
  car supervisors was not asserted for heavy classes in the bank).
- Work Time and Logbooks Rule 2007: 5.5 h work time then a 30-minute rest break; 13 h work time in
  a cumulative work day then a 10-hour continuous rest; 70 h in a cumulative work period then a
  24-hour continuous rest; work time includes loading, maintenance, other employment; logbook for
  vehicles needing Class 2 to 5 or in a transport service unless exempt; NZTA-approved e-logbooks;
  logbooks kept 12 months; corrections must stay readable; liability of employers and schedulers.
- Heavy motor vehicle (over 3,500 kg GVM) 90 km/h maximum; school bus 80 km/h; posted lower
  limits apply. Yellow no-passing line rules.
- Vehicle Dimensions and Mass Rule: 2.55 m width, 4.3 m height, HPMV permits; over-dimension
  permits.
- Truck Loading Code restraint performance: 0.8 forward, 0.5 rearward and sideways, 0.2 upward.
- Certificate of fitness for heavy vehicles; road user charges licence for diesel and heavy
  vehicles (concept only, no rates); tyre tread 1.5 mm minimum (not asked, to avoid repeating nzroad).
- Dangerous goods documents within reach in the cab; placards.
- 111 emergency number.

## Deliberately avoided
- Fees, RUC rates, fines, demerit amounts, stage durations (time held before learner, restricted
  or full), the 2027 graduated licensing changes, overall length limits, projection distances,
  following distance in seconds for heavy vehicles, logbook exemption radius.

## Duplicate checks
- Stems compared (difflib ratio > 0.72) against `data/nz-learner-licence-questions.json`,
  `data/uk-lgv-theory-questions.json`, `data/uk-pcv-theory-questions.json`,
  `data/ireland-truck-bus-theory-questions.json`, `data/cdl-questions.json` and
  `data/south-africa-k53-code-3-questions.json`; the closest nine were rewritten. Bare alcohol
  limits, demerits, tread depth, headlight hours, crash reporting times and school bus passing speed
  were left out because nzroad asks them.
