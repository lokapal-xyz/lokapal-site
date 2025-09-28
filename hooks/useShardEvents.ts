import { useQuery, useSubscription, useLazyQuery } from '@apollo/client/react';
import { 
  GET_SHARDS, 
  GET_SHARD_BY_INDEX, 
  GET_RECENT_SHARDS,
  GET_ARCHIVE_INFO,
  SHARD_SUBSCRIPTION,
  ShardsQueryResult,
  ShardsQueryVariables,
  Shard
} from '@/lib/graphql/queries';
import React from 'react';

// Hook to get all shards with pagination
export function useShards(variables?: { first?: number; skip?: number; orderBy?: string; orderDirection?: 'asc' | 'desc' }) {
  return useQuery<ShardsQueryResult, ShardsQueryVariables>(
    GET_SHARDS,
    {
      variables: {
        first: 50,
        skip: 0,
        orderBy: 'blockTimestamp',
        orderDirection: 'desc',
        ...variables,
      },
      // Poll every 30 seconds for new data
      pollInterval: 30000,
      // Show cached data while refetching
      notifyOnNetworkStatusChange: true,
    }
  );
}

// Hook to get a specific shard by index
export function useShardByIndex(shardIndex: string) {
  return useQuery<{ shards: Shard[] }, { shardIndex: string }>(
    GET_SHARD_BY_INDEX,
    {
      variables: { shardIndex },
      skip: !shardIndex, // Don't execute if shardIndex is empty
    }
  );
}

// Lazy query hook for manual shard fetching
export function useLazyShards() {
  return useLazyQuery<ShardsQueryResult, ShardsQueryVariables>(
    GET_SHARDS
  );
}

// Hook for recent shards (useful for notifications)
export function useRecentShards(since: string) {
  return useQuery<{ shards: Shard[] }, { since: string }>(
    GET_RECENT_SHARDS,
    {
      variables: { since },
      skip: !since,
      pollInterval: 10000, // Poll more frequently for recent data
    }
  );
}

// Hook for archive information
export function useArchiveInfo() {
  return useQuery<{ archives: Array<{ id: string; totalShards: string; currentArchivist: string; lastUpdated: string }> }>(
    GET_ARCHIVE_INFO,
    {
      pollInterval: 60000, // Poll every minute
    }
  );
}

// Subscription hook for real-time updates (if supported)
export function useShardSubscription() {
  return useSubscription<{ shards: Shard[] }>(
    SHARD_SUBSCRIPTION
  );
}

// Custom hook for pagination
export function usePaginatedShards(pageSize: number = 20) {
  const [currentPage, setCurrentPage] = React.useState(0);
  
  const { data, loading, error, fetchMore } = useQuery<ShardsQueryResult, ShardsQueryVariables>(
    GET_SHARDS,
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
          shards: [
            ...prev.shards,
            ...fetchMoreResult.shards,
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
    hasMore: data?.shards.length === pageSize,
  };
}