# Number and Algebra (napNumber), calculator allowed.

# ---------- Test 1, module 1 ----------
at(1, 1)
N("A phone plan costs \\$35 a month. How much does it cost for a year, in dollars?",
  ["420"],
  "$35 \\times 12 = 420$ dollars.",
  d=1, skill="Rates")
S("Solve $3x - 7 = 20$.",
  "$x = 9$", ["$x = 4\\frac{1}{3}$", "$x = 27$", "$x = 39$"],
  "Add 7 to both sides: $3x = 27$. Divide by 3: $x = 9$. Stopping at $3x = 27$ gives the distractor 27.",
  d=1, skill="Linear equations", basics="solveX")
N("A school has 480 students. The ratio of students who walk to those who do not is 3 : 5. How many students walk?",
  ["180"],
  "There are $3 + 5 = 8$ parts, so one part is $480 \\div 8 = 60$ students. Walkers are $3 \\times 60 = 180$.",
  d=2, skill="Ratio", basics="ratios")
S("Which expression is equal to $a^5 \\times a^3$?",
  "$a^8$", ["$a^{15}$", "$a^2$", "$2a^8$"],
  "When multiplying powers of the same base, add the indices: $5 + 3 = 8$. Multiplying the indices gives $a^{15}$, a common error.",
  d=2, skill="Index laws", basics="exponentRules")
S("A jacket was \\$120. In a sale its price fell to \\$90. What was the percentage decrease?",
  "25%", ["30%", "33%", "75%"],
  "The decrease is \\$30, and $\\frac{30}{120} = 0.25 = 25\\%$. Dividing by the new price, $\\frac{30}{90}$, gives about 33%.",
  d=2, skill="Percentage change", basics="percents")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
N("\\$2500 is invested at 4% per year simple interest. How much interest is earned in 3 years, in dollars?",
  ["300"],
  "Simple interest $= P \\times r \\times t = 2500 \\times 0.04 \\times 3 = 300$ dollars.",
  d=2, skill="Simple interest", basics="percents")
S("Which is $0.000\\,47$ written in scientific notation?",
  "$4.7 \\times 10^{-4}$", ["$4.7 \\times 10^{4}$", "$47 \\times 10^{-5}$", "$4.7 \\times 10^{-3}$"],
  "Move the decimal point 4 places right to get 4.7, so the power is $10^{-4}$. $47 \\times 10^{-5}$ has the right value but is not in scientific notation, since 47 is not between 1 and 10.",
  d=3, skill="Scientific notation", basics="scientificNotation")
S("Expand and simplify $3(2x - 5) - 2(x - 4)$.",
  "$4x - 7$", ["$4x - 23$", "$4x - 9$", "$8x - 7$"],
  "$3(2x - 5) = 6x - 15$ and $-2(x - 4) = -2x + 8$. So $6x - 15 - 2x + 8 = 4x - 7$. Forgetting that $-2 \\times -4 = +8$ gives $4x - 23$.",
  d=3, skill="Expanding brackets", basics="distributing")
N("A line passes through the points $(1, 4)$ and $(5, 12)$. What is its gradient?",
  ["2"],
  "Gradient $= \\frac{\\text{rise}}{\\text{run}} = \\frac{12 - 4}{5 - 1} = \\frac{8}{4} = 2$.",
  d=3, skill="Gradient")
N("Solve $\\frac{2x + 3}{5} = 7$.",
  ["16"],
  "Multiply both sides by 5: $2x + 3 = 35$. Subtract 3: $2x = 32$. Divide by 2: $x = 16$.",
  d=3, skill="Linear equations", basics="solveX")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
N("Bananas cost \\$3.80 per kilogram. How much do 2.5 kg cost, in dollars?",
  ["9.50", "9.5"],
  "$3.80 \\times 2.5 = 9.50$ dollars.",
  d=1, skill="Rates")
S("Solve $x + 14 = 32$.",
  "$x = 18$", ["$x = 46$", "$x = 22$", "$x = 16$"],
  "Subtract 14 from both sides: $x = 32 - 14 = 18$.",
  d=1, skill="Linear equations", basics="solveX")
N("What is 35% of \\$80, in dollars?",
  ["28"],
  "$0.35 \\times 80 = 28$ dollars.",
  d=1, skill="Percentage of a quantity", basics="percents")
S("The temperature at 6 am was $-4^\\circ$C. By noon it had risen $11^\\circ$C. What was the temperature at noon?",
  "$7^\\circ$C", ["$15^\\circ$C", "$-15^\\circ$C", "$-7^\\circ$C"],
  "$-4 + 11 = 7$, so it was $7^\\circ$C.",
  d=1, skill="Integers", basics="negativeNumbers")
S("If $n = 6$, what is the value of $4n - 5$?",
  "19", ["41", "15", "29"],
  "Substitute: $4 \\times 6 - 5 = 24 - 5 = 19$. Reading $4n$ as 46 gives 41.",
  d=1, skill="Substitution")

# ---------- Test 2, module 1 ----------
at(2, 1)
S("Solve $5x + 4 = 2x + 19$.",
  "$x = 5$", ["$x = 3$", "$x = 7$", "$x = 15$"],
  "Subtract $2x$ from both sides: $3x + 4 = 19$. Subtract 4: $3x = 15$. Divide by 3: $x = 5$.",
  d=2, skill="Linear equations", basics="solveX")
N("A car uses 7.5 litres of fuel per 100 km. How many litres does it use for a 360 km trip?",
  ["27"],
  "$360 \\div 100 = 3.6$ lots of 100 km, and $3.6 \\times 7.5 = 27$ litres.",
  d=2, skill="Rates", basics="ratios")
S("Which is equal to $\\frac{6^7}{6^4}$?",
  "$6^3$", ["$1^3$", "$6^{11}$", "$6^{28}$"],
  "When dividing powers of the same base, subtract the indices: $7 - 4 = 3$.",
  d=2, skill="Index laws", basics="exponentRules")
N("A bike costs \\$650. Its price rises by 8%. What is the new price, in dollars?",
  ["702"],
  "$650 \\times 1.08 = 702$ dollars. The increase alone is \\$52.",
  d=2, skill="Percentage increase", basics="percents")
S("A pattern of tiles grows like this: 4, 7, 10, 13, ... Which rule gives the number of tiles $T$ in step $n$?",
  "$T = 3n + 1$", ["$T = n + 3$", "$T = 4n$", "$T = 3n + 4$"],
  "The pattern goes up by 3 each step, so $T = 3n + c$. Step 1 has 4 tiles: $3 + c = 4$, so $c = 1$.",
  d=2, skill="Patterns and rules")

# ---------- Test 2, module 2 ----------
at(2, 2)
S("Which is the value of $(3 \\times 10^5) \\times (4 \\times 10^{3})$ in scientific notation?",
  "$1.2 \\times 10^{9}$", ["$12 \\times 10^{8}$", "$1.2 \\times 10^{15}$", "$7 \\times 10^{8}$"],
  "$3 \\times 4 = 12$ and $10^5 \\times 10^3 = 10^8$, giving $12 \\times 10^8 = 1.2 \\times 10^9$. $12 \\times 10^8$ is the right value but not in scientific notation.",
  d=3, skill="Scientific notation", basics="scientificNotation")
N("The line $y = mx + 3$ passes through the point $(4, 11)$. What is the value of $m$?",
  ["2"],
  "Substitute: $11 = 4m + 3$, so $4m = 8$ and $m = 2$.",
  d=3, skill="Linear graphs", basics="solveX")
S("Simplify $\\frac{12a^6b^2}{4a^2b}$.",
  "$3a^4b$", ["$3a^3b$", "$8a^4b$", "$3a^4b^2$"],
  "$12 \\div 4 = 3$, $a^6 \\div a^2 = a^4$, and $b^2 \\div b = b$.",
  d=3, skill="Index laws", basics="exponentRules")
N("Ava's pay rose from \\$24 to \\$27 an hour. What was the percentage increase? Type the number only, without the % sign.",
  ["12.5"],
  "The rise is \\$3, and $\\frac{3}{24} = 0.125 = 12.5\\%$.",
  d=3, skill="Percentage change", basics="percents")
S("Factorise $6x^2 + 9x$.",
  "$3x(2x + 3)$", ["$3(2x^2 + 9x)$", "$x(6x + 3)$", "$6x(x + 9)$"],
  "The highest common factor of $6x^2$ and $9x$ is $3x$. $3x \\times 2x = 6x^2$ and $3x \\times 3 = 9x$.",
  d=3, skill="Factorising")

# ---------- Drill only ----------
at(0)
S("Expand $-4(x - 3)$.",
  "$-4x + 12$", ["$-4x - 12$", "$-4x - 3$", "$4x - 12$"],
  "Multiply each term by $-4$: $-4 \\times x = -4x$ and $-4 \\times -3 = +12$.",
  d=2, skill="Expanding brackets", basics="distributing")
N("Write $5.6 \\times 10^{4}$ as an ordinary number.",
  ["56000", "56 000"],
  "Move the decimal point 4 places right: 56 000.",
  d=2, skill="Scientific notation", basics="scientificNotation")
S("Which is equal to $(x^3)^4$?",
  "$x^{12}$", ["$x^{7}$", "$x^{81}$", "$4x^3$"],
  "For a power of a power, multiply the indices: $3 \\times 4 = 12$.",
  d=2, skill="Index laws", basics="exponentRules")
N("A recipe for 4 people uses 300 g of rice. How many grams are needed for 10 people?",
  ["750"],
  "300 g for 4 people is 75 g per person, and $75 \\times 10 = 750$ g.",
  d=1, skill="Ratio", basics="ratios")
S("What is $-8 - (-3)$?",
  "$-5$", ["$-11$", "$5$", "$11$"],
  "Subtracting a negative is adding: $-8 + 3 = -5$.",
  d=1, skill="Integers", basics="negativeNumbers")
N("Solve $4(x + 2) = 36$.",
  ["7"],
  "Divide both sides by 4: $x + 2 = 9$, so $x = 7$.",
  d=2, skill="Linear equations", basics="solveX")
N("A \\$60 game is on sale for 15% off. What is the sale price, in dollars?",
  ["51", "51.00"],
  "15% of \\$60 is \\$9, so the sale price is $60 - 9 = 51$ dollars.",
  d=1, skill="Discounts", basics="percents")
