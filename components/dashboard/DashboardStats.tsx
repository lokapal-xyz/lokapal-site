'use client';

import { useDashboardStats } from '@/hooks/useDashboard';
import { FileText, Archive } from 'lucide-react';

export function DashboardStats() {
  const { stats, loading } = useDashboardStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="border border-slate-700 rounded-lg p-4 animate-pulse">
            <div className="h-8 bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      icon: FileText,
      label: 'TOTAL ENTRIES',
      value: stats.totalEntries,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
    },
    {
      icon: Archive,
      label: 'ACTIVE ENTRIES',
      value: stats.activeEntries,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`border ${stat.borderColor} rounded-lg p-4 ${stat.bgColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded ${stat.bgColor} border ${stat.borderColor}`}>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </div>
            <p className="text-xs font-mono text-slate-400 uppercase tracking-wide">
              {stat.label}:
            </p>
            <p className={`text-2xl font-mono font-bold ${stat.color} ml-auto`}>
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}