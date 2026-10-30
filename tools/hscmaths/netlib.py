"""Small network solvers so every networks answer is computed, not typed."""
import collections, heapq


def cpa(acts):
    """acts: {name: (duration, [prereqs])}. Returns est, lst, float, finish."""
    order, done = [], set()
    while len(order) < len(acts):
        for a, (_, pre) in acts.items():
            if a not in done and all(p in done for p in pre):
                order.append(a); done.add(a)
    est = {}
    for a in order:
        est[a] = max((est[p] + acts[p][0] for p in acts[a][1]), default=0)
    finish = max(est[a] + acts[a][0] for a in acts)
    succ = collections.defaultdict(list)
    for a, (_, pre) in acts.items():
        for p in pre:
            succ[p].append(a)
    lst = {}
    for a in reversed(order):
        lft = min((lst[s] for s in succ[a]), default=finish)
        lst[a] = lft - acts[a][0]
    flt = {a: lst[a] - est[a] for a in acts}
    return est, lst, flt, finish


def critical(acts):
    _, _, flt, _ = cpa(acts)
    return [a for a in acts if flt[a] == 0]


def act_table(acts, unit="days"):
    rows = [f"| Activity | Duration ({unit}) | Immediate prerequisites |", "|---|---|---|"]
    for a, (d, pre) in acts.items():
        rows.append(f"| {a} | {d} | {', '.join(pre) if pre else 'none'} |")
    return "\n".join(rows)


def maxflow(edges, s, t):
    cap = collections.defaultdict(int)
    adj = collections.defaultdict(set)
    for u, v, c in edges:
        cap[(u, v)] += c
        adj[u].add(v); adj[v].add(u)
    flow = 0
    while True:
        par = {s: None}
        q = collections.deque([s])
        while q and t not in par:
            u = q.popleft()
            for v in adj[u]:
                if v not in par and cap[(u, v)] > 0:
                    par[v] = u; q.append(v)
        if t not in par:
            return flow
        v, aug = t, float("inf")
        while par[v] is not None:
            aug = min(aug, cap[(par[v], v)]); v = par[v]
        v = t
        while par[v] is not None:
            cap[(par[v], v)] -= aug; cap[(v, par[v])] += aug; v = par[v]
        flow += aug


def cut_capacity(edges, source_side):
    return sum(c for u, v, c in edges if u in source_side and v not in source_side)


def flow_table(edges, unit="litres per minute"):
    rows = [f"| From | To | Capacity ({unit}) |", "|---|---|---|"]
    rows += [f"| {u} | {v} | {c} |" for u, v, c in edges]
    return "\n".join(rows)


def mst(edges):
    parent = {}
    def find(x):
        parent.setdefault(x, x)
        while parent[x] != x:
            x = parent[x]
        return x
    total, used = 0, []
    for u, v, w in sorted(edges, key=lambda e: e[2]):
        a, b = find(u), find(v)
        if a != b:
            parent[a] = b; total += w; used.append((u, v, w))
    return total, used


def shortest(edges, s, t):
    adj = collections.defaultdict(list)
    for u, v, w in edges:
        adj[u].append((v, w)); adj[v].append((u, w))
    dist, h = {s: 0}, [(0, s)]
    while h:
        d, u = heapq.heappop(h)
        if d > dist.get(u, 1e9):
            continue
        for v, w in adj[u]:
            if d + w < dist.get(v, 1e9):
                dist[v] = d + w; heapq.heappush(h, (d + w, v))
    return dist[t]


def edge_table(edges, unit="km"):
    rows = [f"| Edge | Weight ({unit}) |", "|---|---|"]
    rows += [f"| {u}{v} | {w} |" for u, v, w in edges]
    return "\n".join(rows)
