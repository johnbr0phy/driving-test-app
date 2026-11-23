"""Build data/frm-part-1-questions.json from q_*.py. Usage: python3 -I build.py [out]
Items are (stem, key, [three wrong options], explanation), key written first. Computed keys go
through common.N, which formats the key from a value computed in Python and asserts the
explanation contains it. The build rotates the key through A, B, C, D within each category
(the app shuffles options anyway)."""
import importlib.util, json, sys, os, re
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, HERE)
sys.dont_write_bytecode = True
ORDER = ["fnd", "cap", "prb", "reg", "ins", "drv", "var", "val"]
POOLS = {"fnd": 24, "cap": 16, "prb": 20, "reg": 20, "ins": 28, "drv": 32, "var": 32, "val": 28}
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "data", "frm-part-1-questions.json")
rows = []
for m in ORDER:
    spec = importlib.util.spec_from_file_location("q_" + m, os.path.join(HERE, "q_" + m + ".py"))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
    assert len(mod.Q) == POOLS[m], (m, len(mod.Q))
    for i, (q, key, wrong, expl) in enumerate(mod.Q):
        assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "FRM1", "state": "ALL", "questionId": f"FRM1-{mod.SEG}-{i+1:03d}",
            "category": mod.CAT, "question": q, "optionA": opts[0], "optionB": opts[1], "optionC": opts[2],
            "optionD": opts[3], "correctAnswer": "ABCD"[k], "correctIndex": k, "explanation": expl})
# Key-order check: for every item with a number in its options, the key's number must appear in
# the explanation, and the explanation must not conclude on another option's number.
num = re.compile(r"-?\d[\d,]*\.?\d*")
bad = 0
for r in rows:
    opts = [r["option" + c] for c in "ABCD"]
    key = opts[r["correctIndex"]]
    kn = num.findall(key)
    if not kn:
        continue
    if kn[0] not in r["explanation"]:
        print("KEY NUMBER NOT IN EXPLANATION:", r["questionId"], key); bad += 1
    first = r["explanation"].split(". ")[0]
    for o in opts:
        if o == key:
            continue
        on = num.findall(o)
        if on and re.search(r"= " + re.escape(on[0]) + r"(?![\d])", first) and not re.search(r"= " + re.escape(kn[0]) + r"(?![\d])", first):
            print("EXPLANATION CONCLUDES ON A DISTRACTOR:", r["questionId"], o); bad += 1
assert bad == 0, bad
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
