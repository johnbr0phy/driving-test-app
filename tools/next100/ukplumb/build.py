"""Build data/uk-plumbing-theory-questions.json from q_*.py.
Usage: python3 -I tools/next100/ukplumb/build.py [out.json]"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_safety_science import SAFETY, SCIENCE
from q_process_cold import PROCESS, COLD
from q_hot_heating import HOT, HEATING
from q_drain_elec_env import DRAINAGE, RAINWATER, ELECTRICAL, ENVIRO
CATS = [
 ("ukplumbSafety", "HSF", 6, SAFETY),
 ("ukplumbScience", "SCI", 5, SCIENCE),
 ("ukplumbProcesses", "PRO", 6, PROCESS),
 ("ukplumbCold", "CWS", 6, COLD),
 ("ukplumbHot", "HWS", 6, HOT),
 ("ukplumbHeating", "CHS", 8, HEATING),
 ("ukplumbDrainage", "DRN", 5, DRAINAGE),
 ("ukplumbRainwater", "RWS", 2, RAINWATER),
 ("ukplumbElectrical", "ELE", 3, ELECTRICAL),
 ("ukplumbEnviro", "ENV", 3, ENVIRO),
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
        out.append({"type": "UKPLUMB", "state": "ALL", "questionId": f"UKPLUMB-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "..", "..", "data", "uk-plumbing-theory-questions.json")
with open(dest, "w") as f:
    json.dump(out, f, indent=2, ensure_ascii=False); f.write("\n")
print(len(out))
