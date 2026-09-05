from __future__ import annotations

from typing import Any

from aiogram import F, Router
from aiogram.fsm.context import FSMContext
from aiogram.types import CallbackQuery

from api_client import OrdersApi
from auth import is_admin
from config import Settings
from keyboards import order_manage_keyboard, orders_page_keyboard, panel_main_keyboard
from notifications import format_order_details, format_orders_list, is_overdue
from states import OrderManageStates

router = Router()

PER_PAGE = 8


def count_orders(orders: list) -> dict[str, int]:
    return {
        "all": len(orders),
        "new": sum(1 for order in orders if order.get("status") == "new"),
        "in_progress": sum(1 for order in orders if order.get("status") == "in_progress"),
        "done": sum(1 for order in orders if order.get("status") == "done"),
        "rejected": sum(1 for order in orders if order.get("status") == "rejected"),
    }


def filter_orders(orders: list[dict[str, Any]], filter_key: str) -> list[dict[str, Any]]:
    if filter_key == "all":
        return orders
    if filter_key == "deadlines":
        filtered = [order for order in orders if order.get("deadline")]
        return sorted(filtered, key=lambda item: item.get("deadline") or "")
    return [order for order in orders if order.get("status") == filter_key]


def panel_title() -> str:
    return "ПАНЕЛЬ УПРАВЛЕНИЯ ЗАКАЗАМИ"


async def show_main_panel(target, orders_api: OrdersApi) -> None:
    orders = await orders_api.list_orders()
    counts = count_orders(orders)
    overdue = sum(1 for order in orders if is_overdue(order))

    text = "\n".join(
        [
            panel_title(),
            "",
            f"Всего заказов: {counts['all']}",
            f"Новые: {counts['new']}",
            f"В работе: {counts['in_progress']}",
            f"Просрочено: {overdue}",
            "",
            "Выберите раздел:",
        ]
    )
    keyboard = panel_main_keyboard(counts, overdue)

    if isinstance(target, CallbackQuery):
        if target.message:
            await target.message.edit_text(text, reply_markup=keyboard)
        await target.answer()
    else:
        await target.answer(text, reply_markup=keyboard)


@router.callback_query(F.data == "p:main")
async def panel_main(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return
    await show_main_panel(callback, orders_api)


@router.callback_query(F.data.startswith("p:filter:"))
async def panel_filter(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    _, _, filter_key, page_raw = callback.data.split(":", 3)
    page = int(page_raw)
    orders = filter_orders(await orders_api.list_orders(), filter_key)
    title_map = {
        "new": "НОВЫЕ ЗАЯВКИ",
        "in_progress": "В РАБОТЕ",
        "done": "ВЫПОЛНЕННЫЕ",
        "all": "ВСЕ ЗАЯВКИ",
    }
    text = format_orders_list(orders[page * PER_PAGE : (page + 1) * PER_PAGE], title_map.get(filter_key, "ЗАЯВКИ"))
    if len(orders) > PER_PAGE:
        text += f"\n\nСтраница {page + 1} из {(len(orders) - 1) // PER_PAGE + 1}"

    await callback.message.edit_text(
        text,
        reply_markup=orders_page_keyboard(orders, filter_key, page, PER_PAGE),
    )
    await callback.answer()


@router.callback_query(F.data.startswith("p:deadlines:"))
async def panel_deadlines(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    page = int(callback.data.split(":")[-1])
    orders = filter_orders(await orders_api.list_orders(), "deadlines")
    text = format_orders_list(orders[page * PER_PAGE : (page + 1) * PER_PAGE], "ДЕДЛАЙНЫ")
    await callback.message.edit_text(
        text,
        reply_markup=orders_page_keyboard(orders, "deadlines", page, PER_PAGE),
    )
    await callback.answer()


@router.callback_query(F.data.startswith("p:order:"))
async def panel_order(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    order_id = int(callback.data.split(":")[-1])
    order = await orders_api.get_order(order_id)
    if not order:
        await callback.answer("Заявка не найдена", show_alert=True)
        return

    await callback.message.edit_text(
        format_order_details(order),
        reply_markup=order_manage_keyboard(order_id),
    )
    await callback.answer()


@router.callback_query(F.data.startswith("p:prio:"))
async def panel_priority(callback: CallbackQuery, orders_api: OrdersApi, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    _, _, order_id_raw, priority = callback.data.split(":", 3)
    order_id = int(order_id_raw)
    order = await orders_api.update_order(order_id, {"priority": priority})

    await callback.message.edit_text(
        format_order_details(order),
        reply_markup=order_manage_keyboard(order_id),
    )
    await callback.answer(f"Приоритет: {priority}")


@router.callback_query(F.data.startswith("p:dlask:"))
async def ask_deadline(callback: CallbackQuery, state: FSMContext, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    order_id = int(callback.data.split(":")[-1])
    await state.set_state(OrderManageStates.waiting_deadline)
    await state.update_data(order_id=order_id)
    await callback.message.answer(
        f"Заявка #{order_id}\n\nВведите дедлайн: ДД.ММ.ГГГГ или ДД.ММ.ГГГГ ЧЧ:ММ\n"
        "Чтобы убрать дедлайн, отправьте: сброс"
    )
    await callback.answer()


@router.callback_query(F.data.startswith("p:ntask:"))
async def ask_notes(callback: CallbackQuery, state: FSMContext, settings: Settings) -> None:
    if not callback.message or not await is_admin(callback.message.chat.id, settings):
        await callback.answer("Нет доступа", show_alert=True)
        return

    order_id = int(callback.data.split(":")[-1])
    await state.set_state(OrderManageStates.waiting_notes)
    await state.update_data(order_id=order_id)
    await callback.message.answer(
        f"Заявка #{order_id}\n\nВведите заметку по заказу.\nЧтобы очистить, отправьте: сброс"
    )
    await callback.answer()
