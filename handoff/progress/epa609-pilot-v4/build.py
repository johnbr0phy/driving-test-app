from pathlib import Path
import json,copy,hashlib,sys
P=Path(__file__).parent; V3=P.parent/'epa609-pilot-v3'; src=V3/'pilot-questions.json'
assert hashlib.sha256(src.read_bytes()).hexdigest()=='7e87c63aa88b6344193070dda77738a22564dc8d176d64cf1be00d30c5f885c5'
qs=json.loads(src.read_text());before=copy.deepcopy(qs);ev=json.loads((V3/'authoring-evidence.json').read_text());es={x['questionId']:x for x in ev['items']}
q=next(q for q in qs if q['questionId']=='EPA609-REG-004')
q['question']='Which listed operation does not require recovery or recycling equipment to be available under federal MVAC rules?'
q['explanation']='Facilities that only charge MVAC-like appliances need not purchase recovery/recycling equipment for that work; technician certification still applies. Opening an MVAC-like system instead requires approved equipment to be available at the business, without necessarily owning it. Passenger-car top-offs require equipment purchase, and passenger-car circuit repair requires approved equipment use.'
e=es[q['questionId']];e.update(discriminatingFact=q['question'],objective='Distinguish equipment availability obligations from equipment ownership when applying the MVAC-like limited-charging exception.',change='Replaced broad equipment-exception wording with the precise question of equipment availability. Explanation distinguishes purchase, availability and proper use.',sourcePassageLocator='40 CFR 82.32(e)(4)–(5); 82.34(a)')
for o in e['options']:
 if o['role']=='key':o['support']=q['explanation']
 else:
  o['sourcePassageLocator']='40 CFR 82.32(e)(4)–(5); 82.34(a)'
  if o['option']=='A':o.update(whyCandidateMightChoose='Equates not having to own equipment with not having to make equipment available.',validOtherCondition='The business may satisfy availability without purchasing its own equipment.',whyStemExcludes='Opening MVAC-like appliances requires approved recovery or recycling equipment to be available at the business.')
  elif o['option']=='B':o.update(whyCandidateMightChoose='Extends the limited-charging exception to passenger-car systems.',validOtherCondition='Facilities limited to charging MVAC-like systems receive the exception.',whyStemExcludes='For passenger-car MVACs, the rule expressly retains the equipment-purchase obligation.')
  elif o['option']=='C':o.update(whyCandidateMightChoose='Treats certification as enough to open a passenger-car circuit.',validOtherCondition='Certification is required but does not replace equipment requirements.',whyStemExcludes='Circuit service must properly use approved equipment; it cannot proceed without equipment available.')
q=next(q for q in qs if q['questionId']=='EPA609-REG-015')
q.update(question='A seller obtains a resale declaration for small CFC-12 cans on May 10, 2026. What is its minimum retention endpoint?',optionA='May 10, 2029',optionB='December 31, 2028',optionC='May 10, 2028',optionD='May 10, 2031',explanation='The seller must retain the resale declaration for three years under Section 82.42(b)(3). Three full years from May 10, 2026 reaches May 10, 2029. Counting the calendar year of receipt as a complete year ends too early. Two years is insufficient; five years exceeds the minimum.')
e=es[q['questionId']];e.update(objective='Apply the three-year resale-declaration retention duty to a receipt date.',discriminatingFact=q['question'],sourcePassageLocator='40 CFR 82.42(b)(3), final sentence; (b)(4)',change='Retired declaration-correction objective after repeated reading-only and component-convergence defects. Replaced with the distinct statutory retention duty and a straightforward date application.',existingBankOverlap='Full frozen bank checked. REG-008 asks destination identity and mentions three-year retention in its explanation; it does not ask the retention decision. Avoid adding another retention question. The incidental explanation mention is not claimed as an additional objective.',options=[])
rats={1:('Counts 2026, 2027 and 2028 as three calendar years without allowing three full elapsed years.','A calendar-year accounting period could end December 31, but this regulation specifies a three-year retention period.','The December date is less than three full years after receipt.'),2:('Uses a two-year retention assumption or stops one anniversary early.','Two elapsed years would end on this date, but it is not the period required here.','The required period is three years.'),3:('Uses a conservative five-year retention assumption instead of the statutory minimum.','The seller may retain the record longer voluntarily.','The question asks for the minimum endpoint, not any permissible longer period.')}
for i,l in enumerate('ABCD'):
 o={'option':l,'text':q['option'+l],'role':'key' if i==0 else 'distractor','sourcePassageLocator':'40 CFR 82.42(b)(3), final sentence; date arithmetic from hypothetical receipt date'}
 if i==0:o['support']=q['explanation']
 else:o.update(zip(['whyCandidateMightChoose','validOtherCondition','whyStemExcludes'],rats[i]))
 e['options'].append(o)
changed=[q['questionId'] for q,b in zip(qs,before) if q!=b];assert set(changed)=={'EPA609-REG-004','EPA609-REG-015'}
assert all(q['correctAnswer']==b['correctAnswer'] and q['correctIndex']==b['correctIndex'] for q,b in zip(qs,before))
ev.update(status='V4 two-item repair draft; no gate approval',parentPilotSha256=hashlib.sha256(src.read_bytes()).hexdigest())
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,indent=2,ensure_ascii=False)+'\n')
(P/'before-after.md').write_text('# V4 changes\n\nExactly REG-004 and REG-015 change. Twelve rows and all answer positions are unchanged.\n\n'+ '\n\n'.join('## '+q['questionId']+'\n\nBefore: '+b['question']+'\n\nAfter: '+q['question']+'\n\n'+ '\n'.join(l+'. '+q['option'+l] for l in 'ABCD')+'\n\n'+es[q['questionId']]['change'] for q,b in zip(qs,before) if q!=b)+'\n')
sys.path.insert(0,'/Users/johnbrophy/tigertest-next20-epa609/tools')
from check_option_reuse import analyse
from check_answer_patterns import load_items
items=load_items(str(P/'pilot-questions.json'));report={'changedIds':changed,'twelveRowsUnchanged':True,'allKeyPositionsUnchanged':True,'fullPilot':analyse(items),'categories':{c:analyse([i for i in items if i[1]==c]) for c in sorted({i[1] for i in items})},'stemWordCounts':{q['questionId']:len(q['question'].split()) for q in qs},'pilotSha256':hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest()};(P/'diagnostics.json').write_text(json.dumps(report,indent=2)+'\n');print(report['pilotSha256'])
