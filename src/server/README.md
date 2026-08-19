# Backend Development

FastAPI server for AI prompt generation.

## Setup

```bash
cd src/server
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Run

```bash
uvicorn main:app --reload --port 8000
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API info and health |
| GET | `/api/health` | Health check |
| GET | `/api/lenses` | List available aesthetic lenses |
| POST | `/api/prompts/generate` | Generate optimized prompt |

## Test

```bash
curl -X POST http://localhost:8000/api/prompts/generate \
  -H "Content-Type: application/json" \
  -d '{
    "scene_description": "a ruined abbey in autumn",
    "lens": "picturesque",
    "work_title": "Northanger Abbey"
  }'
```
