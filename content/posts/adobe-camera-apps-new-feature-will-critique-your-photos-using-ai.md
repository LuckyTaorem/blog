---
title: "Adobe's Project Indigo Brings AI Photo Critique to iOS"
date: 2026-07-20T22:29:13.665772+05:30
draft: false
images: ["images/adobe-camera-apps-new-feature-will-critique-your-photos-using-ai.jpg"]
thumbnail: "images/adobe-camera-apps-new-feature-will-critique-your-photos-using-ai.jpg"
description: "Adobe adds AI‑driven tools to its iOS camera, Project Indigo, delivering photo critique, object removal, depth‑of‑field and style new transfer."
categories: ["Creative/Design"]
tags: ["Adobe", "AI", "iOS"]
---

## Introduction: Why Project Indigo Matters

Adobe’s reputation as the backbone of professional creative workflows has long been anchored in desktop‑class tools like Photoshop and Lightroom. The announcement that the company is now embedding sophisticated generative‑AI capabilities into an experimental iOS camera app—Project Indigo—signals a decisive shift toward democratizing high‑end photo editing directly on the phone. The feature set, which includes a “Photo Critique” engine, AI‑driven object removal, depth‑of‑field synthesis, and style‑transfer workflows, moves the conversation from “post‑capture editing” to “real‑time creative assistance.”  

For mobile photographers, this blurs the line between casual snapping and studio‑level composition. For the broader ecosystem, it forces Apple, Google, and other photo‑app vendors to rethink how AI is integrated into their native galleries and third‑party tools. The timing is also noteworthy: generative AI has exploded in popularity, yet many consumer‑facing products still rely on simple filters or manual adjustments. Project Indigo’s suite of prompts and suggestions offers a more nuanced, context‑aware experience that could set a new baseline for what users expect from a camera app.

Marc Levoy, the lead of Project Indigo, summed up the challenge succinctly: *“most generative AI tools provide prompt‑based editing and, often, finding the perfect prompt to tweak a photo or get the right result can be a tricky endeavour.”* By embedding the prompt generation directly into the camera UI, Adobe hopes to eliminate that friction, letting the device suggest edits before the user even thinks about them.

## Technical Deep Dive: How Adobe’s AI Powers the New Features

### Photo Critique Engine

At the heart of Project Indigo is a neural‑network model trained on millions of professionally curated photographs. The model evaluates composition, lighting, color balance, and even the emotional narrative of an image. When a user captures a shot, the engine returns a concise, human‑readable critique—e.g., “Consider shifting the subject 10 % to the right to improve rule‑of‑thirds balance” or “Warm up the shadows to enhance mood.”  

The model likely leverages a combination of convolutional neural networks (CNNs) for low‑level texture analysis and transformer‑based attention mechanisms to understand higher‑order relationships between subjects and background. Training data would include annotated professional portfolios, enabling the system to learn implicit standards that human editors apply intuitively.

### Capture and Edit Suggestions

Beyond passive critique, Indigo offers proactive suggestions for reshooting. The AI analyses the live viewfinder feed, identifies potential framing improvements, and flags over‑exposed regions. It can also recommend adding or removing elements from the scene before the shutter clicks—something traditionally reserved for post‑capture Photoshop work. This is made possible through a lightweight segmentation model that runs on‑device, segmenting objects in real time and overlaying visual cues for the photographer.

### Object Removal and Custom Prompts

Object removal in Indigo works via a generative inpainting model. Users can toggle predefined categories—people, trash, wires, poles, vehicles—and the AI fills the resulting gap with plausible background content. For custom objects, the user types a description, and the model interprets the text to locate and erase the target. The underlying architecture resembles recent diffusion‑based inpainting techniques, where a latent diffusion model iteratively refines the pixel values to match surrounding context while respecting the textual prompt.

### Depth‑of‑Field Generation

Simulating bokeh on a smartphone sensor is computationally intensive. Indigo’s depth‑of‑field feature first estimates a depth map using a dual‑pixel or LiDAR‑assisted depth sensor (when available) and then applies a learned blur kernel that respects edge fidelity. The AI can also generate a synthetic depth map when hardware depth data is missing, using monocular depth estimation networks trained on large datasets of paired images and depth maps. The result is a convincing background blur that mimics DSLR‑grade shallow depth.

### Style Transfer & Edit Flows

The style‑transfer module offers artistic renditions such as watercolor, pen‑and‑ink, monochrome, and backlit subjects. It likely employs a GAN‑style architecture where a content encoder extracts structural information and a style encoder injects the target artistic texture. What sets Indigo apart is the “Edit Flows” capability: users type natural‑language commands like “make the sky sunset‑orange and add a soft vignette,” and the system chains multiple transformations—color grading, tonal mapping, vignette—into a single, coherent edit. This multi‑step pipeline is orchestrated by a language model that parses the user intent and dispatches the appropriate image‑processing modules.

## Positioning Against Existing Mobile Photo Tools

### Apple Photos vs. Adobe’s Vision

Apple’s native Photos app has gradually added AI features—such as Memories, scene detection, and the recent “Live Photos” enhancements—but its editing toolkit remains relatively manual

---
**Source:** [*Original Article*](https://techcrunch.com/2026/07/20/adobe-camera-apps-new-feature-will-critique-your-photos-using-ai/)


{{< comments >}}
