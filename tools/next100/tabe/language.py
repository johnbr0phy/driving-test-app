# TABE 13&14 Language, Level D. Original drafts and items.
# Per test 18: Text Types and Purposes 7 (revising an argument draft and an
# explanatory draft), Conventions of Standard English 5, Knowledge of Language
# and Vocabulary 6 (the Level D blueprint's 39.4 / 27.3 / 33.3 percent).
# Drill only: 12 / 7 / 5. Language 13&14 is multiple choice only.

STIMULI = [
    {"id": "TABE-T1-L1", "title": "Draft: A proposal for recycling bins", "text": (
        "(1) Our warehouse throws away a huge amount of cardboard every week. (2) Most of it goes straight into the "
        "trash compactor, even though nearly all of it could be recycled. (3) I think we should put recycling bins "
        "beside each packing station. (4) Last month I counted the boxes we broke down on my shift, and there were "
        "more than three hundred. (5) The recycling company that serves our area picks up cardboard for businesses "
        "at no charge. (6) My cousin works at a recycling plant in another state. (7) Fewer trash pickups could "
        "also lower what the company pays to haul away waste. (8) Bins would take up very little floor space.")},
    {"id": "TABE-T1-L2", "title": "Draft: How to jump-start a car", "text": (
        "(1) A dead battery does not have to ruin your day if you have jumper cables and a second car. (2) First, "
        "park the working car close to the dead one and turn both engines off. (3) Clip one red clamp to the "
        "positive post of the dead battery. (4) Clip the other red clamp to the positive post of the good battery. "
        "(5) Next, attach a black clamp to the negative post of the good battery. (6) Attach the last black clamp to "
        "a bare metal part of the dead car's engine, away from the battery. (7) Start the working car and let it "
        "run for a few minutes before trying the other.")},
    {"id": "TABE-T2-L1", "title": "Draft: Letter about pool hours", "text": (
        "(1) Dear Parks Director: (2) I am writing to ask that the Lincoln Street pool stay open until 8 p.m. on "
        "summer weeknights. (3) Right now the pool closes at 6 p.m., before many parents get home from work. "
        "(4) Families who work during the day have no chance to swim together. (5) On hot evenings, children in "
        "our neighborhood end up playing in the street to cool off. (6) The pool on Cedar Avenue has a great snack "
        "bar. (7) Two extra hours, five nights a week, would let many more residents use a pool their taxes already "
        "pay for. (8) Thank you for considering this request.")},
    {"id": "TABE-T2-L2", "title": "Draft: The town's first library", "text": (
        "(1) Our town's first public library opened in 1912 in a single room above the hardware store. (2) It "
        "held about four hundred books, most of them donated by local families. (3) The library grew quickly. "
        "(4) By 1930, it had moved into its own brick building on Main Street. (5) The building was paid for by "
        "a fundraising drive in which schoolchildren collected pennies door to door. (6) Today that building is "
        "the town museum, and the library has moved again, to a larger space beside the high school.")},
    {"id": "TABE-D-L1", "title": "Draft: Why our clinic should offer evening hours", "text": (
        "(1) The Westside Health Clinic is open from 8 a.m. to 4 p.m. on weekdays. (2) For people who work "
        "those same hours, getting a checkup means losing a day's pay. (3) The clinic should stay open until "
        "7 p.m. two nights a week. (4) A survey of clinic patients found that more than half work daytime "
        "shifts. (5) Many of them said they skip checkups because they cannot leave work. (6) Evening hours "
        "would help patients get care before small problems become serious. (7) The clinic's waiting room "
        "was painted last year.")},
    {"id": "TABE-D-L2", "title": "Draft: How to plant a tree", "text": (
        "(1) Planting a tree correctly helps it live for decades. (2) Dig a hole two to three times as wide as "
        "the root ball but no deeper than it. (3) Remove the container and gently loosen any roots that circle "
        "the ball. (4) Set the tree in the hole so the top of the root ball is level with the ground. (5) Fill "
        "the hole with the soil you removed, pressing lightly to remove air pockets. (6) Water the tree deeply, "
        "and spread mulch around it, keeping the mulch a few inches away from the trunk.")},
    {"id": "TABE-D-L3", "title": "Draft: Report on honeybees", "text": (
        "(1) Honeybees live in colonies that can hold tens of thousands of bees. (2) Each colony has one queen, "
        "whose main job is to lay eggs. (3) Most of the other bees are female workers. (4) Workers do almost every "
        "job in the hive: they clean, build wax comb, guard the entrance and gather nectar and pollen. (5) A few "
        "hundred male bees, called drones, also live in the hive. (6) Their only job is to mate with a queen from "
        "another colony.")},
]

ITEMS = [
    # ---------------- Test 1 ----------------
    # Text Types and Purposes (7): T1-L1 x4, T1-L2 x3
    Q(1, TEXT, 2, "Stating a claim", "Which sentence states the writer's main claim?",
      ["Sentence 3", "Sentence 1", "Sentence 4", "Sentence 8"],
      "Sentence 3 says what the writer wants: recycling bins beside each packing station. Sentence 1 describes the problem that leads to the claim.",
      stim="TABE-T1-L1"),
    Q(1, TEXT, 2, "Irrelevant sentence", "Which sentence should be removed because it does not support the claim?",
      ["Sentence 6", "Sentence 5", "Sentence 7", "Sentence 2"],
      "Where the writer's cousin works gives no reason to add bins at this warehouse. Sentence 5, free pickup, is one of the strongest reasons.",
      stim="TABE-T1-L1"),
    Q(1, TEXT, 3, "Strengthening evidence", "Which detail would best strengthen sentence 4?",
      ["A weekly box count for all shifts", "The color of the bins",
       "The name of the packing station lead", "How long the writer has worked there"],
      "Sentence 4 counts boxes on one shift; a count for the whole warehouse would show the full size of the problem.",
      stim="TABE-T1-L1"),
    Q(1, TEXT, 2, "Concluding sentence", "Which sentence would best conclude the proposal?",
      ["Bins would cut costs and waste.", "Cardboard is made from trees.",
       "I will be on vacation next week.", "Some workers prefer plastic tape."],
      "A conclusion should sum up the claim and its main reasons: savings and recycling. The other sentences add unrelated facts.",
      stim="TABE-T1-L1"),
    Q(1, TEXT, 2, "Transitions in a procedure", "Which word or phrase would best begin sentence 3?",
      ["Then,", "However,", "For example,", "In contrast,"],
      "Sentence 3 is the next step after parking and turning the engines off, so a sequence word fits. However and In contrast signal opposing ideas.",
      stim="TABE-T1-L2"),
    Q(1, TEXT, 3, "Precise ending for a process", "Which sentence would best follow sentence 7 to finish the steps?",
      ["Last, start the dead car and remove the cables.", "Batteries come in many different sizes and shapes.",
       "Always carry a spare tire in your trunk too.", "My uncle taught me this when I was a teenager."],
      "The steps stop before the dead car is started and the cables removed, so the missing final step completes the process. The other sentences are off topic.",
      stim="TABE-T1-L2"),
    Q(1, TEXT, 2, "Introducing a topic", "What is the purpose of sentence 1?",
      ["To introduce the topic", "To give the first step",
       "To warn about danger", "To list the tools in order"],
      "Sentence 1 tells the reader what the passage is about and when they would need it; the steps start with sentence 2.",
      stim="TABE-T1-L2"),

    # Conventions (5)
    Q(1, CONV, 1, "Subject-verb agreement",
      "Read the sentence.\n\n\"Each of the drivers ___ a safety vest.\"\n\nWhich word correctly fills the blank?",
      ["wears", "wear", "are wearing", "have worn"],
      "The subject is each, which is singular, so the verb is wears. Drivers is in a prepositional phrase and does not control the verb.",
      basics="subjectVerb"),
    Q(1, CONV, 2, "Pronoun case",
      "Read the sentence.\n\n\"The manager asked Luis and ___ to stay late.\"\n\nWhich word correctly fills the blank?",
      ["me", "I", "myself", "mine"],
      "The pronoun is an object of asked, so it is me. Test it alone: \"asked me,\" not \"asked I.\"",
      basics="pronounCase"),
    Q(1, CONV, 2, "Run-on sentences",
      "Read the sentence.\n\n\"The bus was late, we missed the start of the meeting.\"\n\nWhich revision is correct?",
      ["late, so we missed", "late we missed", "late, we, missed", "late and, we missed"],
      "Two complete sentences joined by only a comma are a comma splice. Adding the conjunction so after the comma fixes it.",
      basics="commaSplices"),
    Q(1, CONV, 2, "Apostrophes",
      "Read the sentence.\n\n\"All of the ___ lockers were cleaned on Friday.\"\n\nWhich word correctly fills the blank?",
      ["workers'", "worker's", "workers", "workers's"],
      "The lockers belong to many workers, so the plural possessive takes the apostrophe after the s. Worker's means one worker.",
      basics="apostrophes"),
    Q(1, CONV, 2, "Capitalization", "Which sentence uses capital letters correctly?",
      ["We drove to Ohio last Thanksgiving.", "We drove to ohio last Thanksgiving.",
       "We drove to Ohio last thanksgiving.", "We Drove to Ohio last Thanksgiving."],
      "States and holidays are proper nouns, so Ohio and Thanksgiving are capitalized; drove is an ordinary verb."),

    # Knowledge of Language and Vocabulary (6)
    Q(1, KNOW, 2, "Concise wording",
      "Read the sentence.\n\n\"At this point in time, the store is currently hiring new employees.\"\n\nWhich revision is the most concise?",
      ["The store is hiring new employees.", "At this time, the store is currently hiring.",
       "The store, at this point, is hiring employees now.", "Currently the store hires new employees now."],
      "\"At this point in time\" and \"currently\" repeat the same idea, so dropping both keeps the meaning in the fewest words: The store is hiring new employees. The other choices still repeat the idea of now or drop part of the meaning."),
    Q(1, KNOW, 2, "Word meaning from context",
      "Read the sentence.\n\n\"The new rule is mandatory, so every worker must follow it.\"\n\nWhat does mandatory mean?",
      ["Required", "Optional", "Temporary", "Confusing"],
      "The clue is \"every worker must follow it,\" so mandatory means required. Optional is the opposite."),
    Q(1, KNOW, 2, "Greek and Latin roots",
      "The root port means \"carry.\" Which word means \"able to be carried\"?",
      ["portable", "import", "report", "transport"],
      "The suffix -able means \"able to be,\" so portable means able to be carried. Transport means to carry from one place to another, not able to be carried."),
    Q(1, KNOW, 2, "Transition words",
      "Read the sentences.\n\n\"The job pays well. ___, the commute is very long.\"\n\nWhich word best fills the blank?",
      ["However", "Therefore", "Similarly", "For example"],
      "A long commute is a drawback that contrasts with good pay, so a contrast word fits. Therefore would mean the long commute is caused by the pay."),
    Q(1, KNOW, 2, "Formal style",
      "A worker is writing a report for a supervisor. Which sentence fits a formal report best?",
      ["The shipment arrived two days late.", "The shipment showed up super late, ugh.",
       "So yeah, the stuff came late.", "The boxes were, like, really late."],
      "A report uses clear, neutral wording. Slang such as super, ugh and like is too casual for a supervisor."),
    Q(1, KNOW, 3, "Multiple-meaning words",
      "Read the sentence.\n\n\"The nurse will chart the patient's temperature every hour.\"\n\nWhat does chart mean in this sentence?",
      ["Record", "Map", "Plan a route", "Guess at"],
      "Here chart is a verb meaning to write down information in a patient's record. A chart can also be a map, but here the nurse is writing down a reading."),

    # ---------------- Test 2 ----------------
    # Text Types and Purposes (7): T2-L1 x4, T2-L2 x3
    Q(2, TEXT, 2, "Stating a claim", "Which sentence states what the writer is asking for?",
      ["Sentence 2", "Sentence 3", "Sentence 5", "Sentence 7"],
      "Sentence 2 makes the request: keep the pool open until 8 p.m. on summer weeknights. Sentence 3 gives the problem behind it.",
      stim="TABE-T2-L1"),
    Q(2, TEXT, 2, "Irrelevant sentence", "Which sentence should be removed because it does not support the request?",
      ["Sentence 6", "Sentence 4", "Sentence 5", "Sentence 7"],
      "A snack bar at a different pool has nothing to do with the Lincoln Street pool's hours. Sentence 5 gives a safety reason for the change.",
      stim="TABE-T2-L1"),
    Q(2, TEXT, 3, "Adding evidence", "Which detail would best support the request?",
      ["How many families swim after 5 p.m.", "The temperature of the pool water",
       "The name of the pool's head lifeguard", "The year the pool was built"],
      "Evidence that families already use the pool late in the day shows real demand for later hours.",
      stim="TABE-T2-L1"),
    Q(2, TEXT, 2, "Combining sentences", "Which is the best way to combine sentences 3 and 4?",
      ["Because the pool closes at 6 p.m., working families cannot swim together.",
       "The pool closes at 6 p.m. and families who work during the day.",
       "Closing at 6 p.m., families who work during the day have no chance to swim.",
       "The pool closes at 6 p.m., families who work during the day have no chance."],
      "Starting with Because joins the cause and the effect in one complete sentence. Joining two sentences with only a comma is a comma splice, and the version with Closing has no clear subject for closing.",
      stim="TABE-T2-L1"),
    Q(2, TEXT, 2, "Transitions in a narrative of events", "Which word or phrase would best begin sentence 3?",
      ["Over the next few years,", "On the other hand,", "As a result of the rain,", "In other words,"],
      "The library grew between 1912 and 1930, so a time transition connects the opening with the move. On the other hand signals a contrast.",
      stim="TABE-T2-L2"),
    Q(2, TEXT, 3, "Supporting detail", "Which sentence would best follow sentence 3 to support it?",
      ["By 1920, it held three thousand books.", "Hardware stores sell many kinds of tools.",
       "Some people prefer to read at home.", "The town also has a fire station."],
      "Sentence 3 says the library grew quickly, and a big rise in its books is direct evidence of that. The other sentences are off topic.",
      stim="TABE-T2-L2"),
    Q(2, TEXT, 2, "Organization", "How is the draft organized?",
      ["In time order", "From problem to solution", "By comparing two libraries", "From least to most important"],
      "The draft moves from 1912 to 1930 to today, telling the library's history in time order.",
      stim="TABE-T2-L2"),

    # Conventions (5)
    Q(2, CONV, 2, "Verb tense",
      "Read the sentence.\n\n\"Yesterday the crew ___ the new shelves before noon.\"\n\nWhich verb correctly fills the blank?",
      ["finished", "finishes", "will finish", "is finishing"],
      "Yesterday places the action in the past, so the past tense finished is correct.",
      basics="verbTense"),
    Q(2, CONV, 2, "Commonly confused words",
      "Read the sentence.\n\n\"The clinic changed ___ hours for the holiday.\"\n\nWhich word correctly fills the blank?",
      ["its", "it's", "its'", "it is"],
      "The hours belong to the clinic, so the possessive its is correct. It's means it is.",
      basics="commonlyConfused"),
    Q(2, CONV, 2, "Subject-verb agreement",
      "Read the sentence.\n\n\"Neither the cook nor the servers ___ the new menu yet.\"\n\nWhich verb correctly fills the blank?",
      ["have seen", "has seen", "was seeing", "sees"],
      "With neither...nor, the verb agrees with the nearer subject, servers, which is plural, so have seen is correct.",
      basics="subjectVerb"),
    Q(2, CONV, 2, "Commas in a series", "Which sentence uses commas correctly?",
      ["Bring a pen, a photo ID, and your letter.", "Bring a pen a photo ID, and your letter.",
       "Bring, a pen, a photo ID and your letter.", "Bring a pen, a photo ID, and, your letter."],
      "Commas separate the items in a list, with no comma after the verb or after and."),
    Q(2, CONV, 3, "Pronoun agreement",
      "Read the sentence.\n\n\"Every student must bring ___ own calculator.\"\n\nWhich words correctly fill the blank?",
      ["his or her", "their's", "him or her", "they're"],
      "Every student is singular and the blank needs a possessive, so his or her fits. Him or her is an object form, they're means they are, and their's is never correct.",
      basics="pronounCase"),

    # Knowledge of Language and Vocabulary (6)
    Q(2, KNOW, 2, "Concise wording",
      "Read the sentence.\n\n\"The reason why the meeting was canceled is because the room was flooded.\"\n\nWhich revision is clearest and most concise?",
      ["The meeting was canceled because the room flooded.", "The reason the meeting was canceled is because of flooding.",
       "Because of the reason that the room flooded, the meeting was canceled.", "The meeting, the reason being a flood, was canceled."],
      "The reason why and is because repeat the same idea. Stating the cause with because alone is clear and short."),
    Q(2, KNOW, 2, "Word meaning from context",
      "Read the sentence.\n\n\"The instructions were so ambiguous that half the class did the wrong assignment.\"\n\nWhat does ambiguous mean?",
      ["Unclear", "Short", "Strict", "Helpful"],
      "Half the class misunderstood, so the instructions could be read more than one way. Helpful instructions would not cause that."),
    Q(2, KNOW, 2, "Prefixes", "The prefix pre- means \"before.\" What does preheat mean?",
      ["Heat before using", "Heat a second time", "Heat too much", "Stop heating"],
      "Pre- plus heat means to heat beforehand, as with an oven before baking. Heat again would be reheat."),
    Q(2, KNOW, 2, "Precise word choice",
      "Read the sentence.\n\n\"The storm did a lot of bad stuff to the roof.\"\n\nWhich revision uses the most precise words?",
      ["The storm tore shingles off the roof.", "The storm did things to the roof.",
       "The storm was bad for the roof.", "The roof had stuff happen in the storm."],
      "Tore shingles off says exactly what happened. Things and stuff are vague."),
    Q(2, KNOW, 3, "Academic vocabulary",
      "Read the sentence.\n\n\"The study found a correlation between sleep and grades.\"\n\nWhat does correlation mean?",
      ["A link between two things", "A mistake in the results",
       "A rule everyone must follow", "A single test score"],
      "A correlation is a relationship in which two things tend to change together. The sentence connects sleep with grades."),
    Q(2, KNOW, 2, "Shades of meaning", "Which word shows the strongest feeling of happiness?",
      ["Overjoyed", "Pleased", "Content", "Satisfied"],
      "Pleased, content and satisfied describe mild happiness; overjoyed means extremely happy."),

    # ---------------- Drill only ----------------
    # Text Types and Purposes (12): D-L1 x4, D-L2 x4, D-L3 x4
    Q(0, TEXT, 2, "Stating a claim", "Which sentence states the writer's claim?",
      ["Sentence 3", "Sentence 1", "Sentence 4", "Sentence 7"],
      "Sentence 3 says what should happen: open until 7 p.m. two nights a week. Sentence 1 states the current hours as background.",
      stim="TABE-D-L1"),
    Q(0, TEXT, 2, "Irrelevant sentence", "Which sentence should be removed from the draft?",
      ["Sentence 7", "Sentence 2", "Sentence 5", "Sentence 6"],
      "The waiting room's paint has nothing to do with opening hours. Sentence 5 explains why patients skip checkups, which supports the claim.",
      stim="TABE-D-L1"),
    Q(0, TEXT, 3, "Linking reasons", "Which word or phrase would best begin sentence 5?",
      ["Moreover,", "However,", "In contrast,", "Even so,"],
      "Sentence 5 adds another point to the survey result in sentence 4, so an addition word fits. However, In contrast and Even so all signal a contrast.",
      stim="TABE-D-L1"),
    Q(0, TEXT, 3, "Addressing an objection", "Which sentence would best answer a reader who worries about the cost of evening hours?",
      ["Staff could shift hours instead of adding them.", "Many clinics keep plants in the waiting room.",
       "Evening hours are popular in many large cities.", "The clinic is easy to find."],
      "An argument is stronger when it answers a likely objection. Shifting schedules would provide evening hours without adding staff time.",
      stim="TABE-D-L1"),
    Q(0, TEXT, 2, "Purpose of a sentence", "What is the main purpose of sentence 1?",
      ["To explain why care matters", "To give the first step",
       "To describe the tools needed", "To compare kinds of trees"],
      "Sentence 1 tells the reader why correct planting is worth the effort; the steps begin in sentence 2.",
      stim="TABE-D-L2"),
    Q(0, TEXT, 2, "Transitions in a procedure", "Which word would best begin sentence 4?",
      ["Next,", "Instead,", "Finally,", "Although"],
      "Setting the tree in the hole follows removing the container, and more steps come after, so Next fits. Finally would mean it is the last step.",
      stim="TABE-D-L2"),
    Q(0, TEXT, 3, "Explaining a step", "Which sentence would best follow sentence 6 to explain the mulch step?",
      ["Mulch on the trunk can cause rot.", "Mulch comes in many colors and sizes.",
       "Some trees lose their leaves in fall.", "Garden centers sell mulch in bags."],
      "An explanatory text tells why a step matters, and this sentence explains why mulch is kept off the trunk. The others add facts that do not explain the step.",
      stim="TABE-D-L2"),
    Q(0, TEXT, 2, "Organization", "How is the draft organized?",
      ["As steps in the order they are done", "As a list of reasons for and against",
       "As a comparison of two methods", "As a story about one gardener"],
      "After its opening, the draft gives the planting steps in the order they happen, from digging to watering.",
      stim="TABE-D-L2"),
    Q(0, TEXT, 2, "Topic sentence", "Which sentence would best introduce the report if it were added before sentence 1?",
      ["A bee colony splits its tasks three ways.", "I like to put honey on my toast every day.",
       "Bees can sting when they are scared.", "Some of the flowers in my yard are purple."],
      "The report describes the queen, the workers and the drones, so an opening that names that division introduces the whole topic.",
      stim="TABE-D-L3"),
    Q(0, TEXT, 2, "Sentence combining", "Which is the best way to combine sentences 2 and 3?",
      ["Each colony has one queen, and most other bees are workers.",
       "Each colony has one queen, most of the other bees are workers.",
       "Each colony has one queen and most of the other bees.",
       "Each colony has one queen; and most other bees are workers."],
      "A comma with and correctly joins two complete sentences. A comma alone makes a comma splice, a semicolon is not followed by and, and the version ending with bees has no verb for its second part.",
      stim="TABE-D-L3"),
    Q(0, TEXT, 3, "Domain-specific word", "Which word in the draft is defined for the reader?",
      ["drones", "colony", "queen", "nectar"],
      "Sentence 5 explains that drones are male bees with one job. The other terms are used without a definition.",
      stim="TABE-D-L3"),
    Q(0, TEXT, 3, "Concluding sentence", "Which sentence would best conclude the report?",
      ["Shared labor keeps the colony alive.", "Wasps are also yellow and black.",
       "Honey is sold in many grocery stores.", "I hope to keep bees someday."],
      "A conclusion should sum up the main idea, the division of work in the colony. The other sentences drift to new topics or to the writer.",
      stim="TABE-D-L3"),

    # Conventions (7)
    Q(0, CONV, 1, "Subject-verb agreement",
      "Read the sentence.\n\n\"The box of tools ___ in the truck.\"\n\nWhich word correctly fills the blank?",
      ["is", "are", "were", "be"],
      "The subject is box, which is singular, so the verb is is. Tools is part of the phrase of tools.",
      basics="subjectVerb"),
    Q(0, CONV, 2, "Pronoun case",
      "Read the sentence.\n\n\"Ana and ___ worked late to finish the order.\"\n\nWhich word correctly fills the blank?",
      ["I", "me", "myself", "mine"],
      "The pronoun is part of the subject, the people who worked, so it is the subject pronoun I. Test it alone: \"I worked late,\" not \"me worked late.\"",
      basics="pronounCase"),
    Q(0, CONV, 2, "Run-on sentences",
      "Read the sentence.\n\n\"The store opens at nine the doors are locked until then.\"\n\nWhich revision is correct?",
      ["nine. The doors", "nine, the doors", "nine the, doors", "nine and, the doors"],
      "This is a run-on: two complete sentences with nothing between them. A period after nine makes two sentences. A comma alone would be a comma splice, and the other commas are in the wrong place.",
      basics="commaSplices"),
    Q(0, CONV, 2, "Verb tense consistency",
      "Read the sentence.\n\n\"She opened the file, read the notes and ___ the report.\"\n\nWhich verb correctly fills the blank?",
      ["signed", "signs", "will sign", "is signing"],
      "Opened and read are past tense, so the last verb in the series stays in the past: signed.",
      basics="verbTense"),
    Q(0, CONV, 2, "Commonly confused words",
      "Read the sentence.\n\n\"The workers left ___ jackets in the break room.\"\n\nWhich word correctly fills the blank?",
      ["their", "there", "they're", "theirs"],
      "Their shows possession: the jackets belong to the workers. There is a place and they're means they are.",
      basics="commonlyConfused"),
    Q(0, CONV, 2, "Apostrophes in contractions",
      "Read the sentence.\n\n\"We ___ finish the order until the parts arrive.\"\n\nWhich word correctly fills the blank?",
      ["can't", "cant", "ca'nt", "can'not"],
      "Can't is the contraction of cannot, with the apostrophe where the letters were left out.",
      basics="apostrophes"),
    Q(0, CONV, 2, "Spelling", "Which word is spelled correctly?",
      ["necessary", "neccessary", "necesary", "neccesary"],
      "Necessary has one c and two s's."),

    # Knowledge of Language and Vocabulary (5)
    Q(0, KNOW, 2, "Removing redundancy",
      "Read the sentence.\n\n\"Please return back the form by Friday.\"\n\nWhich revision removes the extra word?",
      ["Please return the form by Friday.", "Please return back by Friday.",
       "Please return the form back to us.", "Please back the form by Friday."],
      "Return already means bring back, so back repeats the idea."),
    Q(0, KNOW, 2, "Context clues",
      "Read the sentence.\n\n\"After the long hike, the thirsty hikers were eager to replenish their water bottles at the spring.\"\n\nWhat does replenish mean?",
      ["Fill again", "Throw away", "Clean out", "Close tightly"],
      "Thirsty hikers at a spring want more water, so replenish means to fill again."),
    Q(0, KNOW, 2, "Suffixes", "The suffix -less means \"without.\" What does careless mean?",
      ["Without care", "Full of care", "Able to care", "Caring again"],
      "Care plus -less means without care. Full of care would be careful."),
    Q(0, KNOW, 3, "Connotation",
      "Which word has the most positive meaning for describing someone who saves money?",
      ["thrifty", "stingy", "cheap", "tight-fisted"],
      "Thrifty suggests wise use of money. Stingy, cheap and tight-fisted suggest being unwilling to spend or share."),
    Q(0, KNOW, 2, "Varying sentences",
      "Read the sentences.\n\n\"The team met. The team made a plan. The team started work.\"\n\nWhich revision combines them most smoothly?",
      ["The team met, planned and started work.", "The team met, the team made a plan and worked.",
       "The team, the plan, the work.", "Met, planned and started, the team."],
      "Joining the three verbs with one subject removes the repetition and keeps a complete sentence."),
]
