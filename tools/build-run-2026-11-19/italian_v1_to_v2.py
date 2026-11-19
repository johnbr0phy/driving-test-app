"""Build the v2 banks of CILS B1 Cittadinanza and CELI 2 from their v1 builders.

Usage: python3 -I tools/build-run-2026-11-19/italian_v1_to_v2.py [itcils|itceli ...]

Runs tools/next100/<exam>/build.py into a temporary file (the sources stay where they are),
then turns each row into a v2 item. Reading items quote their text with « »: the text becomes
the item's passage, the words before it ("Leggi la mail", "Avviso") its italic heading and the
question after it the stem. Two questions on the same text (CELI 2) share one stimulus. Each
category's pool, sorted by question id, gives test N its slice N of `per` items, as the v1 test
generator did, so the four tests keep exactly the questions they had; question ids are unchanged.
"""
import json, os, re, subprocess, sys, tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))

EXAMS = {
    "itcils": {
        "prefix": "ITCILS",
        # category: (section, per test)
        "cats": {"itcilsAvvisi": ("lettura", 5), "itcilsMail": ("lettura", 5), "itcilsTesti": ("lettura", 5),
                 "itcilsPreposizioni": ("grammatica", 5), "itcilsPassato": ("grammatica", 6), "itcilsVerbi": ("grammatica", 5),
                 "itcilsPronomi": ("grammatica", 5), "itcilsAggettivi": ("grammatica", 4), "itcilsConnettivi": ("grammatica", 4),
                 "itcilsLessico": ("grammatica", 6)},
        "reading": {"itcilsAvvisi", "itcilsMail", "itcilsTesti"},
    },
    "itceli": {
        "prefix": "ITCELI",
        "cats": {"itceliAvvisi": ("lettura", 10), "itceliTesti": ("lettura", 12), "itceliVerbi": ("lingua", 8),
                 "itceliPronomi": ("lingua", 5), "itceliPreposizioni": ("lingua", 5), "itceliConnettivi": ("lingua", 4),
                 "itceliLessico": ("lingua", 6)},
        "reading": {"itceliAvvisi", "itceliTesti"},
    },
}


def split_reading(q):
    a, b = q.find("«"), q.rfind("»")
    assert a > 0 and b > a, q[:80]
    intro = q[:a].strip().rstrip(":").strip()
    text = q[a + 1:b].strip().replace("“", "«").replace("”", "»")
    stem = q[b + 1:].strip()
    assert intro and text and stem.endswith("?"), q[:80]
    text = re.sub(r"\s+\((\d)\)\s", r"\n\n(\1) ", text)
    return intro, text, stem


def build(exam_id):
    cfg = EXAMS[exam_id]
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "bank.json")
        subprocess.run([sys.executable, "-I", os.path.join(ROOT, "tools", "next100", exam_id, "build.py"), out],
                       check=True, stdout=subprocess.DEVNULL)
        rows = json.load(open(out, encoding="utf-8"))
    by = {}
    for r in rows:
        by.setdefault(r["category"], []).append(r)
    assert set(by) == set(cfg["cats"]), set(by) ^ set(cfg["cats"])
    items, stimuli, text_ids = [], {}, {}
    for cat, (section, per) in cfg["cats"].items():
        pool = sorted(by[cat], key=lambda r: r["questionId"])
        for i, r in enumerate(pool):
            test = i // per + 1 if i < 4 * per else 0
            opts = [r["option" + L] for L in "ABCD"]
            item = {"id": r["questionId"], "section": section, "test": test, "module": 1, "domain": cat,
                    "difficulty": 1 + (3 * (i % per)) // per, "format": "single"}
            if cat in cfg["reading"]:
                intro, text, stem = split_reading(r["question"])
                key = (intro, text)
                same = sum(1 for x in pool if x["question"].startswith(r["question"][: r["question"].rfind("»") + 1]))
                if same > 1:
                    if key not in text_ids:
                        sid = f"{cfg['prefix']}-P{len(text_ids) + 1:02d}"
                        text_ids[key] = sid
                        stimuli[sid] = {"id": sid, "title": intro, "text": text}
                    item["stimulusId"] = text_ids[key]
                else:
                    item["passage"] = f"*{intro}*\n\n{text}"
                item["stem"] = stem
            else:
                item["stem"] = r["question"]
            item.update({"options": opts, "correct": [r["correctIndex"]], "explanation": r["explanation"]})
            items.append(item)
    path = os.path.join(ROOT, "data", "v2", exam_id, "questions.json")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    body = {"stimuli": list(stimuli.values()), "questions": items} if stimuli else items
    with open(path, "w", encoding="utf-8") as f:
        json.dump(body, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"{exam_id}: {len(items)} items, {len(stimuli)} shared texts -> {path}")


if __name__ == "__main__":
    for e in sys.argv[1:] or EXAMS:
        build(e)
