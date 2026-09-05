export type OrderNotification = {
  id?: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message?: string | null;
  createdAt?: Date | string;
};

function formatDate(value?: Date | string): string {
  const date = value ? new Date(value) : new Date();

  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatOrderNotification(order: OrderNotification): string {
  return [
    'НОВАЯ ЗАЯВКА',
    '',
    `Имя: ${order.name}`,
    `Email: ${order.email}`,
    `Телефон: ${order.phone}`,
    `Услуга: ${order.service}`,
    `Сообщение: ${order.message?.trim() || '—'}`,
    '',
    `ID: ${order.id ?? '—'}`,
    `Дата: ${formatDate(order.createdAt)}`,
  ].join('\n');
}

export function buildOrderInlineKeyboard(orderId: number) {
  return {
    inline_keyboard: [
      [
        { text: 'Принять', callback_data: `accept:${orderId}` },
        { text: 'Отклонить', callback_data: `reject:${orderId}` },
        { text: 'Подробнее', callback_data: `details:${orderId}` },
      ],
    ],
  };
}

export async function sendOrderTelegramNotification(order: OrderNotification): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — уведомление пропущено');
    return;
  }

  if (chatId === botToken.split(':')[0]) {
    console.warn(
      'TELEGRAM_CHAT_ID совпадает с ID бота. Укажите ваш user chat id (бот пришлёт его после /start).',
    );
    return;
  }

  const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: formatOrderNotification(order),
      ...(order.id
        ? { reply_markup: buildOrderInlineKeyboard(order.id) }
        : {}),
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${details}`);
  }
}
