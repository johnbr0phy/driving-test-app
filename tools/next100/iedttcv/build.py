"""Build data/ireland-truck-bus-theory-questions.json from the q_*.py sources.

Usage: python3 -I tools/next100/iedttcv/build.py [out.json] [--report]
Keys are written as the first option in the sources; each item is placed in slot (i-1) % 4 of
its segment, so A, B, C and D each hold the key 25% of the time.
"""
import json, os, statistics, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_licence import ITEMS as LICENCE
from q_hours import ITEMS as HOURS
from q_tacho import ITEMS as TACHO
from q_brakes import ITEMS as BRAKES
from q_loads import ITEMS as LOADS
from q_passengers import ITEMS as PASSENGERS
from q_road import ITEMS as ROAD
from q_safety import ITEMS as SAFETY
from q_emergencies import ITEMS as EMERGENCIES

# (category key, ID segment, items, pool). Pool = 4 tests x per-test count.
CATS = [
    ("iedttcvLicence", "LIC", LICENCE, 16),
    ("iedttcvHours", "HRS", HOURS, 28),
    ("iedttcvTacho", "TAC", TACHO, 20),
    ("iedttcvBrakes", "BRK", BRAKES, 28),
    ("iedttcvLoads", "LOD", LOADS, 24),
    ("iedttcvPassengers", "PSG", PASSENGERS, 24),
    ("iedttcvRoad", "ROD", ROAD, 28),
    ("iedttcvSafety", "SAF", SAFETY, 20),
    ("iedttcvEmergencies", "EMG", EMERGENCIES, 12),
]
rows = []
report = "--report" in sys.argv
bad = False
longest_n = 0
for key, seg, items, n in CATS:
    if len(items) != n:
        print(f"{key}: {len(items)} items, want {n}")
        bad = True
    for i, it in enumerate(items, 1):
        stem, k, w1, w2, w3, expl = it
        pos = (i - 1) % 4
        wrong = [w1, w2, w3]
        opts = wrong[:pos] + [k] + wrong[pos:]
        rows.append({
            "type": "IEDTTCV", "state": "ALL", "questionId": f"IEDTTCV-{seg}-{i:03d}",
            "category": key, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        longest = len(k) > max(len(w) for w in wrong)
        longest_n += longest
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            if len(k) > 1.2 * lw or longest:
                print(f"{seg}-{i:03d} key {len(k)} vs {lw:.0f}{' LONGEST' if longest else ''}: {k} | {wrong}")
args = [a for a in sys.argv[1:] if not a.startswith("--")]
out = args[0] if args else os.path.join(HERE, "..", "..", "..", "data", "ireland-truck-bus-theory-questions.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(len(rows), "rows ->", os.path.normpath(out), f"| key strictly longest: {longest_n}/{len(rows)} ({100*longest_n/len(rows):.1f}%)")
sys.exit(1 if bad else 0)
