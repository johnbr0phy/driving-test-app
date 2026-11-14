# Drill-only short passages (under 1,600 characters, so the landing can print them as samples).

D11 = {"id": "IELTSR-D-P11", "title": "The Humble Pencil", "text": (
    "In the sixteenth century, a large deposit of unusually pure graphite was found at Borrowdale, in the north of England. Local people at first used it to mark sheep, but it was soon cut into sticks for writing and drawing. Because pure graphite is soft and brittle, the sticks were wrapped in string or set into wooden holders. For a long time the deposit was so valuable that it was guarded, and supplies were controlled to keep prices high.\n\n"
    "Other countries had no such source, and their pencils were often poor. In 1795, during a war that cut France off from English graphite, the French engineer Nicolas-Jacques Conté found a solution. He ground graphite into powder, mixed it with clay and baked the mixture. By changing the amount of clay, he could make leads that were harder or softer, so that one material could serve both artists and engineers.\n\n"
    "The same basic method is still used today. Leads with more clay are harder and make paler lines, while those with more graphite are softer and darker. Ordinary pencils contain no lead at all; the name survives from an old belief that graphite was a form of the metal."
)}

D11_ITEMS = [
    TF(1, "People first used the Borrowdale graphite to mark sheep.", "T",
       "The first paragraph says local people at first used it to mark sheep."),
    TF(1, "Anyone was free to take graphite from the Borrowdale deposit.", "F",
       "The first paragraph says the deposit was guarded and supplies were controlled, which contradicts the statement."),
    TF(2, "Conté's pencils were cheaper than English pencils.", "NG",
       "The passage explains how Conté made his leads but never compares their price with English pencils."),
    MC(2, "What did changing the amount of clay allow Conté to do?", "Make harder or softer leads",
       ["Bake the leads more quickly", "Make pencils without any wood", "Produce pencils in several colours"],
       "The second paragraph says that by changing the amount of clay he could make leads that were harder or softer, for artists and engineers alike."),
    MC(2, "Which kind of lead makes the palest line?", "One that contains more clay",
       ["One that contains more graphite", "One made of pure graphite", "One that was baked for longer"],
       "The last paragraph says leads with more clay are harder and make paler lines, while more graphite gives softer, darker lines."),
    CZ(1, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nDespite their name, ordinary pencils contain no [[1]].",
       "lead", ["clay", "wood", "graphite", "carbon"],
       "The last paragraph says ordinary pencils contain no lead at all; the name comes from an old belief that graphite was a form of the metal."),
]

D12 = {"id": "IELTSR-D-P12", "title": "Why Cities Stay Warm at Night", "text": (
    "On a still summer evening, the centre of a large city can be several degrees warmer than the countryside around it. Scientists call this the urban heat island effect. Part of the cause lies in the materials cities are built from. Dark roads and roofs absorb sunlight during the day and release the heat slowly after dark, so city streets cool far less at night than open fields. Tall buildings make the problem worse by trapping warm air and blocking the breezes that might carry it away.\n\n"
    "Human activity adds further heat. Cars, factories and air conditioners all release warmth into the streets, and in hot weather the extra air conditioning needed to keep buildings cool can itself raise outdoor temperatures. Cities also have fewer plants than the countryside. Trees and grass cool the air around them by releasing water vapour, and they shade the ground beneath them.\n\n"
    "Many cities are now trying to reduce the effect. Some paint roofs white or pale colours so that they reflect more sunlight, while others plant trees along streets or cover roofs with plants. These measures matter because high night-time temperatures can be dangerous, especially for elderly people, who may be unable to recover from the heat of the day."
)}

D12_ITEMS = [
    TF(1, "City streets cool down more at night than open fields.", "F",
       "The first paragraph says city streets cool far less at night than open fields."),
    TF(2, "Air conditioning can raise temperatures outside buildings.", "T",
       "The second paragraph says the extra air conditioning needed in hot weather can itself raise outdoor temperatures."),
    TF(2, "The heat island effect is strongest in winter.", "NG",
       "The passage describes a summer evening but never compares the strength of the effect in different seasons."),
    MC(1, "How do tall buildings add to the heat island effect?", "They trap warm air and block breezes",
       ["They absorb more sunlight than roads", "They need more air conditioning", "They cast too little shade on streets"],
       "The first paragraph says tall buildings make the problem worse by trapping warm air and blocking the breezes that might carry it away."),
    MC(2, "Why does the writer mention elderly people?", "Hot nights can be dangerous for them",
       ["They use the most air conditioning", "They mostly live in city centres", "They prefer roofs painted pale colours"],
       "The last paragraph says high night-time temperatures can be dangerous, especially for elderly people who may not recover from the heat of the day."),
    CZ(1, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nTrees and grass cool the air around them by releasing water [[1]].",
       "vapour", ["droplets", "heat", "pressure", "ice"],
       "The second paragraph says trees and grass cool the air by releasing water vapour and by shading the ground."),
]

PASSAGES = [(D11, D11_ITEMS), (D12, D12_ITEMS)]
