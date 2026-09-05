from aiogram import F, Router
from aiogram.filters import Command, CommandObject, StateFilter
from aiogram.types import Message

from api_client import OrdersApi
from auth import is_admin, register_admin_if_needed
from config import Settings
from database import log_action
from keyboards import main_menu_keyboard
from notifications import format_datetime, format_orders_list, format_stats, is_overdue
from handlers.panel import show_main_panel

router = Router()

HELP_TEXT = """КОМАНДЫ БОТА

/start — панель управления
/panel — открыть панель
/list — список заявок
/list all — полный список
/stats — статистика
/status <id> <status> — сменить статус
/help — справка

Статусы: new, in_progress, done, rejected

Панель управления:
- Новые / В работе / Все / Дедлайны
- Дедлайн: ДД.ММ.ГГГГ или ДД.ММ.ГГГГ ЧЧ:ММ
- Заметки по заказу
- Приоритет: low, normal, high"""


@router.message(Command("start"))
async def cmd_start(message: Message, orders_api: OrdersApi, settings: Settings) -> None:
    await register_admin_if_needed(message.chat.id, settings)

    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    await message.answer(
        "\n".join(
            [
                "PerSSonaLLhelperbot",
                "",
                "Панель управления заказами с сайта.",
                f"Ваш Chat ID: {message.chat.id}",
                "",
                "Нажмите «Панель управления» или используйте /panel",
            ]
        ),
        reply_markup=main_menu_keyboard(),
    )
    await show_main_panel(message, orders_api)


@router.message(Command("panel"))
@router.message(lambda message: message.text == "Панель управления")
async def cmd_panel(message: Message, orders_api: OrdersApi, settings: Settings) -> None:
    await register_admin_if_needed(message.chat.id, settings)
    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    await show_main_panel(message, orders_api)


@router.message(Command("help"))
@router.message(lambda message: message.text == "Помощь")
async def cmd_help(message: Message, settings: Settings) -> None:
    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    await message.answer(HELP_TEXT)


@router.message(Command("list"))
async def cmd_list(
    message: Message,
    command: CommandObject,
    orders_api: OrdersApi,
    settings: Settings,
) -> None:
    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    orders = await orders_api.list_orders()
    show_all = command.args == "all"
    text = format_orders_list(orders if show_all else orders[:10])
    await message.answer(text)


@router.message(lambda message: message.text == "Список заявок")
async def menu_list(message: Message, orders_api: OrdersApi, settings: Settings) -> None:
    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    orders = await orders_api.list_orders()
    await message.answer(format_orders_list(orders[:15]))


@router.message(Command("stats"))
@router.message(lambda message: message.text == "Статистика")
async def cmd_stats(message: Message, orders_api: OrdersApi, settings: Settings) -> None:
    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    orders = await orders_api.list_orders()
    await message.answer(format_stats(orders))


@router.message(lambda message: message.text == "Дедлайны")
async def menu_deadlines(message: Message, orders_api: OrdersApi, settings: Settings) -> None:
    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    orders = [order for order in await orders_api.list_orders() if order.get("deadline")]
    orders.sort(key=lambda item: item.get("deadline") or "")
    overdue = [order for order in orders if is_overdue(order)]

    lines = ["ДЕДЛАЙНЫ", "", f"Всего с дедлайном: {len(orders)}", f"Просрочено: {len(overdue)}", ""]
    for order in orders[:15]:
        mark = " ПРОСРОЧЕН" if is_overdue(order) else ""
        lines.append(
            f"#{order['id']} | {order.get('name', '—')} | {format_datetime(order.get('deadline'))}{mark}"
        )

    await message.answer("\n".join(lines))


@router.message(Command("status"))
async def cmd_status(
    message: Message,
    command: CommandObject,
    orders_api: OrdersApi,
    settings: Settings,
) -> None:
    if not await is_admin(message.chat.id, settings):
        await message.answer("Пожалуйста, оставьте заявку на сайте.")
        return

    if not command.args:
        await message.answer("Использование: /status <id> <status>")
        return

    parts = command.args.split()
    if len(parts) < 2:
        await message.answer("Использование: /status <id> <status>")
        return

    try:
        order_id = int(parts[0])
    except ValueError:
        await message.answer("ID должен быть числом.")
        return

    status = parts[1]
    allowed = {"new", "in_progress", "done", "rejected"}
    if status not in allowed:
        await message.answer(f"Допустимые статусы: {', '.join(sorted(allowed))}")
        return

    try:
        order = await orders_api.update_status(order_id, status)
    except Exception:
        await message.answer("Не удалось обновить заявку.")
        return

    await log_action(order_id, f"status:{status}")
    await message.answer(f"Заявка #{order_id} обновлена. Статус: {order.get('status', status)}")
