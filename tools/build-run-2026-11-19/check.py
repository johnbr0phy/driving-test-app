"""Lint one source file while writing. Usage: python3 -I check.py <exam dir> <module> <pool>
e.g. python3 -I check.py ita2 lessico 32"""
import importlib.util, os, re, statistics, sys
from collections import Counter
d, m, n = sys.argv[1], sys.argv[2], int(sys.argv[3])
HERE = os.path.dirname(os.path.abspath(__file__))
p = os.path.join(HERE, d, "q_" + m + ".py")
spec = importlib.util.spec_from_file_location(m, p); mod = importlib.util.module_from_spec(spec); spec.loader.exec_module(mod)
bad = ["—", "–", '"', "Tutte le precedenti", "Nessuna delle precedenti", "A e B", "tutte le risposte"]
errs = []
if len(mod.Q) != n: errs.append(f"count {len(mod.Q)} != {n}")
far = longest = 0; lens = []; sets = Counter(); keys = Counter(); stems = Counter(); echo = 0
STOP = set("il lo la i gli le un uno una di a da in con su per tra fra e o che non si è ha sono del della dei degli delle al alla ai agli alle nel nella nei nelle sul sulla questo questa quale quali come cosa chi dove quando perché più ci ne mi ti lei lui loro mio suo".split())
def words(s): return {w for w in re.findall(r"[a-zàèéìòù']+", s.lower()) if len(w) > 3 and w not in STOP}
for i, it in enumerate(mod.Q):
    if len(it) != 4: errs.append(f"{i+1}: tuple len {len(it)}"); continue
    q, key, wrong, ex = it
    if len(wrong) != 3 or key in wrong or len(set(wrong)) != 3: errs.append(f"{i+1}: options dup/count")
    for b in bad:
        if b in q + key + "".join(wrong) + ex: errs.append(f"{i+1}: banned {b!r}")
    if not q.rstrip().endswith(("?", ":")): errs.append(f"{i+1}: stem must end ? or :")
    if re.search(r"\b(prima|seconda|terza|quarta|ultima) (opzione|risposta|scelta)\b|\brisposta [ABCD]\b", ex + q, re.I): errs.append(f"{i+1}: positional reference")
    L = [len(key)] + [len(w) for w in wrong]; lens += L
    if len(key) > 1.2 * statistics.mean(L[1:]): far += 1
    if len(key) == max(L) and L.count(len(key)) == 1: longest += 1
    sets[frozenset([key] + list(wrong))] += 1; keys[key.lower()] += 1; stems[q.strip().lower()] += 1
    stem_tail = q[q.rfind("»") + 1:] if "»" in q else q
    kw = words(key) & words(stem_tail)
    if kw and not any(words(w) & words(stem_tail) for w in wrong): echo += 1
N = max(1, len(mod.Q))
for s, c in sets.items():
    if c > 1: errs.append(f"option set reused {c}x: {sorted(s)}")
for k, c in keys.items():
    if c > 1: errs.append(f"key reused {c}x: {k}")
for s, c in stems.items():
    if c > 1: errs.append(f"stem repeated: {s[:60]}")
letters = Counter("ABCD"[i % 4] for i in range(N))
print(f"{m}: n={len(mod.Q)} avgOpt={statistics.mean(lens) if lens else 0:.1f} keyLongest={longest/N:.0%} (<=25%) keyFar={far/N:.0%} (<=30%) keyEchoesStem={echo} (keep near 0)")
for e in errs: print("ERR", e)
print("OK" if not errs and longest / N <= .25 and far / N <= .30 else "FIX")
