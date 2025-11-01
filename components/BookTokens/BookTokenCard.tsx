// components/BookTokens/BookTokenCard.tsx
'use client';

import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useTotalMinted, useUserBalance } from '@/lib/hooks/useBookTokens';
import MintButton from './MintButton';
import { BookData } from '@/constants/bookTokens';

interface BookTokenCardProps {
  book: BookData;
}

export default function BookTokenCard({ book }: BookTokenCardProps) {
  const { address } = useAccount();
  const { data: totalMinted } = useTotalMinted(book.id);
  const { data: userBalance } = useUserBalance(address, book.id);

  return (
    <div 
      className={`group relative border rounded-xl overflow-hidden transition-all duration-300 ${
        book.available 
          ? 'hover:border-opacity-80 hover:shadow-2xl hover:-translate-y-1' 
          : ''
      }`}
      style={{
        borderColor: book.available ? book.color : '#475569',
        boxShadow: book.available ? `0 0 20px ${book.color}20` : undefined,
      }}
    >
      {/* GIF Display - Taller to show more of the image */}
      <div className="relative w-full h-80 bg-slate-950 overflow-hidden">
        <Image 
          src={`/books/book-${book.id}.gif`}
          alt={`Book ${book.id}: ${book.title}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={`object-contain transition-transform duration-500 ${
            book.available ? 'group-hover:scale-105' : ''
          }`}
          unoptimized // Required for GIFs to animate
        />
        
        {/* Subtle overlay gradient only at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        
        {/* Book number badge */}
        <div 
          className="absolute top-4 right-4 px-3 py-1.5 rounded-full font-mono text-sm font-bold bg-slate-950/90 backdrop-blur-sm border"
          style={{ 
            color: book.color,
            borderColor: `${book.color}60`
          }}
        >
          BOOK {book.id}
        </div>
      </div>

      {/* Book Info - Compact */}
      <div className="p-5 bg-slate-900/90 backdrop-blur-sm">
        {book.available ? (
          <>
            {/* Stats row - fixed height to prevent shifting */}
            <div className="flex items-center justify-between mb-4 h-8">
              <p className="text-sm text-slate-400 font-mono">
                {totalMinted?.toString() || '0'} MINTED
              </p>
              
              {address && (
                <p 
                  className="text-sm font-mono font-semibold px-2.5 py-1 rounded"
                  style={{ 
                    color: book.color,
                    backgroundColor: `${book.color}20`,
                    borderColor: `${book.color}40`,
                    borderWidth: '1px'
                  }}
                >
                  YOU OWN: {userBalance?.toString() || '0'}
                </p>
              )}
            </div>

            {/* Mint controls */}
            <div className="space-y-3">
              <MintButton bookId={book.id} />
            </div>
          </>
        ) : (
          <div className="py-2">
            <h3 
              className="text-xl font-mono font-bold mb-2"
              style={{ color: book.color }}
            >
              {book.title}
            </h3>
            <p className="text-slate-400 font-mono text-sm">
              COMING WITH BOOK RELEASE
            </p>
          </div>
        )}
      </div>

      {/* Glow effect on hover */}
      {book.available && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${book.color}08 0%, transparent 70%)`
          }}
        />
      )}
    </div>
  );
}