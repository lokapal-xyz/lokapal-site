'use client';

import { useState } from 'react';
import { GovernanceProvider } from '@/components/providers/governance-provider';
import { GovernanceStats } from '@/components/governance/GovernanceStats';
import { ProposalsList } from '@/components/governance/ProposalsList';
import { GuardiansList } from '@/components/governance/GuardiansList';
import { GuardianLeaderboard } from '@/components/governance/GuardianLeaderboard';
import { Loader2 } from 'lucide-react';
import {
  useAllGuardians,
  useAllProposals,
  useGovernanceStats,
} from '@/hooks/use-governance';

type ViewMode = 'proposals' | 'guardians' | 'leaderboard';

function GovernanceDashboardContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('proposals');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const { data: statsData, loading: statsLoading } = useGovernanceStats();
  const { data: proposalsData, loading: proposalsLoading } = useAllProposals(50, 0);
  const { data: guardiansData, loading: guardiansLoading } = useAllGuardians();

  const isLoading = statsLoading || proposalsLoading || guardiansLoading;

  return (
    <div className="space-y-8">
      {/* Statistics */}
      <GovernanceStats stats={statsData?.governanceStats} loading={statsLoading} />

      {/* View Mode Tabs */}
      <div className="border-b border-slate-800">
        <div className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setViewMode('proposals')}
            className={`px-6 py-2 font-mono text-sm transition-all whitespace-nowrap flex-shrink-0 ${
              viewMode === 'proposals'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Proposals
          </button>
          <button
            onClick={() => setViewMode('guardians')}
            className={`px-6 py-2 font-mono text-sm transition-all whitespace-nowrap flex-shrink-0 ${
              viewMode === 'guardians'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Guardians
          </button>
          <button
            onClick={() => setViewMode('leaderboard')}
            className={`px-6 py-2 font-mono text-sm transition-all whitespace-nowrap flex-shrink-0 ${
              viewMode === 'leaderboard'
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            Leaderboard
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      {viewMode === 'proposals' && (
        <div className="space-y-2">
          <span className="text-sm font-mono text-slate-400">Filter:</span>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['all', 'Active', 'Pending', 'Executed', 'Defeated'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-colors whitespace-nowrap flex-shrink-0 ${
                  filterStatus === status
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !proposalsData && !guardiansData && (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      )}

      {/* Content Views */}
      {!isLoading && (
        <>
          {viewMode === 'proposals' && (
            <ProposalsList
              proposals={proposalsData?.proposals || []}
              filterStatus={filterStatus}
              loading={proposalsLoading}
            />
          )}

          {viewMode === 'guardians' && (
            <GuardiansList
              guardians={guardiansData?.guardians || []}
              loading={guardiansLoading}
            />
          )}

          {viewMode === 'leaderboard' && <GuardianLeaderboard />}
        </>
      )}

      {/* Loading indicator for data refresh */}
      {isLoading && (proposalsData || guardiansData) && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
        </div>
      )}
    </div>
  );
}

export function GovernanceDashboard() {
  return (
    <GovernanceProvider>
      <GovernanceDashboardContent />
    </GovernanceProvider>
  );
}