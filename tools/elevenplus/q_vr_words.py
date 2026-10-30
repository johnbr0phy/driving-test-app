"""Verbal reasoning: words. Word puzzles are checked against the system dictionary."""
from common import words, item, rotate

D = "elevenplusVrWords"
ITEMS = []
_k = [1]
W = words()


def add(test, skill, diff, stem, options, key, expl, **extra):
    opts, idx = rotate(options, key, _k[0])
    _k[0] += 2
    ITEMS.append(item(D, test, skill, diff, stem, opts, idx, expl, **extra))


# ---------- closest meaning ----------
def syn(test, diff, word, key, others, why):
    add(test, "Closest meaning", diff, f"Which word is closest in meaning to **{word}**?", [key] + others, key, why)


syn(1, 1, "brave", "courageous", ["frightened", "clever", "polite", "careful"],
    "Brave and courageous both mean ready to face danger or fear. Frightened is close to the opposite.")
syn(1, 2, "rapid", "quick", ["steady", "noisy", "rough", "late"],
    "Rapid means very fast, so quick is closest. Steady describes an even pace, not a fast one.")
syn(1, 2, "conceal", "hide", ["reveal", "seal", "collect", "admire"],
    "To conceal something is to hide it. Reveal is the opposite, and seal only sounds similar.")
syn(2, 1, "furious", "angry", ["curious", "tired", "hurried", "worried"],
    "Furious means extremely angry. Curious only sounds similar; it means wanting to know.")
syn(2, 1, "ancient", "old", ["broken", "famous", "distant", "precious"],
    "Ancient means very old, like ancient ruins. Broken, famous and precious things can be new.")
syn(2, 2, "timid", "shy", ["rude", "tired", "tiny", "calm"],
    "A timid person is easily frightened and lacks confidence, which is close to shy. Tiny only sounds similar.")
syn(0, 3, "reluctant", "unwilling", ["eager", "sorry", "careless", "lonely"],
    "Reluctant means not wanting to do something, so unwilling is closest. Eager is the opposite.")


# ---------- opposite meaning ----------
def ant(test, diff, word, key, others, why):
    add(test, "Opposite meaning", diff, f"Which word is most opposite in meaning to **{word}**?", [key] + others, key, why)


ant(1, 1, "arrive", "depart", ["reach", "enter", "wait", "travel"],
    "To arrive is to get somewhere; to depart is to leave. Reach and enter mean nearly the same as arrive.")
ant(1, 2, "fragile", "sturdy", ["delicate", "heavy", "shiny", "broken"],
    "Fragile means easily broken; sturdy means strong and hard to break. Delicate means nearly the same as fragile.")
ant(1, 2, "scarce", "plentiful", ["uncommon", "expensive", "scary", "hidden"],
    "Scarce means in short supply, so plentiful (more than enough) is the opposite. Uncommon means nearly the same as scarce.")
ant(2, 1, "generous", "selfish", ["wealthy", "kind", "gentle", "honest"],
    "A generous person gives freely; a selfish person keeps things for themselves. Kind is close to generous, not opposite.")
ant(2, 2, "expand", "shrink", ["stretch", "explode", "open", "grow"],
    "To expand is to get bigger; to shrink is to get smaller. Stretch and grow are close to expand.")
ant(2, 1, "victory", "defeat", ["battle", "triumph", "prize", "enemy"],
    "A victory is a win and a defeat is a loss. Triumph means nearly the same as victory.")
ant(0, 3, "temporary", "permanent", ["brief", "modern", "sudden", "early"],
    "Temporary means lasting a short time; permanent means lasting for ever. Brief is close to temporary.")


# ---------- hidden words ----------
def hidden(test, diff, sentence, key, others):
    joined = "".join(ch for ch in sentence.lower() if ch.isalpha())
    ws = ["".join(ch for ch in w.lower() if ch.isalpha()) for w in sentence.split()]
    spans = [i for i in range(len(ws) - 1) for k in range(1, 4) if ws[i][-k:] + ws[i + 1][:4 - k] == key and len(ws[i]) >= k]
    assert spans, (sentence, key)
    i = spans[0]
    for o in others:
        assert o not in joined, (o, sentence)
        assert o in W, o
    a, b = sentence.split()[i].strip(".,?"), sentence.split()[i + 1].strip(".,?")
    add(test, "Hidden words", diff,
        f"A four-letter word is hidden across the end of one word and the start of the next. Which word is it?\n\n**{sentence}**",
        [key] + others, key,
        f"Read the words together: \"{a} {b}\" runs into {key.upper()}. None of the other words appear anywhere in the sentence.",
        basics="elevenplusHiddenWords")


hidden(1, 1, "The old owl ate a mouse.", "late", ["load", "mole", "wall", "seat"])
hidden(1, 2, "The robot always beeps at noon.", "hero", ["boat", "seat", "slow", "pear"])
hidden(1, 2, "She found the cave rather dark.", "herd", ["vote", "dart", "hare", "even"])
hidden(2, 1, "The zebra in the zoo was asleep.", "rain", ["zone", "seal", "bran", "wall"])
hidden(2, 2, "Tim's cousin kept a pet frog.", "sink", ["mint", "pest", "knot", "rope"])
hidden(2, 3, "Please ask Mum for the scissors.", "fort", ["mask", "sumo", "hose", "kite"])
hidden(0, 2, "The swan dived under the bridge.", "wand", ["dove", "rude", "barn", "need"])


# ---------- move a letter ----------
def move(test, diff, w1, w2, letter, new1, new2):
    assert w1.replace(letter, "", 1).lower() == new1.lower() and new1.lower() in W
    assert new2.lower() in W and sorted(new2.lower()) == sorted((w2 + letter).lower())
    # no other letter of w1 works
    for i, c in enumerate(w1):
        if c == letter:
            continue
        r = (w1[:i] + w1[i + 1:]).lower()
        ins = {w2.lower()[:j] + c.lower() + w2.lower()[j:] for j in range(len(w2) + 1)}
        assert not (r in W and ins & W), (w1, c)
    ITEMS.append(item(D, test, "Move a letter", diff,
                      f"Move one letter from the first word into the second word to make two new words. Which letter moves?\n\n**{w1}   {w2}**",
                      list(w1), list(w1).index(letter),
                      f"Take {letter} out of {w1} to leave {new1}, and put it into {w2} to make {new2}. No other letter makes two real words.",
                      lockedOrder=True, basics="elevenplusMoveLetter"))


move(1, 2, "BLEND", "PAN", "L", "BEND", "PLAN")
move(1, 2, "BRAKE", "COW", "R", "BAKE", "CROW")
move(2, 2, "CLAMP", "BAD", "L", "CAMP", "BALD")
move(2, 3, "CRANE", "BOW", "R", "CANE", "BROW")
move(0, 2, "PLANT", "CAP", "L", "PANT", "CLAP")


# ---------- compound words ----------
def compound(test, diff, g1, g2, a, b, others):
    hits = [x + y for x in g1 for y in g2 if (x + y) in W]
    assert hits == [a + b], hits
    for o in others:
        x, y = o.split(" + ")
        assert x in g1 and y in g2
    add(test, "Compound words", diff,
        f"Choose one word from each group that together make one new word. The word from the first group comes first.\n\n**({', '.join(g1)})   ({', '.join(g2)})**",
        [f"{a} + {b}"] + others, f"{a} + {b}", f"{a.capitalize()} and {b} make {a}{b}. None of the other pairs make a real word.")


compound(1, 1, ["car", "bus", "van"], ["pet", "ten", "ear"], "car", "pet", ["bus + ten", "van + ear", "car + ten", "bus + pet"])
compound(1, 2, ["fire", "ice", "sea"], ["cup", "berg", "rod"], "ice", "berg", ["fire + cup", "sea + rod", "fire + rod", "sea + cup"])
compound(1, 2, ["star", "moon", "sun"], ["ling", "kit", "pan"], "star", "ling", ["sun + kit", "moon + ling", "sun + pan", "moon + kit"])
compound(2, 1, ["hand", "foot", "arm"], ["bag", "cot", "pin"], "hand", "bag", ["foot + pin", "arm + cot", "foot + bag", "arm + pin"])
compound(2, 1, ["rain", "wind", "snow"], ["bow", "toe", "lid"], "rain", "bow", ["wind + lid", "snow + toe", "wind + toe", "snow + lid"])
compound(2, 2, ["pass", "tree", "milk"], ["word", "lamp", "mat"], "pass", "word", ["milk + mat", "tree + lamp", "milk + word", "tree + mat"])
compound(0, 1, ["cup", "plate", "bowl"], ["board", "pen", "tin"], "cup", "board", ["bowl + pen", "plate + tin", "bowl + tin", "plate + pen"])


# ---------- missing three letters ----------
def missing(test, diff, sentence, full, three, others):
    i = full.find(three)
    shown = full[:i] + full[i + 3:]
    assert full.lower() in W or full in ("SOLDIERS", "PARENTS"), full
    for o in others:
        assert not any((shown[:j] + o + shown[j:]).lower() in W for j in range(len(shown) + 1)), o
    add(test, "Missing three letters", diff,
        f"The word in capitals has three letters missing. The missing letters make a three-letter word. Which is it?\n\n**{sentence.replace(full, shown)}**",
        [three] + others, three, f"Put {three} back to make {full}: \"{sentence}\"",
        basics="elevenplusMissingLetters")


missing(1, 1, "The STUDENT finished her homework early.", "STUDENT", "DEN", ["TEN", "END", "DIM", "OUT"])
missing(1, 2, "An ELEPHANT sprayed water with its trunk.", "ELEPHANT", "ANT", ["ARM", "ONE", "ART", "ICE"])
missing(2, 1, "The MONKEY grabbed a banana.", "MONKEY", "KEY", ["BOY", "SKY", "TRY", "KIT"])
missing(2, 2, "The SOLDIERS marched past the palace.", "SOLDIERS", "DIE", ["DOE", "TIE", "LIE", "PIE"])
missing(0, 2, "My PARENTS took us to the zoo.", "PARENTS", "ARE", ["ART", "EAR", "AIR", "ORE"])


# ---------- odd two out ----------
def odd(test, diff, ws, pair, others, why):
    key = f"{pair[0]} and {pair[1]}"
    add(test, "Odd two out", diff, f"Three of these words go together. Which two do not belong with them?\n\n**{', '.join(ws)}**",
        [key] + others, key, why)


odd(1, 1, ["apple", "pear", "carrot", "plum", "cabbage"], ("carrot", "cabbage"), ["apple and pear", "pear and plum", "apple and carrot", "plum and cabbage"],
    "Apple, pear and plum are fruits. Carrot and cabbage are vegetables.")
odd(1, 2, ["whisper", "shout", "mutter", "yell", "murmur"], ("shout", "yell"), ["whisper and mutter", "mutter and murmur", "whisper and yell", "shout and murmur"],
    "Whisper, mutter and murmur are all ways of speaking quietly. Shout and yell are loud.")
odd(2, 1, ["robin", "salmon", "sparrow", "trout", "eagle"], ("salmon", "trout"), ["robin and eagle", "sparrow and eagle", "robin and salmon", "sparrow and trout"],
    "Robin, sparrow and eagle are birds. Salmon and trout are fish.")
odd(2, 2, ["circle", "cube", "square", "sphere", "triangle"], ("cube", "sphere"), ["circle and square", "square and triangle", "circle and sphere", "cube and triangle"],
    "Circle, square and triangle are flat (2-D) shapes. A cube and a sphere are solid (3-D) shapes.")
odd(0, 3, ["gigantic", "tiny", "enormous", "minute", "huge"], ("tiny", "minute"), ["gigantic and huge", "enormous and huge", "tiny and huge", "gigantic and minute"],
    "Gigantic, enormous and huge all mean very big. Tiny and minute (said my-NEWT) both mean very small.")


# ---------- word analogies ----------
def analog(test, diff, a, b, c, key, others, why):
    add(test, "Word analogies", diff, f"Which word completes the sentence in the best way?\n\n**{a}** is to **{b}** as **{c}** is to **?**",
        [key] + others, key, why)


analog(1, 1, "Puppy", "dog", "kitten", "cat", ["milk", "cub", "lamb", "whisker"],
       "A puppy is a young dog, so a kitten is a young cat.")
analog(1, 2, "Author", "book", "composer", "music", ["piano", "concert", "orchestra", "singer"],
       "An author writes a book; a composer writes music. A concert is where music is played, not what a composer writes.")
analog(2, 1, "Hot", "cold", "wet", "dry", ["rain", "damp", "warm", "water"],
       "Hot and cold are opposites, so the pair for wet is its opposite, dry. Damp means nearly the same as wet.")
analog(2, 1, "Hand", "glove", "foot", "sock", ["toe", "ankle", "walk", "heel"],
       "A glove is worn on the hand and a sock is worn on the foot. Toe, ankle and heel are parts of the foot.")
analog(0, 2, "Bee", "hive", "bird", "nest", ["wing", "egg", "tree", "feather"],
       "A bee's home is a hive and a bird's home is a nest. A bird may nest in a tree, but the nest is the home it builds.")
