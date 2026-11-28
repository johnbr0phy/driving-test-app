"""Rebuild reviewed text in legacy bank snapshots whose full inputs are not checked in.

    python3 -I tools/apply_bank_corrections.py insurance [--check]

Each tools/bank_corrections/<family>.json maps question IDs to replacement
text fields. A national ID applies to its national item and to copies in state
forms, except fields already localized in the state's selection manifest.
An exact state question ID takes precedence. The regular state builders apply
the same corrections when regenerating complete banks from their inputs.
<family>_choices.json can update a national option wherever its original
text survives a local edit or a shuffle of the answer letters.
<family>_stems.json rewrites only a matching source ID and stem, so a state
variant keeps any locally required conditions.
"""

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BANK_NAMES = {
    "insurance": "life-health",
    "pnc": "property-casualty",
    "realestate": "real-estate",
}
TEXT_FIELDS = {"question", "optionA", "optionB", "optionC", "optionD", "explanation"}


def _read_map(path):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else {}


def load_corrections(family):
    folder = ROOT / "tools" / "bank_corrections"
    changes = _read_map(folder / f"{family}.json")
    for question_id, fields in changes.items():
        if not fields or fields.keys() - TEXT_FIELDS:
            raise ValueError(f"{question_id}: expected edits to question text, options or explanation")
        if not all(isinstance(text, str) and text.strip() for text in fields.values()):
            raise ValueError(f"{question_id}: correction text must be a nonempty string")
    choices = _read_map(folder / f"{family}_choices.json")
    for question_id, replacements in choices.items():
        if not replacements or not all(isinstance(text, str) and text.strip() for text in replacements.values()):
            raise ValueError(f"{question_id}: missing option replacement text")
        if replacements.keys() & set(replacements.values()):
            raise ValueError(f"{question_id}: cannot replace an option more than once")
    stems = _read_map(folder / f"{family}_stems.json")
    for question_id, versions in stems.items():
        if not versions or versions.keys() & set(versions.values()) or not all(
            isinstance(v, str) and v.strip() for v in versions.values()
        ):
            raise ValueError(f"{question_id}: invalid or chained stem edits")
    return changes, choices, stems


def apply_corrections(question, corrections, overrides=None):
    changes, choices, stems = corrections
    question_id = question["questionId"]
    source_id = question.get("sourceQuestionId", question_id)
    if source_id != question_id:
        localized_fields = (overrides or {}).get(source_id, {})
        for field, text in changes.get(source_id, {}).items():
            if field not in localized_fields:
                question[field] = text
    question.update(changes.get(question_id, {}))
    versions = stems.get(source_id, {})
    question["question"] = versions.get(question["question"], question["question"])
    replacements = choices.get(source_id, {})
    if replacements:
        for letter in "ABCD":
            field = "option" + letter
            if question[field] in replacements:
                question[field] = replacements[question[field]]
    if source_id in changes or question_id in changes or replacements:
        if question["correctAnswer"] not in ("A", "B", "C", "D") or "ABCD".index(question["correctAnswer"]) != question["correctIndex"]:
            raise ValueError(f"{question_id}: inconsistent answer key and index")
        if len({question["option" + letter] for letter in "ABCD"}) != 4:
            raise ValueError(f"{question_id}: duplicate answer options after correction")


def state_overrides(family, state):
    if family == "realestate":
        path = ROOT / "docs" / "re-state-sources" / f"{state}-national.json"
    else:
        prefix = {"insurance": "lh", "pnc": "pc"}[family]
        path = ROOT / "docs" / "insurance-state-sources" / f"{prefix}-{state}-national.json"
    if not path.exists():
        return {}
    return json.loads(path.read_text(encoding="utf-8")).get("overrides", {})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("family", choices=BANK_NAMES)
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    corrections = load_corrections(args.family)
    bank_name = BANK_NAMES[args.family]
    data = ROOT / "data"
    paths = [data / f"{bank_name}-questions.json", *sorted(data.glob(f"{bank_name}-??-questions.json"))]
    edits = {}
    seen = set()
    for path in paths:
        questions = json.loads(path.read_text(encoding="utf-8"))
        overrides = state_overrides(args.family, questions[0]["state"].lower())
        changed = False
        for question in questions:
            seen.update((question["questionId"], question.get("sourceQuestionId")))
            before = question.copy()
            apply_corrections(question, corrections, overrides)
            if question != before:
                changed = True
        if changed:
            edits[path] = questions
    if missing := (corrections[0].keys() | corrections[1].keys() | corrections[2].keys()) - seen:
        parser.error("unmatched correction IDs: " + ", ".join(sorted(missing)))
    for path, questions in edits.items():
        print(path.relative_to(ROOT))
        if not args.check:
            path.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    if args.check and edits:
        parser.exit(1, "Bank corrections have not been applied.\n")


if __name__ == "__main__":
    main()
