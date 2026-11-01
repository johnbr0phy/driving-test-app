#!/usr/bin/env python3
"""Build the JAMB UTME Mathematics v2 bank from Python-data sources.

Usage: python3 -I tools/next100/jambmath/build.py

Sources, one file per drill domain (JAMB UTME Mathematics syllabus sections):
  number.py, algebra.py, seqmat.py, geometry.py, coordtrig.py, calculus.py,
  statistics.py, probability.py
Each file has ITEMS, a list of
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation,
    chk=..., locked=False, key=0)
test is 1 or 2 (a practice-test item) or 0 (drill only). The key is written
FIRST. The build shuffles the options with a seed from the stem, except:
  - options that are all numbers (a plain number, a number with a unit or
    a naira sign, or a single KaTeX expression such as $\\frac{3}{4}$,
    $2\\sqrt{3}$ or $x = -1$) are sorted ascending and locked;
  - locked=True keeps the authored order, with key= the index of the key.

Checking (every item must carry chk, the computed answer):
  - a number: the key's value must equal it and no distractor may;
  - a function of x: the key, read as a function, must match it at several
    points and no distractor may;
  - a string: the key text must equal it exactly (sources build the string
    from the computation, e.g. a base conversion or a set listing);
  - CONCEPT: a non-computational item (a definition or a property); the
    build counts them and they must stay few.
The helpers available to sources (Fraction, comb, perm, tobase, frombase,
mean, median, pvar, det2, det3, D, I, L ...) are listed in ENV below.

Ids: JAMBMATH-T<n>-NNN (syllabus order) and JAMBMATH-D-NNN (drill only).
"""
import hashlib, json, math, os, random, re, statistics
from collections import Counter
from fractions import Fraction
from itertools import permutations, combinations, product

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "JAMBMATH"
EXAM = "jambmath"
SECTION = "math"
# (source file, domain, per test, drill-only count)
DOMAINS = [("number", "jambmathNumber", 6, 15), ("algebra", "jambmathAlgebra", 5, 15),
           ("seqmat", "jambmathSequences", 5, 15), ("geometry", "jambmathGeometry", 6, 15),
           ("coordtrig", "jambmathCoordTrig", 5, 15), ("calculus", "jambmathCalculus", 4, 15),
           ("statistics", "jambmathStatistics", 5, 15), ("probability", "jambmathProbability", 4, 15)]
CONCEPT = "__concept__"
SALT = os.environ.get("SALT", "#0")


def Q(test, d, skill, stem, opts, expl, chk=None, locked=False, key=0):
    assert len(opts) == 4, stem
    assert test in (0, 1, 2) and d in (1, 2, 3), stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts),
            "explanation": expl, "chk": chk, "locked": locked, "key": key}


# ---------- helpers for sources ----------
def tobase(n, b):
    digits = ""
    while n:
        digits = "0123456789"[n % b] + digits
        n //= b
    return digits or "0"


def frombase(s, b):
    return int(s, b)


def det2(m):
    return m[0][0] * m[1][1] - m[0][1] * m[1][0]


def det3(m):
    a, b, c = m[0]
    return (a * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - b * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
            + c * (m[1][0] * m[2][1] - m[1][1] * m[2][0]))


def mean(xs, fs=None):
    if fs is None:
        return Fraction(sum(xs), len(xs))
    return Fraction(sum(x * f for x, f in zip(xs, fs)), sum(fs))


def median(xs):
    return statistics.median(xs)


def pvar(xs, fs=None):
    if fs is None:
        fs = [1] * len(xs)
    m = mean(xs, fs)
    return Fraction(sum(f * (x - m) ** 2 for x, f in zip(xs, fs)), sum(fs))


def meandev(xs):
    m = mean(xs)
    return Fraction(sum(abs(x - m) for x in xs), len(xs))


def perm(n, r):
    return math.perm(n, r)


def comb(n, r):
    return math.comb(n, r)


def D(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)


def I(f, a, b, n=4000):
    hh = (b - a) / n
    s = f(a) + f(b)
    for i in range(1, n):
        s += (4 if i % 2 else 2) * f(a + i * hh)
    return s * hh / 3


def L(f, a, h=1e-7):
    return (f(a + h) + f(a - h)) / 2


def deg(x):
    return math.radians(x)


def ok(cond, s):
    """Sources assert a computed fact and return the key text it proves."""
    assert cond, s
    return s


def pm(m, env="pmatrix"):
    rows = " \\\\ ".join(" & ".join(str(v) for v in r) for r in m)
    return f"$\\begin{{{env}}} {rows} \\end{{{env}}}$"


def setstr(xs):
    """KaTeX set listing in ascending order, e.g. $\\{1, 3, 5\\}$."""
    return "$\\{" + ", ".join(str(x) for x in sorted(xs)) + "\\}$" if xs else "$\\emptyset$"


ENV = {"Q": Q, "CONCEPT": CONCEPT, "Fraction": Fraction, "F": Fraction, "math": math, "comb": comb, "perm": perm,
       "tobase": tobase, "frombase": frombase, "det2": det2, "det3": det3, "mean": mean, "median": median,
       "pvar": pvar, "meandev": meandev, "D": D, "I": I, "L": L, "deg": deg, "setstr": setstr,
       "ok": ok, "pm": pm, "sqrt": math.sqrt, "sin": math.sin, "cos": math.cos, "tan": math.tan, "pi": math.pi, "log": math.log,
       "log10": math.log10, "atan": math.atan, "asin": math.asin, "acos": math.acos, "degrees": math.degrees,
       "permutations": permutations, "combinations": combinations, "product": product, "Counter": Counter,
       "factorial": math.factorial, "gcd": math.gcd, "lcm": math.lcm}

# ---------- reading the KaTeX in options ----------
FUNCS = {"sin": "sin", "cos": "cos", "tan": "tan", "ln": "log", "log": "log10"}
TOK = re.compile(r"\\[a-zA-Z]+|\d+\.\d+|\d+|[a-zA-Z]|[{}()^+\-*/=,|\[\]]|\S")


class P:
    def __init__(self, s):
        s = (s.replace("\\left", "").replace("\\right", "").replace("\\dfrac", "\\frac").replace("\\tfrac", "\\frac")
             .replace("\\cdot", "*").replace("\\times", "*"))
        s = s.replace("\\,", "").replace("\\!", "").replace("\\displaystyle", "").replace("{,}", "")
        self.t = [t for t in TOK.findall(s) if not t.isspace()]
        self.i = 0

    def peek(self):
        return self.t[self.i] if self.i < len(self.t) else None

    def take(self, want=None):
        t = self.peek()
        if want is not None and t != want:
            raise ValueError(f"want {want} got {t}")
        self.i += 1
        return t

    def sum(self):
        out = self.product()
        while self.peek() in ("+", "-"):
            op = self.take()
            out = f"({out}{op}{self.product()})"
        return out

    def starts(self, t):
        return t is not None and (re.match(r"\d", t) or re.match(r"[a-zA-Z]$", t) or t in ("(", "{") or
                                  t.startswith("\\"))

    def product(self):
        out = self.unary()
        while True:
            t = self.peek()
            if t in ("*", "/"):
                self.take()
                out = f"({out}{t}{self.unary()})"
            elif self.starts(t):
                out = f"({out}*{self.unary()})"
            else:
                return out

    def unary(self):
        if self.peek() == "-":
            self.take()
            return f"(-{self.unary()})"
        if self.peek() == "+":
            self.take()
            return self.unary()
        return self.power()

    def exponent(self):
        t = self.peek()
        if t == "{":
            return self.group()
        self.take()
        if t == "-":
            return f"(-{self.take()})"
        return t

    def power(self):
        base = self.primary()
        if self.peek() == "^":
            self.take()
            return f"({base}**({self.exponent()}))"
        return base

    def group(self):
        self.take("{")
        out = self.sum()
        self.take("}")
        return f"({out})"

    def primary(self):
        t = self.take()
        if t is None:
            raise ValueError("end")
        if re.match(r"\d", t):
            return t
        if t == "(":
            out = self.sum()
            self.take(")")
            return f"({out})"
        if t == "{":
            self.i -= 1
            return self.group()
        if t == "|":
            out = self.sum()
            self.take("|")
            return f"abs({out})"
        if t == "\\frac":
            a = self.group()
            b = self.group()
            return f"({a}/{b})"
        if t == "\\sqrt":
            if self.peek() == "[":
                self.take()
                n = self.take()
                self.take("]")
                return f"(({self.group()})**(1/{n}))"
            return f"sqrt({self.group()})"
        if t == "\\pi":
            return "pi"
        if t.startswith("\\") and t[1:] in FUNCS:
            fn = FUNCS[t[1:]]
            pw = None
            if self.peek() == "^":
                self.take()
                pw = self.exponent()
            arg = self.power()
            call = f"{fn}({arg})"
            return f"({call}**({pw}))" if pw else call
        if t in ("x", "C"):
            return t
        raise ValueError(f"token {t}")


UNIT = r"(?:\s?(?:%|°|cm|m|km|mm|cm²|cm³|m²|m³|km²|km/h|m/s|kg|g|litres|years|days|hours|minutes|mins|seconds|s|students|ways|people|marks|naira))?"
PLAIN = re.compile(r"^(₦)?(-?\d[\d,]*(?:\.\d+)?)" + UNIT + r"$")


def to_py(opt):
    s = opt.strip()
    m = PLAIN.match(s)
    if m:
        return re.sub(r"^(-?)0+(?=\d)", r"\1", m.group(2).replace(",", ""))
    if not (s.startswith("$") and s.endswith("$") and s.count("$") == 2):
        return None
    s = s[1:-1]
    if "=" in s:
        left, _, s = s.partition("=")
        if "=" in s or not re.fullmatch(r"\s*[a-zA-Z]\s*", left):
            return None
    s = re.sub(r"\^\\circ$", "", s.strip())
    s = re.sub(r"\\text\{\s*[a-zA-Z²³/ ]+\}$", "", s.strip())
    try:
        p = P(s)
        out = p.sum()
        if p.peek() is not None:
            return None
        return out
    except (ValueError, IndexError):
        return None


EVAL = {"abs": abs, "sin": math.sin, "cos": math.cos, "tan": math.tan, "log": math.log, "log10": math.log10,
        "sqrt": math.sqrt, "pi": math.pi}


def value(opt, x=None):
    src = to_py(opt)
    if src is None:
        return None
    env = dict(EVAL)
    if x is not None:
        env["x"] = x
    env["C"] = 0
    try:
        v = eval(src, {"__builtins__": {}}, env)
    except Exception:
        return None
    if isinstance(v, complex):
        return None
    return float(v)


def numeric(opt):
    src = to_py(opt)
    if src is None or re.search(r"\b[xC]\b", src):
        return None
    v = value(opt)
    return v if v is not None and math.isfinite(v) else None


POINTS = [0.35, 0.8, 1.3, 1.9, 2.6]


def check(q):
    chk, opts, k = q["chk"], q["options"], q["key"]
    if chk is None:
        return ["no chk"]
    if chk == CONCEPT:
        return []
    if isinstance(chk, str):
        bad = [] if opts[k] == chk else [f"key {opts[k]!r} != computed {chk!r}"]
        bad += [f"distractor equals computed {o!r}" for i, o in enumerate(opts) if i != k and o == chk]
        return bad
    if callable(chk):
        plus_c = "+ C" in opts[k] or "+C" in opts[k]

        def diffs(o):
            out = []
            for x in POINTS:
                try:
                    a, b = value(o, x), chk(x)
                except (ValueError, ZeroDivisionError, OverflowError):
                    continue
                if a is None or b is None or math.isnan(a) or math.isnan(b):
                    continue
                out.append(a - b if plus_c else (a - b) / max(1.0, abs(b)))
            return out
        bad = []
        d = diffs(opts[k])
        if len(d) < 3:
            return [f"key not readable as a function: {opts[k]}"]
        if plus_c:
            if max(d) - min(d) > 1e-4 * max(1, max(abs(v) for v in d)):
                bad.append(f"key {opts[k]} is not an antiderivative")
        elif max(abs(v) for v in d) > 1e-4:
            bad.append(f"key {opts[k]} does not match chk")
        for i, o in enumerate(opts):
            if i != k:
                dd = diffs(o)
                if len(dd) >= 3 and (max(dd) - min(dd) < 1e-6 if plus_c else max(abs(v) for v in dd) < 1e-6):
                    bad.append(f"distractor {o} equals the key")
        return bad
    chk = float(chk)
    v = numeric(opts[k])
    if v is None:
        return [f"key not numeric: {opts[k]}"]
    bad = []
    tol = max(1e-9, 1e-6 * abs(chk))
    if abs(v - chk) > tol:
        bad.append(f"key {opts[k]} = {v} but chk = {chk}")
    for i, o in enumerate(opts):
        if i != k:
            w = numeric(o)
            if w is not None and abs(w - chk) <= tol:
                bad.append(f"distractor {o} = {w} is the answer")
    return bad


def load(name):
    g = dict(ENV)
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def finish(q):
    opts = q["options"]
    nums = [numeric(o) for o in opts]
    out = {"sorted": False}
    if q["locked"]:
        order = list(range(4))
        out["lockedOrder"] = True
    elif all(n is not None for n in nums):
        order = sorted(range(4), key=lambda i: nums[i])
        out["lockedOrder"] = True
        out["sorted"] = True
    else:
        rng = random.Random(int(hashlib.sha256((q["stem"] + SALT).encode()).hexdigest()[:12], 16))
        order = list(range(4))
        rng.shuffle(order)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(q["key"])]
    return out


def lint(q):
    warn = []
    texts = [q["stem"], q["explanation"], *q["options"]]
    if any(ch in t for t in texts for ch in "\u2014\u2013\u2019\u201c\u201d"):
        warn.append("em/en dash or curly quote")
    if len(set(q["options"])) != 4:
        warn.append("duplicate option")
    if re.search(r"\b(all|none) of the above\b|\bboth [a-d] and\b", " ".join(q["options"]).lower()):
        warn.append("banned option")
    for t in texts:
        if t.count("$") % 2:
            warn.append("unbalanced $: " + t[:50])
    if re.search(r"\b(option|choice) [A-D]\b", q["explanation"]):
        warn.append("letter reference in explanation")
    return warn


def plain_len(o):
    return len(re.sub(r"\\[a-zA-Z]+|[${}]", "", o))


def build():
    doms = [(dom, pt, nd, load(name)) for name, dom, pt, nd in DOMAINS]
    out, problems, authored = [], [], []

    def emit(q, dom, qid, test):
        problems.extend(f"{qid}: {p}" for p in lint(q) + check(q))
        authored.append((qid, q))
        f = finish(q)
        item = {"id": qid, "section": SECTION, "test": test, "module": 1, "domain": dom, "skill": q["skill"],
                "difficulty": q["difficulty"], "format": "single", "stem": q["stem"], "options": f["options"],
                "correct": f["correct"]}
        if f.get("lockedOrder"):
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append((item, f["sorted"]))

    for test in (1, 2):
        n = 0
        for dom, pt, nd, items in doms:
            mine = [q for q in items if q["test"] == test]
            if len(mine) != pt:
                problems.append(f"{dom} test {test}: {len(mine)} items, want {pt}")
            for q in mine:
                n += 1
                emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test)
    n = 0
    for dom, pt, nd, items in doms:
        mine = [q for q in items if q["test"] == 0]
        if len(mine) != nd:
            problems.append(f"{dom} drill-only: {len(mine)} items, want {nd}")
        for q in mine:
            n += 1
            emit(q, dom, f"{PREFIX}-D-{n:03d}", 0)

    qs = [i for i, _ in out]
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(qs, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(qs)} questions -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2, 0):
        print(f"  test {t}:", dict(Counter(q["domain"] for q in qs if q["test"] == t)))
    cand = [(qid, q) for qid, q in authored if not all(numeric(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand
               if plain_len(q["options"][q["key"]]) > max(plain_len(o) for i, o in enumerate(q["options"]) if i != q["key"])]
    allL = [qid for qid, q in authored
            if plain_len(q["options"][q["key"]]) > max(plain_len(o) for i, o in enumerate(q["options"]) if i != q["key"])]
    print(f"  key strictly longest (non-number items): {len(longest)}/{len(cand)} = {len(longest) / max(1, len(cand)):.0%}")
    print(f"  key strictly longest (all items): {len(allL)}/{len(authored)} = {len(allL) / len(authored):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in qs).items())))
    srt = [i for i, s in out if s]
    ends = sum(1 for i in srt if i["correct"][0] in (0, 3))
    print(f"  sorted number items: {len(srt)}, key in an end slot: {ends} ({ends / max(1, len(srt)):.0%})")
    concept = sum(1 for _, q in authored if q["chk"] == CONCEPT)
    print(f"  answers checked by computation: {len(authored) - concept}/{len(authored)} (concept items: {concept})")
    stems = Counter(q["stem"] for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            problems.append("duplicate stem: " + s[:80])
    for p in problems:
        print("  PROBLEM", p)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)
    return not problems


if __name__ == "__main__":
    raise SystemExit(0 if build() else 1)
