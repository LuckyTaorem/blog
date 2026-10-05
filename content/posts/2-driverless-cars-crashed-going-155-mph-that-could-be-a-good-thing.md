---
title: "Driverless Cars Crash at 155 mph in Imola – Impact"
date: 2026-10-05T16:17:19.388852+05:30
draft: false
images: ["images/2-driverless-cars-crashed-going-155-mph-that-could-be-a-good-thing.jpg"]
thumbnail: "images/2-driverless-cars-crashed-going-155-mph-that-could-be-a-good-thing.jpg"
description: "At Imola’s Rivazza curve, a driverless Poli Move car hit a slowing Unimore vehicle at 155 mph, exposing perception delays and shaping racing’s future."
categories: ["Robotics"]
tags: ["autonomous vehicles", "racing", "AI safety"]
---

## Overview of the Imola Incident

On a rain‑slick Saturday at the Autodromo Internazionale Enzo e Dino Ferrari, the Abu Dhabi Autonomous Racing League (A2RL) staged its most dramatic race to date. The competition, held on the circuit’s notoriously tight “Rivazza” sequence, featured five driverless entries built on the Dallara SF23 chassis (rebranded as the EAV 25).  

Mid‑lap, the Poli Move team’s third‑place car, **Eva**, was trailing the Unimore entry, **Gianna**, by only 1.5 seconds when Gianna initiated an emergency stop after losing lidar and radar data. Eva, travelling at roughly 155 mph (250 km/h), could not brake in time and collided with the slowing vehicle. The impact forced Eva’s chassis to be swapped out before the podium ceremony, while Gianna’s car retired after a hard‑brake event that generated close to 1 g of deceleration.

Only two of the five starters—Kinetiz’s **Sparkz** (1st) and Constructor Racing’s unnamed AI‑driven car (2nd)—crossed the finish line. The race was run under rain and hail, with cockpit temperatures soaring toward 170 °F, testing both hardware durability and software robustness.

## Technical Breakdown of the Collision

### Perception Pipeline Lag

Poli Move’s stack relied on a fusion of lidar, radar, and camera feeds to maintain a high‑definition model of the track and surrounding traffic. When Gianna’s sensors failed, the perception module lost its primary obstacle‑detection source. The remaining camera‑only view could not provide the range accuracy needed for high‑speed decision making, leading to a **perception latency of roughly 300 ms** before the system recognized the sudden deceleration ahead.

### Decision‑Making and Trajectory Re‑planning

The autonomous stack’s decision layer, built on a model‑predictive control (MPC) framework, attempted to re‑plan a safe trajectory once the obstacle was detected. However, the **MPC horizon** (2 seconds) was insufficient given the 1.5‑second gap, and the algorithm prioritized maintaining speed over an aggressive brake curve to avoid destabilizing the vehicle’s dynamics.

### Actuator Response and Vehicle Dynamics

Even after the trajectory was updated, the brake actuator response time added another 150 ms delay. Combined with the high‑speed aerodynamics of the SF23‑derived body, the car’s braking force peaked at just under 1 g—far below the 2 g threshold required to stop within the remaining distance. The result was a high‑energy impact that damaged the front‑end structure.

### Environmental Stressors

The race’s weather conditions amplified the challenge:

- **Rain and hail** reduced tire grip, increasing stopping distances.
- **Cockpit temperatures** nearing 170 °F stressed electronic components, potentially contributing to sensor drift.
- **Limited testing window** (only nine days of physical testing) meant teams had minimal time to calibrate sensor fusion under wet conditions.

## Why It Matters: Safety and Perception Challenges

The Imola crash underscores three pivotal issues for the broader autonomous‑vehicle ecosystem:

1. **Redundancy Beyond Sensors** – Relying on a single sensor modality (lidar/radar) can create single points of failure. The incident illustrates the need for robust fallback strategies, such as high‑precision map‑based localization or V2X communication, especially when primary sensors are compromised.

2. **Real‑Time Decision Latency** – At highway‑equivalent speeds, a 300 ms perception lag translates to a loss of over 130 feet of travel. Tightening the perception‑to‑actuation pipeline is essential for safety‑critical maneuvers.

3. **Testing Under Extreme Conditions** – The league’s “laboratory with guardrails” concept is validated: pushing autonomous systems to the edge in a controlled environment reveals failure modes that would be catastrophic on public roads.

> “Because everybody can do ‘easy’, right? We have to show we go where it matters.”

### League Response and Planned Adjustments

In the press conference that followed the race, **Alexander Winkler**, head of sporting at A2RL, acknowledged that the incident “highlights the thin line between pushing performance envelopes and maintaining a safety net.”  He announced a set of immediate technical bulletins that will be mandatory for all participating teams in the next season:

1. **Extended Sensor Redundancy** – Every car must carry at least two independent lidar units, a radar suite, and a stereoscopic camera array, each capable of operating autonomously if the others fail.  
2. **Hard‑Brake Override Logic** – A low‑level safety controller will now be able to command maximum brake pressure (up to 2 g) without waiting for the high‑level planner, cutting the actuation latency by roughly 120 ms.  
3. **Dynamic Weather Calibration** – Teams will receive a weather‑simulation toolkit that injects rain‑induced tire slip and hail‑impact noise into their perception pipelines during the limited testing window.  

Winkler also hinted at a structural change to the competition format: “We will move from a five‑car grid to an eight‑car grid, but we’ll also shrink the pre‑race shakedown to four days. The idea is to force teams to rely more on simulation fidelity and less on on‑track trial‑and‑error.”

### Reactions from the Teams

- **Poli Move** released a technical post‑mortem stating that the “perception latency spike was primarily caused by an unexpected drop in lidar point‑cloud density when the sensor head was partially occluded by rain droplets.”  The team is already prototyping a hydrophobic coating for its lidar windows and plans to integrate a high‑frequency ultrasonic fallback for short‑range obstacle detection.  

- **Unimore**’s team principal, **Dr. Sofia Rossi**, emphasized that the safety stop was a “deliberate, algorithm‑driven decision” triggered when the sensor suite fell below a confidence threshold of 0.6.  “We would rather retire the car than feed corrupted data into the planner,” she said, adding that the incident will be used as a case study for future V2X‑based emergency‑brake alerts.  

- **Kinetiz**’s deputy team principal, **Chee Kiong Ong**, praised the robustness of their own stack, noting that “our predictive model includes a probabilistic buffer for sudden decelerations, which is why Sparkz could stay on the lead even when the track surface turned to ice.”  He reiterated his earlier comment that the lessons learned “could be applied to make the car stop itself in a safer manner or control it at the limits so that you can save lives.”  

### Broader Implications for Autonomous Driving

The Imola crash serves as a micro‑cosm of the challenges that commercial autonomous‑driving systems will face once they transition from controlled urban corridors to high‑speed highways. Three takeaways stand out for the industry at large:

- **Latency Is the New Fatality Metric** – In a scenario where a vehicle travels at 155 mph, every millisecond of delay translates directly into lost stopping distance.  Reducing the end‑to‑end latency from sensor capture to brake actuation to under 100 ms is becoming a critical safety benchmark.  

- **Sensor Fusion Must Be Weather‑Resilient** – Rain, hail, and extreme temperatures can degrade lidar and radar returns.  Future stacks will need to incorporate adaptive sensor weighting that can gracefully degrade performance without compromising safety.  

- **Simulation‑First Development** – With only nine days of physical testing, teams leaned heavily on high‑fidelity simulators.  The incident validates the industry’s push toward “digital twins” that can model not just vehicle dynamics but also stochastic weather effects and sensor noise.  

### Looking Ahead: The Next Season

A2RL has already opened registration for the 2027 season, inviting new entrants from Japan, Germany, and the United States.  The league’s roadmap includes:

- **A “Safety‑First” Scoring Modifier** – Points will be awarded for successful execution of emergency‑brake scenarios, encouraging teams to prioritize conservative safety logic over outright speed.  
- **V2X Integration Trials** – A dedicated “communication lane” will be installed on the Imola circuit, allowing cars to broadcast intent and receive real‑time hazard alerts from a central traffic manager.  
- **Enhanced Data Transparency** – All raw sensor logs from each race will be made publicly available within 48 hours, fostering open‑source research on perception robustness.  

These initiatives aim to turn the dramatic Imola crash from a cautionary tale into a catalyst for safer, more reliable autonomous systems.

## Conclusion

The Imola incident was a stark reminder that even in a “laboratory with guardrails,” the margin for error at extreme speeds is razor‑thin.  While the collision halted Poli Move’s podium hopes, it also illuminated concrete pathways for improvement—sensor redundancy, faster decision loops, and weather‑aware perception.  As the Abu Dhabi Autonomous Racing League evolves, the lessons learned on the rain‑slick Rivazza curve will ripple outward, shaping the safety standards that future driverless cars will carry onto public roads.

---

## Frequently Asked Questions

**Q: Why were the cars running at 155 mph on a wet track?**  
A: The league’s premise is to stress‑test autonomous stacks at the limits of vehicle dynamics.  Running at high speed under adverse weather creates edge‑case scenarios that are unlikely to be encountered in everyday driving but are invaluable for safety research.  

**Q: How does the “hard‑brake override” differ from the regular braking system?**  
A: The override is a low‑level controller that bypasses the high‑level planner and directly commands maximum hydraulic pressure to the brakes.  It is triggered when the perception confidence drops below a predefined threshold, ensuring the fastest possible deceleration.  

**Q: Will the crash data be available for academic study?**  
A: Yes.  A2RL has committed to releasing the full sensor suite logs, vehicle telemetry, and video feeds within two days of each race, under a Creative Commons Attribution‑NonCommercial license.  

**Q: Could V2X communication have prevented the collision?**  
A: Potentially.  If Gianna’s car had broadcast an emergency‑stop message and Eva’s stack had been equipped to act on it instantly, the required reaction time could have been reduced dramatically, possibly avoiding the impact altogether.  

**Q: What safety measures are in place for spectators?**  
A: The Imola circuit was equipped with reinforced barriers, remote‑controlled safety drones, and a real‑time monitoring system that can trigger an automatic race‑wide stop if any vehicle exceeds predefined risk thresholds.  

---

---
**Source:** [*Original Article*](https://www.wired.com/story/2-driverless-cars-crashed-going-155-mph-that-could-be-a-good-thing/)


{{< comments >}}
