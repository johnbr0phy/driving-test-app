# Reasoning Ability: inequalities and syllogisms (fixed option order, lockedOrder).
INEQ = "A statement is followed by two conclusions, I and II. Assume the statement is true and decide which conclusion(s) definitely follow.\n\n"
SYL = "Some statements are followed by two conclusions, I and II. Take the statements to be true even if they seem to differ from commonly known facts, and decide which conclusion(s) logically follow.\n\n"


def ineq(t, d, statement, c1, c2, key, expl):
    return L(t, d, "Inequality", INEQ + f"Statement: {statement}\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


def syl(t, d, statements, c1, c2, key, expl):
    return L(t, d, "Syllogism", SYL + "Statements: " + " ".join(statements) + f"\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


ITEMS = [
    # ---------- Mock Test 1 ----------
    ineq(1, 1, "B ≤ C < D = E ≥ F", "B < E", "F ≤ D", 4,
         "I: B ≤ C < D = E gives B < E, true. II: D = E ≥ F gives D ≥ F, which is the same as F ≤ D, true. Both follow."),
    ineq(1, 2, "G > H ≥ I ≤ J < K", "G > I", "K > H", 0,
         "I: G > H ≥ I gives G > I, true. II: H ≥ I and I ≤ J point in opposite directions, so H and K cannot be compared. Only I follows."),
    ineq(1, 3, "P ≥ Q = R ≤ S", "P > R", "P = R", 2,
         "P ≥ Q = R, so P ≥ R. Neither 'P > R' nor 'P = R' is certain on its own, but one of them must be true. Either I or II follows."),
    syl(1, 1, ["All pens are clips.", "Some clips are pins."], "Some pens are pins.", "Some pins are clips.", 1,
        "The pins that are clips need not be the clips that are pens, so I is only a possibility. 'Some clips are pins' converts to 'Some pins are clips', so II follows. Only II follows."),
    syl(1, 2, ["No rose is a lily.", "All lilies are tulips."], "Some tulips are not roses.", "All roses are tulips.", 0,
        "The tulips that are lilies cannot be roses, so some tulips are not roses (I). Nothing says roses are tulips, so II does not follow. Only I follows."),
    syl(1, 2, ["Some tickets are coupons.", "No coupon is a receipt."], "Some tickets are not receipts.", "No ticket is a receipt.", 0,
        "The tickets that are coupons cannot be receipts, so some tickets are not receipts (I). Other tickets may still be receipts, so II is not certain. Only I follows."),

    # ---------- Mock Test 2 ----------
    ineq(2, 1, "U < V ≤ W = X > Y", "U < X", "W > Y", 4,
         "I: U < V ≤ W = X gives U < X, true. II: W = X > Y gives W > Y, true. Both follow."),
    ineq(2, 2, "M ≥ N > O ≤ P = Q", "M > O", "Q ≥ N", 0,
         "I: M ≥ N > O gives M > O, true. II: N > O and O ≤ P point in opposite directions, so N and Q cannot be compared. Only I follows."),
    ineq(2, 3, "A = B ≥ C > D ≤ E", "A > E", "D < B", 1,
         "I: C > D and D ≤ E point in opposite directions, so A and E cannot be compared. II: B ≥ C > D gives B > D, true. Only II follows."),
    syl(2, 1, ["All trains are buses.", "All buses are trucks."], "All trains are trucks.", "Some trucks are trains.", 4,
        "Every train is a bus and every bus a truck, so all trains are trucks (I), and so some trucks are trains (II). Both follow."),
    syl(2, 2, ["Some lamps are bulbs.", "Some bulbs are switches."], "Some lamps are switches.", "No lamp is a switch.", 2,
        "Two 'some' statements give no definite link between lamps and switches. Yet either some lamps are switches or none is, so the pair is complementary. Either I or II follows."),
    syl(2, 2, ["No wall is a door.", "Some doors are windows."], "Some windows are walls.", "All windows are doors.", 3,
        "Windows and walls are not linked definitely, so I is only a possibility. 'Some doors are windows' does not mean every window is a door. Neither follows."),

    # ---------- Drill only ----------
    ineq(0, 2, "H < I = J ≥ K > L", "H < J", "L < I", 4,
         "I: H < I = J gives H < J, true. II: I = J ≥ K > L gives I > L, true. Both follow."),
    ineq(0, 3, "C ≤ D < E ≥ F = G", "C < F", "G ≤ E", 1,
         "I: D < E and E ≥ F point in opposite directions, so C and F cannot be compared. II: E ≥ F = G gives G ≤ E, true. Only II follows."),
    syl(0, 2, ["All apples are fruits.", "No fruit is a stone."], "No apple is a stone.", "Some stones are apples.", 0,
        "Every apple is a fruit and no fruit is a stone, so no apple is a stone (I). That makes II false. Only I follows."),
]
