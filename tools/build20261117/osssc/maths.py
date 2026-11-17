"""Original maths questions, key first; build.py rotates the key into place.
Every computed key is checked with an assert below the item list."""
from fractions import Fraction as F
from math import comb, gcd, sqrt

ITEMS = [
 ("A clerk's salary rose by 20% in one year and by 15% in the next. By what percentage did it rise over the two years together?",
  ['38%', '35%', '36%', '40%'],
  '1.20 times 1.15 is 1.38, a 38% rise. Adding 20 and 15 to get 35% forgets that the second rise is on the already raised salary.'),
 ('By selling an article for ₹1,170, a shopkeeper gains 17% on cost. What is the cost price?',
  ['₹1,000', '₹971.10', '₹1,153', '₹1,368.90'],
  'Selling price is 117% of cost, so cost is 1170/1.17 = ₹1,000. Taking 17% off the selling price (₹971.10) wrongly bases the gain on the selling price.'),
 ('A dealer marks goods 40% above cost price and then allows a 15% discount on the marked price. What is his profit percentage?',
  ['19%', '25%', '21%', '16%'],
  'On a cost of 100 the marked price is 140; 15% off gives 119, a 19% profit. Subtracting 15 from 40 to get 25% ignores that the discount is on the marked price.'),
 ('The price of sugar falls by 20%. By what percentage can a household increase its consumption without changing its expenditure?',
  ['25%', '20%', '16 2/3%', '22.5%'],
  'At 80% of the old price, the same money buys 100/80 = 1.25 times as much, a 25% increase. 16 2/3% is the answer to the reverse case, a 20% price rise.'),
 ('The ratio of boys to girls in a school is 7:5. If 40 more girls join, the ratio becomes 7:6. How many boys are there?',
  ['280', '240', '320', '350'],
  'With 7x boys and 5x girls, 7x/(5x + 40) = 7/6 gives 42x = 35x + 280, so x = 40 and there are 280 boys.'),
 ('The average age of 30 employees is 40 years. When the manager is included, the average rises by 1 year. What is the age of the manager?',
  ['71 years', '41 years', '70 years', '72 years'],
  'The new total is 31 times 41 = 1271 and the old total is 30 times 40 = 1200, so the manager is 71. 41 is only the new average.'),
 ('A can finish a job in 12 days and B in 18 days. They work together for 4 days, then A leaves. In how many more days will B finish the job?',
  ['8 days', '6 days', '10 days', '7.2 days'],
  'Together they do 1/12 + 1/18 = 5/36 a day, so 20/36 in 4 days. B does the remaining 16/36 at 2/36 a day in 8 days. 7.2 days is the time for both working throughout.'),
 ('A train 240 m long passes a pole in 16 seconds. How long will it take to cross a platform 360 m long at the same speed?',
  ['40 seconds', '24 seconds', '36 seconds', '56 seconds'],
  'The speed is 240/16 = 15 m/s. Crossing the platform means covering 240 + 360 = 600 m, which takes 40 seconds. 24 seconds forgets the length of the train.'),
 ('What is the difference between compound interest and simple interest on ₹8,000 for 2 years at 10% per year, compounded annually?',
  ['₹80', '₹160', '₹800', '₹40'],
  'For 2 years the difference is P(r/100)² = 8000 times 0.01 = ₹80. Simple interest is ₹1,600 and compound interest ₹1,680.'),
 ('A shop gives two successive discounts of 20% and 10% on a marked price of ₹2,500. What is the selling price?',
  ['₹1,800', '₹1,750', '₹2,000', '₹1,850'],
  '2500 times 0.8 is 2000, and 10% off 2000 is 1800. Taking a single 30% off gives ₹1,750, which overstates the second discount.'),
 ("₹7,000 is divided among A, B and C so that A:B = 2:3 and B:C = 4:5. What is C's share?",
  ['₹3,000', '₹2,400', '₹3,250', '₹1,600'],
  'Making B equal in both ratios gives A:B:C = 8:12:15, total 35 parts. C gets 15/35 of 7000 = ₹3,000; B gets ₹2,400 and A ₹1,600.'),
 ('A trader buys 50 kg of rice at ₹40 per kg and 30 kg at ₹48 per kg, mixes them and sells the mixture at ₹50 per kg. What is his total profit?',
  ['₹560', '₹440', '₹640', '₹600'],
  'Cost is 2000 + 1440 = ₹3,440; sales are 80 times 50 = ₹4,000; profit is ₹560.'),
 ('Pipe A fills a tank in 10 hours and pipe B in 15 hours. Outlet C empties the full tank in 12 hours. If all three are opened together on an empty tank, how long will it take to fill?',
  ['12 hours', '6 hours', '8 hours', '15 hours'],
  'Net rate is 1/10 + 1/15 - 1/12 = 6/60 + 4/60 - 5/60 = 5/60 = 1/12 tank per hour, so 12 hours. 6 hours ignores the outlet.'),
 ('A bus arrives 20 minutes late when it runs at 45 km/h and 10 minutes early when it runs at 54 km/h. What is the length of the route?',
  ['135 km', '150 km', '120 km', '162 km'],
  'The two journey times differ by 30 minutes: d/45 - d/54 = 1/2, so d/270 = 1/2 and d = 135 km.'),
 ('A and B together finish a job in 12 days, B and C in 15 days, and C and A in 20 days. How long will A, B and C take working together?',
  ['10 days', '5 days', '15 days', '8 days'],
  'Adding the three pair rates gives 1/12 + 1/15 + 1/20 = 1/5, which is twice the rate of all three. So all three do 1/10 a day and need 10 days. 5 days forgets to halve.'),
 ('Two trains 150 m and 100 m long run on parallel tracks in opposite directions at 54 km/h and 36 km/h. How long do they take to pass each other completely?',
  ['10 seconds', '50 seconds', '25 seconds', '12.5 seconds'],
  'Moving in opposite directions, the relative speed is 90 km/h = 25 m/s. They must cover 250 m, taking 10 seconds. 50 seconds uses the difference of speeds, which applies only in the same direction.'),
 ('If 3(x - 4) - 2(x - 7) = 5, what is x?',
  ['3', '7', '31', '1'],
  'Expanding gives 3x - 12 - 2x + 14 = x + 2 = 5, so x = 3. Writing -14 instead of +14 leads to 31.'),
 ('If 2a + 3b = 31 and 3a - b = 19, what is a + b?',
  ['13', '8', '11', '15'],
  'From the second equation b = 3a - 19. Then 2a + 9a - 57 = 31, so a = 8 and b = 5, giving a + b = 13.'),
 ('The sum of five consecutive even numbers is 240. What is the product of the smallest and the largest?',
  ['2,288', '2,304', '2,200', '2,392'],
  'The middle number is 240/5 = 48, so the numbers run from 44 to 52 and 44 times 52 = 2,288. 2,304 is 48 squared.'),
 ('What is the smallest number that leaves a remainder of 4 when divided by 6, by 9 and by 15?',
  ['94', '90', '86', '184'],
  'The LCM of 6, 9 and 15 is 90, so the number is 90 + 4 = 94. 184 uses 180, a common multiple that is not the least.'),
 ('A rectangular plot is 40 m long and 25 m wide. A path 2.5 m wide runs inside it along all four sides. What is the area of the path in square metres?',
  ['300', '350', '325', '260'],
  'The plot is 1000 m². Inside the path the ground is 35 m by 20 m, or 700 m², so the path is 300 m². 350 is the answer for a path outside the plot.'),
 ('How many cubes of edge 3 cm can be cut from a solid block 18 cm by 12 cm by 9 cm?',
  ['72', '64', '96', '216'],
  'Along the edges fit 6, 4 and 3 cubes, so 6 times 4 times 3 = 72. Dividing the volume 1944 by 9 instead of 27 gives 216.'),
 ('A triangle has sides of 13 cm, 14 cm and 15 cm. What is its area in square centimetres?',
  ['84', '91', '105', '78'],
  "By Heron's formula s = 21 and the area is the square root of 21 times 8 times 7 times 6 = 7056, which is 84."),
 ('The length of a rectangle is increased by 20% and its breadth is decreased by 20%. What happens to its area?',
  ['It falls by 4%', 'It stays the same', 'It rises by 4%', 'It falls by 2%'],
  '1.2 times 0.8 is 0.96, so the area falls by 4%. The rise and fall do not cancel because they act on different sides.'),
 ('The angles of a triangle are in the ratio 2:3:4. What is the largest angle?',
  ['80°', '60°', '90°', '40°'],
  'The parts total 9, so one part is 20° and the largest angle is 4 times 20 = 80°.'),
 ('In an isosceles triangle, the vertex angle is 30° more than each base angle. What is each base angle?',
  ['50°', '80°', '75°', '65°'],
  'With base angles b, b + b + (b + 30) = 180, so b = 50°. 80° is the vertex angle.'),
 ('What is each interior angle of a regular octagon?',
  ['135°', '120°', '144°', '45°'],
  'Each exterior angle is 360/8 = 45°, so each interior angle is 180 - 45 = 135°. 120° belongs to a hexagon and 144° to a decagon.'),
 ('Two supplementary angles differ by 36°. What is the larger angle?',
  ['108°', '72°', '126°', '63°'],
  'The angles add to 180°, so the larger is (180 + 36)/2 = 108°. 63° comes from treating them as complementary.'),
 ('Two fair dice are rolled together. What is the probability that the total is 8?',
  ['5/36', '1/6', '1/9', '1/12'],
  'The totals of 8 are (2,6), (3,5), (4,4), (5,3) and (6,2): 5 of 36 outcomes. 1/6 is the probability of a total of 7.'),
 ('Simplify 2 1/3 + 1 3/4 - 1 5/6.',
  ['2 1/4', '2 1/12', '2 5/12', '1 3/4'],
  'In twelfths: 28/12 + 21/12 - 22/12 = 27/12 = 2 1/4.'),
 ('A bag holds 5 red and 3 blue balls. Two balls are drawn at random without replacement. What is the probability that both are blue?',
  ['3/28', '9/64', '3/14', '1/8'],
  '3/8 times 2/7 = 6/56 = 3/28. 9/64 would be correct only if the first ball were put back.'),
 ('Which fraction in lowest terms equals 0.363636..., with 36 repeating?',
  ['4/11', '9/25', '2/5', '11/30'],
  'Two repeating digits give 36/99, which reduces to 4/11. 9/25 is 0.36 exactly, which does not repeat.'),
 ('Three tankers hold 403, 434 and 465 litres of milk. What is the largest measure that can empty each tanker in a whole number of fills?',
  ['31 litres', '13 litres', '29 litres', '62 litres'],
  'The HCF is needed. 403 = 13 times 31, 434 = 14 times 31 and 465 = 15 times 31, so the HCF is 31.'),
 ('What is the square root of 0.0169 multiplied by the square root of 1.44?',
  ['0.156', '1.56', '0.0156', '0.312'],
  'The square root of 0.0169 is 0.13 and of 1.44 is 1.2; 0.13 times 1.2 = 0.156.'),
 ('A committee of 3 is to be chosen from 5 men and 4 women so that it has exactly one woman. In how many ways can this be done?',
  ['40', '84', '80', '30'],
  'Choose 1 of 4 women and 2 of 5 men: 4 times 10 = 40. 84 counts all committees of 3 with no condition.'),
 ('The 5th term of an arithmetic progression is 23 and its 12th term is 58. What is its 20th term?',
  ['98', '103', '93', '100'],
  'Seven steps add 35, so the common difference is 5 and the first term is 23 - 20 = 3. The 20th term is 3 + 19 times 5 = 98.'),
 ('The observations 11, 14, 19, x + 2, x + 4, 30, 35, 41 are in ascending order and their median is 24. What is x?',
  ['21', '22', '20', '23'],
  'With eight values the median is the mean of the 4th and 5th: (2x + 6)/2 = x + 3 = 24, so x = 21.'),
 ('The mean of 9 numbers is 35. When one number is removed, the mean of the rest is 33. Which number was removed?',
  ['51', '49', '53', '37'],
  'The total falls from 9 times 35 = 315 to 8 times 33 = 264, so the removed number is 51.'),
 ('An office disposed of 120 files in June, 150 in July, 130 in August and 200 in September. By what percentage did the September figure exceed the average for the four months?',
  ['33 1/3%', '25%', '50%', '66 2/3%'],
  'The four months total 600, an average of 150. September is 50 above that, and 50/150 = 33 1/3%. Dividing by 200 instead gives 25%.'),
 ('A department processed 1,250 forms in 2024 and 1,450 in 2025. If the number grows by the same percentage in 2026, how many forms will it process in 2026?',
  ['1,682', '1,650', '1,666', '1,740'],
  'Growth in 2025 was 200/1250 = 16%, and 1450 times 1.16 = 1,682. Adding another 200 forms gives 1,650, which is equal growth in number, not in percentage.'),
 ('What is the remainder when 2 raised to the power 31 is divided by 5?',
  ['3', '2', '4', '1'],
  'Powers of 2 leave remainders 2, 4, 3, 1 in a cycle of four. 31 leaves remainder 3 on division by 4, so the remainder is the third in the cycle, 3.'),
 ('If 35% of a number is 168, what is 60% of the same number?',
  ['288', '252', '294', '312'],
  'The number is 168/0.35 = 480, and 60% of 480 = 288.'),
 ('On a map, 2.5 cm stands for 15 km. Two towns are 42 km apart. How far apart are they on the map?',
  ['7 cm', '6.3 cm', '8.4 cm', '10.5 cm'],
  'One centimetre stands for 6 km, so 42 km is 7 cm.'),
 ('If x:y = 3:4 and y:z = 6:7, what is x:z?',
  ['9:14', '3:7', '6:7', '7:9'],
  'Make y the same in both: x:y = 9:12 and y:z = 12:14, so x:z = 9:14.'),
 ('The price of a scooter is raised by 25%, then cut by 20%, then raised again by 10%. What is the overall change from the original price?',
  ['A rise of 10%', 'A rise of 15%', 'No change', 'A rise of 5%'],
  '1.25 times 0.8 is 1, and a 10% rise on that gives 1.1, so the price is 10% higher. Adding and subtracting the percentages gives 15%, which is wrong.'),
 ('A car travels 120 km at 40 km/h and returns the same distance at 60 km/h. What is its average speed for the whole journey?',
  ['48 km/h', '50 km/h', '45 km/h', '52 km/h'],
  'Total distance is 240 km and total time is 3 + 2 = 5 hours, so the average speed is 48 km/h. 50 km/h is the simple mean of the two speeds, which ignores the longer time spent at 40 km/h.'),
 ('Three machines make 450 parts in 5 hours, each working at the same constant rate. How many parts will two such machines make in 4 hours?',
  ['240 parts', '300 parts', '360 parts', '180 parts'],
  'Each machine makes 450/(3 times 5) = 30 parts an hour; two machines for 4 hours make 2 times 4 times 30 = 240.'),
]

# Arithmetic checks for every computed key.
assert round(1.2 * 1.15 - 1, 4) == 0.38
assert round(1170 / 1.17) == 1000
assert round(1.4 * 0.85, 4) == 1.19
assert F(100, 80) == F(5, 4)
assert 7 * 40 / (5 * 40 + 40) == 7 / 6 and 7 * 40 == 280
assert 31 * 41 - 30 * 40 == 71
assert (1 - 4 * (F(1, 12) + F(1, 18))) / F(1, 18) == 8
assert (240 + 360) / (240 / 16) == 40
assert 8000 * F(121, 100) - 8000 - 8000 * F(2, 10) == 80
assert 2500 * 0.8 * 0.9 == 1800
assert 7000 * 15 // 35 == 3000 and 7000 * 12 // 35 == 2400 and 7000 * 8 // 35 == 1600
assert 80 * 50 - (50 * 40 + 30 * 48) == 560
assert 1 / (F(1, 10) + F(1, 15) - F(1, 12)) == 12
assert F(135, 45) - F(135, 54) == F(1, 2)
assert 1 / ((F(1, 12) + F(1, 15) + F(1, 20)) / 2) == 10
assert 250 / ((54 + 36) * 5 / 18) == 10
assert 3 * (3 - 4) - 2 * (3 - 7) == 5
assert 2 * 8 + 3 * 5 == 31 and 3 * 8 - 5 == 19
assert sum(range(44, 53, 2)) == 240 and 44 * 52 == 2288
assert all(94 % d == 4 for d in (6, 9, 15)) and not any(all(n % d == 4 for d in (6, 9, 15)) for n in range(5, 94))
assert 40 * 25 - 35 * 20 == 300
assert (18 // 3) * (12 // 3) * (9 // 3) == 72
assert sqrt(21 * 8 * 7 * 6) == 84
assert round(1.2 * 0.8, 4) == 0.96
assert 180 * 4 // 9 == 80
assert (180 - 30) / 3 == 50
assert 180 - 360 / 8 == 135
assert (180 + 36) / 2 == 108
assert sum(1 for a in range(1, 7) for b in range(1, 7) if a + b == 8) == 5
assert F(7, 3) + F(7, 4) - F(11, 6) == F(9, 4)
assert F(3, 8) * F(2, 7) == F(3, 28)
assert F(36, 99) == F(4, 11)
assert gcd(gcd(403, 434), 465) == 31
assert round(sqrt(0.0169) * sqrt(1.44), 6) == 0.156
assert 4 * comb(5, 2) == 40 and comb(9, 3) == 84
assert 3 + 19 * 5 == 98 and 3 + 4 * 5 == 23 and 3 + 11 * 5 == 58
assert ((21 + 2) + (21 + 4)) / 2 == 24
assert 9 * 35 - 8 * 33 == 51
assert F(200 - 150, 150) == F(1, 3) and 120 + 150 + 130 + 200 == 600
assert round(1450 * (1 + 200 / 1250)) == 1682
assert pow(2, 31, 5) == 3
assert 168 / 0.35 * 0.6 == 288.0 or round(168 / 0.35 * 0.6) == 288
assert 42 / (15 / 2.5) == 7
assert F(3, 4) / F(7, 6) == F(9, 14)
assert round(1.25 * 0.8 * 1.1, 6) == 1.1
assert 240 / (120 / 40 + 120 / 60) == 48
assert 2 * 4 * 450 / 15 == 240
assert len(ITEMS) == 47
