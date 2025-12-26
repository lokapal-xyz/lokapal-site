// app/api/polls/[pollId]/vote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

interface PollVote {
  pollId: string;
  optionId: string;
  walletAddress: string;
  timestamp: number;
}

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
  pollType: string;
  question: {
    en: string;
    es: string;
  };
  options: PollOption[];
}

// KV-based vote storage
async function loadVotes(pollId: string): Promise<PollVote[]> {
  try {
    const votes = await kv.get<PollVote[]>(`poll:votes:${pollId}`);
    return votes || [];
  } catch (error) {
    console.error('Error loading votes from KV:', error);
    return [];
  }
}

async function saveVotes(pollId: string, votes: PollVote[]): Promise<void> {
  try {
    await kv.set(`poll:votes:${pollId}`, votes);
  } catch (error) {
    console.error('Error saving votes to KV:', error);
    throw error;
  }
}

async function hasUserVoted(pollId: string, walletAddress: string): Promise<boolean> {
  const votes = await loadVotes(pollId);
  return votes.some(v => v.walletAddress.toLowerCase() === walletAddress.toLowerCase());
}

function getPollData(pollId: string): Poll | null {
  const match = pollId.match(/poll_(book-?\d+)_(shard-?\d+)/);
  if (!match) return null;
  
  const [, bookId, chapterId] = match;
  
  const pollPath = path.join(
    process.cwd(),
    'contents',
    'fmao',
    'polls',
    bookId,
    `${chapterId}.json`
  );
  
  if (!fs.existsSync(pollPath)) return null;
  
  try {
    const data = fs.readFileSync(pollPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading poll data:', error);
    return null;
  }
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

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ pollId: string }> }
) {
  try {
    const { pollId } = await context.params;
    
    const body = await request.json();
    const { optionId, walletAddress } = body;
    
    // Validation
    if (!optionId || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields: optionId and walletAddress' },
        { status: 400 }
      );
    }
    
    if (!walletAddress.startsWith('0x')) {
      return NextResponse.json(
        { error: 'Invalid wallet address format' },
        { status: 400 }
      );
    }
    
    // Load poll data
    const pollData = getPollData(pollId);
    if (!pollData) {
      return NextResponse.json(
        { error: 'Poll not found' },
        { status: 404 }
      );
    }
    
    if (!pollData.active) {
      return NextResponse.json(
        { error: 'This poll is no longer active' },
        { status: 400 }
      );
    }
    
    const validOption = pollData.options.find(opt => opt.id === optionId);
    if (!validOption) {
      return NextResponse.json(
        { error: 'Invalid option ID' },
        { status: 400 }
      );
    }
    
    // Check if user already voted
    const alreadyVoted = await hasUserVoted(pollId, walletAddress);
    if (alreadyVoted) {
      return NextResponse.json(
        { error: 'You have already voted in this poll' },
        { status: 400 }
      );
    }
    
    // Load existing votes
    const votes = await loadVotes(pollId);
    
    // Add new vote
    const newVote: PollVote = {
      pollId,
      optionId,
      walletAddress: walletAddress.toLowerCase(),
      timestamp: Date.now(),
    };
    
    votes.push(newVote);
    await saveVotes(pollId, votes);
    
    // Calculate results
    const { results, totalVotes } = calculateResults(votes, pollData.options);
    
    const response = NextResponse.json({
      success: true,
      message: 'Vote recorded successfully',
      results,
      totalVotes,
      userVote: optionId,
    });
    
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error recording vote:', error);
    const errorResponse = NextResponse.json(
      { 
        error: 'Failed to record vote',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
    
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return errorResponse;
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}