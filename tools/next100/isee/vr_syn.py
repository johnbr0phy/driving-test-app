# ISEE Middle Level, Verbal Reasoning: synonyms. Original items.
# The stem is one word in capitals; the four choices are single words, listed
# in alphabetical order by the build (as on the real test).


def S(test, diff, word, key, wrong, expl):
    return dict(test=test, skill="Synonyms", diff=diff, stem=f"{word}:", key=key, wrong=wrong, expl=expl)


ITEMS = [
    # ---------------- Practice Test 1 ----------------
    S(1, 1, "ABUNDANT", "plentiful", ["distant", "heavy", "scarce"],
      "Abundant means there is more than enough, so plentiful is closest. Scarce is its opposite."),
    S(1, 1, "FRAGILE", "delicate", ["ancient", "sturdy", "valuable"],
      "Something fragile breaks easily, like something delicate. Sturdy means the opposite, and an object can be valuable without being fragile."),
    S(1, 1, "TEDIOUS", "boring", ["careful", "exciting", "tidy"],
      "A tedious task is long and dull, so boring is closest. Exciting is the opposite."),
    S(1, 2, "CANDID", "honest", ["cheerful", "secretive", "sweet"],
      "A candid answer is open and honest. Candid sounds like candy, but it has nothing to do with sweet."),
    S(1, 2, "RELUCTANT", "unwilling", ["eager", "forgetful", "tired"],
      "A reluctant helper does not want to help, so unwilling is closest. Eager is the opposite."),
    S(1, 2, "VIGILANT", "watchful", ["brave", "sleepy", "violent"],
      "A vigilant guard stays alert and watchful. Vigilant and violent look alike but are unrelated."),
    S(1, 2, "FRUGAL", "thrifty", ["fruitful", "grumpy", "wasteful"],
      "A frugal person spends carefully and avoids waste, which is what thrifty means. Wasteful is the opposite, and fruitful only looks similar."),
    S(1, 3, "INTREPID", "fearless", ["clumsy", "curious", "timid"],
      "An intrepid explorer is bold and fearless. Timid, meaning shy and easily frightened, is the opposite."),
    S(1, 3, "AMBIGUOUS", "unclear", ["ambitious", "enormous", "obvious"],
      "An ambiguous statement can be read more than one way, so its meaning is unclear. Obvious is the opposite, and ambitious only sounds similar."),
    S(1, 3, "ELATED", "joyful", ["delayed", "gloomy", "proud"],
      "Elated means extremely happy, so joyful is closest. Gloomy is the opposite."),
    # ---------------- Practice Test 2 ----------------
    S(2, 1, "METICULOUS", "careful", ["careless", "messy", "quick"],
      "A meticulous worker pays close attention to every detail, so careful is closest. Careless and messy are opposites."),
    S(2, 1, "SERENE", "calm", ["bright", "noisy", "serious"],
      "A serene lake or face is peaceful and calm. Serene and serious begin alike but mean different things."),
    S(2, 1, "DILIGENT", "hardworking", ["delicate", "intelligent", "lazy"],
      "A diligent student keeps working steadily and with effort. Lazy is the opposite, and a person can be intelligent without being diligent."),
    S(2, 2, "OBSOLETE", "outdated", ["broken", "modern", "obvious"],
      "Something obsolete is no longer used because something newer replaced it, so outdated is closest. An obsolete machine may still work, so broken is not the meaning."),
    S(2, 2, "BENEVOLENT", "kind", ["clever", "cruel", "wealthy"],
      "Benevolent comes from Latin words for wishing well, and it means kind and generous. Cruel is the opposite."),
    S(2, 2, "HOSTILE", "unfriendly", ["hospitable", "shy", "welcoming"],
      "A hostile crowd is unfriendly or even aggressive. Hospitable and welcoming mean the opposite."),
    S(2, 2, "PERPLEXED", "confused", ["annoyed", "certain", "delighted"],
      "A perplexed person is puzzled and confused. Certain is the opposite."),
    S(2, 3, "VERSATILE", "adaptable", ["famous", "limited", "talkative"],
      "A versatile tool or athlete can do many different things, so adaptable is closest. Limited is the opposite."),
    S(2, 3, "TRANQUIL", "peaceful", ["restless", "transparent", "tropical"],
      "A tranquil garden is quiet and peaceful. Restless is the opposite, and transparent and tropical only share the opening letters."),
    S(2, 3, "LUCID", "clear", ["loud", "lucky", "puzzling"],
      "A lucid explanation is easy to understand, so clear is closest. Puzzling is the opposite, and lucky only looks similar."),
    # ---------------- Drill only ----------------
    S(0, 1, "RIGID", "stiff", ["bendable", "rough", "tidy"],
      "A rigid ruler does not bend, so stiff is closest. Bendable is the opposite."),
    S(0, 1, "MEAGER", "small", ["eager", "generous", "hungry"],
      "A meager meal is small and not enough, so small is closest. Generous is the opposite, and eager only sounds similar."),
    S(0, 1, "GENUINE", "authentic", ["fake", "generous", "gentle"],
      "A genuine diamond is real, or authentic. Fake is the opposite, and generous and gentle only look similar."),
    S(0, 2, "ADEQUATE", "sufficient", ["equal", "excellent", "lacking"],
      "Adequate means good enough for what is needed, so sufficient is closest. Adequate is less than excellent, and lacking is the opposite."),
    S(0, 2, "FEROCIOUS", "fierce", ["gentle", "hungry", "rapid"],
      "A ferocious animal is savage and fierce. Gentle is the opposite."),
    S(0, 2, "IMMENSE", "huge", ["distant", "immediate", "tiny"],
      "Immense means extremely large, so huge is closest. Tiny is the opposite, and immediate only begins the same way."),
    S(0, 2, "PRUDENT", "wise", ["proud", "reckless", "shy"],
      "A prudent choice shows good judgment and care, so wise is closest. Reckless is the opposite."),
    S(0, 3, "LUMINOUS", "glowing", ["damp", "dim", "enormous"],
      "A luminous object gives off light, so glowing is closest. Dim is the opposite, and enormous only shares the ending."),
    S(0, 3, "ABRUPT", "sudden", ["gradual", "polite", "steady"],
      "An abrupt stop happens all at once, so sudden is closest. Gradual is the opposite."),
    S(0, 3, "COMPEL", "force", ["allow", "complete", "praise"],
      "To compel someone is to force them to act. Allow means to let someone choose, which is close to the opposite."),
]
