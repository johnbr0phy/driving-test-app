"""Probability and statistics (DfE subject content sections 5 and 6): 15% of Foundation marks."""
from helpers import S, N

DOMAIN = "gcseStats"

SHOES = "| Shoe size | Frequency |\n|---|---|\n| 5 | 3 |\n| 6 | 7 |\n| 7 | 6 |\n| 8 | 4 |"

ITEMS = [
    # Practice Test 1, Paper 1 (non-calculator)
    N(1, 1, "Mean", 1, "Here are five numbers: 7, 3, 9, 3, 8. Work out the mean.", ["6"],
      r"The total is $7 + 3 + 9 + 3 + 8 = 30$, and $30 \div 5 = 6$."),
    S(1, 1, "Probability", 1, "A fair six-sided dice is rolled once. What is the probability of rolling a number greater than 4?",
      [r"$\frac{1}{6}$", r"$\frac{1}{3}$", r"$\frac{1}{2}$", r"$\frac{2}{3}$"], 1,
      r"Only 5 and 6 are greater than 4, so the probability is $\frac{2}{6} = \frac{1}{3}$. Counting 4 as well gives $\frac{1}{2}$.", locked=True),
    N(1, 1, "Probabilities sum to 1", 2, "The probability that a train is late is 0.15. What is the probability that the train is not late?", ["0.85", "85/100", "17/20"],
      r"The train is either late or not late, so the probabilities add to 1: $1 - 0.15 = 0.85$."),

    # Practice Test 1, Paper 2 (calculator)
    N(1, 2, "Median", 1, "The ages of six people are 34, 28, 41, 28, 37 and 30. Work out the median age.", ["32"],
      r"In order: 28, 28, 30, 34, 37, 41. The middle two are 30 and 34, so the median is $\frac{30 + 34}{2} = 32$."),
    N(1, 2, "Mean from a frequency table", 2, "The table shows the number of pets owned by 20 students. Work out the mean number of pets per student.", ["1"],
      r"Multiply each number of pets by its frequency: $0 + 9 + 8 + 3 = 20$ pets. $20 \div 20 = 1$. Dividing by 4 rows instead of 20 students gives 5, which is wrong.",
      passage="| Number of pets | Frequency |\n|---|---|\n| 0 | 6 |\n| 1 | 9 |\n| 2 | 4 |\n| 3 | 1 |"),
    N(1, 2, "Relative frequency", 3, "A spinner is spun 200 times and lands on red 46 times. Using these results, how many times would you expect it to land on red in 500 spins?", ["115"],
      r"The relative frequency of red is $\frac{46}{200} = 0.23$, and $0.23 \times 500 = 115$."),

    # Practice Test 1, Paper 3 (calculator)
    S(1, 3, "Correlation", 1, "A scatter graph shows that on warmer days a cafe sells fewer hot drinks. What type of correlation does it show?",
      ["Negative correlation", "Positive correlation", "No correlation", "Direct proportion"], 0,
      "As one variable goes up the other goes down, which is negative correlation. Positive correlation would mean both rise together."),
    N(1, 3, "Pie charts", 2, "A pie chart shows how 60 students travel to school. 15 of them walk. What angle should the walk sector have, in degrees?", ["90"],
      r"Each student is $360 \div 60 = 6$°, so 15 students take $15 \times 6 = 90$°."),
    N(1, 3, "Venn diagrams", 3, "In a group of 30 students, 18 study French, 12 study Spanish and 5 study both. How many study neither language?", ["5"],
      r"French or Spanish or both: $18 + 12 - 5 = 25$ students. So $30 - 25 = 5$ study neither. Forgetting to take off the 5 counted twice gives 0."),

    # Practice Test 2, Paper 1 (non-calculator)
    S(2, 1, "Averages", 1, "What is the mode of 5, 2, 9, 2, 7, 2, 8?", ["2", "5", "7", "9"], 0,
      "The mode is the value that appears most often: 2 appears three times. 5 is both the median and the mean here, not the mode.", locked=True),
    N(2, 1, "Probability", 2, "A bag holds 3 red, 5 blue and 2 green counters. One counter is taken at random. What is the probability that it is blue? Give your answer as a fraction or a decimal.", ["1/2", "0.5"],
      r"There are 10 counters and 5 are blue, so the probability is $\frac{5}{10} = \frac{1}{2}$."),
    N(2, 1, "Sample spaces", 3, "Two fair coins are thrown. What is the probability of getting two heads? Give your answer as a fraction or a decimal.", ["1/4", "0.25"],
      r"The outcomes are HH, HT, TH and TT, so two heads is 1 out of 4. Answering $\frac{1}{3}$ forgets that HT and TH are different outcomes."),

    # Practice Test 2, Paper 2 (calculator)
    N(2, 2, "Range", 1, "The range of five test marks is 23. The lowest mark is 48. What is the highest mark?", ["71"],
      r"Range = highest − lowest, so the highest is $48 + 23 = 71$."),
    N(2, 2, "Mean", 2, "The mean of four numbers is 12. Three of the numbers are 9, 15 and 10. What is the fourth number?", ["14"],
      r"The four numbers total $4 \times 12 = 48$. The three given add to 34, so the fourth is $48 - 34 = 14$."),
    S(2, 2, "Independent events", 3, "The probability that a player wins a game of chess is 0.3. Games are independent. She plays two games. What is the probability that she wins both?",
      ["0.09", "0.3", "0.6", "0.9"], 0,
      r"For independent events, multiply: $0.3 \times 0.3 = 0.09$. Adding gives 0.6, which is the wrong rule.", locked=True),

    # Practice Test 2, Paper 3 (calculator)
    S(2, 3, "Grouped data", 1, "The table shows how long 25 customers waited, $t$ minutes. Which is the modal class?",
      [r"$10 < t \le 20$", r"$0 < t \le 10$", r"$20 < t \le 30$", r"$30 < t \le 40$"], 0,
      r"The modal class has the highest frequency, 11, which is $10 < t \le 20$.",
      passage="| Time ($t$ minutes) | Frequency |\n|---|---|\n| $0 < t \\le 10$ | 4 |\n| $10 < t \\le 20$ | 11 |\n| $20 < t \\le 30$ | 8 |\n| $30 < t \\le 40$ | 2 |",
      basics="readingTable"),
    N(2, 3, "Probabilities sum to 1", 2, "A biased spinner lands on one of four colours. The table shows some of the probabilities. What is the probability that it lands on green?", ["0.3", "3/10"],
      r"The probabilities add up to 1: $1 - (0.35 + 0.2 + 0.15) = 1 - 0.7 = 0.3$.",
      passage="| Colour | Red | Blue | Green | Yellow |\n|---|---|---|---|---|\n| Probability | 0.35 | 0.2 | ? | 0.15 |"),
    N(2, 3, "Sample spaces", 3, "Two fair six-sided dice are rolled and their scores are added. What is the probability that the total is 7? Give your answer as a fraction.", ["1/6", "6/36"],
      r"Of the 36 equally likely outcomes, 6 give 7 (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), so the probability is $\frac{6}{36} = \frac{1}{6}$.", tol=0.001),

    # Drill only
    N(0, 0, "Median", 1, "Find the median of 3, 8, 5, 12, 6.", ["6"],
      "Put them in order: 3, 5, 6, 8, 12. The middle value is 6. Taking the middle of the unsorted list gives 5, which is wrong.", basics="meanMedian"),
    N(0, 0, "Range", 1, "Find the range of 14, 9, 21, 6, 17.", ["15"],
      r"Range = highest − lowest $= 21 - 6 = 15$.", basics="meanMedian"),
    N(0, 0, "Mean", 1, "Find the mean of 12, 15, 9 and 20.", ["14"],
      r"The total is 56, and $56 \div 4 = 14$.", basics="meanMedian"),
    S(0, 0, "Averages", 1, "What is the mode of 6, 9, 6, 2, 9, 9, 4?", ["2", "6", "7", "9"], 3,
      "9 appears three times, more than any other value. 6 is the median and 7 is the range.", basics="meanMedian", locked=True),
    N(0, 0, "Median", 2, "Find the median of 10, 4, 7, 15, 2, 9.", ["8"],
      r"In order: 2, 4, 7, 9, 10, 15. The middle two are 7 and 9, so the median is 8.", basics="meanMedian"),
    N(0, 0, "Mean", 2, "The mean of five numbers is 8. Four of them are 6, 11, 5 and 9. What is the fifth number?", ["9"],
      r"Five numbers with mean 8 total 40. The four given add to 31, so the fifth is 9.", basics="meanMedian"),
    S(0, 0, "Probability scale", 1, "Which probability describes an event that is certain to happen?", ["1", "0", "0.5", "100"], 0,
      "Probabilities run from 0 (impossible) to 1 (certain). 100 would only make sense as 100%."),
    N(0, 0, "Probability", 1, "A bag holds 4 red and 6 yellow beads. One bead is picked at random. What is the probability that it is red? Give your answer as a fraction or a decimal.", ["2/5", "0.4"],
      r"There are 10 beads and 4 are red, so the probability is $\frac{4}{10} = \frac{2}{5}$. $\frac{4}{6}$ compares red with yellow, which is a ratio, not a probability.", basics="probabilityTable"),
    N(0, 0, "Two-way tables", 2, "The table shows how 60 students travel to school. One student is chosen at random. What is the probability that the student is in Year 11 and takes the bus? Give your answer as a fraction.", ["4/15", "16/60"],
      r"16 of the 60 students are in Year 11 and take the bus, so the probability is $\frac{16}{60} = \frac{4}{15}$. $\frac{16}{30}$ is out of Year 11 only.",
      passage="| | Walk | Bus | Total |\n|---|---|---|---|\n| Year 10 | 18 | 12 | 30 |\n| Year 11 | 14 | 16 | 30 |\n| Total | 32 | 28 | 60 |",
      basics="probabilityTable", tol=0.001),
    S(0, 0, "Mode from a frequency table", 1, "The table shows the shoe sizes of 20 people. What is the modal shoe size?", ["5", "6", "7", "8"], 1,
      "Size 6 has the highest frequency, 7. Answering 7 picks the frequency instead of the shoe size.", basics="readingTable", locked=True, passage=SHOES),
    N(0, 0, "Median from a frequency table", 3, "The table shows the shoe sizes of 20 people. What is the median shoe size?", ["6.5"],
      r"The median is halfway between the 10th and 11th values. The first 3 are size 5 and the next 7 are size 6 (up to the 10th), so the 10th is 6 and the 11th is 7. The median is 6.5.",
      basics="readingTable", passage=SHOES),
    N(0, 0, "Mean from a frequency table", 2, "The table shows the number of goals scored in 20 football matches. Work out the mean number of goals per match.", ["1.45"],
      r"Total goals: $0 \times 4 + 1 \times 6 + 2 \times 7 + 3 \times 3 = 29$. $29 \div 20 = 1.45$.",
      passage="| Goals | Frequency |\n|---|---|\n| 0 | 4 |\n| 1 | 6 |\n| 2 | 7 |\n| 3 | 3 |", basics="readingTable"),
    S(0, 0, "Correlation", 2, "A scatter graph of height against shoe size for 30 adults shows that taller adults tend to have larger feet. What type of correlation is this?",
      ["Positive correlation", "Negative correlation", "No correlation", "Inverse proportion"], 0,
      "Both values go up together, so the correlation is positive. Negative correlation would mean taller people had smaller feet."),
    N(0, 0, "Relative frequency", 2, "A biased coin lands on heads 32 times in 80 throws. What is the relative frequency of heads? Give your answer as a fraction or a decimal.", ["0.4", "2/5"],
      r"Relative frequency = number of heads ÷ number of throws $= \frac{32}{80} = 0.4$."),
    N(0, 0, "Expected outcomes", 2, "The probability that a seed grows is 0.85. 300 seeds are planted. How many would you expect to grow?", ["255"],
      r"Expected number = probability × number of trials $= 0.85 \times 300 = 255$."),
    N(0, 0, "Pie charts", 2, "In a pie chart, a sector of 120° stands for 72 people. How many people does the whole pie chart stand for?", ["216"],
      r"120° is one third of 360°, so the whole chart is $72 \times 3 = 216$ people."),
    N(0, 0, "Venn diagrams", 3, "In a class of 28 students, 15 have a cat, 10 have a dog and 6 have neither. How many students have both a cat and a dog?", ["3"],
      r"$28 - 6 = 22$ students have a cat, a dog or both. $15 + 10 = 25$ counts the 'both' group twice, so $25 - 22 = 3$ have both."),
    S(0, 0, "Independent events", 3, "A fair coin is thrown and a fair six-sided dice is rolled. What is the probability of getting a head and a 6?",
      [r"$\frac{1}{12}$", r"$\frac{1}{8}$", r"$\frac{7}{12}$", r"$\frac{2}{3}$"], 0,
      r"Multiply the independent probabilities: $\frac{1}{2} \times \frac{1}{6} = \frac{1}{12}$. Adding them gives $\frac{2}{3}$, which is the wrong rule.", locked=True),
]
