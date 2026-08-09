---
title: "Flock Safety’s Dashcam Plan, Police Coaching & Privacy"
date: 2026-08-09T21:29:51.611737+05:30
draft: false
images: ["images/flocks-plans-for-rideshare-dashcams-and-coaching-police-revealed.jpg"]
thumbnail: "images/flocks-plans-for-rideshare-dashcams-and-coaching-police-revealed.jpg"
description: "Explore Flock Safety’s plan to pull rideshare dashcam plates, alleged ICE ties, and a police coaching guide that reshapes city council pitches."
categories: ["Security"]
tags: ["surveillance", "privacy", "dashcam"]
---

## The Rideshare Dashcam Integration Plan

In August, a sales presentation obtained by 404 Media revealed a bold pivot by Flock Safety: moving from static, pole‑mounted cameras to a **roving collection** of license‑plate data harvested from dashcams installed in rideshare and delivery vehicles. The partnership, slated to involve **350,000 Nexar devices**, would have turned every Uber, Lyft, and delivery driver into a mobile data point for Flock’s license‑plate recognition (LPR) network.

### How the plan was supposed to work
- **Hardware**: Nexar’s dashcams already capture forward‑facing video for driver safety and insurance purposes.  
- **Software overlay**: An undisclosed firmware update would have streamed anonymized plate hashes to Flock’s cloud, augmenting the company’s existing fixed‑camera database.  
- **Scale**: With 350 k devices, the network could have covered millions of miles per day, dramatically increasing coverage in suburban and rural areas where pole cameras are sparse.

### Red flags in the proposal
- **Driver awareness**: The presentation made no mention of informing drivers that their cameras would feed a third‑party surveillance system.  
- **Legal consent**: Existing state privacy statutes (e.g., Illinois’ Biometric Information Privacy Act) treat license‑plate data as personal information, requiring explicit consent for collection and sharing.  
- **Security precedent**: Nexar suffered a massive breach in September, exposing terabytes of video that included footage near Defense Department installations. The breach underscores the risk of adding another data sink to an already vulnerable platform.

The company now claims the partnership “never went through,” but the existence of the presentation raises serious questions about intent, risk assessment, and corporate governance.

## Deceptive Government Partnerships and ICE Allegations

Former government‑affairs manager **Jonathan Paz** quit in July 2025, refusing both equity and severance, and blew the whistle on what he describes as a two‑track strategy: publicly denying any work with immigration enforcement while secretly providing **direct camera access** to ICE and Customs & Border Protection (CBP) through a pilot program.

### Key allegations
- **Hidden pilot**: Flock allegedly granted ICE and CBP real‑time access to live feeds from its pole cameras, bypassing the usual data‑retention and anonymization safeguards.  
- **Public denial**: Internal memos instructed staff to tell external partners that the company “does not work with ICE,” creating a false narrative for investors and the media.  
- **Strategic motive**: By offering law‑enforcement agencies a ready‑made LPR feed, Flock positioned itself as an indispensable tool for immigration enforcement, potentially unlocking lucrative federal contracts.

If substantiated, these claims could trigger investigations by the **Georgia Attorney General’s Office**, the **Department of Justice**, and state privacy regulators. The alleged deception also threatens Flock’s credibility with municipal customers that have already expressed concerns about civil‑rights implications.

## Police Coaching Guide: Shaping Municipal Approval

Beyond the technology itself, Flock supplied a **“coaching guide”** to police departments seeking city‑council funding. The guide outlines a playbook for influencing elected officials, emphasizing narrative control over fiscal transparency.

### Tactical instructions
- **Private briefings**: Officers are instructed to meet council members and city managers **before** any public hearing, allowing them to set the agenda in a closed setting.  
- **Scripted presentations**: A pre‑written slide deck frames the conversation around “the cost of unresolved crime” rather than the system’s purchase price.  
- **Cost reframing**: By shifting focus from the $X million price tag to potential savings from reduced crime, the guide attempts to sidestep budgetary scrutiny.

This approach mirrors tactics discussed in the **YouTube Fights AI Slop with New Monetization Rules** article, where platform operators use scripted messaging to steer public perception. It also resonates with the **X Algorithm Update Prioritizes Replies** piece, which highlights how algorithmic nudges can shape user behavior—here, the “algorithm” is a human‑crafted script designed to nudge council votes.

## Technical and Privacy Implications

### Data flow architecture
1. **Capture** – Nexar dashcam records video at 30 fps, storing locally on an encrypted SD card.  
2. **Edge processing** – An on‑device LPR model extracts plate numbers, hashes them, and discards raw imagery.  
3. **Transmission** – Encrypted TLS tunnels send the hash to Flock’s API endpoint.  
4. **Aggregation** – Flock merges mobile hashes with its fixed‑camera database, enriching match confidence.

While the pipeline appears privacy‑by

-design, the hashing step is reversible if Flock retains a lookup table—a practice that would violate the principle of data minimization under GDPR and similar state laws.

### Civil-liberties concerns
- **Chilling effect**: Ubiquitous plate tracking can deter lawful protest, religious gatherings, or visits to sensitive locations (clinics, LGBTQ+ centers).
- **Mission creep**: Data collected for traffic enforcement is routinely repurposed for immigration raids, debt collection, and insurance investigations.
- **Algorithmic bias**: LPR systems have higher error rates for plates from lower-income neighborhoods and communities of color, exacerbating existing disparities in policing.

## Regulatory and Legal Landscape

### Current statutes
- **State-level**: Illinois, California, and Washington have passed laws requiring consent for plate data collection. Flock’s proposed dashcam integration would likely run afoul of these statutes.
- **Federal**: The Fourth Amendment’s “mosaic theory” (recently cited in *Carpenter v. United States*) suggests that long-term tracking of public movements may constitute a search, requiring a warrant.

### Pending legislation
- **S.1214 (License Plate Privacy Act)**: Would mandate opt-in consent for commercial LPR collection and impose strict retention limits.
- **H.R.4502 (Facial Recognition and Biometric Technology Moratorium Act)**: While focused on facial recognition, its principles could extend to plate data if courts rule that plates are personally identifiable.

## Corporate Response and Damage Control

Flock Safety’s public statements have been carefully parsed:
- **Dashcam plan**: “The partnership never went through” is technically true, but the presentation’s existence suggests the company explored the idea in earnest.
- **ICE allegations**: Flock has not directly addressed Paz’s claims, instead issuing a generic statement about “compliance with all applicable laws.”
- **Coaching guide**: The company frames the document as “best practices for community engagement,” sidestepping questions about its scripted nature.

Investors and municipal clients are now demanding audits of Flock’s data-sharing agreements, particularly with federal agencies. The Georgia Attorney General’s Office has reportedly opened an inquiry into potential deceptive trade practices.

## What’s Next for Flock and the Surveillance Industry

### Short-term fallout
- **Municipal contracts**: Cities like Oakland and Berkeley, which have banned government use of LPR, may accelerate divestment from Flock.
- **Driver lawsuits**: If the Nexar partnership had proceeded, class-action suits under BIPA and similar laws would have been inevitable.
- **Federal scrutiny**: The Department of Homeland Security’s Office of Inspector General may investigate whether Flock misrepresented its ICE ties to secure grants.

### Long-term trends
- **Roving surveillance**: The dashcam model is likely to resurface, either through Flock or competitors like Motorola Solutions and Rekor. The economics are too compelling: a $200 dashcam can replace a $10,000 pole camera.
- **Regulatory arbitrage**: Companies may shift operations to states with weaker privacy laws, creating a patchwork of surveillance intensity across the U.S.
- **Public pushback**: Grassroots coalitions like the Electronic Frontier Foundation and Mijente are already organizing “Ban the Scan” campaigns targeting LPR vendors.

## Conclusion: A Surveillance Ecosystem in Flux

Flock Safety’s revelations underscore a critical inflection point in the expansion of mass surveillance. The company’s attempt to harness rideshare dashcams—without driver consent—exposes the fragility of privacy in an era of ubiquitous sensors. Meanwhile, its alleged duplicity with ICE and the coaching guide’s manipulative tactics reveal a corporate playbook that prioritizes growth over transparency.

For policymakers, the path forward is clear: strengthen consent requirements, enforce data-minimization principles, and ban the use of LPR for immigration enforcement. For the public, the lesson is equally urgent: every camera, whether mounted on a pole or a dashboard, is a potential node in a network that can track your movements without your knowledge.

The question now is whether Flock’s stumbles will catalyze meaningful reform—or merely accelerate the normalization of a surveillance state where every car is a spy, and every street a panopticon.

---

## FAQ

### **1. What exactly was Flock Safety trying to do with rideshare dashcams?**
Flock proposed integrating license plate recognition (LPR) software into 350,000 Nexar dashcams installed in Uber, Lyft, and delivery vehicles. The goal was to create a “roving collection” of plate data, supplementing its fixed-camera network. Drivers would not have been notified that their cameras were feeding Flock’s system.

### **2. Did the dashcam partnership actually happen?**
Flock claims the partnership “never went through,” but the existence of an internal sales presentation suggests the company actively pursued the idea. The proposal was presented to the Georgia Attorney General’s Office in August (year unspecified).

### **3. What are the privacy risks of this plan?**
- **Driver consent**: No indication drivers would have been informed or given opt-out options.
- **Data security**: Nexar suffered a major breach in September, exposing terabytes of video, including footage near Defense Department sites.
- **Mission creep**: Plate data collected for traffic enforcement is often repurposed for immigration raids, debt collection, and insurance investigations.

### **4. What did the whistleblower, Jonathan Paz, allege?**
Paz, a former government affairs manager, quit in July 2025 and alleged that Flock:
- Provided ICE and CBP with direct access to live camera feeds via a pilot program.
- Instructed staff to publicly deny working with ICE while secretly collaborating with the agency.
- Engaged in deceptive practices that could violate state and federal laws.

### **5. What is the “police coaching guide,” and why is it controversial?**
The guide is a playbook for police departments to secure city council approval for Flock’s systems. It includes:
- **Private briefings**: Officers are told to meet council members before public hearings to control the narrative.
- **Scripted presentations**: A pre-written slide deck frames the conversation around “the cost of unresolved crime” rather than the system’s price.
- **Tactical messaging**: The guide encourages shifting focus from financial costs to emotional appeals about crime reduction.

### **6. How does this relate to existing privacy laws?**
- **State laws**: Illinois, California, and Washington require consent for plate data collection. Flock’s plan would likely violate these statutes.
- **Federal precedent**: The Supreme Court’s *Carpenter v. United States* ruling suggests long-term tracking of public movements may require a warrant.
- **Pending legislation**: Bills like the License Plate Privacy Act (S.1214) could mandate opt-in consent and strict retention limits.

### **7. What are the broader implications for surveillance in the U.S.?**
- **Normalization of roving surveillance**: The dashcam model could become standard, turning private vehicles into data-collection nodes.
- **Regulatory patchwork**: Companies may relocate to states with weaker privacy laws, creating uneven surveillance landscapes.
- **Public resistance**: Grassroots campaigns like “Ban the Scan” are gaining traction, pressuring cities to divest from LPR vendors.

### **8. What can individuals do to protect their privacy?**
- **Opt out**: If your vehicle has a dashcam, check the manufacturer’s privacy policy and opt out of data-sharing programs.
- **Advocate**: Support local and state legislation that requires consent for LPR data collection.
- **Stay informed**: Follow organizations like the Electronic Frontier Foundation (EFF) and Mijente for updates on surveillance reform efforts.

---
**Source:** [*Original Article*](https://www.wired.com/story/flocks-plans-for-rideshare-dashcams-and-coaching-police-revealed/)


{{< comments >}}
