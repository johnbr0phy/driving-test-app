ITEMS=[]
def family(options,rows):
 for i,(q,e) in enumerate(rows):ITEMS.append((q,[options[i]]+options[:i]+options[i+1:],e))
family(['Allocation method','Extraction method','Land residual method','Subdivision development method'],[
('Reliable comparable properties indicate that site value represents 25% of total property value. An appraiser applies that relationship to an improved sale. Which site valuation method is used?','Allocation applies a supported relationship between land value and total property value.'),
('An appraiser subtracts the supported depreciated value of improvements from an improved property\'s sale price to indicate land value. Which method is used?','Extraction isolates the site by subtracting the contributory value of improvements from the total.'),
('An appraiser deducts the income attributable to a proposed building from the property\'s net income, then capitalizes the income remaining for land. Which method is used?','The land residual method assigns income to improvements first and capitalizes the residual return to land.'),
('An appraiser forecasts lot-sale receipts, development costs, selling costs and their timing for a tract to be divided into lots. Which method organizes this analysis?','Subdivision development analysis considers a development program and the present value of its net proceeds, not merely the sum of future retail lot prices.')])
family(['$60,000','$80,000','$100,000','$120,000'],[
('Comparable evidence supports a land-to-total ratio of 20%. Applying allocation to a $300,000 improved property, what site value is indicated?','The indicated land share is $300,000 × 0.20 = $60,000.'),
('An improved property sells for $310,000. Its improvements contribute $230,000 after depreciation. What site value does extraction indicate?','Subtract improvement contribution from total value: $310,000 - $230,000 = $80,000.'),
('A site produces a perpetual net ground rent of $6,000 annually. At a supported 6% land capitalization rate, what value is indicated?','Direct capitalization gives $6,000 / 0.06 = $100,000, assuming the stated stable perpetual income.'),
('For a subdivision analysis, discounted lot receipts total $480,000. Discounted non-land development outlays, including the required profit allowance, total $360,000. What land value remains?','Both amounts are already present values, so subtract once: $480,000 - $360,000 = $120,000.')])
assert len(ITEMS)==8
