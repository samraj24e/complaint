from flask import Blueprint, jsonify, request
from auth_middleware import require_auth

billing_bp = Blueprint("billing", __name__)

@billing_bp.get("/billing/<patient_id>")
@require_auth(["admin", "doctor", "patient"])
def get_billing(patient_id):
    return jsonify(
        {
            "patient_id": patient_id,
            "items": [
                {"label": "Consultation", "amount": 500},
                {"label": "Therapy", "amount": 1500},
            ],
            "status": "pending",
            "total": 2000,
        }
    )

@billing_bp.put("/billing/<bill_id>")
@require_auth(["admin", "patient"])
def mark_paid(bill_id):
    payload = request.get_json(force=True)
    return jsonify({"bill_id": bill_id, "status": payload.get("status", "paid")})
