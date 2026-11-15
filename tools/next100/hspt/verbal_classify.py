# HSPT Verbal Skills: verbal classification (which word does not belong). Original items.
S = "Which word does not belong with the others?"
ITEMS = [
  # ---------------- Practice Test 1 ----------------
  dict(test=1, skill="Verbal classification", diff=1, stem=S,
       key="tulip", wrong=["oak", "maple", "birch"],
       expl="Oak, maple and birch are all trees. A tulip is a flower."),
  dict(test=1, skill="Verbal classification", diff=1, stem=S,
       key="flute", wrong=["violin", "cello", "harp"],
       expl="A violin, a cello and a harp are all played by moving strings. A flute is a wind instrument."),
  dict(test=1, skill="Verbal classification", diff=2, stem=S,
       key="shout", wrong=["whisper", "murmur", "mumble"],
       expl="Whisper, murmur and mumble are all ways of speaking quietly. To shout is to speak loudly."),
  dict(test=1, skill="Verbal classification", diff=1, stem=S,
       key="circle", wrong=["triangle", "square", "pentagon"],
       expl="A triangle, a square and a pentagon are all made of straight sides. A circle has no straight sides."),
  dict(test=1, skill="Verbal classification", diff=2, stem=S,
       key="modern", wrong=["ancient", "antique", "aged"],
       expl="Ancient, antique and aged all describe something old. Modern describes something new."),
  dict(test=1, skill="Verbal classification", diff=3, stem=S,
       key="content", wrong=["furious", "irate", "enraged"],
       expl="Furious, irate and enraged all mean very angry. Content means calm and satisfied."),

  # ---------------- Practice Test 2 ----------------
  dict(test=2, skill="Verbal classification", diff=1, stem=S,
       key="Moon", wrong=["Mercury", "Venus", "Mars"],
       expl="Mercury, Venus and Mars are planets that orbit the sun. The Moon orbits Earth."),
  dict(test=2, skill="Verbal classification", diff=2, stem=S,
       key="granite", wrong=["copper", "aluminum", "silver"],
       expl="Copper, aluminum and silver are all metals. Granite is a kind of rock."),
  dict(test=2, skill="Verbal classification", diff=1, stem=S,
       key="stroll", wrong=["sprint", "dash", "race"],
       expl="Sprint, dash and race all mean to move very fast. To stroll is to walk slowly."),
  dict(test=2, skill="Verbal classification", diff=1, stem=S,
       key="timid", wrong=["brave", "bold", "fearless"],
       expl="Brave, bold and fearless all describe someone without fear. Timid describes someone easily frightened."),
  dict(test=2, skill="Verbal classification", diff=2, stem=S,
       key="kilogram", wrong=["centimeter", "kilometer", "millimeter"],
       expl="A centimeter, a kilometer and a millimeter all measure length. A kilogram measures mass."),
  dict(test=2, skill="Verbal classification", diff=3, stem=S,
       key="lavish", wrong=["frugal", "thrifty", "economical"],
       expl="Frugal, thrifty and economical all describe careful spending. Lavish describes spending freely and generously."),

  # ---------------- Drill only ----------------
  dict(test=0, skill="Verbal classification", diff=1, stem=S,
       key="bat", wrong=["eagle", "hawk", "owl"],
       expl="An eagle, a hawk and an owl are all birds. A bat flies too, but it is a mammal."),
]
