#!/usr/bin/env python3
"""Build data/v2/ks2/questions.json from the KS2 source files in tools/ks2/.

Run from the repo root:  python3 -I tools/ks2/build.py
(then python3 -I tools/ks2/basics.py for the Basics skills)

Sections: reading (module 1), gps (module 1), maths (module 1 arithmetic,
module 2 reasoning Paper 2, module 3 reasoning Paper 3). Ids run in paper
order inside each test (KS2-T1-001..., KS2-T2-..., KS2-D-... drill only), so
the session builder, which sorts a stage by id, keeps each reading text's
questions together and each paper in its easy-to-hard order.
"""
import json, os, re, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import reading, gps, arithmetic, reasoning  # noqa: E402

def check_numeric(q):
    """parseNumeric (lib/v2/grading.ts) strips spaces, commas, a leading £/$/€ and a
    trailing %, nothing else: "13cm" cannot even be submitted, so unit forms are never
    accepted answers. Stems name the unit and say "Type the number only" instead."""
    for a in q["numeric"]["answers"]:
        # spaces are stripped, so "1 1/4" would read as 11/4: never accept a mixed number
        assert re.match(r"^-?(\d+(\.\d+)?|\.\d+|\d+/\d+)$", a), (q["stem"], a)


def rotate(q, k):
    """Spread keys across letters: rotate a single/multi item's options by k."""
    n = len(q["options"])
    k %= n
    if not k:
        return
    q["options"] = q["options"][-k:] + q["options"][:-k]
    q["correct"] = sorted((c + k) % n for c in q["correct"])


def key_check(q, warn):
    if q["format"] != "single":
        return
    key = q["options"][q["correct"][0]]
    others = [o for i, o in enumerate(q["options"]) if i != q["correct"][0]]
    if len(key) > max(len(o) for o in others) * 1.15 + 3:
        warn.append(f"{q['id']}: key longest: {key!r}")


def main():
    tests = {
        1: [("reading", 1, reading.T1), ("gps", 1, gps.T1), ("maths", 1, arithmetic.T1),
            ("maths", 2, reasoning.T1_P2), ("maths", 3, reasoning.T1_P3)],
        2: [("reading", 1, reading.T2), ("gps", 1, gps.T2), ("maths", 1, arithmetic.T2),
            ("maths", 2, reasoning.T2_P2), ("maths", 3, reasoning.T2_P3)],
        0: [("reading", 1, reading.DRILL), ("gps", 1, gps.DRILL), ("maths", 1, arithmetic.DRILL),
            ("maths", 1, reasoning.DRILL)],
    }
    out, warn = [], []
    for test, parts in tests.items():
        tag = f"T{test}" if test else "D"
        n = 0
        for section, module, items in parts:
            for src in items:
                n += 1
                q = {"id": f"KS2-{tag}-{n:03d}", "section": section, "test": test, "module": module}
                q.update(json.loads(json.dumps(src)))
                if q["format"] in ("single", "multi"):
                    rotate(q, n)
                if q["format"] == "numeric":
                    check_numeric(q)
                key_check(q, warn)
                out.append(q)
    dst = "data/v2/ks2/questions.json"
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": reading.STIMULI, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"ks2: wrote {len(out)} questions, {len(reading.STIMULI)} stimuli -> {dst}")
    for w in warn:
        print("  warn", w)


if __name__ == "__main__":
    main()
