# Language Arts - Writing (multiple-choice part). Original drafts and items.
# Per test: two drafts of 10 items: 4 Organization of Ideas, 9 Language Facility, 7 Writing Conventions.
# Drill only: two drafts of 9 items (4 organization, 2 language facility, 3 conventions each).
# Revision items use L() so "NO CHANGE" stays first; the [n] in a stem matches the marker in the draft.

NC = "NO CHANGE"
ASK = "Which choice is best for the underlined portion?"

STIMULI = [
    {"id": "HISET-T1-W1", "title": "Draft: a letter from a tenants' association", "text": (
        "Dear Neighbors,\n\n"
        "¶1 This spring, the Maple Court Tenants' Association __are planning__ [1] a cleanup day for the empty lot "
        "behind Building C. __For years the lot has collected trash. It has collected broken furniture and old tires "
        "too.__ [2] We want to turn it into a community garden where residents can grow vegetables and flowers.\n\n"
        "¶2 The cleanup will take place on Saturday, April 12, from 9 a.m. to 1 p.m. __Volunteers should wear old "
        "clothes and sturdy shoes, gloves, rakes and trash bags will be provided.__ [3] Lunch will be served at noon, "
        "__courtesy of__ [4] Rosa's Bakery on Elm Street.\n\n"
        "¶3 __Our building was built in 1962.__ [5] A garden would give children a safe place to play and learn where "
        "food comes from. It would also give older residents, many of whom have lived here for decades, __a chance to "
        "meet there neighbors__ [6]. __Studies have found that community gardens can even make a block feel "
        "safer.__ [7]\n\n"
        "¶4 We need at least thirty volunteers to finish the job in one day. __If it is the case that you are "
        "planning on coming,__ [8] please sign the sheet in the lobby by April 5. __Anyone who can lend a "
        "wheelbarrow, would be__ [9] a huge help.\n\n"
        "¶5 __In conclusion, thank you.__ [10] Together, we can turn an eyesore into something the whole court can be "
        "proud of.\n\n"
        "Sincerely,\n\nThe Maple Court Tenants' Association")},
    {"id": "HISET-T1-W2", "title": "Draft: a personal account, How I Learned to Budget", "text": (
        "¶1 Two years ago, I had no idea where my paycheck went. I would get paid on Friday, and by the next Thursday "
        "I was __lending__ [1] lunch money from my sister. I decided something had to change.\n\n"
        "¶2 My first step was simple: for one month, I wrote down every dollar I spent. __The results surprised me, I "
        "was spending more on takeout than on groceries.__ [2] Small purchases, a coffee here and a snack there, "
        "added up to almost two hundred dollars.\n\n"
        "¶3 __Next,__ [3] I made a plan. I divided my pay into three parts: bills, savings and spending money. __I keep "
        "the savings in a separate account so I wont__ [4] be tempted to use it. At first, the savings part was only "
        "twenty dollars a week. __Twenty dollars a week does not sound like a lot of money to most people who hear "
        "about it.__ [5] Still, by the end of the year, I had more than a thousand dollars.\n\n"
        "¶4 __My sister also likes to cook.__ [6] The hardest part was saying no to friends who wanted to eat out every "
        "weekend. I started inviting them over for potluck dinners instead. To my surprise, __they enjoyed it as much "
        "as me.__ [7]\n\n"
        "¶5 Budgeting has not made me rich, but it has made me __calmer and less anxious and more relaxed__ [8]. I no "
        "longer dread the end of the week. __Having learned to track my spending, my confidence grew.__ [9] __If you "
        "are thinking about starting a budget, begin by writing everything down.__ [10]")},

    {"id": "HISET-T2-W1", "title": "Draft: a school newspaper article", "text": (
        "¶1 Last month, the Eastfield High robotics team __won it's__ [1] first regional championship. The team of "
        "twelve students built a robot that could sort recycling by material, a task that took them most of the "
        "school year.\n\n"
        "¶2 __The project began in September, when the team chose a problem to solve.__ [2] Team captain Ana Reyes "
        "said the idea came from the school cafeteria, where bins were often filled with the wrong items. \"We "
        "wanted to build something useful,\" she explained, \"not just something that __look__ [3] cool.\"\n\n"
        "¶3 Building the robot was harder than __the team expects__ [4]. The first design jammed whenever it picked up "
        "a crushed can. __The students rebuilt the gripper four times, testing each version for hours__ [5]. "
        "__Their coach, Mr. Dale, who teaches physics, he stayed late__ [6] with them many evenings.\n\n"
        "¶4 __Furthermore,__ [7] the hard work paid off. At the competition, judges praised the robot's speed and "
        "__the way it was really, really accurate__ [8]. __The team will now go on to compete at the state level of "
        "competition in the month of May.__ [9]\n\n"
        "¶5 Reyes hopes the robot will one day be used in the cafeteria. \"We already know it works,\" she said. "
        "\"__Now we just need to convince the principal to let us plug it in.__\" [10]")},
    {"id": "HISET-T2-W2", "title": "Draft: an email to a hiring manager", "text": (
        "Dear Ms. Carter,\n\n"
        "¶1 I am writing to apply for the position of shift supervisor at Greenway Grocery, which I saw __advertised__ "
        "[1] on your company's website. I have worked in retail for five years and __believe I would be a strong fit "
        "for your team__ [2].\n\n"
        "¶2 __In my current job at Daily Market, I train new cashiers, I also manage the schedule__ [3] for a staff of "
        "eight. Last year, I suggested a new way to restock shelves at night. __The change cut overtime costs by "
        "almost a quarter.__ [4]\n\n"
        "¶3 __My favorite food is pasta.__ [5] I enjoy helping customers, and I stay calm when the store is busy. "
        "__Whenever a problem comes up with an order or a customer, I try to solve it fast and quick__ [6] so that "
        "lines keep moving.\n\n"
        "¶4 __I would welcome the chance to talk with you more about this job.__ [7] __Me and my current manager__ [8] "
        "have agreed that she will provide a reference. I can be reached at the phone number below and __am "
        "available__ [9] for an interview any weekday morning.\n\n"
        "¶5 __Thanks a million for your time, I really appreciate it big time!__ [10]\n\n"
        "Sincerely,\n\nJordan Ellis")},

    {"id": "HISET-D-W1", "title": "Draft: a report on a city bike-share program", "text": (
        "¶1 Two years ago, the city of Brookport launched a bike-share program with 300 bikes at 40 stations. "
        "__Riders unlock a bike with a phone app and return it to any station.__ [1]\n\n"
        "¶2 __Use has grown steadily.__ [2] In the first year, riders took about 90,000 trips. In the second year, "
        "that number __exploded wildly__ [3] to over 150,000. Most trips were short, under three miles.\n\n"
        "¶3 __The bikes are painted bright green.__ [4] A survey of riders found that many use the bikes to reach bus "
        "and train stops. __For these riders, the bikes fill a gap; the last mile__ [5] between transit and home.\n\n"
        "¶4 __However,__ [6] the program faces challenges. Stations in the busiest areas often run out of bikes by "
        "morning, while stations near parks sit full. __The city have hired__ [7] staff to move bikes by truck, but "
        "this is costly.\n\n"
        "¶5 __Each of the stations need more docks__ [8], according to the report. __The report recommends adding "
        "twenty stations and using price discounts to encourage riders to return bikes where they are needed.__ "
        "[9]")},
    {"id": "HISET-D-W2", "title": "Draft: a personal account, Learning to Swim at Thirty", "text": (
        "¶1 I grew up near the ocean, but I never learned to swim. __As a child, I was too scared, as an adult, I was "
        "too embarrassed.__ [1] Last summer, at thirty, I finally signed up for lessons.\n\n"
        "¶2 __The first lesson was terrifying.__ [2] I clung to the side of the pool while children half my height "
        "splashed past. My instructor, a retired lifeguard named Grace, did not rush me. __She taught me to float "
        "first, she said__ [3] that a swimmer who can float can always rest.\n\n"
        "¶3 __Pools are cleaned with chlorine.__ [4] By the third week, I could swim the width of the pool. By the "
        "sixth, I could swim a full length without stopping. __Me and two other adult students__ [5] started "
        "meeting early to practice.\n\n"
        "¶4 __For example,__ [6] learning to swim taught me more than a skill. It showed me that being a beginner "
        "is nothing to be ashamed of, at any age. __It's a lesson that I now try to apply and use for every new "
        "thing that I try.__ [7]\n\n"
        "¶5 __This summer, I plan to swim in the ocean for the first time.__ [8] __I am excited, and I am a little "
        "nervous, and I am ready.__ [9]")},
]

ITEMS = [
    # ---------------- Practice Test 1: Draft W1 (letter) ----------------
    L(1, CONV, 1, "Subject-verb agreement", f"[1] {ASK}",
      [NC, "is planning", "were planning", "have been planning"], 1,
      "The subject is \"Association,\" a single group, so it takes the singular verb \"is planning.\" \"Are,\" \"were\" and \"have\" are all plural forms here.",
      stim="HISET-T1-W1", basics="subjectVerb"),
    L(1, LANG, 2, "Combining sentences", f"[2] {ASK}",
      [NC, "For years the lot has collected broken furniture, old tires and trash.",
       "For years, collecting broken furniture, old tires and trash, the lot.",
       "The lot, for years, it has collected broken furniture, old tires and trash."], 1,
      "One sentence with a list says the same thing without repeating \"collected.\" The version starting \"For years, collecting\" has no main verb, and \"The lot, for years, it\" repeats the subject.",
      stim="HISET-T1-W1", basics="redundancy"),
    L(1, CONV, 2, "Run-on sentences", f"[3] {ASK}",
      [NC, "sturdy shoes, and gloves, rakes and trash bags will be provided.",
       "sturdy shoes; gloves, rakes and trash bags will be provided.",
       "sturdy shoes gloves, rakes and trash bags will be provided."], 2,
      "The draft joins two complete sentences with only a comma, a comma splice. A semicolon separates them. Adding \"and\" after the comma makes it sound as if volunteers wear gloves, rakes and bags.",
      stim="HISET-T1-W1", basics="commaSplices"),
    L(1, LANG, 2, "Idiomatic usage", f"[4] {ASK}",
      [NC, "on behalf of", "courteously by", "in the courtesy of"], 0,
      "\"Courtesy of\" is the standard phrase for something a business provides free. \"On behalf of\" means acting for someone, and \"courteously by\" and \"in the courtesy of\" are not idiomatic.",
      stim="HISET-T1-W1"),
    L(1, ORG, 2, "Topic sentence",
      "[5] Which choice is the best first sentence for paragraph 3?",
      [NC, "The benefits would reach far beyond a tidy lot.",
       "Rosa's Bakery has served the court for many years.", "Some residents prefer flowers to vegetables."], 1,
      "Paragraph 3 lists what a garden would give children, older residents and the block, so a sentence about the benefits introduces it. The building's age and the bakery are off topic.",
      stim="HISET-T1-W1", basics="topicSentences"),
    L(1, CONV, 1, "Commonly confused words", f"[6] {ASK}",
      [NC, "a chance to meet their neighbors", "a chance to meet they're neighbors", "a chance for meeting there neighbors"], 1,
      "The neighbors belong to the residents, so the possessive \"their\" is needed. \"There\" names a place and \"they're\" means \"they are.\"",
      stim="HISET-T1-W1", basics="commonlyConfused"),
    Q(1, ORG, 2, "Relevance of content",
      "[7] The writer is considering deleting the underlined sentence. Should the writer make this deletion?",
      ["No, because it adds another benefit of the garden", "Yes, because it only repeats the point about children",
       "Yes, because it has nothing to do with the lot", "No, because it explains how to sign up"],
      "Paragraph 3 is about what the garden would do for residents, and feeling safer is one more benefit. The sentence does not repeat the point about children or explain signing up.",
      stim="HISET-T1-W1", basics="deletingSentence"),
    L(1, LANG, 1, "Concise wording", f"[8] {ASK}",
      [NC, "If you plan to come,", "Being as you plan to come,", "If coming is your plan to do,"], 1,
      "\"If you plan to come\" says the same thing in five words. The draft is wordy, and \"Being as\" and \"your plan to do\" are awkward and nonstandard.",
      stim="HISET-T1-W1", basics="concision"),
    L(1, CONV, 2, "Comma use", f"[9] {ASK}",
      [NC, "Anyone, who can lend a wheelbarrow would be", "Anyone who can lend a wheelbarrow would be",
       "Anyone who can lend, a wheelbarrow would be"], 2,
      "A comma should not separate a subject (\"Anyone who can lend a wheelbarrow\") from its verb (\"would be\"). No comma is needed anywhere in this part.",
      stim="HISET-T1-W1"),
    L(1, LANG, 2, "Style and tone", f"[10] {ASK}",
      [NC, "Thank you for helping your neighbors.", "Thanks a ton, folks!!", "We hereby extend our gratitude."], 1,
      "A warm, plain thank-you fits a friendly letter to neighbors. \"In conclusion\" is stiff and unneeded, \"Thanks a ton, folks!!\" is too casual, and \"We hereby extend\" is too formal.",
      stim="HISET-T1-W1", basics="matchingTone"),

    # ---------------- Practice Test 1: Draft W2 (personal account) ----------------
    L(1, LANG, 1, "Precise word choice", f"[1] {ASK}",
      [NC, "loaning", "borrowing", "owing"], 2,
      "The writer takes money from the sister, which is borrowing. \"Lending\" and \"loaning\" mean giving money out, and \"owing\" does not fit \"from my sister.\"",
      stim="HISET-T1-W2", basics="preciseWords"),
    L(1, CONV, 2, "Run-on sentences", f"[2] {ASK}",
      [NC, "The results surprised me: I was spending more on takeout than on groceries.",
       "The results surprised me, and spending more on takeout than on groceries.",
       "The results surprised me I was spending more on takeout than on groceries."], 1,
      "The draft is a comma splice. A colon works because the second part tells what the surprising result was. Leaving out all punctuation makes a run-on, and \"and spending\" leaves a fragment.",
      stim="HISET-T1-W2", basics="commaSplices"),
    L(1, ORG, 1, "Transitions", f"[3] {ASK}",
      [NC, "However,", "For example,", "Instead,"], 0,
      "Making a plan is the step after tracking spending, so \"Next\" shows the order. \"However\" and \"Instead\" signal a contrast, and \"For example\" signals an example.",
      stim="HISET-T1-W2", basics="transitions"),
    L(1, CONV, 1, "Apostrophes", f"[4] {ASK}",
      [NC, "so I won't", "so I wo'nt", "so I'wont"], 1,
      "\"Won't\" is the contraction of \"will not,\" with the apostrophe where the letters were dropped. The other spellings put the apostrophe in the wrong place or leave it out.",
      stim="HISET-T1-W2", basics="apostrophes"),
    L(1, LANG, 2, "Concise wording", f"[5] {ASK}",
      [NC, "Twenty dollars a week may not sound like much.",
       "Twenty dollars, a week, does not sound like much money, to most.",
       "To most people, twenty dollars a week is not a lot of money to them."], 1,
      "The short version keeps the meaning and cuts \"to most people who hear about it.\" The version with three commas breaks up the sentence, and \"to them\" repeats \"to most people.\"",
      stim="HISET-T1-W2", basics="redundancy"),
    L(1, ORG, 2, "Topic sentence",
      "[6] Which choice is the best first sentence for paragraph 4?",
      [NC, "Sticking to the plan was not always easy.", "My sister also earns a weekly paycheck at her job.",
       "Potluck dinners have a long history."], 1,
      "Paragraph 4 is about the hardest part of keeping to the budget, so a sentence about sticking to the plan introduces it. The sister's cooking, her paycheck and the history of potlucks wander from that point.",
      stim="HISET-T1-W2", basics="topicSentences"),
    L(1, CONV, 2, "Pronoun case", f"[7] {ASK}",
      [NC, "they enjoyed it as much as I did.", "they enjoyed it as much as myself.", "they enjoyed it as much as mine."], 1,
      "The sentence compares two people enjoying something, so the subject form is needed: \"as much as I did.\" \"Me\" and \"myself\" are the wrong case, and \"mine\" is a possessive.",
      stim="HISET-T1-W2", basics="pronounCase"),
    L(1, LANG, 1, "Redundant wording", f"[8] {ASK}",
      [NC, "calmer", "calm and calmer", "more calmer"], 1,
      "\"Calmer,\" \"less anxious\" and \"more relaxed\" mean the same thing, so one word is enough. \"More calmer\" doubles the comparative.",
      stim="HISET-T1-W2", basics="redundancy"),
    L(1, LANG, 2, "Modifier placement", f"[9] {ASK}",
      [NC, "Having learned to track my spending, I grew more confident.",
       "Having learned to track my spending, confidence grew in me.",
       "My confidence grew, having learned to track my spending."], 1,
      "The opening phrase describes the writer, so \"I\" must come right after it. In the draft and the versions with \"confidence\" as the subject, the confidence seems to have learned to track spending.",
      stim="HISET-T1-W2", basics="danglingModifiers"),
    L(1, LANG, 2, "Style and tone",
      "[10] Which choice keeps the tone of the essay and is the most direct?",
      [NC, "If you are maybe kind of thinking about a budget, it would probably be good to write everything down.",
       "Budget starters: write!",
       "Should a budget be contemplated, documentation of all expenditures is advised."], 0,
      "The plain, friendly sentence matches the rest of the essay. \"Maybe kind of\" is wordy and unsure, \"Budget starters: write!\" is too clipped, and \"documentation of all expenditures\" is stiff.",
      stim="HISET-T1-W2", basics="matchingTone"),

    # ---------------- Practice Test 2: Draft W1 (school newspaper) ----------------
    L(2, CONV, 1, "Apostrophes", f"[1] {ASK}",
      [NC, "won its", "won its'", "won they're"], 1,
      "The championship belongs to the team, so the possessive \"its\" is needed, with no apostrophe. \"It's\" means \"it is.\"",
      stim="HISET-T2-W1"),
    Q(2, ORG, 2, "Relevance of content",
      "[2] The writer is considering deleting the underlined sentence. Should the writer make this deletion?",
      ["No, because it tells when and how the project started", "Yes, because it only repeats what the first paragraph says",
       "Yes, because it is not about robotics", "No, because it names the team captain"],
      "The sentence opens the paragraph about how the project began and leads into Reyes's account of where the idea came from. Nothing else gives the start date.",
      stim="HISET-T2-W1"),
    L(2, CONV, 1, "Subject-verb agreement", f"[3] {ASK}",
      [NC, "looks", "looking", "have looked"], 1,
      "\"That\" refers to \"something,\" which is singular, so the verb is \"looks.\" \"Look\" and \"have looked\" are plural forms, and \"looking\" cannot be the main verb.",
      stim="HISET-T2-W1"),
    L(2, CONV, 2, "Verb tense", f"[4] {ASK}",
      [NC, "the team expected", "the team will expect", "the team is expecting"], 1,
      "The article tells about the past (\"was harder\"), so the expectation is past too: \"expected.\" The present and future forms do not fit.",
      stim="HISET-T2-W1"),
    L(2, LANG, 2, "Sentence variety", f"[5] {ASK}",
      [NC, "The students rebuilt the gripper four times. They tested. Each version was tested for hours",
       "Four times rebuilt by the students, the gripper, testing each version for hours",
       "The gripper was rebuilt, and the gripper was tested, four times by the students for hours"], 0,
      "The draft is clear and uses a phrase to add the testing detail. Breaking it into three short sentences is choppy and repeats \"tested,\" \"Four times rebuilt\" has no main verb, and the last version repeats \"the gripper.\"",
      stim="HISET-T2-W1"),
    L(2, CONV, 2, "Sentence structure", f"[6] {ASK}",
      [NC, "Their coach, Mr. Dale, who teaches physics, stayed late",
       "Their coach, Mr. Dale who teaches physics he stayed late",
       "Their coach Mr. Dale, who teaches physics he, stayed late"], 1,
      "The subject \"Their coach\" already has its verb \"stayed,\" so the extra \"he\" must go. The phrases that describe the coach are set off by commas.",
      stim="HISET-T2-W1"),
    L(2, ORG, 2, "Transitions", f"[7] {ASK}",
      [NC, "Similarly,", "In the end,", "For instance,"], 2,
      "The paragraph moves from the struggles to the result, so \"In the end\" fits. \"Furthermore\" adds a point, \"Similarly\" compares, and \"For instance\" gives an example.",
      stim="HISET-T2-W1", basics="transitions"),
    L(2, LANG, 1, "Parallel structure", f"[8] {ASK}",
      [NC, "its accuracy", "how really accurate it was", "being accurate and also correct"], 1,
      "\"The robot's speed and its accuracy\" pairs two nouns. The draft breaks the pattern with a clause, and \"accurate and also correct\" repeats the idea.",
      stim="HISET-T2-W1"),
    L(2, LANG, 2, "Concise wording", f"[9] {ASK}",
      [NC, "The team will now compete at the state level in May.",
       "The team will now go on to compete in May at the state level of competition.",
       "In May, the team will now go on, at the state level, competing."], 1,
      "\"Compete at the state level in May\" keeps every fact and drops \"go on to,\" \"of competition\" and \"the month of.\" The other versions stay wordy or scramble the sentence.",
      stim="HISET-T2-W1", basics="concision"),
    L(2, LANG, 2, "Effective ending",
      "[10] The writer wants to end the article with a detail that shows Reyes's sense of humor. Which choice best does this?",
      [NC, "The team meets every Tuesday after school.", "Robots are used in many recycling plants.", "The robot weighs about forty pounds."], 0,
      "The joke about convincing the principal to let them plug it in shows Reyes's humor and ties back to the cafeteria. The meeting day, recycling plants and the robot's weight are plain facts.",
      stim="HISET-T2-W1"),

    # ---------------- Practice Test 2: Draft W2 (email) ----------------
    L(2, LANG, 1, "Precise word choice", f"[1] {ASK}",
      [NC, "advertising", "advertised to", "adverted"], 0,
      "The position was advertised on the website, so the past participle \"advertised\" is right. \"Adverted\" means referred to, a different word.",
      stim="HISET-T2-W2"),
    L(2, LANG, 2, "Style and tone", f"[2] {ASK}",
      [NC, "totally know I would crush it on your team", "reckon I am fit for your team",
       "believe me when I say I am the best ever"], 0,
      "A cover letter needs a confident, polite tone, which the draft has. \"Crush it\" and \"reckon\" are slang, and \"the best ever\" is boastful.",
      stim="HISET-T2-W2"),
    L(2, CONV, 2, "Run-on sentences", f"[3] {ASK}",
      [NC, "In my current job at Daily Market, I train new cashiers and also manage the schedule",
       "In my current job at Daily Market, I train new cashiers also, I manage the schedule",
       "In my current job at Daily Market I train new cashiers I also manage the schedule"], 1,
      "The draft joins two sentences with only a comma. Joining the two verbs with \"and\" fixes it. Moving \"also\" keeps the comma splice, and dropping the comma makes a run-on.",
      stim="HISET-T2-W2"),
    Q(2, ORG, 2, "Relevance of content",
      "[4] The writer is considering deleting the underlined sentence. Should the writer make this deletion?",
      ["No, because it shows the result of the writer's idea", "Yes, because it is unrelated to the job",
       "Yes, because it repeats the second paragraph", "No, because it explains the new restocking method in detail"],
      "Saying the change cut overtime costs shows a manager what the writer's suggestion achieved, strong support for the application.",
      stim="HISET-T2-W2"),
    L(2, ORG, 1, "Topic sentence",
      "[5] Which choice is the best first sentence for paragraph 3?",
      [NC, "I am also good with people under pressure.", "I live only a short drive from your Greenway store.",
       "Daily Market is open until midnight."], 1,
      "Paragraph 3 describes helping customers and staying calm when busy, so a sentence about working well with people introduces it. Food, distance and store hours have no place there.",
      stim="HISET-T2-W2"),
    L(2, LANG, 1, "Redundant wording", f"[6] {ASK}",
      [NC, "I try to solve it quickly", "I try to solve it fast quickly", "I try quickly and fast to solve it"], 1,
      "\"Fast\" and \"quick\" mean the same thing, and \"quickly\" is the adverb that describes how the writer solves problems.",
      stim="HISET-T2-W2"),
    L(2, LANG, 2, "Clear wording", f"[7] {ASK}",
      [NC, "This job is a job I would like to talk about.", "Talking about the job, more, I would welcome.",
       "I would welcome, the chance to talk with you, more."], 0,
      "The draft is clear and polite. The other versions repeat \"job,\" scramble the word order, or add commas that break up the sentence.",
      stim="HISET-T2-W2"),
    L(2, CONV, 1, "Pronoun case", f"[8] {ASK}",
      [NC, "My current manager and I", "Myself and my current manager", "My current manager and me"], 1,
      "The pronoun is part of the subject, so it takes the subject form \"I,\" and courtesy puts the other person first. \"Me\" and \"myself\" are not used as subjects.",
      stim="HISET-T2-W2"),
    L(2, CONV, 2, "Subject-verb agreement", f"[9] {ASK}",
      [NC, "is available", "are available", "were available"], 0,
      "The subject of both verbs is \"I\" (\"I can be reached ... and am available\"), so \"am\" is correct.",
      stim="HISET-T2-W2"),
    L(2, LANG, 2, "Style and tone", f"[10] {ASK}",
      [NC, "Thank you for your time and consideration.", "Thx for reading!!",
       "Your time is something I thank you for, a lot."], 1,
      "A short, formal thank-you suits a letter to a hiring manager. The draft is slang and a comma splice, \"Thx\" is too casual, and \"something I thank you for, a lot\" is awkward.",
      stim="HISET-T2-W2"),

    # ---------------- Drill only: Draft D1 (report) ----------------
    Q(0, ORG, 1, "Relevance of content",
      "[1] The writer is considering deleting the underlined sentence. Should the writer make this deletion?",
      ["No, because it explains how the program works", "Yes, because it only repeats the number of bikes and stations",
       "Yes, because it is about phones, not bikes", "No, because it gives the cost of a ride"],
      "Readers need to know how bike share works before the report discusses its use, and this sentence explains it.",
      stim="HISET-D-W1", basics="deletingSentence"),
    Q(0, ORG, 2, "Topic sentence",
      "[2] Why does the underlined sentence work as the opening of paragraph 2?",
      ["It states the point the trip numbers then support", "It gives the date the program started",
       "It contrasts the program with buses", "It introduces the problems with stations running out of bikes"],
      "\"Use has grown steadily\" is the paragraph's main point, and the trip counts that follow are the evidence.",
      stim="HISET-D-W1", basics="topicSentences"),
    L(0, LANG, 1, "Precise word choice", f"[3] {ASK}",
      [NC, "rose", "rose upward", "exploding"], 1,
      "The paragraph calls the growth steady, so the plain \"rose\" fits. \"Exploded wildly\" exaggerates, \"rose upward\" repeats itself, and \"exploding\" cannot be the sentence's verb.",
      stim="HISET-D-W1", basics="preciseWords"),
    L(0, ORG, 1, "Topic sentence",
      "[4] Which choice is the best first sentence for paragraph 3?",
      [NC, "Riders often use the bikes as part of a longer trip.", "Some stations are near a lake.",
       "The bike app can be used in four different languages."], 1,
      "Paragraph 3 explains that riders use the bikes to reach buses and trains, so a sentence about longer trips introduces it. The color of the bikes is beside the point.",
      stim="HISET-D-W1", basics="topicSentences"),
    L(0, CONV, 2, "Punctuation", f"[5] {ASK}",
      [NC, "For these riders, the bikes fill a gap: the last mile", "For these riders, the bikes fill a gap. The last mile",
       "For these riders the bikes fill a gap the last mile"], 1,
      "A colon introduces the phrase that names the gap. A semicolon must join two complete sentences, and \"the last mile between transit and home\" is not one; a period would leave that phrase as a fragment.",
      stim="HISET-D-W1"),
    L(0, ORG, 1, "Transitions", f"[6] {ASK}",
      [NC, "Therefore,", "For example,", "Likewise,"], 0,
      "The report turns from the program's success to its problems, a contrast that \"However\" signals. \"Therefore\" signals a result, \"For example\" an example and \"Likewise\" a similarity.",
      stim="HISET-D-W1", basics="transitions"),
    L(0, CONV, 1, "Subject-verb agreement", f"[7] {ASK}",
      [NC, "The city has hired", "The city were hiring", "The city are hiring"], 1,
      "\"The city\" is singular, so it takes \"has hired.\" \"Have,\" \"were\" and \"are\" are plural forms.",
      stim="HISET-D-W1", basics="subjectVerb"),
    L(0, CONV, 2, "Subject-verb agreement", f"[8] {ASK}",
      [NC, "Each of the stations needs more docks", "Each of the stations are needing more docks",
       "Each of the stations have needed more docks"], 1,
      "The subject is \"Each,\" which is singular, so the verb is \"needs.\" \"Stations\" is part of the phrase that follows it.",
      stim="HISET-D-W1", basics="subjectVerb"),
    L(0, LANG, 2, "Concise wording", f"[9] {ASK}",
      [NC, "The report recommends adding twenty stations, and it also recommends using discounts.",
       "Adding twenty stations is recommended, and also discounts, by the report.",
       "The report, recommending twenty stations, discounts are also used."], 0,
      "The draft gives both recommendations in one clear sentence. Repeating \"recommends\" adds words, and the passive and dangling versions are confusing or ungrammatical.",
      stim="HISET-D-W1", basics="concision"),

    # ---------------- Drill only: Draft D2 (personal account) ----------------
    L(0, CONV, 1, "Run-on sentences", f"[1] {ASK}",
      [NC, "As a child, I was too scared; as an adult, I was too embarrassed.",
       "As a child, I was too scared, and as an adult, too embarrassed, I was.",
       "As a child I was too scared as an adult I was too embarrassed."], 1,
      "The draft joins two sentences with a comma. A semicolon separates them and keeps the balanced contrast. Dropping all punctuation makes a run-on, and \"too embarrassed, I was\" is awkward.",
      stim="HISET-D-W2", basics="commaSplices"),
    Q(0, ORG, 2, "Topic sentence",
      "[2] How does the underlined sentence help paragraph 2?",
      ["It sets up the fear the paragraph then describes", "It tells how long the lessons lasted",
       "It introduces the instructor's background", "It explains why the writer chose this pool and instructor"],
      "The paragraph goes on to describe clinging to the side of the pool, which shows how frightening the first lesson was.",
      stim="HISET-D-W2", basics="topicSentences"),
    L(0, CONV, 2, "Run-on sentences", f"[3] {ASK}",
      [NC, "She taught me to float first. She said", "She taught me to float first, and saying",
       "She taught me to float, first she said"], 1,
      "Two complete sentences are joined by only a comma. A period separates them. \"And saying\" leaves the second part without a subject, and moving \"first\" keeps the comma splice.",
      stim="HISET-D-W2", basics="commaSplices"),
    L(0, ORG, 1, "Topic sentence",
      "[4] Which choice is the best first sentence for paragraph 3?",
      [NC, "Slowly, the lessons began to work.", "Grace once swam across a very large lake.",
       "Many pools have a deep end."], 1,
      "Paragraph 3 traces the writer's progress week by week, so a sentence about the lessons starting to work introduces it. How pools are cleaned is off topic.",
      stim="HISET-D-W2", basics="topicSentences"),
    L(0, CONV, 1, "Pronoun case", f"[5] {ASK}",
      [NC, "Two other adult students and I", "Two other adult students and me", "Myself and two other adult students"], 1,
      "The pronoun is part of the subject, so it takes the subject form \"I.\" \"Me\" and \"myself\" are not used as subjects.",
      stim="HISET-D-W2"),
    L(0, ORG, 2, "Transitions", f"[6] {ASK}",
      [NC, "In the end,", "In contrast,", "For instance,"], 1,
      "The paragraph steps back from the lessons to sum up what they meant, which \"In the end\" signals. \"For example\" and \"For instance\" introduce an example, and \"In contrast\" a difference.",
      stim="HISET-D-W2", basics="transitions"),
    L(0, LANG, 2, "Concise wording", f"[7] {ASK}",
      [NC, "It's a lesson I now try to apply to everything new.",
       "It's a lesson I now try to apply and use for new things I try.",
       "Its a lesson that I apply, now, to every new thing that I try."], 1,
      "\"Apply\" and \"use\" mean the same here, and \"try ... try\" repeats a word. The short version keeps the meaning. \"Its\" without an apostrophe is the possessive, not \"it is.\"",
      stim="HISET-D-W2", basics="concision"),
    Q(0, ORG, 2, "Effective conclusion",
      "[8] Why does the underlined sentence work as an ending?",
      ["It returns to the ocean from the first paragraph", "It gives the instructor's name again to end the story",
       "It explains how pools are cleaned", "It lists the other adult students"],
      "The essay opens by saying the writer grew up near the ocean but could not swim, so planning to swim in it brings the story full circle.",
      stim="HISET-D-W2", basics="keepOnGoal"),
    L(0, LANG, 1, "Concise wording", f"[9] {ASK}",
      [NC, "I am excited, a little nervous and ready.", "I am excited and nervous and ready and I am.",
       "Excited, I am, and nervous, and ready."], 1,
      "Listing the three feelings after one \"I am\" says the same thing without repeating the subject and verb. The other versions repeat words or scramble the order.",
      stim="HISET-D-W2", basics="redundancy"),
]
