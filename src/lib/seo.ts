import type { Metadata } from 'next';

export const SITE_NAME = 'ZiAn Ventures';
export const SITE_URL = 'https://zianai.ventures/';

const SHARE_IMAGE = `${SITE_URL}logo.png`;

/**
 * Canonicals carry a trailing slash to match `trailingSlash: true` in next.config.js,
 * which mirrors how the domain already answers in production.
 */
export function canonicalFor(path = ''): string {
  return path ? `${SITE_URL}${path}/` : SITE_URL;
}

type PageSeo = {
  title: string;
  description: string;
  keywords: string[];
  path?: string;
};

export function pageMetadata({ title, description, keywords, path = '' }: PageSeo): Metadata {
  const url = canonicalFor(path);

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: SHARE_IMAGE, width: 1024, height: 619, alt: `${SITE_NAME} logo` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SHARE_IMAGE],
    },
  };
}
