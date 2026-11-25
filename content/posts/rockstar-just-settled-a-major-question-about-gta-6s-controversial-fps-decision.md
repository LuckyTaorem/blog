---
title: "Rockstar Confirms GTA 6 Won’t Reach 60 FPS on PS5 Pro"
date: 2026-11-26T05:15:07.605451+05:30
draft: false
images: ["images/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision.jpg"]
thumbnail: "images/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision.jpg"
description: "Rockstar says GTA 6 will run locked at 30 fps on PS5 Pro due to CPU limits, despite 1440p rendering, ray‑traced shadows and near‑4K upscaling."
categories: ["Gaming"]
tags: ["GTA 6", "PS5 Pro", "frame rate", "Rockstar", "CPU bottleneck"]
---

## The Core Announcement: 30 FPS Is the Ceiling

Rockstar Games has officially confirmed that *Grand Theft Auto VI* will not support a 60 fps (or even a 40 fps) mode on any current‑generation console, including the newly released PlayStation 5 Pro. The decision stems from a hard CPU bottleneck that prevents the game’s massive simulation systems—from AI‑driven pedestrians to dynamic wildlife—from running at higher frame rates. As Marc Chambers, Rockstar’s technology production director, put it, the hardware “is not powerful enough to run the game’s complex simulation at higher frame rates.”

The console‑specific breakdown is as follows:

| Platform | Resolution & Upscaling | Visual Features | Frame‑Rate Target |
|----------|------------------------|-----------------|-------------------|
| **PS5 Pro** | Native 1440p, upscaled to near‑4K via PSSR | Ray‑traced shadows, sharper textures | Locked 30 fps with “perfect frame pacing” |
| **Base PS5** | 1440p (softer image) | Same visual set, but less refined | Mostly 30 fps, occasional dips to mid‑20s |
| **Xbox Series X|S** | Not detailed, launch‑ready | Expected parity with PS5 Pro | Presumed 30 fps lock |
| **Xbox One (cloud)** | Streamed | Same visual fidelity as console builds | Dependent on network, likely 30 fps |

Digital Foundry hailed the visual fidelity as a “landmark achievement in visual realism,” but the frame‑rate limitation has already sparked heated debate across the gaming community.

## Technical Breakdown: Why the CPU Is the Bottleneck

### 1. Simulation Complexity

*GTA 6* pushes the envelope of open‑world simulation. The game world features:

- **Dynamic bird flocks** that react to player actions and weather.
- **Advanced traffic AI** that models realistic driver behavior.
- **Procedural weather and lighting** that change in real time.

All of these systems rely heavily on CPU cycles. Even if ray tracing were disabled, the CPU would still be tasked with updating millions of entities each frame. The PS5 Pro’s Zen 2‑based CPU, while a modest upgrade over the base PS5, does not provide enough headroom to double the frame‑rate without sacrificing simulation depth.

### 2. Memory Bandwidth Constraints

The console’s 16 GB GDDR6 pool must juggle texture streaming, physics calculations, and AI state data simultaneously. Higher frame rates would increase the frequency of memory reads/writes, pushing the bandwidth beyond its comfortable operating envelope. Rockstar opted to keep the visual pipeline intact and lock the frame rate, preserving the intended level of world detail.

### 3. Rendering Pipeline Choices

Rockstar leverages **PlayStation’s PSSR (Pixel‑Streaming Super Resolution)** to upscale 1440p renders to a near‑4K output. This technique offloads part of the upscaling work to the GPU, but the initial 1440p render still demands a full‑resolution raster pass with ray‑traced shadows. The GPU can handle this at 30 fps, but the CPU cannot keep pace with the

the sheer volume of AI updates, physics calculations, and world‑state synchronisation required each tick. Even with aggressive GPU‑side optimisations, the CPU becomes the limiting factor, forcing Rockstar to cap the game at a stable 30 fps to preserve the depth of the simulation.

### 2. Potential Workarounds and Future Updates

Rockstar has hinted that the 30 fps lock is a **design decision rather than a hard technical ceiling**. This opens the door for possible post‑launch patches that could tweak the balance between visual fidelity and frame‑rate.

- **Dynamic Simulation Scaling:** By reducing the number of active AI agents or simplifying flock‑behaviour during intense combat sequences, the CPU load could be lowered enough to allow occasional 40 fps bursts without a noticeable loss of immersion.
- **Selective Ray‑Tracing Toggle:** While the current build ships with ray‑traced shadows enabled by default, a hidden graphics‑settings menu could let power users disable them, freeing GPU bandwidth for a higher frame‑rate target.
- **Hybrid CPU‑GPU Offload:** Sony’s upcoming **PS5 Pro SDK updates** may expose new APIs for delegating certain physics calculations to the GPU’s compute cores, a technique already used in titles like *Horizon Forbidden West* for particle simulations.

Rockstar’s engineering team has not ruled out any of these avenues, but they have also stressed that any changes must not compromise the “living‑world” experience that defines the series.

### 3. Community Reaction

The announcement sparked a flurry of discussion across Reddit, Twitter, and gaming forums. Key takeaways include:

- **Frustration Over Missed Expectations:** Many players who pre‑ordered the PS5 Pro specifically for a “next‑gen 60 fps experience” expressed disappointment, citing the console’s premium price point.
- **Appreciation for Visual Fidelity:** A sizable portion of the community praised the decision to retain ray‑traced shadows and near‑4K upscaling, arguing that a smoother frame‑rate would have come at the cost of the game’s ambitious world‑building.
- **Calls for a PC Release:** The lack of an official PC launch window intensified speculation that a later PC port could finally unlock the higher frame‑rates that console players are missing.

Digital Foundry’s post‑mortem video, which broke down the performance metrics, received over 2 million views within 48 hours, underscoring the high level of interest.

### 4. What This Means for Next‑Gen Gaming

Rockstar’s stance highlights a broader industry trend: **the shift from raw frame‑rate targets to holistic world simulation**. As open‑world titles become more complex, developers are forced to make trade‑offs between visual polish, AI depth, and smoothness.

- **CPU‑Centric Bottlenecks:** Even with powerful GPUs, the next generation of consoles may still be constrained by their CPU architectures, especially when games aim for “living‑world” fidelity.
- **Importance of Upscaling Tech:** Techniques like Sony’s **Pixel‑Streaming Super Resolution (PSSR)** and AMD’s **FidelityFX Super Resolution (FSR)** become crucial for delivering high‑resolution images without overtaxing the GPU, allowing developers to allocate more CPU cycles to gameplay systems.
- **Potential for Future Hardware Iterations:** The feedback loop from GTA 6 could influence the design of a future “PS5 Pro 2” or Xbox “Series X 2”, with a stronger emphasis on multi‑core CPU performance and higher memory bandwidth.

## Conclusion

Rockstar’s decision to lock *Grand Theft Auto VI* at 30 fps on the PS5 Pro—and by extension on all current‑gen consoles—reflects a deliberate prioritisation of **simulation depth and visual fidelity over raw frame‑rate**. While this choice has divided the community, it also sets a precedent for how next‑generation titles may balance the competing demands of CPU‑heavy world systems and GPU‑driven graphics pipelines.

Whether future patches will unlock higher frame‑rates, or a PC version will finally deliver the coveted 60 fps experience, remains to be seen. For now, players can expect a visually stunning, richly simulated world that runs consistently at 30 fps, with “perfect frame pacing” ensuring a smooth and immersive ride through Vice City’s neon‑lit streets.

## FAQ

**Q: Will GTA 6 ever receive a 60 fps mode on consoles?**
A: Rockstar has stated that the current hardware limitations make a native 60 fps mode unfeasible without sacrificing core simulation features. A future patch could introduce a performance‑oriented mode, but no official roadmap has been announced.

**Q: Does the PS5 Pro’s upgraded CPU help at all?**
A: The PS5 Pro’s slightly faster Zen 2 cores provide modest improvements, but the bottleneck lies in the sheer number of AI and physics calculations, which still exceed the console’s CPU capacity at higher frame‑rates.

**Q: Will the PC version (if and when it arrives) run at 60 fps?**
A: Historically, Rockstar releases PC ports with higher frame‑rate ceilings and configurable graphics settings. Assuming a PC build with a modern multi‑core CPU and a capable GPU, a 60 fps experience is likely, though it will depend on the player’s hardware configuration.

**Q: Can I disable ray tracing to boost performance?**
A: As of launch, ray tracing is baked into the default graphics preset. Rockstar has not provided an in‑game toggle, but future updates may expose this option for performance‑focused players.

**Q: How does the Xbox Series X|S version compare?**
A: While specific technical details are scarce, the Xbox Series X is expected to deliver a similar 1440p‑plus experience with ray‑traced shadows, also locked at 30 fps. The Series S will likely run at a lower resolution but maintain the same frame‑rate cap.

**Q: Will cloud streaming on Xbox One affect the frame‑rate?**
A: Cloud streaming performance is primarily dictated by the user’s internet connection and the data‑center hardware. Rockstar aims to deliver a consistent 30 fps experience, but network latency could introduce occasional hiccups.

---
**Source:** [*Original Article*](https://www.engadget.com/2321134/rockstar-just-settled-a-major-question-about-gta-6s-controversial-fps-decision/)


{{< comments >}}
