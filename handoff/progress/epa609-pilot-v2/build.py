import json,hashlib,copy,sys
from pathlib import Path
P=Path(__file__).parent;V1=P.parent/'epa609-pilot-v1';src=V1/'pilot-questions.json'
assert hashlib.sha256(src.read_bytes()).hexdigest()=='b4fdc86db179e57f707bb32aedef7bd2bbfcaf25e00df85160e759629cbc91bb'
qs=json.loads(src.read_text());before=copy.deepcopy(qs);ev=json.loads((V1/'authoring-evidence.json').read_text());es={e['questionId']:e for e in ev['items']}
def revise(qid,stem,opts,exp,obj,loc,rats,change,overlap=None):
 q=next(q for q in qs if q['questionId']==qid);k=q['correctIndex'];q.update(question=stem,explanation=exp)
 e=es[qid];e.update(objective=obj,discriminatingFact=stem,sourcePassageLocator=loc,change=change,existingBankOverlap=overlap,options=[])
 for i,t in enumerate(opts):
  q['option'+'ABCD'[i]]=t;o={'option':'ABCD'[i],'text':t,'role':'key' if i==k else 'distractor','sourcePassageLocator':loc}
  if i==k:o['support']=exp
  else:o.update(zip(['whyCandidateMightChoose','validOtherCondition','whyStemExcludes','sourcePassageLocator'],rats[i]))
  e['options'].append(o)
revise('EPA609-EQP-013','Robinair 34788NI filter maintenance accepts the replacement filter code. What must occur before shutdown and removal?',
 ['Reaching the filter capacity limit','Completing vacuum pump oil warming','Clearing refrigerant from the existing filter','Passing the internal pressure leak check'],
 'This model clears the existing filter before prompting shutdown and replacement. The capacity limit triggers maintenance; pump oil service and the leak check follow filter installation. The sequence controls pressurized refrigerant before opening the filter connection and is not a universal procedure for other machines.',
 'Interpret the pressure-clearing step in a named machine’s filter replacement sequence.','Robinair SP01972025 VER 01, printed pages 28–29, Filter Maintenance and Replace the Filter steps 1–2 and 7',{
 0:('Confuses the maintenance trigger with preparation to remove the component.','The capacity limit locks out further use and prompts filter replacement.','Reaching the limit does not clear refrigerant from the filter.','Robinair printed page 28, capacity warning and high-pressure warning'),
 1:('Remembers that filter replacement and pump oil service are linked and reverses their order.','Oil warming begins after installation and power restoration.','The filter has not yet been removed or replaced.','Robinair printed page 29, step 7'),
 3:('Treats a satisfactory leak test as permission to open the existing filter.','A leak check follows replacement and pump maintenance.','The prerequisite to opening is the clearing stage; the later test checks the assembled machine.','Robinair printed page 29, final paragraph; page 32 Leak Check')},
 'Rejected generic unplugged-machine hazard quartet. Substituted a model-specific maintenance sequence; no unsourced residual electrical behavior or generic disassembly instructions.',
 'Compare frozen EQP-005 filter identity/reset. This targets clearing before opening, not filter identity; avoid duplicate maintenance-sequence questions on expansion.')
revise('EPA609-REG-026','An EPA representative questions a certified technician’s recovery technique. Which additional verification can the representative require?',
 ['Supervisor attestation of the technician’s competence','Technician operating the equipment at the shop','Instructor confirmation of the technician’s training','Technician’s records of completed recovery jobs'],
 'Section 82.40(f) permits an authorized EPA representative to require the technician to show proper recovery or recycling at the business premises. A supervisor’s assurance, training confirmation or completed-job records do not replace that operating demonstration when it is required.',
 'Recognize EPA’s authority to verify a certified technician’s actual equipment use rather than rely solely on evidence of prior competence.','40 CFR 82.40(f), contrasted with training and certification provisions 82.40(a)(1), (a)(4)',{
 0:('Assumes the employer can vouch for a certified employee instead of having the individual operate equipment.','An employer’s assessment may be part of workplace training; it is not the demonstration specified in (f).','The regulation permits direct verification of the technician’s own procedure.','40 CFR 82.40(a)(1), (f); assessment use is a proposed evidentiary claim, not a regulatory substitute'),
 2:('Treats completed instruction as conclusive evidence that present technique is proper.','Training is required for certification, and the issuer supplies certification proof.','Existing certification does not remove the separate demonstration authority.','40 CFR 82.40(a)(1), (a)(4), (f)'),
 3:('Treats successful past work records as equivalent to observation of the current procedure.','Records may describe previous work; this option does not assert a federal duty to keep these particular job logs.','The requested additional verification can involve operating the equipment, beyond reviewing records.','40 CFR 82.40(f); job logs are a proposed substitute, not a stated regulatory requirement')},
 'All alternatives now concern evidence of this technician’s competence. No laboratory, product-certification or program-management alternatives remain.')
revise('EPA609-REG-015','An uncertified retailer buys small CFC-12 cans. Which purchaser statement qualifies for the resale exception?',
 ['Resale only; purchaser name and business address','Resale only; purchaser name and telephone number','Resale only; supplier name and business address','Resale or shop use; purchaser name and business address'],
 'Section 82.42(b)(3) requires exclusive resale intent and the purchaser’s name and business address for this exception. A telephone number does not supply the address, the supplier is not the purchaser, and allowing shop use defeats resale-only intent.',
 'Review purchaser statements for three specific resale-exception requirements.','40 CFR 82.42(b)(3), with 82.34(b)',{
 1:('Uses a familiar contact field as a substitute for the required location field.','A telephone number can be additional contact information.','It does not provide the purchaser’s business address.','40 CFR 82.42(b)(3)'),
 2:('Copies the seller’s invoice heading into the purchaser identity fields.','Supplier identification can appear on the invoice but is not the identity required here.','The required name and address identify the purchaser.','40 CFR 82.42(b)(3)'),
 3:('Assumes a mainly resale business can reserve some cans for its own service work under the same exception.','A properly certified purchaser can buy for qualifying service use under the separate rule.','An uncertified buyer cannot rely on exclusive resale intent while declaring shop use.','40 CFR 82.34(b), 82.42(b)(3)')},
 'Removed unrelated compliance records and broad employer-route discussion. Choices are competing statements for the same purchase.',
 'REG-018 and REG-020 cover related purchaser routes; retain only if this statement-review decision remains distinct.')
revise('EPA609-EQP-022','A garage owns its recover-only machine. Which off-site recycler ownership satisfies Section 82.32(e)(2)?',
 ['Ownership by the vehicle’s registered keeper','Ownership by an independently contracted technician','Ownership by the same garage owner-operator','Ownership by the recovery machine’s service company'],
 'The off-site recycling exception requires the same person to own both machines and own or operate the extraction establishment. A vehicle owner, independent technician or service company does not satisfy that relationship merely through ownership of the vehicle, certification or a service contract. Off-site reclamation is a separate route.',
 'Apply the shared equipment ownership condition to off-site recycling.','40 CFR 82.32(e)(2)',{
 0:('Follows ownership of the refrigerant’s source vehicle rather than the two machines.','Vehicle ownership may determine who authorizes a repair.','The exception specifies equipment and establishment ownership, not vehicle title.','40 CFR 82.32(e)(2)'),
 1:('Treats technician certification and a service contract as equivalent to the required ownership relationship.','A certified technician may operate appropriate equipment.','Independent ownership of the second machine fails the same-person condition.','40 CFR 82.32(e)(2), 82.34(a)(2)'),
 3:('Assumes the supplier or equipment service relationship connects the two machines sufficiently.','A service company can maintain equipment under its contract.','A maintenance relationship is not common ownership of the required equipment.','40 CFR 82.32(e)(2)')},
 'Mobile location is no longer scenery. The stated ownership determines whether off-site recycling qualifies.',
 'Duplicates frozen REG-025’s ownership decision. Consolidate into one item; this refinement must not increase objective count.')
revise('EPA609-EQP-011','Liquid refrigerant boils on skin at nearly constant temperature. Which heat transfer accounts for the contact cooling?',
 ['Heat absorbed as the liquid warms','Heat released as vapor condenses','Heat released as the vapor cools','Heat absorbed as the liquid vaporizes'],
 'Vaporization takes energy from the surroundings, including contacted skin, even without a rise in refrigerant temperature. Warming a liquid requires a temperature rise. Condensation and vapor cooling release heat rather than accounting for heat removed from the skin. Rapid liquid evaporation is the frostbite mechanism identified by the refrigerant SDS.',
 'Distinguish phase-change heat absorption from sensible heating and heat release in a liquid-contact exposure.','Honeywell Solstice yf SDS v3.4, section 4 Skin contact; OpenStax College Physics 2e 14.3, opening phase-change narrative',{
 0:('Applies the familiar rule that absorbed heat raises temperature to a boiling liquid.','A liquid absorbs sensible heat when its temperature rises.','The stated refrigerant remains near constant temperature while boiling.','OpenStax 14.3 opening paragraphs contrasting temperature change and phase change'),
 1:('Reverses the phase transition and heat direction when recalling refrigerant heat exchange.','Condensation releases heat.','The observed liquid is boiling; the skin loses rather than receives that phase-change heat.','OpenStax 14.3 opening paragraphs, energy released during condensation'),
 2:('Focuses on cold refrigerant vapor but reverses the direction associated with its own cooling.','A cooling vapor releases sensible heat.','The event is liquid boiling at nearly constant temperature, not vapor losing sensible heat.','OpenStax 14.3 opening contrast with temperature change; Honeywell SDS section 4')},
 'Rejected unrelated exposure hazards. Narrowed to heat-transfer explanations for the same contact event. This remains foundational physical understanding, not a treatment question.')
q=next(q for q in qs if q['questionId']=='EPA609-EQP-024')
q['explanation']=q['explanation'].replace('The 8 mL predates this job; 20 mL counts both jobs,','The 8 mL was already present; 20 mL includes that pre-existing quantity,')
e=es[q['questionId']];e['change']='Explanation only: removed the unsupported assumption that the initial oil came from another job.'
for o in e['options']:
 if o['role']=='key':o['support']=q['explanation']
# Retain row and key ordering. No score-directed reordering.
changed=[a['questionId'] for a,b in zip(qs,before) if a!=b]
assert set(changed)=={'EPA609-REG-026','EPA609-EQP-013','EPA609-REG-015','EPA609-EQP-011','EPA609-EQP-022','EPA609-EQP-024'}
assert all(a['correctAnswer']==b['correctAnswer'] and a['correctIndex']==b['correctIndex'] for a,b in zip(qs,before))
ev.update(status='V2 draft; v1 independent review 8/14 options and 14/14 keys did not pass',date='2026-11-18',parentPilotSha256=hashlib.sha256(src.read_bytes()).hexdigest())
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,indent=2,ensure_ascii=False)+'\n')
(P/'before-after.md').write_text('# Pilot v2 changes\n\nV1 is preserved. Only five items were revised and one explanation corrected; eight complete rows and every answer position remain unchanged.\n\n'+ '\n\n'.join('## '+q['questionId']+'\n\nBefore: '+b['question']+'\n\n'+ '\n'.join(l+'. '+b['option'+l] for l in 'ABCD')+'\n\nAfter: '+q['question']+'\n\n'+ '\n'.join(l+'. '+q['option'+l] for l in 'ABCD')+'\n\n'+es[q['questionId']]['change'] for q,b in zip(qs,before) if q!=b)+'\n')
sys.path.insert(0,'/Users/johnbrophy/tigertest-next20-epa609/tools')
from check_option_reuse import analyse
from check_answer_patterns import load_items
items=load_items(str(P/'pilot-questions.json'));report={'changedIds':changed,'eightRowsUnchanged':True,'allKeyPositionsUnchanged':True,'fullPilot':analyse(items),'categories':{c:analyse([it for it in items if it[1]==c]) for c in sorted({it[1] for it in items})},'pilotSha256':hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest()}
(P/'diagnostics.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
