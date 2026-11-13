#!/usr/bin/env python3
"""Build the Google Cloud Professional Cloud Architect (gcppca) v2 bank.

Usage: python3 -I tools/gcppca/build.py

Sources are Python data files, one per drill domain, in tools/gcppca/<domain>.py,
plus stimuli.json for the four original case studies. Each source holds ITEMS,
built with two helpers this script provides:
  Q(test, difficulty, skill, stem, options, explanation, case=None)   single answer
  M(test, difficulty, skill, stem, options, explanation, case=None)   "Choose two"
test is 1, 2 or 0 (drill only). case is "CS1".."CS4" for a case-study item.
Authoring convention: the correct option(s) come first (one for Q, two for M).
The build shuffles options with a seed taken from the stem, so key positions
spread out and stay stable between builds; the app shuffles again at runtime.

Ids follow tools/build_v2_bank.py: GCPPCA-T1-001.., GCPPCA-T2-.., GCPPCA-D-...
In each test the standalone items interleave the domains, and each case
study's items run as one block, the first after a third of the test and the
second after two thirds (the real exam shows the case on a split screen).

Checks (printed): per-test domain counts, case items per test, key positions,
the share of single items whose key is the longest option (keep it under 25%),
em/en dashes, curly quotes, "of the above", duplicate stems.
"""
import hashlib, json, os, random, runpy
from collections import Counter

EXAM = "gcppca"
PREFIX = "GCPPCA"
SECTION = "pca"
DOMAINS = ["pcaRequirements", "pcaDesign", "pcaProvision", "pcaAI",
           "pcaSecurity", "pcaProcess", "pcaImplement", "pcaOps"]
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))


def _base(fmt, test, difficulty, skill, stem, options, explanation, case):
    q = {"test": test, "difficulty": difficulty, "skill": skill, "format": fmt,
         "stem": stem, "options": options, "explanation": explanation}
    if case:
        q["stimulusId"] = f"{PREFIX}-{case}"
    return q


def Q(test, difficulty, skill, stem, options, explanation, case=None):
    q = _base("single", test, difficulty, skill, stem, options, explanation, case)
    q["correct"] = [0]
    return q


def M(test, difficulty, skill, stem, options, explanation, case=None):
    q = _base("multi", test, difficulty, skill, stem, options, explanation, case)
    q["correct"], q["select"] = [0, 1], 2
    return q


def shuffled(q):
    seed = int(hashlib.sha256(q["stem"].encode()).hexdigest()[:12], 16)
    order = list(range(len(q["options"])))
    random.Random(seed).shuffle(order)
    out = dict(q)
    out["options"] = [q["options"][i] for i in order]
    out["correct"] = sorted(order.index(c) for c in q["correct"])
    return out


def lint(q, where):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "—–‘’“”"):
        warn.append("em/en dash or curly quote")
    if any("of the above" in o.lower() for o in q["options"]):
        warn.append("all/none of the above")
    if q["format"] == "single" and len(q["options"]) != 4:
        warn.append(f"{len(q['options'])} options")
    if q["format"] == "multi" and (len(q["options"]) != 5 or "(Choose two.)" not in q["stem"]):
        warn.append("multi needs 5 options and '(Choose two.)'")
    if len(set(q["options"])) != len(q["options"]):
        warn.append("duplicate option")
    if "$" in "".join(texts):
        warn.append("dollar sign")
    return [f"{where}: {w}" for w in warn]


def build():
    stimuli = json.load(open(os.path.join(HERE, "stimuli.json")))
    stim_ids = {s["id"] for s in stimuli}
    items, warnings, stems = {}, [], Counter()
    for d in DOMAINS:
        src = runpy.run_path(os.path.join(HERE, f"{d}.py"), init_globals={"Q": Q, "M": M})["ITEMS"]
        for i, q in enumerate(src):
            q["domain"] = d
            stems[q["stem"]] += 1
            if q.get("stimulusId") and q["stimulusId"] not in stim_ids:
                warnings.append(f"{d}[{i}] unknown stimulus {q['stimulusId']}")
            if q.get("stimulusId") and q["test"] == 0:
                warnings.append(f"{d}[{i}] case items belong to a test, not the drill pool")
            warnings += lint(q, f"{d}[{i}] {q['stem'][:50]!r}")
        items[d] = src
    warnings += [f"duplicate stem {s[:60]!r}" for s, n in stems.items() if n > 1]
    out = []
    tests = sorted({q["test"] for qs in items.values() for q in qs} - {0}) + [0]
    for test in tests:
        tag = f"T{test}" if test else "D"
        cases = {}
        blocks = []
        for di, d in enumerate(DOMAINS):
            mine = [q for q in items[d] if q["test"] == test and not q.get("stimulusId")]
            for i, q in enumerate(mine):
                blocks.append(((i + 0.5) / len(mine), di, q))
            for q in items[d]:
                if q["test"] == test and q.get("stimulusId"):
                    cases.setdefault(q["stimulusId"], []).append((di, q))
        blocks.sort(key=lambda b: (b[0], b[1]))
        singles = [b[2] for b in blocks]
        ordered = list(singles)
        case_ids = sorted(cases)
        for k, sid in enumerate(reversed(case_ids)):
            at = round(len(singles) * (len(case_ids) - k) / (len(case_ids) + 1))
            block = [q for _, q in sorted(cases[sid], key=lambda x: x[0])]
            ordered[at:at] = block
        step = Counter()
        for n, q in enumerate(ordered, 1):
            q = shuffled(q)
            item = {"id": f"{PREFIX}-{tag}-{n:03d}", "section": SECTION, "test": test, "module": 1,
                    "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"],
                    "skill": q["skill"]}
            if q.get("stimulusId"):
                step[q["stimulusId"]] += 1
                item["stimulusId"] = q["stimulusId"]
                item["caseStep"] = step[q["stimulusId"]]
            if q["format"] == "multi":
                item["select"] = q["select"]
            item.update({k: q[k] for k in ("stem", "options", "correct", "explanation")})
            out.append(item)
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {os.path.relpath(dst, ROOT)}")
    per = Counter((q["test"], q["domain"]) for q in out)
    for test in tests:
        row = [per[(test, d)] for d in DOMAINS]
        ncase = sum(1 for q in out if q["test"] == test and q.get("stimulusId"))
        print(f"  test {test}: {row} = {sum(row)}  case items {ncase}")
    print("  pools:", [sum(1 for q in out if q["domain"] == d) for d in DOMAINS])
    print("  formats:", dict(sorted(Counter((q["test"], q["format"]) for q in out).items())))
    sing = [q for q in out if q["format"] == "single"]
    print("  single-key positions:", dict(sorted(Counter(q["correct"][0] for q in sing).items())))
    longest = [q for q in sing
               if len(q["options"][q["correct"][0]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0])]
    print(f"  key strictly longest: {len(longest)}/{len(sing)} = {100 * len(longest) / len(sing):.1f}%")
    over = [q for q in sing
            if len(q["options"][q["correct"][0]]) > 1.2 * sum(len(o) for i, o in enumerate(q["options"]) if i != q["correct"][0]) / 3]
    print(f"  key over 120% of distractor mean: {len(over)}/{len(sing)} = {100 * len(over) / len(sing):.1f}%")
    for q in longest:
        print("    longest:", q["id"], q["options"][q["correct"][0]][:70])
    for w in warnings:
        print("  WARN", w)


if __name__ == "__main__":
    build()
