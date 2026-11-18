"""Original risk identification, monitoring and analysis practice."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('An organized group has the intent and capability to disrupt the organization. What does the group represent?',
 'Threat source',['Vulnerability','Attack vector','Residual risk'],
 'The actor is a threat source. A weakness it might exploit would be a vulnerability, and the path it uses would be an attack vector.')
Q('A public application runs an unsupported component with a known exploitable flaw. What does that weakness represent?',
 'Vulnerability',['Threat agent','Exploit','Risk event'],
 'The exploitable weakness is a vulnerability. An exploit is the code or technique that takes advantage of it, and a threat agent is the actor.')
Q('A service interruption would prevent payroll processing and create contractual penalties. What do those consequences represent?',
 'Impact on the business',['Likelihood of occurrence','Threat events','Control gaps'],
 'The consequences to organizational objectives are business impacts. Likelihood concerns how probable the event is, not what it would cost.')
Q('A deployed access gateway enforces approved connection policy. What does this measure represent?',
 'Safeguard',['Residual risk','Vulnerability','Threat vector'],
 'An implemented safeguard modifies risk by enforcing a protective measure. Residual risk is what remains after such measures.')
Q('A business drops a proposed service because its exposure exceeds tolerance and no controls fit. Which treatment is this?',
 'Risk avoidance',['Risk mitigation','Risk transfer','Risk deferral'],
 'Avoidance removes the activity creating the exposure rather than operating it with controls.')
Q('A team deploys tested restrictions to cut the likelihood of unauthorized access and keeps the service. Which treatment is this?',
 'Risk mitigation',['Risk avoidance','Risk transference','Risk escalation'],
 'Mitigation reduces likelihood or impact through controls while the activity continues.')
Q('An organization buys insurance for defined incident costs but still runs its systems securely. Which treatment covers those costs?',
 'Risk transference',['Risk acceptance','Risk avoidance','Risk mitigation'],
 'Insurance can transfer specified financial exposure, without transferring all responsibility or eliminating the risk.')
Q('The authorized owner documents a decision to run a small, in-tolerance exposure without more controls. Which treatment is this?',
 'Risk acceptance',['Risk avoidance','Risk transfer','Risk mitigation'],
 'Authorized acceptance explicitly retains the assessed residual risk.')
Q('Nobody agrees which subsidiaries, networks or period a requested review covers. Which task settles this first?',
 'Scoping the assessment',['Rating likelihood and impact','Inventorying the affected assets','Selecting risk treatments'],
 'Scope establishes what is and is not included in the review. Assets and ratings cannot be settled until the boundary is agreed.')
Q('An assessor must find which data stores and services depend on an aging platform. Which task is this?',
 'Identifying the affected assets',['Estimating exploit likelihood','Selecting compensating controls','Defining the assessment scope'],
 'Identify the assets and dependencies before interpreting their exposure. Scope is already set; this task finds what sits inside it.')
Q('A weakness is known, and management needs a view of how probable and how serious exploitation would be. Which task provides this?',
 'Risk analysis of likelihood and impact',['Vulnerability scanning of the platform','Selection of a risk treatment','Reconciliation of the asset inventory'],
 'Risk estimation considers likelihood and impact in context, rather than treating the weakness alone as the complete risk. Treatment selection comes after analysis.')
Q('A risk register entry has an agreed response but nobody answerable for it. Which task is missing?',
 'Naming an accountable owner',['Rescoring the risk\'s likelihood','Adding the risk to next year\'s assessment','Approving the response a second time'],
 'Assigning a response owner makes follow-through accountable and trackable.')
Q('A vulnerability score summarizes a flaw\'s technical traits before this organization\'s business use is considered. What does it express?',
 'Technical severity of the flaw',['Business risk to the organization','Exploitability of the flaw in this network','Effectiveness of existing controls'],
 'A base severity score describes the flaw itself. It is useful input but does not alone establish organizational priority or local exposure.')
Q('Two exposed systems share a flaw, but one supports an essential clinical service. Which factor justifies prioritizing it?',
 'Asset criticality',['Technical severity','Exploit maturity','Control coverage'],
 'Asset criticality reflects the importance and potential business impact of the affected service. Severity and exploit maturity are the same for both systems.')
Q('Attackers are actively using a weakness against comparable organizations. Which factor has changed?',
 'Likelihood of exploitation',['Asset criticality','Technical severity score','Control effectiveness'],
 'Observed exploitation changes the evidence about threat activity and likelihood. The flaw\'s technical severity is unchanged.')
Q('A mitigation is deployed, but testing shows requests still bypass it. Which factor must be reassessed?',
 'Control effectiveness',['Asset criticality','Threat capability','Technical severity'],
 'The control\'s effectiveness is poor even though its installation was completed.')
Q('A scanner reports a vulnerable version, but the vendor may have backported a fix. Which step confirms whether it applies?',
 'Validate it against the vendor\'s advisory',['Patch immediately on the scanner\'s result','Close it as a false positive','Raise it to critical priority'],
 'Validate evidence and vendor applicability before treating the scanner result as confirmed or dismissing it.')
Q('Several confirmed weaknesses compete for limited maintenance time. Which task decides what is fixed first?',
 'Risk-based prioritization',['Fixing them in order of discovery','Fixing the easiest ones first','Fixing them by base score alone'],
 'Prioritization ranks confirmed remediation work using exposure and business impact, not merely discovery order, effort or a raw score.')
Q('A tested patch has change approval for tonight\'s window. What is the next remediation step?',
 'Install the patch as scheduled',['Rescan the system to confirm the fix','Close the change record as completed','Update the configuration baseline to the patched state'],
 'Implement the authorized correction according to the change plan. Rescanning, closing the record and updating the baseline all follow a successful deployment.')
Q('A patch job reports success, but proof is needed that the vulnerability is gone. Which task provides it?',
 'Rescan or retest the system',['Rely on the deployment log','Close the ticket on the vendor notice','Ask the owner to confirm by email'],
 'Verification checks the resulting condition; a successful deployment log or an owner\'s statement alone is insufficient.')
Q('An alert flags a malicious login, but the login proves legitimate. How is the alert classified?',
 'False positive',['False negative','True negative','Test alert'],
 'A false positive flags an event as malicious when the malicious condition is absent.')
Q('A confirmed malicious transfer occurred, but the rule did not alert. How is the result classified?',
 'False negative',['False positive','True negative','Duplicate alert'],
 'A false negative misses the malicious condition that was present.')
Q('A rule alerts on a file transfer that investigation confirms was malicious. How is this classified?',
 'True positive',['False positive','True negative','Informational alert'],
 'A true positive correctly detects the malicious condition.')
Q('A benign health check occurs and the detection system correctly raises no alert. How is this classified?',
 'True negative',['False negative','True positive','Suppressed alert'],
 'A true negative correctly leaves the absent malicious condition unflagged. A suppressed alert would mean an alert fired and was hidden.')
Q('A team cannot tell unusual outbound volume from nightly processing because normal is undefined. Which task closes the gap?',
 'Profiling expected traffic over time',['Raising the outbound volume threshold','Correlating volume with login events','Blocking all nightly outbound transfers'],
 'A representative baseline establishes expected behavior and variation. Raising a threshold without one only hides alerts.')
Q('One failed login is inconclusive, but repeated failures plus later privilege changes may form a pattern. Which analysis is needed?',
 'Event correlation across sources',['Log normalization of each source','Baseline profiling of each source','Retention review of each source'],
 'Correlation links relevant events across sources and time to support interpretation.')
Q('Two systems log the same incident in different time zones with an unexplained clock offset. What is needed before ordering events?',
 'Convert times to one reference and record the offset',['Order the events by when the SIEM received them','Exclude the system whose clock is wrong','Edit the original logs to the correct time'],
 'Normalize time information while retaining original evidence and recording the offset assumptions. Editing originals damages evidence.')
Q('An investigation relies on logs that application administrators can silently alter. Which control addresses this?',
 'Send logs to a write-protected central store',['Keep the logs for a longer retention period','Compress and archive the logs monthly','Raise the logging verbosity'],
 'Restrict and protect retained logs against unauthorized modification. Longer retention or more detail does not stop administrators altering them.')
Q('Assessors will inspect packages and settings on each host with an approved read account. Which approach fits?',
 'Credentialed vulnerability scanning',['Unauthenticated network scanning','Penetration testing','Passive traffic analysis'],
 'Credentialed assessment can inspect internal configuration that an unauthenticated scan may not reveal.')
Q('A team needs to know which services are reachable from the internet without internal credentials. Which approach fits?',
 'External unauthenticated scan',['Credentialed scan of each host','Internal segmentation test','Static code review'],
 'External exposure assessment examines the organization from the relevant outside vantage point.')
Q('Under signed rules of engagement, testers check whether weaknesses can be chained to reach an agreed goal. Which approach fits?',
 'Penetration test',['Vulnerability scan','Compliance audit','Tabletop exercise'],
 'Authorized penetration testing validates exploitation paths within explicit scope and constraints. A scan finds weaknesses but does not chain them.')
Q('An assessor checks retained approvals and access-review records against a stated requirement. Which approach fits?',
 'Compliance audit',['Penetration test of the access system','Vulnerability scan of the review tool','Red team exercise'],
 'Compliance evidence review assesses conformity to stated requirements, rather than actively exploiting systems.')
Q('A team must decide when old customer records may be deleted, sparing those under legal hold. Which obligation applies?',
 'Retention obligations',['Data localization obligations','Breach notification obligations','Purpose limitation obligations'],
 'Retention requirements and holds govern how long records must remain available and when disposal is permitted.')
Q('A service would move regulated records to another jurisdiction. Which obligation governs that placement?',
 'Data residency and transfer rules',['Retention and disposal rules','Breach notification timing rules','Consent and withdrawal rules'],
 'Data-location and cross-border requirements must be assessed for the specific context.')
Q('An analyst wants to reuse personal records for something unrelated to why they were collected. Which privacy issue applies?',
 'Purpose limitation',['Data minimization','Storage limitation','Data portability'],
 'The permitted purpose and applicable authority for processing determine whether the new use is allowed. Minimization concerns how much data is collected, not reuse.')
Q('A confirmed disclosure may require telling a regulator or affected people within a set period. Which obligation is involved?',
 'Breach notification requirements',['Records retention requirements','Data residency requirements','Purpose limitation requirements'],
 'Notification duties depend on the applicable law and facts; no single deadline applies universally.')
Q('A review samples 200 required access approvals and finds 10 missing. What proportion is missing?',
 '5%',['10%','2%','20%'],
 '10 divided by 200 equals 0.05, or 5%. The sample does not by itself establish the whole-population rate.')
Q('Of 150 vulnerabilities due this month, 30 remain open at the deadline. What percentage remains open?',
 '20%',['30%','15%','80%'],
 '30 divided by 150 equals 0.20, or 20%. 80% is the share that was closed.')
Q('A rule detects 40 of 50 malicious test events. What percentage was detected?',
 '80%',['40%','20%','90%'],
 '40 divided by 50 equals 0.80, or 80%. This measures detection within the defined test set, not all possible attacks.')
Q('A program tests 60 backups and restores 57 successfully. What is the success percentage?',
 '95%',['57%','5%','93%'],
 '57 divided by 60 equals 0.95, or 95%. The result is an observed test outcome, not a guarantee for future recovery.')
assert len(ITEMS)==40
