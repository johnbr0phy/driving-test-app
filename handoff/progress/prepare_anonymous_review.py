import argparse,json,pathlib,random
p=argparse.ArgumentParser();p.add_argument('bank');p.add_argument('out');a=p.parse_args();b=json.loads(pathlib.Path(a.bank).read_text());out=pathlib.Path(a.out);out.mkdir(exist_ok=True);rng=random.SystemRandom();rng.shuffle(b);rows=[];mapping={}
for i,q in enumerate(b):
 opts=[(k,q['option'+k]) for k in 'ABCD'];rng.shuffle(opts);rid=f'R{i+1:03}';r={'reviewId':rid,'category':q['category']};m={'questionId':q['questionId'],'letters':{}}
 for label,(orig,v) in zip('ABCD',opts):r['option'+label]=v;m['letters'][label]=orig
 rows.append(r);mapping[rid]=m
(out/'anonymous-options.json').write_text(json.dumps(rows,indent=2)+'\n');(out/'private-mapping.json').write_text(json.dumps(mapping,indent=2)+'\n')
