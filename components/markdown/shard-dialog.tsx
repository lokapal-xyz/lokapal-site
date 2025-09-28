'use client';

import { useShardByIndex } from '@/hooks/useShardEvents';
import { Dictionary } from "@/lib/dictionaries";

interface ShardDialogProps {
  shardIndex: number;
  isOpen: boolean;
  onClose: () => void;
  dict: Dictionary;
}

export function ShardDialog({ shardIndex, isOpen, onClose, dict }: ShardDialogProps) {
  const { data, loading, error } = useShardByIndex(shardIndex.toString());

  if (!isOpen) return null;

  const shard = data?.shards?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {dict.shard.shard_title}{shardIndex + 1}{dict.shard.plexus_archive}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-2xl font-bold w-8 h-8 flex items-center justify-center"
            aria-label="Close dialog"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">{dict.shard.loading_shard_data}</div>
            </div>
          )}
          
          {error && (
            <div className="text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
              <p className="font-semibold">{dict.shard.error_loading_shard}</p>
              <p className="text-sm mt-1">{error.message}</p>
            </div>
          )}
          
          {shard && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {dict.shard.shard_tag}
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {shard.shardTag}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {dict.shard.echo_source}
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {shard.echoSource}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {dict.shard.earth_time}
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {shard.earthTime}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {dict.shard.lanka_time}
                  </label>
                  <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {shard.lankaTime}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {dict.shard.archivist_log}
                </label>
                <p className="text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800 p-4 rounded-lg leading-relaxed">
                  {shard.archivistLog}
                </p>
              </div>
              
              {/* Additional metadata */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <span className="font-semibold">{dict.shard.block_number}</span> {shard.blockNumber}
                  </div>
                  <div className="font-mono">
                    <span className="font-semibold">{dict.shard.transaction}</span> {shard.transactionHash.slice(0, 10)}...{shard.transactionHash.slice(-8)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {dict.shard.close}
          </button>
        </div>
      </div>
    </div>
  );
}