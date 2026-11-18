# Original CDM items; source tags refer to sources.md.
ITEMS=[('Three days of tray records show little eaten at lunch. Weight measurements are consistent, and the resident reports '
  'usual appetite but difficulty opening packages. Which assessment most directly tests the suspected barrier?',
  'Observe use of meal containers',
  ['Obtain a monthly food-frequency history',
   'Review the prescribed nutrient targets',
   'Compare admission and current weights'],
  'Nutrition Standard 2 combines records and direct observation. Watching access to the food tests the reported '
  'functional barrier; a diet history describes habits rather than package handling.',
  'N2'),
 ('A new resident has several long-term medicines and unexplained appetite changes. Which collaboration best evaluates '
  'possible food-drug interactions?',
  'Dietitian and pharmacist',
  ['Dietitian and speech therapist', 'Nurse and occupational therapist', 'Physician and physical therapist'],
  'Nutrition Standard 1 directs consultation with the RDN or NDTR and pharmacist for food-drug interactions. The CDM '
  'gathers relevant information rather than altering medicines.',
  'N1'),
 ('For MDS K0100, what is the minimum frequency of a listed swallowing symptom during the 7-day look-back that '
  'warrants recording it?',
  'One occurrence',
  ['Two occurrences on separate days', 'Three occurrences on separate days', 'An occurrence every day'],
  'The October 2026 CMS RAI manual says to code a listed symptom even if it occurred only once in the seven-day '
  'look-back. Repeated episodes or a confirmed diagnosis are not required to record the observed sign.',
  'CMS-K0100'),
 ('The team is investigating whether missed delivery explains low nourishment intake. Acceptance is already measured '
  'when cartons reach residents. Which additional measure tests the delivery hypothesis?',
  'Scheduled servings that reached residents',
  ['Milliliters consumed per delivered serving',
   'Calories listed per unopened carton',
   'Residents requesting a different flavor'],
  'Nutrition Standard 4 distinguishes delivery from acceptance. Counting scheduled servings actually delivered tests '
  'access; consumption among delivered servings is already known.',
  'N4'),
 ('A resident requests a breakfast substitution. The written plan requires one 15 g carbohydrate portion; the approved '
  'list gives the following servings. Which meets that specific requirement?',
  '½ cup: 30 g carbohydrate per cup',
  ['1 cup: 30 g carbohydrate per cup', '½ cup: 20 g carbohydrate per cup', '1 cup: 20 g carbohydrate per cup'],
  'Half a cup at 30 g carbohydrate per cup provides 15 g carbohydrate. One cup at 20 g/cup provides 20 g; half a cup at '
  '20 g/cup provides 10 g; one cup at 30 g/cup provides 30 g.',
  'N4'),
 ('An adult weighs 72 kg and is 1.60 m tall. Which BMI should the CDM enter in the screening record?',
  '28.1 kg/m²',
  ['22.5 kg/m²', '45.0 kg/m²', '115.2 kg/m²'],
  'BMI is kilograms divided by height in meters squared: 72 ÷ (1.60 × 1.60) = 28.125. Dividing by height only produces '
  '45, not BMI.',
  'CDC-BMI'),
 ('For MDS K0300, which historical weights are compared with the current weight to assess the specified weight-loss '
  'intervals?',
  'Those closest to 30 and 180 days earlier',
  ['The lowest weights in the previous year',
   'The highest weights in the previous month',
   'Only the last two weekly weights'],
  'The October 2026 CMS manual specifies two snapshots closest to 30 and 180 days before the current weight. Other '
  'weights still inform ongoing care, but they are not substitutes for these two comparison points.',
  'CMS-K0300'),
 ('A resident weighs 152 lb now and weighed 160 lb one month ago. What percentage of the previous weight was lost?',
  '5%',
  ['8%', '10%', '12%'],
  'Weight loss is 8 divided by the previous 160 lb, multiplied by 100, or 5%. Dividing by the current weight answers a '
  'different calculation.',
  'N1'),
 ('A care plan limits oral fluid to 1500 mL daily, assigns 300 mL to medication rounds and 300 mL between meals, and '
  "divides the remainder equally among three meals. What is each meal's allocation?",
  '300 mL per meal',
  ['400 mL per meal', '500 mL per meal', '600 mL per meal'],
  'The meal allowance is 1500 minus 600, or 900 mL. Dividing by three gives 300 mL; the other assigned fluids also '
  'count toward the limit.',
  'N1'),
 ('Lunch offers a 300 kcal entree, a 100 kcal side and a 120 kcal drink. The resident consumes half the entree, all '
  'the side and none of the drink. What intake should be recorded?',
  '250 kcal',
  ['260 kcal', '310 kcal', '370 kcal'],
  'The intake is 150 + 100 + 0 = 250 kcal. Applying a single percentage to the whole tray would misrepresent the '
  'different amounts consumed.',
  'N1'),
 ('A resident develops coughing during meals and difficulty managing the current texture. Which referral is most '
  'directly concerned with evaluating swallowing function?',
  'Speech-language pathologist',
  ['Registered dietitian', 'Clinical pharmacist', 'Dentist'],
  'The CMS nutrition assessment guidance identifies speech-language pathology among the services evaluating swallowing '
  'needs. Dietetics addresses nutritional adequacy, pharmacy medication concerns and dentistry oral/dental problems; '
  'they may contribute to the wider care team.',
  'CMS-K0100;N1'),
 ('At 10 a.m. a verified order changes the resident from regular to a prescribed low-sodium diet. The kitchen order '
  'feed shows low-sodium, the meal tally shows low-sodium, and the tray card printed at 8 a.m. shows regular. Where is '
  'the remaining discrepancy?',
  'The tray card used at assembly',
  ['The kitchen order feed', 'The meal-production tally', 'The 10 a.m. clinical order'],
  'Nutrition Standard 4 requires service instructions to implement the verified order. Here the feed and tally agree; '
  'the earlier card is the remaining conflicting record.',
  'N4'),
 ('A resident has an established gluten-free order and a documented milk allergy. Assuming controlled separate '
  'preparation, which grain side fits both requirements?',
  'Rice cooked with olive oil',
  ['Rice cooked with butter', 'Barley cooked with olive oil', 'Wheat couscous cooked with butter'],
  'Rice is naturally gluten-free and olive oil contains no milk ingredient. Butter introduces milk, while barley and '
  'wheat couscous introduce gluten. Separate preparation with appropriate controls helps prevent cross-contact.',
  'NIDDK-CELIAC;FC1-201.10'),
 ('A plan aims to raise mean lunch intake over all seven days from 40% to at least 60%, with portions unchanged. Which '
  'full-week consumption result demonstrates attainment?',
  '65% of each lunch portion on average',
  ['35% of each lunch portion on average',
   '45% of each lunch portion on average',
   '55% of each lunch portion on average'],
  'All choices describe the same full-week measure. The 65% result exceeds the 60% goal; the other means do not. Using '
  'a common period and denominator permits a direct comparison with the target.',
  'N3'),
 ('A 68-year-old resident has a calculated BMI of 18.2 kg/m². Which CDC adult BMI category applies?',
  'Underweight',
  ['Healthy weight', 'Overweight', 'Class 1 obesity'],
  'For adults, BMI below 18.5 is underweight. This is a screening category, not a diagnosis of malnutrition; intake, '
  'weight history and clinical findings still need assessment.',
  'CDC-BMI'),
 ('A yogurt label lists 14 g total sugars, including 6 g added sugars, per cup. What is the amount of naturally '
  'occurring sugar in one cup?',
  '8 g',
  ['6 g', '14 g', '20 g'],
  'Added sugars are included within total sugars. Subtracting 6 from 14 gives 8 g naturally occurring sugar; adding '
  'the two label lines would double-count added sugar.',
  'FDA-LABEL'),
 ('Two otherwise equivalent recipe ingredients provide 180 mg and 420 mg sodium per portion. A substitution uses the '
  'second ingredient at the same portion size. How does this affect the analysis?',
  'Add 240 mg sodium per portion',
  ['Subtract 240 mg sodium per portion', 'Add 600 mg sodium per portion', 'Keep 180 mg sodium per portion'],
  'The replacement adds 420 minus 180, or 240 mg sodium per portion. Nutrition Standard 4 requires analysis to reflect '
  'actual ingredients.',
  'N4'),
 ('A resident receives a prescribed pureed diet throughout the MDS observation period, not as a trial. Which K0520 '
  'category captures the texture change itself?',
  'Mechanically altered diet',
  ['Parenteral/IV feeding', 'Feeding tube', 'Therapeutic diet'],
  'K0520C captures texture or consistency changes such as puree. The CMS manual says a mechanically altered diet is '
  'not automatically therapeutic; the reason and prescription determine additional coding.',
  'CMS-K0520'),
 ('A plan targets maintaining weight while improving acceptance. Four-week records show weight stable, meal '
  'consumption rising from 40% to 70%, and the same meal prescription. Which summary describes the measured outcomes?',
  'Weight maintained; intake increased',
  ['Weight maintained; intake unchanged', 'Weight decreased; intake increased', 'Weight increased; intake decreased'],
  'Weight stayed stable and the proportion consumed rose from 40% to 70%. This describes the two measured outcomes '
  'without inferring an order change or proving what caused the improvement.',
  'N3'),
 ('A 240 mL beverage is one-quarter consumed. How much should the intake record show?',
  '60 mL',
  ['90 mL', '120 mL', '180 mL'],
  'One-quarter of 240 mL is 60 mL. Record the consumed amount rather than the 180 mL remaining.',
  'N1'),
 ("A resident's intake declined after the evening medicine round moved from after dinner to before dinner. Which "
  'comparison most directly examines that temporal association?',
  'Meals eaten before and after the change',
  ['Weights measured morning and evening',
   'Portions offered at breakfast and lunch',
   'Food preferences recorded at two admissions'],
  'Nutrition Standard 1 recognizes medication-related nutrition concerns. Comparing intake across the timing change '
  'examines the stated association without claiming it proves a drug effect.',
  'N1'),
 ('To adapt a sauce for a resident with celiac disease, the supplier replaces wheat flour with cornstarch. The revised '
  'formula also contains soy flour and barley malt extract. Which ingredient still prevents approval?',
  'Barley malt extract',
  ['Wheat flour', 'Soy flour', 'Plain corn starch'],
  'Replacing wheat flour removes one gluten source but does not remove barley malt. Soy and corn are not '
  'gluten-containing grains. The complete reformulated ingredient list and preparation controls still need review.',
  'NIDDK-CELIAC'),
 ('Weights were 150 lb and 149 lb on the same calibrated chair scale. Today the record says 130 lb from a standing '
  'scale, although the resident could not stand for weighing. Which measurement detail should be clarified first?',
  'The scale type used for today’s measurement',
  ['The clothing allowance used for today’s measurement',
   'The chair tare used for the earlier measurements',
   'The calibration record for the earlier chair scale'],
  'The recorded method conflicts with the resident’s ability to stand. That specific inconsistency needs clarification '
  'first. Clothing, tare and calibration can also affect weight accuracy but are not the contradiction shown here.',
  'N1'),
 ('An ordered drink supplies 12 g protein in 240 mL. A dietitian-approved replacement supplies 18 g in 240 mL. What '
  'volume provides the same protein as the original serving?',
  '160 mL',
  ['120 mL', '180 mL', '360 mL'],
  'The needed fraction is 12/18 of 240 mL, or 160 mL. This compares supplied product data within an approved '
  'substitution, not an independently prescribed target.',
  'N4'),
 ('The signed order specifies low sodium, but the kitchen feed shows regular. The tray card and delivered meal both '
  'follow the feed. Which comparison locates the first mismatch in this instruction chain?',
  'Signed order versus kitchen feed',
  ['Kitchen feed versus tray card', 'Tray card versus delivered meal', 'Production tally versus dispatch tally'],
  'The first discrepancy occurs when the clinical order is represented in the kitchen feed. Checking later documents '
  'against one another can miss a transcription error they share; those later checks serve different audit stages.',
  'N4'),
 ('A meal contains 30 g of a nutrient, but the client consumes two-thirds of each food. What is the calculated intake '
  'of that nutrient?',
  '20 g',
  ['10 g', '15 g', '45 g'],
  'Multiply 30 g by two-thirds to obtain 20 g. The offered nutrient amount is not the consumed amount.',
  'N1'),
 ('A resident’s renal diet permits less sodium, and staff propose a salt substitute. NIDDK cautions that these '
  'products can supply substantial amounts of which other mineral?',
  'Potassium',
  ['Calcium', 'Iron', 'Phosphorus'],
  'Many salt substitutes use potassium chloride. For someone whose plan also limits potassium, reducing sodium this '
  'way can introduce a different concern; the ingredient list and prescribed plan must be checked.',
  'NIDDK-CKD'),
 ('A label shows 4% Daily Value for sodium and 22% for fiber per serving. Using FDA’s general label guide, which '
  'description fits?',
  'Low sodium; high fiber',
  ['High sodium; low fiber', 'Low sodium; low fiber', 'High sodium; high fiber'],
  'FDA’s guide calls 5% DV or less low and 20% or more high. Apply each threshold to its own nutrient; these guides do '
  'not replace a prescribed intake target.',
  'FDA-LABEL'),
 ('A fortified snack is intended to add intake between meals. Records show 150 kcal consumed from the snack but a 150 '
  'kcal reduction at dinner, with other intake unchanged. What does this show?',
  'No net increase in daily energy intake',
  ['A 150 kcal gain in daily energy intake',
   'A 300 kcal gain in daily energy intake',
   'A 150 kcal fall in daily energy intake'],
  'The snack addition and dinner reduction cancel. Monitoring the whole-day response avoids mistaking consumption of '
  'the intervention for a net nutritional gain.',
  'N4'),
 ('The fluid record contains 600 mL consumed with meals and 250 mL consumed with medicines. An aide reliably reports '
  'another 200 mL consumed between meals, not yet entered. What is the corrected oral-fluid total?',
  '1050 mL',
  ['800 mL', '850 mL', '1250 mL'],
  "Add all reported consumed oral fluids: 600 + 250 + 200 = 1050 mL. Attribute the aide's report according to "
  'documentation procedures; solid-food amounts are not part of this calculation.',
  'N1'),
 ('Two cereals are compared for a prescribed portion of 60 g. Their labels use serving sizes of 30 g and 60 g. What '
  'must be done before comparing the listed nutrient amounts?',
  'Convert both to the 60 g portion',
  ['Compare the calories per package', 'Use the smaller serving for both', 'Compare only their percentage columns'],
  'Nutrition Facts values refer to the stated serving. The 30 g label must be doubled for a 60 g portion; the 60 g '
  'label already matches. Percent Daily Values also depend on serving size.',
  'FDA-LABEL'),
 ('A resident follows a lactose-reduced plan and tolerates the approved choices. Which dairy snack generally contains '
  'less lactose than an equal portion of milk and is identified by NIDDK as an option some people tolerate?',
  'Aged cheddar cheese',
  ['Sweetened condensed milk', 'Evaporated milk', 'Nonfat dry milk powder'],
  'Hard cheeses such as cheddar are lower in lactose than many other milk products. Tolerance varies; the existing '
  'plan and the resident’s response govern portions. The other choices retain milk lactose.',
  'NIDDK-LACTOSE'),
 ('A three-day calorie count gives 1500, 1800,and 1500 kcal. What is the daily average?',
  '1600 kcal',
  ['1500 kcal', '1700 kcal', '1800 kcal'],
  'The total is 4800 kcal. Dividing by 3 days gives 1600 kcal per day.',
  'N1'),
 ('When dairy foods are removed from a menu because of lactose intolerance, which pair of nutrients most directly '
  'needs review to avoid reducing the usual contribution from fortified milk?',
  'Calcium and vitamin D',
  ['Iron and vitamin B12', 'Potassium and vitamin C', 'Folate and vitamin K'],
  'NIDDK highlights calcium and vitamin D when milk products are limited. Lactose-free dairy or appropriate fortified '
  'alternatives may supply them; avoiding lactose does not automatically require avoiding all dairy.',
  'NIDDK-LACTOSE'),
 ('CBDM Nutrition Standard 1 identifies weight change greater than 5% in 30 days as a risk indicator. Which recorded '
  '30-day loss crosses that threshold?',
  'From 150 lb to 140 lb',
  ['From 150 lb to 145 lb', 'From 150 lb to 144 lb', 'From 150 lb to 143 lb'],
  'A 10 lb loss from 150 lb is about 6.7%, above 5%. The other listed losses are less than 5%; this is a screening '
  'indicator, not a diagnosis.',
  'N1'),
 ('A recipe is being adjusted under a plan to replace saturated fat with unsaturated fat for a resident with a sesame '
  'allergy. Which substitution meets both needs?',
  'Canola oil for butter',
  ['Unrefined sesame oil for butter', 'Butter for olive oil', 'Cream for canola oil'],
  'Canola oil provides an unsaturated-fat alternative to butter without introducing sesame. Unrefined sesame oil '
  'conflicts with the allergy, while the other substitutions increase saturated-fat sources. Recipe performance still '
  'needs testing.',
  'NIDDK-CKD;FC1-201.10'),
 ('The dietitian asks the CDM to flag added phosphorus in a processed chicken product. Which ingredient provides that '
  'evidence?',
  'Sodium phosphate',
  ['Sodium ascorbate', 'Sodium chloride', 'Sodium bicarbonate'],
  'The phosphate ingredient supplies phosphorus. The other named sodium compounds do not contain phosphate. NIDDK '
  'recommends checking ingredient names containing PHOS when identifying added phosphorus.',
  'NIDDK-CKD'),
 ('A resident with advanced kidney disease has a prescribed fluid limit. Which physiological change most directly '
  'explains the restriction?',
  'Reduced excretion of excess water',
  ['Increased urinary loss of water',
   'Reduced absorption of water from the intestine',
   'Increased water loss through the lungs'],
  'Reduced kidney removal of water can lead to fluid accumulation. The other mechanisms describe losses or reduced '
  'uptake and do not explain a restriction intended to control retention; the prescribed allowance remains '
  'individualized.',
  'NIDDK-CKD'),
 ('A nursing-facility resident retains decision-making capacity and has delegated only bill payment to a daughter. Who '
  'retains the right to participate in dietary care decisions under 42 CFR 483.10?',
  'The resident',
  ['The daughter as bill payer', 'The facility administrator', 'The resident’s admitting contact'],
  'Section 483.10(b) limits a representative to delegated authority and leaves other rights with the resident. Paying '
  'bills does not itself delegate dietary care decisions.',
  'CFR483.10'),
 ('A nursing-facility resident asks to attend the meeting where the team will revise the nutrition care plan. Which '
  'right under 42 CFR 483.10 most directly applies?',
  'Participation in care planning',
  ['Choice of attending physician', 'Access to personal possessions', 'Notice of a room transfer'],
  'Section 483.10(c) gives residents the right to participate in developing and implementing their care plan, '
  'including requesting meetings and revisions. The other listed rights address different decisions.',
  'CFR483.10')]
