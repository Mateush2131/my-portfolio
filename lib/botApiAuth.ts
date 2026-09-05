import { NextResponse } from 'next/server';

const BOT_SECRET_HEADER = 'x-bot-secret';

export function isBotApiAuthorized(request: Request): boolean {
  const secret = process.env.BOT_API_SECRET;

  if (!secret) {
    return true;
  }

  return request.headers.get(BOT_SECRET_HEADER) === secret;
}

export function unauthorizedBotResponse() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
