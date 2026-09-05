import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Settings:
    bot_token: str
    admin_chat_id: int
    site_api_url: str
    bot_api_secret: str


def get_settings() -> Settings:
    bot_token = os.getenv("BOT_TOKEN", "").strip()
    admin_chat_id = os.getenv("ADMIN_CHAT_ID", "").strip()
    site_api_url = os.getenv("SITE_API_URL", "http://localhost:3000").strip().rstrip("/")
    bot_api_secret = os.getenv("BOT_API_SECRET", "").strip()

    if not bot_token:
        raise RuntimeError("BOT_TOKEN не задан")
    if not admin_chat_id:
        raise RuntimeError("ADMIN_CHAT_ID не задан")

    return Settings(
        bot_token=bot_token,
        admin_chat_id=int(admin_chat_id),
        site_api_url=site_api_url,
        bot_api_secret=bot_api_secret,
    )
