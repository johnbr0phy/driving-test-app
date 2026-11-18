# Original CDM items; source tags refer to sources.md.
ITEMS=[('Two cooks use identical ingredient quantities but one produces 42 portions and the other 50. Both portion the '
  'finished batch accurately. Which record most directly tests whether production loss explains the difference?',
  'Finished batch weight',
  ['Expected diner count', 'Ingredient purchase price', 'Menu selection frequency'],
  'Foodservice Standard 1 uses standardized yield and portions. With portioning already checked, finished batch weight '
  'tests whether less product remained after preparation.',
  'F1'),
 ('A recipe yields 40 portions and is needed for 100. What multiplier applies to its ingredient quantities?',
  '2.5',
  ['0.4', '1.5', '4.0'],
  'Divide the desired 100 portions by the original 40 to obtain 2.5. Apply the factor before testing the scaled '
  'recipe.',
  'F1'),
 ('A newly served dish meets temperature and portion specifications. Residents describe an unfamiliar bitter taste. '
  'Which evaluation most directly tests a recipe change intended to reduce that bitterness?',
  'Resident sensory comparison',
  ['Dispatch-time comparison', 'Portion-weight comparison', 'Ingredient-price comparison'],
  'Foodservice Standard 1 uses acceptance evaluation to adapt recipes. A sensory comparison among residents tests the '
  'reported taste problem; production and cost measures test different outcomes.',
  'F1'),
 ('Two dishes require the single oven: one at 350°F from 10 to 11 a.m., and one at 425°F from 10:30 to 11 a.m. Both '
  'are due at 11:15. What conflict must be resolved?',
  'Concurrent equipment demand',
  ['Insufficient ingredient yield', 'Inconsistent portion standards', 'Incompatible dietary prescriptions'],
  'Foodservice Standard 2 requires schedules to consider equipment availability. The two simultaneous temperature '
  'settings cannot be supplied by the stated single oven.',
  'F2'),
 ('The approved substitution specification requires at least 8 g protein and no more than 200 mg sodium per portion. '
  'Which listed product qualifies?',
  '9 g protein; 180 mg sodium',
  ['7 g protein; 160 mg sodium', '10 g protein; 240 mg sodium', '6 g protein; 220 mg sodium'],
  'The qualifying product meets both supplied limits. A lower-sodium product can still fail the protein requirement, '
  'and a higher-protein one can exceed sodium.',
  'F2'),
 ('A standardized recipe costs $72 for 48 servings. What is its ingredient cost per serving?',
  '$1.50',
  ['$0.67', '$2.00', '$3.50'],
  'Divide 72 by 48 to obtain $1.50. Recipe cost per portion uses the number of portions actually yielded.',
  'B4'),
 ('A recipe needs 100 drained 4-ounce portions of canned peaches. Which purchasing specification controls the amount '
  'usable after liquid is removed?',
  'Drained product weight',
  ['Gross shipping weight', 'Total can fill weight', 'Empty container weight'],
  'Foodservice Standard 2 requires specifications suited to intended use. Drained weight measures usable fruit for '
  'these portions; total fill includes liquid.',
  'F2'),
 ('A recipe transferred to a new oven yields acceptable flavor but uneven browning between shelves. Ingredient amounts '
  'and portions match the standard. What trial most directly addresses the observed difference?',
  'Adjust pan placement during baking',
  ['Change the recipe portion size', 'Change the ingredient purchase grade', 'Adjust the number of forecast diners'],
  'Foodservice Standard 1 requires adapting methods to facility conditions. Uneven shelf performance points to '
  'equipment use rather than demand or portion calculation.',
  'F1'),
 ('A tray audit finds 9 errors among 60 trays, counting any tray with an error as inaccurate. What percentage is '
  'accurate?',
  '85%',
  ['15%', '90%', '95%'],
  'There are 51 accurate trays.51 divided by 60 is 85%; 15% is the error rate.',
  'F3'),
 ('A cold dessert must set for four hours and needs 30 minutes of mixing before refrigeration. Service begins at noon. '
  'What is the latest mixing start time?',
  '7:30 a.m.',
  ['8:00 a.m.', '8:30 a.m.', '9:00 a.m.'],
  'Working backward from noon requires refrigeration by 8 a.m. and mixing from 7:30 a.m. Foodservice Standard 2 '
  'coordinates preparation and completion times.',
  'F2'),
 ('The regular forecast is 120 lunches. A 20-person unit closes for the day and 8 visitors have confirmed lunches; all '
  'other demand is unchanged. What forecast follows?',
  '108 lunches',
  ['92 lunches', '100 lunches', '128 lunches'],
  'Subtract the 20 absent diners and add the 8 visitors: 120 - 20 + 8 = 108. Forecasts should reflect the stated '
  'changes in demand.',
  'F2'),
 ('A cooked batch contains 12 quarts. How many 6-fluid-ounce portions does it provide, using 32 fluid ounces per '
  'quart?',
  '64 portions',
  ['48 portions', '72 portions', '96 portions'],
  'Twelve quarts contain 384 fluid ounces. Dividing by 6 gives 64 portions.',
  'F1'),
 ('The goal is to learn whether residents prefer a less-sweet sauce to the current recipe. Which tasting plan best '
  'matches that population and comparison?',
  'Residents taste both coded versions',
  ['Kitchen staff taste both coded versions',
   'Residents rate the new sauce after rollout',
   'Kitchen staff rate the current sauce'],
  'Foodservice Standards 1 and 3 support acceptance testing. Residents comparing both versions directly address the '
  'intended population and change; a staff panel may not represent resident preferences.',
  'F1/F3'),
 ('A 200-ounce batch should provide fifty 4-ounce servings, but the ladle delivers 5 ounces. Which change corrects '
  'portion size while retaining the batch and serving-count targets?',
  'Use a 4-ounce portion measure',
  ['Increase the batch to 250 ounces', 'Lower the serving target to forty', 'Keep fifty servings at 5 ounces'],
  'The specification requires fifty 4-ounce servings from 200 ounces. Changing the measure restores that standard; the '
  'other changes alter a target or require more food.',
  'F1'),
 ("A meal-audit tray has the correct prescribed foods and weights. Its hot entree arrives below the facility's "
  'documented serving-quality target, although dispatch checks passed. Which stage needs investigation?',
  'Transport and service',
  ['Recipe nutrient analysis', 'Ingredient receiving', 'Menu preference collection'],
  'Foodservice Standard 2 monitors meal conditions through delivery. The compliant dispatch check and deficient '
  'arrival point to transport or service rather than recipe analysis.',
  'F2'),
 ('A recipe needs 18 lb of edible trimmed produce. The verified yield is 75% of purchased weight. How much should be '
  'bought?',
  '24 lb',
  ['13.5 lb', '22.5 lb', '32 lb'],
  'Divide the required edible 18 lb by 0.75 to obtain 24 lb as purchased. Multiplication would calculate edible yield '
  'from a purchased amount.',
  'F1'),
 ('After a tray-accuracy project, service volume rises from 100 to 150 trays daily. Which comparison most fairly shows '
  'whether residents became less likely to receive the wrong prescribed meal?',
  'Incorrect trays as a percentage of trays served',
  ['Number of incorrect trays found each day',
   'Number of tray checks completed each day',
   'Number of staff completing tray-check training'],
  'The error rate accounts for changing service volume. Raw counts may rise with volume despite improvement; checks '
  'and training describe activities rather than the frequency of incorrect meals reaching residents.',
  'F3'),
 ('After a dispatch change, delays fall from 20 to 8 per 100 trays, but errors rise from 2 to 10 per 100. What '
  'conclusion is supported?',
  'Speed improved while accuracy worsened',
  ['Both speed and accuracy improved', 'Accuracy improved while speed worsened', 'Neither speed nor accuracy changed'],
  'QAPI requires interpreting all relevant results. Fewer delays indicate better timeliness, while the higher error '
  'rate reveals an adverse tradeoff.',
  'F3'),
 ('An oil-and-vinegar dressing separates during holding. Which food-science concept explains the mixture formed when '
  'it is whisked together again?',
  'Emulsion',
  ['Coagulation', 'Caramelization', 'Gelatinization'],
  'An emulsion disperses otherwise unmixable liquids. Coagulation concerns proteins, caramelization sugars, and '
  'gelatinization starch.',
  'ICN-KEYSTONES'),
 ('For a banquet, 96 people each need a 5-ounce cooked portion. How many pounds of cooked product are required?',
  '30 lb',
  ['19.2 lb', '24 lb', '36 lb'],
  'The total is 480 ounces. Dividing by 16 ounces per pound gives 30 lb of cooked product.',
  'F1'),
 ('A waste log shows 8 lb discarded during trimming, 3 lb left after service and 11 lb returned on trays. Which stage '
  'accounts for the greatest recorded loss?',
  'After food reaches diners',
  ['During raw preparation', 'After production before service', 'During supplier receiving'],
  'Plate returns total 11 lb, more than trimming or unserved leftovers. Foodservice Standard 2 uses stage-specific '
  'waste data to target investigation.',
  'F2'),
 ('Food is ready at 11:30, carts depart at 11:50 and arrive at noon. The target is delivery by 11:45. Travel time is '
  'fixed at 10 minutes. Which interval needs at least 15 minutes removed?',
  'Ready-to-depart waiting',
  ['Departure-to-arrival travel', 'Recipe cooking time', 'Ingredient receiving time'],
  'With food ready at 11:30, departure by 11:35 would meet the target. The avoidable delay shown is the 20-minute wait '
  'before dispatch, not travel.',
  'F2'),
 ('A batch normally yields 50 portions of 4 ounces. Staff serve 5-ounce portions instead. How many full portions will '
  'it yield?',
  '40 portions',
  ['45 portions', '55 portions', '62 portions'],
  'The batch contains 200 ounces. At 5 ounces each it yields 40 portions; larger portions reduce the number served.',
  'F1'),
 ('An egg mixture changes from fluid to firm during cooking. Which process primarily explains this change?',
  'Protein coagulation',
  ['Sugar caramelization', 'Fat rendering', 'Liquid reduction'],
  'Heat causes egg proteins to coagulate. The other processes describe sugar browning, melting fat or evaporating '
  'liquid.',
  'ICN-KEYSTONES'),
 ('A sauce simmers uncovered and becomes stronger in flavor as its volume decreases. Which technique is occurring?',
  'Reduction',
  ['Emulsification', 'Dredging', 'Blanching'],
  'Reduction removes water through evaporation and concentrates flavor. It differs from mixing liquids, coating food '
  'or briefly cooking it in water.',
  'ICN-KEYSTONES'),
 ('A culturally adapted menu receives high taste ratings but low use among residents who requested it. Comments '
  'identify the serving day as conflicting with their observance. Which change directly addresses that evidence?',
  'Revise the service-day schedule',
  ['Reformulate the seasoning blend', 'Increase the standard portion weight', 'Change the purchasing pack size'],
  'Foodservice Standard 1 considers cultural practices as well as taste. The reported conflict concerns when the meal '
  'is served rather than its flavor or portion.',
  'F1'),
 ('The plan calls for 100 portions. The finished batch measures 400 ounces, portions are verified at 4 ounces, and 110 '
  'diners request it. What explains the shortage?',
  'Demand exceeded the forecast',
  ['Batch yield fell below plan', 'Portions exceeded the standard', 'Production lost 40 ounces'],
  'The batch supplies exactly the planned 100 portions. The shortage follows from 110 requests, so the forecast rather '
  'than yield or portioning is at issue.',
  'F2'),
 ('A menu pairs a pale fish entree with mashed potato. Which approved side adds color contrast without duplicating the '
  'mashed texture?',
  'Tender broccoli florets',
  ['Smooth spinach puree', 'Tender cauliflower florets', 'Smooth turnip puree'],
  'Menu planning considers color and texture across the meal. Broccoli adds green and a distinct form. Spinach puree '
  'changes color but repeats the smooth texture; cauliflower changes form but remains pale; turnip puree repeats both. '
  'This is an introductory menu-balance application.',
  'F1'),
 ('A delivery trial keeps dispatch temperature at 160°F. Route A arrives at 150°F in 10 minutes; route B arrives at '
  '140°F in 20 minutes. Which result isolates the greater observed temperature loss?',
  'Route B loses 20°F',
  ['Route A loses 20°F', 'Route B loses 10°F', 'Route A loses 30°F'],
  'Subtract arrival from dispatch temperature. B loses 20°F and A loses 10°F; the results describe the observed routes '
  'rather than proving the cause of the difference.',
  'F2'),
 ('The initial tally lists 70 regular and 30 modified meals. Before preparation, 5 regular orders change to modified, '
  'with total census unchanged. What is the revised tally?',
  '65 regular; 35 modified',
  ['75 regular; 25 modified', '70 regular; 35 modified', '65 regular; 30 modified'],
  'Move five meals between categories without changing the total of 100. The revised tally is 65 regular and 35 '
  'modified.',
  'F2'),
 ('Residents compare two versions of a soup. Version A is served hot and B lukewarm, although the intended comparison '
  'is seasoning. Which variable prevents attributing the result to seasoning alone?',
  'Serving temperature',
  ['The coded sample labels', 'The number of recipe versions', 'The use of resident panelists'],
  'Foodservice Standard 1 calls for meaningful recipe evaluation. The temperature difference can affect preference '
  'independently of seasoning.',
  'F1'),
 ('Out of 80 diners surveyed, 60 rate an entree acceptable. What proportion reports acceptance?',
  '75%',
  ['20%', '60%', '80%'],
  'Sixty divided by 80 is 0.75, or 75%. Use the number surveyed as the denominator.',
  'F3'),
 ('A new mechanically refrigerated storage cabinet needs its built-in temperature sensor positioned under FDA Food '
  'Code 4-204.112. Where should it measure?',
  'The warmest part of the cabinet',
  ['The coldest part of the cabinet', 'The air entering the compressor', 'The kitchen air beside the door'],
  'The sensor measures air or simulated-product temperature at the warmest part of a refrigerated unit. A hot-storage '
  'unit instead uses its coolest part; neither compressor air nor kitchen air represents the required storage '
  'location.',
  'FC4-204.112'),
 ('A fixed floor-mounted appliance is elevated rather than sealed. Every part of the floor underneath is within 6 '
  'inches of cleaning access. What minimum clearance does the FDA Food Code permit in this specific case?',
  '4 inches',
  ['2 inches', '3 inches', '6 inches'],
  'Food Code 4-402.12(B) permits four-inch clearance when no underlying floor point is more than six inches from '
  'cleaning access. Six inches is the general floor-mounted rule; this scenario meets the narrower exception.',
  'FC4-402.12(B)'),
 ('A roast continues to warm briefly after removal from the oven. Which phenomenon explains this observation?',
  'Carryover cooking',
  ['Enzymatic browning', 'Fat rendering', 'Evaporative cooling'],
  'Retained heat continues cooking after removal from the heat source. This is carryover cooking; evaporative cooling '
  'instead lowers temperature, while browning and rendering describe different changes.',
  'ICN-KEYSTONES'),
 ('A recipe yields 48 portions per batch. Each batch needs one full cycle of oven time, and the oven holds two batches '
  'simultaneously. How many cycles are needed for 180 portions if whole batches are used?',
  '2 cycles',
  ['1 cycle', '3 cycles', '4 cycles'],
  'Four batches provide 192 portions. At two batches per cycle, two cycles are needed; four is the batch count, not '
  'the cycle count.',
  'F1/F2'),
 ('A vegetable trial yields 50 acceptable portions at 8 minutes, 48 at 10 minutes and 44 at 12 minutes. Resident '
  'acceptance is 60%, 85% and 86%, respectively; the service requires 48 portions from this batch. Which duration best '
  'balances acceptance and usable yield?',
  '10 minutes',
  ['8 minutes', '12 minutes', '9 minutes'],
  'Ten minutes meets the required yield while acceptance is substantially higher than at eight. Twelve minutes has '
  'similar acceptance but insufficient portions; the untested nine-minute duration has no demonstrated yield or '
  'acceptance.',
  'F1;F3'),
 ('A recipe specifies 20 apples by count. The former apples averaged 6 ounces and the new ones average 8 ounces. What '
  'explains the increased ingredient quantity?',
  'Count stayed fixed while unit weight rose',
  ['Count rose while unit weight stayed fixed',
   'Both count and unit weight fell',
   'Both count and unit weight stayed fixed'],
  'Twenty items at 8 ounces weigh more than twenty at 6 ounces. Foodservice Standard 1 requires consistent ingredient '
  'amounts, so count may need conversion to weight.',
  'F1'),
 ('A tray-check project reports 10 errors in 200 trays before and 9 in 300 trays afterward. Which comparison correctly '
  'describes the error rate?',
  'It fell from 5% to 3%',
  ['It fell from 10% to 9%', 'It rose from 3% to 5%', 'It remained at 4%'],
  'The rates are 10/200 = 5% and 9/300 = 3%. Comparing raw error counts would overlook the larger post-change sample.',
  'F3'),
 ('A kitchen needs 300 portions, and each full batch yields 80. If only full batches can be made, how many batches are '
  'required?',
  '4 batches',
  ['3 batches', '5 batches', '6 batches'],
  'Three batches yield 240 portions, which is insufficient. Four yield 320; the fractional result 3.75 must be rounded '
  'up under the stated constraint.',
  'F1'),
 ('A substitute meets the nutrient requirement but produces half the original recipe yield at the same ingredient '
  'quantity. What else must be adapted before using the old production plan?',
  'The batch quantity calculation',
  ['The resident diet prescription', 'The daily meal-service target time', 'The supplier payment schedule'],
  'Foodservice Standard 2 requires suitable substitutions and consistent production. A changed yield affects the '
  'quantity needed for the planned portions, not the clinical prescription.',
  'F2'),
 ('An entree needs 45 minutes cooking and 15 minutes portioning. Cart loading must begin at 11:30 a.m. What is the '
  'latest cooking start under this schedule?',
  '10:30 a.m.',
  ['10:45 a.m.', '11:00 a.m.', '11:15 a.m.'],
  'The two sequential tasks take 60 minutes, so cooking must start at 10:30. Foodservice Standard 2 coordinates '
  'finishing and dispatch times.',
  'F2'),
 ('A test tray is checked at dispatch and again after the usual route. Nutrients and portions are unchanged, but the '
  'covered entree becomes soggy. Which quality dimension did the route affect?',
  'Texture at service',
  ['Calculated nutrient content', 'Planned portion quantity', 'Ingredient purchase grade'],
  'Foodservice Standards 2 and 3 use test trays to examine conditions after assembly and delivery. The observed change '
  'is texture, not a recalculated nutrient or portion value.',
  'F2/F3'),
 ('A production record shows 120 portions prepared, 100 served and 20 safely retained as leftovers. The next '
  'comparable service expects 100 diners and no reserve. Which forecast is supported if acceptance and portions are '
  'unchanged?',
  '100 portions',
  ['80 portions', '120 portions', '140 portions'],
  'The prior service used 100 portions and the next has the same stated demand with no reserve. Retained leftovers '
  'show excess production rather than additional demand.',
  'F2')]
