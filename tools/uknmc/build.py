#!/usr/bin/env python3
"""Build the NMC CBT (Test of Competence Part 1, adult nursing) v2 bank.

Usage: python3 -I tools/uknmc/build.py

Sources are Python data files in tools/uknmc/src_<domain>.py, each defining
ITEMS, a list of tuples:
  ("S", test, difficulty, skill, stem, [key, d1, d2, d3], explanation)
  ("N", test, difficulty, skill, stem, ["answer", ...], explanation, whole)
test is 1, 2 or 0 (drill only). Single items list the key first; the build
shuffles options with a seed taken from the stem, so key positions spread out
and stay stable from build to build (the app shuffles again at runtime).

Ids follow tools/build_v2_bank.py: NMC-T1-001.., -T2-.., -D-.., with each
test's Part B interleaving its domains so a test reads like a mixed paper.

Lint (printed, never fatal): key longest by a clear margin, numeric stems
that do not say "Type the number only", numeric answers with characters other
than digits . / -, em or en dashes, "all/none of the above".
"""
import hashlib, json, os, random, re, sys
from collections import Counter

EXAM = "uknmc"
PREFIX = "NMC"
SECTIONS = {
    "nmcA": ["nmcNumeracy"],
    "nmcB": ["nmcAccountable", "nmcHealth", "nmcAssess", "nmcProvide", "nmcLead", "nmcSafety", "nmcCoord", "nmcComms", "nmcProcedures"],
}
PLAN = {  # per practice test, from the NMC ToC 2021 nursing test specification
    "nmcNumeracy": 15,
    "nmcAccountable": 17, "nmcHealth": 10, "nmcAssess": 14, "nmcProvide": 15, "nmcLead": 10,
    "nmcSafety": 10, "nmcCoord": 10, "nmcComms": 7, "nmcProcedures": 7,
}
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def load(domain):
    path = os.path.join(HERE, f"src_{domain}.py")
    scope = {}
    exec(compile(open(path).read(), path, "exec"), scope)
    out = []
    for t in scope["ITEMS"]:
        if t[0] == "S":
            _, test, diff, skill, stem, opts, expl = t
            out.append({"test": test, "difficulty": diff, "skill": skill, "format": "single", "stem": stem,
                        "options": list(opts), "correct": [0], "explanation": expl})
        else:
            _, test, diff, skill, stem, answers, expl, whole = t
            q = {"test": test, "difficulty": diff, "skill": skill, "format": "numeric", "stem": stem,
                 "numeric": {"answers": list(answers), "tolerance": 0}, "explanation": expl}
            if whole:
                q["numeric"]["wholeNumber"] = True
            out.append(q)
    return out


def shuffled(q):
    if q["format"] != "single":
        return q
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = [order.index(0)]
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q.get("options", [])]
    if any("\u2014" in t or "\u2013" in t for t in texts):
        warn.append("em or en dash")
    if any("of the above" in t.lower() for t in q.get("options", [])):
        warn.append("all/none of the above")
    if q["format"] == "single":
        if len(q["options"]) != 4:
            warn.append(f"{len(q['options'])} options (Part B is four-option)")
        if len(set(q["options"])) != len(q["options"]):
            warn.append("duplicate options")
        key = len(q["options"][0])
        others = sorted((len(o) for o in q["options"][1:]), reverse=True)
        if key > others[0] * 1.25 and key - others[0] > 12:
            warn.append(f"key clearly longest ({key} vs {others[0]})")
    else:
        if "type the number only" not in q["stem"].lower():
            warn.append("numeric stem lacks 'Type the number only'")
        for a in q["numeric"]["answers"]:
            if not re.fullmatch(r"-?[0-9./]+", a):
                warn.append(f"numeric answer {a!r} has other characters")
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
    out = []
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section, sec_domains in SECTIONS.items():
            blocks = []
            for di, d in enumerate(sec_domains):
                mine = [q for q in items[d] if q["test"] == test]
                if test and len(mine) != PLAN[d]:
                    warnings.append(f"test {test} {d}: {len(mine)} items, plan {PLAN[d]}")
                for i, q in enumerate(mine):
                    blocks.append(((i + 0.5) / len(mine), di, q))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, q in blocks:
                n += 1
                q = shuffled(q)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                        "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"], "skill": q["skill"]}
                if section == "nmcA":
                    item["calculator"] = True
                item.update({k: v for k, v in q.items() if k not in ("domain", "test", "skill", "difficulty", "format")})
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
    singles = [q for q in out if q["format"] == "single"]
    keys = Counter(q["correct"][0] for q in singles)
    print("  single-key positions:", dict(sorted(keys.items())))
    longest = sum(1 for q in singles if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]))
    print(f"  key strictly longest: {longest}/{len(singles)} = {100 * longest / len(singles):.1f}%")
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
