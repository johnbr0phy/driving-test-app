#!/usr/bin/env python3
"""Deterministic original SecurityX bank; no generation API calls."""
import json,runpy,re
from pathlib import Path
from collections import Counter
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SPECS=[('grc',48,18),('architecture',64,24),('engineering',76,28),('operations',52,20)]
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
        def tidy(s):return re.sub(r'(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])',' ',s).replace(chr(8217), chr(39))
        bank.append(dict(id=f'SECURITYX-{domain.upper()}-{i+1:03}',section='securityx',test=test,module=1,domain='securityx'+domain.title(),skill=domain,difficulty=2,format='single',stem=tidy(stem),options=[tidy(options[j]) for j in order],correct=[order.index(0)],explanation=tidy(why)))
assert len(bank)==240
assert len({q['stem'] for q in bank})==240
assert Counter(q['test'] for q in bank)=={1:90,2:90,0:60}
out=ROOT/'data/v2/securityx/questions.json';out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
print('Wrote240 original SecurityX questions: two90-question tests plus60 drill-only.')
