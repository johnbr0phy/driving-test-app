# Original matched-family questions. Each four-item family keys each choice once.
# Key is written first; build.py positions it. Do not break the balanced option families.
ITEMS = [('The footsteps passed her door and faded. Ada slowly unclenched her hand. For the first time that evening '
  'she let the lamp burn low and rested her head against the wall. Which feeling is most strongly conveyed?',
  ['Quiet relief', 'Growing apprehension', 'Bitter grief', 'Renewed hope'],
  'The danger appears to pass, and her body relaxes. Those details support quiet relief.'),
 ('Each time the gate creaked, Femi stood up. The messenger was already an hour late. He moved the untouched '
  'meal aside and listened again, counting the pauses between approaching footsteps. Which feeling is most '
  'strongly conveyed?',
  ['Growing apprehension', 'Quiet relief', 'Bitter grief', 'Renewed hope'],
  'Repeated vigilance, delay and the untouched meal indicate increasing apprehension rather than relief.'),
 ('She laid his unused shoes beside the grave. "All those promises," she said, pressing the words between '
  'her teeth. The mourners had left, but she remained, angry that the world could continue without him. '
  'Which feeling is most strongly conveyed?',
  ['Bitter grief', 'Quiet relief', 'Growing apprehension', 'Renewed hope'],
  'The loss is accompanied by anger and resentment, making bitter grief the strongest description.'),
 ('The flood had taken the seedlings. Weeks later, a green shoot appeared beside the ruined fence. Musa '
  'knelt to protect it with two stones, then went to find the seed tin he had put away. Which feeling is '
  'most strongly conveyed?',
  ['Renewed hope', 'Quiet relief', 'Growing apprehension', 'Bitter grief'],
  'His return to planting after recognising new growth shows renewed hope.'),
 ('After winning the race, Amina saw the unfamiliar runner who had fallen. She returned to help, although '
  'the medal ceremony was about to start. Which value most directly motivates the action shown?',
  ['Compassion', 'Ambition', 'Loyalty', 'Honesty'],
  'Helping an injured stranger at a personal inconvenience demonstrates compassion.'),
 ('The apprentice was offered comfortable work in the village. She chose the harder training in the city '
  'because she wanted to become the finest craftswoman in her field. Which motive is foregrounded?',
  ['Ambition', 'Compassion', 'Loyalty', 'Honesty'],
  'Her choice is driven by the aspiration to excel, showing ambition.'),
 ('A trader could earn more by supplying a rival shop. He stayed with the partner who had supported him '
  'through years of difficulty, explaining that he would not abandon their bond for a better price. Which '
  'value is foregrounded?',
  ['Loyalty', 'Compassion', 'Ambition', 'Honesty'],
  'Maintaining an established bond despite a financial incentive to leave demonstrates loyalty.'),
 ('No one had noticed the extra change. Tola counted it again, returned the excess and explained the '
  'mistake, although the money would have helped her. Which value is directly demonstrated?',
  ['Honesty', 'Compassion', 'Ambition', 'Loyalty'],
  'Returning money that was not hers despite an opportunity to keep it demonstrates honesty.'),
 ('Long after selling the house, the narrator keeps its key. "It opens no door now," she says, "but whenever '
  'I hold it I hear the courtyard voices." What does the key chiefly represent?',
  ['Attachment to memory', 'Potential for renewal', 'A choice between futures', 'Continuity of routine'],
  'The key evokes the lost home and its voices, representing attachment to memory.'),
 ('In a yard left bare by fire, a child places one seed in the ash. The story ends before anything grows, '
  'with the child carefully bringing water. What does the seed chiefly represent?',
  ['Potential for renewal', 'Attachment to memory', 'A choice between futures', 'Continuity of routine'],
  'The seed is a possibility that must be nurtured, representing potential for renewal rather than an '
  'accomplished recovery.'),
 ('At the station, a woman holds two tickets, one to her old village and one to a distant city. The narrator '
  'leaves her standing between the platforms. What do the tickets chiefly represent?',
  ['A choice between futures', 'Attachment to memory', 'Potential for renewal', 'Continuity of routine'],
  'The two destinations embody competing possible futures and an unresolved choice.'),
 ('A family installs a new kitchen clock. Its chimes signal breakfast, homework and the evening meal. '
  'Through busy weeks and quiet ones, those daily activities keep their familiar sequence. What does the '
  'clock chiefly represent in this account?',
  ['Continuity of routine', 'Attachment to memory', 'Potential for renewal', 'A choice between futures'],
  'The clock organises repeated daily activities, representing continuity of routine. It is new and is not '
  'linked to recollections of a lost person or place.'),
 ('"Her hands were tired, yet every repair was exact. I watched her patiently straighten what others had '
  'abandoned, and wished I possessed half her care." What attitude does the narrator express towards the '
  'worker?',
  ['Admiration', 'Criticism', 'Amusement', 'Sympathy'],
  'The praise of her precision and the desire to emulate her express admiration.'),
 ('"He praised fairness from the platform, then dismissed the workers without listening. His fine words cost '
  'him nothing; the silence he demanded cost them their wages." What attitude does the narrator express '
  'towards the speaker?',
  ['Criticism', 'Admiration', 'Amusement', 'Sympathy'],
  'The contrast between proclaimed fairness and harmful conduct expresses criticism.'),
 ('"Grandfather searched solemnly for his spectacles while they rested on his head. When he asked whether a '
  'thief had come, I had to hide my smile behind a cup." What attitude does the narrator express in this '
  'moment?',
  ['Amusement', 'Admiration', 'Criticism', 'Sympathy'],
  'The concealed smile at the harmless mistake shows amusement.'),
 ('"She read the letter twice, as though another reading might soften it. I wanted to offer a word, but '
  'could only move my chair nearer hers." What attitude does the narrator express towards her?',
  ['Sympathy', 'Admiration', 'Criticism', 'Amusement'],
  'The wish to comfort and the quiet approach show sympathy with her distress.'),
 ('The council wants to replace the annual harvest ritual with a new communal festival. The elder insists '
  'that the old form must remain because it joins the village to its ancestors. What conflict is '
  'foregrounded?',
  ['Tradition versus change',
   'Belonging versus independence',
   'Loyalty versus justice',
   'Pride versus accepting help'],
  'The disagreement concerns preserving an inherited practice against adopting a new one.'),
 ('A young woman loves the family workshop but wants to establish her own studio. Her distress comes from '
  'wanting both a place among her relatives and a life she directs herself. What conflict is foregrounded?',
  ['Belonging versus independence',
   'Tradition versus change',
   'Loyalty versus justice',
   'Pride versus accepting help'],
  'The tension is between continued belonging and self-directed independence.'),
 ('A clerk discovers evidence that his closest friend stole public funds. Protecting the friendship would '
  'mean concealing harm to the community. What conflict is foregrounded?',
  ['Loyalty versus justice',
   'Tradition versus change',
   'Belonging versus independence',
   'Pride versus accepting help'],
  'Personal loyalty conflicts with the duty to expose wrongdoing and uphold justice.'),
 ("An experienced builder cannot lift a beam alone. He rejects an apprentice's offer because admitting the "
  'need feels humiliating, although the work remains unfinished. What conflict is foregrounded?',
  ['Pride versus accepting help',
   'Tradition versus change',
   'Belonging versus independence',
   'Loyalty versus justice'],
  'His self-image prevents him accepting useful assistance, setting pride against receiving help.'),
 ('"His offer was a door painted on a wall: bright hinges, a golden handle, and no way through." What does '
  'the image imply about the offer?',
  ['An empty promise', 'An imposed restriction', 'A burdensome obligation', 'A welcoming invitation'],
  'The door only appears usable, suggesting a promise that provides no real access.'),
 ('"The new rule was a locked gate across the path we had always walked." What does the image imply about '
  'the rule?',
  ['An imposed restriction', 'An empty promise', 'A burdensome obligation', 'A welcoming invitation'],
  'The locked gate blocks a previously available path, suggesting an imposed restriction.'),
 ('"The duty settled on her shoulders like a wet cloak she could not put down." What does the image imply '
  'about the duty?',
  ['A burdensome obligation', 'An empty promise', 'An imposed restriction', 'A welcoming invitation'],
  'The weight, discomfort and inability to remove it suggest a burdensome obligation.'),
 ('"Their letter was an open doorway, with a lamp kept burning for my arrival." What does the image imply '
  'about the letter?',
  ['A welcoming invitation', 'An empty promise', 'An imposed restriction', 'A burdensome obligation'],
  'The open door and waiting light convey welcome, suggesting an invitation.'),
 ('After the argument, Nneka stopped joining the evening conversations. She answered kindly when addressed, '
  'but spent longer in the far garden and no longer offered stories of her day. What change in her behaviour '
  'is emphasised?',
  ['Withdrawal', 'Solidarity', 'Resentment', 'Reconciliation'],
  'Her reduced participation and increasing distance show withdrawal without explicit hostility.'),
 ('When the bridge collapsed, households that had rarely spoken began sharing boats and carrying one '
  "another's supplies. By the time repairs began, neighbours knew each other's needs. What development is "
  'emphasised?',
  ['Solidarity', 'Withdrawal', 'Resentment', 'Reconciliation'],
  'Cooperation in a shared difficulty builds solidarity among previously distant neighbours.'),
 ('The worker congratulated the promoted apprentice, then spent each evening recalling favours that had gone '
  'unrecognised. Every new success seemed to him another insult. What development is emphasised?',
  ['Resentment', 'Withdrawal', 'Solidarity', 'Reconciliation'],
  'The continuing sense of unfairness and interpretation of success as insult show growing resentment.'),
 ('The sisters had refused to speak for months. At their next meeting, one acknowledged the hurt she had '
  'caused; the other made room beside her and began to answer. What development is emphasised?',
  ['Reconciliation', 'Withdrawal', 'Solidarity', 'Resentment'],
  'Acknowledgement followed by renewed communication signals reconciliation.'),
 ('"The whistle blew. Doors slammed. Feet struck the steps. Before I could call, the train was moving and I '
  'was running." What effect does the succession of brief actions chiefly create?',
  ['Accelerating urgency', 'Suspended tension', 'Reflective calm', 'Monotonous repetition'],
  "The rapid successive actions and the narrator's pursuit create accelerating urgency."),
 ('"The challenger raised his hand. The guards stopped. Nobody spoke. For a moment even the crowd seemed to '
  'hold its breath; the answer had still not come." What effect is chiefly created?',
  ['Suspended tension', 'Accelerating urgency', 'Reflective calm', 'Monotonous repetition'],
  'The halted action and withheld answer suspend the confrontation in tension.')]
