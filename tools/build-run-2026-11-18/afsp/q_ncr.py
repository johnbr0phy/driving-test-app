CAT = "afspNewCred"; SEG = "NCR"
# AFTR outline 1.5 to 1.8: child and dependent care credit (IRC 21 as amended by OBBBA 70405),
# adoption credit (Rev. Proc. 2025-32 4.04), AOTC/LLC SSN and EIN rules (OBBBA 70606, IRC 25A),
# 30C termination. Tax year 2026. Computed keys asserted.
import math
def _dcc_rate(agi, joint=False):
    r = 50 - math.ceil(max(0, agi - 15000) / 2000)
    r = max(r, 35)
    hi = 150000 if joint else 75000
    step = 4000 if joint else 2000
    r2 = r - math.ceil(max(0, agi - hi) / step)
    return max(r2, 20)
assert _dcc_rate(30000) == 42 and _dcc_rate(14000) == 50 and _dcc_rate(50000) == 35 and _dcc_rate(170000, True) == 30
_a = 3000 * _dcc_rate(30000) // 100; assert _a == 1260
_b = 6000 * _dcc_rate(14000) // 100; assert _b == 3000
_c = 3000 * _dcc_rate(50000) // 100; assert _c == 1050
_d = 6000 * _dcc_rate(170000, True) // 100; assert _d == 1800
_carry = (8000 - 5120) - 1000; assert _carry == 1880

Q = [
("Ana's 2026 AGI is $30,000. She paid $4,000 of day care for one child so she could work. Her dependent care credit is:",
 f"${_a:,}", ["$1,400", "$1,050", "$2,000"],
 "For 2026 the rate starts at 50% and drops 1 point for each $2,000 or part of $2,000 of AGI over $15,000 (IRC 21 as amended). $15,000 over is 7.5 steps, rounded up to 8, so 42% of the $3,000 one-child limit is $1,260."),
("A couple with 2026 AGI of $14,000 paid $7,000 of work-related care for two children. Their dependent care credit is:",
 f"${_b:,}", ["$3,500", "$2,100", "$1,200"],
 "At AGI of $15,000 or less the 2026 rate is the full 50%. Expenses are capped at $6,000 for two or more qualifying people, so the credit is $3,000."),
("Ben, single, has 2026 AGI of $50,000 and $3,000 of care costs for one child. His credit rate is:",
 "35%", ["32%", "50%", "20%"],
 "The first phasedown stops at 35% and does not go lower until AGI passes $75,000 for a single filer, so Ben keeps 35%, a $1,050 credit. The rate would only fall toward 20% above that second threshold."),
("A joint return for 2026 shows AGI of $170,000 and $6,000 of care costs for two children. The credit is:",
 f"${_d:,}", ["$2,100", "$1,200", "$3,000"],
 "The rate first drops to 35%, then falls 1 more point per $4,000 of joint AGI over $150,000. $20,000 over is 5 steps, so 30% of $6,000 is $1,800."),
("For 2026, how much of the adoption credit can be refundable?",
 "Up to $5,120", ["Up to $17,670", "Up to $2,000", "No part of it"],
 "The 2025 law made part of the credit refundable; for 2026 the refundable portion is up to $5,120 (Rev. Proc. 2025-32, section 4.04). The rest of the $17,670 maximum is nonrefundable."),
("Kim's 2026 adoption credit is $8,000 and her tax before credits is $1,000. How much credit carries forward to 2027?",
 f"${_carry:,}", ["$7,000", "$2,880", "$0"],
 "Up to $5,120 is refundable. The other $2,880 is nonrefundable: $1,000 offsets her tax and $1,880 carries forward for up to five years."),
("Adoption credit carried forward from 2025 and used on a 2026 return is:",
 "Nonrefundable", ["Refundable up to $5,120", "Refundable in full", "Lost after one year"],
 "IRS guidance on the 2025 law says amounts carried forward from prior years cannot be used to figure the refundable portion. They only reduce tax, and they can carry forward for five years."),
("A 2026 American opportunity credit claim must include the employer identification number of:",
 "Each school paid", ["The student's employer", "The loan servicer", "The 529 plan trustee"],
 "IRC 25A(i) denies the AOTC unless the return shows the EIN of the institution the tuition was paid to, a rule in place since 2015. Form 1098-T shows it."),
("If a 2026 education credit claim leaves off a required Social Security number, the IRS can deny the credit through:",
 "Math error procedures", ["A field examination only", "A Tax Court petition", "The taxpayer's consent only"],
 "The 2025 law treats an omitted SSN or EIN for these credits as a mathematical or clerical error, so the IRS can adjust the return without a deficiency notice."),
("Which requirement applies to the American opportunity credit but not the lifetime learning credit?",
 "School's EIN on the return", ["Student's SSN on the return", "Taxpayer's SSN on the return", "Qualified tuition paid"],
 "Both credits need the SSNs of the taxpayer and the student (IRC 25A). Only the AOTC also needs the school's employer identification number."),
("The section 30C credit for alternative fuel vehicle refueling property ends for property placed in service after:",
 "June 30, 2026", ["December 31, 2026", "December 31, 2025", "September 30, 2025"],
 "OBBBA added a termination to IRC 30C: it does not apply to property placed in service after June 30, 2026. September 30, 2025 is the cutoff for the clean vehicle credits."),
("A shop owner places EV charging equipment in service in September 2026. Under section 30C, the credit is:",
 "Not available", ["Available at 30%", "Available if ordered by June", "Deferred to 2027"],
 "IRC 30C now ends for property placed in service after June 30, 2026, and the test is the placed-in-service date. Ordering or paying earlier does not matter."),
]
