"""Build data/de-heilpraktiker-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (Frage, richtige Antwort, [3 falsche], Erläuterung), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (German decimal comma) are sorted ascending instead, and the key's
letter is found after sorting. Aussagenkombination items ("Nur 1, 2 und 4") are ordinary
single-answer items: each option names its statements, so shuffling is safe.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Three 60-question tests: 7/7/5/7/5/7/6/6/4/6 per test; the rest training-only.
ORDER = [("recht", 24), ("infekt", 24), ("hygiene", 16), ("herz", 22), ("atmung", 16),
         ("stoffwechsel", 22), ("blut", 20), ("nerven", 20), ("bewegung", 16), ("notfall", 20)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "de-heilpraktiker-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(\S*)$")
BAD = ["—", "– ", '"', "Alle Antworten", "Keine der Antworten", "A und B", "A oder B"]

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({p.group(2) for p in parts}) != 1:
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
        for o in [key] + list(wrong):
            assert not o.startswith("Beide"), (m, i, "Beide option")
        assert q.rstrip().endswith(("?", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "DEHEILPR", "state": "ALL", "questionId": f"DEHP-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
