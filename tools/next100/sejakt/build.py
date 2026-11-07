"""Build data/sweden-hunting-theory-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (fråga, rätt svar, [3 felaktiga], förklaring), the key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (Swedish decimal comma, e.g. "4,1 mm", "800 J", "45 cm") are
sorted ascending instead, and the key's letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Three 70-question tests: 12/12/10/10/8/7/6/5 per test, pools exactly 3x.
ORDER = [("arter", 36), ("lag", 36), ("sakerhet", 30), ("vapen", 30), ("etik", 24),
         ("metoder", 21), ("viltvard", 18), ("kott", 15)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "sweden-hunting-theory-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(\S*)$")
UNIT = {"minut": "minuter", "timme": "timmar"}
BAD = ["—", "– ", '"', "­", "Alla svaren", "Alla alternativen", "ovanstående", "A och B", "A eller B"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({UNIT.get(p.group(2), p.group(2)) for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(",", ".")) for p in parts]

rows = []
for m, n in ORDER:
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
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "SEJAKT", "state": "ALL", "questionId": f"SEJAKT-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
