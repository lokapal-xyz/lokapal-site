// components/BookTokens/ContractAddress.tsx
'use client';

import { useState } from 'react';

interface ContractAddressProps {
  address: string;
  network?: string;
}

export default function ContractAddress({ address, network = 'Base' }: ContractAddressProps) {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Truncate address for mobile display
  const truncatedAddress = `${address.slice(0, 7)}...${address.slice(-5)}`;

  return (
    <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-900/50 border border-slate-700 rounded-lg p-3 my-2">
      {/* Address display */}
      <code className="font-mono text-sm text-cyan-400 break-all sm:break-normal">
        <span className="hidden sm:inline">{address}</span>
        <span className="inline sm:hidden">{truncatedAddress}</span>
      </code>
      
      {/* Copy button */}
      <div className="flex gap-2">
      <button
        onClick={copyAddress}
        className="px-3 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 rounded font-mono text-xs font-bold transition-all duration-300 whitespace-nowrap"
      >
        {copied ? '✓ COPIED!' : '📋 COPY'}
      </button>
      
      {/* Network badge */}
      {network && (
        <span className="flex px-3 py-1.5 bg-blue-500/20 border border-blue-500/40 text-blue-400 rounded font-mono text-xs font-bold">
          {network}
        </span>
      )}
      </div>
    </div>
  );
}