# Reasoning Ability: puzzles and seating arrangements (shared stimuli).
P1 = "Floors 1 to 7: F, C, A, G, D, B, E. E takes floor 7, so D (odd, above 3) is on 5. One person between D and A puts A on 3. B is on 6 and C on 2. F and G take floors 1 and 4, and F is below G, so F is on 1 and G on 4."
P2 = "Clockwise from Amit (facing the centre, a person's left is the next seat clockwise): Amit, Esha, Chirag, Farhan, Bina, Deepa. Esha is Amit's immediate left and Chirag his second left; Farhan is opposite Amit; Deepa is his immediate right; Bina takes the last seat."
P3 = "Monday to Saturday: R (Kochi), U (Pune), P (Agra), T (Indore), Q (Surat), S (Patna). P is on Wednesday, so S, three days away, is on Saturday (Sunday is not used). Q is on Friday and T on Thursday. R and U take Monday and Tuesday with R first. Kochi is Monday's (R) and Patna is Saturday's (S). Q is not from Agra, so Q is from Surat and P from Agra."
Q1 = "In order: January Divya, March Gopal, April Arjun, June Heena, August Bhavna, October Chetan. April and June have 30 days. Arjun in June would put Chetan in January, which is ruled out, so Arjun is in April and Chetan in October. Heena is next (June), Bhavna after her (August), and Divya before Gopal in January and March."
Q2 = "Left to right: Pooja, Kiran, Omkar, Rekha, Lalit, Naveen, Mona. Rekha is 4th and Mona 7th, so Naveen is 6th and Lalit 5th. Kiran is two seats from Rekha, 2nd (6th is taken). Pooja cannot be next to Rekha, so Pooja is 1st and Omkar 3rd."
Q3 = "Highest to lowest: Vikas, Zoya, Wasim, Uma, Yash. Zoya > Wasim > Uma, Vikas > Zoya and Yash is lowest, so Zoya is second with 78. Uma has 60 and Yash 60 − 15 = 45."
D1 = "Bottom to top: C, D, A, E, B. C is at 1, so A is at 3 and E at 4. D and B take 2 and 5, and B is above D."
ITEMS = [
    # ---------- Mock Test 1: floors ----------
    S(1, 1, "Floor puzzle", "Who lives on floor 4?",
      ["G", "F", "C", "D", "B"], P1, stim="IBPSCLK-T1-PZ1"),
    S(1, 2, "Floor puzzle", "How many persons live between C and B?",
      ["Three", "Two", "Four", "One", "Five"], P1 + " C is on 2 and B on 6, so A, G and D live between them.", stim="IBPSCLK-T1-PZ1"),
    S(1, 1, "Floor puzzle", "Who lives on the lowest floor?",
      ["F", "C", "A", "G", "B"], P1, stim="IBPSCLK-T1-PZ1"),
    S(1, 2, "Floor puzzle", "Which of the following pairs does NOT live on adjacent floors?",
      ["A and D", "C and A", "D and B", "E and B", "F and C"], P1 + " A is on 3 and D on 5, with G between them. Every other pair is on neighbouring floors.", stim="IBPSCLK-T1-PZ1"),
    S(1, 3, "Floor puzzle", "If the seven persons were placed in alphabetical order from floor 1 upward (A on floor 1, B on floor 2, and so on), how many would stay on the same floor?",
      ["None", "One", "Two", "Three", "Four"], P1 + " Alphabetical order would put A on 1, B on 2, C on 3, D on 4, E on 5, F on 6 and G on 7. Nobody's actual floor matches.", stim="IBPSCLK-T1-PZ1"),
    # ---------- Mock Test 1: circular seating ----------
    S(1, 1, "Circular seating", "Who sits opposite Esha?",
      ["Bina", "Deepa", "Chirag", "Farhan", "Amit"], P2 + " Esha is in the 2nd seat and Bina three seats on, in the 5th.", stim="IBPSCLK-T1-PZ2"),
    S(1, 2, "Circular seating", "Who sits immediately to the right of Chirag?",
      ["Esha", "Farhan", "Amit", "Bina", "Deepa"], P2 + " A person's right is the next seat anticlockwise, so Chirag's immediate right is Esha. Farhan is on his left.", stim="IBPSCLK-T1-PZ2"),
    S(1, 1, "Circular seating", "Who sits opposite Deepa?",
      ["Chirag", "Esha", "Bina", "Amit", "Farhan"], P2 + " Deepa is in the 6th seat and Chirag in the 3rd, three seats apart.", stim="IBPSCLK-T1-PZ2"),
    S(1, 2, "Circular seating", "What is the position of Bina with respect to Amit?",
      ["Second to the right", "Second to the left", "Immediately to the right", "Third to the left", "Immediately to the left"],
      P2 + " Going anticlockwise (to Amit's right): Deepa, then Bina. So Bina is second to the right of Amit.", stim="IBPSCLK-T1-PZ2"),
    S(1, 3, "Circular seating", "Which of the following is true?",
      ["Farhan sits between Chirag and Bina", "Esha sits opposite Deepa", "Amit sits between Esha and Chirag",
       "Deepa sits second to the left of Bina", "Chirag sits immediately left of Farhan"],
      P2 + " Farhan (4th) sits between Chirag (3rd) and Bina (5th). Esha is opposite Bina, Esha sits between Amit and Chirag, Bina's second left is Amit, and Farhan's immediate left is Bina.", stim="IBPSCLK-T1-PZ2"),
    # ---------- Mock Test 1: training schedule ----------
    S(1, 1, "Scheduling puzzle", "Who attends the training on Tuesday?",
      ["U", "R", "T", "Q", "S"], P3, stim="IBPSCLK-T1-PZ3"),
    S(1, 2, "Scheduling puzzle", "Which city is Q from?",
      ["Surat", "Agra", "Patna", "Kochi", "Pune"], P3, stim="IBPSCLK-T1-PZ3"),
    S(1, 1, "Scheduling puzzle", "How many persons attend between R and T?",
      ["Two", "One", "Three", "Four", "None"], P3 + " R is on Monday and T on Thursday, so U and P attend between them.", stim="IBPSCLK-T1-PZ3"),
    S(1, 2, "Scheduling puzzle", "Who is from Agra?",
      ["P", "Q", "S", "U", "R"], P3, stim="IBPSCLK-T1-PZ3"),
    S(1, 2, "Scheduling puzzle", "Which of the following combinations is correct?",
      ["S, Saturday, Patna", "U, Monday, Pune", "T, Friday, Indore", "R, Tuesday, Kochi", "Q, Thursday, Surat"],
      P3, stim="IBPSCLK-T1-PZ3"),

    # ---------- Mock Test 2: birthdays ----------
    S(2, 1, "Month puzzle", "Whose birthday is in August?",
      ["Bhavna", "Heena", "Chetan", "Gopal", "Divya"], Q1, stim="IBPSCLK-T2-PZ1"),
    S(2, 2, "Month puzzle", "How many persons have birthdays between Divya's and Heena's?",
      ["Two", "One", "Three", "Four", "None"], Q1 + " Between January (Divya) and June (Heena) come Gopal (March) and Arjun (April).", stim="IBPSCLK-T2-PZ1"),
    S(2, 1, "Month puzzle", "Whose birthday comes immediately before Arjun's?",
      ["Gopal", "Divya", "Heena", "Bhavna", "Chetan"], Q1, stim="IBPSCLK-T2-PZ1"),
    S(2, 1, "Month puzzle", "In which month is Divya's birthday?",
      ["January", "March", "April", "June", "October"], Q1, stim="IBPSCLK-T2-PZ1"),
    S(2, 2, "Month puzzle", "Which of the following is true?",
      ["Chetan has the last birthday of the six", "Heena's birthday is in April", "Gopal's birthday is in June",
       "Arjun's and Bhavna's birthdays are next to each other", "Bhavna's birthday comes before Heena's"],
      Q1 + " Chetan (October) is last. Heena is in June, Gopal in March, Heena's June birthday falls between Arjun's and Bhavna's, and Bhavna comes after Heena.", stim="IBPSCLK-T2-PZ1"),
    # ---------- Mock Test 2: linear seating ----------
    S(2, 1, "Linear seating", "Who sits at the extreme left end of the row?",
      ["Pooja", "Kiran", "Omkar", "Naveen", "Lalit"], Q2, stim="IBPSCLK-T2-PZ2"),
    S(2, 2, "Linear seating", "How many persons sit between Kiran and Naveen?",
      ["Three", "Two", "Four", "One", "Five"], Q2 + " Kiran is 2nd and Naveen 6th, so Omkar, Rekha and Lalit sit between them.", stim="IBPSCLK-T2-PZ2"),
    S(2, 2, "Linear seating", "Who sits second to the right of Omkar?",
      ["Lalit", "Rekha", "Naveen", "Kiran", "Mona"], Q2 + " Facing north, right is towards the 7th seat. Omkar is 3rd, so second to his right is the 5th seat, Lalit.", stim="IBPSCLK-T2-PZ2"),
    S(2, 2, "Linear seating", "Who sits third to the left of Naveen?",
      ["Omkar", "Kiran", "Rekha", "Pooja", "Lalit"], Q2 + " Naveen is 6th, so third to his left is the 3rd seat, Omkar.", stim="IBPSCLK-T2-PZ2"),
    S(2, 1, "Linear seating", "Which pair sits on either side of Rekha?",
      ["Omkar and Lalit", "Kiran and Lalit", "Omkar and Naveen", "Kiran and Omkar", "Lalit and Naveen"],
      Q2 + " Rekha is 4th, with Omkar 3rd and Lalit 5th.", stim="IBPSCLK-T2-PZ2"),
    # ---------- Mock Test 2: test marks ----------
    S(2, 1, "Comparison puzzle", "Who scored the highest marks?",
      ["Vikas", "Zoya", "Wasim", "Uma", "Yash"], Q3, stim="IBPSCLK-T2-PZ3"),
    S(2, 1, "Comparison puzzle", "How many friends scored more than Wasim?",
      ["Two", "One", "Three", "Four", "None"], Q3 + " Vikas and Zoya scored more than Wasim.", stim="IBPSCLK-T2-PZ3"),
    S(2, 1, "Comparison puzzle", "How many marks did Yash score?",
      ["45", "50", "40", "55", "35"], Q3, stim="IBPSCLK-T2-PZ3"),
    S(2, 2, "Comparison puzzle", "Who scored 78 marks?",
      ["Zoya", "Vikas", "Wasim", "Uma", "Yash"], Q3, stim="IBPSCLK-T2-PZ3"),
    S(2, 3, "Comparison puzzle", "If Wasim scored 9 marks more than Uma, by how many marks did Zoya beat Wasim?",
      ["9", "8", "10", "12", "18"], Q3 + " Wasim scored 60 + 9 = 69, and 78 − 69 = 9.", stim="IBPSCLK-T2-PZ3"),

    # ---------- Drill only ----------
    S(0, 1, "Box puzzle", "Which box is at the top?",
      ["B", "E", "A", "D", "C"], D1, stim="IBPSCLK-D-PZ"),
    S(0, 1, "Box puzzle", "Which box is second from the top?",
      ["E", "A", "B", "D", "C"], D1, stim="IBPSCLK-D-PZ"),
    S(0, 2, "Box puzzle", "How many boxes are between D and B?",
      ["Two", "One", "Three", "None", "Four"], D1 + " D is 2nd from the bottom and B 5th, so A and E are between them.", stim="IBPSCLK-D-PZ"),
]
