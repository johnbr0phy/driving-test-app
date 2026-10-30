"""Helpers for the Functional Skills Maths Level 2 source files.

Every item is written as Python so each answer and each distractor is
computed rather than typed: a wrong key would have to be a wrong formula.
"""

_counter = [0]


def gbp(x, pence=True):
    """£1,234.50 (or £1,235 with pence=False)."""
    if pence:
        return "£" + f"{x:,.2f}"
    return "£" + f"{x:,.0f}"


def fmt(x, dp=None):
    """A number as printed in a question: integers without .0, commas for thousands, a real minus sign."""
    if x < 0:
        return "−" + fmt(-x, dp)
    if dp is not None:
        return f"{x:,.{dp}f}"
    if abs(x - round(x)) < 1e-9:
        return f"{int(round(x)):,}"
    s = f"{x:,.6f}".rstrip("0").rstrip(".")
    return s


def item(domain, test, sec, skill, difficulty, fmt_, stem, explanation, basics=None, **kw):
    q = {"domain": domain, "test": test, "section": sec, "skill": skill, "difficulty": difficulty,
         "format": fmt_, "stem": stem, "explanation": explanation}
    if basics:
        q["basics"] = basics
    q.update(kw)
    return q


def mc(domain, test, sec, skill, difficulty, stem, key, wrong, explanation, basics=None, **kw):
    """Single answer. The key's slot rotates through A to D so letters stay balanced."""
    wrong = list(wrong)
    assert key not in wrong, (stem, key, wrong)
    assert len(set(wrong)) == len(wrong), (stem, wrong)
    pos = _counter[0] % (len(wrong) + 1)
    _counter[0] += 1
    options = wrong[:pos] + [key] + wrong[pos:]
    return item(domain, test, sec, skill, difficulty, "single", stem, explanation, basics,
                options=options, correct=[pos], **kw)


def multi(domain, test, sec, skill, difficulty, stem, keys, wrong, explanation, basics=None, **kw):
    """Choose N: keys are dropped into the distractors at rotating slots."""
    options = list(wrong)
    for i, k in enumerate(keys):
        options.insert((_counter[0] + 2 * i) % (len(options) + 1), k)
    _counter[0] += 1
    correct = sorted(options.index(k) for k in keys)
    return item(domain, test, sec, skill, difficulty, "multi", stem, explanation, basics,
                options=options, correct=correct, select=len(keys), **kw)


def order(domain, test, sec, skill, difficulty, stem, steps, explanation, basics=None, **kw):
    """Steps given in the right order; the app shows them shuffled."""
    return item(domain, test, sec, skill, difficulty, "order", stem, explanation, basics,
                options=list(steps), correct=list(range(len(steps))), **kw)


def matrix(domain, test, sec, skill, difficulty, stem, rows, columns, correct, explanation, basics=None, **kw):
    return item(domain, test, sec, skill, difficulty, "matrix", stem, explanation, basics,
                rows=rows, columns=columns, correct=correct, **kw)


def num(domain, test, sec, skill, difficulty, stem, answers, explanation, basics=None, tolerance=0, whole=False, **kw):
    """Typed answer. The answer box only takes digits, ".", "/" and "-" (QuestionView),
    and parseNumeric strips no units, so the stem names the unit and always ends
    "Type the number only." """
    if "Type the number only" not in stem:
        stem = stem.rstrip() + " Type the number only."
    extra = {"numeric": {"answers": [str(a) for a in answers], "tolerance": tolerance}}
    if whole:
        extra["numeric"]["wholeNumber"] = True
    extra.update(kw)
    return item(domain, test, sec, skill, difficulty, "numeric", stem, explanation, basics, **extra)


def money_answers(x):
    """An amount of money as typed: 12.50 (or 12 for whole pounds). parseNumeric reads
    12.5, 12.50 and a pasted £12.50 as the same value, so no other forms are listed."""
    if abs(x - round(x)) < 1e-9:
        return [str(int(round(x)))]
    return [f"{x:.2f}"]


def plain(x):
    """A number as typed: no commas, ASCII minus, no trailing zeros."""
    if abs(x - round(x)) < 1e-9:
        return str(int(round(x)))
    return f"{x:.6f}".rstrip("0").rstrip(".")


def unit_answers(x, units=()):
    """The bare number only. `units` just records what the stem asks for: parseNumeric
    does not strip units ("12 cm" reads as nothing) and the answer box will not take
    letters, so the stem must name the unit and say "Type the number only."."""
    return [plain(x)]


def pct_answers(x):
    """A percentage as a bare number (the stem asks for a percentage)."""
    return [plain(x)]
