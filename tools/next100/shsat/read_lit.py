# SHSAT ELA: Reading Comprehension, literary texts (NYS Next Generation ELA standards
# 7R1-7R6 for literature: evidence and inference, theme, how plot and character develop,
# figurative language, tone and mood, structure, point of view). Every story and poem is
# original.

ZWSP = "​"


def paras(*ps):
    return "\n\n".join(f"**{i + 1}** {p}" for i, p in enumerate(ps))


def poem(text):
    """RichText joins single newlines, so each line is its own paragraph and
    stanzas are separated by an empty-looking one."""
    stanzas = [s.strip().split("\n") for s in text.strip().split("\n\n")]
    return f"\n\n{ZWSP}\n\n".join("\n\n".join(l.strip() for l in st) for st in stanzas)


STIMULI = {
    "RL1": ("The Long Way", paras(
        "Rosa had ridden the subway to her grandfather's apartment every Saturday for three years, but she had never once made the trip alone. Today her mother had a work shift she could not trade, and after a long talk at the kitchen table, Rosa had won. She was twelve. She knew the stops by heart.",
        "\"Text me when you get on, text me when you change trains, and text me when you're at his door,\" her mother said for the third time, holding Rosa's face in both hands.",
        "\"I know, Mami.\"",
        "On the platform, Rosa felt taller than usual. She stood behind the yellow line exactly the way her mother always did and stepped into the car as if she rode it alone every day. Then, two stops later, the conductor's voice crackled through the speaker. Because of work on the tracks, the train would run express. It would not stop at her station.",
        "Rosa's stomach tightened. She looked around at the strangers in the car, all of them reading, sleeping or staring at their phones as if nothing had happened. For a moment she wanted to call her mother and admit that she could not do this after all.",
        "Instead, she studied the map above the doors. If the train skipped her stop, she could get off at the next one and take a local train back one station. She traced the route twice with her finger to be sure.",
        "Twenty minutes later than planned, she climbed the stairs to her grandfather's building. He opened the door before she knocked, holding his phone. \"Your mother called me four times,\" he said, frowning. Then the frown broke into a grin. \"She said you took the long way.\"",
        "Rosa laughed, and only then did she notice that her hands had stopped shaking somewhere on the stairs.")),
    "RL2": ("Ice Storm", poem("""
All night the rain forgot how to be rain.
It froze the moment that it touched a thing:
the maple's arms, the mailbox, the long wire
that runs from the pole to our kitchen light.

By morning the whole street was made of glass.
The branches bowed as if they were ashamed,
and every twig wore a sleeve of clear crystal
that clicked and chimed whenever the wind moved.

My father said the power would be out
until the crews could reach us, maybe days.
We ate cold cereal by the window, wrapped
in every blanket we could find, and watched.

Then the sun climbed over the neighbors' roof
and struck the trees, and every inch of ice
caught fire at once, white, gold, a little blue.
Nobody spoke. We had forgotten we were cold.
""")),
    "RL3": ("Letters from the Mill", paras(
        "The bell in the tower rang at half past four, and Hannah was already awake. In the three weeks since she had come to the mill town from her family's farm, she had learned that the bell ruled everything: when to wake, when to eat, when to work and when to sleep.",
        "In the weaving room, the looms were so loud that the girls spoke to one another with their hands. Hannah's job was to watch two machines at once and to tie broken threads before a flaw could spread across the cloth. Her fingers were sore, and the cotton dust made her cough. At night she wrote to her younger sister, Abby, but she left those parts out.",
        "Instead she wrote about the things that made her feel grown. She had a wage of her own, and she had already sent half of it home to help pay off the farm. On Sunday afternoons, she walked to the lending library with Mary, the older girl who shared her room in the boardinghouse. Mary had once had a poem printed in a magazine that the mill girls wrote themselves.",
        "\"You should write something,\" Mary told her one evening, nodding at the stack of letters. \"You have a way of making ordinary things sound worth hearing.\"",
        "Hannah laughed and shook her head. Who would want to read about looms and boardinghouse suppers? But that night, after the lamps were out, she lay awake turning sentences over in her mind the way she turned a broken thread between her fingers, looking for the place to begin.",
        "The next morning the bell rang at half past four, as it always did. Hannah rose with the others, but in her apron pocket she carried a folded sheet of paper and the stub of a pencil.")),
    "RL4": ("Fan 3", paras(
        "On the morning the oxygen alarm went off, Teo was the only one in the greenhouse. The colony's adults were outside the dome, repairing a solar panel damaged in the night's dust storm. The alarm was not loud. It was a soft, steady chime, the kind meant to warn rather than frighten. Somehow that made it worse.",
        "Teo checked the screen beside the door. Oxygen in the greenhouse was dropping slowly, and the cause was listed in plain letters: FAN 3 OFFLINE. Without the fan, the air from the plants was not reaching the rest of the dome.",
        "He knew where Fan 3 was. He had walked past it a thousand times on his way to water the tomato vines, a gray box humming behind a panel no one ever opened. He also knew the rule his mother repeated every week: never touch a machine you have not been trained on.",
        "Teo pressed the call button. \"Fan 3 is down,\" he said. \"Oxygen is dropping.\"",
        "The speaker crackled, and his mother's voice came through, calm but tired. \"We heard. We're twenty minutes out. Is the light on the panel latch red or green?\"",
        "He looked. \"Green.\"",
        "\"Then the power to it is safe, and it's only a tripped switch. Open the panel. You'll see a black lever marked RESET. Push it up, once. Don't touch anything else.\"",
        "His hand hovered over the latch. Twenty minutes was a long time for the air to keep dropping. He opened the panel, found the lever and pushed it up. For a second nothing happened. Then the fan shuddered and began to hum, and the chime stopped.",
        "When the adults came in, coated in red dust, his mother looked at the panel and then at him. \"You followed the rule,\" she said, \"and then you followed me.\" She smiled. \"That's exactly the right order.\"")),
    "RL5": ("Why Heron Stands on One Leg", paras(
        "Long ago, when the marsh was new, Heron waded on two long legs like any other wading bird, and she was the proudest creature in the reeds. Each morning she stalked through the shallows, splashing so loudly that every fish for a mile knew she was coming.",
        "\"Why do you never catch anything?\" asked Turtle, who was sunning himself on a log.",
        "\"The fish in this marsh are cowards,\" said Heron. \"They hide the moment they see me.\"",
        "\"They do not see you,\" said Turtle. \"They hear you.\"",
        "Heron puffed out her chest. She did not care to be taught by a creature who carried his house on his back. So she went on splashing, and she went on going hungry, until her feathers grew dull and her wings grew weak.",
        "One evening, too tired to stalk, she simply stood at the edge of the water. She lifted one foot to rest it and stayed perfectly still. The water grew calm. The ripples faded. And a small silver fish, thinking the marsh was empty, swam right between her toes.",
        "Heron caught it in an instant. She stood still again, on one leg, and soon caught another, and another.",
        "The next morning she flew to Turtle's log. \"You were right,\" she said, and it was the hardest thing she had ever said. \"Stillness catches more than splashing.\"",
        "Turtle only blinked his slow eyes. \"Wisdom is easy to find,\" he said, \"for anyone quiet enough to hear it.\"",
        "And that is why, to this day, the heron stands on one leg at the edge of the water, as still as a reed, waiting.")),
    "RL6": ("Enough", paras(
        "My grandmother never measured anything. When she made dumplings, she poured flour into a bowl until it \"looked right,\" added water until the dough \"felt right\" and pinched each dumpling closed with a quick twist of her fingers that I could never quite follow.",
        "The summer I turned thirteen, I decided I would learn to make them myself. I brought a notebook into her kitchen and a set of measuring cups from home. \"How much flour?\" I asked, pen ready.",
        "She looked at the measuring cups the way she might look at a strange insect. \"Enough,\" she said.",
        "For weeks, my dumplings were a disaster. Some fell apart in the boiling water. Others were as thick and chewy as erasers. Each time, my grandmother tasted one, nodded slowly and said, \"Again.\"",
        "I filled pages of my notebook with numbers that never seemed to work twice. The flour on a humid day behaved differently from the flour on a dry one. The dough I made in a hurry came out tougher than the dough I made while listening to her stories about growing up near the sea. Somewhere in those weeks, I stopped writing things down and started paying attention to the dough itself: how it stuck to my palm, how it sprang back when I pressed it.",
        "On the last day of August, I made a batch while she sat at the table. She bit into one, chewed for a long time and set down her chopsticks. \"Now,\" she said, \"you don't need the notebook.\"",
        "I still have that notebook. Its pages are spotted with flour and full of measurements that are almost all wrong. I keep it not for the numbers but as a record of the summer I learned that some things cannot be written down. They can only be learned with your hands, one failure at a time.")),
    "RL7": ("The Empty Case", paras(
        "The trophy case outside the gym had held the same silver cup for eleven years: the city chess championship, won by the school's team long before any of the current players had started school. On Monday morning, the cup was gone.",
        "By lunch, the rumors had grown wild. Someone said a rival school had stolen it. Someone else said it had been sold. Deshawn, the chess club's newest member, said nothing. He was looking at the case.",
        "\"The glass isn't broken,\" he said to Ana, the club's captain, when she sat down beside him. \"And the lock isn't scratched.\"",
        "\"So someone had a key,\" Ana said. \"That's half the teachers in the building.\"",
        "\"Maybe.\" Deshawn pointed at the bottom shelf. In the thin layer of dust, there was a clean circle where the cup had stood, and beside it a second, smaller ring, as if something had been set down and picked up again. \"Whoever took it put something next to it first. Something round and small.\"",
        "Ana frowned. Then her eyes widened. \"A bottle of polish,\" she said slowly. \"Ms. Okafor polishes the trophies before the spring tournament. She told us last week.\"",
        "They found Ms. Okafor, the club's adviser, in the art room, rubbing the cup with a soft cloth until it shone. She looked up, surprised at the two breathless students in the doorway.",
        "\"I taped a note to the case,\" she said, and then her face fell. \"It must have blown off when they opened the gym doors.\"",
        "Ana laughed so hard she had to sit down. Deshawn only smiled. He had learned something about chess and mysteries at the same time: the answer is usually in front of you, if you look before you guess.")),
}

ITEMS = [
    # ---- Practice Test 1: RL1 ----
    dict(test=1, stim="RL1", skill="Theme", diff=2,
         stem="Which statement best describes a theme of the passage?",
         key="Solving an unexpected problem can build a person's confidence.",
         wrong=["Children should never ride the subway without an adult nearby.", "Family members often argue about small and unimportant decisions.", "Plans that are made carefully in advance always work out well."],
         expl="Rosa's plan goes wrong, she works out a new route, and by the end her hands have stopped shaking. Her careful plan does not work out, so the passage does not suggest that plans always succeed."),
    dict(test=1, stim="RL1", skill="Inferring feelings", diff=1,
         stem="In paragraph 4, the detail that Rosa \"felt taller than usual\" mainly suggests that she:",
         key="is proud to be trusted on her own", wrong=["is nervous about the strangers near her", "is annoyed that her mother worries", "is excited to hear from the conductor"],
         expl="Rosa has just won the right to travel alone and acts \"as if she rode it alone every day,\" so feeling taller shows pride. Her nervousness comes later, after the announcement."),
    dict(test=1, stim="RL1", skill="Character development", diff=2,
         stem="How does paragraph 6 develop Rosa's character?",
         key="It shows her solving the problem instead of giving up.",
         wrong=["It shows her deciding to call her mother for help.", "It shows her asking a stranger in the car for directions.", "It shows her blaming the conductor for the change."],
         expl="Paragraph 6 begins \"Instead,\" turning away from her wish to call her mother, and shows her using the map to plan a new route. She does not call or ask anyone for help."),
    dict(test=1, stim="RL1", skill="Inferring from dialogue", diff=2,
         stem="What does the grandfather's reaction in paragraph 7 reveal?",
         key="He is proud of the way Rosa handled the trip.",
         wrong=["He is angry that Rosa arrived so late.", "He is worried that Rosa got lost somewhere on the way.", "He is surprised that Rosa traveled alone."],
         expl="His frown \"broke into a grin,\" and he jokes that she \"took the long way,\" which shows he is pleased with how she managed. The frown is only a brief tease."),
    dict(test=1, stim="RL1", skill="Meaning of an ending", diff=2,
         stem="What does the final sentence of the passage suggest about Rosa?",
         key="Her fear faded once she had solved the problem.",
         wrong=["She was still too frightened to enjoy the visit.", "She had been cold during the long ride on the train.", "She was embarrassed that her mother had called."],
         expl="Her hands had stopped shaking \"somewhere on the stairs,\" after she had found her way, so her fear eased without her noticing. She laughs, so she is not still frightened."),

    # ---- Practice Test 1: RL2 ----
    dict(test=1, stim="RL2", skill="Figurative language", diff=1,
         stem="In line 1, the phrase \"the rain forgot how to be rain\" suggests that the rain:",
         key="turned to ice instead of staying liquid", wrong=["stopped falling at some point in the night", "fell harder than it ever had before", "was warmer than usual for the season"],
         expl="The next line explains that the rain \"froze the moment that it touched a thing,\" so it stopped acting like ordinary rain."),
    dict(test=1, stim="RL2", skill="Imagery", diff=2,
         stem="In the second stanza, the image of branches that \"bowed as if they were ashamed\" mainly shows that the branches:",
         key="bent low under the weight of the ice", wrong=["broke off and fell onto the street", "were cut down later by the repair crews", "grew in a strange and crooked shape"],
         expl="Bowing means bending forward, and the twigs are each wearing \"a sleeve of clear crystal,\" so the ice is weighing the branches down. Nothing in the poem says they broke."),
    dict(test=1, stim="RL2", skill="Change in mood", diff=2,
         stem="How does the mood of the poem change from the third stanza to the fourth?",
         key="from cold, patient waiting to quiet wonder", wrong=["from great excitement to disappointment", "from fear of the storm to anger about it", "from happiness to a feeling of sadness"],
         expl="In the third stanza the family waits in blankets with no power. In the fourth, the sun lights the ice and \"Nobody spoke,\" a moment of awe."),
    dict(test=1, stim="RL2", skill="Meaning of a line", diff=2,
         stem="What does the line \"We had forgotten we were cold\" suggest?",
         key="The beauty of the scene held the family's attention.",
         wrong=["The power came back on and warmed up the house.", "The family had left the window to find more blankets.", "The sunlight melted all of the ice on the trees at once."],
         expl="The line follows the image of the ice catching fire in the sunlight, so the family was too caught up in the sight to notice the cold. The ice catches the light; the poem never says it melted."),
    dict(test=1, stim="RL2", skill="Theme", diff=3,
         stem="Which statement best expresses a theme of the poem?",
         key="Even a hard situation can hold moments of beauty.",
         wrong=["Storms are dangerous and should always be avoided.", "Neighbors should help one another during a crisis.", "Families grow closer when they share a simple meal."],
         expl="The storm leaves the family cold and without power, yet the poem ends with a scene so beautiful that they forget their discomfort. The neighbors appear only as a roof the sun rises over."),

    # ---- Practice Test 1: RL3 ----
    dict(test=1, stim="RL3", skill="Inferring motives", diff=2,
         stem="Why does Hannah most likely leave her sore fingers and the cotton dust out of her letters to Abby?",
         key="She does not want her family to worry about her.",
         wrong=["She is not allowed to write about the mill.", "She has already forgotten how hard the mill work is.", "She hopes Abby will come and work in the mill."],
         expl="She writes instead about \"the things that made her feel grown,\" such as her wage, so she is choosing to share the good news and spare her family the hard parts. Nothing says she is forbidden to write about the mill."),
    dict(test=1, stim="RL3", skill="Figurative language", diff=2,
         stem="In paragraph 5, the comparison of Hannah's thinking to turning \"a broken thread between her fingers\" suggests that she is:",
         key="carefully working out how to begin writing",
         wrong=["worried about the mistakes she made at work", "too tired to think clearly about anything", "planning to quit her job in the weaving room"],
         expl="At work she turns a broken thread to find where to tie it, and at night she turns sentences over \"looking for the place to begin.\" The comparison shows careful, patient work on her writing."),
    dict(test=1, stim="RL3", skill="Role of a character", diff=1,
         stem="How does Mary influence Hannah in the passage?",
         key="She encourages Hannah to see herself as a writer.",
         wrong=["She teaches Hannah how to run two of the looms at once.", "She convinces Hannah to send her wages home.", "She warns Hannah about the dangers of the mill."],
         expl="Mary tells Hannah she should write something because she makes \"ordinary things sound worth hearing,\" and that night Hannah begins planning sentences."),
    dict(test=1, stim="RL3", skill="Structure", diff=3,
         stem="How do paragraphs 1 and 6 work together in the passage?",
         key="Both show the bell, but the second shows how Hannah has changed.",
         wrong=["Both describe the weaving room through Abby's point of view.", "Both show that Hannah is planning to go back to the family farm soon.", "Both explain why the mill bell had to ring so early each day."],
         expl="The bell rings at half past four in both, but in paragraph 6 Hannah carries paper and a pencil, a sign that she has begun to see herself as a writer."),
    dict(test=1, stim="RL3", skill="Choosing evidence", diff=2,
         stem="Which sentence from the passage best supports the idea that Hannah takes pride in earning money?",
         key="\"She had a wage of her own, and she had already sent half of it home to help pay off the farm.\" (paragraph 3)",
         wrong=["\"Hannah's job was to watch two machines at once and to tie broken threads before a flaw could spread across the cloth.\" (paragraph 2)",
                "\"In the weaving room, the looms were so loud that the girls spoke to one another with their hands.\" (paragraph 2)",
                "\"The next morning the bell rang at half past four, as it always did.\" (paragraph 6)"],
         expl="This sentence appears among \"the things that made her feel grown\" and shows her helping her family with her own wage. The sentence about her job describes the work, not her feelings about earning."),

    # ---- Practice Test 2: RL4 ----
    dict(test=2, stim="RL4", skill="Conflict", diff=2,
         stem="What does paragraph 3 reveal about Teo's problem?",
         key="He knows where the fan is but has been told not to touch it.",
         wrong=["He cannot find the fan, which is hidden by the tomato vines.", "He wants to water the plants before he deals with the alarm.", "He believes the fan is working and that the screen is wrong."],
         expl="Paragraph 3 says he has walked past Fan 3 \"a thousand times\" and also recalls his mother's rule never to touch a machine he has not been trained on. That pulls him in two directions."),
    dict(test=2, stim="RL4", skill="Character motives", diff=1,
         stem="Why does Teo call his mother before opening the panel?",
         key="He wants to follow the rule about untrained machines.",
         wrong=["He has no idea where the broken fan is located.", "He is afraid that he will be blamed for all the storm damage.", "He needs her to switch off the alarm from outside."],
         expl="Paragraph 3 ends with the rule, and paragraph 4 begins with him calling. His mother later praises him: \"You followed the rule.\" He already knows where the fan is."),
    dict(test=2, stim="RL4", skill="Inference", diff=2,
         stem="What does the mother's question about the light on the panel latch suggest?",
         key="She is checking that the repair is safe for him.",
         wrong=["She wants to know whether Teo can see in the dark.", "She is testing whether he remembers the rule.", "She thinks that Teo has already opened the panel."],
         expl="When he answers \"Green,\" she says \"the power to it is safe\" and only then tells him to open the panel. The question is a safety check."),
    dict(test=2, stim="RL4", skill="Meaning of a detail", diff=1,
         stem="In paragraph 8, the sentence \"His hand hovered over the latch\" mainly shows that Teo:",
         key="hesitates for a moment before acting", wrong=["has decided not to open the panel", "is too frightened to move at all", "cannot reach the latch from where he is"],
         expl="His hand pauses above the latch while he thinks about the air dropping, and then he opens the panel. The pause shows hesitation, not a refusal."),
    dict(test=2, stim="RL4", skill="Theme", diff=3,
         stem="Which statement best expresses a theme of the passage?",
         key="Good judgment includes knowing when to ask for help.",
         wrong=["Children are often better at fixing machines than adults.", "Rules are meant to be broken when there is an emergency.", "Living far from Earth is far too dangerous for families."],
         expl="Teo calls for instructions instead of guessing, and his mother praises him for following the rule and then her directions. He never breaks the rule."),

    # ---- Practice Test 2: RL5 ----
    dict(test=2, stim="RL5", skill="Character motives", diff=1,
         stem="Why does Heron ignore Turtle's advice in paragraph 5?",
         key="She is too proud to learn from him.", wrong=["She does not understand his words.", "She believes he wants to take her fish.", "She is far too hungry to listen."],
         expl="Paragraph 5 says she \"puffed out her chest\" and \"did not care to be taught\" by Turtle. Her pride, not hunger, keeps her from listening."),
    dict(test=2, stim="RL5", skill="Cause and effect", diff=2,
         stem="What causes the change in Heron's luck?",
         key="She is too tired to stalk, so she stands still.",
         wrong=["Turtle chases the fish toward her feet.", "She moves to a different, deeper part of the marsh.", "The fish grow too weak to swim away."],
         expl="In paragraph 6 she is \"too tired to stalk,\" stands still, the water calms and a fish swims right between her toes."),
    dict(test=2, stim="RL5", skill="Inferring feelings", diff=2,
         stem="In paragraph 8, why is admitting that Turtle was right \"the hardest thing she had ever said\"?",
         key="Saying it means giving up her pride.",
         wrong=["She has trouble speaking after eating.", "She does not want to share her fish.", "Turtle is too far away to hear her."],
         expl="Heron has been the \"proudest creature in the reeds\" and refused to be taught by Turtle, so admitting he was right costs her that pride."),
    dict(test=2, stim="RL5", skill="Meaning of a statement", diff=2,
         stem="What does Turtle mean when he says \"Wisdom is easy to find for anyone quiet enough to hear it\"?",
         key="Those who stop and listen can learn wise lessons.",
         wrong=["Only old creatures like turtles can be wise.", "Wisdom is hidden in places where most creatures cannot go.", "Loud creatures always know more than quiet ones."],
         expl="Heron learned by becoming still and quiet, and Turtle turns that into a lesson: listening, not boasting, leads to wisdom."),
    dict(test=2, stim="RL5", skill="Purpose of a paragraph", diff=1,
         stem="What is the main purpose of paragraph 10?",
         key="to explain the origin of a real animal behavior",
         wrong=["to describe how Turtle and Heron became friends", "to warn readers about the dangers of the marsh", "to show that Heron lost one of her legs in the end"],
         expl="The story ends \"And that is why, to this day, the heron stands on one leg,\" so it explains a real behavior the way many traditional tales do. Heron still has both legs; she lifts one to rest it."),

    # ---- Practice Test 2: RL6 ----
    dict(test=2, stim="RL6", skill="Figurative language", diff=2,
         stem="In paragraph 3, the grandmother looks at the measuring cups \"the way she might look at a strange insect.\" This comparison suggests that she:",
         key="finds them unfamiliar and a little silly", wrong=["is frightened that they will break apart", "wants to keep them for herself", "is upset that they are dirty"],
         expl="A strange insect is something odd and out of place. The grandmother, who \"never measured anything,\" sees no use for the cups and answers only \"Enough.\""),
    dict(test=2, stim="RL6", skill="Inferring meaning", diff=1,
         stem="Why does the grandmother keep saying \"Again\" in paragraph 4?",
         key="She wants the narrator to keep practicing.",
         wrong=["She is asking for another dumpling to eat.", "She cannot remember how to make the dough.", "She is angry that the dumplings fell apart."],
         expl="After tasting each failed batch, she nods and says \"Again,\" urging the narrator to try once more. She is patient, not angry."),
    dict(test=2, stim="RL6", skill="Turning point", diff=2,
         stem="How does paragraph 5 mark a turning point for the narrator?",
         key="She shifts from measuring to paying attention to the dough.",
         wrong=["She decides to stop making the dumplings for good.", "She finally learns all the exact amounts from her grandmother.", "She begins writing down her grandmother's life story."],
         expl="Paragraph 5 says she \"stopped writing things down and started paying attention to the dough itself.\" Her grandmother never gives her exact amounts."),
    dict(test=2, stim="RL6", skill="Meaning of dialogue", diff=2,
         stem="What does the grandmother mean when she says \"you don't need the notebook\" in paragraph 6?",
         key="The narrator now knows the skill by feel.",
         wrong=["The notebook's measurements were all correct.", "The narrator should throw the notebook away.", "She plans to write a better notebook herself."],
         expl="After weeks of practice the narrator finally makes good dumplings by paying attention to the dough, so she no longer depends on written numbers. Paragraph 7 says the measurements were \"almost all wrong.\""),
    dict(test=2, stim="RL6", skill="Theme", diff=2,
         stem="Which statement best expresses a theme of the passage?",
         key="Some skills are learned through practice, not instructions.",
         wrong=["Grandparents are much stricter teachers than parents are.", "Cooking is easier on dry days than on humid summer days.", "Writing things down is the very best way to remember a lesson."],
         expl="The narrator says some things \"can only be learned with your hands, one failure at a time.\" Her notes never worked, so writing things down is not the lesson."),

    # ---- Drill only: RL7 ----
    dict(test=0, stim="RL7", skill="Inference", diff=2,
         stem="What do Deshawn's observations in paragraph 3 suggest?",
         key="The cup was taken out by someone with a key.",
         wrong=["The cup was stolen by a rival school's team.", "The case was broken and then quietly repaired.", "The cup had never been in the case at all."],
         expl="Unbroken glass and an unscratched lock mean the case was opened normally, which Ana takes to mean \"someone had a key.\" The rumor about a rival school does not fit those clues."),
    dict(test=0, stim="RL7", skill="Contrasting characters", diff=1,
         stem="How does Deshawn's behavior in paragraph 2 differ from that of the other students?",
         key="He studies the evidence while others guess.",
         wrong=["He spreads rumors while others look closely.", "He leaves the school while the others stay.", "He blames a teacher while the others laugh."],
         expl="While others repeat rumors about theft and selling, Deshawn \"said nothing\" and looks at the case for clues."),
    dict(test=0, stim="RL7", skill="Using clues", diff=2,
         stem="In paragraph 5, what does the smaller ring in the dust help Ana figure out?",
         key="that the adviser had set down a bottle of polish",
         wrong=["that a student had leaned a bag against the glass", "that the thief had dropped a key on the shelf", "that the cup was much smaller than it looked"],
         expl="The ring shows something small and round was set beside the cup, and Ana connects it to the polish Ms. Okafor uses on the trophies."),
    dict(test=0, stim="RL7", skill="Inferring feelings", diff=2,
         stem="Why does Ms. Okafor's \"face fell\" in paragraph 8?",
         key="She realizes her lost note caused the worry.",
         wrong=["She is angry that the students interrupted her.", "She is ashamed that she took the cup to sell it.", "She is afraid the cup has been badly damaged."],
         expl="She had taped a note to the case and suddenly understands it blew away, so everyone thought the cup was stolen. She took the cup only to polish it."),
    dict(test=0, stim="RL7", skill="Theme", diff=2,
         stem="Which statement best expresses a theme of the passage?",
         key="Careful observation is better than quick guessing.",
         wrong=["Teachers should always tell students their plans.", "Chess players are the best at solving mysteries.", "Rumors usually turn out to be partly true."],
         expl="Deshawn solves the mystery by looking closely while others spread guesses, and the last sentence says the answer comes \"if you look before you guess.\""),
]
