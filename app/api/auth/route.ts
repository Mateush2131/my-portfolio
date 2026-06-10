import { NextResponse } from 'next/server';

const validUser = process.env.ADMIN_USER || 'admin';
const validPass = process.env.ADMIN_PASS || 'secret';

export function GET(request: Request) {
  const authorization = request.headers.get('authorization') || '';
  const [type, credentials] = authorization.split(' ');

  if (type !== 'Basic' || !credentials) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
    });
  }

  const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
  const [user, pass] = decoded.split(':');

  if (user === validUser && pass === validPass) {
    return NextResponse.json({ authenticated: true });
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
  });
}
