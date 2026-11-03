CAT = "accafaInventory"; SEG = "INV"
def m(v): return "${:,.0f}".format(v)
# continuous AVCO for item 6
_u, _c = 100, 100 * 6
_u, _c = _u + 300, _c + 300 * 8          # 400 units, 3,000, avg 7.50
_c -= 250 * (_c / _u); _u -= 250          # 150 units, 1,125
_u, _c = _u + 150, _c + 150 * 9          # 300 units, 2,475, avg 8.25
_c -= 120 * (_c / _u); _u -= 120          # 180 units
assert (_u, round(_c)) == (180, 1485)
_periodic = 180 * (600 + 2400 + 1350) / 550
assert round(_periodic) == 1424
Q = [
("Under IAS 2, inventories are measured at:",
 "Lower of cost and net realisable value", ["Higher of cost and net realisable value", "Lower of cost and replacement cost", "Expected selling price less profit"],
 "IAS 2 measures inventories at the lower of cost and net realisable value (estimated selling price less costs to complete and sell). Replacement cost is not used."),
("Which cost is excluded from the cost of inventory?",
 "Carriage outwards", ["Carriage inwards", "Import duties", "Production overheads"],
 "Cost includes costs of purchase and conversion and bringing the goods to their present location. Carriage outwards is a cost of selling, so it is a distribution expense."),
("An item cost $640. It can be sold for $700 after repairs costing $95, and the salesperson earns a 5% commission on the selling price. The item should be valued at:",
 m(700 - 95 - 35), [m(640), m(700 - 95), m(700)],
 "NRV = $700 - $95 - (5% x $700 = $35) = $570, below cost of $640, so the item is carried at $570. Forgetting the commission gives $605."),
("A business holds three product lines: A cost $4,200, NRV $5,100; B cost $3,600, NRV $2,900; C cost $1,750, NRV $1,900. Closing inventory is:",
 m(4200 + 2900 + 1750), [m(4200 + 3600 + 1750), m(5100 + 2900 + 1900), m(5100 + 3600 + 1900)],
 "The lower of cost and NRV is applied line by line: $4,200 + $2,900 + $1,750 = $8,850. Comparing the totals ($9,550 cost against $9,900 NRV) would hide the loss on line B."),
("Opening inventory was 40 units at $15. Purchases were 120 units at $18, then 80 units at $21. 170 units were sold. Closing inventory under FIFO is:",
 m(70 * 21), [m(70 * 4440 / 240), m(40 * 15 + 30 * 18), m(70 * 18)],
 "FIFO assumes the oldest units are sold first, so the 70 left are the latest purchases: 70 x $21 = $1,470. Periodic weighted average gives 70 x $18.50 = $1,295."),
("Opening inventory was 100 units at $6. The business bought 300 units at $8, sold 250 units, bought 150 units at $9, then sold 120 units. Closing inventory using continuous weighted average cost is:",
 m(_c), [m(_periodic), m(150 * 9 + 30 * 8), m(150 * 9)],
 "After the first purchase the average is $3,000 / 400 = $7.50, leaving 150 units at $1,125. After the second purchase it is $2,475 / 300 = $8.25, so the 180 units left are worth $1,485. A periodic average gives about $1,424."),
("When purchase prices are rising, compared with AVCO, FIFO gives:",
 "Higher closing inventory and profit", ["Lower closing inventory and profit", "Higher cost of sales and lower profit", "The same profit in every period"],
 "FIFO leaves the newest, dearest units in closing inventory and charges older, cheaper costs to cost of sales, so both closing inventory and profit are higher."),
("The year-end entry to record closing inventory is:",
 "Dr Inventory (SOFP), Cr Cost of sales", ["Dr Cost of sales, Cr Inventory (SOFP)", "Dr Purchases, Cr Inventory (SOFP)", "Dr Inventory (SOFP), Cr Revenue"],
 "Closing inventory is an asset and reduces cost of sales. Next year the opening inventory is transferred back with Dr Cost of sales, Cr Inventory."),
("Opening inventory was $23,400, purchases $187,500, carriage inwards $4,100, purchase returns $2,700 and closing inventory $26,900. Cost of sales is:",
 m(23400 + 187500 + 4100 - 2700 - 26900), [m(23400 + 187500 - 2700 - 26900), m(23400 + 187500 + 4100 + 2700 - 26900), m(26900 + 187500 + 4100 - 2700 - 23400)],
 "Cost of sales = $23,400 + $187,500 + $4,100 - $2,700 - $26,900 = $185,400. Carriage inwards is part of cost of sales; leaving it out gives $181,300."),
("The year end is 31 December. A count on 6 January values inventory at cost of $51,200. From 1 to 6 January, goods costing $3,300 were received and sales of $4,000 were made at a mark-up of 25% on cost. Inventory at cost on 31 December was:",
 m(51200 - 3300 + 4000 / 1.25), [m(51200 - 3300 + 4000 * 0.75), m(51200 + 3300 - 4000 / 1.25), m(51200 - 3300 + 4000)],
 "Work back from the count: take out goods received after the year end and add back the cost of goods sold since. Cost of those sales is $4,000 / 1.25 = $3,200, so $51,200 - $3,300 + $3,200 = $51,100."),
("Items costing $2,800 have been damaged. They can be sold for $1,900 after $350 is spent on repairs. The write-down needed is:",
 m(2800 - (1900 - 350)), [m(2800 - 1900), m(350), m(1900 - 350)],
 "NRV is $1,900 - $350 = $1,550, so inventory is written down from $2,800 by $1,250. Ignoring the repair cost gives $900."),
("A business that updates its inventory records after every receipt and issue of goods keeps:",
 "Continuous inventory records", ["Period-end inventory records", "An imprest inventory system", "A periodic weighted average"],
 "Continuous (perpetual) records show the quantity and value on hand at any time. Period-end records rely on a count at the year end."),
("Closing inventory is overstated by $4,600 and the error is not found. The effect on this year's profit and next year's profit is:",
 "Overstated now, understated next year", ["Understated now, overstated next year", "Overstated now and next year", "Overstated now, no effect next year"],
 "Overstated closing inventory lowers cost of sales, so profit is $4,600 too high. It becomes next year's opening inventory, raising next year's cost of sales, so the error reverses."),
("Goods costing $1,200 have been sent to a customer on sale or return and the customer has not yet accepted them. At the year end they should be:",
 "Included in the seller's inventory", ["Recorded as a sale at selling price", "Excluded from all inventory", "Included in the customer's inventory"],
 "Control has not passed until the customer accepts the goods, so no sale is recorded and the goods remain the seller's inventory at cost."),
("Which must be disclosed in the notes to the financial statements about inventories?",
 "The cost formula used", ["The names of major suppliers", "The selling price of each line", "Who carried out the count"],
 "IAS 2 requires disclosure of the accounting policy, including the cost formula (such as FIFO or weighted average), and the carrying amount by classification."),
("Which inventory cost formula is not permitted under IFRS Accounting Standards?",
 "LIFO", ["FIFO", "Weighted average cost", "Specific identification"],
 "IAS 2 permits FIFO and weighted average, and specific identification for items that are not interchangeable. Last in, first out is prohibited."),
]
