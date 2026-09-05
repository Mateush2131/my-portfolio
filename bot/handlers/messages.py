from aiogram import Router
from aiogram.types import Message

from auth import is_admin
from config import Settings

router = Router()


@router.message()
async def on_any_message(message: Message, settings: Settings) -> None:
    if await is_admin(message.chat.id, settings):
        return

    await message.answer("Пожалуйста, оставьте заявку на сайте.")
