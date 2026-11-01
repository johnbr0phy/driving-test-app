# Numerical Ability: simplification, approximation and number series.
# Every exact answer is asserted. All-number options use N (sorted, locked).
SIMP = "What will come in place of the question mark (?) in the following question?\n\n"
APPROX = "What approximate value will come in place of the question mark (?) in the following question? (You are not expected to calculate the exact value.)\n\n"
SERIES = "What will come in place of the question mark (?) in the following number series?\n\n"
# Mock Test 1
assert 0.35 * 840 + 120 == 414
assert 24 ** 2 - 18 ** 2 == 252
assert 1938 / 34 * 4 == 228
assert round(1295 * 2 / 7 * 3 / 5, 6) == 222
assert 37 ** 2 == 1369 and 37 + 14 * 8 == 149
assert 200 - 0.175 * 480 == 116
assert 13 ** 3 - 2000 == 197
assert 100 - 48 * 25 / 16 == 25
assert 0.4 * 650 + 120 == 380 and round(1260 / 15 * 3) == 252 and 25 * 12 - 100 == 200
assert [5, 13, 29, 61, 125, 253] == [5, 5 * 2 + 3, 13 * 2 + 3, 29 * 2 + 3, 61 * 2 + 3, 125 * 2 + 3]
assert [5, 6, 10, 19, 35, 35 + 25] == [5, 5 + 1, 6 + 4, 10 + 9, 19 + 16, 60]
assert 720 / 6 == 120 and 120 / 5 == 24 and 24 / 4 == 6 and 6 / 3 == 2 and 2 / 2 == 1
assert 12 * 1.5 == 18 and 18 * 1.5 == 27 and 27 * 1.5 == 40.5 and 40.5 * 1.5 == 60.75
# Mock Test 2
assert 0.45 * 620 - 79 == 200
assert 28 ** 2 - 19 ** 2 == 423
assert 2346 / 23 + 48 == 150
assert 2160 * 4 / 9 * 5 / 8 == 600
assert 45 ** 2 == 2025 and 45 * 6 - 3 ** 2 == 261
assert 15 ** 2 + 25 - 0.125 * 1600 == 50
assert 4.5 * 18 + 6.5 * 12 == 159
assert 378 / 14 * 9 == 243
assert 0.6 * 1200 - 280 == 440 and 3600 / 60 + 15 ** 2 == 285 and 18 * 22 + 11 * 8 == 484
assert [3, 7, 19, 55, 163, 487] == [3, 3 * 3 - 2, 7 * 3 - 2, 19 * 3 - 2, 55 * 3 - 2, 163 * 3 - 2]
assert [2, 3, 11, 38, 102, 227] == [2, 2 + 1, 3 + 8, 11 + 27, 38 + 64, 102 + 125]
assert 6 * 0.5 == 3 and 3 * 1 == 3 and 3 * 1.5 == 4.5 and 4.5 * 2 == 9 and 9 * 2.5 == 22.5
assert [15, 23, 39, 63, 95, 135] == [15, 15 + 8, 23 + 16, 39 + 24, 63 + 32, 95 + 40]
# Drill
assert 0.65 * 360 + 0.75 * 96 == 306 and 25 * 32 - 200 == 600
assert [14, 16, 20, 26, 34, 44] == [14, 14 + 2, 16 + 4, 20 + 6, 26 + 8, 34 + 10]
ITEMS = [
    # ---------- Mock Test 1 ----------
    N(1, 1, "Simplification", SIMP + "35% of 840 + 120 = ?", "414", ["404", "424", "394", "434"],
      "35% of 840 = 294, and 294 + 120 = 414."),
    N(1, 1, "Simplification", SIMP + "24² − 18² = ?", "252", ["242", "262", "232", "272"],
      "24² = 576 and 18² = 324, so 576 − 324 = 252. (Or (24 + 18)(24 − 18) = 42 × 6 = 252.)"),
    N(1, 1, "Simplification", SIMP + "1938 ÷ 34 × 4 = ?", "228", ["218", "238", "208", "248"],
      "Work left to right: 1938 ÷ 34 = 57, then 57 × 4 = 228."),
    N(1, 2, "Simplification", SIMP + "3/5 of 2/7 of 1295 = ?", "222", ["212", "232", "202", "242"],
      "2/7 of 1295 = 370, and 3/5 of 370 = 222."),
    N(1, 1, "Simplification", SIMP + "√1369 + 14 × 8 = ?", "149", ["139", "145", "153", "159"],
      "√1369 = 37 and 14 × 8 = 112, so 37 + 112 = 149."),
    N(1, 2, "Simplification", SIMP + "? + 17.5% of 480 = 200", "116", ["106", "126", "112", "120"],
      "17.5% of 480 = 84, so ? = 200 − 84 = 116."),
    N(1, 2, "Simplification", SIMP + "13³ − 2000 = ?", "197", ["187", "207", "193", "217"],
      "13³ = 2197, and 2197 − 2000 = 197."),
    N(1, 2, "Simplification", SIMP + "(48 × 25) ÷ 16 + ? = 100", "25", ["15", "20", "30", "35"],
      "48 × 25 = 1200 and 1200 ÷ 16 = 75, so ? = 100 − 75 = 25."),
    N(1, 2, "Approximation", APPROX + "39.97% of 649.8 + 120.2 = ?", "380", ["340", "360", "400", "420"],
      "Round to 40% of 650 + 120 = 260 + 120 = 380."),
    N(1, 2, "Approximation", APPROX + "1259.9 ÷ 14.97 × 3.02 = ?", "252", ["212", "232", "272", "292"],
      "Round to 1260 ÷ 15 × 3 = 84 × 3 = 252."),
    N(1, 2, "Approximation", APPROX + "√624 × 12.02 − 99.9 = ?", "200", ["160", "180", "220", "240"],
      "√624 is just under √625 = 25. So 25 × 12 − 100 = 300 − 100 = 200."),
    N(1, 1, "Number series", SERIES + "5, 13, 29, 61, 125, ?", "253", ["243", "249", "251", "263"],
      "Each term is double the previous plus 3: 125 × 2 + 3 = 253. (251 comes from adding 1 instead of 3.)", fixed=True),
    N(1, 2, "Number series", SERIES + "5, 6, 10, 19, 35, ?", "60", ["54", "58", "62", "66"],
      "The differences are 1, 4, 9, 16, the squares of 1 to 4. The next difference is 25: 35 + 25 = 60."),
    N(1, 2, "Number series", SERIES + "720, 120, 24, 6, 2, ?", "1", ["0.5", "1.5", "2", "3"],
      "Divide by 6, 5, 4, 3 and then 2: 2 ÷ 2 = 1."),
    N(1, 3, "Number series", SERIES + "12, 18, 27, 40.5, ?", "60.75", ["54", "60", "61.5", "81"],
      "Each term is 1.5 times the previous: 40.5 × 1.5 = 60.75.", fixed=True),

    # ---------- Mock Test 2 ----------
    N(2, 1, "Simplification", SIMP + "45% of 620 − 79 = ?", "200", ["180", "190", "210", "220"],
      "45% of 620 = 279, and 279 − 79 = 200."),
    N(2, 1, "Simplification", SIMP + "28² − 19² = ?", "423", ["403", "413", "433", "443"],
      "28² = 784 and 19² = 361, so 784 − 361 = 423. (Or (28 + 19)(28 − 19) = 47 × 9 = 423.)"),
    N(2, 1, "Simplification", SIMP + "2346 ÷ 23 + 48 = ?", "150", ["140", "148", "152", "160"],
      "2346 ÷ 23 = 102, and 102 + 48 = 150."),
    N(2, 2, "Simplification", SIMP + "5/8 of 4/9 of 2160 = ?", "600", ["540", "560", "640", "660"],
      "4/9 of 2160 = 960, and 5/8 of 960 = 600."),
    N(2, 2, "Simplification", SIMP + "√2025 × 6 − 3² = ?", "261", ["251", "255", "267", "271"],
      "√2025 = 45, 45 × 6 = 270, and 270 − 9 = 261."),
    N(2, 2, "Simplification", SIMP + "12.5% of 1600 + ? = 15² + 25", "50", ["40", "45", "55", "60"],
      "12.5% of 1600 = 200 and 15² + 25 = 250, so ? = 250 − 200 = 50."),
    N(2, 1, "Simplification", SIMP + "4.5 × 18 + 6.5 × 12 = ?", "159", ["149", "153", "163", "169"],
      "4.5 × 18 = 81 and 6.5 × 12 = 78, so 81 + 78 = 159."),
    N(2, 2, "Simplification", SIMP + "? ÷ 14 × 9 = 243", "378", ["358", "368", "388", "398"],
      "? ÷ 14 = 243 ÷ 9 = 27, so ? = 27 × 14 = 378."),
    N(2, 2, "Approximation", APPROX + "59.89% of 1199.7 − 280.1 = ?", "440", ["400", "420", "460", "480"],
      "Round to 60% of 1200 − 280 = 720 − 280 = 440."),
    N(2, 2, "Approximation", APPROX + "3599.8 ÷ 59.9 + 14.98² = ?", "285", ["245", "265", "305", "325"],
      "Round to 3600 ÷ 60 + 15² = 60 + 225 = 285."),
    N(2, 3, "Approximation", APPROX + "17.97 × 22.04 + 11.03 × 7.96 = ?", "484", ["444", "464", "504", "524"],
      "Round to 18 × 22 + 11 × 8 = 396 + 88 = 484."),
    N(2, 2, "Number series", SERIES + "3, 7, 19, 55, 163, ?", "487", ["481", "485", "489", "491"],
      "Each term is three times the previous minus 2: 163 × 3 − 2 = 487."),
    N(2, 3, "Number series", SERIES + "2, 3, 11, 38, 102, ?", "227", ["217", "225", "229", "237"],
      "The differences are 1, 8, 27, 64, the cubes of 1 to 4. The next difference is 125: 102 + 125 = 227."),
    N(2, 2, "Number series", SERIES + "6, 3, 3, 4.5, 9, ?", "22.5", ["18", "20", "24", "27"],
      "Multiply by 0.5, 1, 1.5, 2 and then 2.5: 9 × 2.5 = 22.5."),
    N(2, 1, "Number series", SERIES + "15, 23, 39, 63, 95, ?", "135", ["127", "131", "139", "143"],
      "The differences are 8, 16, 24, 32, rising by 8. The next is 40: 95 + 40 = 135."),

    # ---------- Drill only ----------
    N(0, 1, "Simplification", SIMP + "65% of 360 + 3/4 of 96 = ?", "306", ["286", "296", "316", "326"],
      "65% of 360 = 234 and 3/4 of 96 = 72, so 234 + 72 = 306."),
    N(0, 2, "Approximation", APPROX + "24.98 × 31.97 − 199.9 = ?", "600", ["560", "580", "620", "640"],
      "Round to 25 × 32 − 200 = 800 − 200 = 600."),
    N(0, 1, "Number series", SERIES + "14, 16, 20, 26, 34, ?", "44", ["40", "42", "46", "48"],
      "The differences are 2, 4, 6, 8. The next is 10: 34 + 10 = 44."),
]
