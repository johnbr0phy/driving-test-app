# Italian language and citizenship-study tiger

CILS B1 Cittadinanza (`itcils`) and CELI 2 (`itceli`) share the new `itlanguage` set. Both previously borrowed the US civics tiger, including its American flag. The US civics artwork is unchanged.

## Design

Italian tricolour (vertical green, white, red, green at the pole), language-study book with a speech-bubble symbol, and a friendly student outfit. No American flag, US civic-building icon, official seal, or implication that this is an accredited exam provider. This represents language study, including the CILS citizenship-language requirement; it is not a replacement for the separate US civics test.

Eight transparent 512 × 512 PNGs retain the standard expression contract in `tiger-assets-admissions.md`: crowned mastery, celebration, default smile, confident smile, tentative closed-mouth smile, neutral concern, disappointed determination, and worry.

## Wiring and regression coverage

The central resolver covers catalog cards, landing pages, quiz/results faces, email branding and generated share images. Both exams' share-image URLs get `italian-mascots-1`; other exams retain their cache versions. Existing OG trace rules already include the default face.

Tests check both exam mappings for all eight expressions and score boundaries; exact reviewed asset hashes, distinct decoded pixels, size/alpha/margins; unchanged US/UK/Canadian/Australian/Swedish/Danish/Greek mappings; email resolver paths; and a registry-wide guard against borrowing a national flag for an unrelated exam family. AP Italian keeps its neutral reading mascot, and Italian driving keeps its neutral steering-wheel mascot.

## Review gallery

Columns are expressions 1 through 8.

<img src="../public/tigers/itlanguage/tiger_face_01.png" width="96" alt="Italian study tiger expression 1"> <img src="../public/tigers/itlanguage/tiger_face_02.png" width="96" alt="Italian study tiger expression 2"> <img src="../public/tigers/itlanguage/tiger_face_03.png" width="96" alt="Italian study tiger expression 3"> <img src="../public/tigers/itlanguage/tiger_face_04.png" width="96" alt="Italian study tiger expression 4"> <img src="../public/tigers/itlanguage/tiger_face_05.png" width="96" alt="Italian study tiger expression 5"> <img src="../public/tigers/itlanguage/tiger_face_06.png" width="96" alt="Italian study tiger expression 6"> <img src="../public/tigers/itlanguage/tiger_face_07.png" width="96" alt="Italian study tiger expression 7"> <img src="../public/tigers/itlanguage/tiger_face_08.png" width="96" alt="Italian study tiger expression 8">
