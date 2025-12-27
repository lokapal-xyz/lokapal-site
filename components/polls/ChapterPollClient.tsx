"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';
import { Lock, CheckCircle, BarChart3, Users } from 'lucide-react';
import { useAccount, useReadContract } from 'wagmi';
import { useConnectModal, useAccountModal } from '@rainbow-me/rainbowkit'; // Import RainbowKit modal hook
import { useDictionary } from '@/components/contexts/dictionary-provider';
import { useParams } from 'next/navigation';

// Contract config (same as your existing setup)
const BOOK_TOKEN_CONTRACT = '0x4FEb9Fbc359400d477761cD67d80cF0ce43dd84F';
const BOOK_TOKEN_ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [
      { name: 'account', type: 'address' },
      { name: 'id', type: 'uint256' }
    ],
    outputs: [{ name: '', type: 'uint256' }]
  }
] as const;

interface PollOption {
  id: string;
  text: {
    en: string;
    es: string;
  };
}

interface Poll {
  id: string;
  bookId: string;
  chapterId: string;
  requiresBookToken: boolean;
  pollType: 'conflict' | 'philosophical' | 'guardian-affinity' | 'worldbuilding';
  question: {
    en: string;
    es: string;
  };
  options: PollOption[];
}

interface PollResult {
  optionId: string;
  count: number;
  percentage: number;
}

interface ChapterPollProps {
  bookId: string;
  chapterId: string;
  apiBaseUrl?: string;
}

export default function ChapterPollClient({
  bookId,
  chapterId,
  apiBaseUrl = '/api'
}: ChapterPollProps) {
  // Get language from URL params (your routing structure: /[lang]/fmao/...)
  const params = useParams();
  const lang = (params?.lang as 'en' | 'es') || 'en';
  
  // Get dictionary translations
  const dict = useDictionary();
  
  // Wallet hooks
  const { address, isConnecting: isWalletConnecting } = useAccount();
  const { openConnectModal } = useConnectModal(); // Initialize the RainbowKit modal
  const { openAccountModal } = useAccountModal(); // Hook for the Account/Disconnect modal

  // Token balance check
  const getBookIdNumber = (bookId: string) => {
    return parseInt(bookId.replace('book-', ''));
  };
  
  const { data: balance, } = useReadContract({
    address: BOOK_TOKEN_CONTRACT as `0x${string}`,
    abi: BOOK_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(getBookIdNumber(bookId))] : undefined,
    query: {
      enabled: !!address,
    }
  });
  
  const isTokenOwned = balance ? Number(balance) > 0 : false;
  
  // Poll state
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<string | null>(null);
  const [results, setResults] = useState<PollResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Translations (get from dictionary)
  // Memoize translations to prevent re-triggering useCallback dependencies
  const t = useMemo(() => ({
    poll_header: dict?.polls?.poll_header || "READER SIGNAL DETECTED",
    poll_connect_wallet: dict?.polls?.poll_connect_wallet || "CONNECT WALLET",
    poll_switch_wallet: dict?.polls?.poll_switch_wallet || "Switch or Disconnect Wallet",
    poll_vote_btn: dict?.polls?.poll_vote_btn || "SUBMIT VOTE",
    poll_requires_token: dict?.polls?.poll_requires_token || "Book Token required to vote",
    poll_voted: dict?.polls?.poll_voted || "SIGNAL TRANSMITTED",
    poll_your_choice: dict?.polls?.poll_your_choice || "Your choice:",
    poll_results: dict?.polls?.poll_results || "AGGREGATE SIGNALS:",
    poll_total: dict?.polls?.poll_total || "Total votes:",
    poll_loading: dict?.polls?.poll_loading || "LOADING POLL......",
    poll_submitting: dict?.polls?.poll_submitting || "TRANSMITTING......",
    poll_error: dict?.polls?.poll_error || "Failed to load poll",
    poll_vote_error: dict?.polls?.poll_vote_error || "Failed to submit vote",
    poll_retry: dict?.polls?.poll_retry || "RETRY",
  }), [dict]);

// 2. Add a helper function to handle the button click
  const handleButtonClick = () => {
    if (!address) {
      // If no wallet is connected, open the RainbowKit selection modal
      if (openConnectModal) {
        openConnectModal();
      }
      return;
    }
    submitVote();
  };

  const fetchPoll = useCallback(async () =>{
    try {
      setLoading(true);
      setError(null);

      const url = address
        ? `${apiBaseUrl}/books/${bookId}/chapters/${chapterId}/poll?wallet=${address}`
        : `${apiBaseUrl}/books/${bookId}/chapters/${chapterId}/poll`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.poll) {
        setPoll(data.poll);
        setHasVoted(data.hasVoted);
        setUserVote(data.userVote);
        
        if (data.results) {
          setResults(data.results);
          setTotalVotes(data.totalVotes);
        }
      } else {
        setPoll(null);
      }
    } catch (err) {
      console.error('Failed to fetch poll:', err);
      setError(t.poll_error);
    } finally {
      setLoading(false);
    }
 }, [bookId, chapterId, address, apiBaseUrl, t.poll_error]); // Dependencies for fetchPoll

  // 2. Now include fetchPoll in the useEffect safely
  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);

  // Clear selection if wallet changes
  useEffect(() => {
    setSelectedOption(null);
  }, [address]);

  const submitVote = async () => {
    if (!poll || !selectedOption || !address) return;

    try {
      setSubmitting(true);
      setError(null);

      const response = await fetch(`${apiBaseUrl}/polls/${poll.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          optionId: selectedOption,
          walletAddress: address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t.poll_vote_error);
      }

      setHasVoted(true);
      setUserVote(data.userVote);
      setResults(data.results);
      setTotalVotes(data.totalVotes);
    } catch (err) {
      console.error('Failed to submit vote:', err);
      setError(err instanceof Error ? err.message : t.poll_vote_error);
    } finally {
      setSubmitting(false);
    }
  };

  // Don't render if no poll exists
  if (!loading && !poll) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <div className="mt-12 border border-cyan-500/20 bg-slate-950/50 rounded-lg p-12 text-center">
        <BarChart3 className="w-8 h-8 text-cyan-400 mx-auto mb-4 animate-pulse" />
        <p className="text-cyan-400 font-mono text-sm">
          {t.poll_loading}
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-12 border border-red-500/30 bg-red-950/20 rounded-lg p-6 text-center">
        <p className="text-red-400 mb-4 font-mono">{error}</p>
        <button
          onClick={fetchPoll}
          className="px-6 py-2 bg-red-600 text-white rounded font-mono text-xs cursor-pointer border-none hover:bg-red-700"
        >
          {t.poll_retry}
        </button>
      </div>
    );
  }

  if (!poll) return null;

  const canVote = !poll.requiresBookToken || isTokenOwned;
  const showResults = hasVoted && results.length > 0;

  return (
    <div className="mt-12 border border-cyan-500/20 bg-slate-950/50 rounded-lg p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-cyan-400/5 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">
            {showResults ? t.poll_voted : t.poll_header}
          </h3>
        </div>

        {/* Question */}
        <p className="text-lg font-mono text-slate-100 mb-6 leading-relaxed">
          {poll.question[lang]}
        </p>

        {/* Show Results (after voting) */}
        {showResults ? (
          <>
            {/* User's choice */}
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-xs font-mono text-green-400">
                  {t.poll_your_choice}
                </span>
              </div>
              <p className="text-sm text-slate-100 mt-2 ml-6">
                {poll.options.find(opt => opt.id === userVote)?.text[lang]}
              </p>
            </div>

            {/* Results header */}
            <div className="text-xs font-mono text-slate-500 uppercase tracking-wide mb-4">
              {t.poll_results}
            </div>

            {/* Results bars */}
            <div className="flex flex-col gap-4">
              {results.map((result) => {
                const option = poll.options.find(opt => opt.id === result.optionId);
                const isUserChoice = result.optionId === userVote;
                
                return (
                  <div key={result.optionId}>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm flex items-center gap-2 ${isUserChoice ? 'text-green-400' : 'text-slate-300'}`}>
                        {option?.text[lang]}
                        {isUserChoice && (
                          <span className="text-[10px] text-green-400 px-2 py-0.5 border border-green-500/30 rounded bg-green-500/5">
                            YOU
                          </span>
                        )}
                      </span>
                      <span className="text-sm font-mono text-slate-500 font-bold">
                        {result.percentage}%
                      </span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="w-full h-2 bg-slate-800/50 rounded overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ease-out ${
                          isUserChoice 
                            ? 'bg-gradient-to-r from-green-400/60 to-green-400/30'
                            : 'bg-gradient-to-r from-cyan-400/60 to-cyan-400/30'
                        }`}
                        style={{ width: `${result.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total votes */}
            <div className="mt-5 pt-5 border-t border-slate-800 flex items-center gap-2 justify-center">
              <Users className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-mono text-slate-500">
                {t.poll_total} {totalVotes}
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Options (before voting) */}
            <div className="flex flex-col gap-3 mb-6">
              {poll.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => canVote && setSelectedOption(option.id)}
                  disabled={!canVote}
                  className={`w-full p-4 rounded border transition-all text-left ${
                    selectedOption === option.id
                      ? 'bg-cyan-400/10 border-cyan-400/50'
                      : 'bg-slate-950/30 border-slate-800/50 hover:border-slate-700'
                  } ${!canVote ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedOption === option.id 
                        ? 'border-cyan-400' 
                        : 'border-slate-600'
                    }`}>
                      {selectedOption === option.id && (
                        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      )}
                    </div>
                    <span className="text-sm text-slate-100 leading-relaxed">
                      {option.text[lang]}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Token requirement warning */}
            {poll.requiresBookToken && !isTokenOwned && (
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded flex items-center gap-2 mb-4">
                <Lock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-xs font-mono">
                  {t.poll_requires_token}
                </span>
              </div>
            )}

            {/* Submit button */}
            {/* 3. Updated Button Logic */}
            <button
              onClick={handleButtonClick}
              // Button is disabled if:
              // 1. Poll is loading or submitting
              // 2. User is connected but doesn't have the token (and it's required)
              // 3. User is connected but hasn't selected an option
              disabled={
                submitting || 
                isWalletConnecting ||
                (address && (!canVote || !selectedOption))
              }
              className={`w-full p-4 rounded font-mono text-sm font-bold transition-all ${
                (!address || (canVote && selectedOption)) && !submitting
                  ? 'bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border-2 border-cyan-400/40 text-cyan-400 hover:border-cyan-400/60 cursor-pointer'
                  : 'bg-slate-800/30 border border-slate-800/50 text-slate-600 cursor-not-allowed opacity-50'
              }`}
            >
              {isWalletConnecting ? t.poll_loading : 
              !address ? t.poll_connect_wallet : 
              submitting ? t.poll_submitting : 
              t.poll_vote_btn}
            </button>

            {/* 3. The Switch/Disconnect Link */}
            {address && (
              <div className="mt-4 text-center">
                <button
                  onClick={openAccountModal}
                  className="text-[13px] font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-widest cursor-pointer underline decoration-slate-700 underline-offset-4"
                >
                  {t.poll_switch_wallet}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}