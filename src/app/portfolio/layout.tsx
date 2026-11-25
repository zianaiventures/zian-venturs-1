import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Global Startup Portfolio | ZiAn Ventures',
  description:
    "Explore ZiAn Ventures' startup portfolio across AI, healthcare, SaaS, commerce and emerging technology businesses.",
  keywords: [
    'Technology Startup Portfolio',
    'AI Startup Development',
    'Healthcare Startup Development',
    'SaaS Startup Development',
    'D2C Startup Development',
    'Enterprise Technology Development',
  ],
  path: 'portfolio',
});

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
