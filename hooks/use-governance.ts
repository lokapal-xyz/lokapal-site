import { useQuery } from '@apollo/client/react';
import {
  GET_ALL_GUARDIANS,
  GET_ACTIVE_PROPOSALS,
  GET_ALL_PROPOSALS,
  GET_GUARDIAN_PROFILE,
  GET_GOVERNANCE_STATS,
  GET_GUARDIAN_BHAKTI_HISTORY,
  GET_GUARDIAN_LEADERBOARD,
  GET_PROPOSALS_BY_STATE,
} from '@/lib/governance-queries';
import {
  GetAllGuardiansData,
  GetActiveProposalsData,
  GetAllProposalsData,
  GetGuardianProfileData,
  GetGovernanceStatsData,
  GetGuardianBhaktiHistoryData,
  GetGuardianLeaderboardData,
  GetProposalsByStateData,
  ProposalState,
} from '@/lib/governance-types';
import { governanceApolloClient } from '@/lib/governance-apollo-client';

// Hook to get all guardians
export function useAllGuardians() {
  return useQuery<GetAllGuardiansData>(GET_ALL_GUARDIANS, {
    client: governanceApolloClient,
  });
}

// Hook to get active proposals
export function useActiveProposals() {
  return useQuery<GetActiveProposalsData>(GET_ACTIVE_PROPOSALS, {
    client: governanceApolloClient,
  });
}

// Hook to get all proposals with pagination
export function useAllProposals(first: number = 50, skip: number = 0) {
  return useQuery<GetAllProposalsData>(GET_ALL_PROPOSALS, {
    client: governanceApolloClient,
    variables: { first, skip },
  });
}

// Hook to get guardian profile
export function useGuardianProfile(address: string | null | undefined) {
  return useQuery<GetGuardianProfileData>(GET_GUARDIAN_PROFILE, {
    client: governanceApolloClient,
    variables: { address: address?.toLowerCase() },
    skip: !address, // Skip query if no address provided
  });
}

// Hook to get governance statistics
export function useGovernanceStats() {
  return useQuery<GetGovernanceStatsData>(GET_GOVERNANCE_STATS, {
    client: governanceApolloClient,
  });
}

// Hook to get guardian BHAKTI history
export function useGuardianBhaktiHistory(
  guardianAddress: string | null | undefined,
  first: number = 50
) {
  return useQuery<GetGuardianBhaktiHistoryData>(GET_GUARDIAN_BHAKTI_HISTORY, {
    client: governanceApolloClient,
    variables: {
      guardianAddress: guardianAddress?.toLowerCase(),
      first,
    },
    skip: !guardianAddress,
  });
}

// Hook to get guardian leaderboard
export function useGuardianLeaderboard() {
  return useQuery<GetGuardianLeaderboardData>(GET_GUARDIAN_LEADERBOARD, {
    client: governanceApolloClient,
  });
}

// Hook to get proposals by state
export function useProposalsByState(state: ProposalState) {
  return useQuery<GetProposalsByStateData>(GET_PROPOSALS_BY_STATE, {
    client: governanceApolloClient,
    variables: { state },
  });
}