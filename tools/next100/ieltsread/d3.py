# Drill-only passages: two opinion pieces, on the lone genius and on learning a language late.

D5 = {"id": "IELTSR-D-P05", "title": "The Myth of the Lone Genius", "text": (
    "Popular history loves a lone genius. We are told that a single brilliant mind, working in isolation, suddenly sees what no one else has seen, and that the world is changed as a result. The story is attractive because it is simple and because it flatters the idea that greatness lies within individuals. But I think it is, in most cases, misleading, and that believing it has real costs.\n\n"
    "Consider how inventions actually emerge. The historian of technology Felix Brandt has collected hundreds of cases in which two or more people arrived at the same discovery independently, often within months of each other. Such cases, he argues, show that ideas tend to appear when the knowledge and tools needed for them have become widely available, so that if one inventor had not made a breakthrough, another would probably have done so soon afterwards. I find his evidence difficult to dismiss.\n\n"
    "The lone-genius story also hides the many people whose work made an achievement possible. Famous laboratories of the nineteenth and twentieth centuries were busy workplaces in which teams of assistants built equipment, ran tests and recorded results, yet their names rarely appear in popular accounts. The sociologist Ines Varela has studied the notebooks kept in such workplaces and finds that credit was often given to the person in charge for ideas that first appeared in the notes of junior staff.\n\n"
    "None of this means that individuals do not matter. Some people clearly possess unusual talent, energy or imagination, and the psychologist Tom Adair has shown that outstanding creators tend to produce a very large amount of work, much of it unremarkable, from which their best ideas emerge. In other words, what looks like a sudden flash of genius is often the visible tip of years of effort. That, to my mind, is a more encouraging message than the myth, because it suggests that persistence counts for more than a mysterious gift.\n\n"
    "Why does the myth matter? Partly because it shapes how we reward people. If we believe that progress depends on a few exceptional individuals, we may pour resources into them while neglecting the teams, institutions and shared knowledge that support their work. It may also discourage young people who do not see themselves as geniuses from attempting creative work at all. A more accurate story, in which discovery is collective and gradual, would be fairer and, I suspect, more productive."
)}

NAMES5 = ["Felix Brandt", "Ines Varela", "Tom Adair"]
D5_ITEMS = [
    YN(1, "The story of the lone genius is accurate in most cases.", "N",
       "The writer says the story is, in most cases, misleading."),
    YN(2, "Brandt's evidence is hard to reject.", "Y",
       "After describing Brandt's cases, the writer says: I find his evidence difficult to dismiss."),
    YN(2, "Junior staff in famous laboratories were usually well paid.", "NG",
       "The writer says junior staff were rarely named and sometimes lost credit, but says nothing about their pay."),
    YN(2, "Individual talent plays no part in discovery.", "N",
       "The writer says none of this means individuals do not matter, since some people clearly have unusual talent, energy or imagination."),
    YN(3, "Persistence matters more than a mysterious gift.", "Y",
       "The writer finds Adair's message encouraging because it suggests persistence counts for more than a mysterious gift."),
    MF(2, "Which person found that credit for an idea sometimes went to someone who did not have it first?", "Ines Varela", NAMES5,
       "Varela studied laboratory notebooks and found credit was often given to the person in charge for ideas first noted by junior staff."),
    MF(1, "Which person collected cases of the same discovery made independently?", "Felix Brandt", NAMES5,
       "The historian Felix Brandt collected hundreds of cases in which two or more people made the same discovery independently."),
    MF(2, "Which person found that outstanding creators produce a great deal of ordinary work?", "Tom Adair", NAMES5,
       "The psychologist Tom Adair showed that outstanding creators produce a large amount of work, much of it unremarkable."),
    SE(2, "According to Brandt, new ideas tend to appear when",
       "the knowledge they need is widely shared",
       ["a single inventor works in isolation", "governments offer large rewards", "rival laboratories share their notes openly"],
       "Brandt argues ideas appear when the knowledge and tools needed for them have become widely available, so another inventor would soon have made the same breakthrough."),
    SE(2, "The writer fears that the myth may",
       "put young people off creative work",
       ["make research teams work much harder", "reduce interest in history", "lead to more shared discoveries"],
       "The last paragraph says the myth may discourage young people who do not see themselves as geniuses from attempting creative work."),
    CZ(1, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nFamous laboratories were busy workplaces where teams of [[1]] built equipment, ran tests and recorded results.",
       "assistants", ["students", "engineers", "inventors", "volunteers"],
       "The third paragraph says teams of assistants built equipment, ran tests and recorded results."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nVarela studied the [[1]] kept in laboratories to see where ideas first appeared.",
       "notebooks", ["letters", "newspapers", "diaries", "patents"],
       "The third paragraph says Varela studied the notebooks kept in such workplaces."),
]

D6 = {"id": "IELTSR-D-P06", "title": "Is It Ever Too Late to Learn a Language?", "text": (
    "It is widely believed that adults cannot learn a new language as well as children, and that anyone who starts after their teenage years is bound to struggle. Like many popular beliefs, this one contains some truth, but it has been stretched far beyond what the evidence supports, and I think it discourages many adults from trying.\n\n"
    "The truth in the belief concerns pronunciation. Studies of immigrants who arrived in a new country at different ages consistently find that those who arrived as young children are far more likely to end up sounding like native speakers. The linguist Rosa Lindqvist, who has tested several thousand learners, finds that a native-like accent is rare among people who began after their early teens, though not impossible. On this point the evidence is strong, and I accept it.\n\n"
    "Grammar and vocabulary are a different story. In the early stages of learning, adults often make faster progress than children, because they can understand explanations, use memory strategies and draw on knowledge of their first language. Children appear to catch up and overtake adults only after many years of living immersed in the language, an advantage that most adult learners, who study a few hours a week, never have the chance to test. Lindqvist's colleague Ahmed Karim argues that comparing a child surrounded by a language all day with an adult attending an evening class tells us more about opportunity than about age.\n\n"
    "Motivation also matters, and here adults can have an advantage. An adult who needs a language for work, or to talk with a partner's family, may have reasons for persisting that a child in a school classroom lacks. The educational researcher Mei Tanaka has found that adults who set specific, practical goals, such as being able to follow a news broadcast, are more likely to keep studying than those whose aim is simply to become fluent.\n\n"
    "I do not want to pretend that age makes no difference. An adult who starts learning at forty should not expect to pass as a native speaker, and should not feel that they have failed if they do not. But fluency in the sense that matters most, the ability to communicate with confidence and accuracy, is well within reach of most adults who are willing to put in the time. The belief that it is too late is, in the end, the greatest obstacle of all."
)}

D6_ITEMS = [
    YN(2, "The belief that adults cannot learn languages well has no basis at all.", "N",
       "The writer says the belief contains some truth, about pronunciation, though it has been stretched too far."),
    YN(2, "The evidence about pronunciation and age is convincing.", "Y",
       "The writer says that on pronunciation the evidence is strong, and accepts it."),
    YN(3, "Evening classes are the most effective way for adults to learn a language.", "NG",
       "Evening classes appear only in Karim's comparison; the writer never says which way of learning works best."),
    YN(1, "Age has no effect at all on how a person learns a language.", "N",
       "The writer says: I do not want to pretend that age makes no difference."),
    YN(2, "Most adults can learn to communicate with confidence in a new language.", "Y",
       "The writer says confident, accurate communication is well within reach of most adults who are willing to put in the time."),
    YN(2, "Schools should start teaching foreign languages at a younger age.", "NG",
       "The writer discusses children and adults as learners but gives no view on when schools should start teaching languages."),
    MC(2, "What does Karim argue about comparing children with adult learners?", "It reflects opportunity more than age",
       ["It shows that age is the main factor", "It is unfair to adult learners' memory", "It should include tests of accent"],
       "Karim argues that comparing an immersed child with an adult in an evening class tells us more about opportunity than about age."),
    MC(2, "According to Tanaka, which adults are more likely to keep studying?", "Those with specific, practical goals",
       ["Those who aim simply to become fluent", "Those who study alongside children", "Those who began before their teens"],
       "Tanaka found adults with specific practical goals, such as following a news broadcast, are more likely to keep studying than those aiming simply at fluency."),
    TF(1, "Lindqvist has tested several thousand language learners.", "T",
       "The second paragraph says Lindqvist has tested several thousand learners."),
    TF(2, "Lindqvist found that no late starter ever reached a native-like accent.", "F",
       "Lindqvist found a native-like accent is rare among late starters, though not impossible, which contradicts the statement."),
    SE(2, "In the early stages of learning, adults often",
       "make faster progress than children",
       ["lose interest more quickly than children", "learn only by memorising words", "avoid using their first language"],
       "The third paragraph says adults often make faster early progress because they understand explanations, use memory strategies and draw on their first language."),
    SE(2, "Children usually overtake adults only after",
       "many years of living in the language",
       ["a few hours of study each week", "they have reached their early teens", "they have learned all the grammar rules"],
       "The third paragraph says children catch up and overtake adults only after many years of living immersed in the language."),
]

PASSAGES = [(D5, D5_ITEMS), (D6, D6_ITEMS)]
