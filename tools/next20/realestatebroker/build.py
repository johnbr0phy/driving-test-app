#!/usr/bin/env python3
"""Rebuild originals and traceability map. Each source row owns all four choices."""
import importlib.util,json
from pathlib import Path
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
CATEGORIES=[('property','rebProperty','PROP'),('title','rebTitle','TITLE'),('value','rebValue','VALUE'),('agency','rebAgency','AGENCY'),('practice','rebPractice','PRACT'),('environment','rebEnvironment','ENV'),('finance','rebFinance','FIN'),('math','rebMath','MATH')]
bank=[];mapping=[]
reasoning=json.loads((HERE/'cognitive-reasoning.json').read_text())
for module,category,segment in CATEGORIES:
 path=HERE/f'{module}.py'
 if not path.exists():continue
 spec=importlib.util.spec_from_file_location(module,path);m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
 for n,(stem,key,w1,w2,w3,explanation,source,level) in enumerate(m.ROWS,1):
  i=(n-1)%4;options=[w1,w2,w3];options.insert(i,key);qid=f'REBR-{segment}-{n:03}'
  bank.append(dict(type='REBROKER',state='ALL',questionId=qid,category=category,question=stem,**dict(zip(['optionA','optionB','optionC','optionD'],options)),correctAnswer='ABCD'[i],correctIndex=i,explanation=explanation))
  mapping.append(dict(questionId=qid,source=source,cognitiveLevel=level,cognitiveStatus='provisional author estimate',**({'reasoningOperation':reasoning['analysisOperations'][qid]} if level=='analysis' else {})))
(ROOT/'data/realestatebroker-questions.json').write_text(json.dumps(bank,indent=2)+'\n')
(HERE/'item-map.json').write_text(json.dumps(mapping,indent=2)+'\n')
print(f'Built {len(bank)} original items')
