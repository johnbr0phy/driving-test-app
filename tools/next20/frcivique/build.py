"""Build the original examen civique bank and its per-item source map.

    python3 -I tools/next20/frcivique/build.py

Each <file>.py defines ROWS = [(stem, [4 options], key_index, explanation, notion, source_tag, ...)]
and SOURCES = {tag: "URL (title, read date)"}. A file is six blocks in test order: blocks 1-2 at
about A2 (carte de séjour pluriannuelle), 3-4 B1 (carte de résident), 5-6 B2 (naturalisation).
Practice test N takes block N of every pool, so the question id order must not change.
"""
import json
import runpy
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
CATEGORIES = [
    ("principes", "PRI", "frciviquePrincipes", 30),
    ("principes_situations", "PRS", "frciviquePrincipesSit", 36),
    ("institutions", "INS", "frciviqueInstitutions", 36),
    ("droits", "DRO", "frciviqueDroits", 30),
    ("droits_situations", "DRS", "frciviqueDroitsSit", 36),
    ("histoire", "HIS", "frciviqueHistoire", 48),
    ("vivre", "VIV", "frciviqueVivre", 24),
]

bank, mapping = [], []
for module, seg, key, count in CATEGORIES:
    data = runpy.run_path(str(HERE / f"{module}.py"))
    rows, sources = data["ROWS"], data["SOURCES"]
    assert len(rows) == count, (module, len(rows))
    for i, (stem, opts, correct, expl, notion, *tags) in enumerate(rows, 1):
        assert len(opts) == 4 and len(set(opts)) == 4 and 0 <= correct < 4, (module, i)
        assert tags and all(t in sources for t in tags), (module, i, tags)
        qid = f"FRCIV-{seg}-{i:03d}"
        bank.append(dict(type="FRCIVIQUE", state="ALL", questionId=qid, category=key, question=stem,
                         **dict(zip(("optionA", "optionB", "optionC", "optionD"), opts)),
                         correctAnswer="ABCD"[correct], correctIndex=correct, explanation=expl))
        level = ["A2", "A2", "B1", "B1", "B2", "B2"][(i - 1) * 6 // count]
        mapping.append(dict(questionId=qid, notion=notion, level=level, sources=[sources[t] for t in tags]))

(ROOT / "data/france-examen-civique-questions.json").write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n")
(HERE / "item-source-map.json").write_text(json.dumps(mapping, ensure_ascii=False, indent=2) + "\n")
print(f"wrote {len(bank)} questions")
