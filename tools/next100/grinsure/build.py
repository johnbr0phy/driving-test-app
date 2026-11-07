"""Build data/gr-insurance-intermediary-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (ερώτηση, σωστή απάντηση, [3 λάθος], επεξήγηση), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit (Greek decimal comma and thousands point, e.g. "20.000 ευρώ",
"14 ημέρες", "5 έτη") are sorted ascending instead, and the key's letter is found after
sorting. Greek stems end with the Greek question mark (";") or a colon.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Three real-length 60-question tests: 7/8/8/8/8/7/7/7 per test.
# Tests use 21/24/24/24/24/21/21/21; the last 2/3/3/3/2/3/3/1 of each pool (20 in all)
# are training-only.
ORDER = [("basics", 23), ("contract", 27), ("distrib", 27), ("conduct", 27),
         ("nonlife", 26), ("life", 24), ("ibip", 24), ("aml", 22)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "gr-insurance-intermediary-questions.json")
NUM = re.compile(r"^(\d{1,3}(?:\.\d{3})*(?:,\d+)?|\d+(?:,\d+)?)\s*(\S*)$")
UNIT = {"ημέρα": "ημέρες", "έτος": "έτη", "ώρα": "ώρες", "σελίδα": "σελίδες"}
BAD = ["—", "– ", '"', "?", "Όλα τα παραπάνω", "Όλες οι παραπάνω", "Κανένα από τα παραπάνω",
       "Καμία από τις παραπάνω", "Και τα δύο", "Αμφότερα", "Α και Β", "A και B"]

def val(o):
    p = NUM.match(o)
    return float(p.group(1).replace(".", "").replace(",", ".")) if p else None

def numeric(opts):
    parts = [NUM.match(o) for o in opts]
    if not all(parts):
        return None
    if len({UNIT.get(p.group(2), p.group(2)) for p in parts}) != 1:
        return None
    return [val(o) for o in opts]

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
        assert q.rstrip().endswith((";", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=val)
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "GRINSURE", "state": "ALL", "questionId": f"GRINS-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
