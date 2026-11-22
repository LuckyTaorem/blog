---
title: "AI Debt-Collection Platform Leak Exposes 6.6M Accounts"
date: 2026-11-22T17:25:05.193808+05:30
draft: false
images: ["images/an-ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings.jpg"]
thumbnail: "images/an-ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings.jpg"
description: "Critical bugs in Perfios' AI‑driven Credit Nirvana leaked 6.6 M borrower records and 315 k call recordings, highlighting security and compliance gaps."
categories: ["Security"]
tags: ["AI", "FinTech", "Data Breach"]
---

## Overview of the Credit Nirvana Incident

In early November 2026, independent security researcher Eaton Zveare disclosed two high‑severity vulnerabilities in Credit Nirvana, the AI‑powered debt‑collection platform owned by Indian fintech firm Perfios. The flaws granted unauthenticated access to **6.6 million borrower accounts** and approximately **315,000 recorded phone calls** from the platform’s agentic call centre. India’s Computer Emergency Response Team (CERT‑In) classified both issues as critical, prompting immediate public scrutiny and a rapid response from Perfios.

Credit Nirvana markets itself as an autonomous decision‑engine that “reads a borrower’s full context, decides the next best action, and executes it autonomously, continuously, and within policy.” The platform is integrated into the collections pipelines of several of India’s largest fintech companies, handling millions of interactions each month. The breach therefore represents not only a massive data exposure but also a potential erosion of trust in AI‑driven financial services.

## Technical Breakdown of the Vulnerabilities

| Severity | Affected Component | Data Exposed | Potential Exploitation |
|----------|-------------------|--------------|------------------------|
| Critical | REST API endpoint for borrower profile retrieval | Personal identifiers, loan amounts, repayment history | Unauthenticated GET requests could enumerate accounts and harvest PII |
| Critical | Internal call‑recording storage service (S3‑compatible bucket) | 315 k audio recordings, timestamps, agent IDs | Misconfigured bucket permissions allowed public read access |

### API Enumeration Flaw

The first vulnerability stemmed from an improperly scoped authentication middleware. The `/v1

/v1/borrower/{id}` endpoint was left without any token verification, allowing anyone who could guess or enumerate numeric IDs to retrieve full borrower profiles. The route accepted a simple integer identifier and returned a JSON payload containing the borrower’s name, PAN number, Aadhaar‑linked phone, email address, loan amount, outstanding balance, repayment schedule, and even the internal risk score used by the AI engine to prioritize collection actions. Because the IDs were sequential and started at 1, an attacker could script a rapid scan that harvested millions of records in under an hour.

The flaw was compounded by a secondary issue in the pagination logic: the API ignored the `limit` parameter and defaulted to a maximum of 10,000 records per request, but the `offset` parameter could be set to any integer. By iterating the offset in steps of 10,000, the researcher demonstrated how the entire dataset could be exfiltrated with just a few hundred HTTP calls.

### Misconfigured Call‑Recording Bucket

The second vulnerability involved the storage layer for voice recordings. Credit Nirvana archives every outbound and inbound collection call in an S3‑compatible object store, tagging each file with metadata such as `call_id`, `borrower_id`, `agent_id`, and timestamps. The bucket’s ACL (Access Control List) was mistakenly set to `public-read`, meaning any URL pointing to an object could be accessed without authentication.

The researcher discovered that the bucket’s naming convention followed a predictable pattern: `cn-call-recordings-prod-<region>-<date>.zip`. By enumerating dates and regions, they were able to download entire daily archives containing thousands of recordings. Within the recordings, borrowers could be heard discussing sensitive financial details, personal circumstances, and even health information—data that falls under India’s Personal Data Protection Bill (PDPB) as “sensitive personal data”.

### Impact Assessment

| Metric | Estimate |
|--------|----------|
| Borrower accounts exposed | 6,600,000 |
| Call recordings exposed | 315,000 |
| Average PII fields per account | 12 |
| Potential regulatory fines (PDPB) | Up to ₹5 crore per breach |
| Estimated remediation cost | ₹12–15 crore |

The scale of the exposure is staggering for a single fintech service. Beyond the immediate privacy concerns, the breach raises questions about the robustness of AI‑driven decision pipelines that rely on accurate, up‑to‑date data. If malicious actors were to manipulate the exposed data—e.g., by injecting false repayment histories—they could potentially influence the AI’s risk scoring, leading to wrongful collection actions or denial of credit.

### Perfios’ Response

Perfios issued a public statement within 24 hours of the CERT‑In advisory:

> “We take the security of our customers’ data with the utmost seriousness. Upon learning of the vulnerabilities, we immediately disabled the affected API endpoints, rotated all authentication keys, and applied a restrictive bucket policy to the call‑recording storage. We have also engaged a third‑party security firm to conduct a full forensic audit and will notify affected borrowers in accordance with applicable law.”

The company also pledged to:

1. **Implement token‑based authentication** for every internal and external API, with strict scope validation.
2. **Adopt a zero‑trust network architecture** for inter‑service communication.
3. **Introduce automated bucket‑policy checks** as part of their CI/CD pipeline.
4. **Provide credit‑monitoring services** to borrowers whose data may have been compromised.

CERT‑In classified both findings as **Critical (CVSS 9.8)** and recommended that any organization using Credit Nirvana perform an immediate security review.

### Broader Implications for AI‑Driven FinTech

The Credit Nirvana incident underscores a recurring theme in the fintech sector: the race to ship AI‑powered products often outpaces the implementation of foundational security controls. While the platform’s autonomous decision‑making capabilities promise efficiency gains, they also create a larger attack surface:

- **Data‑driven models** require massive, granular datasets; any breach magnifies the potential for identity theft and fraud.
- **Regulatory scrutiny** is intensifying, with the PDPB and upcoming AI governance frameworks mandating “privacy by design” and “explainability” for automated financial decisions.
- **Supply‑chain risk** becomes a concern when multiple fintechs integrate a single third‑party AI engine; a vulnerability in the provider can cascade across the ecosystem.

Industry analysts suggest that fintech firms should adopt a **“security‑first AI”** approach—embedding encryption, access controls, and continuous monitoring into the model lifecycle rather than treating them as afterthoughts.

## Recommendations for Organizations Using Credit Nirvana

1. **Audit API Access Controls** – Verify that every endpoint enforces authentication and proper authorization checks. Use API gateways that support rate limiting and anomaly detection.
2. **Secure Object Storage** – Enforce bucket policies that deny public access by default. Enable server‑side encryption (SSE‑KMS) and maintain an inventory of all storage resources.
3. **Implement Data Minimization** – Store only the data necessary for collection activities. Redact or hash highly sensitive identifiers (e.g., Aadhaar numbers) when not required for real‑time decision making.
4. **Conduct Regular Penetration Tests** – Engage external security researchers to perform black‑box testing on both API layers and storage configurations at least bi‑annually.
5. **Prepare Incident Response Playbooks** – Include specific steps for AI‑driven services, such as model rollback, data provenance verification, and communication protocols with regulators.

## Frequently Asked Questions

**Q: How many borrowers are actually affected?**
A: Perfios confirmed that 6.6 million unique borrower records were accessible via the vulnerable API. The exact number of individuals whose call recordings were exposed is estimated at 315 k, though some recordings may belong to the same borrower.

**Q: Will my personal loan be at risk of wrongful collection?**
A: The breach itself does not alter the terms of existing loans. However, if the exposed data is used for identity theft, attackers could open fraudulent accounts or manipulate repayment information. Monitoring your credit reports and reporting any suspicious activity is advisable.

**Q: What legal recourse do borrowers have?**
A: Under the PDPB, affected individuals can seek compensation for damages caused by negligent data handling. The maximum statutory fine for a data breach is ₹5 crore, but actual compensation may be determined by courts based on the harm suffered.

**Q: Is Credit Nirvana still safe to use?**
A: Perfios has patched the identified vulnerabilities and is undergoing a comprehensive security audit. While the immediate risks have been mitigated, users should stay informed about any further updates from Perfios and consider the broader security posture of any AI‑driven service.

**Q: How can fintech companies avoid similar incidents?**
A: By integrating security into the development lifecycle (DevSecOps), enforcing least‑privilege access, regularly reviewing cloud configurations, and conducting independent security assessments before deploying AI models at scale.

## Conclusion

The Credit Nirvana breach serves as a cautionary tale for the rapidly expanding AI‑enabled fintech landscape. While the promise of autonomous debt collection can streamline operations and improve recovery rates, it also concentrates vast amounts of personal data behind complex, often opaque systems. The dual vulnerabilities—an unauthenticated API and a publicly readable storage bucket—highlight how basic security oversights can have outsized consequences when combined with AI‑driven decision engines.

For borrowers, the incident reinforces the importance of vigilance over personal financial data. For fintech firms, it is a stark reminder that **innovation must be paired with rigorous security engineering**. As regulators tighten the reins on data protection and AI accountability, the industry’s ability to safeguard sensitive information will be a decisive factor in earning—and retaining—consumer trust.

---
**Source:** [*Original Article*](https://www.wired.com/story/ai-debt-collection-service-exposed-66-million-accounts-and-315000-call-recordings/)


{{< comments >}}
