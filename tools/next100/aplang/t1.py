# Practice Test 1: two reading sets (12 + 12) and three writing sets (8 + 8 + 5).
# Every passage and draft is original, written for Tigertest.

STIMULI = [
    {"id": "APLANG-T1-R1", "title": "A speech by a library trustee to a city council, 1876 (practice text)", "text": (
        "Gentlemen of the council, you have asked me to speak briefly, and I will try to honor the request, though the subject "
        "tempts a man to speak at length. You are asked tonight to spend the public money on a free library. I know the objection "
        "before it is raised. A library, it is said, is a luxury for the idle, and this is a city of workers who have no time to read.\n\n"
        "Consider who those workers are. The young man at the foundry who learned his trade by watching another man's hands may one "
        "day wish to know why the iron behaves as it does. The clerk who copies letters all day may wish to write one of his own "
        "that is worth copying. The mother who cannot afford a single book on the care of children is not idle; she is busier than "
        "any of us. It is precisely because these citizens have little time and less money that a free library is no luxury for "
        "them. The rich man has his own shelves. The poor man has only ours.\n\n"
        "Some of you have said that the saloon and the street corner will always draw more men than any reading room. Perhaps they "
        "will. But I have never heard it argued that because some men will drink, no man should be offered water. Open the doors, "
        "light the lamps until ten o'clock, and let us see whom we draw.\n\n"
        "I will not pretend that books make men good. I have known well-read scoundrels, and so have you. A library makes no promise "
        "about character. It promises only that a citizen who wishes to improve himself will not be turned away for want of the "
        "price of a book. In a republic that asks every man to judge the questions of the day at the ballot box, that seems a "
        "modest promise and a prudent one.\n\n"
        "The plan has been laid before you: a rented hall, a librarian, a few thousand volumes to begin. You spend more each year on "
        "the paving of streets, and you do so because a city cannot do its business on roads of mud. I ask you only to pave one road more.")},
    {"id": "APLANG-T1-R2", "title": "An essay by an urban planner, 2019 (practice text)", "text": (
        "Walk through the center of almost any American city and count the places where you could sit down without buying "
        "something. In many downtowns the number is small and shrinking. Benches have been removed from bus stops, ledges have been "
        "fitted with metal studs, and the few seats that remain are often divided by armrests placed so that no one can lie down. "
        "Each of these choices was made for a reason, usually a complaint. Together they have produced streets that quietly tell a "
        "large share of the public to keep moving.\n\n"
        "The people most affected are not the ones the changes were aimed at. An older man who walks to the pharmacy needs to rest "
        "halfway there. A woman eight months pregnant waits twenty minutes for a bus. A child with a sprained ankle, a delivery "
        "worker on a break, a tourist reading a map: all of them use a bench in the way a bench is meant to be used. When a city "
        "removes seating to discourage one kind of visitor, it discourages every kind.\n\n"
        "Planners have known this for decades. Researchers who filmed public plazas found that the most successful ones, the places "
        "people chose to linger, had one feature in common: plenty of places to sit, preferably seats that people could move. A "
        "plaza with nowhere to sit stood empty at lunchtime while a plainer one across the street filled up. People attract people, "
        "and seating is what keeps them long enough to attract anyone.\n\n"
        "None of this means that complaints about benches are imaginary. Seating that is never cleaned or repaired becomes a "
        "nuisance, and a bench in the wrong spot can block a doorway. But the answer to a poorly managed bench is a well-managed one, "
        "not an empty sidewalk. Cities that have added seating and paid for its upkeep report busier streets, and busy streets are, "
        "by most measures, safer ones.\n\n"
        "A bench costs less than almost anything else a city builds. It asks nothing of the person who uses it. It may be the most "
        "democratic piece of furniture we have, and we should stop treating it as a problem to be solved.")},
    {"id": "APLANG-T1-W3", "title": "A student's draft: street trees (practice text)", "text": (
        "(1) On a July afternoon, a group of volunteers in our city carried thermometers along two streets a few blocks apart. "
        "(2) One street was lined with mature oak trees, and the other had almost none. (3) The sidewalk on the treeless street "
        "was more than twenty degrees hotter.\n\n"
        "(4) Results like these say something about trees. (5) Shade lowers the temperature of pavement and of the air above it, "
        "which matters most during heat waves. (6) Heat kills more people in the United States in a typical year than any other "
        "kind of weather. (7) Trees also soak up rainwater, reducing the flooding that overwhelms storm drains after heavy storms.\n\n"
        "(8) Some residents worry that tree roots will crack sidewalks. (9) This concern is reasonable. (10) Choosing smaller "
        "species and wider planting strips can prevent most of that damage.\n\n"
        "(11) The neighborhoods with the fewest trees are often the ones whose residents can least afford air conditioning. "
        "(12) A citywide planting program would help out with things for the people who need it most. (13) Planting trees is good.")},
    {"id": "APLANG-T1-W4", "title": "A student's draft: small museums online (practice text)", "text": (
        "(1) The county historical museum in my town owns more than forty thousand objects, from quilts to farm tools to letters "
        "written during the Civil War. (2) On any given day, fewer than a thousand of them are on display. (3) The rest sit in boxes "
        "in a basement storeroom that few people have ever seen.\n\n"
        "(4) Small museums like this one should photograph their collections and put the images online. (5) A student writing a "
        "report on local history could study the letters without traveling to the museum. (6) Families researching their "
        "ancestors could find a great-grandmother's quilt. (7) Researchers at universities, who rarely visit small museums, could "
        "discover objects that change what we know about the past.\n\n"
        "(8) Digitizing a collection is not free. (9) It takes cameras, storage, and staff time a small museum may have only one "
        "paid employee. (10) Many states offer grants for this kind of work, and college students often volunteer to help in "
        "exchange for experience.\n\n"
        "(11) A museum that keeps its collection in the basement protects the objects. (12) But protection is only half of a "
        "museum's job. (13) The other half is sharing, and sharing is important.")},
    {"id": "APLANG-T1-W5", "title": "A student's draft: apprenticeships (practice text)", "text": (
        "(1) When I told my teachers that I planned to become an electrician, several of them looked disappointed. (2) They assumed "
        "that a student with good grades should go to a four-year college. (3) But an apprenticeship let me earn a wage while I "
        "learned, and I finished my training with no debt. (4) Electricians are needed everywhere, and the work requires real "
        "knowledge of math and physics. (5) Schools should present apprenticeships as an equal choice, not a fallback. "
        "(6) Counselors could invite tradespeople to career days, and teachers could stop treating college as the only measure of "
        "success. (7) The country needs well-trained workers in the trades, and many students would choose that path if they knew "
        "it was respected.")},
]

ITEMS = [
    # ---------- Set 1: the library speech (12) ----------
    Q(1, 1, RSR, PURPOSE,
      "The speaker's exigence for the speech is",
      ["a proposal to spend public money on a library", "a recent loss of jobs at the city's foundry", "complaints about crime near the city's saloons", "a shortage of teachers in the city's schools"],
      "The first paragraph says the council is \"asked tonight to spend the public money on a free library,\" and the whole speech answers that question. The foundry and the saloons appear only as examples within the argument.",
      "APLANG-T1-R1"),
    Q(1, 2, RSR, AUDIENCE,
      "In the first sentence, the speaker's promise to speak briefly mainly serves to",
      ["win goodwill by respecting the council's wishes", "show that he knows little about libraries", "criticize the council for limiting each speaker's time", "summarize the argument he is about to make"],
      "By agreeing to honor the council's request, the speaker shows respect for his audience before asking it for money. He does not criticize the limit or summarize his case there.",
      "APLANG-T1-R1"),
    Q(1, 2, ROR, LINE,
      "The speaker states the objection that a library is \"a luxury for the idle\" in the first paragraph primarily in order to",
      ["answer it in the paragraphs that follow", "show that he shares the council's doubts", "prove that the city's workers dislike reading", "suggest that the library should charge a fee"],
      "Naming the objection first lets the speaker take it apart: the second paragraph shows that workers are not idle and that a free library matters most to those without money. He never agrees with it.",
      "APLANG-T1-R1"),
    Q(1, 1, CER, EVID,
      "The examples of the foundry worker, the clerk and the mother in the second paragraph serve mainly as evidence that",
      ["the city's workers have real uses for books", "most of the city's workers already own books", "the workers are better educated than the rich", "the library should hold mostly technical books"],
      "Each example shows a busy working person who could put a book to use, which answers the claim that workers have no need of a library. Nothing suggests the workers own books or are better educated.",
      "APLANG-T1-R1"),
    Q(1, 2, CER, CLAIM,
      "Which statement best expresses the claim of the second paragraph?",
      ["A free library matters most to those who cannot buy books", "Workers should be allowed to read books during working hours", "Wealthy citizens should give their books to the city", "Mothers need books more than any other citizens do"],
      "The paragraph builds to \"It is precisely because these citizens have little time and less money that a free library is no luxury for them,\" sharpened by the contrast between the rich man's shelves and \"ours.\"",
      "APLANG-T1-R1"),
    Q(1, 2, ROR, LINE,
      "The speaker's reasoning in the third paragraph relies mainly on",
      ["an analogy that exposes a flaw in an objection", "figures comparing saloons with reading rooms", "the authority of well-known temperance leaders", "a personal story about a man who stopped drinking"],
      "The speaker compares the objection to arguing that no one should be offered water because some will drink, showing that the objection proves too much. He offers no figures, authorities or personal story.",
      "APLANG-T1-R1"),
    Q(1, 3, CER, QUAL,
      "In the fourth paragraph, the speaker qualifies his argument by",
      ["conceding that reading does not guarantee good character", "admitting that the library may cost more than the council planned", "granting that most workers prefer the saloon to books", "agreeing that the poor have little time for reading"],
      "\"I will not pretend that books make men good\" limits the claim: the library promises opportunity, not virtue. The speaker never concedes on cost, and in the third paragraph he grants only that the saloon may draw more men.",
      "APLANG-T1-R1"),
    Q(1, 2, RSR, AUDIENCE,
      "The reference to \"a republic that asks every man to judge the questions of the day at the ballot box\" appeals chiefly to the council's",
      ["sense of civic responsibility", "fear of higher city taxes", "religious duty to the poor", "pride in the city's industry"],
      "Linking reading to voting presents the library as a support for self-government, an appeal to the councilmen as officials of a republic. The passage does not mention taxes, religion or civic pride in industry.",
      "APLANG-T1-R1"),
    Q(1, 2, STR, SYNTAX,
      "The sentences \"The rich man has his own shelves. The poor man has only ours.\" are effective mainly because their",
      ["short, parallel form sharpens the contrast", "formal wording flatters wealthy listeners", "questions invite the council to respond", "humor softens the speaker's criticism"],
      "Two brief sentences built the same way set the rich man against the poor man, so the difference in their access to books lands hard. They are statements, not questions, and they are not humorous.",
      "APLANG-T1-R1"),
    Q(1, 1, STR, TONE,
      "The speaker's tone throughout the speech is best described as",
      ["reasonable and persuasive", "bitter and accusatory", "nostalgic and sentimental", "detached and technical"],
      "He anticipates objections, concedes a point and argues by comparison, all while remaining courteous to the council. Nothing in the speech is bitter, nostalgic or technical.",
      "APLANG-T1-R1"),
    Q(1, 3, ROR, STRUCT,
      "The final paragraph develops the argument mainly through",
      ["a comparison between the library and paved streets", "a list of the books the library will first buy", "a warning about the dangers of doing nothing", "a summary of each of the objections the speaker answered"],
      "The speaker sets the library beside street paving, which the council already funds because the city needs it, and asks it to \"pave one road more.\" He does not list books or restate the objections.",
      "APLANG-T1-R1"),
    Q(1, 2, STR, DICTION,
      "In the last sentence, \"pave one road more\" functions as",
      ["a metaphor for funding the library", "a literal request for a new street", "an ironic comment on muddy roads", "a concession that streets come first"],
      "Having compared the library to paved streets, the speaker uses \"pave one road more\" figuratively: the library is another road the city needs. He is not asking for an actual street.",
      "APLANG-T1-R1"),

    # ---------- Set 2: the benches essay (12) ----------
    Q(1, 1, RSR, PURPOSE,
      "The writer's primary purpose is to",
      ["argue that cities should keep and add public seating", "explain how planners design successful public plazas", "criticize residents who complain about city benches", "trace the history of downtown streets and sidewalks"],
      "The essay builds from the loss of seating to its effects, evidence and a concession, ending with \"we should stop treating it as a problem to be solved.\" The plaza research and the complaints serve that argument.",
      "APLANG-T1-R2"),
    Q(1, 2, RSR, AUDIENCE,
      "The writer most likely has which audience in mind?",
      ["General readers who walk city streets", "Engineers who build public furniture", "Researchers who study public plazas", "Store owners who removed their benches"],
      "The opening invites \"you\" to walk downtown and count seats, and the examples are everyday people. The writer explains research rather than addressing researchers, and does not single out store owners.",
      "APLANG-T1-R2"),
    Q(1, 1, CER, EVID,
      "In the first paragraph, the details about metal studs and armrests serve as evidence that",
      ["cities have made it harder to sit in public", "most benches downtown are poorly maintained", "downtown businesses want more customers", "public seating is expensive to install"],
      "Removed benches, studded ledges and divided seats all show that sitting in public has been made harder. Maintenance and cost come up only later, in the fourth and fifth paragraphs.",
      "APLANG-T1-R2"),
    Q(1, 2, ROR, LINE,
      "The second paragraph relates to the first mainly by",
      ["showing who pays the price for the trend described", "proposing a solution to the problem just described", "giving the history of the trend just described", "questioning the facts given in the first paragraph"],
      "After the first paragraph describes the loss of seating, the second shows its effect on older people, pregnant women, children and workers. Solutions come in the fourth paragraph.",
      "APLANG-T1-R2"),
    Q(1, 2, CER, CLAIM,
      "The sentence \"When a city removes seating to discourage one kind of visitor, it discourages every kind\" states",
      ["the claim the examples before it support", "a counterargument the writer goes on to refute", "a fact taken from research on public plazas", "a concession to people who dislike benches"],
      "The list of ordinary bench users leads to this general claim, which the writer endorses. The plaza research comes in the next paragraph and the concession in the fourth.",
      "APLANG-T1-R2"),
    Q(1, 2, CER, EVID,
      "The writer supports the claim in the third paragraph mainly with",
      ["findings from research on public plazas", "a memory of a crowded plaza from childhood", "interviews with people who own downtown shops", "the cost of benches compared with other projects"],
      "\"Researchers who filmed public plazas found\" introduces the evidence: the plazas people chose had plenty of seating. There are no memories, interviews or costs in that paragraph.",
      "APLANG-T1-R2"),
    Q(1, 3, ROR, LINE,
      "In the third paragraph, the sentence \"People attract people, and seating is what keeps them long enough to attract anyone\" functions as",
      ["a conclusion drawn from the research", "a counterargument the writer rejects", "a transition to the writer's concession", "a definition of a planner's term"],
      "The sentence explains what the plaza findings mean: seating keeps people in a place, and their presence draws others. It sums up the evidence rather than opposing it or defining a term.",
      "APLANG-T1-R2"),
    Q(1, 3, CER, QUAL,
      "In the fourth paragraph, the writer responds to opponents by",
      ["granting a problem and offering upkeep as the answer", "denying that any complaint about public benches is valid", "arguing that most complaints come from tourists", "proposing that public seating be moved indoors"],
      "\"None of this means that complaints about benches are imaginary\" grants that neglected or badly placed seating is a nuisance, then answers that the cure is \"a well-managed one, not an empty sidewalk.\"",
      "APLANG-T1-R2"),
    Q(1, 2, ROR, LINE,
      "The claim that busy streets are \"by most measures, safer ones\" is used to suggest that",
      ["well-kept seating can make a street safer", "benches attract crime to city centers", "cities should count the people on streets", "safety matters less than comfort downtown"],
      "The writer links added and maintained seating to busier streets, and busier streets to safety, answering the worry that benches cause trouble. The other choices reverse or ignore that reasoning.",
      "APLANG-T1-R2"),
    Q(1, 2, STR, DICTION,
      "In the first paragraph, the word \"quietly\" suggests that the message to keep moving is",
      ["sent by design rather than stated", "spoken softly by city officials", "hidden from the people who made it", "meant only for visitors to the city"],
      "No sign tells people to move along; the missing benches and studded ledges say it for the city. \"Quietly\" describes that unspoken message, not a soft voice.",
      "APLANG-T1-R2"),
    Q(1, 2, STR, SYNTAX,
      "The list in the second paragraph (\"A child with a sprained ankle, a delivery worker on a break, a tourist reading a map\") mainly emphasizes",
      ["how varied a bench's users are", "how crowded the sidewalks have become", "how risky city streets can be", "how little the writer trusts officials"],
      "Placing very different people side by side, all followed by \"all of them use a bench,\" shows how many kinds of people depend on public seating. The list is not about crowding or danger.",
      "APLANG-T1-R2"),
    Q(1, 3, STR, DICTION,
      "Calling a bench \"the most democratic piece of furniture we have\" emphasizes that benches",
      ["serve everyone on equal terms", "were first built by elected officials", "are chosen by a public vote", "cost less than other furniture"],
      "\"Democratic\" here means open to all alike: a bench \"asks nothing of the person who uses it.\" Its low cost is stated separately in the paragraph and is not what the word conveys.",
      "APLANG-T1-R2"),

    # ---------- Set 3: street trees draft (8) ----------
    Q(1, 2, CEW, CLAIM,
      "In sentence 4 (reproduced below), the writer wants to state the position the essay will argue.\n\nResults like these __say something about trees__.\n\nWhich version of the underlined text best accomplishes this goal?",
      ["show why our city should plant trees on every street", "(as it is now)", "were recorded carefully by the volunteers that afternoon", "surprised many of the people who took part"],
      "The rest of the draft argues for a citywide planting program, so sentence 4 should state that position. The current wording is vague, and the other choices describe the experiment instead of a claim.",
      "APLANG-T1-W3"),
    Q(1, 2, RSW, PURPOSE,
      "The writer is considering deleting sentence 6. Should the writer keep or delete this sentence?",
      ["Keep it, because it shows why cooler streets matter for health", "Keep it, because it explains how shade lowers the air temperature", "Delete it, because it repeats the point made in sentence 5", "Delete it, because it shifts the focus away from trees"],
      "Sentence 5 says shade matters most during heat waves; sentence 6 tells the reader why, since heat is the deadliest weather. Without it the stakes are unclear. It does not explain how shade works.",
      "APLANG-T1-W3"),
    Q(1, 2, CEW, EVID,
      "The writer wants to add evidence to support the claim in sentence 7. Which choice would best accomplish this goal?",
      ["A city study found fewer flooded basements on tree-lined blocks.", "Oak trees can live for more than two hundred years.", "Many residents enjoy the color of the leaves each fall.", "City crews clean the storm drains every spring."],
      "Sentence 7 claims that trees reduce flooding, and only the study about flooded basements addresses flooding and trees together. The others are true-sounding but off the point.",
      "APLANG-T1-W3"),
    Q(1, 1, ROW, TRANS,
      "The writer wants to add a word or phrase at the beginning of sentence 10, adjusting the capitalization as needed. Which choice best connects sentence 10 to sentences 8 and 9?",
      ["However,", "For example,", "Similarly,", "In addition,"],
      "Sentences 8 and 9 grant the residents' concern; sentence 10 answers it. \"However\" marks that turn. \"For example\" and \"Similarly\" would treat the answer as more of the same concern.",
      "APLANG-T1-W3"),
    Q(1, 3, ROW, STRUCT,
      "The writer wants to add the following sentence to the draft.\n\nThe difference was no accident: dark pavement in full sun soaks up heat all afternoon.\n\nWhere would the sentence best be placed?",
      ["After sentence 3", "After sentence 7", "After sentence 9", "After sentence 12"],
      "\"The difference\" refers to the twenty-degree gap reported in sentence 3, so the new sentence belongs right after it, explaining the result before the writer states a position.",
      "APLANG-T1-W3"),
    Q(1, 2, STW, SYNTAX,
      "Which choice most effectively combines sentences 8 and 9 (reproduced below)?\n\nSome residents worry that tree roots will crack sidewalks. This concern is reasonable.",
      ["Some residents reasonably worry that tree roots will crack sidewalks.", "Some residents worry that tree roots will crack sidewalks, it is reasonable.", "Some residents, which is reasonable, worry about roots cracking sidewalks.", "Reasonable is the worry of residents about roots that crack sidewalks."],
      "Turning sentence 9 into the adverb \"reasonably\" keeps both ideas in one clear sentence. The second choice is a comma splice, \"which\" in the third has no clear antecedent, and the fourth is awkwardly inverted.",
      "APLANG-T1-W3"),
    Q(1, 1, STW, DICTION,
      "In sentence 12 (reproduced below), the writer wants to state the benefit of the program precisely.\n\nA citywide planting program would __help out with things for__ the people who need it most.\n\nWhich version of the underlined text best accomplishes this goal?",
      ["bring the most relief to", "(as it is now)", "be a nice thing to do for", "make a difference, sort of, for"],
      "\"Bring the most relief to\" names the benefit, relief from heat, and matches the formal register of the draft. The other versions are vague or casual.",
      "APLANG-T1-W3"),
    Q(1, 2, RSW, AUDIENCE,
      "The writer wants to replace sentence 13 with a sentence that urges the city council to act. Which choice best accomplishes this goal?",
      ["The council should fund the program in next year's budget.", "Many cities around the world have planted street trees.", "Trees have lined city streets for hundreds of years.", "Some residents may not want new trees near their homes."],
      "Only the first choice addresses the council and asks for a specific action. The others state background facts or raise a doubt, which weakens the ending.",
      "APLANG-T1-W3"),

    # ---------- Set 4: small museums draft (8) ----------
    Q(1, 2, RSW, PURPOSE,
      "The writer wants to add a sentence after sentence 3 that makes the problem clear to readers. Which choice best accomplishes this goal?",
      ["In effect, most of the town's history is hidden from the town.", "The storeroom is kept at a steady, cool temperature.", "The museum also has a small gift shop by the entrance that sells postcards.", "Some of the quilts were made more than a century ago."],
      "The essay's problem is that most of the collection cannot be seen. The first choice states that problem and its cost to the town; the others add details that do not matter to the argument.",
      "APLANG-T1-W4"),
    Q(1, 2, CEW, EVID,
      "The writer is considering adding the following sentence after sentence 6.\n\nQuilting was a common pastime in rural communities.\n\nShould the writer add this sentence?",
      ["No, because it does not support the case for putting images online", "No, because it repeats information that is already given in sentence 1", "Yes, because it explains why the museum owns so many quilts", "Yes, because it supports the claim about families' research"],
      "The paragraph lists who would benefit from online images. A fact about quilting does not support that claim, so it would distract. Sentence 1 mentions quilts but not quilting as a pastime.",
      "APLANG-T1-W4"),
    Q(1, 3, CEW, EVID,
      "Which choice, if added after sentence 7, would best support the claim it makes?",
      ["A diary in one county's online collection led a historian to correct the date of a battle.", "Most universities have large libraries and archives of their own, with many trained staff.", "Many researchers say they prefer to handle the original objects rather than photographs of them.", "Some small museums ask visiting researchers to make an appointment several weeks in advance."],
      "Sentence 7 claims that online images could let researchers make discoveries. The diary example shows exactly that happening. The third choice works against the claim, and the others are beside the point.",
      "APLANG-T1-W4"),
    Q(1, 2, ROW, STRUCT,
      "The writer wants to begin the third paragraph with a sentence that connects it to the second. Which choice best accomplishes this goal?",
      ["These benefits come with real costs.", "Online collections are now common.", "Some objects are too fragile to show.", "The museum opened many years ago."],
      "The second paragraph lists benefits; the third turns to costs and how to meet them. \"These benefits come with real costs\" links the two. The other sentences do not lead into the discussion of cost.",
      "APLANG-T1-W4"),
    Q(1, 2, STW, PUNCT,
      "In sentence 9 (reproduced below), which version of the underlined text is most clear?\n\nIt takes cameras, storage, and staff __time a small__ museum may have only one paid employee.",
      ["time, and a small", "(as it is now)", "time, a small", "time, so that a small"],
      "Two independent clauses need a comma and a conjunction; \"and\" adds the second difficulty. The current text is a run-on, a comma alone is a comma splice, and \"so\" wrongly makes the small staff a result of the costs.",
      "APLANG-T1-W4"),
    Q(1, 1, ROW, TRANS,
      "In sentence 12 (reproduced below), which version of the underlined text best connects it to sentence 11?\n\n__But__ protection is only half of a museum's job.",
      ["(as it is now)", "Therefore,", "For instance,", "In the same way,"],
      "Sentence 11 grants that storage protects the objects; sentence 12 turns to what that leaves out. \"But\" signals the contrast. \"Therefore\" and \"In the same way\" would treat sentence 12 as following from or agreeing with sentence 11.",
      "APLANG-T1-W4"),
    Q(1, 3, STW, DICTION,
      "The writer wants to revise sentence 13 so that the essay ends with an image that recalls sentence 3. Which choice best accomplishes this goal?",
      ["The other half is sharing, and a basement shares nothing.", "The other half is sharing, which matters a great deal.", "The other half is sharing, and museums should share more.", "The other half is sharing, and the internet makes it easy."],
      "Returning to the basement of sentence 3 frames the essay and makes the point vivid. The other endings restate the idea in general terms without the echo.",
      "APLANG-T1-W4"),
    Q(1, 3, RSW, AUDIENCE,
      "The writer plans to send the draft to the museum's board of directors. Which sentence, if added after sentence 10, would best address the board's likely concern?",
      ["With such help, the project need not strain the museum's budget.", "Volunteers also enjoy learning about the history of the area.", "Many large museums finished this kind of work years ago.", "Photographs can be taken in color or in black and white."],
      "A board will worry first about cost, and sentence 10 has just named grants and volunteers. The first choice draws the conclusion the board needs. The others do not speak to its concern.",
      "APLANG-T1-W4"),

    # ---------- Set 5: apprenticeships draft (5) ----------
    Q(1, 2, RSW, AUDIENCE,
      "The writer wants to add a sentence after sentence 2 that shows understanding of the teachers' point of view. Which choice best accomplishes this goal?",
      ["They meant well; for them, college had opened every door.", "Teachers often have far too many students to advise.", "My grades had always been highest in science classes.", "Electricians must pass an exam before working alone."],
      "Acknowledging that the teachers acted from their own experience treats them fairly, which makes the argument more persuasive to readers who share their view. The others do not address the teachers' reasoning.",
      "APLANG-T1-W5"),
    Q(1, 2, CEW, CLAIM,
      "Which sentence most clearly states the main claim of the draft?",
      ["Sentence 5", "Sentence 2", "Sentence 3", "Sentence 4"],
      "Sentence 5 says what schools should do, and the sentences around it support or extend that claim. Sentence 2 gives the teachers' assumption, sentence 3 the writer's own experience and sentence 4 a supporting fact.",
      "APLANG-T1-W5"),
    Q(1, 2, CEW, EVID,
      "The writer wants to support the claim in sentence 4 that electricians are needed everywhere. Which evidence would best accomplish this goal?",
      ["Data on job openings for electricians across the country", "A description of the tools electricians use on the job", "The names of famous people who worked in the trades", "The number of students who graduate from the writer's school"],
      "A claim about demand everywhere is best supported by nationwide figures on job openings. The other evidence does not show demand.",
      "APLANG-T1-W5"),
    Q(1, 1, ROW, TRANS,
      "The writer wants to add a word or phrase at the beginning of sentence 6, adjusting the capitalization as needed. Which choice best connects it to sentence 5?",
      ["For example,", "However,", "Nevertheless,", "In contrast,"],
      "Sentence 6 gives specific ways schools could present apprenticeships as an equal choice, so it illustrates sentence 5. The other transitions signal a contrast that is not there.",
      "APLANG-T1-W5"),
    Q(1, 2, STW, DICTION,
      "In sentence 5 (reproduced below), the writer wants to stress the gap between how apprenticeships are seen and how they should be seen.\n\nSchools should present apprenticeships as __an equal choice, not a fallback__.\n\nWhich version of the underlined text best accomplishes this goal?",
      ["(as it is now)", "one option among several", "a possible choice for some", "a path that might be good"],
      "Setting \"an equal choice\" against \"a fallback\" names both the current view and the better one. The other versions are vague and lose the contrast.",
      "APLANG-T1-W5"),
]
