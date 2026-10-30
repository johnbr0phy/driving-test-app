# UK, Canada and Australia tiger artwork

Adds exam-specific art for all 40 tests introduced by PRs #568 and #569. Each set has eight 512 × 512 transparent RGBA PNGs under `public/tigers/<examId>/tiger_face_01.png` through `08.png`.

Every expression was generated separately with the built-in image generation tool, preserving the exam's happy mascot identity, costume and props. Each set received visual review and technical checks for dimensions, actual alpha, clear transparent edges, distinct image pixels, and hashes matching its recorded approval. Additional independent reviews covered all 40 sets across the delivery and root agents.

The sequence retains the app's existing score and dashboard behavior:

| Suffix | Expression | Result score |
|---|---|---|
| 01 | Crowned winner | 100% |
| 02 | Celebrating with confetti | 85–99% |
| 03 | Happy open smile / default | 70–84% |
| 04 | Confident closed smile | 55–69% |
| 05 | Tentative closed smile | 40–54% |
| 06 | Flat closed neutral mouth | 25–39% |
| 07 | Downturned closed frown | 10–24% |
| 08 | Worried open mouth with sweat | 0–9% |

All 40 registry IDs are registered in `lib/tigerAssets.ts`. Their old borrowed-set entries are removed so their own artwork is selected in headers, navigation, landing pages, dashboards, training, results and generated social images. International driving exams retain their existing borrowed artwork. No question banks, pass marks or score thresholds change.

## Included sets

| Country | Exam | Registry ID | Happy preview |
|---|---|---|---|
| UK | KS2 SATs | `ks2` | ![ks2](../public/tigers/ks2/tiger_face_03.png) |
| UK | GCSE Maths Foundation | `gcsemaths` | ![gcsemaths](../public/tigers/gcsemaths/tiger_face_03.png) |
| UK | SIA Door Supervisor | `uksia` | ![uksia](../public/tigers/uksia/tiger_face_03.png) |
| UK | 18th Edition Wiring | `uk18ed` | ![uk18ed](../public/tigers/uk18ed/tiger_face_03.png) |
| CA | OSSLT | `osslt` | ![osslt](../public/tigers/osslt/tiger_face_03.png) |
| CA | PAL / CFSC | `capal` | ![capal](../public/tigers/capal/tiger_face_03.png) |
| CA | Red Seal Construction Electrician | `caelec` | ![caelec](../public/tigers/caelec/tiger_face_03.png) |
| AU | NAPLAN Year 9 | `naplan` | ![naplan](../public/tigers/naplan/tiger_face_03.png) |
| AU | NSW Selective | `nswsel` | ![nswsel](../public/tigers/nswsel/tiger_face_03.png) |
| AU | White Card | `auwhite` | ![auwhite](../public/tigers/auwhite/tiger_face_03.png) |
| UK | GCSE Maths Higher | `gcsehigher` | ![gcsehigher](../public/tigers/gcsehigher/tiger_face_03.png) |
| UK | GCSE Combined Science Foundation | `gcsescience` | ![gcsescience](../public/tigers/gcsescience/tiger_face_03.png) |
| UK | GCSE Computer Science | `gcsecs` | ![gcsecs](../public/tigers/gcsecs/tiger_face_03.png) |
| UK | 11+ | `elevenplus` | ![elevenplus](../public/tigers/elevenplus/tiger_face_03.png) |
| UK | Functional Skills Maths L2 | `fsmaths` | ![fsmaths](../public/tigers/fsmaths/tiger_face_03.png) |
| UK | CSCS HS&E | `cscs` | ![cscs](../public/tigers/cscs/tiger_face_03.png) |
| UK | Level 2 Food Hygiene | `ukfood` | ![ukfood](../public/tigers/ukfood/tiger_face_03.png) |
| UK | APLH | `ukaplh` | ![ukaplh](../public/tigers/ukaplh/tiger_face_03.png) |
| UK | First Aid at Work | `ukfaw` | ![ukfaw](../public/tigers/ukfaw/tiger_face_03.png) |
| UK | Care Certificate | `ukcare` | ![ukcare](../public/tigers/ukcare/tiger_face_03.png) |
| CA | Red Seal Automotive | `caauto` | ![caauto](../public/tigers/caauto/tiger_face_03.png) |
| CA | Red Seal Plumber | `caplumb` | ![caplumb](../public/tigers/caplumb/tiger_face_03.png) |
| CA | Red Seal Carpenter | `cacarp` | ![cacarp](../public/tigers/cacarp/tiger_face_03.png) |
| CA | Red Seal Welder | `caweld` | ![caweld](../public/tigers/caweld/tiger_face_03.png) |
| CA | Ontario PSW | `capsw` | ![capsw](../public/tigers/capsw/tiger_face_03.png) |
| CA | REx-PN | `rexpn` | ![rexpn](../public/tigers/rexpn/tiger_face_03.png) |
| CA | WHMIS | `cawhmis` | ![cawhmis](../public/tigers/cawhmis/tiger_face_03.png) |
| CA | Ontario Security Guard | `caguard` | ![caguard](../public/tigers/caguard/tiger_face_03.png) |
| CA | Standard First Aid | `casfa` | ![casfa](../public/tigers/casfa/tiger_face_03.png) |
| CA | EQAO Grade 9 Math | `eqao9` | ![eqao9](../public/tigers/eqao9/tiger_face_03.png) |
| AU | NAPLAN Year 7 | `naplan7` | ![naplan7](../public/tigers/naplan7/tiger_face_03.png) |
| AU | NSW Opportunity Class | `ocnsw` | ![ocnsw](../public/tigers/ocnsw/tiger_face_03.png) |
| AU | Victorian Selective | `vicsel` | ![vicsel](../public/tigers/vicsel/tiger_face_03.png) |
| AU | HSC Maths Standard 2 | `hscmaths` | ![hscmaths](../public/tigers/hscmaths/tiger_face_03.png) |
| AU | RSA | `aursa` | ![aursa](../public/tigers/aursa/tiger_face_03.png) |
| AU | RCG | `aurcg` | ![aurcg](../public/tigers/aurcg/tiger_face_03.png) |
| AU | Food Safety Supervisor | `aufss` | ![aufss](../public/tigers/aufss/tiger_face_03.png) |
| AU | First Aid HLTAID011 | `aufirstaid` | ![aufirstaid](../public/tigers/aufirstaid/tiger_face_03.png) |
| AU | Forklift HRWL | `auforklift` | ![auforklift](../public/tigers/auforklift/tiger_face_03.png) |
| AU | Working at Heights | `auwah` | ![auwah](../public/tigers/auwah/tiger_face_03.png) |
