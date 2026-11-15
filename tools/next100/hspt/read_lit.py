"""HSPT Reading: comprehension of literary text. Original passages and items."""

STIMULI = {
    "T1-L": ("The Last Rehearsal", """Priya stood in the wings, gripping the edge of the curtain so hard her knuckles turned pale. Out on the stage, the rest of the cast was running through the final scene for the last time before opening night. In ten minutes it would be her turn to walk out alone and sing.

"You've practiced this a hundred times," Mr. Alvarez whispered beside her. "Your voice knows the way even if your knees don't."

Priya tried to smile. Her mouth felt full of sand. She thought of the empty auditorium, its rows of red seats like rows of waiting faces, and her stomach did a slow flip.

Then the music started. For a heartbeat she could not move. But the first notes were the same notes she had hummed while washing dishes, while walking the dog, while lying awake at night, and her feet carried her forward before her worries could catch up. By the second verse, the seats were only seats again."""),
    "T2-L": ("Grandfather's Watch", """The watch had not ticked in thirty years. It lay in a velvet box in the top drawer of my grandfather's desk, its glass cloudy, its hands frozen at twenty past four.

"Why don't you get it fixed?" I asked him once.

He turned the watch over in his rough palm as if it weighed a great deal more than it did. "It stopped the afternoon your grandmother and I opened the bakery," he said. "We were too busy to wind it that day, and the next, and the next. By the time we remembered, we had a business, a mortgage and a baby on the way." He laughed softly. "I suppose I like it the way it is. It reminds me of the day everything started."

He closed the lid, and I understood that some broken things are not waiting to be repaired."""),
    "D-L": ("First Snow", """Mateo had lived his whole life in a town where winter meant a light jacket and the occasional cold drizzle. So when his family moved north in December, he spent the first week glaring at the gray sky as if it owed him something.

On Saturday he woke to a silence so complete that he thought his ears had stopped working. The street outside his window had vanished under a thick white blanket. Every car was a soft lump, every fence post wore a tall white hat.

He was outside before his mother could finish saying "boots." The snow squeaked under his sneakers and soaked his socks in seconds, but he did not care. He scooped up a handful and watched it sparkle, then melt into cold water in his palm. Down the street, a girl his age was rolling an enormous snowball. She looked up and waved. Mateo waved back, and for the first time since the move, the new town did not feel quite so far from home."""),
}

ITEMS = [
    # ---------- T1-L ----------
    dict(test=1, stim="T1-L", skill="Character feelings", diff=1,
         stem="How does Priya feel at the start of the passage?",
         key="Nervous about singing alone", wrong=["Angry at Mr. Alvarez", "Bored with the long rehearsal", "Proud of the other actors"],
         expl="She grips the curtain until her knuckles turn pale and her stomach flips. These details show nerves, not anger or boredom."),
    dict(test=1, stim="T1-L", skill="Figurative language", diff=2,
         stem="What does Mr. Alvarez mean when he says, \"Your voice knows the way even if your knees don't\"?",
         key="Her practice will see her through", wrong=["She should sit down before singing", "Her singing still needs more work", "She will forget the words tonight"],
         expl="He reminds her she has practiced a hundred times, so her singing will come even though she feels shaky. Her knees stand for her nerves."),
    dict(test=1, stim="T1-L", skill="Theme", diff=3,
         stem="The last sentence, \"the seats were only seats again,\" shows that Priya:",
         key="has stopped being afraid", wrong=["has noticed the empty seats", "wishes more people had come", "has forgotten her next lines"],
         expl="Earlier the seats looked like waiting faces because she was scared. Once she is singing, they are just seats, so her fear is gone."),

    # ---------- T2-L ----------
    dict(test=2, stim="T2-L", skill="Details", diff=1,
         stem="According to the passage, why did the watch first stop?",
         key="No one wound it on a busy day", wrong=["It fell on the bakery floor", "A child dropped it in the desk", "Its glass cracked in the drawer"],
         expl="Grandfather says they were too busy opening the bakery to wind it, that day and the days after. Nothing in the passage says it was dropped."),
    dict(test=2, stim="T2-L", skill="Character", diff=2,
         stem="Why does the grandfather keep the watch unrepaired?",
         key="It recalls the day it all began", wrong=["It would cost too much to fix", "He has forgotten how to wind it", "He plans to sell it to a collector"],
         expl="He says he likes it that way because it reminds him of the day everything started. He never mentions money or selling it."),
    dict(test=2, stim="T2-L", skill="Theme", diff=3,
         stem="Which sentence best states the theme of the passage?",
         key="An object can hold precious memories", wrong=["Old things should always be repaired", "Running a business takes hard work", "Watches were better in the past"],
         expl="The narrator learns that some broken things are not waiting to be repaired because they hold memories. Hard work is part of the story but not its lesson."),

    # ---------- D-L ----------
    dict(test=0, stim="D-L", skill="Character feelings", diff=1,
         stem="How does Mateo feel about his new town during the first week?",
         key="Gloomy and homesick", wrong=["Excited and curious", "Calm and patient", "Proud and confident"],
         expl="He spends the week glaring at the gray sky, and at the end the town finally feels less far from home. That shows he felt unhappy before."),
    dict(test=0, stim="D-L", skill="Figurative language", diff=2,
         stem="The phrase \"every fence post wore a tall white hat\" is an example of:",
         key="personification", wrong=["alliteration", "exaggeration", "rhyme"],
         expl="Fence posts cannot really wear hats; giving an object a human action is personification. The phrase describes the snow piled on top of each post."),
    dict(test=0, stim="D-L", skill="Inference", diff=3,
         stem="What does the wave between Mateo and the girl most likely suggest?",
         key="He may make a friend there", wrong=["He knew her from his old town", "She wants him to go inside", "She is asking for his help"],
         expl="Right after the wave, the town starts to feel less far from home, which hints at a new friendship. Nothing suggests they had met before."),
]
