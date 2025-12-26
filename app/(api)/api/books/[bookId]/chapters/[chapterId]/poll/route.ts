import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

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
  active: boolean;
  requiresBookToken: boolean;
  pollType: 'conflict' | 'philosophical' | 'guardian-affinity' | 'worldbuilding';
  question: {
    en: string;
    es: string;
  };
  options: PollOption[];
}

interface PollVote {
  pollId: string;
  optionId: string;
  walletAddress: string;
  timestamp: number;
}

async function loadVotes(pollId: string): Promise<PollVote[]> {
  try {
    const votes = await kv.get<PollVote[]>(`poll:votes:${pollId}`);
    return votes || [];
  } catch (error) {
    console.error('Error loading votes:', error);
    return [];
  }
}

async function hasUserVoted(pollId: string, walletAddress: string): Promise<{ voted: boolean; optionId?: string }> {
  const votes = await loadVotes(pollId);
  const userVote = votes.find(v => 
    v.walletAddress.toLowerCase() === walletAddress.toLowerCase()
  );
  return userVote 
    ? { voted: true, optionId: userVote.optionId }
    : { voted: false };
}

function calculateResults(votes: PollVote[], options: PollOption[]) {
  const totalVotes = votes.length;
  
  const results = options.map(option => {
    const count = votes.filter(v => v.optionId === option.id).length;
    const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
    
    return {
      optionId: option.id,
      count,
      percentage: Math.round(percentage * 10) / 10,
    };
  });
  
  return { results, totalVotes };
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ bookId: string; chapterId: string }> }
) {
  try {
    const { bookId, chapterId } = await context.params;
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');
    
    const pollPath = path.join(
      process.cwd(),
      'contents',
      'fmao',
      'polls',
      bookId,
      `${chapterId}.json`
    );
    
    if (!fs.existsSync(pollPath)) {
      const response = NextResponse.json({
        poll: null,
        message: 'No poll available for this chapter'
      });
      
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      
      return response;
    }
    
    const pollData = fs.readFileSync(pollPath, 'utf8');
    const poll: Poll = JSON.parse(pollData);
    
    let hasVoted = false;
    let userVote = null;
    
    if (walletAddress) {
      const voteStatus = await hasUserVoted(poll.id, walletAddress);
      hasVoted = voteStatus.voted;
      userVote = voteStatus.optionId || null;
    }
    
    const votes = await loadVotes(poll.id);
    const { results, totalVotes } = calculateResults(votes, poll.options);
    
    const response = NextResponse.json({
      poll: {
        id: poll.id,
        bookId: poll.bookId,
        chapterId: poll.chapterId,
        requiresBookToken: poll.requiresBookToken,
        pollType: poll.pollType,
        question: poll.question,
        options: poll.options,
      },
      hasVoted,
      userVote,
      results: hasVoted ? results : null,
      totalVotes: hasVoted ? totalVotes : null,
    });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error loading poll:', error);
    const errorResponse = NextResponse.json(
      { 
        error: 'Failed to load poll',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
    
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return errorResponse;
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}