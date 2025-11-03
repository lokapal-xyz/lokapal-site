'use client';

import { useChapterByTitle } from '@/hooks/useShardEvents';
import { Dictionary } from "@/lib/dictionaries";
import { X, Loader2 } from 'lucide-react';

interface ShardDialogProps {
  shardNumber: number;   // Narrative shard number
  shardTitle: string;    // Chapter title for querying
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
  chainId?: number;
}

export function ShardDialog({ shardNumber, shardTitle, isOpen, onClose, dict }: ShardDialogProps) {
  const { data, loading, error } = useChapterByTitle(shardTitle);

  if (!isOpen) return null;

  const shard = data?.entries?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-slate-900 border border-cyan-500/30 rounded-lg shadow-2xl max-w-3xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 py-1 border-b border-slate-800">
          <h2 className="text-2xl font-mono font-bold text-cyan-400">
            {dict.shard.shard_title}{shardNumber}{dict.shard.plexus_archive}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 py-1 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            </div>
          )}
          
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="font-mono font-bold text-red-400">{dict.shard.error_loading_shard}</p>
              <p className="text-sm text-red-300 mt-2 font-mono">{error.message}</p>
            </div>
          )}
          
          {shard && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs font-mono text-slate-400 uppercase mb-2">
                    {dict.shard.shard_tag}
                  </p>
                  <p className="text-sm text-slate-200">
                    {shard.title}
                  </p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs font-mono text-slate-400 uppercase mb-2">
                    {dict.shard.echo_source}
                  </p>
                  <p className="text-sm text-slate-200">
                    {shard.source}
                  </p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs font-mono text-slate-400 uppercase mb-2">
                    {dict.shard.earth_time}
                  </p>
                  <p className="text-sm text-slate-200">
                    {shard.timestamp1}
                  </p>
                </div>
                
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-xs font-mono text-slate-400 uppercase mb-2">
                    {dict.shard.lanka_time}
                  </p>
                  <p className="text-sm text-slate-200">
                    {shard.timestamp2}
                  </p>
                </div>
              </div>
              
              <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                <p className="text-xs font-mono text-slate-400 uppercase mb-2">
                  {dict.shard.archivist_log}
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {shard.curatorNote}
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors font-mono text-sm"
          >
            {dict.shard.close}
          </button>
        </div>
      </div>
    </div>
  );
}