"""Helpers shared by the KS2 source files. Every item is a plain dict in the
v2 question shape minus id/section/test/module, which build.py assigns."""

ZWSP = "​"  # an empty-looking paragraph: RichText trims whitespace but not this


def poem(text):
    """RichText joins single newlines into one paragraph, so each poem line is
    its own paragraph and stanzas are separated by an empty-looking one."""
    stanzas = [s.strip().split("\n") for s in text.strip().split("\n\n")]
    return f"\n\n{ZWSP}\n\n".join("\n\n".join(l.strip() for l in st) for st in stanzas)


def single(domain, skill, diff, stem, options, key, expl, basics=None, **kw):
    """options[key] is the answer; build.py rotates the list so keys spread."""
    q = dict(domain=domain, skill=skill, difficulty=diff, format="single", stem=stem,
             options=list(options), correct=[key], explanation=expl, **kw)
    if basics:
        q["basics"] = basics
    return q


def multi(domain, skill, diff, stem, options, keys, expl, basics=None, select=None, **kw):
    q = dict(domain=domain, skill=skill, difficulty=diff, format="multi", stem=stem,
             options=list(options), correct=list(keys), explanation=expl, **kw)
    if select:
        q["select"] = select
    if basics:
        q["basics"] = basics
    return q


def order(domain, skill, diff, stem, steps_in_order, expl, basics=None, **kw):
    q = dict(domain=domain, skill=skill, difficulty=diff, format="order", stem=stem,
             options=list(steps_in_order), correct=list(range(len(steps_in_order))), explanation=expl, **kw)
    if basics:
        q["basics"] = basics
    return q


def matrix(domain, skill, diff, stem, rows, columns, keys, expl, basics=None, **kw):
    q = dict(domain=domain, skill=skill, difficulty=diff, format="matrix", stem=stem,
             rows=list(rows), columns=list(columns), correct=list(keys), explanation=expl, **kw)
    if basics:
        q["basics"] = basics
    return q


def cloze(domain, skill, diff, stem, blanks, keys, expl, basics=None, **kw):
    q = dict(domain=domain, skill=skill, difficulty=diff, format="cloze", stem=stem,
             blanks=[list(b) for b in blanks], correct=list(keys), explanation=expl, **kw)
    if basics:
        q["basics"] = basics
    return q


def highlight(domain, skill, diff, stem, keys, expl, basics=None, **kw):
    q = dict(domain=domain, skill=skill, difficulty=diff, format="highlight", stem=stem,
             correct=list(keys), explanation=expl, **kw)
    if basics:
        q["basics"] = basics
    return q


def numeric(domain, skill, diff, stem, answers, expl, basics=None, whole=False, tolerance=0, **kw):
    num = {"answers": [str(a) for a in answers], "tolerance": tolerance}
    if whole:
        num["wholeNumber"] = True
    q = dict(domain=domain, skill=skill, difficulty=diff, format="numeric", stem=stem,
             numeric=num, explanation=expl, **kw)
    if basics:
        q["basics"] = basics
    return q
