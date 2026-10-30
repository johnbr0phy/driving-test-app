# Grammar and Punctuation (napGrammar).

PUNCT = "Which sentence is punctuated correctly?"
DONE = "Choose the option that correctly completes the sentence."

# ---------- Test 1, module 1 ----------
at(1, 1)
C(DONE + "\n\nThe box of old photos [[1]] in the hallway cupboard.",
  [("is", ["are", "were", "have been"])],
  "The subject is 'box', which is singular; 'of old photos' only describes it. A singular subject takes 'is'.",
  d=1, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "The bus was late, so we missed the start of the film.",
  ["The bus was late so, we missed the start of the film.",
   "The bus was late, so, we missed the start of the film.",
   "The bus was late so we missed, the start of the film."],
  "When 'so' joins two complete clauses, the comma goes before it. No comma follows 'so'.",
  d=1, skill="Commas with conjunctions", basics="commaSplices")
C(DONE + "\n\nAll of the [[1]] lockers were painted over the holidays.",
  [("students'", ["student's", "students", "students's"])],
  "The lockers belong to many students. For a plural ending in s, the apostrophe goes after the s: students'.",
  d=2, skill="Apostrophes", basics="apostrophes")
C(DONE + "\n\nBy the time the firefighters arrived, the fire [[1]] already spread to the shed.",
  [("had", ["has", "have", "is"])],
  "The spreading happened before the firefighters arrived, which is already in the past. An earlier past action takes the past perfect: had spread.",
  d=2, skill="Verb tense", basics="verbTense")
S("Which word in this sentence is a conjunction?\n\nAlthough it was raining, the match went ahead.",
  "Although", ["raining", "match", "ahead"],
  "'Although' joins the subordinate clause 'it was raining' to the main clause. A conjunction links clauses.",
  d=2, skill="Word classes")
C(DONE + "\n\nThe coach gave the trophy to Priya and [[1]].",
  [("me", ["I", "myself", "mine"])],
  "After 'to', use the object pronoun 'me'. Test it by removing Priya: 'gave the trophy to me', not 'to I'.",
  d=2, skill="Pronouns", basics="pronounCase")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
S(PUNCT,
  "The results were clear; the new design used less energy.",
  ["The results were clear, the new design used less energy.",
   "The results were clear; and the new design used less energy.",
   "The results were; clear the new design used less energy."],
  "A semicolon joins two closely related complete sentences without a conjunction. A comma alone between them is a comma splice.",
  d=2, skill="Semicolons", basics="semicolons")
C(DONE + "\n\nNeither the captain nor the players [[1]] happy with the umpire's decision.",
  [("were", ["was", "is", "has been"])],
  "With 'neither ... nor', the verb agrees with the nearer subject. 'Players' is plural, so the verb is 'were'.",
  d=3, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "The kit had three parts: a tent, a stove and a water filter.",
  ["The kit had: three parts, a tent, a stove and a water filter.",
   "The kit had three parts; a tent, a stove and a water filter.",
   "The kit had three parts, a tent: a stove and a water filter."],
  "A colon introduces a list after a complete clause ('The kit had three parts'). A colon should not split a verb from its object.",
  d=3, skill="Colons", basics="colons")
C(DONE + "\n\nThe scientist [[1]] research changed the treatment of burns was invited to speak.",
  [("whose", ["who's", "who", "which"])],
  "'Whose' shows that the research belongs to the scientist. 'Who's' means 'who is'.",
  d=3, skill="Relative pronouns", basics="pronounCase")
S(PUNCT,
  '"We leave at dawn," said the guide, "so pack tonight."',
  ['"We leave at dawn" said the guide, "so pack tonight."',
   '"We leave at dawn," said the guide, "So pack tonight."',
   '"We leave at dawn," said the guide. "so pack tonight."'],
  "The comma after 'dawn' goes inside the speech marks. The sentence continues after 'said the guide', so a comma follows and 'so' stays lower case.",
  d=3, skill="Direct speech")
S("Which sentence uses the passive voice?",
  "The bridge was opened by the mayor.",
  ["The mayor opened the bridge.",
   "The mayor will open the bridge.",
   "The mayor was opening the bridge."],
  "In the passive voice the thing acted on (the bridge) is the subject, and the doer comes after 'by'. 'Was opening' is active: the mayor is still doing it.",
  d=3, skill="Active and passive voice")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
C(DONE + "\n\nMy brother and I [[1]] going to the show on Saturday.",
  [("are", ["is", "am", "was"])],
  "'My brother and I' is two people, a plural subject, so the verb is 'are'.",
  d=1, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "We bought bread, milk, eggs and apples.",
  ["We bought bread milk, eggs and apples.",
   "We bought, bread, milk, eggs and apples.",
   "We bought bread, milk eggs, and apples."],
  "Commas separate the items in a list. No comma goes between the verb 'bought' and the list.",
  d=1, skill="Commas in lists")
C(DONE + "\n\nLast week the class [[1]] a new captain.",
  [("chose", ["choosed", "chosen", "choose"])],
  "'Last week' puts the action in the past. 'Choose' is irregular: its simple past is 'chose'. 'Chosen' needs a helper verb (has chosen), and 'choosed' is not a word.",
  d=2, skill="Verb tense", basics="verbTense")
C(DONE + "\n\nThe [[1]] books are on the bottom shelf.",
  [("children's", ["childrens'", "childrens", "children"])],
  "'Children' is already plural without an s, so add apostrophe s to show the books belong to them: children's. 'Childrens' is not a word.",
  d=2, skill="Apostrophes", basics="apostrophes")
S("Which word in this sentence should start with a capital letter?\n\nAt the festival we tried some japanese food.",
  "japanese", ["festival", "some", "food"],
  "'Japanese' comes from the name of a country, Japan, so it is a proper adjective and takes a capital letter. 'Festival' and 'food' are common nouns.",
  d=1, skill="Capital letters")
S("Which word is an adjective in this sentence?\n\nThe tired runners crossed the line.",
  "tired", ["runners", "crossed", "line"],
  "An adjective describes a noun. 'Tired' describes the runners.",
  d=2, skill="Word classes")

# ---------- Test 2, module 1 ----------
at(2, 1)
C(DONE + "\n\nEach of the paintings [[1]] a small label underneath it.",
  [("has", ["have", "were having", "are having"])],
  "The subject is 'each', which is singular, so the verb is 'has'. 'Of the paintings' does not change the subject.",
  d=2, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "Our neighbour, who grows tomatoes, gave us a box of them.",
  ["Our neighbour who grows tomatoes, gave us a box of them.",
   "Our neighbour, who grows tomatoes gave us a box of them.",
   "Our neighbour who, grows tomatoes, gave us a box of them."],
  "'Who grows tomatoes' is extra information, so it is set off by a pair of commas, one on each side.",
  d=2, skill="Commas with clauses")
C(DONE + "\n\nIf I [[1]] more time, I would finish the model tonight.",
  [("had", ["have", "will have", "has"])],
  "This is an imagined situation ('I would finish'), so the if-clause takes the past tense: if I had.",
  d=2, skill="Verb tense", basics="verbTense")
C(DONE + "\n\n[[1]] going to be a long drive, so bring a book.",
  [("It's", ["Its", "Its'", "Its's"])],
  "'It's' is short for 'it is': it is going to be a long drive. 'Its' shows belonging, like 'his' or 'her'.",
  d=2, skill="Apostrophes", basics="apostrophes")
S("Which sentence is a complex sentence?",
  "When the bell rang, everyone left.",
  ["The bell rang and everyone left.",
   "Everyone left.",
   "The bell rang loudly."],
  "A complex sentence has a main clause and a subordinate clause. 'When the bell rang' cannot stand alone and depends on 'everyone left'.",
  d=2, skill="Sentence types")
C(DONE + "\n\nThe teacher spoke [[1]] so that the baby next door would not wake.",
  [("quietly", ["quiet", "quieter", "quietest"])],
  "An adverb is needed to describe how the teacher spoke: quietly. 'Quiet' is an adjective.",
  d=1, skill="Adverbs")

# ---------- Test 2, module 2 ----------
at(2, 2)
S(PUNCT,
  "The forecast was poor; however, the race went ahead.",
  ["The forecast was poor, however the race went ahead.",
   "The forecast was poor however, the race went ahead.",
   "The forecast was poor; however the race, went ahead."],
  "'However' is not a conjunction, so it cannot join two sentences with a comma. Use a semicolon before it and a comma after.",
  d=3, skill="Semicolons", basics="semicolons")
C(DONE + "\n\nThe number of students who walk to school [[1]] risen this year.",
  [("has", ["have", "are", "were"])],
  "The subject is 'the number', which is singular, so the verb is 'has'. 'A number of students have' would be plural, but 'the number' is not.",
  d=3, skill="Subject-verb agreement", basics="subjectVerb")
C(DONE + "\n\nThe prize will go to [[1]] finishes the puzzle first.",
  [("whoever", ["whomever", "whom", "who's"])],
  "'Whoever' is the subject of 'finishes'. The whole clause is the object of 'to', but inside it 'whoever' does the finishing.",
  d=3, skill="Pronouns", basics="pronounCase")
S(PUNCT,
  "My aunt lives in three places: Darwin in winter, Hobart in summer and Adelaide in between.",
  ["My aunt lives in: three places, Darwin in winter, Hobart in summer and Adelaide in between.",
   "My aunt lives in three places; Darwin in winter, Hobart in summer and Adelaide in between.",
   "My aunt lives, in three places: Darwin in winter, Hobart in summer and Adelaide in between."],
  "A colon after the complete clause 'My aunt lives in three places' introduces the list. A semicolon cannot introduce a list.",
  d=3, skill="Colons", basics="colons")
S("Which sentence uses a modal verb to show the strongest obligation?",
  "Visitors must sign in at the office.",
  ["Visitors might sign in at the office.",
   "Visitors could sign in at the office.",
   "Visitors may sign in at the office."],
  "'Must' expresses a requirement. 'Might', 'could' and 'may' express possibility or permission.",
  d=2, skill="Modal verbs")
C(DONE + "\n\nHaving finished the test early, [[1]].",
  [("Sam checked every answer", ["every answer was checked by Sam", "the answers were checked", "there was time to check"])],
  "The opening phrase describes who finished early, so that person must come straight after the comma. Otherwise the phrase dangles: the answers did not finish the test.",
  d=3, skill="Dangling modifiers")

# ---------- Drill only ----------
at(0)
C(DONE + "\n\nThe list of winners [[1]] posted on the noticeboard.",
  [("was", ["were", "are", "have been"])],
  "The subject is 'list', which is singular. 'Of winners' describes it, so the verb is 'was'.",
  d=2, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "I wanted to swim; the pool was closed.",
  ["I wanted to swim, the pool was closed.",
   "I wanted to swim the pool, was closed.",
   "I wanted; to swim the pool was closed."],
  "Two complete sentences joined by only a comma make a comma splice. A semicolon fixes it.",
  d=2, skill="Comma splices", basics="commaSplices")
C(DONE + "\n\nThe two [[1]] uniforms were washed together.",
  [("teams'", ["team's", "teams", "teams's"])],
  "Two teams own the uniforms. A plural ending in s takes the apostrophe after the s: teams'.",
  d=2, skill="Apostrophes", basics="apostrophes")
C(DONE + "\n\nShe has [[1]] in the choir since Year 7.",
  [("sung", ["sang", "sing", "singed"])],
  "After 'has', use the past participle: has sung. 'Sang' is the simple past.",
  d=2, skill="Verb tense", basics="verbTense")
C(DONE + "\n\nThe teacher asked Lena and [[1]] to hand out the books.",
  [("me", ["I", "myself", "mine"])],
  "Remove 'Lena and': 'asked me to hand out'. 'Me' is the object of 'asked'.",
  d=1, skill="Pronouns", basics="pronounCase")
S(PUNCT,
  "We need three things for the hike: water, a map and a hat.",
  ["We need: three things for the hike, water, a map and a hat.",
   "We need three things for the hike, water: a map and a hat.",
   "We need three things; for the hike water, a map and a hat."],
  "A colon after a complete clause introduces the list that explains it.",
  d=2, skill="Colons", basics="colons")
S(PUNCT,
  "The match was cancelled; the oval was flooded.",
  ["The match was cancelled, the oval was flooded.",
   "The match was cancelled the oval, was flooded.",
   "The match; was cancelled the oval was flooded."],
  "Two related complete sentences can be joined with a semicolon. Joining them with only a comma is a comma splice.",
  d=1, skill="Semicolons", basics="semicolons")
C(DONE + "\n\nEvery one of the players [[1]] a water bottle.",
  [("needs", ["need", "are needing", "have needed"])],
  "The subject is 'every one', which is singular, so the verb is 'needs'.",
  d=2, skill="Subject-verb agreement", basics="subjectVerb")
