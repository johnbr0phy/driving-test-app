# SSAT Middle Level, Reading: narrative passages (stories, a poem, a personal
# essay). Original passages, five questions each: main idea, details,
# inference, word meaning in context, tone and prediction.
# N1, N2 Practice Test 1; N3, N4 Practice Test 2; N5, N6 drill only.

STIMULI = {
    "N1": ("The Lamp Room", """Mara had never been inside the lighthouse at night. All summer her grandfather had climbed the ninety-two steps alone each evening, a thermos of tea in one hand and a rag for the brass in the other, while she watched from the cottage window. "When you're older," he always said, and Mara had begun to suspect that older was a place she would never reach.

Then, on the last Friday of August, he stopped halfway up the porch steps and pressed a hand to his knee. "Well," he said, studying the sky, which had gone the color of a bruise, "I suppose tonight you are older."

The stairs wound so tightly that Mara could touch both walls at once. At the top, the lamp room smelled of oil and salt. Her grandfather lowered himself onto a stool and talked her through every step: trim the wick, wipe the lens, wind the clockwork that turned the light. His voice was calm, but she noticed that he never took his eyes off her hands.

When the beam finally swept out across the water, Mara pressed her face to the glass. Far out, a fishing boat was pushing toward the harbor, rising and dipping on the dark swells. She watched it until its lights slid safely behind the breakwater.

"They'll never know who lit it," she said.

Her grandfather smiled. "That," he said, "is exactly the point." """),
    "N2": ("Moving Day", """The boxes stand like silent towers,

our whole house folded into squares.

My mother tapes the kitchen shut;

my father wrestles down the stairs

the couch we've sat on every winter,

its cushions shaped by all of us.

I carry out my own small carton

and do not make a fuss.

But at the door I turn around:

the rooms have grown too wide, too bare,

and on the wall, in pencil lines,

my heights climb up the closet there.

I cannot pack a pencil line.

I press my hand against the last,

the highest one, from just last June,

and promise I will grow up fast

in some new hallway, some new house,

where no one knows how tall I've been,

until I mark a brand-new wall

and start the climbing once again."""),
    "N3": ("Nothing Tender", """Theo planted his tomato seedlings on the first warm Saturday in April, ignoring the sign at the community garden gate that read, in Mrs. Okafor's careful capitals, NOTHING TENDER BEFORE MAY 10. Tender, he decided, was for lettuce. Tomatoes were tough. They had thick, hairy stems and smelled sharp and green when you brushed against them.

For a week the plants looked splendid. Then came a clear, still night, the kind that makes the stars look close enough to touch, and in the morning the leaves hung black and limp, as if someone had boiled them.

Theo was crouched over the ruined row when a shadow fell across the dirt. Mrs. Okafor did not say a word about the sign. She knelt, pinched a leaf between two fingers, and sighed.

"Frost finds the eager ones first," she said. "I lost a whole bed of peppers my first spring here. Planted them on my birthday because I couldn't wait." She stood, brushing off her knees. "I have extra seedlings in my cold frame. Come by on the tenth and we'll put them in together."

Theo walked home slowly. He had expected a lecture, and somehow the lack of one made him feel worse, and then, by the time he reached his street, a little better. On the calendar by the refrigerator, he drew a fat red circle around May 10."""),
    "N4": ("The Recipe Card", """My grandmother's recipe for corn bread is written on an index card so stained with butter that the ink has turned the color of weak tea. Half the measurements are missing. Where the card should say how much sugar, it says only "enough." Where it should give an oven temperature, it says "hot, but not mean."

For years I thought the card was useless. I tried to follow it the summer I turned eleven, and my corn bread came out as flat and pale as a paper plate. I complained to my grandmother on the phone. She laughed so hard she had to put the phone down.

"The card isn't the recipe," she said when she came back. "The card is just to remind me of the recipe. The recipe is in my hands."

The next time she visited, I stood beside her at the counter and watched. She did not measure anything. She poured cornmeal until the mound looked right, cracked eggs with one hand, and tested the batter by letting it drip off a spoon. When I asked how she knew when to stop stirring, she shrugged. "It tells you."

I have made that corn bread perhaps a hundred times since. I still keep the card in a drawer, though I no longer read it. I understand now that some knowledge does not fit on paper. It has to pass from one pair of hands to another, slowly, at a kitchen counter, the way it came to her."""),
    "N5": ("Look at the Mailbox", """Dev had been trying to ride the bicycle for three days, and for three days the bicycle had been winning. Each time Priya let go of the seat, he wobbled, panicked, and steered straight into the hedge as if it were pulling him in.

"You're looking at the hedge," Priya told him on the fourth morning. "Bikes go where your eyes go. Look at the mailbox at the end of the street."

"The mailbox is too far," Dev said.

"That's why it works."

He climbed on, jaw tight. Priya held the seat and jogged beside him, the way their father had once jogged beside her. She could feel the exact moment the bike stopped needing her: a lightness, as though a kite string had gone slack in her hand. She let go. Dev did not notice. He was staring at the mailbox, pedaling hard, his elbows sticking out like wings.

He reached it, braked too sharply, and tipped gently onto the grass. When he sat up, he was grinning so widely that Priya could see the gap where his front tooth had been.

"Did you let go?" he shouted.

"Ages ago," she called back, and found, to her surprise, that her eyes were stinging."""),
    "N6": ("Frog Headquarters", """On the attic floor, under a box of old tax papers, Leo found a map his grandfather had drawn as a boy. It showed their town the way it had been sixty years ago, in faded blue ink. There was the river, the same as now, and the stone bridge. But where the shopping center stood today, the map showed a pond labeled FROG HEADQUARTERS. Where Leo's school sat, it showed a field with a tiny drawing of a horse and the words OLD BESS, VERY GRUMPY.

Leo carried the map downstairs. His grandfather put on his reading glasses and was quiet for a long time.

"Bess bit me twice," he said finally. "Both times I deserved it."

That afternoon they walked the route on the map together. Most of the places were gone. The pond had been filled in, and the woods behind the church were now a row of tidy houses. Leo kept waiting for his grandfather to be sad, but instead he kept stopping to point. "The fort was right there. Your great-uncle fell out of that oak, broke his arm, and bragged about it all summer."

By the time they got home, Leo had decided to make a map of his own. He would put in the skate park, the corner store with the good slushies, and the yard with the barking dog. Someday, he thought, somebody might need to know."""),
}


def R(test, stim, skill, diff, stem, key, wrong, expl):
    return dict(test=test, stim=stim, skill=skill, diff=diff, basics=None,
                stem=stem, key=key, wrong=wrong, expl=expl)


ITEMS = [
    # ---- N1 (Practice Test 1)
    R(1, "N1", "Main idea", 1, "The passage is mainly about:",
      "a girl doing her grandfather's job",
      ["a storm that wrecks a fishing boat", "how lighthouses were built long ago", "a girl who is afraid of tall stairs", "a grandfather who wants to retire"],
      "The story follows Mara as she climbs the lighthouse and lights the lamp for the first time, the job her grandfather has always done. The boat reaches the harbor safely, so nothing is wrecked."),
    R(1, "N1", "Inference", 2, "Why does the grandfather say, \"I suppose tonight you are older\"?",
      "His knee is too sore to climb.",
      ["Mara has just had a birthday.", "He wants to stay with the boat.", "The lamp no longer needs care.", "He is busy fixing the cottage."],
      "He stops on the steps and presses a hand to his knee just before he says it, so he needs Mara to do the climbing. Nothing in the story mentions a birthday."),
    R(1, "N1", "Figurative language", 2, "The sky that \"had gone the color of a bruise\" was most likely:",
      "dark and stormy",
      ["clear and bright", "pink with sunset", "full of birds", "hidden by fog"],
      "A bruise is dark purple and gray, and the grandfather studies the sky as if worried; a fishing boat later fights dark swells. A clear, bright sky would not need a keeper's attention."),
    R(1, "N1", "Detail", 1, "While Mara does each step in the lamp room, her grandfather:",
      "watches her hands closely",
      ["polishes the brass rail", "drinks his thermos of tea", "naps on the stool", "writes in a logbook"],
      "The passage says he never took his eyes off her hands. The tea and the brass are part of his usual evenings, not what he does that night."),
    R(1, "N1", "Theme", 3, "When the grandfather says, \"That is exactly the point,\" he most likely means that:",
      "the work is for others, not praise",
      ["the light should be kept secret", "fishermen dislike lighthouses", "Mara should tell the boat's crew", "lighthouses no longer matter"],
      "Mara notices the sailors will never know who lit the lamp, and her grandfather agrees that this is the point: the work keeps people safe whether or not anyone thanks the keeper."),
    # ---- N2 (Practice Test 1)
    R(1, "N2", "Detail", 1, "In the first line of the poem, the boxes are compared to:",
      "towers",
      ["squares", "soldiers", "mountains", "walls"],
      "The first line says the boxes stand \"like silent towers.\" Squares appear in the next line, but they describe the folded house, not what the boxes are compared to."),
    R(1, "N2", "Detail", 1, "The pencil lines on the closet wall show:",
      "how tall the speaker grew",
      ["where the boxes should go", "a map of the new street", "notes left for the movers", "rooms that need new paint"],
      "The poem says \"my heights climb up the closet there,\" so each line marks the speaker's height at a different time."),
    R(1, "N2", "Tone", 2, "At the door, the speaker feels mostly:",
      "sad to leave the old home",
      ["excited about the new house", "angry at the parents", "afraid of the empty rooms", "proud of packing alone"],
      "The speaker turns back, notices the rooms are bare, and presses a hand against the height marks, all signs of missing the old house. The rooms seem too wide, but the speaker is not frightened of them."),
    R(1, "N2", "Inference", 2, "The line \"I cannot pack a pencil line\" suggests that:",
      "some memories have to stay behind",
      ["the speaker has run out of boxes", "pencil marks are easy to erase", "the movers forgot the closet", "the speaker dislikes drawing"],
      "The height marks stand for years of growing up in the house, and they have to stay behind on the wall. The line is about memories, not a shortage of boxes."),
    R(1, "N2", "Prediction", 3, "At the end of the poem, the speaker expects to:",
      "begin a new record of growing",
      ["move back to the old house", "stop measuring height at all", "paint over the old closet", "stay the same height for years"],
      "The last lines imagine marking \"a brand-new wall\" and starting \"the climbing once again,\" a new set of height lines in the new house."),
    # ---- N3 (Practice Test 2)
    R(2, "N3", "Main idea", 1, "Which of these best tells what the passage is about?",
      "A boy learns to be patient.",
      ["A gardener scolds a careless boy.", "A boy builds his first cold frame.", "Two neighbors grow prize tomatoes.", "A boy decides to quit gardening."],
      "Theo plants too early, loses his plants to frost, and ends by circling the safe planting date, so he has learned to wait. Mrs. Okafor never scolds him; the story says he expected a lecture and did not get one."),
    R(2, "N3", "Word in context", 2, "As it is used on the garden sign, the word \"tender\" most nearly means:",
      "hurt by cold",
      ["soft enough to chew", "kind and loving", "painful to touch", "ready to be picked"],
      "The sign warns against planting before May 10, and the frost that kills Theo's tomatoes shows what it meant: plants that cold can damage. Theo thinks it means soft, like lettuce, and that is his mistake."),
    R(2, "N3", "Detail", 1, "What happened to Theo's tomato plants?",
      "Frost killed them overnight.",
      ["Someone boiled their leaves.", "Insects ate all the leaves.", "Heavy rain washed them away.", "The hot sun scorched them."],
      "After a clear, still night the leaves were black and limp. \"As if someone had boiled them\" is a comparison, not what happened."),
    R(2, "N3", "Character motive", 2, "Mrs. Okafor most likely tells the story about her peppers in order to:",
      "show she once did the same",
      ["boast about her own garden", "explain why peppers are hard", "warn him about birthdays", "change the subject quickly"],
      "She lost her peppers by planting too early because she could not wait, just as Theo did, so the story tells him the mistake is a common one."),
    R(2, "N3", "Inference", 2, "Why does Theo draw a circle around May 10 on the calendar?",
      "He will plant again that day.",
      ["It is Mrs. Okafor's birthday.", "The garden will close that day.", "He wants to remember the frost.", "His tomatoes will be ripe then."],
      "Mrs. Okafor invites him to come on the tenth to plant her extra seedlings together, and May 10 is the date on the sign."),
    # ---- N4 (Practice Test 2)
    R(2, "N4", "Main idea", 2, "The author's main point is that:",
      "some skills are learned by doing",
      ["written recipes are always wrong", "children cannot bake corn bread", "old index cards wear out quickly", "the author no longer likes baking"],
      "The essay ends by saying some knowledge does not fit on paper and must pass from one pair of hands to another: the author learned the recipe by watching and then making it, not by reading the card. The card was incomplete, not always wrong."),
    R(2, "N4", "Word in context", 2, "The card's words \"hot, but not mean\" suggest that the oven should be:",
      "fairly hot but not extreme",
      ["set to its lowest heat", "turned off halfway through", "heated with a wood fire", "as hot as it will go"],
      "\"Hot\" tells the baker to heat the oven well, and \"not mean\" says not to the point of burning. As hot as it will go is exactly what \"not mean\" rules out."),
    R(2, "N4", "Inference", 2, "Why does the grandmother laugh when the author complains?",
      "The card was never the full recipe.",
      ["The phone line was very noisy.", "She had never baked corn bread.", "She was glad the bread failed.", "She wrote the card as a joke."],
      "She explains that the card only reminds her of a recipe that lives \"in my hands,\" so following it word for word was never going to work."),
    R(2, "N4", "Detail", 1, "How does the grandmother test the batter?",
      "by letting it drip off a spoon",
      ["by tasting a small bite of it", "by weighing it on a scale", "by measuring how high it rises", "by checking the recipe card"],
      "The fourth paragraph says she tested the batter by letting it drip off a spoon. She does not measure anything, so a scale is wrong."),
    R(2, "N4", "Tone", 3, "The tone of the last paragraph is best described as:",
      "calm and grateful",
      ["bitter and annoyed", "silly and joking", "worried and fearful", "bored and distant"],
      "The author reflects calmly on what the grandmother passed on and keeps the card as a keepsake. The early complaint is gone by the end."),
    # ---- N5 (drill only)
    R(0, "N5", "Detail", 1, "Why does Priya tell Dev to look at the mailbox?",
      "so he steers away from the hedge",
      ["so he can check for the mail", "because the hedge has sharp thorns", "because their father waits there", "so he can count how far he rode"],
      "Priya says \"Bikes go where your eyes go.\" Dev kept riding into the hedge because he was looking at it, so she gives him somewhere better to look."),
    R(0, "N5", "Figurative language", 2, "The comparison to a kite string that \"had gone slack\" shows that Priya:",
      "felt the bike balance on its own",
      ["was tired from all the jogging", "dropped something she was holding", "was thinking about flying kites", "lost her grip by accident"],
      "A slack string means nothing is pulling on it. Priya feels the bike stop needing her support, and right after that she lets go on purpose."),
    R(0, "N5", "Detail", 1, "Who once helped Priya learn to ride a bike?",
      "her father",
      ["her mother", "her brother", "a neighbor", "her teacher"],
      "She jogs beside Dev \"the way their father had once jogged beside her.\""),
    R(0, "N5", "Inference", 2, "Priya's eyes most likely sting at the end because she:",
      "is moved by Dev's success",
      ["is upset that he fell over", "is angry he did not thank her", "is worried he will crash again", "has been in the sun too long"],
      "Dev rides all the way to the mailbox and grins, and Priya is surprised to find herself close to tears: she is touched, the way her father may once have been. The fall onto the grass is gentle and he is fine."),
    R(0, "N5", "Word in context", 2, "The statement that \"the bicycle had been winning\" means that:",
      "Dev kept crashing it",
      ["the bicycle won a race", "Dev was racing his sister", "the bike was much too fast", "Priya kept beating Dev"],
      "For three days Dev could not stay on the bike, so the author jokes that the bicycle was winning a contest against him."),
    # ---- N6 (drill only)
    R(0, "N6", "Main idea", 1, "The passage is mainly about:",
      "a map that shows a boy his town's past",
      ["a grandfather who hates how towns change", "how to draw a map that is accurate", "a search for a horse that ran away", "a family moving to a different town"],
      "Leo finds his grandfather's old map, they walk its route together, and Leo learns what the town used to be. The grandfather is not sad; he keeps stopping to point."),
    R(0, "N6", "Detail", 1, "What stands today where the frog pond used to be?",
      "a shopping center",
      ["Leo's school", "a row of houses", "a skate park", "the stone bridge"],
      "The first paragraph says the map shows the pond where the shopping center stands today. Leo's school is on the old field."),
    R(0, "N6", "Inference", 2, "Leo expects his grandfather to be sad on the walk because:",
      "most of the places are gone",
      ["the horse bit him two times", "the old map has faded badly", "his brother broke his arm", "the walk is long and tiring"],
      "Most of the places on the map had been filled in or built over, so Leo thinks seeing them gone will make his grandfather sad."),
    R(0, "N6", "Word in context", 1, "In the phrase \"a row of tidy houses,\" the word \"tidy\" most nearly means:",
      "neat",
      ["tiny", "noisy", "costly", "empty"],
      "Tidy means neat and in good order. Tiny sounds a little like it but means very small."),
    R(0, "N6", "Prediction", 3, "Leo's own map will most likely show:",
      "places that matter to him now",
      ["only the main streets of town", "the pond and the old field", "his grandfather's old fort", "every house on his street"],
      "Leo plans to include the skate park, the corner store and the yard with the barking dog, the places in his own life, so that someone in the future will know them."),
]
