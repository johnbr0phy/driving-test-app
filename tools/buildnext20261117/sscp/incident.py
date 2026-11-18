"""Original incident response and recovery scenarios."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('Before any incident, a team checks contact lists, roles, tools and escalation paths. Which activity is this?',
 'Preparation',['Detection and analysis','Containment','Lessons learned'],
 'Preparation establishes the capabilities needed to respond effectively before anything happens.')
Q('Responders examine evidence from an unusual account alert to decide whether an incident exists. Which activity is this?',
 'Triage and analysis',['Preparation','Eradication of the cause','Recovery and restoration'],
 'Analysis interprets the event and establishes whether it is an incident and how far it reaches.')
Q('Under the response plan, a compromised workstation is cut off from other production systems. Which activity is this?',
 'Containment',['Eradication','Recovery','Preparation'],
 'Containment limits ongoing damage and spread while supporting further response. Removing the cause is eradication, which comes after.')
Q('After recovery, a team records why escalation failed and changes the procedure. Which activity is this?',
 'Lessons learned',['Containment','Eradication','Detection'],
 'Post-incident improvement uses lessons to strengthen future prevention and response.')
Q('An intrusion is contained and its persistence mechanism found. Which activity removes it before return to service?',
 'Eradication',['Containment','Recovery','Preservation'],
 'Eradication removes the established malicious cause and persistence, rather than merely isolating or reconnecting the service.')
Q('A cleaned system and verified backup are ready, and the owner authorizes restoring the function. Which activity follows?',
 'Returning the service to production',['Removing the persistence mechanism','Isolating the host from the network','Imaging the disk for evidence'],
 'Restoration returns a trusted service to operation under the recovery plan. Cleaning and isolation are already complete.')
Q('A recovered service is running, and responders watch for recurrence or residual behavior. Which activity is this?',
 'Post-restoration monitoring',['Further containment','Second eradication pass','Evidence acquisition'],
 'Monitoring after restoration helps identify incomplete recovery or renewed compromise.')
Q('The response lead must give business teams a factual update on scope, impact and next steps. Which activity is this?',
 'Status briefing via the agreed channel',['Public statement on social media','Legal hold notice to custodians','Technical root-cause report'],
 'Status communication coordinates stakeholders using verified information and the agreed channel. A root-cause report comes later and serves a different audience.')
Q('An analyst is about to work on the only copy of a relevant storage image. Which safeguard is needed first?',
 'Make a verified duplicate and analyze that instead',['Analyze the image directly and log every action','Hash the image once analysis is finished','Compress the image first to save space'],
 'Preserve the original and work on controlled copies so the source evidence remains available. Logging actions does not undo changes to the only copy.')
Q('An evidence drive passes from the collector to the forensic examiner. Which record preserves the handoff?',
 'Chain-of-custody record',['Forensic analysis report','Evidence hash list','Case timeline'],
 'Record who transferred and received the evidence, when, and under what handling conditions. A hash shows the content is unchanged but not who held it.')
Q('An examination would extend to privately owned devices outside the current authorization. What must be resolved first?',
 'Legal basis to examine those devices',['Hashes of the private devices before imaging','Tools that can read the private devices','Storage for the private device images'],
 'Confirm legal and organizational authority for the additional scope rather than assuming access permission. Tools and storage are irrelevant until authority exists.')
Q('An examiner\'s conclusion relies on several tools and transformations. Which record lets a peer assess the reasoning?',
 'Notes on methods, tool versions and assumptions',['Final conclusion with the examiner\'s signature','List of evidence items received','Custody log for the evidence'],
 'Document methods, tool details, assumptions and relevant results so the analysis can be repeated and evaluated.')
Q('An examiner needs running-process and memory state that is lost at power-off. Which evidence activity fits?',
 'Volatile data collection',['Disk imaging after shutdown','Log export from the SIEM','Hashing the powered-off drive'],
 'Capture relevant volatile evidence using an approved method before it disappears, while recording any changes caused by collection.')
Q('A case needs a controlled copy of stored files and file-system metadata for later study. Which activity fits?',
 'Forensic disk imaging',['Live memory capture','Network packet capture','Screenshot of the desktop'],
 'Acquire persistent storage evidence using approved procedures that preserve file-system metadata. Memory and packet capture collect different evidence.')
Q('After moving a collected image, an examiner compares its digest with the acquisition digest. What is the purpose?',
 'To confirm the copy matches what was acquired',['To encrypt the copy while it is transferred','To prove who created the original files','To timestamp the evidence for court use'],
 'The comparison checks that the copied evidence matches the recorded image; it does not encrypt it or prove every fact about its source.')
Q('Responders must order validated login, process and transfer events to see how compromise unfolded. Which product serves this?',
 'Incident timeline',['Evidence inventory','Chain-of-custody form','Root-cause statement'],
 'An incident timeline combines supported events and time assumptions into an ordered account.')
Q('A plan targets restoring a business function within four hours of disruption. Which measure is this?',
 'Recovery time objective (RTO)',['Recovery point objective (RPO)','Maximum tolerable downtime (MTD)','Mean time to repair (MTTR)'],
 'The recovery time objective is the targeted restoration interval. MTTR is an average repair time, not a business target.')
Q('A business can lose at most the last 15 minutes of committed records. Which measure expresses this?',
 'Recovery point objective',['Recovery time objective','Work recovery time','Maximum tolerable downtime'],
 'The recovery point objective expresses the tolerated data-loss interval measured back from the disruption.')
Q('An impact analysis finds the longest outage the organization can survive. Which measure is this?',
 'Maximum tolerable downtime',['Recovery time objective','Recovery point objective','Mean time between failures'],
 'Maximum tolerable downtime describes the outer business limit, which should be longer than the recovery time objective set within it.')
Q('Policy keeps weekly backup copies for six months before expiry. Which measure is this?',
 'Backup retention period',['Backup frequency','Backup window','Recovery point objective'],
 'Retention specifies how long backup copies are kept. Frequency is how often they are taken, and the window is when the job runs.')
Q('A backup copies all data in scope, regardless of earlier backups. Which approach is this?',
 'Full backup',['Incremental backup','Differential backup','Transaction log backup'],
 'A full backup copies the whole selected scope.')
Q('A backup copies changes since the most recent backup of any type, full or incremental. Which approach is this?',
 'Incremental backup',['Differential backup','Full backup','Mirror copy'],
 'Incremental backup captures changes since the preceding backup; restoration may require the complete relevant chain.')
Q('A backup copies all changes since the last full backup, even ones copied yesterday. Which approach is this?',
 'Differential backup',['Incremental backup','Full backup','Continuous replica'],
 'Differential backup accumulates changes since the full baseline, so each one grows until the next full backup.')
Q('Operators rebuild an isolated service from a retained copy and verify its data and functions. What was performed?',
 'Restoration test',['Backup integrity checksum','Backup job completion check','Replication health check'],
 'A restoration test checks recoverability and function; a checksum or completed job does not show the service can be rebuilt.')
Q('Ransomware could reach production and always-writable backups through the same credentials. Which design feature addresses this?',
 'Offline or immutable backup copy',['Second copy on the same storage array','More frequent snapshots on production','Backups encrypted with the production key'],
 'An isolated copy reduces the chance that the same compromised access can alter all recovery data. Extra copies or snapshots on reachable storage share the same weakness.')
Q('Primary and recovery facilities sit in the same flood zone. Which design feature addresses this?',
 'Alternate site in a different hazard area',['Warm site across the street','UPS and generator at the primary site','Second rack in the same building'],
 'Geographic separation should account for shared hazards and dependencies, not just a different street address.')
Q('A service must keep running when one server fails, without a rebuild. Which feature addresses this?',
 'Redundant servers with automatic failover',['Nightly backups of the server','Cold standby built on demand','Extended hardware support contract'],
 'Redundant live capacity supports continuity after a component failure. Backups and cold standby require a rebuild first.')
Q('A service runs at an alternate site and must return to normal without losing new records. Which plan is required?',
 'Documented failback procedure',['Failover runbook','Tabletop exercise','Backup rotation schedule'],
 'Failback planning coordinates return, synchronization and validation after alternate operation. A failover runbook covers moving away, not back.')
Q('Participants check a recovery plan line by line for contacts and roles, with no scenario. Which activity is this?',
 'Read-through review',['Tabletop exercise','Parallel test','Full interruption test'],
 'A read-through (checklist) review checks the documented plan, contacts and roles. A tabletop or structured walkthrough adds a scenario to discuss.')
Q('Participants discuss decisions and escalation during a simulated outage, without moving live workloads. Which exercise is this?',
 'Tabletop exercise',['Checklist review','Live failover simulation','Full interruption test'],
 'A tabletop uses a scenario to practice coordination and decision-making without executing a live recovery.')
Q('Technicians rebuild an isolated application from retained data copies and test it. Which exercise is this?',
 'Backup restoration test',['Tabletop exercise','Checklist review','Full interruption test'],
 'A technical restoration exercise verifies the ability to reconstruct and use the service from recovery material without disrupting production.')
Q('Under a test plan, a service moves real processing to its alternate environment and checks continuity. Which exercise is this?',
 'Full interruption test',['Parallel test','Tabletop exercise','Structured walkthrough'],
 'A full interruption test moves real processing to the alternate site and proves continuity there. A parallel test runs the alternate site alongside production without moving it.')
Q('RTO is four hours and RPO 30 minutes. Recovery takes three hours and loses 20 minutes of records. Which is correct?',
 'Both targets are met',['Only the RTO is met','Only the RPO is met','Neither target is met'],
 'Three hours is within four, and 20 minutes is within 30, so both targets are met.')
Q('RTO is two hours and RPO ten minutes. Recovery takes 90 minutes and loses 25 minutes of transactions. Which is correct?',
 'RTO met, RPO missed',['RTO missed, RPO met','RTO and RPO both met','RTO and RPO both missed'],
 'Restoration is within two hours, but data loss exceeds ten minutes.')
Q('RTO is one hour and RPO 15 minutes. Recovery takes 80 minutes and loses five minutes of updates. Which is correct?',
 'The time target is missed but the data-loss target is met',['The time target is met but the data-loss target is missed','Both the time and data-loss targets are met','Both the time and data-loss targets are missed'],
 'The 80-minute restoration exceeds the one-hour RTO, while five minutes of loss is within the RPO.')
Q('RTO is three hours and RPO five minutes. Recovery takes four hours and loses 12 minutes of bookings. Which is correct?',
 'Neither objective is achieved',['Only the recovery time objective is achieved','Only the recovery point objective is achieved','Both objectives are achieved'],
 'Both the restoration interval and the data-loss interval exceed their respective targets.')
assert len(ITEMS)==36
