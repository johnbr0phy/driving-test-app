#!/usr/bin/env python3
"""Build the ISTQB Certified Tester Foundation Level (CTFL v4.0) v2 bank.

Usage: python3 -I tools/build-run-2026-11-18/istqb/build.py

Sources are tools/build-run-2026-11-18/istqb/<domain>.py, each defining ITEMS
built with helpers.py (keys listed first for S and M; N sorts all-number
options and locks them; L keeps the given order). Same id scheme as
tools/build_v2_bank.py, which this exam does not edit: ISTQB-T1-001..,
-T2-001.., -D-001.., each test interleaving its domains. Single and multi
options are shuffled with a seed taken from the stem, so key positions are
spread out and stable between builds; the app shuffles again at runtime
(lockedOrder items keep their order).

Per-test counts follow the CTFL v4.0 Exam Structure Tables (v1.21): chapter 1
8, chapter 2 6, chapter 3 4, chapter 4 11, chapter 5 9, chapter 6 2 = 40.

Checks (fatal): per-test domain counts match PLAN, drill-only counts, no em or
en dashes or curly quotes, no "of the above", no option letter or ordinal
references in explanations, no duplicate stems or option sets, every computed
key recomputed (CHECKS below). Printed: key positions, the share of single
items whose key is strictly the longest option (must stay at or under 25%),
and how often an all-number key sits in an end slot.
"""
import hashlib, importlib, json, os, random, re, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
sys.path.insert(0, HERE)

EXAM, PREFIX, SECTION = "istqb", "ISTQB", "ctfl"
PLAN = {
    "istqbFundamentals": 5,   # chapter 1: 1.1, 1.2, 1.3, 1.5
    "istqbTestProcess": 3,    # chapter 1: 1.4
    "istqbLifecycle": 6,      # chapter 2
    "istqbStatic": 4,         # chapter 3
    "istqbBlackBox": 5,       # chapter 4: 4.1, 4.2
    "istqbTechniques": 6,     # chapter 4: 4.3, 4.4, 4.5
    "istqbPlanning": 4,       # chapter 5: 5.1
    "istqbManaging": 7,       # chapter 5: 5.2 to 5.5 (5) + chapter 6 (2)
}
DRILL_ONLY = 15
SOURCE_ONLY = {"test", "skill", "difficulty", "format"}


# ---- recomputed keys (K3 items). Each returns the value the key must have.
def three_point(a, m, b):
    return (a + 4 * m + b) / 6


def sd(a, b):
    return (b - a) / 6


CHECKS = {
    # stem fragment -> expected key text
    "4, most likely 10 and most pessimistic 22": str(int(three_point(4, 10, 22))),
    "5, most likely 11 and pessimistic 29": str(int(sd(5, 29))),
    "ratio of 5:2": str(750 * 2 // 5),
    "last three iterations took 18, 22 and 26": str((18 + 22 + 26) // 3),
    "likelihood is 0.25 and the impact is 40": f"{0.25 * 40:g}",
    "Test A exercises 28": str(round(100 * (28 + 30 - 22) / 40)) + "%",
    "five equivalence partitions and the tests exercise four": str(100 * 4 // 5) + "%",
    "four boundary values and the tests exercise three": str(100 * 3 // 4) + "%",
    "three Boolean conditions, and one combination is infeasible": str(2 ** 3 - 1),
    "four independent Boolean conditions": str(2 ** 4),
    "Payment type has three partitions": str(max(3, 2)),
    "A pump has three states": str(3 * 3),
}


SLOT_USE = Counter()


def shuffled(q):
    """Stem-seeded shuffle. Single items put the key in the least-used slot so far
    (seeded tie-break), so key letters stay balanced across the bank."""
    if q.get("lockedOrder"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    rng = random.Random(seed)
    order = list(range(len(q["options"])))
    rng.shuffle(order)
    if q["format"] == "single":
        n = len(order)
        low = min(SLOT_USE[i] for i in range(n))
        slot = rng.choice([i for i in range(n) if SLOT_USE[i] == low])
        SLOT_USE[slot] += 1
        rest = [i for i in order if i != q["correct"][0]]
        order = rest[:slot] + [q["correct"][0]] + rest[slot:]
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def plain_len(s):
    return len(re.sub(r"\\texttt\{|\$|\\", "", s))


ORD = re.compile(r"\b(first|second|third|fourth|last) (option|choice|answer)\b|\b[Cc]hoice [A-F]\b|\b[Oo]ption [A-F]\b", re.I)


def check(q, where):
    errs = []
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2018\u2019\u201c\u201d"):
        errs.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q.get("options", [])):
        errs.append("all/none of the above")
    if ORD.search(q["explanation"]) or ORD.search(q["stem"]):
        errs.append("names an option by letter or position")
    if q["format"] == "multi" and "(Choose two.)" not in q["stem"]:
        errs.append("multi stem lacks (Choose two.)")
    if q["format"] == "multi" and len(q["options"]) != 5:
        errs.append("multi needs 5 options")
    if q["format"] == "single" and len(q["options"]) != 4:
        errs.append(f"{len(q['options'])} options")
    if len(set(q["options"])) != len(q["options"]):
        errs.append("duplicate options")
    if "$" in q["explanation"] or ("$" in q["stem"] and "\\texttt" not in q["stem"]):
        errs.append("dollar sign outside code")
    return [f"{where}: {e}" for e in errs]


def build():
    items, errors = {}, []
    for d in PLAN:
        mod = importlib.import_module(d)
        src = [dict(q, domain=d) for q in mod.ITEMS]
        for i, q in enumerate(src):
            errors += check(q, f"{d}[{i}] {q['stem'][:50]!r}")
        got = Counter(q["test"] for q in src)
        for t, want in ((1, PLAN[d]), (2, PLAN[d]), (0, DRILL_ONLY)):
            if got[t] != want:
                errors.append(f"{d}: test {t} has {got[t]} items, want {want}")
        items[d] = src
    allq = [q for qs in items.values() for q in qs]
    stems = Counter(q["stem"] for q in allq)
    errors += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]
    sets = Counter(tuple(sorted(q["options"])) for q in allq if not q.get("lockedOrder"))
    errors += [f"shared option set {s}" for s, n in sets.items() if n > 1]
    for frag, want in CHECKS.items():
        hits = [q for q in allq if frag in q["stem"]]
        if len(hits) != 1:
            errors.append(f"CHECK {frag!r}: {len(hits)} items")
            continue
        q = hits[0]
        got = q["options"][q["correct"][0]]
        if got != want:
            errors.append(f"CHECK {frag!r}: key {got!r}, computed {want!r}")
        if want.rstrip("%") not in q["explanation"]:
            errors.append(f"CHECK {frag!r}: explanation lacks {want!r}")

    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        blocks = []
        for di, d in enumerate(PLAN):
            mine = [q for q in items[d] if q["test"] == test]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        for n, (_, _, q) in enumerate(blocks, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "skill": q["skill"], "difficulty": q["difficulty"], "format": q["format"]}
            item.update({k: v for k, v in q.items() if k not in SOURCE_ONLY and k != "domain"})
            out.append(item)

    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    print("  pools:", {d: len(items[d]) for d in PLAN})
    print("  formats:", dict(sorted(Counter((q["test"], q["format"]) for q in out).items())))
    singles = [q for q in out if q["format"] == "single"]
    free = [q for q in singles if not q.get("lockedOrder")]
    print("  single-key positions (shuffled items):", dict(sorted(Counter(q["correct"][0] for q in free).items())))
    nums = [q for q in singles if q.get("lockedOrder") and all(re.fullmatch(r"[\d.]+%?", o) for o in q["options"])]
    ends = sum(q["correct"][0] in (0, 3) for q in nums)
    print(f"  all-number keys in an end slot: {ends}/{len(nums)}")
    longest = [q for q in singles
               if all(plain_len(q["options"][q["correct"][0]]) > plain_len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0])]
    pct = 100 * len(longest) / max(1, len(singles))
    print(f"  key strictly longest: {len(longest)}/{len(singles)} single items = {pct:.1f}%")
    if pct > 25:
        errors.append(f"key is the longest option in {pct:.1f}% of single items (max 25%)")
    for e in errors:
        print("  ERROR", e)
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    build()
