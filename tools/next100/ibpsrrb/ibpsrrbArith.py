# Numerical Ability: arithmetic word problems. Every answer is asserted.
from fractions import Fraction as Fr
# Mock Test 1
assert 12500 * 0.92 == 11500
assert 8400 * 0.065 * 2 == 1092
assert round(15000 * 1.1 ** 2 - 15000, 6) == 3150
assert (5 * 46 - 30) / 4 == 50
assert 4500 * 7 / 15 == 2100
assert Fr(1, 1) / (Fr(1, 14) + Fr(1, 35)) == 10
assert 420 / 24 * 18 / 5 == 63
assert (7 * 5 + 5) * 3 == (2 * 5 + 5) * 8
assert round(5000 * 1.1 * 1.2, 6) == 6600
assert 50 * 3 / 5 - 10 == 20
assert 72 / (20 + 4) == 3 and 72 / (20 - 4) == 4.5
assert 14000 * Fr(20000 * 12, 20000 * 12 + 30000 * 6) == 8000
assert 2400 * 0.85 == 2040
assert Fr(6, 10) == Fr(3, 5)
# Mock Test 2
assert (1050 - 840) / 840 == 0.25
assert round(9440 / 1.18, 6) == 8000
assert round(20000 * 0.05 ** 2, 6) == 50
assert 46 * 9 - 45 * 8 == 54
assert 4 * 3000 - 3 * 3000 == 3000 and 3 * 3000 - 2 * 3000 == 3000
assert 9 * 16 / 12 == 12
assert 240 / 3 - 240 / 4 == 20
assert 40 + 10 == 50 and 40 - 5 == 7 * (10 - 5)
assert 260 / 0.65 == 400
assert Fr(1, 1) / (Fr(1, 10) - Fr(1, 15)) == 30
assert (320 + 255) / (90 * 5 / 18) == 23
assert Fr(60 - 48, 48 - 42) == 2
assert 36 + 38 + 40 == 114
assert Fr(3, 8) == Fr(len([1 for a in "HT" for b in "HT" for c in "HT" if (a + b + c).count("H") == 2]), 8)
# Drill only
assert round(1710 / 0.95, 6) == 1800
assert 1200 / (5000 * 4) == 0.06
assert Fr(1, 1) / (Fr(1, 8) - Fr(1, 12)) == 24
assert Fr(15, 2) / 5 - Fr(15, 2) / 6 == Fr(1, 4)
assert round(25 / 125 * 100, 6) == 20
assert (21 + 23 + 25 + 27) / 4 == 24
ITEMS = [
    # ---------- Mock Test 1 ----------
    N(1, 1, "Profit and loss",
      "A farmer buys a pump set for ₹12,500 and later sells it at a loss of 8%. At what price does he sell it?",
      "₹11,500", ["₹11,800", "₹12,000", "₹12,420", "₹13,500"],
      "Loss = 8% of 12,500 = ₹1,000, so the selling price is 12,500 − 1,000 = ₹11,500."),
    N(1, 1, "Simple interest",
      "What is the simple interest on ₹8,400 at 6.5% per annum for 2 years?",
      "₹1,092", ["₹546", "₹1,008", "₹1,120", "₹1,176"],
      "SI = 8,400 × 6.5 × 2 ÷ 100 = ₹1,092."),
    N(1, 2, "Compound interest",
      "What is the compound interest on ₹15,000 at 10% per annum for 2 years, compounded annually?",
      "₹3,150", ["₹2,850", "₹3,000", "₹3,075", "₹3,300"],
      "Amount = 15,000 × 1.1 × 1.1 = ₹18,150, so the interest is ₹3,150. (₹3,000 is the simple interest.)"),
    N(1, 2, "Average",
      "The average of five numbers is 46. If one number, 30, is removed, what is the average of the remaining four?",
      "50", ["40", "44", "46", "48"],
      "The five numbers total 5 × 46 = 230. Without 30 the total is 200, and 200 ÷ 4 = 50."),
    N(1, 1, "Ratio and proportion",
      "₹4,500 is divided among Kavya, Lalita and Meghna in the ratio 3 : 5 : 7. What is Meghna's share?",
      "₹2,100", ["₹1,500", "₹1,800", "₹2,250", "₹2,400"],
      "The ratio has 3 + 5 + 7 = 15 parts. Meghna gets 7/15 of 4,500 = ₹2,100."),
    N(1, 2, "Time and work",
      "Gopi can finish a job in 14 days and Hari in 35 days. In how many days can they finish it working together?",
      "10 days", ["11.5 days", "21 days", "24.5 days", "49 days"],
      "Together they do 1/14 + 1/35 = 5/70 + 2/70 = 7/70 = 1/10 of the job a day, so they need 10 days. (24.5 days averages the two times, and 49 days adds them.)"),
    N(1, 2, "Speed, time and distance",
      "A 420 m long train passes a signal post in 24 seconds. What is its speed in km/h?",
      "63 km/h", ["17.5 km/h", "54 km/h", "70 km/h", "75.6 km/h"],
      "Speed = 420 ÷ 24 = 17.5 m/s, and 17.5 × 18/5 = 63 km/h. (17.5 is the speed in metres per second.)"),
    N(1, 3, "Ages",
      "The ages of Mohan and his son are in the ratio 7 : 2. After 5 years the ratio will be 8 : 3. What is the son's present age?",
      "10 years", ["8 years", "12 years", "14 years", "15 years"],
      "Let the ages be 7x and 2x. Then 3(7x + 5) = 8(2x + 5), so 21x + 15 = 16x + 40 and x = 5. The son is 2 × 5 = 10 years old."),
    N(1, 2, "Percentage",
      "The population of a village is 5,000. It rises by 10% in one year and by 20% in the next. What is the population after two years?",
      "6,600", ["6,500", "7,000", "7,200", "7,260"],
      "5,000 × 1.1 = 5,500, and 5,500 × 1.2 = 6,600. (6,500 adds the two rates as 30% of 5,000.)"),
    N(1, 2, "Mixtures",
      "A 60-litre mixture of milk and water has milk and water in the ratio 5 : 1. How many litres of water must be added to make the ratio 5 : 3?",
      "20 litres", ["5 litres", "10 litres", "12 litres", "30 litres"],
      "The mixture has 50 litres of milk and 10 of water. For 5 : 3 there must be 30 litres of water, so 20 litres are added. (30 litres is the water needed in all, not the amount to add.)"),
    N(1, 1, "Boats and streams",
      "A boat goes 20 km/h in still water and the stream flows at 4 km/h. How long will the boat take to go 72 km downstream?",
      "3 hours", ["2.5 hours", "3.6 hours", "4.5 hours", "6 hours"],
      "Downstream speed = 20 + 4 = 24 km/h, and 72 ÷ 24 = 3 hours. (3.6 hours ignores the stream; 4.5 hours is the upstream time.)"),
    N(1, 2, "Partnership",
      "Xavier invests ₹20,000 for 12 months and Yusuf invests ₹30,000 for 6 months. Out of a profit of ₹14,000, what is Xavier's share?",
      "₹8,000", ["₹5,600", "₹6,000", "₹7,000", "₹8,400"],
      "Shares go by capital × time: 20,000 × 12 = 2,40,000 and 30,000 × 6 = 1,80,000, a ratio of 4 : 3. Xavier gets 4/7 of 14,000 = ₹8,000."),
    N(1, 1, "Discount",
      "A sewing machine is marked at ₹2,400 and sold at a discount of 15%. What is its selling price?",
      "₹2,040", ["₹2,000", "₹2,060", "₹2,100", "₹2,160"],
      "Discount = 15% of 2,400 = ₹360, so the selling price is 2,400 − 360 = ₹2,040."),
    S(1, 1, "Probability",
      "A bag has 4 red and 6 green balls. One ball is drawn at random. What is the probability that it is green?",
      ["3/5", "2/5", "1/2", "2/3", "3/4"],
      "There are 6 green balls out of 10, so the probability is 6/10 = 3/5."),

    # ---------- Mock Test 2 ----------
    N(2, 1, "Profit and loss",
      "A trader buys a sack of rice for ₹840 and sells it for ₹1,050. What is his profit percentage?",
      "25%", ["20%", "21%", "24%", "30%"],
      "Profit = ₹210, and 210 ÷ 840 × 100 = 25%. (20% divides the profit by the selling price, the wrong base.)"),
    N(2, 2, "Simple interest",
      "A sum amounts to ₹9,440 in 3 years at 6% per annum simple interest. What is the sum?",
      "₹8,000", ["₹7,500", "₹7,740", "₹7,900", "₹8,200"],
      "Three years at 6% adds 18%, so the sum is 9,440 ÷ 1.18 = ₹8,000."),
    N(2, 3, "Compound interest",
      "What is the difference between compound interest and simple interest on ₹20,000 at 5% per annum for 2 years?",
      "₹50", ["₹100", "₹200", "₹250", "₹2,050"],
      "For 2 years the difference is P × (r/100)² = 20,000 × 0.05 × 0.05 = ₹50."),
    N(2, 2, "Average",
      "The average weight of 8 students is 45 kg. When a new student joins, the average becomes 46 kg. What does the new student weigh?",
      "54 kg", ["46 kg", "50 kg", "53 kg", "55 kg"],
      "The 9 students weigh 9 × 46 = 414 kg and the first 8 weighed 8 × 45 = 360 kg, so the new student weighs 54 kg."),
    N(2, 3, "Ratio and proportion",
      "The incomes of Anju and Babita are in the ratio 4 : 3 and their spending in the ratio 3 : 2. Each saves ₹3,000 a month. What is Anju's monthly income?",
      "₹12,000", ["₹9,000", "₹10,000", "₹13,500", "₹15,000"],
      "Let incomes be 4x and 3x and spending 3y and 2y. Then 4x − 3y = 3,000 and 3x − 2y = 3,000, which give x = 3,000 and y = 3,000. Anju earns ₹12,000 and spends ₹9,000."),
    N(2, 1, "Time and work",
      "9 men can finish a job in 16 days. In how many days can 12 men finish it, working at the same rate?",
      "12 days", ["10 days", "14 days", "16 days", "18 days"],
      "The job takes 9 × 16 = 144 man-days, and 144 ÷ 12 = 12 days."),
    N(2, 1, "Speed, time and distance",
      "A car covers 240 km in 4 hours. By how much must its speed increase to cover the same distance in 3 hours?",
      "20 km/h", ["5 km/h", "10 km/h", "15 km/h", "80 km/h"],
      "Its speed is 240 ÷ 4 = 60 km/h and must become 240 ÷ 3 = 80 km/h, an increase of 20 km/h."),
    N(2, 2, "Ages",
      "The sum of the ages of a mother and her daughter is 50 years. Five years ago the mother was seven times as old as the daughter. How old is the daughter now?",
      "10 years", ["8 years", "12 years", "14 years", "15 years"],
      "Let the daughter be d. Then 50 − d − 5 = 7(d − 5), so 45 − d = 7d − 35 and d = 10. The mother is 40."),
    N(2, 1, "Percentage",
      "In an examination 35% of the students failed and 260 passed. How many students took the examination?",
      "400", ["420", "450", "480", "520"],
      "65% passed, so 260 is 65% of the total, which is 260 ÷ 0.65 = 400."),
    N(2, 2, "Pipes and cisterns",
      "Pipe A fills a tank in 12 hours and pipe B empties it in 18 hours. If both are opened together on an empty tank, how long will it take to fill?",
      "36 hours", ["7.2 hours", "15 hours", "30 hours", "40 hours"],
      "Each hour 1/12 − 1/18 = 1/36 of the tank fills, so it takes 36 hours. (7.2 hours is the answer if both pipes filled.)"),
    N(2, 2, "Speed, time and distance",
      "A 320 m long train running at 90 km/h crosses a platform 255 m long. How long does it take?",
      "23 seconds", ["10.2 seconds", "12.8 seconds", "18 seconds", "20 seconds"],
      "The train covers 320 + 255 = 575 m at 90 × 5/18 = 25 m/s, which takes 23 seconds. (12.8 seconds counts only the train's own length, 10.2 seconds only the platform.)"),
    S(2, 2, "Mixtures",
      "In what ratio must rice costing ₹42 a kg be mixed with rice costing ₹60 a kg to get a mixture worth ₹48 a kg?",
      ["2 : 1", "1 : 2", "3 : 2", "7 : 10", "3 : 1"],
      "By alligation, cheaper : dearer = (60 − 48) : (48 − 42) = 12 : 6 = 2 : 1."),
    N(2, 1, "Number system",
      "The sum of three consecutive even numbers is 114. What is the largest of them?",
      "40", ["38", "42", "44", "46"],
      "The middle number is 114 ÷ 3 = 38, so the numbers are 36, 38 and 40."),
    S(2, 2, "Probability",
      "Three fair coins are tossed together. What is the probability of getting exactly two heads?",
      ["3/8", "1/2", "1/4", "5/8", "2/3"],
      "Of the eight equally likely outcomes, three (HHT, HTH, THH) have exactly two heads, so the probability is 3/8."),

    # ---------- Drill only ----------
    N(0, 2, "Profit and loss",
      "By selling a bicycle for ₹1,710, a shopkeeper loses 5%. What did the bicycle cost him?",
      "₹1,800", ["₹1,620", "₹1,750", "₹1,795", "₹1,900"],
      "The selling price is 95% of the cost, so the cost is 1,710 ÷ 0.95 = ₹1,800. (₹1,795 adds 5% of the selling price, the wrong base.)"),
    N(0, 1, "Simple interest",
      "₹5,000 earns ₹1,200 as simple interest in 4 years. What is the rate of interest per annum?",
      "6%", ["5%", "6.5%", "12%", "24%"],
      "Rate = 1,200 × 100 ÷ (5,000 × 4) = 6% per annum. (24% is the total over four years.)"),
    N(0, 2, "Time and work",
      "Leela and Mala together finish a job in 18 days. Leela alone can finish it in 30 days. How long would Mala take alone?",
      "45 days", ["12 days", "24 days", "40 days", "48 days"],
      "Mala does 1/18 − 1/30 = 1/45 of the job a day, so she needs 45 days. (12 days is just 30 − 18.)"),
    N(0, 3, "Speed, time and distance",
      "Walking at 5 km/h, Ravi reaches his office 10 minutes late. Walking at 6 km/h, he reaches 5 minutes early. How far is his office?",
      "7.5 km", ["9 km", "10 km", "12 km", "15 km"],
      "The two times differ by 15 minutes, 1/4 hour. d/5 − d/6 = d/30 = 1/4, so d = 7.5 km."),
    N(0, 2, "Percentage",
      "The price of milk rises by 50%. By what percentage must a family cut its use of milk to keep its spending the same?",
      "33.33%", ["25%", "40%", "50%", "66.67%"],
      "The cut is 50 ÷ (100 + 50) × 100 = 33.33%. Cutting by 50% would reduce the spending."),
    N(0, 1, "Average",
      "The average of four consecutive odd numbers is 24. What is the largest of them?",
      "27", ["29", "31", "33", "35"],
      "The numbers are centred on 24, so they are 21, 23, 25 and 27."),
]
