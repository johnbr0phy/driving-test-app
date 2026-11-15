# QA: number system, combinatorics and probability. Every answer asserted.
from fractions import Fraction as Fr
from math import comb, factorial, gcd
from itertools import permutations
assert pow(2, 100, 7) == 2
assert sum(1 for k in range(1, 361) if 360 % k == 0) == 24
assert comb(4, 2) * comb(6, 1) == 36
assert 15 * 450 // 90 == 75 and gcd(90, 75) == 15 and 90 * 75 // gcd(90, 75) == 450
assert pow(3, 47, 10) == 7
assert Fr(sum(1 for a in range(1, 7) for b in range(1, 7) if a + b == 8), 36) == Fr(5, 36)
assert sum(100 // 5 ** k for k in range(1, 4)) == 24
assert all(240 % k == 0 for k in (16, 24, 40)) and all(not all(n % k == 0 for k in (16, 24, 40)) for n in range(1, 240))
assert len(set(permutations("LEVEL"))) == 30
assert pow(17, 23, 16) == 1
assert sum(k for k in range(1, 37) if 36 % k == 0) == 91
assert 1 - Fr(1, 16) == Fr(15, 16)
assert sum(1 for p in permutations(range(5)) if abs(p.index(0) - p.index(1)) == 1) == 48
assert sum(range(3, 100, 3)) == 1683
assert gcd(144, 252) == 36

ITEMS = [
    # ---------- Test 1 ----------
    T(1, 3, "Remainders", "What is the remainder when $2^{100}$ is divided by 7?",
      "2", "$2^3 = 8$ leaves remainder 1 on division by 7. Since $2^{100} = (2^3)^{33} \\times 2$, the remainder is $1 \\times 2 = 2$."),
    T(1, 2, "Factors", "How many positive factors does 360 have?",
      "24", "$360 = 2^3 \\times 3^2 \\times 5$, so the number of factors is (3 + 1)(2 + 1)(1 + 1) = 24."),
    N(1, 2, "Combinations", "A committee of 3 is to be chosen from 6 men and 4 women. In how many ways can it be formed with exactly 2 women?",
      "36", ["24", "48", "60"], "Choose 2 of the 4 women in 6 ways and 1 of the 6 men in 6 ways: 6 x 6 = 36."),
    # ---------- Test 2 ----------
    T(2, 2, "HCF and LCM", "The HCF of two numbers is 15 and their LCM is 450. If one of them is 90, what is the other?",
      "75", "For two numbers, HCF x LCM = product, so the other is 15 x 450 / 90 = 75. Check: HCF(90, 75) = 15 and LCM = 450."),
    T(2, 2, "Unit digits", "What is the units digit of $3^{47}$?",
      "7", "Units digits of powers of 3 repeat 3, 9, 7, 1. Since 47 leaves remainder 3 on division by 4, the units digit is the third in the cycle, 7."),
    S(2, 2, "Probability", "Two fair dice are thrown. What is the probability that the numbers shown add up to 8?",
      ["5/36", "1/6", "7/36", "1/9"],
      "The pairs (2, 6), (3, 5), (4, 4), (5, 3) and (6, 2) give 8: 5 of the 36 equally likely outcomes. A total of 7 would have 6 ways, 1/6."),
    # ---------- Drill only ----------
    T(0, 2, "Factorials", "How many zeros are there at the end of 100! (100 factorial)?",
      "24", "Each trailing zero needs a factor 5. 100/5 = 20 multiples of 5 and 100/25 = 4 multiples of 25 give 20 + 4 = 24."),
    T(0, 1, "LCM", "What is the smallest positive number divisible by 16, 24 and 40?",
      "240", "$16 = 2^4$, $24 = 2^3 \\times 3$ and $40 = 2^3 \\times 5$, so the LCM takes the highest power of each prime: $2^4 \\times 3 \\times 5 = 240$."),
    T(0, 2, "Permutations", "In how many different ways can the letters of the word LEVEL be arranged?",
      "30", "Five letters with L twice and E twice give 5!/(2! x 2!) = 120/4 = 30 arrangements."),
    T(0, 3, "Remainders", "What is the remainder when $17^{23}$ is divided by 16?",
      "1", "17 leaves remainder 1 on division by 16, so every power of 17 does too."),
    T(0, 2, "Factors", "What is the sum of all the positive factors of 36?",
      "91", "The factors are 1, 2, 3, 4, 6, 9, 12, 18 and 36, which add up to 91. By formula, (1 + 2 + 4)(1 + 3 + 9) = 7 x 13 = 91."),
    S(0, 1, "Probability", "A fair coin is tossed four times. What is the probability of getting at least one head?",
      ["15/16", "3/4", "1/2", "1/16"],
      "The only outcome with no head is four tails, probability 1/16, so at least one head has probability 1 - 1/16 = 15/16."),
    N(0, 2, "Permutations", "In how many ways can 5 people stand in a row if two particular people must stand next to each other?",
      "48", ["24", "60", "120"], "Treat the pair as one unit: 4 units can be arranged in 4! = 24 ways, and the pair can stand in 2 orders, giving 48."),
    T(0, 2, "Series", "What is the sum of all the multiples of 3 between 1 and 100?",
      "1683", "The multiples are 3, 6, ..., 99, which is 33 terms. Their sum is 3 x (1 + 2 + ... + 33) = 3 x 561 = 1683."),
    N(0, 1, "HCF", "What is the HCF of 144 and 252?",
      "36", ["12", "18", "72"], "$144 = 2^4 \\times 3^2$ and $252 = 2^2 \\times 3^2 \\times 7$, so the HCF is $2^2 \\times 3^2 = 36$."),
]
