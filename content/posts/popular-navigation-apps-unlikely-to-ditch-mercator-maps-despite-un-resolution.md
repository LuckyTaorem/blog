---
title: "UN Pushes Accurate Maps: Equal Earth vs Mercator"
date: 2026-09-13T23:48:45.126859+05:30
draft: false
images: ["images/popular-navigation-apps-unlikely-to-ditch-mercator-maps-despite-un-resolution.jpg"]
thumbnail: "images/popular-navigation-apps-unlikely-to-ditch-mercator-maps-despite-un-resolution.jpg"
description: "UN urges use of equal‑area projections like Equal Earth, challenging Mercator’s dominance and sparking debate over map accuracy in education and tech."
categories: ["Education"]
tags: ["UN resolution", "map projections", "Equal Earth"]
---

## The UN General Assembly Resolution – What Happened?

On **September 4**, the United Nations General Assembly adopted a resolution that calls on governments, schools, international bodies, and technology firms to give preference to **equal‑area map projections**—most notably the **Equal Earth** projection—when the relative size of landmasses matters.  

- **164** member states voted in favor.  
- **6** abstained.  
- The **United States** cast the sole “no” vote, branding the initiative a “radical ideological project.”  

The resolution is **non‑binding**; it does not compel any party to replace existing cartographic standards. Instead, it **encourages** the adoption of more size‑accurate maps and the inclusion of educational material that explains the trade‑offs inherent in flattening a sphere.

While the language is diplomatic, the political symbolism is clear: the UN wants the world to recognize that the familiar 16th‑century **Mercator** projection, which inflates high‑latitude regions, is a historical artifact rather than a scientific necessity.

## Technical Breakdown – From Mercator to Equal Earth

### Mercator’s Legacy

Developed by Dutch cartographer **Gerardus Mercator** in 1569, the Mercator projection was a breakthrough for sailors because it preserves **angles and direction**. Its mathematical basis is a cylindrical projection where the globe is wrapped around a cylinder tangent at the equator. The result:

- **Conformal**: shapes are locally accurate, making it ideal for navigation.  
- **Distortive**: area expands dramatically toward the poles; Greenland appears roughly the size of Africa, despite being 14 times smaller.

Because early navigation relied on paper charts, the Mercator map became the default for centuries. Modern digital mapping platforms inherited this bias, even though the underlying data pipelines can support many projections.

### Equal Earth – A Modern Equal‑Area Alternative

The **Equal Earth** projection, introduced in 2018 by cartographers Tom Patterson and Bojan Šavrič, is an equal‑area pseudocylindrical design that balances visual appeal with strict area preservation. Key characteristics:

- **Equal‑area**: every region’s displayed size matches its true surface area, eliminating the north‑south bias.  
- **Aesthetic compromise**: the projection maintains a familiar “world map” silhouette, reducing the visual shock that can accompany more exotic equal‑area projections like Mollweide.  
- **Computationally light**: the forward and inverse formulas are simple enough for real‑time rendering on browsers and mobile devices.

Because the projection is open‑source, developers can integrate it into GIS libraries, web‑mapping frameworks, and even navigation apps without licensing hurdles.

### Trade‑offs to Consider

No projection is perfect. When choosing a map for a specific application, designers weigh:

| Property | Mercator | Equal Earth |
|----------|----------|-------------|
| **Conformality** | Preserves angles → excellent for compass bearings | Distorts angles → less suitable for precise direction |
| **Area Accuracy** | Poor (high‑latitude inflation) | Perfect (areas are true) |
| **Visual Familiarity** | Highly familiar to the public | Familiar shape, but less entrenched |
| **Computational Cost** | Minimal (well‑optimized libraries) | Slightly higher, still trivial for modern hardware |

Understanding these trade‑offs is central to the UN’s educational push: students should learn why a map looks the way it does, not just accept the default.

## Why It Matters – The Real‑World Implications of Size Distortion

### Geopolitical Perception

Map distortion subtly influences how people perceive the importance of nations. The Mercator’s exaggeration of Europe, North America, and Russia can reinforce a Euro‑centric worldview, while under‑representing Africa, South America, and Oceania. Equal‑area maps provide a more balanced visual narrative, which can affect:

- **International policy discussions** – when delegates view a map that accurately reflects landmass, the psychological bias toward “larger” countries diminishes.  
- **Media coverage** – news graphics that use equal‑area projections can help audiences better grasp the scale of climate impacts, resource distribution, or population density.

### Education and Public Awareness

The resolution explicitly calls for **curriculum updates** that

that **integrate equal‑area maps into geography lessons**, teach students the mathematics behind different projections, and encourage critical discussions about how visual representations shape perception.  

### Sample Curriculum Elements

- **Map‑Projection Workshops** – Hands‑on activities where pupils plot the same country on Mercator, Equal Earth, and Mollweide maps, then calculate the percentage error in area.  
- **Historical Context Modules** – Brief overviews of why the Mercator projection was created, its role in the Age of Exploration, and how colonial narratives were reinforced by distorted visuals.  
- **Data‑Visualization Projects** – Assignments that require students to choose the most appropriate projection for a given dataset (e.g., population density vs. flight routes).  

By embedding these components, educators can move beyond rote memorisation of capitals and foster a deeper understanding of cartographic choices.

## Tech Industry Response – Will Apps Switch Projections?

### Major Players’ Stance

| Company | Current Default | Public Comment on UN Resolution | Likelihood of Adoption |
|---------|----------------|--------------------------------|------------------------|
| **Google Maps** | Web Mercator (EPSG:3857) | “We continuously evaluate map projections for specific use‑cases; the resolution aligns with our educational outreach goals.” | Medium – may add optional Equal Earth layer for educational mode |
| **Apple Maps** | Web Mercator | No official statement yet; internal briefings suggest low priority due to navigation focus. | Low |
| **OpenStreetMap (OSM) Community** | Multiple, with Mercator dominant in default renderers | Strong support for open‑source equal‑area renderers; several forks already experimenting with Equal Earth tiles. | High – community‑driven pilots emerging |
| **Mapbox** | Web Mercator (default style) | “We’re excited about the UN’s push for map literacy and are prototyping Equal Earth basemaps for non‑navigational contexts.” | Medium‑High – early beta available |

### Practical Considerations

- **Performance** – While Equal Earth is computationally light, the massive tile caches built for Web Mercator would need to be regenerated, incurring storage and CDN costs.  
- **User Expectations** – Most users associate “the map” with the familiar Mercator silhouette; a sudden switch could cause confusion, especially for navigation where directionality matters.  
- **Hybrid Solutions** – Some platforms may retain Mercator for routing and navigation while offering an “educational view” that defaults to Equal Earth for thematic layers (climate, demographics).  

Overall, the resolution is unlikely to force a wholesale migration away from Mercator in commercial navigation products, but it does open a niche for alternative projections in learning‑focused interfaces.

## Potential Challenges and Criticisms

1. **Perceived Politicisation of Cartography** – Critics argue that the UN is injecting ideology into a technical field, suggesting that map choice should remain a neutral, scientific decision.  
2. **Implementation Costs for Developing Nations** – Updating textbooks, training teachers, and re‑producing printed atlases require resources that may be scarce.  
3. **Fragmentation of Standards** – If multiple projections gain official endorsement, developers could face a proliferation of “map‑choice fatigue,” complicating UI design.  
4. **Limited Impact on Public Perception** – Without widespread exposure (e.g., on smartphones), the educational push may remain confined to classrooms, limiting its ability to shift global mindsets.  

Proponents counter that these hurdles are surmountable through international cooperation, open‑source tooling, and phased roll‑outs that prioritise high‑impact regions such as climate‑change education.

## Looking Ahead – What Could Change Next?

- **UN‑Sponsored Pilot Programs** – The UN plans to fund pilot projects in 12 countries to test Equal Earth integration in school curricula and public information campaigns.  
- **Open‑Source Map Libraries** – Libraries like **Proj4js**, **Leaflet**, and **OpenLayers** are already adding native Equal Earth support, lowering the barrier for developers.  
- **Standard‑Setting Bodies** – The International Cartographic Association (ICA) may consider publishing guidelines that recommend equal‑area projections for specific thematic maps (e.g., population, resource distribution).  

If these initiatives gain traction, we could see a gradual cultural shift where the “default” world map in textbooks and public displays more accurately reflects the planet’s true proportions, while navigation tools retain Mercator where its conformal properties remain indispensable.

## Conclusion

The UN General Assembly’s resolution is a symbolic yet purposeful step toward greater cartographic literacy. By urging the adoption of equal‑area projections such as Equal Earth, the UN highlights how visual distortions can subtly shape geopolitical narratives and public understanding of global issues.  

While the resolution does not compel navigation giants to abandon Mercator, it creates a clear mandate for educators, policymakers, and open‑source communities to champion more accurate representations of our world. The real test will be whether these recommendations translate into tangible changes in classrooms, atlases, and the occasional “map‑view” toggle in the apps we use every day.

---

## Frequently Asked Questions

**Q: Will my phone’s navigation app start showing a different map overnight?**  
A: No. The resolution is non‑binding and primarily targets educational and thematic uses. Navigation apps will likely keep Mercator for routing because it preserves direction, though some may add an optional Equal Earth layer for non‑navigational purposes.  

**Q: How does the Equal Earth projection compare to the Mollweide projection?**  
A: Both are equal‑area, but Equal Earth is designed to look more like the familiar rectangular world map, with less extreme shape distortion at mid‑latitudes. Mollweide has a more “oval” silhouette and can appear unfamiliar to many users.  

**Q: Are there any legal requirements for governments to change their official maps?**  
A: No. The UN resolution is a recommendation; each country decides how to implement it, if at all.  

**Q: Can I download an Equal Earth basemap for my own projects?**  
A: Yes. The projection is open‑source, and many GIS platforms (QGIS, ArcGIS, Mapbox, etc.) provide ready‑made Equal Earth tiles or allow you to generate your own.  

**Q: Does using an equal‑area map improve the accuracy of distance calculations?**  
A: Not directly. Equal‑area projections preserve area, not distance or direction. For precise distance measurements, geodesic calculations on the ellipsoid are still required.  

**Q: Will the UN revisit this resolution in the future?**  
A: Resolutions are typically reviewed at subsequent General Assembly sessions. If adoption rates rise or new evidence emerges about the educational impact, the UN may issue a follow‑up recommendation or a more detailed implementation framework.

---
**Source:** [*Original Article*](https://arstechnica.com/gadgets/2026/09/un-correct-the-map-resolution-wont-change-mercator-map-use-in-navigation-apps/)


{{< comments >}}
