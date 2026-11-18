from pathlib import Path
import json,hashlib,copy
P=Path(__file__).parent;V=P.parent/'epa609-pilot40-v3'
raw=(V/'pilot-questions.json').read_bytes();assert hashlib.sha256(raw).hexdigest()=='bb6807e6dcb3f7fdf3ceec72c7555f1791f5cb6a19b8da53b1c50cdbdf3043f1'
qs=json.loads(raw);prior=copy.deepcopy(qs);ev=json.loads((V/'authoring-evidence.json').read_text());by={q['questionId']:q for q in qs};es={e['questionId']:e for e in ev['items']}
changes={}
q=by['EPA609-SRV-006']
q.update(question='A Robinair 22791 alarms at high sensitivity near a fitting. Which probe technique should confirm the suspected leak?',optionA='Hold the tip against the joint until the reading stabilizes',optionB='Sweep around the joint while maintaining a small surface gap',optionC='Hold the tip above the joint until the reading peaks',optionD='Sweep around the joint while brushing its surface with the tip',explanation='Robinair’s confirmation procedure uses a moving probe with clearance from the fitting, especially after an apparent leak at high sensitivity. Stationary or contact sampling should be rechecked using that technique. The detector responds to changes in concentration; waiting for a stationary reading to peak or stabilize does not substitute for the prescribed retest. This is the named instrument’s procedure, not a universal specification for every detector.')
e=es[q['questionId']];source='Robinair 22791 operator manual 550029, Rev F, May 20, 2013; PDF page 5, Leak Detection Procedure 2, concentration changes; PDF page 6, steps E–F, moving-probe confirmation with clearance following high-sensitivity indications. Official manufacturer-hosted PDF read November 18, 2026: https://www.robinair.com/sites/default/files/documents/550029_EN_0.pdf'
e.update(objective='Confirm an apparent leak using the specified probe motion and clearance.',discriminatingFact=q['question'],sourcePassageLocator=source,cognitiveDemand='Practical detector technique',existingBankOverlap='No duplicate motion/contact confirmation objective. Frozen SRV-032 tests foil accumulation; YF-013 tests sampling location; YF-016 tests sensitivity threshold.',options=[])
reasons={'A':('Confuses stable contact readings with confirmation.','None claimed for this retest.','Contact sampling requires the moving-clearance recheck.'),'C':('Seeks a stationary peak instead of tracking concentration changes.','None claimed for this retest.','The specified confirmation uses movement.'),'D':('Recognizes movement but treats surface contact as closer, better sampling.','None claimed for this retest.','Confirmation requires clearance rather than brushing contact.')}
for l in 'ABCD':
 o={'option':l,'text':q['option'+l],'role':'key' if l=='B' else 'distractor','sourcePassageLocator':source}
 if l=='B':o['support']=q['explanation']
 else:o.update(zip(['whyCandidateMightChoose','validOtherCondition','whyStemExcludes'],reasons[l]))
 e['options'].append(o)
changes[q['questionId']]='Retired lone-refrigerant media recognition. All alternatives now address the same confirmation task through plausible motion, contact and stable-reading confusions. Manufacturer/model scopes the procedure rather than serving as the tested fact.'
q=by['EPA609-REG-025'];q['question']=q['question'].replace('Owner Nora','Equipment owner Nora');changes[q['questionId']]='Restored equipment ownership as the explicit legal signing criterion.'
q=by['EPA609-EQP-006'];q['explanation']=q['explanation'].replace('For the illustrated hose assembly,','For a fitting with this inspection opening,');changes[q['questionId']]='Removed reference to a nonexistent illustration.'
q=by['EPA609-YF-013'];q['question']='During staged R-1234yf precharging, with A/C off and low blower in floor mode, where should the probe sample?';changes[q['questionId']]='Added the staged precharge and A/C-off conditions while preserving nearby sampling-location alternatives and the narrative-specific scope.'
q=by['EPA609-YF-014'];q['question']='An R-1234yf test charge reveals a leak requiring circuit opening. Which action should precede opening the circuit?';changes[q['questionId']]='Asked the next service action rather than defining refrigerant removal; existing recovery-versus-evacuation alternatives and source scope remain.'
for ident,reason in changes.items():
 q=by[ident];e=es[ident];e['change']=reason;e['discriminatingFact']=q['question']
 for o in e['options']:
  if o['role']=='key':o['support']=q['explanation']
assert len(qs)==40 and all(q['correctAnswer']==o['correctAnswer'] and q['correctIndex']==o['correctIndex'] for q,o in zip(qs,prior))
assert {q['questionId'] for q,o in zip(qs,prior) if q!=o}==set(changes)
ev.update(parentPilotSha256=hashlib.sha256(raw).hexdigest(),changedQuestionIds=list(changes),status='V4 minimal repairs pending review. Previous 31/40 options-only result preserved; no new blind score or gate claim.')
(P/'pilot-questions.json').write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,ensure_ascii=False,indent=2)+'\n')
(P/'before-after.md').write_text('# V4 exact changes\n\nFive rows changed; all 40 selected IDs and all key positions remain fixed. V3 and all earlier versions remain untouched.\n\n'+''.join('## '+i+'\n\n'+r+'\n\n' for i,r in changes.items())+'The prior informed changed-item review found eight earlier high/medium issues resolved and identified the remaining detector-media cue. That review was not a new blinded score. This revision makes no options-only improvement claim.\n')
print(hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest())
