#!/usr/bin/env python3
"""Build original CSP practice; no remote generation or paid API calls."""
import json, runpy
from pathlib import Path
from collections import Counter
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SPECS = [('creative',24,8,1),('data',40,14,2),('algorithms',64,23,3),('networks',26,9,1),('impact',46,16,1)]
bank=[]
for domain,size,per_test,multi_per_test in SPECS:
    source=runpy.run_path(str(HERE/f'{domain}.py'))
    items=source['ITEMS']
    assert len(items)==size,(domain,len(items),size)
    passages=source.get('PASSAGE_FOR',{})
    # Reserve reading sets, then spread every other topic through both tests
    # and drills proportionately. Matched answer families do not occupy a
    # whole held-out test by themselves.
    capacity={1:per_test-multi_per_test,2:per_test-multi_per_test,0:size-2*per_test}
    for t in passages.values():capacity[t]-=1
    used=Counter();multi_used=Counter()
    for i,item in enumerate(items):
        stem,options,why=item[:3]
        count=item[3] if len(item)>3 else 1
        if i in passages:test=passages[i]
        elif count==2:
            test=1 if multi_used[1]<=multi_used[2] else 2
            multi_used[test]+=1
        else:
            test=min((t for t in [1,2,0] if used[t]<capacity[t]),key=lambda t:used[t]/capacity[t])
            used[test]+=1
        shift=i%4;order=list(range(4))
        order=order[-shift:]+order[:-shift] if shift else order
        q=dict(id=f'APCSP-{domain.upper()}-{i+1:03}',section='mcq',test=test,module=1,
          domain='apcsp'+domain.title(),difficulty=2,format='multi' if count==2 else 'single',
          skill=domain,stem=stem,options=[options[j] for j in order],
          correct=sorted(order.index(j) for j in range(count)),explanation=why)
        if count==2:q['select']=2
        if i in passages:q['passage']=source['PASSAGES'][test]
        bank.append(q)
    assert multi_used=={1:multi_per_test,2:multi_per_test},multi_used
assert Counter(q['test'] for q in bank)=={1:70,2:70,0:60}
assert len({q['stem'] for q in bank})==200
for test in [1,2]:
    assert sum(q['format']=='multi' for q in bank if q['test']==test)==8
    assert sum('passage'in q for q in bank if q['test']==test)==5
out=ROOT/'data/v2/apcsp/questions.json'
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(bank,ensure_ascii=False,indent=2)+'\n')
print(f'Wrote {len(bank)} original CSP questions')
