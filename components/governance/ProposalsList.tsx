'use client';

import { Proposal } from '@/lib/governance-types';
import { ProposalCard } from './ProposalCard';
import { Loader2 } from 'lucide-react';

interface ProposalsListProps {
  proposals: Proposal[];
  filterStatus: string;
  loading: boolean;
}

export function ProposalsList({ proposals, filterStatus, loading }: ProposalsListProps) {
  // Filter proposals based on status
  const filteredProposals = filterStatus === 'all'
    ? proposals
    : proposals.filter(p => p.state === filterStatus);

  if (loading && filteredProposals.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (filteredProposals.length === 0) {
    return (
      <div className="p-8 border border-slate-700 bg-slate-900/30 rounded-lg text-center">
        <p className="text-slate-400 font-mono">
          {filterStatus === 'all'
            ? 'No proposals found'
            : `No ${filterStatus.toLowerCase()} proposals found`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/*<div className="flex items-center justify-between">
        <h3 className="text-lg font-mono text-slate-300">
          {filteredProposals.length} {filteredProposals.length === 1 ? 'Proposal' : 'Proposals'}
        </h3>
      </div> */}

      <div className="space-y-4">
        {filteredProposals.map((proposal) => (
          <ProposalCard key={proposal.id} proposal={proposal} />
        ))}
      </div>
    </div>
  );
}