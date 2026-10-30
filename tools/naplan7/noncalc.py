# Non-calculator numeracy (nap7NonCalc): the short section at the start of the
# real Year 7 numeracy test. Arithmetic fluency, no calculator.

# ---------- Test 1 ----------
at(1, 1)
N("What is $\\frac{3}{5} + \\frac{1}{10}$? Give your answer as a fraction.",
  ["7/10", "0.7", ".7"],
  "Use the common denominator 10: $\\frac{6}{10} + \\frac{1}{10} = \\frac{7}{10}$. Adding tops and bottoms gives $\\frac{4}{15}$, which is the usual slip.",
  d=1, skill="Adding fractions")
N("What is $0.3 \\times 0.2$?",
  ["0.06", ".06"],
  "$3 \\times 2 = 6$, and there are two decimal places in the question, so the answer is 0.06.",
  d=2, skill="Multiplying decimals")
S("What is $-5 + 8 \\div (-2)$?",
  "$-9$", ["$-1.5$", "$-1$", "$9$"],
  "Divide first: $8 \\div (-2) = -4$. Then $-5 + (-4) = -9$. Working left to right gives $3 \\div (-2) = -1.5$, which ignores the order of operations.",
  d=2, skill="Integers and order of operations")
N("What is 15% of 260?",
  ["39"],
  "10% of 260 is 26 and 5% is half of that, 13. So 15% is $26 + 13 = 39$.",
  d=1, skill="Percentage of a quantity")
S("Which is closest to $398 \\times 21$?",
  "8000", ["800", "6000", "80 000"],
  "Round to $400 \\times 20 = 8000$.",
  d=1, skill="Estimation")
N("What is $4^2 - 2^3$?",
  ["8"],
  "$4^2 = 16$ and $2^3 = 8$, so $16 - 8 = 8$. Note that $2^3$ means $2 \\times 2 \\times 2$, not $2 \\times 3$.",
  d=2, skill="Powers")

# ---------- Test 2 ----------
at(2, 1)
N("What is $\\frac{2}{3}$ of 48?",
  ["32"],
  "One third of 48 is 16, so two thirds is $2 \\times 16 = 32$.",
  d=1, skill="Fraction of a quantity")
N("What is $6.3 \\div 0.7$?",
  ["9"],
  "Multiply both numbers by 10 so the divisor is whole: $63 \\div 7 = 9$.",
  d=2, skill="Dividing decimals")
S("Which list is in order from smallest to largest?",
  "$0.35, \\frac{2}{5}, 0.42, \\frac{1}{2}$",
  ["$\\frac{2}{5}, 0.35, 0.42, \\frac{1}{2}$",
   "$0.35, 0.42, \\frac{2}{5}, \\frac{1}{2}$",
   "$\\frac{1}{2}, 0.42, \\frac{2}{5}, 0.35$"],
  "Write each as a decimal: $\\frac{2}{5} = 0.4$ and $\\frac{1}{2} = 0.5$. In order: 0.35, 0.4, 0.42, 0.5.",
  d=2, skill="Comparing fractions and decimals")
N("What is $12 - 3 \\times 4 + 6$?",
  ["6"],
  "Multiply first: $3 \\times 4 = 12$. Then work left to right: $12 - 12 + 6 = 6$.",
  d=1, skill="Order of operations")
N("What is $(-3) \\times (-4) - 5$?",
  ["7"],
  "A negative times a negative is positive: $(-3) \\times (-4) = 12$. Then $12 - 5 = 7$.",
  d=2, skill="Integers")
N("A pair of shorts costs \\$30. In a sale, the price is reduced by 15%. What is the sale price, in dollars? Type the number only.",
  ["25.5", "25.50"],
  "10% of \\$30 is \\$3 and 5% is \\$1.50, so 15% is \\$4.50. The sale price is $30 - 4.50 = 25.50$ dollars.",
  d=2, skill="Percentage discount")

# ---------- Drill only ----------
at(0)
N("What is $\\frac{3}{5} + \\frac{1}{4}$? Give your answer as a fraction.",
  ["17/20"],
  "Use the common denominator 20: $\\frac{12}{20} + \\frac{5}{20} = \\frac{17}{20}$.",
  d=1, skill="Adding fractions")
N("What is $\\frac{5}{6} - \\frac{1}{4}$? Give your answer as a fraction.",
  ["7/12"],
  "Use the common denominator 12: $\\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}$.",
  d=2, skill="Subtracting fractions")
N("What is $0.25 \\times 12$?",
  ["3"],
  "0.25 is one quarter, and a quarter of 12 is 3.",
  d=1, skill="Multiplying decimals")
N("What is 10% of 73?",
  ["7.3"],
  "To find 10%, divide by 10: $73 \\div 10 = 7.3$.",
  d=1, skill="Percentage of a quantity")
S("Which number is the largest?",
  "0.605", ["0.6", "0.59", "0.06"],
  "Compare place by place: 0.605, 0.600, 0.590 and 0.060. The tenths are equal for the first two, and 0.605 has 5 thousandths more.",
  d=2, skill="Comparing decimals")
N("What is $2.5 \\times 0.4$?",
  ["1"],
  "$25 \\times 4 = 100$, and there are two decimal places in the question, so the answer is 1.00, which is 1.",
  d=2, skill="Multiplying decimals")
N("What is $-6 - (-9)$?",
  ["3"],
  "Subtracting a negative is the same as adding: $-6 + 9 = 3$.",
  d=2, skill="Integers")
N("What is $48 \\div 0.4$?",
  ["120"],
  "Multiply both numbers by 10: $480 \\div 4 = 120$. Dividing by a number less than 1 makes the answer bigger.",
  d=3, skill="Dividing decimals")
S("Which fraction is equal to 0.75?",
  "$\\frac{3}{4}$", ["$\\frac{7}{5}$", "$\\frac{3}{5}$", "$\\frac{75}{10}$"],
  "$0.75 = \\frac{75}{100}$, which simplifies to $\\frac{3}{4}$. $\\frac{75}{10}$ is 7.5.",
  d=1, skill="Fractions and decimals")
N("What is $\\sqrt{81} + 2^3$?",
  ["17"],
  "$\\sqrt{81} = 9$ because $9 \\times 9 = 81$, and $2^3 = 8$. So $9 + 8 = 17$.",
  d=2, skill="Square roots and powers")
N("Write $\\frac{7}{8}$ as a decimal.",
  ["0.875", ".875"],
  "$\\frac{1}{8} = 0.125$, so $\\frac{7}{8} = 7 \\times 0.125 = 0.875$.",
  d=2, skill="Fractions and decimals")
N("What is $(18 - 6) \\div 3 \\times 2$?",
  ["8"],
  "Brackets first: $18 - 6 = 12$. Then divide and multiply from left to right: $12 \\div 3 = 4$, and $4 \\times 2 = 8$.",
  d=2, skill="Order of operations")
N("What is $1.5 + 2.75$?",
  ["4.25"],
  "Line up the decimal points: $1.50 + 2.75 = 4.25$.",
  d=1, skill="Adding decimals")
N("What is $\\frac{2}{5} \\times 20$?",
  ["8"],
  "One fifth of 20 is 4, so two fifths is $2 \\times 4 = 8$.",
  d=1, skill="Fraction of a quantity")
