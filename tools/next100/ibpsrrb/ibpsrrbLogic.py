# Reasoning: inequalities and syllogisms. Every key is checked below by brute
# force: inequalities over small integer values, syllogisms over all Venn
# models of three sets.
from itertools import product
import re as _re

INEQ = "A statement is followed by two conclusions, I and II. Assume the statement is true and decide which conclusion(s) definitely follow.\n\n"
SYL = "Some statements are followed by two conclusions, I and II. Take the statements to be true even if they seem to differ from commonly known facts, and decide which conclusion(s) logically follow.\n\n"
OPS = {">": lambda a, b: a > b, "<": lambda a, b: a < b, "≥": lambda a, b: a >= b, "≤": lambda a, b: a <= b, "=": lambda a, b: a == b}


def _parse_chain(s):
    toks = s.split()
    return [(toks[i], toks[i + 1], toks[i + 2]) for i in range(0, len(toks) - 2, 2)]


def _ineq_key(statement, c1, c2):
    chain = _parse_chain(statement)
    names = sorted({t for a, _, b in chain for t in (a, b)})
    worlds = []
    for vals in product(range(5), repeat=len(names)):
        v = dict(zip(names, vals))
        if all(OPS[op](v[a], v[b]) for a, op, b in chain):
            worlds.append(v)
    def holds(c, v):
        a, op, b = c.split()
        return OPS[op](v[a], v[b])
    return _verdict([(holds(c1, w), holds(c2, w)) for w in worlds])


def _verdict(pairs):
    one = all(p[0] for p in pairs)
    two = all(p[1] for p in pairs)
    if one and two:
        return 4
    if one:
        return 0
    if two:
        return 1
    if all(p[0] or p[1] for p in pairs):
        return 2
    return 3


def _parse_cat(s):
    s = s.rstrip(".")
    for pat, kind in ((r"^All (\w+) are (\w+)$", "all"), (r"^No (\w+) is an? (\w+)$", "no"), (r"^No (\w+) are (\w+)$", "no"),
                      (r"^Some (\w+) are not (\w+)$", "somenot"), (r"^Some (\w+) are (\w+)$", "some")):
        m = _re.match(pat, s)
        if m:
            return kind, m.group(1).lower(), m.group(2).lower()
    raise ValueError(s)


def _stem(w):
    w = w.lower()
    if w.endswith("ies"):
        return w[:-3] + "y"
    if w.endswith(("oes", "xes", "shes", "ches")):
        return w[:-2]
    if w.endswith("s") and not w.endswith("ss"):
        return w[:-1]
    return w


def _syl_key(statements, c1, c2):
    parsed = [_parse_cat(s) for s in statements]
    pc = [_parse_cat(c) for c in (c1, c2)]
    terms = sorted({_stem(t) for _, a, b in parsed + pc for t in (a, b)})
    assert len(terms) == 3, terms
    regions = [r for r in product([0, 1], repeat=3) if any(r)]
    def test(kind, a, b, model):
        ia, ib = terms.index(_stem(a)), terms.index(_stem(b))
        ab = any(r[ia] and r[ib] for r in model)
        anotb = any(r[ia] and not r[ib] for r in model)
        return {"all": not anotb, "no": not ab, "some": ab, "somenot": anotb}[kind]
    pairs = []
    for mask in product([0, 1], repeat=len(regions)):
        model = [r for r, m in zip(regions, mask) if m]
        # every term is non-empty
        if not all(any(r[i] for r in model) for i in range(3)):
            continue
        if all(test(k, a, b, model) for k, a, b in parsed):
            pairs.append(tuple(test(k, a, b, model) for k, a, b in pc))
    return _verdict(pairs)


def ineq(t, d, statement, c1, c2, key, expl):
    assert _ineq_key(statement, c1, c2) == key, (statement, c1, c2, _ineq_key(statement, c1, c2))
    return L(t, d, "Inequality", INEQ + f"Statement: {statement}\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


def syl(t, d, statements, c1, c2, key, expl):
    assert _syl_key(statements, c1, c2) == key, (statements, c1, c2, _syl_key(statements, c1, c2))
    return L(t, d, "Syllogism", SYL + "Statements: " + " ".join(statements) + f"\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


ITEMS = [
    # ---------- Mock Test 1 ----------
    ineq(1, 1, "T ≥ U > V = W ≤ X", "T > W", "X ≥ V", 4,
         "I: T ≥ U > V = W gives T > W, true. II: X ≥ W = V gives X ≥ V, true. Both follow."),
    ineq(1, 2, "C ≤ D < E ≥ F > G", "C < E", "D > F", 0,
         "I: C ≤ D < E gives C < E, true. II: D < E and E ≥ F point in opposite directions, so D and F cannot be compared. Only I follows."),
    ineq(1, 2, "M > N ≥ O = P < Q", "M ≥ Q", "N ≥ P", 1,
         "I: M > ... = P < Q points in opposite directions, so M and Q cannot be compared. II: N ≥ O = P gives N ≥ P, true. Only II follows."),
    ineq(1, 2, "R ≥ S = T ≥ U < Y", "R > U", "R = U", 2,
         "R ≥ S = T ≥ U gives R ≥ U. Neither 'R > U' nor 'R = U' is certain alone, but one of them must be true. Either I or II follows."),
    ineq(1, 3, "G < H ≤ I = J > K", "G < K", "I < K", 3,
         "I: G < H ≤ I = J > K changes direction at J, so G and K cannot be compared. II: I = J > K gives I > K, so 'I < K' is false. Neither follows."),
    syl(1, 1, ["All farmers are voters.", "Some voters are traders."], "Some traders are voters.", "All farmers are traders.", 0,
        "'Some voters are traders' means the same as 'some traders are voters', so I follows. The traders among the voters need not include any farmer, so II does not follow. Only I follows."),
    syl(1, 2, ["Some ponds are wells.", "No well is a river."], "Some ponds are not rivers.", "No pond is a river.", 0,
        "The ponds that are wells cannot be rivers, so some ponds are not rivers (I). Other ponds may still be rivers, so II is not certain. Only I follows."),
    syl(1, 2, ["All tractors are engines.", "No engine is a cart."], "No tractor is a cart.", "No cart is a tractor.", 4,
        "Every tractor is an engine and no engine is a cart, so no tractor is a cart (I). A 'no' statement works both ways, so no cart is a tractor (II). Both follow."),

    # ---------- Mock Test 2 ----------
    ineq(2, 1, "B ≤ C = D < E ≥ F", "B < E", "D ≤ F", 0,
         "I: B ≤ C = D < E gives B < E, true. II: D < E and E ≥ F point in opposite directions, so D and F cannot be compared. Only I follows."),
    ineq(2, 2, "K > L ≥ M ≥ N = O", "K > O", "L ≥ O", 4,
         "I: K > L ≥ M ≥ N = O gives K > O, true. II: L ≥ M ≥ N = O gives L ≥ O, true. Both follow."),
    ineq(2, 2, "P < Q ≤ R > S = T", "Q > T", "R > T", 1,
         "I: Q ≤ R and R > S point in opposite directions, so Q and T cannot be compared. II: R > S = T gives R > T, true. Only II follows."),
    ineq(2, 2, "V ≥ W > X ≤ Y = Z", "W ≥ Z", "V > X", 1,
         "I: W > X and X ≤ Y point in opposite directions, so W and Z cannot be compared. II: V ≥ W > X gives V > X, true. Only II follows."),
    ineq(2, 3, "A = B ≥ C ≥ D > E", "C > A", "C = A", 3,
         "A = B ≥ C gives A ≥ C, so C can never be greater than A, and I is false. C may equal A or be less than it, so II is not certain either. Neither follows. (Had the conclusions been 'A > C' and 'A = C', the answer would be either-or.)"),
    syl(2, 1, ["All mangoes are fruits.", "All fruits are plants."], "All mangoes are plants.", "Some fruits are mangoes.", 4,
        "Every mango is a fruit and every fruit is a plant, so all mangoes are plants (I). Every mango is a fruit, so some fruits are mangoes (II). Both follow."),
    syl(2, 2, ["Some baskets are trays.", "Some trays are jars."], "Some baskets are jars.", "No basket is a jar.", 2,
        "Two 'some' statements give no definite link between baskets and jars. But the two conclusions cover every case: either some baskets are jars or none is. Either I or II follows."),
    syl(2, 2, ["No pen is a pencil.", "Some pencils are erasers."], "Some erasers are not pens.", "All erasers are pens.", 0,
        "The erasers that are pencils cannot be pens, so some erasers are not pens (I). That rules out 'all erasers are pens' (II). Only I follows."),

    # ---------- Drill only ----------
    ineq(0, 1, "H ≥ I > J ≤ K < L", "H > J", "L > J", 4,
         "I: H ≥ I > J gives H > J, true. II: L > K ≥ J gives L > J, true. Both follow."),
    ineq(0, 2, "Q = R < S ≤ T > U", "S > U", "R < T", 1,
         "I: S ≤ T and T > U point in opposite directions, so S and U cannot be compared. II: R < S ≤ T gives R < T, true. Only II follows."),
    ineq(0, 3, "D ≤ E ≤ F = G ≤ H", "D < H", "D = H", 2,
         "D ≤ E ≤ F = G ≤ H gives D ≤ H. Neither 'D < H' nor 'D = H' is certain alone, but one must be true. Either I or II follows."),
    syl(0, 1, ["No cow is a goat.", "All goats are animals."], "Some animals are not cows.", "No animal is a cow.", 0,
        "The animals that are goats cannot be cows, so some animals are not cows (I). Other animals may be cows, so II is not certain. Only I follows."),
    syl(0, 2, ["All seeds are grains.", "Some grains are pulses."], "Some seeds are pulses.", "All pulses are grains.", 3,
        "The pulses among the grains need not include any seed, so I is not certain. Only some grains are said to be pulses, so 'all pulses are grains' is not certain either. Neither follows."),
    syl(0, 3, ["Some bags are boxes.", "All boxes are cartons."], "Some cartons are bags.", "Some bags are not cartons.", 0,
        "The bags that are boxes are also cartons, so some cartons are bags (I). Whether any bag lies outside the cartons is not settled, so II is only a possibility. Only I follows."),
]
