// components/providers/wallet-providers.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { initializeConfig } from '@/lib/wagmi';

const queryClient = new QueryClient();

export function WalletProviders({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ReturnType<typeof initializeConfig> | null>(null);

  useEffect(() => {
    setConfig(initializeConfig());
  }, []);

  if (!config) {
    return <>{children}</>;
  }

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#00ffc8',
            accentColorForeground: '#0f172a',
            borderRadius: 'large',
            fontStack: 'system',
          })}
          modalSize="compact"
          showRecentTransactions={true}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}