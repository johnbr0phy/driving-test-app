"""Handling information and data (DfE Functional Skills Maths subject content,
Level 2 items 23 to 28: averages and range, grouped frequency, comparing data
sets, combined probability, probability as fractions, decimals and
percentages, scatter diagrams and correlation)."""
from fractions import Fraction as F
from common import mc, num, matrix, fmt, money_answers, unit_answers, pct_answers

D = "fsmData"
ITEMS = []
add = ITEMS.append


def grouped_mean(groups):
    """groups: [(low, high, freq)] of whole numbers; midpoint estimate."""
    total = sum(f for _, _, f in groups)
    return sum((lo + hi) / 2 * f for lo, hi, f in groups) / total


def table(head, rows):
    out = "| " + " | ".join(head) + " |\n|" + "---|" * len(head) + "\n"
    out += "\n".join("| " + " | ".join(str(c) for c in r) + " |" for r in rows)
    return out


# ---------------- Test 1, Section A (non-calculator) ----------------
add(mc(D, 1, "a", "Median", 1,
       "Five delivery drivers made these numbers of drops on Monday:\n\n14, 9, 21, 6, 17\n\nWhat is the median?",
       "14", ["21", "13.4", "15"],
       "Put them in order first: 6, 9, 14, 17, 21. The middle value is 14. 21 is the middle of the list before it was ordered, and 13.4 is the mean.",
       basics="fsmAverages"))

# ---------------- Test 2, Section A (non-calculator) ----------------
add(num(D, 2, "a", "Probability", 1,
        "A bag holds 3 red, 5 blue and 12 green counters. One counter is taken at random. What is the probability that it is blue, as a percentage?",
        pct_answers(25),
        "There are 3 + 5 + 12 = 20 counters and 5 are blue. 5/20 = 1/4 = 25%.",
        basics="fsmProbability"))

# ---------------- Test 1, Section B (calculator) ----------------
g = [(0, 4, 6), (5, 9, 10), (10, 14, 14), (15, 19, 10)]
add(num(D, 1, "b", "Mean from grouped data", 3,
        "A survey asked 40 people how many text messages they sent yesterday.\n\n" + table(["Texts sent", "Number of people"], [[f"{a} to {b}", f] for a, b, f in g]) +
        "\n\nEstimate the mean number of texts sent per person.",
        unit_answers(grouped_mean(g), ["texts"]),
        "Use the middle of each group: 2, 7, 12 and 17. Multiply by the frequencies: 12 + 70 + 168 + 170 = 420. Divide by 40 people: 420 ÷ 40 = 10.5.",
        basics="fsmGroupedMean"))
assert grouped_mean(g) == 10.5
add(mc(D, 1, "b", "Comparing data sets", 2,
       "Two quiz teams played ten rounds. Team A's mean score was 24 with a range of 6. Team B's mean score was 26 with a range of 19. Which statement is best supported by these figures?",
       "B scored more on average, but A was more consistent", ["A scored more on average, and B was more consistent", "B scored more on average and was more consistent", "A scored more on average, but B was less consistent"],
       "The higher mean (26) shows B scored more on average. The smaller range (6) shows A's scores were closer together, so A was more consistent.",
       basics="fsmAverages"))
tw = "A care home has 60 staff.\n\n" + table(["", "Day shift", "Night shift", "Total"], [["Full-time", 22, 14, 36], ["Part-time", 18, 6, 24], ["Total", 40, 20, 60]])
add(mc(D, 1, "b", "Two-way tables", 2,
       tw + "\n\nOne member of staff is chosen at random. What is the probability that they work part-time on the night shift?",
       "1/10", ["3/10", "1/4", "2/5"],
       "6 of the 60 staff are part-time night shift workers. 6/60 = 1/10. 3/10 (6 out of 20) only counts the night shift, and 1/4 (6 out of 24) only counts part-timers.",
       basics="fsmProbability"))
add(mc(D, 1, "b", "Combined events", 2,
       "Two fair six-sided dice are rolled and their scores are added. What is the probability of a total of 4?",
       "1/12", ["1/9", "1/6", "1/11"],
       "There are 6 × 6 = 36 equally likely outcomes. A total of 4 comes from 1+3, 2+2 and 3+1: 3 outcomes. 3/36 = 1/12. 1/11 wrongly treats the 11 possible totals as equally likely.",
       basics="fsmProbability"))
add(mc(D, 1, "b", "Scatter diagrams", 2,
       "Which pair of measurements would most likely show negative correlation on a scatter diagram?",
       "The age of a car and its value", ["A person's height and shoe size", "Outdoor temperature and ice cream sales", "A person's house number and their salary"],
       "As a car gets older its value usually falls: one goes up as the other goes down, which is negative correlation. Height and shoe size, and temperature and ice cream sales, rise together (positive). House numbers and salaries are not related.",
       basics="fsmScatter"))
shoes = [(5, 3), (6, 7), (7, 11), (8, 6), (9, 3)]
add(mc(D, 1, "b", "Mode", 1,
       "A shop recorded the shoe sizes of 30 customers.\n\n" + table(["Shoe size", "Number of customers"], shoes) + "\n\nWhat is the modal shoe size?",
       "7", ["11", "6", "4"],
       "The mode is the size with the highest frequency. Size 7 has 11 customers, more than any other. 11 is the frequency, not the shoe size, and 4 is the range of sizes.",
       basics="fsmAverages"))

# ---------------- Test 2, Section B (calculator) ----------------
g2 = [(0, 2, 14), (3, 5, 9), (6, 8, 5), (9, 11, 2)]
add(num(D, 2, "b", "Mean from grouped data", 3,
        "A college recorded the number of days each of 30 students was absent last term.\n\n" + table(["Days absent", "Number of students"], [[f"{a} to {b}", f] for a, b, f in g2]) +
        "\n\nEstimate the mean number of days absent per student.",
        unit_answers(grouped_mean(g2), ["days"]),
        "Midpoints: 1, 4, 7 and 10. 1 × 14 + 4 × 9 + 7 × 5 + 10 × 2 = 14 + 36 + 35 + 20 = 105. 105 ÷ 30 = 3.5 days.",
        basics="fsmGroupedMean"))
assert grouped_mean(g2) == 3.5
A, B = [12, 15, 15, 18, 20], [8, 14, 19, 21, 23]
assert sum(A) / 5 == 16 and sum(B) / 5 == 17
add(matrix(D, 2, "b", "Comparing data sets", 3,
           "Daily sales of a sandwich at two shops over five days:\n\nShop A: 12, 15, 15, 18, 20\n\nShop B: 8, 14, 19, 21, 23\n\nFor each statement, choose True or False.",
           ["Shop B has the higher mean", "Shop A has the larger range", "Both shops have the same median", "Shop A's sales are more consistent"],
           ["True", "False"], [0, 1, 1, 0],
           "Means: A = 80 ÷ 5 = 16, B = 85 ÷ 5 = 17, so B is higher. Ranges: A = 20 − 12 = 8, B = 23 − 8 = 15, so A's is smaller and A is more consistent. Medians: A = 15, B = 19, not the same.",
           basics="fsmAverages"))
add(mc(D, 2, "b", "Combined events", 2,
       "Spinner A is numbered 1, 2 and 3. Spinner B is numbered 1, 2, 3 and 4. Both are spun and the scores are added. What is the probability of a total of 5?",
       "1/4", ["1/12", "3/7", "5/12"],
       "There are 3 × 4 = 12 equally likely outcomes. A total of 5 comes from 1+4, 2+3 and 3+2: 3 outcomes. 3/12 = 1/4.",
       basics="fsmProbability"))
add(num(D, 2, "b", "Probability", 1,
        "A raffle sells 400 tickets. Jamie buys 12 of them. What is the probability that Jamie wins first prize, as a percentage?",
        pct_answers(3),
        "12/400 = 0.03 = 3%."))
add(num(D, 2, "b", "Scatter diagrams", 2,
        "A scatter diagram shows engine size (litres) against fuel economy (miles per gallon) for some cars. The line of best fit passes through (1.0, 60) and (3.0, 30). Use the line to estimate the fuel economy of a car with a 2.0 litre engine, in miles per gallon.",
        unit_answers(45, ["mpg"]),
        "2.0 litres is halfway between 1.0 and 3.0, so the estimate is halfway between 60 and 30: 45 mpg.",
        basics="fsmScatter"))
pets = [(0, 9), (1, 11), (2, 6), (3, 4)]
add(mc(D, 2, "b", "Median", 2,
       "30 people were asked how many pets they have.\n\n" + table(["Number of pets", "Number of people"], pets) + "\n\nWhat is the median number of pets?",
       "1", ["1.5", "7.5", "11"],
       "With 30 people, the median is between the 15th and 16th. The first 9 have 0 pets and the next 11 (10th to 20th) have 1, so both are 1. 7.5 is the median of the frequencies, which is not what is asked.",
       basics="fsmAverages"))

# ---------------- Drill only (calculator) ----------------
bills = [24, 31, 27, 36, 22]
add(num(D, 0, "b", "Mean", 1,
        "Hannah's phone bills for five months were £24, £31, £27, £36 and £22. What was the mean monthly bill, in pounds?",
        money_answers(sum(bills) / 5),
        "Add them: 24 + 31 + 27 + 36 + 22 = 140. Divide by 5: £28.", basics="fsmAverages"))
add(num(D, 0, "b", "Mean", 2,
        "The mean of four numbers is 13. Three of the numbers are 11, 16 and 8. What is the fourth number?",
        unit_answers(4 * 13 - 35, []),
        "Four numbers with a mean of 13 add up to 4 × 13 = 52. 11 + 16 + 8 = 35, so the fourth is 52 − 35 = 17.", whole=True, basics="fsmAverages"))
add(num(D, 0, "b", "Median", 2,
        "Find the median of: 23, 17, 31, 26, 19, 28",
        unit_answers(24.5, []),
        "In order: 17, 19, 23, 26, 28, 31. There are two middle values, 23 and 26. Halfway between them is 24.5.", basics="fsmAverages"))
add(mc(D, 0, "b", "Mode", 1,
       "What is the mode of: 3, 7, 4, 7, 2, 9, 4, 7",
       "7", ["4", fmt(43 / 8), "9"],
       "The mode is the value that appears most often. 7 appears three times; 4 appears only twice.", basics="fsmAverages"))
add(num(D, 0, "b", "Range", 2,
        "The lowest overnight temperatures one week were −3°C, 2°C, −6°C, 1°C and 4°C. What is the range, in degrees?",
        unit_answers(10, ["°C", "degrees"]),
        "Range = highest − lowest = 4 − (−6) = 10 degrees.", basics="fsmAverages"))
add(mc(D, 0, "b", "Comparing data sets", 2,
       "Two machines fill bags of flour that should weigh 500 g. Machine A: median 502 g, range 4 g. Machine B: median 500 g, range 15 g. Which machine is better, and why?",
       "A, because its weights vary much less", ["B, because its median is exactly 500 g", "A, because its median is higher", "B, because its range is larger"],
       "Both medians are close to 500 g, but B's range of 15 g means some bags are far from the target. A's bags are all within a few grams, which matters more.", basics="fsmAverages"))
g3 = [(0, 4, 10), (5, 9, 6), (10, 14, 3), (15, 19, 1)]
late = table(["Minutes late", "Number of buses"], [[f"{a} to {b}", f] for a, b, f in g3])
add(num(D, 0, "b", "Mean from grouped data", 3,
        "This table shows how late 20 buses were.\n\n" + late + "\n\nEstimate the mean number of minutes late.",
        unit_answers(grouped_mean(g3), ["minutes"]),
        "Midpoints 2, 7, 12, 17. 2 × 10 + 7 × 6 + 12 × 3 + 17 × 1 = 20 + 42 + 36 + 17 = 115. 115 ÷ 20 = 5.75 minutes.", basics="fsmGroupedMean"))
assert grouped_mean(g3) == 5.75
add(mc(D, 0, "b", "Mean from grouped data", 2,
       "Why is a mean worked out from a grouped frequency table only an estimate?",
       "The exact values in each group are not known", ["The groups are not all the same size", "The total frequency might be wrong", "Midpoints are always bigger than the real values"],
       "The table says how many values are in each group, not what they are. Using the midpoint assumes they sit in the middle on average, so the answer is an estimate.", basics="fsmGroupedMean"))
add(mc(D, 0, "b", "Modal class", 1,
       "This table shows how late 20 buses were.\n\n" + late + "\n\nWhich is the modal class?",
       "0 to 4 minutes", ["5 to 9 minutes", "10 to 14 minutes", "15 to 19 minutes"],
       "The modal class is the group with the highest frequency: 10 buses were 0 to 4 minutes late.", basics="fsmGroupedMean"))
goals = [(0, 4), (1, 7), (2, 6), (3, 3)]
add(num(D, 0, "b", "Mean from a frequency table", 2,
        "A football team's goals in 20 matches:\n\n" + table(["Goals scored", "Number of matches"], goals) + "\n\nWhat is the mean number of goals per match?",
        unit_answers(sum(x * f for x, f in goals) / 20, ["goals"]),
        "Total goals: 0 × 4 + 1 × 7 + 2 × 6 + 3 × 3 = 0 + 7 + 12 + 9 = 28. 28 ÷ 20 = 1.4 goals per match.", basics="fsmGroupedMean"))
travel = table(["", "Walk", "Bus", "Car", "Total"], [["Year 7", 25, "", 10, 60], ["Year 8", 18, 30, "", 55], ["Total", "", "", "", 115]])
add(num(D, 0, "b", "Two-way tables", 2,
        "This two-way table shows how pupils travel to school. Some cells are blank.\n\n" + travel + "\n\nHow many Year 8 pupils travel by car?",
        unit_answers(55 - 18 - 30, ["pupils"]),
        "The Year 8 row adds up to 55. 18 walk and 30 take the bus, so 55 − 48 = 7 come by car.", whole=True, basics="fsmProbability"))
full = table(["", "Walk", "Bus", "Car", "Total"], [["Year 7", 25, 25, 10, 60], ["Year 8", 18, 30, 7, 55], ["Total", 43, 55, 17, 115]])
add(mc(D, 0, "b", "Two-way tables", 2,
       "This two-way table shows how pupils travel to school.\n\n" + full + "\n\nOne pupil is chosen at random from all 115. What is the probability that the pupil walks?",
       "43/115", ["25/60", "18/55", "43/72"],
       "43 of the 115 pupils walk, so the probability is 43/115. 25/60 is the chance only among Year 7.", basics="fsmProbability"))
add(mc(D, 0, "b", "Two-way tables", 3,
       "This two-way table shows how pupils travel to school.\n\n" + full + "\n\nA Year 7 pupil is chosen at random. What is the probability that they come by bus?",
       "5/12", ["5/23", "5/11", "1/4"],
       "Only Year 7 counts now: 25 of the 60 come by bus. 25/60 = 5/12. 5/23 is 25 out of all 115 pupils, and 5/11 is 25 out of all 55 bus users.", basics="fsmProbability"))
add(mc(D, 0, "b", "Combined events", 1,
       "Two fair coins are flipped. What is the probability of getting one head and one tail?",
       "1/2", ["1/3", "1/4", "2/3"],
       "The outcomes are HH, HT, TH and TT. Two of the four (HT and TH) are one of each, so 2/4 = 1/2. 1/3 wrongly treats 'one of each' as a single outcome.", basics="fsmProbability"))
add(mc(D, 0, "b", "Combined events", 1,
       "A fair six-sided dice is rolled twice. What is the probability of getting two sixes?",
       "1/36", ["1/12", "1/6", "1/3"],
       "1/6 × 1/6 = 1/36. A table of both rolls has 36 squares and only one is 6 and 6.", basics="fsmProbability"))
add(num(D, 0, "b", "Combined events", 1,
        "A spinner has four colours: red, blue, green and yellow. It is spun once and a coin is flipped once. How many different outcomes are there?",
        unit_answers(8, ["outcomes"]),
        "Each of the 4 colours can go with heads or tails: 4 × 2 = 8 outcomes.", whole=True, basics="fsmProbability"))
add(mc(D, 0, "b", "Probability as fractions, decimals and percentages", 1,
       "The probability that a game piece lands on a star is 3/8. What is this as a decimal?",
       "0.375", ["0.38", "3.8", "0.0375"],
       "3 ÷ 8 = 0.375. 0.38 is rounded, and a probability can never be more than 1, so 3.8 is impossible.", basics="fsmProbability"))
add(num(D, 0, "b", "Probability as fractions, decimals and percentages", 1,
        "The probability that a train is late is 0.07. What is this as a percentage?",
        pct_answers(7),
        "Multiply by 100: 0.07 × 100 = 7%.", basics="fsmProbability"))
add(num(D, 0, "b", "Probability", 1,
        "The probability that Owen wins a game is 0.18. What is the probability that he does not win?",
        unit_answers(0.82, []),
        "The probabilities of something happening and not happening add up to 1. 1 − 0.18 = 0.82.", basics="fsmProbability"))
add(num(D, 0, "b", "Probability", 2,
        "The probability that a seed grows is 0.85. A gardener plants 140 seeds. How many would she expect to grow?",
        unit_answers(119, ["seeds"]),
        "Expected number = probability × number of tries = 0.85 × 140 = 119.", whole=True, basics="fsmProbability"))
add(mc(D, 0, "b", "Scatter diagrams", 1,
       "The points on a scatter diagram are spread all over the grid with no pattern. What does this show?",
       "No correlation", ["Positive correlation", "Negative correlation", "Strong correlation"],
       "When the points show no upward or downward trend, the two things are not related: no correlation."))
add(mc(D, 0, "b", "Scatter diagrams", 2,
       "A scatter diagram shows strong positive correlation between hours of sunshine and the number of sunglasses a shop sells. Which statement is true?",
       "The two tend to rise together", ["Sunshine is proved to cause the sales", "Every sunny day has high sales", "There is no link between them"],
       "Positive correlation means that as one goes up the other tends to go up. It does not prove cause, and individual days can still break the pattern.", basics="fsmScatter"))
add(num(D, 0, "b", "Scatter diagrams", 2,
        "A line of best fit on a scatter diagram passes through (10, 22) and (30, 58). Use the line to estimate the value of y when x = 20.",
        unit_answers(40, []),
        "x = 20 is halfway between 10 and 30, so y is halfway between 22 and 58: (22 + 58) ÷ 2 = 40.", basics="fsmScatter"))
add(mc(D, 0, "b", "Scatter diagrams", 1,
       "On a scatter diagram, what do we call one point that lies far away from the pattern of all the others?",
       "An outlier", ["The mode", "The line of best fit", "The median"],
       "A point that does not fit the pattern of the rest is an outlier. It is often left out when drawing the line of best fit."))
add(mc(D, 0, "b", "Scatter diagrams", 2,
       "A line of best fit is drawn using data for people aged 20 to 50. Why is it unreliable to use it to estimate a value for someone aged 80?",
       "The trend may not carry on past the data", ["The line of best fit is always wrong", "Older people are never included in surveys", "Lines of best fit only work for middle values"],
       "Estimating outside the range of the data (extrapolating) assumes the trend carries on, which it may not. Estimates inside the range are more reliable.", basics="fsmScatter"))
add(matrix(D, 0, "b", "Comparing data sets", 2,
           "Class A's test scores have a mean of 62 and a range of 30. Class B's scores have a mean of 58 and a range of 12. For each statement, choose True or False.",
           ["Class A had the higher mean", "Class B had the smaller range", "Class A's scores were more spread out", "Class B did better on average"],
           ["True", "False"], [0, 0, 0, 1],
           "A's mean (62) is higher than B's (58), so B did not do better on average. B's range (12) is smaller, so A's scores were more spread out.",
           basics="fsmAverages"))
times = [12.4, 11.8, 13.1, 12.0, 12.9]
add(mc(D, 0, "b", "Median", 2,
       "Five runners' times in seconds were: 12.4, 11.8, 13.1, 12.0, 12.9. What is the median time?",
       "12.4 seconds", ["13.1 seconds", f"{sum(times) / 5:.2f} seconds", "1.3 seconds"],
       "In order: 11.8, 12.0, 12.4, 12.9, 13.1. The middle value is 12.4. 13.1 is the middle of the unordered list, 12.44 is the mean and 1.3 is the range.", basics="fsmAverages"))
add(num(D, 0, "b", "Range", 2,
        "A set of temperatures has a lowest value of 2.6°C and a range of 5.9 degrees. What is the highest value, in °C?",
        unit_answers(8.5, ["°C"]),
        "Range = highest − lowest, so highest = lowest + range = 2.6 + 5.9 = 8.5°C.", basics="fsmAverages"))
add(num(D, 0, "b", "Mean", 3,
        "The mean number of hours worked by 5 staff is 32. A sixth person joins who works 20 hours. What is the new mean for all 6 staff, in hours?",
        unit_answers((5 * 32 + 20) / 6, ["hours"]),
        "Total for 5 staff: 5 × 32 = 160 hours. Add 20: 180 hours. 180 ÷ 6 = 30 hours.", basics="fsmAverages"))
ages = [("16 to 25", 7), ("26 to 35", 12), ("36 to 45", 9), ("46 to 55", 6), ("56 to 65", 1)]
add(mc(D, 0, "b", "Median from grouped data", 3,
       "The ages of 35 people at a training day:\n\n" + table(["Age", "Number of people"], ages) + "\n\nWhich age group contains the median?",
       "26 to 35", ["36 to 45", "16 to 25", "46 to 55"],
       "With 35 people the median is the 18th. The first 7 are 16 to 25 and the next 12 (8th to 19th) are 26 to 35, so the 18th is in 26 to 35.", basics="fsmGroupedMean"))
