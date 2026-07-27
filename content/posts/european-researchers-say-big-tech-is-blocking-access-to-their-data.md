---
title: "Big Tech Blocks EU Researchers Under DSA Rules"
date: 2026-07-27T22:51:50.954337+05:30
draft: false
images: ["images/european-researchers-say-big-tech-is-blocking-access-to-their-data.jpg"]
thumbnail: "images/european-researchers-say-big-tech-is-blocking-access-to-their-data.jpg"
description: "EU researchers accuse TikTok, Meta, and X of obstructing data access under DSA, hindering disinformation studies despite legal entitlements."
categories: ["Security"]
tags: ["Digital Services Act", "Big Tech", "Disinformation", "Data Access", "EU Regulation"]
---

## The Digital Services Act’s Broken Promise

The European Union’s **Digital Services Act (DSA)**, enacted to curb online harms and ensure transparency, is facing its first major stress test. Researchers across Europe are sounding alarms: **TikTok, Meta, and X (formerly Twitter) are systematically obstructing access to platform data**, despite legal obligations to provide it. The stakes couldn’t be higher. In the 2024 Romanian presidential election, a **Russian-coordinated disinformation campaign** allegedly boosted candidate **Calin Georgescu** to 23% of the vote—largely through TikTok. Yet when researchers like **Adriana Iamnitchi** of Maastricht University sought data to study the campaign’s impact, they hit a wall.

The DSA was designed to prevent exactly this scenario. Under **Article 40**, platforms must grant researchers access to "public data" to study "systemic risks," including disinformation. But as **L. K. Seiling** of the **DSA40 Collaboratory** puts it, **"Data access as it’s set up right now tries to disincentivize researchers."** The result? A regulatory framework that looks good on paper but fails in practice.

---

## How Big Tech Is Gaming the System

### **TikTok: The Quota Trap**
TikTok’s API is a case study in **bureaucratic obstruction**. While the platform touts its **1,000 daily API requests** and capacity to pull **100,000 video/comment records**, researchers report that these limits are **arbitrarily low** for large-scale studies. Iamnitchi’s team, investigating the Romanian election, found that **120 million views** of Georgescu’s posts couldn’t be fully analyzed due to these caps. TikTok claims to have approved **130 EU applications** in the second half of 2025, but the **DSA40 tracker** shows only **11 out of 13 applications** were approved—suggesting a **84.6% approval rate**, but with **crippling restrictions**.

### **Meta: The CrowdTangle Replacement Shell Game**
Meta’s **CrowdTangle**, a once-powerful tool for tracking viral content, was **shut down** and replaced with the **Meta Content Library and API**. While Meta frames this as an upgrade, researchers argue it’s a **downgrade in functionality**. The new system requires **nonprofit status or journalistic credentials**, narrowing access. Worse, it **lacks the granularity** of CrowdTangle, making it harder to map disinformation networks. For a company that **profits from engagement-driven algorithms**, this opacity is convenient.

### **X: The Paywall Barrier**
X’s approach is the most brazen. After **paywalling its API** in 2023, the platform now charges researchers **"hundreds of dollars a month"** for data access. **Democracy Reporting International (DRI)** sued X in **February 2025** after its application was rejected in **November 2024**. The European Commission fined X **€120 million ($137 million)** in **December 2025** for these barriers, but X **appealed the decision** in **February 2026**. The message is clear: **X would rather pay fines than comply**.

---

## Why This Matters: Disinformation as a Weapon

The Romanian election is a **microcosm of a global problem**. A **Russian-backed TikTok campaign** allegedly amplified Georgescu’s candidacy, flooding the platform with **116,000 potentially compromised accounts** and **27,000 fake profiles**. When researchers tried to study the network, TikTok’s **API quotas made it impossible**. This isn’t just an academic issue—it’s a **national security threat**.

Disinformation campaigns don’t just sway elections; they **erode trust in institutions**. In **2024 alone**, the EU identified **dozens of coordinated inauthentic behavior (CIB) networks** across social media. Yet without **unfettered data access**, researchers can’t:
- **Map the spread of false narratives** in real time.
- **Identify bot networks** before they influence public opinion.
- **Hold platforms accountable** for algorithmic amplification of harmful content.

As Iamnitchi warns, **"When you need data to investigate that impact, and that data is privately held, it can become practically impossible to research this space."**

---

## The Technical Breakdown: What Researchers Need vs. What They Get

| **Requirement**               | **TikTok’s Offering**               | **Meta’s Offering**                 | **X’s Offering**                    |
|-------------------------------|-------------------------------------|-------------------------------------|-------------------------------------|
| **Data Scope**                | Video, comments, follower records   | Facebook, Instagram, WhatsApp, Threads | Public posts, limited engagement data |
| **Access Method**             | API (1,000 requests/day)            | Meta Content Library & API          | Paywalled API                       |
| **Approval Rate**             | 84.6% (11/13)                       | Not disclosed                       | 52.2% (12/23 rejected)              |
| **Cost**                      | Free (but capped)                   | Free for nonprofits/journalists     | "Hundreds of dollars/month"         |
| **Web Scraping Alternative**  | Blocked                             | Blocked                             | Blocked                             |

### **The Web Scraping Workaround (That Doesn’t Work)**
Some researchers resort to **web scraping**, manually exporting data into spreadsheets. But this method is **woefully inadequate**:
- **No follower lists**: Critical for mapping coordinated networks.
- **No engagement metrics**: Impossible to track virality.
- **Legal risks**: Platforms like Meta and X **actively sue scrapers** under **anti-bot laws**.

---

## The Industry Impact: A Chilling Effect on Research

The DSA was supposed to be a **model for global tech regulation**. Instead, it’s becoming a **cautionary tale** about **corporate resistance to transparency**. The consequences are already visible:

1. **Delayed Responses to Disinformation**
   - Without real-time data, researchers can’t **flag emerging threats** until after they’ve gone viral.
   - Example: The **2024 Romanian election disinformation** was only fully understood **months after the vote**.

2. **A Two-Tiered System**
   - **Well-funded institutions** (e.g., Stanford Internet Observatory) can afford X’s API fees.
   - **Smaller NGOs and academics** are locked out, creating a **knowledge gap**.

3. **Regulatory Capture**
   - Platforms **lobby to define "systemic risk" narrowly**, excluding many disinformation studies.
   - The **European Commission’s €120M fine on X** was a rare win—but X’s appeal shows **Big Tech’s willingness to fight compliance**.

4. **Global Ripple Effects**
   - The U.S. is watching closely. If the DSA fails, **American regulators may abandon similar efforts**.
   - For more on how **corporate lobbying shapes tech policy**, see our analysis of [Why Corporate AI Super PACs Spent $27M on a Local Election](https://ltdeveloperblogs.github.io/posts/why-corporate-ai-super-pacs-spent-27-million-on-a-local-election).

---

## The Future Outlook: Can the DSA Be Fixed?

The DSA’s data access provisions are **not inherently flawed**—but their **enforcement is**. To fix this, the EU must:

### **1. Mandate Standardized APIs**
- Platforms should be required to provide **identical data fields** (e.g., follower networks, engagement metrics).
- **Example**: TikTok’s **1,000-request daily cap** should be **scaled to research needs**.

### **2. Create a Centralized Research Portal**
- A **single EU-run platform** could aggregate data from all major social networks, eliminating **individual paywalls and quotas**.
- **Precedent**: The **European Data Innovation Board** could oversee this.

### **3. Strengthen Penalties for Non-Compliance**
- The **€120M fine on X** was a start, but **repeat offenders** should face **higher penalties** (e.g., **5% of global revenue**).
- **Criminal liability** for executives who **willfully obstruct research** should be considered.

### **4. Expand Legal Protections for Researchers**
- **Anti-scraping laws** should include **exemptions for academic research**.
- **Whistleblower protections** for employees who expose **platform interference**.

### **5. Learn from Other Sectors**
- **Financial regulators** require banks to provide **real-time transaction data**—why not social media?
- **Healthcare data** is shared under **HIPAA** with strict privacy controls. A **similar framework** could work for social media.

For a deeper dive into **how tech platforms evade accountability**, read our investigation into [What Happens If China Hacks the US Water Supply?](https://ltdeveloperblogs.github.io/posts/what-happens-if-china-hacks-the-us-water-supply-i-went-to-a-secret-war-game-to-find-out).

---

## FAQ: What Researchers and Readers Need to Know

### **Q: Why can’t researchers just use public data?**
A: **Public data is often incomplete**. For example:
- TikTok’s **For You Page algorithm** prioritizes content in ways that **aren’t visible** in public posts.
- X’s **paywalled API** hides **engagement metrics** (likes, retweets) that reveal **bot activity**.

### **Q: Isn’t this a privacy issue?**
A: The DSA **explicitly balances transparency with privacy**. Researchers only access **public data** (e.g., posts, comments) and must **anonymize user information**. Platforms’ objections are **disingenuous**—they’re protecting **business interests**, not user privacy.

### **Q: What can researchers do now?**
A:
- **Apply for platform APIs** (even if approval is unlikely).
- **Collaborate with NGOs** like **Democracy Reporting International** to **pool resources**.
- **Pressure regulators** to **enforce DSA provisions** more aggressively.

### **Q: How does this affect everyday users?**
A: **Disinformation spreads faster when researchers can’t study it**. If platforms **block data access**, users are **more likely to encounter**:
- **Fake news** about elections, health, or crises.
- **Coordinated harassment campaigns**.
- **Algorithmic amplification of extremist content**.

For more on **how algorithms shape public discourse**, see our analysis of [X’s Algorithm Update Prioritizing Replies](https://ltdeveloperblogs.github.io/posts/xs-algorithm-will-finally-prioritize-replies-from-people-you-already-follow).

---

## Conclusion: The Battle for Transparency Is Just Beginning

The **Digital Services Act** was a **landmark achievement**—but its success hinges on **enforcement**. Right now, **Big Tech is winning the war of attrition**. Researchers are **frustrated, underfunded, and outgunned** by corporate legal teams. Yet the stakes—**democracy, public health, and national security**—couldn’t be higher.

The EU has two choices:
1. **Double down on enforcement**, with **stricter penalties** and **mandated data standards**.
2. **Abandon the DSA’s transparency goals**, letting platforms **self-regulate** (a proven failure).

The **Romanian election disinformation scandal** is a **warning**. If the EU doesn’t act, **2026’s elections**—in the U.S., Germany, and beyond—could be **even more vulnerable**.

For now, the message to researchers is clear: **Keep fighting**. And to Big Tech: **The world is watching**.

---
**Source:** [*Original Article*](https://www.wired.com/story/european-researchers-want-to-study-social-medias-harms-but-cant-get-the-data/)


{{< comments >}}
