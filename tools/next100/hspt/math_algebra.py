# HSPT Mathematics: algebra (equations, expressions, inequalities, coordinates). Original items.
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Two-step equations", diff=1,
       stem="If 3x + 7 = 25, what is the value of x?",
       key="6", wrong=["8", "9", "18"],
       expl="Subtract 7 from both sides to get 3x = 18, then divide by 3: x = 6. Stopping at 18 forgets to divide."),
  dict(test=1, skill="Evaluating expressions", diff=2,
       stem="What is the value of 2a² - b when a = 3 and b = 4?",
       key="14", wrong=["8", "22", "32"],
       expl="Square first: a² = 9, so 2a² = 18, and 18 - 4 = 14. Doubling before squaring gives (2 × 3)² - 4 = 32."),
  dict(test=1, skill="Writing inequalities", diff=2,
       stem="Which inequality says that a number n is at least 12?",
       key="n ≥ 12", wrong=["n > 12", "n ≤ 12", "n < 12"],
       expl="At least 12 means 12 or more, so n can equal 12: n ≥ 12. The symbol > would leave out 12 itself."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Equations with parentheses", diff=2,
       stem="If 5(n - 2) = 35, what is the value of n?",
       key="9", wrong=["5", "7", "7.4"],
       expl="Divide both sides by 5 to get n - 2 = 7, so n = 9. Stopping at 7 forgets to add the 2 back."),
  dict(test=2, skill="Slope", diff=3,
       stem="What is the slope of the line through the points (1, 2) and (3, 8)?",
       key="3", wrong=["1/3", "2", "6"],
       expl="Slope = change in y ÷ change in x = (8 - 2) ÷ (3 - 1) = 6 ÷ 2 = 3. Dividing the other way gives 1/3."),
  dict(test=2, skill="Combining like terms", diff=1,
       stem="Which expression is equal to 4x + 3y - x + 2y?",
       key="3x + 5y", wrong=["5x + 5y", "3x + y", "4x + 5y"],
       expl="Combine the x terms (4x - x = 3x) and the y terms (3y + 2y = 5y) to get 3x + 5y."),

  # ---------------- Drill only ----------------
  dict(test=0, skill="Equations with fractions", diff=2,
       stem="If y/4 - 3 = 2, what is the value of y?",
       key="20", wrong=["-4", "5", "8"],
       expl="Add 3 to both sides to get y/4 = 5, then multiply by 4: y = 20. Stopping at 5 forgets to multiply."),
]
