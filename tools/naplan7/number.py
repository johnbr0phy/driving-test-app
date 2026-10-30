# Number and Algebra (nap7Number), calculator allowed.

# ---------- Test 1, module 1 ----------
at(1, 1)
N("Movie tickets cost \\$14.50 each. How much do 6 tickets cost, in dollars? Type the number only.",
  ["87"],
  "$14.50 \\times 6 = 87$ dollars.",
  d=1, skill="Money", basics="decimals")
S("Solve $2x + 5 = 17$.",
  "$x = 6$", ["$x = 11$", "$x = 12$", "$x = 8.5$"],
  "Subtract 5 from both sides: $2x = 12$. Divide by 2: $x = 6$. Stopping at $2x = 12$ gives the distractor 12.",
  d=1, skill="Linear equations", basics="solveX")
N("Sand and cement are mixed in the ratio 3 : 1. How many kilograms of sand are in 20 kg of the mix? Type the number only.",
  ["15"],
  "There are $3 + 1 = 4$ parts, so one part is $20 \\div 4 = 5$ kg. Sand is 3 parts: $3 \\times 5 = 15$ kg.",
  d=2, skill="Ratio", basics="ratios")
S("A row of squares is made from matchsticks. 1 square uses 4 matchsticks, 2 squares use 7, 3 squares use 10 and 4 squares use 13. Which rule gives the number of matchsticks for $n$ squares?",
  "$3n + 1$", ["$n + 3$", "$4n$", "$3n + 4$"],
  "The number goes up by 3 each time, so the rule starts with $3n$. For $n = 1$, $3 \\times 1 = 3$, and 1 more makes 4. Check: $3 \\times 4 + 1 = 13$.",
  d=2, skill="Patterns")
N("A school has 640 students. 35% of them walk to school. How many students walk to school?",
  ["224"],
  "$0.35 \\times 640 = 224$.",
  d=1, skill="Percentages", basics="percents")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
N("A car uses 6.5 L of fuel for every 100 km. How many litres does it use to travel 420 km? Type the number only.",
  ["27.3"],
  "420 km is $420 \\div 100 = 4.2$ lots of 100 km, so it uses $4.2 \\times 6.5 = 27.3$ L.",
  d=3, skill="Rates", basics="ratios")
S("What is the value of $3a^2 - b$ when $a = -2$ and $b = 5$?",
  "$7$", ["$31$", "$-17$", "$17$"],
  "$a^2 = (-2)^2 = 4$, so $3 \\times 4 - 5 = 12 - 5 = 7$. Squaring $3a$ first gives 31, and treating $(-2)^2$ as $-4$ gives $-17$.",
  d=3, skill="Substitution", basics="negativeNumbers")
N("The price of a jacket rose from \\$50 to \\$59. What was the percentage increase? Type the number only.",
  ["18"],
  "The increase is \\$9, and $\\frac{9}{50} = 0.18 = 18\\%$. Always divide by the original price.",
  d=3, skill="Percentage change", basics="percents")
S("Which expression is equal to $2(3x - 4) - x$?",
  "$5x - 8$", ["$5x - 4$", "$6x - 9$", "$7x - 8$"],
  "Expand the brackets: $6x - 8$. Then subtract $x$: $6x - x - 8 = 5x - 8$.",
  d=3, skill="Simplifying expressions")
N("A pancake recipe for 6 people uses 450 g of flour. How many grams of flour are needed for 8 people? Type the number only.",
  ["600"],
  "One person needs $450 \\div 6 = 75$ g, so 8 people need $75 \\times 8 = 600$ g.",
  d=2, skill="Rates", basics="ratios")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
N("Pencils cost \\$1.20 each. How much do 5 pencils cost, in dollars? Type the number only.",
  ["6"],
  "$1.20 \\times 5 = 6.00$, which is 6 dollars.",
  d=1, skill="Money", basics="decimals")
S("What is the value of $n$ if $n + 9 = 23$?",
  "$14$", ["$32$", "$12$", "$15$"],
  "Subtract 9 from both sides: $n = 23 - 9 = 14$. Adding instead gives 32.",
  d=1, skill="Linear equations", basics="solveX")
N("What is 50% of 86?",
  ["43"],
  "50% is one half, and half of 86 is 43.",
  d=1, skill="Percentages", basics="percents")
S("Which of these is a prime number?",
  "13", ["15", "21", "27"],
  "A prime number has exactly two factors, 1 and itself. 13 is prime; $15 = 3 \\times 5$, $21 = 3 \\times 7$ and $27 = 3 \\times 9$.",
  d=1, skill="Primes")
N("The temperature was $-4$°C in the morning and rose by 11 degrees by midday. What was the temperature at midday, in °C? Type the number only.",
  ["7"],
  "Start at $-4$ and count up 11: $-4 + 11 = 7$.",
  d=2, skill="Integers", basics="negativeNumbers")

# ---------- Test 2, module 1 ----------
at(2, 1)
N("Apples cost \\$4.80 per kilogram. How much do 1.5 kg of apples cost, in dollars? Type the number only.",
  ["7.2", "7.20"],
  "$4.80 \\times 1.5 = 7.20$ dollars.",
  d=1, skill="Rates", basics="decimals")
S("Solve $\\frac{x}{4} - 3 = 5$.",
  "$x = 32$", ["$x = 8$", "$x = 2$", "$x = 20$"],
  "Add 3 to both sides: $\\frac{x}{4} = 8$. Multiply by 4: $x = 32$. Stopping at $\\frac{x}{4} = 8$ gives the distractor 8.",
  d=2, skill="Linear equations", basics="solveX")
N("Tom and Ana share \\$84 in the ratio 4 : 3. How much does Tom get, in dollars? Type the number only.",
  ["48"],
  "There are $4 + 3 = 7$ parts, so one part is $84 \\div 7 = 12$ dollars. Tom gets $4 \\times 12 = 48$ dollars.",
  d=2, skill="Ratio", basics="ratios")
X("Is each number a multiple of 6?",
  ["48", "64", "90"],
  ["Yes", "No"],
  [0, 1, 0],
  "$48 = 6 \\times 8$ and $90 = 6 \\times 15$. 64 is not: $6 \\times 10 = 60$ and $6 \\times 11 = 66$.",
  d=1, skill="Multiples")
N("A phone costs \\$480. It is on sale with 20% off. What is the sale price, in dollars? Type the number only.",
  ["384"],
  "20% of 480 is $0.2 \\times 480 = 96$, and $480 - 96 = 384$. Or take 80%: $0.8 \\times 480 = 384$.",
  d=2, skill="Percentage discount", basics="percents")

# ---------- Test 2, module 2 (fixed form) ----------
at(2, 2)
N("Write $\\frac{3}{8}$ as a percentage. Type the number only.",
  ["37.5"],
  "$3 \\div 8 = 0.375$, and $0.375 \\times 100 = 37.5$, so it is 37.5%.",
  d=2, skill="Fractions and percentages", basics="percents")
S("Concert tickets cost \\$12 each, plus a \\$5 booking fee for the whole order. Which expression gives the total cost, in dollars, of $n$ tickets?",
  "$12n + 5$", ["$5n + 12$", "$17n$", "$12(n + 5)$"],
  "Each ticket costs 12, so $n$ tickets cost $12n$. The fee is paid once, so add 5: $12n + 5$.",
  d=2, skill="Writing expressions")
N("A bus travels 156 km in 2 hours. What is its average speed, in kilometres per hour? Type the number only.",
  ["78"],
  "Speed is distance divided by time: $156 \\div 2 = 78$ km/h.",
  d=1, skill="Rates", basics="ratios")
S("What is the value of $2^5$?",
  "$32$", ["$10$", "$25$", "$64$"],
  "$2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$. Multiplying $2 \\times 5$ gives 10.",
  d=2, skill="Powers")
N("Lena has \\$40 and saves \\$15 every week. After how many weeks will she have \\$175? Type the number of weeks only.",
  ["9"],
  "She needs $175 - 40 = 135$ dollars more, and $135 \\div 15 = 9$ weeks.",
  d=2, skill="Problem solving", basics="solveX")

# ---------- Drill only ----------
at(0)
N("What is 12% of 250?",
  ["30"],
  "$0.12 \\times 250 = 30$.",
  d=1, skill="Percentages", basics="percents")
S("Simplify $5m + 2n - 2m + 4n$.",
  "$3m + 6n$", ["$7m + 6n$", "$3m + 2n$", "$5m + 6n$"],
  "Collect like terms: $5m - 2m = 3m$ and $2n + 4n = 6n$.",
  d=2, skill="Simplifying expressions")
N("The ratio of boys to girls in a class is 3 : 4. There are 35 students. How many are girls?",
  ["20"],
  "There are $3 + 4 = 7$ parts, so one part is $35 \\div 7 = 5$ students. Girls are $4 \\times 5 = 20$.",
  d=2, skill="Ratio", basics="ratios")
N("Solve $5x - 4 = 31$. Type the value of $x$.",
  ["7"],
  "Add 4 to both sides: $5x = 35$. Divide by 5: $x = 7$.",
  d=1, skill="Linear equations", basics="solveX")
N("What is $-8 + 15 - 20$?",
  ["-13"],
  "Left to right: $-8 + 15 = 7$, then $7 - 20 = -13$.",
  d=2, skill="Integers", basics="negativeNumbers")
S("Which number is the smallest?",
  "$-\\frac{3}{4}$", ["$-0.6$", "$-0.5$", "$-\\frac{1}{4}$"],
  "As decimals they are $-0.75$, $-0.6$, $-0.5$ and $-0.25$. The negative number furthest from zero is the smallest.",
  d=2, skill="Integers", basics="negativeNumbers")
N("What is $(5 + 3)^2 \\div 4$?",
  ["16"],
  "Brackets first: $5 + 3 = 8$. Then the power: $8^2 = 64$. Then divide: $64 \\div 4 = 16$.",
  d=2, skill="Order of operations", basics="orderOfOperations")
