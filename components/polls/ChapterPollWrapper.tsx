// components/polls/ChapterPollWrapper.tsx
"use client";

import dynamic from 'next/dynamic';

// Lazy load the actual poll component with no SSR
const ChapterPollClient = dynamic(() => import('./ChapterPollClient'), {
  ssr: false,
  loading: () => (
    <div className="mt-12 border border-cyan-500/20 bg-slate-950/50 rounded-lg p-12 text-center">
      <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-cyan-400 font-mono text-sm">
        LOADING POLL SYSTEM......
      </p>
    </div>
  ),
});

interface ChapterPollWrapperProps {
  bookId: string;
  chapterId: string;
  apiBaseUrl?: string;
}

export default function ChapterPollWrapper(props: ChapterPollWrapperProps) {
  return <ChapterPollClient {...props} />;
}