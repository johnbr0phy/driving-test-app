#!/usr/bin/env python3
"""Write data/v2/basics/gcsecs.json: the six GCSE Computer Science Basics skills.
Usage (repo root): python3 -I tools/gcsecs/basics.py"""
import json

def ask(q, options, line=None, then=None, hint=None):
    s = {"ask": q, "options": options, "answer": 0}
    if then: s["then"] = then
    if hint: s["hint"] = hint
    if line: s["line"] = line
    return s

def say(t, line=None):
    s = {"say": t}
    if line: s["line"] = line
    return s

SKILLS = [
{
  "id": "csBinary", "name": "Binary and denary", "sub": "Place values 128 down to 1",
  "rule": "Each bit in an 8-bit binary number has a place value: 128, 64, 32, 16, 8, 4, 2, 1. To turn binary into denary, add the place values that have a 1 under them. To turn denary into binary, take the biggest place value that fits, subtract it, and repeat with what is left.",
  "trick": "Write 128 64 32 16 8 4 2 1 above the bits before you do anything else. Most mistakes come from counting places in your head.",
  "examples": [
    {"kind": "eg", "text": "01010110", "note": "64 + 16 + 4 + 2 = 86"},
    {"kind": "eg", "text": "40 in binary", "note": "40 − 32 = 8, so 1s under 32 and 8: 00101000"},
  ],
  "table": {"head": ["128", "64", "32", "16", "8", "4", "2", "1"], "rows": [["0", "1", "0", "1", "0", "1", "1", "0"]]},
  "another": {"text": "Binary is like paying with coins worth 128p, 64p, 32p and so on, where you can use each coin once or not at all. A 1 means you used that coin.", "example": "86p = 64p + 16p + 4p + 2p\nCoins used: 01010110"},
  "walkthrough": {"board": "Convert 01010110 to denary, then convert 86 back to binary.", "kind": "text", "steps": [
    say("Write the place values over the bits: 128, 64, 32, 16, 8, 4, 2, 1.", "128 64 32 16 8 4 2 1 over 0 1 0 1 0 1 1 0"),
    ask("Which place values have a 1 under them?", ["64, 16, 4 and 2", "128, 32 and 8", "64, 16, 4 and 1"], "1s under 64, 16, 4 and 2", hint="Read along the bits: 0 1 0 1 0 1 1 0."),
    ask("Add them: 64 + 16 + 4 + 2 = ?", ["86", "84", "90"], "64 + 16 + 4 + 2 = 86"),
    ask("Now go back the other way. What is the biggest place value that fits into 86?", ["64", "128", "32"], "86 − 64 = 22", then="128 is too big. 86 − 64 leaves 22."),
    ask("What is the biggest place value that fits into 22?", ["16", "32", "8"], "22 − 16 = 6, and 6 = 4 + 2", then="22 − 16 leaves 6, which is 4 + 2."),
    say("So the 1s go under 64, 16, 4 and 2, giving 01010110. Both directions agree.", "86 = 01010110 ✓"),
  ]},
  "questions": [
    {"stem": "What is 00010101 in denary?", "options": ["21", "42", "13"], "answer": 0, "why": "16 + 4 + 1 = 21."},
    {"stem": "What is 40 as an 8-bit binary number?", "options": ["00101000", "00100100", "01010000"], "answer": 0, "why": "40 = 32 + 8. 00100100 is 36 and 01010000 is 80."},
  ],
},
{
  "id": "csHex", "name": "Hexadecimal", "sub": "One hex digit is four bits",
  "rule": "Hexadecimal (base 16) uses the digits 0 to 9 and then A to F for 10 to 15. One hex digit stands for exactly four bits (a nibble). To change binary to hex, split it into nibbles and convert each one using 8, 4, 2, 1. To change two-digit hex to denary, multiply the first digit by 16 and add the second.",
  "trick": "Learn A = 10 and F = 15; the letters in between count up from there.",
  "examples": [
    {"kind": "eg", "text": "1010 0101", "note": "1010 = 10 = A and 0101 = 5, so A5"},
    {"kind": "eg", "text": "3C to denary", "note": "3 × 16 + 12 = 60"},
  ],
  "table": {"head": ["Hex", "A", "B", "C", "D", "E", "F"], "rows": [["Denary", "10", "11", "12", "13", "14", "15"]]},
  "another": {"text": "Hex is a shorthand, like writing a dozen instead of twelve things one by one. Four bits squash into one symbol, so a long binary number gets much shorter.", "example": "1100 1001\nC 9\nC9"},
  "walkthrough": {"board": "Convert 1100 1001 to hexadecimal, then to denary.", "kind": "text", "steps": [
    say("Split the byte into two nibbles: 1100 and 1001. Each nibble becomes one hex digit.", "1100 and 1001"),
    ask("Using 8, 4, 2, 1, what is 1100?", ["12, which is C", "14, which is E", "12, which is B"], "1100 = 8 + 4 = 12 = C", hint="8 + 4 + 0 + 0. Then A is 10, B is 11, C is 12."),
    ask("What is 1001?", ["9", "6", "3"], "1001 = 8 + 1 = 9"),
    ask("So what is the hex number?", ["C9", "9C", "129"], "1100 1001 = C9", then="Keep the nibbles in the same order as the binary."),
    ask("Now to denary: C9 = 12 × 16 + 9 = ?", ["201", "192", "129"], "12 × 16 + 9 = 201"),
  ]},
  "questions": [
    {"stem": "What is the hex number 2F in denary?", "options": ["47", "32", "215"], "answer": 0, "why": "2 × 16 = 32, and F is 15, so 32 + 15 = 47."},
    {"stem": "What is 1110 0011 in hexadecimal?", "options": ["E3", "3E", "D3"], "answer": 0, "why": "1110 is 14, which is E, and 0011 is 3."},
  ],
},
{
  "id": "csBinaryAdd", "name": "Binary addition and shifts", "sub": "1 + 1 = 10: write 0, carry 1",
  "rule": "Add binary right to left, like column addition. 0 + 1 = 1. 1 + 1 = 10: write 0 and carry 1. 1 + 1 + 1 = 11: write 1 and carry 1. If a carry goes past the last bit, the answer does not fit: that is overflow. Shifting left by one place doubles a number; shifting right by one place halves it, and bits that fall off the end are lost.",
  "trick": "Check every answer in denary: convert both numbers, add them, and convert your binary answer back.",
  "examples": [
    {"kind": "eg", "text": "0101 + 0011 = 1000", "note": "5 + 3 = 8"},
    {"kind": "eg", "text": "00001100 shifted left 2 = 00110000", "note": "12 × 4 = 48"},
  ],
  "another": {"text": "In binary you are only allowed 0 and 1, so the moment a column reaches 2 it is full, like a cup that overflows into the next cup along.", "example": "1 + 1 = 2\nToo much for one column\nWrite 0, carry 1"},
  "walkthrough": {"board": "0011 + 0111", "kind": "math", "steps": [
    ask("Start with the right-hand column: 1 + 1 = ?", ["0, carry 1", "2", "1, carry 1"], "Column 1: 0, carry 1", hint="2 is not a binary digit. 2 in binary is 10."),
    ask("Next column: 1 + 1 + the carried 1 = ?", ["1, carry 1", "0, carry 1", "3"], "Column 2: 1, carry 1", hint="Three 1s make 3, which is 11 in binary."),
    ask("Next column: 0 + 1 + the carried 1 = ?", ["0, carry 1", "1", "2"], "Column 3: 0, carry 1", hint="1 + 1 is 10 in binary."),
    ask("Last column: 0 + 0 + the carried 1 = ?", ["1", "0, carry 1", "10"], "Column 4: 1"),
    ask("Read the answer from left to right. 0011 + 0111 = ?", ["1010", "0101", "1110"], "0011 + 0111 = 1010", then="Check: 3 + 7 = 10, and 1010 is 8 + 2 = 10."),
    ask("Shifting 1010 one place left gives 10100. What did that do to 10?", ["Doubled it to 20", "Halved it", "Added 1 to it"], "Shift left 1 place = × 2"),
  ]},
  "questions": [
    {"stem": "What is 0011 + 0101?", "options": ["1000", "0110", "1001"], "answer": 0, "why": "3 + 5 = 8, which is 1000. The carries ripple all the way to the left."},
    {"stem": "What is 00011000 shifted right by 2 places?", "options": ["00000110", "01100000", "00001100"], "answer": 0, "why": "Two places right divides by 4: 24 becomes 6. 01100000 is a left shift."},
  ],
},
{
  "id": "csDataUnits", "name": "File sizes and units", "sub": "Bits, bytes, kilobytes",
  "rule": "8 bits make 1 byte. 1,000 bytes make a kilobyte, 1,000 KB a megabyte and 1,000 MB a gigabyte (you may also see 1,024, written KiB, MiB and GiB). Image size in bits = width × height × colour depth. Sound size in bits = sample rate × bit depth × seconds. Divide bits by 8 to get bytes.",
  "trick": "Work it out in bits first, then divide by 8 for bytes, then by 1,000 for each step up.",
  "examples": [
    {"kind": "eg", "text": "100 × 50 image, 8-bit colour", "note": "100 × 50 × 8 = 40,000 bits ÷ 8 = 5,000 bytes = 5 KB"},
    {"kind": "eg", "text": "n bits per pixel give 2ⁿ colours", "note": "4 bits give 16 colours"},
  ],
  "another": {"text": "Bits are like single sweets, bytes are bags of 8 sweets, and kilobytes are boxes of 1,000 bags. To count boxes, first count the sweets, then bag them, then box them.", "example": "80,000 sweets\n÷ 8 = 10,000 bags\n÷ 1,000 = 10 boxes"},
  "walkthrough": {"board": "A 200 × 100 pixel image has a colour depth of 4 bits. What is its size in kilobytes?", "kind": "text", "steps": [
    ask("How many pixels are there?", ["20,000", "300", "2,000"], "200 × 100 = 20,000 pixels", hint="Multiply the width by the height."),
    ask("Each pixel needs 4 bits. How many bits for the whole image?", ["80,000", "5,000", "20,004"], "20,000 × 4 = 80,000 bits"),
    ask("To turn bits into bytes, divide by what?", ["8", "1,000", "4"], "80,000 ÷ 8 = 10,000 bytes"),
    ask("With 1 KB = 1,000 bytes, how many kilobytes?", ["10 KB", "80 KB", "1 KB"], "10,000 ÷ 1,000 = 10 KB"),
  ]},
  "questions": [
    {"stem": "How many bits are there in 3 bytes?", "options": ["24", "11", "3,000"], "answer": 0, "why": "Each byte is 8 bits, so 3 × 8 = 24."},
    {"stem": "A 10 × 10 pixel image uses 8 bits per pixel. What is its size in bytes?", "options": ["100", "800", "80"], "answer": 0, "why": "100 pixels × 8 bits = 800 bits, and 800 ÷ 8 = 100 bytes. 800 is the size in bits."},
  ],
},
{
  "id": "csTraceTables", "name": "Trace tables", "sub": "Run the code one line at a time",
  "rule": "A trace table has a column for each variable (and one for output) and a new row each time a value changes. Follow the code one line at a time, write down every new value as it is assigned, and check the loop condition every time round.",
  "trick": "Never run two lines in your head at once. Write each change down, even the boring ones, and the answer falls out of the last row.",
  "examples": [
    {"kind": "eg", "text": "x ← x + 2 when x is 5", "note": "x becomes 7: write 7 in the x column"},
    {"kind": "eg", "text": "FOR i ← 1 TO 3", "note": "The loop body runs with i = 1, 2 and 3: three times"},
  ],
  "another": {"text": "A trace table is like keeping score in a game: every time someone scores, you write the new total down instead of trying to remember it.", "example": "total ← 0\ntotal ← total + 1 (now 1)\ntotal ← total + 2 (now 3)"},
  "walkthrough": {"board": "total ← 10. FOR i ← 1 TO 3: total ← total − i. ENDFOR. OUTPUT total", "kind": "text", "steps": [
    ask("Before the loop starts, what is total?", ["10", "0", "9"], "total = 10"),
    ask("First time round, i = 1. What does total become?", ["9", "11", "10"], "i = 1, total = 9"),
    ask("Second time round, i = 2. What does total become?", ["7", "8", "5"], "i = 2, total = 7", hint="Take i away from the total you already have: 9 − 2."),
    ask("Third time round, i = 3. What does total become?", ["4", "3", "6"], "i = 3, total = 4"),
    ask("Does the loop run again with i = 4?", ["No, it stops after 3", "Yes, once more"], "The loop ends after i = 3"),
    ask("What is output?", ["4", "10", "7"], "OUTPUT 4"),
  ]},
  "questions": [
    {"stem": "x ← 2, then x ← x × 3, then x ← x − 1. What is x now?", "options": ["5", "6", "4"], "answer": 0, "why": "2 × 3 = 6, then 6 − 1 = 5."},
    {"stem": "count ← 0. WHILE count < 3: count ← count + 1. ENDWHILE. How many times does the loop body run?", "options": ["3", "2", "4"], "answer": 0, "why": "count goes 1, 2, 3. When count is 3, count < 3 is false, so the loop stops after 3 runs."},
  ],
},
{
  "id": "csTruthTables", "name": "AND, OR and NOT", "sub": "Truth tables and brackets",
  "rule": "AND gives 1 only when both inputs are 1. OR gives 1 when at least one input is 1. NOT flips its single input: 0 becomes 1 and 1 becomes 0. A truth table lists every combination of inputs: 2 inputs need 4 rows, and each extra input doubles that. Work out brackets first.",
  "trick": "AND is strict (both), OR is easy-going (either). Anything AND 0 is 0; anything OR 1 is 1.",
  "examples": [
    {"kind": "eg", "text": "1 AND 0", "note": "0, because AND needs both"},
    {"kind": "eg", "text": "1 OR 0", "note": "1, because OR needs only one"},
  ],
  "table": {"head": ["A", "B", "A AND B", "A OR B"], "rows": [["0", "0", "0", "0"], ["0", "1", "0", "1"], ["1", "0", "0", "1"], ["1", "1", "1", "1"]]},
  "another": {"text": "AND is like needing both a ticket and a wristband to get in. OR is like being let in with either one. NOT is saying the opposite.", "example": "Ticket AND wristband: both needed\nTicket OR wristband: one is enough\nNOT raining = dry"},
  "walkthrough": {"board": "Q = (A OR B) AND (NOT C), with A = 0, B = 1, C = 0", "kind": "text", "steps": [
    ask("First bracket: A OR B = 0 OR 1 = ?", ["1", "0"], "A OR B = 1", hint="OR needs only one input to be 1."),
    ask("Second bracket: NOT C = NOT 0 = ?", ["1", "0"], "NOT C = 1"),
    ask("Now combine them: 1 AND 1 = ?", ["1", "0"], "Q = 1 AND 1 = 1"),
    ask("If C were 1 instead, what would Q be?", ["0", "1"], "C = 1 gives Q = 0", then="NOT C would be 0, and anything AND 0 is 0."),
  ]},
  "questions": [
    {"stem": "What is 1 AND 0?", "options": ["0", "1"], "answer": 0, "why": "AND is 1 only when both inputs are 1."},
    {"stem": "How many rows does a truth table for 5 inputs need?", "options": ["32", "10", "25"], "answer": 0, "why": "Each input doubles the combinations: 2 × 2 × 2 × 2 × 2 = 32."},
  ],
},
{
  "id": "csModDiv", "name": "MOD and DIV", "sub": "Whole-number division and the remainder",
  "rule": "DIV is whole-number division: it gives how many whole times one number goes into another and throws the remainder away. MOD gives the remainder that is left over. 14 DIV 4 = 3 and 14 MOD 4 = 2, because 3 × 4 = 12 and 2 are left.",
  "trick": "n MOD 2 = 0 means n is even. The answer to MOD is always smaller than the number you divide by.",
  "examples": [
    {"kind": "eg", "text": "14 DIV 4", "note": "4 goes into 14 three whole times: 3"},
    {"kind": "eg", "text": "14 MOD 4", "note": "3 × 4 = 12, and 14 − 12 = 2 left over: 2"},
  ],
  "another": {"text": "Share 14 sweets between 4 friends. Each friend gets 3 (that is DIV) and 2 sweets are left in the bag (that is MOD).", "example": "14 sweets, 4 friends\n3 each: DIV\n2 left over: MOD"},
  "walkthrough": {"board": "mins ← 135. hours ← mins DIV 60. left ← mins MOD 60. OUTPUT hours, left", "kind": "text", "steps": [
    say("DIV keeps the whole part of a division. MOD keeps what is left over."),
    ask("How many whole times does 60 go into 135?", ["2", "3", "75"], "hours = 135 DIV 60 = 2", then="2 × 60 = 120, and 3 × 60 = 180 is too big.", hint="60, 120, 180: which is the last one that fits inside 135?"),
    ask("2 lots of 60 is 120. How much of 135 is left over?", ["15", "2", "60"], "left = 135 MOD 60 = 15", hint="135 − 120."),
    ask("What is output?", ["2 and 15", "15 and 2", "2.25"], "OUTPUT 2, 15", then="135 minutes is 2 hours and 15 minutes."),
    ask("Which test tells you a number n is even?", ["n MOD 2 = 0", "n DIV 2 = 0"], "even: n MOD 2 = 0", then="An even number leaves no remainder when it is divided by 2."),
  ]},
  "questions": [
    {"stem": "What is 19 MOD 4?", "options": ["3", "4", "15"], "answer": 0, "why": "4 × 4 = 16, and 19 − 16 = 3 left over. 4 would be 19 DIV 4."},
    {"stem": "What is 26 DIV 6?", "options": ["4", "2", "5"], "answer": 0, "why": "6 goes into 26 four whole times (24). The 2 left over would be 26 MOD 6."},
  ],
},
{
  "id": "csTranslators", "name": "Translators", "sub": "Compiler, interpreter or assembler",
  "rule": "A CPU can only run machine code. A high-level language such as Python is written for people, so it must be translated first. A compiler translates the whole program at once into a file that can be run. An interpreter translates and runs one line at a time and stops at the first error. An assembler turns assembly language, a low-level language written in mnemonics, into machine code.",
  "trick": "Compiler: the whole book is translated before anyone reads it. Interpreter: it is translated out loud, one sentence at a time.",
  "examples": [
    {"kind": "eg", "text": "A game sold as a file that is ready to run", "note": "Compiled: it runs fast and the source code stays hidden"},
    {"kind": "eg", "text": "Testing a program you are still writing", "note": "Interpreted: it stops at the line with the error"},
  ],
  "another": {"text": "Imagine your friend only reads French. You could translate your whole letter first and post the French copy (a compiler), or sit beside them and translate each sentence as they go (an interpreter).", "example": "Whole letter first: compiler\nSentence by sentence: interpreter"},
  "walkthrough": {"board": "A student writes a program in Python, tests it, then wants to give friends a file they can run.", "kind": "text", "steps": [
    ask("Can the CPU run the Python code as it is written?", ["No, it must be translated into machine code", "Yes, the CPU reads Python"], "High-level code → machine code", hint="A CPU only understands binary machine code."),
    ask("While testing, the student wants the program to stop at the line with the error. Which translator does that?", ["An interpreter", "A compiler", "An assembler"], "Testing: interpreter", then="It translates and runs one line at a time, so earlier lines have already run."),
    ask("The friends should get one file that runs with no translator installed. Which translator makes that?", ["A compiler", "An interpreter"], "Sharing: compiler", then="A compiler translates everything up front into an executable file."),
    ask("Another program is written in mnemonics such as LDA and ADD. What translates it?", ["An assembler", "A compiler"], "Assembly language: assembler", hint="Mnemonics are assembly language."),
  ]},
  "questions": [
    {"stem": "Which translator turns the whole program into machine code before it is run?", "options": ["A compiler", "An interpreter", "An assembler"], "answer": 0, "why": "A compiler translates everything at once. An interpreter goes line by line, and an assembler is for assembly language."},
    {"stem": "Which of these is a low-level language?", "options": ["Assembly language", "Python", "Java"], "answer": 0, "why": "Assembly language is close to machine code and is written for one type of processor. Python and Java are high-level languages."},
  ],
},
]

with open("data/v2/basics/gcsecs.json", "w") as f:
    json.dump(SKILLS, f, indent=1, ensure_ascii=False)
    f.write("\n")
print(f"wrote {len(SKILLS)} skills -> data/v2/basics/gcsecs.json")
