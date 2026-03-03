from functools import wraps
import jwt
from flask import request, jsonify, g
from config import Config


def require_auth(roles=None):
    roles = roles or []

    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            token = request.headers.get("Authorization", "").replace("Bearer ", "")
            if not token:
                return jsonify({"error": "Missing token"}), 401
            try:
                payload = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            except jwt.PyJWTError:
                return jsonify({"error": "Invalid token"}), 401

            g.user = payload
            if roles and payload.get("role") not in roles:
                return jsonify({"error": "Forbidden"}), 403
            return fn(*args, **kwargs)

        return wrapper

    return decorator
