// components/BookTokens/MobileWalletBanner.tsx
'use client';

import { useState, useEffect } from 'react';

export default function MobileWalletBanner() {
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const mobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(mobile);
    
    // Check if user previously dismissed the banner
    if (mobile) {
      const wasDismissed = localStorage.getItem('mobile-banner-dismissed');
      setDismissed(wasDismissed === 'true');
    }
  }, []);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('mobile-banner-dismissed', 'true');
  };

  if (!isMobile || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-cyan-500/10 via-magenta-500/10 to-orange-500/10 border border-cyan-500/30 rounded-xl p-4 mb-8 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="Dismiss"
      >
        ✕
      </button>
      
      <div className="pr-6">
        <h3 className="text-cyan-400 font-mono font-bold mb-2 flex items-center gap-2">
          📱 Using Mobile?
        </h3>
        
        <p className="text-slate-300 text-sm font-mono mb-3">
          For the best minting experience, open this page in your wallet&apos;s built-in browser:
        </p>
        
        <ol className="text-slate-400 text-sm font-mono space-y-1 mb-4 ml-4">
          <li>Copy this page&apos;s URL</li>
          <li>Open your wallet app (MetaMask, Coinbase, etc.)</li>
          <li>Navigate to the Browser tab</li>
          <li>Paste the URL and connect</li>
        </ol>

        <button
          onClick={copyUrl}
          className="w-full px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-400 rounded-lg font-mono font-bold transition-all duration-300"
        >
          {copied ? '✓ URL COPIED!' : '📋 COPY PAGE URL'}
        </button>

        <p className="text-slate-500 text-xs font-mono mt-3 text-center">
          Desktop users can connect normally
        </p>
      </div>
    </div>
  );
}