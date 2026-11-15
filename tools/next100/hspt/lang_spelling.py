# HSPT Language: spelling. Original items.
S = "Which word is spelled correctly?"
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Spelling", diff=2, stem=S,
       key="necessary", wrong=["neccessary", "necesary", "nesessary"],
       expl="Necessary has one c and two s's. A memory trick: one collar and two sleeves."),
  dict(test=1, skill="Spelling", diff=1, stem=S,
       key="receive", wrong=["recieve", "receeve", "resieve"],
       expl="Receive follows the rule i before e except after c: the c is followed by ei."),
  dict(test=1, skill="Spelling", diff=3, stem=S,
       key="embarrass", wrong=["embarras", "embarress", "imbarrass"],
       expl="Embarrass has a double r and a double s, and it begins with em."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Spelling", diff=2, stem=S,
       key="separate", wrong=["seperate", "separete", "seperete"],
       expl="Separate has a in the middle: sep-a-rate. A memory trick: there is a rat in separate."),
  dict(test=2, skill="Spelling", diff=2, stem=S,
       key="beginning", wrong=["begining", "beginnning", "beggining"],
       expl="Begin ends in one vowel and one consonant with the stress at the end, so the n is doubled before -ing: beginning."),
  dict(test=2, skill="Spelling", diff=3, stem=S,
       key="rhythm", wrong=["rythm", "rhythym", "rhythem"],
       expl="Rhythm has no vowel other than the y: r-h-y-t-h-m."),

  # ---------------- Drill only ----------------
  dict(test=0, skill="Spelling", diff=1, stem=S,
       key="library", wrong=["libary", "liberry", "librery"],
       expl="Library has an r after the b: li-brar-y."),
  dict(test=0, skill="Spelling", diff=2, stem=S,
       key="definitely", wrong=["definately", "definitly", "defanitely"],
       expl="Definitely comes from finite, so it is spelled de-fin-ite-ly, with no a."),
  dict(test=0, skill="Spelling", diff=3, stem=S,
       key="occurred", wrong=["occured", "ocurred", "occurrred"],
       expl="Occurred has a double c and a double r. The r doubles because occur is stressed on its last syllable."),
  dict(test=0, skill="Spelling", diff=1, stem=S,
       key="February", wrong=["Febuary", "Febrary", "Februery"],
       expl="February has an r after the b and ends in -uary: Feb-ru-ar-y."),
]
