"""Flag ausecurity items whose stem or key+stem closely match another security-family bank.
Usage: python3 -I tools/next100/ausecurity/simcheck.py"""
import json, os, re, difflib
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
MINE = "data/au-security-licence-questions.json"
OTHERS = ["alberta-security", "bc-security-worker", "ie-psa-security", "malta-private-guard", "nz-security",
          "ontario-security-guard", "psira-security", "security-guard", "sia-door-supervisor", "sira-security",
          "au-rsa", "au-first-aid", "gr-security"]
W = lambda s: set(re.findall(r"[a-z0-9]+", s.lower())) - {"the", "a", "an", "of", "to", "is", "in", "and", "or", "what", "which", "you", "your", "should", "for", "on", "at", "it", "be", "with", "by"}
def load(n):
    p = os.path.join(ROOT, "data", n + "-questions.json")
    return json.load(open(p)) if os.path.exists(p) else []
mine = json.load(open(os.path.join(ROOT, MINE)))
flags = 0
for o in OTHERS:
    for b in load(o):
        bk = [b["optionA"], b["optionB"], b["optionC"], b["optionD"]][b["correctIndex"]]
        for a in mine:
            ak = [a["optionA"], a["optionB"], a["optionC"], a["optionD"]][a["correctIndex"]]
            r = difflib.SequenceMatcher(None, a["question"].lower(), b["question"].lower()).ratio()
            wa, wb = W(a["question"] + " " + ak), W(b["question"] + " " + bk)
            j = len(wa & wb) / max(1, len(wa | wb))
            if r > 0.7 or j > 0.5:
                flags += 1
                print(f"{a['questionId']} ~ {o}:{b['questionId']} stem {r:.2f} words {j:.2f}\n   {a['question']} [{ak}]\n   {b['question']} [{bk}]")
print("flags", flags)
