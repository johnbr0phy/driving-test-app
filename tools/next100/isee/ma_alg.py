# ISEE Middle Level, Mathematics Achievement: algebra (expressions, equations,
# inequalities and patterns, grades 6 and 7). Original items.
D = "\\$"


def M(test, diff, skill, stem, key, wrong, expl, basics=None):
    return dict(test=test, skill=skill, diff=diff, stem=stem, key=key, wrong=wrong, expl=expl, basics=basics)


ITEMS = [
    # ---------------- Practice Test 1 ----------------
    M(1, 1, "One-step and two-step equations", "If 3x + 5 = 20, what is the value of x?",
      "5", ["15", "25/3", "75"],
      "Subtract 5 from both sides to get 3x = 15, then divide by 3: x = 5. Stopping at 15 forgets to divide.",
      basics="solveX"),
    M(1, 1, "Writing expressions", f"A gym charges a {D}20 sign-up fee plus {D}15 a month. Which expression gives the total cost for m months?",
      "20 + 15m", ["15 + 20m", "35m", "20m + 15m"],
      f"The {D}20 is paid once and the {D}15 is paid every month, so the cost is 20 + 15m. Writing 35m charges the sign-up fee every month."),
    M(1, 2, "Evaluating expressions", "What is the value of 2a² - b when a = 3 and b = 4?",
      "14", ["2", "18", "32"],
      "Square first: a² = 9, then 2 × 9 = 18 and 18 - 4 = 14. Squaring 2a instead gives 36 - 4 = 32."),
    M(1, 2, "Simplifying expressions", "Which expression is equivalent to 4(2x - 3) + x?",
      "9x - 12", ["9x - 3", "8x - 11", "6x - 12"],
      "4(2x - 3) = 8x - 12, and adding x gives 9x - 12. Writing 9x - 3 forgets to multiply the 3 by 4."),
    M(1, 3, "Inequalities", "Which inequality shows the solution of 2x - 7 > 5?",
      "x > 6", ["x < 6", "x > -1", "x > 12"],
      "Add 7 to both sides to get 2x > 12, then divide by 2: x > 6. The sign does not flip because the 2 is positive.",
      basics="solveX"),
    M(1, 3, "Proportional relationships", "y is proportional to x, and y = 12 when x = 4. What is y when x = 10?",
      "30", ["14", "18", "22"],
      "y is always 3 times x because 12 ÷ 4 = 3, so y = 3 × 10 = 30. Adding 6 to both numbers gives 18, which is not proportional.",
      basics="ratios"),
    # ---------------- Practice Test 2 ----------------
    M(2, 1, "Two-step equations", "If x/4 - 3 = 2, what is the value of x?",
      "20", ["4", "5", "8"],
      "Add 3 to get x/4 = 5, then multiply by 4: x = 20. Stopping at 5 forgets that x is divided by 4.",
      basics="solveX"),
    M(2, 1, "Patterns", "Each term in a pattern is 3 times the term before it, minus 1. The first term is 2. What is the fourth term?",
      "41", ["14", "23", "40"],
      "The terms are 2, then 3 × 2 - 1 = 5, then 3 × 5 - 1 = 14, then 3 × 14 - 1 = 41. 14 is the third term."),
    M(2, 2, "Slope", "What is the slope of the line through the points (1, 2) and (3, 8)?",
      "3", ["1/3", "2", "6"],
      "Slope is the change in y over the change in x: (8 - 2) ÷ (3 - 1) = 6 ÷ 2 = 3. Flipping the fraction gives 1/3."),
    M(2, 2, "Simplifying expressions", "Which expression is equivalent to 3(x + 4) - 2(x - 1)?",
      "x + 14", ["x + 10", "x + 13", "5x + 10"],
      "3(x + 4) = 3x + 12 and -2(x - 1) = -2x + 2, so the total is x + 14. Getting x + 10 multiplies the -1 by -2 incorrectly, as if it gave -2."),
    M(2, 3, "Square roots", "If n² = 64 and n < 0, what is n?",
      "-8", ["-32", "8", "32"],
      "Both 8 and -8 square to 64, and n must be negative, so n = -8. Dividing 64 by 2 gives 32, which is not a square root."),
    M(2, 3, "Equations from tables", "A table shows x = 1, 2, 3, 4 paired with y = 5, 8, 11, 14. Which equation fits every pair?",
      "y = 3x + 2", ["y = x + 4", "y = 3x + 5", "y = 5x"],
      "y goes up 3 each time x goes up 1, so y = 3x + b, and 5 = 3 × 1 + b gives b = 2. Check: 3 × 4 + 2 = 14. y = x + 4 fits only the first pair."),
    # ---------------- Drill only ----------------
    M(0, 1, "Combining like terms", "Which expression is equivalent to 7a + 3b - 2a + b?",
      "5a + 4b", ["5a + 3b", "9a + 4b", "9ab"],
      "Combine the a terms, 7a - 2a = 5a, and the b terms, 3b + b = 4b. A lone b counts as 1b, so 5a + 3b drops it."),
    M(0, 2, "Translating words", "Which equation means \"twice a number decreased by 7 is 19\"?",
      "2n - 7 = 19", ["7 - 2n = 19", "2(n - 7) = 19", "2n + 7 = 19"],
      "Twice a number is 2n, and decreased by 7 means subtract 7 from it: 2n - 7 = 19. 2(n - 7) would mean the number was decreased first, then doubled."),
    M(0, 2, "Multi-step equations", "If 5 - 2(x + 1) = -7, what is the value of x?",
      "5", ["-5", "2", "6"],
      "Distribute: 5 - 2x - 2 = -7, so 3 - 2x = -7, -2x = -10 and x = 5. Check: 5 - 2(6) = -7.",
      basics="solveX"),
    M(0, 3, "Consecutive integers", "The sum of three consecutive integers is 48. What is the least of them?",
      "15", ["16", "17", "18"],
      "Call them n, n + 1 and n + 2: 3n + 3 = 48, so n = 15, and 15 + 16 + 17 = 48. 16 is the middle one.",
      basics="solveX"),
]
