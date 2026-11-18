from pathlib import Path
import json,copy,hashlib
P=Path(__file__).parent;V1=P.parent/'epa609-pilot40-v1'
raw=(V1/'pilot-questions.json').read_bytes()
assert hashlib.sha256(raw).hexdigest()=='3652985c5e3f6b642a748bb9d0bc0524425355a15c4fb9643ce2cae3a793c914'
qs=json.loads(raw);before=copy.deepcopy(qs);evidence=json.loads((V1/'authoring-evidence.json').read_text());es={e['questionId']:e for e in evidence['items']}
def change(ident,stem,options,explanation,source,objective,why,errors):
 q=next(q for q in qs if q['questionId']==ident);q.update(question=stem,explanation=explanation)
 for l,t in zip('ABCD',options):q['option'+l]=t
 e=es[ident];e.update(objective=objective,discriminatingFact=stem,sourcePassageLocator=source,change=why,cognitiveDemand='Manufacturer maintenance criterion' if ident.endswith('031') else 'Pure application of supplied charge fraction',existingBankOverlap='Full frozen bank checked: no other pump fill-level item.' if ident.endswith('031') else 'Replaces the vacuum-failure permission objective. YF-003 tests test-charge purpose; YF-014 tests permitted operations after leakage. No other frozen item asks the initial test-charge fraction or computes its mass.',options=[])
 for l,t in zip('ABCD',options):
  o=dict(option=l,text=t,role='key' if l==q['correctAnswer'] else 'distractor',sourcePassageLocator=source)
  if o['role']=='key':o['support']=explanation
  else:
   a,b,c=errors[l];o.update(whyCandidateMightChoose=a,validOtherCondition=b,whyStemExcludes=c)
  e['options'].append(o)
change('EPA609-SRV-031','On a level Robinair 34788NI, which sight-glass level is specified after refilling the vacuum pump?',
 ['Oil just visible at the bottom','Oil at the center of the glass','Oil at the upper edge of the glass','Oil filling the entire visible glass'],
 'Robinair specifies filling the vacuum pump to the center of its sight glass, with the machine on a flat, level surface. Merely seeing oil at the bottom does not meet that level. The upper edge or a completely filled glass exceeds the stated level. Follow this model’s oil-change procedure rather than treating visibility alone as adequate.',
 'Robinair SP01972025 VER 01, printed page 31 (PDF page 33), Change Vacuum Pump Oil step 5 and level-surface note',
 'Recognize the actual pump refill acceptance level for a named machine.',
 'Retired runtime tautology. Replacement uses a real manufacturer maintenance criterion with four competing observable fill levels; this is foundational maintenance recall, not advanced interpretation.',
 {'A':('Treats any visible oil as enough after draining.','It confirms oil has reached the bottom of the visible range.','The specified endpoint is at the center, not merely visible.'),
  'C':('Treats the upper sight-glass boundary as a maximum-fill target.','An upper mark can be meaningful on other oil-level systems, but no such permission is asserted here.','This model expressly specifies the center.'),
  'D':('Fills until the viewing window contains oil throughout, assuming a full glass means a full pump.','A fully oil-covered window is an observable state, not an authorized endpoint in this procedure.','It is above the specified midpoint.')})
change('EPA609-YF-012','A machine specifies a 15% test charge. For a 600 g R-1234yf system, how much is delivered?',
 ['60 g','120 g','510 g','90 g'],
 'For the stated machine procedure, the initial test dose is 15% of the specified charge: 600 g × 0.15 = 90 g. Sixty grams is 10%, and 120 g is 20%. The 510 g amount is the remaining 85%, delivered only after the prescribed checks pass. The fraction is supplied as a procedure condition, not asserted as a universal EPA requirement. The 600 g specification is hypothetical.',
 'MACS January 2025 certification training narrative, printed page 51 (PDF page 57), paragraph specifying 15% of the SAE J639 vehicle-label charge before the five-minute pressurized check; original hypothetical 600 g specification',
 'Calculate the initial pressurized leak-check dose from the specified total charge.',
 'Retired charging-versus-noncharging partition and duplicate failure-gate objective. The percentage is explicitly supplied as this machine’s procedure condition; this is pure application, not recall of a universal percentage. All alternatives are competing dose calculations for the same hypothetical system.',
 {'A':('Remembers a small test dose as one tenth of the total.','60 g equals 10% of this hypothetical specification; it is not the fraction stated by the source.','The required initial fraction is 15%.'),
  'B':('Rounds or misremembers the test fraction as one fifth.','120 g equals 20% of this hypothetical specification.','The source specifies 15%, not 20%.'),
  'C':('Confuses the remaining charge with the amount introduced for testing.','510 g is the balance after a 90 g initial dose if the checks pass.','The stem asks for the initial test charge, not its later remainder.')})
changed=[a['questionId'] for a,b in zip(qs,before) if a!=b]
assert changed==['EPA609-SRV-031','EPA609-YF-012']
assert all(a['correctAnswer']==b['correctAnswer'] and a['correctIndex']==b['correctIndex'] for a,b in zip(qs,before))
evidence.update(status='Broader 40 v2: two structural repairs for manual review; no quality approval',parentPilotSha256=hashlib.sha256(raw).hexdigest())
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n')
(P/'authoring-evidence.json').write_text(json.dumps(evidence,indent=2,ensure_ascii=False)+'\n')
(P/'selection.json').write_bytes((V1/'selection.json').read_bytes())
(P/'before-after.md').write_text('# Two structural repairs\n\nThirty-eight rows and all answer positions remain unchanged. The fixed forty selection is preserved.\n\n'+'\n\n'.join('## '+a['questionId']+'\n\nBefore: '+b['question']+'\n\nAfter: '+a['question']+'\n\n'+es[a['questionId']]['change'] for a,b in zip(qs,before) if a!=b)+'\n\nNo numeric threshold was adjusted. The charge calculation applies a real 15% procedure to original hypothetical data; it is not a claim about a real vehicle. Historical options-only results remain 94/100, 8/14 and 9/14. No fresh blind score exists.\n')
print(hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest())
