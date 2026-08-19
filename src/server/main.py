# FastAPI Backend for Picturesque Visions
# Phase 1 Foundation — Prompt Generation API

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional, List
import os
import json

app = FastAPI(
    title="Picturesque Visions API",
    description="AI prompt generation backend for Jane Austen landscape aesthetic exploration",
    version="1.0.0"
)


# ──────────────────────────────────────────────────────────────────────────────
# Request/Response Models
# ──────────────────────────────────────────────────────────────────────────────

class PromptRequest(BaseModel):
    scene_description: str = Field(..., min_length=1, max_length=1000,
                                    description="Landscape scene description")
    lens: str = Field("picturesque", description="Aesthetic lens: picturesque, socialClass, psychological")
    work_title: Optional[str] = Field(None, description="Jane Austen work title (optional)")
    character_emotion: Optional[str] = Field(None, description="Dominant emotion for Psychological lens")
    status_indicator: Optional[str] = Field(None, description="Social status element for Social Class lens")
    for_video: bool = Field(False, description="Whether output is for video generation")


class KnowledgeSource(BaseModel):
    file: str
    content_preview: str


class PromptResponse(BaseModel):
    prompt: dict  # gemini, byteplus, raw
    metadata: dict
    knowledge_sources: List[KnowledgeSource]


# ──────────────────────────────────────────────────────────────────────────────
# Knowledge Base Loader
# ──────────────────────────────────────────────────────────────────────────────

KNOWLEDGE_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "docs", "knowledge")

def load_knowledge_base() -> dict:
    """Load knowledge base markdown files."""
    knowledge = {"aesthetics": "", "landscape": "", "sources": []}

    if not os.path.isdir(KNOWLEDGE_DIR):
        return knowledge

    for filename in os.listdir(KNOWLEDGE_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(KNOWLEDGE_DIR, filename)
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read()
                knowledge["sources"].append(filename)
                if "aesthetics" in filename.lower():
                    knowledge["aesthetics"] = content
                elif "landscape" in filename.lower():
                    knowledge["landscape"] = content
            except Exception:
                pass

    return knowledge


# ──────────────────────────────────────────────────────────────────────────────
# Prompt Generation Logic (Python port of aestheticsPromptEngine.js)
# ──────────────────────────────────────────────────────────────────────────────

LENS_CONFIGS = {
    "picturesque": {
        "lens_name": "Picturesque",
        "focus_keywords": ["roughness", "irregularity", "variety", "decay", "ruins",
                           "weathered", "overgrown", "framing", "asymmetry"],
        "style_modifiers": {
            "text": "textured, weathered, organic",
            "color": "earthy, muted, natural tones",
            "composition": "painterly, compositional, framed",
            "mood": "curious, intellectual, contemplative"
        },
        "prompt_template": (
            "A visual landscape scene embodying the picturesque aesthetic: {scene_description}. "
            "Emphasize {textural_quality}, dramatic {composition}, and the appeal of {decay_element}. "
            "The scene should evoke {emotional_response} through asymmetry, natural frames, "
            "and the interplay of light and shadow."
        ),
    },
    "socialClass": {
        "lens_name": "Social Class",
        "focus_keywords": ["estate", "grounds", "wealth", "status", "values", "managed",
                           "wild", "order", "opulence", "decline"],
        "style_modifiers": {
            "text": "ordered landscapes, maintained grounds, architectural elements",
            "color": "rich jewel tones for wealth, faded pastels for decline",
            "composition": "frontal, stately, hierarchical",
            "mood": "observant, analytical, discriminating"
        },
        "prompt_template": (
            "A landscape scene analyzed through the lens of social class. The visual elements reveal "
            "the {status_indicator} of the inhabitants through {landscaping_style}. Show {wealth_manifestation} "
            "alongside {social_tension}. The scene should encourage an analysis of {moral_dimension} "
            "reflected in the environment."
        ),
    },
    "psychological": {
        "lens_name": "Psychological",
        "focus_keywords": ["reflection", "inner state", "emotion", "mood", "mist", "light",
                           "shadow", "wildness", "order", "metaphor"],
        "style_modifiers": {
            "text": "atmospheric, metaphorical, emotionally resonant",
            "color": "mood-appropriate: warm for hope, cool for melancholy, desaturated for uncertainty",
            "composition": "asymmetrical, emotive, psychologically layered",
            "mood": "introspective, empathetic, emotionally nuanced"
        },
        "prompt_template": (
            "A landscape scene visualizing internal psychological states. The environment reflects "
            "{character_emotion} through {visual_metaphor}. Use {atmospheric_effects} to convey "
            "{emotional_depth}. The scene should make the viewer feel the {psychological_theme} "
            "without explicit human figures."
        ),
    },
}


WORK_REFERENCES = {
    "pride and prejudice": {
        "site": "Pemberley's grounds",
        "focus": "ownership and natural beauty",
        "aesthetic": "authentic, substantial, refined nature"
    },
    "sense and sensibility": {
        "site": "country estates",
        "focus": "emotional volatility vs environmental stability",
        "aesthetic": "wild nature vs ordered social world"
    },
    "northanger abbey": {
        "site": "Northanger Abbey",
        "focus": "gothic parody and picturesque fantasy",
        "aesthetic": "ruins, mystery, atmospheric decay"
    },
    "mansfield park": {
        "site": "Mansfield Park estate",
        "focus": "moral dimension of landscape",
        "aesthetic": "wild vs managed, duty vs abandonment"
    },
    "persuasion": {
        "site": "Lyme Regis coast",
        "focus": "realism of unforgiving nature",
        "aesthetic": "rugged, resilient, lived-in beauty"
    },
    "emma": {
        "site": "Highbury and Hartfield",
        "focus": "social aspiration and environment",
        "aesthetic": "managed gardens, social display, seasonal change"
    },
}


EMOTION_METAPHORS = {
    "hope": {
        "description": "dawn breaking over hills, light filtering through trees",
        "atmosphere": "soft morning light, gentle mist lifting",
        "depth": "the promise of renewal",
        "theme": "forward-looking possibility"
    },
    "melancholy": {
        "description": "wilted flowers, autumn leaves drifting",
        "atmosphere": "overcast sky, distant rain, muted colors",
        "depth": "the beauty of impermanence",
        "theme": "sadness intertwined with beauty"
    },
    "uncertainty": {
        "description": "misty horizons, indistinct shapes",
        "atmosphere": "diffuse light, partially obscured forms",
        "depth": "the unknown beyond the visible",
        "theme": "question without clear answer"
    },
    "contemplation": {
        "description": "still waters, reflected sky, quiet groves",
        "atmosphere": "dappled sunlight, gentle shadows",
        "depth": "the weight of thinking",
        "theme": "peaceful introspection"
    },
    "tension": {
        "description": "storm clouds gathering, dramatic lighting",
        "atmosphere": "darkening sky, chiaroscuro contrasts",
        "depth": "the moment before revelation",
        "theme": "bearing witness to conflict"
    },
}


def get_work_reference(work_title: str) -> dict:
    normalized = work_title.lower()
    return WORK_REFERENCES.get(normalized, {
        "site": "English countryside",
        "focus": "transitional landscape",
        "aesthetic": "layered natural beauty"
    })


def get_emotion_metaphor(emotion: str) -> dict:
    return EMOTION_METAPHORS.get(emotion.lower(), EMOTION_METAPHORS["contemplation"])


def validate_constraints(prompt: str, lens: str) -> bool:
    config = LENS_CONFIGS.get(lens, {})
    keywords = config.get("focus_keywords", [])
    has_keyword = any(
        kw in prompt.lower() or kw.rstrip("s") in prompt.lower()
        for kw in keywords
    )
    return len(prompt) > 100 and has_keyword


def generate_prompt(request: PromptRequest) -> dict:
    lens = request.lens
    if lens not in LENS_CONFIGS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid lens. Must be one of: {list(LENS_CONFIGS.keys())}"
        )

    config = LENS_CONFIGS[lens]
    knowledge = load_knowledge_base()
    work_ref = get_work_reference(request.work_title) if request.work_title else None

    # Build prompt per lens
    if lens == "picturesque":
        prompt = config["prompt_template"].format(
            scene_description=request.scene_description,
            textural_quality=config["style_modifiers"]["text"],
            composition=config["style_modifiers"]["composition"],
            decay_element="natural weathering and overgrowth",
            emotional_response=config["style_modifiers"]["mood"]
        )
        if work_ref:
            prompt += f" Reference: {work_ref['site']} - {work_ref['focus']}."

        prompt += f" {knowledge['aesthetics'][:500]}"

    elif lens == "socialClass":
        prompt = config["prompt_template"].format(
            scene_description=request.scene_description,
            status_indicator=request.status_indicator or "architectural hierarchy",
            landscaping_style="formal, geometric patterns",
            wealth_manifestation="symmetrical design, maintained plantings",
            social_tension="wild paths breaking through ordered layouts",
            moral_dimension="the relationship between cultivation and humanity"
        )
        if work_ref:
            prompt += f" Analyze {work_ref['site']} where {work_ref['focus']}. Aesthetic: {work_ref['aesthetic']}."
        prompt += f" Include: {knowledge['landscape'][:400]}"

    else:  # psychological
        emotion = request.character_emotion or "contemplation"
        metaphor = get_emotion_metaphor(emotion)
        prompt = config["prompt_template"].format(
            scene_description=request.scene_description,
            character_emotion=emotion,
            visual_metaphor=metaphor["description"],
            atmospheric_effects=metaphor["atmosphere"],
            emotional_depth=metaphor["depth"],
            psychological_theme=metaphor["theme"]
        )
        if work_ref:
            prompt += f" Through the lens of {work_ref['focus']} in {work_ref['site']}."
        prompt += f" {knowledge['aesthetics'][:400]}"

    # Video enhancement
    if request.for_video:
        video_guidance = (
            "Use cinematic composition with depth of field. "
            "Include camera movement suggestions: subtle pan, slow zoom, or tracking shot. "
            "Add atmospheric details: cloud movement, light changes, seasonal indicators. "
            "Specify aspect ratio: 16:9 for landscape video. "
            "Consider time of day transitions for narrative progression."
        )
        prompt = f"{prompt} Video optimization: {video_guidance}"

    # API optimizations
    gemini_prompt = (
        f"---\n"
        f"API: gemini-1.5-flash\n"
        f"System: You are an aesthetic landscape visualization assistant.\n"
        f"Style: {lens}-focused aesthetic\n"
        f"Knowledge: {knowledge['aesthetics'][:200]}\n"
        f"---\n"
        f"{prompt}"
    )

    byteplus_prompt = (
        f"---\n"
        f"Model: pro-edit-v1\n"
        f"Task: text_to_image\n"
        f"Quality: high\n"
        f"Lens: {lens}\n"
        f"---\n"
        f"{prompt}"
    )

    constraints_met = validate_constraints(prompt, lens)

    return {
        "prompt": {
            "gemini": gemini_prompt,
            "byteplus": byteplus_prompt,
            "raw": prompt,
        },
        "metadata": {
            "lens": config["lens_name"],
            "work_reference": work_ref,
            "constraints_met": constraints_met,
            "knowledge_sources": knowledge["sources"],
            "for_video": request.for_video,
        },
        "knowledge_sources": [
            KnowledgeSource(file=src, content_preview=knowledge.get(
                "aesthetics" if "aesthetics" in src.lower() else "landscape", ""
            )[:200])
            for src in knowledge["sources"]
        ],
    }


# ──────────────────────────────────────────────────────────────────────────────
# API Endpoints
# ──────────────────────────────────────────────────────────────────────────────

@app.get("/")
async def root():
    """Health check and API info."""
    return {
        "name": "Picturesque Visions API",
        "version": "1.0.0",
        "description": "AI prompt generation for Jane Austen landscape aesthetics",
        "endpoints": {
            "POST /api/prompts/generate": "Generate an optimized prompt for a given lens and scene",
            "GET /api/health": "Health check",
            "GET /api/lenses": "List available aesthetic lenses",
        }
    }


@app.get("/api/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok", "knowledge_base_loaded": len(load_knowledge_base()["sources"]) > 0}


@app.get("/api/lenses")
async def list_lenses():
    """List available aesthetic lenses."""
    return {
        "lenses": [
            {
                "id": "picturesque",
                "name": "Picturesque",
                "description": "Roughness, variety, decay, painterly composition",
                "focus_keywords": LENS_CONFIGS["picturesque"]["focus_keywords"],
            },
            {
                "id": "socialClass",
                "name": "Social Class",
                "description": "Status indicators, estate analysis, moral dimension",
                "focus_keywords": LENS_CONFIGS["socialClass"]["focus_keywords"],
            },
            {
                "id": "psychological",
                "name": "Psychological",
                "description": "Emotional visualization, atmospheric metaphor, internal states",
                "focus_keywords": LENS_CONFIGS["psychological"]["focus_keywords"],
            },
        ]
    }


@app.post("/api/prompts/generate", response_model=PromptResponse)
async def generate_prompt_endpoint(request: PromptRequest):
    """
    Generate an AI-optimized prompt for landscape visualization
    based on the selected aesthetic lens and scene description.
    """
    try:
        result = generate_prompt(request)
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prompt generation failed: {str(e)}")


# ──────────────────────────────────────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
