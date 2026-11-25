import { NextRequest, NextResponse } from 'next/server';
import { getArticles, createArticle } from '@/lib/blog-db';
import { isAuthenticated } from '@/lib/admin-auth';
import { ArticleType } from '@/types/blog';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = (searchParams.get('type') as ArticleType) || undefined;
    const status = (searchParams.get('status') as any) || 'all';

    const articles = await getArticles({ type, status });
    return NextResponse.json({ articles });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const created = await createArticle(body);
    return NextResponse.json({ article: created }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
