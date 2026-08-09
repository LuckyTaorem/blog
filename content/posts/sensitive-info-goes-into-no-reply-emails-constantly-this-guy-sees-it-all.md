---
title: "No-Reply Emails Leak Sensitive Data—Here’s the Fix"
date: 2026-08-09T21:32:12.378253+05:30
draft: false
images: ["images/sensitive-info-goes-into-no-reply-emails-constantly-this-guy-sees-it-all.jpg"]
thumbnail: "images/sensitive-info-goes-into-no-reply-emails-constantly-this-guy-sees-it-all.jpg"
description: "Security researchers reveal how misconfigured no-reply emails expose private data, credentials, and company secrets—plus how to stop the leaks."
categories: ["Security"]
tags: ["data leaks", "email security", "cybersecurity", "privacy", "misconfiguration"]
---

## The Accidental Honeypot: How Two Domains Became a Data Leak Goldmine

Security researcher Cory Solovewicz never intended to create a surveillance system for corporate secrets. Yet, his domains—**noreply.us** (registered in 2020) and **noreply.net** (registered in 2024)—have become unintentional magnets for sensitive data. Since December 2024, **noreply.net** alone has received **401,796 emails**, averaging **699.99 per day**. The older **noreply.us** has collected **37,255 emails** over **2,345 days**, or roughly **15.89 daily**.

The emails aren’t just spam. They include **injury reports from city governments**, **CCTV stills of industrial workers**, **Zoom invites from UK agencies**, and even **test credentials for staging environments**. Solovewicz describes it as an "accidental honeypot," but the implications are far from accidental. Companies are **inadvertently broadcasting private data** to domains they assume are unmonitored.

Mike Sheward, head of security at **Xeal**, experienced a similar phenomenon with **deleteduser.com**, a domain he purchased for **$15**. Over time, it received emails from **100+ organizations**, including **Viagra orders, hotel bookings, and internal vacation requests**. Like Solovewicz, Sheward now owns **30+ domains** to prevent malicious actors from exploiting the same misconfiguration.

## Why This Happens: The Technical Breakdown

### The Root Cause: Misconfigured Email Systems
The issue stems from a fundamental misunderstanding of how **no-reply addresses** work. Companies often assume that emails sent to **@noreply.[domain]** are **automatically discarded** or **bounced back**. In reality, if the domain exists and has a **catch-all inbox** (a setting that accepts all emails sent to any address under the domain), the messages are **delivered and stored**.

Solovewicz’s investigation revealed that out of **7,136 scanned domains**, **328 had catch-all inboxes enabled**. This means that any email sent to **@[domain]**—regardless of the local part (e.g., **randomstring@noreply.net**)—would be accepted.

### Common Scenarios Leading to Leaks
1. **Employee Offboarding**: When an employee leaves, companies often replace their email with a placeholder like **deleted.user@noreply.[domain]**. If the domain exists, the emails continue flowing.
2. **Test Environments**: Developers testing email functionality may use **@noreply.[domain]** as a dummy address, not realizing the domain is active.
3. **Third-Party Integrations**: SaaS platforms and APIs may default to **@noreply.[domain]** for notifications, assuming the address is invalid.
4. **Legacy Systems**: Older systems may still use **@donotreply.com** (a domain popularized by security journalist **Brian Krebs in 2005**), which is now a real, purchasable domain.

### The Domino Effect of Data Exposure
The consequences of these leaks extend beyond embarrassment. Solovewicz and Sheward have received:
- **Credentials for staging environments** (a goldmine for attackers).
- **Internal documents** (e.g., vacation requests, repair orders).
- **PII (Personally Identifiable Information)** (e.g., hotel guest names, pizza order details).
- **Sensitive media** (e.g., CCTV footage of workers in the Middle East).

If these domains had fallen into the wrong hands, the data could have been used for **phishing, extortion, or corporate espionage**.

## Industry Impact: A Widespread but Overlooked Problem

### The Scale of the Issue
Solovewicz’s **noreply.net** has received emails from **14,000+ unique "from" addresses** and **6,200 root domains**. Among the senders:
- **Government agencies** (e.g., UK Zoom invites, city injury reports).
- **Cybersecurity firms** (ironically, some of the same companies tasked with protecting data).
- **Microsoft partners** (highlighting that even tech-savvy organizations are vulnerable).
- **AI companies** (e.g., the unnamed firm sending CCTV stills of industrial workers).

Sheward’s **deleteduser.com** received emails from **100+ organizations**, proving that this isn’t an isolated incident. The problem is **systemic**, affecting companies of all sizes and industries.

### Why Companies Ignore the Risk
1. **False Sense of Security**: Many assume that **@noreply.[domain]** is inherently safe because it "shouldn’t exist."
2. **Lack of Audits**: Email configurations are rarely reviewed unless a breach occurs.
3. **Legacy Dependencies**: Some systems are hardcoded to use **@noreply.[domain]**, making updates difficult.
4. **Low Priority**: Compared to ransomware or phishing attacks, this issue is often dismissed as "low-risk."

### The Responsible Disclosure Dilemma
Both Solovewicz and Sheward have **alerted affected companies**, but responses have been mixed:
- Some organizations **fixed the issue immediately**.
- Others **ignored the warnings**.
- A few **accused the researchers of hacking** (despite the emails being sent voluntarily).

Solovewicz admits that handling the volume of leaks has become a **"full-time job."** His motivation for going public? **"You guys need to fix your systems and not do this."**

## How to Fix the Problem: Best Practices for Companies

### Immediate Mitigation Steps
1. **Use Non-Existent Domains**:
   - Replace **@noreply.[domain]** with **@[company].invalid** (the **.invalid** TLD is guaranteed to never resolve).
   - Alternatively, use **@[company].internal** for internal communications.
2. **Disable Catch-All Inboxes**:
   - Configure email servers to **bounce** messages sent to invalid addresses.
3. **Audit Email Configurations**:
   - Review all systems that send emails to **@noreply.[domain]** and update them.
4. **Monitor for Leaks**:
   - Use tools like **Have I Been Pwned** or **Google Alerts** to detect if your domain is receiving unintended emails.

### Long-Term Solutions
1. **Employee Training**:
   - Educate developers and IT teams on the risks of using **@noreply.[domain]**.
2. **Automated Testing**:
   - Implement CI/CD pipelines that **scan for hardcoded no-reply addresses** in code.
3. **Third-Party Vetting**:
   - Ensure vendors and partners **do not default to @noreply.[domain]** in their integrations.
4. **Domain Purchasing**:
   - Proactively buy **@noreply.[yourcompany]** and similar domains to prevent misuse (as Solovewicz and Sheward have done).

### For Developers: Secure Coding Practices
- **Never hardcode no-reply addresses** in applications.
- **Use environment variables** for email configurations.
- **Validate email domains** before sending sensitive data.

## The Future Outlook: Will Companies Act?

### The Role of Security Researchers
Solovewicz and Sheward have **demonstrated the scale of the problem**, but their work is far from over. Both continue to:
- **Monitor their domains** for new leaks.
- **Alert companies** via responsible disclosure.
- **Advocate for systemic change** in how no-reply emails are handled.

Their efforts highlight a broader issue in cybersecurity: **many vulnerabilities are hiding in plain sight**, waiting for someone to notice.

### Regulatory and Compliance Risks
Data leaks via misconfigured emails could violate:
- **GDPR** (if EU citizen data is exposed).
- **CCPA** (if California resident data is leaked).
- **HIPAA** (if medical records are involved).

Companies that ignore these risks may face **fines, lawsuits, or reputational damage**.

### The Malicious Actor Threat
While Solovewicz and Sheward are **ethical researchers**, the same domains could be exploited by:
- **Hackers** (for phishing or credential theft).
- **Extortionists** (threatening to leak sensitive data).
- **Corporate spies** (gathering competitive intelligence).

The fact that **30+ domains** have been purchased to block malicious actors underscores the **real-world risk**.

## FAQ: What You Need to Know

### **Q: How do I check if my company is leaking data via no-reply emails?**
A: Search your email logs for messages sent to **@noreply.[domain]**. If the domain exists (e.g., **noreply.net**), the emails may be delivered. Use tools like **MXToolbox** to verify domain status.

### **Q: What’s the safest alternative to @noreply.[domain]?**
A: Use **@[company].invalid** (e.g., **notifications@acme.invalid**). The **.invalid** TLD is reserved for this purpose and will never resolve.

### **Q: Can I buy a domain to prevent leaks?**
A: Yes, but it’s a **temporary fix**. The real solution is to **audit and update your email systems**. Solovewicz and Sheward own **30+ domains** to block misuse, but this isn’t scalable for most companies.

### **Q: What should I do if I find my company’s data in a leak?**
A: **Rotate all exposed credentials**, review email configurations, and **disable catch-all inboxes**. If the leak involves **PII or regulated data**, consult legal/compliance teams.

### **Q: Are there tools to automate this fix?**
A: Yes. **Email security platforms** (e.g., Mimecast, Proofpoint) can detect misconfigured no-reply addresses. **CI/CD tools** (e.g., GitHub Actions) can scan for hardcoded no-reply emails in code.

### **Q: How does this compare to other email security risks?**
A: Unlike **phishing** or **spoofing**, this issue is **self-inflicted**—companies are **voluntarily sending data** to unmonitored domains. For more on email security, check out our guide on [how to disable Google Gemini in Gmail & Docs](https://ltdeveloperblogs.github.io/posts/how-to-disable-gemini-in-gmail-and-google-docs), which covers AI-driven email risks.

## Conclusion: A Wake-Up Call for Email Security

The story of **noreply.us**, **noreply.net**, and **deleteduser.com** is a stark reminder that **security isn’t just about defending against attackers—it’s about not shooting yourself in the foot**. Companies are **leaking sensitive data by the thousands** through a **completely avoidable misconfiguration**.

The fixes are **simple**:
✅ **Stop using @noreply.[domain].**
✅ **Use @[company].invalid instead.**
✅ **Disable catch-all inboxes.**
✅ **Audit email systems regularly.**

Yet, as Solovewicz and Sheward have shown, **awareness is the first hurdle**. Until companies treat no-reply emails with the same scrutiny as other security risks, the leaks will continue.

For more on **cybersecurity best practices**, explore our coverage of [YouTube’s fight against AI slop](https://ltdeveloperblogs.github.io/posts/youtube-clarifies-policies-around-ai-slop-and-upsetting-videos), which highlights how platforms are combating misinformation and data misuse.

---
**Source:** [*Original Article*](https://www.wired.com/story/sensitive-info-goes-into-no-reply-emails-constantly-this-guy-sees-it-all/)


{{< comments >}}
