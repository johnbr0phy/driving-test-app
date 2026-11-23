"""Similarity check of the GROL bank against the official FCC Element 1 and 3 pools.

    python3 -I similarity.py <pool1.txt> <pool3.txt> [bank.json]

The pools (public domain, FCC files 3798/11789 and 11790, approved 25 June 2009) are used only
to make sure no Tigertest item copies or closely rewords a pool question. Text comes from the
PDFs; items are split on their ids (1-1A1, 3-12B3...). For every bank item it reports the
closest pool item by stem similarity (difflib ratio and content-word Jaccard) and the number of
shared options, and flags: stem ratio >= 0.60, Jaccard >= 0.45, or 3+ shared options, or
2+ shared options with the same key.
"""
import difflib, json, os, re, sys

STOP = set("a an the of to in on for and or is are be by at with what which how why when who whom does do this that from as it its into must may can should under about most used use".split())


def words(s):
    return {w for w in re.findall(r"[a-z0-9.]+", s.lower()) if w not in STOP and len(w) > 1}


def norm(s):
    return re.sub(r"[^a-z0-9.]+", " ", s.lower()).strip().rstrip(".")


def parse_pool(path):
    t = open(path, encoding="utf-8").read()
    t = re.sub(r"=====PAGE \d+=====", " ", t)
    keys = dict(re.findall(r"(\d-\d+[A-Z]\d+):\s*([A-D])", t))
    t = re.sub(r"Answer Key:.*?(?=\n\d-\d+[A-Z]\d+ |\nKey Topic|\nSubelement|\Z)", " ", t, flags=re.S)
    items = []
    for m in re.finditer(r"(?m)^(\d-\d+[A-Z]\d+)\s+(.*?)(?=^\d-\d+[A-Z]\d+\s|^Key Topic|^Subelement|\Z)", t, flags=re.S):
        qid, body = m.group(1), m.group(2)
        parts = re.split(r"(?m)^([A-D])\.\s", body)
        stem = " ".join(parts[0].split())
        opts = {}
        for i in range(1, len(parts) - 1, 2):
            opts[parts[i]] = " ".join(parts[i + 1].split())
        items.append({"id": qid, "stem": stem, "opts": opts, "key": opts.get(keys.get(qid, ""), "")})
    return items


def main():
    p1, p3 = sys.argv[1], sys.argv[2]
    here = os.path.dirname(os.path.abspath(__file__))
    bank = sys.argv[3] if len(sys.argv) > 3 else os.path.join(here, "..", "..", "..", "data", "grol-questions.json")
    pool = parse_pool(p1) + parse_pool(p3)
    rows = json.load(open(bank))
    flagged = 0
    for q in rows:
        opts = [q["option" + c] for c in "ABCD"]
        key = opts[q["correctIndex"]]
        best = None
        for p in pool:
            r = difflib.SequenceMatcher(None, q["question"].lower(), p["stem"].lower()).ratio()
            a, b = words(q["question"]), words(p["stem"])
            j = len(a & b) / max(1, len(a | b))
            po = {norm(x) for x in p["opts"].values()}
            shared = sum(1 for o in opts if norm(o) in po)
            samekey = norm(key) == norm(p["key"]) and p["key"] != ""
            score = max(r, j) + 0.1 * shared
            if best is None or score > best[0]:
                best = (score, r, j, shared, samekey, p)
        _, r, j, shared, samekey, p = best
        flag = r >= 0.60 or j >= 0.45 or shared >= 3 or (shared >= 2 and samekey)
        if flag:
            flagged += 1
            print(f"FLAG {q['questionId']} ratio={r:.2f} jacc={j:.2f} shared={shared} samekey={samekey} ~ {p['id']}")
            print("   ours:", q["question"], "|", key)
            print("   pool:", p["stem"], "|", p["key"])
    print(f"pool items parsed: {len(pool)}; bank items: {len(rows)}; flagged: {flagged}")


main()
