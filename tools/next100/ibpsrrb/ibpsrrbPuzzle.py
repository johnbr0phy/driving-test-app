# Reasoning: puzzles and seating arrangements (shared stimuli in stimuli.py).
# Correct option first in every S(); the build shuffles.
P1 = "Bottom to top: N, K, P, J, M, L, O. O is just above L and L is above M, so M is at most 5th, and K (two boxes below M) is 1st or 2nd. If K were 1st, N could not be kept below P, so K is 2nd and M 5th. Then P is 3rd, J 4th, L 6th, O 7th and N 1st."
P2 = "Left to right: Harish, Meena, Sunil, Gita, Pavan, Rani. Gita is 4th, so Harish (two seats between) is 1st. Rani is then at the right end and Pavan 5th. Meena cannot be 3rd (next to Gita), so Meena is 2nd and Sunil 3rd."
P3 = "Monday to Saturday: Dinesh (gram), Chitra (wheat), Feroz (cotton), Ajay (maize), Elina (mustard), Balu (paddy). Ajay is on Thursday, so Dinesh is on Monday, Elina on Friday and Balu on Saturday; Chitra before Feroz puts them on Tuesday and Wednesday. Maize and mustard on consecutive days with cotton not on Friday leaves cotton on Wednesday, maize on Thursday and mustard on Friday."
Q1 = "Clockwise from Ravi: Ravi, Uma, Tarun, Wahida, Vimal, Sona. Wahida is opposite Ravi (3rd seat on), Uma is the next seat clockwise from Ravi, and Sona, second to Uma's right (anticlockwise), is just anticlockwise of Ravi. Tarun cannot sit next to Sona, so he takes the seat between Uma and Wahida and Vimal the seat between Wahida and Sona."
Q2 = "Heaviest to lightest: Kamal, Neha (42 kg), Imran (30 kg), Jaya (24 kg), Lokesh (18 kg). Lokesh is lightest, so his bag is 18 kg, Imran's is 18 + 12 = 30 kg and Jaya's is 30 − 6 = 24 kg. Kamal's is above 42 kg."
Q3 = "Floors 1 to 5: Gopal (guava), Asha (banana), Mohan (mango), Kiran (apple), Leela (orange). Leela is on 5, so Mohan is on 3 and Asha on 2; Kiran above Gopal puts Kiran on 4 and Gopal on 1. Guava is on 1 and apple on 4, so the mango-above-banana pair must be floors 2 and 3, and Leela has orange."
D1 = "In order: February T, April R, June P, August U, October Q, December S. R is immediately before P; if P were in April, R would be in February and T could not come before R, so P is in June, R in April and T in February. S is in December; U before Q puts U in August and Q in October, with U between P and Q."
T1A, T1B, T1C = "IBPSRRB-T1-PZ1", "IBPSRRB-T1-PZ2", "IBPSRRB-T1-PZ3"
T2A, T2B, T2C = "IBPSRRB-T2-PZ1", "IBPSRRB-T2-PZ2", "IBPSRRB-T2-PZ3"
DA = "IBPSRRB-D-PZ1"
ITEMS = [
    # ---------- Mock Test 1: stacked boxes ----------
    S(1, 1, "Stacking puzzle", "Which box is kept at the bottom of the stack?",
      ["N", "K", "P", "J", "O"], P1, stim=T1A),
    S(1, 2, "Stacking puzzle", "How many boxes are kept between N and L?",
      ["Four", "Three", "Five", "Two", "One"], P1 + " N is at 1 and L at 6, so K, P, J and M lie between them.", stim=T1A),
    S(1, 1, "Stacking puzzle", "Which box is kept immediately below J?",
      ["P", "K", "M", "N", "L"], P1, stim=T1A),
    S(1, 2, "Stacking puzzle", "Which box is third from the top?",
      ["M", "L", "J", "P", "O"], P1 + " Counting down from the top: O, L, then M.", stim=T1A),
    S(1, 3, "Stacking puzzle", "Four of the following five pairs are alike in that exactly one box is kept between the two boxes of the pair. Which pair does NOT belong?",
      ["K and M", "N and P", "P and M", "J and L", "M and O"],
      P1 + " N-P (1 and 3), P-M (3 and 5), J-L (4 and 6) and M-O (5 and 7) each have one box between them. K (2) and M (5) have two boxes, P and J, between them.", stim=T1A),
    # ---------- Mock Test 1: linear seating ----------
    S(1, 1, "Linear seating", "Who sits at the left end of the row?",
      ["Harish", "Meena", "Rani", "Sunil", "Pavan"], P2, stim=T1B),
    S(1, 2, "Linear seating", "Who sits third from the right end?",
      ["Gita", "Sunil", "Pavan", "Meena", "Rani"], P2 + " From the right: Rani, Pavan, then Gita.", stim=T1B),
    S(1, 1, "Linear seating", "Who sits immediately to the left of Gita?",
      ["Sunil", "Pavan", "Meena", "Harish", "Rani"], P2 + " Facing north, a person's left is toward the left end, so Gita's immediate left is Sunil (3rd).", stim=T1B),
    S(1, 2, "Linear seating", "How many persons sit between Meena and Pavan?",
      ["Two", "One", "Three", "Four", "None"], P2 + " Meena is 2nd and Pavan 5th, with Sunil and Gita between them.", stim=T1B),
    S(1, 2, "Linear seating", "Which of the following pairs sit next to each other?",
      ["Sunil and Gita", "Harish and Sunil", "Meena and Gita", "Gita and Rani", "Harish and Pavan"],
      P2 + " Sunil (3rd) and Gita (4th) are neighbours. Every other pair has at least one seat between them.", stim=T1B),
    # ---------- Mock Test 1: sowing schedule ----------
    S(1, 1, "Scheduling puzzle", "Which crop does Ajay sow?",
      ["Maize", "Mustard", "Cotton", "Wheat", "Gram"], P3, stim=T1C),
    S(1, 1, "Scheduling puzzle", "Who sows on Wednesday?",
      ["Feroz", "Chitra", "Ajay", "Dinesh", "Elina"], P3, stim=T1C),
    S(1, 2, "Scheduling puzzle", "Which crop is sown on Friday?",
      ["Mustard", "Maize", "Cotton", "Paddy", "Wheat"], P3 + " Maize is on Thursday, so mustard, the next day's crop, is on Friday.", stim=T1C),
    S(1, 2, "Scheduling puzzle", "How many farmers sow between Chitra and Elina?",
      ["Two", "One", "Three", "Four", "None"], P3 + " Chitra is on Tuesday and Elina on Friday, with Feroz and Ajay between them.", stim=T1C),
    S(1, 3, "Scheduling puzzle", "Which of the following combinations is correct?",
      ["Balu, Saturday, paddy", "Chitra, Monday, gram", "Feroz, Wednesday, wheat", "Dinesh, Tuesday, gram", "Elina, Thursday, mustard"],
      P3 + " Balu sows paddy on Saturday. Each other option puts a farmer on the wrong day or with the wrong crop.", stim=T1C),

    # ---------- Mock Test 2: circular seating ----------
    S(2, 1, "Circular seating", "Who sits opposite Uma?",
      ["Vimal", "Sona", "Tarun", "Wahida", "Ravi"], Q1 + " Uma is in the 2nd seat clockwise from Ravi's and Vimal three seats on, in the 5th.", stim=T2A),
    S(2, 2, "Circular seating", "Who sits immediately to the right of Wahida?",
      ["Tarun", "Vimal", "Uma", "Sona", "Ravi"], Q1 + " A person's right is the next seat anticlockwise, so Wahida's immediate right is Tarun. Vimal is on her left.", stim=T2A),
    S(2, 1, "Circular seating", "Who sits between Vimal and Ravi?",
      ["Sona", "Wahida", "Uma", "Tarun", "Nobody"], Q1, stim=T2A),
    S(2, 2, "Circular seating", "Who sits second to the left of Tarun?",
      ["Vimal", "Wahida", "Sona", "Uma", "Ravi"], Q1 + " Going clockwise (left) from Tarun: Wahida, then Vimal.", stim=T2A),
    S(2, 3, "Circular seating", "Which of the following is true?",
      ["Uma sits between Ravi and Tarun", "Sona sits opposite Uma", "Tarun sits opposite Ravi",
       "Vimal sits immediately left of Sona", "Wahida sits second to the left of Ravi"],
      Q1 + " Uma's two neighbours are Ravi and Tarun. Opposite Uma is Vimal, opposite Ravi is Wahida, Sona's immediate left is Ravi, and Ravi's second left is Tarun.", stim=T2A),
    # ---------- Mock Test 2: comparison ----------
    S(2, 1, "Comparison puzzle", "Whose bag is the third heaviest?",
      ["Imran", "Jaya", "Neha", "Kamal", "Lokesh"], Q2, stim=T2B),
    N(2, 2, "Comparison puzzle", "How much does Imran's bag weigh?",
      "30 kg", ["24 kg", "26 kg", "28 kg", "36 kg"], Q2, stim=T2B),
    N(2, 2, "Comparison puzzle", "How much does Jaya's bag weigh?",
      "24 kg", ["26 kg", "28 kg", "30 kg", "36 kg"], Q2, stim=T2B),
    S(2, 1, "Comparison puzzle", "How many bags are lighter than Neha's?",
      ["Three", "Two", "Four", "One", "None"], Q2 + " Imran's, Jaya's and Lokesh's bags are lighter than Neha's.", stim=T2B),
    N(2, 2, "Comparison puzzle", "Which of the following could be the weight of Kamal's bag?",
      "45 kg", ["36 kg", "38 kg", "40 kg", "42 kg"], Q2 + " Kamal's bag is the heaviest, so it must weigh more than Neha's 42 kg; 42 kg itself is ruled out because no two bags weigh the same.", stim=T2B),
    # ---------- Mock Test 2: floors and fruits ----------
    S(2, 1, "Floor puzzle", "Who likes guava?",
      ["Gopal", "Asha", "Mohan", "Kiran", "Leela"], Q3, stim=T2C),
    S(2, 1, "Floor puzzle", "Which fruit does Leela like?",
      ["Orange", "Mango", "Apple", "Banana", "Guava"], Q3, stim=T2C),
    S(2, 2, "Floor puzzle", "How many persons live between Asha and Leela?",
      ["Two", "One", "Three", "None", "Four"], Q3 + " Asha is on 2 and Leela on 5, with Mohan and Kiran between them.", stim=T2C),
    S(2, 2, "Floor puzzle", "Who lives immediately above the person who likes mango?",
      ["Kiran", "Leela", "Asha", "Gopal", "Mohan"], Q3 + " Mohan likes mango and lives on 3, so the person on 4, Kiran, is immediately above him.", stim=T2C),
    S(2, 2, "Floor puzzle", "On which floor does the person who likes banana live?",
      ["Floor 2", "Floor 1", "Floor 3", "Floor 4", "Floor 5"], Q3 + " Asha likes banana and lives on floor 2.", stim=T2C),

    # ---------- Drill only: meeting months ----------
    S(0, 1, "Scheduling puzzle", "Who attends the meeting in August?",
      ["U", "Q", "P", "R", "T"], D1, stim=DA),
    S(0, 2, "Scheduling puzzle", "How many persons attend between T and U?",
      ["Two", "One", "Three", "Four", "None"], D1 + " T is in February and U in August, with R and P between them.", stim=DA),
    S(0, 1, "Scheduling puzzle", "Who attends immediately after P?",
      ["U", "Q", "R", "S", "T"], D1, stim=DA),
    S(0, 2, "Scheduling puzzle", "In which month does Q attend?",
      ["October", "August", "June", "December", "April"], D1, stim=DA),
    S(0, 3, "Scheduling puzzle", "Which of the following is true?",
      ["R attends in April", "T attends in June", "S attends in October", "U attends after Q", "P attends in February"],
      D1 + " R is in April. T is in February, S in December, U before Q, and P in June.", stim=DA),
]
