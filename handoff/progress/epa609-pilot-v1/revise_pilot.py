import json
from pathlib import Path
P=Path(__file__).parent
qs=json.loads((P/'pilot-questions.json').read_text()); ev=json.loads((P/'authoring-evidence.json').read_text()); by={e['questionId']:e for e in ev['items']}
def amend(qid,stem,opts,key,exp,rationales,loc):
 q=next(q for q in qs if q['questionId']==qid); q.update(question=stem,correctIndex=key,correctAnswer='ABCD'[key],explanation=exp)
 e=by[qid]; e['discriminatingFact']=stem; e['options']=[]
 for i,text in enumerate(opts):
  q['option'+'ABCD'[i]]=text
  v={'option':'ABCD'[i],'text':text,'role':'key' if i==key else 'distractor','sourcePassageLocator':loc}
  if i==key:v['support']=exp
  else:v.update(zip(['whyCandidateMightChoose','validOtherCondition','whyStemExcludes'],rationales[i]))
  e['options'].append(v)
amend('EPA609-REG-015','Under EPA’s listed transition schedule, which HFC-134a use remains allowed?',[
 'Manufacturing a 2026 light-duty passenger car','Importing a new 2026 light-duty passenger car','Recharging a repaired 2016 light-duty passenger car','Manufacturing a 2028 complete heavy-duty van'],2,
 'The listed restrictions apply to manufacture and import of affected new vehicles. They do not prohibit servicing an existing HFC-134a system. Passenger vehicles are covered from model year 2025; complete heavy-duty vans enter the listed schedule at model year 2028.',{
 0:('Assumes the service allowance extends to initial manufacture.','Existing light-duty cars may be serviced with their original refrigerant.','The option is manufacture of a new affected model.'),
 1:('Treats import as outside a domestic manufacturing restriction.','An existing imported car may receive service.','New imports are expressly included in the table.'),
 3:('Recalls that heavy-duty vans have a later transition date.','The table gives this category a later date than passenger cars.','The offered model year reaches that listed date.')},'EPA servicing, Technology Transitions table, light-duty and complete heavy-duty van rows')
amend('EPA609-REG-028','Unreclaimed salvage MVAC refrigerant is being reused. Which facility must perform the required recycling?',[
 'Facility charging it into the receiving vehicle','Salvage facility that extracted it from the donor','Independent MVAC recycler hired by the seller','Reclamation facility receiving it for purification'],0,
 'For this salvage reuse route, Section 82.34(d)(1)(ii)(B) assigns recycling to the facility that charges or recharges the refrigerant. Recovery at the salvage yard is an earlier step. Off-site reclamation is a separate route; an independent recycler is not substituted for the recharging facility in this provision.',{
 1:('Assumes the original recovering facility must also do the cleaning.','The disposal facility may recover with dedicated approved equipment.','The recycling obligation is assigned to the facility doing the recharge.'),
 2:('Applies an outsourced recycling arrangement to the salvage reuse route.','Off-site recycling has a separate, limited common-ownership provision in 82.32(e)(2).','This salvage provision specifically requires recycling by the recharging facility.'),
 3:('Confuses the two permitted salvage processing routes.','A reclamation facility can process refrigerant under the alternative reclamation route.','The question specifies unreclaimed refrigerant reused through recycling.')},'40 CFR 82.34(d)(1)(i)–(ii); 82.32(e)(2)')
q=next(q for q in qs if q['questionId']=='EPA609-YF-014');q['optionD']='Injecting replacement compressor lubricant';q['explanation']='After a leak is detected during the pressurized check, the described machine permits recovery or re-evacuation. The balance requires passing both checks. Adding the test dose belongs to an earlier stage, and lubricant replacement is not an exception to the lockout.'
e=by[q['questionId']];e['options'][3].update(text=q['optionD'],whyCandidateMightChoose='Treats oil replacement as independent of the failed refrigerant check.',validOtherCondition='Fresh replacement oil is required to replace oil removed during recovery, following the equipment procedure.',whyStemExcludes='The described lockout allows only recovery and re-evacuation.',sourcePassageLocator='MACS January 2025, printed page 16, oil replacement; page 51, lockout paragraph');e['options'][1]['support']=q['explanation']
# Random-looking stored key positions are not a reviewer blinding mechanism; parent will shuffle independently.
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,indent=2,ensure_ascii=False)+'\n')
old={q['questionId']:q for q in json.loads(Path('/Users/johnbrophy/tigertest-next20-epa609/data/epa609-questions.json').read_text())}
(P/'before-after.md').write_text('# EPA 609 pilot: before and after\n\nProduction bank remains frozen and rejected. Raw independent options-only result remains 94/100. This pilot is not approval for expansion. Run build_pilot.py then revise_pilot.py to reproduce.\n\n'+ '\n\n'.join('## '+q['questionId']+'\n\nBefore: '+old[q['questionId']]['question']+'\n\nAfter: '+q['question']+'\n\n'+by[q['questionId']]['change']+'\n\nOverlap: '+(by[q['questionId']]['existingBankOverlap'] or 'No same-decision overlap identified in this pilot.') for q in qs)+'\n')
