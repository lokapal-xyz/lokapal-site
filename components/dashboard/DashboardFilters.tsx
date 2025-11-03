'use client';

import { Search, Filter, ArrowUpDown } from 'lucide-react';
import { FilterStatus, SortField, SortDirection } from '@/hooks/useDashboard';

interface DashboardFiltersProps {
  filterStatus: FilterStatus;
  sortField: SortField;
  sortDirection: SortDirection;
  searchQuery: string;
  onFilterChange: (status: FilterStatus) => void;
  onSortChange: (field: SortField) => void;
  onSearchChange: (query: string) => void;
}

export function DashboardFilters({
  filterStatus,
  sortField,
  sortDirection,
  searchQuery,
  onFilterChange,
  onSortChange,
  onSearchChange,
}: DashboardFiltersProps) {
  const filterOptions: { value: FilterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'deprecated', label: 'Deprecated' },
  ];

  const sortOptions: { value: SortField; label: string }[] = [
    { value: 'blockTimestamp', label: 'Date' },
    { value: 'versionIndex', label: 'Version' },
    { value: 'title', label: 'Title' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 font-mono text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-colors"
        />
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Status Filter */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-mono text-slate-400 uppercase">Filter</span>
          </div>
          <div className="flex gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onFilterChange(option.value)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                  filterStatus === option.value
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpDown className="w-4 h-4 text-slate-500" />
            <span className="text-xs font-mono text-slate-400 uppercase">Sort By</span>
          </div>
          <div className="flex gap-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onSortChange(option.value)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 flex items-center gap-2 ${
                  sortField === option.value
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {option.label}
                {sortField === option.value && (
                  <span className="text-xs">
                    {sortDirection === 'desc' ? '↓' : '↑'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}