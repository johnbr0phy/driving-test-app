# Grammar and Punctuation (nap7Grammar). Year 7 level.

PUNCT = "Which sentence is punctuated correctly?"
DONE = "Choose the option that correctly completes the sentence."

# ---------- Test 1, module 1 ----------
at(1, 1)
C(DONE + "\n\nEach of the puppies [[1]] a red collar.",
  [("has", ["have", "are having", "were having"])],
  "The subject is 'Each', which is singular; 'of the puppies' only describes it. A singular subject takes 'has'.",
  d=2, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "We packed sandwiches, apples, water and sunscreen.",
  ["We packed, sandwiches, apples, water and sunscreen.",
   "We packed sandwiches apples, water, and, sunscreen.",
   "We packed sandwiches, apples, water, and, sunscreen."],
  "Commas separate the items in a list. No comma goes after the verb 'packed', and none goes after 'and'.",
  d=1, skill="Commas in lists")
C(DONE + "\n\nThe dog wagged [[1]] tail when we came home.",
  [("its", ["it's", "its'", "it is"])],
  "'Its' with no apostrophe shows ownership, like 'his' or 'her'. 'It's' always means 'it is' or 'it has'.",
  d=1, skill="Its and it's", basics="itsIts")
C(DONE + "\n\nYesterday we [[1]] to the beach after school.",
  [("went", ["go", "gone", "going"])],
  "'Yesterday' sets the action in the past, so the simple past 'went' is needed. 'Gone' needs a helper such as 'have'.",
  d=1, skill="Verb tense", basics="verbTense")
S("Which word in this sentence is an adjective?\n\nThe tired players walked slowly off the field.",
  "tired", ["players", "slowly", "walked"],
  "An adjective describes a noun. 'Tired' describes the players. 'Slowly' is an adverb that describes how they walked.",
  d=1, skill="Word classes")
S(PUNCT,
  "\"Can I borrow your ruler?\" asked Sam.",
  ["\"Can I borrow your ruler\"? asked Sam.",
   "\"Can I borrow your ruler,\" asked Sam?",
   "Can I borrow your ruler? \"asked Sam.\""],
  "The question mark belongs to the spoken words, so it goes inside the closing speech mark. Only the spoken words are in quotation marks.",
  d=2, skill="Direct speech")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
C(DONE + "\n\nEither the twins or their cousin [[1]] bringing the drinks to the picnic.",
  [("is", ["are", "were", "have been"])],
  "With 'either... or', the verb agrees with the nearer subject. 'Their cousin' is one person, so 'is' is needed.",
  d=3, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "The children's playground was closed for repairs.",
  ["The childrens' playground was closed for repairs.",
   "The childrens playground was closed for repairs.",
   "The children's' playground was closed for repairs."],
  "'Children' is already plural and does not end in s, so add 's: children's.",
  d=3, skill="Apostrophes", basics="apostrophes")
C(DONE + "\n\nBetween you and [[1]], I think the second film was better than the first.",
  [("me", ["I", "myself", "mine"])],
  "'Between' is a preposition, so the pronouns after it are objects: between you and me. 'Between you and I' is a common slip.",
  d=2, skill="Pronouns", basics="pronounCase")
S("Which sentence is written correctly?",
  "It started to rain, so we went inside.",
  ["It started to rain, we went inside.",
   "It started to rain we went inside.",
   "It started to rain, so, we went inside."],
  "Two complete sentences cannot be joined by a comma alone. Adding the conjunction 'so' after the comma joins them correctly.",
  d=3, skill="Comma splices", basics="commaSplices")
C(DONE + "\n\nIf we [[1]] a bigger car, we could take the whole team to the game.",
  [("had", ["have", "will have", "has"])],
  "This 'if' sentence imagines something that is not true now. 'Could' in the main clause pairs with the past form 'had' in the 'if' clause.",
  d=3, skill="Verb tense", basics="verbTense")
H("Which word in this sentence is a pronoun? Select it.\n\n{{After}} the {{storm}}, {{they}} {{repaired}} the fence.",
  [2],
  "A pronoun takes the place of a noun. 'They' stands in for the people who repaired the fence.",
  d=2, skill="Word classes")
at(0)  # extra items for the drill pool
S("Which word best joins these two ideas?\n\nThe test was hard. ___ most students passed.",
  "However,", ["Therefore,", "Because", "For example,"],
  "The second idea is a contrast: you might expect a hard test to be failed, but most passed. 'However' signals a contrast.",
  d=2, skill="Connectives")
C(DONE + "\n\nThe orchestra played softly [[1]] the students sang the anthem.",
  [("while", ["during", "despite", "meanwhile"])],
  "Only 'while' is a conjunction that can join two clauses, meaning 'during the time that'. 'During' and 'despite' must be followed by a noun, and 'meanwhile' cannot join clauses.",
  d=2, skill="Conjunctions")
S(PUNCT,
  "My aunt, who lives in Darwin, is visiting next week.",
  ["My aunt who lives in Darwin, is visiting next week.",
   "My aunt, who lives in Darwin is visiting next week.",
   "My aunt who, lives in Darwin, is visiting next week."],
  "Extra information in the middle of a sentence needs a comma before and after it, like brackets.",
  d=3, skill="Commas with clauses")
C(DONE + "\n\nOf the three runners, Jess was the [[1]].",
  [("fastest", ["faster", "most fast", "more fastest"])],
  "Comparing three or more uses the superlative, -est. 'Faster' compares only two.",
  d=2, skill="Comparatives")
S(PUNCT,
  "We visited Perth, Adelaide and Hobart in April.",
  ["We visited perth, adelaide and hobart in april.",
   "We visited Perth, Adelaide and Hobart in april.",
   "we visited Perth, Adelaide and Hobart in April."],
  "Names of places, months and the first word of a sentence all start with a capital letter.",
  d=2, skill="Capital letters")
C(DONE + "\n\nThe girls [[1]] been practising all week.",
  [("have", ["has", "is", "was"])],
  "'The girls' is plural, so the helper verb is 'have': the girls have been practising.",
  d=2, skill="Subject-verb agreement", basics="subjectVerb")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
C(DONE + "\n\nMy cousins from Cairns [[1]] staying with us for the holidays.",
  [("are", ["is", "was", "has"])],
  "The subject is 'my cousins', which is plural, so it takes 'are'. 'From Cairns' only describes them.",
  d=1, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "Did you watch the fireworks on New Year's Eve?",
  ["Did you watch the fireworks on New Year's Eve.",
   "Did you watch the fireworks on new year's eve?",
   "did you watch the fireworks on New Year's Eve?"],
  "The sentence asks a question, so it ends with a question mark. New Year's Eve is the name of a day, so each word takes a capital, and so does the first word of the sentence.",
  d=1, skill="Sentence punctuation")
C(DONE + "\n\nThe [[1]] bikes were left outside the gym.",
  [("boys'", ["boy's", "boys", "boys's"])],
  "'Bikes' (plural) belong to many boys. For a plural ending in s, the apostrophe goes after the s: boys'.",
  d=2, skill="Apostrophes", basics="apostrophes")
S("Which word in this sentence is a verb?\n\nThe kookaburra laughed loudly from the gum tree.",
  "laughed", ["kookaburra", "loudly", "tree"],
  "A verb is a doing word. 'Laughed' is what the kookaburra did.",
  d=1, skill="Word classes")
C(DONE + "\n\nThe cat sat on the mat [[1]] the dog slept by the fire.",
  [("while", ["because", "if", "unless"])],
  "Both things happen at the same time, so 'while' joins them. 'Because' would wrongly say one caused the other.",
  d=1, skill="Conjunctions")
C(DONE + "\n\nLast summer, Grandpa [[1]] us how to fish.",
  [("taught", ["teached", "teaches", "teach"])],
  "'Last summer' is in the past. 'Teach' is an irregular verb, and its past form is 'taught'.",
  d=1, skill="Verb tense", basics="verbTense")
at(0)  # extra items for the drill pool
S(PUNCT,
  "It's going to be hot today.",
  ["Its going to be hot today.",
   "Its' going to be hot today.",
   "It,s going to be hot today."],
  "'It's' is short for 'it is', and the apostrophe shows where the i is missing.",
  d=1, skill="Its and it's", basics="itsIts")
C(DONE + "\n\nMum made sandwiches for Kai and [[1]].",
  [("him", ["he", "his", "himself"])],
  "After 'for', use the object pronoun 'him'. Test it alone: 'made sandwiches for him', not 'for he'.",
  d=2, skill="Pronouns", basics="pronounCase")
S("Which word best completes the sentence?\n\nI was hungry, ___ I made a sandwich.",
  "so", ["but", "or", "because"],
  "Making a sandwich is the result of being hungry. 'So' introduces a result.",
  d=1, skill="Conjunctions")
C(DONE + "\n\nWe could hear the waves from [[1]] tent.",
  [("our", ["are", "hour", "ours"])],
  "'Our' shows the tent belongs to us. 'Are' is a verb and 'hour' is a measure of time.",
  d=1, skill="Homophones", basics="commonlyConfused")

# ---------- Test 2, module 1 ----------
at(2, 1)
C(DONE + "\n\nThe packet of biscuits [[1]] already empty.",
  [("is", ["are", "were", "have been"])],
  "The subject is 'packet', which is singular; 'of biscuits' only describes it. A singular subject takes 'is'.",
  d=2, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "\"Hurry up,\" said Dad, \"or we'll miss the bus.\"",
  ["\"Hurry up\" said Dad, \"or we'll miss the bus.\"",
   "\"Hurry up,\" said Dad, \"Or we'll miss the bus.\"",
   "\"Hurry up,\" said Dad \"or we'll miss the bus\"."],
  "When a quote is split, a comma ends the first part inside the speech marks, a comma follows 'said Dad', and the second part continues with a small letter because it is the same sentence.",
  d=3, skill="Direct speech")
C(DONE + "\n\n[[1]] going to the athletics carnival on Friday.",
  [("They're", ["Their", "There", "Theyre"])],
  "'They're' is short for 'they are': they are going to the carnival.",
  d=1, skill="Homophones", basics="commonlyConfused")
S("Which word in this sentence is an adverb?\n\nThe driver carefully reversed the truck.",
  "carefully", ["driver", "reversed", "truck"],
  "An adverb tells how, when or where something happens. 'Carefully' tells how the driver reversed.",
  d=1, skill="Word classes")
C(DONE + "\n\nWhen we reached the station, the last train [[1]] already left.",
  [("had", ["has", "have", "is"])],
  "The train left before we reached the station, and reaching it is already in the past. The earlier past action takes 'had'.",
  d=2, skill="Verb tense", basics="verbTense")
S(PUNCT,
  "The bus was late, but we still got there on time.",
  ["The bus was late but, we still got there on time.",
   "The bus was late, but, we still got there on time.",
   "The bus was late but we, still got there on time."],
  "When 'but' joins two complete clauses, the comma goes before 'but', not after it.",
  d=2, skill="Commas with conjunctions", basics="commaSplices")

# ---------- Test 2, module 2 (fixed form) ----------
at(2, 2)
C(DONE + "\n\nEveryone in the class [[1]] to go on the excursion.",
  [("wants", ["want", "are wanting", "were wanting"])],
  "'Everyone' is singular even though it refers to many people, so it takes 'wants'.",
  d=2, skill="Subject-verb agreement", basics="subjectVerb")
S(PUNCT,
  "The swimmers' times were posted after the race.",
  ["The swimmers times were posted after the race.",
   "The swimmers times' were posted after the race.",
   "The swimmers's times were posted after the race."],
  "The times belong to several swimmers. For a plural ending in s, the apostrophe goes after the s: swimmers'.",
  d=3, skill="Apostrophes", basics="apostrophes")
C(DONE + "\n\nThe bird flapped [[1]] wings and flew away.",
  [("its", ["it's", "its'", "it is"])],
  "'Its' without an apostrophe shows that the wings belong to the bird.",
  d=2, skill="Its and it's", basics="itsIts")
S("Which sentence is written correctly?",
  "The library is closed today. It opens again on Monday.",
  ["The library is closed today, it opens again on Monday.",
   "The library is closed today it opens again on Monday.",
   "The library is closed today, it, opens again on Monday."],
  "These are two complete sentences. They need a full stop between them (or a joining word), not just a comma.",
  d=3, skill="Comma splices", basics="commaSplices")
H("Which word in this sentence is a noun? Select it.\n\n{{Quickly}}, the {{brave}} {{lifeguard}} {{swam}} out.",
  [2],
  "A noun names a person, place or thing. 'Lifeguard' names a person. 'Brave' is an adjective and 'swam' is a verb.",
  d=2, skill="Word classes")
C(DONE + "\n\nSophie and [[1]] built the sandcastle together.",
  [("I", ["me", "myself", "my"])],
  "'Sophie and I' is the subject of 'built', so the subject pronoun 'I' is needed. Test it alone: 'I built', not 'me built'.",
  d=3, skill="Pronouns", basics="pronounCase")
at(0)  # extra items for the drill pool
S("Which word best joins these two ideas?\n\nWe wanted to swim. ___ the water was too cold.",
  "However,", ["As a result,", "For example,", "Similarly,"],
  "The second idea goes against the first: they wanted to swim, but could not. 'However' shows a contrast.",
  d=2, skill="Connectives")
C(DONE + "\n\nThis week my sister [[1]] her first job at the bakery.",
  [("started", ["start", "starting", "have started"])],
  "The sentence reports something that has happened, so the past tense 'started' fits. 'Have started' does not agree with 'my sister'.",
  d=2, skill="Verb tense", basics="verbTense")
S(PUNCT,
  "On Saturday, we will visit Uluru.",
  ["On Saturday we, will visit Uluru.",
   "On saturday, we will visit Uluru.",
   "On Saturday, we will visit uluru."],
  "Days of the week and place names take capital letters. A comma can follow a short opening phrase such as 'On Saturday'.",
  d=2, skill="Capital letters")
C(DONE + "\n\nOf the two puzzles, the second one was [[1]].",
  [("harder", ["hardest", "more harder", "most hard"])],
  "Comparing two things uses the comparative, -er. 'Hardest' is for three or more.",
  d=2, skill="Comparatives")
C(DONE + "\n\nThe principal will [[1]] the new library on Friday.",
  [("open", ["opened", "opens", "opening"])],
  "After 'will', use the base form of the verb: will open.",
  d=1, skill="Verb tense", basics="verbTense")
S("Which sentence uses 'whose' correctly?",
  "That is the girl whose dog won the show.",
  ["Whose going to the shops?",
   "I know whose at the door.",
   "The boy, whose late, missed the bus."],
  "'Whose' shows ownership: the dog belongs to the girl. The other sentences need 'who's', short for 'who is'.",
  d=3, skill="Homophones", basics="commonlyConfused")

# ---------- Drill only ----------
at(0)
C(DONE + "\n\nThe box of crayons [[1]] on the shelf.",
  [("is", ["are", "were", "have been"])],
  "The subject is 'box'. 'Of crayons' describes it, so the verb is singular: is.",
  d=1, skill="Subject-verb agreement", basics="subjectVerb")
C(DONE + "\n\nThe children [[1]] their lunches before the bell rang.",
  [("ate", ["eaten", "eat", "eated"])],
  "The bell rang in the past, so the past form 'ate' is needed. 'Eaten' needs a helper such as 'had'.",
  d=1, skill="Verb tense", basics="verbTense")
C(DONE + "\n\nThe usher showed Grandma and [[1]] to their seats.",
  [("her", ["she", "hers", "herself"])],
  "'Her' is an object pronoun here, because she is the one being shown. Test it alone: 'showed her', not 'showed she'.",
  d=2, skill="Pronouns", basics="pronounCase")
S(PUNCT,
  "My sister's bike has a flat tyre.",
  ["My sisters bike has a flat tyre.",
   "My sister's' bike has a flat tyre.",
   "My sister,s bike has a flat tyre."],
  "One sister owns the bike, so the apostrophe goes before the s: sister's.",
  d=1, skill="Apostrophes", basics="apostrophes")
C(DONE + "\n\n[[1]] raining, so take an umbrella.",
  [("It's", ["Its", "Its'", "It"])],
  "'It's' means 'it is': it is raining.",
  d=1, skill="Its and it's", basics="itsIts")
S("Which sentence is written correctly?",
  "I finished my homework, and then I played outside.",
  ["I finished my homework, then I played outside.",
   "I finished my homework then, I played outside.",
   "I finished my homework I played outside."],
  "Two complete sentences joined by a comma need a conjunction such as 'and'. 'Then' alone is not a conjunction.",
  d=2, skill="Comma splices", basics="commaSplices")
C(DONE + "\n\nPlease put the chairs over [[1]].",
  [("there", ["their", "they're", "thier"])],
  "'There' means a place. 'Their' shows ownership and 'they're' means 'they are'.",
  d=1, skill="Homophones", basics="commonlyConfused")
S("Which word in this sentence is a conjunction?\n\nWe kept walking although our feet were sore.",
  "although", ["kept", "walking", "sore"],
  "A conjunction joins clauses. 'Although' joins 'we kept walking' to the contrast, 'our feet were sore'.",
  d=2, skill="Word classes")
