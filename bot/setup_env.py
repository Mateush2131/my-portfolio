#!/usr/bin/env python3
import secrets
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ENV_LOCAL = ROOT / ".env.local"
BOT_ENV = ROOT / "bot" / ".env"


def read_env(path: Path) -> dict[str, str]:
    if not path.exists():
        return {}

    values: dict[str, str] = {}
    for line in path.read_text(encoding="utf-8").splitlines():
        if "=" in line and not line.strip().startswith("#"):
            key, value = line.split("=", 1)
            values[key.strip()] = value.strip()
    return values


def write_env(path: Path, values: dict[str, str]) -> None:
    path.write_text("\n".join(f"{key}={value}" for key, value in values.items()) + "\n", encoding="utf-8")


def read_bot_admin_chat_id() -> str | None:
    db_path = ROOT / "bot" / "bot_data.db"
    if not db_path.exists():
        return None

    import sqlite3

    with sqlite3.connect(db_path) as conn:
        row = conn.execute("SELECT value FROM settings WHERE key = 'admin_chat_id'").fetchone()
    return row[0] if row else None


def main() -> int:
    site_env = read_env(ENV_LOCAL)
    bot_env = read_env(BOT_ENV)

    bot_token = bot_env.get("BOT_TOKEN") or site_env.get("TELEGRAM_BOT_TOKEN")
    chat_id = (
        read_bot_admin_chat_id()
        or bot_env.get("ADMIN_CHAT_ID")
        or site_env.get("TELEGRAM_CHAT_ID")
    )
    site_api_url = bot_env.get("SITE_API_URL") or site_env.get("SITE_API_URL", "http://localhost:3000")
    bot_secret = site_env.get("BOT_API_SECRET") or bot_env.get("BOT_API_SECRET") or secrets.token_urlsafe(24)

    if not bot_token or not chat_id:
        print("Задайте BOT_TOKEN и ADMIN_CHAT_ID в bot/.env или TELEGRAM_* в .env.local")
        return 1

    write_env(
        ENV_LOCAL,
        {
            **site_env,
            "TELEGRAM_BOT_TOKEN": bot_token,
            "TELEGRAM_CHAT_ID": chat_id,
            "BOT_API_SECRET": bot_secret,
            "SITE_API_URL": site_api_url,
        },
    )

    write_env(
        BOT_ENV,
        {
            **bot_env,
            "BOT_TOKEN": bot_token,
            "ADMIN_CHAT_ID": chat_id,
            "SITE_API_URL": site_api_url,
            "BOT_API_SECRET": bot_secret,
        },
    )

    print(f"Обновлен {ENV_LOCAL}")
    print(f"Обновлен {BOT_ENV}")
    print("Перезапустите npm run dev и бота.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
