"""Containment check: how much of each item's wording appears in the official quiz list.
Usage: python3 simcheck2.py <catalog.txt> <bank.json>"""
import json, re, sys, unicodedata, collections
def norm(s):
    s = unicodedata.normalize("NFKD", s.lower()); s = "".join(c for c in s if not unicodedata.combining(c))
    return " ".join(re.sub(r"[^a-z0-9]+", " ", s).split())
cat = " " + norm(open(sys.argv[1]).read()) + " "
cw = cat.split()
tri = set(zip(cw, cw[1:], cw[2:]))
bank = json.load(open(sys.argv[2]))
rows = []
for r in bank:
    sw = norm(r["question"]).split()
    st = list(zip(sw, sw[1:], sw[2:]))
    cont = sum(t in tri for t in st) / len(st) if st else 0
    opts = [r["option" + c] for c in "ABCD"]; key = opts[r["correctIndex"]]
    present = [o for o in opts if len(norm(o)) >= 6 and len(norm(o).split()) >= 2 and (" " + norm(o) + " ") in cat]
    keyin = key in present
    rows.append((cont, len(present), keyin, r["questionId"], r["question"], key, present))
flag = [x for x in rows if x[0] >= 0.5 or x[1] >= 2 or (x[2] and x[0] >= 0.3)]
flag.sort(key=lambda x: (-x[0], -x[1]))
for c, n, k, qid, q, key, pres in flag:
    print(f"{qid} stem-trigrams-in-catalogue={c:.2f} options-verbatim={n} key-verbatim={k}\n  {q} -> {key}\n  verbatim: {pres}")
print(f"\n{len(rows)} items, flagged {len(flag)}")
print("stem containment:", sorted(collections.Counter(round(x[0], 1) for x in rows).items()))
