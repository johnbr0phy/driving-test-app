"""Original operational security concepts and practices."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
# CIA and accountability
Q('A support contractor can read salary records despite having no payroll duties. The records remain accurate and the system stays online. Which security property is directly breached?',
 'Confidentiality, through unauthorized disclosure',
 ['Integrity, through unauthorized modification','Availability, through loss of timely access','Non-repudiation, through a disputed origin'],
 'The issue is unauthorized disclosure. Integrity and availability may remain intact while confidentiality fails.')
Q('A transfer instruction arrives with its destination account altered, even though it was never disclosed to an unauthorized reader. Which property has failed?',
 'Integrity of the payment instruction',
 ['Confidentiality of the payment instruction','Availability of the payment service','Privacy of the account holder'],
 'Unauthorized modification compromises integrity. Secrecy alone does not ensure that a transaction remains correct.')
Q('A booking platform retains accurate, protected records but cannot serve customers during a prolonged outage. Which property is primarily affected?',
 'Availability of the service to customers',
 ['Integrity of the stored bookings','Confidentiality of the customer data','Accountability of the booking staff'],
 'Availability concerns timely usable access. Correct and confidential records do not help users if the service is inaccessible.')
Q('All technicians share one administrative account. Changes are authorized, but investigators cannot establish which individual performed a disputed action. Which property is weakest?',
 'Accountability',
 ['Confidentiality of the shared account password','Availability of administrative access','Integrity of the change history'],
 'Individual accountability requires attributable actions. A shared identity obscures the actor even when the action is otherwise permitted and the history is intact.')
# Ethics
Q('An assessor is evaluating bids and privately owns a financial stake in one bidder. The assessment is otherwise within the assessor\'s expertise. Which professional action addresses this ethical concern?',
 'Disclose the stake so it can be managed',
 ['Continue, since the work is within the assessor\'s expertise','Score that bidder more harshly to offset any bias','Keep the stake private and document the scoring method'],
 'Disclosing the conflict allows appropriate management of impartiality. Technical competence or a documented method does not remove a financial conflict.')
Q('A project sponsor asks a tester to remove a confirmed material weakness from the final report to avoid delaying launch. Which duty governs the tester\'s response?',
 'Keep the finding and state it honestly and accurately',
 ['Remove it if the sponsor accepts the weakness in writing','Downgrade the weakness to low so launch can proceed','Move the weakness to an informal note for the sponsor'],
 'Honest reporting must preserve supported material findings. A sponsor may accept a risk, but that does not justify removing it from the record.')
Q('An administrator receives a specialized forensic assignment beyond their current competence. The evidence is important and the organization permits bringing in an expert. What should the administrator do?',
 'Arrange for a qualified examiner to perform or guide the work',
 ['Do the forensic work and mention limited experience in the report','Practise on the original evidence to learn the tools quickly','Decline the assignment without arranging any other help'],
 'Obtain qualified support rather than claim expertise they lack. Diligent service includes recognizing professional limits and still getting the work done properly.')
Q('A practitioner changes employers while retaining confidential design documents entrusted by the former employer. No authority permits reuse at the new company. Which duty applies to those documents?',
 'Return or securely dispose of them as instructed',
 ['Keep them, since the former employer gave them legitimately','Use them internally if nothing leaves the new company','Share only the non-technical sections with the new employer'],
 'Protect the entrusted information and follow authorized return or disposal requirements. Changing jobs does not grant permission to keep or disclose it.')
# Authority and process
Q('A technician is asked to assess a supplier system that is not listed in the signed assessment authorization. The requester cannot show supplier consent. What must be resolved before assessment activity?',
 'A scope document covering that third party\'s equipment',
 ['A verbal go-ahead from the internal colleague who asked','A scan schedule agreed with the internal help desk','A non-disclosure agreement signed by the tester'],
 'Confirm authority and scope for the supplier system. A request from an internal colleague does not establish authorization over another party\'s assets.')
Q('An operator observes a suspected policy breach involving a colleague. The organization has a confidential reporting process, and no immediate safety action is required. Which route is appropriate?',
 'Give factual observations through the designated channel',
 ['Confront the colleague privately and ask for an explanation','Copy the colleague\'s files to build a case before reporting','Warn the team in a group chat about the behavior'],
 'Use the designated escalation channel with factual observations. Public accusations or a private investigation beyond the operator\'s authority are not part of the role.')
Q('A routine backup verification task is documented, assigned to the administrator and within approved access. No exception or unexpected risk is present. What is the appropriate next action?',
 'Carry it out as written',
 ['Escalate the verification task for manager sign-off','Request a policy exception before starting the task','Hold the task for the next change board meeting'],
 'Perform the authorized procedure. Escalating every ordinary assigned task would not improve accountability or execution.')
Q('A team has a legitimate need that the current access policy does not permit. The policy provides a formal route for approving departures from it. How should the team proceed?',
 'Ask the accountable risk owner for a documented exception',
 ['Proceed and record the business justification afterward','Ask an administrator to grant the access informally','Edit the policy text so it matches the team\'s need'],
 'Request a documented authorized exception instead of silently bypassing policy. A business need does not itself grant exception authority.')
# Control categories
Q('A service rejects connections that do not satisfy a machine-enforced network rule. Which control category best describes this mechanism?',
 'A logical (technical) control',
 ['An administrative control','A physical control','An operational control'],
 'Automated rule enforcement is technical. The policy authorizing the rule is administrative, but the question asks about its implementation.')
Q('A secured doorway restricts entry to a room containing confidential paper records. Which control category describes the doorway mechanism?',
 'A physical control',
 ['A technical control','An administrative control','A compensating control'],
 'The mechanism controls physical entry. A written visitor rule is a separate administrative control.')
Q('Management issues a binding rule defining who may approve access exceptions. Which category describes the rule itself?',
 'An administrative control',
 ['A technical control','A physical control','A corrective control'],
 'The policy defines organizational authority and is administrative. It does not directly act as a physical barrier or machine enforcement point.')
Q('An organization gives operators role-specific practice and evaluates whether they can perform secure recovery tasks. Which kind of control does this represent?',
 'A personnel training control',
 ['A technical recovery control','A physical security control','A detective monitoring control'],
 'Training and demonstrated competence are administrative personnel controls that prepare people for their duties. A system mechanism cannot establish operator competence.')
# Control functions
Q('A transaction service rejects a submission unless its required authorization is present. Which functional purpose does this control serve?',
 'Preventive',
 ['Detective','Corrective','Deterrent'],
 'The control stops the unauthorized submission from completing. A later audit would serve a detective purpose.')
Q('An automated review finds that a privileged account was used outside its approved window yesterday. Which functional purpose does that review primarily serve?',
 'Detective',
 ['Preventive','Recovery','Compensating'],
 'The review identifies a past violation. It did not stop the original activity from occurring.')
Q('A managed process restores an accidentally altered security configuration to its approved value. Which functional purpose is being performed?',
 'Corrective',
 ['Detective','Preventive','Directive'],
 'Returning the approved state is corrective. Merely generating an alert would leave the altered state in place.')
Q('A legacy appliance cannot support the required endpoint agent. An approved restricted gateway provides an alternative safeguard addressing the same exposure while replacement is planned. What role does that safeguard serve?',
 'Compensating',
 ['Corrective','Deterrent','Recovery'],
 'It substitutes for a required control that cannot be implemented. This requires approval and evaluation rather than an assumption of automatic equivalence.')
# Asset lifecycle
Q('A newly discovered virtual machine processes production data, but no team accepts responsibility for it. Which lifecycle record is needed to bring it under management?',
 'An inventory entry naming an accountable owner',
 ['A vulnerability scan report for the machine','A patch schedule for its guest operating system','A classification label for the data it holds'],
 'An accurate inventory with ownership enables accountability and later control actions. Scanning or patching alone does not establish who is responsible.')
Q('A department is considering a product whose vendor support period and logging features may not meet policy. Which lifecycle activity belongs before the purchase is approved?',
 'Evaluating it against security requirements',
 ['Baselining its configuration after deployment','Scanning it for vulnerabilities after installation','Tagging the asset when it is delivered'],
 'Evaluate acquisition requirements before committing to the product. Later inventory or scanning does not resolve unsuitable capabilities.')
Q('An established application has an approved baseline and a supported patch release ready for its maintenance window. Which lifecycle activity keeps the deployed asset secure?',
 'Installing it through change control',
 ['Deferring the patch until the next major version upgrade','Repeating the original acceptance test without patching','Updating the inventory record without changing the system'],
 'Maintain the supported configuration through the approved change process. Initial acceptance is not the end of security management.')
Q('A leased device is due for return and contains organizational data. Retention requirements have been checked. Which lifecycle decision must govern its handling before release?',
 'Sanitize its storage and record the result',
 ['Delete the user folders and return the device','Mark the device as disposed in the inventory','Run a factory reset without verifying the result'],
 'Authorized disposition specifies sanitization and release requirements. Deleting folders, an unverified reset or an inventory update alone does not protect stored information.')
# Change management
Q('A proposed network change would alter access paths to a regulated service. It has not yet been approved. Which assessment should inform the approval decision?',
 'A security impact analysis',
 ['A post-implementation review','A rollback rehearsal','A capacity forecast'],
 'Assess security impact and dependencies before authorization. A technically feasible change may still create unacceptable exposure.')
Q('A tested modification has a documented impact assessment and rollback plan, but the required change owner has not agreed to production execution. Which step remains?',
 'Obtain sign-off from the designated change owner',
 ['Deploy it, since testing has already succeeded','Rehearse the rollback plan a second time','Update the configuration baseline first'],
 'Obtain the required authorization before implementation. Successful testing does not replace the organization\'s approval boundary.')
Q('A deployed update violates a pre-agreed stop condition during its change window. The approved recovery procedure specifies restoring the prior version. Which action follows that plan?',
 'Return the service to its previous version',
 ['Continue the rollout while monitoring closely','Apply a quick fix in production to finish','Extend the window and keep troubleshooting'],
 'Execute the approved rollback when its trigger is met. Continuing a failed rollout despite the stop condition ignores the authorized plan.')
Q('A change script completes without error. The service still needs confirmation that intended permissions work and unrelated functions remain available. Which step completes the change?',
 'Testing results against the acceptance criteria',
 ['Closing the record because the script succeeded','Scheduling the next change in the series','Notifying users that the work is finished'],
 'Verify actual outcomes against acceptance criteria. Script completion alone does not establish correct behavior.')
# Awareness
Q('Employees receive unfamiliar urgent-payment requests and do not know which features indicate possible impersonation. Which awareness activity targets the initial gap?',
 'Teach the warning signs and the call-back check',
 ['Run an unannounced impersonation test before any teaching','Publish completion figures for the existing course','Collect annual policy acknowledgement signatures'],
 'Teach recognition of relevant warning signs and the approved verification process. Testing behavior before explaining the expectation does not close the knowledge gap.')
Q('An incident plan names contacts, but an exercise reveals they do not know their handoff responsibilities. Which training activity is needed?',
 'Role rehearsal for the named responders',
 ['A general phishing awareness module','A quiz on the plan\'s handoff section','Emailing the updated contact list'],
 'Role rehearsal lets participants practice coordination and handoffs. A quiz or general awareness does not build the practical skill.')
Q('A campaign has been delivered to all staff. Management wants evidence of improved handling rather than attendance alone. What should be evaluated?',
 'Changes in how staff report and handle threats',
 ['The percentage of staff who completed the course','The number of posters displayed in offices','Staff satisfaction scores for the campaign'],
 'Measure appropriate behavior and outcomes using a fair, approved method. Completion counts establish exposure to training, not effectiveness.')
Q('A new reporting channel replaces the one shown in every awareness poster. What maintenance action is required?',
 'Revise the materials to show the new route',
 ['Keep the posters, since staff will learn the change','Mention the new channel only in next year\'s course','Take down all posters until the next campaign'],
 'Update the material so employees can follow the current process. Outdated instructions undermine otherwise effective awareness.')
# Visitors
Q('A vendor arrives at a secure site without appearing on the expected visitor list. The visitor presents a convincing business card. Which step should occur before granting entry?',
 'Confirm the visit with the named host through site procedure',
 ['Admit the vendor because the business card looks genuine','Issue a badge now and check with the host afterward','Have the vendor sign the log and proceed unescorted'],
 'Verify authorization through the site process. A claimed affiliation is not itself permission to enter.')
Q('A visitor has been approved to inspect one equipment room under supervision. What control keeps the visit within that authorized scope?',
 'A staff escort for the whole visit',
 ['A visitor badge valid throughout the building','A signed confidentiality agreement','A camera covering the building entrance'],
 'Provide the required escort and restrict movement to approved areas. Registration, a badge or an agreement does not limit where the visitor goes.')
Q('A contractor finishes an approved visit and is leaving with a temporary badge that remains active. Which action closes the temporary access lifecycle?',
 'Collect and deactivate the credential before departure',
 ['Record the departure time in the visitor log only','Let the badge lapse at its monthly expiry date','Ask the contractor to destroy it after leaving'],
 'Recover or deactivate the temporary credential according to procedure. A completed visitor log alone may leave the badge usable.')
Q('Investigators need to establish whether an authorized technician entered a restricted room during a disputed interval. Which existing evidence is directly relevant?',
 'Door access logs for that room and period',
 ['The technician\'s current badge entitlements','The reception visitor sign-in sheet','The room\'s planned maintenance schedule'],
 'Physical access records can support the timeline, subject to their reliability. A current entitlement does not prove a past entry, and staff do not sign the visitor sheet.')
# Automated decisions
Q('An AI-enabled security filter is updated and begins rejecting known legitimate transactions in staging. Which change-control activity should resolve this before promotion?',
 'Test it against representative acceptance cases',
 ['Promote it, since the vendor certified the model','Promote it and tune the thresholds in production','Retrain it in production on the rejected transactions'],
 'Validate the update against acceptance criteria before promotion. A model update needs outcome testing just as other security-control changes do.')
Q('An automated classification service affects sensitive-data handling, but no team owns its errors, changes or review process. Which governance gap should be closed?',
 'Named accountability for running and reviewing it',
 ['A higher accuracy threshold for the model','Publication of the model\'s training data sources','Routing error reports to the vendor help desk'],
 'Assign accountable ownership for operation and review. A technically accurate model still needs organizational responsibility.')
Q('A training pipeline retains personal records that do not contribute to its approved purpose. Which lifecycle change reduces unnecessary privacy exposure?',
 'Stop keeping data the stated purpose does not need',
 ['Encrypt the extra records and keep all of them','Keep them in case a future purpose arises','Move the extra records to cheaper archive storage'],
 'Minimize retained data to the justified purpose and obligations. Encryption or cheaper storage still keeps the unnecessary data, and accuracy does not authorize unrelated retention.')
Q('An automated access recommendation influenced a material business decision. Policy requires the organization to explain later how the recommendation was produced and who approved acting on it. What should be kept?',
 'The inputs, model version and who signed off',
 ['The final business outcome stored in the case file','The model\'s overall accuracy statistics','The vendor\'s product documentation for the model'],
 'Document the decision provenance and human authorization. An outcome, overall accuracy or vendor documentation cannot explain how this recommendation was used.')
assert len(ITEMS)==40
