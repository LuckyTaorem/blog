---
title: "AI Guardrails Hamper Offensive Cyber Research"
date: 2026-07-25T21:59:19.899967+05:30
draft: false
images: ["images/how-ai-guardrails-are-impeding-the-work-of-offensive-cybersecurity-researchers.jpg"]
thumbnail: "images/how-ai-guardrails-are-impeding-the-work-of-offensive-cybersecurity-researchers.jpg"
description: "Strict guardrails from Anthropic and OpenAI limit offensive security work, pushing U.S. researchers to unrestricted open‑source and Chinese AI models."
categories: ["Security"]
tags: ["AI guardrails", "offensive security", "open source AI"]
---

## The Rise of AI Guardrails in Cybersecurity

In mid‑2026 the U.S. government placed export‑control restrictions on Anthropic’s **Mythos 5** and **Fable 5** models, citing concerns that powerful language models could be weaponised. In response, both Anthropic and OpenAI launched vetting programs—Anthropic’s **Cyber Verification Program (CVP)** and OpenAI’s **Trusted Access for Cyber**—that grant a narrow set of approved researchers access to the models with reduced safety filters.

The intention is clear: prevent malicious actors from generating exploit code, phishing payloads, or automated vulnerability‑scanning scripts. However, the same mechanisms that block bad actors also block legitimate “offensive” security researchers who rely on AI to accelerate discovery of zero‑days, fuzzing, and exploit development. As senior security reporter Lorenzo Franceschi‑Bicchierai notes, the friction is now pushing U.S. talent toward **open‑source** and **foreign‑owned** AI models that lack any guardrails.

## Why Restrictive Vetting Hurts Offensive Research

### The “Fix This Code” Dilemma

Chris Anley, chief scientist at NCC Group, summed up the paradox:  

> “This is where the whole offensive versus defensive and guardrails part comes in, because ‘fix this code’ as a prompt is both an essential mechanism for defense but also a roadmap for finding critical vulnerabilities in the code base.”

Offensive security work often starts with a prompt such as “identify buffer overflow in this function” or “generate a PoC for CVE‑2025‑XYZ”. When guardrails block these prompts, researchers must either:

1. **Manually write the code** – a time‑consuming process that slows patch cycles.
2. **Seek alternative models** – typically open‑source models like China’s **GLM**, which can be run locally without any usage restrictions.

### Real‑World Impact on Vulnerability Disclosure

Mark Dowd, a veteran zero‑day researcher, expressed his frustration:

> “It’s not really comfortable to me that these random large companies are making arbitrary decisions about what is safe in security and what’s not.”

Dowd’s team previously used Anthropic’s Mythos 5 to accelerate fuzzing of a critical open‑source library. After the export‑control freeze, the same workload now takes **30‑40 % longer** when run on a locally hosted GLM instance, because the model lacks the fine‑tuned security knowledge embedded in Mythos.

## Technical Trade‑offs: Guarded Models vs Open‑Source Alternatives

| Feature | Anthropic Mythos 5 / OpenAI (guarded) | Open‑Source / Chinese Models (e.g., GLM) |
|---------|----------------------------------------|-------------------------------------------|
| **Access** | Vetting required; limited to vetted U.S. orgs | Free download, run locally |
| **Safety Filters** | Aggressive content blocking, rate limits | None; unrestricted prompts |
| **Performance** | Optimised for code generation, security‑specific finetuning | General purpose; may need extra prompting |
| **Data Leakage** | Cloud‑based inference may expose queries to provider | Fully offline, no telemetry |
| **Export Controls** | Subject to U.S. ITAR/EAR restrictions | No U.S. restrictions, but may raise geopolitical concerns |

The technical advantage of guarded models lies in their **security‑specific finetuning**—they have been trained on large corpora of vulnerability reports, exploit patterns, and patch notes. Open‑source models can be fine‑tuned, but the effort and compute cost are prohibitive for most research teams.

### The Vetting Process in Practice

Both CVP and Trusted Access require:

1. **Background checks** (government‑level security clearance).
2. **Signed usage agreements** that prohibit any malicious exploitation.
3. **Audit logs** of every prompt and response.

While these steps protect the public, they also introduce **administrative latency**—weeks to months before a researcher can start a project. For fast‑moving threats (e.g., a zero‑day actively exploited in the wild), that delay can be catastrophic.

## Industry Impact: Shifts in Talent, Tooling, and Geopolitics

### Talent Migration to Open‑Source Ecosystem

Security firms such as **Remote Threat** and **Crowdfense** have publicly announced a pivot toward open‑source AI pipelines. Their CTOs cite the need for **“full control over the inference stack”** to avoid accidental data exfiltration and to maintain compliance with internal disclosure policies.

### Geopolitical Ripple Effects

The migration to Chinese‑origin models like GLM raises **national‑security concerns**. While GLM is technically open‑source, its development is overseen by entities linked to the Chinese government. The U.S. Department of Commerce has warned that reliance on such models could expose critical infrastructure to **supply‑chain espionage**.

For context, see the analysis of a potential water‑system breach in the article “[Cyberattack on US Water](https://ltdeveloperblogs.github.io/posts/what-happens-if-china-hacks-the-us-water-supply-i-went-to-a-secret-war-game-to-find-out)”](https://ltdeveloperblogs.github.io/posts/what-happens-if-china-hacks-the-us-water-supply-i-went-to-a-secret-war-game-to-find-out)”).

### Market Reactions

Anthropic’s recent blog post on **Fable 5**—originally restricted, then re‑released on July 1—triggered a **30 % spike** in stock price for AI‑security startups that partner with the company. Conversely, firms that rely heavily on open‑source models reported **higher operational costs** due to the need for in‑house model fine‑tuning.

The broader AI‑security market is now split between:

- **“Guarded” providers** (Anthropic, OpenAI) that offer high‑quality, vetted models but limit access.
- **“Free‑run” providers** (GLM, open‑source LLaMA derivatives) that give unrestricted access but require additional engineering effort.

## Future Outlook: Balancing Safety and Innovation

### Possible Policy Adjustments

Industry insiders suggest a **tiered‑access framework**:

1. **Tier 1** – Academic and non‑profit researchers with transparent disclosure pipelines.
2. **Tier 2** – Commercial offensive security teams that undergo periodic audits.
3. **Tier 3** – General public, limited to defensive‑only prompts.

Such a model could preserve the protective intent of guardrails while reducing friction for legitimate researchers.

### Technical Solutions on the Horizon

- **On‑premise “sandboxed” inference**: Both Anthropic and OpenAI are experimenting with encrypted, edge‑deployed versions of their models that run entirely within a customer’s data centre, eliminating cloud‑based telemetry concerns.
- **Prompt‑level attestation**: Embedding cryptographic signatures in each request could allow providers to verify that a prompt complies with the agreed‑upon usage policy without manual review.

### Community‑Driven Standards

The **Offensive AI Con**, organized by Remote Threat’s CEO Chris Thompson, is set to release a **code‑of‑conduct** for AI‑assisted exploit development. The goal is to create a self‑regulating ecosystem that aligns with governmental export‑control regimes while preserving research agility.

### Long‑Term Risks

If the current trajectory continues, we may see:

- **Fragmentation** of the AI‑security tooling landscape**, making collaboration harder.
- **Increased reliance on foreign AI** that could be weaponised against U.S. assets.
- **Regulatory backlash** that further tightens export controls, potentially stifling innovation across the board.

Stakeholders—AI developers, security firms, and policymakers—must therefore engage in a **continuous dialogue** to calibrate guardrails that are **risk‑aware but not risk‑averse**.

## FAQ

**Q1: What exactly are “guardrails” in the context of AI security?**  
A: Guardrails are a combination of content filters, usage policies, and vetting programs that restrict certain prompts (e.g., code that could be used to develop exploits) and limit model access to vetted entities.

**Q2: How do the export controls on Mythos 5 and Fable 5 affect U.S. researchers?**  
A: The controls prevent the models from being shared with foreign parties and require U.S. users to undergo a rigorous vetting process, which can delay or block legitimate research projects.

**Q3: Are open‑source models like GLM safe to use for offensive research?**  
A: Technically they are unrestricted, but they lack the safety audits and fine‑tuning of commercial models. Moreover, their provenance may raise geopolitical and supply‑chain concerns.

**Q4: Can I still use OpenAI’s or Anthropic’s models for defensive tasks?**  
A: Yes. Both providers allow “defensive‑only” prompts (e.g., “detect malicious code patterns”) without triggering the stricter vetting requirements.

**Q5: Where can I learn more about the debate surrounding AI safety and security?**  
A: Relevant reads include the deep‑dive on Anthropic’s Fable 5 “[Anthropic’s Fable 5: The AI Safety Crisis](https://ltdeveloperblogs.github.io/posts/who-decides-when-ai-is-too-dangerous)”](https://ltdeveloperblogs.github.io/posts/who-decides-when-ai-is-too-dangerous)”) and the analysis of governmental actions in “[Trump Admin Cracks Down on Anthropic](https://ltdeveloperblogs.github.io/posts/when-the-trump-administration-cracks-down-on-anthropic-who-benefits)”](https://ltdeveloperblogs.github.io/posts/when-the-trump-administration-cracks-down-on-anthropic-who-benefits)”).

---

The tension between protecting the public from AI‑enabled attacks and empowering security researchers to stay ahead of adversaries is now at a crossroads. How the industry resolves this will shape not only the future of offensive cybersecurity but also the broader trust relationship between AI developers, regulators, and the security community.

---
**Source:** [*Original Article*](https://techcrunch.com/2026/07/23/how-ai-guardrails-are-impeding-the-work-of-offensive-cybersecurity-researchers/)


{{< comments >}}
