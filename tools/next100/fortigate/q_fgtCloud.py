POOL = 8
ITEMS = [
    ('Under the cloud shared responsibility model, who secures the workloads and data a company runs in IaaS?',
     ['The company itself', 'The cloud provider', 'Fortinet', 'The internet provider'],
     'A',
     'The provider secures the cloud infrastructure, while the customer secures what it puts there: workloads, data, access and network controls. That is why a FortiGate VM is still needed in front of cloud workloads.'),
    ('A FortiGate VM is bought through a cloud marketplace and billed by the hour. Which licensing model is this?',
     ['Bring your own licence', 'Pay as you go', 'An evaluation licence', 'A perpetual hardware licence'],
     'B',
     'Pay as you go (PAYG) images carry the licence in the hourly marketplace price. Bring your own licence (BYOL) images need a licence bought from Fortinet and applied to the VM.'),
    ('How is traffic between two subnets in a cloud VPC sent through a FortiGate VM for inspection?',
     ['By putting both in one zone', 'By enabling FortiGuard', 'By editing the route tables', "By changing the VM's licence"],
     'C',
     "Cloud networks forward by their route tables, so each subnet's routes must point to the FortiGate VM's interface. Without those routes traffic flows directly between subnets and never reaches the firewall."),
    ('What is FortiGate CNF?',
     ['A FortiGate VM image to install', 'A hardware appliance for branches', 'A FortiOS update service', 'A firewall service Fortinet runs'],
     'D',
     'FortiGate Cloud-Native Firewall is a managed firewall-as-a-service: Fortinet runs and scales the firewall, and the customer only sets policy. With a FortiGate VM the customer deploys and maintains the instances.'),
    ('What does SASE bring together?',
     ['Network and security from the cloud', 'Routing and switching on site', 'Backups and disaster recovery', 'Endpoint and email antivirus'],
     'A',
     'Secure access service edge combines networking and security services, such as secure web gateway, ZTNA, CASB and firewall as a service, delivered from cloud points of presence close to users.'),
    ('How do managed remote laptops usually connect to FortiSASE for full protection?',
     ['Through a site-to-site VPN', 'With the FortiClient agent', 'Through a branch FortiGate', 'With a browser bookmark'],
     'B',
     'Managed endpoints run FortiClient, which tunnels traffic to the nearest FortiSASE point of presence for inspection wherever the user is. Branch and site connections are for offices, not roaming laptops.'),
    ("A contractor's laptop cannot run FortiClient. How can FortiSASE still protect its web traffic?",
     ['With a site-to-site IPsec tunnel', 'With an FSSO collector agent', 'With an explicit proxy and PAC file', 'With a FortiToken on the laptop'],
     'C',
     'Agentless FortiSASE uses its secure web gateway as an explicit proxy, set through a PAC file in the browser or system settings. FSSO and FortiToken identify users but do not route their traffic.'),
    ("How can FortiSASE sign remote users in with the company's existing identity provider?",
     ['With local FortiGate accounts', 'With a RADIUS accounting feed', 'With FSSO polling of the DC', 'With SAML single sign-on'],
     'D',
     "FortiSASE supports SAML single sign-on, so users authenticate with the company's identity provider, such as Microsoft Entra ID. FSSO polling reads on-premises domain controller logs and does not suit roaming users."),
]
assert len(ITEMS) == POOL
for i, it in enumerate(ITEMS):
    assert it[2] == "ABCD"[i % 4], (i, it[2])
    assert len(it[1]) == 4 and len(set(it[1])) == 4, i
