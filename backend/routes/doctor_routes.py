from flask import Blueprint, jsonify, request
from auth_middleware import require_auth
from ai_engine import analyze_dosha
from services.therapist_service import suggest_therapist

doctor_bp = Blueprint("doctor", __name__)

@doctor_bp.post("/suggest-therapist")
@require_auth(["doctor"])
def suggest():
    data = request.get_json(force=True)
    selected = suggest_therapist(data.get("therapy"), data.get("therapists", []))
    return jsonify({"therapist": selected})

@doctor_bp.post("/generate-prescription")
@require_auth(["doctor"])
def generate_prescription():
    data = request.get_json(force=True)
    ai_result = analyze_dosha(data.get("symptoms", []))
    prescription = {
        "patient_id": data.get("patient_id"),
        "diagnosis": data.get("diagnosis"),
        "ai_result": ai_result,
        "medicines": ai_result["suggested_medicines"],
    }
    return jsonify({"prescription": prescription}), 201

@doctor_bp.post("/assign-therapy")
@require_auth(["doctor"])
def assign_therapy():
    data = request.get_json(force=True)
    return jsonify({"message": "Therapy assigned", "therapy": data}), 201
