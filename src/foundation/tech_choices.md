# Technical Stack Decisions

## Overview

This document explains the rationale behind the core technology choices for the Picturesque Visions project.

---

## Frontend: Next.js 14 (App Router)

### Selected Technologies
- **Next.js 14** with App Router
- **Tailwind CSS** for styling
- **React Server Components** for AI integration

### Why Next.js 14?

1. **Native AI Integration**
   - Built-in support for streaming responses from Gemini/BytePlus APIs
   - Server Actions simplify server-client communication for prompt generation
   - Reduced boilerplate for AI-driven applications

2. **App Router Architecture**
   - **Root Layout** preserves aesthetic navigation across aesthetic lens changes
   - **Parallel Routes** enable independent lens views (Picturesque, Social Class, Psychological)
   - **Suspense boundaries** provide loading states for generative AI calls

3. **Performance for Interactive Experience**
   - Automatic image optimization (critical for landscape galleries)
   - Incremental Static Regeneration for reference image collections
   - Optimized bundle splitting for smooth transitions between lenses

4. **Developer Experience**
   - TypeScript-first with full type support
   - File-system routing aligns with Austen work navigation structure
   - Integrated linting and formatting maintain code aesthetic quality

### Architecture Pattern

```
/src/app/
├── (lenses)/
│   ├── picturesque/
│   │   ├── page.tsx
│   │   └── components/
│   ├── social-class/
│   └── psychological/
├── api/
│   ├── prompts/route.ts
│   └── fragments/route.ts
└── layout.tsx
```

---

## Backend: FastAPI (Python)

### Why FastAPI?

1. **AI Orchestration Expertise**
   - Native Pydantic models ensure prompt data integrity
   - Async support essential for parallel Gemini/BytePlus API calls
   - Automatic OpenAPI docs help academic collaborators

2. **Python Ecosystem**
   - Rich NLP libraries (spaCy, NLTK) for Austen text analysis
   - Potential integration with research notebooks (Jupyter)
   - Direct compatibility with existing academic tooling

3. **Pragmatic Design**
   - Less ceremony than Django for our focused use case
   - Excellent for ML pipeline integration
   - Type hints maintain code's intellectual precision

### Core Endpoints

```python
# AI prompt generation
POST /api/prompts/generate
- Request: Lens selection, scene description, work reference
- Response: Optimized prompt for Gemini/BytePlus, constraints metadata

# Fragment collection
POST /api/fragments/collect
GET /api/fragments/gallery
- Text extraction and cataloging from Austen works
```

---

## Database: PostgreSQL

### Why PostgreSQL?

1. **Relational Data for Austen's World**
   ```
   characters → relationships → affections
   fragments → quotes → works
   gallery_items → fragments → aesthetic_lens
   ```

2. **JSONB for Flexible Prompt Metadata**
   - Store lens-specific optimization parameters
   - Capture AI generation settings by work
   - Flexible schema for evolving academic insights

3. **Academic Collaboration Requirements**
   - Full-text search on Austen quotes
   - Materialized views for research dashboards
   - Proper transactions for fragment collection milestones

4. **Production Reliability**
   - ACID compliance for progress persistence
   - Point-in-time recovery for creative work
   - Extension support (pg_trgm for fuzzy text search)

### Schema Highlights

```sql
-- Aesthetic lens selection affects multiple entities
ALTER TYPE aesthetic_lens ADD VALUE 'picturesque';
ALTER TYPE aesthetic_lens ADD VALUE 'social_class';
ALTER TYPE aesthetic_lens ADD VALUE 'psychological';

-- Embed knowledge base context in prompts
ALTER TABLE generated_prompts 
ADD COLUMN knowledge_context TSVECTOR 
USING to_tsvector('english', knowledge_used);
```

---

## Integration: Gemini + BytePlus Ark

### Prompt Flow

1. **Node.js (Frontend)**: User selects Picturesque lens → calls `/api/prompts/generate`
2. **FastAPI (Backend)**: Reads knowledge base, applies lens modifiers, returns optimized prompt
3. **Node.js**: Formats for Gemini API with system instructions
4. **Node.js**: Formats for BytePlus with quality settings
5. **Parallel Generation**: Both APIs called, results compared for artistic consistency

### AI Considerations

| Aspect | Gemini | BytePlus Ark |
|--------|--------|--------------|
| **Strength** | Text coherence, semantic understanding | High-fidelity image generation |
| **Use Case** | Landscape description refinement | Visual implementation |
| **Cost Model** | Per-token (research-friendly) | Per-image (budget-managed) |

---

## Development Philosophy

### Academic Rigor Meets Creative Technology

- **Type Safety**: TypeScript and Pydantic ensure academic precision
- **Reproducibility**: Versioned knowledge base with prompts
- **Iterative Design**: Fast feedback loop between lens selection and AI output
- **Documentation**: In-code docstrings and this tech_choices.md

### Recommended Development Commands

```bash
# Frontend development
cd src/client
npm run dev:lm        # Starts Next.js in LM (Long Memory) mode
npm run test:prompts  # Validate prompt generation against knowledge base

# Backend development  
cd src/server
uvicorn main:app --reload --port 8000
python -m pytest tests/test_prompts.py -v

# Database
psql picturesque -c "\dt"           # List tables
alembic upgrade head                # Apply migrations
```

---

## Future Considerations

1. **Caching Layer**: Redis for prompt templates and fragment collections
2. **Media Storage**: Integration with object storage for gallery images
3. **Research Export**: Jupyter kernel for narrative analysis export

---

*Document version: 1.0 | Last updated: August 2026*