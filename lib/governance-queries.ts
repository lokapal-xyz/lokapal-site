import { gql } from '@apollo/client';

// 1. Get all guardians with their BHAKTI balances and voting stats
export const GET_ALL_GUARDIANS = gql`
  query GetAllGuardians {
    guardians(orderBy: bhaktiBalance, orderDirection: desc) {
      id
      address
      name
      rakshaTokenId
      bhaktiBalance
      bhaktiReceived
      bhaktiSent
      proposalsCreated
      votesCount
      proposalsVotedFor
      proposalsVotedAgainst
      proposalsAbstained
      bhaktiDelegatedTo
      bhaktiDelegatedVotes
    }
  }
`;

// 2. Get all active proposals
export const GET_ACTIVE_PROPOSALS = gql`
  query GetActiveProposals {
    proposals(
      where: { state_in: ["Active", "Pending"] }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      proposalId
      proposer {
        name
        address
      }
      description
      startBlock
      endBlock
      forVotes
      againstVotes
      abstainVotes
      state
      quorum
      createdAt
      votes {
        voter {
          name
          address
        }
        support
        weight
      }
    }
  }
`;

// 3. Get all proposals (for history view)
export const GET_ALL_PROPOSALS = gql`
  query GetAllProposals($first: Int = 50, $skip: Int = 0) {
    proposals(
      first: $first
      skip: $skip
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      proposalId
      proposer {
        name
        address
      }
      description
      startBlock
      endBlock
      forVotes
      againstVotes
      abstainVotes
      state
      executed
      canceled
      executedAt
      canceledAt
      createdAt
    }
  }
`;

// 4. Get guardian profile
export const GET_GUARDIAN_PROFILE = gql`
  query GetGuardianProfile($address: ID!) {
    guardian(id: $address) {
      id
      address
      name
      rakshaTokenId
      bhaktiBalance
      bhaktiReceived
      bhaktiSent
      proposalsCreated
      votesCount
      proposalsVotedFor
      proposalsVotedAgainst
      proposalsAbstained
      bhaktiDelegatedTo
      bhaktiDelegatedVotes
      createdAt
      updatedAt
      proposals(orderBy: createdAt, orderDirection: desc) {
        id
        proposalId
        description
        state
        forVotes
        againstVotes
        createdAt
      }
      votes(orderBy: createdAt, orderDirection: desc) {
        proposal {
          id
          proposalId
          description
          state
        }
        support
        weight
        createdAt
      }
    }
  }
`;

// 5. Get governance statistics
export const GET_GOVERNANCE_STATS = gql`
  query GetGovernanceStats {
    governanceStats(id: "governance-stats") {
      totalProposals
      activeProposals
      executedProposals
      defeatedProposals
      canceledProposals
      totalGuardians
      activeGuardians
      totalBhaktiSupply
      totalBhaktiTransfers
      totalVotes
      totalForVotes
      totalAgainstVotes
      totalAbstainVotes
      lastUpdateBlock
      lastUpdateTimestamp
    }
  }
`;

// 6. Get BHAKTI transfer history for a guardian
export const GET_GUARDIAN_BHAKTI_HISTORY = gql`
  query GetGuardianBhaktiHistory($guardianAddress: ID!, $first: Int = 50) {
    bhaktiTransfers(
      where: { guardian: $guardianAddress }
      first: $first
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      from
      to
      amount
      type
      timestamp
      blockNumber
      transactionHash
    }
  }
`;

// 7. Get guardian leaderboard by citizen loyalty (BHAKTI balance)
export const GET_GUARDIAN_LEADERBOARD = gql`
  query GetGuardianLeaderboard {
    guardians(
      orderBy: bhaktiBalance
      orderDirection: desc
      first: 8
    ) {
      name
      address
      bhaktiBalance
      votesCount
      proposalsCreated
    }
  }
`;

// 8. Get proposals by state
export const GET_PROPOSALS_BY_STATE = gql`
  query GetProposalsByState($state: ProposalState!) {
    proposals(
      where: { state: $state }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      proposalId
      proposer {
        name
      }
      description
      forVotes
      againstVotes
      abstainVotes
      state
      createdAt
      endBlock
    }
  }
`;