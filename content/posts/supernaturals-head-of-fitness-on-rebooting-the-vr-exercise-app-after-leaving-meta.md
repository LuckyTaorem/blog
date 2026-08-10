---
title: "Supernatural VR Fitness Relaunch: Pricing, Content & Future"
date: 2026-08-10T21:57:15.951782+05:30
draft: false
images: ["images/supernaturals-head-of-fitness-on-rebooting-the-vr-exercise-app-after-leaving-meta.jpg"]
thumbnail: "images/supernaturals-head-of-fitness-on-rebooting-the-vr-exercise-app-after-leaving-meta.jpg"
description: "Supernatural, the VR workout app, leaves Meta, restores its 3,000‑plus workout library, returns to original pricing and eyes non‑VR fitness expansion."
categories: ["Software"]
tags: ["VR Fitness", "Supernatural", "Meta"]
---

## Background: From Within’s Vision to an Independent Studio  

Supernatural launched in 2020 under the creative umbrella of Within, the VR studio founded by Chris Milk and Aaron Koblin. The app quickly differentiated itself by pairing high‑intensity interval training (HIIT) with immersive, photorealistic environments and a curated music soundtrack. By early 2023, the service had amassed a library of more than **3,000 workouts**, a roster of charismatic coaches, and a passionate community that often met in real‑world meet‑ups.

Meta’s acquisition of Within in 2021 gave Supernatural access to the Quest ecosystem, but the partnership proved volatile. In January 2024 Meta announced a **staff reduction** that affected Supernatural’s development team and placed new content on hold. The community reacted sharply, especially after a price increase that many felt ignored the app’s original value proposition.  

Leanne Pedante, the head of fitness and a founding coach, described the turning point:  

> “The other thing that’s been really cool is that because we’re a small team now… essentially we’re a flat organization. There’s no bureaucracy. We can move really fast.”  

With the Meta‑backed structure dissolved, Supernatural is re‑emerging as an **independent company**, reclaiming control over its roadmap, pricing, and brand voice.

## What the Relaunch Delivers: Content, Pricing, and Community  

### Full Workout Library Returns  

The most tangible promise is the restoration of the **entire 3,000‑plus workout catalog**. Users can once again access everything from sunrise beach runs to high‑altitude mountain climbs, each guided by the original coaches. Pedante emphasized that the content is “the same coaches, the same beautiful environments,” underscoring continuity for long‑time subscribers.

### Pricing Model Reverts to Original Rates  

- **Standard subscription**: $20 per month or $200 per year.  
- **Founding Members discount**: $180 for the first year (available to both new and existing users).  

This pricing aligns with the app’s launch model, countering the community backlash that followed the earlier hike. The discount is positioned as a “thank‑you” for early adopters and a lure for users who left during the Meta hiatus.

### Scholarship Program and Community Features  

Supernatural will allocate **quarterly scholarships** to members experiencing financial hardship. The program is overseen by the internal team, and members can sponsor additional subscriptions, reinforcing a sense of collective ownership.  

Community meet‑ups—such as the recent gatherings in Seattle and Denver—remain a core pillar. One anecdote highlighted a couple who met during a Supernatural session and later married, illustrating the platform’s social impact beyond the headset.

### Music Licensing in Progress  

Music has always been a differentiator, with licensed tracks synced to workout intensity. Negotiations are ongoing, and Pedante confirmed that “we’re working on our music negotiations right now.” While the exact timeline is undisclosed, the commitment signals that the auditory experience will soon match the visual fidelity.

## Technical Architecture: How Supernatural Runs on Quest 3/3S  

Supernatural is built on Unity, leveraging the **Meta Quest SDK** for low‑latency motion tracking and spatial audio. The app’s performance targets are modest by modern VR standards: 72 Hz refresh on Quest 3 and 90 Hz on Quest 3S, balancing visual smoothness with battery life.

### Hardware Requirements  

| Device | Approx. Cost (USD) | Key Specs |
|--------|-------------------|-----------|
| Meta Quest 3S | $350 | Higher‑resolution lenses, improved hand‑tracking |
| Meta Quest 3 | $600 | Premium optics, optional accessories |

Both headsets support the app’s core features, but the Quest 3S’s enhanced optics improve depth perception in the app’s expansive environments, reducing motion sickness for newcomers.

### Data Flow and Cloud Sync  

Workout progress, heart‑rate data (when paired with a Bluetooth sensor), and personalized settings are stored in **AWS DynamoDB** tables. Real‑time analytics feed into a recommendation engine that surfaces workouts based on user fatigue levels and past performance. This architecture enables seamless cross‑device continuity—users can start a session on a Quest 3 at home and resume on a Quest 3S at the office.

### Security and Privacy  

All biometric data is encrypted in transit with TLS 1.3 and at rest using AES‑256. Supernatural complies with GDPR and CCPA, offering users the ability to export or delete their data via the account portal.

## Market Impact: VR Fitness vs Traditional Gyms and Competitors  

### Cost Comparison  

- **Supernatural**: $20/mo or $180 for the first year (Founding Members).  
- **YMCA Membership**: $45–$70/mo, plus travel time.  
- **Boutique Studios**: $100–$150/mo for specialized classes.  

Even after accounting for the **$350–$600 hardware investment**, the break‑even point arrives within 6–12 months for regular users, a compelling argument for cost‑conscious consumers.

### Convenience and Hygiene  

VR eliminates shared equipment, communal showers, and commute time. For users in dense urban areas or those with limited access to quality gyms, the convenience factor is a decisive advantage.

### Limitations  

Supernatural cannot replace weight‑lifting or resistance‑training equipment. The experience is confined to body‑weight movements, cardio bursts, and mobility drills. Users seeking heavy‑strength training must supplement with traditional gyms or home‑gym setups.

### Competitive Landscape  

Other VR fitness titles—such as **FitXR** and **VZfit**—offer similar cardio experiences but lack Supernatural’s narrative‑driven environments and extensive coach roster. The relaunch’s pricing undercuts many competitors, positioning Supernatural as the “premium‑value” option.

For a broader perspective on how immersive experiences are reshaping entertainment, see the recent coverage of a first‑person VR mod for Mario Kart 64: [https://ltdeveloperblogs.github.io/posts/mario-kart-64-in-vr-is-not-for-the-queasy](https://ltdeveloperblogs.github.io/posts/mario-kart-64-in-vr-is-not-for-the-queasy)  

## Future Outlook: Non‑VR Expansion, Nex Playground, and Industry Trends  

### Exploring Non‑VR Fitness  

Supernatural’s roadmap includes **running programs, couch‑to‑5K plans, and other “outside‑the‑headset” workouts**. By leveraging the same coaching talent and music curation, the company can deliver guided audio sessions that run on smartphones or smart‑TV platforms.

### Potential Integration with Nex Playground  

The **Nex Playground** is a camera‑based fitness system that projects workouts onto a TV screen, reminiscent of the Microsoft Kinect era. Supernatural’s interest in this hardware suggests a hybrid model: users could start a session on a Quest, then transition to a living‑room experience without a headset.  

A similar cross‑platform approach was explored when Xbox Game Pass launched on Hisense and VIDAA TVs, allowing console‑free gaming: [https://ltdeveloperblogs.github.io/posts/you-can-now-play-xbox-games-on-hisense-tvs-without-a-console](https://ltdeveloperblogs.github.io/posts/you-can-now-play-xbox-games-on-hisense-tvs-without-a-console)  

### Implications for the VR Ecosystem  

Supernatural’s independence may inspire other Meta‑incubated studios to spin out, fostering a more diverse VR content market. The move also pressures Meta to refine its developer support, especially around **music licensing** and **hardware pricing**.  

From a hardware perspective, the **USB‑C** ecosystem continues to evolve, offering faster data rates that could enable higher‑resolution streaming to headsets. Understanding these trends is essential for developers building next‑gen VR fitness apps: [https://ltdeveloperblogs.github.io/posts/your-phones-usb-c-port-does-a-lot-more-than-just-charge-heres-what-else-it-can-do](https://ltdeveloperblogs.github.io/posts/your-phones-usb-c-port-does-a-lot-more-than-just-charge-heres-what-else-it-can-do)  

## Frequently Asked Questions  

**Q1: Do I need a Quest 3 or can I use an older headset?**  
A: The relaunch officially supports Quest 3 and Quest 3S. Older Quest models may run the app, but performance and visual fidelity are not guaranteed.

**Q2: Will my existing subscription automatically convert to the new pricing?**  
A: Current subscribers will be offered the **Founding Members discount** of $180 for the first renewal year. After that, the standard $200/year rate applies unless further promotions are announced.

**Q3: How does the scholarship program work?**  
A: Every quarter, Supernatural reviews applications for financial hardship. Approved members receive a free month of service, and existing users can purchase “sponsor passes” to gift to others.

**Q4: Is my biometric data safe?**  
A: Yes. All health data is encrypted in transit and at rest, and the company adheres to GDPR and CCPA regulations. Users can delete their data at any time via the account settings.

**Q5: When can we expect the music licensing issue to be resolved?**  
A: The team is actively negotiating

with labels and publishers. Pedante hinted that a resolution is "imminent," though she declined to specify a firm timeline. Given the app’s reliance on high-energy tracks to drive workout intensity, restoring the full music catalog remains a top priority.

**Q6: What’s the timeline for non-VR fitness expansions?**
A: Pedante confirmed that non-VR programs are in "active development," with a beta test slated for late 2024. The first rollout will likely focus on audio-guided running and mobility sessions, accessible via smartphone or smart speaker. Integration with Nex Playground is further out, pending hardware partnerships and SDK finalization.

**Q7: How will Supernatural handle updates and new features post-relaunch?**
A: The independent team plans to adopt a **monthly cadence** for minor updates (e.g., bug fixes, coach rotations) and **quarterly major releases** (e.g., new environments, workout types). Community feedback will directly influence the roadmap, with a public Trello board or Discord channel expected to launch alongside the relaunch.

---

## Conclusion: A Second Chance for VR Fitness

Supernatural’s rebirth as an independent studio is more than a corporate restructuring—it’s a bet on the resilience of immersive fitness. By restoring its original pricing, reviving its workout library, and doubling down on community, the app is positioning itself as a **premium yet accessible** alternative to traditional gyms. The move also signals a broader shift in the VR landscape, where content creators are increasingly prioritizing autonomy over platform dependency.

For users, the relaunch offers a familiar yet refreshed experience: the same coaches, the same stunning environments, and—soon—the same pulse-pounding soundtracks. For the industry, it’s a case study in how VR fitness can evolve beyond gimmicks to become a sustainable, everyday habit.

As Pedante put it, the goal isn’t just to survive the post-Meta transition but to "build something that lasts." If the early community response is any indication, Supernatural’s second act might just outshine its first.

---

## Additional Resources
- **Supernatural Official Website**: [supernatural.com](https://www.supernatural.com) (Relaunch updates and sign-up)
- **Meta Quest Store**: [Supernatural App Page](https://www.meta.com/experiences/) (Post-relaunch listing)
- **Nex Playground**: [nexplayground.com](https://www.nexplayground.com) (Hardware details)
- **VR Fitness Insider**: [vrfitnessinsider.com](https://www.vrfitnessinsider.com) (Industry news and reviews)

---
**Source:** [*Original Article*](https://www.engadget.com/2232716/supernatural-head-of-fitness-on-rebooting-the-vr-exercise-app-after-leaving-meta/)


{{< comments >}}
