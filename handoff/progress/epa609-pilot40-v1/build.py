from pathlib import Path
import json, copy, hashlib
ROOT=Path('/Users/johnbrophy/tigertest-next20-progress')
OUT=ROOT/'epa609-pilot40-v1'
manifest=json.loads((ROOT/'epa609-pilot40-selection.json').read_text())
base=json.loads((ROOT/'epa609-pilot-v4/pilot-questions.json').read_text())
bank=json.loads(Path('/Users/johnbrophy/tigertest-next20-epa609/data/epa609-questions.json').read_text())
questions={q['questionId']:copy.deepcopy(q) for q in base+bank if q['questionId'] in manifest['additional26']}
questions.update({q['questionId']:copy.deepcopy(q) for q in base})
evidence=copy.deepcopy(json.loads((ROOT/'epa609-pilot-v4/authoring-evidence.json').read_text()))
evs={e['questionId']:e for e in evidence['items']}
changes=[]
def put(suffix,stem,opts,key,explanation,source,objective,notes,errors,overlap=None,cognition='Applied knowledge'):
    ident='EPA609-'+suffix
    old=copy.deepcopy(questions[ident]); q=questions[ident]
    q.update(question=stem,correctAnswer=key,correctIndex='ABCD'.index(key),explanation=explanation)
    for letter,option in zip('ABCD',opts):q['option'+letter]=option
    options=[]
    for letter,option in zip('ABCD',opts):
        record=dict(option=letter,text=option,role='key' if letter==key else 'distractor',sourcePassageLocator=source)
        if letter==key:record['support']=explanation
        else:
            why,other,excluded=errors[letter]
            record.update(whyCandidateMightChoose=why,validOtherCondition=other,whyStemExcludes=excluded)
        options.append(record)
    evs[ident]=dict(questionId=ident,objective=objective,discriminatingFact=stem,sourcePassageLocator=source,change=notes,existingBankOverlap=overlap,cognitiveDemand=cognition,options=options)
    changes.append(dict(questionId=ident,before=old,after=q,reason=notes,overlap=overlap))
def keep(suffix,source,objective,errors):
    q=questions['EPA609-'+suffix]
    put(suffix,q['question'],[q['option'+x] for x in 'ABCD'],q['correctAnswer'],q['explanation'],source,objective,'Retained original wording: alternatives are competing records or credential categories in this actual task.',errors,cognition='Foundational regulatory knowledge')
M=lambda p,topic:f'MACS January 2025 certification training narrative, printed page {p}, {topic} (PDF page {p+6}); not review questions'
C='40 CFR 82.42, current text read 2026-11-18, '
put('SRV-031','Which usage record supports a vacuum pump oil-change interval stated in running time?',
['Days since the last pump oil change','Elapsed operating hours','Mass processed by the recovery filter','Number of vehicles charged that day'],'B',
'Use the pump’s elapsed operating hours for a runtime-based interval. Calendar days and job counts do not measure how long it operated. Refrigerant mass is used for recovery-filter capacity. Follow the pump manufacturer’s actual schedule; no universal oil-change interval is implied.',M(23,'vacuum pump maintenance')+'; Robinair SP01972025 VER 01 printed page 31, remaining oil-life hours; page 28, filter capacity',
'Distinguish the pump runtime counter from calendar time, throughput and job count.','Removed training provider name and universal-interval implication. No numeric interval is asserted.',{
'A':('Uses calendar time as an estimate of pump use.','A calendar interval may appear in a particular maintenance plan.','The supplied interval is runtime-based.'),
'C':('Confuses the recovery filter’s throughput counter with the pump counter.','Filter replacement is based on refrigerant processed.','It does not measure pump operation.'),
'D':('Counts service jobs as a proxy for equipment wear.','Job counts measure activity.','Evacuation durations vary by job.')},cognition='Maintenance record interpretation')
put('REG-025','The equipment owner is unavailable. Who else may sign a shop’s initial EPA equipment certification statement?',
['Responsible officer of the business','Certified technician operating the machine','Trainer employed by the equipment supplier','Inspector calibrating the machine'],'A',
'Section 82.42(a)(1) permits the equipment owner or another responsible officer to sign. Technician certification, supplier training and calibration work do not by themselves confer that signing authority. A technician who is also a responsible officer could sign in that officer role.',C+'(a)(1), signature and equipment certification statement',
'Identify the alternate authorized signer of the shop’s equipment certification.','Replaced repeated common-ownership objective; retained selected ID, no resampling.',{
'B':('Equates personal certification to use equipment with authority to certify for its owner.','A technician who is also a responsible officer can sign in that role.','Operator certification alone is not the designated authority.'),
'C':('Treats supplier expertise and commissioning responsibility as authority for the shop’s filing.','Supplier training supports competent equipment use.','The statement is signed by the owner or another responsible officer.'),
'D':('Treats a technical inspection as authority to attest the owner’s regulatory commitments.','Calibration establishes measurement performance.','Calibration work does not make the inspector the responsible officer.')},overlap='Consolidates original REG-025 into retained EQP-022. New signer-authority objective differs from REG-007 later equipment filings and REG-017 operator evidence.')
put('REG-027','Where must a retailer display the certification notice when selling CFC-12 cans under 20 pounds?',
['On invoices supplied with completed purchases','Inside the file holding purchaser credentials','Prominently in the area where sales occur','Beside the cylinders in employee-only storage'],'C',
'Section 82.42(c) requires a prominent sign where sales occur. An invoice, credential file or employee-only storage notice does not provide that required point-of-sale display.',C+'(c), public notification; (b)(3), purchaser verification',
'Place the required retail notice at the point of sale.','Changed unrelated notice subjects to four plausible ways a seller might communicate or retain the same notice.',{
'A':('Treats giving each buyer a notice as equivalent to public display.','Invoices document transactions.','The requirement is a prominent sign where sales occur.'),
'B':('Files the notice with the records used to enforce the same sales restriction.','Credential records support purchaser verification.','A private file is not public display.'),
'D':('Posts the sign near the regulated stock where employees handle it.','Storage-area signs can inform employees.','Employee-only storage is not where the stated retail sales occur.')})
put('REG-017','Which personnel record establishes eligibility to operate approved MVAC recycling equipment under Section 609?',
['Evidence of current technician certification','Certificate of attendance at refrigerant training','Employer sign-off on supervised shop practice','Receipt for a scheduled certification examination'],'A',
'The shop must retain evidence that authorized operators are currently certified under Section 82.40. Training attendance, supervised practice and examination enrollment can precede certification, but none establishes that the technician has obtained it.',C+'(b)(2); 40 CFR 82.40(a)(1)–(4), training, testing and proof',
'Distinguish certification evidence from preparatory training records.','Replaced equipment records with four personnel qualification records.',{
'B':('Assumes completing instruction automatically confers certification.','Attendance can document required training.','Passing the certification test is also required.'),
'C':('Treats practical competence as the regulatory credential.','On-the-job training is a permissible training route.','The record must demonstrate current certification.'),
'D':('Treats registration as sufficient while awaiting testing.','The receipt establishes enrollment.','It does not establish successful completion and certification.')})
put('REG-024','Why does an HCFC-22-containing retrofit blend require barrier hoses in place of traditional CFC-12 hoses?',
['To withstand a higher required burst pressure','To seal the changed service-port connections','To reduce moisture left during evacuation','To reduce refrigerant passage through hose walls'],'D',
'EPA identifies HCFC-22 seepage through traditional CFC-12 hose material as the reason for barrier hoses. Hose-wall permeation differs from fitting leakage, burst strength and removal of moisture during evacuation.',
'EPA Choosing and Using a Retrofit Refrigerant for a CFC-12 MVAC, Barrier Hoses, Unique Fittings; MACS printed pages 23 and 36',
'Identify the containment mechanism behind the retrofit hose requirement.','Kept the permeation objective; replaced lubricant-viscosity distraction with neighboring hose and moisture-control functions.',{
'A':('Attributes the replacement to pressure strength rather than permeability.','Burst resistance is a component design consideration.','EPA gives seepage through traditional material as this requirement’s reason.'),
'B':('Confuses retrofit fitting changes with the purpose of the hose wall barrier.','Unique service fittings are a separate retrofit requirement.','Barrier hose addresses permeation through material, not attachment-point sealing.'),
'C':('Confuses moisture protection with refrigerant containment.','Evacuation and desiccant address moisture.','A hose barrier cannot remove moisture already in the circuit.')},cognition='Physical mechanism recognition')
keep('REG-008',C+'(b)(1) and (b)(4)','Select the identity record required for an off-site refrigerant recipient.',{
'A':('Confuses the operator-qualification record with the shipment destination record.','Operator certification records are separately required by (b)(2).','The destination must be identified.'),
'B':('Substitutes detailed vehicle traceability for destination identification.','A shop may maintain quantity and VIN records for service accounting.','These fields do not identify the receiving facility.'),
'C':('Assumes material and date alone satisfy the transfer record requirement.','Those fields can describe a shipment.','The rule expressly calls for the recipient’s name and address.')})
keep('REG-016','EPA Section 608 and Section 609 Overlap, Technician Certification, HCFC-22 bus exception, current page read 2026-11-18','Apply the HCFC-22 bus exception to technician certification.',{
'A':('Classifies by passenger vehicle rather than the specific refrigerant exception.','Ordinary MVAC service falls under Section 609.','EPA explicitly excludes HCFC-22 buses from MVAC and MVAC-like classes.'),
'B':('Treats a self-contained vehicle installation as a small appliance.','Type I covers small appliances.','The cited bus system is classified as high-pressure equipment.'),
'C':('Misclassifies the pressure category for the bus refrigerant.','Type III covers low-pressure appliances.','HCFC-22 bus equipment is covered by Type II.')})
R='Robinair 34788NI/34788NI-H manual SP01972025 VER 01, printed page 3, Safety Precautions'
put('EQP-014','What minimum extension-cord conductor size does Robinair specify for its 34788NI recovery machine?',
['18 AWG','14 AWG','16 AWG','12 AWG'],'B',
'Robinair specifies a minimum conductor size of 14 AWG and the shortest possible cord if an extension is unavoidable. An 18 or 16 AWG conductor is smaller. A 12 AWG conductor is larger, so it is not the minimum specified size. This is that machine’s instruction, not a universal EPA cord specification.',R,
'Identify the manufacturer’s minimum conductor size without confusing AWG numbering.','Removed three-versus-one grounding pattern; all choices are credible cord sizes. Scope explicitly names the actual manufacturer and model.',{
'A':('Selects a light-duty cord commonly available in a shop.','18 AWG may serve smaller electrical loads.','It is below this machine’s specified conductor size.'),
'C':('Assumes the next common cord size is sufficient for short use.','16 AWG is used for other loads.','The manual calls for at least 14 AWG conductor size.'),
'D':('Chooses a heavier conductor but mistakes it for the minimum.','A larger conductor meets the size floor.','The question asks for the specified minimum, not a larger permitted size.')},cognition='Manufacturer instruction recall')
put('EQP-006','Before crimping, which observation verifies full hose insertion into an A/C fitting?',
['Fitting resists being pulled out by hand','Hose reaches the ferrule inspection opening','Hose and fitting have matching nominal sizes','Crimp dies close evenly around the ferrule'],'B',
'Check that the hose is visible at the ferrule’s inspection opening. Friction and matching nominal sizes do not establish insertion depth. Even die closure concerns the crimp operation rather than how far the hose was inserted.',M(36,'Measure Twice, Crimp Once; Practical Matters'),
'Verify insertion depth rather than fit or crimp-tool alignment.','Replaced first-rib and tube/die strawmen with plausible acceptance checks used on the same assembly.',{
'A':('Uses a snug friction fit as proof of full seating.','A reasonably snug fit helps identify gross mismatch.','The fitting can grip before the hose reaches its full insertion depth.'),
'C':('Assumes compatible parts guarantee proper assembly.','Matching dimensions are necessary when choosing parts.','Correct sizes do not demonstrate how far they were inserted.'),
'D':('Uses even tool contact as an assembly acceptance check.','Correct dies and uniform crimp matter during crimping.','Die closure does not verify the hose end’s position.')},cognition='Inspection criterion recognition')
put('EQP-020','Recovery has pulled a service hose below atmospheric pressure. What can a leaking seal introduce?',
['Compressor oil from the recovery reservoir','Refrigerant from the machine’s storage vessel','Moisture released by the vehicle’s desiccant','Ambient air from around the connection'],'D',
'With the hose below atmospheric pressure, an external seal leak can draw ambient air inward. Oil or refrigerant from machine components would require an internal fluid path. Desiccant moisture originates inside the vehicle, not outside the leaking connection.',
'40 CFR part 82 subpart B Appendix C, SAE J2788 section 6.2.1, hose and seal maintenance to prevent excess air entry; MACS printed page 23, evacuation',
'Locate the contamination source at an externally leaking vacuum connection.','Replaced no-flow and equal-flow distractors with actual service-system contaminant sources; stem specifies an external seal path.',{
'A':('Confuses separator or pump oil contamination with an external connection leak.','Oil migration can be an internal equipment-path concern.','The leaking seal opens to ambient air rather than the oil reservoir.'),
'B':('Assumes the machine’s charged vessel supplies the leak.','Refrigerant transfer from a vessel needs the appropriate internal connection.','The described leak is through the hose’s external seal.'),
'C':('Attributes contamination during vacuum to moisture retained by desiccant.','Moisture inside the vehicle affects evacuation.','That source is internal and is not introduced through the leaking external connection.')},cognition='Pressure-path interpretation')
keep('EQP-004','EPA Regulatory Requirements for MVAC System Servicing, Applicability of Unique Fittings to Manifold Gauges and Refrigerant Identifiers, current read 2026-11-18','Apply the permanent fitting rule at the vehicle end of a manifold hose.',{
'A':('Extends the removable gauge-end connection to the vehicle end.','A standardized connection is allowed at the gauge end.','The vehicle-facing refrigerant fitting must remain permanent.'),
'B':('Reverses which hose end must preserve refrigerant identity.','The gauge end may use a standardized connection.','Permanence there alone does not satisfy the vehicle-end requirement.'),
'C':('Uses one hose with swapped adapters for several refrigerants.','Separate correctly fitted hoses can serve their respective refrigerants.','EPA forbids swapping the refrigerant-specific fitting at the vehicle end.')})
put('EQP-002','Which pressure-test medium creates the cited combustion hazard in equipment containing HFC-134a residue?',
['Dry nitrogen','Compressed air','Pure HFC-134a vapor','Pure HFC-134a liquid'],'B',
'Compressed air can form a combustible mixture with HFC-134a at elevated pressure. Nitrogen is not air, and neither pure-refrigerant phase supplies the air component of that warning. This distinction does not authorize an improvised pressure test; use the applicable equipment and vehicle procedure.',R+'; MACS printed page 11, HFC-134a and air under pressure',
'Identify the hazardous pressure-test mixture despite refrigerant’s usual nonflammability.','Narrowed to competing test media rather than unrelated operating states. Wrong alternatives are not proposed universal testing procedures.',{
'A':('Confuses compressed nitrogen used in some procedures with oxygen-containing compressed air.','A prescribed dry-nitrogen procedure may be used where manufacturer instructions permit.','The cited warning concerns air mixed with refrigerant, not nitrogen.'),
'C':('Attributes the mixture warning to refrigerant vapor itself.','Refrigerant vapor is present during ordinary service.','The warning specifies the combination with air under pressure.'),
'D':('Confuses liquid expansion and overpressure with combustion.','Liquid containment and overfill require separate precautions.','Pure liquid does not provide the air component of the cited mixture hazard.')},cognition='Hazard mechanism application')
put('EQP-019','Which cylinder designation identifies a nonrefillable container, even when it is empty and undamaged?',
['DOT-4BA','DOT-4BW','DOT-39','ASME pressure vessel'],'C',
'DOT-39 is the specification for non-reusable, nonrefillable cylinders. Emptying one does not make it a recovery cylinder. DOT-4BA and DOT-4BW are refillable cylinder types discussed for recovery, while qualifying ASME vessels have a separate equipment-standard treatment. Any reusable vessel must also satisfy its applicable condition and use requirements.',
'49 CFR 178.65 heading and (a), specification 39 non-reusable cylinder; MACS printed page 11 refillable types; 40 CFR part 82 subpart B Appendix C 7.3.4 ASME vessels',
'Distinguish a nonrefillable cylinder specification from reusable vessel designations.','Replaced vague approval-versus-dimensions options with real designations. This is basic marking recognition, not advanced judgment.',{
'A':('Confuses a DOT cylinder designation with single-use packaging.','DOT-4BA is a refillable type cited for refrigerant recovery.','It is not the DOT nonrefillable specification.'),
'B':('Mistakes this similar cylinder code for the disposable supply-cylinder code.','DOT-4BW is another cited refillable type.','DOT-39, not DOT-4BW, identifies the nonrefillable class.'),
'D':('Assumes a vessel without a DOT cylinder designation cannot be reused.','Qualifying ASME pressure vessels are recognized in the incorporated equipment standard.','ASME is not a single-use cylinder designation.')},overlap='Distinct from frozen EQP-003 fill-volume limit and EQP-008 ASME retest exemption. Do not add another DOT-39 identification item.',cognition='Foundational marking recognition')
put('SRV-012','During initial A/C inspection, which visible finding most directly suggests a refrigerant leak?',
['Clear water beneath the evaporator drain','Surface frost along the suction line','Oxidation on exposed condenser fins','Oily residue at a line connection'],'D',
'An oily trace at a refrigerant joint can identify a possible leak site for further testing. Water at the drain, frost and external corrosion can have other causes and do not themselves show lubricant escaping through that joint. Visual evidence directs investigation; it does not replace a leak test.',M(18,'initial visual inspection for oil traces'),
'Use a lubricant trace to prioritize a possible refrigerant leak site.','Replaced the pressureless-system item’s remote faults with visible findings relevant to an initial inspection.',{
'A':('Mistakes collected condensate for leaked system fluid.','The evaporator drain removes condensed water.','Water does not identify lubricant carried out through a refrigerant joint.'),
'B':('Interprets a cold surface or frost as direct evidence of a leak.','Frost can accompany cold refrigerant lines and deserves context.','It does not establish an escaping oil trace.'),
'C':('Treats visible deterioration as proof of fluid escape.','Corrosion may justify closer component inspection.','Surface oxidation alone is not a lubricant trace.')},overlap='Replacement does not duplicate SRV-019 full-charge-before-cooling or YF-003 partial-charge purpose.',cognition='Foundational inspection observation')
put('SRV-020','Which lamp characteristic should match the dye when selecting a UV light for refrigerant leak inspection?',
['Beam width','Battery capacity','Housing size','Emission wavelength'],'D',
'The lamp’s wavelength must suit the dye so its particles fluoresce effectively. Beam width affects coverage, battery capacity affects operating duration, and housing size affects access. Those practical factors do not establish the optical match between lamp and dye.',M(21,'Lamps & Goggles, dye particles and lamp wavelength'),
'Match the UV excitation light to the dye rather than selecting on convenience alone.','Replaced repeated compatibility-standard inference with a distinct optical tool-selection objective.',{
'A':('Equates illuminating a larger area with making the dye fluoresce more effectively.','Beam width affects the area inspected.','Coverage does not establish excitation wavelength.'),
'B':('Uses battery capacity as a proxy for a lamp’s suitability for the dye.','Capacity matters for inspection duration.','It does not specify the emitted wavelength.'),
'C':('Prioritizes fitting the lamp into the inspection space.','Housing size affects access.','Physical access does not establish whether the light excites the dye.')},overlap='Original SRV-020 and retained SRV-022 shared the compatibility-versus-performance inference. This replaces SRV-020. Distinct from frozen SRV-021 UV eye protection.',cognition='Foundational tool selection')
keep('SRV-005',M(23,'service gauge location and restrictive service valve cores'),'Interpret why hose vacuum can precede the same vacuum in the vehicle circuit.',{
'B':('Attributes a misleading vacuum reading to elevation rather than a pressure difference along the flow path.','Elevation affects the maximum gauge vacuum.','It does not explain a hose reaching vacuum ahead of the connected system.'),
'C':('Uses water outgassing to explain a delayed evacuation without locating the gauge relative to a restriction.','Moisture affects evacuation time.','The cited local-versus-system reading difference is caused by restricted flow through valve cores.'),
'D':('Attributes the discrepancy to contamination from the pump.','Pump oil condition matters to performance.','The described reading discrepancy follows the service connection restriction, not asserted oil migration.')})
put('SRV-006','Why can a refrigerant leak lack an immediate fluorescent stain despite factory-installed dye?',
['Dye detection requires a rising static pressure','Dye must reach the opening with circulating lubricant','Dye becomes visible after the leaked vapor condenses','Dye needs ultraviolet exposure inside the circuit'],'B',
'Dye travels with lubricant and must reach the leak before leaving a visible stain. Refrigerant escaping as vapor does not guarantee that an oil-borne dye trace has already formed. The UV light reveals the external trace; it does not activate dye inside the circuit. Follow the specified charge and operating procedure before circulation.',M(20,'Dye Formula')+'; '+M(21,'Choosing Your Delivery System and Looking for Leaks'),
'Distinguish vapor escape from the time needed for oil-borne dye to arrive.','Replaced three implausible dye-dosing actions with competing explanations of how a trace forms.',{
'A':('Transfers the pressure requirement of electronic leak testing to the timing of a dye stain.','Adequate refrigerant pressure is needed for vapor leak testing.','Static pressure alone does not bring oil-borne dye to the opening.'),
'C':('Assumes dye travels in escaping vapor and appears when that vapor condenses.','Refrigerant changes phase during normal operation.','The narrative identifies lubricant as the dye carrier and the retained trace as the indicator.'),
'D':('Treats UV light as a chemical activation step before dye can leak.','UV light is used to inspect the escaped trace.','The dye circulates without an inspection lamp illuminating the inside of the circuit.')},cognition='Leak-detection mechanism')
put('SRV-025','Atmospheric pressure is 25 inHg; system absolute pressure is 1 inHg. What vacuum should the gauge indicate?',
['24 inHg','1 inHg','25 inHg','26 inHg'],'A',
'The indicated vacuum is the amount below local atmospheric pressure: 25 minus 1 equals 24 inHg. One inHg is the absolute system pressure, 25 inHg would correspond to zero absolute pressure, and adding the two pressures reverses the relationship. These are hypothetical readings, not a required evacuation endpoint.',M(23,'elevation and maximum vacuum reading')+'; OpenStax College Physics 2e section 11.6, opening definition and equation for gauge versus absolute pressure; original hypothetical readings',
'Convert an absolute pressure into vacuum relative to the local atmosphere.','Replaced remote mass and hose-volume distractors with the actual reference, residual-pressure and sign errors in interpreting a vacuum gauge.',{
'B':('Reports absolute pressure as though it were the vacuum indication.','One inHg is the absolute system pressure supplied in the stem.','The gauge vacuum is the difference below atmosphere.'),
'C':('Uses the local atmospheric pressure as the indicated vacuum without subtracting residual system pressure.','25 inHg would be the local maximum at zero absolute pressure.','One inHg remains in the system.'),
'D':('Adds residual absolute pressure to atmosphere instead of subtracting it.','The sum is an arithmetic result, not a valid vacuum indication for these readings.','Vacuum is the amount below the reference pressure.')},cognition='Measurement calculation')
put('SRV-023','Residual flushing solvent remains mixed with compressor oil. How can this impair lubrication after recharging?',
['By removing oil through the service hoses','By collecting oil in a blocked condenser passage','By diluting the remaining oil','By reducing refrigerant transport of separated oil'],'C',
'Residual solvent can dilute the compressor lubricant even when oil has not been physically removed. Oil carried out during service, trapped by debris, or poorly circulated with refrigerant involves different mechanisms. A prolonged vacuum may not remove all solvent, depending on its properties.',M(22,'residual solvent and inadequate compressor lubrication')+'; '+M(16,'oil removed during recovery')+'; '+M(51,'undercharge and lubricant circulation'),
'Distinguish chemical dilution from loss, trapping and circulation of lubricant.','Replaced clutch and switch distractors with neighboring lubrication-failure mechanisms. No claim that all solvents behave identically.',{
'A':('Confuses lubricant dilution with oil removed by service equipment.','Recovery may remove oil, which is measured and replaced.','The stem identifies solvent remaining mixed with the oil, not oil extraction.'),
'B':('Applies the adjacent debris-blockage concern to the solvent itself.','Debris can obstruct narrow condenser passages.','The stated contamination is solvent mixed in oil, not a solid blockage.'),
'D':('Applies the undercharge/oil-return explanation to a contamination question.','Low refrigerant charge can impair oil circulation.','The described mechanism is residual solvent diluting existing lubricant.')},cognition='Contamination mechanism')
T='Tesla Model 3 2024+ Service Manual, Vehicle HV Disablement Procedure, revision 2026-11-02: warnings and From Ancillary Bay steps 4–9; Compressor Remove and Replace, Remove steps 4–12, revision 2026-08-09'
put('YF-008','Low-voltage power is disconnected before 2024+ Tesla Model 3 compressor repair. Which check establishes high-voltage absence?',
['Current measurement around a high-voltage cable','Voltage measurement across the auxiliary battery','Completion of the refrigerant drain service routine','Voltage measurements at the isolation test points'],'D',
'Tesla’s procedure verifies voltage at the designated isolation test points before high-voltage service. A current reading does not by itself establish absence of voltage. The auxiliary-battery measurement checks meter operation; the drain routine prepares the refrigerant system. Complete the model’s full procedure with its required training, equipment and PPE; these alternatives are not a complete work instruction.',T,
'Distinguish verification of voltage absence from preparatory electrical and refrigerant checks.','Replaced thermostat and blower-fuse strawmen with real checks in the current manufacturer procedure. Model-specific example; no universal test-point or timing claim.',{
'A':('Treats no measured current as proof that a circuit has no voltage.','The RDU isolation method uses a current check before disconnection, followed by voltage verification.','A circuit can have voltage without load current; the procedure also requires voltage checks.'),
'B':('Mistakes the preliminary meter function check for isolation of the high-voltage circuit.','The auxiliary-battery voltage check verifies measurement reliability.','It tests the instrument on the LV battery, not voltage at the HV test points.'),
'C':('Equates completion of a vehicle service-mode routine with electrical isolation.','The compressor procedure uses the drain routine before recovery and disassembly.','The separate HV disablement procedure is still required.')},cognition='Procedure-purpose discrimination')
put('YF-013','Where is the probe placed during the prescribed R-1234yf precharge evaporator leak check?',
['At the center of a floor-duct outlet','At the outside-air intake beneath the windshield','At the center of a dashboard face vent','At the cabin recirculation inlet'],'A',
'The described sequence uses a floor-duct outlet, with floor distribution selected, low blower speed and A/C off. The intake openings are upstream sampling locations, and a dashboard face vent is not the outlet selected by this procedure. Use the equipment instructions for the full check.',M(51,'precharge evaporator detection sequence after vacuum check'),
'Select the specified sampling location in the passenger-air path.','Replaced remote condenser, pulley and service-port locations with plausible HVAC air-path sampling positions.',{
'B':('Samples incoming outside air rather than the evaporator outlet stream.','The outside-air intake supplies incoming ventilation air.','The procedure samples the specified outlet inside the passenger compartment.'),
'C':('Uses the most accessible cabin discharge opening without checking the prescribed distribution mode.','Face vents distribute air in panel mode.','The described sequence sets floor mode and calls for the floor outlet.'),
'D':('Assumes recirculated cabin air is the most concentrated sampling point.','The recirculation inlet draws cabin air into the HVAC system.','The procedure specifies the downstream floor outlet.')},cognition='Procedure location recall')
put('YF-015','After an R-1234yf compressor stops, which change governs when service equipment should be connected?',
['Elapsed waiting time reaches three minutes','Low-side pressure begins rising toward equalization','High-side pressure has decreased','Condenser fan finishes its shutdown cycle'],'C',
'The guidance conditions connection on high-side pressure decreasing. Three minutes is a typical wait, not proof that the pressure has fallen in a particular system. Low-side pressure movement and fan shutdown can accompany stopping but do not replace the stated high-side criterion.',M(43,'specific safety procedure 5'),
'Distinguish the actual pressure condition from timing and shutdown proxies.','Replaced engaged-clutch and cabin-temperature options with plausible technician readiness cues.',{
'A':('Converts a typical three-minute wait into a sufficient condition.','The narrative says pressure decrease usually follows three minutes or more.','Elapsed time alone does not establish the stated pressure decrease.'),
'B':('Uses the first low-side equalization movement as sufficient evidence at the high-side connection.','Low-side pressure can rise during equalization.','The cited condition concerns high-side pressure having decreased.'),
'D':('Uses the end of a cooling-related shutdown event as a pressure indicator.','Fan operation is part of vehicle thermal control.','Its stopping does not establish the specified pressure condition.')},cognition='Condition versus proxy')
put('YF-012','An R-1234yf vacuum check exceeds the permitted decay rate. Which charging stage has not yet been authorized?',
['Refrigerant identification before recovery','Initial recovery of the vehicle’s refrigerant','Evacuation before the vacuum-hold measurement','Introduction of the partial refrigerant test charge'],'D',
'The vacuum check precedes the partial charge used for the pressurized leak check. Excessive decay prevents progressing to that charge; the leak must be located and repaired before retrying. Identification, recovery and initial evacuation belong before this decision point.',M(51,'vacuum-decay failure and partial-charge sequence')+'; '+M(48,'identification before recovery'),
'Locate a failed vacuum check in the charging sequence.','Replaced half-charge and increase-charge strawmen with real service stages. This tests the boundary before adding refrigerant, not a generic safest-action choice.',{
'A':('Confuses the separate identification gate with the later leak-test gate.','Identification is required before the recovery process.','The stem is already at the post-evacuation vacuum check.'),
'B':('Mistakes failed vacuum decay for failure of the initial recovery permission.','Recovery removes the existing refrigerant earlier.','It is the subsequent addition of test refrigerant that the vacuum check controls.'),
'C':('Confuses achieving the starting vacuum with holding that vacuum.','Evacuation establishes the vacuum before decay is monitored.','That earlier step has already occurred in the stated check.')},overlap='Distinct stage from retained YF-014: this asks which addition is gated before a test charge exists; YF-014 asks allowed recovery operations after a pressurized test has failed.',cognition='Sequence interpretation')
put('YF-001','Where must refrigerant compatibility and SAE J2842 compliance be marked on a replacement R-1234yf evaporator?',
['Permanently on the evaporator itself','On the carton carrying the evaporator','In the supplier’s application catalog','On the invoice identifying the part'],'A',
'The evaporator must carry a permanent marking identifying its refrigerant and J2842 design compliance. A carton, catalog or invoice can assist purchasing and traceability but does not replace that component marking. The replacement must be a correct new evaporator.',M(44,'J2842 permanent label, stamp or etching requirement'),
'Verify compliance identification on the replacement component rather than packaging or paperwork.','Replaced salvage, solder and wrong-refrigerant units with credible locations for procurement evidence.',{
'B':('Treats the shipping label as sufficient compliance identification.','Packaging helps identify delivered parts.','It is discarded and is not the required permanent marking on the evaporator.'),
'C':('Relies on catalog fitment instead of inspecting the delivered component.','Catalogs support application selection.','The cited requirement is a permanent marking on the evaporator.'),
'D':('Uses a purchase record as the compliance evidence retained by the shop.','Invoices support traceability.','They do not satisfy the component’s permanent-marking requirement.')},overlap='No frozen full-bank item tests this evaporator marking. YF-005 covers A2L classification.',cognition='Component acceptance evidence')
q=questions['EPA609-YF-016']
put('YF-016','What minimum small-leak capability is specified for a J2913 detector at its most sensitive setting?',
[q['option'+x] for x in 'ABCD'],'D',q['explanation'],M(48,'electronic leak detector minimum capability')+'; '+M(17,'J1627 versus J2791 and J2913 sensitivity'),
'Recognize the J2913 small-leak sensitivity requirement.','Retained credible magnitude alternatives; removed unnamed-manual wording.',{
'A':('Recalls the older detector sensitivity figure.','The narrative assigns 0.5 ounce per year to older J1627 guidance.','J2913 requires detection of the smaller cited leak.'),
'B':('Misplaces a decimal in the 0.15-ounce specification.','This is a larger leak rate, not the specified sensitivity threshold.','The minimum small-leak capability is ten times smaller.'),
'C':('Confuses a relatively large leak with the smallest detectable leak.','A five-ounce annual leak is larger than the minimum capability.','It is not the specified threshold.')},cognition='Foundational sensitivity recall')
put('YF-003','What does the partial R-1234yf charge provide after the system passes its vacuum check?',
['Operating charge for measuring cabin cooling','Refrigerant quantity for calculating total capacity','Positive system pressure for checking evaporator leakage','Circulating oil for checking compressor performance'],'C',
'The partial charge supports the pressurized evaporator leak check before the remainder is delivered. It does not establish a full operating charge, determine the specified total capacity, or authorize compressor-performance testing. The full charge is still taken from the vehicle specification.',M(51,'partial charge and pressurized leak check')+'; '+M(18,'limited leak-test charge versus compressor operation'),
'Identify the purpose of the positive-pressure stage following a vacuum test.','Replaced the claim that it replaces a prior test with neighboring service measurements that require a different charge or operating condition.',{
'A':('Assumes any added refrigerant permits a useful cooling test.','Cooling performance is checked with the specified full charge.','This partial amount is for leak checking.'),
'B':('Assumes measured pressure after a small addition reveals the final required mass.','The vehicle specification establishes charge capacity.','A partial-charge pressure check does not calculate capacity.'),
'D':('Treats a small refrigerant addition as sufficient for operating the compressor and circulating oil.','Compressor evaluation requires the specified charge and operating procedure.','The partial test charge does not establish those operating conditions.')},overlap='Related to YF-012 and YF-014 but tests the positive-pressure test’s purpose, not either failure-stage permission. Keep this close cluster visible for manual review.',cognition='Procedure-purpose knowledge')
put('YF-004','DENSO lists ND-oil 11 and 12 for R-1234yf. Which compressor characteristic distinguishes their intended applications?',
['Refrigerant charge mass','Rated cooling capacity','Displacement per revolution','Electric versus mechanical drive'],'D',
'DENSO assigns ND-oil 11 to electrically driven compressors and ND-oil 12 to mechanical compressors using R-1234yf or R-134a. Refrigerant compatibility alone therefore does not choose between them. Charge mass, cooling capacity and displacement do not replace the manufacturer’s oil specification.',
'DENSO, Don’t overlook compressor oil, reminds DENSO, paragraphs specifying ND-oil 11 and ND-oil 12 applications, current read 2026-11-18; MACS printed page 45, manufacturer lubricant selection',
'Use compressor drive design when applying a manufacturer’s refrigerant-compatible oil choices.','Replaced general authority recognition with a real manufacturer application distinction. No claim that these products cover every manufacturer’s compressor.',{
'A':('Uses the amount of refrigerant as a proxy for the lubricant formulation required.','Charge quantity matters to refrigerant service and lubricant circulation.','The two listed formulations are distinguished here by compressor drive application.'),
'B':('Assumes the higher-duty cooling load determines which listed oil to use.','Capacity describes cooling performance.','The cited application distinction is electrical versus mechanical drive.'),
'C':('Associates compressor size with its oil family.','Displacement is a compressor design parameter.','It does not replace the stated drive-type application or the actual oil specification.')},cognition='Manufacturer application knowledge')
# Tighten optical distractors to properties considered in the actual lamp-selection task.
q=questions['EPA609-SRV-020']; e=evs[q['questionId']]
updates={
 'A':('Beam width','Confuses illuminating a larger inspection area with exciting the dye.','Beam width determines inspection coverage.','Coverage does not establish the wavelength needed by the dye.'),
 'B':('Visible-light brightness','Uses apparent brightness as a proxy for useful ultraviolet excitation.','Brightness affects visibility of the work area.','Visible output does not establish the UV wavelength match.'),
 'C':('Reflector focusing distance','Prioritizes a sharply focused inspection spot over spectral compatibility.','The narrative describes reflectors and lenses directing and filtering light.','Focus determines where light is directed, not its match to the dye.')}
for letter,(text,why,other,excluded) in updates.items():
 q['option'+letter]=text
 o=next(x for x in e['options'] if x['option']==letter)
 o.update(text=text,whyCandidateMightChoose=why,validOtherCondition=other,whyStemExcludes=excluded)
q['explanation']='The lamp’s wavelength must suit the dye so its particles fluoresce effectively. Beam width and reflector focus affect coverage, while apparent visible brightness does not establish the useful ultraviolet output. These factors do not replace the optical match between lamp and dye.'
next(o for o in e['options'] if o['role']=='key')['support']=q['explanation']
assert set(questions)==set(manifest['all40'])
rows=[questions[i] for i in manifest['all40']]
evidence.update(status='Broader 40 diagnostic draft for manual review; no quality gate claim',date='2026-11-18',parentPilotSha256=hashlib.sha256((ROOT/'epa609-pilot-v4/pilot-questions.json').read_bytes()).hexdigest(),items=[evs[i] for i in manifest['all40']],selectionMethod=manifest['method'])
(OUT/'pilot-questions.json').write_text(json.dumps(rows,indent=2,ensure_ascii=False)+'\n')
(OUT/'authoring-evidence.json').write_text(json.dumps(evidence,indent=2,ensure_ascii=False)+'\n')
(OUT/'selection.json').write_bytes((ROOT/'epa609-pilot40-selection.json').read_bytes())
lines=['# Before and after','', 'Fixed preregistered selection: all 14 v4 IDs plus the 26 selected IDs. No resampling. The production bank remains rejected and unchanged.','']
for change in changes:
 ident=change['questionId'];q=questions[ident]
 lines += ['## '+ident,'',change['reason'],'','Before: '+change['before']['question'],'','After: '+q['question'],'']
 if change['overlap']:lines += ['Overlap: '+change['overlap'],'']
lines += ['## Preserved evidence','', 'Production options-only result: 94/100. Pilot v1: 8/14. Pilot v2: 9/14. None passed its quality gate. V3 and v4 received manual revisions, not independent quality approval. No new blind score exists for these forty.','']
(OUT/'before-after.md').write_text('\n'.join(lines))
print('Wrote',len(rows),'items; SHA256',hashlib.sha256((OUT/'pilot-questions.json').read_bytes()).hexdigest())
