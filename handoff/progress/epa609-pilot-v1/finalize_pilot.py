import json,random,hashlib,sys,statistics
from pathlib import Path
P=Path(__file__).parent; qs=json.loads((P/'pilot-questions.json').read_text()); ev=json.loads((P/'authoring-evidence.json').read_text()); es={e['questionId']:e for e in ev['items']}
changes={'EPA609-SRV-031':{'optionA':'Elapsed operating hours'},'EPA609-EQP-011':{'optionA':'Cooling during rapid evaporation'},'EPA609-REG-026':{'optionC':'Performing the procedure on site'},'EPA609-SRV-029':{'optionD':'Instructions packaged with that part'},'EPA609-EQP-022':{'optionD':'Recycling or reclamation'}}
for q in qs:
 for field,value in changes.get(q['questionId'],{}).items():
  q[field]=value;es[q['questionId']]['options']['ABCD'.index(field[-1])]['text']=value
# Independent ordering with a balanced small-sample count; does not alter any option content.
rng=random.Random(6091401); positions=[0]*4+[1]*3+[2]*3+[3]*4;rng.shuffle(positions)
for q,k in zip(qs,positions):
 oldk=q['correctIndex']; order=list(range(4));order.remove(oldk);rng.shuffle(order);order.insert(k,oldk)
 opts=[q['option'+l] for l in 'ABCD']; olde=es[q['questionId']]['options']
 for j,i in enumerate(order):q['option'+'ABCD'[j]]=opts[i]
 q['correctIndex']=k;q['correctAnswer']='ABCD'[k]
 es[q['questionId']]['options']=[dict(olde[i],option='ABCD'[j]) for j,i in enumerate(order)]
(P/'pilot-questions.json').write_text(json.dumps(qs,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(ev,indent=2,ensure_ascii=False)+'\n')
sys.path.insert(0,'/Users/johnbrophy/tigertest-next20-epa609/tools')
from check_option_reuse import analyse
from check_answer_patterns import load_items
items=load_items(str(P/'pilot-questions.json'))
report={'fullPilot':analyse(items),'categories':{c:analyse([it for it in items if it[1]==c]) for c in sorted({it[1] for it in items})},'stemWordCounts':{q['questionId']:len(q['question'].split()) for q in qs},'articleOpeningOptions':sum(q['option'+l].split()[0].lower() in ['a','an','the'] for q in qs for l in 'ABCD'),'pilotSha256':hashlib.sha256((P/'pilot-questions.json').read_bytes()).hexdigest()}
(P/'diagnostics.json').write_text(json.dumps(report,indent=2)+'\n');print(json.dumps(report,indent=2))
