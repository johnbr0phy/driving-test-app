"""Data+ 2.2 and 2.3: exploring a data set for inconsistencies, and
transformation and cleansing techniques. Every computed key is asserted."""
from statistics import mean, median
from helpers import single, multi, numeric, matrix, cmd


def fmt(x):
    s = f"{x:.2f}".rstrip("0").rstrip(".")
    return s


# Completeness: 1,140 of 1,200 emails filled.
FILLED, TOTAL = 1140, 1200
assert round(FILLED / TOTAL * 100) == 95

# Median imputation: ages with one missing value.
AGES = [23, 31, 36, 44, 71]
assert median(AGES) == 36 and mean(AGES) == 41

# Min-max scaling of 54 on a 30 to 90 range.
assert (54 - 30) / (90 - 30) == 0.4

# Standardization: value 83, mean 71, sd 8.
assert (83 - 71) / 8 == 1.5

# Drill: completeness 368 of 400 = 92%.
assert 368 / 400 * 100 == 92

# Test 2: min-max scaling of 26 on 10 to 50.
assert (26 - 10) / (50 - 10) == 0.4 and 16 / 50 == 0.32 and 26 / 100 == 0.26

# Test 2: mean imputation of order sizes.
SIZES = [6, 9, 12, 13]
assert mean(SIZES) == 10

ITEMS = [
    # ---------------- Test 1 ----------------
    numeric(1, "Completeness", 2,
            "A customer table has 1,200 rows, and the email field is filled in 1,140 of them. What percent of the email field is complete? Type the number only.",
            95,
            "Completeness is filled values divided by total rows: 1,140 / 1,200 = 0.95, so 95 percent."),
    single(1, "Duplication", 2,
           "The same order appears twice with the same order ID, date and amount after two files were combined. What issue is this?",
           ["Duplication", "Redundancy", "Outlier", "Data drift"],
           "Duplication is the same record repeated. Redundancy is the same fact stored in more than one place by design or by copying fields."),
    single(1, "Outliers", 2,
           "Most delivery times in a set run from 1 to 5 days, but one record shows 400 days. What should the analyst do first?",
           ["Check whether it is an entry error", "Delete it without checking", "Replace every value in the column with the mean", "Report 400 days as typical"],
           "An outlier can be a data entry error or a real event. Verify it before removing, capping or keeping it."),
    single(1, "Imputation", 2,
           "Five known ages are 23, 31, 36, 44 and 71, and one more age is missing. Using median imputation, what value fills the gap?",
           ["36", "41", "44", "31"],
           "Sorted, the middle of 23, 31, 36, 44 and 71 is 36. The mean would be 41, pulled up by the 71."),
    single(1, "Scaling", 3,
           "Min-max scaling maps a column whose minimum is 30 and maximum is 90 onto 0 to 1. What does the value 54 become?",
           ["0.4", "0.6", "0.24", "0.54"],
           "Min-max scaling is (x - min) / (max - min) = (54 - 30) / (90 - 30) = 24 / 60 = 0.4."),
    single(1, "Standardization", 3,
           "A column has a mean of 71 and a standard deviation of 8. After standardization (z-scores), what does the value 83 become?",
           ["1.5", "12", "0.67", "-1.5"],
           "Standardization subtracts the mean and divides by the standard deviation: (83 - 71) / 8 = 12 / 8 = 1.5."),
    single(1, "Regular expressions", 3,
           "Which tool matches every value in a text column that looks like a 5-digit ZIP code, so bad formats can be found?",
           ["A regular expression", "A pivot table", "A bridge table", "A cross join"],
           "A regular expression describes a text pattern, such as exactly five digits, and finds values that do or do not match it."),
    single(1, "Exploding", 3,
           "A cell holds \"red;blue;green\" and the analyst needs one row per color. Which transformation is this?",
           ["Exploding", "Appending", "Binning", "Merging"],
           "Exploding splits a list inside one field into separate rows, one per item."),
    single(1, "Binning", 2,
           "Exact incomes are grouped into ranges such as under 30k, 30k to 60k and over 60k for a chart. What is this called?",
           ["Binning", "Parsing", "Scaling", "Augmentation"],
           "Binning groups continuous values into ranges, or bins, a simple form of clustering."),
    matrix(1, "Transformation", 2,
           "Match each task to the technique it uses:",
           ["Add March rows below the February rows of a table with the same columns", "Join a customer table to an orders table on customer ID", "Split a full address into street, city and postcode fields"],
           ["Appending", "Merging", "Parsing"], [0, 1, 2],
           "Appending stacks rows with the same columns. Merging combines tables side by side on a key. Parsing breaks one field into its parts."),
    # ---------------- Test 2 ----------------
    single(2, "Missing values", 2,
           "Only 3 of 50,000 rows are missing the order amount, and those orders were test entries. What is a reasonable fix?",
           ["Delete those 3 rows", "Fill all amounts with zero", "Drop the amount column", "Impute the maximum amount"],
           "When very few rows are affected and they are not real data, deleting them removes the problem without biasing results."),
    single(2, "Redundancy", 2,
           "An orders table stores the customer's address in every order row, and the customer table also stores it. What issue does this create?",
           ["Redundancy that can drift out of sync", "Missing values in the customer table", "An outlier", "Spatial data errors"],
           "Storing the same fact in several places is redundancy; when one copy changes and the others do not, they disagree."),
    single(2, "Validation", 2,
           "A rule rejects any birth date later than today when records are loaded. Which exploration step does this rule perform?",
           ["Validation", "Imputation", "Exploding", "Binning"],
           "Validation checks values against rules, such as allowed ranges and formats."),
    single(2, "Scaling", 3,
           "Min-max scaling maps a column with a minimum of 10 and a maximum of 50 onto 0 to 1. What does the value 26 become?",
           ["0.4", "0.32", "0.26", "0.16"],
           "(x - min) / (max - min) = (26 - 10) / (50 - 10) = 16 / 40 = 0.4."),
    single(2, "Imputation", 2,
           "Four known order sizes are 6, 9, 12 and 13, and one is missing. Using mean imputation, what value fills the gap?",
           ["10", "10.5", "11", "12"],
           "The mean is (6 + 9 + 12 + 13) / 4 = 40 / 4 = 10. The median would be 10.5."),
    single(2, "Conversion", 2,
           "Dates arrive as text such as \"14/03/2026\", so they sort as strings by day, not in date order. Which transformation fixes this?",
           ["Convert the text to a date type", "Append the column to itself again", "Bin the values by month name", "Explode the column"],
           "Conversion changes the data type, so dates sort and filter as dates instead of as text."),
    single(2, "Derived variables", 2,
           "An analyst adds a profit column computed as revenue minus cost for each row. What is the new column?",
           ["A derived variable", "An imputed value", "A foreign key", "A slowly changing dimension"],
           "A derived variable is computed from existing fields."),
    single(2, "Augmentation", 3,
           "An analyst adds each store's local weather by date from an outside source to help explain sales. Which technique is this?",
           ["Data augmentation", "Data deletion", "Standardization", "Exploding"],
           "Augmentation enriches a data set with extra attributes or data from other sources."),
    single(2, "String manipulation", 2,
           "Product codes arrive as \"  ab-120 \", \"AB-120\" and \"Ab-120\". Which pair of string steps makes them match?",
           ["Trim spaces and convert to one case", "Round and bin them", "Explode them and append the parts", "Index and parameterize them"],
           "Trimming removes stray spaces and converting case (upper or lower) makes the three values identical."),
    multi(2, "Exploration", 2,
          "Which checks belong to data exploration before analysis? (Choose two.)",
          ["Counting missing values per column", "Looking for values far outside the usual range", "Choosing the dashboard color scheme", "Emailing the final report"],
          "Exploration profiles the data for gaps, duplicates, outliers and invalid values before any reporting."),
    # ---------------- Drill only ----------------
    numeric(0, "Completeness", 2,
            "A survey has 400 responses, and 368 of them answered the income question. What percent of that field is complete? Type the number only.",
            92,
            "368 / 400 = 0.92, so the field is 92 percent complete."),
    single(0, "Imputation", 3,
           "Why is the median often a safer choice than the mean for imputing missing incomes?",
           ["A few very high incomes pull the mean up", "The median is always zero", "The mean cannot be computed when nulls exist", "The median removes duplicates"],
           "Income data is usually skewed; the median is not pulled by extreme values the way the mean is."),
    single(0, "Deletion", 2,
           "A column is 98 percent empty and no report uses it. Which step is most reasonable?",
           ["Delete the column", "Impute every empty cell with the mean", "Explode the column", "Use it as the primary key"],
           "A nearly empty, unused column adds noise; deleting it is simpler than filling 98 percent guesses."),
    single(0, "Regular expressions", 3,
           "Which regular expression matches a value made of exactly four digits, such as 2026?",
           [cmd("^[0-9]{4}$"), cmd("[0-9]+"), cmd("^[A-Z]{4}$"), cmd("^[0-9]{4,}")],
           "The caret and dollar sign anchor the start and end, and [0-9]{4} means exactly four digits."),
    single(0, "Redundancy", 2,
           "How is redundancy different from duplication?",
           ["Redundancy repeats a fact; duplication repeats records", "They mean exactly the same thing in every tool", "Redundancy only affects image files", "Duplication only happens in JSON"],
           "Duplicates are repeated records. Redundant data is the same information stored in more than one field or table."),
]
