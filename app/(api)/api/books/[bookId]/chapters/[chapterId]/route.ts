// app/api/books/[bookId]/chapters/[chapterId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ bookId: string; chapterId: string }> }
) {
  try {
    // Await params in Next.js 15+
    const { bookId, chapterId } = await context.params;
    
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

    // Build the file path based on your structure
    // content/fmao/{lang}/fmao/{bookId}/{chapterId}/index.mdx
    const filePath = path.join(
      process.cwd(),
      'contents',
      'fmao',
      lang,
      'fmao',
      bookId,
      chapterId,
      'index.mdx'
    );

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { 
          error: 'Chapter not found',
          details: {
            bookId,
            chapterId,
            lang,
            path: filePath,
            cwd: process.cwd()
          }
        },
        { status: 404 }
      );
    }

    // Read and parse MDX file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Return structured data
    return NextResponse.json({
      bookId,
      chapterId,
      lang,
      metadata: {
        title: data.title || 'Untitled',
        description: data.description || '',
        ...data,
      },
      content,
    });
  } catch (error) {
    console.error('Error reading chapter:', error);
    return NextResponse.json(
      { 
        error: 'Failed to load chapter',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
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