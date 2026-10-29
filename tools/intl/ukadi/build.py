import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_band1 import ROAD, CONDITIONS
from q_band2 import SIGNS, CONTROL
from q_band3 import TEST, LAW
from q_band4 import PUBS, TEACH
CATS = [
 ("ukadiRoad", "RDP", 7, ROAD),
 ("ukadiConditions", "MWN", 6, CONDITIONS),
 ("ukadiSigns", "SGN", 6, SIGNS),
 ("ukadiControl", "CTL", 6, CONTROL),
 ("ukadiTest", "TST", 6, TEST),
 ("ukadiLaw", "LAW", 7, LAW),
 ("ukadiPublications", "PUB", 6, PUBS),
 ("ukadiInstruction", "INS", 6, TEACH),
]
out = []
for key, seg, per, items in CATS:
    assert len(items) == per * 4, (key, len(items), per * 4)
    for i, (q, k, ds, ex) in enumerate(items):
        assert len(ds) == 3
        idx = i % 4
        opts = list(ds); opts.insert(idx, k)
        assert len(set(o.lower() for o in opts)) == 4, q
        out.append({"type": "UKADI", "state": "ALL", "questionId": f"UKADI-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
dest = sys.argv[1]
json.dump(out, open(dest, "w"), indent=2, ensure_ascii=False); open(dest, "a").write("\n")
print(len(out))
