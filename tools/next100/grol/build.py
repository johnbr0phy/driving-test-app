"""Build data/grol-questions.json from q_*.py. Usage: python3 -I build.py [out]

Each q_*.py defines CAT, SEG and Q, a list of (stem, key, [3 wrong], explanation[, value]).
When a fifth element is given it is the computed answer: the build checks that the first
number in the key matches it (within 1%) and that the key's number also appears in the
explanation, so a wrong calculation cannot ship. The key's letter rotates A, B, C, D within
each segment; the app shuffles options for every student anyway.
"""
import importlib.util, json, sys, os, re
sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
ORDER = ["e1rules", "e1comms", "e1equip", "principles", "math", "components", "digital",
         "receivers", "transmitters", "antennas", "aircraft", "maint", "marine", "radar"]
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "grol-questions.json")
NUM = re.compile(r"-?\d+(?:,\d{3})*(?:\.\d+)?")


def first_num(s):
    m = NUM.search(s)
    return float(m.group(0).replace(",", "")) if m else None


rows = []
checked = 0
for m in ORDER:
    p = os.path.join(HERE, "q_" + m + ".py")
    spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    for i, item in enumerate(mod.Q):
        q, key, wrong, expl = item[:4]
        assert len(wrong) == 3, (m, i)
        assert key not in wrong, (m, i, key)
        assert len(set(wrong)) == 3, (m, i)
        if len(item) == 5:
            v = item[4]
            got = first_num(key)
            assert got is not None, (m, i, "no number in key", key)
            assert abs(got - v) <= 0.01 * abs(v) + 1e-9, (m, i, "key", key, "computed", v)
            ktok = NUM.search(key).group(0)
            assert ktok in expl, (m, i, "key number not in explanation", ktok)
            for w in wrong:
                wv = first_num(w)
                if wv is not None:
                    assert abs(wv - v) > 0.002 * abs(v) + 1e-9, (m, i, "distractor equals answer", w)
            checked += 1
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "GROL", "state": "ALL", "questionId": f"GROL-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out, "|", checked, "computed keys checked")
