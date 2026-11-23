# Extract the official CCSE items (stem + options) from the Manual CCSE text, for sim.py only.

import re, json, sys
t = open(sys.argv[1], encoding="utf-8").read()
t = t[:t.find("SOLUCIONES")]
lines = [l.strip() for l in t.split("\n")]
items = []; buf = []; opts = []; mode = "stem"
def flush():
    global buf, opts
    if buf and opts:
        stem = " ".join(buf)
        stem = re.sub(r"\b[1-5]\d{3}\b", "", stem)
        stem = re.sub(r"\s+", " ", stem).strip()
        items.append({"stem": stem, "options": opts})
    buf, opts = [], []
for l in lines:
    if not l or l.startswith("=====PAGE") or l.startswith("Instituto Cervantes") or l.startswith("Manual de preparación") or re.fullmatch(r"\d{1,3}", l) or l.startswith("Tarea "):
        continue
    m = re.match(r"^([abc])\.\s*(.*)$", l)
    if m:
        mode = "opt"
        txt = re.sub(r"^(?:[abc]\.\s*)+", "", m.group(2))
        opts.append(txt)
        continue
    if mode == "opt" and len(opts) < 3:
        if opts and not opts[-1].endswith(".") :
            opts[-1] += " " + l; continue
    if mode == "opt":
        flush(); mode = "stem"
    buf.append(l)
flush()
# keep only question-like items (stem ends with … or ? or : ) 
q = [i for i in items if re.search(r"(…|\?|:|\.\.\.)$", i["stem"]) or len(i["options"])==2]
for i in q: i["stem"] = i["stem"][-300:]
json.dump(q, open(sys.argv[2], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(len(items), len(q))
