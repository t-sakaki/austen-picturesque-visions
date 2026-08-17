# Picturesque Visions: The Austen Observer

An interactive experience designed for Emilia (Emiko Sato), translating her research on Jane Austen's landscape descriptions and the "Picturesque" aesthetic into a game.

## 🚀 Quick Start (Phase 1: Foundation)

The foundational code and AI prompt generation engine are ready in `/src/foundation/`.

### Foundation Components

- **Aesthetics Prompt Engine** (`src/foundation/aestheticsPromptEngine.js`): Node.js function that reads knowledge base and generates optimized Gemini/BytePlus text prompts
- **Technical Stack Documentation** (`src/foundation/tech_choices.md`): Rationale for Next.js 14, FastAPI, and PostgreSQL choices
- **Usage**: See CLI examples with `node aestheticsPromptEngine.js`

### Available Lenses

1. **Picturesque**: Roughness, variety, decay, painterly composition
2. **Social Class**: Status indicators, estate analysis, moral dimension
3. **Psychological**: Emotional visualization, atmospheric metaphor, internal states

## 📁 Directory Structure

```
/
├── docs/                    # Design documents and academic references
│   ├── design/
│   │   └── DESIGN.md        # Main design document
│   └── knowledge/           # Core knowledge base for prompt generation
│       ├── aesthetics_definition.md
│       └── landscape_analysis.md
│
├── src/
│   ├── client/              # Frontend UI (React/Next.js) - TODO
│   ├── server/              # Backend logic (FastAPI) - TODO
│   └── foundation/          # AI prompt generation engine
│       ├── aestheticsPromptEngine.js
│       ├── index.js
│       ├── package.json
│       └── tech_choices.md
│
├── prompts/                 # System prompts for Visual/Dialogue AI - TODO
└── tests/                   # Validation and QA - TODO
```

## 🛠️ Development Setup

```bash
# Initialize foundation module
cd src/foundation
npm install

# Test prompt generation
node aestheticsPromptEngine.js picturesque --scene "a ruined abbey in autumn" --work "Northanger Abbey"
```

## 📌 Phase 1: Core Engine & AI Prompt Design (Current)

- [x] Aesthetics Prompt Engine implementation
- [x] Knowledge base integration
- [x] Three lens configuration
- [x] Gemini/BytePlus optimization tags
- [ ] Test suite validation
- [ ] Documentation refinement

## 📖 Academic Context

This project embodies Emilia's research on Jane Austen's landscape descriptions, exploring the intersection of:
- **Picturesque Aesthetics**: Roughness, variety, decay
- **Social Commentary**: Status and morality in rural landscapes
- **Psychological Reflection**: Characters' inner lives in external environments