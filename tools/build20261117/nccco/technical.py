ITEMS=[]
def Q(stem,key,d1,d2,d3,why):ITEMS.append((stem,[key,d1,d2,d3],why))
Q('Which crane has its rotating upperworks on a base that travels on endless tracks?',
 'A crawler crane','A locomotive crane','A rough-terrain crane','A truck crane',
 'OSHA 1910.180 defines a crawler crane by its crawler-tread travel base.')
Q('Which crane has its rotating upperworks on a base that travels on railway track?',
 'A locomotive crane','A crawler crane','A gantry crane','A truck crane',
 'A locomotive crane has a rail-travel base under OSHA 1910.180.')
Q('Which crane has its upperworks on an automotive chassis equipped with its own travel powerplant?',
 'A truck crane','A rough-terrain crane','A crawler crane','A carry-deck crane',
 'A truck crane is mounted on an automotive truck with a powerplant for travel.')
Q('A telescopic crane\'s operating station stays put rather than turning with the upperworks. Which crane type is this?',
 'A fixed-cab telescopic crane','A swing-cab telescopic crane','A lattice-boom crawler','A tower crane',
 'The current CCO handbook defines fixed-cab telescopic cranes by the non-rotating operator station; a swing-cab crane\'s cab turns with the upperworks.')
Q('Which mechanism uses a drum and reeving system to raise or lower the boom?',
 'The boom hoist','The load hoist','The boom telescope cylinder','The swing drive',
 'OSHA 1910.180 defines the boom hoist as the drum-and-reeving system for changing boom elevation. The load hoist raises the load, not the boom.')
Q('Which cylindrical component winds rope when raising or lowering a load or boom?',
 'The drum','The sheave','The equalizer','The swivel',
 'The drum is the cylindrical member around which the rope winds. A sheave guides rope but does not store it.')
Q('Which assembly supplements machine weight to provide stability for lifting working loads?',
 'The counterweight','The outrigger beams','The carrier frame','The jib',
 'Counterweight supplements the crane\'s own weight for lifting stability; its amount remains manufacturer-limited.')
Q('Which device engages or disengages transmission of power rather than principally retarding motion?',
 'A clutch','A brake','A pawl','A governor',
 'A clutch engages or disengages power; a brake retards or stops motion.')
Q('Which inspection does a competent person start before each work period begins and finish before or during it?',
 'The shift inspection','The monthly inspection','The annual inspection','The post-assembly inspection',
 'The each-shift visual inspection begins before the shift under 1926.1412(d).')
Q('Which inspection repeats the shift-inspection items on a longer cycle and needs a record kept at least three months?',
 'The monthly inspection','The shift inspection','The annual inspection','The idle-equipment inspection',
 'The monthly inspection and its documentation are required by 1926.1412(e).')
Q('Which inspection is performed by a qualified person at least every 12 months and includes additional component checks and functional testing?',
 'The annual inspection','The monthly inspection','The shift inspection','The periodic load test',
 'The annual/comprehensive inspection has this expanded scope under 1926.1412(f).')
Q('Once a crane has been erected on site, which inspection must a qualified person complete before use to confirm its configuration?',
 'The post-assembly inspection','The pre-assembly review','The monthly inspection','The annual inspection',
 'The post-assembly inspection by a qualified person verifies configuration under 1926.1412(c).')
Q('How long must the employer retain monthly crane inspection documentation under OSHA 1926.1412(e)?',
 'Three months','One month','Twelve months','Six months',
 'Monthly inspection records must be retained at least three months.')
Q('How long must annual/comprehensive crane inspection documentation be retained under OSHA 1926.1412(f)?',
 'Twelve months','Three months','Thirty-six months','Six months',
 'Annual/comprehensive records must be retained at least 12 months.')
Q('Without invoking the documented-parts-order exception, what is the ordinary repair deadline for a Category I operational aid under OSHA 1926.1416?',
 '7 calendar days','30 calendar days','3 calendar days','14 calendar days',
 'Category I aids ordinarily must be repaired within 7 calendar days; specified temporary measures and any stricter manufacturer measures still apply.')
Q('Without invoking the documented-parts-order exception, what is the ordinary repair deadline for a Category II operational aid under OSHA 1926.1416?',
 '30 calendar days','7 calendar days','60 calendar days','90 calendar days',
 'Category II aids ordinarily must be repaired within 30 calendar days; the rule has a specific documented-order exception.')
Q('A control lever sticks instead of returning normally. Which inspection area is directly implicated?',
 'Control mechanisms and valves','Electrical apparatus and wiring','Hydraulic hoses and fittings','Control-panel lighting',
 'Control mechanisms are checked for maladjustment, and valves for failing to return to neutral.')
Q('A flexible pressure line shows blistering near a fitting. Which inspection area requires attention?',
 'Hydraulic hose condition','Wire rope condition','Electrical wiring condition','Tire condition',
 'Hydraulic and pressurised hoses must be checked for leakage, deformation and signs of impending failure.')
Q('The load attachment has a cracked throat area and a damaged closing latch. Which inspection area is implicated?',
 'The hook and its latch','Shackle pins and their latches','Sheaves and drums','Wire rope end fittings',
 'Hooks and latches must be inspected for cracks, deformation, wear and other damage; the throat is part of the hook.')
Q('A large crack across the operator\'s windshield interferes with seeing the load path. Which inspection area is implicated?',
 'Cab window condition','Mirror alignment','Boom-angle indicator display','Operator seat adjustment',
 'Cab windows must be checked for defects that hamper the operator\'s view.')
Q('A wire rope has a sharp permanent bend after a loop was pulled tight. Which apparent deficiency best describes it?',
 'A kink','Birdcaging','Core protrusion','Abrasion',
 'A kink is structural distortion from a loop pulled tight and is a Category I apparent deficiency requiring competent-person assessment. Birdcaging is strands opening up, not a bend.')
Q('Inspection finds heavy rusting and material deterioration on rope strands. Which apparent deficiency is indicated?',
 'Significant corrosion','Heat damage','Crushing','Kinking',
 'Significant corrosion is a listed Category I deficiency.')
Q('A rope has been exposed to a hot process and shows evidence of thermal deterioration, with no power-line contact. Which deficiency category description fits?',
 'Heat damage, Category I','Heat damage, Category III','Electric arc, Category II','Power-line contact, Category III',
 'Heat damage is a Category I apparent deficiency under 1926.1413; prior contact with an energized power line is the separate Category III condition.')
Q('A rope itself appears sound, but its socket is visibly cracked. Which specific item requires assessment?',
 'A damaged end connection','Nothing, as the rope is sound','A core protrusion','Corroded strands',
 'Cracked or otherwise damaged end connections are listed apparent deficiencies; sound rope does not make a damaged termination acceptable.')
Q('For rotation-resistant rope, how many randomly distributed broken wires within six rope diameters meet OSHA\'s listed Category II count?',
 'Two broken wires','Three broken wires','Four broken wires','One broken wire',
 'Two randomly distributed breaks within 6 rope diameters meet this criterion under 1926.1413(a); four is the count over 30 diameters.')
Q('For ordinary running rope, how many broken wires in one strand within one rope lay meet OSHA\'s listed Category II count?',
 'Three broken wires','Two broken wires','Six broken wires','Five broken wires',
 'Three broken wires in one strand within one rope lay meet that criterion; six is the count for breaks spread over the whole lay.')
Q('For rotation-resistant rope, how many randomly distributed broken wires within 30 rope diameters meet OSHA\'s listed Category II count?',
 'Four broken wires','Two broken wires','Six broken wires','Eight broken wires',
 'Four randomly distributed breaks within 30 rope diameters meet that criterion; two is the count over 6 diameters.')
Q('For ordinary running rope, how many randomly distributed broken wires within one rope lay meet OSHA\'s listed Category II count?',
 'Six broken wires','Three broken wires','Four broken wires','Twelve broken wires',
 'Six randomly distributed breaks in one rope lay meet that criterion; the separate single-strand criterion is three.')
Q('A wire rope has contacted an energized power line. What disposition addresses this Category III condition?',
 'Replace it; repair is not allowed','Inspect it monthly from now on','Cut out the contacted length and splice','Halve its rated load',
 'Repair of rope that contacted an energized power line is prohibited; it must be replaced before operations involving that rope resume.')
Q('At an annual inspection, the qualified person finds a condition that is not yet a safety hazard but explicitly requires monitoring. What must the employer arrange?',
 'Checks at each monthly inspection','A recheck at the next annual inspection','Immediate removal from service','A written note only',
 'The condition must be checked in the monthly inspections under 1926.1412(f)(6); waiting a year is too long.')
Q('A manufacturer requires a safety-related inspection more often than OSHA\'s minimum interval. Which schedule controls?',
 'The more frequent manufacturer schedule','OSHA\'s minimum schedule','The manufacturer\'s annual schedule only','The owner\'s insurance schedule',
 'The more frequent manufacturer inspection procedure must be followed under 1926.1412(j).')
Q('A crane has remained idle for four months. What must occur before initial reuse?',
 'A qualified person\'s monthly-scope check','An ordinary shift inspection only','An annual inspection by the operator alone','No inspection if stored indoors',
 'Equipment idle 3 months or more must be inspected by a qualified person to the monthly-inspection scope before initial use under 1926.1412(g).')
Q('A synthetic web sling has cut fibres and broken stitching. What is the required disposition?',
 'Remove it from service','Derate it by one quarter','Turn it so the damage faces out','Tape the cut and continue',
 'Damaged or defective slings must be removed from service; cuts and broken stitching are listed removal conditions for web slings.')
Q('A rigger must determine whether a shackle is suitable for an intended load. Which source identifies the manufacturer\'s working-load limit?',
 'Its permanent rated-load marking','The shackle\'s pin diameter alone','The crane\'s load chart','The sling\'s identification tag',
 'The permanently affixed, legible marking states the rated capacity, which must not be exceeded. Pin size alone does not establish it.')
Q('A sound sling will bear against an abrasive load edge. Which preparation directly addresses damage at that contact point?',
 'Padding or softeners at the corner','A longer sling at the same angle','A tighter choke on the load','A visual check after the lift',
 'Protect the sling from sharp or abrasive contact with suitable padding and the manufacturer\'s instructions; a check afterward finds damage too late.')
Q('A sling assembly is no longer needed and lies across the crew\'s path. What storage action addresses the immediate hazard?',
 'Remove it from the work area','Coil it beside the path','Leave it for the next lift','Cover it with a tarp',
 'Unused rigging must be removed from the immediate work area so it does not create a hazard under 1926.251(a)(3).')
Q('Manufacturer capacity-related operating procedures are unavailable. Who must develop and sign replacement capacity procedures under OSHA 1926.1417(b)?',
 'A registered engineer (RPE)','A qualified person','A competent person','The crane\'s operator',
 'A registered professional engineer familiar with the equipment must develop and sign capacity-related procedures.')
Q('Manufacturer procedures for operating the controls are unavailable. What level of author is required to develop those control procedures?',
 'A qualified person','A registered engineer (RPE)','A competent person','The equipment dealer',
 'A qualified person develops operational-control procedures; capacity procedures carry the separate registered engineer requirement.')
Q('Who must begin the ordinary each-shift visual crane inspection under OSHA 1926.1412(d)?',
 'A competent person','A qualified person','A registered engineer','Any crew member',
 'A competent person begins and completes the shift inspection within the required timing.')
Q('Which authority establishes the safe working load shown on the identification for a commercially supplied sling?',
 'The sling manufacturer','The sling user\'s employer','The crane manufacturer','The site safety officer',
 'The sling manufacturer\'s prescribed rated capacity governs the identification and must not be exceeded.')
Q('An originally supplied cab handhold is loose and unsafe. Which obligation directly addresses it?',
 'Keep original access aids repaired','Remove it to avoid misuse','Add a warning sticker beside it','Report it at the next annual inspection',
 'Originally equipped steps, handholds, ladders and rails must be maintained in good condition under 1926.1423.')
Q('On covered equipment manufactured after November 8, 2011, what property is required for walking/stepping surfaces other than crawler treads?',
 'Slip-resistant features','Yellow paint markings','Rubber matting only','Fold-down guardrails',
 'Those surfaces must have slip-resistant features or properties under 1926.1423(c)(3).')
Q('A new inspector needs to understand deficiencies previously found during the retained-record period. Which information must be made available?',
 'Prior inspection records','The inspector\'s certification card','The original sales invoice','The site\'s weather log',
 'Inspection documents must remain available to persons conducting inspections during the retention period.')
Q('A rope must be removed from service, but the crane has a separate unaffected hoist. What identification prevents use of the defective-rope function?',
 'A tag-out on the affected hoist','A tag on the unaffected hoist','Spoken notice to the crew','A note in the monthly log',
 'Either the whole equipment or the affected hoist must be tagged out until the rope is repaired or replaced as permitted.')
Q('Which definition explains why a load block and shackles must be accounted for with the lifted object?',
 'Working load includes attaching gear','Rated load excludes the block','Net load equals the object weight','Gross capacity ignores rigging',
 'OSHA 1910.180 defines working load to include load-attaching equipment such as blocks, shackles and slings.')
Q('Which definition identifies the rope length used when counting breaks over one lay?',
 'One strand\'s full turn around it','Six times the rope diameter','The distance between two sheaves','The length of one drum wrap',
 'One rope lay is the length over which one strand makes a complete revolution around the rope.')
Q('Which definition correctly establishes the reference for the boom\'s inclination?',
 'Angle above horizontal','Angle from vertical','Angle to the jib','Angle to the carrier deck',
 'Boom angle is between the boom\'s longitudinal centreline and the horizontal.')
Q('Which definition identifies the vertical reference about which the crane\'s rotating structure turns?',
 'The axis of rotation','The rotating bed\'s front edge','The boom foot pin','The load\'s center of gravity',
 'The axis of rotation is the vertical axis around which the superstructure rotates.')
assert len(ITEMS)==48
