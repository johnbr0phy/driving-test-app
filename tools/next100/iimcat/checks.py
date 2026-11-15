# Brute-force checks of every DILR set: each logic set must have exactly one
# solution, and every computed answer used in catDI.py / catLR.py is asserted here.
from itertools import permutations, product
from fractions import Fraction as Fr

# ---------- T1 DI1: quarterly sales ----------
SALES = {"Alpha": (48, 52, 60, 64), "Beta": (36, 45, 42, 51), "Gamma": (30, 33, 48, 39), "Delta": (46, 50, 50, 56)}
QT = [sum(v[i] for v in SALES.values()) for i in range(4)]
assert QT == [160, 180, 200, 210]
assert sum(SALES["Gamma"]) == 150
growth = [Fr(QT[i] - QT[i - 1], QT[i - 1]) for i in (1, 2, 3)]
assert max(range(3), key=lambda i: growth[i]) == 0 and growth[0] == Fr(1, 8)
assert Fr(48, 200) == Fr(24, 100)
rise = {k: Fr(v[3], v[0]) for k, v in SALES.items()}
assert max(rise, key=rise.get) == "Beta"

# ---------- T1 DI2: app survey ----------
M, C, V, MC, MV, CV, ALL, TOT = 160, 140, 100, 70, 50, 40, 20, 300
mc, mv, cv = MC - ALL, MV - ALL, CV - ALL
om, oc, ov = M - mc - mv - ALL, C - mc - cv - ALL, V - mv - cv - ALL
assert (mc, mv, cv, om, oc, ov) == (50, 30, 20, 60, 50, 30)
anyapp = om + oc + ov + mc + mv + cv + ALL
assert anyapp == 260 and TOT - anyapp == 40
assert om + oc + ov == 140 and mc + mv + cv == 100 and oc + cv == 70

# ---------- T1 LR1: round table ----------
N6 = ["Arjun", "Bela", "Chirag", "Divya", "Esha", "Farhan"]
sol = []
for p in permutations(range(6)):
    d = dict(zip(N6, p))
    if d["Arjun"] != 0:
        continue
    adj = lambda a, b: (d[a] - d[b]) % 6 in (1, 5)
    if (d["Bela"] - d["Arjun"]) % 6 != 3 or d["Chirag"] != 1:
        continue
    if adj("Divya", "Chirag") or not adj("Esha", "Bela") or adj("Farhan", "Arjun") or adj("Esha", "Divya"):
        continue
    sol.append(d)
assert len(sol) == 1
S1 = sol[0]
seat = {v: k for k, v in S1.items()}
assert seat[(S1["Chirag"] + 3) % 6] == "Farhan"            # opposite Chirag
assert {seat[(S1["Divya"] + 1) % 6], seat[(S1["Divya"] - 1) % 6]} == {"Arjun", "Farhan"}
assert (S1["Esha"] - S1["Arjun"]) % 6 - 1 == 1              # one person between, clockwise from Arjun to Esha
assert S1["Bela"] == 3 and {S1["Esha"], S1["Farhan"]} == {2, 4}  # Bela sits between Esha and Farhan

# ---------- T1 LR2: training week ----------
TK = ["Finance", "HR", "Marketing", "Operations", "Strategy"]
sol = []
for p in permutations(range(5)):
    d = dict(zip(TK, p))
    if d["Finance"] + 1 != d["Strategy"] or not d["HR"] > d["Marketing"] or not d["Operations"] < d["Finance"]:
        continue
    if d["Marketing"] in (0, 2) or d["Strategy"] in (3, 4):
        continue
    sol.append(d)
assert len(sol) == 1
W = sol[0]
assert W == {"Operations": 0, "Finance": 1, "Strategy": 2, "Marketing": 3, "HR": 4}
assert W["HR"] - W["Operations"] - 1 == 3

# ---------- T1 LR3: league ----------
TEAMS = ["K", "L", "M", "O"]
PAIRS = [(a, b) for i, a in enumerate(TEAMS) for b in TEAMS[i + 1:]]
sols = []
for res in product("WDL", repeat=6):          # result for the first team of each pair
    pts = dict.fromkeys(TEAMS, 0)
    lost = dict.fromkeys(TEAMS, 0)
    won = dict.fromkeys(TEAMS, 0)
    r = dict(zip(PAIRS, res))
    for (a, b), x in r.items():
        if x == "W":
            pts[a] += 2; lost[b] += 1; won[a] += 1
        elif x == "L":
            pts[b] += 2; lost[a] += 1; won[b] += 1
        else:
            pts[a] += 1; pts[b] += 1
    if len(set(pts.values())) != 4 or won["O"] or res.count("D") + 0 != 1:
        continue
    if any(r[(a, "O")] != "W" for a in "KLM"):
        continue
    if lost["K"] or max(pts, key=pts.get) != "K" or r[("L", "M")] != "W":
        continue
    sols.append((r, pts, won))
assert len(sols) == 1
LG, LPTS, LWON = sols[0]
assert LPTS == {"K": 5, "L": 4, "M": 3, "O": 0} and LG[("K", "M")] == "D" and LWON["L"] == 2

# ---------- T2 DI1: factory output ----------
F = {"North": (40, 45, 50, 6), "South": (32, 36, 40, 5), "East": (20, 24, 30, 10), "West": (52, 55, 60, 5)}
assert sum(Fr(v[2] * v[3], 100) for v in F.values()) == 11
gr = {k: Fr(v[2] - v[0], v[0]) for k, v in F.items()}
assert max(gr, key=gr.get) == "East" and gr["East"] == Fr(1, 2)
assert sum(F["South"][:3]) / 3 == 36
assert sum(v[2] for v in F.values()) == 180 and Fr(60, 180) == Fr(1, 3)
assert sum(v[1] for v in F.values()) == 160 and Fr(160 - 144, 144) * 100 > 11  # May vs April total

# ---------- T2 DI2: test scores ----------
SC = {"Asha": (72, 80, 64), "Bhanu": (85, 70, 76), "Charu": (60, 88, 80), "Dev": (90, 64, 86), "Ela": (68, 78, 82)}
tot = {k: sum(v) for k, v in SC.items()}
assert max(tot, key=tot.get) == "Dev" and tot["Dev"] == 240
assert sum(v[0] for v in SC.values()) == 375
assert sum(1 for v in SC.values() if v[2] * 3 > sum(v)) == 3
assert sum(1 for t in tot.values() if t >= 228) == 4

# ---------- T2 LR1: apartment block ----------
P6 = ["Gita", "Harsh", "Isha", "Jai", "Kavya", "Lal"]
sol = []
for p in permutations(range(1, 7)):
    d = dict(zip(P6, p))
    if d["Lal"] % 2 == 0 or d["Gita"] != d["Lal"] + 1 or d["Kavya"] != d["Gita"] + 1:
        continue
    if not d["Harsh"] > d["Kavya"] or d["Isha"] % 2 or not d["Isha"] < d["Lal"]:
        continue
    sol.append(d)
assert len(sol) == 1
FL = sol[0]
assert FL == {"Jai": 1, "Isha": 2, "Lal": 3, "Gita": 4, "Kavya": 5, "Harsh": 6}

# ---------- T2 LR2: four friends ----------
NM = ["Mohan", "Nisha", "Omkar", "Pallavi"]
sol = []
for c in permutations(["Agra", "Kochi", "Pune", "Surat"]):
    for j in permutations(["chef", "doctor", "lawyer", "pilot"]):
        Cd, Jd = dict(zip(NM, c)), dict(zip(NM, j))
        byj = {v: k for k, v in Jd.items()}
        byc = {v: k for k, v in Cd.items()}
        if Cd[byj["doctor"]] != "Surat" or Jd[byc["Pune"]] != "lawyer" or Cd[byj["pilot"]] != "Agra":
            continue
        if Jd["Nisha"] in ("doctor", "lawyer") or Cd["Nisha"] == "Kochi":
            continue
        if Cd["Mohan"] in ("Pune", "Agra") or Jd["Mohan"] == "doctor":
            continue
        if Jd["Pallavi"] == "doctor" or Jd["Omkar"] == "chef":
            continue
        sol.append((Cd, Jd))
assert len(sol) == 1
FC, FJ = sol[0]
assert FC == {"Mohan": "Kochi", "Nisha": "Agra", "Omkar": "Surat", "Pallavi": "Pune"}
assert FJ == {"Mohan": "chef", "Nisha": "pilot", "Omkar": "doctor", "Pallavi": "lawyer"}

# ---------- T2 LR3: three rounds of giving ----------
def play(k, l, m):
    h = {"K": k, "L": l, "M": m}
    states = []
    for giver in "KLM":
        for o in "KLM":
            if o != giver:
                h[giver] -= h[o]
                h[o] *= 2
        states.append(dict(h))
    return states
st = play(78, 42, 24)
assert st[2] == {"K": 48, "L": 48, "M": 48}
assert st[0] == {"K": 12, "L": 84, "M": 48} and st[1] == {"K": 24, "L": 24, "M": 96}
# uniqueness: the end state fixes the start (the steps are invertible)
assert [s for s in ((k, l, 144 - k - l) for k in range(145) for l in range(145 - k)) if play(*s)[2] == {"K": 48, "L": 48, "M": 48}] == [(78, 42, 24)]

# ---------- Drill DI1: exports ----------
EX = {"Tea": (120, 132, 150, 165), "Coffee": (80, 88, 96, 120), "Spices": (100, 90, 108, 135)}
YT = [sum(v[i] for v in EX.values()) for i in range(4)]
assert YT == [300, 310, 354, 420]
assert Fr(120 - 80, 80) == Fr(1, 2) and YT[3] - YT[0] == 120
assert max(range(1, 4), key=lambda i: YT[i] - YT[i - 1]) == 3
assert Fr(96, 150) == Fr(16, 25)

# ---------- Drill DI2: hotel ----------
H = {"Standard": (80, 75, 3000), "Deluxe": (50, 80, 4500), "Suite": (20, 60, 9000), "Family": (30, 90, 5000)}
occ = {k: v[0] * v[1] // 100 for k, v in H.items()}
assert occ == {"Standard": 60, "Deluxe": 40, "Suite": 12, "Family": 27}
assert sum(occ.values()) == 139 and 180 - 139 == 41
rev = {k: occ[k] * H[k][2] for k in H}
assert rev["Standard"] == rev["Deluxe"] == 180000 and rev["Suite"] == 108000 and rev["Family"] == 135000

# ---------- Drill LR1: boxes ----------
BX = ["red", "blue", "green", "yellow", "white"]
sol = []
for p in permutations(range(1, 6)):
    d = dict(zip(BX, p))
    if d["blue"] != d["red"] + 1 or not d["yellow"] > d["blue"] or d["white"] != d["green"] + 1 or not d["green"] < d["red"]:
        continue
    sol.append(d)
assert sol == [{"green": 1, "white": 2, "red": 3, "blue": 4, "yellow": 5}]
