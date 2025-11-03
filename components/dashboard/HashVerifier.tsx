'use client';

import { useState } from 'react';
import { Upload, CheckCircle, XCircle, Hash } from 'lucide-react';
import { computeHNP1Hash } from '@/lib/hnp1';

interface HashVerifierProps {
  expectedHash: string;
  title: string;
}

export function HashVerifier({ expectedHash, title }: HashVerifierProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    calculatedHash: string;
  } | null>(null);

  const isValidHash = expectedHash && 
    expectedHash !== '0x0000000000000000000000000000000000000000000000000000000000000000';

  const handleFileUpload = async (file: File) => {
    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const calculatedHash = await computeHNP1Hash(file);
      const success = calculatedHash.toLowerCase() === expectedHash.toLowerCase();
      
      setVerificationResult({
        success,
        calculatedHash,
      });
    } catch (error) {
      console.error('Error calculating hash:', error);
      setVerificationResult({
        success: false,
        calculatedHash: 'Error calculating hash',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  if (!isValidHash) {
    return (
      <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-lg">
        <p className="text-sm text-slate-400 font-mono">
          No content hash available for this entry
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Expected Hash Display */}
      <div className="p-4 bg-slate-900/50 border border-cyan-500/30 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Hash className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-slate-400 uppercase">Expected Hash (HNP-1)</span>
        </div>
        <p className="text-sm text-cyan-400 font-mono break-all">
          {expectedHash}
        </p>
      </div>

      {/* Verification Result - Above drop zone */}
      {verificationResult && (
        <div
          className={`p-4 rounded-lg border ${
            verificationResult.success
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            {verificationResult.success ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className={`font-mono font-bold ${
              verificationResult.success ? 'text-green-400' : 'text-red-400'
            }`}>
              {verificationResult.success ? 'HASH VERIFIED ✓' : 'HASH MISMATCH ✗'}
            </span>
          </div>
          
          <div className="space-y-2">
            <div>
              <p className="text-xs text-slate-400 font-mono mb-1">Calculated Hash:</p>
              <p className={`text-sm font-mono break-all ${
                verificationResult.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {verificationResult.calculatedHash}
              </p>
            </div>
            
            {!verificationResult.success && (
              <p className="text-xs text-slate-400 mt-3">
                The uploaded file does not match the stored hash. This file may have been modified or corrupted.
              </p>
            )}
          </div>
        </div>
      )}

      {/* File Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
          isDragging
            ? 'border-cyan-400 bg-cyan-500/10'
            : 'border-slate-700 bg-slate-900/30 hover:border-slate-600'
        }`}
      >
        <input
          type="file"
          id="hash-file-input"
          onChange={handleFileInput}
          className="hidden"
          disabled={isVerifying}
        />
        
        <label
          htmlFor="hash-file-input"
          className="flex flex-col items-center gap-3 cursor-pointer"
        >
          <div className={`p-4 rounded-full transition-colors ${
            isDragging ? 'bg-cyan-500/20' : 'bg-slate-800/50'
          }`}>
            <Upload className={`w-8 h-8 ${
              isDragging ? 'text-cyan-400' : 'text-slate-400'
            }`} />
          </div>
          
          <div className="text-center">
            <p className="text-sm font-mono text-slate-300 mb-1">
              {isVerifying ? 'Verifying with HNP-1...' : 'Drop file here or click to upload'}
            </p>
            <p className="text-xs font-mono text-slate-500">
              Verify &quot;{title}&quot; against stored hash
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}