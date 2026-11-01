# Quantitative Aptitude: data interpretation (tables in shared stimuli).
from fractions import Fraction as F
assert 300 + 288 + 234 + 440 + 138 == 1400
assert (234 - 180) / 180 == 0.3
assert F(320, 138) == F(160, 69)
assert (250 + 180 + 400 + 150) / 4 == 245
assert 0.35 * 800 + 0.25 * 640 + 0.4 * 900 + 0.5 * 560 == 1080
assert (540 - 480) / 480 == 0.125
assert 160 * 1.5 / 640 == 0.375
assert 150 + 170 + 192 + 117 + 161 == 790
assert (200 - 170) / 200 == 0.15
assert (120 + 160 + 140) / 3 == 140
assert 120 + 200 + 300 + 140 == 760
assert (300 - 120) / 120 == 1.5
assert F(700, 910) == F(10, 13)
assert F(140, 1050) == F(2, 15)
assert 360 + 280 + 450 + 210 == 1300 and F(1300, 560) == F(65, 28)
T1A, T1B, T2A, T2B, DD = "SBIPO-T1-DI1", "SBIPO-T1-DI2", "SBIPO-T2-DI1", "SBIPO-T2-DI2", "SBIPO-D-DI"
ITEMS = [
    # ---------- Mock Test 1: deposits ----------
    N(1, 1, "Data interpretation", "What were the total fixed deposits (in ₹ lakh) of all five branches in Quarter 2?",
      "1,400", ["1,300", "1,340", "1,360", "1,380"],
      "300 + 288 + 234 + 440 + 138 = 1,400.", stim=T1A),
    N(1, 2, "Data interpretation", "By what percentage did branch M's deposits rise from Quarter 1 to Quarter 2?",
      "30%", ["12%", "20%", "25%", "35%"],
      "M rose from 180 to 234, an increase of 54. 54 ÷ 180 = 0.3, so 30%.", stim=T1A),
    S(1, 2, "Data interpretation", "What is the ratio of branch L's deposits in Quarter 1 to branch O's deposits in Quarter 2?",
      ["160 : 69", "80 : 39", "16 : 7", "40 : 17", "32 : 15"],
      "320 : 138. Dividing both by 2 gives 160 : 69.", stim=T1A),
    N(1, 2, "Data interpretation", "What were the average Quarter 1 deposits (in ₹ lakh) of branches K, M, N and O?",
      "245", ["225", "235", "250", "255"],
      "250 + 180 + 400 + 150 = 980, and 980 ÷ 4 = 245.", stim=T1A),
    # ---------- Mock Test 1: books ----------
    N(1, 1, "Data interpretation", "How many books did the four shops sell online in all?",
      "1,080", ["1,040", "1,120", "1,160", "1,200"],
      "Online sales: W 280, X 160, Y 360 and Z 280. 280 + 160 + 360 + 280 = 1,080.", stim=T1B),
    N(1, 2, "Data interpretation", "The books shop Y sold in the shop (not online) are what percentage more than the books shop X sold in the shop?",
      "12.5%", ["10%", "11.5%", "15%", "17.5%"],
      "Y sold 60% of 900 = 540 in the shop and X sold 75% of 640 = 480. 60 more on 480 is 12.5%.", stim=T1B),
    S(1, 1, "Data interpretation", "What is the ratio of the books sold online by shop W to those sold online by shop Z?",
      ["1 : 1", "5 : 4", "7 : 8", "4 : 5", "8 : 7"],
      "W sold 35% of 800 = 280 online and Z sold 50% of 560 = 280 online, so the ratio is 1 : 1.", stim=T1B),
    N(1, 3, "Data interpretation", "Next month shop X sells the same total number of books, but its online sales rise by 50%. What percentage of its books are then sold online?",
      "37.5%", ["30%", "35%", "40%", "75%"],
      "X sold 25% of 640 = 160 online. A 50% rise gives 240, and 240 ÷ 640 = 37.5%. Adding 50% to the 25% share itself would wrongly give 75%.", stim=T1B),

    # ---------- Mock Test 2: museums ----------
    L(2, 2, "Data interpretation", "Which museum had the highest percentage increase in visitors from 2024 to 2025?",
      ["A", "B", "C", "D", "E"], 3,
      "A rose 25%, C 20%, D 30% (27 on 90) and E 15%, while B fell. D had the highest percentage increase.", stim=T2A),
    N(2, 1, "Data interpretation", "What was the total number of visitors (in thousands) to all five museums in 2025?",
      "790", ["710", "760", "770", "780"],
      "150 + 170 + 192 + 117 + 161 = 790 thousand. The 2024 total is 710 thousand.", stim=T2A),
    N(2, 2, "Data interpretation", "By what percentage did the number of visitors to museum B fall from 2024 to 2025?",
      "15%", ["12%", "17.5%", "20%", "30%"],
      "B fell from 200 to 170, a drop of 30. 30 ÷ 200 = 15%.", stim=T2A),
    N(2, 1, "Data interpretation", "What was the average number of visitors (in thousands) to museums A, C and E in 2024?",
      "140", ["145", "150", "155", "160"],
      "120 + 160 + 140 = 420, and 420 ÷ 3 = 140.", stim=T2A),
    # ---------- Mock Test 2: factory output ----------
    N(2, 2, "Data interpretation", "How many units were rejected by the four factories in all?",
      "760", ["700", "720", "740", "800"],
      "Rejected: F1 1/10 of 1,200 = 120, F2 2/9 of 900 = 200, F3 1/5 of 1,500 = 300, F4 2/15 of 1,050 = 140. The total is 760.", stim=T2B),
    N(2, 2, "Data interpretation", "The units rejected at F3 are what percentage more than the units rejected at F1?",
      "150%", ["60%", "100%", "180%", "250%"],
      "F3 rejected 300 and F1 rejected 120. The difference, 180, is 150% of 120.", stim=T2B),
    S(2, 2, "Data interpretation", "What is the ratio of units passed at F2 to units passed at F4?",
      ["10 : 13", "7 : 13", "9 : 13", "10 : 11", "13 : 10"],
      "F2 passed 7/9 of 900 = 700 and F4 passed 13/15 of 1,050 = 910. 700 : 910 = 10 : 13.", stim=T2B),
    S(2, 3, "Data interpretation", "What percentage of the units made at F4 were rejected?",
      ["13 1/3%", "15%", "12 1/2%", "11 1/9%", "14 2/7%"],
      "2 of every 15 units were rejected, and 2/15 = 13 1/3%.", stim=T2B),

    # ---------- Drill only: crop area ----------
    N(0, 1, "Data interpretation", "What is the total area (in hectares) sown with wheat in the four villages?",
      "1,300", ["1,200", "1,250", "1,350", "1,400"],
      "360 + 280 + 450 + 210 = 1,300 hectares.", stim=DD),
    N(0, 1, "Data interpretation", "The wheat area of Devgarh is how many times its mustard area?",
      "5", ["3", "4", "4.5", "6"],
      "450 ÷ 90 = 5.", stim=DD),
    S(0, 2, "Data interpretation", "What is the ratio of the total wheat area to the total mustard area of the four villages?",
      ["65 : 28", "13 : 5", "65 : 24", "5 : 2", "28 : 65"],
      "Wheat totals 1,300 and mustard 120 + 140 + 90 + 210 = 560. 1,300 : 560 = 65 : 28.", stim=DD),
    N(0, 2, "Data interpretation", "Sitapur's mustard area is what percentage of its wheat area?",
      "50%", ["33.3%", "40%", "60%", "200%"],
      "140 ÷ 280 = 0.5, so 50%.", stim=DD),
]
