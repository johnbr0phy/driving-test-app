# Drill-only revising and editing drafts (test 0). Every draft is original, written for Tigertest;
# the student writers are invented.

STIMULI = [
    {"id": "STAARE1-D-W1", "title": "A student's draft: Wings Over Sweetwater", "text": (
        "(1) During World War II, the United States needed pilots to fly military planes from factories to air bases. "
        "(2) Many male pilots were fighting overseas. (3) The answer came from an unexpected group of people.\n\n"
        "(4) In 1943, the Army began training women pilots at Avenger Field in Sweetwater, Texas. (5) These women became known as "
        "the Women Airforce Service Pilots, or WASP. (6) More than a thousand women earned their wings. (7) They flew planes across "
        "the country, tested repaired aircraft, and towed targets so that gunners on the ground could practice. (8) Sweetwater is "
        "a small town in West Texas.\n\n"
        "(9) The WASP were not treated as members of the military. (10) When the program ended in 1944, the women had to pay their "
        "own way home. (11) It took until 1977 for Congress to recognize them as veterans.\n\n"
        "(12) Today, a museum at Avenger Field tells their story. (13) The WASP did something.")},
    {"id": "STAARE1-D-W2", "title": "A student's draft: Our Town Needs a Skate Park", "text": (
        "(1) Every afternoon, skateboarders in our town practice in the parking lot behind the grocery store. (2) The store manager "
        "has asked them to leave many times, and police officers have been called twice this year. (3) Skateboarders need a better "
        "place to go.\n\n"
        "(4) A public skate park would give young people a safe place to be active. (5) Skating in a parking lot means dodging cars "
        "and shoppers. (6) In a park, skaters could practice on smooth ramps designed for the sport. (7) Skateboarding became an "
        "Olympic sport in 2021.\n\n"
        "(8) A skate park would also help local businesses. (9) The grocery store would no longer have skaters messing around in its lot. "
        "(10) Families who visit the park might stop at nearby restaurants.\n\n"
        "(11) Some residents worry about the cost. (12) The city could apply for grants that help towns build parks, and local "
        "businesses could sponsor ramps. (13) A skate park is a good idea.")},
    {"id": "STAARE1-D-W3", "title": "A student's draft: The Storm", "text": (
        "(1) The power went out at 9:40, just as the wind began to howl. (2) Marisol and her little brother Teo sat on the living "
        "room floor with a flashlight between them. (3) Rain hit the windows. (4) It was loud. (5) Their parents were still at work "
        "across town.\n\n"
        "(6) Teo started to cry. (7) Marisol didn't know what to do at first. (8) Then she remembered how their grandmother used to "
        "tell stories during storms. (9) She pointed the flashlight at the ceiling and made a shadow bird with her hands. (10) Teo "
        "stopped crying and watched.\n\n"
        "(11) Marisol told him a story about a bird who flew through a storm to find its nest. (12) Teo fell asleep with his head "
        "on her shoulder. (13) The storm ended. (14) Marisol felt proud.\n\n"
        "(15) When their parents finally came home, they found both children asleep on the floor.")},
    {"id": "STAARE1-D-W4", "title": "A student's draft: Learning to Sign", "text": (
        "(1) When my cousin Lily was born deaf, my whole family decided to learn american sign language. (2) I was twelve, and I "
        "thought it would be easy. (3) I was wrong.\n\n"
        "(4) Our teacher, a woman named Mrs. Okafor came to my aunt's house every Tuesday evening. (5) She showed us that signing is "
        "not just spelling words with your fingers. (6) Facial expressions and the direction of your hands changes the meaning of a "
        "sign. (7) My brother and me practiced every night at the dinner table.\n\n"
        "(8) The hardest part was learning to watch instead of listen. (9) In a spoken conversation, I could look away and still "
        "follow along. (10) In ASL, looking away means missing the whole sentence.\n\n"
        "(11) Lily is four now, and she signs faster than any of us. (12) Last month she corrected my sign for butterfly, she "
        "laughed when I got it wrong. (13) I didn't mind. (14) She is the best teacher I have ever had, and I am still learning "
        "the alphabet of a languege that has changed my family.")},
    {"id": "STAARE1-D-W5", "title": "A student's draft: a letter to the editor", "text": (
        "To the Editor:\n\n"
        "(1) I am writing about the decision to close the Westside Library branch on Saturdays. (2) The library board say the "
        "change will save money. (3) However, the change will hurt the students and working families who depends on the library the "
        "most.\n\n"
        "(4) Many students in our neighborhood do not have internet at home. (5) On weekdays they are in school until four "
        "o'clock, and the library closes at six. (6) Saturday is the only full day the computers can be used by them. (7) Last year, "
        "student's used the Saturday computer lab more than any other group.\n\n"
        "(8) Working parents feel the loss too. (9) Many of them can only bring there children to story time on weekends. "
        "(10) Without saturday hours, those families will have nowhere to go.\n\n"
        "(11) I urge the board to find savings elsewhere. (12) For example the library could close an hour earlier on Mondays, "
        "when fewer people visit. (13) The Westside Library has served this neighborhood for fifty years it should keep serving "
        "everyone.\n\n"
        "Sincerely,\n\n"
        "Rosa Delgado")},
    {"id": "STAARE1-D-W6", "title": "A student's draft: The Story of the Bluebonnet", "text": (
        "(1) Every spring, roadsides across Texas turn blue with bluebonnets. (2) The flower was named the state flower of Texas in "
        "1901. (3) Bluebonnets are a kind of lupine a plant in the pea family.\n\n"
        "(4) Bluebonnets grow from seeds that fall to the ground in late spring. (5) The seeds have hard outer shells. (6) Some seeds "
        "sprout the next year, but others wait several years before they grows. (7) This helps the plant servive droughts.\n\n"
        "(8) Many Texans have a tradition. (9) Each spring, families travel to the hill country to take photographs in fields of "
        "bluebonnets. (10) Visitors are asked to be careful not to trample the plants, because a crushed plant cannot make seeds.\n\n"
        "(11) Bluebonnets need three things to thrive, sunlight, well-drained soil, and very little fertilizer. (12) Because they "
        "need so little care. (13) They are a favorite of gardeners who want to plant native flowers.")},
]

ITEMS = [
    # ---------- D-W1: revising, WASP (8) ----------
    Q(0, 2, ORG, ORGANIZE,
      "The writer wants to replace sentence 3 with a sentence that better introduces the topic. Which sentence is best?",
      ["The answer was women pilots trained in a small Texas town.", "The answer came from people who were unexpected by many.",
       "Planes were very important to winning the war.", "Some people at that time did not know how to fly any kind of plane."],
      "The essay is about the women pilots trained in Sweetwater, so naming them introduces the topic. The original sentence is vague.",
      "STAARE1-D-W1"),
    Q(0, 1, ORG, DEVELOP,
      "Which sentence should be deleted because it does not support the main idea of the second paragraph (sentences 4 through 8)?",
      ["Sentence 8", "Sentence 5", "Sentence 6", "Sentence 7"],
      "The second paragraph describes who the WASP were and what they did. Sentence 8, a fact about the size of Sweetwater, does not support that idea.",
      "STAARE1-D-W1"),
    C(0, 2, ORG, ORGANIZE,
      "Choose the best transition to begin sentence 9.\n\n(9) [[1]] the WASP were not treated as members of the military.",
      ["Despite this,", "For one example,", "As a result,", "In addition,"],
      "Sentence 9 contrasts the women's service in the previous paragraph with how they were treated, so a contrast such as \"Despite their service\" fits. \"As a result\" would suggest their service caused the poor treatment.",
      "STAARE1-D-W1"),
    C(0, 2, ORG, DEVELOP,
      "The writer wants to replace sentence 13 with a stronger conclusion. Choose the best revision.\n\n(13) [[1]]",
      ["They opened the sky to later women pilots.", "The WASP did something.",
       "That is the end of the whole story of the brave WASP pilots.", "There were a lot of them and they flew many planes."],
      "A strong conclusion states the lasting importance of the subject. The other choices are vague or simply say the essay is over.",
      "STAARE1-D-W1"),
    Q(0, 2, CLR, COMBINE,
      "What is the most effective way to combine sentences 1 and 2?",
      ["During World War II, the United States needed pilots to fly planes from factories to bases because many male pilots were overseas.",
       "During World War II, the United States needed pilots to fly military planes from factories to bases, many male pilots were overseas.",
       "During World War II, many male pilots, the United States needed pilots to fly military planes from factories to air bases, were overseas.",
       "During World War II, the United States needed pilots to fly military planes, and also many male pilots were fighting overseas."],
      "\"Because\" shows that the shortage of male pilots is the reason for the need. A comma alone creates a comma splice, and \"and also\" hides the cause.",
      "STAARE1-D-W1"),
    C(0, 2, CLR, CLARITY,
      "Choose the most precise verb for sentence 7.\n\n(7) They [[1]] planes across the country, tested repaired aircraft, and towed targets so that gunners on the ground could practice.",
      ["ferried", "did", "had", "got going"],
      "\"Ferried\" means carried from one place to another, which describes flying planes to bases exactly. \"Did\" and \"got\" are vague.",
      "STAARE1-D-W1"),
    Q(0, 3, CLR, COMBINE,
      "What is the best way to revise sentence 10 to make the relationship between ideas clearer?",
      ["When the program ended in 1944, the women, unlike soldiers, paid their own way home.",
       "The program ended in 1944, the women had to pay their own way home.",
       "When the program ended in 1944, their own way home, the women had to pay.",
       "The program ended in 1944, and the women, they had to pay for their own long way home."],
      "Adding \"unlike soldiers\" shows how the women were treated differently, which is the point of the paragraph. The other revisions create a comma splice or a confusing order.",
      "STAARE1-D-W1"),
    C(0, 1, CLR, CLARITY,
      "The writer wants to revise sentence 11 to stress how long the women waited. Choose the best word for the blank.\n\n(11) Congress [[1]] recognized them as veterans in 1977.",
      ["finally", "then", "sometimes", "really"],
      "\"Finally\" stresses how long the women waited for recognition. \"Sometimes\" and \"really\" add no meaning.",
      "STAARE1-D-W1"),

    # ---------- D-W2: revising, skate park (7) ----------
    Q(0, 1, ORG, DEVELOP,
      "Which sentence in the second paragraph (sentences 4 through 7) does not support the writer's argument and should be deleted?",
      ["Sentence 7", "Sentence 4", "Sentence 5", "Sentence 6"],
      "The paragraph argues that a skate park would be safer than a parking lot. When skateboarding joined the Olympics does not support that point.",
      "STAARE1-D-W2"),
    Q(0, 2, ORG, ORGANIZE,
      "Which revision of sentence 3 states the writer's claim most clearly?",
      ["Our town should build a public skate park.", "Skateboarders need a better place to go, maybe.",
       "Skateboarding is a sport that many people enjoy.", "Some people like skateboarding and some do not."],
      "The essay argues for a skate park, so the claim should name it. \"A better place to go\" never says what the writer wants built.",
      "STAARE1-D-W2"),
    Q(0, 3, ORG, DEVELOP,
      "The writer wants to add a sentence after sentence 10 to support the idea that a skate park would help businesses. Which sentence is best?",
      ["A busy park brings visitors who shop and eat nearby.", "Skateboards can be expensive to buy and to repair.",
       "The grocery store has a large parking lot near the street.", "Many skaters learn new tricks by watching online videos."],
      "The paragraph argues that the park would help businesses, and regular visitors who shop and eat nearby support that. The other sentences do not.",
      "STAARE1-D-W2"),
    C(0, 2, ORG, DEVELOP,
      "Choose the best revision of sentence 13 to conclude the essay.\n\n(13) [[1]]",
      ["A skate park would make our streets safer and our town busier.", "A skate park is a good idea.",
       "That is all I have to say about the skate park idea.", "Skateboarding is fun, and that is the reason why I like it so much."],
      "The conclusion should restate the claim and its reasons: safety and help for local businesses. The other choices are vague or off topic.",
      "STAARE1-D-W2"),
    C(0, 2, CLR, COMBINE,
      "Choose the revision that makes sentence 12 parallel.\n\n(12) The city could apply for grants that help towns build parks, and local businesses [[1]].",
      ["could sponsor ramps", "sponsoring ramps", "the sponsoring of ramps", "ramps could be sponsored"],
      "Both halves should have a subject followed by \"could\" and a verb: the city could apply, businesses could sponsor. The other choices break the pattern.",
      "STAARE1-D-W2"),
    Q(0, 2, CLR, COMBINE,
      "What is the most effective way to combine sentences 5 and 6?",
      ["Skating in a parking lot means dodging cars and shoppers, but in a park, skaters could practice on smooth ramps.",
       "Skating in a parking lot means dodging cars and shoppers, in a park, skaters could practice on smooth ramps.",
       "Skating in a parking lot, in a park, means dodging cars and shoppers on smooth ramps that skaters could practice on.",
       "Skating in a parking lot means dodging cars and shoppers, and so in a park, skaters could practice on smooth ramps."],
      "\"But\" shows the contrast between the parking lot and the park. A comma alone is a comma splice, and \"and so\" wrongly makes the park a result.",
      "STAARE1-D-W2"),
    C(0, 2, CLR, CLARITY,
      "Choose the revision of sentence 9 that best fits the serious tone of the essay.\n\n(9) The grocery store would no longer have [[1]] in its lot.",
      ["skaters practicing", "skaters messing around", "kids goofing off all day", "a whole bunch of skaters"],
      "\"Skaters practicing\" is precise and fits a persuasive essay meant for city leaders. \"Messing around\" and \"goofing off\" are casual and undercut the writer's point that skating is a sport.",
      "STAARE1-D-W2"),

    # ---------- D-W3: revising, the storm (7) ----------
    C(0, 2, CLR, COMBINE,
      "Choose the most effective way to combine sentences 3 and 4.\n\n[[1]]",
      ["Rain hit the windows loudly.", "Rain hit the windows, it was loud.", "Rain hit the windows, and it was loud and noisy.", "Rain, which was loud, hit."],
      "\"Loudly\" turns sentence 4 into one word that describes the rain, which is concise and correct. A comma between two sentences creates a comma splice.",
      "STAARE1-D-W3"),
    C(0, 2, CLR, CLARITY,
      "Choose the most vivid verb for sentence 2.\n\n(2) Marisol and her little brother Teo [[1]] on the living room floor with a flashlight between them.",
      ["huddled", "sat", "were", "stayed put"],
      "\"Huddled\" shows the children crouched close together in fear, which fits the storm. \"Sat\" and \"were\" tell nothing about how they felt.",
      "STAARE1-D-W3"),
    Q(0, 3, CLR, COMBINE,
      "What is the most effective way to combine sentences 13 and 14?",
      ["When the storm ended, Marisol felt proud.", "The storm ended, Marisol felt proud.",
       "The storm ended, and also, Marisol felt proud.", "The storm ended Marisol felt proud of it."],
      "Making the first sentence a \"when\" clause joins the ideas correctly and shows the timing. The other choices create a comma splice, wordiness or a run-on.",
      "STAARE1-D-W3"),
    C(0, 2, CLR, CLARITY,
      "The writer wants to replace sentence 7 with a sentence that shows Marisol's feelings more precisely. Choose the best revision.\n\n(7) [[1]]",
      ["Marisol's hands shook on the flashlight.", "Marisol didn't know what to do at first.",
       "Marisol felt some kind of feeling about it.", "Marisol was not sure about the thing."],
      "Shaking hands show her fear through a specific detail. The other choices tell the feeling vaguely or not at all.",
      "STAARE1-D-W3"),
    Q(0, 2, ORG, ORGANIZE,
      "Which sentence could best be added after sentence 5 to build suspense?",
      ["Outside, a tree branch cracked and fell.", "Marisol's favorite color was green.",
       "Teo was five years old and liked dinosaurs.", "Their house had three bedrooms and a garage."],
      "A cracking branch adds tension to the storm scene. The other details do not build suspense.",
      "STAARE1-D-W3"),
    Q(0, 3, ORG, DEVELOP,
      "The writer wants to add a detail after sentence 11 that connects the story Marisol tells to her own situation. Which sentence is best?",
      ["In the story, the bird kept going for its little ones.", "Birds can fly long distances during migration.",
       "Marisol's grandmother lived in another state.", "The batteries in the flashlight were almost brand new."],
      "A bird that keeps going for its little ones mirrors Marisol caring for Teo during the storm. The other details do not connect the story to her.",
      "STAARE1-D-W3"),
    C(0, 2, ORG, ORGANIZE,
      "Choose the best transition to begin sentence 15.\n\n(15) [[1]] when their parents finally came home, they found both children asleep on the floor.",
      ["Hours later,", "For example,", "In contrast,", "Most importantly,"],
      "The final sentence jumps ahead in time, so \"Hours later\" signals the shift. \"For example\" and \"In contrast\" signal the wrong relationship.",
      "STAARE1-D-W3"),

    # ---------- D-W4: editing, learning to sign (7) ----------
    C(0, 2, SEN, VERB,
      "Choose the correct verb for sentence 6.\n\n(6) Facial expressions and the direction of your hands [[1]] the meaning of a sign.",
      ["change", "changes", "changing", "has changed"],
      "The compound subject \"facial expressions and the direction\" is plural, so it takes the plural verb \"change.\"",
      "STAARE1-D-W4"),
    C(0, 1, SEN, PRONOUN,
      "Choose the correct pronoun for sentence 7.\n\n(7) My brother and [[1]] practiced every night at the dinner table.",
      ["I", "me", "myself", "mine"],
      "The pronoun is part of the subject of \"practiced,\" so the subject form \"I\" is correct. Drop \"My brother and\" to test it: \"I practiced,\" not \"me practiced.\"",
      "STAARE1-D-W4"),
    Q(0, 2, SEN, BOUND,
      "What is the correct way to write sentence 12?",
      ["Last month she corrected my sign for butterfly, and she laughed when I got it wrong.",
       "Last month she corrected my sign for butterfly, she laughed when I got it wrong.",
       "Last month she corrected my sign for butterfly she laughed when I got it wrong.",
       "Last month she corrected my sign for butterfly, and laughed, when I got it so wrong."],
      "The original joins two sentences with only a comma. Adding \"and\" after the comma fixes the comma splice; removing the comma makes a run-on.",
      "STAARE1-D-W4"),
    C(0, 2, SEN, VERB,
      "Choose the verb form that keeps sentence 8 parallel.\n\n(8) The hardest part was learning to watch instead of [[1]].",
      ["listening", "listen", "to listened", "listens"],
      "After \"instead of,\" the verb takes the -ing form: learning to watch instead of listening. \"Instead of listen\" is not standard English.",
      "STAARE1-D-W4"),
    C(0, 1, MEC, SPELL,
      "Choose the correct spelling for sentence 14.\n\n(14) I am still learning the alphabet of a [[1]] that has changed my family.",
      ["language", "languege", "langauge", "languaje"],
      "Language is spelled l-a-n-g-u-a-g-e.",
      "STAARE1-D-W4"),
    C(0, 2, MEC, PUNCT,
      "Choose the correct punctuation for sentence 4.\n\n(4) Our teacher, a woman named Mrs. Okafor[[1]] came to my aunt's house every Tuesday evening.",
      [",", ";", ":", "."],
      "\"A woman named Mrs. Okafor\" renames \"our teacher,\" so it is set off by a pair of commas.",
      "STAARE1-D-W4"),
    C(0, 2, MEC, CAPS,
      "Choose the correct way to write the name of the language in sentence 1.\n\n(1) When my cousin Lily was born deaf, my whole family decided to learn [[1]].",
      ["American Sign Language", "american sign language", "American sign language", "american Sign Language"],
      "American Sign Language is the name of a language, so each word is capitalized.",
      "STAARE1-D-W4"),

    # ---------- D-W5: editing, letter to the editor (8) ----------
    C(0, 2, SEN, BOUND,
      "Choose the correct way to write sentence 13.\n\n(13) [[1]]",
      ["The Westside Library has served this neighborhood for fifty years, and it should keep serving everyone.",
       "The Westside Library has served this neighborhood for fifty years it should keep serving everyone.",
       "The Westside Library has served this neighborhood for fifty years, it should keep serving everyone.",
       "The Westside Library has served this neighborhood. For fifty more years it should keep on serving everyone."],
      "The original runs two sentences together. A comma and \"and\" join them correctly; a comma alone makes a comma splice, and breaking the sentence after \"neighborhood\" changes the meaning.",
      "STAARE1-D-W5"),
    C(0, 1, SEN, VERB,
      "Choose the verb that agrees with the subject in sentence 2.\n\n(2) The library board [[1]] the change will save money.",
      ["says", "say", "saying", "are saying"],
      "\"The library board\" is a singular subject, so it takes the singular verb \"says.\"",
      "STAARE1-D-W5"),
    Q(0, 3, SEN, VERB,
      "Which revision of sentence 6 uses the active voice?",
      ["Saturday is the only full day they can use the computers.",
       "Saturday is the only full day on which the computers are used by them.",
       "The computers can be used by them only on Saturday, the one full day.",
       "Saturday is the only full day that the computers may be used by them."],
      "In the active voice the students are the subject and do the action: they can use the computers. The other choices keep the passive \"be used by them.\"",
      "STAARE1-D-W5"),
    C(0, 2, SEN, VERB,
      "Choose the verb that agrees with its subject in sentence 3.\n\n(3) However, the change will hurt the students and working families who [[1]] on the library the most.",
      ["depend", "depends", "depending", "has depended"],
      "\"Who\" refers to the plural \"students and working families,\" so the verb must be plural: depend.",
      "STAARE1-D-W5"),
    C(0, 1, MEC, PUNCT,
      "Choose the correct way to write the word that belongs in sentence 7.\n\n(7) Last year, [[1]] used the Saturday computer lab more than any other group.",
      ["students", "student's", "students'", "studentes"],
      "The sentence needs a plural noun, not a possessive, so no apostrophe is used: students.",
      "STAARE1-D-W5"),
    C(0, 1, MEC, CAPS,
      "Choose the correct way to write the word that belongs in sentence 10.\n\n(10) Without [[1]] hours, those families will have nowhere to go.",
      ["Saturday", "saturday", "SATURDAY", "Saturdays'"],
      "Days of the week are proper nouns and are capitalized.",
      "STAARE1-D-W5"),
    C(0, 2, MEC, PUNCT,
      "Choose the correct punctuation for sentence 12.\n\n(12) For [[1]] the library could close an hour earlier on Mondays, when fewer people visit.",
      ["example,", "example", "example;", "example:"],
      "An introductory phrase such as \"For example\" is followed by a comma.",
      "STAARE1-D-W5"),
    C(0, 1, MEC, SPELL,
      "Choose the correct word for sentence 9.\n\n(9) Many of them can only bring [[1]] children to story time on weekends.",
      ["their", "there", "they're", "thier"],
      "\"Their\" shows that the children belong to the parents. \"There\" names a place and \"they're\" means \"they are.\"",
      "STAARE1-D-W5"),

    # ---------- D-W6: editing, bluebonnets (7) ----------
    C(0, 2, SEN, VERB,
      "Choose the correct verb for sentence 6.\n\n(6) Some seeds sprout the next year, but others wait several years before they [[1]].",
      ["grow", "grows", "growing", "has grown"],
      "The pronoun \"they\" refers to the plural \"others,\" so it takes the plural verb \"grow.\"",
      "STAARE1-D-W6"),
    Q(0, 2, SEN, BOUND,
      "What is the best way to correct sentences 12 and 13?",
      ["Because they need so little care, they are a favorite of gardeners who want to plant native flowers.",
       "Because they need so little care. They are a favorite of gardeners who want to plant native flowers.",
       "Because they need so little care; they are a favorite of gardeners who want to plant native flowers.",
       "They need so little care, they are a favorite of gardeners who want to plant native flowers."],
      "Sentence 12 is a dependent clause standing alone, a fragment. Joining it to sentence 13 with a comma makes a complete sentence; a semicolon cannot follow a dependent clause.",
      "STAARE1-D-W6"),
    Q(0, 3, SEN, VERB,
      "Which revision of sentence 2 uses the active voice?",
      ["Texas named the bluebonnet its state flower in 1901.", "The bluebonnet was named the state flower by Texas in 1901.",
       "In 1901, the state flower of Texas was named to be the bluebonnet.", "The bluebonnet had been named in 1901 as the state flower."],
      "In the active voice the subject, Texas, does the naming. The other choices use passive forms such as \"was named.\"",
      "STAARE1-D-W6"),
    C(0, 2, MEC, PUNCT,
      "Choose the correct punctuation for sentence 11.\n\n(11) Bluebonnets need three things to [[1]] sunlight, well-drained soil, and very little fertilizer.",
      ["thrive:", "thrive,", "thrive;", "thrive"],
      "A colon introduces a list after a complete sentence: \"Bluebonnets need three things to thrive\" is complete, so the colon fits. A comma there creates a confusing series.",
      "STAARE1-D-W6"),
    C(0, 2, MEC, PUNCT,
      "Choose the correct punctuation for sentence 3.\n\n(3) Bluebonnets are a kind of [[1]] a plant in the pea family.",
      ["lupine,", "lupine", "lupine;", "lupine:"],
      "\"A plant in the pea family\" renames lupine, so a comma sets it off. A semicolon must be followed by a complete sentence.",
      "STAARE1-D-W6"),
    C(0, 2, MEC, CAPS,
      "Choose the correct way to write the name of the region in sentence 9.\n\n(9) Each spring, families travel to the [[1]] to take photographs in fields of bluebonnets.",
      ["Hill Country", "hill country", "Hill country", "hill Country"],
      "The Hill Country is the name of a particular region of Texas, so both words are capitalized, like the Panhandle or the Gulf Coast.",
      "STAARE1-D-W6"),
    C(0, 1, MEC, SPELL,
      "Choose the correct spelling for sentence 7.\n\n(7) This helps the plant [[1]] droughts.",
      ["survive", "servive", "survife", "surviv"],
      "Survive is spelled s-u-r-v-i-v-e.",
      "STAARE1-D-W6"),
]
