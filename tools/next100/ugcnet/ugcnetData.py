# Unit VII Data Interpretation: five questions on one table per test (the
# tables are in ditables.py). Every key is computed here from TABLES and
# asserted against the option written first.
T1, T2, D1, D2 = TABLES["T1"]["rows"], TABLES["T2"]["rows"], TABLES["D1"]["rows"], TABLES["D2"]["rows"]
S1, S2, SD1, SD2 = "UGCNET-T1-DI", "UGCNET-T2-DI", "UGCNET-D-DI1", "UGCNET-D-DI2"


def fmt(x, nd=1):
    s = f"{x:.{nd}f}"
    return s.rstrip("0").rstrip(".") if "." in s else s


# ---- T1 checks ----
t1_2024 = sum(v[2] for v in T1.values())
assert t1_2024 == 156
t1_rise = {k: (v[3] - v[0]) / v[0] * 100 for k, v in T1.items()}
assert max(t1_rise, key=t1_rise.get) == "History" and round(t1_rise["History"], 1) == 53.3 and t1_rise["Botany"] == 50
t1_phys_avg = sum(T1["Physics"]) / 4
assert t1_phys_avg == 37.5
t1_every_year = [k for k, v in T1.items() if all(b > a for a, b in zip(v, v[1:]))]
assert t1_every_year == ["Physics"]
t1_2025 = sum(v[3] for v in T1.values())
assert t1_2025 == 173 and round(T1["Chemistry"][3] / t1_2025 * 100, 1) == 29.5

# ---- T2 checks ----
col = [sum(v[i] for v in T2.values()) for i in range(3)]
assert col == [1000, 900, 600] and sum(col) == 2500
assert T2["Classroom"][2] / col[2] * 100 == 35
assert sum(T2["Online live"]) == 690
tot2 = {k: sum(v) for k, v in T2.items()}
assert max(tot2, key=tot2.get) == "Online live" and tot2 == {"Classroom": 630, "Online live": 690, "Recorded video": 600, "Blended": 580}
assert (T2["Recorded video"][0], T2["Recorded video"][2]) == (280, 90)  # 28 : 9
assert round(T2["Blended"][1] / col[1] * 100, 1) == 25.6

# ---- D1 checks ----
yr = [sum(v[i] for v in D1.values()) for i in range(5)]
assert yr == [66, 76, 83, 93, 105]
assert sum(D1["Science"]) / 5 == 44.6
inc = [b - a for a, b in zip(yr, yr[1:])]
assert inc == [10, 7, 10, 12]
assert round((D1["Commerce"][4] - D1["Commerce"][0]) / D1["Commerce"][0] * 100, 1) == 77.8
assert sum(D1["Arts"]) == 97 and sum(yr) == 423 and round(97 / 423 * 100) == 23

# ---- D2 checks ----
st = {k: sum(v) for k, v in D2.items()}
assert st == {"Arts": 600, "Commerce": 560, "Science": 630, "Vocational": 210}
assert (D2["Arts"][0], D2["Arts"][1]) == (380, 220)  # 19 : 11
assert round(D2["Science"][0] / st["Science"] * 100) == 46
share_w = {k: v[0] / sum(v) for k, v in D2.items()}
assert max(share_w, key=share_w.get) == "Arts"
assert round(st["Commerce"] / 2000 * 360, 6) == 100.8
assert (D2["Commerce"][1] + D2["Vocational"][1]) - (D2["Commerce"][0] + D2["Vocational"][0]) == 90

ITEMS = [
    # ---------- Practice Test 1 ----------
    S(1, 1, "Totals",
      "What was the total number of research scholars admitted by the five departments in 2024?",
      ["156", "146", "149", "152"],
      "2024: 27 + 45 + 26 + 19 + 39 = 156. 152 comes from misreading Physics as 35.",
      stim=S1),
    S(1, 2, "Percentage change",
      "Which department had the highest percentage increase in admissions from 2022 to 2025?",
      ["History", "Botany", "Chemistry", "Physics"],
      "History rose from 15 to 23, an increase of 8/15 = 53.3%. Botany rose 12/24 = 50%, Physics 9/33 = 27.3% and Chemistry 9/42 = 21.4%. Chemistry had the largest rise in numbers, not in percentage.",
      stim=S1),
    S(1, 1, "Average",
      "What was the average number of scholars admitted per year by the Physics department over the four years?",
      ["37.5", "36", "39", "42"],
      "(33 + 36 + 39 + 42) / 4 = 150 / 4 = 37.5.",
      stim=S1),
    S(1, 2, "Trend",
      "In how many departments did admissions rise every year from 2022 to 2025?",
      ["1", "2", "3", "4"],
      "Only Physics (33, 36, 39, 42) rose every year. Botany fell in 2024, Chemistry and History fell in 2023, and Economics fell in 2025.",
      stim=S1),
    S(1, 3, "Share",
      "Chemistry's share of all scholars admitted in 2025 is closest to:",
      ["29.5%", "24.3%", "34.0%", "51.0%"],
      "The 2025 total is 36 + 51 + 21 + 23 + 42 = 173, and 51 / 173 = 29.5%. 51% treats Chemistry's number as a percentage.",
      stim=S1),
    # ---------- Practice Test 2 ----------
    S(2, 1, "Percentage of a group",
      "What percentage of respondents aged 36 to 50 prefer classroom learning?",
      ["35%", "21%", "30%", "33.3%"],
      "The 36 to 50 group has 210 + 120 + 90 + 180 = 600 respondents, and 210 / 600 = 35%. 33.3% is this group's share of all 630 classroom choosers.",
      stim=S2),
    S(2, 1, "Totals",
      "How many respondents in all prefer online live learning?",
      ["690", "630", "600", "580"],
      "310 + 260 + 120 = 690. The other figures are the totals for classroom, recorded video and blended.",
      stim=S2),
    S(2, 2, "Comparison",
      "Which mode of learning is preferred by the largest number of respondents overall?",
      ["Online live", "Classroom", "Recorded video", "Blended"],
      "Totals: online live 690, classroom 630, recorded video 600, blended 580.",
      stim=S2),
    S(2, 2, "Ratio",
      "What is the ratio of respondents aged 18 to 25 who prefer recorded video to those aged 36 to 50 who prefer it?",
      ["28 : 9", "9 : 28", "14 : 9", "28 : 23"],
      "280 : 90 = 28 : 9. 28 : 23 compares the 18 to 25 and 26 to 35 groups.",
      stim=S2),
    S(2, 3, "Percentage of a group",
      "Respondents aged 26 to 35 who prefer blended learning form what percentage of their age group, to one decimal place?",
      ["25.6%", "23.0%", "39.7%", "31.5%"],
      "The 26 to 35 group has 180 + 260 + 230 + 230 = 900 people, and 230 / 900 = 25.6%. 39.7% is 230 out of all 580 blended choosers.",
      stim=S2),
    # ---------- Drill: journal articles ----------
    S(0, 1, "Totals",
      "How many articles did the four schools publish in 2023?",
      ["83", "93", "87", "85"],
      "21 + 8 + 44 + 10 = 83. 93 is the 2024 total.",
      stim=SD1),
    S(0, 1, "Average",
      "What was the average number of articles per year published by the School of Science?",
      ["44.6", "44", "46.2", "52"],
      "(37 + 41 + 44 + 52 + 49) / 5 = 223 / 5 = 44.6.",
      stim=SD1),
    S(0, 2, "Trend",
      "In which year was the increase in the total number of articles over the previous year the largest?",
      ["2025", "2022", "2023", "2024"],
      "Totals: 66, 76, 83, 93, 105. Increases: 10, 7, 10, 12, so 2025 had the largest rise.",
      stim=SD1),
    S(0, 2, "Percentage change",
      "By what percentage did the School of Commerce's output rise from 2021 to 2025?",
      ["77.8%", "43.8%", "70.0%", "177.8%"],
      "From 9 to 16 is a rise of 7, and 7 / 9 = 77.8%. 43.8% divides by the new value (7 / 16); 177.8% is the new value as a percentage of the old.",
      stim=SD1),
    S(0, 3, "Share",
      "The School of Arts' share of all articles over the five years is closest to:",
      ["23%", "19%", "27%", "31%"],
      "Arts published 14 + 17 + 21 + 19 + 26 = 97 of 66 + 76 + 83 + 93 + 105 = 423 articles, and 97 / 423 = 22.9%.",
      stim=SD1),
    # ---------- Drill: students by stream ----------
    S(0, 1, "Ratio",
      "What is the ratio of women to men in the Arts stream?",
      ["19 : 11", "11 : 19", "38 : 31", "19 : 15"],
      "380 : 220 = 19 : 11 (dividing both by 20).",
      stim=SD2),
    S(0, 2, "Percentage of a group",
      "Women form roughly what percentage of the Science stream?",
      ["46%", "54%", "29%", "32%"],
      "Science has 290 + 340 = 630 students, and 290 / 630 = 46.0%. 54% is the share of men.",
      stim=SD2),
    S(0, 2, "Comparison",
      "In which stream do women make up the largest share of the stream's students?",
      ["Arts", "Science", "Commerce", "Vocational"],
      "Women's shares: Arts 380/600 = 63.3%, Science 290/630 = 46.0%, Commerce 250/560 = 44.6%, Vocational 90/210 = 42.9%.",
      stim=SD2),
    S(0, 3, "Pie chart",
      "If the four stream totals were shown on a pie chart, what would be the central angle, in degrees, for Commerce?",
      ["100.8", "108", "94.5", "113.4"],
      "Commerce has 250 + 310 = 560 of 2,000 students, and 560 / 2000 x 360 = 100.8 degrees. 113.4 is the angle for Science (630).",
      stim=SD2),
    S(0, 2, "Difference",
      "Taking Commerce and Vocational together, how many more men are there than women?",
      ["90", "60", "30", "80"],
      "Men: 310 + 120 = 430. Women: 250 + 90 = 340. 430 - 340 = 90. 60 is the Commerce gap alone, 30 the Vocational gap.",
      stim=SD2),
]
