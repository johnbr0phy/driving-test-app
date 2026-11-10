#!/usr/bin/env python3
"""Build lib/stateExamFacts.json from the "Official exam facts" tables in
docs/re-state-sources/*.md and docs/insurance-state-sources/*.md.

The state landing pages (components/exam/StateExamLanding.tsx) show these
rows, so a fact is edited in its sources file and this script is re-run.
Usage: python3 -I tools/build_state_exam_facts.py [--check]
"""
import glob, json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "lib", "stateExamFacts.json")
FAMILIES = {"re": "realestate", "lh": "insurance", "pc": "pnc"}


def clean(cell: str) -> str:
    cell = re.sub(r"\*\*|`", "", cell)
    cell = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r"\1", cell)
    return re.sub(r"\s+", " ", cell).strip()


def parse(path: str):
    text = open(path, encoding="utf-8").read()
    accessed = re.search(r"(?:accessed|read) (\d{4}-\d{2}-\d{2})", text)
    start = text.find("## Official exam facts")
    if start < 0:
        return None
    rows = []
    for line in text[start:].split("\n")[1:]:
        if line.startswith("## ") or line.startswith("### "):
            break
        if not line.startswith("|"):
            if rows:
                break
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) < 2 or cells[0] in ("Fact", "") or set(cells[0]) <= set("-: "):
            continue
        url = re.search(r"https?://[^\s)|;,]+", cells[2]) if len(cells) > 2 else None
        row = {"label": clean(cells[0]), "value": clean(cells[1])}
        if url:
            row["url"] = url.group(0).rstrip(".")
        rows.append(row)
    if not rows:
        # Older notes list the facts as "- Label: value" bullets.
        section = text[start:start + 3 + text[start + 3:].find("\n## ")] if "\n## " in text[start + 3:] else text[start:]
        joined = re.sub(r"\n\s{2,}", " ", section)
        page = re.search(r"https?://[^\s)|;,]+", section)
        for m in re.finditer(r"^- ([A-Z][^:\n]{1,40}): (.+)$", joined, re.M):
            row = {"label": clean(m.group(1)), "value": clean(m.group(2))}
            if page:
                row["url"] = page.group(0).rstrip(".")
            rows.append(row)
    # The page shows short, plain facts: long research notes stay in the sources file.
    rows = [r for r in rows if len(r["value"]) <= 200][:10]
    if not rows:
        return None
    return {"accessed": accessed.group(1) if accessed else None, "rows": rows}


def build():
    out = {}
    for path in sorted(glob.glob(os.path.join(ROOT, "docs", "re-state-sources", "*.md"))):
        st = os.path.basename(path)[:-3]
        facts = parse(path)
        if facts:
            out[f"realestate-{st}"] = facts
    for path in sorted(glob.glob(os.path.join(ROOT, "docs", "insurance-state-sources", "*.md"))):
        fam, st = os.path.basename(path)[:-3].split("-")
        facts = parse(path)
        if facts:
            out[f"{FAMILIES[fam]}-{st}"] = facts
    return json.dumps(out, indent=1, ensure_ascii=False) + "\n"


if __name__ == "__main__":
    data = build()
    if "--check" in sys.argv:
        if not os.path.exists(OUT) or open(OUT, encoding="utf-8").read() != data:
            sys.exit("lib/stateExamFacts.json is stale: run python3 -I tools/build_state_exam_facts.py")
        sys.exit(0)
    open(OUT, "w", encoding="utf-8").write(data)
    print(f"wrote {len(json.loads(data))} states to lib/stateExamFacts.json")
