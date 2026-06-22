---
title: "Windows Linux Security Deadline"
date: 2026-06-22T04:18:03.017468+00:00
draft: false
images: ["images/a-critical-deadline-is-approaching-for-windows-and-linux-security.jpg"]
thumbnail: "images/a-critical-deadline-is-approaching-for-windows-and-linux-security.jpg"
description: "A critical deadline is approaching for Windows and Linux security updates to protect against UEFI infections"
categories: ["Security"]
tags: ["Windows", "Linux", "UEFI", "Security", "Malware"]
---

## Introduction to UEFI Infections
The clock is ticking for Windows and Linux users to update their cryptographic keys that protect their systems against firmware-based UEFI infections. Beginning June 24, three certificates that cryptographically verify each piece of firmware and software that loads during system boot will expire. These Microsoft-signed certificates are the linchpins of Secure Boot, a Microsoft-designed chain of trust. Secure Boot checks the digital signatures of all firmware that loads during system startup to ensure it originates from a trusted provider, such as the manufacturer of the motherboard the system runs on.

### What are UEFI Infections?
UEFI (Unified Extensible Firmware Interface) infections are a type of malware that loads before the operating system and antimalware protections start. They are a form of bootkit that alters the UEFI, the successor to the BIOS, which begins the initial boot sequence. Because these bootkits load before the OS and most other code, they can be difficult to detect. Once installed, they typically load malware onto the OS that steals credentials, backdoors the system, or performs other malicious actions.

### History of Bootkits
The genesis of bootkits dates back to the early 1980s with the creation of several pieces of malware that targeted Apple II machines during the boot process. They spread in the wild through floppy disks that ostensibly contained pirated games. Windows bootkits gained notice in the early 2000s as proofs of concept developed by researchers of offensive security. Boot Root, a bootkit demonstrated at the 2005 Black Hat security conference, is likely the first such instance. The malware infected the Network Driver Interface, which streamlined communications between network protocol drivers enabling service such as TCP/IP network adapter drivers.

## Types of UEFI Bootkits
In the years following, similar proofs of concept included:
* Vbootkit
* The Stoned Bootkit
* Mebroot
There were many more. In 2012, a new form of bootkit was demonstrated. Instead of targeting machines through the BIOS or master boot record, one such bootkit attacked Mac OS X systems by infecting the EFI, a package of firmware that started the boot process. A second very primitive bootkit targeted Windows 8 machines by infecting the UEFI bootkit, the predecessor to the UEFI.

### Advanced UEFI Bootkits
Around 2013, a researcher demonstrated a more advanced UEFI bootkit for Windows named Dreamboat. The first known case of a real-world attack targeting the UEFI came in 2018 with the discovery of malware dubbed LoJax. A repurposed version of legitimate anti-theft software known as LoJack, it was created by the Kremlin-backed hacking group tracked under names including Sednit, Fancy Bear, and APT 28. The malware was installed remotely using malware tools that can read and overwrite parts of the UEFI firmware’s flash memory.

## Real-World UEFI Bootkits
In 2020, researchers unearthed the second known instance of real-world malware attacking the UEFI. Each time an infected device rebooted, its UEFI checked whether a malicious file was present in the Windows startup folder and, if not, installed it. Researchers from Kaspersky, the security provider that discovered the malware, named it “Mosaic Regressor.” Researchers have yet to determine how the compromised UEFIs became infected. Since then, a handful of new UEFI bootkits have come to light. They are tracked under names including:
* ESpecter
* Fin Spy

### Impact of UEFI Bootkits
UEFI bootkits can have a significant impact on the security of a system. Because they load before the OS and most other code, they can be difficult to detect. Once installed, they typically load malware onto the OS that steals credentials, backdoors the system, or performs other malicious actions. Even when the OS is disinfected, the bootkit can reinfect the system. Bootkits survive OS reinstallations as well.

## Secure Boot and UEFI Infections
Secure Boot is designed to thwart UEFI bootkits. It checks the digital signatures of all firmware that loads during system startup to ensure it originates from a trusted provider, such as the manufacturer of the motherboard the system runs on. Secure Boot is a Microsoft-designed chain of trust that uses Microsoft-signed certificates to verify the authenticity of firmware and software that loads during system boot.

### How Secure Boot Works
Secure Boot works by:
* Checking the digital signatures of all firmware that loads during system startup
* Verifying that the firmware originates from a trusted provider
* Preventing the loading of firmware that is not signed with a trusted certificate
* Ensuring that the system boots with a trusted set of firmware and software

## Updating Cryptographic Keys
Beginning June 24, three certificates that cryptographically verify each piece of firmware and software that loads during system boot will expire. Windows and Linux users must update their cryptographic keys to protect their systems against UEFI infections. The update process involves:
* Updating the UEFI firmware to the latest version
* Installing the latest Secure Boot certificates
* Ensuring that the system is configured to use Secure Boot

### Importance of Updating Cryptographic Keys
Updating cryptographic keys is crucial to protect against UEFI infections. If the certificates expire, the system may not be able to boot or may boot with an untrusted set of firmware and software. This can leave the system vulnerable to UEFI bootkits and other types of malware.

## FAQ
### What are UEFI infections?
UEFI infections are a type of malware that loads before the operating system and antimalware protections start. They are a form of bootkit that alters the UEFI, the successor to the BIOS, which begins the initial boot sequence.

### What is Secure Boot?
Secure Boot is a Microsoft-designed chain of trust that uses Microsoft-signed certificates to verify the authenticity of firmware and software that loads during system boot. It checks the digital signatures of all firmware that loads during system startup to ensure it originates from a trusted provider.

### Why is it important to update cryptographic keys?
Updating cryptographic keys is crucial to protect against UEFI infections. If the certificates expire, the system may not be able to boot or may boot with an untrusted set of firmware and software. This can leave the system vulnerable to UEFI bootkits and other types of malware.

### How do I update my cryptographic keys?
The update process involves updating the UEFI firmware to the latest version, installing the latest Secure Boot certificates, and ensuring that the system is configured to use Secure Boot. It is recommended to consult the manufacturer’s documentation for specific instructions on how to update the cryptographic keys.

### What are the consequences of not updating cryptographic keys?
If the certificates expire, the system may not be able to boot or may boot with an untrusted set of firmware and software. This can leave the system vulnerable to UEFI bootkits and other types of malware. It is crucial to update the cryptographic keys to protect against UEFI infections.

## Conclusion
In conclusion, the deadline for updating cryptographic keys to protect against UEFI infections is approaching. Windows and Linux users must update their cryptographic keys to ensure that their systems are protected against UEFI bootkits and other types of malware. Secure Boot is a crucial component of system security, and updating cryptographic keys is essential to ensure that the system boots with a trusted set of firmware and software. By understanding the importance of updating cryptographic keys and following the recommended update process, users can protect their systems against UEFI infections and ensure the security and integrity of their data.

{{< comments >}}
