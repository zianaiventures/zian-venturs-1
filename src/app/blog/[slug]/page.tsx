import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles } from '@/lib/blog-db';
import ArticleImage from '@/components/blog/ArticleImage';
import BlogCard from '@/components/blog/BlogCard';
import MeetingNotesTableOfContents from '@/components/blog/MeetingNotesTableOfContents';
import { SITE_NAME, SITE_URL, canonicalFor } from '@/lib/seo';

interface PageProps {
  params: { slug: string };
}

export const revalidate = 60;

// Dynamic SEO metadata derived strictly from article document metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug, true);
  if (!article) return {};

  const url = canonicalFor(`blog/${article.slug}`);
  const title = article.seo_title || article.title;
  const description = article.meta_description || article.excerpt;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: [
      article.category,
      article.target_keyword || 'AI Perspectives',
      'ZiAn Blog',
      'Venture Architecture',
      'ZiAn Ventures',
    ],
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: article.cover_image_url.startsWith('http')
            ? article.cover_image_url
            : `${SITE_URL.replace(/\/$/, '')}${article.cover_image_url}`,
          width: 1600,
          height: 900,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.cover_image_url],
    },
  };
}

export default async function IndividualBlogArticlePage({ params }: PageProps) {
  // Allow drafts for inspection/review
  const article = await getArticleBySlug(params.slug, true);
  if (!article) notFound();

  // Retrieve related articles based on category or other documents
  const allArticles = await getArticles({ status: 'all' });
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  const articleUrl = canonicalFor(`blog/${article.slug}`);

  // JSON-LD structured data for rich search results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.meta_description || article.excerpt,
    image: article.cover_image_url.startsWith('http')
      ? article.cover_image_url
      : `${SITE_URL.replace(/\/$/, '')}${article.cover_image_url}`,
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at || article.created_at,
    author: {
      '@type': 'Organization',
      name: 'ZiAn Ventures',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  // Render article content preserving all original headings, bullet points, and paragraphs
  const renderFormattedContent = (raw: string) => {
    const blocks = raw.split(/\n\n+/);

    return blocks.map((block, idx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H2 Headings
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace(/^##\s+/, '');
        const headingId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          <h2
            key={idx}
            id={headingId}
            className="mt-12 mb-5 text-2xl sm:text-3xl font-extrabold text-white tracking-tight border-b border-cyan-500/20 pb-3 scroll-mt-28"
          >
            {text}
          </h2>
        );
      }

      // H3 Headings
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace(/^###\s+/, '');
        const headingId = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        return (
          <h3
            key={idx}
            id={headingId}
            className="mt-8 mb-4 text-xl sm:text-2xl font-bold text-cyan-300 tracking-tight scroll-mt-28"
          >
            {text}
          </h3>
        );
      }

      // If text looks like a URL source reference
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || (trimmed.includes('http') && !trimmed.includes(' '))) {
        return (
          <p key={idx} className="my-4 text-xs sm:text-sm font-mono text-cyan-300/90 break-all bg-[#04070e] p-4 rounded-xl border border-cyan-500/20 shadow-inner">
            {trimmed}
          </p>
        );
      }

      // Bullet points block
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- ') || l.trim().startsWith('* '));
        return (
          <ul key={idx} className="my-6 space-y-2 list-disc list-inside text-[#cbd5e1] text-base sm:text-lg leading-relaxed pl-2">
            {items.map((it, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed">
                {it.replace(/^[-*]\s+/, '')}
              </li>
            ))}
          </ul>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="my-6 text-base sm:text-lg lg:text-[1.125rem] leading-[1.9] text-[#cbd5e1] font-normal tracking-wide">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="pt-8 sm:pt-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-cyan-400 transition">Blog</Link>
          <span>/</span>
          <span className="truncate max-w-[240px] sm:max-w-md text-white">{article.title}</span>
        </nav>

        {/* Article Header Container */}
        <header className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
            <span className="rounded-full bg-[#051933] border border-cyan-500/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cyan-300 shadow-sm">
              {article.category}
            </span>
            {article.reading_time && (
              <span className="rounded-full bg-[#051933]/80 border border-cyan-500/20 px-3 py-1 text-xs font-semibold text-slate-300 flex items-center gap-1.5 font-mono">
                <svg className="h-3.5 w-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {article.reading_time}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18]">
            {article.title}
          </h1>

          <p className="mt-5 text-base sm:text-lg lg:text-xl text-[#b8c7dc] leading-relaxed max-w-3xl mx-auto font-normal">
            {article.excerpt}
          </p>

          {/* Guest / Speaker Badge if present */}
          {article.guest_name && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-cyan-500/30 bg-[#051933]/90 px-5 py-2.5 shadow-lg shadow-cyan-500/10 text-left">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-black text-xs shadow-md">
                {article.guest_name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Featured Speaker / Guest</p>
                <p className="text-sm font-bold text-white">{article.guest_name}</p>
              </div>
            </div>
          )}
        </header>

        {/* Hero Cover Visual */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-cyan-500/30 bg-[#051933] shadow-2xl shadow-blue-950/70">
            <ArticleImage
              src={article.cover_image_url}
              alt={article.title}
              aspectRatio="16/9"
              fallbackSrc="/blog/meeting-notes/meeting-notes-fallback.svg"
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Outline / Table of Contents if available */}
        {article.headings && article.headings.length > 0 && (
          <div className="max-w-5xl mx-auto mb-8 sticky top-[72px] z-20">
            <MeetingNotesTableOfContents headings={article.headings} />
          </div>
        )}

        {/* Main Reading Container */}
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="rounded-3xl border border-cyan-500/25 bg-[#051933]/80 p-6 sm:p-10 lg:p-14 backdrop-blur-xl shadow-2xl shadow-blue-950/60 w-full">
            {renderFormattedContent(article.content)}
          </div>

          {/* Bottom Navigation Bar */}
          <div className="flex items-center justify-between border-t border-cyan-500/20 pt-6">
            <Link
              href="/blog"
              className="glow-btn inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-[#051933] px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/15 transition hover:border-cyan-400 hover:bg-[#062247]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to All Articles</span>
            </Link>

            <span className="text-xs text-slate-400 font-mono">
              ZiAn Knowledge Architecture
            </span>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="mt-20 border-t border-cyan-500/20 pt-14 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Related Articles &amp; Perspectives
                </h2>
                <p className="text-xs sm:text-sm text-[#b8c7dc] mt-1">
                  Explore more insights across {article.category} and venture architecture
                </p>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider"
              >
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <BlogCard key={rel.id} article={rel} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
