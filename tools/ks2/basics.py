#!/usr/bin/env python3
"""Writes data/v2/basics/ks2.json: the KS2 Basics skills (rule card, ELI5,
click-through walkthrough and two quick questions each), in the words of a
Year 6 class and British spelling. Run from the repo root:
    python3 -I tools/ks2/basics.py
The shared `apostrophes` skill is reused as is; everything else is here.
"""
import json, os


def skill(id, name, sub, rule, trick, examples, another, walkthrough, questions, **extra):
    s = {"id": id, "name": name, "sub": sub, "rule": rule, "trick": trick, "examples": examples,
         "another": {"text": another[0], "example": another[1]}}
    s.update(extra)
    s["walkthrough"] = walkthrough
    s["questions"] = questions
    return s


def eg(text, note=None):
    return {"kind": "eg", "text": text, **({"note": note} if note else {})}


def good(text, note=None):
    return {"kind": "good", "text": text, **({"note": note} if note else {})}


def bad(text, note=None):
    return {"kind": "bad", "text": text, **({"note": note} if note else {})}


def say(text):
    return {"say": text}


def ask(q, options, answer=0, hint=None, then=None, line=None):
    s = {"ask": q, "options": options, "answer": answer}
    if then: s["then"] = then
    if hint: s["hint"] = hint
    if line: s["line"] = line
    return s


def q(stem, options, answer, why, **kw):
    return {"stem": stem, "options": options, "answer": answer, "why": why, **kw}


def b(blank, options, answer, why):
    return {"blank": blank, "options": options, "answer": answer, "why": why}


SKILLS = [
    # ---------- Reading ----------
    skill("ks2Retrieval", "Find it in the text", "Retrieval questions",
          "A retrieval question asks what the text actually says. The answer is written there; your job is to find it, not to remember or guess.",
          "Find the key word from the question in the text, then read the sentence around it. Put your finger on the words that prove your answer.",
          [good("Where did Kai hide the map? Under the loose floorboard.", "Finger on: 'he slid the map under the loose floorboard'."),
           bad("Where did Kai hide the map? In his bag.", "It sounds likely, but the text never says it.")],
          ("It's like a treasure hunt where the treasure is a few words. The question tells you what to look for. Don't guess where it is: go and dig it up.",
           "Question: What colour was the boat?\nKey word: boat\nText: '...the little red boat...'\nAnswer: red"),
          {"passage": True, "steps": [
              say("Retrieval means finding the answer in the text. First, pick out the key word in the question."),
              ask("Question: where did Kai hide the map? What is the key word to look for?", ["map", "where"], 0,
                  hint="'Where' is in lots of questions. Look for the thing the question is about.", line="Key word: map"),
              ask("Find 'map' in the text. Which words answer the question?", ["'under the loose floorboard'", "'before his sister came home'"], 0,
                  then="That tells us where. The other words tell us when.", line="Finger on: under the loose floorboard"),
              ask("One answer says 'in his bag'. Can you put your finger on that in the text?", ["No, it isn't there", "Yes"], 0,
                  then="It might sound sensible, but it isn't in the text, so it's a guess.", line="'In his bag' ✗ not in the text"),
          ]},
          [q("Why did Ruby run back to the house?", ["She had forgotten her lunch", "It started to rain", "Her dog was barking"], 0,
             "The text says she 'remembered her lunch was still on the table'. Finger on those words.",
             passage="Ruby was halfway to the bus stop when she remembered her lunch was still on the table. She turned and ran back to the house, her bag bouncing on her back."),
           q("How long do baby owls stay in the nest?", ["About two months", "About two weeks", "About two years"], 0,
             "The text says 'about two months'. Weeks and years are never mentioned, so they are guesses.",
             passage="Barn owl chicks stay in the nest for about two months. During that time, their parents bring them mice, voles and shrews.")],
          passage="Kai waited until the house was quiet. Then, before his sister came home, he slid the map under the loose floorboard and pushed the rug back over it."),
    skill("ks2Inference", "Read between the lines", "Inference questions",
          "An inference is something the text shows but does not say. You work it out from clues, and you can point to the clues that prove it.",
          "Ask: what do the clues add up to? Then check: can I point to the words that made me think it? If not, it's a guess.",
          [good("Ellie is nervous.", "Clues: her hands shook and she kept checking the clock."),
           bad("Ellie is ill.", "Nothing in the text points to that.")],
          ("You come home and see muddy paw prints and an empty biscuit plate. Nobody told you the dog ate the biscuits, but the clues make it the only answer that fits. That is an inference.",
           "Clues: muddy paw prints, empty plate\nInference: the dog ate the biscuits\nGuess: the dog is sad ✗"),
          {"passage": True, "steps": [
              say("An inference is not written in the text. You add up the clues, like a detective."),
              ask("Clue 1: Ellie's hands shook. What is clue 2?", ["She kept checking the clock", "It was Tuesday"], 0,
                  hint="Which detail tells us how Ellie is feeling?", line="Clues: shaking hands, checking the clock"),
              ask("Put the clues together. Ellie is probably:", ["Nervous", "Bored"], 0,
                  then="Shaking hands and clock-watching both point to nerves before her turn.", hint="Bored people don't usually shake.", line="Inference: Ellie is nervous"),
              ask("Someone says 'Ellie is ill'. Is that a good inference?", ["No, no clue points there", "Yes"], 0,
                  then="A good inference comes from the clues. 'Ill' is a guess.", line="'Ill' ✗ no clue"),
          ]},
          [q("How is Dan feeling?", ["Disappointed", "Excited", "Angry"], 0,
             "He looked at the floor and said 'It doesn't matter' quietly. Those clues show disappointment.",
             passage="When the team list went up, Dan looked for his name twice. Then he looked at the floor. 'It doesn't matter,' he said quietly."),
           q("What can you tell about the weather?", ["It was very cold", "It was very hot", "It was raining"], 0,
             "Frosty grass, gloves and breath like clouds are all clues that it was cold.",
             passage="The grass crunched with frost under Amira's boots. She pulled on a second pair of gloves and watched her breath puff out like little clouds.")],
          passage="Ellie's hands shook as she waited by the stage door. She kept checking the clock. Only two more acts before her turn."),
    skill("ks2WordMeaning", "What does the word mean here?", "Words in context",
          "Some words have more than one meaning. The words around them tell you which meaning the writer is using.",
          "Cover the word and read the sentence. Say your own word for the gap, then pick the answer closest to yours.",
          [good("'The sea was rough': rough means wild and choppy.", "Cover it: the sea was ___. Stormy."),
           bad("'Rough' means bumpy to touch.", "That meaning is real, but it doesn't fit the sea here.")],
          ("Words can have two jobs. 'Cool' can mean a bit cold or brilliant. The words around it tell you which job it's doing right now.",
           "The soup is cool now. → a bit cold\nThat trick was cool! → brilliant"),
          {"passage": True, "steps": [
              say("Lots of words have more than one meaning. The sentence tells you which one."),
              ask("Cover 'rough': 'The sea was ___ and the little boat rocked.' What's your word for the gap?", ["Stormy", "Sandy"], 0,
                  then="A sea that rocks a boat is stormy and choppy.", line="My word: stormy"),
              ask("So in this sentence, 'rough' means:", ["Wild and choppy", "Bumpy to touch"], 0,
                  then="You can't touch the sea's surface like sandpaper. The wild meaning fits.", line="rough = wild and choppy, here"),
              ask("Try another: 'Her plan was sound.' Cover 'sound'. Your word?", ["Sensible", "Noisy"], 0,
                  then="A plan can't be noisy. A sound plan is a good, sensible one.", line="sound = sensible, here"),
          ]},
          [q("'The fox was bright enough to wait until dark.' What does 'bright' mean here?", ["Clever", "Shiny", "Colourful"], 0,
             "A fox that waits for the right moment is clever. Shiny doesn't fit waiting."),
           q("'Jamal had to address the whole school.' What does 'address' mean here?", ["Speak to", "Write on an envelope", "Where someone lives"], 0,
             "You speak to a whole school in assembly. The other meanings don't fit the sentence.")],
          passage="The sea was rough and the little boat rocked from side to side."),
    # ---------- Grammar ----------
    skill("ks2WordClasses", "Word classes", "Noun, verb, adjective, adverb",
          "Every word has a job. Nouns name things, verbs are actions or being, adjectives describe nouns, and adverbs describe how, when or where something happens.",
          "Look at the job, not the word: 'swim' is a verb in 'I swim' but a noun in 'a swim'. Try putting 'the' in front: if it works, it's probably a noun.",
          [eg("The happy dog ran quickly.", "dog: noun. ran: verb. happy: adjective. quickly: adverb.")],
          ("Think of a football team. Every player has a job: one saves, one scores. Words are the same. The noun is the thing, the verb is what it does, the adjective is its kit, and the adverb is how it plays.",
           "The (red) team (played) (brilliantly).\nadjective · verb · adverb"),
          {"board": "The happy dog ran quickly.", "kind": "text", "steps": [
              say("Each word in a sentence has a job. Let's find the job of each one."),
              ask("Which word names a thing (the noun)?", ["dog", "ran"], 0, hint="You can put 'the' in front of a noun: the dog.", line="dog = noun"),
              ask("Which word is the action (the verb)?", ["ran", "happy"], 0, hint="What did the dog do?", line="ran = verb"),
              ask("'Happy' describes the dog. So it is:", ["An adjective", "An adverb"], 0, then="Adjectives describe nouns.", line="happy = adjective"),
              ask("'Quickly' tells us how the dog ran. So it is:", ["An adverb", "An adjective"], 0,
                  then="Adverbs tell us how, when or where. Many end in -ly.", hint="It describes the verb, not the noun.", line="quickly = adverb ✓"),
          ]},
          [q("What word class is 'bravely' in: 'The firefighter bravely climbed the ladder'?", ["Adverb", "Adjective", "Noun"], 0,
             "It tells us how the firefighter climbed, so it is an adverb."),
           q("What word class is 'jump' in: 'That was a huge jump!'?", ["Noun", "Verb", "Adjective"], 0,
             "'A jump' is a thing here, so it is a noun. In 'I jump', it would be a verb.")]),
    skill("ks2RelativeClauses", "Relative clauses", "who, which, where, when, whose, that",
          "A relative clause adds information about a noun. It starts with a relative pronoun: who, which, where, when, whose or that.",
          "Find the noun, then look straight after it for who, which or that. Use who for people and which for things.",
          [good("The girl who won the race was delighted.", "who won the race tells us which girl."),
           good("Our car, which is very old, broke down.", "which is very old tells us about the car.")],
          ("A relative clause is like a name tag on a noun. 'The girl' could be anyone. 'The girl who won the race' tells you exactly who.",
           "The dog → which dog?\nThe dog that barks at night"),
          {"board": "The woman who runs the bakery has a red van.", "kind": "text", "steps": [
              say("A relative clause gives extra information about a noun. It starts with a relative pronoun."),
              ask("Which word is the relative pronoun?", ["who", "runs"], 0, hint="Look for who, which, where, when, whose or that.", line="Relative pronoun: who"),
              ask("Which noun does the relative clause tell us about?", ["woman", "red van"], 0,
                  then="It comes straight after 'woman' and tells us which woman.", line="Noun: woman"),
              ask("So the relative clause is:", ["who runs the bakery", "has a red van"], 0, line="Relative clause: who runs the bakery ✓"),
              ask("For a thing, like a bike, which pronoun fits? 'My bike, ___ is red, has a flat tyre.'", ["which", "who"], 0,
                  then="'Who' is for people. 'Which' is for things.", line="things: which · people: who"),
          ]},
          [b("The teacher __ runs the choir is called Mr Shah.", ["who", "which", "where"], 0,
             "The teacher is a person, so use who."),
           b("This is the park __ we had our picnic.", ["where", "who", "whose"], 0,
             "The clause tells us about a place, so use where.")]),
    skill("ks2ActivePassive", "Active and passive", "Who did it, or what it was done to",
          "In the active voice, the doer comes first: The dog chased the cat. In the passive, the thing the action is done to comes first: The cat was chased by the dog.",
          "Passive sentences use a form of 'be' (was, were, is) plus a verb like 'chased' or 'eaten', and often 'by'.",
          [eg("Active: Sam kicked the ball.", "Sam (doer) comes first."), eg("Passive: The ball was kicked by Sam.", "The ball comes first; 'was kicked by'.")],
          ("Imagine a photo of someone kicking a ball. The active sentence starts with the kicker. The passive sentence turns the camera round and starts with the ball.",
           "Active: Sam kicked the ball.\nPassive: The ball was kicked by Sam."),
          {"board": "The storm flattened the fence.", "kind": "text", "steps": [
              say("Let's turn this active sentence into the passive."),
              ask("Who or what does the flattening?", ["The storm", "The fence"], 0, line="Doer: the storm"),
              ask("What is the action done to?", ["The fence", "The storm"], 0, line="Done to: the fence"),
              ask("In the passive, which comes first?", ["The fence", "The storm"], 0,
                  then="The thing the action is done to moves to the front.", line="Start: The fence..."),
              ask("Finish it: 'The fence ___ by the storm.'", ["was flattened", "flattened"], 0,
                  then="Passive: a form of 'be' plus the verb.", hint="We need 'was' or 'were' in a passive sentence.", line="The fence was flattened by the storm. ✓"),
          ]},
          [q("Which sentence is passive?", ["The window was cleaned by Dad.", "Dad cleaned the window.", "Dad is cleaning the window."], 0,
             "The window comes first and we have 'was cleaned by'. That's the passive."),
           q("Which sentence is active?", ["The cat ate the fish.", "The fish was eaten by the cat.", "The fish was eaten."], 0,
             "The doer, the cat, comes first. That's active.")]),
    skill("ks2Subjunctive", "The subjunctive", "If I were... and formal demands",
          "The subjunctive is a formal verb form. Use 'were' for wishes and imagined things (If I were you), and the plain verb after words like insist, demand or suggest that (She insisted that he be on time).",
          "Imagining or wishing? Use 'were', even after I, he or she. After 'insist that' or 'demand that', use the verb with no -s.",
          [good("If I were a bird, I would fly to Spain.", "Imagined, so 'were'."), bad("If I was a bird, I would fly to Spain.", "Fine when chatting, but not the subjunctive.")],
          ("The subjunctive is the verb wearing its best clothes for a formal occasion or a daydream. In everyday talk we say 'If I was', but in the subjunctive it dresses up as 'If I were'.",
           "Everyday: If I was rich...\nSubjunctive: If I were rich...\nFormal: We ask that she be quiet."),
          {"board": "If I ___ faster, I could win the race.", "kind": "text", "steps": [
              say("The subjunctive is used for wishes, imagined things and formal demands."),
              ask("Is the speaker really faster, or imagining it?", ["Imagining it", "Really faster"], 0, line="Imagined → subjunctive"),
              ask("Which word does the subjunctive use here?", ["were", "was"], 0,
                  then="If I were faster. The subjunctive uses 'were', even with I.", hint="'Was' is the everyday form, not the subjunctive.", line="If I were faster ✓"),
              ask("Now a formal demand: 'The coach insisted that every player ___ on time.'", ["be", "is"], 0,
                  then="After 'insisted that', the subjunctive uses the plain verb: be.", line="insisted that every player be ✓"),
          ]},
          [b("I wish it __ the weekend already.", ["were", "was", "is"], 0,
             "A wish is imagined, so the subjunctive uses were."),
           b("The head teacher asked that every pupil __ quietly.", ["walk", "walks", "walked"], 0,
             "After 'asked that', the subjunctive uses the plain verb with no -s: walk.")]),
    # ---------- Punctuation ----------
    skill("ks2FrontedAdverbials", "Fronted adverbials", "A comma after the opener",
          "A fronted adverbial is a word or phrase at the start of a sentence that tells you when, where or how. Put a comma straight after it.",
          "Find where the opener ends and the main clause (who did what) begins. The comma goes in that gap, never in the middle of the opener.",
          [good("Before school, we fed the rabbits.", "When? Before school. Comma straight after."), bad("Before, school we fed the rabbits.", "The comma cuts the opener in half.")],
          ("A fronted adverbial is like the 'Once upon a time' before a story. The comma is the little pause before the story starts.",
           "Once upon a time, a fox lived in a wood.\nAt midnight, the clock struck twelve."),
          {"board": "Early the next morning we packed the car.", "kind": "text", "steps": [
              say("A fronted adverbial opens the sentence and tells us when, where or how."),
              ask("What does this opener tell us?", ["When", "Who"], 0, line="Opener tells us: when"),
              ask("Where does the opener end?", ["After 'morning'", "After 'Early'"], 0,
                  then="'Early the next morning' is the whole opener.", hint="Read up to where 'we' starts doing something.", line="Opener: Early the next morning"),
              ask("So the comma goes:", ["Early the next morning, we", "Early, the next morning we"], 0,
                  then="One comma, right after the whole opener.", line="Early the next morning, we packed the car. ✓"),
          ]},
          [q("Which is punctuated correctly?", ["With a grin, Tom waved.", "With, a grin Tom waved.", "With a grin Tom, waved."], 0,
             "'With a grin' is the opener, so the comma goes straight after it."),
           q("Which sentence starts with a fronted adverbial?", ["In the morning, we went fishing.", "We went fishing in the morning.", "We went fishing."], 0,
             "'In the morning' comes first and tells us when, so it is fronted.")]),
    skill("ks2InvertedCommas", "Inverted commas", "Punctuating speech",
          "Inverted commas go around the exact words someone says. The punctuation that ends the spoken words (comma, ? or !) goes inside the closing inverted comma.",
          "Ask: which words came out of their mouth? Wrap only those. Then tuck the punctuation inside.",
          [good("'Pass the ball,' said Kim.", "Comma inside, said Kim outside."), bad("'Pass the ball', said Kim.", "The comma has escaped outside.")],
          ("Inverted commas are like a speech bubble in a comic. Only the words the person says go in the bubble, and their full stop or question mark goes in with them.",
           "'Is it lunch yet?' asked Leo.\n(bubble) · (not in the bubble)"),
          {"board": "Are you coming asked Zara", "kind": "text", "steps": [
              say("Let's punctuate this speech. First find the words that are spoken."),
              ask("Which words does Zara say?", ["Are you coming", "asked Zara"], 0, line="Spoken: Are you coming"),
              ask("Is she asking or telling?", ["Asking", "Telling"], 0, then="So the spoken words need a question mark.", line="Needs: ?"),
              ask("Where does the question mark go?", ["Inside the inverted commas", "After 'Zara'"], 0,
                  then="It belongs to the spoken words, so it goes inside the bubble.", line="'Are you coming?' asked Zara. ✓"),
          ]},
          [q("Which is correct?", ["'Stop!' shouted the guard.", "'Stop'! shouted the guard.", "'Stop! shouted the guard.'"], 0,
             "The ! belongs to the spoken word, so it goes inside. 'shouted the guard' is not spoken."),
           q("Which is correct?", ["Gran said, 'Wipe your feet.'", "Gran said 'Wipe your feet'.", "Gran said, Wipe your 'feet.'"], 0,
             "Comma after 'said', then the spoken words with the full stop inside.")]),
    skill("ks2Parenthesis", "Brackets and commas for extra information", "Parenthesis",
          "Extra information can be added to a sentence inside a pair of brackets or a pair of commas. If you take it out, the sentence still makes sense.",
          "Cover the extra bit with your finger. If the sentence still reads properly, your brackets or commas are in the right place.",
          [good("My cousin (who is six) loves dinosaurs.", "Cover it: My cousin loves dinosaurs. ✓"), bad("My cousin who (is six) loves dinosaurs.", "Cover it: My cousin who loves dinosaurs. ✗")],
          ("Extra information is like a sticky note on your homework. Peel it off and the homework still makes sense. The brackets or commas are the edges of the sticky note.",
           "The cake (chocolate, of course) was delicious.\nPeel it off: The cake was delicious."),
          {"board": "Our neighbour who is a pilot flies to Rome.", "kind": "text", "steps": [
              say("Which words are extra information? Try taking some out."),
              ask("Which words could you take out and still have a sentence?", ["who is a pilot", "flies to Rome"], 0,
                  then="'Our neighbour flies to Rome' still makes sense.", line="Extra: who is a pilot"),
              ask("Where do the commas go?", ["Our neighbour, who is a pilot, flies", "Our neighbour who, is a pilot flies,"], 0,
                  then="One comma before the extra bit and one after it, like a pair of brackets.", line="Our neighbour, who is a pilot, flies to Rome. ✓"),
              ask("Could you use brackets instead?", ["Yes: (who is a pilot)", "No, never"], 0,
                  then="Brackets and a pair of commas do the same job here.", line="or: Our neighbour (who is a pilot) flies to Rome."),
          ]},
          [q("Which uses brackets correctly?", ["Our dog (a spaniel) loves the beach.", "Our (dog a spaniel) loves the beach.", "Our dog (a spaniel loves) the beach."], 0,
             "Cover '(a spaniel)': Our dog loves the beach. It still makes sense."),
           q("Which uses commas correctly?", ["Mr Jones, our caretaker, fixed the door.", "Mr Jones our, caretaker fixed the door.", "Mr, Jones our caretaker, fixed the door."], 0,
             "'our caretaker' is the extra information, so a comma goes on each side of it.")]),
    # ---------- Arithmetic ----------
    skill("ks2OrderOps", "Which part first?", "BODMAS",
          "Work out brackets first, then powers (like 3²), then multiply and divide, then add and subtract. BODMAS reminds you.",
          "Before you start, circle any × or ÷. Do those before any + or −, even if they come last.",
          [eg("14 + 5 × 4", "5 × 4 = 20 first, then 14 + 20 = 34."), eg("(14 + 5) × 4", "Brackets first: 19 × 4 = 76.")],
          ("BODMAS is like getting dressed: socks before shoes. Do the steps in the wrong order and you end up with a silly answer.",
           "B rackets\nO rders (powers)\nD ivide and M ultiply\nA dd and S ubtract"),
          {"board": "14 + 5 × 4", "kind": "math", "steps": [
              say("We don't just go left to right. Multiply and divide come before add and subtract."),
              ask("Which part do we work out first?", ["5 × 4", "14 + 5"], 0, hint="Look for × or ÷ first.", line="First: 5 × 4"),
              ask("5 × 4 = ?", ["20", "9"], 0, line="5 × 4 = 20"),
              ask("Now 14 + 20 = ?", ["34", "76"], 0, then="76 is what you'd get adding first. That's the trap.", line="14 + 20 = 34 ✓"),
          ]},
          [q("20 − 12 ÷ 4 = ?", ["17", "2", "8"], 0, "Divide first: 12 ÷ 4 = 3. Then 20 − 3 = 17."),
           q("(4 + 5) × 2 = ?", ["18", "14", "11"], 0, "Brackets first: 4 + 5 = 9. Then 9 × 2 = 18.")]),
    skill("ks2LongMultiplication", "Long multiplication", "Multiply by a 2-digit number",
          "To multiply by a 2-digit number, multiply by the ones, then by the tens, then add the two answers together.",
          "For the tens row, put a 0 in the ones column first, because you are really multiplying by a multiple of 10.",
          [eg("243 × 16", "243 × 6 = 1,458. 243 × 10 = 2,430. 1,458 + 2,430 = 3,888.")],
          ("Imagine 16 bags with 243 sweets in each. Count 6 bags, then count 10 bags, then put the two piles together.",
           "6 bags: 1,458\n10 bags: 2,430\n16 bags: 3,888"),
          {"board": "243 × 16", "kind": "math", "steps": [
              say("Split 16 into 6 ones and 1 ten. Multiply by each part, then add."),
              ask("First row: 243 × 6 = ?", ["1,458", "1,248"], 0, hint="243 × 6: 200 × 6 = 1,200, 40 × 6 = 240, 3 × 6 = 18.", line="243 × 6 = 1,458"),
              ask("Second row is 243 × 10. What goes in the ones column first?", ["0", "6"], 0,
                  then="We're multiplying by ten, so a 0 holds the ones place.", line="243 × 10 = 2,430"),
              ask("Add the rows: 1,458 + 2,430 = ?", ["3,888", "3,788"], 0, hint="8 + 0 = 8, 5 + 3 = 8, 4 + 4 = 8, 1 + 2 = 3.", line="1,458 + 2,430 = 3,888"),
              ask("Check by rounding: 243 × 16 is about 250 × 16 = 4,000. Is 3,888 sensible?", ["Yes, it is close to 4,000", "No, it is too small"], 0, then="3,888 is a little under 4,000, as it should be, because 243 is a little under 250.", line="Check: about 4,000 ✓"),
          ]},
          [q("124 × 12 = ?", ["1,488", "372", "1,248"], 0, "124 × 2 = 248 and 124 × 10 = 1,240. 248 + 1,240 = 1,488."),
           q("In 315 × 24, what is the tens row?", ["315 × 20 = 6,300", "315 × 2 = 630", "315 × 4 = 1,260"], 0,
             "The 2 in 24 means 2 tens, so the tens row is 315 × 20 = 6,300.")]),
    skill("ks2ShortDivision", "Short division", "The bus stop method",
          "Divide one digit at a time from the left. If a digit doesn't divide exactly, carry the remainder to the next digit.",
          "If the divisor won't go into a digit at all, write 0 on top and carry the whole digit across. Don't skip the 0.",
          [eg("4,935 ÷ 7", "49 ÷ 7 = 7, 3 ÷ 7 = 0 r 3, 35 ÷ 7 = 5. Answer 705.")],
          ("Think of sharing sweets between 7 friends, starting with the biggest bags. If a bag can't be shared, open it and add those sweets to the next pile.",
           "49 hundreds → 7 hundreds each\n3 tens → 0 each, 3 left over\n35 ones → 5 each"),
          {"board": "4,935 ÷ 7", "kind": "math", "steps": [
              say("7 won't go into 4, so start with 49."),
              ask("49 ÷ 7 = ?", ["7", "6"], 0, line="49 ÷ 7 = 7"),
              ask("Next digit is 3. How many 7s in 3?", ["0, remainder 3", "1"], 0,
                  then="Write 0 on top and carry the 3.", hint="7 is bigger than 3.", line="3 ÷ 7 = 0 r 3"),
              ask("The carried 3 makes 35. 35 ÷ 7 = ?", ["5", "4"], 0, line="35 ÷ 7 = 5"),
              ask("Read the answer from the top:", ["705", "75"], 0, then="The 0 holds the tens place. Leaving it out gives 75, which is far too small.", line="4,935 ÷ 7 = 705"),
              ask("Check by multiplying back: 705 × 7 = ?", ["4,935", "525"], 0, hint="700 × 7 = 4,900 and 5 × 7 = 35.", line="Check: 705 × 7 = 4,935 ✓"),
          ]},
          [q("672 ÷ 3 = ?", ["224", "214", "234"], 0, "6 ÷ 3 = 2, 7 ÷ 3 = 2 r 1, 12 ÷ 3 = 4. Answer 224."),
           q("2,416 ÷ 8 = ?", ["302", "32", "320"], 0, "24 ÷ 8 = 3, 1 ÷ 8 = 0 r 1, 16 ÷ 8 = 2. Answer 302.")]),
    skill("ks2AddFractions", "Adding and subtracting fractions", "Same denominator first",
          "You can only add or subtract fractions when the denominators (bottom numbers) are the same. Then add or subtract the numerators (top numbers).",
          "Never add the bottom numbers. Find a number both denominators go into, change the fractions, then work with the tops.",
          [eg("9/10 − 3/5", "3/5 = 6/10. 9/10 − 6/10 = 3/10."), eg("1/3 + 1/5", "5/15 + 3/15 = 8/15.")],
          ("You can't take slices of a pizza cut in 5 away from a pizza cut in 10 and say how much pizza is left. Cut both into tenths first, then count the slices.",
           "3/5 = 6/10\n9 slices − 6 slices = 3 slices\n= 3/10"),
          {"board": "9/10 − 3/5", "kind": "math", "steps": [
              say("The denominators are 10 and 5. They must match before we subtract."),
              ask("Which number do 10 and 5 both go into?", ["10", "15"], 0, hint="5 × 2 = 10.", line="Common denominator: 10"),
              ask("3/5 is how many tenths?", ["6/10", "3/10"], 0, hint="Multiply the top and bottom by 2.", line="3/5 = 6/10"),
              ask("9/10 − 6/10 = ?", ["3/10", "6/5"], 0, then="Subtract the tops, keep the bottom the same.", hint="It is a take-away: 9 − 6.", line="9/10 − 6/10 = 3/10"),
              ask("Check: add the 6/10 back on. 3/10 + 6/10 = 9/10. Is that what we started with?", ["Yes", "No"], 0, then="9/10 is where we began, so 3/10 is right.", line="Check: 3/10 + 6/10 = 9/10 ✓"),
          ]},
          [q("4/9 + 2/9 = ?", ["6/9", "6/18", "4/9"], 0, "Same denominator, so add the tops: 4 + 2 = 6. The bottom stays 9."),
           q("1/2 + 1/4 = ?", ["3/4", "2/6", "2/4"], 0, "1/2 = 2/4. Then 2/4 + 1/4 = 3/4. Adding the bottoms (2/6) is the trap.")]),
    skill("ks2PercentOf", "Percentages of amounts", "Find 10% first",
          "Per cent means out of 100. To find a percentage of an amount, find 10% by dividing by 10, then build the percentage you need from it.",
          "50% is half, 25% is a quarter, 10% is ÷ 10, and 5% is half of 10%. Add pieces together: 15% = 10% + 5%.",
          [eg("15% of 260", "10% = 26. 5% = 13. 26 + 13 = 39."), eg("25% of 240", "A quarter: 240 ÷ 4 = 60.")],
          ("Imagine a bar of chocolate with 100 squares. 10% is 10 squares out of every 100. Once you know 10%, you can build any amount like Lego.",
           "10% of 80 = 8\n20% = 8 + 8 = 16\n5% = half of 8 = 4"),
          {"board": "15% of 260", "kind": "math", "steps": [
              say("Find 10% first. Then build 15% from it."),
              ask("10% of 260 = ?", ["26", "2.6"], 0, hint="Divide by 10.", line="10% = 26"),
              ask("5% is half of 10%. So 5% of 260 = ?", ["13", "52"], 0, line="5% = 13"),
              ask("15% = 10% + 5% = ?", ["39", "36"], 0, line="15% of 260 = 39"),
              ask("Check: 20% of 260 is 52. Should 15% be a bit less than 52?", ["Yes, so 39 makes sense", "No, it should be more"], 0, then="15% is less than 20%, so the answer must be less than 52.", line="Check: 39 < 52 ✓"),
          ]},
          [q("10% of 250 = ?", ["25", "2.5", "10"], 0, "Divide by 10: 250 ÷ 10 = 25."),
           q("20% of 40 = ?", ["8", "4", "20"], 0, "10% of 40 is 4, so 20% is 4 + 4 = 8.")]),
    # ---------- Reasoning ----------
    skill("ks2FractionsOfAmounts", "Fractions of amounts", "Divide by the bottom, times by the top",
          "To find a fraction of an amount, divide by the denominator (bottom) to find one part, then multiply by the numerator (top).",
          "Bottom first: the bottom number tells you how many equal parts to split into.",
          [eg("4/7 of 35", "35 ÷ 7 = 5. 5 × 4 = 20.")],
          ("Share 35 sweets equally into 7 bags. Each bag has 5. 4/7 means you get 4 of those bags, so 20 sweets.",
           "35 ÷ 7 = 5 in each bag\n4 bags = 20"),
          {"board": "4/7 of 35", "kind": "math", "steps": [
              say("The bottom number says how many equal parts. The top says how many parts we want."),
              ask("Split 35 into 7 equal parts. How many in each?", ["5", "7"], 0, hint="35 ÷ 7.", line="35 ÷ 7 = 5"),
              ask("We want 4 of those parts. 5 × 4 = ?", ["20", "9"], 0, line="5 × 4 = 20"),
              ask("So 4/7 of 35 is:", ["20", "5"], 0, then="5 is just one seventh. Don't stop halfway.", line="4/7 of 35 = 20 ✓"),
          ]},
          [q("1/4 of 36 = ?", ["9", "4", "12"], 0, "36 ÷ 4 = 9. One part is the answer when the top is 1."),
           q("2/3 of 24 = ?", ["16", "8", "12"], 0, "24 ÷ 3 = 8. 8 × 2 = 16.")]),
    skill("ks2Ratio", "Ratio and scaling", "Find one, then scale",
          "Ratio compares amounts. To scale a recipe or a price, find what one part (or one item) is worth, then multiply.",
          "Ask: how many times bigger? 9 eggs is 3 times 3 eggs, so everything else is 3 times bigger too.",
          [eg("3 eggs : 200 g sugar → 9 eggs", "9 is 3 × 3, so 200 × 3 = 600 g."), eg("boys : girls = 3 : 4, 35 children", "7 parts. 35 ÷ 7 = 5. Girls: 4 × 5 = 20.")],
          ("A recipe for 2 people is like one set of Lego instructions. Building for 6 people means following them 3 times, so you need 3 times as many bricks.",
           "2 people: 200 g\n× 3\n6 people: 600 g"),
          {"board": "3 : 4 boys to girls, 35 children", "kind": "text", "steps": [
              say("A ratio of 3 : 4 means for every 3 boys there are 4 girls."),
              ask("How many parts is that altogether?", ["7", "12"], 0, hint="3 + 4.", line="3 + 4 = 7 parts"),
              ask("35 children shared into 7 parts. How many in each part?", ["5", "7"], 0, line="35 ÷ 7 = 5"),
              ask("Girls have 4 parts. How many girls?", ["20", "15"], 0, then="And the boys have 3 parts: 15. Check: 20 + 15 = 35.", line="Girls: 4 × 5 = 20 ✓"),
          ]},
          [q("4 pens cost £2. How much do 12 pens cost?", ["£6", "£8", "£24"], 0, "12 pens is 3 times 4 pens, so 3 × £2 = £6."),
           q("Red to blue is 1 : 2. There are 5 red. How many blue?", ["10", "7", "3"], 0, "Every 1 red has 2 blue, so 5 red has 5 × 2 = 10 blue.")]),
    skill("ks2Angles", "Missing angles", "Lines, points and triangles",
          "Angles on a straight line add up to 180°. Angles around a point add up to 360°. Angles in a triangle add up to 180°. A right angle is 90°.",
          "Pick the right total, add up the angles you know, then take that away from the total.",
          [eg("Straight line: 72° and ?", "180 − 72 = 108°."), eg("Triangle: 52°, 69° and ?", "52 + 69 = 121. 180 − 121 = 59°.")],
          ("A straight line is half a turn, like turning to face behind you: 180°. A whole turn all the way round is 360°.",
           "Half turn = 180°\nWhole turn = 360°\nQuarter turn = 90°"),
          {"board": "Triangle: 52° and 69°. Find the third angle.", "kind": "text", "steps": [
              say("Step 1: pick the right total."),
              ask("Angles in a triangle add up to:", ["180°", "360°"], 0, hint="360° is around a point.", line="Total: 180°"),
              ask("Add the angles you know: 52 + 69 = ?", ["121", "111"], 0, line="52 + 69 = 121"),
              ask("Take it from the total: 180 − 121 = ?", ["59", "69"], 0, line="Missing angle = 59°"),
              ask("Check: 52 + 69 + 59 = ?", ["180", "170"], 0, then="All three add up to 180°, so 59° is right.", line="Check: 52 + 69 + 59 = 180 ✓"),
          ]},
          [q("Two angles on a straight line. One is 130°. What is the other?", ["50°", "230°", "130°"], 0, "180 − 130 = 50."),
           q("Angles around a point: 90°, 150° and ?", ["120°", "60°", "240°"], 0, "90 + 150 = 240. 360 − 240 = 120.")]),
    skill("ks2Time", "Time intervals", "Count on to the hour",
          "To find how long something takes, count on from the start time to the next o'clock, then to the end time, and add the pieces. There are 60 minutes in an hour and 24 hours in a day.",
          "Don't subtract times like normal numbers: hours have 60 minutes, not 100. Jump to the hour first.",
          [eg("2:35 pm to 4:05 pm", "25 min to 3:00, 60 min to 4:00, 5 min to 4:05. Total 90 minutes.")],
          ("Think of hopping along a number line with stepping stones on every o'clock. Hop to the next stone, then hop whole hours, then hop the last few minutes.",
           "2:35 → 3:00 (25)\n3:00 → 4:00 (60)\n4:00 → 4:05 (5)\n= 90 minutes"),
          {"board": "2:35 pm to 4:05 pm", "kind": "math", "steps": [
              say("Count on. First, jump to the next o'clock."),
              ask("2:35 to 3:00 is how many minutes?", ["25", "65"], 0, hint="There are 60 minutes in an hour. 60 − 35.", line="2:35 → 3:00 = 25 min"),
              ask("3:00 to 4:00 is:", ["60 minutes", "100 minutes"], 0, line="3:00 → 4:00 = 60 min"),
              ask("4:00 to 4:05 is:", ["5 minutes", "55 minutes"], 0, line="4:00 → 4:05 = 5 min"),
              ask("Add the jumps: 25 + 60 + 5 = ?", ["90 minutes", "170 minutes"], 0,
                  then="Subtracting 235 from 405 gives 170, which is wrong because hours have 60 minutes.", line="Total = 90 minutes ✓"),
          ]},
          [q("How long is it from 9:50 am to 10:20 am?", ["30 minutes", "70 minutes", "40 minutes"], 0, "9:50 to 10:00 is 10 minutes, and 10:00 to 10:20 is 20. 10 + 20 = 30."),
           q("How many minutes are in 2 hours?", ["120", "200", "60"], 0, "Each hour has 60 minutes: 2 × 60 = 120.")]),
]


def main():
    ids = [s["id"] for s in SKILLS]
    assert len(ids) == len(set(ids))
    for s in SKILLS:
        for st in s["walkthrough"]["steps"]:
            if "ask" in st:
                assert 2 <= len(st["options"]) <= 3 and 0 <= st["answer"] < len(st["options"]), (s["id"], st)
        assert 3 <= len(s["walkthrough"]["steps"]) <= 7, s["id"]
        assert len(s["questions"]) >= 2
        blob = json.dumps(s, ensure_ascii=False)
        assert "—" not in blob and "’" not in blob and "“" not in blob, s["id"]
    dst = "data/v2/basics/ks2.json"
    with open(dst, "w") as f:
        json.dump(SKILLS, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print(f"wrote {len(SKILLS)} skills -> {dst}")


if __name__ == "__main__":
    main()
