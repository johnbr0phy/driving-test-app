#!/usr/bin/env python3
"""Make fresh anonymized review inputs; never show private keys to options reviewer."""
import json, random, uuid, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[3]
OUT=Path(sys.argv[1] if len(sys.argv)>1 else '/tmp/vidyagyan-review')
OUT.mkdir(parents=True,exist_ok=True)
rng=random.SystemRandom()
blind=[];options=[];keys={};ids={}
for q in json.loads((ROOT/'data/v2/vidyagyan/questions.json').read_text()):
    rid=uuid.uuid4().hex[:12];order=list(range(4));rng.shuffle(order)
    opts=[q['options'][i] for i in order]
    base={'id':rid,'category':q['domain'],'format':q['format'],'select':q.get('select',1),'options':opts}
    options.append(base)
    blind.append({**base,'stem':q['stem'],**({'passage':q['passage']} if 'passage'in q else {})})
    keys[rid]=sorted(order.index(i) for i in q['correct']);ids[rid]=q['id']
rng.shuffle(blind);rng.shuffle(options)
for name,data in [('blind.json',blind),('options-only.json',options),('keys-private.json',keys),('id-map-private.json',ids)]:
    (OUT/name).write_text(json.dumps(data,indent=2,ensure_ascii=False)+'\n')
print('Wrote 160 anonymized questions to',OUT)
