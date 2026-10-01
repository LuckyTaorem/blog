---
title: "OpenAI Launches Virtual Try-On & Favorites in ChatGPT"
date: 2026-10-02T01:59:02.816961+05:30
draft: false
images: ["images/chatgpt-can-now-virtually-try-on-clothes-for-you.jpg"]
thumbnail: "images/chatgpt-can-now-virtually-try-on-clothes-for-you.jpg"
description: "OpenAI adds AI‑driven virtual try‑on and Favorites library to ChatGPT, using Images 2.5 for quick visual fitting, reshaping online shopping today."
categories: ["Artificial Intelligence"]
tags: ["ChatGPT", "Virtual Try-On", "AI Shopping"]
---

## Overview: Why OpenAI’s New Shopping Tools Matter

On October 1, 2026, OpenAI announced the global rollout of two shopping‑centric features inside ChatGPT: a **Virtual Try‑On** experience and a **Favorites** library. Both are powered by the freshly released **ChatGPT Images 2.5** model, which OpenAI says delivers “more natural lighting and richer textures, follows editing instructions more reliably, and reduces image generation latency.”  

The significance of these additions goes beyond a simple UI tweak. They embed generative‑AI directly into the purchase funnel, turning a text‑only chatbot into a visual shopping assistant that can:

* **Render realistic clothing previews** on a user’s body in seconds.  
* **Persist product selections** alongside generated try‑on images for later reference.  
* **Bridge the gap** between inspiration (Pinterest‑style discovery) and conversion (checkout).

In a market where Google, Pinterest, and emerging agentic‑AI startups like Instinct are already experimenting with visual commerce, OpenAI’s move signals that large‑language‑model platforms are now serious contenders in the e‑commerce ecosystem.

## Technical Breakdown: The Images 2.5 Engine

### Core Improvements Over Previous Models

The Images 2.5 model is a diffusion‑based generator tuned specifically for fashion‑related prompts. Its enhancements include:

| Feature | Benefit |
|---------|---------|
| **Natural lighting** | Reduces the “studio‑look” artifact, making garments appear as they would in everyday environments. |
| **Richer textures** | Captures fabric nuances—silk sheen, denim weave, leather grain—critical for accurate fit perception. |
| **Instruction fidelity** | Better adherence to user edits such as “make the shirt more fitted” or “show the dress in daylight.” |
| **Latency reduction** | Average generation time drops from ~3 seconds to under 1.2 seconds on typical consumer hardware. |

These gains are the result of a larger training corpus that mixes high‑resolution runway photography with user‑generated selfies, plus a new conditioning pipeline that aligns pose estimation with garment segmentation

…that aligns pose estimation with garment segmentation, allowing the model to accurately drape clothing over a user’s body shape and posture. OpenAI also introduced a lightweight on‑device inference cache that stores recent pose embeddings, shaving milliseconds off each subsequent try‑on request.

### Prompt Engineering for Fashion

OpenAI exposed a set of “style tokens” that developers can embed in prompts to steer the visual output:

* `--fabric silk` – emphasizes sheen and smoothness.  
* `--lighting sunset` – simulates golden‑hour ambience.  
* `--fit relaxed` – widens the silhouette for a looser look.  

These tokens are optional for end‑users but power the underlying system to translate natural‑language tweaks (“make the jacket more fitted”) into concrete image‑generation parameters.

## How the Virtual Try‑On Feature Works

1. **Upload a Reference Image** – Users can drop a selfie, a full‑body photo, or even a screenshot of a product page. The app runs a face‑and‑body detector to extract key landmarks.  
2. **Select a Product** – ChatGPT surfaces a carousel of items matching the user’s query (e.g., “summer dresses under $150”). Each tile includes a “Try On” button.  
3. **Real‑Time Rendering** – When pressed, the Images 2.5 engine composites the selected garment onto the user’s pose, applying the appropriate lighting and fabric texture. The result appears within 1.2 seconds on average.  
4. **Iterative Edits** – Users can ask follow‑up questions like “show me the dress with a belt” or “swap the color to navy,” and the model regenerates the image while preserving the original body pose.  
5. **Save or Share** – The final render can be saved to the new **Favorites** library or shared directly to messaging apps, email, or social platforms.

### Edge Cases Handled

* **Partial Body Shots** – If only a torso is visible, the system extrapolates the missing limbs using a generative pose estimator, ensuring the garment fits plausibly.  
* **Multiple Users** – In group photos, the model can isolate each person and apply different outfits simultaneously, a feature useful for family shopping trips.  
* **Accessibility** – For visually impaired users, ChatGPT can describe the generated look aloud, citing fabric feel, cut, and color contrast.

## The Favorites Library: A Persistent Shopping Hub

The **Favorites** tab lives inside the ChatGPT sidebar under “Shopping.” When a user clicks “Save to Favorites,” the following occurs:

| Action | What Happens |
|--------|--------------|
| **Product Metadata Capture** | SKU, price, retailer link, and any discount codes are stored alongside the generated image. |
| **Versioned Try‑On Snapshots** | Each time a user revisits a product and tweaks the look, a new snapshot is appended, creating a visual history. |
| **Cross‑Device Sync** | Favorites sync via the user’s OpenAI account, making them accessible on mobile, desktop, or the upcoming ChatGPT‑plus smartwatch app. |
| **Export Options** | Users can export a PDF lookbook, download a CSV of product URLs, or push the list to a connected e‑commerce cart (e.g., Shopify, Amazon). |

The library also integrates with OpenAI’s **Shopping Assistant** AI, which can proactively suggest complementary items based on the saved wardrobe, nudging users toward complete outfits.

## Competitive Landscape: Who’s Already Doing This?

| Company | Feature | Launch Year | Notable Edge |
|---------|---------|-------------|--------------|
| **Google** | “Lens Try‑On” (AR overlay) | 2023 | Real‑time AR on Android devices, no server‑side rendering. |
| **Pinterest** | “Shop the Look” visual search | 2024 | Community‑curated style boards, strong social discovery. |
| **Instinct** | “Proactive Recommendations” | 2025 | Agentic AI that pushes product alerts based on user behavior. |
| **OpenAI** | **Virtual Try‑On + Favorites** | 2026 | Diffusion‑based photorealism, seamless text‑to‑image loop, integrated LLM context. |

While Google’s AR solution excels on-device, it lacks the generative flexibility to change garment attributes (e.g., color, fit) on the fly. Pinterest offers inspiration but does not render the user wearing the items. Instinct’s proactive nudges are powerful but still rely on static product images. OpenAI’s approach uniquely blends generative visual synthesis with conversational context, allowing a back‑and‑forth dialogue that feels more like a personal stylist than a static catalog.

## Pricing, Availability, and Rollout

* **General Availability:** The features are live globally for all ChatGPT users on the free tier, with no additional charge.  
* **Premium Enhancements:** ChatGPT Plus subscribers receive higher‑resolution renders (up to 4K) and priority access to the “Batch Try‑On” mode, which can process up to 10 items in a single request.  
* **Enterprise Integration:** OpenAI offers an API endpoint for brands to embed the try‑on widget directly into their e‑commerce sites, billed per 1,000 render calls ($0.12 USD).  
* **Data Privacy:** All uploaded images are encrypted at rest and processed transiently; OpenAI does not retain raw selfies beyond the session unless the user explicitly saves them to Favorites.

## Potential Concerns and Ethical Considerations

1. **Body Image Impact** – Realistic try‑ons could reinforce unrealistic beauty standards if the underlying pose estimator normalizes body shapes. OpenAI mitigates this by preserving the user’s original silhouette and offering an “anonymous mode” that blurs personal identifiers.  
2. **Intellectual Property** – The model was trained on publicly available fashion photography, raising questions about rights to generated images. OpenAI’s licensing team has secured agreements with major fashion houses to ensure commercial usage is permissible.  
3. **Bias in Recommendations** – Early testing showed a slight over‑representation of Western fashion trends. Ongoing fine‑tuning incorporates diverse cultural datasets to broaden style coverage.  
4. **Security of Payment Links** – While the platform only stores product URLs, phishing attacks could exploit the UI. OpenAI partners with major retailers to verify link authenticity via OAuth‑based token validation.

## Conclusion

OpenAI’s launch of **Virtual Try‑On** and **Favorites** marks a pivotal moment in the convergence of conversational AI and visual commerce. By leveraging the newly minted **ChatGPT Images 2.5** model, the company delivers photorealistic, low‑latency garment visualizations directly within a chat interface—something no competitor currently matches at scale. The seamless loop of “ask‑search‑try‑save” transforms ChatGPT from a knowledge base into a personal shopping companion, blurring the line between discovery and purchase.

As the feature set matures, we can expect deeper integrations with brand catalogs, richer styling advice powered by the underlying LLM, and perhaps even virtual fitting rooms that incorporate body measurements from wearables. For consumers, the promise is clear: a faster, more confident path from inspiration to checkout, all without leaving the chat window.

---

## FAQ

**Q: Do I need a high‑end GPU to use Virtual Try‑On?**  
A: No. All rendering happens on OpenAI’s cloud infrastructure. Users only need a stable internet connection and a device capable of uploading images.

**Q: Can I try on items that aren’t in the OpenAI catalog?**  
A: Yes. If you provide a URL or upload an image of a specific product, the model can attempt to map it onto your pose, though accuracy may vary for niche items.

**Q: How many items can I save in Favorites?**  
A: There is no hard limit for free users; however, the UI paginates after 200 entries for performance reasons. Plus users can create multiple “Collections” for better organization.

**Q: Is my selfie stored permanently?**  
A: Raw selfies are deleted after the session unless you explicitly save the try‑on image to Favorites. Saved images are encrypted and tied to your OpenAI account.

**Q: Will the try‑on work with accessories like glasses or hats?**  
A: The current release supports clothing, shoes, and bags. Future updates aim to add eyewear, jewelry, and even makeup overlays.

**Q: How does OpenAI handle size recommendations?**  
A: The system can infer approximate sizing based on the user’s uploaded photo and the retailer’s size chart, offering a “size confidence score” (low, medium, high). It’s advisory only and does not replace the retailer’s sizing guide.

**Q: Can developers integrate this into their own apps?**  
A: Yes. OpenAI provides a RESTful API for the Images 2.5 engine and a JavaScript SDK for embedding the try‑on widget. Documentation is available on the OpenAI Platform portal.

**Q: What if the generated image looks off?**  
A: You can request a regeneration with additional prompts (e.g., “make the sleeve shorter”) or revert to the original product image. The system learns from corrective feedback to improve future renders.

**Q: Will there be a paid “Pro” tier for brands?**  
A: OpenAI announced an upcoming “Commerce Pro” plan for retailers, offering bulk rendering discounts, custom brand fine‑tuning, and analytics dashboards. Launch is slated for Q1 2027.

---
**Source:** [*Original Article*](https://techcrunch.com/2026/10/01/chatgpt-can-now-virtually-try-on-clothes-for-you/)


{{< comments >}}
