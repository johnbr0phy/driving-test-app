#!/usr/bin/env python3
"""Build the UPSC Civil Services (Preliminary) GS Paper I v2 bank.

Usage: python3 -I tools/next100/upscse/build.py

Sources are Python data files in tools/next100/upscse/<domain>.py, one per
drill domain. Two helpers are available to them:

S(test, difficulty, skill, stem, options, explanation, passage=None)
    a plain single-answer item with the correct option FIRST. The build
    shuffles the options with a seed taken from the stem, so key positions
    spread out and stay stable between builds. When every option is a number
    (years, counts) the options are sorted ascending instead and locked.

L(test, difficulty, skill, stem, options, key, explanation, passage=None)
    an item whose options carry their meaning by position (the UPSC
    statement formats: "1 only / 2 only / Both 1 and 2 / Neither 1 nor 2",
    "1 and 2 only ... 1, 2 and 3", "Only one / Only two / All three / None").
    Options are written in their natural order and `key` is the index of the
    correct one; the item is emitted with lockedOrder so neither the build
    nor the app moves them. Option sets are provided as constants (TWO,
    THREE, THREE_B, HOW_MANY, HOW_MANY_PAIRS, HOW_MANY_4).

test is 1, 2 or 0 (drill only). The CSAT domain is drill-only by design:
Paper II is qualifying, so it is offered as one drill, never in a test.

Ids: UPSCSE-T1-001.., UPSCSE-T2-.., UPSCSE-D-... Within a test the GS
domains are interleaved, as subjects are mixed on the real paper.

Lint (printed, never fatal): em or en dashes, dollar signs, "of the above",
duplicate options or stems, option counts.
"""
import hashlib, json, os, random
from collections import Counter

EXAM = "upscse"
PREFIX = "UPSCSE"
SECTION = "gs"
GS = ["upscseAncient", "upscseModern", "upscseGeography", "upscsePolity",
      "upscseEconomy", "upscseEnvironment", "upscseScience"]
DOMAINS = GS + ["upscseCsat"]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))

TWO = ["1 only", "2 only", "Both 1 and 2", "Neither 1 nor 2"]
THREE = ["1 and 2 only", "2 and 3 only", "1 and 3 only", "1, 2 and 3"]
THREE_B = ["1 only", "2 only", "1 and 3 only", "1, 2 and 3"]
HOW_MANY = ["Only one", "Only two", "All three", "None of them"]
HOW_MANY_4 = ["Only one", "Only two", "Only three", "All four"]
HOW_MANY_PAIRS = ["Only one pair", "Only two pairs", "All three pairs", "None of the pairs"]


def S(t, d, skill, stem, opts, expl, passage=None):
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": list(opts), "correct": [0], "explanation": expl, "locked": False}
    if passage:
        q["passage"] = passage
    return q


def L(t, d, skill, stem, opts, key, expl, passage=None):
    assert 0 <= key < len(opts), stem
    q = {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
         "options": list(opts), "correct": [key], "explanation": expl, "locked": True}
    if passage:
        q["passage"] = passage
    return q


def as_number(s):
    t = s.replace(",", "").replace("%", "").strip()
    for unit in (" km", " years", " crore", " days", " litres", " kg", " minutes", " hours", " m", " cm", " rupees"):
        if t.endswith(unit):
            t = t[: -len(unit)].strip()
    t = t.replace("Rs ", "").replace("₹", "").strip()
    try:
        return float(t)
    except ValueError:
        return None


def arrange(q):
    """Return (options, correct, lockedOrder) for the emitted item."""
    opts = q["options"]
    if q["locked"]:
        return opts, q["correct"], True
    nums = [as_number(o) for o in opts]
    if all(n is not None for n in nums):
        order = sorted(range(len(opts)), key=lambda i: nums[i])
        return [opts[i] for i in order], [order.index(0)], True
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    random.Random(seed).shuffle(order)
    return [opts[i] for i in order], [order.index(0)], False


def stmts(intro, lines, ask="Which of the statements given above is/are correct?"):
    body = "\n\n".join(f"{i}. {l}" for i, l in enumerate(lines, 1))
    return f"{intro}\n\n{body}\n\n{ask}"


PAIRS_ASK = "How many of the pairs given above are correctly matched?"
HOW_ASK = "How many of the statements given above are correct?"


def key_text(q):
    return q["options"][q["correct"][0]]


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"], q.get("passage", "")]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("$" in t for t in texts):
        warn.append("dollar sign")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def key_longest(q):
    k = q["correct"][0]
    return len(q["options"][k]) > max(len(o) for i, o in enumerate(q["options"]) if i != k)


def load(domain):
    g = {"S": S, "L": L, "TWO": TWO, "THREE": THREE, "THREE_B": THREE_B, "HOW_MANY": HOW_MANY,
         "HOW_MANY_4": HOW_MANY_4, "HOW_MANY_PAIRS": HOW_MANY_PAIRS, "stmts": stmts, "PAIRS_ASK": PAIRS_ASK,
         "HOW_ASK": HOW_ASK, "CS": "Consider the following statements:", "CP": "Consider the following pairs:",
         "__name__": "upscse_source"}
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
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        for n, (_, _, q) in enumerate(blocks, 1):
            opts, correct, locked = arrange(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": "single",
                    "skill": q["skill"]}
            if q.get("passage"):
                item["passage"] = q["passage"]
            item.update({"stem": q["stem"], "options": opts, "correct": correct})
            if locked:
                item["lockedOrder"] = True
            item["explanation"] = q["explanation"]
            out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in (1, 2, 0):
        row = [per[(test, d)] for d in DOMAINS]
        print(f"  test {test}: {row} = {sum(row)}")
    longest = sum(1 for q in out if key_longest(q))
    print(f"  key strictly longest: {longest}/{len(out)} = {longest / len(out):.0%}")
    free = [q for q in out if not q.get("lockedOrder")]
    print("  key positions (shuffled items):", dict(sorted(Counter(q["correct"][0] for q in free).items())))
    stmt = [q for q in out if q.get("lockedOrder") and as_number(q["options"][0]) is None]
    print("  key positions (statement items):", dict(sorted(Counter(q["correct"][0] for q in stmt).items())), len(stmt))
    numeric = [q for q in out if q.get("lockedOrder") and as_number(q["options"][0]) is not None]
    ends = sum(1 for q in numeric if q["correct"][0] in (0, len(q["options"]) - 1))
    print(f"  all-number items: {len(numeric)}, key in an end slot: {ends}")
    for s, n in Counter(q["stem"] for q in out).items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
