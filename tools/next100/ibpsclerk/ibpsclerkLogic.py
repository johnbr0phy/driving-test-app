# Reasoning Ability: inequalities and syllogisms.
INEQ = "A statement is followed by two conclusions, I and II. Assume the statement is true and decide which conclusion(s) definitely follow.\n\n"
SYL = "Some statements are followed by two conclusions, I and II. Take the statements to be true even if they seem to differ from commonly known facts, and decide which conclusion(s) logically follow.\n\n"


def ineq(t, d, statement, c1, c2, key, expl):
    return L(t, d, "Inequality", INEQ + f"Statement: {statement}\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


def syl(t, d, statements, c1, c2, key, expl):
    return L(t, d, "Syllogism", SYL + "Statements: " + " ".join(statements) + f"\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


ITEMS = [
    # ---------- Mock Test 1 ----------
    ineq(1, 1, "P ≥ Q > R = S ≤ T", "P > S", "T > R", 0,
         "I: P ≥ Q > R = S gives P > S, true. II: T ≥ S = R gives T ≥ R, so T could equal R; 'T > R' is not certain. Only I follows."),
    ineq(1, 2, "D < E ≤ F > G ≥ H", "E > G", "F > H", 1,
         "I: E ≤ F and F > G point in opposite directions, so E and G cannot be compared. II: F > G ≥ H gives F > H, true. Only II follows."),
    ineq(1, 2, "J = K ≥ L < M ≤ N", "J > L", "J = L", 2,
         "J = K ≥ L, so J ≥ L. Neither 'J > L' nor 'J = L' is certain alone, but one of them must be true. Either I or II follows."),
    ineq(1, 3, "W > X ≥ Y = Z < V", "W > V", "X > Z", 3,
         "I: W > ... = Z < V points in opposite directions, so W and V cannot be compared. II: X ≥ Y = Z gives X ≥ Z, so X could equal Z. Neither follows."),
    syl(1, 1, ["Some chairs are tables.", "All tables are desks."], "Some chairs are desks.", "Some desks are tables.", 4,
        "The chairs that are tables are also desks, so some chairs are desks (I). Every table is a desk, so some desks are tables (II). Both follow."),
    syl(1, 2, ["No cup is a plate.", "All plates are bowls."], "No bowl is a cup.", "Some bowls are not cups.", 1,
        "The bowls that are plates cannot be cups, so some bowls are not cups (II). Other bowls may or may not be cups, so 'no bowl is a cup' is not certain. Only II follows."),
    syl(1, 2, ["Some birds are kites.", "Some kites are planes."], "Some birds are planes.", "All planes are kites.", 3,
        "Two 'some' statements give no definite link between birds and planes, so I does not follow. 'Some kites are planes' does not mean all planes are kites. Neither follows."),
    syl(1, 2, ["No mango is an apple.", "Some apples are grapes."], "Some grapes are not mangoes.", "Some mangoes are grapes.", 0,
        "The grapes that are apples cannot be mangoes, so some grapes are not mangoes (I). Whether any mango is a grape is not settled, so II is only a possibility. Only I follows."),

    # ---------- Mock Test 2 ----------
    ineq(2, 1, "A > B ≥ C = D < E", "A > D", "E > C", 4,
         "I: A > B ≥ C = D gives A > D, true. II: E > D = C gives E > C, true. Both follow."),
    ineq(2, 1, "L ≤ M < N > O ≥ P", "L < N", "M > P", 0,
         "I: L ≤ M < N gives L < N, true. II: M < N and N > O point in opposite directions, so M and P cannot be compared. Only I follows."),
    ineq(2, 2, "R ≥ S = T > U ≤ V", "T ≥ V", "R > U", 1,
         "I: T > U and U ≤ V point in opposite directions, so T and V cannot be compared. II: R ≥ S = T > U gives R > U, true. Only II follows."),
    ineq(2, 2, "F < G = H ≤ I > J", "I > G", "I = G", 2,
         "G = H ≤ I, so I ≥ G. Neither 'I > G' nor 'I = G' is certain alone, but one of them must be true. Either I or II follows."),
    syl(2, 1, ["All coins are metals.", "Some metals are heavy."], "Some coins are heavy.", "Some heavy things are metals.", 1,
        "The heavy metals need not be coins, so I is not certain. 'Some metals are heavy' means the same as 'some heavy things are metals', so II follows. Only II follows."),
    syl(2, 2, ["No lamp is a fan.", "No fan is a bulb."], "No lamp is a bulb.", "All bulbs are lamps.", 3,
        "Two negative statements give no conclusion about lamps and bulbs: they may or may not overlap, so 'no lamp is a bulb' is not certain, and nothing says every bulb is a lamp. Neither follows. (Had II been 'Some bulbs are lamps', the pair would be either-or.)"),
    syl(2, 1, ["All windows are doors.", "All doors are walls."], "All windows are walls.", "All walls are windows.", 0,
        "Every window is a door and every door is a wall, so all windows are walls (I). The walls need not all be windows, so II does not follow. Only I follows."),
    syl(2, 3, ["Some pens are inks.", "Some inks are papers."], "Some pens are papers.", "No pen is a paper.", 2,
        "Neither conclusion is certain on its own, but they are about the same two terms and one must be true: either some pens are papers or none is. Either I or II follows."),

    # ---------- Drill only ----------
    ineq(0, 1, "B ≥ C > D = E ≤ F", "B > E", "F > C", 0,
         "I: B ≥ C > D = E gives B > E, true. II: C > D and E ≤ F point in opposite directions, so F and C cannot be compared. Only I follows."),
    syl(0, 1, ["All stars are planets.", "All planets are moons."], "All moons are stars.", "Some moons are stars.", 1,
        "Every star is a planet and so a moon, which means some moons are stars (II). The moons need not all be stars, so I does not follow. Only II follows."),
    ineq(0, 2, "H > I = J ≥ K < L", "H > K", "I ≥ K", 4,
         "I: H > I = J ≥ K gives H > K, true. II: I = J ≥ K gives I ≥ K, true. Both follow."),
]
