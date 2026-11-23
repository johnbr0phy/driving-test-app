"""Build data/france-code-moto-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (question, bonne réponse, [3 mauvaises], explication), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit and prefix (French decimal comma, e.g. "0,5 g/l de sang", "1,5 m",
"50 km/h") are sorted ascending instead, and the key's letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Five 40-question tests: 7/6/5/5/6/3/3/3/2 per test, pools exactly 5x.
ORDER = [("circulation", 35), ("trajectoire", 30), ("conducteur", 25), ("equipement", 25),
         ("maitrise", 30), ("passager", 15), ("mecanique", 15), ("reglementation", 15),
         ("secours", 10)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "france-code-moto-questions.json")
PREFIXES = ("Au moins ", "Moins de ", "Au bout de ", "Tous les ", "Avant ses ")
NUM = re.compile(r"^(\d+(?:[.,]\d+)?)\s*(.*)$")
UNIT = {"an": "ans", "mètre": "m", "mètres": "m", "centimètres": "cm"}
BAD = [chr(0x2014), chr(0x2013) + " ", "Toutes les réponses", "Aucune des réponses", "A et B", "A ou B"]


def numeric(opts):
    pre = set()
    rest = []
    for o in opts:
        p = next((x for x in PREFIXES if o.startswith(x)), "")
        pre.add(p)
        rest.append(o[len(p):])
    if len(pre) != 1:
        return None
    parts = [NUM.match(r) for r in rest]
    if not all(parts):
        return None
    if len({UNIT.get(p.group(2), p.group(2)) for p in parts}) != 1:
        return None
    return [float(p.group(1).replace(",", ".")) for p in parts]


rows = []
count = [0, 0, 0, 0]
for m, n in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    assert len(mod.Q) == n, (m, len(mod.Q), n)
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, "dup")
        text = q + key + "".join(wrong) + expl
        for b in BAD:
            assert b not in text, (m, i, "banned", b)
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        allopts = [key] + list(wrong)
        vals = numeric(allopts)
        if vals:
            assert len(set(vals)) == 4, (m, i, "same value")
            order = sorted(range(4), key=lambda j: vals[j])
            opts = [allopts[j] for j in order]
            k = opts.index(key)
        else:
            # least-used letter so far, ties broken by rotation: keeps A-D near 25% even
            # though sorted number items fix their own letter
            k = min(range(4), key=lambda j: (count[j], (j - i) % 4))
            opts = list(wrong)
            opts.insert(k, key)
        count[k] += 1
        rows.append({"type": "FRMOTO", "state": "ALL", "questionId": f"FRMOTO-{mod.SEG}-{i+1:03d}",
                     "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1],
                     "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[k],
                     "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
