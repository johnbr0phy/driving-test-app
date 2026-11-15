# ISEE Middle Level, Quantitative Reasoning: quantitative comparisons.
# Original items. Each compares a quantity in Column A with one in Column B;
# the four answers are fixed and keep their order (the build adds them):
# A greater, B greater, equal, cannot be determined.


def Q(test, diff, skill, a, b, qc, expl, given=None):
    head = f"{given}\n\n" if given else ""
    stem = f"{head}**Column A:** {a}\n\n**Column B:** {b}\n\nWhich statement is true?"
    return dict(test=test, skill=skill, diff=diff, stem=stem, qc=qc, expl=expl)


ITEMS = [
    # ---------------- Practice Test 1 ----------------
    Q(1, 1, "Fractions and decimals", "3/4", "0.7", "A",
      "3/4 = 0.75, which is greater than 0.7, so the quantity in Column A is greater."),
    Q(1, 1, "Percents", "25% of 80", "80% of 25", "C",
      "25% of 80 is 20, and 80% of 25 is also 20. Swapping the percent and the number gives the same product."),
    Q(1, 1, "Units of time", "The number of days in 3 weeks", "The number of hours in 1 day", "B",
      "3 weeks have 21 days and a day has 24 hours, so Column B is greater."),
    Q(1, 2, "Perimeter", "The perimeter of a square with sides 5 inches long", "The perimeter of a rectangle 4 inches by 6 inches", "C",
      "The square's perimeter is 4 × 5 = 20 inches and the rectangle's is 2 × (4 + 6) = 20 inches, so they are equal."),
    Q(1, 2, "Exponents", "2³", "3²", "B",
      "2³ = 2 × 2 × 2 = 8 and 3² = 3 × 3 = 9, so Column B is greater."),
    Q(1, 2, "Area", "The area of a triangle with a base of 8 cm and a height of 6 cm", "The area of a rectangle 4 cm by 5 cm", "A",
      "The triangle's area is half of 8 × 6, which is 24 square cm; the rectangle's is 20 square cm."),
    Q(1, 3, "Mean and median", "The mean of 2, 4, 6 and 8", "The median of 1, 5 and 9", "C",
      "The mean is 20 ÷ 4 = 5 and the median, the middle value, is 5, so they are equal."),
    Q(1, 3, "Variables", "x²", "x", "D",
      "If x = 0 or x = 1 the two are equal, but if x = 2 then x² = 4 is greater. Different values of x give different results, so the relationship cannot be determined.",
      given="x is a whole number."),
    Q(1, 3, "Variables", "a", "b", "D",
      "a could be 7 and b 3, or a could be 2 and b 8. Knowing only the sum does not tell you which is larger.",
      given="a and b are positive whole numbers, and a + b = 10."),
    # ---------------- Practice Test 2 ----------------
    Q(2, 1, "Fractions and decimals", "0.05", "1/20", "C",
      "1/20 = 5/100 = 0.05, so the quantities are equal."),
    Q(2, 1, "Solid figures", "The number of edges of a cube", "The number of faces of a cube", "A",
      "A cube has 12 edges and 6 faces, so Column A is greater."),
    Q(2, 1, "Fractions of numbers", "3/5 of 40", "2/3 of 33", "A",
      "3/5 of 40 is 24 and 2/3 of 33 is 22, so Column A is greater."),
    Q(2, 2, "Mental math", "7 × 98", "700 - 7", "B",
      "7 × 98 = 7 × 100 - 7 × 2 = 700 - 14 = 686, while 700 - 7 = 693. Column B is greater, and no long multiplication is needed."),
    Q(2, 2, "Negative numbers", "y", "-y", "B",
      "If y is negative, then -y is positive, and any positive number is greater than a negative one.",
      given="y < 0"),
    Q(2, 2, "Probability", "The probability of rolling an even number on a fair six-sided number cube", "The probability that a fair coin lands heads", "C",
      "Three of the six faces are even, so the first probability is 3/6 = 1/2. A coin lands heads with probability 1/2 as well."),
    Q(2, 3, "Primes", "n", "2", "D",
      "The smallest prime is 2, so n could equal 2, but n could also be 3, 5 or any larger prime. It cannot be determined.",
      given="n is a prime number."),
    Q(2, 3, "Angles in a triangle", "x", "25", "A",
      "The angles add to 180°, so x + 2x + 3x = 6x = 180 and x = 30, which is greater than 25.",
      given="The angles of a triangle measure x°, 2x° and 3x°."),
    Q(2, 3, "Numbers between 0 and 1", "m²", "m", "B",
      "Squaring a number between 0 and 1 makes it smaller: for example, (1/2)² = 1/4. So Column B is greater for every such m.",
      given="0 < m < 1"),
    # ---------------- Drill only ----------------
    Q(0, 1, "Percents", "20% of 45", "1/4 of 36", "C",
      "20% of 45 is 45 ÷ 5 = 9, and 1/4 of 36 is 36 ÷ 4 = 9, so the quantities are equal."),
    Q(0, 1, "Units of time", "The number of minutes in 2 hours", "The number of seconds in 2 minutes", "C",
      "2 hours is 120 minutes and 2 minutes is 120 seconds, so they are equal."),
    Q(0, 1, "Integers", "-5 + 8", "-8 + 5", "A",
      "-5 + 8 = 3 and -8 + 5 = -3, so Column A is greater."),
    Q(0, 2, "Square roots and powers", "√49", "2³ - 2", "A",
      "√49 = 7 and 2³ - 2 = 8 - 2 = 6, so Column A is greater."),
    Q(0, 2, "Inequalities", "p - q", "0", "A",
      "If p is greater than q, then p - q is a positive number, which is greater than 0.",
      given="p > q"),
    Q(0, 2, "Primes", "The least prime number greater than 20", "The greatest prime number less than 30", "B",
      "The least prime above 20 is 23 (21 and 22 are not prime) and the greatest below 30 is 29, so Column B is greater."),
    Q(0, 2, "Fractions", "1/2 × 1/3", "1/2 - 1/3", "C",
      "1/2 × 1/3 = 1/6, and 1/2 - 1/3 = 3/6 - 2/6 = 1/6, so they are equal."),
    Q(0, 3, "Variables", "2k", "k", "D",
      "If k = 3, then 2k = 6 is greater; if k = -3, then 2k = -6 is less; if k = 0 they are equal. It cannot be determined.",
      given="k is an integer."),
    Q(0, 3, "Circles", "The circumference of a circle with a radius of 3", "18", "A",
      "The circumference is 2πr = 6π, and π is a little more than 3.14, so 6π is about 18.8, which is greater than 18."),
    Q(0, 3, "Area and perimeter", "The perimeter of the rectangle", "24 units", "D",
      "A 6 by 6 square has an area of 36 and a perimeter of 24, so the two could be equal. A 9 by 4 rectangle also has an area of 36, but its perimeter is 26. Different rectangles give different results, so it cannot be determined.",
      given="A rectangle has an area of 36 square units."),
    Q(0, 3, "Rates", "The average speed of a car that travels 150 miles in 3 hours", "The average speed of a car that travels 120 miles in 2 hours", "B",
      "The first car averages 150 ÷ 3 = 50 miles per hour and the second 120 ÷ 2 = 60 miles per hour, so Column B is greater."),
]
