#!/usr/bin/env python3
"""Build the Microsoft DP-900 (Azure Data Fundamentals) v2 bank from
per-domain Python sources.

Usage: python3 -I tools/next100/dp900/build.py
       python3 -I tools/next100/dp900/build.py --check <domain>...

Sources are tools/next100/dp900/<domain>.py, each defining ITEMS built with
the helpers in helpers.py (keys listed first; KQL and logs shown through
cmd() and cli()). Same id scheme as tools/build_v2_bank.py, which this exam
does not edit: DP900-T1-001.., -T2-001.., -D-001.., each test interleaving its
domains (the session builder orders a test by id). Single and multi options are
shuffled with a seed taken from the stem, so key positions are spread out and
stable between builds. When every option of a single item is a number (with
the same unit word, if any), the options are sorted ascending and locked
(lockedOrder) instead, and the key is found again after sorting.

Checks (fatal): per-test domain counts match PLAN and DRILL_ONLY, no em or en
dashes or curly quotes, no "of the above", numeric answers are digits only and
stems say "Type the number only.", no option letter references in
explanations, no duplicate stems. Printed: the share of single items whose key
is the longest option (must stay at or under 25%) and how often a sorted
number item keys an end slot.
"""
import hashlib, importlib, json, os, random, re, sys
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
sys.path.insert(0, HERE)

EXAM, PREFIX, SECTION = "dp900", "DP900", "dp900"
# Per-test counts (50 items, skills measured as of July 21, 2026: core data concepts 25-30%,
# relational data 20-25%, non-relational data 15-20%, analytics workload 25-30%).
PLAN = {
    "dp900Data": 8, "dp900Workloads": 6,                # core data concepts 14 (28%)
    "dp900Relational": 6, "dp900AzureSql": 6,           # relational 12 (24%)
    "dp900Storage": 5, "dp900Cosmos": 4,                # non-relational 9 (18%)
    "dp900Analytics": 9, "dp900PowerBI": 6,             # analytics 15 (30%)
}
DRILL_ONLY = {
    "dp900Data": 13, "dp900Workloads": 12, "dp900Relational": 12, "dp900AzureSql": 12,
    "dp900Storage": 12, "dp900Cosmos": 13, "dp900Analytics": 14, "dp900PowerBI": 12,
}
SOURCE_ONLY = {"test", "skill", "difficulty", "format"}
NUM = re.compile(r"^(\d+(?:\.\d+)?)(?:\s+([A-Za-z%]+))?$")


def number_options(opts):
    """[(value, unit)] if every option is a number with one shared unit, else None."""
    parsed = [NUM.match(o.strip()) for o in opts]
    if not all(parsed):
        return None
    units = {m.group(2) or "" for m in parsed}
    if len(units) > 1:
        return None
    return [float(m.group(1)) for m in parsed]


def seed_of(q):
    return int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)


def shuffled(q):
    if q["format"] == "matrix" and len(q["columns"]) > 2:
        cols = list(range(len(q["columns"])))
        rng = random.Random(seed_of(q))
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
    out = dict(q)
    vals = number_options(q["options"]) if q["format"] == "single" else None
    if vals is not None:
        order = sorted(range(len(vals)), key=lambda i: vals[i])
        out["lockedOrder"] = True
    else:
        order = list(range(len(q["options"])))
        random.Random(seed_of(q)).shuffle(order)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def plain_len(s):
    return len(re.sub(r"\\texttt\{|\$|\\", "", s))


def check(q, where):
    errs = []
    texts = [q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", [])]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u2018\u201c\u201d"):
        errs.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q.get("options", [])):
        errs.append("all/none of the above")
    if re.search(r"\b(?:[Cc]hoices?|[Oo]ptions?|[Aa]nswers?)\s+\(?[A-F]\b|(?<![\w$\\])\([A-F]\)", q["explanation"]):
        errs.append("explanation names an option letter")
    if re.search(r"\b(?:first|second|third|fourth|last) (?:option|choice|answer)\b", q["explanation"] + " " + q["stem"], re.I):
        errs.append("points at an option by position")
    if not re.search(r"[?:]\s*$|Type the number only\.\s*$|\(Choose (?:two|three)\.\)\s*$", q["stem"]):
        errs.append("stem does not end in ? or :")
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
    if q["format"] == "single" and len(q["options"]) != 4:
        errs.append("single needs four options")
    return [f"{where}: {e}" for e in errs]


def counts_ok(d, src):
    got = Counter(q["test"] for q in src)
    errs = []
    for t, want in ((1, PLAN[d]), (2, PLAN[d]), (0, DRILL_ONLY[d])):
        if got[t] != want:
            errs.append(f"{d}: test {t} has {got[t]} items, want {want}")
    return errs


def longest_share(qs):
    singles = [q for q in qs if q["format"] == "single"]
    n = 0
    for q in singles:
        k = q["correct"][0]
        n += all(plain_len(q["options"][k]) > plain_len(o) for i, o in enumerate(q["options"]) if i != k)
    return n, len(singles)


def lint_only(domains):
    errors, allq = [], []
    for d in domains:
        src = importlib.import_module(d).ITEMS
        for i, q in enumerate(src):
            errors += check(q, f"{d}[{i}] {q['stem'][:50]!r}")
        errors += counts_ok(d, src)
        print(f"{d}: {len(src)} items, formats {dict(Counter(q['format'] for q in src))}")
        stems = Counter(q["stem"] for q in src)
        errors += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]
        allq += src
    n, s = longest_share(allq)
    print(f"key strictly longest: {n}/{s} single items = {100 * n / max(1, s):.1f}%")
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
        errors += counts_ok(d, src)
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
    print("  formats:", dict(sorted(Counter((q["test"], q["format"]) for q in out).items())))
    singles = [q for q in out if q["format"] == "single"]
    print("  single-key positions:", dict(sorted(Counter(q["correct"][0] for q in singles).items())))
    locked = [q for q in singles if q.get("lockedOrder")]
    ends = sum(q["correct"][0] in (0, len(q["options"]) - 1) for q in locked)
    print(f"  sorted number items: {len(locked)}, key in an end slot {ends}")
    n, s = longest_share(out)
    pct = 100 * n / max(1, s)
    print(f"  key strictly longest: {n}/{s} single items = {pct:.1f}%")
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
