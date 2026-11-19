CAT = "afspItemized"; SEG = "ITM"
# AFTR outline 2.11: Schedule A medical (long-term care limits, Rev. Proc. 2025-32 4.27), taxes, home
# mortgage interest, charitable contributions, moving expenses (IRC 217 as amended by OBBBA 70113),
# records. Pubs. 502, 936, 526, 561, 3; Instructions for Schedule A. Tax year 2026.
_med = 5100 - 48000 * 75 // 1000; assert _med == 1500
_ltc = min(6000, 4960); assert _ltc == 4960
_cash = min(35000, 50000 * 60 // 100); assert _cash == 30000

Q = [
("A taxpayer with 2026 AGI of $48,000 paid $5,100 of unreimbursed medical bills. If she itemizes, her medical deduction is:",
 f"${_med:,}", ["$5,100", "$3,600", "$1,020"],
 "Medical and dental expenses are deductible only above 7.5% of AGI (Pub. 502). 7.5% of $48,000 is $3,600, so $1,500 is deductible."),
("A 63-year-old paid $6,000 of premiums on a qualified long-term care policy in 2026. The amount treated as a medical expense is:",
 f"${_ltc:,}", ["$6,000", "$6,200", "$1,860"],
 "Rev. Proc. 2025-32 (section 4.27) limits 2026 premiums for ages over 60 through 70 to $4,960. $6,200 is the limit for those over 70."),
("A yearly state fee on a personal car is deductible on Schedule A as a personal property tax only if it is based on the car's:",
 "Value", ["Weight", "Age", "Engine size"],
 "A personal property tax must be charged on a yearly basis and based only on the value of the property (Instructions for Schedule A). A fee based on weight or a flat amount does not qualify."),
("For a main home bought with a mortgage taken out in 2026, interest is deductible on acquisition debt of up to:",
 "$750,000", ["$1,000,000", "$500,000", "$1,100,000"],
 "The $750,000 limit ($375,000 married filing separately) for debt taken out after December 15, 2017 was made permanent by the 2025 law (Pub. 936). $1,000,000 applies to older debt."),
("A buyer pays points on a 2026 mortgage to buy her main home, and all the usual tests are met. The points are:",
 "Deductible in full for 2026", ["Spread over the loan term", "Added to the home's basis", "Not deductible at all"],
 "Points paid on a loan to buy or build a main home can be deducted in the year paid when the tests in Pub. 936 are met. Refinancing points are generally spread over the life of the loan."),
("A taxpayer with AGI of $50,000 gives $35,000 in cash to a church in 2026. This year's deduction is limited to:",
 f"${_cash:,}", ["$35,000", "$15,000", "$25,000"],
 "Cash gifts to public charities are limited to 60% of AGI (Pub. 526). 60% of $50,000 is $30,000; the other $5,000 carries forward for up to five years."),
("The written acknowledgment a charity gives for a $500 cash gift must say:",
 "Whether goods or services were given", ["The donor's adjusted gross income", "The donor's tax bracket", "The fair value of volunteer time"],
 "The acknowledgment must state the amount of cash and whether the charity provided goods or services in return, with a good-faith estimate of their value if so (Pub. 526)."),
("A donor itemizes and gives used furniture worth $700 to a charity in 2026. Along with Schedule A, she must file:",
 "Form 8283", ["Form 8282", "Form 1098-C", "Form 990"],
 "Form 8283 is required when total noncash gifts are more than $500 (Pub. 526). Form 8282 is filed by the charity when it disposes of donated property."),
("For 2026, which person can still deduct unreimbursed moving expenses?",
 "Intelligence community employee", ["Civilian who starts a new job", "Retiree who moves to Florida", "Student moving for college"],
 "Moving expenses remain suspended except for active-duty military moving under orders and, from 2026, intelligence community employees relocated on assignment (IRC 217 as amended)."),
("A civilian employer reimburses an employee's 2026 job-related moving costs. For the employee, the reimbursement is:",
 "Taxable wages", ["Excluded fringe benefit", "Excluded up to $5,250", "Taxable only above costs"],
 "The exclusion for qualified moving reimbursements is limited to the armed forces and, from 2026, the intelligence community (IRC 132(g)). For other employees it is wages on Form W-2."),
("When a home is sold in 2026, the year's real estate tax is split between buyer and seller based on:",
 "Days each owned the home", ["Who paid at closing", "The assessed value", "The closing agent's choice"],
 "Each party deducts the tax for the part of the year it owned the home, whoever actually paid it at settlement (Pub. 530)."),
("Which 2026 cost can be included in medical expenses on Schedule A?",
 "Prescription eyeglasses", ["Cosmetic surgery", "Gym membership dues", "Over-the-counter vitamins"],
 "Eyeglasses for medical reasons are medical care. Cosmetic surgery that does not treat a deformity or illness, general health costs and nonprescribed vitamins are not (Pub. 502)."),
]
