// components/BookTokens/ConnectButtonWrapper.tsx
'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useEffect, useState } from 'react';

export default function ConnectButtonWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="px-4 py-2 bg-blue-500 rounded text-white">
        Connect Wallet
      </button>
    );
  }

  return <ConnectButton />;
}