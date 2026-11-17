# Original matched-family questions. Each four-item family keys each choice once.
# Key is written first; build.py positions it. Do not break the balanced option families.
ITEMS = [('A ruler rejects several chances to reconcile with his daughter. His suspicion causes her death and his '
  'ruin. The ending offers no recovery. Which form best describes this central action?',
  ['Tragedy', 'Romantic comedy', 'Farce', 'Tragicomedy'],
  'The serious conflict ends in irreversible destruction, characteristic of tragedy.'),
 ('Two lovers are kept apart by mistaken assumptions about their families. The errors are exposed, the '
  'families reconcile, and the lovers marry. Which form best fits this plot?',
  ['Romantic comedy', 'Tragedy', 'Farce', 'Tragicomedy'],
  'The love plot resolves obstacles through reconciliation and marriage, fitting romantic comedy.'),
 ('Three visitors hide behind doors while a confused host repeatedly welcomes the wrong person. Rapid '
  'entrances, improbable coincidences and physical mishaps dominate. Which form is most evident?',
  ['Farce', 'Tragedy', 'Romantic comedy', 'Tragicomedy'],
  'The exaggerated physical complications and improbable coincidences are characteristic of farce.'),
 ('A play combines a comic journey with a threatened execution. The execution is prevented, but the reunited '
  'family discovers an irreversible loss. Neither complete catastrophe nor an uncomplicated happy ending '
  'closes the action. Which form fits best?',
  ['Tragicomedy', 'Tragedy', 'Romantic comedy', 'Farce'],
  'The combination of serious danger, comic action and an unsettled mixed ending supports tragicomedy.'),
 ('Alone on stage after her guests leave, a woman speaks aloud about a decision she has concealed from them. '
  'What technique exposes her private reasoning?',
  ['Soliloquy', 'Aside', 'Dialogue', 'Choral speech'],
  'The solitary character voices her thoughts aloud in a soliloquy.'),
 ('While bargaining with a customer, a trader briefly turns to the audience and reveals a trick. The '
  'customer is conventionally unable to hear that remark. What technique is used?',
  ['Aside', 'Soliloquy', 'Dialogue', 'Choral speech'],
  'The short remark heard by the audience but not the other character is an aside.'),
 ('Two brothers question and answer each other about a missing deed. Their successive replies reveal their '
  'disagreement. Which mode carries this exchange?',
  ['Dialogue', 'Soliloquy', 'Aside', 'Choral speech'],
  'The alternating exchange between characters is dialogue.'),
 ("A group of villagers speaks together in a single collective voice, commenting on the ruler's decision. "
  'Which mode is used?',
  ['Choral speech', 'Soliloquy', 'Aside', 'Dialogue'],
  'A group delivering a collective commentary uses choral speech.'),
 ('Before the central dispute starts, a conversation establishes that the family has lost its farm and owes '
  'the merchant money. What plot function does this background serve?',
  ['Exposition', 'Complication', 'Climax', 'Denouement'],
  'The information establishes the circumstances necessary to understand the action, functioning as '
  'exposition.'),
 ('The siblings have agreed to share an inheritance when a previously unknown claimant arrives. The arrival '
  'introduces an obstacle without settling the dispute. What plot function does it serve?',
  ['Complication', 'Exposition', 'Climax', 'Denouement'],
  'The new obstacle complicates the existing conflict rather than resolving it.'),
 ('After mounting pressure, the accused chooses to reveal the evidence in court. This decisive confrontation '
  'determines the outcome; the remaining scenes show its consequences. What plot stage is reached?',
  ['Climax', 'Exposition', 'Complication', 'Denouement'],
  'The decisive confrontation at the height of the central conflict is the climax.'),
 ('The judgment has settled the central dispute. A final short scene shows the family making arrangements '
  'under the new circumstances. What plot function does that scene serve?',
  ['Denouement', 'Exposition', 'Complication', 'Climax'],
  'The settling of consequences after the main conflict is the denouement.'),
 ('The present scene ends with a character recognising a scar. The next scene stages the accident ten years '
  'earlier that caused it. Which technique changes the narrative time?',
  ['Flashback', 'Foreshadowing', 'Dramatic irony', 'Situational irony'],
  'The action returns to an earlier event, using flashback.'),
 ('Early in a play, a servant remarks that a balcony railing is loose. Much later it breaks during an '
  'escape. What function does the early remark serve?',
  ['Foreshadowing', 'Flashback', 'Dramatic irony', 'Situational irony'],
  'The warning prepares for the later accident and therefore foreshadows it.'),
 ('The audience sees a forged letter being prepared. The recipient later trusts it, unaware of what the '
  'audience knows. Which device depends on this unequal knowledge?',
  ['Dramatic irony', 'Flashback', 'Foreshadowing', 'Situational irony'],
  'Dramatic irony arises from the audience knowing something that a character does not.'),
 ('A town builds a watchtower to prevent theft. When its bell is stolen from the tower itself, both the '
  'watchman and audience discover the loss together. Which kind of irony best describes the outcome?',
  ['Situational irony', 'Flashback', 'Foreshadowing', 'Dramatic irony'],
  'The outcome reverses the purpose and expectation of the tower, creating situational irony without '
  'privileged audience knowledge.'),
 ("A play follows a nurse's effort to save a clinic. Her decisions organise the main action and determine "
  'its outcome. Which role does she occupy?',
  ['Protagonist', 'Antagonist', 'Foil', 'Confidant'],
  'The principal character whose struggle organises the action is the protagonist.'),
 ("A play centres on a worker's effort to expose fraud. A manager actively destroys evidence and tries to "
  'stop that effort. Which role does the manager fulfil?',
  ['Antagonist', 'Protagonist', 'Foil', 'Confidant'],
  "The character opposing the protagonist's central aim serves as antagonist."),
 ('The hero acts impulsively. His cautious friend does not obstruct him, but their contrasting reactions '
  "repeatedly make the hero's rashness clearer. Which function best describes the friend?",
  ['Foil', 'Protagonist', 'Antagonist', 'Confidant'],
  "The contrast highlights the hero's qualities, making the friend a foil rather than an active antagonist."),
 ('A character privately tells her plans and fears to a trusted friend who listens and asks questions. '
  'Through this relationship the audience learns what she conceals elsewhere. Which role does the friend '
  'chiefly serve?',
  ['Confidant', 'Protagonist', 'Antagonist', 'Foil'],
  'The trusted recipient of private thoughts acts as a confidant.'),
 ('Between two tense scenes in a serious trial, a porter amusingly misunderstands a simple instruction. The '
  'brief episode releases tension before the trial resumes. What is its main function?',
  ['Comic relief', 'Suspense', 'Pathos', 'Social satire'],
  'The humorous interruption in serious action provides comic relief.'),
 ('A character reaches for a sealed verdict while the scene repeatedly delays its opening. The audience '
  'still does not know whether she will be freed. What effect do the delays mainly create?',
  ['Suspense', 'Comic relief', 'Pathos', 'Social satire'],
  'Delaying an uncertain and important outcome builds suspense.'),
 ('After losing his home, an elderly character carefully sets a place at an imaginary table for his absent '
  'child. The scene chiefly invites tender sorrow for him. Which effect is foregrounded?',
  ['Pathos', 'Comic relief', 'Suspense', 'Social satire'],
  'The scene appeals to sympathetic sadness, or pathos.'),
 ('A committee praises its own honesty while openly auctioning public appointments. Exaggerated speeches '
  'ridicule the institution. What mode of criticism is used?',
  ['Social satire', 'Comic relief', 'Suspense', 'Pathos'],
  'Ridicule exposes institutional corruption, making the scene social satire.'),
 ('A character alone weighs whether to confess a lie or preserve a valued friendship. No one else yet knows '
  'the lie. Which conflict is directly shown?',
  ['Internal conflict', 'Interpersonal conflict', 'Social conflict', 'Conflict with nature'],
  'The competing motives within one character create internal conflict.'),
 ('Two neighbours confront each other over a personal promise. Neither represents an institution or wider '
  'cause, and each demands an incompatible outcome. Which conflict is directly shown?',
  ['Interpersonal conflict', 'Internal conflict', 'Social conflict', 'Conflict with nature'],
  'The immediate struggle between the two individuals is interpersonal conflict.'),
 ('A worker challenges a law excluding her entire community from public office. Her struggle is directed at '
  'the rule and its institutions. Which conflict is foregrounded?',
  ['Social conflict', 'Internal conflict', 'Interpersonal conflict', 'Conflict with nature'],
  'The individual opposes a wider social structure, producing social conflict.'),
 ('A fishing crew struggles to reach land while a storm drives its boat towards rocks. No rival person '
  'causes the danger. Which conflict drives the scene?',
  ['Conflict with nature', 'Internal conflict', 'Interpersonal conflict', 'Social conflict'],
  'The human struggle against the storm is conflict with nature.'),
 ('In the printed script, "[He places the letter beneath the lamp]" tells the performer what to do without '
  'being spoken. What is this instruction?',
  ['Stage direction', 'Scenery', 'Costume', 'Sound effect'],
  'The bracketed performance instruction is a stage direction.'),
 ('Painted walls, a doorway and a raised platform represent a palace courtyard in a production. Which design '
  'element establishes the place?',
  ['Scenery', 'Stage direction', 'Costume', 'Sound effect'],
  'The physical representation of the setting is scenery.')]
