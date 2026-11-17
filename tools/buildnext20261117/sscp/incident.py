"""Original incident response and recovery scenarios."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('Before an incident, a team verifies contact lists, responsibilities, tools and escalation paths. Which response activity is being performed?',
 'Preparation',['Detection and analysis','Containment','Lessons learned'],
 'Preparation establishes the capabilities needed to respond effectively before anything happens.')
Q('An unusual account alert arrives. Responders examine available evidence to determine what happened and whether an incident exists. Which activity is this?',
 'Triage and analysis',['Preparation','Eradication of the cause','Recovery and restoration'],
 'Analysis interprets the event and establishes whether it is an incident and how far it reaches.')
Q('A confirmed compromised workstation is restricted from communicating with other production systems under the approved response plan. Which activity is this?',
 'Containment',['Eradication','Recovery','Preparation'],
 'Containment limits ongoing damage and spread while supporting further response. Removing the cause is eradication, which comes after.')
Q('After recovery, a team documents why escalation failed and changes the procedure to prevent recurrence. Which activity is this?',
 'Lessons learned',['Containment','Eradication','Detection'],
 'Post-incident improvement uses lessons to strengthen future prevention and response.')
Q('Responders have contained an intrusion and identified the persistence mechanism. Which activity eliminates that mechanism before return to service?',
 'Eradication',['Containment','Recovery','Preservation'],
 'Eradication removes the established malicious cause and persistence, rather than merely isolating or reconnecting the service.')
Q('A cleaned system and verified backup are ready, and the recovery owner authorizes re-establishing the business function. Which activity follows?',
 'Returning the service to production',['Removing the persistence mechanism','Isolating the host from the network','Imaging the disk for evidence'],
 'Restoration returns a trusted service to operation under the recovery plan. Cleaning and isolation are already complete.')
Q('A recovered service is operating again. Responders now look for recurrence or unexpected residual behavior. Which activity is being performed?',
 'Post-restoration monitoring',['Further containment','A second eradication pass','Evidence acquisition'],
 'Monitoring after restoration helps identify incomplete recovery or renewed compromise.')
Q('The approved response lead must give affected business teams a factual update on scope, service impact and next steps. Which activity is this?',
 'A status briefing via the agreed channel',['A public statement on social media','A legal hold notice to custodians','A technical root-cause report'],
 'Status communication coordinates stakeholders using verified information and the agreed channel. A root-cause report comes later and serves a different audience.')
Q('An analyst is about to work on the only copy of a potentially relevant storage image. What evidentiary safeguard is needed before analysis changes it?',
 'Make a verified duplicate and analyze that instead',['Analyze the image directly and log every action','Hash the image once analysis is finished','Compress the image first to save space'],
 'Preserve the original and work on controlled copies so the source evidence remains available. Logging actions does not undo changes to the only copy.')
Q('An evidence drive passes from the collecting technician to the forensic examiner. Which record preserves traceability of that handoff?',
 'A chain-of-custody record',['A forensic analysis report','An evidence hash list','A case timeline'],
 'Record who transferred and received the evidence, when, and under what handling conditions. A hash shows the content is unchanged but not who held it.')
Q('A proposed examination includes privately owned devices beyond the current authorization. Which issue must be resolved before expanding the examination?',
 'A legal basis to examine those devices',['Hashes of the private devices before imaging','Tools that can read the private devices','Storage for the private device images'],
 'Confirm legal and organizational authority for the additional scope rather than assuming access permission. Tools and storage are irrelevant until authority exists.')
Q('An examiner reaches a conclusion from several tools and transformations. What record allows another qualified examiner to assess how the conclusion was reached?',
 'Notes on methods, tool versions and assumptions',['The final conclusion with the examiner\'s signature','The list of evidence items received','The custody log for the evidence'],
 'Document methods, tool details, assumptions and relevant results so the analysis can be repeated and evaluated.')
Q('An authorized examiner needs the current running-process and memory state that will disappear when the host powers off. Which evidence activity addresses that need?',
 'Volatile data collection',['Disk imaging after shutdown','Log export from the SIEM','Hashing the powered-off drive'],
 'Capture relevant volatile evidence using an approved method before it disappears, while recording any changes caused by collection.')
Q('A case requires a controlled copy of stored files and file-system metadata for later examination. Which evidence activity is appropriate?',
 'Forensic disk imaging',['Live memory capture','Network packet capture','A screenshot of the desktop'],
 'Acquire persistent storage evidence using approved procedures that preserve file-system metadata. Memory and packet capture collect different evidence.')
Q('A collected image is transferred to another analysis system. The examiner compares a suitable cryptographic digest with the recorded acquisition digest. What is the purpose?',
 'To confirm the copy matches what was acquired',['To encrypt the copy while it is transferred','To prove who created the original files','To timestamp the evidence for court use'],
 'The comparison checks that the copied evidence matches the recorded image; it does not encrypt it or prove every fact about its source.')
Q('Responders need to order the validated login, process and transfer events to understand the sequence of compromise. Which analysis product serves this need?',
 'An incident timeline',['An evidence inventory','A chain-of-custody form','A root-cause statement'],
 'An incident timeline combines supported events and time assumptions into an ordered account.')
Q('A service plan sets a target of restoring a business function within four hours after disruption. Which measure is this?',
 'Recovery time objective (RTO)',['Recovery point objective (RPO)','Maximum tolerable downtime (MTD)','Mean time to repair (MTTR)'],
 'The recovery time objective is the targeted restoration interval. MTTR is an average repair time, not a business target.')
Q('A business can tolerate losing no more than the last 15 minutes of committed records following recovery. Which measure expresses that tolerance?',
 'Recovery point objective',['Recovery time objective','Work recovery time','Maximum tolerable downtime'],
 'The recovery point objective expresses the tolerated data-loss interval measured back from the disruption.')
Q('A business impact analysis identifies the longest outage the organization can survive before consequences become unacceptable. Which measure is this?',
 'Maximum tolerable downtime',['Recovery time objective','Recovery point objective','Mean time between failures'],
 'Maximum tolerable downtime describes the outer business limit, which should be longer than the recovery time objective set within it.')
Q('A policy requires weekly backup copies to remain available for six months before approved expiration. Which measure is being specified?',
 'Backup retention period',['Backup frequency','Backup window','Recovery point objective'],
 'Retention specifies how long backup copies are kept. Frequency is how often they are taken, and the window is when the job runs.')
Q('A backup captures all data within the selected scope regardless of previous backup changes. Which approach is this?',
 'A full backup',['An incremental backup','A differential backup','A transaction log backup'],
 'A full backup copies the whole selected scope.')
Q('A backup captures changes since the most recent backup in the sequence, whether that previous backup was full or incremental. Which approach is this?',
 'An incremental backup',['A differential backup','A full backup','A mirror copy'],
 'Incremental backup captures changes since the preceding backup; restoration may require the complete relevant chain.')
Q('A backup captures all changes since the last full backup, even if some were captured yesterday. Which approach is this?',
 'A differential backup',['An incremental backup','A full backup','A continuous replica'],
 'Differential backup accumulates changes since the full baseline, so each one grows until the next full backup.')
Q('Operators use a retained copy to rebuild an isolated service and verify its required data and functionality. What has been performed?',
 'A restoration test',['A backup integrity checksum','A backup job completion check','A replication health check'],
 'A restoration test checks recoverability and function; a checksum or completed job does not show the service can be rebuilt.')
Q('A ransomware incident could reach both production and continuously writable backup storage through the same credentials. Which recovery design feature addresses that shared compromise path?',
 'An offline or immutable backup copy',['A second copy on the same storage array','More frequent snapshots on production','Backups encrypted with the production key'],
 'An isolated copy reduces the chance that the same compromised access can alter all recovery data. Extra copies or snapshots on reachable storage share the same weakness.')
Q('Primary and recovery facilities sit in the same flood zone. Which design feature addresses that correlated physical hazard?',
 'An alternate site in a different hazard area',['A warm site across the street','A UPS and generator at the primary site','A second rack in the same building'],
 'Geographic separation should account for shared hazards and dependencies, not just a different street address.')
Q('A service must continue operating when a single server fails, without waiting for a full rebuild. Which feature addresses immediate capacity continuity?',
 'Redundant servers with automatic failover',['Nightly backups of the server','A cold standby built on demand','An extended hardware support contract'],
 'Redundant live capacity supports continuity after a component failure. Backups and cold standby require a rebuild first.')
Q('A service operates at an alternate site after recovery. Staff need an approved way to return to the normal site without losing new records. Which plan is required?',
 'A documented failback procedure',['A failover runbook','A tabletop exercise','A backup rotation schedule'],
 'Failback planning coordinates return, synchronization and validation after alternate operation. A failover runbook covers moving away, not back.')
Q('Participants check a recovery plan line by line to confirm contact details and responsibilities without introducing an incident scenario. Which activity is this?',
 'A read-through review',['A tabletop exercise','A parallel test','A full interruption test'],
 'A read-through (checklist) review checks the documented plan, contacts and roles. A tabletop or structured walkthrough adds a scenario to discuss.')
Q('Participants discuss decisions and escalation during a simulated outage, without moving live workloads. Which exercise is this?',
 'A tabletop exercise',['A checklist review','A live failover simulation','A full interruption test'],
 'A tabletop uses a scenario to practice coordination and decision-making without executing a live recovery.')
Q('Technicians rebuild an isolated application from retained copies of its data and test its functions. Which exercise is this?',
 'A backup restoration test',['A tabletop exercise','A checklist review','A full interruption test'],
 'A technical restoration exercise verifies the ability to reconstruct and use the service from recovery material without disrupting production.')
Q('Under an approved test plan, a service transfers actual processing to its alternate environment and validates continuity. Which exercise is this?',
 'A live failover test',['A parallel test with no switchover','A tabletop exercise','A structured walkthrough'],
 'Controlled failover tests the operational transition to alternate capacity. A parallel test runs both sites without moving production processing.')
Q('A service has a four-hour RTO and a 30-minute RPO. It is restored in three hours with 20 minutes of lost records. Which assessment is correct?',
 'Both targets are met',['Only the RTO is met','Only the RPO is met','Neither target is met'],
 'Three hours is within four, and 20 minutes is within 30, so both targets are met.')
Q('A billing service has a two-hour RTO and a ten-minute RPO. Recovery takes 90 minutes, but 25 minutes of transactions are lost. Which assessment is correct?',
 'RTO met, RPO missed',['RTO missed, RPO met','RTO and RPO both met','RTO and RPO both missed'],
 'Restoration is within two hours, but data loss exceeds ten minutes.')
Q('A warehouse system has a one-hour RTO and a 15-minute RPO. Recovery takes 80 minutes and loses five minutes of updates. Which assessment is correct?',
 'The time target is missed but the data-loss target is met',['The time target is met but the data-loss target is missed','Both the time and data-loss targets are met','Both the time and data-loss targets are missed'],
 'The 80-minute restoration exceeds the one-hour RTO, while five minutes of loss is within the RPO.')
Q('A booking service has a three-hour RTO and a five-minute RPO. Recovery takes four hours and loses 12 minutes of bookings. Which assessment is correct?',
 'Neither objective is achieved',['Only the recovery time objective is achieved','Only the recovery point objective is achieved','Both objectives are achieved'],
 'Both the restoration interval and the data-loss interval exceed their respective targets.')
assert len(ITEMS)==36
