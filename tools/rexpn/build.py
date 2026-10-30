#!/usr/bin/env python3
"""Build the REx-PN v2 bank from per-domain source files.

Usage: python3 -I tools/rexpn/build.py

Same id assignment as tools/build_v2_bank.py (which this exam does not edit):
sources live in tools/rexpn/<domain>.json, each item carrying test (1, 2 or
0 = drill only), skill, difficulty, format and the format's own fields (see
data/v2/SCHEMA.md). Ids are assigned so every practice test interleaves its
domains (the session builder orders a test by id): REXPN-T1-001..,
-T2-001.., -D-001... The domain comes from the file name.

Authoring convention: in the sources, a single or multi item lists its
correct option(s) first. The build shuffles each item's options with a seed
taken from its stem, so the stored key positions are spread out and stay
stable from one build to the next. The app shuffles options again at runtime.

Lint (printed, never fatal): a single-answer key that is clearly the longest
option, numeric stems that do not say how to record the answer, em-dashes,
and "all/none of the above".
"""
import hashlib, json, os, random, sys
from collections import Counter

EXAM = "rexpn"
PREFIX = "REXPN"
SECTIONS = {"rexpn": ["rexpnCare", "rexpnSafety", "rexpnHealth", "rexpnPsych", "rexpnComfort", "rexpnPharm", "rexpnRisk", "rexpnPhys"]}
SOURCE_ONLY = {"domain", "test", "skill", "difficulty", "format"}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def shuffled(q):
    """Return a copy of q with its options shuffled (single and multi only)."""
    if q["format"] not in ("single", "multi"):
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def lint(q, where):
    warn = []
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q.get("options", [])]
    if any("—" in t or "–" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "single":
        key = len(q["options"][q["correct"][0]])
        others = sorted((len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]), reverse=True)
        if key > others[0] * 1.25 and key - others[0] > 12:
            warn.append(f"key longest ({key} vs {others[0]})")
    if q["format"] == "numeric" and "record" not in q["stem"].lower():
        warn.append("numeric stem does not say how to record the answer")
    if q["format"] in ("single", "multi") and q["correct"] != list(range(len(q["correct"]))):
        warn.append("source key is not listed first")
    return [f"{where}: {w}" for w in warn]


def build():
    domains = [d for ds in SECTIONS.values() for d in ds]
    items = {}
    warnings = []
    for d in domains:
        src = json.load(open(os.path.join(HERE, f"{d}.json")))
        for i, q in enumerate(src):
            warnings += lint(q, f"{d}[{i}] {q['stem'][:50]!r}")
            q["domain"] = d
        items[d] = src
    out = []
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
    for test in tests:
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
                q = shuffled(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"]}
                if q.get("skill"):
                    item["skill"] = q["skill"]
                item.update({k: v for k, v in q.items() if k not in SOURCE_ONLY})
                out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in tests:
        row = [per[(test, d)] for d in domains]
        print(f"  test {test}: {row} = {sum(row)}")
    fmt = Counter((q["test"], q["format"]) for q in out)
    print("  formats:", dict(sorted(fmt.items())))
    keys = Counter(q["correct"][0] for q in out if q["format"] == "single")
    print("  single-key positions:", dict(sorted(keys.items())))
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
