'use client';

import { useGuardianLeaderboard } from '@/hooks/use-governance';
import { formatBhaktiBalance, getGuardianDirection } from '@/lib/governance-utils';
import { Trophy, Medal, Award, Shield, Loader2, ExternalLink } from 'lucide-react';
import Image from 'next/image';

// Guardian image mapping
const GUARDIAN_IMAGES: Record<string, string> = {
  'indra': '/images/guardians/indra.jpg',
  'varuna': '/images/guardians/varuna.jpg',
  'yama': '/images/guardians/yama.jpg',
  'kubera': '/images/guardians/kubera.jpg',
  'vayu': '/images/guardians/vayu.jpg',
  'ishana': '/images/guardians/ishana.jpg',
  'agni': '/images/guardians/agni.jpg',
  'nirrti': '/images/guardians/nirrti.jpg',
};

export function GuardianLeaderboard() {
  const { data, loading, error } = useGuardianLeaderboard();

  if (loading) {
    return (
      <div className="border border-slate-700 bg-slate-900/30 rounded-lg p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        </div>
      </div>
    );
  }

  if (error || !data?.guardians) {
    return (
      <div className="border border-red-500/30 bg-red-500/10 rounded-lg p-6">
        <p className="text-red-400 font-mono text-sm">Failed to load leaderboard</p>
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 2:
        return <Award className="w-5 h-5 text-orange-400" />;
      default:
        return <Shield className="w-5 h-5 text-slate-500" />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-500/10 border-yellow-500/30';
      case 1:
        return 'bg-slate-300/10 border-slate-300/30';
      case 2:
        return 'bg-orange-500/10 border-orange-500/30';
      default:
        return 'bg-slate-800/50 border-slate-700';
    }
  };

  // Total BHAKTI supply is 100M (100,000,000 tokens)
  // const TOTAL_BHAKTI_SUPPLY = 100_000_000;

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-cyan-400 font-mono">
          Guardian Leaderboard
        </h2>
        <p className="text-sm font-mono text-slate-500">Ranked by Citizen Loyalty</p>
      </div> */}

      <div className="space-y-3">
        {data.guardians.map((guardian, index) => {
          // const balance = parseFloat(guardian.bhaktiBalance) / 1e18;
          // Calculate percentage of total 100M supply
          // const percentage = (balance / TOTAL_BHAKTI_SUPPLY) * 100;
          const direction = getGuardianDirection(guardian.address);
          const guardianImage = GUARDIAN_IMAGES[guardian.name.toLowerCase()];

          return (
            <div
              key={guardian.address}
              className={`border rounded-lg overflow-hidden transition-all hover:scale-[1.02] ${getRankColor(
                index
              )}`}
            >
              <div className="flex items-center gap-4 p-4">
                {/* Rank Icon with Optional Image */}
                <div className="relative flex-shrink-0">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-900/50 border-2 border-slate-700 overflow-hidden">
                    {guardianImage ? (
                      <Image
                        src={guardianImage}
                        alt={guardian.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      getRankIcon(index)
                    )}
                  </div>
                  {/* Rank badge overlay for images */}
                  {guardianImage && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                      {getRankIcon(index)}
                    </div>
                  )}
                </div>

                {/* Guardian Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-cyan-400 font-mono">
                      {guardian.name}
                    </h3>
                    {direction && (
                      <span className="text-xs font-mono text-slate-500">
                        ({direction})
                      </span>
                    )}
                    {index === 0 && (
                      <span className="invisible sm:visible px-2 py-1 text-xs font-mono bg-yellow-500/20 text-yellow-400 rounded">
                        Top Guardian
                      </span>
                    )}
                  </div>

                  {/* BHAKTI Progress Bar */}
                  <div className="space-y-1 mb-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-mono text-purple-400">
                        {formatBhaktiBalance(guardian.bhaktiBalance)} BHAKTI
                      </span>
                      {/*<span className="font-mono text-slate-500">
                        {percentage.toFixed(2)}% of supply
                      </span>*/}
                      <span className="hidden sm:flex items-center gap-2 mb-4 p-2 bg-slate-800/50 rounded">
                        <code className="text-xs font-mono text-slate-400 flex-1 overflow-hidden text-ellipsis">
                          {guardian.address.slice(0, 7)}...${guardian.address.slice(-5)}
                        </code>
                        <a
                          href={`https://sepolia.basescan.org/address/${guardian.address}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </span>
                    </div>
                    {/* <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500"
                        style={{ width: `${Math.min(percentage * 8, 100)}%` }}
                      />
                    </div>*/}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <div className="flex items-center gap-1">
                      <span>{guardian.votesCount}</span>
                      <span>votes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{guardian.proposalsCreated}</span>
                      <span>proposals</span>
                    </div>
                  </div>
                </div>

                {/* Rank Number */}
                <div className="text-3xl font-bold font-mono text-slate-700">
                  #{index + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="pt-4 border-t border-slate-800">
        <p className="text-xs font-mono text-slate-500 mb-2">About Citizen Loyalty:</p>
        <p className="text-xs text-slate-400">
          BHAKTI tokens represent the influence and loyalty of citizens toward each
          guardian. Guardians can transfer BHAKTI to reflect shifting alliances and
          support within the FMAO community.
        </p>
      </div>
    </div>
  );
}