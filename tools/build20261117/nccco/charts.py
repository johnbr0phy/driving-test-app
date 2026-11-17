ITEMS=[]
def Q(stem,key,d1,d2,d3,why):ITEMS.append((stem,[key,d1,d2,d3],why))
Q('Which document gives permitted lifted weights for specified crane configurations and radii?',
 'The rated-capacity chart','The working-range diagram','The operator\'s manual index','The inspection log',
 'The rated-capacity chart provides capacities; its notes and the matching configuration must also be checked. A range diagram shows reach, not weight.')
Q('Which diagram primarily relates boom geometry to achievable hook height and horizontal reach?',
 'The working-range diagram','The rated-capacity chart','The work-area diagram','The parts-of-line table',
 'A working-range diagram addresses geometry; reach alone does not prove lifting capacity.')
Q('Which diagram shows the sectors in which a crane may lift under a particular rating?',
 'The work-area diagram','The working-range diagram','The rated-capacity chart','The load-moment curve',
 'The work-area diagram identifies sectors such as over-side or over-rear; ratings must match the actual sector.')
Q('Which information determines the required reeving arrangement and available line capacity for the intended load?',
 'The parts-of-line table','The work-area diagram','The working-range diagram','The rated-capacity chart alone',
 'Parts-of-line information specifies reeving and line limitations, which must be satisfied alongside chart capacity.')
Q('Two chart pages differ only between full and intermediate support-beam deployment. What setup feature selects the page?',
 'The outrigger extension in use','The type of mat used','The boom angle at the pick','The counterweight fitted',
 'The actual outrigger extension must match a manufacturer-permitted configuration and its chart. Mats affect ground pressure, not which page applies.')
Q('Two ratings cover the same boom, radius and support positions but list different ballast packages. Which installed feature selects the rating?',
 'The counterweight actually fitted','The heavier package listed','The boom length','The outrigger extension',
 'The installed counterweight must match the chart; using a heavier-package chart would overstate capacity.')
Q('A crane\'s chart gives different ratings over the side and over the rear. What aspect of the planned lift selects the applicable rating?',
 'The sector the load passes through','The higher of the two ratings','The carrier\'s direction of travel','The load\'s height above ground',
 'The load\'s operating sector must match the work-area chart throughout the lift; using the higher rating everywhere is the common mistake.')
Q('A chart family separates main-boom-only lifts from lifts using an offset jib. What must match the chosen page?',
 'The actual boom and jib setup','The main boom angle only','The jib offset you prefer','The block on the main line',
 'The actual boom and jib arrangement must match the selected chart and its notes.')
Q('The boom deflects under load and the hook moves farther from the rotation axis. Which chart input must reflect the resulting position?',
 'The loaded radius','The unloaded radius','The hook height','The boom length',
 'Use the actual loaded operating radius rather than the shorter unloaded radius.')
Q('A telescopic boom is extended farther while a different angle keeps the hook at the same radius. Which additional chart input may have changed?',
 'The boom length','The work sector','The counterweight','The boom\'s rated angle',
 'Boom length has changed and may select a different rating even at the same radius.')
Q('The chart note says to subtract all suspended handling equipment from gross capacity. Which additional quantity is needed beyond the object\'s own weight?',
 'The block, slings and other gear','The crane\'s own weight','The outrigger reactions','The counterweight\'s weight',
 'The block, slings and other suspended lifting gear consume the stated gross capacity.')
Q('A proposed geometry lies below the manufacturer\'s stated angle boundary even though a weight calculation appears acceptable. Which limit is violated?',
 'The minimum boom angle','The maximum boom angle','The line-pull limit','The tail-swing limit',
 'Minimum boom-angle limits are independent constraints; a capacity calculation does not override them. Below the boundary means the minimum, not the maximum.')
Q('A shipment record gives an object\'s mass as 1 US short ton. Using 2,000 lb per short ton, what weight enters this illustrative load calculation?',
 '2,000 pounds','2,205 pounds','2,240 pounds','1,000 pounds',
 'One US short ton equals 2,000 lb; 2,205 lb is a metric tonne and 2,240 lb a long ton.')
Q('An original training chart lists a gross capacity of 4 US short tons. The problem specifies 4,000 lb of deductions. What net payload remains?',
 '4,000 pounds','8,000 pounds','6,000 pounds','12,000 pounds',
 '4 x 2,000 = 8,000 lb gross; 8,000 - 4,000 = 4,000 lb net.')
Q('A load consists of three identical components, each weighing 2,000 lb according to reliable records. What is their combined object weight before separate gear is added?',
 '6,000 pounds','2,000 pounds','5,000 pounds','8,000 pounds',
 '3 x 2,000 = 6,000 lb.')
Q('An illustrative chart permits 10,000 lb gross, with 1,200 lb block weight and 800 lb rigging weight to subtract. What payload remains?',
 '8,000 pounds','8,800 pounds','9,200 pounds','12,000 pounds',
 '10,000 - 1,200 - 800 = 8,000 lb. Subtracting only one deduction gives 8,800 or 9,200 lb.')
Q('An original chart excerpt for the correct setup lists 20 ft radius: 16,000 lb; 30 ft: 12,000 lb; 40 ft: 10,000 lb. At exactly 40 ft, what is the gross chart capacity?',
 '10,000 pounds','12,000 pounds','16,000 pounds','11,000 pounds',
 'The 40 ft entry is 10,000 lb; the shorter-radius values do not apply, and nothing needs averaging at an exact listed radius.')
Q('A fictional chart\'s 30 ft row lists 60 ft boom: 14,000 lb and 80 ft boom: 12,000 lb. The crane uses an 80 ft boom at 30 ft radius. Which gross capacity applies?',
 '12,000 pounds','14,000 pounds','13,000 pounds','26,000 pounds',
 'Choose the intersection of the 80 ft boom and the 30 ft radius: 12,000 lb.')
Q('A training note gives 18,000 lb gross capacity and deductions of 2,500 lb for the block plus 1,500 lb for other gear. What net object limit follows?',
 '14,000 pounds','15,500 pounds','16,500 pounds','22,000 pounds',
 '18,000 - 2,500 - 1,500 = 14,000 lb; both deductions apply.')
Q('In an illustrative plan, the gross load is 12,000 lb and must remain at or below 75% of the selected capacity. What minimum capacity satisfies that stated planning condition?',
 '16,000 pounds','9,000 pounds','15,000 pounds','20,000 pounds',
 '12,000 / 0.75 = 16,000 lb. Multiplying by 0.75 (9,000) or by 1.25 (15,000) is the common slip. The 75% condition belongs to this exercise, not to every crane rating.')
Q('An original exercise chart lists 30 ft and 35 ft radii. Its note explicitly says use the next longer listed radius between rows. The actual loaded radius is 32 ft. Which row applies?',
 'The 35-foot row','The 30-foot row','An average of both rows','Whichever row has more capacity',
 'The supplied note selects the next longer radius, 35 ft; do not interpolate or pick the shorter, higher row contrary to the note.')
Q('A fictional chart note says that between listed boom lengths, use the lower capacity of the two bounding lengths. The two entries are 9,000 lb and 8,000 lb. Which capacity applies?',
 '8,000 pounds','9,000 pounds','8,500 pounds','17,000 pounds',
 'The stated note requires the lower of the two capacities, 8,000 lb; averaging to 8,500 lb is not what the note allows.')
Q('The actual setup exactly matches a listed boom, counterweight, support extension and work sector, with no intervening values. How should the applicable chart be selected?',
 'Use the page for that exact setup','Use the nearest more generous page','Average the nearby pages','Use the page from the last job',
 'Use the matching listed configuration and its notes; a nearby or more generous setup is not a substitute.')
Q('A proposed outrigger position has no permitted chart or procedure for that machine. Which response applies to its capacity?',
 'None; get an approved setup first','Use the next wider position\'s rating','Interpolate between two positions','Use the rating at a shorter radius',
 'Do not invent a rating for an unsupported configuration; obtain a manufacturer-permitted configuration or procedure before lifting.')
Q('A fictional setup allows 8,000 lb gross by its chart, 10,000 lb by reeving and 12,000 lb by rated rigging. Reach is adequate. Which listed constraint governs?',
 'The 8,000 lb chart limit','The 10,000 lb reeving limit','The 12,000 lb rigging limit','An average of the three limits',
 'The 8,000 lb gross chart limit is the smallest stated capacity, so it governs.')
Q('For an illustrative lift, chart capacity is 18,000 lb, reeving capacity 12,000 lb and rigging capacity 16,000 lb. Geometry is adequate. Which constraint governs?',
 'The 12,000 lb reeving limit','The 18,000 lb chart limit','The 16,000 lb rigging limit','The 30,000 lb chart and reeving sum',
 'The 12,000 lb reeving limit governs even though the chart permits more.')
Q('A training plan has 20,000 lb chart capacity, 18,000 lb reeving capacity and 10,000 lb rigging capacity. Which constraint is lowest?',
 'The 10,000 lb rigging limit','The 20,000 lb chart limit','The 18,000 lb reeving limit','The 48,000 lb combined total',
 'The 10,000 lb rigging limit is the weakest stated part of the load path.')
Q('An illustrative load is within every weight limit, but the range diagram allows 70 ft hook height where the placement needs 76 ft. What prevents this plan?',
 'The reach falls 6 ft short','The rigging rating is too low','The gross load is over the chart','Nothing, as every weight limit is met',
 'The geometry fails the reach requirement; sufficient weight capacity cannot create additional hook height.')
Q('An illustrative net payload allowance is 7,500 lb and the proposed object weighs 7,000 lb. How much payload allowance remains?',
 '500 pounds','1,000 pounds','14,500 pounds','7,000 pounds',
 '7,500 - 7,000 = 500 lb; this arithmetic margin does not waive any other limit.')
Q('A chart note changes the attachment deduction from 600 lb to 1,600 lb when a different attachment is fitted. How much additional deduction is required?',
 '1,000 pounds','1,600 pounds','2,200 pounds','600 pounds',
 '1,600 - 600 = 1,000 lb of additional deduction.')
Q('A load record initially omitted six 250 lb removable inserts that will remain fitted during lifting. How much weight must be added?',
 '1,500 pounds','250 pounds','1,250 pounds','1,750 pounds',
 '6 x 250 = 1,500 lb must be included because the inserts are part of the lifted load.')
Q('A verified object weight rises from 8,000 lb to 10,000 lb after its contents are included. What additional object weight must the plan accommodate?',
 '2,000 pounds','10,000 pounds','18,000 pounds','8,000 pounds',
 '10,000 - 8,000 = 2,000 lb; contents cannot be omitted from the lifted weight.')
Q('For an original geometry exercise, the hook\'s vertical line is 20 ft horizontally from the axis of rotation. The nearest carrier edge is 5 ft closer. What is the operating radius?',
 '20 feet','15 feet','25 feet','5 feet',
 'Radius is measured from the rotation axis to the load\'s vertical line, so it is 20 ft; the carrier-edge distance (15 ft) is not the radius.')
Q('A schematic places the rotation axis, front-edge reference and load on one horizontal line. The axis is 5 ft behind that edge, and the load is 20 ft beyond it. What horizontal radius follows?',
 '25 feet','20 feet','15 feet','30 feet',
 'The distances lie on the same line and add: 5 + 20 = 25 ft.')
Q('An illustrative range diagram states that a selected boom/angle combination places the hook 30 ft horizontally from the rotation axis and 50 ft above ground. What radius is used?',
 '30 feet','50 feet','58 feet','40 feet',
 'Use the horizontal 30 ft radius, not the 50 ft hook height or the straight-line distance to the hook.')
Q('An original planning sketch gives a 28 ft radius before a 7 ft outward relocation of the load. What is the new horizontal radius?',
 '35 feet','28 feet','21 feet','42 feet',
 '28 + 7 = 35 ft; moving outward adds to the radius, and the new radius must be checked against the correct chart.')
Q('The selected chart distinguishes side and rear sectors. A lift remains wholly in a sector labelled over-side. Which sector rating applies?',
 'The over-side rating','The over-rear rating','The 360-degree rating','The over-front rating',
 'Use the over-side rating and its applicable configuration notes.')
Q('A load path lies wholly behind the carrier, inside the sector the chart defines for that area, with the crane configured accordingly. Which sector rating applies?',
 'The over-rear rating','The over-side rating','The 360-degree rating','The on-tires rating',
 'Use the matching over-rear rating rather than assuming another sector\'s capacity.')
Q('The exact crane configuration has a manufacturer chart expressly permitting the same rating throughout a full rotation. Which rating covers the full planned swing?',
 'The 360-degree rating','The over-rear rating','The over-side rating only','The over-front rating',
 'The 360-degree rating applies only because the stated configuration and chart expressly allow it.')
Q('A manufacturer expressly permits lifting on rubber in a specified setup. Which support-condition chart must govern that lift?',
 'The on-tires chart','The fully extended outrigger chart','The mid-extension outrigger chart','The crawler chart',
 'Use the on-tires chart and its restrictions, not an outrigger-supported capacity.')
Q('An illustrative chart note deducts suspended handling equipment. Which listed item is the hook-and-sheave assembly hanging below the boom tip?',
 'The main load block','The boom-tip sheave head','The jib stowed on the boom','The hoist drum',
 'The main load block is suspended handling equipment and must be accounted for under the stated note. The sheave head is part of the boom itself.')
Q('A fictional load calculation includes the block and slings but omits a 1,000 lb beam hanging between hook and object. Which missing item must be added?',
 'The spreader beam','The stowed jib','The hook latch','The beam\'s lifting lugs only',
 'The suspended spreader beam contributes its full weight to the gross lifted load.')
Q('A chart note requires a deduction for a jib carried on the boom even when it is not lifting. Which allowance applies?',
 'The stowed-jib deduction','The erected-jib deduction','No deduction, as it is not lifting','The block deduction only',
 'Apply the specified stowed-jib deduction; a stowed attachment can affect ratings without being suspended.')
Q('A tank\'s listed empty weight is used, but residual liquid remains inside it during the lift. Which part of the object weight is missing?',
 'The retained contents','The tank\'s empty weight','The tank\'s lifting lugs','The rigging below the hook',
 'Retained contents form part of the object\'s actual lifted weight; the empty weight is already counted.')
Q('An illustrative reeving table permits 3,000 lb per supporting part and the gross load is 12,000 lb. Ignoring efficiency losses as specified, what minimum number of parts is needed?',
 '4 parts of line','3 parts of line','5 parts of line','6 parts of line',
 '12,000 / 3,000 = 4 parts, subject to the actual permitted reeving arrangement.')
Q('A fictional reeving limit is 2,000 lb per supporting part. For a 9,000 lb gross load, what minimum whole number of parts is needed?',
 '5 parts of line','4 parts of line','6 parts of line','9 parts of line',
 '9,000 / 2,000 = 4.5, so at least 5 whole supporting parts are required; rounding down to 4 leaves the line overloaded.')
Q('A training table explicitly lists 4 parts: 10,000 lb, 6 parts: 15,000 lb, 8 parts: 20,000 lb. Which listed arrangement is the smallest that supports 14,000 lb?',
 '6 parts of line','4 parts of line','8 parts of line','7 parts of line',
 'Four parts are insufficient; six parts provide 15,000 lb and are the smallest listed adequate arrangement. Seven parts is not a listed arrangement.')
Q('An illustrative reeving plan specifies two equal groups of four load-supporting rope parts. How many supporting parts are present in total?',
 '8 parts of line','4 parts of line','2 parts of line','16 parts of line',
 '4 + 4 = 8 supporting parts; this count alone does not establish capacity without the applicable reeving data.')
Q('Two fictional setups both meet reach and all other requirements. One permits 12,000 lb gross and the other 9,000 lb gross. The required gross load is 10,500 lb. Which assessment is correct?',
 'Only the 12,000 lb setup works','Only the 9,000 lb setup works','Both setups work','Neither setup works',
 'Only the 12,000 lb setup covers 10,500 lb; the 9,000 lb setup falls short.')
Q('An original comparison gives one setup a net payload limit of 6,000 lb and another 8,000 lb. Reach and all other limits are satisfied. A 7,500 lb object must be lifted. Which assessment is correct?',
 'Only the 8,000 lb setup is enough','Only the 6,000 lb setup is enough','Both setups are enough','Neither setup is enough',
 'Only the 8,000 lb setup has enough net payload capacity for 7,500 lb.')
Q('A training plan requires an 8,000 lb gross load. Two otherwise suitable configurations permit 9,000 lb and 10,000 lb respectively. Which assessment follows?',
 'Both configurations are adequate','Only the 10,000 lb one is adequate','Only the 9,000 lb one is adequate','Neither configuration is adequate',
 'Both stated gross limits exceed the required 8,000 lb; all other requirements are assumed met in this comparison.')
Q('Two otherwise suitable illustrative configurations permit 5,000 lb and 6,500 lb gross. The proposed gross load is 7,000 lb. Which assessment follows?',
 'Neither configuration can do it','Only the 6,500 lb one can do it','Both can do it if their ratings are averaged','Only the 5,000 lb one can do it',
 'Neither capacity reaches 7,000 lb; the lift must be replanned, and ratings are never averaged or added.')
assert len(ITEMS)==52
