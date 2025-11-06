'use client';

import { Guardian } from '@/lib/governance-types';
import {
  formatBhaktiBalance,
  getGuardianDirection,
} from '@/lib/governance-utils';
import {
  Shield,
  Coins,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import Image from 'next/image';

interface GuardianCardProps {
  guardian: Guardian;
}

// Guardian image mapping
const GUARDIAN_IMAGES: Record<string, string> = {
  'indra': '/images/guardians/indra2.jpg',
  'varuna': '/images/guardians/varuna2.jpg',
  'yama': '/images/guardians/yama2.jpg',
  'kubera': '/images/guardians/kubera2.jpg',
  'vayu': '/images/guardians/vayu2.jpg',
  'ishana': '/images/guardians/ishana2.jpg',
  'agni': '/images/guardians/agni2.jpg',
  'nirrti': '/images/guardians/nirrti2.jpg',
};

export function GuardianCard({ guardian }: GuardianCardProps) {
  const bhaktiNum = parseFloat(guardian.bhaktiBalance) / 1e18;
  const direction = getGuardianDirection(guardian.address);
  
  // Calculate net BHAKTI movement (subtract initial 12.5M allocation from Trimurti)
  const INITIAL_ALLOCATION = 12_500_000;
  const bhaktiReceived = parseFloat(guardian.bhaktiReceived) / 1e18;
  // const bhaktiSent = parseFloat(guardian.bhaktiSent) / 1e18;
  const netReceived = Math.max(0, bhaktiReceived - INITIAL_ALLOCATION);
  
  // Get guardian image
  const guardianImage = GUARDIAN_IMAGES[guardian.name.toLowerCase()];

  return (
    <div className="border border-slate-700 bg-slate-900/30 rounded-lg hover:border-slate-600 transition-all overflow-hidden group">
      {/* Header with Image Background */}
      <div className="relative h-32 overflow-hidden">
        {/* Guardian Image (if available) */}
        {guardianImage && (
          <div className="absolute inset-0">
            <Image
              src={guardianImage}
              alt={guardian.name}
              className="w-full h-full object-cover opacity-65 sm:opacity-50 group-hover:opacity-65 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900" />
          </div>
        )}
        
        {/* Fallback gradient if no image */}
        {!guardianImage && (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
        )}
        
        {/* Header Content */}
        <div className="relative h-full flex items-end p-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold text-cyan-400 font-mono">
                {guardian.name}
              </h3>
            </div>
            {direction && (
              <p className="text-sm text-slate-300 font-mono">{direction}</p>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        {/* Address
        <div className="flex items-center gap-2 mb-4 p-2 bg-slate-800/50 rounded">
          <code className="text-xs font-mono text-slate-400 flex-1 overflow-hidden text-ellipsis">
            {guardian.address}
          </code>
          <a
            href={`https://sepolia.basescan.org/address/${guardian.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300"
          >
            <ExternalLink className="w-3 h-3" />
          </a>
        </div> */}

        {/* BHAKTI Balance - Citizen Loyalty */}
        <div className="mb-6 p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-mono text-slate-400">Citizen Loyalty</span>
            </div>
          </div>
          <p className="text-3xl font-bold font-mono text-purple-400">
            {formatBhaktiBalance(guardian.bhaktiBalance)} BHAKTI
          </p>
          <p className="text-xs font-mono text-slate-500 mt-1">
            {bhaktiNum.toLocaleString()} tokens
          </p>
        </div>

        {/* Voting Breakdown */}
        <div className="space-y-2 mb-4">
          <p className="text-xs font-mono text-slate-500 mb-3">Voting Record</p>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-slate-400">Voted For:</span>
            <span className="font-mono text-green-400">{guardian.proposalsVotedFor}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-slate-400">Voted Against:</span>
            <span className="font-mono text-red-400">{guardian.proposalsVotedAgainst}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="font-mono text-slate-400">Abstained:</span>
            <span className="font-mono text-slate-500">{guardian.proposalsAbstained}</span>
          </div>
        </div>

        {/* BHAKTI Movement - Guardian Transfers Only */}
        <div className="pt-4 border-t border-slate-800">
          <p className="text-xs font-mono text-slate-500 mb-2">
            BHAKTI Movement (Guardian Transfers)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <div>
                <p className="text-xs font-mono text-slate-400">Received</p>
                <p className="text-sm font-mono text-green-400">
                  {formatBhaktiBalance((netReceived * 1e18).toString())}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2 bg-slate-800/30 rounded">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <div>
                <p className="text-xs font-mono text-slate-400">Sent</p>
                <p className="text-sm font-mono text-red-400">
                  {formatBhaktiBalance(guardian.bhaktiSent)}
                </p>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-2 italic">
            * Excludes 12.5M initial allocation from Trimurti
          </p>
        </div>

        {/* RAKSHA Token ID */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">RAKSHA Token ID:</span>
            <span className="text-cyan-400">#{guardian.rakshaTokenId}</span>
          </div>
        </div>
      </div>
    </div>
  );
}