# Numerical Ability: data interpretation (tables). Every answer asserted.
from fractions import Fraction as Fr
# T1 DI1: accounts opened
JUL = {"Unnao": 160, "Hardoi": 270, "Kanpur": 340, "Banda": 125, "Etah": 225}
AUG = {"Unnao": 200, "Hardoi": 243, "Kanpur": 374, "Banda": 175, "Etah": 252}
assert sum(AUG.values()) == 1244
assert (AUG["Unnao"] - JUL["Unnao"]) / JUL["Unnao"] == 0.25
assert sum(JUL.values()) / 5 == 224
assert Fr(AUG["Banda"], JUL["Etah"]) == Fr(7, 9)
assert max(JUL, key=lambda b: (AUG[b] - JUL[b]) / JUL[b]) == "Banda"
assert (AUG["Hardoi"] - JUL["Hardoi"]) / JUL["Hardoi"] == -0.1
# T1 DI2: loan applications
APPS = {"A": (400, 35), "B": (250, 48), "C": (320, 25), "D": (500, 42), "E": (360, 50)}
approved = {k: n * p // 100 for k, (n, p) in APPS.items()}
rejected = {k: APPS[k][0] - approved[k] for k in APPS}
assert approved == {"A": 140, "B": 120, "C": 80, "D": 210, "E": 180}
assert rejected["C"] == 240 and approved["A"] + approved["E"] == 320 and rejected["B"] - approved["B"] == 10
assert Fr(rejected["A"], rejected["E"]) == Fr(13, 9)
# T2 DI1: bus passengers (hundreds)
R = {"R1": (45, 52, 60), "R2": (36, 40, 47), "R3": (62, 55, 58), "R4": (30, 33, 45)}
assert sum(R["R3"]) == 175
assert sum(v[2] for v in R.values()) / 4 == 52.5
assert (45 - 30) / 30 == 0.5
assert Fr(R["R2"][0], R["R1"][0]) == Fr(4, 5)
assert R["R3"][0] - R["R2"][1] == 22
# T2 DI2: income and expenditure (thousands)
IE = {"Ravi": (48, 36), "Seema": (60, 42), "Tanvir": (55, 44), "Usha": (40, 26), "Vijay": (72, 54)}
sav = {k: i - e for k, (i, e) in IE.items()}
assert max(IE, key=lambda k: sav[k] / IE[k][0]) == "Usha" and sav["Usha"] / 40 == 0.35
assert sum(sav.values()) == 73
assert 44 / 55 == 0.8 and sum(i for i, _ in IE.values()) / 5 == 55
assert Fr(sav["Seema"], sav["Usha"]) == Fr(9, 7)
# Drill: library
assert 120 + 150 + 135 + 165 == 570 and 105 / 240 == 0.4375 and Fr(150, 105) == Fr(10, 7)
T1A, T1B, T2A, T2B, DD = "SBICLK-T1-DI1", "SBICLK-T1-DI2", "SBICLK-T2-DI1", "SBICLK-T2-DI2", "SBICLK-D-DI"
ITEMS = [
    # ---------- Mock Test 1: new accounts ----------
    N(1, 1, "Data interpretation", "How many new savings accounts were opened at the five branches in all in August?",
      "1244", ["1224", "1234", "1254", "1264"],
      "200 + 243 + 374 + 175 + 252 = 1244.", stim=T1A),
    N(1, 1, "Data interpretation", "By what percentage did the number of new accounts at Unnao rise from July to August?",
      "25%", ["20%", "30%", "35%", "40%"],
      "Unnao rose from 160 to 200, an increase of 40. 40 ÷ 160 × 100 = 25%.", stim=T1A),
    N(1, 2, "Data interpretation", "What is the average number of new accounts opened per branch in July?",
      "224", ["214", "220", "228", "234"],
      "July total = 160 + 270 + 340 + 125 + 225 = 1120, and 1120 ÷ 5 = 224.", stim=T1A),
    S(1, 2, "Data interpretation", "What is the ratio of new accounts at Banda in August to new accounts at Etah in July?",
      ["7 : 9", "5 : 9", "7 : 8", "9 : 7", "5 : 7"],
      "Banda in August opened 175 and Etah in July 225. 175 : 225, dividing both by 25, is 7 : 9.", stim=T1A),
    S(1, 3, "Data interpretation", "Which branch had the highest percentage increase in new accounts from July to August?",
      ["Banda", "Unnao", "Kanpur", "Etah", "Hardoi"],
      "Unnao 40/160 = 25%, Kanpur 34/340 = 10%, Banda 50/125 = 40%, Etah 27/225 = 12%. Hardoi fell by 10%. Banda is highest.", stim=T1A),
    # ---------- Mock Test 1: loan applications ----------
    N(1, 1, "Data interpretation", "How many applications were approved at branch D?",
      "210", ["190", "200", "220", "240"],
      "42% of 500 = 210.", stim=T1B),
    N(1, 1, "Data interpretation", "How many applications were rejected at branch C?",
      "240", ["200", "220", "250", "260"],
      "25% of 320 = 80 were approved, so 320 − 80 = 240 were rejected.", stim=T1B),
    N(1, 2, "Data interpretation", "How many applications were approved at branches A and E together?",
      "320", ["300", "310", "330", "340"],
      "A: 35% of 400 = 140. E: 50% of 360 = 180. Together 140 + 180 = 320.", stim=T1B),
    N(1, 2, "Data interpretation", "At branch B, how many more applications were rejected than approved?",
      "10", ["4", "8", "12", "20"],
      "48% of 250 = 120 were approved, so 130 were rejected. 130 − 120 = 10.", stim=T1B),
    S(1, 3, "Data interpretation", "What is the ratio of rejected applications at branch A to rejected applications at branch E?",
      ["13 : 9", "9 : 13", "7 : 5", "13 : 10", "10 : 9"],
      "Rejected at A = 400 − 140 = 260. Rejected at E = 360 − 180 = 180. 260 : 180 = 13 : 9.", stim=T1B),

    # ---------- Mock Test 2: bus passengers ----------
    N(2, 1, "Data interpretation", "How many passengers used route R3 over the three days together?",
      "17,500", ["16,500", "17,000", "18,000", "18,500"],
      "62 + 55 + 58 = 175 hundred, which is 17,500 passengers.", stim=T2A),
    N(2, 2, "Data interpretation", "What was the average number of passengers per route on Wednesday?",
      "5,250", ["4,950", "5,100", "5,400", "5,600"],
      "Wednesday total = 60 + 47 + 58 + 45 = 210 hundred. 210 ÷ 4 = 52.5 hundred, which is 5,250.", stim=T2A),
    N(2, 1, "Data interpretation", "By what percentage did the passengers on route R4 rise from Monday to Wednesday?",
      "50%", ["15%", "33%", "45%", "60%"],
      "R4 rose from 30 to 45 hundred, an increase of 15. 15 ÷ 30 × 100 = 50%.", stim=T2A),
    S(2, 2, "Data interpretation", "What is the ratio of passengers on route R2 to passengers on route R1, both on Monday?",
      ["4 : 5", "5 : 4", "3 : 4", "4 : 3", "6 : 7"],
      "R2 on Monday had 36 and R1 had 45. 36 : 45, dividing both by 9, is 4 : 5.", stim=T2A),
    N(2, 2, "Data interpretation", "By how many passengers did route R3 on Monday exceed route R2 on Tuesday?",
      "2,200", ["1,500", "1,800", "2,000", "2,500"],
      "R3 on Monday had 62 hundred and R2 on Tuesday 40 hundred. 62 − 40 = 22 hundred, which is 2,200.", stim=T2A),
    # ---------- Mock Test 2: income and expenditure ----------
    S(2, 2, "Data interpretation", "Whose savings are the largest percentage of their income?",
      ["Usha", "Seema", "Ravi", "Vijay", "Tanvir"],
      "Savings as a share of income: Ravi 12/48 = 25%, Seema 18/60 = 30%, Tanvir 11/55 = 20%, Usha 14/40 = 35%, Vijay 18/72 = 25%. Usha is highest.", stim=T2B),
    N(2, 1, "Data interpretation", "What are the total monthly savings of all five persons?",
      "₹73,000", ["₹63,000", "₹68,000", "₹78,000", "₹83,000"],
      "Savings are 12, 18, 11, 14 and 18 thousand, which add to 73 thousand: ₹73,000.", stim=T2B),
    N(2, 2, "Data interpretation", "Tanvir's expenditure is what percentage of his income?",
      "80%", ["70%", "75%", "85%", "90%"],
      "44 ÷ 55 × 100 = 80%.", stim=T2B),
    N(2, 1, "Data interpretation", "What is the average monthly income of the five persons?",
      "₹55,000", ["₹52,000", "₹54,000", "₹56,000", "₹58,000"],
      "48 + 60 + 55 + 40 + 72 = 275 thousand, and 275 ÷ 5 = 55 thousand: ₹55,000.", stim=T2B),
    S(2, 2, "Data interpretation", "What is the ratio of Seema's savings to Usha's savings?",
      ["9 : 7", "7 : 9", "3 : 2", "6 : 5", "9 : 8"],
      "Seema saves 60 − 42 = 18 thousand and Usha 40 − 26 = 14 thousand. 18 : 14 = 9 : 7.", stim=T2B),

    # ---------- Drill only: library ----------
    N(0, 1, "Data interpretation", "How many fiction books were issued in the four weeks together?",
      "570", ["550", "560", "580", "590"],
      "120 + 150 + 135 + 165 = 570.", stim=DD),
    N(0, 2, "Data interpretation", "In week 3, what percentage of the books issued were non-fiction?",
      "43.75%", ["40%", "42.5%", "45%", "56.25%"],
      "Week 3 issued 135 + 105 = 240 books. 105 ÷ 240 × 100 = 43.75%.", stim=DD),
    S(0, 2, "Data interpretation", "What is the ratio of fiction books issued in week 2 to non-fiction books issued in week 3?",
      ["10 : 7", "7 : 10", "3 : 2", "5 : 4", "10 : 9"],
      "150 : 105, dividing both by 15, is 10 : 7.", stim=DD),
]
