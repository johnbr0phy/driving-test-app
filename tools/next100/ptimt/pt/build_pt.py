"""Build data/portugal-imt-questions_pt.json from the English bank and the pt-PT
translation sources t01..t04.json (questionId -> [question, A, B, C, D, explanation]).

Run from the repo root: python3 -I tools/next100/ptimt/pt/build_pt.py
Ids, order, type, state, category, correctAnswer and correctIndex are copied from the
English bank; only the text fields come from the sources. Then validates parity and text.
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[4]
HERE = Path(__file__).resolve().parent
BASE = ROOT / "data" / "portugal-imt-questions.json"
OUT = ROOT / "data" / "portugal-imt-questions_pt.json"
FIELDS = ["question", "optionA", "optionB", "optionC", "optionD", "explanation"]

# Text allowed to equal the English: numbers, units and sign codes only.
WHITELIST = re.compile(r"^[\d\s.,/%]*(km/h|m|g/l|mm|cm|kg)?$")
# Brazilian forms that must not appear in pt-PT copy.
BRAZILIAN = [r"\bvocê\b", r"\btela\b", r"\bcelular\b", r"\bmotorista\b", r"\bacostamento\b",
             r"\bpedestre", r"\bônibus\b", r"\bcarteira de motorista\b", r"\btrem\b", r"\bfaixa de pedestres\b",
             r"\bregistro\b", r"\bdirigir\b", r"\bfreio\b", r"\bestacionar em fila dupla\b"]


def main() -> int:
    base = json.loads(BASE.read_text())
    tr: dict[str, list[str]] = {}
    for f in sorted(HERE.glob("t0*.json")):
        for k, v in json.loads(f.read_text()).items():
            if k in tr:
                print(f"duplicate {k} in {f.name}")
                return 1
            tr[k] = v
    errors = []
    out = []
    for q in base:
        qid = q["questionId"]
        t = tr.get(qid)
        if not t or len(t) != 6:
            errors.append(f"{qid}: missing or wrong length")
            continue
        row = dict(q)
        for field, text in zip(FIELDS, t):
            row[field] = text
            if text.strip() == q[field].strip() and not WHITELIST.match(text.strip()):
                errors.append(f"{qid}.{field}: identical to English: {text}")
            if "—" in text or "–" in text:
                errors.append(f"{qid}.{field}: dash")
            for pat in BRAZILIAN:
                if re.search(pat, text, re.I):
                    errors.append(f"{qid}.{field}: Brazilian form {pat}: {text}")
            if re.search(r"\d\.\d", text) and field != "question" or re.search(r"\b\d+\.\d+\s*(g/l|m|mm)\b", text):
                errors.append(f"{qid}.{field}: decimal point: {text}")
        opts = [row[f"option{L}"] for L in "ABCD"]
        if len(set(opts)) != 4:
            errors.append(f"{qid}: duplicate options")
        out.append(row)
    extra = set(tr) - {q["questionId"] for q in base}
    if extra:
        errors.append(f"extra ids: {sorted(extra)}")
    # Parity check.
    for a, b in zip(base, out):
        for k in ["questionId", "type", "state", "category", "correctAnswer", "correctIndex"]:
            if a[k] != b[k]:
                errors.append(f"{a['questionId']}: {k} differs")
    if len(out) != len(base):
        errors.append(f"count {len(out)} != {len(base)}")
    if errors:
        print("\n".join(errors))
        print(f"FAIL ({len(errors)})")
        return 1
    OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n")
    print(f"PASS: wrote {len(out)} questions to {OUT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
