# Sentence interpretation: idioms, figurative expressions and implied meaning.
# Standard British English idioms only. Key first.
H = "Choose the option that best explains the information conveyed in the sentence.\n\n"


def I(t, d, sentence, opts, expl, skill="Idiom"):
    return S(t, d, skill, H + sentence, opts, expl)


ITEMS = [
    # ---------- Test 1 ----------
    I(1, 1, "\"The new principal has promised to put the school's house in order.\"",
      ["He will sort out its problems", "He will repair the school buildings", "He will build new hostels", "He will sell the staff quarters"],
      "To put one's house in order is to sort out one's own affairs and problems. It has nothing to do with real buildings."),
    I(1, 2, "\"Chika's father warned her that the chairman's offer was a mere flash in the pan.\"",
      ["It would not last", "It was very generous", "It was made in anger", "It came too late"],
      "A flash in the pan is a sudden success or promise that soon fades and comes to nothing."),
    I(1, 2, "\"When the results were announced, Bayo was on cloud nine.\"",
      ["He was extremely happy", "He was very confused", "He was deeply worried", "He was quite indifferent"],
      "To be on cloud nine is to be extremely happy. The phrase says nothing about confusion or height."),
    I(1, 2, "\"The councillor's speech fell on deaf ears.\"",
      ["Nobody paid attention to it", "It was too loud to follow", "The audience could not hear well", "Everybody agreed with it"],
      "Words that fall on deaf ears are ignored. The audience heard them but did not heed them.", "Idiom"),
    I(1, 3, "\"Had the driver slowed down, the accident would not have happened.\"",
      ["The driver did not slow down", "The driver slowed down too late", "The accident did not happen", "The driver will slow down next time"],
      "\"Had the driver slowed down\" is a third conditional about the past that did not happen: he did not slow down, and the accident did happen.", "Implied meaning"),
    # ---------- Test 2 ----------
    I(2, 1, "\"Ada has a soft spot for her youngest brother.\"",
      ["She is especially fond of him", "She is often angry with him", "She worries about his health", "She shares a bedroom with him at home"],
      "To have a soft spot for someone is to be especially fond of them."),
    I(2, 2, "\"The manager told the workers to bury the hatchet.\"",
      ["They should end their quarrel", "They should hide their tools", "They should start a new project", "They should stop working early"],
      "To bury the hatchet is to make peace and stop quarrelling. No tool is involved."),
    I(2, 2, "\"Musa's argument does not hold water.\"",
      ["It is not convincing", "It is too long to follow", "It was presented too quickly", "It is accepted by everyone"],
      "An argument that does not hold water is unconvincing because it has weaknesses."),
    I(2, 3, "\"The landlord's warning was a storm in a teacup.\"",
      ["Much fuss about something minor", "A serious threat to the tenants", "A sudden change in the weather", "A secret plan to raise the rent"],
      "A storm in a teacup is a lot of anger or excitement about something unimportant."),
    I(2, 3, "\"Ngozi would rather walk than take a motorcycle.\"",
      ["She prefers walking", "She cannot afford a motorcycle", "She is afraid of walking", "She has no choice but to walk"],
      "\"Would rather\" states a preference. It does not say she cannot afford a ride or has no choice.", "Implied meaning"),
    # ---------- Drill ----------
    I(0, 1, "\"The two companies are now at loggerheads.\"",
      ["They are in serious disagreement", "They have joined together as one company", "They are equally successful", "They are closing down"],
      "To be at loggerheads is to be in strong disagreement."),
    I(0, 2, "\"The headmaster's decision was the last straw for the teachers.\"",
      ["It was the final cause of their anger", "It was the least important decision of all", "It ended their long strike", "It was their last chance to protest"],
      "The last straw is the final small problem that makes a situation unbearable after many others."),
    I(0, 2, "\"Tunde has burnt his boats with his former employers.\"",
      ["He cannot go back to them", "He has damaged their property", "He has paid all his debts", "He has started a rival business"],
      "To burn one's boats is to act in a way that makes return impossible."),
    I(0, 2, "\"The pastor called a spade a spade.\"",
      ["He spoke plainly and directly", "He spoke about tools used in farming", "He spoke too politely", "He exaggerated the problem"],
      "To call a spade a spade is to speak frankly, without softening the truth."),
    I(0, 2, "\"Funmi's success in the examination was a feather in her cap.\"",
      ["It was a proud achievement", "It was a matter of pure luck", "It made her proud and rude", "It was a reward from her school"],
      "A feather in one's cap is an achievement one can be proud of."),
    I(0, 3, "\"The suspect was given the benefit of the doubt.\"",
      ["He was believed despite uncertainty", "He was found guilty at once", "He was released after paying a fine", "He was doubted by everyone"],
      "To give someone the benefit of the doubt is to accept their account because it cannot be proved false."),
    I(0, 2, "\"The project was nipped in the bud.\"",
      ["It was stopped at an early stage", "It grew very slowly", "It was completed well ahead of time", "It was damaged by weather"],
      "To nip something in the bud is to stop it before it can develop."),
    I(0, 3, "\"Amaka is no longer the shy girl she used to be.\"",
      ["She was shy in the past", "She has always been bold", "She is still very shy", "She was never shy"],
      "\"No longer\" and \"used to be\" together mean she was shy before but is not now.", "Implied meaning"),
    I(0, 3, "\"Hardly had the meeting started when the lights went off.\"",
      ["The lights failed just after it began", "The meeting was hard to start", "The lights went off long before it began", "The meeting ended in darkness"],
      "\"Hardly ... when\" means one thing happened immediately after another: the meeting had just started when the lights failed.", "Implied meaning"),
    I(0, 2, "\"The committee's report was swept under the carpet.\"",
      ["It was deliberately ignored", "It was cleaned up and reissued", "It was widely published", "It was carefully studied"],
      "To sweep something under the carpet is to hide or ignore it so that it is not dealt with."),
]
