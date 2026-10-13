#!/usr/bin/env python3
"""One-off: split a v1 bank (data/<file>-questions.json) into v2 source files
tools/<exam>/<domain>.json, tagging test 1, test 2 and drill-only items by the
per-test blueprint below. Run once per exam, then edit the sources and build
with tools/build_v2_bank.py.

Usage: python3 -I tools/v1_to_v2_sources.py <exam>
"""
import json, os, re, sys

# Prices are written \\$ so RichText never reads them as math delimiters.
esc = lambda t: re.sub(r"(?<!\\)\$", r"\\$", t)  # these banks have no math

PLANS = {
    # exam: (v1 file, {domain: [test 1 count, test 2 count]})
    "emt": ("emt", {"sceneSizeUp": [13, 13], "primaryAssessment": [28, 28], "secondaryAssessment": [6, 6], "treatmentTransport": [15, 15], "emsOperations": [8, 8]}),
    "secplus": ("comptia-secplus", {"secConcepts": [11, 11], "secThreats": [20, 20], "secArchitecture": [16, 16], "secOperations": [25, 25], "secGovernance": [18, 18]}),
    "aplus": ("comptia-aplus", {"aplusMobile": [12], "aplusNetworking": [21], "aplusHardware": [22], "aplusVirtCloud": [10], "aplusHwTroubleshooting": [25],
                                 "aplusOS": [25], "aplusSecurity": [25], "aplusSwTroubleshooting": [21], "aplusOperational": [19]}),
    "aws": ("aws-ccp", {"cloudConcepts": [16, 16], "securityCompliance": [19, 19], "technologyServices": [22, 22], "billingPricing": [8, 8]}),
}

exam = sys.argv[1]
v1_file, plan = PLANS[exam]
bank = json.load(open(f"data/{v1_file}-questions.json"))
os.makedirs(f"tools/{exam}", exist_ok=True)
for domain, counts in plan.items():
    pool = sorted((q for q in bank if q["category"] == domain), key=lambda q: q["questionId"])
    assert sum(counts) <= len(pool), (domain, counts, len(pool))
    tests = [t for t, n in enumerate(counts, 1) for _ in range(n)] + [0] * (len(pool) - sum(counts))
    out = [{
        "domain": domain, "test": t, "skill": q.get("skill") or "", "difficulty": 2, "format": "single",
        "stem": esc(q["question"].strip()),
        "options": [esc(q[k]) for k in ("optionA", "optionB", "optionC", "optionD")],
        "correct": [q["correctIndex"]],
        "explanation": esc(q["explanation"]),
    } for q, t in zip(pool, tests)]
    json.dump(out, open(f"tools/{exam}/{domain}.json", "w"), indent=2, ensure_ascii=False)
    print(exam, domain, len(out), "t1/t2/d =", tests.count(1), tests.count(2), tests.count(0))
