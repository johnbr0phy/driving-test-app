import json,re,runpy
from pathlib import Path
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];bank=[]
def clean(s):
 s=s.translate(str.maketrans({'’':"'",'‘':"'",'“':'"','”':'"','—':' - ','–':'-'}))
 return re.sub(r'(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])',' ',s)
for name,seg,n in [('site','SITE',44),('operations','OPS',56),('technical','TECH',48),('charts','CHART',52)]:
 items=runpy.run_path(str(HERE/f'{name}.py'))['ITEMS'];assert len(items)==n
 for i,(stem,opts,why) in enumerate(items):
  k=i%4;choices=opts[1:];choices.insert(k,opts[0]);choices=list(map(clean,choices))
  bank.append(dict(type='NCCCO',state='ALL',questionId=f'NCCCO-{seg}-{i+1:03}',category='nccco'+name.title(),question=clean(stem),optionA=choices[0],optionB=choices[1],optionC=choices[2],optionD=choices[3],correctAnswer='ABCD'[k],correctIndex=k,explanation=clean(why)))
assert len({q['question'] for q in bank})==200
out=ROOT/'data/nccco-questions.json';out.write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n');print('Wrote200 original NCCCO questions')
