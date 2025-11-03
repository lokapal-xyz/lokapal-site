import { useQuery } from '@apollo/client/react';
import { useState, useMemo } from 'react';
import {
  GET_DASHBOARD_ENTRIES,
  GET_VERSION_HISTORY,
  GET_LEDGER_STATS,
  DashboardEntriesResult,
  DashboardStatsResult,
  DashboardEntry,
} from '@/lib/graphql/dashboardQueries';

export type FilterStatus = 'all' | 'active' | 'deprecated';
export type SortField = 'blockTimestamp' | 'versionIndex' | 'title';
export type SortDirection = 'asc' | 'desc';

interface UseDashboardEntriesOptions {
  pageSize?: number;
  initialFilter?: FilterStatus;
  initialSort?: SortField;
  initialSortDirection?: SortDirection;
}

export function useDashboardEntries(options: UseDashboardEntriesOptions = {}) {
  const {
    pageSize = 20,
    initialFilter = 'all',
    initialSort = 'blockTimestamp',
    initialSortDirection = 'desc',
  } = options;

  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(initialFilter);
  const [sortField, setSortField] = useState<SortField>(initialSort);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);
  const [searchQuery, setSearchQuery] = useState('');

  // Build where clause based on filters
  const whereClause = useMemo(() => {
    const where: any = {};
    
    if (filterStatus === 'active') {
      where.deprecated = false;
    } else if (filterStatus === 'deprecated') {
      where.deprecated = true;
    }

    if (searchQuery) {
      where.title_contains_nocase = searchQuery;
    }

    return Object.keys(where).length > 0 ? where : undefined;
  }, [filterStatus, searchQuery]);

  const { data, loading, error, refetch } = useQuery<DashboardEntriesResult>(
    GET_DASHBOARD_ENTRIES,
    {
      variables: {
        first: pageSize,
        skip: currentPage * pageSize,
        orderBy: sortField,
        orderDirection: sortDirection,
        where: whereClause,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const entries = data?.entries || [];
  const hasMore = entries.length === pageSize;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (status: FilterStatus) => {
    setFilterStatus(status);
    setCurrentPage(0);
  };

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    setCurrentPage(0);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  return {
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
    refetch,
  };
}

export function useDashboardStats() {
  const { data, loading, error } = useQuery<DashboardStatsResult>(
    GET_LEDGER_STATS
  );

  const stats = useMemo(() => {
    if (!data) return null;

    return {
      totalEntries: (data.activeEntries?.length || 0) + (data.deprecatedEntries?.length || 0),
      activeEntries: data.activeEntries?.length || 0,
      deprecatedEntries: data.deprecatedEntries?.length || 0,
    };
  }, [data]);

  return { stats, loading, error };
}

export function useVersionHistory(title: string) {
  const { data, loading, error } = useQuery<{ entries: DashboardEntry[] }>(
    GET_VERSION_HISTORY,
    {
      variables: { title },
      skip: !title,
    }
  );

  const versions = useMemo(() => {
    if (!data?.entries) return [];
    return data.entries;
  }, [data]);

  return { versions, loading, error };
}