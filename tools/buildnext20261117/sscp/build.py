#!/usr/bin/env python3
"""Deterministic original SSCP bank; no generation API calls."""
import json,runpy,re
from pathlib import Path
from collections import Counter
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SPECS=[('concepts',40,16),('access',40,15),('risk',40,15),('incident',36,14),('crypto',24,9),('network',40,16),('systems',40,15)]
bank=[]
for domain,size,per_test in SPECS:
    items=runpy.run_path(str(HERE/f'{domain}.py'))['ITEMS']
    assert len(items)==size
    capacity={1:per_test,2:per_test,0:size-2*per_test};used=Counter()
    for i,(stem,options,why) in enumerate(items):
        test=min((t for t in [1,2,0] if used[t]<capacity[t]),key=lambda t:used[t]/capacity[t]);used[test]+=1
        order=list(range(4));shift=i%4
        if shift:order=order[-shift:]+order[:-shift]
        # Fix prose spacing around numeric examples without changing token fields.
        def tidy(s):return s.replace(chr(8217), chr(39))
        bank.append(dict(id=f'SSCP-{domain.upper()}-{i+1:03}',section='sscp',test=test,module=1,domain='sscp'+domain.title(),skill=domain,difficulty=2,format='single',stem=tidy(stem),options=[tidy(options[j]) for j in order],correct=[order.index(0)],explanation=tidy(why)))
assert len(bank)==260
assert len({q['stem'] for q in bank})==260
assert Counter(q['test'] for q in bank)=={1:100,2:100,0:60}
out=ROOT/'data/v2/sscp/questions.json';out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
print('Wrote260 original SSCP questions: two100-question tests plus60 drill-only.')
