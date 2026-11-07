"""Build data/malta-driver-cpc-questions.json from the q_*.py sources.

Usage: python3 -I tools/next100/mtcpc/build.py [out.json] [--report]
Keys are written as the first option in the sources; each item is placed in slot (i-1) % 4 of
its segment, so A, B, C and D each hold the key 25% of the time.
"""
import json, os, statistics, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_eco import ITEMS as ECO
from q_brakes import ITEMS as BRAKES
from q_risk import ITEMS as RISK
from q_loads import ITEMS as LOADS
from q_passengers import ITEMS as PASSENGERS
from q_hours import ITEMS as HOURS
from q_tacho import ITEMS as TACHO
from q_rules import ITEMS as RULES
from q_health import ITEMS as HEALTH
from q_emergency import ITEMS as EMERGENCY

# (category key, ID segment, items, pool). Pool = 4 tests x per-test count.
CATS = [
    ("mtcpcEco", "ECO", ECO, 20),
    ("mtcpcBrakes", "BRK", BRAKES, 20),
    ("mtcpcRisk", "RSK", RISK, 20),
    ("mtcpcLoads", "LOD", LOADS, 24),
    ("mtcpcPassengers", "PSG", PASSENGERS, 24),
    ("mtcpcHours", "HRS", HOURS, 28),
    ("mtcpcTacho", "TAC", TACHO, 20),
    ("mtcpcRules", "DOC", RULES, 16),
    ("mtcpcHealth", "HLT", HEALTH, 12),
    ("mtcpcEmergency", "EMG", EMERGENCY, 16),
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
            "type": "MTCPC", "state": "ALL", "questionId": f"MTCPC-{seg}-{i:03d}",
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
out = args[0] if args else os.path.join(HERE, "..", "..", "..", "data", "malta-driver-cpc-questions.json")
with open(out, "w", encoding="utf-8") as f:
    json.dump(rows, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(len(rows), "rows ->", os.path.normpath(out), f"| key strictly longest: {longest_n}/{len(rows)} ({100*longest_n/len(rows):.1f}%)")
sys.exit(1 if bad else 0)
