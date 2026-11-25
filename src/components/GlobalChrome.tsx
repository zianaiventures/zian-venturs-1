'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/**
 * `/community` ships its own Access-by-ZIAN header and footer, so the shared
 * ZiAn Ventures chrome has to stay off that route to avoid stacking two of each.
 */
export default function GlobalChrome({ slot }: { slot: 'header' | 'footer' }) {
  const pathname = usePathname();
  if (pathname?.startsWith('/community')) return null;
  return slot === 'header' ? <Navbar /> : <Footer />;
}
