# Non-calculator numeracy (napNonCalc): the short section at the start of the
# real Year 9 numeracy test. Arithmetic fluency, no calculator.

# ---------- Test 1 ----------
at(1, 1)
N("What is $\\frac{3}{4} + \\frac{1}{6}$? Give your answer as a fraction.",
  ["11/12"],
  "Use the common denominator 12: $\\frac{9}{12} + \\frac{2}{12} = \\frac{11}{12}$. Adding tops and bottoms ($\\frac{4}{10}$) is the usual slip.",
  d=2, skill="Adding fractions")
N("What is $0.6 \\times 0.4$?",
  ["0.24", ".24"],
  "$6 \\times 4 = 24$, and there are two decimal places in the question, so the answer is 0.24.",
  d=1, skill="Multiplying decimals")
S("What is $-7 + 3 \\times (-2)$?",
  "$-13$", ["$8$", "$-1$", "$1$"],
  "Multiply first: $3 \\times (-2) = -6$. Then $-7 + (-6) = -13$. Working left to right gives $(-4) \\times (-2) = 8$, which ignores the order of operations.",
  d=2, skill="Integers and order of operations")
N("What is 15% of 240?",
  ["36"],
  "10% of 240 is 24 and 5% is 12, so 15% is $24 + 12 = 36$.",
  d=1, skill="Percentage of a quantity")
S("Which is closest to $49.8 \\times 20.3$?",
  "1000", ["100", "700", "10 000"],
  "Round to $50 \\times 20 = 1000$.",
  d=1, skill="Estimation")
N("What is $2^3 \\times 3^2$?",
  ["72"],
  "$2^3 = 8$ and $3^2 = 9$, and $8 \\times 9 = 72$.",
  d=2, skill="Powers")

# ---------- Test 2 ----------
at(2, 1)
N("What is $2\\frac{1}{2} \\times \\frac{2}{5}$?",
  ["1"],
  "$2\\frac{1}{2} = \\frac{5}{2}$, and $\\frac{5}{2} \\times \\frac{2}{5} = 1$.",
  d=2, skill="Multiplying fractions")
N("What is $3.2 \\div 0.04$?",
  ["80"],
  "Multiply both numbers by 100: $320 \\div 4 = 80$.",
  d=2, skill="Dividing decimals")
S("What is $(-3)^2 - 4^2$?",
  "$-7$", ["$25$", "$7$", "$-25$"],
  "$(-3)^2 = 9$ and $4^2 = 16$, so $9 - 16 = -7$.",
  d=2, skill="Integers and powers")
N("A shirt costs \\$40. It is reduced by 25%. What is the new price, in dollars?",
  ["30", "30.00"],
  "25% of \\$40 is \\$10, so the new price is \\$30.",
  d=1, skill="Discounts")
S("Which fraction is the largest?",
  "$\\frac{5}{8}$", ["$\\frac{3}{5}$", "$\\frac{7}{12}$", "$\\frac{1}{2}$"],
  "As decimals: $\\frac{5}{8} = 0.625$, $\\frac{3}{5} = 0.6$, $\\frac{7}{12} \\approx 0.583$, $\\frac{1}{2} = 0.5$.",
  d=2, skill="Comparing fractions")
N("What is $\\sqrt{144} + \\sqrt{25}$?",
  ["17"],
  "$\\sqrt{144} = 12$ and $\\sqrt{25} = 5$, so the sum is 17.",
  d=1, skill="Square roots")

# ---------- Drill only ----------
at(0)
N("What is $\\frac{2}{3} - \\frac{1}{4}$? Give your answer as a fraction.",
  ["5/12"],
  "Common denominator 12: $\\frac{8}{12} - \\frac{3}{12} = \\frac{5}{12}$.",
  d=2, skill="Subtracting fractions")
N("What is $1.5 \\times 400$?",
  ["600"],
  "$1.5 \\times 400 = 400 + 200 = 600$.",
  d=1, skill="Multiplying decimals")
N("What is 20% of 85?",
  ["17"],
  "10% of 85 is 8.5, so 20% is 17.",
  d=1, skill="Percentage of a quantity")
S("What is $-12 \\div (-3) - 5$?",
  "$-1$", ["$9$", "$-9$", "$1$"],
  "Divide first: $-12 \\div (-3) = 4$ (two negatives give a positive). Then $4 - 5 = -1$.",
  d=2, skill="Integers")
N("What is $8 + 12 \\div 4 \\times 2$?",
  ["14"],
  "Divide and multiply left to right before adding: $12 \\div 4 = 3$, $3 \\times 2 = 6$, then $8 + 6 = 14$.",
  d=2, skill="Order of operations")
N("Write $\\frac{3}{8}$ as a decimal.",
  ["0.375", ".375"],
  "$\\frac{1}{8} = 0.125$, so $\\frac{3}{8} = 0.375$.",
  d=2, skill="Fractions to decimals")
N("What is $4.5 + 0.75$?",
  ["5.25"],
  "Line up the decimal points: $4.50 + 0.75 = 5.25$.",
  d=1, skill="Adding decimals")
S("Which is closest to $\\frac{398}{41}$?",
  "10", ["1", "100", "40"],
  "Round to $\\frac{400}{40} = 10$.",
  d=1, skill="Estimation")
N("What is $5^2 - 2^4$?",
  ["9"],
  "$5^2 = 25$ and $2^4 = 16$, so $25 - 16 = 9$.",
  d=2, skill="Powers")
N("A recipe uses 3 eggs for every 2 cups of flour. How many eggs are needed for 8 cups of flour?",
  ["12"],
  "8 cups is 4 lots of 2 cups, so $4 \\times 3 = 12$ eggs.",
  d=1, skill="Ratio")
N("What is 0.3 as a percentage? Type the number only.",
  ["30"],
  "Multiply by 100: $0.3 \\times 100 = 30$, so 30%.",
  d=1, skill="Decimals to percentages")
S("Which is equal to $\\frac{18}{24}$?",
  "$\\frac{3}{4}$", ["$\\frac{2}{3}$", "$\\frac{6}{9}$", "$\\frac{9}{16}$"],
  "Divide top and bottom by 6: $\\frac{18}{24} = \\frac{3}{4}$.",
  d=1, skill="Simplifying fractions")
N("What is $-4 \\times (-5) \\times (-1)$?",
  ["-20"],
  "$-4 \\times (-5) = 20$, and $20 \\times (-1) = -20$. An odd number of negative factors gives a negative answer.",
  d=2, skill="Integers")
N("What is $\\frac{3}{5}$ of 45?",
  ["27"],
  "$\\frac{1}{5}$ of 45 is 9, so $\\frac{3}{5}$ is $3 \\times 9 = 27$.",
  d=1, skill="Fraction of a quantity")
N("What is $7.2 \\div 9$?",
  ["0.8", ".8"],
  "$72 \\div 9 = 8$, so $7.2 \\div 9 = 0.8$.",
  d=2, skill="Dividing decimals")
S("Which number is between $\\frac{1}{3}$ and $\\frac{1}{2}$?",
  "$0.4$", ["$0.3$", "$0.55$", "$0.25$"],
  "$\\frac{1}{3} \\approx 0.333$ and $\\frac{1}{2} = 0.5$. Only 0.4 is between them.",
  d=2, skill="Ordering numbers")
