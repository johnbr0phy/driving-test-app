# CBEST Reading. Original passages, tables, book excerpts and items, written from the
# CBEST Test Specifications (Reading): Critical Analysis and Evaluation (about 40%) and
# Comprehension and Research Skills (about 60%).
# Per test (25): 10 critical, 11 comprehension, 4 research.
# Drill only: 10 critical, 9 comprehension, 16 research.

STIMULI = [
    # ---------------- Practice Test 1 ----------------
    {"id": "CBEST-T1-R1", "title": "Waiting for an Answer", "text": (
        "In most classrooms, a teacher who asks a question waits about one second before calling on a student or "
        "answering it herself. Researchers who timed these pauses in the 1970s were surprised by how short they were, "
        "and even more surprised by what happened when teachers were coached to stretch them to three seconds or more.\n\n"
        "With longer pauses, students gave longer answers. More students volunteered, including some who rarely spoke. "
        "Answers were more likely to include a reason or an example, and students began responding to one another "
        "instead of only to the teacher. The questions themselves did not change; only the silence after them did.\n\n"
        "Why should a few seconds matter so much? A question that asks students to explain or compare takes time to "
        "think through. When the teacher moves on after a single beat, the only students who can keep up are the ones "
        "who already knew the answer, and everyone else learns that it is safe to wait to be rescued.\n\n"
        "Extending wait time is harder than it sounds. Three seconds of classroom silence can feel endless, and many "
        "teachers fill it out of habit. Some count silently; others tell the class in advance that no one will be "
        "called on until everyone has had time to think.\n\n"
        "Wait time is not a cure for every problem. It does little for a question that has a one-word answer, and it "
        "cannot replace a well-planned lesson. But few changes cost so little, and few are so easy to try tomorrow "
        "morning.")},
    {"id": "CBEST-T1-R2", "title": "The Monarch's Long Road", "text": (
        "Each fall, monarch butterflies from eastern North America fly as far as 3,000 miles to a few mountain forests "
        "in central Mexico. No single butterfly makes the round trip. The monarchs that fly south in autumn spend the "
        "winter clustered on fir trees, then start north in spring. They lay eggs on milkweed in the southern United "
        "States and die. Their offspring continue north, and it takes several generations to reach Canada by summer. "
        "The generation born at the end of summer is different: it delays breeding, stores fat and makes the whole "
        "journey south.\n\n"
        "Because monarch caterpillars eat only milkweed, the butterflies depend on that plant along the entire route. "
        "Where milkweed is cleared from roadsides and fields, fewer caterpillars survive to continue the journey.")},
    {"id": "CBEST-T1-R3", "title": "A Letter Home", "text": (
        "Dear Families,\n\n"
        "Beginning Monday, March 2, Lincoln Elementary will open its doors at 7:45 a.m. instead of 8:00 a.m. Breakfast "
        "will be served in the cafeteria from 7:45 to 8:10, and classes will start at 8:15 as they do now.\n\n"
        "We are making this change because many of you told us in our winter survey that the 8:00 opening did not fit "
        "your work schedules. Opening earlier also gives every student who wants breakfast enough time to eat before "
        "class. However, the front office will still open at 8:00, so please call after that time to report an "
        "absence.\n\n"
        "Thank you for your patience as we adjust. If you have questions, please contact the office.\n\n"
        "Sincerely,\n\nMs. Ortega, Principal")},
    {"id": "CBEST-T1-R4", "title": "Two Views on Homework in the Early Grades", "text": (
        "**Passage A**\n\n"
        "Homework in kindergarten through second grade should be limited to reading with a family member. Young "
        "children gain little from worksheets at the kitchen table, and long assignments mostly teach them to dislike "
        "school. Twenty minutes with a book does more good than an hour of drills.\n\n"
        "**Passage B**\n\n"
        "A small amount of practice at home helps young students remember what they learned that day. Five or ten "
        "minutes of math facts or spelling words also shows parents what their child is studying. The key is to keep "
        "assignments short; the goal is a habit, not a burden.")},
    {"id": "CBEST-T1-TOC", "title": "From a book's table of contents: Growing a School Garden", "text": (
        "| Chapter | Title | Page |\n|---|---|---|\n"
        "| 1 | Why Garden at School? | 1 |\n"
        "| 2 | Choosing a Site: Sun, Water and Access | 9 |\n"
        "| 3 | Building Raised Beds | 21 |\n"
        "| 4 | Soil, Compost and Mulch | 34 |\n"
        "| 5 | What to Plant in Each Season | 47 |\n"
        "| 6 | Lessons in the Garden: Science and Math | 63 |\n"
        "| 7 | Keeping the Garden Going Over Summer | 80 |\n"
        "| 8 | Funding and Community Partners | 91 |")},
    {"id": "CBEST-T1-TBL", "title": "Visits to the Riverside Branch Library", "text": (
        "| Month | Children's room | Adult reading room | Computer lab |\n|---|---|---|---|\n"
        "| January | 820 | 1,140 | 610 |\n"
        "| February | 760 | 1,050 | 640 |\n"
        "| March | 940 | 1,090 | 700 |\n"
        "| April | 1,210 | 1,020 | 690 |")},

    # ---------------- Practice Test 2 ----------------
    {"id": "CBEST-T2-R1", "title": "Spacing It Out", "text": (
        "Most students study the way they were taught to: in one long session the night before a test. The habit "
        "makes sense on the surface. The material is fresh, and by the end of the evening it feels familiar. But "
        "feeling familiar with something is not the same as being able to recall it a week later.\n\n"
        "A large body of memory research points to a different approach. When the same amount of study time is "
        "divided into shorter sessions spread over several days, people remember far more of it later. The effect, "
        "called spacing, has been found with vocabulary, history facts, math procedures and even motor skills.\n\n"
        "One explanation is that a little forgetting helps. When a student returns to a topic after a gap, she has to "
        "work to bring it back to mind, and that effort strengthens the memory. Cramming skips the effort, because "
        "nothing has had time to fade.\n\n"
        "Spacing has a cost: it feels harder. Students who space their study often believe, wrongly, that they are "
        "learning less, simply because each session involves more struggle. Teachers can help by building review of "
        "older material into homework and quizzes, so that spacing happens without anyone having to choose it.\n\n"
        "None of this means that a review the night before a test is useless. It means that the night before should "
        "be the last of several sessions, not the only one.")},
    {"id": "CBEST-T2-R2", "title": "The Dust Bowl", "text": (
        "In the 1920s, farmers on the southern Great Plains plowed up millions of acres of native grassland to plant "
        "wheat. Prices were high and rain was plentiful, so the gamble paid. Then, in the early 1930s, a long drought "
        "set in. With the deep-rooted grasses gone, nothing held the dry soil in place. Strong winds lifted it into "
        "enormous clouds of dust, some of which drifted as far as the Atlantic coast.\n\n"
        "Thousands of families lost their farms and moved west in search of work. In response, the federal government "
        "created the Soil Conservation Service in 1935. It paid farmers to adopt methods such as planting rows of trees "
        "as windbreaks and plowing along the curves of the land rather than in straight lines.")},
    {"id": "CBEST-T2-R3", "title": "Notice to Residents of Maple Avenue", "text": (
        "The City Water Department will replace the water main under Maple Avenue between 3rd and 6th Streets.\n\n"
        "Work will begin on June 8. First, crews will mark the location of existing pipes and lines. Next, they will "
        "dig a trench and install the new main one block at a time. Finally, each home will be connected to the new "
        "main and the street will be repaved.\n\n"
        "During connection work, water service to each home will be shut off for up to four hours. Residents will "
        "receive a door notice at least 48 hours before their service is interrupted. Street parking will not be "
        "available on the block where crews are working. The project is expected to be finished by the end of "
        "August, weather permitting.\n\n"
        "Questions may be directed to the Water Department's project line.")},
    {"id": "CBEST-T2-R4", "title": "Two Views on Year-Round School Calendars", "text": (
        "**Passage A**\n\n"
        "A year-round calendar replaces the long summer break with several shorter breaks. Students forget less over "
        "a three-week break than over a ten-week one, so teachers spend less of each fall reteaching last year's "
        "lessons.\n\n"
        "**Passage B**\n\n"
        "Studies of year-round calendars have found only small differences in achievement, and the differences are not "
        "consistent from one district to the next. Meanwhile, families with children in different schools can end up "
        "with vacations that never line up.")},
    {"id": "CBEST-T2-IDX", "title": "From the index of a book: Hands-On Science for Grades 3 to 5", "text": (
        "Batteries, 44-47; safe disposal of, 47\n\n"
        "Circuits: parallel, 52-54; series, 48-51; switches in, 55\n\n"
        "Clouds, 112-115. *See also* Weather\n\n"
        "Magnets, 58-63; and compasses, 62\n\n"
        "Plants: growth experiments, 88-93; seeds, 84-87\n\n"
        "Rain gauge, building a, 118-119\n\n"
        "Weather: daily log, 116; instruments, 117-121")},
    {"id": "CBEST-T2-SURVEY", "title": "How Students at Oak Hill Middle School Get to School", "text": (
        "A survey asked every student at Oak Hill how they usually travel to school. The results, shown as a bar graph "
        "in the school newsletter, were:\n\n"
        "| Way of travel | Grade 6 | Grade 7 | Grade 8 |\n|---|---|---|---|\n"
        "| Walk | 40 | 52 | 61 |\n"
        "| Bicycle | 18 | 25 | 30 |\n"
        "| School bus | 95 | 80 | 72 |\n"
        "| Family car | 87 | 73 | 57 |")},

    # ---------------- Drill only ----------------
    {"id": "CBEST-D-R1", "title": "Hunting in the Dark", "text": (
        "A barn owl can catch a mouse in complete darkness. For years, scientists assumed the owl must see better in the "
        "dark than other birds, and its eyes are indeed sensitive. But experiments in rooms with no light at all showed "
        "that the owl's hearing does most of the work.\n\n"
        "The owl's face is shaped like a shallow dish of stiff feathers that collects sound and funnels it toward the "
        "ears. The ears themselves are set at slightly different heights on the head, so a rustle below the bird reaches "
        "one ear a tiny fraction of a second before the other. From that difference the owl judges not only the "
        "direction of a sound but also how far below it the source lies.\n\n"
        "The owl's wing feathers have soft, comb-like edges that muffle the noise of flight. As a result, the owl can "
        "hear its prey while flying, and the prey cannot hear the owl coming.")},
    {"id": "CBEST-D-R2", "title": "Opinion: Let's Keep Teaching Cursive", "text": (
        "Some schools have dropped cursive handwriting to make room for keyboarding. That is a shortsighted trade.\n\n"
        "Every student needs to type, but typing can be learned quickly at almost any age. Cursive, on the other hand, "
        "is rarely picked up later if it is not taught in school. A student who never learns it cannot read a "
        "grandparent's letters or many of the historical documents kept in archives.\n\n"
        "Supporters of keyboarding point out that adults seldom write by hand at work. True enough. But we do not "
        "teach children only the skills they will use at a job. We teach them to read music, to draw maps and to "
        "recite poems, because these things connect them to the world around them. Surely an hour a week for cursive "
        "is a small price to pay. Any school board that cares about its students will restore it.")},
    {"id": "CBEST-D-IDX", "title": "From the index of a book: The Classroom Handbook", "text": (
        "Absences: excused, 14; recording, 15-16; unexcused, 17\n\n"
        "Field trips: permission slips, 72-73; planning, 70-71; transportation, 74\n\n"
        "Grading: late work, 41; report cards, 44-46; rubrics, 38-40\n\n"
        "Parent conferences, 50-55; scheduling, 51; with interpreters, 54\n\n"
        "Safety drills: earthquake, 88; fire, 86-87; lockdown, 89-90\n\n"
        "Substitutes, preparing for, 60-63. *See also* Lesson plans")},
    {"id": "CBEST-D-TOC", "title": "From a book's table of contents: A Field Guide to Backyard Birds", "text": (
        "| Part | Title | Page |\n|---|---|---|\n"
        "| One | How to Watch Birds | 1 |\n"
        "| Two | Identifying Birds by Shape and Color | 15 |\n"
        "| Three | Identifying Birds by Song | 42 |\n"
        "| Four | Feeders, Baths and Nest Boxes | 60 |\n"
        "| Five | Birds Through the Seasons | 78 |\n"
        "| Six | Keeping a Bird Journal | 96 |\n"
        "| Appendix | Checklist of 120 Common Species | 104 |")},
    {"id": "CBEST-D-TBL", "title": "Average Daily Water Use in One Household", "text": (
        "| Use | Gallons per day | Share of total |\n|---|---|---|\n"
        "| Toilet | 33 | 24% |\n"
        "| Shower | 27 | 20% |\n"
        "| Faucets | 26 | 19% |\n"
        "| Clothes washer | 22 | 16% |\n"
        "| Leaks | 17 | 12% |\n"
        "| Other | 12 | 9% |")},
    {"id": "CBEST-D-GRAPH", "title": "Enrollment at Valley Community College", "text": (
        "A line graph in the college's annual report shows fall enrollment over six years:\n\n"
        "| Year | Full-time students | Part-time students |\n|---|---|---|\n"
        "| 2020 | 4,200 | 5,100 |\n"
        "| 2021 | 4,000 | 5,600 |\n"
        "| 2022 | 3,900 | 6,000 |\n"
        "| 2023 | 3,950 | 6,300 |\n"
        "| 2024 | 4,100 | 6,350 |\n"
        "| 2025 | 4,300 | 6,200 |")},
]

ITEMS = [
    # ================= Practice Test 1 =================
    # R1 Waiting for an Answer: comp 3, crit 3
    Q(1, COMP, 1, "Main idea",
      "Which statement best expresses the main idea of the passage?",
      ["Longer pauses after questions help students", "Teachers ask too many questions in class",
       "Students should answer only when they are called on", "Research from the 1970s is out of date"],
      "The passage reports what happened when pauses grew to three seconds and ends by urging teachers to try it. The other choices are either not claimed or contradicted.",
      stim="CBEST-T1-R1", basics="mainIdea"),
    Q(1, COMP, 1, "Detail",
      "According to the passage, which change was observed when teachers waited longer?",
      ["Students responded to one another", "Teachers asked fewer questions",
       "Questions became easier to answer", "Students needed more reminders"],
      "The second paragraph says students began responding to one another instead of only to the teacher. It also says the questions themselves did not change.",
      stim="CBEST-T1-R1", basics="findingDetail"),
    Q(1, COMP, 2, "Word in context",
      "In the third paragraph, the phrase \"wait to be rescued\" most nearly means:",
      ["wait for the answer to be given", "wait for help from a classmate",
       "wait for the lesson to be repeated", "wait for the bell to end class"],
      "The paragraph says that when the teacher moves on quickly, students who did not know the answer learn they can simply wait; someone else will supply it.",
      stim="CBEST-T1-R1", basics="wordsInContext"),
    Q(1, CRIT, 2, "Author's attitude",
      "Which word best describes the author's attitude toward extending wait time?",
      ["Supportive but realistic", "Doubtful and critical", "Neutral and detached", "Enthusiastic and uncritical"],
      "The author recommends trying it (\"few changes cost so little\") but also admits its limits (\"not a cure for every problem\"), so the support is tempered, not uncritical.",
      stim="CBEST-T1-R1", basics="toneWords"),
    Q(1, CRIT, 2, "Strengthen an argument",
      "Which finding, if true, would most strengthen the author's argument?",
      ["Scores rose in classes that used longer pauses", "Most teachers prefer short pauses",
       "Students like questions with one-word answers", "Wait time was first studied in science classes"],
      "The author argues that a longer pause improves learning. Evidence that results improved where pauses were longer supports that claim; teacher preference and the history of the research do not.",
      stim="CBEST-T1-R1", basics="claimSupport"),
    Q(1, CRIT, 3, "Assumption",
      "The author's explanation in the third paragraph assumes that:",
      ["thinking through a hard question takes time", "most students already know the answers",
       "teachers want students to stay silent", "one-word questions teach students the most"],
      "The paragraph says questions that ask students to explain or compare take time to think through, so a one-beat pause leaves most students behind. That reasoning depends on thinking taking time.",
      stim="CBEST-T1-R1"),

    # R2 Monarchs: comp 2, crit 2
    Q(1, COMP, 1, "Sequence",
      "According to the passage, what happens right after the wintering monarchs start north in spring?",
      ["They lay eggs on milkweed and die", "They cluster on fir trees",
       "They store fat for the trip south", "They fly directly to Canada"],
      "The passage says the monarchs start north, lay eggs on milkweed in the southern United States and die; their offspring continue the trip.",
      stim="CBEST-T1-R2", basics="sequenceEvents"),
    Q(1, COMP, 2, "Inference",
      "It can be inferred from the passage that the monarchs reaching Canada in summer:",
      ["never visited the Mexican forests", "flew there directly from Mexico",
       "were born in the previous fall", "make the trip south that same year"],
      "It takes several generations to reach Canada, so the summer arrivals are descendants of the butterflies that wintered in Mexico, not the same individuals.",
      stim="CBEST-T1-R2", basics="inference"),
    Q(1, CRIT, 2, "Predict an outcome",
      "Based on the passage, what would most likely happen if milkweed were removed along much of the route?",
      ["Fewer monarchs would complete the journey", "Monarchs would switch to fir trees",
       "Monarchs would stop flying south to Mexico", "More monarchs would reach Canada"],
      "Caterpillars eat only milkweed, and the passage says fewer survive where it is cleared. Less milkweed would mean fewer butterflies continuing the migration.",
      stim="CBEST-T1-R2"),
    Q(1, CRIT, 3, "Relevant information",
      "Which additional fact would be most relevant to the point made in the second paragraph?",
      ["How much milkweed grows along the route", "How long the fir trees in Mexico live",
       "How many colors a monarch's wings can show", "How fast a monarch beats its wings"],
      "The second paragraph is about the monarchs' dependence on milkweed along the route. Information on how much milkweed is available bears directly on that point.",
      stim="CBEST-T1-R2"),

    # R3 Letter: comp 3, crit 1
    Q(1, COMP, 1, "Purpose",
      "What is the main purpose of the letter?",
      ["To announce an earlier opening time", "To report the winter survey results",
       "To change the time that classes begin", "To ask families to report absences"],
      "The letter tells families the doors will open at 7:45 starting March 2. Class start time stays at 8:15, and the survey is mentioned only as the reason.",
      stim="CBEST-T1-R3", basics="mainIdea"),
    Q(1, COMP, 1, "Detail",
      "According to the letter, when should a family call to report an absence?",
      ["After 8:00 a.m.", "Before 7:45 a.m.", "Between 7:45 and 8:10 a.m.", "After classes start at 8:15"],
      "The letter says the front office will still open at 8:00, so families should call after that time.",
      stim="CBEST-T1-R3", basics="findingDetail"),
    Q(1, COMP, 2, "Transition words",
      "In the paragraph that begins \"We are making this change,\" the word \"However\" signals that the next sentence:",
      ["limits the change just described", "gives an example of the change",
       "states the result of the change", "repeats the reason for the change"],
      "\"However\" introduces a contrast: the doors open earlier, but the office does not, so the change has a limit.",
      stim="CBEST-T1-R3"),
    Q(1, CRIT, 1, "Audience",
      "The letter is written mainly for:",
      ["parents of Lincoln students", "teachers and staff at Lincoln", "cafeteria workers", "school board members"],
      "It opens \"Dear Families\" and refers to work schedules and reporting absences, which are concerns of students' families.",
      stim="CBEST-T1-R3"),

    # R4 Two passages: crit 2, comp 1
    Q(1, CRIT, 2, "Compare viewpoints",
      "The authors of the two passages disagree mainly about whether young students should:",
      ["do short math or spelling drills at home", "read with a family member",
       "be given any homework that takes an hour", "learn math facts in school"],
      "Passage A would limit homework to reading; Passage B supports a few minutes of math facts or spelling practice. Neither defends hour-long homework.",
      stim="CBEST-T1-R4"),
    Q(1, CRIT, 3, "Common ground",
      "With which statement would both authors most likely agree?",
      ["Long homework assignments are a mistake", "Worksheets are the best homework",
       "Young children should get no homework at all", "Parents should not see homework"],
      "Passage A says long assignments teach children to dislike school; Passage B says to keep assignments short, \"not a burden.\" Both oppose long assignments.",
      stim="CBEST-T1-R4"),
    Q(1, COMP, 2, "Paraphrase",
      "Which statement best restates the main point of Passage A?",
      ["Reading at home helps more than drills", "Worksheets teach math better than books",
       "Homework should be longer in second grade", "Children should read alone each night"],
      "Passage A says twenty minutes with a book does more good than an hour of drills and that homework should be reading with a family member, not reading alone.",
      stim="CBEST-T1-R4"),

    # Stand-alone: crit 2, comp 2
    Q(1, CRIT, 1, "Fact and opinion",
      "Read the sentences from a district report:\n\n(1) The district opened two new elementary schools in 2024. (2) Each school has room for about 600 students. (3) The new buildings are the most attractive in the county. (4) Both schools have a library and a gym.\n\nWhich sentence states an opinion rather than a fact?",
      ["Sentence 3", "Sentence 1", "Sentence 2", "Sentence 4"],
      "\"The most attractive in the county\" is a judgment that cannot be checked. The opening date, capacity and facilities can all be verified.",
      basics="factOpinion"),
    Q(1, CRIT, 3, "Weaken an argument",
      "\"Our school should switch to tablets instead of printed textbooks. Tablets will save money, because printed textbooks must be replaced every few years.\"\n\nWhich statement, if true, most weakens this argument?",
      ["Tablets must also be replaced every few years", "Many students already own tablets",
       "Printed textbooks weigh far more than tablets", "Tablets can hold several books at once"],
      "The argument rests on tablets avoiding the cost of regular replacement. If tablets also need replacing just as often, that cost saving disappears.",
      basics="claimSupport"),
    Q(1, COMP, 2, "Colloquial language",
      "\"After the third fire drill in one week, the students were running out of steam.\"\n\nAs used here, \"running out of steam\" means:",
      ["losing energy", "getting too warm", "leaving in a hurry", "making more noise"],
      "The expression is colloquial for becoming tired or losing enthusiasm; it has nothing literal to do with heat or steam."),
    Q(1, COMP, 2, "Word parts",
      "The prefix \"pre-\" means before, and the root \"dict\" means to say or speak. Using these clues, a \"prediction\" is:",
      ["a statement made before an event", "a word spoken too quietly",
       "a rule that must be followed", "a reason given after an event happens"],
      "Before plus say gives something said before it happens, which is what a prediction is.",
      basics="wordsInContext"),

    # Research: TOC 2, table 2
    Q(1, RES, 1, "Table of contents",
      "A teacher wants ideas for using the garden to teach measurement. Which chapter should she read first?",
      ["Chapter 6", "Chapter 3", "Chapter 5", "Chapter 1"],
      "Chapter 6, \"Lessons in the Garden: Science and Math,\" is about teaching with the garden, and measurement is math.",
      stim="CBEST-T1-TOC"),
    Q(1, RES, 2, "Table of contents",
      "On which pages would a reader most likely find advice on finding a sunny spot for the garden?",
      ["Pages 9 to 20", "Pages 21 to 33", "Pages 1 to 8", "Pages 47 to 62"],
      "Chapter 2, \"Choosing a Site: Sun, Water and Access,\" begins on page 9, and Chapter 3 begins on page 21, so the chapter runs from page 9 to 20.",
      stim="CBEST-T1-TOC"),
    Q(1, RES, 2, "Table conclusion",
      "Which conclusion is best supported by the table?",
      ["Children's room visits rose sharply in April", "The computer lab was busiest in January of all months",
       "Adult visits rose every month", "Total visits fell from March to April"],
      "Children's room visits climbed from 940 to 1,210 in April. Lab visits peaked in March, adult visits fell in February and April, and the April total (2,920) is higher than March's (2,730).",
      stim="CBEST-T1-TBL"),
    Q(1, RES, 2, "Table comparison",
      "In which month did the children's room have more visits than the adult reading room?",
      ["April", "March", "February", "January"],
      "Only in April (1,210 to 1,020) did the children's room lead. In every other month adult visits were higher.",
      stim="CBEST-T1-TBL"),

    # ================= Practice Test 2 =================
    # R1 Spacing: comp 3, crit 3
    Q(2, COMP, 1, "Main idea",
      "Which statement best expresses the main idea of the passage?",
      ["Study spread over several days is remembered better", "Cramming works for history but not math",
       "Studying the night before a test is always useless", "Students learn most when lessons feel easy"],
      "The passage presents research that spaced study improves later recall and ends by saying the night before should be the last of several sessions. It says outright that a final review is not useless.",
      stim="CBEST-T2-R1", basics="mainIdea"),
    Q(2, COMP, 2, "Implied relationship",
      "According to the passage, why does a little forgetting help memory?",
      ["Recalling a fading topic takes effort", "Forgetting makes room for new facts",
       "Students study more after they forget", "Short sessions are easier to schedule"],
      "The third paragraph says returning after a gap forces the student to work to bring the topic back, and that effort strengthens the memory.",
      stim="CBEST-T2-R1", basics="inference"),
    Q(2, COMP, 2, "Word in context",
      "In the first paragraph, \"familiar\" is contrasted with:",
      ["being able to recall something later", "being able to study for a long time without breaks",
       "understanding the teacher's lesson", "liking the subject being studied"],
      "The paragraph says feeling familiar with something \"is not the same as being able to recall it a week later.\"",
      stim="CBEST-T2-R1", basics="wordsInContext"),
    Q(2, CRIT, 2, "Author's viewpoint",
      "According to the passage, students who space their study often misjudge:",
      ["how much they are learning", "how long a test will take",
       "how hard their teacher grades", "how many topics they must cover"],
      "The fourth paragraph says spacing feels harder, so these students believe, wrongly, that they are learning less.",
      stim="CBEST-T2-R1"),
    Q(2, CRIT, 3, "Challenge a statement",
      "A reader wants to test the claim that spacing works \"even\" for motor skills. Which evidence would be most useful?",
      ["Results of a typing study using spaced practice", "A survey of students' favorite times of day to study",
       "The history of memory research", "A list of words students found hard"],
      "Typing is a motor skill, so a study comparing spaced and massed typing practice would directly test the claim. The other choices say nothing about motor skills.",
      stim="CBEST-T2-R1", basics="claimSupport"),
    Q(2, CRIT, 2, "Author's purpose",
      "The author mentions homework and quizzes in the fourth paragraph mainly to:",
      ["suggest how teachers can build in spacing", "argue that quizzes should be graded",
       "explain why students often dislike their homework", "show that cramming is still common"],
      "The sentence says teachers can build review into homework and quizzes \"so that spacing happens without anyone having to choose it.\"",
      stim="CBEST-T2-R1", basics="authorPurpose"),

    # R2 Dust Bowl: comp 2, crit 2
    Q(2, COMP, 1, "Cause and effect",
      "According to the passage, why did the dry soil blow away?",
      ["Its grasses had been plowed up", "Wheat prices fell in the 1930s",
       "Farmers planted too many trees", "Rain washed the topsoil away"],
      "The passage says that with the deep-rooted grasses gone, nothing held the dry soil in place when the winds came.",
      stim="CBEST-T2-R2", basics="findingDetail"),
    Q(2, COMP, 2, "Outline",
      "Which outline best fits the order of ideas in the passage?",
      ["Plowing, drought, dust storms, response", "Drought, plowing, response, dust storms",
       "Response, dust storms, drought, plowing", "Dust storms, plowing, response, drought"],
      "The passage moves from plowing in the 1920s, to the drought of the early 1930s, to the dust clouds, to the government's response in 1935.",
      stim="CBEST-T2-R2", basics="sequenceEvents"),
    Q(2, CRIT, 2, "Supporting details",
      "Which detail from the passage best supports the idea that the dust storms were very large?",
      ["Dust reached the Atlantic coast", "Prices for wheat were high",
       "Farmers plowed along curves", "Families moved west for work"],
      "Dust that traveled across the country to the Atlantic coast shows how big the storms were. The other details concern prices, methods and migration.",
      stim="CBEST-T2-R2"),
    Q(2, CRIT, 3, "Logical assumption",
      "The government's plan described in the last sentence assumes that windbreaks and curved plowing would:",
      ["help keep soil from blowing away", "raise the price of wheat",
       "bring more rain to the plains", "let farmers plant more acres"],
      "Both methods were adopted in response to soil blowing away, so the plan assumes they would slow wind and hold soil.",
      stim="CBEST-T2-R2"),

    # R3 Notice: comp 3, crit 1
    Q(2, COMP, 1, "Sequence",
      "According to the notice, what will crews do right after marking existing pipes and lines?",
      ["Dig a trench", "Repave the street", "Connect each home", "Shut off water service"],
      "The notice lists the steps in order: mark the lines, then dig a trench and install the main, then connect homes and repave.",
      stim="CBEST-T2-R3", basics="sequenceEvents"),
    Q(2, COMP, 1, "Detail",
      "How much warning will a resident receive before water service is shut off?",
      ["At least 48 hours", "At least 4 hours", "One full week", "No warning is given"],
      "The notice says residents will receive a door notice at least 48 hours before service is interrupted. Four hours is the length of the shutoff.",
      stim="CBEST-T2-R3", basics="findingDetail"),
    Q(2, COMP, 2, "Conclusion",
      "Which conclusion can be drawn from the notice?",
      ["The finish date could change with weather", "Every home will lose water for a day",
       "Parking is banned on all of Maple Avenue all summer", "The work will be done one home at a time"],
      "The project is \"expected to be finished by the end of August, weather permitting,\" so bad weather could delay it. Shutoffs are up to four hours, and parking is closed only on the block being worked.",
      stim="CBEST-T2-R3"),
    Q(2, CRIT, 2, "Audience",
      "Which reader would find the notice most useful?",
      ["A family living on Maple Avenue", "A city water engineer",
       "A driver passing through town", "A student studying pipe materials"],
      "The notice tells residents when their water will be off and where they cannot park, information meant for people who live on the street.",
      stim="CBEST-T2-R3"),

    # R4 Two passages: crit 2, comp 1
    Q(2, CRIT, 2, "Compare viewpoints",
      "How does the author of Passage B respond to the claim in Passage A?",
      ["By noting the gains are small and uneven", "By agreeing that students forget less",
       "By saying summer break should be made longer", "By describing teachers' views"],
      "Passage A says shorter breaks mean less forgetting; Passage B answers that studies show only small, inconsistent differences in achievement.",
      stim="CBEST-T2-R4"),
    Q(2, CRIT, 3, "Relevant evidence",
      "Which information would be most relevant to settling the disagreement between the two passages?",
      ["Test scores before and after a district switched calendars", "The cost of running summer camps in each district",
       "The number of holidays in each kind of calendar", "How families plan their summer vacations"],
      "The authors disagree about whether year-round calendars improve learning. Achievement data from a district that changed calendars bears directly on that question.",
      stim="CBEST-T2-R4"),
    Q(2, COMP, 2, "Summary",
      "Which statement best summarizes Passage B?",
      ["Results are mixed; schedules can clash", "Year-round schools raise test scores",
       "Long breaks cause students to forget", "Most families prefer year-round school calendars"],
      "Passage B says achievement differences are small and inconsistent and that siblings' vacations may not line up.",
      stim="CBEST-T2-R4"),

    # Stand-alone: crit 2, comp 2
    Q(2, CRIT, 2, "Persuasive technique",
      "\"Every successful parent in our town has already signed up for the reading challenge. Don't be the one family left out!\"\n\nWhich persuasive technique does this statement mainly use?",
      ["An appeal to fit in with others", "A comparison of costs and benefits",
       "Statistics from a reliable study", "A quotation from an expert"],
      "The statement pressures readers by claiming everyone else has joined and warning against being left out. It offers no data, costs or expert."),
    Q(2, CRIT, 3, "Inappropriate tone",
      "A school newsletter for families contains this sentence: \"Folks who can't be bothered to sign the permission slip will have kids stuck in the library during the trip.\"\n\nWhy is the tone of this sentence inappropriate for its audience?",
      ["It sounds scornful toward parents", "It uses too many technical terms",
       "It is too formal for a newsletter", "It gives no date for the trip"],
      "\"Can't be bothered\" and \"stuck\" sound scornful in a message meant to inform families politely. The problem is tone, not formality or jargon.",
      basics="toneWords"),
    Q(2, COMP, 2, "Figurative language",
      "\"The new principal's first month was a whirlwind of meetings, visits and phone calls.\"\n\nThe word \"whirlwind\" suggests that the month was:",
      ["very busy and fast-paced", "stormy and very unpleasant", "quiet and well planned", "short and uneventful"],
      "A whirlwind spins quickly; the metaphor describes a rush of activity, not bad weather or conflict."),
    Q(2, COMP, 2, "Multiple meanings",
      "\"The coach asked the team to table the discussion until after the game.\"\n\nIn this sentence, \"table\" means:",
      ["put off", "write down", "start", "end for good"],
      "To table a discussion is to set it aside for later; the phrase \"until after the game\" confirms the meaning.",
      basics="wordsInContext"),

    # Research: index 2, survey 2
    Q(2, RES, 1, "Index",
      "On which page would a reader look for how to get rid of used batteries safely?",
      ["47", "44", "55", "116"],
      "The index lists \"Batteries, 44-47; safe disposal of, 47.\"",
      stim="CBEST-T2-IDX"),
    Q(2, RES, 2, "Index cross-reference",
      "A student reads about clouds on pages 112 to 115 and wants related material. According to the index, where else should she look?",
      ["The entry for weather", "The entry for plants", "The entry for magnets", "The entry for circuits"],
      "The cloud entry says \"See also Weather,\" which points to pages 116 to 121.",
      stim="CBEST-T2-IDX"),
    Q(2, RES, 2, "Graph conclusion",
      "Which conclusion is best supported by the survey?",
      ["Walking rises with each grade", "Most eighth graders ride a bicycle",
       "Bus riders are fewest in Grade 6", "Car travel rises from Grade 6 to Grade 8"],
      "Walkers rise from 40 to 52 to 61. Bus riders are most numerous in Grade 6, and car travel falls across the grades.",
      stim="CBEST-T2-SURVEY"),
    Q(2, RES, 2, "Graph comparison",
      "In Grade 8, which way of travel is the most common?",
      ["School bus", "Walk", "Family car", "Bicycle"],
      "In Grade 8, 72 students ride the bus, more than the 61 who walk, 57 in cars and 30 on bicycles.",
      stim="CBEST-T2-SURVEY"),

    # ================= Drill only =================
    # D1 Owls: comp 3, crit 2
    Q(0, COMP, 1, "Main idea",
      "What is the passage mainly about?",
      ["How barn owls hunt in the dark", "Why barn owls live in barns",
       "How scientists study bird eyesight", "Why mice are active at night"],
      "Each paragraph explains part of how the owl hunts without light: its hearing, its face, its ears and its quiet wings.",
      stim="CBEST-D-R1", basics="mainIdea"),
    Q(0, COMP, 2, "Detail",
      "According to the passage, how does the owl judge how far below it a sound is?",
      ["Its ears are set at different heights", "Its eyes see well in dim light",
       "Its wings are covered in soft feathers", "Its face is shaped like a beak"],
      "Because the ears sit at slightly different heights, a sound reaches one ear first, and from that difference the owl judges direction and height.",
      stim="CBEST-D-R1", basics="findingDetail"),
    Q(0, COMP, 2, "Implied relationship",
      "What is the relationship between the owl's wing feathers and its hunting?",
      ["Quiet flight lets it surprise prey", "Soft feathers help it see at night",
       "Comb-like edges help it carry prey", "Stiff feathers make it fly faster"],
      "Muffled flight means the owl can hear its prey while flying and the prey cannot hear the owl coming.",
      stim="CBEST-D-R1", basics="inference"),
    Q(0, CRIT, 2, "Organization of argument",
      "The author mentions the earlier assumption about the owl's eyesight in order to:",
      ["set up the finding about hearing", "prove that owls have weak eyes",
       "criticize the scientists' methods", "compare owls with other birds"],
      "The first paragraph states the old belief, then reports experiments showing hearing does most of the work. The author even says the eyes are sensitive.",
      stim="CBEST-D-R1", basics="authorPurpose"),
    Q(0, CRIT, 3, "Predict an outcome",
      "Based on the passage, an owl whose facial feathers were trimmed would most likely:",
      ["have more trouble locating prey", "fly more quietly than before",
       "rely less on its hearing", "see better in the dark"],
      "The facial disk collects sound and funnels it to the ears, so losing it would make sounds harder to locate.",
      stim="CBEST-D-R1"),

    # D2 Cursive: comp 2, crit 3
    Q(0, COMP, 1, "Main idea",
      "What is the author's main claim?",
      ["Schools should keep teaching cursive", "Keyboarding should not be taught at all",
       "Adults rarely write by hand", "Archives should be digitized"],
      "The column calls dropping cursive \"a shortsighted trade\" and ends by urging boards to restore it. The author says every student needs to type.",
      stim="CBEST-D-R2", basics="mainIdea"),
    Q(0, COMP, 2, "Transition words",
      "In the second paragraph, the phrase \"on the other hand\" introduces:",
      ["a contrast with typing", "an example of typing",
       "a result of learning typing", "a summary of the argument"],
      "The sentence before says typing can be learned at almost any age; the phrase introduces cursive, which is rarely learned later.",
      stim="CBEST-D-R2"),
    Q(0, CRIT, 2, "Opposing view",
      "Which statement does the author present as the view of people who disagree?",
      ["Adults seldom write by hand at work", "Typing can be learned at any age",
       "Cursive connects children to history", "An hour a week is a small price"],
      "The third paragraph begins \"Supporters of keyboarding point out that adults seldom write by hand at work,\" which the author then answers.",
      stim="CBEST-D-R2"),
    Q(0, CRIT, 3, "Persuasive technique",
      "The last sentence of the passage mainly persuades by:",
      ["implying that opponents do not care", "citing research on handwriting and memory",
       "quoting school board members", "comparing costs of two programs"],
      "\"Any school board that cares about its students will restore it\" suggests that boards who disagree do not care, a loaded appeal rather than evidence.",
      stim="CBEST-D-R2", basics="claimSupport"),
    Q(0, CRIT, 3, "Weaken an argument",
      "Which fact, if true, would most weaken the author's argument about historical documents?",
      ["Most archives offer typed transcriptions", "Many older letters were written in pencil",
       "Typing classes are popular with students", "Some grandparents write in print"],
      "The author says students who cannot read cursive cannot read many archival documents. If typed transcriptions are widely available, that reason loses force.",
      stim="CBEST-D-R2"),

    # Stand-alone: comp 4, crit 5
    Q(0, COMP, 1, "Word parts",
      "The prefix \"mis-\" means wrongly or badly. A student who misreads a question has:",
      ["read it wrongly", "read it again", "read it aloud", "read it quickly"],
      "Mis- plus read means to read wrongly; rereading would be re-.",
      basics="wordsInContext"),
    Q(0, COMP, 2, "Paraphrase",
      "\"Although the bus was late, the field trip began on time because the museum agreed to hold the group's tour slot.\"\n\nWhich statement best restates this sentence?",
      ["The museum held the slot, so the trip was on time", "The bus was on time, but the tour started very late",
       "The trip was late because the museum was busy", "The group missed its tour because of the bus"],
      "The sentence says the trip still started on time despite the late bus, because the museum held the slot."),
    Q(0, COMP, 2, "General and specific",
      "\"Classroom pets can teach children responsibility. Students take turns feeding the class hamster, changing its water and cleaning its cage.\"\n\nWhat is the relationship between the two sentences?",
      ["The second gives examples of the first", "The second contradicts the first",
       "The first explains why the second happens", "The second changes the topic"],
      "The first sentence makes a general claim about responsibility; the second lists specific tasks that show it.",
      basics="inference"),
    Q(0, COMP, 2, "Different interpretations",
      "A sign in a school hallway reads: \"Students must not run in the hall without a pass.\"\n\nWhy could this sign be read in two ways?",
      ["It could ban all running or only some", "It does not say which hall is meant",
       "It does not say who wrote the rule", "It uses the word pass too often"],
      "It could mean running is allowed only for students who have a pass, or that no one may run at all and students in the hall need a pass. One reading bans only some running; the other bans all of it."),
    Q(0, CRIT, 1, "Fact and opinion",
      "Which statement about the city's new park is an opinion?",
      ["It is the best spot in town for a picnic", "It opened to the public in May",
       "It covers about twelve acres", "It has two playgrounds and a duck pond"],
      "\"The best spot in town for a picnic\" is a judgment. The opening month, size and features can be checked.",
      basics="factOpinion"),
    Q(0, CRIT, 2, "Fact and opinion",
      "\"(1) The school day at Hillcrest runs from 8:20 to 2:50. (2) That schedule leaves far too little time for recess. (3) Recess lasts 20 minutes. (4) Lunch lasts 30 minutes.\"\n\nWhich sentence expresses the writer's opinion?",
      ["Sentence 2", "Sentence 1", "Sentence 3", "Sentence 4"],
      "\"Far too little time\" is a judgment about the schedule. The times and lengths can all be verified.",
      basics="factOpinion"),
    Q(0, CRIT, 2, "Logical assumption",
      "\"Students who eat breakfast at school will do better on morning tests, so the district should expand its breakfast program.\"\n\nThis argument assumes that:",
      ["more students will eat if it grows", "breakfast is cheaper at school",
       "morning tests are harder than others", "students dislike school lunch"],
      "Expanding the program helps test scores only if more students actually eat breakfast because of it. Cost and lunch preferences are not part of the reasoning.",
      basics="claimSupport"),
    Q(0, CRIT, 3, "Strengthen an argument",
      "\"Our library should stay open on Saturdays, because many working parents cannot visit during the week.\"\n\nWhich finding would most strengthen this argument?",
      ["Most Saturday visitors are parents who work on weekdays", "The library has a large collection of DVDs and games",
       "The library first opened its doors in 1985", "Few staff members want to work weekend shifts"],
      "If most Saturday visitors are parents who work on weekdays, that supports the claim that working parents rely on Saturday hours. Staffing preferences would weaken it.",
      ),
    Q(0, CRIT, 2, "Inconsistency",
      "\"Our team values every player equally. That is why only the top scorers are allowed to speak at the awards dinner.\"\n\nWhat is the problem with this statement?",
      ["The two sentences conflict", "It gives too many examples",
       "It does not name the team", "It uses technical language"],
      "Claiming to value every player equally does not fit a rule that lets only top scorers speak; the second sentence undercuts the first."),

    # Research: index 4, TOC 4, table 4, graph 4
    Q(0, RES, 1, "Index",
      "A teacher needs to know how to record a student's absence. Which pages should she check?",
      ["15-16", "14", "17", "51"],
      "The index lists \"Absences: ... recording, 15-16.\"",
      stim="CBEST-D-IDX"),
    Q(0, RES, 1, "Index",
      "Under which entry would a reader find information about rubrics?",
      ["Grading", "Absences", "Substitutes", "Field trips"],
      "Rubrics are listed under \"Grading: ... rubrics, 38-40.\"",
      stim="CBEST-D-IDX"),
    Q(0, RES, 2, "Index",
      "A teacher preparing for a parent conference that needs a Spanish interpreter should turn to page:",
      ["54", "51", "50", "60"],
      "The entry reads \"Parent conferences, 50-55; ... with interpreters, 54.\"",
      stim="CBEST-D-IDX"),
    Q(0, RES, 2, "Index cross-reference",
      "The entry for substitutes says \"See also Lesson plans.\" This means that:",
      ["related pages are under that entry", "lesson plans are on pages 60-63",
       "the book has no pages on substitutes", "lesson plans are in a different book"],
      "A \"see also\" note points to another index entry with related information; it does not give that entry's pages.",
      stim="CBEST-D-IDX"),
    Q(0, RES, 1, "Table of contents",
      "A reader wants to build a nest box. In which part should she look?",
      ["Part Four", "Part Two", "Part Five", "Part Six"],
      "Part Four is \"Feeders, Baths and Nest Boxes.\"",
      stim="CBEST-D-TOC"),
    Q(0, RES, 2, "Table of contents",
      "A reader hears an unfamiliar call but cannot see the bird. Which pages are most likely to help?",
      ["42 to 59", "15 to 41", "60 to 77", "96 to 103"],
      "Part Three, \"Identifying Birds by Song,\" starts on page 42 and Part Four starts on page 60.",
      stim="CBEST-D-TOC"),
    Q(0, RES, 2, "Organization",
      "How is the main body of the book organized?",
      ["From watching birds to recording them", "From the rarest birds to the most common",
       "From summer birds to winter birds", "By the region where birds live"],
      "The parts move from how to watch, to identifying, to attracting birds, through the seasons, to keeping a journal.",
      stim="CBEST-D-TOC"),
    Q(0, RES, 2, "Locate information",
      "Where would a reader most likely find a list to check off species she has seen?",
      ["The appendix", "Part One", "Part Two", "Part Six"],
      "The appendix is a \"Checklist of 120 Common Species.\"",
      stim="CBEST-D-TOC"),
    Q(0, RES, 1, "Table detail",
      "According to the table, which use accounts for the largest share of water?",
      ["Toilet", "Shower", "Faucets", "Clothes washer"],
      "The toilet uses 33 gallons a day, 24% of the total, more than any other use.",
      stim="CBEST-D-TBL"),
    Q(0, RES, 2, "Table conclusion",
      "Which conclusion is best supported by the table?",
      ["Leaks waste about an eighth of use", "Showers use more water than toilets",
       "Faucets use the least water of any use", "The household uses about 100 gallons a day"],
      "Leaks are 12% of use, about one eighth. Showers use less than toilets, \"Other\" is the smallest, and the total is 137 gallons.",
      stim="CBEST-D-TBL"),
    Q(0, RES, 2, "Table comparison",
      "Showers and faucets together account for about what share of daily use?",
      ["39%", "20%", "43%", "46%"],
      "20% for showers plus 19% for faucets is 39%.",
      stim="CBEST-D-TBL"),
    Q(0, RES, 3, "Missing information",
      "Which question can NOT be answered from the table?",
      ["How many people live there", "How much water leaks waste each day",
       "Which use is the second largest", "What share of use the washer takes"],
      "The table gives gallons and shares by use but nothing about the number of people. Leaks (17 gallons), the second largest use (shower) and the washer's share (16%) are all listed.",
      stim="CBEST-D-TBL"),
    Q(0, RES, 1, "Graph detail",
      "In which year was full-time enrollment lowest?",
      ["2022", "2021", "2023", "2020"],
      "Full-time enrollment fell to 3,900 in 2022, its lowest point, then rose.",
      stim="CBEST-D-GRAPH"),
    Q(0, RES, 2, "Graph trend",
      "Which statement best describes part-time enrollment from 2020 to 2024?",
      ["It rose every year", "It fell every year", "It stayed about the same", "It rose, then fell sharply"],
      "Part-time enrollment went 5,100, 5,600, 6,000, 6,300, 6,350, an increase each year. It dipped only in 2025.",
      stim="CBEST-D-GRAPH"),
    Q(0, RES, 2, "Graph conclusion",
      "Which conclusion is best supported by the graph?",
      ["Part-time students always outnumbered full-time", "Total enrollment fell every single year",
       "Full-time enrollment rose every year", "Most students attend full time"],
      "In every year the part-time figure is higher than the full-time figure. Full-time enrollment dipped through 2022, and the total grew overall.",
      stim="CBEST-D-GRAPH"),
    Q(0, RES, 3, "Graph calculation",
      "By how many students did total enrollment change from 2020 to 2025?",
      ["It rose by 1,200", "It rose by 100", "It fell by 1,200", "It rose by 1,100"],
      "2020 total: 4,200 + 5,100 = 9,300. 2025 total: 4,300 + 6,200 = 10,500. The change is an increase of 1,200.",
      stim="CBEST-D-GRAPH"),
]
