"""Original systems and application security scenarios."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('A workstation should execute only software permitted by an established application policy. Which endpoint control most directly enforces that execution boundary?',
 'Application allowlisting',['Antivirus signature scanning','Endpoint detection and response','A host-based firewall'],
 'Allowlisting restricts execution to the permitted set. Antivirus blocks known bad files but lets unknown software run.')
Q('A team needs visibility into suspicious process chains and related host activity to investigate possible compromise. Which capability directly supplies that telemetry?',
 'Endpoint detection and response',['Application allowlisting policy','Full-disk encryption','A host-based firewall'],
 'EDR records process and endpoint activity for detection and investigation.')
Q('An organization wants to reduce disclosure from a stolen, powered-off laptop whose decryption key is unavailable to the thief. Which endpoint safeguard directly addresses this?',
 'Full-disk encryption',['File-level access permissions','A host-based firewall','A firmware password'],
 'Full-disk encryption protects stored data under the stated key and device condition. File permissions can be bypassed by reading the drive in another machine.')
Q('A laptop must reject unsolicited inbound connections even when it is used outside the corporate perimeter. Which local control enforces that network rule?',
 'A host-based firewall',['Full-disk encryption','Application allowlisting','An on-demand VPN client'],
 'A host firewall applies network policy at the endpoint, including away from the enterprise perimeter.')
Q('An employee installs an apparent document utility that secretly performs unauthorized actions. Which malware type is illustrated?',
 'A Trojan',['A worm','A virus','Adware'],
 'A Trojan disguises malicious behavior within an apparently useful or legitimate program.')
Q('A malicious program automatically spreads between vulnerable systems without needing a user to attach it to a separate host file. Which malware type is illustrated?',
 'A worm',['A virus','A Trojan','A logic bomb'],
 'A worm self-propagates between systems. A virus needs a host file to spread.')
Q('A malicious program makes business files inaccessible and demands payment for recovery. Which malware type is illustrated?',
 'Ransomware',['Spyware','A rootkit','A wiper'],
 'Ransomware uses encryption or other denial of access for extortion; payment does not guarantee recovery. A wiper destroys data without offering recovery.')
Q('An unauthorized program silently records browsing and user activity for an outside party. Which malware type is illustrated?',
 'Spyware',['Adware','A rootkit','Ransomware'],
 'Spyware covertly collects information about users or their activity. Adware displays unwanted advertising.')
Q('A convincing email requests an urgent change to a supplier\'s payment account. Before authorizing any change, what action directly validates the request?',
 'Call the supplier on a number from existing records',['Reply to the email to confirm the change','Call the number in the email\'s signature','Check that the sender\'s domain looks right'],
 'Use a previously established independent contact method rather than contact details supplied in the unverified request. A lookalike domain can pass a quick check.')
Q('An employee receives a suspected phishing message, has not interacted with it and is instructed to use the organization\'s reporting mechanism. What should the employee do?',
 'Submit it using the designated report button or mailbox',['Forward the phishing message to colleagues as a warning','Reply to the phishing message asking who sent it','Delete it and tell no one'],
 'Report through the designated channel so the security team can assess and respond. Forwarding spreads the message, and deleting it leaves others exposed.')
Q('A user entered an account password into a confirmed fraudulent page. The account owner is coordinating with responders. Which credential action addresses continued misuse?',
 'Reset the password and revoke active sessions',['Block the fraudulent page and keep the password','Scan the laptop and keep the password','Delete the lure email and keep the password'],
 'Revoke or replace the exposed credential and address active sessions through the response process. Blocking the page does not stop an attacker who already has the password.')
Q('Responders are investigating a targeted impersonation attempt and need its original headers and content. Which handling action supports their analysis?',
 'Export the original message file intact',['Send the responders a screenshot of it','Delete it so nobody else clicks it','Paste its text into a new email to them'],
 'Preserve the message evidence using the approved process. A screenshot or pasted text loses the headers responders need.')
Q('An organization needs to enforce phone configuration, inventory and compliance requirements across all enrolled handsets. Which capability fits?',
 'Mobile device management (MDM)',['Mobile application management (MAM)','A remote wipe service','Network access control'],
 'Mobile device management governs device-level configuration and compliance. MAM manages only business apps and their data.')
Q('A company needs controls focused on its business applications and their data on permitted mobile devices. Which capability fits?',
 'Mobile application management (MAM)',['Mobile device management (MDM)','A full-device remote wipe','A mobile VPN profile'],
 'Mobile application management applies policy at the application and business-data level without managing the whole device.')
Q('A bring-your-own-device program must keep organizational documents distinct from the owner\'s personal photos and messages. Which design principle addresses this boundary?',
 'Containerization of work data',['Full-device encryption','A full-device wipe policy','A mobile VPN profile'],
 'A managed container separates work and personal data with clear policy. Full-device encryption protects both together but does not separate them.')
Q('A managed phone containing sensitive work data is lost. Policy and authorization specify removing protected data remotely when the device reconnects. Which response capability is needed?',
 'A remote wipe command',['Remote location tracking','A remote lock with a new PIN','A carrier SIM block'],
 'An authorized remote wipe removes the designated data when the device is reachable; it is not a guarantee that an offline device was wiped. Locking or tracking leaves the data on the phone.')
Q('A provider supplies virtual machines and storage while the customer manages the guest operating system and applications. Which service model is this?',
 'Infrastructure as a Service',['Platform as a Service','Software as a Service','Function as a Service'],
 'IaaS supplies infrastructure while leaving guest operating systems and applications under customer management.')
Q('A provider manages the operating system and runtime, while the customer deploys its own application into that supported environment. Which service model is this?',
 'Platform as a Service',['Infrastructure as a Service','Software as a Service','On-premises hosting'],
 'PaaS provides a managed application platform while the customer controls its deployed application.')
Q('Employees use a provider-operated business application through a browser and configure permitted user settings. Which service model is this?',
 'Software as a Service',['Platform as a Service','Infrastructure as a Service','Desktop as a Service'],
 'SaaS provides the application itself, with limited customer configuration rather than management of the underlying stack.')
Q('An organization owns and operates the physical servers, operating systems and application in its own facility. No external cloud service is involved. Which hosting arrangement is described?',
 'On-premises hosting',['Private cloud IaaS from a provider','Colocation in a provider\'s data center','Software as a Service'],
 'This is customer-managed on-premises hosting. Colocation places owned servers in someone else\'s facility.')
Q('A cloud environment is provisioned for the exclusive use of one organization with multiple business units. Which deployment model fits?',
 'Private cloud',['Community cloud','Hybrid cloud','Public cloud'],
 'A private cloud is for exclusive organizational use and can be operated on or off premises.')
Q('A provider offers cloud services that anyone may sign up for and use. Which deployment model fits?',
 'Public cloud',['Private cloud','Community cloud','Multi-cloud'],
 'A public cloud is provisioned for open use by the general public, subject to service agreements.')
Q('Several organizations with shared compliance concerns use a cloud provisioned exclusively for that defined group. Which deployment model fits?',
 'Community cloud',['Private cloud','Hybrid cloud','Multi-tenant SaaS'],
 'A community cloud serves a defined group of organizations with shared concerns.')
Q('Distinct private and public cloud environments remain separate but are connected by technology enabling data and application portability. Which deployment model fits?',
 'Hybrid cloud',['Multi-cloud','Community cloud','Private cloud'],
 'A hybrid cloud combines distinct cloud infrastructures bound by portability technology. Multi-cloud means using several providers, not necessarily bound together.')
Q('An IaaS contract assigns guest operating-system maintenance to the customer. A guest security update is due. Which responsibility must the customer perform?',
 'Apply the update to the guest OS itself',['Wait for the provider to update the guest','Patch the provider\'s hypervisor hosts','Open a ticket asking the provider to update it'],
 'The customer must patch the guest under the stated responsibility model; provider infrastructure maintenance does not replace this duty.')
Q('A SaaS provider protects its infrastructure, but the customer has made a confidential workspace accessible to every employee. Which customer action addresses the identified issue?',
 'Limit sharing to the people who need it',['Ask the provider to encrypt the workspace','Enable the provider\'s DDoS protection','Request the provider\'s audit report'],
 'Review and correct tenant permissions. Provider encryption or assurance does not decide the customer\'s own sharing choices.')
Q('Before approving a cloud supplier, an organization needs evidence about the supplier\'s relevant controls and the scope of independent assessments. Which activity fits?',
 'Review its SOC 2 Type II or ISO 27001 report',['Rely on its marketing security page','Test its platform without its permission','Ask for its list of customer references'],
 'Assess applicable assurance evidence and its scope rather than infer control effectiveness from a marketing claim. Unauthorized testing of a provider is not acceptable.')
Q('A business may leave its current cloud service next year and must preserve access to its records in a usable form. Which contractual planning task addresses this?',
 'Agree data export and deletion terms',['Agree a longer initial contract term','Agree a service level credit schedule','Agree a single sign-on integration'],
 'Define exit, data export, retention and disposal requirements before dependence makes migration difficult.')
Q('Virtual machines run under a hypervisor installed directly on the hardware without a general-purpose host operating system beneath it. Which architecture is this?',
 'A type 1 (bare-metal) hypervisor',['A type 2 (hosted) hypervisor','A container runtime','A hardware emulator'],
 'A type 1 hypervisor runs directly on the hardware.')
Q('A desktop virtualization application runs on top of an existing general-purpose host operating system. Which architecture is this?',
 'A type 2 hypervisor',['A type 1 hypervisor','A container on the host kernel','A hardware emulator'],
 'A type 2 hypervisor is hosted by an operating system.')
Q('Several isolated application environments share the host kernel rather than each running a separate guest kernel. Which architecture is this?',
 'OS-level containers',['Type 1 hypervisor guests','Type 2 hypervisor guests','Hardware partitions'],
 'Containers share the host kernel, making host isolation and hardening important. Hypervisor guests each run their own kernel.')
Q('An administrator records a virtual machine\'s state at a particular point for a controlled short-term rollback. Which artifact is created?',
 'A VM snapshot',['A golden image template','A live migration','A VM export to OVF'],
 'A snapshot records a point-in-time state. It should not automatically be treated as an independent protected backup.')
Q('One administrative console can change every virtual machine in a cluster. Which security focus addresses the concentrated privilege of that console?',
 'Hardening the management plane',['Patching the guest operating systems','Encrypting each virtual disk','Adding more hosts to the cluster'],
 'Protect the management plane with restricted access, strong authentication, monitoring and approved changes. Guest patching does not limit the console.')
Q('A sensitive guest has unneeded shared folders and device passthrough links to its host. Which hardening change reduces those extra interaction paths?',
 'Disable the unneeded integration features',['Encrypt the shared folders','Snapshot the guest before any change','Migrate the guest to another host'],
 'Remove unnecessary host integration to reduce exposure while preserving required functionality. Encryption leaves the paths open.')
Q('A team wants to deploy a virtual appliance downloaded from an unverified mirror. Which supply-chain check is needed before trusting it?',
 'Verify it against the vendor\'s published hash',['Scan it with antivirus before import','Import it into an isolated network first','Check the mirror site\'s TLS certificate'],
 'Validate provenance and integrity through the authorized source. A valid TLS certificate only proves the mirror\'s name, not that the file is genuine.')
Q('A cluster contains unused test guests with old credentials and no owner. Which lifecycle action reduces this unmanaged exposure?',
 'Decommission the unowned guests',['Snapshot them for possible later use','Rotate their passwords and keep them','Move them to a separate test cluster'],
 'Identify ownership and retire abandoned guests through the approved process, including retained data handling.')
Q('An application builds database commands by mixing user-supplied values into executable query text. Which development change separates values from query structure?',
 'Prepared statements with bound parameters',['Escaping quotes in the user input','Client-side input validation','Stored procedures built with dynamic SQL'],
 'Parameterized queries keep supplied values distinct from the command structure. Escaping and client-side checks can be bypassed.')
Q('A web page displays untrusted text within HTML. Which protection ensures the text is rendered as data rather than markup?',
 'Context-aware output encoding',['Parameterized database queries','Server-side input length limits','Serving the page over HTTPS'],
 'Encoding untrusted content for its HTML context prevents it being interpreted as executable markup. Length limits and HTTPS do not stop cross-site scripting.')
Q('A signed-in user changes a record identifier and receives another customer\'s private record. Which server-side check is missing?',
 'An object-level authorization check',['Stronger session tokens','Encrypted record identifiers','Rate limiting of record requests'],
 'The service must authorize access to the requested object for the current user, not merely verify that someone is signed in. Hiding identifiers does not replace the check.')
Q('An application imports an outdated library with a known security flaw. Which lifecycle activity directly addresses this component exposure?',
 'Dependency scanning and upgrading the component',['Pinning the library to its current version','Adding a web application firewall rule','Obfuscating the application code'],
 'Track and evaluate dependencies, then update or otherwise mitigate the affected component. Pinning keeps the flawed version.')
assert len(ITEMS)==40
