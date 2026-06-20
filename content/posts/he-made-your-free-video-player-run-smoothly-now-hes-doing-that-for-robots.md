---
title: "Kyber: The Secret Tech Powering Millions of Future Robots"
date: 2026-06-20T08:27:46.452016+00:00
draft: false
images: ["images/he-made-your-free-video-player-run-smoothly-now-hes-doing-that-for-robots.jpg"]
thumbnail: "images/he-made-your-free-video-player-run-smoothly-now-hes-doing-that-for-robots.jpg"
description: "How VLC’s creator built Kyber, an SDK to control robots in real-time with zero lag. Discover its tech, use cases, and why Lightspeed invested $5M."
categories: ["Robotics"]
tags: ["AI", "Robotics", "Open Source", "Cloud Computing", "IoT"]
---

## The Man Behind VLC Is Now Building the Backbone of Physical AI

Jean-Baptiste Kempf is a name that may not ring a bell for the average internet user, but his work has touched nearly every person on the planet. As the lead developer of **VLC Media Player**, Kempf helped create one of the most ubiquitous pieces of open-source software in history, with over **6 billion downloads** to date. Now, he’s turning his attention to a challenge that could be even more transformative: **building the infrastructure that will power millions of robots and drones in the real world**.

His new startup, **Kyber**, is developing an **SDK (Software Development Kit)** designed to synchronize video, audio, sensor data, and control inputs for remote devices with **minimal latency**. This isn’t just another incremental improvement in robotics—it’s a foundational layer that could enable **physical AI** to operate at scale, from autonomous delivery drones to teleoperated surgical robots.

But how did a video-streaming expert end up in robotics? And why did **Lightspeed Venture Partners**, the firm behind investments in **Anthropic** and **Mistral AI**, bet $5 million on this Paris-based startup? Let’s break down the technology, the vision, and the implications of Kyber’s work.

---

## Why Robots Need a "VLC for Real-Time Control"

### The Latency Problem in Robotics

Robots and drones are only as useful as their ability to **respond in real time**. Whether it’s a self-driving car avoiding an obstacle or a drone delivering medical supplies, **every millisecond counts**. Traditional cloud-based control systems introduce **lag**, which can be catastrophic in high-stakes scenarios.

Kyber’s solution? **Treat robot control like video streaming—but with even stricter performance requirements.**

- **Video streaming (VLC’s domain):** Optimized for smooth playback, even with network fluctuations.
- **Robot control (Kyber’s domain):** Requires **sub-100ms latency** for safe, precise operation.

Kempf’s background in **cloud gaming (via his CTO role at Shadow)** gave him firsthand experience in **low-latency remote control**, a skill set that directly translates to robotics.

### The Three Pillars of Kyber’s Tech

Kyber’s SDK isn’t just a single innovation—it’s a **stack of optimizations** that work together to eliminate lag:

1. **Real-Time Data Synchronization**
   - Combines **video, audio, sensor data, and control inputs** into a single stream.
   - Uses **adaptive bitrate algorithms** (similar to video streaming) to adjust to network conditions.

2. **Edge Computing Optimization**
   - Unlike traditional cloud robotics, Kyber **minimizes reliance on distant servers**.
   - Processes data **closer to the device** (at the "edge") to reduce latency.

3. **Scalable Observability**
   - Monitors **millions of devices** in real time.
   - Detects failures before they happen, critical for **AI-driven fleets**.

---

## From VLC to Kyber: How Video Streaming Expertise Translates to Robotics

### The Unexpected Connection Between VLC and Robotics

At first glance, **video players and robots** seem unrelated. But Kempf’s career reveals a **common thread: real-time data transmission**.

| **VLC Media Player** | **Kyber’s Robot Control SDK** |
|----------------------|-------------------------------|
| Optimized for smooth video playback | Optimized for **sub-100ms robot control** |
| Handles network fluctuations | Adapts to **unstable IoT connections** |
| Open-source, widely adopted | Designed for **scalability (millions of devices)** |

### Why Existing Solutions Fall Short

Most robotics companies today **build their own control systems**—but these are often **limited to small fleets** (e.g., 2,000-3,000 vehicles). Kyber is designed for **massive scale**, where **millions of devices** need to be managed simultaneously.

- **Current limitations:**
  - High latency in cloud-based control.
  - Difficulty pushing **OTA (Over-the-Air) updates** to large fleets.
  - Lack of **real-time observability** for AI-driven systems.

- **Kyber’s advantages:**
  - **Sub-100ms latency** for safe operation.
  - **Edge computing** reduces dependency on cloud servers.
  - **Scalable observability** for AI-managed fleets.

---

## The Physical AI Revolution: Why Kyber Is a Game-Changer

### What Is Physical AI?

**Physical AI** refers to AI systems that **interact with the physical world**—think self-driving cars, robotic arms, or delivery drones. Unlike digital AI (e.g., chatbots), physical AI must **process real-time sensor data** and **act within milliseconds**.

Kyber’s role? **It’s the "nervous system" for physical AI**, ensuring that **control signals, sensor data, and video feeds** are synchronized with **zero lag**.

### Use Cases: Where Kyber Could Make an Impact

| **Industry** | **Potential Applications** |
|-------------|---------------------------|
| **Logistics & Delivery** | Autonomous delivery drones, warehouse robots |
| **Healthcare** | Remote surgery, teleoperated medical devices |
| **Automotive** | Self-driving cars, remote vehicle control |
| **Agriculture** | Autonomous tractors, drone crop monitoring |
| **Manufacturing** | Industrial robots, quality control systems |

### Why Lightspeed Invested $5 Million

Lightspeed Venture Partners, known for backing **Anthropic and Mistral AI**, sees Kyber as a **critical enabler for physical AI**.

> *"Physical AI is only as good as the underlying systems running it."* — Lightspeed Venture Partners

Kyber’s **scalability** and **real-time performance** make it a **foundational layer** for the next generation of robotics.

---

## The Technical Deep Dive: How Kyber Works Under the Hood

### The Core Components of Kyber’s SDK

1. **Real-Time Data Pipeline**
   - Combines **video, audio, and sensor data** into a single stream.
   - Uses **WebRTC-like protocols** for low-latency transmission.

2. **Adaptive Bitrate Control**
   - Dynamically adjusts **data transmission rates** based on network conditions.
   - Prevents **buffering or lag spikes** in unstable environments.

3. **Edge Computing Integration**
   - Processes data **locally** (on-device or nearby edge servers).
   - Reduces reliance on **distant cloud servers**, cutting latency.

4. **Observability & AI Monitoring**
   - Tracks **device health, network conditions, and performance metrics**.
   - Enables **predictive maintenance** for large fleets.

### Benchmarking Kyber Against Alternatives

| **Solution** | **Latency** | **Scalability** | **Edge Support** | **Observability** |
|-------------|------------|----------------|------------------|------------------|
| **Kyber** | **<100ms** | **Millions of devices** | ✅ Yes | ✅ AI-driven |
| **Traditional Cloud Robotics** | 200-500ms | Limited (thousands) | ❌ No | ❌ Basic |
| **Custom In-House Solutions** | Varies | Limited (thousands) | ✅ Yes | ❌ Manual |

---

## The Future of Robotics: Why Kyber Could Be Everywhere

### The Rise of "Robot-as-a-Service" (RaaS)

Companies like **Amazon (with its delivery drones)** and **Tesla (with Optimus)** are betting on **mass robot adoption**. Kyber could become the **standard control layer** for these fleets.

### The Open-Source Question

VLC is **open-source**, but Kyber is currently **proprietary**. Will Kempf follow the same model?

- **Pros of open-sourcing Kyber:**
  - Faster adoption by developers.
  - Community-driven improvements.
- **Cons of open-sourcing Kyber:**
  - Harder to monetize.
  - Potential security risks if misused.

### Potential Challenges

1. **Security Risks**
   - Remote control systems are **prime targets for hackers**.
   - Kyber must **encrypt all data** to prevent hijacking.

2. **Regulatory Hurdles**
   - Governments may impose **strict rules** on remote-controlled robots.
   - Compliance will be critical for **global adoption**.

3. **Competition from Tech Giants**
   - Companies like **NVIDIA (with Isaac Sim)** and **Google (with Robotics Cloud)** are also working on robot control systems.
   - Kyber must **prove its superiority** in real-world tests.

---

## FAQ: Everything You Need to Know About Kyber

### **1. What exactly does Kyber do?**
Kyber provides an **SDK for real-time control of robots and drones**, synchronizing **video, audio, sensor data, and control inputs** with **minimal latency**.

### **2. Why is latency such a big deal in robotics?**
Even a **100ms delay** can cause a self-driving car to crash or a drone to miss its target. Kyber aims for **sub-100ms latency** to ensure safe operation.

### **3. How is Kyber different from existing robot control systems?**
Most solutions are **built for small fleets** (thousands of devices). Kyber is designed for **millions of devices**, with **edge computing and AI-driven observability**.

### **4. Who are Kyber’s competitors?**
- **NVIDIA (Isaac Sim)**
- **Google (Robotics Cloud)**
- **AWS IoT RoboRunner**
- **Custom in-house solutions** (e.g., Tesla’s Optimus control system)

### **5. Will Kyber be open-source like VLC?**
Currently, **no**. Kyber is a **proprietary SDK**, but Kempf hasn’t ruled out open-sourcing parts of it in the future.

### **6. What industries will benefit most from Kyber?**
- **Logistics & Delivery** (autonomous drones, warehouse robots)
- **Healthcare** (remote surgery, teleoperated devices)
- **Automotive** (self-driving cars, remote vehicle control)
- **Agriculture** (autonomous tractors, drone monitoring)

### **7. How does Kyber handle security?**
Kyber **encrypts all data** to prevent hacking. However, as a **remote control system**, it will need **continuous security updates** to stay ahead of threats.

### **8. What’s next for Kyber?**
- **Expanding partnerships** with robotics companies.
- **Improving AI-driven observability** for large fleets.
- **Potential open-source releases** for parts of the SDK.

---

## Conclusion: The Next Chapter in Robotics Has Begun

Jean-Baptiste Kempf’s journey from **VLC Media Player** to **Kyber** is a testament to how **real-time data transmission** is becoming the backbone of modern technology. While VLC made **video streaming smooth**, Kyber aims to do the same for **robotics—at a massive scale**.

With **$5 million in funding** and a **clear technical advantage**, Kyber is poised to become a **critical infrastructure layer** for the **physical AI revolution**. Whether it’s **delivery drones, surgical robots, or self-driving cars**, the future of robotics may well run on **Kyber’s real-time control system**.

One thing is certain: **The robots are coming—and they’ll need Kyber to move smoothly.**

{{< comments >}}
