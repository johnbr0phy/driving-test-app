# OSSLT reading: original passages in the four EQAO reading forms
# (information paragraph, news report, dialogue, real-life narrative) and their
# selected-response items. Exec'd by tools/osslt/build.py, which provides
# P (passage), S (single), M (multi), O (order).
# Per practice test, like the EQAO blueprint: information paragraph 6,
# news report 5, dialogue 5, real-life narrative 7 (23 reading items).
# Key first in every options list; build.py rotates it.

INFO, NEWS, DIA, NAR = "ossltInfo", "ossltNews", "ossltDialogue", "ossltNarrative"
EXP, INF, CON = "Explicit information", "Inference", "Making connections"
WORD = "Word meaning in context"

# ---------------------------------------------------------------- Test 1

P("OSSLT-P01", "Why Maple Syrup Needs a Seesaw Spring",
"""Maple syrup season in Ontario and Quebec lasts only a few weeks, and it depends almost entirely on the weather. Sugar maples store starch in their roots and trunks over the winter, and as spring approaches, the trees turn that starch into sugar that dissolves in the sap. The sap moves only when the temperature seesaws: nights must fall below freezing and days must climb above it. During a cold night, the tree draws water up from its roots, and when the wood warms the next day, pressure inside the trunk pushes sap out through any opening, including the small holes that producers drill. If nights stay warm, the flow slows and soon stops; if days stay cold, the sap never starts moving at all. Once the trees begin to bud, the sap turns bitter and the season ends. Because fresh sap is only about two percent sugar, producers must boil roughly 40 litres of it to make a single litre of syrup.""")

S(INFO, 1, EXP, 1, "According to the paragraph, what weather makes sap flow?",
  ["Freezing nights and days above freezing", "Several warm nights in a row", "Cold days followed by warm nights", "Long stretches of steady cold"],
  "The paragraph says sap moves only when nights fall below freezing and days climb above it. Warm nights slow the flow, and days that stay cold stop it from starting.",
  basics="findingDetail", stim="OSSLT-P01")
S(INFO, 1, WORD, 2, "The writer says the temperature \"seesaws.\" This word suggests that the temperature",
  ["goes up and down again and again", "stays just below freezing", "climbs steadily all spring", "changes only at night"],
  "A seesaw goes up and down, and the next sentence explains that nights drop below freezing while days rise above it. The temperature does not stay in one place or climb steadily.",
  basics="wordsInContext", stim="OSSLT-P01")
S(INFO, 1, EXP, 1, "What ends the maple syrup season?",
  ["The trees begin to bud.", "The days grow too cold.", "The sap gets too sweet.", "The producers run out of sap."],
  "The paragraph states that once the trees begin to bud, the sap turns bitter and the season ends. Cold days stop sap from starting, but they are not what ends the season.",
  basics="findingDetail", stim="OSSLT-P01")
S(INFO, 1, INF, 2, "Why does it take so much sap to make one litre of syrup?",
  ["Sap is mostly water that must be boiled away.", "Much of the sap turns bitter while it boils.", "Producers lose sap through the drilled holes.", "Only sap gathered at night can be used."],
  "Sap is only about two percent sugar, so almost all of it is water that boils off. The paragraph never says sap turns bitter in the pot; it turns bitter when the trees bud.",
  basics="inference", stim="OSSLT-P01")
S(INFO, 1, INF, 1, "Which sentence best states the main idea of the paragraph?",
  ["Maple sap flows only in certain weather.", "Quebec makes more syrup than Ontario.", "Making syrup is easier than it looks.", "Sugar maples need warm nights to grow."],
  "Every sentence explains how temperature controls when sap flows and when the season ends. The paragraph never compares the two provinces or calls syrup-making easy.",
  basics="mainIdea", stim="OSSLT-P01")
M(INFO, 1, CON, 3, "Based on the paragraph, which TWO pieces of advice would a maple syrup producer most likely give? Choose two.",
  ["Watch the forecast for freezing nights and mild days.", "Tap the trees before they start to bud."],
  ["Wait for a long stretch of warm nights.", "Boil the sap until it starts to taste bitter.", "Drill the holes in the roots instead of the trunk."],
  "Sap runs only when freezing nights alternate with mild days, and budding ends the season, so a producer watches the weather and taps early. Warm nights stop the flow, and bitterness comes from budding, not boiling.",
  basics="inference", stim="OSSLT-P01")

P("OSSLT-P02", "Sudbury students build sorting machine for food bank",
"""SUDBURY, Ont. - A robotics team from Ridgeline Secondary School has built a machine that sorts canned food by expiry date, and the Northside Community Food Bank says it has already saved its volunteers dozens of hours.

The machine uses a camera to read the date stamped on each can. Then a small arm pushes the can onto one of three belts: keep, use soon or set aside. Before, two volunteers spent most of every Saturday checking cans by hand.

"Honestly, it was the job nobody wanted," said food bank coordinator Lise Bergeron. "Now those volunteers are packing hampers and talking with families instead."

The idea came from Grade 11 student Arjun Mehta, who volunteered at the food bank last winter to earn his community involvement hours. He brought the problem to his team, which had been looking for a project for a regional competition.

The first version jammed whenever a label was wrinkled, said team captain Hannah Koski. The students rebuilt the feeder three times over six weeks, testing it on boxes of donated cans after school.

The team placed second at the competition in November. Mehta said the result mattered less than seeing the machine at work. "We were trying to win a trophy," he said, "and we ended up fixing something real."

The food bank plans to keep the machine running through the holiday food drive, its busiest time of the year.""")

S(NEWS, 1, EXP, 1, "What does the students' machine do?",
  ["It sorts cans by expiry date.", "It packs hampers for families.", "It counts the cans donors bring.", "It prints new labels for cans."],
  "The first paragraph says the machine sorts canned food by expiry date, and the second explains how. Volunteers, not the machine, now pack the hampers.",
  basics="findingDetail", stim="OSSLT-P02")
S(NEWS, 1, EXP, 1, "Where did the idea for the machine come from?",
  ["A student who had volunteered at the food bank", "The food bank coordinator, Lise Bergeron", "The organizers of the regional competition", "The team captain, Hannah Koski"],
  "Arjun Mehta volunteered at the food bank, saw the problem and brought it to his team. Bergeron describes the job, but the article does not say the idea was hers.",
  basics="findingDetail", stim="OSSLT-P02")
S(NEWS, 1, INF, 2, "What can you conclude from the fact that the students rebuilt the feeder three times?",
  ["They kept working on the problem instead of giving up.", "The food bank asked for a new design each time.", "The competition required three working versions.", "The camera could not read most expiry dates."],
  "The feeder jammed on wrinkled labels, and the team rebuilt it until it worked, which shows persistence. Nothing says the food bank or the competition asked for new versions.",
  basics="inference", stim="OSSLT-P02")
S(NEWS, 1, INF, 2, "Why does the writer include the quotation from Lise Bergeron?",
  ["To show how the machine changed the volunteers' work", "To explain how the camera reads the expiry dates", "To describe the competition the students entered", "To ask readers to donate food to the food bank"],
  "Bergeron says the volunteers who once checked cans now pack hampers and talk with families. Her quotation is about the volunteers, not the camera or the competition.",
  basics="authorPurpose", stim="OSSLT-P02")
S(NEWS, 1, CON, 2, "What does Arjun Mehta mean when he says the team \"ended up fixing something real\"?",
  ["The project solved a problem outside the competition.", "The team repaired the machine after it broke.", "The students would rather volunteer than compete.", "The machine will be sold to other food banks."],
  "Mehta contrasts winning a trophy with helping the food bank: the machine does a real job for real people. He never says he prefers volunteering to competing.",
  basics="inference", stim="OSSLT-P02")

P("OSSLT-P03", "The Summer Plan",
"""*Priya, 16, and her older brother Dev, 19, are in the kitchen. Priya has two summer job offers.*

**PRIYA:** Okay, I have to answer both of them by Friday. The camp wants me as a junior counsellor, and FreshMart wants me on cash.

**DEV:** Which one pays more?

**PRIYA:** FreshMart, by a lot. But camp is eight weeks up near Huntsville, and they cover meals and the bus, so I wouldn't be paying for food or bus fare.

**DEV:** So the gap is smaller than it looks.

**PRIYA:** Maybe. The thing is, I keep picturing myself at camp. I went there for six summers. I know every trail.

**DEV:** You also said last year that you wanted money saved before you start driving lessons.

**PRIYA:** I know, I know. (*She sighs.*) If I take FreshMart, I can save almost everything. If I take camp, I'll have a little saved and a really good reference for jobs working with kids.

**DEV:** Do you want to work with kids?

**PRIYA:** I think I want to be a teacher. You know that.

**DEV:** Then you're not choosing between a job and a vacation. You're choosing between money now and experience for later.

**PRIYA:** When you put it like that, it sounds easy.

**DEV:** It isn't easy. But it's your choice, not mine. What would you tell a camper who asked you?

**PRIYA:** (*laughing*) I'd tell them to write a list.

**DEV:** Then get a pen.""")

S(DIA, 1, INF, 2, "Why does Dev say \"the gap is smaller than it looks\"?",
  ["At camp, Priya would not pay for food or bus fare.", "FreshMart would cut Priya's hours in the summer.", "The camp pays more than Priya first thought.", "Priya would spend her pay on driving lessons."],
  "Priya has just said the camp covers meals and the bus, so the lower pay costs her less than it seems. She never says the camp pays more than she thought.",
  basics="inference", stim="OSSLT-P03")
S(DIA, 1, EXP, 1, "What reason does Priya give for wanting the camp job?",
  ["She went there for many summers and loves it.", "Her brother worked there as a counsellor.", "It is closer to home than the grocery store.", "It would pay for her driving lessons."],
  "Priya says she keeps picturing herself at camp, went there for six summers and knows every trail. Her brother never worked there, and the camp is up near Huntsville, not close to home.",
  basics="findingDetail", stim="OSSLT-P03")
S(DIA, 1, INF, 2, "Which word best describes Dev's role in the conversation?",
  ["Helpful", "Bossy", "Impatient", "Jealous"],
  "Dev asks questions that help Priya see her own choice and says the decision is hers. He never tells her which job to take, so he is not bossy.",
  basics="toneWords", stim="OSSLT-P03")
S(DIA, 1, INF, 2, "What does Priya's laughter suggest when she says \"I'd tell them to write a list\"?",
  ["She sees she should follow her own advice.", "She thinks Dev's question is silly.", "She has already chosen the camp job.", "She wants to stop talking about it."],
  "Dev asks what she would tell a camper, and she laughs because her answer applies to her. His reply, \"Then get a pen,\" confirms it. Nothing shows she has already decided.",
  basics="inference", stim="OSSLT-P03")
S(DIA, 1, CON, 3, "Which statement best expresses a central idea of the dialogue?",
  ["A good choice weighs now against later.", "Older siblings usually know what is best.", "Pay is the most important part of any job.", "Summer camps should pay their staff more."],
  "Dev frames the choice as money now against experience for later, and Priya plans to list both sides. Dev says the choice is hers, so the dialogue does not claim siblings know best.",
  basics="mainIdea", stim="OSSLT-P03")

P("OSSLT-P04", "First Shift",
"""The lunch rush at the Harbour Grill hit at noon, and by 12:15 I had already dropped a fork, mixed up two orders and forgotten what a "side Caesar" was.

It was my first shift. My manager, Carla, had walked me through the dining room that morning, pointing at tables like a tour guide. "Twelve through twenty are yours," she said. "Theo will back you up. Ask him anything." Theo was seventeen, a year older than me, and he moved between tables as if the floor were on wheels.

By one o'clock I had stopped smiling. A man at table fourteen waved his empty glass at me for the third time, and I could feel my face burning. I stood by the kitchen door, holding a tray of drinks for the wrong table, and seriously considered walking out the back.

Theo appeared beside me. He looked at the tray, then at the order slip in my hand. "These go to sixteen," he said quietly, "not twelve." He took two of the glasses. "I'll drop these. You go fill fourteen's water and tell him you're sorry for the wait. Then come back here."

When I came back, he had pulled a pen from behind his ear and was drawing a quick map of my section on the back of a slip. He wrote each table's number and, beside it, what they had ordered and what they still needed. "My first week, I did this on every break," he said. "Nobody remembers everything. You just need a system."

The rush ended around two. My feet ached and my apron was stained with ketchup, but I had not walked out. When the man from table fourteen left, he tucked a five-dollar bill under his glass and gave me a small nod.

At the end of the shift, Carla asked how it went. I thought about the dropped fork and the wrong drinks. "Rough," I admitted. "But I think I know how to do it now."

The next Saturday, before the doors opened, I took a blank order slip and drew my own map. Theo walked past, glanced at it and grinned. "Look at you," he said. "You have a system.\"""")

S(NAR, 1, EXP, 1, "What did Theo draw on the back of an order slip?",
  ["A map of the narrator's tables and their orders", "A list of the restaurant's daily specials", "Directions to the kitchen and the back door", "A schedule of the narrator's next shifts"],
  "Theo drew a map of the section with each table's number, what it ordered and what it still needed. The story mentions no specials list or schedule.",
  basics="findingDetail", stim="OSSLT-P04")
S(NAR, 1, WORD, 2, "Theo \"moved between tables as if the floor were on wheels.\" This comparison shows that Theo",
  ["moved smoothly and quickly", "was careless and rushed", "was nervous and unsteady", "kept slipping on the floor"],
  "Something on wheels glides easily, so the comparison shows how smoothly Theo worked the room. It contrasts with the narrator's clumsy first hour; it does not mean Theo slipped.",
  basics="wordsInContext", stim="OSSLT-P04")
S(NAR, 1, INF, 2, "Why did the narrator consider \"walking out the back\"?",
  ["The narrator felt overwhelmed and embarrassed.", "The narrator's shift was already over.", "Carla had criticized the narrator in front of everyone.", "The narrator wanted to take a break with Theo."],
  "After dropping a fork, mixing up orders and being waved at three times, the narrator's face was burning. Carla does not criticize anyone in the story, and the shift was far from over.",
  basics="inference", stim="OSSLT-P04")
S(NAR, 1, INF, 3, "What is the most likely reason the man at table fourteen left a tip and nodded?",
  ["He noticed the apology and the better service.", "He knew it was the narrator's first shift.", "Theo had asked him to be kind to the narrator.", "Carla had given his table a free meal."],
  "Theo sent the narrator to refill his water and apologize, and the man's nod at the end shows he appreciated it. Nothing in the story says he knew it was a first shift or that Theo spoke to him.",
  basics="inference", stim="OSSLT-P04")
O(NAR, 1, "Order of events", 1, "Put these events in the order they happen in the story.",
  ["Carla shows the narrator the dining room.", "The narrator holds a tray of drinks for the wrong table.", "Theo draws a map of the narrator's section.", "The man at table fourteen leaves a tip.", "The narrator draws a map before the doors open."],
  "The tour is that morning, the wrong drinks come during the rush, Theo draws the map just after, the tip comes when the rush ends, and the narrator's own map comes the next Saturday.",
  basics="sequenceEvents", stim="OSSLT-P04")
S(NAR, 1, CON, 2, "Which sentence best states the theme of the story?",
  ["A hard job gets easier with a system.", "Restaurant customers are hard to please.", "It is better to work alone than ask for help.", "A bad first day means the job is wrong."],
  "The narrator struggles until Theo shares his system, then uses it the next week. The narrator accepts help and comes back, so the other choices go against the story.",
  basics="mainIdea", stim="OSSLT-P04")
S(NAR, 1, INF, 2, "Theo's grin at the end of the story most likely shows that he",
  ["is pleased the narrator learned from him", "thinks the narrator's map is too simple", "is surprised the narrator came back", "wants the narrator to work his tables"],
  "Theo grins and says \"You have a system,\" repeating his own advice, which shows he is proud the narrator used it. Nothing suggests he expected the narrator to quit.",
  basics="inference", stim="OSSLT-P04")

# ---------------------------------------------------------------- Test 2 (held out of the drills)

P("OSSLT-P05", "Wetlands: Nature's Sponges",
"""Wetlands such as marshes, swamps and bogs cover a large share of Canada, and they do far more than provide homes for frogs and ducks. A healthy wetland works like a giant sponge. During spring melt or a heavy storm, it soaks up water and then releases it slowly over days or weeks, which lowers the risk of flooding in nearby towns. As water moves through the dense plants, mud and roots, much of the soil and pollution it carries settles out or is absorbed, so the water that leaves a wetland is often cleaner than the water that entered it. Wetlands also store huge amounts of carbon in their soggy soils, carbon that could add to climate change if the wetland were drained. In southern Ontario, however, most of the wetlands that existed before European settlement have been drained or filled for farms, roads and housing. Many communities are now spending money to protect the wetlands that remain and, in some places, to rebuild ones that were lost.""")

S(INFO, 2, EXP, 1, "According to the paragraph, how do wetlands lower the risk of flooding?",
  ["They soak up water and release it slowly.", "They carry water quickly to nearby lakes.", "They freeze solid during the spring melt.", "They push extra water deep underground."],
  "The paragraph compares a wetland to a sponge that soaks up water and releases it over days or weeks. It never says wetlands move water quickly away.",
  basics="findingDetail", stim="OSSLT-P05")
S(INFO, 2, EXP, 1, "What happens to much of the pollution in water that moves through a wetland?",
  ["It settles out or is absorbed.", "It is carried into nearby towns.", "It is turned into stored carbon.", "It is eaten by frogs and ducks."],
  "The paragraph says much of the soil and pollution settles out or is absorbed among the plants, mud and roots. The carbon the paragraph mentions is stored in the soil, not made from pollution.",
  basics="findingDetail", stim="OSSLT-P05")
S(INFO, 2, WORD, 1, "Which word could replace \"soggy\" in the paragraph without changing its meaning?",
  ["waterlogged", "frozen", "sandy", "fertile"],
  "Soggy means soaked with water, and wetland soil is full of water. Frozen, sandy and fertile describe soil in other ways.",
  basics="wordsInContext", stim="OSSLT-P05")
S(INFO, 2, INF, 2, "Why does the writer mention climate change?",
  ["To show that draining a wetland can release carbon", "To argue that wetlands make the weather warmer", "To explain why wetlands flood every spring", "To show why frogs are leaving the wetlands"],
  "The writer says wetlands store carbon that could add to climate change if the wetland were drained. That is a reason to keep wetlands, not a claim that they warm the weather.",
  basics="authorPurpose", stim="OSSLT-P05")
S(INFO, 2, INF, 1, "Which sentence best states the main idea of the paragraph?",
  ["Wetlands do important work worth protecting.", "Most of Canada's wetlands are in Ontario.", "Frogs and ducks need wetlands to survive.", "Wetlands should be filled to build homes."],
  "The paragraph lists the jobs wetlands do (flood control, cleaner water, carbon storage) and ends with communities protecting them. Frogs and ducks are mentioned only in passing.",
  basics="mainIdea", stim="OSSLT-P05")
M(INFO, 2, CON, 3, "A town council is deciding whether to drain a marsh to build a parking lot. Which TWO points from the paragraph would best support keeping the marsh? Choose two.",
  ["The marsh can lower the risk of flooding in town.", "The marsh helps clean the water that flows through it."],
  ["Wetlands cover a large share of Canada.", "Marshes, swamps and bogs are all types of wetland.", "Wetland plants grow in thick mud."],
  "Flood control and cleaner water are direct benefits to the town. That wetlands are common in Canada, or that marshes are one type, gives no reason to keep this one.",
  basics="inference", stim="OSSLT-P05")

P("OSSLT-P06", "Library lends drills, tents and sewing machines",
"""THUNDER BAY, Ont. - Residents who need a ladder for one afternoon or a tent for one weekend can now borrow it the same way they borrow a book.

The Westfort branch of the public library opened a "library of things" last month, with more than 300 items that can be signed out with a library card. The collection includes power drills, snowshoes, a pressure canner, board games, sewing machines and camping gear.

Branch manager Teresa Lindqvist said the idea came from a survey the library ran last spring. "People told us they were buying expensive tools for one small job and then storing them for years," she said. "Sharing them made more sense."

Most items can be borrowed for one week. Power tools come with a printed safety sheet, and borrowers must be at least 18 to sign them out. Teens can borrow games, sports equipment and musical instruments with their own cards.

The project cost about \\$40,000, most of it covered by a provincial grant and a donation from a local hardware store, which also repairs items when they break.

Early demand has surprised staff. The snowshoes have been out every day since the collection opened, and there is a waiting list for the carpet cleaner.

Resident Malcolm Oduya borrowed a tile cutter to redo his bathroom floor. "I would have spent \\$200 on something I'd use once," he said. "This way, it goes back on the shelf for the next person."

The library hopes to add gardening tools in the spring.""")

S(NEWS, 2, EXP, 1, "Who can borrow power tools from the library?",
  ["Borrowers who are at least 18", "Anyone with a library card", "Teens with a parent's note", "People who took a safety course"],
  "The article says borrowers must be at least 18 to sign out power tools. Teens can use their own cards for games, sports equipment and instruments only.",
  basics="findingDetail", stim="OSSLT-P06")
S(NEWS, 2, EXP, 1, "How was most of the project paid for?",
  ["A provincial grant and a store's donation", "Fees charged to people who borrow items", "Money saved by buying fewer new books", "A fundraiser run by local residents"],
  "Most of the \\$40,000 came from a provincial grant and a donation from a local hardware store. Borrowing is done with a library card, and no fees or fundraiser are mentioned.",
  basics="findingDetail", stim="OSSLT-P06")
S(NEWS, 2, INF, 2, "What does the waiting list for the carpet cleaner suggest?",
  ["More people want it than the library can serve at once.", "The carpet cleaner is broken and being repaired.", "It is the most expensive item in the collection.", "Only adults are allowed to borrow the carpet cleaner."],
  "A waiting list means people are lined up for an item that is already out. It appears in the paragraph about demand surprising staff, not one about repairs or cost.",
  basics="inference", stim="OSSLT-P06")
S(NEWS, 2, INF, 2, "Why does the writer include Malcolm Oduya's comments?",
  ["To show how the program saves people money", "To show that some residents dislike the program", "To explain the library's safety rules", "To announce the new items coming in the spring"],
  "Oduya says he would have spent \\$200 on a tool he would use once, which is the problem the library set out to solve. He is pleased with the program, not critical of it.",
  basics="authorPurpose", stim="OSSLT-P06")
S(NEWS, 2, CON, 2, "Which headline would also suit this article?",
  ["Neighbours share tools through the library", "Hardware store closes after library opens", "Teens banned from borrowing library items", "Library replaces its books with power tools"],
  "The article is about residents borrowing and sharing tools and gear. The hardware store supports the project, teens can borrow many items, and nothing says books were removed.",
  basics="mainIdea", stim="OSSLT-P06")

P("OSSLT-P07", "Forty Hours",
"""*Jordan, a Grade 10 student, knocks on the open door of the guidance office.*

**JORDAN:** You wanted to see me, Ms. Okafor?

**MS. OKAFOR:** Come in, Jordan. I was looking at your file. Your marks are strong this year, but I only see six community involvement hours.

**JORDAN:** I know. I keep meaning to do more. I just don't know where to start.

**MS. OKAFOR:** You need forty to graduate, so there's time, but it's easier if you don't leave them all for Grade 12. What do you like doing outside school?

**JORDAN:** Mostly basketball. And I fix my cousins' bikes, if that counts.

**MS. OKAFOR:** Our board doesn't count favours for family. But the bike co-op on King Street runs a free repair night every Thursday, and they always need volunteers who know what they're doing.

**JORDAN:** Wait, really? I thought volunteering had to be, like, serving soup or picking up garbage.

**MS. OKAFOR:** Those are great too. But the best placements use something you're already good at. You'd show up more often, and you'd learn more.

**JORDAN:** Thursday nights work. Practice is Tuesdays and Fridays.

**MS. OKAFOR:** Good. Before you start, fill out the form and bring it back to me so the school can approve the placement. Then have the co-op coordinator sign your hours each month.

**JORDAN:** Do I get the hours if I'm just watching at first?

**MS. OKAFOR:** You get hours for the time you're helping. And trust me, they won't let you just watch for long.

**JORDAN:** (*grinning*) Okay. I'll grab the form on my way out.""")

S(DIA, 2, EXP, 1, "How many community involvement hours has Jordan completed so far?",
  ["Six", "Ten", "Forty", "None"],
  "Ms. Okafor says she sees only six hours in his file. Forty is the number he needs to graduate.",
  basics="findingDetail", stim="OSSLT-P07")
S(DIA, 2, INF, 2, "Why does Ms. Okafor suggest the bike co-op?",
  ["It uses a skill Jordan already has.", "It is the only placement the school allows.", "It meets on the nights of his practices.", "It pays volunteers who can fix bikes."],
  "Jordan fixes bikes, and Ms. Okafor says the best placements use something a student is already good at. The co-op meets Thursdays, when Jordan has no practice.",
  basics="inference", stim="OSSLT-P07")
S(DIA, 2, EXP, 1, "What must Jordan do before he starts at the co-op?",
  ["Return a completed form for approval", "Have the coordinator sign his hours", "Leave the basketball team", "Watch one repair night first"],
  "Ms. Okafor says to fill out the form and bring it back so the school can approve the placement, before he starts. The coordinator signs his hours each month after that.",
  basics="findingDetail", stim="OSSLT-P07")
S(DIA, 2, WORD, 2, "What does Ms. Okafor mean when she says \"they won't let you just watch for long\"?",
  ["The co-op will soon put Jordan to work.", "Jordan will be sent home if he only watches.", "The repair nights are very short.", "Jordan should practise fixing bikes at home."],
  "She is reassuring Jordan that the co-op needs help and will have him repairing bikes soon. Nothing in the dialogue says he would be sent home.",
  basics="wordsInContext", stim="OSSLT-P07")
M(DIA, 2, CON, 3, "Which TWO statements describe how Jordan's ideas about volunteering change? Choose two.",
  ["He first thought it meant only tasks like serving soup.", "He learns it can use a skill he already has."],
  ["He decides it will get in the way of basketball.", "He learns that helping family always counts.", "He decides to finish his hours in Grade 12."],
  "Jordan says he thought volunteering had to be serving soup or picking up garbage, then learns the co-op needs his bike skills. Ms. Okafor tells him family favours do not count, and the co-op fits around practice.",
  basics="inference", stim="OSSLT-P07")

P("OSSLT-P08", "The Portage",
"""Nobody warned me that the hardest part of a canoe trip happens on land.

On the second morning of our trip in Algonquin Park, we reached the first long portage: a 1,400-metre trail through the woods to the next lake. My friend Mei and her dad, Mr. Chen, had done this trip every summer since Mei was ten. I had done it zero times.

Mr. Chen lifted the canoe onto his shoulders in one smooth motion and disappeared up the trail. Mei grabbed the food barrel. That left me with the heaviest pack, the one with the tent and the cooking pots, which pulled at my shoulders like a pair of hands trying to drag me backward.

The trail went up. Then it went up more. Roots crossed it like veins, and the mosquitoes found every bit of skin I had missed with bug spray. Halfway, I stopped and sat on a rock, breathing hard, and told myself I would just wait there until the trip was over.

Mei came back down the trail without the barrel. She sat beside me and didn't say anything for a while. Then she pointed at a small orange sign nailed to a tree. "That's the halfway marker," she said. "The second half is mostly downhill. And there's a lookout at the top of this bit."

"You're just saying that."

"I'm not. Come on. I'll carry the pots."

She unclipped the cooking pots from my pack and hooked them onto her own belt, where they clanked with every step. Without them, the pack felt almost reasonable. We climbed the last stretch together, and at the top the trees opened onto a view of the lake below, blue and perfectly still, with a loon floating near the shore.

I stood there longer than I needed to. My legs were shaking, but I wasn't thinking about them anymore.

That night, by the fire, Mr. Chen asked what I thought of my first portage. I said it was the worst thing I had ever done. Then I asked whether the next one had a lookout too.""")

S(NAR, 2, EXP, 1, "What did the narrator carry at the start of the portage?",
  ["The pack with the tent and pots", "The canoe and the paddles", "The barrel of food for the trip", "The bug spray and the trail map"],
  "Mr. Chen took the canoe and Mei grabbed the food barrel, which left the narrator the heaviest pack, with the tent and cooking pots.",
  basics="findingDetail", stim="OSSLT-P08")
S(NAR, 2, WORD, 2, "Roots \"crossed it like veins.\" This comparison helps the reader picture roots that",
  ["ran across the trail in branching lines", "were soft and red underfoot", "had been cut away from the path", "moved when someone stepped on them"],
  "Veins branch in thin lines under the skin, so the roots spread over the trail in a similar pattern. The comparison is about shape, not colour or movement.",
  basics="wordsInContext", stim="OSSLT-P08")
S(NAR, 2, INF, 1, "Why did the narrator sit down on the rock halfway along the trail?",
  ["The narrator was worn out and discouraged.", "The narrator was waiting for Mr. Chen.", "The narrator had lost the trail.", "The narrator wanted to see the lake."],
  "The narrator was breathing hard and planned to wait there until the trip was over, which shows exhaustion and discouragement. The lake view comes later, at the top.",
  basics="inference", stim="OSSLT-P08")
S(NAR, 2, "Cause and effect", 2, "What made it possible for the narrator to finish the climb?",
  ["Mei took the pots and encouraged the narrator.", "Mr. Chen came back to carry the pack.", "The narrator found a shorter trail.", "The trail turned downhill right after the rock."],
  "Mei came back, told the narrator what lay ahead and carried the pots, which made the pack \"almost reasonable.\" They still climbed the last stretch before any downhill.",
  basics="causeEffect", stim="OSSLT-P08")
S(NAR, 2, INF, 2, "Why does Mei sit quietly beside the narrator before speaking?",
  ["She gives the narrator time to rest and calm down.", "She is too tired to talk after carrying the barrel.", "She is angry that the narrator stopped walking.", "She is waiting for her father to join them."],
  "Mei sits without speaking, then encourages the narrator and offers to carry the pots, which shows patience, not anger. She had already put the barrel down at the other end.",
  basics="inference", stim="OSSLT-P08")
S(NAR, 2, CON, 2, "Which sentence best expresses the main message of the story?",
  ["Help from others can get you through something hard.", "Canoe trips are too difficult for beginners.", "People should never stop to rest on a hike.", "The best part of camping is sitting by the fire."],
  "The narrator nearly gives up until Mei's help and encouragement get them to the lookout. The beginner finishes and even asks about the next portage, so the trip was not too hard.",
  basics="mainIdea", stim="OSSLT-P08")
S(NAR, 2, INF, 3, "What does the narrator's question at the end of the story suggest?",
  ["The narrator is warming up to the trip.", "The narrator wants to avoid the next portage.", "The narrator does not believe what Mei said.", "The narrator plans to stay at the lookout."],
  "Right after calling the portage the worst thing ever, the narrator asks if the next one has a lookout too, which shows the reward has changed how the narrator feels.",
  basics="inference", stim="OSSLT-P08")

# ---------------------------------------------------------------- Drill only (test 0)

P("OSSLT-P09", "Why Leaves Change Colour",
"""Every autumn, the forests of Ontario and Quebec turn red, orange and gold, but many of those colours were in the leaves all along. Through spring and summer, leaves are packed with chlorophyll, the green chemical that plants use to turn sunlight into food. There is so much chlorophyll that it hides everything else. As the days shorten and the nights cool, trees prepare to drop their leaves for winter and stop making new chlorophyll. The green fades, and yellow and orange pigments called carotenoids, which were present all summer, finally show through. Reds and purples work differently. Some trees, such as sugar maples, produce new pigments called anthocyanins in the fall, and they make the most of them when autumn days are sunny and nights are cool but above freezing. That is why the same forest can look brilliant one year and dull the next: the show depends on the weather.""")

S(INFO, 0, EXP, 1, "According to the paragraph, why are yellow and orange hidden in summer?",
  ["Green chlorophyll covers them up.", "The leaves have not made them yet.", "Strong sunlight bleaches them out.", "The nights are not cool enough yet."],
  "The paragraph says there is so much chlorophyll that it hides everything else, and the carotenoids were present all summer. Leaves make new pigments only for the reds and purples.",
  basics="findingDetail", stim="OSSLT-P09")
S(INFO, 0, EXP, 1, "What makes trees stop producing chlorophyll?",
  ["Shorter days and cooler nights", "A hard frost in the fall", "Too much summer sunlight", "A long stretch without rain"],
  "As the days shorten and the nights cool, trees prepare for winter and stop making chlorophyll. The paragraph does not mention frost or rain as the trigger.",
  basics="findingDetail", stim="OSSLT-P09")
S(INFO, 0, EXP, 2, "How are red leaf colours different from yellow and orange ones?",
  ["Red pigments are made new in the fall.", "Red pigments are present all summer.", "Red pigments appear only after frost.", "Red pigments come from chlorophyll."],
  "Some trees produce anthocyanins, the reds and purples, new in the fall. The yellow and orange carotenoids were in the leaves all summer.",
  basics="findingDetail", stim="OSSLT-P09")
S(INFO, 0, INF, 2, "Based on the paragraph, which autumn would most likely give the brightest red maples?",
  ["Sunny days and cool nights above freezing", "Cloudy days and warm, damp nights", "Sunny days and nights far below freezing", "Rainy days and frosty nights"],
  "The paragraph says maples make the most red pigment when days are sunny and nights are cool but above freezing. Each other choice changes one of those conditions.",
  basics="inference", stim="OSSLT-P09")
S(INFO, 0, WORD, 1, "In this paragraph, \"pigments\" are",
  ["substances that give leaves colour", "tiny openings in a leaf's surface", "parts of a tree that store water", "kinds of trees that grow in Ontario"],
  "The paragraph calls carotenoids and anthocyanins pigments and links each to a colour. Nothing connects the word to openings, water or kinds of trees.",
  basics="wordsInContext", stim="OSSLT-P09")
S(INFO, 0, INF, 1, "What is the paragraph mainly about?",
  ["How chemicals in leaves create fall colours", "Where to see the best fall colours in Ontario", "Why sugar maples grow well in Quebec", "How trees survive the winter without leaves"],
  "Each sentence explains chlorophyll, carotenoids or anthocyanins and how they produce the autumn colours. Ontario, Quebec and winter appear only as background.",
  basics="mainIdea", stim="OSSLT-P09")

P("OSSLT-P10", "Why Teenagers Stay Up Late",
"""Parents often blame screens or late homework when teenagers stay up past midnight, but biology plays a large part. During adolescence, the body's internal clock shifts later. The brain begins releasing melatonin, the hormone that makes people feel sleepy, about one to two hours later than it did in childhood, so a fifteen-year-old who lies down at ten o'clock may simply not feel tired. At the same time, teenagers still need a lot of sleep: Canadian guidelines recommend eight to ten hours a night for those aged 14 to 17. When school starts early, the result is a steady sleep debt that can affect mood, memory and attention in class. Screens do make the problem worse, because bright light in the evening can delay melatonin even further. Sleep researchers suggest keeping a regular bedtime, even on weekends, and putting phones away an hour before sleep, but many also argue that later school start times would help more than any single habit.""")

S(INFO, 0, EXP, 1, "How much sleep do Canadian guidelines recommend for people aged 14 to 17?",
  ["Eight to ten hours a night", "Six to eight hours a night", "Nine to eleven hours a night", "Ten to twelve hours a night"],
  "The paragraph states that Canadian guidelines recommend eight to ten hours a night for those aged 14 to 17.",
  basics="findingDetail", stim="OSSLT-P10")
S(INFO, 0, EXP, 1, "According to the paragraph, what is melatonin?",
  ["A hormone that makes people sleepy", "A chemical given off by bright screens", "The part of the brain that controls mood", "A habit that helps people fall asleep"],
  "The paragraph defines melatonin as the hormone that makes people feel sleepy. Screens delay melatonin; they do not produce it.",
  basics="findingDetail", stim="OSSLT-P10")
S(INFO, 0, WORD, 2, "What does the writer mean by \"a steady sleep debt\"?",
  ["Missed sleep that keeps adding up", "Money that families spend on sleep aids", "A bedtime that parents set for teenagers", "Sleep that teenagers make up on weekends"],
  "A debt is something owed. When teens fall asleep late but must get up early, they keep missing sleep they need, and it adds up.",
  basics="wordsInContext", stim="OSSLT-P10")
S(INFO, 0, INF, 2, "Why does the writer begin by mentioning screens and late homework?",
  ["To introduce a common belief before giving another cause", "To prove that screens are the main reason teens stay up", "To criticize teenagers for leaving homework until late", "To list the rules that parents should set at home"],
  "The first sentence names what parents usually blame, then says \"but biology plays a large part,\" which sets up the main explanation. Later the writer says screens make it worse, not that they are the main cause.",
  basics="authorPurpose", stim="OSSLT-P10")
S(INFO, 0, "Fact and opinion", 2, "Which statement from the paragraph is an opinion rather than a fact?",
  ["Later school start times would help more than any single habit.", "Bright light in the evening can delay melatonin.", "Teenagers' internal clocks shift later during adolescence.", "Canadian guidelines recommend eight to ten hours of sleep."],
  "The writer presents the start-time idea as something many \"argue,\" a judgment people can disagree with. The others are presented as facts that can be checked.",
  basics="factOpinion", stim="OSSLT-P10")
M(INFO, 0, CON, 2, "A student falls asleep in first period every day. Based on the paragraph, which TWO changes would most likely help? Choose two.",
  ["Going to bed at the same time every night, weekends included", "Putting the phone away an hour before bed"],
  ["Sleeping in until noon every Saturday", "Doing homework in bed under a bright lamp", "Staying up until the body feels tired"],
  "Sleep researchers suggest a regular bedtime, even on weekends, and putting phones away an hour before sleep. Sleeping in breaks the regular schedule, and bright light delays melatonin.",
  basics="inference", stim="OSSLT-P10")

P("OSSLT-P11", "Snowbelts",
"""Some Ontario towns can be buried in snow while places an hour's drive away see only flurries. The difference often comes from lake-effect snow. In late fall and early winter, the Great Lakes are still relatively warm, because water holds heat much longer than land does. When frigid air from the northwest blows across a lake, the warmer water heats the bottom layer of air and adds moisture to it. That warm, damp air rises, cools and forms clouds, which drop heavy snow once they reach the downwind shore. The longer the stretch of open water the wind crosses, the more moisture it can pick up, so the heaviest snow usually falls in narrow bands over particular areas known as snowbelts, such as the land east of Lake Huron and Georgian Bay. Lake-effect snow usually becomes less common later in the winter, once ice covers much of the lake and the water can no longer feed the clouds.""")

S(INFO, 0, EXP, 1, "Why are the Great Lakes still fairly warm in early winter?",
  ["Water holds heat longer than land does.", "Warm winds blow over them from the south.", "Snow on the ice traps heat underneath.", "Rivers carry warm water into the lakes."],
  "The paragraph says the lakes stay relatively warm because water holds heat much longer than land does. The winds it describes are cold, from the northwest.",
  basics="findingDetail", stim="OSSLT-P11")
O(INFO, 0, "Order of steps", 2, "Put the steps of lake-effect snow in the order the paragraph describes.",
  ["Cold air blows across the lake.", "The water warms the air and adds moisture.", "The damp air rises, cools and forms clouds.", "Snow falls on the downwind shore."],
  "Cold air must first cross the water, which warms and moistens it; that air then rises and forms clouds, and the clouds drop snow when they reach the downwind shore.",
  stim="OSSLT-P11")
S(INFO, 0, INF, 2, "Which town would most likely get the most lake-effect snow?",
  ["One downwind of a long stretch of open lake", "One on the upwind shore of a small lake", "One far inland, away from any large lake", "One beside a lake that is covered in ice"],
  "Snow falls on the downwind shore, and a longer stretch of open water adds more moisture. A frozen lake can no longer feed the clouds.",
  basics="inference", stim="OSSLT-P11")
S(INFO, 0, WORD, 1, "In this paragraph, \"frigid\" most nearly means",
  ["very cold", "very dry", "very fast", "very damp"],
  "Frigid describes the air that the warmer water heats from below, so it means very cold. The paragraph contrasts the air with the warmer lake, which is about temperature.",
  basics="wordsInContext", stim="OSSLT-P11")
S(INFO, 0, EXP, 2, "Why does lake-effect snow usually become less common later in winter?",
  ["Ice stops the lake from feeding the clouds.", "The winds stop blowing from the northwest.", "The air over the lakes becomes too warm.", "The snowbelts are already covered in snow."],
  "The last sentence says that once ice covers much of the lake, the water can no longer feed the clouds. Nothing says the winds change direction.",
  basics="findingDetail", stim="OSSLT-P11")
S(INFO, 0, INF, 2, "Why does the writer open with towns \"buried in snow\" near places with \"only flurries\"?",
  ["To set up a puzzle the paragraph then explains", "To warn drivers to stay out of snowbelt towns", "To compare Ontario's winters with other places", "To argue that weather forecasts are unreliable"],
  "The opening describes a surprising difference, and the next sentence starts explaining it: lake-effect snow. The paragraph gives no driving advice and makes no claim about forecasts.",
  basics="authorPurpose", stim="OSSLT-P11")

P("OSSLT-P12", "Students plant 2,000 trees along creek",
"""LONDON, Ont. - About 150 students from three high schools spent a cold, wet Friday on the banks of Cedar Hollow Creek, planting 2,000 native trees and shrubs on land that was a mowed field a month ago.

The planting is part of a city project to restore the creek, which has been eroding badly in recent years. Without roots to hold it, the bank was crumbling into the water after every heavy rain, muddying the creek and harming fish.

"Trees and shrubs act like a net," said city ecologist Dr. Femi Adeyemi, who organized the day. "Their roots hold the soil in place, and their shade keeps the water cool for fish."

Students planted species that grow naturally in the area, including silver maple, red osier dogwood and nannyberry. Each sapling was fitted with a plastic guard to keep rabbits and mice from chewing the bark.

For Grade 9 student Keisha Thompson, the rain was worth it. "My grandpa used to fish here when he was a kid," she said. "He says it was full of fish back then. I want it to be like that again."

Not every tree will survive. Adeyemi said she expects to lose about one in five over the first two winters, which is normal for a planting this size. The city will return in the spring to replace those that die.

The city plans to plant another 3,000 trees along the creek next fall and is looking for more school groups to help.""")

S(NEWS, 0, EXP, 1, "What problem is the planting meant to fix?",
  ["The creek bank was eroding into the water.", "The creek was flooding nearby homes.", "Rabbits were eating plants by the creek.", "The field was too wet to be mowed."],
  "The article says the bank was crumbling into the water after every heavy rain, muddying the creek and harming fish. Rabbits are mentioned only as a threat to the new saplings.",
  basics="findingDetail", stim="OSSLT-P12")
S(NEWS, 0, EXP, 1, "Why did students fit a plastic guard on each sapling?",
  ["To stop animals from chewing the bark", "To protect it from heavy rain", "To mark where each tree was planted", "To keep the soil warm in winter"],
  "Each guard was there to keep rabbits and mice from chewing the bark. The article gives no other reason for the guards.",
  basics="findingDetail", stim="OSSLT-P12")
S(NEWS, 0, WORD, 2, "Dr. Adeyemi says trees and shrubs \"act like a net.\" What does she mean?",
  ["Their roots hold the soil together.", "Their branches catch litter before it reaches the water.", "They trap fish in the shallow parts of the creek.", "They keep people away from the creek bank."],
  "She explains right away: their roots hold the soil in place. A net holds things together, and the problem was soil falling into the creek.",
  basics="wordsInContext", stim="OSSLT-P12")
S(NEWS, 0, INF, 2, "If Dr. Adeyemi's estimate is correct, about how many of the 2,000 trees will die in the first two winters?",
  ["400", "200", "500", "1,600"],
  "She expects to lose about one in five. One fifth of 2,000 is 400. 1,600 is the number expected to survive.",
  basics="inference", stim="OSSLT-P12")
S(NEWS, 0, INF, 2, "Why does the writer include Keisha Thompson's story about her grandfather?",
  ["To show a personal reason for restoring the creek", "To prove the creek has more fish than ever before", "To explain how the city chose the kinds of trees", "To describe the fishing rules along the creek"],
  "Keisha says her grandfather remembers a creek full of fish and she wants it to be like that again, a personal reason for the work. Her words suggest there are fewer fish now, not more.",
  basics="authorPurpose", stim="OSSLT-P12")
S(NEWS, 0, EXP, 1, "What does the last paragraph of the article add?",
  ["The project will continue and needs more help.", "The planting day was cancelled because of rain.", "Most of the new trees have already died.", "The students were paid for the day's work."],
  "The last paragraph says the city will plant 3,000 more trees next fall and wants more school groups. The planting went ahead in the rain.",
  basics="findingDetail", stim="OSSLT-P12")

P("OSSLT-P13", "Community fridge opens in Kingston",
"""KINGSTON, Ont. - A bright blue refrigerator now stands under a wooden shelter outside a community centre in the city's north end, and anyone is welcome to take food from it, no questions asked.

The community fridge opened last week. It is run by a group of volunteers who restock it twice a day with donations from bakeries, grocery stores and neighbours. A shelf beside it holds canned goods, diapers and toothpaste.

"The idea is simple: take what you need, leave what you can," said organizer Ana Ribeiro, a nursing student who started the project after reading about similar fridges in Toronto and Montreal.

Volunteers check the fridge every morning and evening. They throw out anything past its date, wipe the shelves and post a list of what can and cannot be donated. Home-cooked meals are not accepted, because volunteers cannot confirm how they were made, but sealed store-bought food, fruit and vegetables are welcome.

Some nearby residents worried at first that the fridge would attract litter. Ribeiro said the group met with neighbours before opening and agreed to empty a garbage bin beside the shelter every evening.

Retired bus driver Glen Arsenault stops by most mornings. Sometimes he takes a loaf of bread; sometimes he leaves a bag of apples from his tree. "It goes both ways," he said. "That's what makes it work."

The group is looking for more volunteers, especially for weekend evening shifts.""")

S(NEWS, 0, EXP, 1, "How often do volunteers restock the fridge?",
  ["Twice a day", "Once a week", "Only in the evening", "Whenever food arrives"],
  "The second paragraph says volunteers restock it twice a day. They also check it every morning and evening.",
  basics="findingDetail", stim="OSSLT-P13")
S(NEWS, 0, EXP, 1, "Why are home-cooked meals not accepted?",
  ["No one can confirm how they were made.", "They spoil faster than store food.", "Neighbours complained about them.", "The fridge has no room for them."],
  "The article says volunteers cannot confirm how home-cooked meals were made. Neighbours' worries were about litter, not food.",
  basics="findingDetail", stim="OSSLT-P13")
S(NEWS, 0, INF, 2, "What does the meeting with neighbours before the opening suggest about the organizers?",
  ["They wanted to deal with concerns before problems began.", "They needed the neighbours' money to buy the fridge.", "They planned to move the fridge to another street.", "They did not expect anyone to use the fridge."],
  "Residents worried about litter, so the group met them first and agreed to empty a bin every evening. That shows planning ahead, not a need for money.",
  basics="inference", stim="OSSLT-P13")
S(NEWS, 0, INF, 2, "Glen Arsenault says \"It goes both ways.\" What does he mean?",
  ["People both give food and take food.", "The fridge has doors on both sides.", "Volunteers work morning and evening.", "Some neighbours like it and some don't."],
  "He sometimes takes bread and sometimes leaves apples, so giving and taking both happen, which matches the motto \"take what you need, leave what you can.\"",
  basics="wordsInContext", stim="OSSLT-P13")
S(NEWS, 0, EXP, 1, "Where did Ana Ribeiro get the idea for the fridge?",
  ["From reading about fridges in other cities", "From a class in her nursing program", "From a grocery store manager she knew", "From a neighbour who had lost a job"],
  "Ribeiro started the project after reading about similar fridges in Toronto and Montreal. Her nursing studies are mentioned, but not as the source of the idea.",
  basics="findingDetail", stim="OSSLT-P13")
M(NEWS, 0, EXP, 2, "Which TWO details show that the organizers are trying to keep the fridge safe and clean? Choose two.",
  ["They throw out food that is past its date.", "They empty a garbage bin beside the shelter every evening."],
  ["The fridge is painted bright blue.", "Donations come from bakeries and grocery stores.", "The group wants volunteers for weekend shifts."],
  "Removing old food keeps it safe, and emptying the bin keeps the area clean. The colour, the donors and the volunteer request are true but say nothing about safety or cleanliness.",
  basics="findingDetail", stim="OSSLT-P13")

P("OSSLT-P14", "Teen maps bus stops for riders who use wheelchairs",
"""HAMILTON, Ont. - When Noor Haddad's younger brother started using a wheelchair after surgery last year, the family discovered that some bus stops near their home had no curb cuts, so he could not get on or off the sidewalk safely.

Haddad, now 17, decided to map the problem. Over the summer, she and four friends visited more than 600 bus stops across the lower city, recording whether each one had a curb cut, a paved landing pad, a bench and a shelter. They uploaded the information to a free web map that anyone can use to plan a trip.

"We just took photos and filled in a spreadsheet," Haddad said. "It isn't complicated. It just takes a lot of walking."

Riders who use wheelchairs, walkers and strollers have started using the map, and several have sent in corrections and new stops. Haddad checks each change before adding it.

City councillor Bev Marchetti said the map showed staff something their own records had missed. About one stop in six that the group visited had no curb cut at all. The city has since moved 25 of those stops to the top of its repair list.

Haddad's brother no longer needs the wheelchair, but she plans to keep the map going. "Somebody else's brother still does," she said.""")

S(NEWS, 0, EXP, 1, "What first led Noor Haddad to start the project?",
  ["Her brother could not safely use some stops.", "Her family could not afford bus fare.", "The city asked students to check bus stops.", "Her friends needed a summer project."],
  "The first paragraph says her brother, in a wheelchair, could not get on or off the sidewalk safely at stops with no curb cuts. The city learned from the map later.",
  basics="findingDetail", stim="OSSLT-P14")
S(NEWS, 0, EXP, 1, "Which detail did the group record at each bus stop?",
  ["Whether it had a curb cut", "How many riders used it", "How late the buses ran", "Whether it sold tickets"],
  "The group recorded whether each stop had a curb cut, a paved landing pad, a bench and a shelter. Rider counts and schedules are not mentioned.",
  basics="findingDetail", stim="OSSLT-P14")
S(NEWS, 0, INF, 2, "The group visited more than 600 stops. About how many of them had no curb cut at all?",
  ["About 100", "About 25", "About 60", "About 300"],
  "About one stop in six had no curb cut, and 600 divided by 6 is 100. The 25 stops are the ones the city moved to the top of its repair list.",
  basics="inference", stim="OSSLT-P14")
S(NEWS, 0, INF, 2, "What does Haddad suggest when she says \"It isn't complicated. It just takes a lot of walking\"?",
  ["Anyone willing to put in the effort could do it.", "The project took much less time than planned.", "She wishes the city had paid her group.", "The spreadsheet was the hardest part."],
  "She says the method is simple and the hard part is the walking, so effort, not special skill, is what it takes. She says the spreadsheet was the easy part.",
  basics="inference", stim="OSSLT-P14")
S(NEWS, 0, CON, 2, "What does Haddad mean by \"Somebody else's brother still does\"?",
  ["Other riders still need the map, even if he does not.", "Her brother's best friend has started using a wheelchair.", "She plans to give the map to another family to run.", "The city has still not fixed the stop near her home."],
  "Her brother no longer needs the wheelchair, but other riders do, so the map still matters. That is why she will keep it going rather than hand it off.",
  basics="inference", stim="OSSLT-P14")

P("OSSLT-P15", "Auditions",
"""*Lunch. Amir and Zoe are sitting on the steps outside the school.*

**ZOE:** Auditions for the musical are Thursday. You're trying out, right?

**AMIR:** I don't know. I was thinking about it.

**ZOE:** You've been singing in the car every morning since September. My ears can confirm you were thinking about it.

**AMIR:** Singing in the car is different. Nobody's watching except you, and you don't count.

**ZOE:** Thanks a lot.

**AMIR:** You know what I mean. Last year I froze during my presentation in history. I just stood there. Everybody stared.

**ZOE:** That was one presentation. You knew the material; you just weren't ready for the room.

**AMIR:** That's exactly what would happen at auditions.

**ZOE:** Okay, so get ready for the room. Mr. Lavoie said anybody can come to the open rehearsal Wednesday and just watch. You'd see the stage, the lights, everything.

**AMIR:** (*after a pause*) That might help.

**ZOE:** And you don't have to audition for a lead. You could sing in the chorus. Twenty people singing together. Nobody's looking at one person.

**AMIR:** You've really thought about this.

**ZOE:** I'm auditioning too, remember? I need somebody to practise with.

**AMIR:** (*smiling*) So this is about you.

**ZOE:** It's about both of us. Wednesday, after school. Meet me at the auditorium doors.

**AMIR:** Fine. But if I freeze, you're carrying me out.

**ZOE:** Deal.""")

S(DIA, 0, EXP, 1, "What happened during Amir's history presentation last year?",
  ["He froze and could not go on.", "He forgot to prepare his notes.", "He sang instead of presenting.", "He laughed in front of the class."],
  "Amir says he froze and just stood there while everybody stared. Zoe adds that he knew the material, so he was not unprepared.",
  basics="findingDetail", stim="OSSLT-P15")
S(DIA, 0, INF, 1, "When Zoe says \"My ears can confirm you were thinking about it,\" her tone is",
  ["teasing", "angry", "worried", "jealous"],
  "Zoe jokes that she has had to listen to Amir sing every morning, a playful way of saying he obviously wants to audition. Nothing in her words sounds angry or worried.",
  basics="toneWords", stim="OSSLT-P15")
S(DIA, 0, EXP, 1, "What does Zoe suggest Amir do before the auditions?",
  ["Watch the open rehearsal on Wednesday", "Sing a solo for Mr. Lavoie", "Redo his history presentation", "Ask Mr. Lavoie for a lead role"],
  "Zoe tells Amir that anybody can come to Wednesday's open rehearsal to see the stage and lights. She suggests the chorus, not a lead or a solo.",
  basics="findingDetail", stim="OSSLT-P15")
S(DIA, 0, INF, 2, "Why does Zoe mention singing in the chorus?",
  ["To show Amir a way to perform without everyone watching him", "To tell Amir that he is not good enough for a lead role", "To explain that the chorus needs more singers than the leads", "To persuade Amir to leave the lead roles for her"],
  "Amir is afraid of freezing while everyone stares, and Zoe points out that in a chorus of twenty, nobody looks at one person. She never judges his singing.",
  basics="inference", stim="OSSLT-P15")
S(DIA, 0, WORD, 2, "What does Zoe mean by \"you just weren't ready for the room\"?",
  ["Amir was not used to an audience watching him.", "The classroom was too small for his presentation.", "Amir arrived late on the day of his presentation.", "Amir had not learned the material well enough."],
  "Zoe says Amir knew the material, so \"the room\" means the setting: standing in front of people who are watching. That is why she suggests seeing the stage first.",
  basics="wordsInContext", stim="OSSLT-P15")
S(DIA, 0, INF, 2, "How does Amir's attitude change during the conversation?",
  ["From unsure to willing to try", "From excited to nervous", "From angry to calm", "From confident to doubtful"],
  "Amir begins unsure (\"I don't know\") and ends agreeing to meet Zoe on Wednesday, joking about freezing. He is never angry, and he was not confident at the start.",
  basics="inference", stim="OSSLT-P15")

P("OSSLT-P16", "The Three Sisters",
"""*A backyard in Brantford in late May. Kaya and her grandmother are kneeling beside a freshly dug garden bed.*

**KAYA:** Why are we putting the corn in little hills? Wouldn't rows be easier?

**GRANDMA:** Rows are easier for a tractor. This garden is for us. The corn goes in the middle of each mound, and in a couple of weeks, once it's up, we plant the beans around it.

**KAYA:** Why wait?

**GRANDMA:** The beans climb. If they go in first, they have nothing to hold on to. The corn grows up and becomes their pole.

**KAYA:** So the beans just use the corn?

**GRANDMA:** The beans give back. Their roots put nitrogen into the soil, and the corn needs plenty of that. After the beans, the squash goes in around the edge, and its big leaves shade the ground.

**KAYA:** What does shade do?

**GRANDMA:** Keeps the soil damp and the weeds down. Each one helps the other two. That's why my grandmother called them the Three Sisters. Haudenosaunee farmers have grown them together for hundreds of years.

**KAYA:** (*sitting back on her heels*) It's kind of like our family. You do the planting, Mom does the watering, and I do the complaining.

**GRANDMA:** (*laughing*) You do the weeding this year. That's the job I'm giving you.

**KAYA:** I walked into that.

**GRANDMA:** You did. But in August, when you pick your own corn, you'll tell me it was worth it.""")

S(DIA, 0, "Cause and effect", 1, "Why does Grandma wait to plant the beans?",
  ["The beans need the corn to climb on.", "Beans grow faster in hot weather.", "The squash has to go in first.", "Bean seeds rot in damp spring soil."],
  "Grandma says the beans climb, so if they went in first they would have nothing to hold on to; the corn becomes their pole. The squash goes in after the beans.",
  basics="causeEffect", stim="OSSLT-P16")
S(DIA, 0, EXP, 1, "According to Grandma, how do the beans help the corn?",
  ["Their roots add nitrogen to the soil.", "Their leaves shade the corn from the sun.", "Their vines hold the corn stalks up.", "They keep weeds away from the corn."],
  "Grandma says the beans' roots put nitrogen into the soil, which the corn needs. It is the squash leaves that shade the ground and keep weeds down.",
  basics="findingDetail", stim="OSSLT-P16")
S(DIA, 0, INF, 2, "What does Grandma mean by \"Rows are easier for a tractor. This garden is for us\"?",
  ["The garden does not need to suit machines.", "She plans to use a tractor later on.", "Rows would make the garden too large.", "Rows do not let enough sun reach the corn."],
  "Rows suit farm machinery, but a family garden can be planted the way that works for the plants and the people tending it. She never mentions sunlight or size.",
  basics="inference", stim="OSSLT-P16")
S(DIA, 0, WORD, 2, "When Kaya says \"I walked into that,\" she is",
  ["admitting her own joke earned her a chore", "complaining that the garden is far to walk", "apologizing for being rude to Grandma", "explaining why she tripped on the bed"],
  "Kaya joked that her job is complaining, and Grandma answered by giving her the weeding. \"I walked into that\" means she set herself up for it.",
  basics="wordsInContext", stim="OSSLT-P16")
S(DIA, 0, CON, 2, "Which statement best describes the main idea of the dialogue?",
  ["Plants, like family members, can help one another.", "Gardens should always be planted in rows.", "Children should do most of the garden work.", "Corn is the most important crop to grow."],
  "Grandma explains how each of the Three Sisters helps the other two, and Kaya compares it to her family. Grandma prefers mounds to rows, and no crop is called most important.",
  basics="mainIdea", stim="OSSLT-P16")
O(DIA, 0, "Order of steps", 1, "Put the planting steps in the order Grandma describes them.",
  ["Plant corn in the middle of each mound.", "Wait for the corn to come up.", "Plant beans around the corn.", "Plant squash around the edge."],
  "Corn goes in first, the beans wait until the corn is up so they have a pole to climb, and Grandma says the squash goes in after the beans.",
  basics="sequenceEvents", stim="OSSLT-P16")

P("OSSLT-P17", "A New Position",
"""*After practice. Coach Bélanger stops Sam, a Grade 10 student, on the way to the change room.*

**COACH:** Sam, got a minute?

**SAM:** Sure. Is this about Saturday? I know I missed that pass.

**COACH:** It's not about one pass. I want to try you on defence for the next few games.

**SAM:** Defence? I've played forward since I was eight.

**COACH:** I know. And you're a good forward. But watch how you play when we lose the puck. You're the first one back every time. You read the play before anybody else does.

**SAM:** That's just because I don't want to get scored on.

**COACH:** That's how a defender thinks. We're short two defence since Kofi broke his wrist and Liam moved away, and I'd rather put someone there who sees the ice the way you do.

**SAM:** What if I'm bad at it?

**COACH:** Then you'll be bad at it for a couple of games, and then you'll get better. That's how everybody learns a new position. I'm not asking you to be perfect on Saturday.

**SAM:** (*quietly*) Will I still get to play forward sometimes?

**COACH:** On the power play, yes. You've earned that.

**SAM:** Okay. I'll try it.

**COACH:** Good. Come early Thursday. Ms. Tran will run some backward skating with you before practice.""")

S(DIA, 0, EXP, 1, "Why is the team short of defence players?",
  ["One broke his wrist and one moved away.", "Two defence players quit the team.", "Sam missed a pass on Saturday.", "Ms. Tran moved two of them to forward."],
  "The coach says the team is short two defence since Kofi broke his wrist and Liam moved away. Sam's missed pass is not the reason for the change.",
  basics="findingDetail", stim="OSSLT-P17")
S(DIA, 0, WORD, 2, "The coach tells Sam, \"You read the play before anybody else does.\" What does this mean?",
  ["Sam can tell what will happen next on the ice.", "Sam studies the team's plays at home.", "Sam is the fastest skater on the team.", "Sam watches the other team's games."],
  "Reading the play means understanding a game situation and predicting it, which is why Sam is first back when the puck is lost. It has nothing to do with books or speed.",
  basics="wordsInContext", stim="OSSLT-P17")
S(DIA, 0, INF, 2, "Why does the coach say \"I'm not asking you to be perfect on Saturday\"?",
  ["To ease Sam's worry about failing", "To warn Sam that he may be benched", "To criticize Sam's missed pass", "To explain why the team may lose"],
  "Sam has just asked \"What if I'm bad at it?\" and the coach answers that everyone is bad at first and gets better. He is reassuring Sam, not warning him.",
  basics="inference", stim="OSSLT-P17")
S(DIA, 0, INF, 2, "Sam asks, \"quietly,\" whether he will still play forward. This suggests that Sam",
  ["still cares about the position he loves", "is angry about the coach's decision", "has already decided to quit the team", "wants to play defence on the power play"],
  "Sam has played forward since he was eight, and his quiet question shows he hopes to keep part of that role. He agrees to try defence, so he is not angry or quitting.",
  basics="toneWords", stim="OSSLT-P17")
M(DIA, 0, "Cause and effect", 2, "Which TWO reasons does the coach give for thinking Sam would be a good defender? Choose two.",
  ["Sam is always first back when the team loses the puck.", "Sam reads the play before anybody else."],
  ["Sam has played defence since he was eight.", "Sam scored the most goals on the team.", "Sam asked to try playing defence."],
  "The coach points to Sam being first back every time and reading the play early. Sam has played forward since he was eight, and moving was the coach's idea.",
  basics="causeEffect", stim="OSSLT-P17")

P("OSSLT-P18", "First Snow",
"""The airport doors slid open, and the cold hit me like a wall. It was the second of January, and the sign above the parking lot said minus 31.

My mother had warned me. For months before we left Manila, she had sent me videos of snowplows and frozen rivers and told me Winnipeg would be cold. I had nodded and pictured something like the air conditioning in the mall. I was wrong. The cold got inside my nose and made my eyes water, and the water felt like it was freezing on my eyelashes.

My aunt Rosa, who had lived in Winnipeg for eleven years, laughed and wrapped a scarf around my face twice. "Welcome home," she said. I didn't feel at home. I felt like I had landed on the moon.

The first week of school, I wore so many layers that I could barely bend my arms. At lunch, I sat alone and watched other kids run outside to the field, where they pushed each other into snowbanks and shrieked like it was the best thing in the world. I didn't understand it.

On Friday, a girl from my math class, Jasmine, sat down across from me. She had a toque with a pompom the size of a grapefruit. "You're the new kid from the Philippines, right?" she said. "My lola is from Cebu." Then she pointed at the window. "Have you ever made a snow angel?"

I said no. She looked at me like I had said I had never eaten bread.

Ten minutes later I was lying on my back in the snow, moving my arms and legs while Jasmine coached me. The snow got down my collar. My face burned with cold. Jasmine helped me up, and we looked down at the shape I had made, a little crooked, with one wing bigger than the other.

"Not bad," she said. "For a first one."

I looked at it for a long time. It was the first thing I had made in this country.

That night I called my cousin in Manila. She asked what Winnipeg was like. I thought about the scarf, the cold and the crooked angel in the snow. "Cold," I said. "But I think it might be okay.\"""")

S(NAR, 0, EXP, 1, "Before arriving, how had the narrator imagined Winnipeg's cold?",
  ["Like the air conditioning in a mall", "Like the frozen rivers in the videos", "Like standing on the moon", "Like the inside of a freezer"],
  "The narrator says, \"I had nodded and pictured something like the air conditioning in the mall.\" The moon comparison comes after arriving.",
  basics="findingDetail", stim="OSSLT-P18")
S(NAR, 0, WORD, 2, "The narrator says, \"I felt like I had landed on the moon.\" This shows the narrator felt",
  ["that everything was strange and unfamiliar", "excited to explore a brand-new place", "lonely because Aunt Rosa had left", "proud of having travelled so far"],
  "Aunt Rosa says \"Welcome home,\" and the narrator answers that it feels like the moon, a place as foreign as possible. Aunt Rosa is right there, so loneliness is not the point.",
  basics="wordsInContext", stim="OSSLT-P18")
S(NAR, 0, INF, 2, "Why didn't the narrator understand the kids playing in the snowbanks?",
  ["Snow still seemed harsh and unpleasant.", "The narrator was not allowed outside.", "The other kids were being mean.", "The narrator could not see the field."],
  "The narrator has just described cold that hurts and layers so thick that bending is hard, so playing in snow seems strange. The kids shriek \"like it was the best thing in the world,\" not out of meanness.",
  basics="inference", stim="OSSLT-P18")
S(NAR, 0, INF, 2, "Why does Jasmine mention that her lola is from Cebu?",
  ["To show they have something in common", "To explain why she wears a big toque", "To prove she has been to the Philippines", "To ask the narrator about Cebu"],
  "Jasmine has just asked if the narrator is the new kid from the Philippines; mentioning her grandmother from Cebu builds a connection. She never says she has visited.",
  basics="inference", stim="OSSLT-P18")
S(NAR, 0, INF, 3, "Why does the narrator look at the snow angel \"for a long time\"?",
  ["It is a first sign of belonging in a new place.", "The narrator is upset that it is crooked.", "The narrator is waiting for Jasmine's turn.", "The narrator is too cold to move."],
  "The next sentence says it was the first thing the narrator had made in this country, so it matters as a start. The narrator does not seem upset by the crooked wing.",
  basics="inference", stim="OSSLT-P18")
S(NAR, 0, CON, 2, "Which sentence best describes how the narrator changes?",
  ["From feeling like an outsider to feeling hopeful", "From loving the snow to being afraid of it", "From trusting Aunt Rosa to doubting her", "From disliking math class to enjoying it"],
  "At first the narrator feels as if on the moon and eats lunch alone; by the end the narrator says Winnipeg \"might be okay.\" The other changes do not happen in the story.",
  basics="mainIdea", stim="OSSLT-P18")

P("OSSLT-P19", "The Space Behind the Van",
"""Dad picked the emptiest street in our neighbourhood for my first parallel parking lesson, which still felt like too many witnesses.

"Pull up beside the blue van," he said. "Leave about an arm's length between you."

I had had my G1 for three weeks. I could drive around the block, signal, and stop at a stop sign without throwing Dad into the dashboard. Parking between two cars was different. There was a pickup truck behind the space and a blue van in front, and both of them looked very expensive.

On the first try, I turned the wheel too late and ended up with the back tire bumping the curb and the front of the car sticking out into the road like a dog's tongue. On the second try, I turned too early and stopped a full metre from the curb. Dad didn't say anything. He just made a little "hmm" noise, which was worse.

On the third try, a man came out of a house carrying groceries and stopped to watch. My hands started sweating on the wheel. I put the car in park, right in the middle of the road.

"I can't do this," I said.

Dad looked at me. "You can't do it yet," he said. "That's a different sentence."

He had me pull ahead and turn the car off. Then he got out, walked to the curb and pointed at the van's back bumper. "When your mirror lines up with this, you start turning. Every time. You don't have to feel it. You just have to watch for the mark."

The man with the groceries had gone inside. I started the car, pulled up beside the van and waited until my mirror lined up with the bumper. Then I turned, straightened and rolled back slowly. The car slid into the space with room to spare in front and behind.

I sat there for a moment, not moving. Dad was grinning.

"Again," he said. "Ten more times. Then it's yours.\"""")

S(NAR, 0, EXP, 1, "What went wrong on the narrator's second try?",
  ["The car stopped too far from the curb.", "The back tire bumped the curb.", "The car stopped in the middle of the road.", "The car touched the blue van."],
  "On the second try the narrator turned too early and stopped a full metre from the curb. Bumping the curb was the first try, and stopping in the road was the third.",
  basics="findingDetail", stim="OSSLT-P19")
S(NAR, 0, WORD, 2, "The front of the car stuck out \"like a dog's tongue.\" This comparison suggests the car was",
  ["poking awkwardly into the road", "moving fast and out of control", "parked neatly along the curb", "making a loud panting noise"],
  "A dog's tongue hangs out to one side, so the car's front was sticking out into the road at an angle. The comparison is about position, not speed or sound.",
  basics="wordsInContext", stim="OSSLT-P19")
S(NAR, 0, INF, 2, "Why was Dad's little \"hmm\" noise \"worse\" than words?",
  ["It felt like quiet disappointment.", "Dad was shouting at the narrator.", "It scared the man with groceries.", "It meant Dad would take the wheel."],
  "Dad said nothing after the second mistake, and his quiet \"hmm\" left the narrator to imagine what he thought. He was not shouting, and the man with groceries arrives later.",
  basics="inference", stim="OSSLT-P19")
S(NAR, 0, INF, 2, "What does Dad mean by \"You can't do it yet. That's a different sentence\"?",
  ["Not managing something now doesn't mean never managing it.", "The narrator should say things to Dad more politely.", "The narrator should practise on a different street.", "Dad will park the car himself this time."],
  "Adding \"yet\" turns a dead end into something still being learned. Dad then teaches a method, so he is not taking over or changing streets.",
  basics="inference", stim="OSSLT-P19")
S(NAR, 0, "Cause and effect", 1, "What finally helps the narrator park the car successfully?",
  ["Using the van's bumper as a mark for turning", "Waiting until the street was completely empty", "Turning the wheel as early as possible", "Asking the man with groceries for help"],
  "Dad shows the narrator to start turning when the mirror lines up with the van's back bumper, and the next try works. Turning too early had caused the second mistake.",
  basics="causeEffect", stim="OSSLT-P19")
S(NAR, 0, INF, 3, "Dad's words \"Ten more times. Then it's yours\" suggest he believes",
  ["practice will turn one success into a skill", "the narrator got lucky and will fail next time", "the narrator should stop for the day", "the parking space belongs to the family"],
  "Dad wants the narrator to repeat the method until it is reliable, so \"it's yours\" means the skill, not the parking space. He is grinning, not doubting the narrator.",
  basics="inference", stim="OSSLT-P19")

P("OSSLT-P20", "Second Place",
"""I lost the election for student council president by forty-one votes.

I found out the way everyone did, on the screen in the front hall at the end of the day. My name was second, under Marcus Lee's. People I barely knew patted my shoulder on their way to the buses, and I smiled and said, "It's fine," about thirty times. It was not fine.

I had worked on that campaign for three weeks. I made posters, gave a speech in the gym and promised two things: a quiet study room open at lunch and a better system for the lost and found, which was really just a cardboard box outside the office that smelled like old gym socks.

That night I didn't want dinner. My older sister, Noor, came into my room without knocking and sat on the end of my bed. "So," she said, "do you still want a study room?"

"I'm not president. It doesn't matter."

"That's not what I asked."

I didn't answer for a while. Then I said, "Yes. Obviously."

"Then go ask Marcus if you can work on it," she said. "He needs people. You know what you want to build. Losing doesn't change that."

The next morning, I waited outside Marcus's locker. I almost walked away twice. When he showed up, I said congratulations and asked if the council needed someone to work on a study room. He looked surprised, and then relieved. "Honestly," he said, "I was going to ask you. Your speech was better than mine."

By March, room 114 had six tables, a sign I painted myself and a rule about whispering that nobody followed but everyone liked. The lost and found was still a cardboard box, but now there were two of them, labelled.

At the end of the year, the council gave out certificates. Mine said "Study Room Coordinator." It isn't the title I ran for. It's the one I'm proudest of.""")

M(NAR, 0, EXP, 1, "What two things did the narrator promise during the campaign? Choose two.",
  ["A quiet study room open at lunch", "A better system for the lost and found"],
  ["Longer lunch breaks", "New lockers for every student", "A school dance in March"],
  "The narrator promised a quiet study room open at lunch and a better lost-and-found system. March is when the study room was finished, not a dance.",
  basics="findingDetail", stim="OSSLT-P20")
S(NAR, 0, INF, 1, "When the narrator says \"It's fine\" about thirty times, the reader can tell the narrator",
  ["is hiding disappointment", "is glad the election is over", "does not care about the result", "is angry at the other students"],
  "The next sentence, \"It was not fine,\" shows the narrator was covering up how much losing hurt. The narrator smiles at the others rather than showing anger.",
  basics="inference", stim="OSSLT-P20")
S(NAR, 0, INF, 2, "When Noor says \"That's not what I asked,\" what is she pointing out?",
  ["Wanting the study room is separate from winning.", "The narrator did not hear her question.", "She wants the study room for herself.", "The narrator should run again next year."],
  "Noor asked whether the narrator still wants the study room, and the narrator answered about not being president. Noor separates the goal from the title.",
  basics="inference", stim="OSSLT-P20")
S(NAR, 0, INF, 2, "Why does Marcus look \"surprised, and then relieved\"?",
  ["He did not expect the offer but was glad of the help.", "He thought the narrator wanted the votes recounted.", "He had forgotten that the election had happened.", "He wanted to cancel the study room idea."],
  "Marcus admits he was going to ask the narrator for help, so the offer surprised him and then took a weight off. Nothing suggests a recount or cancelling the room.",
  basics="inference", stim="OSSLT-P20")
S(NAR, 0, WORD, 2, "The whispering rule was one \"nobody followed but everyone liked.\" This detail suggests the study room",
  ["became a friendly place students enjoyed", "was too noisy to be useful for studying", "was closed because of all the noise", "had strict rules that students feared"],
  "The light, joking tone shows students were fond of the room and its rule even when they broke it. The room stayed open through the year.",
  basics="toneWords", stim="OSSLT-P20")
S(NAR, 0, CON, 2, "Which sentence best states the theme of the story?",
  ["Losing a title doesn't stop you from making a difference.", "Student council elections are usually unfair.", "Older siblings should stay out of school matters.", "The best speech always wins the election."],
  "The narrator loses but builds the study room anyway and is proudest of that title. Marcus says the narrator's speech was better, yet Marcus won, so the best speech did not win.",
  basics="mainIdea", stim="OSSLT-P20")
