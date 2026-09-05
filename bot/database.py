from __future__ import annotations

from datetime import datetime
from typing import Any

import aiosqlite

DB_PATH = "bot_data.db"


async def init_db() -> None:
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """
            CREATE TABLE IF NOT EXISTS action_log (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER,
                action TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )
        await db.execute(
            """
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )
            """
        )
        await db.execute(
            """
            CREATE TABLE IF NOT EXISTS notified_orders (
                order_id INTEGER PRIMARY KEY,
                notified_at TEXT NOT NULL
            )
            """
        )
        await db.commit()


async def set_setting(key: str, value: str) -> None:
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
            (key, value),
        )
        await db.commit()


async def get_setting(key: str) -> str | None:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT value FROM settings WHERE key = ?", (key,))
        row = await cursor.fetchone()
        return row[0] if row else None


async def save_admin_chat_id(chat_id: int) -> None:
    await set_setting("admin_chat_id", str(chat_id))


async def get_admin_chat_id(fallback: int) -> int:
    stored = await get_setting("admin_chat_id")
    if stored:
        return int(stored)
    return fallback


async def log_action(order_id: int | None, action: str) -> None:
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO action_log (order_id, action, created_at) VALUES (?, ?, ?)",
            (order_id, action, datetime.now().isoformat(timespec="seconds")),
        )
        await db.commit()


async def get_notified_order_ids() -> set[int]:
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute("SELECT order_id FROM notified_orders")
        rows = await cursor.fetchall()
    return {row[0] for row in rows}


async def mark_order_notified(order_id: int) -> None:
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT OR IGNORE INTO notified_orders (order_id, notified_at) VALUES (?, ?)",
            (order_id, datetime.now().isoformat(timespec="seconds")),
        )
        await db.commit()


async def seed_notified_orders(order_ids: list[int]) -> None:
    existing = await get_notified_order_ids()
    if existing:
        return

    async with aiosqlite.connect(DB_PATH) as db:
        for order_id in order_ids:
            await db.execute(
                "INSERT OR IGNORE INTO notified_orders (order_id, notified_at) VALUES (?, ?)",
                (order_id, datetime.now().isoformat(timespec="seconds")),
            )
        await db.commit()
