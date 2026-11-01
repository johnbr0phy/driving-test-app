"""Build data/spain-dgt-questions_es.json from the English bank plus the Spanish text in t_*.py.

Run from the repo root:  python3 -I tools/next100/esdgt/es/build.py
Every structural field (questionId, order, type, state, category, correctAnswer, correctIndex)
is copied from data/spain-dgt-questions.json; only question, option and explanation text come
from the t_*.py sources. Then it runs the checks in check.py and refuses to write on failure.
"""
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
sys.path.insert(0, HERE)

import check  # noqa: E402
from t_lic_sgn import T as T1  # noqa: E402
from t_mrk_pri import T as T2  # noqa: E402
from t_spd_ovt import T as T3  # noqa: E402
from t_prk_lgt_saf import T as T4  # noqa: E402

BASE = os.path.join(ROOT, "data", "spain-dgt-questions.json")
OUT = os.path.join(ROOT, "data", "spain-dgt-questions_es.json")


def main() -> int:
    text: dict = {}
    for part in (T1, T2, T3, T4):
        dup = set(part) & set(text)
        if dup:
            print("duplicate ids in sources:", sorted(dup))
            return 1
        text.update(part)

    base = json.load(open(BASE, encoding="utf-8"))
    missing = [q["questionId"] for q in base if q["questionId"] not in text]
    extra = sorted(set(text) - {q["questionId"] for q in base})
    if missing or extra:
        print("missing:", missing, "extra:", extra)
        return 1

    out = []
    for q in base:
        t = text[q["questionId"]]
        if len(t) != 6:
            print(q["questionId"], "needs 6 fields")
            return 1
        row = dict(q)
        row["question"], row["optionA"], row["optionB"], row["optionC"], row["optionD"], row["explanation"] = t
        out.append(row)

    errors = check.check(base, out)
    if errors:
        print("\n".join(errors))
        print(f"FAIL: {len(errors)} problem(s); nothing written")
        return 1
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"wrote {OUT} ({len(out)} questions)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
