from aiogram import F, Router
from aiogram.types import CallbackQuery

from api_client import OrdersApi
from auth import is_admin
from config import Settings
from database import log_action
from keyboards import order_manage_keyboard
from notifications import format_order_details

router = Router()


async def _update_and_reply(
    callback: CallbackQuery,
    orders_api: OrdersApi,
    order_id: int,
    status: str,
    action_name: str,
) -> None:
    try:
        order = await orders_api.update_status(order_id, status)
    except Exception:
        await callback.answer("Ошибка обновления", show_alert=True)
        return

    await log_action(order_id, action_name)
    await callback.answer(f"Статус: {status}")

    if callback.message:
        await callback.message.answer(
            f"Заявка #{order_id} — статус: {status}\n\n{format_order_details(order)}",
            reply_markup=order_manage_keyboard(order_id),
        )


@router.callback_query(F.data.startswith("accept:"))
async def on_accept(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    order_id = int(callback.data.split(":", 1)[1])
    await _update_and_reply(callback, orders_api, order_id, "in_progress", "accept")


@router.callback_query(F.data.startswith("reject:"))
async def on_reject(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    order_id = int(callback.data.split(":", 1)[1])
    await _update_and_reply(callback, orders_api, order_id, "rejected", "reject")


@router.callback_query(F.data.startswith("status:"))
async def on_status(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    _, order_id_raw, status = callback.data.split(":", 2)
    await _update_and_reply(callback, orders_api, int(order_id_raw), status, f"status:{status}")


@router.callback_query(F.data.startswith("details:"))
async def on_details(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    order_id = int(callback.data.split(":", 1)[1])
    order = await orders_api.get_order(order_id)

    if not order:
        await callback.answer("Заявка не найдена", show_alert=True)
        return

    await callback.answer()
    await callback.message.answer(
        format_order_details(order),
        reply_markup=order_manage_keyboard(order_id),
    )


@router.callback_query(F.data.startswith("delete:"))
async def on_delete(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    order_id = int(callback.data.split(":", 1)[1])

    try:
        await orders_api.delete_order(order_id)
    except Exception:
        await callback.answer("Ошибка удаления", show_alert=True)
        return

    await log_action(order_id, "delete")
    await callback.answer("Заявка удалена")
    await callback.message.answer(f"Заявка #{order_id} удалена.")
