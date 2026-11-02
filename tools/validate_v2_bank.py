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
MARKER = re.compile(r"\{\{([^{}]+)\}\}")
BLANK = re.compile(r"\[\[(\d+)\]\]")
def check_format(q):
    """Shape rules per format (data/v2/SCHEMA.md). Returns a list of problems."""
    f, cor, opts = q["format"], q.get("correct") or [], q.get("options") or []
    bad = []
    if f == "numeric":
        return [] if q.get("numeric", {}).get("answers") else ["numeric without answers"]
    if f in ("single", "multi", "order"):
        lo = 3 if f == "order" else 2
        if not (lo <= len(opts) <= 6): bad.append(f"{len(opts)} options")
        if not cor or any(not 0 <= c < len(opts) for c in cor): bad.append("bad correct index")
        if f == "single" and len(cor) != 1: bad.append("single needs one key")
        if f == "multi" and q.get("select") and len(cor) != q["select"]: bad.append(f"select {q['select']} but {len(cor)} keys")
        if f == "order" and sorted(cor) != list(range(len(opts))): bad.append("order key must list every option once")
    elif f == "highlight":
        text = q.get("passage") or q["stem"]
        if q.get("passage") and MARKER.search(q["stem"]): bad.append("markers in both passage and stem")
        n = len(MARKER.findall(text))
        if not 4 <= n <= 10: bad.append(f"{n} highlight markers")
        if not cor or any(not 0 <= c < n for c in cor) or len(set(cor)) != len(cor): bad.append("bad highlight key")
    elif f == "matrix":
        rows, cols = q.get("rows") or [], q.get("columns") or []
        if not 2 <= len(rows) <= 6 or not 2 <= len(cols) <= 4: bad.append(f"matrix {len(rows)}x{len(cols)}")
        if len(cor) != len(rows) or any(not 0 <= c < len(cols) for c in cor): bad.append("matrix key must give a column per row")
    elif f == "cloze":
        blanks = q.get("blanks") or []
        nums = [int(x) for x in BLANK.findall(q["stem"])]
        if nums != list(range(1, len(blanks) + 1)): bad.append(f"cloze placeholders {nums} vs {len(blanks)} blanks")
        if any(not 2 <= len(b) <= 5 for b in blanks): bad.append("cloze blank needs 2 to 5 choices")
        if len(cor) != len(blanks) or any(not 0 <= c < len(b) for c, b in zip(cor, blanks)): bad.append("cloze key must give a choice per blank")
    elif f == "bowtie":
        groups = q.get("groups") or []
        if [g.get("pick") for g in groups] != [2, 1, 2]: bad.append("bowtie needs groups picking 2, 1, 2")
        starts, k = [], 0
        for g in groups:
            starts.append(k); k += len(g.get("options", []))
        for gi, g in enumerate(groups):
            mine = [c for c in cor if starts[gi] <= c < starts[gi] + len(g["options"])]
            if len(mine) != g["pick"]: bad.append(f"bowtie group {gi} has {len(mine)} keys, wants {g['pick']}")
        if any(not 0 <= c < k for c in cor): bad.append("bowtie key out of range")
    else:
        bad.append(f"unknown format {f}")
    return bad

# A stem about the test itself (its length, pass mark, timing, languages, retakes),
# never a real exam question. Same rule as the v1 validate_bank.py META check.
import importlib.util
_vb = importlib.util.spec_from_file_location("vb", os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".claude", "skills", "exam-bank", "scripts", "validate_bank.py"))
_m = importlib.util.module_from_spec(_vb); _vb.loader.exec_module(_m)
for q in questions:
    errors += [f"{q['id']}: {b}" for b in check_format(q)]
    if _m.is_meta(q["id"], q["stem"]): errors.append(f"{q['id']}: asks about the test itself, not its subject")
    if q["test"] == 0 and (q["module"] != 1 or q.get("variant")): errors.append(f"{q['id']}: drill-only item must be module 1 with no variant")
    if q.get("stimulusId") and q["stimulusId"] not in stimuli: errors.append(f"{q['id']}: unknown stimulus {q['stimulusId']}")
    if q.get("figure") and not os.path.exists("public" + q["figure"]["src"]): errors.append(f"{q['id']}: missing figure {q['figure']['src']}")
    texts = [q.get("passage", ""), q["stem"], q["explanation"], *q.get("options", []), *q.get("rows", []), *q.get("columns", []),
             *[c for b in q.get("blanks", []) for c in b], *[o for g in q.get("groups", []) for o in g.get("options", [])]]
    for t in texts:
        if re.search(r"(?<!\\)\$\d[\d,.]*\b(?![^$]*\$)", t): errors.append(f"{q['id']}: unescaped currency: {t[:60]!r}")
        if t.replace("\\$", "").count("$") % 2: errors.append(f"{q['id']}: unbalanced $ in {t[:60]!r}")
        if "—" in t or "’" in t or "“" in t: errors.append(f"{q['id']}: curly quote or em dash")
for s in stimuli.values():
    if MARKER.search(s.get("text", "")): errors.append(f"stimulus {s['id']}: highlight markers belong in an item passage")
# coverage
for test, sections in plan.items():
    for section, mods in sections.items():
        for key, want in mods.items():
            module, _, variant = key.partition(":")
            got = sum(1 for q in questions if q["test"] == int(test) and q["section"] == section and q["module"] == int(module) and (q.get("variant") or "") == variant)
            if got != want: errors.append(f"test {test} {section} module {key}: {got} items, want {want}")
print(f"{exam}: {len(questions)} questions, {len(stimuli)} stimuli, {len(errors)} problems")
# keep the catalog's question count in step with the bank
sizes_path = "lib/v2/bankSizes.ts"
src = open(sizes_path).read()
line = re.compile(rf"^  {re.escape(exam)}: \d+,$", re.M)
entry = f"  {exam}: {len(questions)},"
src = line.sub(entry, src) if line.search(src) else src.replace("};", entry + "\n};")
open(sizes_path, "w").write(src)
for e in errors: print("  -", e)
sys.exit(1 if errors else 0)
