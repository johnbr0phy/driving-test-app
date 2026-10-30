"""English: spelling, punctuation and grammar."""
from common import item, rotate

D = "elevenplusSpag"
ITEMS = []
_k = [0]
NM = "No mistake"


def seg(test, skill, diff, kind, parts, bad, why):
    """GL-style line split into four parts plus No mistake. bad = index of the wrong part, or 4 for no mistake."""
    opts = list(parts) + [NM]
    stem = (f"Which part of this sentence contains a {kind} mistake? If there is no mistake, choose **No mistake**.\n\n"
            f"**{' / '.join(parts)}**")
    ITEMS.append(item(D, test, skill, diff, stem, opts, bad, why, lockedOrder=True))


def pick(test, skill, diff, stem, key, others, why):
    opts, idx = rotate([key] + others, key, _k[0])
    _k[0] += 2
    ITEMS.append(item(D, test, skill, diff, stem, opts, idx, why))


# ----- spelling -----
seg(1, "Spelling", 1, "spelling", ["The children were", "very excited about", "the trip to the", "musuem on Friday."], 3,
    "Museum is spelt m-u-s-e-u-m. The other parts are spelt correctly.")
seg(1, "Spelling", 2, "spelling", ["We definately need", "to buy more bread", "before the shop", "closes tonight."], 0,
    "Definitely is spelt d-e-f-i-n-i-t-e-l-y. It comes from finite, which helps you remember the i.")
seg(1, "Spelling", 2, "spelling", ["My neighbour's cat", "often sleeps", "on our warm", "kitchen windowsill."], 4,
    "Every word is spelt correctly. Neighbour is the British spelling, with -our.")
seg(1, "Spelling", 2, "spelling", ["The scientist made", "an amazing discovery", "that suprised", "everyone in the room."], 2,
    "Surprised has an r after the u: s-u-r-p-r-i-s-e-d.")
seg(2, "Spelling", 1, "spelling", ["Mrs Patel asked us", "to write a peice", "of poetry about", "the autumn leaves."], 1,
    "Piece is spelt p-i-e-c-e: \"a piece of pie\" helps you remember the i comes first.")
seg(2, "Spelling", 1, "spelling", ["It was a", "beautiful morning", "so we walked", "accross the fields."], 3,
    "Across has only one c: a-c-r-o-s-s.")
seg(2, "Spelling", 2, "spelling", ["The library is", "closed on Sundays", "and on every", "bank holiday."], 4,
    "Every word is spelt correctly, so there is no mistake.")
seg(2, "Spelling", 2, "spelling", ["Our football team", "recieved a trophy", "at the end", "of the season."], 1,
    "Received follows \"i before e except after c\": r-e-c-e-i-v-e-d.")
seg(0, "Spelling", 2, "spelling", ["Dad said it was", "necesary to wear", "a helmet when", "cycling to school."], 1,
    "Necessary has one c and two s: n-e-c-e-s-s-a-r-y. Think \"one collar, two sleeves\".")
seg(0, "Spelling", 1, "spelling", ["The weather forecast", "promised sunshine,", "but it rained", "untill teatime."], 3,
    "Until has only one l at the end, although till has two.")
seg(0, "Spelling", 2, "spelling", ["Grandma keeps", "a seperate drawer", "for birthday cards", "and wrapping paper."], 1,
    "Separate is spelt s-e-p-a-r-a-t-e: there is \"a rat\" in separate.")

# ----- punctuation -----
seg(1, "Punctuation", 1, "punctuation", ["Have you seen", "my blue jumper.", "I can't find", "it anywhere."], 1,
    "\"Have you seen my blue jumper\" is a question, so it needs a question mark, not a full stop.")
seg(1, "Punctuation", 2, "punctuation", ["At the market", "we bought apples pears,", "plums and grapes", "for our picnic."], 1,
    "Items in a list are separated by commas, so there should be a comma after apples: apples, pears, plums and grapes.")
seg(1, "Punctuation", 2, "punctuation", ["The dogs bowl", "was empty, so", "I filled it", "with fresh water."], 0,
    "The bowl belongs to the dog, so it needs an apostrophe: the dog's bowl.")
seg(1, "Punctuation", 2, "punctuation", ["On Saturday,", "we visited", "Aunt Jo in", "Manchester."], 4,
    "The comma after the fronted adverbial \"On Saturday\" is correct, and names have capital letters. There is no mistake.")
seg(2, "Punctuation", 3, "punctuation", ["\"Hurry up,\"", "shouted Dad", "\"or we'll miss", "the train!\""], 1,
    "When speech is split by \"shouted Dad\", a comma is needed before the speech starts again: \"Hurry up,\" shouted Dad, \"or we'll miss the train!\"")
seg(2, "Punctuation", 1, "punctuation", ["Its going to", "rain later,", "so take your", "umbrella with you."], 0,
    "It's is short for it is, so it needs an apostrophe: It's going to rain.")
seg(2, "Punctuation", 2, "punctuation", ["My sister,", "who loves horses,", "goes riding", "every weekend."], 4,
    "The commas correctly mark off the extra information \"who loves horses\". There is no mistake.")
seg(2, "Punctuation", 1, "punctuation", ["i asked my", "teacher if we", "could go outside", "at lunchtime."], 0,
    "The word I is always a capital letter, and a sentence must start with one too.")
seg(0, "Punctuation", 2, "punctuation", ["The childrens", "coats were hanging", "on the pegs", "by the door."], 0,
    "The coats belong to the children, so it should be children's. Children is already plural, so the apostrophe goes before the s.")
seg(0, "Punctuation", 1, "punctuation", ["The Eiffel Tower", "is in paris,", "the capital", "of France."], 1,
    "Paris is the name of a city, so it needs a capital letter.")

# ----- grammar and word choice -----
pick(1, "Grammar", 1, "Choose the word that best completes the sentence.\n\nYesterday, we ___ to the beach.",
     "went", ["go", "gone", "goes", "going"], "Yesterday tells us the sentence is in the past, so the simple past went is correct. Gone needs a helper such as have.")
pick(1, "Word classes", 1, "Which word is a **verb** in this sentence?\n\nThe tired fox crept slowly through the hedge.",
     "crept", ["tired", "fox", "slowly", "hedge"], "A verb is a doing word. Crept is what the fox did. Tired is an adjective and slowly is an adverb.")
pick(1, "Grammar", 1, "Choose the word that best completes the sentence.\n\nThe twins finished ___ homework before tea.",
     "their", ["there", "they're", "them", "its"], "Their shows that something belongs to them. There means a place and they're means they are.")
pick(1, "Grammar", 2, "Choose the word that best completes the sentence.\n\nI could ___ gone with them if I had asked.",
     "have", ["of", "off", "had", "has"], "Could have is correct. People sometimes write could of because could've sounds like it, but of is never right here.")
pick(1, "Grammar", 3, "Choose the word that best completes the sentence.\n\nNeither Sam nor his brothers ___ been to Scotland.",
     "have", ["has", "is", "was", "having"], "With neither... nor, the verb agrees with the nearer subject. Brothers is plural, so have is correct.")
pick(2, "Grammar", 2, "Choose the word that best completes the sentence.\n\nThere were ___ people at the match than last week.",
     "fewer", ["less", "lesser", "few", "little"], "People can be counted, so fewer is correct. Less is used for things that cannot be counted, such as less water.")
pick(2, "Word classes", 1, "Which word is an **adjective** in this sentence?\n\nThe curious cat watched the bird.",
     "curious", ["cat", "watched", "bird", "the"], "An adjective describes a noun. Curious describes the cat. Watched is a verb and cat and bird are nouns.")
pick(2, "Grammar", 2, "Choose the word that best completes the sentence.\n\nMia and ___ are going to the park.",
     "I", ["me", "myself", "mine", "us"], "Take Mia away and test it: \"I am going to the park\" is right, but \"me am going\" is not. So it is Mia and I.")
pick(2, "Word classes", 2, "Which word is a **preposition** in this sentence?\n\nWe hid underneath the stairs.",
     "underneath", ["hid", "we", "stairs", "the"], "A preposition shows where something is in relation to something else. Underneath tells us where we hid.")
pick(2, "Grammar", 3, "Choose the word that best completes the sentence in formal standard English.\n\nIf I ___ you, I would take a coat.",
     "were", ["was", "am", "be", "are"], "This is the subjunctive, used for something imagined: if I were you. Was is common in speech but were is the formal standard form.")
pick(0, "Grammar", 1, "Choose the word that best completes the sentence.\n\nThe cake was ___ big for one person to eat.",
     "too", ["to", "two", "toe", "tow"], "Too means more than enough. To shows direction and two is the number 2.")
pick(0, "Word classes", 1, "Which word is a **pronoun** in this sentence?\n\nRavi lent the book to them.",
     "them", ["Ravi", "lent", "book", "to"], "A pronoun stands in place of a noun. Them replaces the names of the people Ravi lent the book to.")
pick(0, "Grammar", 1, "Choose the word that best completes the sentence.\n\nShe ran ___ than anyone else in the race.",
     "faster", ["fastest", "more fast", "fast", "most fast"], "Than tells us two things are being compared, so the comparative faster is correct. Fastest is used with the, as in the fastest.")
pick(0, "Spelling", 1, "What is the plural of **knife**?",
     "knives", ["knifes", "knifs", "knive's", "knifies"], "Many words ending in -fe change to -ves in the plural: knife, knives; wife, wives. Plurals never need an apostrophe.")
pick(0, "Grammar", 2, "Choose the word that best completes the sentence.\n\nI wanted to play outside, ___ it was pouring with rain.",
     "but", ["because", "so", "or", "until"], "The two parts contrast: I wanted to go out, yet it was raining. But is the conjunction that shows a contrast.")
