# ISEE Middle Level, Reading Comprehension. Every passage is original.
# Each passage has six questions, one per ISEE reading category (dom): Main
# (main idea), Support (supporting ideas), Inference, Vocab (vocabulary in
# context), Org (organization and logic) and Tone (tone, style and figurative
# language). Topics follow the guide: science, history, the arts and
# contemporary life.

BASICS = {"Main": "mainIdea", "Support": "findingDetail", "Vocab": "wordsInContext"}
SKILLS = {"Main": "Main idea", "Support": "Supporting ideas", "Inference": "Inference",
          "Vocab": "Vocabulary in context", "Org": "Organization and logic", "Tone": "Tone, style and figurative language"}


def R(test, stim, dom, diff, stem, key, wrong, expl):
    return dict(test=test, stim=stim, dom=dom, skill=SKILLS[dom], diff=diff, stem=stem, key=key, wrong=wrong,
                expl=expl, basics=BASICS.get(dom))


STIMULI = {
    "T1-A": ("Masters of Disguise", """An octopus resting on a reef can vanish in less than a second. One moment a diver sees a reddish animal clinging to a rock; the next, there is only rock, speckled and bumpy, exactly like everything around it. Few animals can change their appearance as quickly or as completely.

The trick lies in the skin. Just beneath the surface sit thousands of tiny sacs called chromatophores, each filled with a pigment such as yellow, red, brown or black. Every sac is ringed by small muscles. When the muscles pull, the sac stretches wide and its color spreads like a drop of ink; when they relax, the sac shrinks to a dot that is almost invisible. Because nerves from the brain control these muscles, an octopus can change color in a fraction of a second.

Color is only part of the disguise. An octopus can also raise small bumps on its skin, called papillae, to copy the rough texture of coral or seaweed. Some even change their posture, curling their arms to look like a clump of algae.

Strangely, scientists believe that most octopuses cannot see color the way people do. Their eyes have only one type of light-detecting cell. How, then, do they match their surroundings so well? Researchers are still investigating. One idea is that octopuses judge brightness and pattern rather than color; another is that their skin itself may sense light. For now, the octopus remains one of the ocean's most puzzling performers."""),
    "T1-B": ("The Keeper of Lime Rock", """In the 1800s, a lighthouse did not run itself. Someone had to climb the tower each evening, trim the wick, polish the glass and keep the lamp burning until dawn. On a tiny island of rock in the harbor of Newport, Rhode Island, that someone was often a teenager named Ida Lewis.

Ida's father was the keeper of the Lime Rock lighthouse, but soon after the family moved there he became seriously ill. Ida took over much of the work. Because the rock had no bridge to shore, she also rowed her younger brothers and sister to school each day, and she became one of the strongest rowers in the harbor.

That skill mattered. In 1869, two soldiers crossing the harbor were thrown into the water when their boat overturned in rough weather. Ida, who reportedly rushed out without stopping for a coat or shoes, rowed out and pulled them into her boat. News of the rescue spread to newspapers across the country, and visitors began arriving just to meet the young woman who had braved the icy water.

Ida did not enjoy the fuss. She said she was only doing her job, and she kept doing it for decades. In 1879 she was officially appointed keeper, and over the years she was credited with saving many people from the harbor. Long after her death, the lighthouse was renamed in her honor."""),
    "T1-C": ("The Wall on Ferris Street", """For as long as Dev could remember, the side of the laundromat on Ferris Street had been a blank gray wall, the kind of wall nobody noticed until someone sprayed a scribble on it and someone else painted over the scribble with a slightly different gray.

So when a sign appeared announcing a Neighborhood Mural Day, Dev rolled his eyes. "Nobody's going to show up," he told his grandmother. She handed him an old shirt anyway. "Then you'll have plenty of room to paint," she said.

More than forty people showed up. An artist named Ms. Okafor had sketched the design in chalk: a river winding across the wall, with a bridge, a market and dozens of small windows waiting to be filled. Each volunteer got a window. Dev stood in front of his for a long time, brush dripping, before he painted what he knew best: his grandmother's kitchen table, with a bowl of oranges in the middle.

By evening the river was blue, the market bustled with painted shoppers, and the windows glowed with other people's tables, pets, gardens and instruments. A man Dev had never spoken to pointed at the oranges. "My mother kept fruit like that," he said.

Dev walked home slowly. He had passed that wall a thousand times, he realized, without once thinking that it belonged to him."""),
    "T2-A": ("Why Leaves Change Color", """Every autumn, forests in many parts of the world put on a show of yellow, orange and red. It is tempting to think the trees are painting their leaves, but much of the color was there all summer, hidden.

A green leaf is green because of chlorophyll, the pigment that captures sunlight and lets the tree make food from water and carbon dioxide. Chlorophyll breaks down in sunlight, so all summer long the leaf keeps making more of it. The leaf also contains yellow and orange pigments called carotenoids, the same kind of pigments that color carrots and corn. In summer there is so much chlorophyll that its green hides them.

As the days grow shorter and cooler, many trees stop making chlorophyll and begin preparing to drop their leaves. The green fades, and the yellows and oranges that were there all along show through.

Reds and purples are different. They come from pigments called anthocyanins, which many trees, such as some maples, actually produce in the fall. Scientists have found that sunny days followed by cool nights tend to produce the brightest reds. That is why the same forest can look dull one autumn and blaze with color the next."""),
    "T2-B": ("Ten Days to California", """In 1860, a letter from the East Coast could take weeks to reach California by ship or stagecoach. For people with urgent news, that was far too slow. In April of that year, a company launched a bold experiment: carrying mail across the West on horseback, as fast as horses could run.

The Pony Express route stretched nearly 2,000 miles, from St. Joseph, Missouri, to Sacramento, California. Along it stood a chain of stations, roughly 10 to 15 miles apart. A rider galloped from one station to the next, leaped onto a fresh horse and kept going, handing the mail pouch to a new rider after many miles. Day and night, through deserts and mountain passes, the mail kept moving. In good conditions, a letter could cross the route in about ten days.

The riders were young and light, because every extra pound slowed a horse. The work was exhausting and dangerous, and storms, rough country and accidents were constant threats.

Yet the Pony Express lasted only about a year and a half. In October 1861, workers finished a telegraph line across the country. A message that had taken ten days by horse could now travel in minutes over a wire. Within days, the Pony Express shut down. It had lost its race not to another horse but to an invention."""),
    "T2-C": ("The Loudest Room in the Library", """When our town library announced that it would turn its old storage room into a makerspace, some people were upset. A library, they argued, should be a quiet place for books, not a workshop full of sewing machines, 3D printers and soldering irons.

I understand the worry, but I think it misses what libraries have always been for. Libraries exist to give everyone access to tools for learning. For most of history, the most important of those tools was the book, because books were expensive and most families could not own many. Today, a 3D printer is expensive in the same way, and a library that lends one is doing exactly what it has always done.

I have seen the change myself. On Saturday afternoons the makerspace is crowded with kids designing phone stands, retired engineers teaching wiring, and a woman who repairs her neighbors' broken lamps for free. Many of them also leave with a book under their arm: a guide to robotics, a history of flight, a novel recommended by someone at the next table.

The makerspace is noisy, it is true. But the reading room is still quiet, the shelves are still full, and the library is busier than it has been in years. A library is not a building for books. It is a building for curiosity."""),
    "D-A": ("The Waggle Dance", """A honeybee that finds a patch of flowers rich in nectar faces a problem: how can she tell thousands of her sisters where to go, when bees cannot speak and the hive is dark inside?

Her answer is a dance. Back in the hive, on the upright surface of the honeycomb, she runs a short straight line while shaking her body from side to side, then loops around and repeats it, again and again. Other bees crowd close, following her movements with their antennae.

In the mid-1900s, the Austrian scientist Karl von Frisch worked out what the dance means. The direction of the straight waggle run points the way. If the bee waggles straight up the comb, the food lies in the direction of the sun; if she waggles at an angle to the right of straight up, the food lies at that same angle to the right of the sun. The length of the waggle run tells distance: the longer it lasts, the farther away the flowers are.

Not every scientist believed von Frisch at first. It seemed impossible that an insect could use a kind of symbolic map. But careful experiments supported his ideas, and in 1973 he shared a Nobel Prize for his work on animal behavior. Today the waggle dance is one of the best-studied examples of communication in the animal world."""),
    "D-B": ("Twenty-Four Frames", """Watch a stop-motion film and you might think the clay figures are alive. A rabbit twitches its nose, a sailor's coat flaps in the wind, and a crowd turns to stare. Yet none of it ever moved on its own. Every motion was built, one tiny step at a time, by human hands.

Stop-motion works because of how film is shown. A movie is a series of still pictures, called frames, usually shown at twenty-four frames per second. When the pictures flash by that quickly, the eye and brain blend them into smooth motion. A stop-motion animator takes advantage of this. She poses a puppet, takes one photograph, nudges an arm or an eyebrow a fraction of an inch, takes another, and repeats.

The work is painfully slow. Many animators save time by holding each pose for two frames, which means twelve new poses for every second of film. Even so, a skilled animator may finish only a few seconds of film in a full day. Puppets often have metal skeletons, called armatures, inside them so that they hold each pose without sagging under the hot studio lights.

Why would anyone choose such a slow art? Many animators say the answer is in the small imperfections: a thumbprint in the clay, a hair of fur that shifts between frames. Those flaws remind the audience that real hands made the world on screen, and that is part of the magic."""),
    "D-C": ("Clinton's Ditch", """In 1817, New York began digging a canal that many people thought was a foolish dream. It would run about 363 miles, from Albany on the Hudson River west to Buffalo on Lake Erie, through forests, swamps and hills. Critics mocked it as "Clinton's Ditch," after DeWitt Clinton, the governor who championed it.

Building it was enormous work. Crews cleared trees and dug through earth and rock, largely by hand and with animal power. They also built dozens of locks, water-filled chambers that raised and lowered boats where the land climbed or fell. Engineers learned as they went, since few people in the young nation had built anything like it.

When the canal opened in 1825, the critics fell silent. Boats pulled by mules and horses walking on towpaths beside the water could carry goods between the Great Lakes and New York City far more cheaply than wagons on rough roads. The cost of shipping fell sharply. Farmers in the West could sell their crops in Eastern cities, and Eastern workshops could send tools and cloth back.

Towns sprang up along the route, and New York City grew into the busiest port in the country. The "ditch" that people had laughed at had changed the shape of the nation's trade."""),
    "D-D": ("First Shift", """Tamsin had pictured her first afternoon at the animal shelter many times: puppies tumbling over her shoes, kittens purring in her lap. Instead, the volunteer coordinator handed her a bucket and a scrub brush.

"Kennels first," said Mr. Reyes. "Then, if there's time, you can sit with Biscuit."

Biscuit turned out to be a thin brown dog who stayed pressed against the back of his kennel, watching her with wide, worried eyes. When Tamsin crouched and reached toward him, he flinched.

"He came in last week," Mr. Reyes said quietly. "He doesn't trust people yet. Don't reach for him. Just be there."

So Tamsin sat on the floor outside the open kennel door and read her library book aloud, not looking at the dog. For twenty minutes nothing happened. Then she felt something warm against her knee. Biscuit had crept out and rested his chin there, so lightly it was almost like a question.

Tamsin kept reading. She did not want to scare off the answer."""),
}

ITEMS = [
    # ---------------- Practice Test 1 ----------------
    R(1, "T1-A", "Main", 1, "Which statement best expresses the main idea of the passage?",
      "Octopuses use their skin to hide with great speed.", ["Octopuses are the most colorful animals in the sea.", "Divers often lose sight of animals on coral reefs.", "Scientists have shown that octopuses see in color."],
      "Every paragraph is about how octopuses disguise themselves through their skin. The passage says most octopuses probably cannot see color, so that option contradicts it."),
    R(1, "T1-A", "Support", 1, "According to the passage, what makes a chromatophore spread its color?",
      "Muscles that pull the sac wide", ["Light shining on the skin", "Bumps rising under the sac", "Ink released into the nearby water"],
      "The second paragraph says that when the muscles around each sac pull, the sac stretches wide and its color spreads. Ink is only a comparison."),
    R(1, "T1-A", "Inference", 2, "The passage suggests that an octopus changes its appearance mainly to:",
      "avoid being noticed", ["keep its body warm", "signal danger to divers", "show that it is hungry"],
      "Words like vanish and disguise, and the octopus matching the rock and coral around it, point to hiding. Nothing in the passage mentions warmth, signals or hunger."),
    R(1, "T1-A", "Vocab", 2, "As used in the second paragraph, the word \"ringed\" most nearly means:",
      "surrounded", ["sounded", "decorated", "named"],
      "Each sac is ringed by small muscles, meaning the muscles form a ring around it. Sounded is the meaning of ringing a bell, which does not fit here."),
    R(1, "T1-A", "Org", 3, "How is the passage organized?",
      "It describes a skill, explains it, then raises a question.", ["It tells one diver's story from start to finish.", "It compares the octopus with many other sea animals.", "It argues that coral reefs need more protection."],
      "The first paragraph shows the disguise, the middle paragraphs explain how skin color and texture work, and the last asks how a colorblind animal matches colors. The diver appears only briefly."),
    R(1, "T1-A", "Tone", 2, "The author's attitude toward the octopus is best described as:",
      "fascinated", ["fearful", "doubtful", "indifferent"],
      "The author calls the octopus one of the ocean's most puzzling performers and describes its tricks with wonder. Nothing suggests fear or doubt."),
    R(1, "T1-B", "Main", 1, "What is the passage mainly about?",
      "A young keeper known for her courage", ["How lighthouse lamps were invented", "Why Newport built a new harbor", "A soldier's long trip across the state"],
      "The passage follows Ida Lewis from running the lighthouse as a teenager to her famous rescue and long career."),
    R(1, "T1-B", "Support", 1, "According to the passage, why did Ida row to shore every day?",
      "To take her siblings to school", ["To buy oil for the lamp", "To visit her father at the hospital", "To deliver mail to soldiers"],
      "The second paragraph says the rock had no bridge, so she rowed her younger brothers and sister to school each day."),
    R(1, "T1-B", "Inference", 2, "Ida's statement that she was \"only doing her job\" suggests that she:",
      "saw her rescues as ordinary duty", ["wanted more pay for her work", "disliked living on the island", "regretted helping the two soldiers"],
      "She disliked the fuss and kept working for decades, so she seems to have thought of rescues as part of the job, not as something heroic."),
    R(1, "T1-B", "Vocab", 2, "As used in the third paragraph, the word \"braved\" most nearly means:",
      "faced", ["avoided", "described", "warmed"],
      "To brave icy water is to face it in spite of the danger. Avoided means the opposite."),
    R(1, "T1-B", "Org", 3, "Why does the author begin by describing a lighthouse keeper's nightly tasks?",
      "To show how demanding the job was", ["To explain how lamps were first made", "To compare old and new lighthouses", "To describe Newport's busy harbor"],
      "Listing the climbing, trimming and polishing shows how much work a keeper did, which makes a teenager doing it more impressive."),
    R(1, "T1-B", "Tone", 2, "Which word best describes how the author presents Ida Lewis?",
      "admiring", ["mocking", "critical", "puzzled"],
      "The author praises her skill, courage and modesty, and ends with the lighthouse renamed in her honor."),
    R(1, "T1-C", "Main", 2, "Which statement best expresses the theme of the story?",
      "Shared work can make a place feel like home.", ["Artists should always plan their work alone.", "Old buildings ought to be torn down.", "Gray walls are hard to keep clean in cities."],
      "By painting the wall with his neighbors, Dev comes to feel that the wall belongs to him. The story shows an artist planning with many volunteers, not alone."),
    R(1, "T1-C", "Support", 1, "What did Dev paint in his window?",
      "His grandmother's kitchen table", ["A bridge over the winding blue river", "A busy outdoor market", "A man holding some oranges"],
      "The third paragraph says he painted his grandmother's kitchen table with a bowl of oranges. The bridge and market were part of Ms. Okafor's design."),
    R(1, "T1-C", "Inference", 2, "Dev's remark that \"nobody's going to show up\" suggests that at first he:",
      "doubted that neighbors would care", ["planned to paint the whole wall alone", "was afraid of painting badly", "had helped with murals before"],
      "He rolled his eyes and predicted no one would come, which shows he did not expect the neighborhood to be interested."),
    R(1, "T1-C", "Vocab", 2, "As used in the fourth paragraph, the word \"bustled\" most nearly means:",
      "was full of activity", ["was painted gray", "was closed for the night", "was quiet and empty"],
      "A market that bustled with shoppers is busy and lively. Quiet and empty is the opposite."),
    R(1, "T1-C", "Org", 3, "How does the final paragraph relate to the rest of the story?",
      "It shows how Dev's view has changed.", ["It explains how the mural was designed.", "It brings in a new problem for Dev.", "It describes the wall before the event."],
      "At the start Dev ignored the wall; at the end he realizes it belongs to him, which shows the change the day made."),
    R(1, "T1-C", "Tone", 2, "The mood at the end of the story is best described as:",
      "thoughtful and warm", ["tense and frightening", "angry and bitter", "silly and playful"],
      "Dev walks home slowly, thinking about a wall that now feels like his, after a stranger shares a memory. Nothing at the end is tense or bitter."),
    # ---------------- Practice Test 2 ----------------
    R(2, "T2-A", "Main", 1, "Which statement best expresses the main idea of the passage?",
      "Fall colors come from pigments, some hidden all summer.", ["Trees paint their leaves to attract animals.", "Carrots and corn get their bright color from chlorophyll.", "Leaves turn red only after a hard freeze."],
      "The passage explains that yellows and oranges were there all summer and reds come from pigments made in fall. It says carotenoids color carrots, not chlorophyll."),
    R(2, "T2-A", "Support", 1, "According to the passage, why does a leaf keep making chlorophyll all summer?",
      "Sunlight breaks it down", ["Cool nights destroy it quickly", "Carotenoids use it up", "Rain washes it away"],
      "The second paragraph says chlorophyll breaks down in sunlight, so the leaf must keep replacing it."),
    R(2, "T2-A", "Inference", 3, "Based on the passage, an autumn with cloudy days and warm nights would most likely produce:",
      "fewer bright red leaves", ["more green leaves", "leaves that never fall off", "leaves with no yellow"],
      "Sunny days followed by cool nights produce the brightest reds, so the opposite weather would likely mean duller reds."),
    R(2, "T2-A", "Vocab", 2, "As used in the last paragraph, the word \"blaze\" most nearly means:",
      "glow brightly", ["burn down", "fade slowly", "grow quickly"],
      "A forest that can blaze with color is shining with bright color. Nothing is actually burning, so burn down is too literal."),
    R(2, "T2-A", "Org", 2, "What is the main purpose of the second paragraph?",
      "To explain the pigments in a summer leaf", ["To describe the brightest fall forests on Earth", "To compare maples with other trees", "To explain why trees drop their leaves"],
      "The second paragraph names chlorophyll and carotenoids and explains why the green hides the yellow in summer."),
    R(2, "T2-A", "Tone", 1, "The author's tone is best described as:",
      "informative", ["worried", "sarcastic and mocking", "sorrowful"],
      "The author calmly explains a scientific process with facts and examples."),
    R(2, "T2-B", "Main", 1, "What is the passage mainly about?",
      "A fast mail service and why it ended", ["How telegraph wires were strung", "The life of one famous rider", "Why California joined the United States"],
      "The passage explains how the Pony Express worked and why the telegraph made it unnecessary. No single rider is named."),
    R(2, "T2-B", "Support", 1, "According to the passage, why were Pony Express riders young and light?",
      "Extra weight slowed the horses", ["Older men refused the work", "The saddles were made very small", "Stations had little food"],
      "The third paragraph says the riders were light because every extra pound slowed a horse."),
    R(2, "T2-B", "Inference", 2, "Which statement would the author most likely agree with?",
      "New inventions can quickly replace old ways.", ["The riders failed because they were careless.", "Ships carried mail faster than horses did.", "The telegraph took years to replace the riders."],
      "The Pony Express shut down within days of the telegraph line, which shows an invention replacing an older method fast. The passage says ships took weeks."),
    R(2, "T2-B", "Vocab", 2, "As used in the first paragraph, the word \"launched\" most nearly means:",
      "started", ["threw", "sailed", "canceled"],
      "To launch an experiment is to start it. Threw and sailed are other meanings of launch that do not fit an experiment."),
    R(2, "T2-B", "Org", 2, "How does the author organize the passage?",
      "In time order, from start to end", ["By comparing two rival companies", "From the West Coast to the East", "As a set of letters from riders"],
      "The passage moves from the problem in 1860, to how the service worked, to its end in 1861."),
    R(2, "T2-B", "Tone", 3, "The phrase \"lost its race\" in the last sentence is an example of:",
      "figurative language", ["a direct quotation", "a scientific fact", "an exaggerated number"],
      "The Pony Express did not run in a real race; the phrase compares the competition with the telegraph to a race."),
    R(2, "T2-C", "Main", 2, "Which statement best expresses the author's main point?",
      "A makerspace fits a library's true purpose.", ["Libraries should stop buying new books.", "Families today cannot afford books.", "Makerspaces belong in schools, not libraries."],
      "The author argues that libraries exist to share costly tools for learning, and a makerspace does exactly that."),
    R(2, "T2-C", "Support", 2, "Which detail does the author use to show that the makerspace leads people to books?",
      "Visitors leave carrying books", ["The reading room stays quiet", "Engineers teach wiring there", "The room was once for storage"],
      "The third paragraph says many makerspace visitors leave with a book under their arm."),
    R(2, "T2-C", "Inference", 3, "The author mentions that books were once expensive in order to suggest that:",
      "libraries have always shared costly tools", ["books are no longer worth reading", "families today own too many books", "makerspaces should charge every user a fee"],
      "The comparison shows that lending a 3D printer today is like lending books in the past: both give everyone tools they could not easily own."),
    R(2, "T2-C", "Vocab", 2, "As used in the second paragraph, the word \"access\" most nearly means:",
      "the chance to use", ["a way to escape", "the cost of", "a place to store"],
      "Giving everyone access to tools means giving them the chance to use the tools."),
    R(2, "T2-C", "Org", 2, "How does the author respond to the people who were upset?",
      "Explains their view, then disputes it", ["Ignores their view entirely", "Agrees with them completely", "Quotes their angry letters at great length"],
      "The author says, \"I understand the worry,\" and then explains why it misses what libraries are for."),
    R(2, "T2-C", "Tone", 2, "The author's tone is best described as:",
      "confident and persuasive", ["angry and insulting", "uncertain and quite nervous", "neutral and detached"],
      "The author takes a clear side and supports it with reasons and examples, while still treating the critics politely."),
    # ---------------- Drill only ----------------
    R(0, "D-A", "Main", 1, "What is the passage mainly about?",
      "How honeybees share where food is", ["Why bees prefer certain flowers", "How honeycomb is built in a hive", "The childhood of an Austrian scientist"],
      "The passage explains the waggle dance and how it tells other bees the direction and distance of food."),
    R(0, "D-A", "Support", 1, "According to the passage, what does the length of the waggle run show?",
      "How far away the food is", ["Which flowers have nectar", "How many bees should go", "Where the sun will set"],
      "The third paragraph says the longer the waggle run lasts, the farther away the flowers are."),
    R(0, "D-A", "Inference", 3, "If a bee waggles straight down the comb, the food is most likely:",
      "directly away from the sun", ["directly toward the sun", "very close to the hive", "underground near the old hive"],
      "Straight up means toward the sun, and the angle from straight up matches the angle from the sun, so straight down means the opposite direction."),
    R(0, "D-A", "Vocab", 2, "As used in the fourth paragraph, the word \"symbolic\" most nearly means:",
      "using signs for things", ["painted in many colors", "hard to remember", "made of wax"],
      "A symbolic map uses signs, here movements, to stand for real directions and distances."),
    R(0, "D-A", "Org", 2, "What is the purpose of the first paragraph?",
      "To pose the problem the dance solves", ["To describe the parts of a hive", "To explain von Frisch's early experiments", "To compare bees with other insects"],
      "It asks how a bee can tell others where food is without speaking, and the rest of the passage answers that question."),
    R(0, "D-A", "Tone", 2, "How does the author most likely feel about the waggle dance?",
      "impressed by its cleverness", ["doubtful that it is real at all", "bored by its details", "worried about the bees"],
      "The author calls it one of the best-studied examples of animal communication and describes it with clear interest. The doubt in the passage belongs to early scientists, not the author."),
    R(0, "D-B", "Main", 1, "Which statement best expresses the main idea of the passage?",
      "Stop-motion builds movement slowly, by hand.", ["Clay is the best material for any film.", "Modern films no longer use real frames.", "Most animators dislike how slow their work is."],
      "The passage explains how every motion in stop-motion is built one photograph at a time by people."),
    R(0, "D-B", "Support", 1, "According to the passage, why do puppets have armatures inside them?",
      "To hold each pose steady", ["To make them look much older", "To let them move alone", "To keep the clay cool"],
      "The third paragraph says the metal skeletons let puppets hold each pose without sagging under hot lights."),
    R(0, "D-B", "Inference", 3, "An animator holds each pose for two frames. How many poses does she need for 5 seconds of film?",
      "60", ["10", "24", "120"],
      "Holding each pose for two frames means twelve poses per second, and 5 × 12 = 60. The number 120 is the count of frames, not poses."),
    R(0, "D-B", "Vocab", 2, "As used in the second paragraph, the word \"nudges\" most nearly means:",
      "moves slightly", ["pushes far away", "paints over", "pulls apart"],
      "The animator nudges an arm a fraction of an inch, which means moves it just a little."),
    R(0, "D-B", "Org", 2, "Why does the author ask a question at the start of the final paragraph?",
      "To bring in why artists choose it", ["To show the author is unsure", "To change the subject to film cameras", "To ask readers for opinions"],
      "The question \"Why would anyone choose such a slow art?\" leads straight into the animators' answer about handmade imperfections."),
    R(0, "D-B", "Tone", 2, "The phrase \"part of the magic\" suggests that the author views stop-motion as:",
      "charming because it is handmade", ["too slow to be worth the effort", "old-fashioned and dull", "a trick that fools people"],
      "The author says the small flaws remind viewers that real hands made the film, and calls that part of the magic, which is praise."),
    R(0, "D-C", "Main", 1, "What is the passage mainly about?",
      "A doubted canal that changed trade", ["The early life story of DeWitt Clinton", "How locks are built today", "Why wagons beat boats on cost"],
      "The passage follows the Erie Canal from a mocked plan to a success that reshaped the nation's trade."),
    R(0, "D-C", "Support", 1, "According to the passage, what did the locks do?",
      "Raised and lowered boats", ["Stored water for farms", "Kept out enemy ships", "Marked each town's border"],
      "The second paragraph defines locks as chambers that raised and lowered boats where the land climbed or fell."),
    R(0, "D-C", "Inference", 2, "The critics most likely \"fell silent\" when the canal opened because:",
      "it proved useful and successful", ["they had moved away to Buffalo", "the governor punished them", "the canal was never finished"],
      "Right after that phrase the passage describes how the canal cut shipping costs, so the critics had been proved wrong."),
    R(0, "D-C", "Vocab", 2, "As used in the first paragraph, the word \"championed\" most nearly means:",
      "supported", ["defeated", "won", "designed"],
      "To champion a plan is to speak and work for it. Won is the sports meaning of champion, which does not fit here."),
    R(0, "D-C", "Org", 2, "What is the purpose of the last paragraph?",
      "To sum up the canal's effects", ["To describe how the canal was dug", "To introduce the canal's critics", "To compare canals with railroads"],
      "It names the towns and the busy port that grew from the canal and ends by saying it changed the nation's trade."),
    R(0, "D-C", "Tone", 3, "The quotation marks around \"ditch\" in the last paragraph suggest that the author:",
      "is echoing the critics' insult", ["thinks the word is misspelled", "is quoting Clinton himself", "believes the canal was shallow"],
      "The critics had mocked the canal as Clinton's Ditch. Putting the word in quotation marks recalls that insult, now proved wrong."),
    R(0, "D-D", "Main", 2, "Which statement best expresses the theme of the story?",
      "Trust grows through patience, not force.", ["Volunteer work is mostly cleaning.", "Books make good gifts for pets.", "Puppies are much easier to love than older dogs."],
      "Biscuit comes to Tamsin only after she stops reaching for him and waits quietly."),
    R(0, "D-D", "Support", 1, "What did Mr. Reyes tell Tamsin to do with Biscuit?",
      "Stay near him without reaching", ["Feed him a treat very slowly", "Walk him around the shelter yard", "Read him a story aloud"],
      "Mr. Reyes says, \"Don't reach for him. Just be there.\" Reading aloud was Tamsin's own idea."),
    R(0, "D-D", "Inference", 2, "Tamsin most likely avoids looking at Biscuit while she reads in order to:",
      "seem less threatening to him", ["enjoy an exciting book", "hide her fear of dogs", "finish before her shift ends"],
      "Biscuit is frightened of people, so not staring at him helps him feel safe enough to come closer."),
    R(0, "D-D", "Vocab", 2, "As used in the fifth paragraph, the word \"crept\" most nearly means:",
      "moved slowly and quietly", ["jumped out quickly", "barked very loudly", "rolled over onto its back"],
      "Biscuit crept out, coming forward carefully and quietly. A frightened dog would not jump out quickly."),
    R(0, "D-D", "Org", 3, "How does the first paragraph prepare for the rest of the story?",
      "It sets up a contrast with what happens.", ["It gives Biscuit's whole history in detail.", "It explains how shelters are run.", "It describes Mr. Reyes at length."],
      "Tamsin imagines playful puppies and kittens, but her real afternoon brings cleaning and a frightened dog, a contrast the story builds on."),
    R(0, "D-D", "Tone", 3, "In the last sentence, \"the answer\" refers to:",
      "Biscuit's first sign of trust", ["an answer in her book", "Mr. Reyes's earlier instructions", "the end of her shift"],
      "The chin on her knee is called almost like a question; the answer she hopes for is Biscuit trusting her, so she keeps still."),
]
