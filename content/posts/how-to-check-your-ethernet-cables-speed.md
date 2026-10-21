---
title: "How to Diagnose a Slow Ethernet Cable in 7 Steps"
date: 2026-10-21T14:22:07.445431+05:30
draft: false
images: ["images/how-to-check-your-ethernet-cables-speed.jpg"]
thumbnail: "images/how-to-check-your-ethernet-cables-speed.jpg"
description: "Learn to pinpoint if a sluggish Ethernet link stems from a bad cable, mismatched hardware, or settings, using Windows, macOS and iPerf3 checks."
categories: ["Networking"]
tags: ["Ethernet", "Cable Testing", "Network Troubleshooting"]
---

## Why Ethernet Speed Matters in Modern Workflows

A reliable gigabit Ethernet connection is no longer a luxury; it is the backbone of home offices, gaming rigs, and small‑business networks. When a link that should be delivering 1 Gbps stalls at 100 Mbps, the impact is immediate: large file transfers take minutes instead of seconds, video conferences become choppy, and cloud‑based development pipelines grind to a halt. Unlike Wi‑Fi, which can suffer from interference and signal attenuation, a wired link promises deterministic performance—*if* every component in the chain is functioning correctly. Understanding why speed matters helps justify the time spent on systematic diagnostics rather than simply replacing hardware out of frustration.

## Understanding Link‑Speed Indicators Across Operating Systems

Most users rely on the OS to report the negotiated link speed. While the numbers are easy to read, they can be misleading if you don’t know where to look.

### Windows 11 – Settings > Network & Internet > Ethernet

1. Open **Settings** and navigate to **Network & Internet** → **Ethernet**.  
2. Select the active adapter; the **Link speed (Receive/Transmit)** field shows the current negotiation (e.g., “1 Gbps”).  

Windows 11 presents the speed in a clean UI, but it does not differentiate between a physical limitation (cable) and a port limitation (router or adapter).

### Windows 10 – Shortcut Method

1. Press **Win + R**, type `ncpa.cpl`, and press **Enter**.  
2. Right‑click the Ethernet adapter, choose **Status**, and read the **Speed** field.  

This method works on any Windows 10 machine, even those without the newer Settings layout.

### macOS – System Settings > Network > Ethernet

1. Open **System Settings** → **Network** → **Ethernet** (or the USB Ethernet adapter).  
2. Click **Details** → **Hardware**; the **Speed** field displays the negotiated rate.  

macOS automatically sets the configuration to **Automatic**. Forcing a manual speed can cause the link to drop, so keep the default unless you have a specific reason to change it.

> **Pro tip:** If you see “100 Mbps” on a system that should support 1 Gbps, note the exact wording and take a screenshot. This documentation will be useful when you compare results after swapping cables or ports.

## Decoding Cable Categories and Their Real‑World Limits

Ethernet cables are labeled with a category (Cat) that indicates the design specifications. The most common markings you’ll encounter are **Cat5**, **Cat5e**, and **Cat6**.

| Category | Max Rated Speed* | Typical Use Cases |
|----------|------------------|-------------------|
| Cat5     | 100 Mbps (some 1 Gbps over short runs) | Legacy installations, short office runs |
| Cat5e    | 1 Gbps (up to 100 m) | Modern home and small‑business networks |
| Cat6     | 1 Gbps (up to 100 m) or 10 Gbps (up to 55 m) | Future‑proofing, data‑center uplinks |

\*The rating is a *design* limit; real‑world performance also depends on wire quality, connector integrity, and environmental factors.

### Why Category Is Not a Hard Ceiling

A **Cat5e** cable can still deliver 1 Gbps over a 10‑meter run, but the same cable might drop to 100 Mbps if one of the four twisted pairs is damaged. Gigabit Ethernet uses *all four* pairs, whereas 100 Mbps only needs two. A subtle bend, a nicked conductor, or a loose RJ45 crimp can break one pair, forcing the link to fallback automatically.

### Visual Inspection Checklist

- Look for the category marking on the jacket.  
- Verify that both ends have the same category label.  
- Check for visible kinks, frayed shielding, or uneven strain relief.  

If the cable looks suspect, treat it as the first candidate for replacement.

## Step‑by‑Step Troubleshooting Workflow

A disciplined approach saves time and money. Follow this checklist before buying a new cable.

1. **Confirm OS‑Reported Speed**  
   - Record the speed shown in Windows 11, Windows 10, or macOS.  

2. **Inspect Physical Connections**  
   - Reseat both RJ45 plugs.  
   - Ensure the port clicks firmly into place.  

3. **Swap to a Known‑Good Short Cable**  
   - Use a short (1–2 m) Cat5e or Cat6 cable that you know works.  
   - Re‑check the OS‑reported speed.  

   *If the speed jumps to 1 Gbps, the original cable is likely defective.*  

4. **Validate Port Capabilities**  
   - Check the router or switch specifications. Some consumer routers have a 100 Mbps LAN port paired with a 1 Gbps port.  
   - Verify that a USB Ethernet adapter is rated for gigabit; many cheap adapters are limited to 100 Mbps.  

5. **Test Both Ends Independently**  
   - Connect the cable to a different device (e.g., a laptop) and repeat the speed check.  
   - This isolates whether the issue is on the original computer’s NIC or the network equipment.  

6. **Run a Real‑Throughput Test (iPerf3)** – see next section.  

7. **Document Findings**  
   - Keep a simple log: cable ID, ports used, OS speed, iPerf3 results. This log is invaluable for future upgrades or warranty claims.

### Why Reseating Matters

Even a perfectly intact cable can suffer from a poor contact due to dust or a slightly misaligned pin. A quick unplug‑and‑plug often restores the full four‑pair connection, especially on older RJ45 sockets.

## Measuring Real Throughput with iPerf3

OS‑reported link speed is a *negotiated* value; it

OS‑reported link speed is a *negotiated* value; it tells you what the two ends of the link have agreed to use, but it doesn’t guarantee that the full bandwidth is actually being delivered. To see the true data‑transfer rate you need a traffic‑generator that can push the link hard enough to expose any bottlenecks. **iPerf3** is the de‑facto standard for this purpose because it’s free, cross‑platform, and gives you a clean, repeatable measurement.

### Installing iPerf3

| Platform | Installation command |
|----------|----------------------|
| **Windows 11 / 10** | Download the latest Windows binary from the [iPerf3 releases page](https://github.com/esnet/iperf) and unzip it to a folder on your `PATH` (e.g., `C:\Tools\iperf3`). |
| **macOS** | `brew install iperf3` (requires Homebrew). |
| **Linux** | `sudo apt-get install iperf3` (Debian/Ubuntu) or `sudo dnf install iperf3` (Fedora). |

### Preparing the Test Environment

1. **Disable Wi‑Fi** on both machines to force all traffic over the Ethernet link.  
2. **Connect both computers** to the same switch/router using the cable you want to test.  
3. **Assign static IPs** (optional but eliminates DHCP quirks). For a quick test you can use `192.168.99.1` on the server and `192.168.99.2` on the client with a `/24` mask.  

### Running the Test

On the **server** (the machine that will receive traffic):

```bash
iperf3 -s
```

The server will now listen on TCP port 5201.

On the **client** (the machine that will send traffic), run:

```bash
iperf3 -c 192.168.99.1 -t 10 -i 1
```

* `-c` – target server IP.  
* `-t 10` – run the test for 10 seconds (long enough for a stable average).  
* `-i 1` – report results every second.

You’ll see an output similar to:

```
[ ID] Interval           Transfer     Bandwidth
[  5]   0.00-1.00   sec  112 MBytes  941 Mbits/sec
[  5]   1.00-2.00   sec  115 MBytes  966 Mbits/sec
...
[SUM]   0.00-10.00  sec   1.20 GBytes   1.00 Gbits/sec
```

### Interpreting the Numbers

| Observed bandwidth | Likely cause |
|--------------------|--------------|
| **≈ 950 – 1 000 Mbps** | Cable, ports, and NIC are all healthy. |
| **≈ 500 Mbps** | One of the four pairs is partially compromised, or the NIC is negotiating a half‑duplex mode. |
| **≈ 100 Mbps** | Either the cable is limited to two pairs (e.g., damaged Cat5), the port is a 100 Mbps‑only LAN, or the USB‑Ethernet adapter is capped at 100 Mbps. |
| **Highly variable (spikes & drops)** | Interference on the cable (electromagnetic noise), poor crimp, or a failing switch port. |

If the iPerf3 result matches the OS‑reported speed, the link is performing as expected. If the iPerf3 bandwidth is **significantly lower**, you have a physical problem (cable, connector, or port) that needs replacement or repair.

### Quick “No‑Install” Alternatives

- **Windows built‑in `netsh`**: `netsh interface ipv4 show subinterfaces` lists the *Bytes/sec* counters, but it’s noisy and less precise.  
- **macOS `networkQuality`** (Big Sur+): `networkQuality -v` gives a rough throughput estimate, but it runs a short test and can be affected by background traffic.  

iPerf3 remains the most reliable because you control the payload size, test duration, and protocol (TCP vs. UDP).

## When to Replace the Cable vs. the Hardware

| Symptom | First action | Next step if unchanged |
|---------|--------------|------------------------|
| **OS shows 100 Mbps, iPerf3 shows ~100 Mbps** | Swap in a short, known‑good cable. | If speed jumps to 1 Gbps, discard the original cable. |
| **OS shows 1 Gbps, iPerf3 shows ~500 Mbps** | Reseat connectors, check for bent pins. | Test with a different port on the switch/router. |
| **Both OS and iPerf3 show 100 Mbps on a gigabit‑rated NIC** | Verify NIC driver is up‑to‑date; some drivers default to 100 Mbps for power‑saving. | Replace the NIC or use a USB‑to‑gigabit adapter. |
| **Fluctuating speeds after cable swap** | Try a different switch/router port (or a different switch). | Consider a faulty switch; replace or firmware‑update it. |

## Documenting the Process

A concise log helps you avoid repeating steps and provides evidence if you need to claim a warranty. Use a simple markdown table:

```markdown
| Test # | Cable ID | Port A | Port B | OS Speed | iPerf3 (Mbps) | Verdict |
|--------|----------|--------|--------|----------|---------------|---------|
| 1      | CABLE‑A  | PC‑NIC | Router‑1 | 100 Mbps | 98            | Suspect cable |
| 2      | CABLE‑B (known good) | PC‑NIC | Router‑1 | 1 Gbps | 985 | Cable OK |
```

Save this file alongside your network documentation for future reference.

## Conclusion

A sluggish Ethernet link is rarely a mystery; it’s usually a cascade of small issues that become obvious once you follow a systematic checklist:

1. **Read the OS‑reported speed** – gives you the negotiated baseline.  
2. **Visually inspect and reseat** the cable and connectors.  
3. **Swap in a short, known‑good cable** to isolate the cable itself.  
4. **Confirm port capabilities** (router, switch, USB adapter).  
5. **Run a real‑throughput test with iPerf3** to see what the wire actually delivers.  
6. **Log your findings** so you can track patterns over time.

By moving from “the internet is slow” to “the link is negotiating 100 Mbps on a gigabit‑rated NIC” you gain the confidence to replace only the component that truly needs it—saving both time and money.

---

## FAQ

**Q: My cable is labeled Cat5e but only gives me 100 Mbps. Is the label wrong?**  
A: Not necessarily. The cable may have a broken pair, a poor crimp, or be too long for the quality of the conductors. A quick swap with a known‑good cable will confirm whether the cable is at fault.

**Q: Can a router’s firmware cause a link to drop to 100 Mbps?**  
A: Yes. Some consumer routers default to 100 Mbps on certain ports to reduce power consumption or due to a buggy auto‑negotiation implementation. Updating the firmware or manually forcing gigabit mode (if the UI allows) often resolves this.

**Q: My USB‑Ethernet adapter shows 1 Gbps in Windows, but iPerf3 only reaches 200 Mbps.**  
A: Many cheap adapters advertise “Gigabit” but internally use a USB 2.0 bridge limited to ~480 Mbps, and real‑world throughput often caps around 200–250 Mbps. Verify the adapter’s specifications; a true USB 3.0‑to‑Gigabit adapter is required for full speed.

**Q: Does the length of the cable matter for gigabit Ethernet?**  
A: The standard allows up to 100 m (≈ 328 ft) for Cat5e/Cat6. Beyond that, attenuation and crosstalk increase, potentially causing fallback to 100 Mbps. For very long runs, consider fiber or a repeater.

**Q: Should I ever force a speed setting (e.g., 100 Mbps) in the OS?**  
A: Only as a diagnostic step. Forcing a lower speed can help you confirm that the hardware can at least maintain a stable link, but it defeats the purpose of a gigabit network and may hide underlying cable issues.

**Q: How often should I replace Ethernet cables?**  
A: Ethernet cables are robust; they typically outlast the devices they connect. Replace them only when you notice physical damage, after a failed diagnostic that points to the cable, or when you need to upgrade to a higher category for future‑proofing (e.g., Cat6a for 10 Gbps).

---

---
**Source:** [*Original Article*](https://www.engadget.com/2283972/how-to-check-ethernet-cable-speed/)


{{< comments >}}
