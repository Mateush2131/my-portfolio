import { NextResponse } from 'next/server';
import { parseJsonBody } from '../../../lib/safeJson';
import { sendOrderTelegramNotification } from '../../../lib/telegram';
import { OrderSchema } from '../../../lib/validations';

export async function POST(request: Request) {
  const body = await parseJsonBody<unknown>(request);

  if (!body) {
    return NextResponse.json({ error: 'Пустое тело запроса' }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Неверные данные' }, { status: 400 });
  }

  try {
    await sendOrderTelegramNotification(parsed.data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Ошибка отправки в Telegram' }, { status: 500 });
  }
}
