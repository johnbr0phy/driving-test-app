"""Build data/es-cap-conductores-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (pregunta, respuesta correcta, [3 incorrectas], explicación), key written
first. The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (Spanish decimal comma and thousands point, e.g. "1,6 mm", "10.600 kg",
"0,8 veces su peso") are sorted ascending instead, and the key's letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Four 50-question tests: 6/6/4/6/5/6/5/6/6 per test, pools exactly 4x.
ORDER = [("cadena", 24), ("frenos", 24), ("riesgos", 16), ("tiempos", 24), ("tacografo", 20),
         ("salud", 24), ("emergencias", 20), ("mercancias", 24), ("viajeros", 24)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "es-cap-conductores-questions.json")
NUM = re.compile(r"^(\d{1,3}(?:\.\d{3})+|\d+)(?:,(\d+))?\s*(.*)$")
UNIT = {"vez": "veces", "hora": "horas", "año": "años", "día": "días", "minuto": "minutos",
        "vez su peso": "veces su peso"}
BAD = ["\u2014", "\u2013 ", '"', "Todas las anteriores", "Ninguna de las anteriores", "A y B", "A o B",
       "Ambas", "Ambos son"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    units = {UNIT.get(p.group(3), p.group(3)) for p in parts}
    if len(units) != 1:
        return None
    return [float(p.group(1).replace(".", "") + "." + (p.group(2) or "0")) for p in parts]

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
            assert len(set(vals)) == 4, (m, i, "valores repetidos")
            pairs = sorted(zip(vals, [key] + list(wrong)))
            opts = [o for _, o in pairs]
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ESCAPCOND", "state": "ALL", "questionId": f"ESCAP-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
