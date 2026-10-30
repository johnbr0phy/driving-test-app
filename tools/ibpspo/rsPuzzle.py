# Reasoning Ability: puzzles and seating arrangements (shared stimuli).
P1 = "Final arrangement, left to right: D, F, A, G, C, B, E. G is 4th (middle), A is 3rd, B is 6th (two between A and B), E is 7th, so D takes the other end, 1st. C cannot sit next to D, so C is 5th and F is 2nd."
P2 = "Clockwise from P (facing the centre, a person's left is the next seat clockwise): P, T, R, W, Q, V, S, U. Q is opposite P; T is P's immediate left and R second to the left; U must be P's other neighbour, so S is next to U; W is Q's immediate right; V takes the last seat."
P3 = "Floors 1 to 5: M (Guava), K (Apple), N (Mango), J (Banana), L (Grapes). L is on 5, so N is on 3. K is immediately above M, which fits only on floors 2 and 1, leaving J on 4; the Mango lover is below J, so N likes Mango. M (floor 1) likes Guava, K takes Apple, and L, not liking Banana, takes Grapes."
Q1 = "Positions west to east: Ekta, Arun, Firoz, Charu, Bela, Dev. Facing south, each person's left is to the east and right to the west. Charu is third from the left (east) end, so 4th from the west. Dev is at an end and to Bela's left, so Dev is at the east end and Bela next to him. Arun is second to Charu's right (west), so 2nd. Ekta cannot sit next to Charu, so Ekta is at the west end and Firoz is 3rd."
Q2 = "Bottom to top: O (White), L (Red), Q (Black), N (Blue), P (Yellow), M (Green). O is at 1, so P is at 5 (three boxes between), M at 6 and the Blue box at 4. L is two places from 4: position 2 (6 is M). Q is above L and not Blue, so Q is 3 and N is 4 (Blue). Red is above White, so L is Red; M is Green; Q is not Yellow, so Q is Black and P Yellow."
Q3 = "Monday to Sunday: Lata, Hari, Jaya, Mohan, Gita, Imran, Kunal. With Mohan on Thursday, Kunal is Monday or Sunday; Imran is the day before Kunal, so Kunal is Sunday and Imran Saturday. Gita is between them, on Friday. Hari and Jaya are consecutive in Monday to Wednesday, and Lata is before Hari, so Lata Monday, Hari Tuesday, Jaya Wednesday."
D1 = "Tallest to shortest: X, U, Z, W, Y, V. X > U > Z and Z > W > Y. Only two are taller than Z, so they are X and U. V is the shortest, so W and Y come next in that order."
ITEMS = [
    # ---------- Practice Test 1: linear seating ----------
    S(1, 1, "Linear seating", "Who sits at the extreme right end of the row?",
      ["E", "D", "B", "C", "F"], P1 + " E is at the right end.", stim="IBPSPO-T1-PZ1"),
    S(1, 2, "Linear seating", "How many persons sit between D and C?",
      ["Three", "Two", "Four", "One", "None"], P1 + " D is 1st and C is 5th, so F, A and G sit between them.", stim="IBPSPO-T1-PZ1"),
    S(1, 1, "Linear seating", "Who sits immediately to the left of B?",
      ["C", "G", "E", "A", "F"], P1 + " Facing north, left is towards the 1st seat, so the person immediately left of B (6th) is C (5th).", stim="IBPSPO-T1-PZ1"),
    S(1, 2, "Linear seating", "Which of the following pairs sit next to each other?",
      ["F and A", "D and A", "G and B", "C and E", "F and G"], P1 + " F (2nd) and A (3rd) are neighbours; none of the other pairs are.", stim="IBPSPO-T1-PZ1"),
    S(1, 2, "Linear seating", "Who sits third to the left of B?",
      ["A", "G", "F", "C", "D"], P1 + " B is 6th, so third to the left is the 3rd seat, A.", stim="IBPSPO-T1-PZ1"),
    # ---------- Practice Test 1: circular seating ----------
    S(1, 2, "Circular seating", "Who sits opposite R?",
      ["S", "U", "V", "W", "T"], P2 + " R is in the 3rd seat clockwise and S is four seats away, in the 7th.", stim="IBPSPO-T1-PZ2"),
    S(1, 2, "Circular seating", "Who sits immediately to the left of Q?",
      ["V", "W", "R", "S", "U"], P2 + " Q's immediate left is the next seat clockwise, V. W is on Q's right.", stim="IBPSPO-T1-PZ2"),
    S(1, 3, "Circular seating", "Counting clockwise from T, how many persons sit between T and V?",
      ["Three", "Two", "Four", "Five", "One"], P2 + " Clockwise from T: R, W, Q, then V. Three persons sit between them.", stim="IBPSPO-T1-PZ2"),
    S(1, 2, "Circular seating", "What is the position of U with respect to W?",
      ["Opposite W", "Second to the left of W", "Third to the right of W", "Immediately right of W", "Second to the right of W"],
      P2 + " W is in the 4th seat and U in the 8th, four seats apart, so U sits opposite W.", stim="IBPSPO-T1-PZ2"),
    S(1, 3, "Circular seating", "Which of the following is true?",
      ["S sits second to the right of P", "T sits opposite W", "R is an immediate neighbour of P",
       "V sits immediately to the left of S", "Q sits between W and R"],
      P2 + " P's right is anticlockwise: U, then S, so S is second to the right of P. T is opposite V, R is not next to P, S's immediate left is U, and Q sits between W and V.", stim="IBPSPO-T1-PZ2"),
    # ---------- Practice Test 1: floors ----------
    S(1, 1, "Floor puzzle", "Who lives on floor 2?",
      ["K", "M", "J", "N", "L"], P3, stim="IBPSPO-T1-PZ3"),
    S(1, 2, "Floor puzzle", "Which fruit does J like?",
      ["Banana", "Grapes", "Apple", "Mango", "Guava"], P3, stim="IBPSPO-T1-PZ3"),
    S(1, 2, "Floor puzzle", "How many persons live between M and J?",
      ["Two", "One", "Three", "None", "Four"], P3 + " M is on floor 1 and J on floor 4, so K and N live between them.", stim="IBPSPO-T1-PZ3"),
    S(1, 2, "Floor puzzle", "Who likes Grapes?",
      ["L", "J", "K", "N", "M"], P3, stim="IBPSPO-T1-PZ3"),
    S(1, 3, "Floor puzzle", "Which of the following combinations is correct?",
      ["N, floor 3, Mango", "K, floor 2, Banana", "M, floor 1, Apple", "J, floor 5, Grapes", "L, floor 4, Guava"],
      P3, stim="IBPSPO-T1-PZ3"),

    # ---------- Practice Test 2: row facing south ----------
    S(2, 2, "Linear seating", "Who sits at the extreme right end of the row?",
      ["Ekta", "Dev", "Arun", "Firoz", "Bela"], Q1 + " Their right is to the west, so the right end is Ekta's seat.", stim="IBPSPO-T2-PZ1"),
    S(2, 2, "Linear seating", "Who sits immediately to the left of Firoz?",
      ["Charu", "Arun", "Bela", "Ekta", "Dev"], Q1 + " Left is to the east, so the person immediately left of Firoz is Charu.", stim="IBPSPO-T2-PZ1"),
    S(2, 1, "Linear seating", "How many persons sit between Arun and Dev?",
      ["Three", "Two", "Four", "One", "None"], Q1 + " Firoz, Charu and Bela sit between Arun and Dev.", stim="IBPSPO-T2-PZ1"),
    S(2, 2, "Linear seating", "Who sits second to the left of Charu?",
      ["Dev", "Bela", "Firoz", "Arun", "Ekta"], Q1 + " Two seats east of Charu is Dev.", stim="IBPSPO-T2-PZ1"),
    S(2, 1, "Linear seating", "Which pair sits at the two ends of the row?",
      ["Ekta and Dev", "Arun and Dev", "Ekta and Bela", "Firoz and Dev", "Ekta and Charu"], Q1, stim="IBPSPO-T2-PZ1"),
    # ---------- Practice Test 2: boxes ----------
    S(2, 2, "Box puzzle", "Which box is Blue?",
      ["N", "Q", "P", "L", "M"], Q2, stim="IBPSPO-T2-PZ2"),
    S(2, 2, "Box puzzle", "How many boxes are placed between Q and M?",
      ["Two", "One", "Three", "Four", "None"], Q2 + " Q is at 3 and M at 6, so N and P are between them.", stim="IBPSPO-T2-PZ2"),
    S(2, 2, "Box puzzle", "What is the colour of box Q?",
      ["Black", "Yellow", "Red", "Blue", "Green"], Q2, stim="IBPSPO-T2-PZ2"),
    S(2, 1, "Box puzzle", "Which box is placed immediately above L?",
      ["Q", "N", "O", "P", "M"], Q2, stim="IBPSPO-T2-PZ2"),
    S(2, 3, "Box puzzle", "Which of the following is true?",
      ["P is the Yellow box", "O is placed at the top", "M is placed immediately below P", "L is the Green box", "N is placed below Q"],
      Q2 + " P is Yellow. O is at the bottom, M is above P, L is Red and N is above Q.", stim="IBPSPO-T2-PZ2"),
    # ---------- Practice Test 2: schedule ----------
    S(2, 1, "Scheduling puzzle", "Who attends the training on Wednesday?",
      ["Jaya", "Hari", "Lata", "Mohan", "Gita"], Q3, stim="IBPSPO-T2-PZ3"),
    S(2, 2, "Scheduling puzzle", "How many officers attend between Hari and Gita?",
      ["Two", "Three", "One", "Four", "None"], Q3 + " Hari is on Tuesday and Gita on Friday, so Jaya and Mohan attend between them.", stim="IBPSPO-T2-PZ3"),
    S(2, 2, "Scheduling puzzle", "On which day does Imran attend?",
      ["Saturday", "Friday", "Sunday", "Tuesday", "Monday"], Q3, stim="IBPSPO-T2-PZ3"),
    S(2, 1, "Scheduling puzzle", "Who attends on the day immediately after Mohan?",
      ["Gita", "Imran", "Jaya", "Kunal", "Hari"], Q3, stim="IBPSPO-T2-PZ3"),
    S(2, 2, "Scheduling puzzle", "Who attends on the last day of the week?",
      ["Kunal", "Imran", "Lata", "Mohan", "Gita"], Q3, stim="IBPSPO-T2-PZ3"),

    # ---------- Drill only: heights ----------
    S(0, 1, "Ranking puzzle", "Who is the third tallest?",
      ["Z", "U", "W", "Y", "X"], D1, stim="IBPSPO-D-PZ"),
    S(0, 1, "Ranking puzzle", "How many persons are shorter than W?",
      ["Two", "Three", "One", "Four", "None"], D1 + " Y and V are shorter than W.", stim="IBPSPO-D-PZ"),
    S(0, 1, "Ranking puzzle", "Who is the second shortest?",
      ["Y", "W", "V", "Z", "U"], D1, stim="IBPSPO-D-PZ"),
    S(0, 2, "Ranking puzzle", "If X is 180 cm tall and V is 150 cm tall, which of the following could be W's height?",
      ["162 cm", "185 cm", "148 cm", "150 cm", "180 cm"],
      D1 + " W is shorter than X and taller than V, and all heights differ, so W is strictly between 150 and 180 cm. Only 162 cm fits.", stim="IBPSPO-D-PZ"),
    S(0, 2, "Ranking puzzle", "Which of the following is true?",
      ["U is taller than W", "Y is taller than Z", "V is taller than Y", "Z is the tallest", "W is shorter than V"],
      D1, stim="IBPSPO-D-PZ"),
]
