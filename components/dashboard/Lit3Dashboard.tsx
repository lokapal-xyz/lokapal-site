'use client';

import { useDashboardEntries } from '@/hooks/useDashboard';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { LedgerEntry } from '@/components/dashboard/LedgerEntry';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

interface Lit3DashboardProps {
  chainId?: number;
  language?: string; // Add language prop
}

export function Lit3Dashboard({ chainId = 84532 }: Lit3DashboardProps) {
  const {
    entries,
    loading,
    error,
    currentPage,
    hasMore,
    filterStatus,
    sortField,
    sortDirection,
    searchQuery,
    handlePageChange,
    handleFilterChange,
    handleSortChange,
    handleSearchChange,
  } = useDashboardEntries({
    pageSize: 20,
  });

  if (error) {
    return (
      <div className="p-8 border border-red-500/30 bg-red-500/10 rounded-lg">
        <h3 className="text-xl font-mono font-bold text-red-400 mb-2">
          Error Loading Dashboard
        </h3>
        <p className="text-sm text-slate-300 font-mono">
          {error.message || 'Failed to load ledger entries'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <DashboardStats />

      {/* Filters */}
      <DashboardFilters
        filterStatus={filterStatus}
        sortField={sortField}
        sortDirection={sortDirection}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        onSearchChange={handleSearchChange}
      />

      {/* Loading State */}
      {loading && entries.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      )}

      {/* Entries Grid */}
      {!loading && entries.length === 0 ? (
        <div className="p-8 border border-slate-700 bg-slate-900/30 rounded-lg text-center">
          <p className="text-slate-400 font-mono">
            No entries found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <LedgerEntry key={entry.id} entry={entry} chainId={chainId} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {(currentPage > 0 || hasMore) && (
        <div className="flex items-center justify-between pt-6 border-t border-slate-800">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0 || loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors font-mono text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="text-sm font-mono text-slate-400">
            Page {currentPage + 1}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!hasMore || loading}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 disabled:cursor-not-allowed text-slate-300 rounded-lg transition-colors font-mono text-sm"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Loading indicator for pagination */}
      {loading && entries.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
        </div>
      )}
    </div>
  );
}