// app/api/books/[bookId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ bookId: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { bookId } = await context.params;
    
    // Get language from query parameter (defaults to 'en')
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    
    // Validate language
    if (!['en', 'es'].includes(lang)) {
      return NextResponse.json(
        { error: 'Invalid language. Use "en" or "es".' },
        { status: 400 }
      );
    }

    // Build path to book directory
    // contents/fmao/{lang}/fmao/{bookId}/
    const bookDir = path.join(
      process.cwd(),
      'contents',
      'fmao',
      lang,
      'fmao',
      bookId
    );

    // Check if book directory exists
    if (!fs.existsSync(bookDir)) {
      return NextResponse.json(
        { 
          error: 'Book not found',
          details: {
            bookId,
            lang,
            path: bookDir,
            cwd: process.cwd()
          }
        },
        { status: 404 }
      );
    }

    // Read all chapter directories (shard-0, shard-1, etc.)
    const entries = fs.readdirSync(bookDir, { withFileTypes: true });
    const chapterDirs = entries.filter(entry => 
      entry.isDirectory() && entry.name.startsWith('shard-')
    );

    // Parse metadata from each chapter's index.mdx
    const chapters = chapterDirs.map(dir => {
      const indexPath = path.join(bookDir, dir.name, 'index.mdx');
      
      // Check if index.mdx exists
      if (!fs.existsSync(indexPath)) {
        return null;
      }

      const fileContents = fs.readFileSync(indexPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        id: dir.name, // e.g., "shard-1"
        title: data.title || 'Untitled',
        description: data.description || '',
      };
    }).filter(Boolean); // Remove null entries

    // Sort chapters by shard number
    chapters.sort((a, b) => {
      const aNum = parseInt(a!.id.replace('shard-', ''));
      const bNum = parseInt(b!.id.replace('shard-', ''));
      return aNum - bNum;
    });

    const response = NextResponse.json({
      bookId,
      lang,
      chapters,
      total: chapters.length,
    });
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error listing chapters:', error);
    const errorResponse = NextResponse.json(
      { 
        error: 'Failed to load chapters',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
    
    // Add CORS headers to error response too
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return errorResponse;
  }
}

// Enable CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}