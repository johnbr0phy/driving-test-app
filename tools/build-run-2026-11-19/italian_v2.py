"""Build the v2 banks of the two Italian tests from the same q_*.py sources as before.

Usage: python3 -I tools/build-run-2026-11-19/italian_v2.py ita2|itcilsb2

Each source item is (domanda, risposta giusta, [3 sbagliate], spiegazione), key written first.
Reading items quote their text with « »: the text becomes the item's passage (shown in its own
box above the question), the words before it ("Leggi il messaggio della scuola") its heading,
and the question after it the stem. Numbered parts "(1) ... (2) ..." go on their own lines.
Short quotes in grammar items stay in the stem. Every category's pool is four tests' worth in
source order: item i goes to test i // per_test + 1, as the v1 bank did. Options keep the key at
slot i % 4; the v2 engine shuffles them when shown. Question ids are unchanged.
"""
import importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
BAD = ["—", "–", '"', "Tutte le precedenti", "Nessuna delle precedenti", "A e B"]

EXAMS = {
    "ita2": {
        "prefix": "ITA2-",
        # (source module, section, per test)
        "order": [("corrispondenza", "lettura", 5), ("orientarsi", "lettura", 6), ("informarsi", "lettura", 4),
                  ("istruzioni", "lettura", 5), ("interazione", "lingua", 6), ("azioni", "lingua", 6),
                  ("lessico", "lingua", 8), ("grammatica", "lingua", 10)],
        "reading": {"corrispondenza", "orientarsi", "informarsi", "istruzioni"},
    },
    "itcilsb2": {
        "prefix": "ITB2-",
        "order": [("articoli", "lettura", 6), ("informazioni", "lettura", 5), ("coesione", "lettura", 4),
                  ("pronomi", "strutture", 6), ("verbi", "strutture", 10), ("periodo", "strutture", 7),
                  ("situazioni", "strutture", 5), ("lessico", "strutture", 7)],
        "reading": {"articoli", "informazioni", "coesione"},
    },
}


def inner_quotes(q):
    a, b = q.find("«"), q.rfind("»")
    if a < 0 or b < 0:
        return q
    return q[:a + 1] + q[a + 1:b].replace("«", "“").replace("»", "”") + q[b:]


def split_reading(q):
    a, b = q.find("«"), q.rfind("»")
    assert a > 0 and b > a, q[:80]
    intro = q[:a].strip().rstrip(":").strip()
    text = q[a + 1:b].strip()
    stem = q[b + 1:].strip()
    assert intro and text and stem.endswith("?"), q[:80]
    # Numbered parts on their own lines.
    text = re.sub(r"\s+\((\d)\)\s", r"\n\n(\1) ", text)
    return f"*{intro}*\n\n{text}", stem


def difficulty(i, n):
    return 1 + (3 * i) // n if n else 2


def build(exam_id):
    cfg = EXAMS[exam_id]
    src = os.path.join(HERE, exam_id)
    out, seen = [], set()
    for m, section, per in cfg["order"]:
        spec = importlib.util.spec_from_file_location(m, os.path.join(src, f"q_{m}.py"))
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        assert len(mod.Q) == 4 * per, (m, len(mod.Q), per)
        for i, (q, key, wrong, expl) in enumerate(mod.Q):
            q = inner_quotes(q)
            assert len(wrong) == 3 and key not in wrong and len(set(wrong)) == 3, (m, i)
            for bad in BAD:
                assert bad not in q + key + "".join(wrong) + expl, (m, i, bad)
            k = i % 4
            opts = list(wrong)
            opts.insert(k, key)
            qid = f"{cfg['prefix']}{mod.SEG}-{i + 1:03d}"
            assert qid not in seen
            seen.add(qid)
            item = {"id": qid, "section": section, "test": i // per + 1, "module": 1, "domain": mod.CAT,
                    "difficulty": min(3, difficulty(i % per, per)), "format": "single"}
            if m in cfg["reading"]:
                item["passage"], item["stem"] = split_reading(q)
            else:
                item["stem"] = q
            item.update({"options": opts, "correct": [k], "explanation": expl})
            out.append(item)
    path = os.path.join(ROOT, "data", "v2", exam_id, "questions.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
        f.write("\n")
    words = sorted(len(x["stem"].split()) for x in out)
    print(f"{exam_id}: {len(out)} items -> {path}; median stem {words[len(words) // 2]} words, max {words[-1]}")


if __name__ == "__main__":
    for e in sys.argv[1:] or EXAMS:
        build(e)
