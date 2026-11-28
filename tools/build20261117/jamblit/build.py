#!/usr/bin/env python3
"""Rebuild original JAMB literary-skills bank; no external API or paid calls."""
import json, runpy, random
from pathlib import Path
from collections import Counter
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
bank = []
for domain in ('drama', 'prose', 'poetry', 'appreciation'):
    items = runpy.run_path(str(HERE / (domain + '.py')))['ITEMS']
    assert len(items) == 30
    rng = random.Random('jamblit-' + domain)
    keys = [k for _ in range(8) for k in range(4)][:30]
    rng.shuffle(keys)
    for i, item in enumerate(items):
        assert len(item) in (3, 4), "An item has a stem, options, explanation and optional Basics skill"
        stem, opts, why = item[:3]
        # Spread each four-concept family across both tests and the drill pool.
        # This keeps the held-out test from monopolising whole subtopics.
        family, position = divmod(i, 4)
        test = ([1, 2, 0, [1, 2, 0, 1, 2, 0, 1][family]][position]
                if family < 7 else [2, 0][position])
        key = keys[i]
        options = opts[1:]
        options.insert(key, opts[0])
        question = dict(id=f'JAMBLIT-{domain.upper()}-{i+1:03}', section='lit', test=test,
            module=1, domain='jamblit'+domain.title(), difficulty=1 if i % 3 == 0 else 2,
            format='single', skill=domain, stem=stem, options=options, correct=[key], explanation=why)
        if len(item) == 4:
            question['basics'] = item[3]
        bank.append(question)
assert len({q['stem'] for q in bank}) == len(bank)
assert all(len(set(q['options'])) == 4 for q in bank)
assert Counter(q['test'] for q in bank) == {1:40, 2:40, 0:40}
out = ROOT/'data/v2/jamblit/questions.json'
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(bank, ensure_ascii=False, indent=2)+'\n')
print('Wrote', len(bank), 'original questions:', out)
