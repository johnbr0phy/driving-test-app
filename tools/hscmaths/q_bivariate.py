"""Bivariate data analysis (Year 12 Standard 2 focus area). Pearson's r and
the least-squares line are computed here, as a calculator would."""
import math
from common import S, N

DOMAIN = "hscmathsBivariate"


def pearson(xs, ys):
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    sxy = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    sxx = sum((x - mx) ** 2 for x in xs)
    syy = sum((y - my) ** 2 for y in ys)
    return sxy / math.sqrt(sxx * syy)


def lsq(xs, ys):
    n = len(xs)
    mx, my = sum(xs) / n, sum(ys) / n
    b = sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs)
    return b, my - b * mx  # gradient, intercept


def table(xh, yh, xs, ys):
    return "\n".join([f"| {xh} | " + " | ".join(str(x) for x in xs) + " |",
                      "|---|" + "---|" * len(xs),
                      f"| {yh} | " + " | ".join(str(y) for y in ys) + " |"])


def f2(x):
    return f"{x:.2f}"


X1, Y1 = [2, 4, 5, 7, 8, 10], [52, 58, 61, 66, 72, 79]
r1 = pearson(X1, Y1)
X2, Y2 = [18, 21, 24, 27, 30, 33], [120, 138, 155, 170, 191, 204]
b2, a2 = lsq(X2, Y2)
X3, Y3 = [1, 2, 3, 4, 5, 6, 7], [32, 28, 25, 21, 19, 16, 14]
r3 = pearson(X3, Y3)
b3, a3 = lsq(X3, Y3)
X4, Y4 = [150, 158, 163, 170, 176, 184], [148, 160, 161, 172, 175, 186]
r4 = pearson(X4, Y4)
b4, a4 = lsq(X4, Y4)
T1 = table("Practice (hours)", "Test score", X1, Y1)
T2 = table("Max. temperature (°C)", "Drinks sold", X2, Y2)
T3 = table("Age of car (years)", "Price (\\$'000)", X3, Y3)
T4 = table("Arm span (cm)", "Height (cm)", X4, Y4)

ITEMS = [
    # ---- Practice Test 1, Section I
    S(1, 1, 1, "Describing correlation",
      "The correlation coefficient between the age of a car and its price is $r = -0.86$. How is this correlation best described?",
      ["Strong and negative", "Weak and negative", "Strong and positive", "Moderate and positive"],
      "The sign gives the direction (negative: price falls as age rises) and the size, 0.86, close to 1, shows a strong linear relationship."),
    S(1, 1, 1, "Interpolation and extrapolation",
      "A least-squares line is used to predict a value well outside the range of the data. What is this called?",
      ["Extrapolation", "Interpolation", "Correlation", "Causation"],
      "Predicting outside the range of the data is extrapolation, which is less reliable because the trend may not continue. Inside the range it is interpolation."),
    # ---- Practice Test 1, Section II
    N(1, 2, 1, "Prediction from a least-squares line",
      "The least-squares regression line for hours studied, $x$, and exam mark, $y$, is $y = 2.4x + 15$. Predict the mark for a student who studies for 12 hours.",
      ["43.8"],
      r"$y = 2.4 \times 12 + 15 = 28.8 + 15 = 43.8$.",
      tol=0.01, basics="substitution"),
    N(1, 2, 2, "Pearson's correlation coefficient",
      "The table shows hours of practice and test scores for six students.\n\n" + T1 + "\n\nUse your calculator to find Pearson's correlation coefficient, correct to 2 decimal places.",
      [f2(r1)],
      f"Entering the data in statistics mode gives r = {r1:.4f}, which is {f2(r1)}: a very strong positive correlation.",
      tol=0.005),
    S(1, 2, 2, "Correlation and causation",
      "In one town, months with high ice cream sales also have more drownings, with a strong positive correlation. What can be concluded?",
      ["They are linked, but neither need cause the other", "Eating ice cream makes people more likely to drown",
       "Drownings in the town cause ice cream sales to rise", "The correlation must come from a calculation error"],
      "Correlation shows association, not causation. Here a third factor, hot weather, raises both swimming and ice cream sales."),
    # ---- Practice Test 2, Section I
    S(2, 1, 1, "Independent and dependent variables",
      "A study investigates whether the hours of sleep a person gets affect their reaction time. Which is the independent variable?",
      ["Hours of sleep", "Reaction time", "The number of people tested", "The time of day of the test"],
      "The independent variable is the one thought to cause change, and it goes on the horizontal axis. Reaction time depends on it, so it is the dependent variable."),
    S(2, 1, 1, "Matching r to a description",
      "Which value of $r$ shows a moderate positive linear association?",
      ["0.62", "-0.62", "0.08", "-0.97"],
      "Positive r means both variables rise together; 0.62 is moderate. 0.08 is close to no correlation and -0.97 is strong and negative."),
    # ---- Practice Test 2, Section II
    N(2, 2, 2, "Gradient of the least-squares line",
      "A café records the maximum temperature and the number of cold drinks sold on six days.\n\n" + T2 + "\n\nUse your calculator to find the gradient of the least-squares regression line, correct to 2 decimal places.",
      [f2(b2)],
      f"The calculator's linear regression gives y = {b2:.4f}x + {a2:.4f}, so the gradient is {f2(b2)}: about {b2:.1f} more drinks for each extra degree.",
      tol=0.005),
    N(2, 2, 2, "Using a line in reverse",
      "The least-squares line for a data set is $y = 0.65x + 12$. For what value of $x$ does the line predict $y = 38$?",
      ["40"],
      r"$0.65x + 12 = 38$, so $0.65x = 26$ and $x = 40$.",
      basics="solveX"),
    S(2, 2, 2, "Reliability of a prediction",
      "A least-squares line was fitted to data with $x$ values from 10 to 50, and $r = 0.95$. Which prediction is the most reliable?",
      ["The prediction at x = 30", "The prediction at x = 75", "The prediction at x = 100", "The prediction at x = 0"],
      "x = 30 is inside the data range (interpolation) and the correlation is strong. The other values are extrapolation, beyond the data, so less reliable."),
    # ---- Drill only
    S(0, 2, 1, "Describing correlation",
      "Which description fits $r = 0.31$?",
      ["Weak positive correlation", "Strong positive correlation", "Weak negative correlation", "Perfect positive correlation"],
      "0.31 is positive but well short of 1, so the linear relationship is weak and points rise only loosely together."),
    S(0, 2, 1, "Meaning of r = -1",
      "What does a correlation coefficient of $r = -1$ mean?",
      ["All points lie exactly on a line with negative gradient", "There is no relationship at all",
       "All points lie exactly on a line with positive gradient", "The points form a curve"],
      "r = -1 is perfect negative linear correlation: every point is on one straight line that slopes down. r = 0 would be no linear relationship."),
    N(0, 2, 1, "Prediction from a least-squares line",
      "The least-squares line for the number of hours of sunshine, $x$, and the number of beachgoers, $y$, is $y = 85x - 40$. Predict the number of beachgoers when there are 9 hours of sunshine.",
      ["725"],
      r"$y = 85 \times 9 - 40 = 765 - 40 = 725$.",
      basics="substitution"),
    N(0, 2, 2, "Prediction from a least-squares line",
      "The least-squares line for a car's age in years, $x$, and its value in thousands of dollars, $y$, is $y = 34.2 - 2.9x$. Predict the value of a 6-year-old car, in thousands of dollars.",
      ["16.8"],
      r"$y = 34.2 - 2.9 \times 6 = 34.2 - 17.4 = 16.8$ thousand dollars.",
      tol=0.01, basics="substitution"),
    N(0, 2, 2, "Pearson's correlation coefficient",
      "The table shows the ages and prices of seven used cars of one model.\n\n" + T3 + "\n\nUse your calculator to find Pearson's correlation coefficient, correct to 2 decimal places.",
      [f2(r3)],
      f"Statistics mode gives r = {r3:.4f}, which is {f2(r3)}: a very strong negative correlation, as older cars sell for less.",
      tol=0.005),
    N(0, 2, 2, "Pearson's correlation coefficient",
      "The table shows the arm spans and heights of six students.\n\n" + T4 + "\n\nUse your calculator to find Pearson's correlation coefficient, correct to 2 decimal places.",
      [f2(r4)],
      f"Statistics mode gives r = {r4:.4f}, which is {f2(r4)}: strong and positive.",
      tol=0.005),
    N(0, 2, 2, "Gradient of the least-squares line",
      "The table shows the ages and prices of seven used cars of one model.\n\n" + T3 + "\n\nUse your calculator to find the gradient of the least-squares regression line, correct to 2 decimal places.",
      [f2(b3)],
      f"Linear regression gives y = {b3:.4f}x + {a3:.4f}. The gradient {f2(b3)} means the price falls by about \\${-b3 * 1000:.0f} for each extra year of age.",
      tol=0.005),
    N(0, 2, 3, "Intercept of the least-squares line",
      "The table shows the arm spans and heights of six students.\n\n" + T4 + "\n\nUse your calculator to find the $y$-intercept of the least-squares regression line, correct to 1 decimal place.",
      [f"{a4:.1f}"],
      f"Linear regression gives y = {b4:.4f}x + ({a4:.4f}), so the intercept is {a4:.1f}. It has no real meaning here, since nobody has an arm span of 0 cm.",
      tol=0.05),
    S(0, 2, 2, "Interpreting the gradient",
      "For a sample of houses, the least-squares line for floor area $x$ (m²) and price $y$ (\\$'000) is $y = 3.5x + 210$. What does 3.5 tell you?",
      [r"Each extra square metre adds about \$3500 to the price", r"Each extra square metre adds about \$3.50 to the price",
       r"A house with no floor area costs \$3500", r"The price is 3.5 times the floor area"],
      r"The gradient is the change in $y$ for each unit of $x$. $y$ is in thousands of dollars, so 3.5 means about \$3500 per square metre."),
    S(0, 2, 2, "Interpreting the intercept",
      "The least-squares line for the number of hours a heater runs, $x$, and the daily electricity cost in dollars, $y$, is $y = 1.20 + 0.45x$. What does 1.20 represent?",
      [r"The cost, \$1.20, on a day the heater is off", r"The cost of each extra hour the heater runs",
       r"The number of hours of heating that costs \$1", r"The total cost of a full day of heating"],
      r"The intercept is the value of $y$ when $x = 0$, the cost of other appliances with no heating. 0.45 is the cost per hour."),
    S(0, 2, 1, "Interpolation and extrapolation",
      "Data on children aged 4 to 12 years is used to predict the height of a child aged 8. What is this called?",
      ["Interpolation", "Extrapolation", "Causation", "Regression to the mean"],
      "Age 8 lies inside the range of the data (4 to 12), so the prediction is interpolation, which is usually reliable when correlation is strong."),
    S(0, 2, 2, "Limits of extrapolation",
      "Data on children aged 4 to 12 shows height increasing by about 6 cm a year. Why should the line not be used to predict height at age 40?",
      ["Age 40 is far outside the data, and growth stops in adulthood", "The correlation between age and height turns negative for adults",
       "The line can only be used to predict heights for ages under 4", "Heights can never be predicted from ages with a regression line"],
      "Extrapolating that far assumes the linear trend continues, but people stop growing, so the prediction would be wildly too large."),
    S(0, 2, 1, "Dependent variable",
      "A researcher studies how the amount of fertiliser used affects the yield of a wheat crop. Which variable goes on the vertical axis of the scatterplot?",
      ["The crop yield", "The amount of fertiliser", "The size of the paddock", "The number of paddocks"],
      "The dependent variable, the one that responds, goes on the vertical axis. Yield depends on the fertiliser, the independent variable."),
    S(0, 2, 2, "Effect of an outlier",
      "A scatterplot shows a strong positive trend, except for one point far below the others. What happens to $r$ if that outlier is removed?",
      ["r gets closer to 1", "r gets closer to 0", "r changes sign", "r does not change"],
      "The outlier weakens the linear pattern. Without it the points sit closer to a line, so the correlation becomes stronger, nearer 1."),
    N(0, 2, 2, "Using a line in reverse",
      "The least-squares line for weekly advertising spending in dollars, $x$, and sales in dollars, $y$, is $y = 4.2x + 1500$. How much advertising spending is predicted to give sales of \\$3600? Answer in dollars.",
      ["500"],
      r"$4.2x + 1500 = 3600$, so $4.2x = 2100$ and $x = 500$.",
      basics="solveX"),
    N(0, 2, 1, "Using the regression equation",
      "A calculator gives a least-squares line $y = a + bx$ with $a = 3.2$ and $b = 0.85$. What is the predicted value of $y$ when $x = 20$?",
      ["20.2"],
      r"$y = 3.2 + 0.85 \times 20 = 3.2 + 17 = 20.2$.",
      tol=0.01, basics="substitution"),
    S(0, 2, 1, "Bivariate data",
      "Which of these is bivariate data?",
      ["The height and mass of each student in a class", "The heights of the students in a class",
       "The favourite sport of each student in a class", "The number of students in each class"],
      "Bivariate data records two variables for each individual, so they can be compared. The others record only one variable."),
    S(0, 2, 2, "Direction of association",
      "As the number of hours of daylight increases, household heating costs tend to decrease. Which is the most likely value of $r$?",
      ["-0.78", "0.78", "0", "1.78"],
      "One variable rises as the other falls, so r is negative. r can never be more than 1, which rules out 1.78."),
    S(0, 2, 2, "Choosing a prediction method",
      "Which condition makes a prediction from a least-squares line most trustworthy?",
      ["A strong correlation and a value inside the data range", "A weak correlation and a value inside the data range",
       "A strong correlation and a value far outside the data range", "A correlation close to 0"],
      "Predictions are best when the points sit close to the line (strong r) and the value is interpolated, not extrapolated."),
    N(0, 2, 2, "Gradient between two predictions",
      "A least-squares line predicts $y = 52$ when $x = 10$ and $y = 76$ when $x = 18$. What is the gradient of the line?",
      ["3"],
      r"Gradient $= \frac{76 - 52}{18 - 10} = \frac{24}{8} = 3$.",
      basics="slope"),
]
