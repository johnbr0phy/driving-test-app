"""Build data/be-vrachtwagen-c-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (vraag, juist antwoord, [3 foute], uitleg), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (Dutch decimal comma, e.g. "4,5 uur", "0,09 mg/l", "16,50 m") are
sorted ascending instead, and the key's letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 8/4/6/6/7/5/6/5/3 per test, pools exactly 4x.
ORDER = [("verkeer", 32), ("rijbewijs", 16), ("techniek", 24), ("remmen", 24),
         ("rijtijden", 28), ("tachograaf", 20), ("lading", 24), ("veiligheid", 20), ("milieu", 12)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "be-vrachtwagen-c-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(\S*)$")
UNIT = {"dag": "dagen", "minuut": "minuten", "week": "weken", "maand": "maanden"}
BAD = ["—", "– ", "Alle bovenstaande", "Geen van de bovenstaande", "Alle antwoorden", "A en B", "A of B"]

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
        assert key not in wrong, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            assert len(set(vals)) == 4, (m, i, "equal values")
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "BEVRACHT", "state": "ALL", "questionId": f"BEVRC-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
