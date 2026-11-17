#!/usr/bin/env python3
"""Deterministic original SERVICENOWCSA bank; no generation API calls."""
import json,runpy,re
from pathlib import Path
from collections import Counter
HERE=Path(__file__).resolve().parent
ROOT=HERE.parents[2]
SPECS=[('navigation',16,4),('configuration',24,6),('collaboration',40,12),('automation',40,12),('database',56,18),('migration',24,8)]
bank=[]
for domain,size,per_test in SPECS:
    items=runpy.run_path(str(HERE/f'{domain}.py'))['ITEMS']
    assert len(items)==size
    capacity={1:per_test,2:per_test,0:size-2*per_test};used=Counter()
    for i,item in enumerate(items):
        stem,options,why=item[:3]
        correct=item[3] if len(item)==4 else [0]
        test=min((t for t in [1,2,0] if used[t]<capacity[t]),key=lambda t:used[t]/capacity[t]);used[test]+=1
        order=list(range(4));shift=i%4
        if shift:order=order[-shift:]+order[:-shift]
        # Fix prose spacing around numeric examples without changing token fields.
        def tidy(s):return re.sub(r'(?<=[A-Za-z])(?=\d)|(?<=\d)(?=[A-Za-z])',' ',s).replace(chr(8217), chr(39)).replace(chr(8220), chr(34)).replace(chr(8221), chr(34))
        bank.append(dict(id=f'SERVICENOWCSA-{domain.upper()}-{i+1:03}',section='servicenowcsa',test=test,module=1,domain='servicenowcsa'+domain.title(),skill=domain,difficulty=2,format='multi' if len(correct)>1 else 'single',stem=tidy(stem),options=[tidy(options[j]) for j in order],correct=sorted(order.index(k) for k in correct),explanation=tidy(why)))
for q in bank:
    if q['format']=='multi': q['select']=len(q['correct'])
assert len(bank)==200
assert len({q['stem'] for q in bank})==200
assert Counter(q['test'] for q in bank)=={1:60,2:60,0:80}
out=ROOT/'data/v2/servicenowcsa/questions.json';out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
print('Wrote 200 original CSA questions: two 60-question tests plus 80 drill-only.')
