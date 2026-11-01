# Numerical Ability: simplification, approximation and number series.
# Every exact answer is asserted. All-number options are sorted and locked (N).
SIMP = "What will come in place of the question mark (?) in the following question?\n\n"
APPROX = "What approximate value will come in place of the question mark (?) in the following question? (You are not expected to calculate the exact value.)\n\n"
SERIES = "What will come in place of the question mark (?) in the following number series?\n\n"
# Mock Test 1
assert 0.35 * 760 + 3 / 5 * 455 == 539
assert 924 / 28 * 6 - 75 == 123
assert 36 ** 2 == 1296 and 36 * 7 - 15 ** 2 == 27
assert 0.275 * 640 == 176
assert round(2.4 * 65 + 0.6 * 85, 6) == 207
assert 19 ** 2 + 21 ** 2 - 400 == 402
assert 5 / 6 * 1080 / 12 == 75
assert 6 ** 3 + 144 == 0.3 * 1200
assert 0.45 * 1200 + 15 * 9 == 675
assert 2016 / 48 + 13 ** 2 == 211
assert 30 * 8 + 60 == 300 and abs(899 ** 0.5 * 7.98 + 60.1 - 300) < 1
s = [8]
for _ in range(5):
    s.append(s[-1] * 2 + 1)
assert s == [8, 17, 35, 71, 143, 287]
assert [12 + sum(k * k for k in range(1, n + 1)) for n in range(6)] == [12, 13, 17, 26, 42, 67]
assert 5040 / 2 / 3 / 4 / 5 / 6 == 7
s = [2]
for k in range(1, 6):
    s.append(s[-1] * k + k)
assert s == [2, 3, 8, 27, 112, 565]
assert [18 + 9 * (2 ** n - 1) for n in range(6)] == [18, 27, 45, 81, 153, 297]
# Mock Test 2
assert 0.45 * 680 + 4 / 7 * 588 == 642
assert 1008 / 36 * 9 - 110 == 142
assert 42 ** 2 == 1764 and 42 * 5 + 11 ** 2 == 331
assert 0.18 * 1300 == 234
assert 3.5 * 48 - 1.25 * 64 == 88
assert 24 ** 2 - 16 ** 2 + 4 ** 3 == 384
assert 7 / 12 * 1296 / 27 == 28
assert 23 ** 2 - 89 == round(0.55 * 800, 6)
assert round(0.65 * 880 - 12 * 15, 6) == 392
assert 3360 / 42 + 9 ** 2 == 161
assert 38 ** 2 == 1444 and 38 * 6 + 50 == 278
s = [6]
for _ in range(5):
    s.append(s[-1] * 2 + 1)
assert s == [6, 13, 27, 55, 111, 223]
assert [21 + sum(k ** 3 for k in range(1, n + 1)) for n in range(6)] == [21, 22, 30, 57, 121, 246]
s = [7]
for k in range(2, 7):
    s.append(s[-1] * k)
assert s == [7, 14, 42, 168, 840, 5040]
s = [4]
for k in range(1, 6):
    s.append(s[-1] * k + k + 1)
assert s == [4, 6, 15, 49, 201, 1011]
assert [100 - sum(k * k for k in range(1, n + 1)) for n in range(6)] == [100, 99, 95, 86, 70, 45]
# Drill only
assert 0.55 * 460 + 2 / 9 * 1170 == 513
assert 1350 / 45 * 8 + 37 == 277
assert 45 ** 2 == 2025 and 45 * 6 - 6 ** 3 == 54
assert 0.75 * 1280 - 18 ** 2 == 636
s = [9]
for _ in range(5):
    s.append(s[-1] * 2 - 1)
assert s == [9, 17, 33, 65, 129, 257]
assert [3, 3 + 2, (3 + 2) * 2, (3 + 2) * 2 + 2, ((3 + 2) * 2 + 2) * 2, ((3 + 2) * 2 + 2) * 2 + 2, (((3 + 2) * 2 + 2) * 2 + 2) * 2] == [3, 5, 10, 12, 24, 26, 52]
ITEMS = [
    # ---------- Mock Test 1 ----------
    N(1, 1, "Simplification", SIMP + "35% of 760 + 3/5 of 455 = ?",
      "539", ["549", "559", "569", "579"],
      "35% of 760 = 266 and 3/5 of 455 = 273, so the total is 539."),
    N(1, 1, "Simplification", SIMP + "924 ÷ 28 × 6 − 75 = ?",
      "123", ["93", "103", "113", "133"],
      "Work left to right for ÷ and ×: 924 ÷ 28 = 33, 33 × 6 = 198, and 198 − 75 = 123."),
    N(1, 2, "Simplification", SIMP + "√1296 × 7 − 15² = ?",
      "27", ["22", "32", "37", "42"],
      "√1296 = 36 and 36 × 7 = 252. 15² = 225, and 252 − 225 = 27."),
    N(1, 2, "Simplification", SIMP + "?% of 640 = 176",
      "27.5", ["17.5", "20", "22.5", "25"],
      "? = 176 ÷ 640 × 100 = 27.5."),
    N(1, 1, "Simplification", SIMP + "2.4 × 65 + 0.6 × 85 = ?",
      "207", ["187", "197", "217", "227"],
      "2.4 × 65 = 156 and 0.6 × 85 = 51, so the total is 207."),
    N(1, 2, "Simplification", SIMP + "19² + 21² − 400 = ?",
      "402", ["372", "382", "392", "412"],
      "19² = 361 and 21² = 441, which add to 802. 802 − 400 = 402."),
    N(1, 2, "Simplification", SIMP + "(5/6 of 1080) ÷ 12 = ?",
      "75", ["80", "85", "90", "95"],
      "5/6 of 1080 = 900, and 900 ÷ 12 = 75."),
    N(1, 2, "Simplification", SIMP + "?³ + 144 = 30% of 1200",
      "6", ["2", "3", "4", "5"],
      "30% of 1200 = 360, so ?³ = 360 − 144 = 216 and ? = 6."),
    N(1, 2, "Approximation", APPROX + "44.97% of 1199.8 + 15.02 × 8.99 ≈ ?",
      "675", ["660", "690", "705", "720"],
      "Round to 45% of 1200 + 15 × 9 = 540 + 135 = 675."),
    N(1, 2, "Approximation", APPROX + "2015.9 ÷ 47.98 + 13.03² ≈ ?",
      "211", ["221", "231", "241", "251"],
      "Round to 2016 ÷ 48 + 13² = 42 + 169 = 211."),
    N(1, 2, "Approximation", APPROX + "√899 × 7.98 + 60.1 ≈ ?",
      "300", ["260", "270", "280", "290"],
      "√899 is just under 30, so round to 30 × 8 + 60 = 240 + 60 = 300."),
    N(1, 1, "Number series", SERIES + "8, 17, 35, 71, 143, ?",
      "287", ["279", "285", "286", "289"],
      "Each term is double the previous one plus 1: 143 × 2 + 1 = 287."),
    N(1, 2, "Number series", SERIES + "12, 13, 17, 26, 42, ?",
      "67", ["68", "71", "73", "76"],
      "The differences are 1, 4, 9 and 16, the squares of 1 to 4. The next difference is 25, so 42 + 25 = 67."),
    N(1, 2, "Number series", SERIES + "5040, 2520, 840, 210, 42, ?",
      "7", ["6", "8", "10", "14"],
      "Each term is divided by 2, 3, 4 and 5 in turn. The next division is by 6: 42 ÷ 6 = 7."),
    N(1, 3, "Number series", SERIES + "2, 3, 8, 27, 112, ?",
      "565", ["448", "555", "560", "561"],
      "The pattern is × 1 + 1, × 2 + 2, × 3 + 3, × 4 + 4. Next is 112 × 5 + 5 = 565."),
    N(1, 2, "Number series", SERIES + "18, 27, 45, 81, 153, ?",
      "297", ["306", "315", "333", "369"],
      "The differences are 9, 18, 36 and 72, doubling each time. The next difference is 144, so 153 + 144 = 297."),

    # ---------- Mock Test 2 ----------
    N(2, 1, "Simplification", SIMP + "45% of 680 + 4/7 of 588 = ?",
      "642", ["632", "652", "662", "672"],
      "45% of 680 = 306 and 4/7 of 588 = 336, so the total is 642."),
    N(2, 1, "Simplification", SIMP + "1008 ÷ 36 × 9 − 110 = ?",
      "142", ["102", "112", "122", "132"],
      "Work left to right for ÷ and ×: 1008 ÷ 36 = 28, 28 × 9 = 252, and 252 − 110 = 142."),
    N(2, 2, "Simplification", SIMP + "√1764 × 5 + 11² = ?",
      "331", ["311", "321", "341", "351"],
      "√1764 = 42 and 42 × 5 = 210. 11² = 121, and 210 + 121 = 331."),
    N(2, 2, "Simplification", SIMP + "18% of ? = 234",
      "1300", ["1000", "1100", "1200", "1400"],
      "? = 234 ÷ 0.18 = 1300."),
    N(2, 1, "Simplification", SIMP + "3.5 × 48 − 1.25 × 64 = ?",
      "88", ["78", "84", "92", "98"],
      "3.5 × 48 = 168 and 1.25 × 64 = 80, so the difference is 88."),
    N(2, 2, "Simplification", SIMP + "24² − 16² + 4³ = ?",
      "384", ["394", "404", "414", "424"],
      "24² = 576 and 16² = 256, a difference of 320. 4³ = 64, and 320 + 64 = 384."),
    N(2, 2, "Simplification", SIMP + "(7/12 of 1296) ÷ 27 = ?",
      "28", ["20", "22", "24", "26"],
      "7/12 of 1296 = 756, and 756 ÷ 27 = 28."),
    N(2, 3, "Simplification", SIMP + "?² − 89 = 55% of 800",
      "23", ["21", "25", "27", "29"],
      "55% of 800 = 440, so ?² = 440 + 89 = 529 and ? = 23."),
    N(2, 2, "Approximation", APPROX + "64.98% of 879.9 − 12.03 × 14.97 ≈ ?",
      "392", ["407", "422", "437", "452"],
      "Round to 65% of 880 − 12 × 15 = 572 − 180 = 392."),
    N(2, 2, "Approximation", APPROX + "3359.8 ÷ 41.99 + 8.97² ≈ ?",
      "161", ["131", "141", "151", "171"],
      "Round to 3360 ÷ 42 + 9² = 80 + 81 = 161."),
    N(2, 2, "Approximation", APPROX + "√1443 × 6.02 + 49.9 ≈ ?",
      "278", ["268", "288", "298", "308"],
      "√1443 is just under 38, so round to 38 × 6 + 50 = 228 + 50 = 278."),
    N(2, 1, "Number series", SERIES + "6, 13, 27, 55, 111, ?",
      "223", ["224", "225", "227", "233"],
      "Each term is double the previous one plus 1: 111 × 2 + 1 = 223."),
    N(2, 3, "Number series", SERIES + "21, 22, 30, 57, 121, ?",
      "246", ["185", "221", "242", "250"],
      "The differences are 1, 8, 27 and 64, the cubes of 1 to 4. The next difference is 125, so 121 + 125 = 246."),
    N(2, 1, "Number series", SERIES + "7, 14, 42, 168, 840, ?",
      "5040", ["1680", "3360", "4200", "4480"],
      "Each term is multiplied by 2, 3, 4 and 5 in turn. The next multiplier is 6: 840 × 6 = 5040."),
    N(2, 3, "Number series", SERIES + "4, 6, 15, 49, 201, ?",
      "1011", ["1010", "1012", "1016", "1206"],
      "The pattern is × 1 + 2, × 2 + 3, × 3 + 4, × 4 + 5. Next is 201 × 5 + 6 = 1011."),
    N(2, 2, "Number series", SERIES + "100, 99, 95, 86, 70, ?",
      "45", ["40", "44", "46", "50"],
      "The differences are −1, −4, −9 and −16, minus the squares of 1 to 4. The next is −25, so 70 − 25 = 45."),

    # ---------- Drill only ----------
    N(0, 1, "Simplification", SIMP + "55% of 460 + 2/9 of 1170 = ?",
      "513", ["473", "483", "493", "503"],
      "55% of 460 = 253 and 2/9 of 1170 = 260, so the total is 513."),
    N(0, 1, "Simplification", SIMP + "1350 ÷ 45 × 8 + 37 = ?",
      "277", ["257", "267", "287", "297"],
      "1350 ÷ 45 = 30, 30 × 8 = 240, and 240 + 37 = 277."),
    N(0, 2, "Simplification", SIMP + "√2025 × 6 − 6³ = ?",
      "54", ["44", "48", "60", "64"],
      "√2025 = 45 and 45 × 6 = 270. 6³ = 216, and 270 − 216 = 54."),
    N(0, 2, "Approximation", APPROX + "74.95% of 1279.8 − 18.02² ≈ ?",
      "636", ["576", "596", "616", "656"],
      "Round to 75% of 1280 − 18² = 960 − 324 = 636."),
    N(0, 1, "Number series", SERIES + "9, 17, 33, 65, 129, ?",
      "257", ["258", "259", "263", "265"],
      "Each term is double the previous one minus 1: 129 × 2 − 1 = 257."),
    N(0, 2, "Number series", SERIES + "3, 5, 10, 12, 24, 26, ?",
      "52", ["28", "48", "50", "54"],
      "The steps alternate + 2 and × 2: 26 × 2 = 52."),
]
