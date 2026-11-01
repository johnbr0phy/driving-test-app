# Reasoning Ability: coding-decoding, blood relations, directions, ranking,
# alphabet and letter series, and odd one out.
def shift(w, k, rev=False):
    w = w[::-1] if rev else w
    return "".join(chr((ord(c) - 65 + k) % 26 + 65) for c in w)


assert shift("CASH", 1) == "DBTI" and shift("NOTE", 1) == "OPUF"
assert shift("BANK", 1, True) == "LOBC" and shift("FUND", 1, True) == "EOVG"
assert 61 - 23 + 1 == 39 and 17 + 24 - 1 == 40 and chr(64 + 15 + 7) == "V"
assert "".join(sorted("MARKET"))[-3] == "M"
assert shift("DESK", 2) == "FGUM" and shift("CHAIR", 2) == "EJCKT"
assert sum(ord(c) - 64 for c in "FACE") == 15
assert chr(90 - 9) == "Q"
assert [ord(c) - 64 for c in "BEINT"] == [2, 5, 9, 14, 20]
w = "GARDEN"
assert sum(1 for i in range(6) for j in range(i + 1, 6) if abs(ord(w[i]) - ord(w[j])) == j - i) == 2
assert [ord(c) - 64 for c in "CUP"] == [3, 21, 16] and (9 ** 2 + 12 ** 2) ** 0.5 == 15
ITEMS = [
    # ---------- Mock Test 1 ----------
    S(1, 1, "Coding-decoding", "In a certain code, CASH is written as DBTI. How is NOTE written in that code?",
      ["OPUF", "MNSD", "OPUE", "PQVG", "OOUF"],
      "Each letter moves one place forward: C→D, A→B, S→T, H→I. So N→O, O→P, T→U, E→F: OPUF."),
    S(1, 2, "Coding-decoding", "In a certain code, BANK is written as LOBC. How is FUND written in that code?",
      ["EOVG", "GVOE", "EOVF", "DNUF", "FPWH"],
      "The word is reversed and each letter moved one place forward: BANK → KNAB → LOBC. FUND → DNUF → EOVG."),
    S(1, 2, "Coding-decoding", "In a certain code language, 'pay bill now' is written as 'ko ru ta', 'bill is due' as 'ta mi le' and 'now or later' as 'ru si vo'. What is the code for 'pay'?",
      ["ko", "ta", "ru", "mi", "si"],
      "'Bill' appears in the first two sentences, and so does 'ta'. 'Now' appears in the first and third, and so does 'ru'. The code left for 'pay' is 'ko'."),
    S(1, 2, "Blood relations", "Pointing to a girl, Ramesh says, \"Her mother is the only sister of my wife.\" How is the girl related to Ramesh?",
      ["Niece", "Daughter", "Sister", "Cousin", "Aunt"],
      "The girl's mother is Ramesh's wife's sister, his sister-in-law. Her daughter is Ramesh's niece."),
    S(1, 3, "Blood relations", "A is the brother of B. C is the mother of A. D is the father of C. How is B related to D?",
      ["Grandchild", "Grandson", "Granddaughter", "Son", "Nephew"],
      "B is a child of C (A's brother's sibling shares the mother C), and C is D's daughter, so B is D's grandchild. B's gender is not given, so neither 'grandson' nor 'granddaughter' is certain."),
    S(1, 2, "Direction sense", "Nikhil walks 6 km north, turns right and walks 8 km, then turns right again and walks 6 km. How far is he from his starting point, and in which direction?",
      ["8 km East", "8 km West", "10 km North-east", "14 km East", "6 km South"],
      "After 6 km north and 8 km east, turning right faces him south. 6 km south brings him back level with the start, 8 km to its east."),
    S(1, 1, "Direction sense", "Farhan is facing south. He turns 135° clockwise and then 45° anticlockwise. Which direction is he facing now?",
      ["West", "North-west", "South-west", "East", "North"],
      "From south, 90° clockwise is west and 135° is north-west. Turning back 45° anticlockwise leaves him facing west."),
    N(1, 1, "Ranking", "In a row of 61 students, Payal is 23rd from the left end. What is her position from the right end?",
      "39th", ["37th", "38th", "40th", "41st"],
      "Position from the right = total − position from the left + 1 = 61 − 23 + 1 = 39th."),
    S(1, 2, "Alphabet", "Which letter is 7th to the right of the 15th letter from the left in the English alphabet?",
      ["V", "U", "W", "H", "X"],
      "The 15th letter is O. Seven places to its right is the 22nd letter, V."),
    S(1, 1, "Letter series", "Which letter pair comes next in the series? AY, BX, CW, DV, ?",
      ["EU", "EV", "FU", "DU", "ET"],
      "The first letters move forward (A, B, C, D, E) and the second letters move backward (Y, X, W, V, U): EU."),
    S(1, 2, "Alphabet", "If the letters of the word MARKET are arranged in alphabetical order, which letter will be third from the right?",
      ["M", "K", "R", "E", "T"],
      "In alphabetical order the letters are A, E, K, M, R, T. Third from the right is M."),
    N(1, 2, "Odd one out", "Find the odd one out: 64, 100, 144, 160, 196",
      "160", ["64", "100", "144", "196"],
      "64, 100, 144 and 196 are the squares of 8, 10, 12 and 14. 160 is not a perfect square.", fixed=True),

    # ---------- Mock Test 2 ----------
    S(2, 1, "Coding-decoding", "In a certain code, DESK is written as FGUM. How is CHAIR written in that code?",
      ["EJCKT", "EJCKS", "DIBJS", "FKDLU", "EICKT"],
      "Each letter moves two places forward: D→F, E→G, S→U, K→M. So C→E, H→J, A→C, I→K, R→T: EJCKT."),
    N(2, 2, "Coding-decoding", "If A = 1, B = 2, C = 3 and so on, and CAB is coded as 6 (3 + 1 + 2), what is the code for FACE?",
      "15", ["13", "14", "16", "17"],
      "F = 6, A = 1, C = 3 and E = 5. 6 + 1 + 3 + 5 = 15."),
    S(2, 2, "Coding-decoding", "In a certain code language, 'bank gives loan' is written as 'ri su ka', 'loan is cheap' as 'ka nu te' and 'cheap and best' as 'te pa li'. What is the code for 'is'?",
      ["nu", "ka", "te", "ri", "pa"],
      "'Loan' is common to the first two sentences, and so is 'ka'. 'Cheap' is common to the last two, and so is 'te'. The code left for 'is' in 'ka nu te' is 'nu'."),
    S(2, 2, "Blood relations", "Introducing a man, Sunita said, \"He is the father of my husband's only brother.\" How is the man related to Sunita?",
      ["Father-in-law", "Father", "Brother-in-law", "Uncle", "Husband"],
      "The father of Sunita's husband's brother is also her husband's father. So the man is Sunita's father-in-law."),
    S(2, 2, "Blood relations", "M is the mother of N. N is the brother of O. O is the wife of K. How is K related to M?",
      ["Son-in-law", "Son", "Brother", "Nephew", "Husband"],
      "O is N's sister, so O is M's daughter. K is O's husband, so K is M's son-in-law."),
    S(2, 3, "Direction sense", "Asha walks 10 m south, turns left and walks 15 m, turns left again and walks 10 m, then turns right and walks 5 m. How far is she from her starting point, and in which direction?",
      ["20 m East", "15 m East", "20 m West", "25 m East", "10 m North"],
      "Facing south, a left turn faces east (15 m). Another left faces north (10 m), which brings her back level with the start, 15 m east of it. A right turn faces east again: 5 m more makes 20 m east."),
    S(2, 1, "Direction sense", "A clock is placed flat on a table so that, at 12:00, its minute hand points north. In which direction will the hour hand point at 3:00?",
      ["East", "West", "South", "North", "North-east"],
      "The 12 on the dial points north, so the 3, a quarter turn clockwise, points east. At 3:00 the hour hand points to the 3: east."),
    N(2, 1, "Ranking", "Arun is 17th from the top and 24th from the bottom in his class. How many students are in the class?",
      "40", ["38", "39", "41", "42"],
      "Total = 17 + 24 − 1 = 40. (Arun is counted in both positions, so subtract 1.)"),
    S(2, 2, "Alphabet", "If the English alphabet is written in reverse order, which letter will be 10th from the left?",
      ["Q", "P", "R", "J", "K"],
      "In reverse order the 10th letter from the left is the 10th from the end of the normal alphabet: 26 − 10 + 1 = 17th, Q."),
    S(2, 2, "Letter series", "Which letter comes next in the series? G, I, L, P, ?",
      ["U", "T", "V", "S", "W"],
      "The gaps grow by one: G (+2) I (+3) L (+4) P (+5) U."),
    S(2, 3, "Letter pairs", "How many pairs of letters in the word GARDEN have as many letters between them in the word as in the English alphabet?",
      ["Two", "One", "Three", "Four", "None"],
      "G and D have two letters between them in the word (A, R) and in the alphabet (E, F). D and E are next to each other in both. No other pair matches, so there are two."),

    S(2, 2, "Odd one out", "Choose the odd pair: 3 : 9, 5 : 25, 7 : 49, 8 : 56, 11 : 121",
      ["8 : 56", "3 : 9", "5 : 25", "7 : 49", "11 : 121"],
      "In every other pair the second number is the square of the first. 8² is 64, not 56."),

    # ---------- Drill only ----------
    S(0, 1, "Coding-decoding", "If BAT is coded as 2-1-20, how is CUP coded?",
      ["3-21-16", "3-20-16", "4-21-16", "3-21-15", "2-21-16"],
      "Each letter is replaced by its position in the alphabet: C = 3, U = 21, P = 16."),
    S(0, 2, "Blood relations", "A's mother is the sister of B, and B is a man. How is B related to A?",
      ["Maternal uncle", "Father", "Brother", "Cousin", "Grandfather"],
      "B is the brother of A's mother, which makes him A's maternal uncle."),
    N(0, 1, "Direction sense", "Rahul walks 16 km west and then 12 km south. What is the shortest distance between him and his starting point?",
      "20 km", ["4 km", "14 km", "24 km", "28 km"],
      "The two walks form a right angle, so the distance is √(16² + 12²) = √400 = 20 km. (28 km is the distance walked, not the distance from the start.)"),
]
