"""KS2 English reading: original texts and questions.

Each practice test has three texts (fiction, non-fiction, poetry) with 8
questions each, like the real booklet's three texts in rising difficulty.
Content domain codes from the STA 2016 KS2 English reading test framework
(2a words in context, 2b retrieve, 2c summarise, 2d infer, 2e predict,
2f structure, 2g language choice, 2h compare) are in each item's skill.
Domains here: ks2Words (2a), ks2Retrieve (2b, 2c, 2f), ks2Infer (2d, 2e, 2g, 2h).
"""
from common import single, multi, order, matrix, numeric, poem

W, R, I = "ks2Words", "ks2Retrieve", "ks2Infer"
BW, BR, BI = "ks2WordMeaning", "ks2Retrieval", "ks2Inference"

STIMULI = [
    {
        "id": "KS2-T1-P1",
        "title": "The Lighthouse Key",
        "text": """Mira had lived on Gull Island for eleven years, and in all that time the old lighthouse had been locked.

'Nobody goes up there,' Grandad always said, tapping his pipe on the windowsill. 'Not since the new light was built on the point.'

So when Mira found the key, she did not tell him.

It was hidden in the biscuit tin at the back of the pantry, wrapped in a yellowed handkerchief. It was as long as her hand, heavy and cold, with a tag tied to it by a faded red ribbon. On the tag, in Grandad's careful handwriting, was a single word: LANTERN.

All through tea, the key sat in her pocket like a stone. She hardly tasted her soup. When Grandad asked about school, she answered in a voice that sounded too bright, even to her.

The next morning, the fog rolled in thick and grey. Mira pulled on her boots and followed the cliff path, counting the fence posts so that she would not lose her way. The lighthouse rose out of the mist like a giant's chess piece.

The lock was stiff. She had to use both hands, and when it finally turned, it gave a groan that echoed up the tower. Inside, a spiral staircase wound upwards into the gloom. Mira climbed one hundred and twelve steps, until her legs burned.

At the top was a small round room, and in the middle of it stood the great lamp, wrapped in a dust sheet. Pinned to the sheet was an envelope. On the front it said: *For Mira, when she is brave enough to come.*

Her hands shook as she opened it. Inside was a photograph of a young woman standing exactly where Mira stood now, laughing, with the sea sparkling behind her. Mira knew that face. She saw it every night, in the frame beside her bed.

It was her mum.""",
    },
    {
        "id": "KS2-T1-P2",
        "title": "Hedgehogs in Trouble",
        "text": """Have you ever heard snuffling and grunting under a hedge on a summer night? If so, you may have met one of Britain's best-loved animals: the hedgehog.

**What is a hedgehog?**

A hedgehog is a small mammal covered in thousands of sharp spines. When it is frightened, it rolls into a tight ball so that only its spines are showing. Few predators want a mouthful of prickles!

Hedgehogs are nocturnal, which means they sleep during the day and come out at night. In a single night, a hedgehog may wander up to two kilometres, searching for beetles, caterpillars, worms and slugs to eat.

**The long sleep**

In winter, food is hard to find, so hedgehogs hibernate. From about November to March, they sleep in a nest of dry leaves. Their heartbeat slows right down and their body cools, which helps them to save energy until spring.

**Why are they in trouble?**

Sadly, there are far fewer hedgehogs in Britain than there were thirty years ago. Many gardens are surrounded by solid fences and walls, so hedgehogs cannot travel from one garden to the next to find food and mates. Busy roads are dangerous, and very tidy gardens with no wild corners leave them with nowhere to nest.

**How you can help**

- Make a hedgehog highway: ask an adult to cut a hole about 13 centimetres square at the bottom of your fence.
- Leave a wild corner with a pile of logs or leaves.
- Put out a shallow dish of water. Never give a hedgehog milk, because it can make it ill.
- Check for sleeping hedgehogs before lighting a bonfire.

With a little help from us, hedgehogs could be snuffling under our hedges for many years to come.""",
    },
    {
        "id": "KS2-T1-P3",
        "title": "Grandma's Allotment in Winter",
        "text": poem("""The rows lie sleeping under frost,
the bean poles stand like bones;
a robin guards the compost heap
and sings to all the stones.

The shed door creaks its rusty song,
the water butt is ice;
we tap it with the garden fork
and crack it once, then twice.

Grandma says, 'It isn't dead,
it's only holding still.
The seeds are counting down the days
beneath the frozen hill.'

So we tidy up the empty beds
and dream of summer greens,
of strawberries as red as flags
and towers of runner beans.

And when we walk home in the dark,
our breath like dragon smoke,
I hear the garden whispering
the promise Grandma spoke."""),
    },
    {
        "id": "KS2-T2-P1",
        "title": "The Last Bus",
        "text": """Sam had been warned about the last bus.

'Ten past six,' Mum had said that morning, holding up six fingers and then ten. 'If you miss it, you'll be walking home from Ashby, and that's four miles.'

But the football match had gone to extra time, and then to penalties, and by the time Sam had found his other sock and his water bottle, the clock above the sports hall said seven minutes past six.

He ran. His bag thumped against his back, and his boots, tied together by their laces, swung round his neck like a pair of noisy cymbals. As he turned the corner into Station Road, he saw it: the green bus, with its doors already folding shut.

'Wait!' he yelled, but his voice disappeared into the rumble of the engine.

Then something strange happened. The doors opened again. Sam staggered up the steps, gasping, and found himself face to face with a driver he had never seen before: an old woman with silver plaits and a badge that said MAUREEN.

'Thought you might be a runner,' she said, and winked. 'Sit down before you fall down.'

Sam collapsed into the front seat. As the bus pulled away, he noticed something else. Every other seat was empty, but on each one sat a neat paper bag, and every paper bag had a name written on it.

The one beside him said SAM.""",
    },
    {
        "id": "KS2-T2-P2",
        "title": "How Honeybees Share the News",
        "text": """A honeybee hive can be home to tens of thousands of bees. Yet when one bee finds a field full of flowers, the others soon know exactly where to go. How do they do it? They dance.

**The round dance**

If the flowers are close to the hive, the bee who found them performs a round dance. She runs in small circles, first one way and then the other. The other bees crowd around her, smell the scent of the flowers on her body and fly out to search nearby.

**The waggle dance**

If the food is further away, the bee performs a waggle dance. She runs in a straight line, waggling her body from side to side, then loops back round and does it again, tracing a shape like a figure of eight.

The waggle dance is a kind of map. The direction of the straight run shows which way to fly, compared with the position of the sun. The length of the waggle shows how far away the food is: the longer the waggle, the further the journey.

**Who discovered it?**

For a long time, nobody knew how bees passed on directions. In the 1940s, an Austrian scientist called Karl von Frisch spent years watching bees in glass-sided hives. He worked out what the dances meant, and in 1973 he shared the Nobel Prize for his work.

**Why it matters**

Bees carry pollen from flower to flower, which helps plants to make fruit and seeds. Many of the foods we eat, such as apples and strawberries, depend on bees. Every dance that sends a bee to the right field is good news for farmers, too.""",
    },
    {
        "id": "KS2-T2-P3",
        "title": "The Fog Comes to Town",
        "text": poem("""The fog came in on Tuesday night,
a great grey hound without a sound;
it gobbled up the lamppost light
and laid its belly on the ground.

It licked the windows of the shops,
it curled around the chimney pots,
it hid the church clock's golden hands
and wrapped the boats in woolly knots.

The milkman lost his way at five,
the seagulls sulked upon the pier;
the ferry hooted, 'Who's alive?'
and nobody could answer, 'Here!'

But Wednesday brought a gust of wind
that chased the creature out to sea,
and in its place the morning grinned,
as bright and blue as it could be."""),
    },
    {
        "id": "KS2-D-P1",
        "title": "The Sandcastle Competition",
        "text": """Every August, the village of Polgrean held a sandcastle competition, and every August, Leo's big sister, Tess, won it.

This year, Leo had a plan. While Tess built her usual tall castle with towers and a moat, Leo walked to the far end of the beach, where the sand was dark and wet. He worked all morning without stopping, even when his ice cream melted down his arm.

At two o'clock, the judges strolled along the beach with their clipboards. They admired Tess's towers. They nodded at the moat. Then they reached Leo's spot, and stopped.

Leo had not built a castle at all. He had built a turtle, as big as a rowing boat, with a shell made of hundreds of tiny shells he had collected one by one. Its flippers stretched towards the sea, as if it was about to swim away.

'Well,' said the head judge, scratching his beard. 'That is something.'

Tess came over to look. For a long moment she said nothing. Then she grinned and put her bucket on Leo's head like a crown.

'Fine,' she said. 'You win. But next year, I'm building a whale.'""",
    },
    {
        "id": "KS2-D-P2",
        "title": "How to Make a Pine Cone Bird Feeder",
        "text": """Winter can be a hungry time for garden birds. This simple feeder will help them, and you will be able to watch them from your window.

**You will need:**

- a large, open pine cone
- a piece of string about 50 centimetres long
- 2 tablespoons of lard or vegetable suet, softened
- bird seed
- a bowl and a spoon

**What to do:**

1. Tie the string tightly around the top of the pine cone, leaving a long end for hanging.

2. Put the lard in the bowl and mix in the bird seed until it looks like crumbly dough.

3. Using the spoon, press the mixture into all the gaps in the pine cone.

4. Put the pine cone in the fridge for an hour to set.

5. Hang it from a branch, at least 2 metres from any fence, so that cats cannot reach it.

**Top tip:** Be patient. Birds may take a few days to find your feeder. Once they do, keep a notebook and record which birds visit.""",
    },
]

TF = ["True", "False"]

T1 = [
    # Text 1: The Lighthouse Key
    single(R, "Retrieve (2b)", 1, "Where was the key hidden?",
           ["In a biscuit tin in the pantry", "Under Grandad's pipe", "In the frame beside Mira's bed", "In the lighthouse door"], 0,
           "The text says the key 'was hidden in the biscuit tin at the back of the pantry'. The frame beside her bed held a photograph, not the key.",
           BR, stimulusId="KS2-T1-P1"),
    single(W, "Word meaning (2a)", 2, "'She answered in a voice that sounded too bright, even to her.' What does *bright* mean here?",
           ["Falsely cheerful", "Full of light", "Very clever", "Loud and sharp"], 0,
           "Mira is hiding a secret, so she sounds cheerful on purpose, and even she can hear that it is not real. *Bright* does not mean clever here, because nothing in the sentence is about being smart.",
           BW, stimulusId="KS2-T1-P1"),
    single(I, "Inference (2d)", 2, "Why do you think Mira did not tell Grandad about the key?",
           ["She thought he would stop her going", "She was planning to sell the key", "She had forgotten that she had found it", "He was away from the island that day"], 0,
           "Grandad always said 'Nobody goes up there', so Mira guessed he would say no. She cannot have forgotten, because the key 'sat in her pocket like a stone' all through tea.",
           BI, stimulusId="KS2-T1-P1"),
    single(R, "Retrieve (2b)", 1, "How did Mira make sure she did not get lost in the fog?",
           ["She counted the fence posts", "She followed the sound of the sea", "She carried a lantern", "She walked with Grandad"], 0,
           "The text says she 'followed the cliff path, counting the fence posts so that she would not lose her way'. She went alone, without Grandad.",
           BR, stimulusId="KS2-T1-P1"),
    single(I, "Language choice (2g)", 2, "'The lighthouse rose out of the mist like a giant's chess piece.' What does this comparison help you to picture?",
           ["A tall shape standing alone", "A lighthouse that was falling down", "A lighthouse painted in squares", "A lighthouse that was moving"], 0,
           "A chess piece stands tall and on its own, and *giant's* makes it huge, so the lighthouse looks like one tall shape in the fog. Nothing suggests it was painted in squares.",
           BI, stimulusId="KS2-T1-P1"),
    order(R, "Sequence (2f)", 2, "Put these events in the order they happen in the story.",
          ["Mira finds the key in the pantry.", "Mira eats her tea with the key in her pocket.", "Mira walks along the cliff path in the fog.",
           "Mira climbs the spiral staircase.", "Mira opens the envelope."],
          "The story goes from finding the key, to tea that evening, to the walk the next morning, to the climb, and finally to the envelope at the top.",
          BR, stimulusId="KS2-T1-P1"),
    multi(I, "Inference (2d)", 3, "Which **two** pieces of evidence show that nobody had used the lighthouse for a long time?",
          ["The lock was stiff.", "The lamp was wrapped in a dust sheet.", "The fog was thick and grey.", "There were 112 steps.", "Grandad tapped his pipe."], [0, 1],
          "A stiff lock and a lamp under a dust sheet both suggest a place left closed for years. The number of steps tells us how tall the tower is, not how long it was empty.",
          BI, select=2, stimulusId="KS2-T1-P1"),
    matrix(R, "Retrieve (2b)", 2, "Is each statement true or false?",
           ["Mira had lived on Gull Island for eleven years.", "The old lighthouse was still used to guide ships.",
            "Mira climbed more than one hundred steps.", "The envelope was hidden in the biscuit tin."],
           TF, [0, 1, 0, 1],
           "Mira had lived there eleven years and climbed 112 steps. The old lighthouse stopped being used when the new light was built, and the envelope was pinned to the dust sheet, not in the tin.",
           BR, stimulusId="KS2-T1-P1"),
    # Text 2: Hedgehogs in Trouble
    single(R, "Retrieve (2b)", 1, "What does a hedgehog do when it is frightened?",
           ["Rolls into a tight ball", "Runs to the nearest hedge", "Hides under dry leaves", "Makes a loud grunting noise"], 0,
           "The text says that when it is frightened 'it rolls into a tight ball so that only its spines are showing'. Grunting is mentioned, but as a night-time sound, not a reaction to fear.",
           BR, stimulusId="KS2-T1-P2"),
    single(W, "Word meaning (2a)", 1, "What does *nocturnal* mean?",
           ["Awake at night, asleep by day", "Covered in sharp, prickly spines", "Asleep all through the winter", "Able to travel a very long way"], 0,
           "The text explains it straight away: 'which means they sleep during the day and come out at night'. Sleeping all winter is hibernating, a different word.",
           BW, stimulusId="KS2-T1-P2"),
    single(R, "Retrieve (2b)", 1, "When do hedgehogs usually hibernate?",
           ["From about November to March", "From about March to November", "Only in December", "During hot summer days"], 0,
           "The section 'The long sleep' says 'From about November to March'. The other way round would be spring to autumn, when hedgehogs are busy feeding.",
           BR, stimulusId="KS2-T1-P2"),
    single(R, "Summarise (2c)", 2, "Which sentence best sums up the section *Why are they in trouble?*",
           ["Hedgehogs are losing safe ways to travel, feed and nest.", "Hedgehogs eat too many slugs and beetles.", "Hedgehogs sleep for too long in winter.", "Hedgehogs are dangerous to people on busy roads."], 0,
           "The section lists fences, roads and tidy gardens: all things that stop hedgehogs moving, feeding or nesting safely. The roads are dangerous to hedgehogs, not the other way round.",
           stimulusId="KS2-T1-P2"),
    single(R, "Structure (2f)", 2, "Why has the writer used bullet points in the section *How you can help*?",
           ["To make each tip easy to read and follow", "To tell the story of one hedgehog", "To show how hedgehogs feel", "To give the dates of hibernation"], 0,
           "Each bullet point is a separate thing the reader can do, so the list is quick to read and follow. The dates of hibernation are in a different section.",
           stimulusId="KS2-T1-P2"),
    single(I, "Inference (2d)", 2, "Why does the writer say 'Few predators want a mouthful of prickles!'?",
           ["To show that the spines protect hedgehogs", "To show that hedgehogs often like to bite", "To warn readers never to eat hedgehogs", "To explain what hedgehogs like to eat"], 0,
           "An animal that tries to eat a rolled-up hedgehog gets a mouthful of spines, so the spines protect it. The sentence is about predators, not about what hedgehogs eat.",
           BI, stimulusId="KS2-T1-P2"),
    numeric(R, "Retrieve (2b)", 1, "How wide should the hole for a hedgehog highway be, in centimetres? Type the number only.", ["13"],
            "The first tip says to cut 'a hole about 13 centimetres square at the bottom of your fence'.",
            BR, whole=True, stimulusId="KS2-T1-P2"),
    single(I, "Inference (2d)", 3, "What does the writer think about helping hedgehogs?",
           ["People can make a real difference", "Nothing can save hedgehogs now", "Only experts should try to help", "Hedgehogs should be kept as pets"], 0,
           "The writer gives four tips and ends by saying hedgehogs could be around 'for many years to come' with our help. The text never says only experts should help.",
           BI, stimulusId="KS2-T1-P2"),
    # Text 3: Grandma's Allotment in Winter
    single(W, "Word meaning (2a)", 2, "'a robin guards the compost heap'. Which word is closest in meaning to *guards*?",
           ["Watches over", "Eats from", "Builds on", "Digs up"], 0,
           "To guard something is to watch over it and keep it safe, as if the robin owns the heap. *Eats* is a different action that the poem does not describe.",
           BW, stimulusId="KS2-T1-P3"),
    single(I, "Language choice (2g)", 2, "'the bean poles stand like bones'. What impression does this give of the allotment?",
           ["Bare and lifeless", "Busy and noisy", "Warm and sunny", "Full of vegetables"], 0,
           "In winter the bean poles have no plants on them, so they look thin and bare like bones. The allotment is not full of vegetables until the summer the family dreams of.",
           BI, stimulusId="KS2-T1-P3"),
    single(I, "Inference (2d)", 2, "Grandma says, 'It isn't dead, it's only holding still.' What does she mean?",
           ["The garden is resting until spring", "The garden will never grow again", "The plants are hiding from the robin", "The garden needs a lot more water"], 0,
           "She explains that 'the seeds are counting down the days', so life is waiting under the frost until spring. She is saying the opposite of 'it will never grow again'.",
           BI, stimulusId="KS2-T1-P3"),
    single(W, "Word meaning (2a)", 2, "'So we tidy up the empty beds'. What are *beds* in this poem?",
           ["Patches of soil for plants", "Places where people sleep", "Wooden boxes for tools", "Piles of fallen leaves"], 0,
           "On an allotment, beds are the strips of soil where vegetables are planted, and in winter they are empty. Nobody is sleeping in the garden.",
           BW, stimulusId="KS2-T1-P3"),
    single(I, "Language choice (2g)", 1, "'our breath like dragon smoke'. What does this tell you about the evening?",
           ["It was very cold", "Something was burning", "It was very windy", "It was a warm night"], 0,
           "On a cold night your breath turns into clouds you can see, like smoke from a dragon's mouth. There is no fire in the poem.",
           BI, stimulusId="KS2-T1-P3"),
    single(I, "Inference (2d)", 3, "How does the child feel about the allotment by the end of the poem?",
           ["Hopeful about the summer to come", "Bored and wanting to go home", "Sad that the garden has died", "Frightened of the dark"], 0,
           "The child dreams of strawberries and runner beans and hears 'the promise Grandma spoke', that the garden will grow again. They do not think it has died.",
           BI, stimulusId="KS2-T1-P3"),
    single(I, "Comparison (2h)", 3, "How is the allotment described in verse 4 different from verse 1?",
           ["Verse 1 shows it frozen now; verse 4 imagines it full in summer.", "Verse 1 is in summer; verse 4 is in winter.", "Verse 1 is about the shed; verse 4 is about the robin.", "Verse 1 is happy; verse 4 is frightened."], 0,
           "Verse 1 describes frost and bare poles, while verse 4 dreams of strawberries and runner beans. Both verses happen in winter, but verse 4 looks ahead to summer.",
           BI, stimulusId="KS2-T1-P3"),
    multi(R, "Retrieve (2b)", 2, "Which **two** words from the poem describe sounds?",
          ["creaks", "whispering", "frost", "poles", "dark"], [0, 1],
          "The shed door *creaks* and the garden is *whispering*: both are sounds. Frost, poles and dark are things you see or feel.",
          BR, select=2, stimulusId="KS2-T1-P3"),
]

T2 = [
    # Text 1: The Last Bus
    single(R, "Retrieve (2b)", 1, "What time did the last bus leave?",
           ["Ten past six", "Seven minutes past six", "Six o'clock", "Ten past seven"], 0,
           "Mum said 'Ten past six'. Seven minutes past six was the time on the sports hall clock when Sam started running.",
           BR, stimulusId="KS2-T2-P1"),
    single(R, "Retrieve (2b)", 1, "Why was Sam late leaving the sports hall?",
           ["The match went to penalties", "He had lost his bus ticket", "He was talking to his friends", "His mum was late collecting him"], 0,
           "The text says the match 'had gone to extra time, and then to penalties', and then he had to find his sock and water bottle. He was catching the bus, not waiting for Mum.",
           BR, stimulusId="KS2-T2-P1"),
    single(I, "Language choice (2g)", 2, "'his boots ... swung round his neck like a pair of noisy cymbals'. What does this show?",
           ["The boots clanged together", "Sam was playing some music", "The boots were brand new", "Sam had stopped for a rest"], 0,
           "Cymbals crash when they hit each other, so the boots were clanging together as Sam ran. He was running, not resting.",
           BI, stimulusId="KS2-T2-P1"),
    single(W, "Word meaning (2a)", 2, "'Sam staggered up the steps'. What does *staggered* mean?",
           ["Walked unsteadily", "Skipped happily", "Crept quietly", "Marched proudly"], 0,
           "Sam was 'gasping' after his run, so he walked up the steps unsteadily, almost falling. Maureen even says 'Sit down before you fall down'.",
           BW, stimulusId="KS2-T2-P1"),
    single(I, "Inference (2d)", 3, "Maureen says, 'Thought you might be a runner.' What does this suggest?",
           ["She had been expecting Sam to come running", "She had seen Sam win a race", "She wanted Sam to join a running club", "She was cross that Sam was late"], 0,
           "She opens the doors again and seems to know Sam is coming, and there is even a bag with his name on it. She winks, so she is not cross.",
           BI, stimulusId="KS2-T2-P1"),
    single(I, "Prediction (2e)", 2, "Using the ending, what is Sam most likely to do next?",
           ["Look inside the bag marked SAM", "Get off the bus at the next stop", "Run back to the sports hall", "Fall asleep on the back seat"], 0,
           "The story ends with a bag marked SAM right beside him, so he will almost certainly look inside. Nothing suggests he wants to get off.",
           BI, stimulusId="KS2-T2-P1"),
    order(R, "Sequence (2f)", 2, "Put these events in the order they happen in the story.",
          ["The match goes to penalties.", "Sam finds his other sock.", "Sam turns into Station Road.", "The bus doors open again.", "Sam sits in the front seat."],
          "First the match goes to penalties, then Sam finds his sock, runs into Station Road, the doors open again and he sits down.",
          BR, stimulusId="KS2-T2-P1"),
    matrix(R, "Retrieve (2b)", 2, "Is each statement true or false?",
           ["Ashby is four miles from Sam's home.", "Sam's boots were in his bag.", "The bus was green.", "Sam knew the driver."],
           TF, [0, 1, 0, 1],
           "Mum says walking home from Ashby is four miles, and the bus is green. His boots were round his neck, and the driver was 'a driver he had never seen before'.",
           BR, stimulusId="KS2-T2-P1"),
    # Text 2: How Honeybees Share the News
    single(R, "Retrieve (2b)", 1, "How many bees can live in one hive?",
           ["Tens of thousands", "About a hundred", "Exactly eight", "One for each flower"], 0,
           "The first sentence says a hive 'can be home to tens of thousands of bees'.",
           BR, stimulusId="KS2-T2-P2"),
    matrix(R, "Retrieve (2b)", 2, "Does each description match the round dance or the waggle dance?",
           ["Used when the food is close to the hive", "The bee waggles her body from side to side", "Traces a shape like a figure of eight", "The bee runs in small circles"],
           ["Round dance", "Waggle dance"], [0, 1, 1, 0],
           "The round dance is small circles for food nearby. The waggle dance has the waggling straight run and loops round in a figure of eight.",
           BR, stimulusId="KS2-T2-P2"),
    single(W, "Word meaning (2a)", 1, "'The other bees crowd around her'. Which word is closest in meaning to *crowd*?",
           ["Gather closely", "Shout loudly", "Push away", "Count up"], 0,
           "To crowd around something is to gather close to it, so the bees can smell the flowers on the dancer. They are not pushing her away.",
           BW, stimulusId="KS2-T2-P2"),
    single(I, "Inference (2d)", 2, "Why does the writer call the waggle dance 'a kind of map'?",
           ["It shows which way to fly and how far to go", "It is drawn on paper inside the hive", "It shows where the hive is", "It is a picture of the flowers"], 0,
           "A map shows direction and distance, and the dance does both: the straight run gives the direction and the length of the waggle gives the distance. Nothing is drawn on paper.",
           BI, stimulusId="KS2-T2-P2"),
    numeric(R, "Retrieve (2b)", 1, "In which year did Karl von Frisch share the Nobel Prize?", ["1973"],
            "The text says 'in 1973 he shared the Nobel Prize for his work'. The 1940s is when he was watching the bees.",
            BR, whole=True, stimulusId="KS2-T2-P2"),
    single(I, "Inference (2d)", 2, "Why do you think Karl von Frisch used glass-sided hives?",
           ["So he could watch the dances", "So that the bees could see out", "To keep the hives nice and warm", "To stop the bees from flying away"], 0,
           "He 'spent years watching bees', and glass sides let him watch the dances inside the hive. The bees could still leave to find flowers.",
           BI, stimulusId="KS2-T2-P2"),
    single(R, "Summarise (2c)", 2, "Which sentence best sums up the section *Why it matters*?",
           ["Bees help plants to make much of the food we eat.", "Farmers teach bees how to dance.", "Strawberries are the bees' favourite food.", "Bees only visit apple trees."], 0,
           "The section explains that carrying pollen helps plants make fruit and seeds, and many foods depend on that. Apples and strawberries are examples, not the main point.",
           stimulusId="KS2-T2-P2"),
    single(R, "Structure (2f)", 3, "The first paragraph asks 'How do they do it?' and then answers 'They dance.' Why has the writer done this?",
           ["To make the reader curious before giving the answer", "To show that the writer does not know the answer", "To tell the reader to stop reading", "To list the facts in the text"], 0,
           "Asking a question makes the reader want to know the answer, and the short reply is a surprise that pulls them in. The writer answers it at once, so they do know.",
           stimulusId="KS2-T2-P2"),
    # Text 3: The Fog Comes to Town
    single(R, "Retrieve (2b)", 1, "In the first verse, what is the fog compared to?",
           ["A dog", "A cat", "A seagull", "A horse"], 0,
           "The fog is 'a great grey hound', and a hound is a kind of dog.",
           BR, stimulusId="KS2-T2-P3"),
    single(W, "Word meaning (2a)", 2, "'it gobbled up the lamppost light'. What does *gobbled up* mean here?",
           ["Hid it completely", "Switched it on", "Made it brighter", "Repaired it"], 0,
           "The fog is so thick that the lamppost light can no longer be seen, as if it has been eaten. It made the light disappear, not brighter.",
           BW, stimulusId="KS2-T2-P3"),
    single(W, "Word meaning (2a)", 2, "'the seagulls sulked upon the pier'. What does *sulked* mean?",
           ["Were quiet and grumpy", "Flew away very quickly", "Squawked loudly with joy", "Searched for scraps of food"], 0,
           "To sulk is to be quiet and grumpy, so the seagulls seem fed up with the fog. Nothing about them is joyful.",
           BW, stimulusId="KS2-T2-P3"),
    single(I, "Inference (2d)", 1, "Why did the milkman lose his way?",
           ["He could not see in the fog", "He was new to the town", "His van had broken down", "The roads had been closed"], 0,
           "The whole poem is about the thick fog hiding everything, so the milkman could not see where he was going. Nothing is said about his van or the roads.",
           BI, stimulusId="KS2-T2-P3"),
    single(I, "Inference (2d)", 3, "'the ferry hooted, \"Who's alive?\" / and nobody could answer, \"Here!\"' What do these lines suggest?",
           ["The fog made the town seem empty and lonely", "Everyone in the town had left on the ferry", "The ferry had sunk in the harbour", "People were angry with the ferry"], 0,
           "In the fog nobody can be seen or heard, so the town feels empty, as if no one is there to answer. Nobody actually left on the ferry.",
           BI, stimulusId="KS2-T2-P3"),
    single(I, "Comparison (2h)", 3, "How is the last verse different from the first three verses?",
           ["The fog is chased away and the mood becomes bright", "The fog grows thicker and the mood becomes darker", "The poem moves from the town to the countryside", "The poem changes from day to night"], 0,
           "In the last verse the wind chases 'the creature out to sea' and the morning is 'bright and blue', after three gloomy verses. It moves from night to morning, not day to night.",
           BI, stimulusId="KS2-T2-P3"),
    single(I, "Language choice (2g)", 2, "'the morning grinned'. What does this suggest about the morning?",
           ["It was sunny and cheerful", "It was foggy and grey", "It was noisy and busy", "It was cold and windy"], 0,
           "A grin is a big happy smile, so the morning feels sunny and cheerful, and the next line says it was 'bright and blue'. The fog has gone by then.",
           BI, stimulusId="KS2-T2-P3"),
    multi(I, "Language choice (2g)", 2, "Which **two** phrases show the fog behaving like an animal?",
          ["laid its belly on the ground", "licked the windows of the shops", "the ferry hooted", "bright and blue", "the church clock's golden hands"], [0, 1],
          "Lying on its belly and licking windows are things an animal does, so the fog is acting like the hound. The ferry hooting is a real sound from a boat, not the fog.",
          BI, select=2, stimulusId="KS2-T2-P3"),
]

DRILL = [
    # The Sandcastle Competition
    single(R, "Retrieve (2b)", 1, "Where did Leo build his sand sculpture?",
           ["Where the sand was dark and wet", "Right next to Tess's castle", "Up in the village square", "In the shallow water by the rocks"], 0,
           "The text says Leo 'walked to the far end of the beach, where the sand was dark and wet'. He deliberately went away from Tess.",
           BR, stimulusId="KS2-D-P1"),
    single(W, "Word meaning (2a)", 1, "'the judges strolled along the beach'. What does *strolled* mean?",
           ["Walked slowly and calmly", "Ran as fast as they could", "Crawled on their knees", "Jumped from rock to rock"], 0,
           "To stroll is to walk slowly in a relaxed way, which fits judges looking at each sandcastle in turn.",
           BW, stimulusId="KS2-D-P1"),
    single(I, "Inference (2d)", 2, "Leo kept working 'even when his ice cream melted down his arm'. What does this show?",
           ["He was concentrating hard", "He did not like ice cream", "The day was very cold", "He wanted to give up soon"], 0,
           "He was so focused on building that he did not stop to eat his ice cream. A melting ice cream suggests a warm day, not a cold one.",
           BI, stimulusId="KS2-D-P1"),
    single(R, "Retrieve (2b)", 1, "What was the turtle's shell made of?",
           ["Hundreds of tiny shells", "Wet seaweed", "Pebbles from the beach", "Tess's bucket"], 0,
           "The shell was 'made of hundreds of tiny shells he had collected one by one'. Tess's bucket ended up on Leo's head.",
           BR, stimulusId="KS2-D-P1"),
    single(I, "Inference (2d)", 2, "How does Tess feel about Leo winning?",
           ["Proud of him, in a good-humoured way", "Furious with him", "Bored by the whole competition", "Frightened of the judges"], 0,
           "She grins and puts her bucket on his head 'like a crown', which is a friendly, proud thing to do. A furious sister would not crown him.",
           BI, stimulusId="KS2-D-P1"),
    single(I, "Prediction (2e)", 2, "'But next year, I'm building a whale.' What does this suggest Tess will do?",
           ["Try even harder to win next year", "Stop entering the competition", "Help Leo build a turtle", "Move away from Polgrean"], 0,
           "A whale is even bigger than a turtle, so Tess is planning to beat Leo next year. She is not giving up.",
           BI, stimulusId="KS2-D-P1"),
    # How to Make a Pine Cone Bird Feeder
    single(R, "Structure (2f)", 1, "Why are the steps in *What to do* numbered?",
           ["So you do them in order", "To show how many birds will visit", "To count the pine cones needed", "To show which step is the hardest"], 0,
           "Instructions are numbered because the order matters: you cannot hang the feeder before you have filled it.",
           BR, stimulusId="KS2-D-P2"),
    numeric(R, "Retrieve (2b)", 1, "How long should the piece of string be, in centimetres? Type the number only.", ["50"],
            "The list says 'a piece of string about 50 centimetres long'.",
            BR, whole=True, stimulusId="KS2-D-P2"),
    single(R, "Retrieve (2b)", 1, "Why should the feeder hang at least 2 metres from a fence?",
           ["So that cats cannot reach it", "So that it gets more sunshine", "So that the string does not break", "So that you can see it from the window"], 0,
           "Step 5 says to hang it away from a fence 'so that cats cannot reach it'. Seeing it from the window is mentioned at the start, not as the reason.",
           BR, stimulusId="KS2-D-P2"),
    single(W, "Word meaning (2a)", 2, "'mix in the bird seed until it looks like crumbly dough'. What does *crumbly* mean?",
           ["Falling into small bits", "Smooth and runny", "Hard as a rock", "Bright and colourful"], 0,
           "Something crumbly breaks into small bits, like crumbs. Runny would mean it pours, which would not stick in a pine cone.",
           BW, stimulusId="KS2-D-P2"),
    single(I, "Inference (2d)", 2, "Why does the writer say 'Be patient'?",
           ["Birds may not come at once", "The lard takes a week to soften", "Pine cones are hard to find", "The string is difficult to tie"], 0,
           "The next sentence explains: 'Birds may take a few days to find your feeder.' The lard only needs an hour in the fridge.",
           BI, stimulusId="KS2-D-P2"),
    order(R, "Sequence (2f)", 1, "Put the steps for making the feeder in order.",
          ["Tie the string around the pine cone.", "Mix the bird seed into the lard.", "Press the mixture into the pine cone.", "Put the pine cone in the fridge.", "Hang the feeder from a branch."],
          "The numbered steps go: tie the string, mix the seed and lard, press it in, chill it, then hang it up.",
          BR, stimulusId="KS2-D-P2"),
]
