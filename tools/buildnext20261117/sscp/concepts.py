"""Original operational security concepts and practices."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
# CIA and accountability
Q('A contractor without payroll duties can read salary records, which stay accurate and online. Which property is breached?',
 'Confidentiality, through unauthorized disclosure',
 ['Integrity, through unauthorized modification','Availability, through loss of timely access','Non-repudiation, through a disputed origin'],
 'The issue is unauthorized disclosure. Integrity and availability may remain intact while confidentiality fails.')
Q('A transfer instruction\'s destination account was altered but never disclosed. Which property has failed?',
 'Integrity of the payment instruction',
 ['Confidentiality of the payment instruction','Availability of the payment service','Privacy of the account holder'],
 'Unauthorized modification compromises integrity. Secrecy alone does not ensure that a transaction remains correct.')
Q('A booking platform\'s records are accurate and protected, but an outage stops service. Which property is affected?',
 'Availability of the service to customers',
 ['Integrity of the stored bookings','Confidentiality of the customer data','Accountability of the booking staff'],
 'Availability concerns timely usable access. Correct and confidential records do not help users if the service is inaccessible.')
Q('Technicians share one admin account, so nobody can tell who made a disputed change. Which property is weakest?',
 'Accountability',
 ['Confidentiality of the shared account password','Availability of administrative access','Integrity of the change history'],
 'Individual accountability requires attributable actions. A shared identity obscures the actor even when the action is otherwise permitted and the history is intact.')
# Ethics
Q('An assessor scoring bids privately owns a stake in one bidder. Which action addresses the ethical concern?',
 'Disclose the stake so it can be managed',
 ['Continue, since the work is within the assessor\'s expertise','Score that bidder more harshly to offset any bias','Keep the stake private and document the scoring method'],
 'Disclosing the conflict allows appropriate management of impartiality. Technical competence or a documented method does not remove a financial conflict.')
Q('A sponsor asks a tester to drop a confirmed material weakness from the report to avoid delay. Which duty applies?',
 'Keep the finding and state it honestly and accurately',
 ['Remove it if the sponsor accepts the weakness in writing','Downgrade the weakness to low so launch can proceed','Move the weakness to an informal note for the sponsor'],
 'Honest reporting must preserve supported material findings. A sponsor may accept a risk, but that does not justify removing it from the record.')
Q('An administrator is given forensic work beyond their competence, and an expert may be brought in. What should they do?',
 'Arrange for a qualified examiner to perform or guide the work',
 ['Do the forensic work and mention limited experience in the report','Practise on the original evidence to learn the tools quickly','Decline the assignment without arranging any other help'],
 'Obtain qualified support rather than claim expertise they lack. Diligent service includes recognizing professional limits and still getting the work done properly.')
Q('A practitioner changing jobs still holds a former employer\'s confidential design documents. Which duty applies?',
 'Return or securely dispose of them as instructed',
 ['Keep them, since the former employer gave them legitimately','Use them internally if nothing leaves the new company','Share only the non-technical sections with the new employer'],
 'Protect the entrusted information and follow authorized return or disposal requirements. Changing jobs does not grant permission to keep or disclose it.')
# Authority and process
Q('A technician is asked to assess a supplier system outside the signed authorization, without supplier consent. What is needed first?',
 'Written sign-off from the third-party owner to test it',
 ['Verbal go-ahead from the internal colleague who asked','Scan schedule agreed with the internal help desk','Non-disclosure agreement signed by the tester'],
 'Confirm authority and scope for the supplier system. A request from an internal colleague does not establish authorization over another party\'s assets.')
Q('An operator suspects a colleague of a policy breach, and a confidential reporting process exists. Which route is appropriate?',
 'Give factual observations through the designated channel',
 ['Confront the colleague privately and ask for an explanation','Copy the colleague\'s files to build a case before reporting','Warn the team in a group chat about the behavior'],
 'Use the designated escalation channel with factual observations. Public accusations or a private investigation beyond the operator\'s authority are not part of the role.')
Q('A documented backup check is assigned to an administrator, within approved access, with no unusual risk. What should they do?',
 'Carry it out as written',
 ['Escalate the verification task for manager sign-off','Request a policy exception before starting the task','Hold the task for the next change board meeting'],
 'Perform the authorized procedure. Escalating every ordinary assigned task would not improve accountability or execution.')
Q('A team has a legitimate need the access policy forbids, and the policy has a formal exception route. How should it proceed?',
 'Ask the accountable risk owner for a documented exception',
 ['Proceed and record the business justification afterward','Ask an administrator to grant the access informally','Edit the policy text so it matches the team\'s need'],
 'Request a documented authorized exception instead of silently bypassing policy. A business need does not itself grant exception authority.')
# Control categories
Q('A service rejects connections that fail a machine-enforced network rule. Which control category is this?',
 'Logical (technical) control',
 ['Administrative control','Physical control','Operational control'],
 'Automated rule enforcement is technical. The policy authorizing the rule is administrative, but the question asks about its implementation.')
Q('A secured doorway restricts entry to a room of confidential paper records. Which control category is the doorway?',
 'Physical control',
 ['Technical control','Administrative control','Compensating control'],
 'The mechanism controls physical entry. A written visitor rule is a separate administrative control.')
Q('Management issues a binding rule on who may approve access exceptions. Which category is the rule?',
 'Administrative control',
 ['Technical control','Physical control','Corrective control'],
 'The policy defines organizational authority and is administrative. It does not directly act as a physical barrier or machine enforcement point.')
Q('Operators get role-specific practice and are assessed on secure recovery tasks. Which kind of control is this?',
 'Personnel training control',
 ['Technical recovery control','Physical security control','Detective monitoring control'],
 'Training and demonstrated competence are administrative personnel controls that prepare people for their duties. A system mechanism cannot establish operator competence.')
# Control functions
Q('A transaction service rejects submissions lacking required authorization. Which functional purpose does this serve?',
 'Preventive',
 ['Detective','Corrective','Deterrent'],
 'The control stops the unauthorized submission from completing. A later audit would serve a detective purpose.')
Q('An automated review finds a privileged account used outside its approved window yesterday. Which purpose does it serve?',
 'Detective',
 ['Preventive','Recovery','Compensating'],
 'The review identifies a past violation. It did not stop the original activity from occurring.')
Q('A process restores an accidentally altered security setting to its approved value. Which functional purpose is this?',
 'Corrective',
 ['Detective','Preventive','Directive'],
 'Returning the approved state is corrective. Merely generating an alert would leave the altered state in place.')
Q('A legacy appliance cannot run the required agent, so a restricted gateway covers the same exposure. What role does the gateway serve?',
 'Compensating',
 ['Corrective','Deterrent','Recovery'],
 'It substitutes for a required control that cannot be implemented. This requires approval and evaluation rather than an assumption of automatic equivalence.')
# Asset lifecycle
Q('A virtual machine processes production data, but no team owns it. Which record brings it under management?',
 'Inventory entry naming an accountable owner',
 ['Vulnerability scan report for the machine','Patch schedule for its guest operating system','A classification label for the data it holds'],
 'An accurate inventory with ownership enables accountability and later control actions. Scanning or patching alone does not establish who is responsible.')
Q('A product\'s vendor support period and logging may not meet policy. Which activity belongs before purchase approval?',
 'Evaluating it against security requirements',
 ['Baselining its configuration after deployment','Scanning it for vulnerabilities after installation','Tagging the asset when it is delivered'],
 'Evaluate acquisition requirements before committing to the product. Later inventory or scanning does not resolve unsuitable capabilities.')
Q('An application has an approved baseline and a supported patch ready for its window. Which activity keeps it secure?',
 'Installing it through change control',
 ['Deferring the patch until the next major version upgrade','Repeating the original acceptance test without patching','Updating the inventory record without changing the system'],
 'Maintain the supported configuration through the approved change process. Initial acceptance is not the end of security management.')
Q('A leased device holding organizational data is due for return, and retention is checked. What must happen before release?',
 'Sanitize its storage and record the result',
 ['Delete the user folders and return the device','Mark the device as disposed in the inventory','Run a factory reset without verifying the result'],
 'Authorized disposition specifies sanitization and release requirements. Deleting folders, an unverified reset or an inventory update alone does not protect stored information.')
# Change management
Q('An unapproved network change would alter access paths to a regulated service. Which assessment should inform approval?',
 'Security impact analysis',
 ['Post-implementation review','Rollback rehearsal','Capacity forecast'],
 'Assess security impact and dependencies before authorization. A technically feasible change may still create unacceptable exposure.')
Q('A tested change has an impact assessment and rollback plan, but its change owner has not agreed. Which step remains?',
 'Obtain sign-off from the designated change owner',
 ['Deploy it, since testing has already succeeded','Rehearse the rollback plan a second time','Update the configuration baseline first'],
 'Obtain the required authorization before implementation. Successful testing does not replace the organization\'s approval boundary.')
Q('An update hits a pre-agreed stop condition, and the recovery plan calls for a rollback. Which action follows?',
 'Return the service to its previous version',
 ['Continue the rollout while monitoring closely','Apply a quick fix in production to finish','Extend the window and keep troubleshooting'],
 'Execute the approved rollback when its trigger is met. Continuing a failed rollout despite the stop condition ignores the authorized plan.')
Q('A change script finished without error, but permissions and other functions are unconfirmed. Which step completes the change?',
 'Testing results against the acceptance criteria',
 ['Closing the record because the script succeeded','Scheduling the next change in the series','Notifying users that the work is finished'],
 'Verify actual outcomes against acceptance criteria. Script completion alone does not establish correct behavior.')
# Awareness
Q('Staff cannot recognize signs of impersonation in urgent payment requests. Which awareness activity targets this gap?',
 'Teach the warning signs and the call-back check',
 ['Run an unannounced impersonation test before any teaching','Publish completion figures for the existing course','Collect annual policy acknowledgement signatures'],
 'Teach recognition of relevant warning signs and the approved verification process. Testing behavior before explaining the expectation does not close the knowledge gap.')
Q('An exercise shows named incident contacts do not know their handoff duties. Which training is needed?',
 'Role rehearsal for the named responders',
 ['General phishing awareness module','Quiz on the plan\'s handoff section','Emailing the updated contact list'],
 'Role rehearsal lets participants practice coordination and handoffs. A quiz or general awareness does not build the practical skill.')
Q('Management wants evidence that an awareness campaign improved handling, not just attendance. What should be evaluated?',
 'Changes in how staff report and handle threats',
 ['Percentage of staff who completed the course','Number of posters displayed in offices','Staff satisfaction scores for the campaign'],
 'Measure appropriate behavior and outcomes using a fair, approved method. Completion counts establish exposure to training, not effectiveness.')
Q('A new reporting channel replaces the one shown in every awareness poster. What maintenance action is required?',
 'Revise the materials to show the new route',
 ['Keep the posters, since staff will learn the change','Mention the new channel only in next year\'s course','Take down all posters until the next campaign'],
 'Update the material so employees can follow the current process. Outdated instructions undermine otherwise effective awareness.')
# Visitors
Q('A vendor not on the visitor list arrives at a secure site with a convincing business card. What should happen before entry?',
 'Confirm the visit with the named host through site procedure',
 ['Admit the vendor because the business card looks genuine','Issue a badge now and check with the host afterward','Have the vendor sign the log and proceed unescorted'],
 'Verify authorization through the site process. A claimed affiliation is not itself permission to enter.')
Q('A visitor is approved to inspect one equipment room under supervision. Which control keeps the visit in scope?',
 'Staff escort for the whole visit',
 ['Visitor badge valid throughout the building','Signed confidentiality agreement','Camera covering the building entrance'],
 'Provide the required escort and restrict movement to approved areas. Registration, a badge or an agreement does not limit where the visitor goes.')
Q('A contractor is leaving after a visit with a temporary badge still active. Which action closes that access?',
 'Collect and deactivate the credential before departure',
 ['Record the departure time in the visitor log only','Let the badge lapse at its monthly expiry date','Ask the contractor to destroy it after leaving'],
 'Recover or deactivate the temporary credential according to procedure. A completed visitor log alone may leave the badge usable.')
Q('Investigators must establish whether a technician entered a restricted room at a disputed time. Which evidence is relevant?',
 'Door access logs for that room and period',
 ['Technician\'s current badge entitlements','Reception visitor sign-in sheet','Room\'s planned maintenance schedule'],
 'Physical access records can support the timeline, subject to their reliability. A current entitlement does not prove a past entry, and staff do not sign the visitor sheet.')
# Automated decisions
Q('An updated AI security filter rejects known legitimate transactions in staging. What should happen before promotion?',
 'Test it against representative acceptance cases',
 ['Promote it, since the vendor certified the model','Promote it and tune the thresholds in production','Retrain it in production on the rejected transactions'],
 'Validate the update against acceptance criteria before promotion. A model update needs outcome testing just as other security-control changes do.')
Q('An automated classification service affects sensitive data, but no team answers for its errors or changes. Which gap should be closed?',
 'Named accountability for running and reviewing it',
 ['Higher accuracy threshold for the model','Publication of the model\'s training data sources','Routing error reports to the vendor help desk'],
 'Assign accountable ownership for operation and review. A technically accurate model still needs organizational responsibility.')
Q('A training pipeline retains personal records that add nothing to its approved goal. Which change reduces privacy exposure?',
 'Stop keeping data the stated purpose does not need',
 ['Encrypt the extra records and keep all of them','Keep them in case a future purpose arises','Move the extra records to cheaper archive storage'],
 'Minimize retained data to the justified purpose and obligations. Encryption or cheaper storage still keeps the unnecessary data, and accuracy does not authorize unrelated retention.')
Q('Policy requires explaining later how an automated access recommendation was produced and who approved it. What should be kept?',
 'Inputs, model version and who signed off',
 ['Final business outcome stored in the case file','Model\'s overall accuracy statistics','Vendor\'s product documentation for the model'],
 'Document the decision provenance and human authorization. An outcome, overall accuracy or vendor documentation cannot explain how this recommendation was used.')
assert len(ITEMS)==40
