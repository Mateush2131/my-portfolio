import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { parseJsonBody } from '../../../lib/safeJson';
import { sendOrderTelegramNotification } from '../../../lib/telegram';
import { OrderSchema } from '../../../lib/validations';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: 'Ошибка базы данных' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await parseJsonBody<unknown>(request);

  if (!body) {
    return NextResponse.json({ error: 'Пустое тело запроса' }, { status: 400 });
  }

  const parsed = OrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Неверные данные формы', issues: parsed.error.issues }, { status: 400 });
  }

  try {
    const order = await prisma.order.create({ data: parsed.data });

    try {
      await sendOrderTelegramNotification(order);
    } catch (error) {
      console.error('Telegram не отправлен:', error);
    }

    return NextResponse.json(order, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Не удалось сохранить заявку' }, { status: 500 });
  }
}
