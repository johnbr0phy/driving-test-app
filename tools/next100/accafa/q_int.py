CAT = "accafaInterpretation"; SEG = "INT"
def m(v): return "${:,.0f}".format(v)
def r(v): return "{:.1f}".format(v)
_rec = 61200 / 496400 * 365
_inv = 47000 / 391000 * 365
assert r(_rec) == "45.0" and r(_inv) == "43.9"
Q = [
("Current assets are $186,000, including inventory of $71,000. Current liabilities are $128,000. The quick (acid test) ratio is:",
 "0.9:1", ["1.5:1", "0.6:1", "2.5:1"],
 "Quick ratio = (current assets - inventory) / current liabilities = $115,000 / $128,000 = 0.9:1. Including inventory gives the current ratio of 1.5:1."),
("Trade receivables are $61,200 and credit sales for the year are $496,400. The receivables collection period is:",
 r(_rec) + " days", [r(496400 / 61200) + " days", "49.9 days", "54.8 days"],
 "Collection period = $61,200 / $496,400 x 365 = 45.0 days. 8.1 is the number of times receivables turn over in a year, not days."),
("Revenue is $350,000 and gross profit $98,000. The gross profit margin is:",
 "28.0%", ["38.9%", "72.0%", "25.0%"],
 "Margin = gross profit / revenue = $98,000 / $350,000 = 28.0%. Dividing by cost of sales ($252,000) gives the mark-up of 38.9%."),
("Inventory is $47,000 and cost of sales for the year is $391,000. The inventory holding period is:",
 r(_inv) + " days", [r(391000 / 47000) + " days", r(47000 / 391000 * 365 * 1.2) + " days", r(47000 / 391000 * 52) + " days"],
 "Inventory days = $47,000 / $391,000 x 365 = 43.9 days. 8.3 is inventory turnover, the number of times a year."),
("A company has loan notes of $300,000 and equity of $700,000. Measuring gearing as debt divided by debt plus equity, gearing is:",
 "30.0%", ["42.9%", "70.0%", "23.1%"],
 "Gearing = $300,000 / ($300,000 + $700,000) = 30.0%. Debt divided by equity alone gives 42.9%."),
("Profit before financing and income taxes is $84,000 and interest expense is $12,000. Interest cover is:",
 "7 times", ["6 times", "0.14 times", "8 times"],
 "Interest cover = profit before interest / interest = $84,000 / $12,000 = 7 times. Deducting the interest first gives 6, which understates cover."),
("A business's receivables collection period rises from 38 days to 61 days. The most likely cause is:",
 "Weaker credit control", ["Faster payment by customers", "Stricter credit limits", "Lower inventory levels"],
 "Customers are taking longer to pay, which points to poorer chasing of debts or more generous terms. Faster payment and stricter limits would shorten the period."),
("Profit before financing and income taxes is $117,000. Equity is $610,000 and non-current liabilities are $170,000. Return on capital employed is:",
 "15.0%", ["19.2%", "11.7%", "18.0%"],
 "ROCE = $117,000 / ($610,000 + $170,000) = 15.0%. Using equity alone as capital employed gives 19.2%."),
]
