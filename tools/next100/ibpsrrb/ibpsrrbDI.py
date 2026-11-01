# Numerical Ability: data interpretation (tables in stimuli.py).
from fractions import Fraction as Fr
# T1 DI1: crop and tractor loans
crop = {"Rampur": 420, "Sitapur": 360, "Kheda": 480, "Nandgaon": 300, "Bhimtal": 240}
trac = {"Rampur": 60, "Sitapur": 90, "Kheda": 72, "Nandgaon": 45, "Bhimtal": 33}
assert sum(crop.values()) == 1800 and trac["Sitapur"] / crop["Sitapur"] == 0.25
assert sum(trac.values()) / 5 == 60 and Fr(480, 300) == Fr(8, 5)
assert (crop["Rampur"] - crop["Nandgaon"]) / crop["Nandgaon"] == 0.4
# T1 DI2: milk
assert 1500 * 0.40 == 600 and 900 * 0.40 == 360 and 1200 * 0.45 + 800 * 0.75 == 1140
assert (1200 + 900 + 1500 + 800 + 1000) / 5 == 1080 and Fr(int(1000 * 0.48), int(800 * 0.25)) == Fr(12, 5)
# T2 DI1: KCC
rec = {"P": 250, "Q": 320, "R": 180, "S": 400, "T": 150}
app = {"P": 210, "Q": 256, "R": 162, "S": 300, "T": 129}
assert sum(app.values()) == 1057 and app["R"] / rec["R"] == 0.9
assert min(rec, key=lambda b: app[b] / rec[b]) == "S"
assert (rec["Q"] - app["Q"]) + (rec["S"] - app["S"]) == 164 and sum(rec.values()) / 5 == 260
# T2 DI2: wheat
w = {"Alipur": (120, 135, 150), "Belwa": (96, 108, 132), "Chandi": (150, 140, 168), "Dharpur": (84, 102, 90)}
assert sum(v[2] for v in w.values()) == 540 and (132 - 96) / 96 == 0.375 and sum(w["Alipur"]) / 3 == 135
assert Fr(120, 168) == Fr(5, 7) and sum(v[1] for v in w.values()) - sum(v[0] for v in w.values()) == 35
# Drill: self-help groups
assert 45 * 0.8 == 36 and 50 * 0.4 == 20 and 40 + 50 + 36 + 45 + 30 == 201
assert 40 * 0.75 + 50 * 0.6 + 36 * 0.5 + 45 * 0.8 + 30 * 0.7 == 135 and Fr(10, 9) == Fr(40 - 30, 30 - 21)
T1A, T1B, T2A, T2B, DA = "IBPSRRB-T1-DI1", "IBPSRRB-T1-DI2", "IBPSRRB-T2-DI1", "IBPSRRB-T2-DI2", "IBPSRRB-D-DI1"
ITEMS = [
    # ---------- Mock Test 1: loans by branch ----------
    N(1, 1, "Data interpretation", "How many crop loans did the five branches sanction in all?",
      "1800", ["1750", "1850", "1900", "2100"],
      "420 + 360 + 480 + 300 + 240 = 1800.", stim=T1A),
    N(1, 1, "Data interpretation", "Sitapur's tractor loans are what percentage of its crop loans?",
      "25%", ["20%", "22.5%", "30%", "33.33%"],
      "90 ÷ 360 × 100 = 25%.", stim=T1A),
    N(1, 1, "Data interpretation", "What is the average number of tractor loans per branch?",
      "60", ["62", "66", "72", "75"],
      "60 + 90 + 72 + 45 + 33 = 300, and 300 ÷ 5 = 60.", stim=T1A),
    S(1, 2, "Data interpretation", "What is the ratio of Kheda's crop loans to Nandgaon's crop loans?",
      ["8 : 5", "5 : 8", "6 : 5", "8 : 7", "4 : 3"],
      "480 : 300, dividing both by 60, is 8 : 5.", stim=T1A),
    N(1, 2, "Data interpretation", "Rampur's crop loans are what percentage more than Nandgaon's?",
      "40%", ["28.57%", "30%", "35%", "42%"],
      "Rampur sanctioned 120 more crop loans than Nandgaon. 120 ÷ 300 × 100 = 40%. (28.57% measures the gap against Rampur's 420, the wrong base.)", stim=T1A),
    # ---------- Mock Test 1: milk collection ----------
    N(1, 1, "Data interpretation", "How many litres of milk came from cows at centre C?",
      "600", ["640", "675", "720", "900"],
      "40% of 1500 = 600 litres.", stim=T1B),
    N(1, 2, "Data interpretation", "How many litres of milk came from buffaloes at centre B?",
      "360", ["300", "320", "340", "540"],
      "Cows gave 60%, so buffaloes gave 40% of 900 = 360 litres.", stim=T1B),
    N(1, 2, "Data interpretation", "How many litres of milk came from cows at centres A and D together?",
      "1140", ["1040", "1060", "1080", "1100"],
      "A: 45% of 1200 = 540. D: 75% of 800 = 600. Together 1140 litres.", stim=T1B),
    N(1, 1, "Data interpretation", "What is the average total milk collected per centre?",
      "1080", ["1040", "1060", "1100", "1120"],
      "1200 + 900 + 1500 + 800 + 1000 = 5400, and 5400 ÷ 5 = 1080 litres.", stim=T1B),
    S(1, 3, "Data interpretation", "What is the ratio of buffalo milk at centre E to buffalo milk at centre D?",
      ["12 : 5", "13 : 5", "5 : 12", "12 : 7", "26 : 15"],
      "E: 48% of 1000 = 480 litres. D: 25% of 800 = 200 litres. 480 : 200 = 12 : 5.", stim=T1B),

    # ---------- Mock Test 2: Kisan Credit Card applications ----------
    N(2, 1, "Data interpretation", "How many applications were approved at the five branches in all?",
      "1057", ["1027", "1037", "1047", "1067"],
      "210 + 256 + 162 + 300 + 129 = 1057.", stim=T2A),
    N(2, 1, "Data interpretation", "What percentage of the applications received at branch R were approved?",
      "90%", ["84%", "85%", "86%", "88%"],
      "162 ÷ 180 × 100 = 90%.", stim=T2A),
    S(2, 2, "Data interpretation", "Which branch approved the lowest percentage of the applications it received?",
      ["S", "Q", "P", "T", "R"],
      "Approval rates: P 84%, Q 80%, R 90%, S 75%, T 86%. S is lowest even though it approved the most applications.", stim=T2A),
    N(2, 2, "Data interpretation", "How many applications were not approved at branches Q and S together?",
      "164", ["144", "154", "174", "184"],
      "Q: 320 − 256 = 64. S: 400 − 300 = 100. Together 164.", stim=T2A),
    N(2, 1, "Data interpretation", "What is the average number of applications received per branch?",
      "260", ["264", "270", "280", "325"],
      "250 + 320 + 180 + 400 + 150 = 1300, and 1300 ÷ 5 = 260.", stim=T2A),
    # ---------- Mock Test 2: wheat production ----------
    N(2, 1, "Data interpretation", "What was the total wheat production of the four villages in 2025, in tonnes?",
      "540", ["555", "570", "585", "600"],
      "150 + 132 + 168 + 90 = 540 tonnes.", stim=T2B),
    N(2, 2, "Data interpretation", "By what percentage did Belwa's production rise from 2023 to 2025?",
      "37.5%", ["27.27%", "32%", "36%", "40%"],
      "It rose from 96 to 132, by 36 tonnes. 36 ÷ 96 × 100 = 37.5%. (27.27% measures the rise against 132, the wrong base.)", stim=T2B),
    N(2, 1, "Data interpretation", "What was Alipur's average production over the three years, in tonnes?",
      "135", ["125", "130", "132", "138"],
      "120 + 135 + 150 = 405, and 405 ÷ 3 = 135 tonnes.", stim=T2B),
    S(2, 2, "Data interpretation", "What is the ratio of Alipur's production in 2023 to Chandi's production in 2025?",
      ["5 : 7", "4 : 5", "7 : 5", "5 : 6", "6 : 7"],
      "120 : 168, dividing both by 24, is 5 : 7.", stim=T2B),
    N(2, 2, "Data interpretation", "By how many tonnes did the total production of the four villages rise from 2023 to 2024?",
      "35", ["25", "30", "40", "45"],
      "2023 total: 120 + 96 + 150 + 84 = 450. 2024 total: 135 + 108 + 140 + 102 = 485. The rise is 35 tonnes.", stim=T2B),

    # ---------- Drill only: self-help groups ----------
    N(0, 1, "Data interpretation", "How many women are members of the Rose group?",
      "36", ["38", "40", "42", "45"],
      "80% of 45 = 36.", stim=DA),
    N(0, 1, "Data interpretation", "How many men are members of the Jasmine group?",
      "20", ["25", "30", "32", "35"],
      "Women are 60%, so men are 40% of 50 = 20.", stim=DA),
    N(0, 1, "Data interpretation", "How many members do the five groups have in all?",
      "201", ["191", "196", "206", "211"],
      "40 + 50 + 36 + 45 + 30 = 201.", stim=DA),
    N(0, 2, "Data interpretation", "How many women are there in the five groups together?",
      "135", ["115", "120", "125", "130"],
      "Lotus 30, Jasmine 30, Marigold 18, Rose 36 and Tulsi 21 add up to 135.", stim=DA),
    S(0, 2, "Data interpretation", "What is the ratio of men in Lotus to men in Tulsi?",
      ["10 : 9", "9 : 10", "4 : 3", "5 : 4", "10 : 7"],
      "Lotus has 25% of 40 = 10 men and Tulsi 30% of 30 = 9 men, so the ratio is 10 : 9.", stim=DA),
]
