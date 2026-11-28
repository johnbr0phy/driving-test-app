import json,runpy
from pathlib import Path
from collections import Counter
HERE=Path(__file__).resolve().parent;ROOT=HERE.parents[2];bank=[]
for domain,n,take in [('maths',47,20),('general',47,20),('english',47,20),('computer',35,15),('reasoning',24,10)]:
 source = runpy.run_path(str(HERE/f'{domain}.py'))
 items = source['ITEMS'];assert len(items)==n
 basics = {n: skill for skill, numbers in source.get('BASICS', {}).items() for n in numbers}
 # Spread drill-only material across topics. Remaining items alternate tests.
 drills={round((i+.5)*n/(n-2*take)-.5) for i in range(n-2*take)};seq=0
 for i,(stem,opts,why) in enumerate(items):
  def clean(s): return s.translate(str.maketrans({"’": "'", "‘": "'", "“": '"', "”": '"', "—": " - "})).replace("$", "\\$")
  stem,opts,why=clean(stem),[clean(o) for o in opts],clean(why)
  if i in drills: test=0
  else: test=1+seq%2;seq+=1
  key=i%4;options=opts[1:];options.insert(key,opts[0])
  q = dict(id=f'OSSSC-{domain.upper()}-{i+1:03}',section='written',test=test,module=1,domain='osssc'+domain.title(),skill=domain,difficulty=2,format='single',stem=stem,options=options,correct=[key],explanation=why)
  if i + 1 in basics:
   q['basics'] = basics[i + 1]
  bank.append(q)
assert len({q['stem'] for q in bank})==200
assert Counter(q['test'] for q in bank)=={1:85,2:85,0:30}
out=ROOT/'data/v2/osssc/questions.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
print('Wrote 200 original questions')
