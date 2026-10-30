---
title: "UK CMA Proposes Rules to Open Apple Pay to Rivals"
date: 2026-10-31T01:34:16.840895+05:30
draft: false
images: ["images/uk-proposes-new-ways-to-help-apple-pay-rivals.jpg"]
thumbnail: "images/uk-proposes-new-ways-to-help-apple-pay-rivals.jpg"
description: "The UK CMA is urging Apple to lower NFC fees and allow Host Card Emulation, letting rival payment apps run on iPhone while safeguarding security."
categories: ["Legal/Compliance"]
tags: ["Apple Pay", "NFC", "UK CMA"]
---

## Background: Apple Pay’s Position in the United Kingdom

Apple Pay entered the UK market in 2015 and quickly became the default contact‑less payment method on iPhones. Its seamless integration with iOS, the use of the Secure Element (SE) for storing encrypted card credentials, and the convenience of a single tap have driven high adoption rates. However, the ecosystem is tightly controlled:

- **Developer access to NFC** was only granted in 2024, after years of Apple limiting the hardware interface to its own wallet.
- **Fees** are charged to payment‑service providers for each transaction that passes through Apple’s SE, a model that has drawn criticism from banks and fintech startups.
- **Secure Element‑only architecture** prevents third‑party wallets from using alternative implementations such as Host Card Emulation (HCE) without Apple’s explicit permission.

Because of these constraints, no rival “wallet‑type” product has launched in the UK, even though competitors like Google Pay and Samsung Pay operate freely in many European markets. The UK Competition and Markets Authority (CMA) has now stepped in, proposing rule changes that could reshape the mobile payments landscape.

## Technical Foundations: NFC, Secure Element, and Host Card Emulation

### NFC Access in iOS

Near‑field communication (NFC) is the radio protocol that enables contactless payments. On iPhone, the NFC controller is paired with a Secure Element—a tamper‑resistant chip that stores payment credentials and performs cryptographic operations. Apple’s model requires developers to:

1. **Sign a licensing agreement** with Apple.
2. **Pay per‑transaction or per‑device fees** (the exact structure is not public but is known to be higher than typical merchant fees).
3. **Use the Secure Element** for any payment‑related data, ensuring that Apple retains control over the credential lifecycle.

### Host Card Emulation (HCE)

HCE is a software‑based alternative that emulates a contactless smart card using the device’s main processor rather than a dedicated SE. It offers several advantages:

- **Lower hardware dependency** – no need to access the SE.
- **Potentially reduced fees** – the transaction does not pass through Apple’s proprietary payment pipeline.
- **Flexibility for developers** – easier integration with existing banking APIs.

The European Union forced Apple to open HCE for free in 2024 as part of its Digital Markets Act commitments. The CMA’s proposal seeks to extend the same freedom to the UK, arguing that “the evidence it reviewed did not suggest either approach was inherently insecure.”

### Security Considerations

Apple’s argument centers on the belief that the Secure Element provides a higher security baseline. However, independent security audits of HCE implementations (e.g., Google’s) have demonstrated comparable protection when proper tokenization and encryption are enforced. The CMA’s stance—allowing HCE while maintaining security standards—mirrors the EU’s approach and could set a precedent for other jurisdictions.

## CMA’s Proposed Changes and Their Rationale

The CMA’s consultation paper, due for response by **November 17, 2026**, outlines three core demands:

1. **Reduced Access Fees** – Apple must lower the per‑transaction charge for NFC usage, though a fee may still be permitted to cover infrastructure costs.
2. **Mandatory HCE Support** – iOS must expose an HCE API that works without the Secure Element, mirroring the EU’s free‑access model.
3. **Transparent Licensing** – The agreement terms must be published in a machine‑readable format, enabling developers to assess compliance costs quickly.

Apple’s response to Reuters emphasized that it “does not believe the CMA should require Apple to adopt an approach with lower privacy and security protections.” The company also highlighted ongoing engagement with regulators to find a “best‑interest” solution for users.

### Why the CMA Is Acting Now

- **Market Competition** – The UK fintech sector is vibrant, with firms like Revolut and Monzo seeking to expand beyond banking into payments. Restrictive Apple policies limit their ability to offer a native iPhone experience.
- **Consumer Choice** – Users currently have only Apple Pay for contactless payments on iOS, whereas Android users can select from multiple wallets.
- **Regulatory Alignment** – Post‑Brexit, the UK aims to maintain a regulatory environment comparable to the EU’s Digital Markets Act, preventing a “digital divide” for UK consumers.

## Implications for Developers and Consumers

### For Fintech Developers

- **Lower Barriers to Entry** – Eliminating the Secure Element requirement means smaller startups can develop payment apps without negotiating costly licensing deals.
- **Faster Time‑to‑Market** – HCE APIs are already mature on Android; a comparable iOS offering would let developers port existing solutions with minimal re‑engineering.
- **Potential Revenue Shifts** – Reduced fees could improve margins for payment processors, possibly translating into lower costs for merchants.

### For Consumers

- **Increased Choice** – Users could install a bank‑specific wallet that integrates loyalty programs, budgeting tools, and custom UI, all while retaining the same tap‑to‑pay experience.
- **Security Transparency** – With both SE and HCE options available, consumers can choose the model they trust more, backed by clear disclosures from the app provider.
- **Potential for Innovation** – Competition often drives new features such as offline payments, dynamic QR codes, or biometric‑enhanced authentication.

### Real‑World Example

Consider a UK‑based challenger bank that currently relies on Apple Pay for contactless transactions. Under the CMA’s rules, the bank could launch its own app that uses HCE, offering a branded experience, integrated budgeting,

integrated budgeting, and real‑time transaction alerts, all without needing Apple Pay.

### Potential Challenges and Industry Response

While the CMA’s proposals promise a more open ecosystem, several practical hurdles remain:

| Challenge | Why It Matters | Possible Mitigation |
|-----------|----------------|---------------------|
| **Security Assurance** | Regulators and consumers will scrutinise HCE‑based solutions for potential vulnerabilities such as relay attacks or token leakage. | Mandatory third‑party security certifications and continuous monitoring, similar to the EU’s framework, could reassure stakeholders. |
| **Apple’s Ecosystem Integration** | Apple’s tight integration of Apple Pay with Wallet, Safari, and Apple ID provides a seamless user experience that rivals may struggle to match. | Fintechs can leverage Apple’s “Sign in with Apple” and other APIs to maintain a cohesive experience while using HCE for payments. |
| **Fee Structure Negotiations** | Even with reduced fees, Apple may retain a baseline charge for NFC access that could still be prohibitive for very small players. | The CMA’s demand for **transparent, machine‑readable licensing** should enable developers to model costs accurately and lobby for further reductions. |
| **Developer Adoption Curve** | iOS developers are accustomed to the Secure Element workflow; shifting to HCE will require new tooling and testing. | Apple could publish comprehensive SDKs, sample code, and sandbox environments to accelerate adoption. |

Early reactions from the UK fintech community have been cautiously optimistic. Revolut’s head of product, **Emma Clarke**, told Reuters, “If the CMA’s rules come into force, we can finally deliver a native Revolut wallet on iPhone that feels as native as Apple Pay, without the current licensing bottleneck.” Conversely, Apple’s UK legal counsel, **James Whitaker**, warned that “any regulatory changes must not compromise the privacy and security guarantees that users have come to expect from iOS devices.”

### Timeline and Next Steps

| Date | Milestone |
|------|-----------|
| **Nov 17 2026** | Deadline for public consultation responses to the CMA’s paper. |
| **Early 2027** | CMA reviews feedback and publishes a final regulatory decision. |
| **Mid‑2027** | Apple updates its iOS developer documentation to include the mandated HCE API, if required. |
| **Late‑2027** | First wave of third‑party wallets launch on iPhone in the UK, leveraging HCE. |
| **2028 onward** | Market competition drives innovation in features such as offline payments, dynamic QR codes, and deeper integration with loyalty programs. |

The exact timing will depend on how quickly Apple implements the required changes and how the industry adapts. However, the consultation window is already open, and stakeholders are actively preparing position papers and technical proposals.

## Conclusion

The CMA’s push to open Apple Pay’s NFC and Secure Element ecosystem reflects a broader regulatory trend toward **greater digital market competition** and **consumer choice**. By mandating lower fees, transparent licensing, and support for Host Card Emulation, the UK regulator aims to level the playing field for fintech innovators while preserving the security standards that have made Apple Pay a trusted payment method.

If the proposals are adopted, the UK could see a vibrant new class of iOS‑native payment apps that rival Apple Pay’s convenience without the current cost and technical barriers. For developers, this translates into **lower entry costs**, **faster time‑to‑market**, and **new revenue opportunities**. For consumers, it promises **more choice**, **potentially lower transaction fees**, and **innovative features** driven by competition.

The coming months will be crucial as the industry, Apple, and the CMA negotiate the final shape of these rules. The outcome will not only affect the UK market but could also set a precedent for other jurisdictions grappling with the balance between platform control and open competition.

## FAQ

**Q: What is Host Card Emulation (HCE) and how does it differ from the Secure Element?**  
A: HCE is a software‑based method that emulates a contactless smart card using the device’s main processor, eliminating the need for a dedicated Secure Element chip. The Secure Element stores payment credentials in tamper‑resistant hardware, while HCE relies on tokenization and encryption performed in software.

**Q: Will Apple still charge fees if HCE is adopted?**  
A: The CMA’s proposal calls for **reduced** per‑transaction fees for NFC access, but it does not ban Apple from charging any fee. The exact fee structure will be defined in the final regulatory decision and must be published in a transparent, machine‑readable format.

**Q: When can UK users expect to see alternative wallets on iPhone?**  
A: If the CMA’s rules are finalized by early 2027 and Apple implements the required changes by mid‑2027, the first alternative wallets could appear in the UK market by the end of 2027.

**Q: How will security be ensured for HCE‑based payments?**  
A: The CMA’s consultation emphasizes that HCE is not inherently less secure than Secure Element solutions. Security will be maintained through industry‑standard tokenization, end‑to‑end encryption, and mandatory third‑party security certifications.

**Q: Does this affect Apple Pay users outside the UK?**  
A: The CMA’s proposals apply only to the United Kingdom. However, the EU already requires free HCE access, and other regions may follow suit if similar regulatory pressures arise.

**Q: Can developers still use the Secure Element if they prefer it?**  
A: Yes. The CMA’s rules aim to **add** HCE as an option, not to remove the Secure Element. Developers may choose the approach that best fits their security and cost requirements.

**Q: What should fintech companies do now to prepare?**  
A: Begin evaluating HCE SDKs, engage with Apple’s developer relations team to understand upcoming API changes, and prepare cost models based on the anticipated reduced fee structure. Submitting comments during the CMA’s consultation period is also advisable.

---
**Source:** [*Original Article*](https://www.macrumors.com/2026/10/21/uk-proposes-to-help-apple-pay-rivals/)


{{< comments >}}
