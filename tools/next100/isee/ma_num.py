# ISEE Middle Level, Mathematics Achievement: numbers and operations (with
# ratios, percents and the number system, grades 6 and 7). Original items.
D = "\\$"


def M(test, diff, skill, stem, key, wrong, expl, basics=None):
    return dict(test=test, skill=skill, diff=diff, stem=stem, key=key, wrong=wrong, expl=expl, basics=basics)


ITEMS = [
    # ---------------- Practice Test 1 ----------------
    M(1, 1, "Greatest common factor", "What is the greatest common factor of 36 and 48?",
      "12", ["3", "4", "6"],
      "36 = 12 × 3 and 48 = 12 × 4, and 3 and 4 share no factor, so 12 is the greatest. 3, 4 and 6 are common factors too, but smaller."),
    M(1, 1, "Integer subtraction", "What is -8 - (-3)?",
      "-5", ["-11", "5", "11"],
      "Subtracting a negative is the same as adding: -8 + 3 = -5. Getting -11 adds the 3 in the wrong direction."),
    M(1, 2, "Adding fractions", "What is 3/4 + 2/3?",
      "1 5/12", ["5/12", "5/7", "1 1/12"],
      "With a common denominator of 12, 9/12 + 8/12 = 17/12 = 1 5/12. Adding tops and bottoms to get 5/7 is the classic mistake.",
      basics="fractionOps"),
    M(1, 2, "Decimals and fractions", "Which fraction is equal to 0.375?",
      "3/8", ["3/5", "5/8", "3/4"],
      "0.375 = 375/1000, and dividing top and bottom by 125 gives 3/8. As a check, 3 ÷ 8 = 0.375.",
      basics="fractionOps"),
    M(1, 2, "Percent discount", f"A shirt costs {D}24 and is on sale for 25% off. What is the sale price?",
      f"{D}18", [f"{D}6", f"{D}19", f"{D}30"],
      f"25% of {D}24 is {D}6, and {D}24 - {D}6 = {D}18. {D}6 is the discount, not the price.",
      basics="percents"),
    M(1, 3, "Dividing decimals", "What is 2.4 ÷ 0.06?",
      "40", ["0.4", "4", "400"],
      "Multiply both numbers by 100 to get 240 ÷ 6 = 40. As a check, 40 × 0.06 = 2.4."),
    # ---------------- Practice Test 2 ----------------
    M(2, 1, "Percents", "What is 2/5 written as a percent?",
      "40%", ["25%", "20%", "52%"],
      "2/5 = 4/10 = 40/100, which is 40%.",
      basics="percents"),
    M(2, 1, "Multiplying decimals", "What is 1.2 × 0.3?",
      "0.36", ["1.5", "3.6", "36"],
      "12 × 3 = 36, and the factors have two decimal places in all, so the product is 0.36. Adding the numbers gives 1.5 instead."),
    M(2, 2, "Subtracting fractions", "What is 5/6 - 1/4?",
      "7/12", ["1/2", "2/3", "2"],
      "With a common denominator of 12, 10/12 - 3/12 = 7/12. Subtracting tops and bottoms separately gives 4/2 = 2, which is the common mistake.",
      basics="fractionOps"),
    M(2, 2, "Integer operations", "What is (-6) × (-4) ÷ 3?",
      "8", ["-8", "6", "72"],
      "A negative times a negative is positive, so (-6) × (-4) = 24, and 24 ÷ 3 = 8."),
    M(2, 2, "Ratios", "The ratio of boys to girls in a class is 4 to 5. There are 36 students. How many are girls?",
      "20", ["4", "9", "16"],
      "Each group of 4 boys and 5 girls has 9 students, and 36 ÷ 9 = 4 groups, so there are 4 × 5 = 20 girls. 16 is the number of boys.",
      basics="ratios"),
    M(2, 3, "Ordering rational numbers", "Which number is the greatest?",
      "-1/3", ["-0.5", "-0.45", "-2/5"],
      "As decimals the numbers are -0.5, -0.45, -0.4 and about -0.33. The one closest to zero, -1/3, is the greatest."),
    # ---------------- Drill only ----------------
    M(0, 1, "Fraction of a number", "What is 3/8 of 64?",
      "24", ["3", "8", "16"],
      "64 ÷ 8 = 8, and 3 × 8 = 24. The value 8 is only one eighth.",
      basics="fractionOps"),
    M(0, 1, "Absolute value", "What is |-7| + |3|?",
      "10", ["-10", "-4", "4"],
      "The absolute value of a number is its distance from 0, so |-7| = 7 and |3| = 3, and 7 + 3 = 10."),
    M(0, 2, "Mixed numbers", "Which improper fraction is equal to 3 2/5?",
      "17/5", ["6/5", "11/5", "32/5"],
      "3 wholes are 15 fifths, and 15 + 2 = 17, so 3 2/5 = 17/5. Writing the digits side by side as 32/5 is a common slip.",
      basics="fractionOps"),
    M(0, 3, "Percent increase", f"The price of a game rose from {D}40 to {D}50. What was the percent increase?",
      "25%", ["10%", "20%", "50%"],
      f"The increase is {D}10, and {D}10 out of the original {D}40 is 1/4, or 25%. Dividing by the new price, {D}50, gives 20% instead.",
      basics="percents"),
]
