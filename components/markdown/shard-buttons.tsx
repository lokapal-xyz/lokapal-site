'use client';

import { useState } from 'react';
import { ShardDialog } from './shard-dialog';
import { useDictionary } from "@/components/contexts/dictionary-provider";
//import { useChapterByTitle } from '@/hooks/useShardEvents';
import { FileText } from 'lucide-react';

interface ShardButtonsProps {
  shardNumber: number;   // Narrative shard number (1, 2, 3...)
  shardTitle: string;    // "Introduction", "Chapter One", etc.
  chainId?: number;
}

export function ShardButtons({ shardNumber, shardTitle, chainId = 8453 }: ShardButtonsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  //const { data } = useChapterByTitle(shardTitle);
  const dict = useDictionary();
  //const shard = data?.entries?.[0];

  const handleRevealLogs = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="my-6">
        <button
          onClick={handleRevealLogs}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-all duration-300 font-mono text-sm border border-cyan-500/30 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10"
          aria-label={`${dict.shard.reveal_logs} ${shardNumber}`}
        >
          <FileText className="w-4 h-4" />
          {dict.shard.reveal_logs}
        </button>
      </div>
      
      <ShardDialog 
        shardNumber={shardNumber}
        shardTitle={shardTitle}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        dict={dict}
        chainId={chainId}
      />
    </>
  );
}