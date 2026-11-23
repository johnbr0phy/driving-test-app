# Verbal reasoning, Practice Test 2: five original passages, six questions each.
PASSAGES = [
    P(2, "Late-night transport in a city",
      "A city transport authority has extended its late-night bus service on Fridays and Saturdays, with "
      "the last buses now leaving the centre at 3 a.m. instead of 1 a.m. The change follows a consultation "
      "in which bar staff, hospital workers and students said they often had no safe way home.\n\n"
      "In the first three months, passenger numbers on the late buses averaged 1,900 a weekend. The "
      "authority says this is below its target of 2,500 but notes that awareness of the new times is still "
      "growing. Taxi drivers' representatives have complained that the buses take business from them, "
      "although they also say there are too few taxis at that hour to meet demand. Local businesses have "
      "asked that the service run on Thursdays as well.",
      [
          TF("The last buses on Fridays and Saturdays now leave the centre two hours later than before.", "T",
             "They now leave at 3 a.m. instead of 1 a.m., which is two hours later."),
          TF("The late buses met the authority's passenger target in their first three months.", "F",
             "They averaged 1,900 a weekend against a target of 2,500."),
          TF("Hospital workers were among those consulted about the service.", "T",
             "The consultation included bar staff, hospital workers and students."),
          TF("The authority has agreed to run the late buses on Thursdays.", "C",
             "Local businesses have asked for Thursday buses, but the passage does not say what the authority decided."),
          MC("Inference", "What does the taxi drivers' second point suggest?",
             ["The buses may meet demand that taxis cannot",
              "Taxi fares at night should be raised",
              "The late buses carry more passengers than taxis",
              "Taxi drivers asked for the consultation"],
             "If there are too few taxis at that hour, some late-night travellers have no taxi to take, so the buses may be serving people taxis could not."),
          MC("Main point", "Which statement best describes the passage?",
             ["A new service and early reactions to it",
              "An argument that the late buses should be withdrawn",
              "A complaint by taxi drivers about the city centre",
              "A survey of students' travel habits at night"],
             "The passage describes the extended service, its first passenger figures and the responses of taxi drivers and businesses. It argues neither for nor against it."),
      ]),
    P(2, "Speed checks near schools",
      "A county council recorded the speed of traffic outside eight primary schools before and after "
      "flashing signs were installed. The signs light up a 30 km/h limit during the morning and afternoon "
      "school runs. Before the signs, 46% of vehicles passing the schools at those times were over the "
      "limit; a year later, the share was 29%.\n\n"
      "The fall was not the same everywhere. At the two schools on main roads, where traffic is heaviest, "
      "speeds fell only slightly. At schools on smaller roads, the drop was larger. Council engineers "
      "think drivers on main roads expect to keep moving and pay less attention to signs, and they have "
      "suggested narrowing the road at those two schools. Residents near one of them oppose this, saying "
      "it would cause queues at peak times.",
      [
          TF("After a year, fewer than a third of vehicles passed the schools above the limit at school-run times.", "T",
             "The share fell to 29%, which is less than a third."),
          TF("Speeds fell by about the same amount at all eight schools.", "F",
             "The fall was not the same everywhere: it was small at the main-road schools and larger elsewhere."),
          TF("The council has decided to narrow the road at the two main-road schools.", "C",
             "Engineers have suggested narrowing and residents near one school oppose it, but the passage does not say what the council decided."),
          TF("Accidents near the eight schools fell after the signs were installed.", "C",
             "The passage reports speeds, not accidents."),
          MC("Reason", "Why do the engineers think the signs worked less well on main roads?",
             ["Drivers there expect to keep moving",
              "The signs there light up too late",
              "Residents there ignore the speed limit",
              "Fewer pupils walk to those schools"],
             "The engineers think drivers on main roads expect to keep moving and pay less attention to signs."),
          MC("Best supported conclusion", "Which conclusion follows best from the passage?",
             ["One measure may not suit every location",
              "Flashing signs have no effect on speed",
              "Road narrowing is popular with residents",
              "Speeding near schools is rising each year"],
             "The signs worked better on small roads than on main roads, and a different measure is proposed for the main-road schools. The share over the limit fell, so the signs did have an effect."),
      ]),
    P(2, "A new court interpretation service",
      "Courts in one region have moved from booking interpreters in person to a shared online booking "
      "system. Under the old arrangement, cases were sometimes adjourned because an interpreter had not "
      "arrived, which meant witnesses and victims had to return on another day. In the first year of the "
      "new system, adjournments for this reason fell from 64 to 22.\n\n"
      "The system lets court staff see which interpreters are available in each language and book them "
      "weeks ahead. Interpreters say it has made their work easier to plan, though some dislike being "
      "paid only for the time a case takes rather than for the whole session they are booked for. Demand "
      "for some languages still outstrips supply, and for these, interpreting by video link is being "
      "tried.",
      [
          TF("Adjournments caused by a missing interpreter fell by more than half in the first year.", "T",
             "They fell from 64 to 22; half of 64 is 32, and 22 is below that."),
          TF("Under the new system, interpreters are paid for the whole session they are booked for.", "F",
             "Some interpreters dislike being paid only for the time a case takes rather than the whole session."),
          TF("The video link trial covers every language used in the region's courts.", "F",
             "Video interpreting is being tried for the languages where demand outstrips supply, not for all of them."),
          TF("Most interpreters prefer the online system to the old arrangement.", "C",
             "Interpreters say it has made planning easier, and some dislike the pay rule, but the passage gives no overall preference figure."),
          MC("Meaning in context", "In the passage, \"outstrips\" means:",
             ["is greater than",
              "is paid less than",
              "is booked earlier than",
              "falls below"],
             "Demand outstrips supply when there is more demand than supply. \"Falls below\" is the opposite."),
          MC("Inference", "Why does the passage mention witnesses and victims?",
             ["To show who adjournments affected",
              "To explain how interpreters are chosen",
              "To show who books the interpreters",
              "To explain why video links are used"],
             "Adjournments meant witnesses and victims had to come back another day, which shows the cost of a missing interpreter."),
      ]),
    P(2, "Volunteering after retirement",
      "A study of 1,200 people aged 65 to 75 compared those who volunteered at least once a week with "
      "those who did not. Over four years, the volunteers reported fewer feelings of loneliness and rated "
      "their own health more highly. The researchers stress that the study shows a link, not proof that "
      "volunteering causes better health: people who are already healthy may simply be more able to "
      "volunteer.\n\n"
      "To test this, they compared volunteers and non-volunteers who had rated their health the same at "
      "the start. The link was weaker but still present. The researchers suggest that local groups could "
      "do more to invite retired people, many of whom said they had never been asked. They found the most "
      "common types of volunteering were in sport clubs, charity shops and parish groups.",
      [
          TF("The volunteers in the study rated their own health more highly than the non-volunteers did.", "T",
             "Over four years, the volunteers rated their own health more highly."),
          TF("The researchers say the study proves that volunteering improves health.", "F",
             "They stress it shows a link, not proof that volunteering causes better health."),
          TF("When starting health was taken into account, the link disappeared.", "F",
             "The link was weaker but still present."),
          TF("Most of the people in the study volunteered at least once a week.", "C",
             "The passage does not say how many of the 1,200 were volunteers."),
          MC("Assumption", "Comparing people who rated their health the same at the start tests whether:",
             ["good health came first",
              "loneliness is more common in men",
              "charity shops need more volunteers",
              "older people rate their health accurately"],
             "The concern was that healthy people volunteer more. Comparing people of equal starting health checks whether the link is only that."),
          MC("Best supported conclusion", "Which suggestion follows from the researchers' findings?",
             ["Groups should invite retired people",
              "Retired people should volunteer every day",
              "Sport clubs should replace parish groups",
              "Doctors should prescribe charity work"],
             "Many retired people said they had never been asked, so the researchers suggest groups invite them. The study does not support daily volunteering or prescriptions."),
      ]),
    P(2, "Lost property at a railway station",
      "A busy railway station logs every item handed in to its lost property office. Last year it "
      "recorded about 9,000 items. Umbrellas and gloves were the most common, but phones, wallets and "
      "keys made up roughly a quarter of the total. About 40% of all items were collected by their owners.\n\n"
      "Staff say that items with a name or a phone number on them are far more likely to be returned. "
      "Phones are usually returned when the owner rings their own number and a member of staff answers. "
      "Items not collected within three months are given to charity or recycled, except for documents "
      "such as passports, which are sent to the authority that issued them. The office has asked the "
      "station's operator for a system that would let people search the log online.",
      [
          TF("Owners collected about 3,600 of the items handed in last year.", "T",
             "40% of about 9,000 is about 3,600."),
          TF("Phones were the most common item handed in.", "F",
             "Umbrellas and gloves were the most common items."),
          TF("An uncollected passport is given to charity after three months.", "F",
             "Documents such as passports are sent to the authority that issued them, not given to charity."),
          TF("The operator has agreed to set up an online search of the log.", "C",
             "The office has asked for an online search; the passage does not say whether the operator agreed."),
          MC("Inference", "What does the passage suggest helps most in getting a lost item back?",
             ["Having a way to identify the owner",
              "Reporting the loss within a week",
              "Losing it at a quiet time of day",
              "Asking the station operator directly"],
             "Items with a name or number are far more likely to be returned, and phones come back when the owner calls them."),
          MC("Meaning in context", "In the passage, \"logs\" means:",
             ["records",
              "stores",
              "returns",
              "searches"],
             "The office logs every item, which means it keeps a record of each one; the planned online search would let people look through that record."),
      ]),
]
