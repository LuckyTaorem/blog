---
title: "The Expanse: Osiris Reborn – Zero‑Gravity RPG 2027"
date: 2026-08-21T08:40:29.369615+05:30
draft: false
images: ["images/can-the-upcoming-expanse-game-avoid-mass-effects-biggest-mistake.jpg"]
thumbnail: "images/can-the-upcoming-expanse-game-avoid-mass-effects-biggest-mistake.jpg"
description: "Owlcat Games’ shooter RPG, The Expanse: Osiris Reborn, arrives spring 2027 with zero‑gravity combat, choice‑driven story and crew mechanics."
categories: ["Gaming"]
tags: ["The Expanse", "Osiris Reborn", "Zero-Gravity Combat"]
---

## Overview: A New Direction for Owlcat Games  

Owlcat Games, the Cyprus‑based studio behind *Pathfinder: Kingmaker* and *Warhammer 40,000: Rogue Trader*, is stepping out of its top‑down RPG comfort zone with *The Expanse: Osiris Reborn*. Slated for a spring 2027 launch, the title blends third‑person shooter mechanics with a deep, choice‑driven role‑playing framework. Players assume the role of a spaceship captain navigating a fractured solar system, leading a “found‑family” crew of misfits while contending with zero‑gravity combat, branching dialogue, and a reputation system that can reshape the political landscape of Earth, Mars, and the Belt.

The game directly adapts the first two novels of James S.~A.~Corey’s nine‑book *The Expanse* series, aligning its timeline with the events of the books and the acclaimed TV adaptation. The marketing slogan—borrowed from the character Naomi Nagata’s line, “never tells us if we did right or wrong”—highlights the title’s emphasis on moral ambiguity and player agency.

## Technical Breakdown: Zero‑Gravity Combat and the “Etudes” Engine  

### Zero‑Gravity Mechanics  

Combat in *Osiris Reborn* takes place in fully simulated micro‑gravity environments. Unlike traditional shooters that rely on grounded movement, the game uses a physics‑driven thruster system that lets players push off walls, rotate in three axes, and manage momentum while firing weapons. Early beta feedback praised the tactile feel of these encounters, noting that the inertia model rewards careful positioning and timing.

Key technical components include:

- **Rigid‑body thruster simulation**: Each character and ship segment is a physics object with configurable thrust vectors.
- **Dynamic hit‑scan and projectile handling**: Weapons switch between instant‑hit lasers and slower, ballistic rounds that arc in low‑gravity.
- **Environmental interaction**: Debris, floating cargo, and modular ship interiors become tactical cover or hazards.

### The “Etudes” Narrative System  

Owlcat introduced an internal development tool called **Etudes** to track narrative flags, triggers, and ripple effects. Etudes functions as a lightweight state machine that records player decisions at both macro (faction alignment) and micro (individual crew morale) levels. The system feeds directly into cut‑scene decision trees, ensuring that dialogue outcomes can cascade into world‑state changes long after the initial choice.

Benefits of Etudes:

- **Scalable flag management** – Handles thousands of conditional branches without performance degradation.
- **Real‑time debugging** – Designers can visualize active flags during playtests, accelerating iteration.
- **Cross‑module integration** – Links combat outcomes, crew mentorship, and faction reputation into a unified decision graph.

## Narrative & Choice Systems: From Dialogue Trees to World‑Changing Consequences  

### Dialogue and Decision Trees  

The game’s dialogue engine expands on Owlcat’s proven RPG roots. Players select from a range of responses that affect immediate scene outcomes and long‑term story arcs. Unlike static branching, *Osiris Reborn* employs **choice ripple** mechanics: a seemingly minor remark can alter diplomatic negotiations months later, unlock hidden missions, or even trigger character death.

### Crew Interaction and Mentorship  

A standout feature is the **crew mentorship** system. Captains can assign crew members to mentor each other, unlocking skill synergies across combat, engineering, and diplomacy. There are no traditional skill classes; instead, a character’s development is a function of the decisions they experience and the mentors they receive.

### Faction Reputation and “One‑Chance” Relations  

Players navigate three competing factions—Earth, Mars, and the Belters. The relationship mechanic is deliberately unforgiving: “Keeping good relations with everyone won’t be easy—you’ll only get one chance to stay on everyone’s good side

. This design philosophy mirrors the harsh realities of *The Expanse*’s political landscape, where neutrality is often perceived as weakness, and alliances are forged or broken in moments of crisis.

Faction reputation is tracked through a tiered system, with each group offering unique missions, resources, and narrative paths based on the player’s standing. High favor with Earth might grant access to advanced military hardware, while deep ties to the Belters could unlock hidden asteroid bases or smuggling routes. Conversely, alienating a faction can lead to embargoes, sabotage, or even open warfare—with consequences that persist throughout the campaign.

### Endings and the "Mass Effect 3" Lesson

Owlcat has been vocal about learning from *Mass Effect 3*’s controversial ending, which many fans felt undermined the weight of their choices. Design Director Leonid Rastorguev emphasized in interviews that *Osiris Reborn*’s endings are designed to reflect the cumulative impact of player decisions, with no single "correct" path. While the exact number of endings remains undisclosed, the team has confirmed that they vary in tone, scope, and narrative payoff—ranging from personal triumphs to catastrophic solar-system-wide conflicts.

The game’s internal "Etudes" system plays a critical role here, ensuring that even late-game choices are informed by earlier actions. For example, a decision to spare an enemy in the first act could resurface in the finale, where that same character might return as an ally—or a vengeful adversary.

## Development Challenges and Community Feedback

### Beta Reception and Iteration

The April 2024 beta provided a mixed but instructive preview of *Osiris Reborn*. Testers praised the zero-gravity combat and visual fidelity, particularly the ship interiors and dynamic lighting in low-gravity environments. However, criticism centered on the story’s pacing and voice acting, with some characters feeling underdeveloped or tonally inconsistent. In response, Owlcat announced a recasting for one of the main crew members, alongside promises of expanded dialogue and additional cutscenes to flesh out key relationships.

A notable omission from the beta was the absence of **Belter Creole**, the pidgin language spoken by asteroid-belt dwellers in the books and TV show. While the team acknowledged fan demand for its inclusion, they cited technical and localization challenges as barriers. Rastorguev hinted that post-launch updates might explore ways to integrate the language, but for now, Belter characters speak in standard English with regional accents.

### Team Expansion and Technical Hurdles

Owlcat’s shift from top-down RPGs to a third-person shooter required significant staff expansion. The studio nearly doubled its team size to accommodate the game’s ambitious scope, hiring specialists in physics simulation, motion capture, and narrative design. The transition also necessitated a retooling of their proprietary engine, which had previously been optimized for isometric perspectives. Early technical hurdles included:
- **Physics synchronization**: Ensuring consistent zero-gravity behavior across multiplayer and single-player modes.
- **Animation blending**: Smoothly transitioning between grounded and low-gravity movement states.
- **Dialogue lip-sync**: Adapting facial animation systems to match the game’s cinematic presentation.

Despite these challenges, the team’s prior experience with *Pathfinder* and *Warhammer 40,000* RPGs provided a strong foundation for the game’s choice-driven mechanics.

## Comparisons and Benchmarks: *Mass Effect* Meets *Baldur’s Gate 3*

### *Mass Effect*’s Shadow

Unsurprisingly, *Osiris Reborn* has drawn frequent comparisons to *Mass Effect*, particularly in its blend of shooter combat, squad management, and branching narratives. However, Owlcat is keen to differentiate their approach. Where *Mass Effect*’s choices often boiled down to "paragon vs. renegade" binaries, *Osiris Reborn* embraces moral ambiguity, with decisions that defy simple categorization. The game’s faction system, in particular, echoes *Mass Effect*’s loyalty missions but adds a layer of political realism—where alliances are fragile and betrayal is always a possibility.

### *Baldur’s Gate 3*’s Influence

The success of *Baldur’s Gate 3* has also left its mark on *Osiris Reborn*. Owlcat has cited Larian Studios’ game as a benchmark for transformative choice systems, where even minor decisions can ripple outward in unexpected ways. The "Etudes" engine shares similarities with *Baldur’s Gate 3*’s reactivity system, though Owlcat’s implementation is tailored to a more cinematic, third-person experience. Key takeaways from *Baldur’s Gate 3* include:
- **Player agency**: Ensuring choices feel meaningful without overwhelming the player with options.
- **Narrative density**: Packing side quests with as much depth as the main story.
- **Crew dynamics**: Making companions feel like individuals with their own goals and growth arcs.

## What’s Next: Release and Beyond

*The Expanse: Osiris Reborn* is set to launch in spring 2027, with a full reveal trailer expected later this year. Owlcat has confirmed that the game will ship with a robust post-launch support plan, including:
- **Free narrative DLC**: Expanding on side characters and faction storylines.
- **Cosmetic packs**: Themed outfits and ship skins inspired by the books and TV show.
- **Mod support**: Tools for players to create custom missions, ships, and characters.

The studio has also teased the possibility of a sequel, contingent on the success of *Osiris Reborn*. Given the source material’s nine-book arc, there’s ample room to explore later events in *The Expanse* universe—including the protomolecule crisis and the ring gates.

## Conclusion: A Bold Gamble on Player Agency

Owlcat Games is taking a calculated risk with *The Expanse: Osiris Reborn*. By stepping away from their top-down RPG roots and embracing a third-person shooter format, they’re venturing into uncharted territory—both for the studio and for licensed adaptations of *The Expanse*. The game’s success hinges on its ability to balance zero-gravity combat with deep, consequence-laden storytelling, all while honoring the source material’s political intrigue and moral complexity.

If the beta is any indication, *Osiris Reborn* has the potential to carve out its own niche in the crowded space of narrative-driven RPGs. Whether it can avoid the pitfalls of its predecessors—like *Mass Effect 3*’s divisive ending—remains to be seen. One thing is certain: players will be the ones to decide.

---

## FAQ

### **1. Will *The Expanse: Osiris Reborn* follow the books or the TV show?**
The game adapts the first two books (*Leviathan Wakes* and *Caliban’s War*), but it also incorporates elements from the TV show, such as visual designs and character interpretations. The timeline aligns with both, though some events may be reordered or expanded for gameplay purposes.

### **2. Can I play as a Belter, Martian, or Earther?**
While you create your own captain, the game’s faction system allows you to align with Earth, Mars, or the Belters through your choices. Your backstory and decisions will influence how each faction perceives you, but you won’t be locked into a single identity.

### **3. Is there multiplayer?**
No, *Osiris Reborn* is a single-player experience. However, Owlcat has not ruled out multiplayer features in potential sequels or DLC.

### **4. How long is the game?**
The main campaign is estimated to take **30–40 hours**, with additional content unlocked through side missions and faction quests. The game’s replayability is high, given its branching narrative and multiple endings.

### **5. Will there be mod support?**
Yes, Owlcat plans to release modding tools post-launch, allowing players to create custom missions, ships, and characters. The studio has expressed enthusiasm for fostering a creative community around the game.

### **6. What platforms will it release on?**
The game is confirmed for **PC, PlayStation 5, and Xbox Series X|S**. There are no current plans for a Nintendo Switch or last-gen console release.

### **7. Will Belter Creole be added later?**
While not included at launch, Owlcat has acknowledged fan interest and is exploring ways to integrate Belter Creole in post-launch updates. No official timeline has been provided.

### **8. How does the game handle character death?**
Character death is a possible outcome of player choices, particularly in high-stakes missions. Some deaths are scripted, while others result from failed skill checks or combat. The game does not feature permadeath for the player character, but crew members can be lost permanently.

### **9. Is there a demo available?**
The April 2024 beta was the only public demo to date. Owlcat has not announced plans for another demo before launch, but they may release one closer to the 2027 release window.

### **10. How does the game compare to *Mass Effect*?**
While both games share similarities—third-person combat, squad management, and branching narratives—*Osiris Reborn* emphasizes political realism and moral ambiguity over *Mass Effect*’s "paragon/renegade" system. The zero-gravity combat and faction mechanics also set it apart.

---
**Source:** [*Original Article*](https://www.wired.com/story/the-upcoming-expanse-game-has-to-make-some-hard-choices/)


{{< comments >}}
