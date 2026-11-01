# Shared stimuli for the UGC-NET Paper 1 bank: one reading comprehension
# passage and one data interpretation table per practice test (the real paper
# sets five questions on each), plus two of each for the drills. Passages are
# original; tables come from ditables.py (TABLES and render are passed in by
# build.py).
STIMULI = [
    {
        "id": "UGCNET-T1-RC",
        "title": "Reading comprehension: memory without paper",
        "text": (
            "Read the passage and answer the questions that follow.\n\n"
            "For most of human history, knowledge travelled without paper. Long poems, legal codes, genealogies and the rules of ritual were carried in memory and passed from teacher to student by recitation. Modern readers often assume that such a system must have been fragile, that every retelling would add errors until the original was lost. The evidence suggests otherwise. Where communities treated exact transmission as a duty, they built elaborate safeguards: texts were learnt forwards, backwards and in interlocking patterns, so that a slip in one version would be caught by the others.\n\n"
            "These safeguards tell us something about what a community valued. A tradition that drills the precise sound of every syllable cares more about fidelity than about interpretation; the meaning may be debated, but the words may not change. A storytelling tradition, by contrast, may keep only the outline of a tale and invite each performer to colour it for the audience in front of him. Neither is a failed version of the other. They are answers to different questions about what is worth keeping.\n\n"
            "Writing did not end oral learning so much as change its role. Once a text could be checked against a manuscript, memory was freed from the burden of storage and could turn to understanding. Yet something was lost as well. A student who has a book can postpone learning indefinitely, telling himself that the knowledge is safe on the shelf. The reciter had no such comfort: what he did not hold in mind, he did not have at all.\n\n"
            "Today, when almost any fact can be summoned in seconds, the question returns in a new form. If storage is no longer the problem, what should a learner carry inside? The oral traditions would answer that we keep in memory whatever we expect to think with, not merely whatever we might need to look up."
        ),
    },
    {
        "id": "UGCNET-T2-RC",
        "title": "Reading comprehension: the shade of a street",
        "text": (
            "Read the passage and answer the questions that follow.\n\n"
            "On a summer afternoon, two streets a few hundred metres apart can feel as if they belong to different cities. One is lined with old rain trees whose crowns meet overhead; the other is a broad road of asphalt and glass. Thermometers placed at head height on both will often differ by several degrees, and the surface of the bare road can be far hotter than the air above it. Planners have long known this, but only recently has street shade begun to be treated as public infrastructure rather than as decoration.\n\n"
            "The change is partly a matter of measurement. When heat was described only by the city's average temperature, the shaded lane and the exposed road disappeared into a single number. Finer data, collected by sensors and by volunteers walking fixed routes, shows that heat is distributed unequally, and that the hottest streets are frequently those where people with the least choice spend their days: vendors, delivery riders and workers waiting for transport.\n\n"
            "Trees are not a simple remedy. They need water, space for roots and years of care before they give useful shade, and a sapling planted for a ceremony and then forgotten is a gesture, not a policy. Some streets are too narrow for large crowns, and there awnings, reflective roofs and arcades may do more. The point is not that one solution fits everywhere, but that shade should be planned with the same seriousness as drains or street lights.\n\n"
            "A city that does this well asks a modest question before it asks a grand one. Not 'how do we cool the city?', which invites slogans, but 'where does a person wait, walk and work at three in the afternoon, and what is above their head?'"
        ),
    },
    {
        "id": "UGCNET-D-RC1",
        "title": "Reading comprehension: slow reading",
        "text": (
            "Read the passage and answer the questions that follow.\n\n"
            "Speed is usually praised as a reading skill. Courses promise to double the number of pages a student can cover in an hour, and the habit of skimming has become so ordinary that many readers no longer notice they are doing it. Skimming has its uses. A researcher surveying a hundred abstracts to find the five that matter would be foolish to read each one slowly. The difficulty begins when a method suited to sorting is applied to understanding.\n\n"
            "Difficult texts resist speed because their meaning is not located in single sentences. An argument may depend on a qualification made three pages earlier, or on a word used in a narrower sense than usual. The fast reader collects the conclusions and misses the conditions under which they hold. He can repeat what the author claimed but cannot say why the author believed it, and so he cannot tell when the claim stops being true.\n\n"
            "Slow reading is not the same as reading everything slowly. It is the ability to change pace deliberately: to move quickly through familiar ground and to stop where the text becomes dense, rereading a paragraph, writing a question in the margin, or putting the argument into one's own words before going on. This is tiring, which is why it must be practised rather than merely admired.\n\n"
            "Teachers sometimes treat a student's slowness as a weakness to be corrected. Often it is the opposite: a sign that the student has noticed something the quicker classmates passed over."
        ),
    },
    {
        "id": "UGCNET-D-RC2",
        "title": "Reading comprehension: the fishers' cooperative",
        "text": (
            "Read the passage and answer the questions that follow.\n\n"
            "When the small-boat fishers of a coastal village formed a cooperative, their first aim was simple: to stop selling their catch on the beach to agents at whatever price the agents chose. By pooling the catch and renting a cold store, they could send fish to city markets themselves and bargain as a group. Within a few seasons their earnings had risen, but the cooperative had also met problems that no one had foreseen.\n\n"
            "The first was freshness. An agent buying from one boat could refuse a poorly iced basket and move on; a cooperative selling under one name found that a single spoilt consignment harmed everyone's reputation. Fishers who had worked alone for decades now had to accept checks by their neighbours, and some resented it. The second problem was what to sell. City buyers wanted cleaned and packed fish, while many older members took pride in the sun-dried fish their families had always made.\n\n"
            "The cooperative did not settle these problems by choosing one side. It set aside part of its income to train younger members in cleaning and packing while paying older members to teach the drying craft, and it sold the two products under different labels. Checking the ice and the catch was made a rotating duty, so that every member was at different times both the checker and the checked.\n\n"
            "What the fishers learnt applies to many forms of collective action: shared rewards bring shared obligations, and an institution survives not by removing disagreement but by giving it a fair and regular place to be heard."
        ),
    },
] + [
    {"id": sid,
     "title": TABLES[k]["title"],
     "text": "Study the table and answer the questions that follow.\n\n" + render(TABLES[k])}
    for k, sid in (("T1", "UGCNET-T1-DI"), ("T2", "UGCNET-T2-DI"), ("D1", "UGCNET-D-DI1"), ("D2", "UGCNET-D-DI2"))
]
