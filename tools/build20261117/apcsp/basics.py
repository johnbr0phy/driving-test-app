"""Original AP CSP Basics lessons using the College Board exam reference notation."""


def example(code, note):
    return {"kind": "eg", "text": code, "note": note}


def check(stem, options, answer, why):
    return {"stem": stem, "options": options, "answer": answer, "why": why}


def step(ask, options, answer, hint, line):
    return {"ask": ask, "options": options, "answer": answer, "hint": hint, "line": line}


SKILLS = [
    {
        "id": "apcspAssignment", "name": "Trace an assignment", "sub": "Follow the value at each line",
        "rule": "In x ← expression, evaluate the right side using the current values. Copy the result into x. Each later line starts with the values the previous line left behind.",
        "trick": "Give each variable its own column. When one variable changes, leave the others alone. The practice questions also write the arrow as <-.",
        "examples": [
            example("tiles ← 9\nspares ← tiles\ntiles ← 2", "spares still holds the 9 it copied."),
            example("tiles ← 9\ntiles ← tiles + 2", "The right side uses 9. The new value of tiles is 11."),
        ],
        "another": {"text": "Copy the score from the scoreboard onto a ticket. The ticket keeps that score even when the scoreboard changes.", "example": "Copy 8 onto your ticket. If the board goes to 10, your ticket still says 8."},
        "walkthrough": {"board": "blue ← 3\ngold ← blue + 4\nblue ← gold + 1", "steps": [
            step("After the first line, what is blue?", ["3", "4"], 0, "Follow the arrow from the value to the name.", "blue holds 3"),
            step("Which value does gold receive?", ["4", "7", "8"], 1, "Use the current value of blue in blue + 4.", "gold holds 7"),
            step("After the final line, what are blue and gold?", ["8 and 8", "3 and 7", "8 and 7"], 2, "The final arrow points to blue.", "blue holds 8 and gold still holds 7"),
        ]},
        "questions": [
            check("After a ← 5, b ← a, then a ← 13, what does b hold?", ["5", "8", "13"], 0, "b copied 5 before a changed."),
            check("After total ← 6, extra ← 2, then total ← total - extra, what does total hold?", ["2", "4", "6"], 1, "The right side evaluates to 6 - 2, which is 4."),
        ],
    },
    {
        "id": "apcspConditions", "name": "Evaluate a Boolean condition", "sub": "Decide which branch runs",
        "rule": "A comparison gives true or false. AND needs both conditions to be true. OR needs at least one. NOT reverses a Boolean value. IF runs its first block when the condition is true and its ELSE block when it is false.",
        "trick": "Substitute the values, evaluate each comparison, then combine the results. In a sequence of separate IF statements, test each condition when you reach it.",
        "examples": [
            example("(seats ≥ 3) AND (seats < 6)", "With seats equal to 6, the first comparison is true and the second is false. The result is false."),
            example("NOT (color = \"red\")", "With color equal to \"blue\", the comparison is false and NOT makes the result true."),
        ],
        "another": {"text": "A game opens one gate if you have both tickets. Another gate opens if you have either ticket.", "example": "With just the blue ticket, blue AND yellow is false. Blue OR yellow is true."},
        "walkthrough": {"board": "points ← 8\nIF ((points > 5) AND NOT (points = 8))\n{ DISPLAY(1) }\nELSE { DISPLAY(2) }", "steps": [
            step("With points equal to 8, is points > 5 true?", ["True", "False"], 0, "Compare 8 with 5.", "points > 5 gives true"),
            step("What does NOT (points = 8) give?", ["True", "False"], 1, "Reverse the result of 8 = 8.", "NOT (points = 8) gives false"),
            step("Which value appears?", ["1", "2"], 1, "AND needs two true values, so follow ELSE.", "true AND false gives false. The program displays 2."),
        ]},
        "questions": [
            check("Which value of t makes (t ≥ 4) AND (t < 7) true?", ["3", "6", "7"], 1, "6 meets both limits. The upper limit excludes 7."),
            check("What is NOT (false OR false)?", ["True", "False"], 0, "The OR gives false. NOT reverses it to true."),
        ],
    },
    {
        "id": "apcspArithmetic", "name": "Evaluate arithmetic and MOD", "sub": "Distinguish a quotient from a remainder",
        "rule": "In AP pseudocode, / gives a quotient, which can be a decimal. For a nonnegative integer a and a positive integer b, a MOD b gives the remainder. Work inside parentheses first, then evaluate *, / and MOD from left to right before + and -.",
        "trick": "Find the largest whole multiple of b that fits in a. Subtract it from a to get the remainder.",
        "examples": [
            example("14 / 4", "The quotient is 3.5."),
            example("1 + 14 MOD 4", "Three groups of 4 use 12. The remainder is 2, so the expression gives 3."),
        ],
        "another": {"text": "If everyone needs a full pair of gloves, the remainder counts the gloves left without a partner.", "example": "Nine gloves make four pairs and leave one glove. 9 MOD 2 is 1."},
        "walkthrough": {"board": "5 + 23 MOD 6", "steps": [
            step("Which operation comes first?", ["Add 5 and 23", "Find 23 MOD 6"], 1, "MOD has the same precedence as multiplication.", "Evaluate 23 MOD 6 first"),
            step("What remains after grouping 23 into sixes?", ["3", "5", "6"], 1, "Three full groups use 18.", "23 - 18 = 5"),
            step("What is the whole expression?", ["10", "8", "28"], 0, "Add 5 to the remainder.", "5 + 5 = 10"),
        ]},
        "questions": [
            check("What is 13 / 2 in AP pseudocode?", ["1", "6", "6.5"], 2, "The division operator returns the quotient, including its fractional part."),
            check("What is 2 + 16 MOD 5?", ["3", "1", "5"], 0, "16 MOD 5 is 1. Adding 2 gives 3."),
        ],
    },
    {
        "id": "apcspLoops", "name": "Trace a loop", "sub": "Track the value after each repetition",
        "rule": "REPEAT n TIMES runs its body n times. REPEAT UNTIL checks its condition before each repetition and stops when it is true. FOR EACH visits the elements of a list in order. Each repetition uses the values left by the previous one.",
        "trick": "Write the starting value, then add one row per repetition. For a condition-controlled loop, check the stopping condition before adding another row.",
        "examples": [
            example("n ← 1\nREPEAT 3 TIMES { n ← n * 2 }", "The successive values are 2, 4 and 8."),
            example("total ← 0\nFOR EACH v IN [2, 7] { total ← total + v }", "The running total goes from 0 to 2 to 9."),
        ],
        "another": {"text": "Move a game piece three spaces each turn. Stop as soon as it reaches or passes the finish square.", "example": "Starting at 1 with a finish at 6, you land on 4, then 7. There is no third move."},
        "walkthrough": {"board": "n ← 2\nREPEAT UNTIL (n ≥ 7) { n ← n + 3 }", "steps": [
            step("At the start, should the body run?", ["Yes", "No"], 0, "The stopping condition is still false at 2.", "The first repetition starts at 2"),
            step("What does n hold after one repetition?", ["3", "5", "7"], 1, "Add 3 to 2.", "n is 5, so another repetition starts"),
            step("What value does n hold when the loop ends?", ["7", "8", "11"], 1, "Add 3 once more and check the condition.", "n is 8. The stopping condition is true."),
        ]},
        "questions": [
            check("n starts at 4. REPEAT 2 TIMES { n ← n + 5 }. What is n afterward?", ["9", "14", "18"], 1, "The two repetitions produce 9 and then 14."),
            check("n starts at 8. How often does REPEAT UNTIL (n > 5) { n ← n + 1 } run its body?", ["Zero times", "One time", "Three times"], 0, "8 > 5 is already true at the first check."),
        ],
    },
    {
        "id": "apcspListIndices", "name": "Read and update list positions", "sub": "Count the first element as position 1",
        "rule": "AP list indices start at 1 and end at LENGTH(list). INSERT puts a new item at the specified position and shifts later items right. REMOVE deletes the item at that position and shifts the following items left.",
        "trick": "Write the positions above the list. After an insertion or removal, number the resulting list again before reading an item.",
        "examples": [
            example("colors ← [\"red\", \"blue\"]", "colors[1] holds \"red\" and colors[2] holds \"blue\"."),
            example("values ← [3, 5, 8]\nINSERT(values, 2, 4)", "The result is [3, 4, 5, 8]. The original second item moves to position 3."),
        ],
        "another": {"text": "Number the runners in a line from first to last. If the first runner leaves, the runner who was second moves into first place.", "example": "In the line Jo, Sal, Bo, the second runner is Sal."},
        "walkthrough": {"board": "sizes ← [4, 7, 9]\nREMOVE(sizes, 2)\nDISPLAY(sizes[2])", "steps": [
            step("Which value starts at position 2?", ["4", "7", "9"], 1, "Start counting at 1.", "Position 2 holds 7"),
            step("What remains after REMOVE?", ["[4, 9]", "[7, 9]", "[4, 7]"], 0, "Delete the item at the specified position.", "The list becomes [4, 9]"),
            step("What value appears?", ["4", "7", "9"], 2, "Count to the second item in the new list.", "Position 2 now holds 9"),
        ]},
        "questions": [
            check("For names ← [\"Ari\", \"Bea\", \"Cal\"], which index retrieves \"Cal\"?", ["2", "3", "4"], 1, "The third name has index 3."),
            check("For a ← [1, 4, 6], which list results from INSERT(a, 2, 9)?", ["[1, 9, 4, 6]", "[1, 9, 6]", "[1, 4, 9, 6]"], 0, "9 takes position 2. The existing 4 and 6 shift one place right."),
        ],
    },
]
