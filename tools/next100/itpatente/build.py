"""Build data/italy-patente-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (domanda, risposta giusta, [3 sbagliate], spiegazione), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (Italian decimal comma, e.g. "0,5 g/l", "1,5 m", "150 m") are
sorted ascending instead, and the key's letter is found after sorting.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Seven 30-question tests: 3/4/5/4/5/3/3/3 per test, pools exactly 7x.
ORDER = [("pericolo", 21), ("divieto", 28), ("precedenza", 35), ("segnaletica", 28),
         ("velocita", 35), ("sosta", 21), ("patente", 21), ("guida", 21)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "italy-patente-questions.json")
NUM = re.compile(r"^(?:Almeno |Meno di |Sotto |Entro |Ogni )?(\d+(?:[.,]\d+)?)\s*(\S*)$")
UNIT = {"anno": "anni"}
BAD = [chr(0x2014), chr(0x2013) + " ", "Tutte le precedenti", "Nessuna delle precedenti", "A e B", "A o B"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    prefixes = {o.split()[0] if not o[0].isdigit() else "" for o in opts}
    if len(prefixes) != 1:
        return None
    if len({UNIT.get(p.group(2), p.group(2)) for p in parts}) != 1:
        return None
    vals = []
    for p in parts:
        s = p.group(1)
        s = s.replace(".", "") if re.fullmatch(r"\d{1,3}(\.\d{3})+", s) else s
        vals.append(float(s.replace(",", ".")))
    return vals

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
        allopts = [key] + list(wrong)
        vals = numeric(allopts)
        if vals:
            order = sorted(range(4), key=lambda j: vals[j])
            opts = [allopts[j] for j in order]
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "ITPATENTE", "state": "ALL", "questionId": f"ITPAT-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
