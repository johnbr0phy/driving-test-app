"""HSPT Reading: comprehension of informational text. Original passages and items."""

STIMULI = {
    # ---------------- Practice Test 1 ----------------
    "T1-A": ("The Ditch That Built a Nation", """In the early 1800s, moving goods across New York State was slow and costly. Wagons bumped over muddy roads, and shipping a ton of flour from Buffalo to New York City could take weeks. Governor DeWitt Clinton believed the answer was a canal: a waterway dug by hand that would link Lake Erie to the Hudson River.

Many people laughed at the idea. Newspapers called it "Clinton's Ditch." The canal would have to stretch about 363 miles, from Buffalo to Albany, and climb over hills using a series of locks, gated chambers that raise and lower boats. No one in the young country had attempted anything so large.

Work began in 1817. Crews of laborers, many of them recent immigrants, cleared forests and dug through rock with shovels, picks and blasting powder. When the Erie Canal opened in 1825, the doubters fell silent. Boats pulled by mules along a towpath could now carry goods across the state in a fraction of the time, and shipping costs dropped sharply.

The canal changed the map of the nation. Towns such as Rochester and Syracuse grew quickly along its banks, and New York City became the busiest port in the country. Farmers in the Midwest could now send their crops east, and settlers could travel west more easily. The "ditch" that people had mocked had become one of the most important routes in America."""),
    "T1-B": ("Dancing Directions", """A honeybee that finds a good patch of flowers faces a problem: how can she tell the other bees in her hive where to go? Bees cannot draw maps or speak, yet a returning forager can send her sisters to flowers more than a mile away. She does it by dancing.

Inside the dark hive, the forager walks in a straight line across the honeycomb while shaking her body from side to side. Then she circles back and repeats the move again and again. Scientists call this the waggle dance. The angle of the straight run tells the other bees which direction to fly, measured from the position of the sun. The length of the waggle tells them how far to go: the longer she waggles, the more distant the flowers.

The Austrian scientist Karl von Frisch spent years watching bees at glass-walled hives before he decoded the dance. Many scientists at first doubted that an insect could share such exact information. Von Frisch's careful experiments, in which he moved feeding dishes farther and farther away, convinced them. In 1973 he shared the Nobel Prize for his work.

Today, researchers still study the waggle dance. By filming dances and translating them, they can learn where bees in a city or on a farm are finding food, which helps people plant the flowers bees need most."""),

    # ---------------- Practice Test 2 ----------------
    "T2-A": ("Reading with Fingertips", """Louis Braille was three years old when an accident in his father's leather workshop injured one of his eyes. An infection spread, and by age five he was completely blind. In France in the early 1800s, few blind children received any schooling, but Louis was bright and determined. At ten, he won a place at a school for blind students in Paris.

The school owned a few books printed with large raised letters. Reading them was painfully slow, because fingers cannot easily tell one curving letter from another. The books were also huge and heavy, and students could not write in that system at all.

Then a visitor brought news of "night writing," a code of raised dots that an army captain, Charles Barbier, had invented so soldiers could pass messages in the dark. Louis saw its promise at once, but Barbier's code used up to twelve dots for a single sound, too many for a fingertip to feel at one touch. Working on his own, the teenager simplified it. By the time he was fifteen, Louis had created a system in which each letter is made from a cell of just six dots, arranged in two columns of three.

Braille's code spread slowly at first; some teachers even banned it. But blind readers loved it, and long after his death it became the standard around the world. Today the same six-dot cell is used for many languages, for music and even for mathematics."""),
    "T2-B": ("A Sea Where You Cannot Sink", """Visitors to the Dead Sea, which lies between Israel and Jordan, like to take a strange photograph: a person lying back in the water, reading a newspaper, floating without any effort. The trick works because the Dead Sea is one of the saltiest bodies of water on Earth, almost ten times saltier than the ocean.

The reason lies in its location. The shore of the Dead Sea is the lowest dry land on the planet, more than 1,300 feet below sea level. The Jordan River and smaller streams flow into it, but no river flows out. In the hot, dry climate, water leaves only by evaporating into the air. Each time water evaporates, the salt it carried stays behind, so over thousands of years the salt has built up.

All that salt makes the water much denser than fresh water, and a dense liquid pushes up harder on anything placed in it. That is why swimmers bob on the surface like corks. It is also why no fish live there. Only tiny bacteria and other microbes can survive.

Today the Dead Sea is shrinking. People take water from the Jordan River for farms and cities, so less reaches the sea, and its surface drops by about three feet a year. Scientists and the nearby countries are studying ways to slow the loss before more of this unusual sea disappears."""),
}

ITEMS = [
    # ---------- T1-A Erie Canal ----------
    dict(test=1, stim="T1-A", skill="Main idea", diff=1,
         stem="Which sentence best states the main idea of the passage?",
         key="A mocked project became a vital route", wrong=["Mules once pulled boats across New York", "Immigrants built many American cities", "New York was hard to cross on foot"],
         expl="The passage follows the canal from a project people laughed at to one of the most important routes in America. The mules are only one detail."),
    dict(test=1, stim="T1-A", skill="Details", diff=1,
         stem="According to the passage, what is a lock?",
         key="A chamber that lifts boats", wrong=["A path where mules walked", "A dam that blocks a river", "A gate that charged a toll"],
         expl="The second paragraph defines locks as gated chambers that raise and lower boats. The path for the mules is the towpath."),
    dict(test=1, stim="T1-A", skill="Inference", diff=2,
         stem="Why did newspapers most likely call the project \"Clinton's Ditch\"?",
         key="To make fun of the plan", wrong=["To honor the governor's work", "To describe its great depth", "To name the town it started in"],
         expl="The passage says many people laughed at the idea, and later that the doubters fell silent. Calling a huge canal a ditch was a way of mocking it."),
    dict(test=1, stim="T1-A", skill="Vocabulary in context", diff=2,
         stem="In the third paragraph, the phrase \"in a fraction of the time\" means:",
         key="much faster than before", wrong=["only part of the way", "at certain times of year", "more slowly than wagons"],
         expl="A fraction is a small part, so a trip that takes a fraction of the time is much quicker. The paragraph adds that shipping costs dropped too."),
    dict(test=1, stim="T1-A", skill="Cause and effect", diff=3,
         stem="According to the last paragraph, which was a result of the canal?",
         key="Midwest farmers could ship crops east", wrong=["Buffalo replaced Albany as the capital", "Wagon roads across New York improved", "Ships could sail from the ocean to Ohio"],
         expl="The last paragraph says farmers in the Midwest could now send their crops east. The passage never mentions better roads or a new capital."),

    # ---------- T1-B Waggle dance ----------
    dict(test=1, stim="T1-B", skill="Main idea", diff=1,
         stem="What is the passage mainly about?",
         key="How bees share where food is", wrong=["Why bees need flowers to survive", "How a hive stays dark inside", "Why scientists win Nobel Prizes"],
         expl="The passage explains the waggle dance, the way a forager tells other bees where to find flowers, and how it was discovered."),
    dict(test=1, stim="T1-B", skill="Details", diff=2,
         stem="According to the passage, what does the length of the waggle tell the other bees?",
         key="How far away the flowers are", wrong=["Which way to fly from the sun", "How many flowers are in bloom", "How sweet the flowers taste"],
         expl="The second paragraph says the longer the waggle, the more distant the flowers. The direction comes from the angle of the run, not its length."),
    dict(test=1, stim="T1-B", skill="Author's purpose", diff=2,
         stem="Why does the author describe von Frisch moving feeding dishes farther away?",
         key="To show how he proved his idea", wrong=["To show how bees find new hives", "To explain why bees fly at night", "To describe how bees make honey"],
         expl="The paragraph says many scientists doubted him until his careful experiments with the dishes convinced them. The detail shows how he proved what the dance means."),
    dict(test=1, stim="T1-B", skill="Inference", diff=3,
         stem="Which statement would the author most likely agree with?",
         key="Bee research can help real gardens", wrong=["Bees only dance on sunny days", "Von Frisch's ideas are now doubted", "Bees learn the dance from people"],
         expl="The last paragraph says decoding dances helps people plant the flowers bees need most. It says scientists were convinced, not that they doubt him today."),
    dict(test=1, stim="T1-B", skill="Vocabulary in context", diff=2,
         stem="In the third paragraph, the word \"decoded\" means:",
         key="worked out", wrong=["wrote down", "slowed down", "copied"],
         expl="To decode is to figure out what a code or signal means. Von Frisch worked out what each part of the dance tells the bees."),

    # ---------- T2-A Louis Braille ----------
    dict(test=2, stim="T2-A", skill="Sequence", diff=1,
         stem="What happened right after Louis heard about \"night writing\"?",
         key="He made a simpler dot code", wrong=["He joined the French army", "He was injured in the workshop", "He won a place at the school"],
         expl="After learning of Barbier's code, Louis saw its promise and simplified it into his six-dot cell. The injury and the school came earlier."),
    dict(test=2, stim="T2-A", skill="Details", diff=1,
         stem="According to the passage, what was wrong with Barbier's code for reading?",
         key="Too many dots for one sound", wrong=["It was printed in huge books", "It could not be written at all", "It used only curving letters"],
         expl="The passage says the code used up to twelve dots for one sound, too many to feel at one touch. The huge books were the raised-letter books."),
    dict(test=2, stim="T2-A", skill="Cause and effect", diff=2,
         stem="Why was reading the school's raised-letter books so slow?",
         key="Fingers mixed up the letters", wrong=["The students were not allowed to", "The books were written in code", "The letters were too small to see"],
         expl="The second paragraph says fingers cannot easily tell one curving letter from another. The students read by touch, not by sight."),
    dict(test=2, stim="T2-A", skill="Inference", diff=3,
         stem="The detail that some teachers banned Braille's code suggests that:",
         key="new ideas can meet resistance", wrong=["his code was hard for students", "blind readers disliked the code", "the code worked only in French"],
         expl="Teachers banned it even though blind readers loved it, which shows the new system was not welcomed at first. The passage says readers loved it, so they did not dislike it."),
    dict(test=2, stim="T2-A", skill="Main idea", diff=2,
         stem="Which title would also fit this passage?",
         key="A Teen Changes How the Blind Read", wrong=["Life in an Army Camp at Night", "The Leather Workshops of France", "How Books Were Printed in Old Paris"],
         expl="The passage tells how Louis, as a teenager, created the code blind readers still use. The workshop and the army are only details."),

    # ---------- T2-B Dead Sea ----------
    dict(test=2, stim="T2-B", skill="Main idea", diff=1,
         stem="What is the passage mainly about?",
         key="Why the Dead Sea is so salty", wrong=["How to swim safely in the sea", "Where the Jordan River begins", "Which fish live in salt water"],
         expl="Most of the passage explains how salt builds up in the Dead Sea and what that salt does. The other choices are not discussed or are only details."),
    dict(test=2, stim="T2-B", skill="Cause and effect", diff=2,
         stem="According to the passage, why has salt built up in the Dead Sea?",
         key="Water escapes only as vapor", wrong=["Salt is mined along its shore", "Ocean water flows into it", "Rain there is unusually salty"],
         expl="No river flows out, so water leaves only by evaporating, and each time the salt stays behind. No ocean water flows in."),
    dict(test=2, stim="T2-B", skill="Details", diff=1,
         stem="According to the passage, what lives in the Dead Sea?",
         key="Only tiny microbes", wrong=["Only small fish and crabs", "Only salt plants", "No living things at all"],
         expl="The third paragraph says no fish live there and only tiny bacteria and other microbes can survive. Saying nothing lives there goes too far."),
    dict(test=2, stim="T2-B", skill="Vocabulary in context", diff=2,
         stem="In the third paragraph, the word \"denser\" means:",
         key="heavier for its size", wrong=["colder for the same depth", "cloudier to look at", "faster in its flow"],
         expl="A denser liquid packs more matter into the same space, so a cup of it is heavier. That is why it pushes swimmers up so strongly."),
    dict(test=2, stim="T2-B", skill="Inference", diff=3,
         stem="Based on the last paragraph, which would most likely help the Dead Sea?",
         key="More river water reaching it", wrong=["Adding more salt to its water", "Building more farms nearby", "Digging a river to drain it"],
         expl="The sea is shrinking because people take water from the Jordan River before it arrives. Letting more of that water reach the sea would slow the loss."),
]
