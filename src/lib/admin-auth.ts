import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'zian-admin-2026';
const ADMIN_SECRET = process.env.ADMIN_SECRET || 'zian-ai-ventures-secret-session-key-2026';
export const ADMIN_COOKIE_NAME = 'zian_admin_session';

export function verifyPassword(input: string): boolean {
  if (!input) return false;
  // Constant-time comparison
  const a = Buffer.from(input);
  const b = Buffer.from(ADMIN_PASSWORD);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const data = `admin:${expiresAt}`;
  const signature = crypto.createHmac('sha256', ADMIN_SECRET).update(data).digest('hex');
  return Buffer.from(`${data}:${signature}`).toString('base64');
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;
  try {
    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const parts = raw.split(':');
    if (parts.length !== 3) return false;

    const [role, expiresAtStr, signature] = parts;
    if (role !== 'admin') return false;

    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || Date.now() > expiresAt) return false;

    const expectedSig = crypto
      .createHmac('sha256', ADMIN_SECRET)
      .update(`${role}:${expiresAtStr}`)
      .digest('hex');

    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length) return false;
    return crypto.timingSafeEqual(a, b);
  } catch (err) {
    return false;
  }
}

export function isAuthenticated(req?: NextRequest): boolean {
  try {
    if (req) {
      const cookie = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (cookie && verifySessionToken(cookie)) return true;
      const authHeader = req.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        return verifySessionToken(token);
      }
    }

    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch (err) {
    return false;
  }
}
