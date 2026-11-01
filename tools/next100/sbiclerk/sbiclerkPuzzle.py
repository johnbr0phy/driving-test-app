# Reasoning Ability: puzzles and seating arrangements (shared stimuli).
# Each puzzle was checked for a unique solution by brute force.
P1 = "Left to right: L, P, J, N, K, O, M. N is 4th (the middle of seven), M is three places to its right (7th), K is 5th and J, second to the left of K, is 3rd. O is immediately left of M (6th). L and P take 1st and 2nd, and P is not at an end, so P is 2nd and L 1st."
P2 = "In order: January Meera, March Rohan, April Kavya, July Nitin, September Pallavi, November Lokesh. Lokesh has November, the last month. With one person between them, Nitin has July, and Kavya the month before, April. Of January, March and September, only September has 30 days, so Pallavi has September. Meera comes before Rohan: Meera January, Rohan March."
P3 = "Clockwise from P (facing the centre, a person's left is the next seat clockwise): P, T, R, V, Q, W, S, U. Clockwise from S come U and then P. R is three seats anticlockwise of W, and T three seats anticlockwise of Q, so W and Q take the two seats just anticlockwise of S, R and T the two seats just clockwise of P, and V the seat between those pairs. V is next to R, so R sits beside V and T beside P; then Q sits beside V and W beside S."
Q1 = "Floors 1 to 6: Komal (mango), Jatin (guava), Nisha (apple), Gaurav (banana), Manoj (grapes), Isha (orange). Isha is on 6 and Manoj on 5. Gaurav is on 2 or 4; on 2, Jatin would be on 4 and Nisha on 5, which is taken, so Gaurav is on 4, Jatin on 2, Nisha on 3 and Komal on 1. Guava and apple are on adjacent floors among 2, 3 and 6, so guava is on 2 and apple on 3, leaving orange for Isha."
Q2 = "Monday to Sunday: F, C, H, B, E, G, D. B is on Thursday, so D, three days later, is on Sunday. E is on Friday and G on Saturday. F, C and H take Monday to Wednesday in that order."
Q3 = "Most to fewest: C, A, F, D, B, E. C > A > F > D, B has more than only E, so B is fifth and E last."
D1 = "Left to right: X, Z, V, Y, W. V is 3rd and W 5th, so Y is 4th. Z is 2nd, immediately left of V, and X takes 1st."
T1A, T1B, T1C = "SBICLK-T1-PZ1", "SBICLK-T1-PZ2", "SBICLK-T1-PZ3"
T2A, T2B, T2C = "SBICLK-T2-PZ1", "SBICLK-T2-PZ2", "SBICLK-T2-PZ3"
ITEMS = [
    # ---------- Mock Test 1: linear row ----------
    S(1, 1, "Linear seating", "Who sits at the extreme left end of the row?",
      ["L", "P", "J", "O", "K"], P1, stim=T1A),
    S(1, 2, "Linear seating", "How many persons sit between P and K?",
      ["Two", "One", "Three", "Four", "None"], P1 + " P is 2nd and K 5th, so J and N sit between them.", stim=T1A),
    S(1, 1, "Linear seating", "Who sits second to the right of J?",
      ["K", "N", "O", "P", "M"], P1 + " J is 3rd; second to the right is 5th, K.", stim=T1A),
    S(1, 1, "Linear seating", "Which pair sits at the two ends of the row?",
      ["L and M", "P and O", "L and O", "J and M", "P and M"], P1, stim=T1A),
    S(1, 2, "Linear seating", "What is O's position counted from the right end of the row?",
      ["Second", "First", "Third", "Fourth", "Fifth"], P1 + " O is 6th from the left of seven, so 2nd from the right.", stim=T1A),
    # ---------- Mock Test 1: exam months ----------
    S(1, 1, "Month puzzle", "In which month does Rohan take his exam?",
      ["March", "January", "April", "July", "September"], P2, stim=T1B),
    S(1, 1, "Month puzzle", "Who takes the exam in January?",
      ["Meera", "Rohan", "Kavya", "Pallavi", "Nitin"], P2, stim=T1B),
    S(1, 2, "Month puzzle", "How many persons take their exams between Meera and Kavya?",
      ["One", "None", "Two", "Three", "Four"], P2 + " Only Rohan (March) falls between Meera (January) and Kavya (April).", stim=T1B),
    S(1, 2, "Month puzzle", "Whose exam comes immediately after Kavya's?",
      ["Nitin", "Pallavi", "Rohan", "Lokesh", "Meera"], P2, stim=T1B),
    S(1, 2, "Month puzzle", "Which of the following is true?",
      ["Pallavi's exam is in September", "Lokesh's exam is in July", "Kavya's exam is in March",
       "Meera's exam is after Rohan's", "Nitin's exam is in April"], P2, stim=T1B),
    # ---------- Mock Test 1: circular table ----------
    S(1, 2, "Circular seating", "Who sits opposite T?",
      ["W", "V", "Q", "S", "U"], P3 + " T is the seat immediately clockwise of P; four seats on from T is W.", stim=T1C),
    S(1, 2, "Circular seating", "Who sits immediately to the right of Q?",
      ["V", "W", "R", "S", "T"], P3 + " A person's right is the next seat anticlockwise, so Q's immediate right is V. W is on Q's left.", stim=T1C),
    S(1, 3, "Circular seating", "How many persons sit between U and R, counting clockwise from U?",
      ["Two", "One", "Three", "Four", "Five"], P3 + " Clockwise from U come P and T, then R.", stim=T1C),
    S(1, 3, "Circular seating", "Who sits third to the left of W?",
      ["P", "U", "S", "T", "Q"], P3 + " Moving clockwise (left) from W: S, U, then P.", stim=T1C),
    S(1, 2, "Circular seating", "Which pair sits opposite each other?",
      ["R and S", "T and V", "U and W", "P and V", "Q and T"], P3, stim=T1C),

    # ---------- Mock Test 2: floors and fruits ----------
    S(2, 1, "Floor puzzle", "Who likes apple?",
      ["Nisha", "Jatin", "Gaurav", "Komal", "Isha"], Q1, stim=T2A),
    L(2, 2, "Floor puzzle", "On which floor does the person who likes guava live?",
      ["Floor 1", "Floor 2", "Floor 3", "Floor 4", "Floor 5"], 1, Q1, stim=T2A),
    S(2, 2, "Floor puzzle", "How many persons live between Komal and Manoj?",
      ["Three", "Two", "Four", "One", "None"], Q1 + " Komal is on 1 and Manoj on 5, so Jatin, Nisha and Gaurav live between them.", stim=T2A),
    S(2, 1, "Floor puzzle", "Which fruit does Isha like?",
      ["Orange", "Apple", "Guava", "Grapes", "Banana"], Q1, stim=T2A),
    S(2, 2, "Floor puzzle", "Who lives immediately above the person who likes apple?",
      ["Gaurav", "Manoj", "Jatin", "Isha", "Komal"], Q1 + " Apple is Nisha's, on floor 3; Gaurav is on floor 4.", stim=T2A),
    # ---------- Mock Test 2: days of the week ----------
    S(2, 1, "Day puzzle", "Who attends on Wednesday?",
      ["H", "C", "F", "B", "G"], Q2, stim=T2B),
    S(2, 2, "Day puzzle", "How many persons attend between F and E?",
      ["Three", "Two", "Four", "One", "Five"], Q2 + " C, H and B attend between Monday (F) and Friday (E).", stim=T2B),
    S(2, 1, "Day puzzle", "On which day does C attend?",
      ["Tuesday", "Monday", "Wednesday", "Saturday", "Friday"], Q2, stim=T2B),
    S(2, 2, "Day puzzle", "Who attends on the day immediately after G?",
      ["D", "E", "B", "H", "F"], Q2, stim=T2B),
    S(2, 2, "Day puzzle", "Which of the following is true?",
      ["E attends on Friday", "B attends after E", "D attends on Saturday", "H attends before C", "F attends on Tuesday"], Q2, stim=T2B),
    # ---------- Mock Test 2: number of books ----------
    S(2, 1, "Comparison", "Who has the most books?",
      ["C", "A", "F", "D", "B"], Q3, stim=T2C),
    S(2, 2, "Comparison", "Who has the third-highest number of books?",
      ["F", "A", "D", "C", "B"], Q3, stim=T2C),
    S(2, 2, "Comparison", "How many persons have more books than D?",
      ["Three", "Two", "Four", "One", "Five"], Q3 + " C, A and F have more books than D.", stim=T2C),
    N(2, 3, "Comparison", "If D has 6 more books than B, which of the following could be the number of F's books?",
      "31", ["18", "22", "24", "46"],
      Q3 + " D has 18 + 6 = 24. F has more than D (24) and fewer than A, who has fewer than C (45). Of the options only 31 lies between 24 and 45.", stim=T2C, fixed=True),
    S(2, 2, "Comparison", "Who has fewer books than F but more books than B?",
      ["D", "A", "E", "C", "None of them"], Q3, stim=T2C),

    # ---------- Drill only: five in a row ----------
    S(0, 1, "Linear seating", "Who sits at the left end of the row?",
      ["X", "Z", "Y", "V", "W"], D1, stim="SBICLK-D-PZ"),
    S(0, 1, "Linear seating", "Who sits second to the right of Z?",
      ["Y", "V", "W", "X", "None of them"], D1 + " Z is 2nd; second to the right is 4th, Y.", stim="SBICLK-D-PZ"),
    S(0, 2, "Linear seating", "How many persons sit between X and Y?",
      ["Two", "One", "Three", "None", "Four"], D1 + " Z and V sit between X (1st) and Y (4th).", stim="SBICLK-D-PZ"),
]
