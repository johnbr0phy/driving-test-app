#!/usr/bin/env python3
"""Build the PMI Agile Certified Practitioner (PMI-ACP) v2 bank.

Usage: python3 -I tools/next100/pmiacp/build.py

Sources are tools/next100/pmiacp/<domain>.py, each defining ITEMS built with
helpers.py (keys listed first for S and M; N sorts all-number options and
locks them; X is a matching grid). Ids: PMIACP-T1-001.., -T2-.., -D-..., each
test interleaving its domains. Single and multi options are shuffled with a
seed taken from the stem (single keys go to the least-used slot so far).

Per-test counts follow the PMI-ACP Examination Content Outline (November 2024,
March 2026 revision): Mindset 28%, Leadership 25%, Product 19%, Delivery 28%
of a 60-item test (one half of the real 120-item exam): 17/15/11/17.
"""

import hashlib, importlib, json, os, random, re, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
sys.path.insert(0, HERE)

EXAM, PREFIX, SECTION = "pmiacp", "PMIACP", "acp"
PLAN = {
    "acpMindsetTeam": 9,     # Mindset tasks 1 to 3
    "acpMindsetFlow": 8,     # Mindset tasks 4 to 7
    "acpLeadTeams": 8,       # Leadership tasks 1 and 6
    "acpLeadVision": 7,      # Leadership tasks 2 to 5
    "acpProduct": 11,        # Product tasks 1 to 4
    "acpDeliveryValue": 8,   # Delivery tasks 1, 2 and 6
    "acpDeliveryFlow": 9,    # Delivery tasks 3, 4, 5 and 7
}
DRILL_ONLY = 12
SOURCE_ONLY = {"test", "skill", "difficulty", "format"}


# ---- recomputed keys: stem fragment -> expected key text
CHECKS = {
    "costs 20,000 to build and returns 50,000": f"{round(100 * (50000 - 20000) / 20000)}%",
    "8 value points for 4 effort points": str(9 // 3),
    "20, 24 and 22 points. 132 points remain": str(round(132 / ((20 + 24 + 22) / 3))),
    "earned value of 90,000 and an actual cost of 100,000": f"{90000 / 100000:g}",
    "2, 4, 3, 6 and 5 days": str((2 + 4 + 3 + 6 + 5) // 5),
    "Planned value is 50,000 and earned value is 40,000": f"{40000 / 50000:g}",
    "20% chance of happening and would cost 15 days": f"{0.2 * 15:g}",
    "40% probability and would cost 25 story points": f"{0.4 * 25:g}",
}


SLOT_USE = Counter()


def shuffled(q):
    """Stem-seeded shuffle. Single items put the key in the least-used slot so far
    (seeded tie-break), so key letters stay balanced across the bank."""
    if q.get("lockedOrder") or q["format"] == "matrix":
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
    texts = [q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", [])]
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
    if "options" in q and len(set(q["options"])) != len(q["options"]):
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
    sets = Counter(tuple(sorted(q["options"])) for q in allq if "options" in q and not q.get("lockedOrder"))
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
