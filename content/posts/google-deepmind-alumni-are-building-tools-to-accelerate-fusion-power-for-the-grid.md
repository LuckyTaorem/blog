---
title: "Fusionality: Standardized Controls for Fusion Reactors"
date: 2026-09-11T13:46:37.850051+05:30
draft: false
images: ["images/google-deepmind-alumni-are-building-tools-to-accelerate-fusion-power-for-the-grid.jpg"]
thumbnail: "images/google-deepmind-alumni-are-building-tools-to-accelerate-fusion-power-for-the-grid.jpg"
description: "DeepMind alumni launch Fusionality, a startup offering next‑gen control hardware and AI‑enhanced simulation tools for magnetic‑confinement fusion."
categories: ["Hardware"]
tags: ["Fusion", "Control Systems", "AI"]
---

## The Fusion Control Gap and Fusionality’s Mission

Magnetic‑confinement fusion—whether via tokamaks, stellarators, or compact spherical devices—relies on ultra‑precise regulation of plasma temperature, shape, and fuel density. While the physics of confinement is a research frontier, the engineering of the control loop is surprisingly uniform across projects. Industry insiders estimate that **about 80 % of a fusion reactor’s control system is functionally identical** from one company to the next.  

Enter **Fusionality**, a Lausanne‑based startup founded by former Google DeepMind researchers **Federico Felici** (CEO) and **Jonas Buchli** (CTO). Their vision is simple yet disruptive: provide a plug‑and‑play suite of hardware and software that covers the common 80 % while allowing each fusion venture to focus its engineering effort on the remaining 20 % that differentiates its design. By “speaking the language of fusion,” Fusionality hopes to eliminate the costly, time‑consuming custom‑build approach that currently dominates the sector.

## Why Standardized Controls Matter for the Fusion Supply Chain

### Reducing Capital Expenditure

Building a bespoke control system from the ground up can cost **tens of millions of dollars** in engineering labor, component procurement, and validation testing. For early‑stage fusion startups, this expense competes directly with plasma‑physics research budgets. A standardized platform lowers the entry barrier, enabling more players to allocate capital toward core scientific challenges rather than peripheral hardware integration.

### Accelerating Time‑to‑Experiment

Every iteration of a control loop requires extensive simulation, hardware‑in‑the‑loop testing, and safety certification. Fusionality’s pre‑validated modules cut the iteration cycle from months to weeks, allowing companies like **Commonwealth Fusion Systems** or **Realta Fusion** to run longer plasma shots and gather data faster.

### Enabling a Modular Ecosystem

The “Lego‑block” philosophy—starting with a tightly selected core set of technologies and expanding the library over time—creates a marketplace where third‑party vendors can contribute add‑ons (e.g., advanced diagnostics, specialized power electronics). This modularity mirrors successful ecosystems in the semiconductor and aerospace industries, where standard interfaces drive rapid innovation.

## Technical Breakdown of Fusionality’s Control Systems Suite

### Core Hardware Stack

- **Real‑time FPGA Controllers** – Low‑latency processing units capable of sub‑microsecond response times, essential for magnetic field adjustments.
- **Modular Power‑Conversion Units** – Scalable converters that handle the high‑current demands of superconducting coils while providing precise voltage regulation.
- **Sensor Interface Boards** – Unified drivers for Langmuir probes, magnetic pick‑up coils, and infrared cameras, exposing a common API to higher‑level software.

### Software Layer and Simulation Environments

1. **Control Logic Framework** – A C++/Python hybrid that abstracts hardware specifics behind a deterministic state‑machine model. Developers can plug in custom algorithms for plasma shaping without rewriting low‑level drivers.
2. **AI‑Enhanced Optimization Modules** – Rather than handing over full control to an AI, Fusionality integrates machine‑learning models that **suggest** optimal set‑points for coil currents, anticipate disruptions, and fine‑tune fueling schedules. This approach respects safety constraints while leveraging DeepMind‑style reinforcement learning techniques.
3. **Digital Twin Simulators** – High‑fidelity, GPU‑accelerated models that replicate plasma dynamics and hardware response. Engineers can run “what‑if” scenarios offline, dramatically reducing the need for costly physical trial runs.

### Integration Workflow

1. **Select Core Modules** – Choose the appropriate FPGA board, power unit, and sensor package based on reactor size.
2. **Configure the Control Logic** – Use the provided SDK to map reactor-specific actuators to the generic control API.
3. **Run the Digital Twin** – Validate the configuration against simulated plasma behavior.
4. **Deploy to Hardware** – Upload the compiled control code to the FPGA, connect power modules, and begin live operation.

## Market Landscape: Target Customers and Competitive Position

Fusionality’s immediate addressable market consists of **magnetic‑confinement startups** that have already secured funding but lack in‑house control expertise. Notable prospects include:

- **Commonwealth Fusion Systems** – Working on a high‑temperature superconducting tokamak.
- **Realta Fusion** – Developing a compact, spherical tokamak for commercial power.
- **Proxima Fusion** – Focused on high‑beta plasma configurations.
- **Type One Energy** – Pursuing a low‑cost, modular fusion platform.

These companies share a common pain point: the scarcity of vendors that understand both the **physics of plasma

physics of plasma **and** the demanding real‑time control hardware that keeps it stable. Most existing suppliers specialize in either high‑energy physics instrumentation or generic industrial automation, leaving a gap for a provider that can bridge both worlds. Fusionality positions itself precisely in that niche, offering a “fusion‑first” stack that speaks the language of tokamaks, stellarators and emerging compact concepts alike.

### Competitive Edge

| Feature | Fusionality | Traditional Industrial Automation | Pure‑Play Fusion Labs |
|---------|-------------|-----------------------------------|-----------------------|
| **Fusion‑specific sensor drivers** | ✔︎ | ✘ (generic I/O) | ✔︎ (custom, but limited) |
| **Real‑time FPGA with sub‑µs latency** | ✔︎ (pre‑tuned for coil currents) | ✔︎ (but not plasma‑optimized) | ✘ (built from scratch) |
| **AI‑assisted set‑point recommendation** | ✔︎ (reinforcement‑learning trained on tokamak data) | ✘ | ✔︎ (research prototypes) |
| **Modular, plug‑and‑play hardware** | ✔︎ (standardized connectors, API) | ✔︎ (but not fusion‑ready) | ✘ |
| **Digital twin simulation suite** | ✔︎ (GPU‑accelerated, integrated) | ✘ (separate tools) | ✔︎ (often bespoke) |

By bundling these capabilities, Fusionality reduces the engineering headcount required to bring a control system from concept to commissioning by an estimated **30‑40 %**, according to internal benchmarks shared with investors.

## Funding, Team & Milestones

- **Pre‑seed round:** $3.7 M (CHF 3 M) led by Founderful and Playfair, closed in Q2 2026.  
- **Team:** 7 full‑time engineers and scientists, including two former DeepMind research engineers, an EPFL plasma‑physics postdoc, and senior hardware designers from the aerospace sector.  
- **Milestones achieved:**  
  1. **Prototype validation** on EPFL’s **Tokamak à Configuration Variable (TCV)** testbed – demonstrated stable plasma control for 0.5 s shots using the Fusionality stack.  
  2. **Digital twin release** (v1.0) – open‑source core library with a permissive MIT license, already forked by three external fusion groups.  
  3. **First commercial contract** signed with **Realta Fusion** for a pilot deployment on their compact spherical tokamak, slated for Q1 2027.

The founders stress that the company’s growth strategy is deliberately **lean**: rather than scaling a large manufacturing operation, Fusionality partners with established PCB assemblers and power‑electronics manufacturers, focusing its internal resources on software, system integration and AI model development.

## Roadmap: From Magnetic Confinement to the Wider Fusion Ecosystem

| Timeline | Goal |
|----------|------|
| **H2 2026** | Complete beta testing of the control suite on two external tokamak platforms (Commonwealth Fusion Systems and Proxima Fusion). |
| **H1 2027** | Release **Fusionality Cloud**, a SaaS portal that hosts simulation workloads, model versioning and collaborative experiment tracking. |
| **H2 2027** | Expand hardware catalog to include **laser‑fusion diagnostics** (e.g., fast‑photodiode arrays) and **inertial‑confinement** timing modules, opening the door to non‑magnetic approaches. |
| **2028 onward** | Establish a **Fusion Control Marketplace** where third‑party developers can sell plug‑ins (advanced AI controllers, custom safety interlocks, specialized power‑electronics). |

The roadmap underscores the founders’ belief that **standardization is a catalyst, not a ceiling**; once the core stack is widely adopted, the ecosystem can evolve organically through community contributions.

## Potential Challenges and Risk Mitigation

1. **Regulatory Certification** – Fusion reactors operate under strict safety regimes. Fusionality is proactively engaging with the Swiss Federal Nuclear Safety Inspectorate (ENSI) to align its hardware safety standards with existing nuclear certifications, reducing the time needed for downstream customers to obtain approvals.

2. **Technology Obsolescence** – FPGA and AI hardware evolve rapidly. The company’s modular design allows customers to swap out processing units without rewriting the entire control stack, protecting investments against future chip generations.

3. **Market Adoption** – Convincing well‑funded startups to replace in‑house solutions can be a cultural hurdle. Fusionality mitigates this by offering **pilot‑program financing** (up to $250 k) and a **performance‑based warranty** that refunds a portion of the contract if key uptime metrics are not met during the first six months of operation.

## Conclusion

Fusionality is tackling a **foundational bottleneck** in the emerging fusion industry: the lack of a shared, high‑performance control infrastructure. By leveraging the founders’ DeepMind AI expertise and EPFL’s plasma‑physics heritage, the startup delivers a **plug‑and‑play** hardware‑software ecosystem that promises to cut costs, accelerate experimentation, and foster a collaborative marketplace. If the company can sustain its early momentum and navigate the regulatory landscape, it could become the **de facto “operating system”** for the next generation of fusion reactors—much as Linux did for modern computing.

---

## Frequently Asked Questions (FAQ)

**Q: Is Fusionality’s hardware compatible with existing tokamak designs?**  
A: Yes. The modular interface uses industry‑standard connectors (e.g., VME, PXI) and a unified API that abstracts away the specifics of coil geometry, allowing retro‑fit on most magnetic‑confinement devices.

**Q: How does the AI component avoid taking full control of the reactor?**  
A: The AI modules operate in an advisory capacity. They generate recommended set‑points and disruption‑avoidance alerts, which are then vetted by the deterministic safety controller before being applied to the hardware.

**Q: Will the digital twin be open source?**  
A: The core simulation engine is released under an MIT license, encouraging community contributions. Proprietary extensions (e.g., company‑specific plasma models) remain closed‑source but can be integrated via a plugin architecture.

**Q: What is the expected price point for a full control suite?**  
A: Pricing is tiered based on reactor scale. A compact spherical tokamak can expect a package in the **$1–2 M** range, while larger, superconducting tokamaks may see costs of **$3–5 M**, inclusive of hardware, software licenses and initial support.

**Q: How does Fusionality plan to support non‑magnetic fusion approaches?**  
A: The 2027 roadmap includes dedicated hardware modules for laser‑driven inertial confinement and magnetized target fusion, leveraging the same modular software layer to keep the learning curve low for new entrants.

**Q: Who are the main investors and what do they bring beyond capital?**  
A: Founderful and Playfair lead the pre‑seed round. Both firms specialize in deep‑tech ventures and provide strategic mentorship, access to a network of industrial partners, and assistance with regulatory navigation.

---

*If you’re a fusion startup looking to accelerate your path to the grid, Fusionality’s standardized control platform may be the missing piece that lets you focus on plasma physics rather than custom hardware integration.*

---
**Source:** [*Original Article*](https://techcrunch.com/2026/09/08/google-deepmind-alumni-are-building-tools-to-accelerate-fusion-power-for-the-grid/)


{{< comments >}}
