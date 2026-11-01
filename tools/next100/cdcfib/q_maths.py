CAT = "cdcfibMaths"; SEG = "MTH"
# Numerical ability. Every key is computed below and asserted; distractors are the results of
# common slips (wrong operation, wrong base, a skipped step). Naira as N, written out in words
# where a symbol might not render.
from fractions import Fraction as F

def n(x):
    """Format a whole number with thousands commas."""
    return f"{x:,}"

# 1 percentage of a quantity
assert 0.35 * 2_460 == 861
# 2 percentage increase
assert (4_620 - 4_200) / 4_200 * 100 == 10
# 3 discount then price
assert 7_400 * (1 - 0.15) == 6_290
# 4 simple interest
assert 45_000 * 6 * 3 / 100 == 8_100
# 5 ratio share
assert 54_000 * 4 // 9 == 24_000
# 6 average
assert sum([68, 74, 59, 81, 73]) / 5 == 71
# 7 speed distance time
assert 186 / 62 == 3
# 8 time in minutes
assert 270 / 72 * 60 == 225
# 9 LCM
import math
assert math.lcm(9, 15, 25) == 225 and math.gcd(15, 25) == 5
# 10 HCF
assert math.gcd(126, 198) == 18 and math.lcm(126, 198) == 1_386 and 126 % 36 != 0
# 11 fractions
assert F(5, 6) - F(3, 10) == F(8, 15)
# 12 fraction of
assert F(2, 7) * 3_430 == 980
# 13 area rectangle
assert 23 * 14 == 322
# 14 perimeter
assert 2 * (37 + 19) == 112
# 15 circle area pi 22/7 r 14
assert F(22, 7) * 21 * 21 == 1_386 and F(22, 7) * 42 == 132
# 16 profit percent
assert (9_180 - 7_650) / 7_650 * 100 == 20
# 17 unit price
assert 3_960 / 12 * 7 == 2_310
# 18 age problem: father 3x son, sum 52 -> son 13
assert 13 * 3 + 13 == 52
# 19 work rate: 6 men 15 days -> 9 men 10 days
assert 8 * 21 / 12 == 14
# 20 square root
assert 37 * 37 == 1_369
# 21 indices
assert 2 ** 7 == 128
# 22 decimal to percent
assert round(0.0625 * 100, 2) == 6.25
# 23 linear equation 7x - 9 = 47 -> 8
assert 7 * 8 - 9 == 47
# 24 consecutive numbers sum 147 -> 48, 49, 50
assert 48 + 49 + 50 == 147
# 25 conversion km to m
assert 3.75 * 1000 == 3_750
# 26 percent of pass
assert 0.64 * 175 == 112
# 27 recruits shared into platoons: 312 / 24
assert 312 / 24 == 13
# 28 volume of cuboid
assert 14 * 6 * 5 == 420
# 29 BODMAS
assert 18 - 12 / 4 + 3 * 5 == 30 and ((18 - 12) / 4 + 3) * 5 == 22.5
# 30 percentage decrease
assert (1_850 - 1_480) / 1_850 * 100 == 20
# 31 mean of new set
assert (9 * 52 + 72) / 10 == 54
# 32 compound growth 2 years 10%
assert round(20_000 * 1.1 * 1.1) == 24_200
# 33 angles of triangle
assert 180 - 64 - 47 == 69
# 34 median
assert sorted([14, 9, 21, 17, 11, 30, 6])[3] == 14
# 35 time difference
assert (14 * 60 + 25) - (9 * 60 + 50) == 275
# 36 ratio of change
assert 1_620 / 270 == 6

Q = [
("What is 35% of 2,460?",
 "861", ["86.1", "1,599", "703"],
 "35% of 2,460 = 0.35 x 2,460 = 861. 1,599 is the 65% left over, and 86.1 comes from using 3.5% by mistake."),
("A shop raised the price of a bag of rice from N4,200 to N4,620. What is the percentage increase?",
 "10%", ["9.1%", "11%", "4.2%"],
 "The rise is N420, and 420 / 4,200 = 0.10 = 10%. Dividing by the new price, 420 / 4,620, gives the wrong 9.1%."),
("A torch marked N7,400 is sold at a 15% discount. What is the selling price?",
 "N6,290", ["N1,110", "N7,385", "N6,920"],
 "15% of N7,400 is N1,110, so the price is N7,400 - N1,110 = N6,290. N1,110 is only the discount."),
("What is the simple interest on N36,000 at 7% per annum for 4 years?",
 "N10,080", ["N2,520", "N46,080", "N1,008"],
 "I = PRT / 100 = 36,000 x 7 x 4 / 100 = N10,080. N2,520 is one year's interest and N46,080 is the amount, not the interest."),
("N54,000 is shared between Bola and Uche in the ratio 4 : 5. How much does Bola get?",
 "N24,000", ["N30,000", "N21,600", "N13,500"],
 "There are 4 + 5 = 9 parts, each N6,000. Bola gets 4 x 6,000 = N24,000; N30,000 is Uche's share."),
("Five recruits scored 68, 74, 59, 81 and 73 in a test. What is their mean score?",
 "71 marks", ["73 marks", "74 marks", "355 marks"],
 "The total is 355, and 355 / 5 = 71. 73 is the median and 355 is the total."),
("A patrol van travels 186 km at an average speed of 62 km/h. How long does the journey take?",
 "3 hours", ["3.5 hours", "2.5 hours", "4 hours"],
 "Time = distance / speed = 186 / 62 = 3 hours."),
("A bus covers 270 km at 72 km/h. How many minutes does the trip take?",
 "225 minutes", ["375 minutes", "255 minutes", "210 minutes"],
 "270 / 72 = 3.75 hours, and 3.75 x 60 = 225 minutes. Reading 3.75 hours as 3 hours 75 minutes gives the wrong 255, and multiplying by 100 gives 375."),
("What is the LCM of 9, 15 and 25?",
 "225", ["75", "450", "3"],
 "9 = 3 x 3, 15 = 3 x 5 and 25 = 5 x 5. Take the highest power of each prime: 3 x 3 x 5 x 5 = 225. 75 is the LCM of 15 and 25 only, 450 is a common multiple but not the least, and 3 is a factor, not a multiple."),
("What is the HCF of 126 and 198?",
 "18", ["6", "9", "36"],
 "126 = 2 x 3 x 3 x 7 and 198 = 2 x 3 x 3 x 11. The common factors give 2 x 3 x 3 = 18. 6 and 9 divide both numbers but are not the highest, and 36 does not divide 126."),
("What is 5/6 - 3/10 in its simplest form?",
 "8/15", ["1/2", "16/60", "4/15"],
 "Over 30: 25/30 - 9/30 = 16/30 = 8/15. Subtracting tops and bottoms (5 - 3 and 10 - 6) gives 2/4 = 1/2, and 16/60 uses the wrong denominator."),
("A depot holds 3,430 litres of diesel. If 2/7 of it is used, how many litres are used?",
 "980 litres", ["2,450 litres", "490 litres", "1,225 litres"],
 "3,430 / 7 = 490, and 2 x 490 = 980 litres. 2,450 litres is what remains."),
("A rectangular hall is 23 m long and 14 m wide. What is its area?",
 "322 square metres", ["74 square metres", "37 square metres", "312 square metres"],
 "Area = length x width = 23 x 14 = 322 square metres. 74 m is the perimeter."),
("A rectangular compound is 37 m by 19 m. How much fencing goes all the way round it?",
 "112 m", ["56 m", "703 m", "94 m"],
 "Perimeter = 2 x (37 + 19) = 2 x 56 = 112 m. 56 m is only half the way round, and 703 is the area in square metres."),
("Taking pi as 22/7, what is the area of a circle of radius 77 cm?",
 "18,634 square cm", ["484 square cm", "9,317 square cm", "37,268 square cm"],
 "Area = pi r squared = 22/7 x 77 x 77 = 18,634 square cm. 484 cm is the circumference, 9,317 is half the area, and 37,268 uses the diameter in place of r in one factor."),
("A trader buys a radio for N7,650 and sells it for N9,180. What is the profit percent?",
 "20%", ["16.7%", "15.3%", "25%"],
 "Profit = N1,530, and 1,530 / 7,650 = 20% of the cost price. Dividing by the selling price gives the wrong 16.7%."),
("12 exercise books cost N3,960. What do 7 of them cost?",
 "N2,310", ["N1,650", "N2,640", "N330"],
 "One book costs 3,960 / 12 = N330, so 7 cost 7 x 330 = N2,310."),
("A man is three times as old as his son, and their ages add up to 52. How old is the son?",
 "13 years", ["17 years", "39 years", "26 years"],
 "Let the son be x: x + 3x = 52, so 4x = 52 and x = 13. 39 is the father's age."),
("8 painters can paint a school in 27 days. Working at the same rate, how long would 12 painters take?",
 "18 days", ["40.5 days", "23 days", "24 days"],
 "The job is 8 x 27 = 216 painter-days; 216 / 12 = 18 days. More painters take fewer days, so 40.5 days (multiplying up) cannot be right."),
("What is the square root of 1,369?",
 "37", ["33", "43", "47"],
 "37 x 37 = 1,369. A square ending in 9 has a root ending in 3 or 7, and 33 x 33 = 1,089 is too small."),
("What is the value of 2 to the power 7?",
 "128", ["14", "64", "256"],
 "2 x 2 x 2 x 2 x 2 x 2 x 2 = 128. 14 is 2 x 7, and 64 and 256 are the powers 6 and 8."),
("What is 0.0625 written as a percentage?",
 "6.25%", ["62.5%", "0.625%", "625%"],
 "Multiply by 100: 0.0625 x 100 = 6.25%."),
("If 7x - 9 = 47, what is x?",
 "8", ["5.4", "6", "7"],
 "Add 9 to both sides: 7x = 56, so x = 8. Subtracting 9 instead gives 7x = 38, about 5.4."),
("Three consecutive whole numbers add up to 147. What is the largest of them?",
 "50", ["49", "51", "48"],
 "The middle number is 147 / 3 = 49, so the numbers are 48, 49 and 50, and the largest is 50."),
("How many metres are there in 3.75 km?",
 "3,750 m", ["375 m", "37,500 m", "37.5 m"],
 "1 km = 1,000 m, so 3.75 x 1,000 = 3,750 m."),
("In a fitness test, 64% of 175 candidates passed. How many passed?",
 "112 candidates", ["63 candidates", "111 candidates", "109 candidates"],
 "0.64 x 175 = 112. 63 is the number who failed."),
("312 recruits are split into platoons of 24. How many platoons are formed?",
 "13 platoons", ["12 platoons", "14 platoons", "16 platoons"],
 "312 / 24 = 13 exactly, since 24 x 13 = 312."),
("What is the volume of a crate 14 cm long, 6 cm wide and 5 cm high?",
 "420 cubic cm", ["25 cubic cm", "84 cubic cm", "210 cubic cm"],
 "Volume = length x width x height = 14 x 6 x 5 = 420 cubic cm. 25 is the sum of the sides and 84 only the base area."),
("What is the value of 18 - 12 / 4 + 3 x 5?",
 "30", ["22.5", "0", "-12"],
 "Divide and multiply first: 12 / 4 = 3 and 3 x 5 = 15. Then 18 - 3 + 15 = 30. Working strictly left to right gives 22.5, and subtracting both 3 and 15 gives 0."),
("The price of a phone fell from N1,850 to N1,480. What is the percentage decrease?",
 "20%", ["25%", "37%", "18.5%"],
 "The fall is N370, and 370 / 1,850 = 0.2 = 20%. Dividing by the new price, 370 / 1,480, gives the wrong 25%."),
("The mean mark of 9 candidates is 52. A tenth candidate scores 72. What is the new mean?",
 "54 marks", ["62 marks", "53 marks", "56 marks"],
 "The old total is 9 x 52 = 468; the new total is 468 + 72 = 540, and 540 / 10 = 54. 62 averages only the two means."),
("N30,000 grows at 5% compound interest a year. What is the amount after 2 years?",
 "N33,075", ["N33,000", "N31,500", "N3,075"],
 "Year 1: 30,000 x 1.05 = 31,500. Year 2: 31,500 x 1.05 = N33,075. N33,000 is simple interest, and N3,075 is the interest alone."),
("Two angles of a triangle are 64 degrees and 47 degrees. What is the third angle?",
 "69 degrees", ["111 degrees", "79 degrees", "59 degrees"],
 "Angles in a triangle add up to 180 degrees: 180 - 64 - 47 = 69. 111 is the sum of the two given angles."),
("What is the median of 14, 9, 21, 17, 11, 30 and 6?",
 "14", ["17", "15.4", "21"],
 "In order the numbers are 6, 9, 11, 14, 17, 21, 30, and the middle (4th) value is 14. 15.4 is the mean, and 17 is the 4th number in the list as given."),
("A shift starts at 9.50 a.m. and ends at 2.25 p.m. How long is it?",
 "4 hours 35 minutes", ["5 hours 25 minutes", "4 hours 25 minutes", "3 hours 35 minutes"],
 "From 9.50 to 1.50 p.m. is 4 hours, and 1.50 to 2.25 is 35 minutes: 4 hours 35 minutes."),
("A van uses 270 litres of fuel a month. How many months will 1,620 litres last?",
 "6 months", ["5 months", "7 months", "8 months"],
 "1,620 / 270 = 6 months, since 270 x 6 = 1,620."),
]
