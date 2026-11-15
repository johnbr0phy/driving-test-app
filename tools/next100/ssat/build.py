#!/usr/bin/env python3
"""Build data/v2/ssat/questions.json from the sources in this folder.

Usage (from the repo root):
  python3 -I tools/next100/ssat/build.py            build the bank
  python3 -I tools/next100/ssat/build.py --check F  lint one source file (e.g. q_arith.py)

SSAT Middle Level (E3n, admission.org). The real scored sections, in order:
Quantitative 25 in 30 min, Reading 40 in 40 min, Verbal 60 in 30 min (30
synonyms, 30 analogies), Quantitative 25 in 30 min; five answer choices.
Each practice test here is about half that length at about the same pace:
quant1 13, reading 20 (four passages of 5), verbal 30 (15 synonyms then 15
analogies), quant2 12. Quantitative items of a test are split between the two
quant sections by the counts in FILES (file order; each section then runs easy
to hard with domains interleaved). Drill-only items (test 0) sit in quant1,
reading and verbal so the drills can draw on them.

Source files hold ITEMS (dicts: test, skill, diff 1-3, basics, stem, key,
wrong (four), expl; reading items add stim, a key into STIMULI). The build
places the key by a rotating slot, or sorts and locks all-number options.
Ids: SSAT-T1-001.., SSAT-T2-.., SSAT-D-..
"""
import json, os, re, runpy, sys
from fractions import Fraction

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(SRC)))
PREFIX = "SSAT"

# file: (section or "quant", domain, {test: count} , quant1 share per test)
FILES = {
    "q_arith.py": ("quant", "ssatArith", {1: 10, 2: 10, 0: 15}, 5),
    "q_algebra.py": ("quant", "ssatAlgebra", {1: 8, 2: 8, 0: 16}, 4),
    "q_geometry.py": ("quant", "ssatGeometry", {1: 7, 2: 7, 0: 16}, 4),
    "read_narrative.py": ("reading", "ssatNarrative", {1: 10, 2: 10, 0: 10}, None),
    "read_argument.py": ("reading", "ssatArgument", {1: 10, 2: 10, 0: 10}, None),
    "verbal_syn.py": ("verbal", "ssatSynonyms", {1: 15, 2: 15, 0: 5}, None),
    "verbal_analogy.py": ("verbal", "ssatAnalogies", {1: 15, 2: 15, 0: 5}, None),
}
SECTIONS = ["quant1", "reading", "verbal", "quant2"]
# The Basics each drill opens with (lib/v2/exams/ssat.ts). A tag outside its
# drill's list can never show a brush-up card, so the build drops it.
DRILL_BASICS = {
    "ssatArith": {"fractionOps", "decimals", "percents", "orderOfOperations"},
    "ssatAlgebra": {"solveX", "substitution", "ratios", "rateProblems"},
    "ssatGeometry": set(),
    "ssatNarrative": set(),
    "ssatArgument": {"mainIdea", "findingDetail", "authorPurpose", "claimSupport"},
    "ssatSynonyms": set(),
    "ssatAnalogies": set(),
}
BASICS = set().union(*DRILL_BASICS.values())
SLOTS = [0, 3, 1, 4, 2, 1, 4, 0, 2, 3]
POSITIONAL = re.compile(r"\b(first|second|third|fourth|fifth|last|other (two|three|four))\s+(option|choice|answer)s?\b|\bchoice [A-E]\b|\boption [A-E]\b", re.I)
UNITS = r"cm|m|km|in\.?|inches|feet|ft|yards|miles|miles per hour|g|kg|lb|pounds|ounces|oz|mL|L|liters|cups|minutes|hours|seconds|days|weeks|units|square units|square feet|square inches|square meters|square centimeters|cubic units|cubic feet|cubic inches|cubic meters|cubic centimeters|degrees|°|%"


def as_number(s):
    t = s.replace("\\$", "").replace(",", "").replace("−", "-").strip()
    t = re.sub(rf"\s*({UNITS})$", "", t)
    m = re.fullmatch(r"(-?\d+) (\d+)/(\d+)", t)
    try:
        if m:
            return Fraction(int(m[1])) + Fraction(int(m[2]), int(m[3]))
        if re.fullmatch(r"-?\d+(\.\d+)?|-?\d+/\d+", t):
            return Fraction(t)
    except (ValueError, ZeroDivisionError):
        return None
    return None


def lint(fname, items, stimuli):
    _, dom, counts, _ = FILES[fname]
    probs = []
    got = {k: sum(1 for q in items if q["test"] == k) for k in counts}
    for k, want in counts.items():
        if got[k] != want:
            probs.append(f"test {k}: {got[k]} items, want {want}")
    longest = over = singles = 0
    lens = []
    stems = set()
    for i, q in enumerate(items):
        where = f"{fname}#{i + 1} '{q['stem'][:50]}'"
        for f in ("test", "skill", "diff", "stem", "expl", "key", "wrong"):
            if f not in q:
                probs.append(f"{where}: missing {f}")
        if q.get("basics") and q["basics"] not in DRILL_BASICS[dom]:
            probs.append(f"{where}: basics {q['basics']} is not one of this drill's skills")
        if q.get("stim") and q["stim"] not in stimuli:
            probs.append(f"{where}: unknown stim {q['stim']}")
        st = q["stem"].strip()
        if not (st.endswith("?") or st.endswith(":")):
            probs.append(f"{where}: stem must end in ? or :")
        key_stem = re.sub(r"\W+", " ", st.lower())
        if key_stem in stems and not q.get("stim"):
            probs.append(f"{where}: duplicate stem")
        stems.add(key_stem)
        text = " ".join([st, q.get("expl", ""), q["key"]] + list(q["wrong"]))
        if "—" in text or " – " in text:
            probs.append(f"{where}: em/en dash")
        if "of the above" in text.lower() or re.search(r"\bboth\b", " ".join([q["key"]] + q["wrong"]).lower()):
            probs.append(f"{where}: of the above / both")
        if POSITIONAL.search(q.get("expl", "") + " " + st):
            probs.append(f"{where}: points at an option by position")
        if re.search(r"(?<!\\)\$", text):
            probs.append(f"{where}: unescaped $ (use D)")
        key, wrong = q["key"], q["wrong"]
        opts = [key] + wrong
        if len(wrong) != 4:
            probs.append(f"{where}: need 4 wrong options")
        if len(set(o.lower() for o in opts)) != len(opts):
            probs.append(f"{where}: duplicate option")
        nums = [as_number(o) for o in opts]
        if all(n is not None for n in nums) and len(set(nums)) != len(nums):
            probs.append(f"{where}: two options with the same value")
        singles += 1
        avg = sum(len(w) for w in wrong) / len(wrong)
        if len(key) > max(len(w) for w in wrong):
            longest += 1
        if len(key) > avg * 1.2 + 2:
            over += 1
        lens += [len(o) for o in opts]
    if singles:
        if longest / singles > 0.25:
            probs.append(f"key is the longest option in {longest}/{singles} items (max 25%)")
        if over / singles > 0.30:
            probs.append(f"key over 1.2x wrong average in {over}/{singles} items (max 30%)")
    avg = sum(lens) / max(1, len(lens))
    return probs, avg


def load(fname):
    path = os.path.join(SRC, fname)
    if not os.path.exists(path):
        return None, {}
    ns = runpy.run_path(path)
    return ns["ITEMS"], ns.get("STIMULI", {})


def build_item(q, dom, section, test, i):
    item = {"section": section, "test": test, "module": 1, "domain": dom, "skill": q["skill"], "difficulty": q["diff"]}
    if q.get("basics") in DRILL_BASICS[dom]:
        item["basics"] = q["basics"]
    key, wrong = q["key"], list(q["wrong"])
    opts = [key] + wrong
    nums = [as_number(o) for o in opts]
    if all(n is not None for n in nums) and not q.get("shuffle"):
        opts = [o for _, o in sorted(zip(nums, opts), key=lambda p: p[0])]
        item["lockedOrder"] = True
    else:
        slot = SLOTS[i % len(SLOTS)]
        opts = wrong[:]
        opts.insert(slot, key)
    item["format"] = "single"
    item["stem"] = q["stem"]
    item["options"] = opts
    item["correct"] = [opts.index(key)]
    item["explanation"] = q["expl"]
    return item


def main():
    if "--check" in sys.argv:
        fname = sys.argv[sys.argv.index("--check") + 1]
        items, stimuli = load(fname)
        probs, avg = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", p)
        print(f"{fname}: {len(items)} items, avg option length {avg:.1f}, {len(probs)} problems")
        sys.exit(1 if probs else 0)

    pools, stimuli_all, total_probs = {}, {}, 0
    for fname, (section, dom, _, q1) in FILES.items():
        items, stimuli = load(fname)
        if items is None:
            sys.exit(f"missing {fname}")
        probs, _ = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", p)
        total_probs += len(probs)
        for k, v in stimuli.items():
            stimuli_all[f"{dom}:{k}"] = v
        # Which section each item sits in.
        placed = []
        seen = {1: 0, 2: 0}
        for i, q in enumerate(items):
            if section != "quant":
                sec = section
            elif q["test"] == 0:
                sec = "quant1"
            else:
                seen[q["test"]] += 1
                sec = "quant1" if seen[q["test"]] <= q1 else "quant2"
            placed.append((i, q, sec))
        pools[dom] = placed

    out, stimuli_out, used = [], [], set()
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section in SECTIONS:
            lanes = []
            for dom, placed in pools.items():
                mine = [(i, q) for i, q, sec in placed if sec == section and q["test"] == test]
                if not mine:
                    continue
                units, seen = [], {}
                for i, q in mine:
                    s = q.get("stim")
                    if s and s in seen:
                        seen[s].append((i, q))
                        continue
                    u = [(i, q)]
                    if s:
                        seen[s] = u
                    units.append(u)
                if section != "reading":
                    units.sort(key=lambda u: sum(q["diff"] for _, q in u) / len(u))
                lanes.append((dom, units))
            queue = []
            if section == "verbal":
                # Synonyms first, then analogies, as on the real test.
                for rank, (dom, units) in enumerate(sorted(lanes, key=lambda l: l[0] != "ssatSynonyms")):
                    for j, u in enumerate(units):
                        queue.append((rank + j / 1000, dom, u))
            else:
                for dom, units in lanes:
                    L = len(units)
                    for j, u in enumerate(units):
                        queue.append(((j + 0.5) / L, dom, u))
            queue.sort(key=lambda t: (t[0], t[1]))
            for _, dom, u in queue:
                for i, q in u:
                    n += 1
                    item = build_item(q, dom, section, test, i)
                    item = {"id": f"{PREFIX}-{tag}-{n:03d}", **item}
                    if q.get("stim"):
                        sid = f"{PREFIX}-{q['stim']}"
                        item["stimulusId"] = sid
                        if sid not in used:
                            used.add(sid)
                            title, text = stimuli_all[f"{dom}:{q['stim']}"]
                            stimuli_out.append({"id": sid, "title": title, "text": text.strip()})
                    out.append(item)
    dst = os.path.join(ROOT, "data/v2/ssat/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli_out, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = {}
    for q in out:
        counts[(q["test"], q["section"])] = counts.get((q["test"], q["section"]), 0) + 1
    print(f"ssat: wrote {len(out)} questions, {len(stimuli_out)} stimuli -> {dst}")
    for k in sorted(counts):
        print(f"  test {k[0]} {k[1]}: {counts[k]}")
    keys = [q["correct"][0] for q in out if not q.get("lockedOrder")]
    print("  key slots A-E:", [keys.count(i) for i in range(5)])
    print(f"  {total_probs} problems")
    sys.exit(1 if total_probs else 0)


if __name__ == "__main__":
    main()
