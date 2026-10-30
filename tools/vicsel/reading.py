"""Reading texts and items for the Victorian Selective Entry practice test.

Read by tools/vicsel/build.py (runpy). STIMULI are the shared texts; ITEMS are
(stimulus key, test, skill, difficulty, basics, stem, key, distractors,
explanation), kept in source order so each text's questions stay together.
All texts are original, written for Year 8 readers.
"""

STIMULI = {
    # ---------------- Practice Test 1 ----------------
    "R1-A": ("The Four O'Clock Shift", """The alarm went off at a quarter to four, and for a moment Priya could not remember why she had set it. Then she smelt it, even through the bedroom wall: yeast, warm and sour, the smell of her grandmother's bakery waking up below the flat.

She had begged for this for a year. Every school holiday she had asked, and every time Nani had laughed and said, "When your hands are ready." Priya had never understood what that meant. Her hands were the same as anyone's.

Downstairs, the kitchen was bright and loud with the hum of the ovens. Nani did not look up. She was folding a great pale mound of dough, lifting the edge and pressing it into the middle, turning it a quarter, lifting again. Her forearms were dusted white to the elbow.

"Wash," she said. "Then watch."

Priya watched for an hour. She watched the dough being cut and weighed, each piece dropped on the scale and corrected with a pinch, never more than twice. She watched loaves being shaped with three quick movements that she could not follow, no matter how closely she looked. When at last Nani slid a piece of dough across the bench to her, Priya pressed it, rolled it, folded it, and produced something that looked like a sleeping cat that had been sat on.

She waited for the laugh. It did not come.

"Again," said Nani.

By six o'clock Priya had made eleven sleeping cats. The twelfth was almost round. Nani picked it up, turned it over, and put it on the tray with the others, the real ones, the ones that would be sold.

Priya stared at it as the tray went into the oven. Her shoulders ached and there was dough under every fingernail. She looked down at her hands, and for the first time they did not seem quite the same as anyone's."""),

    "R1-B": ("The Bird That Borrows Every Song", """Walk through the wet mountain forests east of Melbourne on a winter morning and you may hear a kookaburra laugh, a whipbird crack its whip and a rosella chatter, all from the same patch of ferns. Look closely, and you may find that every one of those calls is coming from a single brown bird about the size of a pheasant. This is the superb lyrebird, and it is one of the finest mimics in the animal world.

Male lyrebirds do most of the singing. During the breeding season, which falls in the cold months, each male clears a small mound of earth on the forest floor and performs on it, sometimes for hours a day. He throws his long tail forward over his head so that its fine, lacy feathers form a shimmering canopy, then pours out a stream of sounds copied from the birds around him. A good performance can contain the calls of a dozen or more species, delivered so accurately that it can be hard to tell the copy from the real bird.

Why go to so much trouble? Researchers believe the song is aimed mainly at females, who move between the mounds and listen. A male who can copy many species, and copy them well, may be showing that he is old enough and healthy enough to have spent years learning. In other words, the song is a kind of advertisement.

Lyrebirds are also known for copying sounds that are not made by birds at all. Stories of birds imitating car alarms, camera shutters and chainsaws are often repeated, and some have been recorded, mostly from birds living close to people. Scientists point out that these cases are unusual. In the wild, most of a lyrebird's song is made of the forest's own voices.

That makes the lyrebird a living record of its surroundings. If a forest falls silent, so, in time, does part of the lyrebird's song."""),

    "R1-C": ("Late Train", """The last train home is mostly empty seats
and windows black as water. In the glass
the carriage floats beside us, and repeats
each yellow light we never seem to pass.

A woman in a nurse's coat is sleeping
upright, her bag held tightly on her knee.
A boy in football socks is keeping
score on a phone of games no one will see.

And I am in the window too, a pale
and borrowed face that rides along outside,
that leans its head against the rattling rail
and goes wherever I go, for the ride.

The doors breathe open. Nobody gets on.
The station's clock is wrong. And then it's gone."""),

    "R1-D": ("Open the Library on Sundays", """To the editor,

Our town library is open six days a week and closed on the one day most families are actually free. I am writing to ask the council to change that.

The council will say that Sunday opening costs money, and it does. Staff must be paid, and the building must be heated and lit. But consider what we already pay for: a modern building, thousands of books, twenty computers and a quiet study room, all of it locked up for one day in seven. Opening on Sunday would not mean buying anything new. It would mean using what we have.

The people who would gain most are the people with the fewest other options. Many students in our town share small homes with large families and have no quiet place to work. Many adults work long hours from Monday to Saturday and can only visit on their day off. For them, a library closed on Sunday is a library that might as well not exist.

Some will argue that people can borrow books online now. That is true, and the online service is excellent. But a library is not only a place that lends books. It is somewhere to sit for an afternoon without being asked to buy anything. There are very few such places left.

Other councils in our region have trialled Sunday opening and kept it. I am not asking our council to promise the same. I am asking it to try: open from noon until five for six months, count the visitors, and then decide.

Yours sincerely,
D. Nguyen"""),

    # ---------------- Practice Test 2 ----------------
    "R2-A": ("The Audition", """Theo had practised the piece so many times that he could play it in his sleep, and some nights he did, his fingers twitching on the blanket. But the hall at the conservatorium was nothing like his bedroom. It was enormous and cold, and the piano at the front of it was so black and shiny that he could see his own nervous face in its lid.

There were three judges behind a long table. The one in the middle had silver hair and did not smile. She wrote something before Theo had played a note, and he spent a frantic second wondering what it could be. Had he walked wrongly? Was his shirt untucked?

He sat. He adjusted the stool, then adjusted it back. He put his hands on the keys and the first bars came out clean and bright, exactly as they had at home. Then, in the ninth bar, his left hand slipped. It was only one note, but in that great quiet room it rang out like a dropped saucepan.

Theo felt his face burn. Every instinct told him to stop, to apologise, to start again. Instead, he heard his teacher's voice, as clearly as if she were standing beside him: "The audience only remembers what you do next."

So he kept going. He played the slow middle section more gently than he ever had before, because his hands were still shaking and gentleness was all they could manage. And somewhere in that section, the shaking stopped.

When he finished, the silver-haired judge looked up for the first time. "The middle," she said. "Where did that come from?"

Theo opened his mouth and found he had no answer at all."""),

    "R2-B": ("A Road Built as a Memorial", """The Great Ocean Road winds for about 240 kilometres along the south-west coast of Victoria, between Torquay and Allansford. Today it is one of the most famous drives in Australia, crowded with tourists who come for its cliffs, beaches and limestone stacks. But the road was not built for tourism alone. It was built as a memorial, and it was built by people who had come home from war.

At the end of the First World War, thousands of Australian soldiers returned to a country that struggled to find work for them. At the same time, the coastal towns of south-west Victoria were cut off from one another, reachable only by sea or by rough bush tracks. A plan was formed to solve both problems at once: returned servicemen would be employed to build a road along the coast, and the road would honour those who had died in the war.

Work began in 1919. Around three thousand returned soldiers worked on the road over the following years, much of it by hand. They used picks, shovels, wheelbarrows and explosives to cut a path into steep cliffs above the sea. The work was dangerous, and some workers lost their lives. The camps were basic, and the men endured cold winds and heavy rain.

The road opened in stages, and the full route was officially opened in 1932. For some years drivers paid a toll to use it, which helped repay the cost of building it.

The Great Ocean Road is often described as the world's largest war memorial. Unlike a statue or a plaque, it is a memorial that people use every day, and most of those who drive it never realise what it commemorates."""),

    "R2-C": ("Grandfather's Shed", """It smells of oil and sawdust and of rain
that came in under the door one year, and stayed.
The tools hang on their nails in a neat chain
of outlines, drawn in marker, where they're laid.

He drew around each one so he would know
which one was missing, and who had it, and why.
The outlines stay. The tools began to go
to cousins, neighbours, friends. I don't know why

I keep coming here. There's nothing left to mend.
The bench is clear. The radio is still.
But every empty outline, end to end,
is shaped exactly like the thing it held,

and in the dust the light makes on the floor
I see his hands, and what the tools were for."""),

    "R2-D": ("Two Views on the Skate Park", """Text 1: from a letter by a local resident

The proposal to build a skate park in Riverside Reserve is well meant, but the reserve is the wrong place for it. Riverside is one of the few quiet green spaces left in our suburb. Older residents walk there every morning, and parents bring small children to the playground because it is calm. A skate park would bring noise from early morning until after dark, and the car park, which is already full on weekends, cannot cope with more visitors. I am not against young people having somewhere to skate. I am against putting it where it will spoil the reserve for everyone else.

Text 2: from a speech by a Year 10 student to the council

Every week, police move skaters on from the shopping centre car park, the library steps and the train station. We are told, again and again, that we cannot skate there. Fine. Then tell us where we can. Riverside Reserve is close to the station and to two schools, so young people could get there without being driven. It is open and easy to see from the road, which makes it safer than the empty car parks where people skate now. A skate park is not a nuisance being forced on a community. It is part of the community making room for us."""),

    # ---------------- Drill only ----------------
    "R0-A": ("How Bees Keep Their Cool", """A honey bee colony is in some ways a single animal. Tens of thousands of bees share one nest, and together they control the conditions inside it with remarkable precision. Nowhere is this clearer than in the way they manage temperature.

The young bees, or brood, develop properly only within a narrow range of warmth, about 34 to 35 degrees Celsius. If the brood is too cold, the bees are slow to develop; if it is too hot, they may be damaged or die. The colony therefore works hard to keep the brood area steady, whatever the weather outside.

On a cold day, worker bees cluster tightly and shiver their flight muscles without moving their wings. This releases heat, rather as people shiver when they are cold. On a hot day, the problem is reversed, and the colony has several ways to deal with it.

First, some workers line up at the entrance and fan their wings, drawing air through the nest. Second, foragers that would normally collect nectar begin collecting water instead. They spread tiny droplets over the comb, and as the water evaporates, it carries heat away, cooling the nest in much the same way that sweat cools skin. Third, when the nest becomes very crowded and warm, many bees may leave the comb and hang in a cluster outside the entrance, which reduces the heat produced inside.

No single bee directs any of this. Each worker responds to the conditions immediately around her, and the colony's temperature control emerges from thousands of small decisions."""),

    "R0-B": ("Lost at the Show", """Mai had been holding her little brother's hand for the entire afternoon, through the animal pavilion and the woodchop and the long, sticky queue for fairy floss. She let go for exactly ten seconds to pay for a showbag. When she turned around, Bao was gone.

For a moment the crowd seemed to grow louder and taller, a wall of legs and prams and elbows. Mai's first thought was to run, anywhere, calling his name. Her second thought, which arrived a heartbeat later and in her mother's voice, was: stop, and think like Bao.

Bao was five. Bao did not care about showbags or woodchopping. Bao had spent the whole day talking about one thing, and he had talked about it so often that Mai had stopped listening.

The tractors.

She pushed back through the crowd towards the farm machinery display, past the dog trial and the jam judging, and there he was, standing on the bottom step of an enormous green tractor, staring up at the cabin as if it were a castle. He had not even noticed he was lost.

Mai's legs, she discovered, had gone wobbly. She sat down on the grass beside the tractor and waited until they felt like legs again.

"Can I go up?" said Bao.

"No," said Mai. Then, because her heart was still thumping and she had never been so glad to see anyone in her life, she said, "Maybe. Let's find someone to ask." """),
}

ITEMS = [
    ("R1-A", 1, "Inference", 2, "inference",
     "Why had Nani always told Priya to wait \"when your hands are ready\"?",
     "She believed baking skill had to be learned through practice",
     ["She thought Priya's hands were too small for the dough", "She did not want Priya to get up so early", "She wanted Priya to finish school before working"],
     "By the end Priya's hands have learned something through hours of repetition, which shows what Nani meant: readiness comes from practice. Nothing suggests Nani worried about size, early starts or school."),
    ("R1-A", 1, "Words in context", 1, "wordsInContext",
     "Each piece of dough was \"corrected with a pinch\". This means Nani",
     "adjusted the weight with a little dough",
     ["squeezed the dough to help it rise", "added a pinch of salt for flavour", "pinched Priya to correct her mistakes"],
     "The pieces are being cut and weighed on a scale, so a pinch corrects the weight. The sentence is about the dough, not Priya."),
    ("R1-A", 1, "Author's technique", 2, "inference",
     "Priya's first attempts are described as looking like \"a sleeping cat that had been sat on\". The writer uses this image mainly to",
     "show, with humour, how lumpy her loaves were",
     ["suggest that Priya would rather be back in bed", "show that Priya was careless with the dough", "hint that a cat lived in the bakery"],
     "The comparison is a funny picture of a shapeless, squashed loaf. Priya is trying hard, so careless does not fit."),
    ("R1-A", 1, "Character", 2, "inference",
     "\"She waited for the laugh. It did not come.\" What does this moment show about Nani?",
     "She takes Priya's efforts seriously",
     ["She is too busy to notice the loaf", "She is disappointed in Priya's work", "She has lost her usual sense of humour"],
     "Nani used to laugh off Priya's requests, but now that Priya is working she simply says \"Again\", treating her as a learner. Nothing suggests disappointment or that she failed to notice."),
    ("R1-A", 1, "Theme", 3, "mainIdea",
     "Which sentence best expresses the main idea of the story?",
     "Skill comes slowly through effort, and brings pride",
     ["Grandparents are stricter teachers than parents are", "Getting up early is the real secret to success", "Baking bread is too difficult for most children"],
     "The story moves from failed loaves to one good enough to sell, and ends with Priya seeing her hands differently. The other options take a small detail or contradict the ending."),
    ("R1-B", 1, "Main idea", 1, "mainIdea",
     "What is the passage mainly about?",
     "How and why the superb lyrebird copies other sounds",
     ["Where to see birds in the forests near Melbourne", "How lyrebirds build their nests", "Why lyrebirds copy chainsaws and car alarms"],
     "Every paragraph is about the lyrebird's mimicry: what it sounds like, why males do it and what it copies. Chainsaws are only one unusual detail."),
    ("R1-B", 1, "Finding detail", 1, "findingDetail",
     "According to the passage, when do male lyrebirds perform on their mounds?",
     "In the breeding season, in the cold months",
     ["Only at dawn during the summer months", "Whenever another bird calls nearby", "All year round, at any time of day"],
     "The second paragraph says the breeding season \"falls in the cold months\", and that is when each male performs on his mound."),
    ("R1-B", 1, "Inference", 2, "inference",
     "Why might a female lyrebird prefer a male who copies many species well?",
     "It suggests he has lived and learned for years",
     ["It frightens rival males away from his mound", "It attracts insects that she can feed on", "It shows that he lives close to people"],
     "The passage says a skilled mimic may be showing he is \"old enough and healthy enough to have spent years learning\". The other reasons are not mentioned."),
    ("R1-B", 1, "Author's purpose", 2, "authorPurpose",
     "Why does the writer include the sentence \"Scientists point out that these cases are unusual\"?",
     "To balance the famous stories with what is usual",
     ["To show that the famous stories are made up", "To warn readers not to record lyrebirds at home", "To prove lyrebirds prefer machine sounds"],
     "The writer accepts that some cases were recorded but stresses that wild lyrebirds mostly copy the forest. So the sentence keeps the unusual stories in proportion rather than calling them false."),
    ("R1-B", 1, "Conclusion", 3, "inference",
     "The last sentence says that if a forest falls silent, \"so, in time, does part of the lyrebird's song\". What does this suggest?",
     "Lyrebirds can only copy birds that are still around",
     ["Lyrebirds stop singing altogether in the winter", "Lyrebirds sing only when the forest is noisy", "Logging machines frighten lyrebirds into silence"],
     "The song is a \"living record\" of the birds around it. If those birds vanish, young lyrebirds have nothing to copy, so that part of the song is lost over time."),
    ("R1-C", 1, "Setting", 1, "findingDetail",
     "When is the poem set?",
     "Late at night",
     ["Early in the morning", "In the middle of the day", "During a storm"],
     "It is \"the last train home\", the windows are \"black as water\" and a nurse is asleep, all of which point to late at night."),
    ("R1-C", 1, "Imagery", 2, "inference",
     "In the first verse, why does the carriage seem to float \"beside us\"?",
     "Its reflection appears in the dark window",
     ["Another train is running alongside", "The train is crossing a river", "The speaker is dreaming"],
     "\"In the glass\" the carriage is repeated, which is a reflection in a window made dark by the night outside."),
    ("R1-C", 1, "Inference", 2, "inference",
     "What can the reader most likely infer about the woman in the nurse's coat?",
     "She is very tired",
     ["She has missed her stop", "She is going to a party", "She is afraid of the boy"],
     "She is asleep upright in a nurse's coat on the last train home, so she is very tired, probably after a long shift. Nothing in the poem says she missed her stop or fears anyone."),
    ("R1-C", 1, "Words in context", 2, "wordsInContext",
     "The speaker calls the face in the window \"borrowed\". This suggests the face",
     "is the speaker's own reflection",
     ["belongs to another passenger", "will be given back at the end of the trip", "has been painted onto the glass"],
     "The \"pale and borrowed face\" goes wherever the speaker goes, so it is the speaker's own reflection, borrowed from the real face for a while."),
    ("R1-C", 1, "Tone", 3, "toneWords",
     "Which word best describes the mood of the poem?",
     "quietly reflective",
     ["tense and frightened", "joyful and excited", "angry and bitter"],
     "The speaker calmly notices sleeping passengers, reflections and an empty station. Nothing in the poem is threatening, joyful or angry."),
    ("R1-D", 1, "Main idea", 1, "mainIdea",
     "What does the writer want the council to do?",
     "Trial opening the library on Sunday afternoons",
     ["Build a new library with more computers", "Close the library on a weekday instead", "Spend less on the online lending service"],
     "The final paragraph asks the council to open \"from noon until five for six months, count the visitors, and then decide\"."),
    ("R1-D", 1, "Argument", 2, "authorPurpose",
     "How does the writer respond to the point that Sunday opening costs money?",
     "By agreeing, but saying the building sits unused",
     ["By denying that it would cost anything at all", "By suggesting volunteers could run the library", "By saying that other councils would pay for it"],
     "The writer admits \"it does\" cost money, then points out that the town already pays for a building and resources that sit unused one day a week."),
    ("R1-D", 1, "Finding detail", 1, "findingDetail",
     "Which group does the writer say would gain most from Sunday opening?",
     "People with the fewest other places to go",
     ["Families with young children", "People who prefer printed books", "Library staff who want extra shifts"],
     "The third paragraph says \"the people who would gain most are the people with the fewest other options\", such as students without a quiet place at home."),
    ("R1-D", 1, "Words in context", 2, "wordsInContext",
     "Other councils \"have trialled Sunday opening and kept it\". In this sentence, trialled means",
     "tested for a while",
     ["argued about in court", "refused to consider", "advertised widely"],
     "A trial is a test run. The writer then asks for the same kind of test: six months, then a decision."),
    ("R1-D", 1, "Purpose and technique", 3, "authorPurpose",
     "Why does the writer say \"I am not asking our council to promise the same\"?",
     "To make the request seem modest and easy to agree to",
     ["To admit that Sunday opening has failed elsewhere", "To show the writer has changed their mind", "To criticise the other councils"],
     "By asking only for a trial rather than a permanent change, the writer makes the proposal harder to refuse. Nothing says Sunday opening failed elsewhere; the other councils kept it."),
    ("R2-A", 2, "Setting", 1, "findingDetail",
     "How is the hall different from Theo's bedroom?",
     "It is huge, cold and very quiet",
     ["It is small and crowded", "It has a better piano than his teacher's", "It is full of other students waiting"],
     "The hall is \"enormous and cold\", and later \"that great quiet room\" makes one wrong note ring out."),
    ("R2-A", 2, "Inference", 2, "inference",
     "Why does Theo wonder whether his shirt is untucked?",
     "His nerves make him imagine criticism",
     ["He knows he got dressed in a hurry", "The judge has told him to tidy himself up", "He hopes to make the judges laugh"],
     "The judge writes before he has played, and he \"spent a frantic second\" guessing why. His worries come from nerves, not from anything the judge says."),
    ("R2-A", 2, "Author's technique", 2, "inference",
     "The wrong note rings out \"like a dropped saucepan\". The writer uses this comparison to show",
     "how loud and jarring the mistake seemed to Theo",
     ["that someone in the hall dropped something", "that Theo was hungry", "that the piano was out of tune"],
     "A dropped saucepan makes a sudden clanging noise. The comparison shows how huge one small slip felt in the silent hall."),
    ("R2-A", 2, "Character", 2, "inference",
     "What helps Theo keep playing after his mistake?",
     "Remembering his teacher's advice",
     ["Seeing the judges smile at him", "Starting again from the beginning", "Playing faster to finish sooner"],
     "He hears his teacher's words, \"The audience only remembers what you do next\", and decides to continue rather than stop."),
    ("R2-A", 2, "Theme", 3, "mainIdea",
     "Which idea does the story most strongly suggest?",
     "How you recover from a mistake matters most",
     ["Enough practice always prevents mistakes", "Judges care only about perfect playing", "Nerves will ruin any performance"],
     "Theo's slip leads him to play the middle section more gently than ever, and that is what the judge notices. The story shows a recovery outshining an error."),
    ("R2-B", 2, "Main idea", 1, "mainIdea",
     "What is the main purpose of the passage?",
     "To explain how and why the road was built",
     ["To persuade tourists to drive the road", "To describe the beaches along the coast", "To argue that the road should be widened"],
     "Most of the passage covers the reasons for building the road, who built it and how. The scenery is mentioned only briefly."),
    ("R2-B", 2, "Finding detail", 1, "findingDetail",
     "Which two problems was the road meant to solve at once?",
     "Jobs for returned soldiers and isolated coastal towns",
     ["Crowded tourist roads and a lack of memorials", "Rough bush tracks and expensive sea travel", "Dangerous cliffs and heavy rain"],
     "The second paragraph says soldiers needed work and the towns were \"cut off from one another\", and the road would solve \"both problems at once\"."),
    ("R2-B", 2, "Finding detail", 1, "findingDetail",
     "According to the passage, when was the full route officially opened?",
     "1932",
     ["1919", "1918", "1945"],
     "Work began in 1919, the road opened in stages, and the full route was officially opened in 1932."),
    ("R2-B", 2, "Inference", 2, "inference",
     "What does the description of picks, shovels and explosives suggest about the work?",
     "It was hard physical labour with few machines",
     ["It was finished quickly", "It was mostly done by engineers in offices", "It was safer than other road building"],
     "The writer says the road was cut \"much of it by hand\" with simple tools, and that the work was dangerous."),
    ("R2-B", 2, "Author's purpose", 3, "authorPurpose",
     "Why does the writer end by comparing the road with \"a statue or a plaque\"?",
     "To show it is unusual because people use it",
     ["To suggest that statues should replace it", "To complain that the road needs a plaque", "To prove it is the world's largest memorial"],
     "The last paragraph points out that, unlike a statue, the road is used every day, often by people who do not know what it honours. It does not try to prove the size claim, which is only reported."),
    ("R2-C", 2, "Finding detail", 1, "findingDetail",
     "Why did the grandfather draw around each tool?",
     "So he could tell which tool was missing",
     ["To make the shed look tidy for visitors", "To teach the speaker the names of tools", "To decide which tools to give away"],
     "The second verse says he drew around each one \"so he would know which one was missing\"."),
    ("R2-C", 2, "Inference", 2, "inference",
     "What has most likely happened to the grandfather?",
     "He has died, and his tools have been given away",
     ["He has moved to a new house with a bigger shed", "He has lent his tools while he is on holiday", "He has stopped using the shed because of rain"],
     "The tools \"began to go\" to relatives and friends, the bench is clear and the radio is still, and the speaker now only sees his hands in memory."),
    ("R2-C", 2, "Words in context", 2, "wordsInContext",
     "\"The radio is still.\" Here, still means",
     "silent",
     ["even now", "switched on", "broken"],
     "The radio is no longer playing, so still means silent here. It is not the \"even now\" meaning of still."),
    ("R2-C", 2, "Imagery", 3, "inference",
     "Why are the empty outlines important to the speaker?",
     "They keep the shapes of what is gone",
     ["They show where to hang new tools", "They prove that someone stole the tools", "They were drawn by the speaker as a child"],
     "Each outline is \"shaped exactly like the thing it held\", and looking at them the speaker sees the grandfather's hands. They are reminders of what is missing."),
    ("R2-C", 2, "Tone", 2, "toneWords",
     "Which word best describes the speaker's feelings in the poem?",
     "sad",
     ["angry", "relieved", "puzzled"],
     "The speaker keeps returning to an empty shed and remembers the grandfather's hands. The tone is sad and loving. The speaker says \"I don't know why\" once, but the poem is not mainly puzzled."),
    ("R2-D", 2, "Comparing texts", 1, "crossText",
     "What do the two writers disagree about?",
     "Whether Riverside Reserve suits a skate park",
     ["Whether young people should be allowed to skate", "Whether the council should build a playground", "Whether police should patrol the shopping centre"],
     "The resident says \"I am not against young people having somewhere to skate\", so both accept skating. They disagree about the site."),
    ("R2-D", 2, "Finding detail", 1, "findingDetail",
     "Which reason does the resident give against the skate park?",
     "The car park is already full on weekends",
     ["Skaters damage the library steps", "The reserve is too far from the station", "The reserve is hard to see from the road"],
     "Text 1 says the car park \"is already full on weekends\" and could not cope. The other points come from Text 2 or are not made."),
    ("R2-D", 2, "Comparing texts", 2, "crossText",
     "How would the student most likely answer the resident's worry about extra cars?",
     "Most skaters could walk from the station or school",
     ["The council should build a bigger car park", "Skaters would only use the park on weekdays", "Older residents could walk somewhere else"],
     "The student says the reserve is close to the station and two schools, so young people \"could get there without being driven\", which answers the parking concern."),
    ("R2-D", 2, "Persuasive technique", 2, "authorPurpose",
     "\"Fine. Then tell us where we can.\" What is the effect of these short sentences in the student's speech?",
     "They sound frustrated and challenge the council",
     ["They show the student agrees with the police", "They move the speech on to a new topic", "They make the student sound unsure and polite"],
     "After listing places where skaters are moved on, the blunt short sentences sound frustrated and put the question back to the council."),
    ("R2-D", 2, "Comparing texts", 3, "crossText",
     "The resident values the reserve because it is calm. Which point in the student's speech gives a different view of the reserve itself?",
     "It is easy to see from the road, so it is safer",
     ["Skaters are moved on from the library steps", "A skate park is part of a community", "The resident is against young people"],
     "Only this point is about the reserve: the student argues it is open and visible from the road, so it is \"safer than the empty car parks\". The library steps are another place, and Text 1 says the resident is not against young people skating."),
    ("R0-A", 0, "Main idea", 1, "mainIdea",
     "What is the passage mainly about?",
     "How a colony controls the temperature of its nest",
     ["How bees turn the nectar they collect into honey", "Why bees become aggressive when the weather is hot", "How young bees learn to fly and find flowers"],
     "The passage explains why the brood needs steady warmth and how the colony warms and cools the nest."),
    ("R0-A", 0, "Finding detail", 1, "findingDetail",
     "What do bees do to warm the nest on a cold day?",
     "Huddle together and shiver their muscles",
     ["Fan their wings at the nest entrance", "Spread droplets of water over the comb", "Hang in a cluster outside the entrance"],
     "The third paragraph says workers \"cluster tightly and shiver their flight muscles\". The other actions are for cooling."),
    ("R0-A", 0, "Cause and effect", 2, "inference",
     "Why does spreading water on the comb cool the nest?",
     "As the water evaporates, it carries heat away",
     ["The water is colder than the air outside", "Wet bees cannot produce heat", "The water stops nectar from heating up"],
     "The passage says that as the water evaporates \"it carries heat away\", like sweat cooling skin."),
    ("R0-A", 0, "Words in context", 2, "wordsInContext",
     "\"The colony's temperature control emerges from thousands of small decisions.\" Emerges means",
     "comes about",
     ["disappears", "is ordered", "slows down"],
     "No single bee is in charge; the control comes about as a result of many bees each reacting. \"Is ordered\" contradicts \"No single bee directs any of this\"."),
    ("R0-A", 0, "Text structure", 2, "textStructure",
     "How does the writer organise the information about hot days?",
     "As a list of three methods, in order",
     ["As a story about one bee", "As an argument with two sides", "As a comparison of bees and ants"],
     "The paragraph uses \"First\", \"Second\" and \"Third\" to set out three ways the colony cools the nest."),
    ("R0-B", 0, "Finding detail", 1, "findingDetail",
     "Why did Mai let go of Bao's hand?",
     "To pay for a showbag",
     ["To buy fairy floss", "To watch the woodchop", "To look at the tractors"],
     "She let go \"for exactly ten seconds to pay for a showbag\"."),
    ("R0-B", 0, "Inference", 2, "inference",
     "How does Mai work out where Bao has gone?",
     "She recalls what he had talked about all day",
     ["A stranger points her in the right direction", "She hears him calling out her name", "She searches every pavilion one by one"],
     "She decides to \"think like Bao\" and realises he has talked all day about the tractors."),
    ("R0-B", 0, "Words in context", 2, "wordsInContext",
     "\"The crowd seemed to grow louder and taller.\" This shows that Mai",
     "suddenly felt small and overwhelmed",
     ["could not hear the announcements", "was standing in a low place", "thought the crowd was getting bigger"],
     "The crowd has not really changed. Panic makes it feel bigger and noisier around her."),
    ("R0-B", 0, "Character", 2, "inference",
     "What does Bao's reaction show about him?",
     "The tractor held all his attention",
     ["He ran off on purpose to scare Mai", "He was frightened and had hidden", "He knew Mai would find him quickly"],
     "The story says \"He had not even noticed he was lost\"; he was staring at the tractor \"as if it were a castle\"."),
    ("R0-B", 0, "Character", 3, "inference",
     "Why does Mai change her answer from \"No\" to \"Maybe\"?",
     "Relief makes her want to be kind to him",
     ["She decides Bao is old enough to climb", "A farmer nearby has already said yes", "She wants Bao to stop asking her"],
     "The story says she changed her mind \"because her heart was still thumping and she had never been so glad to see anyone in her life\"."),
]
