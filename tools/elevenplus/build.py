#!/usr/bin/env python3
"""Build the 11+ v2 bank and its Basics skills.

Run from the repo root:  python3 -I tools/elevenplus/build.py

Sources are the q_*.py modules beside this file (every computed key is asserted
there) and basics.py. Writes data/v2/elevenplus/questions.json in object form
{ stimuli, questions } and data/v2/basics/elevenplus.json. Ids are assigned here
in paper order: English (comprehension passages first, then spelling,
punctuation and grammar), Maths (number and problem solving alternating, easy
to hard), Verbal Reasoning (grouped by question type, as on the real paper).
"""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
os.chdir(os.path.join(HERE, "..", ".."))

import q_reading, q_spag, q_maths, q_vr_words, q_vr_codes, basics  # noqa: E402

PREFIX = "ELEVEN"
SECTION = {
    "elevenplusReading": "english", "elevenplusSpag": "english",
    "elevenplusNumber": "maths", "elevenplusProblem": "maths",
    "elevenplusVrWords": "vr", "elevenplusVrCodes": "vr",
}
VR_ORDER = ["Closest meaning", "Letter series", "Opposite meaning", "Letter analogies", "Hidden words", "Letter codes",
            "Move a letter", "Word and number codes", "Compound words", "Number series", "Missing three letters",
            "Letter sums", "Odd two out", "Related numbers", "Word analogies", "Logic"]
SOURCE_ONLY = {"domain", "test", "skill", "difficulty", "format"}

ALL = q_reading.ITEMS + q_spag.ITEMS + q_maths.ITEMS + q_vr_words.ITEMS + q_vr_codes.ITEMS


def ordered(test):
    mine = [q for q in ALL if q["test"] == test]
    eng_r = [q for q in mine if q["domain"] == "elevenplusReading"]  # source order keeps passages together
    eng_s = [q for q in mine if q["domain"] == "elevenplusSpag"]
    num = sorted([q for q in mine if q["domain"] == "elevenplusNumber"], key=lambda q: q["difficulty"])
    prob = sorted([q for q in mine if q["domain"] == "elevenplusProblem"], key=lambda q: q["difficulty"])
    maths = []
    for i in range(max(len(num), len(prob))):
        maths += num[i:i + 1] + prob[i:i + 1]
    maths.sort(key=lambda q: q["difficulty"])  # stable: keeps the alternation within each difficulty
    vr = sorted([q for q in mine if SECTION[q["domain"]] == "vr"], key=lambda q: VR_ORDER.index(q["skill"]))
    return eng_r + eng_s + maths + vr


def build():
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        for n, q in enumerate(ordered(test), 1):
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION[q["domain"]], "test": test, "module": 1,
                    "domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
            item.update({k: v for k, v in q.items() if k not in SOURCE_ONLY})
            out.append(item)
    used = {q.get("stimulusId") for q in out}
    stimuli = [s for s in q_reading.STIMULI if s["id"] in used]
    os.makedirs("data/v2/elevenplus", exist_ok=True)
    with open("data/v2/elevenplus/questions.json", "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    with open("data/v2/basics/elevenplus.json", "w") as f:
        json.dump(basics.SKILLS, f, indent=1, ensure_ascii=False)
        f.write("\n")
    ids = {s["id"] for s in basics.SKILLS}
    bad = {q["basics"] for q in out if q.get("basics") and q["basics"] not in ids}
    assert not bad, bad
    print(f"elevenplus: wrote {len(out)} questions, {len(stimuli)} stimuli, {len(basics.SKILLS)} basics skills")


if __name__ == "__main__":
    build()
