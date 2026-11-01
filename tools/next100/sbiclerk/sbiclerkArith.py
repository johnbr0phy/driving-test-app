# Numerical Ability: arithmetic word problems. Every answer asserted.
from fractions import Fraction as Fr
# Mock Test 1
assert 1250 * 0.88 == 1100
assert round(2250 / (0.06 * 5)) == 7500
assert round(16000 * 1.1 ** 2) == 19360
assert 31 * 15 - 30 * 14 == 45
assert 50 - 13 == 37 and 37 - 5 == 4 * (13 - 5)
assert 15000 * Fr(24, 60) == 6000
assert 1 / (Fr(1, 6) - Fr(1, 18)) == 9
assert Fr(21, 60) / (Fr(1, 4) - Fr(1, 5)) == 7
assert (186 + 34) / 0.4 == 550
assert Fr(3 + 5, 14) == Fr(4, 7)
# Mock Test 2
assert round(1.25 * 0.92, 6) == 1.15
assert 810 / (4500 * 2) == 0.09
assert round(18000 * 1.05 ** 2 - 18000 - 18000 * 0.1, 6) == 45
assert (6 * 28 - 38 + 20) / 6 == 25
assert 50 / 5 * 4 - 30 == 10
assert 1 / (Fr(1, 12) - Fr(1, 20)) == 30
assert 72 / 24 + 72 / 12 == 9
assert round(25000 * 1.08 * 0.95) == 25650
assert 5 * 3000 - 3 * 3000 == 6000 and 4 * 3000 - 2 * 3000 == 6000
assert round((175 + 225) / ((48 + 72) * 5 / 18), 6) == 12
# Drill
assert round(3200 * 0.75 * 0.9) == 2160 and 200 / 20 == 10 and round(1.1 * 1.2, 6) == 1.32
ITEMS = [
    # ---------- Mock Test 1 ----------
    N(1, 1, "Profit and loss", "A trader buys a table fan for ₹1,250 and sells it at a loss of 12%. What is the selling price?",
      "₹1,100", ["₹1,050", "₹1,080", "₹1,120", "₹1,150"],
      "Loss = 12% of 1,250 = ₹150, so the selling price is 1,250 − 150 = ₹1,100."),
    N(1, 2, "Simple interest", "A sum earns ₹2,250 as simple interest in 5 years at 6% per annum. What is the sum?",
      "₹7,500", ["₹6,750", "₹7,000", "₹8,000", "₹8,250"],
      "Interest for 5 years at 6% is 30% of the sum. 2,250 ÷ 0.30 = ₹7,500."),
    N(1, 2, "Compound interest", "What amount will ₹16,000 grow to in 2 years at 10% per annum, compounded annually?",
      "₹19,360", ["₹19,040", "₹19,200", "₹19,520", "₹19,680"],
      "After year 1: 16,000 × 1.1 = 17,600. After year 2: 17,600 × 1.1 = ₹19,360. (₹19,200 would be simple interest.)"),
    N(1, 2, "Average", "The average age of 30 students in a class is 14 years. When the teacher's age is included, the average rises by 1 year. What is the teacher's age?",
      "45 years", ["40 years", "44 years", "46 years", "50 years"],
      "The 31 people now average 15 years, a total of 465. The students alone total 30 × 14 = 420. The teacher is 465 − 420 = 45."),
    N(1, 1, "Partnership", "Anita and Bhavesh start a business with ₹24,000 and ₹36,000 for one year. Out of a profit of ₹15,000, what is Anita's share?",
      "₹6,000", ["₹5,000", "₹6,500", "₹7,500", "₹9,000"],
      "Shares are in the ratio 24,000 : 36,000 = 2 : 3. Anita gets 2/5 of 15,000 = ₹6,000."),
    N(1, 2, "Pipes and cisterns", "Pipe A can fill a tank in 6 hours and pipe B can empty the full tank in 18 hours. If both are opened together on an empty tank, in how many hours will it be full?",
      "9 hours", ["4.5 hours", "6 hours", "7 hours", "8 hours"],
      "Each hour the tank gains 1/6 − 1/18 = 3/18 − 1/18 = 2/18 = 1/9, so it fills in 9 hours. (4.5 hours would come from adding the two rates, as if B also filled the tank.)"),
    N(1, 3, "Speed and distance", "Walking at 4 km/h, Harish reaches his office 12 minutes late. Walking at 5 km/h, he reaches 9 minutes early. How far is his office?",
      "7 km", ["6 km", "8 km", "9 km", "10 km"],
      "The two times differ by 21 minutes, or 21/60 hour. d/4 − d/5 = d/20, so d/20 = 21/60 and d = 7 km."),
    N(1, 2, "Percentage", "A candidate needs 40% of the maximum marks to pass. Sunita scored 186 marks and failed by 34 marks. What are the maximum marks?",
      "550", ["500", "520", "575", "600"],
      "The pass mark is 186 + 34 = 220, which is 40% of the maximum. 220 ÷ 0.4 = 550."),
    N(1, 3, "Ages", "The sum of the present ages of a father and his son is 50 years. Five years ago, the father was four times as old as the son. What is the son's present age?",
      "13 years", ["9 years", "11 years", "15 years", "17 years"],
      "Let the son be S, so the father is 50 − S. Five years ago: 45 − S = 4(S − 5), so 45 − S = 4S − 20, 5S = 65 and S = 13. (The father is 37; five years ago 32 = 4 × 8.)"),
    S(1, 2, "Probability", "A bag has 3 red, 6 blue and 5 green balls. One ball is drawn at random. What is the probability that it is NOT blue?",
      ["4/7", "3/7", "5/14", "3/14", "1/2"],
      "There are 14 balls and 8 of them are not blue, so the probability is 8/14 = 4/7."),

    # ---------- Mock Test 2 ----------
    N(2, 2, "Profit and loss", "A shopkeeper marks an article 25% above its cost price and then gives a discount of 8%. What is his profit percentage?",
      "15%", ["13%", "14%", "16%", "17%"],
      "If the cost is 100, the marked price is 125 and the selling price is 92% of 125 = 115. Profit = 15%."),
    N(2, 1, "Simple interest", "₹4,500 earns ₹810 as simple interest in 2 years. What is the rate of interest per annum?",
      "9%", ["8%", "8.5%", "9.5%", "10%"],
      "Rate = 810 × 100 ÷ (4,500 × 2) = 81,000 ÷ 9,000 = 9%."),
    N(2, 3, "Compound interest", "What is the difference between the compound interest and the simple interest on ₹18,000 for 2 years at 5% per annum, compounded annually?",
      "₹45", ["₹36", "₹40", "₹50", "₹90"],
      "For 2 years the difference is P × (R/100)² = 18,000 × 0.05 × 0.05 = ₹45."),
    N(2, 2, "Average", "The average of six numbers is 28. If one of them, 38, is replaced by 20, what is the new average?",
      "25", ["24", "25.5", "26", "27"],
      "The total falls from 6 × 28 = 168 by 18 to 150, and 150 ÷ 6 = 25."),
    N(2, 3, "Mixtures", "An 80-litre mixture has milk and water in the ratio 5 : 3. How many litres of water must be added to make the ratio 5 : 4?",
      "10 litres", ["5 litres", "8 litres", "12 litres", "15 litres"],
      "Milk = 50 litres and water = 30 litres. For 5 : 4, water must be 50 ÷ 5 × 4 = 40 litres, so add 10."),
    N(2, 2, "Time and work", "Kiran and Lata together can finish a piece of work in 12 days. Kiran alone can finish it in 20 days. In how many days can Lata finish it alone?",
      "30 days", ["24 days", "28 days", "32 days", "36 days"],
      "Lata's daily work = 1/12 − 1/20 = 5/60 − 3/60 = 2/60 = 1/30, so she needs 30 days."),
    N(2, 2, "Boats and streams", "A boat's speed in still water is 18 km/h and the stream flows at 6 km/h. How long will the boat take to go 72 km downstream and come back?",
      "9 hours", ["7 hours", "8 hours", "10 hours", "12 hours"],
      "Downstream speed is 24 km/h (3 hours for 72 km); upstream speed is 12 km/h (6 hours). Total 9 hours."),
    N(2, 2, "Percentage", "A town has 25,000 people. Its population rises by 8% in one year and falls by 5% the next. What is the population after two years?",
      "25,650", ["25,500", "25,750", "25,800", "26,000"],
      "25,000 × 1.08 = 27,000, and 27,000 × 0.95 = 25,650."),
    N(2, 3, "Ratio", "The incomes of Mohit and Naina are in the ratio 5 : 4 and their expenditures in the ratio 3 : 2. If each saves ₹6,000 a month, what is Mohit's income?",
      "₹15,000", ["₹10,000", "₹12,000", "₹18,000", "₹20,000"],
      "Let incomes be 5k and 4k and expenditures 3m and 2m. 5k − 3m = 6,000 and 4k − 2m = 6,000 give m = 2k − 3,000, so 5k − 6k + 9,000 = 6,000 and k = 3,000. Mohit earns 5 × 3,000 = ₹15,000."),
    N(2, 2, "Trains", "Two trains 175 m and 225 m long run on parallel tracks in opposite directions at 48 km/h and 72 km/h. How long do they take to cross each other completely?",
      "12 seconds", ["10 seconds", "15 seconds", "18 seconds", "20 seconds"],
      "Relative speed = 48 + 72 = 120 km/h = 100/3 m/s. They must cover 175 + 225 = 400 m, which takes 400 × 3/100 = 12 seconds."),

    # ---------- Drill only ----------
    N(0, 2, "Discount", "A watch marked ₹3,200 is sold after two successive discounts of 25% and 10%. What is the selling price?",
      "₹2,160", ["₹2,000", "₹2,080", "₹2,240", "₹2,400"],
      "3,200 × 0.75 = 2,400, and 2,400 × 0.9 = ₹2,160. (A single 35% discount would give ₹2,080.)"),
    N(0, 1, "Simple interest", "At what rate of simple interest per annum will a sum become three times itself in 20 years?",
      "10%", ["5%", "8%", "12%", "15%"],
      "Tripling means the interest is twice the sum, 200% in 20 years. 200 ÷ 20 = 10% a year. (5% would only double the sum.)"),
    S(0, 2, "Percentage", "A salary is increased by 10% and the new salary is then increased by 20%. What is the total increase?",
      ["An increase of 32%", "An increase of 30%", "An increase of 22%", "An increase of 28%", "An increase of 35%"],
      "1.1 × 1.2 = 1.32, so the final value is 132% of the original: an increase of 32%, not 10 + 20 = 30%."),
]
