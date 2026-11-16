CAT = "bcreFinance"; SEG = "FIN"

def d(n):
    return "${:,.0f}".format(n)

def pc(x, places=1):
    s = ("{:." + str(places) + "f}").format(x)
    return s + "%"

# every computed key is asserted
assert 240000 * 0.045 == 10800
assert 380000 / 500000 == 0.76
assert 650000 * 0.20 == 130000
assert 360000 * 0.06 / 12 == 1800
eff = (1 + 0.06 / 2) ** 2 - 1
assert round(eff * 100, 2) == 6.09
assert 2400 / 8000 == 0.30
assert (2400 + 600) / 8000 == 0.375
assert 90000 / 12 * 0.32 == 2400
assert 1200 * 300 - 200000 == 160000
assert 200000 * 0.05 - 200000 * 0.04 == 2000
assert 600000 - 350000 == 250000
assert 365000 * 0.05 / 365 == 50
assert 3650 * 100 / 365 == 1000
assert 100000 * 0.05 / 2 == 2500
assert 240000 * 0.048 / 12 == 960
assert 240000 * 0.05 * 3 / 12 == 3000
assert 2000 - 1500 == 500
assert 300000 - 700 == 299300
assert 800000 - 640000 == 160000
assert 450000 * 0.05 == 22500
assert 520000 * 0.80 == 416000
assert round(0.30 * 7000, 0) == 2100

Q = [
("A buyer borrows $240,000 at 4.5% a year. Using simple interest, what is the interest for one year?",
 d(10800), [d(1080), d(24000), d(108000)],
 "Interest equals principal times rate: 240,000 x 0.045 = 10,800."),
("A home is valued at $500,000 and the mortgage is $380,000. What is the loan-to-value ratio?",
 "76%", ["24%", "62%", "131%"],
 "Loan-to-value equals the loan divided by the value: 380,000 / 500,000 = 0.76, or 76%."),
("A buyer pays $650,000 and makes a 20% down payment. How much is the down payment?",
 d(130000), [d(65000), d(32500), d(520000)],
 "20% of 650,000 is 130,000. The remaining 520,000 is the amount to be financed."),
("A buyer pays $520,000 and puts 20% down. What mortgage amount is needed?",
 d(416000), [d(104000), d(520000), d(436000)],
 "The mortgage is the price less the down payment: 520,000 - 104,000 = 416,000, or 80% of the price."),
("A $360,000 loan carries 6% interest per year. What is the interest for one month, using one-twelfth of the annual rate?",
 d(1800), [d(1500), d(2160), d(18000)],
 "Annual interest is 21,600. Divided by 12 months, that is 1,800."),
("A fixed-rate mortgage is quoted at 6% per year, compounded semi-annually, not in advance. What is the effective annual rate?",
 "6.09%", ["6.00%", "6.18%", "3.00%"],
 "Two compoundings at 3% each give 1.03 x 1.03 = 1.0609. The effective annual rate is 6.09%, slightly above the nominal rate."),
("A borrower's monthly payment is $2,000 and $1,500 of it is interest. How much reduces the principal?",
 d(500), [d(1500), d(2000), d(3500)],
 "Payment less interest is principal: 2,000 - 1,500 = 500."),
("A mortgage balance is $300,000 and one payment reduces principal by $700. What is the balance afterward?",
 d(299300), [d(300700), d(299000), d(293000)],
 "Subtract the principal portion: 300,000 - 700 = 299,300."),
("Gross monthly income is $8,000. Monthly housing costs are $2,400. What is the gross debt service ratio?",
 "30%", ["3.3%", "33%", "70%"],
 "GDS is housing costs divided by gross income: 2,400 / 8,000 = 0.30."),
("Gross monthly income is $8,000. Housing costs are $2,400 and other debt payments are $600. What is the total debt service ratio?",
 "37.5%", ["30%", "7.5%", "42%"],
 "TDS adds all debt payments to housing costs: (2,400 + 600) / 8,000 = 0.375."),
("Annual gross income is $90,000 and a lender caps housing costs at 32% of gross income. What is the maximum monthly housing cost?",
 d(2400), [d(2880), d(7500), d(28800)],
 "Monthly income is 7,500. Multiply by 0.32 to get 2,400."),
("Monthly payments of $1,200 over 25 years repay a $200,000 mortgage. What is the total interest paid?",
 d(160000), [d(360000), d(200000), d(14400)],
 "Total payments are 1,200 x 300 = 360,000. Subtract the 200,000 principal to get 160,000 of interest."),
("Two loans of $200,000 differ only in rate, 4% and 5%. Using simple interest, how much more interest does the 5% loan carry in a year?",
 d(2000), [d(1000), d(10000), d(8000)],
 "5% of 200,000 is 10,000 and 4% is 8,000. The difference is 2,000."),
("A home is worth $600,000 and total mortgages against it are $350,000. What is the owner's equity?",
 d(250000), [d(350000), d(600000), d(950000)],
 "Equity is value less debt secured against it: 600,000 - 350,000 = 250,000."),
("A $365,000 mortgage at 5% simple interest per year: what is the interest for one day, using 365 days?",
 d(50), [d(18), d(500), d(5)],
 "Annual interest is 18,250. Divided by 365 days, that is 50 per day."),
("Property taxes for the year are $3,650. The seller owns the home for the first 100 days of a 365-day year. What is the seller's share?",
 d(1000), [d(3650), d(2650), d(100)],
 "Each day is worth 10. The seller covers 100 days, so 1,000, and the buyer covers 265 days."),
("A $100,000 loan at 5% a year compounds semi-annually. What is the interest added after the first six months?",
 d(2500), [d(5000), d(1250), d(500)],
 "The half-year rate is 2.5%, so 100,000 x 0.025 = 2,500."),
("A $240,000 loan at 4.8% a year: using one-twelfth of the annual rate, what is the interest for the first month?",
 d(960), [d(9600), d(11520), d(1152)],
 "Monthly rate is 0.4%. Multiply: 240,000 x 0.004 = 960."),
("A lender's prepayment charge is three months' interest. The balance is $240,000 at 5% simple. What is the charge?",
 d(3000), [d(12000), d(1000), d(6000)],
 "Annual interest is 12,000, so three months is a quarter of that: 3,000."),
("A buyer's bank offers an 80% loan on an $800,000 purchase. How much does the buyer need as a down payment?",
 d(160000), [d(640000), d(80000), d(8000)],
 "The loan is 640,000, leaving 160,000, which is 20% of the price."),
("What is the term of a mortgage?",
 "The period a rate and conditions apply", ["The total time to repay in full", "The time between payments", "The age of the lender"],
 "Term is the length of the contract, often 1 to 5 years, after which the mortgage is renewed or repaid. Amortization is the total repayment period."),
("A closed mortgage normally:",
 "Limits early prepayment", ["Lets any amount be repaid free", "Has no fixed rate", "Has no registration"],
 "A closed mortgage restricts prepayment, often to a set annual percentage, and early repayment beyond that may attract a charge."),
("A second mortgage on a property generally ranks:",
 "Behind the first mortgage", ["Ahead of the first", "Equal with the first", "Outside the registry"],
 "Priority follows the time of the registration application, so a later mortgage ranks behind an earlier one."),
("A seller finances part of the price and takes a mortgage back from the buyer. This is a:",
 "Vendor take-back mortgage", ["Reverse mortgage", "Blanket mortgage", "Bridge loan"],
 "In a vendor take-back mortgage, the seller lends part of the price to the buyer and receives mortgage security on the property."),
]
