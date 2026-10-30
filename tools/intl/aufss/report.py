import json,sys
rows=json.load(open(sys.argv[1]))
for r in rows:
    o=[r['option'+c] for c in 'ABCD']; k=o[r['correctIndex']]; w=[x for i,x in enumerate(o) if i!=r['correctIndex']]
    avg=sum(map(len,w))/3; longest=len(k)>max(map(len,w)); ratio=len(k)/avg
    if longest or ratio>1.2: print(f"{r['questionId']} {ratio:.2f}{' L' if longest else ''} | {k} | {' / '.join(w)}")
