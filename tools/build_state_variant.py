"""Build a state variant bank from a family's national bank plus that state's
own items. Families: realestate (TX, FL, NY), insurance (life & health) and
pnc (property & casualty), each for TX, FL and CA.

Usage: python3 tools/build_state_variant.py <family> <ST> <dir>

<dir> holds:
  national.json     {"include": [national ids], "overrides": {id: {field: text}}}
                    National items reused on the state form. Overrides change
                    wording only (to fit state law), never the key.
  state_items.json  State-law items, already in bank schema with ids <P><ST>-<ST><SEG>-NNN
                    (P is the family prefix without its dash: RE, LH, PC).

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
FAMILIES = {
    "realestate": {
        "prefix": "RE", "bank": "real-estate",
        "categories": ["rePropertyCharacteristics", "reOwnershipTitle", "reValuation", "reContractsAgency",
                       "rePractice", "reDisclosures", "reFinancing", "reMath"],
        "expected": {"TX": 120, "FL": 100, "NY": 75},
    },
    "insurance": {
        "prefix": "LH", "bank": "life-health",
        "categories": ["insuranceRegulation", "generalInsurance", "lifeBasics", "lifePolicyTypes",
                       "lifeProvisions", "annuitiesRetirement", "healthBasics", "healthProvisions",
                       "healthPolicyTypes"],
        "expected": {"TX": 130, "FL": 150, "CA": 150},
    },
    "pnc": {
        "prefix": "PC", "bank": "property-casualty",
        "categories": ["pcGeneral", "pcPolicy", "pcHomeowners", "pcAuto", "pcCommercial", "pcLiability", "pcOther"],
        "expected": {"TX": 130, "FL": 150, "CA": 150},
    },
}

fam = FAMILIES[sys.argv[1]]
code, src = sys.argv[2].upper(), pathlib.Path(sys.argv[3])
CATEGORIES, EXPECTED = fam["categories"], fam["expected"]
root = pathlib.Path(__file__).resolve().parent.parent
national = {q["questionId"]: q for q in json.loads((root / f"data/{fam['bank']}-questions.json").read_text())}
spec = json.loads((src / "national.json").read_text())
prefix = f"{fam['prefix']}{code}-"

bank = []
for nid in spec["include"]:
    q = dict(national[nid])
    for field, text in spec.get("overrides", {}).get(nid, {}).items():
        assert field in TEXT, (nid, field)
        q[field] = text
    out = {k: q[k] for k in FIELDS}
    out["questionId"] = prefix + nid.split("-", 1)[1]
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
(root / f"data/{fam['bank']}-{code.lower()}-questions.json").write_text(
    json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
counts = {c: sum(q["category"] == c for q in bank) for c in CATEGORIES}
state_n = sum(q["questionId"].startswith(prefix + code) for q in bank)
print(code, len(bank), f"({len(bank) - state_n} national, {state_n} state)", counts)
