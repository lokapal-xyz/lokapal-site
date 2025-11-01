// lib/hooks/useBookTokens.ts
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther, Address } from 'viem';
import { BOOK_TOKENS_ADDRESS, BOOK_TOKENS_ABI, BOOK_PRICE } from '@/constants/bookTokens';

export function useTotalMinted(bookId: number) {
  return useReadContract({
    address: BOOK_TOKENS_ADDRESS,
    abi: BOOK_TOKENS_ABI,
    functionName: 'totalMinted',
    args: [BigInt(bookId)],
  });
}

export function useBookExists(bookId: number) {
  return useReadContract({
    address: BOOK_TOKENS_ADDRESS,
    abi: BOOK_TOKENS_ABI,
    functionName: 'bookExists',
    args: [BigInt(bookId)],
  });
}

export function useUserBalance(address: Address | undefined, bookId: number) {
  return useReadContract({
    address: BOOK_TOKENS_ADDRESS,
    abi: BOOK_TOKENS_ABI,
    functionName: 'balanceOf',
    args: address ? [address, BigInt(bookId)] : undefined,
    query: {
      enabled: !!address,
    }
  });
}

export function useMintBook() {
  const { data: hash, writeContract, isPending, isError, error } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const mintBook = (bookId: number, amount: number) => {
    const value = parseEther((Number(BOOK_PRICE) * amount).toString());
    
    writeContract({
      address: BOOK_TOKENS_ADDRESS,
      abi: BOOK_TOKENS_ABI,
      functionName: 'mintBook',
      args: [BigInt(bookId), BigInt(amount)],
      value,
    });
  };

  return {
    mintBook,
    isPending,
    isConfirming,
    isSuccess,
    isError,
    error,
    hash,
  };
}