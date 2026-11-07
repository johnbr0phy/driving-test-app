"""Build data/gr-security-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each source item is (ερώτηση, σωστή απάντηση, [3 λάθος], επεξήγηση), key written first.
The key goes to slot i % 4 so letters rotate A, B, C, D. Items whose four options are all
numbers with the same unit ("5 έτη", "15 ημέρες", "166") are sorted ascending instead, and
the key's letter is found after sorting. Greek stems end with the Greek question mark (";")
or a colon.
"""
import importlib.util, json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
# (module, pool). Eight 20-question tests: 2/3/2/2/2/2/3/2/2 per test, built on the ten
# lessons of the KEMEA 105-hour programme. Tests use 16/24/16/16/16/16/24/16/16 items; the
# rest of each pool (4/8/4/8/4/4/4/4/0, 40 in all) is training-only.
ORDER = [("sector", 20), ("law", 32), ("ohs", 20), ("firstaid", 24), ("crime", 20),
         ("equip", 20), ("duties", 28), ("incidents", 20), ("fire", 16)]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "gr-security-questions.json")
NUM = re.compile(r"^(\d+(?:,\d+)?)\s*(\S*)$")
BAD = ["\u2014", "\u2013", '"', "Όλα τα παραπάνω", "Όλες οι παραπάνω", "Κανένα από τα παραπάνω",
       "Καμία από τις παραπάνω", "Και τα δύο", "Αμφότερα", "Α και Β", "A και B", "?"]

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
        assert q.rstrip().endswith((";", ":")), (m, i, "stem end")
        vals = numeric([key] + list(wrong))
        if vals:
            opts = sorted([key] + list(wrong), key=lambda o: numeric([o])[0])
            k = opts.index(key)
        else:
            k = i % 4
            opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "GRSECURITY", "state": "ALL", "questionId": f"GRSEC-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
