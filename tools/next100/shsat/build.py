#!/usr/bin/env python3
"""Build data/v2/shsat/questions.json from the sources in this folder.

Usage (from the repo root):
  python3 -I tools/next100/shsat/build.py            build the bank
  python3 -I tools/next100/shsat/build.py --check F  lint one source file (e.g. math_ratios.py)

Sources (ITEMS lists of dicts, optional STIMULI), by section:
  ela:   ela_revise.py (Revising/Editing Part A, passage sets), ela_edit.py (Part B,
         stand-alone), read_info.py and read_lit.py (Reading Comprehension sets)
  math:  math_ratios.py, math_number.py, math_equations.py, math_geometry.py, math_stats.py

Item fields: test (1, 2 or 0 = drill only), skill, diff (1 easy to 3 hard), stem, key and
wrong (3 options) or num (typed answers), expl, and optionally stim (a STIMULI key),
basics (a Basics skill id the item's drill opens with), lock=True (keep the written option
order, for items such as "Sentence 1 ... Sentence 4").

Per-test counts are Tigertest's split of the NYC guide's 50 ELA + 50 Math items (the guide
publishes no split): ELA 10 Part A (two sets of 5), 10 Part B, 15 informational and 15
literary reading (three sets of 5 each); Math ratios 10, number and expressions 11,
equations and inequalities 11, geometry 10, statistics and probability 8.
ELA runs Part A sets, Part B, then reading sets (informational and literary alternating);
Math interleaves its domains easy to hard. A stimulus's questions stay together.
Ids: SHSAT-T1-001.., SHSAT-T2-.., SHSAT-D-.. (drill only, test 0).
"""
import json, os, re, runpy, sys
from fractions import Fraction

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(SRC)))
PREFIX = "SHSAT"

FILES = {
    "ela_revise.py": ("ela", "shsatRevise", {1: 10, 2: 10, 0: 5}),
    "ela_edit.py": ("ela", "shsatEdit", {1: 10, 2: 10, 0: 6}),
    "read_info.py": ("ela", "shsatReadInfo", {1: 15, 2: 15, 0: 5}),
    "read_lit.py": ("ela", "shsatReadLit", {1: 15, 2: 15, 0: 5}),
    "math_ratios.py": ("math", "shsatRatios", {1: 10, 2: 10, 0: 5}),
    "math_number.py": ("math", "shsatNumber", {1: 11, 2: 11, 0: 4}),
    "math_equations.py": ("math", "shsatEquations", {1: 11, 2: 11, 0: 4}),
    "math_geometry.py": ("math", "shsatGeometry", {1: 10, 2: 10, 0: 3}),
    "math_stats.py": ("math", "shsatStats", {1: 8, 2: 8, 0: 3}),
}
SECTIONS = ["ela", "math"]
SLOTS = [0, 2, 1, 3, 2, 0, 3, 1]
# The Basics each domain's drill opens with (lib/v2/exams/shsat.ts). A tag outside
# its drill's list can never show a brush-up card, so the build drops it.
DRILL_BASICS = {
    "shsatRevise": set(),
    "shsatEdit": {"danglingModifiers", "verbTense", "pronounCase", "commaSplices"},
    "shsatReadInfo": set(),
    "shsatReadLit": set(),
    "shsatRatios": {"ratios", "percents", "percentChange", "unitConversion"},
    "shsatNumber": set(),
    "shsatEquations": set(),
    "shsatGeometry": set(),
    "shsatStats": set(),
}
BASICS = set().union(*DRILL_BASICS.values())
POSITIONAL = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)s?\b|\bchoice [A-D]\b|\boption [A-D]\b", re.I)
UNITS = r"cm|m|km|in\.?|inches|feet|ft|yards|miles|meters|g|kg|lb|pounds|ounces|oz|mL|L|liters|cups|gallons|minutes|hours|seconds|days|weeks|years|square units|square feet|square inches|square meters|square centimeters|square yards|cubic units|cubic feet|cubic inches|cubic centimeters|cubic meters|degrees|°|students|cents|people|pages|miles per hour"


def as_number(s):
    t = s.replace("\\$", "").replace(",", "").replace("%", "").strip()
    t = re.sub(rf"\s*({UNITS})$", "", t)
    t = t.replace("−", "-")
    m = re.fullmatch(r"\$?(-?)\\?\\frac\{(\d+)\}\{(\d+)\}\$?", t)
    if m:
        v = Fraction(int(m[2]), int(m[3]))
        return -v if m[1] else v
    m = re.fullmatch(r"(-?\d+) (\d+)/(\d+)", t)
    try:
        if m:
            w = int(m[1])
            f = Fraction(int(m[2]), int(m[3]))
            return w - f if w < 0 else w + f
        if re.fullmatch(r"-?\d+(\.\d+)?|-?\d+/\d+", t):
            return Fraction(t)
    except (ValueError, ZeroDivisionError):
        return None
    return None


def lint(fname, items, stimuli):
    _, dom, counts = FILES[fname]
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
        for f in ("test", "skill", "diff", "stem", "expl"):
            if f not in q:
                probs.append(f"{where}: missing {f}")
        if q.get("basics") and q["basics"] not in BASICS:
            probs.append(f"{where}: unknown basics {q['basics']}")
        if q.get("basics") and q["basics"] not in DRILL_BASICS[dom]:
            probs.append(f"{where}: basics {q['basics']} is not one of its drill's skills")
        if q.get("stim") and q["stim"] not in stimuli:
            probs.append(f"{where}: unknown stim {q['stim']}")
        st = q["stem"].strip()
        if not (st.endswith("?") or st.endswith(":") or st.endswith("Choose two.") or st.endswith("Type the number.") or st.endswith("Type your answer.")):
            probs.append(f"{where}: stem must end in ? or :")
        key_stem = re.sub(r"\W+", " ", st.lower()) + "|" + (q.get("stim") or "") + "|" + q.get("passage", "")
        if key_stem in stems:
            probs.append(f"{where}: duplicate stem")
        stems.add(key_stem)
        text = " ".join([st, q.get("expl", ""), q.get("passage", "")] + ([q["key"]] if isinstance(q.get("key"), str) else list(q.get("key") or [])) + list(q.get("wrong") or []))
        if "—" in text or " – " in text or "’" in text or "“" in text:
            probs.append(f"{where}: em/en dash or curly quote")
        if "of the above" in text.lower():
            probs.append(f"{where}: of the above")
        if not q.get("lock") and POSITIONAL.search(q.get("expl", "") + " " + st):
            probs.append(f"{where}: points at an option by position")
        if re.search(r"(?<!\\)\$\d[\d,.]*\b(?![^$]*\$)", text):
            probs.append(f"{where}: unescaped $ before a number (use D)")
        if "num" in q:
            continue
        key = q["key"]
        wrong = q["wrong"]
        keys = key if isinstance(key, list) else [key]
        opts = keys + wrong
        if len(set(opts)) != len(opts):
            probs.append(f"{where}: duplicate option")
        if isinstance(key, str):
            if len(wrong) != 3:
                probs.append(f"{where}: need 3 wrong options")
            singles += 1
            avg = sum(len(w) for w in wrong) / 3
            if len(key) > max(len(w) for w in wrong):
                longest += 1
            if len(key) > avg * 1.2 + 2:
                over += 1
        lens += [len(o) for o in opts]
    for sk, (title, text) in stimuli.items():
        if "—" in text or "’" in text or "“" in text or " – " in text:
            probs.append(f"stimulus {sk}: em/en dash or curly quote")
    if singles:
        if longest / singles > 0.25:
            probs.append(f"key is the longest option in {longest}/{singles} items (max 25%)")
        if over / singles > 0.30:
            probs.append(f"key over 1.2x wrong average in {over}/{singles} items (max 30%)")
    avg = sum(lens) / max(1, len(lens))
    return probs, avg, longest, over, singles


def load(fname):
    path = os.path.join(SRC, fname)
    if not os.path.exists(path):
        return None, {}
    ns = runpy.run_path(path)
    return ns["ITEMS"], ns.get("STIMULI", {})


def build_item(q, dom, section, i):
    item = {"section": section, "test": q["test"], "module": 1, "domain": dom, "skill": q["skill"], "difficulty": q["diff"]}
    if q.get("basics") in DRILL_BASICS[dom]:
        item["basics"] = q["basics"]
    if q.get("passage"):
        item["passage"] = q["passage"].strip()
    if "num" in q:
        item.update(format="numeric", stem=q["stem"], numeric={"answers": q["num"], "tolerance": 0, **({"wholeNumber": True} if all(re.fullmatch(r"\d+", a) for a in q["num"]) else {})})
    else:
        key, wrong = q["key"], list(q["wrong"])
        keys = key if isinstance(key, list) else [key]
        opts = keys + wrong
        if q.get("lock"):
            opts = list(q["order"]) if q.get("order") else opts
            item["lockedOrder"] = True
        else:
            nums = [as_number(o) for o in opts]
            if all(n is not None for n in nums):
                opts = [o for _, o in sorted(zip(nums, opts), key=lambda p: p[0])]
                item["lockedOrder"] = True
            else:
                slot = SLOTS[i % len(SLOTS)]
                opts = wrong[:]
                if isinstance(key, list):
                    for j, k in enumerate(keys):
                        opts.insert(min(len(opts), (slot + j * 2) % (len(opts) + 1)), k)
                else:
                    opts.insert(slot, key)
        item["format"] = "multi" if isinstance(key, list) else "single"
        item["stem"] = q["stem"]
        item["options"] = opts
        item["correct"] = sorted(opts.index(k) for k in keys)
        if isinstance(key, list):
            item["select"] = len(keys)
    item["explanation"] = q["expl"]
    return item


def units_of(items, test):
    mine = [(i, q) for i, q in enumerate(items) if q["test"] == test]
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
    return units


def interleave(lanes):
    queue = []
    for dom, units in lanes:
        units = sorted(units, key=lambda u: sum(q["diff"] for _, q in u) / len(u))
        L = len(units)
        for j, u in enumerate(units):
            queue.append(((j + 0.5) / L, dom, u))
    queue.sort(key=lambda t: t[0])
    return [(dom, u) for _, dom, u in queue]


def main():
    if "--check" in sys.argv:
        fname = sys.argv[sys.argv.index("--check") + 1]
        items, stimuli = load(fname)
        probs, avg, longest, over, singles = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", p)
        print(f"{fname}: {len(items)} items, avg option length {avg:.1f}, key longest {longest}/{singles}, over {over}/{singles}, {len(probs)} problems")
        sys.exit(1 if probs else 0)

    pools, stimuli_all, total_probs = {}, {}, 0
    for fname, (section, dom, _) in FILES.items():
        items, stimuli = load(fname)
        if items is None:
            sys.exit(f"missing {fname}")
        probs, _, _, _, _ = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", p)
        total_probs += len(probs)
        for k, v in stimuli.items():
            stimuli_all[f"{dom}:{k}"] = v
        pools[dom] = (section, items)

    out, stimuli_out, used = [], [], set()
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        order = []
        # ELA: Part A sets, Part B items, then reading sets alternating.
        order += [("shsatRevise", u) for u in units_of(pools["shsatRevise"][1], test)]
        order += [("shsatEdit", u) for u in sorted(units_of(pools["shsatEdit"][1], test), key=lambda u: u[0][1]["diff"])]
        info = units_of(pools["shsatReadInfo"][1], test)
        lit = units_of(pools["shsatReadLit"][1], test)
        for j in range(max(len(info), len(lit))):
            if j < len(info):
                order.append(("shsatReadInfo", info[j]))
            if j < len(lit):
                order.append(("shsatReadLit", lit[j]))
        lanes = [(d, units_of(pools[d][1], test)) for d in ("shsatRatios", "shsatNumber", "shsatEquations", "shsatGeometry", "shsatStats")]
        order += interleave(lanes)
        for dom, u in order:
            section = pools[dom][0]
            for i, q in u:
                n += 1
                item = build_item(q, dom, section, i)
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", **item}
                if q.get("stim"):
                    sid = f"{PREFIX}-{q['stim']}"
                    item["stimulusId"] = sid
                    if sid not in used:
                        used.add(sid)
                        title, text = stimuli_all[f"{dom}:{q['stim']}"]
                        stimuli_out.append({"id": sid, "title": title, "text": text.strip()})
                out.append(item)
    dst = os.path.join(ROOT, "data/v2/shsat/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli_out, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = {}
    for q in out:
        counts[(q["test"], q["section"])] = counts.get((q["test"], q["section"]), 0) + 1
    print(f"shsat: wrote {len(out)} questions, {len(stimuli_out)} stimuli -> {dst}")
    for k in sorted(counts):
        print(f"  test {k[0]} {k[1]}: {counts[k]}")
    keys = [q["correct"][0] for q in out if q["format"] == "single" and not q.get("lockedOrder")]
    print("  key slots A-D:", [keys.count(i) for i in range(4)])
    print(f"  {total_probs} problems")
    sys.exit(1 if total_probs else 0)


if __name__ == "__main__":
    main()
