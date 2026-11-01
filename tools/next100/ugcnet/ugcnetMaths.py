# Unit V Mathematical Reasoning and Aptitude. Correct option FIRST. Every
# computed key is asserted here. Options that are all numbers (with the same
# unit) are sorted and locked by build.py.
from fractions import Fraction as F

# ---- checks ----
s1 = [7, 11, 19, 35, 67]
assert [b - a for a, b in zip(s1, s1[1:])] == [4, 8, 16, 32] and s1[-1] + 64 == 131
assert [chr(ord("C") + k) for k in (0, 3, 7, 12, 18)] == ["C", "F", "J", "O", "U"]
shift = lambda w, k: "".join(chr((ord(c) - 65 + k) % 26 + 65) for c in w)
assert shift("TEACH", 2) == "VGCEJ" and shift("LEARN", 2) == "NGCTP"
assert round((1.45 * 0.84 - 1) * 100, 6) == 21.8
assert round(264 / 11 * 3.6, 6) == 86.4 and round(11 * 3.6, 6) == 39.6
s2 = [4, 6, 12, 30, 90]
assert [F(b, a) for a, b in zip(s2, s2[1:])] == [F(3, 2), 2, F(5, 2), 3] and 90 * F(7, 2) == 315
assert (8 * 27 - 41) / 7 == 25
assert round(7500 * 0.06 ** 2, 6) == 27
x = 6
assert F(4 * x + 6, 7 * x + 6) == F(5, 8) and 4 * x == 24
assert max([F(5, 8), F(7, 11), F(9, 14), F(3, 5)]) == F(9, 14)
assert round((1.15 * 1.20 - 1) * 100, 6) == 38
assert 2 * 12 * 18 / (12 + 18) == 14.4
assert round((1 - 0.88 * 0.95) * 100, 6) == 16.4
assert round(1560 / (4 * 0.075)) == 5200
mirror = lambda w: "".join(chr(155 - ord(c)) for c in w)
assert mirror("DATA") == "WZGZ"
assert [chr(ord("A") + k) for k in (0, 2, 5, 9, 14)] == ["A", "C", "F", "J", "O"]
assert [chr(ord("Z") - k) for k in (0, 2, 5, 9, 14)] == ["Z", "X", "U", "Q", "L"]
assert [n ** 3 + 3 for n in range(1, 7)] == [4, 11, 30, 67, 128, 219]
assert 9450 * 7 // 15 == 4410 and 9450 * 7 % 15 == 0 and 9450 * 3 // 15 == 1890
assert 36 * 16.5 - 35 * 16 == 34
assert round(1173 / 1.15) == 1020

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 2, "Number series",
      "What comes next in the series 7, 11, 19, 35, 67, ?",
      ["131", "99", "115", "127"],
      "The differences double: 4, 8, 16, 32, so the next difference is 64 and 67 + 64 = 131. 99 repeats the last difference of 32.",
    ),
    S(1, 2, "Letter series",
      "What comes next in the series D, E, G, J, N, ?",
      ["S", "R", "T", "Q"],
      "The gaps grow by one: D (+1) E (+2) G (+3) J (+4) N (+5) S.",
    ),
    S(1, 2, "Coding",
      "In a certain code, TEACH is written as VGCEJ. How is LEARN written in that code?",
      ["NGCTP", "NGCSP", "MFBSO", "NGBTP"],
      "Each letter moves two places forward: L to N, E to G, A to C, R to T, N to P. MFBSO moves each letter only one place.",
    ),
    S(1, 3, "Profit and loss",
      "A shopkeeper marks an article 45% above its cost price and then allows a discount of 16% on the marked price. What is the profit percentage?",
      ["21.8%", "29%", "23.2%", "16%"],
      "Selling price = 1.45 x 0.84 = 1.218 times the cost, a profit of 21.8%. Subtracting 16 from 45 to get 29% ignores that the discount is taken on the higher marked price.",
    ),
    S(1, 2, "Time and distance",
      "A train 264 metres long passes a signal post in 11 seconds. What is its speed?",
      ["86.4 km/h", "24 km/h", "39.6 km/h", "72 km/h"],
      "Speed = 264 / 11 = 24 m/s, and 24 x 18/5 = 86.4 km/h. 24 km/h forgets to convert from metres per second, and 39.6 converts the time instead of the speed.",
    ),
    # ---------- Practice Test 2 ----------
    S(2, 3, "Number series",
      "What comes next in the series 4, 6, 12, 30, 90, ?",
      ["315", "270", "180", "225"],
      "Each term is multiplied by 1.5, 2, 2.5, 3, so the next multiplier is 3.5: 90 x 3.5 = 315. 270 multiplies by 3 again.",
    ),
    S(2, 2, "Relationships",
      "Pointing to an old man, Rekha says, 'His only son is my father's father.' How is the old man related to Rekha?",
      ["Great-grandfather", "Grandfather", "Paternal grandfather", "Father-in-law"],
      "Rekha's father's father is her grandfather, and the old man is that grandfather's father, so he is Rekha's great-grandfather. 'Grandfather' stops one generation short.",
    ),
    S(2, 2, "Averages",
      "The average of eight numbers is 27. If one of the numbers, 41, is removed, what is the average of the remaining seven?",
      ["25", "24", "26", "27"],
      "The eight numbers total 8 x 27 = 216. Removing 41 leaves 175, and 175 / 7 = 25.",
    ),
    S(2, 3, "Interest",
      "What is the difference between the compound interest and the simple interest on Rs 7,500 for 2 years at 6% per annum, compounded annually?",
      ["27", "54", "45", "36"],
      "For 2 years the difference is P x (r/100)^2 = 7,500 x 0.0036 = Rs 27. 54 doubles it.",
    ),
    S(2, 3, "Ratio and proportion",
      "Two numbers are in the ratio 4 : 7. If 6 is added to each, the ratio becomes 5 : 8. What is the smaller number?",
      ["24", "30", "36", "42"],
      "Let the numbers be 4x and 7x. (4x + 6) / (7x + 6) = 5/8 gives 32x + 48 = 35x + 30, so x = 6. The numbers are 24 and 42; 30 is the smaller number after adding 6.",
    ),
    # ---------- Drill only ----------
    S(0, 2, "Fractions",
      "Which of these fractions is the largest?",
      ["9/14", "7/11", "5/8", "3/5"],
      "As decimals: 9/14 = 0.643, 7/11 = 0.636, 5/8 = 0.625 and 3/5 = 0.6.",
    ),
    S(0, 2, "Percentage",
      "The price of a book rises by 15% and then by a further 20%. What is the overall increase?",
      ["38%", "35%", "34%", "36%"],
      "1.15 x 1.20 = 1.38, so the overall rise is 38%. Adding 15 and 20 to get 35% ignores that the second rise applies to the already higher price.",
    ),
    S(0, 3, "Time and distance",
      "A cyclist rides the first half of a journey at 12 km/h and the second half, of equal length, at 18 km/h. What is the average speed for the whole journey?",
      ["14.4 km/h", "15 km/h", "14 km/h", "16 km/h"],
      "For equal distances the average speed is 2ab / (a + b) = 2 x 12 x 18 / 30 = 14.4 km/h. 15 km/h is the simple average of the speeds, which would be right only for equal times.",
    ),
    S(0, 3, "Discounting",
      "Two successive discounts of 12% and 5% are equal to a single discount of:",
      ["16.4%", "17%", "18%", "15.4%"],
      "A customer pays 0.88 x 0.95 = 0.836 of the price, so the single discount is 16.4%. Adding them to get 17% counts the second discount on the full price.",
    ),
    S(0, 2, "Interest",
      "The simple interest on a sum for 4 years at 7.5% per annum is Rs 1,560. What is the sum?",
      ["5,200", "4,680", "6,240", "5,850"],
      "Interest = P x 7.5 x 4 / 100 = 0.3P, so P = 1,560 / 0.3 = Rs 5,200.",
    ),
    S(0, 2, "Coding",
      "In a code, A is written as Z, B as Y, C as X and so on. How is DATA written?",
      ["WZGZ", "XZGZ", "WZHZ", "WAGA"],
      "Each letter is replaced by its mirror in the alphabet: D to W, A to Z, T to G, A to Z.",
    ),
    S(0, 3, "Letter series",
      "What comes next in the series AZ, CX, FU, JQ, ?",
      ["OL", "OK", "NL", "PL"],
      "First letters move +2, +3, +4, +5: A, C, F, J, O. Second letters move -2, -3, -4, -5: Z, X, U, Q, L.",
    ),
    S(0, 3, "Number series",
      "What comes next in the series 4, 11, 30, 67, 128, ?",
      ["219", "217", "211", "190"],
      "Each term is n cubed plus 3: 1 + 3, 8 + 3, 27 + 3, 64 + 3, 125 + 3, so the next is 216 + 3 = 219. 217 adds only 1 to 216, and 190 adds the last difference (61) again.",
    ),
    S(0, 2, "Relationships",
      "P is Q's sister. R is the only brother of P's mother. How is Q related to R?",
      ["Nephew or niece", "Nephew", "Son or daughter", "Cousin"],
      "R is the brother of Q's mother, so R is Q's maternal uncle and Q is R's nephew or niece. Q's sex is not given, so 'nephew' alone cannot be concluded.",
    ),
    S(0, 2, "Ratio and proportion",
      "Rs 9,450 is divided among P, Q and R in the ratio 3 : 5 : 7. What is R's share?",
      ["4,410", "3,150", "1,890", "3,780"],
      "R gets 7/15 of 9,450 = Rs 4,410. 1,890 is P's share and 3,150 is Q's.",
    ),
    S(0, 2, "Averages",
      "The average age of 35 trainees is 16 years. When the instructor's age is included, the average rises by half a year. How old is the instructor?",
      ["34", "33.5", "16.5", "51"],
      "The 36 people total 36 x 16.5 = 594 years, and the trainees total 35 x 16 = 560, so the instructor is 34. 16.5 is only the new average.",
    ),
    S(0, 2, "Profit and loss",
      "By selling an article for Rs 1,173, a trader makes a profit of 15%. What was the cost price?",
      ["1,020", "997", "1,050", "1,080"],
      "Cost = 1,173 / 1.15 = Rs 1,020. 997 subtracts 15% of the selling price instead.",
    ),
]
