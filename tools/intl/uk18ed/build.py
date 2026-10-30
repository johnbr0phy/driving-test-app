"""Build data/uk-18th-edition-questions.json from q_*.py. Usage: python3 -I build.py <out.json>"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_part123 import SCOPE, DEFS, ASSESS
from q_part4 import PROTECT
from q_part5 import SELECT
from q_part678 import INSPECT, SPECIAL, APPX
CATS = [
 ("uk18edScope", "SCP", 3, SCOPE),
 ("uk18edDefinitions", "DEF", 2, DEFS),
 ("uk18edAssessment", "ASM", 5, ASSESS),
 ("uk18edProtection", "PRO", 13, PROTECT),
 ("uk18edSelection", "SEL", 12, SELECT),
 ("uk18edInspection", "INS", 3, INSPECT),
 ("uk18edSpecial", "SPL", 6, SPECIAL),
 ("uk18edAppendices", "APX", 6, APPX),
]
assert sum(c[2] for c in CATS) == 50
out = []
for key, seg, per, items in CATS:
    assert len(items) == per * 4, (key, len(items), per * 4)
    for i, (q, k, ds, ex) in enumerate(items):
        assert len(ds) == 3, q
        idx = i % 4
        opts = list(ds); opts.insert(idx, k)
        assert len(set(o.lower() for o in opts)) == 4, q
        for s in [q, ex] + opts:
            assert "—" not in s and "–" not in s, s
        out.append({"type": "UK18ED", "state": "ALL", "questionId": f"UK18ED-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
dest = sys.argv[1]
json.dump(out, open(dest, "w"), indent=2, ensure_ascii=False); open(dest, "a").write("\n")
print(len(out))
