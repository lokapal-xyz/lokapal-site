// components/BookTokens/BookTokenGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import { BOOKS_DATA } from '@/constants/bookTokens';
import BookTokenCard from './BookTokenCard';
import MobileWalletBanner from './MobileWalletBanner';

export default function BookTokenGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12">
          <div className="h-12 bg-slate-700 rounded w-2/3 mx-auto mb-4 animate-pulse" />
          <div className="h-6 bg-slate-700 rounded w-1/2 mx-auto animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {BOOKS_DATA.map((book) => (
            <div key={book.id} className="border border-slate-700 rounded-xl overflow-hidden animate-pulse">
              <div className="w-full h-80 bg-slate-800" />
              <div className="p-5 bg-slate-900/80 space-y-3">
                <div className="h-4 bg-slate-700 rounded w-1/3" />
                <div className="h-10 bg-slate-700 rounded w-full" />
                <div className="h-12 bg-slate-700 rounded w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Mobile Wallet Banner */}
      <MobileWalletBanner />

      {/* Book Grid - 2 columns on large screens, 1 on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {BOOKS_DATA.map((book) => (
          <BookTokenCard key={book.id} book={book} />
        ))}
      </div>

    </div>
  );
}