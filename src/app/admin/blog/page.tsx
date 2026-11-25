'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Article } from '@/types/blog';

export default function AdminBlogPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newArticle, setNewArticle] = useState<Partial<Article>>({
    title: '',
    slug: '',
    category: 'Enterprise AI',
    reading_time: '4 min read',
    cover_image_url: '/blog/meeting-notes/meeting-notes-fallback.svg',
    status: 'published',
    excerpt: '',
    content: '',
    guest_name: '',
    article_type: 'blog',
  });
  const [previewArticle, setPreviewArticle] = useState<Article | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Check auth and load all articles
  useEffect(() => {
    async function init() {
      try {
        const authRes = await fetch('/api/admin/auth/me');
        if (!authRes.ok) {
          router.push('/admin/login');
          return;
        }
        setAuthenticated(true);
        loadArticles();
      } catch (e) {
        router.push('/admin/login');
      }
    }
    init();
  }, [router]);

  async function loadArticles() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog/articles?status=all');
      const data = await res.json();
      if (res.ok && data.articles) {
        setArticles(data.articles);
      }
    } catch (err) {
      console.error('Failed to load blog articles', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleTogglePublish(article: Article) {
    try {
      const res = await fetch(`/api/admin/blog/articles/${article.id}/publish`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to toggle status');

      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, status: data.status } : a))
      );
      setMessage({
        text: `Updated "${article.title}" to ${data.status.toUpperCase()}`,
        type: 'success',
      });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
  }

  async function handleBulkStatus(status: 'published' | 'draft') {
    const confirmText = `Are you sure you want to set ALL ${articles.length} articles to ${status.toUpperCase()}?`;
    if (!window.confirm(confirmText)) return;

    try {
      setIsSaving(true);
      for (const art of articles) {
        if (art.status !== status) {
          await fetch(`/api/admin/blog/articles/${art.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
          });
        }
      }
      await loadArticles();
      setMessage({ text: `All articles updated to ${status.toUpperCase()}`, type: 'success' });
      setTimeout(() => setMessage(null), 4000);
    } catch (err: any) {
      setMessage({ text: 'Error updating articles', type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingArticle) return;

    try {
      setIsSaving(true);
      const res = await fetch(`/api/admin/blog/articles/${editingArticle.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingArticle),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save');

      setArticles((prev) => prev.map((a) => (a.id === editingArticle.id ? data.article : a)));
      setEditingArticle(null);
      setMessage({ text: 'Article saved successfully', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleCreateArticle(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsSaving(true);
      const res = await fetch('/api/admin/blog/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newArticle,
          slug:
            newArticle.slug ||
            (newArticle.title || '')
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, ''),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create article');

      setArticles((prev) => [data.article, ...prev]);
      setIsCreating(false);
      setNewArticle({
        title: '',
        slug: '',
        category: 'Enterprise AI',
        reading_time: '4 min read',
        cover_image_url: '/blog/meeting-notes/meeting-notes-fallback.svg',
        status: 'published',
        excerpt: '',
        content: '',
        guest_name: '',
        article_type: 'blog',
      });
      setMessage({ text: 'New blog article created successfully', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(article: Article) {
    if (!window.confirm(`Permanently delete "${article.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/blog/articles/${article.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');

      setArticles((prev) => prev.filter((a) => a.id !== article.id));
      setMessage({ text: 'Article deleted', type: 'success' });
      setTimeout(() => setMessage(null), 3000);
    } catch (err: any) {
      setMessage({ text: err.message, type: 'error' });
    }
  }

  async function handleSignOut() {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  }

  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((a) => {
      if (a.category) set.add(a.category);
    });
    return ['All', ...Array.from(set)];
  }, [articles]);

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      if (statusFilter !== 'all' && a.status !== statusFilter) return false;
      if (selectedCategory !== 'All' && a.category !== selectedCategory) return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const inTitle = a.title.toLowerCase().includes(q);
        const inExcerpt = a.excerpt.toLowerCase().includes(q);
        const inGuest = (a.guest_name || '').toLowerCase().includes(q);
        const inCat = (a.category || '').toLowerCase().includes(q);
        if (!inTitle && !inExcerpt && !inGuest && !inCat) return false;
      }
      return true;
    });
  }, [articles, selectedCategory, statusFilter, search]);

  const stats = useMemo(() => {
    const total = articles.length;
    const published = articles.filter((a) => a.status === 'published').length;
    const drafts = total - published;
    const verifiedImages = articles.filter((a) => Boolean(a.cover_image_url)).length;
    return { total, published, drafts, verifiedImages };
  }, [articles]);

  if (authenticated === null || loading) {
    return (
      <div className="min-h-screen bg-[#04070e] flex items-center justify-center">
        <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm">
          <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Loading Blog Admin Console...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04070e] text-[#b8c7dc] selection:bg-cyan-500 selection:text-white pb-24">
      {/* Top Admin Header */}
      <header className="border-b border-cyan-500/20 bg-[#051933]/90 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="text-lg font-black text-white tracking-tight">
            ZiAn <span className="text-cyan-400">Admin</span>
          </Link>
          <span className="text-slate-500">/</span>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
            Unified Blog Console
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition px-3 py-1.5 rounded-lg border border-cyan-500/30 bg-[#051933]"
          >
            <span>Live Public Blog</span>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <button
            onClick={handleSignOut}
            className="text-xs font-semibold text-slate-400 hover:text-red-400 transition px-3 py-1.5 rounded-lg border border-slate-700 hover:border-red-500/30"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Toast / Message Banner */}
        {message && (
          <div
            className={`p-4 rounded-2xl border text-sm flex items-center justify-between backdrop-blur-md transition ${
              message.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/15 border-red-500/30 text-red-300'
            }`}
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-xs opacity-70 hover:opacity-100">
              Dismiss
            </button>
          </div>
        )}

        {/* Heading & New Article CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white">Unified Blog Management</h1>
            <p className="mt-1 text-sm text-[#b8c7dc]">
              Manage all perspectives, debriefs, playbooks, and articles in one unified blog model.
            </p>
          </div>

          <button
            onClick={() => setIsCreating(true)}
            className="glow-btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 hover:scale-[1.02] transition self-start sm:self-auto"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Blog Post</span>
          </button>
        </div>

        {/* Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-cyan-500/20 bg-[#051933]/70 p-5 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Blog Posts</p>
            <p className="text-3xl font-black text-white mt-2">{stats.total}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-[#051933]/70 p-5 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Published</p>
            <p className="text-3xl font-black text-white mt-2">{stats.published}</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-[#051933]/70 p-5 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Drafts</p>
            <p className="text-3xl font-black text-white mt-2">{stats.drafts}</p>
          </div>
          <div className="rounded-2xl border border-blue-500/20 bg-[#051933]/70 p-5 backdrop-blur-md">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Active Visuals</p>
            <p className="text-3xl font-black text-white mt-2">
              {stats.verifiedImages} / {stats.total}
            </p>
          </div>
        </section>

        {/* Action Controls & Filters */}
        <section className="rounded-2xl border border-cyan-500/20 bg-[#051933]/75 p-6 backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles by title, guest, category, excerpt..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-xl bg-[#04070e] border border-cyan-500/25 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Status Tabs & Bulk Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-[#04070e] border border-cyan-500/20 p-1">
                {(['all', 'published', 'draft'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition ${
                      statusFilter === st
                        ? 'bg-cyan-500 text-[#04070e]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                disabled={isSaving}
                onClick={() => handleBulkStatus('published')}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition disabled:opacity-50"
              >
                Publish All
              </button>
              <button
                disabled={isSaving}
                onClick={() => handleBulkStatus('draft')}
                className="px-3.5 py-1.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition disabled:opacity-50"
              >
                Draft All
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-[#04070e] font-bold'
                    : 'bg-[#04070e] text-slate-400 hover:text-white border border-cyan-500/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Articles Table */}
        <section className="rounded-2xl border border-cyan-500/20 bg-[#051933]/70 overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#04070e]/80 border-b border-cyan-500/20 text-slate-400 uppercase tracking-wider font-mono">
                <tr>
                  <th className="py-4 px-4 sm:px-6">Cover</th>
                  <th className="py-4 px-4">Title &amp; Category</th>
                  <th className="py-4 px-4">Reading Time</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/15">
                {filtered.map((art) => (
                  <tr key={art.id} className="hover:bg-cyan-500/5 transition">
                    {/* Thumbnail */}
                    <td className="py-3 px-4 sm:px-6 w-20">
                      <div className="w-16 h-10 rounded-lg overflow-hidden border border-cyan-500/30 bg-[#04070e] relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={art.cover_image_url}
                          alt={art.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/blog/meeting-notes/meeting-notes-fallback.svg';
                          }}
                        />
                      </div>
                    </td>

                    {/* Title & Category */}
                    <td className="py-3 px-4 max-w-md">
                      <p className="font-bold text-white text-sm leading-snug line-clamp-1">{art.title}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                          {art.category}
                        </span>
                        {art.guest_name && (
                          <span className="text-[10px] text-blue-300 font-mono">
                            Guest: {art.guest_name.split(' (')[0]}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-500">{art.slug}</span>
                      </div>
                    </td>

                    {/* Reading Time */}
                    <td className="py-3 px-4 font-mono text-slate-300 whitespace-nowrap">
                      {art.reading_time || '4 min read'}
                    </td>

                    {/* Status with Quick Toggle */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(art)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                          art.status === 'published'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                        }`}
                        title="Click to toggle status"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            art.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        <span>{art.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {/* Preview */}
                        <button
                          onClick={() => setPreviewArticle(art)}
                          className="px-2.5 py-1 rounded-lg border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 transition"
                          title="Preview in modal"
                        >
                          Preview
                        </button>

                        {/* Live Page Link */}
                        <Link
                          href={`/blog/${art.slug}`}
                          target="_blank"
                          className="px-2.5 py-1 rounded-lg border border-blue-500/30 text-blue-300 hover:bg-blue-500/10 transition"
                          title="Open full page"
                        >
                          View Live
                        </Link>

                        {/* Edit */}
                        <button
                          onClick={() => setEditingArticle(art)}
                          className="px-2.5 py-1 rounded-lg border border-slate-600 text-slate-300 hover:text-white hover:border-cyan-400 transition"
                        >
                          Edit
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(art)}
                          className="px-2.5 py-1 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
                          title="Delete article"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl border border-cyan-500/40 bg-[#051933] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setPreviewArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-wider text-cyan-300 font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                {previewArticle.category}
              </span>
              <span className="text-xs font-mono text-slate-400">{previewArticle.reading_time}</span>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  previewArticle.status === 'published'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'bg-amber-500/20 text-amber-300'
                }`}
              >
                {previewArticle.status}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-4">{previewArticle.title}</h2>

            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-cyan-500/30 mb-6 bg-[#04070e]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewArticle.cover_image_url}
                alt={previewArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/blog/meeting-notes/meeting-notes-fallback.svg';
                }}
              />
            </div>

            <div className="bg-[#04070e]/80 p-5 rounded-2xl border border-cyan-500/20 mb-6">
              <p className="text-xs font-bold uppercase text-cyan-400 mb-2">Excerpt</p>
              <p className="text-sm text-[#b8c7dc] leading-relaxed">{previewArticle.excerpt}</p>
            </div>

            <div className="space-y-4 text-sm leading-relaxed text-[#b8c7dc] border-t border-cyan-500/20 pt-6">
              <p className="text-xs font-bold uppercase text-cyan-400 mb-2">Content Preview</p>
              <div className="whitespace-pre-line line-clamp-[15]">{previewArticle.content}</div>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-500/20 flex items-center justify-between">
              <Link
                href={`/blog/${previewArticle.slug}`}
                target="_blank"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300"
              >
                Open Full Dedicated Page &rarr;
              </Link>
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/40 bg-[#051933] p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setEditingArticle(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-white mb-4">Edit Blog Article</h2>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingArticle.title}
                  onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })}
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.category}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Reading Time</label>
                  <input
                    type="text"
                    required
                    value={editingArticle.reading_time || '4 min read'}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, reading_time: e.target.value })
                    }
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Guest / Speaker (Optional)</label>
                  <input
                    type="text"
                    value={editingArticle.guest_name || ''}
                    onChange={(e) =>
                      setEditingArticle({ ...editingArticle, guest_name: e.target.value })
                    }
                    placeholder="e.g. Koyelia Ghosh Roy (Capgemini)"
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={editingArticle.status}
                    onChange={(e) =>
                      setEditingArticle({
                        ...editingArticle,
                        status: e.target.value as 'published' | 'draft',
                      })
                    }
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  required
                  value={editingArticle.cover_image_url}
                  onChange={(e) =>
                    setEditingArticle({ ...editingArticle, cover_image_url: e.target.value })
                  }
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Excerpt</label>
                <textarea
                  rows={3}
                  value={editingArticle.excerpt}
                  onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Content (Markdown / Text)</label>
                <textarea
                  rows={10}
                  value={editingArticle.content}
                  onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingArticle(null)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="glow-btn px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Article Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/40 bg-[#051933] p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-2xl">
            <button
              onClick={() => setIsCreating(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-bold text-white mb-4">Create New Blog Article</h2>

            <form onSubmit={handleCreateArticle} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="Article headline..."
                  value={newArticle.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    const autoSlug = title
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    setNewArticle({ ...newArticle, title, slug: newArticle.slug || autoSlug });
                  }}
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="article-slug"
                    value={newArticle.slug}
                    onChange={(e) => setNewArticle({ ...newArticle, slug: e.target.value })}
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Guest / Speaker (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Jane Smith"
                    value={newArticle.guest_name || ''}
                    onChange={(e) => setNewArticle({ ...newArticle, guest_name: e.target.value })}
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Status</label>
                  <select
                    value={newArticle.status}
                    onChange={(e) =>
                      setNewArticle({
                        ...newArticle,
                        status: e.target.value as 'published' | 'draft',
                      })
                    }
                    className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  required
                  value={newArticle.cover_image_url}
                  onChange={(e) => setNewArticle({ ...newArticle, cover_image_url: e.target.value })}
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Excerpt</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Short summary of the article..."
                  value={newArticle.excerpt}
                  onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white text-sm focus:border-cyan-400 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Content (Markdown / Text)</label>
                <textarea
                  rows={10}
                  required
                  placeholder="Write full article content here with ## headings, paragraphs, etc."
                  value={newArticle.content}
                  onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                  className="w-full rounded-xl bg-[#04070e] border border-cyan-500/30 p-2.5 text-white font-mono text-xs focus:border-cyan-400 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-cyan-500/20 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="glow-btn px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40"
                >
                  {isSaving ? 'Creating...' : 'Create Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
