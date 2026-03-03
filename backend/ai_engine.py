DOSHA_RULES = {
    "dry_skin": "vata",
    "anxiety": "vata",
    "insomnia": "vata",
    "acidity": "pitta",
    "anger": "pitta",
    "inflammation": "pitta",
    "lethargy": "kapha",
    "weight_gain": "kapha",
    "congestion": "kapha",
}

THERAPY_MAP = {
    "vata": {"therapy": "Abhyanga", "medicines": ["Ashwagandha", "Bala taila"], "diet": "Warm cooked meals, avoid cold foods"},
    "pitta": {"therapy": "Shirodhara", "medicines": ["Guduchi", "Amalaki"], "diet": "Cooling foods, avoid spicy items"},
    "kapha": {"therapy": "Udvartana", "medicines": ["Trikatu", "Guggulu"], "diet": "Light warm foods, avoid sweets"},
}


def analyze_dosha(symptoms):
    scores = {"vata": 0, "pitta": 0, "kapha": 0}
    for symptom in symptoms:
        dosha = DOSHA_RULES.get(symptom)
        if dosha:
            scores[dosha] += 1

    dominant = max(scores, key=scores.get)
    total = sum(scores.values()) or 1
    confidence = round((scores[dominant] / total) * 100, 2)
    plan = THERAPY_MAP[dominant]

    return {
        "scores": scores,
        "dominant_dosha": dominant,
        "confidence": confidence,
        "suggested_therapy": plan["therapy"],
        "suggested_medicines": plan["medicines"],
        "diet_advice": plan["diet"],
    }
