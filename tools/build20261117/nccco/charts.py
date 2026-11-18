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
Q('Which information shows the required reeving and what each reeving allows?',
 'The parts-of-line table','The work-area diagram','The working-range diagram','The rated-capacity chart alone',
 'Parts-of-line information specifies reeving and line limitations, which must be satisfied alongside chart capacity.')
Q('Two chart pages differ only in full or intermediate beam deployment. What selects the page?',
 'The outrigger extension in use','The type of mat used','The boom angle at the pick','The counterweight fitted',
 'The actual outrigger extension must match a manufacturer-permitted configuration and its chart. Mats affect ground pressure, not which page applies.')
Q('Two ratings differ only in ballast package. Which installed feature selects the rating?',
 'The counterweight actually fitted','The heavier package listed','The boom length','The outrigger extension',
 'The installed counterweight must match the chart; using a heavier-package chart would overstate capacity.')
Q('A chart rates over-side and over-rear lifts differently. What selects the rating?',
 'The lowest rating of any sector it passes','The higher of the two ratings','The carrier\'s direction of travel','The load\'s height above ground',
 'The rating for every sector the load passes through must hold throughout the lift, so the lowest of them governs; using the higher rating everywhere is the common mistake.')
Q('A chart family separates main-boom lifts from offset-jib lifts. What must match the chosen page?',
 'The actual boom and jib setup','The main boom angle only','The jib offset you prefer','The block on the main line',
 'The actual boom and jib arrangement must match the selected chart and its notes.')
Q('The boom deflects under load, moving the hook away from the rotation axis. Which chart input reflects this?',
 'The loaded radius','The unloaded radius','The hook height','The boom length',
 'Use the actual loaded operating radius rather than the shorter unloaded radius.')
Q('A telescopic boom extends while a new angle keeps the same radius. Which chart input may have changed?',
 'The boom length','The work sector','The counterweight','The boom\'s rated angle',
 'Boom length has changed and may select a different rating even at the same radius.')
Q('A chart note says to subtract suspended handling equipment. What is needed beyond the object\'s weight?',
 'The block, slings and other gear','The crane\'s own weight','The outrigger reactions','The counterweight\'s weight',
 'The block, slings and other suspended lifting gear consume the stated gross capacity.')
Q('A geometry is below the manufacturer\'s angle boundary though the weight seems fine. Which limit is violated?',
 'The minimum boom angle','The maximum boom angle','The line-pull limit','The tail-swing limit',
 'Minimum boom-angle limits are independent constraints; a capacity calculation does not override them. Below the boundary means the minimum, not the maximum.')
Q('An object weighs 1.5 US short tons. What is its weight in pounds?',
 '3,000 pounds','3,307 pounds','3,360 pounds','1,500 pounds',
 'One US short ton is 2,000 lb, so 1.5 x 2,000 = 3,000 lb; 3,307 lb would be 1.5 metric tonnes and 3,360 lb 1.5 long tons.')
Q('A chart lists 4 US short tons gross, with 4,000 lb of deductions. What net payload remains?',
 '4,000 pounds','8,000 pounds','6,000 pounds','12,000 pounds',
 '4 x 2,000 = 8,000 lb gross; 8,000 - 4,000 = 4,000 lb net.')
Q('What do three components of 2,000 lb each weigh together, before gear?',
 '6,000 pounds','2,000 pounds','5,000 pounds','8,000 pounds',
 '3 x 2,000 = 6,000 lb.')
Q('A chart permits 10,000 lb gross, less a 1,200 lb block and 800 lb rigging. What payload remains?',
 '8,000 pounds','8,800 pounds','9,200 pounds','12,000 pounds',
 '10,000 - 1,200 - 800 = 8,000 lb. Subtracting only one deduction gives 8,800 or 9,200 lb.')
Q('A chart lists 20 ft: 16,000 lb; 30 ft: 12,000 lb; 40 ft: 10,000 lb. What is the gross capacity at 40 ft?',
 '10,000 pounds','12,000 pounds','16,000 pounds','11,000 pounds',
 'The 40 ft entry is 10,000 lb; the shorter-radius values do not apply, and nothing needs averaging at an exact listed radius.')
Q('At 30 ft radius a chart lists 60 ft boom: 14,000 lb and 80 ft boom: 12,000 lb. What applies with an 80 ft boom?',
 '12,000 pounds','14,000 pounds','13,000 pounds','26,000 pounds',
 'Choose the intersection of the 80 ft boom and the 30 ft radius: 12,000 lb.')
Q('Gross capacity is 18,000 lb, less 2,500 lb for the block and 1,500 lb for other gear. What net limit follows?',
 '14,000 pounds','15,500 pounds','16,500 pounds','22,000 pounds',
 '18,000 - 2,500 - 1,500 = 14,000 lb; both deductions apply.')
Q('A 12,000 lb gross load must be at most 75% of capacity. What minimum capacity is needed?',
 '16,000 pounds','9,000 pounds','15,000 pounds','20,000 pounds',
 '12,000 / 0.75 = 16,000 lb. Multiplying by 0.75 (9,000) or by 1.25 (15,000) is the common slip. The 75% condition belongs to this exercise, not to every crane rating.')
Q('A chart lists 30 ft and 35 ft radii and says to use the next longer radius. Which row applies at 32 ft?',
 'The 35-foot row','The 30-foot row','An average of both rows','Whichever row has more capacity',
 'The supplied note selects the next longer radius, 35 ft; do not interpolate or pick the shorter, higher row contrary to the note.')
Q('Between boom lengths a chart says to use the lower capacity. The entries are 9,000 lb and 8,000 lb. Which applies?',
 '8,000 pounds','9,000 pounds','8,500 pounds','17,000 pounds',
 'The stated note requires the lower of the two capacities, 8,000 lb; averaging to 8,500 lb is not what the note allows.')
Q('The setup exactly matches a listed boom, counterweight, extension and sector. How should the chart be selected?',
 'Use the page for that exact setup','Use the nearest more generous page','Average the nearby pages','Use the page from the last job',
 'Use the matching listed configuration and its notes; a nearby or more generous setup is not a substitute.')
Q('An outrigger position has no permitted chart or procedure. What capacity applies?',
 'None; get an approved setup first','Use the next wider position\'s rating','Interpolate between two positions','Use the rating at a shorter radius',
 'Do not invent a rating for an unsupported configuration; obtain a manufacturer-permitted configuration or procedure before lifting.')
Q('A setup allows 8,000 lb by chart, 10,000 lb by reeving and 12,000 lb by rigging. Which limit governs?',
 'The 8,000 lb chart limit','The 10,000 lb reeving limit','The 12,000 lb rigging limit','An average of the three limits',
 'The 8,000 lb gross chart limit is the smallest stated capacity, so it governs.')
Q('Chart capacity is 18,000 lb, reeving 12,000 lb and rigging 16,000 lb. Which limit governs?',
 'The 12,000 lb reeving limit','The 18,000 lb chart limit','The 16,000 lb rigging limit','The 30,000 lb chart and reeving sum',
 'The 12,000 lb reeving limit governs even though the chart permits more.')
Q('Chart capacity is 20,000 lb, reeving 18,000 lb and rigging 10,000 lb. Which constraint is lowest?',
 'The 10,000 lb rigging limit','The 20,000 lb chart limit','The 18,000 lb reeving limit','The 48,000 lb combined total',
 'The 10,000 lb rigging limit is the weakest stated part of the load path.')
Q('A load meets every weight limit, but the hook reaches 70 ft where 76 ft is needed. What prevents the plan?',
 'The hook height falls 6 ft short','The rigging rating is too low','The gross load is over the chart','Nothing, as every weight limit is met',
 '76 - 70 = 6 ft: the geometry fails the hook-height requirement, and spare weight capacity cannot create additional hook height.')
Q('A net payload allowance is 7,500 lb and the object weighs 7,000 lb. How much allowance remains?',
 '500 pounds','1,000 pounds','14,500 pounds','7,000 pounds',
 '7,500 - 7,000 = 500 lb; this arithmetic margin does not waive any other limit.')
Q('A new attachment raises the chart deduction from 600 lb to 1,600 lb. How much extra deduction is needed?',
 '1,000 pounds','1,600 pounds','2,200 pounds','600 pounds',
 '1,600 - 600 = 1,000 lb of additional deduction.')
Q('A load record omitted six 250 lb inserts that stay fitted during the lift. How much weight must be added?',
 '1,500 pounds','250 pounds','1,250 pounds','1,750 pounds',
 '6 x 250 = 1,500 lb must be included because the inserts are part of the lifted load.')
Q('An object\'s weight rises from 8,000 lb to 10,000 lb with contents included. How much more must the plan allow?',
 '2,000 pounds','10,000 pounds','18,000 pounds','8,000 pounds',
 '10,000 - 8,000 = 2,000 lb; contents cannot be omitted from the lifted weight.')
Q('The hook\'s vertical line is 20 ft from the rotation axis, and the nearest carrier edge is 5 ft closer. What is the radius?',
 '20 feet','15 feet','25 feet','5 feet',
 'Radius is measured from the rotation axis to the load\'s vertical line, so it is 20 ft; the carrier-edge distance (15 ft) is not the radius.')
Q('The rotation axis is 5 ft behind a front edge, and the load is 20 ft beyond it, in line. What is the radius?',
 '25 feet','20 feet','15 feet','30 feet',
 'The distances lie on the same line and add: 5 + 20 = 25 ft.')
Q('A range diagram places the hook 30 ft horizontally from the rotation axis and 50 ft above ground. What radius is used?',
 '30 feet','50 feet','58 feet','40 feet',
 'Use the horizontal 30 ft radius, not the 50 ft hook height or the straight-line distance to the hook.')
Q('A load at 28 ft radius moves 7 ft straight outward along the radius line. What is the new radius?',
 '35 feet','28 feet','21 feet','42 feet',
 '28 + 7 = 35 ft; moving outward adds to the radius, and the new radius must be checked against the correct chart.')
Q('A chart has side and rear sectors, and a lift stays wholly over the side. Which rating applies?',
 'The over-side rating','The over-rear rating','The 360-degree rating','The over-front rating',
 'Use the over-side rating and its applicable configuration notes.')
Q('A load path lies wholly behind the carrier, in the chart\'s sector for that area. Which rating applies?',
 'The over-rear rating','The over-side rating','The 360-degree rating','The on-tires rating',
 'Use the matching over-rear rating rather than assuming another sector\'s capacity.')
Q('The manufacturer\'s chart permits the same rating through full rotation. Which rating covers the full swing?',
 'The 360-degree rating','The over-rear rating','The over-side rating only','The over-front rating',
 'The 360-degree rating applies only because the stated configuration and chart expressly allow it.')
Q('A manufacturer permits lifting on rubber in a specified setup. Which chart governs?',
 'The on-tires chart','The fully extended outrigger chart','The mid-extension outrigger chart','The crawler chart',
 'Use the on-tires chart and its restrictions, not an outrigger-supported capacity.')
Q('Which deducted item is the hook-and-sheave assembly hanging below the boom tip?',
 'The main load block','The boom-tip sheave head','The jib stowed on the boom','The hoist drum',
 'The main load block is suspended handling equipment and must be accounted for under the stated note. The sheave head is part of the boom itself.')
Q('A calculation includes the block and slings but omits a 1,000 lb beam between hook and object. What must be added?',
 'Its full 1,000 lb','Half its weight, shared with the hook','Nothing, as it counts as rigging','Only its lifting lugs',
 'The suspended spreader beam contributes its full weight to the gross lifted load.')
Q('A chart requires a deduction for a jib carried on the boom but not lifting. Which allowance applies?',
 'The stowed-jib deduction','The erected-jib deduction','No deduction, as it is not lifting','The block deduction only',
 'Apply the specified stowed-jib deduction; a stowed attachment can affect ratings without being suspended.')
Q('A tank\'s empty weight is used, but liquid remains inside during the lift. What is missing from the weight?',
 'The retained contents','The tank\'s empty weight','The tank\'s lifting lugs','The rigging below the hook',
 'Retained contents form part of the object\'s actual lifted weight; the empty weight is already counted.')
Q('At 3,000 lb per supporting part, ignoring efficiency, how many parts does a 12,000 lb load need?',
 '4 parts of line','3 parts of line','5 parts of line','6 parts of line',
 '12,000 / 3,000 = 4 parts, subject to the actual permitted reeving arrangement.')
Q('At 2,000 lb per supporting part, what minimum whole number of parts does a 9,000 lb load need?',
 '5 parts of line','4 parts of line','6 parts of line','9 parts of line',
 '9,000 / 2,000 = 4.5, so at least 5 whole supporting parts are required; rounding down to 4 leaves the line overloaded.')
Q('A table lists 4 parts: 10,000 lb, 6 parts: 15,000 lb, 8 parts: 20,000 lb. Which smallest arrangement supports 14,000 lb?',
 '6 parts of line','4 parts of line','8 parts of line','7 parts of line',
 'Four parts are insufficient; six parts provide 15,000 lb and are the smallest listed adequate arrangement. Seven parts is not a listed arrangement.')
Q('A plan specifies two equal groups of four supporting rope parts. How many supporting parts are there in total?',
 '8 parts of line','4 parts of line','2 parts of line','16 parts of line',
 '4 + 4 = 8 supporting parts; this count alone does not establish capacity without the applicable reeving data.')
Q('Two setups meet every other requirement, one permitting 12,000 lb gross and one 9,000 lb. The load is 10,500 lb. Which assessment is correct?',
 'Only the 12,000 lb setup works','Only the 9,000 lb setup works','Both setups work','Neither setup works',
 'Only the 12,000 lb setup covers 10,500 lb; the 9,000 lb setup falls short.')
Q('Two setups meeting all other limits allow 6,000 lb and 8,000 lb net. A 7,500 lb object must be lifted. Which assessment is correct?',
 'Only the 8,000 lb setup is enough','Only the 6,000 lb setup is enough','Both setups are enough','Neither setup is enough',
 'Only the 8,000 lb setup has enough net payload capacity for 7,500 lb.')
Q('An 8,000 lb gross load is planned. Two suitable configurations permit 9,000 lb and 10,000 lb. Which assessment follows?',
 'Both configurations are adequate','Only the 10,000 lb one is adequate','Only the 9,000 lb one is adequate','Neither configuration is adequate',
 'Both stated gross limits exceed the required 8,000 lb; all other requirements are assumed met in this comparison.')
Q('Two suitable configurations permit 5,000 lb and 6,500 lb gross. The load is 7,000 lb. Which assessment follows?',
 'Neither configuration can do it','Only the 6,500 lb one can do it','Both can do it if their ratings are averaged','Only the 5,000 lb one can do it',
 'Neither capacity reaches 7,000 lb; the lift must be replanned, and ratings are never averaged or added.')
assert len(ITEMS)==52
