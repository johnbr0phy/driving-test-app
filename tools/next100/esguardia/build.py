"""Build data/es-guardia-civil-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (pregunta, respuesta correcta, [3 incorrectas], explicación), key written
first. The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (decimal comma, e.g. "72 horas", "1844", "5 %") are sorted ascending
instead, and the key's letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 6/6/4/8/6/6/6/4/4 per test, pools exactly 4x.
ORDER = [("derechos", 24), ("constitucion", 24), ("internacional", 16), ("penal", 32),
         ("procesal", 24), ("administrativo", 24), ("seguridad", 24), ("instituto", 16),
         ("tecnico", 16)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "es-guardia-civil-questions.json")
NUM = re.compile(r"^(\d+(?:[.,]\d+)?)\s*(\S*(?:\s\S+)?)$")
# Units converted to one base so mixed options ("1 mes", "3 meses", "1 año") still sort.
SCALE = {"": ("n", 1), "%": ("%", 1), "horas": ("t", 1 / 24), "hora": ("t", 1 / 24), "días": ("t", 1),
         "día": ("t", 1), "meses": ("t", 30), "mes": ("t", 30), "años": ("t", 365), "año": ("t", 365),
         "m": ("d", 1), "km": ("d", 1000)}
BAD = ["—", "– ", '"', "Todas las anteriores", "Ninguna de las anteriores", "A y B", "A o B",
       "Ambas", "Ambos son"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts) or any(p.group(2) not in SCALE for p in parts):
        return None
    if len({SCALE[p.group(2)][0] for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(".", "").replace(",", ".")) * SCALE[p.group(2)][1] for p in parts]

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
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        if q.rstrip().endswith("?"):
            assert "¿" in q, (m, i, "falta ¿")
        vals = numeric([key] + list(wrong))
        if vals:
            pairs = sorted(zip(vals, [key] + list(wrong)))
            opts = [o for _, o in pairs]
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ESGUARDIA", "state": "ALL", "questionId": f"ESGC-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
