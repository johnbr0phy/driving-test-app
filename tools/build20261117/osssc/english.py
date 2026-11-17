"""Original English questions. Within a family, every option is a key in another context."""
ITEMS=[]
def family(options, rows):
    for k,(stem,why) in enumerate(rows): ITEMS.append((stem,[options[k]]+options[:k]+options[k+1:],why))
family(['had completed','has completed','will have completed','is completing'],[
('Choose the verb phrase showing an action already finished before a past deadline: By the time the inspector arrived yesterday, Tara ___ the register.','The past perfect had completed places completion before the past arrival.'),
('Choose the verb phrase connecting a finished action with the present: Tara ___ the register already, so it is ready for inspection now.','Has completed is present perfect and links the finished work to its present result.'),
('Choose the verb phrase expressing completion before a future point: By this time tomorrow, Tara ___ the register.','Will have completed is future perfect: completion before a future reference point.'),
('Choose the verb phrase for an action in progress now: Please wait; Tara ___ the register at this moment.','Is completing is present continuous for work underway now.')])
family(['since','for','during','until'],[
('Fill the gap: The office has occupied this building ___ 2018.','Since introduces the starting point of a period continuing to the present.'),
('Fill the gap: The clerk has worked here ___ six years.','For introduces a duration, here six years.'),
('Choose the preposition meaning within the period of the meeting: No visitors entered the room ___ the meeting.','During locates the event within the period named by the noun meeting.'),
('Choose the preposition marking Friday as the endpoint: Applications will remain open ___ Friday and will close that evening.','Until marks the endpoint of the period for which applications remain open.')])
family(['although','because','unless','so that'],[
('Choose the conjunction expressing concession: ___ the road was narrow, the bus passed safely.','Although contrasts the difficult condition with the successful outcome.'),
('Choose the conjunction expressing a cause: The hall was closed ___ its roof needed repairs.','Because introduces the reason for the closure.'),
('Choose the conjunction meaning except if: The parcel cannot be released ___ you show the receipt.','Unless sets showing the receipt as the condition needed for release.'),
('Choose the conjunction expressing purpose: She labelled each drawer ___ the files could be found quickly.','So that introduces the intended result of labelling.')])
family(['a','an','the','no article'],[
('Choose the article before university: Meera hopes to study at ___ university near her village; she has not chosen one yet.','University starts with a consonant /y/ sound, so the indefinite article is a.'),
('Choose the article: It took ___ hour to repair the printer.','Hour begins with a vowel sound because h is silent, so an is used.'),
('A report was placed on my desk. Complete the next sentence: I signed ___ report and returned it.','The refers back to the particular report already introduced.'),
('Choose the article, or no article: ___ honesty is essential in public service.','Honesty is used as an abstract uncountable noun in a general statement and takes no article.')])
family(['is','are','was','were'],[
('Choose the present-tense verb: Each of the sealed packets ___ ready for dispatch.','Each is singular, so its present-tense verb is is.'),
('Choose the present-tense verb: The forms, together with their envelopes, ___ on the desk.','The plural subject forms takes are; the added phrase does not change agreement.'),
('Choose the past-tense verb: Neither of the two keys ___ missing when we checked yesterday.','Neither is treated as singular in formal agreement, giving was.'),
('Choose the past-tense verb: The records ___ transferred to the new room last week.','The plural subject records takes were in this past passive construction.')])
family(['must','may','should','cannot'],[
('Choose the modal expressing a binding obligation: Under this rule, every applicant ___ sign the declaration; unsigned forms are rejected.','Must expresses a requirement rather than permission, advice or impossibility.'),
('Choose the modal expressing permission: Visitors ___ use the side gate if they prefer, but the main entrance remains open.','May grants permission without imposing an obligation.'),
('Choose the modal expressing advice rather than a rule: You ___ keep a spare copy, though the instructions do not require it.','Should recommends an action without making it compulsory.'),
('Choose the modal expressing impossibility: A whole number ending in 5 ___ be divisible by 2.','Cannot expresses impossibility: a number ending in 5 is odd.')])
family(['brief','accurate','impartial','legible'],[
('Choose the closest meaning of concise in: The officer asked for a concise account of the incident.','Concise means expressing the information briefly, without unnecessary words.'),
('Choose the closest meaning of precise in: The surveyor supplied precise measurements.','Precise measurements are exact or accurate.'),
('Choose the closest meaning of unbiased in: An unbiased assessor reviewed both applications.','Unbiased means impartial: not favouring one side.'),
('Choose the closest meaning of readable in: Please submit a clearly readable handwritten address.','Legible means clear enough to read, especially handwriting.')])
family(['temporary','scarce','transparent','reluctant'],[
('Choose the opposite of permanent in: The team used a permanent office.','Temporary means lasting only for a limited period, the opposite of permanent.'),
('Choose the opposite of abundant in: Clean water was abundant in the settlement.','Scarce means insufficient or in short supply, unlike abundant.'),
('Choose the opposite of opaque when describing a sheet through which light and objects can be seen clearly.','Transparent allows clear viewing through it; opaque does not transmit light.'),
('Choose the opposite of willing in: He was willing to accept the extra duty.','Reluctant means hesitant or unwilling to do something.')])
family(['postponed','cancelled','resumed','concluded'],[
('A meeting was moved from Monday to Thursday. It was ___.','Postponed means delayed to a later time, not abandoned altogether.'),
('Organisers announced that the planned event would not take place at all. It was ___.','Cancelled means called off rather than merely delayed.'),
('After a short break, the discussion began again from where it had stopped. It ___.','Resumed means continued after an interruption.'),
('After the final item had been discussed, the chair formally ended the session. It ___.','Concluded means brought to an end.')])
family(['The clerk checked the entries.','The clerk is checking the entries.','The clerk has checked the entries.','The clerk will check the entries.'],[
('Choose the active sentence preserving the tense of: The entries were checked by the clerk.','Were checked is simple past passive; checked preserves the simple past in active voice.'),
('Choose the active sentence preserving the tense of: The entries are being checked by the clerk.','Are being checked is present continuous passive; is checking is the corresponding active form.'),
('Choose the active sentence preserving the tense of: The entries have been checked by the clerk.','Have been checked is present perfect passive; has checked agrees with the singular active subject.'),
('Choose the active sentence preserving the tense of: The entries will be checked by the clerk.','Will be checked becomes will check in active voice.')])
family(['No definite conclusion is supported.','Only the first claim is supported.','Only the second claim is supported.','Both claims are supported.'],[
('Notice: The library will close early on Wednesday for maintenance. Claim 1: It will remain closed all Thursday. Claim 2: Membership fees will increase. Which assessment follows from the notice alone?','Neither Thursday opening nor membership fees is addressed, so neither claim is established.'),
('Notice: Requests received before noon will be processed today; later requests will be processed tomorrow. Claim 1: A request received at 11 a.m. will be processed today. Claim 2: A request received at 2 p.m. will be processed today. Which assessment follows?','The 11 a.m. request is before noon; the 2 p.m. request is later and belongs to tomorrow.'),
('Notice: Only registered teams may enter the competition. Claim 1: Every registered team must compete. Claim 2: An unregistered team is ineligible to enter. Which assessment follows?','Registration is necessary for entry but does not compel participation.'),
('Notice: The counter accepts cash and cards, and closes at 4 p.m. Claim 1: Card payments are accepted. Claim 2: The counter closes at 4 p.m. Which assessment follows?','Both claims are directly stated in the notice.')])
ITEMS += [
('Read: A village installed a new water tank. During the first month, supply was uneven. Inspectors found that two valves had been left partly closed. After the valves were adjusted, water reached every lane. Which conclusion is best supported?', ['The valve settings contributed to the uneven supply.','The tank had insufficient capacity for the village.','Residents used less water after the inspection.','The pipes had to be replaced in every lane.'],'The reported improvement followed adjustment of the partly closed valves; capacity, usage changes and pipe replacement are not reported.'),
('Read: An office tested online appointments for six weeks. Waiting times fell, but some visitors could not book online. The office retained a walk-in counter alongside the booking system. Why did it retain that counter?', ['To preserve access for people unable to book online.','To compare the cost of two internet providers.','To reduce the number of appointments available.','To replace the booking system after the trial.'],'The stated limitation was that some visitors could not book online, and the walk-in counter addresses that access problem.'),
('Read: The committee initially favoured the cheapest supplier. It then found that the price excluded delivery and maintenance. After comparing total costs, it selected another supplier. What changed the decision?', ['Considering costs beyond the quoted purchase price.','Finding that the cheapest supplier had no stock.','Deciding that delivery speed mattered more than cost.','Learning that maintenance was unnecessary.'],'The passage specifically links the revised decision to a comparison including delivery and maintenance costs.')]
assert len(ITEMS)==47
