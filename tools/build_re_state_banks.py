"""Build the California and New Jersey real-estate banks from the reviewed
weighted practice forms in the 2026-10-10 content handoff.

Usage: python3 tools/build_re_state_banks.py <path>/tigertest-weighted-practice-forms.json

Each form item carries the reviewed effectiveQuestion for its jurisdiction
(state overlays already resolved), so the app needs no overlay logic. IDs are
re-namespaced (RE-PROP-008 -> RECA-PROP-008) so state mastery never mixes with
the national bank; sourceQuestionId keeps the handoff ID for traceability.
"""
import hashlib, json, pathlib, sys

FORMS_SHA256 = "7d01a6fd60afb0409a0efc41b6d66fd0a5fc181bfe87b12df6a044089447c218"
FIELDS = ["type", "state", "questionId", "category", "question", "optionA", "optionB",
          "optionC", "optionD", "correctAnswer", "correctIndex", "explanation"]
CATEGORIES = {"rePropertyCharacteristics", "reOwnershipTitle", "reValuation", "reContractsAgency",
              "rePractice", "reDisclosures", "reFinancing", "reMath"}
# Some draft groups used a shorthand that is not an app category.
CATEGORY_FIX = {"reContracts": "reContractsAgency"}
OUT = {"CA": "data/real-estate-ca-questions.json", "NJ": "data/real-estate-nj-questions.json"}
EXPECTED = {"CA": 150, "NJ": 110}

src = pathlib.Path(sys.argv[1]).read_bytes()
assert hashlib.sha256(src).hexdigest() == FORMS_SHA256, "forms file is not the reviewed handoff version"
root = pathlib.Path(__file__).resolve().parent.parent

for form in json.loads(src)["forms"]:
    code = form["jurisdiction"]
    prefix = f"RE{code}-"
    bank = []
    for item in sorted(form["items"], key=lambda x: x["position"]):
        q = item["effectiveQuestion"]
        assert item["jurisdiction"] == code
        out = {k: q[k] for k in FIELDS}
        out["category"] = CATEGORY_FIX.get(out["category"], out["category"])
        assert out["category"] in CATEGORIES, out
        assert "ABCD".index(out["correctAnswer"]) == out["correctIndex"], out["questionId"]
        assert q["questionId"].startswith("RE-")
        out["questionId"] = prefix + q["questionId"][3:]
        out["state"] = code
        out["sourceQuestionId"] = q["questionId"]
        bank.append(out)
    assert len(bank) == EXPECTED[code] == len({q["questionId"] for q in bank})
    (root / OUT[code]).write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    counts = {}
    for q in bank:
        counts[q["category"]] = counts.get(q["category"], 0) + 1
    print(code, len(bank), dict(sorted(counts.items())))
