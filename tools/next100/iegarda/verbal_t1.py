# Verbal reasoning, Practice Test 1: five original passages, six questions each.
# TF(statement, key, explanation) with key "T", "F" or "C" (Cannot say).
# MC(skill, stem, [key, wrong, wrong, wrong], explanation): the key is written first.
PASSAGES = [
    P(1, "Rural text alert scheme",
      "Three years ago, the parishes around Kilbrannagh set up a text alert scheme. A local co-ordinator "
      "receives messages from the Garda station and forwards them to everyone who has signed up, usually "
      "within an hour. Most alerts concern suspicious vehicles, though the scheme has also been used to "
      "find a missing walker and to warn of flooding on the coast road.\n\n"
      "Membership has grown from 140 households in the first year to just over 600 today. The organisers "
      "say the main benefit is not the number of crimes solved but the fact that neighbours now look out "
      "for one another. They admit that some alerts arrive too late to be useful, and that older residents "
      "without mobile phones are left out. A plan to add a telephone call service for those residents is "
      "being discussed but has not been funded.",
      [
          TF("The scheme now has more than four times as many member households as in its first year.", "T",
             "Membership grew from 140 households to just over 600, and 4 x 140 = 560, so just over 600 is more than four times as many.", basics='drawConclusions'),
          TF("The telephone call service for older residents has been funded.", "F",
             "The passage says the plan is being discussed but has not been funded.", basics='findingDetail'),
          TF("The scheme has led to fewer burglaries in the parishes.", "C",
             "The passage gives no burglary figures, and the organisers say the main benefit is not the number of crimes solved.", basics='mustBeTrue'),
          TF("Every alert sent through the scheme has concerned a suspected crime.", "F",
             "Alerts were also used to find a missing walker and to warn of flooding, which are not crimes.", basics='mustBeTrue'),
          MC("Main point", "Which statement best sums up the organisers' view of the scheme?",
             ["Its main value is neighbours looking out for each other",
              "Its value lies mainly in the number of crimes it helps to solve",
              "It works well only for households near the Garda station",
              "It should be replaced by a telephone call service"],
             "The organisers say the main benefit is not crimes solved but neighbours looking out for one another. The phone service is an addition being discussed, not a replacement."),
          MC("Weakness", "Which limitation of the scheme does the passage mention?",
             ["Some residents cannot receive the alerts",
              "The co-ordinator is not trained by the Gardaí",
              "Members find the alerts too frequent",
              "Flood warnings are sent by a different body"],
             "Older residents without mobile phones are left out. The passage says nothing about training, alert frequency or another body sending flood warnings."),
      ]),
    P(1, "Body-worn cameras in a pilot",
      "A city council ran a six-month pilot in which its parking wardens wore small cameras on their "
      "uniforms. The cameras recorded only when a warden pressed a button, and wardens were told to say "
      "aloud that recording had started. Before the pilot, wardens reported an average of eleven verbal "
      "assaults a month; during it, the figure fell to seven.\n\n"
      "The council's report is cautious. It points out that the pilot ran through the summer, when "
      "complaints are usually lower, and that wardens who volunteered for the pilot may have been more "
      "confident in difficult conversations. It also notes that recordings were deleted after thirty days "
      "unless they were needed for a complaint or a prosecution. The report recommends a second pilot "
      "over a full year before any decision is taken on wider use.",
      [
          TF("Under the pilot, wardens could record only by pressing a button.", "T",
             "The passage says the cameras recorded only when a warden pressed a button.", basics='findingDetail'),
          TF("The report concludes that the cameras caused the fall in verbal assaults.", "F",
             "The report is cautious: it names the summer timing and volunteer wardens as other possible reasons, so it does not conclude the cameras caused the fall.", basics='inference'),
          TF("Under the pilot, a recording needed for a prosecution could be kept beyond thirty days.", "T",
             "Recordings were deleted after thirty days unless they were needed for a complaint or a prosecution.", basics='inference'),
          TF("Most of the council's wardens took part in the pilot.", "C",
             "The passage says the wardens in the pilot volunteered, but it never says how many wardens the council has.", basics='mustBeTrue'),
          MC("Best supported conclusion", "Which conclusion does the passage best support?",
             ["The pilot's results do not yet justify wider use",
              "Cameras should be worn by all wardens from next year",
              "Verbal assaults are highest in the summer months",
              "Recording without warning would have worked better"],
             "The report recommends a second, year-long pilot before deciding on wider use. It says complaints are usually lower in summer, so it does not say assaults peak then."),
          MC("Meaning in context", "In the passage, the word \"cautious\" suggests that the report:",
             ["avoids drawing firm conclusions",
              "criticises the wardens' behaviour",
              "warns the public about recording",
              "rejects the use of cameras"],
             "The report lists reasons the fall might not be due to the cameras and asks for more evidence, which is avoiding a firm conclusion. It does not reject the cameras."),
      ]),
    P(1, "Volunteer river rescue",
      "The river rescue unit in Carrowmore is run entirely by volunteers. Its twelve members train every "
      "second Sunday and are on call through a paging system. In a typical year the unit answers between "
      "twenty and thirty calls, most of them in the late spring and summer, when more people swim and fish "
      "on the river.\n\n"
      "The unit's boat and equipment were bought with money raised locally, and its running costs are met "
      "partly by a grant and partly by an annual fundraising swim. Members say recruitment is their "
      "biggest challenge: people are willing to help, but few can commit to training twice a month as well "
      "as being on call. The unit has recently allowed new members to join as shore support, handling "
      "radios and first aid, before they decide whether to train for boat work.",
      [
          TF("Members of the unit are paid for each call they answer.", "F",
             "The unit is run entirely by volunteers, so members are not paid for calls.", basics='inference'),
          TF("The unit trains about twice a month.", "T",
             "Members train every second Sunday, which is about twice a month.", basics='inference'),
          TF("The grant covers more of the unit's running costs than the fundraising swim does.", "C",
             "Running costs are met partly by a grant and partly by the swim, but the passage gives no amounts for either.", basics='mustBeTrue'),
          TF("New members can help the unit without first training for boat work.", "T",
             "New members can join as shore support, handling radios and first aid, before deciding on boat training.", basics='findingDetail'),
          MC("Purpose", "Why has the unit created the shore support role?",
             ["To let people with less time help",
              "To reduce the number of calls in the summer",
              "To replace members who train for boat work",
              "To meet a condition of its grant"],
             "Recruitment is hard because few can commit to the training and being on call, so the shore role lets people help first. Nothing links it to the grant or to call numbers."),
          MC("Inference", "What can be inferred about the unit's busiest period?",
             ["It matches the months of heaviest river use",
              "It falls in the weeks of the fundraising swim",
              "It depends on how many members are on call",
              "It has moved from summer to the winter months"],
             "Most calls come in late spring and summer, when more people swim and fish, so the busy period follows river use."),
      ]),
    P(1, "Reporting online fraud",
      "Many victims of online fraud never report it. A survey of 2,000 adults found that one in five had "
      "lost money to an online scam in the previous two years, but fewer than half of those had told the "
      "Gardaí or their bank. The most common reasons given were embarrassment and a belief that nothing "
      "could be done.\n\n"
      "Banks point out that reporting quickly can make a real difference: a payment that is flagged within "
      "hours can sometimes be stopped before the money leaves the receiving account. Reports also help to "
      "build a picture of which scams are spreading, so that warnings can be issued. The survey's authors "
      "suggest that public campaigns should stress that being deceived is not a sign of foolishness, since "
      "many scams are designed by organised groups and are hard to spot.",
      [
          TF("In the survey, about 400 adults had lost money to an online scam in the previous two years.", "T",
             "One in five of 2,000 adults is 400.", basics='drawConclusions'),
          TF("Most of the survey's scam victims had reported their loss to the Gardaí or their bank.", "F",
             "Fewer than half of the victims told the Gardaí or their bank, so most did not.", basics='inference'),
          TF("A payment flagged within hours can always be stopped.", "F",
             "The passage says such a payment can sometimes be stopped, not always.", basics='mustBeTrue'),
          TF("Older adults in the survey were more likely than younger adults to report a scam.", "C",
             "The passage gives no breakdown by age.", basics='mustBeTrue'),
          MC("Assumption", "The authors' suggestion about public campaigns assumes that:",
             ["embarrassment keeps some victims quiet",
              "organised groups target only older people",
              "banks are unwilling to stop fraudulent payments",
              "most scams are easy to recognise"],
             "Telling people that being deceived is not foolish only helps if embarrassment is holding them back, which the survey gives as a common reason."),
          MC("Main point", "What is the main point of the passage?",
             ["More victims should report online fraud",
              "Online fraud is now the most common crime",
              "Banks are to blame for most online losses",
              "Most online scams are carried out by individuals"],
             "The passage explains why victims do not report, why reporting helps and how campaigns could encourage it. It says scams are often designed by organised groups, not individuals."),
      ]),
    P(1, "School travel survey",
      "Every autumn, the schools in one county take part in a travel survey. Pupils say how they travelled "
      "to school on a chosen day. This year, 38% walked or cycled, up from 31% five years ago, while the "
      "share arriving by car fell from 52% to 45%. The rest came by bus or train.\n\n"
      "The county council links the change to new footpaths and cycle lanes near several schools and to "
      "a scheme that closes some school streets to through traffic at the start and end of the day. "
      "Parents interviewed for the survey said safety was the main thing that decided how their children "
      "travelled. Some said that they would let their children walk if they had company, and a number of "
      "schools have started walking groups led by parent volunteers.",
      [
          TF("This year, more pupils arrived by car than walked or cycled.", "T",
             "45% arrived by car and 38% walked or cycled.", basics='drawConclusions'),
          TF("The share of pupils coming by bus or train was the same five years ago as this year.", "T",
             "Five years ago the rest was 100 - 31 - 52 = 17%; this year it is 100 - 38 - 45 = 17%.", basics='drawConclusions'),
          TF("Every school in the county now closes its street to through traffic at the start of the day.", "F",
             "The scheme closes some school streets, not every school's.", basics='findingDetail'),
          TF("The walking groups have increased the number of pupils who walk to school.", "C",
             "The passage says some schools have started walking groups but gives no figures on their effect.", basics='mustBeTrue'),
          MC("Best supported conclusion", "Which conclusion is best supported by the passage?",
             ["Safety concerns shape how children get to school",
              "Most parents now prefer their children to cycle to school",
              "Bus and train travel to school has fallen over five years",
              "The council plans to close every school street"],
             "Parents said safety was the main factor, and the changes credited are safety measures. The bus and train share stayed at 17%."),
          MC("Meaning in context", "In the passage, \"through traffic\" means vehicles that:",
             ["pass through without stopping",
              "bring pupils to the school gates",
              "belong to people living on the street",
              "travel at speeds above the limit"],
             "Through traffic is traffic passing through a street on the way somewhere else, as opposed to vehicles with business on that street."),
      ]),
]
