"""CogAT Quantitative Battery items, Levels 9 to 12 (grades 3 to 6). Original items.

Riverside's descriptions (CogAT Overview Brochure, Forms 7 and 8):
  Test 4 Number Analogies: the Verbal Analogies process with quantitative concepts.
  Test 5 Number Puzzles: an equation in which elements are missing; substitute and solve.
  Test 6 Number Series: find the rule the numbers follow, then the next number.
Every key is computed and checked by build.py; options are numbers, sorted and locked.
"""

# (difficulty, [(a, b), (a, b)], c, rule(x), rule in words, [three wrong answers])
# Two complete pairs fix the rule; the third pair is finished with rule(c).
ANALOGIES = [
    (1, [(3, 7), (10, 14)], 6, lambda x: x + 4, "add 4", [9, 11, 14]),
    (1, [(9, 6), (15, 12)], 20, lambda x: x - 3, "subtract 3", [16, 18, 23]),
    (1, [(4, 8), (7, 14)], 9, lambda x: x * 2, "multiply by 2", [11, 16, 81]),
    (1, [(6, 3), (10, 5)], 14, lambda x: x // 2, "divide by 2", [8, 12, 28]),
    (1, [(5, 15), (23, 33)], 41, lambda x: x + 10, "add 10", [50, 52, 61]),
    (2, [(2, 6), (5, 15)], 8, lambda x: x * 3, "multiply by 3", [11, 21, 27]),
    (1, [(12, 7), (30, 25)], 18, lambda x: x - 5, "subtract 5", [8, 14, 23]),
    (2, [(9, 3), (21, 7)], 27, lambda x: x // 3, "divide by 3", [6, 8, 24]),
    (1, [(4, 10), (9, 15)], 13, lambda x: x + 6, "add 6", [17, 18, 20]),
    (2, [(3, 30), (6, 60)], 8, lambda x: x * 10, "multiply by 10", [18, 88, 800]),
    (2, [(2, 10), (4, 20)], 7, lambda x: x * 5, "multiply by 5", [12, 30, 40]),
    (2, [(15, 8), (20, 13)], 31, lambda x: x - 7, "subtract 7", [23, 25, 38]),
    (2, [(8, 2), (20, 5)], 36, lambda x: x // 4, "divide by 4", [8, 12, 32]),
    (3, [(4, 3), (10, 6)], 16, lambda x: x // 2 + 1, "divide by 2, then add 1", [8, 10, 17]),
    (3, [(3, 7), (5, 11)], 8, lambda x: x * 2 + 1, "multiply by 2, then add 1", [13, 16, 18]),
    (3, [(4, 7), (6, 11)], 9, lambda x: x * 2 - 1, "multiply by 2, then subtract 1", [14, 16, 18]),
    (2, [(3, 12), (5, 20)], 9, lambda x: x * 4, "multiply by 4", [13, 27, 45]),
    (2, [(10, 25), (32, 47)], 50, lambda x: x + 15, "add 15", [55, 60, 75]),
    (1, [(40, 30), (65, 55)], 91, lambda x: x - 10, "subtract 10", [71, 80, 82]),
    (2, [(15, 3), (40, 8)], 55, lambda x: x // 5, "divide by 5", [10, 12, 50]),
    (2, [(2, 12), (5, 30)], 7, lambda x: x * 6, "multiply by 6", [13, 35, 49]),
    (1, [(7, 16), (21, 30)], 36, lambda x: x + 9, "add 9", [44, 46, 54]),
    (2, [(30, 3), (70, 7)], 120, lambda x: x // 10, "divide by 10", [13, 102, 110]),
    (3, [(2, 7), (4, 13)], 6, lambda x: x * 3 + 1, "multiply by 3, then add 1", [16, 18, 20]),
    (3, [(3, 7), (5, 13)], 8, lambda x: x * 3 - 2, "multiply by 3, then subtract 2", [21, 23, 24]),
    (3, [(3, 9), (4, 16)], 6, lambda x: x * x, "multiply the number by itself", [12, 18, 24]),
    (3, [(10, 4), (16, 7)], 22, lambda x: x // 2 - 1, "divide by 2, then subtract 1", [9, 11, 12]),
    (2, [(3, 21), (4, 28)], 6, lambda x: x * 7, "multiply by 7", [13, 36, 48]),
    (2, [(20, 8), (35, 23)], 50, lambda x: x - 12, "subtract 12", [37, 39, 62]),
    (2, [(2, 16), (5, 40)], 7, lambda x: x * 8, "multiply by 8", [15, 49, 63]),
    (1, [(25, 50), (40, 65)], 75, lambda x: x + 25, "add 25", [90, 95, 125]),
    (3, [(1, 5), (4, 11)], 6, lambda x: x * 2 + 3, "multiply by 2, then add 3", [9, 12, 14]),
    (3, [(2, 9), (3, 13)], 5, lambda x: x * 4 + 1, "multiply by 4, then add 1", [16, 20, 25]),
    (3, [(6, 4), (12, 6)], 18, lambda x: x // 3 + 2, "divide by 3, then add 2", [7, 9, 20]),
]

# (difficulty, equation with ?, key, [three wrong answers], how to solve it)
# The equation is linear in ?, so one number makes it true; build.py checks the key
# makes it true and every wrong answer makes it false. Answers may be fractions.
PUZZLES = [
    (1, "? + 5 = 12", "7", ["6", "8", "17"], "Take 5 from 12: 12 − 5 = 7, and 7 + 5 = 12."),
    (1, "? − 4 = 9", "13", ["5", "12", "14"], "Add 4 back: 9 + 4 = 13, and 13 − 4 = 9."),
    (1, "8 + ? = 15", "7", ["6", "8", "23"], "15 − 8 = 7, so 8 + 7 = 15."),
    (1, "? = 6 + 3 + 4", "13", ["9", "12", "14"], "6 + 3 = 9 and 9 + 4 = 13."),
    (1, "20 − ? = 12", "8", ["7", "9", "32"], "20 − 12 = 8, so 20 − 8 = 12. Adding the numbers to get 32 goes the wrong way."),
    (1, "? × 4 = 24", "6", ["5", "7", "20"], "24 ÷ 4 = 6, and 6 × 4 = 24."),
    (2, "? ÷ 3 = 5", "15", ["8", "12", "18"], "Multiply back: 5 × 3 = 15, and 15 ÷ 3 = 5."),
    (2, "? = 7 × 3 − 1", "20", ["18", "21", "22"], "Multiply first: 7 × 3 = 21, then 21 − 1 = 20."),
    (2, "? + 9 = 4 + 11", "6", ["5", "7", "24"], "The right side is 4 + 11 = 15, and 15 − 9 = 6."),
    (2, "18 − ? = 3 × 4", "6", ["5", "7", "14"], "3 × 4 = 12, and 18 − 12 = 6."),
    (2, "? × 5 = 30 + 5", "7", ["6", "8", "35"], "30 + 5 = 35, and 35 ÷ 5 = 7, so 7 × 5 = 35."),
    (2, "? ÷ 4 = 2 + 3", "20", ["5", "16", "24"], "2 + 3 = 5, and 5 × 4 = 20, so 20 ÷ 4 = 5."),
    (2, "? = 48 ÷ 6 + 2", "10", ["6", "8", "12"], "Divide first: 48 ÷ 6 = 8, then 8 + 2 = 10. Adding 6 + 2 first would give 6, which breaks the order of operations."),
    (2, "25 + ? = 40 − 5", "10", ["5", "15", "20"], "40 − 5 = 35, and 35 − 25 = 10."),
    (3, "? − 15 = 6 × 3", "33", ["3", "18", "32"], "6 × 3 = 18, and 18 + 15 = 33."),
    (3, "? × 3 = 7 × 6", "14", ["12", "13", "42"], "7 × 6 = 42, and 42 ÷ 3 = 14."),
    (2, "100 − ? = 64", "36", ["34", "44", "46"], "100 − 64 = 36. Check: 100 − 36 = 64."),
    (1, "? = 9 × 6", "54", ["45", "56", "63"], "9 × 6 = 54: six groups of 9 make 54. Check: 54 ÷ 9 = 6."),
    (1, "7 × ? = 56", "8", ["7", "9", "49"], "56 ÷ 7 = 8, and 7 × 8 = 56."),
    (2, "? ÷ 5 = 9", "45", ["14", "40", "54"], "9 × 5 = 45, and 45 ÷ 5 = 9."),
    (1, "? + 27 = 50", "23", ["22", "33", "77"], "50 − 27 = 23. Check: 23 + 27 = 50."),
    (2, "? = 100 − 37", "63", ["53", "67", "73"], "100 − 37 = 63. Check: 63 + 37 = 100."),
    (2, "6 × ? = 4 × 9", "6", ["4", "9", "30"], "4 × 9 = 36, and 36 ÷ 6 = 6."),
    (2, "? − 8 = 8 × 2", "24", ["16", "20", "32"], "8 × 2 = 16, and 16 + 8 = 24."),
    (2, "? × 2 + 3 = 17", "7", ["6", "8", "10"], "Undo the steps backward: 17 − 3 = 14, then 14 ÷ 2 = 7."),
    (3, "? × 3 − 4 = 20", "8", ["7", "9", "16"], "Undo the steps backward: 20 + 4 = 24, then 24 ÷ 3 = 8."),
    (3, "? ÷ 2 + 6 = 15", "18", ["9", "16", "42"], "Undo the steps backward: 15 − 6 = 9, then 9 × 2 = 18."),
    (3, "40 ÷ ? = 2 × 4", "5", ["4", "8", "10"], "2 × 4 = 8, and 40 ÷ 8 = 5, so 40 ÷ 5 = 8."),
    (3, "? + 1.5 = 4", "2.5", ["2", "3", "5.5"], "4 − 1.5 = 2.5. Check: 2.5 + 1.5 = 4."),
    (2, "? × 10 = 350", "35", ["25", "34", "3500"], "350 ÷ 10 = 35. Multiplying instead gives 3500, the wrong way."),
    (3, "? = 3 × (4 + 5)", "27", ["12", "17", "32"], "Work inside the brackets first: 4 + 5 = 9, then 3 × 9 = 27. 3 × 4 + 5 = 17 ignores the brackets."),
    (3, "(? + 4) × 2 = 22", "7", ["9", "11", "13"], "Undo the steps backward: 22 ÷ 2 = 11, then 11 − 4 = 7."),
    (3, "? − 1/4 = 1/2", "3/4", ["1/4", "2/6", "1"], "Add 1/4 back: 1/2 = 2/4, and 2/4 + 1/4 = 3/4. 2/6 comes from adding the tops and the bottoms, which is not how fractions add."),
    (2, "? ÷ 6 = 4 + 3", "42", ["7", "36", "48"], "4 + 3 = 7, and 7 × 6 = 42, so 42 ÷ 6 = 7."),
]

# (difficulty, shown terms, rule(i) for term i from 0, rule in words, [three wrong answers])
# The key is rule(len(terms)); build.py checks every shown term against the rule.
_FIB = [1, 1, 2, 3, 5, 8, 13, 21]
_PRIMES = [2, 3, 5, 7, 11, 13, 17]
SERIES = [
    (1, [2, 4, 6, 8, 10], lambda i: 2 * i + 2, "Each number is 2 more than the one before", [11, 14, 20]),
    (1, [5, 10, 15, 20, 25], lambda i: 5 * i + 5, "Each number is 5 more than the one before", [26, 35, 50]),
    (1, [30, 27, 24, 21, 18], lambda i: 30 - 3 * i, "Each number is 3 less than the one before", [12, 16, 21]),
    (2, [1, 2, 4, 8, 16], lambda i: 2 ** i, "Each number is double the one before", [18, 24, 64]),
    (1, [7, 11, 15, 19, 23], lambda i: 7 + 4 * i, "Each number is 4 more than the one before", [25, 28, 31]),
    (1, [50, 45, 40, 35, 30], lambda i: 50 - 5 * i, "Each number is 5 less than the one before", [20, 24, 26]),
    (1, [4, 10, 16, 22, 28], lambda i: 6 * i + 4, "Each number is 6 more than the one before", [32, 33, 36]),
    (2, [2, 3, 5, 8, 12], lambda i: 2 + i * (i + 1) // 2, "The jumps grow by one each time: add 1, then 2, then 3, then 4, then 5", [15, 16, 20]),
    (2, [3, 9, 27, 81], lambda i: 3 ** (i + 1), "Each number is 3 times the one before", [108, 162, 324]),
    (2, [96, 48, 24, 12, 6], lambda i: 96 // 2 ** i, "Each number is half of the one before", [0, 2, 4]),
    (1, [12, 24, 36, 48, 60], lambda i: 12 * (i + 1), "Each number is 12 more than the one before", [62, 70, 84]),
    (3, [1, 4, 9, 16, 25], lambda i: (i + 1) ** 2, "The numbers are 1 × 1, 2 × 2, 3 × 3, 4 × 4 and 5 × 5, so the next is 6 × 6", [30, 34, 49]),
    (3, [5, 7, 6, 8, 7], lambda i: 5 + i // 2 if i % 2 == 0 else 7 + i // 2, "The rule switches between add 2 and subtract 1", [6, 8, 10]),
    (3, [100, 90, 81, 73, 66], lambda i: 100 - sum(range(11 - i, 11)), "The jumps shrink by one: subtract 10, then 9, then 8, then 7, then 6", [56, 59, 61]),
    (2, [2, 6, 18, 54], lambda i: 2 * 3 ** i, "Each number is 3 times the one before", [72, 108, 216]),
    (3, [4, 8, 7, 14, 13], lambda i: [4, 8, 7, 14, 13, 26, 25][i], "The rule switches between multiply by 2 and subtract 1", [12, 25, 27]),
    (3, [1, 1, 2, 3, 5, 8], lambda i: _FIB[i], "Each number is the sum of the two before it, so 5 + 8 comes next", [11, 12, 16]),
    (2, [20, 18, 15, 11, 6], lambda i: 20 - sum(range(2, i + 2)), "The jumps grow by one: subtract 2, then 3, then 4, then 5, then 6", [1, 2, 3]),
    (2, [3, 4, 6, 7, 9, 10], lambda i: 3 + (i // 2) * 3 + (i % 2), "The rule switches between add 1 and add 2", [11, 13, 14]),
    (2, [625, 125, 25, 5], lambda i: 625 // 5 ** i, "Each number is the one before divided by 5", [0, 2, 5]),
    (1, [11, 22, 33, 44, 55], lambda i: 11 * (i + 1), "Each number is 11 more than the one before", [56, 65, 77]),
    (3, [2, 5, 11, 23, 47], lambda i: 3 * 2 ** i - 1, "Each number is double the one before, plus 1", [71, 94, 96]),
    (3, [6, 12, 10, 20, 18], lambda i: [6, 12, 10, 20, 18, 36][i], "The rule switches between multiply by 2 and subtract 2", [16, 34, 38]),
    (2, ["0.5", "1", "1.5", "2", "2.5"], None, "Each number is 0.5 more than the one before", ["2.6", "3.5", "5"]),
    (1, [9, 18, 27, 36, 45], lambda i: 9 * (i + 1), "Each number is 9 more than the one before", [46, 55, 63]),
    (2, [2, 4, 8, 14, 22], lambda i: 2 + i * (i + 1), "The jumps grow by two: add 2, then 4, then 6, then 8, then 10", [30, 34, 44]),
    (3, [40, 36, 33, 29, 26], lambda i: 40 - (i // 2) * 7 - (i % 2) * 4, "The rule switches between subtract 4 and subtract 3", [21, 23, 24]),
    (2, [1, 10, 100, 1000], lambda i: 10 ** i, "Each number is 10 times the one before", [1100, 2000, 100000]),
    (3, [15, 13, 16, 14, 17], lambda i: 15 + (i // 2) - (i % 2) * 2, "The rule switches between subtract 2 and add 3", [14, 18, 19]),
    (3, [1, 8, 27, 64], lambda i: (i + 1) ** 3, "The numbers are 1 × 1 × 1, 2 × 2 × 2, 3 × 3 × 3 and 4 × 4 × 4, so the next is 5 × 5 × 5", [81, 100, 128]),
    (1, [7, 14, 21, 28, 35], lambda i: 7 * (i + 1), "Each number is 7 more than the one before", [36, 40, 49]),
    (2, [256, 128, 64, 32], lambda i: 256 // 2 ** i, "Each number is half of the one before", [8, 24, 28]),
    (3, [3, 5, 9, 17, 33], lambda i: 2 ** (i + 1) + 1, "The jumps double each time: add 2, then 4, then 8, then 16, then 32", [49, 57, 66]),
    (3, [2, 3, 5, 7, 11], lambda i: _PRIMES[i], "These are the prime numbers, which can only be divided evenly by 1 and themselves; the next prime after 11 is 13", [12, 14, 15]),
]
