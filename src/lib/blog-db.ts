import fs from 'fs';
import path from 'path';
import { Article, ArticleType, ArticleStatus, Category } from '@/types/blog';
import { INITIAL_ARTICLES, ALL_INITIAL_ARTICLES, INITIAL_CATEGORIES } from '@/data/blog/initial-articles';
import { supabaseAdmin, isSupabaseConfigured } from './supabase';

const DATA_DIR = path.join(process.cwd(), 'src', 'data', 'blog');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(ARTICLES_FILE)) {
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(ALL_INITIAL_ARTICLES.length > 0 ? ALL_INITIAL_ARTICLES : INITIAL_ARTICLES, null, 2), 'utf-8');
  }

  if (!fs.existsSync(CATEGORIES_FILE)) {
    fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(INITIAL_CATEGORIES, null, 2), 'utf-8');
  }
}

function readLocalArticles(): Article[] {
  try {
    ensureDataDirectory();
    const data = fs.readFileSync(ARTICLES_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : (ALL_INITIAL_ARTICLES.length > 0 ? ALL_INITIAL_ARTICLES : INITIAL_ARTICLES);
  } catch (err) {
    console.error('[blog-db] Error reading local articles, falling back to initial data:', err);
    return ALL_INITIAL_ARTICLES.length > 0 ? ALL_INITIAL_ARTICLES : INITIAL_ARTICLES;
  }
}

function writeLocalArticles(articles: Article[]): void {
  try {
    ensureDataDirectory();
    const tempFile = `${ARTICLES_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(articles, null, 2), 'utf-8');
    fs.renameSync(tempFile, ARTICLES_FILE);
  } catch (err) {
    console.error('[blog-db] Error writing local articles:', err);
  }
}

function readLocalCategories(): Category[] {
  try {
    ensureDataDirectory();
    const data = fs.readFileSync(CATEGORIES_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CATEGORIES;
  } catch (err) {
    return INITIAL_CATEGORIES;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.from('categories').select('*');
      if (!error && data && data.length > 0) {
        return data as Category[];
      }
    } catch (e) {
      console.warn('[blog-db] Supabase categories read fallback:', e);
    }
  }
  return readLocalCategories();
}

export interface GetArticlesFilter {
  type?: ArticleType;
  status?: ArticleStatus | 'all';
  category?: string;
  search?: string;
  is_featured?: boolean;
}

export async function getArticles(filter: GetArticlesFilter = {}): Promise<Article[]> {
  let list: Article[] = [];

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      let query = supabaseAdmin.from('articles').select('*');
      if (filter.type) query = query.eq('article_type', filter.type);
      if (filter.status && filter.status !== 'all') {
        query = query.eq('status', filter.status);
      }
      if (filter.category && filter.category !== 'All') {
        query = query.eq('category', filter.category);
      }
      if (typeof filter.is_featured === 'boolean') {
        query = query.eq('is_featured', filter.is_featured);
      }

      const { data, error } = await query;
      if (!error && data) {
        list = data as Article[];
      }
    } catch (e) {
      console.warn('[blog-db] Supabase query fallback to local:', e);
    }
  }

  if (list.length === 0) {
    list = readLocalArticles();
  }

  // Apply filters locally (also handles search and fallback)
  return list.filter((art) => {
    if (filter.type) {
      const norm = (s: string) => (s || '').replace(/_/g, '-');
      if (norm(art.article_type) !== norm(filter.type)) return false;
    }
    if (filter.status && filter.status !== 'all' && art.status !== filter.status) return false;
    if (filter.category && filter.category !== 'All' && art.category !== filter.category) return false;
    if (typeof filter.is_featured === 'boolean' && art.is_featured !== filter.is_featured) return false;
    if (filter.search && filter.search.trim()) {
      const q = filter.search.toLowerCase().trim();
      const inTitle = art.title.toLowerCase().includes(q);
      const inExcerpt = art.excerpt.toLowerCase().includes(q);
      const inContent = art.content.toLowerCase().includes(q);
      const inKeyword = (art.target_keyword || '').toLowerCase().includes(q);
      if (!inTitle && !inExcerpt && !inContent && !inKeyword) return false;
    }
    return true;
  });
}

export async function getArticleBySlug(slug: string, allowDraft = false): Promise<Article | null> {
  // Normalize slug by trimming slashes
  const cleanSlug = slug.replace(/^\/+|\/+$/g, '');

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      let query = supabaseAdmin.from('articles').select('*').eq('slug', cleanSlug);
      if (!allowDraft) {
        query = query.eq('status', 'published');
      }
      const { data, error } = await query.single();
      if (!error && data) return data as Article;
    } catch (e) {
      console.warn('[blog-db] Supabase getArticleBySlug fallback:', e);
    }
  }

  const all = readLocalArticles();
  const match = all.find((a) => a.slug === cleanSlug);
  if (!match) return null;
  if (!allowDraft && match.status !== 'published') return null;
  return match;
}

export async function getArticleById(id: string): Promise<Article | null> {
  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin.from('articles').select('*').eq('id', id).single();
      if (!error && data) return data as Article;
    } catch (e) {
      // fallback
    }
  }

  const all = readLocalArticles();
  return all.find((a) => a.id === id) || null;
}

export async function createArticle(data: Partial<Article>): Promise<Article> {
  const all = readLocalArticles();
  const now = new Date().toISOString();

  const newArticle: Article = {
    id: data.id || `art-${Date.now()}`,
    title: data.title || 'Untitled Article',
    slug: data.slug || `article-${Date.now()}`,
    excerpt: data.excerpt || '',
    content: data.content || '',
    category: data.category || 'Enterprise AI',
    article_type: data.article_type || 'blog',
    cover_image_url: data.cover_image_url || '/blog/meeting-notes/meeting-notes-fallback.svg',
    status: data.status || 'draft',
    is_featured: Boolean(data.is_featured),
    seo_title: data.seo_title || data.title || '',
    meta_description: data.meta_description || data.excerpt || '',
    target_keyword: data.target_keyword,
    guest_name: data.guest_name,
    reading_time: data.reading_time || '3 min read',
    created_at: now,
    updated_at: now,
    published_at: data.status === 'published' ? now : undefined,
  };

  all.unshift(newArticle);
  writeLocalArticles(all);

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      await supabaseAdmin.from('articles').upsert(newArticle);
    } catch (e) {
      console.error('[blog-db] Failed to write to Supabase:', e);
    }
  }

  return newArticle;
}

export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
  const all = readLocalArticles();
  const index = all.findIndex((a) => a.id === id);
  if (index === -1) return null;

  const now = new Date().toISOString();
  const existing = all[index];

  const updated: Article = {
    ...existing,
    ...updates,
    id: existing.id,
    updated_at: now,
    published_at:
      updates.status === 'published' && !existing.published_at
        ? now
        : updates.status === 'draft'
        ? undefined
        : existing.published_at,
  };

  all[index] = updated;
  writeLocalArticles(all);

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      await supabaseAdmin.from('articles').upsert(updated);
    } catch (e) {
      console.error('[blog-db] Failed to update Supabase:', e);
    }
  }

  return updated;
}

export async function deleteArticle(id: string): Promise<boolean> {
  const all = readLocalArticles();
  const filtered = all.filter((a) => a.id !== id);
  if (filtered.length === all.length) return false;

  writeLocalArticles(filtered);

  if (isSupabaseConfigured && supabaseAdmin) {
    try {
      await supabaseAdmin.from('articles').delete().eq('id', id);
    } catch (e) {
      console.error('[blog-db] Failed to delete from Supabase:', e);
    }
  }

  return true;
}

export async function syncToSupabase(): Promise<{ success: boolean; syncedCount: number; error?: string }> {
  if (!isSupabaseConfigured || !supabaseAdmin) {
    return { success: false, syncedCount: 0, error: 'Supabase credentials are not configured in environment.' };
  }

  try {
    const categories = readLocalCategories();
    await supabaseAdmin.from('categories').upsert(categories, { onConflict: 'slug' });

    const articles = readLocalArticles();
    const { error } = await supabaseAdmin.from('articles').upsert(articles, { onConflict: 'slug' });

    if (error) throw error;
    return { success: true, syncedCount: articles.length };
  } catch (err: any) {
    return { success: false, syncedCount: 0, error: err?.message || 'Sync failed.' };
  }
}
