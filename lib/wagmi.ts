// lib/wagmi.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { baseSepolia } from 'wagmi/chains';
import { http } from 'wagmi';
import type { Config } from 'wagmi';

let configCache: Config | null = null;

export const initializeConfig = (): Config => {
  if (configCache) {
    return configCache;
  }

  const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;
  
  if (!projectId) {
    console.error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set');
  }

  configCache = getDefaultConfig({
    appName: 'Lokapal - From Many, as One',
    projectId: projectId || '',
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http(),
    },
    ssr: true,
    // Mobile-specific configuration
    appDescription: 'From Many, as One - Web3 Literary Project',
    appUrl: typeof window !== 'undefined' ? window.location.origin : 'https://lokapal.xyz',
    appIcon: typeof window !== 'undefined' ? `${window.location.origin}/favicon.ico` : 'https://lokapal.xyz/favicon.ico',
  });

  return configCache;
};