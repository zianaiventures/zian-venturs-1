import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Startup Cohorts & Founder Programs | ZiAn Ventures',
  description:
    "Discover ZiAn Ventures' founder programs and industry-focused startup cohorts across healthcare, D2C and emerging industries.",
  keywords: [
    'Startup Cohorts',
    'Founder Programs',
    'Healthcare Startup Development',
    'D2C Startup Development',
    'Venture Development',
    'Startup Growth',
  ],
  path: 'cohorts',
});

export default function CohortsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
