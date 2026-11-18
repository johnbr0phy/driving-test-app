# Original CDM items; source tags refer to sources.md.
ITEMS=[('A department spends $6300 on raw food for 900 patient days. What is the raw-food cost per patient day?',
  '$7.00',
  ['$3.00', '$9.00', '$14.00'],
  'CBDM Business Standards 1 and 4 use cost per patient day. Divide 6300 by 900 to obtain $7.00.',
  'B4'),
 ('Facility policy treats equipment purchases above $5000 as capital and routine service as operating expense. Which '
  'proposed item belongs in the capital request under that policy?',
  'A $7200 refrigerator replacement',
  ['A $1200 refrigerator repair', 'A $900 annual service agreement', 'A $600 replacement door gasket'],
  'Business Standard 1 separates capital equipment proposals from operating costs. Under the supplied policy, the '
  'replacement meets the threshold; the other entries are repair or service expenses.',
  'B1'),
 ('A food item costs $2.40 to produce in ingredients. Using a 30% food-cost percentage pricing method, what is its '
  'selling price?',
  '$8.00',
  ['$3.12', '$6.00', '$7.20'],
  'Divide ingredient cost by the desired food-cost fraction:2.40/0.30=$8.00. Adding 30% is a markup calculation, not '
  'this method.',
  'B4'),
 ('Making a product costs $80 in ingredients and 4 labor hours at $20 per hour. Buying the same usable yield and '
  'quality costs $150 delivered and needs no additional labor. Which comparison follows these assumptions?',
  'Buying saves $10 per batch',
  ['Making saves $10 per batch', 'Buying saves $70 per batch', 'Making saves $70 per batch'],
  'The in-house total is 80 + 4×20 = $160. Buying at $150 saves $10; comparing $80 with $150 would omit the specified '
  'labor.',
  'B1'),
 ('Food spending rises from $6000 for 1000 patient days to $7200 for 1200 patient days. What happened to cost per '
  'patient day?',
  'It remained at $6',
  ['It rose from $6 to $7.20', 'It fell from $7.20 to $6', 'It rose from $5 to $6'],
  'Both periods cost $6 per patient day. Business Standard 1 uses volume-normalized measures; higher total expense '
  'here accompanies proportionately higher volume.',
  'B1'),
 ('A kitchen serves 720 meal equivalents using 90 labor hours. What is its productivity?',
  '8 meals per labor hour',
  ['6 meals per labor hour', '9 meals per labor hour', '12 meals per labor hour'],
  'Business Standard 4 measures meal equivalents per labor hour:720/90=8.',
  'B4'),
 ('A vendor offers meat priced per purchased pound. The recipe is portioned after trimming. Which specification is '
  'needed to compare cost for the amount actually served?',
  'Expected edible yield',
  ['Expected delivery lead time', 'Expected invoice payment interval', 'Expected minimum order frequency'],
  'Business Standard 2 requires specifications suited to use. Edible yield connects purchased weight to served '
  'quantity, while the other terms concern purchasing logistics.',
  'B2'),
 ('A warehouse’s book inventory exceeds its physical count. Which source pair best investigates whether an issue was '
  'made but never deducted from the stock record?',
  'Signed pickup receipts and issue entries',
  ['Purchase orders and vendor price lists',
   'Supplier invoices and payment vouchers',
   'Menu forecasts and standard recipes'],
  'The Washington Agriculture inventory manual uses signed pickup receipts to trace movements against book records. An '
  'unposted issue requires evidence of goods leaving, not purchase prices, payments or planned consumption.',
  'WA-INVENTORY'),
 ('An oven quote is $8000. Required installation is $1500 and freight $500; the existing electrical supply is '
  'suitable. What acquisition amount should this proposal include?',
  '$10000',
  ['$8000', '$8500', '$9500'],
  'The specified acquisition costs total 8000 + 1500 + 500 = $10000. No additional electrical cost is stated.',
  'B1'),
 ('Supply cost per patient day rises from $1.50 to $1.80 over 3000 patient days. At the later volume, how much more '
  'was spent than if the earlier rate had continued?',
  '$900',
  ['$300', '$5400', '$4500'],
  'The rate increase is $0.30 per patient day. At 3000 patient days that adds $900, distinguishing the variance from '
  'the total supply expense.',
  'B1'),
 ('A proposed office-lunch service attracted many free-sample compliments but few paid trial orders. Which next study '
  'best separates enjoyment of the food from willingness to buy it?',
  'Offer paid trial orders at several stated prices',
  ['Repeat free tastings with a larger office group',
   'Ask employees to rank the flavors they sampled',
   'Compare cafeteria menu variety at nearby offices'],
  'Actual paid trials at explicit prices investigate purchase behavior. More free tastings and flavor rankings measure '
  'liking, while competitor variety supplies context without measuring demand for this offer.',
  'B3'),
 ('An item has a raw-food cost of $1.80 and the facility uses a pricing factor of 4. What is the calculated menu '
  'price?',
  '$7.20',
  ['$0.45', '$5.80', '$3.60'],
  'Multiply the $1.80 raw-food cost by the pricing factor of 4 to obtain $7.20. Dividing by 4, adding 4 or doubling '
  'the cost applies a different operation.',
  'B4'),
 ('A department’s hourly wage expense exceeded budget despite unchanged meal volume. The manager needs to separate the '
  'price and usage components of the change. Which pair of budget-to-actual measures supports that calculation?',
  'Labor hours and hourly pay rates',
  ['Labor hours and employee headcount', 'Meal counts and employee headcount', 'Meal counts and hourly pay rates'],
  'Labor expenditure depends on hours multiplied by the applicable pay rate. Comparing both factors with budget '
  'separates usage from price; headcount and meal counts can explain workload but do not replace hours in that '
  'calculation.',
  'B1'),
 ('Product A costs $3 per purchased pound with 75% edible yield. Product B costs $3.60 with 90% yield. What is true of '
  'their edible-pound cost?',
  'Both cost $4 per edible pound',
  ['A costs less per edible pound', 'B costs less per edible pound', 'Both cost $3.30 per edible pound'],
  'A costs 3/0.75 = $4 and B costs 3.60/0.90 = $4 per edible pound. Purchase price alone makes A appear cheaper, but '
  'its yield is lower.',
  'B4'),
 ('A budget allows $12000 for a month and actual spending is $12900. What is the unfavorable dollar variance?',
  '$900',
  ['$75', '$1200', '$24900'],
  'Actual expense minus budget is 12900-12000=$900 unfavorable. Adding the two figures does not calculate a variance.',
  'B3'),
 ('Daily use is 10 units, lead time is four days, and policy adds 15 units of safety stock. What reorder point follows '
  'those assumptions?',
  '55 units',
  ['25 units', '40 units', '65 units'],
  'Lead-time demand is 10×4 = 40 units; adding 15 safety-stock units gives 55. Business Standard 2 considers usage and '
  'lead time in inventory planning.',
  'B2'),
 ("A kitchen's food, labor and supplies cost $1800,$2400,and $600 for 600 meals. What is total cost per meal?",
  '$8.00',
  ['$3.00', '$4.00', '$7.00'],
  'Total cost is 4800. Dividing by 600 meals gives $8.00; using only one expense category understates total cost.',
  'B4'),
 ('Opening change is $100, cash sales are $460 and the closing drawer is $550. No refunds, payouts or other cash '
  'movements occurred. What discrepancy should be investigated?',
  '$10 short',
  ['$10 over', '$90 short', '$100 over'],
  'Expected cash is 100 + 460 = $560. The $550 count is $10 short; the opening float must be included in '
  'reconciliation.',
  'B3'),
 ('Only 40 usable units are needed before expiry. Offer A is 40 units for $80; offer B is 60 units for $108, with 20 '
  'unusable after expiry. Quality and handling costs are equal. Which purchasing choice minimizes cost for the needed '
  'usable quantity?',
  'Offer A, $2 per needed unit',
  ['Offer B, $1.80 per purchased unit', 'Offer B, $2.70 per needed unit', 'Offer A, $1.33 per purchased unit'],
  'Offer A supplies the needed 40 at $80. Although B has a lower purchased-unit price, its $108 cost over 40 usable '
  'units is $2.70; the extra expiring units do not create value.',
  'B2/B3'),
 ('A department uses 60 labor hours to produce 450 meals. What is labor time per meal?',
  '8 minutes',
  ['6 minutes', '7.5 minutes', '10 minutes'],
  'Sixty hours is 3600 minutes.3600/450=8 minutes per meal.',
  'B1'),
 ('A five-year comparison estimates repair-and-operate at $18000 and replace-and-operate at $15000, including '
  'installation and upkeep. Performance is equivalent and neither has residual value. Which option has the lower '
  'stated cost?',
  'Replacement by $3000',
  ['Repair by $3000', 'Replacement by $15000', 'Repair by $18000'],
  'The five-year totals differ by $3000 in favor of replacement. Business Standard 1 compares alternatives using '
  'relevant costs rather than equipment age alone.',
  'B1'),
 ('Two kitchens report meals per labor hour. Site A counts cooking and dishroom hours; site B counts cooking alone. To '
  'retain A’s broader measure at both sites, which correction is needed?',
  'Include dishroom hours in B’s denominator',
  ['Exclude leave hours from B’s denominator',
   'Include overtime hours in A’s denominator',
   'Exclude supervisory hours from A’s denominator'],
  'The documented difference is inclusion of dishroom work. Adding that function at B aligns the scope while retaining '
  'A’s measure; the other adjustments address hour categories not identified as the mismatch.',
  'B1'),
 ('A case contains 24 portions and costs $48. Four portions are unusable. What is the ingredient cost per usable '
  'portion for that case?',
  '$2.40',
  ['$2.00', '$2.20', '$3.00'],
  'Twenty usable portions remain. Dividing the full $48 case cost by 20 gives $2.40; dividing by 24 would ignore the '
  'loss.',
  'B4'),
 ('A proposed menu reduces total ingredient expense from $500 to $450 but reduces accepted meals from 100 to 75. Which '
  'interpretation follows for ingredient cost per accepted meal?',
  'It rises from $5 to $6',
  ['It falls from $5 to $4.50', 'It remains at $5', 'It falls from $6 to $5'],
  'The first cost is 500/100 = $5; the second is 450/75 = $6. Business Standard 3 considers service outcomes as well '
  'as total spending.',
  'B3'),
 ("Next month's patient days are forecast to fall by 10%. The budget model treats food cost as proportional to patient "
  'days and equipment lease cost as fixed. Which adjustment follows that model?',
  'Reduce food 10%; retain lease cost',
  ['Reduce food 10%; reduce lease 10%', 'Retain food cost; reduce lease 10%', 'Retain food cost; retain lease cost'],
  'Under the supplied model, the volume-sensitive food component changes but the fixed lease does not. Business '
  'Standard 1 considers expected census in operating budgets.',
  'B1'),
 ('A kitchen uses FEFO rotation for dated stock. A case received Monday expires June 20; an equivalent case received '
  'Wednesday expires June 12. Both are sound. Which case should be issued first?',
  'The Wednesday case',
  ['The Monday case', 'The case with the lower unit price', 'Either case without considering dates'],
  'First expired, first out prioritizes the earlier expiry, so the Wednesday receipt is used first. FIFO alone '
  'prioritizes receipt date; pricing does not determine FEFO rotation.',
  'WA-INVENTORY'),
 ('Two approved fruit grades have equal safety, flavor and edible yield. The more expensive one differs in whole-piece '
  'uniformity. Which recipe use makes that difference least valuable?',
  'A chopped fruit filling',
  ['A whole-fruit display', 'An arranged fruit platter', 'A centerpiece of uniform pieces'],
  'Business Standard 3 advises against paying for quality features not needed for the use. Chopping removes the '
  'appearance benefit that matters in the other presentations.',
  'B3'),
 ('An equipment investment costs $12000 and is expected to save $3000 annually. Ignoring financing and residual value, '
  'what is its simple payback period?',
  '4 years',
  ['2 years', '3 years', '5 years'],
  'Divide the initial 12000 investment by annual savings of 3000 to obtain 4 years. This simple comparison is one '
  'input, not a complete capital decision.',
  'B1')]
