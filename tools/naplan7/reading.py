# Reading (nap7Reading). Stage per at(): test, module, variant. Five items per text.

# ---------- Test 1, module 1 (everyone) ----------
at(1, 1)
R = "NAP7-R-01"
S("What is the main idea of this text?",
  "The platypus finds its food with its sensitive bill.",
  ["The platypus is unusual because it lays eggs.",
   "Platypuses are in danger because creeks are polluted.",
   "The platypus has fur, webbed feet and a flat tail."],
  "Paragraph 1 calls the bill its most surprising feature, and paragraphs 2 to 4 explain how the bill finds and handles food. Egg laying and fur are mentioned only in passing, and the text never says platypuses are in danger.",
  stimulusId=R, d=1, skill="Main idea", basics="mainIdea")
S("According to paragraph 2, what can some of the sensors in the bill detect?",
  "weak electric signals from moving prey",
  ["the smell of shrimps in the water",
   "sounds made by insect larvae",
   "changes in the temperature of the creek"],
  "Paragraph 2 says some sensors 'detect the weak electric signals given off by the muscles of small animals'. Smell, sound and temperature are not mentioned.",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("Why does the writer explain that the platypus closes its eyes and ears when it dives?",
  "To show why the bill's sensors are so important",
  ["To show that the platypus is a poor swimmer",
   "To explain why platypuses are hard to see",
   "To explain how the platypus stays warm"],
  "Paragraph 3 begins 'This matters because...': with its eyes and ears closed, the platypus must rely on the sensors in its bill to find prey.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")
O("Put these steps in the order a platypus carries them out when feeding.",
  ["It dives with its eyes and ears covered.",
   "It swings its bill along the creek bottom.",
   "It stores the food in its cheek pouches.",
   "It floats to the surface.",
   "It grinds the food with pads in its bill."],
  "Paragraphs 3 and 4 give the order: it dives and closes its eyes and ears, sweeps its bill to find prey, stores the catch in its cheeks, floats up, then chews it with the hard pads.",
  stimulusId=R, d=2, skill="Sequence", basics="sequenceEvents")
S("In paragraph 5, the word 'remarkable' is closest in meaning to",
  "unusual and impressive",
  ["easy to find and see",
   "rare and very shy",
   "well known to everyone"],
  "Something remarkable is worth remarking on because it is unusual or impressive. The whole text describes the platypus's surprising features.",
  stimulusId=R, d=1, skill="Word meaning", basics="wordsInContext")

R = "NAP7-R-02"
S("How does Jae feel after the first test run?",
  "let down",
  ["relieved",
   "excited",
   "bored"],
  "He 'stared at the sad pink puddle' and imagines the judges smiling politely at his table. Both details show he is let down.",
  stimulusId=R, d=1, skill="Character", basics="inference")
S("What does Jae imagine when he thinks the judges will 'smile politely'?",
  "They will not be impressed by his volcano.",
  ["They will give his volcano first prize.",
   "They will laugh at him in front of everyone.",
   "They will ask him to explain his experiment."],
  "A polite smile is what people give when they want to be kind but are not impressed. He compares his volcano with his friends' robots and solar ovens.",
  stimulusId=R, d=2, skill="Inference", basics="inference")
S("Why does Min ask how much bicarb soda Jae used?",
  "She suspects he did not use enough.",
  ["She wants to bake a cake for the fair.",
   "She thinks he has used far too much.",
   "She needs the amount for her video."],
  "Her next words, 'Mum puts more than that in a cake', show she thinks a teaspoon is far too little. Jae then fills the cup almost to the top.",
  stimulusId=R, d=2, skill="Inference", basics="inference")
M("Which two things does Jae change for the second test run? Choose two.",
  ["He uses much more bicarb soda.", "He adds dishwashing liquid."],
  ["He uses a bigger cup.",
   "He adds pink food colouring.",
   "He uses less vinegar."],
  "The text says he 'filled the cup almost to the top with bicarb soda and added a squirt of dishwashing liquid'. The cup, the colour and the vinegar are not described as changing.",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("What does the last sentence suggest about Jae?",
  "He is thinking like a scientist.",
  ["He wants to forget the first attempt.",
   "He is writing a story about his sister.",
   "He is copying notes for his friends."],
  "Writing down 'exactly what had changed' is how a scientist records an experiment so it can be explained and repeated.",
  stimulusId=R, d=2, skill="Character", basics="inference")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
R = "NAP7-R-03"
S("What is the writer's main purpose in this text?",
  "to persuade the council to trial closing streets for play",
  ["to explain why there is more traffic than in the past",
   "to describe the games grandparents used to play",
   "to warn parents about the dangers of busy streets"],
  "Paragraph 5 states the request: 'Our council should run a trial'. The earlier paragraphs build the case for it. Traffic and old games are supporting details.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")
S("In paragraph 1, why does the writer begin with what grandparents did after school?",
  "To contrast street play in the past with quiet streets today",
  ["To show that older people do not understand children",
   "To prove that cricket is better than other sports",
   "To suggest that grandparents should supervise street play"],
  "The memories of street cricket and chalk drawings are set against 'Today, most suburban streets are silent'. The contrast introduces the problem the writer wants to fix.",
  stimulusId=R, d=2, skill="Text structure")
S("Which sentence from the text is an opinion rather than a fact?",
  "a street closed for two hours a week is hardly a great sacrifice",
  ["On one afternoon a week, residents close their own street to through traffic",
   "There are more cars than there used to be",
   "Neighbours bring out chairs, children ride bikes and kick balls"],
  "Whether something is 'hardly a great sacrifice' is a judgement that people could disagree with. The other three describe things that can be checked.",
  stimulusId=R, d=3, skill="Fact and opinion")
H("Which sentence shows the writer considering an argument against the idea? Select the sentence.\n\n{{The main reason children stopped playing in the street is traffic.}} {{Neighbours bring out chairs, children ride bikes and kick balls.}} {{Of course, not everyone will welcome the idea.}} {{If it works, we might give a whole generation of kids something their grandparents took for granted.}}",
  [2],
  "'Of course, not everyone will welcome the idea' opens paragraph 4, where the writer admits that some residents may object before answering them. This is called a counterargument.",
  stimulusId=R, d=3, skill="Text structure")
S("In paragraph 5, the writer says 'we will have lost nothing but a few afternoons'. What point is the writer making?",
  "Trying the idea carries very little risk.",
  ["The trial will take too much time to organise.",
   "Children waste their afternoons at home.",
   "The idea is likely to fail."],
  "The writer weighs the outcomes: if the trial fails, the cost is tiny; if it works, the gain is large. The point is that the risk is small.",
  stimulusId=R, d=3, skill="Inference", basics="inference")

R = "NAP7-R-04"
S("According to paragraph 2, what is a shell midden?",
  "a mound of meal remains built up over generations",
  ["a cave where shells were stored for trading",
   "a laboratory where shells are dated",
   "a beach where shellfish are still collected"],
  "Paragraph 2 defines it: 'a mound built up over many generations from the remains of meals, mostly shells'.",
  stimulusId=R, d=2, skill="Finding details", basics="findingDetail")
S("'To a passer-by it may look like a heap of rubbish. To an archaeologist ... it is a detailed history.' Why does the writer put these two sentences side by side?",
  "To show that the same thing can mean more to someone who understands it",
  ["To show that archaeologists often disagree with members of the public",
   "To argue that middens should be cleaned up because they look untidy",
   "To explain how the first shell middens were found by passers-by"],
  "The contrast between 'heap of rubbish' and 'detailed history' shows that knowledge changes how an object is seen, which is the main point of the whole text.",
  stimulusId=R, d=3, skill="Text structure")
M("According to paragraph 3, which two things can a midden reveal? Choose two.",
  ["which animals people ate", "how old each layer is"],
  ["the names of the people who made it",
   "the language spoken at the time",
   "how many people lived nearby"],
  "Paragraph 3 says the shells reveal 'which animals were eaten' and that charcoal dating gives 'the age of each layer'. Names, languages and population are not mentioned.",
  stimulusId=R, d=2, skill="Finding details", basics="findingDetail")
S("Why does the writer say that once a layer is disturbed, 'the order of the story is lost'?",
  "The meaning of a midden depends on the order of its layers.",
  ["Storms always wash middens away completely.",
   "Archaeologists cannot date shells that have been moved.",
   "The law does not allow disturbed middens to be studied."],
  "Paragraph 3 explains that each layer tells part of the story in sequence, so mixing the layers destroys that sequence, like shuffling the pages of a book.",
  stimulusId=R, d=3, skill="Inference", basics="inference")
S("What does the final sentence suggest?",
  "History can be learned from objects as well as written records.",
  ["Shells are a more reliable source of history than books.",
   "Only trained archaeologists should be allowed to visit middens.",
   "Most of history is still waiting to be written down in books."],
  "'History is not only found in books... it is written in shells' uses 'written' as a comparison: objects can be read like a text by someone who knows how.",
  stimulusId=R, d=2, skill="Main idea", basics="mainIdea")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
R = "NAP7-R-05"
S("What is the main purpose of this text?",
  "to explain how to set up and look after a worm farm",
  ["to persuade people to stop wasting their food scraps",
   "to describe the whole life cycle of compost worms",
   "to compare worm farms with other kinds of compost bins"],
  "The text has a list of things you need, numbered steps and feeding tips. This is the structure of a procedure, which tells you how to do something.",
  stimulusId=R, d=1, skill="Text type", basics="authorPurpose")
S("Why should the worm farm be placed in a shady spot?",
  "Worms die if they get too hot.",
  ["Shade keeps the bedding dry.",
   "Worms need light to find food.",
   "The tap works better in the shade."],
  "Step 1 gives the reason straight after the instruction: 'Worms die if they get too hot.'",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
O("Put these steps in the order the text gives them.",
  ["Spread damp bedding in the top tray.",
   "Add the worms.",
   "Add a handful of chopped scraps.",
   "Cover everything with a hessian sack."],
  "The steps follow the numbered list: bedding (step 2), worms (step 3), scraps (step 4), then the hessian sack (step 5).",
  stimulusId=R, d=1, skill="Sequence", basics="sequenceEvents")
S("Which food should NOT be put in a worm farm?",
  "an orange peel",
  ["a banana skin",
   "used tea leaves",
   "crushed eggshells"],
  "The feeding tips say not to feed worms citrus fruit, and an orange is a citrus fruit. Fruit scraps, tea leaves and eggshells are all listed as good food.",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("The text says to mix the liquid with water 'until it looks like weak tea'. Why does it describe the colour?",
  "To show how much water to add",
  ["To show that the liquid is safe to drink",
   "To explain what the worms like to eat",
   "To warn that the liquid can stain clothes"],
  "Comparing the colour to weak tea gives the reader a simple way to judge when enough water has been added.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")

R = "NAP7-R-06"
S("At what time of day does the poem begin?",
  "early morning, before sunrise",
  ["late at night, after midnight",
   "in the middle of the day",
   "in the evening, after sunset"],
  "The first line is 'Before the sun has cleared the hill', and the tables wake up 'beneath the lamplight's glow', so it is still dark.",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("In the first verse, the tables 'wake up'. What does this show?",
  "The market is coming to life.",
  ["The stallholders are tired.",
   "The tables are very old.",
   "The market is noisy at night."],
  "Tables cannot really wake up. Giving them a human action shows the market starting its day as the stalls are set up.",
  stimulusId=R, d=2, skill="Figurative language", basics="wordsInContext")
S("What does the poet mean by 'go drifting with the morning tide'?",
  "They move slowly along with the crowd.",
  ["They walk down to the beach for a swim.",
   "They get lost among the market stalls.",
   "They hurry home before it starts to rain."],
  "The 'tide' is the crowd of shoppers moving through the market. Drifting means moving slowly without rushing.",
  stimulusId=R, d=2, skill="Figurative language", basics="inference")
S("How does the mood change in the last verse?",
  "It becomes quieter as the market ends.",
  ["It becomes frightening as a storm arrives.",
   "It becomes busier as more people arrive.",
   "It becomes angry as the stalls close."],
  "By ten the crowds have 'thinned away', the stalls pack up and only paper bags remain. The busy scene fades to a quiet, empty one.",
  stimulusId=R, d=2, skill="Mood", basics="inference")
S("Which pair of words from the poem rhyme?",
  "bread and red",
  ["hill and row",
   "case and wide",
   "away and ground"],
  "The poem rhymes in pairs of lines. 'Bread' and 'red' end lines 1 and 2 of the second verse.",
  stimulusId=R, d=1, skill="Poetry")

# ---------- Test 2, module 1 ----------
at(2, 1)
R = "NAP7-R-07"
S("What is the main idea of this text?",
  "Mud brick is an old building material with useful features.",
  ["Mud brick houses are much cheaper to build than other houses.",
   "Mud bricks are only used in very hot and dry countries.",
   "Straw is the most important ingredient in a mud brick."],
  "The text explains how mud bricks are made, how they keep homes comfortable, their weaknesses, and why they are 'getting a second look'.",
  stimulusId=R, d=1, skill="Main idea", basics="mainIdea")
S("According to paragraph 2, why is straw often added to the mixture?",
  "to help stop the bricks cracking",
  ["to make the bricks lighter",
   "to keep insects away",
   "to help the bricks dry faster"],
  "Paragraph 2 says straw 'helps stop the bricks from cracking as they dry'.",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("In paragraph 3, what does 'thermal mass' mean?",
  "the ability to store heat and release it later",
  ["the weight of a wall made of thick bricks",
   "the heat given off by a house at night",
   "the amount of straw mixed into each brick"],
  "The last sentence of paragraph 3 defines the term: 'This ability to store heat and release it later is called thermal mass.'",
  stimulusId=R, d=2, skill="Word meaning", basics="wordsInContext")
M("Which two ways of protecting mud brick from rain are mentioned? Choose two.",
  ["wide roof overhangs", "a stone or concrete base"],
  ["painting the walls",
   "adding extra straw",
   "building thinner walls"],
  "Paragraph 4 says builders protect mud brick 'with wide roof overhangs and a stone or concrete base that keeps the bottom of the walls dry'.",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("What does the writer mean by 'Sometimes the best new idea turns out to be a very old one'?",
  "An ancient method may help solve a modern problem.",
  ["New buildings should be designed to look old-fashioned.",
   "Old houses are always better than new houses.",
   "People have run out of new ideas for buildings."],
  "The sentence before says people want homes 'that use less energy'. Mud brick is ancient, but its thermal mass suits that modern goal.",
  stimulusId=R, d=2, skill="Inference", basics="inference")

R = "NAP7-R-08"
S("Why does Ellie eat lunch in the library on her first day?",
  "She does not want others to see she is alone.",
  ["She wants to join the chess club that meets there.",
   "She has some homework that she needs to finish.",
   "Mr Okafor has asked her to help him in the library."],
  "The first paragraph says 'nobody could see that she was alone'. She has not been invited to the club yet.",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("Ellie says she plays chess 'A bit', 'which was not quite true'. What does this suggest?",
  "She wants to be included, though she is unsure.",
  ["She is secretly a very strong chess player.",
   "She does not want to talk to Mr Okafor.",
   "She has never heard of the game of chess."],
  "She only knows the moves and has not played for years, but she says yes anyway. This hints that she wants the invitation.",
  stimulusId=R, d=2, skill="Inference", basics="inference")
S("Why does Ellie 'almost turn around' in the doorway?",
  "The busy, noisy room makes her nervous.",
  ["She has forgotten to bring her chess set.",
   "She can see that every seat is taken.",
   "Zara has told her to go away and leave."],
  "The library is 'full of noise' with students arguing, a big change from the quiet room she used to hide in. Zara welcomes her straight after.",
  stimulusId=R, d=2, skill="Character", basics="inference")
S("What does Zara mean when she says, 'Don't worry, Tom cheats'?",
  "She is joking to make Ellie feel welcome.",
  ["She wants Ellie to report Tom.",
   "She is warning Ellie not to play.",
   "She is angry with Ellie for being late."],
  "Zara is teasing a friend in a friendly way, and Tom's reply 'I do not!' keeps the joke going. It puts the new player at ease.",
  stimulusId=R, d=2, skill="Dialogue", basics="inference")
S("What does the last sentence suggest about how Ellie feels?",
  "She enjoyed herself and lost track of time.",
  ["She was worried she would be late home.",
   "She was bored and wanted the club to end.",
   "She was upset that she lost every game."],
  "When people are enjoying something, they stop checking the time. At the start of the story she was counting the minutes alone in the library.",
  stimulusId=R, d=2, skill="Inference", basics="inference")

# ---------- Test 2, module 2 (fixed form) ----------
at(2, 2)
R = "NAP7-R-09"
S("Which statement best describes how the writer treats the topic?",
  "The writer presents evidence on both sides before drawing a conclusion.",
  ["The writer argues strongly that homework should be banned in all schools.",
   "The writer argues that more homework is always better for every student.",
   "The writer tells a story about one family's arguments over homework."],
  "The text reports research that homework helps older students but not younger ones, then concludes the answer 'is not a simple yes or no'. It is a balanced discussion.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")
S("According to paragraph 2, who is homework most likely to help?",
  "students in the later years of high school",
  ["students in the early years of primary school",
   "students who find schoolwork difficult",
   "students whose parents check it"],
  "Paragraph 2 says homework 'is generally linked with better results' for 'students in the later years of high school'. The link is much weaker for younger students.",
  stimulusId=R, d=2, skill="Finding details", basics="findingDetail")
S("In paragraph 1, homework is described as 'a nightly battle'. What does this phrase suggest?",
  "Homework often causes conflict at home.",
  ["Homework is usually done late at night.",
   "Students compete to finish homework first.",
   "Homework is about history and wars."],
  "A battle is a fight. Calling homework a 'nightly battle' shows it causes arguments every evening, and the same sentence says it 'leaves everyone tired and grumpy'.",
  stimulusId=R, d=2, skill="Figurative language", basics="wordsInContext")
H("Which sentence explains why some kinds of homework do not help? Select the sentence.\n\n{{The type of homework also matters.}} {{Reading for pleasure, practising times tables or preparing for a test can help.}} {{Long worksheets of questions that students cannot do without help often lead only to frustration, or to parents doing the work instead.}} {{There is also the question of time.}}",
  [2],
  "The third sentence names the kind of homework that does not help and why: students cannot do it alone, so it leads to frustration or parents doing it.",
  stimulusId=R, d=3, skill="Finding details", basics="findingDetail")
S("Why does the writer end with a question instead of an answer?",
  "To suggest the original question was too simple",
  ["Because the writer has not done any research",
   "To ask readers to write in with their opinions",
   "Because the research proves homework is useless"],
  "The writer replaces 'Is homework worth it?' with a better question about what kind, how much and for whom. This shows the first question was too simple.",
  stimulusId=R, d=3, skill="Text structure")

R = "NAP7-R-10"
S("What type of text is this?",
  "a review",
  ["a narrative",
   "a biography",
   "a procedure"],
  "It describes a book, judges its strengths and weaknesses and ends with a recommendation and a star rating. That is a review.",
  stimulusId=R, d=1, skill="Text type", basics="authorPurpose")
S("What does the reviewer think is the best thing about the book?",
  "Harriet",
  ["the trunk",
   "the ending",
   "the letters"],
  "The third paragraph begins 'The best thing about the book is Harriet herself.'",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("The reviewer says the middle of the book 'drags a little'. What does this mean?",
  "It moves too slowly.",
  ["It is too short.",
   "It is hard to understand.",
   "It is too frightening."],
  "Something that drags feels slow. The reviewer explains that chapters of letter after letter made them start 'skimming'.",
  stimulusId=R, d=2, skill="Word meaning", basics="wordsInContext")
S("How does the reviewer's view of the great-aunt change through the book?",
  "She seems cold at first but becomes very likeable.",
  ["She seems kind at first but turns out to be cruel.",
   "She stays strict and unfriendly throughout.",
   "She seems boring at first but turns out to be a villain."],
  "The review says she 'at first seems cold and strict' but 'slowly turns into one of the most likeable characters'.",
  stimulusId=R, d=2, skill="Character", basics="inference")
M("Which two pieces of evidence show that the reviewer liked the book overall? Choose two.",
  ["The reviewer calls it the author's best so far.", "The reviewer gives it four stars out of five."],
  ["The reviewer skimmed some chapters.",
   "The reviewer says Harriet is often wrong.",
   "The reviewer says Harriet expects to be bored."],
  "'In my opinion it is the best so far' and 'Four stars out of five' both show a positive overall judgement. Skimming is a complaint, and Harriet's mistakes and boredom describe the story, not the reviewer's view.",
  stimulusId=R, d=2, skill="Opinion and evidence")

# ---------- Drill only ----------
at(0)
R = "NAP7-R-D01"
S("What is the main idea of this text?",
  "It explains why some leaves change colour and fall in autumn.",
  ["It explains why most Australian native trees keep their leaves.",
   "It describes how to plant and grow maples and oaks in parks.",
   "It argues that autumn is the most beautiful season of the year."],
  "Paragraphs 2 to 4 explain chlorophyll, why the green fades and why the leaf falls. Australian trees are mentioned only in paragraph 1.",
  stimulusId=R, d=1, skill="Main idea", basics="mainIdea")
S("According to paragraph 2, why are leaves green?",
  "They contain chlorophyll.",
  ["They soak up water.",
   "They are young and growing.",
   "They reflect the colour of the sky."],
  "Paragraph 2 begins 'Leaves are green because they contain a substance called chlorophyll.'",
  stimulusId=R, d=1, skill="Finding details", basics="findingDetail")
S("According to paragraph 3, where do the yellow and orange colours come from?",
  "They were in the leaf all along.",
  ["The tree makes them in autumn.",
   "They come from the cold weather.",
   "They are made by the sunlight."],
  "The text says yellow and orange 'were in the leaf all along' and can be seen once the green breaks down. Only the red colours are newly made.",
  stimulusId=R, d=2, skill="Finding details", basics="findingDetail")
O("Put these events in the order they happen.",
  ["The days grow shorter and cooler.",
   "The tree stops making chlorophyll.",
   "Yellow and orange colours can be seen.",
   "The leaf falls from the tree."],
  "Paragraph 3 says shorter, cooler days lead the tree to stop making chlorophyll, so the hidden colours show; paragraph 4 says the leaf then falls.",
  stimulusId=R, d=1, skill="Sequence", basics="sequenceEvents")
S("Why does the writer mention parks and streets in paragraph 1?",
  "To tell Australian readers where they can see autumn colours",
  ["To complain that too many trees are planted in cities",
   "To explain why native trees lose their leaves",
   "To show that maples grow best in Australia"],
  "Most native trees keep their leaves, so the writer points readers to planted northern hemisphere trees, where the colour change can be seen.",
  stimulusId=R, d=2, skill="Writer's purpose", basics="authorPurpose")
