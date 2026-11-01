# Mathematics content for Classes 1 to 5: numbers and place value, Roman numerals,
# fractions and decimals, divisibility and primes, LCM, geometry, measurement,
# time, money (unitary method), averages, patterns and percentages.
# Every computed answer is asserted in the block below, before ITEMS.
from fractions import Fraction as F

import math
assert 60000 - 6 == 59994 and 60000 + 6 == 60006
assert F(18, 24) == F(3, 4) and all(F(18, 24) != x for x in (F(2, 3), F(3, 5), F(9, 16)))
assert abs(2.5 + 0.75 + 3.05 - 6.3) < 1e-9 and abs(2.05 + 0.75 + 3.05 - 5.85) < 1e-9
assert 4 + 4 == 8  # square pyramid edges
assert 3 * 1000 + 45 == 3045
assert (24 * 60 - (21 * 60 + 40)) + 5 * 60 + 15 == 7 * 60 + 35
assert 91 % 7 == 0 and 91 // 7 * 4 == 52
assert 999999 + 1 == 1000000
assert 6372 % 9 == 0 and all(n % 9 for n in (6374, 6375, 6378)) and 6375 % 3 == 0
primes = [n for n in range(61, 80) if all(n % k for k in range(2, n))]
assert primes == [61, 67, 71, 73, 79]
assert 1 - (F(3, 8) + F(1, 4)) == F(3, 8)
assert (52 // 4) ** 2 == 169 and 52 ** 2 == 2704 and 26 ** 2 == 676
assert 2 * 30 == 60 and 360 - 60 == 300 and 3 * 30 == 90 and 4 * 30 == 120
assert (14 + 22 + 9 + 31 + 19) / 5 == 19 and (14 + 22 + 9 + 31 + 19) / 4 == 23.75
assert 2 * 1000 + 350 == 2350
assert math.lcm(10, 12, 16) == 240 and math.lcm(10, 12) == 60 and math.lcm(10, 16) == 80 and math.lcm(12, 16) == 48
assert sum(range(2, 21, 2)) == 110 and sum(range(1, 20, 2)) == 100 and sum(range(2, 19, 2)) == 90 and sum(range(1, 11)) == 55
assert 6 * 4 * 3 == 72 and 2 * (6 * 4 + 4 * 3 + 6 * 3) == 108 and 6 + 4 + 3 == 13
assert 30 * 2 + 2 == 62 and 30 + 16 == 46
assert 6000 // 250 == 24 and 6000 % 250 == 0
assert 45 * 380 / 100 == 171

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 2, "Place value", "What is the difference between the place value and the face value of 6 in 3,62,859?",
      ["59,994", "60,006", "5,994", "5,99,994"],
      "The 6 is in the ten thousands place, so its place value is 60,000 and its face value is 6: 60,000 - 6 = 59,994. Adding them gives 60,006.",
    ),
    S(1, 2, "Roman numerals", "Which Roman numeral stands for 94?",
      ["XCIV", "LXLIV", "XCVI", "IVXC"],
      "94 = 90 + 4 = XC + IV = XCIV. XCVI is 96, and LXL and IVXC are not valid Roman numerals.",
    ),
    S(1, 2, "Fractions", "Which fraction is equivalent to 18/24?",
      ["3/4", "2/3", "3/5", "9/16"],
      "Divide the numerator and the denominator by their HCF, 6: 18/24 = 3/4. Check by cross-multiplying: 18 x 4 = 72 = 24 x 3. 2/3, 3/5 and 9/16 all fail that check.",
    ),
    S(1, 2, "Decimals", "What is 2.5 + 0.75 + 3.05?",
      ["6.3", "3.85", "5.85", "6.03"],
      "Line up the decimal points: 2.50 + 0.75 + 3.05 = 6.30, which is 6.3. Writing 2.5 as 2.05 by mistake gives 5.85.",
    ),
    S(1, 2, "Geometry", "How many edges does a pyramid with a square base have?",
      ["8", "5", "6", "12"],
      "The square base has 4 edges and 4 more run from its corners up to the apex: 4 + 4 = 8. The pyramid has 5 faces and 5 vertices; 12 is the number of edges of a cube.",
    ),
    S(1, 1, "Measurement: length", "3 km 45 m is equal to",
      ["3045 m", "3405 m", "3450 m", "30045 m"],
      "1 km = 1000 m, so 3 km 45 m = 3000 + 45 = 3045 m. 45 m sits in the tens and ones places, not the hundreds.",
    ),
    S(1, 3, "Measurement: time", "A train leaves Lucknow at 21:40 and reaches its destination at 05:15 the next morning. How long is the journey?",
      ["7 h 35 min", "8 h 35 min", "7 h 25 min", "16 h 25 min"],
      "From 21:40 to midnight is 2 h 20 min, and from midnight to 05:15 is 5 h 15 min: 7 h 35 min in all. Subtracting 05:15 from 21:40 gives 16 h 25 min, the wrong way round.",
    ),
    N(1, 2, "Money: unitary method", "7 pens cost Rs 91. How many rupees do 4 such pens cost? Type the number only.",
      ["52"],
      "One pen costs 91 / 7 = Rs 13, so 4 pens cost 13 x 4 = Rs 52.",
    ),
    # ---------- Practice Test 2 ----------
    S(2, 1, "Numbers", "What is the successor of the largest 6-digit number?",
      ["10,00,000", "9,99,999", "9,99,998", "1,00,000"],
      "The largest 6-digit number is 9,99,999, and its successor is one more: 10,00,000 (ten lakh). 9,99,998 is its predecessor, and 1,00,000 is the smallest 6-digit number.",
    ),
    S(2, 2, "Divisibility", "Which of these numbers is divisible by 9?",
      ["6372", "6374", "6375", "6378"],
      "A number is divisible by 9 when its digit sum is: 6 + 3 + 7 + 2 = 18. 6375 has digit sum 21, so it is divisible by 3 but not by 9.",
    ),
    S(2, 2, "Prime numbers", "How many prime numbers are there between 60 and 80?",
      ["5", "6", "7", "8"],
      "The primes are 61, 67, 71, 73 and 79: five of them. 63, 69 and 77 look prime but are 7 x 9, 3 x 23 and 7 x 11; counting them too gives 6, 7 or 8.",
    ),
    S(2, 2, "Fractions", "Ramesh spends 3/8 of his pocket money on books and 1/4 on snacks. What fraction is left?",
      ["3/8", "5/8", "1/8", "1/2"],
      "3/8 + 1/4 = 3/8 + 2/8 = 5/8 is spent, so 1 - 5/8 = 3/8 is left. 5/8 is the part spent, not the part left.",
    ),
    S(2, 2, "Perimeter and area", "The perimeter of a square field is 52 m. What is its area?",
      ["169 sq m", "104 sq m", "676 sq m", "2704 sq m"],
      "Each side is 52 / 4 = 13 m, so the area is 13 x 13 = 169 sq m. Squaring the perimeter gives 2704.",
    ),
    S(2, 2, "Angles", "What is the smaller angle between the hands of a clock at 10 o'clock?",
      ["60 degrees", "90 degrees", "120 degrees", "300 degrees"],
      "Each hour mark is 360 / 12 = 30 degrees apart. At 10 o'clock the hands are 2 marks apart going the short way (10 to 12): 2 x 30 = 60 degrees. The other way round is 300 degrees; 90 and 120 come from counting 3 or 4 marks instead of 2.",
    ),
    S(2, 2, "Average", "What is the average of 14, 22, 9, 31 and 19?",
      ["19", "21", "23.75", "24"],
      "The sum is 95 and there are 5 numbers, so the average is 95 / 5 = 19. Dividing by 4 by mistake gives 23.75.",
    ),
    N(2, 2, "Measurement: capacity", "A bottle holds 2 litres 350 ml of juice. How many millilitres is that? Type the number only.",
      ["2350"],
      "1 litre = 1000 ml, so 2 litres 350 ml = 2000 + 350 = 2350 ml.",
    ),
    # ---------- Drill only ----------
    S(0, 3, "LCM", "Three school bells ring every 10, 12 and 16 minutes. If they ring together at 9:00, after how many minutes will they next ring together?",
      ["240", "60", "80", "480"],
      "They ring together again after the LCM of 10, 12 and 16: 10 = 2 x 5, 12 = 2 x 2 x 3 and 16 = 2 x 2 x 2 x 2, so the LCM is 2 x 2 x 2 x 2 x 3 x 5 = 240. 60 and 80 are the LCMs of only two of the bells, and 480 is a common multiple but not the least.",
    ),
    S(0, 2, "Patterns", "What is the sum of all the even numbers from 2 to 20?",
      ["110", "55", "90", "100"],
      "There are 10 even numbers from 2 to 20 and they pair up as 2 + 20 = 22, five times: 5 x 22 = 110. 100 is the sum of the odd numbers 1 to 19, 90 stops at 18, and 55 is the sum of 1 to 10.",
    ),
    S(0, 2, "Volume", "A box is 6 cm long, 4 cm wide and 3 cm high. What is its volume?",
      ["72 cubic cm", "13 cubic cm", "36 cubic cm", "108 cubic cm"],
      "Volume = length x breadth x height = 6 x 4 x 3 = 72 cubic cm. 108 is the surface area in square cm, and 13 is the sum of the sides.",
    ),
    S(0, 2, "Numbers", "How is 4,07,05,060 read in the Indian system?",
      ["Four crore seven lakh five thousand sixty", "Four crore seven lakh fifty thousand sixty", "Four crore seventy lakh five thousand sixty", "Forty crore seven lakh five thousand six"],
      "Group from the right as crore, lakh, thousand, hundreds: 4 | 07 | 05 | 060 is four crore, seven lakh, five thousand and sixty.",
    ),
    S(0, 2, "Patterns", "What comes next: 2, 6, 14, 30, ...?",
      ["62", "46", "58", "60"],
      "Each term is double the one before plus 2: 30 x 2 + 2 = 62. Doubling only gives 60, and adding the next gap of 16 gives 46.",
    ),
    S(0, 1, "Geometry", "A triangle whose three sides are all of different lengths is called",
      ["scalene", "isosceles", "equilateral", "right-angled"],
      "Scalene triangles have no equal sides. Isosceles have two equal sides and equilateral three.",
    ),
    N(0, 2, "Measurement: weight", "How many packets of 250 g each can be filled from 6 kg of sugar? Type the number only.",
      ["24"],
      "6 kg = 6000 g, and 6000 / 250 = 24 packets.",
    ),
    S(0, 2, "Percentage", "What is 45% of 380?",
      ["171", "17.1", "162", "1710"],
      "45% of 380 = 45 / 100 x 380 = 171. Misplacing the decimal point gives 17.1 or 1710.",
    ),
]
