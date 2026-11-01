#!/usr/bin/env python3
"""Build the Bihar Police Constable (CSBC) v2 bank from per-domain source files.

Usage: python3 -I tools/next100/biharpolice/build.py

Sources are Python data files in tools/next100/biharpolice/<domain>.py (one per
drill domain). Each calls S(test, difficulty, skill, stem, options, explanation)
with the correct option FIRST; the build shuffles options with a seed taken from
the stem, so key positions spread out and stay stable between builds. test is
1, 2 or 0 (drill only). Every item is four-option single answer, the only
format on the real OMR paper.

Option sets whose order carries meaning are shown in natural order and marked
lockedOrder (the app then does not shuffle them either): error-spotting parts in
sentence order with "No error" last, "No improvement" last, and options that are
all numbers (sorted ascending, same unit).

Ids: BIHARPOLICE-T1-001.., BIHARPOLICE-T2-.., BIHARPOLICE-D-... Within a test the
items are grouped by subject in the advertisement's order (Hindi, English,
Mathematics, Social Science, Science, General Knowledge), with the drill
domains of a subject interleaved.

Lint (printed, never fatal): key strictly longest, em or en dashes,
"all/none of the above", dollar signs, duplicate options or stems.
"""
import hashlib, json, os, random, re
from collections import Counter

EXAM = "biharpolice"
PREFIX = "BIHARPOLICE"
SECTION = "paper"
SUBJECTS = [
    ["bihpHindi"],
    ["bihpEnglish"],
    ["bihpMaths"],
    ["bihpHistory", "bihpGeography"],
    ["bihpScience"],
    ["bihpBihar", "bihpGK"],
]
DOMAINS = [d for s in SUBJECTS for d in s]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
FIXED_LAST = {"No error", "No improvement"}
NUM = re.compile(r"^(₹\s?)?(-?[\d,]*\.?\d+)(.*)$")


def S(t, d, skill, stem, opts, expl):
    assert len(opts) == 4, stem
    return {"test": t, "difficulty": d, "skill": skill, "format": "single", "stem": stem,
            "options": opts, "correct": [0], "explanation": expl}


def numeric_order(opts):
    """Indices sorting the options ascending when every option is a number with
    the same prefix and suffix (₹ 1,200 / 45 km / 12.5%), else None."""
    parsed = []
    for o in opts:
        m = NUM.match(o.strip())
        if not m:
            return None
        parsed.append((m.group(1) or "", float(m.group(2).replace(",", "")), m.group(3).strip()))
    if len({(p[0], p[2]) for p in parsed}) != 1:
        return None
    return sorted(range(len(opts)), key=lambda i: parsed[i][1])


def shuffled(q, target=None):
    """target: for a freely shuffled item, the slot the key should land in
    (used to balance key positions against the locked items)."""
    opts = q["options"]
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(opts)))
    locked = False
    fixed = [i for i, o in enumerate(opts) if o in FIXED_LAST]
    if fixed and opts[fixed[0]] == "No error":
        parts = [i for i in order if i != fixed[0]]
        order = sorted(parts, key=lambda i: q["stem"].split("\n\n")[-1].find(opts[i])) + fixed
        locked = True
    elif fixed:
        head = [i for i in order if i != fixed[0]]
        random.Random(seed).shuffle(head)
        order = head + fixed
        locked = True
    elif numeric_order(opts) is not None:
        order = numeric_order(opts)
        locked = True
    else:
        random.Random(seed).shuffle(order)
        if target is not None:
            k = order.index(0)
            order[k], order[target] = order[target], order[k]
    out = dict(q)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(0)]
    if locked:
        out["lockedOrder"] = True
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q["options"]):
        warn.append("all/none of the above")
    if any("$" in t for t in texts):
        warn.append("dollar sign (use the rupee sign)")
    key = len(q["options"][0])
    if key > max(len(o) for o in q["options"][1:]):
        warn.append(f"key longest ({key} vs {max(len(o) for o in q['options'][1:])})")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    return [f"{where}: {w}" for w in warn]


def load(domain):
    g = {"S": S, "__name__": "biharpolice_source"}
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
        ordered = []
        for subject in SUBJECTS:
            blocks = []
            for di, d in enumerate(subject):
                mine = [q for q in items[d] if q["test"] == test]
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            ordered += [b[2] for b in blocks]
        locked_first = [shuffled(q) for q in ordered]
        counts = Counter(o["correct"][0] for o in locked_first if o.get("lockedOrder"))
        for n, q in enumerate(ordered, 1):
            if locked_first[n - 1].get("lockedOrder"):
                q = locked_first[n - 1]
            else:
                low = min(counts[p] for p in range(4))
                # Among the least-used slots, let the stem's own seed pick, so the
                # sequence of keys has no visible pattern.
                slots = [p for p in range(4) if counts[p] <= low + 1]
                seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[12:24], 16)
                target = slots[seed % len(slots)]
                counts[target] += 1
                q = shuffled(q, target)
            out.append({"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": "single",
                        "skill": q["skill"], "stem": q["stem"], "options": q["options"],
                        "correct": q["correct"], **({"lockedOrder": True} if q.get("lockedOrder") else {}),
                        "explanation": q["explanation"]})
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
    allq = [q for qs in items.values() for q in qs]
    longest = sum(1 for q in allq if len(q["options"][0]) > max(len(o) for o in q["options"][1:]))
    print(f"  key strictly longest: {longest}/{len(allq)} = {longest / len(allq):.0%}")
    print("  key positions:", dict(sorted(Counter(q["correct"][0] for q in out).items())))
    print("  locked:", sum(1 for q in out if q.get("lockedOrder")))
    for s, n in Counter(q["stem"] for q in allq).items():
        if n > 1:
            print("  WARN duplicate stem:", s[:80])
    for w in warnings:
        if "key longest" not in w:
            print("  WARN", w)


if __name__ == "__main__":
    build()
