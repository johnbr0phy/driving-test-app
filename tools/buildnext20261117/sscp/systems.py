"""Original systems and application security scenarios."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('A workstation should run only software allowed by an application policy. Which endpoint control enforces this?',
 'Application allowlisting',['Antivirus signature scanning','Endpoint detection and response','A host-based firewall'],
 'Allowlisting restricts execution to the permitted set. Antivirus blocks known bad files but lets unknown software run.')
Q('A team needs visibility into suspicious process chains and host activity to investigate compromise. Which capability fits?',
 'Endpoint detection and response',['Application allowlisting policy','Full-disk encryption','A host-based firewall'],
 'EDR records process and endpoint activity for detection and investigation.')
Q('An organization wants to limit disclosure from a stolen, powered-off laptop. Which endpoint safeguard addresses this?',
 'Full-disk encryption',['File-level access permissions','A host-based firewall','A firmware password'],
 'Full-disk encryption protects stored data under the stated key and device condition. File permissions can be bypassed by reading the drive in another machine.')
Q('A laptop must reject unsolicited inbound connections even outside the corporate network. Which local control does this?',
 'A host-based firewall',['Full-disk encryption','Application allowlisting','An on-demand VPN client'],
 'A host firewall applies network policy at the endpoint, including away from the enterprise perimeter.')
Q('An apparent document utility secretly performs unauthorized actions once installed. Which malware type is this?',
 'A Trojan',['A worm','A virus','Adware'],
 'A Trojan disguises malicious behavior within an apparently useful or legitimate program.')
Q('A malicious program spreads between vulnerable systems on its own, without a host file. Which malware type is this?',
 'A worm',['A virus','A Trojan','A logic bomb'],
 'A worm self-propagates between systems. A virus needs a host file to spread.')
Q('A program makes business files inaccessible and demands payment for recovery. Which malware type is this?',
 'Ransomware',['Spyware','A rootkit','A wiper'],
 'Ransomware uses encryption or other denial of access for extortion; payment does not guarantee recovery. A wiper destroys data without offering recovery.')
Q('An unauthorized program silently records browsing and activity for an outside party. Which malware type is this?',
 'Spyware',['Adware','A rootkit','Ransomware'],
 'Spyware covertly collects information about users or their activity. Adware displays unwanted advertising.')
Q('A convincing email urgently asks to change a supplier\'s payment account. What validates the request first?',
 'Call the supplier on a number from existing records',['Reply to the email to confirm the change','Call the number in the email\'s signature','Check that the sender\'s domain looks right'],
 'Use a previously established independent contact method rather than contact details supplied in the unverified request. A lookalike domain can pass a quick check.')
Q('An employee gets a suspected phishing message, has not interacted with it, and must report it. What should they do?',
 'Submit it using the designated report button or mailbox',['Forward the phishing message to colleagues as a warning','Reply to the phishing message asking who sent it','Delete it and tell no one'],
 'Report through the designated channel so the security team can assess and respond. Forwarding spreads the message, and deleting it leaves others exposed.')
Q('A user typed an account password into a confirmed fraudulent page. Which credential action stops further misuse?',
 'Reset the password and revoke active sessions',['Block the fraudulent page and keep the password','Scan the laptop and keep the password','Delete the lure email and keep the password'],
 'Revoke or replace the exposed credential and address active sessions through the response process. Blocking the page does not stop an attacker who already has the password.')
Q('Responders investigating a targeted impersonation need its original headers and content. Which handling action helps?',
 'Export the original message file intact',['Send the responders a screenshot of it','Delete it so nobody else clicks it','Paste its text into a new email to them'],
 'Preserve the message evidence using the approved process. A screenshot or pasted text loses the headers responders need.')
Q('An organization must enforce phone configuration, inventory and compliance on all enrolled handsets. Which capability fits?',
 'Mobile device management (MDM)',['Mobile application management (MAM)','A remote wipe service','Network access control'],
 'Mobile device management governs device-level configuration and compliance. MAM manages only business apps and their data.')
Q('A company must control only its business apps and data on staff-owned phones. Which capability fits?',
 'Mobile application management (MAM)',['Mobile device management (MDM)','A full-device remote wipe','A mobile VPN profile'],
 'Mobile application management applies policy at the application and business-data level without managing the whole device.')
Q('A bring-your-own-device program must keep work documents apart from personal photos and messages. Which principle applies?',
 'Containerization of work data',['Full-device encryption','A full-device wipe policy','A mobile VPN profile'],
 'A managed container separates work and personal data with clear policy. Full-device encryption protects both together but does not separate them.')
Q('A managed phone with sensitive work data is lost, and policy allows removing that data remotely. Which capability is needed?',
 'A remote wipe command',['Remote location tracking','A remote lock with a new PIN','A carrier SIM block'],
 'An authorized remote wipe removes the designated data when the device is reachable; it is not a guarantee that an offline device was wiped. Locking or tracking leaves the data on the phone.')
Q('A provider supplies VMs and storage; the customer manages the guest OS and applications. Which service model is this?',
 'Infrastructure as a Service',['Platform as a Service','Software as a Service','Function as a Service'],
 'IaaS supplies infrastructure while leaving guest operating systems and applications under customer management.')
Q('A provider manages the OS and runtime; the customer deploys its own application. Which service model is this?',
 'Platform as a Service',['Infrastructure as a Service','Software as a Service','On-premises hosting'],
 'PaaS provides a managed application platform while the customer controls its deployed application.')
Q('Employees use a provider-run business application in a browser and set permitted options. Which service model is this?',
 'Software as a Service',['Platform as a Service','Infrastructure as a Service','Desktop as a Service'],
 'SaaS provides the application itself, with limited customer configuration rather than management of the underlying stack.')
Q('An organization runs its own servers, operating systems and application in its own facility. Which arrangement is this?',
 'On-premises hosting',['Private cloud IaaS from a provider','Colocation in a provider\'s data center','Software as a Service'],
 'This is customer-managed on-premises hosting. Colocation places owned servers in someone else\'s facility.')
Q('A cloud is provisioned for the exclusive use of one organization with several business units. Which model fits?',
 'Private cloud',['Community cloud','Hybrid cloud','Public cloud'],
 'A private cloud is for exclusive organizational use and can be operated on or off premises.')
Q('A provider offers cloud services that anyone may sign up for and use. Which deployment model fits?',
 'Public cloud',['Private cloud','Community cloud','Multi-cloud'],
 'A public cloud is provisioned for open use by the general public, subject to service agreements.')
Q('Several organizations with shared compliance needs use a cloud provisioned only for that group. Which model fits?',
 'Community cloud',['Private cloud','Hybrid cloud','Multi-tenant SaaS'],
 'A community cloud serves a defined group of organizations with shared concerns.')
Q('Separate private and public clouds are linked by technology allowing data and app portability. Which model fits?',
 'Hybrid cloud',['Multi-cloud','Community cloud','Private cloud'],
 'A hybrid cloud combines distinct cloud infrastructures bound by portability technology. Multi-cloud means using several providers, not necessarily bound together.')
Q('An IaaS contract makes the customer maintain the guest OS, and a security update is due. What must the customer do?',
 'Apply the update to the guest OS itself',['Wait for the provider to update the guest','Patch the provider\'s hypervisor hosts','Open a ticket asking the provider to update it'],
 'The customer must patch the guest under the stated responsibility model; provider infrastructure maintenance does not replace this duty.')
Q('A SaaS customer has opened a confidential workspace to every employee. Which customer action fixes this?',
 'Limit sharing to the people who need it',['Ask the provider to encrypt the workspace','Enable the provider\'s DDoS protection','Request the provider\'s audit report'],
 'Review and correct tenant permissions. Provider encryption or assurance does not decide the customer\'s own sharing choices.')
Q('Before approving a cloud supplier, an organization needs evidence of its controls and independent assessment scope. Which activity fits?',
 'Review its SOC 2 Type II or ISO 27001 report',['Rely on its marketing security page','Test its platform without its permission','Ask for its list of customer references'],
 'Assess applicable assurance evidence and its scope rather than infer control effectiveness from a marketing claim. Unauthorized testing of a provider is not acceptable.')
Q('A business may leave its cloud service next year and must keep its records usable. Which contract task addresses this?',
 'Agree data export and deletion terms',['Agree a longer initial contract term','Agree a service level credit schedule','Agree a single sign-on integration'],
 'Define exit, data export, retention and disposal requirements before dependence makes migration difficult.')
Q('VMs run under a hypervisor installed directly on hardware, with no host operating system beneath. Which architecture is this?',
 'A type 1 (bare-metal) hypervisor',['A type 2 (hosted) hypervisor','A container runtime','A hardware emulator'],
 'A type 1 hypervisor runs directly on the hardware.')
Q('A desktop virtualization app runs on top of a general-purpose host operating system. Which architecture is this?',
 'A type 2 hypervisor',['A type 1 hypervisor','A container on the host kernel','A hardware emulator'],
 'A type 2 hypervisor is hosted by an operating system.')
Q('Isolated application environments share the host kernel instead of running separate guest kernels. Which architecture is this?',
 'OS-level containers',['Type 1 hypervisor guests','Type 2 hypervisor guests','Hardware partitions'],
 'Containers share the host kernel, making host isolation and hardening important. Hypervisor guests each run their own kernel.')
Q('An administrator saves a VM\'s state at a point in time for short-term rollback. What is created?',
 'A VM snapshot',['A golden image template','A live migration','A VM export to OVF'],
 'A snapshot records a point-in-time state. It should not automatically be treated as an independent protected backup.')
Q('One admin console can change every VM in a cluster. Which security focus addresses its concentrated privilege?',
 'Hardening the management plane',['Patching the guest operating systems','Encrypting each virtual disk','Adding more hosts to the cluster'],
 'Protect the management plane with restricted access, strong authentication, monitoring and approved changes. Guest patching does not limit the console.')
Q('A sensitive guest has unneeded shared folders and device passthrough to its host. Which hardening change fits?',
 'Disable the unneeded integration features',['Encrypt the shared folders','Snapshot the guest before any change','Migrate the guest to another host'],
 'Remove unnecessary host integration to reduce exposure while preserving required functionality. Encryption leaves the paths open.')
Q('A team wants to deploy a virtual appliance from an unverified mirror. Which check is needed first?',
 'Verify it against the vendor\'s published hash',['Scan it with antivirus before import','Import it into an isolated network first','Check the mirror site\'s TLS certificate'],
 'Validate provenance and integrity through the authorized source. A valid TLS certificate only proves the mirror\'s name, not that the file is genuine.')
Q('A cluster holds unused, unowned test guests with old credentials. Which lifecycle action reduces this exposure?',
 'Decommission the unowned guests',['Snapshot them for possible later use','Rotate their passwords and keep them','Move them to a separate test cluster'],
 'Identify ownership and retire abandoned guests through the approved process, including retained data handling.')
Q('An application mixes user-supplied values into database query text. Which change separates values from query structure?',
 'Prepared statements with bound parameters',['Escaping quotes in the user input','Client-side input validation','Stored procedures built with dynamic SQL'],
 'Parameterized queries keep supplied values distinct from the command structure. Escaping and client-side checks can be bypassed.')
Q('A web page shows untrusted text in HTML. Which protection makes it render as data, not markup?',
 'Context-aware output encoding',['Parameterized database queries','Server-side input length limits','Serving the page over HTTPS'],
 'Encoding untrusted content for its HTML context prevents it being interpreted as executable markup. Length limits and HTTPS do not stop cross-site scripting.')
Q('A signed-in user edits a record ID and gets another customer\'s private record. Which server check is missing?',
 'An object-level authorization check',['Stronger session tokens','Encrypted record identifiers','Rate limiting of record requests'],
 'The service must authorize access to the requested object for the current user, not merely verify that someone is signed in. Hiding identifiers does not replace the check.')
Q('An application imports an outdated library with a known flaw. Which lifecycle activity addresses this?',
 'Dependency scanning and upgrading the component',['Pinning the library to its current version','Adding a web application firewall rule','Obfuscating the application code'],
 'Track and evaluate dependencies, then update or otherwise mitigate the affected component. Pinning keeps the flawed version.')
assert len(ITEMS)==40
