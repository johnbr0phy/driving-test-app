"""Original cryptography practice with explicit security goals."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('A protected data store uses the same secret key to encrypt and decrypt its records. Which mechanism is described?',
 'Symmetric encryption, such as AES',['Asymmetric encryption, such as RSA','Hashing, such as SHA-256','Key stretching, such as PBKDF2'],
 'Symmetric encryption uses a shared secret key for encryption and decryption. A hash is one-way and cannot be decrypted.')
Q('A sender encrypts a small secret using the intended recipient\'s public key, so the corresponding private key is needed to recover it. Which mechanism is described?',
 'Asymmetric encryption',['Symmetric encryption','An HMAC','A digital signature'],
 'Public-key encryption uses a key pair, with the private key retained by the recipient. A signature uses the sender\'s private key and does not hide the content.')
Q('A distribution service publishes a fixed-length digest of a file through a separately authenticated channel so recipients can compare downloaded contents. Which mechanism produces that digest?',
 'A cryptographic hash function',['An HMAC with a shared secret key','A digital signature','A stream cipher keystream'],
 'A cryptographic hash maps the file to a digest. The trusted delivery of the reference digest matters because a bare hash does not authenticate its publisher.')
Q('A publisher uses a private signing key so recipients can verify the integrity and claimed origin of a software release with the associated public key. Which mechanism is described?',
 'A digital signature',['An HMAC','Public-key encryption of the release','A published SHA-256 hash'],
 'A digital signature supports integrity and origin authentication when the verifying key is trusted. It does not by itself hide the software contents.')
Q('A storage design requires both secrecy and detection of unauthorized ciphertext modification using an appropriate symmetric construction. Which mechanism fits?',
 'Authenticated encryption such as AES-GCM',['AES in CBC mode on its own','AES in ECB mode','A SHA-256 digest stored with the ciphertext'],
 'Authenticated encryption combines confidentiality with integrity protection when used correctly. CBC or ECB alone gives no tamper detection.')
Q('Two services share a secret and need to verify message authenticity without hiding the message. They do not need public verification. Which mechanism fits?',
 'An HMAC',['A digital signature','AES encryption under the shared secret','A plain SHA-256 digest'],
 'A keyed MAC supports shared-key message authentication without encryption. A plain hash has no key, and a signature is for public verification.')
Q('A password database must avoid storing recoverable passwords and make identical choices produce distinct stored verifiers. Which mechanism fits?',
 'A slow, salted hash such as bcrypt or Argon2',['AES encryption of each password','One unsalted SHA-256 hash per password','Base64 encoding of each password'],
 'A suitable password hashing scheme with unique salts protects stored verifiers. Encrypted passwords are recoverable, and unsalted hashes make identical passwords match.')
Q('A system needs unpredictable secret key material rather than values derived from a timestamp. Which mechanism should supply it?',
 'A CSPRNG seeded from system entropy',['A seed taken from the system clock','A standard non-cryptographic random function','A hash of the hostname and time'],
 'A cryptographically secure random generator supplies suitable unpredictability. Clock values and ordinary random functions can be predicted.')
Q('An organization wants to prevent unauthorized parties from producing signatures under its software-publisher identity. Which key-management safeguard directly addresses that risk?',
 'Keep the signing key in an HSM with controlled use',['Publish the public key on more servers','Extend the code signing certificate\'s validity','Keep the verification key secret'],
 'Protect the private signing key and control its use; public verification keys need not be secret.')
Q('A client receives a server certificate and must confirm that it was issued, through any intermediates, by a CA the client already trusts. Which check is required?',
 'Certificate chain validation',['Certificate hostname matching','Revocation checking','Key usage checking'],
 'Chain validation establishes the certificate\'s relationship to an accepted trust anchor, subject to the other relevant checks.')
Q('A certificate is otherwise valid, but it was issued for a different server name than the one requested. Which validation step should catch the mismatch?',
 'Subject alternative name matching',['Certificate chain validation','Revocation status checking','Validity period checking'],
 'Identity matching checks that the certificate applies to the intended peer, not merely that a trusted issuer signed it.')
Q('A certificate has not expired, but its key was compromised and the issuer has withdrawn trust before the end of its lifetime. Which check addresses that change?',
 'Checking OCSP or the CRL',['Checking the validity dates','Checking the chain to the root','Checking the subject name'],
 'Revocation-status checking can identify a certificate withdrawn before normal expiration, according to the validation policy.')
Q('A new encrypted service has no key yet. Its approved design calls for a securely generated key delivered only to the permitted service. Which lifecycle activity is needed?',
 'Key creation and provisioning',['Key rotation to a new version','Key escrow with a third party','Key destruction and zeroization'],
 'Secure generation and provisioning establish appropriate initial key material and access. Rotation needs an existing key to replace.')
Q('A key has reached its approved usage limit. The service must begin protecting new data under a replacement while maintaining authorized access to older data. Which activity is needed?',
 'Key rotation',['Key destruction','Key escrow','Key revocation'],
 'Rotation introduces a replacement and manages the transition; old decryption needs must be handled deliberately rather than by destroying the old key.')
Q('A legally retained archive must be read, and the relevant historical decryption key is held in an approved recovery system. Which lifecycle activity serves the request?',
 'Retrieving the archived key under policy',['Generating a fresh key for the archive','Rotating the archive key to a new one','Re-encrypting with a new key'],
 'Authorized key recovery supports legitimate access to protected historical material. A new key cannot decrypt data protected under the old one.')
Q('A retired key has no remaining permitted use or retention requirement. The approved lifecycle calls for making it unavailable for future use. Which activity applies?',
 'Key destruction',['Key archival','Key suspension','Key escrow'],
 'Destroy retired key material according to the applicable procedure once dependencies and retention are resolved. Archival or suspension keeps it available.')
Q('A web application needs protection for client-to-server communications using HTTPS. Which mechanism directly provides the secure channel?',
 'TLS',['IPsec','SSH','S/MIME'],
 'HTTPS uses TLS to protect the application connection when peer validation and configuration are correct.')
Q('Two gateways must protect selected IP traffic between networks without changing each application. Which mechanism operates at the relevant network layer?',
 'IPsec in tunnel mode',['TLS','SSH port forwarding','WPA3'],
 'IPsec protects IP traffic according to configured policies and can support gateway tunnels. TLS and SSH work per application connection.')
Q('An administrator needs an encrypted interactive command session to a remote server using a protocol designed for that purpose. Which mechanism fits?',
 'SSH',['Telnet','SFTP','SNMPv3'],
 'SSH supports secure remote administration with host and user authentication. Telnet is unencrypted, and SFTP is for file transfer.')
Q('An archive stores removable backup volumes in an off-site warehouse. The requirement is to protect the stored contents if a volume is taken without its separately protected key. Which mechanism addresses this scenario?',
 'Encryption at rest',['TLS on the backup network','IPsec between the sites','A hash of each volume'],
 'Stored-data encryption protects the volume under the stated key condition. Channel encryption protects data in transit, and a hash does not hide anything.')
Q('An application stores readable decryption keys in the same broadly accessible location as the encrypted records. Which design change directly addresses this access failure?',
 'Move the keys into a separate key management service',['Use a longer key length','Compress the records before encrypting them','Encrypt the keys with a key hard-coded in the app'],
 'Separate key access from ciphertext access. Encryption offers little protection when the same unauthorized party can readily obtain the key, whatever its length.')
Q('A selected authenticated-encryption mode such as AES-GCM takes a per-message input that must be unique under a given key. Which implementation obligation must be enforced?',
 'Pick a new nonce each time',['Keep the nonce secret from the recipient','Reuse one random nonce per session','Derive the nonce from the plaintext'],
 'Follow the construction\'s nonce requirements. Reuse under the same key can undermine GCM security, while the nonce itself need not be secret.')
Q('An organization inventories algorithms and dependencies so it can replace vulnerable cryptographic mechanisms without redesigning every application. Which capability is being developed?',
 'Cryptographic agility',['Cryptographic key escrow','Perfect forward secrecy','Defense in depth'],
 'Cryptographic agility supports controlled algorithm and key transitions as requirements and threats change.')
Q('A signed record must remain assessable years later, after the signer\'s certificate expires. Which archival concern should be planned?',
 'Keep trusted timestamps and revocation data with it',['Re-sign the record with a current key each year','Keep only the signed file and the public key','Extend the signer\'s certificate indefinitely'],
 'Retain the evidence needed by the long-term validation approach, such as trusted timing and certificate status. A present-day check alone does not plan future validation.')
assert len(ITEMS)==24
