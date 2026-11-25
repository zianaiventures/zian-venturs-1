import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin-auth';

export async function GET(req: NextRequest) {
  const authed = isAuthenticated(req);
  if (!authed) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, role: 'admin' });
}
