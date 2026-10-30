"""Verbal reasoning: letters, codes and numbers. Every key is computed here and asserted."""
from common import A, pos, shift, item, rotate

D = "elevenplusVrCodes"
ITEMS = []
_k = [0]


def add(test, skill, diff, stem, options, key, expl, **extra):
    opts, idx = rotate(options, key, _k[0])
    _k[0] += 3
    ITEMS.append(item(D, test, skill, diff, stem, opts, idx, expl, **extra))


def name_steps(steps):
    if len(set(steps)) == 1:
        s = steps[0]
        return f"{'forward' if s > 0 else 'back'} {abs(s)} each time"
    return "moving " + ", then ".join(f"{'+' if s > 0 else '-'}{abs(s)}" for s in steps)


# ---------- letter series ----------
def series(test, diff, spec, missing):
    terms = []
    lets = []
    for start, step in spec:
        steps = step if isinstance(step, list) else [step] * 4
        seq = [start]
        for s in steps:
            seq.append(shift(seq[-1], s))
        lets.append((seq, steps))
    terms = ["".join(l[0][i] for l in lets) for i in range(5)]
    key = terms[missing]
    shown = [t if i != missing else "?" for i, t in enumerate(terms)]
    cands = []
    for j in range(len(spec)):
        for d in (1, -1, 2):
            t = list(key)
            try:
                t[j] = shift(t[j], d)
            except AssertionError:
                continue
            cands.append("".join(t))
    cands.append(key[::-1])
    distract = []
    for c in cands:
        if c != key and c not in distract and c not in terms:
            distract.append(c)
    opts = [key] + distract[:4]
    parts = []
    for n, (seq, steps) in enumerate(lets):
        which = ["first", "second", "third"][n]
        parts.append(f"The {which} letters go {', '.join(seq)} ({name_steps(steps)})")
    expl = ". ".join(parts) + f". So the missing pair is {key}."
    add(test, "Letter series", diff, f"Find the letters that complete the series.\n\n**{', '.join(shown)}**", opts, key, expl,
        basics="elevenplusAlphabetSteps")


series(1, 1, [("B", 2), ("Y", -1)], 4)
series(1, 2, [("C", 3), ("D", 1)], 2)
series(1, 3, [("A", [1, 2, 3, 4]), ("M", 2)], 4)
series(2, 1, [("D", 2), ("K", 1)], 4)
series(2, 2, [("Q", -2), ("B", 3)], 1)
series(2, 3, [("C", [1, 2, 3, 4]), ("W", [-1, -2, -3, -4])], 4)
series(0, 2, [("H", 3), ("S", -2)], 3)


# ---------- letter analogies ----------
def analogy(test, diff, p1, p2, p3):
    sh = [pos(b) - pos(a) for a, b in zip(p1, p2)]
    key = "".join(shift(c, s) for c, s in zip(p3, sh))
    cands = []
    for j in range(2):
        for d in (1, -1, 2, -2):
            t = list(key)
            try:
                t[j] = shift(t[j], d)
            except AssertionError:
                continue
            cands.append("".join(t))
    cands.insert(1, key[::-1])
    distract = []
    for c in cands:
        if c != key and c not in distract:
            distract.append(c)
    opts = [key] + distract[:4]
    def mv(s):
        return f"{'forward' if s > 0 else 'back'} {abs(s)}"
    expl = (f"From {p1} to {p2}, {p1[0]} moves {mv(sh[0])} to {p2[0]} and {p1[1]} moves {mv(sh[1])} to {p2[1]}. "
            f"Do the same to {p3}: {p3[0]} to {key[0]} and {p3[1]} to {key[1]}, giving {key}.")
    add(test, "Letter analogies", diff, f"Find the pair that completes the sentence in the same way.\n\n**{p1}** is to **{p2}** as **{p3}** is to **?**",
        opts, key, expl, basics="elevenplusAlphabetSteps")


analogy(1, 1, "BD", "CF", "MP")
analogy(1, 2, "GT", "EV", "LK")
analogy(2, 2, "AZ", "BY", "HS")
analogy(2, 1, "PR", "SU", "DF")
analogy(0, 2, "KM", "JO", "TV")


# ---------- letter codes ----------
def enc(word, n):
    return "".join(shift(c, n) for c in word)


def mirror(word):
    return "".join(A[26 - pos(c)] for c in word)


def code_encode(test, diff, given, n, ask):
    gcode = enc(given, n)
    key = enc(ask, n)
    wrong = [enc(ask, -n), enc(ask, n + 1 if n > 0 else n - 1), key[:-1] + shift(key[-1], 1 if key[-1] != "Z" else -1),
             shift(key[0], 1 if key[0] != "Z" else -1) + key[1:]]
    opts = [key] + [w for w in dict.fromkeys(wrong) if w != key][:4]
    d = f"{'forward' if n > 0 else 'back'} {abs(n)}"
    expl = (f"Each letter of {given} moves {d} in the alphabet to make {gcode} ({given[0]} to {gcode[0]}, {given[1]} to {gcode[1]}). "
            f"Moving each letter of {ask} {d} gives {key}.")
    add(test, "Letter codes", diff, f"If the code for **{given}** is **{gcode}**, what is the code for **{ask}**?", opts, key, expl,
        basics="elevenplusLetterCodes")


def code_decode(test, diff, given, n, ask_word, distract):
    gcode = enc(given, n)
    acode = enc(ask_word, n)
    opts = [ask_word] + distract
    d = f"{'forward' if n > 0 else 'back'} {abs(n)}"
    back = f"{'back' if n > 0 else 'forward'} {abs(n)}"
    expl = (f"{given} becomes {gcode} by moving each letter {d}. To decode, move each letter of {acode} {back}: "
            f"{', '.join(acode)} become {', '.join(ask_word)}, which spells {ask_word}.")
    add(test, "Letter codes", diff, f"If **{given}** is written in code as **{gcode}**, what does **{acode}** mean?", opts, ask_word, expl,
        basics="elevenplusLetterCodes")


def code_mirror(test, diff, given, ask):
    gcode, key = mirror(given), mirror(ask)
    wrong = [enc(ask, 1), key[::-1], key[:-1] + shift(key[-1], -1), mirror(ask[::-1])]
    opts = [key] + [w for w in dict.fromkeys(wrong) if w != key][:4]
    expl = (f"Each letter is swapped for its mirror in the alphabet: A and Z, B and Y, C and X, and so on (the two positions add to 27). "
            f"{given} becomes {gcode}, so {ask} becomes {key}.")
    add(test, "Letter codes", diff, f"In a code, **{given}** is written as **{gcode}**. What is **{ask}** in the same code?", opts, key, expl,
        basics="elevenplusLetterCodes")


code_encode(1, 1, "CAKE", 1, "MILK")
code_encode(1, 2, "FROG", -2, "SHIP")
code_decode(1, 2, "MAP", 1, "COW", ["BOX", "DOG", "CUP", "COT"])
code_encode(2, 1, "LAMP", 2, "DESK")
code_decode(2, 2, "BED", 3, "DOG", ["DIG", "FOG", "COT", "BOG"])
code_mirror(2, 3, "GOAL", "FISH")
code_encode(0, 1, "PLAN", 1, "BIRD")


# ---------- word and number codes ----------
def wcode(word, m):
    return " ".join(str(m[c]) for c in word)


def num_encode(test, diff, m, givens, ask, distract=None):
    key = wcode(ask, m)
    if distract is None:
        rev = wcode(ask[::-1], m)
        d1 = wcode(ask[1:] + ask[0], m)
        d2 = " ".join(key.split()[:2][::-1] + key.split()[2:])
        d3 = " ".join(key.split()[:-2] + key.split()[-2:][::-1])
        distract = [x for x in dict.fromkeys([rev, d1, d2, d3]) if x != key]
    gtxt = " and ".join(f"**{g}** is written as **{wcode(g, m)}**" for g in givens)
    expl = ("Match each letter to its number: " + ", ".join(f"{c} = {m[c]}" for c in dict.fromkeys(ask)) +
            f". So {ask} is {key}.")
    add(test, "Word and number codes", diff, f"If {gtxt}, what is the code for **{ask}**?", [key] + distract[:4], key, expl,
        basics="elevenplusLetterCodes")


def num_decode(test, diff, m, givens, code_word, distract):
    gtxt = " and ".join(f"**{g}** is written as **{wcode(g, m)}**" for g in givens)
    c = wcode(code_word, m)
    inv = {v: k for k, v in m.items()}
    for w in distract:
        assert not all(ch in m for ch in w) or wcode(w, m) != c, w
    expl = "Turn each number back into its letter: " + ", ".join(f"{n} = {inv[int(n)]}" for n in c.split()) + f". The word is {code_word}."
    add(test, "Word and number codes", diff, f"If {gtxt}, which word is written as **{c}**?", [code_word] + distract, code_word, expl,
        basics="elevenplusLetterCodes")


m1 = {"C": 2, "A": 4, "R": 7, "T": 1, "M": 5}
num_encode(1, 1, m1, ["CART", "TRAM"], "MART")
m2 = {"S": 6, "T": 3, "O": 8, "P": 2}
num_decode(1, 2, m2, ["STOP"], "TOPS", ["SPOT", "POTS", "POST", "OPTS"])
m3 = {"L": 4, "I": 7, "N": 1, "E": 3, "S": 9}
num_encode(1, 2, m3, ["LINES"], "LENS")
m4 = {"B": 5, "O": 2, "A": 8, "T": 6, "S": 3}
num_encode(2, 1, m4, ["BOATS"], "STAB")
m5 = {"M": 4, "E": 7, "A": 2, "T": 9}
num_decode(2, 2, m5, ["MEAT", "TEAM"], "ATE", ["TEA", "EAT", "MAT", "MET"])
m6 = {"S": 6, "N": 1, "O": 4, "W": 8}
num_decode(2, 3, m6, ["SNOW", "WON"], "NOW", ["OWN", "SOW", "TOWN", "SON"])
m7 = {"P": 3, "L": 6, "A": 9, "N": 2, "E": 5}
num_encode(0, 1, m7, ["PLANE"], "PANEL")


# ---------- number series ----------
def nseries(test, diff, seq, nxt, rule, distract):
    assert nxt not in distract and len(distract) == 4
    shown = ", ".join(str(x) for x in seq) + ", ?"
    add(test, "Number series", diff, f"Find the number that comes next in the series.\n\n**{shown}**", [str(nxt)] + [str(d) for d in distract],
        str(nxt), rule, basics="elevenplusNumberSeries")


def chk(seq, f):
    for i in range(1, len(seq)):
        assert f(seq, i - 1) == seq[i], seq
    return f(seq, len(seq) - 1)


s = [4, 9, 14, 19]; n = chk(s, lambda q, i: q[i] + 5)
nseries(1, 1, s, n, "The numbers go up by 5 each time: 19 + 5 = 24.", [23, 25, 29, 21])
s = [2, 5, 4, 7, 6]; n = chk(s, lambda q, i: q[i] + (3 if i % 2 == 0 else -1))
nseries(1, 2, s, n, "The steps go up 3, down 1, up 3, down 1. The next step is up 3: 6 + 3 = 9.", [5, 8, 10, 7])
s = [1, 2, 4, 7, 11]; n = chk(s, lambda q, i: q[i] + i + 1)
nseries(1, 3, s, n, "The gap grows by 1 each time: +1, +2, +3, +4, so the next gap is +5. 11 + 5 = 16.", [15, 14, 17, 22])
s = [81, 72, 63, 54]; n = chk(s, lambda q, i: q[i] - 9)
nseries(2, 1, s, n, "The numbers go down by 9 each time: 54 - 9 = 45.", [46, 44, 36, 48])
s = [1, 4, 9, 16]; n = chk(s, lambda q, i: (i + 2) ** 2)
nseries(2, 2, s, n, "These are the square numbers: 1 × 1, 2 × 2, 3 × 3, 4 × 4. Next is 5 × 5 = 25. (The gaps +3, +5, +7 lead to +9 as well.)", [20, 23, 24, 32])
s = [2, 20, 4, 18, 6, 16]; n = chk(s, lambda q, i: 20 if i == 0 else q[i - 1] + (2 if (i + 1) % 2 == 0 else -2))
nseries(2, 3, s, n, "Two series take turns. One goes 2, 4, 6 (up 2) and the other goes 20, 18, 16 (down 2). The next number belongs to the first series: 6 + 2 = 8.", [14, 10, 12, 4])
s = [3, 6, 12, 24]; n = chk(s, lambda q, i: q[i] * 2)
nseries(0, 1, s, n, "Each number is double the one before: 24 × 2 = 48.", [36, 30, 42, 46])


# ---------- letter sums ----------
def lsum(test, diff, vals, expr_txt, f):
    v = dict(zip("ABCDE", vals))
    r = f(v)
    inv = {x: k for k, x in v.items()}
    assert r in inv, (expr_txt, r)
    key = inv[r]
    stem = (f"If **{', '.join(f'{k} = {x}' for k, x in v.items())}**, what is the answer to this sum, written as a letter?\n\n"
            f"**{expr_txt} = ?**")
    worked = expr_txt
    for k, x in v.items():
        worked = worked.replace(k, str(x))
    expl = f"Swap each letter for its number: {worked} = {r}. The letter worth {r} is {key}."
    ITEMS.append(item(D, test, "Letter sums", diff, stem, list("ABCDE"), "ABCDE".index(key), expl, lockedOrder=True,
                      basics="elevenplusLetterSums"))


lsum(1, 1, [2, 3, 5, 6, 10], "A × B", lambda v: v["A"] * v["B"])
lsum(1, 2, [4, 6, 8, 12, 24], "C × B ÷ A", lambda v: v["C"] * v["B"] // v["A"])
lsum(2, 1, [3, 5, 8, 15, 24], "A × B", lambda v: v["A"] * v["B"])
lsum(2, 2, [2, 4, 7, 10, 14], "(D + B) ÷ A", lambda v: (v["D"] + v["B"]) // v["A"])
lsum(0, 2, [5, 6, 11, 30, 36], "A × B + B", lambda v: v["A"] * v["B"] + v["B"])


# ---------- related numbers ----------
def related(test, diff, groups, f, rule, distract):
    for a, mid, b in groups[:2]:
        assert f(a, b) == mid
    a, _, b = groups[2]
    key = f(a, b)
    assert key not in distract
    g = "   ".join(f"({x} [{m}] {y})" for x, m, y in groups[:2]) + f"   ({a} [?] {b})"
    add(test, "Related numbers", diff,
        f"The number in brackets is made from the two outside numbers in the same way in each group. Find the missing number.\n\n**{g}**",
        [str(key)] + [str(d) for d in distract], str(key), rule)


related(1, 1, [(4, 20, 5), (3, 18, 6), (7, 0, 3)], lambda a, b: a * b, "In each group the outside numbers are multiplied: 4 × 5 = 20, 3 × 6 = 18. So 7 × 3 = 21.", [10, 4, 24, 18])
related(1, 2, [(2, 10, 3), (4, 14, 3), (5, 0, 6)], lambda a, b: 2 * (a + b), "Add the outside numbers and double: (2 + 3) × 2 = 10, (4 + 3) × 2 = 14. So (5 + 6) × 2 = 22.", [11, 30, 21, 20])
related(2, 1, [(24, 6, 4), (35, 5, 7), (54, 0, 9)], lambda a, b: a // b, "The first number is divided by the second: 24 ÷ 4 = 6, 35 ÷ 7 = 5. So 54 ÷ 9 = 6.", [45, 7, 63, 5])
related(2, 3, [(3, 13, 4), (5, 11, 2), (6, 0, 4)], lambda a, b: a * b + 1, "Multiply the outside numbers and add 1: 3 × 4 + 1 = 13, 5 × 2 + 1 = 11. So 6 × 4 + 1 = 25.", [24, 11, 10, 26])
related(0, 3, [(8, 3, 2), (11, 4, 3), (17, 0, 5)], lambda a, b: (a - b) // 2, "Take the second number from the first, then halve: (8 - 2) ÷ 2 = 3, (11 - 3) ÷ 2 = 4. So (17 - 5) ÷ 2 = 6.", [12, 22, 7, 4])


# ---------- logic ----------
add(1, "Logic", 1,
    "Amir is taller than Ben. Chloe is shorter than Ben. Dev is taller than Amir.\n\nWho is the shortest?",
    ["Chloe", "Ben", "Amir", "Dev"], "Chloe",
    "Put them in order from tallest: Dev, Amir, Ben, Chloe. Chloe is shorter than Ben, and Ben is shorter than both Amir and Dev.")
add(1, "Logic", 3,
    "Ella, Finn, Gus and Hana each walk the dog on one day, Monday to Thursday, all on different days. Hana walks on Monday. Gus walks the day after Hana. Finn walks the day after Ella.\n\nOn which day does Finn walk?",
    ["Thursday", "Tuesday", "Wednesday", "Monday"], "Thursday",
    "Hana is Monday, so Gus is Tuesday. Wednesday and Thursday are left, and Finn must come the day after Ella: Ella Wednesday, Finn Thursday.")
add(2, "Logic", 2,
    "If the day after tomorrow is Saturday, what day was yesterday?",
    ["Wednesday", "Thursday", "Friday", "Tuesday"], "Wednesday",
    "The day after tomorrow is Saturday, so tomorrow is Friday and today is Thursday. Yesterday was Wednesday.")
add(2, "Logic", 2,
    "Every member of the chess club is in Year 6. Some Year 6 pupils play football. Lily is in the chess club.\n\nWhich of these must be true?",
    ["Lily is in Year 6.", "Lily plays football.", "Every Year 6 pupil is in the chess club.", "Some chess club members play football."],
    "Lily is in Year 6.",
    "Lily is in the chess club and every member is in Year 6, so she must be in Year 6. Nothing says whether any chess player, Lily included, plays football.")
add(0, "Logic", 2,
    "Jo has more marbles than Kit but fewer than Lee. Mo has more marbles than Lee.\n\nWho has the second most marbles?",
    ["Lee", "Jo", "Mo", "Kit"], "Lee",
    "From most to fewest: Mo, Lee, Jo, Kit. Mo beats Lee, and Lee beats Jo, who beats Kit.")
