#!/usr/bin/env python3
"""Reading texts and items for the NSW OC (Year 4) practice test.

Writes tools/ocnsw/reading.json and tools/ocnsw/reading_stimuli.json (sources
for tools/ocnsw/build.py). All texts are original. Per test: a story extract
(5), a poem (3) and an article (3) with single questions, a factual text with
six sentences removed (6, five options each from a pool of seven), four
extracts A to D (8, locked "Extract A..D" options) and two texts to compare
(8, locked Text A only / Text B only / Both / Neither). Drill-only: a story (5)
and a four-extract set (8). Items stay in the order written here.
"""
import json, os

R1, R2, R0 = "OC-R1-", "OC-R2-", "OC-R0-"
COMP, GAP, CMP = "ocComprehension", "ocCohesion", "ocCompare"

STIMULI = [
    # ======================= Practice Test 1 =======================
    {"id": R1 + "NARR", "title": "Pop's Kite", "text": """Pop said the best kites were made, not bought. So on the first windy Saturday of spring, Leo found himself kneeling on the shed floor, surrounded by newspaper, string and two thin sticks of bamboo.

"Cross the sticks like this," said Pop, holding them in the shape of a small letter t. "Then we tie them tight, right where they meet."

Leo tied the knot three times to be sure. They glued newspaper over the frame, and Pop let Leo paint a red lightning bolt down the middle. By lunchtime the kite was finished, and Leo thought it was the best thing he had ever made.

At the park, Leo held the kite above his head and ran. The kite rose, wobbled, spun in three fast circles and crashed nose-first into the grass. He tried again. It crashed again. On the fourth try, the paper tore along one edge.

Leo stomped back across the grass and dropped the string at Pop's feet. "It's useless," he said. "We should have just bought one."

Pop did not answer straight away. He picked up the kite, turned it over and smoothed the torn paper with his thumb. Then he pulled a roll of tape and a long strip of rag from his coat pocket, as if he had been expecting this all along.

"It's not useless," he said. "It's just dizzy. It needs a longer tail to keep it steady."

They taped the tear and tied on the rag. This time, when Leo ran, the kite climbed and kept climbing, the red lightning bolt shrinking until it was no bigger than a fingernail against the clouds. The string tugged in Leo's hands like something alive.

"Still think we should have bought one?" asked Pop.

Leo didn't take his eyes off the sky. "Next time," he said, "can we make a bigger one?\""""},
    {"id": R1 + "POEM", "title": "Something on the Roof", "text": """Thump on the iron, a scratch and a scrape,
something is out there, a shadowy shape.
It scurries and scrabbles from gutter to peak,
then stops, and the roof gives a long, sneaky creak.

I lie in the dark with the sheet to my nose
and picture a monster with claws on its toes.
Its teeth must be daggers, its eyes must be fire...
the scratching moves closer, the creaking goes higher.

I creep to the window. I lift up the blind.
Two round, shining eyes look back, startled and kind:
a brushtail, a possum, with fur soft and grey,
who sniffs at the moonlight and scampers away."""},
    {"id": R1 + "ART", "title": "The Lyrebird: Australia's Greatest Copycat", "text": """Deep in the damp forests of south-eastern Australia lives a bird that can sound like almost anything. The superb lyrebird is about the size of a chicken, with brown feathers and long, strong legs. It spends most of its time on the forest floor, scratching through the leaves for worms, beetles and spiders.

The lyrebird is famous for its voice. As well as making its own loud calls, it copies the songs of other birds so well that listeners are often fooled. A single lyrebird may copy kookaburras, whipbirds, rosellas and many others, one after another. Some lyrebirds that live near people have even been heard copying sounds such as car alarms and camera clicks.

Male lyrebirds do most of this singing in winter, when they are trying to attract a mate. A male scrapes up a low mound of soil, climbs on top and sings. Then he spreads his long, lacy tail feathers over his head like a shimmering fan and dances from side to side.

The lyrebird gets its name from its tail. When early European visitors saw it, they thought it looked like a lyre, a small harp from ancient Greece. Today, the lyrebird appears on Australia's ten-cent coin."""},
    {"id": R1 + "GAP", "title": "From Flower to Honey", "text": """Read the text. Six sentences have been taken out. Choose the sentence that best fits each gap.

Honey begins its life inside a flower. Deep in many flowers is a sweet, watery liquid called nectar. **[Gap 1]** She sucks up the nectar with her long, straw-like tongue and stores it in a special pouch called a honey stomach.

When her honey stomach is full, the bee flies back to the hive. **[Gap 2]** These house bees take the nectar from her and carry it to the honeycomb.

Fresh nectar is far too runny to be honey. **[Gap 3]** To get rid of it, the house bees spread the nectar in thin layers across the wax cells. Then they fan it with their wings, sometimes for hours. **[Gap 4]**

Once the honey is thick enough, the bees seal each cell with a lid of wax. **[Gap 5]** In winter, when few flowers are blooming, the whole hive will live on this stored food.

Making honey takes an enormous amount of work. **[Gap 6]** That is why beekeepers say every spoonful of honey is a gift from thousands of tiny workers."""},
    {"id": R1 + "EXT", "title": "Rain", "text": """Read the four extracts about rain. Then answer the questions.

**Extract A**

Wednesday. It rained ALL day, so we couldn't go to the pool like Mum promised. Instead, my sister and I built a cubby out of the couch cushions and two old sheets. We took torches inside and read comics until Dad said the cubby had to go so he could sit down. Then we lay on the floor and listened to the rain drumming on the roof. I didn't think I would like a rainy day, but it was actually fun.

**Extract B**

How to make a rain gauge. You will need an empty plastic bottle, scissors, a ruler, tape and some pebbles. Ask an adult to cut the top off the bottle. Put a few pebbles in the bottom so it won't blow over, then turn the top upside down and fit it into the bottle like a funnel. Tape the ruler to the side. Place your gauge in an open space away from trees, and check it at the same time each day. Empty it after each reading.

**Extract C**

For two years, not a drop. Grandad's paddocks turned the colour of old toast, and the cattle had to be sold, one truckload at a time. Then one night in March he woke me up. "Listen," he said. We stood on the verandah in our pyjamas while the rain came down in sheets. Grandad didn't say anything. He just held out his hands and let them fill with water, and I saw that his face was wet too, and not only from the rain.

**Extract D**

Heavy rain overnight has closed Riverside Road after Cobb Creek burst its banks early this morning. Emergency workers helped two drivers whose cars stalled in the floodwater. Police are warning people never to drive, walk or ride through floodwater, as even shallow water can be flowing fast. The road is expected to stay closed until at least Friday."""},
    {"id": R1 + "PAIR", "title": "Wombats", "text": """Read the two texts about wombats. Then answer the questions.

**Text A**

Wombats are sturdy, short-legged animals found mainly in south-eastern Australia, including Tasmania. They are marsupials, so a mother carries her baby, called a joey, in a pouch. Unlike a kangaroo's pouch, a wombat's pouch opens towards her back legs, so dirt does not get in when she digs. Wombats dig long burrows with their strong claws and spend the hottest part of the day underground. They come out in the evening and at night to eat grasses and roots.

**Text B**

Sophie and her dad were driving home from Grandma's farm late at night when Dad suddenly slowed down. A round, grey shape was standing in the middle of the road, lit up by the headlights.

"Is that a rock?" asked Sophie.

Then the rock turned its head. It was a wombat, as wide as a suitcase, blinking at the light. Dad switched off the engine and they waited. The wombat sniffed the air, then waddled slowly to the side of the road and pushed its way into the long grass.

"Good thing we weren't in a hurry," said Dad. Sophie kept looking out of the back window until the grass stopped moving."""},
    # ======================= Practice Test 2 =======================
    {"id": R2 + "NARR", "title": "The Spelling Bee", "text": """Hana's hands were so sweaty that she had to wipe them on her skirt twice before she reached the microphone. The school hall looked enormous from the stage. Three hundred faces stared up at her, and somewhere among them, she knew, were her mum and her little brother, Kenji, who had promised not to wave.

He waved anyway. Both arms.

Hana almost laughed, and the tight knot in her stomach loosened a little.

"Your word," said Mrs Avery, "is necessary."

Hana closed her eyes. She and her friend Grace had practised this one at lunch for a week. Grace had a trick for it: one collar, two sleeves. One c and two s's, like a shirt.

"Necessary," Hana said. "N-E-C-E-S-S-A-R-Y. Necessary."

"Correct."

The next round brought harder words, and then harder ones again. By the time there were only two spellers left, Hana's knees had stopped shaking altogether. Her final word was rhythm. She had never seen it written down. She spelt it the way it sounded, and she knew it was wrong as soon as the bell rang.

The boy from 4K spelt it perfectly, and the hall burst into applause. Hana clapped too, and found that she meant it.

Afterwards, Kenji ran at her and wrapped himself around her waist. "You came second in the whole school!" he shouted, as if she might not have noticed.

Grace was right behind him. "Rhythm," she said. "R-H-Y-T-H-M. I've got a trick for that one too."

"Of course you have," said Hana, and this time she did laugh."""},
    {"id": R2 + "POEM", "title": "The Fig Tree", "text": """Our fig tree is a grandmother,
her arms are grey and wide;
she lets the little ones climb up
and keeps them safe inside.

She shades our cubby in the heat,
she feeds the birds that call,
and when the flying foxes come
she has enough for all.

She's older than the houses,
she's older than the street,
and when I'm grown I'll bring my kids
to rest beneath her feet."""},
    {"id": R2 + "ART", "title": "The Echidna", "text": """With its coat of sharp spines, the short-beaked echidna looks a little like a hedgehog or a porcupine. In fact, it is not closely related to either of them. The echidna is a monotreme, which is a mammal that lays eggs. Its only living relatives in this group are the platypus and a few other kinds of echidna.

Echidnas live in almost every part of Australia, from snowy mountains to hot deserts. They have no teeth. Instead, an echidna uses its long, sticky tongue to lick up ants and termites, and it crushes its food against hard pads in its mouth.

When it feels threatened, an echidna has a clever way of protecting itself. On soft ground, it digs straight down until only its spines are showing. On hard ground, it curls into a prickly ball.

A female echidna lays a single soft egg, which she rolls into a pouch on her belly. After about ten days, the baby hatches. The tiny baby, called a puggle, stays in the pouch and drinks its mother's milk until its spines begin to grow.

Echidnas are such a familiar part of Australian life that one appears on the five-cent coin."""},
    {"id": R2 + "GAP", "title": "From Seed to Seedling", "text": """Read the text. Six sentences have been taken out. Choose the sentence that best fits each gap.

A seed may look like a tiny, lifeless pebble, but inside it is a baby plant waiting for the right moment to grow. **[Gap 1]** This seed coat keeps the baby plant safe until it is needed.

Before a seed can start to grow, it needs water. **[Gap 2]** As the seed swells, its coat splits open.

Warmth is also important. **[Gap 3]** That is why gardeners plant most seeds in spring rather than in the middle of winter.

The first part of the plant to push out of the seed is the root. **[Gap 4]** Soon afterwards, a small shoot begins to grow the opposite way, up towards the light.

Until it reaches the surface, the shoot lives on food stored inside the seed. **[Gap 5]** From then on, the leaves use sunlight to make food for the plant.

Not every seed grows, even when the conditions are right. **[Gap 6]** This is why seed packets often tell you to plant two or three seeds in each hole."""},
    {"id": R2 + "EXT", "title": "Making Things", "text": """Read the four extracts about making things. Then answer the questions.

**Extract A**

On Sunday I made a robot out of boxes. The body was a cereal box and the head was a tissue box with bottle tops for eyes. I wanted its arms to move, so I used split pins at the shoulders. It took all afternoon and my fingers were covered in glue, but when I showed Dad, he said it was good enough to go in a museum. I named it Bolt.

**Extract B**

Homemade playdough. Mix two cups of plain flour, half a cup of salt and two tablespoons of cream of tartar in a large bowl. Add two tablespoons of oil and a few drops of food colouring to one and a half cups of boiling water, then ask an adult to pour it into the bowl. Stir until it forms a dough. When it is cool enough to touch, knead it on the bench for a few minutes. Store it in an airtight container.

**Extract C**

My father's shed smelled of sawdust and oil. On Saturday mornings I sat on an upturned bucket and watched him work. He never measured anything twice, he said, because he measured it right the first time. Once he made me a wooden horse with a tail of real string. Sixty years later it stands on the shelf beside my bed, and when I hold it, I can still smell that shed.

**Extract D**

Every year, Australians throw away millions of plastic bottles, and many of them can be recycled. At a recycling plant, bottles are sorted, washed and chopped into tiny flakes. The flakes are melted and made into new things, such as new bottles, park benches and even the threads used in some jumpers. Recycling a bottle uses less energy than making a new one from scratch."""},
    {"id": R2 + "PAIR", "title": "Bikes", "text": """Read the two texts about riding a bike. Then answer the questions.

**Text A**

Before every ride, give your bike a quick safety check. Squeeze both brakes to make sure they stop the wheels. Press on the tyres: if they feel soft, pump them up. Check that the chain is not loose and the seat is tight. Always wear a helmet that fits snugly and is done up. Wearing a helmet is required by law in most of Australia, and it could save your life.

**Text B**

Dad let go of the seat. Amira didn't know it at first. She kept pedalling, wobbling along the footpath past the letterbox, past the lemon tree, past Mrs Chen's fence, and then she heard Dad's voice coming from far behind her.

"You're doing it!"

She looked back, saw how far away he was, and crashed straight into the hedge. She sat up with leaves stuck in her helmet and a scraped knee. Then she grinned.

"Again," she said."""},
    # ======================= Drill only =======================
    {"id": R0 + "NARR", "title": "The New Kid", "text": """On Monday a new girl arrived in 4M. Her name was Ivy, and she had come all the way from a cattle station in the Northern Territory, where the nearest neighbour lived an hour's drive away and school happened over the internet.

Mr Martin asked Sam to show her around. Sam was not pleased. He had planned to spend lunchtime finishing the Lego tower that he and Raj had been building in the library for two weeks.

"This is the canteen," he said quickly. "That's the oval. Those are the toilets." He walked so fast that Ivy had to jog to keep up.

At the library he stopped. Raj was already there, frowning at the tower, which had begun to lean like a tired tree.

"It's going to fall," Raj said gloomily.

Ivy looked at the tower for a long moment. Then she knelt down, pulled out three bricks near the bottom and slid in a wide, flat piece instead. The tower straightened.

"We build stands for our water tanks at home," she said. "If the bottom's not wide, the top won't stay up."

Sam and Raj looked at each other.

"Do you want to help us finish it?" asked Sam. "We still need a roof."

Ivy smiled for the first time all day."""},
    {"id": R0 + "EXT", "title": "At the Beach", "text": """Read the four extracts about the beach. Then answer the questions.

**Extract A**

Always swim between the red and yellow flags. The flags show the part of the beach that lifesavers are watching. If you are caught in a rip, stay calm, float, and raise one arm to signal for help.

**Extract B**

Mia dug until her arms ached. The hole was deep enough to stand in now, and cold, grey water was starting to fill the bottom. "One more bucket," she told herself. Then a wave rushed up the sand, poured over the edge and filled her hole in a single gulp. Mia stood there holding her empty bucket, and laughed.

**Extract C**

When I was a boy, we spent every Christmas at the same caravan park. We had no television, so in the evenings we sat on the sand and watched the fishing boats come in, their lights bobbing like fireflies. My brother and I would count them. I don't remember the number, but I remember the smell of salt and the sound of my mother calling us in for tea.

**Extract D**

Sand is made of tiny pieces of rock and shell that waves have broken down over thousands of years. That is why sand on different beaches can be different colours. Shell Beach in Western Australia is not covered in sand at all, but in countless tiny white shells."""},
]

# Single questions: (stimulus, test, skill, difficulty, basics, stem, key, distractors, explanation)
SINGLES = [
    (R1 + "NARR", 1, "Finding details", 1, "findingDetail", "Why did Leo tie the knot three times?",
     "He wanted to be sure it would hold.", ["Pop told him to tie three knots.", "The first two knots came undone.", "He did not know how to tie a knot."],
     "The story says he \"tied the knot three times to be sure\". Nothing says the knots came undone or that Pop asked for three."),
    (R1 + "NARR", 1, "Character feelings", 1, "toneWords", "\"Leo stomped back across the grass.\" This shows that Leo felt",
     "frustrated", ["frightened", "sleepy", "bored"],
     "Stomping and calling the kite \"useless\" after it crashed four times show he was annoyed and frustrated, not scared or bored."),
    (R1 + "NARR", 1, "Inference", 2, "inference",
     "Pop had tape and a rag in his pocket \"as if he had been expecting this all along\". What does this suggest?",
     "Pop thought the kite might need fixing.", ["Pop always carries rubbish in his pockets.", "Pop wanted to make a second kite.", "Pop had planned to fly a kite of his own."],
     "Pop had exactly what was needed to mend the tear and lengthen the tail, which suggests he guessed the kite would have trouble on its first flight."),
    (R1 + "NARR", 1, "Words in context", 2, "wordsInContext", "When Pop says the kite is \"just dizzy\", he means that it",
     "spins because it is not steady", ["is far too heavy to fly", "has a hole in its paper", "needs a much stronger wind"],
     "The kite \"spun in three fast circles\" and Pop says a longer tail will \"keep it steady\", so \"dizzy\" describes the spinning."),
    (R1 + "NARR", 1, "Theme", 2, "mainIdea", "What does Leo's answer at the end of the story show?",
     "He now enjoys making his own kites.", ["He wants Pop to buy him a bigger kite.", "He is tired of flying this kite.", "He thinks the kite is too small to fly."],
     "Earlier Leo said they should have bought a kite. Asking to make a bigger one next time shows he has changed his mind and enjoys making them."),
    (R1 + "POEM", 1, "Inference", 1, "inference", "Why does the speaker imagine a monster in the second verse?",
     "The noises are strange and it is too dark to see.", ["A monster story was read to them at bedtime.", "The possum on the roof looks very frightening.", "The window blind has been left open all night."],
     "The speaker is lying \"in the dark\" hearing thumps and scratches, so their imagination fills in a monster. The possum, once seen, looks \"kind\"."),
    (R1 + "POEM", 1, "Figurative language", 1, "wordsInContext", "\"Its teeth must be daggers\" means the speaker imagines teeth that are",
     "long and sharp", ["shiny and gold", "broken and old", "small and white"],
     "Daggers are sharp, pointed knives, so the speaker pictures long, sharp teeth."),
    (R1 + "POEM", 1, "Change in feelings", 2, "toneWords", "How do the speaker's feelings change during the poem?",
     "From scared to calm", ["From calm to scared", "From excited to bored", "From angry to sad"],
     "The speaker hides under the sheet imagining a monster, then sees a possum with \"kind\" eyes scamper away, so the fear turns to calm."),
    (R1 + "ART", 1, "Author's purpose", 1, "authorPurpose", "What is the main purpose of this article?",
     "To give facts about an unusual Australian bird", ["To persuade people to visit the forests of Australia", "To tell a story about a bird that gets lost", "To explain how to care for a pet bird at home"],
     "The article describes where the lyrebird lives, its copying, its dance and its name. It gives facts rather than telling a story or persuading."),
    (R1 + "ART", 1, "Finding details", 1, "findingDetail", "According to the article, why do male lyrebirds sing in winter?",
     "To attract a mate", ["To warn other birds away", "To keep themselves warm", "To find their way home"],
     "The article says males sing in winter \"when they are trying to attract a mate\"."),
    (R1 + "ART", 1, "Words in context", 2, "wordsInContext", "The lyrebird copies other birds \"so well that listeners are often fooled\". This means that people",
     "think they are hearing a different bird", ["cannot hear the lyrebird's song at all", "find the lyrebird's songs rather boring", "try hard to copy the lyrebird's song"],
     "To be fooled is to be tricked. The copies are so good that people believe a kookaburra or whipbird is calling."),
    (R2 + "NARR", 2, "Inference", 1, "inference", "Why did the knot in Hana's stomach loosen a little?",
     "Kenji's waving made her want to laugh.", ["Mrs Avery smiled at her.", "She already knew her first word.", "She saw that the hall was nearly empty."],
     "Right after Kenji waves with both arms, Hana \"almost laughed\", and that is what eases her nerves. She does not hear her word until afterwards."),
    (R2 + "NARR", 2, "Finding details", 1, "findingDetail", "Grace's trick, \"one collar, two sleeves\", helps Hana remember",
     "how many c's and s's are in the word", ["what the word necessary means", "how to say the word out loud", "which word she will be given next"],
     "The story explains it: \"One c and two s's, like a shirt.\" The trick is about spelling, not meaning."),
    (R2 + "NARR", 2, "Character feelings", 2, "toneWords", "\"Hana clapped too, and found that she meant it.\" This shows that Hana was",
     "happy for the winner", ["pretending to be happy", "angry about her mistake", "glad the contest was over"],
     "Meaning her clapping shows she was truly pleased for the boy from 4K, not just being polite."),
    (R2 + "NARR", 2, "Inference", 3, "inference", "Kenji shouts \"as if she might not have noticed\". This suggests that Kenji",
     "was telling Hana something she already knew", ["thought Hana had not been listening to him", "was confused about who had won the contest", "had not watched any of the spelling contest"],
     "Hana was on stage and knows she came second. The phrase gently pokes fun at Kenji's excitement in announcing it to her."),
    (R2 + "NARR", 2, "Character traits", 2, "inference", "Which word best describes Grace?",
     "Helpful", ["Shy", "Jealous", "Forgetful"],
     "Grace practised with Hana all week, gave her a trick for \"necessary\" and already has one ready for \"rhythm\". That is helpful."),
    (R2 + "POEM", 2, "Figurative language", 2, "wordsInContext", "The poet calls the fig tree \"a grandmother\" mainly because the tree",
     "is old and looks after others", ["is small and very easily hurt", "grows right inside the house", "is slowly losing all its leaves"],
     "The tree keeps the little ones \"safe\", shades the cubby and feeds the animals, and it is \"older than the houses\", like a caring grandmother."),
    (R2 + "POEM", 2, "Words in context", 1, "wordsInContext", "\"She has enough for all\" means that the tree",
     "has plenty of figs for every animal", ["has room for every child to climb", "is big enough to shade the street", "has seen everything in the town"],
     "The line follows the flying foxes coming to feed, so \"enough\" refers to the figs the tree provides."),
    (R2 + "POEM", 2, "Finding details", 1, "findingDetail", "In the last verse, what does the speaker plan to do?",
     "Bring their own children to the tree", ["Plant a new fig tree in the yard", "Move a long way away from the street", "Cut down the old tree when it dies"],
     "The speaker says \"when I'm grown I'll bring my kids / to rest beneath her feet\"."),
    (R2 + "ART", 2, "Finding details", 1, "findingDetail", "According to the article, what makes the echidna a monotreme?",
     "It is a mammal that lays eggs.", ["It has a coat of sharp spines.", "It has no teeth.", "It lives all over Australia."],
     "The article says a monotreme \"is a mammal that lays eggs\". Spines, no teeth and where it lives are other facts about echidnas."),
    (R2 + "ART", 2, "Finding details", 1, "findingDetail", "What does a threatened echidna do on hard ground?",
     "Curls into a prickly ball", ["Digs straight down into the dirt", "Runs back to its burrow", "Licks up ants with its tongue"],
     "Digging down is what it does on soft ground. On hard ground it \"curls into a prickly ball\"."),
    (R2 + "ART", 2, "Main idea", 2, "mainIdea", "This article is mostly about",
     "how echidnas live, eat and protect themselves", ["why an echidna is on the five-cent coin", "how echidnas are different from platypuses", "where to see echidnas in the wild"],
     "Most paragraphs describe the echidna's body, food, defence and babies. The coin and the platypus are each mentioned only once."),
    (R0 + "NARR", 0, "Finding details", 1, "findingDetail", "Why was Sam not pleased when Mr Martin asked him to show Ivy around?",
     "He wanted to work on the Lego tower at lunch.", ["He did not like having new students in the class.", "He would have to miss his sport lesson that day.", "Mr Martin had been cross with him that morning."],
     "The story says he \"had planned to spend lunchtime finishing the Lego tower\". Nothing suggests he dislikes new students."),
    (R0 + "NARR", 0, "Inference", 1, "inference", "Sam \"walked so fast that Ivy had to jog to keep up\". This suggests that Sam",
     "wanted to finish the tour quickly", ["was running late for a lesson", "wanted to show how fit he was", "had lost his way in the school"],
     "Sam rushes through the canteen, oval and toilets in a few words, so he can get to the library and his tower."),
    (R0 + "NARR", 0, "Figurative language", 1, "wordsInContext", "The tower had begun to \"lean like a tired tree\". This means the tower was",
     "tilting to one side", ["very old and worn", "made out of wood", "growing even taller"],
     "A tired tree droops and leans, and Raj fears it will fall. Ivy's fix makes it straighten."),
    (R0 + "NARR", 0, "Inference", 2, "inference", "How did Ivy know how to fix the tower?",
     "She had learned about wide bases from building at home.", ["Raj had told her exactly what she should do.", "She had read about towers in a library book.", "Mr Martin had shown her how on the first day."],
     "Ivy explains, \"We build stands for our water tanks at home,\" and that a wide bottom keeps the top up."),
    (R0 + "NARR", 0, "Change in feelings", 2, "inference", "How do the boys' feelings towards Ivy change?",
     "They go from not caring about her to wanting her help.", ["They go from liking her to being annoyed.", "They stay cross with her the whole time.", "They go from being scared of her to laughing at her."],
     "Sam rushes the tour at first, but after Ivy saves the tower he asks her to help finish it."),
]

# Sentences-removed sets: (stimulus, test, sentences for gaps 1-6, the unused sentence, explanations)
GAPS = [
    (R1 + "GAP", 1,
     ["A worker bee visits the flower to collect it.",
      "Waiting at the entrance are younger bees that work inside the hive.",
      "Most of it is water.",
      "The moving air dries the nectar until it is thick and sticky.",
      "The wax lid keeps the honey clean until it is needed.",
      "In her whole life, one worker bee makes only about a twelfth of a teaspoon of honey."],
     "Bees have five eyes: two large ones and three small ones on top of the head.",
     ["The next sentence begins \"She sucks up the nectar\", so the gap must bring in a female bee and the nectar she collects.",
      "\"These house bees\" in the next sentence needs a sentence that has just mentioned bees working inside the hive.",
      "The next sentence says the bees work \"to get rid of it\". Only \"Most of it is water\" gives something to get rid of.",
      "The gap comes right after the bees fan the nectar, so it should say what the fanning does: it dries the nectar.",
      "The gap follows the wax lid and comes before the honey is eaten in winter, so it explains what the lid is for.",
      "The paragraph is about how much work honey takes, and \"That is why\" in the next sentence needs a reason like one bee making only a tiny amount."]),
    (R2 + "GAP", 2,
     ["It is wrapped in a tough outer layer called a seed coat.",
      "It soaks up the water and becomes plump.",
      "Many seeds will not sprout if the soil is too cold.",
      "It grows downwards into the soil, holding the plant in place and drinking up water.",
      "Once it breaks through the soil, the first green leaves open.",
      "Some seeds are too old or damaged, and others are eaten by insects before they can sprout."],
     "The largest seed in the world comes from a palm tree and can weigh more than a bowling ball.",
     ["\"This seed coat\" in the next sentence needs a sentence that has just named the seed coat.",
      "The next sentence says \"As the seed swells\", so the gap must explain how water makes the seed swell.",
      "\"That is why gardeners plant in spring\" needs a reason linked to warmth, such as seeds not sprouting in cold soil.",
      "The gap follows \"the root\" and comes before the shoot grows \"the opposite way\", so it should say the root grows downwards.",
      "The shoot lives on stored food \"until it reaches the surface\", and \"From then on, the leaves\" needs the leaves to have opened.",
      "\"Not every seed grows\" needs reasons, and planting two or three in each hole makes sense only if some seeds fail."]),
]

# Extract sets: (stimulus, test, difficulty, statement, key letter, explanation)
EXTRACTS = [
    (R1 + "EXT", 1, 1, "Which extract describes a family member crying with happiness?", "C",
     "In Extract C, Grandad's face is wet \"not only from the rain\" when the rain finally comes after two dry years."),
    (R1 + "EXT", 1, 1, "Which extract tells the reader what equipment is needed?", "B",
     "Extract B begins \"You will need\" and lists a bottle, scissors, a ruler, tape and pebbles."),
    (R1 + "EXT", 1, 2, "Which extract describes the writer changing their mind about something?", "A",
     "The writer of Extract A \"didn't think I would like a rainy day, but it was actually fun\"."),
    (R1 + "EXT", 1, 1, "Which extract passes on a warning from the police?", "D",
     "Extract D reports that police are warning people never to go through floodwater."),
    (R1 + "EXT", 1, 2, "Which extract describes rain ending a long dry time?", "C",
     "Extract C starts \"For two years, not a drop\" and ends with heavy rain at last. The rain in Extract D causes a flood, but no dry spell is mentioned."),
    (R1 + "EXT", 1, 2, "Which extract describes rain spoiling a plan?", "A",
     "In Extract A the family could not go to the pool \"like Mum promised\" because of the rain."),
    (R1 + "EXT", 1, 1, "Which extract explains how to measure something?", "B",
     "Extract B explains how to build and read a rain gauge, which measures rainfall."),
    (R1 + "EXT", 1, 2, "Which extract is written like a news report?", "D",
     "Extract D reports a recent event with a place name, what happened to people involved and when the road will reopen, as a news report does."),
    (R2 + "EXT", 2, 1, "Which extract describes something made from a cereal box?", "A",
     "In Extract A the robot's body \"was a cereal box\"."),
    (R2 + "EXT", 2, 1, "Which extract tells the reader exactly how much of each thing to use?", "B",
     "Extract B gives amounts such as \"two cups of plain flour\" and \"half a cup of salt\"."),
    (R2 + "EXT", 2, 2, "Which extract describes a smell bringing back a memory?", "C",
     "When the writer of Extract C holds the wooden horse, they \"can still smell that shed\" from sixty years before."),
    (R2 + "EXT", 2, 1, "Which extract gives facts about recycling?", "D",
     "Extract D explains how plastic bottles are sorted, washed, chopped, melted and made into new things. Bolt the robot in Extract A is made from boxes, but that extract tells a story rather than giving facts."),
    (R2 + "EXT", 2, 2, "Which extract describes a grown-up praising a child's work?", "A",
     "In Extract A, Dad says the robot is \"good enough to go in a museum\"."),
    (R2 + "EXT", 2, 1, "Which extract includes a step that needs an adult's help?", "B",
     "Extract B asks an adult to pour in the boiling water."),
    (R2 + "EXT", 2, 2, "Which extract describes a gift?", "C",
     "In Extract C, the writer's father made them a wooden horse, which they still keep. Bolt the robot in Extract A was made by the child for themselves."),
    (R2 + "EXT", 2, 2, "Which extract says one way of doing something uses less energy?", "D",
     "Extract D says recycling a bottle \"uses less energy than making a new one from scratch\"."),
    (R0 + "EXT", 0, 1, "Which extract tells the reader what to do in an emergency?", "A",
     "Extract A tells swimmers caught in a rip to stay calm, float and raise one arm."),
    (R0 + "EXT", 0, 1, "Which extract describes boats at night?", "C",
     "In Extract C the family watches the fishing boats come in during the evening, \"their lights bobbing\"."),
    (R0 + "EXT", 0, 1, "Which extract explains where sand comes from?", "D",
     "Extract D says sand is made of rock and shell broken down by waves."),
    (R0 + "EXT", 0, 2, "Which extract describes a plan being ruined by the sea?", "B",
     "In Extract B a wave fills Mia's hole \"in a single gulp\" just before she finishes."),
    (R0 + "EXT", 0, 2, "Which extract compares something to an insect?", "C",
     "Extract C says the boats' lights were \"bobbing like fireflies\"."),
    (R0 + "EXT", 0, 2, "Which extract names a real place in Australia?", "D",
     "Extract D names Shell Beach in Western Australia. The other extracts do not name any place."),
    (R0 + "EXT", 0, 2, "Which extract describes a character laughing at a setback?", "B",
     "Mia laughs after the wave fills the hole she worked so hard on."),
    (R0 + "EXT", 0, 1, "Which extract explains what the flags on a beach mean?", "A",
     "Extract A says the red and yellow flags show where lifesavers are watching."),
]

# Two-text sets: (stimulus, test, difficulty, statement, key 0 A only / 1 B only / 2 both / 3 neither, explanation)
PAIRS = [
    (R1 + "PAIR", 1, 1, "Which text describes where wombats live?", 0,
     "Text A says wombats are found mainly in south-eastern Australia, including Tasmania. Text B is set near a farm but does not say where wombats live in general."),
    (R1 + "PAIR", 1, 2, "Which text shows that wombats are active at night?", 2,
     "Text A says wombats come out \"in the evening and at night\", and in Text B the wombat is met \"late at night\" in the headlights."),
    (R1 + "PAIR", 1, 1, "Which text describes a wombat's pouch?", 0,
     "Only Text A mentions the pouch, which opens towards the mother's back legs."),
    (R1 + "PAIR", 1, 1, "Which text tells of a meeting between people and a wombat?", 1,
     "In Text B, Sophie and her dad stop the car for a wombat on the road."),
    (R1 + "PAIR", 1, 2, "Which text gives the name for a baby wombat?", 0,
     "Text A says the baby is called a joey."),
    (R1 + "PAIR", 1, 2, "Which text describes what a wombat looks like?", 2,
     "Text A calls wombats \"sturdy\" and \"short-legged\", and Text B describes \"a round, grey shape\" as wide as a suitcase."),
    (R1 + "PAIR", 1, 1, "Which text includes words spoken by characters?", 1,
     "Text B has Sophie and Dad speaking. Text A is an information text with no characters."),
    (R1 + "PAIR", 1, 2, "Which text says how long wombats live?", 3,
     "Neither text gives a wombat's lifespan. Text A covers where they live, their pouch, burrows and food."),
    (R2 + "PAIR", 2, 1, "Which text mentions wearing a helmet?", 2,
     "Text A tells riders to wear a helmet, and in Text B Amira has leaves stuck in her helmet."),
    (R2 + "PAIR", 2, 1, "Which text gives instructions to the reader?", 0,
     "Text A tells \"you\" to squeeze the brakes, press the tyres and check the chain. Text B tells a story."),
    (R2 + "PAIR", 2, 1, "Which text describes a fall?", 1,
     "In Text B, Amira crashes into the hedge and scrapes her knee."),
    (R2 + "PAIR", 2, 1, "Which text mentions checking the brakes?", 0,
     "Only Text A says to squeeze both brakes before a ride."),
    (R2 + "PAIR", 2, 2, "Which text shows a character who wants to keep trying?", 1,
     "After crashing, Amira grins and says \"Again\"."),
    (R2 + "PAIR", 2, 2, "Which text mentions a bike's tyres?", 0,
     "Text A says to press on the tyres and pump them up if they are soft. Text B does not mention tyres."),
    (R2 + "PAIR", 2, 2, "Which text describes riding on a footpath?", 1,
     "Amira wobbles \"along the footpath\" in Text B. Text A does not say where to ride."),
    (R2 + "PAIR", 2, 2, "Which text says how long it takes to learn to ride?", 3,
     "Neither text gives a time. Text B shows Amira riding alone for the first time but not how long it took."),
]

EXTRACT_OPTIONS = ["Extract A", "Extract B", "Extract C", "Extract D"]
PAIR_OPTIONS = ["Text A only", "Text B only", "Both texts", "Neither text"]


def main():
    out, slot = [], 0
    order = []  # keep each stimulus's questions together, in the order of STIMULI
    for s in STIMULI:
        sid = s["id"]
        test = {"R1": 1, "R2": 2, "R0": 0}[sid.split("-")[1]]
        for st, t, skill, diff, basics, stem, key, wrong, expl in [x for x in SINGLES if x[0] == sid]:
            assert len(wrong) == 3 and key not in wrong, stem
            pos = slot % 4
            slot += 1
            opts = wrong[:pos] + [key] + wrong[pos:]
            order.append({"domain": COMP, "test": t, "skill": skill, "difficulty": diff, "format": "single", "basics": basics,
                          "stimulusId": sid, "stem": stem, "options": opts, "correct": [pos], "explanation": expl})
        for st, t, sentences, decoy, expls in [x for x in GAPS if x[0] == sid]:
            for g in range(6):
                others = [sentences[(g + k) % 6] for k in (1, 2, 3)]
                pool = [sentences[g], decoy] + others
                pos = (g * 2 + 1) % 5
                rest = pool[1:]
                opts = rest[:pos] + [sentences[g]] + rest[pos:]
                expl = expls[g] + f" The sentence about {'bees having five eyes' if 'eyes' in decoy else 'the largest seed'} fits none of the gaps."
                order.append({"domain": GAP, "test": t, "skill": "Text cohesion", "difficulty": 2, "format": "single",
                              "basics": "logicalCompletion", "stimulusId": sid, "stem": f"Which sentence best fits Gap {g + 1}?",
                              "options": opts, "correct": [pos], "explanation": expl})
        for st, t, diff, stem, letter, expl in [x for x in EXTRACTS if x[0] == sid]:
            order.append({"domain": CMP, "test": t, "skill": "Comparing texts", "difficulty": diff, "format": "single",
                          "basics": "crossText" if diff > 1 else "findingDetail", "stimulusId": sid, "stem": stem,
                          "options": EXTRACT_OPTIONS, "correct": ["ABCD".index(letter)], "lockedOrder": True, "explanation": expl})
        for st, t, diff, stem, key, expl in [x for x in PAIRS if x[0] == sid]:
            order.append({"domain": CMP, "test": t, "skill": "Comparing texts", "difficulty": diff, "format": "single",
                          "basics": "crossText", "stimulusId": sid, "stem": stem,
                          "options": PAIR_OPTIONS, "correct": [key], "lockedOrder": True, "explanation": expl})
    assert len(order) == len(SINGLES) + 6 * len(GAPS) + len(EXTRACTS) + len(PAIRS)
    here = os.path.dirname(os.path.abspath(__file__))
    for name, data in (("reading.json", order), ("reading_stimuli.json", STIMULI)):
        with open(os.path.join(here, name), "w") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            f.write("\n")
    print(f"wrote {len(order)} reading items, {len(STIMULI)} stimuli")


if __name__ == "__main__":
    main()
