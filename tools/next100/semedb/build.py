"""Build data/sweden-citizenship-test-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (fråga, rätt svar, [3 felaktiga], förklaring), the key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (Swedish decimal comma "2,5 miljoner", thousands with a space
"250 000", years "1921") are sorted ascending instead, and the key's letter is found after
sorting.

Pools: three real-length tests of 60 take items 1..3n of each pool (n = per-test count);
the last two items of every pool are training-only spares (20 in all).
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool, per test). Three 60-question tests: 6/7/6/7/4/7/7/7/4/5 per test, pools 3x + 2.
ORDER = [("landet", 20, 6), ("demokrati", 23, 7), ("styrning", 20, 6), ("lag", 23, 7),
         ("medier", 14, 4), ("rattigheter", 23, 7), ("arbete", 23, 7), ("historia", 23, 7),
         ("omvarlden", 14, 4), ("religion", 17, 5)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "sweden-citizenship-test-questions.json")
NUM = re.compile(r"^(\d{1,3}(?: \d{3})+|\d+(?:,\d+)?)(?:\s+(\S+))?$")
BAD = ["—", "–", '"', "Alla svaren", "Alla alternativen", "ovanstående", "A och B", "A eller B"]

def num(o):
    m = NUM.match(o)
    if not m:
        return None
    return float(m.group(1).replace(" ", "").replace(",", ".")), m.group(2) or ""

def numeric(opts):
    parts = [num(o) for o in opts]
    if not all(parts) or len({p[1] for p in parts}) != 1:
        return None
    return [p[0] for p in parts]

rows = []
assert sum(p for _, p, _ in ORDER) == 200 and sum(t for _, _, t in ORDER) == 60
for m, n, per in ORDER:
    assert n == 3 * per + 2, (m, n, per)
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert not any(o.startswith("Båda") for o in [key] + list(wrong)), (m, i, "both")
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: num(o)[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        assert opts[k] == key
        rows.append({"type": "SEMEDB", "state": "ALL", "questionId": f"SEMEDB-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
