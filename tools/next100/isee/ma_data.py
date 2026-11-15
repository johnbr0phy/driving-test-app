# ISEE Middle Level, Mathematics Achievement: data analysis and probability.
# Original items; tables are described in words.


def M(test, diff, skill, stem, key, wrong, expl, basics=None):
    return dict(test=test, skill=skill, diff=diff, stem=stem, key=key, wrong=wrong, expl=expl, basics=basics)


ITEMS = [
    # ---------------- Practice Test 1 ----------------
    M(1, 1, "Mode", "What is the mode of 3, 7, 7, 8 and 10?",
      "7", ["8", "10", "35"],
      "The mode is the value that appears most often, and 7 appears twice. 35 is the sum."),
    M(1, 1, "Mean", "What is the mean of 12, 15, 18 and 15?",
      "15", ["16", "18", "60"],
      "The sum is 60 and there are 4 numbers, so the mean is 60 ÷ 4 = 15. 18 is the greatest value, not the mean."),
    M(1, 2, "Range", "What is the range of 14, 9, 22, 17 and 11?",
      "13", ["14.6", "22", "31"],
      "The range is the greatest value minus the least: 22 - 9 = 13. 14.6 is the mean."),
    M(1, 2, "Percent of a total", "In a class vote, 12 students chose apples, 8 chose bananas, 10 chose grapes and 10 chose pears. What percent chose apples?",
      "30%", ["12%", "25%", "40%"],
      "40 students voted in all, and 12 out of 40 is 0.3, or 30%. 12% treats the 12 votes as if the total were 100."),
    M(1, 3, "Compound probability", "Two fair number cubes, each numbered 1 to 6, are rolled. What is the probability that the sum is 7?",
      "1/6", ["1/12", "7/36", "1/2"],
      "There are 36 equally likely pairs, and 6 of them add to 7 (1 and 6, 2 and 5, 3 and 4, and the same pairs reversed). 6/36 = 1/6."),
    M(1, 3, "Probability without replacement", "A bag has 4 red and 6 blue marbles. Two marbles are drawn without putting the first back. What is the probability that both are red?",
      "2/15", ["4/25", "3/10", "2/5"],
      "The first is red with probability 4/10, and then 3 of the 9 left are red, so 4/10 × 3/9 = 12/90 = 2/15. 4/25 would be right only if the first marble went back."),
    # ---------------- Practice Test 2 ----------------
    M(2, 1, "Percent of a total", "In a survey of 200 students, 35% said they walk to school. How many students walk?",
      "70", ["35", "40", "65"],
      "35% of 200 is 0.35 × 200 = 70. 35 is the percent, not the number of students."),
    M(2, 1, "Reading a table", "A table shows the books checked out of a library: Monday 14, Tuesday 9, Wednesday 16 and Thursday 11. How many more books were checked out on the busiest day than on the slowest day?",
      "7", ["2", "5", "50"],
      "The busiest day, Wednesday, had 16 and the slowest, Tuesday, had 9: 16 - 9 = 7. 50 is the total for all four days."),
    M(2, 2, "Median", "What is the median of 5, 12, 3, 9, 6 and 10?",
      "7.5", ["6", "9", "15"],
      "In order: 3, 5, 6, 9, 10, 12. With an even count, the median is the mean of the middle two: (6 + 9) ÷ 2 = 7.5."),
    M(2, 2, "Expected count", "A jar holds 30 marbles. The probability of picking a green marble is 2/5. How many marbles are green?",
      "12", ["2", "5", "18"],
      "2/5 of 30 is 30 ÷ 5 × 2 = 12. 18 is the number that are not green."),
    M(2, 3, "Compound probability", "A fair coin is flipped and a fair number cube numbered 1 to 6 is rolled. What is the probability of heads and a 6?",
      "1/12", ["1/8", "1/6", "2/3"],
      "The two events are independent, so multiply: 1/2 × 1/6 = 1/12. Adding them gives 2/3, which is not how \"and\" works."),
    M(2, 3, "Mean", "Lena's first three test scores are 80, 85 and 90. What must she score on the fourth test for a mean of 87?",
      "93", ["87", "90", "95"],
      "A mean of 87 over 4 tests needs a total of 348. Her first three add to 255, so she needs 348 - 255 = 93."),
    # ---------------- Drill only ----------------
    M(0, 1, "Counting outcomes", "Ken has 3 shirts and 4 pairs of pants. How many different outfits of one shirt and one pair of pants can he make?",
      "12", ["7", "24", "64"],
      "Each of the 3 shirts goes with each of the 4 pairs of pants, so there are 3 × 4 = 12 outfits. 7 adds them instead."),
    M(0, 1, "Probability", "The letters of the word MATH are written on cards and one card is picked at random. What is the probability of picking a vowel?",
      "1/4", ["1/3", "1/2", "3/4"],
      "Only A is a vowel, so the probability is 1 out of 4. 3/4 is the probability of a consonant."),
    M(0, 2, "Mode", "What is the mode of 2, 4, 4, 5, 5, 5 and 9?",
      "5", ["4", "7", "9"],
      "5 appears three times, more than any other value, so it is the mode. 7 is the range."),
    M(0, 3, "Mean after a change", "The mean of six numbers is 9. One of the numbers, 14, is removed. What is the mean of the five numbers left?",
      "8", ["9", "10", "40"],
      "The six numbers add to 6 × 9 = 54. Removing 14 leaves 40, and 40 ÷ 5 = 8."),
]
