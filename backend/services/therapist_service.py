def suggest_therapist(therapy_name, therapists):
    matching = [t for t in therapists if therapy_name in t.get("skills", [])]
    if matching:
        return sorted(matching, key=lambda t: t.get("active_cases", 0))[0]
    return sorted(therapists, key=lambda t: t.get("active_cases", 0))[0] if therapists else None
