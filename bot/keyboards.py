from __future__ import annotations

from typing import Any

from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, KeyboardButton, ReplyKeyboardMarkup

from notifications import STATUS_LABELS, is_overdue


def main_menu_keyboard() -> ReplyKeyboardMarkup:
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="Панель управления")],
            [KeyboardButton(text="Список заявок"), KeyboardButton(text="Статистика")],
            [KeyboardButton(text="Дедлайны"), KeyboardButton(text="Помощь")],
        ],
        resize_keyboard=True,
    )


def panel_main_keyboard(counts: dict[str, int], overdue: int) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text=f"Новые ({counts.get('new', 0)})", callback_data="p:filter:new:0"),
                InlineKeyboardButton(text=f"В работе ({counts.get('in_progress', 0)})", callback_data="p:filter:in_progress:0"),
            ],
            [
                InlineKeyboardButton(text=f"Все ({counts.get('all', 0)})", callback_data="p:filter:all:0"),
                InlineKeyboardButton(text=f"Выполнены ({counts.get('done', 0)})", callback_data="p:filter:done:0"),
            ],
            [
                InlineKeyboardButton(text=f"Дедлайны ({overdue} проср.)", callback_data="p:deadlines:0"),
            ],
            [
                InlineKeyboardButton(text="Обновить", callback_data="p:main"),
            ],
        ]
    )


def orders_page_keyboard(
    orders: list[dict[str, Any]],
    filter_key: str,
    page: int,
    per_page: int = 8,
) -> InlineKeyboardMarkup:
    start = page * per_page
    chunk = orders[start : start + per_page]
    rows: list[list[InlineKeyboardButton]] = []

    for order in chunk:
        mark = "!" if is_overdue(order) else ""
        status = STATUS_LABELS.get(str(order.get("status")), str(order.get("status", "")))
        rows.append(
            [
                InlineKeyboardButton(
                    text=f"#{order['id']} {mark} {order.get('name', '—')} | {status}",
                    callback_data=f"p:order:{order['id']}",
                )
            ]
        )

    nav: list[InlineKeyboardButton] = []
    if page > 0:
        nav.append(InlineKeyboardButton(text="Назад", callback_data=f"p:filter:{filter_key}:{page - 1}"))
    if start + per_page < len(orders):
        nav.append(InlineKeyboardButton(text="Далее", callback_data=f"p:filter:{filter_key}:{page + 1}"))
    if nav:
        rows.append(nav)

    rows.append([InlineKeyboardButton(text="В панель", callback_data="p:main")])
    return InlineKeyboardMarkup(inline_keyboard=rows)


def order_manage_keyboard(order_id: int) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Принять", callback_data=f"accept:{order_id}"),
                InlineKeyboardButton(text="Отклонить", callback_data=f"reject:{order_id}"),
            ],
            [
                InlineKeyboardButton(text="В работе", callback_data=f"status:{order_id}:in_progress"),
                InlineKeyboardButton(text="Выполнена", callback_data=f"status:{order_id}:done"),
            ],
            [
                InlineKeyboardButton(text="Дедлайн", callback_data=f"p:dlask:{order_id}"),
                InlineKeyboardButton(text="Заметки", callback_data=f"p:ntask:{order_id}"),
            ],
            [
                InlineKeyboardButton(text="Приоритет: высокий", callback_data=f"p:prio:{order_id}:high"),
                InlineKeyboardButton(text="обычный", callback_data=f"p:prio:{order_id}:normal"),
            ],
            [
                InlineKeyboardButton(text="Удалить", callback_data=f"delete:{order_id}"),
                InlineKeyboardButton(text="Назад", callback_data="p:main"),
            ],
        ]
    )


def order_actions_keyboard(order_id: int) -> InlineKeyboardMarkup:
    return order_manage_keyboard(order_id)
