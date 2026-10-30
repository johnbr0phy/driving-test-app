import json, os, statistics, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from q_licence import ITEMS as LICENCE
from q_signs import ITEMS as SIGNS
from q_markings import ITEMS as MARKINGS
from q_rules import ITEMS as RULES
from q_motorway import ITEMS as MOTORWAY
from q_users import ITEMS as USERS
from q_safety import ITEMS as SAFETY
from q_conditions import ITEMS as CONDITIONS

# (category key, ID segment, items, pool). Pool = 5 tests x per-test count.
CATS = [
    ("iedttLicence", "LIC", LICENCE, 20),
    ("iedttSigns", "SGN", SIGNS, 40),
    ("iedttMarkings", "MRK", MARKINGS, 20),
    ("iedttRules", "ROW", RULES, 40),
    ("iedttMotorway", "MWY", MOTORWAY, 15),
    ("iedttUsers", "USR", USERS, 25),
    ("iedttSafety", "SAF", SAFETY, 25),
    ("iedttConditions", "CON", CONDITIONS, 15),
]
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
            "type": "IEDTT", "state": "ALL", "questionId": f"IEDTT-{seg}-{i:03d}",
            "category": key, "question": stem,
            "optionA": opts[0], "optionB": opts[1], "optionC": opts[2], "optionD": opts[3],
            "correctAnswer": "ABCD"[pos], "correctIndex": pos, "explanation": expl,
        })
        if report:
            lw = statistics.mean(len(w) for w in wrong)
            longest = len(k) > max(len(w) for w in wrong)
            if len(k) > 1.2 * lw or longest:
                print(f"{seg}-{i:03d} key {len(k)} vs {lw:.0f}{' LONGEST' if longest else ''}: {k} | {wrong}")
args = [a for a in sys.argv[1:] if not a.startswith("--")]
out = args[0] if args else os.path.join(HERE, "..", "..", "..", "data", "ireland-driver-theory-questions.json")
json.dump(rows, open(out, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
open(out, "a").write("\n")
print(len(rows), "rows ->", os.path.normpath(out))
