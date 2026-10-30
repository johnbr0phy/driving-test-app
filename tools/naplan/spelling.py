# Spelling (napSpelling). The real test opens with audio dictation, which is
# not modelled; these are the proofreading and choice formats. Australian
# spelling; words whose British and American forms differ are avoided.

WHICH = "Which word is spelled correctly?"
FIX = "One word in this sentence is spelled incorrectly. Select it."

# ---------- Test 1, module 1 ----------
at(1, 1)
S(WHICH, "necessary", ["neccessary", "necessery", "nessecary"],
  "Necessary has one c and a double s: ne-c-e-ss-ary. A memory trick: one collar, two sleeves.",
  d=1, skill="Double letters")
C("Choose the correct word to complete the sentence.\n\nThe students were asked to [[1]] their recycling into three bins.",
  [("separate", ["seperate", "separete", "sepparate"])],
  "Separate has 'par' in the middle: se-par-ate. 'Seperate' is one of the most common misspellings in English.",
  d=1, skill="Unstressed vowels")
H(FIX + "\n\nThe {{coach}} said our {{team}} would {{definately}} {{play}} in the {{final}}.",
  [2],
  "The correct spelling is 'definitely': it is built on 'finite', so it has i, i and an e at the end.",
  d=1, skill="Proofreading")
S(WHICH, "receive", ["recieve", "receeve", "resieve"],
  "After c, the e comes before the i: receive, ceiling, deceive.",
  d=1, skill="ie and ei")
C("Choose the correct word to complete the sentence.\n\nThe new library will be open from the [[1]] of March.",
  [("beginning", ["begining", "beggining", "beginnig"])],
  "Begin ends in a stressed short vowel and one consonant, so the n doubles before -ing: beginning.",
  d=2, skill="Adding suffixes")
H(FIX + "\n\nIt was {{embarassing}} when my {{phone}} rang {{during}} the {{quiet}} {{assembly}}.",
  [0],
  "Embarrassing has a double r and a double s. Think 'really red, so shy'.",
  d=2, skill="Proofreading")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
S(WHICH, "accommodation", ["accomodation", "acommodation", "accommadation"],
  "Accommodation has a double c and a double m: it accommodates both.",
  d=2, skill="Double letters")
H(FIX + "\n\nThe {{committee}} gave {{priority}} to {{maintainance}} of the {{existing}} {{buildings}}.",
  [2],
  "The correct spelling is 'maintenance'. The verb is 'maintain', but the noun drops the i: main-ten-ance.",
  d=3, skill="Proofreading")
C("Choose the correct word to complete the sentence.\n\nThe flooding was an unusual [[1]] for a town so far from the coast.",
  [("occurrence", ["occurence", "ocurrence", "occurrance"])],
  "Occur ends in a stressed vowel and one r, so the r doubles: occurrence. The ending is -ence, as in 'difference'.",
  d=3, skill="Adding suffixes")
S(WHICH, "conscientious", ["consciencious", "conscientous", "concientious"],
  "Conscientious keeps 'science' in the middle: con-science-tious, with -tious at the end.",
  d=3, skill="Tricky words")
H(FIX + "\n\nThe {{speech}} was {{persuasive}}, but some {{statements}} were {{irrelevent}} to the {{topic}}.",
  [3],
  "The correct spelling is 'irrelevant': ir + relevant, and relevant ends in -ant.",
  d=3, skill="Proofreading")
C("Choose the correct word to complete the sentence.\n\nThe band kept a steady [[1]] all through the song.",
  [("rhythm", ["rythm", "rhythym", "rhytm"])],
  "Rhythm has no vowel except the y: r-h-y-t-h-m. 'Rhythm helps your two hips move' gives the letters.",
  d=3, skill="Silent letters")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
S(WHICH, "believe", ["beleive", "belive", "beleave"],
  "I before e except after c: believe. 'Never believe a lie' helps, since 'lie' sits inside believe.",
  d=1, skill="ie and ei")
C("Choose the correct word to complete the sentence.\n\nWe will finish the project [[1]].",
  [("tomorrow", ["tommorow", "tomorow", "tommorrow"])],
  "Tomorrow has one m and a double r.",
  d=1, skill="Double letters")
H(FIX + "\n\nMy {{freind}} {{brought}} her {{dog}} to the {{beach}}.",
  [0],
  "The correct spelling is 'friend'. A trick: you will be friends to the end, so the word ends in -end.",
  d=1, skill="Proofreading")
S(WHICH, "library", ["libary", "librery", "liberry"],
  "Library has two rs: li-brar-y. Say it slowly to hear both.",
  d=1, skill="Unstressed vowels")
C("Choose the correct word to complete the sentence.\n\nMum asked me to put the plates in the [[1]].",
  [("cupboard", ["cubbord", "cupbored", "cubboard"])],
  "Cupboard is a compound word: cup + board, even though the p is silent when we say it.",
  d=1, skill="Compound words")
H(FIX + "\n\nWe {{waited}} {{untill}} the {{rain}} {{stopped}}.",
  [1],
  "The correct spelling is 'until', with one l. 'Till' has two, but 'until' does not.",
  d=2, skill="Proofreading")

# ---------- Test 2, module 1 ----------
at(2, 1)
S(WHICH, "government", ["goverment", "governmant", "govenment"],
  "Government is built from 'govern' + '-ment', so the n stays: govern-ment.",
  d=1, skill="Adding suffixes")
H(FIX + "\n\nThe {{weather}} {{forecast}} said the {{temprature}} would {{reach}} {{thirty}} degrees.",
  [2],
  "The correct spelling is 'temperature': tem-per-a-ture. The 'per' is often swallowed when people say it.",
  d=2, skill="Proofreading")
C("Choose the correct word to complete the sentence.\n\nShe was [[1]] by how quickly the tickets sold out.",
  [("surprised", ["suprised", "surprized", "surprissed"])],
  "Surprise has two rs: sur-prise. The 'sur' is the same as in 'surface'.",
  d=2, skill="Tricky words")
S(WHICH, "environment", ["enviroment", "envirnment", "environmant"],
  "Environment keeps the n from 'environ': environ + ment.",
  d=2, skill="Adding suffixes")
C("Choose the correct word to complete the sentence.\n\nThe crowd was [[1]] when the concert was cancelled.",
  [("disappointed", ["dissappointed", "disapointed", "disappionted"])],
  "Disappointed is dis + appointed: one s from 'dis', then the double p of 'appoint'.",
  d=1, skill="Prefixes")
H(FIX + "\n\nThe {{athletes}} showed {{great}} {{disipline}} in {{training}}.",
  [2],
  "The correct spelling is 'discipline': d-i-s-c-i-p-l-i-n-e. The sc is like the sc in 'science'.",
  d=2, skill="Proofreading")

# ---------- Test 2, module 2 ----------
at(2, 2)
S(WHICH, "parliament", ["parliment", "parlament", "parliamant"],
  "Parliament has an i before the a: par-lia-ment.",
  d=3, skill="Tricky words")
C("Choose the correct word to complete the sentence.\n\nThe road works were only [[1]], so the old surface was back within a year.",
  [("temporary", ["temporery", "tempory", "temperary"])],
  "Temporary is tem-por-ar-y, related to 'temporal'. The middle 'or' is often dropped in speech.",
  d=3, skill="Unstressed vowels")
H(FIX + "\n\nThe {{company}} offered a {{guarentee}} that {{every}} {{repair}} would {{last}}.",
  [1],
  "The correct spelling is 'guarantee': g-u-a-r-a-n-t-e-e. The u is silent, as in 'guard'.",
  d=3, skill="Proofreading")
S(WHICH, "mischievous", ["mischievious", "mischevous", "mischeivous"],
  "Mischievous has three syllables: mis-chie-vous. There is no i before the -ous.",
  d=3, skill="Tricky words")
C("Choose the correct word to complete the sentence.\n\nThe artist was [[1]] for her use of colour.",
  [("acknowledged", ["aknowledged", "acknowleged", "acknoledged"])],
  "Acknowledged is ac + knowledge + d. It keeps the c before the k and the d before the ge of knowledge.",
  d=3, skill="Silent letters")
H(FIX + "\n\nIt is {{noticable}} that {{fewer}} {{people}} {{visit}} in {{winter}}.",
  [0],
  "The correct spelling is 'noticeable'. The e of 'notice' stays before -able to keep the c soft.",
  d=3, skill="Proofreading")

# ---------- Drill only ----------
at(0)
S(WHICH, "immediately", ["immediatly", "imediately", "immedietly"],
  "Immediately is immediate + ly, so the e stays, and it starts with a double m.",
  d=2, skill="Adding suffixes")
C("Choose the correct word to complete the sentence.\n\nThe [[1]] parked across two spaces.",
  [("vehicle", ["vehical", "veicle", "vehicel"])],
  "Vehicle has a silent h and ends in -cle, like 'article'.",
  d=2, skill="Silent letters")
H(FIX + "\n\nHe was {{ready}} to {{argue}} his {{arguement}} in {{front}} of the {{class}}.",
  [2],
  "The correct spelling is 'argument'. The e of 'argue' is dropped before -ment.",
  d=2, skill="Proofreading")
S(WHICH, "Wednesday", ["Wensday", "Wednsday", "Wedensday"],
  "Wednesday keeps the silent d: Wed-nes-day. Saying 'Wed-nes-day' slowly helps.",
  d=1, skill="Silent letters")
C("Choose the correct word to complete the sentence.\n\nWe stood in a long [[1]] for the ride.",
  [("queue", ["que", "queu", "cue"])],
  "Queue is q-u-e-u-e. 'Cue' sounds the same but is a signal or a pool stick.",
  d=1, skill="Homophones")
S(WHICH, "unnecessary", ["unecessary", "unnecesary", "unneccessary"],
  "Un + necessary, so there are two ns, then necessary's one c and double s.",
  d=2, skill="Prefixes")
S("Which word correctly completes the sentence?\n\nThe storm had a big ____ on the town.",
  "effect", ["affect", "efect", "affeckt"],
  "Here a noun is needed (a big ___), and the noun is usually 'effect'. 'Affect' is usually the verb: the storm affected the town.",
  d=2, skill="Homophones")
S("Which word correctly completes the sentence?\n\nThe students left ____ bags in the hall.",
  "their", ["there", "they're", "thier"],
  "'Their' shows belonging. 'There' is a place, and 'they're' means 'they are'.",
  d=1, skill="Homophones")
