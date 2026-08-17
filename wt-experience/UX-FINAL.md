# Ultimate UX Plan: The "Satisfying Click" Experience

## 🎯 Emilia's Moment of Truth

When Emilia clicks the "Picturesque Lens" button, her screen should TRANSFORM. This moment must be seamless, elegant, and deeply satisfying. This document outlines the **1-click path to pure magic**.

---

## 🎬 The "One-Click" Animation Script

**Trigger State:**
- Empty state placeholder with elegant 18th-century typography.
- A single, inviting button: "View My World Through the Picturesque Lens".

**On Click (Immediate Feedback):**
1.  Button depresses.
2.  A subtle, warm glow emanates from behind the button.
3.  The button text dissolves into particles that drift upwards.

**The "Transition" (1.5 seconds, non-linear easing):**
- A soft, cinematic vignetting effect moves from the center outwards.
- As the vignette clears, a **"Painting coming to life..."** animation plays.
- **Crucial:** During this 1.5s, the screen background is NOT blank. It's a subtle, blurred preview of the "Social Class Lens" (to hide the loading state).

**On Completion:**
- The full, high-definition landscape visualization fills the screen.
- A subtle, soft **click/scratch sound** is heard, like a stylus on parchment.
- The UI "frames" the image beautifully, with elegant, minimal navigation.

---

## 🖼️ The Three Lenses: Visual DNA

| Lens | Color Palette | Camera Movement | Textural Emphasis | Sound |
| :--- | :--- | :--- | :--- | :--- |
| **Picturesque** | Earthy greens, muted browns, soft grey | Slow, sweeping drone shot | Rough, weathered surfaces | Soft wind, distant birdsong |
| **Social Class** | Rich golds, deep greens, sharp whites (vs. faded pastels) | Static, frontal composition | Manicured lines, sharp architectural details | Ticking of a distant clock |
| **Psychological** | Moody blues, ethereal whites, stark contrasts | Slow zoom into the mist/surface | Fluid water, drifting fog | A single, resonant chime |

---

## 📁 Target Files for Implementation

- `/src/experience/pages/index.js` - Main page component
- `/src/experience/components/LensButton.jsx` - Animated button
- `/src/experience/components/SceneViewer.jsx` - The viewer/renderer
- `/src/experience/styles/ux.module.css` - Fine-tuned animations
- `/src/experience/public/fallback-scenes/` - Low-res preview images for transition