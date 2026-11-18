import json, hashlib
from pathlib import Path
P=Path(__file__).parent
bank=Path('/Users/johnbrophy/tigertest-next20-epa609/data/epa609-questions.json')
old={q['questionId']:q for q in json.loads(bank.read_text())}
rows=[]; evidence=[]
def add(suffix,stem,choices,key,explanation,objective,locator,wrong,change='Rebuilt alternatives around adjacent real procedures.',overlap=None):
 qid='EPA609-'+suffix; q=dict(old[qid]); q.update(question=stem,correctAnswer='ABCD'[key],correctIndex=key,explanation=explanation)
 for l,v in zip('ABCD',choices): q['option'+l]=v
 rows.append(q)
 ev={'questionId':qid,'objective':objective,'discriminatingFact':stem,'sourcePassageLocator':locator,'change':change,'existingBankOverlap':overlap,'options':[]}
 for i,o in enumerate(choices):
  if i==key: ev['options'].append({'option':'ABCD'[i],'text':o,'role':'key','support':explanation,'sourcePassageLocator':locator})
  else:
   reason,other,exclude,loc=wrong[i]
   ev['options'].append({'option':'ABCD'[i],'text':o,'role':'distractor','whyCandidateMightChoose':reason,'validOtherCondition':other,'whyStemExcludes':exclude,'sourcePassageLocator':loc})
 evidence.append(ev)
M='MACS January 2025, printed page '
B='40 CFR '
add('SRV-031','Which usage record determines when a vacuum pump reaches its scheduled oil-change interval?',
 ['Hours the pump has operated','Mass processed by the recovery filter','Date of the cylinder pressure test','Number of vehicles charged that day'],0,
 'Pump service intervals are based on its operating instructions; MACS gives operating hours as a typical basis. Refrigerant throughput concerns the recovery filter, and cylinder testing has its own schedule. Vehicle count does not measure pump operating time.',
 'Distinguish pump runtime from other equipment maintenance counters.',M+'23, vacuum pump maintenance paragraph; Appendix C 4.1.1 and 7.3.3',{
 1:('Confuses the machine filter counter with the pump service counter.','A desiccant filter tracks refrigerant processed before replacement.','The component is the vacuum pump, not the refrigerant filter.',B+'part 82 subpart B Appendix C 4.1.1'),
 2:('Treats periodic cylinder certification as the service date for the whole machine.','Refillable container retesting uses a calendar interval.','A cylinder test date does not record pump use.',B+'part 82 subpart B Appendix C 7.3.3'),
 3:('Uses completed jobs as an informal workload measure.','Job count can describe shop activity, but is not the stated pump interval.','Evacuation durations differ; the manual gives operating hours.',M+'23, maintenance paragraph')})
add('SRV-022','What has a flushing compound demonstrated by meeting SAE J2670?',
 ['Removal of debris from condenser passages','Removal of solvent during evacuation','Compatibility with A/C system materials','Suitability for an OEM flushing procedure'],2,
 'J2670 addresses stability and compatibility. It does not establish debris-removal performance, complete removal of residual solvent, or permission to flush a particular manufacturer’s system. Those are separate questions before using a flushing process.',
 'Separate material compatibility from cleaning performance and vehicle applicability.',M+'22, Flushing A/C Systems',{
 0:('Reads a flushing-material standard as a cleaning-performance certification.','Cleaning effectiveness must be established for the component and process.','MACS expressly says compatibility does not assure cleaning.',M+'22, last flushing paragraph'),
 1:('Assumes compatible solvent also evaporates completely under vacuum.','Residual solvent removal is a separate process concern.','MACS warns that prolonged vacuum may leave solvent.',M+'22, solvent boiling-point paragraph'),
 3:('Treats SAE conformity as vehicle-manufacturer authorization.','OEM service guidance determines whether its system may be flushed.','MACS separates manufacturer reservations from J2670 compatibility.',M+'22, opening and final flushing paragraphs')})
add('EQP-013','An unplugged recovery machine needs internal fitting work. Which hazard still requires attention?',
 ['Current entering through the power cord','Pressure retained in refrigerant passages','Rotation powered by the compressor motor','Arcing from energized control switches'],1,
 'Disconnecting electrical power does not remove trapped refrigerant pressure. MACS warns that internal fittings can release pressurized refrigerant and directs technicians to consult authorized service personnel before nonroutine work. This is not permission to open the fittings.',
 'Recognize that electrical isolation does not establish refrigerant depressurization.',M+'11, precautions 12–15',{
 0:('Associates equipment maintenance primarily with electric shock.','Connected equipment can receive mains power.','The stem states that the cord is unplugged.',M+'11, precaution 13'),
 2:('Associates opening a machine with moving powered machinery.','An operating compressor has motor-driven motion.','The question specifies electrical disconnection, not a running cycle.',M+'11, precaution 13'),
 3:('Recalls that recovery machines contain spark-producing components.','Energized equipment may produce arcs or sparks.','The stated isolation removes that power source but not refrigerant pressure.',M+'11, precautions 13 and 15')},change='Narrowed from selecting unplugging to distinguishing two separate energy hazards. No universal internal-service procedure is supplied.')
add('EQP-011','Liquid refrigerant contacts exposed skin during disconnection. What causes the immediate risk of tissue freezing?',
 ['Heat absorbed as the liquid evaporates','Oxygen displaced by the released vapor','Acidic products formed near hot surfaces','Heat released when vapor burns in air'],0,
 'Rapid evaporation draws heat from contacted tissue and can cause frostbite. Oxygen displacement is an inhalation hazard; decomposition requires heat, and combustion requires ignition conditions. These hazards call for different controls.',
 'Distinguish liquid-contact injury from inhalation, decomposition and combustion hazards.','Honeywell Solstice yf SDS, sections 4–6; '+M+'11 precautions 2–3 and 43 precaution 2',{
 1:('Confuses a refrigerant release’s inhalation danger with its contact injury.','Vapor accumulation can reduce breathable oxygen.','The question concerns freezing at the point of liquid contact.','Honeywell SDS sections 5–6'),
 2:('Recalls harmful refrigerant decomposition products.','Fire or intense heat can produce hazardous decomposition products.','No hot surface or fire is stated; the injury is immediate cooling.','Honeywell SDS section 5'),
 3:('Applies the flammability warning to any released refrigerant.','Combustion can occur under ignition conditions.','Liquid evaporation, rather than burning, explains tissue freezing.','Honeywell SDS sections 4–5')},change='Rejected original eyewear-selection objective: source lacks three adequately grounded competing eyewear configurations. Substituted contact-injury mechanism.',overlap='Compare EQP-021 (thermal decomposition) before expansion; retain distinct contact versus heat-exposure decisions or consolidate.')
add('REG-026','An EPA representative checks a technician’s practical recovery skills. Which demonstration may the representative require?',
 ['Laboratory certification of the recovery machine','Chemical analysis of a reclaimed refrigerant batch','Demonstration of recovery at the business premises','Submission of the training program’s subject review'],2,
 'Section 82.40(f) permits a representative to require an on-premises demonstration of proper recovery or recycling. Equipment certification, reclamation analysis and training-program reviews concern different actors and evidence.',
 'Distinguish the technician demonstration power from equipment and program oversight.',B+'82.40(f); 82.38; 82.40(c); 82.32(e)(2)',{
 0:('Confuses checking technician competence with certifying equipment performance.','Approved testing organizations certify equipment.','The subject is the technician’s practical skill.',B+'82.38 and 82.40(f)'),
 1:('Confuses proper recovery technique with reclaimed-product purity verification.','Reclaimed refrigerant must meet the applicable purity specification.','Batch purity does not demonstrate the technician’s recovery procedure.',B+'82.32(e)(2)'),
 3:('Confuses program oversight with review of a working technician.','Approved programs periodically review their subject material.','The technician is not being asked to administer a training program.',B+'82.40(c)')},change='Replaced consent strawmen with distinct regulatory oversight functions. Broadened original inspection objective to the explicit practical-demonstration provision.')
add('EQP-022','A mobile technician uses recovery-only equipment at a customer’s garage. What must precede recharging the recovered refrigerant?',
 ['Transferring it into a refillable transport cylinder','Checking its identity with a refrigerant analyzer','Measuring the oil collected during recovery','Recycling it with approved equipment or reclaiming it'],3,
 'Mobile service retains the same processing requirements as shop service. Recovery alone is insufficient before reuse, even in the same vehicle. A cylinder transfer, identity check or oil measurement serves another purpose and does not complete recycling or reclamation.',
 'Apply the unchanged reuse requirement to recovery-only equipment used off-site.',B+'82.32(e)(1)–(3); '+M+'16, 31',{
 0:('Mistakes transfer to a suitable storage vessel for completion of processing.','A refillable cylinder can receive recovered refrigerant.','Storage does not clean the recovered fluid.',M+'11 precaution 10; '+B+'82.32(e)(1)'),
 1:('Assumes a correct refrigerant identity proves it is ready for reuse.','An analyzer helps identify refrigerant and contamination.','Identity testing is not the required recycling or reclamation.',M+'31, refrigerant contamination narrative; '+B+'82.32(e)(1)'),
 2:('Treats the machine’s oil-removal step as sufficient cleaning.','Oil must be measured for replacement accounting.','Recovery and oil collection do not establish completed recycling.',M+'16; '+B+'82.32(e)(1)')},change='Applied mobile rule to a concrete processing decision.',overlap='REG-005 already tests reuse processing. Do not retain both as separate objectives during expansion; consolidate and replace the freed slot.')
add('SRV-026','Which service history most strongly indicates desiccant replacement for atmospheric moisture exposure?',
 ['Recovery completed with the circuit still sealed','Uncapped lines left throughout extended collision repairs','Charge corrected after an inaccurate scale reading','Leak detector used around assembled hose connections'],1,
 'Extended exposure through uncapped connections can saturate desiccant. Recovery in a sealed circuit, charge correction and external leak detection do not by themselves establish that exposure. Vehicle-specific replacement instructions still apply.',
 'Use exposure history to identify desiccant saturation risk.',M+'24, Desiccant Failure',{
 0:('Assumes refrigerant removal itself admits atmospheric moisture.','Recovery removes refrigerant before service.','The circuit remains sealed; no prolonged atmospheric exposure is described.',M+'14 recovery; 24 Desiccant Failure'),
 2:('Confuses charge-related performance problems with moisture contamination.','An inaccurate charge requires charge correction.','The error is mass measurement, not open connections.',M+'24 critical charge; 27 scale accuracy'),
 3:('Treats any leak-checking procedure as opening the circuit.','External detection is used around connected components.','The connections remain assembled.',M+'17–18 electronic leak detection; 24 Desiccant Failure')})
add('REG-004','Which top-off-only business must purchase approved recycling equipment under Section 82.32(e)(4)?',
 ['Business charging only off-road tractor cab systems','Business charging only off-road combine cab systems','Business charging only highway passenger-car systems','Business charging only off-road excavator cab systems'],2,
 'The provision expressly requires equipment purchase for facilities charging MVACs, including highway passenger cars. Its top-off-only exception applies to MVAC-like appliances, such as off-road cab systems; technician certification still applies to those businesses.',
 'Apply the equipment-purchase distinction between MVAC and MVAC-like top-offs.',B+'82.32(e)(4); EPA Section 608 and Section 609 Overlap, MVAC-like appliances',{
 0:('Assumes every vehicle cab system is an MVAC under the same purchase rule.','Opening MVAC-like systems requires access to approved equipment.','This business only tops off off-road equipment.',B+'82.32(e)(4)–(5); EPA overlap'),
 1:('Extends the highway vehicle rule to agricultural equipment.','Broader servicing can trigger the equipment requirement.','The stated work is limited to charging an MVAC-like system.',B+'82.32(e)(4)–(5); EPA overlap'),
 3:('Applies the shop equipment rule without distinguishing the end use.','Equipment is needed when opening the off-road system.','The top-off-only exception covers MVAC-like appliances.',B+'82.32(e)(4)–(5); EPA overlap')},overlap='REG-007 MVAC-like certification is a different obligation; review together to avoid teaching identical category recognition repeatedly.')
add('EQP-024','A collection bottle held 8 mL before recovery and 20 mL afterward. How much fresh oil replaces this removal?',
 ['8 mL','12 mL','20 mL','28 mL'],1,
 'This job added 20 minus 8, or 12 mL, to the bottle. Replace that removed quantity with fresh oil of the required type. The 8 mL predates this job; 20 mL counts both jobs, and 28 mL double-counts the starting quantity. Emptying the bottle beforehand prevents this error.',
 'Separate current-job oil removal from prior-job residue.',M+'16, oil recovery reservoir caption',{
 0:('Uses the starting mark as the job’s removal.','8 mL is the recorded quantity already present.','It predates the current recovery.',M+'16 reservoir caption; arithmetic from stem'),
 2:('Assumes the bottle was empty and uses its final reading.','Final reading measures this job when the bottle starts empty.','The stem gives an 8 mL starting balance.',M+'16 reservoir caption; arithmetic from stem'),
 3:('Adds the starting amount to the final reading rather than subtracting.','Addition would combine two separate job quantities, not cumulative readings.','The final mark already includes the starting oil.',M+'16 reservoir caption; arithmetic from stem')},overlap='SRV-002 simple oil replacement quantity overlaps; consolidate into this accounting decision before expansion.')
add('REG-015','Which HFC-134a use falls outside EPA’s new-vehicle Technology Transitions restriction?',
 ['First charge of a new 2026 passenger car','Factory charge of a 2026 imported passenger car','Recharge after repairing a 2016 passenger car','First charge of a new 2026 passenger-car MVAC'],2,
 'EPA distinguishes existing-system service from manufacture and import of new vehicles. Repairing and recharging the 2016 system remains outside this new-vehicle restriction. The other choices concern initial charges in new passenger vehicles, not service of an existing system.',
 'Distinguish existing-system repair from new passenger-vehicle manufacture and import.','EPA servicing, Technology Transitions section and light-duty passenger vehicle table',{
 0:('Treats first charging as ordinary technician service.','Charging an existing vehicle after repair is outside this restriction.','This is the initial charge of a new 2026 passenger car.','EPA servicing, Technology Transitions table'),
 1:('Assumes overseas manufacture avoids a domestic new-vehicle rule.','Existing imported vehicles can still receive ordinary repairs.','The table expressly includes imports of new affected vehicles.','EPA servicing, Technology Transitions table'),
 3:('Focuses on the A/C component rather than the vehicle’s new status.','Existing-system replacement or repair is a servicing activity.','This is a first charge in a new 2026 passenger-car system.','EPA servicing, Technology Transitions section')})
add('YF-006','Which R-1234yf property explains why ventilation must address a service pit as well as the workbench?',
 ['Vapor pressure increases with temperature','Vapor is denser than surrounding air','Liquid evaporates readily after release','Vapor can ignite within a concentration range'],1,
 'Vapor density greater than air allows released refrigerant to accumulate in low areas. Evaporation creates vapor, pressure depends on temperature, and flammability affects ignition risk; those facts do not explain its tendency to collect in a pit.',
 'Distinguish vapor distribution from vapor generation and ignition properties.','Honeywell Solstice yf SDS sections 5–6 and 9; '+M+'43 precaution 1A',{
 0:('Uses a familiar refrigerant pressure-temperature relationship to explain release behavior.','Temperature affects pressure in a containing system.','The question asks about vertical accumulation after release.','Honeywell SDS section 9 vapor pressure'),
 2:('Recognizes that spilled refrigerant becomes vapor and attributes location to evaporation.','Ready evaporation explains the production of vapor.','It does not distinguish a pit from an elevated location.','Honeywell SDS section 6'),
 3:('Connects pit ventilation only to the A2L fire warning.','Concentration affects ignition possibility.','Flammability does not explain why vapor accumulates low.','Honeywell SDS section 9; '+M+'44')})
add('YF-014','R-1234yf passes vacuum decay but leaks during the partial-charge check. Which operation remains permitted?',
 ['Delivering the remainder of the programmed charge','Beginning recovery of the test charge','Repeating the initial 15% charging step','Starting the next vehicle’s automatic recharge cycle'],1,
 'After detection during the pressurized check, the described machine allows recovery or re-evacuation. Completing the charge requires passing both checks. The partial charge belongs to an earlier stage; a new recharge cycle does not resolve the detected leak.',
 'Distinguish allowed machine actions after a failed pressurized check from earlier and later sequence stages.',M+'51, R-1234yf recharge sequence',{
 0:('Treats the successful vacuum test as sufficient authorization to finish.','The balance is charged after both checks pass.','The pressurized check found a leak.',M+'51, second paragraph'),
 2:('Treats the small test dose as a repeatable diagnostic top-up.','The initial 15% is added after the vacuum test passes and the detector is positioned.','That stage has already occurred and failed.',M+'51, final sequence paragraphs'),
 3:('Assumes ending the failed job permits bypassing the machine’s restricted state.','A machine may begin another job after the failed job is properly resolved and equipment is ready.','The failed test charge still requires handling; recharge operations are locked out.',M+'51, lockout paragraph')})
add('SRV-029','A replacement condenser includes a revised charge label. Which specification governs its completed installation?',
 ['Original underhood label for the factory condenser','Current bulletin for a different condenser option','Original charge listed for that model’s rear A/C','Charge supplied for the installed replacement condenser'],3,
 'Some replacement condensers change the required refrigerant quantity and include installation instructions and a replacement label. The instruction must match the installed part. A factory label, another condenser’s bulletin or a rear-A/C configuration does not establish that amount.',
 'Select charge information by installed-component applicability.',M+'25, replacement condenser paragraph',{
 0:('Prefers the vehicle’s permanent-looking original label over part instructions.','It governs an unchanged original configuration unless superseded.','The replacement includes a revised specification.',M+'25, service bulletins and replacement condenser paragraphs'),
 1:('Assumes the newest bulletin applies across all condenser options.','A current bulletin applies to the configuration it names.','This bulletin concerns a different condenser.',M+'25, component-change and bulletin discussion'),
 2:('Selects a familiar model-level capacity without matching equipment.','A rear-A/C specification applies to that configuration.','It does not identify the requirement for the installed replacement.',M+'25, component-specific charge instruction')})
add('REG-028','Salvage MVAC refrigerant will return to MVAC use without reclamation. Where must it be recycled?',
 ['At the facility that recharges it','At the laboratory that identifies it','At the distributor that sells virgin refrigerant','At the facility that retests its cylinder'],0,
 'Section 82.34(d)(1)(ii) allows the dedicated-equipment recovery route followed by recycling at the facility that charges or recharges the refrigerant. Identification, virgin-refrigerant distribution and cylinder testing serve different purposes. This question does not claim that Section 609 is the only purchaser category for all refrigerant sales.',
 'Apply the salvage-specific processing route rather than a universal purchaser claim.',B+'82.34(d)(1)(ii)(A)–(B); 82.154(c)–(d)',{
 1:('Mistakes analysis of identity or quality for recycling.','A laboratory can analyze a sample.','Analysis is not the specified processing at the recharging facility.',B+'82.34(d)(1)(ii)(B); '+M+'31'),
 2:('Assumes a virgin-refrigerant seller is automatically a processing facility.','A distributor supplies refrigerant, but may separately operate qualifying equipment.','Its distributor status does not satisfy the location rule.',B+'82.34(d)(1)(ii)(B); 82.154(c)'),
 3:('Confuses container suitability with the suitability of the contents.','A refillable cylinder may need periodic retesting.','Cylinder inspection does not recycle its contents.',B+'part 82 subpart B Appendix C 7.3.3; 82.34(d)(1)(ii)(B)')},change='Rejected broad exclusive-buyer claim. Replaced with the explicit unreclaimed salvage processing route.',overlap='Review REG-025 off-site common ownership and REG-005 generic reuse: salvage-specific facility condition is distinct, but explanations must preserve scope.')
(P/'pilot-questions.json').write_text(json.dumps(rows,indent=2,ensure_ascii=False)+'\n')
(P/'authoring-evidence.json').write_text(json.dumps({'status':'Draft pilot for manual and independent review, not approved','date':'2026-11-18','frozenBankSha256':hashlib.sha256(bank.read_bytes()).hexdigest(),'items':evidence},indent=2,ensure_ascii=False)+'\n')
(P/'before-after.md').write_text('# EPA 609 pilot: before and after\n\nProduction bank remains frozen and rejected. Raw independent options-only result remains 94/100. This pilot is not approval for expansion.\n\n'+ '\n\n'.join('## '+q['questionId']+'\n\nBefore: '+old[q['questionId']]['question']+'\n\nAfter: '+q['question']+'\n\n'+e['change']+'\n\nOverlap: '+(e['existingBankOverlap'] or 'No same-decision overlap identified in this pilot.') for q,e in zip(rows,evidence))+'\n')
print('Wrote',len(rows),'pilot rows; production SHA256',hashlib.sha256(bank.read_bytes()).hexdigest())
