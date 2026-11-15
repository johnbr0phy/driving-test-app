#!/usr/bin/env python3
"""Build the NZ IQN Theoretical Examination (registered nurse) v2 bank.

Usage: python3 -I tools/next100/nziqn/build.py

The Nursing Council's handbook (v1.5, October 2026) says every question is
multiple choice with one correct answer and that a calculator is provided in
the software for calculation questions. So Part A (medication safety) is
four-option multiple choice too: calculation items list numbers, which the
build sorts ascending and locks (lockedOrder), and the safety items are
shuffled like Part B.

Sources are Python files src_<domain>.py, each defining ITEMS, a list of:
  ("S", test, difficulty, skill, stem, [key, d1, d2, d3], explanation)
  ("L", test, difficulty, skill, stem, [key, d1, d2, d3], explanation)
test is 1, 2 or 0 (drill only). "S" items are shuffled with a seed taken
from the stem, so key positions spread out and stay stable from build to
build (the app shuffles again at runtime). "L" items are all-number options:
they are sorted by value and locked, so the key sits where its value falls.

Ids: NZIQN-T1-001.., -T2-.., -D-.., Part A first, then Part B with its
domains interleaved so a test reads like a mixed paper.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "nziqn"
PREFIX = "NZIQN"
SECTIONS = {
    "iqnA": ["iqnMeds"],
    "iqnB": ["iqnMaori", "iqnCultural", "iqnComms", "iqnAssess", "iqnClinical", "iqnCare", "iqnLead"],
}
# Per practice test. Part A is the real 12; Part B is half of the real 108,
# split by Tigertest across the six pou (the Council publishes no weights).
PLAN = {
    "iqnMeds": 12,
    "iqnMaori": 5, "iqnCultural": 5, "iqnComms": 8, "iqnAssess": 10,
    "iqnClinical": 12, "iqnCare": 7, "iqnLead": 7,
}
DRILL_ONLY = {
    "iqnMeds": 14,
    "iqnMaori": 5, "iqnCultural": 5, "iqnComms": 8, "iqnAssess": 10,
    "iqnClinical": 12, "iqnCare": 7, "iqnLead": 7,
}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
NUM = re.compile(r"^-?[0-9]+(\.[0-9]+)?")


def value(opt):
    m = NUM.match(opt.replace(",", ""))
    if not m:
        raise ValueError(f"locked option {opt!r} does not start with a number")
    return float(m.group(0))


def load(domain):
    path = os.path.join(HERE, f"src_{domain}.py")
    scope = {}
    exec(compile(open(path).read(), path, "exec"), scope)
    out = []
    for t in scope["ITEMS"]:
        kind, test, diff, skill, stem, opts, expl = t
        out.append({"kind": kind, "test": test, "difficulty": diff, "skill": skill, "format": "single",
                    "stem": stem, "options": list(opts), "correct": [0], "explanation": expl})
    return out


def arrange(q):
    out = dict(q)
    if q["kind"] == "L":
        order = sorted(range(len(q["options"])), key=lambda i: value(q["options"][i]))
        out["lockedOrder"] = True
    else:
        seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
        order = list(range(len(q["options"])))
        random.Random(seed).shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate options")
    if not q["stem"].rstrip().endswith(("?", ":")):
        warn.append("stem does not end in ? or :")
    if q["kind"] == "L":
        vals = [value(o) for o in q["options"]]
        if len(set(vals)) != 4:
            warn.append("locked options share a value")
    key = len(q["options"][0])
    others = sorted((len(o) for o in q["options"][1:]), reverse=True)
    if q["kind"] == "S" and key > others[0] * 1.25 and key - others[0] > 10:
        warn.append(f"key clearly longest ({key} vs {others[0]})")
    return [f"{where}: {w}" for w in warn]


def build():
    domains = [d for ds in SECTIONS.values() for d in ds]
    items, warnings = {}, []
    for d in domains:
        src = load(d)
        for i, q in enumerate(src):
            warnings += lint(q, f"{d}[{i}] {q['stem'][:50]!r}")
            q["domain"] = d
        items[d] = src
        for test, want in ((1, PLAN[d]), (2, PLAN[d]), (0, DRILL_ONLY[d])):
            got = sum(1 for q in src if q["test"] == test)
            if got != want:
                warnings.append(f"{d} test {test}: {got} items, plan {want}")
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, sec_domains in SECTIONS.items():
            blocks = []
            for di, d in enumerate(sec_domains):
                mine = [q for q in items[d] if q["test"] == test]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                q = arrange(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"]}
                if section == "iqnA":
                    item["calculator"] = True
                item["stem"] = q["stem"]
                item["options"] = q["options"]
                item["correct"] = q["correct"]
                if q.get("lockedOrder"):
                    item["lockedOrder"] = True
                item["explanation"] = q["explanation"]
                out.append(item)
    stems = Counter(q["stem"] for q in out)
    warnings += [f"duplicate stem: {s[:60]!r}" for s, c in stems.items() if c > 1]
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in domains]
        print(f"  test {test}: {row} = {sum(row)}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    longest = sum(1 for q in out if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]))
    print(f"  key strictly longest: {longest}/{len(out)} = {100 * longest / len(out):.1f}%")
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
