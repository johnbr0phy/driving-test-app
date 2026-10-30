#!/usr/bin/env python3
"""Build data/v2/vicsel/questions.json from the sources in tools/vicsel/.

Usage (from the repo root): python3 -I tools/vicsel/build.py

Sources: maths.py and quant.py (section "mathsqr"), reading.py and verbal.py
(section "readingvr"). Each source holds tuples; this script places the key in
a rotating slot (A to D evenly), assigns ids and writes the object form
{ stimuli, questions }. Within a test the Mathematics items come first, easy to
hard, then Quantitative Reasoning, easy to hard; Reading keeps each text's
questions together in source order, then Verbal Reasoning, easy to hard.
Ids: VICSEL-T1-001.. (Practice Test 1), -T2-.. (Test 2), -D-.. (drill only,
test 0); the session builder orders a test by id.

It also prints house-style warnings: a key longer than every distractor, an
em-dash, "all/none of the above", or a duplicate option.
"""
import json, os, runpy

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(SRC))
PREFIX = "VICSEL"
SLOTS = [0, 2, 1, 3, 2, 0, 3, 1]


def load(name):
    return runpy.run_path(os.path.join(SRC, name))


def place(key, distractors, i):
    slot = SLOTS[i % len(SLOTS)]
    opts = list(distractors)
    opts.insert(slot, key)
    return opts, slot


def warn(where, stem, key, distractors, explanation):
    probs = []
    if len(key) > max(len(d) for d in distractors) + 8:
        probs.append(f"key longer than distractors ({len(key)} vs {max(len(d) for d in distractors)})")
    text = " ".join([stem, key, explanation, *distractors])
    if "—" in text:
        probs.append("em-dash")
    if "of the above" in text.lower():
        probs.append("all/none of the above")
    if len({key, *distractors}) != 1 + len(distractors):
        probs.append("duplicate option")
    for p in probs:
        print(f"  WARN {where}: {p}: {stem[:60]}")


def main():
    reading = load("reading.py")
    stim_src = reading["STIMULI"]
    pools = {
        "vicselMaths": [dict(zip(("test", "skill", "difficulty", "basics", "stem", "key", "distractors", "explanation"), t))
                        for t in load("maths.py")["ITEMS"]],
        "vicselQuant": [dict(zip(("test", "skill", "difficulty", "basics", "stem", "key", "distractors", "explanation"), t))
                        for t in load("quant.py")["ITEMS"]],
        "vicselVerbal": [dict(zip(("test", "skill", "difficulty", "basics", "stem", "key", "distractors", "explanation"), t))
                         for t in load("verbal.py")["ITEMS"]],
        "vicselReading": [dict(zip(("stim", "test", "skill", "difficulty", "basics", "stem", "key", "distractors", "explanation"), t))
                          for t in reading["ITEMS"]],
    }
    # Rotate key slots per domain across the whole pool.
    for dom, items in pools.items():
        for i, q in enumerate(items):
            q["options"], q["correct"] = place(q["key"], q["distractors"], i)
            warn(dom, q["stem"], q["key"], q["distractors"], q["explanation"])

    def by_diff(items):
        return sorted(items, key=lambda q: q["difficulty"])  # stable: source order within a level

    layout = [
        ("mathsqr", "vicselMaths", True),
        ("mathsqr", "vicselQuant", True),
        ("readingvr", "vicselReading", False),
        ("readingvr", "vicselVerbal", True),
    ]
    stimuli, used = [], set()
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, dom, sort in layout:
            mine = [q for q in pools[dom] if q["test"] == test]
            for q in (by_diff(mine) if sort else mine):
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": dom, "skill": q["skill"], "difficulty": q["difficulty"], "format": "single"}
                if q.get("basics"):
                    item["basics"] = q["basics"]
                if q.get("stim"):
                    sid = f"{PREFIX}-{q['stim']}"
                    item["stimulusId"] = sid
                    if sid not in used:
                        used.add(sid)
                        title, text = stim_src[q["stim"]]
                        stimuli.append({"id": sid, "title": title, "text": text.strip()})
                item.update({"stem": q["stem"], "options": q["options"], "correct": [q["correct"]],
                             "explanation": q["explanation"]})
                out.append(item)
    dst = os.path.join(ROOT, "data/v2/vicsel/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = {}
    for q in out:
        counts[(q["test"], q["domain"])] = counts.get((q["test"], q["domain"]), 0) + 1
    print(f"vicsel: wrote {len(out)} questions, {len(stimuli)} stimuli -> {dst}")
    for k in sorted(counts):
        print(f"  test {k[0]} {k[1]}: {counts[k]}")
    keys = [q["correct"][0] for q in out]
    print("  key slots A-D:", [keys.count(i) for i in range(4)])


if __name__ == "__main__":
    main()
