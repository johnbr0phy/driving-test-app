# Original matched-family questions. Each four-item family keys each choice once.
# Key is written first; build.py positions it. Do not break the balanced option families.
ITEMS = [('"I stole the letter because I feared what it would reveal about me." The narrator is the central actor in '
  'the conflict. Which viewpoint is used?',
  ['First-person participant', 'First-person witness', 'Third-person limited', 'Third-person omniscient'],
  'The narrator uses I and directly participates as the central actor.'),
 ('"I watched my sister challenge the council. I could only guess what she felt." The sister is the central '
  'character; the narrator observes her struggle. Which viewpoint is used?',
  ['First-person witness', 'First-person participant', 'Third-person limited', 'Third-person omniscient'],
  "The first-person narrator witnesses another character's central action without access to her thoughts."),
 ('"Amaka hid the letter. She feared the reply, but could not tell what her brother was thinking." The '
  "narrative never leaves Amaka's perspective. Which viewpoint is used?",
  ['Third-person limited', 'First-person participant', 'First-person witness', 'Third-person omniscient'],
  'A third-person narrator has access to Amaka alone, establishing a limited viewpoint.'),
 ("The narrator first reveals the mother's unspoken hopes, then the son's secret doubts, and finally the "
  "neighbour's hidden plan. Which viewpoint gives this access?",
  ['Third-person omniscient', 'First-person participant', 'First-person witness', 'Third-person limited'],
  'Access to the inner lives of several characters indicates an omniscient narrator.'),
 ('A writer uses letters and interviews to recount the life of a scientist who died before the writer was '
  'born. Which form best describes the resulting book?',
  ['Biography', 'Autobiography', 'Memoir', 'Historical fiction'],
  "A researched account of another person's life is a biography."),
 ('A retired teacher writes a chronological account of her own life, from childhood through old age. Which '
  'form best describes the book?',
  ['Autobiography', 'Biography', 'Memoir', 'Historical fiction'],
  "A person's chronological account of their own life is an autobiography."),
 ('A writer reflects on one season caring for a sick parent, exploring that experience rather than '
  'attempting a complete life history. Which form best fits?',
  ['Memoir', 'Biography', 'Autobiography', 'Historical fiction'],
  'A memoir selects and reflects on personal experience, often around a period or theme.'),
 ('A novel places invented traders in a documented nineteenth-century conflict and builds an imagined story '
  'around the historical setting. Which form is used?',
  ['Historical fiction', 'Biography', 'Autobiography', 'Memoir'],
  'Invented narrative set within a historical period is historical fiction.'),
 ('The question concerns complexity rather than change: a character is generous yet jealous, brave in public '
  'yet afraid at home, and the narrative explores these tensions. Which description addresses that '
  'complexity?',
  ['Round character', 'Flat character', 'Dynamic character', 'Static character'],
  'A round character has several developed and sometimes conflicting qualities.'),
 ('The question concerns complexity rather than change: a minor official is portrayed only through one '
  'trait, greed, with little psychological development. Which description fits that limited portrayal?',
  ['Flat character', 'Round character', 'Dynamic character', 'Static character'],
  'A flat character is organised around a narrow set of traits.'),
 ('The question concerns change over time: an apprentice begins contemptuous of advice but gradually learns '
  'to seek it. Which description fits that development?',
  ['Dynamic character', 'Round character', 'Flat character', 'Static character'],
  'The significant change in attitude makes the character dynamic.'),
 ('The question concerns change over time: despite varied experiences, a protagonist retains the same '
  'convictions and habits at the close. Which description fits that continuity?',
  ['Static character', 'Round character', 'Flat character', 'Dynamic character'],
  'A static character remains essentially unchanged through the action; this does not imply a lack of '
  'complexity.'),
 ("A story pauses its present action to narrate a childhood accident that explains a character's fear of "
  'water. What technique is used?',
  ['Flashback', 'Foreshadowing', 'Stream of consciousness', 'Epiphany'],
  'The narrative returns to an earlier event through flashback.'),
 ('An early chapter draws attention to cracks in a dam. Its later collapse fulfils the danger suggested by '
  'that detail. What technique links the warning to the later event?',
  ['Foreshadowing', 'Flashback', 'Stream of consciousness', 'Epiphany'],
  'The earlier detail anticipates the later event, functioning as foreshadowing.'),
 ("A paragraph moves through a character's unfinished thoughts, sensations and sudden associations without "
  'arranging them into an orderly account. Which technique is most evident?',
  ['Stream of consciousness', 'Flashback', 'Foreshadowing', 'Epiphany'],
  'Stream of consciousness represents the flow of mental experience.'),
 ('On seeing her abandoned childhood garden, a character suddenly understands why her pursuit of status has '
  'left her dissatisfied. What is this moment of insight?',
  ['Epiphany', 'Flashback', 'Foreshadowing', 'Stream of consciousness'],
  'The sudden significant understanding is an epiphany.'),
 ('A story is presented entirely through letters exchanged by two relatives. Which organising form is used?',
  ['Epistolary narrative', 'Frame narrative', 'Parallel narrative', 'Linear narrative'],
  'Letters carrying the story constitute an epistolary narrative.'),
 ('Travellers meet at an inn in an opening story. One traveller then tells a second story, and the work '
  'closes by returning to the inn. Which organising form is used?',
  ['Frame narrative', 'Epistolary narrative', 'Parallel narrative', 'Linear narrative'],
  'An enclosing story surrounding another is a frame narrative.'),
 ('Alternate chapters follow two families during the same period, placing their separate experiences side by '
  'side before the plots meet. Which organisation is most evident?',
  ['Parallel narrative', 'Epistolary narrative', 'Frame narrative', 'Linear narrative'],
  'Parallel narrative presents distinct lines of action alongside one another.'),
 ('A story begins with a departure, follows the journey in the order events occur, and ends at the arrival, '
  'without shifts backwards or forwards in time. Which organisation is used?',
  ['Linear narrative', 'Epistolary narrative', 'Frame narrative', 'Parallel narrative'],
  'The uninterrupted chronological progression is linear narrative.'),
 ('An empty chair recurs whenever a family discusses the person who has left. The chair comes to represent '
  'the absence. Which device gives the object this meaning?',
  ['Symbolism', 'Allusion', 'Allegory', 'Verbal irony'],
  'A concrete object representing a broader meaning functions symbolically.'),
 ('A narrator calls a difficult choice "my own crossing of the Rubicon", relying on readers to recognise a '
  'historical reference. Which device is used?',
  ['Allusion', 'Symbolism', 'Allegory', 'Verbal irony'],
  'The phrase refers beyond the story to a known historical event, making an allusion.'),
 ('A story follows characters named Greed, Justice and Mercy through a city whose institutions consistently '
  'represent moral forces. Which device organises the whole narrative?',
  ['Allegory', 'Symbolism', 'Allusion', 'Verbal irony'],
  'The sustained system of characters and events representing abstract meanings creates an allegory.'),
 ('After an official takes a bribe, the narrator comments, "Such admirable honesty." The surrounding account '
  'makes the opposite judgement clear. Which device is used?',
  ['Verbal irony', 'Symbolism', 'Allusion', 'Allegory'],
  'The approving words convey a contrary intended meaning, producing verbal irony.'),
 ('A reader argues that repeated choices in a story explore whether loyalty can survive injustice. Which '
  'aspect is the reader interpreting?',
  ['Theme', 'Setting', 'Plot', 'Characterisation'],
  'The underlying concern or idea explored by the work is its theme.'),
 ('A reader examines how the coastal town and the period just after a war shape the action. Which aspect is '
  'the focus?',
  ['Setting', 'Theme', 'Plot', 'Characterisation'],
  'The place and time of the action together constitute setting.'),
 ('A reader traces how a concealed letter causes a quarrel, which leads to a departure and then a '
  'reconciliation. Which aspect is being analysed?',
  ['Plot', 'Theme', 'Setting', 'Characterisation'],
  'The connected sequence of actions and consequences is the plot.'),
 ("A reader studies how a woman's speech, habits and responses reveal her pride and vulnerability. Which "
  'aspect is the focus?',
  ['Characterisation', 'Theme', 'Setting', 'Plot'],
  "The means by which the narrative presents a person's qualities are characterisation."),
 ('A narrator reports only what she observed, distinguishes guesses from facts, and has her central claims '
  'confirmed by other evidence in the story. How is her account best judged on that evidence?',
  ['Reliable account', 'Unreliable account', 'Omniscient account', 'Impersonal account'],
  'The acknowledged limits and corroboration support reliability; they do not establish omniscience.'),
 ('A narrator claims to have been alone at home, but a later scene and his own dated letter place him '
  'elsewhere. How is his account best judged on this contradiction?',
  ['Unreliable account', 'Reliable account', 'Omniscient account', 'Impersonal account'],
  'The conflicting evidence undermines the reliability of his account.')]
