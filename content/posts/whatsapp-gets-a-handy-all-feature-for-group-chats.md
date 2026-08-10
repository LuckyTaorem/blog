---
title: "WhatsApp Introduces @all, Poll Fixes & Splinter Chat"
date: 2026-08-10T10:38:58.643974+05:30
draft: false
images: ["images/whatsapp-gets-a-handy-all-feature-for-group-chats.jpg"]
thumbnail: "images/whatsapp-gets-a-handy-all-feature-for-group-chats.jpg"
description: "WhatsApp rolls out @all for urgent group alerts, upgrades polls, adds Splinter Chat and previews usernames—features that reshape mobile messaging dynamics today."
categories: ["Mobile Development"]
tags: ["WhatsApp", "@all", "group chat"]
---

## Overview of the New Group‑Centric Updates

On August 4, WhatsApp began a phased rollout of a suite of features aimed squarely at power users of group chats. The headline is the **@all** mention, a tool that forces a notification for every member of a group, even when the conversation is muted. Accompanying the @all launch are three refinements that have been in development for years:

* **Polling feature upgrades** – end‑to‑end encrypted polls now support automatic lock‑out times, hidden voter lists, and a 15‑minute edit window.  
* **Splinter Chat** – a one‑tap method to carve out a sub‑group from an existing conversation, keeping side‑talks tidy.  
* **Username preview** – an upcoming system that lets users claim a platform‑wide handle, decoupling identity from phone numbers.

Collectively these changes signal WhatsApp’s intent to treat group chats less like ad‑hoc messengers and more like collaborative workspaces. The rollout is gradual, respecting the platform’s massive user base of over two billion active accounts, and the features are already visible on Android and iOS for groups up to the 1,024‑member limit introduced in 2022.

## Technical Deep‑Dive into the @all Mechanism

### How @all Overrides Mute Settings

Traditionally, muting a group silences all push notifications, leaving only in‑app alerts. The @all command injects a high‑priority flag into the message payload that the client interprets as “force‑notify.” This flag bypasses the local mute toggle but respects the device‑level Do‑Not‑Disturb setting, preserving user control over critical interruptions.

From a networking perspective, the server tags the message with a `force_notify:true` attribute. The client’s notification handler checks this flag before applying the mute filter. If the flag is present, the OS‑level notification channel is invoked with a distinct sound and vibration pattern, ensuring the alert stands out.

### Spam Safeguards and the 32‑Person Threshold

WhatsApp has long used a 32‑member ceiling to differentiate between “group chat” and “broadcast channel” for voice calls. The same threshold now governs @all usage:

* **Groups ≤ 32 members** – any participant can trigger @all.  
* **Groups > 32 members** – only administrators may use @all.

This rule curtails potential abuse in large communities where a single user could otherwise flood thousands of devices. Additionally, the override can be turned off globally in the **Notifications → @all Alerts** setting, giving power users a personal opt‑out without affecting the group’s ability to use the feature.

### Backend Considerations

Implementing @all required changes to WhatsApp’s end‑to‑end encryption (E2EE) model. The message’s encryption envelope remains unchanged; only the metadata indicating “force‑notify” is added in clear text, as it does not contain user content. This design preserves the integrity of E2EE while allowing the server to route the high‑priority flag efficiently.

## Enhancements to Polls and the Splinter Chat Tool

### Polling Feature Updates

First introduced in 2022, WhatsApp polls already offered encrypted voting, but they lacked the granularity needed for time‑sensitive decisions. The latest updates add three critical capabilities:

1. **End time lock** – creators set a UTC timestamp; once reached, the poll automatically closes, preventing late votes.  
2. **Hidden voter list** – a toggle that masks individual choices, useful for sensitive topics where anonymity is required.  
3. **15‑minute edit window** – mirrors the edit grace period for regular messages, allowing quick correction of typos or question phrasing.

These improvements align WhatsApp’s polling experience with dedicated survey tools while retaining the simplicity of a chat interface. For teams coordinating events, the hard deadline eliminates the “last‑minute vote” ambiguity that previously required manual enforcement.

### Splinter Chat: One‑Tap Sub‑Group Creation

Splinter Chat addresses a long‑standing UX pain point: the need to spin off a side conversation without recreating a new group from scratch. With a single long‑press on a message, users can select participants and generate a fresh chat thread that inherits the original message history for context.

Technical highlights:

* **Server‑side cloning** – the backend creates a new group ID, copies the selected message IDs, and assigns a temporary “parent” reference for audit purposes.  
* **Privacy preservation** – only the chosen members receive the new group invitation; the original chat’s metadata remains unchanged.  
* **Ephemeral flag** – the creator can mark the splinter as “temporary,” prompting automatic deletion after 24 hours if no activity occurs.

The feature is especially valuable for large community groups where surprise announcements or breakout discussions are common. By reducing manual member selection, Splinter Chat cuts down on friction and keeps the main conversation thread uncluttered.

## The Upcoming Username System and Its Implications

WhatsApp’s traditional model ties identity to a phone number, a design that has both privacy benefits and limitations. The forthcoming **username** feature, slated for later this year, introduces a layer of abstraction:

* **Optional handles** – users can claim a unique alphanumeric string, similar to Instagram or Twitter handles.  
* **Four‑digit key** – an additional secret code that users can share to grant contact permission, enhancing control over inbound messages.  
* **Reservation policy** – names linked to public figures, governments, or obvious impersonations are reserved for verified owners, mitigating brand‑squatting and deep‑fake risks.

The rollout began with a “land‑grab” in June, allowing eligible accounts to reserve names via the **Account → Username** settings. Existing Facebook and Instagram handles can be transferred, fostering cross‑platform consistency for Meta’s ecosystem.

From a security standpoint, usernames are stored in a separate, non‑phone‑number‑linked directory. This mitigates SIM‑swap attacks, as an attacker who compromises a phone number cannot automatically hijack the associated username. However, the feature also introduces new vectors for social engineering; the four‑digit key is a safeguard, but users must be educated on its proper use.

## Industry Impact and Future Outlook

### Shifting Expectations for Messaging Platforms

The @all feature mirrors similar “@everyone” commands on platforms like Discord and Slack, indicating a convergence of consumer and enterprise messaging expectations. By offering a controlled, admin‑only override in large groups, WhatsApp balances urgency with abuse prevention—a lesson that other mobile messengers are likely to emulate.

### Competitive Landscape

While WhatsApp remains the dominant global chat app, competitors such as Telegram and Signal have already introduced broadcast‑style mentions. WhatsApp’s incremental approach—adding features within its existing UI rather than launching a separate “channel” product—suggests a strategy focused on user familiarity and low friction adoption.

### Mobile Device Considerations

The new notification behavior will have measurable effects on battery consumption and data usage, especially in regions where groups frequently exceed 32 members. Device manufacturers may need to optimize background processing for high‑priority alerts, a topic explored in recent coverage of Android power‑management policies. For readers interested in how platform changes affect hardware, see our analysis of Xiaomi’s market positioning: [https://ltdeveloperblogs.github.io/posts/why-xiaomi-phones-arent-banned-but-are-rarely-sold-in-the-us](https://ltdeveloperblogs.github.io/posts/why-xiaomi-phones-arent-banned-but-are-rarely-sold-in-the-us).

### Policy and Moderation Implications

Force‑notify capabilities raise moderation questions: could malicious actors use @all to amplify spam or coordinated misinformation? WhatsApp’s admin‑only restriction for large groups and the user‑controlled off switch are early mitigations. Ongoing monitoring will be essential, much like the recent policy adjustments on YouTube’s AI‑generated content guidelines: [https://ltdeveloperblogs.github.io/posts/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos](https://ltdeveloperblogs.github.io/posts/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos).

### Future Feature Trajectory

Given the pattern of incremental enhancements—polls, splinter chats, usernames—WhatsApp is likely to continue blurring the line between personal messaging and collaborative tools. Potential next steps could include threaded replies, richer media polls, or integration with calendar invites, all of which would further entrench the app in productivity workflows.

## Frequently Asked Questions

**Q1: Can I disable @all alerts for a specific group without muting the entire chat?**  
A: Yes. Navigate to **Settings → Notifications → @all Alerts** and toggle the switch for the desired group. This setting is independent of the regular mute option.

**Q2: Will the new poll end‑time feature affect existing polls?**  
A: Existing polls retain their original behavior. The end‑time lock applies only to polls created after the update is installed.

**Q3: How does Splinter Chat handle media that was shared in the parent conversation?**  
A: Only the selected messages (text, images, files) are copied into the new thread. Media not explicitly selected remains in the original group.

**Q4: Are usernames globally unique across WhatsApp, or can the same handle exist on different accounts?**  
A: Usernames are globally unique. Attempting to claim an already‑taken handle will prompt you to choose an alternative.

**Q5: Will the @all feature work on legacy devices that haven’t received the latest OS updates?**  
A: The feature requires the latest version of WhatsApp. Users on older OS versions will continue to receive standard notifications until they upgrade.

---

By layering urgent mentions, refined polling, and flexible sub‑group creation onto its core messaging service, WhatsApp is redefining what a “group chat” can accomplish. The upcoming username system will further decouple identity from phone numbers, addressing privacy concerns while opening new avenues for discovery. As other platforms watch closely, the next wave of mobile messaging innovation will likely build on these foundations, blending immediacy with control in ever‑more sophisticated ways.

---
**Source:** [*Original Article*](https://www.wired.com/story/whatsapp-gets-a-handy-all-feature-for-group-chats/)


{{< comments >}}
