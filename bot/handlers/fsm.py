from datetime import datetime

from aiogram import F, Router
from aiogram.filters import StateFilter
from aiogram.fsm.context import FSMContext
from aiogram.types import Message

from api_client import OrdersApi
from auth import is_admin
from config import Settings
from database import log_action
from keyboards import order_manage_keyboard
from notifications import format_order_details
from states import OrderManageStates

router = Router()


def parse_deadline_input(value: str) -> str | None:
    value = value.strip()
    for fmt in ("%d.%m.%Y", "%d.%m.%Y %H:%M", "%d/%m/%Y", "%d/%m/%Y %H:%M"):
        try:
            parsed = datetime.strptime(value, fmt)
            return parsed.isoformat()
        except ValueError:
            continue
    return None


@router.message(StateFilter(OrderManageStates.waiting_deadline), F.text)
async def set_deadline(
    message: Message,
    state: FSMContext,
    orders_api: OrdersApi,
    settings: Settings,
) -> None:
    if not await is_admin(message.chat.id, settings):
        return

    data = await state.get_data()
    order_id = int(data["order_id"])
    text = (message.text or "").strip().lower()

    try:
        if text == "сброс":
            order = await orders_api.update_order(order_id, {"deadline": None})
        else:
            deadline = parse_deadline_input(message.text or "")
            if not deadline:
                await message.answer("Неверный формат. Пример: 25.06.2026 или 25.06.2026 18:00")
                return
            order = await orders_api.update_order(order_id, {"deadline": deadline})
    except Exception:
        await message.answer("Не удалось сохранить дедлайн.")
        return

    await log_action(order_id, "deadline")
    await state.clear()
    await message.answer(
        format_order_details(order),
        reply_markup=order_manage_keyboard(order_id),
    )


@router.message(StateFilter(OrderManageStates.waiting_notes), F.text)
async def set_notes(
    message: Message,
    state: FSMContext,
    orders_api: OrdersApi,
    settings: Settings,
) -> None:
    if not await is_admin(message.chat.id, settings):
        return

    data = await state.get_data()
    order_id = int(data["order_id"])
    text = (message.text or "").strip()
    notes = None if text.lower() == "сброс" else text

    try:
        order = await orders_api.update_order(order_id, {"adminNotes": notes})
    except Exception:
        await message.answer("Не удалось сохранить заметку.")
        return

    await log_action(order_id, "notes")
    await state.clear()
    await message.answer(
        format_order_details(order),
        reply_markup=order_manage_keyboard(order_id),
    )
