"""Original network and communications security scenarios."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('A device chooses the next hop toward a destination IP subnet. Which decision is this?',
 'Layer 3 (network) routing',['Layer 2 (data link) switching','Layer 4 (transport) port filtering','Layer 7 (application) inspection'],
 'Routing toward an IP destination is a network-layer function.')
Q('A rule permits TCP port 443 and denies TCP port 23. Which type of check is this?',
 'Transport-layer (Layer 4) filter',['Network-layer (Layer 3) route','Application-layer (Layer 7) inspection','Data-link-layer (Layer 2) filter'],
 'TCP ports are transport-layer identifiers. A port number alone does not prove the application content is safe.')
Q('A gateway examines the structure of an HTTP request before allowing it. Which type of check is this?',
 'Application-layer inspection',['Transport-layer port filtering','Network-layer address filtering','Link-layer MAC filtering'],
 'HTTP request semantics are application-layer information rather than merely a port or IP address.')
Q('A bridge uses a destination MAC address to choose a forwarding interface. Which decision is this?',
 'Layer 2 switching',['Layer 3 routing','Layer 4 filtering','Layer 1 signal repeating'],
 'MAC-based Ethernet forwarding is a data-link-layer function.')
Q('A perimeter device tracks connection state and uses it to judge return traffic. Which control is this?',
 'Stateful firewall',['Stateless packet filter','Web application firewall','Network intrusion detection sensor'],
 'A stateful firewall evaluates traffic in the context of tracked connections. A stateless filter judges each packet on its own.')
Q('A team needs a control for suspicious HTTP request patterns aimed at a public web application. Which control fits?',
 'Web application firewall',['Stateful network firewall','Network intrusion detection sensor','Application-aware forward proxy'],
 'A web application firewall focuses on traffic to web applications. It supplements rather than replaces secure application code. A forward proxy serves outbound users.')
Q('A sensor gets mirrored traffic and raises alerts but sits outside the forwarding path and cannot drop packets. Which control is this?',
 'Network intrusion detection system',['Network intrusion prevention system','Stateful firewall','Network access control appliance'],
 'A passive detection sensor observes and alerts. An intrusion prevention system sits inline so it can block.')
Q('A joining endpoint is checked against device and identity policy before getting network access. Which control is this?',
 '802.1X with NAC posture checks',['Stateful firewall','Network intrusion detection sensor','VPN concentrator'],
 'Network access control evaluates admission or placement according to the organization\'s access policy.')
Q('Visitor laptops share an unrestricted network with internal workstations. Which change first separates them?',
 'Separate guest VLAN or SSID',['WPA3 encryption on the shared network','MAC filtering of the visitor laptops','Longer passphrase for the shared Wi-Fi'],
 'Separate guests into an appropriately controlled zone rather than treating visitors as internal peers. Encryption and passphrases do not separate them.')
Q('Two VLANs exist, but the router passes all traffic between them. Which change makes the separation real?',
 'ACLs allowing only the required flows',['Third VLAN for the servers','New VLAN ID numbers on both segments','Port security on the access switches'],
 'Enforce inter-segment policy at the routing or filtering boundary. VLAN separation alone does not restrict routed traffic.')
Q('An appliance exposes its admin service to all user subnets. Which change reduces this exposure?',
 'Allow management only from an admin network',['Move the admin service to a different port','Rename the default admin account','Display a legal warning banner at login'],
 'Restrict and protect management access using approved administrative paths and authentication. A different port is still reachable from every subnet.')
Q('A sensor watches internet ingress, but suspicious traffic moves only between internal server segments. Which change helps?',
 'Add a tap where that east-west traffic flows',['Raise the internet sensor\'s sensitivity','Add more signatures to the internet sensor','Move the internet sensor into the DMZ'],
 'Observe the path carrying the relevant internal traffic; a sensor cannot inspect traffic that never reaches it, however it is tuned.')
Q('Two office gateways keep a protected tunnel between their private networks. Which pattern is this?',
 'Site-to-site VPN',['Remote-access VPN','Reverse proxy','Virtual desktop service'],
 'A site-to-site VPN connects networks through their gateways.')
Q('A managed laptop opens an authenticated tunnel into the organization from outside the office. Which pattern is this?',
 'Remote-access VPN',['Site-to-site VPN','Jump server','Reverse proxy'],
 'A remote-access VPN connects an individual remote endpoint to permitted organizational resources.')
Q('A user works in a centrally hosted desktop session where apps and data stay hosted. Which pattern is this?',
 'VDI service',['Remote-access VPN','Site-to-site VPN','Split-tunnel VPN access'],
 'Virtual desktop access presents a remote desktop session; controls are still needed for permitted data transfers.')
Q('External users reach one web app through a gateway that forwards to its backend, without joining the network. Which pattern is this?',
 'Reverse proxy',['Forward proxy','Remote-access VPN','Site-to-site VPN'],
 'A reverse proxy fronts the published application rather than granting general network membership. A forward proxy serves internal users going out.')
Q('A Wi-Fi client must not accept an impersonated enterprise authentication server during EAP. Which check addresses this?',
 'Validate the RADIUS server\'s certificate',['Accept any certificate the network presents','Hide the network SSID','Enable MAC address filtering'],
 'Correct server-certificate validation helps prevent trusting an impersonated authentication service.')
Q('An organization must revoke one employee\'s Wi-Fi access without changing a shared secret. Which design supports this?',
 'WPA3-Enterprise with 802.1X',['WPA3-Personal with a shared passphrase','MAC address filtering','Hidden SSID'],
 'Individual enterprise credentials allow per-user lifecycle and revocation rather than reliance on one shared passphrase.')
Q('Public Wi-Fi guests should not reach each other\'s devices directly. Which behavior should be configured?',
 'Client (peer-to-peer) isolation',['Hidden network SSID','WPA3-Personal encryption','Band steering between radios'],
 'Client isolation limits direct guest-to-guest reachability where supported and correctly configured. Encryption protects the air link, not device-to-device reachability.')
Q('An access point gets no security fixes and cannot meet required wireless protection. Which response fits?',
 'Replace it with supported hardware',['Enable WPA3 through configuration','Hide the network name','Lower the radio transmit power'],
 'Replace or retire unsupported equipment under the approved plan rather than assume configuration can add unavailable capabilities.')
Q('Thousands of hosts flood a public website so legitimate clients get no response. Which threat is this?',
 'Distributed denial of service',['DNS cache poisoning','On-path interception of traffic','ARP spoofing'],
 'Distributed denial of service targets availability through traffic or resource exhaustion from multiple sources.')
Q('On hotel Wi-Fi, an attacker relays a guest\'s traffic through their laptop and alters it. Which threat is this?',
 'On-path (man-in-the-middle) attack',['Distributed denial of service','Replay of captured traffic','Port scanning'],
 'An on-path adversary can intercept traffic; authenticated protected channels help address this threat.')
Q('A resolver stores a forged name-to-address result and sends users to the wrong host. Which threat is this?',
 'DNS cache poisoning',['ARP spoofing','Domain typosquatting','DNS amplification'],
 'DNS cache poisoning introduces false resolution data into a resolver\'s cache. Typosquatting relies on users mistyping a name instead.')
Q('A visitor plugs a personal laptop into a wall jack and gets an internal address meant for managed devices. Which threat is this?',
 'Rogue endpoint on a wired port',['Evil twin access point','VLAN hopping through a trunk port','MAC flooding of the switch'],
 'The issue is unauthorized network attachment, which admission and port controls can help address.')
Q('A volumetric attack saturates the internet circuit before local equipment sees the traffic. Which measure helps?',
 'Upstream scrubbing by the ISP',['Larger on-premises firewall','Rate limiting on the web server','Faster ports on the local switch'],
 'Upstream filtering can reduce attack traffic before it consumes the constrained link. Anything on premises sits behind the saturated circuit.')
Q('A client on an untrusted network must detect peer impersonation and message tampering. Which control protects the exchange?',
 'Mutually authenticated TLS channel',['Private VLAN on the client side','Unkeyed hash of each message','Hidden wireless SSID'],
 'An authenticated protected channel provides peer validation and integrity when configured correctly. An attacker can recompute an unkeyed hash.')
Q('A validating resolver must detect forged signed DNS data through a chain of trust. Which mechanism provides this?',
 'DNSSEC',['DNS over HTTPS','Split-horizon DNS','DNS response rate limiting'],
 'DNSSEC validates signed DNS data using trust relationships; it does not encrypt ordinary DNS queries. DNS over HTTPS encrypts queries but does not validate the data.')
Q('Only approved devices should obtain normal access through enterprise network ports. Which mechanism enforces that joining condition?',
 '802.1X port-based authentication',['Storm control on access ports','DHCP snooping','Spanning tree root guard'],
 'Port-based admission can evaluate identity and device policy before granting access. The other features protect switch operation, not admission.')
Q('A building sensor reports to one management application but can contact every internal subnet. Which change fits?',
 'Firewall it to reach only that service',['Change its default admin password','Upgrade it to the latest firmware','Move it to the guest Wi-Fi'],
 'Restrict its network paths to the required communications and manage exceptions explicitly. The other steps leave every subnet reachable.')
Q('An administrator receives a firmware image in an unverified message. What must be established before installing it?',
 'That the vendor\'s signature or hash matches',['That an antivirus scan finds nothing','That a maintenance window is booked','That the current configuration is backed up'],
 'Verify the authorized source and integrity through the vendor\'s supported validation process. A clean antivirus scan does not prove the image is genuine.')
Q('A new device still uses the manufacturer\'s widely known initial login. Which provisioning action addresses this?',
 'Change the default credentials before use',['Disable the device\'s web interface','Apply the latest firmware first','Add the device to the asset inventory'],
 'Replace default credentials and establish the approved identity configuration before normal operation.')
Q('Security maintenance for a deployed sensor ends next year. Which lifecycle activity should begin?',
 'Plan its replacement and interim controls',['Keep it running with no changes','Buy spare units of the same model','Remove it from monitoring'],
 'Plan a supported replacement or approved retirement and manage exposure during the transition.')
Q('Nobody can explain or own an active firewall exception. Which governance information is missing?',
 'Named owner and business justification',['Rule\'s hit count','Rule\'s position in the policy','Rule\'s creation timestamp'],
 'An accountable owner and justified purpose are needed to review whether the exception remains appropriate. Technical details do not explain why it exists.')
Q('In a first-match policy, a deny rule never fires because an earlier broad allow matches first. What must be examined?',
 'Sequence of rules in the policy',['Deny rule\'s logging setting','Default deny at the end','Rule\'s object group names'],
 'Rule order determines which matching action is applied in a first-match policy.')
Q('An approved firewall change needs evidence that the app works and prohibited paths stay blocked. Which activity supplies it?',
 'Testing allowed and denied flows',['Configuration syntax check','Peer review of the rule text','Comparing rule counts before and after'],
 'Test representative permitted and denied flows rather than relying only on a syntactically valid configuration.')
Q('A partner connection was authorized only until a project ended yesterday, with no extension. Which action follows?',
 'Remove or disable the partner rule',['Leave it until the annual audit','Log its traffic for another month','Ask the partner to stop using it'],
 'Remove or disable the expired exception through the authorized process so temporary access does not become permanent.')
Q('A router is administered over an unprotected remote session. Which improvement protects the administrator\'s exchange?',
 'Use SSH from a restricted admin subnet',['Change the router\'s enable password','Add a legal banner to the login','Move Telnet to a non-standard port'],
 'Use authenticated encrypted administration, such as properly configured SSH, and restrict its reachability. Telnet on any port still sends traffic in clear text.')
Q('Device events cannot be correlated because their timestamps differ widely. Which control addresses this?',
 'NTP time synchronization',['Syslog forwarding','SNMP polling','Larger local log buffers'],
 'Maintain time synchronization and record time-zone information for useful correlation. Forwarding logs does not fix wrong clocks.')
Q('A failed appliance may take its locally stored event history with it. Which logging design reduces this risk?',
 'Forward events to a central syslog or SIEM',['Increase the local log buffer','Write logs to a USB drive on the device','Enable debug logging on the device'],
 'Forward relevant events to a protected central collection service. Anything kept on or in the device can be lost with it.')
Q('A replacement appliance must be rebuilt after hardware failure. Which artifact helps restore its policy?',
 'Backup of the known-good configuration',['Device\'s original factory configuration','Vendor\'s hardening guide','Last syslog export'],
 'A protected backup of the approved configuration supports controlled reconstruction and validation.')
assert len(ITEMS)==40
