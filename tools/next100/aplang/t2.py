# Practice Test 2 (held out of the drills): two reading sets (12 + 12) and three writing sets (8 + 8 + 5).
# Every passage and draft is original, written for Tigertest.

STIMULI = [
    {"id": "APLANG-T2-R1", "title": "A commencement address by a physician, 1912 (practice text)", "text": (
        "Graduates, I was asked to give you advice, and I have little to give except one piece I learned by failing to follow it. "
        "You have spent four years being rewarded for right answers. The world you are entering will reward you, in the long run, "
        "for something else: for noticing when your answers are wrong.\n\n"
        "When I was a young doctor I treated a farmer for a fever that would not break. I was sure of my diagnosis. I had read the "
        "books, and the books agreed with me. For a week I gave him the medicine the books prescribed, and for a week he grew worse. "
        "It was his wife, who had no schooling beyond the village school, who pointed out that the fever rose every evening after he "
        "drank from a certain well. I had looked at his chart a hundred times. She had looked at him.\n\n"
        "I tell this story not to make myself humble before you, though humility would do me no harm, but because it holds the "
        "whole of what I know about my profession. The great danger to a physician is not ignorance. Ignorance can be cured with "
        "study. The great danger is certainty, which closes the eyes just when they most need to be open.\n\n"
        "You will be tempted, as I was, to defend your first judgment because it is yours. You will be tempted to treat a person "
        "who questions you as an enemy of your dignity. Resist. The farmer's wife was no enemy of mine; she was the best colleague "
        "I had that year. Every field you enter, whether it is law or teaching or business or the care of the sick, is full of such "
        "colleagues, and most of them will not have diplomas.\n\n"
        "So I will not wish you success, which will come or not as it pleases. I will wish you the courage to say, more often than "
        "you would like, 'I was wrong.' It is the hardest sentence in the language, and the most useful.")},
    {"id": "APLANG-T2-R2", "title": "An essay by a former newspaper editor, 2021 (practice text)", "text": (
        "For eleven years I ran the corrections column of a midsize daily newspaper. It was the least read part of the paper and, "
        "I came to believe, the most important. Every correction we printed admitted that we had gotten something wrong: a name "
        "misspelled, a date confused, a quotation credited to the wrong council member. Some of my colleagues thought the column "
        "made us look careless. I thought it was the clearest evidence we had that we were careful.\n\n"
        "The reasoning is simple, though it runs against instinct. Every newspaper makes mistakes, because every newspaper is "
        "written quickly by people. A paper that never prints a correction has not avoided error; it has avoided admitting it. "
        "Readers are not fools. They notice the misspelled name of their own street. If they never see us fix it, they conclude "
        "that we do not care, or worse, that we do not check.\n\n"
        "Surveys of news audiences point the same way. Readers who see a clear, prompt correction tend to rate the outlet as more "
        "trustworthy, not less. What damages trust is the quiet fix: the online story changed overnight with no note, so that a "
        "reader who saw the error the day before now wonders whether she imagined it.\n\n"
        "I do not want to romanticize the column. Some corrections were embarrassing, and a few pointed to failures of reporting "
        "that should have been caught long before print. A correction is not a substitute for getting it right. But the choice a "
        "newsroom faces is not between perfection and error. It is between error that is acknowledged and error that is hidden.\n\n"
        "When I left the paper, a reader sent me a note. She had read the corrections column every morning for years, she wrote, "
        "because it was the only part of the paper that told her exactly what we had not known the day before. I keep the note on my desk.")},
    {"id": "APLANG-T2-W3", "title": "A student's draft: public drinking fountains (practice text)", "text": (
        "(1) A century ago, most American parks had public drinking fountains, and many downtown streets did too. (2) Over the "
        "decades, as bottled water became common and repairs went undone, many of those fountains were capped or removed. (3) Today "
        "a person who gets thirsty in our downtown has two choices: buy a drink or go without.\n\n"
        "(4) The loss is not only a matter of convenience. (5) People who work outdoors, such as delivery riders and street vendors, "
        "can spend hours in the summer sun. (6) Children playing in parks need water more often than adults realize. (7) Older "
        "adults are especially at risk of dehydration, because the sense of thirst weakens with age.\n\n"
        "(8) Modern fountains are not the rusty spouts many people remember. (9) Many include a bottle filler and a lower spout for "
        "children and wheelchair users. (10) Their water comes from the same public supply, tested to the same standards, as the "
        "water in our homes. (11) Some cities report that a single bottle filler in a busy park is used thousands of times a month.\n\n"
        "(12) Our city is renovating three downtown parks next spring. (13) Adding fountains during construction is far easier "
        "than adding them later. (14) The parks department should include them.")},
    {"id": "APLANG-T2-W4", "title": "A student's draft: a repair cafe at the library (practice text)", "text": (
        "(1) Last spring, a toaster, a lamp, and a pair of jeans arrived at our town library on the same Saturday morning. (2) None "
        "of them was there to be borrowed. (3) They had come to the library's first repair cafe, where volunteers with tools and "
        "sewing machines spent four hours fixing whatever neighbors carried in.\n\n"
        "(4) By noon the volunteers had repaired thirty-one items. (5) Most would otherwise have been thrown away. (6) Repair cafes "
        "began in the Netherlands in 2009 and have since spread to thousands of communities. (7) They work because many broken things "
        "need only a small fix; a loose wire, a worn belt, a missing button.\n\n"
        "(8) Our town should hold a repair cafe every month. (9) Each repaired item is one less thing in the landfill and one less "
        "purchase for a family on a tight budget. (10) Repair cafes also do something that is harder to measure. (11) A teenager who "
        "watches a retired electrician open a lamp learns how it works, and the electrician is there too.\n\n"
        "(12) The library has offered its meeting room at no charge. (13) What the program needs now is more volunteers, and anyone "
        "who can sew, solder, or simply hold a flashlight is welcome.")},
    {"id": "APLANG-T2-W5", "title": "A student's draft: a buried creek (practice text)", "text": (
        "(1) A creek once ran through the center of our town. (2) In the 1950s, it was sealed inside a concrete pipe and buried "
        "under a parking lot. (3) Several cities have recently dug up buried streams and restored them to open channels, a practice "
        "called daylighting. (4) An open stream can hold more water during storms than a pipe, so nearby streets flood less often. "
        "(5) It also gives fish and birds a place to live. (6) The town plans to repave the lot next year. (7) Before it does, it "
        "should study whether our creek could be brought back to the surface.")},
]

ITEMS = [
    # ---------- Set 1: the physician's address (12) ----------
    Q(2, 1, RSR, PURPOSE,
      "The speaker's primary purpose in the address is to",
      ["urge the graduates to question their own judgments", "describe the training needed to become a physician", "warn the graduates against careers in medicine", "praise the education the graduates have received"],
      "The story, the lesson about certainty and the closing wish all point the graduates toward admitting error. The speaker's career is the example, not the subject.",
      "APLANG-T2-R1"),
    Q(2, 2, RSR, AUDIENCE,
      "In the first paragraph, the speaker builds credibility with the audience mainly by",
      ["admitting he learned his advice by failing", "listing the honors he has received", "noting how many years he has practiced medicine", "quoting respected medical textbooks"],
      "Saying that his one piece of advice came from \"failing to follow it\" makes him seem honest rather than superior. He names no honors, years or textbooks.",
      "APLANG-T2-R1"),
    Q(2, 2, ROR, STRUCT,
      "The first paragraph prepares for the rest of the address mainly by",
      ["contrasting what school rewards with what life rewards", "summarizing the story the speaker is about to tell", "posing a question that the speaker later answers", "describing the setting of the graduation ceremony"],
      "School rewarded right answers; the world will reward \"noticing when your answers are wrong.\" The rest of the address explains that contrast. The story itself is not summarized.",
      "APLANG-T2-R1"),
    Q(2, 1, CER, EVID,
      "The story in the second paragraph serves mainly as evidence that",
      ["certainty can blind an expert to the facts", "village schools teach practical knowledge", "fevers are often caused by bad water", "medical books of the time were unreliable"],
      "The speaker was sure of his diagnosis and missed what was in front of him, which the third paragraph names directly: \"The great danger is certainty.\" The well is a detail of the story, not its point.",
      "APLANG-T2-R1"),
    Q(2, 2, CER, CLAIM,
      "The sentences \"I had looked at his chart a hundred times. She had looked at him.\" suggest that the speaker had",
      ["relied on records instead of observing the patient", "ignored the farmer's chart entirely", "visited the farmer less often than his wife had done", "lacked the training needed to read a chart"],
      "The contrast between the chart and \"him\" shows that the doctor studied paper while the wife watched the patient and noticed the pattern. He had looked at the chart often, not ignored it.",
      "APLANG-T2-R1"),
    Q(2, 2, ROR, LINE,
      "The third paragraph functions mainly to",
      ["draw a general lesson from the story just told", "introduce a second story from the speaker's career", "answer an objection raised by the graduates", "shift the focus from medicine to other fields"],
      "\"I tell this story ... because it holds the whole of what I know\" turns the anecdote into a principle about certainty. Other fields appear only in the fourth paragraph.",
      "APLANG-T2-R1"),
    Q(2, 3, CER, CLAIM,
      "In the third paragraph, the speaker distinguishes ignorance from certainty on the grounds that",
      ["study cures ignorance, while certainty blinds", "certainty is found mainly among the young", "ignorance is the greater of the two dangers", "both can be avoided by careful reading"],
      "\"Ignorance can be cured with study,\" while certainty \"closes the eyes.\" The speaker calls certainty the greater danger, the reverse of the third choice.",
      "APLANG-T2-R1"),
    Q(2, 2, STR, SYNTAX,
      "In the fourth paragraph, the repetition of \"You will be tempted\" mainly serves to",
      ["stress the pressures the graduates will face", "suggest that the speaker doubts the graduates", "create humor through exaggeration", "signal a shift to an unrelated topic"],
      "Repeating the phrase piles up the temptations the graduates will meet, preparing for the command \"Resist.\" It is serious, not comic, and the topic continues.",
      "APLANG-T2-R1"),
    Q(2, 2, STR, SYNTAX,
      "The one-word sentence \"Resist.\" is effective mainly because it",
      ["gives a direct command after building tension", "contrasts with the technical language of medicine", "repeats a word the speaker used earlier", "leaves the graduates' choice deliberately open"],
      "After two long sentences describing temptations, a single word delivers the speaker's instruction with force. It does not repeat an earlier word or leave the choice open.",
      "APLANG-T2-R1"),
    Q(2, 3, CER, EVID,
      "The speaker's claim that most of the graduates' colleagues \"will not have diplomas\" is supported within the passage by",
      ["the example of the farmer's wife", "statistics about education at the time", "the graduates' experiences in school", "the opinions of other physicians"],
      "The wife, who had \"no schooling beyond the village school,\" proved the best colleague the doctor had that year. That example is the only support the passage gives.",
      "APLANG-T2-R1"),
    Q(2, 3, ROR, LINE,
      "In the final paragraph, the speaker declines to wish the graduates success in order to",
      ["stress that honesty about error matters more", "suggest that most of the graduates will fail", "show his doubts about the value of college", "avoid repeating what earlier speakers said"],
      "By setting aside success, \"which will come or not as it pleases,\" the speaker makes room for the wish he values more: the courage to say \"I was wrong.\" He does not predict failure.",
      "APLANG-T2-R1"),
    Q(2, 1, STR, TONE,
      "The speaker's tone in the final paragraph is best described as",
      ["warm but candid", "bitter and regretful", "playful and ironic", "formal and detached"],
      "He offers a heartfelt wish while admitting that saying \"I was wrong\" is hard. The paragraph is neither bitter nor joking, and its direct address is not detached.",
      "APLANG-T2-R1"),

    # ---------- Set 2: the corrections column (12) ----------
    Q(2, 1, RSR, PURPOSE,
      "The writer's primary purpose is to",
      ["defend corrections as a sign of a careful newspaper", "explain how newspapers check their facts before printing", "criticize readers who complain about small errors", "describe the daily routine of a busy newsroom"],
      "The essay argues that admitting errors shows care and builds trust, against colleagues who thought it made the paper look careless. Fact-checking and newsroom routine are not its subject.",
      "APLANG-T2-R2"),
    Q(2, 2, RSR, AUDIENCE,
      "The first paragraph establishes the writer's authority mainly through",
      ["the writer's long experience running the column", "the awards the newspaper received over the years", "a survey of readers that the writer conducted", "praise for the column from the writer's colleagues"],
      "\"For eleven years I ran the corrections column\" gives the writer firsthand knowledge. Some colleagues criticized the column rather than praising it, and the surveys mentioned later were not the writer's.",
      "APLANG-T2-R2"),
    Q(2, 2, RSR, PURPOSE,
      "The writer most likely mentions the colleagues' view in the first paragraph in order to",
      ["set up the view the essay argues against", "show that the writer once shared that view", "suggest that the column should be shortened", "explain why the column was rarely read"],
      "The colleagues thought the column made the paper look careless; the next sentence and the rest of the essay argue the opposite. The writer never shared their view.",
      "APLANG-T2-R2"),
    Q(2, 2, ROR, TRANS,
      "In the second paragraph, the sentence \"The reasoning is simple, though it runs against instinct\" functions as",
      ["a transition that introduces an explanation", "a concession to the writer's skeptical colleagues", "a summary of the evidence given so far", "the central claim of the whole essay"],
      "The sentence announces that an argument is coming, and the rest of the paragraph supplies it. The central claim appears at the end of the first paragraph.",
      "APLANG-T2-R2"),
    Q(2, 2, CER, EVID,
      "The writer supports the claim that \"Readers are not fools\" with the observation that readers",
      ["notice errors about places they know", "read every section of the newspaper", "write letters disputing the paper's opinions", "prefer printed papers to news online"],
      "\"They notice the misspelled name of their own street\" shows that readers catch errors, so hiding them does not work. The other choices are not in the passage.",
      "APLANG-T2-R2"),
    Q(2, 2, CER, EVID,
      "The writer refers to surveys in the third paragraph primarily to",
      ["support the claim that corrections build trust", "show that most readers never notice small errors", "argue that online news is less accurate", "suggest that corrections should be brief"],
      "The surveys find that readers who see prompt corrections rate the outlet as more trustworthy, which backs the writer's position. They say nothing about online accuracy or length.",
      "APLANG-T2-R2"),
    Q(2, 2, STR, DICTION,
      "The phrase \"the quiet fix\" in the third paragraph conveys the writer's view that such changes are",
      ["deceptive because no one announces them", "harmless because the errors are small", "rare because editors avoid making them", "efficient because they take little space"],
      "The writer describes a story \"changed overnight with no note,\" leaving readers to doubt themselves, which damages trust. \"Quiet\" stresses that the change is hidden.",
      "APLANG-T2-R2"),
    Q(2, 3, CER, QUAL,
      "In the fourth paragraph, the writer qualifies the argument by acknowledging that",
      ["a correction cannot excuse poor reporting", "most readers skip the corrections column entirely", "online stories should never be changed", "the column made the paper look careless"],
      "\"A correction is not a substitute for getting it right\" limits the defense of the column. The writer still rejects the colleagues' view that it made the paper look careless.",
      "APLANG-T2-R2"),
    Q(2, 3, ROR, LINE,
      "The last two sentences of the fourth paragraph develop the argument by",
      ["reframing the choice that a newsroom faces", "introducing a new piece of evidence", "conceding that hidden errors are actually rare", "predicting the future of newspapers"],
      "The writer replaces \"perfection versus error\" with \"acknowledged versus hidden error,\" a choice in which corrections are clearly better. No evidence or prediction is offered.",
      "APLANG-T2-R2"),
    Q(2, 2, STR, SYNTAX,
      "The parallel phrases \"error that is acknowledged and error that is hidden\" mainly emphasize",
      ["the two real options the writer sees", "the writer's regret over past mistakes", "how hard it is to find every error", "the gap between print and online news"],
      "Repeating \"error that is\" with opposite endings shows that error is a given and only the response differs. The phrases do not express regret.",
      "APLANG-T2-R2"),
    Q(2, 2, ROR, STRUCT,
      "The anecdote in the final paragraph serves mainly to",
      ["close with a reader's view that echoes the claim", "introduce a new point about online news", "explain why the writer finally left the newspaper", "show how rarely readers contact editors"],
      "The reader valued the column because it told her what the paper had not known, the same point the writer has argued. The note does not explain the writer's departure.",
      "APLANG-T2-R2"),
    Q(2, 1, STR, TONE,
      "The writer's attitude toward the corrections column is best described as",
      ["proud but clear-eyed", "embarrassed and defensive", "amused and dismissive", "indifferent and resigned"],
      "The writer calls the column \"the most important\" part of the paper and keeps the reader's note, yet admits some corrections were embarrassing. That mix is pride without illusions.",
      "APLANG-T2-R2"),

    # ---------- Set 3: drinking fountains draft (8) ----------
    Q(2, 2, RSW, PURPOSE,
      "The writer is considering deleting sentence 3. Should the writer keep or delete this sentence?",
      ["Keep it, because it puts the problem in the reader's own terms", "Keep it, because it explains why the old fountains were removed", "Delete it, because it repeats the point made in sentence 2", "Delete it, because it is unrelated to the draft's argument"],
      "Sentence 3 turns the history in sentences 1 and 2 into a present problem any reader can picture. The reasons for removal are in sentence 2, not sentence 3.",
      "APLANG-T2-W3"),
    Q(2, 3, ROW, STRUCT,
      "The writer wants to add the following sentence to the draft.\n\nMany were installed in the early 1900s as a public health measure.\n\nWhere would the sentence best be placed?",
      ["After sentence 1", "After sentence 3", "After sentence 8", "After sentence 11"],
      "\"Many\" refers to the fountains of a century ago in sentence 1, and the sentence continues that history before sentence 2 explains their removal. Sentences 8 to 11 are about modern fountains.",
      "APLANG-T2-W3"),
    Q(2, 2, STW, PUNCT,
      "In sentence 3 (reproduced below), which version of the underlined text is most clear?\n\nToday a person who gets thirsty in our downtown has two __choices: buy__ a drink or go without.",
      ["(as it is now)", "choices; buy", "choices, buy", "choices, they are buy"],
      "A colon introduces the two choices the sentence has just announced. A semicolon must join two independent clauses, a comma blurs the relationship, and \"they are\" after a comma creates a comma splice.",
      "APLANG-T2-W3"),
    Q(2, 2, CEW, EVID,
      "The writer wants to support the claim in sentence 7. Which evidence would best accomplish this goal?",
      ["A medical study of how the sense of thirst changes with age", "A list of the parks where older adults most often gather", "A photograph of one of the city's old, rusty fountains", "Figures on how much bottled water is now sold each year"],
      "Sentence 7 explains the risk by saying thirst weakens with age; a study of thirst and age supports that reason directly. The other evidence does not address it.",
      "APLANG-T2-W3"),
    Q(2, 1, ROW, TRANS,
      "The writer wants to add a word or phrase at the beginning of sentence 9, adjusting the capitalization as needed. Which choice best connects it to sentence 8?",
      ["For example,", "However,", "In contrast,", "As a result,"],
      "Sentence 9 gives features that show modern fountains are not \"rusty spouts,\" so it illustrates sentence 8. Nothing in it contrasts with or results from sentence 8.",
      "APLANG-T2-W3"),
    Q(2, 2, CEW, EVID,
      "The writer is considering adding the following sentence after sentence 10.\n\nAncient Rome had hundreds of public fountains fed by its aqueducts.\n\nShould the writer add this sentence?",
      ["No, because it does not support the case for new fountains here", "No, because it contradicts the description in sentence 8", "Yes, because it shows that public fountains are a proven idea", "Yes, because it explains how modern fountain water is tested"],
      "The paragraph shows that modern fountains are clean and well used. A fact about ancient Rome interrupts that point and does nothing for the proposal.",
      "APLANG-T2-W3"),
    Q(2, 3, RSW, AUDIENCE,
      "The writer plans to send the draft to the parks department. Which sentence, added after sentence 14, would best address the department's likely concern about upkeep?",
      ["Several neighborhood groups have offered to report any fountain that stops working.", "Drinking fountains were once made of cast iron or of carved stone in many cities.", "Many people now carry their own refillable bottles of water wherever they go.", "Some of the old fountains were decorated with colorful tiles or with carvings."],
      "A parks department will worry about keeping fountains working; volunteers who report problems speak to that concern. The others are history or habits.",
      "APLANG-T2-W3"),
    Q(2, 3, STW, TONE,
      "The writer wants to revise sentence 14 so that the draft ends by recalling the choice described in sentence 3. Which choice best accomplishes this goal?",
      ["The parks department should include them, so no one downtown must buy a drink or go without.", "The parks department should include them in its plans as soon as it possibly can.", "The parks department should include them in all three of the parks it is renovating.", "The parks department should include them and tell the public about its decision."],
      "Echoing \"buy a drink or go without\" from sentence 3 frames the draft and reminds readers what the fountains would fix. The other versions only restate the request.",
      "APLANG-T2-W3"),

    # ---------- Set 4: repair cafe draft (8) ----------
    Q(2, 2, RSW, PURPOSE,
      "Sentences 1 and 2 serve mainly to",
      ["create curiosity before the event is explained", "list the kinds of items the library lends", "show that the library had too many visitors that day", "describe the writer's own broken appliances"],
      "A toaster, a lamp and jeans that came to a library but were not \"there to be borrowed\" make a small puzzle that sentence 3 solves, drawing the reader in. The items were not the writer's or the library's.",
      "APLANG-T2-W4"),
    Q(2, 2, CEW, EVID,
      "The writer is considering deleting sentence 6. Should the writer keep or delete this sentence?",
      ["Keep it, because it shows the idea has worked in many places", "Keep it, because it explains why so many household things break", "Delete it, because it contradicts the figure in sentence 4", "Delete it, because it shifts to the history of libraries"],
      "Showing that repair cafes have spread to thousands of communities supports the proposal that the town hold one regularly. It says nothing about why things break or about libraries.",
      "APLANG-T2-W4"),
    Q(2, 2, STW, PUNCT,
      "In sentence 7 (reproduced below), which version of the underlined text is most clear?\n\nThey work because many broken things need only a small __fix; a loose__ wire, a worn belt, a missing button.",
      ["fix: a loose", "(as it is now)", "fix, and a loose", "fix. A loose"],
      "A colon introduces the list of examples. A semicolon must join two independent clauses, \"and\" wrongly adds the list as another thing needed, and a period leaves the list as a fragment.",
      "APLANG-T2-W4"),
    Q(2, 2, CEW, EVID,
      "The writer wants to support the claim in sentence 9 that repairs keep things out of the landfill. Which choice best accomplishes this goal?",
      ["Together the thirty-one items weighed more than eighty pounds.", "Some of the items brought in were more than twenty years old.", "The volunteers brought their own tools and supplies from home.", "The pair of jeans needed nothing more than a new button."],
      "The total weight of the repaired items measures what stayed out of the landfill. The age of the items and the volunteers' tools do not.",
      "APLANG-T2-W4"),
    Q(2, 1, ROW, TRANS,
      "The writer wants to add a word or phrase at the beginning of sentence 11, adjusting the capitalization as needed. Which choice best connects it to sentence 10?",
      ["For example,", "However,", "In conclusion,", "Instead,"],
      "Sentence 10 says repair cafes do something harder to measure; sentence 11 gives an instance of it. \"However\" and \"Instead\" signal a contrast that is not there.",
      "APLANG-T2-W4"),
    Q(2, 2, STW, DICTION,
      "In sentence 11 (reproduced below), the writer wants to show what both people gain.\n\nA teenager who watches a retired electrician open a lamp learns how it works, __and the electrician is there too__.\n\nWhich version of the underlined text best accomplishes this goal?",
      ["and the electrician passes on a skill that might be lost", "(as it is now)", "and the electrician is also at the library that day", "and the electrician has brought a lot of tools along"],
      "The teenager gains knowledge; the revision gives the electrician a matching gain, the chance to pass on a skill. The other versions say only where the electrician is or what the electrician brought.",
      "APLANG-T2-W4"),
    Q(2, 3, ROW, STRUCT,
      "The writer wants to divide the second paragraph into two paragraphs. The new paragraph should begin with",
      ["sentence 6", "sentence 5", "sentence 7", "sentence 8"],
      "Sentences 4 and 5 report the day's results; sentences 6 and 7 turn to background on repair cafes in general. Sentence 8 already begins the third paragraph.",
      "APLANG-T2-W4"),
    Q(2, 3, RSW, AUDIENCE,
      "The writer plans to publish the draft in the town newsletter. Which sentence, added after sentence 13, would best appeal to readers who might attend?",
      ["Bring a broken item next time, and a volunteer will show you the fix.", "The Netherlands now has repair cafes in many of its larger cities.", "Electricians must hold a license to do paid work in most places.", "Libraries have changed a great deal over the past twenty years."],
      "A newsletter reader is invited directly to come and learn. The other sentences give background that does not speak to the reader's own part.",
      "APLANG-T2-W4"),

    # ---------- Set 5: buried creek draft (5) ----------
    Q(2, 2, STW, SYNTAX,
      "Which choice most effectively combines sentences 1 and 2 (reproduced below)?\n\nA creek once ran through the center of our town. In the 1950s, it was sealed inside a concrete pipe and buried under a parking lot.",
      ["A creek once ran through the center of our town until, in the 1950s, it was sealed inside a concrete pipe and buried under a parking lot.", "A creek once ran through the center of our town, in the 1950s it was sealed inside a concrete pipe and buried under a parking lot.", "A creek once ran through the center of our town, and so in the 1950s it was sealed inside a concrete pipe and buried under a parking lot.", "Sealed inside a concrete pipe in the 1950s, a parking lot buried the creek that once ran through the center of our town."],
      "\"Until\" shows that the creek ran in the open up to the time it was buried. The second choice is a comma splice, \"and so\" invents a cause, and the last makes the parking lot the thing that was sealed in a pipe.",
      "APLANG-T2-W5"),
    Q(2, 2, CEW, EVID,
      "The writer is considering adding the following sentence after sentence 3.\n\nThe word daylighting is also used for designing buildings that let in natural light.\n\nShould the writer add this sentence?",
      ["No, because it does not support the argument for restoring the creek", "No, because it repeats the information already given in sentence 2", "Yes, because it defines a term that readers may not have heard", "Yes, because it shows how widespread the practice has become"],
      "The other meaning of \"daylighting\" has nothing to do with streams, so it distracts from the proposal. Sentence 3 already explains what daylighting a stream means.",
      "APLANG-T2-W5"),
    Q(2, 2, CEW, EVID,
      "Which choice, if added after sentence 4, would best support the claim it makes?",
      ["After one city restored a buried creek, nearby streets flooded far less often.", "Concrete pipes can last for many decades if they are carefully maintained.", "Many small creeks run nearly dry during the hottest months of late summer.", "Most parking lots are paved with asphalt rather than with poured concrete."],
      "Sentence 4 claims that an open stream reduces flooding; a city where flooding fell after daylighting supports it. The other facts do not concern flooding.",
      "APLANG-T2-W5"),
    Q(2, 1, ROW, TRANS,
      "The writer wants to add a word or phrase at the beginning of sentence 7, adjusting the capitalization as needed. Which choice best connects it to the rest of the draft?",
      ["Therefore,", "For example,", "In contrast,", "Similarly,"],
      "The benefits in sentences 4 and 5 and the repaving in sentence 6 lead to the conclusion in sentence 7, so \"Therefore\" fits. Sentence 7 is not an example or a contrast.",
      "APLANG-T2-W5"),
    Q(2, 3, RSW, AUDIENCE,
      "The writer wants to add a sentence after sentence 7 that speaks to residents who would miss the parking spaces. Which choice best accomplishes this goal?",
      ["A restored creek could run beside a smaller lot that keeps most of its spaces.", "Fish often return to a stream within a few years of its being opened up.", "Concrete pipes were widely used for drainage during the 1950s and 1960s.", "Some towns have held contests to choose names for their restored creeks."],
      "Residents who park in the lot want to know they will not lose it; a design that keeps most of the spaces answers that worry. The others do not mention parking.",
      "APLANG-T2-W5"),
]
