# Original matched-family questions. Each four-item family keys each choice once.
# Key is written first; build.py positions it. Do not break the balanced option families.
ITEMS = [('"The moon was a silver coin above the village." Which device directly equates the two unlike objects?',
  ['Metaphor', 'Simile', 'Personification', 'Hyperbole'],
  'The moon is identified with a coin without an explicit like or as comparison, making a metaphor.'),
 ('"Her voice trembled like a leaf in rain." Which device makes the comparison explicit?',
  ['Simile', 'Metaphor', 'Personification', 'Hyperbole'],
  'The comparison using like is a simile.'),
 ('"The road yawned and stretched its weary arms." Which device gives the road human actions?',
  ['Personification', 'Metaphor', 'Simile', 'Hyperbole'],
  'Yawning and stretching arms attribute human qualities to the road, personifying it.'),
 ('"I waited a thousand years for that single reply." Which device chiefly intensifies the duration of the '
  'wait?',
  ['Hyperbole', 'Metaphor', 'Simile', 'Personification'],
  'The enormous stated duration is deliberate exaggeration, or hyperbole.'),
 ('"Bold birds battered the broken branch." Which pattern is created by the repeated initial b sound?',
  ['Alliteration', 'Assonance', 'Onomatopoeia', 'Final consonance'],
  'Repeated consonant sounds at word beginnings create alliteration.'),
 ('"Slow boats float home." Which pattern is created by the repeated long o vowel?',
  ['Assonance', 'Alliteration', 'Onomatopoeia', 'Final consonance'],
  'Repeated similar vowel sounds create assonance.'),
 ('A line uses "buzz" to imitate a bee\'s noise rather than merely name the insect. What device links the '
  "word's sound to its meaning?",
  ['Onomatopoeia', 'Alliteration', 'Assonance', 'Final consonance'],
  'A word that imitates the sound it describes uses onomatopoeia.'),
 ('"Blank, think, trunk" share the same ending consonant sound while their vowel sounds differ. Which '
  'pattern is specifically illustrated?',
  ['Final consonance', 'Alliteration', 'Assonance', 'Onomatopoeia'],
  'Repeated final consonant sounds with different preceding vowels create final consonance rather than full '
  'rhyme.'),
 ('A poem remembers a dead friend and reflects on grief and absence. It neither develops a story nor '
  'celebrates a living subject. Which form best fits its central purpose?',
  ['Elegy', 'Ode', 'Ballad', 'Epic'],
  'Mourning and reflection on loss are characteristic of an elegy.'),
 ('A formal lyric addresses a living tree in sustained celebration, praising its endurance without narrating '
  'a sequence of adventures. Which form best fits?',
  ['Ode', 'Elegy', 'Ballad', 'Epic'],
  'The sustained lyric celebration of a subject fits an ode.'),
 ("A songlike poem recounts a traveller's disappearance in short stanzas, returning to a refrain after each "
  'stage of the story. Which form best fits?',
  ['Ballad', 'Elegy', 'Ode', 'Epic'],
  'A narrative in songlike stanzas with a recurring refrain is characteristic of a ballad.'),
 ("A book-length poem recounts a hero's journey through battles and ordeals that determine the fate of a "
  'people. Which form best fits?',
  ['Epic', 'Elegy', 'Ode', 'Ballad'],
  'The extended heroic narrative and collective significance are characteristic of an epic.'),
 ('A poem has fourteen lines, a conventional rhyme scheme and a turn in its argument. Which is its most '
  'specific formal classification?',
  ['Sonnet', 'Free verse', 'Blank verse', 'Lyric'],
  'The fourteen-line structure and conventional argumentative turn identify a sonnet more specifically than '
  'the broader term lyric.'),
 ('The question concerns verse structure: line lengths vary with speech rhythms, and neither a regular metre '
  'nor a rhyme scheme governs the poem. Which term applies?',
  ['Free verse', 'Sonnet', 'Blank verse', 'Lyric'],
  'Free verse is not governed by fixed metre or a regular rhyme scheme.'),
 ('The question concerns verse structure: a poem uses regular iambic pentameter but no end rhyme. Which term '
  'applies?',
  ['Blank verse', 'Sonnet', 'Free verse', 'Lyric'],
  'Regular unrhymed iambic pentameter is blank verse.'),
 ('The question concerns expressive mode rather than metre: a brief poem voices personal longing without '
  'developing a narrative. Which broad term applies?',
  ['Lyric', 'Sonnet', 'Free verse', 'Blank verse'],
  'A lyric foregrounds the expression of personal feeling; the information does not identify a specific '
  'metre or fourteen-line form.'),
 ('"We waited by the river / until the lamps grew pale." Which technique carries the sentence beyond the '
  'first line ending?',
  ['Enjambment', 'Caesura', 'Refrain', 'Anaphora'],
  'Enjambment continues a sentence or phrase across a line break.'),
 ('"The doors were shut. We waited in the rain." Which term describes the strong pause inside this single '
  'verse line?',
  ['Caesura', 'Enjambment', 'Refrain', 'Anaphora'],
  'A pause within a verse line is a caesura.'),
 ('Each stanza ends with the identical line "Still the river runs", repeated as a separate line in the same '
  'position. What is the recurring line?',
  ['Refrain', 'Enjambment', 'Caesura', 'Anaphora'],
  'A recurring line at corresponding places in a poem is a refrain.'),
 ('"We remember the wells. / We remember the trees. / We remember the path." Which term describes the '
  'repeated opening phrase of these successive lines?',
  ['Anaphora', 'Enjambment', 'Caesura', 'Refrain'],
  'Anaphora repeats words at the beginnings of successive lines or clauses.'),
 ('"O absent sister, hear my song!" Which device addresses a person who is not present as though she could '
  'listen?',
  ['Apostrophe', 'Allusion', 'Metonymy', 'Synecdoche'],
  'Apostrophe directly addresses someone absent or something unable to respond.'),
 ('A poem calls a confused gathering "another Babel", relying on the reader\'s knowledge of an earlier '
  'story. Which device makes that external reference?',
  ['Allusion', 'Apostrophe', 'Metonymy', 'Synecdoche'],
  'A reference to a recognised story outside the poem is an allusion.'),
 ('"The crown announced new taxes." Here the crown stands for royal authority by association, rather than as '
  'a bodily part of a person. Which device is used?',
  ['Metonymy', 'Apostrophe', 'Allusion', 'Synecdoche'],
  'Using a closely associated object for the institution is metonymy.'),
 ('"We need more hands in the fields." Here hands stands for the workers, a part representing the whole. '
  'Which device is used?',
  ['Synecdoche', 'Apostrophe', 'Allusion', 'Metonymy'],
  'A part standing for the whole is synecdoche.'),
 ('After a ruler destroys the harvest, a speaker calls him "our generous provider" while clearly condemning '
  'him. Which device uses praise to convey its opposite?',
  ['Verbal irony', 'Paradox', 'Oxymoron', 'Understatement'],
  'The intended condemnation contradicts the literal praise, producing verbal irony.'),
 ('"By surrendering his demand for victory, he finally won his freedom." Which device presents an apparent '
  'contradiction that expresses an intelligible insight?',
  ['Paradox', 'Verbal irony', 'Oxymoron', 'Understatement'],
  'The apparent contradiction between surrender and winning conveys a meaningful paradox.'),
 ('A poet describes a crowd\'s silence as a "deafening quiet". Which device places directly contradictory '
  'terms together in one phrase?',
  ['Oxymoron', 'Verbal irony', 'Paradox', 'Understatement'],
  'The compressed juxtaposition of contradictory words forms an oxymoron.'),
 ('A traveller loses every possession in a flood, then calls it "a slight inconvenience". Which device '
  'deliberately reduces the stated seriousness?',
  ['Understatement', 'Verbal irony', 'Paradox', 'Oxymoron'],
  'The mild description of a severe loss is understatement.'),
 ('Four lines end with "rain", "hill", "pain", "still". What is the rhyme scheme?',
  ['ABAB', 'AABB', 'ABBA', 'ABCB'],
  'Rain rhymes with pain and hill with still, creating alternating ABAB rhyme.'),
 ('Four lines end with "night", "light", "shore", "door". What is the rhyme scheme?',
  ['AABB', 'ABAB', 'ABBA', 'ABCB'],
  'The first pair rhymes together and the second pair rhymes together, creating AABB.')]
