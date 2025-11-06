'use client';

import { Proposal } from '@/lib/governance-types';
import {
  formatProposalId,
  getProposalStateColor,
  getProposalStateBgColor,
  formatTimestamp,
  calculateVotePercentage,
} from '@/lib/governance-utils';
import { CheckCircle, XCircle, MinusCircle, Clock } from 'lucide-react';
import { useState } from 'react';

interface ProposalCardProps {
  proposal: Proposal;
}

export function ProposalCard({ proposal }: ProposalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const totalVotes = BigInt(proposal.forVotes) + BigInt(proposal.againstVotes) + BigInt(proposal.abstainVotes);
  const forPercentage = totalVotes > BigInt(0) ? calculateVotePercentage(proposal.forVotes, totalVotes.toString()) : 0;
  const againstPercentage = totalVotes > BigInt(0) ? calculateVotePercentage(proposal.againstVotes, totalVotes.toString()) : 0;
  const abstainPercentage = totalVotes > BigInt(0) ? calculateVotePercentage(proposal.abstainVotes, totalVotes.toString()) : 0;

  const stateColor = getProposalStateColor(proposal.state);
  const stateBgColor = getProposalStateBgColor(proposal.state);

  return (
    <div className="border border-slate-700 bg-slate-900/30 rounded-lg hover:border-slate-600 transition-all">
      {/* Header */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-slate-500">
                {formatProposalId(proposal.proposalId)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-mono ${stateBgColor} ${stateColor}`}>
                {proposal.state}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed break-words">
              {proposal.description.length > 200 && !isExpanded
                ? `${proposal.description.slice(0, 200)}...`
                : proposal.description}
            </p>
            {proposal.description.length > 200 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-mono mt-2"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </div>
        </div>

        {/* Proposer Info */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-slate-500 font-mono">Proposed by:</span>
          <span className="text-cyan-400 font-mono">{proposal.proposer.name}</span>
          <span className="text-slate-600 font-mono">
            {proposal.proposer.address.slice(0, 6)}...{proposal.proposer.address.slice(-4)}
          </span>
        </div>

        {/* Vote Breakdown */}
        <div className="space-y-3">
          {/* For Votes */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="font-mono text-slate-400">For</span>
              </div>
              <span className="font-mono text-green-400">{forPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500/50 transition-all duration-300"
                style={{ width: `${forPercentage}%` }}
              />
            </div>
          </div>

          {/* Against Votes */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className="font-mono text-slate-400">Against</span>
              </div>
              <span className="font-mono text-red-400">{againstPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500/50 transition-all duration-300"
                style={{ width: `${againstPercentage}%` }}
              />
            </div>
          </div>

          {/* Abstain Votes */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-slate-400" />
                <span className="font-mono text-slate-400">Abstain</span>
              </div>
              <span className="font-mono text-slate-500">{abstainPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-500/50 transition-all duration-300"
                style={{ width: `${abstainPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Votes List */}
        {proposal.votes && proposal.votes.length > 0 && (
          <div className="pt-4 border-t border-slate-800">
            <p className="text-xs font-mono text-slate-500 mb-3">
              {proposal.votes.length} {proposal.votes.length === 1 ? 'vote' : 'votes'} cast
            </p>
            <div className="space-y-2">
              {proposal.votes.map((vote, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 bg-slate-800/50 rounded"
                >
                  <span className="text-sm font-mono text-cyan-400">
                    {vote.voter.name}
                  </span>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded ${
                      vote.support === 'For'
                        ? 'bg-green-500/20 text-green-400'
                        : vote.support === 'Against'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}
                  >
                    {vote.support}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{formatTimestamp(proposal.createdAt)}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Block: {proposal.startBlock} - {proposal.endBlock}</span>
          </div>
        </div>
      </div>
    </div>
  );
}