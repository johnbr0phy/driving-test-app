ITEMS=[]
def family(options,rows):
 for i,(q,e) in enumerate(rows):ITEMS.append((q,[options[i]]+options[:i]+options[i+1:],e))
family(['Potential gross income','Effective gross income','Net operating income','Before-tax equity cash flow'],[
('At full occupancy and scheduled rents, a small rental property would generate $48,000 annually before vacancy or expenses. Which income measure is $48,000?','Potential gross income assumes the stated full income potential before vacancy and collection loss.'),
('A rental analysis subtracts vacancy and collection loss from potential gross income and adds other property income. Which subtotal results before operating expenses?','Effective gross income reflects expected income after vacancy and collection loss, including applicable other income.'),
('An appraiser deducts property operating expenses from effective gross income, without deducting mortgage payments or owner income tax. Which measure results?','Net operating income is property income after operating expenses and before debt service and owner income tax.'),
('An investor subtracts annual mortgage debt service from the property\'s net operating income. Before owner income taxes, what is the remaining amount called?','Before-tax equity cash flow is the income remaining to equity after debt service.')])
family(['$250,000','$300,000','$350,000','$400,000'],[
('A property has stabilized annual net operating income of $20,000. A supported overall capitalization rate is 8%. What value does direct capitalization indicate?','Value = NOI / rate = $20,000 / 0.08 = $250,000.'),
('Comparable properties support a monthly gross rent multiplier of 120. The subject\'s market rent is $2,500 per month. What value is indicated?','Match monthly rent with the monthly multiplier: $2,500 × 120 = $300,000.'),
('An investment is expected to provide one total cash receipt of $385,000 exactly one year from now, with no other cash flows. At a 10% annual discount rate, what is its present value?','Discount the single future receipt: $385,000 / 1.10 = $350,000.'),
('A rental has annual effective gross income of $42,000 and operating expenses of $18,000. Using a 6% overall capitalization rate, what property value is indicated?','NOI is $42,000 - $18,000 = $24,000. Capitalize $24,000 / 0.06 = $400,000.')])
assert len(ITEMS)==8
