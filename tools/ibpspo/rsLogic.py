# Reasoning Ability: inequalities and syllogisms.
INEQ = "A statement is followed by two conclusions, I and II. Assume the statement is true and decide which conclusion(s) definitely follow.\n\n"
SYL = "Some statements are followed by two conclusions, I and II. Take the statements to be true even if they seem to differ from commonly known facts, and decide which conclusion(s) logically follow.\n\n"


def ineq(t, d, statement, c1, c2, key, expl):
    return L(t, d, "Inequality", INEQ + f"Statement: {statement}\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


def syl(t, d, statements, c1, c2, key, expl):
    return L(t, d, "Syllogism", SYL + "Statements: " + " ".join(statements) + f"\n\nI. {c1}\n\nII. {c2}", CONC, key, expl)


ITEMS = [
    # ---------- Practice Test 1 ----------
    ineq(1, 1, "M > N ≥ O = P < Q ≤ R", "M > P", "R > O", 4,
         "I: M > N ≥ O = P gives M > P, true. II: R ≥ Q > P = O gives R > O, true. Both follow."),
    ineq(1, 2, "A ≥ B > C ≤ D < E", "A > C", "B > D", 0,
         "I: A ≥ B > C gives A > C, true. II: B > C and C ≤ D point in opposite directions, so B and D cannot be compared. Only I follows."),
    ineq(1, 2, "K < L ≤ M = N ≥ O > P", "M > O", "M = O", 2,
         "M = N ≥ O, so M ≥ O. Neither M > O nor M = O is certain on its own, but one of them must be true, and together they cover every case. Either I or II follows."),
    ineq(1, 2, "S ≤ T < U ≥ V = W > X", "T < V", "X < U", 1,
         "I: T < U and U ≥ V point in opposite directions, so T and V cannot be compared. II: X < W = V ≤ U gives X < U, true. Only II follows."),
    syl(1, 1, ["All banks are offices.", "Some offices are branches."], "Some banks are branches.", "All offices are banks.", 3,
        "The branches that are offices need not be banks, so I is not certain. 'All banks are offices' does not mean all offices are banks, so II does not follow. Neither follows."),
    syl(1, 1, ["All pens are pencils.", "All pencils are erasers."], "All pens are erasers.", "Some erasers are pens.", 4,
        "All pens are pencils and all pencils are erasers, so all pens are erasers (I). Since every pen is an eraser, some erasers are pens (II). Both follow."),
    syl(1, 2, ["Some cards are coins.", "No coin is a note."], "Some cards are not notes.", "Some notes are cards.", 0,
        "The cards that are coins cannot be notes, so some cards are not notes (I). Nothing links notes to the other cards, so II is only a possibility. Only I follows."),
    syl(1, 3, ["All files are folders.", "Some folders are boxes."], "Some files are boxes.", "No file is a box.", 2,
        "Neither conclusion is certain on its own: files may or may not overlap boxes. But I and II are complementary, about the same two terms, and one of them must be true. Either I or II follows."),

    # ---------- Practice Test 2 ----------
    ineq(2, 1, "G > H = I ≥ J < K ≤ L", "G > J", "I > L", 0,
         "I: G > H = I ≥ J gives G > J, true. II: I ≥ J and J < K point in opposite directions, so I and L cannot be compared. Only I follows."),
    ineq(2, 1, "Q ≤ R < S = T ≥ U > V", "Q < T", "V < S", 4,
         "I: Q ≤ R < S = T gives Q < T, true. II: V < U ≤ T = S gives V < S, true. Both follow."),
    ineq(2, 2, "B ≥ C = D > E ≤ F", "C > F", "F > D", 3,
         "D > E and E ≤ F point in opposite directions, so D (and C, which equals D) cannot be compared with F. Neither conclusion follows."),
    ineq(2, 2, "W < X ≤ Y > Z ≥ A", "X > Z", "Y > A", 1,
         "I: X ≤ Y and Y > Z point in opposite directions, so X and Z cannot be compared. II: Y > Z ≥ A gives Y > A, true. Only II follows."),
    syl(2, 1, ["Some apples are mangoes.", "All mangoes are grapes."], "Some apples are grapes.", "All grapes are apples.", 0,
        "The apples that are mangoes are also grapes, so some apples are grapes (I). Nothing says every grape is an apple (II). Only I follows."),
    syl(2, 2, ["All doctors are teachers.", "No teacher is a lawyer."], "Some lawyers are doctors.", "No doctor is a lawyer.", 1,
        "Every doctor is a teacher and no teacher is a lawyer, so no doctor is a lawyer (II). That makes I false. Only II follows."),
    syl(2, 3, ["Some rivers are lakes.", "Some lakes are ponds."], "Some rivers are ponds.", "No river is a pond.", 2,
        "The statements do not link rivers and ponds, so neither conclusion is certain on its own. But I and II are complementary, about the same two terms, so one of them must be true. Either I or II follows."),
    syl(2, 2, ["All rings are gold.", "Some gold is silver."], "Some rings are silver.", "All silver is gold.", 3,
        "The gold that is silver need not include any rings, so I is not certain. 'Some gold is silver' does not mean all silver is gold, so II does not follow. Neither follows."),

    # ---------- Drill only ----------
    ineq(0, 1, "R > S ≥ T = U < V", "R > U", "V > T", 4,
         "I: R > S ≥ T = U gives R > U, true. II: V > U = T gives V > T, true. Both follow."),
    ineq(0, 2, "P ≥ Q = R ≥ S", "P > S", "P = S", 2,
         "P ≥ Q = R ≥ S gives P ≥ S. Neither P > S nor P = S is certain alone, but one of them must hold. Either I or II follows."),
    syl(0, 2, ["All books are novels.", "Some novels are poems.", "No poem is a story."], "Some novels are not stories.", "Some books are poems.", 0,
        "The novels that are poems cannot be stories, so some novels are not stories (I). The poems that are novels need not be books, so II is only a possibility. Only I follows."),
]
