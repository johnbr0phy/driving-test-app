#!/usr/bin/env python3
"""Build a v2 bank from per-domain source files.

Usage: python3 -I tools/build_v2_bank.py <exam>        (nclex, emt, secplus, aplus, aws, nclexpn, paramedic, ged)

Sources live in tools/<exam>/<domain>.json (plus an optional stimuli.json for
case studies). Each source item carries domain, test (1, 2 or 0 = drill only),
skill, difficulty, format and the format's own fields (see data/v2/SCHEMA.md);
items of one case study share a "stimulusId" and stay together in source order.
Ids are assigned here so every practice test interleaves its domains (the
session builder orders a test by id): <PREFIX>-T1-001.., -T2-001.., -D-001...
"""
import json, os, sys

PLANS = {
    "nclex": {"prefix": "NCLEX", "sections": {"nclex": ["nclexCare", "nclexSafety", "nclexHealth", "nclexPsych", "nclexComfort", "nclexPharm", "nclexRisk", "nclexPhys"]}},
    "emt": {"prefix": "EMT", "sections": {"emt": ["sceneSizeUp", "primaryAssessment", "secondaryAssessment", "treatmentTransport", "emsOperations"]}},
    "secplus": {"prefix": "SECPLUS", "sections": {"secplus": ["secConcepts", "secThreats", "secArchitecture", "secOperations", "secGovernance"]}},
    "aplus": {"prefix": "APLUS", "sections": {
        "core1": ["aplusMobile", "aplusNetworking", "aplusHardware", "aplusVirtCloud", "aplusHwTroubleshooting"],
        "core2": ["aplusOS", "aplusSecurity", "aplusSwTroubleshooting", "aplusOperational"]}},
    "aws": {"prefix": "AWS", "sections": {"aws": ["cloudConcepts", "securityCompliance", "technologyServices", "billingPricing"]}},
    "nclexpn": {"prefix": "NCLEXPN", "sections": {"nclexpn": ["pnCare", "pnSafety", "pnHealth", "pnPsych", "pnComfort", "pnPharm", "pnRisk", "pnPhys"]}},
    "paramedic": {"prefix": "PMD", "sections": {"paramedic": ["pmdAirway", "pmdCardio", "pmdTrauma", "pmdMedical", "pmdOps", "pmdJudgment"]}},
    "ged": {"prefix": "GED", "sections": {"rla": ["gedReading", "gedLanguage"], "math": ["gedQuant", "gedAlgebra"], "science": ["gedScience"], "social": ["gedSocial"]}},
}
SOURCE_ONLY = {"domain", "test", "skill", "difficulty", "format"}

def build(exam):
    plan = PLANS[exam]
    src = f"tools/{exam}"
    stim_path = os.path.join(src, "stimuli.json")
    stimuli = json.load(open(stim_path)) if os.path.exists(stim_path) else []
    domains = [d for ds in plan["sections"].values() for d in ds]
    section_of = {d: s for s, ds in plan["sections"].items() for d in ds}
    items = {d: json.load(open(os.path.join(src, f"{d}.json"))) for d in domains}
    out = []
    for test in (1, 2, 0):
        tag = {1: "T1", 2: "T2", 0: "D"}[test]
        n = 0
        for section, sec_domains in plan["sections"].items():
            # A case study is one block placed where its first item falls.
            blocks = []
            for di, d in enumerate(sec_domains):
                mine = [q for q in items[d] if q["test"] == test]
                singles = [q for q in mine if not q.get("stimulusId")]
                for i, q in enumerate(singles):
                    blocks.append(((i + 0.5) / len(singles), di, [q]))
            cases = {}
            for d in sec_domains:
                for q in items[d]:
                    if q["test"] == test and q.get("stimulusId"):
                        cases.setdefault(q["stimulusId"], []).append(q)
            for k, (sid, qs) in enumerate(sorted(cases.items())):
                qs.sort(key=lambda q: q.get("caseStep", 0))
                blocks.append(((k + 1) / (len(cases) + 1), -1, qs))
            blocks.sort(key=lambda b: (b[0], b[1]))
            for _, _, qs in blocks:
                for q in qs:
                    n += 1
                    item = {"id": f"{plan['prefix']}-{tag}-{n:03d}", "section": section, "test": test, "module": 1,
                            "domain": q["domain"], "difficulty": q["difficulty"], "format": q["format"]}
                    if q.get("skill"):
                        item["skill"] = q["skill"]
                    item.update({k: v for k, v in q.items() if k not in SOURCE_ONLY and k != "caseStep"})
                    out.append(item)
    dst = f"data/v2/{exam}/questions.json"
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    bank = {"stimuli": stimuli, "questions": out} if stimuli else out
    with open(dst, "w") as f:
        json.dump(bank, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{exam}: wrote {len(out)} questions, {len(stimuli)} stimuli -> {dst}")

if __name__ == "__main__":
    build(sys.argv[1])
