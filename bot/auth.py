from config import Settings
from database import get_admin_chat_id, get_setting, save_admin_chat_id


async def register_admin_if_needed(chat_id: int, settings: Settings) -> None:
    stored = await get_setting("admin_chat_id")
    if not stored or int(stored) == settings.admin_chat_id:
        await save_admin_chat_id(chat_id)


async def is_admin(chat_id: int, settings: Settings) -> bool:
    admin_id = await get_admin_chat_id(settings.admin_chat_id)
    return chat_id == admin_id
