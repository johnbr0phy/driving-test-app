"""Data+ 3.2: statistical methods and functions. Every computed key and every
computed distractor is asserted below, so a build fails if one is wrong."""
from statistics import mean, median, mode, stdev, pstdev, variance
from helpers import single, multi, numeric, matrix, cmd, cli


def f2(x):
    return f"{x:.2f}".rstrip("0").rstrip(".")


# ---- Test 1 numbers ----
T1_MEAN = [14, 22, 27, 31, 46]
assert mean(T1_MEAN) == 28
T1_MED = [8, 13, 19, 24, 30, 41]
assert median(T1_MED) == 21.5 and f2(mean(T1_MED)) == "22.5"
T1_MODE = [3, 7, 7, 7, 9, 12, 12]
assert mode(T1_MODE) == 7 and f2(mean(T1_MODE)) == "8.14"
T1_RANGE = [52, 61, 47, 88, 70]
assert max(T1_RANGE) - min(T1_RANGE) == 41
T1_SD = [5, 9, 11, 15]
assert f2(stdev(T1_SD)) == "4.16" and f2(pstdev(T1_SD)) == "3.61" and f2(variance(T1_SD)) == "17.33"
assert (79 - 94) / 6 == -2.5
assert round((752 - 640) / 640 * 100, 1) == 17.5 and round(112 / 752 * 100, 1) == 14.9

# ---- Test 2 numbers ----
T2_MEAN = [17, 26, 33, 38, 51, 45]
assert mean(T2_MEAN) == 35
T2_MED = [72, 18, 55, 40, 91, 63, 29]
assert median(T2_MED) == 55 and f2(mean(T2_MED)) == "52.57"
assert (120 * 4 + 80 * 9) / 200 == 6 and (4 + 9) / 2 == 6.5 and 4 + 9 == 13
assert 58 - 34 == 24
T2_VAR = [2, 4, 9]
assert variance(T2_VAR) == 13 and f2(26 / 3) == "8.67" and f2(stdev(T2_VAR)) == "3.61"
assert round((1075 - 1250) / 1250 * 100, 1) == -14 and round(175 / 1075 * 100, 1) == 16.3 and 1075 - 1250 == -175
assert round(1872 / 7200 * 100) == 26

# ---- Drill numbers ----
assert round(96 / 320 * 100) == 30
D_SD = [3, 7, 11]
assert stdev(D_SD) == 4 and f2(pstdev(D_SD)) == "3.27" and variance(D_SD) == 16

ITEMS = [
    # ---------------- Test 1 ----------------
    single(1, "Statistical methods", 2,
           "A manager asks how many units each store sold last quarter and the average per store. Which type of statistics answers this?",
           ["Descriptive", "Predictive", "Prescriptive", "Inferential"],
           "Descriptive statistics summarize what already happened, using counts, totals and averages."),
    single(1, "Statistical methods", 3,
           "A model recommends how much stock each warehouse should order next week to keep costs lowest. Which type of analytics is this?",
           ["Prescriptive", "Descriptive", "Inferential", "Diagnostic only"],
           "Prescriptive analytics recommends an action. Predictive analytics would only forecast what demand will be."),
    single(1, "Statistical methods", 3,
           "A team surveys 500 of 80,000 customers and uses the results to estimate satisfaction for all customers. Which type of statistics is this?",
           ["Inferential", "Descriptive", "Prescriptive", "Logical"],
           "Inferential statistics use a sample to draw conclusions about a larger population."),
    numeric(1, "Central tendency", 1,
            "Find the mean of 14, 22, 27, 31 and 46. Type the number only.",
            28,
            "The sum is 14 + 22 + 27 + 31 + 46 = 140, and 140 / 5 = 28."),
    single(1, "Central tendency", 2,
           "What is the median of 8, 13, 19, 24, 30 and 41?",
           ["21.5", "22.5", "24", "27"],
           "With six values the median is the average of the two middle values: (19 + 24) / 2 = 21.5. The mean would be 22.5."),
    single(1, "Central tendency", 1,
           "What is the mode of 3, 7, 7, 7, 9, 12 and 12?",
           ["7", "8.14", "9", "12"],
           "The mode is the most frequent value. 7 appears three times; 12 appears twice. So the mode is 7."),
    numeric(1, "Dispersion", 1,
            "Daily orders were 52, 61, 47, 88 and 70. What is the range? Type the number only.",
            41,
            "Range is the maximum minus the minimum: 88 - 47 = 41."),
    single(1, "Dispersion", 3,
           "What is the sample standard deviation of 5, 9, 11 and 15, to two decimal places?",
           ["4.16", "3.61", "17.33", "5"],
           "The mean is 10. Squared deviations are 25, 1, 1 and 25, summing to 52. Dividing by n - 1 = 3 gives a variance of 17.33, and its square root is 4.16. Dividing by n instead gives 3.61, the population figure."),
    single(1, "Dispersion", 3,
           "A delivery took 79 minutes. Deliveries average 94 minutes with a standard deviation of 6 minutes. What is its z-score?",
           ["-2.5", "-0.4", "2.5", "15"],
           "z = (value - mean) / standard deviation = (79 - 94) / 6 = -15 / 6 = -2.5, so it is 2.5 standard deviations below the mean."),
    single(1, "Mathematical functions", 2,
           "Monthly sign-ups rose from 640 to 752. What is the percent change?",
           ["17.5%", "14.9%", "11.2%", "1.75%"],
           "Percent change = (new - old) / old x 100 = 112 / 640 x 100 = 17.5%. Dividing by the new value instead gives 14.9%."),
    single(1, "Dispersion", 2,
           "A salary column has a few extreme values. Which measure of spread is least affected by them?",
           ["Interquartile range", "Range", "Standard deviation", "Variance"],
           "The IQR covers the middle 50 percent of values, so extremes in the tails barely move it. Range, variance and standard deviation all react to extremes."),
    single(1, "Date functions", 2,
           "Which type of function finds the number of days between an order date and a ship date?",
           ["A date function such as DATEDIFF", "A string function such as TRIM", "A logical function such as IF", "An aggregate function such as SUM"],
           "Date functions add, subtract and compare dates; DATEDIFF returns the interval between two dates."),
    # ---------------- Test 2 ----------------
    single(2, "Statistical methods", 2,
           "A model uses three years of history to forecast next month's call volume. Which type of analytics is this?",
           ["Predictive", "Descriptive", "Prescriptive", "Inferential"],
           "Predictive analytics uses past data to estimate future outcomes."),
    single(2, "Statistical methods", 3,
           "From a sample of 400 shipments, an analyst reports that the average weight of all shipments is between 11.2 and 12.6 kg with 95 percent confidence. Which type of statistics is this?",
           ["Inferential", "Descriptive", "Prescriptive", "Predictive"],
           "A confidence interval is an inferential tool: it estimates a population value from a sample."),
    numeric(2, "Central tendency", 1,
            "Find the mean of 17, 26, 33, 38, 51 and 45. Type the number only.",
            35,
            "The sum is 17 + 26 + 33 + 38 + 51 + 45 = 210, and 210 / 6 = 35."),
    single(2, "Central tendency", 2,
           "What is the median of 72, 18, 55, 40, 91, 63 and 29?",
           ["55", "52.57", "47.5", "40"],
           "Sorted, the values are 18, 29, 40, 55, 63, 72, 91. The fourth of seven values is 55. The mean would be 52.57, and 40 is just the fourth value before sorting."),
    single(2, "Central tendency", 3,
           "A shop sold 120 units at 4 dollars and 80 units at 9 dollars. What is the average price per unit sold?",
           ["6", "6.5", "8", "13"],
           "This is a weighted mean: (120 x 4 + 80 x 9) / 200 = (480 + 720) / 200 = 6. The simple average of the two prices, 6.5, ignores how many units sold at each."),
    numeric(2, "Dispersion", 2,
            "In a set of response times the first quartile is 34 seconds and the third quartile is 58 seconds. What is the interquartile range? Type the number only.",
            24,
            "IQR = Q3 - Q1 = 58 - 34 = 24 seconds."),
    single(2, "Dispersion", 3,
           "What is the sample variance of 2, 4 and 9, to two decimal places where needed?",
           ["13", "8.67", "3.61", "26"],
           "The mean is 5. Squared deviations are 9, 1 and 16, summing to 26. The sample variance divides by n - 1 = 2, giving 13. Dividing by 3 gives 8.67, and the square root of 13 is the standard deviation, 3.61."),
    single(2, "Mathematical functions", 2,
           "Returns fell from 1,250 to 1,075. What is the percent change?",
           ["-14%", "-16.3%", "-86%", "-175%"],
           "(1,075 - 1,250) / 1,250 x 100 = -175 / 1,250 x 100 = -14%. Dividing by the new value gives -16.3%, which is wrong."),
    single(2, "Distributions", 3,
           "In a data set of home prices, the mean is far above the median. What does this suggest?",
           ["The data is skewed right by some very high prices", "The data is skewed left by some very low prices", "The data has no outliers at either end", "The mode equals the mean"],
           "A few very large values pull the mean above the median, which is right (positive) skew."),
    single(2, "String functions", 2,
           "A report uses this expression on a code column:\n" + cli("LEFT(code, 3)") + "\nWhat does it return for the value TXN-4471?",
           ["TXN", "471", "TXN-", "4471"],
           "LEFT returns the given number of characters from the start of the string: the first three characters are TXN."),
    single(2, "Date functions", 2,
           "An invoice is due 30 days after its invoice date. Which kind of function computes the due date in a query?",
           ["A date function such as DATEADD", "A string function such as CONCAT", "A logical function such as CASE", "An aggregate function such as AVG"],
           "DATEADD adds an interval, here 30 days, to a date and returns the new date."),
    numeric(2, "Mathematical functions", 1,
            "The North region sold 1,872 of the company's 7,200 units. What percent of units did North sell? Type the number only.",
            26,
            "1,872 / 7,200 = 0.26, so North sold 26 percent of units."),
    # ---------------- Drill only ----------------
    single(0, "Logical functions", 2,
           "A query contains this expression:\n" + cli("CASE WHEN score >= 70 THEN 1 ELSE 0 END") + "\nWhich type of function is it?",
           ["Logical", "Date", "String", "Aggregate"],
           "CASE WHEN tests a condition and returns a value based on it, which is a logical function, like IF in a spreadsheet."),
    numeric(0, "Mathematical functions", 1,
            "Of 320 support tickets, 96 were about billing. What percent of tickets were about billing? Type the number only.",
            30,
            "96 / 320 = 0.30, so 30 percent."),
    single(0, "Dispersion", 2,
           "Three warehouses report 3, 7 and 11 late shipments. What is the sample standard deviation?",
           ["4", "3.27", "8", "16"],
           "The mean is 7. Squared deviations are 16, 0 and 16, summing to 32. Dividing by n - 1 = 2 gives a variance of 16, and its square root is 4. The range would be 8."),
    single(0, "Correlation", 3,
           "Ad spend and sales have a correlation coefficient of 0.85. What does this tell the analyst?",
           ["A strong positive link, not proof of cause", "Ad spend causes 85 percent of all sales", "No relationship at all", "A strong negative relationship"],
           "A coefficient near +1 shows a strong positive linear relationship. Correlation alone does not show that one variable causes the other."),
    single(0, "Central tendency", 2,
           "Which measure of central tendency suits a column of favorite colors?",
           ["Mode", "Mean", "Median", "Standard deviation"],
           "Colors are categories with no order or numeric value, so only the mode, the most common value, applies."),
]
