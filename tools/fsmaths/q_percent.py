"""Fractions, decimals, percentages, ratio and proportion, and money
(DfE Functional Skills Maths subject content, Level 2 items 4 to 8, 11 and 13)."""
from common import mc, num, multi, gbp, fmt, money_answers, unit_answers, pct_answers

D = "fsmPercent"
ITEMS = []
add = ITEMS.append

# ---------------- Test 1, Section A (non-calculator) ----------------
add(mc(D, 1, "a", "Fractions, decimals and percentages", 2,
       "Which of these is equal to 3/8?",
       "37.5%", ["38%", "0.38", "3.8%"],
       "3/8 = 3 ÷ 8 = 0.375, and 0.375 × 100 = 37.5%. Half of 1/4 (25%) is 12.5%, and 25% + 12.5% = 37.5%. 38% and 0.38 are rounded, so not equal.",
       basics="fsmFdp"))
add(num(D, 1, "a", "Percentage of an amount", 1,
        "Work out 35% of £240. Give your answer in pounds.",
        money_answers(0.35 * 240),
        "10% of £240 is £24, so 30% is £72. 5% is half of 10%: £12. 35% = £72 + £12 = £84.",
        basics="fsmPercentOf"))
add(mc(D, 1, "a", "Ratio", 2,
       "Three friends share £450 in the ratio 2 : 3 : 4. How much is the largest share?",
       "£200", ["£150", "£100", "£112.50"],
       "2 + 3 + 4 = 9 parts. One part is £450 ÷ 9 = £50. The largest share is 4 parts: 4 × £50 = £200. £112.50 is £450 ÷ 4, which ignores the other parts.",
       basics="fsmRatio"))

# ---------------- Test 2, Section A (non-calculator) ----------------
add(mc(D, 2, "a", "Fractions", 2,
       "In a garden, 1/4 of the area is lawn and 2/5 is patio. The rest is flower beds. What fraction of the garden is flower beds?",
       "7/20", ["3/9", "1/3", "13/20"],
       "Use twentieths: 1/4 = 5/20 and 2/5 = 8/20. Lawn and patio are 13/20, so flower beds are 20/20 − 13/20 = 7/20. 13/20 is the lawn and patio together.",
       basics="fsmFdp"))
add(num(D, 2, "a", "One amount as a percentage of another", 1,
        "Mia gets 18 out of 24 questions right in a quiz. What percentage is that?",
        pct_answers(75),
        "18/24 simplifies to 3/4 (divide both by 6), and 3/4 = 75%.",
        basics="fsmPercentOf"))
add(num(D, 2, "a", "Direct proportion", 1,
        "A recipe for 5 people uses 400 g of flour. How much flour is needed for 8 people, in grams?",
        unit_answers(640, ["g", "grams"]),
        "For 1 person: 400 ÷ 5 = 80 g. For 8 people: 80 × 8 = 640 g.",
        basics="fsmRatio"))

# ---------------- Test 1, Section B (calculator) ----------------
add(num(D, 1, "b", "VAT", 1,
        "Hiring a van costs £185 plus VAT at 20%. What is the total cost, in pounds?",
        money_answers(185 * 1.2),
        "20% of £185 is £37. £185 + £37 = £222. Or in one step: 185 × 1.2 = 222.",
        basics="fsmPercentOf"))
pd = (64 - 52) / 64 * 100
add(mc(D, 1, "b", "Percentage change", 2,
       "The price of a printer cartridge falls from £64 to £52. What is the percentage decrease?",
       f"{fmt(pd)}%", [f"{(12 / 52 * 100):.2f}%", "12%", f"{fmt(52 / 64 * 100)}%"],
       "The decrease is £12. Divide by the original price: 12 ÷ 64 = 0.1875 = 18.75%. Dividing by £52, the new price, gives 23.08%, which is wrong.",
       basics="fsmPercentChange"))
add(mc(D, 1, "b", "Reverse percentages", 3,
       "In a sale, a coat is reduced by 15%. It now costs £68. What was the original price?",
       "£80.00", [gbp(68 * 1.15), "£83.00", gbp(68 * 0.85)],
       "After a 15% cut the coat costs 85% of the original. 85% is £68, so 1% is £0.80 and 100% is £80. Adding 15% to £68 gives £78.20, but the 15% was of the original price, not of £68.",
       basics="fsmPercentChange"))
ci = 2500 * 1.03 ** 2
add(num(D, 1, "b", "Compound interest", 2,
        "Leah puts £2,500 in a savings account that pays 3% compound interest a year. How much is in the account after 2 years, in pounds?",
        money_answers(round(ci, 2)),
        "Each year multiply by 1.03: 2,500 × 1.03 = 2,575, then 2,575 × 1.03 = £2,652.25. Simple interest would give only £2,650.",
        tolerance=0.001, basics="fsmPercentOf"))
add(mc(D, 1, "b", "Inverse proportion", 2,
       "It takes 6 decorators 10 days to paint a block of flats. How long would it take 4 decorators working at the same rate?",
       "15 days", ["6.7 days", "8 days", "12 days"],
       "The job is 6 × 10 = 60 decorator-days of work. With 4 decorators: 60 ÷ 4 = 15 days. Fewer workers take longer, so any answer under 10 days must be wrong.",
       basics="fsmRatio"))
sand = 280 / 7 * 2
add(num(D, 1, "b", "Ratio", 2,
        "Concrete is mixed from cement, sand and gravel in the ratio 1 : 2 : 4 by weight. A builder needs 280 kg of concrete. How much sand does he need, in kg?",
        unit_answers(sand, ["kg"]),
        "1 + 2 + 4 = 7 parts. One part is 280 ÷ 7 = 40 kg. Sand is 2 parts: 80 kg.",
        basics="fsmRatio"))
a100, b100 = 2.60 / 4, 4.65 / 7.5
add(mc(D, 1, "b", "Best buy", 2,
       "A 400 g box of cereal costs £2.60. A 750 g box of the same cereal costs £4.65. Which box is better value, and by how much per 100 g?",
       "750 g box, by 3p per 100 g", ["400 g box, by 3p per 100 g", "750 g box, by 5p per 100 g", "400 g box, by 2p per 100 g"],
       "400 g box: £2.60 ÷ 4 = 65p per 100 g. 750 g box: £4.65 ÷ 7.5 = 62p per 100 g. The bigger box is cheaper by 3p per 100 g.",
       basics="fsmRatio"))
assert round(a100 - b100, 2) == 0.03
left = 1850 * (1 - 0.42) - 230
add(num(D, 1, "b", "Budgeting", 2,
        "Dan's take-home pay is £1,850 a month. His rent is 42% of his take-home pay and his bills are £230 a month. How much does he have left each month after rent and bills, in pounds?",
        money_answers(round(left, 2)),
        "Rent: 42% of £1,850 = £777. £1,850 − £777 − £230 = £843.",
        basics="fsmPercentOf"))
add(num(D, 1, "b", "Fractions", 2,
        "A water tank is 2/3 full and holds 54 litres. How many litres does it hold when it is completely full?",
        unit_answers(81, ["litres", "l", "L"]),
        "2/3 is 54 litres, so 1/3 is 27 litres and 3/3 is 3 × 27 = 81 litres. 2/3 of 54 (36 litres) works the wrong way round.",
        basics="fsmFdp"))

# ---------------- Test 2, Section B (calculator) ----------------
add(mc(D, 2, "b", "Percentage change", 2,
       "Kerry's rent goes up from £725 to £783 a month. What is the percentage increase?",
       "8%", [f"{58 / 783 * 100:.1f}%", "5.8%", "58%"],
       "The increase is £58. 58 ÷ 725 = 0.08 = 8%. 7.4% comes from dividing by the new rent, £783.",
       basics="fsmPercentChange"))
add(num(D, 2, "b", "Reverse percentages", 3,
        "After a 4% pay rise, Jodie earns £24,960 a year. What did she earn before the rise, in pounds?",
        money_answers(24960 / 1.04),
        "The new salary is 104% of the old one. 24,960 ÷ 1.04 = £24,000. Taking 4% off £24,960 gives £23,961.60, which is not the same.",
        basics="fsmPercentChange"))
dep = 14000 * 0.85 ** 3
add(mc(D, 2, "b", "Depreciation", 3,
       "A van bought for £14,000 loses 15% of its value each year. What is it worth after 3 years?",
       gbp(dep), [gbp(14000 * (1 - 0.45)), gbp(14000 * 0.85 ** 2), gbp(14000 * 0.85 ** 4)],
       "Each year the value is multiplied by 0.85: 14,000 × 0.85³ = £8,597.75. Taking 45% off in one go (£7,700) is wrong because each 15% is taken from a smaller value.",
       basics="fsmPercentChange"))
sa, ca = 5000 * 0.04 * 3, 5000 * (1.038 ** 3 - 1)
diff = sa - ca
add(mc(D, 2, "b", "Interest", 3,
       "Ruth has £5,000 to save for 3 years. Account A pays 4% simple interest a year. Account B pays 3.8% compound interest a year. Which earns more interest, and by about how much?",
       f"Account A, by about £{round(diff)}", [f"Account B, by about £{round(diff)}", "Account A, by about £20", "They earn the same"],
       f"A: 4% of £5,000 is £200 a year, so £600. B: 5,000 × 1.038³ = £{5000 * 1.038 ** 3:,.2f}, which is £{ca:.2f} interest. A earns about £{round(diff)} more.",
       basics="fsmPercentOf"))
assert round(diff) == 8
add(num(D, 2, "b", "Ratio", 3,
        "In a youth club the ratio of boys to girls is 5 : 7. There are 18 more girls than boys. How many young people are in the club altogether?",
        unit_answers(108, ["people"]),
        "The difference is 7 − 5 = 2 parts, and that is 18 people, so 1 part is 9. Altogether is 5 + 7 = 12 parts: 12 × 9 = 108.", whole=True,
        basics="fsmRatio"))
add(mc(D, 2, "b", "Fractions, decimals and percentages", 2,
       "Which of these is the greatest?",
       "5/8", ["0.6", "61%", "0.615"],
       "Change them all to decimals: 5/8 = 0.625, 0.6, 61% = 0.61 and 0.615. 0.625 is the greatest.",
       basics="fsmFdp"))
voted = 1240 * 3 / 5
add(num(D, 2, "b", "Fractions", 2,
        "In a village of 1,240 adults, 3/5 voted in a local election. 3/8 of those who voted chose the Green candidate. How many people voted for the Green candidate?",
        unit_answers(voted * 3 / 8, ["people"]),
        "3/5 of 1,240 = 744 voted. 3/8 of 744 = 279.", whole=True, basics="fsmFdp"))
add(num(D, 2, "b", "Currency conversion", 1,
        "The exchange rate is £1 = €1.14. How many euros do you get for £450?",
        unit_answers(513, ["euros"]),
        "Pounds to euros: multiply by the rate. 450 × 1.14 = €513.",
        basics="fsmRatio"))
ct = 1936 * 0.75 / 10
add(num(D, 2, "b", "Percentage of an amount", 2,
        "A flat's council tax is £1,936 a year. A person living alone gets a 25% discount. The bill is paid in 10 equal monthly instalments. How much is each instalment, in pounds?",
        money_answers(ct),
        "With the discount she pays 75%: 1,936 × 0.75 = £1,452. Divided into 10 instalments: £145.20.",
        basics="fsmPercentOf"))

# ---------------- Drill only (calculator) ----------------
add(mc(D, 0, "b", "Fractions, decimals and percentages", 1,
       "Write 0.45 as a fraction in its simplest form.",
       "9/20", ["45/10", "4/5", "1/45"],
       "0.45 = 45/100. Divide top and bottom by 5: 9/20. 45/10 would be 4.5.", basics="fsmFdp"))
add(num(D, 0, "b", "Fractions, decimals and percentages", 1,
        "Write 7/20 as a percentage.",
        pct_answers(35),
        "Multiply top and bottom by 5 to get 35/100, which is 35%.", basics="fsmFdp"))
add(mc(D, 0, "b", "Fractions, decimals and percentages", 1,
       "Which of these is not equal to 3/4?",
       "0.34", ["0.75", "75%", "6/8"],
       "3/4 = 0.75 = 75% = 6/8. 0.34 just uses the digits 3 and 4, but it is less than half.", basics="fsmFdp"))
add(mc(D, 0, "b", "Fractions", 2,
       "Work out 1 2/3 + 3/4",
       "2 5/12", ["1 5/7", "2 1/12", "1 11/12"],
       "Use twelfths: 2/3 = 8/12 and 3/4 = 9/12. 8/12 + 9/12 = 17/12 = 1 5/12. Add the whole 1: 2 5/12. 1 5/7 adds the tops and the bottoms, which never works.", basics="fsmFdp"))
add(mc(D, 0, "b", "Fractions", 2,
       "A shelf is 3 1/2 m long. Jay cuts off 1 3/4 m. How long is the piece that is left?",
       "1 3/4 m", ["2 1/4 m", "1 1/4 m", "2 3/4 m"],
       "3 1/2 = 3 2/4. Take away 1 3/4: 3 2/4 − 1 3/4 = 2 6/4 − 1 3/4 = 1 3/4 m.", basics="fsmFdp"))
add(mc(D, 0, "b", "One number as a fraction of another", 2,
       "What fraction of 2 hours is 45 minutes? Give it in its simplest form.",
       "3/8", ["9/20", "3/4", "2/5"],
       "Use the same units: 2 hours is 120 minutes. 45/120 simplifies to 3/8 (divide by 15). 3/4 is 45 minutes as a fraction of 1 hour.", basics="fsmFdp"))
add(num(D, 0, "b", "Percentage of an amount", 1,
        "Work out 17.5% of £360. Give your answer in pounds.",
        money_answers(0.175 * 360),
        "0.175 × 360 = 63, so £63. Or: 10% = £36, 5% = £18, 2.5% = £9, and £36 + £18 + £9 = £63.", basics="fsmPercentOf"))
add(num(D, 0, "b", "One amount as a percentage of another", 1,
        "A netball team won 23 of its 40 matches. What percentage of its matches did it win?",
        pct_answers(57.5),
        "23 ÷ 40 = 0.575 = 57.5%.", basics="fsmPercentOf"))
add(num(D, 0, "b", "Percentage change", 2,
        "A gym's membership rises from 240 to 282. What is the percentage increase?",
        pct_answers(17.5),
        "The increase is 42. 42 ÷ 240 = 0.175 = 17.5%.", basics="fsmPercentChange"))
add(num(D, 0, "b", "Percentage change", 2,
        "Gareth's weight goes down from 92 kg to 85.1 kg. What is the percentage decrease?",
        pct_answers(7.5),
        "The decrease is 6.9 kg. 6.9 ÷ 92 = 0.075 = 7.5%. Always divide by the starting value.", basics="fsmPercentChange"))
add(num(D, 0, "b", "Reverse percentages", 3,
        "A pair of boots costs £42 after 30% has been taken off. What was the original price, in pounds?",
        money_answers(42 / 0.7),
        "After 30% off, £42 is 70% of the original. 42 ÷ 0.7 = £60. Check: 30% of £60 is £18, and £60 − £18 = £42.", basics="fsmPercentChange"))
add(mc(D, 0, "b", "VAT", 3,
       "A price including VAT at 20% is £150. What was the price before VAT was added?",
       "£125", ["£120", "£130", "£180"],
       "£150 is 120% of the price before VAT. 150 ÷ 1.2 = £125. Taking 20% off £150 gives £120, but the 20% was of the smaller price.", basics="fsmPercentChange"))
interest = round(800 * 1.025 ** 3 - 800, 2)
add(num(D, 0, "b", "Compound interest", 3,
        "£800 is invested at 2.5% compound interest a year. How much interest has it earned after 3 years? Give your answer in pounds to the nearest penny.",
        money_answers(interest),
        f"800 × 1.025³ = {800 * 1.025 ** 3:.4f}, so £{800 * 1.025 ** 3:.2f} in the account. Take off the £800 invested: £{interest:.2f} interest.",
        tolerance=0.011, basics="fsmPercentOf"))
add(mc(D, 0, "b", "Simple interest", 1,
       "£3,000 is saved at 4% simple interest a year. How much interest does it earn in 5 years?",
       "£600", [gbp(3000 * 1.04 ** 5 - 3000), "£120", "£3,600"],
       "Simple interest is the same each year: 4% of £3,000 = £120, and 5 × £120 = £600. £3,600 is the total in the account, not the interest.", basics="fsmPercentOf"))
add(mc(D, 0, "b", "Discounts", 2,
       "A £150 jacket is reduced by 20%, then by a further 10% of the sale price. What is the final price?",
       "£108", ["£105", "£120", "£135"],
       "150 × 0.8 = 120, then 120 × 0.9 = £108. It is not 30% off (£105) because the 10% is taken from £120, not £150.", basics="fsmPercentChange"))
spend = 780 + 320 + 145 + 265 + 410
add(num(D, 0, "b", "Budgeting", 1,
        "Nadia's monthly income is £2,140. Each month she spends £780 on rent, £320 on food, £145 on travel, £265 on bills and £410 on other things. How much can she save each month, in pounds?",
        money_answers(2140 - spend),
        "Her spending adds up to £1,920. £2,140 − £1,920 = £220."))
add(mc(D, 0, "b", "Ratio", 1,
       "Write the ratio 36 : 84 in its simplest form.",
       "3 : 7", ["9 : 21", "7 : 3", "1 : 2"],
       "Both numbers divide by 12: 36 ÷ 12 = 3 and 84 ÷ 12 = 7. 9 : 21 is simpler but can still be divided by 3.", basics="fsmRatio"))
add(num(D, 0, "b", "Ratio", 2,
        "Two friends put £3 and £5 into a lottery syndicate and agree to share any winnings in the same ratio. They win £28,000. How much does the friend who paid £5 get, in pounds?",
        money_answers(28000 / 8 * 5),
        "3 : 5 is 8 parts. One part is £28,000 ÷ 8 = £3,500. Five parts: £17,500.", basics="fsmRatio"))
add(num(D, 0, "b", "Ratio", 2,
        "Orange squash is mixed with water in the ratio 1 : 6. How much squash is in 1.4 litres of the drink? Give your answer in millilitres.",
        unit_answers(200, ["ml", "mL"]),
        "1 + 6 = 7 parts. 1.4 litres = 1,400 ml, and 1,400 ÷ 7 = 200 ml of squash.", basics="fsmRatio"))
add(num(D, 0, "b", "Direct proportion", 2,
        "8 m of curtain fabric costs £46. How much would 13 m cost, in pounds?",
        money_answers(46 / 8 * 13),
        "1 m costs £46 ÷ 8 = £5.75. 13 × £5.75 = £74.75.", basics="fsmRatio"))
add(mc(D, 0, "b", "Inverse proportion", 2,
       "A farmer has enough feed for 15 cows for 12 days. How long would the same feed last 20 cows?",
       "9 days", ["16 days", "7 days", "10 days"],
       "The feed is 15 × 12 = 180 cow-days. 180 ÷ 20 = 9 days. More cows means the feed runs out sooner, so 16 days must be wrong.", basics="fsmRatio"))
add(mc(D, 0, "b", "Best buy", 2,
       "Kitchen roll comes in a pack of 6 for £3.30 or a pack of 9 for £4.77. Which pack is better value?",
       "The 9-pack, at 53p a roll", ["The 6-pack, at 55p a roll", "The 9-pack, at 55p a roll", "The 6-pack, at 53p a roll"],
       "£3.30 ÷ 6 = 55p a roll. £4.77 ÷ 9 = 53p a roll. The 9-pack is cheaper per roll.", basics="fsmRatio"))
back = round(95 / 1.18, 2)
add(num(D, 0, "b", "Currency conversion", 2,
        "After a holiday, Ellie changes €95 back into pounds. The bank's rate is £1 = €1.18. How many pounds does she get, to the nearest penny?",
        money_answers(back),
        f"Euros to pounds: divide by the rate. 95 ÷ 1.18 = {95 / 1.18:.4f}, so £{back:.2f}. Multiplying would give more pounds than euros, which cannot be right when €1.18 is worth only £1.",
        tolerance=0.011, basics="fsmRatio"))
tax = (31000 - 12570) * 0.2
add(num(D, 0, "b", "Tax", 2,
        "Use these figures for this question: no income tax is paid on the first £12,570 of earnings, and tax is 20% of everything earned above that. Sam earns £31,000 a year. How much income tax does he pay, in pounds?",
        money_answers(tax),
        "Taxable income: £31,000 − £12,570 = £18,430. 20% of £18,430 = £3,686."))
add(num(D, 0, "b", "Percentage of an amount", 2,
        "A mortgage lender wants a 15% deposit on a £185,000 house. Zara has saved £21,400. How much more does she need to save, in pounds?",
        money_answers(185000 * 0.15 - 21400),
        "15% of £185,000 is £27,750. £27,750 − £21,400 = £6,350.", basics="fsmPercentOf"))
add(num(D, 0, "b", "Fractions", 2,
        "A theatre has 1,200 seats. It is 5/6 full, and 30% of the audience are under 18. How many under-18s are in the audience?",
        unit_answers(300, ["people"]),
        "5/6 of 1,200 = 1,000 people. 30% of 1,000 = 300.", whole=True, basics="fsmFdp"))
add(mc(D, 0, "b", "Percentage of an amount", 2,
       "Owen earns £26,500 a year. His employer offers either a 3.5% pay rise or a flat £900 a year. Which is worth more, and by how much?",
       "3.5%, by £27.50", ["£900, by £27.50", "3.5%, by £72.50", "£900, by £72.50"],
       "3.5% of £26,500 = £927.50. That beats £900 by £27.50.", basics="fsmPercentOf"))
add(multi(D, 0, "b", "Fractions, decimals and percentages", 2,
          "Choose two amounts that are equal to 2/5 of £85.",
          ["40% of £85", "£34"], ["£42.50", "0.25 × £85", "£17"],
          "2/5 = 0.4 = 40%, and 0.4 × £85 = £34. £17 is only 1/5 and £42.50 is half.", basics="fsmFdp"))
add(num(D, 0, "b", "Ratio", 3,
        "A biscuit recipe uses flour, butter and sugar in the ratio 6 : 4 : 3 by weight. Alfie has 500 g of butter and plenty of flour and sugar. If he uses all the butter, how much flour does he need, in grams?",
        unit_answers(750, ["g", "grams"]),
        "4 parts of butter is 500 g, so 1 part is 125 g. Flour is 6 parts: 6 × 125 = 750 g.", basics="fsmRatio"))
add(mc(D, 0, "b", "Percentage change", 2,
       "Which calculation gives the new price after a 6% increase on a price of £P?",
       "P × 1.06", ["P × 0.06", "P × 1.6", "P + 6"],
       "The new price is 100% + 6% = 106% of the old one, and 106% = 1.06. P × 0.06 gives only the increase, and P × 1.6 is a 60% increase.", basics="fsmPercentChange"))
