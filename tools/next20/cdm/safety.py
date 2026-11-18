# Original CDM items; source tags refer to sources.md.
ITEMS=[('Under the FDA Food Code, what is the minimum temperature for ordinary cooked soup held hot for service?',
  '135°F',
  ['41°F', '130°F', '165°F'],
  'Ordinary hot holding requires at least 135°F. The other temperatures belong to cold holding, a specified roast '
  'exception, and reheating certain cooked foods for hot holding; they are not the ordinary soup threshold.',
  'FC3-501.16'),
 ('Cooked rice reaches 135°F at noon. Under the Food Code cooling rule, by when must it reach 70°F?',
  '2 p.m.',
  ['1 p.m.', '4 p.m.', '6 p.m.'],
  'The first cooling stage must reduce 135°F to 70°F within 2 hours. The total cooling allowance does not replace this '
  'first-stage requirement.',
  'FC3-501.14'),
 ('A Food Code cooking chart is being completed for poultry. Which minimum time-temperature combination belongs in '
  'that row?',
  '165°F, instantaneous',
  ['145°F for 15 seconds', '155°F for 17 seconds', '165°F for 15 seconds'],
  'Food Code 3-401.11 specifies 165°F instantaneous for poultry. The 165°F/15-second combination applies to ordinary '
  'in-house cooked and cooled TCS food reheated for hot holding.',
  'FC3-401.11'),
 ('A thick soup will be cooled in the refrigerator using shallow pans. The first trial met the two-hour stage but '
  'missed the total six-hour limit after staff stacked the pans tightly. Which change most directly targets the '
  'later-stage problem?',
  'Space the pans to expose their sides to cold air',
  ['Prechill empty pans before the initial fill',
   'Stir more frequently during the first cooling stage',
   'Schedule smaller cooking batches before service'],
  'Food Code 3-501.15 calls for arranging containers to maximize heat transfer. Spacing addresses the restricted '
  'airflow after stacking. Prechilling, earlier stirring and smaller batches can support cooling, but do not directly '
  'correct the identified refrigerator arrangement.',
  'FC3-501.15'),
 ('A refrigerated ready-to-eat TCS dish is prepared Monday and held at 41°F or below for more than 24 hours. With no '
  'other limiting date, what is its latest Food Code discard day?',
  'Sunday',
  ['Saturday', 'Monday of next week', 'Tuesday of next week'],
  'The maximum is 7 days with preparation counted as day 1. Monday through Sunday is seven days.',
  'FC3-501.17'),
 ('A cleaner leaks onto a food-storage shelf. What type of hazard is the residue?',
  'Chemical contamination',
  ['Biological contamination', 'Physical foreign material', 'Time-temperature abuse'],
  'CBDM Safety Standard 3 classifies cleaning agents as potential chemical hazards. The source is chemical rather than '
  'a pathogen or foreign object.',
  'S3'),
 ('An ordinary refrigerated TCS food has no special legal receiving exception. The calibrated probe reads 43°F. Which '
  'Food Code provision applies to deciding whether it meets the receiving requirement?',
  'The 41°F product-temperature limit',
  ['The 45°F shell-egg air limit', 'The 70°F running-water limit', 'The 135°F hot-holding minimum'],
  'Food Code 3-202.11 generally requires refrigerated TCS food at 41°F or below. The other values govern different '
  'foods or processes and do not authorize this delivery.',
  'FC3-202.11'),
 ('Which task transition specifically calls for handwashing under FDA Food Code 2-301.14 before the worker continues?',
  'From raw beef preparation to slicing ready-to-eat bread',
  ['From portioning plain rice to portioning plain pasta',
   'From arranging clean plates to arranging clean bowls',
   'From measuring flour to measuring sugar for the same dough'],
  'A raw-to-ready-to-eat transition requires handwashing to prevent cross-contamination. The other described '
  'transitions do not introduce the same raw-food contamination change; other contamination events could independently '
  'require washing.',
  'FC2-301.14'),
 ('A HACCP plan lists "chili reaches 165°F for 15 seconds" as the boundary that must be met during reheating. Which '
  'plan element is represented by that numerical requirement?',
  'The critical limit',
  ['The monitoring frequency', 'The corrective action', 'The verification schedule'],
  'CBDM Safety Standard 3 distinguishes the required safety boundary from how it is checked, how a failure is '
  'corrected and how the system is reviewed.',
  'S3'),
 ('A HACCP record shows a deficient temperature, the reheating action taken, and a satisfactory recheck. Which part of '
  'the record describes the response to the deviation?',
  'The additional heating step',
  ['The original temperature value', 'The planned observation interval', "The supervisor's weekly review"],
  'The additional heating is the corrective response. The initial value is monitoring evidence, while the weekly '
  'review is a verification activity.',
  'S3'),
 ("An allergen review must determine whether sesame was added during reformulation. Which part of the supplier's "
  'revised specification answers that question?',
  'The ingredient list',
  ['The nutrition-energy panel', 'The storage-temperature instruction', 'The package-yield statement'],
  'CBDM Safety Standard 3 requires ingredient information for allergen control. Calories, storage conditions and yield '
  'are useful product data but do not establish whether sesame is an ingredient.',
  'S3'),
 ('A metal fragment from damaged equipment is found in prepared food. Which hazard category applies?',
  'Physical hazard',
  ['Biological hazard', 'Chemical residue', 'Nutrient imbalance'],
  'Safety Standard 3 identifies foreign objects from equipment as physical hazards. Repair and inspection help prevent '
  'recurrence.',
  'S3'),
 ('A cook reheats in-house cooked and cooled chili for hot holding. Under the Food Code, which target applies?',
  '165°F for 15 seconds',
  ['135°F for 15 seconds', '145°F for 15 seconds', '155°F for 17 seconds'],
  'The Food Code requires previously cooked and cooled TCS food reheated for hot holding to reach 165°F for 15 '
  'seconds. Original cooking standards are not interchangeable.',
  'FC3-403.11'),
 ('Four cases were ordered frozen. Case W arrives solidly frozen; X is chilled with visible evidence of prior thawing; '
  'Y is solidly frozen with a legible replacement shipping label; Z is solidly frozen in intact packaging. Which fails '
  'the stated Food Code frozen-receiving condition?',
  'Case X',
  ['Case W', 'Case Y', 'Case Z'],
  'Food Code 3-202.11 requires food labeled and shipped frozen to arrive frozen and free of prior temperature abuse. '
  'The described failure is X, not a label replacement by itself.',
  'FC3-202.11'),
 ('A clean utensil contacts peanut sauce and is then used in a meal for someone avoiding peanuts. The concern is '
  'transfer of the ingredient rather than microbial growth. What is the relevant hazard?',
  'Allergen cross-contact',
  ['Pathogen cross-contamination', 'Physical fragment contamination', 'Cleaning-agent contamination'],
  'CBDM Safety Standard 3 distinguishes allergen transfer from microbial cross-contamination and other hazard types. A '
  'visibly clean utensil can still transfer allergenic food.',
  'S3'),
 ('Under the FDA Food Code, what minimum total duration applies to the complete hand-cleaning procedure?',
  '20 seconds',
  ['10–15 seconds', '30 seconds', '60 seconds'],
  'The complete cleaning procedure takes at least 20 seconds. The 10–15-second interval is the vigorous rubbing phase '
  'within that procedure, not the total.',
  'FC2-301.12'),
 ('A team has identified a pathogen hazard and now selects the process step where it must be controlled. Which HACCP '
  'activity is underway?',
  'Selecting a critical control point',
  ['Setting the monitoring interval', 'Choosing a corrective procedure', 'Auditing completed temperature records'],
  'Safety Standard 3 separates identifying a control point from defining monitoring, correction and verification. The '
  'stem describes selecting the location of control in the process.',
  'S3'),
 ('Under FDA Food Code 2-201.12, a food employee has a diagnosed Norovirus infection but no symptoms. Which workplace '
  'calls for exclusion rather than restriction?',
  'A nursing-home kitchen serving residents',
  ['A coffee shop serving the general public',
   'A workplace cafeteria serving adults',
   'A restaurant serving the general public'],
  'An asymptomatic employee diagnosed with Norovirus is excluded when serving a highly susceptible population, such as '
  'nursing-home residents, and restricted in other establishments. Diagnosis still matters when symptoms are absent.',
  'FC2-201.12(D)'),
 ('Ready-to-eat refrigerated TCS food made Tuesday is mixed with a ready-to-eat refrigerated TCS ingredient made '
  'Thursday. The mixture will be held over 24 hours at 41°F or below. Under Food Code date marking, which preparation '
  'day controls?',
  'Tuesday',
  ['Wednesday', 'Thursday', 'Friday'],
  'Food Code 3-501.17 requires the mixture to retain the date of its earliest-prepared ingredient. Mixing does not '
  'restart the clock.',
  'FC3-501.17'),
 ('The manager examines a week of completed HACCP logs and compares practice with the written plan. This is separate '
  'from cooks taking temperatures during production. Which activity is the manager performing?',
  'Plan verification',
  ['Routine temperature monitoring', 'Initial hazard identification', 'Immediate product correction'],
  'CBDM Safety Standard 3 includes review of logs and self-inspection in checking that the system works. The '
  'production readings themselves are monitoring.',
  'S3'),
 ('A cafeteria employee has acute sore throat with fever. The cafeteria does not serve a highly susceptible '
  'population. Which FDA Food Code action applies?',
  'Restrict the employee’s duties',
  ['Exclude solely on these symptoms', 'Allow all tasks with gloves', 'Allow all tasks after handwashing'],
  'Food Code 2-201.12(H) requires restriction for sore throat with fever outside a highly susceptible population; '
  'exclusion applies when serving that population. Gloves or washing do not remove the employee-health restriction.',
  'FC2-201.12(H)'),
 ('An equipment manual calls for servicing every 90 days. The last service was 60 days ago, with no malfunction '
  'reported. What scheduled interval remains under that maintenance plan?',
  '30 days',
  ['15 days', '60 days', '90 days'],
  'CBDM Safety Standard 2 requires following maintenance schedules. Under the supplied interval, 90 minus 60 leaves 30 '
  'days; an actual malfunction would need separate attention.',
  'S2'),
 ('Under the FDA Food Code, which is the minimum standard cooking treatment for ordinary raw fish, rather than stuffed '
  'fish or microwave cooking?',
  '145°F for 15 seconds',
  ['155°F for 17 seconds', '165°F, instantaneous', '135°F'],
  'Ordinary fish requires 145°F for 15 seconds. The other treatments correspond to other products or processes, such '
  'as nonintact meat, poultry and plant foods cooked for hot holding.',
  'FC3-401.11'),
 ('A kitchen transfers a cleaner from its bulk container into a reusable spray bottle. Under FDA Food Code 7-102.11, '
  'which identification must appear on that working container?',
  'The common name of the cleaner',
  ['The employee name of the mixer', 'The purchase date of the bulk supply', 'The storage shelf number of the product'],
  'The working container must identify its contents by the common name. Employee, purchasing and location information '
  'can support operations but do not identify the chemical as required by this section.',
  'FC7-102.11'),
 ('A cooked TCS food cools from 135°F to 70°F in 90 minutes. Under the Food Code, how much time remains to reach 41°F?',
  '4.5 hours',
  ['2 hours', '4 hours', '6 hours'],
  'The total allowance is 6 hours from 135°F. Subtracting 1.5 hours leaves 4.5 hours, provided the first-stage limit '
  'was met.',
  'FC3-501.14'),
 ('A recipe’s ingredient list includes sesame paste. Under the 2022 FDA Food Code, how must sesame be treated in the '
  'food-allergy program?',
  'As a major food allergen',
  ['As an allergen only when whole', 'As an allergen only when unheated', 'As a flavoring outside allergen controls'],
  'Sesame is the ninth major food allergen under the 2022 Food Code definition. Grinding it into a paste or heating it '
  'does not remove its classification.',
  'FC1-201.10'),
 ('Equivalent cases with the same safe use-by date were received May 4, May 7, May 10 and May 12. Which receipt is '
  'issued first under FIFO?',
  'May 4',
  ['May 7', 'May 10', 'May 12'],
  'First-in, first-out rotation selects the earliest receipt when suitability and safety dates are equal. Here that is '
  'May 4.',
  'S2'),
 ('A cold TCS dish is removed at 9 a.m. at 40°F under a written 4-hour time-control procedure. By what time must it be '
  'served or discarded?',
  '1 p.m.',
  ['11 a.m.', '3 p.m.', '5 p.m.'],
  'The Food Code 4-hour procedure runs from removal from temperature control.9 a.m. plus 4 hours is 1 p.m.',
  'FC3-501.19'),
 ('An inspection record notes a pouch seam that has split open, exposing the food. Which receiving criterion does this '
  'finding fail?',
  'Package integrity',
  ['Product quantity', 'Order specification grade', 'Invoice unit pricing'],
  'Food Code 3-202.15 requires packaging that protects the contents. The seam failure directly compromises that '
  'protection rather than establishing a count or price discrepancy.',
  'FC3-202.15'),
 ('Four ordinary TCS dishes are in cold holding, with no time-control procedure or special exception: A is 38°F, B '
  '40°F, C 41°F and D 44°F. Which is outside the Food Code limit?',
  'Dish D',
  ['Dish A', 'Dish B', 'Dish C'],
  'Food Code 3-501.16 permits ordinary cold holding at 41°F or below. D exceeds that limit; the others do not.',
  'FC3-501.16'),
 ('During a power-outage drill, staff spent 30 minutes locating someone authorized to activate the emergency menu; '
  'assembly then took 10 minutes. Which assignment needs clarification to address the main delay?',
  'Each shift’s activation decision-maker',
  ['Each shift’s ingredient-staging coordinator',
   'Each shift’s meal-assembly coordinator',
   'Each shift’s distribution coordinator'],
  'The delay occurs before production begins because activation authority is unclear. Staging, assembly and '
  'distribution are also necessary roles, but assigning them does not establish who authorizes the switch to the '
  'emergency menu.',
  'S3'),
 ('An allergen audit finds correct supplier information and correct menu labels, but shared serving utensils are moved '
  'between dishes during service. Which control needs improvement?',
  'Utensil separation during service',
  ['Supplier ingredient verification', 'Menu-label transcription', 'Receiving lot identification'],
  'CBDM Safety Standard 3 monitors allergen controls throughout food flow. The observed transfer occurs at service; '
  'the other described controls passed the audit.',
  'S3'),
 ('A refrigerated TCS salad is prepared from room-temperature ingredients. Under the Food Code, how soon must it reach '
  '41°F or below?',
  'Within 4 hours',
  ['Within 1 hour', 'Within 6 hours', 'Within 8 hours'],
  'Food made from ambient-temperature ingredients must cool to 41°F within 4 hours. The 6-hour two-stage rule applies '
  'to cooked food cooling from 135°F.',
  'FC3-501.14'),
 ('The purchase order lists 10 cases with 6 packs each. The delivery contains 9 cases with 6 packs each. What quantity '
  'discrepancy should be recorded?',
  '6 packs short',
  ['1 pack short', '9 packs short', '10 packs short'],
  'The order totals 60 packs and delivery totals 54, leaving a shortage of 6. Receiving must compare equivalent units '
  'rather than confuse cases and packs.',
  'S2'),
 ('A manager needs the recommended glove material for handling a concentrated cleaner. Which SDS section is the '
  'primary place to find that detail?',
  'Section 8: exposure controls/PPE',
  ['Section 4: first-aid measures', 'Section 6: accidental release measures', 'Section 9: physical properties'],
  'OSHA describes Section 8 as covering personal protection, including glove materials. First aid concerns exposure '
  'care, accidental release concerns spills, and physical properties describe the substance.',
  'OSHA-SDS'),
 ('Which Food Code thawing method specifically requires immediate transfer to conventional cooking equipment without '
  'interruption after thawing?',
  'Microwave thawing',
  ['Refrigerator thawing at 41°F', 'Running-water thawing under its limits', 'Thawing during the cooking process'],
  'Food Code 3-501.13 attaches the immediate-transfer requirement to microwave thawing. The other methods have their '
  'own conditions and do not involve that same transfer sequence.',
  'FC3-501.13'),
 ('A manager checks a chemical-sanitizing warewasher. Which tool establishes whether the sanitizer concentration meets '
  'the product requirements?',
  'A chemical test kit or test strips',
  ['A maximum-registering thermometer', 'A water-pressure gauge', 'A wash-cycle timer'],
  'Food Code 4-501.116 requires a test kit or other device to determine sanitizer concentration. The kit or strips '
  'must suit the chemical. The other instruments measure temperature, pressure and time.',
  'FC4-501.116'),
 ('After a slicer defect, the process includes isolating affected food, repairing the machine, recording the incident '
  'and checking the repaired unit. Which step is the verification that the equipment can perform as intended again?',
  'Checking the repaired unit',
  ['Isolating the affected food', 'Repairing the defective part', 'Recording the incident details'],
  'The post-repair check evaluates the result of the correction. Repair is the corrective work itself; food isolation '
  'and documentation serve different functions.',
  'S2/S3'),
 ('The Food Code running-water thawing method sets a maximum water temperature. Which value belongs to that method, '
  'rather than the refrigeration method?',
  '70°F',
  ['41°F', '45°F', '135°F'],
  'Food Code 3-501.13 permits running water at 70°F or below with its additional time and food-temperature conditions. '
  'The 41°F value governs refrigerated thawing, not the water maximum.',
  'FC3-501.13'),
 ('A manager identifies that raw ingredients may introduce harmful bacteria. What HACCP step is this?',
  'Hazard analysis',
  ['Selecting critical limits', 'Designing monitoring procedures', 'Planning verification activities'],
  'Hazard analysis identifies and evaluates food-safety hazards. Critical limits, monitoring and verification are '
  'distinct steps used to control and evaluate the identified hazards.',
  'S3'),
 ('Before assigning shelf locations for two cleaners, the manager needs to check whether they can react dangerously '
  'together. Which SDS section specifically lists incompatible materials and hazardous reactions?',
  'Section 10: stability and reactivity',
  ['Section 3: composition/ingredients', 'Section 5: fire-fighting measures', 'Section 11: toxicological information'],
  'Section 10 addresses incompatibilities and possible hazardous reactions. Ingredient identities, firefighting '
  'information and toxic effects serve different purposes, even though several sections may inform a complete storage '
  'plan.',
  'OSHA-SDS'),
 ('Under the Food Code, commercially processed packaged ready-to-eat TCS soup from an inspected plant is heated for '
  'hot holding. What minimum applies?',
  '135°F',
  ['125°F', '130°F', '145°F'],
  'The Food Code allows this commercially processed packaged product to be heated to 135°F for hot holding. The 165°F '
  'rule applies to in-house cooked and cooled food. The contrasting 165°F in-house reheating rule applies to reheating '
  'for hot holding.',
  'FC3-403.11'),
 ('A food worker was excluded for vomiting without a diagnosed infection. There is no medical documentation of a '
  'noninfectious cause. Under FDA Food Code 2-201.13(A)(1), how long must the worker be asymptomatic before '
  'reinstatement?',
  'At least 24 hours',
  ['At least 12 hours', 'At least 48 hours', 'At least 72 hours'],
  'For this undiagnosed symptom case, the Food Code permits reinstatement after at least 24 symptom-free hours. '
  'Diagnosed infections have different conditions; a general 24-hour answer must not be applied to every pathogen.',
  'FC2-201.13(A)(1)'),
 ('A renovation uses a water-supply inlet with a ¾-inch diameter above a sink. What minimum air gap meets FDA Food '
  'Code 5-202.13?',
  '1½ inches',
  ['¾ inch', '1 inch', '2¼ inches'],
  'The air gap must be at least twice the inlet diameter and at least one inch. Twice ¾ inch is 1½ inches, which is '
  'the controlling minimum here.',
  'FC5-202.13'),
 ('TCS food has been stirred, covered and microwave-reheated to 165°F throughout for hot holding. Under the Food Code, '
  'which final standing step completes this method?',
  'Stand covered for 2 minutes',
  ['Stand uncovered for 2 minutes', 'Stand covered for 1 minute', 'Stand uncovered for 1 minute'],
  'Food Code 3-403.11 requires a covered two-minute stand after microwave reheating. Covering only during heating does '
  'not complete the specified procedure.',
  'FC3-403.11'),
 ('Under FDA Food Code 4-602.11, which change between raw animal foods qualifies for the exception to cleaning the '
  'food-contact surface between different types?',
  'Raw intact beef followed by raw poultry',
  ['Raw poultry followed by raw intact beef',
   'Raw ground beef followed by raw intact beef',
   'Raw poultry followed by raw ground beef'],
  'The exception is for successive raw meat and poultry requiring progressively higher cooking temperatures. Raw '
  'intact beef to raw poultry meets that direction; the other sequences go to a lower required temperature. The '
  'exception does not extend to fish or ready-to-eat food.',
  'FC4-602.11(B)'),
 ('A water-use chart distinguishes drinking water from water reserved for nonfood industrial uses. Under the Food '
  'Code, which use requires drinking water as its source?',
  'Ice served in beverages',
  ['Water in a sealed nonfood cooling loop',
   'Water used for landscape irrigation',
   'Water used to flush wastewater equipment'],
  'Food Code 3-202.16 requires ice used as food to be made from drinking water. The question concerns the beverage ice '
  'provision, not permission for every other use in a specific facility.',
  'FC3-202.16'),
 ('A slicer continuously handles ready-to-eat TCS food at room temperature. No special cleaning-frequency exception '
  'applies. Under FDA Food Code 4-602.11, what is the longest interval between cleaning during use?',
  '4 hours',
  ['2 hours', '6 hours', '8 hours'],
  'The default interval for food-contact surfaces used with TCS food is at least every four hours. A two-hour interval '
  'is more frequent than required; the question asks for the longest permitted interval in the stated conditions.',
  'FC4-602.11')]
