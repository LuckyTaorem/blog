---
title: "Apple Wallet Licenses Roll Out in Utah, Kentucky, NC"
date: 2026-11-12T17:16:43.944966+05:30
draft: false
images: ["images/apple-wallet-drivers-licenses-coming-to-three-new-states-soon.jpg"]
thumbnail: "images/apple-wallet-drivers-licenses-coming-to-three-new-states-soon.jpg"
description: "Apple Wallet now supports driver’s licenses in Utah, Kentucky and North Carolina, pushing the U.S. digital ID rollout toward 20 states by 2027."
categories: ["Security"]
tags: ["Apple Wallet", "Digital ID", "Driver's License"]
---

## Overview of the Latest State Additions

Apple’s Wallet app has evolved from a simple payment container into a full‑featured identity hub. After Virginia and Oklahoma went live earlier this year, three additional states—Utah, Kentucky, and North Carolina—are slated to join the program. When these launches are complete, roughly 20 U.S. states plus Puerto Rico will support driver’s licenses stored in Apple Wallet.

The rollout follows a pattern that began in 2021 when Apple first introduced the ability to add a state‑issued ID to the Wallet app. Since then, the feature has grown from a handful of pilot programs to a nationwide push, driven by both consumer demand for contactless verification and state governments’ desire to modernize DMV services.

## Why It Matters to Consumers and Governments

### Seamless Verification at the Point of Contact

- **Speed:** Scanning a QR‑code from a phone is faster than a physical card, reducing queue times at airports, rental car counters, and law‑enforcement checkpoints.
- **Security:** Apple’s Secure Enclave stores the credential in a tamper‑proof environment, and the data is only released after biometric authentication (Face ID or Touch ID).
- **Privacy:** The Wallet app shares only the data required for verification, not the full driver’s license record.

### State Benefits

- **Cost Reduction:** Digital issuance cuts printing and mailing expenses for DMVs.
- **Fraud Mitigation:** Real‑time revocation and instant updates are possible, limiting the window for counterfeit IDs.
- **Data Insights:** States can gather anonymized usage metrics to improve service delivery.

## Technical Breakdown of Apple Wallet Digital ID

### Credential Architecture

Apple leverages the **ISO/IEC 18013‑5** standard for mobile driver’s licenses (mDL). The credential consists of:

1. **Core Data Set** – Name, date of birth, license number, expiration, and photo.
2. **Optional Data Set

### Optional Data Set

- **Organizational Affiliation** – For commercial driver’s licenses, the employer’s name and fleet ID.
- **Medical Information** – Limited data such as a “restrictions” flag for vision or hearing impairments, which can be displayed on request.
- **Digital Signature** – A cryptographic signature from the issuing DMV that validates the integrity of the entire credential.

These optional fields are encrypted and only disclosed when a verifier explicitly requests them, adhering to the principle of data minimisation.

## State Integration Process

1. **Backend Registration** – Each state must register its issuing authority with Apple’s Digital ID portal, providing public keys and compliance documentation for ISO 18013‑5.
2. **Credential Issuance API** – DMVs integrate Apple’s `WalletKit` API, which handles the creation, signing, and provisioning of the mDL. Apple supplies SDKs for both iOS and Android (for cross‑platform compatibility in future expansions).
3. **Testing & Certification** – Apple conducts a three‑phase test: sandbox, pilot (limited user group), and production. The pilot phase often involves a handful of law‑enforcement agencies and private partners (e.g., car‑rental firms) to validate real‑world scanning.
4. **Live Rollout** – Once certification is passed, the state pushes an OTA (over‑the‑air) update to its DMV system, enabling residents to add their licenses directly from the Wallet app.

Utah, Kentucky, and North Carolina have all reported successful completion of the sandbox and pilot stages as of early October 2026, with full public availability slated for Q1 2027.

## What Users Need to Do

1. **Update iOS** – Ensure your iPhone is running iOS 18 or later. The latest version includes the updated Wallet UI for mDLs.
2. **Verify Eligibility** – The DMV must have your license digitised in its system. Most states automatically enrol new applicants; existing holders may need to request a digital copy.
3. **Add the License** – Open **Wallet → Add** and select **Driver’s License**. Scan the physical card or enter the license number manually. Apple will prompt Face ID/Touch ID verification before the credential is stored.
4. **Enable “Show ID”** – In **Settings → Wallet & Apple Pay → Show ID**, toggle the feature on. You can now double‑click the side button (or use the Home button on older models) to present the mDL at compatible terminals.

## Security & Privacy Safeguards

- **Secure Enclave Isolation** – The credential never leaves the Secure Enclave unless the user authenticates. Even Apple’s own services cannot read the raw data.
- **Dynamic QR Codes** – Each presentation generates a one‑time‑use QR code that expires after a few seconds, preventing replay attacks.
- **Revocation Mechanism** – If a license is suspended or expired, the issuing DMV can push a revocation notice instantly, rendering the mDL unusable.
- **Audit Logging** – Verifiers receive a signed receipt indicating the date, time, and scope of data shared, which the user can review in the Wallet app’s **History** tab.

## Potential Challenges and Mitigations

| Challenge | Impact | Mitigation |
|-----------|--------|------------|
| **Interoperability with Legacy Scanners** | Older verification hardware may not read Apple’s dynamic QR codes. | States are subsidising upgrades for law‑enforcement and commercial partners; Apple provides a fallback “magstripe‑compatible” mode for limited use. |
| **Digital Divide** | Residents without compatible iPhones could be excluded. | DMVs continue to issue physical cards and are exploring low‑cost Android alternatives through the **Google Wallet** partnership. |
| **Privacy Concerns** | Skepticism about government access to biometric data. | Apple’s architecture ensures that only the issuing authority can decrypt the credential, and no third‑party can intercept the data. |
| **Regulatory Variance** | Each state has its own data‑retention laws. | The integration API allows states to configure data‑fields and retention periods per local statutes. |

## Future Outlook

Apple’s roadmap hints at expanding the Wallet’s identity suite beyond driver’s licenses. Anticipated milestones include:

- **State‑Issued Passports** – Early pilots in partnership with the Department of State could enable travel‑document verification at airports.
- **Universal Health IDs** – Leveraging the same ISO 18013‑5 framework to store vaccination records and health insurance cards.
- **Cross‑Platform Adoption** – Apple is collaborating with the **FIDO Alliance** to enable Android devices to read Apple‑issued mDLs, fostering a truly interoperable digital ID ecosystem.

If the current trajectory holds, the United States could see **digital identity coverage in over 30 states** by 2029, dramatically reshaping how citizens prove who they are in everyday transactions.

## Conclusion

The addition of Utah, Kentucky, and North Carolina to Apple Wallet’s driver’s license program marks a pivotal moment in the nation’s digital‑ID evolution. By marrying Apple’s robust security hardware with state‑level commitment to modernisation, the initiative promises faster, safer, and more convenient identity verification for millions of Americans. While challenges remain—particularly around hardware compatibility and equitable access—the momentum is unmistakable. As more states join the fold, the Wallet app is poised to become the default identity hub for the digital age.

## FAQ

**Q: Can I use my Apple Wallet driver’s license for international travel?**
A: Not yet. The mDL is currently only valid for domestic verification. International travel still requires a physical passport, though Apple is exploring partnerships for digital passport pilots.

**Q: What happens if I lose my iPhone?**
A: The credential is stored in the Secure Enclave and is wiped when you enable **Erase All Content and Settings**. You can re‑add the license from the DMV portal after authenticating with your Apple ID.

**Q: Will my biometric data be shared with the state?**
A: No. Face ID/Touch ID data never leaves your device. The state only receives the encrypted credential after you authenticate locally.

**Q: Are there any fees to add a digital driver’s license?**
A: The service is free for users. Any fees associated with DMV processing remain unchanged.

**Q: How do I know if a verifier supports Apple Wallet mDLs?**
A: Look for the **Apple Wallet** logo on the scanner or ask the attendant. Most major airlines, rental‑car agencies, and law‑enforcement agencies have upgraded their systems in 2026‑2027.

**Q: Can I share my digital license with family members?**
A: No. Each mDL is tied to a unique biometric profile and cannot be transferred. Sharing would violate both Apple’s terms of service and state regulations.

---
**Source:** [*Original Article*](https://9to5mac.com/2026/11/03/apple-wallet-drivers-licenses-coming-to-three-new-states-soon/)


{{< comments >}}
