# FAA Aviation Maintenance Technician Airframe

The FAA Aviation Maintenance Technician Airframe knowledge test (AMA) has 100 questions, a two-hour time limit and a passing score of 70%. It covers airframe structures, inspection, flight controls and aircraft systems. The FAA lists General and Powerplant as separate knowledge tests.

The four v1 tests use 50 single-answer questions with four options and a 35/50 practice pass threshold. Topic allocations fit the ranges in the September 2024 companion guide to FAA-S-ACS-1. The two-hour sitting, official reference figures and oral and practical demonstrations are outside the scope of these practice forms.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Metallic Structures | 5 | 20 |
| Nonmetallic Structures | 4 | 16 |
| Flight Controls | 3 | 12 |
| Airframe Inspection | 5 | 20 |
| Landing Gear Systems | 3 | 12 |
| Hydraulic and Pneumatic Systems | 3 | 12 |
| Environmental Systems | 3 | 12 |
| Aircraft Instrument Systems | 3 | 12 |
| Communication and Lighting Systems | 3 | 12 |
| Aircraft Fuel Systems | 3 | 12 |
| Aircraft Electrical Systems | 3 | 12 |
| Ice and Rain Control | 3 | 12 |
| Airframe Fire Protection | 3 | 12 |
| Rotorcraft Fundamentals | 3 | 12 |
| Water and Waste Systems | 3 | 12 |

The app slug is `/faa-mechanic-airframe` and the landing is `/faa-mechanic-airframe-practice-test`. The bank is `data/faaama-questions.json`, state code `FAAAMA`, question prefix `FAAAMA-`. Tests use IDs 54501 to 54504 and the topic sets use IDs 54501 to 54505. The catalogue group is Aviation, radio & trade licenses in the US region. The theme is HSL 38, 10%, 40% with the `faapvt` mascot.

Sources and question material live in `tools/practice/faaama/`. Rebuild with `python3 -I tools/practice/build_bank.py faaama`.
