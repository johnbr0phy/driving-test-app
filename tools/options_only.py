#!/usr/bin/env python3
"""Options-only review: make a blind file for a reviewer, then score its answers.

    python3 -I tools/options_only.py make <bank.json> <outdir>
    python3 -I tools/options_only.py score <outdir>

`make` writes <outdir>/blind.json (items and options shuffled, anonymous ids, no stems,
no keys, no categories) for the reviewer, and <outdir>/private-key.json, which the
reviewer must never see. Keep the private key outside anything the reviewer is told to read.

The reviewer writes <outdir>/answers.json: {"X001": {"pick": "C", "why": "K"}, ...}
with why = K (picked because it recognises the true fact), S (surface or form cue: length,
tone, odd one out, most complete, safest, repeated wording) or G (guess).

`score` judges the bank by the rule in .claude/skills/exam-bank/SKILL.md (Nov 18 2026):
- A surface cue that finds the key is a writing fault. Every such item is listed and gets
  rewritten. The bank fails while S hits exceed 3% of items or, from 10 S picks up, 40% of them.
- Knowledge is not a fault. A capable reviewer who recognises the true fact scores high on
  good banks: live banks measured on Nov 18 2026 scored 64% (real estate) and 82% (food
  manager) with these files. The bank fails only above OVERALL_CEILING, which is a sign the
  wrong options are false on their face rather than a sign of good knowledge.
Read with the content-validity rule: an item that a reader with no subject knowledge can
answer from the stem's logic alone is a fault however it scores here.
"""
import collections
import json
import random
import sys

OVERALL_CEILING = 0.82   # highest live bank in the Nov 18 2026 calibration
S_HIT_SHARE = 0.03       # S hits as a share of all items
S_HIT_RATE = 0.40        # S hits as a share of S picks (chance is 0.25)


def load(path):
    data = json.load(open(path))
    return data if isinstance(data, list) else data["questions"]


def make(bank, out):
    import os
    os.makedirs(out, exist_ok=True)
    items = load(bank)
    rng = random.Random()  # fresh seed every run: the reviewer cannot rebuild the order
    rng.shuffle(items)
    blind, key = [], {}
    for n, q in enumerate(items, 1):
        opts = [q["option" + L] for L in "ABCD"]
        right = opts[q["correctIndex"]]
        rng.shuffle(opts)
        iid = f"X{n:03d}"
        blind.append({"id": iid, "options": dict(zip("ABCD", opts))})
        key[iid] = {"key": "ABCD"[opts.index(right)], "questionId": q["questionId"], "category": q["category"]}
    json.dump(blind, open(f"{out}/blind.json", "w"), ensure_ascii=False, indent=0)
    json.dump(key, open(f"{out}/private-key.json", "w"), ensure_ascii=False, indent=0)
    print(f"wrote {out}/blind.json ({len(blind)} items) and {out}/private-key.json")


def score(out):
    key = json.load(open(f"{out}/private-key.json"))
    ans = json.load(open(f"{out}/answers.json"))
    missing = [i for i in key if i not in ans]
    if missing:
        sys.exit(f"answers.json is missing {len(missing)} items, e.g. {missing[:5]}")
    n = len(key)
    hit = {i: ans[i]["pick"] == key[i]["key"] for i in key}
    why = collections.defaultdict(lambda: [0, 0])
    cat = collections.defaultdict(lambda: [0, 0])
    for i in key:
        w = ans[i].get("why", "G")
        why[w][0] += hit[i]; why[w][1] += 1
        cat[key[i]["category"]][0] += hit[i]; cat[key[i]["category"]][1] += 1
    overall = sum(hit.values()) / n
    s_hits = sorted(key[i]["questionId"] for i in key if hit[i] and ans[i].get("why") == "S")
    s_picks = why["S"][1]
    print(f"overall {sum(hit.values())}/{n} ({overall:.0%}), ceiling {OVERALL_CEILING:.0%}")
    for w in "KSG":
        h, t = why[w]
        print(f"  {w}: {h}/{t} right" + (f" ({h / t:.0%})" if t else ""))
    for c, (h, t) in sorted(cat.items()):
        print(f"  {c}: {h}/{t}")
    print(f"surface-cue hits ({len(s_hits)}), rewrite each:", ", ".join(s_hits) or "none")
    fails = []
    if overall > OVERALL_CEILING:
        fails.append("overall above the live-bank ceiling: wrong options are false on their face")
    if len(s_hits) > S_HIT_SHARE * n:
        fails.append(f"surface-cue hits {len(s_hits)} > {S_HIT_SHARE:.0%} of items")
    if s_picks >= 10 and len(s_hits) / s_picks > S_HIT_RATE:
        fails.append(f"surface-cue picks hit {len(s_hits)}/{s_picks}, above {S_HIT_RATE:.0%}")
    print("FAIL: " + "; ".join(fails) if fails else "PASS")
    return 1 if fails else 0


if __name__ == "__main__":
    if len(sys.argv) == 4 and sys.argv[1] == "make":
        make(sys.argv[2], sys.argv[3])
    elif len(sys.argv) == 3 and sys.argv[1] == "score":
        sys.exit(score(sys.argv[2]))
    else:
        sys.exit(__doc__)
