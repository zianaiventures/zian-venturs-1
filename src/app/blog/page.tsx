import React from 'react';
import type { Metadata } from 'next';
import { getArticles } from '@/lib/blog-db';
import BlogModuleView from '@/components/blog/BlogModuleView';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Blog & Perspectives | ZiAn Ventures',
  description: 'Explore ideas, knowledge, founder debriefs, and strategic playbooks across Enterprise AI, MedTech, and Venture Building.',
  keywords: [
    'ZiAn Insights',
    'AI Perspectives',
    'Healthcare Innovation',
    'MedTech Venture Building',
    'Enterprise AI',
    'Founder Debriefs',
    'ZiAn Ventures',
  ],
  path: 'blog',
});

export const revalidate = 60;

export default async function BlogHubPage() {
  const articles = await getArticles({ status: 'all' });

  return (
    <main>
      <BlogModuleView initialArticles={articles} />
    </main>
  );
}
