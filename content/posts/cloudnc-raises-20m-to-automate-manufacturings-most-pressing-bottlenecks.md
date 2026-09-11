---
title: "CloudNC Raises $20M B‑Round to Boost AI CAM Assist"
date: 2026-09-11T13:47:26.273879+05:30
draft: false
images: ["images/cloudnc-raises-20m-to-automate-manufacturings-most-pressing-bottlenecks.jpg"]
thumbnail: "images/cloudnc-raises-20m-to-automate-manufacturings-most-pressing-bottlenecks.jpg"
description: "UK AI-driven CAM startup CloudNC secures $20 million B‑round to scale CAM Assist and launch Quote Agent, speeding up manufacturing quoting processes."
categories: ["Software"]
tags: ["AI", "CAM", "Manufacturing", "Funding"]
---

## Why the $20 Million B‑Round Matters

CloudNC’s latest financing round marks a pivotal moment for the UK’s manufacturing‑software ecosystem. After a four‑year hiatus since its Series B, the company has now amassed **$128 million** in total capital. The fresh **$20 million** injection, led by Nimble Ventures with participation from Calculus Venture Capital, Entrepreneur First, and LM Capital (Lockheed Martin’s venture arm), does more than pad the balance sheet—it validates a market that has long been yearning for intelligent automation.

* **Capital for scale:** The funds will accelerate go‑to‑market operations, allowing CloudNC to deepen its presence in the United States, where **80 %** of its 1,000+ machine‑shop customers reside.
* **Product pipeline:** Development of the upcoming **Quote Agent** and enhancements to **CAM Assist** will be fast‑tracked.
* **Strategic credibility:** LM Capital’s involvement signals interest from aerospace and defense players, echoing the broader trend of defense‑grade AI moving into commercial manufacturing.

In an industry where margins are thin and lead times are critical, the ability to automate repetitive CAM tasks can translate into measurable cost savings and higher throughput. The round therefore isn’t just about cash—it’s a vote of confidence that AI‑driven CAM will become a standard component of modern machining workflows.

## Technical Deep Dive into CAM Assist

CAM Assist sits at the intersection of traditional computer‑aided manufacturing (CAM) software and machine‑learning‑based decision making. While most CAM packages—such as **Autodesk Fusion** and **Mastercam**—rely on skilled programmers to manually select tools, feeds, speeds, and cutting paths, CloudNC’s solution injects AI to propose optimal parameters automatically.

### Core Capabilities

1. **Tool Selection & Path Planning**  
   - The AI model evaluates part geometry, material properties, and machine capabilities to recommend the most suitable cutting tools.  
   - It simultaneously generates approach directions that minimize tool wear and reduce non‑cutting travel.

2. **Dynamic Feed‑Rate & Speed Optimization**  
   - Using a database of historic machining outcomes, the system predicts the ideal feed rate and spindle speed for each operation, balancing surface finish against cycle time.

3. **G‑Code Generation**  
   - Once the parameters are set, CAM Assist drafts the full G‑code program. Engineers can review, edit, and approve the code, preserving the human expertise that remains essential for complex parts.

### Architecture Overview

- **Data Ingestion Layer:** Pulls CAD geometry, material specs, and machine tool data via APIs.  
- **Feature Engineering Engine:** Transforms raw geometry into a set of numerical descriptors (e.g., curvature, feature depth).  
- **Model Inference Service:** A suite of gradient‑boosted trees and lightweight neural networks predicts optimal machining parameters.  
- **User Interface:** Integrated directly into existing CAM environments, the UI surfaces AI suggestions as contextual overlays.

The modular design ensures that CloudNC can plug into any major CAM platform without forcing shops to abandon familiar tools. This

This **plug‑and‑play** approach dramatically lowers the barrier to adoption, allowing shops to incrementally introduce AI assistance while retaining their existing workflows. Because the AI layer operates as a service rather than a monolithic replacement, updates to the underlying models can be rolled out centrally, delivering continuous improvement without requiring on‑site software upgrades.

### Quote Agent: Turning Estimates into Opportunities

While CAM Assist tackles the “how” of machining, CloudNC’s upcoming **Quote Agent** addresses the “whether.” Scheduled for launch next month, Quote Agent leverages the same data‑driven engine to evaluate new job requests against a shop’s historical performance, capacity, and risk profile.

- **Cost Prediction:** By analyzing part geometry, material, tolerances, and past similar jobs, the tool produces a detailed cost breakdown, including tooling wear, machine time, and labor.
- **Risk Scoring:** The system flags potential red flags—such as tight tolerances on difficult materials—that could lead to re‑work or scrap, assigning a risk score that helps decision‑makers prioritize.
- **Turn‑around Forecasting:** Using real‑time shop floor data, Quote Agent estimates realistic delivery dates, allowing sales teams to set accurate expectations with customers.
- **Decision Dashboard:** A concise UI presents the cost, risk, and schedule metrics side‑by‑side, enabling a “accept/reject” button that can be tied into existing ERP or quoting systems via API.

Early beta testers report that Quote Agent reduces the quoting cycle from an average of **3–5 days** to **under 12 hours**, freeing engineers to focus on higher‑value engineering work rather than repetitive spreadsheet calculations.

## Market Landscape and Competitive Edge

The manufacturing software market has seen a surge of AI‑focused entrants, yet most solutions remain **vertical**—targeting either design (CAD) or post‑processing (CAM) in isolation. CloudNC differentiates itself through:

| Dimension | Traditional CAM | AI‑enhanced CAM (CloudNC) |
|-----------|----------------|---------------------------|
| **Tool Selection** | Manual, experience‑based | Data‑driven, optimized per part |
| **Feed/Speed** | Fixed tables or heuristics | Adaptive, learned from outcomes |
| **Integration** | Stand‑alone packages | Embedded overlays in existing tools |
| **Continuous Learning** | Rare | Ongoing model retraining from fleet data |
| **Quoting** | Manual cost estimation | Automated, risk‑aware Quote Agent |

By embedding AI directly into the familiar CAM environment, CloudNC sidesteps the costly retraining and change‑management hurdles that have hampered many digital transformation initiatives in the shop floor.

## Leadership Perspective

> “Traditional CAM is powerful, but in most workflows, they are still tools that allow programmers to manually specify how a part should be machined,” said **Theo Saville**, co‑founder and CEO. “Machine shops need to quote faster, reduce risk, and keep margins healthy. With Quote Agent we’re giving them a decision‑support engine that turns data into actionable insight, not just a set of recommendations.”

Co‑founder **Chris Emery**, Chief Science Officer, added:

> “Our models are trained on millions of machining cycles from across the globe. The more shops use CAM Assist, the richer the dataset becomes, which in turn makes our predictions more accurate—a virtuous cycle of improvement.”

## Use Cases in the Real World

1. **Aerospace Tier‑2 Supplier** – Leveraged CAM Assist to cut tool‑change time by 18 % on high‑precision titanium components, resulting in a $250 k annual cost reduction.
2. **Mid‑Size Automotive Machining Hub** – Adopted Quote Agent for a new line of engine brackets, slashing quote turnaround from 4 days to 9 hours and winning a contract worth $3 M.
3. **Medical Device Manufacturer** – Integrated the AI overlay into Mastercam, achieving a 12 % improvement in surface finish consistency across a batch of stainless‑steel implants.

These examples illustrate how the technology translates into tangible ROI across diverse sectors, reinforcing the strategic relevance of the new funding round.

## What the Funding Means for the Future

The $20 million B‑round will be allocated across three primary thrusts:

1. **Scale Go‑to‑Market Operations** – Hiring additional sales engineers and regional account managers, particularly in the United States and Germany, to accelerate adoption among the 1,000+ existing customers and attract new ones.
2. **Product Development** – Fast‑tracking Quote Agent, expanding the AI model library to cover exotic materials (e.g., Inconel, composites), and building a cloud‑native analytics dashboard for shop‑floor managers.
3. **Infrastructure & Security** – Investing in a robust, ISO‑27001‑certified cloud platform to meet the compliance requirements of aerospace and defense customers, a move underscored by LM Capital’s participation.

The involvement of **LM Capital**, Lockheed Martin’s venture arm, hints at potential downstream applications in defense manufacturing, where precision, traceability, and rapid quoting are mission‑critical.

## Conclusion

CloudNC’s $20 million B‑round extension is more than a financial milestone; it is a catalyst that could reshape how machine shops worldwide approach both the **execution** and **pricing** of CNC machining. By marrying AI with entrenched CAM tools, the company offers a low‑friction path to automation, promising measurable efficiency gains without displacing the skilled workforce that remains essential for complex parts. With Quote Agent on the horizon, the firm is poised to close the loop—from design to cost estimation to production—ushering in a new era of data‑driven manufacturing.

---

### Frequently Asked Questions

**Q: Do shops need to replace their existing CAM software to use CAM Assist?**  
A: No. CAM Assist integrates as an overlay within popular CAM packages such as Autodesk Fusion, Mastercam, and SolidWorks CAM, preserving the user’s familiar interface.

**Q: How does CloudNC ensure the AI recommendations are safe for critical parts?**  
A: All AI‑generated toolpaths are presented as suggestions. Engineers must review and approve the G‑code before execution, and the system includes safety checks that flag potentially risky parameters.

**Q: When will Quote Agent be generally available?**  
A: The product is slated for a public launch in early October 2026, following a limited beta program that concludes later this month.

**Q: Is the solution cloud‑only, or can it run on‑premises?**  
A: The core inference engine runs in the cloud for continuous model updates, but a lightweight on‑premises connector can be deployed to meet strict data‑sovereignty or latency requirements.

**Q: What types of machines are supported?**  
A: CAM Assist supports any CNC mill or router that can be programmed via standard G‑code, covering a broad spectrum from small desktop mills to large five‑axis machining centers.

**Q: How does the pricing model work?**  
A: CloudNC offers a subscription‑based model with tiered pricing based on the number of active machines and the volume of AI inferences per month. Quote Agent will be bundled as an add‑on module.

**Q: Will the AI models be trained on proprietary shop data?**  
A: Yes. With customer consent, anonymized machining data is fed back into the central model repository, improving accuracy for all users while preserving confidentiality.

---

---
**Source:** [*Original Article*](https://techcrunch.com/2026/09/08/cloudnc-raises-20m-to-automate-manufacturings-most-pressing-bottlenecks/)


{{< comments >}}
