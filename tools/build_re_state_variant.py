"""Build a real-estate state variant bank (TX, FL, NY) from the national bank
plus that state's own items.

Usage: python3 tools/build_re_state_variant.py <ST> <dir>

<dir> holds:
  national.json     {"include": [national ids], "overrides": {id: {field: text}}}
                    National items reused on the state form. Overrides change
                    wording only (to fit state law), never the key.
  state_items.json  State-law items, already in bank schema with ids RE<ST>-<ST><SEG>-NNN.

National ids are re-namespaced (RE-CON-001 -> RETX-CON-001) so state mastery
never mixes with the national bank; sourceQuestionId keeps the national id.
Prints the category counts, which are the variant's blueprint in lib/exams.ts
(one full-length test uses every item). CA and NJ come from a different
source (the reviewed 2026-10-10 handoff), see tools/build_re_state_banks.py.
"""
import json, pathlib, sys

FIELDS = ["type", "state", "questionId", "category", "question", "optionA", "optionB",
          "optionC", "optionD", "correctAnswer", "correctIndex", "explanation"]
TEXT = {"question", "optionA", "optionB", "optionC", "optionD", "explanation"}
CATEGORIES = ["rePropertyCharacteristics", "reOwnershipTitle", "reValuation", "reContractsAgency",
              "rePractice", "reDisclosures", "reFinancing", "reMath"]
EXPECTED = {"TX": 120, "FL": 100, "NY": 75}

code, src = sys.argv[1].upper(), pathlib.Path(sys.argv[2])
root = pathlib.Path(__file__).resolve().parent.parent
national = {q["questionId"]: q for q in json.loads((root / "data/real-estate-questions.json").read_text())}
spec = json.loads((src / "national.json").read_text())
prefix = f"RE{code}-"

bank = []
for nid in spec["include"]:
    q = dict(national[nid])
    for field, text in spec.get("overrides", {}).get(nid, {}).items():
        assert field in TEXT, (nid, field)
        q[field] = text
    out = {k: q[k] for k in FIELDS}
    out["questionId"] = prefix + nid[3:]
    out["state"] = code
    out["sourceQuestionId"] = nid
    bank.append(out)
for q in json.loads((src / "state_items.json").read_text()):
    assert q["state"] == code and q["questionId"].startswith(prefix + code), q["questionId"]
    out = {k: q[k] for k in FIELDS}
    out["sourceQuestionId"] = q["questionId"]
    bank.append(out)

for q in bank:
    assert q["category"] in CATEGORIES, q["questionId"]
    assert "ABCD".index(q["correctAnswer"]) == q["correctIndex"], q["questionId"]
    assert "—" not in json.dumps(q, ensure_ascii=False), ("em-dash", q["questionId"])
assert len(bank) == EXPECTED[code] == len({q["questionId"] for q in bank}), len(bank)
bank.sort(key=lambda q: (CATEGORIES.index(q["category"]), q["questionId"]))
(root / f"data/real-estate-{code.lower()}-questions.json").write_text(
    json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
counts = {c: sum(q["category"] == c for q in bank) for c in CATEGORIES}
state_n = sum(q["questionId"].startswith(prefix + code) for q in bank)
print(code, len(bank), f"({len(bank) - state_n} national, {state_n} state)", counts)
