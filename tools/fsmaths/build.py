#!/usr/bin/env python3
"""Build the Functional Skills Maths Level 2 bank and its Basics skills.

Usage (from the repo root): python3 -I tools/fsmaths/build.py

Writes data/v2/fsmaths/questions.json (a plain array of QuestionV2) from the
q_*.py sources, and data/v2/basics/fsmaths.json from basics.py. Ids follow
tools/build_v2_bank.py: FSM-T1-001.. per test and FSM-D-001.. for drill-only
items, numbered section by section with the four domains interleaved, since
the session builder orders a test section by id. Then run
  python3 -I tools/validate_v2_bank.py fsmaths '{"1": {"a": {"1": 10}, "b": {"1": 30}}, "2": {"a": {"1": 10}, "b": {"1": 30}}}'
"""
import json, os, re, sys, collections

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import q_number, q_percent, q_measure, q_data, basics  # noqa: E402

ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
DOMAINS = ["fsmNumber", "fsmPercent", "fsmMeasure", "fsmData"]
SECTIONS = ["a", "b"]
PLAN = {1: {"a": 10, "b": 30}, 2: {"a": 10, "b": 30}}
SOURCE_ONLY = {"domain", "test", "section", "skill", "difficulty", "format"}
US = re.compile(r"\b(color|center|meter|liter|gray|favorite|neighbor|percent(?!age)|math\b|practicing|analyze|organize|program\b)", re.I)


def build():
    items = q_number.ITEMS + q_percent.ITEMS + q_measure.ITEMS + q_data.ITEMS
    problems = []
    out = []
    for test in [1, 2, 0]:
        tag = f"T{test}" if test else "D"
        n = 0
        for sec in SECTIONS:
            blocks = []
            for di, d in enumerate(DOMAINS):
                mine = [q for q in items if q["domain"] == d and q["test"] == test and q["section"] == sec]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            if test and len(blocks) != PLAN[test][sec]:
                problems.append(f"test {test} section {sec}: {len(blocks)} items, want {PLAN[test][sec]}")
            for _, _, q in blocks:
                n += 1
                row = {"id": f"FSM-{tag}-{n:03d}", "section": q["section"], "test": test, "module": 1,
                       "domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
                row.update({k: v for k, v in q.items() if k not in SOURCE_ONLY})
                if sec == "b":
                    row["calculator"] = True
                out.append(row)
    for q in out:
        texts = [q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", [])]
        for t in texts:
            if "—" in t or "–" in t or "’" in t or "“" in t:
                problems.append(f"{q['id']}: dash or curly quote in {t[:50]!r}")
            if "$" in t:
                problems.append(f"{q['id']}: dollar sign")
            m = US.search(t)
            if m:
                problems.append(f"{q['id']}: US spelling {m.group(0)!r}")
        if q["format"] == "single":
            key = q["options"][q["correct"][0]]
            others = [o for i, o in enumerate(q["options"]) if i != q["correct"][0]]
            if len(key) > max(len(o) for o in others) + 2:
                problems.append(f"{q['id']}: key is the longest option ({key!r})")
        if q["format"] == "numeric":
            for a in q["numeric"]["answers"]:
                if re.match(r"^-?\d+\s+\d+/\d+$", a.strip()):
                    problems.append(f"{q['id']}: mixed number answer {a!r}")
    os.makedirs(os.path.join(ROOT, "data/v2/fsmaths"), exist_ok=True)
    with open(os.path.join(ROOT, "data/v2/fsmaths/questions.json"), "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    with open(os.path.join(ROOT, "data/v2/basics/fsmaths.json"), "w") as f:
        json.dump(basics.SKILLS, f, indent=2, ensure_ascii=False)
        f.write("\n")

    # Report
    by = collections.Counter((q["test"], q["section"], q["domain"]) for q in out)
    print(f"fsmaths: {len(out)} questions, {len(basics.SKILLS)} Basics skills")
    for d in DOMAINS:
        print(f"  {d}: " + ", ".join(f"T{t}{s}={by[(t, s, d)]}" for t in (1, 2) for s in SECTIONS) + f", drill={by[(0, 'b', d)]}, total={sum(v for k, v in by.items() if k[2] == d)}")
    fm = collections.Counter(q["format"] for q in out)
    print("  formats:", dict(fm))
    keys = collections.Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-answer key slots:", dict(sorted(keys.items())))
    skill_ids = {s["id"] for s in basics.SKILLS}
    tags = collections.Counter(q.get("basics") for q in out)
    for t in tags:
        if t and t not in skill_ids:
            problems.append(f"basics tag {t} has no skill")
    print("  basics tags:", sum(v for k, v in tags.items() if k), "tagged,", tags[None], "untagged")
    for s in basics.SKILLS:
        for k in ("id", "name", "sub", "rule", "trick", "examples", "another", "walkthrough", "questions"):
            if k not in s:
                problems.append(f"basics {s['id']}: missing {k}")
        for qq in s["questions"]:
            if not 0 <= qq["answer"] < len(qq["options"]):
                problems.append(f"basics {s['id']}: bad answer index")
        for st in s["walkthrough"]["steps"]:
            if "ask" in st and not 0 <= st["answer"] < len(st["options"]):
                problems.append(f"basics {s['id']}: bad walkthrough answer")
        blob = json.dumps(s, ensure_ascii=False)
        if "—" in blob or "’" in blob or "$" in blob:
            problems.append(f"basics {s['id']}: em dash, curly quote or dollar")
        m = US.search(blob.replace('"kind": "math"', ""))
        if m:
            problems.append(f"basics {s['id']}: US spelling {m.group(0)!r}")
    for p in problems:
        print("  -", p)
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(build())
