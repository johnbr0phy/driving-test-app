# nlmoto: Netherlands motorcycle theory exam (CBR, rijbewijs A1, A2, A), in Dutch

- **What**: the CBR theorie-examen motor, one theory exam for all motorcycle licences (A1, A2, A), followed by the practical exams AVB and AVD.
- **Official format** (cbr.nl, checked 2026-11-22): 50 scored questions + 2 unscored test questions (after 2 practice questions), 30 minutes (45 with extra time or individually guided), pass 41 of 50, from age 17, in Dutch (other languages with an interpreter; English is offered for the car exam only). Several question types, often on a picture.
- **Tigertest model**: v1, native Dutch (`language: "nl"`, `locale: "nl-NL"`, `review: { nl: "model" }`). 200 questions, four 50-question tests (45301-45304), 7/6/6/8/5/5/4/3/3/3 per test, pools exactly 4x, no spares; `passPct: 82`. Five topic sets 45301-45305 (44/36/52/44/24); 9 dashboard steps.
- **Categories**: Gebruik van de weg 28, Voorrang 24, Bijzondere wegen/file/autosnelweg 24, Rijtechniek 32, Verkeerstekens 20, Uitrusting en zichtbaarheid 20, Passagier/bagage/groep 16, Verantwoord rijden 12, Wetgeving A1/A2/A 12, Voertuigkennis 12. Built on the eight CBR subjects plus the exam plan's motorcycle items (3.1.1 to 3.1.4 and the passenger).
- **IDs**: state `NLMOTO`, prefix `NLMOT-`, segments GBR, VRR, BYZ, RTK, TKN, UIT, PAS, VER, WET, VTG.
- **Sources**: `tools/next100/nlmoto/sources.md`; terms in `glossary.md`. Build: `python3 -I tools/next100/nlmoto/build.py` (sorts all-number options, Dutch decimal comma).
- **Theme**: `[data-theme="nlmoto"]` `113 100% 26%` (deep green; the suggested 8 70% 28% clashed and the burnt orange 19 100% 22% went to nltheorie); borrows the motorcycle tiger (`moto`).
- **Region and hub**: region NL (homepage `/nl`), hub group "EU driving theory tests" after `nlbrom`.
- **Lane**: rider-specific content and RVV priority and signs from a rider's view; facts and answers kept clear of `nlbrom` and `nltheorie`.
- **Not modelled**: picture, drag, hotspot and number-entry questions; code 80 and the A age paths (sources disagree); the filtering code is a Motorplatform code of conduct, not law, and is presented that way.
