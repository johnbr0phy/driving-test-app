"""Build data/uk-water-regulations-questions.json from q_*.py. Usage: python3 -I build.py <out.json>"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_law import LAW
from q_fittings import FITTINGS
from q_design import DESIGN
from q_fluid import FLUID
from q_backflow import BACKFLOW
from q_services import COLD, HOT, SANITARY
CATS = [
 ("ukwaterLaw", "LAW", 6, LAW),
 ("ukwaterFittings", "FIT", 7, FITTINGS),
 ("ukwaterDesign", "DES", 8, DESIGN),
 ("ukwaterFluid", "FLU", 6, FLUID),
 ("ukwaterBackflow", "BKF", 10, BACKFLOW),
 ("ukwaterCold", "CLD", 4, COLD),
 ("ukwaterHot", "HOT", 4, HOT),
 ("ukwaterSanitary", "SAN", 5, SANITARY),
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
        out.append({"type": "UKWATER", "state": "ALL", "questionId": f"UKWATER-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "data", "uk-water-regulations-questions.json")
json.dump(out, open(dest, "w"), indent=2, ensure_ascii=False); open(dest, "a").write("\n")
print(len(out))
