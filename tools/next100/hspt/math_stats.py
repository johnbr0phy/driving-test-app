# HSPT Mathematics: statistics and probability (mean, median, range, probability, tables). Original items.
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Mean", diff=1,
       stem="What is the mean of 6, 15, 9, 20 and 10?",
       key="12", wrong=["10", "14", "15"],
       expl="The sum is 6 + 15 + 9 + 20 + 10 = 60, and 60 ÷ 5 = 12. 10 is the median, the middle number in order."),
  dict(test=1, skill="Probability", diff=1,
       stem="A bag holds 4 red, 5 blue and 3 green marbles. One marble is drawn without looking. What is the probability that it is blue?",
       key="5/12", wrong=["1/5", "1/3", "5/7"],
       expl="There are 4 + 5 + 3 = 12 marbles and 5 of them are blue, so the probability is 5/12. 5/7 compares blue with the other marbles instead of with all of them."),
  dict(test=1, skill="Range", diff=1,
       stem="Five test scores are 78, 85, 92, 85 and 70. What is their range?",
       key="22", wrong=["14", "82", "85"],
       expl="The range is the highest score minus the lowest: 92 - 70 = 22. 82 is the mean and 85 is the median and mode."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Median", diff=2,
       stem="What is the median of 3, 8, 11, 4, 7 and 15?",
       key="7.5", wrong=["7", "8", "11"],
       expl="In order the numbers are 3, 4, 7, 8, 11, 15. With six numbers, the median is halfway between the middle two: (7 + 8) ÷ 2 = 7.5. 8 is the mean."),
  dict(test=2, skill="Compound probability", diff=2,
       stem="A fair coin is flipped twice. What is the probability of getting heads both times?",
       key="1/4", wrong=["1/8", "1/3", "1/2"],
       expl="Each flip has a 1/2 chance of heads, so two heads in a row is 1/2 × 1/2 = 1/4. The four equally likely results are HH, HT, TH and TT."),
  dict(test=2, skill="Reading a table", diff=3,
       stem="A store's sales for four days are shown in the table. What percent of the four days' sales were on Thursday?",
       passage="| Day | Items sold |\n|---|---|\n| Monday | 40 |\n| Tuesday | 25 |\n| Wednesday | 35 |\n| Thursday | 50 |",
       key="33 1/3%", wrong=["20%", "25%", "50%"],
       expl="The total is 40 + 25 + 35 + 50 = 150, and 50 out of 150 is 1/3, or 33 1/3%. 50% would compare Thursday with 100 items, not the total."),

  # ---------------- Drill only ----------------
  dict(test=0, skill="Probability", diff=1,
       stem="A spinner has 8 equal sections numbered 1 to 8. What is the probability of landing on a number greater than 5?",
       key="3/8", wrong=["1/4", "1/2", "5/8"],
       expl="The numbers greater than 5 are 6, 7 and 8, so 3 of the 8 sections win: 3/8. 5/8 counts the numbers from 1 to 5 instead."),
]
