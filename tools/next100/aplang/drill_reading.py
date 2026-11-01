# Drill-only reading sets: four passages of 12 questions, three per reading skill category.
# Every passage is original, written for Tigertest.

STIMULI = [
    {"id": "APLANG-D-R1", "title": "An essay by a railroad engineer, 1884 (practice text)", "text": (
        "Not two years ago, a traveler who crossed this country by rail needed to carry a small library of timetables and a good "
        "deal of patience. Every city kept its own time, set by the sun at its own noon, so that when it was twelve o'clock in "
        "Chicago it was some minutes past twelve in Pittsburgh and some minutes short of it in St. Louis. The railroads, which had to "
        "fit these clocks together, kept more than fifty standards of their own. A man who missed his connection could not always "
        "say whose clock had cheated him.\n\n"
        "On a single day in November of last year, the railroads put an end to this confusion. They divided the country into four "
        "great belts, each an hour apart, and set every station clock within a belt to the same hour. In most towns the change moved "
        "the hands only a few minutes. In return, the traveler gained a timetable he could read and a connection he could trust.\n\n"
        "Not everyone has welcomed the change. Some ministers protest that the railroads have no business telling the sun when to "
        "rise, and a few towns have stubbornly kept the old time, so that their clocks now disagree with their own depots. I "
        "understand the feeling. There is something in a town's own noon that belongs to it, as its church bell belongs to it. But "
        "the sun has not been consulted for many years in any practical matter. The farmer rises by it still; the factory hand rises "
        "by the whistle.\n\n"
        "The objection, at bottom, is not to a new time but to a new master. People suspect that a company has taken a power that "
        "ought to belong to the public, and in this they are not wholly wrong. The railroads acted because no government would. If "
        "the nation finds the new hours useful, as I believe it will, then the nation ought to adopt them by law, so that the hour "
        "belongs to all of us and not to the timetable.\n\n"
        "Whatever the law decides, the experiment has already taught a lesson. A country this large cannot run on a thousand private "
        "clocks. It must agree, even on something as small as the minute, if its parts are to work together.")},
    {"id": "APLANG-D-R2", "title": "A pamphlet by a country physician, 1722 (practice text)", "text": (
        "It is now commonly said in the coffee houses that the new practice of inoculation is a tempting of Providence, and that a "
        "man who gives the smallpox to a healthy child is guilty of whatever follows. I do not doubt the sincerity of those who say "
        "it. I ask only that they hear what I have seen before they judge what they have not.\n\n"
        "In the late visitation of the smallpox upon this town, I inoculated some scores of persons, young and old, by placing a "
        "little matter from a mild case into a small cut in the arm. Most fell sick within a week, kept their beds a few days, and "
        "rose again marked with only a handful of pocks. A very few died. Among those who took the disease in the common way, by "
        "breathing the air of the sick, the dead were counted not by ones but by the hundred, and the survivors were very often "
        "scarred or blinded.\n\n"
        "I will not pretend the practice is without danger. It is a disease, and a disease may kill. But the question before a "
        "parent is not whether inoculation is safe. It is whether it is safer than the smallpox, which comes to nearly every family "
        "in its time and asks no one's leave. Between a small danger chosen and a great danger waited for, I cannot see that "
        "Providence requires us to choose the greater.\n\n"
        "Some object that the operation spreads the distemper to the neighbors. This is a fair complaint, and it may be answered by "
        "keeping the inoculated apart until they are well, as we keep a ship from port until its crew is clean. It is no argument "
        "against the practice; it is an argument for doing it carefully.\n\n"
        "I have no wish to win a quarrel. I wish to save children. If any reader can show me a safer way, I will take it up tomorrow "
        "and thank him for it. Until then, I shall go on as I have begun, and I shall keep an honest count of the living and the dead.")},
    {"id": "APLANG-D-R3", "title": "An essay by a mountaineer, 2015 (practice text)", "text": (
        "The summit was four hundred feet above us when I turned around. It was eleven in the morning, the sky was clear, and my "
        "partner and I had spent two years and most of our savings getting to that ridge. We had agreed, weeks before, that we would "
        "turn back at eleven wherever we were. We were slower than we had planned, and the agreement held. I have never regretted "
        "it, though I have regretted many easier decisions.\n\n"
        "Climbers have a name for what we resisted that morning. They call it summit fever: the pull of a goal so close that every "
        "reason to stop begins to sound like an excuse. The danger is not that climbers are reckless. Most are careful people. The "
        "danger is that a plan made in the calm of base camp loses its authority as the goal comes into view, and the closer you "
        "are, the more it seems that the rules were written for someone else.\n\n"
        "This is why the turnaround time matters more than any piece of equipment. It is a decision made in advance by a clearer "
        "mind than the one you will have at altitude. Its value lies precisely in its stubbornness. A rule that can be renegotiated "
        "on the mountain is not a rule; it is a suggestion, and the mountain is a poor place to take suggestions from yourself.\n\n"
        "I do not want to make a virtue of timidity. Climbers who never push past their comfort reach nothing worth reaching, and "
        "some days the honest judgment is to go on. But there is a difference between a judgment and a wish. A judgment can explain "
        "itself. A wish just says \"so close.\"\n\n"
        "I think of that morning when I watch people chase other summits: the promotion, the deadline, the record. Every one of them "
        "has its own fever, and very few come with a turnaround time. Perhaps they should.")},
    {"id": "APLANG-D-R4", "title": "An essay by a high school teacher, 2023 (practice text)", "text": (
        "Every year a student tells me, in a tone of real complaint, that she is bored. I used to treat this as an emergency. I would "
        "reach for a game, a video, a new activity, anything to fill the silence before it spread. I have since come to think that "
        "boredom is not the problem I took it for, and that my rush to cure it may have been doing harm.\n\n"
        "Consider what boredom is. It is the feeling of a mind with nothing to push against. In that discomfort, the mind starts "
        "looking for something to do, and if nothing is handed to it, it will sometimes invent something. Psychologists who have "
        "studied the state have found that people made mildly bored before a creative task often produce more ideas than people who "
        "are not. The empty minute is not empty; it is where wondering begins.\n\n"
        "My students rarely get such minutes. A phone fills every gap between classes, and a feed is designed so that it never runs "
        "out. I do not blame them; I carry the same phone. But a habit of never being bored is also a habit of never being left "
        "alone with one's own thoughts, and I have watched students grow uneasy in even a minute of quiet.\n\n"
        "None of this is a case for dull teaching. A lesson that bores students because it is poorly planned is simply a bad lesson. "
        "The boredom I mean is different: the pause after a hard question, the five minutes before anyone has an idea, the walk home "
        "without headphones. Those pauses can feel like nothing is happening. They are often where the most important work is done.\n\n"
        "So I have stopped rushing. When a student tells me she is bored, I say that I believe her, and that I am curious what she "
        "will do about it. Some of them are annoyed. A surprising number come back with an idea.")},
]

ITEMS = [
    # ---------- Standard time essay ----------
    Q(0, 1, RSR, PURPOSE,
      "The writer's exigence is",
      ["public debate over the railroads' new standard time", "a recent train wreck blamed on a faulty station clock", "a proposal to extend the railroads farther west", "complaints from travelers about the cost of tickets"],
      "The essay responds to the change \"in November of last year\" and to those who have not welcomed it. No wreck, expansion or ticket prices are mentioned.",
      "APLANG-D-R1"),
    Q(0, 2, CER, EVID,
      "The details in the first paragraph serve mainly as evidence that",
      ["local time made travel by rail confusing", "railroads were careless with their schedules", "cities competed to have the earliest noon", "most travelers preferred to go by road"],
      "Different clocks in each city, more than fifty railroad standards and missed connections all show the confusion that standard time ended. The railroads are not called careless.",
      "APLANG-D-R1"),
    Q(0, 2, STR, DICTION,
      "The phrase \"a small library of timetables\" in the first paragraph",
      ["exaggerates to stress the traveler's burden", "suggests that travelers enjoyed reading", "refers to the books sold in railroad stations", "praises the railroads' careful records"],
      "No traveler carried a real library; the overstatement shows how many timetables the old system required. The tone is wry, not admiring.",
      "APLANG-D-R1"),
    Q(0, 1, ROR, STRUCT,
      "The second paragraph relates to the first mainly by",
      ["describing the change that ended the problem", "giving further examples of the old confusion", "showing that the problem was exaggerated", "raising an objection to the writer's view"],
      "The first paragraph sets out the confusion of local time; the second tells how the railroads \"put an end to this confusion.\" Objections come in the third paragraph.",
      "APLANG-D-R1"),
    Q(0, 2, RSR, AUDIENCE,
      "In the third paragraph, the sentence \"I understand the feeling\" is most likely meant to",
      ["show respect for readers who oppose the change", "admit that the writer first opposed the change", "suggest that most opponents are ministers", "signal that the writer is changing the subject"],
      "Before answering the objection, the writer grants that attachment to a town's own noon is understandable, which makes opponents likelier to listen. Nothing says the writer once opposed the change.",
      "APLANG-D-R1"),
    Q(0, 3, STR, DICTION,
      "The comparison of a town's noon to \"its church bell\" suggests that local time",
      ["was part of a town's sense of identity", "was announced by the ringing of bells", "was set by the ministers of each town", "was less exact than the railroads' time"],
      "Like the church bell, the town's own noon \"belongs to it\": a mark of local identity. The comparison is about belonging, not about how time was announced.",
      "APLANG-D-R1"),
    Q(0, 2, CER, EVID,
      "The claim that \"the sun has not been consulted for many years in any practical matter\" is supported by",
      ["the contrast between the farmer and the factory hand", "the ministers' protest about telling the sun when to rise", "the towns whose clocks disagree with their own depots", "the number of standards the railroads once kept"],
      "The factory hand already rises by the whistle, not the sun, showing that working life has long run on clock time. The ministers' protest is the view the writer answers.",
      "APLANG-D-R1"),
    Q(0, 3, STR, SYNTAX,
      "The phrase \"not to a new time but to a new master\" emphasizes that",
      ["the real dispute is about who holds authority", "the railroads treat their own workers too harshly", "the new hours are difficult to learn", "clocks ought to be made by the public"],
      "The \"not ... but\" structure moves the objection from the clock to the question of power: a company, not the public, set the time. The next sentences confirm that reading.",
      "APLANG-D-R1"),
    Q(0, 3, CER, QUAL,
      "In the fourth paragraph, the writer partly agrees with opponents that",
      ["a company has taken a power that belongs to the public", "the new hours are less useful than the old local time", "each town should be free to keep its own local time", "the railroads ought to give up the new hours at once"],
      "\"In this they are not wholly wrong\" grants the point about power, and the writer answers it by urging a law. The writer still believes the new hours are useful.",
      "APLANG-D-R1"),
    Q(0, 2, ROR, LINE,
      "The fourth paragraph moves from",
      ["explaining an objection to proposing a remedy", "telling a story to stating its moral", "listing facts to raising a question about them", "praising the railroads to blaming them"],
      "The paragraph identifies what opponents really object to, concedes part of it, and proposes that the nation adopt the hours by law. It contains no story or list.",
      "APLANG-D-R1"),
    Q(0, 2, RSR, PURPOSE,
      "The writer's primary purpose is to",
      ["defend standard time and urge a law adopting it", "persuade towns to return to their own local time", "explain how towns once set their clocks by the sun", "criticize ministers who oppose the railroads"],
      "The essay praises the change, answers objections and calls for the nation to adopt the hours by law. Local solar time is described only as the problem.",
      "APLANG-D-R1"),
    Q(0, 1, ROR, STRUCT,
      "The final paragraph functions mainly to",
      ["draw a general lesson from the change", "raise a new objection to standard time", "summarize the history of the railroads", "predict which towns will adopt the change"],
      "\"The experiment has already taught a lesson\" introduces a broader point: a large country must agree on time for its parts to work together.",
      "APLANG-D-R1"),

    # ---------- Inoculation pamphlet ----------
    Q(0, 1, RSR, PURPOSE,
      "The writer's exigence is",
      ["public claims that inoculation is morally wrong", "a law that has banned the practice of inoculation", "a shortage of physicians during the epidemic", "a quarrel with a rival physician in the town"],
      "The pamphlet opens with what is \"commonly said in the coffee houses\": that inoculation tempts Providence and makes the inoculator guilty. No law, shortage or rival is mentioned.",
      "APLANG-D-R2"),
    Q(0, 2, STR, DICTION,
      "The phrase \"a tempting of Providence\" reflects",
      ["the religious terms of the critics' objection", "the writer's own fear of divine punishment", "the jokes told about the new practice", "the legal charge later brought against the writer"],
      "The critics frame inoculation as a sin against God's will, and the writer answers in the same terms in the third paragraph. He never says he fears punishment.",
      "APLANG-D-R2"),
    Q(0, 2, RSR, AUDIENCE,
      "In the first paragraph, the writer asks critics only to \"hear what I have seen\" mainly to",
      ["invite a fair hearing before they judge", "suggest that the critics are insincere", "boast of how many patients he has seen", "show that he refuses to discuss the matter"],
      "The writer grants the critics' sincerity and asks only that they consider evidence first, a modest request meant to keep them reading.",
      "APLANG-D-R2"),
    Q(0, 1, CER, EVID,
      "The writer's main evidence in the second paragraph is",
      ["a comparison of deaths in two groups", "the opinions of learned physicians", "reports from inoculators in other lands", "the cure of a single child in the town"],
      "The paragraph sets the few deaths among the inoculated against deaths \"by the hundred\" among those who caught smallpox naturally. It cites no authorities or foreign reports.",
      "APLANG-D-R2"),
    Q(0, 2, STR, SYNTAX,
      "In the second paragraph, \"counted not by ones but by the hundred\" emphasizes",
      ["the scale of deaths from natural smallpox", "the care the writer took in keeping records", "how slowly the disease spread through town", "how many persons the writer inoculated"],
      "The contrast between \"ones\" and \"the hundred\" magnifies the toll of the disease caught in the common way, against the \"very few\" inoculated who died.",
      "APLANG-D-R2"),
    Q(0, 2, CER, QUAL,
      "In the third paragraph, the writer concedes that",
      ["inoculation itself can sometimes kill", "smallpox reaches only a few families", "Providence forbids every medical risk", "the critics in the coffee houses are right"],
      "\"I will not pretend the practice is without danger ... a disease may kill\" admits the risk. The writer says smallpox reaches \"nearly every family,\" the opposite of the second choice.",
      "APLANG-D-R2"),
    Q(0, 3, ROR, LINE,
      "The argument of the third paragraph turns on",
      ["recasting the question as a comparison of risks", "an appeal to the authority of the church and its ministers", "a story about the writer's own family", "a list of the symptoms of smallpox"],
      "The writer replaces \"is inoculation safe?\" with \"is it safer than the smallpox?\" and concludes that choosing the smaller danger is reasonable.",
      "APLANG-D-R2"),
    Q(0, 3, STR, SYNTAX,
      "The sentence \"Between a small danger chosen and a great danger waited for, I cannot see that Providence requires us to choose the greater\" relies chiefly on",
      ["a balanced contrast between two choices", "a direct question addressed to the reader", "an extended metaphor of a journey", "an appeal to the reader's pity"],
      "\"A small danger chosen\" and \"a great danger waited for\" are set in parallel, so the reader weighs them side by side. The sentence is a statement, not a question.",
      "APLANG-D-R2"),
    Q(0, 2, CER, EVID,
      "In the fourth paragraph, the writer answers the complaint that inoculation spreads the disease by",
      ["proposing that the inoculated be kept apart", "denying that inoculation spreads the disease", "blaming the spread on ships arriving in port", "arguing that the risk is too small to matter"],
      "The writer calls it \"a fair complaint\" and answers it by keeping the inoculated apart until they are well. He neither denies the risk nor dismisses it.",
      "APLANG-D-R2"),
    Q(0, 2, ROR, LINE,
      "The comparison to keeping \"a ship from port\" in the fourth paragraph functions as",
      ["a familiar precedent for the proposed remedy", "evidence that smallpox arrived by sea", "a concession that the disease cannot be stopped", "a warning against trade with other ports"],
      "Readers already accepted holding a ship until its crew was clean, so the comparison makes keeping the inoculated apart seem ordinary and sensible.",
      "APLANG-D-R2"),
    Q(0, 2, RSR, AUDIENCE,
      "The writer's intended audience is most likely",
      ["townspeople and parents who doubt the practice", "physicians who already perform inoculation", "ship captains held under quarantine", "the owners of the town's coffee houses"],
      "The writer answers the doubts heard in the coffee houses and frames the choice as one \"before a parent,\" so he addresses ordinary skeptical readers.",
      "APLANG-D-R2"),
    Q(0, 2, ROR, STRUCT,
      "The final paragraph contributes to the argument mainly by",
      ["presenting the writer as open to correction", "summarizing the death counts given earlier", "attacking the motives of the writer's critics", "announcing that the writer will stop the practice"],
      "Offering to adopt any safer way \"tomorrow\" and to keep \"an honest count\" shows good faith, strengthening the writer's credibility. He says he will go on as he began.",
      "APLANG-D-R2"),

    # ---------- Mountaineering essay ----------
    Q(0, 1, RSR, PURPOSE,
      "The writer's primary purpose is to",
      ["argue for setting limits before chasing a goal", "describe the dangers of weather at altitude", "persuade readers to take up mountain climbing", "recount the history of a famous climbing route"],
      "The climb illustrates the value of a turnaround time set in advance, and the last paragraph applies that lesson to other goals. Weather and history are not discussed.",
      "APLANG-D-R3"),
    Q(0, 2, RSR, PURPOSE,
      "The writer most likely opens with the decision to turn back in order to",
      ["ground the argument in personal experience", "boast about how hard the climb had been", "blame the partner for their slow progress", "explain how costly expeditions can be"],
      "Beginning with a real choice made four hundred feet from the summit gives the later reasoning weight. The writer does not blame the partner, and the cost is a detail.",
      "APLANG-D-R3"),
    Q(0, 2, STR, SYNTAX,
      "The sentence \"I have never regretted it, though I have regretted many easier decisions\" suggests that",
      ["the hard choice proved to be a sound one", "the writer regrets most past decisions", "turning back was an easy thing to do", "the writer later reached that summit"],
      "Setting this decision against \"many easier decisions\" stresses that it was hard and that the writer still stands by it. Nothing says the writer returned to the peak.",
      "APLANG-D-R3"),
    Q(0, 2, ROR, STRUCT,
      "The second paragraph relates to the first mainly by",
      ["naming the force the writer resisted", "describing what happened on the way down", "explaining how the partners chose the route", "answering an objection to the writer's choice"],
      "\"Climbers have a name for what we resisted that morning\" introduces summit fever and explains it. The descent and the route are not discussed.",
      "APLANG-D-R3"),
    Q(0, 2, CER, CLAIM,
      "In the second paragraph, the writer claims that the danger of summit fever lies in",
      ["a plan losing its force as the goal nears", "climbers being careless by nature", "sudden storms close to the summit", "equipment failing at high altitude"],
      "\"The danger is not that climbers are reckless ... The danger is that a plan made in the calm of base camp loses its authority\" states the claim directly.",
      "APLANG-D-R3"),
    Q(0, 3, CER, EVID,
      "The writer supports the claim that \"the turnaround time matters more than any piece of equipment\" mainly with",
      ["reasoning about decisions made in advance", "figures on accidents near mountain summits", "advice from a famous mountain guide", "a second story from a different climb"],
      "The paragraph argues that a rule set by a clearer mind is valuable because it cannot be renegotiated. It cites no figures, experts or other climbs.",
      "APLANG-D-R3"),
    Q(0, 3, STR, DICTION,
      "The phrase \"a clearer mind than the one you will have at altitude\" implies that",
      ["nearness to a goal can cloud judgment", "climbers should plan only at the summit", "experienced climbers think more clearly", "planning is easier with a partner present"],
      "The writer contrasts the calm of base camp with the mind near the summit, where summit fever bends reasons into excuses. Planning happens before the climb, not at the top.",
      "APLANG-D-R3"),
    Q(0, 2, CER, QUAL,
      "In the fourth paragraph, the writer qualifies the argument by acknowledging that",
      ["sometimes the right choice is to keep going", "turnaround times are often set far too early", "most climbers ignore their own rules", "the writer once reached a summit late"],
      "\"Some days the honest judgment is to go on\" admits that pushing on can be right. The writer keeps the distinction between judgment and wish.",
      "APLANG-D-R3"),
    Q(0, 3, ROR, LINE,
      "The distinction between \"a judgment and a wish\" in the fourth paragraph serves to",
      ["separate sound reasons to go on from mere desire", "show that the writer regrets turning back", "criticize climbers who are too cautious", "restate the point of the first paragraph"],
      "Having admitted that going on is sometimes right, the writer needs a test: a judgment \"can explain itself,\" while a wish only says \"so close.\"",
      "APLANG-D-R3"),
    Q(0, 3, STR, TONE,
      "The quoted words \"so close\" at the end of the fourth paragraph",
      ["give voice to a wish that cannot explain itself", "quote what the partner said on the ridge", "measure the distance left to the summit", "express the writer's confidence about reaching the top"],
      "The two words stand for summit fever's whole argument: no reason, only nearness. They are not attributed to the partner.",
      "APLANG-D-R3"),
    Q(0, 2, RSR, AUDIENCE,
      "The final paragraph broadens the essay's audience to include",
      ["people pursuing goals far from any mountain", "climbers who are planning their first high expedition", "guides who lead paying groups up to famous summits", "employers who set strict deadlines for their workers"],
      "\"Other summits: the promotion, the deadline, the record\" extends the lesson to anyone chasing a goal. Employers are not addressed.",
      "APLANG-D-R3"),
    Q(0, 3, ROR, STRUCT,
      "The essay is organized mainly as",
      ["an anecdote, its analysis, a concession, an extension", "a chronology of one climb from start to finish", "a list of rules for climbers, each with its own example", "a problem followed by several possible solutions"],
      "The writer tells the story of turning back, explains summit fever and the turnaround rule, concedes that going on can be right, and applies the lesson to other goals.",
      "APLANG-D-R3"),

    # ---------- Boredom essay ----------
    Q(0, 1, RSR, PURPOSE,
      "The writer's primary purpose is to",
      ["argue that some boredom is good for students", "explain how teachers can plan more exciting lessons", "warn students about the dangers of phones", "report the results of a study of boredom"],
      "The writer explains a change of mind: boredom can be where ideas begin, so it should not always be cured. Phones and research are parts of that argument.",
      "APLANG-D-R4"),
    Q(0, 2, RSR, PURPOSE,
      "In the first paragraph, the admission \"I used to treat this as an emergency\" mainly serves to",
      ["show that the writer has rethought an earlier view", "suggest that boredom is a medical condition", "criticize the methods of other teachers", "explain why the writer chose to teach"],
      "The writer describes an old habit in order to reject it: \"I have since come to think that boredom is not the problem I took it for.\" The word \"emergency\" is figurative.",
      "APLANG-D-R4"),
    Q(0, 2, STR, DICTION,
      "The phrase \"before it spread\" in the first paragraph presents boredom as",
      ["something like a contagion", "a welcome sign of a quiet class", "a reward for hard work", "a rule the teacher set"],
      "The writer once treated boredom as if it could infect the whole class, the view the essay goes on to reject.",
      "APLANG-D-R4"),
    Q(0, 2, ROR, STRUCT,
      "The second paragraph contributes to the argument mainly by",
      ["defining boredom and explaining its value", "describing the writer's classroom routine", "answering an objection raised by parents", "listing activities that relieve boredom"],
      "\"Consider what boredom is\" leads into a definition and the claim that the uncomfortable pause is where invention starts, supported by research.",
      "APLANG-D-R4"),
    Q(0, 2, CER, EVID,
      "The research mentioned in the second paragraph supports the claim that",
      ["boredom can lead the mind to new ideas", "most students are bored in school", "creative tasks are themselves boring", "teachers cause most student boredom"],
      "People made mildly bored before a creative task produced more ideas, which backs \"it is where wondering begins.\" The research says nothing about how many students are bored.",
      "APLANG-D-R4"),
    Q(0, 3, STR, SYNTAX,
      "The sentence \"The empty minute is not empty\" relies on",
      ["an apparent contradiction to make a point", "a question that invites the reader to answer", "an appeal to the authority of an expert", "a comparison with the writer's own youth"],
      "Calling the empty minute \"not empty\" seems contradictory until the reader sees that the minute is empty of activity but full of thinking. It is a statement, not a question.",
      "APLANG-D-R4"),
    Q(0, 2, CER, EVID,
      "The claim in the third paragraph that students grow uneasy in quiet is supported mainly by",
      ["the writer's own observations of students", "figures on teenagers' use of phones", "the findings of psychologists", "interviews with the writer's fellow teachers"],
      "\"I have watched students grow uneasy in even a minute of quiet\" is firsthand observation. The psychologists appear in the second paragraph, on a different point.",
      "APLANG-D-R4"),
    Q(0, 2, ROR, LINE,
      "The sentence \"I do not blame them; I carry the same phone\" functions to",
      ["include the writer in the habit described", "excuse students who use phones in class", "turn the essay toward the writer's private life", "state the main claim of the essay"],
      "By admitting the same habit, the writer avoids lecturing and keeps readers on side before making the point about never being alone with one's thoughts.",
      "APLANG-D-R4"),
    Q(0, 2, RSR, AUDIENCE,
      "The writer's intended audience is most likely",
      ["teachers and parents of young people", "psychologists who study boredom", "companies that design phone apps", "researchers who study creativity"],
      "The essay speaks from a teacher's experience about how adults should respond to a bored student. It explains the research rather than addressing researchers.",
      "APLANG-D-R4"),
    Q(0, 3, CER, QUAL,
      "In the fourth paragraph, the writer limits the claim by",
      ["separating useful pauses from badly planned lessons", "admitting that phones help many students learn", "conceding that boredom harms most students", "noting that some students are never bored"],
      "\"None of this is a case for dull teaching\" sets aside boredom caused by poor planning; the boredom the writer defends is the pause before an idea.",
      "APLANG-D-R4"),
    Q(0, 2, ROR, STRUCT,
      "The final paragraph relates to the first mainly by",
      ["giving the writer's new answer to the same complaint", "repeating the student's complaint in new words", "introducing a different kind of student", "explaining why the writer used to rush to fill the silence"],
      "The essay opens with the old reaction to \"I'm bored\" and ends with the new one: believing the student and waiting to see what she does.",
      "APLANG-D-R4"),
    Q(0, 1, STR, TONE,
      "The writer's tone in the final paragraph is best described as",
      ["calm and quietly confident", "impatient and annoyed", "nostalgic and sad", "anxious and uncertain"],
      "Short, plain sentences report the new approach and its results without fuss. The annoyance belongs to some students, not the writer.",
      "APLANG-D-R4"),
]
