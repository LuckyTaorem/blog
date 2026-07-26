---
title: "EU Says TikTok Must Make Child Safety Opt‑Out, Not Opt‑In"
date: 2026-07-26T22:01:52.926506+05:30
draft: false
images: ["images/tiktoks-protection-of-minors-should-not-be-opt-in-warns-eu.jpg"]
thumbnail: "images/tiktoks-protection-of-minors-should-not-be-opt-in-warns-eu.jpg"
description: "EU DSA review flags TikTok’s default public accounts, For You feed recommendations, and private‑account discoverability, urging opt‑out child safety."
categories: ["Legal/Compliance"]
tags: ["TikTok", "EU", "Digital Services Act"]
---

## Overview of the EU’s Preliminary Findings

On 24 July 2026 the European Commission released its first set of preliminary findings under the Digital Services Act (DSA) concerning TikTok’s treatment of under‑18 users. The DSA, which entered into force in early 2024, obliges very large online platforms (VLOPs) to adopt “risk‑based” safeguards for minors, including **default privacy settings** and **algorithmic transparency**.  

The Commission’s report identifies three concrete shortcomings:

1. **Public‑by‑default accounts for minors** – content posted by a teen can be viewed by anyone on the platform unless the user manually restricts it.  
2. **For You feed recommendation of minors’ content** – videos created by under‑18 creators are still being surfaced to the broader audience.  
3. **Discoverability of private accounts** – even when a teen switches to a private profile, the account can be located through the “following” lists of other users.

The Commission argues that these practices amount to an **opt‑in** model of protection, which the DSA expressly forbids. Instead, child‑safety measures must be **opt‑out**, meaning the safest configuration should be applied automatically.

## Technical Issues with TikTok’s Minor Settings

### Default “Public” Accounts

TikTok’s current onboarding flow asks users to confirm their age but does not automatically switch a minor’s profile to a private mode. The result is a **public default** that exposes every post, comment, and live stream to the platform’s entire user base. From a technical standpoint, this is a simple configuration flag (`account_visibility = "public"`). Changing it to `account_visibility = "private_by_default"` for users under 18 would require only a minor adjustment to the account‑creation API, yet it would dramatically reduce the attack surface for predatory behavior and data harvesting.

### For You Feed Recommendation Engine

The recommendation algorithm (often referred to as the “For You feed”) ingests signals such as watch time, likes, and user‑generated metadata. The Commission’s findings indicate that the algorithm does **not** filter out minors’ content before it is mixed with the general feed. In practice, this means a video posted by a 13‑year‑old could be recommended to a 30‑year‑old user with no age‑based gating. Implementing an age‑aware filter would involve adding a **content‑age tag** to each video at upload and then applying a **policy layer** in the ranking pipeline that blocks “minor‑tagged” items from being served to users outside a defined age bracket.

### Private‑Account Discoverability via “Following” Lists

Even when a teen toggles the private setting, TikTok still displays the account in the “following” lists of other users. This is a classic case of **indirect discoverability**: the private flag only restricts direct profile visits, but the relational graph remains exposed. Mitigating this requires a two‑step approach:

1. **Graph pruning** – remove private accounts from public follower/following endpoints unless the requester is an approved follower.  
2. **Rate‑limited lookup** – enforce stricter API throttling for queries that could be used to enumerate private accounts.

These changes are technically feasible but demand a redesign of the public API surface and careful handling of backward compatibility for third‑party developers.

## Why It Matters for Platforms and Users

### Protecting Vulnerable Audiences

Children are statistically more susceptible to online manipulation, cyber‑bullying, and data exploitation. An opt‑out model ensures that the **safest default** is always applied, reducing reliance on user awareness or parental supervision. The EU’s stance aligns with the broader **“privacy by design”** principle that has become a cornerstone of modern data‑protection law.

### Legal and Financial Risks

Non‑compliance with the DSA can trigger **substantial fines**—up to 6 % of a company’s global turnover. For TikTok, whose 2025 revenue exceeded €10 billion, the financial exposure is in the hundreds of millions. Moreover, repeated violations could lead to **temporary suspension** of the service in the EU market, a scenario that would damage brand reputation and user trust.

### Competitive Landscape

Other platforms have already adjusted their policies. YouTube, for example, introduced stricter age‑gating and algorithmic controls after a series of regulator‑driven investigations. The Verge’s coverage of that shift can be read in detail here: [https://ltdeveloperblogs.github.io/posts/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos](https://ltdeveloperblogs.github.io/posts/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos). TikTok’s lag in adopting comparable safeguards may erode its market share among younger demographics, especially as parents become more vigilant.

## Industry Impact and Regulatory Landscape

### Precedent for Future DSA Enforcement

The Commission’s preliminary findings are the first **publicly disclosed** enforcement action under the DSA’s child‑safety provisions. This signals that regulators will move from **advisory guidance** to **binding requirements**. Companies operating in the EU will need to audit their product roadmaps for compliance gaps, not only for TikTok but for any service that hosts user‑generated content.

### Algorithmic Transparency Across Platforms

The issue of age‑aware recommendation is not unique to TikTok. Recent scrutiny of

meta-learning models at Facebook and Instagram has revealed similar patterns: content from minors is often amplified without sufficient safeguards. The DSA’s emphasis on **algorithmic transparency** compels platforms to disclose how their recommendation systems prioritize or deprioritize content based on user age. This could lead to a wave of **audit trails** and **third-party assessments**, where independent researchers evaluate whether platforms are adhering to their stated policies.

### Cross-Border Regulatory Alignment

The EU’s approach is increasingly influencing global regulatory frameworks. Countries like the UK, Canada, and Australia are closely monitoring the DSA’s enforcement actions, with some already drafting similar legislation. For multinational platforms like TikTok, this means that compliance in one jurisdiction may soon become a baseline requirement for operating in others. The **Brussels Effect**—where EU regulations set de facto global standards—is particularly pronounced in digital policy, and child safety is no exception.

## TikTok’s Response and Next Steps

TikTok has been given a **30-day window** to respond to the Commission’s preliminary findings. The company has previously stated its commitment to child safety, citing features like **Family Pairing**, **Screen Time Management**, and **Restricted Mode**. However, the EU’s findings suggest these measures are insufficient if they remain opt-in rather than default protections.

### Potential Technical Remediations

To address the Commission’s concerns, TikTok could implement the following changes:

1. **Age-Gated Defaults**:
   - Automatically set accounts of users under 18 to private upon creation.
   - Introduce a **one-time confirmation** for minors who wish to switch to a public account, accompanied by a clear explanation of the risks.

2. **Algorithmic Safeguards**:
   - Modify the For You feed to **exclude content from minors** unless the viewer is within a predefined age range (e.g., ±2 years of the creator’s age).
   - Introduce **shadow banning** for accounts that repeatedly attempt to bypass age restrictions.

3. **Graph Privacy Enhancements**:
   - Redesign the "following" lists to **hide private accounts** unless the requester is an approved follower.
   - Implement **rate-limiting** on API endpoints that could be used to scrape private account data.

4. **Transparency Reports**:
   - Publish regular **DSA compliance reports** detailing how the platform enforces age-based protections, including metrics on account visibility and content recommendation.

### Legal and Public Relations Strategy

TikTok’s response will likely involve a combination of **technical adjustments** and **public advocacy**. The company may argue that its existing tools—such as **age verification** and **parental controls**—are robust but require user activation. However, the DSA’s opt-out mandate leaves little room for such arguments. TikTok may also seek to **delay enforcement** by requesting additional time to implement changes, though the Commission has shown little patience for such requests in past cases.

From a PR perspective, TikTok could frame these changes as part of a broader **industry-wide effort** to improve child safety, positioning itself as a leader rather than a laggard. However, given the platform’s history of regulatory scrutiny—including bans in several countries—such messaging may struggle to gain traction.

## Broader Implications for Social Media Platforms

### The Shift from Opt-In to Opt-Out

The DSA’s insistence on opt-out protections marks a fundamental shift in how platforms must approach user safety. Historically, many services have relied on **user choice** as a defense against regulatory action, arguing that individuals can customize their settings to enhance privacy. However, the EU’s stance is that **vulnerable users**—particularly children—cannot be expected to navigate complex privacy controls. This philosophy is likely to spread to other areas, such as **data collection**, **ad targeting**, and **content moderation**.

### The Role of Age Verification

One of the biggest challenges for platforms is **accurate age verification**. TikTok, like many services, currently relies on **self-reported birthdates**, which are easily falsified. The DSA does not prescribe specific methods for age verification, but the Commission’s findings imply that **technical solutions**—such as **biometric checks** or **government-issued ID verification**—may become necessary. This raises concerns about **privacy trade-offs** and the potential for **over-collection of sensitive data**.

### The Future of Algorithmic Recommendations

The For You feed’s recommendation of minors’ content highlights a broader debate about **algorithmic amplification**. Critics argue that platforms prioritize engagement over safety, leading to the spread of harmful or exploitative content. The DSA’s focus on **algorithmic transparency** could force platforms to disclose more about how their recommendation systems work, including how they handle **age-based filtering**. This could lead to **new industry standards** for content ranking, with platforms competing to demonstrate their commitment to safety.

## Conclusion

The European Commission’s preliminary findings under the DSA represent a **watershed moment** for child safety on social media. By rejecting TikTok’s opt-in approach, the EU is sending a clear message: **platforms must prioritize safety by default, not by choice**. The technical and legal challenges of complying with these requirements are significant, but the stakes—protecting millions of young users from harm—could not be higher.

For TikTok, the path forward involves **rapid technical adjustments**, **transparent reporting**, and a **proactive engagement** with regulators. For other platforms, the message is equally clear: **compliance with the DSA is not optional**, and the era of self-regulation is over. As the EU continues to enforce its digital rules, the global tech industry will need to adapt—or risk facing **fines, bans, and reputational damage**.

The Verge’s full coverage of this story provides additional context and analysis, available [here](https://www.theverge.com).

---

## FAQ

### **1. What is the Digital Services Act (DSA)?**
The DSA is a landmark EU regulation that came into force in 2024. It imposes **strict obligations** on very large online platforms (VLOPs) to mitigate systemic risks, including **child safety**, **disinformation**, and **illegal content**. Platforms must implement **risk-based safeguards**, **algorithmic transparency**, and **user protection measures** or face **heavy fines**.

### **2. Why is the EU targeting TikTok specifically?**
TikTok is one of the first platforms to undergo a **DSA compliance review** due to its **massive user base** (over 150 million active users in the EU) and its **popularity among minors**. The Commission’s findings suggest that TikTok’s current protections are **insufficient** under the DSA’s opt-out mandate.

### **3. What does “opt-out” vs. “opt-in” mean in this context?**
- **Opt-in**: Users (or parents) must **actively enable** safety features (e.g., setting an account to private).
- **Opt-out**: The **safest settings are applied by default**, and users must **actively disable** them if they choose.
The DSA requires **opt-out protections** for minors, meaning platforms must **automatically apply the highest safety standards** without requiring user action.

### **4. How will TikTok’s changes affect adult users?**
Adult users may see **fewer recommendations** of content from minors in their For You feeds. Additionally, if TikTok implements **stricter age verification**, adults may need to **verify their age** more frequently, which could impact user experience.

### **5. What happens if TikTok fails to comply?**
Non-compliance with the DSA can result in:
- **Fines of up to 6% of global revenue** (potentially **hundreds of millions of euros** for TikTok).
- **Temporary or permanent bans** in the EU market.
- **Reputational damage**, leading to user and advertiser attrition.

### **6. Are other platforms facing similar scrutiny?**
Yes. The DSA applies to **all VLOPs**, including Meta (Facebook, Instagram), Google (YouTube), and X (formerly Twitter). The Commission has already opened **multiple investigations** into these platforms, with child safety being a **key focus area**.

### **7. How can parents ensure their children’s safety on TikTok?**
While platforms must improve their defaults, parents can take additional steps:
- **Enable Family Pairing** to link a child’s account to a parent’s and set controls.
- **Set accounts to private** and review follower requests.
- **Limit screen time** and use **Restricted Mode** to filter mature content.
- **Educate children** about online risks, such as sharing personal information or engaging with strangers.

### **8. Will these changes apply outside the EU?**
The DSA is an **EU regulation**, but its effects are likely to be **global**. Many platforms, including TikTok, may **extend DSA-compliant protections** to users in other regions to **simplify compliance** and **avoid fragmentation**. Additionally, other countries may **adopt similar laws**, making the EU’s approach a **de facto global standard**.

---
**Source:** [*Original Article*](https://www.theverge.com/tech/970519/tiktok-eu-dsa-child-safety-age-account-privacy)


{{< comments >}}
