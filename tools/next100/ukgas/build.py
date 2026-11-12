"""Build data/uk-gas-safe-acs-questions.json from q_*.py.
Usage: python3 -I tools/next100/ukgas/build.py data/uk-gas-safe-acs-questions.json"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_law import LAW
from q_combustion import COMBUSTION, CO, VENT
from q_flues import FLUES, UNSAFE
from q_install import TIGHTNESS, METERS, EMERGENCY, DEVICES, APPLIANCES
CATS = [
 ("ukgasLaw", "LAW", 6, LAW),
 ("ukgasEmergency", "EMG", 4, EMERGENCY),
 ("ukgasCombustion", "CMB", 4, COMBUSTION),
 ("ukgasCo", "CO", 4, CO),
 ("ukgasVent", "VEN", 4, VENT),
 ("ukgasTightness", "TGT", 5, TIGHTNESS),
 ("ukgasMeters", "MTR", 4, METERS),
 ("ukgasUnsafe", "UNS", 5, UNSAFE),
 ("ukgasDevices", "DEV", 4, DEVICES),
 ("ukgasFlues", "FLU", 5, FLUES),
 ("ukgasAppliances", "APP", 5, APPLIANCES),
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
        out.append({"type": "UKGAS", "state": "ALL", "questionId": f"UKGAS-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
dest = sys.argv[1]
json.dump(out, open(dest, "w"), indent=2, ensure_ascii=False); open(dest, "a").write("\n")
print(len(out))
