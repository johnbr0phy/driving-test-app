"""Original identity and access scenarios."""
ITEMS=[]
def Q(stem,key,wrong,why):
 assert len(wrong)==3
 ITEMS.append((stem,[key]+list(wrong),why))
Q('A verifier checks a memorized passphrase. Which category describes this evidence?',
 'A knowledge factor',['A possession factor','An inherence factor','A location factor'],
 'A memorized secret is a knowledge factor.')
Q('A user completes the challenge of a registered hardware authenticator. Which factor category is the device?',
 'Something you have',['Something you know','Something you are','Somewhere you are'],
 'Control of the authenticator is a possession factor; the device being familiar to the user does not make it a knowledge factor.')
Q('An authenticator compares a fingerprint with its enrolled template. Which category describes the biometric characteristic?',
 'An inherence factor',['A knowledge factor','A possession factor','A behavioral risk signal'],
 'A biometric characteristic is an inherence factor. Its use within an authenticator does not turn it into a memorized secret.')
Q('An access service notes an unusual login location alongside authentication. What is the location?',
 'A risk signal rather than a factor',['A possession factor the user holds','A knowledge factor the user supplies','An inherence factor of the user'],
 'Location can influence risk assessment, but is not by itself proof of knowledge, possession or a biometric characteristic.')
Q('Before issuing an account, an organization validates evidence linking an applicant to a claimed identity. Which process is this?',
 'Identity proofing',['Authentication','Identity federation','Provisioning'],
 'Identity proofing establishes confidence in the claimed identity before enrollment. Provisioning follows once the identity is accepted.')
Q('An enrolled employee uses a registered credential to prove control of an existing account. Which process is this?',
 'Authentication',['Identity proofing','Authorization','Federation'],
 'Authentication verifies the claimant using an authenticator associated with the account.')
Q('An application checks whether a signed-in analyst may read a specific confidential report. Which process is this?',
 'Authorization',['Authentication','Accounting','Identification'],
 'Authorization decides whether the authenticated principal may perform the requested action.')
Q('A service records which account exported a file, when and the result. Which function does this support?',
 'Accounting (auditing)',['Authorization','Account provisioning','Identification'],
 'Accounting records activity for attribution and review. It does not itself grant permission.')
Q('A new hire passed identity checks and the manager approved a job role. Which lifecycle action implements this?',
 'Provisioning the entitlements for that role',['Recertifying the entitlements for that role','Granting broad access and trimming it later','Deprovisioning the hire\'s guest account'],
 'Provision the approved role and only its required entitlements. Recertification reviews existing access; it does not create it.')
Q('An employee moves from purchasing to support and no longer needs purchasing permissions. Which lifecycle action fits?',
 'Grant support rights and remove the purchasing rights',['Grant support rights and keep the purchasing rights','Leave rights unchanged until the next quarterly review','Create a second account for the support work'],
 'Review and adjust access for the new role, removing obsolete rights rather than accumulating them.')
Q('An employee leaves at an agreed time. Which identity lifecycle action must be coordinated with it?',
 'Disable the account and end its sessions on departure',['Disable the account at the next quarterly review','Reset the password and keep the account active','Remove the mailbox but keep its group memberships'],
 'Disable access and associated sessions or credentials under the separation procedure, timed to the departure.')
Q('A quarterly review asks owners to confirm assigned permissions are still justified. Which activity is this?',
 'Access recertification',['Access provisioning','Identity proofing','Account deprovisioning'],
 'Recertification evaluates continued need; it is distinct from initial provisioning or removal.')
Q('Within policy, a file owner chooses which colleagues get access to the file. Which access model is this?',
 'Discretionary access control',['Mandatory access control','Role-based access control','Rule-based access control'],
 'Discretionary control lets an authorized owner determine access to the object.')
Q('A system enforces central classification labels and clearances that file owners cannot override. Which model is this?',
 'Mandatory access control',['Discretionary access control','Attribute-based access control','Rule-based access control'],
 'Mandatory control enforces centrally governed label rules rather than owner discretion.')
Q('Permissions are assigned to the payroll-clerk job function, and users inherit them through it. Which model is this?',
 'Role-based access control',['Discretionary access control','Mandatory access control','Attribute-based access control'],
 'Role-based control assigns permissions through defined roles such as a job function.')
Q('A rule evaluates user department, resource sensitivity and device compliance together. Which model is this?',
 'Attribute-based access control',['Role-based access control','Rule-based access control','Mandatory access control'],
 'Attribute-based control evaluates attributes of the subject, object and environment together.')
Q('An identity provider sends an XML-based assertion to a partner service for federated sign-in. Which mechanism fits?',
 'SAML 2.0',['OpenID Connect','OAuth 2.0','Kerberos'],
 'SAML uses XML assertions for federation. OpenID Connect uses JSON ID tokens, and Kerberos is a ticket protocol for one realm or trusted realms.')
Q('A user lets a scheduling service reach part of another service with scoped tokens, not the password. Which mechanism fits?',
 'OAuth 2.0',['SAML 2.0','Kerberos','LDAP'],
 'OAuth supports delegated authorization using scoped access tokens; it does not alone define user authentication.')
Q('A client needs an identity layer over OAuth that returns an ID token. Which mechanism fits?',
 'OpenID Connect',['OAuth 2.0 on its own','SAML 2.0','RADIUS'],
 'OpenID Connect adds an authentication and identity layer, including ID tokens, to OAuth. OAuth alone issues access tokens, not ID tokens.')
Q('A file server grants access because the account is in an approved group on the domain controller. Which mechanism is this?',
 'Directory group membership',['A SAML group attribute asserted by a partner','An OAuth scope granted to a client app','An OpenID Connect group claim from a social login'],
 'Membership in a directory group maps the account to the local entitlement. No federation or token exchange with an outside party is involved.')
Q('A validly signed token was issued for a different application. Which check stops this service accepting it?',
 'Audience (aud) validation',['Expiry (exp) validation','Issuer (iss) validation','Signature validation'],
 'Audience validation ensures that a token is intended for the receiving service. The signature can be valid even when the token was meant for another application.')
Q('A previously valid token is presented after its permitted lifetime. Which check rejects this use?',
 'Expiry (exp) validation',['Not-before (nbf) validation','Audience (aud) validation','Nonce validation'],
 'Expiry enforcement limits acceptance beyond the token\'s validity window. Not-before covers a token used too early, not too late.')
Q('A token names an identity provider this service never agreed to trust. Which check is missing if it is accepted?',
 'Issuer (iss) validation',['Audience (aud) validation','Signature algorithm validation','Scope validation'],
 'The service must trust and validate the issuer, not merely accept a structurally valid token.')
Q('A valid token for this service permits reading, but the caller requests deletion. Which check should deny it?',
 'A permission check for that operation',['Signature validation of the presented token','Audience validation of the token','Expiry validation of the token'],
 'Authorization must compare the requested operation with the granted permissions; the token being valid, current and meant for this service is not enough.')
Q('Administrators need elevated rights only in maintenance windows but keep them all month. Which improvement fits?',
 'Just-in-time privileged access',['Quarterly recertification of the admin rights','Separate admin accounts kept active all month','Longer passwords on the admin accounts'],
 'Time-bound elevation reduces standing privilege while supporting authorized work. Reviews and stronger passwords leave the rights in place all month.')
Q('One employee can both request and authorize a sensitive payment. Which improvement addresses this conflict?',
 'Separation of duties',['Least privilege','Need to know','Job rotation'],
 'Splitting request and approval between people reduces the ability of one person to complete conflicting steps unchecked.')
Q('A batch job reads one queue, but its machine account can administer the whole platform. Which improvement fits?',
 'Least privilege for the machine account',['Separation of duties for the machine account','Credential rotation for the machine account','Shorter session timeouts for the machine account'],
 'Limit the service identity to the operations and resources the job actually needs. Rotating its credential leaves the excessive rights in place.')
Q('A user without direct permission reaches a restricted folder through nested groups. Which investigation explains this?',
 'Trace permissions through group inheritance',['Recheck the user\'s direct permissions only','Remove the user from every group and retest','Review the folder\'s encryption settings'],
 'Inherited and nested group grants can create effective access beyond direct assignments. Removing all groups would break justified access without explaining the cause.')
Q('Authentication must be bound to the real verifier so a lookalike site cannot relay a typed secret. Which approach fits?',
 'FIDO2 / WebAuthn passkeys',['SMS one-time passcodes','Authenticator-app one-time codes','Push notifications to approve sign-in'],
 'Origin-bound public-key authenticators resist phishing. A typed one-time code or an approved push can be relayed by a lookalike site in real time.')
Q('A captured authentication response must not work in a later login. Which design meets this?',
 'A fresh random challenge for each login',['A longer static password','A longer session timeout','Encrypting the response under a static key'],
 'Replay resistance comes from fresh challenges or nonces, so a previously accepted response is not valid again.')
Q('At enrollment, the system rejects common and known compromised passwords. Which safeguard is this?',
 'Blocklist screening of new passwords',['Mandatory periodic password expiry','Composition rules requiring symbols','Stored password hints for recovery'],
 'Blocklist screening rejects unsuitable password choices at establishment or change. Expiry and composition rules do not reject known compromised values.')
Q('A caller who lost all authenticators requests a replacement credential. Which process must confirm their claim?',
 'Identity-verified account recovery',['A reset based on the caller ID shown','A reset after answering security questions only','Emailing a temporary password to the caller'],
 'Recovery verification protects the account when normal authenticators are unavailable; convenience must not bypass identity assurance.')
Q('A disabled account\'s existing session still works because the application never invalidated it. Which action fixes this?',
 'Terminate the session on the server side',['Wait for the existing session to time out','Reset the disabled account\'s password','Lock the account a second time'],
 'Invalidate active sessions as supported by the application; disabling the account or resetting its password may not end a session that is already open.')
Q('A user no longer wants a third-party app to reach their documents through an approved delegation. What should be withdrawn?',
 'The app\'s OAuth grant and its tokens',['The user\'s own account password','The user\'s directory group memberships','The document sharing links the user created'],
 'Revoke the delegated authorization grant and its token access. Changing the user\'s password may not revoke tokens already issued to the app.')
Q('A transferred employee keeps access only through an old departmental group. Which change removes that access?',
 'Take the user out of the old departmental group',['Rename the old departmental group','Add a deny rule to the new group','Recertify the old group at next year\'s review'],
 'Remove the obsolete group grant while preserving justified permissions for the new role. Renaming or waiting leaves the access in place.')
Q('An application credential was disclosed in a support attachment. Which lifecycle action addresses its validity?',
 'Rotate it and revoke the exposed value',['Delete the support attachment','Restrict who can read the ticket','Monitor the credential for misuse'],
 'Replace and revoke the exposed secret through a coordinated rotation process; deleting the attachment alone does not invalidate a copy someone already has.')
Q('Domain A accepts identities from domain B, but B does not accept A\'s. Which trust is this?',
 'One-way trust',['Two-way trust','Transitive trust','Forest-wide trust'],
 'One-way trust permits recognition in one direction only; it does not imply reciprocal trust.')
Q('Two domains explicitly accept each other\'s identities under the configured agreement. Which trust description fits?',
 'Two-way (bidirectional) trust',['One-way incoming trust','One-way outgoing trust','Transitive trust through a third domain'],
 'A bidirectional relationship permits identity recognition in both directions, subject to separate authorization rules.')
Q('A trust allows recognition through an intermediate trusted domain, without direct agreements between every pair. Which trust is this?',
 'Transitive trust',['Non-transitive trust','One-way trust','Explicit pairwise trust'],
 'Transitivity allows trust to extend through defined relationships. It must not be assumed for every trust arrangement.')
Q('A system trusts a partner identity but still checks each requested operation against policy. Which decision stays separate?',
 'Resource-level authorization',['The identity federation agreement','User authentication at sign-in','The cross-domain trust setup'],
 'Recognition of an identity does not automatically authorize every resource operation. Resource authorization remains necessary.')
assert len(ITEMS)==40
