"""Network flow and Critical path analysis (Year 12 Standard 2), with spanning
trees and shortest paths from Year 11 (assumed knowledge). Networks are given
as tables because the bank has no figures; every answer is computed by netlib."""
from common import S, N
from netlib import cpa, critical, act_table, maxflow, cut_capacity, flow_table, mst, shortest, edge_table

DOMAIN = "hscmathsNetworks"

# ---- Project A (Practice Test 1)
PA = {"A": (4, []), "B": (6, []), "C": (3, ["A"]), "D": (5, ["A"]), "E": (7, ["B", "C"]), "F": (4, ["D"]), "G": (2, ["E", "F"])}
estA, lstA, fltA, finA = cpa(PA)
assert critical(PA) == ["A", "C", "E", "G"] and finA == 16
PA2 = dict(PA, B=(9, []))
finA2 = cpa(PA2)[3]
TA = "A building project has these activities.\n\n" + act_table(PA)

# ---- Flow network B (Practice Test 1)
FB = [("S", "A", 7), ("S", "B", 9), ("A", "B", 3), ("A", "C", 4), ("B", "C", 5), ("B", "T", 6), ("C", "T", 9)]
mfB = maxflow(FB, "S", "T")
assert mfB == 15 == cut_capacity(FB, {"S", "A", "B"})

# ---- Project D (Practice Test 2)
PD = {"P": (5, []), "Q": (3, []), "R": (6, ["P"]), "S": (4, ["P", "Q"]), "T": (8, ["R"]), "U": (5, ["S"]), "V": (3, ["T", "U"])}
estD, lstD, fltD, finD = cpa(PD)
TD = "A school fete is planned with these activities.\n\n" + act_table(PD)

# ---- Flow network E (Practice Test 2)
FE = [("S", "P", 10), ("S", "Q", 6), ("P", "Q", 4), ("P", "R", 5), ("Q", "R", 3), ("Q", "T", 7), ("R", "T", 9)]
mfE = maxflow(FE, "S", "T")
mfE2 = maxflow([(u, v, c + 2 if (u, v) == ("P", "R") else c) for u, v, c in FE], "S", "T")
assert (mfE, mfE2) == (15, 16)

# ---- Spanning tree C (Practice Test 2)
MC = [("A", "B", 7), ("A", "C", 5), ("B", "C", 4), ("B", "D", 8), ("C", "D", 6), ("C", "E", 9), ("D", "E", 3), ("D", "F", 5), ("E", "F", 4)]
mstC = mst(MC)[0]

# ---- Drill-only networks
PF = {"A": (3, []), "B": (5, []), "C": (4, ["A"]), "D": (2, ["A"]), "E": (6, ["B", "C"]), "F": (3, ["D"]), "G": (5, ["E"]), "H": (4, ["F"]), "I": (2, ["G", "H"])}
estF, lstF, fltF, finF = cpa(PF)
finF_c = cpa(dict(PF, C=(2, ["A"])))[3]
finF_d = cpa(dict(PF, D=(6, ["A"])))[3]
assert finF_d == finF
TF = "A renovation has these activities.\n\n" + act_table(PF)
PI = {"J": (2, []), "K": (4, ["J"]), "L": (3, ["J"]), "M": (5, ["K", "L"])}
finI = cpa(PI)[3]
FG = [("S", "A", 12), ("S", "B", 8), ("A", "C", 5), ("A", "D", 9), ("B", "D", 6), ("C", "T", 7), ("D", "T", 10)]
mfG = maxflow(FG, "S", "T")
cutG = cut_capacity(FG, {"S", "A"})
FJ = [("S", "X", 6), ("S", "Y", 8), ("X", "Y", 2), ("X", "Z", 5), ("Y", "Z", 4), ("Y", "T", 5), ("Z", "T", 8)]
mfJ = maxflow(FJ, "S", "T")
mfJ2 = maxflow([(u, v, c + 3 if (u, v) == ("Y", "T") else c) for u, v, c in FJ], "S", "T")
MM = [("P", "Q", 4), ("P", "R", 7), ("Q", "R", 3), ("Q", "S", 6), ("R", "S", 5), ("R", "T", 8), ("S", "T", 2), ("S", "U", 9), ("T", "U", 6)]
mstM = mst(MM)[0]
SH = [("A", "B", 5), ("A", "C", 2), ("C", "B", 2), ("B", "D", 4), ("C", "D", 7), ("C", "E", 8), ("D", "E", 3), ("D", "F", 6), ("E", "F", 2)]
spH = shortest(SH, "A", "F")

PIPES = "Water flows through a network of pipes from the source S to the sink T.\n\n"

ITEMS = [
    # ---- Practice Test 1, Section I
    S(1, 1, 2, "Minimum completion time",
      TA + "\n\nWhat is the minimum time to complete the project?",
      [f"{finA} days", f"{sum(d for d, _ in PA.values())} days", f"{finA - 2} days", f"{finA - 3} days"],
      f"The longest path through the activities sets the time: A, C, E, G takes 4 + 3 + 7 + 2 = {finA} days. Adding every duration ({sum(d for d, _ in PA.values())}) ignores that activities run at the same time."),
    S(1, 1, 1, "Maximum-flow minimum-cut theorem",
      "Which statement about a flow network is true?",
      ["The maximum flow equals the capacity of the minimum cut", "The maximum flow equals the capacity of the largest cut",
       "The maximum flow equals the total of all edge capacities", "The maximum flow equals the largest edge capacity out of the source"],
      "The maximum-flow minimum-cut theorem: the most that can flow from source to sink equals the smallest total capacity of any cut separating them."),
    # ---- Practice Test 1, Section II
    N(1, 2, 2, "Float time",
      TA + f"\n\nThe minimum completion time is {finA} days. What is the float of activity D, in days?",
      [str(fltA["D"])],
      f"D can start at day {estA['D']} (EST) but need not start until day {lstA['D']} (LST) without delaying the project, so its float is {lstA['D']} - {estA['D']} = {fltA['D']} day."),
    S(1, 2, 2, "Critical path",
      TA + "\n\nWhich is the critical path?",
      ["A, C, E, G", "B, E, G", "A, D, F, G", "B, D, F, G"],
      f"A, C, E, G takes {finA} days, the longest path, so every activity on it has zero float. B, E, G takes 15 days and A, D, F, G takes 15 days. B and D are not linked, so B, D, F, G is not a path."),
    N(1, 2, 2, "Maximum flow",
      PIPES + flow_table(FB) + "\n\nWhat is the maximum flow from S to T, in litres per minute?",
      [str(mfB)],
      f"The cut through A to C (4), B to C (5) and B to T (6) has capacity 15, and a flow of 15 is possible: 4 along S, A, C, T; 3 along S, A, B, T; 5 along S, B, C, T; 3 along S, B, T. The cut out of S has capacity 16, so it is not the minimum."),
    N(1, 2, 3, "Effect of a delay",
      TA + "\n\nActivity B is delayed and now takes 9 days. What is the new minimum completion time, in days?",
      [str(finA2)],
      f"B had a float of {fltA['B']} day, so a 3-day increase uses that float and adds 2 days: E now starts at day 9 and the project takes {finA2} days."),
    # ---- Practice Test 2, Section I
    S(2, 1, 2, "Minimum spanning tree",
      "The table gives the lengths, in metres, of possible cable runs between six buildings.\n\n" + edge_table(MC, "m") + "\n\nWhat is the length of the minimum spanning tree?",
      [f"{mstC} m", f"{mstC - 1} m", f"{mstC + 2} m", f"{mstC + 5} m"],
      f"Using Kruskal's algorithm: take DE (3), BC (4), EF (4), AC (5), skip DF (5) because it would make a cycle, then take CD (6). Total {mstC} m, with 5 edges for 6 vertices."),
    S(2, 1, 1, "Float on the critical path",
      "What is the float of an activity on the critical path?",
      ["Zero", "One day", "Equal to its duration", "Equal to the project's completion time"],
      "Critical activities have no spare time: their earliest and latest start times are equal, so any delay delays the whole project."),
    # ---- Practice Test 2, Section II
    N(2, 2, 2, "Earliest start time",
      TD + "\n\nWhat is the earliest start time (EST) of activity U, in hours?".replace("hours", "days"),
      [str(estD["U"])],
      f"U follows S, which can start once P and Q are both done, at day {estD['S']}. S takes 4 days, so U can start at day {estD['U']}."),
    N(2, 2, 3, "Latest start time",
      TD + f"\n\nThe minimum completion time is {finD} days. What is the latest start time (LST) of activity S, in days?",
      [str(lstD["S"])],
      f"Work backwards: V must start by day {lstD['V']}, so U must start by {lstD['U']}, and S, which takes 4 days, must start by {lstD['S']}."),
    N(2, 2, 2, "Maximum flow",
      PIPES + flow_table(FE) + "\n\nWhat is the maximum flow from S to T, in litres per minute?",
      [str(mfE)],
      "The cut through P to R (5), Q to R (3) and Q to T (7) has capacity 15, the smallest of any cut, and a flow of 15 can be sent: 5 along S, P, R, T; 4 along S, P, Q, then on to R or T; 6 along S, Q. So the maximum flow is 15."),
    S(2, 2, 3, "Changing a capacity",
      PIPES + flow_table(FE) + "\n\nThe pipe from P to R is replaced with one of capacity 7. What is the new maximum flow?",
      [f"{mfE2} L/min", f"{mfE2 + 1} L/min", f"{mfE2 - 1} L/min", f"{mfE2 + 3} L/min"],
      "The old minimum cut (P to R, Q to R, Q to T) rises to 17, but the cut out of S (10 + 6) and the cut into T (7 + 9) are both 16, so the flow rises by only 1, to 16."),
    # ---- Drill only
    N(0, 2, 2, "Minimum completion time",
      TF + "\n\nWhat is the minimum completion time, in days?",
      [str(finF)],
      f"The longest path is A, C, E, G, I: 3 + 4 + 6 + 5 + 2 = {finF} days."),
    N(0, 2, 2, "Earliest start time",
      TF + "\n\nWhat is the earliest start time (EST) of activity H, in days?",
      [str(estF["H"])],
      f"H follows F, which follows D, which follows A: 3 + 2 + 3 = {estF['H']}."),
    N(0, 2, 3, "Latest start time",
      TF + f"\n\nThe minimum completion time is {finF} days. What is the latest start time (LST) of activity D, in days?",
      [str(lstF["D"])],
      f"I must start by day {lstF['I']}, so H by {lstF['H']}, F by {lstF['F']}, and D (2 days) by {lstF['D']}."),
    N(0, 2, 2, "Float time",
      TF + f"\n\nThe minimum completion time is {finF} days. What is the float of activity F, in days?",
      [str(fltF["F"])],
      f"F's earliest start is day {estF['F']} and its latest start is day {lstF['F']}, so its float is {fltF['F']} days."),
    S(0, 2, 2, "Critical path",
      TF + "\n\nWhich is the critical path?",
      ["A, C, E, G, I", "B, E, G, I", "A, D, F, H, I", "A, C, E, H, I"],
      f"A, C, E, G, I takes {finF} days, the longest path. B, E, G, I takes 18 days and A, D, F, H, I takes 14. E does not lead to H, so A, C, E, H, I is not a path."),
    N(0, 2, 3, "Shortening a critical activity",
      TF + "\n\nActivity C is shortened from 4 days to 2 days. What is the new minimum completion time, in days?",
      [str(finF_c)],
      f"Saving 2 days on C would give 18 days on A, C, E, G, I, but B, E, G, I also takes 18 days, so the new time is {finF_c} days. B, E, G, I becomes critical too."),
    S(0, 2, 2, "Delay within the float",
      TF + "\n\nActivity D takes 4 days longer than planned. What happens to the minimum completion time?",
      ["It does not change", "It increases by 4 days", "It increases by 2 days", "It decreases by 4 days"],
      f"D has a float of {fltF['D']} days, so a 4-day delay is absorbed and the project still takes {finF} days."),
    N(0, 2, 1, "Minimum completion time",
      "A small project has these activities.\n\n" + act_table(PI, "hours") + "\n\nWhat is the minimum completion time, in hours?",
      [str(finI)],
      f"K and L both follow J and run at the same time; M waits for the longer of them, K. So J, K, M: 2 + 4 + 5 = {finI} hours."),
    N(0, 2, 2, "Maximum flow",
      PIPES + flow_table(FG) + "\n\nWhat is the maximum flow from S to T, in litres per minute?",
      [str(mfG)],
      f"The cut into T, C to T (7) and D to T (10), is 17, but C can only receive 5 from A, so the cut through A to C (5), D to T (10) is {mfG}. A flow of {mfG} is possible, so that is the maximum."),
    N(0, 2, 2, "Capacity of a cut",
      PIPES + flow_table(FG) + "\n\nA cut separates {S, A} from {B, C, D, T}. What is its capacity, in litres per minute?",
      [str(cutG)],
      f"Add the capacities of edges going from the S side to the T side: S to B (8), A to C (5), A to D (9). Total {cutG}."),
    S(0, 2, 2, "Counting edges in a cut",
      "When finding the capacity of a cut in a directed flow network, which edges crossing the cut are counted?",
      ["Only edges directed from the source side to the sink side", "Every edge the cut crosses",
       "Only edges directed from the sink side to the source side", "Only edges touching the source"],
      "Only flow from the source side towards the sink can pass through the cut, so edges pointing back are ignored."),
    S(0, 2, 2, "Meeting demand",
      PIPES + flow_table(FG) + "\n\nA town needs 18 litres per minute delivered to T. Can this network meet that demand?",
      [f"No, its maximum flow is only {mfG} L/min", "Yes, 20 L/min can leave the source",
       "Yes, the edges into T can carry 17 L/min", f"No, its maximum flow is only {mfG - 3} L/min"],
      f"The maximum flow equals the minimum cut, {mfG} L/min, which is below 18. Edges out of S can carry 20, but the flow is limited further on."),
    N(0, 2, 3, "Changing a capacity",
      PIPES + flow_table(FJ) + "\n\nThe pipe from Y to T is upgraded from 5 to 8 L/min. What is the new maximum flow, in litres per minute?",
      [str(mfJ2)],
      f"Before the upgrade the maximum flow was {mfJ}, the cut into T (5 + 8). After it, that cut is 16, but the cut out of S is 6 + 8 = {mfJ2}, now the smallest, so the maximum flow is {mfJ2}."),
    N(0, 2, 2, "Minimum spanning tree",
      "The table gives the cost, in thousands of dollars, of laying water pipes between six farms.\n\n" + edge_table(MM, "\\$'000") + "\n\nWhat is the total cost of the minimum spanning tree, in thousands of dollars?",
      [str(mstM)],
      f"Kruskal's algorithm: ST (2), QR (3), PQ (4), RS (5), then TU (6). QS (6) would close a cycle. Total {mstM}."),
    N(0, 2, 1, "Edges in a spanning tree",
      "A connected network has 8 vertices. How many edges does any spanning tree of it have?",
      ["7"],
      "A tree on n vertices always has n - 1 edges, so 8 - 1 = 7. One more edge would create a cycle."),
    N(0, 2, 2, "Shortest path",
      "The table gives travel times, in minutes, along roads between six places.\n\n" + edge_table(SH, "min") + "\n\nWhat is the shortest travel time from A to F, in minutes?",
      [str(spH)],
      f"A to C (2), C to E (8), E to F (2) gives {spH} minutes. A, C, B, D, E, F gives 13, and A, B, D, F gives 15."),
    S(0, 2, 1, "Immediate prerequisites",
      "Activity E has immediate prerequisites B and C. What does this mean?",
      ["E cannot start until both B and C are finished", "E can start as soon as either B or C is finished",
       "B and C cannot start until E is finished", "E, B and C must all start together"],
      "Every immediate prerequisite must be complete before an activity starts, so E waits for the later of B and C."),
    S(0, 2, 1, "Source and sink",
      "In a flow network, what is the sink?",
      ["The vertex where all flow ends", "The vertex where all flow starts",
       "The edge with the smallest capacity", "The edge with the largest capacity"],
      "Flow starts at the source and ends at the sink. Edges, not vertices, have capacities."),
    N(0, 2, 2, "Earliest start time",
      TF + "\n\nWhat is the earliest start time (EST) of activity E, in days?",
      [str(estF["E"])],
      f"E needs both B (finished at day 5) and C (finished at day 3 + 4 = 7). It waits for the later one, so its EST is day {estF['E']}."),
    S(0, 2, 1, "Flow through a vertex",
      "In a flow network, how does the flow into a vertex (other than the source or sink) compare with the flow out of it?",
      ["They are equal", "The flow in is greater", "The flow out is greater", "It depends on the capacities"],
      "Nothing is stored or created at a vertex, so whatever flows in must flow out. Capacities limit how much flows, not this balance."),
]
