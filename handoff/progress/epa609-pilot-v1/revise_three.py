import json,hashlib,copy,sys
from pathlib import Path
P=Path(__file__).parent
qs=json.loads((P/'pilot-questions.json').read_text());before=copy.deepcopy(qs)
ev=json.loads((P/'authoring-evidence.json').read_text()); es={e['questionId']:e for e in ev['items']}
if not (P/'pilot-before-three-revisions.json').exists():(P/'pilot-before-three-revisions.json').write_text(json.dumps(before,indent=2,ensure_ascii=False)+'\n')
def revise(qid,stem,opts,exp,obj,loc,rats,change,overlap=None):
 q=next(q for q in qs if q['questionId']==qid);k=q['correctIndex'];q.update(question=stem,explanation=exp)
 e=es[qid];e.update(objective=obj,discriminatingFact=stem,sourcePassageLocator=loc,change=change,existingBankOverlap=overlap,options=[])
 for i,t in enumerate(opts):
  q['option'+'ABCD'[i]]=t
  o={'option':'ABCD'[i],'text':t,'role':'key' if i==k else 'distractor','sourcePassageLocator':loc}
  if i==k:o['support']=exp
  else:
   o.update(zip(['whyCandidateMightChoose','validOtherCondition','whyStemExcludes','sourcePassageLocator'],rats[i]))
  e['options'].append(o)
revise('EPA609-SRV-026','An A/C circuit remained uncapped throughout prolonged collision repairs. Which measure best addresses the resulting moisture problem?',
 ['Replace the system desiccant','Extend the evacuation period','Change the vacuum pump oil','Recycle the recovered refrigerant'],
 'Prolonged atmospheric exposure can saturate system desiccant, so MACS recommends replacing it. Evacuation removes air and vapor but does not reliably resolve this moisture condition. Pump oil service maintains pump performance; recycling cleans recovered refrigerant outside the vehicle, not saturated desiccant remaining inside it.',
 'Choose the moisture-control intervention for prolonged atmospheric exposure.','MACS January 2025, printed pages 23–24, evacuation and Desiccant Failure',{
 1:('Extrapolates the role of evacuation in moisture removal to saturated desiccant.','Adequate evacuation is needed before recharging and may require time for the entire circuit to reach deep vacuum.','Page 24 specifically warns that even good evacuation may not remove this moisture and recommends desiccant replacement.','MACS January 2025, printed pages 23–24, evacuation discussion'),
 2:('Attributes poor moisture removal to degraded vacuum-pump performance.','Pump oil changes maintain evacuation performance at the manufacturer’s interval.','The stated cause is prolonged vehicle-circuit exposure, not overdue pump maintenance.','MACS January 2025, printed page 23, vacuum pump maintenance'),
 3:('Assumes cleaning the recovered fluid also restores the vehicle’s moisture-control component.','Recovered refrigerant must be properly processed before reuse.','External refrigerant processing does not replace saturated desiccant inside the exposed circuit.','40 CFR 82.32(e)(1); MACS January 2025, printed page 24')},
 'Moved the exposure condition into the stem; alternatives are actual, distinct contamination-control procedures.')
revise('EPA609-SRV-029','An installed condenser requires a revised charge; existing service data describe the original assembly. Which reference controls?',
 ['Factory underhood label','Replacement component instructions','Vehicle workshop manual','Earlier service bulletin'],
 'The installed condenser’s instructions supply its revised charge specification. MACS describes replacement condensers that require a changed charge and a new label. Here, the other references describe the original assembly; they may govern that configuration but do not supply this replacement’s revision.',
 'Select charge information that applies to the installed component rather than the original assembly.','MACS January 2025, printed page 25, revised charge specifications and replacement condenser paragraph',{
 0:('Treats the permanent vehicle label as controlling after a component changes capacity.','The factory label supplies the original configuration’s charge unless revised.','The stem explicitly says the installed condenser requires a revision.','MACS January 2025, printed page 25, replacement label discussion'),
 2:('Gives the general vehicle service reference priority over part-specific instructions.','A workshop specification can govern the configuration it describes.','The hypothetical stem establishes that existing service data describe the original assembly.','MACS January 2025, printed page 25, component changes and revised service information; hypothetical reference applicability supplied by stem'),
 3:('Knows that bulletins can supersede factory labels and assumes that precedence resolves this conflict.','An applicable bulletin can revise the original specification.','The stem states the existing data concern the original assembly, not the newly installed condenser.','MACS January 2025, printed page 25, service bulletin and component-specific instruction paragraphs')},
 'Removed wrong-configuration labels from alternatives. Stem establishes why original-assembly references no longer supply the installed component’s charge.')
revise('EPA609-REG-015','A retailer without certified technicians buys small CFC-12 cans for resale. Which statement supports the sales exception?',
 ['Resale-only intent, purchaser name and business address','Employee certification, technician name and certification number','Equipment acquisition, machine model and serial number','Refrigerant shipment, recipient name and facility address'],
 'For the resale-only exception covering CFC-12 containers under 20 pounds, the seller obtains a written statement of resale intent with the purchaser’s name and business address. Employee certification can support a different purchase route. Equipment and refrigerant-shipment records document other compliance duties.',
 'Select the documentary basis for the resale-only exception when the buyer has no certified technicians.','40 CFR 82.34(b), 82.42(b)(3); EPA servicing, Ozone-Depleting Refrigerants: Sales Restrictions & Recordkeeping Requirements',{
 1:('Applies the employer purchase route despite the retailer’s stated staffing.','An employer can establish a certified technician’s employment and certification for the applicable purchase route.','The stem specifies no certified technicians and purchase for resale.','EPA Refrigerant Sales Restriction, employer authorized representative documentation; 40 CFR 82.154(c)(1)'),
 2:('Confuses a shop’s equipment declaration with authorization to buy restricted cans.','Equipment-acquisition statements identify the machine and certify proper use.','The retailer relies on resale intent, not service equipment ownership.','40 CFR 82.42(a)(1)(iii), compared with 82.42(b)(3)'),
 3:('Chooses another required name-and-address record associated with refrigerant transfers.','A covered recovery-equipment owner records facilities receiving recovered refrigerant.','This transaction is purchase of unopened small cans for resale, not an off-site recovered-refrigerant shipment.','40 CFR 82.42(b)(1), compared with 82.42(b)(3)')},
 'Rejected generic allowed-use question. Substituted a conditional documentary decision with competing real records.',
 'Adjacent to REG-018 employer purchase proof and REG-020 small-CFC-12 service purchases. This adds resale-purpose documentation, not another certificate-identification item; review the cluster before expansion.')
changed=[a['questionId'] for a,b in zip(qs,before) if a!=b]
assert set(changed)=={'EPA609-SRV-026','EPA609-SRV-029','EPA609-REG-015'},changed
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,indent=2,ensure_ascii=False)+'\n')
sys.path.insert(0,'/Users/johnbrophy/tigertest-next20-epa609/tools')
from check_option_reuse import analyse
from check_answer_patterns import load_items
items=load_items(str(P/'pilot-questions.json'));r={'changedIds':changed,'otherElevenUnchanged':True,'fullPilot':analyse(items),'categories':{c:analyse([it for it in items if it[1]==c]) for c in sorted({it[1] for it in items})},'stemWordCounts':{q['questionId']:len(q['question'].split()) for q in qs},'pilotSha256':hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest()};(P/'diagnostics.json').write_text(json.dumps(r,indent=2)+'\n');print(json.dumps(r,indent=2))
(P/'three-item-revisions.md').write_text('# Three revisions after parent review\n\nOnly SRV-026, SRV-029 and REG-015 changed. The other eleven rows and their answer positions are unchanged. Previous pilot preserved in pilot-before-three-revisions.json.\n\n'+ '\n\n'.join('## '+q['questionId']+'\n\n'+q['question']+'\n\n'+es[q['questionId']]['change'] for q in qs if q['questionId'] in changed)+'\n\nRun revise_three.py after the earlier reproduction sequence, once. New evidence replaces the old three entries. Earlier before-after.md and self-review.md describe the prior handoff; this document supersedes their descriptions of these three items.\n')
