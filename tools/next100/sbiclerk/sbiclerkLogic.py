# Reasoning Ability: inequalities and syllogisms. Conclusion options keep
# their fixed order (CONC, lockedOrder): 0 Only I, 1 Only II, 2 Either,
# 3 Neither, 4 Both.
INEQ = "A statement is followed by two conclusions, I and II. Assume the statement is true and decide which conclusion(s) definitely follow.\n\n"
SYL = "Some statements are followed by two conclusions, I and II. Take the statements to be true even if they seem to differ from commonly known facts, and decide which conclusion(s) logically follow.\n\n"


def ineq(t, d, statement, c1, c2, key, expl):
    return L(t, d, "Inequality", INEQ + f"Statement: {statement}\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


def syl(t, d, statements, c1, c2, key, expl):
    return L(t, d, "Syllogism", SYL + "Statements: " + " ".join(statements) + f"\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


ITEMS = [
    # ---------- Mock Test 1 ----------
    ineq(1, 1, "M ≥ N > O = P < Q", "M > P", "Q > O", 4,
         "I: M ≥ N > O = P gives M > P, true. II: Q > P = O gives Q > O, true. Both follow."),
    ineq(1, 1, "F > G ≥ H < J = K", "F > H", "G < K", 0,
         "I: F > G ≥ H gives F > H, true. II: G ≥ H and H < J point in opposite directions, so G and K cannot be compared. Only I follows."),
    ineq(1, 2, "G ≤ H < I ≥ J > K", "H > K", "I > K", 1,
         "I: H < I and I ≥ J point in opposite directions, so H and K cannot be compared. II: I ≥ J > K gives I > K, true. Only II follows."),
    ineq(1, 2, "J ≤ K = L ≤ M > N", "M > J", "M = J", 2,
         "J ≤ K = L ≤ M gives M ≥ J. Neither 'M > J' nor 'M = J' is certain alone, but one of them must be true. Either I or II follows."),
    syl(1, 2, ["All kites are toys.", "Some gifts are kites."], "All toys are gifts.", "Some toys are gifts.", 1,
        "Nothing says every toy is a gift, so I is not certain. The gifts that are kites are also toys, so some toys are gifts (II). Only II follows."),
    syl(1, 2, ["All shops are stalls.", "Some shops are kiosks."], "Some stalls are kiosks.", "All kiosks are stalls.", 0,
        "The shops that are kiosks are also stalls, so some stalls are kiosks (I). The kiosks that are not shops may or may not be stalls, so II is not certain. Only I follows."),
    syl(1, 3, ["No pot is a pan.", "Some pans are jugs."], "Some jugs are pots.", "No jug is a pot.", 2,
        "Jugs that are not pans may or may not be pots, so neither conclusion is certain alone. But they cover every case between them (either some jugs are pots or none is), so either I or II follows."),
    syl(1, 1, ["No sock is a shoe.", "All boots are shoes."], "No boot is a sock.", "Some shoes are not socks.", 4,
        "Every boot is a shoe and no shoe is a sock, so no boot is a sock (I). The shoes that are boots are not socks, so some shoes are not socks (II). Both follow."),

    # ---------- Mock Test 2 ----------
    ineq(2, 1, "P > Q ≥ R > S", "P > S", "R ≥ P", 0,
         "I: P > Q ≥ R > S gives P > S, true. II: P > Q ≥ R gives P > R, so 'R ≥ P' is false. Only I follows."),
    ineq(2, 2, "K ≤ L = M < N ≥ O", "M > O", "N > K", 1,
         "I: M < N and N ≥ O point in opposite directions, so M and O cannot be compared. II: K ≤ L = M < N gives N > K, true. Only II follows."),
    ineq(2, 2, "W = X ≥ Y ≤ Z", "W > Z", "Z > X", 3,
         "X ≥ Y and Y ≤ Z point in opposite directions, so neither W nor X can be compared with Z. Neither follows."),
    ineq(2, 2, "C > D ≥ E ≥ F < G", "D > F", "D = F", 2,
         "D ≥ E ≥ F gives D ≥ F. Neither 'D > F' nor 'D = F' is certain alone, but one must be true. Either I or II follows."),
    syl(2, 1, ["Some doctors are teachers.", "All teachers are singers."], "Some doctors are singers.", "All singers are doctors.", 0,
        "The doctors who are teachers are also singers, so some doctors are singers (I). Nothing says every singer is a doctor. Only I follows."),
    syl(2, 2, ["All coats are jackets.", "Some coats are scarves."], "Some jackets are scarves.", "Some scarves are coats.", 4,
        "The coats that are scarves are also jackets, so some jackets are scarves (I). 'Some coats are scarves' is the same as 'some scarves are coats' (II). Both follow."),
    syl(2, 2, ["Some forks are spoons.", "No spoon is a knife."], "Some forks are knives.", "No fork is a knife.", 2,
        "Forks that are not spoons may or may not be knives, so neither conclusion is certain alone. But the two conclusions cover every case, so either I or II follows."),
    syl(2, 3, ["No chair is a bed.", "Some beds are sofas."], "Some sofas are chairs.", "No sofa is a bed.", 3,
        "Whether any sofa is a chair is not settled, so I is only a possibility. II contradicts 'some beds are sofas'. Neither follows."),

    # ---------- Drill only ----------
    ineq(0, 1, "R > S ≥ T = U", "R > U", "U ≤ S", 4,
         "I: R > S ≥ T = U gives R > U, true. II: S ≥ T = U gives S ≥ U, which is the same as U ≤ S. Both follow."),
    syl(0, 2, ["No fan is a cooler.", "Some heaters are coolers."], "Some heaters are not fans.", "Some fans are heaters.", 0,
        "The heaters that are coolers cannot be fans, so some heaters are not fans (I). Whether any fan is a heater is not settled. Only I follows."),
    syl(0, 2, ["Some rods are poles.", "All poles are beams."], "All rods are beams.", "No beam is a rod.", 3,
        "Only the rods that are poles are known to be beams, so I is not certain. Those rods are beams, so II is false. Neither follows."),
]
