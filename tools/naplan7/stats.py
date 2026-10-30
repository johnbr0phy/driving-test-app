# Statistics and Probability (nap7Stats), calculator allowed. Data in pipe
# tables or listed in the stem.

# ---------- Test 1, module 1 ----------
at(1, 1)
N("What is the mean of 6, 9, 4, 7 and 9?",
  ["7"],
  "The total is $6 + 9 + 4 + 7 + 9 = 35$, and $35 \\div 5 = 7$.",
  d=1, skill="Mean")
S("A spinner has 8 equal sections. 3 of them are red. What is the probability that the spinner lands on red?",
  "$\\frac{3}{8}$", ["$\\frac{3}{5}$", "$\\frac{5}{8}$", "$\\frac{1}{3}$"],
  "3 of the 8 equal sections are red, so $P(\\text{red}) = \\frac{3}{8}$. $\\frac{3}{5}$ compares red with not red, which is a ratio, not a probability.",
  d=1, skill="Probability")
X("A class voted for its favourite sport.\n\n| Sport | Votes |\n|---|---|\n| Soccer | 12 |\n| Netball | 9 |\n| Cricket | 7 |\n| Basketball | 12 |\n\nIs each statement true or false?",
  ["Soccer and basketball got the same number of votes.", "28 students voted in total.", "Cricket got the fewest votes."],
  ["True", "False"],
  [0, 1, 0],
  "Soccer and basketball both got 12, so the first is true. The total is $12 + 9 + 7 + 12 = 40$, so the second is false. Cricket's 7 is the smallest number, so the third is true.",
  d=1, skill="Reading tables")

# ---------- Test 1, module 2, harder ----------
at(1, 2, "upper")
S("What is the median of 12, 5, 9, 15, 7 and 10?",
  "9.5", ["9", "10", "9.7"],
  "In order: 5, 7, 9, 10, 12, 15. With six values, the median is halfway between the middle two: $\\frac{9 + 10}{2} = 9.5$. About 9.7 is the mean.",
  d=3, skill="Median")
N("The mean of four numbers is 15. Three of the numbers are 12, 18 and 10. What is the fourth number?",
  ["20"],
  "Four numbers with a mean of 15 add to $4 \\times 15 = 60$. The three known numbers add to 40, so the fourth is $60 - 40 = 20$.",
  d=3, skill="Mean")
S("A bag holds 4 red, 6 blue and 10 green marbles. One marble is taken at random. What is the probability that it is not green?",
  "50%", ["30%", "60%", "10%"],
  "There are $4 + 6 + 10 = 20$ marbles and $4 + 6 = 10$ are not green. $\\frac{10}{20} = 50\\%$.",
  d=2, skill="Probability")

# ---------- Test 1, module 2, easier ----------
at(1, 2, "lower")
S("What is the mode of 3, 5, 5, 7, 8, 5 and 2?",
  "5", ["7", "8", "3"],
  "The mode is the value that appears most often. 5 appears three times. There are 7 values, which is where the distractor 7 comes from.",
  d=1, skill="Mode")
N("What is the range of 14, 22, 9, 30 and 17?",
  ["21"],
  "Range is the largest value minus the smallest: $30 - 9 = 21$.",
  d=1, skill="Range")
S("A standard six-sided die is rolled. What is the probability of rolling a multiple of 3?",
  "$\\frac{1}{3}$", ["$\\frac{1}{2}$", "$\\frac{2}{3}$", "$\\frac{1}{6}$"],
  "Only 3 and 6 are multiples of 3, so the probability is $\\frac{2}{6} = \\frac{1}{3}$.",
  d=2, skill="Probability")

# ---------- Test 2, module 1 ----------
at(2, 1)
N("This stem-and-leaf plot shows the ages of people in a choir. The key is 2 | 1 = 21.\n\n| Stem | Leaf |\n|---|---|\n| 2 | 1 4 7 |\n| 3 | 0 2 |\n| 4 | 5 |\n\nHow many people in the choir are older than 30?",
  ["2"],
  "The ages are 21, 24, 27, 30, 32 and 45. Only 32 and 45 are older than 30; a 30-year-old is not older than 30.",
  d=2, skill="Stem-and-leaf plots")
N("The maximum temperatures over five days were 24, 27, 31, 22 and 26 degrees Celsius. What was the mean maximum temperature? Type the number only.",
  ["26"],
  "The total is $24 + 27 + 31 + 22 + 26 = 130$, and $130 \\div 5 = 26$.",
  d=1, skill="Mean")
S("Which word best describes the chance of rolling a 7 on a standard six-sided die?",
  "impossible", ["unlikely", "even chance", "certain"],
  "A standard die shows only 1 to 6, so rolling a 7 cannot happen.",
  d=1, skill="Chance")

# ---------- Test 2, module 2 (fixed form) ----------
at(2, 2)
N("A class of 25 students has a mean test score of 72. What is the total of all their scores?",
  ["1800"],
  "Mean is total divided by count, so the total is $72 \\times 25 = 1800$.",
  d=2, skill="Mean")
S("A small set of data has one value that is much larger than all the others. Which of these is changed most by that one large value?",
  "the mean", ["the median", "the mode", "the number of values"],
  "The mean adds up every value, so one very large value pulls it up. The median and mode depend on position and frequency, so they barely move.",
  d=3, skill="Mean and median")
N("A spinner landed on blue 18 times in 60 spins. What is the experimental probability of landing on blue? Give your answer as a decimal.",
  ["0.3", ".3", "3/10"],
  "Experimental probability is the number of times it happened divided by the number of trials: $\\frac{18}{60} = 0.3$.",
  d=2, skill="Experimental probability")

# ---------- Drill only ----------
at(0)
N("What is the median of 8, 3, 11, 6 and 9?",
  ["8"],
  "In order: 3, 6, 8, 9, 11. The middle value is 8.",
  d=1, skill="Median")
S("Each letter of the word AUSTRALIA is written on a card, and one card is picked at random. What is the probability of picking an A?",
  "$\\frac{1}{3}$", ["$\\frac{1}{9}$", "$\\frac{3}{8}$", "$\\frac{2}{9}$"],
  "AUSTRALIA has 9 letters and 3 of them are A, so $P(\\text{A}) = \\frac{3}{9} = \\frac{1}{3}$.",
  d=2, skill="Probability")
N("What is the mean of 10, 14, 15 and 21?",
  ["15"],
  "The total is $10 + 14 + 15 + 21 = 60$, and $60 \\div 4 = 15$.",
  d=1, skill="Mean")
