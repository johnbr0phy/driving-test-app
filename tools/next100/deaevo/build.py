"""Build data/de-aevo-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (Frage, richtige Antwort, [3 falsche], Erläuterung), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (German decimal comma) are sorted ascending instead, and the key's
letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 4/4/3/4/3/7/6/6/5/8 per test, pools exactly 4x.
ORDER = [("nutzen", 16), ("rahmen", 16), ("plan", 12), ("vertrag", 16), ("rechte", 12),
         ("lernen", 28), ("methoden", 24), ("begleitung", 24), ("beurteilung", 20), ("abschluss", 32)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "de-aevo-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(\S*)$")
BAD = ["\u2014", "\u2013", '"', "Alle Antworten", "Keine der Antworten", "A und B", "A oder B", "Beide"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({p.group(2) for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(",", ".")) for p in parts]

rows = []
seen = set()
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong and len(set(wrong)) == 3, (m, i, "dup")
        assert q not in seen, (m, i, "dup stem"); seen.add(q)
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "DEAEVO", "state": "ALL", "questionId": f"DEAEVO-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
