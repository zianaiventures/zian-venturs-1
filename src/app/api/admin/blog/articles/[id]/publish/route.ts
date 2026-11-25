import { NextRequest, NextResponse } from 'next/server';
import { getArticleById, updateArticle } from '@/lib/blog-db';
import { isAuthenticated } from '@/lib/admin-auth';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const existing = await getArticleById(params.id);
    if (!existing) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const nextStatus = existing.status === 'published' ? 'draft' : 'published';
    const updated = await updateArticle(params.id, { status: nextStatus });

    return NextResponse.json({ article: updated, status: nextStatus });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
