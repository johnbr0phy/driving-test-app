#!/usr/bin/env python3
"""Sanity checks for a v2 exam's bank files: unique ids, option/key shape,
stimulus references, module coverage per test, variant tags, figure files,
unescaped currency, and KaTeX delimiters that do not balance.

Usage: python3 -I tools/validate_v2_bank.py <exam> <plan json>
  plan: {"section": {"module(:variant)": count, ...}, ...} per test, e.g.
  '{"1": {"rw": {"1": 27, "2:lower": 27, "2:upper": 27}}}'
"""
import json, sys, glob, os, re, collections

exam, plan = sys.argv[1], json.loads(sys.argv[2])
root = f"data/v2/{exam}"
questions, stimuli = [], {}
for f in sorted(glob.glob(f"{root}/*.json")):
    d = json.load(open(f))
    if isinstance(d, list):
        questions += d
    else:
        questions += d["questions"]
        for s in d["stimuli"]:
            stimuli[s["id"]] = s
errors = []
ids = collections.Counter(q["id"] for q in questions)
for i, n in ids.items():
    if n > 1: errors.append(f"duplicate id {i} x{n}")
for q in questions:
    if q["format"] == "numeric":
        if not q.get("numeric", {}).get("answers"): errors.append(f"{q['id']}: numeric without answers")
    else:
        if not (2 <= len(q.get("options", [])) <= 5): errors.append(f"{q['id']}: {len(q.get('options', []))} options")
        if not q.get("correct") or any(c >= len(q["options"]) for c in q["correct"]): errors.append(f"{q['id']}: bad correct index")
    if q.get("stimulusId") and q["stimulusId"] not in stimuli: errors.append(f"{q['id']}: unknown stimulus {q['stimulusId']}")
    if q.get("figure") and not os.path.exists("public" + q["figure"]["src"]): errors.append(f"{q['id']}: missing figure {q['figure']['src']}")
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q.get("options", [])]
    for t in texts:
        if re.search(r"(?<!\\)\$\d[\d,.]*\b(?![^$]*\$)", t): errors.append(f"{q['id']}: unescaped currency: {t[:60]!r}")
        if t.replace("\\$", "").count("$") % 2: errors.append(f"{q['id']}: unbalanced $ in {t[:60]!r}")
        if "—" in t or "’" in t or "“" in t: errors.append(f"{q['id']}: curly quote or em dash")
# coverage
for test, sections in plan.items():
    for section, mods in sections.items():
        for key, want in mods.items():
            module, _, variant = key.partition(":")
            got = sum(1 for q in questions if q["test"] == int(test) and q["section"] == section and q["module"] == int(module) and (q.get("variant") or "") == variant)
            if got != want: errors.append(f"test {test} {section} module {key}: {got} items, want {want}")
print(f"{exam}: {len(questions)} questions, {len(stimuli)} stimuli, {len(errors)} problems")
for e in errors: print("  -", e)
sys.exit(1 if errors else 0)
