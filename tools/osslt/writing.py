# OSSLT writing selected-response items, the three EQAO writing skills:
# developing a main idea with supporting details (ossltIdeas), organizing
# information and ideas (ossltOrganize) and using conventions
# (ossltConventions). Per practice test: 4 + 3 + 5 = 12, as on the real test.
# EQAO does not publish the split among the three skills; this one is ours.
# Exec'd by tools/osslt/build.py (S, M, O, C, H). Key first; build.py rotates.

IDEAS, ORG, CONV = "ossltIdeas", "ossltOrganize", "ossltConventions"
OPEN = "(Opening sentence goes here.)"
CLOSE = "(Concluding sentence goes here.)"
NUM = ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"]
AFTER = ["After sentence 1", "After sentence 2", "After sentence 3", "After sentence 4"]
SPELL = "Select the word that is spelled incorrectly."

# ---------------------------------------------------------------- Test 1

S(IDEAS, 1, "Topic sentence", 2, "Read the paragraph. Which sentence would make the best opening sentence?",
  ["The Northside food bank relies on help from the whole community.", "Many families across Canada use food banks every month.", "Students from two high schools run a food drive in December.", "Grocery stores throw away far too much food every week."],
  "An opening sentence should cover everything the paragraph goes on to say: volunteers, grocery stores and students all helping one food bank. The student food drive is only one of the details.",
  basics="topicSentences",
  passage=OPEN + " Volunteers sort donations every Saturday morning. Local grocery stores give food that is close to its best-before date. Students from two high schools run a canned food drive each December.")
H(IDEAS, 1, "Sentence that does not belong", 1, "Select the sentence that does not belong in this paragraph.", [3],
  "The paragraph is about the benefits of learning a second language. A cousin's move to Montreal is a personal fact that does not support that point.",
  basics="deletingSentence",
  passage="{{Learning a second language has real benefits for teenagers.}} {{It can open up more job opportunities, especially in a bilingual country like Canada.}} {{It also gives students a way to connect with people from other cultures.}} {{My cousin moved to Montreal last year.}} {{Finally, it makes travel easier and more rewarding.}}")
S(IDEAS, 1, "Supporting detail", 2, "A student is writing that high schools should start later in the morning. Which sentence would best support this opinion?",
  ["Many teens are too tired to focus at 8 a.m.", "Some schools start at 8:00 and others at 9:00.", "Many students like eating breakfast at school.", "Later starts would push sports practices later."],
  "Tired students who cannot focus give a reason to start later. The start-time fact is neutral, and later practices is an argument against the opinion.",
  basics="addingSentence")
S(IDEAS, 1, "Addressing the other side", 3, "A student is writing that every school should have a community garden. Which sentence best admits a view on the other side?",
  ["Some worry no one will care for the garden in summer.", "A garden shows students where their food comes from.", "Our school could plant tomatoes, beans and herbs.", "Gardens are a great way to spend time outdoors."],
  "Only the worry about summer care is a point someone who disagrees might make. The other sentences support the garden or describe it.",
  basics="keepOnGoal")

O(ORG, 1, "Logical order", 1, "Put the sentences in the best order to make a paragraph.",
  ["Last spring, our school started a bike repair club.", "At first, only four students came to the meetings.", "Then the club fixed a teacher's bike in one lunch hour, and word spread.", "Now more than twenty students show up every Tuesday."],
  "The time words show the order: last spring the club started, at first few came, then word spread, and now many come.",
  basics="transitions")
C(ORG, 1, "Transition words", 1, "Choose the word or phrase that best connects the two sentences.\n\nThe forecast called for sunshine all weekend. [[1]], it rained from Saturday morning until Sunday night.",
  [["However", "As a result", "For example", "Similarly"]],
  "The second sentence contrasts with what the forecast said, so a contrast word like However fits. As a result would mean the forecast caused the rain.",
  basics="transitions")
S(ORG, 1, "Concluding sentence", 2, "Read the paragraph. Which sentence would best conclude it?",
  ["I learned that trust is earned slowly, one visit at a time.", "Dogs and cats are the most common animals in shelters.", "The shelter is open to visitors seven days a week.", "Next, I will explain how the shelter raises money."],
  "A conclusion should tie the details back to the main idea, that volunteering taught patience. The others add new topics or start a new section.",
  basics="keepOnGoal",
  passage="Volunteering at the animal shelter taught me patience. Some dogs took weeks to trust me. Some cats hid every time I walked in. Slowly, though, they began to come closer. " + CLOSE)

S(CONV, 1, "Run-on sentences", 1, "Which sentence is written correctly?",
  ["The bus was late, so we missed first period.", "The bus was late, we missed first period.", "The bus was late we missed first period.", "The bus was late, and, we missed first period."],
  "Two complete thoughts need a comma plus a joining word such as so. A comma alone makes a comma splice, and no punctuation makes a run-on.",
  basics="commaSplices")
C(CONV, 1, "Apostrophes", 2, "Choose the correct word for the blank.\n\nBoth [[1]] lockers were left open after practice.",
  [["players'", "player's", "players", "players's"]],
  "Both means more than one player, so the plural possessive is players' (apostrophe after the s). Player's would mean one player.",
  basics="apostrophes")
H(CONV, 1, "Spelling", 1, SPELL + "\n\nThe {{principal}} {{finally}} {{recieved}} the {{forms}} on {{Wednesday}}.", [2],
  "Received follows the rule \"i before e, except after c\": r-e-c-e-i-v-e-d. Principal is correct for the head of a school.")
C(CONV, 1, "Subject-verb agreement", 2, "Choose the correct word for the blank.\n\nEach of the students [[1]] a locker on the second floor.",
  [["has", "have", "are given", "were giving"]],
  "The subject is Each, which is singular, so the verb is has. Students is part of the phrase \"of the students\" and does not control the verb.",
  basics="subjectVerb")
C(CONV, 1, "Its or it's", 1, "Choose the correct word for each blank.\n\n[[1]] going to be cold tonight, so bring [[2]] warmest jacket.",
  [["It's", "Its", "Its'"], ["your", "you're", "youre"]],
  "It's means \"it is\": it is going to be cold. Your shows ownership of the jacket; you're means \"you are.\"",
  basics="itsIts")

# ---------------------------------------------------------------- Test 2 (held out of the drills)

S(IDEAS, 2, "Topic sentence", 1, "Read the paragraph. Which sentence would make the best opening sentence?",
  ["Cycling is a smart way to get around.", "Bikes are much cheaper to own than cars.", "Many cities have built new bike lanes.", "Some people keep cycling all winter."],
  "The paragraph gives three reasons cycling is a good choice: cost, exercise and no exhaust. The cost sentence is only one of those reasons.",
  basics="topicSentences",
  passage=OPEN + " A bike costs far less to own than a car. Riding to school or work also builds exercise into the day. And unlike cars, bikes produce no exhaust.")
S(IDEAS, 2, "Sentence that does not belong", 1, "Read the paragraph. Which sentence should be removed because it does not support the main idea?",
  NUM, "The paragraph is about how the reading buddies program works and why it helps. Where the Grade 2 classroom is located does not support that idea.",
  basics="deletingSentence", key=2, locked=True,
  passage="(1) Our school's reading buddies program pairs Grade 10 students with children in Grade 2. (2) Once a week, the older students read picture books aloud and help the younger ones sound out words. (3) The Grade 2 classroom is on the first floor near the gym. (4) Teachers say the younger children now look forward to reading time.")
S(IDEAS, 2, "Supporting detail", 1, "Which detail would best support the idea that the town's new splash pad has been popular?",
  ["More than 400 people used it on its first weekend.", "The town spent almost a year planning the splash pad.", "Splash pads use less water than swimming pools.", "The splash pad is right next to the public library."],
  "Popularity means many people using it, and 400 visitors in one weekend shows that. The other details are about planning, water or location.",
  basics="addingSentence")
S(IDEAS, 2, "Stating an opinion", 2, "Which sentence states the writer's opinion most clearly?",
  ["Our town should build a skatepark beside the arena.", "Some teens in our town like to ride skateboards.", "A skatepark is a place where people can skate.", "There may or may not be room for a skatepark."],
  "An opinion takes a clear position that someone could disagree with, and \"should build\" does that. The others are facts, a definition or a sentence that avoids a position.",
  basics="topicSentences")

O(ORG, 2, "Logical order", 1, "Put the sentences in the best order for a paragraph of instructions.",
  ["First, check the forecast and the trail conditions.", "Next, dress in layers so you can adjust as you warm up.", "Then, once you are dressed, pack water, a snack and a charged phone.", "Finally, tell someone where you are going and when you will be back."],
  "The order words First, Next, Then and Finally show the sequence, and \"once you are dressed\" puts packing after dressing in layers.",
  basics="transitions")
C(ORG, 2, "Transition words", 2, "Choose the word that best connects the two sentences.\n\nOur team lost the first three games of the season. [[1]], we never gave up and went on to win the championship.",
  [["Nevertheless", "For instance", "Similarly", "In addition"]],
  "Winning the championship goes against what the losses would lead you to expect, so a contrast word like Nevertheless fits. Similarly and In addition would treat the two ideas as alike.",
  basics="transitions")
S(ORG, 2, "Placing a sentence", 2, "Read the paragraph. Where should this sentence be added?\n\n\"Turn the pile every week or two so that air can reach it.\"",
  AFTER, "Turning the pile is a step that happens after the scraps and leaves are added and before the compost is ready months later, so it belongs after sentence 3.",
  basics="transitions", key=2, locked=True,
  passage="(1) Composting turns food scraps into rich soil. (2) Start by choosing a bin with a lid. (3) Add a mix of green scraps, such as vegetable peels, and brown materials, such as dry leaves. (4) In a few months, the bottom of the bin will be full of dark, crumbly compost.")

S(CONV, 2, "Pronouns", 2, "Which sentence is written correctly?",
  ["Ms. Dubois asked Jamal and me to hand out programs.", "Ms. Dubois asked Jamal and I to hand out programs.", "Ms. Dubois asked Jamal and myself to hand out programs.", "Ms. Dubois asked I and Jamal to hand out programs."],
  "Jamal and the writer receive the action (asked), so the pronoun is me. Test it by removing Jamal: \"asked me,\" not \"asked I.\"",
  basics="pronounCase")
C(CONV, 2, "Verb tense", 1, "Choose the correct word for each blank.\n\nYesterday, our class [[1]] to the museum and [[2]] a fossil exhibit.",
  [["went", "goes", "will go"], ["saw", "sees", "seen"]],
  "Yesterday means the past tense: went and saw. Seen needs a helper such as \"have.\"",
  basics="verbTense")
S(CONV, 2, "Commas", 2, "Which sentence uses commas correctly?",
  ["After the game ended, the fans waited for the players.", "After the game ended the fans, waited for the players.", "After the game, ended the fans waited for the players.", "After the game ended, the fans, waited for the players."],
  "The comma goes after the opening clause \"After the game ended.\" No comma belongs between a subject (the fans) and its verb (waited).",
  basics="listIntroCommas")
C(CONV, 2, "Commonly confused words", 2, "Choose the correct word for each blank.\n\nThe cold weather didn't [[1]] the race, but the wind had a big [[2]] on our times.",
  [["affect", "effect"], ["effect", "affect"]],
  "Affect is usually the action (the weather did not affect the race). Effect is usually the result, a thing the wind had.",
  basics="commonlyConfused")
H(CONV, 2, "Spelling", 1, SPELL + "\n\n{{Tomorrow}} the {{government}} will {{announce}} a {{seperate}} {{program}} for {{students}}.", [3],
  "Separate is spelled s-e-p-a-r-a-t-e; a memory trick is \"there is a rat in separate.\"")

# ---------------------------------------------------------------- Drill only (test 0): main idea and supporting details

S(IDEAS, 0, "Topic sentence", 2, "Read the paragraph. Which sentence would make the best opening sentence?",
  ["Owning a pet takes more work than many people expect.", "Dogs are the most popular pets in many Canadian homes.", "Vet visits and pet supplies can be very expensive.", "Walking a dog in January can be a very cold job."],
  "The paragraph lists daily care, walks in all weather and costs, which together show how much work a pet is. The other choices match only one detail.",
  basics="topicSentences",
  passage=OPEN + " A pet needs food, water and a clean place to sleep every day. Dogs also need walks in every kind of weather, including January. Vet visits and supplies can cost hundreds of dollars a year.")
S(IDEAS, 0, "Topic sentence", 1, "Read the paragraph. Which sentence would make the best opening sentence?",
  ["A part-time job can teach teens useful skills.", "Teens should save all of the money they earn.", "Many employers hire teens in the summer.", "Some teens work in stores and restaurants."],
  "Each detail is a skill or benefit a job gives: managing time, budgeting and building references. The other sentences do not cover those details.",
  basics="topicSentences",
  passage=OPEN + " A job teaches teens how to manage their time between school and work. It also gives them their own money and a chance to learn how to budget. Many teens meet new people and build references for future jobs.")
H(IDEAS, 0, "Sentence that does not belong", 1, "Select the sentence that does not belong in this paragraph.", [3],
  "The paragraph is about what national parks do. A favourite hiking snack is a personal detail that does not support that idea.",
  basics="deletingSentence",
  passage="{{Canada's national parks protect some of the country's most important natural areas.}} {{They give wildlife space to live away from roads and buildings.}} {{They also let visitors hike, camp and paddle in wild places.}} {{My favourite snack on a hike is trail mix.}} {{Park staff study and care for these areas all year.}}")
S(IDEAS, 0, "Sentence that does not belong", 1, "Read the paragraph. Which sentence does not support the main idea?",
  NUM, "The paragraph is about reusable bottles cutting waste. A preference for sparkling water has nothing to do with waste.",
  basics="deletingSentence", key=3, locked=True,
  passage="(1) Bringing a reusable water bottle to school is an easy way to cut waste. (2) A single bottle can replace hundreds of plastic ones each year. (3) Most schools have fountains or filling stations. (4) Some people prefer sparkling water to plain water.")
S(IDEAS, 0, "Supporting detail", 1, "A student argues that teens should learn to cook before they finish high school. Which sentence best supports this opinion?",
  ["Cooking at home costs much less than eating out.", "Many restaurants hire teens to wash dishes.", "Some families eat dinner together every night.", "Cooking shows are popular with teenagers."],
  "Saving money is a reason the skill is worth learning. The other sentences are true of some people but give no reason teens should learn to cook.",
  basics="addingSentence")
S(IDEAS, 0, "Supporting detail", 2, "Which detail best supports the claim that the school's new recycling program is working?",
  ["The school now sends half as much garbage to the landfill.", "The new bins are blue, green and grey and have labels.", "Students voted on where the new bins should be placed.", "Recycling programs began in Canada decades ago."],
  "Evidence that a program works is a result, and cutting garbage in half is a result. The colours, the vote and the history describe the program but not its success.",
  basics="addingSentence")
S(IDEAS, 0, "Concluding an essay", 2, "A writer wants to end an opinion essay by restating the main opinion. Which sentence does this best?",
  ["For all these reasons, our library should stay open at lunch.", "Some students would rather eat lunch with friends in the cafeteria.", "Another reason is that the library has computers students can use.", "The library was built when the school first opened its doors in 1972."],
  "\"For all these reasons\" signals a conclusion, and the sentence restates the opinion. \"Another reason\" introduces a new point instead of ending.",
  basics="keepOnGoal")
S(IDEAS, 0, "Supporting example", 2, "Which sentence gives an example to support the idea that small acts of kindness matter?",
  ["When a classmate shared notes after I was sick, I caught up in a day.", "Kindness is something that every community needs in order to thrive.", "Some people seem to find it easier to be kind than others do.", "Being kind usually takes less effort than being mean to someone."],
  "An example is a specific case, and the shared notes are a real act of kindness with a clear result. The other sentences are general statements.",
  basics="keepOnGoal")
S(IDEAS, 0, "Addressing the other side", 3, "A student argues that winter break should be longer. Which sentence best answers someone who disagrees?",
  ["A later end in June is worth it if students come back rested.", "Winter break is the best part of the whole school year.", "Many families like to travel during the winter break.", "Some schools also give students a week off in March."],
  "Answering the other side means naming its concern (a later end to the year) and responding to it. The other sentences ignore what an opponent would say.",
  basics="keepOnGoal")
S(IDEAS, 0, "Stating an opinion", 1, "Which sentence would make the best main opinion (thesis) for an opinion essay?",
  ["Every Grade 9 student should take a first aid course.", "First aid courses are offered by many groups.", "I took a first aid course last summer.", "What is first aid, and who teaches it?"],
  "A thesis states a clear opinion the essay can support. The others are a fact, a personal detail and a question.",
  basics="topicSentences")
S(IDEAS, 0, "Supporting detail", 1, "A student's paragraph says that walking to school is good for students. Which sentence would be the best addition?",
  ["A twenty-minute walk gives students exercise before class.", "Some students live too far away to walk to school.", "My little brother takes the bus to his school.", "School buses are yellow so drivers can see them."],
  "Exercise is a benefit of walking, which supports the paragraph. Living too far away is a point against it, and the last two are off topic.",
  basics="addingSentence")
S(IDEAS, 0, "Sentence that does not belong", 1, "Read the paragraph. Which sentence should be removed?",
  NUM, "The paragraph explains why swimming is an important safety skill. A favourite pool's water slide is off topic.",
  basics="deletingSentence", key=1, locked=True,
  passage="(1) Learning to swim is an important safety skill. (2) My favourite pool has a twisty water slide. (3) Canada has thousands of lakes and rivers, and many families spend summers near water. (4) Knowing how to swim can stop a dangerous situation from becoming deadly.")
S(IDEAS, 0, "Title", 2, "Which title best fits a report about how beavers build dams and change the land around them?",
  ["Beavers: Builders That Change the Land", "Why You Will Find a Beaver on the Nickel", "How to Keep Beavers Away from Your Trees", "Where Beavers Go When Winter Comes"],
  "The report covers dam building and its effect on the land, and only the first title names both. The others are about money, protecting trees or winter.",
  basics="topicSentences")
M(IDEAS, 0, "Supporting detail", 2, "A student is writing that the town should keep its free outdoor rink open longer each night. Which TWO sentences best support this opinion? Choose two.",
  ["The rink is busy every evening right up until it closes.", "Families who cannot afford arena fees use the free rink."],
  ["Outdoor rinks need cold weather to stay frozen.", "The arena downtown has a snack bar.", "Some people prefer swimming to skating."],
  "A rink that is still busy at closing time and families who depend on it are both reasons to stay open longer. The others do not give a reason for longer hours.",
  basics="addingSentence")
H(IDEAS, 0, "Sentence that does not belong", 1, "Select the sentence that does not belong in this paragraph.", [2],
  "The paragraph is about what the class learned at the science centre. The bus driver's name has nothing to do with that.",
  basics="deletingSentence",
  passage="{{Our class trip to the science centre taught us a lot.}} {{We tried experiments with electricity and magnets.}} {{The bus driver's name was Mr. Kowalski.}} {{A guide showed us how engineers test bridges.}} {{By the end, many of us wanted to learn more about engineering.}}")
S(IDEAS, 0, "Supporting reason", 2, "A student writes: \"Our school should offer a cooking class.\" Which sentence best explains why?",
  ["Many students will soon live on their own and need to feed themselves.", "Cooking classes are already taught in some high schools in Ontario.", "A cooking class would make use of the kitchen near the cafeteria.", "I really like to cook pasta with my older brother on weekends."],
  "A reason explains why the class matters, and needing to feed yourself soon does that. The others describe classes, rooms or the writer's hobby.",
  basics="addingSentence")
S(IDEAS, 0, "Main idea", 2, "Read the paragraph. Which sentence best states its main idea?",
  ["Buying food from nearby farms helps both students and farmers.", "Apples are the most popular food in the school cafeteria.", "Trucks carry food long distances across the country.", "Farmers need more customers to stay in business."],
  "The paragraph gives benefits for students (fresher food that tastes better) and for farmers (steady sales). The apple detail is one example, not the main idea.",
  basics="topicSentences",
  passage="Our school cafeteria now buys apples, potatoes and carrots from farms less than 100 kilometres away. The food is fresher because it spends less time on trucks. Local farmers earn steady money from a buyer they can count on. And students say the apples taste better than the ones the cafeteria used to serve.")
S(IDEAS, 0, "Supporting detail", 1, "Which sentence would best support the opinion that public libraries are still important?",
  ["Many people use library computers to apply for jobs.", "Libraries have existed for thousands of years.", "Some people prefer to buy books, not borrow them.", "Many libraries are open on Saturday mornings."],
  "People relying on libraries for job applications shows they still matter today. A long history or opening hours do not show present importance.",
  basics="addingSentence")

# ---------------------------------------------------------------- Drill only: organization

C(ORG, 0, "Transition words", 2, "Choose the best word or phrase for each blank.\n\nI wanted to join the cross-country team. [[1]], I started running three mornings a week. [[2]], I could run five kilometres without stopping.",
  [["So", "However", "Instead", "Otherwise"], ["By October", "For example", "On the other hand", "In contrast"]],
  "Running more was a result of wanting to join, so So fits. The last sentence tells what happened later, so a time phrase like By October fits.",
  basics="transitions")
O(ORG, 0, "Logical order", 1, "Put the sentences in the best order to make a paragraph.",
  ["When Mila first moved to Sudbury, she did not know anyone at school.", "During the first week, she joined the reading club at lunch.", "There, she met two students who also loved fantasy novels.", "By the end of the month, the three of them sat together every day."],
  "The time words (when she first moved, the first week, there, by the end of the month) show the order. \"There\" must come right after the club is named.",
  basics="transitions")
S(ORG, 0, "Concluding sentence", 2, "Read the paragraph. Which sentence would best conclude it?",
  ["When a device dies, take it to a depot.", "Laptops usually cost much more than phones do.", "Some phones keep working for many years.", "People have mined metals for thousands of years."],
  "The paragraph argues that old electronics do not belong in the garbage, so the best ending tells the reader what to do instead. The others drift to new topics.",
  basics="keepOnGoal",
  passage="Old phones and laptops should never go in the garbage. They contain metals that can leak into soil and water. Many of those metals can also be recovered and used again. Most towns have drop-off depots for electronics. " + CLOSE)
S(ORG, 0, "Placing a sentence", 2, "Read the paragraph. Where should this sentence be added?\n\n\"The winning sculpture was a three-metre-tall moose.\"",
  AFTER, "The sentence is about the snow sculptures, so it belongs right after sentence 2, which describes building them.",
  basics="transitions", key=1, locked=True,
  passage="(1) Our school held its first winter carnival last week. (2) In the morning, students built snow sculptures on the field. (3) After lunch, teams competed in a tug-of-war on the ice. (4) The day ended with hot chocolate in the gym.")
C(ORG, 0, "Transition words", 1, "Choose the best word or phrase for the blank.\n\nSnowshoes spread your weight over a larger area. [[1]], you sink less into deep snow.",
  [["As a result", "However", "For example", "Meanwhile"]],
  "Sinking less is the effect of spreading your weight, so As a result fits. However would signal a contrast that is not there.",
  basics="transitions")
C(ORG, 0, "Transition words", 1, "Choose the best word or phrase for the blank.\n\nSome plants need full sun. [[1]], ferns grow best in the shade.",
  [["In contrast", "As a result", "For example", "In addition"]],
  "Ferns are the opposite case, so a contrast phrase fits. For example would wrongly make ferns an example of sun-loving plants.",
  basics="transitions")
C(ORG, 0, "Transition words", 1, "Choose the best word or phrase for the blank.\n\nThere are many ways to save energy at home. [[1]], you can turn off the lights when you leave a room.",
  [["For example", "However", "Instead", "In contrast"]],
  "Turning off lights is one of the many ways, so For example introduces it. However, Instead and In contrast all signal a contrast.",
  basics="transitions")
O(ORG, 0, "Logical order", 1, "Put the steps in the best order for instructions on making a jar terrarium.",
  ["First, rinse the jar and remove the label.", "Next, fill it with soil and a few small plants.", "Then water the plants lightly.", "Finally, put the lid on and set the jar near a window."],
  "First, Next, Then and Finally give the order, and it makes sense too: clean the jar, plant, water, then close it.",
  basics="transitions")
S(ORG, 0, "Transition sentence", 2, "An essay's first body paragraph is about the benefits of school uniforms. Which sentence would best begin a new paragraph about their drawbacks?",
  ["However, uniforms also have some downsides.", "Uniforms save families time every morning.", "Many schools in Ontario have uniforms.", "In conclusion, uniforms are a good idea."],
  "However signals the turn from benefits to drawbacks and names the new topic. Saving time is another benefit, and \"In conclusion\" ends the essay.",
  basics="transitions")
S(ORG, 0, "Placing a sentence", 2, "Read the paragraph. Where should this sentence be added?\n\n\"Even our dog would not eat it.\"",
  AFTER, "The sentence is about the ruined loaf, so it belongs right after sentence 3, which describes the loaf coming out flat and hard.",
  basics="transitions", key=2, locked=True,
  passage="(1) My first try at baking bread was a disaster. (2) I forgot the yeast, so the dough never rose. (3) The loaf came out flat and hard as a brick. (4) The next weekend, I tried again and followed every step.")
S(ORG, 0, "Introduction", 2, "Which sentence would make the best first sentence of an essay arguing that teenagers should learn first aid?",
  ["Anyone could be the first person to reach an emergency.", "First aid kits come in many sizes and colours.", "In conclusion, first aid is a skill that saves lives.", "Next, this essay will discuss how to do CPR."],
  "A good opening hooks the reader and leads toward the opinion. \"In conclusion\" and \"Next\" belong later in an essay, and kit sizes are off topic.",
  basics="keepOnGoal")
O(ORG, 0, "Logical order", 2, "Put the sentences in the best order to make a paragraph.",
  ["Every spring, Canada geese fly north to nest.", "Along the way, they stop at lakes and fields to rest and eat.", "When they reach their nesting grounds, each pair builds a nest near water.", "A few weeks later, fuzzy goslings hatch."],
  "The paragraph follows the geese in time: they leave, stop along the way, arrive and nest, then the goslings hatch.",
  basics="transitions")
C(ORG, 0, "Transition words", 2, "Choose the best word or phrase for each blank.\n\nBiking to school is good exercise. [[1]], it saves money on bus fare. [[2]], some students worry about riding in winter.",
  [["In addition", "However", "For instance", "As a result"], ["However", "Therefore", "Similarly", "For example"]],
  "Saving money is a second benefit, so In addition fits. Worrying about winter is a drawback, so However signals the contrast.",
  basics="transitions")
S(ORG, 0, "Improving organization", 2, "Which change would best improve the organization of this paragraph?",
  ["Move sentence 1 to the end.", "Move sentence 3 to the start.", "Remove sentence 2.", "Join sentences 2 and 3."],
  "Sentence 1 begins with Finally, so it should come last, after First and Next. Then the trip is told in order.",
  basics="transitions",
  passage="(1) Finally, we put up our tent beside the lake. (2) First, we packed the canoe. (3) Next, we paddled across the bay.")

# ---------------------------------------------------------------- Drill only: conventions

S(CONV, 0, "Run-on sentences", 2, "Which sentence is punctuated correctly?",
  ["I studied for hours; the test was still hard.", "I studied for hours, the test was still hard.", "I studied for hours the test was still hard.", "I studied for hours; and the test was still hard."],
  "A semicolon can join two complete thoughts on its own. A comma alone makes a comma splice, and a semicolon is not followed by and.",
  basics="commaSplices")
S(CONV, 0, "Run-on sentences", 1, "Which is the best way to fix this sentence?\n\nThe rink was closed, we went sledding instead.",
  ["The rink was closed, so we went sledding instead.", "The rink was closed we went sledding instead.", "The rink, was closed, we went sledding instead.", "The rink was closed, we, went sledding instead."],
  "Adding so after the comma joins the two complete thoughts correctly. Removing the comma makes a run-on, and the extra commas leave the splice in place.",
  basics="commaSplices")
S(CONV, 0, "Run-on sentences", 1, "Which sentence is a run-on?",
  ["My phone died I couldn't call home.", "My phone died, so I couldn't call home.", "My phone died. I couldn't call home.", "Because my phone died, I couldn't call home."],
  "\"My phone died\" and \"I couldn't call home\" are two complete thoughts with nothing joining them. The other sentences use so, a period or because.",
  basics="commaSplices")
C(CONV, 0, "Subject-verb agreement", 1, "Choose the correct word for the blank.\n\nThe box of old photographs [[1]] in the basement.",
  [["is", "are", "were"]],
  "The subject is box (one box), so the verb is is. Photographs is part of the phrase \"of old photographs.\"",
  basics="subjectVerb")
C(CONV, 0, "Subject-verb agreement", 1, "Choose the correct word for the blank.\n\nThe players on the senior team [[1]] every morning before school.",
  [["train", "trains", "is training"]],
  "The subject is players, which is plural, so the verb is train. Team is part of the phrase \"on the senior team.\"",
  basics="subjectVerb")
S(CONV, 0, "Subject-verb agreement", 1, "Which sentence is written correctly?",
  ["My aunt and uncle live in Thunder Bay.", "My aunt and uncle lives in Thunder Bay.", "My aunt and uncle is living in Thunder Bay.", "My aunt and uncle has lived in Thunder Bay."],
  "Two subjects joined by and are plural, so the verb is live (or have lived, are living).",
  basics="subjectVerb")
S(CONV, 0, "Apostrophes", 2, "Which sentence uses apostrophes correctly?",
  ["My sister's bike is in the garage.", "My sisters bike is in the garage.", "My sister's bike's are in the garage.", "My sisters' bike's are in the garage."],
  "The bike belongs to the sister, so sister's needs an apostrophe. A plain plural such as bikes never takes one.",
  basics="apostrophes")
C(CONV, 0, "Apostrophes", 1, "Choose the correct word for the blank.\n\n[[1]] science project won first prize at the fair.",
  [["Jessica's", "Jessicas", "Jessicas'", "Jessica'"]],
  "The project belongs to Jessica, so add an apostrophe and s: Jessica's.",
  basics="apostrophes")
S(CONV, 0, "Apostrophes", 1, "Which sentence uses an apostrophe correctly?",
  ["We can't leave until the rain stops.", "We cant' leave until the rain stops.", "We ca'nt leave until the rain stops.", "We can't leave until the rain stop's."],
  "In a contraction the apostrophe replaces the missing letters: can't is \"cannot.\" Stops is a verb, so it takes no apostrophe.",
  basics="apostrophes")
C(CONV, 0, "Its or it's", 1, "Choose the correct word for each blank.\n\nThe school changed [[1]] bus schedule, and now [[2]] easier to get home.",
  [["its", "it's"], ["it's", "its"]],
  "Its shows ownership (the school's schedule). It's means \"it is\": now it is easier.",
  basics="itsIts")
S(CONV, 0, "Its or it's", 2, "Which sentence is written correctly?",
  ["It's rained all week, and the creek has overflowed its banks.", "Its rained all week, and the creek has overflowed it's banks.", "It's rained all week, and the creek has overflowed it's banks.", "Its rained all week, and the creek has overflowed its banks."],
  "It's is short for \"it has\" here (it has rained). Its shows that the banks belong to the creek.",
  basics="itsIts")
C(CONV, 0, "Commonly confused words", 2, "Choose the correct word for each blank.\n\n[[1]] going to leave [[2]] bikes over [[3]] by the fence.",
  [["They're", "Their", "There"], ["their", "there", "they're"], ["there", "their", "they're"]],
  "They're means \"they are,\" their shows the bikes belong to them, and there points to a place.",
  basics="commonlyConfused")
C(CONV, 0, "Commonly confused words", 1, "Choose the correct word for each blank.\n\nMy brother is taller [[1]] me, but I can run faster [[2]] he can.",
  [["than", "then"], ["than", "then"]],
  "Both blanks compare two people, so both take than. Then is about time.",
  basics="commonlyConfused")
C(CONV, 0, "Commonly confused words", 2, "Choose the correct word for each blank.\n\nWe had [[1]] snow days this year [[2]] last year.",
  [["fewer", "less"], ["than", "then"]],
  "Snow days can be counted, so fewer is correct; less is for amounts. Than makes the comparison.",
  basics="commonlyConfused")
S(CONV, 0, "Commonly confused words", 2, "Which sentence uses accept or except correctly?",
  ["Everyone except Lena finished early.", "Everyone accept Lena finished early.", "I will except your kind invitation.", "Please except my apology for being late."],
  "Except means \"leaving out,\" so everyone except Lena is right. To accept is to receive, which the last two sentences need.",
  basics="commonlyConfused")
C(CONV, 0, "Pronouns", 1, "Choose the correct word for the blank.\n\nThe coach gave the trophy to Ravi and [[1]].",
  [["me", "I", "myself"]],
  "After to, use me. Test it by removing Ravi: \"gave the trophy to me,\" not \"to I.\"",
  basics="pronounCase")
S(CONV, 0, "Pronouns", 1, "Which sentence is written correctly?",
  ["She and I are working on the project.", "Her and me are working on the project.", "Me and her are working on the project.", "Her and I are working on the project."],
  "The pronouns are doing the action, so use she and I. Test each alone: \"she is working,\" \"I am working.\"",
  basics="pronounCase")
C(CONV, 0, "Pronouns", 3, "Choose the correct word for the blank.\n\nTo [[1]] should I give the permission form?",
  [["whom", "who's", "whose"]],
  "After the preposition to, use whom. Who's means \"who is,\" and whose shows ownership.",
  basics="pronounCase")
S(CONV, 0, "Verb tense", 1, "Which sentence keeps the verb tense consistent?",
  ["We reached the lake, set up the tent and went for a swim.", "We reached the lake, set up the tent and go for a swim.", "We reach the lake, set up the tent and went for a swim.", "We reached the lake, sets up the tent and went for a swim."],
  "All three actions happened in the past, so every verb is past tense: reached, set up, went.",
  basics="verbTense")
C(CONV, 0, "Verb tense", 2, "Choose the correct word for the blank.\n\nBy the time we got to the theatre, the movie [[1]] already started.",
  [["had", "has", "have"]],
  "The movie started before another past event (we got there), so use had started.",
  basics="verbTense")
S(CONV, 0, "Verb tense", 1, "Which sentence is written correctly?",
  ["I have seen that movie twice.", "I have saw that movie twice.", "I seen that movie twice.", "I have seed that movie twice."],
  "With have, use the form seen. Saw stands alone (\"I saw it\"), and seen always needs a helper such as have.",
  basics="verbTense")
S(CONV, 0, "Commas", 1, "Which sentence uses commas correctly?",
  ["When the bell rang, the students grabbed their coats.", "When the bell rang the students, grabbed their coats.", "When, the bell rang, the students grabbed their coats.", "When the bell, rang the students grabbed their coats."],
  "Put the comma after the whole opening clause, \"When the bell rang.\" The other commas split a subject from its verb.",
  basics="listIntroCommas")
S(CONV, 0, "Commas", 2, "Which sentence is punctuated correctly?",
  ["Amara finished her homework and went to bed.", "Amara, finished her homework and went to bed.", "Amara finished, her homework and went to bed.", "Amara finished her homework and, went to bed."],
  "Amara is the subject of both verbs (finished, went), so no comma is needed. A comma never separates a subject from its verb.",
  basics="listIntroCommas")
S(CONV, 0, "Commas", 2, "Which sentence uses commas correctly?",
  ["For the trip, bring a sleeping bag, a flashlight and warm socks.", "For the trip bring, a sleeping bag a flashlight and warm socks.", "For the trip, bring a sleeping bag a flashlight, and warm socks.", "For the trip, bring, a sleeping bag, a flashlight and warm socks."],
  "A comma follows the opener \"For the trip\" and separates the items in the list. No comma goes between bring and what is brought.",
  basics="listIntroCommas")
H(CONV, 0, "Spelling", 1, SPELL + "\n\n{{Because}} of the {{weather}}, the {{tournament}} was {{definately}} {{cancelled}}.", [3],
  "Definitely is spelled d-e-f-i-n-i-t-e-l-y; it contains the word finite. Cancelled with two l's is the usual Canadian spelling.")
H(CONV, 0, "Spelling", 2, SPELL + "\n\nIt was {{embarassing}} when my {{neighbour}} saw me {{practising}} my {{speech}} in the {{backyard}}.", [0],
  "Embarrassing has a double r and a double s. Neighbour and practising (the verb) are the Canadian spellings.")
S(CONV, 0, "Spelling", 2, "Which word is spelled correctly?",
  ["necessary", "neccessary", "necessery", "neccesary"],
  "Necessary has one c and a double s: n-e-c-e-s-s-a-r-y. A memory trick is \"one collar, two sleeves.\"")
S(CONV, 0, "Capital letters", 1, "Which sentence uses capital letters correctly?",
  ["In July, my family drove to Lake Superior.", "In july, my family drove to lake Superior.", "In July, my Family drove to Lake superior.", "in July, my family drove to Lake Superior."],
  "Months and the full names of places, such as Lake Superior, take capitals, as does the first word of a sentence. Family is a common noun.")
