---
title: "Pass‑ta‑key Attack Exposes Google Passkeys on Windows"
date: 2026-08-16T09:39:59.415840+05:30
draft: false
images: ["images/new-pass-ta-key-attack-reveals-all-the-things-we-didnt-know-about-passkeys.jpg"]
thumbnail: "images/new-pass-ta-key-attack-reveals-all-the-things-we-didnt-know-about-passkeys.jpg"
description: "Arie Olshtein’s Pass‑ta‑key attack extracts every Google Password Manager passkey on Windows, proving malware can bypass TPM‑only storage assumptions."
categories: ["Security"]
tags: ["Passkeys", "Malware", "TPM"]
---

## What Is the Pass‑ta‑key Attack?

Last week, Palo Alto Networks researcher **Arie Olshtein** published a proof‑of‑concept that challenges a core security belief: passkeys are stored only inside the **Trusted Platform Manager (TPM)**, a hardware enclave designed to be tamper‑proof. The new technique, dubbed **Pass‑ta‑key** (a playful blend of “passkey” and “pass the key”), shows that when a Windows machine is compromised by malware, an attacker can extract **every passkey stored in the Google Password Manager (GPM) app for Windows**.

The attack does not invent a brand‑new cryptographic flaw; instead, it repurposes classic credential‑stealing malware techniques to target the data that the GPM sync client keeps on the local filesystem. The novelty lies in the fact that the community has long treated passkeys as “hardware‑only” secrets, assuming the TPM would shield them from any software‑level compromise.

## Technical Breakdown of Pass‑ta‑key

### 1. Where Google Password Manager Stores Passkeys

Google’s Password Manager for Windows maintains a local encrypted vault that mirrors the user’s cloud‑based passkey store. While the encryption keys are derived from TPM‑protected material, the encrypted blob itself resides on the file system in a location accessible to the user profile. This design enables offline authentication and faster login, but it also creates a “soft” attack surface.

### 2. Malware Prerequisites

Pass‑ta‑key assumes the attacker already has **persistence** on the victim machine. Typical infection vectors include:

- Phishing‑laden executables
- Supply‑chain compromise of third‑party software
- Exploits of unpatched Windows kernel vulnerabilities

Once the malicious code runs with user‑level privileges (or higher), it can read the GPM vault file, locate the TPM‑derived decryption key in memory, and decrypt the passkeys.

### 3. Step‑by‑Step Extraction Process

| Step | Action | Technical Detail |
|------|--------|-------------------|
| **A** | Locate the GPM vault | Usually stored under `%APPDATA%\Google\PasswordManager\` as `vault.dat`. |
| **B** | Dump TPM‑derived key material | The key is loaded into process memory when the GPM client starts; malware can use Windows API calls like `ReadProcessMemory` to capture it. |
| **C** | Decrypt the vault | The vault uses AES‑256‑GCM; with the extracted key, the attacker can decrypt the entire file. |
| **D** | Export passkeys | Decrypted data contains WebAuthn credential IDs, public keys, and encrypted private keys. The attacker can re‑wrap the private keys for use in a rogue authenticator. |

### 4. Why Existing Malware Techniques Apply

The steps above mirror classic credential‑stealing tools that target password databases (e.g., `lsass.exe` dumps, Chrome password extraction). Pass‑ta‑key simply swaps the target from passwords to passkeys, proving that the “new” attack surface is really a **re‑contextualization** of known methods.

## Why It Matters: Rethinking Passkey Security

### The TPM Myth

The TPM is a hardware root of trust, but it does not magically protect data that is later written to disk. Passkeys rely on the TPM for **key generation and attestation**, yet the **encrypted credential store** lives outside the chip. This separation creates a gap that attackers can exploit once they have code execution on the host.

### User Perception vs. Reality

Many end users and even security professionals have promoted passkeys as a “password‑free, phishing‑proof” solution. The Pass‑ta‑key research reminds us that **phishing‑proof** only holds when the authentication flow remains intact and the device itself is uncompromised. If malware can harvest the private keys, the attacker can replay or forge authentication requests.

### Impact on Credential‑Management Ecosystem

- **Google Password Manager**: The incident forces Google to reconsider how it isolates the vault from the OS. Potential mitigations include moving the vault into a hardware‑backed secure enclave (e.g., Windows Hello Trusted Platform Module) or leveraging OS‑level isolation APIs.
- **Microsoft Windows**: Windows already offers **Windows Hello** and **Credential Guard**. The attack highlights the need for tighter integration between passkey storage and these built‑in protections.
- **Enterprise Policies**: Organizations that have mandated passkeys as a replacement for passwords must now incorporate **endpoint detection and response (EDR)** controls that specifically look for vault‑access patterns.

## Industry Impact and Immediate Reactions

### Security Vendors

- **Palo Alto Networks** has updated its Cortex XDR signatures to flag the specific file‑access patterns used by Pass‑ta‑key.
- **Microsoft** issued an advisory recommending that administrators enable **Device Guard** and **Credential Guard** on all Windows 10/11 endpoints that use passkeys.

### Browser and Platform Vendors

- **Google** posted a brief statement acknowledging the research and promising a “hardening roadmap” for the GPM client.
- **Apple** and **Mozilla** have not been directly implicated, but the broader community is watching to see whether similar vault implementations exist in Safari iCloud Keychain or Firefox Lockwise.

### Enterprise Adoption

Companies that have rolled out passkey‑only login for internal SaaS tools are now revisiting their **zero‑trust** models. The consensus is that passkeys should be **one factor** in a layered approach that still includes device posture checks, behavioral analytics, and continuous authentication.

## Mitigations & Recommendations

### For End Users

- **Keep Windows Updated**: Patch known kernel vulnerabilities that could allow privilege escalation.
- **Enable Windows Hello**: Use biometric or PIN protection that stores credentials in the TPM‑backed Secure Enclave.
- **Run Reputable Antivirus**: Solutions that monitor for credential‑vault access can alert you to suspicious activity.

### For IT Administrators

- **Deploy Credential Guard**: Isolates LSASS and credential stores in a virtualized environment, making memory dumping harder.
- **Enforce Application Control**: Use Microsoft Defender Application Control (MDAC) to whitelist only approved binaries, reducing the chance of malicious GPM‑like agents.
- **Audit GPM Vault Access**: Set up SIEM alerts for any process that reads the `vault.dat` file outside of the legitimate Google client.

### For Platform Developers

- **Move Vault Into TPM‑Protected Storage**: Leverage Windows’ **Protected Storage (DPAPI‑NG)** with TPM binding.
- **Implement Secure Enclave APIs**: On devices that support hardware security modules (e.g., Apple Secure Enclave, Android StrongBox), store the encrypted vault there instead of the file system.
- **Zero‑Knowledge Sync**: Ensure that even the cloud sync cannot decrypt the vault without the device‑bound key, limiting the value of a stolen vault file.

## Future Outlook: Will Passkeys Survive This Scrutiny?

The Pass‑ta‑key discovery is a **wake‑up call**, not a death knell. The underlying cryptographic primitives of passkeys (WebAuthn, FIDO2) remain robust. What is at stake is the **operational security** of the surrounding software stack.

- **Short‑Term**: Expect rapid patches from Google and Microsoft, tighter default configurations, and a wave of blog posts warning about “local vault” exposure.
- **Mid‑Term**: The industry may converge on a **hardware‑backed vault** model, where the passkey never leaves the TPM or Secure Enclave in plaintext form.
- **Long‑

Term**: The industry will likely see a shift toward **passkey portability standards** that balance security with user convenience, such as encrypted backups that require multi-factor authentication (MFA) for restoration.

### The Broader Implications for Authentication
Passkeys were designed to eliminate passwords, but the Pass-ta-key attack underscores a critical truth: **no authentication method is immune to endpoint compromise**. The attack doesn’t break the cryptographic guarantees of passkeys—it exploits the gap between hardware-backed security and real-world software implementations. This tension isn’t unique to passkeys; it mirrors the evolution of other authentication technologies, from smart cards to hardware tokens, where the weakest link often lies in how secrets are stored and accessed.

#### Lessons from History
- **Smart Cards**: Early implementations stored private keys on the card itself, but middleware software often cached them in memory or on disk, creating attack surfaces.
- **Hardware Tokens (e.g., YubiKey)**: While the keys never leave the device, phishing attacks evolved to trick users into approving rogue authentication requests.
- **Biometrics**: Fingerprint and facial recognition data is stored in secure enclaves, but malware has historically targeted the sensors or the OS-level APIs that process biometric data.

Passkeys are following a similar trajectory. The TPM provides a strong foundation, but the ecosystem around it—sync clients, local storage, and memory management—introduces vulnerabilities that attackers will inevitably target.

### The Role of Zero Trust
The Pass-ta-key attack reinforces the principles of **zero trust architecture (ZTA)**. In a zero-trust model:
- **Never trust, always verify**: Even if a device has a valid passkey, additional signals (e.g., device posture, user behavior) should be required for authentication.
- **Assume breach**: Design systems under the assumption that endpoints *will* be compromised, and limit the blast radius of such breaches.
- **Continuous authentication**: Use risk-based authentication to re-evaluate trust during a session, not just at login.

For passkeys, this means:
- **Context-aware authentication**: Require step-up authentication (e.g., biometrics or a second factor) for high-risk actions, even if the passkey is valid.
- **Device health checks**: Block authentication from devices that fail integrity checks (e.g., jailbroken, missing patches, or running suspicious processes).
- **Short-lived credentials**: Rotate passkeys or their associated metadata frequently to reduce the window of opportunity for attackers.

### The Road Ahead: Standardization and Collaboration
The Pass-ta-key research has sparked conversations among industry consortia, including:
- **FIDO Alliance**: The group behind the WebAuthn standard is reviewing feedback to clarify best practices for passkey storage and sync. Expect updates to the FIDO2 specifications to address local vault security.
- **W3C WebAuthn Working Group**: Discussions are underway to standardize how passkeys are stored across platforms, with a focus on minimizing exposure to malware.
- **Platform Vendors (Google, Microsoft, Apple)**: These companies are collaborating to define **cross-platform secure storage guidelines**, ensuring that passkeys are protected consistently whether they’re stored in Google Password Manager, Windows Hello, or iCloud Keychain.

#### Potential Standardization Efforts
1. **Hardware-Backed Vaults**: Mandate that passkey vaults be stored in hardware-backed secure enclaves (e.g., TPM, Secure Enclave, or Android StrongBox) by default.
2. **Encrypted Sync with Device-Bound Keys**: Require that cloud-synced passkeys be encrypted with keys tied to the device’s hardware, preventing decryption on unauthorized machines.
3. **Malware-Resistant APIs**: Develop OS-level APIs that restrict access to passkey vaults to only signed, verified applications, reducing the risk of credential theft.

### What This Means for Developers
Developers integrating passkeys into their applications should:
- **Avoid Local Storage**: If possible, rely on platform-provided secure storage (e.g., Windows Hello, Apple Keychain) rather than rolling your own vault.
- **Implement Short-Lived Tokens**: Use passkeys to generate short-lived session tokens rather than long-lived credentials.
- **Monitor for Anomalies**: Integrate with EDR/XDR solutions to detect unusual access patterns to passkey vaults.
- **Educate Users**: Clearly communicate the risks of malware and the importance of keeping devices secure, even when using passkeys.

## Conclusion: Passkeys Are Still the Future—But the Future Needs Hardening
The Pass-ta-key attack doesn’t invalidate passkeys; it **refines our understanding of their security model**. Passkeys remain a significant improvement over passwords, offering resistance to phishing, credential stuffing, and server breaches. However, the attack serves as a reminder that **security is a chain, and the weakest link is often the implementation**.

For end users, the takeaway is simple: **passkeys are not a silver bullet**. They must be part of a broader security strategy that includes endpoint protection, zero-trust principles, and user education. For enterprises, the message is clear: **adopt passkeys, but do so with eyes open to their limitations**. Layer them with other controls, monitor for threats, and prepare for a future where authentication is dynamic, context-aware, and resilient to compromise.

The Pass-ta-key attack is a setback, but it’s also an opportunity. By addressing these vulnerabilities now, the industry can build a more robust, malware-resistant authentication ecosystem—one that finally leaves passwords in the past where they belong.

---

## FAQ

### Q: Does the Pass-ta-key attack mean passkeys are unsafe?
A: No. The attack exploits a **specific implementation** (Google Password Manager for Windows) and requires malware to already be on the device. Passkeys themselves remain cryptographically secure. The issue lies in how the encrypted vault is stored and accessed, not in the passkey standard.

### Q: Can this attack be used against other password managers or platforms?
A: Potentially. Any password manager or sync client that stores passkeys in a local vault (e.g., iCloud Keychain, Firefox Lockwise) could be vulnerable to similar techniques if the vault is not adequately protected. However, platforms like Apple’s Secure Enclave or Android’s StrongBox provide stronger isolation, making such attacks harder.

### Q: What should I do if I use Google Password Manager on Windows?
A:
1. **Update Windows and GPM**: Ensure you’re running the latest versions.
2. **Enable Windows Hello**: Use biometric or PIN protection for your device.
3. **Install Antivirus**: Use a reputable security solution that monitors for credential theft.
4. **Monitor for Suspicious Activity**: Check your Google account for unusual login attempts.
5. **Consider Alternative Storage**: If possible, use a hardware security key (e.g., YubiKey) for critical accounts.

### Q: Will Google fix this vulnerability?
A: Google has acknowledged the research and is working on a **hardening roadmap** for the GPM client. Expect updates that move the vault into more secure storage or add additional layers of protection (e.g., requiring user interaction to decrypt the vault).

### Q: Does this attack work on macOS or Linux?
A: The Pass-ta-key attack specifically targets the **Google Password Manager app for Windows**. macOS and Linux have different security models and storage mechanisms. However, similar principles could apply if a password manager on those platforms stores passkeys in an accessible local vault.

### Q: Are hardware security keys (e.g., YubiKey) affected?
A: No. Hardware security keys store passkeys **exclusively on the device** and never expose them to the OS or file system. They are not vulnerable to this type of attack.

### Q: What’s the difference between a passkey and a password?
A:
- **Password**: A shared secret (e.g., "P@ssw0rd123") that is vulnerable to phishing, brute force, and server breaches.
- **Passkey**: A cryptographic key pair (public/private) where the private key is stored securely on the device. Passkeys are resistant to phishing and server breaches because the private key never leaves the device.

### Q: How can I protect my passkeys from malware?
A:
- **Use a Hardware Security Key**: For high-value accounts, use a FIDO2-compliant hardware key (e.g., YubiKey, Google Titan).
- **Enable Device-Level Security**: Use full-disk encryption (BitLocker, FileVault) and secure boot.
- **Avoid Local Vaults**: Prefer platform-provided secure storage (e.g., Windows Hello, Apple Keychain) over third-party password managers.
- **Keep Software Updated**: Patch your OS and applications to close vulnerabilities that malware could exploit.

### Q: Will this attack lead to more malware targeting passkeys?
A: It’s likely. As passkeys become more widely adopted, attackers will shift their focus to the ecosystems around them. Expect to see more malware designed to steal passkeys from local vaults, memory, or sync clients. Security vendors are already updating their detection rules to counter such threats.

### Q: What’s next for passkey security?
A:
- **Hardware-Backed Storage**: More platforms will move passkey vaults into hardware-backed secure enclaves.
- **Zero-Knowledge Sync**: Cloud sync will evolve to ensure that passkeys can’t be decrypted without the device-bound key.
- **Behavioral Analytics**: EDR/XDR solutions will add passkey-specific detection rules to identify anomalous access patterns.
- **Standardization**: The FIDO Alliance and W3C will refine best practices for passkey storage and sync.

---
**Source:** [*Original Article*](https://arstechnica.com/security/2026/08/heres-why-the-new-pass-ta-key-attack-is-mostly-a-nothingburger/)


{{< comments >}}
