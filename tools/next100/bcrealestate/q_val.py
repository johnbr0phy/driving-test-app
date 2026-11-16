CAT = "bcreValuation"; SEG = "VAL"

def d(n):
    return "${:,.0f}".format(n)

assert 150000 + 300000 - 60000 == 390000
assert 60000 / 0.06 == 1000000
assert 120000 - 6000 - 40000 == 74000
assert 45000 / 750000 == 0.06
assert 36000 * 15 == 540000
assert 600000 / 30000 == 20
assert 480000 / 1200 == 400
assert 500000 - 15000 == 485000
assert 50 * 120 == 6000
assert 43560 * 2 == 87120
assert 300000 * 15 / 50 == 90000
assert round(100 * 10.7639) == 1076
assert 10000 * 4 == 40000

Q = [
("Which approach to value relies mainly on recent sales of similar properties?",
 "Market comparison approach", ["Cost approach", "Income approach", "Assessment approach"],
 "The market comparison approach estimates value from the prices recently paid for comparable properties, adjusted for differences."),
("A building site is worth $150,000. Replacing the building new would cost $300,000 and accrued depreciation is $60,000. By the cost approach, what is the value?",
 d(390000), [d(450000), d(510000), d(210000)],
 "Value equals land plus replacement cost new less depreciation: 150,000 + 300,000 - 60,000 = 390,000."),
("An investment property has a net operating income of $60,000 and a capitalization rate of 6%. By the income approach, what is its value?",
 d(1000000), [d(3600000), d(360000), d(66000)],
 "Value equals net operating income divided by the capitalization rate: 60,000 / 0.06 = 1,000,000."),
("A building collects $120,000 a year in rent. Vacancy and collection loss is $6,000 and operating expenses are $40,000. What is the net operating income?",
 d(74000), [d(80000), d(114000), d(34000)],
 "Net operating income equals rent less vacancy and operating expenses: 120,000 - 6,000 - 40,000 = 74,000."),
("A property with net operating income of $45,000 is priced at $750,000. What is its capitalization rate?",
 "6%", ["1.7%", "16.7%", "60%"],
 "The capitalization rate is net operating income divided by value: 45,000 / 750,000 = 0.06."),
("Similar properties sell for 15 times their annual gross rent. A property earns $36,000 a year in rent. What is the value by that gross rent multiplier?",
 d(540000), [d(2400), d(36000), d(51000)],
 "Value equals annual rent times the multiplier: 36,000 x 15 = 540,000."),
("A $600,000 building earns $30,000 a year in gross rent. What is its gross rent multiplier?",
 "20", ["0.05", "5", "30"],
 "The multiplier is price divided by annual gross rent: 600,000 / 30,000 = 20."),
("A 1,200 square foot home sold for $480,000. What was the price per square foot?",
 d(400), [d(250), d(576), d(4000)],
 "Divide price by area: 480,000 / 1,200 = 400."),
("A comparable that sold for $500,000 has a garage worth $15,000 that the subject lacks. What is the adjusted comparable value for the subject?",
 d(485000), [d(515000), d(500000), d(475000)],
 "Adjust the comparable, not the subject: subtract the feature the subject lacks, so 500,000 - 15,000 = 485,000."),
("An appraiser notes that a buyer would not pay more for a home than the cost of an equally desirable substitute. This is the principle of:",
 "Substitution", ["Contribution", "Plottage", "Conformity"],
 "The principle of substitution says a rational buyer pays no more than the cost of an equally desirable alternative."),
("Adding a feature raises value only by what buyers will pay for it, which is the principle of:",
 "Contribution", ["Substitution", "Anticipation", "Regression"],
 "Under contribution, an improvement is worth what it adds to the property's market value, not necessarily what it cost."),
("The highest and best use of a site is the use that is:",
 "Legal, possible and most profitable", ["Lowest in construction cost", "Most popular with the neighbours", "Current use for the past 10 years"],
 "Highest and best use is the legally permissible, physically possible, financially feasible and maximally productive use."),
("Which best describes market value?",
 "Likely price in an open, competitive market", ["The seller's asking price", "The assessed tax value", "The mortgage balance"],
 "Market value is the most probable price in an open competitive market between informed, willing parties not under pressure."),
("A new highway is built beside a house and noise cuts its value. This loss is:",
 "External obsolescence", ["Physical deterioration", "Functional obsolescence", "Curable depreciation"],
 "External obsolescence comes from factors outside the property, such as noise, traffic or nearby land uses."),
("A home has a single bathroom and no way to add another. Buyers expect two. The loss in value is:",
 "Functional obsolescence", ["External obsolescence", "Physical deterioration", "Plottage"],
 "Functional obsolescence is loss from a design or layout that no longer meets market expectations."),
("An appraiser adjusts for a difference between a comparable and the subject. The adjustment is made to the:",
 "Comparable property's price", ["Subject property's price", "Listing price", "Assessed value"],
 "Adjustments are applied to each comparable's sale price to make it like the subject."),
("An old building has an economic life of 50 years and an effective age of 15 years, with a replacement cost of $300,000. By the age-life method, depreciation is:",
 d(90000), [d(100000), d(150000), d(300000)],
 "Depreciation is effective age over economic life, 15/50 = 30%, times replacement cost: 90,000."),
("A rectangular lot is 50 feet wide and 120 feet deep. What is its area?",
 "6,000 square feet", ["170 square feet", "600 square feet", "12,000 square feet"],
 "Area equals width times depth: 50 x 120 = 6,000 square feet."),
("How many square feet are in 2 acres?",
 "87,120", ["43,560", "21,780", "174,240"],
 "One acre is 43,560 square feet, so 2 acres is 87,120."),
("A sales comparison sheet prepared by a licensee to estimate a listing price is a:",
 "Comparative market analysis", ["Registered appraisal", "Property assessment", "Home inspection"],
 "A comparative market analysis compares recent sales and listings to advise a client on price and is not a formal appraisal."),
]
