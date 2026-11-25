export type ArticleType = 'blog' | 'podcast' | 'meeting_notes' | 'meeting-notes';
export type ArticleStatus = 'published' | 'draft';

export interface ArticleHeading {
  title: string;
  id: string;
  level: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  article_type: ArticleType;
  cover_image_url: string;
  status: ArticleStatus;
  is_featured: boolean;
  seo_title: string;
  meta_description: string;
  target_keyword?: string;
  guest_name?: string;
  reading_time: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  headings?: ArticleHeading[];
  sources?: string[];
}

export interface ArticleImage {
  id: string;
  article_id: string;
  image_url: string;
  alt_text: string;
  position: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
