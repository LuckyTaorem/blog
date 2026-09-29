---
title: "Why You Can Skip The $59 Brick With Free NFC Apps"
date: 2026-09-29T15:37:23.347682+05:30
draft: false
images: ["images/you-dont-need-to-pay-for-distraction-blocking-software.jpg"]
thumbnail: "images/you-dont-need-to-pay-for-distraction-blocking-software.jpg"
description: "Explore how iOS and Android apps like Foqos, Switchly, and Lock let you replicate the Brick’s NFC barrier for under $2, and why it matters today."
categories: ["Software"]
tags: ["NFC", "distraction blocking", "open source"]
---

## The Problem With Paying for a Physical Blocker

Digital distraction has become a measurable productivity killer. Apps like Instagram, TikTok, and endless news feeds are engineered to keep users scrolling, often at the expense of deep work or personal well‑being. The market responded with hardware solutions that create a literal “wall” between the phone and the app. The most visible of these is **The Brick**, a $59 NFC‑enabled block that forces you to stand up, locate the device, and tap your phone before you can open a restricted app.

While the concept is elegant, the price point and single‑purpose design raise a question: *Do we really need to spend nearly sixty dollars for a physical barrier when the same functionality can be reproduced with free software and a $1 NFC tag?* This article dissects the technical underpinnings, compares the commercial hardware with open‑source alternatives, and explains why the shift matters for both users and the broader tech ecosystem.

## Why Physical Barriers Still Matter

### Psychological Friction

Research on habit formation shows that adding a small amount of friction can dramatically reduce unwanted behavior. The act of walking to a desk, finding a brick, and tapping a phone introduces a pause that allows the brain to reconsider the impulse. This “micro‑delay” is more effective than a simple software timer because it requires a physical action that cannot be dismissed with a single tap.

### Data Privacy

Many commercial blockers rely on cloud‑based services to sync schedules or enforce rules, which can expose usage patterns to third parties. Open‑source apps like **Foqos** keep all data on‑device, guaranteeing that your self‑control metrics never leave your phone. For privacy‑conscious users, this is a decisive advantage.

### Cost Efficiency

A single blank NFC chip costs roughly **$1**. When paired with a free app, the total expense to replicate The Brick’s core functionality drops below **$2**. This democratizes access to distraction‑blocking tools for students, freelancers, and anyone on a tight budget.

## Technical Breakdown: NFC, QR, and Barcode Triggers

### How NFC Enables a “Tap‑to‑Lock” Experience

Near‑Field Communication (NFC) is a short‑range wireless protocol that allows two devices to exchange data when they are within a few centimeters of each other. The Brick embeds a standard NFC chip that, when tapped, sends a predefined command to its companion app, toggling a block profile.

Free alternatives use the same principle:

- **Foqos (iOS)** – Reads any NFC tag programmed with a URL or custom payload. The app interprets the tag as a “trigger” to enable or disable a block.
- **Switchly (Android)** – Supports both NFC tags and QR codes. The QR option is handy for devices without NFC hardware.
- **Lock (Android)** – Focuses exclusively on NFC for a streamlined experience.

Because the NFC standards are open, developers can program generic tags with simple text strings (e.g., `foqos://enable`) and achieve the same result as a proprietary device.

### QR Codes and Barcodes as Low‑Cost Triggers

Not every phone has NFC (especially older iOS models). QR codes provide a universal fallback. By printing a QR on a sticky note, a book cover, or even a coffee cup, you create a visual cue that can be scanned to toggle a block. **Foqos** even allows any existing barcode—such as a product UPC—to serve as a trigger, turning everyday objects into “digital gatekeepers.”

### Scheduling and Anti‑Circumvention Features

All three apps include schedule‑based blocking, letting users define work hours, study sessions, or bedtime windows. The standout feature is **Foqos’ anti‑circumvention** logic: while a profile is active, the app disables its own settings screen, preventing a user from simply uninstalling or disabling the blocker mid‑session. This mirrors the “cannot delete the Brick” sentiment expressed by the original hardware’s creators.

## Brick vs. Free Solutions: A Feature‑by‑Feature Comparison

| Feature | The Brick (Hardware) | Foqos (iOS) | Switchly (Android) | Lock (Android) |
|--------|----------------------|------------|--------------------|----------------|
| Price | $59 | Free (Open Source) | Free tier; Premium for Wi‑Fi/Bluetooth triggers | Free (Polished) |
| Trigger Types | NFC only | NFC, QR, any barcode | NFC, QR, Wi‑Fi/Bluetooth (Premium) | NFC only |
| Scheduling | Fixed daily schedule | Daily schedule, limited breaks | Daily schedule, Wi‑Fi/Bluetooth triggers | Daily schedule |
| Anti‑Circumvention | Built‑in via Brick app | Blocks app settings while profile runs | No built‑in anti‑circumvention | No explicit anti‑circumvention |
| Data Privacy | Cloud sync optional | All data stays on device | Cloud sync optional for premium | Local only |
| Customizability | Limited to Brick firmware | Open‑source code, community forks | Experimental feature blocking (e.g., Instagram Reels) | Minimal UI customization |
| Hardware Dependency | Requires proprietary brick | Any blank NFC tag (~$1) | Any NFC tag or QR code | Any NFC tag |

The table makes it clear that the free ecosystem not only matches the core functionality of The Brick but also adds flexibility (multiple trigger options) and stronger privacy guarantees. The only advantage the hardware retains is a **single‑purpose, tactile feel** that some users find psychologically compelling.

## Industry Impact: From Niche Gadget to Open‑Source Movement

### Accelerating the “DIY Productivity” Trend

The rise of inexpensive NFC tags and open‑source mobile apps reflects a broader shift toward do‑it‑yourself productivity tools. Just as hobbyists repurpose cheap microcontrollers for home automation, they now use $1 tags to enforce personal discipline. This democratization encourages developers to build modular, interoperable solutions rather than locked‑in ecosystems.

### Implications for App Developers

If a growing segment of users adopts external blockers, app developers may need to reconsider how they design engagement loops. Features that rely on endless scrolling could be penalized by users who have set strict block profiles. This could push developers toward **intent‑driven design**, where value is delivered in concise, purposeful sessions rather than endless feeds.

### Cross‑Device Synergy

The same NFC infrastructure that powers distraction blockers can be leveraged for other contexts—smart home triggers, secure login, or even contactless payments. The **June Oven** article ([https://ltdeveloperblogs.github.io/posts/the-smart-home-graveyard-is-getting-crowded](https://ltdeveloperblogs.github.io/posts/the-smart-home-graveyard-is-getting-crowded)) illustrates how inexpensive NFC tags are already being used to start appliances without a dedicated remote. The convergence of these use‑cases suggests a future where a single NFC tag can toggle multiple services, reducing the need for dedicated hardware.

### Lessons From Other Low‑Cost Hardware

The **Xteink X4 Pro** ([https://ltdeveloperblogs.github.io/posts/xteink-x4-pro-pocket-e-reader-review-2026-fun-but-limited](https://ltdeveloperblogs.github.io/posts/xteink-x4-pro-pocket-e-reader-review-2026-fun-but-limited)) demonstrates that a tiny, inexpensive device can still deliver a compelling user experience when paired with robust software. Similarly, the **Cross Point Reader** ([https://ltdeveloperblogs.github.io/posts/xteinks-tiny-e-readers-are-getting-access-to-free-books-through-libby](https://ltdeveloperblogs.github.io/posts/xteinks-tiny-e-readers-are-getting-access-to-free-books-through-libby)) shows how open‑source ecosystems can extend the life and utility of modest hardware. These examples reinforce the argument that the value lies in software flexibility, not in the price tag of the physical component.

## Future Outlook: What Comes After Free NFC Blockers?

### Integration With Wearables

As smartwatches gain NFC capabilities, we can expect blockers to migrate to wrist‑worn devices. A tap of the watch could toggle a block profile, eliminating the need to locate a separate tag. Developers are already experimenting with **Foqos**‑style extensions for watchOS.

### Context

### Context‑Aware Triggers

Beyond a simple tap, the next generation of blockers will react to **environmental cues**. Imagine a scenario where your phone automatically engages a “focus” profile the moment you step into a cowork‑friendly coffee shop, detected via a Bluetooth beacon, or when your laptop’s Wi‑Fi network changes to a corporate SSID. Switchly already offers Wi‑Fi/Bluetooth‑based triggers in its premium tier, but open‑source projects are beginning to expose these hooks to the community:

- **Foqos** contributors have opened a GitHub issue requesting a “Location‑Based Profile” API, allowing developers to tie a block to GPS geofences.
- **Lock**’s roadmap mentions a “Smart‑Home Integration” module that could listen for HomeKit scenes (e.g., “Work Mode”) and toggle the blocker accordingly.

These context‑aware triggers blur the line between **hardware‑only** and **software‑only** solutions, making the physical tag just one of many possible inputs.

### Community‑Driven Enhancements

Because the codebases are open, anyone can add features that the original Brick never imagined:

| Community Idea | Current Status | How to Contribute |
|----------------|----------------|-------------------|
| **Custom Sound Alerts** – Play a brief chime when a block is activated | Implemented in a fork of Foqos (v0.3.1) | Submit a pull request to the `foqos/ios` repo |
| **Multi‑Tag Profiles** – Different tags for “Morning Focus” vs. “Evening Wind‑Down” | Prototype in Switchly’s experimental branch | Open an issue on the Switchly Play Store page |
| **Analytics Dashboard** – Visualize daily block attempts without sending data off‑device | Planned for Lock v2.0 | Contribute to the `lock-android` issue tracker |
| **Voice‑Activated Bypass** – Use a short spoken phrase to temporarily suspend a block | Not yet started | Fork the repository and add a SpeechRecognizer integration |

The open‑source model encourages rapid iteration, and the community often ships features months before a commercial vendor can roll out a firmware update.

## Practical Setup Guide: Replicating The Brick for Under $2

Below is a concise, step‑by‑step checklist that anyone can follow, regardless of platform.

### 1. Acquire a Blank NFC Tag

- **Where to buy:** Amazon, eBay, or local electronics hobby shops. Look for “NTAG215” or “NTAG213” stickers; they work with both iOS and Android.
- **Cost:** Typically $0.80‑$1.20 for a pack of 10.

### 2. Install the Appropriate App

| Platform | Recommended App | Install Link |
|----------|----------------|--------------|
| iOS (12+) | **Foqos** – open‑source | <https://apps.apple.com/app/foqos> |
| Android (5.0+) | **Switchly** (free tier) | <https://play.google.com/store/apps/details?id=io.switchly> |
| Android (any) | **Lock** (polished) | <https://play.google.com/store/apps/details?id=com.lock.nfc> |

### 3. Program the Tag

1. Open the app’s “Trigger” section.
2. Choose **“Create New Tag”** → select **“Enable Block”** (or “Disable Block” for a toggle).
3. Hold the blank NFC tag against the back of your phone; the app will write a small payload (usually a custom URL scheme like `foqos://enable`).
4. Label the tag physically (e.g., “Work Focus”) with a marker or a printed QR code as a backup.

### 4. Define Your Block Profile

- **Select Apps/URLs:** Add Instagram, TikTok, YouTube, or any distracting website.
- **Schedule:** Set start/end times (e.g., 9 am‑12 pm, 1 pm‑5 pm). Enable “Limited Breaks” if you want short, timed windows.
- **Anti‑Circumvention:** Turn on the option that locks the app’s settings while the profile is active (available in Foqos; Switchly users can enable “App Lock” under Advanced Settings).

### 5. Test the Workflow

1. Place the tag on your desk.
2. Tap your phone to the tag – the app should display a confirmation (“Focus mode enabled”).
3. Attempt to open a blocked app; you should see a gentle “Blocked by Foqos” overlay.
4. To resume, tap the tag again (or scan the QR) and watch the block lift.

### 6. Optional Enhancements

- **Print a QR Backup:** Use any free QR generator (e.g., `qr-code-generator.com`) and stick the code next to the NFC tag.
- **Add a Bluetooth Beacon:** For Switchly premium users, place a cheap BLE beacon near your workstation to trigger blocks automatically when you’re within range.
- **Integrate with Home Automation:** Use Home Assistant or Apple Shortcuts to fire a webhook that toggles the block when a “Do Not Disturb” scene is activated.

## Tips for Maximizing Effectiveness

1. **Strategic Placement:** Keep the tag out of arm’s reach when you’re trying to stay focused (e.g., on a shelf). The extra effort to retrieve it reinforces the friction effect.
2. **Use Multiple Tags:** Assign one tag for “Deep Work” (strict block) and another for “Casual Browsing” (lighter block). Switching tags makes the process intentional.
3. **Combine with Pomodoro Timers:** Pair the blocker with a timer app; after each Pomodoro, tap the tag to grant a short, scheduled break.
4. **Review Weekly:** Both Foqos and Switchly provide a simple log of block attempts. Use this data to adjust schedules or add new apps to the block list.
5. **Avoid “All‑Or‑Nothing” Mentality:** If a block feels too restrictive, tweak the schedule rather than abandoning the system entirely. Small wins compound over time.

## Conclusion

The Brick’s $59 price tag made a compelling statement: **physical friction can curb digital addiction**. Yet the underlying technology—NFC tags, QR codes, and simple on‑device rule engines—has been democratized by the open‑source community. With a $1 NFC sticker and a free app like **Foqos** or **Switchly**, anyone can recreate the Brick’s core experience, add richer triggers, and retain full control over their data.

Beyond cost savings, the shift to software‑first blockers fuels a broader movement toward **transparent, user‑centric productivity tools**. As developers continue to experiment with wearables, context‑aware triggers, and community‑driven features, the line between “hardware gadget” and “software service” will blur even further. For anyone looking to reclaim focus without breaking the bank, the answer is clear: skip the pricey brick, grab a cheap tag, and let open‑source innovation do the heavy lifting.

---

## Frequently Asked Questions

| Question | Answer |
|----------|--------|
| **Do NFC tags work on all iPhones?** | iPhone 7 and newer support NFC reading, but only iPhone XS/11 Pro and later can write tags. For older models, use a QR code trigger instead. |
| **Will the blocker drain my battery?** | The apps run as background services only when a profile is active. Battery impact is typically < 2 % per day, comparable to a standard fitness tracker. |
| **Can I block system apps like Settings?** | Neither Foqos nor Switchly can block core system settings directly, but they can prevent launching the Settings app itself, which effectively stops quick toggling of Wi‑Fi or Do Not Disturb. |
| **Is it safe to buy generic NFC tags?** | Yes, as long as you purchase from reputable sellers. The tags contain no firmware that can be remotely updated, so they pose no security risk. |
| **What if I lose the NFC tag?** | Simply program a new tag using the same app; the block profile is stored on the phone, not the tag. |
| **Can I sync my block schedule across multiple devices?** | Foqos stores everything locally, but you can export the profile JSON and import it on another iOS device. Switchly’s premium tier offers cloud sync via Google Drive. |
| **Do these apps work on tablets?** | Yes. Both iPadOS and Android tablets support NFC (if the hardware includes it) or QR scanning. |
| **Is there a way to temporarily override a block for emergencies?** | Most apps include a “panic” tap—usually a double‑tap on the tag within a short window—that disables the block for a configurable period (e.g., 5 minutes). |

---

If you’ve been hesitant to invest in a dedicated distraction‑blocking gadget, the tools outlined above prove that **functionality, privacy, and flexibility** are available for a fraction of the cost. Grab a cheap NFC sticker, install an open‑source app, and start building your own personalized “digital brick” today.

---
**Source:** [*Original Article*](https://www.wired.com/story/you-dont-need-to-pay-for-distraction-blocking-software/)


{{< comments >}}
