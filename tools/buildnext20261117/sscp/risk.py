"""Original risk identification, monitoring and analysis practice."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('An assessment identifies an organized group with the intent and capability to disrupt the organization. What does the group represent?',
 'A threat source',['A vulnerability','An attack vector','A residual risk'],
 'The actor is a threat source. A weakness it might exploit would be a vulnerability, and the path it uses would be an attack vector.')
Q('An assessment finds that a public application runs an unsupported component with a known exploitable flaw. What does that weakness represent?',
 'A vulnerability',['A threat agent','An exploit','A risk event'],
 'The exploitable weakness is a vulnerability. An exploit is the code or technique that takes advantage of it, and a threat agent is the actor.')
Q('A service interruption would prevent payroll processing and create contractual penalties. What do those consequences represent?',
 'Impact on the business',['Likelihood of occurrence','Threat events','Control gaps'],
 'The consequences to organizational objectives are business impacts. Likelihood concerns how probable the event is, not what it would cost.')
Q('An organization has deployed an access gateway that enforces approved connection policy. What does this deployed measure represent?',
 'A safeguard',['A residual risk','A vulnerability','A threat vector'],
 'An implemented safeguard modifies risk by enforcing a protective measure. Residual risk is what remains after such measures.')
Q('A business decides not to launch a proposed service because its exposure exceeds the approved tolerance and no suitable controls are available. Which treatment is selected?',
 'Risk avoidance',['Risk mitigation','Risk transfer','Risk deferral'],
 'Avoidance removes the activity creating the exposure rather than operating it with controls.')
Q('A team deploys tested restrictions to reduce the likelihood of unauthorized access while continuing the service. Which treatment is selected?',
 'Risk mitigation',['Risk avoidance','Risk transference','Risk deterrence'],
 'Mitigation reduces likelihood or impact through controls while the activity continues.')
Q('An organization purchases an insurance policy covering defined incident costs while retaining responsibility for operating its systems securely. Which treatment applies to the covered costs?',
 'Risk transference',['Risk acceptance','Risk avoidance','Risk mitigation'],
 'Insurance can transfer specified financial exposure, without transferring all responsibility or eliminating the risk.')
Q('After reviewing a small remaining exposure within tolerance, the authorized owner documents a decision to operate without additional controls. Which treatment is selected?',
 'Risk acceptance',['Risk avoidance','Risk transfer','Risk mitigation'],
 'Authorized acceptance explicitly retains the assessed residual risk.')
Q('A requested review has no agreement on which subsidiaries, networks or time period it covers. Which task should settle this first?',
 'Scoping the assessment',['Rating likelihood and impact','Inventorying the affected assets','Selecting risk treatments'],
 'Scope establishes what is and is not included in the review. Assets and ratings cannot be settled until the boundary is agreed.')
Q('An assessor needs to determine which data stores and business services depend on an aging platform. Which task establishes what is exposed?',
 'Identifying the affected assets',['Estimating exploit likelihood','Selecting compensating controls','Defining the assessment scope'],
 'Identify the assets and dependencies before interpreting their exposure. Scope is already set; this task finds what sits inside it.')
Q('A weakness and its affected services are known. Management needs a reasoned view of how probable exploitation is and how serious its consequences would be. Which task provides this?',
 'Risk analysis of likelihood and impact',['Vulnerability scanning of the platform','Selection of a risk treatment','Reconciliation of the asset inventory'],
 'Risk estimation considers likelihood and impact in context, rather than treating the weakness alone as the complete risk. Treatment selection comes after analysis.')
Q('A risk register entry has an agreed response but nobody is answerable for completing it. Which governance task is missing?',
 'Naming an accountable owner',['Rescoring the risk\'s likelihood','Adding the risk to next year\'s assessment','Approving the response a second time'],
 'Assigning a response owner makes follow-through accountable and trackable.')
Q('A vulnerability score summarizes the flaw\'s technical characteristics before considering this organization\'s business use. What does that score primarily express?',
 'Technical severity of the flaw',['Business risk to the organization','Exploitability of the flaw in this network','Effectiveness of existing controls'],
 'A base severity score describes the flaw itself. It is useful input but does not alone establish organizational priority or local exposure.')
Q('Two similarly exposed systems have the same flaw, but one supports an essential clinical service. Which factor explains prioritizing that system?',
 'Asset criticality',['Technical severity','Exploit maturity','Control coverage'],
 'Asset criticality reflects the importance and potential business impact of the affected service. Severity and exploit maturity are the same for both systems.')
Q('Threat intelligence shows that attackers are actively using a weakness against comparable organizations. Which factor has changed?',
 'Likelihood of exploitation',['Asset criticality','Technical severity score','Control effectiveness'],
 'Observed exploitation changes the evidence about threat activity and likelihood. The flaw\'s technical severity is unchanged.')
Q('A proposed mitigation is deployed, but testing shows requests still bypass it. Which factor must be reassessed?',
 'Control effectiveness',['Asset criticality','Threat capability','Technical severity'],
 'The control\'s effectiveness is poor even though its installation was completed.')
Q('A scanner reports a vulnerable version, but the product may contain a vendor backport. Which next step establishes whether the reported weakness actually applies?',
 'Validate it against the vendor\'s advisory',['Patch immediately on the scanner\'s result','Close it as a false positive','Raise it to critical priority'],
 'Validate evidence and vendor applicability before treating the scanner result as confirmed or dismissing it.')
Q('Several confirmed weaknesses compete for limited maintenance time. Which task decides which ones are corrected first?',
 'Risk-based prioritization',['Fixing them in order of discovery','Fixing the easiest ones first','Fixing them by base score alone'],
 'Prioritization ranks confirmed remediation work using exposure and business impact, not merely discovery order, effort or a raw score.')
Q('A tested patch has received change approval for tonight\'s window. Which task now changes the vulnerable system?',
 'Deploy it during tonight\'s window',['Retest the patch in production first','Wait for the next quarterly window','Seek change approval a second time'],
 'Implement the authorized correction according to the change plan.')
Q('A patch job reports success, but the risk team needs proof that the vulnerability is no longer present. Which task provides that assurance?',
 'Rescan or retest the system',['Rely on the deployment log','Close the ticket on the vendor notice','Ask the owner to confirm by email'],
 'Verification checks the resulting condition; a successful deployment log or an owner\'s statement alone is insufficient.')
Q('An alert claims a malicious login, but investigation confirms the login was legitimate and no malicious event occurred. How is the alert classified?',
 'A false positive',['A false negative','A true negative','A test alert'],
 'A false positive flags an event as malicious when the malicious condition is absent.')
Q('A confirmed malicious transfer occurred, but the detection rule did not alert. How is the detection result classified?',
 'A false negative',['A false positive','A true negative','A duplicate alert'],
 'A false negative misses the malicious condition that was present.')
Q('A detection rule alerts on a malicious file transfer, and investigation confirms that the transfer was malicious. How is this result classified?',
 'A true positive',['A false positive','A true negative','An informational alert'],
 'A true positive correctly detects the malicious condition.')
Q('A benign health-check transaction occurs and the detection system correctly produces no malicious-activity alert. How is this result classified?',
 'A true negative',['A false negative','A true positive','A suppressed alert'],
 'A true negative correctly leaves the absent malicious condition unflagged. A suppressed alert would mean an alert fired and was hidden.')
Q('A monitoring team cannot distinguish unusual outbound volume from ordinary nightly processing because it has not characterized normal operation. Which task closes that gap?',
 'Profiling expected traffic over time',['Raising the outbound volume threshold','Correlating volume with login events','Blocking all nightly outbound transfers'],
 'A representative baseline establishes expected behavior and variation. Raising a threshold without one only hides alerts.')
Q('A single failed login is inconclusive, but combining repeated failures with later privilege changes may reveal a pattern. Which analysis activity is needed?',
 'Event correlation across sources',['Log normalization of each source','Baseline profiling of each source','Retention review of each source'],
 'Correlation links relevant events across sources and time to support interpretation.')
Q('Two systems describe the same incident using different time zones and an unexplained clock offset. Which step is needed before ordering their events?',
 'Convert times to one reference and record the offset',['Order the events by when the SIEM received them','Exclude the system whose clock is wrong','Edit the original logs to the correct time'],
 'Normalize time information while retaining original evidence and recording the offset assumptions. Editing originals damages evidence.')
Q('An investigation depends on logs that ordinary application administrators can silently alter. Which monitoring control addresses this evidentiary weakness?',
 'Send logs to a write-protected central store',['Keep the logs for a longer retention period','Compress and archive the logs monthly','Raise the logging verbosity'],
 'Restrict and protect retained logs against unauthorized modification. Longer retention or more detail does not stop administrators altering them.')
Q('Assessors need to inspect installed packages and local settings using an approved read account on each host. Which assessment approach fits?',
 'Credentialed vulnerability scanning',['Unauthenticated network scanning','Penetration testing','Passive traffic analysis'],
 'Credentialed assessment can inspect internal configuration that an unauthenticated scan may not reveal.')
Q('A team needs to understand which services are reachable from the public internet without using internal credentials. Which approach fits?',
 'An external unauthenticated scan',['A credentialed scan of each host','An internal segmentation test','A static code review'],
 'External exposure assessment examines the organization from the relevant outside vantage point.')
Q('Under signed rules of engagement, testers will validate whether selected weaknesses can be combined to achieve an agreed objective. Which approach fits?',
 'A penetration test',['A vulnerability scan','A compliance audit','A tabletop exercise'],
 'Authorized penetration testing validates exploitation paths within explicit scope and constraints. A scan finds weaknesses but does not chain them.')
Q('An assessor evaluates retained approvals and access-review records against a specified organizational requirement. Which approach fits?',
 'A compliance audit',['A penetration test of the access system','A vulnerability scan of the review tool','A red team exercise'],
 'Compliance evidence review assesses conformity to stated requirements, rather than actively exploiting systems.')
Q('A team must decide when old customer records may be deleted while preserving records subject to a legal hold. Which obligation category must be checked?',
 'Retention obligations',['Data localization obligations','Breach notification obligations','Purpose limitation obligations'],
 'Retention requirements and holds govern how long records must remain available and when disposal is permitted.')
Q('A proposed service would move regulated records to another jurisdiction. Which obligation category directly governs whether that placement is permitted?',
 'Data residency and transfer rules',['Retention and disposal rules','Breach notification timing rules','Consent and withdrawal rules'],
 'Data-location and cross-border requirements must be assessed for the specific context.')
Q('An analyst wants to reuse personal records for an activity unrelated to the reason they were collected. Which privacy issue must be reviewed?',
 'Purpose limitation',['Data minimization','Storage limitation','Data portability'],
 'The permitted purpose and applicable authority for processing determine whether the new use is allowed. Minimization concerns how much data is collected, not reuse.')
Q('A confirmed disclosure may trigger a duty to inform a regulator or affected people within an applicable period. Which obligation category is involved?',
 'Breach notification requirements',['Records retention requirements','Data residency requirements','Purpose limitation requirements'],
 'Notification duties depend on the applicable law and facts; no single deadline applies universally.')
Q('A review samples 200 required access approvals. Ten are missing. What proportion of the sampled approvals is missing?',
 '5%',['10%','2%','20%'],
 '10 divided by 200 equals 0.05, or 5%. The sample does not by itself establish the whole-population rate.')
Q('Of 150 confirmed vulnerabilities due for correction this month, 30 remain open at the deadline. What percentage of that due group remains open?',
 '20%',['30%','15%','80%'],
 '30 divided by 150 equals 0.20, or 20%. 80% is the share that was closed.')
Q('A detection exercise includes 50 malicious test events. The rule detects 40. What percentage of those malicious test events was detected?',
 '80%',['40%','20%','90%'],
 '40 divided by 50 equals 0.80, or 80%. This measures detection within the defined test set, not all possible attacks.')
Q('A restore verification program tests 60 backups and successfully restores 57. What is the observed success percentage?',
 '95%',['57%','5%','93%'],
 '57 divided by 60 equals 0.95, or 95%. The result is an observed test outcome, not a guarantee for future recovery.')
assert len(ITEMS)==40
