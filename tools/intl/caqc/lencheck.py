import json,sys
rows=json.load(open(sys.argv[1]))
for r in rows:
    o=[r["option"+c] for c in "ABCD"]; k=o[r["correctIndex"]]; w=[x for i,x in enumerate(o) if i!=r["correctIndex"]]
    avg=sum(map(len,w))/3
    longest = len(k)>max(map(len,w))
    far = len(k)>1.2*avg
    if longest or far:
        print(f'{r["questionId"]} {"L" if longest else " "}{"F" if far else " "} key={k!r} ({len(k)}) wrongs={w}')
