ITEMS=[]
def Q(stem,key,d1,d2,d3,why):ITEMS.append((stem,[key,d1,d2,d3],why))
Q('Which crane has its rotating upperworks on a base that travels on endless tracks?',
 'Crawler crane','Locomotive crane','Rough-terrain crane','Truck crane',
 'OSHA 1910.180 defines a crawler crane by its crawler-tread travel base.')
Q('Which crane has its rotating upperworks on a base that travels on railway track?',
 'Locomotive crane','Crawler crane','Gantry crane','Truck crane',
 'A locomotive crane has a rail-travel base under OSHA 1910.180.')
Q('Which crane has its upperworks on an automotive chassis equipped with its own travel powerplant?',
 'Truck crane','Rough-terrain crane','Crawler crane','Carry-deck crane',
 'A truck crane is mounted on an automotive truck with a powerplant for travel.')
Q('A telescopic crane\'s operating station does not turn with the upperworks. Which type is this?',
 'Fixed-cab telescopic crane','Swing-cab telescopic crane','Lattice-boom crawler','Tower crane',
 'The current CCO handbook defines fixed-cab telescopic cranes by the non-rotating operator station; a swing-cab crane\'s cab turns with the upperworks.')
Q('Which mechanism uses a drum and reeving system to raise or lower the boom?',
 'Boom hoist','Load hoist','Boom telescope cylinder','Swing drive',
 'OSHA 1910.180 defines the boom hoist as the drum-and-reeving system for changing boom elevation. The load hoist raises the load, not the boom.')
Q('Which cylindrical component winds rope when raising or lowering a load or boom?',
 'Drum','Sheave','Equalizer','Swivel',
 'The drum is the cylindrical member around which the rope winds. A sheave guides rope but does not store it.')
Q('Which assembly supplements machine weight to provide stability for lifting working loads?',
 'Counterweight','Outrigger beams','Carrier frame','Jib',
 'Counterweight supplements the crane\'s own weight for lifting stability; its amount remains manufacturer-limited.')
Q('Which device engages or disengages transmission of power rather than principally retarding motion?',
 'Clutch','Brake','Pawl','Governor',
 'A clutch engages or disengages power; a brake retards or stops motion.')
Q('Which inspection does a competent person begin before each work period?',
 'Shift inspection','Monthly inspection','Annual inspection','Post-assembly inspection',
 'The each-shift visual inspection begins before the shift under 1926.1412(d).')
Q('Which inspection repeats shift items on a longer cycle, with records kept three months?',
 'Monthly inspection','Shift inspection','Annual inspection','Idle-equipment inspection',
 'The monthly inspection and its documentation are required by 1926.1412(e).')
Q('Which inspection does a qualified person perform at least every 12 months, with functional testing?',
 'Annual inspection','Monthly inspection','Shift inspection','Periodic load test',
 'The annual/comprehensive inspection has this expanded scope under 1926.1412(f).')
Q('After erection on site, which inspection must a qualified person complete before use?',
 'Post-assembly inspection','Pre-assembly review','Monthly inspection','Annual inspection',
 'The post-assembly inspection by a qualified person verifies configuration under 1926.1412(c).')
Q('How long must the employer retain monthly crane inspection documentation under OSHA 1926.1412(e)?',
 'Three months','One month','Twelve months','Six months',
 'Monthly inspection records must be retained at least three months.')
Q('How long must annual/comprehensive crane inspection documentation be retained under OSHA 1926.1412(f)?',
 'Twelve months','Three months','Thirty-six months','Six months',
 'Annual/comprehensive records must be retained at least 12 months.')
Q('Absent a documented parts order, what is OSHA\'s repair deadline for a Category I operational aid?',
 '7 calendar days','30 calendar days','3 calendar days','14 calendar days',
 'Category I aids ordinarily must be repaired within 7 calendar days; specified temporary measures and any stricter manufacturer measures still apply.')
Q('Absent a documented parts order, what is OSHA\'s repair deadline for a Category II operational aid?',
 '30 calendar days','7 calendar days','60 calendar days','90 calendar days',
 'Category II aids ordinarily must be repaired within 30 calendar days; the rule has a specific documented-order exception.')
Q('A control lever sticks instead of returning normally. Which inspection area is directly implicated?',
 'Control mechanisms and valves','Electrical apparatus and wiring','Hydraulic hoses and fittings','Control-panel lighting',
 'Control mechanisms are checked for maladjustment, and valves for failing to return to neutral.')
Q('A flexible pressure line shows blistering near a fitting. Which inspection area requires attention?',
 'Hydraulic hose condition','Wire rope condition','Electrical wiring condition','Tire condition',
 'Hydraulic and pressurised hoses must be checked for leakage, deformation and signs of impending failure.')
Q('The load attachment has a cracked throat and damaged latch. Which inspection area is implicated?',
 'Hook and its latch','Shackle pins and their latches','Sheaves and drums','Wire rope end fittings',
 'Hooks and latches must be inspected for cracks, deformation, wear and other damage; the throat is part of the hook.')
Q('A windshield crack blocks the operator\'s view. Which inspection area is implicated?',
 'Cab window condition','Mirror alignment','Boom-angle indicator display','Operator seat adjustment',
 'Cab windows must be checked for defects that hamper the operator\'s view.')
Q('A loop pulled tight left a sharp permanent bend in a wire rope. Which deficiency is this?',
 'Kink','Birdcaging','Core protrusion','Abrasion',
 'A kink is structural distortion from a loop pulled tight and is a Category I apparent deficiency requiring competent-person assessment. Birdcaging is strands opening up, not a bend.')
Q('Inspection finds heavy rusting and material deterioration on rope strands. Which apparent deficiency is indicated?',
 'Significant corrosion','Heat damage','Crushing','Kinking',
 'Significant corrosion is a listed Category I deficiency.')
Q('A rope shows thermal deterioration from a hot process, with no power-line contact. Which category fits?',
 'Heat damage, Category I','Heat damage, Category III','Electric arc, Category II','Power-line contact, Category III',
 'Heat damage is a Category I apparent deficiency under 1926.1413; prior contact with an energized power line is the separate Category III condition.')
Q('A rope looks sound, but its socket is cracked. Which item needs assessment?',
 'Damaged end connection','Nothing, as the rope is sound','Core protrusion','Corroded strands',
 'Cracked or otherwise damaged end connections are listed apparent deficiencies; sound rope does not make a damaged termination acceptable.')
Q('Under OSHA, how many random broken wires in six diameters make rotation-resistant rope Category II?',
 'Two broken wires','Three broken wires','Four broken wires','One broken wire',
 '1926.1413(a)(2)(ii)(A)(2) lists two randomly distributed broken wires in six rope diameters; four is the count over 30 diameters. ASME B30.5 words its removal criterion as more than two, so check which rule a question names.')
Q('For running rope, how many broken wires in one strand within one lay meet OSHA\'s Category II count?',
 'Three broken wires','Two broken wires','Six broken wires','Five broken wires',
 'Three broken wires in one strand within one rope lay meet that criterion; six is the count for breaks spread over the whole lay.')
Q('For rotation-resistant rope, how many random broken wires within 30 diameters meet OSHA\'s Category II count?',
 'Four broken wires','Two broken wires','Six broken wires','Eight broken wires',
 'Four randomly distributed breaks within 30 rope diameters meet that criterion; two is the count over 6 diameters.')
Q('For running rope, how many random broken wires within one lay meet OSHA\'s Category II count?',
 'Six broken wires','Three broken wires','Four broken wires','Twelve broken wires',
 'Six randomly distributed breaks in one rope lay meet that criterion; the separate single-strand criterion is three.')
Q('A wire rope has contacted an energized power line. What disposition addresses this Category III condition?',
 'Replace it; no severing or repair','Inspect it monthly from now on','Cut out the contacted length and splice','Halve its rated load',
 'Under 1926.1413(a)(4)(iii) the rope must be replaced before operations with it resume. Severing out a localized deficiency is allowed only for deficiencies other than power line contact, splicing is prohibited, and repair of rope that contacted an energized power line is prohibited.')
Q('An annual inspection finds a condition not yet a hazard but needing monitoring. What must the employer arrange?',
 'Checks at each monthly inspection','Recheck at the next annual inspection','Immediate removal from service','Written note only',
 'The condition must be checked in the monthly inspections under 1926.1412(f)(6); waiting a year is too long.')
Q('A manufacturer requires a safety-related inspection more often than OSHA\'s minimum interval. Which schedule controls?',
 'More frequent manufacturer schedule','OSHA\'s minimum schedule','Manufacturer\'s annual schedule only','Owner\'s insurance schedule',
 'The more frequent manufacturer inspection procedure must be followed under 1926.1412(j).')
Q('A crane has remained idle for four months. What must occur before initial reuse?',
 'Qualified person\'s monthly-scope check','Ordinary shift inspection only','Annual inspection by the operator alone','No inspection if stored indoors',
 'Equipment idle 3 months or more must be inspected by a qualified person to the monthly-inspection scope before initial use under 1926.1412(g).')
Q('A synthetic web sling has cut fibres and broken stitching. What is the required disposition?',
 'Remove it from service','Derate it by one quarter','Turn it so the damage faces out','Tape the cut and continue',
 'Damaged or defective slings must be removed from service; cuts and broken stitching are listed removal conditions for web slings.')
Q('Where is a shackle\'s manufacturer working-load limit found?',
 'Its permanent rated-load marking','Shackle\'s pin diameter alone','Crane\'s load chart','Sling\'s identification tag',
 'The permanently affixed, legible marking states the rated capacity, which must not be exceeded. Pin size alone does not establish it.')
Q('A sling will bear on an abrasive load edge. What protects it at that contact point?',
 'Padding or softeners at the corner','Longer sling at the same angle','Tighter choke on the load','Visual check after the lift',
 'Protect the sling from sharp or abrasive contact with suitable padding and the manufacturer\'s instructions; a check afterward finds damage too late.')
Q('An unneeded sling lies across the crew\'s path. What action addresses the hazard?',
 'Remove it from the work area','Coil it beside the path','Leave it for the next lift','Cover it with a tarp',
 'Unused rigging must be removed from the immediate work area so it does not create a hazard under 1926.251(a)(3).')
Q('Without manufacturer capacity procedures, who must develop and sign replacements under OSHA 1926.1417(b)?',
 'Registered engineer (RPE)','Qualified person','Competent person','Crane\'s operator',
 'A registered professional engineer familiar with the equipment must develop and sign capacity-related procedures.')
Q('Without manufacturer procedures for operating the controls, who must develop them?',
 'Qualified person','Registered engineer (RPE)','Competent person','Equipment dealer',
 'A qualified person develops operational-control procedures; capacity procedures carry the separate registered engineer requirement.')
Q('Who must begin the ordinary each-shift visual crane inspection under OSHA 1926.1412(d)?',
 'Competent person','Qualified person','Registered engineer','Any crew member',
 'A competent person begins and completes the shift inspection within the required timing.')
Q('Which authority establishes the safe working load shown on the identification for a commercially supplied sling?',
 'Sling manufacturer','Sling user\'s employer','Crane manufacturer','Site safety officer',
 'The sling manufacturer\'s prescribed rated capacity governs the identification and must not be exceeded.')
Q('An originally supplied cab handhold is loose and unsafe. Which obligation directly addresses it?',
 'Keep original access aids repaired','Remove it to avoid misuse','Add a warning sticker beside it','Report it at the next annual inspection',
 'Originally equipped steps, handholds, ladders and rails must be maintained in good condition under 1926.1423.')
Q('On equipment made after November 8, 2011, what must walking surfaces other than crawler treads have?',
 'Slip-resistant features','Yellow paint markings','Rubber matting only','Fold-down guardrails',
 'Those surfaces must have slip-resistant features or properties under 1926.1423(c)(3).')
Q('A new inspector needs deficiencies found earlier in the retention period. What must be made available?',
 'Prior inspection records','Inspector\'s certification card','Original sales invoice','Site\'s weather log',
 'Inspection documents must remain available to persons conducting inspections during the retention period.')
Q('A rope must be removed, but the crane has another unaffected hoist. What prevents use of the defective-rope function?',
 'Tag-out on the affected hoist','Tag on the unaffected hoist','Spoken notice to the crew','Note in the monthly log',
 'Either the whole equipment or the affected hoist must be tagged out until the rope is repaired or replaced as permitted.')
Q('Which definition explains why the load block and shackles count with the lifted object?',
 'Working load includes attaching gear','Rated load excludes the block','Net load equals the object weight','Gross capacity ignores rigging',
 'OSHA 1910.180 defines working load to include load-attaching equipment such as blocks, shackles and slings.')
Q('Which definition identifies the rope length used when counting breaks over one lay?',
 'One strand\'s full turn around it','Six times the rope diameter','Distance between two sheaves','Length of one drum wrap',
 'One rope lay is the length over which one strand makes a complete revolution around the rope.')
Q('Which definition correctly establishes the reference for the boom\'s inclination?',
 'Angle above horizontal','Angle from vertical','Angle to the jib','Angle to the carrier deck',
 'Boom angle is between the boom\'s longitudinal centreline and the horizontal.')
Q('Which definition identifies the vertical reference about which the crane\'s rotating structure turns?',
 'Axis of rotation','Rotating bed\'s front edge','Boom foot pin','Load\'s center of gravity',
 'The axis of rotation is the vertical axis around which the superstructure rotates.')
assert len(ITEMS)==48
