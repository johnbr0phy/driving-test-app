ITEMS=[]
def family(options,rows):
 for k,(stem,why) in enumerate(rows):ITEMS.append((stem,[options[k]]+options[:k]+options[k+1:],why))
family(['A crawler-mounted crane','A locomotive-mounted crane','A truck-mounted crane','A fixed-cab telescopic crane'],[
('Which crane description identifies a rotating upperworks mounted on a base with crawler treads?','OSHA1910.180 defines a crawler crane by its crawler-tread travel base.'),
('Which crane description identifies a rotating upperworks mounted on a base that travels on railway track?','A locomotive crane has a rail-travel base under OSHA1910.180.'),
('Which crane description identifies upperworks mounted on an automotive truck with its own travel powerplant?','A truck crane is mounted on an automotive truck with a travel powerplant.'),
('A telescopic crane’s operating station remains stationary rather than rotating with the upperworks. Which description fits?','The current CCO handbook defines fixed-cab telescopic cranes by the non-rotating operator station.')])
family(['The boom-hoist mechanism','The hoist rope drum','The counterweight assembly','The power-engaging clutch'],[
('Which mechanism uses a drum and reeving system to raise or lower the boom?','OSHA1910.180 defines the boom hoist as the drum-and-reeving system for changing boom elevation.'),
('Which cylindrical component winds rope when raising or lowering a load or boom?','The drum is the cylindrical member around which the rope winds.'),
('Which assembly supplements machine weight to provide stability for lifting working loads?','Counterweight supplements the crane’s own weight for lifting stability; its amount remains manufacturer-limited.'),
('Which device engages or disengages transmission of power rather than principally retarding motion?','A clutch engages or disengages power; a brake retards or stops motion.')])
family(['An each-shift inspection','A monthly inspection','An annual comprehensive inspection','A post-assembly inspection'],[
('Which inspection must a competent person begin before each shift and complete before or during that shift?','The each-shift visual inspection begins before the shift under1926.1412(d).'),
('Which inspection repeats the shift-inspection scope each month in service and creates a record kept at least three months?','The monthly inspection and its documentation are required by1926.1412(e).'),
('Which inspection is performed by a qualified person at least every12months and includes additional component checks and functional testing?','The annual/comprehensive inspection has this expanded scope under1926.1412(f).'),
('Which inspection confirms that the crane has been configured according to applicable criteria immediately after assembly?','The post-assembly inspection by a qualified person verifies configuration under1926.1412(c).')])
family(['Three months minimum','Twelve months minimum','Seven calendar days','Thirty calendar days'],[
('How long must the employer retain monthly crane inspection documentation under OSHA1926.1412(e)?','Monthly inspection records must be retained at least three months.'),
('How long must annual/comprehensive crane inspection documentation be retained under OSHA1926.1412(f)?','Annual/comprehensive records must be retained at least12months.'),
('Without invoking the documented-parts-order exception, what is the ordinary repair deadline for a Category I operational aid under OSHA1926.1416?','Category I aids ordinarily must be repaired within7calendar days; specified temporary measures and any stricter manufacturer measures still apply.'),
('Without invoking the documented-parts-order exception, what is the ordinary repair deadline for a Category II operational aid under OSHA1926.1416?','Category II aids ordinarily must be repaired within30calendar days; the rule has a specific documented-order exception.')])
family(['Control return and adjustment','Hydraulic hose integrity','Hook and latch condition','Cab-window visibility'],[
('A control lever sticks instead of returning normally. Which inspection area is directly implicated?','Control mechanisms are checked for maladjustment and valves for improper return to neutral.'),
('A flexible pressure line shows blistering near a fitting. Which inspection area requires attention?','Hydraulic/pressurised hoses must be checked for leakage, deformation and signs of impending failure.'),
('The load attachment has a cracked throat area and a damaged closing latch. Which inspection area is implicated?','Hooks and latches must be inspected for cracks, deformation, wear and other damage.'),
('A large crack across the operator’s windshield interferes with seeing the load path. Which inspection area is implicated?','Cab windows must be checked for defects that hamper the operator’s view.')])
family(['Kinking of the rope structure','Corrosion of rope or fittings','Heat damage to the rope','A damaged rope end connection'],[
('A wire rope has a sharp permanent bend after a loop was pulled tight. Which apparent deficiency best describes it?','A kink is structural distortion and is a Category I apparent deficiency requiring competent-person hazard assessment.'),
('Inspection finds significant rusting and material deterioration on rope strands. Which apparent deficiency is indicated?','Significant corrosion is a listed Category I deficiency.'),
('A rope has been exposed to a hot process and shows evidence of thermal deterioration, with no power-line contact. Which deficiency category description fits?','Heat damage is a Category I apparent deficiency; power-line contact is treated separately as Category III.'),
('A rope itself appears sound, but its socket is visibly cracked. Which specific item requires assessment?','Cracked or otherwise damaged end connections are listed apparent deficiencies; sound rope does not make a damaged termination acceptable.')])
family(['Two broken wires','Three broken wires','Four broken wires','Six broken wires'],[
('For rotation-resistant rope, how many randomly distributed broken wires within six rope diameters meet OSHA’s listed Category II count?','Two randomly distributed breaks within6rope diameters meet this criterion under1926.1413(a)(2).'),
('For ordinary running rope, how many broken wires in one strand within one rope lay meet OSHA’s listed Category II count?','Three broken wires in one strand within one rope lay meet that criterion.'),
('For rotation-resistant rope, how many randomly distributed broken wires within30rope diameters meet OSHA’s listed Category II count?','Four randomly distributed breaks within30rope diameters meet that criterion.'),
('For ordinary running rope, how many randomly distributed broken wires within one rope lay meet OSHA’s listed Category II count?','Six randomly distributed breaks in one rope lay meet that criterion; the separate single-strand criterion is three.')])
family(['Replace the power-line-contact rope','Monitor the specified deficiency','Follow the more frequent inspection','Inspect before return from long idle'],[
('A wire rope has contacted an energized power line. What disposition addresses this Category III condition?','Repair of rope that contacted an energized power line is prohibited; replace it before operations involving that rope resume.'),
('At an annual inspection, the qualified person finds a condition that is not yet a safety hazard but explicitly requires monitoring. What must the employer arrange?','The condition must be checked in monthly inspections under1926.1412(f)(6).'),
('A manufacturer requires a safety-related inspection more often than OSHA’s minimum interval. Which schedule controls?','The more frequent manufacturer inspection procedure must be followed under1926.1412(j).'),
('A crane has remained idle for four months. What must occur before initial reuse?','Equipment idle3months or more requires a qualified-person inspection to the monthly-inspection scope before initial use.')])
family(['Remove defective rigging from use','Read the rated-capacity marking','Protect against sharp contact','Store clear of the immediate work area'],[
('A synthetic web sling has cut fibres and broken stitching. What is the required disposition?','Damaged or defective slings must be removed from service; web-sling cuts and broken stitches are listed removal conditions.'),
('A rigger must determine whether a shackle is suitable for an intended load. Which source identifies the manufacturer’s working-load limit?','The permanently affixed, legible identification marking states the rated capacity; it must not be exceeded.'),
('A sound sling will bear against an abrasive load edge. Which preparation directly addresses damage at that contact point?','Protect the sling from sharp or abrasive contact using suitable protection and the manufacturer’s instructions.'),
('A sling assembly is no longer needed and lies across the crew’s path. What storage action addresses the immediate hazard?','Unused rigging must be removed from the immediate work area so it does not create a hazard under1926.251(a)(3).')])
family(['A registered professional engineer','A qualified operational-control author','The designated competent inspector','The sling manufacturer’s rating'],[
('Manufacturer capacity-related operating procedures are unavailable. Who must develop and sign replacement capacity procedures under OSHA1926.1417(b)?','A registered professional engineer familiar with the equipment must develop and sign capacity-related procedures.'),
('Manufacturer procedures for operating the controls are unavailable. What level of author is required to develop those control procedures?','A qualified person must develop operational-control procedures; capacity procedures have the separate RPE requirement.'),
('Who must begin the ordinary each-shift visual crane inspection under OSHA1926.1412(d)?','A competent person begins and completes the shift-inspection process within the required timing.'),
('Which authority establishes the safe working load shown on the identification for a commercially supplied sling?','The sling manufacturer’s prescribed rated capacity governs the identification and must not be exceeded.')])
family(['Maintain the original access devices','Provide slip-resistant stepping surfaces','Check the recorded inspection results','Tag the affected hoist out of service'],[
('An originally supplied cab handhold is loose and unsafe. Which obligation directly addresses it?','Originally equipped steps, handholds, ladders and rails must be maintained in good condition under1926.1423.'),
('On covered equipment manufactured after November8, 2011, what property is required for walking/stepping surfaces other than crawler treads?','Those surfaces must have slip-resistant features/properties under1926.1423(c)(3).'),
('A new inspector needs to understand deficiencies previously found during the retained-record period. Which information must be made available?','Inspection documents must remain available to persons conducting inspections during the retention period.'),
('A rope must be removed from service, but the crane has a separate unaffected hoist. What identification prevents use of the defective-rope function?','Either the whole equipment or the affected hoist must be tagged out until the rope is repaired or replaced as permitted.')])
family(['Working load includes lifting gear','Rope lay describes a strand revolution','Boom angle is measured from horizontal','Rotation axis is the upperworks pivot'],[
('Which definition explains why a load block and shackles must be accounted for with the lifted object?','OSHA1910.180 defines working load to include load-attaching equipment such as blocks, shackles and slings.'),
('Which definition identifies the rope length used when counting breaks over one lay?','One rope lay is the length over which one strand makes a complete revolution around the rope.'),
('Which definition correctly establishes the reference for the boom’s inclination?','Boom angle is between the boom longitudinal centreline and the horizontal.'),
('Which definition identifies the vertical reference about which the crane’s rotating structure turns?','The axis of rotation is the vertical axis around which the superstructure rotates.')])
assert len(ITEMS)==48
