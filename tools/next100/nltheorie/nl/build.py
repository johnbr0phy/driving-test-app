"""Build data/netherlands-driving-theory-questions_nl.json from the English bank plus the Dutch text in t_*.py.

Run from the repo root:  python3 -I tools/next100/nltheorie/nl/build.py
Every structural field (questionId, order, type, state, category, correctAnswer, correctIndex)
is copied from data/netherlands-driving-theory-questions.json. Each t_<name>.py mirrors
../q_<name>.py item by item (stem, key, the three wrong answers in the English order,
explanation); the key goes in the base row's correctIndex and the wrong answers fill the other
slots in order, so the option order is the English one. Checks that the English source still
matches the built English bank, then runs check.py and refuses to write on failure.
Set PARTIAL=1 to build only the categories written so far (checks only, nothing written).
"""
import importlib.util
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
EN = os.path.dirname(HERE)
ROOT = os.path.abspath(os.path.join(HERE, "..", "..", "..", ".."))
sys.path.insert(0, HERE)

import check  # noqa: E402

ORDER = ["road", "parking", "priority", "special", "safety", "signs", "hazard", "law", "vehicle"]
BASE = os.path.join(ROOT, "data", "netherlands-driving-theory-questions.json")
OUT = os.path.join(ROOT, "data", "netherlands-driving-theory-questions_nl.json")
PARTIAL = os.environ.get("PARTIAL") == "1"


def load(path, name):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main() -> int:
    base = json.load(open(BASE, encoding="utf-8"))
    by_id = {q["questionId"]: q for q in base}
    text = {}
    for m in ORDER:
        p = os.path.join(HERE, f"t_{m}.py")
        if PARTIAL and not os.path.exists(p):
            continue
        en = load(os.path.join(EN, f"q_{m}.py"), "en_" + m)
        nl = load(p, "nl_" + m)
        if (nl.CAT, nl.SEG) != (en.CAT, en.SEG) or len(nl.Q) != len(en.Q):
            print(f"{m}: CAT/SEG or count differ ({len(nl.Q)} vs {len(en.Q)})")
            return 1
        for i, (q, key, wrong, expl) in enumerate(nl.Q):
            qid = f"NLTH-{en.SEG}-{i + 1:03d}"
            b = by_id[qid]
            ek = en.Q[i][1]
            if b["option" + b["correctAnswer"]] != ek:
                print(f"{qid}: English source and bank differ; rebuild the English bank first")
                return 1
            if len(wrong) != 3:
                print(f"{qid}: needs three wrong answers")
                return 1
            opts = list(wrong)
            opts.insert(b["correctIndex"], key)
            text[qid] = (q, *opts, expl)

    out = []
    for b in base:
        if b["questionId"] not in text:
            if PARTIAL:
                continue
            print("missing:", b["questionId"])
            return 1
        row = dict(b)
        row["question"], row["optionA"], row["optionB"], row["optionC"], row["optionD"], row["explanation"] = text[b["questionId"]]
        out.append(row)

    sub = [b for b in base if b["questionId"] in text]
    errors = check.check(sub, out)
    if errors:
        print("\n".join(errors))
        print(f"FAIL: {len(errors)} problem(s); nothing written")
        return 1
    if PARTIAL:
        print(f"PARTIAL OK: {len(out)} questions checked, nothing written")
        return 0
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"wrote {OUT} ({len(out)} questions)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
