import { ProposalState } from './governance-types';

// Guardian name mapping (Hindu directional deities)
export const GUARDIAN_NAMES: Record<string, string> = {
  '0x39bd89bfbf5f01c8465f0f88fd6fb83c493a2f1b': 'Indra',
  '0x6bd8483efbf6cd6c68fdb7da7828b02c123526d9': 'Varuna',
  '0x7d5931074d228ded2a2c30256a89e724375d32f8': 'Yama',
  '0x6318c60bc9b79bb6622bbe88dee74ecf1bb8ef4b': 'Kubera',
  '0xd4cf4a2dd5cf505e5b2dabf28a6f9c1959ba8d23': 'Vayu',
  '0x781a788c9f18973ec0c751eb60d8e5b4651057d3': 'Ishana',
  '0x717866f8fd866c0866542f4bd9eb1e6229889acc': 'Agni',
  '0xe73ddbb36ffdd0f809a1bd20c865b156385c771a': 'Nirrti',
};

// Guardian directions
export const GUARDIAN_DIRECTIONS: Record<string, string> = {
  '0x39bd89bfbf5f01c8465f0f88fd6fb83c493a2f1b': 'East',
  '0x6bd8483efbf6cd6c68fdb7da7828b02c123526d9': 'West',
  '0x7d5931074d228ded2a2c30256a89e724375d32f8': 'South',
  '0x6318c60bc9b79bb6622bbe88dee74ecf1bb8ef4b': 'North',
  '0xd4cf4a2dd5cf505e5b2dabf28a6f9c1959ba8d23': 'Northwest',
  '0x781a788c9f18973ec0c751eb60d8e5b4651057d3': 'Northeast',
  '0x717866f8fd866c0866542f4bd9eb1e6229889acc': 'Southeast',
  '0xe73ddbb36ffdd0f809a1bd20c865b156385c771a': 'Southwest',
};

// Format BHAKTI balance (convert from wei to human-readable)
export function formatBhaktiBalance(balance: string | number): string {
  const balanceNum = typeof balance === 'string' ? parseFloat(balance) : balance;
  const formatted = balanceNum / 1e18;
  
  if (formatted >= 1_000_000) {
    return `${(formatted / 1_000_000).toFixed(2)}M`;
  } else if (formatted >= 1_000) {
    return `${(formatted / 1_000).toFixed(2)}K`;
  }
  return formatted.toFixed(2);
}

// Format address (shorten to 0x1234...5678)
export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// Get guardian name by address
export function getGuardianName(address: string): string {
  const lowerAddress = address?.toLowerCase();
  return GUARDIAN_NAMES[lowerAddress] || formatAddress(address);
}

// Get guardian direction by address
export function getGuardianDirection(address: string): string {
  const lowerAddress = address?.toLowerCase();
  return GUARDIAN_DIRECTIONS[lowerAddress] || '';
}

// Get proposal state color for UI
export function getProposalStateColor(state: ProposalState): string {
  const stateColors: Record<ProposalState, string> = {
    Pending: 'text-yellow-500',
    Active: 'text-cyan-500',
    Canceled: 'text-red-500',
    Defeated: 'text-red-500',
    Succeeded: 'text-green-500',
    Queued: 'text-blue-500',
    Expired: 'text-slate-500',
    Executed: 'text-green-500',
  };
  return stateColors[state] || 'text-slate-500';
}

// Get proposal state background color for badges
export function getProposalStateBgColor(state: ProposalState): string {
  const stateBgColors: Record<ProposalState, string> = {
    Pending: 'bg-yellow-500/20',
    Active: 'bg-cyan-500/20',
    Canceled: 'bg-red-500/20',
    Defeated: 'bg-red-500/20',
    Succeeded: 'bg-green-500/20',
    Queued: 'bg-blue-500/20',
    Expired: 'bg-slate-500/20',
    Executed: 'bg-green-500/20',
  };
  return stateBgColors[state] || 'bg-slate-500/20';
}

// Format timestamp to readable date
export function formatTimestamp(timestamp: string | number): string {
  const date = new Date(typeof timestamp === 'string' ? parseInt(timestamp) * 1000 : timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Calculate time remaining until block
export function getTimeRemainingToBlock(currentBlock: number, targetBlock: number): string {
  if (currentBlock >= targetBlock) return 'Ended';
  
  const blocksRemaining = targetBlock - currentBlock;
  // Base Sepolia: ~2 second blocks
  const secondsRemaining = blocksRemaining * 2;
  
  const days = Math.floor(secondsRemaining / 86400);
  const hours = Math.floor((secondsRemaining % 86400) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

// Calculate percentage for vote counts
export function calculateVotePercentage(votes: string, totalVotes: string): number {
  const votesNum = parseFloat(votes);
  const totalNum = parseFloat(totalVotes);
  
  if (totalNum === 0) return 0;
  return (votesNum / totalNum) * 100;
}

// Format proposal ID for display
export function formatProposalId(proposalId: string): string {
  return `#${proposalId.slice(0, 8)}`;
}

// Check if proposal is active based on state
export function isProposalActive(state: ProposalState): boolean {
  return state === 'Active' || state === 'Pending';
}

// Check if proposal can be voted on
export function canVoteOnProposal(state: ProposalState): boolean {
  return state === 'Active';
}

// Get quorum status
export function getQuorumStatus(forVotes: string, quorum: string): {
  reached: boolean;
  percentage: number;
} {
  const forVotesNum = parseFloat(forVotes);
  const quorumNum = parseFloat(quorum);
  
  const percentage = quorumNum > 0 ? (forVotesNum / quorumNum) * 100 : 0;
  
  return {
    reached: forVotesNum >= quorumNum,
    percentage: Math.min(percentage, 100),
  };
}

// Contract addresses on Base Sepolia
export const CONTRACT_ADDRESSES = {
  RAKSHA: '0xYourRakshaAddress', // Replace with actual deployed address
  BHAKTI: '0xYourBhaktiAddress', // Replace with actual deployed address
  GOVERNOR: '0xYourGovernorAddress', // Replace with actual deployed address
};

// Base Sepolia chain config
export const CHAIN_CONFIG = {
  chainId: 84532,
  name: 'Base Sepolia',
  blockTime: 2, // seconds
  explorerUrl: 'https://sepolia.basescan.org',
};

// Helper to get explorer link
export function getExplorerLink(hash: string, type: 'tx' | 'address' | 'block' = 'tx'): string {
  return `${CHAIN_CONFIG.explorerUrl}/${type}/${hash}`;
}