# Practice Test 1: three original passages, 40 questions.

P1 = {"id": "IELTSR-T1-P1", "title": "Passage 1: Lights on the Edge of the Sea", "text": (
    "**A** For most of the history of seafaring, the coast was more dangerous to a ship than the open ocean. Out at sea, a vessel had room to make mistakes; near land, a single error in judging position could put it on rocks within minutes. Sailors therefore learned to read the shore by day, picking out church towers, distinctive hills and the colour of cliffs. At night, however, these landmarks vanished, and for centuries the only help a captain could hope for was a fire burning on a headland. The most famous early light, the Pharos of Alexandria, was built in the third century BC, but it was an exception. Most early lights were simple open fires of wood or coal, often tended irregularly and easily confused with the hearths of nearby villages.\n\n"
    "**B** The open fire had a deeper weakness than its unreliability: most of its light was wasted. A fire radiates in every direction, upwards into the sky and backwards over the land as much as out to sea. Even when coal braziers were placed high on stone towers, a ship a few miles offshore might see no more than a dull glow. In stormy weather, when a light was needed most, rain and spray could reduce it to almost nothing. Enclosing the flame in a glazed lantern protected it from wind and rain, but the glass quickly blackened with soot, and keepers spent long nights cleaning panes that were dirty again within the hour.\n\n"
    "**C** The first real improvement came in the late eighteenth century with the lamp designed by the Swiss physicist Aimé Argand. His burner used a hollow, circular wick and a glass chimney that drew a steady current of air through the centre of the flame. The result was a light far brighter than a candle and almost free of smoke. Lighthouse engineers combined the new lamp with polished metal reflectors shaped like shallow bowls, which gathered the light that would otherwise have escaped and sent it out in a concentrated beam. A single tower might now carry a dozen or more lamps, each with its own reflector, arranged in rows facing the sea.\n\n"
    "**D** Reflectors had their own limitations. The silvered surfaces tarnished and had to be polished daily, and even a well-kept mirror lost a large share of the light falling on it. The solution came from the French engineer Augustin-Jean Fresnel, who in the 1820s proposed replacing a single heavy lens with a series of concentric glass rings, each shaped to bend light towards the horizon. Because each ring was thin, the lens was far lighter than a solid one of the same power, and it absorbed much less light. A lamp at the centre of a large Fresnel lens could be seen from distances that earlier lights could not approach, and within a few decades such lenses had been fitted to lighthouses on many of the world's busiest coasts.\n\n"
    "**E** Brightness alone, however, did not solve the navigator's problem. On a coast with several lighthouses, a captain who saw a light still had to know which one it was. Engineers responded by giving each light its own character. Some shone steadily, some flashed at fixed intervals, and others were hidden at regular moments by rotating screens. The pattern of a particular light, such as two flashes every ten seconds, was printed in published lists and on charts, so that a sailor with a watch could identify a tower simply by timing it. The lists were updated as new towers were built or old ones changed, and an out-of-date list could be almost as dangerous as no list at all. Colour was also used, although red and green glass absorbed so much light that coloured lights had a much shorter range than white ones.\n\n"
    "**F** During the twentieth century the role of the keeper slowly disappeared. Electric lamps replaced oil, clockwork rotation gave way to electric motors, and remote monitoring meant that a fault could be reported to a central station without anyone on site. In Britain the last staffed lighthouses were automated in the 1990s. Today satellite positioning has made many lights less essential than they once were, and some authorities have reduced the range of their lights or switched them off altogether. Yet many remain in service, partly because electronic systems can fail and partly because a light seen from the deck offers a kind of reassurance that no screen can provide."
)}

P1_ITEMS = [
    HEAD(1, "B", "Why early fires wasted their light",
         ["A smokeless lamp and its reflectors", "The rising cost of building towers", "Telling one light from another", "From keepers to automatic systems"],
         "Paragraph B explains that an open fire sends its light in every direction, so a ship offshore saw only a dull glow, and that lanterns blackened with soot. Unreliable keepers are mentioned in Paragraph A, not here, and no paragraph discusses building costs."),
    HEAD(1, "C", "A smokeless lamp and its reflectors",
         ["Why early fires wasted their light", "Rings of glass that bend the light", "Disputes over who should pay for lights", "The danger of coloured lights at sea"],
         "Paragraph C describes Argand's lamp, which was brighter and almost free of smoke, and the bowl-shaped reflectors that concentrated its light. The glass rings belong to Fresnel's lens in Paragraph D."),
    HEAD(2, "D", "Rings of glass that bend the light",
         ["A smokeless lamp and its reflectors", "Telling one light from another", "The rising cost of building towers", "Early attempts at international agreement"],
         "Paragraph D opens with the limits of reflectors but is mainly about Fresnel's lens of thin concentric rings, lighter than a solid lens and losing less light. Reflectors are only the problem it solved."),
    HEAD(2, "E", "Telling one light from another",
         ["The danger of coloured lights at sea", "Rings of glass that bend the light", "From keepers to automatic systems", "Disputes over who should pay for lights"],
         "Paragraph E explains how each light was given its own pattern of flashes so that sailors could identify it. Colour is mentioned only as a detail with a shorter range, not as a danger to shipping."),
    HEAD(1, "F", "From keepers to automatic systems",
         ["Telling one light from another", "Early attempts at international agreement", "Why early fires wasted their light", "The rising cost of building towers"],
         "Paragraph F traces how electric lamps, motors and remote monitoring replaced the keeper, ending with lights that are now automated or switched off."),
    TF(1, "Most early coastal lights were open fires of wood or coal.", "T",
       "Paragraph A says most early lights were simple open fires of wood or coal. The Pharos is named as the exception."),
    TF(1, "A glazed lantern kept the glass clean for most of the night.", "F",
       "Paragraph B says the glass quickly blackened with soot and was dirty again within the hour, which contradicts the statement."),
    TF(2, "Argand's lamp was first used in a lighthouse in France.", "NG",
       "Paragraph C says engineers combined Argand's lamp with reflectors, but it never says where it was first used. Fresnel is the French engineer; that does not tell us where Argand's lamp was first installed."),
    TF(2, "Coloured lights could be seen as far away as white lights.", "F",
       "Paragraph E says red and green glass absorbed so much light that coloured lights had a much shorter range than white ones."),
    CZ(1, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nFresnel replaced a single heavy lens with a series of thin concentric glass [[1]], each shaped to bend light towards the horizon.",
       "rings", ["mirrors", "panes", "screens", "bowls"],
       "Paragraph D says Fresnel proposed a series of concentric glass rings. Bowls describes the shape of the earlier metal reflectors in Paragraph C."),
    CZ(2, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nBecause each ring was thin, the new lens was lighter than a solid one and absorbed much less [[1]].",
       "light", ["heat", "soot", "oil", "colour"],
       "Paragraph D says the thin rings made the lens far lighter and meant it absorbed much less light. Soot and oil belong to the lamps, not the lens."),
    CZ(1, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nA sailor with a watch could identify a lighthouse by [[1]] its pattern of flashes.",
       "timing", ["drawing", "colouring", "hearing", "repeating"],
       "Paragraph E says a sailor with a watch could identify a tower simply by timing it against the published pattern."),
    CZ(2, "Note completion", "Complete the note. Choose ONE word from the list.\n\nTwentieth century: remote monitoring lets faults be reported to a [[1]] station with no one on site.",
       "central", ["coastal", "local", "naval", "floating"],
       "Paragraph F says a fault could be reported to a central station without anyone on site."),
]

P2 = {"id": "IELTSR-T1-P2", "title": "Passage 2: Frozen Archives", "text": (
    "**A** In a laboratory on the edge of a university campus, a technician slides open a drawer and lifts out a foil packet no bigger than an envelope. Inside are several thousand seeds of a wild grass that grows on only a few hillsides. If those hillsides were ploughed or burned tomorrow, the packet would hold the species' best chance of survival. Collections like this one, known as seed banks, now exist in many countries, and together they store millions of samples of crops and wild plants. The work is unglamorous: much of it involves counting, labelling and checking, and the freezers must be watched day and night in case of a fault.\n\n"
    "**B** The idea is older than it might seem. Plant collectors have exchanged and stored seeds for centuries, but early collections were kept at room temperature and had to be grown out and harvested again every few years to stay alive. This was slow and costly, and every replanting risked losing rare varieties to disease, cross-pollination or simple human error. The modern seed bank emerged in the twentieth century, when researchers showed that many seeds could survive for decades if they were first dried and then kept cold.\n\n"
    "**C** The process begins with drying. Freshly collected seeds may hold a large share of their weight in water, and in that state they would be damaged by ice crystals when frozen. In a drying room kept at low humidity, the moisture is gradually drawn out over several weeks until it falls to only a few per cent. The seeds are then cleaned, counted, sealed in airtight packets and placed in freezers, typically at around minus eighteen degrees Celsius. Each packet is labelled with the place and date of collection, so that later researchers know exactly where the plants came from. Under these conditions, the seeds of many species are expected to remain alive for a century or longer.\n\n"
    "**D** Storage is not the end of the work. No one can tell simply by looking whether a seed is still alive, so samples are tested at intervals. A small number of seeds are taken from a packet and placed on damp paper in warm, bright conditions; the proportion that germinate gives an estimate of the health of the whole sample. When this figure falls below a set level, the collection must be renewed by growing plants from the remaining seeds and gathering a fresh harvest. Because each test uses up seeds, banks try to store enough for decades of checking.\n\n"
    "**E** Not every plant cooperates. The seeds of some species, including many tropical trees, are killed by drying, and they cannot be stored by the usual method. Botanists call these seeds recalcitrant. For them, researchers have turned to cryopreservation: tiny pieces of tissue, often the embryo removed from the seed, are cooled rapidly in liquid nitrogen to nearly minus two hundred degrees. The technique is demanding, and each species may require months of trials to find a method that works, but it offers the only long-term option for plants that would otherwise survive only in the wild. As a result, seed banks hold far fewer samples of these plants than of crops such as wheat and rice, whose seeds dry and store easily.\n\n"
    "**F** The best-known collection is the Svalbard Global Seed Vault, cut into a mountainside on a Norwegian island far inside the Arctic Circle and opened in 2008. It holds duplicate samples deposited by banks around the world, a back-up in case the originals are lost to war, natural disaster or equipment failure. Each depositing bank keeps ownership of its own samples, which can be withdrawn only by the bank that sent them. Its location was chosen partly because the surrounding permafrost would keep the samples cold even if the power failed. Supporters stress, however, that the vault is a last resort. Seeds in storage cannot adapt to a changing climate, and many scientists believe that protecting plants in their natural habitats must remain the first line of defence."
)}

L6 = "ABCDEF"
P2_ITEMS = [
    MI(2, "a description of how the health of stored seeds is checked", "D", L6,
       "Paragraph D explains the germination test: a few seeds are placed on damp paper and the share that germinate estimates the health of the sample."),
    MI(2, "the reason seeds must lose most of their water before freezing", "C", L6,
       "Paragraph C says seeds full of water would be damaged by ice crystals when frozen, so they are dried first. Paragraph E is about seeds that cannot be dried at all."),
    MI(2, "an explanation of why older collections had to be regrown regularly", "B", L6,
       "Paragraph B says early collections were kept at room temperature and had to be grown out and harvested again every few years to stay alive."),
    MI(3, "a view that storage cannot replace protecting plants in the wild", "F", L6,
       "Paragraph F ends with supporters calling the vault a last resort and scientists saying natural habitats must remain the first line of defence."),
    TF(1, "Early seed collections were stored at low temperatures.", "F",
       "Paragraph B says early collections were kept at room temperature, which contradicts the statement."),
    TF(1, "Drying seeds in a seed bank takes several weeks.", "T",
       "Paragraph C says the moisture is drawn out over several weeks in a low-humidity room."),
    TF(2, "Germination tests are carried out on every sample once every five years.", "NG",
       "Paragraph D says samples are tested at intervals but gives no interval, so five years is not stated either way."),
    TF(3, "The Svalbard vault holds the only copies of most of its samples.", "F",
       "Paragraph F says the vault holds duplicate samples deposited by other banks as a back-up, so the originals exist elsewhere."),
    CZ(1, "Table completion", "Complete the table. Choose ONE word from the list.\n\n| Method | What is stored | Conditions |\n|---|---|---|\n| Conventional storage | dried seeds in [[1]] packets | about minus 18 °C |\n| Cryopreservation | small pieces of tissue | liquid nitrogen |",
       "airtight", ["paper", "cardboard", "damp", "open"],
       "Paragraph C says the dried seeds are sealed in airtight packets before freezing. Damp paper is used for germination tests, not storage."),
    CZ(2, "Table completion", "Complete the table. Choose ONE word from the list.\n\n| Method | What is stored | Conditions |\n|---|---|---|\n| Conventional storage | dried seeds in sealed packets | about minus 18 °C |\n| Cryopreservation | small pieces of [[1]], often the embryo | liquid nitrogen |",
       "tissue", ["leaf", "root", "pollen", "bark"],
       "Paragraph E says tiny pieces of tissue, often the embryo removed from the seed, are cooled in liquid nitrogen."),
    CZ(2, "Table completion", "Complete the table. Choose ONE word from the list.\n\n| Method | What is stored | Conditions |\n|---|---|---|\n| Conventional storage | dried seeds in sealed packets | about minus 18 °C |\n| Cryopreservation | small pieces of tissue | cooled rapidly in liquid [[1]] |",
       "nitrogen", ["oxygen", "helium", "water", "hydrogen"],
       "Paragraph E says the tissue is cooled rapidly in liquid nitrogen to nearly minus two hundred degrees."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nSeeds that are killed by drying, such as those of many tropical [[1]], are called recalcitrant.",
       "trees", ["grasses", "crops", "vines", "herbs"],
       "Paragraph E names many tropical trees as species whose seeds are killed by drying. The wild grass in Paragraph A is stored in the usual way."),
    CZ(1, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nWhen the share of seeds that germinate falls below a set level, the collection must be [[1]].",
       "renewed", ["destroyed", "divided", "dried", "moved"],
       "Paragraph D says the collection must then be renewed by growing plants from the remaining seeds and gathering a fresh harvest."),
]

P3 = {"id": "IELTSR-T1-P3", "title": "Passage 3: In Praise of Boredom", "text": (
    "Few states of mind have as poor a reputation as boredom. Parents treat it as a problem to be fixed, employers as a sign of disengagement, and the technology industry as an empty space waiting to be filled. Smartphones in particular have made it possible never to be bored again: any pause, whether in a queue, on a train or in the minutes before sleep, can now be occupied instantly. It is worth asking, however, whether we have been too quick to treat boredom as an enemy. A growing body of research suggests that it may serve a purpose, and that losing it entirely could cost us more than we realise.\n\n"
    "The case begins with what boredom actually is. The psychologist Hannah Merrow describes it not as a lack of stimulation but as a signal: an unpleasant feeling that tells us our current activity is failing to engage us and that we should look for something else. In this view boredom works rather like hunger. Nobody enjoys being hungry, but a person who never felt hunger would be in serious danger. A person who never feels bored, Merrow argues, may lose the push that drives them to seek new goals.\n\n"
    "Some of the most widely reported studies have examined boredom and creativity. In one experiment conducted by Daniel Ostrowski and colleagues, volunteers first spent fifteen minutes copying numbers from a long printed list, a task chosen precisely because it was dull. They were then asked to think of as many uses as possible for a pair of plastic cups. Compared with a group who had not done the copying, the bored volunteers produced more ideas, and their ideas were judged more original. Ostrowski is careful not to claim too much. The effect, he notes, was modest, and it has not appeared in every attempt to repeat the study. Nevertheless, the findings fit a wider pattern: when the mind is not occupied by a task, it tends to wander, and mind-wandering appears to help people make unexpected connections.\n\n"
    "I find this research persuasive, but I think its enthusiasts sometimes overstate their case. Boredom is not a magic source of inspiration, and for some people it is genuinely harmful. The sociologist Priya Anand has shown that chronic boredom, the kind experienced over months or years in unrewarding work or enforced idleness, is linked to poorer mental health and to risky behaviour. There is a difference between the brief boredom of a long train journey and the grinding boredom of a life with too few opportunities. Praising the first should never become an excuse for ignoring the second.\n\n"
    "What, then, is the problem with filling every quiet moment? The difficulty lies in how we respond to the signal. Merrow points out that boredom presents a choice: we can look for a meaningful new activity, or we can reach for the quickest available distraction. The phone almost always wins, because it offers relief in seconds and asks nothing of us in return. The feeling disappears, but so does the push towards anything better. Over time, Anand suggests, people may become less tolerant of even short pauses, so that a few minutes without input begins to feel unbearable.\n\n"
    "Children are often at the centre of this debate. Many parents feel guilty when a child complains of having nothing to do, and they respond by arranging activities or handing over a screen. Teachers I have spoken to describe pupils who struggle to stay with a problem for more than a few minutes before asking for help. It would be wrong to blame screens alone for this, since crowded timetables and pressure to achieve also leave little room for unstructured time. But I believe that children who are occasionally left to be bored, and to find their own way out of it, learn something valuable about their own resources.\n\n"
    "None of this means that we should seek out boredom for its own sake, or that the dull meeting and the delayed train are secretly good for us. The point is narrower. Boredom is uncomfortable because it is meant to be, and its discomfort can lead somewhere useful if we allow it to. Rather than banishing it with a swipe, we might occasionally let it run its course, and see where the wandering mind takes us. The result will not always be a brilliant idea. Sometimes it will simply be the realisation that we would rather be doing something else, which is, after all, exactly what boredom was trying to tell us."
)}

NAMES1 = ["Hannah Merrow", "Daniel Ostrowski", "Priya Anand"]
P3_ITEMS = [
    YN(2, "Researchers who favour boredom sometimes claim more than the evidence supports.", "Y",
       "The writer says: I find this research persuasive, but I think its enthusiasts sometimes overstate their case."),
    YN(2, "Screens are the main reason that pupils find it hard to stay with a problem.", "N",
       "The writer says it would be wrong to blame screens alone, because crowded timetables and pressure to achieve also leave little room for unstructured time."),
    YN(3, "Schools should give pupils more homework to fill their free time.", "NG",
       "The writer discusses crowded timetables and unstructured time but never says whether pupils should get more or less homework."),
    YN(2, "Dull meetings and delayed trains are secretly good for us.", "N",
       "The last paragraph says none of this means that the dull meeting and the delayed train are secretly good for us."),
    YN(3, "The discomfort of boredom is part of its purpose.", "Y",
       "The writer says boredom is uncomfortable because it is meant to be, and that its discomfort can lead somewhere useful."),
    MC(2, "What is the writer's main purpose in the first paragraph?", "To question a common view of boredom",
       ["To describe the history of smartphones", "To explain how boredom is measured", "To argue that boredom should be avoided"],
       "The first paragraph lists how people treat boredom as a problem, then asks whether we have been too quick to treat it as an enemy. Smartphones are only an example."),
    MC(2, "Why does Merrow compare boredom with hunger?", "Both are unpleasant but useful signals",
       ["Both come from poor daily routines at home", "Both increase when people use phones", "Both are strongest in childhood"],
       "Merrow says nobody enjoys hunger, yet a person who never felt it would be in danger; in the same way boredom is an unpleasant signal that pushes us towards new goals."),
    MC(3, "What does the passage say about Ostrowski's creativity study?", "Its result was not always repeated",
       ["It was carried out only with children", "It found no effect on originality", "It was rejected by other researchers"],
       "Ostrowski notes the effect was modest and has not appeared in every attempt to repeat the study. The bored group's ideas were in fact judged more original."),
    MC(2, "According to the writer, why does the phone almost always win?", "It gives quick relief and asks little",
       ["It helps people find meaningful goals", "It makes people more creative", "It is closer at hand than a book"],
       "The fifth paragraph says the phone wins because it offers relief in seconds and asks nothing of us in return. Nothing is said about books."),
    MF(2, "Which person warns that the effect they found was small?", "Daniel Ostrowski", NAMES1,
       "Ostrowski is careful not to claim too much: he notes the effect was modest. Merrow and Anand did not run the creativity study."),
    MF(2, "Which person links long-lasting boredom with risky behaviour?", "Priya Anand", NAMES1,
       "The sociologist Priya Anand has shown that chronic boredom is linked to poorer mental health and risky behaviour."),
    SE(2, "In the creativity study, the volunteers who first copied numbers",
       "came up with more original uses for the cups",
       ["copied the numbers more accurately than others", "refused to complete the second task", "found the second task even more boring"],
       "The passage says the bored volunteers produced more ideas and their ideas were judged more original than those of the group who had not done the copying."),
    SE(3, "Anand suggests that people who fill every pause with a distraction may",
       "find even short pauses harder to bear",
       ["become more creative over time", "lose interest in their phones", "seek out more meaningful activities instead"],
       "Anand suggests people may become less tolerant of even short pauses, so that a few minutes without input feels unbearable."),
    CZ(2, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nMerrow argues that a person who never feels bored may lose the [[1]] that drives them to seek new goals.",
       "push", ["hunger", "time", "habit", "talent"],
       "The second paragraph says a person who never feels bored may lose the push that drives them to seek new goals."),
]

PASSAGES = [(P1, P1_ITEMS), (P2, P2_ITEMS), (P3, P3_ITEMS)]
