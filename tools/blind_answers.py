#!/usr/bin/env python3
"""Truly blind answering: a reviewer answers full questions without the key.

    python3 -I tools/blind_answers.py make <bank.json> <outdir>
    python3 -I tools/blind_answers.py score <outdir>

`make` writes <outdir>/rev/questions.json (stems and options, options reshuffled,
anonymous ids, no keys, no explanations, no categories) and <outdir>/private-key.json.
Give the reviewer only the rev/ folder: told to read the bank itself, a reviewer
sees the key on the same line as the options, and "I answered before looking"
cannot be checked (in Nov 2026 every such review reported 200 of 200).

The reviewer writes <outdir>/rev/answers.json:
    {"Q001": {"pick": "B", "conf": "high|med|low", "note": "why, if the item looks flawed"}}

`score` prints the agreement and every disagreement with the full item, the key and
the reviewer's note. Each disagreement is settled against the exam's sources.md:
fix the item or keep it, and record which.
"""
import json
import os
import random
import sys


def load(path):
    d = json.load(open(path))
    return d if isinstance(d, list) else d["questions"]


def make(bank, out):
    qs = load(bank)
    rng = random.Random(7)
    items, key = [], {}
    for i, q in enumerate(qs):
        opts = [q["option" + k] for k in "ABCD"]
        right = opts["ABCD".index(q["correctAnswer"])]
        rng.shuffle(opts)
        bid = f"Q{i + 1:03d}"
        items.append({"id": bid, "question": q["question"], "options": dict(zip("ABCD", opts))})
        key[bid] = {"qid": q["questionId"], "key": "ABCD"[opts.index(right)]}
    os.makedirs(os.path.join(out, "rev"), exist_ok=True)
    json.dump(items, open(os.path.join(out, "rev", "questions.json"), "w"), indent=0)
    json.dump(key, open(os.path.join(out, "private-key.json"), "w"))
    print(f"wrote {out}/rev/questions.json ({len(items)} items) and {out}/private-key.json")


def score(out):
    key = json.load(open(os.path.join(out, "private-key.json")))
    ans = json.load(open(os.path.join(out, "rev", "answers.json")))
    qs = {x["id"]: x for x in json.load(open(os.path.join(out, "rev", "questions.json")))}
    missing = [i for i in key if i not in ans]
    wrong = [i for i in key if i in ans and ans[i].get("pick") != key[i]["key"]]
    print(f"agreement {len(key) - len(wrong) - len(missing)}/{len(key)}, missing {len(missing)}, "
          f"confident disagreements {sum(ans[i].get('conf') == 'high' for i in wrong)}")
    for i in wrong:
        x = qs[i]
        print(f"\n{key[i]['qid']} [{ans[i].get('conf', '?')}] {x['question']}")
        for L in "ABCD":
            mark = "*" if L == key[i]["key"] else ("<" if L == ans[i].get("pick") else " ")
            print(f"  {L}{mark} {x['options'][L]}")
        if ans[i].get("note"):
            print(f"  note: {ans[i]['note']}")
    flagged = [i for i in key if i in ans and ans[i].get("note") and i not in wrong]
    if flagged:
        print(f"\nnotes on items answered as keyed: {', '.join(key[i]['qid'] for i in flagged)}")
    return 0


if __name__ == "__main__":
    if len(sys.argv) == 4 and sys.argv[1] == "make":
        make(sys.argv[2], sys.argv[3])
    elif len(sys.argv) == 3 and sys.argv[1] == "score":
        sys.exit(score(sys.argv[2]))
    else:
        print(__doc__)
        sys.exit(2)
