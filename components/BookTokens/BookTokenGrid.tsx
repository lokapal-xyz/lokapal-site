// components/BookTokens/BookTokenGrid.tsx
'use client';

import { useEffect, useState } from 'react';
import { BOOKS_DATA } from '@/constants/bookTokens';
import BookTokenCard from './BookTokenCard';

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
      {/* Header Section
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-mono font-bold mb-4 bg-gradient-to-r from-cyan-400 via-magenta-400 to-yellow-400 bg-clip-text text-transparent">
          FROM MANY, AS ONE
        </h1>
        <p className="text-slate-400 font-mono text-lg">
          Collect book tokens to support the FMAO literary universe
        </p>
      </div>  */}

      {/* Book Grid - 2 columns on large screens, 1 on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {BOOKS_DATA.map((book) => (
          <BookTokenCard key={book.id} book={book} />
        ))}
      </div>

      {/* Footer Info
      <div className="mt-16 text-center">
        <div className="inline-block bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm">
          <p className="text-slate-400 font-mono text-sm mb-2">
            💎 Each token costs <span className="text-cyan-400 font-bold">0.002 ETH</span>
          </p>
          <p className="text-slate-400 font-mono text-sm mb-2">
            🌐 Deployed on <span className="text-blue-400 font-bold">Base Sepolia</span> (testnet)
          </p>
          <p className="text-slate-400 font-mono text-sm">
            🚀 Mainnet launch coming with Royal Road release
          </p>
        </div>
      </div>  */}
    </div>
  );
}