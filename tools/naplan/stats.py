# Statistics and Probability (napStats), calculator allowed. Data in pipe
# tables or listed in the stem.

# ---------- Test 1, module 1 ----------
at(1, 1)
N("The ages of six players in a team are 14, 15, 15, 16, 17 and 19. What is their mean age?",
  ["16"],
  "The total is $14 + 15 + 15 + 16 + 17 + 19 = 96$, and $96 \\div 6 = 16$.",
  d=1, skill="Mean")
S("A bag holds 3 red, 5 blue and 2 green counters. One counter is taken at random. What is the probability that it is blue?",
  "$\\frac{1}{2}$", ["$\\frac{1}{5}$", "$\\frac{5}{3}$", "$\\frac{1}{3}$"],
  "There are $3 + 5 + 2 = 10$ counters and 5 are blue, so $P = \\frac{5}{10} = \\frac{1}{2}$.",
  d=1, skill="Probability")
X("A class surveyed how students get to school.\n\n| | Walk | Bus | Car |\n|---|---|---|---|\n| Year 9A | 8 | 12 | 6 |\n| Year 9B | 11 | 7 | 9 |\n\nIs each statement true or false?",
  ["More students in 9B than 9A walk.", "Bus is the most common way for 9A.", "The two classes have the same number of students."],
  ["True", "False"],
  [0, 0, 1],
  "9B has 11 walkers and 9A has 8, so the first is true. Bus (12) is 9A's largest number, so the second is true. 9A has $8 + 12 + 6 = 26$ students and 9B has $11 + 7 + 9 = 27$, so the third is false.",
  d=2, skill="Two-way tables")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
S("Two fair six-sided dice are rolled. What is the probability that the total is 9?",
  "$\\frac{1}{9}$", ["$\\frac{1}{6}$", "$\\frac{1}{12}$", "$\\frac{9}{36}$"],
  "There are 36 equally likely outcomes. A total of 9 comes from (3, 6), (4, 5), (5, 4) and (6, 3): 4 outcomes, and $\\frac{4}{36} = \\frac{1}{9}$.",
  d=3, skill="Two-step probability")
N("The mean of five test scores is 72. Four of the scores are 65, 70, 78 and 80. What is the fifth score?",
  ["67"],
  "The five scores total $5 \\times 72 = 360$. The four known scores total 293, so the fifth is $360 - 293 = 67$.",
  d=3, skill="Mean")
S("In a group of 30 students, 18 play sport, 12 play music and 5 do both. How many students do neither?",
  "5", ["0", "10", "17"],
  "Students who do at least one: $18 + 12 - 5 = 25$ (the 5 who do both were counted twice). Neither: $30 - 25 = 5$.",
  d=3, skill="Venn diagrams")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
N("What is the median of 4, 9, 2, 7 and 5?",
  ["5"],
  "In order: 2, 4, 5, 7, 9. The middle value is 5.",
  d=1, skill="Median")
S("A spinner has 4 equal sections numbered 1, 2, 3 and 4. What is the chance of spinning an even number?",
  "$\\frac{1}{2}$", ["$\\frac{1}{4}$", "$\\frac{3}{4}$", "$\\frac{2}{3}$"],
  "2 and 4 are even: 2 sections out of 4, which is $\\frac{1}{2}$.",
  d=1, skill="Probability")
N("Daily top temperatures for a week, in degrees Celsius:\n\n| Mon | Tue | Wed | Thu | Fri | Sat | Sun |\n|---|---|---|---|---|---|---|\n| 24 | 27 | 31 | 22 | 25 | 29 | 26 |\n\nWhat is the range of these temperatures?",
  ["9"],
  "Range $= \\text{highest} - \\text{lowest} = 31 - 22 = 9$.",
  d=1, skill="Range")

# ---------- Test 2, module 1 ----------
at(2, 1)
N("The number of goals a team scored in 8 games was 2, 0, 3, 1, 2, 4, 2, 2. What is the mode?",
  ["2"],
  "2 appears four times, more than any other value.",
  d=1, skill="Mode")
S("A survey of 200 people found that 64 prefer cycling. What percentage prefer cycling?",
  "32%", ["64%", "36%", "3.2%"],
  "$\\frac{64}{200} = 0.32 = 32\\%$.",
  d=1, skill="Percentages in data")
S("A fair coin is tossed and a fair six-sided die is rolled. What is the probability of a head and a 6?",
  "$\\frac{1}{12}$", ["$\\frac{1}{8}$", "$\\frac{2}{3}$", "$\\frac{7}{12}$"],
  "The events are independent: $\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}$. Adding them gives $\\frac{2}{3}$.",
  d=2, skill="Two-step probability")

# ---------- Test 2, module 2 ----------
at(2, 2)
S("The median of four numbers 3, 8, $x$ and 12 is 9. The numbers are already in order. What is $x$?",
  "10", ["9", "11", "4"],
  "With four numbers, the median is the mean of the middle two: $\\frac{8 + x}{2} = 9$, so $8 + x = 18$ and $x = 10$.",
  d=3, skill="Median")
N("A test for a rare condition was trialled on 400 people.\n\n| | Has condition | No condition |\n|---|---|---|\n| Test positive | 18 | 22 |\n| Test negative | 2 | 358 |\n\nOf the people who tested positive, what percentage actually had the condition?",
  ["45"],
  "40 people tested positive ($18 + 22$), and 18 of them had the condition: $\\frac{18}{40} = 0.45 = 45\\%$.",
  d=3, skill="Two-way tables")
S("A data set is 5, 6, 6, 7, 8. The value 30 is added. Which statement is true?",
  "The mean rises more than the median.",
  ["The median rises more than the mean.",
   "The mean and median rise by the same amount.",
   "Neither the mean nor the median changes."],
  "The mean goes from 6.4 to 10.3. The median goes from 6 to 6.5. An outlier pulls the mean far more than the median.",
  d=3, skill="Effect of outliers")

# ---------- Drill only ----------
at(0)
N("Five friends have \\$12, \\$18, \\$9, \\$15 and \\$21. What is the mean amount, in dollars?",
  ["15"],
  "The total is \\$75, and $75 \\div 5 = 15$ dollars.",
  d=1, skill="Mean")
