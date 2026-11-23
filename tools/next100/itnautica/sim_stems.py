"""Similarity check of the itnautica bank against the Ministry's official quiz list
(Allegato A, D.D. 131/2022). Usage: python3 simcheck.py <catalog.txt> <bank.json> [threshold]"""
import json, re, sys, difflib, unicodedata
cat_txt, bank_p = sys.argv[1], sys.argv[2]
STOP = set("il lo la i gli le un uno una di a da in con su per tra fra e o che si non è del dello della dei degli delle al allo alla ai agli alle dal dalla dai nel nello nella nei negli nelle sul sulla sui cosa come quale quali quando dove chi quanto quanti quante deve sono essere ha hanno viene un' l' d' dell' all' nell' sull' cos' com'".split())
def norm(s):
    s = unicodedata.normalize("NFKD", s.lower()); s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9 ]+", " ", s.replace("'", " "))
def words(s): return [w for w in norm(s).split() if w not in STOP and len(w) > 1]
pages = open(cat_txt).read().split("=====PAGE ")
Q = []  # (page_idx, question text)
for pi, p in enumerate(pages):
    flat = " ".join(p.split())
    for m in re.finditer(r"(?:^|\s)\d{1,4}\s+([A-ZÈÉÀa-z][^?]{8,320}\?)", flat):
        Q.append((pi, m.group(1)))
    for m in re.finditer(r"(?:^|\s)\d{1,4}\s+([A-Z][^?:]{8,200}:)", flat):
        Q.append((pi, m.group(1)))
pagenorm = [" " + " ".join(norm(p).split()) + " " for p in pages]
print("catalogue questions parsed:", len(Q), file=sys.stderr)
bank = json.load(open(bank_p))
res = []
for r in bank:
    st = r["question"]; ws = set(words(st)); ns = " ".join(norm(st).split())
    best = (0, 0, None)
    for pi, q in Q:
        wq = set(words(q))
        if not wq or not ws: continue
        jac = len(ws & wq) / len(ws | wq)
        if jac < 0.2: continue
        rat = difflib.SequenceMatcher(None, ns, " ".join(norm(q).split())).ratio()
        sc = max(jac, rat)
        if sc > best[0]: best = (sc, jac, (pi, q, rat))
    opts = [r["option" + c] for c in "ABCD"]
    hits = 0
    if best[2]:
        pg = pagenorm[best[2][0]]
        for o in opts:
            no = " ".join(norm(o).split())
            if len(no) >= 4 and (" " + no + " ") in pg: hits += 1
    res.append((best[0], hits, r["questionId"], st, best[2][1] if best[2] else "", opts))
res.sort(key=lambda x: (-x[0], -x[1]))
thr = float(sys.argv[3]) if len(sys.argv) > 3 else 0.55
flag = [x for x in res if x[0] >= thr or (x[0] >= 0.4 and x[1] >= 2)]
for sc, h, qid, st, q, opts in flag:
    print(f"{qid} sim={sc:.2f} opts_on_page={h}\n  ours: {st}\n  cat : {q}\n  opts: {opts}")
print(f"\n{len(res)} items; flagged {len(flag)} (stem similarity >= {thr}, or >= 0.40 with 2+ options on the matched page)")
import collections
print("distribution:", collections.Counter(round(x[0], 1) for x in res))
