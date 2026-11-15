"""C-test (Complete the Words) helper for the TOEFL iBT Reading build.

ETS (Updated TOEFL iBT Test Overview): following an intact first sentence, the
second half of every second word is deleted; 10 words per text. Here a word of
n letters keeps its first n // 2 letters and loses the rest (ETS's own examples
keep "mi" of a five-letter word and "th" of a four-letter one). One-letter words
and numbers are skipped, and the next word is damaged instead, as in a standard
C-test. The gap is shown as one underscore per missing letter, spaced so that
the app's rich text never reads two underscores as an underline marker.
"""
import re

FIRST_SENTENCE = re.compile(r"^(.+?[.!?])\s+(.*)$", re.S)
TOKEN = re.compile(r"[A-Za-z]+|[^A-Za-z]+")

FUNCTION = set("""
a an the this that these those there their they them it its he she his her him we our us you your i me my
of in on at by for from with to into onto over under about after before during between through without within
and or but so yet nor if as than because while when where which who whom whose what how why although though
is are was were be been being am has have had do does did can could will would shall should may might must
not no some any each every many much more most few less least both either neither all such own same other
also only even just still very too then now here up down out off one ones another
""".split())


def damage(text, n_words=10):
    """Split text, damage every second word after the first sentence.

    Returns (rendered_text, words) where words is a list of dicts
    {word, prefix, missing, n} in order, n = 1..10.
    """
    m = FIRST_SENTENCE.match(text.strip())
    assert m, "needs an intact first sentence"
    first, rest = m.group(1), m.group(2)
    out, words = [], []
    toggle = False  # the first word after the first sentence stays intact
    for tok in TOKEN.findall(rest):
        if not tok[0].isalpha() or len(words) >= n_words:
            out.append(tok)
            continue
        if toggle and len(tok) >= 2:
            keep = len(tok) // 2
            n = len(words) + 1
            words.append({"word": tok, "prefix": tok[:keep], "missing": len(tok) - keep, "n": n})
            out.append(tok[:keep] + " ".join("_" * (len(tok) - keep)) + f" **({n})**")
            toggle = False
        elif toggle:
            out.append(tok)  # one-letter word: skip, damage the next word
        else:
            out.append(tok)
            toggle = True
    assert len(words) == n_words, f"only {len(words)} damaged words"
    return first + " " + "".join(out), words


def gap(w):
    return w["prefix"] + " ".join("_" * w["missing"])


def is_function(word):
    return word.lower() in FUNCTION
