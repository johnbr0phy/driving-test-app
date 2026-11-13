#!/usr/bin/env python3
"""Write data/v2/basics/timestables.json, the Basics skills for the Times Tables drills.

Usage: python3 -I tools/timestables/basics.py

Written for a seven-year-old in an English primary school: "lots of", "times
tables", pence, biscuits. Every skill leads with a click-through walkthrough
(procedures are learned by supplying each step), with the rule card behind
"Read it". Never "add a zero" for x 10: schools teach that digits move.
"""
import json, os

def ask(q, options, answer=0, then=None, hint=None, line=None):
    s = {"ask": q, "options": options, "answer": answer}
    if then: s["then"] = then
    if hint: s["hint"] = hint
    if line: s["line"] = line
    return s

def say(text):
    return {"say": text}

def q(stem, options, why, answer=0):
    return {"stem": stem, "options": options, "answer": answer, "why": why}

def skill(id, name, sub, rule, trick, examples, another, walkthrough, questions):
    return {"id": id, "name": name, "sub": sub, "rule": rule, "trick": trick,
            "examples": [{"kind": "eg", "text": t, "note": n} for t, n in examples],
            "another": {"text": another[0], "example": another[1]},
            "walkthrough": walkthrough, "questions": questions}

SKILLS = [
    skill("ttGroupsOf", "Times means lots of", "What the × sign really means",
          "× means \"lots of\". 3 × 4 can mean 3 lots of 4 or 4 lots of 3. Both make 12.",
          "Say \"lots of\" out loud. 3 lots of 4 is 4 + 4 + 4 = 12.",
          [("3 × 4", "3 lots of 4: 4 + 4 + 4 = 12."), ("2 × 5", "2 lots of 5: 5 + 5 = 10.")],
          ("Imagine 3 plates with 4 strawberries on each plate. Count all the strawberries and you get 12. That is 3 × 4.",
           "● ● ● ●\n● ● ● ●\n● ● ● ●\n3 lots of 4 = 12"),
          {"board": "3 × 4", "kind": "math", "steps": [
              say("The × sign means \"lots of\". So 3 × 4 means 3 lots of 4."),
              ask("How do we write 3 lots of 4 as an adding sum?", ["4 + 4 + 4", "3 + 4"], hint="3 + 4 only has one 4 in it. We need three 4s.", line="4 + 4 + 4"),
              ask("4 + 4 is 8. What is 8 + 4?", ["12", "11"], hint="Count on 4 from 8: 9, 10, 11, 12.", line="8 + 4 = 12"),
              ask("So 3 × 4 is:", ["12", "7"], then="Yes! 3 lots of 4 is 12.", hint="7 is 3 + 4. Times means lots of.", line="3 × 4 = 12 ✓"),
          ]},
          [q("What does 2 × 6 mean?", ["2 lots of 6", "2 add 6", "6 take away 2"], "× means lots of. 2 × 6 is 6 + 6 = 12."),
           q("Which adding sum is the same as 4 × 2?", ["2 + 2 + 2 + 2", "4 + 2", "4 + 4 + 4"], "4 lots of 2 is four 2s: 2 + 2 + 2 + 2 = 8.")]),

    skill("ttTwos", "The 2 times table", "× 2 means double it",
          "Multiply by 2 means double it. Double means add the number to itself.",
          "6 × 2 is 6 + 6 = 12. Every answer in the 2 times table is even: it ends in 0, 2, 4, 6 or 8.",
          [("7 × 2", "Double 7: 7 + 7 = 14."), ("9 × 2", "Double 9: 9 + 9 = 18.")],
          ("You have 2 hands. 3 children have 6 hands between them: 2, 4, 6. Counting hands is counting in 2s.",
           "2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24"),
          {"board": "8 × 2", "kind": "math", "steps": [
              say("× 2 means double. Double means add the number to itself."),
              ask("Double 8 is the same as:", ["8 + 8", "8 + 2"], hint="8 + 2 only adds 2. Doubling adds another 8.", line="8 + 8"),
              ask("What is 8 + 8?", ["16", "10"], hint="Count on 8 from 8: 9, 10, 11, 12, 13, 14, 15, 16.", line="8 × 2 = 16"),
              ask("Is 16 an even number?", ["Yes, it ends in 6", "No, it is odd"], then="Every 2 times table answer is even. That is a handy check.", hint="Numbers ending in 0, 2, 4, 6 or 8 are even.", line="16 is even ✓"),
          ]},
          [q("What is double 6?", ["12", "8", "66"], "Double 6 is 6 + 6 = 12."),
           q("Which number is in the 2 times table?", ["14", "15", "17"], "2 times table answers are even. 14 is even: 7 × 2 = 14.")]),

    skill("ttFives", "The 5 times table", "It always ends in 5 or 0",
          "The 5 times table counts in 5s: 5, 10, 15, 20, 25. Every answer ends in 5 or 0.",
          "Count in 5s and hold up a finger each time. 4 fingers: 5, 10, 15, 20. So 4 × 5 = 20.",
          [("6 × 5", "Count in 5s six times: 5, 10, 15, 20, 25, 30."), ("7 × 5", "5, 10, 15, 20, 25, 30, 35. It ends in 5, so it looks right.")],
          ("A clock counts in 5s. When the long hand points at 3, it is 15 minutes past. When it points at 6, it is half past: 30 minutes.",
           "3 → 15 minutes\n6 → 30 minutes\n9 → 45 minutes"),
          {"board": "4 × 5", "kind": "math", "steps": [
              say("4 × 5 means 4 lots of 5. Count in 5s and hold up a finger each time."),
              ask("Start counting in 5s. What comes after 5?", ["10", "6"], hint="Counting in 5s jumps by 5 each time.", line="5, 10"),
              ask("What comes after 10?", ["15", "20"], hint="Jump on just 5 from 10.", line="5, 10, 15"),
              ask("And the fourth one?", ["20", "25"], hint="25 would be 5 fingers. We need 4.", line="5, 10, 15, 20"),
              say("4 fingers, and we landed on 20. So 4 × 5 = 20. It ends in 0, so it passes the check."),
          ]},
          [q("Count in 5s: 10, 15, 20. What comes next?", ["25", "21", "30"], "Add 5 each time: 20 + 5 = 25."),
           q("Which number is in the 5 times table?", ["35", "32", "53"], "5 times table answers end in 5 or 0. 35 = 7 × 5.")]),

    skill("ttTens", "The 10 times table", "The digits move one place",
          "When you multiply by 10, the digits move one place to the left. A 0 fills the empty ones place.",
          "4 × 10: the 4 moves from the ones to the tens. 4 tens is 40.",
          [("7 × 10", "The 7 moves to the tens place. 7 tens is 70."), ("12 × 10", "Both digits move one place left: 120.")],
          ("Think of 10p coins. 3 ten-pence coins make 30p. 6 of them make 60p.",
           "1 coin = 10p\n3 coins = 30p\n6 coins = 60p"),
          {"board": "6 × 10", "kind": "math", "steps": [
              say("Multiplying by 10 makes a number ten times bigger. The digits slide one place to the left."),
              ask("6 is 6 ones. After × 10 it becomes:", ["6 tens", "6 hundreds"], hint="Just one place to the left: from ones to tens.", line="6 ones → 6 tens"),
              ask("How do we write 6 tens?", ["60", "16"], then="The 0 sits in the ones place to hold it.", hint="16 is 1 ten and 6 ones.", line="6 × 10 = 60 ✓"),
              say("Check by counting in 10s six times: 10, 20, 30, 40, 50, 60."),
          ]},
          [q("What is 9 × 10?", ["90", "19", "109"], "The 9 moves to the tens place: 9 tens is 90."),
           q("Which number is in the 10 times table?", ["50", "55", "15"], "10 times table answers end in 0. 50 = 5 × 10.")]),

    skill("ttSwapAround", "Swap them round", "3 × 8 is the same as 8 × 3",
          "You can swap the numbers in a times calculation and the answer stays the same. 3 × 8 = 8 × 3.",
          "Pick the easier way round. Counting in 7s ten times is slow, but 7 lots of 10 is easy: 70.",
          [("5 × 3 = 3 × 5", "5 lots of 3 is 15. 3 lots of 5 is 15 too."), ("8 × 2 = 2 × 8", "Double 8 is 16, so both are 16.")],
          ("Put biscuits in 2 rows of 5. Now walk round and look from the side: it is 5 rows of 2. Same biscuits, same number: 10.",
           "● ● ● ● ●\n● ● ● ● ●\n2 rows of 5 = 5 rows of 2 = 10"),
          {"board": "10 × 3", "kind": "math", "steps": [
              say("10 × 3 can mean 10 lots of 3. Counting in 3s ten times is slow! Let's swap it round."),
              ask("Swap the numbers round. 10 × 3 is the same as:", ["3 × 10", "10 + 3"], hint="Swapping keeps the same two numbers and the × sign.", line="10 × 3 = 3 × 10"),
              ask("3 × 10 is easy. What is it?", ["30", "13"], hint="3 tens is 30.", line="3 × 10 = 30"),
              ask("So what is 10 × 3?", ["30", "13"], then="Same numbers, same answer.", hint="13 is 10 + 3. We just worked out 3 × 10 = 30.", line="10 × 3 = 30 ✓"),
              say("Swapping means you only learn half the facts. Know 3 × 8 and you already know 8 × 3."),
          ]},
          [q("6 × 4 = 24. What is 4 × 6?", ["24", "10", "46"], "Swapping the numbers keeps the answer the same: 4 × 6 = 24."),
           q("Which is the same as 8 × 3?", ["3 × 8", "8 + 3", "8 × 8"], "Swap them round: 8 × 3 = 3 × 8 = 24.")]),

    skill("ttThrees", "The 3 times table", "2 lots and 1 more lot",
          "The 3 times table counts in 3s: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36.",
          "3 lots is 2 lots and 1 more lot. For 3 × 6: double 6 is 12, then add one more 6: 18.",
          [("3 × 4", "Double 4 is 8. Add one more 4: 12."), ("3 × 7", "Double 7 is 14. Add one more 7: 21.")],
          ("A tricycle has 3 wheels. 2 tricycles have 6 wheels. 3 tricycles have 9 wheels.",
           "1 trike → 3\n2 trikes → 6\n3 trikes → 9\n4 trikes → 12"),
          {"board": "3 × 6", "kind": "math", "steps": [
              say("3 × 6 means 3 lots of 6. 3 lots is 2 lots and 1 more lot."),
              ask("First do 2 lots of 6. Double 6 is:", ["12", "8"], hint="Double 6 means 6 + 6.", line="2 lots of 6 = 12"),
              ask("Add one more 6. 12 + 6 is:", ["18", "16"], hint="Count on 6 from 12: 13, 14, 15, 16, 17, 18.", line="12 + 6 = 18"),
              ask("So 3 × 6 is:", ["18", "9"], then="Check by counting in 3s six times: 3, 6, 9, 12, 15, 18.", hint="9 is 3 + 6. Times means lots of.", line="3 × 6 = 18 ✓"),
          ]},
          [q("Count in 3s: 9, 12, 15. What comes next?", ["18", "16", "20"], "Add 3 each time: 15 + 3 = 18."),
           q("What is 5 × 3?", ["15", "8", "53"], "5 lots of 3: 3, 6, 9, 12, 15.")]),

    skill("ttDoubleDouble", "The 4 times table", "Double, then double again",
          "× 4 means double and double again. 7 × 4: double 7 is 14, double 14 is 28.",
          "Stuck? Find × 2 first, then double that answer.",
          [("6 × 4", "Double 6 is 12. Double 12 is 24."), ("9 × 4", "Double 9 is 18. Double 18 is 36.")],
          ("You have 2 legs. A dog has 4 legs, double yours. So 3 dogs have double 6 legs: 12.",
           "You: 2 legs\nDog: 4 legs\n3 dogs: 12 legs"),
          {"board": "7 × 4", "kind": "math", "steps": [
              say("× 4 is double, then double again."),
              ask("Double 7 is:", ["14", "9"], hint="Double means 7 + 7.", line="Double 7 = 14"),
              ask("Now double 14:", ["28", "24"], hint="10 + 10 = 20 and 4 + 4 = 8. Then 20 + 8.", line="Double 14 = 28"),
              ask("So 7 × 4 is:", ["28", "14"], then="Two doubles make × 4.", hint="14 is only one double. × 4 needs two.", line="7 × 4 = 28 ✓"),
          ]},
          [q("What is 5 × 4?", ["20", "9", "10"], "Double 5 is 10. Double 10 is 20."),
           q("What is 8 × 4?", ["32", "16", "12"], "Double 8 is 16. Double 16 is 32.")]),

    skill("ttSixes", "The 6 times table", "5 lots and 1 more lot",
          "6 lots is 5 lots and 1 more lot. 7 × 6 is 35 + 7 = 42.",
          "Or double the 3s: 4 × 3 = 12, so 4 × 6 = 24.",
          [("8 × 6", "8 × 5 = 40. Add one more 8: 48."), ("6 × 6", "6 × 5 = 30. Add one more 6: 36.")],
          ("An egg box holds 6 eggs in two rows of 3. So the 6s are just the 3s doubled: 4 boxes hold double 12, which is 24 eggs.",
           "● ● ●\n● ● ●\n1 box = 6 eggs"),
          {"board": "7 × 6", "kind": "math", "steps": [
              say("A trick for 6s: do the 5s, then add one more lot."),
              ask("What is 7 × 5?", ["35", "30"], hint="Count in 5s seven times: 5, 10, 15, 20, 25, 30, 35.", line="7 × 5 = 35"),
              ask("Add one more 7. 35 + 7 is:", ["42", "41"], hint="35 + 5 = 40, then 2 more.", line="35 + 7 = 42"),
              ask("So 7 × 6 is:", ["42", "35"], then="Check with doubling: 7 × 3 = 21, and double 21 is 42.", hint="35 is only 5 lots of 7.", line="7 × 6 = 42 ✓"),
          ]},
          [q("4 × 3 = 12. What is 4 × 6?", ["24", "18", "15"], "6 is double 3, so double 12: 24."),
           q("What is 6 × 5?", ["30", "11", "36"], "Count in 5s six times: 5, 10, 15, 20, 25, 30.")]),

    skill("ttSplitIt", "The 7 times table", "Split 7 into 5 and 2",
          "7 lots is 5 lots and 2 lots. Work out both and add them.",
          "7 × 8: 5 × 8 = 40 and 2 × 8 = 16. 40 + 16 = 56.",
          [("7 × 6", "5 × 6 = 30, 2 × 6 = 12. 30 + 12 = 42."), ("7 × 7", "5 × 7 = 35, 2 × 7 = 14. 35 + 14 = 49.")],
          ("A week has 7 days: 5 school days and 2 weekend days. 3 weeks is 15 school days and 6 weekend days: 21 days.",
           "1 week = 5 + 2 = 7 days\n3 weeks = 15 + 6 = 21 days"),
          {"board": "7 × 8", "kind": "math", "steps": [
              say("7 is 5 and 2. So 7 lots of 8 is 5 lots of 8 and 2 lots of 8."),
              ask("5 × 8 is:", ["40", "35"], hint="Count in 5s eight times: 5, 10, 15, 20, 25, 30, 35, 40.", line="5 × 8 = 40"),
              ask("2 × 8 is:", ["16", "10"], hint="Double 8: 8 + 8.", line="2 × 8 = 16"),
              ask("Add them. 40 + 16 is:", ["56", "54"], hint="40 + 10 = 50, then 6 more.", line="40 + 16 = 56"),
              say("So 7 × 8 = 56. A rhyme helps: 5, 6, 7, 8. 56 is 7 × 8!"),
          ]},
          [q("What is 7 × 3?", ["21", "24", "10"], "5 × 3 = 15 and 2 × 3 = 6. 15 + 6 = 21."),
           q("7 × 4 is 5 × 4 and what else?", ["2 × 4", "7 × 2", "4"], "7 lots is 5 lots and 2 lots, so add 2 × 4: 20 + 8 = 28.")]),

    skill("ttNines", "The 9 times table", "10 lots take away 1 lot",
          "9 lots is 10 lots take away 1 lot. 9 × 6 is 60 − 6 = 54.",
          "Check it: up to 10 × 9, the digits of a 9s answer add up to 9. 54: 5 + 4 = 9.",
          [("9 × 4", "40 − 4 = 36. Check: 3 + 6 = 9."), ("9 × 7", "70 − 7 = 63. Check: 6 + 3 = 9.")],
          ("Hold up 10 fingers. For 9 × 3, fold down your third finger. There are 2 fingers before it and 7 after it: 27.",
           "Fold finger 3\n2 fingers | 7 fingers\n9 × 3 = 27"),
          {"board": "9 × 6", "kind": "math", "steps": [
              say("9 is one less than 10. So 9 lots is 10 lots take away 1 lot."),
              ask("First, 10 × 6 is:", ["60", "16"], hint="The 6 moves to the tens place.", line="10 × 6 = 60"),
              ask("Take away one 6. 60 − 6 is:", ["54", "56"], hint="Count back 6 from 60: 59, 58, 57, 56, 55, 54.", line="60 − 6 = 54"),
              ask("Check: do 5 and 4 add up to 9?", ["Yes", "No"], then="5 + 4 = 9. So 9 × 6 = 54.", hint="5 + 4: count on 4 from 5.", line="9 × 6 = 54 ✓"),
          ]},
          [q("What is 9 × 5?", ["45", "50", "54"], "10 × 5 = 50. Take away one 5: 45."),
           q("What is 9 × 8?", ["72", "81", "64"], "80 − 8 = 72. Check: 7 + 2 = 9.")]),

    skill("ttElevens", "The 11 times table", "Say the number twice",
          "Up to 9 × 11, the answer is the number written twice. 4 × 11 = 44.",
          "For 10, 11 and 12, use 10 lots and 1 more lot: 12 × 11 = 120 + 12 = 132.",
          [("6 × 11", "Write 6 twice: 66."), ("11 × 11", "110 + 11 = 121.")],
          ("11 looks like twins: 1 and 1. Multiply it by a number up to 9 and you get twins too: 3 × 11 = 33.",
           "2 → 22\n5 → 55\n8 → 88"),
          {"board": "12 × 11", "kind": "math", "steps": [
              say("Up to 9 × 11, write the number twice, like 7 × 11 = 77. 12 is too big for that trick, so use 10 lots and 1 more lot."),
              ask("12 × 10 is:", ["120", "112"], hint="The digits of 12 move one place to the left.", line="12 × 10 = 120"),
              ask("Add one more 12. 120 + 12 is:", ["132", "122"], hint="120 + 10 = 130, then 2 more.", line="120 + 12 = 132"),
              ask("So 12 × 11 is:", ["132", "1212"], then="10 lots and 1 more lot makes 11 lots.", hint="Writing it twice only works up to 9.", line="12 × 11 = 132 ✓"),
          ]},
          [q("What is 7 × 11?", ["77", "71", "18"], "Up to 9, write the number twice: 77."),
           q("What is 10 × 11?", ["110", "1010", "100"], "The digits of 11 move one place to the left: 110.")]),

    skill("ttTwelves", "The 12 times table", "10 lots and 2 lots",
          "12 lots is 10 lots and 2 lots. 4 × 12 = 40 + 8 = 48.",
          "Do the 10s (easy), then double the number, then add them.",
          [("6 × 12", "6 × 10 = 60, 6 × 2 = 12. 60 + 12 = 72."), ("8 × 12", "80 + 16 = 96.")],
          ("A dozen eggs is 12: a row of 10 and 2 spare. 3 dozen is 3 rows of 10 and 3 lots of 2 spare: 30 + 6 = 36.",
           "12 = 10 + 2\n3 × 12 = 30 + 6 = 36"),
          {"board": "7 × 12", "kind": "math", "steps": [
              say("12 is 10 and 2. So 7 × 12 is 7 × 10 and 7 × 2."),
              ask("7 × 10 is:", ["70", "17"], hint="The 7 moves to the tens place.", line="7 × 10 = 70"),
              ask("7 × 2 is:", ["14", "9"], hint="Double 7: 7 + 7.", line="7 × 2 = 14"),
              ask("70 + 14 is:", ["84", "74"], hint="70 + 10 = 80, then 4 more.", line="70 + 14 = 84"),
              say("So 7 × 12 = 84."),
          ]},
          [q("What is 3 × 12?", ["36", "32", "15"], "3 × 10 = 30 and 3 × 2 = 6. 30 + 6 = 36."),
           q("What is 5 × 12?", ["60", "52", "17"], "5 × 10 = 50 and 5 × 2 = 10. 50 + 10 = 60.")]),

    skill("ttFactFamilies", "Times and divide are a family", "Use a times fact to divide",
          "Every times fact has two divide facts. 4 × 5 = 20, so 20 ÷ 5 = 4 and 20 ÷ 4 = 5.",
          "For 24 ÷ 6, ask: what times 6 makes 24? 4 × 6 = 24, so the answer is 4.",
          [("3 × 5 = 15", "So 15 ÷ 5 = 3 and 15 ÷ 3 = 5."), ("30 ÷ 10", "What times 10 makes 30? 3. So 30 ÷ 10 = 3.")],
          ("Three numbers live in one house: 2, 5 and 10. They can make four facts together.",
           "2 × 5 = 10\n5 × 2 = 10\n10 ÷ 5 = 2\n10 ÷ 2 = 5"),
          {"board": "18 ÷ 3", "kind": "math", "steps": [
              say("÷ asks: how many 3s make 18? A times fact can tell us."),
              ask("Which times fact has 3 and 18 in it?", ["6 × 3 = 18", "3 × 3 = 9"], hint="We need the answer to be 18.", line="6 × 3 = 18"),
              ask("So 18 ÷ 3 is:", ["6", "15"], hint="15 is 18 take away 3. Divide asks how many 3s.", line="18 ÷ 3 = 6 ✓"),
              say("The same family also gives 18 ÷ 6 = 3."),
          ]},
          [q("5 × 4 = 20. What is 20 ÷ 4?", ["5", "16", "80"], "Same family: 5 × 4 = 20, so 20 ÷ 4 = 5."),
           q("What is 14 ÷ 2?", ["7", "12", "16"], "7 × 2 = 14, so 14 ÷ 2 = 7.")]),

    skill("ttSharing", "Sharing equally", "÷ means share fairly",
          "÷ can mean share out equally, so everyone gets the same. 12 ÷ 3 means share 12 between 3.",
          "Deal them out one at a time, like cards, until they are all gone. Or use a times fact: 4 × 3 = 12, so each gets 4.",
          [("10 ÷ 2", "Share 10 sweets between 2 friends: 5 each."), ("15 ÷ 5", "Share 15 stickers between 5 children: 3 each, because 3 × 5 = 15.")],
          ("Share a pizza with 8 slices between 4 people. Everyone gets the same, so nobody grumbles: 2 slices each.",
           "8 slices ÷ 4 people = 2 each"),
          {"board": "Share 12 grapes equally between 4 friends.", "kind": "text", "steps": [
              say("Sharing equally means every friend gets the same number."),
              ask("Give each friend 1 grape. How many grapes have you given out?", ["4", "1"], then="4 given out, 8 left.", hint="There are 4 friends, and each got 1.", line="1 each: 8 left"),
              ask("Give each friend 1 more. How many grapes are left?", ["4", "6"], hint="8 take away 4.", line="2 each: 4 left"),
              ask("One more each. How many are left now?", ["0", "2"], hint="4 take away 4.", line="3 each: 0 left"),
              ask("So how many grapes does each friend get?", ["3", "4"], then="12 ÷ 4 = 3. Check: 3 × 4 = 12.", hint="4 is the number of friends. Count the rounds.", line="12 ÷ 4 = 3 ✓"),
          ]},
          [q("Share 6 apples equally between 2 children. How many each?", ["3", "4", "8"], "6 ÷ 2 = 3, because 3 × 2 = 6."),
           q("Share 20p equally between 5 friends. How much each?", ["4p", "5p", "15p"], "20 ÷ 5 = 4, because 4 × 5 = 20.")]),

    skill("ttStoryWords", "Times table stories", "Spot the times or divide words",
          "Each, every, lots of and groups of mean times. Share equally, split into and how many groups mean divide.",
          "Draw it! A quick sketch of the plates, bags or legs shows whether you are making a big pile or sharing out.",
          [("3 bags with 5 sweets in each", "\"Each\" means times: 3 × 5 = 15 sweets."), ("Share 16 stickers between 4", "\"Share\" means divide: 16 ÷ 4 = 4 stickers each.")],
          ("If the story ends with one big pile, you are putting groups together: times. If it ends with lots of small piles, you are sharing out: divide.",
           "groups → one pile: ×\none pile → groups: ÷"),
          {"board": "A hen lays 2 eggs every day. How many eggs does she lay in 5 days?", "kind": "text", "steps": [
              ask("Which word is the clue?", ["every", "hen"], hint="Look for each, every or lots of.", line="every → times"),
              ask("So the number sentence is:", ["5 × 2", "5 + 2"], hint="5 days with 2 eggs each day is 5 lots of 2.", line="5 × 2"),
              ask("5 × 2 is:", ["10", "7"], hint="Double 5.", line="5 × 2 = 10"),
              say("Say the answer with its word: 10 eggs."),
          ]},
          [q("4 children each have 3 pencils. How many pencils is that?", ["12", "7", "1"], "\"Each\" means times: 4 × 3 = 12 pencils."),
           q("18 cakes are shared equally onto 2 plates. Which number sentence finds how many go on each plate?", ["18 ÷ 2", "18 × 2", "18 − 2"], "\"Shared equally\" means divide: 18 ÷ 2 = 9.")]),

    skill("ttStoryGroups", "How many groups?", "Count up in the table",
          "When a story tells you the total and how many are in each group, count up in that times table until you reach the total. The number of counts is the answer.",
          "Use your fingers: one finger for each count. 5, 10, 15, 20 is four fingers, so 20 ÷ 5 = 4.",
          [("15 wheels, 3 on each tricycle", "Count in 3s: 3, 6, 9, 12, 15. That is 5 tricycles."), ("12 socks put into pairs", "Count in 2s up to 12: 2, 4, 6, 8, 10, 12. That is 6 pairs.")],
          ("Packing eggs into boxes of 6 is the same thing. Keep filling boxes until the eggs run out, then count the boxes.",
           "18 eggs: 6, 12, 18\n3 boxes"),
          {"board": "A tricycle has 3 wheels. Ben counts 12 wheels. How many tricycles are there?", "kind": "text", "steps": [
              ask("What does the story tell us?", ["The total (12) and how many in each group (3)", "How many tricycles there are"], hint="We know all the wheels, and the wheels on one tricycle.", line="12 wheels, 3 on each"),
              say("Count up in 3s until you reach 12. Put up one finger each time."),
              ask("3, 6, 9 ... what comes next?", ["12", "10"], hint="Add 3 more to 9.", line="3, 6, 9, 12"),
              ask("How many numbers did you say?", ["4", "3"], hint="3, 6, 9, 12. Count them on your fingers.", line="4 counts"),
              ask("So how many tricycles are there?", ["4", "12"], then="12 ÷ 3 = 4. Check: 4 × 3 = 12.", hint="12 is the number of wheels. Count the tricycles.", line="12 ÷ 3 = 4 ✓"),
          ]},
          [q("Eggs go in boxes of 10. How many boxes do 40 eggs fill?", ["4", "30", "50"], "Count in 10s: 10, 20, 30, 40. That is 4 boxes."),
           q("A table has 4 legs. There are 20 legs. How many tables are there?", ["5", "16", "24"], "Count in 4s: 4, 8, 12, 16, 20. That is 5 tables, because 5 × 4 = 20.")]),

    skill("ttEights", "The 8 times table", "Double three times",
          "× 8 means double, double and double again. 5 × 8: 5, 10, 20, 40.",
          "Already know the 4s? Just double the 4s answer once more. 6 × 4 = 24, so 6 × 8 = 48.",
          [("3 × 8", "Double 3 is 6, double 6 is 12, double 12 is 24."), ("9 × 8", "Double 9 is 18, then 36, then 72.")],
          ("An octopus has 8 arms. That is double a dog's 4 legs, and a dog has double your 2 legs. Each step is a double.",
           "You: 2\nDog: 4\nOctopus: 8"),
          {"board": "6 × 8", "kind": "math", "steps": [
              say("× 8 is three doubles in a row. Start with the 6."),
              ask("Double 6 is:", ["12", "8"], hint="Double means 6 + 6.", line="6 → 12"),
              ask("Double 12 is:", ["24", "14"], hint="10 + 10 = 20 and 2 + 2 = 4.", line="12 → 24"),
              ask("Double 24 is:", ["48", "44"], hint="20 + 20 = 40 and 4 + 4 = 8.", line="24 → 48"),
              ask("So 6 × 8 is:", ["48", "24"], then="Three doubles: 12, 24, 48.", hint="24 is only two doubles. × 8 needs three.", line="6 × 8 = 48 ✓"),
          ]},
          [q("What is 4 × 8?", ["32", "16", "12"], "Double 4 is 8, then 16, then 32."),
           q("7 × 4 = 28. What is 7 × 8?", ["56", "32", "35"], "8 is double 4, so double 28: 56.")]),

    skill("ttNearFacts", "Use a fact you know", "One more lot or one less lot",
          "Stuck on a fact? Start from a fact you know that is next door, then add or take away one lot.",
          "8 × 7: you might know 7 × 7 = 49. 8 lots is one more 7: 49 + 7 = 56.",
          [("6 × 7", "6 × 6 = 36. One more 6: 36 + 6 = 42."), ("9 × 6", "10 × 6 = 60. One less 6: 60 − 6 = 54.")],
          ("It is like climbing stairs. If you know you are on step 49, the next 7s step is just 7 more up: 56.",
           "7 × 7 = 49\n8 × 7 = 49 + 7 = 56"),
          {"board": "8 × 6", "kind": "math", "steps": [
              say("8 × 6 means 8 lots of 6. Do you know a fact next door to it?"),
              ask("Which fact is next door to 8 lots of 6?", ["7 lots of 6", "8 + 6"], hint="Next door means one lot fewer: 7 lots of 6.", line="7 × 6 = 42"),
              ask("8 lots is one more lot than 7 lots. So add one more:", ["6", "8"], hint="Each lot is a 6.", line="42 + 6"),
              ask("42 + 6 is:", ["48", "46"], hint="42 + 6: count on 43, 44, 45, 46, 47, 48.", line="42 + 6 = 48"),
              ask("So 8 × 6 is:", ["48", "42"], then="A fact you know plus one more lot.", hint="42 is only 7 lots of 6.", line="8 × 6 = 48 ✓"),
          ]},
          [q("6 × 6 = 36. What is 7 × 6?", ["42", "37", "36"], "7 lots is one more lot of 6: 36 + 6 = 42."),
           q("10 × 9 = 90. What is 9 × 9?", ["81", "89", "99"], "9 lots is one less lot of 9: 90 − 9 = 81.")]),

    skill("ttCountInElevens", "Counting in 11s", "Add 10, then add 1",
          "To count on in 11s, add 10 and then add 1 more. 11, 22, 33, 44 ... 99, 110, 121, 132.",
          "After 99 the twins stop. Keep going the same way: 99 + 10 = 109, then 1 more is 110.",
          [("44 + 11", "44 + 10 = 54, then 1 more: 55."), ("110 + 11", "110 + 10 = 120, then 1 more: 121.")],
          ("Climb 11 stairs at a time: a big jump of 10, then one little hop.",
           "11 → 22 → 33 → 44\nbig jump 10, little hop 1"),
          {"board": "88, 99, ?", "kind": "math", "steps": [
              say("These numbers count in 11s. To find the next one, add 11."),
              ask("Adding 11 is the same as:", ["Add 10, then add 1", "Add 1, then add 1"], hint="11 is 10 and 1.", line="+ 11 = + 10, + 1"),
              ask("99 + 10 is:", ["109", "100"], hint="The tens go up by one: 9 tens becomes 10 tens, with 9 ones left.", line="99 + 10 = 109"),
              ask("Now add 1 more. 109 + 1 is:", ["110", "1010"], hint="Count on 1 from 109.", line="109 + 1 = 110"),
              say("So the next number is 110. That is 10 × 11."),
          ]},
          [q("Count in 11s: 22, 33, 44. What comes next?", ["55", "45", "54"], "44 + 10 = 54, then 1 more: 55."),
           q("Count in 11s: 99, 110. What comes next?", ["121", "111", "120"], "110 + 10 = 120, then 1 more: 121.")]),

    skill("ttDozens", "Counting in 12s", "Add 10, then add 2",
          "To count on in 12s, add 10 and then add 2 more. 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144.",
          "12 is a dozen. A box of a dozen eggs is 12, two boxes are 24, three boxes are 36.",
          [("36 + 12", "36 + 10 = 46, then 2 more: 48."), ("96 + 12", "96 + 10 = 106, then 2 more: 108.")],
          ("There are 12 months in a year. Each birthday adds 12 more months: 1 year is 12 months, 2 years is 24, 3 years is 36.",
           "1 year → 12 months\n2 years → 24 months\n3 years → 36 months"),
          {"board": "24, 36, 48, ?", "kind": "math", "steps": [
              say("These numbers count in 12s. To find the next one, add 12."),
              ask("Adding 12 is the same as:", ["Add 10, then add 2", "Add 1, then add 2"], hint="12 is 10 and 2.", line="+ 12 = + 10, + 2"),
              ask("48 + 10 is:", ["58", "49"], hint="Add one ten: 4 tens becomes 5 tens.", line="48 + 10 = 58"),
              ask("Now add 2 more. 58 + 2 is:", ["60", "59"], hint="Count on 2 from 58: 59, 60.", line="58 + 2 = 60"),
              say("So the next number is 60. That is 5 × 12."),
          ]},
          [q("Count in 12s: 12, 24, 36. What comes next?", ["48", "46", "38"], "36 + 10 = 46, then 2 more: 48."),
           q("Count in 12s: 72, 84. What comes next?", ["96", "94", "86"], "84 + 10 = 94, then 2 more: 96.")]),

    skill("ttHalving", "Dividing by 2", "÷ 2 means halve it",
          "Dividing by 2 means finding half. Half splits a number into two equal parts.",
          "Use your doubles backwards. Double 7 is 14, so half of 14 is 7.",
          [("16 ÷ 2", "Double 8 is 16, so half of 16 is 8."), ("22 ÷ 2", "Half of 20 is 10 and half of 2 is 1. 10 + 1 = 11.")],
          ("Two children share a bag of 10 sweets so it is fair. Each child gets half: 5.",
           "10 sweets\n5 | 5"),
          {"board": "18 ÷ 2", "kind": "math", "steps": [
              say("÷ 2 means split it into two equal halves."),
              ask("Which double makes 18?", ["Double 9", "Double 8"], hint="Double 8 is 16. We need 18.", line="9 + 9 = 18"),
              ask("So half of 18 is:", ["9", "16"], hint="The double was 9 + 9.", line="18 ÷ 2 = 9"),
              ask("Check: is double 9 the same as 18?", ["Yes", "No"], then="Halving undoes doubling.", hint="9 + 9: count on 9 from 9.", line="18 ÷ 2 = 9 ✓"),
          ]},
          [q("What is 12 ÷ 2?", ["6", "10", "14"], "Double 6 is 12, so half of 12 is 6."),
           q("What is half of 20?", ["10", "18", "40"], "Double 10 is 20, so half of 20 is 10.")]),

    skill("ttDivideTens", "Dividing by 10", "The digits move one place back",
          "When you divide by 10, the digits move one place to the right. 60 ÷ 10: the 6 moves from the tens to the ones. The answer is 6.",
          "It undoes × 10. 8 × 10 = 80, so 80 ÷ 10 = 8.",
          [("50 ÷ 10", "5 tens become 5 ones: 5."), ("120 ÷ 10", "The digits slide one place right: 12.")],
          ("Swap 40p for 10p coins. 40p is 4 coins of 10p.",
           "40p = 10p + 10p + 10p + 10p\n4 coins"),
          {"board": "90 ÷ 10", "kind": "math", "steps": [
              say("Dividing by 10 makes a number ten times smaller. The digits slide one place to the right."),
              ask("90 is 9 tens. After ÷ 10 it becomes:", ["9 ones", "9 hundreds"], hint="One place to the right: from tens to ones.", line="9 tens → 9 ones"),
              ask("So 90 ÷ 10 is:", ["9", "80"], hint="80 is 90 take away 10. Divide asks how many 10s.", line="90 ÷ 10 = 9"),
              ask("Check: what is 9 × 10?", ["90", "19"], then="× 10 and ÷ 10 undo each other.", hint="The 9 moves to the tens place.", line="9 × 10 = 90 ✓"),
          ]},
          [q("What is 30 ÷ 10?", ["3", "20", "300"], "3 tens become 3 ones: 3."),
           q("How many 10p coins make 70p?", ["7", "60", "17"], "70 ÷ 10 = 7, because 7 × 10 = 70.")]),

    skill("ttStoryRows", "Rows in a story", "Rows and how many in each",
          "When things are set out in rows with the same number in every row, multiply: number of rows × how many in each row.",
          "Draw dots: one line of dots for each row. 3 rows of 4 is 3 × 4 = 12.",
          [("2 rows of 6 chairs", "2 × 6 = 12 chairs."), ("5 rows of 3 cakes", "5 × 3 = 15 cakes.")],
          ("Look at a box of chocolates. 3 rows with 5 in each row is 15 chocolates, and you can check by counting them.",
           "● ● ● ● ●\n● ● ● ● ●\n● ● ● ● ●\n3 rows of 5 = 15"),
          {"board": "Mia puts 4 rows of plants in her garden. There are 3 plants in each row. How many plants are there?", "kind": "text", "steps": [
              ask("How many rows are there?", ["4", "3"], hint="Read the first sentence: 4 rows.", line="4 rows"),
              ask("How many plants are in each row?", ["3", "4"], hint="Read the second sentence.", line="3 in each row"),
              ask("So the number sentence is:", ["4 × 3", "4 + 3"], hint="4 rows with 3 in each is 4 lots of 3.", line="4 × 3"),
              ask("4 × 3 is:", ["12", "7"], then="Say it with its word: 12 plants.", hint="Count in 3s four times: 3, 6, 9, 12.", line="4 × 3 = 12 ✓"),
          ]},
          [q("A tray has 2 rows of buns with 5 buns in each row. How many buns?", ["10", "7", "25"], "2 rows of 5: 2 × 5 = 10 buns."),
           q("There are 3 rows of chairs with 10 chairs in each row. How many chairs?", ["30", "13", "40"], "3 × 10 = 30 chairs.")]),

    skill("ttStoryMoney", "Money stories", "Price × how many",
          "When each thing costs the same, multiply the price by how many you buy. p means pence.",
          "Keep the p on your answer. 4 lollies at 5p each is 4 × 5 = 20, so 20p.",
          [("3 apples at 10p each", "3 × 10 = 30, so 30p."), ("6 stickers at 2p each", "6 × 2 = 12, so 12p.")],
          ("At a cake sale every cake costs 5p. Buy 1 for 5p, 2 for 10p, 3 for 15p. Count in 5s for each cake.",
           "1 cake → 5p\n2 cakes → 10p\n3 cakes → 15p"),
          {"board": "A rubber costs 5p. Leo buys 4 rubbers. How much does he spend?", "kind": "text", "steps": [
              ask("How much does one rubber cost?", ["5p", "4p"], hint="Read the first sentence.", line="1 rubber = 5p"),
              ask("How many rubbers does Leo buy?", ["4", "5"], hint="Read the second sentence.", line="4 rubbers"),
              ask("So the number sentence is:", ["4 × 5", "4 + 5"], hint="4 rubbers at 5p each is 4 lots of 5p.", line="4 × 5"),
              ask("4 × 5 is:", ["20", "9"], then="Remember the p: Leo spends 20p.", hint="Count in 5s four times: 5, 10, 15, 20.", line="4 × 5 = 20, so 20p ✓"),
          ]},
          [q("A balloon costs 2p. How much do 7 balloons cost?", ["14p", "9p", "72p"], "7 × 2 = 14, so 14p."),
           q("A pencil costs 10p. How much do 5 pencils cost?", ["50p", "15p", "51p"], "5 × 10 = 50, so 50p.")]),
]

out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "data", "v2", "basics", "timestables.json")
with open(out, "w") as f:
    json.dump(SKILLS, f, indent=2, ensure_ascii=False)
    f.write("\n")
print(f"{len(SKILLS)} skills -> data/v2/basics/timestables.json")
