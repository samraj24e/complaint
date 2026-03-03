from flask import Blueprint, jsonify
from auth_middleware import require_auth

admin_bp = Blueprint("admin", __name__)

@admin_bp.get("/admin/dashboard")
@require_auth(["admin"])
def admin_dashboard():
    return jsonify(
        {
            "total_users": 128,
            "total_patients": 84,
            "total_doctors": 12,
            "total_therapists": 18,
            "total_appointments": 326,
            "therapy_stats": {"Abhyanga": 120, "Shirodhara": 97, "Udvartana": 109},
        }
    )
