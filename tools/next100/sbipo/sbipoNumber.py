# Quantitative Aptitude: simplification, approximation, number series and quadratic equations.
# Every exact answer is asserted below; all-number options are sorted and locked (N).
SIMP = "What will come in place of the question mark (?) in the following question?\n\n"
APPROX = "What approximate value will come in place of the question mark (?) in the following question? (You are not expected to calculate the exact value.)\n\n"
SERIES = "What will come in place of the question mark (?) in the following number series?\n\n"
QD = "Two equations, I and II, are given. Solve both and choose the correct relationship between x and y.\n\n"
QUAD = ["x > y", "x < y", "x ≥ y", "x ≤ y", "x = y or no relation can be established"]
assert 0.45 * 840 + 3 / 8 * 960 == 738
assert 18 * 25 / 9 + 7 ** 2 == 99
assert 0.25 * 1200 + 40 * 15 == 900
assert 38 ** 2 == 1444 and 38 * 12 - 200 == 256
assert [9, 19, 39, 79, 159, 319] == [10 * 2 ** k - 1 for k in range(0, 6)]
s = [5]
for k in range(1, 6):
    s.append(s[-1] * k + k)
assert s == [5, 6, 14, 45, 184, 925]
assert 82 + 35 == 117
assert 8 * 0.5 * 1.5 * 2.5 * 3.5 * 4.5 == 236.25
assert 0.64 * 750 + 5 / 6 * 492 == 890
assert 1296 / 36 * 4 - 11 ** 2 == 23
assert 0.6 * 450 + 15 ** 2 == 495
assert 3600 / 24 + 18 * 7 == 276
assert [4, 11, 25, 53, 109, 221] == [7 * 2 ** k - 3 for k in range(6)]
s = [2]
for k in range(1, 6):
    s.append(s[-1] * k + k * k)
assert s == [2, 3, 10, 39, 172, 885]
assert [10, 11, 15, 24, 40, 65] == [10 + sum(k * k for k in range(n)) for n in range(1, 7)]
s = [2]
for k in range(2, 7):
    s.append(s[-1] * k + 1)
assert s == [2, 5, 16, 65, 326, 1957]
assert 7 / 12 * 1080 - 0.35 * 600 == 420
assert [14, 17, 23, 32, 44, 59] == [14 + 3 * k * (k + 1) // 2 for k in range(6)]
ITEMS = [
    # ---------- Mock Test 1 ----------
    N(1, 1, "Simplification", SIMP + "45% of 840 + 3/8 of 960 = ?", "738", ["748", "758", "768", "778"],
      "45% of 840 = 378 and 3/8 of 960 = 360, so the total is 738."),
    N(1, 1, "Simplification", SIMP + "(18 × 25) ÷ 9 + 7² = ?", "99", ["97", "101", "103", "105"],
      "18 × 25 = 450, 450 ÷ 9 = 50, and 50 + 49 = 99."),
    N(1, 2, "Approximation", APPROX + "24.97% of 1,201 + 39.98 × 15.02 = ?", "900", ["960", "1,020", "1,080", "1,140"],
      "Round to 25% of 1,200 = 300 and 40 × 15 = 600. The total is about 900."),
    N(1, 2, "Approximation", APPROX + "√1,443 × 12.03 − 199.9 = ?", "256", ["216", "226", "236", "246"],
      "√1,443 is about 38 (38² = 1,444). 38 × 12 = 456, and 456 − 200 = 256."),
    N(1, 1, "Number series", SERIES + "9, 19, 39, 79, 159, ?", "319", ["309", "313", "317", "318"],
      "Each term is double the previous one plus 1: 159 × 2 + 1 = 319."),
    N(1, 3, "Number series", SERIES + "5, 6, 14, 45, 184, ?", "925", ["905", "910", "915", "920"],
      "The pattern is ×1 + 1, ×2 + 2, ×3 + 3, ×4 + 4, so the next is 184 × 5 + 5 = 925."),
    N(1, 2, "Number series", SERIES + "12, 19, 33, 54, 82, ?", "117", ["110", "113", "121", "124"],
      "The differences are 7, 14, 21, 28, so the next difference is 35 and 82 + 35 = 117."),
    N(1, 2, "Number series", SERIES + "8, 4, 6, 15, 52.5, ?", "236.25", ["157.5", "183.75", "210", "231"],
      "Multiply by 0.5, 1.5, 2.5, 3.5 and then 4.5: 52.5 × 4.5 = 236.25."),
    L(1, 2, "Quadratic equations", QD + "I. x² − 13x + 40 = 0\n\nII. y² − 9y + 14 = 0", QUAD, 4,
      "I: (x − 5)(x − 8) = 0, so x = 5 or 8. II: (y − 2)(y − 7) = 0, so y = 2 or 7. x = 5 is less than 7 but x = 8 is greater than both, so no single relationship holds."),
    L(1, 2, "Quadratic equations", QD + "I. 2x² − 9x + 10 = 0\n\nII. y² − 6y + 9 = 0", QUAD, 1,
      "I: (2x − 5)(x − 2) = 0, so x = 2.5 or 2. II: (y − 3)² = 0, so y = 3. Both values of x are below 3, so x < y."),
    L(1, 3, "Quadratic equations", QD + "I. x² + 12x + 35 = 0\n\nII. y² + 3y − 10 = 0", QUAD, 3,
      "I: (x + 5)(x + 7) = 0, so x = −5 or −7. II: (y + 5)(y − 2) = 0, so y = −5 or 2. Pairs: −5 = −5, −5 < 2, −7 < −5, −7 < 2. So x ≤ y."),
    L(1, 2, "Quadratic equations", QD + "I. x² = 81\n\nII. y² + 18y + 81 = 0", QUAD, 2,
      "I: x = 9 or −9. II: (y + 9)² = 0, so y = −9. x = 9 is greater than −9 and x = −9 equals it, so x ≥ y."),

    # ---------- Mock Test 2 ----------
    N(2, 1, "Simplification", SIMP + "64% of 750 + 5/6 of 492 = ?", "890", ["850", "860", "870", "880"],
      "64% of 750 = 480 and 5/6 of 492 = 410, so the total is 890."),
    N(2, 2, "Simplification", SIMP + "1,296 ÷ 36 × 4 − 11² = ?", "23", ["25", "27", "29", "31"],
      "1,296 ÷ 36 = 36, 36 × 4 = 144, and 144 − 121 = 23."),
    N(2, 2, "Approximation", APPROX + "59.98% of 449.9 + 14.99² = ?", "495", ["435", "455", "475", "515"],
      "Round to 60% of 450 = 270 and 15² = 225. The total is about 495."),
    N(2, 2, "Approximation", APPROX + "3,599.8 ÷ 24.02 + 18.01 × 6.97 = ?", "276", ["256", "266", "296", "316"],
      "Round to 3,600 ÷ 24 = 150 and 18 × 7 = 126. The total is about 276."),
    N(2, 1, "Number series", SERIES + "4, 11, 25, 53, 109, ?", "221", ["211", "215", "217", "219"],
      "Each term is double the previous one plus 3: 109 × 2 + 3 = 221."),
    N(2, 3, "Number series", SERIES + "2, 3, 10, 39, 172, ?", "885", ["845", "855", "865", "875"],
      "The pattern is ×1 + 1², ×2 + 2², ×3 + 3², ×4 + 4², so the next is 172 × 5 + 25 = 885."),
    N(2, 2, "Number series", SERIES + "10, 11, 15, 24, 40, ?", "65", ["66", "69", "72", "74"],
      "The differences are the squares 1, 4, 9, 16, so the next difference is 25 and 40 + 25 = 65."),
    N(2, 2, "Number series", SERIES + "2, 5, 16, 65, 326, ?", "1,957", ["1,630", "1,632", "1,958", "2,282"],
      "Multiply by 2, 3, 4, 5 and then 6, adding 1 each time: 326 × 6 + 1 = 1,957."),
    L(2, 2, "Quadratic equations", QD + "I. x² − 17x + 72 = 0\n\nII. y² − 15y + 56 = 0", QUAD, 2,
      "I: x = 8 or 9. II: y = 7 or 8. Pairs: 8 > 7, 8 = 8, 9 > 7, 9 > 8. So x ≥ y."),
    L(2, 2, "Quadratic equations", QD + "I. x² + 7x + 10 = 0\n\nII. y² + 9y + 20 = 0", QUAD, 4,
      "I: x = −2 or −5. II: y = −4 or −5. x = −2 is greater than both, but x = −5 is less than −4. No single relationship holds."),
    L(2, 3, "Quadratic equations", QD + "I. 3x² + 11x + 6 = 0\n\nII. y² − 4y + 3 = 0", QUAD, 1,
      "I: (3x + 2)(x + 3) = 0, so x = −2/3 or −3. II: (y − 1)(y − 3) = 0, so y = 1 or 3. Both values of x are negative and both values of y positive, so x < y."),
    L(2, 2, "Quadratic equations", QD + "I. x² − 20x + 99 = 0\n\nII. y² − 13y + 40 = 0", QUAD, 0,
      "I: (x − 9)(x − 11) = 0, so x = 9 or 11. II: y = 5 or 8. Every value of x is greater than every value of y, so x > y."),

    # ---------- Drill only ----------
    N(0, 1, "Simplification", SIMP + "7/12 of 1,080 − 35% of 600 = ?", "420", ["380", "390", "400", "410"],
      "7/12 of 1,080 = 630 and 35% of 600 = 210, so the answer is 420."),
    N(0, 1, "Number series", SERIES + "14, 17, 23, 32, 44, ?", "59", ["54", "56", "57", "58"],
      "The differences are 3, 6, 9, 12, so the next difference is 15 and 44 + 15 = 59."),
    L(0, 2, "Quadratic equations", QD + "I. x² − 9 = 0\n\nII. y² − 7y + 12 = 0", QUAD, 3,
      "I: x = 3 or −3. II: y = 3 or 4. x = 3 equals y = 3 and is below 4, and x = −3 is below both. So x ≤ y."),
]
