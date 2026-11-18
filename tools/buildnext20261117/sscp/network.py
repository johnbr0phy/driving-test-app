"""Original network and communications security scenarios."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('A device chooses the next hop toward a destination IP subnet. Which type of decision is being made?',
 'Layer 3 (network) routing',['Layer 2 (data link) switching','Layer 4 (transport) port filtering','Layer 7 (application) inspection'],
 'Routing toward an IP destination is a network-layer function.')
Q('A rule permits TCP destination port 443 while denying TCP destination port 23. Which type of check is this?',
 'A transport-layer (Layer 4) filter',['A network-layer (Layer 3) route','An application-layer (Layer 7) inspection','A data-link-layer (Layer 2) filter'],
 'TCP ports are transport-layer identifiers. A port number alone does not prove the application content is safe.')
Q('A gateway examines the structure of an HTTP request before deciding whether to allow it. Which type of check is this?',
 'Application-layer inspection',['Transport-layer port filtering','Network-layer address filtering','Link-layer MAC filtering'],
 'HTTP request semantics are application-layer information rather than merely a port or IP address.')
Q('Within an Ethernet segment, a bridge uses a destination MAC address to select a forwarding interface. Which type of decision is this?',
 'Layer 2 switching',['Layer 3 routing','Layer 4 filtering','Layer 1 signal repeating'],
 'MAC-based Ethernet forwarding is a data-link-layer function.')
Q('A perimeter device tracks established connection state and uses it when evaluating return traffic. Which control is described?',
 'A stateful firewall',['A stateless packet filter','A web application firewall','A network intrusion detection sensor'],
 'A stateful firewall evaluates traffic in the context of tracked connections. A stateless filter judges each packet on its own.')
Q('A team needs a control focused on suspicious HTTP request patterns directed at a public web application. Which control is designed for that role?',
 'A web application firewall',['A stateful network firewall','A network intrusion detection sensor','An application-aware forward proxy'],
 'A web application firewall focuses on traffic to web applications. It supplements rather than replaces secure application code. A forward proxy serves outbound users.')
Q('A sensor receives mirrored traffic and generates alerts, but is not in the forwarding path and cannot directly drop those packets. Which control is described?',
 'A network intrusion detection system',['A network intrusion prevention system','A stateful firewall','A network access control appliance'],
 'A passive detection sensor observes and alerts. An intrusion prevention system sits inline so it can block.')
Q('A joining endpoint is evaluated against device and identity policy before receiving the appropriate network access. Which control is described?',
 '802.1X with NAC posture checks',['A stateful firewall','A network intrusion detection sensor','A VPN concentrator'],
 'Network access control evaluates admission or placement according to the organization\'s access policy.')
Q('Visitor laptops currently share the same unrestricted network as internal workstations. Which design change first establishes distinct access zones for those populations?',
 'A separate guest VLAN or SSID',['WPA3 encryption on the shared network','MAC filtering of the visitor laptops','A longer passphrase for the shared Wi-Fi'],
 'Separate guests into an appropriately controlled zone rather than treating visitors as internal peers. Encryption and passphrases do not separate them.')
Q('Two VLANs exist, but the router permits all traffic between them. Which change makes their security boundary enforce the intended permitted flows?',
 'ACLs allowing only the required flows',['A third VLAN for the servers','New VLAN ID numbers on both segments','Port security on the access switches'],
 'Enforce inter-segment policy at the routing or filtering boundary. VLAN separation alone does not restrict routed traffic.')
Q('A network appliance exposes its administrative service to all user subnets. Which change reduces the unnecessary administrative exposure?',
 'Allow management only from an admin network',['Move the admin service to a different port','Rename the default admin account','Display a legal warning banner at login'],
 'Restrict and protect management access using approved administrative paths and authentication. A different port is still reachable from every subnet.')
Q('A detection sensor monitors internet ingress, but the suspicious traffic moves only between internal server segments. Which placement change improves visibility for this case?',
 'Add a tap where that east-west traffic flows',['Raise the internet sensor\'s sensitivity','Add more signatures to the internet sensor','Move the internet sensor into the DMZ'],
 'Observe the path carrying the relevant internal traffic; a sensor cannot inspect traffic that never reaches it, however it is tuned.')
Q('Two office gateways maintain a protected tunnel carrying traffic between their private networks. Which access pattern is this?',
 'A site-to-site VPN',['A remote-access VPN','A reverse proxy','A virtual desktop service'],
 'A site-to-site VPN connects networks through their gateways.')
Q('An employee\'s managed laptop establishes an authenticated tunnel into the organization while away from the office. Which pattern is this?',
 'A remote-access VPN',['A site-to-site VPN','A jump server','A reverse proxy'],
 'A remote-access VPN connects an individual remote endpoint to permitted organizational resources.')
Q('A user interacts with a centrally hosted desktop session while applications and working data remain in that hosted environment. Which access pattern is this?',
 'A VDI service',['A remote-access VPN','A site-to-site VPN','Split-tunnel VPN access'],
 'Virtual desktop access presents a remote desktop session; controls are still needed for permitted data transfers.')
Q('External users reach one published web application through a gateway that forwards requests to its backend, without joining the internal network. Which access pattern is this?',
 'A reverse proxy',['A forward proxy','A remote-access VPN','A site-to-site VPN'],
 'A reverse proxy fronts the published application rather than granting general network membership. A forward proxy serves internal users going out.')
Q('A managed Wi-Fi client must avoid accepting an impersonated enterprise authentication server during its configured EAP method. Which check addresses this risk?',
 'Validate the RADIUS server\'s certificate',['Accept any certificate the network presents','Hide the network SSID','Enable MAC address filtering'],
 'Correct server-certificate validation helps prevent trusting an impersonated authentication service.')
Q('An organization needs to revoke one employee\'s Wi-Fi access without changing a shared secret for everyone. Which identity design supports that need?',
 'WPA3-Enterprise with 802.1X',['WPA3-Personal with a shared passphrase','MAC address filtering','A hidden SSID'],
 'Individual enterprise credentials allow per-user lifecycle and revocation rather than reliance on one shared passphrase.')
Q('A public Wi-Fi service should prevent visitors from directly reaching other guests\' devices. Which network behavior should be configured?',
 'Client (peer-to-peer) isolation',['A hidden network SSID','WPA3-Personal encryption','Band steering between radios'],
 'Client isolation limits direct guest-to-guest reachability where supported and correctly configured. Encryption protects the air link, not device-to-device reachability.')
Q('An access point cannot receive security fixes and cannot meet the organization\'s required wireless protection. Which lifecycle response addresses the persistent limitation?',
 'Replace it with supported hardware',['Enable WPA3 through configuration','Hide the network name','Lower the radio transmit power'],
 'Replace or retire unsupported equipment under the approved plan rather than assume configuration can add unavailable capabilities.')
Q('Thousands of hosts flood a public website so legitimate clients cannot obtain responses. Which threat pattern is described?',
 'Distributed denial of service',['DNS cache poisoning','On-path interception of traffic','ARP spoofing'],
 'Distributed denial of service targets availability through traffic or resource exhaustion from multiple sources.')
Q('On shared hotel Wi-Fi, an attacker relays a guest\'s traffic through their own laptop and changes data in transit. Which threat pattern is described?',
 'An on-path (man-in-the-middle) attack',['A distributed denial of service','A replay of captured traffic','Port scanning'],
 'An on-path adversary can intercept traffic; authenticated protected channels help address this threat.')
Q('A resolver stores a forged name-to-address result and subsequently directs users to the wrong destination. Which threat pattern is described?',
 'DNS cache poisoning',['ARP spoofing','Domain typosquatting','DNS amplification'],
 'DNS cache poisoning introduces false resolution data into a resolver\'s cache. Typosquatting relies on users mistyping a name instead.')
Q('A visitor plugs a personal laptop into a meeting room wall jack and receives an address on the internal network meant only for managed devices. Which threat pattern is described?',
 'A rogue endpoint on a wired port',['An evil twin access point','VLAN hopping through a trunk port','MAC flooding of the switch'],
 'The issue is unauthorized network attachment, which admission and port controls can help address.')
Q('A volumetric attack saturates the organization\'s internet circuit before local equipment can process traffic. Which measure addresses the bottleneck at a useful location?',
 'Upstream scrubbing by the ISP',['A larger on-premises firewall','Rate limiting on the web server','Faster ports on the local switch'],
 'Upstream filtering can reduce attack traffic before it consumes the constrained link. Anything on premises sits behind the saturated circuit.')
Q('A client communicates across an untrusted network and must detect peer impersonation and message modification. Which control directly protects the exchange?',
 'A mutually authenticated TLS channel',['A private VLAN on the client side','An unkeyed hash of each message','A hidden wireless SSID'],
 'An authenticated protected channel provides peer validation and integrity when configured correctly. An attacker can recompute an unkeyed hash.')
Q('A validating resolver must detect forged signed DNS data using a configured chain of trust. Which mechanism supplies this validation?',
 'DNSSEC',['DNS over HTTPS','Split-horizon DNS','DNS response rate limiting'],
 'DNSSEC validates signed DNS data using trust relationships; it does not encrypt ordinary DNS queries. DNS over HTTPS encrypts queries but does not validate the data.')
Q('Only approved devices should obtain normal access through enterprise network ports. Which mechanism enforces that joining condition?',
 '802.1X port-based authentication',['Storm control on access ports','DHCP snooping','Spanning tree root guard'],
 'Port-based admission can evaluate identity and device policy before granting access. The other features protect switch operation, not admission.')
Q('A building sensor needs to report only to one management service but can currently contact every internal subnet. Which change reduces unnecessary reachability?',
 'Firewall it to reach only that service',['Change its default admin password','Upgrade it to the latest firmware','Move it to the guest Wi-Fi'],
 'Restrict its network paths to the required communications and manage exceptions explicitly. The other steps leave every subnet reachable.')
Q('A device administrator receives a firmware image through an unverified message. What must be established before installing it?',
 'That the vendor\'s signature or hash matches',['That an antivirus scan finds nothing','That a maintenance window is booked','That the current configuration is backed up'],
 'Verify the authorized source and integrity through the vendor\'s supported validation process. A clean antivirus scan does not prove the image is genuine.')
Q('A newly installed device still uses the manufacturer\'s widely known initial login. Which provisioning action addresses this immediate credential weakness?',
 'Change the default credentials before use',['Disable the device\'s web interface','Apply the latest firmware first','Add the device to the asset inventory'],
 'Replace default credentials and establish the approved identity configuration before normal operation.')
Q('A vendor announces that security maintenance for a deployed sensor will end next year. Which lifecycle activity should begin?',
 'Plan its replacement and interim controls',['Keep it running with no changes','Buy spare units of the same model','Remove it from monitoring'],
 'Plan a supported replacement or approved retirement and manage exposure during the transition.')
Q('A firewall exception remains active, but no team can explain its purpose or accept responsibility for it. Which governance information is missing?',
 'A named owner and business justification',['The rule\'s hit count','The rule\'s position in the policy','The rule\'s creation timestamp'],
 'An accountable owner and justified purpose are needed to review whether the exception remains appropriate. Technical details do not explain why it exists.')
Q('A specific deny rule never takes effect because an earlier broad allow rule matches first in a first-match policy. What must be examined?',
 'The sequence of rules in the policy',['The deny rule\'s logging setting','The default deny at the end','The rule\'s object group names'],
 'Rule order determines which matching action is applied in a first-match policy.')
Q('A proposed firewall change has been approved, but the team needs evidence that the required application still works and prohibited paths remain blocked. Which activity supplies that evidence?',
 'Testing allowed and denied flows',['A configuration syntax check','Peer review of the rule text','Comparing rule counts before and after'],
 'Test representative permitted and denied flows rather than relying only on a syntactically valid configuration.')
Q('A temporary partner connection was authorized only until a project ended yesterday, and no extension is approved. Which lifecycle action follows?',
 'Remove or disable the partner rule',['Leave it until the annual audit','Log its traffic for another month','Ask the partner to stop using it'],
 'Remove or disable the expired exception through the authorized process so temporary access does not become permanent.')
Q('A router\'s administration currently uses an unprotected remote session. Which management-plane improvement protects the administrator\'s exchange?',
 'Use SSH from a restricted admin subnet',['Change the router\'s enable password','Add a legal banner to the login','Move Telnet to a non-standard port'],
 'Use authenticated encrypted administration, such as properly configured SSH, and restrict its reachability. Telnet on any port still sends traffic in clear text.')
Q('Network device events cannot be accurately correlated because their timestamps differ substantially. Which operational control addresses this?',
 'NTP time synchronization',['Syslog forwarding','SNMP polling','Larger local log buffers'],
 'Maintain time synchronization and record time-zone information for useful correlation. Forwarding logs does not fix wrong clocks.')
Q('A failed appliance may take its locally stored event history with it. Which logging design reduces dependence on that single local store?',
 'Forward events to a central syslog or SIEM',['Increase the local log buffer','Write logs to a USB drive on the device','Enable debug logging on the device'],
 'Forward relevant events to a protected central collection service. Anything kept on or in the device can be lost with it.')
Q('A replacement appliance must be rebuilt after hardware failure. Which maintained artifact helps restore the intended policy?',
 'A backup of the known-good configuration',['The device\'s original factory configuration','The vendor\'s hardening guide','The last syslog export'],
 'A protected backup of the approved configuration supports controlled reconstruction and validation.')
assert len(ITEMS)==40
