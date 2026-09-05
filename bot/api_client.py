from __future__ import annotations

from datetime import datetime
from typing import Any

import aiohttp

from config import Settings


class OrdersApi:
    def __init__(self, settings: Settings) -> None:
        self._settings = settings

    def _headers(self) -> dict[str, str]:
        headers = {"Content-Type": "application/json"}
        if self._settings.bot_api_secret:
            headers["x-bot-secret"] = self._settings.bot_api_secret
        return headers

    async def list_orders(self) -> list[dict[str, Any]]:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self._settings.site_api_url}/api/orders") as response:
                response.raise_for_status()
                data = await response.json()
                return data if isinstance(data, list) else []

    async def get_order(self, order_id: int) -> dict[str, Any] | None:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self._settings.site_api_url}/api/orders/{order_id}") as response:
                if response.status == 404:
                    return None
                response.raise_for_status()
                return await response.json()

    async def update_order(self, order_id: int, payload: dict[str, Any]) -> dict[str, Any]:
        async with aiohttp.ClientSession() as session:
            async with session.put(
                f"{self._settings.site_api_url}/api/orders/{order_id}",
                json=payload,
                headers=self._headers(),
            ) as response:
                response.raise_for_status()
                return await response.json()

    async def update_status(self, order_id: int, status: str) -> dict[str, Any]:
        return await self.update_order(order_id, {"status": status})

    async def delete_order(self, order_id: int) -> None:
        async with aiohttp.ClientSession() as session:
            async with session.delete(
                f"{self._settings.site_api_url}/api/orders/{order_id}",
                headers=self._headers(),
            ) as response:
                response.raise_for_status()
