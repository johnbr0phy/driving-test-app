"""Build data/romania-rezidentiat-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (enunț, răspuns corect, [3 răspunsuri greșite], explicație), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all numbers
with the same unit (Romanian decimal comma, e.g. "4,5 ore", "3,5 g", "250/mm³") are sorted ascending
instead, and the key's letter is found after sorting. Prints the share of items whose key is
strictly the longest option.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 7/6/6/6/8/6/6/5 per test, pools exactly 4x.
ORDER = [("card", 28), ("pneu", 24), ("gir", 24), ("endo", 24),
         ("chirgen", 32), ("chirdig", 24), ("chirspec", 24), ("sinopsis", 20)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "romania-rezidentiat-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(.*)$")
BAD = ["\u2014", "\u2013 ", '"', "Toate cele de mai sus", "Toate variantele",
       "A și B", "A sau B"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({p.group(2) for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(",", ".")) for p in parts]

rows = []
longest = 0
ends = numcount = 0
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location("rorezid_" + m, p)
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "duplicate option")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        if len(key) > max(len(w) for w in wrong):
            longest += 1
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
            numcount += 1
            ends += k in (0, 3)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ROREZID", "state": "ALL", "questionId": f"ROREZ-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, f"| key strictly longest in {longest} ({longest/len(rows):.0%})",
      f"| numeric items {numcount}, key at an end in {ends}")
