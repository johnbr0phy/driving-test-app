ITEMS=[]
def Q(stem,key,d1,d2,d3,why):ITEMS.append((stem,[key,d1,d2,d3],why))
Q('Who must disclose a known buried tank under a planned crane setup to the crane user and operator?',
 'Controlling entity','Crane owner','Crane operator','Assembly/disassembly director',
 'Under 1926.1402 the controlling entity must disclose known subsurface hazards such as tanks and voids and ensure required ground preparation. The operator receives the information but does not owe the disclosure.')
Q('Who must confirm that a power line is deenergized and visibly grounded at the worksite?',
 'Utility owner/operator','Site controlling entity','Crane\'s qualified rigger','Lift director on site',
 'OSHA 1926.1408 requires confirmation from the utility owner/operator. Appearances, or assurances from people who do not control the line, do not establish deenergization.')
Q('Before entering an assembly area hidden from the controls, whom must a crew member inform?',
 'Crane operator','Site safety manager','Designated signal person','General contractor',
 'Under 1926.1404(e) the operator must know the worker is entering that location and must not move the equipment until told the worker is in a safe position.')
Q('Before boom assembly, who must ensure crew members understand their tasks, hazards and positions to avoid?',
 'Assembly/disassembly director','Equipment operator','Controlling entity','Competent inspector',
 'The A/D director has this crew-instruction responsibility under 1926.1404(d). The controlling entity handles site matters such as ground conditions, not crew briefings for assembly.')
Q('An abandoned chamber lies below a solid-looking paved pad. Which concealed condition threatens support?',
 'Hollow space under the surface','Surface cracking of the paving','Slight slope across the pad','Standing water on the paving',
 'A buried void can collapse under outrigger loads even when the surface looks sound; 1926.1402 requires known buried hazards to be disclosed. Visible cracking or slope can be seen and corrected, unlike the hidden void.')
Q('An outrigger will sit beside a structure holding back soil. Which feature must be assessed for the added load?',
 'Retaining wall and retained soil','Nearest overhead obstruction height','Paved surface finish','Outrigger float size',
 'An outrigger beside a retaining wall adds surcharge that the wall and retained soil must be able to resist. Float size affects bearing pressure but says nothing about the wall\'s capacity.')
Q('After long rain, water pools around an outrigger pad and the surface softens. What does this indicate?',
 'The supporting soil may be saturated','The mat material has reached its rated limit','The crane\'s level indicator needs recalibration','The counterweight must be increased',
 'Softening and standing water point to saturated ground with reduced bearing capacity; ground support must continue to meet the manufacturer\'s requirements, so it must be reassessed.')
Q('A trench was just backfilled with no compaction check. What makes its support uncertain?',
 'Loose fill that may settle under load','Trench walls that may be too steep','Fill that is stronger than native soil','Surface paving that hides the trench',
 'Freshly placed, uncompacted fill can settle under crane loads and cannot be assumed to provide adequate support. Backfill is not normally stronger than undisturbed soil.')
Q('What is the main purpose of larger mats under each outrigger?',
 'Lower the pressure on the ground','Raise the crane\'s rated capacity','Level the carrier automatically','Reduce the outrigger reaction',
 'A larger effective bearing area spreads the same reaction over more ground, lowering bearing pressure. The reaction itself and the crane\'s chart rating are unchanged by the mat.')
Q('A supported crane is outside the manufacturer\'s allowable tilt. What must be achieved before lifting?',
 'Leveled to the required degree','Larger mat under each float','A lighter load than the chart allows','Counterweight reduced to compensate',
 'The crane must meet the manufacturer\'s degree-of-level requirement before lifting. Extra mats or a lighter load do not correct an out-of-level setup.')
Q('An undamaged paved setup area may have old tanks and utilities beneath it. Which action addresses this?',
 'Get the known buried hazards disclosed','Rely on the intact paving surface','Add extra mats as a precaution instead','Proceed if the pavement is level',
 'Known subsurface hazards must be identified and disclosed; surface appearance cannot show a buried tank or void. Extra mats do not address an unknown cavity.')
Q('The rotating counterweight can trap a worker against a fence. Which work-area action addresses this?',
 'Mark and barricade the swing zone','Post a sign on the fence only','Slow the swing near the fence','Station a worker by the fence to warn',
 'Under 1926.1424 the employer must use warning lines, railings or similar barriers to keep workers out of the swing and pinch/crush area. Slowing down or a sign alone leaves the hazard open.')
Q('Under OSHA Table T, what clearance applies to unloaded travel under a 0.5 kV AC line?',
 '4 feet','6 feet','10 feet','20 feet',
 'Table T lists 4 ft for unloaded travel at voltages up to 0.75 kV. The 10 ft figure is a Table A working distance, not a travel clearance.')
Q('What Table T clearance applies to unloaded crane travel near a 25 kV AC line?',
 '6 feet','4 feet','10 feet','15 feet',
 'Table T lists 6 ft for more than 0.75 kV through 50 kV. This is an unloaded-travel rule; working near the same line uses the larger Table A distance.')
Q('Traveling unloaded with the boom lowered near a 230 kV line, what Table T clearance applies?',
 '10 feet','6 feet','16 feet','20 feet',
 'Table T lists 10 ft for more than 50 kV through 345 kV. Twenty feet is the Table A working distance for that voltage band.')
Q('Which Table T clearance applies to a crane traveling unloaded near a 500 kV AC line?',
 '16 feet','10 feet','20 feet','25 feet',
 'Table T lists 16 ft for more than 345 kV through 750 kV; all required travel precautions also apply.')
Q('In a power-line encroachment plan, what marks the visible boundary the operator must not cross?',
 'Elevated warning line, barricade or signs','Range-control warning alarm in the cab','Dedicated spotter\'s hand signal','Ground-level painted stripe',
 'Under 1926.1408(b)(3) an elevated warning line, barricade or line of signs with high-visibility markings marks the boundary in view of the operator. Alarms and spotters are separate options.')
Q('During unloaded travel within 20 feet of a line, what gives the driver timely distance information?',
 'Dedicated spotter in continuous contact','Proximity alarm set on the boom','Elevated warning line along the route','Range limiter set before travel',
 'Under 1926.1411 a dedicated spotter in continuous contact with the driver gauges clearance and gives timely information. A range limiter is set for working, not for gauging travel distance.')
Q('Which power-line control physically stops equipment at a set point rather than only warning?',
 'Range-limiting device','Proximity warning alarm','Elevated warning line','Dedicated spotter',
 'A properly set range-limiting device prevents the equipment from moving past the set point. Alarms, warning lines and spotters only warn or inform.')
Q('Which evidence shows a line has been deenergized and visibly grounded at the worksite?',
 'Utility owner/operator\'s confirmation','Line appearing slack and silent','A crew spotter\'s report that it is grounded','Note in last week\'s lift plan',
 'The deenergized and grounded condition must be confirmed by the utility owner/operator. A line that looks dead, or an earlier note, is not that confirmation.')
Q('A crane\'s route passes under a low bridge. Which dimension must be compared with the opening?',
 'Overall transport height','Overall transport width','Gross vehicle weight','Outrigger spread',
 'Transport height determines vertical clearance under a low structure. Weight matters for the bridge deck, not for passing beneath it.')
Q('The route passes between fixed gateposts. Which dimension determines whether the crane fits?',
 'Overall transport width','Overall transport height','Tail swing of the upperworks','Axle load on the gate area',
 'Transport width must fit the usable gate opening with safe clearance. Tail swing matters when the upperworks rotate, not during travel through a gate.')
Q('The route crosses soft fill with no obstructions. What must be verified before travel?',
 'Ground support for the crane\'s weight','Vertical clearance along the path','Lateral clearance to fixed objects','Surface appearance of the fill material',
 'The route must support the crane; adequate geometric clearance does not establish bearing capacity, and the look of fill says little about its strength.')
Q('The carrier fits beside a wall, but the upperworks will rotate. Which clearance must be assessed?',
 'Counterweight tail-swing clearance','Carrier width beside the wall','Boom-tip height clearance','Outrigger beam clearance',
 'Tail-swing clearance decides whether rotation creates a collision or a pinch/crush point. The carrier already fits, so its width is not the open question.')
Q('A mat carries 40,000 lb uniformly on soil allowed 2,000 lb/ft². What minimum effective area is needed?',
 '20 square feet','10 square feet','40 square feet','80 square feet',
 '40,000 / 2,000 = 20 ft². Actual support design must also address mat strength, load distribution and site conditions.')
Q('What area does a 5 ft by 5 ft mat footprint give in a uniform-bearing calculation?',
 '25 square feet','10 square feet','20 square feet','50 square feet',
 '5 x 5 = 25 ft²; adding the sides (10) gives a length, not an area. Nominal mat size alone does not prove that its full area is effective.')
Q('A plan requires 20 ft² of effective area plus a 10 ft² allowance. What total area is required?',
 '30 square feet','20 square feet','10 square feet','200 square feet',
 'The stated areas add to 30 ft². This is arithmetic using the supplied plan, not a universal safety allowance.')
Q('A revised plan doubles a mat\'s 20 ft² effective area. What area is required?',
 '40 square feet','20 square feet','22 square feet','80 square feet',
 'Twice 20 ft² is 40 ft²; only the stated plan establishes the increase.')
Q('Which record best locates old underground tanks or utilities beneath a proposed pad?',
 'Site as-built drawings','Manufacturer\'s setup manual','Recent site survey of grades','Crane\'s annual inspection record',
 'As-built drawings document what was actually installed below grade; the controlling entity must disclose known hazards. A grade survey shows surface levels, not buried structures.')
Q('Which source specifies permitted outrigger deployment and degree of level for a configuration?',
 'Manufacturer\'s instructions','Site geotechnical report','Mat manufacturer\'s data sheet','Operator\'s own experience',
 'Manufacturer instructions define permitted setup and level tolerance; site documents describe the ground, not the equipment limits.')
Q('Which document evaluates whether the soil and supports can carry the proposed reactions?',
 'Geotechnical bearing assessment','Crane\'s rated-capacity chart','Outrigger reaction printout alone','Site as-built drawings',
 'A geotechnical or support assessment addresses ground bearing. A reaction printout gives the force, but not whether the ground can carry it.')
Q('Two cranes have overlapping working radii. What addresses how their operations are coordinated?',
 'Agreed system controlling the shared area','Separate signal persons with no shared link','Barricades around each crane only','Larger mats under both cranes',
 'OSHA 1926.1424(b) requires a system to coordinate operations when working areas overlap. Separate signalers who do not talk, or barricades, do not coordinate the two machines.')
Q('Before unloaded travel under a line, the boom is higher than needed. What action addresses this?',
 'Lower the boom or mast sufficiently','Keep the boom up and add a spotter','Reduce travel speed only','Retract the outriggers fully',
 'OSHA 1926.1411 requires the boom or mast to be lowered enough to keep the Table T clearances. A spotter is an added measure, not a substitute.')
Q('An unloaded crane travels at night near lines that cannot be seen. Which precaution makes them identifiable?',
 'Light or otherwise mark the lines','Reduce speed near the lines','Keep the boom fully lowered','Sound the horn at intervals',
 'In poor visibility the lines must be illuminated or another means used to identify their location. Slowing down does not show where they are.')
Q('Dips and bumps on a route can move the boom toward a line. What must the clearance plan include?',
 'Speed and terrain effects on position','Crane\'s total gross weight','Voltage figure printed on the pole','Boom\'s rated capacity',
 'Speed and uneven terrain can make the boom bounce or rise, so they must not be allowed to cause a clearance breach. Capacity and gross weight do not change clearance.')
Q('In poor visibility, the driver sees the line but has no verified route around obstacles. What else is required?',
 'Identify and use a safe travel path','Travel only with the boom raised','Rely on the driver\'s judgment','Illuminate the line again',
 'OSHA 1926.1411 requires identifying and using a safe travel path as well as identifying the lines. Seeing the line does not settle the route.')
Q('A lattice-boom section will become unstable once its pins are removed. What preparation controls this?',
 'Block or rig the section beforehand','Remove the lower pins first','Remove all pins, then support it','Have a worker steady it by hand',
 'Under 1926.1404(h)(7) boom sections must be rigged or supported to stay stable before pins are removed. Pin order alone, or a worker holding it, does not prevent collapse.')
Q('An assisting crane holds components during boom assembly, its load changing by step. What must be verified first?',
 'Its imposed load at each step','Helper crane\'s travel speed','Only the final crane\'s chart','Number of crew at each step',
 'Under 1926.1404(h)(4) the loads imposed on an assist crane at each stage must be verified before assembly or disassembly begins.')
Q('A synthetic sling touches a sharp boom edge during assembly. What protects the sling?',
 'Softeners or edge protection','Shorter sling at the same angle','Extra tension to stop sliding','Wider sling with no padding',
 'Under 1926.1404(r) synthetic slings must be protected from sharp or abrasive edges. A wider or shorter sling still bears on the sharp edge.')
Q('A worker entered an assembly position hidden from the operator. What is needed before moving that equipment?',
 'Notice that the worker is now safe','Signal from any nearby worker','A/D director\'s general go-ahead','Horn sounded twice',
 'Under 1926.1404(e) the operator must not move the equipment until told, through the pre-arranged system, that the crew member is in a safe position.')
Q('Under OSHA, where must blocking go for a jack-equipped outrigger?',
 'Under the float or pad of the jack','Under the outrigger beam\'s midpoint','Beside the float on firm ground','Under the carrier frame rails',
 'Blocking belongs under the float or pad of the jack so the load passes straight into it, not beneath an arbitrary point on the beam.')
Q('Where should blocking under a lattice-boom section be placed to avoid damage and collapse?',
 'Where the assembly procedures specify','Under the lacing at midspan','Wherever the ground is most level','At one central point only',
 'Blocking must be placed at appropriate locations that protect structural integrity and prevent movement, following the assembly procedures. Lacing is not designed to carry the section on blocks.')
Q('When a boom component is hoisted during assembly, where should its handling rigging attach?',
 'At suitable lifting points','Around any lacing member','Through the connecting pin holes','At its midpoint by eye',
 'Under 1926.1404(h)(5) components are hoisted from suitable lifting points to avoid structural damage and allow controlled handling.')
Q('Where should a warning line restricting entry to the counterweight pinch area be set?',
 'At the edge of the hazard area','At the crane\'s center pin','Next to the operator\'s cab door','Well outside the whole site area',
 'Under 1926.1424 the warning line marks the boundary of the hazard area so workers stay out of it while the rest of the site remains usable.')
assert len(ITEMS)==44
