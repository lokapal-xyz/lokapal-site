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
  });

  return configCache;
};