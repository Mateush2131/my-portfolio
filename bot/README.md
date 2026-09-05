# PerSSonaLLhelperbot

Telegram-бот для отслеживания и обработки заявок с сайта-портфолио.

## Возможности

- Уведомления о новых заявках (строгий текст, без эмодзи)
- Кнопки: Принять, Отклонить, Подробнее
- Команды: `/list`, `/status`, `/stats`, `/help`
- Меню: Список заявок, Статистика, Помощь
- Автоответ посторонним: «Оставьте заявку на сайте»

## Установка

```bash
cd bot
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python setup_env.py
```

## Запуск

1. Запустите сайт: `npm run dev`
2. Запустите бота:

```bash
cd bot
source .venv/bin/activate
python main.py
```

## Интеграция с сайтом

Сайт отправляет уведомление в Telegram при `POST /api/orders`.

Бот обращается к API:

- `GET /api/orders` — список
- `PUT /api/orders/[id]` — смена статуса (заголовок `x-bot-secret`)
- `DELETE /api/orders/[id]` — удаление (заголовок `x-bot-secret`)

Статусы: `new`, `in_progress`, `done`, `rejected`
