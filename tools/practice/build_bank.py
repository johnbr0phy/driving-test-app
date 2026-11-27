"""Build a four-form v1 bank from its blueprint and original tab-separated items."""

import csv
import json
import sys
from pathlib import Path


def build(directory):
    spec = json.loads((directory / "spec.json").read_text(encoding="utf-8"))
    categories = {key: [] for key in spec["categories"]}
    for path in sorted(directory.glob("*.tsv")):
        with path.open(encoding="utf-8", newline="") as stream:
            for line, row in enumerate(csv.reader(stream, delimiter="\t", quoting=csv.QUOTE_NONE), 1):
                if len(row) != 7 or row[0] not in categories or not all(row):
                    raise ValueError(f"{path}:{line}: expected category, stem, key, three distractors and explanation")
                categories[row[0]].append(row[1:])

    questions = []
    for category, (segment, per_form) in spec["categories"].items():
        items = categories[category]
        if len(items) != 4 * per_form:
            raise ValueError(f"{category}: expected {4 * per_form} items, found {len(items)}")
        for index, (stem, key, *rest) in enumerate(items):
            options, explanation = rest[:-1], rest[-1]
            position = index % 4
            options.insert(position, key)
            questions.append({
                "type": spec["stateCode"],
                "state": "ALL",
                "questionId": f"{spec['prefix']}-{segment}-{index + 1:03d}",
                "category": category,
                "question": stem,
                **{f"option{letter}": option for letter, option in zip("ABCD", options)},
                "correctAnswer": "ABCD"[position],
                "correctIndex": position,
                "explanation": explanation,
            })
    if len(questions) != 200:
        raise ValueError(f"{directory.name}: expected 200 questions, found {len(questions)}")
    target = Path(__file__).resolve().parents[2] / "data" / f"{directory.name}-questions.json"
    target.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


if __name__ == "__main__":
    build(Path(__file__).resolve().parent / sys.argv[1])
