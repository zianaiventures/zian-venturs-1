import React from 'react';
import type { Metadata } from 'next';
import AccessNavbar from '@/components/community/AccessNavbar';
import AccessFooter from '@/components/community/AccessFooter';
import CommunityExperience from '@/components/community/CommunityExperience';
import { getCommunityVideos, type CommunityVideo } from '@/lib/community-videos';
import { SITE_URL, canonicalFor, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'ACCESS by ZIAN | Startup Builder Community in India',
  description:
    "ACCESS by ZIAN is India's elite startup developer ecosystem. We match top builders with high-growth startups, back them with expert advice, and host unscripted founder roundtables.",
  keywords: [
    'Startup Developer Community',
    'ACCESS by ZIAN',
    'Founder Roundtables',
    'Startup Ecosystem India',
    'Venture Development Community',
  ],
  path: 'community',
});

export const revalidate = 1800;

const PAGE_URL = canonicalFor('community');

/** Real, verifiable entities only — the episode list comes from the live channel feed. */
function communitySchema(videos: CommunityVideo[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: metadata.title as string,
        description: metadata.description as string,
        isPartOf: { '@id': `${SITE_URL}#organization` },
        publisher: { '@id': `${SITE_URL}#organization` },
        breadcrumb: { '@id': `${PAGE_URL}#breadcrumb` },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: videos.length,
          itemListElement: videos.map((video, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            name: video.title,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${PAGE_URL}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ZiAn Ventures', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'ACCESS by ZIAN', item: PAGE_URL },
        ],
      },
    ],
  };
}

export default async function CommunityPage() {
  const videos = await getCommunityVideos();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(communitySchema(videos)) }}
      />
      <AccessNavbar />
      <CommunityExperience videos={videos} />
      <AccessFooter />
    </>
  );
}
