'use client';

import { useState } from 'react';
import { GitBranch, CheckCircle, XCircle, Copy, Check } from 'lucide-react';
import { DashboardEntry } from '@/lib/graphql/dashboardQueries';

interface VersionTimelineProps {
  versions: DashboardEntry[];
}

export function VersionTimeline({ versions }: VersionTimelineProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (versions.length === 0) {
    return (
      <div className="p-6 text-center text-slate-400 font-mono text-sm">
        No version history available
      </div>
    );
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => copyToClipboard(text, field)}
      className="p-1.5 hover:bg-slate-700/50 rounded transition-colors"
      title="Copy to clipboard"
    >
      {copiedField === field ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );

  const formatTimestamp = (timestamp: string, isMobile: boolean = false) => {
    const date = new Date(parseInt(timestamp) * 1000);
    if (isMobile) {
      // Mobile: Return object with separate parts
      const month = date.toLocaleString('en-US', { month: 'short' });
      const day = date.getDate();
      const year = date.getFullYear();
      const time = date.toLocaleString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
      });
      return { month, day, year, time };
    }
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-slate-700 to-transparent" />

      {/* Version entries */}
      <div className="space-y-6">
        {versions.map((version, index) => {
          const isLatest = index === versions.length - 1;
          const isActive = !version.deprecated;
          const mobileDate = formatTimestamp(version.blockTimestamp, true) as { month: string; day: number; year: number; time: string };
          const desktopDate = formatTimestamp(version.blockTimestamp, false) as string;

          return (
            <div key={version.id} className="relative pl-12">
              {/* Timeline dot */}
              <div
                className={`absolute left-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-green-500/20 border-green-500 shadow-lg shadow-green-500/50'
                    : 'bg-red-500/20 border-red-500'
                }`}
              >
                {isActive ? (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
              </div>

              {/* Version card */}
              <div
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  isActive
                    ? 'bg-cyan-500/5 border-cyan-500/30 hover:border-cyan-500/50'
                    : 'bg-slate-900/30 border-slate-700/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex-shrink-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`font-mono font-bold text-lg ${
                          isActive ? 'text-cyan-400' : 'text-slate-500'
                        }`}
                      >
                        v{version.versionIndex}
                      </span>
                      {isLatest && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded whitespace-nowrap">
                          LATEST
                        </span>
                      )}
                      {isActive && !isLatest && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-green-500/20 text-green-400 border border-green-500/30 rounded whitespace-nowrap">
                          ACTIVE
                        </span>
                      )}
                      {version.deprecated && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-red-500/20 text-red-400 border border-red-500/30 rounded whitespace-nowrap">
                          DEPRECATED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 font-mono">
                      Entry #{version.entryIndex}
                    </p>
                  </div>
                  
                  {/* Desktop date - single line */}
                  <div className="text-right hidden sm:block flex-shrink-0">
                    <p className="text-xs text-slate-500 font-mono whitespace-nowrap">
                      {desktopDate}
                    </p>
                  </div>

                  {/* Mobile date - multi-line */}
                  <div className="text-right sm:hidden flex-shrink-0">
                    <p className="text-xs text-slate-500 font-mono whitespace-nowrap">
                      {mobileDate.month} {mobileDate.day}
                    </p>
                    <p className="text-xs text-slate-500 font-mono whitespace-nowrap">
                      {mobileDate.year}
                    </p>
                    <p className="text-xs text-slate-500 font-mono whitespace-nowrap">
                      {mobileDate.time}
                    </p>
                  </div>
                </div>

                {version.transactionHash && (
                  <div className="mt-2 pt-2 border-t border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-slate-500 font-mono">TRANSACTION HASH</p>
                      <CopyButton text={version.transactionHash} field={`tx-${version.id}`} />
                    </div>
                    <p className="text-xs text-slate-400 font-mono break-all">
                      {version.transactionHash}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-slate-900/50 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <GitBranch className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-mono text-slate-400 uppercase">Version Timeline</span>
        </div>
        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-3 h-3 text-green-400" />
            <span>Active Version</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-3 h-3 text-red-400" />
            <span>Deprecated</span>
          </div>
        </div>
      </div>
    </div>
  );
}