# QA: arithmetic. Every answer asserted.
from fractions import Fraction as Fr
assert round(1.4 * 0.85 - 1, 4) == 0.19
assert 45 / (15 + 15) == 3 / 2
assert 6 * (Fr(1, 18) + Fr(1, 27)) == Fr(5, 9) and Fr(4, 9) * 27 == 12
assert 600 / 30 * 18 / 5 == 72
assert round(20000 * 1.09 ** 2) - 20000 == 3762
assert 31 * 16 - 30 * 15 == 46
assert Fr(1, 1) - Fr(1, Fr(5, 4)) == Fr(1, 5)
assert 40000 * 12 == 60000 * 8
assert round(1 - 0.8 * 0.9, 4) == 0.28
assert 1 / (Fr(1, 12) + Fr(1, 20) - Fr(1, 30)) == 10 and 1 / (Fr(1, 12) + Fr(1, 20)) == Fr(15, 2)
assert 40 / 20 + 40 / 16 == 4.5
assert 15000 * Fr(1, 100) == 150
assert (30 * 62 + 50 * 70) / 80 == 67
assert 8 * 15 == 30 * 4
assert 300 / (55 + 45) == 3
assert round(1.1 * 0.9, 4) == 0.99
assert Fr(15 - 12, 12) == Fr(1, 4)
assert 30 / Fr(6, 5) == 25
assert 150 / (48 * 5 / 18) == 11.25
assert 100 / 5 == 20
assert Fr(2 * 40 * 60, 100) == 48
assert 4 * 6000 - 3 * 6000 == 6000 and 5 * 6000 - 4 * 6000 == 6000
assert (178 + 22) / 0.4 == 500
assert 1 / (Fr(1, 8) - Fr(1, 12)) == 24

ITEMS = [
    # ---------- Test 1 ----------
    T(1, 2, "Profit and discount", "A shopkeeper marks an article 40% above its cost price and then gives a discount of 15% on the marked price. What is his profit as a percentage of the cost price?",
      "19", "If the cost is 100, the marked price is 140 and the selling price is 85% of 140 = 119, a profit of 19%. Subtracting 15 from 40 (25%) ignores that the discount is taken on the higher marked price."),
    T(1, 2, "Mixtures", "A 60-litre mixture contains milk and water in the ratio 3 : 1. How many litres of water must be added to make the ratio 3 : 2?",
      "15", "The mixture has 45 litres of milk and 15 of water. For milk : water = 3 : 2 the water must be 30 litres, so 15 litres are added."),
    N(1, 2, "Time and work", "A can finish a job in 18 days and B in 27 days. They work together for 6 days, then A leaves and B finishes the job alone. How many days does the job take in all?",
      "18", ["15", "16", "20"], "Together they do 1/18 + 1/27 = 5/54 of the job a day, so 6 days complete 30/54 = 5/9. B does the remaining 4/9 at 1/27 a day in 12 days, so the job takes 6 + 12 = 18 days."),
    N(1, 2, "Speed and distance", "A 240-metre train passes completely over a 360-metre platform in 30 seconds. What is its speed in km/h?",
      "72", ["60", "64", "80"], "The train covers its own length plus the platform, 600 m, in 30 s: 20 m/s. Multiply by 18/5 to get 72 km/h. Using only the platform's length gives 12 m/s, about 43 km/h."),
    T(1, 3, "Compound interest", "What is the compound interest, in rupees, on Rs 20,000 for 2 years at 9% a year, compounded annually?",
      "3762", "Amount = 20,000 x 1.09 x 1.09 = 23,762, so the interest is 23,762 - 20,000 = 3,762. Simple interest would be only 3,600; the extra 162 is interest on the first year's interest."),
    T(1, 2, "Averages", "The average age of 30 students is 15 years. When the teacher's age is included, the average rises to 16 years. What is the teacher's age in years?",
      "46", "The 31 ages total 31 x 16 = 496 and the students' ages total 30 x 15 = 450, so the teacher is 496 - 450 = 46."),
    N(1, 3, "Percentages", "The price of sugar rises by 25%. By what percentage must a family cut its consumption to keep its spending on sugar unchanged?",
      "20%", ["16%", "24%", "25%"], "Spending = price x quantity. If the price becomes 5/4 of the old price, quantity must become 4/5, a cut of 1/5 = 20%. Cutting by 25% would reduce spending."),
    N(1, 2, "Partnership", "A invests Rs 40,000 for 12 months and B invests Rs 60,000 for 8 months in a business. Out of a profit of Rs 36,000, what is A's share?",
      "Rs 18,000", ["Rs 14,400", "Rs 21,600", "Rs 24,000"], "Shares follow money x time: 40,000 x 12 = 4,80,000 and 60,000 x 8 = 4,80,000, a ratio of 1 : 1, so A gets half, Rs 18,000. Splitting by the amounts alone (2 : 3) gives Rs 14,400."),
    # ---------- Test 2 ----------
    T(2, 2, "Successive discounts", "Two successive discounts of 20% and 10% are equal to a single discount of what percentage?",
      "28", "After 20% off, 80 remains of 100; 10% off that leaves 72. The single discount is 28%, not 30%, because the second discount is taken on a smaller price."),
    N(2, 3, "Pipes and cisterns", "Pipe A fills a tank in 12 hours and pipe B in 20 hours, while pipe C empties the full tank in 30 hours. If all three are opened together on an empty tank, how many hours does it take to fill?",
      "10", ["7.5", "9", "12"], "Net rate = 1/12 + 1/20 - 1/30 = (5 + 3 - 2)/60 = 6/60 of the tank an hour, so it fills in 10 hours. Ignoring C gives 7.5 hours."),
    T(2, 2, "Boats and streams", "A boat's speed in still water is 18 km/h and the stream flows at 2 km/h. How many hours does the boat take to go 40 km downstream and come back?",
      "4.5", "Downstream speed is 20 km/h and upstream 16 km/h, so the trip takes 40/20 + 40/16 = 2 + 2.5 = 4.5 hours."),
    T(2, 3, "Interest", "The difference between the compound interest and the simple interest on a sum for 2 years at 10% a year is Rs 150. What is the sum, in rupees?",
      "15000", "For 2 years the difference is the interest on the first year's interest: P x (10/100)^2 = P/100. So P/100 = 150 and P = 15,000."),
    N(2, 2, "Weighted average", "Section A has 30 students with an average mark of 62 and section B has 50 students with an average of 70. What is the average mark of all 80 students?",
      "67", ["66", "68", "69"], "Total marks = 30 x 62 + 50 x 70 = 1,860 + 3,500 = 5,360, and 5,360/80 = 67. The simple average of 62 and 70 is 66, which ignores that B is larger."),
    T(2, 3, "Alligation", "How many kilograms of rice costing Rs 42 per kg must be mixed with 30 kg of rice costing Rs 54 per kg so that the mixture costs Rs 50 per kg?",
      "15", "The cheaper rice is 8 below the mixture price and the dearer 4 above it, so the quantities are in the ratio 4 : 8 = 1 : 2. With 30 kg of the dearer rice, 15 kg of the cheaper one is needed."),
    S(2, 1, "Relative speed", "Two cars 300 km apart set off towards each other at 9:00 a.m., one at 55 km/h and the other at 45 km/h. At what time do they meet?",
      ["12:00 noon", "11:30 a.m.", "12:30 p.m.", "1:00 p.m."],
      "Moving towards each other, they close the gap at 55 + 45 = 100 km/h, so they meet after 300/100 = 3 hours, at noon."),
    S(2, 2, "Percentage change", "A town's population rises by 10% in one year and falls by 10% the next. Compared with the start, the population:",
      ["falls by 1%", "is unchanged", "rises by 1%", "falls by 2%"],
      "100 becomes 110, then 110 - 11 = 99: a net fall of 1%. The 10% fall is taken on the larger figure, so it outweighs the rise."),
    # ---------- Drill only ----------
    T(0, 2, "Profit and loss", "The cost price of 15 articles equals the selling price of 12 of them. What is the profit percentage?",
      "25", "Let each article cost 1. Twelve articles sell for 15, so each sells for 15/12 = 1.25, a profit of 25%. 3/15 = 20% is the wrong base."),
    T(0, 2, "Time and work", "A is 20% more efficient than B. If B alone finishes a job in 30 days, how many days does A take alone?",
      "25", "A does 1.2 times B's work each day, so A needs 30/1.2 = 25 days. Taking 20% off 30 gives 24, which is wrong because time varies inversely with efficiency."),
    N(0, 3, "Relative speed", "A 150-metre train running at 54 km/h overtakes a man walking at 6 km/h in the same direction. In how many seconds does it pass him?",
      "11.25", ["9", "10", "12.5"], "Relative speed = 54 - 6 = 48 km/h = 48 x 5/18 = 40/3 m/s. Time = 150 / (40/3) = 11.25 s. Adding the speeds (60 km/h) gives 9 s, the time for a man walking towards the train."),
    T(0, 1, "Simple interest", "A sum doubles itself in 5 years at simple interest. What is the rate of interest per year, in percent?",
      "20", "Doubling means the interest equals the principal, 100% in 5 years, so the rate is 100/5 = 20% a year."),
    N(0, 2, "Average speed", "A cyclist rides from home to a market at 40 km/h and returns along the same road at 60 km/h. What is the average speed for the whole trip, in km/h?",
      "48", ["45", "50", "52"], "For equal distances the average speed is 2 x 40 x 60 / (40 + 60) = 48 km/h. The simple average, 50, is wrong because more time is spent at the slower speed."),
    T(0, 3, "Ratios", "The incomes of A and B are in the ratio 4 : 5 and their expenses in the ratio 3 : 4. If each saves Rs 6,000, what is A's income in rupees?",
      "24000", "Let the incomes be 4x and 5x and the expenses 3y and 4y. Then 4x - 3y = 6,000 and 5x - 4y = 6,000. Subtracting gives x = y, so 4x - 3x = 6,000 and x = 6,000. A's income is 24,000."),
    T(0, 2, "Percentages", "A student needs 40% of the maximum marks to pass. She scores 178 marks and fails by 22 marks. What are the maximum marks?",
      "500", "The pass mark is 178 + 22 = 200, which is 40% of the maximum, so the maximum is 200/0.4 = 500."),
    N(0, 2, "Time and work", "A and B together can finish a job in 8 days, and A alone in 12 days. How many days would B alone take?",
      "24", ["16", "20", "30"], "B's rate = 1/8 - 1/12 = 1/24 of the job a day, so B takes 24 days. Subtracting the days, 12 - 8 = 4, has no meaning for rates."),
]
