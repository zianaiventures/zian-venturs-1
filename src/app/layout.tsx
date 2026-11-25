import type { Metadata } from 'next';
import './globals.css';
import GlobalChrome from '@/components/GlobalChrome';
import { SITE_NAME, SITE_URL, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'ZiAn Ventures | Startup Building Company in India',
  description:
    'ZiAn Ventures partners with ambitious founders to build, develop and scale innovative technology startups from idea to global markets.',
  keywords: [
    'Startup Building Company in India',
    'Startup Development Company',
    'Venture Development Company',
    'AI Startup Development Company',
    'Startup Co-Building',
    'Enterprise SaaS',
  ],
});

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}logo.png`,
  description: 'ZiAn Ventures partners with founders to develop and scale innovative startups.',
  sameAs: [
    'https://www.linkedin.com/company/97402795/admin/dashboard/',
    'https://www.instagram.com/zianaiventures/?hl=en',
    'https://www.youtube.com/@ZIANAIVENTURES',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#051933] text-white selection:bg-blue-500 selection:text-white">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <GlobalChrome slot="header" />
        {children}
        <GlobalChrome slot="footer" />
      </body>
    </html>
  );
}
