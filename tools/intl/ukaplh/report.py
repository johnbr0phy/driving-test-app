import json,sys
rows=json.load(open(sys.argv[1]))
for r in rows:
    o=[r["option"+c] for c in "ABCD"]; k=r["correctIndex"]; kl=len(o[k]); w=[len(x) for i,x in enumerate(o) if i!=k]
    flag=[]
    if kl>1.2*sum(w)/3: flag.append("FAR")
    if kl>max(w): flag.append("LONG")
    if flag: print(r["questionId"],flag,kl,w,o[k])
