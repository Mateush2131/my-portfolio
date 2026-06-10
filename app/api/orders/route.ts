import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { OrderSchema } from '../../../lib/validations';

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = OrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Неверные данные формы', issues: parsed.error.issues }, { status: 400 });
  }

  const order = await prisma.order.create({ data: parsed.data });
  return NextResponse.json(order, { status: 201 });
}
