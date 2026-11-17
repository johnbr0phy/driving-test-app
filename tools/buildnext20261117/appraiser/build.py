import json,re,runpy
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];bank=[]
def clean(s):
 return s.translate(str.maketrans({'’':"'",'‘':"'",'“':'"','”':'"','—':' - ','–':'-'}))
for name,n in [('market',40),('property',20),('site',8),('sales',52),('cost',20),('income',8),('reconciliation',4),('uspap',44),('statistics',4)]:
 items=runpy.run_path(str(HERE/f'{name}.py'))['ITEMS'];assert len(items)==n
 for i,(stem,opts,why) in enumerate(items):
  k=i%4;choices=opts[1:];choices.insert(k,opts[0]);choices=list(map(clean,choices))
  bank.append(dict(type='APPRAISER',state='ALL',questionId=f'APPRAISER-{name.upper()}-{i+1:03}',category='appraiser'+name.title(),question=clean(stem),optionA=choices[0],optionB=choices[1],optionC=choices[2],optionD=choices[3],correctAnswer='ABCD'[k],correctIndex=k,explanation=clean(why)))
assert len({q['question'] for q in bank})==200
(ROOT/'data/appraiser-questions.json').write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n');print('Wrote 200 original appraiser questions')
