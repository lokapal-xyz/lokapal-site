'use client';

import { GovernanceStats as StatsType } from '@/lib/governance-types';
import { Activity, Users, Vote, CheckCircle, XCircle } from 'lucide-react';

interface GovernanceStatsProps {
  stats?: StatsType;
  loading?: boolean;
}

export function GovernanceStats({ stats, loading }: GovernanceStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="p-6 border border-slate-700 bg-slate-900/30 rounded-lg animate-pulse"
          >
            <div className="h-12 bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statCards = [
    {
      label: 'Total Proposals',
      value: stats.totalProposals,
      icon: Activity,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
    },
    {
      label: 'Active Proposals',
      value: stats.activeProposals,
      icon: Vote,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      label: 'Executed Proposals',
      value: stats.executedProposals,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
    {
      label: 'Total Votes Cast',
      value: stats.totalVotes,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-cyan-400 font-mono">
        Governance Statistics
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="p-6 border border-slate-700 bg-slate-900/30 rounded-lg hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-mono text-slate-400">{stat.label}</p>
                <p className={`text-3xl font-bold font-mono ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats Row */}
      <div className="hidden sm:grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-4 border border-slate-700 bg-slate-900/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-slate-400 mb-1">Defeated</p>
              <p className="text-xl font-bold font-mono text-red-400">
                {stats.defeatedProposals}
              </p>
            </div>
            <XCircle className="w-8 h-8 text-red-400/30" />
          </div>
        </div>

        <div className="p-4 border border-slate-700 bg-slate-900/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-slate-400 mb-1">Total Guardians</p>
              <p className="text-xl font-bold font-mono text-cyan-400">
                {stats.totalGuardians}
              </p>
            </div>
            <Users className="w-8 h-8 text-cyan-400/30" />
          </div>
        </div>

        <div className="p-4 border border-slate-700 bg-slate-900/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-mono text-slate-400 mb-1">BHAKTI Transfers</p>
              <p className="text-xl font-bold font-mono text-purple-400">
                {stats.totalBhaktiTransfers}
              </p>
            </div>
            <Activity className="w-8 h-8 text-purple-400/30" />
          </div>
        </div>
      </div>
    </div>
  );
}