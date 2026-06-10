import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/db';
import { OrderIdSchema, OrderStatusSchema } from '../../../../lib/validations';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const parseId = OrderIdSchema.safeParse(params);
  if (!parseId.success) {
    return NextResponse.json({ error: 'Неверный идентификатор' }, { status: 400 });
  }

  const body = await request.json();
  const parsed = OrderStatusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Неверный статус' }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: Number(params.id) },
    data: { status: parsed.data.status },
  });
  return NextResponse.json(order);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const parseId = OrderIdSchema.safeParse(params);
  if (!parseId.success) {
    return NextResponse.json({ error: 'Неверный идентификатор' }, { status: 400 });
  }

  await prisma.order.delete({ where: { id: Number(params.id) } });
  return NextResponse.json({ success: true });
}
