'use client';

import { useState } from 'react';
import { Entry } from '@/lib/graphql/queries';
import { EntryDetailModal } from './EntryDetailModal';

interface LedgerEntryProps {
  entry: Entry;
  chainId?: number;
}

export function LedgerEntry({ entry, chainId = 8453 }: LedgerEntryProps) {
  const [showDetailModal, setShowDetailModal] = useState(false);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
    <div 
      className={`relative border rounded-lg p-4 transition-all duration-300 ${
        entry.deprecated 
          ? 'border-slate-700 bg-slate-900/40 opacity-75' 
          : 'border-cyan-500/30 bg-slate-900/60 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className={`text-lg font-mono font-bold truncate ${
              entry.deprecated ? 'text-slate-400' : 'text-cyan-400'
            }`}>
              {entry.title}
            </h3>
            {entry.deprecated && (
              <span className="px-2 py-0.5 text-xs font-mono bg-red-500/20 text-red-400 border border-red-500/30 rounded whitespace-nowrap">
                DEPRECATED
              </span>
            )}
            <span className="px-2 py-0.5 text-xs font-mono bg-slate-700/50 text-slate-300 border border-slate-600 rounded whitespace-nowrap">
              v{entry.versionIndex}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Entry #{entry.entryIndex}
          </p>
        </div>
      </div>

      {/* Ledger Framework Section */}
      <div className="space-y-2 mb-3">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500 font-mono mb-1">SOURCE</p>
            <p className="text-sm text-slate-300 truncate">{entry.source}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-slate-500 font-mono mb-1">ARCHIVED</p>
            <p className="text-sm text-slate-300 font-mono">
              {formatTimestamp(entry.blockTimestamp)}
            </p>
          </div>
        </div>
      </div>

      {/* Glow effect for active entries */}
      {!entry.deprecated && (
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg"
          style={{
            background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.03) 0%, transparent 70%)'
          }}
        />
      )}

      {/* View Details Button */}
      <button
        onClick={() => setShowDetailModal(true)}
        className="mt-3 w-full flex items-center justify-center gap-2 px-3 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-colors font-mono text-sm border border-cyan-500/30"
      >
        View Full Details
      </button>
    </div>

    <EntryDetailModal
      entry={entry}
      isOpen={showDetailModal}
      onClose={() => setShowDetailModal(false)}
      chainId={chainId}
    />
    </>
  );
}