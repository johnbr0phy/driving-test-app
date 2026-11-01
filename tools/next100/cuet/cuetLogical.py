# Logical reasoning: syllogisms, statements and conclusions, statements and
# assumptions, courses of action, blood relations and directions. The
# statement sets use fixed I / II / both / neither options, which the build
# shows in natural order (lockedOrder). Key written first.
C1 = ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither I nor II follows"]
A1 = ["Only assumption I is implicit", "Only assumption II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"]
K1 = ["Only course I follows", "Only course II follows", "Both I and II follow", "Neither I nor II follows"]


def key_first(opts, k):
    """Put option k first (the authoring convention); the build restores the
    fixed order."""
    return [opts[k]] + [o for i, o in enumerate(opts) if i != k]


ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 2, "Syllogism", "Statements: All kites are toys. Some toys are red.\nConclusions: I. Some kites are red. II. Some red things are toys.\nWhich conclusion(s) follow?",
      key_first(C1, 1),
      "Some toys are red, so some red things are toys: II follows. The red toys need not be kites, so I does not follow."),
    S(1, 2, "Blood relations", "Kavya's mother is the only sister of Ajay's father. How is Kavya related to Ajay's father?",
      ["Niece", "Daughter", "Sister", "Cousin"],
      "Ajay's father is the brother of Kavya's mother, so he is Kavya's maternal uncle and she is his niece. Kavya is Ajay's cousin, not his father's."),
    S(1, 2, "Directions", "Arun walks 7 km east, turns left and walks 8 km, then turns left again and walks 13 km. How far is he now from his starting point?",
      ["10 km", "8 km", "14 km", "28 km"],
      "He ends 13 - 7 = 6 km west and 8 km north of the start. The straight-line distance is the square root of (36 + 64) = 10 km. 28 km is the total distance walked."),
    S(1, 2, "Statement and assumption", "Statement: \"The college library will stay open till 10 p.m. during the examination weeks.\"\nAssumptions: I. Students will use the library late in the evening during exams. II. The library is usually open till 10 p.m.\nWhich assumption(s) are implicit?",
      key_first(A1, 0),
      "Extending the hours makes sense only if students will use them, so I is implicit. Saying \"during the examination weeks\" suggests the library normally closes earlier, so II is not."),
    S(1, 3, "Coded relations", "P + Q means P is the father of Q, P - Q means P is the sister of Q, and P x Q means P is the brother of Q. What does A - B + C mean?",
      ["A is C's aunt", "A is C's mother", "A is C's sister", "A is C's grandmother"],
      "A - B: A is B's sister. B + C: B is C's father. So A is the sister of C's father, which makes her C's aunt."),
    # ---------- Practice Test 2 ----------
    S(2, 2, "Syllogism", "Statements: All pens are boxes. No box is a chair.\nConclusions: I. No pen is a chair. II. Some chairs are pens.\nWhich conclusion(s) follow?",
      key_first(C1, 0),
      "Every pen is a box and no box is a chair, so no pen can be a chair: I follows. II contradicts I, so it does not follow."),
    S(2, 2, "Blood relations", "A is the son of B. C is B's sister. D is C's husband. How is D related to A?",
      ["Uncle", "Father", "Cousin", "Brother-in-law"],
      "C is A's aunt (a sister of A's parent B), and D is married to her, so D is A's uncle."),
    S(2, 2, "Directions", "Rhea faces east. She turns 135° clockwise and then 270° anticlockwise. Which direction does she face now?",
      ["North-west", "North-east", "South-west", "South-east"],
      "135° clockwise from east passes south (90°) and goes 45° further, to south-west. Turning 270° anticlockwise is the same as turning 90° clockwise, which takes her from south-west to north-west."),
    S(2, 2, "Statement and conclusion", "Statement: The number of students in a school has doubled in three years, but the number of teachers is the same.\nConclusions: I. There are now more students for each teacher than three years ago. II. The school's results will fall.\nWhich conclusion(s) follow?",
      key_first(C1, 0),
      "Twice the students with the same number of teachers means more students per teacher, so I follows. Nothing in the statement tells us what will happen to the results, so II does not."),
    S(2, 2, "Statement and assumption", "Statement: A bank's message to its customers says, \"Pay your electricity bill on our app and save a trip to the branch.\"\nAssumptions: I. Many customers can use the bank's app. II. Going to the branch to pay bills is a bother for some customers.\nWhich assumption(s) are implicit?",
      key_first(A1, 2),
      "The message is useful only if customers can use the app (I), and \"save a trip\" takes for granted that the trip is a bother (II). Both are implicit."),
    # ---------- Drill only ----------
    S(0, 2, "Syllogism", "Statements: Some cups are plates. All plates are spoons.\nConclusions: I. Some cups are spoons. II. Some spoons are plates.\nWhich conclusion(s) follow?",
      key_first(C1, 2),
      "The cups that are plates are also spoons, so I follows. All plates are spoons, so some spoons are plates: II follows too."),
    S(0, 2, "Syllogism", "Statements: No stone is a tree. All trees are green.\nConclusions: I. No stone is green. II. Some green things are trees.\nWhich conclusion(s) follow?",
      key_first(C1, 1),
      "Stones could still be green in some other way, so I does not follow. Since all trees are green, some green things are trees: II follows."),
    S(0, 2, "Syllogism", "Statements: All potters are artists. Some artists are dancers.\nConclusions: I. Some potters are dancers. II. All dancers are artists.\nWhich conclusion(s) follow?",
      key_first(C1, 3),
      "The dancing artists may not be potters, so I does not follow. Only some artists are dancers; nothing says every dancer is an artist, so II does not follow either."),
    S(0, 2, "Blood relations", "Introducing a man, Kunal says, \"His wife is the only daughter of my mother's mother.\" How is the man related to Kunal?",
      ["Father", "Uncle", "Grandfather", "Brother"],
      "The only daughter of Kunal's maternal grandmother is Kunal's mother. The man is her husband, so he is Kunal's father."),
    S(0, 2, "Blood relations", "P is the mother of Q. Q is the husband of R. S is the son of Q and R. How is P related to S?",
      ["Grandmother", "Mother", "Aunt", "Mother-in-law"],
      "Q is S's father, and P is Q's mother, so P is S's paternal grandmother. She is R's mother-in-law, not S's."),
    S(0, 2, "Directions", "Mohan walks 8 km west and then 15 km south. How far, and in which direction, is he from his starting point?",
      ["17 km south-west", "23 km south-west", "17 km north-east", "17 km south-east"],
      "The straight-line distance is the square root of (64 + 225) = 17 km. He has gone west and south, so he is south-west of the start. 23 km is the distance walked."),
    S(0, 1, "Directions", "Ankit walks 12 m south, turns left and walks 24 m, then turns left and walks 12 m. Where is he now from his starting point?",
      ["24 m east", "24 m west", "48 m east", "36 m south-east"],
      "Turning left from south faces east, and turning left again faces north. The 12 m south and 12 m north cancel, leaving him 24 m east of the start."),
    S(0, 2, "Course of action", "Statement: Several cases of dengue have been reported in a locality after heavy rain.\nCourses of action: I. The municipality should clear stagnant water in the locality. II. All residents should be moved out of the locality.\nWhich course(s) of action follow?",
      key_first(K1, 0),
      "Dengue mosquitoes breed in standing water, so clearing it is a practical step: I follows. Moving everyone out is extreme and impractical, so II does not."),
    S(0, 2, "Coded relations", "P @ Q means P is the husband of Q, and P # Q means P is the mother of Q. What does X @ Y # Z mean?",
      ["X is Z's father", "X is Z's uncle", "X is Z's grandfather", "X is Z's brother"],
      "X is Y's husband and Y is Z's mother, so X is Z's father."),
    S(0, 1, "Statement and conclusion", "Statement: All seats for the 6 p.m. show of a new film were sold an hour before it began.\nConclusions: I. Many people wanted to see the film. II. The 9 p.m. show will also be sold out.\nWhich conclusion(s) follow?",
      key_first(C1, 0),
      "A sold-out show shows strong demand, so I follows. Nothing tells us about the later show, so II is a guess."),
    S(0, 2, "Statement and assumption", "Statement: A company has decided to train its staff in spoken English.\nAssumptions: I. Better spoken English will help the staff in their work. II. Some of the staff are not fluent in spoken English.\nWhich assumption(s) are implicit?",
      key_first(A1, 2),
      "A company trains staff only if it expects the skill to help (I) and believes some of them need it (II). Both are implicit."),
    S(0, 1, "Statement and assumption", "Statement: An instruction on an answer sheet says, \"Write your answers only in blue or black ink.\"\nAssumptions: I. Answers in other colours may be hard to read or may not be accepted. II. Every candidate owns only blue pens.\nWhich assumption(s) are implicit?",
      key_first(A1, 0),
      "The rule exists because other colours cause problems, so I is implicit. The instruction allows black ink as well, so it does not assume everyone has only blue pens."),
    S(0, 2, "Cause and effect", "Statement: The price of onions rose sharply after untimely rain damaged the crop in the main growing areas.\nConclusions: I. The supply of onions fell. II. The prices of all vegetables rose.\nWhich conclusion(s) follow?",
      key_first(C1, 0),
      "Crop damage cut the supply, which pushed the price up, so I follows. The statement is about onions only, so II does not follow."),
    S(0, 1, "Blood relations", "How is Ravi's brother's wife's son related to Ravi?",
      ["Nephew", "Cousin", "Son", "Brother"],
      "Ravi's brother's wife's son is his brother's son, which makes him Ravi's nephew."),
]
