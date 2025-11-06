// Governance TypeScript Types

export type ProposalState = 
  | "Pending" 
  | "Active" 
  | "Canceled" 
  | "Defeated" 
  | "Succeeded" 
  | "Queued" 
  | "Expired" 
  | "Executed";

export type VoteSupport = "For" | "Against" | "Abstain";

export type BhaktiTransferType = "Sent" | "Received";

export interface Guardian {
  id: string;
  address: string;
  name: string;
  rakshaTokenId: string;
  bhaktiBalance: string;
  bhaktiReceived: string;
  bhaktiSent: string;
  proposalsCreated: number;
  votesCount: number;
  proposalsVotedFor: number;
  proposalsVotedAgainst: number;
  proposalsAbstained: number;
  bhaktiDelegatedTo: string | null;
  bhaktiDelegatedVotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vote {
  voter: {
    name: string;
    address: string;
  };
  support: VoteSupport;
  weight: string;
  reason?: string;
  createdAt: string;
}

export interface Proposal {
  id: string;
  proposalId: string;
  proposer: {
    name: string;
    address: string;
    bhaktiBalance?: string;
  };
  targets?: string[];
  values?: string[];
  calldatas?: string[];
  description: string;
  startBlock: string;
  endBlock: string;
  createdAt: string;
  createdAtBlock: string;
  executedAt?: string;
  executedAtBlock?: string;
  canceledAt?: string;
  canceledAtBlock?: string;
  forVotes: string;
  againstVotes: string;
  abstainVotes: string;
  state: ProposalState;
  executed: boolean;
  canceled: boolean;
  quorum: string;
  votes?: Vote[];
}

export interface BhaktiTransfer {
  id: string;
  guardian?: {
    name: string;
    address: string;
  };
  from: string;
  to: string;
  amount: string;
  type: BhaktiTransferType;
  timestamp: string;
  blockNumber: string;
  transactionHash: string;
}

export interface GovernanceStats {
  totalProposals: number;
  activeProposals: number;
  executedProposals: number;
  defeatedProposals: number;
  canceledProposals: number;
  totalGuardians: number;
  activeGuardians: number;
  totalBhaktiSupply: string;
  totalBhaktiTransfers: number;
  totalVotes: number;
  totalForVotes: string;
  totalAgainstVotes: string;
  totalAbstainVotes: string;
  lastUpdateBlock: string;
  lastUpdateTimestamp: string;
}

export interface GuardianWithProposals extends Guardian {
  proposals: Proposal[];
  votes: Array<{
    proposal: {
      id: string;
      proposalId: string;
      description: string;
      state: ProposalState;
    };
    support: VoteSupport;
    weight: string;
    createdAt: string;
  }>;
}

// Query result types
export interface GetAllGuardiansData {
  guardians: Guardian[];
}

export interface GetActiveProposalsData {
  proposals: Proposal[];
}

export interface GetAllProposalsData {
  proposals: Proposal[];
}

export interface GetProposalByIdData {
  proposal: Proposal;
}

export interface GetGuardianProfileData {
  guardian: GuardianWithProposals;
}

export interface GetGovernanceStatsData {
  governanceStats: GovernanceStats;
}

export interface GetGuardianBhaktiHistoryData {
  bhaktiTransfers: BhaktiTransfer[];
}

export interface GetGuardianLeaderboardData {
  guardians: Array<Pick<Guardian, 'name' | 'address' | 'bhaktiBalance' | 'votesCount' | 'proposalsCreated'>>;
}

export interface GetProposalsByStateData {
  proposals: Proposal[];
}