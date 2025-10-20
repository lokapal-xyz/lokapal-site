import { useQuery, useSubscription, useLazyQuery } from '@apollo/client/react';
import { 
  GET_ENTRIES,
  GET_CHAPTER_ENTRIES,
  GET_CHAPTER_BY_TITLE,
  GET_ENTRY_BY_INDEX,
  GET_CHAPTER_BY_INDEX,
  GET_RECENT_CHAPTERS,
  GET_ENTRY_VERSIONS,
  GET_ENTRIES_WITH_NFT,
  GET_ENTRIES_WITH_HASH,
  GET_LEDGER_INFO,
  ENTRY_SUBSCRIPTION,
  EntriesQueryResult,
  EntriesQueryVariables,
  Entry
} from '@/lib/graphql/queries';
import React from 'react';

// Hook to get all entries (full data)
export function useEntries(variables?: { first?: number; skip?: number; orderBy?: string; orderDirection?: 'asc' | 'desc' }) {
  return useQuery<EntriesQueryResult, EntriesQueryVariables>(
    GET_ENTRIES,
    {
      variables: {
        first: 50,
        skip: 0,
        orderBy: 'blockTimestamp',
        orderDirection: 'desc',
        ...variables,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
}

// Hook to get chapter entries only (story display - minimal fields)
export function useChapterEntries(variables?: { first?: number; skip?: number }) {
  return useQuery<EntriesQueryResult, EntriesQueryVariables>(
    GET_CHAPTER_ENTRIES,
    {
      variables: {
        first: 50,
        skip: 0,
        ...variables,
      },
      notifyOnNetworkStatusChange: true,
    }
  );
}

// Hook to get current version of a chapter by title
export function useChapterByTitle(title: string) {
  return useQuery<EntriesQueryResult, { title: string }>(
    GET_CHAPTER_BY_TITLE,
    {
      variables: { title },
      notifyOnNetworkStatusChange: true,
    }
  );
}

// Hook to get a specific entry by index (full data for dashboard)
export function useEntryByIndex(entryIndex: string) {
  return useQuery<{ entries: Entry[] }, { entryIndex: string }>(
    GET_ENTRY_BY_INDEX,
    {
      variables: { entryIndex },
      skip: !entryIndex,
    }
  );
}

// Hook to get a specific chapter by index (minimal data for story display)
export function useChapterByIndex(entryIndex: string) {
  return useQuery<{ entries: Entry[] }, { entryIndex: string }>(
    GET_CHAPTER_BY_INDEX,
    {
      variables: { entryIndex },
      skip: !entryIndex,
    }
  );
}

// Lazy query hook for manual entry fetching
export function useLazyEntries() {
  return useLazyQuery<EntriesQueryResult, EntriesQueryVariables>(
    GET_ENTRIES
  );
}

// Hook for recent chapters (useful for notifications)
export function useRecentChapters(since: string) {
  return useQuery<{ entries: Entry[] }, { since: string }>(
    GET_RECENT_CHAPTERS,
    {
      variables: { since },
      skip: !since,
    }
  );
}

// Hook to get all versions of an entry (for dashboard)
export function useEntryVersions(title: string) {
  return useQuery<{ entries: Entry[] }, { title: string }>(
    GET_ENTRY_VERSIONS,
    {
      variables: { title },
      skip: !title,
    }
  );
}

// Hook to get entries with NFT data (for dashboard)
export function useEntriesWithNFT() {
  return useQuery<{ entries: Entry[] }>(
    GET_ENTRIES_WITH_NFT,
    {
      pollInterval: 600000,
    }
  );
}

// Hook to get entries with content hashes (for dashboard)
export function useEntriesWithHash() {
  return useQuery<{ entries: Entry[] }>(
    GET_ENTRIES_WITH_HASH,
    {
      pollInterval: 600000,
    }
  );
}

// Hook for ledger information
export function useLedgerInfo() {
  return useQuery<{ ledgers: Array<{ id: string; totalEntries: string; currentCurator: string; lastUpdated: string }> }>(
    GET_LEDGER_INFO,
    {
      pollInterval: 600000,
    }
  );
}

// Subscription hook for real-time chapter updates
export function useEntrySubscription() {
  return useSubscription<{ entries: Entry[] }>(
    ENTRY_SUBSCRIPTION
  );
}

// Custom hook for pagination (story chapters)
export function usePaginatedChapters(pageSize: number = 20) {
  const [currentPage, setCurrentPage] = React.useState(0);
  
  const { data, loading, error, fetchMore } = useQuery<EntriesQueryResult, EntriesQueryVariables>(
    GET_CHAPTER_ENTRIES,
    {
      variables: {
        first: pageSize,
        skip: currentPage * pageSize,
      },
    }
  );

  const loadMore = () => {
    fetchMore({
      variables: {
        skip: (currentPage + 1) * pageSize,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        
        setCurrentPage(prev => prev + 1);
        
        return {
          ...prev,
          entries: [
            ...prev.entries,
            ...fetchMoreResult.entries,
          ],
        };
      },
    });
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    loading,
    error,
    loadMore,
    goToPage,
    currentPage,
    hasMore: data?.entries.length === pageSize,
  };
}