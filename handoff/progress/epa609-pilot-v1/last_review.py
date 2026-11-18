import json
from pathlib import Path
P=Path(__file__).parent;q=json.loads((P/'pilot-questions.json').read_text());e=json.loads((P/'authoring-evidence.json').read_text());em={x['questionId']:x for x in e['items']}
updates={'EPA609-SRV-031':'MACS describes typical vacuum pump oil-change intervals. Which operating record supports that schedule?','EPA609-EQP-011':'Liquid refrigerant strikes bare skin during disconnection. Which process causes the immediate contact injury?','EPA609-SRV-029':'A front-only system receives a condenser with a revised label. Which charge specification applies?'}
for x in q:
 if x['questionId'] in updates:x['question']=updates[x['questionId']];em[x['questionId']]['discriminatingFact']=x['question']
x=next(x for x in q if x['questionId']=='EPA609-REG-004');x['question']='Which business is exempt from purchasing recycling equipment under the federal top-off-only provision?'; x['correctAnswer']='D';x['correctIndex']=3
opts=['Business opening off-road cab systems for repair','Business limited to passenger-car refrigerant top-offs','Business opening passenger-car systems for repair','Business limited to off-road cab refrigerant top-offs']
x['explanation']='Section 82.32(e)(4) exempts facilities that only charge MVAC-like appliances from purchasing recycling equipment, while retaining technician certification. Passenger-car top-offs require equipment purchase. Opening MVAC-like systems requires approved equipment to be available, and passenger-car repairs require approved equipment use.'
z=em[x['questionId']];z['discriminatingFact']=x['question'];z['objective']='Distinguish both end use and service scope in the top-off-only purchase exception.';z['options']=[]
for i,t in enumerate(opts):
 x['option'+'ABCD'[i]]=t; v={'option':'ABCD'[i],'text':t,'role':'key' if i==3 else 'distractor','sourcePassageLocator':'40 CFR 82.32(e)(4)–(5), 82.34(a)'}
 if i==3:v['support']=x['explanation']
 else:
  reasons=[('Applies the MVAC-like exception to any work on that equipment.','Charging alone qualifies for the exception.','Opening the circuit is broader than top-off-only work.'),('Applies the limited-work exception to every vehicle type.','Top-offs of MVAC-like appliances qualify.','Passenger-car systems are MVACs, for which purchase is expressly required.'),('Assumes equipment is required only when refrigerant is resold.','Servicing a refrigerant circuit requires properly using approved equipment.','Passenger-car circuit repair meets neither part of the exception.')]
  v.update(zip(['whyCandidateMightChoose','validOtherCondition','whyStemExcludes'],reasons[i]))
 z['options'].append(v)
(P/'pilot-questions.json').write_text(json.dumps(q,indent=2,ensure_ascii=False)+'\n');(P/'authoring-evidence.json').write_text(json.dumps(e,indent=2,ensure_ascii=False)+'\n')
