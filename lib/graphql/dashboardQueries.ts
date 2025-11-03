import { gql } from '@apollo/client';

// Extended query for dashboard with all fields
export const GET_DASHBOARD_ENTRIES = gql`
  query GetDashboardEntries(
    $first: Int = 50
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

// Query to get total entry count
export const GET_ENTRY_COUNT = gql`
  query GetEntryCount($where: Entry_filter) {
    entries(where: $where) {
      id
    }
  }
`;

// Query to get version history for a specific title
export const GET_VERSION_HISTORY = gql`
  query GetVersionHistory($title: String!) {
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
      blockTimestamp
      transactionHash
      contentHash
    }
  }
`;

// Query to get statistics
export const GET_LEDGER_STATS = gql`
  query GetLedgerStats {
    activeEntries: entries(where: { deprecated: false }) {
      id
    }
    deprecatedEntries: entries(where: { deprecated: true }) {
      id
    }
  }
`;

export interface DashboardEntry {
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

export interface DashboardEntriesResult {
  entries: DashboardEntry[];
}

export interface DashboardStatsResult {
  activeEntries: { id: string }[];
  deprecatedEntries: { id: string }[];
}