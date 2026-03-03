from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.patient_routes import patient_bp
from routes.doctor_routes import doctor_bp
from routes.admin_routes import admin_bp
from routes.billing_routes import billing_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, origins=Config.CORS_ORIGINS)

    app.register_blueprint(patient_bp)
    app.register_blueprint(doctor_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(billing_bp)

    @app.get("/health")
    def health():
        return jsonify({"status": "ok"})

    return app


if __name__ == "__main__":
    create_app().run(host="0.0.0.0", port=5000, debug=True)
