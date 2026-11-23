"""For each item, find the catalogue passage (40-word window) sharing most stem and option words.
Prints item, score and the window. Usage: window.py cat.txt bank.json [ids...]"""
import json, re, sys, unicodedata
STOP = set("il lo la i gli le un uno una di a da in con su per tra fra e o che si non e del dello della dei degli delle al allo alla ai agli alle dal dalla dai nel nello nella nei negli nelle sul sulla sui cosa come quale quali quando dove chi quanto deve sono essere ha v f l d un dell all nell sull cos com quella quello piu".split())
def norm(s):
    s = unicodedata.normalize("NFKD", s.lower()); s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", " ", s).split()
raw = open(sys.argv[1]).read()
raw = re.sub(r"=====PAGE \d+=====", " ", raw)
rw = raw.split(); nw = [ (norm(w) or [""])[0] for w in rw ]
bank = {r["questionId"]: r for r in json.load(open(sys.argv[2]))}
ids = sys.argv[3:] or list(bank)
out = []
for qid in ids:
    r = bank[qid]
    sw = set(w for w in norm(r["question"]) if w not in STOP and len(w) > 2)
    ow = set(w for c in "ABCD" for w in norm(r["option"+c]) if w not in STOP and len(w) > 2)
    if not sw: continue
    W = 45; best = (0, 0)
    pos = [i for i, w in enumerate(nw) if w in sw]
    for i in pos:
        win = set(nw[max(0, i-5): i+W])
        s = len(sw & win) / len(sw) + 0.5 * (len(ow & win) / max(1, len(ow)))
        if s > best[0]: best = (s, max(0, i-5))
    out.append((best[0], qid, r, " ".join(rw[best[1]: best[1]+W+10])))
out.sort(key=lambda x: -x[0])
for s, qid, r, win in out:
    k = r["option"+r["correctAnswer"]]
    print(f"## {qid} {s:.2f}\nOURS: {r['question']} | KEY: {k} | {[r['option'+c] for c in 'ABCD']}\nCAT : {win}\n")
