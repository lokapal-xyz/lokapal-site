'use client';

import { useState } from 'react';
import { X, ExternalLink, Copy, Check } from 'lucide-react';
import { Entry } from '@/lib/graphql/queries';
import { useVersionHistory } from '@/hooks/useDashboard';
import { HashVerifier } from './HashVerifier';
import { VersionTimeline } from './VersionTimeline';

interface EntryDetailModalProps {
  entry: Entry;
  isOpen: boolean;
  onClose: () => void;
  chainId?: number;
}

export function EntryDetailModal({ entry, isOpen, onClose, chainId = 84532 }: EntryDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'versions' | 'verify'>('details');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { versions } = useVersionHistory(entry.title);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getBaseScanUrl = (txHash: string) => {
    const baseUrls = {
      8453: 'https://basescan.org',
      84532: 'https://sepolia.basescan.org',
    };
    const baseUrl = baseUrls[chainId as keyof typeof baseUrls] || baseUrls[84532];
    return `${baseUrl}/tx/${txHash}`;
  };

  const getAddressUrl = (address: string) => {
    const baseUrls = {
      8453: 'https://basescan.org',
      84532: 'https://sepolia.basescan.org',
    };
    const baseUrl = baseUrls[chainId as keyof typeof baseUrls] || baseUrls[84532];
    return `${baseUrl}/address/${address}`;
  };

  const getPermawebUrl = (link: string): string => {
    if (!link) return '';
    
    // Handle IPFS links
    if (link.startsWith('ipfs://')) {
      return `https://ipfs.io/ipfs/${link.replace('ipfs://', '')}`;
    }
    
    // Handle Arweave links
    if (link.startsWith('ar://')) {
      return `https://arweave.net/${link.replace('ar://', '')}`;
    }
    
    // If it's already a full URL, return as is
    if (link.startsWith('http://') || link.startsWith('https://')) {
      return link;
    }
    
    // Default to IPFS gateway
    return `https://ipfs.io/ipfs/${link}`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const CopyButton = ({ text, field }: { text: string; field: string }) => (
    <button
      onClick={() => copyToClipboard(text, field)}
      className="p-1.5 hover:bg-slate-700/50 rounded transition-colors flex-shrink-0"
      title="Copy to clipboard"
    >
      {copiedField === field ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-slate-400" />
      )}
    </button>
  );

  const hasContentHash = entry.contentHash && 
    entry.contentHash !== '0x0000000000000000000000000000000000000000000000000000000000000000';

  const hasNFT = entry.nftAddress && 
    entry.nftAddress !== '0x0000000000000000000000000000000000000000';

  const hasPermawebLink = entry.permawebLink && entry.permawebLink.trim() !== '';
  const hasLicense = entry.license && entry.license.trim() !== '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800">
          <div>
            <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-2">
              {entry.title}
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-slate-400">
                Entry #{entry.entryIndex}
              </span>
              <span className="px-2 py-1 text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700 rounded">
                v{entry.versionIndex}
              </span>
              {entry.deprecated && (
                <span className="px-2 py-1 text-xs font-mono bg-red-500/20 text-red-400 border border-red-500/30 rounded">
                  DEPRECATED
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4 border-b border-slate-800">
          {[
            { id: 'details', label: 'Details' },
            { id: 'versions', label: 'Version History' },
            { id: 'verify', label: 'Verify Hash' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 font-mono text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'details' && (
            <div className="space-y-6">
              {/* Ledger Framework */}
              <div>
                <h3 className="text-lg font-mono font-bold text-cyan-400 mb-4">
                  Ledger Framework
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-xs font-mono text-slate-400 uppercase mb-2">Source</p>
                    <p className="text-sm text-slate-200">{entry.source}</p>
                  </div>

                  {entry.timestamp1 && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-xs font-mono text-slate-400 uppercase mb-2">Earth Time</p>
                      <p className="text-sm text-slate-200">{entry.timestamp1}</p>
                    </div>
                  )}

                  {entry.timestamp2 && (
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <p className="text-xs font-mono text-slate-400 uppercase mb-2">Lanka Time</p>
                      <p className="text-sm text-slate-200">{entry.timestamp2}</p>
                    </div>
                  )}

                  {entry.curatorNote && (
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-cyan-500/20">
                      <p className="text-xs font-mono text-slate-400 uppercase mb-2">Curator Note</p>
                      <p className="text-sm text-slate-200 italic">{entry.curatorNote}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Token Framework */}
              {hasNFT && (
                <div>
                  <h3 className="text-lg font-mono font-bold text-cyan-400 mb-4">
                    Token Framework
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-mono text-slate-400 uppercase">NFT Reference</p>
                        <CopyButton text={entry.nftAddress} field="nftContract" />
                      </div>
                      <a
                        href={getAddressUrl(entry.nftAddress)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono break-all transition-colors"
                      >
                        {entry.nftAddress}
                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      </a>
                      <p className="text-sm text-slate-300 font-mono mt-2">
                        Token ID: {entry.nftId}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Permanence Framework */}
              {(hasContentHash || hasPermawebLink || hasLicense) && (
                <div>
                  <h3 className="text-lg font-mono font-bold text-cyan-400 mb-4">
                    Permanence Framework
                  </h3>
                  <div className="space-y-4">
                    {hasContentHash && (
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-mono text-slate-400 uppercase">Content Hash (HNP-1)</p>
                          <CopyButton text={entry.contentHash} field="hash" />
                        </div>
                        <p className="text-sm text-cyan-400 font-mono break-all">{entry.contentHash}</p>
                      </div>
                    )}

                    {hasPermawebLink && (
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-mono text-slate-400 uppercase">Permaweb Link</p>
                          <CopyButton text={entry.permawebLink} field="permawebLink" />
                        </div>
                        <a
                          href={getPermawebUrl(entry.permawebLink)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono break-all transition-colors"
                        >
                          {entry.permawebLink}
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        </a>
                      </div>
                    )}

                    {hasLicense && (
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <p className="text-xs font-mono text-slate-400 uppercase mb-2">License</p>
                        <p className="text-sm text-slate-200">{entry.license}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Transaction Details */}
              <div>
                <h3 className="text-lg font-mono font-bold text-cyan-400 mb-4">
                  Transaction Details
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <p className="text-xs font-mono text-slate-400 uppercase mb-2">Archived On-Chain</p>
                    <p className="text-sm text-slate-200">{formatTimestamp(entry.blockTimestamp)}</p>
                  </div>

                  <div className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-mono text-slate-400 uppercase">Transaction Hash</p>
                      <CopyButton text={entry.transactionHash} field="tx" />
                    </div>
                    <a
                      href={getBaseScanUrl(entry.transactionHash)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-mono break-all transition-colors"
                    >
                      {entry.transactionHash}
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'versions' && (
            <div>
              <VersionTimeline versions={versions} />
            </div>
          )}

          {activeTab === 'verify' && (
            <div>
              <h3 className="text-lg font-mono font-bold text-cyan-400 mb-4">
                Verify Content Authenticity
              </h3>
              <p className="text-sm text-slate-400 mb-6">
                Upload a file to verify it matches the cryptographic hash stored in the ledger using HNP-1 protocol.
              </p>
              <HashVerifier expectedHash={entry.contentHash} title={entry.title} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}