"""CCST Networking 2.0 Addressing and Subnet Formats: private and public
addresses, classes and NAT, IPv4 subnet formats and broadcast domains, IPv6
address types and prefixes. Every computed answer is checked with ipaddress."""
import ipaddress as ip
from helpers import single, multi, matrix, numeric

def hosts(prefix):
    return 2 ** (32 - prefix) - 2

def net(cidr):
    return ip.ip_network(cidr, strict=False)

# Computed answers, asserted against the ipaddress module.
H26 = hosts(26); assert H26 == len(list(net("10.0.0.0/26").hosts())) == 62
H28 = hosts(28); assert H28 == 14
H23 = hosts(23); assert H23 == 510
H29 = hosts(29); assert H29 == 6
H27 = hosts(27); assert H27 == 30
H25 = hosts(25); assert H25 == 126
H19 = hosts(19); assert H19 == 8190
H22 = hosts(22); assert H22 == 1022
BC1 = str(net("172.20.9.70/27").broadcast_address); assert BC1 == "172.20.9.95"
NW1 = str(net("10.44.7.200/26").network_address); assert NW1 == "10.44.7.192"
NW2 = str(net("192.168.33.150/25").network_address); assert NW2 == "192.168.33.128"
BC2 = str(net("10.9.16.40/22").broadcast_address); assert BC2 == "10.9.19.255"
M27 = str(net("0.0.0.0/27").netmask); assert M27 == "255.255.255.224"
M18 = str(net("0.0.0.0/18").netmask); assert M18 == "255.255.192.0"
assert net("0.0.0.0/255.255.255.248").prefixlen == 29
assert net("0.0.0.0/255.255.252.0").prefixlen == 22
assert ip.ip_address("172.31.200.4").is_private and not ip.ip_address("172.32.0.9").is_private
assert ip.ip_address("10.250.1.1") in net("10.0.0.0/8")
assert ip.ip_address("192.168.40.77") in net("192.168.40.64/26") and ip.ip_address("192.168.40.130") not in net("192.168.40.64/26")
assert str(ip.ip_address("2001:0db8:0000:0000:0000:00a0:0000:0001")) == "2001:db8::a0:0:1"
assert str(ip.ip_address("fe80:0000:0000:0000:0204:00ff:0000:0012")) == "fe80::204:ff:0:12"

ITEMS = [
    # ---------------- Test 1 ----------------
    single(1, "Private and public addresses", 2,
           "Which address is a private IPv4 address?",
           ["172.31.200.4", "172.32.0.9", "11.0.0.5", "192.169.100.1"],
           "RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12 (172.16.0.0 to 172.31.255.255) and 192.168.0.0/16. 172.32.0.9 is just outside the /12."),
    single(1, "Private and public addresses", 2,
           "What lets many hosts with private addresses share one public address to reach the internet?",
           ["NAT", "DNS", "DHCP", "ARP"],
           "Network address translation, usually port address translation on a home router, rewrites private source addresses to the router's public address."),
    numeric(1, "IPv4 subnets", 2,
            "How many usable host addresses does a /26 subnet have? Type the number only.",
            H26,
            "A /26 leaves 6 host bits: 2^6 = 64 addresses, minus the network and broadcast addresses, is 62 usable hosts."),
    single(1, "IPv4 subnets", 2,
           "Which subnet mask matches /27?",
           [M27, "255.255.255.192", "255.255.255.240", "255.255.254.0"],
           "27 ones means three ones in the last octet: 128 + 64 + 32 = 224, so 255.255.255.224. A /26 is .192 and a /28 is .240."),
    single(1, "IPv4 subnets", 3,
           "What is the broadcast address of the subnet holding 172.20.9.70/27?",
           [BC1, "172.20.9.63", "172.20.9.127", "172.20.9.255"],
           "A /27 makes blocks of 32 in the last octet: 64 to 95 holds .70, so the broadcast is 172.20.9.95. The .255 answer would be a /24."),
    single(1, "IPv4 subnets", 2,
           "Which device separates broadcast domains?",
           ["Router", "Unmanaged switch", "Hub", "Repeater"],
           "Routers do not forward broadcasts between interfaces, so each interface is its own broadcast domain. Switches flood broadcasts within a VLAN."),
    single(1, "IPv6 addresses", 2,
           "Which prefix marks an IPv6 link-local address?",
           ["FE80::/10", "FF00::/8", "2000::/3", "FC00::/7"],
           "RFC 4291 gives link-local unicast the FE80::/10 prefix. FF00::/8 is multicast and FC00::/7 is unique local."),
    single(1, "IPv6 addresses", 3,
           "What is 2001:0db8:0000:0000:0000:00a0:0000:0001 written in its shortest correct form?",
           ["2001:db8::a0:0:1", "2001:db8::a0::1", "2001:db8:a0::1", "2001:db8::a:0:1"],
           "Drop leading zeros in each group and replace the single longest run of zero groups with ::. A second :: is not allowed, and 00a0 shortens to a0, not a."),
    # ---------------- Test 2 ----------------
    single(2, "Private and public addresses", 2,
           "Which address block is private under RFC 1918?",
           ["10.0.0.0/8", "100.64.0.0/10", "169.254.0.0/16", "127.0.0.0/8"],
           "10.0.0.0/8 is one of the three private blocks. 169.254.0.0/16 is link-local, 127.0.0.0/8 is loopback and 100.64.0.0/10 is carrier shared space."),
    single(2, "Address classes", 2,
           "Under classful addressing, which class does 150.20.4.9 belong to?",
           ["Class B", "Class A", "Class C", "Class D"],
           "A first octet of 128 to 191 is Class B, with a default mask of 255.255.0.0. Class A is 1 to 126 and Class C is 192 to 223."),
    numeric(2, "IPv4 subnets", 2,
            "How many usable host addresses does a /22 subnet have? Type the number only.",
            H22,
            "A /22 leaves 10 host bits: 2^10 = 1024 addresses, minus network and broadcast, is 1022 hosts."),
    single(2, "IPv4 subnets", 3,
           "Which network does host 10.44.7.200/26 belong to?",
           [NW1 + "/26", "10.44.7.128/26", "10.44.7.0/26", "10.44.7.224/26"],
           "A /26 makes blocks of 64: 0, 64, 128 and 192. 200 falls in the block that starts at 192."),
    single(2, "IPv4 subnets", 2,
           "Which prefix length matches the mask 255.255.255.248?",
           ["/29", "/28", "/30", "/27"],
           "248 is 11111000, five ones after the first 24, so 29 bits. 255.255.255.252 would be /30."),
    single(2, "IPv4 subnets", 3,
           "A host has 192.168.40.77 with mask 255.255.255.192. Which address is on the same subnet?",
           ["192.168.40.100", "192.168.40.130", "192.168.40.60", "192.168.41.77"],
           "The /26 block holding .77 runs from .64 to .127, so .100 is local. .60 is in the block below and .130 in the block above."),
    single(2, "IPv6 addresses", 2,
           "Which IPv6 address is the loopback address?",
           ["::1", "::", "FE80::1", "FF02::1"],
           "RFC 4291 sets ::1/128 as loopback. :: alone is the unspecified address, and FF02::1 is the all-nodes multicast group."),
    numeric(2, "IPv6 addresses", 2,
            "How many 16-bit groups make up a full IPv6 address? Type the number only.",
            8,
            "IPv6 addresses are 128 bits written as 8 groups of 16 bits, each group as four hex digits separated by colons."),
    single(0, "Private and public addresses", 2,
           "Which address could be routed on the public internet?",
           ["8.20.14.3", "192.168.200.9", "10.250.1.1", "172.18.5.5"],
           "The other three sit in the RFC 1918 private ranges, which internet routers drop. 8.20.14.3 is outside all of them."),
    single(0, "Private and public addresses", 2,
           "A PC shows 169.254.33.10 and cannot reach anything. What most likely happened?",
           ["No DHCP reply arrived", "NAT failed", "DNS is wrong", "Its gateway is down"],
           "Windows and other systems pick a 169.254.x.x link-local address when they ask for DHCP and get no answer. Check the DHCP server or the link."),
    single(0, "Private and public addresses", 3,
           "With port address translation, how does the router tell apart replies for two inside hosts?",
           ["By port number", "By MAC address", "By TTL value", "By VLAN tag"],
           "PAT gives each inside session its own source port on the public address and keeps a table to map replies back to the right host."),
    single(0, "Address classes", 2,
           "What is the default mask of a Class C network?",
           ["255.255.255.0", "255.255.0.0", "255.0.0.0", "255.255.255.128"],
           "Class C (first octet 192 to 223) uses 24 network bits by default. Class B uses 255.255.0.0 and Class A 255.0.0.0."),
    single(0, "Address classes", 3,
           "Which first-octet range is Class D, used for multicast?",
           ["224 to 239", "192 to 223", "240 to 255", "128 to 191"],
           "Class D runs from 224 to 239 and carries multicast groups. 240 and up was Class E, reserved."),
    numeric(0, "IPv4 subnets", 2,
            "How many usable host addresses does a /23 subnet have? Type the number only.",
            H23,
            "A /23 leaves 9 host bits: 2^9 = 512 addresses, minus 2, gives 510 hosts."),
    single(0, "IPv4 subnets", 3,
           "A subnet must hold 30 hosts. What is the longest prefix that still fits them?",
           ["/27", "/28", "/26", "/29"],
           "A /27 has 5 host bits, 32 - 2 = 30 usable hosts, exactly enough. A /28 gives only 14; a /26 works but wastes addresses."),
    numeric(0, "IPv4 subnets", 3,
            "How many usable host addresses does a /19 subnet have? Type the number only.",
            H19,
            "A /19 leaves 13 host bits: 2^13 = 8192 addresses, minus 2, is 8190 hosts."),
    single(0, "IPv4 subnets", 2,
           "What is the longest prefix that still gives at least 100 usable hosts?",
           ["/25", "/26", "/24", "/27"],
           f"A /25 has 7 host bits, so 128 - 2 = {H25} hosts. A /26 gives only 62."),
    single(0, "IPv4 subnets", 3,
           "Which network address does 192.168.33.150/25 sit on?",
           [NW2, "192.168.33.0", "192.168.33.144", "192.168.33.192"],
           "A /25 splits the last octet into 0 to 127 and 128 to 255. 150 is in the upper half, which starts at .128."),
    single(0, "IPv4 subnets", 3,
           "What is the broadcast address for 10.9.16.40/22?",
           [BC2, "10.9.16.255", "10.9.23.255", "10.9.17.255"],
           "A /22 spans four third-octet values in blocks of 4: 16 to 19. The last address of that block is 10.9.19.255."),
    single(0, "IPv4 subnets", 2,
           "Which mask matches /18?",
           [M18, "255.255.224.0", "255.255.128.0", "255.255.255.192"],
           "18 bits is 16 in the first two octets plus 2 in the third: 128 + 64 = 192, so 255.255.192.0. A /26 would put .192 in the last octet instead."),
    single(0, "IPv4 subnets", 2,
           "Which prefix length matches 255.255.252.0?",
           ["/22", "/21", "/23", "/24"],
           "252 is 11111100, six ones, added to 16 gives 22 bits."),
    single(0, "IPv4 subnets", 2,
           "What does the slash in 10.4.0.0/16 tell you?",
           ["Number of network bits", "Number of hosts", "Number of usable host addresses", "Network address class"],
           "Slash notation, or CIDR notation, counts the ones in the subnet mask. /16 means 255.255.0.0."),
    single(0, "IPv4 subnets", 3,
           "Two hosts on one switch have the same mask but different subnet addresses. What do they need to talk?",
           ["A router", "A second switch", "A crossover cable", "A longer mask"],
           "Hosts on different subnets send traffic to their default gateway, which routes it. The same switch alone does not join two subnets."),
    single(0, "IPv6 addresses", 2,
           "Which IPv6 prefix covers multicast addresses?",
           ["FF00::/8", "FE80::/10", "FC00::/7", "2000::/3"],
           "Every IPv6 multicast address starts with FF, so FF00::/8 holds them all. IPv6 has no broadcast; multicast groups such as FF02::1 do that job."),
    single(0, "IPv6 addresses", 2,
           "Which range holds the global unicast addresses now assigned to internet hosts?",
           ["2000::/3", "FE80::/10", "FD00::/8", "FF00::/8"],
           "Global unicast addresses in use today begin with 2 or 3, the 2000::/3 block. FD00::/8 is unique local, like IPv4 private space."),
    single(0, "IPv6 addresses", 3,
           "What is fe80:0000:0000:0000:0204:00ff:0000:0012 in shortest form?",
           ["fe80::204:ff:0:12", "fe80::204:ff::12", "fe8::204:ff:0:12", "fe80:0:204:ff:0:12"],
           "The three zero groups after fe80 collapse to ::, and leading zeros drop in each group. Only one :: is allowed, so the later single zero stays as 0."),
    multi(0, "IPv6 addresses", 3,
          "Which two statements about IPv6 prefixes are true? (Choose two.)",
          ["A /64 is the usual LAN subnet", "The prefix is written after a slash", "IPv6 masks are dotted decimal", "Every prefix is /48", "Hosts never need a prefix"],
          "IPv6 uses slash notation only, and LAN subnets are normally /64, leaving 64 bits for the interface ID. There are no dotted-decimal masks in IPv6."),
    matrix(0, "IPv6 addresses", 3,
           "Match each IPv6 address to its type:",
           ["FE80::9C1", "FF02::2", "::"],
           ["Link-local unicast", "Multicast", "Unspecified"],
           [0, 1, 2],
           "FE80::/10 is link-local, FF00::/8 is multicast (FF02::2 is all routers), and :: with nothing else is the unspecified address."),
]
