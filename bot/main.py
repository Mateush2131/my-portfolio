import asyncio
import logging

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.fsm.storage.memory import MemoryStorage

from api_client import OrdersApi
from config import get_settings
from database import init_db
from handlers import callbacks, commands, fsm, messages, panel
from watcher import orders_watcher

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def main() -> None:
    settings = get_settings()
    await init_db()

    bot = Bot(token=settings.bot_token, default=DefaultBotProperties(parse_mode=None))
    storage = MemoryStorage()
    dp = Dispatcher(storage=storage)

    orders_api = OrdersApi(settings)

    dp.include_router(commands.router)
    dp.include_router(panel.router)
    dp.include_router(callbacks.router)
    dp.include_router(fsm.router)
    dp.include_router(messages.router)

    watcher_task = asyncio.create_task(orders_watcher(bot, orders_api, settings))

    logger.info("PerSSonaLLhelperbot запущен")
    try:
        await dp.start_polling(bot, settings=settings, orders_api=orders_api)
    finally:
        watcher_task.cancel()

if __name__ == "__main__":
    asyncio.run(main())
