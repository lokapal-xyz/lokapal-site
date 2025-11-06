'use client';

import { Guardian } from '@/lib/governance-types';
import { GuardianCard } from './GuardianCard';
import { Loader2 } from 'lucide-react';

interface GuardiansListProps {
  guardians: Guardian[];
  loading: boolean;
}

export function GuardiansList({ guardians, loading }: GuardiansListProps) {
  if (loading && guardians.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  if (guardians.length === 0) {
    return (
      <div className="p-8 border border-slate-700 bg-slate-900/30 rounded-lg text-center">
        <p className="text-slate-400 font-mono">No guardians found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between">
        <h3 className="text-lg font-mono text-slate-300">
          {guardians.length} {guardians.length === 1 ? 'Guardian' : 'Guardians'}
        </h3>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guardians.map((guardian) => (
          <GuardianCard key={guardian.id} guardian={guardian} />
        ))}
      </div>
    </div>
  );
}