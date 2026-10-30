# Reading (napReading). Stage per at(): test, module, variant.

# ---------- Test 1, module 1 (everyone) ----------
at(1, 1)
R = "NAP-R-01"
S("What is the main idea of this text?",
  "Batteries wear out with use, and some habits slow that wear down.",
  ["Phone makers design batteries to stop working after two years.",
   "Lithium-ion batteries are dangerous when they get too hot.",
   "Charging a phone overnight will break its battery."],
  "Paragraph 1 says the battery 'has simply aged' and that 'the way we use it decides how fast that happens'; the rest explains the wear and the habits that slow it. Nothing says batteries are designed to fail, and paragraph 4 says a few hot days 'will not ruin it'.",
  stimulusId=R, d=1, skill="Main idea", basics="mainIdea")
S("According to paragraph 2, why does a battery hold less charge over time?",
  "Some lithium gets trapped and can no longer carry charge.",
  ["The lithium ions stop moving once the battery is full.",
   "The battery leaks lithium each time it is charged.",
   "The crust on the surfaces makes the battery heavier."],
  "Paragraph 2 says lithium 'becomes trapped in a crust' and 'trapped lithium can no longer carry charge'. The crust traps lithium; the text says nothing about weight or leaking.",
  stimulusId=R, d=2, skill="Finding details")
S("Why does the writer mention a phone 'charged under a pillow overnight'?",
  "As an example of a habit that exposes a battery to heat",
  ["To warn that phones can start fires in bedrooms",
   "To show that most people charge their phones at night",
   "As an example of the 80 per cent charging setting"],
  "The sentence before it says 'Heat speeds this process up', and the pillow, like the hot dashboard, traps heat. The text does not discuss fires.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")
S("In paragraph 4, the writer says 'None of this means you should baby your battery.' What does 'baby' mean here?",
  "treat too carefully",
  ["replace often",
   "charge slowly",
   "keep switched off"],
  "To baby something is to protect it more than it needs. The next sentence, 'It is designed to be used', confirms that the writer means people should not be overly careful.",
  stimulusId=R, d=2, skill="Word meaning in context", basics="wordsInContext")
M("Which two pieces of advice does the writer give? Choose two.",
  ["Keep devices out of direct sun.", "Unplug the device when you can."],
  ["Always charge the battery to 100 per cent.",
   "Let the battery run completely flat once a month.",
   "Store the phone in a car in summer."],
  "Paragraph 4 advises keeping devices out of direct sun and unplugging when you can. It says to avoid running the battery flat, and paragraph 3 warns that charging to 100 per cent adds stress.",
  stimulusId=R, d=2, skill="Finding details")

R = "NAP-R-02"
O("Put these events in the order they happen in the story.",
  ["Mia hears the ferry's horn.",
   "Mia's water bottle rolls under a bench.",
   "The deckhand pauses with the rope in his hands.",
   "The deckhand asks Mia if it is a big day.",
   "The deckhand drops the bottle in Mia's lap."],
  "The story runs in time order: the horn, the run (when the bottle falls), the deckhand waiting with the rope, his question as she boards, and the bottle returned at the island jetty.",
  stimulusId=R, d=1, skill="Sequence of events")
S("Why does Mia's 'stomach drop' when she hears the horn?",
  "She fears she will miss the last ferry.",
  ["She is afraid of travelling on boats.",
   "She has lost her school bag.",
   "She knows her mum is angry with her."],
  "The next sentences explain it: the last boat leaves at 6.15 and the clock says 6.13. Her fear is about the time, not the boat.",
  stimulusId=R, d=1, skill="Inference", basics="inference")
S("The deckhand pauses 'the way you might hold a door for someone at the far end of a corridor'. What does this comparison suggest about him?",
  "He is being kind by waiting for her.",
  ["He is annoyed that she is running late.",
   "He does not notice her coming.",
   "He is about to close the gate on her."],
  "Holding a door for someone is a small courtesy. The comparison shows he chooses to wait, which fits his later kindness with the bottle.",
  stimulusId=R, d=2, skill="Figurative language", basics="toneWords")
S("What does the ending suggest about the deckhand?",
  "He notices small things and helps without fuss.",
  ["He wanted Mia to thank him in front of others.",
   "He took the bottle by mistake.",
   "He is a friend of Mia's mother."],
  "He saw the bottle roll, picked it up and returned it, then 'was gone before she could thank him'. He did not wait for thanks.",
  stimulusId=R, d=2, skill="Character", basics="inference")
S("Which word best describes Mia when she boards the ferry?",
  "breathless",
  ["bored",
   "angry",
   "confident"],
  "'Mia could only nod. Her chest was burning.' She has run the length of the wharf and cannot speak.",
  stimulusId=R, d=1, skill="Character")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
R = "NAP-R-03"
S("What is the writer's main purpose in this text?",
  "To persuade readers that schools should start later",
  ["To explain how the body's internal clock works",
   "To describe a school that changed its start time",
   "To argue that teenagers should use screens less"],
  "Paragraph 4 makes the case directly ('one of the few changes that costs almost nothing'), and the closing question challenges readers. The biology in paragraph 2 is evidence for that argument, not the purpose itself.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")
S("How is paragraph 3 different from the other paragraphs?",
  "It presents an opposing view before answering it.",
  ["It gives the scientific cause of the problem.",
   "It tells a personal story about the writer.",
   "It summarises the argument of the whole text."],
  "Paragraph 3 opens with 'Critics argue', concedes 'These are fair concerns', then answers with 'Yet' and the evidence from schools overseas. That is a counter-argument and rebuttal.",
  stimulusId=R, d=3, skill="Text structure", basics="textStructure")
S("In paragraph 2, the writer says 'Do the arithmetic with an alarm set for 6.30 am'. What point is the writer making?",
  "Sleeping from 11 pm to 6.30 am is not enough sleep.",
  ["Teenagers need to be better at maths before school starts.",
   "Most teenagers set their alarms too late.",
   "An alarm at 6.30 am gives exactly the recommended amount of sleep."],
  "From 11 pm to 6.30 am is seven and a half hours, less than the eight to ten hours recommended. The writer leaves readers to work this out.",
  stimulusId=R, d=3, skill="Inference", basics="inference")
S("Why does the writer mention a toddler's nap in paragraph 4?",
  "To make the school timetable seem as unwise as a badly timed nap",
  ["To show that young children also need more sleep than adults",
   "To suggest that schools should offer students an afternoon rest",
   "To prove that the body clock changes during adolescence"],
  "The writer uses the absurd image of a badly timed nap to make the current school timetable seem equally unreasonable. It is an analogy, not evidence about toddlers' sleep.",
  stimulusId=R, d=3, skill="Persuasive devices", basics="authorPurpose")
H("Which sentence from the text gives evidence from real schools? Select it.\n\n{{We tend to blame late nights and screens, and those certainly play a part.}} {{Sleep researchers generally recommend that teenagers get eight to ten hours a night.}} {{Yet schools overseas that have moved their start time by as little as 45 minutes have reported fewer late arrivals and better attendance.}} {{Nobody is suggesting that a later bell will solve every problem teenagers face.}}",
  [2],
  "Only the third sentence reports results from schools that actually changed their start time. The second is a recommendation from researchers, not evidence from schools.",
  stimulusId=R, d=2, skill="Evidence")

R = "NAP-R-04"
S("According to paragraph 2, why do cities stay hot after sunset?",
  "Roads and roofs release stored heat.",
  ["Air conditioners are switched off at night.",
   "Tall buildings block the cool evening sun.",
   "Trees release warm water vapour at night."],
  "Paragraph 2: dark roads and roofs 'release the stored heat slowly at night, so city temperatures stay high long after sunset'.",
  stimulusId=R, d=2, skill="Finding details")
S("What is the main purpose of paragraph 4?",
  "To show that the cooling methods have drawbacks to manage",
  ["To argue that cities should not plant more trees",
   "To list the causes of the urban heat island effect",
   "To explain why pale roofs do not work"],
  "Paragraph 4 opens 'The solutions are not without trade-offs' and ends that the problems are not 'a reason to do nothing'. It qualifies the solutions rather than rejecting them.",
  stimulusId=R, d=3, skill="Text structure", basics="textStructure")
S("In paragraph 4, what does 'trade-offs' mean?",
  "drawbacks that come with a benefit",
  ["costs of buying new trees",
   "agreements between neighbours",
   "reasons for changing a plan"],
  "A trade-off is something you give up to gain something else. The paragraph lists drawbacks (water use, root damage, glare) that come with each cooling method.",
  stimulusId=R, d=2, skill="Word meaning in context", basics="wordsInContext")
M("Which two statements would the writer most likely agree with? Choose two.",
  ["Choosing the right tree species matters.",
   "Shade is unevenly shared between suburbs."],
  ["Painting roofs white is the only change cities need.",
   "Heat islands affect only people who live in the city centre.",
   "Cities should wait until droughts end before planting trees."],
  "Paragraph 4 warns about 'the wrong species', and paragraph 5 says 'the hottest suburbs are often those with the least shade'. The writer rejects 'a single quick fix' and says problems are not 'a reason to do nothing'.",
  stimulusId=R, d=3, skill="Inference", basics="inference")
S("What is the tone of the final paragraph?",
  "urgent",
  ["playful",
   "doubtful",
   "neutral"],
  "Phrases such as 'the cost of doing nothing is rising', 'a serious health risk' and 'becoming a necessity' press the reader to act. The earlier paragraphs are more neutral and explanatory.",
  stimulusId=R, d=2, skill="Tone", basics="toneWords")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
R = "NAP-R-05"
S("What is the main purpose of this text?",
  "To help people plan a safe day walk",
  ["To advertise a national park",
   "To describe the writer's favourite walk",
   "To warn people never to walk alone"],
  "The headings 'Before you go', 'What to carry' and 'On the track' are all practical advice for a day walk.",
  stimulusId=R, d=1, skill="Writer's purpose", basics="authorPurpose")
S("How much water should each person carry, at the least?",
  "two litres",
  ["one litre",
   "three litres",
   "half a litre"],
  "Under 'What to carry': 'At least two litres of water per person, more in hot weather.'",
  stimulusId=R, d=1, skill="Finding details")
S("Why does the text say to choose a track that suits 'the slowest person in your group'?",
  "So that everyone can finish safely",
  ["So that the walk takes as long as possible",
   "So that fast walkers can go ahead alone",
   "So that the group always walks on flat ground"],
  "If the track suits the slowest walker, nobody is left behind or pushed beyond what they can do. Nothing in the text suggests splitting up.",
  stimulusId=R, d=1, skill="Inference", basics="inference")
S("What should you do if you lose the track?",
  "Stop and stay where you are.",
  ["Walk downhill until you find water.",
   "Take a shortcut back to the car park.",
   "Keep walking until your phone has signal."],
  "The last paragraph: 'stop, stay calm and stay where you are, because searchers find people faster when they stay put'.",
  stimulusId=R, d=1, skill="Finding details")
S("Why is the information organised under headings with dot points?",
  "So readers can find advice quickly",
  ["So the text sounds like a story",
   "So the writer can give an opinion",
   "So the most important rule comes last"],
  "Headings and dot points break advice into stages (before, carry, on the track) so a reader can scan for what they need.",
  stimulusId=R, d=2, skill="Text structure", basics="textStructure")

R = "NAP-R-06"
S("Why does Jae know the number 'forty-one out of fifty' by heart?",
  "It was his best free-throw score.",
  ["It was the number of players at the tryout.",
   "It was the score the coach wrote down.",
   "It was the number on his team shirt."],
  "The first paragraph says he practised every afternoon and 'forty-one out of fifty' was 'on his best day'.",
  stimulusId=R, d=1, skill="Finding details")
S("Why did the gym 'not feel like his driveway'?",
  "It felt strange, and he was watched.",
  ["It was smaller than his driveway.",
   "The basketball hoop was broken.",
   "His sister was not allowed inside."],
  "The bright lights, squeaking floor and the coach with a clipboard make the gym strange and stressful compared with practising at home.",
  stimulusId=R, d=1, skill="Inference", basics="inference")
S("'Jae felt his face go hot.' What does this tell you about how he felt?",
  "embarrassed",
  ["sick",
   "proud",
   "relieved"],
  "His face goes hot straight after two missed shots in front of the coach. A hot face is a common sign of embarrassment.",
  stimulusId=R, d=1, skill="Character", basics="inference")
S("What helped Jae make his shots after the first two misses?",
  "His sister's advice to breathe out",
  ["The coach telling him to slow down",
   "Moving closer to the basket",
   "Practising again on Friday"],
  "He 'remembered what his older sister had told him', breathed out, and then made five shots in a row.",
  stimulusId=R, d=1, skill="Cause and effect")
S("Why did Jae read the list 'three times before he believed it'?",
  "He was surprised that he had made the team.",
  ["He could not find his name at first.",
   "His name was spelled wrongly.",
   "He was checking which friends had made it."],
  "His name is on the list, near the bottom. Reading it again and again shows he could hardly believe he had been picked after a nervous start.",
  stimulusId=R, d=2, skill="Inference", basics="inference")

# ---------- Test 2, module 1 ----------
at(2, 1)
R = "NAP-R-07"
S("In paragraph 1, why does the writer say the reef is 'really an animal city'?",
  "Each coral is a colony of animals.",
  ["Many fish and crabs live on the reef.",
   "Reefs are found close to large cities.",
   "The reef is shaped like a city skyline."],
  "The next sentence explains it: 'Each coral is a colony of tiny animals called polyps.' The garden comparison describes how it looks; the city comparison describes what it is.",
  stimulusId=R, d=2, skill="Figurative language", basics="wordsInContext")
S("What does the coral give the algae?",
  "shelter and waste products they need",
  ["food made from sunlight",
   "colour and protection from fish",
   "cooler water in summer"],
  "Paragraph 2: 'The algae get shelter and the waste products they need.' Food made from sunlight is what the algae give the coral.",
  stimulusId=R, d=2, skill="Finding details")
S("Why does a bleached coral look white?",
  "Without the algae, its white skeleton shows through.",
  ["The heat burns the colour out of its tissue.",
   "Seaweed covers it with a white coating.",
   "The polyps produce a white substance to cool down."],
  "Paragraph 3: 'Without its algae the coral's white skeleton shows through its clear tissue.' Most of its colour came from the algae.",
  stimulusId=R, d=2, skill="Cause and effect")
O("Put the stages of a bleaching event in order.",
  ["The water stays warmer than usual for weeks.",
   "The algae start producing harmful substances.",
   "The coral expels its algae.",
   "The coral starves and turns white.",
   "If the heat lasts, seaweed covers the dead coral."],
  "Paragraphs 3 and 4 give the chain: warm water, harmful substances, the algae expelled, a white starving coral, then death and seaweed if the heat lasts.",
  stimulusId=R, d=2, skill="Sequence of events")
S("What is the main concern the writer raises in paragraph 4?",
  "Reefs may not have time to recover between bleaching events.",
  ["Bleached coral can never recover.",
   "Seaweed is spreading faster than coral grows.",
   "Scientists cannot tell bleached coral from dead coral."],
  "Paragraph 4 says reefs can recover 'over a decade or so', but 'the gaps between events are becoming too short for that recovery to happen'. It says bleached coral can recover if the water cools.",
  stimulusId=R, d=3, skill="Main idea", basics="mainIdea")

R = "NAP-R-08"
S("Why does the narrator hold the key 'as if it might bite'?",
  "The shed was always off limits.",
  ["The key is old and sharp.",
   "She is afraid of what her mum will say.",
   "She thinks the shed is dangerous."],
  "The shed was off limits 'for as long as I could remember', so being handed the key feels strange and almost forbidden.",
  stimulusId=R, d=2, skill="Figurative language", basics="toneWords")
S("What do the traced outlines of the chisels suggest about Grandad?",
  "He was careful and orderly.",
  ["He often lost his tools.",
   "He wanted to sell his tools.",
   "He did not trust other people."],
  "Everything 'had a place', the screws were sorted by size, and the outlines showed at a glance if a chisel was missing. 'None were.' This all shows a careful, orderly man.",
  stimulusId=R, d=2, skill="Character", basics="inference")
S("What does the note on the bench tell the reader?",
  "Grandad meant to finish it with her.",
  ["Grandad wanted the box to be sold.",
   "Grandad had forgotten where the clasp was.",
   "Grandad wanted Mum to finish the box."],
  "'Show her how' tells someone to teach 'her' to fit the clasp. The box has the narrator's name on it, so the plan was to finish it together.",
  stimulusId=R, d=3, skill="Inference", basics="inference")
S("Which sentence best states the narrator's realisation at the end?",
  "The rule was about waiting, not keeping her out.",
  ["Grandad had never liked visitors in his shed.",
   "The box would never be finished.",
   "Mum had known about the box all along."],
  "The last sentence says the rule 'had never been about keeping me out. He had just been waiting until it was ready.'",
  stimulusId=R, d=2, skill="Theme", basics="mainIdea")
S("The door 'stuck, then gave with a groan'. Why does the writer include this detail?",
  "To show the shed has not been used lately",
  ["To show that the narrator is weak",
   "To suggest that someone is inside",
   "To show that Grandad built the door badly"],
  "A stuck, groaning door suggests disuse, fitting the week since the funeral. The rest of the shed shows Grandad built things carefully, so poor workmanship does not fit.",
  stimulusId=R, d=3, skill="Writer's choices", basics="authorPurpose")

# ---------- Test 2, module 2 (fixed form) ----------
at(2, 2)
R = "NAP-R-09"
S("Why does the writer begin with the story of the toaster?",
  "To give a real example of the problem",
  ["To complain about a neighbour's hobby",
   "To show that toasters are badly made",
   "To advertise a repair shop"],
  "The anecdote sets up paragraph 2's 'gap, between what can be fixed and what we are told is worth fixing'.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")
M("According to paragraph 2, which two things do some manufacturers do that make repair harder? Choose two.",
  ["Glue parts together", "Refuse to sell spare parts"],
  ["Sell products without a warranty",
   "Hire too few technicians",
   "Make products out of plastic"],
  "Paragraph 2 lists gluing parts, unusual screws, and refusing to sell spare parts and manuals. The other options are not mentioned.",
  stimulusId=R, d=2, skill="Finding details")
S("How does the writer respond to the manufacturers' safety argument in paragraph 3?",
  "Accepts part of it, then shows its limits",
  ["Rejects it completely as untrue",
   "Agrees with it and changes position",
   "Ignores it and changes the subject"],
  "'That argument deserves respect, but it does not explain' the toaster or the price of parts. This is a concession followed by a rebuttal.",
  stimulusId=R, d=3, skill="Persuasive devices", basics="textStructure")
S("In paragraph 4, what is the purpose of mentioning repair cafes?",
  "To show there is demand for repair",
  ["To show that repair is only for experts",
   "To explain how to start a repair cafe",
   "To argue that libraries should close"],
  "Cafes are 'popping up' around the country and 'rarely short of customers', which is evidence of demand for repair.",
  stimulusId=R, d=2, skill="Evidence")
S("Which statement best sums up the writer's position?",
  "Products should be designed to be repaired.",
  ["Everyone should learn to repair their own appliances.",
   "Manufacturers should stop selling new products.",
   "Repairs should be done only by company technicians."],
  "The last paragraph: 'We do not need to become experts. We just need products designed so that experts, and curious neighbours, can get inside them.'",
  stimulusId=R, d=2, skill="Main idea", basics="mainIdea")

R = "NAP-R-10"
S("In the first stanza, the sea is compared to 'a guest who leaves the table mid-sentence'. What does this suggest?",
  "The sea left suddenly and will return.",
  ["The sea is rude and unwelcome.",
   "The sea is talking to the rocks.",
   "The sea leaves because it is bored."],
  "A guest who leaves mid-sentence has not finished and is expected back, which matches the last line, 'already deciding to come back'.",
  stimulusId=R, d=3, skill="Figurative language", basics="toneWords")
S("What is the 'city with its roof lifted off'?",
  "the uncovered rock pools",
  ["a town built beside the beach",
   "a crab's shell",
   "the speaker's house"],
  "The line describes 'the rocks it left behind', now bare. With the water gone you can see into the pools, like looking into a city from above.",
  stimulusId=R, d=2, skill="Figurative language", basics="wordsInContext")
S("'a crab rehearses its sideways argument' is an example of",
  "personification",
  ["rhyme",
   "alliteration",
   "exaggeration"],
  "Rehearsing an argument is a human action given to a crab. The phrase does not rhyme, and the words do not share opening sounds.",
  stimulusId=R, d=2, skill="Language features")
S("What does the line 'I crouch and do not touch' show about the speaker?",
  "respect for the pools",
  ["fear of the crab",
   "boredom with the beach",
   "a wish to collect shells"],
  "The speaker watches closely but chooses not to disturb the 'small world'. Nothing suggests fear or collecting.",
  stimulusId=R, d=2, skill="Inference", basics="inference")
S("How does the final stanza change the mood of the poem?",
  "It hints that the moment will not last.",
  ["It makes the poem frightening.",
   "It turns the poem into a joke.",
   "It shows the speaker is lost."],
  "The light moves, the water shivers and the sea 'is already deciding to come back', reminding the reader that the low tide is brief. The tone stays calm, not frightening.",
  stimulusId=R, d=3, skill="Mood", basics="toneWords")

# ---------- Drill only ----------
at(0)
R = "NAP-R-D01"
S("Why is the library changing its opening hours?",
  "Weekday hours did not suit many people.",
  ["The library is running out of money.",
   "Fewer books are being returned late.",
   "Staff asked to work on Sundays."],
  "The notice says the change 'follows a survey in which more than half of the people who answered said that weekday opening hours did not suit them'.",
  stimulusId=R, d=1, skill="Cause and effect", basics="mainIdea")
S("What will happen on Mondays from 1 July?",
  "The library will close at 5 pm.",
  ["The library will stay open until 8 pm.",
   "The library will be closed all day.",
   "The drop box will be locked."],
  "'The library will close at 5 pm on Mondays instead of 8 pm.'",
  stimulusId=R, d=1, skill="Finding details")
S("Why is the Monday change made?",
  "To keep the library's costs the same",
  ["Because few people visit on Mondays",
   "Because the survey asked for it",
   "To give staff a longer weekend"],
  "'To keep costs the same, the library will close at 5 pm on Mondays.' The extra Sunday hours are paid for by shorter Monday hours.",
  stimulusId=R, d=2, skill="Inference", basics="inference")
