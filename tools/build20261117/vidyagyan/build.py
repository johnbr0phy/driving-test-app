#!/usr/bin/env python3
import json,runpy
from pathlib import Path
from collections import Counter
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
bank=[]
for domain in ['english','maths','science','reasoning']:
    items=runpy.run_path(str(HERE/f'{domain}.py'))['ITEMS']
    assert len(items)==40,(domain,len(items))
    for i,(stem,opts,why) in enumerate(items):
        # One item from each contrast family per test, two drill-only.
        family,pos=divmod(i,4)
        test=[1,2,0,0][(pos+family)%4]
        key=i%4;options=opts[1:];options.insert(key,opts[0])
        bank.append(dict(id=f'VIDYAGYAN-{domain.upper()}-{i+1:03}',section='skills',test=test,module=1,
            domain='vidya'+domain.title(),skill=domain,difficulty=2,format='single',stem=stem,
            options=options,correct=[key],explanation=why))
assert len({q['stem'] for q in bank})==160
assert Counter(q['test'] for q in bank)=={1:40,2:40,0:80}
out=ROOT/'data/v2/vidyagyan/questions.json';out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
print('Wrote160 original questions')
