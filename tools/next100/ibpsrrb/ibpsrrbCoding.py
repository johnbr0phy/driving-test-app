# Reasoning: coding-decoding, letter series and alphabet questions.
# Letter codes and alphabet answers are computed below and asserted.
A = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


def shift(word, steps):
    return "".join(A[(A.index(c) + s) % 26] for c, s in zip(word, steps))


def rev(word):
    return "".join(A[25 - A.index(c)] for c in word)


def pairs(word):
    p = [A.index(c) for c in word]
    return sum(1 for i in range(len(p)) for j in range(i + 1, len(p)) if j - i == abs(p[i] - p[j]))


assert shift("FIELD", [2] * 5) == "HKGNF" and shift("SEEDS", [2] * 5) == "UGGFU"
assert shift("PLOUGH"[::-1], [1] * 6) == "IHVPMQ" and shift("HARVEST"[::-1], [1] * 7) == "UTFWSBI"
assert sum(A.index(c) + 1 for c in "CROP") == 52 and sum(A.index(c) + 1 for c in "SOIL") == 55
assert A[::-1][19] == "G" and A[::-1][13] == "M"
assert [shift(x, [3 * k, -3 * k]) for k, x in enumerate(["CX"] * 5)][4] == "OL"
assert pairs("WINTER") == 3
assert [a == b for a, b in zip("SILVER", sorted("SILVER"))].count(True) == 2
assert shift("GRAIN", [1, -1, 1, -1, 1]) == "HQBHO" and shift("MANGO", [1, -1, 1, -1, 1]) == "NZOFP"
assert rev("SEED") == "HVVW" and rev("CROP") == "XILK"
assert shift("RURAL", [3] * 5) == "UXUDO" and shift("FARMS", [3] * 5) == "IDUPV"
assert [A.index(c) + 1 for c in "BEJQZ"] == [2, 5, 10, 17, 26]
assert shift("WELL", [1, 2, 3, 4]) == "XGOP" and shift("PUMP", [1, 2, 3, 4]) == "QWPT"
assert A[26 - 18] == "I" and A[26 - 18 - 5] == "D"
assert "VILLAGE"[::-1][2] == "A"
assert shift("COTTON", [1] * 6) == "DPUUPO" and shift("WHEAT", [1] * 5) == "XIFBU"
assert sum(A.index(c) + 1 for c in "DAM") == 18 and sum(A.index(c) + 1 for c in "CANAL") == 31
assert A[7] == "H" and A[22] == "W" and 23 - 8 - 1 == 14
assert sorted("PLANT")[2] == "N"
ALPHA = "Using the English alphabet (A to Z), answer the question.\n\n"
ITEMS = [
    # ---------- Mock Test 1 ----------
    S(1, 1, "Coding-decoding",
      "In a certain code language, FIELD is written as HKGNF. How is SEEDS written in that code?",
      ["UGGFU", "UGGEU", "TFFET", "UGHFU", "VGGFU"],
      "Each letter moves two places forward: F to H, I to K, E to G, L to N, D to F. So SEEDS becomes UGGFU."),
    S(1, 2, "Coding-decoding",
      "In a certain code language, PLOUGH is written as IHVPMQ. How is HARVEST written in that code?",
      ["UTFWSBI", "TSEVRAH", "UTFWSBH", "IBSWFTU", "UTFXSBI"],
      "The word is written backwards and each letter then moves one place forward: PLOUGH reversed is HGUOLP, which becomes IHVPMQ. HARVEST reversed is TSEVRAH, which becomes UTFWSBI."),
    S(1, 2, "Coding-decoding",
      "In a certain code language, 'rain helps the crop' is written as 'ka lo mi su', 'the crop needs water' as 'lo pa su ze', and 'water helps farmers' as 'pa ka ti'. What is the code for 'rain'?",
      ["mi", "ka", "lo", "su", "ze"],
      "'Helps' is in the first and third sentences, so its code is their common word 'ka'. 'The' and 'crop' share 'lo' and 'su' with the second sentence. That leaves 'mi' for 'rain'."),
    N(1, 2, "Coding-decoding",
      "If each letter is given the number of its position in the alphabet (A = 1, B = 2, and so on) and a word is coded as the sum of its letters, CROP is coded as 52. What is the code for SOIL?",
      "55", ["50", "52", "53", "54"],
      "S = 19, O = 15, I = 9 and L = 12, and 19 + 15 + 9 + 12 = 55. (CROP: 3 + 18 + 15 + 16 = 52.)"),
    S(1, 2, "Alphabet",
      ALPHA + "If the English alphabet is written in reverse order (Z first), which letter will be 6th to the left of the 20th letter from the left?",
      ["M", "N", "A", "S", "L"],
      "In reverse order the 20th letter from the left is G. Six places to its left is the 14th letter of the reversed alphabet, which is M (counting back from G: H, I, J, K, L, M)."),
    S(1, 1, "Letter series",
      "Which letter pair comes next in the series? CX, FU, IR, LO, ?",
      ["OL", "OK", "NL", "PL", "OM"],
      "The first letters move forward by three (C, F, I, L, O) and the second letters move back by three (X, U, R, O, L): OL."),
    S(1, 3, "Alphabet",
      "How many pairs of letters are there in the word WINTER which have as many letters between them in the word as in the English alphabet?",
      ["Three", "One", "Two", "Four", "None"],
      "W and T have two letters between them in the word (I, N) and two in the alphabet (U, V). W and R have four between them in both, and T and R one (E in the word, S in the alphabet). That makes three pairs."),
    S(1, 2, "Alphabet",
      "If the letters of the word SILVER are arranged in alphabetical order, how many letters will remain in the same position?",
      ["Two", "None", "One", "Three", "Four"],
      "In alphabetical order SILVER becomes EILRSV. I (second) and L (third) stay in their places, so two letters do."),

    # ---------- Mock Test 2 ----------
    S(2, 2, "Coding-decoding",
      "In a certain code language, GRAIN is written as HQBHO. How is MANGO written in that code?",
      ["NZOFP", "NBOHP", "LZMFN", "NZOHP", "NZPFP"],
      "The letters move one place forward and one place back in turn: G+1 = H, R−1 = Q, A+1 = B, I−1 = H, N+1 = O. So M+1 = N, A−1 = Z, N+1 = O, G−1 = F, O+1 = P: NZOFP."),
    S(2, 1, "Coding-decoding",
      "In a certain code language, SEED is written as HVVW. How is CROP written in that code?",
      ["XILK", "XJLK", "DSPQ", "XILJ", "YILK"],
      "Each letter is replaced by the letter in the same position from the other end of the alphabet: S to H, E to V, D to W. So C becomes X, R becomes I, O becomes L and P becomes K: XILK."),
    S(2, 2, "Coding-decoding",
      "In a certain code language, 'farmers save water' is written as 'te ro gi', 'water helps fields' as 'gi pu ka', and 'fields need farmers' as 'ka te mo'. What is the code for 'helps'?",
      ["pu", "gi", "ka", "te", "mo"],
      "'Water' is common to the first two sentences, so it is 'gi'. 'Fields' is common to the second and third, so it is 'ka'. The remaining word of the second sentence, 'helps', is 'pu'."),
    S(2, 2, "Coding-decoding",
      "In a certain code language, RURAL is written as UXUDO. Which word is written as IDUPV in that code?",
      ["FARMS", "GBSNT", "FARNS", "EZQLR", "FBRMS"],
      "Each letter moves three places forward (R to U, U to X, A to D). To decode, move each letter of IDUPV three places back: I to F, D to A, U to R, P to M, V to S. The word is FARMS."),
    S(2, 2, "Letter series",
      "Which letter comes next in the series? B, E, J, Q, ?",
      ["Z", "Y", "X", "W", "V"],
      "The letters are at alphabet positions 2, 5, 10 and 17, which rise by 3, 5 and 7. The next rise is 9, giving position 26: Z."),
    S(2, 2, "Coding-decoding",
      "In a certain code language, WELL is written as XGOP. How is PUMP written in that code?",
      ["QWPT", "QVPT", "QWOT", "QWPS", "RWPT"],
      "The letters move forward by 1, 2, 3 and 4 places in turn: W+1 = X, E+2 = G, L+3 = O, L+4 = P. So P+1 = Q, U+2 = W, M+3 = P, P+4 = T: QWPT."),
    S(2, 2, "Alphabet",
      ALPHA + "Which letter is 5th to the left of the 18th letter from the right end of the alphabet?",
      ["D", "E", "N", "M", "C"],
      "The 18th letter from the right is the 9th from the left, I. Five places to its left is the 4th letter, D."),
    S(2, 1, "Alphabet",
      "If the letters of the word VILLAGE are written in reverse order, which letter will be third from the left?",
      ["A", "L", "G", "I", "E"],
      "VILLAGE written backwards is EGALLIV, so the third letter from the left is A."),

    # ---------- Drill only ----------
    S(0, 1, "Coding-decoding",
      "In a certain code language, COTTON is written as DPUUPO. How is WHEAT written in that code?",
      ["XIFBU", "XIFBS", "VGDZS", "XIGBU", "YIFBU"],
      "Each letter moves one place forward: C to D, O to P, T to U. So WHEAT becomes XIFBU."),
    S(0, 2, "Coding-decoding",
      "In a certain code language, 'buy fresh milk' is written as 'la fe sa', 'milk is fresh' as 'sa po la', and 'is it cheap' as 'po zu ri'. What is the code for 'buy'?",
      ["fe", "la", "sa", "po", "zu"],
      "'Milk' and 'fresh' are in the first two sentences, so they are 'la' and 'sa' in some order. That leaves 'fe' for 'buy'."),
    N(0, 2, "Coding-decoding",
      "If DAM is coded as 18 by adding the alphabet positions of its letters (A = 1, B = 2, and so on), what is the code for CANAL?",
      "31", ["32", "33", "34", "35"],
      "C = 3, A = 1, N = 14, A = 1 and L = 12, and 3 + 1 + 14 + 1 + 12 = 31. (DAM: 4 + 1 + 13 = 18.)"),
    S(0, 1, "Letter series",
      "Which letter pair comes next in the series? BZ, DX, FV, HT, ?",
      ["JR", "JS", "IR", "KR", "JQ"],
      "The first letters move forward two places (B, D, F, H, J) and the second letters move back two places (Z, X, V, T, R): JR."),
    N(0, 2, "Alphabet",
      "How many letters are there between the 8th letter from the left and the 4th letter from the right in the English alphabet?",
      "14", ["12", "13", "15", "16"],
      "The 8th letter from the left is H (position 8) and the 4th from the right is W (position 23). Between them are 23 − 8 − 1 = 14 letters."),
    S(0, 1, "Alphabet",
      "If the letters of the word PLANT are arranged in alphabetical order, which letter will be in the middle?",
      ["N", "L", "P", "A", "T"],
      "In alphabetical order PLANT becomes ALNPT, and the middle (third) letter is N."),
]
