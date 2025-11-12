// components/BookTokens/MintButton.tsx
'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useMintBook } from '@/lib/hooks/useBookTokens';
import { BOOK_PRICE, BOOKS_DATA } from '@/constants/bookTokens';

interface MintButtonProps {
  bookId: number;
}

export default function MintButton({ bookId }: MintButtonProps) {
  const [amount, setAmount] = useState<number>(1);
  const { address } = useAccount();
  const { mintBook, isPending, isConfirming, isSuccess, isError, error } = useMintBook();

  const book = BOOKS_DATA.find(b => b.id === bookId);
  const bookColor = book?.color || '#00ffc8';

  if (!address) {
    return (
      <div className="w-full">
        <ConnectButton.Custom>
          {({ openConnectModal }) => (
            <button
              onClick={openConnectModal}
              className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white rounded-lg font-mono transition-all duration-300 hover:border-slate-500"
            >
              CONNECT WALLET TO MINT
            </button>
          )}
        </ConnectButton.Custom>
      </div>
    );
  }

  const totalCost = (Number(BOOK_PRICE) * amount).toFixed(3);

  return (
    <div className="flex flex-col gap-3">
      {/* Amount Input */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-slate-400 font-mono whitespace-nowrap">
          Amount:
        </label>
        {/* Custom increment/decrement buttons for mobile-friendly UX */}
        <div className="flex-1 flex items-center gap-2">
          <button
            onClick={() => setAmount(Math.max(1, amount - 1))}
            disabled={amount <= 1 || isPending || isConfirming}
            className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-lg"
          >
            −
          </button>
          
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={amount}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9]/g, '');
              const num = val === '' ? 1 : parseInt(val, 10);
              setAmount(Math.max(1, Math.min(10, num)));
            }}
            className="w-16 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-center focus:outline-none focus:border-slate-500 transition-colors"
            disabled={isPending || isConfirming}
          />
          
          <button
            onClick={() => setAmount(Math.min(10, amount + 1))}
            disabled={amount >= 10 || isPending || isConfirming}
            className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold text-lg"
          >
            +
          </button>
        </div>
      </div>

      {/* Mint Button */}
      <button
        onClick={() => mintBook(bookId, amount)}
        disabled={isPending || isConfirming}
        className="w-full px-4 py-3 rounded-lg font-mono font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
        style={{
          backgroundColor: isPending || isConfirming ? '#64748b' : bookColor,
          color: '#0f172a',
          boxShadow: isPending || isConfirming ? 'none' : `0 0 20px ${bookColor}40`,
        }}
      >
        {isPending && '⏳ PREPARING...'}
        {isConfirming && '⌛ CONFIRMING...'}
        {!isPending && !isConfirming && `MINT FOR ${totalCost} ETH`}
      </button>

      {/* Success Message */}
      {isSuccess && (
        <div 
          className="px-3 py-2 rounded-lg border text-sm font-mono text-center"
          style={{
            backgroundColor: `${bookColor}10`,
            borderColor: `${bookColor}40`,
            color: bookColor
          }}
        >
          ✓ SUCCESSFULLY MINTED!
        </div>
      )}
      
      {/* Error Message */}
      {isError && (
        <div className="px-3 py-2 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 text-sm font-mono">
          ✗ {error?.message?.slice(0, 80) || 'Transaction failed'}
        </div>
      )}
    </div>
  );
}