# Drill-only passages: the science of bread, and the four-day week.

D3 = {"id": "IELTSR-D-P03", "title": "What Happens Inside a Loaf", "text": (
    "**A** Bread is one of the oldest prepared foods, and for most of its history it was made without any understanding of the chemistry involved. Bakers knew that dough left in a warm place would rise, and that a piece kept back from one batch could start the next, but they had no idea why. Today food scientists can describe each stage of bread making in detail, and their explanations show how much happens inside an ordinary loaf.\n\n"
    "**B** The structure of bread begins with gluten. Wheat flour contains two groups of proteins which, when mixed with water and worked by kneading, link together into long, stretchy chains. These form a network that runs through the dough, giving it the elastic quality that bakers feel under their hands. Flours with little of these proteins, such as those from rice or maize, cannot form the same network, which is why they give flat or crumbly results when used on their own.\n\n"
    "**C** The rise itself comes from yeast, a single-celled fungus that feeds on sugars in the dough. As it feeds, it releases carbon dioxide gas and small amounts of alcohol. The gas is trapped by the gluten network in countless tiny bubbles, which expand and cause the dough to swell. Warmth speeds this process up, but dough that rises too quickly may develop less flavour, and many bakers prefer a long, cool rise.\n\n"
    "**D** Sourdough works in a similar way but relies on a mixture of wild yeasts and bacteria kept alive in a starter of flour and water. The bacteria produce acids that give the bread its sharp taste and help it stay fresh for longer. Because the starter is fed and kept from one batch to the next, some bakeries claim that theirs has been in continuous use for decades.\n\n"
    "**E** In the oven, several changes happen at once. The gas bubbles expand rapidly in the heat, giving the loaf a final burst of growth, until the proteins set and the structure becomes fixed. On the surface, where the temperature rises highest, sugars and proteins react together to form the brown crust and many of the flavours that people associate with fresh bread.\n\n"
    "**F** Once baked, bread begins to go stale. Many people assume this is because it dries out, but the main cause is a change in the starch, which slowly returns to a more ordered, crystal-like form that feels hard and dry. This process happens fastest at temperatures just above freezing, so bread kept in a refrigerator usually goes stale sooner than bread kept at room temperature, while freezing almost stops it."
)}

D3_ITEMS = [
    HEAD(1, "B", "How the dough gets its stretch",
         ["Gas that makes the dough rise", "The history of milling flour", "Why some people avoid eating wheat bread", "The real reason bread goes stale"],
         "Paragraph B explains how two groups of wheat proteins link into stretchy gluten chains that make dough elastic."),
    HEAD(1, "C", "Gas that makes the dough rise",
         ["Wild yeasts and a long-lived starter", "How the dough gets its stretch", "How bakers choose an oven", "The best way to store flour"],
         "Paragraph C describes yeast releasing carbon dioxide that the gluten traps in bubbles, so the dough swells. Wild yeasts belong to sourdough in Paragraph D."),
    HEAD(2, "D", "Wild yeasts and a long-lived starter",
         ["Gas that makes the dough rise", "Why some people avoid eating wheat bread", "Changes in the heat of the oven", "The history of milling flour"],
         "Paragraph D is about sourdough: wild yeasts and bacteria in a starter that some bakeries have kept for decades."),
    HEAD(2, "E", "Changes in the heat of the oven",
         ["How bakers choose an oven", "The real reason bread goes stale", "The best way to store flour", "How the dough gets its stretch"],
         "Paragraph E describes what happens during baking: a final rise, proteins setting and the crust forming. It does not discuss choosing an oven."),
    HEAD(2, "F", "The real reason bread goes stale",
         ["The best way to store flour", "Changes in the heat of the oven", "Why some people avoid eating wheat bread", "Wild yeasts and a long-lived starter"],
         "Paragraph F says staling is caused mainly by a change in the starch, not by drying out. Storage is about bread, not flour."),
    TF(1, "Early bakers understood why dough rose.", "F",
       "Paragraph A says bakers knew that dough would rise but had no idea why."),
    TF(1, "Yeast produces some alcohol as it feeds.", "T",
       "Paragraph C says yeast releases carbon dioxide gas and small amounts of alcohol."),
    TF(2, "Sourdough bread contains more protein than ordinary bread.", "NG",
       "Paragraph D compares sourdough's taste and freshness but says nothing about its protein content."),
    MI(2, "an explanation of why some flours give flat results", "B", "ABCDEF",
       "Paragraph B says flours with little of the gluten proteins, such as rice or maize, give flat or crumbly results on their own."),
    MI(2, "a reason not to keep bread in a refrigerator", "F", "ABCDEF",
       "Paragraph F says staling is fastest just above freezing, so bread in a refrigerator usually goes stale sooner than bread at room temperature."),
    SE(2, "Dough that rises very quickly may",
       "develop less flavour",
       ["lose its gluten network", "stay fresh for longer", "form a thicker crust"],
       "Paragraph C says warmth speeds up rising, but dough that rises too quickly may develop less flavour. Staying fresh for longer is due to the acids in sourdough."),
    SE(2, "The brown colour of the crust comes from",
       "sugars reacting with proteins",
       ["alcohol produced by the yeast", "acids made by the bacteria", "starch returning to crystals"],
       "Paragraph E says sugars and proteins react together on the hot surface to form the brown crust. Starch crystals belong to staling in Paragraph F."),
]

D4 = {"id": "IELTSR-D-P04", "title": "The Four-Day Week: A Change Worth Making?", "text": (
    "For most of the past century, the five-day working week has seemed as natural as the seasons. Yet it is a relatively recent invention, and there is nothing fixed about it. Over the last decade, a growing number of employers have experimented with a four-day week, usually keeping pay the same while reducing hours. The results have attracted a great deal of attention, and I believe they deserve it, although not all of the claims made for the idea stand up to scrutiny.\n\n"
    "The strongest evidence concerns well-being. The organisational psychologist Clara Henning, who has followed staff at several firms before and after the change, reports large falls in stress and in the number of days taken off sick. Employees told her that the extra day gave them time for exercise, family and the errands that otherwise crowded their weekends. These findings are consistent across very different workplaces, and I see little reason to doubt them.\n\n"
    "Claims about productivity are another matter. Supporters often say that workers produce as much in four days as they once did in five, because they waste less time and concentrate harder. In some offices this appears to be true. But the economist Owen Pryce warns that many trials have been short, and that the organisations taking part chose to do so, which may mean they were already well suited to the change. Firms that struggled might simply not have volunteered. Until we have evidence from a wider range of employers over several years, it would be unwise to assume that output will always hold steady.\n\n"
    "There is also the question of who benefits. A shorter week is easier to arrange in an office, where work can often be rescheduled, than in a hospital, a care home or a factory that must run continuously. Pryce points out that in such settings a four-day week for each worker usually means hiring more staff, which raises costs. The union researcher Amira Saleh adds that workers on low pay may prefer extra paid hours to an extra day off. If the policy spreads only among well-paid office workers, it could widen the gap between those jobs and the rest.\n\n"
    "None of this persuades me that the idea should be dropped. The five-day week was itself once a radical demand, and it was adopted gradually, industry by industry, as employers found ways to make it work. Something similar may happen now. What we need is patience and careful measurement rather than either enthusiasm or alarm."
)}

NAMES4 = ["Clara Henning", "Owen Pryce", "Amira Saleh"]
D4_ITEMS = [
    YN(1, "The five-day week has always been the normal pattern of work.", "N",
       "The writer calls the five-day week a relatively recent invention with nothing fixed about it."),
    YN(2, "The findings about workers' well-being can be trusted.", "Y",
       "The writer says the well-being findings are consistent across very different workplaces and sees little reason to doubt them."),
    YN(2, "The four-day week is a bad idea and should be abandoned.", "N",
       "The last paragraph begins: none of this persuades me that the idea should be dropped."),
    YN(3, "Governments should make the four-day week a legal requirement.", "NG",
       "The writer asks for patience and careful measurement but never mentions laws or governments."),
    YN(2, "A four-day week is easier to organise in an office than in a hospital.", "Y",
       "The writer says a shorter week is easier to arrange in an office, where work can be rescheduled, than in a hospital, care home or factory."),
    MC(1, "What does Henning report about staff after the change?", "Less stress and fewer sick days",
       ["Higher output in every firm", "Longer hours on the remaining working days", "Less time for family life"],
       "Henning reports large falls in stress and in days taken off sick. Productivity is discussed separately and is not her finding."),
    MC(2, "Why does Pryce doubt some of the productivity findings?", "The firms chose to join the trials",
       ["Workers were paid less during the trials", "The trials measured stress, not output", "Most trials took place in factories"],
       "Pryce warns that the organisations chose to take part, so they may already have been well suited to the change, and that many trials were short."),
    MC(2, "What does the writer compare the four-day week with in the last paragraph?", "The earlier move to a five-day week",
       ["The spread of working from home offices", "Shorter school holidays", "Rules on overtime pay"],
       "The writer says the five-day week was once a radical demand adopted gradually, industry by industry, and that something similar may happen now."),
    CZ(1, "Summary completion", "Complete the summary. Choose ONE word from the list.\n\nEmployees said the extra day gave them time for exercise, family and the [[1]] that used to crowd their weekends.",
       "errands", ["travel", "study", "hobbies", "overtime"],
       "The second paragraph says the extra day gave time for exercise, family and the errands that otherwise crowded their weekends."),
    CZ(2, "Sentence completion", "Complete the sentence. Choose ONE word from the list.\n\nIn a hospital, a four-day week for each worker usually means hiring more [[1]].",
       "staff", ["managers", "shifts", "machines", "volunteers"],
       "Pryce points out that in settings that run continuously, a four-day week usually means hiring more staff, which raises costs."),
    MF(2, "Which person warns that the trials may have involved firms already suited to the change?", "Owen Pryce", NAMES4,
       "The economist Owen Pryce warns that the organisations chose to take part and may already have been well suited to the change."),
    MF(2, "Which person suggests that some workers might prefer more paid hours?", "Amira Saleh", NAMES4,
       "The union researcher Amira Saleh adds that workers on low pay may prefer extra paid hours to an extra day off."),
]

PASSAGES = [(D3, D3_ITEMS), (D4, D4_ITEMS)]
