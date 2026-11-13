#!/usr/bin/env python3
"""Build data/v2/mapgrowth/questions.json from the sources in this folder.

Usage (from the repo root):
  python3 -I tools/next100/mapgrowth/build.py            build the bank
  python3 -I tools/next100/mapgrowth/build.py --check F  lint one source file (e.g. math_nbt.py)

Sources (ITEMS lists of dicts, format in BRIEF.md), by section:
  math:     math_nbt.py, math_oa.py, math_md.py, math_geo.py
  reading:  read_lit.py, read_info.py, read_vocab.py
  language: lang_writing.py, lang_grammar.py, lang_mech.py

Per test the counts follow NWEA's example blueprint (MAP Growth Technical Report
2024-2025, Table 3.2): Math 2-5 Number and Operations 13, Measurement and Data 11,
Operations and Algebraic Thinking 10, Geometry 6; Reading 2-5 and Language Usage
2+ 13 per instructional area. Within a section the domains are interleaved and
items run easy to hard. A reading stimulus's questions stay together.
Ids: MAP-T1-001.., MAP-T2-.., MAP-D-.. (drill only, test 0).
"""
import json, os, re, runpy, sys
from fractions import Fraction

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(SRC)))
PREFIX = "MAP"

FILES = {
    "math_nbt.py": ("math", "mapMathNBT", {1: 13, 2: 13, 0: 7}),
    "math_md.py": ("math", "mapMathMD", {1: 11, 2: 11, 0: 9}),
    "math_oa.py": ("math", "mapMathOA", {1: 10, 2: 10, 0: 10}),
    "math_geo.py": ("math", "mapMathGeo", {1: 6, 2: 6, 0: 14}),
    "read_lit.py": ("reading", "mapReadLit", {1: 13, 2: 13, 0: 7}),
    "read_info.py": ("reading", "mapReadInfo", {1: 13, 2: 13, 0: 7}),
    "read_vocab.py": ("reading", "mapReadVocab", {1: 13, 2: 13, 0: 7}),
    "lang_writing.py": ("language", "mapLangWriting", {1: 13, 2: 13, 0: 7}),
    "lang_grammar.py": ("language", "mapLangGrammar", {1: 13, 2: 13, 0: 7}),
    "lang_mech.py": ("language", "mapLangMechanics", {1: 13, 2: 13, 0: 7}),
}
SECTIONS = ["math", "reading", "language"]
BASICS = set("""rounding fractionConvert wordProblems areaPerimeter readingTable mainIdea findingDetail
inference wordsInContext authorPurpose textStructure sequenceEvents synonyms wordParts subjectVerb
apostrophes commonlyConfused pronounCase verbTense commaSplices transitions topicSentences preciseWords
itsIts listIntroCommas concision""".split())
SLOTS = [0, 2, 1, 3, 2, 0, 3, 1]
POSITIONAL = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)s?\b|\bchoice [A-D]\b|\boption [A-D]\b", re.I)


def as_number(s):
    t = s.replace("\\$", "").replace(",", "").strip()
    t = re.sub(r"\s*(cm|m|km|in\.?|inches|feet|ft|yards|miles|g|kg|lb|pounds|ounces|oz|mL|L|liters|cups|quarts|gallons|minutes|hours|seconds|days|weeks|square units|sq ft|square feet|square inches|square meters|square centimeters|cubic units|cubic feet|cubic inches|cubic centimeters|degrees|°|tickets|students|cents)$", "", t)
    m = re.fullmatch(r"(\d+) (\d+)/(\d+)", t)
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
        if q.get("basics") and q["basics"] not in BASICS:
            probs.append(f"{where}: unknown basics {q['basics']}")
        if q.get("stim") and q["stim"] not in stimuli:
            probs.append(f"{where}: unknown stim {q['stim']}")
        st = q["stem"].strip()
        if not (st.endswith("?") or st.endswith(":") or st.endswith("Choose two.") or st.endswith("Choose three.") or st.endswith("Type the number.")):
            probs.append(f"{where}: stem must end in ? or :")
        key_stem = re.sub(r"\W+", " ", st.lower())
        if key_stem in stems and not q.get("stim"):
            probs.append(f"{where}: duplicate stem")
        stems.add(key_stem)
        text = " ".join([st, q.get("expl", ""), q.get("passage", "")] + ([q["key"]] if isinstance(q.get("key"), str) else list(q.get("key") or [])) + list(q.get("wrong") or []))
        if "—" in text or " – " in text:
            probs.append(f"{where}: em/en dash")
        if "of the above" in text.lower():
            probs.append(f"{where}: of the above")
        if POSITIONAL.search(q.get("expl", "") + " " + st):
            probs.append(f"{where}: points at an option by position")
        if re.search(r"(?<!\\)\$", text):
            probs.append(f"{where}: unescaped $ (use D)")
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


def build_item(q, dom, section, i):
    item = {"section": section, "test": q["test"], "module": 1, "domain": dom, "skill": q["skill"], "difficulty": q["diff"]}
    if q.get("basics"):
        item["basics"] = q["basics"]
    if q.get("passage"):
        item["passage"] = q["passage"].strip()
    if "num" in q:
        item.update(format="numeric", stem=q["stem"], numeric={"answers": q["num"], "tolerance": 0, **({"wholeNumber": True} if all(re.fullmatch(r"\d+", a) for a in q["num"]) else {})})
    else:
        key, wrong = q["key"], list(q["wrong"])
        keys = key if isinstance(key, list) else [key]
        opts = keys + wrong
        nums = [as_number(o) for o in opts]
        if all(n is not None for n in nums):
            opts = [o for _, o in sorted(zip(nums, opts), key=lambda p: p[0])]
            item["lockedOrder"] = True
        else:
            slot = SLOTS[i % len(SLOTS)]
            if isinstance(key, list):
                opts = wrong[:]
                for j, k in enumerate(keys):
                    opts.insert(min(len(opts), (slot + j * 2) % (len(opts) + 1)), k)
            else:
                opts = wrong[:]
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
        probs, avg = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", p)
        print(f"{fname}: {len(items)} items, avg option length {avg:.1f}, {len(probs)} problems")
        sys.exit(1 if probs else 0)

    pools, stimuli_all, total_probs = {}, {}, 0
    for fname, (section, dom, _) in FILES.items():
        items, stimuli = load(fname)
        if items is None:
            sys.exit(f"missing {fname}")
        probs, _ = lint(fname, items, stimuli)
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
        for section in SECTIONS:
            # Units: a stimulus's questions stay together; others are single items.
            lanes = []
            for dom, (sec, items) in pools.items():
                if sec != section:
                    continue
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
                units.sort(key=lambda u: sum(q["diff"] for _, q in u) / len(u))
                lanes.append((dom, units))
            # Interleave domains in proportion to their size, easy to hard.
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
                        sid = f"{PREFIX}-{dom[3:]}-{q['stim']}"
                        item["stimulusId"] = sid
                        if sid not in used:
                            used.add(sid)
                            title, text = stimuli_all[f"{dom}:{q['stim']}"]
                            stimuli_out.append({"id": sid, "title": title, "text": text.strip()})
                    out.append(item)
    dst = os.path.join(ROOT, "data/v2/mapgrowth/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli_out, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = {}
    for q in out:
        counts[(q["test"], q["section"])] = counts.get((q["test"], q["section"]), 0) + 1
    print(f"mapgrowth: wrote {len(out)} questions, {len(stimuli_out)} stimuli -> {dst}")
    for k in sorted(counts):
        print(f"  test {k[0]} {k[1]}: {counts[k]}")
    keys = [q["correct"][0] for q in out if q["format"] == "single" and not q.get("lockedOrder")]
    print("  key slots A-D:", [keys.count(i) for i in range(4)])
    print(f"  {total_probs} problems")
    sys.exit(1 if total_probs else 0)


if __name__ == "__main__":
    main()
