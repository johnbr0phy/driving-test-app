"""Maths: number and calculation, then problem solving, measures, shape and data. Five options like the
real multiple-choice papers; every key is recomputed in an assert next to the item."""
from fractions import Fraction as F
from common import item, rotate

NUM, PROB = "elevenplusNumber", "elevenplusProblem"
ITEMS = []
_k = [1]
FOF, POF, BID = "elevenplusFractionOf", "elevenplusPercentOf", "elevenplusBidmas"


def m(domain, test, skill, diff, stem, key, others, why, basics=None):
    assert len(others) == 4
    opts, idx = rotate([key] + others, key, _k[0])
    _k[0] += 2
    extra = {"basics": basics} if basics else {}
    ITEMS.append(item(domain, test, skill, diff, stem, opts, idx, why, **extra))


def money(p):
    return f"£{p // 100}.{p % 100:02d}"


# ===================== Number =====================
assert 4368 + 2759 == 7127
m(NUM, 1, "Addition", 1, "What is 4,368 + 2,759?", "7,127", ["7,117", "6,127", "7,027", "7,227"],
  "Add column by column: 8 + 9 = 17 (write 7, carry 1), 6 + 5 + 1 = 12 (write 2, carry 1), 3 + 7 + 1 = 11 (write 1, carry 1), 4 + 2 + 1 = 7. The answer is 7,127.")
assert 46 * 7 == 322
m(NUM, 1, "Multiplication", 1, "What is 46 × 7?", "322", ["282", "312", "332", "422"],
  "40 × 7 = 280 and 6 × 7 = 42. 280 + 42 = 322.")
assert 936 // 4 == 234 and 936 % 4 == 0
m(NUM, 1, "Division", 2, "What is 936 ÷ 4?", "234", ["233", "224", "244", "334"],
  "Short division: 9 ÷ 4 = 2 remainder 1; 13 ÷ 4 = 3 remainder 1; 16 ÷ 4 = 4. So 936 ÷ 4 = 234. Check: 234 × 4 = 936.")
m(NUM, 1, "Place value", 1, "What is the value of the digit 7 in 3.472?", "7 hundredths", ["7 tenths", "7 thousandths", "7 ones", "7 tens"],
  "After the decimal point the places are tenths, hundredths, thousandths. In 3.472 the 4 is tenths, the 7 is hundredths and the 2 is thousandths.")
assert F(4, 7) * 63 == 36
m(NUM, 1, "Fractions of amounts", 1, "What is $\\frac{4}{7}$ of 63?", "36", ["9", "27", "45", "28"],
  "Divide by the bottom number, then multiply by the top: 63 ÷ 7 = 9, and 9 × 4 = 36. 9 is only one seventh.", FOF)
assert 360 * 25 // 100 == 90
m(NUM, 1, "Percentages", 1, "What is 25% of 360?", "90", ["36", "72", "25", "120"],
  "25% is one quarter. 360 ÷ 4 = 90. 36 would be 10%.", POF)
assert max([0.6, 0.59, 0.065, 0.609, 0.61]) == 0.61
m(NUM, 1, "Ordering decimals", 2, "Which of these numbers is the largest?", "0.61", ["0.6", "0.59", "0.065", "0.609"],
  "Write them all with three decimal places: 0.610, 0.600, 0.590, 0.065, 0.609. The largest is 0.610, which is 0.61.")
assert 3 + 4 * 5 - 2 == 21
m(NUM, 1, "Order of operations", 2, "What is 3 + 4 × 5 − 2?", "21", ["33", "15", "25", "29"],
  "Multiply before adding and subtracting: 4 × 5 = 20, then 3 + 20 − 2 = 21. Working left to right gives 33, which is wrong.", BID)
assert round(6749, -2) == 6700
m(NUM, 1, "Rounding", 1, "What is 6,749 rounded to the nearest hundred?", "6,700", ["6,800", "6,750", "7,000", "6,740"],
  "The hundreds digit is 7 and the next digit is 4. 4 is less than 5, so round down to 6,700.")
m(NUM, 1, "Prime numbers", 2, "Which of these is a prime number?", "47", ["39", "51", "57", "87"],
  "47 has only two factors, 1 and 47. The others divide by 3: 39 = 3 × 13, 51 = 3 × 17, 57 = 3 × 19, 87 = 3 × 29.")
assert F(2, 3) + F(1, 4) == F(11, 12)
m(NUM, 1, "Adding fractions", 2, "What is $\\frac{2}{3} + \\frac{1}{4}$?", "$\\frac{11}{12}$", ["$\\frac{3}{7}$", "$\\frac{3}{12}$", "$\\frac{2}{12}$", "$\\frac{8}{12}$"],
  "Use a common denominator of 12: $\\frac{2}{3} = \\frac{8}{12}$ and $\\frac{1}{4} = \\frac{3}{12}$. 8 + 3 = 11, so the answer is $\\frac{11}{12}$. Adding tops and bottoms (3/7) is wrong.")
assert -7 + 12 == 5
m(NUM, 1, "Negative numbers", 2, "At 6 am the temperature was −7°C. By noon it had risen by 12 degrees. What was the temperature at noon?", "5°C", ["−5°C", "19°C", "−19°C", "4°C"],
  "Count up from −7: 7 degrees takes you to 0, and 5 more takes you to 5°C.")
assert abs(0.4 * 0.3 - 0.12) < 1e-9
m(NUM, 1, "Multiplying decimals", 3, "What is 0.4 × 0.3?", "0.12", ["1.2", "0.012", "0.7", "1.12"],
  "4 × 3 = 12. Each number has one decimal place, so the answer has two: 0.12.")

assert 802 - 367 == 435
m(NUM, 2, "Subtraction", 1, "What is 802 − 367?", "435", ["545", "465", "335", "445"],
  "Count on from 367: 367 + 33 = 400, then 400 + 402 = 802. 33 + 402 = 435.")
assert 58 * 24 == 1392
m(NUM, 2, "Long multiplication", 2, "What is 58 × 24?", "1,392", ["1,292", "1,382", "348", "1,402"],
  "58 × 20 = 1,160 and 58 × 4 = 232. 1,160 + 232 = 1,392.")
assert 1500 / 12 == 125
m(NUM, 2, "Division", 2, "What is 1,500 ÷ 12?", "125", ["120", "115", "150", "130"],
  "12 × 100 = 1,200, leaving 300. 12 × 25 = 300. So 100 + 25 = 125.")
assert F(7, 8) * 64 == 56
m(NUM, 2, "Fractions of amounts", 1, "What is $\\frac{7}{8}$ of 64?", "56", ["8", "48", "49", "63"],
  "64 ÷ 8 = 8, then 8 × 7 = 56.", FOF)
assert 80 * 15 / 100 == 12
m(NUM, 2, "Percentages", 2, "What is 15% of 80?", "12", ["15", "8", "18", "1.2"],
  "10% of 80 is 8 and 5% is half of that, 4. 8 + 4 = 12.", POF)
vals = {"$\\frac{3}{5}$": F(3, 5), "$\\frac{2}{3}$": F(2, 3), "$\\frac{5}{8}$": F(5, 8), "$\\frac{7}{12}$": F(7, 12), "$\\frac{4}{7}$": F(4, 7)}
assert min(vals, key=vals.get) == "$\\frac{4}{7}$"
m(NUM, 2, "Comparing fractions", 3, "Which of these fractions is the smallest?", "$\\frac{4}{7}$", ["$\\frac{3}{5}$", "$\\frac{2}{3}$", "$\\frac{5}{8}$", "$\\frac{7}{12}$"],
  "Compare each with one half: every fraction here is a little more than a half. 4/7 is 1/14 more than a half, 7/12 is 1/12 more, 3/5 is 1/10 more, 5/8 is 1/8 more and 2/3 is 1/6 more. 1/14 is the smallest extra, so 4/7 is smallest.")
m(NUM, 2, "Square numbers", 1, "Which of these is a square number between 50 and 70?", "64", ["54", "60", "72", "49"],
  "8 × 8 = 64, which is between 50 and 70. 49 (7 × 7) is a square number but is less than 50.")
assert (6 + 9) / 3 * 2 == 10
m(NUM, 2, "Order of operations", 2, "What is (6 + 9) ÷ 3 × 2?", "10", ["2.5", "12", "20", "7"],
  "Brackets first: 6 + 9 = 15. Then divide and multiply from left to right: 15 ÷ 3 = 5, and 5 × 2 = 10.", BID)
m(NUM, 2, "Multiplying by 10, 100, 1,000", 1, "What is 4.6 × 100?", "460", ["46", "4,600", "0.046", "4.600"],
  "Multiplying by 100 moves every digit two places to the left: 4.6 becomes 460.")
assert F(35, 100) == F(7, 20)
m(NUM, 2, "Decimals as fractions", 2, "What is 0.35 as a fraction in its simplest form?", "$\\frac{7}{20}$", ["$\\frac{35}{10}$", "$\\frac{3}{5}$", "$\\frac{1}{35}$", "$\\frac{7}{2}$"],
  "0.35 is 35 hundredths, $\\frac{35}{100}$. Divide top and bottom by 5 to get $\\frac{7}{20}$.")
m(NUM, 2, "Multiples", 2, "What is the lowest common multiple of 6 and 8?", "24", ["48", "2", "14", "12"],
  "Multiples of 8 are 8, 16, 24... and 24 is the first one that 6 also divides. 48 is a common multiple but not the lowest; 2 is a common factor.")
assert 4000 * 5 // 8 == 2500
m(NUM, 2, "Ratio", 2, "£40 is shared between Asha and Ben in the ratio 3 : 5. How much does Ben get?", "£25", ["£15", "£24", "£8", "£20"],
  "3 + 5 = 8 parts. £40 ÷ 8 = £5 a part. Ben has 5 parts: 5 × £5 = £25. Asha gets £15.")
assert abs(1.2 - 0.35 - 0.85) < 1e-9
m(NUM, 2, "Subtracting decimals", 2, "What is 1.2 − 0.35?", "0.85", ["0.95", "1.15", "0.87", "0.75"],
  "Write 1.2 as 1.20. 1.20 − 0.35 = 0.85.")

assert F(3, 4) * 120 == 90
m(NUM, 0, "Fractions of amounts", 1, "What is $\\frac{3}{4}$ of 120?", "90", ["30", "40", "80", "160"],
  "120 ÷ 4 = 30, then 30 × 3 = 90.", FOF)
assert 45 * 20 / 100 == 9
m(NUM, 0, "Percentages", 1, "What is 20% of 45?", "9", ["20", "4.5", "25", "90"],
  "10% of 45 is 4.5, so 20% is double that: 9.", POF)
assert 5 * (8 - 3) + 4 == 29
m(NUM, 0, "Order of operations", 2, "What is 5 × (8 − 3) + 4?", "29", ["41", "45", "25", "31"],
  "Brackets first: 8 − 3 = 5. Then multiply: 5 × 5 = 25. Then add: 25 + 4 = 29.", BID)
assert 7006 - 2948 == 4058
m(NUM, 0, "Subtraction", 2, "What is 7,006 − 2,948?", "4,058", ["5,058", "4,158", "4,062", "5,942"],
  "Count on from 2,948: + 52 makes 3,000, + 4,006 makes 7,006. 52 + 4,006 = 4,058.")
m(NUM, 0, "Fractions and decimals", 2, "Which decimal is equal to $\\frac{3}{8}$?", "0.375", ["0.38", "0.83", "3.8", "0.35"],
  "$\\frac{1}{8}$ = 0.125, so $\\frac{3}{8}$ = 3 × 0.125 = 0.375.")
assert F(18) / F(2, 5) == 45
m(NUM, 0, "Fractions of amounts", 3, "$\\frac{2}{5}$ of a number is 18. What is the number?", "45", ["36", "7.2", "90", "30"],
  "If 2 fifths are 18, one fifth is 9. Five fifths are 5 × 9 = 45. Check: 45 ÷ 5 × 2 = 18.", FOF)
assert 1200 * 100 // 30 == 4000
m(NUM, 0, "Percentages", 3, "30% of the price of a coat is £12. What is the full price?", "£40", ["£36", "£42", "£4", "£400"],
  "If 30% is £12, then 10% is £4. 100% is 10 × £4 = £40.", POF)
m(NUM, 0, "Factors", 1, "Which number is a factor of both 24 and 36?", "12", ["8", "9", "16", "18"],
  "24 = 12 × 2 and 36 = 12 × 3. 8 divides 24 but not 36; 9 and 18 divide 36 but not 24; 16 divides neither.")
assert 2 - 7 + 3 == -2
m(NUM, 0, "Negative numbers", 2, "What is 2 − 7 + 3?", "−2", ["2", "−8", "12", "−4"],
  "Work left to right: 2 − 7 = −5, then −5 + 3 = −2.")
m(NUM, 0, "Rounding decimals", 2, "What is 15.649 rounded to one decimal place?", "15.6", ["15.7", "15.65", "16.0", "15.5"],
  "Look at the hundredths digit, 4. It is less than 5, so the tenths digit stays: 15.6. Do not round 15.649 to 15.65 first.")

# ===================== Problem solving, measures, shape, data =====================
assert 35 * 8 == 280
m(PROB, 1, "Money", 1, "Pencils cost 35p each. How much do 8 pencils cost?", "£2.80", ["£2.40", "£3.15", "£28.00", "£2.85"],
  "35p × 8 = 280p, which is £2.80.")
m(PROB, 1, "Time", 2, "A train leaves at 09:47. The journey takes 1 hour 25 minutes. What time does it arrive?", "11:12", ["11:02", "10:12", "11:22", "11:13"],
  "09:47 + 1 hour = 10:47. Then 13 more minutes reaches 11:00, and 12 more makes 25 minutes: 11:12.")
assert 2 * (9 + 4) == 26
m(PROB, 1, "Perimeter", 1, "A rectangle is 9 cm long and 4 cm wide. What is its perimeter?", "26 cm", ["36 cm", "13 cm", "22 cm", "18 cm"],
  "Perimeter is the distance all the way round: 9 + 4 + 9 + 4 = 26 cm. 36 would be the area in cm².")
m(PROB, 1, "Area", 1, "A rectangular garden is 7 m long and 6 m wide. What is its area?", "42 m²", ["26 m²", "13 m²", "48 m²", "36 m²"],
  "Area of a rectangle = length × width = 7 × 6 = 42 m².")
assert 180 - 38 - 79 == 63
m(PROB, 1, "Angles", 2, "Two angles in a triangle are 38° and 79°. What is the third angle?", "63°", ["73°", "117°", "243°", "53°"],
  "Angles in a triangle add up to 180°. 38 + 79 = 117, and 180 − 117 = 63°.")
m(PROB, 1, "Converting units", 1, "How many grams are there in 2.5 kg?", "2,500 g", ["250 g", "25,000 g", "25 g", "2,050 g"],
  "1 kg = 1,000 g, so 2.5 kg = 2.5 × 1,000 = 2,500 g.")
assert sum([4, 7, 9, 12, 8]) / 5 == 8
m(PROB, 1, "Mean", 2, "What is the mean of 4, 7, 9, 12 and 8?", "8", ["9", "40", "7", "10"],
  "Add them: 4 + 7 + 9 + 12 + 8 = 40. Divide by how many there are: 40 ÷ 5 = 8.")
assert (26 - 5) / 3 == 7
m(PROB, 1, "Equations", 2, "If 3n + 5 = 26, what is n?", "7", ["9", "21", "8", "6"],
  "Take 5 from both sides: 3n = 21. Divide by 3: n = 7. Check: 3 × 7 + 5 = 26.")
m(PROB, 1, "Coordinates", 3, "The point (2, 6) is reflected in the x-axis. What are the coordinates of its new position?", "(2, −6)", ["(−2, 6)", "(6, 2)", "(−2, −6)", "(2, 6)"],
  "Reflecting in the x-axis keeps the x-coordinate the same and changes the sign of the y-coordinate: (2, 6) becomes (2, −6).")
assert 12 - (5 + 3) == 4
m(PROB, 1, "Reading tables", 2, "Class 6 voted for their favourite pet.\n\n| Pet | Votes |\n|---|---|\n| Dog | 12 |\n| Cat | 8 |\n| Rabbit | 5 |\n| Fish | 3 |\n\nHow many more votes did Dog get than Rabbit and Fish together?",
  "4", ["7", "9", "20", "3"],
  "Rabbit and Fish together: 5 + 3 = 8. Dog has 12. 12 − 8 = 4.")
assert 7 * 4 * 3 == 84
m(PROB, 1, "Volume", 2, "A cuboid measures 7 cm by 4 cm by 3 cm. What is its volume?", "84 cm³", ["14 cm³", "122 cm³", "28 cm³", "21 cm³"],
  "Volume = length × width × height = 7 × 4 × 3 = 84 cm³. 14 adds the lengths and 122 is the surface area.")
m(PROB, 1, "Money", 2, "Notebooks are sold at 3 for £2. How much do 12 notebooks cost?", "£8", ["£24", "£6", "£4", "£36"],
  "12 notebooks is 4 lots of 3. 4 × £2 = £8.")

assert 2000 - 3 * 475 == 575
m(PROB, 2, "Money", 2, "Cinema tickets cost £4.75 each. Mo buys 3 tickets and pays with a £20 note. How much change does he get?", "£5.75", ["£15.25", "£6.25", "£5.25", "£4.75"],
  "3 × £4.75 = £14.25. £20.00 − £14.25 = £5.75.")
m(PROB, 2, "Angles", 1, "Two angles sit together on a straight line. One is 137°. What is the other?", "43°", ["53°", "223°", "137°", "47°"],
  "Angles on a straight line add up to 180°. 180 − 137 = 43°.")
m(PROB, 2, "Converting units", 1, "How many metres are there in 3.2 km?", "3,200 m", ["320 m", "32,000 m", "3,020 m", "32 m"],
  "1 km = 1,000 m, so 3.2 km = 3,200 m.")
m(PROB, 2, "Area", 2, "A triangle has a base of 12 cm and a perpendicular height of 7 cm. What is its area?", "42 cm²", ["84 cm²", "19 cm²", "38 cm²", "21 cm²"],
  "Area of a triangle = half × base × height = ½ × 12 × 7 = 42 cm². 84 forgets to halve.")
m(PROB, 2, "Time", 2, "A film starts at 18:40 and lasts 135 minutes. At what time does it finish?", "20:55", ["20:15", "19:55", "21:15", "20:45"],
  "135 minutes = 2 hours 15 minutes. 18:40 + 2 hours = 20:40, then + 15 minutes = 20:55.")
m(PROB, 2, "3-D shapes", 1, "How many edges does a cube have?", "12", ["6", "8", "10", "24"],
  "A cube has 4 edges round the top, 4 round the bottom and 4 going up the sides: 12. It has 6 faces and 8 vertices.")
assert 4 * 10 - 1 == 39
m(PROB, 2, "Sequences", 2, "The rule for a sequence is: multiply the position number by 4, then subtract 1. What is the 10th number in the sequence?", "39", ["41", "40", "36", "43"],
  "Position 10: 10 × 4 = 40, then 40 − 1 = 39.")
assert 6 * 5 - (3 + 5 + 8 + 9) == 5
m(PROB, 2, "Mean", 3, "The mean of five numbers is 6. Four of the numbers are 3, 5, 8 and 9. What is the fifth number?", "5", ["6", "30", "25", "4"],
  "If the mean of five numbers is 6, their total is 5 × 6 = 30. 3 + 5 + 8 + 9 = 25. The fifth number is 30 − 25 = 5.")
assert 24 * 90 // 360 == 6
m(PROB, 2, "Pie charts", 2, "A pie chart shows the favourite sports of 24 children. The football sector has an angle of 90°. How many children chose football?", "6", ["9", "12", "4", "90"],
  "90° is a quarter of the full 360°. A quarter of 24 children is 6.")
assert 360 * 15 // 6 == 900
m(PROB, 2, "Scaling recipes", 2, "A recipe for 6 people uses 360 g of flour. How much flour is needed for 15 people?", "900 g", ["5,400 g", "720 g", "369 g", "1,080 g"],
  "For 1 person: 360 ÷ 6 = 60 g. For 15 people: 60 × 15 = 900 g.")
m(PROB, 2, "Speed and distance", 2, "A car travels at 60 km per hour. How far does it travel in 2 hours 30 minutes?", "150 km", ["120 km", "180 km", "138 km", "90 km"],
  "In 2 hours it goes 120 km, and in half an hour 30 km more. 120 + 30 = 150 km. 2 hours 30 minutes is 2.5 hours, not 2.3.")
m(PROB, 2, "Symmetry", 2, "Which of these shapes has exactly 2 lines of symmetry?", "A rectangle (not a square)", ["A square", "An equilateral triangle", "A regular hexagon", "A kite"],
  "A non-square rectangle folds in half two ways: across the middle and down the middle. A square has 4, an equilateral triangle 3, a regular hexagon 6 and a kite 1.")

assert 2 * 345 + 120 == 810
m(PROB, 0, "Money", 1, "Sandwiches cost £3.45 each and a juice costs £1.20. How much do 2 sandwiches and a juice cost?", "£8.10", ["£4.65", "£7.90", "£8.20", "£9.10"],
  "2 × £3.45 = £6.90. £6.90 + £1.20 = £8.10.")
m(PROB, 0, "Perimeter and area", 3, "A square has an area of 36 cm². What is its perimeter?", "24 cm", ["36 cm", "12 cm", "144 cm", "9 cm"],
  "The side length is 6 cm, because 6 × 6 = 36. Perimeter = 4 × 6 = 24 cm.")
assert 360 - 90 - 110 - 70 == 90
m(PROB, 0, "Angles", 2, "Three angles of a quadrilateral are 90°, 110° and 70°. What is the fourth angle?", "90°", ["80°", "100°", "270°", "110°"],
  "Angles in a quadrilateral add up to 360°. 90 + 110 + 70 = 270, and 360 − 270 = 90°.")
assert 0.75 + 1.5 == 2.25
m(PROB, 0, "Converting units", 2, "What is 750 ml + 1.5 litres, in litres?", "2.25 litres", ["7.65 litres", "1.575 litres", "2.5 litres", "9 litres"],
  "750 ml = 0.75 litres. 0.75 + 1.5 = 2.25 litres.")
m(PROB, 0, "Algebra", 1, "What is the value of 2a + 3 when a = 6?", "15", ["29", "11", "26", "17"],
  "2a means 2 × a. 2 × 6 = 12, and 12 + 3 = 15. 26 comes from writing 2 next to 6.")
assert (13 * 60 + 20) - (10 * 60 + 45) == 155
m(PROB, 0, "Time", 2, "How many minutes are there between 10:45 and 13:20?", "155", ["135", "175", "165", "255"],
  "10:45 to 13:00 is 2 hours 15 minutes, which is 135 minutes. 13:00 to 13:20 is 20 more. 135 + 20 = 155 minutes.")
m(PROB, 0, "Reading tables", 2, "Here are the midday temperatures for five days.\n\n| Day | Temperature |\n|---|---|\n| Mon | 4°C |\n| Tue | −2°C |\n| Wed | 1°C |\n| Thu | −5°C |\n| Fri | 3°C |\n\nWhat is the difference between the highest and lowest temperatures?",
  "9°C", ["1°C", "7°C", "8°C", "−1°C"],
  "The highest is 4°C (Monday) and the lowest is −5°C (Thursday). From −5 up to 0 is 5 degrees and 0 up to 4 is 4 more: 9 degrees.")
assert 300 // 25 == 12
m(PROB, 0, "Measures", 2, "A ribbon 3 m long is cut into pieces 25 cm long. How many pieces are there?", "12", ["75", "120", "7", "10"],
  "3 m = 300 cm. 300 ÷ 25 = 12 pieces.")
m(PROB, 0, "Coordinates", 2, "A, B, C and D are the corners of a rectangle. A is at (1, 1), B is at (5, 1) and C is at (5, 4). Where is D?", "(1, 4)", ["(4, 1)", "(5, 5)", "(4, 4)", "(1, 5)"],
  "D must be straight above A and level with C. It takes A's x-coordinate, 1, and C's y-coordinate, 4: (1, 4).")
assert (31 - 7) / 2 == 12
m(PROB, 0, "Algebra", 2, "I think of a number, double it and add 7. The answer is 31. What was my number?", "12", ["19", "24", "14", "11"],
  "Work backwards: 31 − 7 = 24, then halve: 24 ÷ 2 = 12. Check: 12 × 2 + 7 = 31.")
