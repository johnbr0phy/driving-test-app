# Spelling (nap7Spelling). The real test opens with audio dictation, which is
# not modelled; these are the proofreading and choice formats. Australian
# spelling. No word is shared with the Year 9 bank.

WHICH = "Which word is spelled correctly?"
FIX = "One word in this sentence is spelled incorrectly. Select it."
FILL = "Choose the correct word to complete the sentence."

# ---------- Test 1, module 1 ----------
at(1, 1)
S(WHICH, "beautiful", ["beautifull", "beutiful", "beatiful"],
  "Beautiful is beauty + ful: the y changes to i, and -ful has only one l.",
  d=1, skill="Adding suffixes")
C(FILL + "\n\nOur new teacher is very [[1]] from our last one.",
  [("different", ["diffrent", "diferent", "differant"])],
  "Different has a double f and ends in -ent: dif-fer-ent. Say all three parts to remember the middle e.",
  d=1, skill="Unstressed vowels")
H(FIX + "\n\nThe {{museum}} had an {{intresting}} {{display}} about {{dinosaurs}}.",
  [1],
  "The correct spelling is 'interesting'. It is interest + ing, so keep every letter of 'interest': in-ter-est-ing.",
  d=1, skill="Proofreading")
S(WHICH, "knowledge", ["knowlege", "nowledge", "knowledg"],
  "Knowledge is know + ledge, so it keeps the silent k and ends in -dge.",
  d=1, skill="Silent letters")
C(FILL + "\n\nThe two girls left [[1]] bags at the bus stop.",
  [("their", ["there", "they're", "thier"])],
  "'Their' shows something belongs to them. 'There' is a place and 'they're' means 'they are'.",
  d=1, skill="Homophones")
H(FIX + "\n\nShe {{probly}} left her {{jumper}} in the {{change}} {{rooms}}.",
  [0],
  "The correct spelling is 'probably': probable + ly, with three syllables before the -ly: prob-ab-ly.",
  d=2, skill="Proofreading")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
S(WHICH, "exaggerate", ["exagerate", "exaggarate", "exxagerate"],
  "Exaggerate has a double g and 'er' in the middle: ex-ag-ger-ate.",
  d=3, skill="Double letters")
C(FILL + "\n\nThe magician made the rabbit [[1]] from the hat.",
  [("disappear", ["dissappear", "disapear", "dissapear"])],
  "Disappear is dis + appear. Dis- adds one s, and appear already has a double p.",
  d=2, skill="Prefixes")
H(FIX + "\n\nThe {{restaurant}} was {{recommended}} by a {{foriegn}} {{visitor}}.",
  [2],
  "The correct spelling is 'foreign'. It breaks the 'i before e' rule: f-o-r-e-i-g-n, with a silent g.",
  d=3, skill="Proofreading")
C(FILL + "\n\nDuring the storm, a flash of [[1]] lit up the sky.",
  [("lightning", ["lightening", "litening", "lightnin"])],
  "The flash in a storm is lightning, with no e. 'Lightening' means making something lighter.",
  d=3, skill="Tricky words")
C(FILL + "\n\nThe team captain gave a short speech on [[1]] of the whole squad.",
  [("behalf", ["behaf", "beharf", "behalve"])],
  "Behalf is be + half, so it keeps the silent l of 'half'.",
  d=2, skill="Silent letters")
H(FIX + "\n\nIt was a {{privilege}} to {{interview}} the {{famous}} {{athelete}}.",
  [3],
  "The correct spelling is 'athlete', with two syllables: ath-lete. People often add an extra e in speech.",
  d=3, skill="Proofreading")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
S(WHICH, "chocolate", ["choclate", "chocolat", "chocolete"],
  "Chocolate has three syllables, choc-o-late, and ends in -ate. The middle o is often swallowed when people say it.",
  d=1, skill="Unstressed vowels")
C(FILL + "\n\nI need to buy some [[1]] for the class party.",
  [("biscuits", ["biscits", "biskuits", "bisquits"])],
  "Biscuit has a silent u after the c: bis-cu-it.",
  d=1, skill="Silent letters")
H(FIX + "\n\nPlease {{pass}} me the {{scisors}} from the {{top}} {{drawer}}.",
  [1],
  "The correct spelling is 'scissors': a silent c after the first s, and a double s in the middle.",
  d=1, skill="Proofreading")
S(WHICH, "babies", ["babys", "babyes", "babbies"],
  "When a word ends in a consonant and y, change the y to i and add -es: baby, babies.",
  d=1, skill="Plurals")
C(FILL + "\n\nWe could see the [[1]] on the far side of the lake.",
  [("island", ["iland", "islend", "ilsand"])],
  "Island has a silent s: is-land.",
  d=2, skill="Silent letters")
H(FIX + "\n\nWe {{stopped}} at the {{shop}} and {{bougt}} some {{bread}}.",
  [2],
  "The correct spelling is 'bought', with the silent 'gh': b-o-u-g-h-t, like 'thought' and 'brought'.",
  d=1, skill="Proofreading")

# ---------- Test 2, module 1 ----------
at(2, 1)
S(WHICH, "especially", ["especialy", "espeshally", "expecially"],
  "Especially is especial + ly, so it has a double l. It starts with es-, not ex-.",
  d=2, skill="Adding suffixes")
C(FILL + "\n\nThe recipe calls for two large [[1]].",
  [("potatoes", ["potatos", "potatoe", "potatoess"])],
  "Potato adds -es in the plural: potatoes, like tomatoes and heroes.",
  d=2, skill="Plurals")
H(FIX + "\n\nThe {{science}} {{experiment}} was more {{dificult}} than we {{expected}}.",
  [2],
  "The correct spelling is 'difficult', with a double f: dif-fi-cult.",
  d=1, skill="Proofreading")
S(WHICH, "height", ["hieght", "hight", "heighth"],
  "Height follows 'weight' and 'eight': h-e-i-g-h-t. There is no h at the end.",
  d=2, skill="ie and ei")
C(FILL + "\n\nPlease write your name and [[1]] on the form.",
  [("address", ["adress", "addres", "adresss"])],
  "Address has a double d and a double s: ad-dress.",
  d=1, skill="Double letters")
H(FIX + "\n\nThe {{audience}} {{clapped}} {{loudly}} when the {{musicion}} finished.",
  [3],
  "The correct spelling is 'musician'. It is music + ian, and the c stays: mu-si-cian.",
  d=2, skill="Proofreading")

# ---------- Test 2, module 2 (fixed form) ----------
at(2, 2)
S(WHICH, "opportunity", ["oppertunity", "opportunaty", "oportunity"],
  "Opportunity has a double p and 'port' in the middle: op-por-tu-ni-ty.",
  d=2, skill="Double letters")
C(FILL + "\n\nWe [[1]] the car up the steep driveway.",
  [("pushed", ["pusht", "pushd", "pusshed"])],
  "Regular past tense verbs add -ed even when it sounds like a t: push, pushed.",
  d=1, skill="Adding suffixes")
H(FIX + "\n\nMum wrote the {{date}} of the {{concert}} on the {{calender}} in the {{kitchen}}.",
  [2],
  "The correct spelling is 'calendar', which ends in -ar: cal-en-dar.",
  d=2, skill="Proofreading")
S(WHICH, "vegetable", ["vegtable", "vegetible", "vegatable"],
  "Vegetable has four syllables: veg-e-ta-ble. The second e is often not said aloud.",
  d=2, skill="Unstressed vowels")
C(FILL + "\n\nThe loud music did not [[1]] the sleeping baby.",
  [("affect", ["effect", "afect", "affeck"])],
  "'Affect' is usually the verb (to change something) and 'effect' the noun (the result). Here a verb is needed.",
  d=3, skill="Homophones")
H(FIX + "\n\nWe {{travelled}} {{through}} the desert for {{severel}} {{days}}.",
  [2],
  "The correct spelling is 'several', ending in -al: sev-er-al.",
  d=2, skill="Proofreading")

# ---------- Drill only ----------
at(0)
S(WHICH, "February", ["Febuary", "Februry", "Feburary"],
  "February has an r after the b: Feb-ru-ar-y. Many people leave it out when they speak.",
  d=2, skill="Tricky words")
S(WHICH, "knives", ["knifes", "knivs", "nives"],
  "Most words ending in -fe change to -ves in the plural: knife, knives; wife, wives.",
  d=2, skill="Plurals")
C(FILL + "\n\nThe rabbit was [[1]] across the paddock.",
  [("hopping", ["hoping", "hopeing", "hoppping"])],
  "Hop has a short vowel and one final consonant, so the p doubles: hopping. 'Hoping' comes from 'hope'.",
  d=2, skill="Adding suffixes")
H(FIX + "\n\nMy {{neighbour}} {{reconized}} me at the {{train}} {{station}}.",
  [1],
  "The correct spelling is 'recognised' in Australian spelling. It keeps the g: re-cog-nised.",
  d=2, skill="Proofreading")
C(FILL + "\n\nThe new rules [[1]] next Monday.",
  [("begin", ["beggin", "begine", "biggin"])],
  "Begin has one g and one n: be-gin.",
  d=1, skill="Tricky words")
S(WHICH, "excellent", ["excelent", "exellent", "excellant"],
  "Excellent has 'xc', a double l and ends in -ent: ex-cel-lent.",
  d=2, skill="Double letters")
H(FIX + "\n\nWe {{carryed}} the {{heavy}} {{boxes}} {{upstairs}}.",
  [0],
  "The correct spelling is 'carried'. When a verb ends in a consonant and y, change the y to i before -ed.",
  d=1, skill="Proofreading")
C(FILL + "\n\nThe bell rang at exactly the same [[1]] every day.",
  [("minute", ["minit", "minnute", "minuite"])],
  "Minute is spelled m-i-n-u-t-e, even though the second part sounds like 'it'.",
  d=1, skill="Unstressed vowels")
