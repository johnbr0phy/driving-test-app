ITEMS=[]
def family(options,rows):
 for i,(q,e) in enumerate(rows):ITEMS.append((q,[options[i]]+options[:i]+options[i+1:],e))
family(['Reproduction cost','Replacement cost','Historical cost','Depreciated improvement value'],[
('A specialist estimates the current expense of duplicating an older house using the same design, materials and workmanship, including its obsolete layout. What is being estimated?','Reproduction cost estimates a replica, including features that may be functionally obsolete.'),
('A cost service estimates a modern house with equivalent usefulness to the subject, using current materials and a contemporary layout. What cost concept applies?','Replacement cost is the current cost of an improvement with equivalent utility, not necessarily an exact replica.'),
('An owner provides the actual construction expenditure recorded when a house was built 18 years ago. Before any updating or depreciation analysis, what does that amount represent?','Historical cost records the expenditure at the original construction date; it is not automatically current cost or value.'),
('An appraiser starts with current improvement cost and deducts all supported loss from deterioration and obsolescence. Before adding land, what is the resulting amount?','Deducting accrued depreciation from improvement cost produces depreciated improvement value.')])
family(['Physical deterioration','Functional obsolescence','External obsolescence','Entrepreneurial incentive'],[
('A roof has worn shingles and active leaks from years of weather exposure. Which cost-approach concept describes this loss?','Wear and damage to the improvement are physical deterioration.'),
('A house is well maintained, but its only bathroom can be reached through a bedroom. Buyers discount this inefficient layout. Which loss is indicated?','A design deficiency within the property is functional obsolescence even when materials are in good condition.'),
('A newly opened off-site waste facility reduces demand for nearby homes. The subject itself has no construction defect. Which loss is indicated?','An adverse influence originating outside the property is external obsolescence.'),
('A developer requires compensation for coordinating a project and bearing its risk, in addition to reimbursement of construction and other costs. Which allowance is being estimated?','Entrepreneurial incentive is the anticipated reward needed to undertake and coordinate the development risk.')])
family(['Quantity survey method','Unit-in-place method','Comparative unit method','Trended historical cost method'],[
('A cost estimate separately prices detailed quantities of lumber, concrete, labor and every other component, then adds applicable indirect costs. Which method is used?','Quantity survey builds a detailed estimate from individual material and labor requirements.'),
('An estimator prices complete installed wall, roof and foundation assemblies by their appropriate units, then combines them. Which method is used?','Unit-in-place costing uses installed component or assembly costs rather than a single whole-building unit.'),
('A supported whole-house cost of $185 per square foot is applied to a 1,600-square-foot building and adjusted for differences. Which method is used?','Comparative unit costing applies a whole-building unit cost, commonly per square foot, with relevant adjustments.'),
('A verified original construction cost is multiplied by a suitable cost index ratio to estimate current cost before depreciation. Which method is used?','Trending updates historical cost by an index reflecting cost changes; it does not by itself measure depreciation.')])
family(['$180,000','$210,000','$240,000','$270,000'],[
('A building has current cost of $300,000, effective age of 20 years and total economic life of 50 years. Using straight-line age-life depreciation and no additional deductions, what improvement value remains?','Depreciation is 20/50 × $300,000 = $120,000. The remaining improvement value is $180,000.'),
('Land is worth $70,000. Improvement cost is $200,000 and total accrued depreciation is $60,000. What value does the cost approach indicate?','Add land to depreciated improvements: $70,000 + $200,000 - $60,000 = $210,000.'),
('A 1,500-square-foot building has a supported replacement cost of $160 per square foot. Before land, depreciation or additional costs, what is the indicated building cost?','The stated unit cost gives 1,500 × $160 = $240,000.'),
('A building originally cost $225,000. Its applicable cost index increased from 200 to 240. What current cost does index trending indicate before depreciation?','Use the index ratio: $225,000 × 240/200 = $270,000.')])
family(['Actual age','Effective age','Total economic life','Remaining economic life'],[
('A dwelling was completed 32 years before the valuation date. Which age measure is determined directly by that elapsed time?','Actual age is chronological time since construction.'),
('After substantial modernization, a 32-year-old dwelling has condition and utility comparable to typical 12-year-old houses. What does the 12-year estimate describe?','Effective age reflects condition and utility rather than simply the calendar age.'),
('An appraiser estimates the full period from new construction until a building ceases contributing to property value. Which life measure is this?','Total economic life spans the complete period during which the improvement contributes value.'),
('From the valuation date onward, an improvement is expected to contribute value for another 28 years. Which measure is 28 years?','Remaining economic life measures future contribution from the valuation date, not the full life from construction.')])
assert len(ITEMS)==20
