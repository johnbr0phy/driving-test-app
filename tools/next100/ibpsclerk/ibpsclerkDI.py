# Numerical Ability: data interpretation (tables).
assert 300 + 216 + 288 + 210 + 286 == 1300
assert (240 + 180 + 320 + 150 + 260) / 5 == 230
assert 600 * 5 / 12 == 250 and 720 * 5 / 8 + 540 / 3 == 630 and 540 * 2 / 3 - 450 * 5 / 9 == 110
assert 280 + 540 + 300 + 360 + 320 == 1800 and (540 - 320) / 320 == 0.6875
assert (420 + 360 + 500 + 240 + 480) / 5 == 400
assert 2400 * 0.8 == 1920 and 1200 * 0.15 + 900 * 0.1 == 270 and 1500 * 0.88 / 1.1 == 1200
assert 54 + 48 + 42 == 144
T1A, T1B, T2A, T2B = "IBPSCLK-T1-DI1", "IBPSCLK-T1-DI2", "IBPSCLK-T2-DI1", "IBPSCLK-T2-DI2"
ITEMS = [
    # ---------- Mock Test 1: two-wheeler sales ----------
    S(1, 1, "Data interpretation", "How many two-wheelers did the five dealers sell in all in 2025?",
      ["1300", "1280", "1320", "1250", "1350"],
      "300 + 216 + 288 + 210 + 286 = 1300.", stim=T1A),
    S(1, 1, "Data interpretation", "By what percentage did dealer D's sales rise from 2024 to 2025?",
      ["40%", "30%", "45%", "35%", "60%"],
      "D rose from 150 to 210, an increase of 60. 60 ÷ 150 × 100 = 40%.", stim=T1A),
    S(1, 2, "Data interpretation", "What is the ratio of dealer B's sales in 2024 to dealer D's sales in 2025?",
      ["6 : 7", "5 : 6", "7 : 8", "3 : 4", "7 : 6"],
      "B in 2024 sold 180 and D in 2025 sold 210. 180 : 210, dividing both by 30, is 6 : 7.", stim=T1A),
    S(1, 1, "Data interpretation", "What was the average number of two-wheelers sold per dealer in 2024?",
      ["230", "220", "240", "225", "235"],
      "240 + 180 + 320 + 150 + 260 = 1150, and 1150 ÷ 5 = 230.", stim=T1A),
    S(1, 2, "Data interpretation", "By what percentage did dealer C's sales fall from 2024 to 2025?",
      ["10%", "8%", "12%", "11.11%", "9%"],
      "C fell from 320 to 288, a drop of 32. 32 ÷ 320 × 100 = 10%. (11.11% is the drop measured against 288, the wrong base.)", stim=T1A),
    # ---------- Mock Test 1: students by school ----------
    S(1, 1, "Data interpretation", "How many girls study in school P?",
      ["250", "240", "275", "225", "350"],
      "Boys and girls are in the ratio 7 : 5, so girls are 5/12 of 600 = 250.", stim=T1B),
    S(1, 2, "Data interpretation", "What is the total number of boys in schools R and S together?",
      ["630", "600", "660", "540", "690"],
      "R: 5/8 of 720 = 450 boys. S: 1/3 of 540 = 180 boys. 450 + 180 = 630.", stim=T1B),
    S(1, 2, "Data interpretation", "How many more girls study in school S than in school Q?",
      ["110", "90", "100", "120", "130"],
      "S: 2/3 of 540 = 360 girls. Q: 5/9 of 450 = 250 girls. 360 − 250 = 110.", stim=T1B),

    # ---------- Mock Test 2: grain in warehouses ----------
    S(2, 1, "Data interpretation", "How many bags of rice are stored in the five warehouses in all?",
      ["1800", "1760", "1840", "1720", "1900"],
      "280 + 540 + 300 + 360 + 320 = 1800.", stim=T2A),
    S(2, 3, "Data interpretation", "The number of rice bags in warehouse K is what percent more than in warehouse N?",
      ["68.75%", "62.5%", "70%", "66.67%", "72.5%"],
      "K has 540 and N has 320, a difference of 220. 220 ÷ 320 × 100 = 68.75%.", stim=T2A),
    S(2, 1, "Data interpretation", "What is the ratio of wheat bags in warehouse J to rice bags in warehouse M?",
      ["7 : 6", "6 : 5", "5 : 4", "7 : 5", "4 : 3"],
      "J has 420 wheat bags and M has 360 rice bags. 420 : 360, dividing both by 60, is 7 : 6.", stim=T2A),
    S(2, 1, "Data interpretation", "What is the average number of wheat bags per warehouse?",
      ["400", "380", "420", "390", "410"],
      "420 + 360 + 500 + 240 + 480 = 2000, and 2000 ÷ 5 = 400.", stim=T2A),
    S(2, 1, "Data interpretation", "In how many warehouses are there more bags of wheat than bags of rice?",
      ["Three", "Two", "Four", "One", "Five"],
      "J (420 > 280), L (500 > 300) and N (480 > 320). K and M hold more rice.", stim=T2A),
    # ---------- Mock Test 2: prices and discounts ----------
    S(2, 1, "Data interpretation", "What is the selling price of the fan after the discount?",
      ["₹1,920", "₹1,980", "₹1,880", "₹2,040", "₹1,820"],
      "A 20% discount on ₹2,400 is ₹480, so the fan sells for ₹1,920.", stim=T2B),
    S(2, 2, "Data interpretation", "What is the total discount given on one kettle and one iron?",
      ["₹270", "₹240", "₹300", "₹255", "₹285"],
      "Kettle: 15% of 1,200 = ₹180. Iron: 10% of 900 = ₹90. Total ₹270.", stim=T2B),
    S(2, 3, "Data interpretation", "The shopkeeper makes a 10% profit on the lamp even after the discount. What is the lamp's cost price?",
      ["₹1,200", "₹1,188", "₹1,150", "₹1,250", "₹1,180"],
      "Selling price = 88% of ₹1,500 = ₹1,320. A 10% profit means 1,320 = 1.1 × cost, so cost = ₹1,200. (₹1,188 is 90% of 1,320, the wrong way round.)", stim=T2B),

    # ---------- Drill only ----------
    S(0, 1, "Data interpretation", "How many members did the three classes have in all in May?",
      ["144", "135", "150", "138", "156"],
      "54 + 48 + 42 = 144.", stim="IBPSCLK-D-DI"),
    S(0, 1, "Data interpretation", "By what percentage did the weekend class grow from April to May?",
      ["40%", "30%", "35%", "45%", "25%"],
      "The weekend class grew from 30 to 42, an increase of 12. 12 ÷ 30 × 100 = 40%.", stim="IBPSCLK-D-DI"),
    S(0, 2, "Data interpretation", "By what percentage did the evening class shrink from April to May?",
      ["20%", "25%", "12%", "15%", "18%"],
      "The evening class fell from 60 to 48, a drop of 12. 12 ÷ 60 × 100 = 20%. (25% is the drop measured against 48.)", stim="IBPSCLK-D-DI"),
]
