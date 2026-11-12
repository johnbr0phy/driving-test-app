"""Build data/uk-registered-building-inspector-questions.json from q_*.py.
Usage: python3 -I tools/next100/ukrbi/build.py [out.json]"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_reg import REGISTRATION, CONDUCT
from q_proc import PROCEDURE, DUTYHOLDERS
from q_hrb import HRB, LAWSAFETY
from q_enf import ENFORCEMENT, OPERATIONAL
CATS = [
 ("ukrbiRegistration", "REG", 6, REGISTRATION),
 ("ukrbiConduct", "COC", 7, CONDUCT),
 ("ukrbiProcedure", "PRO", 7, PROCEDURE),
 ("ukrbiDutyholders", "DUT", 6, DUTYHOLDERS),
 ("ukrbiHrb", "HRB", 7, HRB),
 ("ukrbiEnforcement", "ENF", 6, ENFORCEMENT),
 ("ukrbiOperational", "OPS", 7, OPERATIONAL),
 ("ukrbiLawSafety", "LAW", 4, LAWSAFETY),
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
        out.append({"type": "UKRBI", "state": "ALL", "questionId": f"UKRBI-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "uk-registered-building-inspector-questions.json")
with open(dest, "w") as f:
    json.dump(out, f, indent=2, ensure_ascii=False); f.write("\n")
print(len(out))
