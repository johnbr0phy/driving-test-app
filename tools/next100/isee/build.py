#!/usr/bin/env python3
"""Build data/v2/isee/questions.json from the sources in this folder.

Usage (from the repo root):
  python3 -I tools/next100/isee/build.py            build the bank
  python3 -I tools/next100/isee/build.py --check F  lint one source file (e.g. vr_syn.py)

ISEE Middle Level (E3n, formerly ERB). Sources (ITEMS lists of dicts) by section:
  verbal:  vr_syn.py (synonyms), vr_sent.py (sentence completions)
  quant:   qr_word.py (word problems), qr_qc.py (quantitative comparisons)
  reading: rc.py (passages, six questions each, one per ISEE reading category)
  math:    ma_num.py, ma_alg.py, ma_geo.py, ma_data.py

Item fields: test (1, 2 or 0 for drill only), skill, diff (1-3), stem, expl, and
either key + wrong (three wrong options), or qc ("A", "B", "C" or "D") for a
quantitative comparison. Optional: basics (a Basics skill id), stim (rc.py), dom
(rc.py: Main, Support, Inference, Vocab, Org, Tone).

Per test the counts are about half the real Middle Level sections at the real
pace: Verbal 20 (10 synonyms, 10 sentence completions), Quantitative 19 (10 word
problems, 9 comparisons), Reading 18 (3 passages x 6), Math Achievement 24 (6 per
strand). Synonym options are listed in alphabetical order and locked, as on the
real test; comparison options keep the fixed four; all-number options are sorted
and locked. Ids: ISEE-T1-001.., ISEE-T2-.., ISEE-D-.. (drill only, test 0).
"""
import json, os, re, runpy, sys
from fractions import Fraction

SRC = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(SRC)))
PREFIX = "ISEE"

RC_DOMS = {
    "Main": "iseeRcMain", "Support": "iseeRcSupport", "Inference": "iseeRcInference",
    "Vocab": "iseeRcVocab", "Org": "iseeRcOrg", "Tone": "iseeRcTone",
}
FILES = {
    "vr_syn.py": ("verbal", "iseeSynonyms", {1: 10, 2: 10, 0: 10}),
    "vr_sent.py": ("verbal", "iseeSentence", {1: 10, 2: 10, 0: 10}),
    "qr_word.py": ("quant", "iseeQrWord", {1: 10, 2: 10, 0: 10}),
    "qr_qc.py": ("quant", "iseeQrCompare", {1: 9, 2: 9, 0: 11}),
    "rc.py": ("reading", None, {1: 18, 2: 18, 0: 24}),
    "ma_num.py": ("math", "iseeMaNumber", {1: 6, 2: 6, 0: 4}),
    "ma_alg.py": ("math", "iseeMaAlgebra", {1: 6, 2: 6, 0: 4}),
    "ma_geo.py": ("math", "iseeMaGeometry", {1: 6, 2: 6, 0: 4}),
    "ma_data.py": ("math", "iseeMaData", {1: 6, 2: 6, 0: 4}),
}
SECTIONS = ["verbal", "quant", "reading", "math"]
# Section order inside a test: synonyms then sentences, word problems then
# comparisons (as on the real test); math strands interleaved easy to hard.
BLOCKS = {"verbal": True, "quant": True, "reading": True, "math": False}
QC_OPTIONS = [
    "The quantity in Column A is greater.",
    "The quantity in Column B is greater.",
    "The two quantities are equal.",
    "The relationship cannot be determined from the information given.",
]
# The Basics each drill opens with (lib/v2/exams/isee.ts). A tag outside its
# drill's list can never show a brush-up card, so the build drops it.
DRILL_BASICS = {
    "iseeRcMain": {"mainIdea", "findingDetail", "wordsInContext", "claimSupport"},
    "iseeRcSupport": {"mainIdea", "findingDetail", "wordsInContext", "claimSupport"},
    "iseeRcVocab": {"mainIdea", "findingDetail", "wordsInContext", "claimSupport"},
    "iseeMaNumber": {"fractionOps", "percents", "ratios", "solveX"},
    "iseeMaAlgebra": {"fractionOps", "percents", "ratios", "solveX"},
}
SLOTS = [0, 2, 1, 3, 2, 0, 3, 1]
POSITIONAL = re.compile(r"\b(first|second|third|fourth|last|other two)\s+(option|choice|answer)s?\b|\bchoice [A-D]\b|\boption [A-D]\b", re.I)
UNITS = r"(cm|m|km|in\.?|inches|feet|ft|yards|miles|g|kg|mL|L|liters|cups|cubic centimeters|cubic inches|square inches|square units|square meters|square feet|square centimeters|degrees|°|minutes|hours|students|marbles|pages)"


def as_number(s):
    t = s.replace("\\$", "").replace(",", "").strip()
    t = re.sub(r"\s*" + UNITS + r"$", "", t)
    m = re.fullmatch(r"(-?)(\d+) (\d+)/(\d+)", t)
    try:
        if m:
            v = Fraction(int(m[2])) + Fraction(int(m[3]), int(m[4]))
            return -v if m[1] else v
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
    lens, stems = [], set()
    for i, q in enumerate(items):
        where = f"{fname}#{i + 1} '{q['stem'][:50]}'"
        for f in ("test", "skill", "diff", "stem", "expl"):
            if f not in q:
                probs.append(f"{where}: missing {f}")
        if dom is None and q.get("dom") not in RC_DOMS:
            probs.append(f"{where}: dom must be one of {sorted(RC_DOMS)}")
        if q.get("stim") and q["stim"] not in stimuli:
            probs.append(f"{where}: unknown stim {q['stim']}")
        st = q["stem"].strip()
        if not (st.endswith("?") or st.endswith(":")):
            probs.append(f"{where}: stem must end in ? or :")
        key_stem = re.sub(r"\W+", " ", st.lower())
        if key_stem in stems and not q.get("stim"):
            probs.append(f"{where}: duplicate stem")
        stems.add(key_stem)
        opts_text = [q["key"]] + list(q["wrong"]) if "key" in q else []
        text = " ".join([st, q.get("expl", "")] + opts_text)
        if "—" in text or " – " in text or "’" in text or "“" in text:
            probs.append(f"{where}: em dash or curly quote")
        if "of the above" in text.lower():
            probs.append(f"{where}: of the above")
        if POSITIONAL.search(q.get("expl", "") + " " + st):
            probs.append(f"{where}: points at an option by position")
        if re.search(r"(?<!\\)\$", text):
            probs.append(f"{where}: unescaped $ (use D)")
        if "qc" in q:
            if q["qc"] not in "ABCD" or len(q["qc"]) != 1:
                probs.append(f"{where}: qc must be A, B, C or D")
            continue
        key, wrong = q["key"], q["wrong"]
        opts = [key] + wrong
        if len(wrong) != 3:
            probs.append(f"{where}: need 3 wrong options")
        if len(set(opts)) != len(opts):
            probs.append(f"{where}: duplicate option")
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


def build_item(q, dom, section, i, alpha):
    item = {"section": section, "test": q["test"], "module": 1, "domain": dom, "skill": q["skill"], "difficulty": q["diff"]}
    if q.get("basics") in DRILL_BASICS.get(dom, set()):
        item["basics"] = q["basics"]
    item["format"] = "single"
    item["stem"] = q["stem"]
    if "qc" in q:
        item["options"] = list(QC_OPTIONS)
        item["correct"] = ["ABCD".index(q["qc"])]
        item["lockedOrder"] = True
    else:
        key, wrong = q["key"], list(q["wrong"])
        opts = [key] + wrong
        nums = [as_number(o) for o in opts]
        if all(n is not None for n in nums):
            opts = [o for _, o in sorted(zip(nums, opts), key=lambda p: p[0])]
            item["lockedOrder"] = True
        elif alpha:
            opts = sorted(opts, key=str.lower)
            item["lockedOrder"] = True
        else:
            opts = wrong[:]
            opts.insert(SLOTS[i % len(SLOTS)], key)
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

    pools, stimuli_all, total_probs = [], {}, 0
    for fname, (section, dom, _) in FILES.items():
        items, stimuli = load(fname)
        if items is None:
            sys.exit(f"missing {fname}")
        probs, _ = lint(fname, items, stimuli)
        for p in probs:
            print("  PROBLEM", fname, p)
        total_probs += len(probs)
        stimuli_all.update(stimuli)
        pools.append((fname, section, dom, items))

    out, stimuli_out, used = [], [], set()
    for test in (1, 2, 0):
        tag = f"T{test}" if test else "D"
        n = 0
        for section in SECTIONS:
            lanes = []
            for fname, sec, dom, items in pools:
                if sec != section:
                    continue
                mine = [(i, q) for i, q in enumerate(items) if q["test"] == test]
                if not q_has_stim(mine):
                    mine.sort(key=lambda p: p[1]["diff"])
                lanes.append((fname, dom, mine))
            if BLOCKS[section]:
                seq = [(fname, dom, i, q) for fname, dom, mine in lanes for i, q in mine]
            else:
                queue = []
                for fname, dom, mine in lanes:
                    L = len(mine)
                    for j, (i, q) in enumerate(mine):
                        queue.append(((j + 0.5) / L, fname, dom, i, q))
                queue.sort(key=lambda t: t[0])
                seq = [t[1:] for t in queue]
            for fname, dom, i, q in seq:
                n += 1
                d = dom or RC_DOMS[q["dom"]]
                item = build_item(q, d, section, i, fname == "vr_syn.py")
                item = {"id": f"{PREFIX}-{tag}-{n:03d}", **item}
                if q.get("stim"):
                    sid = f"{PREFIX}-RC-{q['stim']}"
                    item["stimulusId"] = sid
                    if sid not in used:
                        used.add(sid)
                        title, text = stimuli_all[q["stim"]]
                        stimuli_out.append({"id": sid, "title": title, "text": text.strip()})
                out.append(item)
    dst = os.path.join(ROOT, "data/v2/isee/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump({"stimuli": stimuli_out, "questions": out}, f, indent=2, ensure_ascii=False)
        f.write("\n")
    counts = {}
    for q in out:
        counts[(q["test"], q["section"])] = counts.get((q["test"], q["section"]), 0) + 1
    print(f"isee: wrote {len(out)} questions, {len(stimuli_out)} stimuli -> {dst}")
    for k in sorted(counts):
        print(f"  test {k[0]} {k[1]}: {counts[k]}")
    keys = [q["correct"][0] for q in out if q["format"] == "single"]
    print("  key slots A-D:", [keys.count(i) for i in range(4)])
    print(f"  {total_probs} problems")
    sys.exit(1 if total_probs else 0)


def q_has_stim(mine):
    return any(q.get("stim") for _, q in mine)


if __name__ == "__main__":
    main()
