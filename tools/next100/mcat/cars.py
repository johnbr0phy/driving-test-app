# Critical Analysis and Reasoning Skills. Original essays and items; every writer, work and study named in the
# passages is invented. Per test: 5 passages (6, 5, 5, 6, 5 questions); skills 8 comprehension, 8 within, 11 beyond.
# Q(test, difficulty, domain, skill, stem, [key, wrong, wrong, wrong], explanation, stim=None)

C, W, B = "mcatCarsComp", "mcatCarsWithin", "mcatCarsBeyond"
SC, SW, SB = "Foundations of Comprehension", "Reasoning Within the Text", "Reasoning Beyond the Text"

STIMULI = [
    {"id": "MCAT-T1-CARS-P1", "title": "Passage 1 (Humanities)", "text": (
        "When a painting is cleaned, something is always lost. The question is only what. Old varnish yellows, dirt settles, "
        "and earlier restorers sometimes painted over damage with a heavy hand. A modern conservator can remove all of this "
        "and show us, we are told, the picture as the artist left it. The claim is attractive, and it is almost never true.\n\n"
        "Consider what the artist actually left. Painters of the past knew that varnish would darken; some chose their colors "
        "with that in mind, and a few added thin tinted glazes over the paint itself. A solvent cannot always tell a later "
        "varnish from an original glaze. Strip the surface back to the brightest layer and you may expose colors that were "
        "never meant to be seen so raw. The cleaned picture is then not older than the dirty one; it is newer, a picture no one "
        "in the painter's lifetime ever saw.\n\n"
        "There is a second loss, harder to name. A painting that has hung for four centuries has a history, and that history "
        "is written on its surface: the faint cracks, the softened edges, the warmth that time gives to whites. Those who "
        "favor thorough cleaning call these marks damage. I would call them evidence. We do not repaint the weathered stones "
        "of a cathedral to make it look as it did when the masons left, and few visitors would thank us if we did.\n\n"
        "None of this means that nothing should be done. Grime that hides a figure, or a past repair that misrepresents the "
        "picture, may rightly be removed, and a varnish that is chemically failing threatens the paint beneath it. The "
        "conservator's first duty is to keep the object in being. But the goal should be legibility, not rejuvenation. A "
        "careful cleaning leaves a little of the old varnish in place, accepts some unevenness, and stops before certainty runs "
        "out.\n\n"
        "The public enjoys a dramatic before-and-after photograph, and museums, which need visitors, enjoy providing one. "
        "That is precisely the danger. The most spectacular cleaning is not the most faithful, and an institution that measures "
        "success by how bright the result looks has already decided what the painting ought to be.")},
    {"id": "MCAT-T1-CARS-P2", "title": "Passage 2 (Social sciences)", "text": (
        "For much of the twentieth century, economists told a simple story about shared resources. When many people draw on a "
        "pasture, a fishery or a forest that no one owns, each gains the full benefit of taking a little more while bearing only "
        "a fraction of the cost. The rational result, the story went, is ruin: the grass is grazed bare and the fish are gone. "
        "The cure was either private ownership or firm control by the state.\n\n"
        "The story is not wrong so much as incomplete. Field researchers who looked closely at real fishing villages, irrigation "
        "systems and mountain pastures found many that had been used in common for centuries without collapse. What these "
        "places shared was not private title or a distant regulator but a set of local rules: who may fish, in which season, "
        "with what gear, and what happens to someone who cheats.\n\n"
        "The rules that lasted had recognizable features. The users themselves helped write them, so the rules fit local "
        "conditions that an outsider would miss. Monitoring was cheap, often because the people doing it were users too, "
        "watching one another from neighboring boats. Penalties began small and grew only with repeated offenses, so that a "
        "single lapse did not turn a neighbor into an enemy. And there was some quick, local way to settle disputes.\n\n"
        "These findings do not show that common ownership always works. Many commons have failed, especially where newcomers "
        "arrived faster than rules could adapt, or where a distant government overrode local arrangements without replacing "
        "them. The lesson is narrower and more useful: whether a shared resource survives depends less on who holds the title "
        "than on whether the people who use it can make, watch and enforce their own rules.\n\n"
        "Policy has been slow to absorb this. A program that imposes a uniform national quota may look decisive, but if it "
        "displaces a working local system, it can leave a resource less protected than before.")},
    {"id": "MCAT-T1-CARS-P3", "title": "Passage 3 (Humanities)", "text": (
        "It is often said that poetry is what gets lost in translation. The saying assumes that a poem is a fixed thing, a "
        "precise arrangement of sound and sense, and that any move into another language must spill some of it. On this view "
        "the translator is at best a careful porter, carrying the poem across a border and apologizing for the breakage.\n\n"
        "The porter image fails because a poem's meaning is not a cargo that can be weighed before and after the trip. A line "
        "means what it does partly through rhythm, partly through the echoes its words carry in their own language, and partly "
        "through what readers bring to it. None of those can be packed. A translator must therefore choose, line by line, what "
        "to keep: the image, the music, the tone, the joke. Keeping all of them at once is usually impossible, and the choices "
        "differ for every poem.\n\n"
        "This is why two good translations of the same poem can look so unlike each other, and why a weak original can "
        "sometimes become a stronger poem in a gifted translator's hands. The translator is not a porter but a second author, "
        "one who writes under unusual constraints. That is not a license for liberty; a translation that ignores its source has "
        "become something else, an imitation or a response. But it is a reason to judge translations as poems and not merely as "
        "copies.\n\n"
        "Readers who know only one language are sometimes told that they cannot really read foreign poetry. I find this "
        "advice both snobbish and false. They cannot read the original, certainly, but they can read a poem that exists "
        "because of it, and their own language is enlarged by the encounter. Some of the most admired poems in any language "
        "began as translations.")},
    {"id": "MCAT-T1-CARS-P4", "title": "Passage 4 (Social sciences)", "text": (
        "Before the railways, every town kept its own time. Noon was when the sun stood highest over the local church, and a "
        "traveler riding west found that his watch ran fast by a few minutes each day. No one minded much, because no one "
        "moved fast enough for the difference to matter.\n\n"
        "The railways changed this, but not as quickly or as smoothly as the usual account suggests. Railway companies did "
        "adopt a single standard time for their timetables, because a train that left one station by local time and arrived at "
        "the next by another was an invitation to collisions. For decades afterward, however, many towns kept two times at "
        "once: railway time on the station clock and local time on the town hall. Courts in some places refused to recognize "
        "railway time in contracts, and newspapers printed tables for converting between the two.\n\n"
        "What finally settled the matter was less the trains than the habits they created. Factories began to run to the "
        "whistle; schools rang bells on the hour; workers were paid for time rather than for tasks. A day once divided by "
        "light and weather came to be divided by the clock. Historians who describe this as a technical change, the spread of a "
        "better measurement, miss the larger point. Standard time was a social agreement, and like other agreements it was "
        "resisted, bargained over and, in the end, absorbed so completely that it came to seem natural.\n\n"
        "This history matters because we still tend to treat clock time as simply the way time is. Shift workers whose bodies "
        "keep the sun's schedule, and communities that live by tides or seasons, are often described as poorly adapted. It "
        "would be more accurate to say that they live by an older agreement, and that the newer one won not because it was "
        "truer but because it served the interests of those who organized work.")},
    {"id": "MCAT-T1-CARS-P5", "title": "Passage 5 (Humanities)", "text": (
        "Performers of early music like to say that they play what the composer wrote. The phrase sounds modest, but it hides "
        "a problem. For much of the music written before about 1750, what the composer wrote was not meant to be played as "
        "written. A melody line might be a sketch to be decorated; a bass line with a few figures beneath it asked the player "
        "to invent the harmony on the spot. The written page was less a script than a set of instructions for "
        "improvising.\n\n"
        "Modern players who perform the page note for note are therefore not being faithful; they are performing a skeleton "
        "and calling it the body. The more historically minded performers know this and add ornaments, often taken from "
        "treatises of the period that explain how to decorate a line. But there is a trap here too. An ornament learned from a "
        "manual and played the same way every night is not improvisation; it is a new kind of score, written in the player's "
        "memory rather than on paper.\n\n"
        "What the old practice asked for was not a particular set of notes but a particular relation between player and music: "
        "a willingness to take risks in front of listeners, to respond to the room, to play the same piece differently on "
        "Tuesday than on Monday. That relation is harder to recover than any ornament. It cannot be learned from a treatise, "
        "and it sits uneasily with a recording industry that prizes a flawless take.\n\n"
        "I do not conclude that modern performances are false. A beautiful performance is a beautiful performance. But "
        "fidelity to the past is a stranger goal than its admirers suppose, and the most faithful player may be the one who is "
        "least concerned to repeat what anyone wrote down.")},
    {"id": "MCAT-T2-CARS-P1", "title": "Passage 1 (Social sciences)", "text": (
        "Of the roughly seven thousand languages spoken today, linguists expect a large share to have no native speakers "
        "within a century. The usual response is documentation: record the last fluent speakers, write a grammar and a "
        "dictionary, and archive the results. Documentation is valuable, and in some cases it is the only thing that can be "
        "done. But it is often mistaken for a solution, and that mistake has consequences.\n\n"
        "A language is not a list of words and rules; it is a practice, something people do with one another. An archive can "
        "preserve a description of the practice, much as a museum can preserve a costume. It cannot keep the practice alive, "
        "any more than the costume keeps the dance alive. When outside scholars treat documentation as the goal, they can "
        "leave communities with a well-catalogued record of what they have lost and little help in keeping it.\n\n"
        "The revival efforts that have worked look different. They begin with the community rather than the archive, and they "
        "aim at use rather than record. Programs that pair elders with small children for whole days, so that the language is "
        "the medium of play and meals and not a school subject, have produced new young speakers in places where linguists had "
        "written the language off. Such programs are slow and costly, and they depend on adults willing to change the language "
        "of their own homes.\n\n"
        "None of this makes documentation useless. A careful record can guide later learners, settle questions of "
        "pronunciation, and give a revival something to reach back to. The point is about order and purpose. Documentation "
        "serves revival when the community decides what to record and why; it replaces revival when the record becomes the "
        "end of the story.")},
    {"id": "MCAT-T2-CARS-P2", "title": "Passage 2 (Humanities)", "text": (
        "Few buildings are as easy to dislike as the large concrete structures put up for governments and universities in the "
        "decades after the Second World War. Their surfaces stain, their plazas are windy, and their scale can make a visitor "
        "feel small. Many have already been demolished, and the loss is mourned by almost no one. I want to suggest that it "
        "should be.\n\n"
        "The style was not born of indifference. Its designers were trying, often with very little money, to build public "
        "housing, libraries and civic halls quickly and in large numbers. They chose raw concrete partly because it was cheap "
        "and partly out of a kind of honesty: the building would show what it was made of and how it stood up, rather than "
        "dressing a frame in borrowed stone. Whatever one thinks of the results, the ambition behind them was generous.\n\n"
        "Much of the hostility these buildings attract has less to do with their design than with their upkeep. Concrete that "
        "is cleaned and repaired weathers reasonably well; concrete that is neglected for forty years looks like a ruin. Many "
        "of these buildings were starved of maintenance by the same public bodies that commissioned them, and their decline is "
        "then offered as proof that they were bad from the start.\n\n"
        "Taste in architecture changes on a cycle of about two generations. The ornate railway stations that one era tore "
        "down as vulgar, the next era fought to save. It would be a pity if we demolished the best concrete buildings of the "
        "last century just before our grandchildren learned to admire them. Keeping a building does not require liking it; it "
        "requires only the humility to suspect that our own judgment is not final.")},
    {"id": "MCAT-T2-CARS-P3", "title": "Passage 3 (Social sciences)", "text": (
        "Economists have long found gift-giving puzzling. A gift transfers something the giver chose to someone whose tastes "
        "the giver can only guess. On average, surveys suggest, recipients would have paid less for their gifts than the gifts "
        "cost. Measured as a market exchange, the holiday season destroys value, and the rational thing would be to give cash.\n\n"
        "Almost no one does, and the reason is not irrationality. A gift is not mainly a transfer of goods; it is a message about "
        "a relationship. Choosing an object takes time and attention, and the care shown in the choice is part of what is given. "
        "Cash, which can be handed over without any thought at all, sends the wrong message between friends, which is why it "
        "is acceptable from a grandparent to a child but awkward between equals.\n\n"
        "Gifts also create obligations, and this is a feature rather than a flaw. Anthropologists who studied exchange in "
        "small societies found that a gift was expected to be returned, though not at once and not in kind. The delay kept the "
        "two parties connected: as long as a gift was owed, the relationship was open. A market purchase closes the account at "
        "the moment of payment; a gift keeps it open on purpose.\n\n"
        "The market and the gift are not opposites so much as tools for different jobs. Businesses know this and borrow from "
        "the gift when they want loyalty rather than a single sale: the free sample, the unexpected upgrade, the handwritten "
        "note. Such gestures work only so long as they seem freely given. Once customers see them as a sales technique, they "
        "are judged by market standards again, and they usually fail those standards.")},
    {"id": "MCAT-T2-CARS-P4", "title": "Passage 4 (Humanities)", "text": (
        "A narrator who cannot be trusted is one of fiction's oldest tools and one of its most misunderstood. The usual "
        "account treats the unreliable narrator as a puzzle: the narrator says one thing, the clues say another, and the "
        "attentive reader solves the case. On this account the pleasure of such books is the pleasure of being cleverer than "
        "the person speaking.\n\n"
        "That pleasure is real, but it is the smaller part of what these books do. The best of them make the reader complicit "
        "before they make the reader wise. We spend a hundred pages inside the narrator's head, adopting his explanations, "
        "laughing at his jokes and sharing his irritation with the people around him. When the clues finally show us what he "
        "has been hiding, we discover not only that he was wrong but that we were content to be wrong with him.\n\n"
        "The narrator in the novelist Harriet Vale's book about a retired schoolmaster is a good example. He tells us of his "
        "kindness to a former pupil, and we believe him, because his account is warm and detailed and flatters our wish to "
        "think well of teachers. Only late do we notice that every act of kindness he describes left the pupil more dependent "
        "on him. The discovery stings because we approved of each act as it was told.\n\n"
        "Read this way, unreliable narration is less a game than a moral exercise. It shows how easily a fluent, sympathetic "
        "voice can carry us past what we would see at once from outside. Readers who treat such books only as puzzles to be "
        "solved protect themselves from that lesson, and so miss what the form is for.")},
    {"id": "MCAT-T2-CARS-P5", "title": "Passage 5 (Social sciences)", "text": (
        "For most of their history, hospitals were places for the poor. A family with means was nursed at home, by its own "
        "servants and a visiting physician, and the hospital took in those who had no one: the sick traveler, the injured "
        "laborer, the widow without kin. Hospitals were run as charities, and patients were expected to show gratitude, obey "
        "the rules of the ward and, often, attend religious services.\n\n"
        "The change came quickly once the hospital could offer what the home could not. Antiseptic surgery, then X-ray "
        "machines and laboratories, made the hospital the place where serious medicine was done. Paying patients began to "
        "arrive, and with them private rooms, admission fees and a new kind of institution. The charity ward did not "
        "disappear, but it sat beside the private wing, and the two were staffed and furnished differently.\n\n"
        "Histories of this period usually describe it as a story of scientific progress, and in large part it was. But a "
        "second change happened at the same time and is easier to overlook. As the hospital became a place of technology, "
        "the patient became less a guest of the institution and more a case within it, defined by a diagnosis and a set of "
        "readings. The grateful pauper of the charity ward had at least been a person to whom something was owed. The "
        "modern patient, rich or poor, was increasingly a body on which procedures were done.\n\n"
        "The movements of recent decades for patients' rights, informed consent and shared decision-making can be read as an "
        "attempt to undo this second change without giving up the first. They ask the hospital to remain a place of advanced "
        "medicine while treating the patient once again as someone with standing: a person whose understanding and "
        "agreement are part of the treatment rather than an obstacle to it.")},
]

ITEMS = [
    # ================= Practice Test 1 =================
    # Passage 1 (6): comp 2, within 2, beyond 2
    Q(1, 1, C, SC,
      "The central claim of the passage is that the cleaning of old paintings should aim to:",
      ["make the picture legible while keeping its history", "return the picture to the very day it was finished", "remove every later varnish and repair", "produce the brightest result possible"],
      "The author says the goal should be legibility, not rejuvenation, and treats the marks of age as evidence worth keeping. Restoring the picture as it was on the day it was finished is the claim the author calls almost never true.",
      stim="MCAT-T1-CARS-P1"),
    Q(1, 2, C, SC,
      "In the passage, the author's statement that the fully cleaned picture is \"newer\" than the dirty one means that it:",
      ["shows a surface no one saw in the painter's day", "has been varnished again after cleaning", "was painted later than experts believed", "will darken again much more quickly than before"],
      "The author argues that stripping to the brightest layer can remove original glazes, producing \"a picture no one in the painter's lifetime ever saw.\" Nothing in the passage concerns repainting or dating the work.",
      stim="MCAT-T1-CARS-P1"),
    Q(1, 2, W, SW,
      "The comparison with the weathered stones of a cathedral serves mainly to:",
      ["show that marks of age are usually accepted", "prove that varnish protects paint layers", "suggest that old cathedrals need cleaning too", "show that visitors prefer new buildings"],
      "The author uses the cathedral to argue by analogy that we normally accept the traces of age on old objects and would not thank anyone for erasing them. It is not offered as evidence about varnish chemistry.",
      stim="MCAT-T1-CARS-P1"),
    Q(1, 3, W, SW,
      "Which statement about cleaning would the author be most likely to accept?",
      ["Removing a failing varnish can be justified", "Every past repair should always be kept in place", "Any cleaning harms the original paint", "Dirt that hides a figure should stay"],
      "The fourth paragraph allows that a chemically failing varnish threatens the paint and may rightly be removed, along with misleading repairs and grime that hides a figure. The author is not against all cleaning.",
      stim="MCAT-T1-CARS-P1"),
    Q(1, 2, B, SB,
      "Suppose a museum leaves a thin, even layer of old varnish on a cleaned portrait and labels the result as deliberately restrained. Based on the passage, the author would most likely regard this as:",
      ["a sound choice that stops before certainty runs out", "a failure to show the portrait's true colors", "a sign that the museum lacks the right kind of solvent", "an attempt to stage a dramatic before-and-after"],
      "Leaving some old varnish and accepting unevenness is exactly what the author describes as careful cleaning. The author criticizes the opposite, the bright spectacular result.",
      stim="MCAT-T1-CARS-P1"),
    Q(1, 3, B, SB,
      "Which finding, if true, would most weaken the author's argument about original glazes?",
      ["Solvents can reliably tell varnish from glaze", "Most visitors prefer brightly cleaned paintings", "Many old varnishes yellow within fifty years", "Some museums publish before-and-after photographs"],
      "Part of the argument rests on the claim that a solvent cannot always tell a later varnish from an original glaze. If conservators could reliably separate them, that risk would largely disappear. Visitor preferences are what the author already concedes.",
      stim="MCAT-T1-CARS-P1"),
    # Passage 2 (5): comp 2, within 1, beyond 2
    Q(1, 1, C, SC,
      "According to the passage, the commons that lasted for centuries had in common:",
      ["local rules that users made and enforced", "a single owner holding private title", "strict control by a distant national government", "a population that never grew"],
      "The second and third paragraphs say these places shared not private title or a distant regulator but local rules on access, seasons and gear, written and enforced by the users.",
      stim="MCAT-T1-CARS-P2"),
    Q(1, 2, C, SC,
      "The author describes the older economic story about shared resources as:",
      ["incomplete rather than simply wrong", "correct in every single case it covered", "a myth with no basis at all", "a policy that worked everywhere"],
      "The second paragraph opens, \"The story is not wrong so much as incomplete\": overuse can happen, but the story leaves out the local rules that often prevent it.",
      stim="MCAT-T1-CARS-P2"),
    Q(1, 3, W, SW,
      "The author mentions commons that failed after newcomers arrived mainly in order to:",
      ["limit the scope of the conclusion", "show that private title always works", "prove the older story was right", "explain why monitoring was cheap"],
      "The failures are a qualification: the author concedes that common use does not always succeed and narrows the lesson to whether users can make, watch and enforce their own rules.",
      stim="MCAT-T1-CARS-P2"),
    Q(1, 2, B, SB,
      "A village irrigation system has run for generations under rules set by its farmers. A new law replaces those rules with a uniform national schedule. Based on the passage, the most likely result is that the water supply will be:",
      ["less well protected than before", "better protected than before", "unaffected by the change", "privately owned by the farmers alone"],
      "The final paragraph warns that a uniform national program that displaces a working local system can leave a resource less protected than before. Nothing suggests the law would create private title.",
      stim="MCAT-T1-CARS-P2"),
    Q(1, 3, B, SB,
      "Which of the following rules for a shared forest best fits the features the author says successful rules have?",
      ["Small fines that rise with repeat offenses", "A large fine for any first offense", "Rules written by a distant agency", "Monitoring that is paid for and run by outsiders"],
      "The third paragraph lists graduated penalties that begin small and grow only with repeated offenses, rules users help write, and cheap monitoring by users themselves. A large fine for a first lapse is the opposite of graduated penalties.",
      stim="MCAT-T1-CARS-P2"),
    # Passage 3 (5): comp 1, within 2, beyond 2
    Q(1, 1, C, SC,
      "The author's main purpose in the passage is to argue that a translator of poetry is best understood as:",
      ["a second author working under constraints", "a porter carrying a fixed cargo", "an imitator who ignores the original source", "a scholar explaining the original"],
      "The third paragraph states that the translator \"is not a porter but a second author, one who writes under unusual constraints.\" The porter is the view the author rejects.",
      stim="MCAT-T1-CARS-P3"),
    Q(1, 2, W, SW,
      "The author's point that two good translations of one poem can look very unlike each other is offered as evidence that:",
      ["translators must choose what to keep", "one of the two must be a poor translation", "the original poem was badly written", "rhythm matters more than imagery"],
      "Because no translation can keep image, music, tone and joke at once, each translator chooses differently, which is why good translations diverge. The author does not say one must be poor.",
      stim="MCAT-T1-CARS-P3"),
    Q(1, 3, W, SW,
      "The author's view of the advice that readers of one language \"cannot really read foreign poetry\" is best described as:",
      ["dismissive, calling it snobbish and false", "approving, with minor reservations", "neutral, presenting both sides", "uncertain, noting a lack of solid evidence"],
      "The author writes, \"I find this advice both snobbish and false,\" and argues that such readers read a real poem that exists because of the original.",
      stim="MCAT-T1-CARS-P3"),
    Q(1, 2, B, SB,
      "A writer publishes a poem that keeps only the title and one image of a famous original and otherwise says something new. Based on the passage, the author would most likely call it:",
      ["an imitation or a response, not a translation", "a model of the second author at work", "proof that poetry is always lost in translation", "a faithful copy of the original poem"],
      "The author warns that the second-author view is not a license for liberty: \"a translation that ignores its source has become something else, an imitation or a response.\"",
      stim="MCAT-T1-CARS-P3"),
    Q(1, 3, B, SB,
      "The author's reasoning about translation would apply most directly to which other situation?",
      ["Staging a play written for a very different theater", "Copying a document for a legal archive", "Converting a measurement from feet to meters", "Reprinting an old novel with its typing errors corrected"],
      "Like a poem, a play's meaning depends on elements that cannot all be carried over, so a director must choose what to keep and acts as a kind of second author. A unit conversion or a faithful copy has an exact result and needs no such choices.",
      stim="MCAT-T1-CARS-P3"),
    # Passage 4 (6): comp 2, within 2, beyond 2
    Q(1, 1, C, SC,
      "According to the passage, why did railway companies adopt a single standard time?",
      ["Mixed local times risked collisions", "Courts required it in every contract", "Factories asked them to do so", "Newspapers printed time tables"],
      "The second paragraph says a train leaving one station by local time and arriving at the next by another \"was an invitation to collisions.\" Courts in some places in fact refused to recognize railway time.",
      stim="MCAT-T1-CARS-P4"),
    Q(1, 2, C, SC,
      "The passage suggests that, for decades after railways adopted standard time, many towns:",
      ["kept railway and local time side by side", "abandoned local time immediately", "set every clock by the sun at noon", "banned railway time from their stations"],
      "The author describes towns with railway time on the station clock and local time on the town hall, with newspapers printing conversion tables. The change was neither quick nor smooth.",
      stim="MCAT-T1-CARS-P4"),
    Q(1, 2, W, SW,
      "The author criticizes historians who describe standard time as a technical change because they:",
      ["overlook that it was a social agreement", "exaggerate the role played by the railways", "ignore the accuracy of solar time", "underrate the danger of collisions"],
      "The third paragraph says such historians \"miss the larger point. Standard time was a social agreement,\" resisted, bargained over and finally absorbed.",
      stim="MCAT-T1-CARS-P4"),
    Q(1, 3, W, SW,
      "Which assumption underlies the author's final claim about shift workers?",
      ["How a society keeps time reflects choices", "Clock time is more accurate than solar time", "Shift work is unhealthy for most people", "Tidal communities refuse to use clocks"],
      "The author says such workers live by an older agreement that lost not because it was less true but because the newer one served those who organized work. That only follows if a time system is a choice rather than a fact of nature.",
      stim="MCAT-T1-CARS-P4"),
    Q(1, 2, B, SB,
      "A company introduces software that tracks employees' work minute by minute and pays by logged time. The author would most likely see this as:",
      ["a continuation of the clock's rise in work", "a return to tasks set by light and weather", "a purely technical improvement in measurement", "evidence that standard time was never needed"],
      "The passage ties standard time to factories running to the whistle and workers paid for time rather than tasks. Minute-by-minute tracking extends that same arrangement, and the author rejects calling such changes purely technical.",
      stim="MCAT-T1-CARS-P4"),
    Q(1, 3, B, SB,
      "Which discovery would most challenge the author's account of how standard time took hold?",
      ["Towns adopted it before factory schedules spread", "Some local courts were slow to accept railway time", "Railway time reduced timetable errors", "Workers sometimes resisted factory bells"],
      "The author argues that the habits of work, not the trains themselves, settled the matter. If towns had fully adopted standard time before factory schedules spread, that causal claim would be weakened. Slow courts and resistant workers fit the account.",
      stim="MCAT-T1-CARS-P4"),
    # Passage 5 (5): comp 1, within 1, beyond 3
    Q(1, 2, C, SC,
      "As used in the passage, a melody line \"meant to be decorated\" is one that the composer expected performers to:",
      ["add notes of their own to", "play exactly as written", "leave out of the performance", "transpose into another key"],
      "The author explains that such a line was \"a sketch to be decorated\" and the page \"a set of instructions for improvising,\" so performers were expected to add ornaments.",
      stim="MCAT-T1-CARS-P5"),
    Q(1, 3, W, SW,
      "Why does the author regard an ornament learned from a treatise and played the same way every night as a trap?",
      ["It turns improvising into a new score", "It is never historically accurate", "It makes the music too difficult", "It removes the bass line's harmony"],
      "The author says such an ornament \"is not improvisation; it is a new kind of score, written in the player's memory.\" The objection is to fixed repetition, not to the treatise's accuracy.",
      stim="MCAT-T1-CARS-P5"),
    Q(1, 2, B, SB,
      "A harpsichordist plays a seventeenth-century piece with different decorations at each concert, depending on how the audience responds. The author would most likely regard this as:",
      ["close to what the old practice asked for", "unfaithful because it changes the written score", "acceptable only if recorded flawlessly", "a skeleton presented as the body"],
      "The third paragraph says the old practice asked for a willingness to respond to the room and to play the piece differently on different days. Playing the bare written notes is what the author calls a skeleton.",
      stim="MCAT-T1-CARS-P5"),
    Q(1, 3, B, SB,
      "Which new information would most strengthen the author's claim about the recording industry?",
      ["Labels routinely splice takes to remove risks", "Early music recordings sell less than jazz", "Recording quality has improved since 1950", "Many performers also teach at music conservatories"],
      "The author says the old practice sits uneasily with an industry that prizes a flawless take. Evidence that labels routinely edit out risky moments would directly support that claim; sales or audio quality bear on it only loosely.",
      stim="MCAT-T1-CARS-P5"),
    Q(1, 2, B, SB,
      "The author's argument about fidelity in early music is most similar to which claim?",
      ["Following a recipe exactly can miss a cook's way", "A photograph is always more accurate than a painting", "Old instruments sound better than new ones", "A score should be played at the written tempo"],
      "The author argues that literal fidelity to a written text can miss what the practice behind it asked for. A recipe followed to the letter that loses the cook's own improvising makes the same point.",
      stim="MCAT-T1-CARS-P5"),

    # ================= Practice Test 2 =================
    # Passage 1 (6): comp 2, within 2, beyond 2
    Q(2, 1, C, SC,
      "The main point of the passage is that documenting endangered languages:",
      ["helps only when it serves revival", "is the best way to save a language", "is useless and should be stopped", "should be left to outside scholars"],
      "The final paragraph states that documentation serves revival when the community decides what to record and why, and replaces it when the record becomes the end of the story. The author says documentation is valuable, not useless.",
      stim="MCAT-T2-CARS-P1"),
    Q(2, 2, C, SC,
      "According to the passage, the revival programs that have worked are ones that:",
      ["make the language part of daily life", "teach the language as a school subject", "begin by building a complete archive", "rely mainly on recordings of elders"],
      "The third paragraph describes programs that pair elders with children for whole days so the language is the medium of play and meals, \"not a school subject.\"",
      stim="MCAT-T2-CARS-P1"),
    Q(2, 2, W, SW,
      "The comparison of an archive to a museum costume is used to show that:",
      ["a record cannot keep a practice alive", "archives are as popular as museums", "languages change more than costumes", "costumes and words are equally fragile"],
      "The author says an archive preserves a description much as a museum preserves a costume, and that neither keeps the dance, or the practice, alive.",
      stim="MCAT-T2-CARS-P1"),
    Q(2, 3, W, SW,
      "The author's attitude toward documentation as a whole is best described as:",
      ["appreciative but wary of overreliance", "openly hostile to the whole of the practice", "wholly enthusiastic and uncritical", "indifferent to its results"],
      "The author calls documentation valuable and sometimes the only thing possible, but warns that it is often mistaken for a solution. That is qualified appreciation, not hostility.",
      stim="MCAT-T2-CARS-P1"),
    Q(2, 2, B, SB,
      "A university team proposes to record a language's last speakers and publish a dictionary, then leave. Based on the passage, the author would most likely urge the team to:",
      ["let the community decide what to record and why", "record faster before the speakers die", "publish the full grammar well before the dictionary", "work only with linguists from outside"],
      "The author's concern is order and purpose: documentation helps revival when the community sets the goals, and harms it when outsiders treat the record as the end.",
      stim="MCAT-T2-CARS-P1"),
    Q(2, 3, B, SB,
      "Which finding would most weaken the author's claim about successful revival programs?",
      ["Its child speakers rarely use it as adults", "Such programs cost much more than documentation", "Some elders are unwilling to take part", "Archives help learners with pronunciation"],
      "The author credits these programs with producing new young speakers. If those children rarely kept using the language as adults, the programs would not be keeping the practice alive. Cost and reluctant elders the author already concedes.",
      stim="MCAT-T2-CARS-P1"),
    # Passage 2 (5): comp 2, within 1, beyond 2
    Q(2, 1, C, SC,
      "The author's main purpose is to argue that the large postwar concrete buildings:",
      ["deserve more care than they receive", "were designed with no thought for users", "should be replaced by stone buildings", "are admired by most people today"],
      "The author says few mourn their loss and adds, \"I want to suggest that it should be,\" then defends their purpose and warns against demolishing them.",
      stim="MCAT-T2-CARS-P2"),
    Q(2, 2, C, SC,
      "According to the passage, the designers chose raw concrete partly because it:",
      ["showed how the building was made", "weathered better than any stone", "was admired by the public at once", "needed no maintenance at all"],
      "The second paragraph says concrete was cheap and also a kind of honesty: the building would show what it was made of and how it stood up. The author says neglected concrete looks like a ruin.",
      stim="MCAT-T2-CARS-P2"),
    Q(2, 3, W, SW,
      "The example of the ornate railway stations supports the author's argument by suggesting that:",
      ["present dislike may be reversed later", "ornament always outlasts plain design", "railway stations were built in concrete", "public bodies maintain old buildings well"],
      "Stations torn down by one era as vulgar were fought for by the next, which the author uses to show that taste turns over and our present judgment may not be final.",
      stim="MCAT-T2-CARS-P2"),
    Q(2, 2, B, SB,
      "A city plans to demolish a neglected concrete library and cites its stained, crumbling surfaces as proof of poor design. The author would most likely reply that:",
      ["its decay may reflect years of neglect", "concrete was never meant for libraries", "stone cladding would solve the problem", "the public is right to dislike it"],
      "The third paragraph argues that much of the hostility comes from upkeep, not design, and that decline caused by neglect is wrongly offered as proof the building was bad from the start.",
      stim="MCAT-T2-CARS-P2"),
    Q(2, 3, B, SB,
      "Which principle is most consistent with the author's final paragraph?",
      ["Doubt about our taste is a reason to preserve", "Buildings should be kept only if loved", "Each new generation should rebuild its own cities", "Old buildings matter less than new ones"],
      "The author says keeping a building \"does not require liking it\" but only the humility to suspect that our judgment is not final, so uncertainty about taste favors keeping.",
      stim="MCAT-T2-CARS-P2"),
    # Passage 3 (5): comp 1, within 2, beyond 2
    Q(2, 2, C, SC,
      "According to the passage, why is cash usually an awkward gift between friends?",
      ["It shows no care in the choosing", "It is worth less than a chosen object", "It creates a large obligation", "It cannot be returned in kind"],
      "The author says the care shown in choosing is part of the gift, and cash can be handed over \"without any thought at all,\" which sends the wrong message between equals.",
      stim="MCAT-T2-CARS-P3"),
    Q(2, 2, W, SW,
      "The author refers to anthropologists' studies of small societies in order to:",
      ["show that a gift's obligation is useful", "prove that gifts destroy real economic value", "argue that cash replaced gifts long ago", "explain why recipients overvalue gifts"],
      "The studies show that a delayed return kept the two parties connected, supporting the claim that obligation is \"a feature rather than a flaw.\"",
      stim="MCAT-T2-CARS-P3"),
    Q(2, 3, W, SW,
      "The contrast between a market purchase and a gift in the third paragraph rests on the idea that:",
      ["a gift keeps a relationship open over time", "a purchase is always the better value for money", "gifts must be returned immediately", "markets cannot exist without gifts"],
      "A purchase \"closes the account at the moment of payment,\" while a gift is returned later and so keeps the relationship open on purpose. The passage says the return comes not at once and not in kind.",
      stim="MCAT-T2-CARS-P3"),
    Q(2, 2, B, SB,
      "A store sends regular customers a small birthday gift with a handwritten card. According to the passage, this is most likely to build loyalty as long as customers:",
      ["see it as given freely", "know what it cost the store", "are asked to buy in return", "receive it as a discount code"],
      "The last paragraph says such gestures work only while they seem freely given; once they look like a sales technique they are judged by market standards and usually fail.",
      stim="MCAT-T2-CARS-P3"),
    Q(2, 3, B, SB,
      "Which finding would most support the author's explanation of why people give objects rather than cash?",
      ["Gifts that looked hard to choose are valued more", "Most recipients say they would prefer cash if asked", "Stores sell more goods in December", "Gift cards are more popular than ever"],
      "The author claims the care visible in a choice is part of what is given. Evidence that recipients value a gift more when its selection took visible effort would support that. A stated preference for cash cuts the other way.",
      stim="MCAT-T2-CARS-P3"),
    # Passage 4 (6): comp 2, within 2, beyond 2
    Q(2, 1, C, SC,
      "The author's central claim about unreliable narrators is that the best such books:",
      ["make readers complicit before making them wise", "are mainly puzzles for clever readers", "should be read for their plots alone", "trust their own narrators far more than readers do"],
      "The second paragraph says the best of these books make the reader complicit before they make the reader wise. The puzzle reading is \"the smaller part.\"",
      stim="MCAT-T2-CARS-P4"),
    Q(2, 2, C, SC,
      "According to the passage, the schoolmaster's acts of kindness in Vale's novel turn out to have:",
      ["made the pupil depend on him more", "been invented by the pupil", "helped the pupil leave the school", "been described by another narrator"],
      "Late in the book the reader notices that \"every act of kindness he describes left the pupil more dependent on him.\"",
      stim="MCAT-T2-CARS-P4"),
    Q(2, 2, W, SW,
      "The discussion of Vale's novel functions in the passage mainly as:",
      ["an example of the reader's complicity", "a rebuttal of the author's own view", "a summary of the usual puzzle reading", "evidence that teachers are unreliable"],
      "The author introduces the novel as \"a good example\" of a narrator whose warm account we approve of before discovering what it hides, which is the complicity described in the second paragraph.",
      stim="MCAT-T2-CARS-P4"),
    Q(2, 3, W, SW,
      "The author would most likely say that readers who treat unreliable narration only as a puzzle:",
      ["avoid the form's moral lesson", "read more carefully than others", "enjoy these books the most", "understand the narrator best"],
      "The final paragraph says such readers \"protect themselves from that lesson, and so miss what the form is for.\"",
      stim="MCAT-T2-CARS-P4"),
    Q(2, 2, B, SB,
      "A novel's narrator is plainly lying from the first page, and the reader never shares his view. Based on the passage, the author would most likely judge that the novel:",
      ["misses what the form does best", "achieves the form's full effect", "is a moral exercise of the best kind", "makes the reader complicit at once"],
      "For the author, the form works by drawing the reader into the narrator's view before showing its flaws. A narrator the reader never trusts offers only the puzzle, which the author calls the smaller part.",
      stim="MCAT-T2-CARS-P4"),
    Q(2, 3, B, SB,
      "The author's view of unreliable narration is most similar to the view that a good magic trick:",
      ["teaches us how easily we are misled", "is best enjoyed by figuring out the method", "should never be explained to an audience", "is valuable only for its technical skill"],
      "The author values these books for showing how easily a fluent, sympathetic voice carries us past what we would otherwise see. A trick that teaches how easily we are misled makes the same point; working out the method is the puzzle reading the author calls secondary.",
      stim="MCAT-T2-CARS-P4"),
    # Passage 5 (5): comp 1, within 1, beyond 3
    Q(2, 1, C, SC,
      "According to the passage, before the change it describes, hospitals mainly served:",
      ["people with no one to care for them", "wealthy families seeking private surgery", "physicians in training", "patients who paid admission fees"],
      "The first paragraph says families with means were nursed at home and hospitals took in \"those who had no one.\"",
      stim="MCAT-T2-CARS-P5"),
    Q(2, 3, W, SW,
      "In the third paragraph, the author's point about the \"second change\" is that patients:",
      ["came to be treated as cases, not persons", "received worse medical care than they had before", "were charged more than they could pay", "stopped attending religious services"],
      "The author says the patient became \"less a guest of the institution and more a case within it,\" defined by a diagnosis and readings. The author grants that the medicine itself improved.",
      stim="MCAT-T2-CARS-P5"),
    Q(2, 2, B, SB,
      "A hospital asks surgeons to explain the options and risks of a procedure and to record the patient's own choice. The author would most likely see this as:",
      ["restoring the patient's standing", "a return to the old charity ward model", "a step away from advanced medicine", "an obstacle to effective treatment"],
      "The final paragraph describes informed consent and shared decision-making as attempts to treat the patient as someone whose understanding and agreement are part of the treatment, without giving up advanced medicine.",
      stim="MCAT-T2-CARS-P5"),
    Q(2, 3, B, SB,
      "Which statement, if true, would most complicate the author's comparison of charity-ward patients and modern patients?",
      ["Charity patients had little say in their care", "Paying patients wanted private rooms", "X-ray machines were expensive to install", "Modern hospitals treat both rich and poor patients"],
      "The author suggests the grateful pauper was at least a person to whom something was owed. If such patients routinely had no say in their care, the earlier arrangement looks less like a model of standing, complicating the contrast.",
      stim="MCAT-T2-CARS-P5"),
    Q(2, 2, B, SB,
      "The author's account of the hospital's history is most like which other account?",
      ["A school that gains tools but sees pupils as scores", "A shop that moves from cash to credit cards", "A library that buys more books every year", "A farm that switches from one main crop to another"],
      "The author describes an institution that gains technical power while coming to treat the people it serves as cases. A school that gains tools but starts to see pupils as scores has the same two-sided shape.",
      stim="MCAT-T2-CARS-P5"),
]
