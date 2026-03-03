from flask import Blueprint, jsonify, request
from auth_middleware import require_auth
from ai_engine import analyze_dosha

patient_bp = Blueprint("patient", __name__)

@patient_bp.post("/appointments")
@require_auth(["patient"])
def create_appointment():
    payload = request.get_json(force=True)
    return jsonify({"message": "Appointment booked", "appointment": payload}), 201

@patient_bp.post("/ai-dosha-analysis")
@require_auth(["patient", "doctor"])
def ai_dosha_analysis():
    symptoms = request.get_json(force=True).get("symptoms", [])
    return jsonify(analyze_dosha(symptoms))
