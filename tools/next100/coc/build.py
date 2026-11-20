"""Build data/coc-questions.json from q_a.py, q_b.py and q_c.py.

Usage: python3 -I build.py [--out path]
Each list holds (stem, key, [3 wrong options], explanation). The key goes in slot i % 4,
so every segment keys A, B, C, D in turn.
"""
import importlib.util, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", ".."))

def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, name + ".py"))
    mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod); return mod

a, b, c = load("q_a"), load("q_b"), load("q_c")
# (category, segment, items, pool) in spec order (AAPC section order)
SECTIONS = [
    ("cocTerms", "TRM", a.TERMS, 12),
    ("cocAnatomy", "ANA", a.ANATOMY, 12),
    ("cocCompliance", "CMP", a.COMPLIANCE, 12),
    ("cocPayment", "PAY", a.PAYMENT, 28),
    ("cocIcd", "ICD", b.ICD, 32),
    ("cocCpt", "CPT", b.CPT, 24),
    ("cocHcpcs", "HCP", b.HCPCS, 16),
    ("cocSurgery", "SUR", c.SURGERY, 44),
    ("cocCases", "CAS", c.CASES, 20),
]
out = os.path.join(ROOT, "data", "coc-questions.json")
if "--out" in sys.argv:
    out = sys.argv[sys.argv.index("--out") + 1]
rows = []
for cat, seg, items, pool in SECTIONS:
    assert len(items) == pool, (cat, len(items), pool)
    for i, (q, key, wrong, expl) in enumerate(items):
        assert len(wrong) == 3 and key not in wrong, (cat, i, q)
        k = i % 4
        opts = list(wrong); opts.insert(k, key)
        rows.append({"type": "COC", "state": "ALL", "questionId": f"COC-{seg}-{i+1:03d}",
            "category": cat, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[k],
            "correctIndex": k, "explanation": expl})
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")
print(len(rows), "rows ->", out)
