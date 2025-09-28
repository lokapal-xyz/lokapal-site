import { gql } from '@apollo/client';

// Type definitions for your shard data (matching your schema)
export interface Shard {
  id: string;
  shardIndex: string;
  shardTag: string;
  echoSource: string;
  earthTime: string;
  lankaTime: string;
  archivistLog: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface ShardsQueryResult {
  shards: Shard[];
}

export interface ShardsQueryVariables {
  first?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  where?: {
    shardIndex_gte?: string;
    blockNumber_gte?: string;
    blockTimestamp_gte?: string;
  };
}

// Query to get all shards
export const GET_SHARDS = gql`
  query GetShards(
    $first: Int = 100
    $skip: Int = 0
    $orderBy: Shard_orderBy = blockTimestamp
    $orderDirection: OrderDirection = desc
  ) {
    shards(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      shardIndex
      shardTag
      echoSource
      earthTime
      lankaTime
      archivistLog
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get a specific shard by index
export const GET_SHARD_BY_INDEX = gql`
  query GetShardByIndex($shardIndex: String!) {
    shards(where: { shardIndex: $shardIndex }) {
      id
      shardIndex
      shardTag
      echoSource
      earthTime
      lankaTime
      archivistLog
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get recent shards
export const GET_RECENT_SHARDS = gql`
  query GetRecentShards($since: String!) {
    shards(
      where: { blockTimestamp_gte: $since }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      shardIndex
      shardTag
      echoSource
      earthTime
      lankaTime
      archivistLog
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get archive info
export const GET_ARCHIVE_INFO = gql`
  query GetArchiveInfo {
    archives {
      id
      totalShards
      currentArchivist
      lastUpdated
    }
  }
`;

// Subscription for real-time shard updates
export const SHARD_SUBSCRIPTION = gql`
  subscription OnNewShard {
    shards(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
    ) {
      id
      shardIndex
      shardTag
      echoSource
      earthTime
      lankaTime
      archivistLog
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;