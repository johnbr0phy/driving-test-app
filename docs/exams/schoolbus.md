# CDL School Bus (S) Endorsement

State licensing agencies administer the CDL school bus (S) endorsement under federal standards. In addition to qualifying for a passenger endorsement, applicants must pass a school bus knowledge test and demonstrate driving skills in a school bus of the applicable vehicle group. The federal knowledge minimum is 80%. Consult the issuing state for the test length, timing and local rules.

Tigertest covers the school bus knowledge component in four English-language forms of 50 four-option questions, with 40 correct to pass. The six topic counts are practice allocations. The passenger endorsement exam, behind-the-wheel skills test and state-specific procedures fall outside this bank.

| Category | Per test | Bank |
| --- | ---: | ---: |
| Danger Zones and Mirrors | 8 | 32 |
| Loading and Unloading | 12 | 48 |
| Emergencies and Evacuation | 8 | 32 |
| Railroad Crossings | 8 | 32 |
| Student Management | 6 | 24 |
| Vehicle Checks and Special Operating Conditions | 8 | 32 |

The app slug is `/cdl-school-bus-endorsement` and the landing is `/cdl-school-bus-endorsement-practice-test`. The bank is `data/schoolbus-questions.json`, state code `SCHOOLBUS`, question prefix `SCBUS-`. Test IDs range from 54901 to 54904 and the topic sets use IDs 54901 to 54905. The catalog group is Driving tests in the US region. The theme is HSL 12, 14%, 46% with the `cdl` mascot.

Sources and question material live in `tools/practice/schoolbus/`. Rebuild with `python3 -I tools/practice/build_bank.py schoolbus`.

See the [official outline](https://www.ecfr.gov/current/title-49/section-383.123) and [candidate information](https://www.fmcsa.dot.gov/registration/commercial-drivers-license/states).
