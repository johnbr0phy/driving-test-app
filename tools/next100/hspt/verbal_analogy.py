# HSPT Verbal Skills: verbal analogies. Original items.
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Verbal analogies", diff=1,
       stem="**Pilot** is to **airplane** as **captain** is to:",
       key="ship", wrong=["crew", "ocean", "anchor"],
       expl="A pilot is in charge of flying an airplane, and a captain is in charge of a ship. The crew works for the captain; it is not what the captain commands in the same way."),
  dict(test=1, skill="Verbal analogies", diff=2,
       stem="**Thermometer** is to **temperature** as **scale** is to:",
       key="weight", wrong=["kitchen", "balance", "height"],
       expl="A thermometer measures temperature, and a scale measures weight. Height is measured with a ruler or tape measure."),
  dict(test=1, skill="Verbal analogies", diff=3,
       stem="**Drought** is to **water** as **famine** is to:",
       key="food", wrong=["hunger", "rain", "farm"],
       expl="A drought is a serious lack of water, and a famine is a serious lack of food. Hunger is what a famine causes, not what is missing."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Verbal analogies", diff=1,
       stem="**Petal** is to **flower** as **page** is to:",
       key="book", wrong=["word", "library", "reader"],
       expl="A petal is one part of a flower, and a page is one part of a book. A word is a part of a page, which reverses the relationship."),
  dict(test=2, skill="Verbal analogies", diff=1,
       stem="**Hive** is to **bee** as **nest** is to:",
       key="bird", wrong=["egg", "tree", "feather"],
       expl="A bee lives in a hive, and a bird lives in a nest. An egg is kept in a nest, but it is not the animal that builds and lives in it."),
  dict(test=2, skill="Verbal analogies", diff=3,
       stem="**Cautious** is to **reckless** as **humble** is to:",
       key="arrogant", wrong=["modest", "patient", "polite"],
       expl="Cautious and reckless are opposites, so the answer must be the opposite of humble, which is arrogant. Modest means nearly the same as humble."),

  # ---------------- Drill only ----------------
  dict(test=0, skill="Verbal analogies", diff=2,
       stem="**Sculptor** is to **clay** as **carpenter** is to:",
       key="wood", wrong=["hammer", "house", "saw"],
       expl="A sculptor shapes clay, and a carpenter shapes wood. A hammer and a saw are a carpenter's tools, not the material."),
]
