# Paper 3, Test of Orals (30 per test): vowels, diphthongs, triphthongs and
# phonetic symbols (10); consonants, clusters, silent letters and endings (8);
# rhymes (4); word stress, syllables, emphatic stress and intonation (8).
# Judged by the Received Pronunciation model of West African school English.
# Underlined letters use __...__; in stress items the syllable in capital
# letters carries the primary stress. Key first.
V = "Choose the option that has the same vowel sound as the one represented by the underlined letter(s).\n\n"
K = "Choose the option that has the same consonant sound as the one represented by the underlined letter(s).\n\n"
STRESS = "In the options, the syllable written in capital letters carries the primary stress. "
EMPH = "In the sentence below, the word in capital letters carries the emphatic stress. Choose the option to which the sentence relates.\n\n"
LINE = "Choose the word that rhymes with the underlined word in the line below.\n\n"


def Vw(t, d, word, opts, expl):
    return S(t, d, "Vowels", V + word, opts, expl)


def Cn(t, d, word, opts, expl):
    return S(t, d, "Consonants", K + word, opts, expl)


def R(t, d, word, opts, expl):
    return S(t, d, "Rhyme", f"Choose the word that rhymes with \"{word}\".", opts, expl)


def E(t, d, sentence, opts, expl):
    return S(t, d, "Emphatic stress", EMPH + sentence, opts, expl)


VOWELS = [
    # ---------- Test 1 ----------
    Vw(1, 1, "b__ea__t", ["field", "bit", "bet", "bait"],
       "Beat has the long vowel /iː/, as in field. Bit has /ɪ/, bet /e/ and bait /eɪ/."),
    Vw(1, 2, "c__au__ght", ["floor", "cot", "cut", "coat"],
       "Caught has /ɔː/, the vowel of floor. Cot has /ɒ/, cut /ʌ/ and coat /əʊ/."),
    Vw(1, 1, "f__a__ther", ["calm", "cat", "came", "curl"],
       "The a in father is /ɑː/, as in calm, where the l is silent. Cat has /æ/, came /eɪ/ and curl /ɜː/."),
    Vw(1, 2, "h__ur__t", ["learn", "hut", "hot", "hat"],
       "Hurt has /ɜː/, as in learn. Hut has /ʌ/, hot /ɒ/ and hat /æ/."),
    Vw(1, 1, "f__oo__d", ["shoe", "foot", "fond", "flood"],
       "Food has the long /uː/, as in shoe. Foot has the short /ʊ/, fond /ɒ/ and flood /ʌ/."),
    Vw(1, 1, "m__y__", ["buy", "may", "me", "mow"],
       "My has the diphthong /aɪ/, as in buy. May has /eɪ/, me /iː/ and mow /əʊ/."),
    Vw(1, 2, "b__oy__", ["voice", "buy", "bough", "bore"],
       "Boy has the diphthong /ɔɪ/, as in voice. Buy has /aɪ/, bough /aʊ/ and bore /ɔː/."),
    S(1, 2, "Phonetic symbols", "Which of the following words contains the vowel sound /ʌ/?",
      ["money", "moody", "morning", "mining"],
      "The o in money is /ʌ/: /ˈmʌni/. Moody has /uː/, morning /ɔː/ and mining /aɪ/."),
    S(1, 2, "Vowels", "Which of the following words has a different vowel sound from the others?",
      ["call", "cat", "man", "bad"],
      "Cat, man and bad all have the short /æ/. Call has the long /ɔː/."),
    S(1, 3, "Triphthongs", "Which of the following words contains a triphthong?",
      ["fire", "fair", "fear", "far"],
      "Fire has three vowel qualities in one syllable, /aɪə/. Fair /eə/ and fear /ɪə/ are diphthongs and far /ɑː/ is a pure vowel."),
    # ---------- Test 2 ----------
    Vw(2, 2, "s__i__t", ["build", "seat", "set", "sight"],
       "Sit has the short /ɪ/, as in build, where the u is silent. Seat has /iː/, set /e/ and sight /aɪ/."),
    Vw(2, 2, "c__o__t", ["what", "coat", "caught", "cut"],
       "Cot has the short /ɒ/, as in what. Coat has /əʊ/, caught /ɔː/ and cut /ʌ/."),
    Vw(2, 2, "b__a__d", ["salad", "bard", "bed", "bud"],
       "Bad has the short /æ/, as in the first syllable of salad. Bard has /ɑː/, bed /e/ and bud /ʌ/."),
    Vw(2, 2, "sh__ou__lder", ["bowl", "should", "shout", "shut"],
       "The ou in shoulder is the diphthong /əʊ/, as in bowl. Should has /ʊ/, shout /aʊ/ and shut /ʌ/."),
    Vw(2, 2, "h__ere__", ["deer", "hair", "her", "hire"],
       "Here has the diphthong /ɪə/, as in deer. Hair has /eə/, her /ɜː/ and hire /aɪə/."),
    Vw(2, 2, "th__ere__", ["wear", "here", "were", "word"],
       "There has the diphthong /eə/, as in wear. Here has /ɪə/, and were and word have /ɜː/."),
    Vw(2, 1, "t__ow__n", ["doubt", "tone", "ton", "torn"],
       "Town has the diphthong /aʊ/, as in doubt, where the b is silent. Tone has /əʊ/, ton /ʌ/ and torn /ɔː/."),
    S(2, 2, "Phonetic symbols", "Which of the following words contains the vowel sound /ɜː/?",
      ["journey", "jolly", "juggle", "joint"],
      "The our in journey is /ɜː/: /ˈdʒɜːni/. Jolly has /ɒ/, juggle /ʌ/ and joint /ɔɪ/."),
    S(2, 3, "Phonetic symbols", "Which of the following words contains the vowel sound /eɪ/?",
      ["break", "breakfast", "bread", "breath"],
      "Break is /breɪk/. In breakfast, bread and breath the ea is the short /e/."),
    S(2, 3, "Triphthongs", "Which of the following words contains the triphthong /aʊə/?",
      ["power", "pour", "pore", "paw"],
      "Power is /ˈpaʊə/, with /aʊ/ followed by /ə/. Pour, pore and paw all have the long /ɔː/."),
    # ---------- Drill only ----------
    Vw(0, 2, "fr__ui__t", ["route", "foot", "fright", "front"],
       "Fruit has the long /uː/, and in British English route is /ruːt/ with the same vowel. Foot has /ʊ/, fright /aɪ/ and front /ʌ/."),
    Vw(0, 2, "w__o__lf", ["could", "cold", "wall", "cud"],
       "The o in wolf is the short /ʊ/, as in could. Cold has /əʊ/, wall /ɔː/ and cud /ʌ/."),
    S(0, 3, "Phonetic symbols", "Which of the following words contains the vowel sound /ɒ/?",
      ["knowledge", "know", "now", "gnaw"],
      "Knowledge is /ˈnɒlɪdʒ/. Know has /əʊ/, now /aʊ/ and gnaw /ɔː/."),
    Vw(0, 1, "sh__ir__t", ["nurse", "short", "shut", "shot"],
       "Shirt has /ɜː/, as in nurse. Short has /ɔː/, shut /ʌ/ and shot /ɒ/."),
]

CONSONANTS = [
    # ---------- Test 1 ----------
    Cn(1, 1, "__c__ity", ["cinema", "cake", "chalk", "kitchen"],
       "The c in city is /s/, as in cinema. Before a, c is /k/ (cake), ch in chalk is /tʃ/ and kitchen begins with /k/."),
    Cn(1, 2, "enou__gh__", ["cough", "though", "night", "ghost"],
       "The gh in enough is /f/, as in cough. It is silent in though and night, and in ghost it is /ɡ/."),
    Cn(1, 2, "__th__ink", ["method", "mother", "these", "tank"],
       "Think begins with the voiceless /θ/, as in method. Mother and these have the voiced /ð/, and tank has /t/."),
    Cn(1, 2, "__s__ugar", ["ocean", "soup", "chair", "measure"],
       "The s in sugar is /ʃ/, the same sound as the c in ocean. Soup has /s/, chair /tʃ/ and the s in measure /ʒ/."),
    S(1, 1, "Silent letters", "In which of the following words is the underlined letter not pronounced?",
      ["__w__rite", "s__w__eet", "__w__ater", "t__w__in"],
      "The w in write is silent: /raɪt/. It is pronounced in sweet, water and twin."),
    S(1, 2, "Endings", "In which of the following words is the final -ed pronounced /t/?",
      ["jumped", "needed", "cleaned", "waited"],
      "After a voiceless sound such as /p/, -ed is /t/: jumped. Needed and waited end in /ɪd/, and cleaned in /d/."),
    S(1, 2, "Consonant clusters", "Which of the following words begins with a consonant cluster?",
      ["street", "seat", "sheet", "eat"],
      "Street begins with three consonant sounds together, /str/. Seat and sheet begin with one consonant sound each, /s/ and /ʃ/."),
    S(1, 2, "Phonetic symbols", "Which of the following words contains the consonant sound /v/?",
      ["of", "off", "fan", "phone"],
      "The f in of is pronounced /v/: /ɒv/. Off, fan and phone all have /f/."),
    # ---------- Test 2 ----------
    Cn(2, 2, "__c__ool", ["chorus", "church", "cell", "ship"],
       "Cool begins with /k/, the sound of ch in chorus. Church has /tʃ/, cell /s/ and ship /ʃ/."),
    Cn(2, 1, "__j__ump", ["gem", "game", "yam", "shame"],
       "The j in jump is /dʒ/, as in gem, where g comes before e. Game has /ɡ/, yam /j/ and shame /ʃ/."),
    Cn(2, 2, "mo__th__er", ["bathe", "bath", "thin", "Thursday"],
       "The th in mother is the voiced /ð/, as in bathe. Bath, thin and Thursday have the voiceless /θ/."),
    Cn(2, 2, "na__t__ion", ["special", "question", "nature", "pleasure"],
       "The t in nation is /ʃ/, as in special. Question and nature have /tʃ/, and pleasure has /ʒ/."),
    S(2, 2, "Silent letters", "In which of the following words is the underlined letter not pronounced?",
      ["i__s__land", "ca__s__h", "ba__s__ket", "__s__and"],
      "The s in island is silent: /ˈaɪlənd/. It is pronounced in cash, basket and sand."),
    S(2, 2, "Endings", "In which of the following words is the final -s pronounced /z/?",
      ["dogs", "cats", "books", "ships"],
      "After a voiced sound such as /ɡ/, -s is /z/: dogs. After the voiceless /t/, /k/ and /p/ it is /s/."),
    S(2, 2, "Consonant clusters", "Which of the following words ends with a consonant cluster?",
      ["desk", "dish", "deep", "day"],
      "Desk ends with two consonant sounds together, /sk/. Dish ends in one sound, /ʃ/, deep in /p/, and day in a vowel."),
    S(2, 2, "Phonetic symbols", "Which of the following words contains the consonant sound /ŋ/?",
      ["long", "lone", "land", "lunch"],
      "The ng in long is the single sound /ŋ/. Lone and land have /n/, and lunch has /n/ followed by /tʃ/."),
    # ---------- Drill only ----------
    S(0, 1, "Silent letters", "In which of the following words is the underlined letter not pronounced?",
      ["__h__our", "__h__ouse", "__h__appy", "be__h__ind"],
      "The h in hour is silent, so hour sounds like our. It is pronounced in house, happy and behind."),
    Cn(0, 3, "__wh__o", ["whole", "white", "when", "wheat"],
       "The wh in who is /h/, as in whole. In white, when and wheat it is /w/."),
    S(0, 2, "Phonetic symbols", "Which of the following words contains the consonant sound /tʃ/?",
      ["picture", "pressure", "measure", "machine"],
      "The t in picture is /tʃ/. Pressure and machine have /ʃ/, and measure has /ʒ/."),
    S(0, 2, "Endings", "In which of the following words is the final -ed pronounced /d/?",
      ["lived", "laughed", "kissed", "painted"],
      "After a voiced sound such as /v/, -ed is /d/: lived. Laughed and kissed end in /t/, and painted in /ɪd/."),
]

RHYMES = [
    # ---------- Test 1 ----------
    R(1, 2, "great", ["late", "treat", "threat", "greet"],
      "Great is /ɡreɪt/, so it rhymes with late. Treat and greet have /iːt/ and threat has /et/."),
    R(1, 2, "home", ["comb", "come", "some", "tomb"],
      "Home and comb both end in /əʊm/. Come and some have /ʌm/ and tomb has /uːm/."),
    S(1, 3, "Rhyme", "Which of the following pairs of words rhymes?",
      ["wood / should", "wood / mood", "wood / food", "wood / flood"],
      "Wood and should both end in /ʊd/. Mood and food have /uːd/, and flood has /ʌd/."),
    S(1, 2, "Rhyme", LINE + "The farmer worked until the sun went __down__.",
      ["crown", "grown", "known", "drawn"],
      "Down and crown both end in /aʊn/. Grown and known have /əʊn/ and drawn has /ɔːn/."),
    # ---------- Test 2 ----------
    R(2, 2, "love", ["glove", "move", "stove", "cove"],
      "Love and glove both end in /ʌv/. Move has /uːv/, and stove and cove have /əʊv/."),
    R(2, 1, "fear", ["beer", "bear", "fur", "fire"],
      "Fear and beer both end in /ɪə/. Bear has /eə/, fur /ɜː/ and fire /aɪə/."),
    S(2, 3, "Rhyme", "Which of the following pairs of words rhymes?",
      ["cough / off", "cough / bough", "cough / though", "cough / tough"],
      "Cough is /kɒf/, which rhymes with off. Bough is /baʊ/, though /ðəʊ/ and tough /tʌf/."),
    S(2, 2, "Rhyme", LINE + "The children laughed and ran out to __play__.",
      ["weigh", "why", "pea", "ploy"],
      "Play and weigh both end in /eɪ/; the gh in weigh is silent. Why has /aɪ/, pea /iː/ and ploy /ɔɪ/."),
    # ---------- Drill only ----------
    R(0, 1, "hurt", ["shirt", "heart", "hut", "hat"],
      "Hurt and shirt both end in /ɜːt/. Heart has /ɑːt/, hut /ʌt/ and hat /æt/."),
    R(0, 2, "steak", ["break", "speak", "streak", "stick"],
      "Steak is /steɪk/, so it rhymes with break. Speak and streak have /iːk/ and stick has /ɪk/."),
    R(0, 2, "lose", ["shoes", "those", "rose", "loss"],
      "Lose is /luːz/, so it rhymes with shoes. Those and rose have /əʊz/, and loss is /lɒs/."),
    R(0, 2, "flower", ["our", "floor", "flow", "four"],
      "Flower ends in /aʊə/, the same sound as our. Floor and four have /ɔː/ and flow has /əʊ/."),
    S(0, 2, "Rhyme", "Which of the following pairs of words rhymes?",
      ["worm / firm", "worm / form", "worm / storm", "worm / warm"],
      "Worm and firm both end in /ɜːm/. Form, storm and warm have /ɔːm/."),
    R(0, 1, "climb", ["time", "limb", "slim", "comb"],
      "Climb is /klaɪm/, so it rhymes with time. Limb and slim have /ɪm/ and comb has /əʊm/."),
    R(0, 1, "moon", ["tune", "done", "gone", "none"],
      "Moon and tune both end in /uːn/. Done and none have /ʌn/ and gone has /ɒn/."),
    S(0, 1, "Rhyme", LINE + "The old man sat beneath the mango __tree__.",
      ["key", "eye", "say", "day"],
      "Tree and key both end in /iː/. Eye has /aɪ/, and say and day have /eɪ/."),
]

STRESSES = [
    # ---------- Test 1 ----------
    S(1, 2, "Word stress", STRESS + "Choose the correct stress pattern for \"education\".",
      ["ed-u-CA-tion", "ED-u-ca-tion", "ed-U-ca-tion", "ed-u-ca-TION"],
      "Words ending in -tion are stressed on the syllable just before the ending: ed-u-CA-tion."),
    S(1, 1, "Word stress", "Which of the following words is stressed on the first syllable?",
      ["market", "police", "decide", "attend"],
      "MAR-ket is stressed on the first syllable. Po-LICE, de-CIDE and at-TEND are stressed on the second."),
    S(1, 3, "Word stress", "In which of the following sentences is the word \"record\" stressed on the first syllable?",
      ["She broke the world record.", "Please record the meeting.", "They will record a new song.", "The clerk must record every sale."],
      "As a noun, record is stressed on the first syllable, REC-ord. As a verb it is re-CORD, so in the other sentences the stress falls on the second syllable."),
    S(1, 2, "Word stress", "Which of the following words has a different stress pattern from the others?",
      ["guitar", "teacher", "father", "garden"],
      "Teacher, father and garden are stressed on the first syllable. Guitar is stressed on the second: gui-TAR."),
    N(1, 2, "Syllable structure", "How many syllables does the word \"university\" have?",
      ["5", "3", "4", "6"],
      "u-ni-ver-si-ty has five syllables."),
    E(1, 2, "\"Kofi sold his BICYCLE yesterday.\"",
      ["Did Kofi sell his car yesterday?", "Who sold his bicycle yesterday?", "When did Kofi sell his bicycle?", "Did Kofi buy his bicycle yesterday?"],
      "Stress on bicycle corrects the thing that was sold, so the sentence answers a question that names something else, such as a car."),
    E(1, 2, "\"My mother cooked the rice YESTERDAY.\"",
      ["Did your mother cook the rice today?", "Who cooked the rice yesterday?", "What did your mother cook yesterday?", "Did your mother buy the rice yesterday?"],
      "Stress on yesterday corrects the time, so the sentence answers a question that names a different day."),
    S(1, 2, "Intonation", "Which of the following sentences is normally said with a falling tune at the end?",
      ["Where do you live?", "Are you ready?", "Is this your bag?", "Can you help me?"],
      "A wh- question such as Where do you live? normally ends with a falling tune. Questions that expect yes or no normally rise."),
    # ---------- Test 2 ----------
    S(2, 3, "Word stress", STRESS + "Choose the correct stress pattern for \"necessary\".",
      ["NEC-es-sar-y", "nec-ES-sar-y", "nec-es-SAR-y", "nec-es-sar-Y"],
      "In British English, necessary is stressed on the first syllable: NEC-es-sar-y."),
    S(2, 1, "Word stress", "Which of the following words is stressed on the second syllable?",
      ["mistake", "mother", "morning", "master"],
      "Mis-TAKE is stressed on the second syllable. MOTH-er, MORN-ing and MAS-ter are stressed on the first."),
    S(2, 3, "Word stress", "In which of the following sentences is the word \"object\" stressed on the second syllable?",
      ["Did anyone object to the plan?", "What is that object on the table?", "The object of the game is to score.", "He found a strange object in the bush."],
      "As a verb, object is ob-JECT. In the other sentences it is a noun, OB-ject, stressed on the first syllable."),
    S(2, 2, "Word stress", "Which of the following words has a different stress pattern from the others?",
      ["purpose", "suppose", "agree", "become"],
      "Suppose, agree and become are stressed on the second syllable. Purpose is stressed on the first: PUR-pose."),
    N(2, 2, "Syllable structure", "How many syllables does the word \"geography\" have?",
      ["4", "2", "3", "5"],
      "ge-og-ra-phy has four syllables."),
    E(2, 1, "\"AMA bought the new shoes.\"",
      ["Who bought the new shoes?", "What did Ama buy?", "Did Ama sell the new shoes?", "Did Ama buy the old shoes?"],
      "Stress on Ama, the subject, answers a question about who did the buying."),
    E(2, 2, "\"We travelled to Kano by TRAIN.\"",
      ["Did you travel to Kano by bus?", "Where did you travel by train?", "Who travelled to Kano by train?", "Did you travel from Kano by train?"],
      "Stress on train corrects the means of travel, so the sentence answers a question that names another one, such as a bus."),
    S(2, 3, "Intonation", "When a statement such as \"You passed the examination?\" is said with a rising tune at the end, the speaker is usually ......",
      ["asking a question", "giving an order", "stating a fact", "greeting someone"],
      "A statement said with a rising tune becomes a question. The same words with a falling tune would state a fact."),
    # ---------- Drill only ----------
    S(0, 1, "Word stress", STRESS + "Choose the correct stress pattern for \"information\".",
      ["in-for-MA-tion", "IN-for-ma-tion", "in-FOR-ma-tion", "in-for-ma-TION"],
      "Words ending in -tion are stressed on the syllable just before the ending: in-for-MA-tion."),
    S(0, 1, "Word stress", "Which of the following words is stressed on the first syllable?",
      ["window", "remain", "believe", "today"],
      "WIN-dow is stressed on the first syllable. Re-MAIN, be-LIEVE and to-DAY are stressed on the second."),
    S(0, 3, "Word stress", "In which of the following sentences is the word \"increase\" stressed on the first syllable?",
      ["There was an increase in prices.", "Prices will increase next month.", "The workers want to increase output.", "Rains increase the risk of floods."],
      "As a noun, increase is IN-crease. As a verb it is in-CREASE, so in the other sentences the stress falls on the second syllable."),
    N(0, 1, "Syllable structure", "How many syllables does the word \"beautiful\" have?",
      ["3", "2", "4", "5"],
      "beau-ti-ful has three syllables."),
    E(0, 2, "\"The headmaster PRAISED the girls.\"",
      ["Did the headmaster punish the girls?", "Who praised the girls?", "Whom did the headmaster praise?", "Did the headmaster praise the boys?"],
      "Stress on praised corrects the action, so the sentence answers a question that names a different action."),
    S(0, 1, "Intonation", "Which of the following sentences normally ends with a rising tune?",
      ["Is the shop open?", "How old are you?", "Close the window.", "The shop is closed."],
      "A question that expects yes or no normally rises at the end. Wh- questions, commands and statements normally fall."),
]

ITEMS = {"wassceengVowels": VOWELS, "wassceengConsonants": CONSONANTS,
         "wassceengRhymes": RHYMES, "wassceengStress": STRESSES}
