#!/usr/bin/env python3
"""Build data/v2/nswsel/questions.json from the sources in tools/nswsel/.

Usage (from the repo root): python3 -I tools/nswsel/maths.py && python3 -I tools/nswsel/build.py

Sources: reading.json + reading_stimuli.json (Reading, kept in source order so
each text's questions stay together in the order written), maths.json (built
by maths.py) and thinking.json. Maths and Thinking Skills items are ordered
easy to hard, with their domains interleaved at each difficulty. Ids are
assigned here: NSWS-T1-001.. for Practice Test 1, -T2-.. for Test 2 and
-D-.. for drill-only items (test 0); the session builder orders a test by id.
"""
import json, os

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(SRC))
PREFIX = "NSWS"
SECTIONS = [("reading", "reading.json", False), ("maths", "maths.json", True), ("thinking", "thinking.json", True)]
SOURCE_ONLY = {"domain", "test", "skill", "difficulty", "format"}


def load(name):
    return json.load(open(os.path.join(SRC, name)))


def ordered(items, by_difficulty):
    if not by_difficulty:
        return items
    domains = sorted({q["domain"] for q in items}, key=lambda d: [q["domain"] for q in items].index(d))
    keyed = []
    for di, d in enumerate(domains):
        mine = [q for q in items if q["domain"] == d]
        for i, q in enumerate(mine):
            keyed.append(((q["difficulty"], (i + 0.5) / len(mine), di), q))
    keyed.sort(key=lambda k: k[0])
    return [q for _, q in keyed]


def main():
    stimuli = load("reading_stimuli.json")
    sources = {sec: load(f) for sec, f, _ in SECTIONS}
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, _, by_diff in SECTIONS:
            mine = [q for q in sources[section] if q["test"] == test]
            for q in ordered(mine, by_diff):
                n += 1
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"]}
                if q.get("skill"):
                    item["skill"] = q["skill"]
                item.update({k: v for k, v in q.items() if k not in SOURCE_ONLY})
                out.append(item)
    dst = os.path.join(ROOT, "data/v2/nswsel/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"nswsel: wrote {len(out)} questions, {len(stimuli)} stimuli -> {dst}")


if __name__ == "__main__":
    main()
