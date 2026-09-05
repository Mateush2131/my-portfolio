import { NextResponse } from 'next/server';
import { isBotApiAuthorized, unauthorizedBotResponse } from '../../../../lib/botApiAuth';
import { prisma } from '../../../../lib/db';
import { parseJsonBody } from '../../../../lib/safeJson';
import { OrderIdSchema, OrderStatusSchema, OrderUpdateSchema } from '../../../../lib/validations';

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const parseId = OrderIdSchema.safeParse(params);
  if (!parseId.success) {
    return NextResponse.json({ error: 'Неверный идентификатор' }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({ where: { id: Number(params.id) } });
    if (!order) {
      return NextResponse.json({ error: 'Заявка не найдена' }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Ошибка базы данных' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!isBotApiAuthorized(request)) {
    return unauthorizedBotResponse();
  }

  const parseId = OrderIdSchema.safeParse(params);
  if (!parseId.success) {
    return NextResponse.json({ error: 'Неверный идентификатор' }, { status: 400 });
  }

  const body = await parseJsonBody<unknown>(request);
  if (!body) {
    return NextResponse.json({ error: 'Пустое тело запроса' }, { status: 400 });
  }

  const fullUpdate = OrderUpdateSchema.safeParse(body);
  if (fullUpdate.success) {
    const { deadline, ...rest } = fullUpdate.data;
    try {
      const order = await prisma.order.update({
        where: { id: Number(params.id) },
        data: {
          ...rest,
          ...(deadline !== undefined ? { deadline: deadline ? new Date(deadline) : null } : {}),
        },
      });
      return NextResponse.json(order);
    } catch {
      return NextResponse.json({ error: 'Не удалось обновить заявку' }, { status: 500 });
    }
  }

  const statusOnly = OrderStatusSchema.safeParse(body);
  if (!statusOnly.success) {
    return NextResponse.json({ error: 'Неверные данные' }, { status: 400 });
  }

  try {
    const order = await prisma.order.update({
      where: { id: Number(params.id) },
      data: { status: statusOnly.data.status },
    });
    return NextResponse.json(order);
  } catch {
    return NextResponse.json({ error: 'Не удалось обновить заявку' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  if (!isBotApiAuthorized(request)) {
    return unauthorizedBotResponse();
  }

  const parseId = OrderIdSchema.safeParse(params);
  if (!parseId.success) {
    return NextResponse.json({ error: 'Неверный идентификатор' }, { status: 400 });
  }

  await prisma.order.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
