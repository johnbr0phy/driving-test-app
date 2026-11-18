from pathlib import Path
import json,copy,hashlib
P=Path(__file__).parent; V=P.parent/'epa609-pilot40-v2'
raw=(V/'pilot-questions.json').read_bytes();assert hashlib.sha256(raw).hexdigest()=='bbf23494a0874bd91e1c6d8d7b3e08d3dba8d1f674fd80390f3e8919fb841549'
qs=json.loads(raw);before=copy.deepcopy(qs);evidence=json.loads((V/'authoring-evidence.json').read_text());es={x['questionId']:x for x in evidence['items']}
changes={}
def put(suffix,stem,opts,explanation,source,objective,reason,errors,overlap=None,cognition='Applied subject knowledge'):
 ident='EPA609-'+suffix;q=next(x for x in qs if x['questionId']==ident)
 q.update(question=stem,explanation=explanation)
 for l,t in zip('ABCD',opts):q['option'+l]=t
 e=es[ident];e.update(objective=objective,discriminatingFact=stem,sourcePassageLocator=source,change=reason,existingBankOverlap=overlap,cognitiveDemand=cognition,options=[])
 for l,t in zip('ABCD',opts):
  o=dict(option=l,text=t,role='key' if l==q['correctAnswer'] else 'distractor',sourcePassageLocator=source)
  if o['role']=='key':o['support']=explanation
  else:
   why,other,excluded=errors[l];o.update(whyCandidateMightChoose=why,validOtherCondition=other,whyStemExcludes=excluded)
  e['options'].append(o)
 changes[ident]=reason
M=lambda p,t:f'MACS January 2025 training narrative, printed page {p}, {t}'
put('SRV-029','Recovery removed 420 g from a 600 g system. After complete recovery and evacuation, what full charge is required?',
 ['420 g','600 g','180 g','1020 g'],
 'Use the vehicle’s specified 600 g full charge after complete recovery and evacuation. The recovered 420 g does not establish the proper charge; the system may previously have been undercharged. The 180 g difference would not refill an emptied system, and adding the recovered amount to the specification would overcharge it. These are hypothetical service quantities.',
 M(24,'critical charge by known weight')+'; '+M(25,'correct vehicle charge specification')+'; '+M(51,'capacity label and full charge'),
 'Distinguish full recharge specification from recovered mass and a top-off difference.',
 'Retired literal revision-code matching. The two quantities have different service meanings, so a correct decision requires understanding that the system has been emptied.',
 {'A':('Returns only the amount recovered, treating it as evidence of the correct original fill.','The recovery measurement records what was removed.','The original quantity need not have been correct; the vehicle specification governs the full recharge.'),
  'C':('Computes the apparent missing amount and treats a full recharge as a top-off.','180 g is the arithmetic difference between the two supplied quantities.','The stem specifies complete recovery and evacuation, so the prior 420 g is no longer in the system.'),
  'D':('Adds the original contents to the specified charge instead of using the specification as the total.','1020 g is the sum of the supplied numbers, not a permitted recharge quantity.','The 600 g specification is the entire charge, not an addition to 420 g.')},
 overlap='Distinct from frozen SRV-003 mass measurement, SRV-004 unit conversion and SRV-030 tolerance; distinct from YF-012 calculation of a temporary partial test dose.')
put('SRV-023','Which solvent property helps determine whether A/C evacuation can remove residue after flushing?',
 ['Flash point','Specific gravity','Boiling point','Freezing point'],
 'The training narrative identifies solvent boiling point as a reason residue may remain even after prolonged evacuation. Evaporation also depends on pressure and temperature; boiling point is not the sole process variable. Flash point concerns ignition, specific gravity concerns relative density, and freezing point concerns solidification rather than the liquid-to-vapor removal process.',
 M(22,'solvent boiling point, prolonged vacuum and residual lubricant dilution'),
 'Identify the fluid property relevant to removing flushing residue under vacuum.',
 'Removed the stem’s explicit solvent/oil mixture and the unrelated oil-loss operations. All alternatives are real fluid properties with different service meanings.',
 {'A':('Confuses volatility during evacuation with a temperature associated with ignition.','Flash point is relevant to handling a flammable cleaning material.','The question concerns removal by vaporization, not ignition.'),
  'B':('Uses liquid heaviness as a proxy for how difficult a residue is to remove.','Specific gravity compares density with a reference material.','Relative density does not define the boiling behavior identified by the source.'),
  'D':('Confuses the temperature of one phase change with another.','Freezing point matters to solidification.','Evacuation removes vapor; the source identifies boiling behavior.')},cognition='Foundational physical property application')
put('EQP-004','Where does EPA permit a standardized connection on a manifold hose used for refrigerant-specific MVAC service?',
 ['At the vehicle’s high-side port','At the vehicle’s low-side port','At the refrigerant-handling machine','At the manifold gauge assembly'],
 'EPA’s manifold-gauge exception allows a standardized fitting at the gauge end. The hose ends that attach to the MVAC or servicing equipment must retain permanent refrigerant-specific fittings. The exception therefore does not extend to either vehicle service port or to the refrigerant-handling machine.',
 'EPA Regulatory Requirements for MVAC System Servicing, Applicability of Unique Fittings to Manifold Gauges and Refrigerant Identifiers, current text read November 18, 2026',
 'Locate the permitted standardized connection rather than treating all hose ends alike.',
 'Replaced conspicuous permanent/interchangeable configurations with four actual connection locations. The question tests the explicit gauge-end exception.',
 {'A':('Assumes a gauge hose can use a standardized interface at either end.','The high-side port is a normal service connection.','The MVAC-facing fitting must remain refrigerant-specific.'),
  'B':('Extends familiar low-side charging-hose interchangeability to the refrigerant-specific interface.','The low-side port is used for service connections.','EPA does not exempt the vehicle’s low-side interface.'),
  'C':('Treats all equipment connections like the manifold gauge connection.','A manifold is service equipment, but EPA expressly distinguishes gauge ends from machine-facing ends.','The machine-facing fitting must retain its refrigerant-specific identity.')},cognition='Regulatory equipment detail')
put('REG-025','Uncertified Nora owns the machine; certified Luis operates it but is not an officer. Who may sign its equipment certification?',
 ['Nora alone','Luis alone','Either Nora or Luis','Neither Nora nor Luis'],
 'Section 82.42(a)(1) permits the equipment owner or another responsible officer to sign the equipment certification. Nora’s ownership supplies that authority; personal technician certification is not the signing criterion. Luis’s operator credential does not itself make him an owner or responsible officer. The signed statement must still truthfully attest that authorized operators are trained and certified.',
 '40 CFR 82.42(a)(1), owner or responsible officer signature and trained/certified operator attestation',
 'Separate equipment-owner signing authority from personal operator certification.',
 'Replaced formal officer versus outsiders with two concrete people whose ownership and operator qualifications differ. The alternative responsible-officer authority remains explicit in the explanation.',
 {'B':('Assigns the shop filing to the only personally certified technician.','Luis’s credential permits qualified operation within its scope.','Certification to operate does not establish the stated signing authority.'),
  'C':('Assumes either ownership or operator certification independently authorizes signing.','An owner or responsible officer can sign.','Luis has neither designated role in the scenario.'),
  'D':('Assumes a signer must hold both ownership and technician certification.','An owner who also operates equipment must satisfy operator qualification requirements.','Nora is authorized to sign as owner; the filing separately covers operator qualifications.')},
 overlap='EQP-022 remains about common ownership of two machines and an extraction establishment. This item is about who attests the shop filing, not permission to move refrigerant off-site.')
put('REG-017','Which completed credential qualifies a technician to recover refrigerant during paid passenger-car MVAC repairs?',
 ['Section 609 technician certification','Section 608 Universal certification','Section 608 Type II certification','ASE A7 Heating and Air Conditioning certification'],
 'Paid MVAC service involving refrigerant requires Section 609 technician certification. Section 608 Universal and Type II credentials cover their respective non-MVAC appliance scopes; they do not replace Section 609 for a passenger car. ASE expressly distinguishes its A7 mechanical-service credential from its separate Section 609 refrigerant program.',
 '40 CFR 82.34(a)(2); EPA Section 608 and Section 609 Overlap, Technician Certification; ASE official A7 test description and Refrigerant Program FAQ, A7 credential distinction',
 'Distinguish completed but different credentials for passenger-car refrigerant service.',
 'Replaced unfinished attendance/enrollment records with real completed credentials. No training provider is named in the stem.',
 {'B':('Reads Universal as covering every refrigerant application, including passenger-car MVAC.','Universal covers all Section 608 appliance types.','Passenger-car MVAC service falls under the separate Section 609 program.'),
  'C':('Applies high-pressure appliance certification based on refrigerant operating pressure.','Type II applies to specified non-MVAC high-pressure equipment and may qualify MVAC-like service.','This stem is a passenger-car MVAC, not MVAC-like equipment or an HCFC-22 bus.'),
  'D':('Treats a completed automotive HVAC trade credential as the statutory refrigerant credential.','A7 is a real completed heating/air-conditioning service certification.','ASE explicitly states A7 does not satisfy the separate Section 609 requirement.')},cognition='Credential applicability')
put('REG-027','A retailer sells CFC-12 in 12-ounce cans and 30-pound cylinders. Which stock triggers the federal retail certification notice?',
 ['Both cans and cylinders','Cylinders but not cans','Cans but not cylinders','Neither cans nor cylinders'],
 'Section 82.42(c) requires the notice for retail sales of suitable class I or II MVAC refrigerant in containers holding less than 20 pounds. The CFC-12 cans meet that condition; the 30-pound cylinders do not trigger this particular sign requirement. Separate sales restrictions can still govern the larger cylinders.',
 '40 CFR 82.42(c), retail public-notification applicability; 82.42(b)(3), separate small-container verification duty',
 'Apply the retail-notice container threshold without confusing it with all refrigerant sales restrictions.',
 'Retired visible-versus-hidden sign placement. Parallel outcomes require applying the actual container threshold to two sizes of the same refrigerant.',
 {'A':('Extends general certification-related sales restrictions to this particular sign requirement for every size.','Other sales restrictions can govern larger containers.','This notice provision expressly uses a less-than-20-pound condition.'),
  'B':('Assumes bulk containers trigger the professional-sales warning while small cans are consumer exceptions.','Certain small substitute-refrigerant cans have a separate DIY exception.','CFC-12 is not covered by that substitute-can exception; this notice applies to the small CFC-12 containers.'),
  'D':('Assumes discontinued virgin production removes current sale-notice duties for remaining stock.','CFC-12 production restrictions are a separate regulatory topic.','The provision still covers these retail sales of small CFC-12 containers.')},
 overlap='Distinct from REG-015 resale-record retention and frozen REG-020 purchaser eligibility: this is applicability of the retail sign, not eligibility to purchase.')
put('YF-001','Which standard identifies design compliance on a replacement R-1234yf evaporator’s permanent refrigerant marking?',
 ['SAE J2842','SAE J639','SAE J2844','SAE J2099'],
 'The evaporator marking identifies its refrigerant and compliance with J2842’s evaporator design requirements. J639 addresses the broader vehicle refrigerant system; J2844 addresses new R-1234yf purity and containers; J2099 addresses recycled refrigerant purity. Their related scopes do not substitute for the evaporator design identification.',
 M(44,'permanent evaporator refrigerant and J2842 marking')+'; SAE official published scope pages for J2842_202606, J639_202011, J2844_201301 and J2099_202608',
 'Distinguish evaporator design compliance from related system and refrigerant standards.',
 'Replaced durable-part versus paperwork cue with actual related SAE scopes. Honest foundational standards recognition, not advanced diagnosis.',
 {'B':('Selects the overarching system safety standard instead of the specific evaporator design standard.','J639 governs broader vehicle refrigerant-system safety and design.','The component marking identifies the evaporator’s J2842 design compliance.'),
  'C':('Confuses the R-1234yf new-refrigerant/container standard with the component standard.','J2844 concerns new refrigerant purity and containers.','An evaporator is not a supply container or a refrigerant purity certification.'),
  'D':('Confuses refrigerant quality with the component’s design certification.','J2099 specifies recycled-refrigerant purity.','That purity scope does not certify evaporator design.')},cognition='Foundational standard scope recognition')
put('REG-026','A paid truck A/C clutch-gap inspection leaves the refrigerant circuit undisturbed. Which refrigerant-handling certification does that inspection require?',
 ['Section 609 certification','Neither Section 609 nor Section 608 certification','Section 608 Type II certification','Both Section 609 and Section 608 certification'],
 'Neither refrigerant-handling credential is required solely for this external inspection. Section 82.34(a) addresses paid service involving refrigerant; Section 82.32(h) ties that definition to reasonably expected refrigerant release. The Cascadia maintenance manual describes an external feeler-gauge clutch-clearance inspection. This does not waive certification for subsequent recovery, charging or circuit opening, and does not address other employment qualifications.',
 '40 CFR 82.32(h) and 82.34(a); Daimler Truck North America Cascadia Maintenance Manual, Preliminary Checks, step 4, topic 0000116542, published November 22, 2024',
 'Apply the refrigerant-service boundary to an external inspection that leaves the circuit undisturbed.',
 'Replaced the conspicuous live-demonstration option with a practical scope decision. Rejected an intermediate test-administration proposal as irrelevant to substantive service learning.',
 {'A':('Applies the usual paid MVAC refrigerant-service credential to any paid A/C work.','Section 609 applies when this highway-truck MVAC service involves refrigerant.','The specified external inspection does not disturb refrigerant or reasonably entail its release.'),
  'C':('Treats a truck as heavy equipment and substitutes the stationary/high-pressure credential.','Type II can qualify certain MVAC-like equipment work.','This external inspection does not trigger either refrigerant-handling credential; a highway-truck cab is not automatically MVAC-like equipment.'),
  'D':('Combines vehicle and high-pressure classifications when uncertain about the service boundary.','Both credentials can be useful to a technician working on separate appliance classes.','Neither is required by these refrigerant-service provisions for this inspection alone.')},overlap='No other frozen item tests external inspection versus service involving refrigerant. REG-001 tests compensation, REG-002 equipment classification and REG-004 equipment availability for top-offs.')
put('EQP-006','Before crimping, which observation verifies full hose insertion into an A/C fitting?',
 ['Fitting resists being pulled out by hand','Hose reaches the ferrule inspection opening','Hose and fitting have matching nominal sizes','Hose end carries an even lubricant film'],
 'For the illustrated hose assembly, visibility at the ferrule inspection opening establishes insertion depth. Fit resistance, correct nominal sizes and lubrication are relevant preparation checks, but none establishes that the hose reached the insertion position. Follow the hose and fitting supplier’s assembly procedure.',
 M(36,'Measure Twice, Crimp Once and Practical Matters'),
 'Distinguish insertion-depth verification from adjacent hose preparation checks.',
 'Removed die closure, which occurred after the stem’s pre-crimp stage. All four observations now concern assembly preparation.',
 {'A':('Treats friction as proof that the hose has bottomed in the fitting.','Resistance can reveal an excessively loose fit.','A partially inserted hose can resist movement.'),
  'C':('Treats dimensional compatibility as proof of completed insertion.','Matching hose and fitting sizes is necessary preparation.','Matching sizes do not show how far this hose has been inserted.'),
  'D':('Treats completion of lubrication as completion of insertion preparation.','The narrative calls for mineral oil at the hose end before inserting the fitting.','Lubrication helps insertion but does not verify depth.')},cognition='Assembly verification')
put('YF-004','DENSO lists ND-oil 11 and 12 for R-1234yf. Which compressor characteristic distinguishes their intended applications?',
 ['Fixed versus variable displacement','Single versus multiple evaporator service','Scroll versus piston construction','Electric versus mechanical drive'],
 'DENSO specifies ND-oil 11 for electrically driven compressors and ND-oil 12 for mechanically driven compressors using R-1234yf or R-134a. Its stated distinction is drive type, not displacement control, evaporator arrangement or pumping construction. Use the actual compressor oil specification rather than selecting oil from refrigerant identity alone.',
 'DENSO, Don’t overlook compressor oil, reminds DENSO, December 17, 2024, paragraphs describing ND-oil 11 and ND-oil 12',
 'Apply the manufacturer’s distinction between two oils sharing refrigerant compatibility.',
 'Replaced three numerical characteristics with real equipment-design distinctions comparable to the keyed drive distinction.',
 {'A':('Associates different lubrication needs with compressor displacement control.','Displacement control matters to compressor operation and diagnosis.','DENSO’s stated distinction between these oils is electric versus mechanical drive.'),
  'B':('Confuses system oil quantity changes associated with evaporator configuration with this oil-type distinction.','System configuration can matter to service quantities.','The cited oil applications distinguish compressor drive type.'),
  'C':('Chooses oil by pumping construction instead of the listed drive application.','Compressor construction is relevant to identifying the actual compressor.','The source does not assign these two oils by scroll versus piston construction.')},cognition='Manufacturer application knowledge')
put('SRV-006','Which test medium can a Robinair 22791 infrared detector sense during an MVAC leak check?',
 ['Dry nitrogen','R-134a refrigerant','Hydrogen-nitrogen forming gas','Helium tracer gas'],
 'The 22791’s specified sensing range includes HFC refrigerants such as R-134a. Nitrogen pressure testing, hydrogen tracing and helium tracing use different measurement methods or detectors. Those methods do not make their gases detectable by this refrigerant infrared instrument. Follow the vehicle’s leak-test procedure; this question does not authorize another gas, pressure or arbitrary test charge.',
 'Robinair 22791 operator manual 550029_EN_0, PDF page 2, Specifications; MACS January 2025 printed page 18, electronic detection in an empty system; Mastercool Nitrogen Pressure Regulators, Product Description; INFICON Forming Gas Charging Kit, AST100FG detector requirement; INFICON Leak Testing in the Automotive Industry, PDF page 2, comparison of pressure-decay, hydrogen and helium methods',
 'Match the detection medium to the actual electronic detector rather than substituting another leak-test method.',
 'Replaced physically implausible dye mechanisms with real neighboring detection methods. No compressed-air distractor is used. This tests sensor compatibility, not permission to pressurize a particular vehicle.',
 {'A':('Carries a familiar pressure-test medium over to electronic refrigerant sensing.','Pressure-decay measurement is a distinct leak-testing method; this is not a vehicle-specific authorization to use nitrogen.','The named infrared refrigerant detector does not measure pressure decay or specify nitrogen as a sensed refrigerant.'),
  'C':('Recognizes an automotive leak-test mixture but overlooks its detector requirement.','INFICON’s kit uses a dedicated forming-gas detector.','This is the 22791 refrigerant infrared detector, not the forming-gas instrument.'),
  'D':('Recognizes an effective tracer gas but assumes all electronic leak detectors detect it.','Helium sniffing uses a helium-sensitive detector, as the INFICON comparison describes.','Helium is not in this instrument’s specified refrigerant sensing range.')},overlap='Retires the original dye-circulation objective. Shares the need to follow actual leak-test instructions with EQP-002, but that item tests compressed-air combustion hazard, not sensor/medium compatibility.')
put('YF-013','During R-1234yf evaporator checking with low blower and floor distribution, where should the detector probe sample?',
 ['Center of a floor-duct outlet','Lower edge of a floor-duct outlet','Cabin floor beneath the outlet','Cabin recirculation inlet'],
 'The staged checking procedure described in the January 2025 training narrative positions the probe at the outlet center, with low blower, floor distribution and A/C off. The lower edge and cabin floor might seem attractive because the vapor is denser than air, but they are not this procedure’s specified sampling position. The recirculation inlet is upstream. Follow the applicable machine instructions; this location is not asserted here as a universal J2843 requirement.',
 M(51,'low-blower floor-distribution evaporator sampling sequence; position at outlet center'),
 'Recall the sampling position within the explicitly described low-blower floor-distribution check.',
 'Removed unspecified prescribed-procedure wording and remote intake/face-vent rivals. Three options now share the floor-outlet setting, so the supplied distribution mode does not identify the key alone.',
 {'B':('Applies the denser-than-air principle to favor the lowest edge instead of the prescribed outlet center.','Vapor density matters when considering accumulation away from forced airflow.','This source’s operating sampling sequence specifies the center.'),
  'C':('Samples a low accumulation location instead of the forced-air outlet.','Low areas can accumulate released vapor, a separate safety consideration.','The operating evaporator check samples the outlet center, not settled cabin vapor.'),
  'D':('Looks for refrigerant in recirculated cabin air instead of the evaporator discharge stream.','The inlet is a real HVAC airflow location.','It is upstream rather than the selected discharge sampling location.')},cognition='Procedure-specific sampling knowledge')
put('YF-014','An R-1234yf test charge reveals a leak requiring circuit opening. Which preparation removes refrigerant before repair?',
 ['Evacuating through the vacuum pump','Closing both manifold hand valves','Waiting until gauge pressure stabilizes','Recovering the remaining test charge'],
 'Recover the test charge with suitable recovery equipment before opening the circuit. A vacuum pump is not a substitute recovery device; closing manifold valves isolates that service path rather than emptying the vehicle, and a stable gauge reading does not establish refrigerant removal. Section 82.32(e)(2) requires extraction before service where discharge is reasonably expected. This is a containment decision, not a claim about every machine’s permitted menu operations.',
 '40 CFR 82.32(e)(2), extraction before service where discharge is reasonably expected; MACS January 2025 printed page 51, recovery after detected leak; Robinair AC1234-6 567817 Rev F, printed pages 29–30, leak checking before full charge',
 'Distinguish refrigerant recovery from evacuation, isolation and pressure observation before opening for repair.',
 'Removed a universal controller-permission claim after discovering different documented machine behavior. All alternatives now concern preparation for the same opening repair.',
 {'A':('Conflates evacuation with recovery because both reduce system pressure.','Vacuum evacuation removes air and moisture after proper refrigerant recovery and repair.','A vacuum pump does not collect the test refrigerant for containment.'),
  'B':('Confuses isolating the manifold path with removing refrigerant from the circuit being opened.','Closing valves can isolate a connected service path.','The test charge remains in the vehicle circuit.'),
  'C':('Treats a settled pressure reading as evidence that the system is ready to open.','Stable pressure can be useful during prescribed observations.','Stability alone establishes neither an empty circuit nor refrigerant containment.')},overlap='Replaces the old machine-menu permission objective. Related to generic recovery-before-opening knowledge; consolidate any future item that tests that same inference rather than counting both.',cognition='Service sequence and containment')
# Source-scope correction without changing the retained question or options.
q=next(x for x in qs if x['questionId']=='EPA609-YF-003')
q['explanation']='In the staged procedure described in the training narrative, the partial charge supplies pressure for evaporator leak checking before the balance is delivered. Robinair AC1234-6 Rev F also describes a partial charge for leak checking. It is not the full operating charge or a way to determine capacity or test compressor performance. Machine behavior following a failed vacuum check varies between these sources; follow the actual machine instructions.'
e=es[q['questionId']];e['sourcePassageLocator']=M(51,'staged partial-charge leak check')+'; Robinair AC1234-6 567817 Rev F, printed pages 29–30'
e['change']='Explanation qualified to the described staged procedure; documented source variation instead of implying identical controller behavior.'
for o in e['options']:
 if o['role']=='key':o['support']=q['explanation']
changes[q['questionId']]=e['change']
# Concise natural wording, retaining required role and service facts.
next(q for q in qs if q['questionId']=='EPA609-SRV-029')['question']='A 600 g system yielded 420 g. After complete recovery and evacuation, what full recharge is required?'
next(q for q in qs if q['questionId']=='EPA609-REG-025')['question']='Owner Nora lacks technician certification; certified operator Luis holds no officer role. Who may sign the equipment certification?'
# Full provenance note is evidence, not an unsupported latest-version assertion.
for ident in ['EPA609-EQP-011','EPA609-YF-006']:
 es[ident]['sourceProvenance']='Honeywell Solstice yf SDS 10617229, product 000000011078, version 3.4, revised March 22, 2024, printed April 17, 2024; manufacturer-authored PDF hosted by Audi at https://www.audi.kkecomm.com/Files/Product%20assets/SDS/R-1234yf.pdf. Exact version read through web retrieval November 18, 2026. Direct local download returned HTTP 403, so no local copy or latest-version claim is made.'
for q in qs:
 if q['questionId'] in changes:es[q['questionId']]['discriminatingFact']=q['question']
assert len(qs)==40 and {q['questionId'] for q in qs}=={q['questionId'] for q in before}
for q,o in zip(qs,before):assert q['correctAnswer']==o['correctAnswer'] and q['correctIndex']==o['correctIndex']
evidence.update(status='Unreviewed v3 repairs; prior 31/40 options failure remains recorded. No quality gate claim.',parentPilotSha256=hashlib.sha256(raw).hexdigest(),changedQuestionIds=list(changes))
evidence['sourceVariation']='MACS January 2025 page 51 describes blocking recharge after vacuum-decay failure. Robinair AC1234-6 567817 Rev F pages 29–30 permits a partial test charge after a failed vacuum test to locate leaks, followed by repair and restarting checks. Do not universalize either controller sequence. The full SAE standard was not accessed; no claim that it universally mandates the floor-probe location.'
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n')
(P/'authoring-evidence.json').write_text(json.dumps(evidence,indent=2,ensure_ascii=False)+'\n')
(P/'before-after.md').write_text('# Exact v3 changes\n\nPreserves the fixed 40-item selection and every key position. Previous versions and production remain untouched. Prior independent result: 31/40 options-only; no pass claimed.\n\n'+''.join('## '+i+'\n\n'+reason+'\n\n' for i,reason in changes.items())+'\nSDS provenance was clarified in evidence for EQP-011 and YF-006 without changing their question rows.\n\n## Source variation\n\n'+evidence['sourceVariation']+'\n')
print('Changed question rows:',len(changes));print('SHA256:',hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest())
