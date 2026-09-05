from __future__ import annotations

import asyncio
import logging

from aiogram import Bot

from api_client import OrdersApi
from config import Settings
from database import get_admin_chat_id, get_notified_order_ids, mark_order_notified, seed_notified_orders
from notifications import send_order_notification

logger = logging.getLogger(__name__)


async def orders_watcher(bot: Bot, orders_api: OrdersApi, settings: Settings) -> None:
    await asyncio.sleep(2)

    try:
        orders = await orders_api.list_orders()
        await seed_notified_orders([int(order["id"]) for order in orders])
        logger.info("Инициализация уведомлений: %s существующих заявок", len(orders))
    except Exception:
        logger.exception("Не удалось инициализировать список уведомлений")

    while True:
        try:
            admin_chat_id = await get_admin_chat_id(settings.admin_chat_id)
            orders = await orders_api.list_orders()
            notified = await get_notified_order_ids()

            for order in orders:
                order_id = int(order["id"])
                if order_id in notified:
                    continue

                if order.get("status") == "new":
                    await send_order_notification(bot, admin_chat_id, order)
                    logger.info("Отправлено уведомление о заявке #%s", order_id)

                await mark_order_notified(order_id)
        except Exception:
            logger.exception("Ошибка в watcher")

        await asyncio.sleep(8)
