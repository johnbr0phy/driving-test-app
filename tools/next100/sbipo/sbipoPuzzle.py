# Reasoning Ability: puzzles and seating arrangements (shared stimuli).
# Every puzzle was checked for a unique solution by brute force.
A1 = "Floors 1 to 7: K (Audit), P (Legal), M (IT), R (Loans), T (HR), L (Sales), N (Treasury). R is on 4, so Treasury is on 1 or 7; N is above R, so N is on 7 and L on 6. Audit is on 1 and P on 2. M is below R and two floors from K, with K lower, so K is on 1 and M on 3, leaving T on 5, the HR floor. L is not Loans, so L is Sales and R Loans."
A2 = "Clockwise from A (facing the centre, a person's left is the next seat clockwise): A, F, C, H, E, B, G, D. C is second to A's left and F between them; E is opposite A and H on E's right; D is on A's right, B second to D's right, and G takes the last seat."
A3 = "In month order: Q (January, Kochi), T (March, Pune), P (April, Shimla), U (June, Delhi), R (September, Ranchi), S (November, Bhopal). S is last, so P is third, in April. Kochi is first and T second. U and R are consecutive in the free months, June and September, which leaves January to Q. P takes Shimla, and T, not Delhi, takes Pune."
B1 = "Left to right: M, Q, J, O, K, W, L, N. K is 4th from the right, the 5th seat. Q is three seats from K and not at an end, so Q is 2nd and M 1st. N is at the other end with L beside it. O is 4th, and J, not next to K, is 3rd, leaving W 6th."
B2 = "Floors 1 to 6: Vivek (White), Sana (Red), Zara (Blue), Rohit (Silver), Uday (Black), Tanvi (Grey). Tanvi is on 6, so Blue (Zara) is on 3 and Rohit on 4. Black is on 5. Sana is on the only free even floor, 2, with Vivek below on 1, so Uday is on 5. Red is directly above White: Sana and Vivek. Tanvi has Grey."
B3 = "Most to least: H, K, F, J, G, I. I is last and G fifth. K > F > J > G, and H > K, so H is first."
D1 = "Monday to Friday: C (Savings), E (Loans), A (Insurance), B (Pensions), D (Cards). D is Friday, so C and B, three days apart, are Monday and Thursday. E is just before A in the free days Tuesday and Wednesday, and C is before A, so C is Monday and B Thursday. Loans follows C's meeting; Insurance is not Monday, so it is Wednesday and Savings Monday."
T1P1, T1P2, T1P3 = "SBIPO-T1-PZ1", "SBIPO-T1-PZ2", "SBIPO-T1-PZ3"
T2P1, T2P2, T2P3 = "SBIPO-T2-PZ1", "SBIPO-T2-PZ2", "SBIPO-T2-PZ3"
DP = "SBIPO-D-PZ"
ITEMS = [
    # ---------- Mock Test 1: floors ----------
    S(1, 1, "Floor puzzle", "Who lives on floor 5?", ["T", "L", "M", "K", "P"], A1 + " T is on floor 5.", stim=T1P1),
    S(1, 2, "Floor puzzle", "In which department does R work?", ["Loans", "Sales", "HR", "Audit", "IT"], A1, stim=T1P1),
    S(1, 2, "Floor puzzle", "How many persons live between K and L?", ["Four", "Three", "Five", "Two", "One"], A1 + " K is on 1 and L on 6, so P, M, R and T live between them.", stim=T1P1),
    S(1, 2, "Floor puzzle", "Who lives immediately above the person who works in IT?", ["R", "T", "P", "N", "L"], A1 + " IT is M on floor 3, and R is on floor 4.", stim=T1P1),
    S(1, 3, "Floor puzzle", "Which of the following combinations is correct?",
      ["T, floor 5, HR", "L, floor 6, Loans", "P, floor 2, Audit", "M, floor 3, Legal", "K, floor 2, Audit"], A1, stim=T1P1),
    # ---------- Mock Test 1: circular seating ----------
    S(1, 2, "Circular seating", "Who sits opposite F?", ["B", "G", "D", "H", "C"], A2 + " F is in the 2nd seat and B four seats on, in the 6th.", stim=T1P2),
    S(1, 2, "Circular seating", "Who sits immediately to the left of G?", ["D", "B", "A", "E", "H"], A2 + " The next seat clockwise from G is D.", stim=T1P2),
    S(1, 3, "Circular seating", "Counting clockwise from C, how many persons sit between C and B?", ["Two", "Three", "One", "Four", "Five"], A2 + " Clockwise from C: H, E, then B.", stim=T1P2),
    S(1, 2, "Circular seating", "Who sits third to the left of E?", ["D", "G", "A", "F", "B"], A2 + " Clockwise from E: B, G, D. D is third to the left.", stim=T1P2),
    S(1, 2, "Circular seating", "Which of the following pairs sit next to each other?", ["G and B", "A and C", "H and B", "F and E", "D and C"], A2, stim=T1P2),
    # ---------- Mock Test 1: months and cities ----------
    S(1, 1, "Scheduling puzzle", "Who goes to Kochi?", ["Q", "T", "U", "P", "R"], A3, stim=T1P3),
    S(1, 2, "Scheduling puzzle", "In which month does U attend?", ["June", "April", "September", "March", "January"], A3, stim=T1P3),
    S(1, 2, "Scheduling puzzle", "How many persons attend between T and R?", ["Two", "One", "Three", "Four", "None"], A3 + " P (April) and U (June) attend between T (March) and R (September).", stim=T1P3),
    S(1, 2, "Scheduling puzzle", "To which city does the person who attends in September go?", ["Ranchi", "Delhi", "Shimla", "Bhopal", "Pune"], A3, stim=T1P3),
    S(1, 2, "Scheduling puzzle", "Who attends immediately before S?", ["R", "U", "P", "T", "Q"], A3, stim=T1P3),
    # ---------- Mock Test 2: linear seating ----------
    S(2, 2, "Linear seating", "Who sits second to the right of K?", ["L", "W", "N", "O", "J"], B1, stim=T2P1),
    S(2, 2, "Linear seating", "How many persons sit between M and W?", ["Four", "Three", "Five", "Two", "Six"], B1 + " M is 1st and W 6th, so Q, J, O and K sit between them.", stim=T2P1),
    S(2, 2, "Linear seating", "Who sits exactly between J and K?", ["O", "W", "Q", "L", "M"], B1, stim=T2P1),
    S(2, 1, "Linear seating", "Which pair sits at the two ends of the row?", ["M and N", "Q and N", "M and L", "J and N", "M and W"], B1, stim=T2P1),
    S(2, 2, "Linear seating", "Who sits second to the left of L?", ["K", "O", "W", "J", "N"], B1 + " L is 7th, so second to its left is the 5th seat, K.", stim=T2P1),
    # ---------- Mock Test 2: floors and cars ----------
    S(2, 1, "Floor puzzle", "Who owns the Grey car?", ["Tanvi", "Uday", "Sana", "Vivek", "Rohit"], B2, stim=T2P2),
    S(2, 2, "Floor puzzle", "On which floor does Uday live?", ["Fifth", "First", "Second", "Fourth", "Third"], B2, stim=T2P2),
    S(2, 2, "Floor puzzle", "How many persons live between Sana and Uday?", ["Two", "One", "Three", "Four", "None"], B2 + " Zara and Rohit live between floors 2 and 5.", stim=T2P2),
    S(2, 2, "Floor puzzle", "What colour is the car of the person who lives immediately below Rohit?", ["Blue", "Red", "Black", "White", "Grey"], B2 + " Zara lives below Rohit and owns the Blue car.", stim=T2P2),
    S(2, 1, "Floor puzzle", "Who lives immediately above Vivek?", ["Sana", "Zara", "Uday", "Rohit", "Tanvi"], B2, stim=T2P2),
    # ---------- Mock Test 2: comparison ----------
    S(2, 1, "Comparison", "Who has the second-highest savings?", ["K", "H", "F", "J", "G"], B3, stim=T2P3),
    S(2, 2, "Comparison", "How many persons have less savings than F?", ["Three", "Two", "Four", "One", "Five"], B3 + " J, G and I have less than F.", stim=T2P3),
    S(2, 2, "Comparison", "Who has the third-lowest savings?", ["J", "G", "F", "I", "K"], B3 + " From the bottom: I, G, then J.", stim=T2P3),
    S(2, 2, "Comparison", "Which of the following is definitely true?",
      ["G has more savings than I", "F has more savings than K", "J has less savings than G", "K has the most savings", "I has more savings than G"], B3, stim=T2P3),
    S(2, 2, "Comparison", "Who are third and fourth when the savings are arranged from highest to lowest?",
      ["F and J", "K and F", "J and G", "H and K", "G and I"], B3, stim=T2P3),
    # ---------- Drill only ----------
    S(0, 1, "Scheduling puzzle", "On which day is A's meeting?", ["Wednesday", "Tuesday", "Thursday", "Monday", "Friday"], D1, stim=DP),
    S(0, 2, "Scheduling puzzle", "Which topic does E's meeting cover?", ["Loans", "Savings", "Insurance", "Cards", "Pensions"], D1, stim=DP),
    S(0, 2, "Scheduling puzzle", "How many meetings are held between C's and D's meetings?", ["Three", "Two", "Four", "One", "None"], D1, stim=DP),
    S(0, 2, "Scheduling puzzle", "Which topic is covered on Thursday?", ["Pensions", "Insurance", "Cards", "Loans", "Savings"], D1, stim=DP),
    S(0, 1, "Scheduling puzzle", "Whose meeting is on Savings?", ["C", "E", "A", "B", "D"], D1, stim=DP),
]
