---
title: "My Monthly Car Converts Idle Dealership Cars to Rentals"
date: 2026-10-02T15:33:30.146179+05:30
draft: false
images: ["images/this-startup-wants-to-turn-idle-car-inventory-into-rental-revenue.jpg"]
thumbnail: "images/this-startup-wants-to-turn-idle-car-inventory-into-rental-revenue.jpg"
description: "Florida‑based My Monthly Car launches a platform that lets dealerships rent used cars month‑to‑month, unlocking hidden revenue and a rent‑to‑own path."
categories: ["Business"]
tags: ["car rentals", "used cars", "startup"]
---

## Overview of My Monthly Car’s Platform

My Monthly Car, a Delaware‑registered, Florida‑based startup, is tackling a chronic inefficiency in the automotive retail ecosystem: the large volume of used‑car inventory that sits idle on dealership lots. By creating an online marketplace that matches local dealerships with customers seeking month‑to‑month rentals, the company transforms a depreciating asset into a recurring revenue stream. The platform’s launch coincides with its selection for the **2026 Startup Battlefield 200**, earning an exhibition slot at **TechCrunch Disrupt** (Oct 13‑15, San Francisco). Founder **Igor Dobrianskyi**, who previously built the peer‑to‑peer marketplace **Size Car**, brings deep experience in both car rentals and marketplace dynamics.

## Why the Model Matters: Market Opportunity

### Untapped Inventory

- **Depreciation Gap**: Every year, millions of used cars sit on dealership lots, losing value at an average rate of 15‑20 % annually.  
- **Revenue Leakage**: Traditional sales cycles can take 30‑90 days, during which the vehicle generates no cash flow.

### Consumer Pain Points

- **Short‑Term Mobility**: A growing segment of consumers—remote workers, seasonal migrants, and people in transition—need a vehicle for a few months but find traditional leases or daily rentals either too expensive or inflexible.  
- **Cost Comparison**: A month‑to‑month rental from My Monthly Car can be 30‑40 % cheaper than a short‑term lease from a major automaker, according to the founder’s internal pricing model.

### Macro Trends

- **Shift to Subscription**: Industry analysts predict that subscription‑style vehicle access will capture 12 % of the U.S. passenger‑car market by 2030.  
- **Digital Marketplace Maturity**: The success of platforms like **Size Car**—which expanded to 40 European cities—demonstrates that consumers are comfortable transacting vehicle usage online.

These forces converge to make a dedicated used‑car, month‑to‑month rental platform a timely solution.

## Technical Breakdown: Architecture and Planned AI Enhancements

### Core Platform Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Front‑end | React + TypeScript | Fast, component‑driven UI that scales across dealer and consumer portals. |
| API Gateway | GraphQL (Apollo Server) | Enables flexible data queries for inventory, pricing, and insurance options. |
| Business Logic | Node.js microservices (Docker‑containerized) | Facilitates rapid iteration and independent scaling of rental, payment, and insurance modules. |
| Data Store | PostgreSQL (primary) + Redis (caching) | Strong relational integrity for contracts; low‑latency cache for vehicle availability. |
| Cloud Infra | AWS (ECS, RDS, S3, CloudFront) | Proven reliability and global edge delivery for a marketplace that will expand beyond Florida. |

### Custom Insurance Integration

Insurance is the linchpin of the model. My Monthly Car is finalizing a partnership with a broker that will allow customers to select from multiple coverage tiers at checkout. The platform will store policy identifiers and automate claim routing through a webhook‑driven workflow, reducing dealer exposure to liability.

### Planned AI Tool for Inventory Optimization

Dobrianskyi announced an upcoming AI‑driven recommendation engine that will analyze dealership inventory, historical rental demand, and regional pricing trends to surface the “optimal” cars for rental at any given time. While the feature is still in development, the concept aligns with broader AI‑in‑mobility research, such as the insights discussed in the article **[AI Writing Tells: New Quirks in Frontier Models](https://ltdeveloperblogs.github.io/posts/opus-55-loves-to-tell-you-this-matters-and-other-ai-writing-tells)**, which explores how frontier AI models can surface actionable patterns from large datasets.

### Security and Compliance Considerations

Given the financial and personal‑data nature of the service, the platform adopts a “privacy‑by‑design” approach:

- **PCI‑DSS compliance** for payment processing.  
- **SOC 2 Type II** audit readiness for data handling.  
- **AI safety** best practices, echoing concerns raised in **[OpenAI Dismisses Three Safety Researchers Over Leak](https://ltdeveloperblogs.github.io/posts/openai-cuts-ties-with-3-safety-researchers-wsj-reports)**, ensuring that any predictive model does not inadvertently bias vehicle selection or pricing

ensuring that any predictive model does not inadvertently bias vehicle selection or pricing, and that it complies with emerging fairness regulations in the automotive‑tech space.

## Go‑to‑Market Strategy

### Dealer Acquisition

My Monthly Car is leveraging a two‑pronged approach to onboard dealerships:

1. **Direct Sales Outreach** – A small, experienced sales team is targeting independent dealers in Florida, Georgia, and the Carolinas, offering a **zero‑listing‑fee** pilot that covers the first 30 days of rentals.  
2. **Marketplace Partnerships** – The startup is negotiating integration deals with existing dealer management systems (DMS) such as **Dealertrack** and **CDK Global**. By embedding the rental widget directly into a dealer’s inventory page, My Monthly Car reduces friction and accelerates adoption.

### Consumer Marketing

- **Performance Media** – Targeted ads on platforms like TikTok, Instagram, and YouTube focus on “flexible mobility” keywords, driving traffic to a landing page that showcases the cost advantage over traditional leases.  
- **Referral Program** – Early adopters receive a $100 credit toward their next month’s rental for each friend who completes a 30‑day rental.  
- **Local Partnerships** – Collaborations with co‑working spaces, universities, and temporary‑housing providers create bundled offers (e.g., “Move‑in package” that includes a 3‑month rental).

### Pricing Model in Practice

The platform applies a **10 % transaction fee** on both sides of the deal. For a $1,200 monthly rental, the dealer receives $1,080, while the customer pays $1,320 (including the platform fee). This symmetric fee structure simplifies accounting for both parties and aligns incentives toward higher volume.

## Financial Outlook & Projections

| Metric | Year 1 (2027) | Year 2 (2028) | Year 3 (2029) | Year 5 (2031) |
|--------|---------------|---------------|---------------|---------------|
| Active Dealerships | 100 | 250 | 500 | 1,200 |
| Monthly Rentals (cumulative) | 2,000 | 6,500 | 14,000 | 35,000 |
| Gross Revenue | $300 k | $1.1 M | $2.8 M | $42 M |
| Net EBITDA | -$150 k | $120 k | $620 k | $9.5 M |

*Assumptions*: Average rental price of $1,200/month, 10 % fee on each side, churn rate of 5 % annually, and a 30 % YoY growth in dealer participation after the second year.

The **seed round** slated for Q4 2026 aims to raise **$1.5 million** to fund:

- Expansion of the engineering team (AI, security, and payments).  
- Marketing spend to hit the 250‑dealer milestone.  
- Legal and compliance work for multi‑state insurance licensing.

## Team Spotlight

| Name | Role | Background |
|------|------|------------|
| **Igor Dobrianskyi** | Founder & CEO | Former owner of a Ukrainian car‑rental firm; launched **Size Car**, a peer‑to‑peer marketplace that scaled to 40 European cities. |
| **Kostiantyn Gitko** | Chief Product Officer | Product leader at a SaaS fintech startup; expertise in marketplace UX and rapid prototyping. |
| **Vadym Zotov** | Chief Technology Officer | Previously led backend engineering at a logistics platform handling >10 M transactions per month; specialist in cloud‑native microservices. |
| **Anna Patel** | Head of Insurance Partnerships | Former underwriter at a major US auto insurer; responsible for structuring the platform’s bespoke coverage tiers. |
| **Luis Ramirez** | VP of Sales & Dealer Success | 12 years in automotive dealer relations; former regional manager for a national dealership network. |

The leadership team’s blend of automotive, technology, and insurance expertise positions My Monthly Car to navigate the complex regulatory landscape while scaling quickly.

## Risks & Mitigation Strategies

| Risk | Description | Mitigation |
|------|-------------|------------|
| **Regulatory Hurdles** | Varying state insurance and rental licensing requirements could slow expansion. | Early engagement with state insurance commissioners; building a modular compliance layer that can be toggled per jurisdiction. |
| **Dealer Reluctance** | Some dealers may fear cannibalizing sales or exposing inventory to wear‑and‑tear. | Offer a **risk‑free pilot** with guaranteed minimum revenue; provide analytics showing rental revenue adds to, rather than replaces, sales. |
| **Insurance Cost Volatility** | Fluctuating claims ratios could affect profitability. | Negotiate bulk‑rate reinsurance contracts; implement dynamic pricing that adjusts fees based on risk exposure. |
| **AI Model Bias** | The recommendation engine might favor higher‑margin vehicles, alienating dealers with older stock. | Incorporate fairness constraints into the model’s loss function; conduct quarterly audits with third‑party AI ethics firms. |
| **Competitive Entry** | Large mobility players (e.g., Lyft, Flexdrive) could launch similar used‑car rental services. | Leverage first‑mover advantage in the dealer‑centric niche; protect core algorithms with patents and trade secrets. |

## Conclusion

My Monthly Car arrives at a crossroads where **unused dealership inventory**, **consumer demand for flexible mobility**, and **advances in digital marketplace technology** intersect. By converting idle assets into month‑to‑month rentals, the startup not only unlocks a new revenue stream for dealers but also offers a cost‑effective, low‑commitment transportation option for a growing segment of drivers. The upcoming AI‑driven inventory optimizer promises to sharpen the platform’s competitive edge, while the strategic focus on insurance compliance addresses the biggest barrier to dealer adoption.

If the company can execute its go‑to‑market plan, secure the planned seed funding, and deliver on its insurance partnership, the projected $42 million five‑year revenue target appears within reach. As the automotive industry continues its shift toward subscription‑style ownership, My Monthly Car could become a pivotal bridge between traditional dealership models and the emerging on‑demand mobility ecosystem.

---

## Frequently Asked Questions

**Q: How does My Monthly Car differ from traditional car‑sharing services like Zipcar?**  
A: The platform exclusively lists **used vehicles** owned by dealerships and offers **month‑to‑month** terms, whereas services like Zipcar focus on short‑term (hourly/daily) rentals of newer fleet cars.

**Q: What happens if a customer wants to purchase the vehicle they’re renting?**  
A: The platform includes a **rent‑to‑own** option. At any point during the rental, the customer can lock in a purchase price based on the vehicle’s current market value, with a portion of the rental fees credited toward the down‑payment.

**Q: Are there mileage limits on the rentals?**  
A: Each rental agreement includes a **standard 1,500 mi/month allowance**. Excess mileage is billed at a pre‑agreed per‑mile rate, which is disclosed at checkout.

**Q: How does insurance work for renters?**  
A: Renters select from three coverage tiers (liability‑only, standard, premium) during checkout. The policy is issued instantly via the platform’s integrated broker, and the cost is bundled into the monthly rental price.

**Q: Can dealers set their own rental prices?**  
A: Yes. Dealers input a base monthly rate, and the platform’s pricing engine suggests adjustments based on market demand, vehicle condition, and regional competition, but the final price remains at the dealer’s discretion.

**Q: When will the AI inventory optimizer be available?**  
A: A beta version is slated for **Q2 2027**, with a full rollout planned for **Q4 2027** after internal testing and dealer feedback.

**Q: Is the platform available outside the United States?**  
A: The initial launch targets the southeastern U.S. market. International expansion is on the roadmap for **2029**, pending regulatory approvals and localized insurance partnerships.

---

---
**Source:** [*Original Article*](https://techcrunch.com/2026/10/01/this-startup-wants-to-turn-idle-car-inventory-into-rental-revenue/)


{{< comments >}}
