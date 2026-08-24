---
title: "AI Observatory Uncovers Real Usage Gaps in Chatbots"
date: 2026-08-24T09:56:12.150509+05:30
draft: false
images: ["images/we-still-dont-know-how-people-are-really-using-ai.jpg"]
thumbnail: "images/we-still-dont-know-how-people-are-really-using-ai.jpg"
description: "Independent AI Observatory reveals higher sensitive‑topic usage and longer conversations than company reports, reshaping how we assess generative AI."
categories: ["Artificial Intelligence"]
tags: ["AI usage", "AI Observatory", "Generative AI", "Data Transparency"]
---

## Why Independent Data Matters

The AI market has become a self‑reinforcing narrative loop: companies such as Anthropic, OpenAI, Google, and xAI publish selective usage reports, then analysts cite those numbers to justify product roadmaps and policy positions. The **AI Observatory**, co‑led by **Anka Reuel** (Stanford) and **Shayne Longpre** (MIT), breaks that loop by aggregating **real user‑AI conversations** from seven consent‑based datasets.  

> “There is no independent source to corroborate it.” – *Anka Reuel*

Without an external benchmark, regulators, investors, and researchers are forced to trust corporate PR. The Observatory’s bird’s‑eye view uncovers hidden usage patterns—especially in **sensitive domains** such as health advice, relationship counseling, and even illicit content. Those patterns directly affect risk assessments, content‑moderation policies, and the broader public discourse on AI safety.

The significance extends beyond academic curiosity. When a model is predominantly used for **homework assistance**, as the Observatory finds for ChatGPT, educational institutions must reconsider cheating‑prevention strategies. When **Grok** shows a concentration of misinformation in political queries, platforms need to tighten fact‑checking pipelines. Independent data therefore becomes a prerequisite for responsible AI governance.

## Methodology of the AI Observatory

The Observatory’s strength lies in its **transparent data pipeline**:

| Component | Details |
|-----------|---------|
| **Datasets** | Seven consent‑driven collections, the largest being **Wild Chat**. |
| **Scale** | 24,521 conversations, 85,633 turns, 5,000 unique users (2023‑2025). |
| **Model Coverage** | 52 generative models, including Claude, ChatGPT (GPT‑3.5 & GPT‑4o), Gemini, and Grok. |
| **Analysis Techniques** | Token‑level length metrics, topic classification via fine‑tuned BERT, sentiment and self‑disclosure detection. |
| **Public Access** | All aggregated statistics will be released under an open‑research license. |

The team collaborated with the **Data Provenance Initiative** to ensure provenance metadata (timestamp, consent flag, anonymization level) is preserved. By filtering out proprietary “Economic Index” data—such as Anthropic’s 48 % exclusion of non‑work conversations—the Observatory restores the missing slices of the usage pie.

## Key Findings Across Major Models

### Claude (Anthropic)

- **Reported focus:** Coding and productivity.  
- **Observed reality:**  
  - **Health/relationships:** 44.2 % of Claude chats vs. 31.2 % reported.  
  - **Adult/illicit topics:** 7.9 % vs. 2.1 % reported.  
  - **Harassment/hate:** 27.5 % vs. 5.66 % reported.  
  - **Sexual content:** 16.7 % vs. 2.4 % reported.  

These gaps stem from the **Anthropic Economic Index**, which deliberately filters out non‑work interactions, effectively silencing a large portion of the user base that seeks companionship or emotional support.

### ChatGPT (OpenAI)

- **Model split:** GPT‑3.5 (short, transactional) vs. GPT‑4o (long, iterative).  
- **Usage shift:** GPT‑4o conversations contain **30 % more turns** on average, correlating with anecdotal reports of “emotional addiction.”  
- **Primary tasks:** Homework assistance dominates, contradicting OpenAI’s 2025 claim that only 30 % of consumer usage is work‑related.  

The longer dialogue length raises questions about **session persistence**, data retention policies, and the potential for subtle persuasion over extended interactions.

### Gemini (Google)

- **Dominant use‑case:** Social and role‑play interactions.  
- **Implication:** Users treat Gemini as a conversational partner rather than a tool, suggesting a market for **AI companionship** that is not captured in Google’s product roadmaps.

### Grok (xAI)

- **Primary domain:** News and political queries.  
- **Risk signal:** Higher concentration of misinformation, echoing prior academic findings on AI‑driven political disinformation.  
- **Company response:** xAI declined comment, highlighting the opacity that the Observatory aims to counter.

### Cross‑Model Trends (2023‑2025)

- **Conversation length:** Average token count per turn increased by 22 % across all models.  
- **Small‑talk rise:** Mentions of “how are you?” and “what’s your favorite movie?” grew by 18 %, indicating a shift toward **AI companionship**.  
- **Self‑disclosure drop:** AI admissions of being a chatbot fell from 34 % to 21 %, potentially reducing user awareness of synthetic interlocutors.  
- **Sensitive exchanges:** Overall decline (≈12 %) suggests that moderation improvements are having an effect, but absolute volumes remain non‑trivial.

## Implications for Industry and Policy

### Regulatory Oversight

Regulators can no longer rely on vendor‑supplied dashboards. The Observatory provides a **baseline metric** for compliance audits, especially under emerging AI‑specific legislation that mandates transparency of model usage. For example, the EU’s AI Act could reference independent datasets as “trusted sources” when evaluating high‑risk systems.

### Product Roadmaps

Companies may need to **re‑prioritize safety investments**. Anthropic’s focus on productivity tools must now accommodate a sizable user segment seeking emotional support, which carries distinct privacy and liability considerations. OpenAI’s emphasis on “work‑related” features may be misaligned with the reality of homework‑centric usage, prompting a rethink of educational‑partner strategies.

### Content Moderation

The higher prevalence of harassment, hate, and sexual content in Claude conversations underscores the necessity for **robust, real‑time moderation pipelines**. The Observatory’s granular breakdown can inform the calibration of toxicity classifiers, reducing false negatives that arise from domain‑specific language.

### Competitive Landscape

The data also reveals **model‑specific niches**: Gemini excels in role‑play, Grok in political fact‑checking, Claude in code assistance. Competitors can leverage these insights to differentiate their offerings or to acquire complementary datasets that fill gaps in their own usage profiles.

For a broader perspective on how AI usage shapes infrastructure, see our earlier analysis of AI’s impact on data centers and robotaxis: [https://ltdeveloperblogs.github.io/posts/the-download-how-people-really-use-ai-and-flocks-design-choices](https://ltdeveloperblogs.github.io/posts/the-download-how-people-really-use-ai-and-flocks-design-choices)

## Technical Challenges and Future Directions

### Data Quality and Consent

Collecting real‑world conversations while respecting user privacy is non‑trivial. The Observatory’s reliance on **explicit consent** limits scale but ensures ethical compliance. Future work may explore **privacy‑preserving aggregation** (e.g., differential privacy) to broaden coverage without sacrificing user rights.

### Model Identification

Distinguishing between closely related model versions (e.g., GPT‑4o vs. GPT‑4 Turbo) requires **fingerprinting techniques** based on token distribution and response latency. Improving these methods will sharpen the granularity of usage reports.

### Longitudinal Analysis

The current dataset spans 2023‑2025. Extending the timeline will enable **trend forecasting**, such as predicting when companionship‑driven usage overtakes productivity‑driven usage. Coupling this with external signals (e.g., macro‑economic data) could reveal causal relationships.

### Open‑Source Collaboration

The Observatory plans to release its **analysis scripts** under an open‑source license, inviting the community to replicate findings or apply the pipeline to new datasets. This collaborative model mirrors the success of the **Data Provenance Initiative** and could become a standard for AI transparency.

For readers interested in how AI is being embedded into consumer hardware, check out Apple’s visual‑intelligence rollout: [https://ltdeveloperblogs.github.io/posts/apples-camera-equipped-airpods-confirmed-see-them-in-action](https://ltdeveloperblogs.github.io/posts/apples-camera-equipped-airpods-confirmed-see-them-in-action)

## Frequently Asked Questions

**Q1: How does the AI Observatory obtain user consent?**  
A: Each dataset originates from platforms that present a clear opt‑in dialog, explaining that conversation logs will be anonymized and used for research. Users can withdraw consent at any time, triggering deletion of their data from the repository.

**Q2: Are the findings publicly verifiable?**  
A: Yes. The Observatory will publish aggregated statistics, code for classification, and a DOI‑linked data package. Independent auditors can reproduce the analysis using the provided scripts.

**Q3: Does the Observatory cover non‑English conversations?**  
A: The current release focuses on English‑language chats, but the pipeline is language‑agnostic. Future expansions aim to incorporate multilingual datasets, especially from regions where AI adoption is rapidly growing.

**Q4: How do the findings affect end‑users?**  
A: Users gain awareness that AI systems may retain longer conversation histories and that their interactions could fall into categories (e.g., health advice) that carry higher privacy risks. Informed users can adjust settings or seek alternative tools.

**Q5: What should companies do in response to these discrepancies?**  
A: Companies should publish **full usage distributions**, not just filtered economic indices, and invest in transparent reporting frameworks. Aligning internal analytics with external benchmarks will improve trust and regulatory compliance.

---

The AI Observatory’s first release demonstrates that **the narrative presented by AI labs is only a slice of reality**. By exposing higher rates of sensitive interactions, longer conversational threads, and model‑specific usage patterns, the project forces the industry to confront the true breadth of generative AI’s impact. As more independent datasets become available, stakeholders—from policymakers to product managers—will be equipped to make decisions grounded in empirical evidence rather than corporate storytelling.

---
**Source:** [*Original Article*](https://www.technologyreview.com/2026/08/18/1142226/how-people-use-ai/)


{{< comments >}}
