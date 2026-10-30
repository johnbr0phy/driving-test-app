#!/usr/bin/env python3
"""Build the CompTIA Network+ (N10-009) v2 bank from per-domain Python sources.

Usage: python3 -I tools/netplus/build.py

Sources are tools/netplus/<domain>.py, each defining ITEMS built with the
helpers in tools/netplus/helpers.py (keys listed first; CLI shown through cmd()
and cli()). Same id scheme as tools/build_v2_bank.py, which this exam does
not edit: NETPLUS-T1-001.., -T2-001.., -D-001.., each test interleaving its
domains (the session builder orders a test by id). Single and multi options
are shuffled with a seed taken from the stem, so key positions are spread
out and stable between builds; the app shuffles again at runtime.

Checks (fatal): per-test domain counts match PLAN, no em or en dashes, no
"of the above", numeric answers are digits only and stems say "Type the
number only.", no option letter references in explanations, no duplicate
stems. Printed: the share of single items whose key is the longest option
(must stay at or under 25%).
"""
import hashlib, importlib, json, os, random, re, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, HERE)

EXAM, PREFIX, SECTION = "netplus", "NETPLUS", "netplus"
# Per-test counts (90 items, N10-009 weights 23/20/19/14/24).
PLAN = {
    "netModels": 11, "netInfra": 10,                 # 1.0 Networking Concepts 23% (21)
    "netSwitchRoute": 11, "netWireless": 7,          # 2.0 Network Implementation 20% (18)
    "netOps": 17,                                    # 3.0 Network Operations 19%
    "netSecurity": 13,                               # 4.0 Network Security 14%
    "netTroubleMethod": 10, "netTroubleServices": 11,  # 5.0 Network Troubleshooting 24% (21)
}
DRILL_ONLY = 3
SOURCE_ONLY = {"test", "skill", "difficulty", "format"}


def shuffled(q):
    if q["format"] == "matrix" and len(q["columns"]) > 2:
        # Sources often list columns in row order (a diagonal key); shuffle the
        # columns with a stem seed so the key is not a visible pattern.
        seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
        cols = list(range(len(q["columns"])))
        rng = random.Random(seed)
        while True:
            rng.shuffle(cols)
            key = [cols.index(c) for c in q["correct"]]
            if key != sorted(key) or len(set(key)) < len(key):
                break
        out = dict(q)
        out["columns"] = [q["columns"][i] for i in cols]
        out["correct"] = key
        return out
    if q["format"] not in ("single", "multi"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def plain_len(s):
    return len(re.sub(r"\\texttt\{|\$|\\", "", s))


def check(q, where):
    errs = []
    texts = [q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", [])]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u201c\u201d"):
        errs.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q.get("options", [])):
        errs.append("all/none of the above")
    if re.search(r"\b(?:[Cc]hoices?|[Oo]ptions?|[Aa]nswers?)\s+\(?[A-F]\b|(?<![\w$\\])\([A-F]\)", q["explanation"]):
        errs.append("explanation names an option letter")
    if q["format"] == "numeric":
        if not all(re.fullmatch(r"\d+", a) for a in q["numeric"]["answers"]):
            errs.append("numeric answer is not digits only")
        if "Type the number only." not in q["stem"]:
            errs.append("numeric stem lacks 'Type the number only.'")
    if q["format"] == "multi":
        want = {2: "(Choose two.)", 3: "(Choose three.)"}[q["select"]]
        if want not in q["stem"]:
            errs.append(f"multi stem lacks {want}")
    if q["format"] in ("single", "multi") and len(set(q["options"])) != len(q["options"]):
        errs.append("duplicate options")
    return [f"{where}: {e}" for e in errs]


def lint_only(domains):
    """python3 -I tools/netplus/build.py --check <domain>...: check sources without writing the bank."""
    errors, singles, longest = [], 0, 0
    for d in domains:
        src = importlib.import_module(d).ITEMS
        for i, q in enumerate(src):
            errors += check(q, f"{d}[{i}] {q['stem'][:50]!r}")
            if q["format"] == "single":
                singles += 1
                k = plain_len(q["options"][0])
                longest += all(k > plain_len(o) for o in q["options"][1:])
        got = Counter(q["test"] for q in src)
        for t, want in ((1, PLAN[d]), (2, PLAN[d]), (0, DRILL_ONLY)):
            if got[t] != want:
                errors.append(f"{d}: test {t} has {got[t]} items, want {want}")
        print(f"{d}: {len(src)} items, formats {dict(Counter(q['format'] for q in src))}")
        stems = Counter(q["stem"] for q in src)
        errors += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]
    print(f"key strictly longest: {longest}/{singles} single items = {100 * longest / max(1, singles):.1f}%")
    for e in errors:
        print("ERROR", e)
    sys.exit(1 if errors else 0)


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
    stems = Counter(q["stem"] for qs in items.values() for q in qs)
    errors += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]

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
    fmt = Counter((q["test"], q["format"]) for q in out)
    print("  formats:", dict(sorted(fmt.items())))
    singles = [q for q in out if q["format"] == "single"]
    print("  single-key positions:", dict(sorted(Counter(q["correct"][0] for q in singles).items())))
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
    if sys.argv[1:2] == ["--check"]:
        lint_only(sys.argv[2:])
    else:
        build()
