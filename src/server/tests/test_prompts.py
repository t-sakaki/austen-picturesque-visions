import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


class TestHealth:
    def test_health_endpoint(self):
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"

    def test_root_endpoint(self):
        response = client.get("/")
        assert response.status_code == 200
        data = response.json()
        assert "name" in data
        assert data["name"] == "Picturesque Visions API"


class TestLenses:
    def test_lenses_list(self):
        response = client.get("/api/lenses")
        assert response.status_code == 200
        data = response.json()
        assert "lenses" in data
        assert len(data["lenses"]) == 3

        lens_ids = [l["id"] for l in data["lenses"]]
        assert "picturesque" in lens_ids
        assert "socialClass" in lens_ids
        assert "psychological" in lens_ids


class TestPromptGeneration:
    def test_picturesque_prompt(self):
        response = client.post(
            "/api/prompts/generate",
            json={
                "scene_description": "a ruined abbey in autumn",
                "lens": "picturesque",
                "work_title": "Northanger Abbey",
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["metadata"]["lens"] == "Picturesque"
        assert data["metadata"]["constraints_met"] is True
        assert "Northanger Abbey" in data["metadata"]["work_reference"]["site"]
        assert "gemini" in data["prompt"]
        assert "byteplus" in data["prompt"]
        assert len(data["prompt"]["raw"]) > 100

    def test_social_class_prompt(self):
        response = client.post(
            "/api/prompts/generate",
            json={
                "scene_description": "a grand estate with manicured lawns",
                "lens": "socialClass",
                "work_title": "Pride and Prejudice",
                "status_indicator": "Architectural Hierarchy",
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["metadata"]["lens"] == "Social Class"
        assert data["metadata"]["constraints_met"] is True
        assert "Pemberley" in data["metadata"]["work_reference"]["site"]

    def test_psychological_prompt(self):
        response = client.post(
            "/api/prompts/generate",
            json={
                "scene_description": "misty coastline at dawn",
                "lens": "psychological",
                "character_emotion": "uncertainty",
                "work_title": "Persuasion",
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["metadata"]["lens"] == "Psychological"
        assert data["metadata"]["constraints_met"] is True
        assert data["metadata"]["work_reference"]["site"] == "Lyme Regis coast"

    def test_invalid_lens(self):
        response = client.post(
            "/api/prompts/generate",
            json={
                "scene_description": "a landscape",
                "lens": "invalid_lens",
            }
        )
        assert response.status_code == 400
        assert "Invalid lens" in response.json()["detail"]

    def test_for_video_flag(self):
        response = client.post(
            "/api/prompts/generate",
            json={
                "scene_description": "a pastoral English landscape",
                "lens": "picturesque",
                "for_video": True,
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["metadata"]["for_video"] is True
        assert "Video optimization" in data["prompt"]["raw"]
        assert "16:9" in data["prompt"]["raw"]
