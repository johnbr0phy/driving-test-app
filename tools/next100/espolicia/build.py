"""Build data/policia-nacional-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (pregunta, respuesta correcta, [3 incorrectas], explicación), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all numbers
with the same unit (Spanish decimal comma and thousands point, e.g. "72 horas", "1.500 hab./km²")
are sorted ascending instead, and the key's letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 6/5/3/4/6/3/3/7/4/5/4 per test, pools exactly 4x.
ORDER = [("constitucion", 24), ("administracion", 20), ("extranjeria", 12), ("seguridad", 16),
         ("penal", 24), ("procesal", 12), ("igualdad", 12), ("sociales", 28), ("lengua", 16),
         ("informatica", 20), ("armasvial", 16)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "policia-nacional-questions.json")
NUM = re.compile(r"^(\d{1,3}(?:\.\d{3})*(?:,\d+)?)\s*(\S*)$")
UNIT = {"año": "años", "hora": "horas", "día": "días"}
BAD = ["—", "– ", '"', "Todas las anteriores", "Ninguna de las anteriores", "A y B", "A o B", "Ambas", "Ambos"]

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
        assert key not in wrong, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        if q.rstrip().endswith("?"):
            assert "¿" in q, (m, i, "missing ¿")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ESPOLICIA", "state": "ALL", "questionId": f"ESPN-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
