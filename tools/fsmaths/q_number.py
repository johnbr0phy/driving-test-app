"""Using numbers and the number system: whole numbers, negatives, estimation,
formulae in words and symbols, decimals and the order of operations
(DfE Functional Skills Maths subject content, Level 2 items 1, 2, 3, 9, 10, 12)."""
import math
from common import mc, num, order, gbp, fmt, money_answers, unit_answers

D = "fsmNumber"
ITEMS = []
add = ITEMS.append

# ---------------- Test 1, Section A (non-calculator) ----------------
t = -4 + 11
add(mc(D, 1, "a", "Negative numbers", 1,
       "At 6am the temperature in Aberdeen was −4°C. By 2pm it had risen by 11 degrees. What was the temperature at 2pm?",
       f"{t}°C", ["−15°C", "15°C", "−7°C"],
       "Start at −4 and count up 11: 4 degrees takes you to 0, and 7 more takes you to 7°C. −15°C comes from going down instead of up.",
       basics="fsmNegatives"))
v = 3 + 4 * 2 ** 2
add(mc(D, 1, "a", "Order of operations", 2,
       "Work out 3 + 4 × 2²",
       fmt(v), [fmt((3 + 4) * 2 ** 2), fmt(3 + (4 * 2) ** 2), fmt((3 + 4 * 2) ** 2)],
       "Indices first: 2² = 4. Then multiply: 4 × 4 = 16. Then add: 3 + 16 = 19. Adding first gives 7 × 4 = 28, which breaks BIDMAS.",
       basics="fsmOrderOps"))
c = 45 + 30 * 3.5
add(num(D, 1, "a", "Formulae", 2,
        "A plumber works out a bill with the formula\n\ncost (£) = 45 + 30 × hours\n\nHow much is the bill for a job that takes 3.5 hours? Give your answer in pounds.",
        money_answers(c),
        "30 × 3.5 = 105 (30 × 3 = 90 plus half of 30 = 15). Then 45 + 105 = £150. Multiply before you add.",
        basics="fsmFormula"))
add(mc(D, 1, "a", "Estimation", 2,
       "Estimate 412 × 19.8 by rounding each number to 1 significant figure.",
       "8,000", ["8,240", "80,000", "800"],
       "412 rounds to 400 and 19.8 rounds to 20. 400 × 20 = 8,000. 8,240 rounds only one number, so it is not the estimate asked for.",
       basics="fsmEstimate"))

# ---------------- Test 2, Section A (non-calculator) ----------------
add(order(D, 2, "a", "Ordering decimals", 2,
          "Put these lengths in order, from smallest to largest (in metres).",
          ["0.053", "0.3", "0.305", "0.35"],
          "Write them all to 3 decimal places: 0.053, 0.300, 0.305, 0.350. Now compare as whole thousandths: 53, 300, 305, 350."))
b = -45 + 120 - 90
add(mc(D, 2, "a", "Negative numbers", 2,
       "Sam's bank account is overdrawn: the balance is −£45. He pays in £120 and then spends £90. What is his balance now?",
       "−£15", ["£15", "£165", "−£75"],
       "−45 + 120 = 75, then 75 − 90 = −15. He is £15 overdrawn. £165 comes from adding the £90 instead of taking it away.",
       basics="fsmNegatives"))
assert b == -15
v = (18 - 3 ** 2) * 4 / 2
add(mc(D, 2, "a", "Order of operations", 2,
       "Work out (18 − 3²) × 4 ÷ 2",
       fmt(v), [fmt((18 - 3) ** 2 * 4 / 2), fmt(18 - 9 * 4 / 2), fmt(9 * 4 * 2)],
       "Brackets first, and inside them the index: 3² = 9, so 18 − 9 = 9. Then 9 × 4 = 36 and 36 ÷ 2 = 18.",
       basics="fsmOrderOps"))
add(num(D, 2, "a", "Calculating with large numbers", 1,
        "A music festival sold 48,500 tickets for Friday and 61,250 tickets for Saturday. How many more tickets were sold for Saturday than for Friday?",
        unit_answers(61250 - 48500, ["tickets"]),
        "61,250 − 48,500 = 12,750. Check: 48,500 + 12,750 = 61,250.", whole=True))

# ---------------- Test 1, Section B (calculator) ----------------
c = 28 * 3 + 0.15 * 240
add(num(D, 1, "b", "Formulae", 2,
        "A van hire company uses the formula C = 28d + 0.15m, where C is the cost in pounds, d is the number of days and m is the number of miles driven. Work out the cost of hiring the van for 3 days and driving 240 miles.",
        money_answers(c),
        "28 × 3 = 84 and 0.15 × 240 = 36. C = 84 + 36 = £120.",
        basics="fsmFormula"))
per = 1247400 / 6300
add(num(D, 1, "b", "Calculating with large numbers", 2,
        "A charity appeal raised £1,247,400 from 6,300 donors. What was the mean amount given per donor, in pounds?",
        money_answers(per),
        "Divide the total by the number of donors: 1,247,400 ÷ 6,300 = 198. A quick check: about 1,200,000 ÷ 6,000 = 200, so 198 is sensible."))
pieces = math.floor(13 / 0.375)
add(num(D, 1, "b", "Decimals", 2,
        "A machine cuts pieces of wire 0.375 m long from a 13 m reel. How many complete pieces can it cut?",
        unit_answers(pieces, ["pieces"]),
        "13 ÷ 0.375 = 34.67 to 2 decimal places. Only whole pieces count, so round down to 34; the 35th piece would be too short.",
        whole=True))
d40 = 40 + 40 ** 2 / 20
add(mc(D, 1, "b", "Formulae", 2,
       "The formula d = v + v² ÷ 20 gives a car's typical stopping distance d, in feet, at a speed of v miles per hour. What is the stopping distance at 40 mph?",
       f"{fmt(d40)} feet", ["80 feet", f"{fmt((40 + 40) ** 2 / 20)} feet", f"{fmt(40 + 40 / 20)} feet"],
       "Square first: 40² = 1,600. Then 1,600 ÷ 20 = 80. Then 40 + 80 = 120 feet. 80 feet forgets to add the v at the start.",
       basics="fsmFormula"))
tot = -2340 + 1875 - 560 + 3105
add(num(D, 1, "b", "Negative numbers", 2,
        "A small business records its profit each month. A loss is shown as a negative number.\n\n| Month | Profit |\n|---|---|\n| January | −£2,340 |\n| February | £1,875 |\n| March | −£560 |\n| April | £3,105 |\n\nWhat was the total profit over the four months, in pounds?",
        money_answers(tot),
        "−2,340 + 1,875 − 560 + 3,105 = 2,080. The two losses total −2,900 and the two profits total 4,980, so the business is £2,080 up.",
        basics="fsmNegatives"))

# ---------------- Test 2, Section B (calculator) ----------------
kcal = 1046 / 4.184
add(num(D, 2, "b", "Formulae", 2,
        "Food labels give energy in kilojoules (kJ) and kilocalories (kcal), where kcal = kJ ÷ 4.184. A snack bar contains 1,046 kJ. How many kcal is that, to the nearest whole number?",
        unit_answers(round(kcal), ["kcal"]),
        "1,046 ÷ 4.184 = 250. Multiplying by 4.184 instead would give 4,376, far too many for one snack bar.",
        tolerance=0, basics="fsmFormula"))
add(mc(D, 2, "b", "Rounding", 1,
       "A football stadium holds 52,682 people. What is this to the nearest thousand?",
       "53,000", ["52,000", "52,700", "50,000"],
       "The thousands digit is 2 and the digit after it is 6, so round up: 53,000. 52,700 is to the nearest hundred.",
       basics="fsmEstimate"))
newpop = 184250 + 3450 * 2.4
add(num(D, 2, "b", "Calculating with large numbers", 2,
        "A town has a population of 184,250. A new estate will add 3,450 homes, with an average of 2.4 people in each home. What will the new population be?",
        unit_answers(newpop, ["people"]),
        "3,450 × 2.4 = 8,280 new residents. 184,250 + 8,280 = 192,530.", whole=True))
assert newpop == 192530
fuel = 1.459 * 42.5
add(num(D, 2, "b", "Decimals", 2,
        "Diesel costs £1.459 per litre. How much do 42.5 litres cost? Give your answer in pounds to the nearest penny.",
        money_answers(round(fuel, 2)),
        "1.459 × 42.5 = 62.0075. To the nearest penny (2 decimal places) that is £62.01.", tolerance=0.001))
v = (4.2 + 1.8) ** 2 / (3 ** 2 - 5)
add(mc(D, 2, "b", "Order of operations", 3,
       "Work out (4.2 + 1.8)² ÷ (3² − 5)",
       fmt(v), [fmt(4.2 + 1.8 ** 2 / (9 - 5)), "36", fmt((6) ** 2 / 9 - 5)],
       "Brackets first: 4.2 + 1.8 = 6 and 3² − 5 = 9 − 5 = 4. Then 6² = 36 and 36 ÷ 4 = 9. On a calculator, type the brackets in or it will divide too early.",
       basics="fsmOrderOps"))

# ---------------- Drill only (calculator) ----------------
add(num(D, 0, "b", "Negative numbers", 1,
        "The lowest temperature one night was −7°C. The highest temperature the next day was 12°C. What is the difference between the two temperatures, in degrees?",
        unit_answers(19, ["°C", "degrees"]),
        "From −7 up to 0 is 7 degrees, and from 0 up to 12 is 12 more: 7 + 12 = 19 degrees.", basics="fsmNegatives"))
add(mc(D, 0, "b", "Negative numbers", 2,
       "A diver is 14 m below the surface (−14 m). She rises 5 m and then goes down 9 m. Where is she now?",
       "−18 m", ["−10 m", "0 m", "−28 m"],
       "−14 + 5 = −9, then −9 − 9 = −18 m. −10 m comes from rising 9 m and going down 5 m, the wrong way round.", basics="fsmNegatives"))
add(mc(D, 0, "b", "Negative numbers", 1,
       "Which list is in order from lowest to highest?",
       "−8, −3, 0, 2", ["−3, −8, 0, 2", "0, −3, −8, 2", "2, 0, −3, −8"],
       "The further below zero, the lower the number, so −8 is lower than −3. −3, −8, 0, 2 puts −3 first, but −3 is the higher of the two.", basics="fsmNegatives"))
add(mc(D, 0, "b", "Place value", 2,
       "Which of these numbers is the largest?",
       "2,300,500", ["2.3 million", "2,030,000", "2.03 million"],
       "2.3 million is 2,300,000, which is 500 less than 2,300,500. 2,030,000 and 2.03 million are both about 270,000 smaller."))
add(mc(D, 0, "b", "Place value", 1,
       "Write four million, sixty thousand and five in figures.",
       "4,060,005", ["4,600,005", "4,060,050", "4,006,005"],
       "Four million is 4,000,000. Sixty thousand is 60,000. Five is 5. Together: 4,060,005. 4,600,005 has six hundred thousand, not sixty thousand."))
homes = math.floor(1250000 / 225)
add(num(D, 0, "b", "Calculating with large numbers", 2,
        "A wind farm produces 1,250,000 kWh of electricity a month. An average home uses 225 kWh a month. How many homes can it fully supply?",
        unit_answers(homes, ["homes"]),
        "1,250,000 ÷ 225 = 5,555.6. Only complete homes count, so round down to 5,555.", whole=True))
add(mc(D, 0, "b", "Estimation", 2,
       "Priya uses a calculator to work out 28.7 × 41.2 and gets 11,824.44. Which estimate shows that she has made a mistake?",
       "30 × 40 = 1,200, so it should be about 1,200",
       ["30 × 40 = 12,000, so her answer is about right", "29 × 41 = 1,189, so her answer is about right", "28 × 41 = 11,480, so her answer is about right"],
       "30 × 40 = 1,200, so the true answer (1,182.44) is about ten times smaller than hers; she probably slipped a decimal point. 29 × 41 = 1,189 is close to the truth, not to her 11,824, so it does not back her answer up.",
       basics="fsmEstimate"))
f = 3.2 + 1.85 * 7.4
add(num(D, 0, "b", "Formulae", 2,
        "A taxi fare in pounds is worked out with F = 3.20 + 1.85m, where m is the number of miles. What is the fare for 7.4 miles?",
        money_answers(round(f, 2)),
        "1.85 × 7.4 = 13.69. Then 3.20 + 13.69 = £16.89.", basics="fsmFormula"))
m = (21.70 - 3.20) / 1.85
add(num(D, 0, "b", "Formulae", 3,
        "The same taxi uses F = 3.20 + 1.85m, where F is the fare in pounds and m the number of miles. Jo's fare was £21.70. How many miles did she travel?",
        unit_answers(round(m), ["miles"]),
        "Work backwards: take off the fixed £3.20 to get 18.50, then divide by the price per mile: 18.50 ÷ 1.85 = 10 miles.", basics="fsmFormula"))
mins = 2250 / 500 * 20 + 20
add(mc(D, 0, "b", "Formulae", 2,
       "A recipe says: roast lamb for 20 minutes per 500 g, plus an extra 20 minutes. How long should a 2.25 kg joint be roasted?",
       "1 hour 50 minutes", ["1 hour 30 minutes", "1 hour 10 minutes", "2 hours 10 minutes"],
       "2.25 kg = 2,250 g, which is 4.5 lots of 500 g. 4.5 × 20 = 90 minutes, plus 20 = 110 minutes, or 1 hour 50 minutes.", basics="fsmFormula"))
assert mins == 110
v = 5 + 3 * (8 - 2) ** 2 / 4
add(mc(D, 0, "b", "Order of operations", 2,
       "Work out 5 + 3 × (8 − 2)² ÷ 4",
       fmt(v), [fmt((5 + 3) * 36 / 4), fmt(5 + 3 * 6 / 4), fmt(5 + 3 * (64 - 4) / 4)],
       "Brackets: 8 − 2 = 6. Index: 6² = 36. Then 3 × 36 = 108 and 108 ÷ 4 = 27. Add last: 5 + 27 = 32.", basics="fsmOrderOps"))
add(mc(D, 0, "b", "Indices", 1,
       "What is 2⁵?",
       "32", ["10", "25", "7"],
       "2⁵ means five 2s multiplied: 2 × 2 × 2 × 2 × 2 = 32. 10 is 2 × 5, which is not the same thing.", basics="fsmOrderOps"))
n6 = 300 * 2 ** 6
add(num(D, 0, "b", "Formulae", 3,
        "The number of bacteria in a sample doubles every hour. The formula N = 300 × 2ʰ gives the number after h hours. How many bacteria are there after 6 hours?",
        unit_answers(n6, ["bacteria"]),
        "2⁶ = 64, and 300 × 64 = 19,200. Doubling 300 six times (600, 1,200, 2,400, 4,800, 9,600, 19,200) gives the same.", whole=True, basics="fsmFormula"))
add(num(D, 0, "b", "Decimals", 1,
        "A delivery has three parcels weighing 2.375 kg, 0.85 kg and 1.4 kg. What is the total weight in kg?",
        unit_answers(2.375 + 0.85 + 1.4, ["kg"]),
        "Line up the decimal points: 2.375 + 0.850 + 1.400 = 4.625 kg."))
add(mc(D, 0, "b", "Ordering decimals", 2,
       "Which of these numbers is closest to 0.4?",
       "0.409", ["0.35", "0.44", "0.388"],
       "0.409 is 0.009 away from 0.4. 0.388 is 0.012 away, 0.44 is 0.04 away and 0.35 is 0.05 away."))
add(mc(D, 0, "b", "Decimals", 2,
       "Work out 0.125 × 0.4",
       "0.05", ["0.5", "0.005", "0.0125"],
       "125 × 4 = 500. The question has 3 + 1 = 4 decimal places, so 0.0500, which is 0.05."))
add(num(D, 0, "b", "Decimals", 2,
        "A 2.4 m plank is cut into pieces 0.15 m long. How many pieces does it make?",
        unit_answers(16, ["pieces"]),
        "2.4 ÷ 0.15 = 16. Multiplying both by 100 gives 240 ÷ 15, which is easier: 16.", whole=True))
add(mc(D, 0, "b", "Rounding", 1,
       "Round 3.4762 to 2 decimal places.",
       "3.48", ["3.47", "3.5", "3.476"],
       "The second decimal place is 7 and the next digit is 6, so round the 7 up to 8: 3.48. 3.47 cuts the digits off without rounding.", basics="fsmEstimate"))
add(mc(D, 0, "b", "Rounding", 2,
       "Round 0.04867 to 2 significant figures.",
       "0.049", ["0.05", "0.048", "0.0487"],
       "The first significant figure is the 4 (zeros at the front do not count). The next digit is 8, and the one after it is 6, so 8 rounds up to 9: 0.049.", basics="fsmEstimate"))
bill = 38 * 1850 * 12
add(num(D, 0, "b", "Calculating with large numbers", 2,
        "A company pays each of its 38 staff £1,850 a month. What is its total wage bill for a year, in pounds?",
        money_answers(bill),
        "38 × 1,850 = 70,300 a month. 70,300 × 12 = £843,600 a year."))
add(mc(D, 0, "b", "Estimation", 1,
       "Tom buys 19 tins of paint at £4.95 each. Which is the best estimate of the total cost?",
       "£100", ["£80", "£120", "£1,000"],
       "Round 19 to 20 and £4.95 to £5: 20 × £5 = £100. The exact cost is £94.05, close to the estimate.", basics="fsmEstimate"))
add(num(D, 0, "b", "Negative numbers", 1,
        "One winter morning it was −23°C in Moscow and 4°C in London. How many degrees warmer was London?",
        unit_answers(27, ["°C", "degrees"]),
        "From −23 to 0 is 23 degrees, then 4 more: 23 + 4 = 27 degrees warmer.", basics="fsmNegatives"))
fv = 1.8 * -15 + 32
add(mc(D, 0, "b", "Formulae", 2,
       "Use F = 1.8C + 32 to convert −15°C to degrees Fahrenheit.",
       f"{fmt(fv)}°F", ["−59°F", "59°F", "−5°F"],
       "1.8 × −15 = −27. Then −27 + 32 = 5°F. −59°F comes from taking 32 away instead of adding it.", basics="fsmFormula"))
cv = (77 - 32) / 1.8
add(num(D, 0, "b", "Formulae", 2,
        "Use C = (F − 32) ÷ 1.8 to convert 77°F to degrees Celsius.",
        unit_answers(cv, ["°C"]),
        "Brackets first: 77 − 32 = 45. Then 45 ÷ 1.8 = 25°C.", basics="fsmFormula"))
cost = 1284 * 0.245
add(num(D, 0, "b", "Decimals", 2,
        "Electricity costs 24.5p per unit (kWh). A household uses 1,284 units in a quarter. How much does it cost, in pounds to the nearest penny?",
        money_answers(round(cost, 2)),
        "24.5p is £0.245. 1,284 × 0.245 = 314.58, so £314.58. Multiplying by 24.5 gives pence, so remember to divide by 100.", tolerance=0.001))
add(mc(D, 0, "b", "Order of operations", 2,
       "Ali wants the mean of 12 and 18. She types 12 + 18 ÷ 2 into her calculator and gets 21, which is wrong. What should she type?",
       "(12 + 18) ÷ 2", ["12 + (18 ÷ 2)", "12 ÷ 2 + 18", "2 ÷ (12 + 18)"],
       "The calculator divides before it adds, so it worked out 18 ÷ 2 first. Brackets make it add first: 30 ÷ 2 = 15.", basics="fsmOrderOps"))
packs = 1450 / 25
add(num(D, 0, "b", "Calculating with large numbers", 2,
        "A school needs 1,450 exercise books. They come in packs of 25, and each pack costs £11.40. How much will the books cost, in pounds?",
        money_answers(packs * 11.40),
        "1,450 ÷ 25 = 58 packs. 58 × £11.40 = £661.20."))
add(num(D, 0, "b", "Calculating with large numbers", 2,
        "A minibus seats 16 passengers. 150 pupils are going on a school trip. How many minibuses are needed?",
        unit_answers(10, ["minibuses"]),
        "150 ÷ 16 = 9.375. Nine minibuses would leave 6 pupils behind, so round up to 10.", whole=True))
add(mc(D, 0, "b", "Negative numbers", 2,
       "Which of these temperatures is the lowest?",
       "−3.5°C", ["−3.05°C", "−0.35°C", "−3.45°C"],
       "Below zero, the bigger the number after the minus sign, the colder. 3.5 is bigger than 3.45 and 3.05, so −3.5°C is lowest.", basics="fsmNegatives"))
pay = 37.5 * 12.80 + 6 * 12.80 * 1.5
add(num(D, 0, "b", "Formulae", 3,
        "Weekly pay = (basic hours × rate) + (overtime hours × rate × 1.5)\n\nKai's rate is £12.80 an hour. One week he works 37.5 basic hours and 6 overtime hours. What is his pay, in pounds?",
        money_answers(round(pay, 2)),
        "Basic: 37.5 × 12.80 = 480. Overtime rate: 12.80 × 1.5 = 19.20, and 6 × 19.20 = 115.20. Total: 480 + 115.20 = £595.20.", basics="fsmFormula"))
assert abs(pay - 595.2) < 1e-9
