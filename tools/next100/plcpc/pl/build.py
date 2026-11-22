"""Build data/poland-driver-cpc-questions_pl.json from the English bank plus the Polish text in t_*.py.

Run from the repo root:  python3 -I tools/next100/plcpc/pl/build.py
Every structural field (questionId, order, type, state, category, correctAnswer, correctIndex)
is copied from data/poland-driver-cpc-questions.json; only question, option and explanation text
come from the t_*.py sources. Refuses to write if an id is missing, extra or malformed.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
sys.path.insert(0, HERE)

from t_eco_brk import T as T1  # noqa: E402
from t_hrs_tac import T as T2  # noqa: E402
from t_saf_img import T as T3  # noqa: E402
from t_lod_prl import T as T4  # noqa: E402

BASE = os.path.join(ROOT, "data", "poland-driver-cpc-questions.json")
OUT = os.path.join(ROOT, "data", "poland-driver-cpc-questions_pl.json")
GENDERED = re.compile(r"\b(powinieneś|powinnaś|mógłbyś|zrobiłeś|byłeś)\b")


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
    out, bad = [], 0
    for q in base:
        t = text[q["questionId"]]
        if len(t) != 6 or len(set(t[1:5])) != 4:
            print(q["questionId"], "needs 6 fields and 4 distinct options")
            bad += 1
            continue
        if any("—" in x or " – " in x for x in t) or any(GENDERED.search(x) for x in t):
            print(q["questionId"], "dash or gendered form")
            bad += 1
        row = dict(q)
        row["question"], row["optionA"], row["optionB"], row["optionC"], row["optionD"], row["explanation"] = t
        out.append(row)
    if bad:
        return 1
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(len(out), "rows ->", os.path.relpath(OUT, ROOT))
    return 0


if __name__ == "__main__":
    sys.exit(main())
