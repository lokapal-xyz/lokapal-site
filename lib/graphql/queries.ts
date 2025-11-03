import { gql } from '@apollo/client';

// Type definitions for entry data (matching Lit3Ledger schema)
export interface Entry {
  id: string;
  entryIndex: string;
  title: string;
  source: string;
  timestamp1: string;
  timestamp2: string;
  curatorNote: string;
  versionIndex: string;
  nftAddress: string;
  nftId: string;
  contentHash: string;
  permawebLink: string;
  license: string;
  deprecated: boolean;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export interface EntriesQueryResult {
  entries: Entry[];
}

export interface EntriesQueryVariables {
  first?: number;
  skip?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  where?: {
    entryIndex_gte?: string;
    blockNumber_gte?: string;
    blockTimestamp_gte?: string;
    deprecated?: boolean;
  };
}

// Query to get all entries with all fields
export const GET_ENTRIES = gql`
  query GetEntries(
    $first: Int = 100
    $skip: Int = 0
    $orderBy: Entry_orderBy = blockTimestamp
    $orderDirection: OrderDirection = desc
    $where: Entry_filter
  ) {
    entries(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: $where
    ) {
      id
      entryIndex
      title
      source
      timestamp1
      timestamp2
      curatorNote
      versionIndex
      nftAddress
      nftId
      contentHash
      permawebLink
      license
      deprecated
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query for story chapters (minimal - excludes dashboard-only fields)
export const GET_CHAPTER_ENTRIES = gql`
  query GetChapterEntries(
    $first: Int = 100
    $skip: Int = 0
    $orderBy: Entry_orderBy = blockTimestamp
    $orderDirection: OrderDirection = desc
  ) {
    entries(
      first: $first
      skip: $skip
      orderBy: $orderBy
      orderDirection: $orderDirection
      where: { deprecated: false }
    ) {
      id
      entryIndex
      title
      source
      timestamp1
      timestamp2
      curatorNote
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query for a specific chapter by title (gets current non-deprecated version)
export const GET_CHAPTER_BY_TITLE = gql`
  query GetChapterByTitle($title: String!) {
    entries(
      where: { 
        title: $title, 
        deprecated: false 
      }
      orderBy: versionIndex
      orderDirection: desc
      first: 1
    ) {
      id
      entryIndex
      title
      source
      timestamp1
      timestamp2
      curatorNote
      versionIndex
      nftAddress
      nftId
      contentHash
      permawebLink
      license
      deprecated
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get a specific entry by index (all fields for dashboard)
export const GET_ENTRY_BY_INDEX = gql`
  query GetEntryByIndex($entryIndex: String!) {
    entries(where: { entryIndex: $entryIndex }) {
      id
      entryIndex
      title
      source
      timestamp1
      timestamp2
      curatorNote
      versionIndex
      nftAddress
      nftId
      contentHash
      permawebLink
      license
      deprecated
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get a specific entry by index (minimal - for story chapters)
export const GET_CHAPTER_BY_INDEX = gql`
  query GetChapterByIndex($entryIndex: String!) {
    entries(where: { entryIndex: $entryIndex }) {
      id
      entryIndex
      title
      source
      timestamp1
      timestamp2
      curatorNote
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get recent entries (minimal - for story)
export const GET_RECENT_CHAPTERS = gql`
  query GetRecentChapters($since: String!) {
    entries(
      where: { 
        blockTimestamp_gte: $since
        deprecated: false
      }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      entryIndex
      title
      source
      timestamp1
      timestamp2
      curatorNote
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get all versions of an entry (for dashboard versioning view)
export const GET_ENTRY_VERSIONS = gql`
  query GetEntryVersions($title: String!) {
    entries(
      where: { title: $title }
      orderBy: versionIndex
      orderDirection: asc
    ) {
      id
      entryIndex
      title
      versionIndex
      deprecated
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get entries with NFT data (for dashboard NFT integration view)
export const GET_ENTRIES_WITH_NFT = gql`
  query GetEntriesWithNFT {
    entries(
      where: { nftAddress_not: "0x0000000000000000000000000000000000000000" }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      entryIndex
      title
      nftAddress
      nftId
      versionIndex
      blockTimestamp
      transactionHash
    }
  }
`;

// Query to get entries with content hashes (for dashboard verification view)
export const GET_ENTRIES_WITH_HASH = gql`
  query GetEntriesWithHash {
    entries(
      where: { contentHash_not: "0x0000000000000000000000000000000000000000000000000000000000000000" }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      entryIndex
      title
      contentHash
      versionIndex
      blockTimestamp
      transactionHash
    }
  }
`;

// Query for ledger information (archive statistics)
export const GET_LEDGER_INFO = gql`
  query GetLedgerInfo {
    ledgers {
      id
      totalEntries
      currentCurator
      lastUpdated
    }
  }
`;

// Subscription for real-time chapter updates
export const ENTRY_SUBSCRIPTION = gql`
  subscription OnNewEntry {
    entries(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 1
      where: { deprecated: false }
    ) {
      id
      entryIndex
      title
      source
      timestamp1
      timestamp2
      curatorNote
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;