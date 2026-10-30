"""Build data/red-seal-electrician-questions.json from q_*.py.
Usage: python3 -I build.py [out.json] [--report]"""
import json, os, statistics, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from q_common import ITEMS as COMMON
from q_dist import ITEMS as DIST
from q_wiring import ITEMS as WIRING
from q_motors import ITEMS as MOTORS
from q_signal import ITEMS as SIGNAL

CATS = [
    ("caelecCommon", "COM", COMMON, 24),
    ("caelecDist", "DIS", DIST, 56),
    ("caelecWiring", "WIR", WIRING, 60),
    ("caelecMotors", "MOT", MOTORS, 40),
    ("caelecSignal", "SIG", SIGNAL, 20),
]
HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_OUT = os.path.normpath(os.path.join(HERE, "..", "..", "..", "data", "red-seal-electrician-questions.json"))
rows = []
report = "--report" in sys.argv
for key, seg, items, n in CATS:
    if len(items) != n:
        print(f"{key}: {len(items)} items, want {n}")
    for i, it in enumerate(items, 1):
        stem, k, w1, w2, w3, expl = it
        pos = (i - 1) % 4
        wrong = [w1, w2, w3]
        opts = wrong[:pos] + [k] + wrong[pos:]
        rows.append({
            "type": "CAELEC", "state": "ALL", "questionId": f"CAELEC-{seg}-{i:03d}",
            "category": key, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            longest = len(k) > max(len(w) for w in wrong)
            if len(k) > 1.2 * lw or longest:
                print(f"{key} {i:03d} key {len(k)} vs {lw:.0f}{' LONGEST' if longest else ''}: {k} | {wrong}")
args = [a for a in sys.argv[1:] if not a.startswith("--")]
out = args[0] if args else DEFAULT_OUT
json.dump(rows, open(out, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(out, "a").write("\n")
print(len(rows), "rows ->", out)
