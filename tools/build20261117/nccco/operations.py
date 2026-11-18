ITEMS=[]
def Q(stem,key,d1,d2,d3,why):ITEMS.append((stem,[key,d1,d2,d3],why))
Q('Which aid tells the operator the boom\'s inclination rather than the load\'s weight?',
 'Boom-angle indicator','Load-moment indicator','Boom-length indicator','Drum-rotation indicator',
 'A boom-angle indicator shows boom inclination. A load-moment indicator works from load and radius, and a length indicator shows extension, not angle.')
Q('Which aid prevents or warns of the hook being drawn into the boom tip?',
 'Anti-two-block device','Load-moment limiter','Boom-hoist limiting device','Drum-rotation indicator',
 'An anti-two-block device addresses contact between the lower block or ball and the boom tip or upper block. A boom-hoist limiter stops the boom being raised too far, a different hazard.')
Q('Which aid detects motion of a hoist drum the operator cannot see?',
 'Drum-rotation indicator','Drum brake lock','Hoist line-pull meter','Boom-angle indicator',
 'A drum-rotation indicator reports drum movement to the operator. A line-pull meter shows force, not whether the drum is turning.')
Q('Which aid indicates the weight being supported?',
 'Load-weighing device','Boom-angle indicator','Drum-rotation indicator','Boom-length indicator',
 'A load-weighing device indicates load weight, subject to its proper setup and limitations. The other aids report geometry or drum motion.')
Q('Which device shows whether the machine sits true on its supports?',
 'Crane-level indicator','Boom-angle indicator','Outrigger position sensor','Load-moment indicator',
 'OSHA 1926.1415 requires a crane-level indicator on covered equipment, with specified exceptions. An outrigger sensor reports extension, not whether the machine is level.')
Q('Which device gives an immediate audible warning to people around the crane?',
 'Horn within the operator\'s reach','Rotating beacon on the cab','Radio to the signal person','Anti-two-block alarm',
 'A horn must be built in or immediately available to the operator under 1926.1415. A beacon is visual, and a radio reaches only the signal person.')
Q('Which hydraulic-outrigger feature retains jack support against unintended hydraulic movement?',
 'Integral holding valve','Manual pin through the beam','Outrigger position sensor','Pressure gauge on each jack',
 'Hydraulic outrigger and stabilizer jacks require an integral holding device or check valve. A gauge only shows pressure; it does not hold it.')
Q('Which device keeps a foot-pedal brake in its holding position?',
 'Lock on the brake pedal','Pedal return spring','Pedal-brake warning light','Parking brake on the carrier',
 'Equipment with foot-pedal brakes must have locks under 1926.1415. A return spring does the opposite of holding the pedal down.')
Q('A blind lift relies on radio, and the link fails. What is required?',
 'Stop until communication is restored','Finish the lift using hand signals','Continue slowly with the horn','Let the operator judge the landing',
 'Operations requiring signals must be safely stopped until communication is reestablished and a proper signal is understood. In a blind lift, hand signals cannot be seen.')
Q('Standard hand signals cannot direct a special attachment. What must the operator, signal person and lift director do?',
 'Agree on them before the operation','Write them on the load itself','Use the standard set anyway','Let the signal person improvise',
 'Non-standard signals must be agreed before the operation under 1926.1419(c)(2). Improvised signals risk being misread.')
Q('A signal person faces the operator across the load. From whose viewpoint are left and right given?',
 'Operator\'s','Signal person\'s','Load\'s direction of travel','Lift director\'s',
 'All directions must use the operator\'s perspective, which avoids reversed instructions when the signal person faces the cab.')
Q('One signal person directs two cranes on one channel. What makes each command\'s recipient clear?',
 'Naming the crane before each command','Louder voice for the nearer crane','Giving both cranes the same instruction','Hand signals in place of radio',
 'The crane must be identified before the function and direction, or by an equally effective method, so neither operator acts on the other\'s instruction.')
Q('Before a radio-controlled lift, what confirms signal transmission is reliable at that site?',
 'On-site test of the devices','Radio supplier\'s certificate','Test done at the yard last week','Signal person\'s experience',
 'The transmitting devices must be tested on site before operations under 1926.1420(a); local interference cannot be checked anywhere else.')
Q('Which reception arrangement lets the operator hear transmitted instructions without holding a communication device?',
 'Hands-free receiver','Handheld radio on the console','Phone held to one ear','Speaker mounted outside the cab',
 'OSHA 1926.1420(c) requires hands-free reception by the operator. A speaker outside the cab may not be heard over engine noise.')
Q('Unrelated radio traffic is interfering with lift instructions. Which channel arrangement does OSHA generally require?',
 'Dedicated signal channel','Shared site channel','Any open channel nearby','Cell phone line',
 'Signal transmission generally uses a dedicated channel, with specified exceptions for coordinated operations. A shared channel is what lets the unrelated traffic in.')
Q('The operator and signal person speak different languages. What must be set for voice signals?',
 'Language all parties understand','Translator at the cab door','Hand signals only, with no voice','Signals spoken more loudly',
 'The operator, signal person and lift director must be able to communicate effectively in the language used.')
Q('Before two cranes support one load, who must develop the lift plan?',
 'Qualified person','Either crane operator','Site safety officer','Rigger on the ground',
 'A qualified person develops the multiple-crane lift plan under 1926.1432(a). An operator may help but is not named for it by role.')
Q('Who must review a multiple-crane lift plan with all involved workers before the lift?',
 'Lift director','Plan\'s author only','Crane owner','Each crane operator',
 'The lift director reviews the plan with the involved workers under 1926.1432(b).')
Q('For a power-line plan using Table A, who provides the requested line-voltage information?',
 'Utility owner or operator','Crane operator','Local building inspector','Site electrician',
 'The utility owner/operator provides voltage information under 1926.1408(c).')
Q('Who may give the emergency-stop signal when someone is in immediate danger?',
 'Anyone who sees the danger','Only the designated signal person','Only the lift director','Only the A/D director',
 'Anyone aware of a safety problem may give the stop or emergency-stop signal, and the operator must obey it.')
Q('The load moment indicator shows a load over 75% of maximum rated capacity at the longest radius. What must happen?',
 'Confirm it by source or calculation','Proceed, since the indicator has weighed it','Reduce speed and proceed','Add counterweight and proceed',
 'Under 1926.1417(o)(3)(ii) the operator must not proceed until the weight is verified under (o)(3)(i): an industry-recognised source, a recognised calculation method or other equally reliable means. The indicator reading alone does not clear the lift, and extra counterweight beyond the specification is never allowed.')
Q('Slack rope needs re-spooling. What must be verified as slack is removed before lifting?',
 'Correct seating on drum and sheaves','The rope is fully unwound','The hook is resting on the ground mat','The boom is at minimum angle',
 'Under 1926.1417(m) the rope must be properly seated on the drum and in the sheaves as slack is removed.')
Q('Immediately before starting the engine, what operational check does OSHA require?',
 'Controls set and personnel clear','Fuel level and oil checked','Load chart reviewed with the rigger first','Horn tested twice',
 'The operator verifies that controls are in their proper starting positions and that all personnel are clear.')
Q('A setup requires ballast, and extra is nearby. What determines the amount installed?',
 'Manufacturer\'s specified amount','All the spare that is available','The heaviest the carrier can hold','Operator\'s estimate of the load',
 'The manufacturer-specified counterweight or ballast must be installed, and the specified maximum must not be exceeded. Adding spare weight can overload the machine.')
Q('A required horn fails and no other compliant horn is available. What must happen before operation resumes?',
 'The horn must be repaired first','Use hand signals in its place','Run for up to 7 days meanwhile','Run for up to 30 days meanwhile',
 'A horn is a required safety device; 1926.1415 does not permit alternative measures. The 7 and 30 day periods apply to operational aids, not safety devices.')
Q('A listed operational aid fails, and OSHA names a stopgap for the repair period. What allows operation to continue?',
 'Using the alternative measure OSHA lists','No operation until the aid is fixed','Higher rated capacity','Doubling the number of signal persons',
 'For an operational aid, the temporary alternative named in 1926.1416 may be used during the allowed repair period. Stopping until repair is the rule for safety devices.')
Q('The cab\'s only load chart is electronic and its display fails. What must be restored?',
 'Access to the rated capacities','Power to the cab heater','Radio link to the ground','Paper inspection log',
 'Rated capacities must again be accessible to the operator, electronically or otherwise, before operations resume.')
Q('An operator finds repairs are needed. How must the employer\'s designated person and next operator be told?',
 'Prompt written notice','Spoken mention at shift end','Call after the job finishes','Note in next month\'s log',
 'Under 1926.1417(j) the operator must promptly inform those persons in writing.')
Q('A tag line is needed within a power-line encroachment-control plan. What type is required?',
 'Nonconductive tag line','Wire-rope tag line','Damp natural-fibre line','Steel-cored synthetic line',
 'Tag lines used under 1926.1408(b) must be nonconductive. A wet natural-fibre or metal-cored line can conduct.')
Q('An equipment package has no marked weight. What reliable information establishes its weight?',
 'Shipping or maker\'s weight record','Rigger\'s estimate by eye','Chart capacity at that radius','Its marked dimensions only',
 'A manufacturer record or other equally reliable weight information supports capacity verification. Chart capacity is the limit, not the load.')
Q('A crew proposes moving the crane with a suspended load. Which instructions must be checked for a prohibition?',
 'Manufacturer\'s procedures','Site traffic plan','Rigging manufacturer\'s catalogue','General OSHA travel table',
 'Travel with a load is prohibited if the manufacturer prohibits it; other supervised-travel requirements also apply.')
Q('A load swings outward as the upperworks rotate. Which variable must be limited?',
 'Swing speed','Hoist speed','Boom length','Travel speed',
 'Rotational speed must keep the load from swinging out beyond a radius at which it can be controlled.')
Q('As weather worsens, which conditions does OSHA 1926.1417(n) require assessing for stability and capacity?',
 'Wind, ice and snow','Heat, humidity and dust','Darkness and glare','Fog and light drizzle',
 'Wind, ice and snow can affect stability and rated capacity and require appropriate adjustment under 1926.1417(n).')
Q('A wheeled crane travels with a load. Which wheel condition must meet manufacturer specifications?',
 'Tire inflation pressure','Wheel nut paint marks','Tire tread pattern','Rim width',
 'The specified tire pressure must be maintained when traveling with a load.')
Q('The swing path brings the boom beside a building projection. What must hold throughout movement?',
 'No part of the equipment touches it','The boom stays within 2 feet of it','The swing alarm keeps sounding','The load stays below half capacity',
 'The boom and other parts of the equipment must not contact obstructions under 1926.1417(p).')
Q('A long suspended assembly can turn and strike workers. What makes a tag line necessary?',
 'Hazardous rotation of the load','Any lift over a set weight','Any load longer than the boom','Every lift on the site',
 'A tag or restraint line is required when necessary to prevent hazardous rotation of the load.')
Q('A valid emergency-stop signal is given during hoisting. What is the operator\'s response?',
 'Bring the motion to a safe stop','Finish the hoist, then stop','Find out who gave it, then stop','Lower the load quickly',
 'A stop or emergency-stop signal must be obeyed whoever gives it; the operator safely stops the operation.')
Q('With capacity, clearance and communication verified, the signal person gives the agreed hoist signal. What is appropriate?',
 'Hoist as signalled, under control','Wait for a second signal person','Stop and request a new lift plan','Stop and recheck the radio',
 'With all stated conditions met, the operator makes the authorised controlled movement; nothing in the scenario calls for a stop.')
Q('A load\'s destination moves farther from the crane than planned. What must happen before moving it?',
 'Check the new radius against the chart','Proceed slowly while watching the load','Raise the boom to keep the hook high','Add a tag line and continue',
 'A greater radius can lower the rated capacity, so the new radius and configuration must be checked against the chart before the move.')
Q('Before leaving a crane unattended at shift end, what must the operator do?',
 'Follow the manufacturer\'s securing procedure','Leave the engine idling','Hang the block at full height','Leave the key for the next crew',
 'Follow the manufacturer\'s shutdown and securing procedures; landing the load does not complete shutdown.')
Q('Four supporting parts are each allowed 2,000 lb, ignoring efficiency. What is the line-limited load?',
 '8,000 pounds','2,000 pounds','6,000 pounds','10,000 pounds',
 '4 x 2,000 = 8,000 lb. Actual reeving information and all crane limits still govern.')
Q('What line force is 90% of a 10,000 lb maximum line pull?',
 '9,000 pounds','7,500 pounds','10,000 pounds','1,000 pounds',
 '0.90 x 10,000 = 9,000 lb; the OSHA brake-test threshold refers to maximum line pull, not chart capacity.')
Q('An 8,500 lb component holds 1,500 lb of contents. What total weight is lifted before rigging?',
 '10,000 pounds','8,500 pounds','7,000 pounds','11,500 pounds',
 '8,500 + 1,500 = 10,000 lb; contents are part of the load. Gear deductions or additions still follow the chart notes.')
Q('What is 75% of a 16,000 lb maximum rated capacity at the longest radius?',
 '12,000 pounds','4,000 pounds','16,000 pounds','10,000 pounds',
 '0.75 x 16,000 = 12,000 lb; 4,000 lb is the remaining 25%. Exceeding 12,000 lb under the indicating-device method requires reliable weight verification.')
Q('A boom-angle/radius indicator fails. What temporary method determines the geometry?',
 'Measure the radius or angle directly','Estimate the radius and angle by eye','Use the last reading recorded','Read the boom-length marks',
 'Under 1926.1416(e)(1) the radius or boom angle is measured with a measuring device; an estimate by eye is not a measurement.')
Q('A telescopic boom-length indicator fails. Which temporary method establishes boom length?',
 'Marked or measured length of the boom','Use the boom length from the last lift','Estimate it from the boom angle','Count the hydraulic pump strokes',
 'Measured marks on the boom or direct measurement are among the permitted alternatives under 1926.1416(e)(3).')
Q('An outrigger-extension monitor fails. What must the operator verify before outrigger-dependent operations?',
 'Actual outrigger positions','Monitor\'s fuse rating','Outrigger hydraulic pressure','Tire pressure',
 'The actual outrigger or stabilizer position must be verified as correct under the manufacturer\'s procedures. Pressure does not show extension.')
Q('An out-of-view drum\'s rotation indicator fails. What temporary measure lets drum movement be seen?',
 'Drum mark visible by mirror or camera','Listening for drum noise','Counting turns of the hoist lever','Second operator watching the hook block',
 'Under 1926.1416(e)(5) the drum is marked and mirrors or video are provided if necessary so the operator can see the mark.')
Q('In repetitive lifts each over 90% of maximum line pull, when does the lift-and-brake test apply?',
 'On the first lift only','On every lift in the sequence','On every tenth lift','Only after the brake slips',
 'For duty-cycle or repetitive lifts at that threshold, the test applies to the first lift, not every successive lift.')
Q('When must the boom-hoist brake be tested if the crew will rely on it during assembly?',
 'Before any reliance is placed on it','After assembly is complete','At the next annual inspection','Only if it has slipped before',
 'Under 1926.1404(h)(10) the brake must be tested to determine that it holds before reliance is placed on it.')
Q('The operator stopped over a safety problem needing discussion with the signal person. When may work resume?',
 'When both agree it is resolved','When the lift director arrives','After a set ten-minute pause','When the operator alone decides',
 'Both the operator and signal person must agree that the problem has been resolved before operations resume under 1926.1419(g).')
Q('A crew wants new voice commands mid-job. When must the operator, signal person and lift director agree?',
 'Before the new commands are used','At the end of the job','At the next morning meeting','Only if a near miss occurs',
 'They must agree before using changed voice signals; the earlier agreement does not cover the change.')
Q('When is the operating radius taken for entering a load chart?',
 'With the load on the hook','Before the rigging is attached','After the load is landed','From the boom-length marks alone',
 'Operating radius is the horizontal distance from the axis of rotation to the hoist line with the load applied. Boom deflection moves the hook outward, so a radius taken unloaded understates it.')
Q('Which change can increase crane force as a submerged object emerges from water?',
 'Reduced buoyancy','Cooler hoist rope','Lower wind at the surface','Shorter hoist line',
 'Buoyant support decreases as the object leaves the water, so the crane carries more of its weight.')
Q('A moving load is stopped abruptly. Which effect can raise forces beyond the static load?',
 'Dynamic shock load','Lighter static load','Reduced line tension','Increased buoyancy',
 'Abrupt acceleration or stopping introduces dynamic force, commonly called shock loading.')
Q('Dragging a load sideways with the hoist line imposes which force on the boom?',
 'Side load on the boom','Extra vertical load only','Pure compression load','Less load than a straight lift',
 'Side pulling imposes lateral loading the boom is not rated for; OSHA 1926.1417(q) prohibits dragging or pulling loads sideways.')
assert len(ITEMS)==56
