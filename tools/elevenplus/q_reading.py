"""English: reading comprehension. Six original passages, six questions each."""
from common import item, rotate

D = "elevenplusReading"
ITEMS = []
STIMULI = []
_k = [2]

FIND, INFER, WORD = "elevenplusFindIt", "elevenplusReadBetween", "elevenplusWordMeaning"


def passage(pid, title, text):
    STIMULI.append({"id": pid, "title": title, "text": text})


def q(pid, test, skill, diff, stem, key, others, expl, basics=None):
    opts, idx = rotate([key] + others, key, _k[0])
    _k[0] += 3
    extra = {"stimulusId": pid}
    if basics:
        extra["basics"] = basics
    ITEMS.append(item(D, test, skill, diff, stem, opts, idx, expl, **extra))


# ---------------- Test 1, passage 1: fiction ----------------
P = "ELEVEN-P1"
passage(P, "The Lamp at Gull Point", """The storm arrived an hour before dark, flinging rain against the cottage windows like handfuls of gravel. Mara pressed her nose to the glass and watched the sea heave itself up the rocks below Gull Point.

"Grandad, shouldn't we light the lamp?" she asked.

Her grandfather did not answer. He was asleep in his armchair, his bad leg propped on a stool, the newspaper slipping from his fingers. The doctor had told him to rest for a fortnight, and for once he had listened.

Mara looked at the brass key hanging by the door. She had climbed the lighthouse stairs a hundred times, but always behind Grandad, always carrying the tea flask while he carried the key. She knew every step of the routine: trim the wick, polish the glass, strike the match, wind the clockwork that turned the great lens.

Somewhere out in the grey, a ship's horn moaned.

Mara took the key.

The wind tore at her coat as she crossed the yard, and the iron door of the tower groaned on its hinges. Inside, the stairs spiralled up into darkness. She counted them under her breath, the way Grandad did: one hundred and twelve. By the top her legs were shaking, but her hands were steady as she struck the match.

The flame caught. Mara wound the handle until the clockwork clicked, and slowly, solemnly, the beam began to sweep across the water.

When she came back down, soaked to the skin, Grandad was standing in the cottage doorway, leaning on his stick. He did not scold her. He simply looked up at the turning light, then at Mara, and nodded once, the way he nodded at the end of a job well done.""")

q(P, 1, "Finding information", 1, "Why was Mara's grandfather not able to light the lamp himself?",
  "He was asleep, resting his bad leg as the doctor had told him.", ["He had lost the key to the lighthouse.", "He was out in the storm looking for a ship.", "He did not know how to work the clockwork."],
  "The passage says he was asleep in his armchair, his bad leg propped on a stool, because \"the doctor had told him to rest for a fortnight\". He still had the key; it hung by the door.", FIND)
q(P, 1, "Figurative language", 2, "The rain is described as hitting the windows \"like handfuls of gravel\". What does this suggest about the rain?",
  "It was heavy and hit the glass hard.", ["It was gentle and quiet.", "It was full of small stones.", "It had only just started to fall."],
  "Gravel thrown at glass makes a hard, rattling noise, so the simile shows the rain was heavy and noisy. It does not mean real stones were falling.", INFER)
q(P, 1, "Inference", 2, "Why did Mara take the key after she heard the ship's horn?",
  "She realised a ship needed the light to stay safe.", ["She wanted to wake her grandfather up.", "She was frightened of the storm and wanted to hide.", "She had been told to light the lamp at that time."],
  "The horn tells her a ship is out in the storm, and a lighthouse warns ships away from rocks. Nobody had told her to go; she decided for herself.", INFER)
q(P, 1, "Word meaning", 2, "In the sentence \"slowly, solemnly, the beam began to sweep across the water\", the word **solemnly** is closest in meaning to:",
  "seriously", ["cheerfully", "carelessly", "noisily"],
  "Solemnly means in a serious, dignified way, which suits the important moment of the light turning. Cheerfully and carelessly do not fit the careful mood.", WORD)
q(P, 1, "Finding information", 1, "How many stairs are there in the lighthouse?",
  "One hundred and twelve", ["One hundred", "One hundred and two", "Two hundred and twelve"],
  "Mara counts the stairs \"the way Grandad did: one hundred and twelve\". The \"hundred times\" earlier is how often she had climbed them.", FIND)
q(P, 1, "Character and feelings", 3, "What does Grandad's nod at the end of the story show?",
  "He was proud of Mara's careful work.", ["He was too tired to speak to her.", "He was angry but did not want to shout.", "He was surprised that the lamp still worked."],
  "The narrator says he nodded \"the way he nodded at the end of a job well done\", and he \"did not scold her\". That shows approval and pride, not anger.", INFER)

# ---------------- Test 1, passage 2: non-fiction ----------------
P = "ELEVEN-P2"
passage(P, "Help for Hedgehogs", """Hedgehogs were once a common sight in British gardens, but their numbers have fallen sharply in recent decades. Wildlife groups believe there are several reasons. Hedges have been removed to make bigger fields, roads cut across the places where hedgehogs feed, and many gardens are now surrounded by solid fences or walls.

That last problem matters more than you might think. A hedgehog may travel a mile or more in a single night, snuffling for beetles, caterpillars and worms. If every garden is sealed off, it cannot reach enough food or find a mate.

The good news is that one of the simplest ways to help costs almost nothing. Many people now cut a small hole, about 13 centimetres square, at the bottom of their fence. This is big enough for a hedgehog but too small for most pets. When neighbours do the same, a chain of gardens becomes a "hedgehog highway".

There are other ways to help, too. Leaving a corner of the garden a little wild, with a pile of logs or leaves, gives hedgehogs somewhere to shelter and to hibernate through the winter, usually from about November until March. A shallow dish of fresh water is welcome in dry weather. However, you should never put out bread or milk: milk can make hedgehogs very ill. If you want to offer food, meaty cat or dog food is far safer.

Finally, check before you strim long grass or light a bonfire, as a hedgehog may be sleeping inside. A few careful minutes could save a life.""")

q(P, 1, "Main idea", 2, "What is the main purpose of this text?",
  "To explain hedgehogs' decline and how to help", ["To describe what hedgehogs look like", "To persuade people to keep hedgehogs as pets", "To tell a story about one hedgehog's journey"],
  "The first paragraph gives reasons numbers have fallen and the rest of the text lists ways to help. It never suggests keeping hedgehogs as pets.")
q(P, 1, "Finding information", 1, "According to the text, why do solid fences cause a problem for hedgehogs?",
  "They stop hedgehogs reaching food and mates.", ["Hedgehogs injure themselves trying to climb them.", "They make gardens too dark for hedgehogs to see.", "They keep pets in gardens where hedgehogs live."],
  "The second paragraph says that if every garden is sealed off, a hedgehog \"cannot reach enough food or find a mate\".", FIND)
q(P, 1, "Finding information", 1, "How big should a hole in a fence be, according to the text?",
  "About 13 centimetres square", ["About 13 metres square", "About 30 centimetres square", "Big enough for a cat to fit through"],
  "The text says \"about 13 centimetres square\", which is big enough for a hedgehog \"but too small for most pets\".", FIND)
q(P, 1, "Word meaning", 2, "The text says gardens are \"sealed off\". What does **sealed off** mean here?",
  "Closed off completely", ["Painted to stop the rain", "Full of seals", "Left open to the road"],
  "Sealed off means completely closed off. The writer is describing gardens surrounded by solid fences and walls.", WORD)
q(P, 1, "Finding information", 2, "Which of these does the text say you should NOT give to hedgehogs?",
  "Milk", ["Fresh water", "Meaty cat food", "Meaty dog food"],
  "The text warns \"never put out bread or milk: milk can make hedgehogs very ill\". Water and meaty pet food are suggested as safe.", FIND)
q(P, 1, "Inference", 3, "Why does the writer call a chain of gardens a \"hedgehog highway\"?",
  "Because it gives them a long route, like a road", ["Because hedgehogs are often hit by cars on highways", "Because the holes are cut beside main roads", "Because hedgehogs travel very fast through it"],
  "A highway is a long main road. Linked gardens give hedgehogs a long safe route for their night-time journeys. The holes are in garden fences, not by roads.", INFER)

# ---------------- Test 2, passage 1: fiction ----------------
P = "ELEVEN-P3"
passage(P, "The Pumpkin Plan", """Every year, Grandad Ray entered the giant pumpkin contest at the village show, and every year he came second to Mrs Okafor, whose pumpkins were rumoured to be fed on a secret mixture she would not share with anyone.

"This is our year, Sami," Grandad said in April, pressing a single seed into a pot of compost on the allotment shed's windowsill. "I can feel it in my bones."

Sami had heard this before. Still, he visited the allotment every day after school that summer. He watered the pumpkin when the soil was dry, chased away slugs with a torch on warm evenings, and laid straw under the swelling fruit so it would not rot on the damp ground. By August it was the size of a wheelbarrow, its skin glowing orange like a sunset.

On the morning of the show, it took four people and a borrowed trolley to move it. The judges weighed it twice. Then they weighed Mrs Okafor's.

"Second place," announced the judge, "by just two kilograms."

Grandad Ray was quiet on the walk home. Sami could not think of anything helpful to say, so he said nothing at all.

At the allotment gate, Mrs Okafor was waiting. She held out a folded scrap of paper.

"You've earned this," she said, "and so has your grandson. I watched him out here with that torch every evening." She smiled. "There is no secret mixture, you know. Just patience."

Grandad unfolded the paper and laughed so loudly that a pigeon took off from the shed roof. Written on it, in neat capitals, was a single word: WATER.""")

q(P, 2, "Finding information", 1, "How did Sami protect the pumpkin from rotting?",
  "He laid straw under it.", ["He covered it with a sheet.", "He moved it into the shed.", "He watered it every day."],
  "The passage says he \"laid straw under the swelling fruit so it would not rot on the damp ground\". Watering was for when the soil was dry, not to stop rot.", FIND)
q(P, 2, "Inference", 2, "Why does Sami think \"This is our year\" is something he \"had heard before\"?",
  "Grandad says it every year but always comes second.", ["Grandad had already won the contest once.", "Mrs Okafor had told him the same thing.", "Sami had read it on the seed packet."],
  "The first paragraph says Grandad enters every year and always comes second, so his hopeful words are familiar. Nothing says he had ever won.", INFER)
q(P, 2, "Figurative language", 2, "The pumpkin's skin is described as \"glowing orange like a sunset\". This simile mainly suggests that the pumpkin:",
  "was a rich, bright colour", ["was going bad", "was too heavy to lift", "was growing more slowly in the evening"],
  "A sunset is a warm, glowing orange, so the comparison describes the pumpkin's bright colour. It says nothing about weight or rotting.", INFER)
q(P, 2, "Character and feelings", 2, "How was Grandad most likely feeling on the walk home?",
  "Disappointed", ["Relieved", "Delighted", "Bored"],
  "He had hoped this was his year, then lost by just two kilograms, and he \"was quiet on the walk home\". That suggests disappointment.", INFER)
q(P, 2, "Word meaning", 2, "\"Mrs Okafor, whose pumpkins were **rumoured** to be fed on a secret mixture\". Rumoured means:",
  "said by people but not known to be true", ["proven to be true by the judges", "written about in the local newspaper", "kept secret in a locked shed"],
  "A rumour is something people say that has not been checked. At the end, Mrs Okafor reveals the rumour was false.", WORD)
q(P, 2, "Theme", 3, "Which sentence best sums up the message of the story?",
  "Patience matters more than secrets.", ["Winning is the only thing that counts.", "You should never trust your neighbours.", "Big vegetables need special food to grow."],
  "Mrs Okafor says there is \"no secret mixture... just patience\", and she praises Sami's daily care. The story ends by showing that simple, steady work is what counts.")

# ---------------- Test 2, passage 2: non-fiction ----------------
P = "ELEVEN-P4"
passage(P, "When the Thames Froze", """Today it is hard to imagine, but there were winters long ago when the River Thames in London froze so solidly that people held fairs on the ice. These events became known as frost fairs.

The freezing was helped by the old London Bridge. It stood on many thick stone supports with narrow arches between them, which slowed the river down above the bridge. The slow water froze far more easily than a fast-flowing river would. The winters of that period were also often colder than winters in Britain are now.

When the ice was thick enough, Londoners turned the river into a street. Traders put up tents and stalls selling hot food, gingerbread and drinks. There were games of skittles, puppet shows and even printing presses, where visitors could buy a card printed with their own name and the words "printed on the Thames".

The fairs were great fun, but they were also dangerous. The ice could crack without warning, and people sometimes fell through into the freezing water below.

The last frost fair was held in 1814. Some years later the old bridge was pulled down and replaced by a new bridge with wider arches. Later in the nineteenth century, embankments were built along the river's banks, making it narrower and faster. Combined with milder winters, these changes mean that the Thames in central London is now very unlikely ever to freeze over again.""")

q(P, 2, "Finding information", 1, "According to the text, when was the last frost fair held?",
  "1814", ["1841", "1914", "The text does not say"],
  "The final paragraph begins: \"The last frost fair was held in 1814.\"", FIND)
q(P, 2, "Cause and effect", 2, "How did the old London Bridge help the river to freeze?",
  "Its narrow arches slowed the water down.", ["It blocked the warm sea air.", "It stopped boats from breaking up the ice.", "Its stone supports were very cold."],
  "The text says the narrow arches \"slowed the river down above the bridge\", and slow water freezes more easily than fast water.", FIND)
q(P, 2, "Word meaning", 2, "In the final paragraph, the word **milder** most nearly means:",
  "less cold", ["wetter", "shorter", "windier"],
  "Mild weather is gentle and not extreme. Milder winters are less cold, which is why the river no longer freezes.", WORD)
q(P, 2, "Finding information", 2, "Which of these is NOT mentioned as something you could find at a frost fair?",
  "Ice skating races", ["Puppet shows", "Gingerbread", "Printing presses"],
  "The text lists hot food, gingerbread, drinks, skittles, puppet shows and printing presses. Skating races are never mentioned.", FIND)
q(P, 2, "Inference", 3, "Why might visitors have wanted a card \"printed on the Thames\"?",
  "As a souvenir of their day at the fair", ["Because paper was cheaper on the ice", "So they could find their way home", "Because it was a ticket to enter the fair"],
  "A card with your own name, printed on the frozen river itself, is a keepsake of an unusual day. Nothing suggests it was a ticket or a map.", INFER)
q(P, 2, "Structure", 3, "What is the main purpose of the final paragraph?",
  "To explain why frost fairs no longer happen", ["To describe the games played at the fairs", "To warn readers about thin ice", "To describe the old London Bridge"],
  "The last paragraph lists the changes (a new bridge, embankments, milder winters) that mean the river is unlikely to freeze again.")

# ---------------- Drill only, passage 5: poem ----------------
P = "ELEVEN-P5"
passage(P, "The Night Train", """The night train hums along the line,
a lantern-snake of gold,
it threads the sleeping villages
and hurries through the cold.

The cows lie dreaming in the fields,
the owls look up and stare;
it whispers past the silent church
and leaves a ribbon on the air.

Inside, a girl with tired eyes
counts stations on her hand:
four more, three more, two more, one,
and then her own home land.

Her grandma waits beneath the clock,
her scarf pulled to her chin.
The night train sighs, the doors slide back,
and warmth comes rushing in.""")

q(P, 0, "Figurative language", 2, "The train is called \"a lantern-snake of gold\". Which feature of the train does this image describe?",
  "A long line of lit windows in the dark", ["The loud noise of the engine", "A snake that lives beside the railway", "The gold paint on the carriages"],
  "A snake is long and winding, and lanterns give light. Together they picture a long, glowing train curving through the night, not a real snake.", INFER)
q(P, 0, "Finding information", 1, "Which animals are mentioned in the second verse?",
  "Cows and owls", ["Cows and horses", "Owls and bats", "Sheep and cows"],
  "The second verse says \"The cows lie dreaming in the fields, / the owls look up and stare\".", FIND)
q(P, 0, "Inference", 2, "Why does the girl count \"four more, three more, two more, one\"?",
  "She is counting stops until home.", ["She is counting the people in her carriage.", "She is trying to fall asleep.", "She is practising her times tables."],
  "The poem says she \"counts stations on her hand\", ending with \"her own home land\". She is counting down to her stop.", INFER)
q(P, 0, "Word meaning", 2, "In the line \"it **threads** the sleeping villages\", the word threads suggests the train:",
  "passes through, like a needle through cloth", ["ties the villages together with a string", "wakes everyone up as it passes", "stops at every village"],
  "Threading a needle means passing it through small gaps. The verb pictures the train weaving through one village after another.", WORD)
q(P, 0, "Personification", 3, "Which line gives the train a human action?",
  "\"it whispers past the silent church\"", ["\"The cows lie dreaming in the fields\"", "\"Her grandma waits beneath the clock\"", "\"counts stations on her hand\""],
  "Whispering is something people do, so it personifies the train. The other lines describe the cows, the grandma and the girl, who are not the train.")
q(P, 0, "Mood", 3, "How does the mood change in the last verse?",
  "It becomes warm and homely.", ["It becomes frightening.", "It becomes sad and lonely.", "It stays cold and quiet."],
  "The cold, sleepy night ends with Grandma waiting and \"warmth comes rushing in\". The ending feels like a homecoming.", INFER)

# ---------------- Drill only, passage 6: non-fiction ----------------
P = "ELEVEN-P6"
passage(P, "Mary Anning, Fossil Hunter", """Mary Anning was born in 1799 in Lyme Regis, a small town on the Dorset coast. The crumbling cliffs there are packed with fossils, the stony remains of creatures that lived millions of years ago. Mary's family was poor, and as a child she helped them earn money by collecting fossils from the beach and selling them to visitors.

When Mary was about twelve, she and her brother Joseph uncovered the skeleton of an ichthyosaur, a sea reptile with a long, toothed snout. It was one of the first ever found. Over the following years Mary made many more important discoveries, including the first complete skeleton of a plesiosaur, a reptile with a small head and a very long neck.

Fossil hunting was risky work. The best finds appeared after storms, when fresh rock fell from the cliffs, and landslides were a constant danger. Mary once narrowly escaped a landslide that killed her dog, Tray.

Although scientists across Britain studied her finds, Mary did not always receive the credit she deserved. As a woman, she was not allowed to join the Geological Society of London, and some of her discoveries were described by men who did not mention her name.

Mary Anning died in 1847. Today she is celebrated as one of the most important fossil hunters in history, and her work helped people to understand that some kinds of animals had lived long ago and then died out completely.""")

q(P, 0, "Finding information", 1, "Why did Mary first start collecting fossils?",
  "To help her poor family earn money", ["Because she was a member of a science society", "Because her teacher asked her to", "To build a museum in Lyme Regis"],
  "The first paragraph says her family was poor and she collected fossils \"selling them to visitors\" to help earn money.", FIND)
q(P, 0, "Finding information", 2, "Which description matches a plesiosaur?",
  "A reptile with a very long neck", ["A sea reptile with a long, toothed snout", "A fish with a hard shell", "A bird that lived on the cliffs"],
  "The text describes a plesiosaur as having \"a small head and a very long neck\". The long, toothed snout belongs to the ichthyosaur.", FIND)
q(P, 0, "Cause and effect", 2, "Why were the best fossils found after storms?",
  "Fresh rock fell from the cliffs.", ["Storms washed fossils in from the sea.", "There were fewer visitors on the beach.", "The rain made the fossils shine."],
  "The text says the best finds appeared after storms, \"when fresh rock fell from the cliffs\".", FIND)
q(P, 0, "Word meaning", 2, "\"Mary did not always receive the **credit** she deserved.\" Here, credit means:",
  "praise and recognition", ["money kept in a bank account", "a ticket to a show", "a prize at the village show"],
  "Credit here means being recognised for something you did. The next sentence explains that men described her finds without naming her.", WORD)
q(P, 0, "Inference", 3, "What does the fourth paragraph suggest about life for women scientists at that time?",
  "They were often treated unfairly.", ["They were paid more than men.", "They were not interested in fossils.", "They ran the Geological Society."],
  "Mary could not join the Geological Society because she was a woman, and others took credit for her work. That shows unfair treatment.", INFER)
q(P, 0, "Main idea", 2, "Which would be the best alternative title for this text?",
  "The Fossil Hunter Who Changed History", ["How to Find Fossils on the Beach", "A History of Dorset", "The Life of Tray the Dog"],
  "The text is about Mary's life and how her discoveries helped people understand extinct animals. It is not a how-to guide or a history of Dorset.")
