# Numerical Ability: simplification, approximation and number series.
# Every exact answer is asserted below its item.
SIMP = "What will come in place of the question mark (?) in the following question?\n\n"
APPROX = "What approximate value will come in place of the question mark (?) in the following question? (You are not expected to calculate the exact value.)\n\n"
SERIES = "What will come in place of the question mark (?) in the following number series?\n\n"
assert 0.65 * 720 + 2 / 9 * 810 == 648
assert 456 / 12 * 5 - 64 == 126
assert 27 * 4 + 13 ** 2 == 277 and 27 ** 2 == 729
assert 3 / 8 * 1440 / 15 == 36
assert 1.5 * 84 + 0.25 * 120 == 156
assert 0.25 * 1008 / 14 == 18
assert 18 ** 2 - 15 ** 2 + 7 ** 3 == 442
assert 12 ** 2 + 81 == 0.15 * 1500
assert 0.5 * 800 + 24 * 6 == 544
assert 1200 / 24 + 12 ** 2 == 194
assert 0.45 * 360 + 3 / 7 * 490 == 372
assert 672 / 16 * 3 + 29 == 155
assert 32 + 6 ** 3 - 48 == 200 and 32 ** 2 == 1024
assert 5 / 9 * 1080 - 2 / 3 * 450 == 300
assert round(0.6 * 85 + 1.2 * 45, 6) == 105
assert 0.35 * 960 == 336
assert 23 ** 2 - 17 ** 2 == 240
assert abs(168 / 8 * 6 - 0.28 * 450) < 1e-9
assert 0.75 * 480 + 0.2 * 350 == 430
assert 900 / 30 * 6 == 180
assert 0.125 * 640 + 27 == 107
assert 15 * 12 + 100 / 5 == 200
assert 79 * 2 + 1 == 159 and 103 + 5 ** 3 == 228 and 3 + 1 == 4 and 4 + 8 == 12 and 12 + 27 == 39 and 39 + 64 == 103
ITEMS = [
    # ---------- Mock Test 1 ----------
    S(1, 1, "Simplification", SIMP + "65% of 720 + 2/9 of 810 = ?",
      ["648", "638", "658", "628", "668"],
      "65% of 720 = 468 and 2/9 of 810 = 180, so the total is 648."),
    S(1, 1, "Simplification", SIMP + "456 ÷ 12 × 5 − 64 = ?",
      ["126", "116", "136", "146", "106"],
      "Work left to right for ÷ and ×: 456 ÷ 12 = 38, 38 × 5 = 190, then 190 − 64 = 126."),
    S(1, 1, "Simplification", SIMP + "√729 × 4 + 13² = ?",
      ["277", "267", "287", "297", "257"],
      "√729 = 27, so 27 × 4 = 108. 13² = 169, and 108 + 169 = 277."),
    S(1, 2, "Simplification", SIMP + "(3/8 of 1440) ÷ 15 = ?",
      ["36", "32", "40", "45", "30"],
      "3/8 of 1440 = 540, and 540 ÷ 15 = 36."),
    S(1, 1, "Simplification", SIMP + "1.5 × 84 + 0.25 × 120 = ?",
      ["156", "146", "166", "136", "176"],
      "1.5 × 84 = 126 and 0.25 × 120 = 30, so the total is 156."),
    S(1, 2, "Simplification", SIMP + "? × 14 = 25% of 1008",
      ["18", "16", "21", "24", "14"],
      "25% of 1008 = 252, so ? = 252 ÷ 14 = 18."),
    S(1, 2, "Simplification", SIMP + "18² − 15² + 7³ = ?",
      ["442", "432", "452", "462", "422"],
      "18² = 324 and 15² = 225, a difference of 99. 7³ = 343, and 99 + 343 = 442."),
    S(1, 2, "Simplification", SIMP + "?² + 81 = 15% of 1500",
      ["12", "11", "13", "14", "9"],
      "15% of 1500 = 225, so ?² = 225 − 81 = 144 and ? = 12."),
    S(1, 2, "Approximation", APPROX + "49.98% of 799.9 + 24.03 × 5.98 ≈ ?",
      ["544", "524", "564", "504", "584"],
      "Round to 50% of 800 + 24 × 6 = 400 + 144 = 544."),
    S(1, 2, "Approximation", APPROX + "1199.8 ÷ 24.02 + 11.97² ≈ ?",
      ["194", "184", "204", "174", "214"],
      "Round to 1200 ÷ 24 + 12² = 50 + 144 = 194."),
    S(1, 1, "Number series", SERIES + "4, 9, 19, 39, 79, ?",
      ["159", "157", "161", "149", "169"],
      "Each term is double the previous plus 1: 4 × 2 + 1 = 9, 9 × 2 + 1 = 19, and so on. 79 × 2 + 1 = 159."),
    S(1, 2, "Number series", SERIES + "8, 9, 13, 22, 38, ?",
      ["63", "61", "65", "59", "67"],
      "The differences are the squares 1, 4, 9, 16, so the next is 25. 38 + 25 = 63."),
    S(1, 3, "Number series", SERIES + "64, 32, 32, 48, 96, ?",
      ["240", "192", "224", "256", "288"],
      "The multipliers rise by 0.5: × 0.5, × 1, × 1.5, × 2, so the next is × 2.5. 96 × 2.5 = 240."),
    S(1, 2, "Number series", SERIES + "17, 24, 38, 59, 87, ?",
      ["122", "118", "124", "120", "115"],
      "The differences are 7, 14, 21, 28, multiples of 7, so the next is 35. 87 + 35 = 122."),
    S(1, 2, "Number series", SERIES + "1440, 720, 240, 60, 12, ?",
      ["2", "3", "4", "1", "6"],
      "Divide by 2, 3, 4, 5 in turn, so the next step is ÷ 6. 12 ÷ 6 = 2."),

    # ---------- Mock Test 2 ----------
    S(2, 1, "Simplification", SIMP + "45% of 360 + 3/7 of 490 = ?",
      ["372", "362", "382", "352", "392"],
      "45% of 360 = 162 and 3/7 of 490 = 210, so the total is 372."),
    S(2, 1, "Simplification", SIMP + "672 ÷ 16 × 3 + 29 = ?",
      ["155", "145", "165", "135", "175"],
      "672 ÷ 16 = 42, 42 × 3 = 126, and 126 + 29 = 155."),
    S(2, 1, "Simplification", SIMP + "√1024 + 6³ − 48 = ?",
      ["200", "190", "210", "220", "180"],
      "√1024 = 32 and 6³ = 216, so 32 + 216 − 48 = 200."),
    S(2, 2, "Simplification", SIMP + "5/9 of 1080 − 2/3 of 450 = ?",
      ["300", "280", "320", "350", "250"],
      "5/9 of 1080 = 600 and 2/3 of 450 = 300, so 600 − 300 = 300."),
    S(2, 1, "Simplification", SIMP + "0.6 × 85 + 1.2 × 45 = ?",
      ["105", "95", "115", "101", "109"],
      "0.6 × 85 = 51 and 1.2 × 45 = 54, so the total is 105."),
    S(2, 1, "Simplification", SIMP + "?% of 960 = 336",
      ["35", "32", "38", "30", "40"],
      "? = 336 × 100 ÷ 960 = 35."),
    S(2, 2, "Simplification", SIMP + "23² − 17² = ?",
      ["240", "230", "250", "216", "260"],
      "Use a² − b² = (a + b)(a − b): 40 × 6 = 240. (529 − 289 = 240.)"),
    S(2, 2, "Simplification", SIMP + "? ÷ 8 × 6 = 28% of 450",
      ["168", "162", "172", "156", "180"],
      "28% of 450 = 126, so ? × 6 ÷ 8 = 126 and ? = 126 × 8 ÷ 6 = 168."),
    S(2, 2, "Approximation", APPROX + "74.98% of 480.2 + 19.97% of 349.9 ≈ ?",
      ["430", "410", "450", "390", "470"],
      "Round to 75% of 480 + 20% of 350 = 360 + 70 = 430."),
    S(2, 1, "Approximation", APPROX + "899.7 ÷ 29.96 × 6.03 ≈ ?",
      ["180", "170", "190", "160", "200"],
      "Round to 900 ÷ 30 × 6 = 30 × 6 = 180."),
    S(2, 1, "Number series", SERIES + "9, 10, 14, 23, 39, ?",
      ["64", "62", "66", "60", "68"],
      "The differences are 1, 4, 9, 16, the squares of 1 to 4, so the next is 25. 39 + 25 = 64."),
    S(2, 1, "Number series", SERIES + "11, 13, 17, 19, 23, ?",
      ["29", "25", "27", "31", "26"],
      "These are consecutive prime numbers. The prime after 23 is 29."),
    S(2, 2, "Number series", SERIES + "3, 4, 12, 13, 39, 40, ?",
      ["120", "117", "123", "80", "160"],
      "The steps alternate: + 1, × 3, + 1, × 3, + 1, so the next is × 3. 40 × 3 = 120."),
    S(2, 2, "Number series", SERIES + "6, 9, 15, 27, 51, ?",
      ["99", "97", "101", "96", "102"],
      "The differences double: 3, 6, 12, 24, so the next is 48. 51 + 48 = 99."),
    S(2, 3, "Number series", SERIES + "2, 10, 30, 68, 130, ?",
      ["222", "218", "226", "212", "232"],
      "Each term is n³ + n: 1 + 1, 8 + 2, 27 + 3, 64 + 4, 125 + 5. Next is 216 + 6 = 222."),

    # ---------- Drill only ----------
    S(0, 1, "Simplification", SIMP + "12.5% of 640 + 3³ = ?",
      ["107", "97", "117", "127", "87"],
      "12.5% is 1/8, so 12.5% of 640 = 80. 3³ = 27, and 80 + 27 = 107."),
    S(0, 2, "Number series", SERIES + "3, 4, 12, 39, 103, ?",
      ["228", "218", "226", "232", "238"],
      "The differences are the cubes 1, 8, 27, 64, so the next is 5³ = 125. 103 + 125 = 228."),
    S(0, 1, "Approximation", APPROX + "14.99 × 12.01 + 99.98 ÷ 4.99 ≈ ?",
      ["200", "190", "210", "180", "220"],
      "Round to 15 × 12 + 100 ÷ 5 = 180 + 20 = 200."),
]
