# Overview Design Document: Picturesque Visions

## 1. Objective
The goal of this project is to embody Emilia's research on "Jane Austen's landscape descriptions and the Picturesque aesthetic" into an interactive game experience, serving as both a personal gift and a platform for academic dissemination.

## 2. Core Concepts
- **Observation as Gameplay**: The act of "seeing" is the primary mechanic. Analyzing landscapes through an aesthetic lens advances the plot.
- **Intellectual Reward**: Academic insights are the key to progress, satisfying the researcher's intellectual curiosity.
- **AI-Driven Aesthetics**: Using generative AI to transform literary descriptions into real-time visual experiences.

## 3. Key Features
### 3.1 Aesthetics Lens System
Players can switch between three observational modes:
- **Picturesque Lens**: Highlights irregular beauty, rugged textures, and "painterly" compositions.
- **Social Class Lens**: Analyzes the environment to deduce the wealth, status, and values of the inhabitants.
- **Psychological Lens**: Visualizes the internal emotions of characters reflected in the environment (e.g., mist for uncertainty, light for hope).

### 3.2 Wit-based Dialogue System
A conversation engine based on Austen's characteristic irony and wit.
- Dynamic dialogue generation via LLM.
- Decision-making based on "Social Propriety" vs "Inner Passion."

### 3.3 Fragment Collection & Gallery
- Collect text fragments from Austen's novels.
- Assemble them to construct a "Perfect Picturesque Landscape," resulting in a personalized digital art gallery.

## 4. Technical Stack
- **Frontend**: Next.js + Tailwind CSS (Classical, elegant UI)
- **Backend**: FastAPI (Python) for efficient AI orchestration.
- **AI Models**: 
    - **Gemini**: Dialogue generation and prompt engineering.
    - **BytePlus Ark / Gemini Video**: Dynamic landscape and video generation.
- **Database**: PostgreSQL or MongoDB for saving progress and collected fragments.

## 5. Development Roadmap
- Phase 1: Core Engine & AI Prompt Design (Current)
- Phase 2: Prototype of the "Aesthetics Lens" visual system.
- Phase 3: Dialogue system implementation.
- Phase 4: Integration of the Fragment Collection gallery.
- Phase 5: Final Polish & Presentation to Emilia.
