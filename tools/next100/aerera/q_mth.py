CAT = "aereraMaths"; SEG = "MTH"
# Real estate arithmetic on the rules in the DLD legislation compilation. Every key is recomputed below.
assert round(20 * 10.764, 2) == 215.28
assert 12 * 850 == 10200
assert 360000 * 900 // 45000 == 7200
assert 24_000_000 * 5 // 100 == 1_200_000
assert 1_500_000 - 600_000 == 900_000
assert 2_000_000 * 40 // 100 == 800_000
assert 1_200_000 * 25 // 100 == 300_000
assert 500_000 - 500_000 == 0
assert 96_000 // 4 == 24_000
assert 50_000 * 40 // 100 == 20_000
assert round(1076.4 / 10.764, 2) == 100
assert 2_150_000 // 1_250 == 1_720
Q = [
("A balcony measures 20 sqm. Given 1 sqm = 10.764 sqft, what is its area in sqft?",
 "215.28 sqft", ["1.86 sqft", "2,152.80 sqft", "20.76 sqft"],
 "To convert sqm to sqft multiply: 20 x 10.764 = 215.28 sqft. Dividing instead gives 1.86."),
("A suite has 850 sqft and the service charge is AED 12 per sqft. What is the total service charge?",
 "AED 10,200", ["AED 70.83", "AED 9,350", "AED 12,850"],
 "Multiply the area by the rate: 850 x 12 = 10,200. Dividing gives 70.83."),
("A 900 sqft unit sits in a building of 45,000 sqft. Annual service fees for the building are AED 360,000. What is this unit's share by area?",
 "AED 7,200", ["AED 8,000", "AED 400", "AED 72,000"],
 "The unit holds 900/45,000 = 2% of the area, and 2% of 360,000 is 7,200, in line with the area-based share in Article 25 of Law No. (6) of 2019."),
("An escrow account's total value is AED 24,000,000. How much does the Escrow Agent retain after the completion certificate?",
 "AED 1,200,000", ["AED 120,000", "AED 2,400,000", "AED 4,800,000"],
 "Law No. (8) of 2007 keeps 5% of the account's total value: 24,000,000 x 5% = 1,200,000."),
("A unit contract is AED 1,500,000 and the buyer has paid AED 600,000. The project is 85% complete and the buyer stays in default after notice. What balance may the developer claim?",
 "AED 900,000", ["AED 600,000", "AED 1,500,000", "AED 300,000"],
 "Above 80% complete the developer may keep all payments and claims the balance: 1,500,000 - 600,000 = 900,000."),
("A unit contract is AED 2,000,000. The project is 62% complete and the developer terminates after default. What is the most he may retain?",
 "AED 800,000", ["AED 500,000", "AED 1,200,000", "AED 600,000"],
 "Between 60% and 80% complete the cap is 40% of the unit value: 2,000,000 x 40% = 800,000."),
("A unit contract is AED 1,200,000. Construction has started but the project is below 60%. What is the most the developer may retain after default and termination?",
 "AED 300,000", ["AED 480,000", "AED 360,000", "AED 180,000"],
 "Below 60%, once construction has started, the cap is 25% of the unit value: 1,200,000 x 25% = 300,000."),
("Through no fault of the developer, work on the project never started for a reason beyond his control. A buyer has paid AED 500,000. What may the developer retain?",
 "Nothing, he refunds AED 500,000", ["AED 150,000", "AED 125,000", "AED 200,000"],
 "Under Article 11(b) of Law No. (13) of 2008, as replaced by Law No. (19) of 2020, all payments are refunded, so the developer retains AED 0. The old 30% rule (AED 150,000) no longer applies."),
("A lease has an annual rent of AED 96,000 and no agreed payment dates. How much is each advance instalment?",
 "AED 24,000", ["AED 8,000", "AED 48,000", "AED 32,000"],
 "The default is four equal instalments paid in advance: 96,000 / 4 = 24,000."),
("Two brokers share a fee of AED 50,000 in the proportion 60:40 under their agreement. What does the 40% broker receive?",
 "AED 20,000", ["AED 25,000", "AED 30,000", "AED 10,000"],
 "Forty percent of 50,000 is 20,000, and the other broker receives 30,000."),
("A unit measures 1,076.4 sqft. Given 1 sqm = 10.764 sqft, what is its area in sqm?",
 "100 sqm", ["10,764 sqm", "11,585 sqm", "10.76 sqm"],
 "To convert sqft to sqm divide: 1,076.4 / 10.764 = 100 sqm."),
("A 1,250 sqft unit sells for AED 2,150,000. What is the price per sqft?",
 "AED 1,720", ["AED 1,870", "AED 2,688", "AED 1,250"],
 "Divide the price by the area: 2,150,000 / 1,250 = 1,720."),
]
