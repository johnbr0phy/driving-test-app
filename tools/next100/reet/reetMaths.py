# Mathematics content (REET Level 1, Part IV): numbers and place value, the four
# operations, fractions and decimals, LCM and HCF, measurement, time, geometry,
# patterns and data. Every computed key is asserted below.
from fractions import Fraction as F

assert 1184 // 16 == 74 and 1184 % 16 == 0
assert F(5, 12) == max(F(3, 8), F(2, 5), F(5, 12), F(1, 3))
assert 84 % 12 == 0 and 84 % 28 == 0 and all(m % 12 or m % 28 for m in range(1, 84)) and 12 * 28 == 336
assert 4 * 14 == 56
assert (9 * 60 + 40 + 2 * 60 + 35) == 12 * 60 + 15
assert 200 - 4 * 38 == 48
assert 50 + 10 + 9 == 69
assert 5 * 1000 + 80 == 5080
assert 1015 // 35 == 29 and 1015 % 35 == 0
assert abs(3.6 + 0.85 - 4.45) < 1e-9
assert (18 + 24 + 33) / 3 == 25
assert 9 * 7 == 63
assert 88 * 2 == 176 and 22 == 11 * 2 and 44 == 22 * 2
assert F(3, 5) * 85 == 51
assert 60 + 45 == 105
assert 15 - 9 == 6
assert 8500 // 250 == 34 and 8500 % 250 == 0
assert 23 * 48 == 1104
assert 91 % 7 == 0 and all(x % 7 for x in (93, 97, 99))
assert 7 * 100 + 8 == 708
assert 63 // 7 * 3 == 27
assert (30 % 7) == 2  # 4 June Friday + 30 days = Sunday

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 1, "Place value", "What is the place value of 5 in 3,58,072?",
      ["50,000", "5", "500", "5,000"],
      "In 3,58,072 the digits are 3 lakhs, 5 ten thousands, 8 thousands, 0 hundreds, 7 tens and 2 ones. So 5 stands for 5 x 10,000 = 50,000. Its face value is 5."),
    N(1, 2, "Division", "A bangle seller packs 1,184 bangles into boxes of 16. How many boxes does she fill? Type the number only.",
      ["74"],
      "1,184 / 16 = 74, with nothing left over (16 x 74 = 1,184)."),
    S(1, 2, "Fractions", "Which of these fractions is the greatest?",
      ["5/12", "3/8", "2/5", "1/3"],
      "With the common denominator 120: 5/12 = 50/120, 2/5 = 48/120, 3/8 = 45/120 and 1/3 = 40/120. So 5/12 is the greatest."),
    S(1, 2, "LCM and HCF", "What is the LCM of 12 and 28?",
      ["84", "4", "40", "336"],
      "Multiples of 28 are 28, 56, 84 ... and 84 is the first that 12 also divides, so the LCM is 84. 4 is the HCF, 40 the sum and 336 the product."),
    S(1, 1, "Perimeter", "What is the perimeter of a square with sides of 14 cm?",
      ["56 cm", "28 cm", "42 cm", "196 cm"],
      "Perimeter of a square = 4 x side = 4 x 14 = 56 cm. 196 is the area in square centimetres, and 28 adds only two sides."),
    S(1, 2, "Time", "A bus leaves Ajmer at 9:40 a.m. and the journey takes 2 hours 35 minutes. When does it arrive?",
      ["12:15 p.m.", "11:15 a.m.", "12:05 p.m.", "12:25 p.m."],
      "9:40 + 2 hours = 11:40. Then 20 minutes takes it to 12:00 and the remaining 15 minutes to 12:15 p.m."),
    N(1, 1, "Subtraction", "A box holds 200 laddoos. Four children take 38 laddoos each for a class party. How many laddoos are left in the box? Type the number only.",
      ["48"],
      "The children take 4 x 38 = 152 laddoos, so 200 - 152 = 48 are left."),
    S(1, 2, "Roman numerals", "What number does the Roman numeral LXIX stand for?",
      ["69", "49", "59", "71"],
      "LX = 50 + 10 = 60 and IX = 10 - 1 = 9, so LXIX = 69. Reading IX as 11 gives 71."),
    S(1, 2, "Measurement: mass", "How many grams are there in 5 kg 80 g?",
      ["5,080", "580", "5,008", "5,800"],
      "1 kg = 1,000 g, so 5 kg 80 g = 5,000 + 80 = 5,080 g. Writing 80 g as 800 or 8 gives the wrong choices."),
    S(1, 2, "Solid shapes", "How many vertices (corners) does a triangular prism have?",
      ["6", "5", "8", "9"],
      "Each triangular end has 3 corners, so 3 + 3 = 6 vertices. A triangular prism has 5 faces and 9 edges."),
    # ---------- Practice Test 2 ----------
    S(2, 1, "Number names", "Which number is 'ninety thousand and seven'?",
      ["90,007", "9,007", "90,070", "9,00,007"],
      "Ninety thousand is 90,000; adding seven gives 90,007. 90,070 would be ninety thousand and seventy."),
    N(2, 2, "Division", "A school library gets 35 new books every week. After how many weeks will it have received 1,015 new books? Type the number only.",
      ["29"],
      "1,015 / 35 = 29 (35 x 29 = 1,015)."),
    S(2, 2, "Decimals", "What is 3.6 + 0.85?",
      ["4.45", "1.21", "3.69", "4.35"],
      "Line up the decimal points: 3.60 + 0.85 = 4.45. Adding without lining up the points gives answers such as 1.21 or 3.69."),
    S(2, 2, "Average", "What is the average of 18, 24 and 33?",
      ["25", "27", "37.5", "75"],
      "Sum = 18 + 24 + 33 = 75; average = 75 / 3 = 25. 75 is only the sum, and dividing it by 2 gives 37.5."),
    S(2, 1, "Area", "A rectangular room is 9 m long and 7 m wide. What is its floor area in square metres?",
      ["63", "32", "36", "54"],
      "Area = length x width = 9 x 7 = 63 square metres. 32 is the perimeter in metres (2 x (9 + 7))."),
    S(2, 1, "Patterns", "What comes next: 11, 22, 44, 88, ...?",
      ["176", "99", "132", "154"],
      "Each number is double the one before it, so after 88 comes 176. Adding 11 each time (99) does not fit 22 to 44."),
    S(2, 2, "Fraction of a quantity", "What is 3/5 of 85?",
      ["51", "17", "34", "68"],
      "1/5 of 85 = 17, so 3/5 = 3 x 17 = 51. 17 is only one fifth and 68 is four fifths."),
    S(2, 2, "Measurement: time", "How many minutes are there in 1 3/4 hours?",
      ["105", "115", "145", "175"],
      "1 hour = 60 minutes and 3/4 hour = 45 minutes, so 105 minutes. Treating 1 3/4 hours as 1.75 and moving the point gives 175."),
    S(2, 2, "Symmetry", "Which capital letter has a vertical line of symmetry?",
      ["A", "F", "G", "J"],
      "A vertical line through the middle of A gives two mirror halves. F, G and J have no line of symmetry."),
    S(2, 1, "Data handling", "In a class survey, 12 children like mango best, 9 like guava and 15 like banana. How many more children like banana than guava?",
      ["6", "3", "24", "36"],
      "Banana 15 - guava 9 = 6. 3 is the difference between mango and guava, 24 is banana plus guava and 36 is the whole class."),
    # ---------- Drill only ----------
    N(0, 2, "Measurement: capacity", "A jar holds 8 litres 500 millilitres of lassi. How many glasses of 250 millilitres can be filled from it? Type the number only.",
      ["34"],
      "8 L 500 mL = 8,500 mL, and 8,500 / 250 = 34 glasses."),
    N(0, 1, "Multiplication", "A school orders 23 packets of pencils with 48 pencils in each packet. How many pencils is that? Type the number only.",
      ["1104"],
      "23 x 48 = 23 x 50 - 23 x 2 = 1,150 - 46 = 1,104 pencils."),
    S(0, 1, "Prime numbers", "What is the smallest prime number?",
      ["2", "1", "3", "9"],
      "A prime has exactly two factors, 1 and itself. 1 has only one factor, so it is not prime; 2 is the smallest prime and the only even one."),
    S(0, 1, "Multiples", "Which of these numbers is a multiple of 7?",
      ["91", "93", "97", "99"],
      "91 = 7 x 13. 93 = 3 x 31, 97 is prime and 99 = 9 x 11."),
    S(0, 1, "Measurement: length", "How many centimetres are there in 7 m 8 cm?",
      ["708", "78", "780", "7,008"],
      "1 m = 100 cm, so 7 m 8 cm = 700 + 8 = 708 cm. Writing 8 cm as 80 gives 780."),
    S(0, 2, "Order of operations", "What is the value of 63 / 7 x 3?",
      ["27", "3", "9", "21"],
      "Division and multiplication are done from left to right: 63 / 7 = 9, then 9 x 3 = 27. Doing 7 x 3 first gives 63 / 21 = 3."),
    S(0, 2, "Calendar", "If 4 June is a Friday, what day of the week is 4 July?",
      ["Sunday", "Friday", "Saturday", "Monday"],
      "June has 30 days, so 4 July is 30 days after 4 June. 30 = 4 weeks + 2 days, and two days after Friday is Sunday."),
]
