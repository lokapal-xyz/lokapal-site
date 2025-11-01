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

  configCache = getDefaultConfig({
    appName: 'Lokapal - From Many, as One',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    chains: [baseSepolia],
    transports: {
      [baseSepolia.id]: http(),
    },
    ssr: true,
  });

  return configCache;
};