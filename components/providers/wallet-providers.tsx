// components/providers/wallet-providers.tsx
'use client';

import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { initializeConfig } from '@/lib/wagmi';
import { ReactNode, useState, useEffect } from 'react';
import type { Config } from 'wagmi';

const queryClient = new QueryClient();

export function WalletProviders({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    // Initialize config only on client after mount
    // This runs AFTER initial render, avoiding hydration mismatch
    const wagmiConfig = initializeConfig();
    setConfig(wagmiConfig);
  }, []); // Empty dependency array = runs once after mount

  // While config is loading (or on server), render without providers
  // This matches what the server rendered
  if (!config) {
    return <>{children}</>;
  }

  // After config loads, render with providers
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}