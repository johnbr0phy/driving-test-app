#!/usr/bin/env python3
"""Build data/v2/hspt/questions.json from the sources in this folder.

Usage (from the repo root):
  python3 -I tools/next100/hspt/build.py            build the bank
  python3 -I tools/next100/hspt/build.py --check F  lint one source file (e.g. verbal_syn.py)

Sources (ITEMS lists of dicts: test, skill, diff, stem, key, wrong, expl; optional stim, passage, order), by section in the real HSPT order:
  verbal:   verbal_syn.py, verbal_ant.py, verbal_analogy.py, verbal_classify.py, verbal_logic.py
  quant:    quant_series.py, quant_reason.py, quant_geocomp.py, quant_numcomp.py
  reading:  read_info.py, read_lit.py, read_vocab.py
  math:     math_numbers.py, math_measure.py, math_geometry.py, math_algebra.py, math_stats.py
  language: lang_punct.py, lang_spelling.py, lang_usage.py, lang_comp.py

Per test the counts are about a third of the skill split on STS's sample Performance
Profile (HSPT Interpretive Manual): Verbal 20, Quantitative 18, Reading 20,
Mathematics 22, Language 20, 100 in all. Within a section the domains are
interleaved and items run easy to hard; a reading passage's questions stay together.
Ids: HSPT-T1-001.., HSPT-T2-.., HSPT-D-.. (drill only, test 0).
"""
import json, os, re, runpy, sys
from fractions import Fraction

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(SRC)))
PREFIX = "HSPT"

FILES = {
    "verbal_syn.py": ("verbal", "hsptSynonyms", {1: 4, 2: 4, 0: 4}),
    "verbal_ant.py": ("verbal", "hsptAntonyms", {1: 3, 2: 3, 0: 4}),
    "verbal_analogy.py": ("verbal", "hsptAnalogies", {1: 3, 2: 3, 0: 1}),
    "verbal_classify.py": ("verbal", "hsptClassify", {1: 6, 2: 6, 0: 1}),
    "verbal_logic.py": ("verbal", "hsptLogic", {1: 4, 2: 4, 0: 1}),
    "quant_series.py": ("quant", "hsptSeries", {1: 5, 2: 5, 0: 3}),
    "quant_reason.py": ("quant", "hsptQuantReason", {1: 5, 2: 5, 0: 2}),
    "quant_geocomp.py": ("quant", "hsptGeoCompare", {1: 4, 2: 4, 0: 3}),
    "quant_numcomp.py": ("quant", "hsptNumCompare", {1: 4, 2: 4, 0: 4}),
    "read_info.py": ("reading", "hsptReadInfo", {1: 10, 2: 10, 0: 0}),
    "read_lit.py": ("reading", "hsptReadLit", {1: 3, 2: 3, 0: 3}),
    "read_vocab.py": ("reading", "hsptReadVocab", {1: 7, 2: 7, 0: 8}),
    "math_numbers.py": ("math", "hsptMathNumbers", {1: 10, 2: 10, 0: 5}),
    "math_measure.py": ("math", "hsptMathMeasure", {1: 2, 2: 2, 0: 0}),
    "math_geometry.py": ("math", "hsptMathGeometry", {1: 4, 2: 4, 0: 1}),
    "math_algebra.py": ("math", "hsptMathAlgebra", {1: 3, 2: 3, 0: 1}),
    "math_stats.py": ("math", "hsptMathStats", {1: 3, 2: 3, 0: 1}),
    "lang_punct.py": ("language", "hsptLangPunct", {1: 4, 2: 4, 0: 4}),
    "lang_spelling.py": ("language", "hsptLangSpelling", {1: 3, 2: 3, 0: 4}),
    "lang_usage.py": ("language", "hsptLangUsage", {1: 6, 2: 6, 0: 1}),
    "lang_comp.py": ("language", "hsptLangComp", {1: 7, 2: 7, 0: 1}),
}
SECTIONS = ["verbal", "quant", "reading", "math", "language"]
SLOTS = [0, 2, 1, 3, 2, 0, 3, 1]
POSITIONAL = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)s?\b|\bchoice [A-D]\b|\boption [A-D]\b", re.I)


def as_number(s):
    t = s.replace("\\$", "").replace(",", "").strip()
    t = re.sub(r"\s*(cm|m|km|in\.?|inches|feet|ft|yards|miles|g|kg|lb|pounds|ounces|oz|mL|L|liters|cups|quarts|gallons|minutes|hours|seconds|days|weeks|square units|sq ft|square feet|square inches|square meters|square centimeters|square yards|cubic units|cubic feet|cubic inches|cubic centimeters|degrees|°|%|cents|miles per hour|students|people)$", "", t)
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
        if q.get("stim") and q["stim"] not in stimuli:
            probs.append(f"{where}: unknown stim {q['stim']}")
        st = q["stem"].strip()
        if not (st.endswith("?") or st.endswith(":")):
            probs.append(f"{where}: stem must end in ? or :")
        allopts = ([q["key"]] if isinstance(q.get("key"), str) else list(q.get("key") or [])) + list(q.get("wrong") or [])
        key_stem = re.sub(r"\W+", " ", (st + " " + q.get("passage", "") + " " + " ".join(sorted(allopts))).lower())
        if key_stem in stems and not q.get("stim"):
            probs.append(f"{where}: duplicate stem")
        stems.add(key_stem)
        opts_text = ([q["key"]] if isinstance(q.get("key"), str) else list(q.get("key") or [])) + list(q.get("wrong") or [])
        text = " ".join([st, q.get("expl", ""), q.get("passage", "")] + opts_text)
        if "—" in text or " – " in text:
            probs.append(f"{where}: em/en dash")
        if "of the above" in text.lower():
            probs.append(f"{where}: of the above")
        if POSITIONAL.search(q.get("expl", "") + " " + st):
            probs.append(f"{where}: points at an option by position")
        if re.search(r"(?<!\\)\$", text):
            probs.append(f"{where}: unescaped $ (use D)")
        key = q["key"]
        wrong = q["wrong"]
        keys = key if isinstance(key, list) else [key]
        opts = keys + wrong
        if len(set(opts)) != len(opts):
            probs.append(f"{where}: duplicate option")
        if q.get("order"):
            if sorted(q["order"]) != sorted(opts):
                probs.append(f"{where}: order does not list the options")
            continue
        if isinstance(key, str):
            if len(wrong) != 3:
                probs.append(f"{where}: need 3 wrong options")
            nums = [as_number(o) for o in opts]
            if all(n is not None for n in nums):
                continue  # all-number items are sorted and locked; length is not a tell
            singles += 1
            avg = sum(len(w) for w in wrong) / 3
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
    return probs, avg, (longest, over, singles)


def load(fname):
    path = os.path.join(SRC, fname)
    if not os.path.exists(path):
        return None, {}
    ns = runpy.run_path(path)
    return ns["ITEMS"], ns.get("STIMULI", {})


def build_item(q, dom, section, i):
    item = {"section": section, "test": q["test"], "module": 1, "domain": dom, "skill": q["skill"], "difficulty": q["diff"]}
    if q.get("passage"):
        item["passage"] = q["passage"].strip()
    key, wrong = q["key"], list(q["wrong"])
    keys = key if isinstance(key, list) else [key]
    opts = keys + wrong
    nums = [as_number(o) for o in opts]
    if q.get("order"):
        opts = list(q["order"])
        item["lockedOrder"] = True
    elif all(n is not None for n in nums):
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


def main():
    if "--check" in sys.argv:
        fname = sys.argv[sys.argv.index("--check") + 1]
        items, stimuli = load(fname)
        probs, avg, (lo, ov, n) = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", p)
        print(f"{fname}: {len(items)} items, avg option length {avg:.1f}, key longest {lo}/{n}, over {ov}/{n}, {len(probs)} problems")
        sys.exit(1 if probs else 0)

    pools, stimuli_all, total_probs = {}, {}, 0
    for fname, (section, dom, _) in FILES.items():
        items, stimuli = load(fname)
        if items is None:
            sys.exit(f"missing {fname}")
        probs, _, _ = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", fname, p)
        total_probs += len(probs)
        for k, v in stimuli.items():
            stimuli_all[f"{dom}:{k}"] = v
        pools[dom] = (section, items)

    # No stem (with its passage) twice anywhere in the exam.
    seen = {}
    for dom, (_, items) in pools.items():
        for q in items:
            ko = ([q["key"]] if isinstance(q["key"], str) else list(q["key"])) + list(q["wrong"])
            k = re.sub(r"\W+", " ", (q["stem"] + " " + q.get("passage", "") + " " + q.get("stim", "") + " " + " ".join(sorted(ko))).lower()).strip()
            if k in seen:
                print("  PROBLEM duplicate stem across files:", dom, seen[k], q["stem"][:60])
                total_probs += 1
            seen[k] = dom

    out, stimuli_out, used = [], [], set()
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section in SECTIONS:
            lanes = []
            for dom, (sec, items) in pools.items():
                if sec != section:
                    continue
                mine = [(i, q) for i, q in enumerate(items) if q["test"] == test]
                units, seen_s = [], {}
                for i, q in mine:
                    s = q.get("stim")
                    if s and s in seen_s:
                        seen_s[s].append((i, q))
                        continue
                    u = [(i, q)]
                    if s:
                        seen_s[s] = u
                    units.append(u)
                units.sort(key=lambda u: sum(q["diff"] for _, q in u) / len(u))
                lanes.append((dom, units))
            queue = []
            for dom, units in lanes:
                L = len(units)
                for j, u in enumerate(units):
                    queue.append(((j + 0.5) / L, dom, u))
            queue.sort(key=lambda t: t[0])
            for _, dom, u in queue:
                for i, q in u:
                    n += 1
                    item = build_item(q, dom, section, i)
                    item = {"id": f"{PREFIX}-{tag}-{n:03d}", **item}
                    if q.get("stim"):
                        sid = f"{PREFIX}-{dom[4:]}-{q['stim']}"
                        item["stimulusId"] = sid
                        if sid not in used:
                            used.add(sid)
                            title, text = stimuli_all[f"{dom}:{q['stim']}"]
                            stimuli_out.append({"id": sid, "title": title, "text": text.strip()})
                    out.append(item)
    dst = os.path.join(ROOT, "data/v2/hspt/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli_out, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = {}
    for q in out:
        counts[(q["test"], q["section"])] = counts.get((q["test"], q["section"]), 0) + 1
    print(f"hspt: wrote {len(out)} questions, {len(stimuli_out)} stimuli -> {dst}")
    for k in sorted(counts):
        print(f"  test {k[0]} {k[1]}: {counts[k]}")
    keys = [q["correct"][0] for q in out if q["format"] == "single" and not q.get("lockedOrder")]
    print("  key slots A-D:", [keys.count(i) for i in range(4)])
    print(f"  {total_probs} problems")
    sys.exit(1 if total_probs else 0)


if __name__ == "__main__":
    main()
