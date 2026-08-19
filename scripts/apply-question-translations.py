#!/usr/bin/env python3
"""Apply per-question translation patches onto ES/VI/KO banks.

Patch files are JSON objects:
  { "AL-001": { "question": "...", "optionB": "...", "explanation": "..." }, ... }

Only fields that currently still match English (or are empty) are updated.
IDs, type, state, category, correctAnswer, and correctIndex are never changed.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EN_PATH = ROOT / "data" / "questions.json"
BANKS = {
    "es": ROOT / "data" / "questions_es.json",
    "vi": ROOT / "data" / "questions_vi.json",
    "ko": ROOT / "data" / "questions_ko.json",
}
FIELDS = ("question", "optionA", "optionB", "optionC", "optionD", "explanation")
INDENT = {"es": 2, "vi": 1, "ko": 1}


def load(path: Path):
    with path.open() as f:
        return json.load(f)


def collect_patches(lang: str) -> dict:
    patches = {}
    search_dirs = [
        Path("/tmp/qbank-work/patches") / lang,
        ROOT / "tmp-translations" / lang,
    ]
    files = []
    for d in search_dirs:
        if d.is_dir():
            files.extend(sorted(d.glob("*.json")))
    for extra in sys.argv[2:]:
        files.append(Path(extra))
    for path in files:
        data = json.loads(path.read_text())
        if not isinstance(data, dict):
            raise SystemExit(f"Patch {path} is not an object")
        for qid, fields in data.items():
            if not isinstance(fields, dict):
                continue
            dest = patches.setdefault(qid, {})
            dest.update({k: v for k, v in fields.items() if k in FIELDS and v})
        print(f"loaded {path} ({len(data)} questions)")
    return patches


def apply(lang: str) -> int:
    en = {q["questionId"]: q for q in load(EN_PATH)}
    path = BANKS[lang]
    bank = load(path)
    patches = collect_patches(lang)
    if not patches:
        print(f"no patches for {lang}")
        return 0

    applied = 0
    skipped_mismatch = 0
    missing = 0
    by_id = {q["questionId"]: q for q in bank}

    for qid, fields in patches.items():
        tq = by_id.get(qid)
        eq = en.get(qid)
        if not tq or not eq:
            missing += 1
            print(f"missing question {qid}")
            continue
        for f, text in fields.items():
            if not isinstance(text, str) or not text.strip():
                continue
            current = tq.get(f, "")
            is_placeholder = (
                "Esta es la respuesta correcta" in (current or "")
                or "This is the correct answer" in (current or "")
            )
            if current == eq[f] or not (current or "").strip() or is_placeholder:
                if current != text:
                    tq[f] = text
                    applied += 1
            elif current != text:
                skipped_mismatch += 1

    path.write_text(
        json.dumps(bank, ensure_ascii=False, indent=INDENT[lang]) + "\n"
    )
    print(
        f"{lang}: applied {applied} field updates; "
        f"skipped already-translated mismatches {skipped_mismatch}; "
        f"missing {missing}"
    )
    return applied


def main() -> int:
    if len(sys.argv) < 2 or sys.argv[1] not in BANKS:
        print("usage: apply-question-translations.py es|vi|ko [patch.json ...]")
        return 2
    apply(sys.argv[1])
    return 0


if __name__ == "__main__":
    sys.exit(main())
