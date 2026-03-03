from supabase import create_client
from config import Config


def get_client():
    if not Config.SUPABASE_URL or not Config.SUPABASE_KEY:
        return None
    return create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)
