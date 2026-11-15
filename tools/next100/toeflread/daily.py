# Read in Daily Life sets: short non-academic texts (15 to 150 words) with two or
# three questions each. All people, places and businesses are invented.
# Q(d, domain, stem, key, [3 wrong], explanation); domain "detail" (facts,
# scanning, non-linear formats) or "infer" (purpose, implied meaning, idioms).

def Q(d, dom, stem, key, wrongs, expl):
    assert dom in ("detail", "infer") and len(wrongs) == 3, stem
    return dict(d=d, dom=dom, stem=stem, key=key, wrongs=wrongs, expl=expl)


DAILY = [
  # ---------------- Practice Test 1 (router) ----------------
  dict(id="TOEFLR-T1-DL1", test=1, title="Email: Water shutoff",
       text="**From:** Residence Life Office\n\n**To:** All residents, Maple Hall\n\n**Subject:** Water off Thursday morning\n\nPlumbers will replace a main pipe in Maple Hall on Thursday. Water will be off in the whole building from 8:00 a.m. to about noon. Please fill a bottle the night before if you need water for the morning. Showers in Cedar Hall, next door, will stay open, and you may use them with your student ID. If the work runs late, we will text all residents by 11:30 a.m. We are sorry for the inconvenience.",
       qs=[
         Q(1, "infer", "What is the main purpose of the email?", "To warn residents about a planned repair", ["To ask residents to report a broken pipe", "To announce new showers in Maple Hall", "To explain why the building will close"], "The email tells residents that water will be off while plumbers replace a pipe, so it is a warning about planned work. Nothing is broken that residents must report, and the building stays open."),
         Q(2, "detail", "Where can Maple Hall residents shower on Thursday morning?", "In Cedar Hall", ["In Maple Hall after 8:00", "At the Residence Life Office", "Nowhere until Friday"], "The email says showers in Cedar Hall, next door, stay open to residents with a student ID."),
         Q(2, "infer", "What can residents conclude if they receive no text by 11:30 a.m.?", "The work is on schedule", ["The water is already back on", "The work has been canceled", "They must move to Cedar Hall"], "A text is promised only if the work runs late, so no text means the work is expected to finish around noon as planned. It does not mean the water is already back."),
       ]),
  dict(id="TOEFLR-T1-DL2", test=1, title="Poster: Fix-It Saturday",
       text="**FIX-IT SATURDAY**\n\nIs your bike making strange noises? Is a chair wobbling? Bring it to the Riverside Community Center, Room 4, on the first Saturday of every month, 10 a.m. to 2 p.m.\n\n- Volunteer repairers will show you how to fix it yourself.\n- Small parts (screws, bike tubes, glue) cost $1 each.\n- No large furniture or electrical appliances, please.\n\nNo appointment needed, but arrive before 1 p.m. to be sure of a turn.",
       qs=[
         Q(1, "detail", "Which item would the event NOT accept?", "A washing machine", ["A noisy bicycle", "A loose chair leg", "A torn backpack strap"], "The poster says no electrical appliances or large furniture, so a washing machine would be turned away. A bike and a wobbly chair are the poster's own examples."),
         Q(2, "infer", "What does the poster suggest about the volunteers?", "They show you how to fix it", ["They charge for every repair", "They work only on bicycles", "They need an appointment first"], "Volunteers \"will show you how to fix it yourself\", so visitors learn to do the repair. Only small parts cost money."),
         Q(2, "detail", "Why should visitors come before 1 p.m.?", "To be sure they get a turn", ["To buy parts before they sell out", "Because the room closes at 1", "To book the next month's event"], "The poster says to arrive before 1 p.m. to be sure of a turn; the event itself runs until 2 p.m."),
       ]),
  dict(id="TOEFLR-T1-DL3", test=1, title="Text messages",
       text="**Priya:** Still on for studying tonight? Library, 7?\n\n**Marco:** Can we push it to 7:30? My lab is running over.\n\n**Priya:** Sure. I'll grab a table on the second floor. The first floor is way too loud during exams.\n\n**Marco:** Perfect. I'll bring the notes from Tuesday since you missed it.\n\n**Priya:** Lifesaver!",
       qs=[
         Q(1, "detail", "Why does Marco want to change the time?", "His lab will end late", ["The library opens at 7:30", "He has to find his notes", "Priya missed the last class"], "Marco says \"My lab is running over\", meaning it will last longer than planned."),
         Q(2, "infer", "What does Priya mean when she writes \"Lifesaver!\"?", "She is grateful for Marco's help", ["She is worried about the exam", "She thinks Marco is late again", "She wants to meet somewhere else"], "Priya missed Tuesday's class, so Marco bringing the notes helps her a lot; \"Lifesaver!\" is an informal way to say thank you."),
       ]),
  dict(id="TOEFLR-T1-DL4", test=1, title="Menu: Corner Bean Cafe",
       text="**Corner Bean Cafe: Breakfast (7 to 11 a.m.)**\n\n| Item | Price |\n|---|---|\n| Oatmeal with fruit | $4.50 |\n| Egg sandwich | $5.75 |\n| Yogurt bowl | $5.00 |\n| Coffee or tea | $2.25 |\n\nAdd a coffee or tea to any breakfast item for $1.50. Lunch starts at 11:30.",
       qs=[
         Q(2, "detail", "How much would an egg sandwich with a coffee cost at 9 a.m.?", "$7.25", ["$8.00", "$5.75", "$6.75"], "During breakfast hours a coffee added to a food item costs $1.50 instead of $2.25, so $5.75 + $1.50 = $7.25. Paying the full coffee price would give $8.00."),
         Q(1, "infer", "What can be inferred about the cafe at 11:15 a.m.?", "It is serving neither meal", ["It is serving lunch", "It is still serving breakfast", "It has closed for the day"], "Breakfast ends at 11 a.m. and lunch starts at 11:30, so at 11:15 neither menu is being served."),
       ]),
  # ---------------- Practice Test 2 (router) ----------------
  dict(id="TOEFLR-T2-DL1", test=2, title="Schedule: Holiday hours",
       text="**Westbrook Public Library: Holiday Hours**\n\n| Day | Main Branch | Hillside Branch |\n|---|---|---|\n| Wed, Nov 25 | 9 a.m. to 5 p.m. | 9 a.m. to 1 p.m. |\n| Thu, Nov 26 | Closed | Closed |\n| Fri, Nov 27 | Noon to 6 p.m. | Closed |\n| Sat, Nov 28 | Normal hours | Normal hours |\n\nBook drops at both branches stay open every day. Items due while a branch is closed are due the next open day.",
       qs=[
         Q(1, "detail", "When is the Hillside Branch open on Friday, November 27?", "It is not open", ["Noon to 6 p.m.", "9 a.m. to 1 p.m.", "Normal hours"], "The Hillside column shows \"Closed\" for Friday; noon to 6 p.m. is the Main Branch."),
         Q(2, "detail", "A book is due on Thursday, November 26. When is it due instead?", "The next open day", ["The following Thursday", "It must be returned Wednesday", "There is no new due date"], "The note says items due while a branch is closed are due the next open day."),
         Q(2, "infer", "What does the schedule suggest a reader can do on Thanksgiving Thursday?", "Return books in a book drop", ["Use the Hillside computers", "Pick up books at the Main Branch", "Attend a library event"], "Both branches are closed Thursday, but the book drops stay open every day, so returns are still possible."),
       ]),
  dict(id="TOEFLR-T2-DL2", test=2, title="Email: Your order",
       text="**Subject:** Update on order #44817\n\nHi Daniel,\n\nThanks for shopping with Greenleaf Outdoor. One item in your order, the two-person tent, is temporarily out of stock. The rest of your order (hiking socks and a water filter) shipped today and should arrive by Friday. We expect the tent back in stock in about two weeks and will ship it then at no extra cost. If you would rather not wait, reply to this email and we will refund the tent right away.\n\nThe Greenleaf Team",
       qs=[
         Q(1, "infer", "Why did Greenleaf Outdoor write to Daniel?", "To explain a delay in his order", ["To confirm that his refund is complete", "To ask him to pay extra shipping", "To offer him a different tent"], "The email says the tent is out of stock while the other items have shipped, so its purpose is to explain a delay."),
         Q(2, "detail", "What will arrive by Friday?", "Socks and a filter", ["The tent and the socks", "The whole order", "Only the water filter"], "The rest of the order, \"hiking socks and a water filter\", shipped today and should arrive by Friday."),
         Q(2, "detail", "What should Daniel do if he does not want to wait for the tent?", "Reply to the email", ["Call the store", "Return the other items", "Order a new tent online"], "The email says to reply if he would rather not wait, and the tent will be refunded."),
       ]),
  dict(id="TOEFLR-T2-DL3", test=2, title="Social media post",
       text="**Hannah R.** posted in *Oak Street Neighbors*\n\nFOUND: small brown dog with a red collar, no tag, near the playground on Elm and 3rd this morning. Super friendly, a bit muddy. She's safe at my place for now. If she's yours, message me and tell me something about her that isn't in this post!",
       qs=[
         Q(1, "detail", "Where was the dog found?", "Near a playground", ["Inside Hannah's house", "At an animal shelter", "On Oak Street"], "Hannah found the dog \"near the playground on Elm and 3rd\". Oak Street is the name of the neighbors' group."),
         Q(2, "infer", "Why does Hannah ask owners to tell her something not in the post?", "To check they really own her", ["To learn the dog's name for a tag", "To find out where the dog lives", "To decide who should pay for a bath"], "Anyone could repeat the details in the post, so asking for a new detail helps Hannah make sure the person really owns the dog."),
       ]),
  dict(id="TOEFLR-T2-DL4", test=2, title="Sign: Pool rules",
       text="**LAP POOL: PLEASE READ**\n\nShower before entering. Lanes are marked SLOW, MEDIUM and FAST: choose the one that matches your pace. Swim on the right side of the lane. No diving in the shallow end. Lifeguard on duty 6 a.m. to 9 p.m.; swim at your own risk at other times.",
       qs=[
         Q(1, "detail", "According to the sign, which side of the lane should swimmers use?", "The right side", ["The left side", "Either side", "The middle of the lane"], "The sign says \"Swim on the right side of the lane.\""),
         Q(2, "infer", "What does the sign imply about swimming at 10 p.m.?", "No lifeguard is watching", ["The pool is closed", "Only the fast lane is open", "Swimmers must shower again"], "A lifeguard is on duty only until 9 p.m., and at other times people swim at their own risk, so the pool can be used but nobody is guarding it."),
       ]),
  # ---------------- Drill only ----------------
  dict(id="TOEFLR-D-DL1", test=0, title="Advertisement: Peak Fitness",
       text="**Peak Fitness: Student Special**\n\nShow a valid student ID and pay just $20 a month, no sign-up fee. Includes all group classes, the climbing wall and 24-hour access to the weight room. Towel service is extra. Offer ends September 30; membership price stays the same as long as you remain a student.",
       qs=[
         Q(1, "detail", "What does the student membership NOT include?", "Towel service", ["Group classes", "The climbing wall", "Night use of the weight room"], "Towel service is listed as extra. Classes, the climbing wall and 24-hour weight room access are included."),
         Q(2, "infer", "What is suggested about a student who joins in September?", "Their price stays the same", ["They must join a class every week", "They pay a fee after September 30", "They can only visit during the day"], "The ad says the price stays the same as long as you remain a student, so it will not go up while they study."),
         Q(2, "detail", "What must a student show to get the special price?", "A valid student ID", ["A class schedule", "A receipt from another gym", "A letter from the school"], "The ad says to show a valid student ID."),
       ]),
  dict(id="TOEFLR-D-DL2", test=0, title="Email: Class moved",
       text="**Subject:** BIO 110: Wednesday class moved\n\nDear students,\n\nI will be at a conference on Wednesday, so our class will not meet in Lecture Hall B. Instead, please watch the recorded lecture on the course page before Friday. The quiz planned for Wednesday will now open online on Thursday and close Friday at midnight. Friday's lab will go ahead as usual.\n\nProfessor Alvarez",
       qs=[
         Q(1, "infer", "Why did Professor Alvarez send the email?", "To explain what replaces the class", ["To cancel the whole course for the week", "To move the lab to a new room", "To announce a new conference"], "She will be at a conference, so the email explains what replaces Wednesday's class and when the quiz will be taken."),
         Q(2, "detail", "When will the quiz close?", "Friday at midnight", ["Wednesday at the end of class", "Thursday morning", "After Friday's lab"], "The quiz opens online Thursday and closes Friday at midnight."),
         Q(3, "infer", "What can be inferred about the recorded lecture?", "It covers Wednesday's material", ["It replaces Friday's lab", "It is only for students who miss the quiz", "It will be shown in Lecture Hall B"], "Students are asked to watch it instead of attending Wednesday's class, so it stands in for that class."),
       ]),
  dict(id="TOEFLR-D-DL3", test=0, title="Text messages",
       text="**Sam:** Heading to the store. Need anything?\n\n**Lee:** We're out of milk. And grab rice if it's on sale.\n\n**Sam:** Rice is full price this week.\n\n**Lee:** Skip it then, we have enough for a couple of days.",
       qs=[
         Q(1, "detail", "What will Sam most likely buy for Lee?", "Milk", ["Rice", "Milk and rice", "Nothing"], "Lee asks for milk, and says to skip the rice because it is not on sale."),
         Q(2, "infer", "What does Lee mean by \"Skip it then\"?", "Do not buy the rice", ["Buy the rice anyway", "Go to another store", "Come home quickly"], "\"Skip it\" means leave it out; Lee does not want rice at full price."),
       ]),
  dict(id="TOEFLR-D-DL4", test=0, title="Invoice: Quick Screen Repair",
       text="**Quick Screen Repair: Invoice**\n\n| Item | Cost |\n|---|---|\n| Phone screen replacement | $89.00 |\n| Labor | $25.00 |\n| Student discount (10% of labor) | -$2.50 |\n| **Total** | **$111.50** |\n\nAll repairs carry a 90-day warranty on parts.",
       qs=[
         Q(2, "detail", "How much did the student discount save?", "$2.50", ["$11.40", "$8.90", "$25.00"], "The discount is 10% of labor only: 10% of $25.00 is $2.50, as the invoice shows. 10% of the whole bill would have been more."),
         Q(2, "infer", "If the new screen stops working after two months, what is likely?", "The warranty covers the part", ["The customer pays the full price again", "Only the labor is covered", "The discount is taken back"], "Two months is within the 90-day warranty on parts, so the screen should be covered."),
       ]),
  dict(id="TOEFLR-D-DL5", test=0, title="Notice: Route 12",
       text="**ROUTE 12 DETOUR**\n\nFrom March 3 to March 14, Route 12 buses will not stop at Pine Avenue because of road work. Use the temporary stop on Birch Street, one block north. All other stops and times are unchanged.",
       qs=[
         Q(1, "detail", "Where is the temporary stop?", "On Birch Street", ["On Pine Avenue", "One block south", "At the end of Route 12"], "The notice says to use the temporary stop on Birch Street, one block north."),
         Q(2, "infer", "What can be inferred about March 15?", "Buses stop at Pine Avenue again", ["Route 12 will stop running for good", "Bus times will change", "Birch Street will close"], "The detour lasts from March 3 to March 14, so the normal stop should return after that."),
       ]),
  dict(id="TOEFLR-D-DL6", test=0, title="Web page: Volunteer sign-up",
       text="**Riverside Park Cleanup: Sign up**\n\nDate: Saturday, April 18, 9 a.m. to noon\n\nWhat to bring: water bottle, closed-toe shoes\n\nWe provide: gloves, bags, snacks\n\nAges 12 to 15 must come with an adult. Groups of more than five, please email us first so we can plan the tools.",
       qs=[
         Q(1, "detail", "What will the organizers provide?", "Gloves", ["Water bottles", "Closed-toe shoes", "Lunch"], "The page lists gloves, bags and snacks as provided; water bottles and shoes are for volunteers to bring."),
         Q(2, "infer", "Why should a large group email first?", "So enough tools are ready", ["To get a later start time", "To be allowed to bring children", "To pay a group fee"], "Groups of more than five should email \"so we can plan the tools\"."),
       ]),
]
