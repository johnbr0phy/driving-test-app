#!/usr/bin/env python3
"""Write the Times Tables source files (tools/timestables/<domain>.json).

Usage: python3 -I tools/timestables/generate.py && python3 -I tools/build_v2_bank.py timestables

Deterministic (fixed seed). Every answer is computed, never typed. Pools
follow the English national curriculum order: Year 2 learns the 2, 5 and 10
times tables, Year 3 the 3, 4 and 8, Year 4 everything to 12 x 12 for the
Multiplication Tables Check (25 questions on the 2 to 12 tables, 6 seconds
each, more of the 6, 7, 8, 9 and 12 tables, never a fact and its reverse in
one check). Tests are MTC-style plain facts; drill-only items add missing
numbers, counting on, swapping, dividing and word stories.
"""
import json, os, random

rng = random.Random(20261022)
OUT = os.path.dirname(os.path.abspath(__file__))
HARD = {6, 7, 8, 9, 12}
DOMAIN_OF = {2: "ttTwoFiveTen", 5: "ttTwoFiveTen", 10: "ttTwoFiveTen",
             3: "ttThreeFourEight", 4: "ttThreeFourEight", 8: "ttThreeFourEight",
             6: "ttSixSevenNine", 7: "ttSixSevenNine", 9: "ttSixSevenNine",
             11: "ttElevenTwelve", 12: "ttElevenTwelve"}
BASICS_OF = {2: "ttTwos", 5: "ttFives", 10: "ttTens", 3: "ttThrees", 4: "ttDoubleDouble", 8: "ttDoubleDouble",
             6: "ttSixes", 7: "ttSplitIt", 9: "ttNines", 11: "ttElevens", 12: "ttTwelves"}
items = {d: [] for d in ["ttTwoFiveTen", "ttThreeFourEight", "ttSixSevenNine", "ttElevenTwelve", "ttDivide", "ttStories"]}
stems = set()
check4_stems = set()


def count_list(t, m):
    return ", ".join(str(t * k) for k in range(1, m + 1))


def how(t, m):
    """One kid-sized sentence on how to get m lots of t, using that table's trick."""
    p = t * m
    if t == 2:
        return f"Double {m}: {m} + {m} = {p}."
    if t == 5:
        return f"Count in 5s {m} times: {count_list(5, m)}."
    if t == 10:
        return f"Multiply by 10 and the digits move one place to the left: {m} becomes {p}."
    if t == 3:
        return f"Double {m} is {2 * m}, then add one more {m}: {2 * m} + {m} = {p}."
    if t == 4:
        return f"Double, then double again: {m}, {2 * m}, {p}."
    if t == 8:
        return f"Double three times: {m}, {2 * m}, {4 * m}, {p}."
    if t == 6:
        return f"Do the 5s, then add one more {m}: {5 * m} + {m} = {p}."
    if t == 7:
        return f"Split 7 into 5 and 2: {5 * m} + {2 * m} = {p}."
    if t == 9:
        return f"10 lots take away 1 lot: {10 * m} − {m} = {p}."
    if t == 11:
        if m <= 9:
            return f"Up to 9 × 11, write the number twice: {m} and {m} make {p}."
        return f"10 lots and 1 more lot: {10 * m} + {m} = {p}."
    if t == 12:
        return f"10 lots and 2 lots: {10 * m} + {2 * m} = {p}."
    raise ValueError(t)


def diff(a, b, bump=0):
    return min(3, 1 + len([x for x in (a, b) if x in HARD]) + bump)


def add(domain, test, stem, explanation, difficulty, basics, skill, answer=None, options=None, correct=None):
    # Check 4 is held out of every drill, so it only has to be unique within
    # itself; every other stem is unique across the bank.
    seen = check4_stems if test == 4 else stems
    assert stem not in seen, stem
    seen.add(stem)
    q = {"domain": domain, "test": test, "skill": skill, "difficulty": difficulty}
    if options is None:
        q.update({"format": "numeric", "basics": basics, "stem": stem, "numeric": {"answers": [str(answer)], "tolerance": 0, "wholeNumber": True}})
    else:
        assert len(set(options)) == len(options), options
        q.update({"format": "single", "basics": basics, "stem": stem, "options": options, "correct": [correct]})
    q["explanation"] = explanation
    items[domain].append(q)


def fact(test, t, m, used, show=None):
    """A plain 'a × b = ?' item for m lots of t. Returns False if already used."""
    if frozenset((t, m)) in used:
        return False
    a, b = show or ((m, t) if rng.random() < 0.5 else (t, m))
    stem = f"{a} × {b} = ?"
    if stem in (check4_stems if test == 4 else stems):
        return False
    used.add(frozenset((t, m)))
    add(DOMAIN_OF[t], test, stem, f"{a} × {b} = {t * m}. {how(t, m)}", diff(t, m), BASICS_OF[t], f"{t} times table", answer=t * m)
    return True


def draw(test, plan, mults, used):
    """plan: list of tables, one per item. When a table has no unused fact
    left, another table of the same curriculum step stands in."""
    for t in plan:
        for tt in [t] + [x for x in DOMAIN_OF if DOMAIN_OF[x] == DOMAIN_OF[t] and x != t]:
            if any(fact(test, tt, m, used) for m in rng.sample(mults, len(mults))):
                break
        else:
            raise RuntimeError(f"ran out of facts for {t} in test {test}")


M = list(range(2, 13))
# Checks 3 and 4, the full Year 4 check: 2 to 12, weighted to 6, 7, 8, 9 and
# 12. Check 3 is drawn first (scarcest tables first) so it gets the pick of
# the facts; Check 4 is drawn last and shares no fact with Check 3, so it is
# new recall, not a repeat.
FULL = [2, 5, 10, 5] + [3, 4, 4, 8, 8, 8, 8] + [6, 6, 6, 7, 7, 7, 9, 9, 9] + [11, 12, 12, 12, 12]
SCARCE = [12, 11, 8, 9, 7, 6]
FULL_ORDER = sorted(FULL, key=lambda t: SCARCE.index(t) if t in SCARCE else len(SCARCE))
check3 = set()
draw(3, FULL_ORDER, M, check3)

# Drill-only items (test 0).
def count_on(t, start):
    seq = [t * k for k in range(start, start + 3)]
    nxt = t * (start + 3)
    add(DOMAIN_OF[t], 0, f"Count in {t}s. What comes next? {', '.join(map(str, seq))}, ?",
        f"Add {t} each time: {seq[-1]} + {t} = {nxt}.", 1 if t in (2, 5, 10, 3, 4) else 2, BASICS_OF[t], f"Counting in {t}s", answer=nxt)


def missing(t, m, left):
    p = t * m
    stem = f"□ × {t} = {p}. What number goes in the box?" if left else f"{t} × □ = {p}. What number goes in the box?"
    add(DOMAIN_OF[t], 0, stem, f"{m} × {t} = {p}, so {m} goes in the box. {how(t, m)}", diff(t, m, 1), BASICS_OF[t], f"{t} times table", answer=m)


def drill_fact(t, m):
    """A drill-only plain fact, in whichever order the checks have not used.
    If both orders are taken, the next multiplier up (wrapping) stands in."""
    for k in range(len(M)):
        mm = M[(M.index(m) + k) % len(M)]
        for show in [(mm, t), (t, mm)]:
            if fact(0, t, mm, set(), show):
                return
    raise RuntimeError((t, m))


def rotate(key, wrong, slot):
    opts = list(wrong)
    opts.insert(slot, key)
    return opts, slot


slot = iter([0, 1, 2, 3, 1, 2, 0, 3, 2, 0, 3, 1])

# 2, 5 and 10 (10 drill-only)
count_on(2, 5); count_on(5, 4); count_on(10, 6)
missing(2, 8, True); missing(5, 6, False); missing(10, 9, True)
for t, key, wrong, note in [(5, "35", ["32", "53", "38"], "35 ends in 5, and 7 × 5 = 35."),
                            (2, "16", ["15", "9", "21"], "16 is even, and 8 × 2 = 16.")]:
    s = next(slot)
    opts, c = rotate(key, wrong, s)
    add("ttTwoFiveTen", 0, f"Which number is in the {t} times table?", f"{note} {'5 times table answers end in 5 or 0.' if t == 5 else '2 times table answers are always even.'}",
        1, BASICS_OF[t], f"{t} times table", options=opts, correct=c)
drill_fact(10, 12); drill_fact(5, 11)

# 3, 4 and 8 (15)
count_on(3, 4); count_on(4, 3); count_on(8, 2)
missing(3, 7, True); missing(4, 9, False); missing(8, 6, True); missing(8, 4, False)
for a, b in [(3, 8), (4, 7), (8, 9)]:
    s = next(slot)
    wrong = [f"{b} + {a}", f"{a} × {a}", f"{b} × {b}"][:3]
    opts, c = rotate(f"{b} × {a}", wrong, s)
    add("ttThreeFourEight", 0, f"Which has the same answer as {a} × {b}?",
        f"Swap the numbers round and the answer stays the same: {a} × {b} = {b} × {a} = {a * b}.", 1, "ttSwapAround", "Swapping round", options=opts, correct=c)
for t, m in [(3, 9), (4, 6), (8, 7), (3, 12), (8, 11)]:
    drill_fact(t, m)

# 6, 7 and 9 (20)
count_on(6, 3); count_on(7, 2); count_on(9, 4)
missing(6, 8, True); missing(7, 6, False); missing(9, 7, True); missing(7, 9, True); missing(6, 12, False)
for t, m, wrong, why in [(7, 8, ["54", "48", "64"], "Split 7 into 5 and 2: 40 + 16 = 56."),
                         (9, 6, ["56", "45", "63"], "60 − 6 = 54. Check: 5 + 4 = 9.")]:
    s = next(slot)
    opts, c = rotate(str(t * m), wrong, s)
    add("ttSixSevenNine", 0, f"Which is the answer to {m} × {t}?", f"{m} × {t} = {t * m}. {why}", 3, BASICS_OF[t], f"{t} times table", options=opts, correct=c)
for t, m in [(6, 4), (6, 7), (6, 9), (7, 3), (7, 7), (7, 12), (9, 3), (9, 9), (9, 11), (6, 11)]:
    drill_fact(t, m)

# 11 and 12 (15)
count_on(11, 3); count_on(12, 2)
missing(11, 7, True); missing(12, 5, False); missing(12, 9, True); missing(11, 12, False)
# 12s are kept light here: Checks 3 and 4 need eight different 12s facts.
for t, m in [(11, 4), (11, 9), (11, 11), (11, 3), (11, 8), (12, 3), (12, 7), (11, 6), (11, 5)]:
    drill_fact(t, m)

# Dividing (20): 10 plain, 4 "how many", 2 fact families, 4 sharing.
for p, d in [(14, 2), (35, 5), (70, 10), (18, 3), (28, 4), (40, 8), (42, 6), (63, 7), (36, 9), (48, 12)]:
    q = p // d
    add("ttDivide", 0, f"{p} ÷ {d} = ?", f"{q} × {d} = {p}, so {p} ÷ {d} = {q}.", diff(q, d), "ttFactFamilies", "Dividing", answer=q)
for p, d in [(25, 5), (16, 4), (24, 8), (45, 9)]:
    q = p // d
    add("ttDivide", 0, f"How many {d}s make {p}?", f"{q} × {d} = {p}, so {q} lots of {d} make {p}.", diff(q, d), "ttFactFamilies", "Dividing", answer=q)
for a, b in [(6, 4), (7, 8)]:
    add("ttDivide", 0, f"{a} × {b} = {a * b}. So what is {a * b} ÷ {b}?", f"Same family: {a} × {b} = {a * b}, so {a * b} ÷ {b} = {a}.", diff(a, b), "ttFactFamilies", "Fact families", answer=a)
for p, d, thing, who, ask in [(15, 3, "grapes", "3 friends", "does each friend get"), (20, 5, "stickers", "5 children", "does each child get"),
                              (24, 4, "conkers", "4 pockets", "go in each pocket"), (30, 10, "pencils", "10 tables", "go on each table")]:
    q = p // d
    add("ttDivide", 0, f"Share {p} {thing} equally between {who}. How many {thing} {ask}?",
        f"{p} ÷ {d} = {q}, because {q} × {d} = {p}.", 1 if d in (5, 10) else 2, "ttSharing", "Sharing", answer=q)

# Times table stories (20): 14 times, 6 divide.
STORIES = [
    ("There are 4 cars in the car park. Each car has 4 wheels. How many wheels are there altogether?", 16, "'Each' means times: 4 × 4 = 16 wheels. Double 4 is 8, and double 8 is 16.", 1),
    ("Isla has 5 bags of marbles. Each bag holds 2 marbles. How many marbles does she have?", 10, "5 × 2 = 10 marbles. Count in 2s five times: 2, 4, 6, 8, 10.", 1),
    ("A pack of pencils costs 10p. How many pence do 6 packs cost?", 60, "6 × 10 = 60, so 60p. The 6 moves into the tens place.", 1),
    ("Sam puts 3 strawberries on each of 5 plates. How many strawberries is that?", 15, "5 × 3 = 15. Count in 3s five times: 3, 6, 9, 12, 15.", 1),
    ("A spider has 8 legs. How many legs do 3 spiders have?", 24, "3 lots of 8: double 8 is 16, then add one more 8: 16 + 8 = 24.", 2),
    ("There are 7 days in a week. How many days are in 2 weeks?", 14, "2 × 7 = 14. Double 7 is 14.", 1),
    ("Noah plants 4 rows of tulips with 5 tulips in every row. How many tulips does he plant?", 20, "'Every' means times: 4 × 5 = 20 tulips.", 1),
    ("A football team has 11 players. How many players are there in 2 teams?", 22, "2 × 11 = 22. Double 11 is 22.", 1),
    ("Eggs come in boxes of 6. How many eggs are in 4 boxes?", 24, "4 × 6 = 24. 4 × 3 = 12, and double 12 is 24.", 2),
    ("Priya reads 3 pages every night. How many pages does she read in 7 nights?", 21, "7 × 3 = 21. 5 × 3 = 15 and 2 × 3 = 6, so 15 + 6 = 21.", 2),
    ("A box holds 12 crayons. How many crayons are in 3 boxes?", 36, "3 × 12 = 36. 3 × 10 = 30 and 3 × 2 = 6, so 30 + 6 = 36.", 2),
    ("Oliver saves 5p every day for 9 days. How many pence does he save?", 45, "9 × 5 = 45, so 45p. 10 × 5 = 50, take away one 5.", 2),
    ("A ladybird has 6 legs. How many legs do 5 ladybirds have?", 30, "5 lots of 6 is the same as 6 lots of 5. Count in 5s six times: 5, 10, 15, 20, 25, 30.", 2),
    ("There are 9 benches. 4 children sit on each bench. How many children are there?", 36, "9 × 4 = 36. 10 × 4 = 40, take away one 4.", 3),
    ("Share 12 biscuits equally between 3 friends. How many biscuits does each friend get?", 4, "'Share equally' means divide: 12 ÷ 3 = 4, because 4 × 3 = 12.", 1),
    ("20 children get into teams of 5. How many teams are there?", 4, "How many 5s make 20? 4 × 5 = 20, so there are 4 teams.", 2),
    ("Amara has 16 stickers. She puts them into 2 equal piles. How many stickers are in each pile?", 8, "16 ÷ 2 = 8. Half of 16 is 8.", 1),
    ("30 sweets are shared equally into 10 party bags. How many sweets go in each bag?", 3, "30 ÷ 10 = 3, because 3 × 10 = 30.", 1),
    ("A car has 4 wheels. Jack counts 24 wheels. How many cars are there?", 6, "How many 4s make 24? 6 × 4 = 24, so there are 6 cars.", 3),
    ("Mum shares 18 grapes equally between 3 bowls. How many grapes go in each bowl?", 6, "18 ÷ 3 = 6, because 6 × 3 = 18.", 2),
]
for text, ans, why, d in STORIES:
    add("ttStories", 0, text, why, d, "ttStoryWords", "Word problems", answer=ans)

# Tests 1 and 2 last, so the hand-picked drill facts keep their order.
# Test 1, the Year 2 check: 2s, 5s and 10s only, from 1 lot to 12 lots as
# Year 2 counts them.
draw(1, [2] * 9 + [5] * 8 + [10] * 8, list(range(1, 13)), set())
# Test 2, Year 3: mostly 3s, 4s and 8s with some Year 2 revision.
draw(2, [2, 2, 5, 5, 5, 10, 10, 2] + [3] * 6 + [4] * 5 + [8] * 6, M, set())
# Check 4 last: no fact from Check 3.
draw(4, FULL_ORDER, M, set(check3))

counts = {}
for d, qs in items.items():
    with open(os.path.join(OUT, f"{d}.json"), "w") as f:
        json.dump(qs, f, indent=2, ensure_ascii=False)
        f.write("\n")
    for q in qs:
        counts[(d, q["test"])] = counts.get((d, q["test"]), 0) + 1
total = sum(counts.values())
print(f"{total} items")
for k in sorted(counts):
    print(k, counts[k])
