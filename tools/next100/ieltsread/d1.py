# Drill-only passages: the shipping container, and how birds find their way.

D1 = {"id": "IELTSR-D-P01", "title": "The Box That Changed Trade", "text": (
    "**A** Before the middle of the twentieth century, loading a cargo ship was slow and costly work. Goods arrived at the docks in sacks, barrels, crates and bales of every size, and teams of dockworkers carried or hoisted each item into the hold, where it had to be packed by hand so that it would not shift at sea. A large ship could spend a week or more in port being loaded and unloaded, and theft and damage were common.\n\n"
    "**B** The idea of packing goods into standard boxes had been tried before, but it is usually credited to Malcom McLean, an American trucking businessman. In 1956 a converted tanker, the Ideal X, sailed from Newark to Houston carrying fifty-eight metal containers that could be lifted directly from lorries onto the deck. McLean's insight was not the box itself but the system around it: ships, cranes, lorries and trains designed so that a container could move between them without ever being opened.\n\n"
    "**C** At first, different companies used boxes of different sizes, which meant that a container from one line might not fit another's ships or cranes. During the 1960s, international standards were agreed for the dimensions of containers and for the corner fittings by which they are lifted and locked together. The twenty-foot box became the industry's unit of measurement, so that a ship's capacity is still described in twenty-foot equivalent units.\n\n"
    "**D** The effects on ports were dramatic. Cranes could now move a container in minutes, and a ship that once spent a week in harbour could be turned around far more quickly. Fewer dockworkers were needed, and in many old port cities the busy waterfront districts declined as shipping moved to new terminals with deep water and large areas of flat land for stacking boxes.\n\n"
    "**E** Cheaper shipping also changed what was made where. When the cost of moving goods across an ocean became a small share of their price, manufacturers could build factories far from their customers and assemble products from parts made in several countries. Some economists argue that the container did more to expand world trade than many trade agreements.\n\n"
    "**F** The system has weaknesses. Because so much depends on a few very large ports and shipping routes, a blockage in one place can delay goods around the world. Containers also make it harder for customs officers to check what is inside, since only a small proportion can be opened and searched."
)}

D1_ITEMS = [
    HEAD(1, "B", "More than a new kind of box",
         ["Agreeing on a common size", "Resistance from dockworkers and their unions", "The first container to cross an ocean", "New patterns of manufacturing"],
         "Paragraph B says McLean's insight was not the box itself but the system of ships, cranes, lorries and trains built around it. The Ideal X sailed along the coast from Newark to Houston, not across an ocean."),
    HEAD(1, "C", "Agreeing on a common size",
         ["More than a new kind of box", "Rising fuel costs for ships", "Risks of a highly connected system", "Faster ports and a changing waterfront"],
         "Paragraph C describes how boxes of different sizes did not fit other lines' ships, until international standards were agreed in the 1960s."),
    HEAD(2, "D", "Faster ports and a changing waterfront",
         ["Resistance from dockworkers and their unions", "Agreeing on a common size", "New patterns of manufacturing", "Rising fuel costs for ships"],
         "Paragraph D covers quicker turnarounds, fewer dockworkers and old waterfront districts declining. Fewer jobs are mentioned, but not any resistance to the change."),
    HEAD(2, "E", "New patterns of manufacturing",
         ["Risks of a highly connected system", "The first container to cross an ocean", "Faster ports and a changing waterfront", "More than a new kind of box"],
         "Paragraph E explains that cheap shipping let manufacturers build far from customers and assemble products from parts made in several countries."),
    HEAD(1, "F", "Risks of a highly connected system",
         ["New patterns of manufacturing", "Rising fuel costs for ships", "Resistance from dockworkers and their unions", "Agreeing on a common size"],
         "Paragraph F names two weaknesses: a blockage at one large port delays goods worldwide, and few containers can be searched."),
    TF(1, "McLean had worked in the trucking business.", "T",
       "Paragraph B calls McLean an American trucking businessman."),
    TF(2, "The Ideal X was built specifically to carry containers.", "F",
       "Paragraph B says the Ideal X was a converted tanker, so it was not built for containers."),
    TF(2, "The international container standards were first proposed by McLean.", "NG",
       "Paragraph C says standards were agreed in the 1960s but does not say who proposed them."),
    CZ(1, "Note completion", "Complete the note. Choose ONE word from the list.\n\nShip capacity: measured in twenty-foot equivalent [[1]]",
       "units", ["boxes", "tons", "lengths", "loads"],
       "Paragraph C says a ship's capacity is still described in twenty-foot equivalent units."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nContainers are lifted and locked together by their corner [[1]].",
       "fittings", ["handles", "hooks", "brackets", "chains"],
       "Paragraph C mentions standards for the corner fittings by which containers are lifted and locked together."),
    MC(2, "According to Paragraph E, what do some economists believe about the container?", "It expanded trade more than many agreements",
       ["It moved factories much closer to their customers", "It raised the price of most goods", "It mattered less than cheaper fuel"],
       "Paragraph E says some economists argue the container did more to expand world trade than many trade agreements. Factories in fact moved further from customers."),
    MC(2, "Which problem with containers is mentioned in Paragraph F?", "Few of them can be opened for checks",
       ["Many of them are lost at sea", "They rust quickly in salty air", "They cannot be carried by train or lorry"],
       "Paragraph F says only a small proportion can be opened and searched, which makes customs checks harder. Trains are part of the system in Paragraph B."),
]

D2 = {"id": "IELTSR-D-P02", "title": "How Birds Find Their Way", "text": (
    "**A** Each autumn, billions of birds leave their breeding grounds and fly to the places where they will spend the winter, some covering thousands of kilometres. Many young birds make this journey alone on their first attempt, without parents to follow, and yet they arrive in roughly the right place. How they manage it has puzzled naturalists for centuries, and the answer, it now seems, is that birds use not one method but several.\n\n"
    "**B** The sun is one guide. In experiments carried out in the 1950s, caged starlings became restless at migration time and tended to face in their normal direction of travel. When mirrors were used to shift the apparent position of the sun, the birds shifted their direction to match. Because the sun moves across the sky during the day, a bird using it as a compass must also keep track of the time, which it appears to do with an internal body clock.\n\n"
    "**C** Many songbirds migrate at night, and for them the stars matter. Researchers raising young birds under the artificial sky of a planetarium found that the birds learned to orient themselves by the part of the sky around which the stars appear to turn. When the projected sky was made to rotate around a different star, the birds adjusted accordingly, which suggested that they were learning the pattern rather than being born with a fixed map.\n\n"
    "**D** Birds can also sense the Earth's magnetic field. In tests using artificial magnetic fields, birds changed the direction they faced when the field around them was altered. How they detect the field is still debated. One theory points to chemical reactions in the eye that may be affected by magnetism, which would mean that birds could in some sense see the field; another focuses on tiny particles of iron-containing material in the beak.\n\n"
    "**E** Some seabirds seem to rely on smell. Shearwaters whose sense of smell had been temporarily blocked were able to fly normally but had great difficulty finding their way home across open sea, while birds whose magnetic sense had been disturbed did much better. Over featureless water, odours carried by the wind may provide a kind of map that the other senses cannot.\n\n"
    "**F** No single cue explains everything, and birds appear to check one against another. Clouds can hide the sun and stars, and magnetic readings vary from place to place, so a system with several back-ups is more reliable than any one sense alone. Young birds may also make mistakes that older birds avoid: experienced travellers that are blown off course are often better at returning to their usual route than first-year birds."
)}

D2_ITEMS = [
    HEAD(2, "B", "Following the sun with an inner clock",
         ["Learning the night sky", "How birds choose a winter home", "The role of parents on the first journey", "Several cues that check each other"],
         "Paragraph B describes starlings that followed the apparent position of the sun and explains that a sun compass also needs an internal body clock."),
    HEAD(2, "C", "Learning the night sky",
         ["The dangers of migrating at night", "Following the sun with an inner clock", "A sense of the Earth's magnetism", "Why some birds never migrate"],
         "Paragraph C reports that young birds in a planetarium learned which part of the sky the stars turn around. Night migration is mentioned, but its dangers are not."),
    HEAD(2, "D", "A sense of the Earth's magnetism",
         ["Finding the way by smell", "Learning the night sky", "How birds choose a winter home", "The dangers of migrating at night"],
         "Paragraph D covers tests with artificial magnetic fields and two theories of how birds detect the field."),
    HEAD(1, "E", "Finding the way by smell",
         ["A sense of the Earth's magnetism", "Why some birds never migrate", "The role of parents on the first journey", "Following the sun with an inner clock"],
         "Paragraph E describes shearwaters that could not find home when their sense of smell was blocked."),
    HEAD(2, "F", "Several cues that check each other",
         ["The role of parents on the first journey", "How birds choose a winter home", "Finding the way by smell", "The dangers of migrating at night"],
         "Paragraph F says no single cue explains everything and that a system with several back-ups is more reliable. Experienced birds are compared with young ones, but parents are not discussed."),
    MC(2, "What did the starling experiments show?", "The birds changed direction to follow the sun",
       ["The birds flew further when the sun was hidden", "The birds could not migrate while caged", "The birds ignored where the sun appeared"],
       "Paragraph B says that when mirrors shifted the apparent position of the sun, the birds shifted their direction to match."),
    MC(2, "What did the planetarium study suggest about young birds?", "They learn the pattern of the stars",
       ["They are born with a map of the stars", "They prefer to migrate by day", "They follow the brightest star"],
       "Paragraph C says the birds adjusted when the sky turned around a different star, suggesting they learn the pattern rather than being born with a fixed map."),
    MC(2, "What happened to shearwaters whose sense of smell was blocked?", "They struggled to find their way home",
       ["They were unable to fly normally", "They used the sun instead", "They did better than the other group of birds"],
       "Paragraph E says these birds flew normally but had great difficulty finding home. It was the birds with a disturbed magnetic sense that did much better."),
    CZ(1, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nA bird that uses the sun as a compass must also keep track of the [[1]].",
       "time", ["season", "distance", "weather", "wind"],
       "Paragraph B says the sun moves across the sky, so a bird using it must also keep track of the time with an internal clock."),
    CZ(2, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nOne theory says that chemical reactions in a bird's [[1]] may be affected by magnetism.",
       "eye", ["beak", "brain", "feathers", "ear"],
       "Paragraph D says one theory points to chemical reactions in the eye. The beak belongs to the second theory, about iron-containing particles."),
    MI(1, "a reference to young birds travelling without adults", "A", "ABCDEF",
       "Paragraph A says many young birds make their first journey alone, without parents to follow."),
    MI(2, "a comparison between experienced birds and first-year birds", "F", "ABCDEF",
       "Paragraph F says experienced travellers blown off course are often better at returning to their route than first-year birds."),
]

PASSAGES = [(D1, D1_ITEMS), (D2, D2_ITEMS)]
