"""Build data/uk-unvented-g3-questions.json from q_*.py. Usage: python3 -I build.py <out.json>"""
import json, sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_law_sys import LAW, SYSTEMS
from q_inlet_safety import INLET, SAFETY
from q_discharge_temp import DISCHARGE, TEMPERATURE
from q_install_service import INSTALL, COMMISSION, SERVICE
CATS = [
 ("ukg3Law", "LAW", 6, LAW),
 ("ukg3Systems", "SYS", 5, SYSTEMS),
 ("ukg3Inlet", "INL", 7, INLET),
 ("ukg3Safety", "SAF", 8, SAFETY),
 ("ukg3Discharge", "DIS", 8, DISCHARGE),
 ("ukg3Temperature", "TMP", 5, TEMPERATURE),
 ("ukg3Install", "INS", 4, INSTALL),
 ("ukg3Commission", "COM", 3, COMMISSION),
 ("ukg3Service", "SER", 4, SERVICE),
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
        out.append({"type": "UKG3", "state": "ALL", "questionId": f"UKG3-{seg}-{i+1:03d}",
            "category": key, "question": q, "optionA": opts[0], "optionB": opts[1],
            "optionC": opts[2], "optionD": opts[3], "correctAnswer": "ABCD"[idx],
            "correctIndex": idx, "explanation": ex})
dest = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "..", "data", "uk-unvented-g3-questions.json")
json.dump(out, open(dest, "w"), indent=2, ensure_ascii=False); open(dest, "a").write("\n")
print(len(out))
