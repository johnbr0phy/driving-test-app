"""KS2 maths Papers 2 and 3 (reasoning): no calculator.

Per paper: 8 number, ratio and algebra items and 4 measurement, geometry and
statistics items, the 22-26 to 9-13 split per 35-mark paper in the STA 2016
KS2 mathematics test framework (Table 11), scaled to 12 items. Numbers are
checked by assertions where they are computed.
"""
from fractions import Fraction as F
from common import single, numeric, order, matrix

N, M = "ks2Number", "ks2Measure"
FOA, RAT, ANG, TIME = "ks2FractionsOfAmounts", "ks2Ratio", "ks2Angles", "ks2Time"
YN = ["Yes", "No"]


def fr(n, d):
    return f"$\\frac{{{n}}}{{{d}}}$"


assert (12 + 15 + 9 + 16) / 4 == 13
assert (7 + 9 + 6 + 10 + 8) / 5 == 8
assert 2 * 12 + 7 == 31 and 3 * 8 - 5 == 19 and 9 * 4 - 6 == 30
assert 20 - 3 * 4.75 == 5.75 and 1.5 * 7 == 10.5 and 0.35 * 8 == 2.8
assert F(1, 4) + F(1, 3) == F(7, 12) and F(3, 4) - F(1, 3) == F(5, 12)

T1_P2 = [
    numeric(N, "Place value", 1, "What number is 1,000 more than 45,906?", ["46906"],
            "Add 1 to the thousands digit: 45,906 becomes 46,906. The hundreds, tens and ones do not change.", whole=True),
    numeric(M, "Time", 1, "How many minutes are there from 3:45 pm to 5:10 pm? Type the number only.", ["85"],
            "From 3:45 to 4:00 is 15 minutes, 4:00 to 5:00 is 60 minutes, and 5:00 to 5:10 is 10 minutes. 15 + 60 + 10 = 85.", TIME, whole=True),
    order(N, "Ordering decimals", 2, "Put these numbers in order, starting with the **smallest**.", ["0.405", "0.45", "0.5", "0.54"],
          "Compare tenths first: 0.4 is less than 0.5. Then hundredths: 0.405 has 0 hundredths and 0.45 has 5, so 0.405 is smaller. Likewise 0.5 (0.50) is smaller than 0.54."),
    numeric(N, "Rounding", 1, "Round 67,482 to the nearest thousand.", ["67000"],
            "Look at the hundreds digit: 4 is less than 5, so round down to 67,000.", whole=True),
    numeric(M, "Perimeter", 1, "A rectangle is 9 cm long and 6 cm wide. What is its perimeter in centimetres? Type the number only.", ["30"],
            "Perimeter is the distance all the way round: 9 + 6 + 9 + 6 = 30 cm. 54 would be the area, not the perimeter.", whole=True),
    numeric(N, "Money", 2, "Ava has £20. She buys 3 books that cost £4.75 each. How much change does she get, in pounds? Type the number only.", ["5.75"],
            "3 × £4.75 = £14.25 (3 × £4 = £12 and 3 × 75p = £2.25). £20 − £14.25 = £5.75."),
    numeric(N, "Fractions of amounts", 2, f"What is {fr(3,5)} of 45?", ["27"],
            "Divide by the denominator to find one fifth: 45 ÷ 5 = 9. Multiply by the numerator: 9 × 3 = 27.", FOA, whole=True),
    numeric(M, "Angles on a line", 2, "Two angles sit together on a straight line. One angle is 65°. What is the other angle, in degrees? Type the number only.", ["115"],
            "Angles on a straight line add up to 180°. 180 − 65 = 115.", ANG, whole=True),
    numeric(N, "Ratio", 2, "A recipe uses 150 g of flour for every 2 eggs. How many grams of flour are needed for 6 eggs? Type the number only.", ["450"],
            "6 eggs is 3 times as many as 2 eggs, so use 3 times the flour: 150 × 3 = 450 g.", RAT, whole=True),
    matrix(N, "Multiples", 2, "Is each number a multiple of 6?", ["42", "56", "72", "94"], YN, [0, 1, 0, 1],
           "42 = 6 × 7 and 72 = 6 × 12, so they are multiples of 6. 56 is 6 × 9 + 2 and 94 is 6 × 15 + 4, so they are not."),
    numeric(M, "Mean", 3, "Four plants are 12 cm, 15 cm, 9 cm and 16 cm tall. What is their mean height in centimetres? Type the number only.", ["13"],
            "Add the heights: 12 + 15 + 9 + 16 = 52. Share the total between the 4 plants: 52 ÷ 4 = 13 cm.", whole=True),
    numeric(N, "Algebra", 3, "2*n* + 7 = 31\n\nWhat is the value of *n*?", ["12"],
            "Take 7 away from both sides: 2*n* = 24. Halve it: *n* = 12. Check: 2 × 12 + 7 = 31.", whole=True),
]

T1_P3 = [
    numeric(N, "Place value", 1, "What is the value of the digit 7 in 2.375? Write it as a decimal.", ["0.07", ".07"],
            "In 2.375 the 3 is tenths, the 7 is hundredths and the 5 is thousandths. Seven hundredths is 0.07."),
    numeric(N, "Negative numbers", 1, "The temperature is −4°C. It rises by 9 degrees. What is the new temperature in °C? Type the number only.", ["5"],
            "Count up 4 degrees to reach 0°C, then 5 more: the new temperature is 5°C.", whole=True),
    numeric(M, "Converting units", 1, "How many millilitres are in 2.5 litres? Type the number only.", ["2500"],
            "1 litre = 1,000 ml, so 2.5 litres = 2.5 × 1,000 = 2,500 ml.", whole=True),
    numeric(N, "Multiplication", 2, "A school has 7 classes with 28 pupils in each class. How many pupils are there altogether?", ["196"],
            "28 × 7: 20 × 7 = 140 and 8 × 7 = 56. 140 + 56 = 196.", whole=True),
    single(N, "Prime numbers", 2, "Which of these is a prime number?", ["29", "21", "27", "33"], 0,
           "29 has only two factors, 1 and 29. 21 = 3 × 7, 27 = 3 × 9 and 33 = 3 × 11, so they are not prime."),
    numeric(M, "Area", 1, "A square has sides of 7 cm. What is its area in cm²? Type the number only.", ["49"],
            "Area of a square is side × side: 7 × 7 = 49 cm². 28 cm would be its perimeter.", whole=True),
    numeric(N, "Percentages", 2, "A coat costs £60. In a sale, it has 30% off. What is the sale price, in pounds? Type the number only.", ["42"],
            "10% of £60 is £6, so 30% is £18. £60 − £18 = £42. Be careful: £18 is the discount, not the price.", whole=True),
    numeric(N, "Algebra", 2, "Sam thinks of a number. He multiplies it by 4, then subtracts 6. His answer is 30. What was his number?", ["9"],
            "Work backwards: add 6 to undo the subtraction (30 + 6 = 36), then divide by 4 to undo the multiplying (36 ÷ 4 = 9).", whole=True),
    numeric(M, "Angles in a triangle", 2, "Two angles of a triangle are 48° and 77°. What is the third angle, in degrees? Type the number only.", ["55"],
            "Angles in a triangle add up to 180°. 48 + 77 = 125, and 180 − 125 = 55.", ANG, whole=True),
    numeric(N, "Adding fractions", 3, f"Lily read {fr(1,4)} of her book on Monday and {fr(1,3)} of it on Tuesday. What fraction of the book has she read altogether?\n\nGive your answer as a fraction.", ["7/12"],
            "Change both to twelfths: one quarter is 3 twelfths and one third is 4 twelfths. 3 + 4 = 7 twelfths.", tolerance=0.000001),
    numeric(M, "Volume", 2, "A cuboid is 5 cm long, 4 cm wide and 3 cm tall. What is its volume in cm³? Type the number only.", ["60"],
            "Volume = length × width × height: 5 × 4 × 3 = 60 cm³.", whole=True),
    numeric(N, "Ratio", 3, "In a class, the ratio of boys to girls is 2 : 3. There are 30 children. How many are girls?", ["18"],
            "2 : 3 means 5 parts altogether. 30 ÷ 5 = 6 children in each part. Girls have 3 parts: 3 × 6 = 18.", RAT, whole=True),
]

T2_P2 = [
    numeric(N, "Place value", 1, "What number is 10,000 less than 307,250?", ["297250"],
            "Take 1 from the ten thousands. There are 0 ten thousands, so exchange from the hundred thousands: 307,250 − 10,000 = 297,250.", whole=True),
    numeric(M, "Time", 1, "A bus leaves at 10:35 am and arrives at 11:20 am. How many minutes does the journey take? Type the number only.", ["45"],
            "From 10:35 to 11:00 is 25 minutes, and 11:00 to 11:20 is 20 minutes. 25 + 20 = 45.", TIME, whole=True),
    order(N, "Ordering fractions and decimals", 2, "Put these numbers in order, starting with the **smallest**.", ["0.3", fr(1, 2), "0.6", fr(3, 4)],
          "Change the fractions to decimals: one half is 0.5 and three quarters is 0.75. In order: 0.3, 0.5, 0.6, 0.75."),
    numeric(N, "Rounding decimals", 2, "Round 3.468 to one decimal place.", ["3.5"],
            "Look at the hundredths digit: 6 is 5 or more, so round the tenths up from 3.4 to 3.5."),
    numeric(M, "Perimeter", 1, "A regular hexagon has sides of 8 cm. What is its perimeter in centimetres? Type the number only.", ["48"],
            "A hexagon has 6 sides, all 8 cm long in a regular one: 6 × 8 = 48 cm.", whole=True),
    numeric(N, "Money", 2, "Pencils cost 35p each. How much do 8 pencils cost, in pounds? Type the number only.", ["2.80", "2.8"],
            "35p × 8 = 280p (30 × 8 = 240 and 5 × 8 = 40). 280p = £2.80."),
    numeric(N, "Fractions of amounts", 2, f"What is {fr(5,8)} of 64?", ["40"],
            "One eighth of 64 is 64 ÷ 8 = 8. Five eighths is 5 × 8 = 40.", FOA, whole=True),
    numeric(M, "Angles around a point", 2, "Three angles meet at a point. Two of them are 120° and 95°. What is the third angle, in degrees? Type the number only.", ["145"],
            "Angles around a point add up to 360°. 120 + 95 = 215, and 360 − 215 = 145.", ANG, whole=True),
    numeric(N, "Ratio", 2, "3 bags of apples cost £4.50. How much do 7 bags cost, in pounds? Type the number only.", ["10.50", "10.5"],
            "Find one bag first: £4.50 ÷ 3 = £1.50. Then 7 bags: 7 × £1.50 = £10.50.", RAT),
    matrix(N, "Factors", 2, "Is each number a factor of 36?", ["4", "8", "9", "24"], YN, [0, 1, 0, 1],
           "36 ÷ 4 = 9 and 36 ÷ 9 = 4, so 4 and 9 are factors. 36 ÷ 8 and 36 ÷ 24 do not divide exactly, so they are not."),
    numeric(M, "Mean", 3, "In five spelling tests, Jo scored 7, 9, 6, 10 and 8. What was her mean score?", ["8"],
            "Add the scores: 7 + 9 + 6 + 10 + 8 = 40. Divide by the number of tests: 40 ÷ 5 = 8.", whole=True),
    numeric(N, "Algebra", 3, "3*y* − 5 = 19\n\nWhat is the value of *y*?", ["8"],
            "Add 5 to both sides: 3*y* = 24. Divide by 3: *y* = 8. Check: 3 × 8 − 5 = 19.", whole=True),
]

T2_P3 = [
    numeric(N, "Place value", 1, "Write six hundred and five thousand and forty in digits.", ["605040"],
            "Six hundred and five thousand is 605,000. Add forty: 605,040. The hundreds and ones are zero.", whole=True),
    numeric(N, "Negative numbers", 1, "At midnight it was −3°C. By noon it was 8°C. By how many degrees did the temperature rise? Type the number only.", ["11"],
            "From −3 up to 0 is 3 degrees, and from 0 up to 8 is 8 more. 3 + 8 = 11 degrees.", whole=True),
    numeric(M, "Converting units", 1, "How many grams are in 3.4 kg? Type the number only.", ["3400"],
            "1 kg = 1,000 g, so 3.4 kg = 3.4 × 1,000 = 3,400 g.", whole=True),
    numeric(N, "Division with remainders", 2, "Eggs are packed in boxes of 12. How many boxes are needed to pack 150 eggs?", ["13"],
            "150 ÷ 12 = 12 remainder 6. Twelve boxes hold 144 eggs, so the 6 left over need one more box: 13.", whole=True),
    single(N, "Square numbers", 2, "Which of these is a square number?", ["64", "35", "48", "80"], 0,
           "64 = 8 × 8, so it is a square number. 35, 48 and 80 cannot be made by multiplying a whole number by itself."),
    numeric(M, "Area of a triangle", 2, "A triangle has a base of 10 cm and a perpendicular height of 6 cm. What is its area in cm²? Type the number only.", ["30"],
            "Area of a triangle = half × base × height: 10 × 6 = 60, and half of 60 is 30 cm².", whole=True),
    numeric(N, "Percentages", 2, "There are 80 children in Year 6. 15% of them walk to school. How many children walk?", ["12"],
            "10% of 80 is 8 and 5% is 4. 15% is 8 + 4 = 12.", whole=True),
    numeric(N, "Problem solving", 3, "Two numbers add up to 50. One number is 14 more than the other. What is the larger number?", ["32"],
            "Take away the difference: 50 − 14 = 36, then halve it: 18 is the smaller number. The larger is 18 + 14 = 32.", whole=True),
    numeric(M, "Angles in a triangle", 3, "In an isosceles triangle, the top angle is 40°. The other two angles are equal. What size is each of them, in degrees? Type the number only.", ["70"],
            "The angles add up to 180°. 180 − 40 = 140, shared equally between the two: 140 ÷ 2 = 70.", ANG, whole=True),
    numeric(N, "Subtracting fractions", 3, f"A jug holds {fr(3,4)} of a litre of juice. Tom pours out {fr(1,3)} of a litre. How much juice is left, as a fraction of a litre?\n\nGive your answer as a fraction.", ["5/12"],
            "Change both to twelfths: three quarters is 9 twelfths and one third is 4 twelfths. 9 − 4 = 5 twelfths of a litre.", tolerance=0.000001),
    numeric(M, "Volume", 2, "A cuboid is 8 cm long, 3 cm wide and 2 cm tall. What is its volume in cm³? Type the number only.", ["48"],
            "Volume = length × width × height: 8 × 3 × 2 = 48 cm³.", whole=True),
    numeric(N, "Ratio", 3, "Orange squash is mixed with 1 part squash to 4 parts water. How much water is needed for 50 ml of squash, in millilitres? Type the number only.", ["200"],
            "Every 1 part squash needs 4 parts water, so the water is 4 times the squash: 50 × 4 = 200 ml.", RAT, whole=True),
]

DRILL = [
    numeric(M, "Time", 2, "How many minutes are there from 11:40 am to 1:15 pm? Type the number only.", ["95"],
            "11:40 to 12:00 is 20 minutes, 12:00 to 1:00 is 60 minutes, and 1:00 to 1:15 is 15 minutes. 20 + 60 + 15 = 95.", TIME, whole=True),
    numeric(M, "Angles on a line", 1, "Two angles sit together on a straight line. One angle is 37°. What is the other angle, in degrees? Type the number only.", ["143"],
            "Angles on a straight line add up to 180°. 180 − 37 = 143.", ANG, whole=True),
    numeric(M, "Converting time", 1, "How many hours are there in 3 days? Type the number only.", ["72"],
            "There are 24 hours in a day, so 3 days = 3 × 24 = 72 hours.", TIME, whole=True),
    numeric(M, "Right angles", 2, "A right angle is split into two angles. One of them is 28°. What is the other, in degrees? Type the number only.", ["62"],
            "A right angle is 90°. 90 − 28 = 62.", ANG, whole=True),
    numeric(N, "Fractions of amounts", 1, f"What is {fr(7,10)} of 120?", ["84"],
            "One tenth of 120 is 12. Seven tenths is 7 × 12 = 84.", FOA, whole=True),
    numeric(N, "Ratio", 2, "In a necklace, there are 4 red beads for every 3 blue beads. There are 21 blue beads. How many red beads are there?", ["28"],
            "21 blue beads is 7 groups of 3. Each group has 4 red beads: 7 × 4 = 28.", RAT, whole=True),
]
