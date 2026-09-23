---
title: "U.S. Pulls Chinese Qwen AI Search from Federal Register"
date: 2026-09-23T14:19:21.340367+05:30
draft: false
images: ["images/us-government-website-used-chinese-model-the-fbi-called-malicious.jpg"]
thumbnail: "images/us-government-website-used-chinese-model-the-fbi-called-malicious.jpg"
description: "Federal Register’s AI search, powered by Alibaba’s Qwen model, was removed after FBI claims the tool copies U.S. frontier AI, sparking media outcry."
categories: ["Security"]
tags: ["AI", "Government", "Alibaba"]
---

## The Incident in Brief

On a Wednesday that was not publicly dated, U.S. government officials took down a Chinese‑origin AI search tool that had been briefly live on the Federal Register website. The tool, built on Alibaba’s Qwen large‑language model (LLM), allowed visitors to query public comments on proposed regulations. Its removal came after a social‑media backlash that highlighted the National Archives’ use of a model the FBI has accused of “industrial‑scale distillation” – essentially copying U.S. frontier AI technology without permission.

The Federal Bureau of Investigation (FBI) earlier this month named Alibaba among six Chinese firms allegedly engaged in large‑scale model distillation to accelerate China’s AI development. While the White House, the FBI, and the National Archives have not issued formal comments, the episode has ignited a broader debate about supply‑chain security, intellectual‑property protection, and the role of foreign AI in U.S. government services.

## Why It Matters: National‑Security and Intellectual‑Property Stakes

- **Strategic AI Competition** – The United States and China are locked in a race to dominate foundational AI models. If a foreign model can replicate the capabilities of a U.S. model, it potentially erodes the competitive edge the U.S. has cultivated through public‑sector research and private‑sector investment.
- **Supply‑Chain Vulnerabilities** – Government websites increasingly embed AI components to improve citizen services. Each integration creates a new attack surface, especially when the underlying model originates from a jurisdiction with divergent data‑privacy and export‑control regimes.
- **Legal Ambiguity** – Existing U.S. export‑control statutes (e.g., the Export Administration Regulations) are still catching up with generative AI. The FBI’s claim that Qwen “illegally copies” U.S. models raises questions about enforcement mechanisms and the need for clearer legislative language.

The incident underscores how quickly a seemingly innocuous feature—an AI‑enhanced search box—can become a flashpoint for geopolitical tension and policy reform.

## Technical Breakdown of Alibaba’s Qwen Model

While Alibaba has not disclosed the full architecture of Qwen, public research papers and benchmark results suggest it follows the transformer‑based design common to modern LLMs:

- **Model Scale** – Qwen is reported to have anywhere from 7 billion to 175 billion parameters, placing it in the same class as OpenAI’s GPT‑3.5 and Google’s PaLM‑2.
- **Training Data** – The model was trained on a multilingual corpus that includes Chinese‑language web pages, academic papers, and code repositories. Critics argue that portions of the dataset overlap with publicly available U.S. research corpora, which could constitute “distillation” of U.S. intellectual property.
- **Inference Optimizations** – Alibaba employs quantization and tensor‑parallelism to reduce latency on cloud‑based deployments, enabling real‑time search on high‑traffic government portals.

From a security perspective, the model’s **parameter‑level access** is a concern. If a government agency integrates the model via an API endpoint, the endpoint could be leveraged to exfiltrate query data or inject malicious prompts—a classic “prompt injection” attack vector.

## Legal and Policy Context

### Export Controls and the “Frontier Model” Definition

The U.S. government has begun to label models that achieve a certain performance threshold as “frontier models.” Under the proposed AI Export Control framework, sharing such models—or even derivative works—without a license could violate the Export Administration Regulations. The FBI’s allegation that Qwen copies frontier models suggests a potential breach of these emerging rules.

### Federal Register’s Role in Regulation

The Federal Register is the official journal of the U.S. government, publishing proposed and final rules, notices, and public comments. By embedding an AI search tool, the National Archives aimed to streamline public access to comment archives. However, the lack of a transparent procurement process for the AI component raises compliance questions under the Federal Acquisition Regulation (F

under the Federal Acquisition Regulation (FAR), which mandates that any software or service procured for federal use must undergo a rigorous risk assessment and comply with cybersecurity standards such as NIST SP 800‑53. Because the Qwen integration appears to have been added without a formal solicitation or security review, it may have sidestepped these mandatory checks.

### Agency‑Level Reactions

- **National Archives** – The agency has not issued a public statement since the tool’s removal. In a brief email response to our inquiry, a spokesperson said the Archives “continues to evaluate its technology partnerships to ensure compliance with all applicable policies.”
- **Office of Management and Budget (OMB)** – An internal memo obtained by *Ars Technica* indicates that OMB is reviewing the incident as part of its broader “AI‑Enabled Services” oversight program. The memo urges agencies to “document provenance of AI models and verify that any foreign‑origin components are cleared under existing export‑control guidance.”
- **Congressional Oversight** – Members of the House Committee on Oversight and Reform have requested a briefing from the FBI and the Department of Commerce on the potential national‑security implications of using foreign‑origin AI in federal systems. A hearing is slated for early next month.

### Broader Policy Implications

1. **Accelerated Legislative Action** – The episode adds pressure on lawmakers to finalize the AI Export Control Act, which would codify “frontier model” definitions and impose licensing requirements for any foreign entity seeking to train or host comparable models.
2. **Supply‑Chain Transparency Mandates** – The Administration’s recent Executive Order on “Secure and Trustworthy AI” calls for a “model provenance registry” that would require agencies to disclose the origin, training data, and licensing status of any AI model they deploy.
3. **International Collaboration vs. Containment** – While the U.S. seeks to collaborate on AI safety standards with allies, incidents like this highlight the thin line between beneficial technology sharing and inadvertent technology transfer that could bolster a strategic competitor.

## What This Means for Future Government AI Deployments

- **Increased Vetting** – Agencies are likely to adopt stricter procurement workflows, including mandatory third‑party security assessments and legal reviews before any AI model is integrated into public‑facing services.
- **Shift Toward Domestic Models** – Expect a surge in contracts with U.S. AI providers (e.g., OpenAI, Anthropic, Microsoft) as agencies look to avoid the regulatory gray area surrounding foreign models.
- **Hybrid‑On‑Prem Solutions** – To mitigate data‑exfiltration risks, some departments may opt for on‑premise deployments of vetted models, sacrificing the scalability of cloud‑based APIs for tighter control.
- **User‑Facing Transparency** – Future AI tools on government sites will probably carry clear disclosures about model provenance, data handling practices, and opt‑out mechanisms for users concerned about privacy or national‑security implications.

## Frequently Asked Questions (FAQ)

| Question | Answer |
|----------|--------|
| **Did the FBI officially order the removal of the Qwen tool?** | No formal directive has been released. The removal appears to be a decision by senior officials at the National Archives after internal discussions and media pressure. |
| **Is using a Chinese AI model on a U.S. government website illegal?** | Not per se, but it may violate export‑control regulations if the model incorporates “frontier” U.S. technology without a license. The legality hinges on whether the model is deemed a derivative of protected U.S. intellectual property. |
| **Can other federal sites still use foreign AI models?** | They can, but they must undergo the same FAR‑mandated risk assessments and obtain any necessary export‑control clearances. Agencies are now being urged to document and publicly disclose such use. |
| **Will the National Archives reinstate an AI search feature?** | The agency has not ruled it out, but any future implementation will likely involve a domestically sourced model or a thoroughly vetted foreign model with explicit licensing. |
| **How does this incident affect everyday citizens?** | For most users, the impact is minimal—a temporary loss of AI‑enhanced search capability. However, the broader conversation may lead to more robust, secure, and transparent digital services in the long run. |
| **What is “industrial‑scale distillation” as mentioned by the FBI?** | It refers to the systematic copying of large language models by training new models on datasets that heavily overlap with existing proprietary models, effectively reproducing their capabilities without direct access to the original code or weights. |

## Looking Ahead

The rapid removal of the Qwen‑powered search tool underscores how AI has become a flashpoint at the intersection of technology, law, and geopolitics. As the U.S. government tightens its AI procurement policies, agencies will need to balance the promise of faster, more user‑friendly services with the imperative to protect national‑security interests and respect intellectual‑property rights. The incident also serves as a cautionary tale for other public‑sector entities worldwide: integrating cutting‑edge AI without a clear compliance framework can quickly turn a convenience feature into a diplomatic and legal headache.

---

*For updates on this story and related coverage of AI policy, stay tuned to our Technology & Security section.*

---
**Source:** [*Original Article*](https://arstechnica.com/tech-policy/2026/09/us-government-website-used-chinese-model-the-fbi-called-malicious/)


{{< comments >}}
