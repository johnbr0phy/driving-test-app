"""Build data/uk-building-regulations-questions.json from q_*.py.
Usage: python3 -I tools/next100/ukbregs/build.py [out.json]"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_general_structure import GENERAL, STRUCTURE
from q_fire import FIRE
from q_site_sound_vent import SITE, SOUND, VENT
from q_water_drain_comb import WATER, DRAIN, COMB
from q_safety_energy_services import SAFETY, ENERGY, SERVICES
CATS = [
 ("bregsGeneral", "GEN", 2, GENERAL),
 ("bregsStructure", "STR", 5, STRUCTURE),
 ("bregsFire", "FIR", 9, FIRE),
 ("bregsSite", "SIT", 3, SITE),
 ("bregsSound", "SND", 3, SOUND),
 ("bregsVentilation", "VNT", 4, VENT),
 ("bregsWater", "WAT", 3, WATER),
 ("bregsDrainage", "DRN", 4, DRAIN),
 ("bregsCombustion", "CMB", 4, COMB),
 ("bregsSafety", "SAF", 6, SAFETY),
 ("bregsEnergy", "ENG", 4, ENERGY),
 ("bregsServices", "SRV", 3, SERVICES),
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
        out.append({"type": "UKBREGS", "state": "ALL", "questionId": f"UKBREGS-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
root = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(root, "data", "uk-building-regulations-questions.json")
with open(dest, "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2, ensure_ascii=False); f.write("\n")
print(len(out))
