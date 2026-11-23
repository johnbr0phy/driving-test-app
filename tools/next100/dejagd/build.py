"""Build data/de-jaegerpruefung-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (Frage, richtige Antwort, [3 falsche], Erläuterung), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (German decimal comma and thousands point, e.g. "6,5 mm",
"1.000 J", "+7 °C", "3 Jagdjahre") are sorted ascending instead, and the key's letter is found
after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Two 100-question tests like the real paper (JFPO § 12): 16 per Sachgebiet 1-5
# and 20 from Sachgebiet 6; pools exactly 2x.
ORDER = [("waffen", 32), ("biologie", 32), ("recht", 32), ("hege", 32), ("hunde", 32), ("natur", 40)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "de-jaegerpruefung-questions.json")
NUM = re.compile(r"^([+-]?\d{1,3}(?:\.\d{3})*(?:,\d+)?)\s*(.*)$")
UNIT = {"Jagdjahr": "Jagdjahre", "Jahr": "Jahre"}
BAD = ["—", "–", '"', "Alle Antworten", "Keine der Antworten", "A und B", "A oder B"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({UNIT.get(p.group(2), p.group(2)) for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(".", "").replace(",", ".")) for p in parts]

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
        assert not any(o.lower().startswith("beide") for o in [key] + list(wrong)), (m, i, "beide")
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "DEJAGD", "state": "ALL", "questionId": f"DEJGD-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
