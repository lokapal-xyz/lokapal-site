'use client';

import { useState } from 'react';
import { useChapterByIndex } from '@/hooks/useShardEvents';
import { ShardDialog } from './shard-dialog';
import { useDictionary } from "@/components/contexts/dictionary-provider";

interface ShardButtonsProps {
  shardIndex: number;
  chainId?: number;
}

export function ShardButtons({ shardIndex, chainId = 84532 }: ShardButtonsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data } = useChapterByIndex(shardIndex.toString());
  const dict = useDictionary();
  const shard = data?.entries?.[0];

  // BaseScan URLs for different networks
  const getBaseScanUrl = (txHash: string, chainId: number) => {
    const baseUrls = {
      8453: 'https://basescan.org',
      84532: 'https://sepolia.basescan.org',
    };
    
    const baseUrl = baseUrls[chainId as keyof typeof baseUrls] || baseUrls[84532];
    return `${baseUrl}/tx/${txHash}`;
  };

  const handleRevealLogs = () => {
    setIsDialogOpen(true);
  };

  const handleScanShard = () => {
    if (shard?.transactionHash) {
      const url = getBaseScanUrl(shard.transactionHash, chainId);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div className="flex gap-3 my-6 justify-center sm:justify-start">
        <button
          onClick={handleRevealLogs}
          className="flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary/70 text-primary-foreground rounded-lg transition-colors font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          aria-label={`${dict.shard.reveal_logs} ${shardIndex}`}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
          {dict.shard.reveal_logs}
        </button>
        
        <button
          onClick={handleScanShard}
          disabled={!shard?.transactionHash}
          className="flex items-center gap-2 px-4 py-2 bg-primary/90 hover:bg-primary/70 disabled:bg-gray-400 disabled:cursor-not-allowed text-primary-foreground rounded-lg transition-colors font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          aria-label={`${dict.shard.scan_shard} ${shardIndex}`}
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
          {dict.shard.scan_shard}
        </button>
      </div>
      
      <ShardDialog 
        shardIndex={shardIndex}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        dict={dict}
      />
    </>
  );
}