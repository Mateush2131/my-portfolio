from __future__ import annotations

from datetime import datetime
from typing import Any

from aiogram import Bot
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

STATUS_LABELS = {
    "new": "Новая",
    "in_progress": "В работе",
    "done": "Выполнена",
    "rejected": "Отклонена",
}

PRIORITY_LABELS = {
    "low": "Низкий",
    "normal": "Обычный",
    "high": "Высокий",
}


def parse_datetime(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def format_datetime(value: str | None) -> str:
    parsed = parse_datetime(value)
    if not parsed:
        return "—"
    return parsed.strftime("%d.%m.%Y %H:%M")


def is_overdue(order: dict[str, Any]) -> bool:
    deadline = parse_datetime(order.get("deadline"))
    if not deadline:
        return False
    if order.get("status") in {"done", "rejected"}:
        return False
    return deadline < datetime.now(deadline.tzinfo) if deadline.tzinfo else deadline < datetime.now()


def format_order_notification(order: dict[str, Any]) -> str:
    return "\n".join(
        [
            "НОВАЯ ЗАЯВКА",
            "",
            f"Имя: {order.get('name', '—')}",
            f"Email: {order.get('email', '—')}",
            f"Телефон: {order.get('phone', '—')}",
            f"Услуга: {order.get('service', '—')}",
            f"Сообщение: {(order.get('message') or '—').strip() or '—'}",
            "",
            f"ID: {order.get('id', '—')}",
            f"Дата: {format_datetime(order.get('createdAt'))}",
        ]
    )


def format_order_details(order: dict[str, Any]) -> str:
    status = STATUS_LABELS.get(str(order.get("status")), str(order.get("status", "—")))
    priority = PRIORITY_LABELS.get(str(order.get("priority")), str(order.get("priority", "normal")))
    deadline = format_datetime(order.get("deadline"))
    overdue = " (ПРОСРОЧЕН)" if is_overdue(order) else ""

    return "\n".join(
        [
            "ЗАЯВКА",
            "",
            f"ID: {order.get('id', '—')}",
            f"Статус: {status}",
            f"Приоритет: {priority}",
            f"Дедлайн: {deadline}{overdue}",
            "",
            f"Имя: {order.get('name', '—')}",
            f"Email: {order.get('email', '—')}",
            f"Телефон: {order.get('phone', '—')}",
            f"Услуга: {order.get('service', '—')}",
            f"Сообщение: {(order.get('message') or '—').strip() or '—'}",
            "",
            f"Заметки: {(order.get('adminNotes') or '—').strip() or '—'}",
            f"Создана: {format_datetime(order.get('createdAt'))}",
            f"Обновлена: {format_datetime(order.get('updatedAt'))}",
        ]
    )


def format_stats(orders: list[dict[str, Any]]) -> str:
    counts: dict[str, int] = {}
    overdue = 0
    with_deadline = 0

    for order in orders:
        status = str(order.get("status", "unknown"))
        counts[status] = counts.get(status, 0) + 1
        if order.get("deadline"):
            with_deadline += 1
        if is_overdue(order):
            overdue += 1

    lines = [
        "СТАТИСТИКА",
        "",
        f"Всего: {len(orders)}",
        f"Новые: {counts.get('new', 0)}",
        f"В работе: {counts.get('in_progress', 0)}",
        f"Выполнены: {counts.get('done', 0)}",
        f"Отклонены: {counts.get('rejected', 0)}",
        "",
        f"С дедлайном: {with_deadline}",
        f"Просрочено: {overdue}",
    ]
    return "\n".join(lines)


def format_orders_list(orders: list[dict[str, Any]], title: str = "СПИСОК ЗАЯВОК") -> str:
    if not orders:
        return f"{title}\n\nЗаявок нет."

    lines = [title, ""]
    for order in orders:
        status = STATUS_LABELS.get(str(order.get("status")), str(order.get("status", "—")))
        deadline = format_datetime(order.get("deadline"))
        mark = " !" if is_overdue(order) else ""
        lines.append(
            f"#{order.get('id')} | {status}{mark} | {order.get('name', '—')} | {order.get('service', '—')} | {deadline}"
        )
    return "\n".join(lines)


def notification_keyboard(order_id: int) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(text="Принять", callback_data=f"accept:{order_id}"),
                InlineKeyboardButton(text="Отклонить", callback_data=f"reject:{order_id}"),
                InlineKeyboardButton(text="Подробнее", callback_data=f"p:order:{order_id}"),
            ]
        ]
    )


async def send_order_notification(bot: Bot, chat_id: int, order: dict[str, Any]) -> None:
    await bot.send_message(
        chat_id=chat_id,
        text=format_order_notification(order),
        reply_markup=notification_keyboard(int(order["id"])),
    )
