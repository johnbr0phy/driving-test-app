#!/usr/bin/env python3
"""Build the FAA Instrument Rating Airplane (IRA) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/faaifr/build.py

Sources are Python data files in tools/next100/faaifr/<domain>.py, one per drill
domain. Each calls S(test, difficulty, skill, stem, [key, d1, d2], expl):
test is 1, 2 or 0 (drill only), difficulty 1 to 3, and the correct option is
always written first. The build shuffles options with a seed taken from the
stem, so key positions spread out and stay stable from build to build. Every
item has three options, like the real FAA knowledge test (A, B, C). When all three
options start with a number they are sorted ascending and locked (lockedOrder).

Ids follow tools/build_v2_bank.py: FAAIFR-T1-001.., -T2-001.., -D-001..;
within a test the domains interleave.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", duplicate stems or options, option count != 3.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "faaifr"
PREFIX = "FAAIFR"
SECTION = "ira"
DOMAINS = ["ifrRegs", "ifrWeather", "ifrWxServices", "ifrInstruments", "ifrNav", "ifrAtc", "ifrApproaches", "ifrHuman"]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))


def S(t, d, skill, stem, opts, expl):
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


def esc(s):
    return s.replace("\\$", "$").replace("$", "\\$")


NUM = re.compile(r"^(?:About )?(\d+ \d+/\d+|\d+/\d+|[\d,]+(?:\.\d+)?)")


def numval(o):
    m = NUM.match(o)
    if not m:
        return None
    s = m.group(1).replace(",", "")
    if " " in s:
        w, f = s.split(" ")
        a, b = f.split("/")
        return int(w) + int(a) / int(b)
    if "/" in s:
        a, b = s.split("/")
        return int(a) / int(b)
    return float(s)


def shuffled(q):
    vals = [numval(o) for o in q["options"]]
    if all(v is not None for v in vals) and len(set(vals)) == len(vals):
        order = sorted(range(len(q["options"])), key=lambda i: vals[i])
        out = dict(q)
        out["options"] = [q["options"][i] for i in order]
        out["correct"] = [order.index(0)]
        out["lockedOrder"] = True
        return out
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(q["options"]) != 3:
        warn.append(f"{len(q['options'])} options")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    key = len(q["options"][0])
    if key > max(len(o) for o in q["options"][1:]):
        warn.append("key longest")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "faaifr_source"}
    path = os.path.join(HERE, f"{domain}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def build():
    items, warnings = {}, []
    for d in DOMAINS:
        src = load(d)
        for i, q in enumerate(src):
            q["domain"] = d
            warnings += lint(q, f"{d}[{i}] t{q['test']} {q['stem'][:60]!r}")
        items[d] = src
    out = []
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        for n, (_, _, q) in enumerate(blocks, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single", "skill": q["skill"],
                    "stem": esc(q["stem"]), "options": [esc(o) for o in q["options"]], "correct": q["correct"],
                    "explanation": esc(q["explanation"])}
            if q.get("lockedOrder"):
                item["lockedOrder"] = True
            out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in tests:
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    allq = [q for qs in items.values() for q in qs]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    keys = Counter(q["correct"][0] for q in out)
    print("  key positions:", dict(sorted(keys.items())))
    stems = Counter(q["stem"] for q in allq)
    for s, n in stems.items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
