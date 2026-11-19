CAT = "afspAdjust"; SEG = "ADJ"
# AFTR outline 1.1 to 1.4: 2026 inflation adjustments (Rev. Proc. 2025-32), 2026 mileage rates
# (Notice 2026-10), Form 1099-K and Form 1099-NEC/MISC thresholds. Tax year 2026. Computed keys asserted.
_edu = 2 * min(500, 350); assert _edu == 700
_sli = 2500 - 2500 * (92500 - 85000) // (100000 - 85000); assert _sli == 1250
_gift = 25000 - 19000; assert _gift == 6000
_bus = round(1000 * 0.725); assert _bus == 725
_med = round(400 * 0.205); assert _med == 82
_split = 2 * 19000; assert _split == 38000

Q = [
("Two teachers who file jointly each spent $500 on classroom supplies in 2026. Their educator expense deduction is:",
 f"${_edu:,}", ["$350", "$1,000", "$600"],
 "For 2026 each eligible educator may deduct up to $350 (Rev. Proc. 2025-32, section 4.12). On a joint return where both spouses are educators, each spouse's cap applies separately, so 2 x $350 = $700."),
("Lena, single, paid $2,500 of student loan interest in 2026 and has MAGI of $92,500. Her deduction is:",
 f"${_sli:,}", ["$2,500", "$625", "$0"],
 "For 2026 the deduction phases out between $85,000 and $100,000 of MAGI for a single filer. Lena is halfway through the $15,000 range, so half of the $2,500 is lost: $1,250."),
("For 2026, the student loan interest deduction is fully phased out on a joint return at MAGI of:",
 "$205,000", ["$175,000", "$200,000", "$185,000"],
 "Rev. Proc. 2025-32 (section 4.29) sets the 2026 joint range at $175,000 to $205,000. At $175,000 the phaseout only begins."),
("What is the most a qualifying individual can exclude under the 2026 foreign earned income exclusion?",
 "$132,900", ["$130,000", "$126,500", "$135,000"],
 "Rev. Proc. 2025-32 (section 4.39) sets the 2026 exclusion at $132,900 per qualifying individual. The figure is indexed each year, so last year's amount is a common error."),
("In 2026 a mother gives her son $25,000 in cash. How much of the gift is above the annual exclusion?",
 f"${_gift:,}", ["$7,000", "$0", "$25,000"],
 "The 2026 annual gift exclusion is $19,000 per recipient (Rev. Proc. 2025-32, section 4.42). The $6,000 above it is a taxable gift reported on Form 709, though lifetime exclusion usually means no gift tax is due."),
("A married couple elects gift splitting for 2026. How much can they give one grandchild without using any lifetime exclusion?",
 f"${_split:,}", ["$19,000", "$30,000", "$40,400"],
 "With gift splitting each spouse is treated as giving half, so two $19,000 annual exclusions apply to the grandchild: $38,000. The election is made on Form 709."),
("Raj drove 1,000 miles for his sole proprietorship in 2026. Using the standard mileage rate, his car deduction is:",
 f"${_bus:,}", ["$700", "$205", "$140"],
 "Notice 2026-10 sets the 2026 business rate at 72.5 cents a mile: 1,000 x $0.725 = $725. Parking and tolls for business trips can be added."),
("Which 2026 standard mileage rate is set by statute rather than updated by the IRS each year?",
 "Charitable rate", ["Business rate", "Medical rate", "Military moving rate"],
 "The 14-cents-a-mile rate for driving in service of a charity is fixed by IRC section 170(i). The business, medical and moving rates are set each year; Notice 2026-10 gives 72.5 and 20.5 cents for 2026."),
("For 2026, a taxpayer drove 400 miles for medical care. The amount counted as a medical expense is:",
 f"${_med:,}", ["$290", "$56", "$100"],
 "Notice 2026-10 sets the 2026 medical and military moving rate at 20.5 cents a mile: 400 x $0.205 = $82. It is added to other medical expenses before the AGI floor."),
("Under the reinstated rule, a payment app must issue Form 1099-K when a seller's payments exceed $20,000 and the transaction count exceeds:",
 "200", ["100", "50", "500"],
 "The 2025 law restored the threshold of more than $20,000 and more than 200 transactions (FS-2025-08). A platform may still send a form below those amounts."),
("Mia sold crafts online in 2026: 150 sales totaling $26,000 and no Form 1099-K. Her profit is:",
 "Reportable income", ["Exempt below 200 sales", "Exempt with no 1099-K", "Taxable only over $20,000"],
 "The 1099-K threshold is a reporting rule for platforms, not a tax rule (FS-2025-08). All income is taxable unless the law excludes it, whether or not a form arrives."),
("A business pays an unincorporated contractor $1,800 for services in 2026. Is a Form 1099-NEC required?",
 "No, the threshold is $2,000", ["Yes, the threshold is $600", "Yes, for any amount paid", "No, the threshold is $5,000"],
 "The 2025 law raised the basic Form 1099-NEC and 1099-MISC threshold to $2,000 for payments made after December 31, 2025 (Rev. Proc. 2025-32, section 2.15). The old $600 threshold applies to 2025 payments."),
]
