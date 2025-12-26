// app/api/books/[bookId]/chapters/[chapterId]/poll/route.ts
import { NextRequest, NextResponse } from 'next/server';
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

// Simple file-based vote storage (you can migrate to DB later)
function getVotesFilePath(pollId: string): string {
  const votesDir = path.join(process.cwd(), 'data', 'votes');
  if (!fs.existsSync(votesDir)) {
    fs.mkdirSync(votesDir, { recursive: true });
  }
  return path.join(votesDir, `${pollId}.json`);
}

function loadVotes(pollId: string): PollVote[] {
  const votesPath = getVotesFilePath(pollId);
  if (!fs.existsSync(votesPath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(votesPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading votes:', error);
    return [];
  }
}

function hasUserVoted(pollId: string, walletAddress: string): { voted: boolean; optionId?: string } {
  const votes = loadVotes(pollId);
  const userVote = votes.find(v => 
    v.walletAddress.toLowerCase() === walletAddress.toLowerCase()
  );
  return userVote 
    ? { voted: true, optionId: userVote.optionId }
    : { voted: false };
}

function calculateResults(pollId: string, options: PollOption[]) {
  const votes = loadVotes(pollId);
  const totalVotes = votes.length;
  
  const results = options.map(option => {
    const count = votes.filter(v => v.optionId === option.id).length;
    const percentage = totalVotes > 0 ? (count / totalVotes) * 100 : 0;
    
    return {
      optionId: option.id,
      count,
      percentage: Math.round(percentage * 10) / 10, // Round to 1 decimal
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
    
    // Get wallet address from query parameter (for checking if user voted)
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('wallet');
    
    // Build path to poll JSON file
    const pollPath = path.join(
      process.cwd(),
      'contents',
      'fmao',
      'polls',
      bookId,
      `${chapterId}.json`
    );
    
    // Check if poll exists
    if (!fs.existsSync(pollPath)) {
      // No poll for this chapter - this is not an error, just return null
      const response = NextResponse.json({
        poll: null,
        message: 'No poll available for this chapter'
      });
      
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
      
      return response;
    }
    
    // Read poll data
    const pollData = fs.readFileSync(pollPath, 'utf8');
    const poll: Poll = JSON.parse(pollData);
    
    // Check if user has voted (if wallet address provided)
    let hasVoted = false;
    let userVote = null;
    
    if (walletAddress) {
      const voteStatus = hasUserVoted(poll.id, walletAddress);
      hasVoted = voteStatus.voted;
      userVote = voteStatus.optionId || null;
    }
    
    // Calculate results
    const { results, totalVotes } = calculateResults(poll.id, poll.options);
    
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
      results: hasVoted ? results : null, // Only show results after voting
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