#!/usr/bin/env python3
"""Build the AP Calculus AB v2 bank from Python-data sources.

Usage: python3 -I tools/next100/apcalcab/build.py

Sources, one file per unit of the College Board course framework (CED, July
2026 edition, effective for the May 2027 exam): u1_limits.py, u2_derivatives.py,
u3_composite.py, u4_contextual.py, u5_analytical.py, u6_integration.py,
u7_diffeq.py, u8_applications.py. Each file has ITEMS, a list of
  Q(test, difficulty, skill, stem, [key, wrong, wrong, wrong], explanation,
    calc=False, chk=None, locked=False, key=0)
test is 1 or 2 (a practice-test item) or 0 (drill only). calc=True puts a
test item in Part B (graphing calculator section); drill-only items are
always in Part A (no calculator), because drills draw from one section and
have no calculator. The key is written first; the build shuffles the four
options with a seed from the stem. Options that are all numbers (plain or a
single KaTeX expression such as $\\frac{3}{4}$, $\\ln 2$ or $x = -1$) are
sorted ascending and locked. locked=True keeps the authored (natural) order,
with key= the index of the correct option.

Checking: chk is the computed answer. A number is compared with the key's
value (decimal keys are rounded to three places, as on the AP Exam); a
function of x is compared with the key, read as a function, at several
points (up to a constant when the key ends in "+ C"). Every distractor must
differ from chk. The helpers D (derivative), I (definite integral) and L
(two-sided limit) are numeric, so the check never relies on the algebra it
is checking.

Ids: APCALCAB-T<n>-NNN (Part A first, then Part B, unit order within each)
and APCALCAB-D-NNN (drill only).
"""
import hashlib, json, math, os, random, re
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
PREFIX = "APCALCAB"
EXAM = "apcalcab"
# (source, domain, Part A per test, Part B per test, drill-only count)
UNITS = [("u1_limits", "apcalcabLimits", 4, 1, 16), ("u2_derivatives", "apcalcabDerivatives", 4, 1, 16),
         ("u3_composite", "apcalcabComposite", 3, 0, 17), ("u4_contextual", "apcalcabContextual", 3, 2, 17),
         ("u5_analytical", "apcalcabAnalytical", 5, 2, 15), ("u6_integration", "apcalcabIntegration", 6, 2, 14),
         ("u7_diffeq", "apcalcabDiffEq", 2, 1, 18), ("u8_applications", "apcalcabApplications", 2, 4, 18)]
SHUFFLE_SALT = os.environ.get("SALT", "#0")


def Q(test, d, skill, stem, opts, expl, calc=False, chk=None, locked=False, key=0):
    assert len(opts) == 4, stem
    assert not (calc and test == 0), "drill-only items are no-calculator: " + stem
    return {"test": test, "difficulty": d, "skill": skill, "stem": stem, "options": list(opts), "explanation": expl,
            "calc": calc, "chk": chk, "locked": locked, "key": key}


# ---------- numeric helpers available to sources ----------
def D(f, x, h=1e-5):
    return (f(x + h) - f(x - h)) / (2 * h)


def D2(f, x, h=1e-4):
    return (f(x + h) - 2 * f(x) + f(x - h)) / (h * h)


def I(f, a, b, n=4000):
    if a == b:
        return 0.0
    hh = (b - a) / n
    s = f(a) + f(b)
    for i in range(1, n):
        s += (4 if i % 2 else 2) * f(a + i * hh)
    return s * hh / 3


def D3(f, x, h=1e-3):
    return (f(x + 2 * h) - 2 * f(x + h) + 2 * f(x - h) - f(x - 2 * h)) / (2 * h ** 3)


def L(f, a, h=1e-7):
    return (f(a + h) + f(a - h)) / 2


def ODE(f, x0, y0, x1, n=2000):
    """RK4 solution of dy/dx = f(x, y), y(x0) = y0, evaluated at x1."""
    h = (x1 - x0) / n
    x, y = x0, y0
    for _ in range(n):
        k1 = f(x, y)
        k2 = f(x + h / 2, y + h * k1 / 2)
        k3 = f(x + h / 2, y + h * k2 / 2)
        k4 = f(x + h, y + h * k3)
        y += h * (k1 + 2 * k2 + 2 * k3 + k4) / 6
        x += h
    return y


def ARGMAX(f, a, b, n=20000):
    """x in [a, b] where f is largest (grid search, then golden-section refinement)."""
    xs = [a + (b - a) * i / n for i in range(n + 1)]
    i = max(range(n + 1), key=lambda j: f(xs[j]))
    lo, hi = xs[max(0, i - 1)], xs[min(n, i + 1)]
    g = (5 ** 0.5 - 1) / 2
    for _ in range(80):
        c, d = hi - g * (hi - lo), lo + g * (hi - lo)
        if f(c) > f(d):
            hi = d
        else:
            lo = c
    return (lo + hi) / 2


def ARGMIN(f, a, b, n=20000):
    return ARGMAX(lambda x: -f(x), a, b, n)


def sec(x):
    return 1 / math.cos(x)


def csc(x):
    return 1 / math.sin(x)


def cot(x):
    return math.cos(x) / math.sin(x)


ENV = {"Q": Q, "D": D, "D2": D2, "D3": D3, "I": I, "L": L, "ODE": ODE, "ARGMAX": ARGMAX, "ARGMIN": ARGMIN, "math": math, "sec": sec, "csc": csc, "cot": cot,
       "sin": math.sin, "cos": math.cos, "tan": math.tan, "exp": math.exp, "log": math.log, "sqrt": math.sqrt,
       "pi": math.pi, "e": math.e, "atan": math.atan, "asin": math.asin, "nan": float("nan")}

# ---------- a small reader for the KaTeX in options ----------
FUNCS = {"sin": "sin", "cos": "cos", "tan": "tan", "sec": "sec", "csc": "csc", "cot": "cot", "ln": "log",
         "arcsin": "asin", "arctan": "atan", "arccos": "acos"}
TOK = re.compile(r"\\[a-zA-Z]+|\d+\.\d+|\d+|[a-zA-Z]|[{}()^+\-*/=,|]|\S")


class P:
    def __init__(self, s):
        s = s.replace("\\left", "").replace("\\right", "").replace("\\dfrac", "\\frac").replace("\\cdot", "*")
        s = s.replace("\\,", " ").replace("\\!", "").replace("\\displaystyle", "")
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
        if t == "\\infty":
            return "INF"
        if t.startswith("\\") and t[1:] in FUNCS:
            fn = FUNCS[t[1:]]
            pw = None
            if self.peek() == "^":
                self.take()
                pw = self.exponent()
            arg = self.power()
            call = f"{fn}({arg})"
            return f"({call}**({pw}))" if pw else call
        if t == "e":
            return "E"
        if t in ("x", "t", "C"):
            return t
        raise ValueError(f"token {t}")


def to_py(opt):
    """Python source for an option that is one KaTeX expression (or a plain number), else None."""
    s = opt.strip()
    if re.fullmatch(r"-?\d+(\.\d+)?", s):
        return s
    if not (s.startswith("$") and s.endswith("$") and s.count("$") == 2):
        return None
    s = s[1:-1]
    if "=" in s:
        s = s.split("=")[-1]
    try:
        p = P(s)
        out = p.sum()
        if p.peek() is not None:
            return None
        return out
    except (ValueError, IndexError):
        return None


EVAL = {"abs": abs, "sin": math.sin, "cos": math.cos, "tan": math.tan, "sec": sec, "csc": csc, "cot": cot, "log": math.log,
        "asin": math.asin, "atan": math.atan, "acos": math.acos, "sqrt": math.sqrt, "pi": math.pi, "E": math.e,
        "INF": float("inf")}


def value(opt, x=None):
    src = to_py(opt)
    if src is None:
        return None
    env = dict(EVAL)
    if x is not None:
        env.update(x=x, t=x)
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
    if src is None or re.search(r"\b[xtC]\b", src):
        return None
    v = value(opt)
    return v if v is not None and math.isfinite(v) else None


POINTS = [0.35, 0.8, 1.3, 1.9, 2.6]


def check(q, where):
    """Problems with the computed answer, as a list of strings."""
    chk, opts = q["chk"], q["options"]
    k = q["key"]
    bad = []
    if chk is None:
        if all(numeric(o) is not None for o in opts):
            bad.append("all-number options but no chk")
        return bad
    if callable(chk):
        plus_c = "+ C" in opts[k]

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
        d = diffs(opts[k])
        if len(d) < 3:
            bad.append(f"key not readable as a function: {opts[k]}")
        elif plus_c:
            if max(d) - min(d) > 1e-4 * max(1, max(abs(v) for v in d)):
                bad.append(f"key {opts[k]} is not an antiderivative of chk")
        elif max(abs(v) for v in d) > 1e-4:
            bad.append(f"key {opts[k]} does not match chk {d}")
        for i, o in enumerate(opts):
            if i == k:
                continue
            dd = diffs(o)
            if len(dd) >= 3 and (max(dd) - min(dd) < 1e-6 if plus_c else max(abs(v) for v in dd) < 1e-6):
                bad.append(f"distractor {o} equals the key")
        return bad
    v = numeric(opts[k])
    if v is None:
        bad.append(f"key not numeric: {opts[k]}")
        return bad
    tol = max(6e-4, 1e-6 * abs(chk))
    if not abs(v - chk) <= tol:
        bad.append(f"key {opts[k]} = {v} but chk = {chk}")
    for i, o in enumerate(opts):
        if i != k:
            w = numeric(o)
            if w is not None and abs(w - chk) <= max(2e-3, 1e-6 * abs(chk)):
                bad.append(f"distractor {o} = {w} is the answer")
    return bad


def load(name):
    g = dict(ENV)
    path = os.path.join(HERE, f"{name}.py")
    exec(compile(open(path).read(), path, "exec"), g)
    return g["ITEMS"]


def finish(q):
    rng = random.Random(int(hashlib.sha256((q["stem"] + SHUFFLE_SALT).encode()).hexdigest()[:12], 16))
    opts = q["options"]
    nums = [numeric(o) for o in opts]
    out = {}
    if q["locked"]:
        order = list(range(4))
        out["lockedOrder"] = True
    elif all(n is not None for n in nums):
        order = sorted(range(4), key=lambda i: nums[i])
        out["lockedOrder"] = True
    else:
        order = list(range(4))
        rng.shuffle(order)
    out["options"] = [opts[i] for i in order]
    out["correct"] = [order.index(q["key"])]
    out["sorted"] = not q["locked"] and all(n is not None for n in nums)
    return out


def lint(q, where):
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
    return [f"{where}: {w}" for w in warn]


def build():
    units = [(dom, a, b, nd, load(name)) for name, dom, a, b, nd in UNITS]
    out, problems, authored = [], [], []

    def emit(q, dom, qid, test, section):
        problems.extend(lint(q, qid))
        problems.extend(f"{qid}: {p}" for p in check(q, qid))
        authored.append((qid, q))
        f = finish(q)
        item = {"id": qid, "section": section, "test": test, "module": 1, "domain": dom, "skill": q["skill"],
                "difficulty": q["difficulty"], "format": "single", "stem": q["stem"], "options": f["options"],
                "correct": f["correct"]}
        if f.get("lockedOrder"):
            item["lockedOrder"] = True
        item["explanation"] = q["explanation"]
        out.append((item, f["sorted"]))

    for test in (1, 2):
        n = 0
        for part, section in ((False, "nocalc"), (True, "calc")):
            for dom, a, b, nd, items in units:
                mine = [q for q in items if q["test"] == test and q["calc"] == part]
                want = b if part else a
                assert len(mine) == want, (dom, test, section, len(mine), want)
                for q in mine:
                    n += 1
                    emit(q, dom, f"{PREFIX}-T{test}-{n:03d}", test, section)
    n = 0
    for dom, a, b, nd, items in units:
        mine = [q for q in items if q["test"] == 0]
        assert len(mine) == nd, (dom, 0, len(mine), nd)
        for q in mine:
            n += 1
            emit(q, dom, f"{PREFIX}-D-{n:03d}", 0, "nocalc")

    qs = [i for i, _ in out]
    dst = os.path.join(ROOT, f"data/v2/{EXAM}/questions.json")
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    with open(dst, "w") as f:
        json.dump(qs, f, indent=2, ensure_ascii=False)
        f.write("\n")
    print(f"{EXAM}: wrote {len(qs)} questions -> {os.path.relpath(dst, ROOT)}")
    for t in (1, 2):
        for s in ("nocalc", "calc"):
            print(f"  test {t} {s}:", dict(Counter(q["domain"] for q in qs if q["test"] == t and q["section"] == s)))
    print("  drill pools (test 1 Part A + drill-only):",
          dict(Counter(q["domain"] for q in qs if q["section"] == "nocalc" and q["test"] in (0, 1))))
    cand = [(qid, q) for qid, q in authored
            if not q["locked"] and not all(numeric(o) is not None for o in q["options"])]
    longest = [qid for qid, q in cand
               if len(q["options"][q["key"]]) > max(len(o) for i, o in enumerate(q["options"]) if i != q["key"])]
    print(f"  key strictly longest: {len(longest)}/{len(cand)} = {len(longest) / len(cand):.0%}")
    print("  key positions:", dict(sorted(Counter("ABCD"[q["correct"][0]] for q in qs).items())))
    srt = [i for i, s in out if s]
    ends = sum(1 for i in srt if i["correct"][0] in (0, 3))
    print(f"  sorted number items: {len(srt)}, key in an end slot: {ends} ({ends / max(1, len(srt)):.0%})")
    checked = sum(1 for _, q in authored if q["chk"] is not None)
    print(f"  answers checked by computation: {checked}/{len(authored)}")
    stems = Counter(q["stem"] for _, q in authored)
    for s, k in stems.items():
        if k > 1:
            print("  WARN duplicate stem:", s[:80])
    for p in problems:
        print("  PROBLEM", p)
    if os.environ.get("SHOW_LONGEST"):
        print("  longest:", longest)
    return not problems


if __name__ == "__main__":
    raise SystemExit(0 if build() else 1)
