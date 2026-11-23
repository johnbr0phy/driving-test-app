# Verbal reasoning drill: ten original passages, six questions each (test 0, drill only).
PASSAGES = [
    P(0, "Community first responders",
      "In parts of the west, trained volunteers known as community first responders are alerted at the "
      "same time as an ambulance when someone nearby has a suspected cardiac arrest. Because they live "
      "locally, they can often reach the person before the ambulance and begin chest compressions or use "
      "a defibrillator.\n\n"
      "Each group needs at least six members so that someone is usually available. Volunteers give their "
      "time free, but their training and equipment are provided. A survey of one group found that its "
      "members were alerted to 31 calls in a year and reached the patient first in 19 of them. The group "
      "says that more public defibrillators, kept in unlocked cabinets, would help, since its members "
      "sometimes lose time collecting one from a locked building.",
      [
          TF("In the surveyed group, members reached the patient before the ambulance in most of their calls.", "T",
             "They arrived first in 19 of 31 calls, which is more than half."),
          TF("Community first responders are paid for each call they attend.", "F",
             "Volunteers give their time free."),
          TF("Volunteers must buy their own defibrillators.", "F",
             "Their training and equipment are provided."),
          TF("Patients reached first by a responder were more likely to survive.", "C",
             "The passage gives no survival figures."),
          MC("Purpose", "Why does each group need at least six members?",
             ["So someone is usually free",
              "So that training costs can be shared",
              "So that every call has two responders",
              "So that it can qualify for equipment"],
             "The passage says six members are needed so that someone is usually available."),
          MC("Inference", "What problem would unlocked defibrillator cabinets reduce?",
             ["Time lost fetching a defibrillator",
              "Theft of defibrillators from buildings",
              "The cost of training new volunteers",
              "Delays in alerting the ambulance"],
             "Members sometimes lose time collecting a defibrillator from a locked building, which unlocked cabinets would avoid."),
      ]),
    P(0, "A town's CCTV debate",
      "A town council is deciding whether to add cameras to its main shopping street. Supporters point to "
      "a nearby town where reported thefts from shops fell by a fifth in the year after cameras went up. "
      "Opponents reply that thefts in that town were already falling before the cameras, and that some "
      "offending may simply have moved to streets without cameras.\n\n"
      "A local traders' group backs the plan and has offered to pay part of the cost. A residents' "
      "association is concerned about privacy and has asked who would be able to view the recordings and "
      "for how long they would be kept. The council has said it will publish answers to these questions "
      "before a final vote next spring.",
      [
          TF("In the nearby town, reported thefts from shops fell by 20% in the year after cameras were installed.", "T",
             "A fifth is 20%."),
          TF("The traders' group has offered to pay the whole cost of the cameras.", "F",
             "It offered to pay part of the cost."),
          TF("Offending in the nearby town moved to streets without cameras.", "C",
             "Opponents suggest some offending may have moved, but the passage does not establish that it did."),
          TF("The council has already voted to install the cameras.", "F",
             "A final vote is planned for next spring."),
          MC("Weakness", "Which point, if true, most weakens the supporters' argument?",
             ["Thefts were already falling before the cameras",
              "The traders' group will pay part of the cost",
              "The council will publish its answers in advance",
              "Residents have asked who can view recordings"],
             "If thefts were already falling, the fall after the cameras may not be due to them. The privacy questions are a separate concern, not a weakness in the evidence."),
          MC("Main point", "Which statement best describes the residents' association's position?",
             ["It wants to know how recordings are used",
              "It wants the cameras moved to other streets",
              "It supports the plan if traders pay for it",
              "It wants the vote held before next spring"],
             "The association asked who could view the recordings and how long they would be kept."),
      ]),
    P(0, "Dog control at a beach",
      "A coastal council has changed its rules for dogs on one of its busiest beaches. From June to "
      "August, dogs are now banned between 11 a.m. and 6 p.m.; at other times they must be on a lead. "
      "Outside those months, dogs may be off the lead if they are under the owner's control.\n\n"
      "The change follows complaints about dog fouling and two incidents in which children were knocked "
      "over. Wardens will patrol on summer weekends, though not on weekdays. Dog owners' groups say the hours are too "
      "long and have asked for an area at the far end of the beach where dogs could run freely all year. "
      "The council has said it will review the rules after the first summer.",
      [
          TF("In July, a dog may be on the beach at 8 p.m. if it is on a lead.", "T",
             "The ban runs from 11 a.m. to 6 p.m.; at other times in summer, dogs must be on a lead."),
          TF("In October, a dog under its owner's control may be off the lead.", "T",
             "Outside June to August, dogs may be off the lead if under the owner's control."),
          TF("Wardens will patrol the beach every day in summer.", "F",
             "Wardens will patrol on summer weekends but not on weekdays."),
          TF("The council has agreed to create a year-round area for dogs to run freely.", "C",
             "Owners' groups asked for one, and the council will review the rules, but the passage does not say it agreed."),
          MC("Reason", "Which reason for the change does the passage give?",
             ["Children were knocked over",
              "Wardens asked for shorter patrol hours",
              "Dog owners asked for the ban",
              "Bathing water failed a quality test"],
             "The change followed complaints about fouling and two incidents in which children were knocked over."),
          MC("Meaning in context", "In the passage, \"review\" means to:",
             ["look at the rules again",
              "remove the rules completely",
              "explain the rules to owners",
              "make the rules stricter"],
             "To review the rules is to examine them again; the outcome could be keeping, changing or relaxing them."),
      ]),
    P(0, "Night-time economy advisers",
      "Two Irish cities have appointed night-time economy advisers. Their job is to bring together venue "
      "owners, transport providers, residents and public services to plan for life after dark, from late "
      "opening of cultural spaces to safe ways home.\n\n"
      "Supporters say evening and night activity supports many jobs but has long been planned as an "
      "afterthought. Critics worry that encouraging more late opening could mean more noise for people "
      "who live in the centre. The advisers say their role includes listening to residents, and one of "
      "them has proposed a noise-monitoring trial on two streets. Neither adviser has powers to grant "
      "licences or change opening hours; they can only recommend.",
      [
          TF("The advisers can grant licences to late-night venues.", "F",
             "Neither adviser has powers to grant licences; they can only recommend."),
          TF("Residents are among the groups the advisers bring together.", "T",
             "The advisers bring together venue owners, transport providers, residents and public services."),
          TF("The noise-monitoring trial has shown that noise levels are rising.", "C",
             "The trial has only been proposed; the passage gives no results."),
          TF("Both advisers were appointed by national government.", "C",
             "The passage does not say who appointed them."),
          MC("Inference", "Why does the passage mention the advisers' lack of powers?",
             ["To show they must persuade others",
              "To show that residents oppose their appointment",
              "To explain why venues close early",
              "To explain why the trial was cancelled"],
             "Because they can only recommend, they must persuade others. Nothing says the trial was cancelled."),
          MC("Main point", "Which concern do the critics raise?",
             ["Late opening may disturb residents",
              "Late-night jobs are poorly paid",
              "Transport stops too early in the evening",
              "Cultural spaces receive too little funding"],
             "Critics worry that more late opening could mean more noise for people who live in the centre."),
      ]),
    P(0, "Repairing a historic bridge",
      "A stone bridge built in the 1790s carries a regional road over the River Owenbeg. An inspection "
      "found that two of its five arches had been weakened by water wearing away the riverbed beneath "
      "them. The bridge will close to vehicles for about eight months while the foundations are "
      "strengthened, though a temporary footbridge will let people cross on foot.\n\n"
      "Drivers face a detour of about 14 kilometres. Businesses on the far side say they expect to lose "
      "trade, and the council has offered to put up signs telling drivers they are still open. Engineers "
      "chose to repair the bridge rather than replace it because it is a protected structure, and because "
      "repair was estimated to be cheaper.",
      [
          TF("Fewer than half of the bridge's arches were found to be weakened.", "T",
             "Two of five arches is fewer than half."),
          TF("Pedestrians will be unable to cross the river during the works.", "F",
             "A temporary footbridge will let people cross on foot."),
          TF("The bridge carries more traffic than any other bridge in the county.", "C",
             "The passage says the bridge carries a regional road but gives no traffic figures or comparison."),
          TF("The works will be finished before the summer.", "C",
             "The passage gives the length of the closure, about eight months, but not when it starts."),
          MC("Reason", "Which reason for choosing repair does the passage give?",
             ["The bridge is a protected structure",
              "A new bridge would need a longer detour",
              "Businesses asked for the bridge to stay",
              "The riverbed was too weak for new piers"],
             "Engineers chose repair because the bridge is protected and repair was estimated to be cheaper."),
          MC("Meaning in context", "In the passage, \"wearing away\" describes:",
             ["slow erosion of the riverbed",
              "a sudden collapse of an arch",
              "damage caused by heavy lorries",
              "cracks in the stone walls"],
             "Water wearing away the riverbed is erosion: material is slowly removed from under the arches."),
      ]),
    P(0, "A youth diversion programme",
      "A youth diversion programme works with young people who have admitted to a minor offence. Instead "
      "of going to court, a young person may be offered a caution and a period of supervision, during "
      "which a juvenile liaison officer meets them and their family. The aim is to deal with the causes of "
      "the behaviour and avoid a criminal record.\n\n"
      "A local evaluation followed 300 young people for two years after they took part. Seven in ten did "
      "not come to official attention again in that time. The evaluators note that those referred to the "
      "programme are, by design, mostly first-time offenders, who are less likely to reoffend anyway, so "
      "the figure cannot be compared directly with outcomes for young people who went to court.",
      [
          TF("In the evaluation, 210 of the 300 young people did not come to official attention again within two years.", "T",
             "Seven in ten of 300 is 210."),
          TF("The young people on the programme have admitted an offence.", "T",
             "It works with young people who have admitted to a minor offence."),
          TF("The evaluation shows the programme works better than going to court.", "F",
             "The evaluators say the figure cannot be compared directly with outcomes for those who went to court."),
          TF("Most of the young people in the evaluation were aged 16 or 17.", "C",
             "The passage gives no ages."),
          MC("Weakness", "Why do the evaluators warn against comparing the programme with court outcomes?",
             ["The groups differ from the outset",
              "The court figures are older",
              "The programme lasted only two years",
              "Families took part in the programme"],
             "The programme takes mostly first-time offenders, who are less likely to reoffend anyway, so the groups were different from the outset."),
          MC("Main point", "What is the stated aim of the programme?",
             ["To tackle causes and avoid a record",
              "To reduce the number of court sittings",
              "To train juvenile liaison officers",
              "To give families legal advice"],
             "The aim is to deal with the causes of the behaviour and avoid a criminal record."),
      ]),
    P(0, "Winter road gritting",
      "A county council grits about 900 kilometres of road when frost or snow is forecast. These are the "
      "national roads, the main regional roads and the routes to hospitals and bus depots. The other "
      "roads in the county, which include nearly all of its local roads, are not gritted.\n\n"
      "Salt is spread before ice forms, usually in the evening, because it works best when it is on the "
      "road before the temperature drops. If heavy rain follows, the salt can be washed away and the road "
      "may need to be treated again. The council keeps a store of salt at each of its three depots and "
      "places grit bins at steep junctions so that residents can treat short stretches themselves.",
      [
          TF("Routes to hospitals are among the roads the council grits.", "T",
             "Routes to hospitals and bus depots are on the gritting list."),
          TF("Most local roads in the county are gritted.", "F",
             "The roads not on the list, which include nearly all local roads, are not gritted."),
          TF("Each of the council's three depots holds the same amount of salt.", "C",
             "The passage says each depot keeps a store of salt but not how much."),
          TF("The council grits more roads than any other county council.", "C",
             "The passage gives no comparison with other councils."),
          MC("Inference", "Why might a road need to be gritted twice in one night?",
             ["Rain may wash the first salt away",
              "Salt works only after midnight",
              "Lorries carry the salt off the road",
              "The first gritting is done by residents"],
             "If heavy rain follows, the salt can be washed away and the road may need treating again."),
          MC("Purpose", "What are the grit bins at steep junctions for?",
             ["For residents' own use",
              "So that gritting lorries can refill",
              "So that the depots keep less salt",
              "So that main roads need no salt"],
             "Grit bins let residents treat short stretches themselves."),
      ]),
    P(0, "Reading the energy bill",
      "A consumer group asked 500 households to explain their electricity bill. Only about a third could "
      "say correctly how much of their bill was the standing charge, the fixed amount paid however much "
      "electricity is used. Many thought it depended on usage.\n\n"
      "The group argues that clearer bills would help people decide whether to switch supplier or change "
      "when they use appliances. It wants suppliers to show the standing charge and the unit rate in the "
      "same place on every bill. Suppliers say their bills already meet the rules on what must be shown, "
      "but some have agreed to test a simpler layout with a sample of customers.",
      [
          TF("Most of the households asked could correctly say how much of their bill was the standing charge.", "F",
             "Only about a third could say so correctly."),
          TF("The standing charge stays the same however much electricity a household uses.", "T",
             "It is described as a fixed amount paid however much electricity is used."),
          TF("Some suppliers have agreed to test a simpler bill layout.", "T",
             "Some have agreed to test a simpler layout with a sample of customers."),
          TF("Households with simpler bills save money on electricity.", "C",
             "The test has not happened yet and the passage gives no savings figures."),
          MC("Best supported conclusion", "Which conclusion is best supported by the survey?",
             ["Many misunderstand part of their bill",
              "Most people switch supplier every year",
              "Suppliers break the rules on billing",
              "Standing charges are higher than unit costs"],
             "Two thirds could not say correctly how much of their bill was the standing charge. Suppliers say they meet the rules, and nothing compares charges."),
          MC("Purpose", "Why does the group want both charges shown in the same place?",
             ["So people can compare and act on them",
              "So suppliers can raise their unit rates",
              "So bills are shorter to print",
              "So the rules on bills can be dropped"],
             "The group argues clearer bills would help people decide whether to switch supplier or change when they use appliances."),
      ]),
    P(0, "Visiting a prisoner by video",
      "A prison service introduced video visits during a period when in-person visits were suspended, "
      "and has kept them since as an extra option. Families book a slot online and join from their own "
      "phone or computer. Each prisoner may have one video visit a week as well as in-person visits.\n\n"
      "A survey of families found that most valued video visits because they saved long journeys, "
      "especially for those living far from the prison. However, some said the calls felt less personal, "
      "and parents of young children said a screen could not replace being in the same room. Staff noted "
      "that video visits had made it easier to arrange contact with relatives living abroad.",
      [
          TF("Video visits replaced in-person visits permanently.", "F",
             "They were kept as an extra option, alongside in-person visits."),
          TF("Video visits last as long as in-person visits.", "C",
             "The passage does not give the length of either kind of visit."),
          TF("Families can join a video visit from their own phone.", "T",
             "Families join from their own phone or computer."),
          TF("The prison service plans to increase the number of video visits allowed.", "C",
             "The passage says nothing about plans to change the limit."),
          MC("Inference", "Which group does the passage suggest gains most from video visits?",
             ["Families living far away",
              "Parents of very young children",
              "Prisoners with no family contact",
              "Staff who supervise in-person visits"],
             "Families valued them because they saved long journeys, especially those living far away; parents of young children said a screen could not replace being together."),
          MC("Meaning in context", "In the passage, \"suspended\" means:",
             ["put on hold",
              "made shorter",
              "moved online",
              "ended for good"],
             "In-person visits were suspended during a period, which means they were stopped temporarily."),
      ]),
    P(0, "Footpath counters in a forest park",
      "A forest park installed electronic counters at its three entrances to measure visitor numbers. "
      "In the first full year they recorded about 210,000 visits, compared with an estimate of 120,000 "
      "made before the counters by staff counting cars. Managers think the earlier method missed people "
      "who arrived on foot or by bicycle.\n\n"
      "The counters show that Sunday is the busiest day and that numbers peak in May rather than in "
      "August. Managers plan to use the figures to decide where to add parking and toilets, and to time "
      "path repairs for quieter weeks. A counter cannot tell a walker from a runner, or count a person who "
      "passes twice as one visit, so the figure is treated as an estimate.",
      [
          TF("The counters recorded more visits in May than in August.", "T",
             "Numbers peak in May rather than in August."),
          TF("The counters can tell walkers from runners.", "F",
             "A counter cannot tell a walker from a runner."),
          TF("Most visitors to the park arrive by car.", "C",
             "Managers think the car count missed people on foot or by bicycle, but the passage does not say how most visitors arrive."),
          TF("The counted visits were roughly 75% higher than the earlier estimate.", "T",
             "210,000 - 120,000 = 90,000, and 90,000 is 75% of 120,000."),
          MC("Reason", "Why do managers treat the counter figure as an estimate?",
             ["Repeat passes count twice",
              "The counters work only on Sundays",
              "Staff still count the cars by hand",
              "Some entrances have no counter"],
             "A counter cannot count a person who passes twice as one visit, so the total may include repeat passes. All three entrances have counters."),
          MC("Purpose", "What will managers use the counter figures for?",
             ["Planning facilities and timing repairs",
              "Charging visitors an entry fee at busy times",
              "Setting new opening hours",
              "Closing the busiest entrance"],
             "They plan to decide where to add parking and toilets and to time path repairs for quieter weeks."),
      ]),
]
