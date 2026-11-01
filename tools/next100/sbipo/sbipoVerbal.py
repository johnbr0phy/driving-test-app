# Reasoning Ability: coding-decoding, blood relations, directions, ranking and the alphabet.
assert 45 - 20 + 1 - 16 - 1 == 9
assert 11 + 27 - 1 == 37
assert 23 - 9 - 1 == 13
assert 12 + 7 + 1 + 6 - 1 == 25
assert (9 + 7) ** 2 + (22 - 10) ** 2 == 20 ** 2
assert 8 ** 2 + (21 - 15) ** 2 == 10 ** 2
WORDS = "In a certain code language, "
ITEMS = [
    # ---------- Mock Test 1 ----------
    S(1, 1, "Coding-decoding", "In a certain code, 'DEBT' is written as 'EFCU'. How is 'FUND' written in that code?",
      ["GVOE", "ETMC", "GVOF", "HVOE", "GWOE"],
      "Each letter moves one place forward: D→E, E→F, B→C, T→U. So F→G, U→V, N→O, D→E, giving GVOE."),
    S(1, 2, "Coding-decoding", "In a certain code, 'SAFE' is written as 'FGBT'. How is 'CASH' written in that code?",
      ["ITBD", "IUBD", "GRZB", "ITCD", "DBTI"],
      "The word is reversed (SAFE → EFAS) and each letter moves one place forward (E→F, F→G, A→B, S→T). CASH reversed is HSAC, which becomes ITBD."),
    S(1, 2, "Coding-decoding", WORDS + "'gold coin bank' is written as 'ta ri mo', 'coin is safe' as 'ri pe lu' and 'safe gold rate' as 'lu ta zi'. What is the code for 'bank'?",
      ["mo", "ta", "ri", "pe", "zi"],
      "'gold' is common to the first and third sentences, so gold = ta. 'coin' is common to the first and second, so coin = ri. That leaves bank = mo."),
    S(1, 1, "Blood relations", "Pointing to a boy, Kavita said, 'He is the son of the only brother of my husband.' How is the boy related to Kavita?",
      ["Nephew", "Son", "Brother-in-law", "Cousin", "Grandson"],
      "The only brother of Kavita's husband is her brother-in-law, and his son is her nephew."),
    S(1, 2, "Blood relations", "A is the sister of B. B is the father of C, who is a boy. D is the mother of A. How is C related to D?",
      ["Grandson", "Son", "Nephew", "Grandfather", "Brother"],
      "D is the mother of A and so of A's brother B. C is B's son, so C is D's grandson."),
    S(1, 2, "Direction sense", "Ravi walks 10 m north, turns right and walks 9 m, turns right and walks 22 m, then turns left and walks 7 m. How far and in which direction is he from his starting point?",
      ["20 m south-east", "20 m north-east", "16 m south-east", "12 m south-west", "28 m south-east"],
      "He ends 9 + 7 = 16 m east and 22 − 10 = 12 m south of the start. The distance is √(16² + 12²) = 20 m, towards the south-east."),
    S(1, 2, "Direction sense", "Meera is facing west. She turns 90° clockwise and then 135° anticlockwise. Which direction is she facing now?",
      ["South-west", "North-west", "South-east", "North-east", "South"],
      "From west, 90° clockwise is north. From north, 90° anticlockwise is west and 45° more is south-west."),
    N(1, 2, "Order and ranking", "In a row of 45 students, Kavya is 16th from the left end and Mohit is 20th from the right end. How many students sit between them?",
      "9", ["7", "8", "10", "11"],
      "Mohit is 45 − 20 + 1 = 26th from the left. Between the 16th and 26th places there are 26 − 16 − 1 = 9 students."),
    S(1, 3, "Alphabet", "If the English alphabet is written in reverse order, from Z to A, which letter is 7th to the left of the 21st letter from the left?",
      ["M", "L", "N", "T", "S"],
      "In reverse order the 21st letter from the left is F, and 7th to its left is the 14th letter in the reversed list, which is M (Z is 1st, so the 14th is the 13th letter of the alphabet)."),

    # ---------- Mock Test 2 ----------
    S(2, 1, "Coding-decoding", "In a certain code, 'PRICE' is written as 'OQHBD'. How is 'STOCK' written in that code?",
      ["RSNBJ", "TUPDL", "RSNCJ", "RTNBJ", "QSNBJ"],
      "Each letter moves one place back: P→O, R→Q, I→H, C→B, E→D. So S→R, T→S, O→N, C→B, K→J, giving RSNBJ."),
    N(2, 2, "Coding-decoding", "If 'BAD' is coded as 7 because B = 2, A = 1 and D = 4 are added, how is 'FEED' coded?",
      "20", ["16", "22", "24", "26"],
      "F = 6, E = 5, E = 5 and D = 4, and 6 + 5 + 5 + 4 = 20."),
    S(2, 2, "Coding-decoding", WORDS + "'loan is easy' is written as 'ka mu so', 'easy to pay' as 'so ri ne' and 'pay the loan' as 'ne ka ti'. What is the code for 'to'?",
      ["ri", "so", "ne", "ka", "mu"],
      "easy = so (first and second), loan = ka (first and third) and pay = ne (second and third). The remaining code in the second sentence, ri, is 'to'."),
    S(2, 2, "Blood relations", "Introducing a woman, Arjun said, 'Her brother's father is my father's father's only son.' How is the woman related to Arjun?",
      ["Sister", "Wife", "Cousin", "Mother", "Sister-in-law"],
      "The only son of Arjun's grandfather is Arjun's father. The woman's brother's father is her own father, so she is a daughter of Arjun's father: Arjun's sister."),
    S(2, 2, "Blood relations", "P is the brother of Q, who is a girl. R is the wife of P. S is a son of Q's father, but S is not P. How is S related to R?",
      ["Brother-in-law", "Brother", "Son", "Father-in-law", "Husband"],
      "S is another son of the same father, so S is P's brother. The brother of R's husband is her brother-in-law."),
    S(2, 2, "Direction sense", "Sunil walks 15 m south, turns left and walks 8 m, then turns left again and walks 21 m. How far and in which direction is he from his starting point?",
      ["10 m north-east", "10 m south-east", "14 m north-east", "8 m north-west", "10 m north-west"],
      "Turning left from south faces east, and left again faces north. He ends 8 m east and 21 − 15 = 6 m north of the start, so √(8² + 6²) = 10 m to the north-east."),
    S(2, 3, "Direction sense", "If south-east is called north, north-east is called west, and every other direction is renamed in the same way, what is west called?",
      ["South-east", "North-east", "South-west", "North", "East"],
      "Each direction is turned 135° anticlockwise: south-east to north, north-east to west. Turning west 135° anticlockwise gives south-east."),
    N(2, 1, "Order and ranking", "Neha is 11th from the top and 27th from the bottom in her class. How many students are in the class?",
      "37", ["36", "38", "39", "40"],
      "Total = 11 + 27 − 1 = 37, because Neha is counted in both positions."),
    N(2, 2, "Alphabet", "How many letters lie between the 9th letter from the left and the 4th letter from the right in the English alphabet?",
      "13", ["12", "14", "15", "16"],
      "The 9th letter from the left is I and the 4th from the right is W (23rd). Between them are 23 − 9 − 1 = 13 letters."),

    # ---------- Drill only ----------
    S(0, 1, "Coding-decoding", "In a certain code, 'GOLD' is written as 'IQNF'. How is 'CASH' written in that code?",
      ["ECUJ", "DBTI", "ECUI", "EDUJ", "FCUJ"],
      "Each letter moves two places forward: G→I, O→Q, L→N, D→F. So C→E, A→C, S→U, H→J, giving ECUJ."),
    S(0, 2, "Blood relations", "K is the daughter of L. L is the brother of M. M is the mother of N. How is N related to K?",
      ["Cousin", "Brother", "Nephew", "Niece", "Uncle"],
      "L and M are brother and sister. K is L's child and N is M's child, so N is K's cousin."),
    N(0, 2, "Order and ranking", "In a queue, Raj is 12th from the front. Sita stands behind him with exactly 7 people between them, and she is 6th from the back. How many people are in the queue?",
      "25", ["23", "26", "27", "28"],
      "Sita is 12 + 7 + 1 = 20th from the front. The total is 20 + 6 − 1 = 25."),
]
