# Cloze: one original passage per test with ten numbered gaps. Key first.
A = "JAMBENG-T1-CZ"
B = "JAMBENG-T2-CZ"
C = "JAMBENG-D-CZ"


def G(t, d, n, opts, expl, stim):
    return S(t, d, "Cloze", f"Choose the option that best fills gap ({n}).", opts, expl, stim=stim)


ITEMS = [
    # ---------- Test 1: plastic waste ----------
    G(1, 1, 1, ["blocks", "cleans", "widens", "empties"],
      "Waste in the drains stops the water, which then \"spills into streets and homes\". Cleaning, widening or emptying the drains would do the opposite.", A),
    G(1, 2, 2, ["tackle", "notice", "create", "admire"],
      "A problem \"too large to tackle\" is one people felt unable to deal with. That sets up the contrast with the young people who have begun to act.", A),
    G(1, 2, 3, ["resource", "burden", "disease", "liability"],
      "\"Not as a nuisance but as a ...\" needs a word opposite in feeling to nuisance. A resource is something of value, which matches the paid collection in the next paragraph.", A),
    G(1, 2, 4, ["processed", "buried", "burnt", "scattered"],
      "Plastic that factories reuse has to be processed into pellets. Burying, burning or scattering it would leave nothing to sell.", A),
    G(1, 2, 5, ["exchanged", "punished", "arrested", "dismissed"],
      "Households keep bottles \"knowing they can be exchanged for cash or household goods\". Only exchanged takes \"for\" with that meaning.", A),
    G(1, 1, 6, ["benefits", "dangers", "failures", "costs"],
      "The sentence lists good results: freer drains, fewer floods, new jobs. Those are benefits.", A),
    G(1, 1, 7, ["employment", "punishment", "retirement", "excitement"],
      "Young people paid to collect and sort plastic have found employment, that is, work. The other nouns do not fit the economic sense of the paragraph.", A),
    G(1, 3, 8, ["urged", "forbidden", "prevented", "excused"],
      "\"Manufacturers must be urged to use less packaging\", that is, pressed to do so. Forbidden and prevented would stop them using less, and excused reverses the sense.", A),
    G(1, 3, 9, ["agency", "agenda", "occasion", "season"],
      "A clean city is not the work of one agency, a single organisation, \"but of everyone\". An agenda or an occasion cannot do work.", A),
    G(1, 2, 10, ["shared", "hidden", "wasted", "refused"],
      "The benefits of a clean city \"are shared by all\" who live in it, which completes the idea that everyone takes part.", A),
    # ---------- Test 2: inter-house sports ----------
    G(2, 1, 1, ["selects", "dismisses", "rejects", "forgets"],
      "Each house selects its best athletes and begins training them. Dismissing or rejecting them would leave nobody to train.", B),
    G(2, 2, 2, ["help", "complain", "compete", "conclude"],
      "Students who cannot run find other ways to help: banners, songs and the march past. \"Compete\" is tempting, but those activities are support, not competition.", B),
    G(2, 2, 3, ["ablaze", "empty", "silent", "bare"],
      "\"Ablaze with colour\" is a fixed expression for something very brightly coloured, matching the crowds, banners and drums. Empty and bare contradict the scene.", B),
    G(2, 3, 4, ["far", "afar", "farther", "further"],
      "\"Can be heard far away\" is the standard phrase. \"Afar\" is used in \"from afar\", and farther and further need a comparison.", B),
    G(2, 2, 5, ["outcome", "income", "upkeep", "overhead"],
      "The outcome, the result, of the first race sets the mood for the day. Income, upkeep and overhead are not results of a race.", B),
    G(2, 2, 6, ["beaten", "beating", "beat", "beats"],
      "After \"are\" in a passive sentence the past participle is needed: others \"are beaten at the finishing line\".", B),
    G(2, 2, 7, ["sportsmanship", "craftsmanship", "seamanship", "showmanship"],
      "Learning to win and lose with dignity is sportsmanship. Craftsmanship, seamanship and showmanship are skills of other fields.", B),
    G(2, 2, 8, ["respect", "money", "anger", "contempt"],
      "A house that loses with dignity earns as much respect as one that wins with arrogance; respect is what dignity earns.", B),
    G(2, 1, 9, ["presented", "stolen", "broken", "abandoned"],
      "At the end of a competition the trophy is presented to the winners. The other verbs do not suit a prize-giving.", B),
    G(2, 3, 10, ["endure", "vanish", "decline", "collapse"],
      "\"But\" contrasts the folded banners with the friendships, which endure, that is, last. Vanish and collapse would make \"but\" pointless.", B),
    # ---------- Drill: contribution groups ----------
    G(0, 1, 1, ["pay", "withdraw", "borrow", "refund"],
      "Members agree to pay a fixed sum at regular intervals, which builds the amount given to one member each time.", C),
    G(0, 2, 2, ["turn", "secret", "advance", "debt"],
      "\"Each time the whole amount is given to one member in turn\" means the members take it one after another, and the next sentence confirms that everyone receives it once.", C),
    G(0, 2, 3, ["depends", "insists", "consists", "remarks"],
      "A system that depends on trust needs trust in order to work, which the next sentences explain. \"Consists of\" takes a different preposition, and \"insists on\" or \"remarks on\" need a person as subject.", C),
    G(0, 3, 4, ["defaults", "insists", "agrees", "reflects"],
      "To default on a duty or a debt is to fail to pay it. A member who defaults loses respect; insisting on or reflecting on a duty would not.", C),
    G(0, 2, 5, ["admit", "ignore", "praise", "describe"],
      "Few groups will admit, let in, a known defaulter again. Ignore, praise and describe do not make sense with \"again\" here.", C),
    G(0, 2, 6, ["compels", "forbids", "prevents", "discourages"],
      "The group compels members to set money aside when they might spend it. The other verbs mean stopping them, which contradicts the paragraph.", C),
    G(0, 2, 7, ["invested", "wasted", "hidden", "borrowed"],
      "A large sum received at once can be invested wisely, for example in stock for a shop. \"Wasted wisely\" contradicts itself.", C),
    G(0, 1, 8, ["remind", "punish", "elect", "replace"],
      "Groups now remind members of their payments by text message. Punishing or replacing members by text does not fit the friendly tone.", C),
    G(0, 3, 9, ["principle", "principal", "principality", "principled"],
      "The principle, the basic idea, remains the same. Principal is a head of school or a sum of money, and principled is an adjective.", C),
    G(0, 2, 10, ["trust", "luck", "fear", "force"],
      "The passage has shown that the system \"depends on trust\"; trust and discipline are what achieve a great deal.", C),
]
