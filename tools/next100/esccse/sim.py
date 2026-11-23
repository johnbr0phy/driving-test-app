# Copyright check: compare the bank with the official CCSE item list. Usage:
#   python3 -I parse.py <manual-ccse-2026.txt> official.json   (text extracted from the Manual PDF)
#   python3 -I sim.py official.json data/es-ccse-questions.json

import json, re, sys, unicodedata, difflib
off = json.load(open(sys.argv[1])); mine = json.load(open(sys.argv[2]))
STOP = set("el la los las de del en y a al un una unos unas que se es por para con su sus o lo como qué cuál cuáles quién quiénes dónde cuándo cuántos cuántas cuánto este esta estos estas son ser según más hay ha han tiene tienen puede pueden no le les españa español española españoles".split())
def norm(s):
    s = unicodedata.normalize("NFD", s.lower()); s = "".join(c for c in s if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9 ]", " ", s); return re.sub(r"\s+", " ", s).strip()
def optn(s):
    s = norm(s); s = re.sub(r"^(el|la|los|las|en|un|una|de|del|al|a) ", "", s); return s
def words(s): return {w for w in norm(s).split() if w not in STOP and len(w) > 2}
for o in off:
    st = o["stem"]
    if "PREGUNTAS" in st: st = st.split("PREGUNTAS")[-1]
    o["n"] = norm(st)[-200:]; o["w"] = words(st); o["o"] = {optn(x) for x in o["options"]}
flags = []
for r in mine:
    opts = [r["option" + c] for c in "ABCD"]; key = opts[r["correctIndex"]]
    n = norm(r["question"]); w = words(r["question"]); mo = {optn(x) for x in opts}
    best = None
    for o in off:
        ratio = difflib.SequenceMatcher(None, n, o["n"]).ratio()
        jac = len(w & o["w"]) / max(1, len(w | o["w"]))
        shared = len(mo & o["o"])
        keyin = optn(key) in o["o"]
        score = max(ratio, jac + 0.15 * shared)
        why = []
        if ratio >= 0.6: why.append(f"ratio {ratio:.2f}")
        if jac >= 0.45: why.append(f"jac {jac:.2f}")
        if shared >= 2: why.append(f"shared {shared}")
        if jac >= 0.3 and keyin: why.append(f"jac {jac:.2f}+key")
        if why and (best is None or score > best[0]):
            best = (score, why, o)
    if best:
        flags.append((r["questionId"], best[1], r["question"], key, best[2]["stem"][-120:], best[2]["options"]))
for f in flags:
    print(f[0], f[1], "\n  MINE:", f[2], "->", f[3], "\n  OFF :", f[4], f[5])
print(len(flags), "flagged of", len(mine))
