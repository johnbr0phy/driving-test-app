# Numerical Ability: arithmetic word problems.
from fractions import Fraction as Fr
assert round(640 * 1.15, 6) == 736 and 7500 * 0.06 * 4 == 1800
assert round(20000 * 1.06 ** 2 - 20000, 6) == 2472
assert 5 * 42 - 4 * 40 == 50 and 5400 * 4 / 9 == 2400
assert Fr(1, 1) / (Fr(1, 15) + Fr(1, 10)) == 6
assert round(240 / 16 * 18 / 5, 6) == 54
assert (2 * 10 + 5) * 3 == 7 * 10 + 5
assert Fr(25, 125) == Fr(1, 5)
assert round(2000 * 0.8 * 0.9, 6) == 1440 and 54 / (14 + 4) == 3 and 54 / (14 - 4) == 5.4
assert round(1035 / 1.15, 6) == 900 and round(2240 / (8000 * 4), 6) == 0.07 and round(5000 * 0.08 ** 2, 6) == 32
assert (5 * 6 + 6) * 3 == (8 * 6 + 6) * 2
assert Fr(1, 20) + Fr(1, 30) - Fr(1, 60) == Fr(1, 15)
assert 2 * 45 * 30 / 75 == 36
assert 45 + 15 == 60 and 45 - 5 == 4 * (15 - 5)
assert round((153 + 27) / 0.36, 6) == 500
assert 18000 * 25000 * 12 / (25000 * 12 + 30000 * 8) == 10000
assert 300 / (90 * 5 / 18) == 12 and 300 / (18 * 5 / 18) == 60
assert round(1.3 * 0.9, 6) == 1.17 and 16 * 15 / 20 == 12 and 15 * 20 / 16 == 18.75
assert 6200 * 7 * 3 / 100 == 1302 and Fr(1, 24) + Fr(1, 40) == Fr(1, 15)
assert (230 + 170) / ((54 + 90) * 5 / 18) == 10 and (230 + 170) / ((90 - 54) * 5 / 18) == 40
ITEMS = [
    # ---------- Mock Test 1 ----------
    S(1, 1, "Profit and loss",
      "A shopkeeper buys a mixer for ₹640 and sells it at a profit of 15%. What is the selling price?",
      ["₹736", "₹724", "₹756", "₹704", "₹760"],
      "Profit = 15% of 640 = ₹96, so the selling price is 640 + 96 = ₹736."),
    S(1, 1, "Simple interest",
      "What is the simple interest on ₹6,200 at 7% per annum for 3 years?",
      ["₹1,302", "₹1,240", "₹1,364", "₹1,178", "₹1,426"],
      "SI = P × R × T ÷ 100 = 6,200 × 7 × 3 ÷ 100 = ₹1,302."),
    S(1, 2, "Compound interest",
      "What is the compound interest on ₹20,000 at 6% per annum for 2 years, compounded annually?",
      ["₹2,472", "₹2,400", "₹2,420", "₹2,500", "₹2,436"],
      "Amount = 20,000 × 1.06 × 1.06 = ₹22,472, so CI = ₹2,472. (₹2,400 is the simple interest.)"),
    S(1, 2, "Average",
      "The average of five numbers is 42. When one number is removed, the average of the other four is 40. What number was removed?",
      ["50", "48", "46", "52", "44"],
      "The five numbers total 5 × 42 = 210 and the four total 4 × 40 = 160, so the removed number is 210 − 160 = 50."),
    S(1, 1, "Ratio",
      "₹5,400 is divided among Farida, Gautam and Hari in the ratio 3 : 4 : 2. What is Gautam's share?",
      ["₹2,400", "₹1,800", "₹1,200", "₹2,700", "₹2,160"],
      "The ratio has 3 + 4 + 2 = 9 parts, so one part is ₹600. Gautam gets 4 parts, ₹2,400."),
    S(1, 2, "Time and work",
      "Ravi can paint a hall in 24 days and Mohan can paint it in 40 days. Working together, in how many days will they finish it?",
      ["15 days", "32 days", "16 days", "12 days", "18 days"],
      "Together they do 1/24 + 1/40 = 5/120 + 3/120 = 8/120 = 1/15 of the job a day, so they need 15 days. (32 days is the average of 24 and 40, a common mistake.)"),
    S(1, 2, "Speed and distance",
      "A train 240 metres long passes a pole in 16 seconds. What is its speed in km/h?",
      ["54 km/h", "48 km/h", "60 km/h", "45 km/h", "72 km/h"],
      "Speed = 240 ÷ 16 = 15 m/s. Multiply by 18/5 to convert: 15 × 18/5 = 54 km/h."),
    S(1, 3, "Ages",
      "The present ages of Neha and her mother are in the ratio 2 : 7. After 5 years, the ratio will be 1 : 3. What is Neha's present age?",
      ["20 years", "15 years", "18 years", "22 years", "25 years"],
      "Let the ages be 2x and 7x. (2x + 5) : (7x + 5) = 1 : 3 gives 6x + 15 = 7x + 5, so x = 10 and Neha is 20."),
    S(1, 2, "Percentage",
      "Gita's salary is 50% more than Ramesh's. By what percentage is Ramesh's salary less than Gita's?",
      ["33 1/3%", "50%", "25%", "40%", "66 2/3%"],
      "If Ramesh earns 100, Gita earns 150. Ramesh earns 50 less out of 150, which is one third, 33 1/3%."),
    S(1, 2, "Mixtures",
      "A 72-litre mixture contains milk and water in the ratio 5 : 1. How much water must be added to make the ratio 5 : 2?",
      ["12 litres", "10 litres", "14 litres", "24 litres", "15 litres"],
      "The mixture has 60 litres of milk and 12 of water. For 5 : 2 with 60 litres of milk, water must be 24 litres, so add 12 litres. (24 litres is the new total of water, not the amount to add.)"),
    S(1, 2, "Discount",
      "A pressure cooker marked at ₹2,000 is sold after two successive discounts of 20% and 10%. What is the selling price?",
      ["₹1,440", "₹1,400", "₹1,460", "₹1,600", "₹1,420"],
      "2,000 × 0.80 = 1,600, then 1,600 × 0.90 = ₹1,440. Two discounts of 20% and 10% are not the same as one of 30% (₹1,400)."),
    S(1, 1, "Boats and streams",
      "A boat's speed in still water is 14 km/h and the stream flows at 4 km/h. How long will it take to travel 54 km downstream?",
      ["3 hours", "5.4 hours", "4 hours", "3.5 hours", "2.5 hours"],
      "Downstream speed = 14 + 4 = 18 km/h, so 54 km takes 54 ÷ 18 = 3 hours. (5.4 hours uses the upstream speed, 10 km/h.)"),

    # ---------- Mock Test 2 ----------
    S(2, 1, "Profit and loss",
      "A man sells a cycle for ₹1,035 and makes a profit of 15%. What was the cost price?",
      ["₹900", "₹880", "₹920", "₹950", "₹870"],
      "Selling price = 115% of cost, so cost = 1,035 ÷ 1.15 = ₹900. (Taking 15% off ₹1,035 gives about ₹880, the wrong base.)"),
    S(2, 1, "Simple interest",
      "At what rate of simple interest per annum will ₹8,000 earn ₹2,240 in 4 years?",
      ["7%", "6%", "8%", "5%", "9%"],
      "Rate = SI × 100 ÷ (P × T) = 2,240 × 100 ÷ (8,000 × 4) = 7%."),
    S(2, 2, "Compound interest",
      "What is the difference between the compound interest and the simple interest on ₹5,000 at 8% per annum for 2 years?",
      ["₹32", "₹36", "₹28", "₹40", "₹24"],
      "For 2 years the difference is P × (R/100)² = 5,000 × 0.08 × 0.08 = ₹32."),
    S(2, 1, "Average",
      "What is the average of the first nine multiples of 7?",
      ["35", "32", "42", "28", "38"],
      "The multiples are 7 × 1 to 7 × 9. The average of 1 to 9 is 5, so the average is 7 × 5 = 35."),
    S(2, 3, "Ratio",
      "Two numbers are in the ratio 5 : 8. If 6 is added to each, the ratio becomes 2 : 3. What is the larger number?",
      ["48", "40", "56", "32", "64"],
      "Let the numbers be 5x and 8x. (5x + 6) : (8x + 6) = 2 : 3 gives 15x + 18 = 16x + 12, so x = 6. The numbers are 30 and 48."),
    S(2, 2, "Pipes and cisterns",
      "Pipe A can fill a tank in 20 minutes and pipe B in 30 minutes. Pipe C can empty the full tank in 60 minutes. If all three are opened together, how long will it take to fill the empty tank?",
      ["15 minutes", "12 minutes", "20 minutes", "18 minutes", "10 minutes"],
      "In one minute: 1/20 + 1/30 − 1/60 = (3 + 2 − 1)/60 = 1/15 of the tank. So it fills in 15 minutes. (12 minutes ignores pipe C.)"),
    S(2, 2, "Speed and distance",
      "A bus travels from a town to a city at 45 km/h and returns along the same road at 30 km/h. What is its average speed for the whole journey?",
      ["36 km/h", "37.5 km/h", "35 km/h", "40 km/h", "34 km/h"],
      "For equal distances the average speed is 2 × 45 × 30 ÷ (45 + 30) = 36 km/h, not the simple average of 37.5."),
    S(2, 2, "Ages",
      "The sum of the present ages of a mother and her son is 60 years. Five years ago, the mother was four times as old as the son. What is the son's present age?",
      ["15 years", "12 years", "18 years", "20 years", "10 years"],
      "Let the son be s. The mother is 60 − s, and 60 − s − 5 = 4(s − 5) gives 55 − s = 4s − 20, so s = 15."),
    S(2, 2, "Percentage",
      "A student needs 36% of the maximum marks to pass. She scores 153 marks and fails by 27 marks. What are the maximum marks?",
      ["500", "450", "480", "520", "540"],
      "The pass mark is 153 + 27 = 180, which is 36% of the maximum. 180 ÷ 0.36 = 500."),
    S(2, 2, "Partnership",
      "Sunita invests ₹25,000 for 12 months and Rakesh invests ₹30,000 for 8 months. Out of a total profit of ₹18,000, what is Sunita's share?",
      ["₹10,000", "₹8,000", "₹9,000", "₹12,000", "₹7,500"],
      "Profit is shared in the ratio of capital × time: 25,000 × 12 : 30,000 × 8 = 5 : 4. Sunita gets 5/9 of ₹18,000 = ₹10,000. (₹9,000 splits it equally.)"),
    S(2, 1, "Probability",
      "A box holds 5 green pens and 7 yellow pens. One pen is picked at random. What is the probability that it is yellow?",
      ["7/12", "5/12", "5/7", "1/2", "7/10"],
      "There are 12 pens and 7 are yellow, so the probability is 7/12. (5/7 compares green to yellow, not yellow to all.)"),
    S(2, 2, "Speed and distance",
      "Two trains, 230 metres and 170 metres long, run on parallel tracks in opposite directions at 54 km/h and 90 km/h. How long do they take to cross each other?",
      ["10 seconds", "40 seconds", "12 seconds", "16 seconds", "8 seconds"],
      "In opposite directions the speeds add: 144 km/h = 40 m/s. They must cover 230 + 170 = 400 metres, which takes 10 seconds. (40 seconds subtracts the speeds, which is right only for trains moving the same way.)"),

    # ---------- Drill only ----------
    S(0, 1, "Simple interest",
      "A sum of money becomes 1.5 times itself in 5 years at simple interest. What is the rate of interest per annum?",
      ["10%", "7.5%", "12.5%", "15%", "8%"],
      "The interest is half the principal, 50% in 5 years, so the rate is 50 ÷ 5 = 10%."),
    S(0, 2, "Profit and loss",
      "A shopkeeper marks his goods 30% above cost price and then gives a discount of 10%. What is his profit percentage?",
      ["17%", "20%", "15%", "18%", "13%"],
      "Selling price = 1.3 × 0.9 = 1.17 times cost, a profit of 17%. Subtracting 10 from 30 (giving 20%) is the usual mistake."),
    S(0, 1, "Time and work",
      "16 workers can finish a job in 15 days. In how many days will 20 workers finish the same job?",
      ["12 days", "10 days", "9 days", "14 days", "18.75 days"],
      "The job needs 16 × 15 = 240 worker-days, so 20 workers need 240 ÷ 20 = 12 days. (18.75 days comes from multiplying by 20/16 instead of dividing.)"),
]
