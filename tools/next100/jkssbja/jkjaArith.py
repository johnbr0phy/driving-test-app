# Unit III Numerical and Reasoning Ability, part 1: basic arithmetic
# (number system, percentage, average, profit and loss, ratio and
# proportion, time and work). Every key is checked by the asserts below.
from fractions import Fraction as F
assert (1247 + 4) % 9 == 0 and all((1247 + k) % 9 for k in (2, 3, 5))
assert 1240 * 15 / 100 == 186
assert (28000 - 25000) * 100 / 25000 == 12
assert (52 + 61 + 47 + 58 + 67) / 5 == 57
assert 8 * 35 - 7 * 30 == 70
assert (690 - 600) * 100 / 600 == 15
assert 2250 / 1.25 == 1800
assert 840 * 3 / 7 == 360
assert 540 / 12 * 20 == 900
assert 1 / (F(1, 12) + F(1, 15)) == F(20, 3)
assert 42 % 6 == 42 % 14 == 42 % 21 == 0
assert all(n % 7 == 0 or n % 3 == 0 for n in (91, 87, 93)) and all(97 % k for k in range(2, 10))
assert 4500 * 36 / 100 == 1620
assert 31 * 15 - 30 * 14 == 45
assert 4000 * 88 / 100 == 3520
assert 1500 * 0.9 / 1.125 == 1200
assert 24 / 3 * 5 == 40
assert 9 * 12 / 4 == 27
assert 10 * 18 / 15 == 12
assert 1 / (F(1, 6) - F(1, 9)) == 18
assert 1.2 * 0.8 == 0.96
assert sum(range(1, 11)) / 10 == 5.5
assert F(15, 12) == F(5, 4)
assert F(9) / (1 - F(5, 20)) == 12
ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 1, "Number system", "What is the smallest number that must be added to 1,247 to make it exactly divisible by 9?",
      ["4", "2", "3", "5"],
      "The digit sum of 1,247 is 1 + 2 + 4 + 7 = 14. The next multiple of 9 is 18, so 4 must be added (1,251 = 9 x 139)."),
    S(1, 1, "Percentage", "What is 35 percent of 1,240?",
      ["434", "424", "444", "372"],
      "10 percent of 1,240 is 124, so 30 percent is 372 and 5 percent is 62. 35 percent is 372 + 62 = 434."),
    S(1, 2, "Percentage", "A clerk's salary rises from ₹32,000 to ₹36,000. What is the percentage increase?",
      ["12.5 percent", "11.1 percent", "10 percent", "4 percent"],
      "The rise is ₹4,000 on ₹32,000: 4,000 / 32,000 x 100 = 12.5 percent. Dividing by the new salary (4,000 / 36,000) gives about 11.1 percent, the common slip."),
    S(1, 1, "Average", "The marks of five candidates are 52, 61, 47, 58 and 67. What is their average?",
      ["57", "55", "56", "58"],
      "Total = 52 + 61 + 47 + 58 + 67 = 285. Average = 285 / 5 = 57."),
    S(1, 2, "Average", "The average of 8 numbers is 35. When one number is removed, the average of the rest is 30. What number was removed?",
      ["70", "35", "65", "5"],
      "Total of 8 = 8 x 35 = 280. Total of 7 = 7 x 30 = 210. Removed number = 280 - 210 = 70."),
    S(1, 1, "Profit and loss", "A trader buys a carpet for ₹750 and sells it for ₹840. What is his profit percent?",
      ["12 percent", "11 percent", "14 percent", "90 percent"],
      "Profit = ₹90 on a cost of ₹750: 90 / 750 x 100 = 12 percent. Dividing by the selling price (90 / 840) gives about 10.7 percent; profit percent is always on the cost price."),
    S(1, 2, "Profit and loss", "By selling a shawl for ₹2,500, a shopkeeper gains 25 percent. What did the shawl cost him?",
      ["₹2,000", "₹1,875", "₹2,100", "₹2,250"],
      "Selling price = 125 percent of cost, so cost = 2,500 / 1.25 = ₹2,000. Taking 25 percent off ₹2,500 (giving ₹1,875) uses the wrong base."),
    S(1, 1, "Ratio and proportion", "₹840 is divided between Ali and Bina in the ratio 3 : 4. What is Ali's share?",
      ["₹360", "₹480", "₹280", "₹420"],
      "There are 3 + 4 = 7 parts of 840 / 7 = ₹120 each. Ali gets 3 x 120 = ₹360 and Bina ₹480."),
    S(1, 2, "Ratio and proportion", "If 12 registers cost ₹540, how much will 20 registers cost at the same rate?",
      ["₹900", "₹880", "₹960", "₹1,080"],
      "One register costs 540 / 12 = ₹45, so 20 cost 20 x 45 = ₹900."),
    S(1, 2, "Time and work", "A can finish a piece of work in 12 days and B in 15 days. How long will they take working together?",
      ["6 days 16 hours", "7 days", "13 and a half days", "6 days"],
      "Together they do 1/12 + 1/15 = 5/60 + 4/60 = 9/60 = 3/20 of the work a day, so they need 20/3 = 6 2/3 days, that is 6 days and 16 hours of a 24-hour day."),

    # ---------- Practice Test 2 ----------
    S(2, 1, "Number system", "What is the LCM of 6, 14 and 21?",
      ["42", "84", "126", "21"],
      "6 = 2 x 3, 14 = 2 x 7, 21 = 3 x 7. Taking each prime once at its highest power: 2 x 3 x 7 = 42."),
    S(2, 2, "Number system", "Which of these numbers is a prime number?",
      ["97", "91", "87", "93"],
      "91 = 7 x 13, 87 = 3 x 29 and 93 = 3 x 31, but 97 has no factor other than 1 and itself."),
    S(2, 1, "Percentage", "In a village of 4,500 people, 36 percent are children. How many children are there?",
      ["1,620", "1,260", "1,580", "1,700"],
      "36 percent of 4,500 = 0.36 x 4,500 = 1,620."),
    S(2, 2, "Average", "The average age of 30 students is 14 years. When the teacher's age is added, the average becomes 15 years. How old is the teacher?",
      ["45 years", "31 years", "44 years", "29 years"],
      "Total of 31 people = 31 x 15 = 465. Total of 30 students = 30 x 14 = 420. Teacher = 465 - 420 = 45 years."),
    S(2, 1, "Profit and loss", "An almirah bought for ₹4,000 is sold at a loss of 12 percent. What is its selling price?",
      ["₹3,520", "₹3,480", "₹3,880", "₹3,600"],
      "Loss = 12 percent of 4,000 = ₹480, so the selling price is 4,000 - 480 = ₹3,520."),
    S(2, 2, "Profit and loss", "A shopkeeper marks a radio at ₹1,500 and allows a 10 percent discount, still making a profit of 12.5 percent. What did the radio cost him?",
      ["₹1,200", "₹1,350", "₹1,250", "₹1,180"],
      "Selling price = 90 percent of 1,500 = ₹1,350. This is 112.5 percent of cost, so cost = 1,350 / 1.125 = ₹1,200."),
    S(2, 1, "Ratio and proportion", "The ratio of boys to girls in a class is 5 : 3. If there are 24 girls, how many boys are there?",
      ["40", "32", "45", "35"],
      "3 parts = 24, so one part = 8 and the boys are 5 x 8 = 40."),
    S(2, 2, "Ratio and proportion", "Find the fourth proportional to 4, 9 and 12.",
      ["27", "24", "36", "21"],
      "If 4 : 9 = 12 : x, then 4x = 9 x 12 = 108, so x = 27."),
    S(2, 2, "Time and work", "12 workers can repair a road in 20 days. How many days will 16 workers take to do the same job?",
      ["15 days", "18 days", "24 days", "12 days"],
      "The work is 12 x 20 = 240 worker-days. With 16 workers it takes 240 / 16 = 15 days. More workers means fewer days, so a longer answer is the wrong-way proportion."),
    S(2, 2, "Time and work", "A pipe fills a tank in 6 hours and another empties it in 9 hours. If both are opened together, how long does the tank take to fill?",
      ["18 hours", "15 hours", "3 hours", "12 hours"],
      "Each hour the tank gains 1/6 - 1/9 = 3/18 - 2/18 = 1/18 of its volume, so it fills in 18 hours."),

    # ---------- Drill only ----------
    S(0, 1, "Number system", "What is the HCF of 48 and 72?",
      ["24", "12", "8", "144"],
      "48 = 24 x 2 and 72 = 24 x 3, and 2 and 3 share no factor, so the HCF is 24. 144 is the LCM."),
    S(0, 2, "Percentage", "A price is first increased by 10 percent and then decreased by 10 percent. What is the net change?",
      ["1 percent decrease", "No change", "1 percent increase", "2 percent decrease"],
      "100 becomes 110, then 110 less 10 percent (11) is 99: a 1 percent decrease. The second 10 percent is taken on a bigger number."),
    S(0, 1, "Average", "What is the average of the first 20 even numbers (2, 4, 6, ... 40)?",
      ["21", "20", "22", "40"],
      "Their sum is 2 x (1 + 2 + ... + 20) = 2 x 210 = 420, and 420 / 20 = 21. For evenly spaced numbers the average is also (first + last) / 2 = (2 + 40) / 2 = 21."),
    S(0, 2, "Profit and loss", "If the cost price of 12 pens equals the selling price of 10 pens, what is the profit percent?",
      ["20 percent", "17 percent", "25 percent", "2 percent"],
      "Let each pen cost ₹1. 10 pens sell for ₹12, so one sells for ₹1.20: a profit of 20 percent. About 17 percent comes from dividing by the selling price."),
    S(0, 2, "Time and work", "A can do a job in 20 days. After he works for 5 days, B finishes the rest in 9 days. In how many days can B alone do the whole job?",
      ["12 days", "15 days", "9 days", "16 days"],
      "In 5 days A does 5/20 = 1/4 of the job, leaving 3/4 for B. B does 3/4 in 9 days, so the whole job takes him 9 x 4/3 = 12 days."),
]
