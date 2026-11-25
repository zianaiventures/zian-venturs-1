import type { MetadataRoute } from 'next';
import { canonicalFor } from '@/lib/seo';
import { ALL_INITIAL_ARTICLES, INITIAL_ARTICLES } from '@/data/blog/initial-articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', 'portfolio', 'cohorts', 'community', 'blog'];
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = routes.map((path) => ({
    url: canonicalFor(path),
    lastModified,
    changeFrequency: path === 'community' || path === 'blog' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === 'blog' ? 0.9 : 0.8,
  }));

  // Strict Rule: ONLY published articles in sitemap (never drafts)
  const sourceArticles = ALL_INITIAL_ARTICLES.length > 0 ? ALL_INITIAL_ARTICLES : INITIAL_ARTICLES;
  const publishedArticles = sourceArticles.filter((a) => a.status === 'published');

  const articleEntries: MetadataRoute.Sitemap = publishedArticles.map((article) => {
    return {
      url: canonicalFor(`blog/${article.slug}`),
      lastModified: article.updated_at ? new Date(article.updated_at) : lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    };
  });

  return [...staticEntries, ...articleEntries];
}
