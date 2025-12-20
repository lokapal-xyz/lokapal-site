// app/api/books/[bookId]/chapters/[chapterId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

function cleanMDXContent(content: string): string {
  // Remove React components
  let cleaned = content.replace(/<[A-Z][a-zA-Z0-9]*\s+[^>]*\/>/g, '');
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*\s+[^>]*>[\s\S]*?<\/[A-Z][a-zA-Z0-9]*>/g, '');
  cleaned = cleaned.replace(/^import\s+.*$/gm, '');
  
  // Convert markdown to HTML
  const html = marked.parse(cleaned);
  
  return html as string;
}

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
    // contents/fmao/{lang}/fmao/{bookId}/{chapterId}/index.mdx
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
    const { data, content: rawContent } = matter(fileContents);
    const content = cleanMDXContent(rawContent);

    // Return structured data with CORS headers
    const response = NextResponse.json({
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
    
    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error reading chapter:', error);
    const errorResponse = NextResponse.json(
      { 
        error: 'Failed to load chapter',
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