# Quantitative Aptitude: arithmetic word problems. Every answer is asserted below.
from fractions import Fraction as F
from math import comb
assert F(15, 10) * F(8, 10) == F(12, 10)
assert 2880 / (0.08 * 3) == 12000
assert 64 / F(8, 100) ** 2 == 10000
assert (1 - 6 * (F(1, 15) + F(1, 20))) * 20 == 6
assert F(450, 27) * F(18, 5) == 60
assert 48 / 24 + 48 / 16 == 5
assert (5 * 6 + 6) * 4 == (7 * 6 + 6) * 3 and 7 * 6 == 42
assert F(42, 18 + 10) == F(3, 2)
assert 35000 * 12 * 39000 / (35000 * 12 + 45000 * 8) == 21000
assert F(comb(4, 2), comb(12, 2)) == F(1, 11)
assert round(1330 / 0.95 * 1.15, 6) == 1610
assert 20000 * F(11, 10) ** 3 - 20000 == 6620
assert 16 * 21 / 24 == 14
assert 1 / (F(1, 12) + F(1, 18) - F(1, 9)) == 36
assert (180 + 240) / ((46 + 62) * 5 / 18) == 14
assert 6 * 35 - 5 * 33 == 45
assert F(60, 160) == F(375, 1000)
assert 7800 * F(3, 13) == 1800
assert 21 ** 2 - 24 * 18 == 9
assert F(1, 9) == F(sum(1 for a in range(1, 7) for b in range(1, 7) if a + b == 9), 36)
assert 1 - F(75, 100) * F(88, 100) == F(34, 100)
assert 16 + 40 == 56 and 40 - 4 == 3 * (16 - 4)
assert 2 * 30 * 45 / (30 + 45) == 36
ITEMS = [
    # ---------- Mock Test 1 ----------
    N(1, 2, "Profit and loss", "A trader marks a mixer grinder 50% above its cost price and then allows a discount of 20%. What is his profit percentage?",
      "20%", ["22.5%", "25%", "30%", "70%"],
      "On a cost of 100 the marked price is 150, and 20% off leaves 120. The profit is 20%. Subtracting 20 from 50 would wrongly give 30%."),
    N(1, 1, "Simple interest", "A sum of money earns simple interest of ₹2,880 in 3 years at 8% per annum. What is the sum?",
      "₹12,000", ["₹10,000", "₹11,500", "₹12,500", "₹14,400"],
      "Interest for 3 years at 8% is 24% of the sum. 2,880 ÷ 0.24 = 12,000."),
    N(1, 3, "Compound interest", "The difference between the compound interest and the simple interest on a sum for 2 years at 8% per annum, compounded annually, is ₹64. What is the sum?",
      "₹10,000", ["₹6,400", "₹8,000", "₹12,000", "₹16,000"],
      "For 2 years the difference is P × (r/100)², so P × 0.0064 = 64 and P = 10,000."),
    N(1, 2, "Time and work", "A can finish a piece of work in 15 days and B in 20 days. They work together for 6 days, and then A leaves. In how many days will B finish the remaining work?",
      "6", ["3", "4", "5", "8"],
      "Together they do 1/15 + 1/20 = 7/60 a day, so 42/60 = 7/10 in 6 days. B does the remaining 3/10 at 1/20 a day, which takes 6 days."),
    N(1, 1, "Speed, time and distance", "A goods train 450 m long crosses a pole in 27 seconds. What is its speed in km/h?",
      "60", ["45", "48", "50", "54"],
      "450 ÷ 27 = 50/3 m/s, and 50/3 × 18/5 = 60 km/h."),
    N(1, 2, "Boats and streams", "A motorboat's speed in still water is 20 km/h and the river flows at 4 km/h. How many hours will it take to go 48 km downstream and return to the start?",
      "5", ["4.8", "6", "6.5", "7"],
      "Downstream speed is 24 km/h (2 hours) and upstream 16 km/h (3 hours), so 5 hours in all. Ignoring the current gives 4.8 hours."),
    N(1, 2, "Ages", "The present ages of A and B are in the ratio 5 : 7. After 6 years the ratio will be 3 : 4. What is B's present age in years?",
      "42", ["28", "30", "35", "36"],
      "Let the ages be 5x and 7x. (5x + 6) : (7x + 6) = 3 : 4 gives 20x + 24 = 21x + 18, so x = 6 and B is 42."),
    N(1, 2, "Mixtures", "60 litres of a mixture contain milk and water in the ratio 7 : 3. How many litres of water must be added to make the ratio 3 : 2?",
      "10", ["12", "14", "15", "18"],
      "Milk is 42 litres and water 18. For 42 : (18 + w) = 3 : 2, 18 + w = 28, so w = 10."),
    N(1, 2, "Partnership", "Farah invests ₹35,000 for 12 months and Gopal invests ₹45,000 for 8 months in a business. Out of a profit of ₹39,000, what is Farah's share?",
      "₹21,000", ["₹18,000", "₹19,500", "₹22,500", "₹24,000"],
      "The shares are in the ratio 35,000 × 12 : 45,000 × 8 = 420 : 360 = 7 : 6. Farah gets 7/13 of 39,000 = 21,000."),
    S(1, 2, "Probability", "A bag holds 5 red, 4 blue and 3 green balls. Two balls are drawn at random together. What is the probability that both are blue?",
      ["1/11", "1/9", "2/11", "1/6", "4/33"],
      "There are 4C2 = 6 ways to pick two blue balls out of 12C2 = 66 ways in all, so 6/66 = 1/11."),

    # ---------- Mock Test 2 ----------
    N(2, 2, "Profit and loss", "By selling a cooler for ₹1,330, a trader loses 5%. At what price should he sell it to gain 15%?",
      "₹1,610", ["₹1,540", "₹1,575", "₹1,650", "₹1,680"],
      "The cost is 1,330 ÷ 0.95 = 1,400, and 1,400 × 1.15 = 1,610."),
    N(2, 3, "Compound interest", "What is the compound interest on ₹20,000 for 3 years at 10% per annum, compounded annually?",
      "₹6,620", ["₹6,000", "₹6,200", "₹6,300", "₹6,600"],
      "The amount is 20,000 × 1.1³ = 26,620, so the interest is 6,620. Simple interest would give 6,000."),
    N(2, 1, "Time and work", "16 workers can lay a pipeline in 21 days. In how many days can 24 workers lay it, working at the same rate?",
      "14", ["12", "18", "28", "32"],
      "The job needs 16 × 21 = 336 worker-days, and 336 ÷ 24 = 14 days."),
    N(2, 2, "Pipes and cisterns", "Pipe A can fill a tank in 12 minutes and pipe B in 18 minutes, while pipe C can empty it in 9 minutes. If all three are opened together on an empty tank, how many minutes will it take to fill?",
      "36", ["18", "24", "30", "32"],
      "Each minute fills 1/12 + 1/18 − 1/9 = (3 + 2 − 4)/36 = 1/36 of the tank, so it fills in 36 minutes."),
    N(2, 2, "Speed, time and distance", "Two trains 180 m and 240 m long run in opposite directions at 46 km/h and 62 km/h. How many seconds do they take to cross each other?",
      "14", ["15", "16", "18", "21"],
      "The relative speed is 108 km/h = 30 m/s and the distance is 180 + 240 = 420 m, so 420 ÷ 30 = 14 seconds."),
    N(2, 1, "Averages", "The average of six numbers is 35. When one number is removed, the average of the other five is 33. What number was removed?",
      "45", ["39", "41", "43", "47"],
      "The six numbers total 210 and the five left total 165, so the number removed is 45."),
    N(2, 2, "Percentage", "Rani's salary is 60% more than Sohan's. By what percentage is Sohan's salary less than Rani's?",
      "37.5%", ["30%", "40%", "60%", "62.5%"],
      "If Sohan earns 100, Rani earns 160. Sohan is 60 less than 160, and 60 ÷ 160 = 37.5%."),
    N(2, 2, "Ratio and proportion", "₹7,800 is divided among P, Q and R in the ratio 1/2 : 1/3 : 1/4. What is R's share?",
      "₹1,800", ["₹1,600", "₹1,950", "₹2,400", "₹2,600"],
      "Multiplying by 12 turns the ratio into 6 : 4 : 3, which has 13 parts. R gets 3/13 of 7,800 = 1,800."),
    N(2, 2, "Mensuration", "A rectangle is 24 cm long and 18 cm wide. A square has the same perimeter as the rectangle. By how many square centimetres does the square's area exceed the rectangle's?",
      "9", ["3", "4", "6", "8"],
      "The perimeter is 84 cm, so the square's side is 21 cm and its area 441 cm². The rectangle's area is 432 cm², a difference of 9."),
    S(2, 1, "Probability", "Two fair dice are thrown together. What is the probability that the sum of the numbers shown is 9?",
      ["1/9", "1/6", "5/36", "1/12", "7/36"],
      "The pairs (3, 6), (4, 5), (5, 4) and (6, 3) give 9: four outcomes out of 36, which is 1/9."),

    # ---------- Drill only ----------
    N(0, 1, "Discount", "Two successive discounts of 25% and 12% are equal to a single discount of:",
      "34%", ["30%", "33%", "37%", "40%"],
      "After 25% off, 75 remains; 12% off that leaves 66. The single discount is 34%, not 37%."),
    N(0, 2, "Ages", "The sum of the present ages of a mother and her daughter is 56 years. Four years ago the mother was three times as old as the daughter. What is the daughter's present age in years?",
      "16", ["18", "20", "22", "24"],
      "Let the daughter be d. Then 56 − d − 4 = 3(d − 4), so 52 − d = 3d − 12 and d = 16."),
    N(0, 2, "Speed, time and distance", "A cyclist rides to a village at 30 km/h and returns along the same road at 45 km/h. What is her average speed for the whole journey in km/h?",
      "36", ["37.5", "38", "40", "42"],
      "For equal distances the average speed is 2 × 30 × 45 ÷ (30 + 45) = 36 km/h, not the simple average of 37.5."),
]
